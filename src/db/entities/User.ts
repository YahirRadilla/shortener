import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Url } from './Url'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column({ default: false })
    isVerified: boolean

    @Column({ nullable: true })
    verificationCode: string

    @OneToMany(() => Url, (url) => url.user)
    urls: Url[]
}