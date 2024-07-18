import { SetMetadata } from '@nestjs/common';

export const APP_CONFIG = {
  SALT: 10,
  JWT_SECRET: '2b55fd7c-0a3c-470c-8cc0-7ba07b4b231a',
  IS_PUBLIC_KEY: 'isPublic',
};
export const Public = () => SetMetadata(APP_CONFIG.IS_PUBLIC_KEY, true);
