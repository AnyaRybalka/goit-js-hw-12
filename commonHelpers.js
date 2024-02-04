import{i as l,S as d,a as P}from"./assets/vendor-5401a4b0.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const x="42158298-7ee19009037b01d9fe650f472",S="https://pixabay.com/api/",q=document.querySelector(".form-inline"),p=document.querySelector(".card-container"),o=document.querySelector(".label"),f=document.getElementById("preloader"),c={q:"",page:1,maxPage:0,per_page:15};let h="";const g="is-hidden";function u(e){e.classList.add(g)}function w(e){e.classList.remove(g)}function E(e){e.disabled=!1}function D(e){e.disabled=!0}function M(){f.style.display="block"}function O(){f.style.display="none"}async function _(e){e.preventDefault(),p.innerHTML="";const i=e.currentTarget,n=i.elements.picture.value.trim();if(h=n,c.page=1,n===""||n==null){l.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"}),u(o);return}M();try{const{hits:s,totalHits:t}=await m(n);s&&s.length>0?(b(s,p),new d(".card-container a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh(),s.length<c.per_page||s.length===t?(u(o),l.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):w(o)):(l.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"}),u(o))}catch(s){console.log(s)}finally{O(),i.reset()}}async function m(e,i=1){return P.get(S,{params:{key:x,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:c.per_page,page:i}}).then(n=>n.data)}async function y(){c.page+=1,D(o);try{const{hits:e}=await m(h,c.page);e.length>0?(b(e,p),new d(".card-container a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh()):(u(o),l.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),o.removeEventListener("click",y))}catch(e){console.log(e)}finally{E(o)}}function b(e,i){const n=e.map(({webformatURL:s,likes:t,views:r,comments:a,downloads:v,largeImageURL:L})=>`<a href="${L}" class="picture-link">
    <img src="${s}">
    <div class="picture-content">
        <div class="picture-text">
            <span class="picture-title">Likes</span>
            <span class="picture-sub-title">${t}</span>
        </div>
        <div class="picture-text">
            <span class="picture-title">Views</span>
            <span class="picture-sub-title">${r}</span>
        </div>
        <div class="picture-text">
            <span class="picture-title">Comments</span>
            <span class="picture-sub-title">${a}</span>
        </div>
        <div class="picture-text">
            <span class="picture-title">Downloads</span>
            <span class="picture-sub-title">${v}</span>
        </div>
    </div>
</a>`).join("");i.insertAdjacentHTML("beforeend",n)}q.addEventListener("submit",_);o.addEventListener("click",y);
//# sourceMappingURL=commonHelpers.js.map
