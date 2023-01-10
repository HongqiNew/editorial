import { Converter } from 'opencc-js';

const chineseConverter = (text: string, toTrad: boolean) => {
  const converterConfig: { from: 'cn' | 'tw', to: 'cn' | 'tw' } =
    toTrad
      ?
      { from: 'cn', to: 'tw' }
      :
      { from: 'tw', to: 'cn' };
  const converter = Converter(converterConfig);
  const convertedText = converter(text);
  // 替换引号
  if (toTrad) {
    return convertedText.replaceAll('“', '「').replaceAll('”', '」').replaceAll('‘', '『').replaceAll('’', '』');
  }
  else {
    return convertedText.replaceAll('「', '“').replaceAll('」', '”').replaceAll('『', '‘').replaceAll('』', '’');
  }
}

export default chineseConverter;
