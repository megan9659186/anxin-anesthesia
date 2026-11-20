'use strict';
// iPhone 上把地圖放大（兩指拉開）後再點房子，視窗會跟著被放大、超出畫面。
// 這裡依照「目前看得到的範圍」(visualViewport) 把視窗縮回剛好一個手機畫面大小，不用自己再縮小。
(()=>{
 const vv=window.visualViewport;if(!vv)return;
 function fit(){document.querySelectorAll('dialog[open]').forEach(d=>{
  if(vv.scale>1.02){const s=vv.scale;d.classList.add('fit-visual');Object.assign(d.style,{left:vv.offsetLeft+'px',top:vv.offsetTop+'px',width:vv.width*s+'px',height:vv.height*s+'px',transform:`scale(${1/s})`})}
  else if(d.classList.contains('fit-visual')){d.classList.remove('fit-visual');['left','top','width','height','transform'].forEach(k=>d.style[k]='')}
 })}
 vv.addEventListener('resize',fit);vv.addEventListener('scroll',fit);
 const original=HTMLDialogElement.prototype.showModal;
 HTMLDialogElement.prototype.showModal=function(){original.call(this);fit()};
})();
