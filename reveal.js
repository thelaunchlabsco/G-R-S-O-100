'use strict';
(function(){
  const intended=document.body.dataset.gender;
  const raw=new URLSearchParams(location.hash.slice(1)).get('card');
  if(!raw){document.getElementById('warning').textContent='Preview only — open a personalized scratch-card link to see your own photo.';return;}
  try{
    const item=JSON.parse(atob(raw.replace(/-/g,'+').replace(/_/g,'/')));
    const url=new URL(item.p);
    if(item.v!==1||!['girl','boy'].includes(item.g)||item.g!==intended||url.protocol!=='https:'||url.hostname!=='res.cloudinary.com'||!url.pathname.includes('/image/upload/')){
      throw new Error('Invalid link');
    }
    const photo=document.getElementById('chosenPhoto');
    photo.src=url.href;photo.hidden=false;
    document.getElementById('warning').hidden=true;
    photo.onerror=()=>{document.getElementById('warning').hidden=false;document.getElementById('warning').textContent='Photo could not be loaded. Please ask for a new link.';};
  }catch(e){document.getElementById('warning').textContent='This card link is invalid. Please ask for a new link.';}
})();
