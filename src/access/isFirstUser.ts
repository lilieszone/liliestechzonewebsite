import { getPayload } from 'payload'
import config from '@payload-config'

export const isFirstUser = async () => {
  const payload = await getPayload({ config })
  const counts = await payload.find({
    collection: 'users',
    limit: 0,
  })
  return Boolean(counts.totalDocs === 0)
}
