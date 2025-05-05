import { AccessArgs } from 'payload'

export const isAdmin = ({ req: { user } }: AccessArgs) => {
  return Boolean(user?.roles.includes('admin'))
}
