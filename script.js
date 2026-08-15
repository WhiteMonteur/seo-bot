// ---------- Terminal typing animation ----------

const TERMINAL_LINES = [
  { type: 'prompt', text: '$ seo-bot init --server="ton-serveur"' },
  { type: 'out',    text: '> Connexion à l’API Discord... OK' },
  { type: 'out',    text: '> Chargement des modules... OK' },
  { type: 'prompt', text: '$ seo-bot antiraid --enable' },
  { type: 'ok',     text: '> Protection anti-raid activée' },
  { type: 'out',    text: '> 12 comptes suspects bloqués (7 derniers jours)' },
  { type: 'prompt', text: '$ seo-bot logs --channel="#logs"' },
  { type: 'ok',     text: '> Journalisation activée' },
];

function typeTerminal(){
  const body = document.getElementById('terminal-body');
  if(!body) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(reduceMotion){
    body.innerHTML = TERMINAL_LINES
      .map(l => `<div class="line ${l.type}">${l.text}</div>`)
      .join('') + '<span class="cursor"></span>';
    return;
  }

  let lineIndex = 0;
  let charIndex = 0;

  function step(){
    if(lineIndex >= TERMINAL_LINES.length){
      body.insertAdjacentHTML('beforeend', '<span class="cursor"></span>');
      return;
    }

    const current = TERMINAL_LINES[lineIndex];
    let lineEl = document.getElementById(`t-line-${lineIndex}`);
    if(!lineEl){
      lineEl = document.createElement('div');
      lineEl.id = `t-line-${lineIndex}`;
      lineEl.className = `line ${current.type}`;
      body.appendChild(lineEl);
    }

    charIndex++;
    lineEl.textContent = current.text.slice(0, charIndex);

    if(charIndex >= current.text.length){
      lineIndex++;
      charIndex = 0;
      setTimeout(step, current.type === 'prompt' ? 260 : 140);
    } else {
      setTimeout(step, current.type === 'prompt' ? 26 : 14);
    }
  }

  step();
}

document.addEventListener('DOMContentLoaded', typeTerminal);

// ---------- "Prochainement" modal ----------

function openModal(){
  const overlay = document.getElementById('modal-overlay');
  if(!overlay) return;
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.getElementById('modal-close-btn')?.focus();
}

function closeModal(){
  const overlay = document.getElementById('modal-overlay');
  if(!overlay) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', openModal);
  });
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });
  document.getElementById('modal-overlay')?.addEventListener('click', (e) => {
    if(e.target.id === 'modal-overlay') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') closeModal();
  });
});
