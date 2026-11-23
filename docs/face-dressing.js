'use strict';
// C03 保護性敷料（3片）：選到時，在手術室「已選項目」卡片內加一張臉部貼法示意圖（依實際貼法照片繪製）。
const FACE_DRESSING_TEXT={
'zh-Hant':{title:'保護性敷料貼在臉上的位置',lead:'趴著做手術（例如腰椎手術）時，臉會靠在頭枕上好幾個小時。麻醉睡著後，護理師會在臉上容易受壓的地方貼上柔軟的泡棉敷料。',parts:['額頭','右臉頰（顴骨到下巴）','左臉頰（顴骨到下巴）'],eye:'眼睛閉上，以透明膠膜保護',tube:'嘴巴有呼吸管與咬口器，用膠帶固定',note:'手術結束後會撕除。醒來後若臉上有壓痕、泛紅或不舒服，請告訴醫護人員。',alt:'臉部正面示意圖：額頭一片、左右臉頰各一片泡棉敷料'},
en:{title:'Where the protective dressings go on your face',lead:'For surgery lying face down (such as lower-back spine surgery), your face rests on a head support for hours. After you are asleep, the nurse places soft foam dressings where your face takes pressure.',parts:['Forehead','Right cheek (cheekbone to chin)','Left cheek (cheekbone to chin)'],eye:'Eyes closed and covered with clear film',tube:'Breathing tube and bite block in the mouth, held with tape',note:'They are removed after surgery. If you notice marks, redness or discomfort on your face after waking, tell the care team.',alt:'Front view of a face: one foam dressing on the forehead and one on each cheek'},
id:{title:'Letak balutan pelindung di wajah',lead:'Pada operasi dengan posisi tengkurap (misalnya operasi tulang belakang pinggang), wajah bertumpu pada penyangga kepala selama berjam-jam. Setelah Anda tertidur, perawat menempelkan balutan busa lembut di bagian wajah yang tertekan.',parts:['Dahi','Pipi kanan (tulang pipi sampai dagu)','Pipi kiri (tulang pipi sampai dagu)'],eye:'Mata tertutup dan dilindungi plester bening',tube:'Selang napas dan pengganjal gigit di mulut, direkatkan dengan plester',note:'Balutan dilepas setelah operasi. Jika setelah bangun ada bekas tekanan, kemerahan, atau rasa tidak nyaman di wajah, beri tahu tim perawatan.',alt:'Gambar wajah dari depan: satu balutan busa di dahi dan satu di tiap pipi'},
th:{title:'ตำแหน่งแผ่นปิดป้องกันบนใบหน้า',lead:'การผ่าตัดในท่านอนคว่ำ (เช่น ผ่าตัดกระดูกสันหลังส่วนเอว) ใบหน้าจะวางบนที่รองศีรษะหลายชั่วโมง หลังจากคุณหลับแล้ว พยาบาลจะติดแผ่นโฟมนุ่มตรงจุดที่ใบหน้าถูกกดทับ',parts:['หน้าผาก','แก้มขวา (โหนกแก้มถึงคาง)','แก้มซ้าย (โหนกแก้มถึงคาง)'],eye:'หลับตาและปิดด้วยแผ่นฟิล์มใส',tube:'มีท่อช่วยหายใจและที่กันกัดในปาก ยึดด้วยเทป',note:'จะลอกออกหลังผ่าตัด หากตื่นแล้วพบรอยกด ผิวแดง หรือรู้สึกไม่สบายที่ใบหน้า โปรดแจ้งทีมดูแล',alt:'ภาพใบหน้าด้านหน้า: แผ่นโฟมที่หน้าผากหนึ่งแผ่นและที่แก้มข้างละแผ่น'},
vi:{title:'Vị trí dán miếng bảo vệ trên mặt',lead:'Khi mổ ở tư thế nằm sấp (ví dụ mổ cột sống thắt lưng), mặt tựa trên gối đỡ đầu nhiều giờ. Sau khi bạn ngủ, điều dưỡng dán các miếng xốp mềm lên những chỗ trên mặt bị tì đè.',parts:['Trán','Má phải (gò má đến cằm)','Má trái (gò má đến cằm)'],eye:'Mắt nhắm và được che bằng màng trong suốt',tube:'Ống thở và miếng cắn trong miệng, cố định bằng băng dính',note:'Các miếng dán được gỡ sau mổ. Nếu khi tỉnh thấy mặt có vết hằn, đỏ hoặc khó chịu, hãy báo cho nhóm chăm sóc.',alt:'Hình mặt nhìn thẳng: một miếng xốp ở trán và mỗi bên má một miếng'},
fil:{title:'Saan idinidikit ang protective dressing sa mukha',lead:'Sa operasyong nakadapa (halimbawa, operasyon sa gulugod sa baywang), nakapatong ang mukha sa suporta ng ulo nang ilang oras. Pagkatulog mo, maglalagay ang nurse ng malambot na foam dressing sa mga bahagi ng mukha na naiipit.',parts:['Noo','Kanang pisngi (cheekbone hanggang baba)','Kaliwang pisngi (cheekbone hanggang baba)'],eye:'Nakapikit ang mata at may malinaw na film',tube:'May breathing tube at bite block sa bibig, nakadikit ng tape',note:'Tinatanggal ito pagkatapos ng operasyon. Kung may bakat, pamumula o hirap sa mukha pagkagising, sabihin sa care team.',alt:'Larawan ng mukha mula sa harap: isang foam dressing sa noo at tig-isa sa magkabilang pisngi'}};

function faceDressingSVG(t){
 const dots=(x0,y0,cols,rows,gap)=>{let s='';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)s+=`<circle cx="${x0+c*gap+(r%2?gap/2:0)}" cy="${y0+r*gap}" r="1.6"/>`;return s;};
 const foam='fill="#fdf3e3" stroke="#b07f4f" stroke-width="3" stroke-linejoin="round"';
 const cheek='M66 176Q58 250 106 300Q128 312 146 296L150 284Q118 250 122 214Q124 190 132 176Q98 166 66 176Z';
 const badge=(n,x,y)=>`<g class="face-badge"><circle cx="${x}" cy="${y}" r="15" fill="#e0607e" stroke="#fff" stroke-width="3"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="17" font-weight="700" fill="#fff">${n}</text></g>`;
 return `<svg class="face-dressing-svg" viewBox="0 0 340 360" role="img" aria-label="${esc(t.alt)}">
<defs><clipPath id="face-dressing-clip"><ellipse cx="170" cy="196" rx="104" ry="132"/></clipPath></defs>
<ellipse cx="62" cy="200" rx="15" ry="30" fill="#e2ad87" stroke="#b8845f" stroke-width="2.5"/>
<ellipse cx="278" cy="200" rx="15" ry="30" fill="#e2ad87" stroke="#b8845f" stroke-width="2.5"/>
<ellipse cx="170" cy="196" rx="104" ry="132" fill="#e9b893" stroke="#b8845f" stroke-width="3"/>
<path d="M62 120Q66 34 170 30Q274 34 278 120Q252 92 170 90Q88 92 62 120Z" fill="#5fae9a" stroke="#3f8a77" stroke-width="3" stroke-linejoin="round"/>
<path d="M90 70q12-8 22 0M130 52q12-8 22 0M188 52q12-8 22 0M228 70q12-8 22 0" fill="none" stroke="#3f8a77" stroke-width="2"/>
<g clip-path="url(#face-dressing-clip)">
<path d="M70 150Q70 102 170 98Q270 102 270 150Q222 138 170 138Q118 138 70 150Z" ${foam}/>
<g fill="#c08f5e" opacity=".6">${dots(96,114,15,2,10)}</g>
<path d="${cheek}" ${foam}/>
<path d="${cheek}" ${foam} transform="translate(340 0) scale(-1 1)"/>
<g fill="#c08f5e" opacity=".6">${dots(80,200,3,6,10)}${dots(232,200,3,6,10)}</g>
</g>
<path d="M112 160q18-8 36 0M192 160q18-8 36 0" fill="none" stroke="#8a6650" stroke-width="3" stroke-linecap="round"/>
<path d="M116 182q14 8 28 0M196 182q14 8 28 0" fill="none" stroke="#6b4c3a" stroke-width="3" stroke-linecap="round"/>
<rect x="102" y="166" width="136" height="34" rx="12" fill="#bfe0f2" fill-opacity=".45" stroke="#7fb1cf" stroke-width="2" stroke-dasharray="5 4"/>
<path d="M170 196q-4 30-12 40q12 8 24 0q-8-10-12-40" fill="none" stroke="#c7987a" stroke-width="2.5" stroke-linejoin="round"/>
<path d="M124 254Q170 246 216 254L216 266Q170 258 124 266Z" fill="#ffffff" stroke="#b9b9b9" stroke-width="1.5"/>
<path d="M130 258h80M130 262h80" stroke="#dcdcdc" stroke-width="1"/>
<ellipse cx="170" cy="282" rx="26" ry="11" fill="#c97c78" stroke="#a65e5a" stroke-width="2"/>
<rect x="150" y="272" width="26" height="20" rx="6" fill="#ffffff" stroke="#b9b9b9" stroke-width="2"/>
<path d="M176 280Q250 286 304 346" fill="none" stroke="#8fbfd1" stroke-width="10" stroke-linecap="round"/>
<path d="M176 280Q250 286 304 346" fill="none" stroke="#d5ecf4" stroke-width="4" stroke-linecap="round"/>
<path d="M90 128L50 112" stroke="#e0607e" stroke-width="2"/>${badge(1,38,106)}
<path d="M92 236L40 258" stroke="#e0607e" stroke-width="2"/>${badge(2,30,264)}
<path d="M248 236L300 214" stroke="#e0607e" stroke-width="2"/>${badge(3,310,206)}
</svg>`;}

function faceDressingFigure(){
 const t=FACE_DRESSING_TEXT[language]||FACE_DRESSING_TEXT['zh-Hant'],fig=document.createElement('figure');
 fig.className='face-dressing-figure';
 fig.innerHTML=`<figcaption><strong>${esc(t.title)}</strong><span>${esc(t.lead)}</span></figcaption>${faceDressingSVG(t)}<ol class="face-dressing-key">${t.parts.map(p=>`<li>${esc(p)}</li>`).join('')}</ol><ul class="face-dressing-extra"><li class="eye">${esc(t.eye)}</li><li class="tube">${esc(t.tube)}</li></ul><p class="face-dressing-note">${esc(t.note)}</p>`;
 return fig;}

{const baseRenderRoomCatalog=renderRoomCatalog;
 renderRoomCatalog=function(root){baseRenderRoomCatalog(root);const card=root.querySelector('.selected-visual-grid article[data-scene-catalog="C03"]');if(card){card.classList.add('face-dressing-card');card.append(faceDressingFigure());}};}
