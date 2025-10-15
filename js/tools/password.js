/* ...existing code... */
import { copyText } from '../script.js';
const len=document.getElementById('len');
const upper=document.getElementById('upper');
const digits=document.getElementById('digits');
const symbols=document.getElementById('symbols');
const out=document.getElementById('out');

function gen(){
  const l = Math.min(128, Math.max(8, parseInt(len.value)||16));
  let pool = 'abcdefghijklmnopqrstuvwxyz';
  if (upper.checked) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (digits.checked) pool += '0123456789';
  if (symbols.checked) pool += '!@#$%^&*()-_=+[]{};:,.<>?';
  if (pool.length < 10) return out.textContent='Sélectionnez au moins un ensemble.';
  const arr = new Uint32Array(l); crypto.getRandomValues(arr);
  let pass=''; for (let i=0;i<l;i++) pass += pool[arr[i]%pool.length];
  out.textContent = pass;
}
document.getElementById('generate').onclick = gen;
document.getElementById('copy').onclick = () => copyText(out.textContent, document.getElementById('copy'));
gen();
/* ...existing code... */

