/* ...existing code... */
const tMin = document.getElementById('tMin');
const tSec = document.getElementById('tSec');
const timerDisp = document.getElementById('timerDisp');
const startTimer = document.getElementById('startTimer');
const stopTimer = document.getElementById('stopTimer');
const beep = document.getElementById('beep');

let tLeft=0, tInt=null;
function fmtTimer(s){ const m=Math.floor(s/60), sec=Math.floor(s%60); return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` }
startTimer.onclick = () => {
  const total = parseInt(tMin.value)*60 + parseInt(tSec.value);
  if (!Number.isFinite(total) || total<=0) return alert('Durée invalide.');
  tLeft = total; clearInterval(tInt);
  tInt = setInterval(()=>{
    tLeft--; timerDisp.textContent = fmtTimer(tLeft);
    if (tLeft<=0){ clearInterval(tInt); timerDisp.textContent = '00:00'; beep.currentTime=0; beep.play(); }
  }, 1000);
};
stopTimer.onclick = () => { clearInterval(tInt); };

const chronoDisp = document.getElementById('chronoDisp');
const startChrono = document.getElementById('startChrono');
const lapBtn = document.getElementById('lap');
const resetChrono = document.getElementById('resetChrono');
const laps = document.getElementById('laps');
let cStart=0, cRunning=false, cInt=null, lastLap=0;

function fmtChrono(ms){ const s=Math.floor(ms/1000), m=Math.floor(s/60), sec=s%60, d=Math.floor((ms%1000)/100); return `${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}.${d}` }

startChrono.onclick = () => {
  if (!cRunning){ cStart = performance.now()-lastLap; cInt = setInterval(()=> {
    const now = performance.now();
    const elapsed = now - cStart;
    lastLap = elapsed;
    chronoDisp.textContent = fmtChrono(elapsed);
  }, 100); cRunning = true; startChrono.textContent='Pause'; }
  else { clearInterval(cInt); cRunning=false; startChrono.textContent='Start'; }
};
lapBtn.onclick = () => {
  const li = document.createElement('li');
  li.textContent = `Tour: ${chronoDisp.textContent}`;
  laps.prepend(li);
};
resetChrono.onclick = () => { clearInterval(cInt); cRunning=false; lastLap=0; chronoDisp.textContent='00:00.0'; laps.innerHTML=''; startChrono.textContent='Start'; };
/* ...existing code... */

