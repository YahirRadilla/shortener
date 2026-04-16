import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from './User'

@Entity()
export class Url {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    originalUrl: string

    @Column({ unique: true })
    shortUrl: string

    @Column({ default: true })
    isActive: boolean

    @ManyToOne(() => User, (user) => user.urls)
    user: User
}