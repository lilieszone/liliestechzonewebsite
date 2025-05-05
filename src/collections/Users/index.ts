import { isAdminOrSeft } from '@/access/adminOrSeft'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { isAdmin } from '@/access/isAdmin'
import { onlyAdmins } from '@/access/onlyAdmins'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: isAdmin,
    create: anyone,
    read: authenticated,
    update: isAdminOrSeft,
    delete: onlyAdmins,
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
      name: 'roles',
      label: 'Role',
      saveToJWT: true,
      type: 'select',
      required: true,
      access: {
        create: onlyAdmins,
        update: onlyAdmins,
      },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'subscriber', value: 'subscriber' },
        { label: 'Editor', value: 'editor' },
      ],
      defaultValue: 'subscriber',
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
