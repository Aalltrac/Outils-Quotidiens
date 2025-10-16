import { copyText } from '../script.js';

const BASE = ('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. ' +
'Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.').split(' ');

const type = document.getElementById('type');
const qty = document.getElementById('qty');
const lengthSel = document.getElementById('length');
const out = document.getElementById('out');

function randWord(){ return BASE[Math.floor(Math.random()*BASE.length)].toLowerCase().replace(/[.,]/g,''); }
function makeWords(n){ return Array.from({length:n}, randWord).join(' ') }
function paraLen(level){ return level==='short'? 30 : level==='long' ? 120 : 60 }

document.getElementById('generate').onclick = () => {
  const q = Math.max(1, Math.min(50, parseInt(qty.value)||3));
  const len = lengthSel.value;
  let html='';
  if (type.value==='words'){
    html = makeWords(paraLen(len));
  } else if (type.value==='list'){
    html = '<ul>' + Array.from({length:q}, ()=>`<li>${makeWords(Math.floor(paraLen(len)/3))}</li>`).join('') + '</ul>';
  } else {
    html = Array.from({length:q}, ()=>`<p>${makeWords(paraLen(len))}.</p>`).join('');
  }
  out.innerHTML = html;
};
document.getElementById('copy').onclick = () => {
  const txt = out.textContent?.trim(); if (!txt) return;
  copyText(txt, document.getElementById('copy'));
};