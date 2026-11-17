document.addEventListener('DOMContentLoaded',()=>{const menu=document.querySelector('.menu'),nav=document.querySelector('.header nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));}document.querySelectorAll('.year').forEach(el=>el.textContent=new Date().getFullYear());const revealItems=document.querySelectorAll('.section,.pagehero,.band,.closing,.feature-card,.blog-card');revealItems.forEach(el=>el.classList.add('reveal'));if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});revealItems.forEach(el=>observer.observe(el));}else revealItems.forEach(el=>el.classList.add('visible'));const search=document.getElementById('blog-search'),cards=[...document.querySelectorAll('.blog-card')],filters=[...document.querySelectorAll('.filter')],empty=document.getElementById('no-results');let category='all';function filterBlog(){if(!cards.length)return;const q=(search?.value||'').toLowerCase().trim();let shown=0;cards.forEach(card=>{const show=(category==='all'||card.dataset.category.split(' ').includes(category))&&card.textContent.toLowerCase().includes(q);card.hidden=!show;if(show)shown++;});if(empty)empty.hidden=shown!==0;}filters.forEach(btn=>btn.addEventListener('click',()=>{category=btn.dataset.filter;filters.forEach(b=>b.classList.toggle('active',b===btn));filterBlog();}));if(search)search.addEventListener('input',filterBlog);});


// Progressive enhancements: no existing page copy is modified.
document.addEventListener('DOMContentLoaded',()=>{
  const nav=document.querySelector('.header nav');
  const menu=document.querySelector('.menu');
  if(nav&&menu){
    if(!nav.id)nav.id='primary-navigation';
    menu.setAttribute('aria-controls',nav.id);
    menu.setAttribute('aria-label','Open navigation');
    const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');};
    menu.addEventListener('click',()=>menu.setAttribute('aria-label',nav.classList.contains('open')?'Close navigation':'Open navigation'));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){close();menu.focus();}});
    document.addEventListener('click',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!menu.contains(e.target))close();});
    window.addEventListener('resize',()=>{if(window.innerWidth>980)close();},{passive:true});
    nav.querySelectorAll('a').forEach(a=>{if(a.classList.contains('current'))a.setAttribute('aria-current','page');});
  }
  const progress=document.createElement('div');progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');document.body.append(progress);
  const top=document.createElement('button');top.className='back-to-top';top.type='button';top.textContent='↑';top.setAttribute('aria-label','Back to top');top.title='Back to top';document.body.append(top);
  top.addEventListener('click',()=>window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}));
  let scheduled=false;
  function update(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';top.classList.toggle('is-visible',scrollY>480);scheduled=false;}
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}},{passive:true});window.addEventListener('resize',update,{passive:true});update();
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{if(nav&&menu&&nav.classList.contains('open')){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}}));
});
