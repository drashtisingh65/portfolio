/* ===== Certificate data (taken from your attached certificates) ===== */
const CERTS = [
  {img:'assets/certificates/codsoft-ai-internship.jpeg', title:'Virtual Internship in Artificial Intelligence', org:'CodSoft', date:'20 Jun 2026 - 20 Jul 2026 (4 weeks)'},
  {img:'assets/certificates/harmony26-volunteer.jpeg', title:"Certificate of Appreciation - Event Volunteer, HARMONY'26", org:'Shri Ramswaroop Memorial University (Tech Fusion Club)', date:'9 Oct 2026'},
  {img:'assets/certificates/lt-critical-thinking.jpeg', title:'Critical Thinking, Design Thinking, Leadership and Teamwork', org:'L&T EduTech - CollegeConnect Programme (First Class)', date:'28 Jan 2026 - 15 May 2026'},
  {img:'assets/certificates/sih2026-participation.jpeg', title:'Smart India Hackathon 2026 - Internal Round (Participation)', org:'Shri Ramswaroop Memorial University', date:'2026'},
  {img:'assets/certificates/lt-it-world-essentials.jpeg', title:'IT World Essentials', org:'L&T EduTech - CollegeConnect Programme (First Class)', date:'21 Oct 2025 - 31 Dec 2025'}
];

/* Build gallery */
const gal = document.getElementById('gallery');
CERTS.forEach(c=>{
  const b = document.createElement('button');
  b.className='cert reveal'; b.type='button';
  b.setAttribute('aria-label','View certificate: '+c.title);
  b.innerHTML=`<img src="${c.img}" alt="Certificate: ${c.title}" loading="lazy"><div><h4>${c.title}</h4><p>${c.org}</p><p class="date">${c.date}</p></div>`;
  b.addEventListener('click',()=>openLB(c));
  gal.appendChild(b);
});

/* Lightbox */
const lb=document.getElementById('lb'),lbimg=document.getElementById('lbimg'),lbcap=document.getElementById('lbcap');
function openLB(c){lbimg.src=c.img;lbimg.alt=c.title;lbcap.textContent=c.title+' - '+c.org;lb.hidden=false;document.body.style.overflow='hidden';document.getElementById('lbx').focus()}
function closeLB(){lb.hidden=true;document.body.style.overflow=''}
document.getElementById('lbx').onclick=closeLB;
lb.addEventListener('click',e=>{if(e.target===lb)closeLB()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!lb.hidden)closeLB()});

/* Mobile menu + sticky nav state */
const nav=document.getElementById('nav'),menu=document.getElementById('menu'),burger=document.getElementById('burger');
burger.onclick=()=>{const o=menu.classList.toggle('open');burger.setAttribute('aria-expanded',o)};
menu.querySelectorAll('a').forEach(a=>a.onclick=()=>menu.classList.remove('open'));
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30),{passive:true});

/* Scroll reveal + active link highlight */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const links=[...menu.querySelectorAll('a')];
const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('main section').forEach(s=>so.observe(s));

/* Typing animation */
const words=['Data Scientist','AI Enthusiast','Data Analytics Learner'],t=document.getElementById('typed');
let w=0,i=0,del=false;
(function type(){
  const cur=words[w];t.textContent=cur.slice(0,i);
  if(!del&&i===cur.length){del=true;return setTimeout(type,1600)}
  if(del&&i===0){del=false;w=(w+1)%words.length}
  i+=del?-1:1;setTimeout(type,del?45:90);
})();

/* Animated background: drifting nodes joined by lines (data / neural-network feel) */
const cv=document.getElementById('bg'),cx=cv.getContext('2d');let pts=[];
function size(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;const n=Math.min(70,Math.floor(cv.width/18));
  pts=Array.from({length:n},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}))}
function draw(){
  cx.clearRect(0,0,cv.width,cv.height);
  pts.forEach((p,a)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>cv.width)p.vx*=-1;if(p.y<0||p.y>cv.height)p.vy*=-1;
    cx.fillStyle='rgba(34,211,238,.7)';cx.beginPath();cx.arc(p.x,p.y,1.8,0,7);cx.fill();
    for(let b=a+1;b<pts.length;b++){const q=pts[b],d=Math.hypot(p.x-q.x,p.y-q.y);
      if(d<120){cx.strokeStyle=`rgba(99,102,241,${.25*(1-d/120)})`;cx.beginPath();cx.moveTo(p.x,p.y);cx.lineTo(q.x,q.y);cx.stroke()}}});
  requestAnimationFrame(draw);
}
size();addEventListener('resize',size);
if(!matchMedia('(prefers-reduced-motion: reduce)').matches)draw();

/* Contact form: uses Formspree when configured, otherwise opens the visitor's email app */
const form=document.getElementById('form'),note=document.getElementById('note');
form.addEventListener('submit',async e=>{
  if(form.action.includes('YOUR_FORM_ID')){
    e.preventDefault();const d=new FormData(form);
    location.href=`mailto:drashtisingh65@gmail.com?subject=${encodeURIComponent('Portfolio message from '+d.get('name'))}&body=${encodeURIComponent(d.get('message')+'\n\nFrom: '+d.get('email'))}`;
    note.textContent='Opening your email app...';return;
  }
  e.preventDefault();
  try{const r=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
    note.textContent=r.ok?'Thank you! Your message has been sent.':'Something went wrong. Please email me directly.';if(r.ok)form.reset()}
  catch{note.textContent='Network error. Please email me directly.'}
});
document.getElementById('yr').textContent=new Date().getFullYear();
