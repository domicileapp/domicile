import { HealthCheckService, MemoryHealthIndicator, MikroOrmHealthIndicator } from '@nestjs/terminus';
export declare class HealthController {
    private health;
    private db;
    private memory;
    constructor(health: HealthCheckService, db: MikroOrmHealthIndicator, memory: MemoryHealthIndicator);
    databaseCheck(): Promise<import("@nestjs/terminus").HealthCheckResult>;
    memoryCheck(): Promise<import("@nestjs/terminus").HealthCheckResult>;
}
