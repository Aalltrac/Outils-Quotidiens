/* ...existing code... */
import QRCode from 'qrcode';
const text = document.getElementById('text');
const size = document.getElementById('size');
const margin = document.getElementById('margin');
const canvas = document.getElementById('canvas');
const genBtn = document.getElementById('generate');
const dlBtn = document.getElementById('download');

genBtn.onclick = async () => {
  const t = text.value.trim();
  if (!t) return alert('Entrez du texte ou une URL.');
  await QRCode.toCanvas(canvas, t, { width: parseInt(size.value), margin: parseInt(margin.value) });
  dlBtn.disabled = false;
};
dlBtn.onclick = () => {
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = 'qrcode.png';
  a.click();
};
/* ...existing code... */

