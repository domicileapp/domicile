import { WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Server } from 'socket.io';
export declare class TasksGateway {
    server: Server;
    findAll(data: any): Observable<WsResponse<number>>;
    identity(data: number): Promise<number>;
}
