/* ...existing code... */
import { copyText } from '../script.js';
const ta = document.getElementById('text');
const stats = document.getElementById('stats');
function compute(){
  const t = ta.value;
  const chars = t.length;
  const words = (t.trim().match(/\S+/g)||[]).length;
  const lines = t.split(/\n/).length;
  stats.textContent = `Mots: ${words} · Caractères: ${chars} · Lignes: ${lines}`;
}
ta.addEventListener('input', compute);
compute();
document.getElementById('copy').onclick = () => copyText(ta.value, document.getElementById('copy'));
/* ...existing code... */

