import { getCachedGlobal } from '@/utilities/getGlobals'
import { PartnerList } from './PartnerList'

export async function PartnersComponent() {
  const partnerList = await getCachedGlobal('partners', 1)()

  //@ts-expect-error ignore partnerList
  return <PartnerList partners={partnerList} />
}
