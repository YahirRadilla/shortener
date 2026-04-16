import { userDAL } from '../../db/dal/userDAL'
import type { VerifyDTO } from '../../types/user.types'

export const verifyUser = async ({ email, code }: VerifyDTO) => {
    const user = await userDAL.findOne({ where: { email } })
    if (!user) throw new Error('No existe')

    if (user.verificationCode !== code)
        throw new Error('Código incorrecto')

    user.isVerified = true
    await userDAL.save(user)

    return { message: 'Verificado' }
}