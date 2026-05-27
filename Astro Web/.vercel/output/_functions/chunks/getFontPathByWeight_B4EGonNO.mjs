import { f as fontDataByCssVariable, r as runtimeFontFileUrlResolver } from './_astro_assets_BsN4-1ez.mjs';
import { A as AstroError, e as FontFileUrlNotFound } from './entrypoint_DrcobDen.mjs';

function createGetFontFileURL(runtimeFontFileUrlResolver) {
  return function getFontFileURL(url, requestUrl) {
    try {
      const result = runtimeFontFileUrlResolver.resolve(url, requestUrl);
      if (result === null) {
        throw new Error("Not found");
      }
      return result;
    } catch (cause) {
      throw new AstroError(
        {
          ...FontFileUrlNotFound,
          message: FontFileUrlNotFound.message(url)
        },
        { cause }
      );
    }
  };
}

const fontData = fontDataByCssVariable;
const experimental_getFontFileURL = createGetFontFileURL(runtimeFontFileUrlResolver);

function getFontPathByWeight(fonts, weight, options) {
  const style = "normal";
  const format = "truetype";
  return fonts.find((font) => font.weight === String(weight) && font.style === style)?.src.find((file) => file.format === format)?.url;
}

export { experimental_getFontFileURL as e, fontData as f, getFontPathByWeight as g };
