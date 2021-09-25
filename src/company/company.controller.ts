import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Put,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/utils/image';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { diskStorage } from 'multer';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './public/images/',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 2000 * 1024 }, // upload max 200 Kb
    }),
  )
  create(@Body() createCompanyDto: CreateCompanyDto, @UploadedFile() logo) {
    return this.companyService.create(createCompanyDto, logo);
  }

  @Get()
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Get('search/:name')
  findAllByName(@Param('name') name: string) {
    return this.companyService.findAllByName(name);
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('logo', {
      storage: diskStorage({
        destination: './public/images/',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 2000 * 1024 }, // upload max 200 Kb
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @UploadedFile() logo,
  ) {
    return this.companyService.update(+id, updateCompanyDto, logo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
