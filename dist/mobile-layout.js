'use strict';
const ROTATE_TEXT={
'zh-Hant':['請將手機轉成橫式','橫式能更清楚看見地圖、照護示意圖與操作按鈕。','暫時無法旋轉，繼續直式閱讀'],
en:['Turn your phone sideways','Landscape gives the map, illustrations and buttons more room.','Continue in portrait for now'],
id:['Putar ponsel ke posisi mendatar','Posisi mendatar memberi ruang lebih untuk peta, ilustrasi dan tombol.','Lanjutkan dalam posisi tegak'],
th:['กรุณาหมุนโทรศัพท์เป็นแนวนอน','แนวนอนช่วยให้เห็นแผนที่ ภาพประกอบและปุ่มได้ชัดขึ้น','อ่านแนวตั้งต่อในตอนนี้'],
vi:['Vui lòng xoay điện thoại ngang','Màn hình ngang giúp xem bản đồ, hình minh họa và nút rõ hơn.','Tạm tiếp tục xem dọc'],
fil:['Ihiga ang iyong telepono','Mas malinaw ang mapa, mga larawan at pindutan sa landscape.','Magpatuloy muna sa portrait']};
let orientationDismissed=false;
const rotateDialog=document.createElement('dialog');rotateDialog.id='rotate-dialog';rotateDialog.setAttribute('aria-labelledby','rotate-title');rotateDialog.innerHTML='<div class="rotate-card"><div class="rotate-phone" aria-hidden="true"><span>↻</span></div><h2 id="rotate-title"></h2><p class="rotate-description"></p><p class="rotate-english" lang="en">Please rotate your phone to landscape</p><button type="button" class="rotate-continue"></button></div>';document.body.append(rotateDialog);
rotateDialog.querySelector('button').onclick=()=>{orientationDismissed=true;rotateDialog.close()};rotateDialog.addEventListener('cancel',()=>{orientationDismissed=true});
function updateOrientationPrompt(){const text=ROTATE_TEXT[language];rotateDialog.querySelector('h2').textContent=text[0];rotateDialog.querySelector('.rotate-description').textContent=text[1];rotateDialog.querySelector('button').textContent=text[2];const portrait=window.matchMedia('(max-width: 900px) and (orientation: portrait)').matches;if(portrait&&!orientationDismissed&&!rotateDialog.open)rotateDialog.showModal();if(!portrait&&rotateDialog.open)rotateDialog.close();}
window.addEventListener('resize',()=>requestAnimationFrame(updateOrientationPrompt));window.addEventListener('orientationchange',()=>requestAnimationFrame(updateOrientationPrompt));document.addEventListener('DOMContentLoaded',updateOrientationPrompt,{once:true});
