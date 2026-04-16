import { userDAL } from '../../db/dal/userDAL'
import { hashPassword } from '../../utils/hash'
import type { RegisterDTO } from '../../types/user.types'



export const registerUser = async ({ email, password }: RegisterDTO) => {
    const exists = await userDAL.findOne({ where: { email } })
    if (exists) throw new Error('Email ya existe')

    const hashed = await hashPassword(password)

    const user = userDAL.create({
        email,
        password: hashed,
        isVerified: false,
        verificationCode: '123456'
    })

    await userDAL.save(user)

    return { message: 'Usuario creado' }
}