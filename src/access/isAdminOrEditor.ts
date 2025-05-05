import { AccessArgs } from 'payload'

export const isAdminOrEditor = ({ req: { user } }: AccessArgs) => {
  if (!user) return false
  if (user.roles.includes('admin')) return true
  if (user.roles.includes('editor')) return true
  return false
}
