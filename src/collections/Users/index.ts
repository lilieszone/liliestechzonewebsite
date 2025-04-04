import {
  adminOrSelf,
  authenticated,
  canUpdateRole,
  isFirstUser,
  onlyAdmin,
} from '@/access/authentications'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    create: async ({ data }) => {
      const firstUser = await isFirstUser()
      if (firstUser) return true
      return data?.role !== 'admin' // Prevent non-first users from self-assigning admin
    },
    read: authenticated,
    update: adminOrSelf,
    delete: onlyAdmin,
    admin: onlyAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'email',
    components: {
      beforeList: ['src/collections/Users/BeforeUserList'],
    },
  },
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
    // More options are available
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      unique: true,
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor', 'subscriber'],
      access: {
        create: canUpdateRole,
        update: canUpdateRole,
      },
      required: true,
      defaultValue: 'subscriber',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    // {
    //   name: 'dateOfBirth',
    //   type: 'date',
    // },
    {
      name: 'gender',
      type: 'select',
      options: ['male', 'female'],
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'newsletter',
      type: 'checkbox',
      defaultValue: true,
      label: 'Subscribe to stay up to date!',
    },
  ],
  timestamps: true,
}
