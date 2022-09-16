import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

export class DefaultEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    name: 'createdAt',
  })
  createdAt: Date

  @UpdateDateColumn({
    name: 'updatedAt',
  })
  updatedAt: Date
}
