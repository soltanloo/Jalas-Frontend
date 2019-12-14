export function toPersianDigits(val){
  let num_dic = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
  };

  return (val.replace(/[0-9]/g, function (w) {
    return num_dic[w]
  }));
};

export function toEnglishDigits(val) {
  const numDic = {
    '۰': '0',
    '۱': '1',
    '۲': '2',
    '۳': '3',
    '۴': '4',
    '۵': '5',
    '۶': '6',
    '۷': '7',
    '۸': '8',
    '۹': '9',
  };

  return (val.replace(/[^0-9]/g, w => numDic[w] || w));
}

export function justEnglishDigits(val) {
  return (val.replace(/[^0-9]/g, () => ''));
}
