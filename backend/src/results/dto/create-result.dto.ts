import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';
import { Outcome } from 'src/common/interfaces';

export class CreateResultDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  outcome: Outcome;

  @IsString()
  @IsNotEmpty()
  originalId: string;

  @IsString()
  @IsNotEmpty()
  originalValue: string;

  @IsNumber()
  correctedValue?: number;
}
