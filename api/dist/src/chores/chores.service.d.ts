import { CreateChoreDto } from './dto/create-chore.dto';
import { UpdateChoreDto } from './dto/update-chore.dto';
export declare class ChoresService {
    create(createChoreDto: CreateChoreDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateChoreDto: UpdateChoreDto): string;
    remove(id: number): string;
}
