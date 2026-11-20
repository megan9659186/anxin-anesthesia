'use strict';
const $ = selector => document.querySelector(selector);
const svgNS = 'http://www.w3.org/2000/svg';
let language = 'zh-Hant', languageChosen = false, patient = null, draft = null;
let currentStation = 0, currentTopic = null, moving = false, pendingStation = null, reopenProfile = false;
let phase = 'all', seen = new Set(), quizAnswer = null;
let patientPoint = [350,300], animateWalking = true;
// patientMode：gown 病人服走路、bed 躺病床被推、clothes 換回自己的衣服；insideHouse：小病人目前在哪間房子裡（null＝在外面）。
let patientMode='gown', insideHouse=null, leavePromise=null;
// 恢復室（第 4 站）放在手術室旁邊；它的路口往右偏，道路才不會穿過房子。
let houses = [[280,260],[470,155],[670,260],[600,405],[370,490],[180,380]];
let totalStops=houses.length;
const routeFor = list => list.map(([x,y],i) => i===3 ? [x+42,y+55] : [x,y+60]);
let route = routeFor(houses);
let parking = [[410,280],[595,185],[540,275],[690,400],[495,460],[305,385]];
const phaseFor = i => i < 2 ? 1 : i < 3 ? 2 : 3;
const colors = ['#ffc9d6','#d9cff7','#bfe8b0','#c4e2f7','#ffd6b0','#fff0a0','#f5d9f2','#d6f0ea'];
const ui = () => journeyPack(language,LANGUAGES[language]);
const t = (key, values = {}) => String(ui()[key]).replace(/\{(\w+)\}/g, (_, k) => values[k] ?? '');
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reducedMotion = () => !animateWalking;
const topicName = i => ui().topics[i][0];
function textElement(tag, text, className) { const el=document.createElement(tag); el.textContent=text; if(className)el.className=className; return el; }
let uniformSerial=0;
function avatar(casual=false){const cloth='patient-uniform-'+(++uniformSerial);const top=casual?'#ffb3c7':`url(#${cloth})`,legs=casual?'#5b7fc4':`url(#${cloth})`,edge=casual?'#e48aa5':'#7e9eb7';return `<defs><pattern id="${cloth}" patternUnits="userSpaceOnUse" width="3.8" height="4"><rect width="3.8" height="4" fill="#b7d0e2"/><path d="M1 0V4" stroke="#f9fcfb" stroke-width="1.4"/><path d="M3.1 0V4" stroke="#87abc7" stroke-width=".5"/></pattern></defs><ellipse cx="0" cy="17" rx="19" ry="6" fill="#244c4326"/><g class="little-body"><path class="leg-left" d="M-8-5v20" stroke="${legs}" stroke-width="9" stroke-linecap="round"/><path class="leg-right" d="M8-5v20" stroke="${legs}" stroke-width="9" stroke-linecap="round"/><path d="M-12 16h8m8 0h8" stroke="${casual?'#fff':'#597380'}" stroke-width="4" stroke-linecap="round"/><path class="arm-left" d="M-16-27l-5 19" stroke="#f0c6a1" stroke-width="6" stroke-linecap="round"/><path class="arm-right" d="M16-27l5 19" stroke="#f0c6a1" stroke-width="6" stroke-linecap="round"/><path class="arm-left" d="M-15-28l-5 ${casual?8:13}" stroke="${top}" stroke-width="9" stroke-linecap="round"/><path class="arm-right" d="M15-28l5 ${casual?8:13}" stroke="${top}" stroke-width="9" stroke-linecap="round"/><path d="M-16-30q16-12 32 0l-2 29h-28Z" fill="${top}" stroke="${edge}" stroke-width="1.2"/>${casual?'<path d="M0-12C-7-17-5-23 0-20 5-23 7-17 0-12Z" fill="#fff"/><path d="M-6-34q6 5 12 0" fill="none" stroke="#fff" stroke-width="1.6"/>':`<path d="M-7-33L0-23 7-33M0-23V-2" fill="none" stroke="#f4fafb" stroke-width="1.6"/><circle cy="-18" r=".9" fill="#628ba8"/><circle cy="-10" r=".9" fill="#628ba8"/><path d="M6-17h7v10H6Z" fill="none" stroke="#7e9eb7" stroke-width=".7"/><g transform="translate(9 -10)" fill="#326f9c"><path d="M0 0q-4-3 0-6 4 3 0 6ZM0 0q-6 0-6-4 5-1 6 4ZM0 0q6 0 6-4-5-1-6 4Z"/><path d="M-5 1q5 3 10 0" fill="none" stroke="#326f9c" stroke-width=".7"/></g>`}<circle cy="-48" r="17" fill="#f2cfad"/><path d="M-17-49q-1-24 17-20 21 0 17 22l-7-11q-17 9-25 3Z" fill="#48685a"/><circle cx="-6" cy="-47" r="1.6" fill="#284c47"/><circle cx="6" cy="-47" r="1.6" fill="#284c47"/><path d="M-4-40q4 4 8 0" stroke="#a16c56" fill="none" stroke-width="1.5"/></g>`;}

// 從安心手術室到恢復室：病人躺在病床上，麻醉護理師（床頭）與巡迴護理師（床尾）一起推床。
const TRANSFER_TEXT={'zh-Hant':'{name} 躺在病床上，由巡迴護理師和麻醉護理師一起推往恢復室…',en:'{name} is lying on the bed while the circulating nurse and nurse anesthetist wheel it to the recovery room…',id:'{name} berbaring di tempat tidur, didorong perawat sirkuler dan perawat anestesi ke ruang pemulihan…',th:'{name} นอนบนเตียง พยาบาลห้องผ่าตัดและพยาบาลวิสัญญีช่วยกันเข็นไปห้องพักฟื้น…',vi:'{name} nằm trên giường, được điều dưỡng chạy ngoài và điều dưỡng gây mê cùng đẩy đến phòng hồi tỉnh…',fil:'Nakahiga si {name} sa kama habang itinutulak ito ng circulating nurse at nurse anesthetist papunta sa recovery room…'};
function transferNurse(x,scrub,cap,reach){return `<g transform="translate(${x} 0)"><g class="little-body"><path class="leg-left" d="M-5-12v20" stroke="#6d7fa3" stroke-width="7" stroke-linecap="round"/><path class="leg-right" d="M5-12v20" stroke="#6d7fa3" stroke-width="7" stroke-linecap="round"/><path d="M-8 9h6m4 0h6" stroke="#fdfdfd" stroke-width="4" stroke-linecap="round"/><path d="M-12-44q12-8 24 0l-1 34h-22Z" fill="${scrub}"/><path d="M-5-46L0-38 5-46" fill="none" stroke="#fff" stroke-width="1.6"/><path d="M${reach>0?8:-8}-38l${reach} 6" stroke="${scrub}" stroke-width="7" stroke-linecap="round"/><circle cx="${reach>0?8+reach:-8+reach}" cy="-32" r="3.4" fill="#f2cfad"/><circle cy="-56" r="11" fill="#f2cfad"/><path d="M-12-57q0-14 12-14 12 0 12 14Z" fill="${cap}"/><circle cx="-3.5" cy="-55" r="1.4" fill="#4b3a3a"/><circle cx="3.5" cy="-55" r="1.4" fill="#4b3a3a"/><path d="M-6-50h12v4q-6 4-12 0Z" fill="#eef7fb"/><circle cx="-7" cy="-51" r="2" fill="#f7b6c2" opacity=".7"/><circle cx="7" cy="-51" r="2" fill="#f7b6c2" opacity=".7"/></g></g>`;}
function bedTransferSVG(){return `<ellipse cx="0" cy="13" rx="96" ry="8" fill="#7a6a9a22"/>
<path d="M-56 8V-14M56 8V-14" stroke="#b9b3cc" stroke-width="4"/><path d="M-62-14H62" stroke="#a9a2c2" stroke-width="5" stroke-linecap="round"/>
<circle cx="-56" cy="9" r="5.5" fill="#6f6788"/><circle cx="56" cy="9" r="5.5" fill="#6f6788"/>
<rect x="-60" y="-27" width="120" height="13" rx="6" fill="#fff" stroke="#d6cfe6" stroke-width="1.5"/>
<path d="M-62-14V-34M62-14V-30" stroke="#a9a2c2" stroke-width="4" stroke-linecap="round"/>
<path d="M50-27V-74M44-74h12" stroke="#b9b3cc" stroke-width="2.5"/><rect x="45" y="-72" width="10" height="15" rx="3" fill="#e7f6fb" stroke="#9cc9d8"/><path d="M50-57Q46-40 34-34" fill="none" stroke="#9cc9d8" stroke-width="1.2"/>
<ellipse cx="-43" cy="-30" rx="14" ry="6" fill="#eef1fb"/>
<circle cx="-42" cy="-38" r="9" fill="#f2cfad"/><path d="M-51-39q1-10 10-10 8 0 9 7-7-2-11 3Z" fill="#48685a"/><path d="M-45-37q2 2 4 0M-40-37q2 2 4 0" stroke="#5a4646" stroke-width="1" fill="none"/><circle cx="-46" cy="-34" r="1.6" fill="#f7b6c2"/>
<path d="M-33-38Q-30-45-18-44H48Q56-44 56-34V-27H-34Z" fill="#f8c9d6" stroke="#eba9bd" stroke-width="1.5"/><path d="M-30-33H54" stroke="#fde4ea" stroke-width="3"/><path d="M-6-44v17M20-44v17" stroke="#f3b6c7" stroke-width="1"/>
<text x="-22" y="-48" class="transfer-zz" style="font-size:9px" fill="#9a8fc4">z z</text>
${transferNurse(-82,'#a8d8cf','#7fbfb3',14)}${transferNurse(82,'#f5b7c8','#e993ad',-14)}`;}
function building(i) { const wall=['#ffd66e','#fff6e6','#ffe0a8','#ffffff','#ffd9c2','#fff1b0'][i%6],roof=['#e8504a','#7b6be0','#4fae6e','#5aa0e0','#f08a3c','#e86aa0'][i%6];return `<g transform="translate(-29 -43)" filter="url(#crayon)"><path d="M0 20L30 3L63 22L33 40Z" fill="#5f8a3f" opacity=".2" transform="translate(0 35)"/><path d="M4 15L30 0L59 16V50L32 66L4 50Z" fill="${wall}" stroke="#6a4a2a" stroke-width="1.6" stroke-linejoin="round"/><path d="M32 31L59 16V50L32 66Z" fill="#c98a3a" opacity=".22"/><path class="roof" d="M-2 15L30-5L65 15L32 35Z" fill="${roof}" stroke="#6a3a2a" stroke-width="1.6" stroke-linejoin="round"/><path d="M6 15L30 1M14 19L38 5M22 23L46 9M30 27L54 13" stroke="#fff" stroke-width="1.2" opacity=".35"/><path d="M19 35V49L27 54V40Z" fill="#3a2418"/><path class="door" d="M19 35V49L27 54V40Z" fill="#a8683a" stroke="#6a3a2a" stroke-width="1.2"/><path d="M39 39V49L48 44V34Z" fill="#9fd3f5" stroke="#5a7a9a" stroke-width="1.2"/><path d="M43.5 36.5V46.5M39 44L48 39" stroke="#5a7a9a" stroke-width="1"/><path d="M11 33V41L16 44V36Z" fill="#9fd3f5" stroke="#5a7a9a" stroke-width="1"/>${i===3?'<path d="M25 4h10m-5-5v10" stroke="#fff" stroke-width="3"/>':''}</g>`; }
function svgText(text,x,y,cls){const el=document.createElementNS(svgNS,'text');el.setAttribute('x',x);el.setAttribute('y',y);el.setAttribute('class',cls);el.textContent=text;return el;}
function renderMap(){
 // 只有一圈環島白色道路；小人只沿著這圈白線走。
 const road=route.map(([x,y],i)=>(i?'L':'M')+x+' '+y).join('')+'Z';document.querySelectorAll('.island-road').forEach(el=>el.setAttribute('d',road));$('#plots').innerHTML='';$('#houses').innerHTML='';$('#house-labels').innerHTML='';$('#route-arrows').innerHTML='';
 houses.forEach(([x,y],i)=>{
  $('#plots').insertAdjacentHTML('beforeend',`<path id="plot-${i}" class="plot${currentStation===i&&patient?' active':''}" fill="${colors[i]}" d="M${x} ${y-50}l104 60-104 60-104-60Z"/>`);
  const g=document.createElementNS(svgNS,'g');g.setAttribute('class','house');g.setAttribute('data-station',i);g.setAttribute('transform',`translate(${x} ${y})`);g.setAttribute('role','button');g.setAttribute('tabindex','0');g.setAttribute('aria-label',t('station',{n:i+1})+': '+topicName(i));g.innerHTML=building(i)+(seen.has(i)?'<g class="visited-seal" transform="translate(54 -31)"><circle r="13" fill="#f7c66b" stroke="#fff" stroke-width="2"/><path d="M-6 0l4 4 8-9" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>':'')+`<circle cx="-44" cy="-9" r="13" fill="#ec8fab" stroke="#fff" stroke-width="2.5"/><text class="station-number" x="-44" y="-4">${i+1}</text>`;
  const name=topicName(i);let lines=[name];if(name.includes('（')||name.includes(' (')){const split=name.includes('（')?name.indexOf('（'):name.indexOf(' (');lines=[name.slice(0,split),name.slice(split).trim()]}else if(name.length>19&&name.includes(' ')){let parts=name.split(' '),line='';lines=[];parts.forEach(word=>{if((line+' '+word).trim().length>19&&line){lines.push(line);line=word}else line=(line+' '+word).trim()});if(line)lines.push(line)}
  const lineGap=14*(Number(document.documentElement.style.getPropertyValue('--text-scale'))||1.15),subGap=lineGap*.72;
  // 房子名稱做成屋頂上的小招牌，不放在道路上，小人走路時不會和字重疊。
  const label=document.createElementNS(svgNS,'g');label.setAttribute('class','house-label');label.setAttribute('data-station',i);label.setAttribute('transform',`translate(${x} ${y})`);label.setAttribute('aria-hidden','true');
  const bottom=-58,top=bottom-lines.length*lineGap-subGap;
  lines.forEach((line,j)=>label.append(svgText(line,0,top+lineGap*(j+.82),'station-label')));
  label.append(svgText(ui().phases[phaseFor(i)],0,bottom-subGap*.25,'station-sublabel'));
  $('#house-labels').append(label);
  try{const box=label.getBBox(),w=box.width+18;label.insertAdjacentHTML('afterbegin',`<g class="sign-board" filter="url(#crayon)"><path d="M-14 ${bottom+2}V-46M14 ${bottom+2}V-46" stroke="#8a5a32" stroke-width="3"/><rect x="${-w/2}" y="${top-5}" width="${w}" height="${bottom-top+9}" rx="9" fill="#fffaf0" stroke="${['#e8504a','#7b6be0','#4fae6e','#5aa0e0','#f08a3c','#e86aa0'][i%6]}" stroke-width="2.4"/></g>`)}catch{}
  label.addEventListener('click',()=>visit(i));
  g.addEventListener('click',()=>visit(i));g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();visit(i)}});$('#houses').append(g);
  if(i<totalStops-1){const a=route[i],b=route[i+1],mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,angle=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;$('#route-arrows').insertAdjacentHTML('beforeend',`<path d="M-4-3L2 0L-4 3" fill="none" stroke="#d9849f" stroke-width="2" transform="translate(${mx} ${my}) rotate(${angle})"/>`)}
 });
 $('#sea-label').textContent=t('sea');$('#island').setAttribute('aria-label',t('mapAria'));
 $('#phases').innerHTML='';ui().phases.forEach((name,i)=>{const b=textElement('button',name,phase===(i?String(i):'all')?'active':'');b.dataset.phase=i?String(i):'all';b.setAttribute('aria-pressed',b.classList.contains('active'));b.onclick=()=>{phase=b.dataset.phase;applyPhase()};$('#phases').append(b)});applyPhase();
 placeStops();
}
// 每一站的停留點：在環島道路上、離房子最近，而且不壓到任何房子或站名的位置。
let loopCum=[0],loopTotal=1,stopPos=[];
function measureLoop(){loopCum=[0];for(let k=0;k<route.length;k++){const a=route[k],b=route[(k+1)%route.length];loopCum.push(loopCum[k]+Math.hypot(b[0]-a[0],b[1]-a[1]))}loopTotal=loopCum[route.length];}
function pointAt(s){s=((s%loopTotal)+loopTotal)%loopTotal;let k=0;while(k<route.length-1&&loopCum[k+1]<=s)k++;const a=route[k],b=route[(k+1)%route.length],f=(s-loopCum[k])/(loopCum[k+1]-loopCum[k]);return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f];}
function svgBox(el){try{const b=el.getBBox(),m=el.transform.baseVal.consolidate()?.matrix;const dx=m?m.e:0,dy=m?m.f:0;return b.width?[b.x+dx-2,b.y+dy-2,b.x+dx+b.width+2,b.y+dy+b.height+2]:null}catch{return null}}
function placeStops(){measureLoop();const blocks=[...document.querySelectorAll('#houses .house,#house-labels .house-label')].map(svgBox).filter(Boolean);let half=40;try{half=Number($('#patient-tag rect').getAttribute('width'))/2||40}catch{}const hits=([x,y])=>blocks.some(([l,t,r,b])=>x+half>l&&x-half<r&&y+41>t&&y-30<b);
 stopPos=houses.map((_,i)=>{const base=loopCum[i];for(let d=0;d<=260;d+=6){const options=[base+d,base-d].map(s=>({s,p:pointAt(s)})).filter(o=>!hits(o.p)).sort((a,b)=>b.p[1]-a.p[1]);if(options.length)return options[0].s}return base+90;});
 parking=stopPos.map(pointAt);}
function applyPhase(){document.querySelectorAll('#house-labels .house-label').forEach(el=>{const match=phase==='all'||String(phaseFor(+el.dataset.station))===phase;el.style.opacity=match?'1':'.28'});document.querySelectorAll('.house').forEach(el=>{const match=phase==='all'||String(phaseFor(+el.dataset.station))===phase;el.style.opacity=match?'1':'.28'});document.querySelectorAll('[data-phase]').forEach(b=>{const active=b.dataset.phase===phase;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active)})}
function updateLanguage(code){language=code;document.documentElement.lang=code;document.title=t('brand');document.querySelector('meta[name=description]').content=t('intro').replace('\n',' ');document.querySelectorAll('[data-t]').forEach(el=>el.textContent=t(el.dataset.t));$('#current-language').textContent=ui().native;queueMicrotask(updateOrientationPrompt);$('#language-title').textContent=t('chooseLanguage');$('.language-subtitle').textContent=t('chooseLanguageSub');['#close-topic','#close-patient'].forEach(s=>$(s).setAttribute('aria-label',t('close')));renderMap();renderPatient();updateProgress();renderQuiz();renderPassport();if(document.querySelector('.font-controls'))updateFontControls();if(patient)positionPatient(patientPoint);}
function updateProgress(){ $('#progress-bar').style.width=(seen.size/totalStops*100)+'%';$('#progress-text').textContent=t('progress',{n:seen.size,total:totalStops});}
function renderPatient(){
 updatePreopGuide();
 $('#portrait').innerHTML=avatar(patientMode==='clothes');const info=$('#patient-info');info.innerHTML='';
 if(!patient){info.append(textElement('strong',t('newPatient')),textElement('small',t('patientSubtitle')));$('#location').textContent=t('instruction');$('#next-station').textContent=t('begin');return}
 info.append(textElement('strong',patient.name),textElement('small',`${t('ageSummary',{n:patient.age})} · ${ui().sexOptions[patient.sex]}`));
 const edit=textElement('button',t('edit'));edit.onclick=()=>openPatientForm();info.append(edit);
 $('#location').textContent=t('at',{name:patient.name,station:topicName(currentStation)});$('#next-station').textContent=t(currentStation===totalStops-1?'finish':'next');
 applyMode();$('#patient-label').textContent=patient.name;
 $('#patient-marker').setAttribute('visibility',insideHouse===null?'visible':'hidden');$('#patient-marker').setAttribute('aria-label',t('at',{name:patient.name,station:topicName(currentStation)}));
 // Keep long names readable without covering the neighbouring building.
 if(patient.name.length>9)$('#patient-label').setAttribute('textLength','72');else $('#patient-label').removeAttribute('textLength');$('#patient-label').setAttribute('lengthAdjust','spacingAndGlyphs');
 // 名牌寬度跟著名字長短，停留點就能更靠近房子。
 try{const w=Math.min(80,Math.max(44,$('#patient-label').getComputedTextLength()+20));const tag=$('#patient-tag rect');tag.setAttribute('x',-w/2);tag.setAttribute('width',w)}catch{}
 if(!moving){placeStops();positionPatient(parking[currentStation])}
}
function positionPatient(point){patientPoint=[...point];$('#patient-marker').setAttribute('transform',`translate(${point[0]} ${point[1]})`);}
function setWalking(on,target){moving=on;$('#patient-marker').classList.toggle('walking',on);$('#next-station').disabled=on;document.querySelectorAll('.house').forEach(el=>el.setAttribute('aria-disabled',on));if(on){$('#location').textContent=t('walking',{station:topicName(target)});$('#next-station').textContent=t('walking',{station:topicName(target)})}else renderPatient();}
// 沿白線走：門口 → 道路 → 依環島道路較近的方向一段一段走 → 目的地門口。
// 從目前停留點沿著環島道路走到目的地停留點，選比較近的方向，一路往前不折返。
function roadPath(from,to){const ps=stopPos[from],pt=stopPos[to],forward=((pt-ps)%loopTotal+loopTotal)%loopTotal,backward=loopTotal-forward,dir=forward<=backward?1:-1,len=dir>0?forward:backward;
 const corners=loopCum.slice(0,route.length).map((c,k)=>({k,d:dir>0?((c-ps)%loopTotal+loopTotal)%loopTotal:((ps-c)%loopTotal+loopTotal)%loopTotal})).filter(o=>o.d>0.5&&o.d<len-0.5).sort((a,b)=>a.d-b.d);
 return [...corners.map(o=>route[o.k]),parking[to]];}
async function walkRoad(from,to){for(const point of roadPath(from,to))await animateSegment(point);}
function animateSegment(target){const start=[...patientPoint];const distance=Math.hypot(target[0]-start[0],target[1]-start[1]);const duration=reducedMotion()?0:Math.max(250,distance*8);$('#patient-marker').classList.toggle('facing-left',target[0]<start[0]-1);return new Promise(resolve=>{let begin;function frame(now){if(begin===undefined)begin=now;const p=duration===0?1:Math.min(1,(now-begin)/duration);positionPatient([start[0]+(target[0]-start[0])*p,start[1]+(target[1]-start[1])*p]);if(window.innerWidth<=640){const viewport=$('.map-scroll'),map=$('#island');viewport.scrollLeft=Math.max(0,(patientPoint[0]-80)/820*map.getBoundingClientRect().width-viewport.clientWidth/2)}if(p<1)requestAnimationFrame(frame);else resolve()}requestAnimationFrame(frame)});}
// 每一站的角色（消化道檢查少了病房）
const roleOf=i=>(isExamination()?['pre','choice','or','pacu','home']:['pre','choice','or','pacu','ward','home'])[i];
// 走這一段路時的樣子：手術後往恢復室、病房是躺病床；從病房（檢查則是恢復室）回家換回自己的衣服。
function tripMode(a,b){const ra=roleOf(a),rb=roleOf(b);if(!isExamination()&&['or','pacu'].includes(ra)&&['pacu','ward'].includes(rb)&&b>a)return 'bed';if(['ward','home'].includes(ra)||(rb==='home'&&['pacu','ward'].includes(ra)))return 'clothes';return 'gown';}
// 從房子出來時的樣子
function exitMode(k){const r=roleOf(k);if(!isExamination()&&['or','pacu'].includes(r))return 'bed';if(['ward','home'].includes(r)||(isExamination()&&r==='pacu'))return 'clothes';return 'gown';}
const WARD_TRANSFER_TEXT={'zh-Hant':'{name} 躺在病床上，由護理人員推往病房…',en:'{name} is lying on the bed while nurses wheel it to the ward…',id:'{name} berbaring di tempat tidur, didorong perawat ke ruang rawat…',th:'{name} นอนบนเตียง พยาบาลช่วยกันเข็นไปหอผู้ป่วย…',vi:'{name} nằm trên giường, được điều dưỡng đẩy về phòng bệnh…',fil:'Nakahiga si {name} sa kama habang itinutulak ito ng mga nars papunta sa ward…'};
const CLOTHES_TEXT={'zh-Hant':'{name} 換回自己的衣服，準備走回家囉！',en:'{name} has changed back into their own clothes and is walking home!',id:'{name} sudah berganti pakaian sendiri dan berjalan pulang!',th:'{name} เปลี่ยนกลับเป็นเสื้อผ้าของตัวเองแล้ว เดินกลับบ้านกัน!',vi:'{name} đã thay lại quần áo của mình và đi bộ về nhà!',fil:'Nakapagpalit na si {name} ng sariling damit at naglalakad pauwi!'};
const spriteScale=()=>patientMode==='bed'?.42:.46;
function applyMode(){const sprite=$('#patient-sprite');sprite.innerHTML=patientMode==='bed'?bedTransferSVG():avatar(patientMode==='clothes');sprite.setAttribute('transform',`scale(${spriteScale()})`);$('#patient-marker').classList.toggle('transfer',patientMode==='bed');$('#portrait').innerHTML=avatar(patientMode==='clothes');}
function setMode(mode){if(mode===patientMode)return;patientMode=mode;applyMode();}
// 門口位置（房子座標的門下緣）
const doorPoint=i=>[houses[i][0]-6,houses[i][1]+7];
const houseEl=i=>document.querySelector(`#houses .house[data-station="${i}"]`);
const pause=ms=>new Promise(r=>setTimeout(r,reducedMotion()?0:ms));
function setDoor(i,open){houseEl(i)?.classList.toggle('door-open',open);}
// 走到門口（同時變小、淡出）＝走進房子
function fadeMove(target,fromK,toK,fromA,toA,ms){const start=[...patientPoint],marker=$('#patient-marker'),sprite=$('#patient-sprite'),base=spriteScale();const duration=reducedMotion()?0:ms;return new Promise(resolve=>{let begin;function frame(now){if(begin===undefined)begin=now;const p=duration?Math.min(1,(now-begin)/duration):1;positionPatient([start[0]+(target[0]-start[0])*p,start[1]+(target[1]-start[1])*p]);const k=fromK+(toK-fromK)*p;sprite.setAttribute('transform',`scale(${base*k})`);marker.style.opacity=String(fromA+(toA-fromA)*p);if(p<1)requestAnimationFrame(frame);else resolve()}requestAnimationFrame(frame)});}
async function enterHouse(i){moving=true;$('#next-station').disabled=true;setDoor(i,true);await pause(350);$('#patient-marker').classList.add('walking');await fadeMove(doorPoint(i),1,.55,1,0,patientMode==='bed'?900:700);$('#patient-marker').classList.remove('walking');insideHouse=i;$('#patient-marker').setAttribute('visibility','hidden');setDoor(i,false);moving=false;$('#next-station').disabled=false;}
// 關掉站點視窗後：畫面回到地圖，小病人開門走出來、門再關上
function leaveHouse(){if(insideHouse===null)return Promise.resolve();if(leavePromise)return leavePromise;leavePromise=(async()=>{const i=insideHouse;moving=true;$('#next-station').disabled=true;$('.map-panel').scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'start'});await pause(450);
 const mode=exitMode(i),changed=mode==='clothes'&&patientMode!=='clothes';setMode(mode);positionPatient(doorPoint(i));const marker=$('#patient-marker');marker.style.opacity='0';$('#patient-sprite').setAttribute('transform',`scale(${spriteScale()*.55})`);marker.setAttribute('visibility','visible');
 setDoor(i,true);await pause(350);marker.classList.add('walking');await fadeMove(parking[i],.55,1,0,1,patientMode==='bed'?900:700);marker.classList.remove('walking');await pause(150);setDoor(i,false);
 insideHouse=null;moving=false;$('#next-station').disabled=false;renderPatient();if(changed)$('#location').textContent=CLOTHES_TEXT[language].replace('{name}',patient.name);})().finally(()=>{leavePromise=null});return leavePromise;}
$('#topic-dialog').addEventListener('close',()=>{if(insideHouse!==null)leaveHouse();});
async function visit(i){
 if(!patient){pendingStation=i;openPatientForm();return}
 if(insideHouse!==null)await leaveHouse();
 if(moving)return;
 if(i!==currentStation){const from=currentStation,mode=tripMode(from,i);setWalking(true,i);setMode(mode);
  const message=mode==='bed'?(roleOf(i)==='pacu'?TRANSFER_TEXT:WARD_TRANSFER_TEXT)[language]:mode==='clothes'&&['ward','pacu'].includes(roleOf(from))?CLOTHES_TEXT[language]:null;
  if(message)$('#location').textContent=$('#next-station').textContent=message.replace('{name}',patient.name);
  await walkRoad(from,i);currentStation=i;$('#patient-marker').classList.remove('walking','facing-left');setWalking(false,i);}
 const firstVisit=!seen.has(i);
 seen.add(i);updatePreopGuide();updateProgress();renderPassport();if(firstVisit)celebrateArrival(i);document.querySelectorAll('.plot').forEach((p,j)=>p.classList.toggle('active',i===j));
 await enterHouse(i);openTopic(i);
}
function openTopic(i){
 currentTopic=i;const topic=ui().topics[i],root=$('#topic-content');root.innerHTML='';$('#topic-dialog').classList.toggle('wide-dialog',i===0||i===1||i===2);if(i===1){renderMethodGallery(root);if(!$('#topic-dialog').open)$('#topic-dialog').showModal();$('#topic-dialog').scrollTop=0;return}if(i===2){renderOperatingRoom(root);if(!$('#topic-dialog').open)$('#topic-dialog').showModal();$('#topic-dialog').scrollTop=0;return}
 root.append(textElement('div',t('arrived',{name:patient.name,n:i+1}),'arrival'),textElement('div',t('station',{n:i+1}),'station-chip'));
 const title=textElement('h2',topic[0]);title.id='topic-title';root.append(title,textElement('p',topic[1],'topic-subtitle'),textElement('p',topic[2]));if(i===0)renderPreopCare(root);const ul=document.createElement('ul');topic[3].forEach(line=>ul.append(textElement('li',line)));root.append(ul,textElement('div',topic[4],'tip'));
 const back=textElement('button',t('backMap'),'primary back-map');back.style.marginTop='20px';back.onclick=()=>$('#topic-dialog').close();root.append(back,textElement('p',t('nextRelated'),'hint'));const related=document.createElement('div');related.className='related';[...new Set([Math.min(totalStops-1,i+1),i===totalStops-1?0:Math.max(0,i-1)])].filter(j=>j!==i).forEach(j=>{const b=textElement('button',`${j+1}. ${topicName(j)} →`);b.onclick=()=>{$('#topic-dialog').close();visit(j)};related.append(b)});root.append(related);if(!$('#topic-dialog').open)$('#topic-dialog').showModal();$('#topic-dialog').scrollTop=0;
}
function optionField(key,title,options,value=''){return `<label class="field" for="${key}">${esc(title)}</label><select name="${key}" id="${key}" required><option value="">${esc(t('select'))}</option>${options.map((label,i)=>`<option value="${i}"${String(value)===String(i)?' selected':''}>${esc(label)}</option>`).join('')}</select>`;}
function collectDraft(){const f=$('#patient-form');if(!f)return null;const data=new FormData(f);return {name:String(data.get('name')||''),age:String(data.get('age')||''),sex:data.get('sex'),diseases:data.getAll('disease').map(Number),other:String(data.get('other')||''),history:data.get('history'),motion:data.get('motion'),smoking:data.get('smoking'),pain:data.get('pain'),surgery:String(data.get('surgery')||'V')};}
function openPatientForm(){
 const data=draft||patient||{name:'',age:'',sex:'',diseases:[],other:'',history:'',motion:'',smoking:'',pain:''};draft=null;
 $('#patient-form-content').innerHTML=`<button class="change-language" id="form-language">🌐 ${esc(ui().native)}</button><div class="profile-top"><svg viewBox="-35 -85 70 110" aria-hidden="true">${avatar()}</svg><div><h2 id="patient-title">${esc(t(patient?'editPatient':'newPatient'))}</h2><p>${esc(t('patientSubtitle'))}</p></div></div><form class="patient-form" id="patient-form"><label class="field" for="patient-name">${esc(t('name'))}</label><input name="name" id="patient-name" type="text" maxlength="20" required autocomplete="off" placeholder="${esc(t('namePlaceholder'))}" value="${esc(data.name)}"><div class="formrow"><div>${optionField('sex',t('sex'),ui().sexOptions,data.sex)}</div><div><label class="field" for="patient-age">${esc(t('age'))}</label><input name="age" id="patient-age" type="number" min="0" max="120" step="1" required placeholder="${esc(t('agePlaceholder'))}" value="${esc(data.age)}"></div></div><label class="field" for="patient-surgery">${esc(catalogUI().surgery)}</label><select id="patient-surgery" name="surgery" required><option value="">${esc(ui().choose||({'zh-Hant':'請選擇',en:'Please select',id:'Silakan pilih',th:'กรุณาเลือก',vi:'Vui lòng chọn',fil:'Pumili'})[language])}</option>${SURGERY_IDS.map((code,i)=>`<option value="${code}"${data.surgery===code?' selected':''}>${esc(SURGERY_NAMES[language][i])}</option>`).join('')}</select><fieldset><legend>${esc(t('diseaseTitle'))}</legend><div class="checks">${ui().diseases.map((name,i)=>`<label><input type="checkbox" name="disease" value="${i}"${data.diseases.includes(i)?' checked':''}>${esc(name)}</label>`).join('')}</div></fieldset><label class="field" for="other-disease">${esc(t('otherDisease'))}</label><input name="other" id="other-disease" type="text" maxlength="100" placeholder="${esc(t('otherPlaceholder'))}" value="${esc(data.other)}"><fieldset><legend>${esc(t('nauseaTitle'))}</legend><p class="hint">${esc(t('nauseaIntro'))}</p>${optionField('history',t('historyQuestion'),ui().historyOptions,data.history)}${optionField('motion',t('motionQuestion'),ui().motionOptions,data.motion)}${optionField('smoking',t('smokingQuestion'),ui().smokingOptions,data.smoking)}${optionField('pain',t('painQuestion'),ui().painOptions,data.pain)}<p class="hint">${esc(t('nauseaHint'))}</p></fieldset><p class="hint">${esc(t('privacy'))}</p><button class="primary" type="submit">${esc(t(patient?'save':'create'))}</button></form>`;
 $('#form-language').onclick=()=>{draft=collectDraft();reopenProfile=true;$('#patient-dialog').close();showLanguages()};
 const form=$('#patient-form');form.elements.name.oninput=()=>form.elements.name.setCustomValidity('');
 form.querySelectorAll('[name=disease]').forEach(box=>box.onchange=()=>{form.querySelector('[name=disease]').setCustomValidity('');if(!box.checked)return;form.querySelectorAll('[name=disease]').forEach(other=>{if(other!==box&&(Number(box.value)>=8||Number(other.value)>=8))other.checked=false})});
 form.onsubmit=e=>{e.preventDefault();const value=collectDraft();value.name=value.name.trim();if(!value.name){form.elements.name.setCustomValidity(t('nameError'));form.elements.name.reportValidity();return}if(!value.diseases.length){const first=form.querySelector('[name=disease]');first.setCustomValidity(t('diseaseError'));first.reportValidity();return}if(!patient||patient.surgery!==value.surgery){careState.method=isExamination(value.surgery)?2:0;careState.examStage='upper';}applySurgeryPreset(value.surgery);patient=value;configureJourney();updateLanguage(language);$('#patient-dialog').close();renderPatient();positionPatient(parking[currentStation]);pendingStation=null;$('#location').textContent=careText().visit;requestAnimationFrame(()=>$('.map-panel').scrollIntoView({behavior:reducedMotion()?'auto':'smooth',block:'start'}))};
 if(!$('#patient-dialog').open)$('#patient-dialog').showModal();$('#patient-dialog').scrollTop=0;
}
function showLanguages(){if(moving)return;$('#language-dialog').showModal();$('#language-dialog').scrollTop=0;}
function showIndex(){if(moving)return;$('#topic-dialog').classList.remove('wide-dialog');const root=$('#topic-content');root.innerHTML=`<h2 id="topic-title">${esc(t('searchTitle'))}</h2><input class="search" type="search" aria-label="${esc(t('searchPlaceholder'))}" placeholder="${esc(t('searchPlaceholder'))}"><div id="results"></div>`;const render=q=>{const results=$('#results');results.innerHTML='';const matches=ui().topics.map((topic,i)=>({topic,i})).filter(({topic})=>topic.flat(2).join(' ').toLocaleLowerCase().includes(q.toLocaleLowerCase()));if(!matches.length){results.append(textElement('p',t('noResults')));return}matches.forEach(({i})=>{const b=document.createElement('button');b.className='listbutton';b.append(textElement('span',`${i+1}. ${topicName(i)}`),textElement('small',t(seen.has(i)?'visited':'explore')));b.onclick=()=>{$('#topic-dialog').close();visit(i)};results.append(b)})};render('');root.querySelector('input').oninput=e=>render(e.target.value.trim());$('#topic-dialog').showModal();}
function showAbout(){$('#topic-dialog').classList.remove('wide-dialog');const root=$('#topic-content');root.innerHTML=`<h2 id="topic-title">${esc(t('aboutTitle'))}</h2><p>${esc(t('aboutBody'))}</p><p>${esc(t('aboutNote'))}</p><p class="hint">${esc(t('sources'))}:<br><a href="https://madeforthismoment.asahq.org/anesthesia-101/" target="_blank" rel="noopener">${esc(t('sourceASA'))}</a><br><a href="https://anesth.or.jp/users/english/for_patients/patient_guide" target="_blank" rel="noopener">${esc(t('sourceJapan'))}</a></p>`;$('#topic-dialog').showModal();}
function renderQuiz(){const result=$('#quiz-feedback');result.textContent=quizAnswer===null?t('quizHint'):(t(quizAnswer?'quizRight':'quizTry')+' '+t('quizExplanation'));}
$('#language-button').onclick=()=>{reopenProfile=false;showLanguages()};
document.querySelectorAll('[data-lang]').forEach(b=>b.onclick=()=>{const needsProfile=!patient||reopenProfile;languageChosen=true;updateLanguage(b.dataset.lang);$('#language-dialog').close();reopenProfile=false;if(needsProfile)afterOrientationPrompt(openPatientForm)});
$('#language-dialog').addEventListener('cancel',e=>{if(!languageChosen||reopenProfile)e.preventDefault()});
$('#close-patient').onclick=()=>{$('#patient-dialog').close();draft=null;pendingStation=null};
$('#close-topic').onclick=()=>$('#topic-dialog').close();$('#topic-dialog').onclick=e=>{if(e.target===$('#topic-dialog'))$('#topic-dialog').close()};
$('#next-station').onclick=()=>{if(!patient)openPatientForm();else visit(seen.size===0?0:Math.min(currentStation+1,totalStops-1))};
$('#index-button').onclick=showIndex;$('#about-button').onclick=showAbout;
$('#walk-animation').onchange=e=>{animateWalking=e.target.checked};
$('#quiz-yes').onclick=()=>{quizAnswer=false;renderQuiz()};$('#quiz-no').onclick=()=>{quizAnswer=true;renderQuiz()};
updateLanguage('zh-Hant');showLanguages();

function updatePreopGuide(){const guide=$('#preop-guide');const visible=!!patient&&!seen.has(0);guide.setAttribute('visibility',visible?'visible':'hidden');guide.setAttribute('aria-hidden',String(!visible));guide.setAttribute('tabindex',visible?'0':'-1');guide.setAttribute('aria-label',t('preopGuide'));$('#preop-guide-label').textContent=t('preopGuide');}
$('#preop-guide').addEventListener('click',()=>visit(0));
$('#preop-guide').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();visit(0)}});

const fontLabels={'zh-Hant':['字體大小','縮小字體','放大字體'],en:['Text size','Smaller text','Larger text'],id:['Ukuran teks','Perkecil teks','Perbesar teks'],th:['ขนาดตัวอักษร','ลดขนาดตัวอักษร','เพิ่มขนาดตัวอักษร'],vi:['Cỡ chữ','Giảm cỡ chữ','Tăng cỡ chữ'],fil:['Laki ng teksto','Paliitin ang teksto','Palakihin ang teksto']};
let textScale=1.3;
try{const saved=Number(localStorage.getItem('anesthesia-text-scale-v2'));if(saved>=1&&saved<=1.6)textScale=saved}catch{}
function updateFontControls(){const labels=fontLabels[language];document.documentElement.style.setProperty('--text-scale',Math.round(textScale*landscapeBoost()*100)/100);document.querySelectorAll('.font-controls').forEach(el=>{el.setAttribute('aria-label',labels[0]);el.querySelector('.font-label').textContent=labels[0];el.querySelector('[data-font-step="-1"]').setAttribute('aria-label',labels[1]);el.querySelector('[data-font-step="1"]').setAttribute('aria-label',labels[2]);el.querySelector('output').textContent=Math.round(textScale*100)+'%';el.querySelector('[data-font-step="-1"]').disabled=textScale<=1;el.querySelector('[data-font-step="1"]').disabled=textScale>=1.6})}
[document.querySelector('.intro'),...document.querySelectorAll('dialog .modalbody')].forEach(parent=>{const controls=document.createElement('div');controls.className='font-controls';controls.setAttribute('role','group');controls.innerHTML='<span class="font-label"></span><button type="button" data-font-step="-1">A−</button><output aria-live="polite"></output><button type="button" data-font-step="1">A＋</button>';parent.prepend(controls);controls.addEventListener('click',event=>{const button=event.target.closest('[data-font-step]');if(!button)return;textScale=Math.min(1.6,Math.max(1,Math.round((textScale+Number(button.dataset.fontStep)*.15)*100)/100));try{localStorage.setItem('anesthesia-text-scale-v2',String(textScale))}catch{}updateFontControls();renderMap()})});
updateFontControls();
