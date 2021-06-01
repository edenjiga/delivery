import 'intl';
import 'intl/locale-data/jsonp/es-CO';
import { Platform } from 'react-native';

// if (Platform.OS === 'android') {
//   // See https://github.com/expo/expo/issues/6536 for this issue.
//   if (typeof (Intl as any).__disableRegExpRestore === 'function') {
//     (Intl as any).__disableRegExpRestore();
//   }
// }

/**
 * format number to cop
 * @param {number} value
 */
export function formatNumberToCop(value: number): string | number {
  if (isNaN(value)) return value;
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 0,
  }).format(value);
}
