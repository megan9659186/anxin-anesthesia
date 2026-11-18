'use strict';
// 麻醉選擇館：四種麻醉方式的簡短介紹（順序固定：0 全身麻醉、1 靜脈麻醉、2 半身麻醉、3 神經阻斷術）
const METHOD_GALLERY={
 'zh-Hant':{intro:'認識常見的麻醉方式。實際使用哪一種，會由麻醉科醫師依你的手術和身體狀況評估決定，有時也會合併使用。',yours:'依你的手術科別，可能使用的麻醉方式',or:'或',fits:'你的科別可能使用',none:'你的手術方式需由麻醉科醫師評估後，再決定合適的麻醉方式。',decide:'實際方式由麻醉科醫師評估後決定。',items:[
  ['全身麻醉','藥物經點滴或吸入給予，讓你在手術中完全睡著、不會感到疼痛。麻醉團隊會幫忙呼吸，並全程照顧你的心跳、血壓和血氧。'],
  ['靜脈麻醉','藥物由點滴給予，讓你放鬆、睡著。多用在上、下消化道內視鏡檢查（胃鏡、大腸鏡），檢查結束後通常很快就會醒來。'],
  ['半身麻醉','在背部打一針局部麻醉藥，讓下半身暫時麻木、不會痛。過程中可以保持清醒，也可以搭配藥物讓你放鬆想睡。'],
  ['神經阻斷術','在手術部位附近的神經旁注射局部麻醉藥，讓那一區暫時不痛。可以單獨使用，也常搭配全身麻醉，幫助術後止痛。']]},
 en:{intro:'Learn about common types of anesthesia. Your anesthesiologist decides which to use based on your surgery and health; sometimes they are combined.',yours:'Anesthesia that may be used for your type of surgery',or:'or',fits:'May be used for your surgery',none:'An anesthesiologist will assess your procedure before deciding on the right anesthesia.',decide:'The final choice is made by your anesthesiologist after assessment.',items:[
  ['General anesthesia','Medicines given through an IV or breathed in keep you fully asleep and free of pain during surgery. The team supports your breathing and watches your heart rate, blood pressure and oxygen the whole time.'],
  ['Intravenous anesthesia','Medicines through an IV help you relax and fall asleep. It is mostly used for upper and lower digestive endoscopy (gastroscopy, colonoscopy), and you usually wake up soon afterwards.'],
  ['Spinal anesthesia','One injection of local anesthetic in the back numbs the lower body for a while. You can stay awake, or have medicine to help you relax and feel sleepy.'],
  ['Nerve block','Local anesthetic is injected near the nerves around the operation site so that area stops hurting for a while. It can be used alone, and is often added to general anesthesia for pain relief after surgery.']]},
 id:{intro:'Kenali jenis anestesi yang umum. Dokter anestesi memutuskan jenisnya berdasarkan operasi dan kondisi kesehatanmu; kadang beberapa jenis digabungkan.',yours:'Anestesi yang mungkin digunakan untuk jenis operasimu',or:'atau',fits:'Mungkin digunakan untuk operasimu',none:'Dokter anestesi akan menilai tindakanmu sebelum menentukan anestesi yang tepat.',decide:'Keputusan akhir dibuat oleh dokter anestesi setelah penilaian.',items:[
  ['Anestesi umum','Obat melalui infus atau dihirup membuatmu tertidur penuh dan tidak merasa nyeri selama operasi. Tim membantu pernapasan dan memantau jantung, tekanan darah, serta oksigen sepanjang waktu.'],
  ['Anestesi intravena','Obat melalui infus membantumu rileks dan tertidur. Paling sering dipakai untuk endoskopi saluran cerna atas dan bawah (gastroskopi, kolonoskopi), dan biasanya cepat bangun setelahnya.'],
  ['Anestesi spinal','Satu suntikan obat bius lokal di punggung membuat tubuh bagian bawah mati rasa sementara. Kamu bisa tetap sadar, atau diberi obat agar rileks dan mengantuk.'],
  ['Blok saraf','Obat bius lokal disuntikkan di dekat saraf sekitar area operasi sehingga area itu tidak nyeri sementara. Bisa dipakai sendiri, dan sering digabung dengan anestesi umum untuk meredakan nyeri setelah operasi.']]},
 th:{intro:'ทำความรู้จักวิธีระงับความรู้สึกที่พบบ่อย วิสัญญีแพทย์จะเลือกวิธีตามการผ่าตัดและสภาพร่างกายของคุณ บางครั้งอาจใช้หลายวิธีร่วมกัน',yours:'วิธีระงับความรู้สึกที่อาจใช้กับการผ่าตัดของคุณ',or:'หรือ',fits:'อาจใช้กับการผ่าตัดของคุณ',none:'วิสัญญีแพทย์จะประเมินหัตถการของคุณก่อนเลือกวิธีระงับความรู้สึกที่เหมาะสม',decide:'วิสัญญีแพทย์จะตัดสินใจหลังการประเมิน',items:[
  ['ดมยาสลบ','ให้ยาทางสายน้ำเกลือหรือสูดดม ทำให้คุณหลับสนิทและไม่รู้สึกเจ็บระหว่างผ่าตัด ทีมจะช่วยการหายใจและดูแลหัวใจ ความดันโลหิต และออกซิเจนตลอดเวลา'],
  ['ให้ยาระงับความรู้สึกทางหลอดเลือดดำ','ให้ยาทางสายน้ำเกลือเพื่อให้ผ่อนคลายและหลับ ใช้มากในการส่องกล้องทางเดินอาหารส่วนบนและส่วนล่าง (ส่องกล้องกระเพาะ ลำไส้ใหญ่) และมักตื่นได้เร็วหลังตรวจ'],
  ['บล็อกหลัง','ฉีดยาชาที่หลังหนึ่งเข็ม ทำให้ร่างกายส่วนล่างชาชั่วคราวและไม่เจ็บ คุณอาจตื่นอยู่หรือได้รับยาให้ผ่อนคลายและง่วงก็ได้'],
  ['บล็อกเส้นประสาท','ฉีดยาชาใกล้เส้นประสาทรอบบริเวณผ่าตัด ทำให้บริเวณนั้นไม่เจ็บชั่วคราว ใช้เดี่ยวได้ และมักใช้ร่วมกับการดมยาสลบเพื่อช่วยลดปวดหลังผ่าตัด']]},
 vi:{intro:'Tìm hiểu các phương pháp gây mê thường gặp. Bác sĩ gây mê sẽ chọn phương pháp dựa trên ca mổ và sức khỏe của bạn; đôi khi phối hợp nhiều cách.',yours:'Phương pháp có thể dùng cho loại phẫu thuật của bạn',or:'hoặc',fits:'Có thể dùng cho ca mổ của bạn',none:'Bác sĩ gây mê sẽ đánh giá thủ thuật của bạn trước khi chọn phương pháp phù hợp.',decide:'Bác sĩ gây mê sẽ quyết định sau khi đánh giá.',items:[
  ['Gây mê toàn thân','Thuốc qua đường truyền hoặc hít giúp bạn ngủ hoàn toàn và không đau trong lúc mổ. Đội ngũ hỗ trợ hô hấp và theo dõi tim, huyết áp, oxy suốt ca mổ.'],
  ['Gây mê qua đường tĩnh mạch','Thuốc qua đường truyền giúp bạn thư giãn và ngủ. Thường dùng cho nội soi tiêu hóa trên và dưới (nội soi dạ dày, đại tràng), và thường tỉnh lại nhanh sau đó.'],
  ['Gây tê tủy sống','Một mũi thuốc tê ở lưng làm phần dưới cơ thể tê tạm thời, không đau. Bạn có thể vẫn tỉnh, hoặc dùng thêm thuốc để thư giãn, buồn ngủ.'],
  ['Phong bế thần kinh','Tiêm thuốc tê gần dây thần kinh quanh vùng mổ để vùng đó tạm thời không đau. Có thể dùng riêng, và thường phối hợp với gây mê toàn thân để giảm đau sau mổ.']]},
 fil:{intro:'Kilalanin ang mga karaniwang uri ng anesthesia. Ang anesthesiologist ang pipili batay sa iyong operasyon at kalusugan; minsan pinagsasama ang mga ito.',yours:'Anesthesia na maaaring gamitin sa uri ng iyong operasyon',or:'o',fits:'Maaaring gamitin sa iyong operasyon',none:'Susuriin ng anesthesiologist ang iyong pamamaraan bago pumili ng angkop na anesthesia.',decide:'Ang anesthesiologist ang magpapasya pagkatapos ng pagsusuri.',items:[
  ['General anesthesia','Ang gamot sa suwero o nilalanghap ay nagpapatulog sa iyo nang lubos at walang sakit habang inooperahan. Tinutulungan ng pangkat ang paghinga at binabantayan ang puso, presyon ng dugo at oxygen.'],
  ['Intravenous anesthesia','Ang gamot sa suwero ay tumutulong na ikaw ay makapagpahinga at makatulog. Kadalasang ginagamit sa endoscopy ng itaas at ibabang daanan ng pagkain (gastroscopy, colonoscopy), at karaniwang mabilis kang magigising.'],
  ['Spinal anesthesia','Isang turok ng pampamanhid sa likod ang pansamantalang nagpapamanhid sa ibabang bahagi ng katawan. Maaari kang manatiling gising, o bigyan ng gamot para makapagpahinga at antukin.'],
  ['Nerve block','Itinuturok ang pampamanhid malapit sa mga nerbiyos sa paligid ng operasyon para pansamantalang hindi sumakit ang bahaging iyon. Maaaring mag-isa, at madalas isabay sa general anesthesia para sa ginhawa pagkatapos ng operasyon.']]}
};

// 術前評估所：麻醉方式說明（取代原本的勾選）
const METHOD_NOTE={
 'zh-Hant':'麻醉方式有許多種，依照您的手術方式及自身身體狀況，會由麻醉科醫師評估後選擇適合您的麻醉計畫。',
 en:'There are many types of anesthesia. Based on your surgery and your own health, an anesthesiologist will assess you and choose the anesthesia plan that suits you.',
 id:'Ada banyak jenis anestesi. Berdasarkan jenis operasi dan kondisi kesehatan Anda, dokter anestesi akan menilai dan memilih rencana anestesi yang sesuai untuk Anda.',
 th:'การระงับความรู้สึกมีหลายวิธี วิสัญญีแพทย์จะประเมินตามวิธีการผ่าตัดและสภาพร่างกายของคุณ แล้วเลือกแผนการระงับความรู้สึกที่เหมาะสมกับคุณ',
 vi:'Có nhiều phương pháp gây mê. Dựa trên cách phẫu thuật và tình trạng sức khỏe của bạn, bác sĩ gây mê sẽ đánh giá và chọn kế hoạch gây mê phù hợp với bạn.',
 fil:'Maraming uri ng anesthesia. Batay sa paraan ng iyong operasyon at kalagayan ng iyong katawan, susuriin ka ng anesthesiologist at pipili ng planong anesthesia na angkop sa iyo.'
};
const methodNote=()=>isExamination()?examReword(METHOD_NOTE[language],language):METHOD_NOTE[language];

// 依手術科別預設可能的麻醉方式（METHOD_GALLERY 的索引）。婦產科、骨科、整外、泌尿科可能半身或全身麻醉；消化道內視鏡用靜脈麻醉。
const DEPARTMENT_METHODS={A:[0],B:[0,2],D:[0],E:[0],F:[0],G:[0],H:[0,2],N:[0],O:[0],OBG:[0,2],PLS:[0,2],GI01:[1],GI02:[1],GI03:[1],V:[]};
const departmentMethods=()=>DEPARTMENT_METHODS[patient?.surgery||'V']||[];
function planLabel(){const data=METHOD_GALLERY[language],list=departmentMethods();return list.length?list.map(i=>data.items[i][0]).join(` ${data.or} `):data.none;}

function renderMethodGallery(root){const data=METHOD_GALLERY[language],fit=departmentMethods();root.innerHTML=`<div class="station-chip">${esc(t('station',{n:2}))}</div><h2 id="topic-title">${esc(topicName(1))}</h2><p class="method-intro">${esc(data.intro)}</p>`;
 const plan=document.createElement('section');plan.className='method-plan';plan.innerHTML=`<h3>${esc(data.yours)} · ${esc(surgeryName())}</h3><p class="method-plan-result">${esc(planLabel())}</p>${fit.length?`<p class="hint">${esc(data.decide)}</p>`:''}`;root.append(plan);
 const grid=document.createElement('div');grid.className='method-cards';data.items.forEach(([title,body],i)=>{const card=document.createElement('article');card.className='method-card'+(fit.includes(i)?' is-fit':'');card.innerHTML=`<div class="method-card-head"><span class="method-number">0${i+1}</span><h4>${esc(title)}</h4></div>${fit.includes(i)?`<span class="method-fit">♥ ${esc(data.fits)}</span>`:''}<p>${esc(body)}</p>`;grid.append(card)});root.append(grid);
 const back=textElement('button',t('backMap'),'primary back-map');back.onclick=()=>$('#topic-dialog').close();root.append(back);}
