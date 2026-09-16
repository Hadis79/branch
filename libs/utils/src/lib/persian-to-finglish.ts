const persianToFinglish = (text) => {
  const persianToEnglishMap = {
    ا: 'a',
    ب: 'b',
    پ: 'p',
    ت: 't',
    ث: 's',
    ج: 'j',
    چ: 'ch',
    ح: 'h',
    خ: 'kh',
    د: 'd',
    ذ: 'z',
    ر: 'r',
    ز: 'z',
    ژ: 'zh',
    س: 's',
    ش: 'sh',
    ص: 's',
    ض: 'z',
    ط: 't',
    ظ: 'z',
    ع: "'",
    غ: 'gh',
    ف: 'f',
    ق: 'gh',
    ک: 'k',
    گ: 'g',
    ل: 'l',
    م: 'm',
    ن: 'n',
    و: '',
    ه: 'eh',
    ی: 'i',
    آ: 'a',
    ء: 'a',
    ئ: 'e',
    ؤ: 'o',
    ة: 'h',
    ك: 'k', // Arabic 'ك'
    ي: 'i', // Arabic 'ي'
    ى: 'a', // Arabic 'ى'
    إ: 'e', // Arabic 'إ'
    أ: 'a', // Arabic 'أ'
    ٱ: 'a', // Arabic 'ٱ'
    ﻻ: 'la', // Arabic 'ﻻ'
    ﻷ: 'la', // Arabic 'ﻷ'
    ﻹ: 'li', // Arabic 'ﻹ'
    ﻵ: 'la', // Arabic 'ﻵ'
  };

  return text
    .split('')
    .map((char, index) => {
      if (char === 'و') {
        if (index > 0) {
          const prevChar = text[index - 1];
          if (prevChar === 'ئ') {
            return 'ou';
          }
        }
        return 'v';
      }

      return persianToEnglishMap[char] || char;
    })
    .join('');
};

export default persianToFinglish;
