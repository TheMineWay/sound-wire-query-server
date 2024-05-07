import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class QueryByTextDTO {
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  text: string;
}
