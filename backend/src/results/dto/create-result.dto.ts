import { IsString, IsNotEmpty, MaxLength, IsNumber } from 'class-validator';

export class CreateResultDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  outcome: 'accepted' | 'rejected' | 'corrected';

  @IsString()
  @IsNotEmpty()
  originalId: string;

  @IsString()
  @IsNotEmpty()
  originalValue: string;

  @IsNumber()
  correctedValue?: number;
}
