import { SetMetadata } from '@nestjs/common';

export const APP_CONFIG = {
  SALT: 10,
  JWT_SECRET:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
  IS_PUBLIC_KEY: 'isPublic',
};
export const Public = () => SetMetadata(APP_CONFIG.IS_PUBLIC_KEY, true);
