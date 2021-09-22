import { HttpException } from '@nestjs/common';

export const returnApi = (
  status: boolean,
  data: any,
  comment: string = 'Ok',
) => {
  throw new HttpException({ status, data, comment }, 200);
};
