import { User } from '@/payload-types'
import { Access, FieldAccess } from 'payload'

export const onlyAdmins: FieldAccess<{ id: string }, User> = ({ req: { user } }) => {
  return Boolean(user?.roles.includes('admin'))
}
