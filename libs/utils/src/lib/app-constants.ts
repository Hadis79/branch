export const CONSTANTS = {
  SUPPORT_PHONE: '83386-021',
  EMAIL: 'pr@bmi.ir',
  POSTAL_CODE: '1135931596',
  POST_BOX: '144ـ11365',
  TELEGRAPH: '1135931596-021',
  HELP_LINK: 'https://bmi.ir/fa/pages/965/',
  CONTACT_US_LINK: 'https://bmi.ir/',
  REGISTER_LINK: 'https://my.bmi.ir/portalserver/signup',
  FORGET_PASS_LINK: 'https://my.bmi.ir/portalserver/signup#/forgotpass',
};

export const ENV_CONSTANTS = {
  IS_DEV: process.env.NODE_ENV === 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
  PROFILE_DELAY: +(process.env.NEXT_PUBLIC_PROFILE_DELAY ?? 0),
  AUTH_MODE: +(process.env.NEXT_PUBLIC_AUTH_MODE ?? 1),
  IS_AUTH_MODE_1: +(process.env.NEXT_PUBLIC_AUTH_MODE ?? 1) === 1,
  IS_AUTH_MODE_2: +(process.env.NEXT_PUBLIC_AUTH_MODE ?? 1) === 2,
};

export const MAIN_HREF = {
  AUTH: '/auth',
  HOME: '/home',
  LANDING: '/',
};
