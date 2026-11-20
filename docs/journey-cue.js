'use strict';
// 填完基本資料後先停在「我的麻醉照護旅程」，提示往下滑到照護地圖
(()=>{
 const TEXT={'zh-Hant':'往下滑，看看你的麻醉照護地圖',en:'Scroll down to see your anesthesia care map',id:'Gulir ke bawah untuk melihat peta perawatan anestesi Anda',th:'เลื่อนลงเพื่อดูแผนที่การดูแลด้านการระงับความรู้สึกของคุณ',vi:'Kéo xuống để xem bản đồ chăm sóc gây mê của bạn',fil:'Mag-scroll pababa para makita ang mapa ng iyong pangangalaga sa anesthesia'};
 const button=document.getElementById('scroll-to-map');if(!button)return;
 const label=()=>{button.querySelector('.scroll-to-map-text').textContent=TEXT[document.documentElement.lang]||TEXT['zh-Hant']};
 button.onclick=()=>document.querySelector('.map-panel').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
 label();new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
