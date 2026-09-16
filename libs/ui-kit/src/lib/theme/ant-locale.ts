// import fa_IR from 'antd/locale/fa_IR';
// import en_US from 'antd/locale/en_US';
import fa_IR from 'antd/lib/locale/fa_IR';
import en_US from 'antd/lib/locale/en_US';
import { mergeObjects } from '@branch-services/utils';

const fa_custom = {
  Calendar: {
    lang: {
      ok: 'تایید',
    },
  },
  DatePicker: {
    lang: {
      rangePlaceholder: ['تاریخ شروع', 'تاریخ پایان'],
      ok: 'تایید',
    },
  },
};

const getAntLocale = (localeStr: string) => {
  switch (localeStr) {
    case 'fa':
    case 'fa-IR':
    case 'fa_IR':
      return { ...mergeObjects(fa_IR, fa_custom) };
    case 'en':
    case 'en-US':
    case 'en_US':
    default:
      return { ...en_US };
  }
};

export default getAntLocale;
