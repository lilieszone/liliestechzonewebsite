import { AccessArgs } from 'payload'

export const isAdminOrSeft = ({ req: { user } }: AccessArgs) => {
  if (!user) return false

  if (user.roles.includes('admin')) return true

  return {
    id: {
      equals: user.id,
    },
  }
}
