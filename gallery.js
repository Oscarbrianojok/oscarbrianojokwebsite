
document.addEventListener('DOMContentLoaded',()=>{
const tiles=[...document.querySelectorAll('.moment-tile')],filters=[...document.querySelectorAll('.moment-filter')],modal=document.getElementById('moment-lightbox');
if(!modal)return;
const full=document.getElementById('moment-full'),caption=document.getElementById('moment-full-caption');let current=0,lastFocus=null;
const visible=()=>tiles.filter(t=>!t.hidden);
function open(t){lastFocus=document.activeElement;current=tiles.indexOf(t);show();modal.hidden=false;document.body.style.overflow='hidden';modal.querySelector('.moment-close').focus()}
function show(){const t=tiles[current];full.src=t.querySelector('img').src;full.alt=t.querySelector('img').alt;caption.textContent=t.querySelector('strong').textContent+' · '+t.dataset.category}
function step(dir){const list=visible();const idx=list.indexOf(tiles[current]);current=tiles.indexOf(list[(idx+dir+list.length)%list.length]);show()}
function close(){modal.hidden=true;document.body.style.overflow='';full.removeAttribute('src');lastFocus?.focus()}
tiles.forEach(t=>t.addEventListener('click',()=>open(t)));
filters.forEach(f=>f.addEventListener('click',()=>{filters.forEach(b=>{b.classList.toggle('active',b===f);b.setAttribute('aria-pressed',String(b===f))});tiles.forEach(t=>t.hidden=f.dataset.filter!=='All moments'&&t.dataset.category!==f.dataset.filter);}));
modal.querySelector('.moment-close').addEventListener('click',close);
modal.querySelector('.moment-prev').addEventListener('click',()=>step(-1));
modal.querySelector('.moment-next').addEventListener('click',()=>step(1));
modal.addEventListener('click',e=>{if(e.target===modal)close()});
document.addEventListener('keydown',e=>{if(modal.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1);if(e.key==='Tab'){const controls=[...modal.querySelectorAll('button')];const i=controls.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();controls.at(-1).focus()}else if(!e.shiftKey&&i===controls.length-1){e.preventDefault();controls[0].focus()}}});
});
