import { urlDAL } from '../../db/dal/urlDAL'
import type { ToggleUrlDTO } from '../../types/url.types'

export const deactivateUrl = async ({ id }: ToggleUrlDTO) => {
    const url = await urlDAL.findOne({ where: { id } })
    if (!url) throw new Error('No existe')

    url.isActive = false
    await urlDAL.save(url)

    return { message: 'Desactivada' }
}