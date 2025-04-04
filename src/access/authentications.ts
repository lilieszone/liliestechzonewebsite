import type { AccessArgs } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Access } from 'payload'

import type { User } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

export const adminOrEditor = ({ req: { user } }: AccessArgs) => {
  if (user?.role === 'admin' || user?.role === 'editor') {
    return true
  }
  return false
}

export const anyone: Access = () => true

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}

export const adminOrSelf = ({ req: { user }, id }: AccessArgs) => {
  if (user?.role === 'admin') {
    return true
  }
  return user?.id === id // only if a document ID is present
}

export const onlyAdmin = ({ req: { user } }: AccessArgs) => {
  return Boolean(user && user?.role === 'admin')
}

export const isFirstUser = async () => {
  const payload = await getPayload({ config })
  const count = await payload.find({
    collection: 'users',
    limit: 0,
  })
  return count.totalDocs === 0
}

export const canUpdateRole = async ({ req, data }: AccessArgs) => {
  if (!data?.role) return true

  const isUserAdmin = req.user?.role === 'admin'
  const isCreatingFirstUser = await isFirstUser()

  if (isCreatingFirstUser) {
    return data.role === 'admin' // Only allow admin role for first user
  }

  return isUserAdmin // Only existing admins can set roles after first user
}
