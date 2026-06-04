import { ArrayMaxSize, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  images!: string[];
}
