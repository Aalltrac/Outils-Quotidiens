/* ...existing code... */
const file = document.getElementById('file');
const fmt = document.getElementById('format');
const q = document.getElementById('quality');
const cvs = document.getElementById('canvas');
const ctx = cvs.getContext('2d');
const btnConvert = document.getElementById('convert');
const btnDownload = document.getElementById('download');
const meta = document.getElementById('meta');
let img = new Image(), blobURL=null, outBlob=null;

file.onchange = () => {
  const f = file.files[0]; if (!f) return;
  if (blobURL) URL.revokeObjectURL(blobURL);
  blobURL = URL.createObjectURL(f);
  img = new Image();
  img.onload = () => {
    cvs.width = img.naturalWidth; cvs.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0);
    meta.textContent = `${img.naturalWidth}×${img.naturalHeight}px · ${(f.size/1024).toFixed(1)} KB`;
    btnConvert.disabled = false;
  };
  img.src = blobURL;
};

btnConvert.onclick = async () => {
  const type = fmt.value;
  const quality = parseFloat(q.value);
  const dataURL = cvs.toDataURL(type, quality);
  const res = await (await fetch(dataURL)).blob();
  outBlob = res;
  btnDownload.disabled = false;
  meta.textContent += ` · Sortie: ${(res.size/1024).toFixed(1)} KB · ${type.split('/')[1].toUpperCase()}`;
};

btnDownload.onclick = () => {
  if (!outBlob) return;
  const a = document.createElement('a');
  const outURL = URL.createObjectURL(outBlob);
  a.href = outURL;
  a.download = `image.${fmt.value.split('/')[1]}`;
  a.click();
  setTimeout(()=>URL.revokeObjectURL(outURL),500);
};
/* ...existing code... */

