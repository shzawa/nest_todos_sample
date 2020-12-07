import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { CATEGORY } from '../../entities/todo.entity';

export class CreateTodoDto {
  @ApiProperty({
    example: 'AdventCalenderの記事書く',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: CATEGORY.GENERAL,
    type: 'enum',
  })
  @IsEnum(CATEGORY)
  @IsNotEmpty()
  category: CATEGORY;
}
