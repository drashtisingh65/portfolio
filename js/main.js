
/* Drashti Singh portfolio: all interactivity (vanilla JS) */
document.documentElement.classList.add('js');

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* EDIT YOUR LINKS */
const CONFIG = {
  linkedin: '#',
  github: '#',
  formEndpoint: ''
};

$('#linkedin').href = CONFIG.linkedin;
$('#github').href = CONFIG.github;
$('#yr').textContent = new Date().getFullYear();

/* Sticky navigation and mobile menu */
const nav = $('#nav');
const menu = $('#menu');
const burger = $('#burger');

addEventListener('scroll', () => {
  nav.classList.toggle('stuck', scrollY > 20);
}, { passive: true });

burger.onclick = () => {
  const o = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', o);
};

$$('a', menu).forEach(a => {
  a.onclick = () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', false);
  };
});

const links = $$('a', menu);

const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    links.forEach(l => l.classList.toggle(
      'on',
      l.getAttribute('href') === '#' + e.target.id
    ));
  }
}), { rootMargin: '-45% 0px -50% 0px' });

$$('main section').forEach(s => spy.observe(s));

/* Scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('in');
    io.unobserve(e.target);
  }
}), { threshold: .12 });

$$('.reveal').forEach(el => io.observe(el));

/* Typing animation */
const words = [
  'data analysis with Python',
  'SQL and databases',
  'machine learning foundations',
  'web technologies'
];

const t = $('#typed');

if (reduce) {
  t.textContent = words[0];
} else {
  let w = 0, c = 0, del = false;

  (function tick() {
    const word = words[w];
    t.textContent = word.slice(0, c += del ? -1 : 1);

    let d = del ? 40 : 85;

    if (!del && c === word.length) {
      del = true;
      d = 1600;
    } else if (del && c === 0) {
      del = false;
      w = (w + 1) % words.length;
      d = 400;
    }

    setTimeout(tick, d);
  })();
}

/* Animated data-network background */
(function () {
  const cv = $('#bg');
  const x = cv.getContext('2d');
  let W, H, pts;

  const init = () => {
    W = cv.width = innerWidth;
    H = cv.height = innerHeight;

    pts = Array.from({
      length: Math.min(70, Math.floor(W * H / 22000))
    }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - .5) * .3,
      vy: (Math.random() - .5) * .3
    }));
  };

  const draw = () => {
    x.clearRect(0, 0, W, H);

    pts.forEach((p, i) => {
      if (!reduce) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
      }

      x.fillStyle = 'rgba(56,217,232,.8)';
      x.beginPath();
      x.arc(p.x, p.y, 1.6, 0, 7);
      x.fill();

      for (let j = i + 1; j < pts.length; j++) {
        const q = pts[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);

        if (d < 130) {
          x.strokeStyle = `rgba(124,143,255,${.28 * (1 - d / 130)})`;
          x.beginPath();
          x.moveTo(p.x, p.y);
          x.lineTo(q.x, q.y);
          x.stroke();
        }
      }
    });

    if (!reduce) requestAnimationFrame(draw);
  };

  addEventListener('resize', init);
  init();
  draw();
})();

/* Certificate lightbox */
const lb = $('#lb');
const lbImg = $('#lbImg');
let opener;

$$('.cert').forEach(b => {
  b.onclick = () => {
    opener = b;
    lbImg.src = b.dataset.img;
    lbImg.alt = b.dataset.title;
    $('#lbCap').textContent = b.dataset.title;
    lb.hidden = false;
    $('#lbClose').focus();
    document.body.style.overflow = 'hidden';
  };
});

const closeLb = () => {
  lb.hidden = true;
  document.body.style.overflow = '';
  opener && opener.focus();
};

$('#lbClose').onclick = closeLb;

lb.onclick = e => {
  if (e.target === lb) closeLb();
};

addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lb.hidden) closeLb();
});

/* Contact form */
$('#form').addEventListener('submit', async e => {
  e.preventDefault();

  const f = e.target;
  const s = $('#status');
  const d = new FormData(f);

  if (CONFIG.formEndpoint) {
    try {
      const r = await fetch(CONFIG.formEndpoint, {
        method: 'POST',
        body: d,
        headers: { Accept: 'application/json' }
      });

      if (!r.ok) throw 0;

      s.textContent = 'Thank you! Your message has been sent.';
      f.reset();
    } catch {
      s.textContent = 'Sorry, something went wrong. Please email me directly.';
    }
  } else {
    const sub = encodeURIComponent(
      'Portfolio enquiry from ' + d.get('name')
    );

    const body = encodeURIComponent(
      d.get('message') + '\n\n' +
      d.get('name') + ' (' + d.get('email') + ')'
    );

    location.href =
      `mailto:drashtisingh65@gmail.com?subject=${sub}&body=${body}`;

    s.textContent = 'Opening your email app to send the message…';
  }
});
