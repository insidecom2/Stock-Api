import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnApi } from 'src/utils/utils';
import { Like, Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepo: Repository<Company>,
  ) {}
  async create(createCompanyDto: CreateCompanyDto, logo: any) {
    const getData: any = await this.companyRepo.find({
      company_name: createCompanyDto.company_name,
    });

    if (getData.length > 0) returnApi(false, '', 'company is already');
    if (logo) createCompanyDto.logo = logo.filename;
    const data: any = this.companyRepo.create(createCompanyDto);

    const create: any = await this.companyRepo.save(data);
    if (create) returnApi(true, create);
    returnApi(false, '', 'company cannot save');
  }

  async findAll() {
    const data: any = await this.companyRepo.find();

    if (data) return returnApi(true, data);
    return returnApi(false, '', 'Fail');
  }

  async findAllByName(name: string) {
    const data: any = await this.companyRepo
      .createQueryBuilder('Company')
      .where('Company.company_name like :name', { name: `%${name}%` })
      .getMany();

    if (data) return returnApi(true, data);
    return returnApi(false, '', 'Fail');
  }

  async findOne(id: number) {
    const data: any = await this.companyRepo.findOne(id);
    if (data) return returnApi(true, data);
    return returnApi(false, 'Fail');
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto, logo: any) {
    const data: any = await this.companyRepo.findOne(id);

    if (logo) updateCompanyDto.logo = logo.filename;
    else updateCompanyDto.logo = data.logo;
    const newData: any = { ...data, ...updateCompanyDto };
    const save: any = await this.companyRepo.update(id, newData);

    if (save) return returnApi(true, save);
    return returnApi(false, '', 'Fail');
  }

  async remove(id: number) {
    const data: any = await this.companyRepo.delete(id);
    if (data) return returnApi(true, data);
    return returnApi(false, '', 'Fail');
  }
}
