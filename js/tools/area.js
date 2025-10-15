/* ...existing code... */
const len = document.getElementById('len');
const wid = document.getElementById('wid');
const result = document.getElementById('result');
function fmt(n){ return new Intl.NumberFormat('fr-FR',{maximumFractionDigits:2}).format(n) }
document.getElementById('compute').onclick = () => {
  const l=parseFloat(len.value), w=parseFloat(wid.value);
  if (isNaN(l)||isNaN(w)) return result.textContent='Valeurs invalides.';
  const area = l*w;
  result.textContent = `${fmt(area)} m²`;
};
/* ...existing code... */

