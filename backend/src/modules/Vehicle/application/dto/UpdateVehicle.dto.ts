import { IsString, IsOptional, MaxLength, IsNotEmpty, IsNumber } from 'class-validator'

export class UpdateVehicleDto{
    @IsString()
    @MaxLength(10)
    @IsOptional()
    plate!: string;

    @IsOptional()
    @IsString()
    brand!: string;

    @IsOptional()
    @IsNumber()
    model!: number

    @IsOptional()
    @IsString()
    color!: string

    @IsOptional()
    @IsString()
    type!:string;

    @IsOptional()
    is_authorized!:boolean;

    @IsOptional()
    @IsNumber()
    id_owner!:number;
}