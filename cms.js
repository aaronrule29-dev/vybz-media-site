/* VYBZ MEDIA content loader: public content stored in content/site.json */
(async function () {
  try {
    const response = await fetch('/content/site.json', {cache:'no-cache'});
    if (!response.ok) throw new Error('CMS content unavailable');
    const data = await response.json();
    const htmlFields = new Set(['hero_title','work_title','services_title','about_title','contact_title']);
    const allowedTags = new Set(['BR','EM','SPAN']);
    function safeHeading(markup) {
      const doc = new DOMParser().parseFromString('<div>'+String(markup)+'</div>','text/html');
      function clean(node) {
        for (const child of Array.from(node.childNodes)) {
          if (child.nodeType === 1) {
            if (!allowedTags.has(child.tagName)) { child.replaceWith(document.createTextNode(child.textContent)); continue; }
            for (const attr of Array.from(child.attributes)) if (!(child.tagName==='SPAN' && attr.name==='class' && ['accent','outline'].includes(attr.value))) child.removeAttribute(attr.name);
            clean(child);
          } else if (child.nodeType !== 3) child.remove();
        }
      }
      const root=doc.body.firstElementChild; clean(root); return root.innerHTML;
    }
    document.querySelectorAll('[data-content]').forEach(el=>{
      const key=el.dataset.content;
      if (typeof data[key]!=='string') return;
      if (htmlFields.has(key)) el.innerHTML=safeHeading(data[key]);
      else el.textContent=data[key];
    });
    if (typeof data.instagram_url==='string' && /^https:\/\/www\.instagram\.com\//.test(data.instagram_url)) {
      document.querySelectorAll('[data-social="instagram"]').forEach(a=>a.href=data.instagram_url);
    }
    const grid=document.querySelector('#cms-projects');
    if (grid && Array.isArray(data.projects)) {
      grid.replaceChildren();
      data.projects.forEach((item,index)=>{
        const article=document.createElement('article'); article.className='project'+(item.featured?' project-large':'');
        const media=document.createElement('div'); media.className='project-media';
        if (item.image && (/^\/assets\//.test(item.image)||/^assets\//.test(item.image))) {
          const img=document.createElement('img'); img.src=item.image; img.alt=item.alt||item.title||'Portfolio image'; img.loading=index===0?'eager':'lazy'; media.append(img);
        } else {
          media.classList.add('concept-art'); const inner=document.createElement('div'); inner.className='concept-inner';
          const tiny=document.createElement('span');tiny.className='tiny';tiny.textContent=item.status||'COMING SOON';
          const name=document.createElement('strong');name.textContent=item.client||item.title||'PROJECT';
          const detail=document.createElement('span');detail.textContent=item.type||'';
          inner.append(tiny,name,detail);media.append(inner);
        }
        const meta=document.createElement('div');meta.className='project-meta';
        const info=document.createElement('div');const title=document.createElement('h3');title.textContent=item.title||'UNTITLED';
        const desc=document.createElement('p');desc.textContent=[item.client,item.type].filter(Boolean).join(' / ');
        info.append(title,desc);const count=document.createElement('span');count.textContent=String(index+1).padStart(2,'0')+' / '+String(data.projects.length).padStart(2,'0');meta.append(info,count);
        if (item.url && /^https:\/\//.test(item.url)) {
          const link=document.createElement('a');link.href=item.url;link.target='_blank';link.rel='noopener noreferrer';link.className='project-link';link.setAttribute('aria-label','View '+(item.title||'project'));
          link.append(media,meta);article.append(link);
        } else article.append(media,meta);
        grid.append(article);
      });
    }
    const services=document.querySelector('#cms-services');
    if (services && Array.isArray(data.services)) {
      services.replaceChildren();data.services.forEach((item,index)=>{
        const line=document.createElement('div');line.className='service';
        const num=document.createElement('span');num.className='service-num';num.textContent=String(index+1).padStart(2,'0');
        const body=document.createElement('div');const title=document.createElement('h3');title.textContent=item.title||'';
        const desc=document.createElement('p');desc.textContent=item.description||'';body.append(title,desc);
        const arrow=document.createElement('span');arrow.className='service-arrow';arrow.setAttribute('aria-hidden','true');arrow.textContent='↗';
        line.append(num,body,arrow);services.append(line);
      });
    }
  } catch(error) { console.warn('Using built-in page content:',error.message); }
})();
