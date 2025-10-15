/* ...existing code... */
import { copyText } from '../script.js';
const rateMap = { prive: 0.23, cadre: 0.25, public: 0.15 };
const amount = document.getElementById('amount');
const direction = document.getElementById('direction');
const profile = document.getElementById('profile');
const result = document.getElementById('result');

function fmt(n){ return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(n) }

document.getElementById('compute').onclick = () => {
  const a = parseFloat(amount.value);
  if (isNaN(a)) { result.textContent = 'Montant invalide.'; return; }
  const r = rateMap[profile.value];
  let out;
  if (direction.value === 'brut2net') out = a * (1 - r);
  else out = a / (1 - r);
  result.innerHTML = `<strong>${fmt(out)}</strong> <button id="copy" class="icon-btn">Copier</button>`;
  document.getElementById('copy').onclick = () => copyText(out.toFixed(2), document.getElementById('copy'));
};
/* ...existing code... */

