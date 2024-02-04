import{i as u,S as d,a as P}from"./assets/vendor-5401a4b0.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();const x="42158298-7ee19009037b01d9fe650f472",S="https://pixabay.com/api/",q=document.querySelector(".form-inline"),p=document.querySelector(".card-container"),n=document.querySelector(".label"),f=document.getElementById("preloader"),o={q:"",page:1,maxPage:0,per_page:15};let h="";const m="is-hidden";function l(t){t.classList.add(m)}function g(t){t.classList.remove(m)}function w(t){t.disabled=!1}function E(t){t.disabled=!0}function M(){f.style.display="block"}function D(){f.style.display="none"}q.addEventListener("submit",O);async function O(t){t.preventDefault(),p.innerHTML="";const s=t.currentTarget,i=s.elements.picture.value.trim();if(h=i,o.page=1,i===""||i==null){u.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"}),l(n);return}M();try{const{hits:a,totalHits:e}=await y(i);a&&a.length>0?(o.maxPage=Math.ceil(e/o.per_page),b(a,p),new d(".card-container a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh(),a.length!==e?g(n):l(n)):(u.error({message:"Sorry, there are no images matching your search query. Please, try again!",position:"topRight"}),l(n))}catch(a){console.log(a)}finally{D(),s.reset()}}async function y(t,s=1){return P.get(S,{params:{key:x,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:o.per_page,page:s}}).then(i=>i.data)}n.addEventListener("click",_);async function _(){o.page+=1,E(n);try{const{hits:t}=await y(h,o.page);b(t,p),new d(".card-container a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250}).refresh(),o.page>=o.maxPage?(l(n),u.error({title:"Error",message:"We're sorry, but you've reached the end of search results."})):g(n)}catch(t){console.log(t)}finally{w(n)}}function b(t,s){const i=t.map(({webformatURL:a,likes:e,views:r,comments:c,downloads:v,largeImageURL:L})=>`<a href="${L}" class="picture-link">
    <img src="${a}">
    <div class="picture-content">
        <div class="picture-text">
            <span class="picture-title">Likes</span>
            <span class="picture-sub-title">${e}</span>
        </div>
        <div class="picture-text">
            <span class="picture-title">Views</span>
            <span class="picture-sub-title">${r}</span>
        </div>
        <div class="picture-text">
            <span class="picture-title">Comments</span>
            <span class="picture-sub-title">${c}</span>
        </div>
        <div class="picture-text">
            <span class="picture-title">Downloads</span>
            <span class="picture-sub-title">${v}</span>
        </div>
    </div>
</a>`).join("");s.insertAdjacentHTML("beforeend",i)}
//# sourceMappingURL=commonHelpers.js.map
