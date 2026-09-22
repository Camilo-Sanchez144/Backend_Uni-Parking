import {IsString,IsOptional,MaxLength,IsDateString, IsUUID} from 'class-validator';

export class UpdateIncidentDto {

    @IsOptional()
    @IsDateString()
    fecha_hora?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    tipo?: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    descripcion?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    estado?: string;

    @IsOptional()
    @IsUUID()
    id_usuario?: string;
}