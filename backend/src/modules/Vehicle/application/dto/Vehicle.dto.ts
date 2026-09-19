import { IsString, MaxLength, IsNotEmpty, IsNumber, IsOptional } from 'class-validator'

export class CreateVehicleDto {
    @IsString()
    @MaxLength(10)
    @IsOptional()
    plate!: string;

    @IsNotEmpty()
    @IsString()
    brand!: string;

    @IsNotEmpty()
    @IsNumber()
    model!: number

    @IsNotEmpty()
    @IsString()
    color!: string

    @IsNotEmpty()
    @IsString()
    type!:string;

    @IsOptional()
    is_authorized!:boolean;

    @IsNotEmpty()
    @IsNumber()
    id_owner!:number;

}