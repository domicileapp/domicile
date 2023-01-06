import { Controller, Get } from '@nestjs/common'
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MikroOrmHealthIndicator,
} from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: MikroOrmHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {}

  @Get('/database')
  @HealthCheck()
  databaseCheck() {
    return this.health.check([() => this.db.pingCheck('database')])
  }

  @Get('/memory')
  @HealthCheck()
  memoryCheck() {
    return this.health.check([
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
    ])
  }
}
