'use strict';
// 手機版面輔助：不再跳出「請轉成橫式」的提醒（直式、橫式都能直接使用）。
// 保留給 app.js 呼叫的介面，讓原本的流程不用改。
function updateOrientationPrompt(){}
// 手機橫式時，畫面變寬，字與按鈕也一起放大。
const landscapeQuery=window.matchMedia('(orientation: landscape) and (max-height: 600px)');
function landscapeBoost(){return landscapeQuery.matches?1.2:1;}
landscapeQuery.addEventListener('change',()=>{if(typeof updateFontControls==='function'){updateFontControls();renderMap();if(patient)positionPatient(patientPoint)}});
