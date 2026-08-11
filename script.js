const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20));
menu.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});
navLinks.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const input = document.querySelector('.demo-form input');
const chat = document.querySelector('.demo-chat');
const answers = {
  '旅行のプランを考えて': 'もちろんです！行き先・日程・好きな過ごし方を教えてください。ぴったりのプランを一緒に作りましょう ✈️',
  'Instagram投稿を作って': 'お任せください！テーマに合わせて、キャプションとハッシュタグを提案します 📱',
  '仕事のメールを考えて': '丁寧で伝わりやすいメールを作ります。相手と伝えたい内容を教えてください ✉️',
  'Webサイトを作りたい': '素敵ですね！目的やイメージを聞きながら、構成から一緒に考えましょう 💻'
};

document.querySelectorAll('.prompt-list button').forEach((button) => {
  button.addEventListener('click', () => {
    input.value = button.querySelector('span').textContent;
    input.focus();
  });
});

document.querySelector('.demo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const question = input.value.trim();
  if (!question) return;
  chat.querySelector('.demo-welcome')?.remove();
  chat.insertAdjacentHTML('beforeend', `<div class="chat-message"></div>`);
  chat.lastElementChild.textContent = question;
  input.value = '';
  chat.scrollTop = chat.scrollHeight;
  window.setTimeout(() => {
    const answer = answers[question] || 'いい質問ですね！もう少し詳しく教えてもらえれば、一緒に考えることができます ✨';
    chat.insertAdjacentHTML('beforeend', `<div class="chat-answer"></div>`);
    chat.lastElementChild.textContent = answer;
    chat.scrollTop = chat.scrollHeight;
  }, 500);
});
