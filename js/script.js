// Theme toggle & small UX helpers
const root = document.documentElement;
const preferDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (!localStorage.getItem('theme')) localStorage.setItem('theme', preferDark ? 'dark' : 'light');
applyTheme(localStorage.getItem('theme'));

document.getElementById('themeToggle')?.addEventListener('click', () => {
  const next = root.classList.contains('dark') ? 'light' : 'dark';
  localStorage.setItem('theme', next);
  applyTheme(next);
});

function applyTheme(mode) {
  if (mode === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

// Copy helper
export async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    if (button) flash(button);
  } catch { alert('Impossible de copier.'); }
}
export function flash(el) {
  el?.classList.add('flash');
  setTimeout(()=> el?.classList.remove('flash'), 300);
}

