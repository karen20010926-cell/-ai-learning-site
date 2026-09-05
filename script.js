const header = document.querySelector('#header');
const menuButton = document.querySelector('.menu-button');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20));
menuButton.addEventListener('click', () => {
  const open = header.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
});
document.querySelectorAll('.desktop-nav a').forEach(link => link.addEventListener('click', () => header.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  observer.observe(element);
});

const demoInput = document.querySelector('#demoInput');
const demoForm = document.querySelector('#demoForm');
const chatBody = document.querySelector('#chatBody');
document.querySelectorAll('.prompt-buttons button').forEach(button => button.addEventListener('click', () => {
  demoInput.value = button.textContent.trim();
  demoInput.focus();
}));

const replies = {
  '旅行': 'もちろんです！行き先・日程・好きな過ごし方を教えてください。あなたにぴったりのプランを作ります ✨',
  'Instagram': 'お任せください！テーマに合わせて、投稿文・ハッシュタグ・画像のアイデアまで一緒に考えます。',
  'メール': '承知しました。相手と目的を教えていただければ、丁寧で伝わりやすいメールを作成します。',
  'Web': '素敵ですね！作りたいサイトの目的を教えてください。構成やデザインから一緒に形にしていきましょう。'
};
demoForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = demoInput.value.trim();
  if (!message) return;
  chatBody.querySelector('.welcome')?.remove();
  chatBody.insertAdjacentHTML('beforeend', `<div class="chat-bubble user"></div>`);
  chatBody.lastElementChild.textContent = message;
  demoInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;
  setTimeout(() => {
    const key = Object.keys(replies).find(item => message.includes(item));
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.textContent = replies[key] || 'いいですね！もう少し詳しく教えてください。一緒にアイデアを形にしていきましょう ✨';
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 450);
});
