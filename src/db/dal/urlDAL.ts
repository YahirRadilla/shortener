import { AppDataSource } from '../../data-source'
import { Url } from '../entities/Url'

export const urlDAL = AppDataSource.getRepository(Url)