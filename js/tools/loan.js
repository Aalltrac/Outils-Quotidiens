import { copyText } from '../script.js';

const principal = document.getElementById('principal');
const rate = document.getElementById('rate');
const years = document.getElementById('years');
const summary = document.getElementById('summary');
const schedule = document.getElementById('schedule');

function fmtEur(n){ return new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR'}).format(n) }
function fmtNum(n){ return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:2}).format(n) }

document.getElementById('compute').onclick = () => {
  const P = parseFloat(principal.value);
  const r = parseFloat(rate.value)/100/12;
  const n = parseInt(years.value)*12;
  if (isNaN(P)||P<=0) return summary.textContent='Capital invalide.';
  if (!Number.isFinite(r) || r<0) return summary.textContent='Taux invalide.';
  if (!Number.isFinite(n) || n<1) return summary.textContent='Durée invalide.';
  const m = r===0 ? P/n : P * (r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
  let bal = P, totalInterest = 0;
  const rows = [];
  for (let i=1; i<=n; i++){
    const interest = bal * r;
    const principalPaid = m - interest;
    bal = Math.max(0, bal - principalPaid);
    totalInterest += interest;
    rows.push({i, interest, principalPaid, bal});
  }
  summary.innerHTML = `Mensualité: <strong>${fmtEur(m)}</strong> · Intérêts totaux: <strong>${fmtEur(totalInterest)}</strong> · Coût total: <strong>${fmtEur(P+totalInterest)}</strong>`;
  const list = document.createElement('table');
  list.style.width='100%'; list.style.borderCollapse='collapse';
  list.innerHTML = `<thead><tr><th>#</th><th>Intérêts</th><th>Principal</th><th>Solde</th></tr></thead><tbody>${
    rows.slice(0, 360).map(rw=>`<tr>
      <td>${rw.i}</td><td>${fmtEur(rw.interest)}</td><td>${fmtEur(rw.principalPaid)}</td><td>${fmtEur(rw.bal)}</td>
    </tr>`).join('')
  }</tbody>`;
  schedule.innerHTML = ''; schedule.appendChild(list);
};
document.getElementById('copy').onclick = () => {
  const txt = summary.textContent?.trim(); if (!txt) return;
  copyText(txt, document.getElementById('copy'));
};