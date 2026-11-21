'use strict';
// 「一起認識麻醉」：衛教小知識，不是考試。每個主題有兩個生活化的想法可以選，選了之後一起看說明；
// 不顯示對錯或題號。每 5 分鐘自動換下一個主題，也可以按「下一個小知識」。
// 每則：[問題, 想法一, 想法二, 一起認識的說明]
const LEARN_CARDS={
'zh-Hant':[
 ['麻醉，就是平常睡覺嗎？','對，和睡覺一樣','應該不太一樣','麻醉和自然睡眠不同。團隊會照顧你的疼痛、清醒程度和身體狀況；有些麻醉方式不需要完全睡著。'],
 ['手術前為什麼要空腹呢？','為了麻醉時比較安全','只是醫院的規定','空腹可以讓胃裡的東西變少，減少麻醉時嗆到肺部的機會。什麼時候開始空腹，請依照醫護人員告訴你的時間。'],
 ['平常吃的藥，要告訴麻醉團隊嗎？','要，帶著清單一起去','應該跟麻醉沒關係','有些藥物或保健食品會影響麻醉或出血。帶著清單，團隊會告訴你哪些繼續吃、哪些要先暫停。'],
 ['全身麻醉睡著的時候，誰在照顧我？','麻醉團隊一直在旁邊','我不太確定','從睡著到醒來，麻醉團隊都會在你身邊，照顧你的呼吸、心跳、血壓和血氧。'],
 ['半身麻醉的時候，我會醒著嗎？','可以醒著，也可以睡一下','一定全程醒著','半身麻醉可以保持清醒，也可以搭配藥物讓你放鬆想睡。你可以和麻醉團隊說說你的想法。'],
 ['手術後覺得痛或想吐，可以說嗎？','可以，要告訴照護人員','忍一下就過去了','請一定要說出來！照護人員可以幫你調整止痛或止吐的方式，讓你舒服一點。'],
 ['醒來後喉嚨卡卡的，正常嗎？','蠻常見的','我不太確定','麻醉時可能會放呼吸管路幫忙呼吸，醒來後喉嚨有點乾或卡卡的很常見，通常會慢慢改善。'],
 ['假牙、隱形眼鏡和首飾，手術前要拿下來嗎？','要，先拿下來比較安全','戴著應該沒關係','先拿下來，可以避免麻醉時掉落、卡住或造成受傷。'],
 ['睡覺會打鼾，也要告訴麻醉團隊嗎？','要，可以讓團隊先準備','這個應該不重要','打鼾或睡覺時呼吸停頓，能幫助團隊評估你的呼吸道，事先做好準備。'],
 ['手術前戒菸，有幫助嗎？','有，對呼吸和傷口都好','好像沒什麼差別','戒菸可以讓呼吸道比較不敏感，也有助傷口癒合，越早開始越好。']],
en:[
 ['Is anesthesia the same as ordinary sleep?','Yes, just like sleep','Probably not quite','Anesthesia is different from natural sleep. Your team looks after pain, awareness and your body; some types of anesthesia do not need you to be fully asleep.'],
 ['Why do I need to fast before surgery?','To make anesthesia safer','It is just a hospital rule','An empty stomach lowers the chance of stomach contents getting into the lungs during anesthesia. Start fasting at the time your care team gives you.'],
 ['Should I tell the anesthesia team about my usual medicines?','Yes, I will bring a list','They are not related to anesthesia','Some medicines and supplements affect anesthesia or bleeding. With your list, the team can tell you which to keep taking and which to pause.'],
 ['Who looks after me while I am asleep under general anesthesia?','The anesthesia team stays with me','I am not sure','From falling asleep to waking up, the anesthesia team stays with you, watching your breathing, heart rate, blood pressure and oxygen.'],
 ['Will I be awake during spinal anesthesia?','I can be awake or have a nap','I must be awake the whole time','You can stay awake, or have medicine to help you relax and feel sleepy. Share what you would prefer with your team.'],
 ['Can I say if I feel pain or sick after surgery?','Yes, I should tell my carers','I should just put up with it','Please do tell us! Your carers can adjust pain or nausea treatment to make you more comfortable.'],
 ['Is a scratchy throat after waking up normal?','It is quite common','I am not sure','A breathing tube may be used during anesthesia. A dry or scratchy throat afterwards is common and usually settles.'],
 ['Should I remove dentures, contact lenses and jewellery before surgery?','Yes, it is safer','Keeping them on is fine','Removing them first prevents them falling out, getting stuck or causing injury during anesthesia.'],
 ['Should I tell the anesthesia team that I snore?','Yes, so they can prepare','It does not really matter','Snoring or pauses in breathing during sleep help the team assess your airway and prepare in advance.'],
 ['Does stopping smoking before surgery help?','Yes, for breathing and healing','Not much difference','Stopping smoking makes your airways less sensitive and helps wounds heal; the sooner the better.']],
id:[
 ['Apakah anestesi sama dengan tidur biasa?','Ya, sama seperti tidur','Sepertinya tidak sama','Anestesi berbeda dari tidur alami. Tim menjaga nyeri, kesadaran, dan kondisi tubuhmu; beberapa jenis anestesi tidak membuatmu tertidur penuh.'],
 ['Mengapa harus puasa sebelum operasi?','Agar anestesi lebih aman','Hanya aturan rumah sakit','Lambung yang kosong mengurangi risiko isi lambung masuk ke paru-paru saat anestesi. Mulailah puasa sesuai waktu yang diberikan tim.'],
 ['Perlukah memberi tahu tim anestesi tentang obat yang biasa diminum?','Ya, saya bawa daftarnya','Tidak ada hubungannya dengan anestesi','Beberapa obat dan suplemen memengaruhi anestesi atau perdarahan. Dengan daftarmu, tim dapat memberi tahu mana yang diteruskan atau dihentikan sementara.'],
 ['Siapa yang merawatku saat tertidur dengan anestesi umum?','Tim anestesi selalu di dekatku','Saya tidak yakin','Dari tertidur sampai bangun, tim anestesi selalu di dekatmu, memantau pernapasan, detak jantung, tekanan darah, dan oksigen.'],
 ['Apakah aku sadar saat anestesi spinal?','Bisa sadar atau tidur sebentar','Harus sadar sepanjang waktu','Kamu bisa tetap sadar, atau diberi obat agar rileks dan mengantuk. Sampaikan keinginanmu kepada tim.'],
 ['Bolehkah aku bilang jika nyeri atau mual setelah operasi?','Boleh, saya beri tahu perawat','Lebih baik ditahan saja','Tolong beri tahu kami! Perawat dapat menyesuaikan obat nyeri atau mual agar kamu lebih nyaman.'],
 ['Apakah wajar tenggorokan terasa gatal setelah bangun?','Cukup sering terjadi','Saya tidak yakin','Selang napas mungkin dipakai saat anestesi. Tenggorokan kering atau gatal setelahnya umum terjadi dan biasanya membaik.'],
 ['Perlukah melepas gigi palsu, lensa kontak, dan perhiasan sebelum operasi?','Ya, lebih aman','Tetap dipakai tidak apa-apa','Melepasnya dulu mencegahnya jatuh, tersangkut, atau menyebabkan cedera saat anestesi.'],
 ['Perlukah memberi tahu tim anestesi bahwa aku mendengkur?','Ya, agar tim bersiap','Sepertinya tidak penting','Mendengkur atau napas berhenti saat tidur membantu tim menilai jalan napas dan bersiap lebih awal.'],
 ['Apakah berhenti merokok sebelum operasi membantu?','Ya, untuk napas dan luka','Sepertinya tidak berbeda','Berhenti merokok membuat saluran napas kurang sensitif dan membantu luka sembuh; makin cepat makin baik.']],
th:[
 ['การระงับความรู้สึกเหมือนการนอนหลับปกติไหม','ใช่ เหมือนนอนหลับ','น่าจะไม่เหมือน','การระงับความรู้สึกต่างจากการนอนหลับธรรมชาติ ทีมจะดูแลความปวด ระดับความรู้สึกตัว และร่างกายของคุณ บางวิธีไม่ต้องหลับสนิท'],
 ['ทำไมต้องงดน้ำงดอาหารก่อนผ่าตัด','เพื่อให้ปลอดภัยขึ้น','เป็นแค่กฎของโรงพยาบาล','กระเพาะที่ว่างช่วยลดโอกาสที่สิ่งในกระเพาะจะเข้าไปในปอดระหว่างระงับความรู้สึก โปรดเริ่มงดตามเวลาที่ทีมแจ้ง'],
 ['ควรบอกทีมวิสัญญีเรื่องยาที่ใช้ประจำไหม','ควร จะนำรายการไปด้วย','ไม่เกี่ยวกับการระงับความรู้สึก','ยาและอาหารเสริมบางชนิดมีผลต่อการระงับความรู้สึกหรือการเสียเลือด เมื่อมีรายการ ทีมจะบอกได้ว่าควรใช้ต่อหรือหยุดชั่วคราว'],
 ['ตอนหลับจากการดมยาสลบ ใครดูแลฉัน','ทีมวิสัญญีอยู่ข้าง ๆ ตลอด','ไม่แน่ใจ','ตั้งแต่หลับจนตื่น ทีมวิสัญญีจะอยู่ข้างคุณ ดูแลการหายใจ ชีพจร ความดันโลหิต และออกซิเจน'],
 ['ตอนบล็อกหลัง ฉันจะตื่นอยู่ไหม','ตื่นอยู่หรืองีบได้','ต้องตื่นตลอดเวลา','คุณอาจตื่นอยู่ หรือได้รับยาให้ผ่อนคลายและง่วงก็ได้ บอกความต้องการของคุณกับทีมได้'],
 ['หลังผ่าตัดถ้าปวดหรือคลื่นไส้ บอกได้ไหม','ได้ ควรบอกทีมดูแล','อดทนเดี๋ยวก็หาย','โปรดบอกเรา! ทีมดูแลสามารถปรับยาแก้ปวดหรือยาแก้คลื่นไส้ให้คุณสบายขึ้น'],
 ['ตื่นมาแล้วระคายคอ เป็นเรื่องปกติไหม','พบได้บ่อย','ไม่แน่ใจ','อาจมีการใส่ท่อช่วยหายใจระหว่างระงับความรู้สึก อาการคอแห้งหรือระคายเคืองหลังตื่นพบได้บ่อยและมักค่อย ๆ ดีขึ้น'],
 ['ต้องถอดฟันปลอม คอนแทคเลนส์ และเครื่องประดับก่อนผ่าตัดไหม','ต้อง ปลอดภัยกว่า','ใส่ไว้ก็ได้','การถอดออกก่อนช่วยป้องกันการหลุด ติดค้าง หรือบาดเจ็บระหว่างระงับความรู้สึก'],
 ['ถ้านอนกรน ควรบอกทีมวิสัญญีไหม','ควร ทีมจะได้เตรียมพร้อม','น่าจะไม่สำคัญ','การนอนกรนหรือหยุดหายใจขณะหลับช่วยให้ทีมประเมินทางเดินหายใจและเตรียมพร้อมล่วงหน้า'],
 ['เลิกบุหรี่ก่อนผ่าตัดช่วยไหม','ช่วย ทั้งการหายใจและแผล','ไม่ค่อยต่างกัน','การเลิกบุหรี่ทำให้ทางเดินหายใจไวน้อยลงและช่วยให้แผลหาย ยิ่งเลิกเร็วยิ่งดี']],
vi:[
 ['Gây mê có giống giấc ngủ bình thường không?','Có, giống như ngủ','Chắc là không giống','Gây mê khác với giấc ngủ tự nhiên. Đội ngũ chăm sóc cơn đau, mức tỉnh và cơ thể bạn; một số cách gây mê không cần ngủ hoàn toàn.'],
 ['Vì sao phải nhịn ăn trước khi mổ?','Để gây mê an toàn hơn','Chỉ là quy định của bệnh viện','Dạ dày rỗng giúp giảm nguy cơ thức ăn tràn vào phổi khi gây mê. Hãy bắt đầu nhịn ăn theo giờ nhóm chăm sóc dặn.'],
 ['Có nên báo cho nhóm gây mê về thuốc đang dùng không?','Có, tôi sẽ mang danh sách','Không liên quan đến gây mê','Một số thuốc và thực phẩm chức năng ảnh hưởng đến gây mê hoặc chảy máu. Có danh sách, nhóm sẽ cho biết nên tiếp tục hay tạm ngưng.'],
 ['Khi ngủ do gây mê toàn thân, ai chăm sóc tôi?','Nhóm gây mê luôn ở bên','Tôi không chắc','Từ lúc ngủ đến khi tỉnh, nhóm gây mê luôn ở bên bạn, theo dõi hô hấp, nhịp tim, huyết áp và oxy.'],
 ['Khi gây tê tủy sống, tôi có tỉnh không?','Có thể tỉnh hoặc ngủ một chút','Phải tỉnh suốt thời gian','Bạn có thể tỉnh, hoặc dùng thuốc để thư giãn, buồn ngủ. Hãy chia sẻ mong muốn với nhóm.'],
 ['Sau mổ nếu đau hoặc buồn nôn, tôi có thể nói không?','Có, nên báo cho nhân viên','Chịu một chút là qua','Hãy nói cho chúng tôi biết! Nhân viên có thể điều chỉnh thuốc giảm đau hoặc chống nôn để bạn dễ chịu hơn.'],
 ['Tỉnh dậy thấy cổ họng vướng có bình thường không?','Khá thường gặp','Tôi không chắc','Có thể dùng ống thở khi gây mê. Cổ họng khô hoặc vướng sau đó khá thường gặp và thường đỡ dần.'],
 ['Có cần tháo răng giả, kính áp tròng và trang sức trước khi mổ không?','Có, như vậy an toàn hơn','Đeo cũng không sao','Tháo ra trước giúp tránh rơi, mắc kẹt hoặc gây tổn thương khi gây mê.'],
 ['Có nên báo cho nhóm gây mê là tôi ngáy không?','Có, để nhóm chuẩn bị','Chắc không quan trọng','Ngáy hoặc ngừng thở khi ngủ giúp nhóm đánh giá đường thở và chuẩn bị trước.'],
 ['Bỏ thuốc lá trước mổ có giúp ích không?','Có, cho hô hấp và vết thương','Không khác mấy','Bỏ thuốc lá giúp đường thở bớt nhạy cảm và vết thương lành tốt hơn; càng sớm càng tốt.']],
fil:[
 ['Ang anesthesia ba ay katulad ng karaniwang pagtulog?','Oo, parang tulog lang','Mukhang hindi pareho','Iba ang anesthesia sa natural na pagtulog. Inaalagaan ng team ang sakit, kamalayan at katawan mo; may uri ng anesthesia na hindi kailangang tuluyang makatulog.'],
 ['Bakit kailangang mag-ayuno bago ang operasyon?','Para mas ligtas ang anesthesia','Patakaran lang ng ospital','Mas mababa ang panganib na pumasok sa baga ang laman ng tiyan kapag walang laman ang tiyan. Magsimulang mag-ayuno sa oras na sinabi ng team.'],
 ['Dapat ko bang sabihin sa anesthesia team ang mga gamot ko?','Oo, magdadala ako ng listahan','Walang kinalaman sa anesthesia','May mga gamot at supplement na nakakaapekto sa anesthesia o pagdurugo. Sa listahan mo, masasabi ng team kung alin ang ituloy o pansamantalang ihinto.'],
 ['Sino ang nag-aalaga sa akin habang tulog sa general anesthesia?','Laging nasa tabi ko ang anesthesia team','Hindi ako sigurado','Mula pagtulog hanggang paggising, nasa tabi mo ang anesthesia team, binabantayan ang paghinga, tibok ng puso, presyon ng dugo at oxygen.'],
 ['Gising ba ako sa spinal anesthesia?','Puwedeng gising o umidlip','Dapat gising buong oras','Maaari kang manatiling gising, o bigyan ng gamot para makapagpahinga at antukin. Sabihin sa team ang gusto mo.'],
 ['Puwede ko bang sabihin kung masakit o nasusuka ako pagkatapos ng operasyon?','Oo, sasabihin ko sa nag-aalaga','Titiisin ko na lang','Pakisabi sa amin! Maaaring ayusin ng nag-aalaga ang gamot sa sakit o pagsusuka para gumaan ang pakiramdam mo.'],
 ['Normal ba ang makating lalamunan paggising?','Karaniwan ito','Hindi ako sigurado','Maaaring gumamit ng breathing tube habang may anesthesia. Karaniwan ang tuyo o makating lalamunan pagkatapos at kadalasang gumagaling.'],
 ['Dapat bang tanggalin ang pustiso, contact lens at alahas bago ang operasyon?','Oo, mas ligtas','Ayos lang kung suot','Ang pagtanggal muna ay pumipigil na mahulog, maipit o makasakit ang mga ito habang may anesthesia.'],
 ['Dapat ko bang sabihin sa anesthesia team na humihilik ako?','Oo, para makapaghanda sila','Mukhang hindi mahalaga','Ang paghilik o paghinto ng paghinga habang tulog ay tumutulong sa team na suriin ang daanan ng hangin at maghanda nang maaga.'],
 ['Nakakatulong ba ang pagtigil sa paninigarilyo bago ang operasyon?','Oo, sa paghinga at sugat','Halos walang pagkakaiba','Nagiging mas hindi sensitibo ang daanan ng hangin at mas mabilis gumaling ang sugat; mas maaga, mas mabuti.']]};
const LEARN_UI={'zh-Hant':['選一個想法，一起認識麻醉。','💡 一起認識：','下一個小知識 →'],en:['Pick a thought and learn together.','💡 Good to know: ','Next tip →'],id:['Pilih satu pendapat dan belajar bersama.','💡 Perlu diketahui: ','Info berikutnya →'],th:['เลือกความคิดหนึ่งข้อ แล้วมาเรียนรู้ด้วยกัน','💡 มาทำความรู้จัก: ','เกร็ดความรู้ถัดไป →'],vi:['Chọn một suy nghĩ và cùng tìm hiểu.','💡 Cùng tìm hiểu: ','Mẹo tiếp theo →'],fil:['Pumili ng isang palagay at sabay tayong matuto.','💡 Alamin natin: ','Susunod na kaalaman →']};
// 每題正確答案是第幾個選項（0＝左邊、1＝右邊），六種語言順序相同。
const LEARN_CORRECT=[1,0,0,0,0,0,0,0,0,0];
let learnIndex=0,learnChoice=null;
function nextLearn(){learnIndex=(learnIndex+1)%LEARN_CARDS['zh-Hant'].length;learnChoice=null;renderQuiz();}
// 取代 app.js 原本只有一題的 renderQuiz（updateLanguage 會呼叫它）；外觀維持原本的樣子。
renderQuiz=function(){const cards=LEARN_CARDS[language]||LEARN_CARDS['zh-Hant'],ui=LEARN_UI[language]||LEARN_UI['zh-Hant'],[question,first,second,explain]=cards[learnIndex];
 document.querySelector('.quiz h2').textContent=question;$('#quiz-yes').textContent=first;$('#quiz-no').textContent=second;
 $('#quiz-yes').setAttribute('aria-pressed',String(learnChoice===0));$('#quiz-no').setAttribute('aria-pressed',String(learnChoice===1));
 let next=$('#quiz-next');if(!next){next=document.createElement('button');next.id='quiz-next';next.type='button';next.className='learn-next';next.onclick=()=>{nextLearn();restartLearnTimer()};$('#quiz-feedback').after(next);}
 // 作答後：正確答案換成綠色並讓外框閃爍；選錯的那個變淡。
 const right=LEARN_CORRECT[learnIndex]??0;[$('#quiz-yes'),$('#quiz-no')].forEach((b,i)=>{b.classList.toggle('is-correct',learnChoice!==null&&i===right);b.classList.toggle('is-wrong',learnChoice!==null&&i===learnChoice&&i!==right)});
 next.textContent=ui[2];$('#quiz-feedback').textContent=learnChoice===null?ui[0]:ui[1]+explain;};
$('#quiz-yes').onclick=()=>{learnChoice=0;renderQuiz()};$('#quiz-no').onclick=()=>{learnChoice=1;renderQuiz()};
let learnTimer=null;function restartLearnTimer(){clearInterval(learnTimer);learnTimer=setInterval(nextLearn,5*60*1000);}
restartLearnTimer();renderQuiz();

// 安心任務卡：依病人勾選的自費項目，用開放式問題確認是否了解目的；再加上麻醉相關的問題。
const MISSION_TEXT={
'zh-Hant':{item:'你了解「{item}」的目的和用途嗎？試著用自己的話說說看；不清楚的地方，可以問麻醉團隊。',
 ga:['全身麻醉前為什麼需要空腹？你知道自己要從什麼時候開始空腹嗎？','全身麻醉睡著的時候，你覺得誰會幫你呼吸、看著你的心跳和血壓？','醒來後喉嚨可能會有點卡卡、乾乾的，你知道為什麼嗎？','關於全身麻醉，你最擔心的是什麼？說說看，再把它告訴麻醉團隊。','平常吃的藥和保健食品，哪些需要先告訴麻醉團隊？你準備好清單了嗎？'],
 other:['麻醉前為什麼需要空腹？你知道自己要從什麼時候開始空腹嗎？','關於這次的麻醉，你最擔心的是什麼？說說看，再把它告訴麻醉團隊。','平常吃的藥和保健食品，哪些需要先告訴麻醉團隊？你準備好清單了嗎？']},
en:{item:'Do you understand what "{item}" is for and why it might be used? Try explaining it in your own words, and ask your anesthesia team about anything unclear.',
 ga:['Why do you need to fast before general anesthesia? Do you know when to start?','While you are asleep under general anesthesia, who do you think helps you breathe and watches your heart and blood pressure?','Your throat may feel a little dry or scratchy when you wake up. Do you know why?','What worries you most about general anesthesia? Say it out loud, then share it with your anesthesia team.','Which of your usual medicines and supplements should you tell the anesthesia team about? Is your list ready?'],
 other:['Why do you need to fast before anesthesia? Do you know when to start?','What worries you most about your anesthesia? Say it out loud, then share it with your anesthesia team.','Which of your usual medicines and supplements should you tell the anesthesia team about? Is your list ready?']},
id:{item:'Apakah kamu memahami tujuan dan kegunaan "{item}"? Coba jelaskan dengan kata-katamu sendiri, dan tanyakan hal yang belum jelas kepada tim anestesi.',
 ga:['Mengapa perlu puasa sebelum anestesi umum? Tahukah kamu kapan harus mulai?','Saat tertidur dengan anestesi umum, menurutmu siapa yang membantu bernapas dan memantau jantung serta tekanan darahmu?','Tenggorokan bisa terasa kering atau gatal saat bangun. Tahukah kamu mengapa?','Apa yang paling kamu khawatirkan tentang anestesi umum? Ucapkan, lalu sampaikan kepada tim anestesi.','Obat dan suplemen apa yang perlu diberitahukan kepada tim anestesi? Apakah daftarnya sudah siap?'],
 other:['Mengapa perlu puasa sebelum anestesi? Tahukah kamu kapan harus mulai?','Apa yang paling kamu khawatirkan tentang anestesimu? Ucapkan, lalu sampaikan kepada tim anestesi.','Obat dan suplemen apa yang perlu diberitahukan kepada tim anestesi? Apakah daftarnya sudah siap?']},
th:{item:'คุณเข้าใจไหมว่า "{item}" มีไว้เพื่ออะไรและใช้ทำไม ลองอธิบายด้วยคำพูดของคุณเอง ถ้ายังไม่ชัดเจน ถามทีมวิสัญญีได้เลย',
 ga:['ทำไมต้องงดน้ำงดอาหารก่อนดมยาสลบ คุณรู้ไหมว่าต้องเริ่มงดเมื่อไร','ตอนหลับจากการดมยาสลบ คุณคิดว่าใครช่วยคุณหายใจและดูแลหัวใจกับความดันโลหิต','ตื่นมาแล้วคออาจแห้งหรือระคายเคือง คุณรู้ไหมว่าเพราะอะไร','เรื่องการดมยาสลบ คุณกังวลอะไรมากที่สุด ลองพูดออกมา แล้วบอกทีมวิสัญญี','ยาและอาหารเสริมที่ใช้ประจำ ตัวไหนต้องบอกทีมวิสัญญี คุณเตรียมรายการไว้หรือยัง'],
 other:['ทำไมต้องงดน้ำงดอาหารก่อนระงับความรู้สึก คุณรู้ไหมว่าต้องเริ่มงดเมื่อไร','เรื่องการระงับความรู้สึกครั้งนี้ คุณกังวลอะไรมากที่สุด ลองพูดออกมา แล้วบอกทีมวิสัญญี','ยาและอาหารเสริมที่ใช้ประจำ ตัวไหนต้องบอกทีมวิสัญญี คุณเตรียมรายการไว้หรือยัง']},
vi:{item:'Bạn có hiểu "{item}" dùng để làm gì và vì sao có thể cần không? Hãy thử giải thích bằng lời của bạn, và hỏi nhóm gây mê nếu còn chỗ chưa rõ.',
 ga:['Vì sao cần nhịn ăn trước gây mê toàn thân? Bạn có biết khi nào bắt đầu không?','Khi ngủ do gây mê toàn thân, bạn nghĩ ai giúp bạn thở và theo dõi tim, huyết áp?','Khi tỉnh dậy, cổ họng có thể hơi khô hoặc vướng. Bạn có biết vì sao không?','Điều gì khiến bạn lo nhất về gây mê toàn thân? Hãy nói ra, rồi chia sẻ với nhóm gây mê.','Thuốc và thực phẩm chức năng nào cần báo cho nhóm gây mê? Bạn đã chuẩn bị danh sách chưa?'],
 other:['Vì sao cần nhịn ăn trước gây mê? Bạn có biết khi nào bắt đầu không?','Điều gì khiến bạn lo nhất về lần gây mê này? Hãy nói ra, rồi chia sẻ với nhóm gây mê.','Thuốc và thực phẩm chức năng nào cần báo cho nhóm gây mê? Bạn đã chuẩn bị danh sách chưa?']},
fil:{item:'Naiintindihan mo ba kung para saan ang "{item}" at bakit ito maaaring gamitin? Subukang ipaliwanag sa sarili mong salita, at itanong sa anesthesia team ang hindi malinaw.',
 ga:['Bakit kailangang mag-ayuno bago ang general anesthesia? Alam mo ba kung kailan magsisimula?','Habang tulog sa general anesthesia, sino sa palagay mo ang tumutulong sa paghinga at nagbabantay sa puso at presyon ng dugo?','Maaaring tuyo o makati ang lalamunan paggising. Alam mo ba kung bakit?','Ano ang pinakaikinababahala mo tungkol sa general anesthesia? Sabihin ito, saka ibahagi sa anesthesia team.','Aling mga gamot at supplement ang dapat sabihin sa anesthesia team? Handa na ba ang listahan mo?'],
 other:['Bakit kailangang mag-ayuno bago ang anesthesia? Alam mo ba kung kailan magsisimula?','Ano ang pinakaikinababahala mo tungkol sa anesthesia mo? Sabihin ito, saka ibahagi sa anesthesia team.','Aling mga gamot at supplement ang dapat sabihin sa anesthesia team? Handa na ba ang listahan mo?']}};
let lastMission='';
function missionCards(){const m=MISSION_TEXT[language]||MISSION_TEXT['zh-Hant'],items=[...careState.selected].map(id=>catalogItem(id)).filter(Boolean).map(item=>m.item.replace('{item}',catalogName(item)));return [...items,...(departmentMethods().includes(0)?m.ga:m.other)];}
function drawMission(){const cards=missionCards().filter(card=>card!==lastMission);const card=cards[Math.floor(Math.random()*cards.length)]||lastMission;lastMission=card;return card;}
// 取代 island-fun.js 的任務卡按鈕
const originalPassport=renderPassport;
renderPassport=function(){originalPassport();const root=document.querySelector('#island-passport');const button=root?.querySelector('.mission-button');if(!button)return;button.onclick=()=>{const message=root.querySelector('.mission-message');message.hidden=false;message.textContent='💬 '+drawMission()};};
renderPassport();
