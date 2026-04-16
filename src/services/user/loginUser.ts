import { userDAL } from '../../db/dal/userDAL'
import { comparePassword } from '../../utils/hash'
import type { LoginDTO } from '../../types/user.types'

export const loginUser = async ({ email, password }: LoginDTO) => {
    const user = await userDAL.findOne({ where: { email } })
    if (!user) throw new Error('No existe')

    const match = await comparePassword(password, user.password)
    if (!match) throw new Error('Password incorrecto')

    if (!user.isVerified)
        throw new Error('No verificado')

    return { valid: true }
}