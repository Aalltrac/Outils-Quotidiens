/* ...existing code... */
import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

const input = document.getElementById('pdf');
const scaleEl = document.getElementById('scale');
const processBtn = document.getElementById('process');
const gallery = document.getElementById('gallery');
let fileURL=null;

input.onchange = () => {
  const f = input.files[0];
  if (!f) return;
  if (fileURL) URL.revokeObjectURL(fileURL);
  fileURL = URL.createObjectURL(f);
  processBtn.disabled = false;
};

processBtn.onclick = async () => {
  gallery.innerHTML = '';
  const doc = await pdfjsLib.getDocument(fileURL).promise;
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const viewport = page.getViewport({ scale: parseFloat(scaleEl.value) });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = viewport.width; canvas.height = viewport.height;
    await page.render({ canvasContext: ctx, viewport }).promise;
    const blob = await new Promise(r=>canvas.toBlob(r, 'image/png', 1));
    const url = URL.createObjectURL(blob);
    const item = document.createElement('div');
    item.style.marginBottom='12px';
    item.innerHTML = `<img src="${url}" alt="Page ${p}" style="max-width:100%; border-radius:8px"><div class="actions"><a href="${url}" download="page-${p}.png" class="primary button">Télécharger page ${p}</a></div>`;
    gallery.appendChild(item);
  }
};
/* ...existing code... */

