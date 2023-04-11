import { ChoresService } from './chores.service';
import { CreateChoreDto } from './dto/create-chore.dto';
import { UpdateChoreDto } from './dto/update-chore.dto';
export declare class ChoresController {
    private readonly choresService;
    constructor(choresService: ChoresService);
    create(createChoreDto: CreateChoreDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateChoreDto: UpdateChoreDto): string;
    remove(id: string): string;
}
