import { Transform } from 'class-transformer';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class ProductDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @Transform(({ value }) => parseFloat(value), { toClassOnly: true })
  @IsNumber()
  price!: number;
}
