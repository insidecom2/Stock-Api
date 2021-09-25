import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty()
  company_name: string;

  @IsOptional()
  taxno: string;

  @IsOptional()
  logo: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  amphur: string;

  @IsNotEmpty()
  thumbon: string;

  @IsNumber()
  province_id: number;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  line: string;

  @IsNumber()
  user_id: number;

  @IsNumber()
  zipcode: number;
}
