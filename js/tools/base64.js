// Convertisseur Base64 — Texte et images
import { copyText } from '../script.js';

const encText = document.getElementById('encText');
const encFile = document.getElementById('encFile');
const encOut = document.getElementById('encOut');

document.getElementById('doEncode').onclick = async () => {
  const txt = encText.value.trim();
  if (encFile.files[0]) {
    const f = encFile.files[0];
    const reader = new FileReader();
    reader.onload = () => { encOut.value = reader.result; };
    reader.onerror = () => alert('Erreur de lecture du fichier.');
    reader.readAsDataURL(f); // Data URL Base64 incluant le mime type
  } else if (txt) {
    const b64 = btoa(unescape(encodeURIComponent(txt)));
    encOut.value = b64;
  } else {
    encOut.value = ''; alert('Entrez du texte ou choisissez une image.');
  }
};

document.getElementById('copyEnc').onclick = () => copyText(encOut.value, document.getElementById('copyEnc'));

// Décodage
const decInput = document.getElementById('decInput');
const decText = document.getElementById('decText');
const decImg = document.getElementById('decImg');

document.getElementById('doDecode').onclick = () => {
  const src = decInput.value.trim();
  if (!src) return alert('Collez une chaîne Base64.');
  decText.value = ''; decImg.removeAttribute('src');
  try {
    // Essayer texte
    const txt = decodeURIComponent(escape(atob(src.replace(/^data:[^;]+;base64,/, ''))));
    decText.value = txt;
  } catch {
    // Essayer image data URL
    if (src.startsWith('data:')) {
      decImg.src = src;
    } else {
      alert('Chaîne invalide ou non supportée.');
    }
  }
};

document.getElementById('copyDec').onclick = () => {
  const toCopy = decText.value || decInput.value;
  if (!toCopy) return;
  copyText(toCopy, document.getElementById('copyDec'));
};