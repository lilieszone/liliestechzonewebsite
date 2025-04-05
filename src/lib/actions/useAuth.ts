'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { redirect } from 'next/navigation'

export async function useAuth() {
  try {
    const payload = await getPayload({ config })
    const user = await payload.find({
      collection: 'users',
      where: {
        id: {
          exists: true,
        },
      },
      limit: 1,
    })
    if (user.docs.length > 0) {
      redirect('/dashboard')
    }
    return { isAuthenticated: user.docs.length > 0 }
  } catch (error) {
    return { isAuthenticated: false }
  }
}
