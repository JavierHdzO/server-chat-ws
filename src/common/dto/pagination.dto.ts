
import { IsInt, Min, IsPositive, IsOptional } from 'class-validator';
import { Type }  from 'class-transformer';

export class PaginationDto{

    @IsInt()
    @Min(1)
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    limit: number;


    @IsInt()
    @Min(0)
    @IsPositive()
    @IsOptional()
    @Type(() => Number)
    offset: number;

}