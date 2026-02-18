function toggleMobileMenu(){
  const el = document.getElementById('mobileMenu');
  if(!el) return;
  el.style.display = (el.style.display === 'block') ? 'none' : 'block';
}

function closeMobileMenu(){
  const el = document.getElementById('mobileMenu');
  if(el) el.style.display='none';
}
document.addEventListener('click', (e)=>{
  const mm = document.getElementById('mobileMenu');
  if(!mm) return;
  const btn = document.querySelector('.mobile-toggle');
  if(btn && btn.contains(e.target)) return;
  if(mm.contains(e.target)) return;
  mm.style.display='none';
});
