// Convertisseur d'unités — Longueur, Poids, Volume, Température
import { copyText } from '../script.js';

const category = document.getElementById('category');
const from = document.getElementById('from');
const to = document.getElementById('to');
const value = document.getElementById('value');
const result = document.getElementById('result');

const UNITS = {
  length: { base: 'm', units: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, yd: 0.9144, mi: 1609.344 } },
  weight: { base: 'kg', units: { mg: 1e-6, g: 1e-3, kg: 1, t: 1000, oz: 0.028349523125, lb: 0.45359237 } },
  volume: { base: 'l', units: { ml: 0.001, cl: 0.01, dl: 0.1, l: 1, m3: 1000, tsp: 0.00492892, tbsp: 0.0147868, cup: 0.236588, pt: 0.473176, qt: 0.946353, gal: 3.78541 } },
  temperature: { units: { C: 'C', F: 'F', K: 'K' } }
};

function fillUnits(cat) {
  const u = Object.keys(cat === 'temperature' ? UNITS.temperature.units : UNITS[cat].units);
  from.innerHTML = u.map(x=>`<option value="${x}">${x}</option>`).join('');
  to.innerHTML = u.map(x=>`<option value="${x}">${x}</option>`).join('');
}
function fmt(n){ return Number.isFinite(n) ? new Intl.NumberFormat('fr-FR',{maximumFractionDigits:4}).format(n) : '—' }

category.addEventListener('change', ()=> fillUnits(category.value));
fillUnits(category.value);

document.getElementById('convert').onclick = () => {
  const v = parseFloat(value.value);
  if (isNaN(v)) { result.textContent = 'Valeur invalide.'; return; }
  let out;
  if (category.value !== 'temperature') {
    const map = UNITS[category.value].units;
    const baseVal = v * map[from.value]; // vers unité de base
    out = baseVal / map[to.value];
  } else {
    // Température
    const f = from.value, t = to.value;
    const toC = (x, u) => u==='C'?x : u==='F' ? (x-32)*5/9 : x-273.15;
    const fromC = (x, u) => u==='C'?x : u==='F' ? x*9/5+32 : x+273.15;
    out = fromC(toC(v, f), t);
  }
  result.innerHTML = `<strong>${fmt(out)} ${to.value}</strong>`;
};
document.getElementById('copy').onclick = () => {
  const txt = result.textContent?.trim(); if (!txt) return;
  copyText(txt, document.getElementById('copy'));
};