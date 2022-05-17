import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsArray, // 👈 new decorator
  ValidateNested, // 👈 new decorator
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;

  @IsArray()
  @IsNotEmpty()
  readonly skills: any; // 👈 new field
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
