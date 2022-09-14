import { User } from '@/users/entities/user.entity'

module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  seeds: ['./src/db/seeders/**/*{.ts,.js}'],
  factories: ['./src/db/factories/**/*{.ts,.js}'],
  cli: {
    migrationsDir: './src/db/migrations',
  },
  ssl: false,
}
