'use strict';
// iPhone 已經被放大時（例如在地圖上兩指放大），打開視窗先把畫面縮回原本大小：
// 暫時把 viewport 設成 maximum-scale=1，Safari 會自動縮回，之後馬上恢復，仍然可以兩指放大。
// 注意：不要在使用者兩指縮放的過程中去改視窗大小或位置，否則會跟手指打架，畫面會跳走。
(()=>{
 const vv=window.visualViewport,meta=document.querySelector('meta[name=viewport]');if(!vv||!meta)return;
 const base=meta.content;
 function resetZoom(){if(vv.scale<=1.02)return;meta.content=base+',maximum-scale=1';setTimeout(()=>{meta.content=base},350)}
 const original=HTMLDialogElement.prototype.showModal;
 HTMLDialogElement.prototype.showModal=function(){original.call(this);resetZoom()};
})();
