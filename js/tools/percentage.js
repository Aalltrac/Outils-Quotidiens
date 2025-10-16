/* ...existing code... */
import { copyText } from '../script.js';

const pct = document.getElementById('pct');
const base = document.getElementById('base');
const out = document.getElementById('out');

function fmt(n){ return Number.isFinite(n) ? new Intl.NumberFormat('fr-FR',{maximumFractionDigits:2}).format(n) : '—' }

function calc(){
  const p = parseFloat(pct.value), b = parseFloat(base.value);
  if (isNaN(p) || isNaN(b)) { out.textContent = 'Entrez des valeurs valides.'; return; }
  const val = b * (p/100);
  out.innerHTML = `<strong>${fmt(p)}% de ${fmt(b)} = ${fmt(val)}</strong>`;
}
document.getElementById('calcPct').onclick = calc;

document.getElementById('inc').onclick = () => {
  const p = parseFloat(pct.value), b = parseFloat(base.value);
  if (isNaN(p)||isNaN(b)) return out.textContent='Entrez des valeurs valides.';
  const res = b*(1+p/100);
  out.innerHTML = `Augmentation: ${fmt(b)} → ${fmt(res)} (<button id="copy" class="icon-btn">Copier</button>)`;
  document.getElementById('copy').onclick = () => copyText(res.toString(), document.getElementById('copy'));
};
document.getElementById('dec').onclick = () => {
  const p = parseFloat(pct.value), b = parseFloat(base.value);
  if (isNaN(p)||isNaN(b)) return out.textContent='Entrez des valeurs valides.';
  const res = b*(1-p/100);
  out.innerHTML = `Réduction: ${fmt(b)} → ${fmt(res)} (<button id="copy2" class="icon-btn">Copier</button>)`;
  document.getElementById('copy2').onclick = () => copyText(res.toString(), document.getElementById('copy2'));
};
/* ...existing code... */

