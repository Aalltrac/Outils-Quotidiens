import { copyText } from '../script.js';

const amount = document.getElementById('amount');
const tipPct = document.getElementById('tipPct');
const tipLbl = document.getElementById('tipLbl');
const people = document.getElementById('people');
const result = document.getElementById('result');

tipPct.addEventListener('input', ()=> tipLbl.textContent = `${tipPct.value}%`);
function fmtEur(n){ return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(n) }

document.getElementById('compute').onclick = () => {
  const a = parseFloat(amount.value), p = parseInt(people.value), t = parseFloat(tipPct.value);
  if (isNaN(a) || a<0) return result.textContent='Montant invalide.';
  if (!Number.isFinite(p) || p<1) return result.textContent='Nombre de personnes invalide.';
  const tip = a * (t/100);
  const total = a + tip;
  const per = total / p;
  result.innerHTML = `Pourboire: <strong>${fmtEur(tip)}</strong> · Total: <strong>${fmtEur(total)}</strong> · Par personne: <strong>${fmtEur(per)}</strong>`;
};
document.getElementById('copy').onclick = () => {
  const txt = result.textContent?.trim(); if (!txt) return;
  copyText(txt, document.getElementById('copy'));
};