import tinycolor from 'tinycolor2';
import { copyText } from '../script.js';

const picker = document.getElementById('picker');
const hex = document.getElementById('hex');
const rgb = document.getElementById('rgb');
const hsl = document.getElementById('hsl');
const prev = document.getElementById('preview');

function updateFromColor(c){
  const tc = tinycolor(c);
  const h = tc.toHexString();
  const r = tc.toRgbString();
  const s = tc.toHslString();
  hex.value = h; rgb.value = r; hsl.value = s; prev.style.background = h;
}
picker.addEventListener('input', e => updateFromColor(e.target.value));
hex.addEventListener('input', () => updateFromColor(hex.value));
rgb.addEventListener('input', () => updateFromColor(rgb.value));
hsl.addEventListener('input', () => updateFromColor(hsl.value));
updateFromColor(picker.value);

document.getElementById('copyHex').onclick = () => copyText(hex.value, document.getElementById('copyHex'));
document.getElementById('copyRgb').onclick = () => copyText(rgb.value, document.getElementById('copyRgb'));
document.getElementById('copyHsl').onclick = () => copyText(hsl.value, document.getElementById('copyHsl'));