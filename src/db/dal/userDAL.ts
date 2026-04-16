import { AppDataSource } from '../../data-source'
import { User } from '../entities/User'

export const userDAL = AppDataSource.getRepository(User)