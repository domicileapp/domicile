import { User } from '@/users/user.entity'

module.exports = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  // entities: [UserEntity],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  seeds: ['./src/db/seeders/**/*{.ts,.js}'],
  factories: ['./src/db/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/db/migrations',
  },
  ssl: false,
  synchronize: true,
}
