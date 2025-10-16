import { copyText } from '../script.js';
const amount = document.getElementById('amount');
const rate = document.getElementById('rate');
const mode = document.getElementById('mode');
const result = document.getElementById('result');
function fmt(n){ return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(n) }

document.getElementById('compute').onclick = () => {
  const a = parseFloat(amount.value); if (isNaN(a)) return result.textContent='Montant invalide.';
  const t = parseFloat(rate.value)/100;
  let ht, ttc, tva;
  if (mode.value === 'ht2ttc') { ht = a; tva = ht*t; ttc = ht + tva; }
  else { ttc = a; ht = ttc/(1+t); tva = ttc-ht; }
  result.innerHTML = `HT: ${fmt(ht)} · TVA: ${fmt(tva)} · TTC: ${fmt(ttc)} <button id="copy" class="icon-btn">Copier</button>`;
  document.getElementById('copy').onclick = () => copyText(`${ht.toFixed(2)};${tva.toFixed(2)};${ttc.toFixed(2)}`, document.getElementById('copy'));
};