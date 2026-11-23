'use strict';
// C03 保護性敷料（3片）：選到時，在手術室「已選項目」卡片內加一張臉部貼法示意圖（依實際貼法照片繪製）。
const FACE_DRESSING_TEXT={
'zh-Hant':{title:'保護性敷料貼在臉上的位置',lead:'趴著做手術（例如腰椎手術）時，臉會靠在頭枕上好幾個小時。麻醉睡著後，護理師會在臉上容易受壓的地方貼上柔軟的泡棉敷料。',parts:['額頭','右臉頰（顴骨到下顎）','左臉頰（顴骨到下顎）','下巴（橫貼一片）'],eye:'眼睛閉上，以透明膠膜保護',tube:'嘴巴有呼吸管與咬口器，用膠帶固定',note:'手術結束後會撕除。醒來後若臉上有壓痕、泛紅或不舒服，請告訴醫護人員。',alt:'臉部正面示意圖：額頭、左右臉頰與下巴各貼一片泡棉敷料'},
en:{title:'Where the protective dressings go on your face',lead:'For surgery lying face down (such as lower-back spine surgery), your face rests on a head support for hours. After you are asleep, the nurse places soft foam dressings where your face takes pressure.',parts:['Forehead','Right cheek (cheekbone to jaw)','Left cheek (cheekbone to jaw)','Chin (one strip across)'],eye:'Eyes closed and covered with clear film',tube:'Breathing tube and bite block in the mouth, held with tape',note:'They are removed after surgery. If you notice marks, redness or discomfort on your face after waking, tell the care team.',alt:'Front view of a face: foam dressings on the forehead, each cheek and across the chin'},
id:{title:'Letak balutan pelindung di wajah',lead:'Pada operasi dengan posisi tengkurap (misalnya operasi tulang belakang pinggang), wajah bertumpu pada penyangga kepala selama berjam-jam. Setelah Anda tertidur, perawat menempelkan balutan busa lembut di bagian wajah yang tertekan.',parts:['Dahi','Pipi kanan (tulang pipi sampai rahang)','Pipi kiri (tulang pipi sampai rahang)','Dagu (satu lembar melintang)'],eye:'Mata tertutup dan dilindungi plester bening',tube:'Selang napas dan pengganjal gigit di mulut, direkatkan dengan plester',note:'Balutan dilepas setelah operasi. Jika setelah bangun ada bekas tekanan, kemerahan, atau rasa tidak nyaman di wajah, beri tahu tim perawatan.',alt:'Gambar wajah dari depan: balutan busa di dahi, kedua pipi, dan melintang di dagu'},
th:{title:'ตำแหน่งแผ่นปิดป้องกันบนใบหน้า',lead:'การผ่าตัดในท่านอนคว่ำ (เช่น ผ่าตัดกระดูกสันหลังส่วนเอว) ใบหน้าจะวางบนที่รองศีรษะหลายชั่วโมง หลังจากคุณหลับแล้ว พยาบาลจะติดแผ่นโฟมนุ่มตรงจุดที่ใบหน้าถูกกดทับ',parts:['หน้าผาก','แก้มขวา (โหนกแก้มถึงขากรรไกร)','แก้มซ้าย (โหนกแก้มถึงขากรรไกร)','คาง (แผ่นแนวนอนหนึ่งแผ่น)'],eye:'หลับตาและปิดด้วยแผ่นฟิล์มใส',tube:'มีท่อช่วยหายใจและที่กันกัดในปาก ยึดด้วยเทป',note:'จะลอกออกหลังผ่าตัด หากตื่นแล้วพบรอยกด ผิวแดง หรือรู้สึกไม่สบายที่ใบหน้า โปรดแจ้งทีมดูแล',alt:'ภาพใบหน้าด้านหน้า: แผ่นโฟมที่หน้าผาก แก้มทั้งสองข้าง และแนวนอนที่คาง'},
vi:{title:'Vị trí dán miếng bảo vệ trên mặt',lead:'Khi mổ ở tư thế nằm sấp (ví dụ mổ cột sống thắt lưng), mặt tựa trên gối đỡ đầu nhiều giờ. Sau khi bạn ngủ, điều dưỡng dán các miếng xốp mềm lên những chỗ trên mặt bị tì đè.',parts:['Trán','Má phải (gò má đến hàm)','Má trái (gò má đến hàm)','Cằm (một miếng dán ngang)'],eye:'Mắt nhắm và được che bằng màng trong suốt',tube:'Ống thở và miếng cắn trong miệng, cố định bằng băng dính',note:'Các miếng dán được gỡ sau mổ. Nếu khi tỉnh thấy mặt có vết hằn, đỏ hoặc khó chịu, hãy báo cho nhóm chăm sóc.',alt:'Hình mặt nhìn thẳng: miếng xốp ở trán, hai bên má và dán ngang cằm'},
fil:{title:'Saan idinidikit ang protective dressing sa mukha',lead:'Sa operasyong nakadapa (halimbawa, operasyon sa gulugod sa baywang), nakapatong ang mukha sa suporta ng ulo nang ilang oras. Pagkatulog mo, maglalagay ang nurse ng malambot na foam dressing sa mga bahagi ng mukha na naiipit.',parts:['Noo','Kanang pisngi (cheekbone hanggang panga)','Kaliwang pisngi (cheekbone hanggang panga)','Baba (isang pahalang na piraso)'],eye:'Nakapikit ang mata at may malinaw na film',tube:'May breathing tube at bite block sa bibig, nakadikit ng tape',note:'Tinatanggal ito pagkatapos ng operasyon. Kung may bakat, pamumula o hirap sa mukha pagkagising, sabihin sa care team.',alt:'Larawan ng mukha mula sa harap: foam dressing sa noo, magkabilang pisngi at pahalang sa baba'}};

function faceDressingSVG(t){
 // 與手術安心島同一套畫風：face-skin 漸層、細線、粉彩色，外加 #crayon-scene 蠟筆濾鏡。
 const C='filter="url(#crayon-scene)"';
 const dots=(x0,y0,cols,rows,gap)=>{let s='';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)s+=`<circle cx="${x0+c*gap+(r%2?gap/2:0)}" cy="${y0+r*gap}" r="1.3"/>`;return s;};
 const foam='fill="url(#fd-foam)" stroke="#c7a37c" stroke-width="1.6" stroke-linejoin="round"';
 const cheek='M98 206Q96 262 126 294Q138 304 152 294L152 282Q134 260 134 232Q134 218 142 210Q120 202 98 206Z';
 const badge=(n,x,y,lx,ly)=>`<path d="M${lx} ${ly}L${x} ${y}" stroke="#e05a4f" stroke-width="1.6" stroke-dasharray="4 3"/><circle cx="${x}" cy="${y}" r="14" fill="#fff" stroke="#e05a4f" stroke-width="2.5"/><text x="${x}" y="${y+6}" text-anchor="middle" font-size="16" font-weight="700" fill="#e05a4f">${n}</text>`;
 return `<svg class="face-dressing-svg" viewBox="0 0 360 390" role="img" aria-label="${esc(t.alt)}">
<defs>
<radialGradient id="fd-skin" cx="38%" cy="34%" r="75%"><stop stop-color="#f7dfcc"/><stop offset=".65" stop-color="#e9bfa3"/><stop offset="1" stop-color="#c89378"/></radialGradient>
<linearGradient id="fd-foam" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fbf1e2"/><stop offset="1" stop-color="#f1dcc0"/></linearGradient>
<linearGradient id="fd-cap" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#7cc0aa"/><stop offset="1" stop-color="#5aa58f"/></linearGradient>
<clipPath id="fd-head"><path d="M96 170C92 92 132 52 180 52C228 52 268 92 264 170L256 236Q244 300 180 322Q116 300 104 236Z"/></clipPath>
</defs>
<g ${C}>
<path d="M60 390Q66 352 120 340L150 330H210L240 340Q294 352 300 390Z" fill="#b7d1bf" stroke="#9dbcaa" stroke-width="1.5"/>
<path d="M146 290L144 338Q180 356 216 338L214 290Z" fill="url(#fd-skin)" stroke="#c4947a" stroke-width="1"/>
<ellipse cx="94" cy="206" rx="11" ry="25" fill="#d9a98e" stroke="#c4947a" stroke-width="1"/>
<ellipse cx="266" cy="206" rx="11" ry="25" fill="#d9a98e" stroke="#c4947a" stroke-width="1"/>
<path d="M96 170C92 92 132 52 180 52C228 52 268 92 264 170L256 236Q244 300 180 322Q116 300 104 236Z" fill="url(#fd-skin)" stroke="#c4947a" stroke-width="1.2"/>
</g>
<g ${C} clip-path="url(#fd-head)">
<path d="M98 150Q138 128 180 128Q222 128 262 150L262 176Q222 162 180 162Q138 162 98 176Z" ${foam}/>
<g fill="#c7a37c" opacity=".6">${dots(118,142,14,2,9)}</g>
<path d="${cheek}" ${foam}/>
<path d="${cheek}" ${foam} transform="translate(360 0) scale(-1 1)"/>
<g fill="#c7a37c" opacity=".6">${dots(108,222,2,7,9)}${dots(243,222,2,7,9)}</g>
<path d="M132 294Q180 306 228 294L226 312Q180 328 134 312Z" ${foam}/>
<g fill="#c7a37c" opacity=".6">${dots(150,304,7,1,10)}</g>
</g>
<g ${C}>
<path d="M90 184C82 98 124 40 180 38C236 40 278 98 270 184Q266 158 250 146Q218 128 180 128Q142 128 110 146Q94 158 90 184Z" fill="url(#fd-cap)" stroke="#3f8a77" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M91 182Q96 158 111 147Q143 130 180 130Q217 130 249 147Q264 158 269 182" fill="none" stroke="#3f8a77" stroke-width="2.6" stroke-dasharray="1 4.5" stroke-linecap="round"/>
<path d="M112 140Q112 112 104 90M140 130Q140 96 134 62M180 128V42M220 130Q220 96 226 62M248 140Q248 112 256 90" fill="none" stroke="#9ed1c0" stroke-width="1.3" stroke-linecap="round"/>
<g fill="#d7efe6" opacity=".55">${dots(108,66,15,6,10)}</g>
</g>
<g ${C}>
<path d="M126 186Q137 180 150 185M210 185Q223 180 234 186" fill="none" stroke="#796a5f" stroke-width="2" stroke-linecap="round"/>
<path d="M127 200Q138 207 150 200M210 200Q222 207 233 200" fill="none" stroke="#6f6056" stroke-width="2" stroke-linecap="round"/>
<rect x="116" y="188" width="128" height="26" rx="10" fill="#d4ebf5" fill-opacity=".5" stroke="#8fbdd3" stroke-width="1.4" stroke-dasharray="4 3"/>
<path d="M180 204L172 236Q180 243 188 236" fill="none" stroke="#be9079" stroke-width="1.6" stroke-linejoin="round"/>
<path d="M142 256Q180 248 214 256L214 263Q180 255 142 263Z" fill="#fbfbf8" stroke="#c9cfc8" stroke-width="1"/>
<path d="M146 258.5h66" stroke="#dde3dc" stroke-width="1" stroke-dasharray="2 2"/>
<path d="M158 270Q180 262 202 270Q180 284 158 270Z" fill="#b78073" stroke="#a46d61" stroke-width="1"/>
<rect x="168" y="263" width="20" height="14" rx="5" fill="#fbfbf8" stroke="#c9cfc8" stroke-width="1.2"/><path d="M174 270q4-3 8 0" fill="none" stroke="#d6dbd4" stroke-width="1.2"/>
<path d="M202 270Q232 272 252 302Q276 342 330 384" fill="none" stroke="#9fb5a8" stroke-width="12" stroke-linecap="round"/>
<path d="M202 270Q232 272 252 302Q276 342 330 384" fill="none" stroke="#eef5ef" stroke-width="7" stroke-linecap="round"/>
<rect x="205" y="262" width="14" height="17" rx="3" fill="#fbfbf8" stroke="#c9cfc8" stroke-width="1.2" transform="rotate(8 212 270)"/>
</g>
${badge(1,40,128,104,158)}${badge(2,34,262,112,250)}${badge(3,326,214,248,236)}${badge(4,70,340,140,306)}
</svg>`;}

function faceDressingFigure(){
 const t=FACE_DRESSING_TEXT[language]||FACE_DRESSING_TEXT['zh-Hant'],fig=document.createElement('figure');
 fig.className='face-dressing-figure';
 fig.innerHTML=`<figcaption><strong>${esc(t.title)}</strong><span>${esc(t.lead)}</span></figcaption>${faceDressingSVG(t)}<ol class="face-dressing-key">${t.parts.map(p=>`<li>${esc(p)}</li>`).join('')}</ol><ul class="face-dressing-extra"><li class="eye">${esc(t.eye)}</li><li class="tube">${esc(t.tube)}</li></ul><p class="face-dressing-note">${esc(t.note)}</p>`;
 return fig;}

{const baseRenderRoomCatalog=renderRoomCatalog;
 renderRoomCatalog=function(root){baseRenderRoomCatalog(root);const card=root.querySelector('.selected-visual-grid article[data-scene-catalog="C03"]');if(card){card.classList.add('face-dressing-card');card.append(faceDressingFigure());}};}
