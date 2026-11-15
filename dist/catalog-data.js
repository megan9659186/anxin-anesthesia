'use strict';
const HOSPITAL_CATALOG=[
 {
  "id": "airway",
  "code": "01",
  "group": "基本處置／監測",
  "zh": "進階呼吸道通氣術",
  "note": ""
 },
 {
  "id": "oxygen",
  "code": "02",
  "group": "基本處置／監測",
  "zh": "高氧呼吸輔助通氣術",
  "note": ""
 },
 {
  "id": "depth",
  "code": "03",
  "group": "基本處置／監測",
  "zh": "麻醉深度監控",
  "note": ""
 },
 {
  "id": "warming",
  "code": "04",
  "group": "基本處置／監測",
  "zh": "熱空氣式保溫處置",
  "note": ""
 },
 {
  "id": "05",
  "code": "05",
  "group": "基本處置／監測",
  "zh": "腦血氧濃度監測",
  "note": ""
 },
 {
  "id": "06",
  "code": "06",
  "group": "基本處置／監測",
  "zh": "全血凝血分析處置（全套）",
  "note": ""
 },
 {
  "id": "07",
  "code": "07",
  "group": "基本處置／監測",
  "zh": "全血凝血分析處置（單次）",
  "note": ""
 },
 {
  "id": "08",
  "code": "08",
  "group": "基本處置／監測",
  "zh": "持續疼痛監測暨疼痛處置",
  "note": ""
 },
 {
  "id": "09",
  "code": "09",
  "group": "基本處置／監測",
  "zh": "電子聽診連續呼吸音監控術",
  "note": ""
 },
 {
  "id": "10",
  "code": "10",
  "group": "基本處置／監測",
  "zh": "腦波導引理想鎮靜術（內含 Remimazolam＋BIS，60 分鐘內）",
  "note": ""
 },
 {
  "id": "11",
  "code": "11",
  "group": "基本處置／監測",
  "zh": "腦波導引理想鎮靜術（大於 60 分鐘加計）",
  "note": ""
 },
 {
  "id": "12",
  "code": "12",
  "group": "基本處置／監測",
  "zh": "手術中最適肌張力處置( 含Sugammadex)",
  "note": ""
 },
 {
  "id": "13",
  "code": "13",
  "group": "自費藥品",
  "zh": "Sugammadex",
  "note": ""
 },
 {
  "id": "C01",
  "code": "C01",
  "group": "自費耗材",
  "zh": "頭墊",
  "note": ""
 },
 {
  "id": "C02",
  "code": "C02",
  "group": "自費耗材",
  "zh": "特殊氣管內管",
  "note": ""
 },
 {
  "id": "C03",
  "code": "C03",
  "group": "自費耗材",
  "zh": "保護性敷料（3片）",
  "note": ""
 },
 {
  "id": "C04",
  "code": "C04",
  "group": "自費耗材",
  "zh": "保護性敷料（美皮蕾）",
  "note": "依實際使用片數計價"
 },
 {
  "id": "C05",
  "code": "C05",
  "group": "自費耗材",
  "zh": "巡迴員輸液套組／輸血加溫袋",
  "note": ""
 },
 {
  "id": "C06",
  "code": "C06",
  "group": "自費耗材",
  "zh": "皮膚減壓墊（2片）（護眼貼）",
  "note": ""
 },
 {
  "id": "C07",
  "code": "C07",
  "group": "自費耗材",
  "zh": "經鼻氧氣套管",
  "note": ""
 },
 {
  "id": "C08",
  "code": "C08",
  "group": "自費耗材",
  "zh": "康威多愛膚超薄型敷料（人工皮）",
  "note": ""
 },
 {
  "id": "OB01",
  "code": "OB01",
  "group": "減痛分娩",
  "zh": "減痛分娩麻醉術",
  "note": ""
 },
 {
  "id": "OB02",
  "code": "OB02",
  "group": "減痛分娩",
  "zh": "髓鞘內減痛分娩術",
  "note": ""
 },
 {
  "id": "PA01",
  "code": "PA01",
  "group": "止痛",
  "zh": "靜脈注射自控式止痛（1天）",
  "note": ""
 },
 {
  "id": "PA02",
  "code": "PA02",
  "group": "止痛",
  "zh": "硬脊膜外注射止痛（3天）",
  "note": ""
 },
 {
  "id": "PA03",
  "code": "PA03",
  "group": "止痛",
  "zh": "疼痛治療延長療程，每延長一天",
  "note": ""
 },
 {
  "id": "PA04",
  "code": "PA04",
  "group": "止痛",
  "zh": "腰椎麻醉，另加長效止痛藥",
  "note": ""
 },
 {
  "id": "block",
  "code": "PA05",
  "group": "止痛",
  "zh": "神經阻斷術止痛",
  "note": ""
 },
 {
  "id": "dynastat",
  "code": "DR01",
  "group": "自費藥品",
  "zh": "Dynastat",
  "note": ""
 },
 {
  "id": "paracetamol",
  "code": "DR02",
  "group": "自費藥品",
  "zh": "Acetamol",
  "note": ""
 },
 {
  "id": "DR03",
  "code": "DR03",
  "group": "自費藥品",
  "zh": "Precedex",
  "note": ""
 },
 {
  "id": "DR04",
  "code": "DR04",
  "group": "自費藥品",
  "zh": "Remifentanil",
  "note": ""
 },
 {
  "id": "ondansetron",
  "code": "DR05",
  "group": "自費藥品",
  "zh": "Ondansetron",
  "note": ""
 },
 {
  "id": "naldebain",
  "code": "DR06",
  "group": "自費藥品",
  "zh": "Naldebain",
  "note": ""
 },
 {
  "id": "DR07",
  "code": "DR07",
  "group": "自費藥品",
  "zh": "PCC",
  "note": ""
 },
 {
  "id": "DR08",
  "code": "DR08",
  "group": "自費藥品",
  "zh": "FC",
  "note": ""
 },
 {
  "id": "DR09",
  "code": "DR09",
  "group": "自費藥品",
  "zh": "Remimazolam",
  "note": "鎮靜自費麻醉藥品"
 },
 {
  "id": "GI01",
  "code": "GI01",
  "group": "消化系自費麻醉",
  "zh": "上消化道麻醉",
  "note": ""
 },
 {
  "id": "GI02",
  "code": "GI02",
  "group": "消化系自費麻醉",
  "zh": "下消化道麻醉",
  "note": ""
 },
 {
  "id": "GI03",
  "code": "GI03",
  "group": "消化系自費麻醉",
  "zh": "上下消化道麻醉",
  "note": ""
 },
 {
  "id": "GI04",
  "code": "GI04",
  "group": "消化系自費麻醉",
  "zh": "上消化道 EUS 麻醉",
  "note": ""
 },
 {
  "id": "GI05",
  "code": "GI05",
  "group": "消化系自費麻醉",
  "zh": "內視鏡檢查（胃鏡加 EUS）麻醉",
  "note": ""
 },
 {
  "id": "GI06",
  "code": "GI06",
  "group": "消化系自費麻醉",
  "zh": "EUS＋biopsy 麻醉",
  "note": ""
 },
 {
  "id": "GI07",
  "code": "GI07",
  "group": "消化系自費麻醉",
  "zh": "兩項檢查（大腸鏡加 EUS）麻醉",
  "note": ""
 },
 {
  "id": "GI08",
  "code": "GI08",
  "group": "消化系自費麻醉",
  "zh": "上小腸鏡檢麻醉",
  "note": ""
 },
 {
  "id": "GI09",
  "code": "GI09",
  "group": "消化系自費麻醉",
  "zh": "下小腸鏡檢麻醉",
  "note": ""
 },
 {
  "id": "GI10",
  "code": "GI10",
  "group": "消化系自費麻醉",
  "zh": "ESD（內視鏡黏膜下剝離術）麻醉",
  "note": ""
 },
 {
  "id": "GI11",
  "code": "GI11",
  "group": "消化系自費麻醉",
  "zh": "特殊攝影 ERCP 麻醉（限靜脈麻醉 30 分鐘）",
  "note": ""
 },
 {
  "id": "GI12",
  "code": "GI12",
  "group": "高風險消化系麻醉",
  "zh": "高風險上消化道麻醉（上消化道麻醉＋Remimazolam）",
  "note": ""
 },
 {
  "id": "GI13",
  "code": "GI13",
  "group": "高風險消化系麻醉",
  "zh": "高風險下消化道麻醉（下消化道麻醉＋Remimazolam）",
  "note": ""
 },
 {
  "id": "GI14",
  "code": "GI14",
  "group": "高風險消化系麻醉",
  "zh": "高風險上下消化道麻醉（上下消化道麻醉＋Remimazolam）",
  "note": ""
 },
 {
  "id": "GI15",
  "code": "GI15",
  "group": "高風險特殊攝影麻醉",
  "zh": "腦波導引理想鎮靜術（內含 Remimazolam＋BIS，60 分鐘內）",
  "note": "高風險特殊攝影麻醉費 60 分鐘內組合的一部分"
 },
 {
  "id": "GI16",
  "code": "GI16",
  "group": "高風險特殊攝影麻醉",
  "zh": "腦波導引理想鎮靜術（大於 60 分鐘加計）",
  "note": ""
 },
 {
  "id": "GI17",
  "code": "GI17",
  "group": "高風險特殊攝影麻醉",
  "zh": "高風險特殊攝影麻醉費（60 分鐘內）",
  "note": "依原同意書組合總額"
 },
 {
  "id": "AN01",
  "code": "AN01",
  "group": "自費麻醉費",
  "zh": "脊椎麻醉要求舒眠麻醉費",
  "note": ""
 },
 {
  "id": "AN02",
  "code": "AN02",
  "group": "自費麻醉費",
  "zh": "自費靜脈麻醉＞1 小時",
  "note": ""
 },
 {
  "id": "AN03",
  "code": "AN03",
  "group": "自費麻醉費",
  "zh": "牙科舒眠自費麻醉＜1 小時",
  "note": ""
 },
 {
  "id": "AN04",
  "code": "AN04",
  "group": "自費麻醉費",
  "zh": "牙科舒眠自費麻醉＞1 小時（每 30 分加計）",
  "note": ""
 },
 {
  "id": "AN05",
  "code": "AN05",
  "group": "自費麻醉費",
  "zh": "氣管插管或面罩麻醉（含標準／部分醫藥材）",
  "note": ""
 },
 {
  "id": "AN06",
  "code": "AN06",
  "group": "自費麻醉費",
  "zh": "氣管插管或面罩麻醉＞2 小時（每 30 分加計）",
  "note": ""
 },
 {
  "id": "AN07",
  "code": "AN07",
  "group": "自費麻醉費",
  "zh": "氣管插管或面罩麻醉＞4 小時以上（每 30 分加計）",
  "note": ""
 }
];
const CATALOG_NAMES={
en:['Advanced airway ventilation','High-flow oxygen support','Anesthesia depth monitoring','Forced-air warming','Cerebral oxygen monitoring','Whole-blood coagulation analysis (full set)','Whole-blood coagulation analysis (single test)','Continuous pain monitoring and management','Continuous electronic breath-sound monitoring','EEG-guided sedation (Remimazolam + BIS; within 60 minutes)','EEG-guided sedation (additional charge beyond 60 minutes)','Intraoperative muscle relaxation management (includes Sugammadex)','Sugammadex','Head cushion','Special endotracheal tube','Protective dressings (3 pieces)','Protective dressing (Mepilex; per piece)','Fluid set / blood-warming bag','Pressure-relief pads (2 eye protectors)','Nasal oxygen cannula','DuoDERM Extra Thin dressing','Labor pain relief anesthesia','Intrathecal labor pain relief','IV patient-controlled analgesia (1 day)','Epidural pain relief (3 days)','Extended pain treatment (per additional day)','Spinal anesthesia with long-acting analgesic','Nerve block for pain relief','Dynastat','Acetamol','Precedex','Remifentanil','Ondansetron','Naldebain','PCC','FC','Remimazolam','Upper GI anesthesia','Lower GI anesthesia','Upper + lower GI anesthesia','Upper GI EUS anesthesia','Gastroscopy + EUS anesthesia','EUS + biopsy anesthesia','Colonoscopy + EUS anesthesia','Upper enteroscopy anesthesia','Lower enteroscopy anesthesia','ESD anesthesia','ERCP anesthesia (IV anesthesia, 30 minutes)','High-risk upper GI anesthesia (+ Remimazolam)','High-risk lower GI anesthesia (+ Remimazolam)','High-risk upper + lower GI anesthesia (+ Remimazolam)','EEG-guided sedation (Remimazolam + BIS; within 60 minutes)','EEG-guided sedation (additional charge beyond 60 minutes)','High-risk imaging anesthesia (within 60 minutes)','Sedation requested with spinal anesthesia','IV anesthesia longer than 1 hour','Dental sedation shorter than 1 hour','Dental sedation beyond 1 hour (per additional 30 minutes)','Intubation or mask anesthesia (standard / some supplies included)','Intubation or mask anesthesia beyond 2 hours (per additional 30 minutes)','Intubation or mask anesthesia beyond 4 hours (per additional 30 minutes)'],
id:['Ventilasi jalan napas lanjutan','Dukungan oksigen aliran tinggi','Pemantauan kedalaman anestesi','Penghangatan udara paksa','Pemantauan oksigen otak','Analisis pembekuan darah lengkap (paket)','Analisis pembekuan darah lengkap (sekali)','Pemantauan dan penanganan nyeri berkelanjutan','Pemantauan suara napas elektronik berkelanjutan','Sedasi berpandu EEG (Remimazolam + BIS; hingga 60 menit)','Sedasi berpandu EEG (tambahan setelah 60 menit)','Penanganan relaksasi otot saat operasi (termasuk Sugammadex)','Sugammadex','Bantalan kepala','Pipa endotrakeal khusus','Balutan pelindung (3 buah)','Balutan pelindung (Mepilex; per buah)','Set cairan / kantong penghangat darah','Bantalan pengurang tekanan (2 pelindung mata)','Kanula oksigen hidung','Balutan DuoDERM Extra Thin','Anestesi untuk mengurangi nyeri persalinan','Pereda nyeri persalinan intratekal','Analgesia IV yang dikendalikan pasien (1 hari)','Pereda nyeri epidural (3 hari)','Perpanjangan terapi nyeri (per hari tambahan)','Anestesi spinal dengan obat nyeri kerja panjang','Blok saraf untuk nyeri'],
th:['การช่วยหายใจขั้นสูง','การให้ออกซิเจนอัตราไหลสูง','การติดตามความลึกของยาสลบ','การให้ความอบอุ่นด้วยลมร้อน','การติดตามออกซิเจนในสมอง','การตรวจการแข็งตัวของเลือดครบชุด','การตรวจการแข็งตัวของเลือดครั้งเดียว','การติดตามและดูแลความปวดต่อเนื่อง','การติดตามเสียงหายใจด้วยอุปกรณ์อิเล็กทรอนิกส์','การระงับความรู้สึกนำทางด้วย EEG (Remimazolam + BIS ภายใน 60 นาที)','การระงับความรู้สึกนำทางด้วย EEG (เพิ่มเมื่อเกิน 60 นาที)','การดูแลการคลายกล้ามเนื้อระหว่างผ่าตัด (รวม Sugammadex)','Sugammadex','หมอนรองศีรษะ','ท่อช่วยหายใจชนิดพิเศษ','แผ่นปิดป้องกัน (3 ชิ้น)','แผ่นปิดป้องกัน (Mepilex ต่อชิ้น)','ชุดให้สารน้ำ / ถุงอุ่นเลือด','แผ่นลดแรงกด (ปิดตา 2 ชิ้น)','สายออกซิเจนทางจมูก','แผ่นปิดแผล DuoDERM Extra Thin','การระงับปวดขณะคลอด','การระงับปวดคลอดทางช่องน้ำไขสันหลัง','เครื่องให้ยาแก้ปวดทางหลอดเลือดที่ผู้ป่วยควบคุม (1 วัน)','การระงับปวดทางช่องเหนือเยื่อดูรา (3 วัน)','การรักษาปวดต่อเนื่อง (ต่อวันที่เพิ่ม)','การระงับความรู้สึกทางไขสันหลังร่วมยาแก้ปวดออกฤทธิ์นาน','การบล็อกเส้นประสาทเพื่อระงับปวด'],
vi:['Hỗ trợ thông khí đường thở nâng cao','Hỗ trợ oxy lưu lượng cao','Theo dõi độ sâu gây mê','Giữ ấm bằng khí nóng','Theo dõi oxy não','Phân tích đông máu toàn phần (trọn bộ)','Phân tích đông máu toàn phần (một lần)','Theo dõi và xử trí đau liên tục','Theo dõi âm thở điện tử liên tục','An thần hướng dẫn bằng EEG (Remimazolam + BIS; trong 60 phút)','An thần hướng dẫn bằng EEG (phụ thu quá 60 phút)','Xử trí giãn cơ trong mổ (gồm Sugammadex)','Sugammadex','Đệm đầu','Ống nội khí quản đặc biệt','Miếng dán bảo vệ (3 miếng)','Miếng dán bảo vệ (Mepilex; mỗi miếng)','Bộ truyền dịch / túi làm ấm máu','Đệm giảm áp (2 miếng bảo vệ mắt)','Ống oxy mũi','Miếng dán DuoDERM Extra Thin','Gây tê giảm đau khi sinh','Giảm đau khi sinh qua khoang dưới nhện','Giảm đau IV do người bệnh tự kiểm soát (1 ngày)','Giảm đau ngoài màng cứng (3 ngày)','Gia hạn điều trị đau (mỗi ngày thêm)','Gây tê tủy sống kèm thuốc giảm đau tác dụng dài','Phong bế thần kinh giảm đau'],
fil:['Mas advanced na suporta sa daanan ng hangin','High-flow na suporta sa oxygen','Pagsubaybay sa lalim ng anesthesia','Pagpapainit gamit ang mainit na hangin','Pagsubaybay sa oxygen ng utak','Pagsusuri ng pamumuo ng buong dugo (buong set)','Pagsusuri ng pamumuo ng buong dugo (isang beses)','Tuloy-tuloy na pagsubaybay at pag-aalaga sa sakit','Tuloy-tuloy na elektronikong pagsubaybay sa tunog ng paghinga','Sedation na ginagabayan ng EEG (Remimazolam + BIS; hanggang 60 minuto)','Sedation na ginagabayan ng EEG (dagdag lampas 60 minuto)','Pangangalaga sa pagrelaks ng kalamnan sa operasyon (kasama ang Sugammadex)','Sugammadex','Unan sa ulo','Espesyal na endotracheal tube','Proteksiyong dressing (3 piraso)','Proteksiyong dressing (Mepilex; bawat piraso)','Set para sa suwero / bag na pampainit ng dugo','Pad na pampabawas ng pressure (2 pantakip sa mata)','Nasal oxygen cannula','DuoDERM Extra Thin dressing','Anesthesia para sa sakit sa panganganak','Intrathecal na pampawala ng sakit sa panganganak','IV na pampawala ng sakit na kontrolado ng pasyente (1 araw)','Epidural na pampawala ng sakit (3 araw)','Karagdagang paggamot sa sakit (bawat dagdag na araw)','Spinal anesthesia na may pangmatagalang pampawala ng sakit','Nerve block para sa sakit']};
const SURGERY_IDS=['A','B','D','E','F','G','H','N','O','V'];
const SURGERY_NAMES={
'zh-Hant':['腹腔鏡手術','骨科手術','胸腔手術','腦部手術','眼科手術','耳鼻喉科手術','泌尿科手術','心臟手術','移植手術','其他／個別自費項目'],
en:['Laparoscopic surgery','Orthopedic surgery','Thoracic surgery','Brain surgery','Eye surgery','Ear, nose and throat surgery','Urologic surgery','Heart surgery','Transplant surgery','Other / individual self-pay items'],
id:['Operasi laparoskopi','Operasi ortopedi','Operasi dada','Operasi otak','Operasi mata','Operasi THT','Operasi urologi','Operasi jantung','Operasi transplantasi','Lainnya / item biaya pribadi'],
th:['ผ่าตัดส่องกล้อง','ผ่าตัดกระดูกและข้อ','ผ่าตัดทรวงอก','ผ่าตัดสมอง','ผ่าตัดตา','ผ่าตัดหู คอ จมูก','ผ่าตัดระบบทางเดินปัสสาวะ','ผ่าตัดหัวใจ','ผ่าตัดปลูกถ่ายอวัยวะ','อื่น ๆ / รายการที่จ่ายเอง'],
vi:['Phẫu thuật nội soi','Phẫu thuật chỉnh hình','Phẫu thuật lồng ngực','Phẫu thuật não','Phẫu thuật mắt','Phẫu thuật tai mũi họng','Phẫu thuật tiết niệu','Phẫu thuật tim','Phẫu thuật ghép tạng','Khác / dịch vụ tự chi trả riêng'],
fil:['Laparoscopic surgery','Operasyon sa buto at kasukasuan','Operasyon sa dibdib','Operasyon sa utak','Operasyon sa mata','Operasyon sa tainga, ilong at lalamunan','Operasyon sa sistemang ihi','Operasyon sa puso','Operasyong transplant','Iba pa / hiwalay na self-pay item']};
const BUNDLE_BASE=['01','03','04','08','12'];
const SURGERY_BUNDLES={A:{codes:[...BUNDLE_BASE,'DR01','DR02','PA05','DR05']},B:{codes:[...BUNDLE_BASE,'DR01','DR02','PA05','DR05']},D:{codes:[...BUNDLE_BASE,'02','05','DR01','DR02']},E:{codes:[...BUNDLE_BASE,'DR01','DR02']},F:{codes:[...BUNDLE_BASE,'DR01','DR02','DR05']},G:{codes:[...BUNDLE_BASE,'DR01','DR02','DR05']},H:{codes:[...BUNDLE_BASE,'DR01','DR02','DR05']},N:{codes:[...BUNDLE_BASE,'05','06','07']},O:{codes:[...BUNDLE_BASE,'05','06','07']},V:{codes:[]}};
const CATALOG_GROUPS=['基本處置／監測','自費藥品','自費耗材','減痛分娩','止痛','消化系自費麻醉','高風險消化系麻醉','高風險特殊攝影麻醉','自費麻醉費'];
const CATALOG_UI={
'zh-Hant':{surgery:'手術科別／術式',title:'麻醉自費討論清單',plan:'預設麻醉方式',defaultNote:'依你填寫的術式，目前先預設全身麻醉供討論；實際方式由麻醉團隊評估確認。',bundle:'此術式在院內表列的組套',bundleNote:'供討論參考，不會自動勾選自費項目。止痛藥與凝血分析規格等選擇請和團隊確認。',items:'全部 61 項自費品項',selected:'已加入討論清單',other:'其他品項，可自行勾選加入討論',check:'加入討論',reference:'依 115/11/10 院內表列價格，單位為新臺幣；以院方最新核定價目、實際用量與使用時間為準。此清單不代表訂購、同意施作或已給藥。',overlap:'肌張力處置已含肌肉鬆弛劑解藥；腦波導引鎮靜已含鎮靜藥與深度監控。凝血分析有全套或單次規格，部分鎮靜與加時項目內容重疊，請和團隊確認，勿直接相加計費。',figure:'自費品相示意圖',empty:'尚未加入自費討論項目，可在下方勾選。',groups:CATALOG_GROUPS,unitPiece:'／片',unitDay:'／天',unitTime:'／30 分',official:'院內原名',search:'搜尋品項名稱',count:'項',reset:'不會自動選購'},
en:{surgery:'Surgical specialty / procedure',title:'Self-pay anesthesia discussion list',plan:'Default anesthesia plan',defaultNote:'General anesthesia is the initial discussion choice for your procedure. Your team will confirm the actual plan.',bundle:'Hospital-listed bundle for this procedure',bundleNote:'For discussion only. No self-pay items are automatically selected. Confirm drug choices and coagulation test options with your team.',items:'All 61 self-pay items',selected:'In your discussion list',other:'Other items you can add for discussion',check:'Add for discussion',reference:'Reference prices from the hospital table dated 2026-11-10, in TWD. Current approved prices, quantities and time apply. This list is not an order, consent or record of administration.',overlap:'Some services include medicines or monitoring that also appear separately. Full-set and single-test coagulation options differ. Confirm overlapping services and time charges with your team; do not add charges automatically.',figure:'Selected-item illustrations',empty:'No self-pay items selected. You can add items below.',groups:['Procedures / monitoring','Medicines','Supplies','Labor pain relief','Pain relief','GI anesthesia','High-risk GI anesthesia','High-risk imaging anesthesia','Anesthesia fees'],unitPiece:' / piece',unitDay:' / day',unitTime:' / 30 min',official:'Hospital name',search:'Search item name',count:'items'},
id:{surgery:'Spesialisasi / jenis operasi',title:'Daftar diskusi anestesi biaya pribadi',plan:'Rencana anestesi awal',defaultNote:'Anestesi umum dipilih sebagai awal diskusi untuk operasi Anda. Tim akan memastikan rencana sebenarnya.',bundle:'Paket rumah sakit untuk operasi ini',bundleNote:'Hanya untuk diskusi. Tidak ada item biaya pribadi yang dipilih otomatis. Pastikan pilihan obat dan tes pembekuan dengan tim.',items:'Semua 61 item biaya pribadi',selected:'Dalam daftar diskusi',other:'Item lain yang dapat ditambahkan untuk diskusi',check:'Tambah untuk diskusi',reference:'Harga referensi rumah sakit tanggal 2026-11-10 dalam TWD. Harga resmi terbaru, jumlah dan waktu aktual berlaku. Daftar ini bukan pesanan, persetujuan tindakan atau catatan pemberian obat.',overlap:'Beberapa layanan sudah mencakup obat atau pemantauan yang tercantum terpisah. Pilihan tes paket dan sekali berbeda. Konfirmasikan layanan dan biaya waktu dengan tim; jangan langsung menjumlahkan.',figure:'Ilustrasi item pilihan',empty:'Belum ada item pilihan. Tambahkan di bawah.',groups:['Tindakan / pemantauan','Obat','Bahan medis','Nyeri persalinan','Pereda nyeri','Anestesi saluran cerna','Anestesi saluran cerna berisiko tinggi','Anestesi pencitraan berisiko tinggi','Biaya anestesi'],unitPiece:' / buah',unitDay:' / hari',unitTime:' / 30 menit',official:'Nama rumah sakit',search:'Cari nama item',count:'item'},
th:{surgery:'สาขา / ประเภทการผ่าตัด',title:'รายการปรึกษาค่าใช้จ่ายการระงับความรู้สึก',plan:'วิธีระงับความรู้สึกเริ่มต้น',defaultNote:'เลือกการดมยาสลบเป็นค่าเริ่มต้นเพื่อปรึกษาสำหรับการผ่าตัดของคุณ ทีมจะยืนยันแผนจริงอีกครั้ง',bundle:'ชุดรายการของโรงพยาบาลสำหรับการผ่าตัดนี้',bundleNote:'เพื่อปรึกษาเท่านั้น ไม่มีการเลือกรายการที่จ่ายเองอัตโนมัติ โปรดยืนยันการเลือกยาและการตรวจการแข็งตัวของเลือดกับทีม',items:'รายการที่จ่ายเองทั้งหมด 61 รายการ',selected:'อยู่ในรายการปรึกษา',other:'รายการอื่นที่เลือกเพิ่มเพื่อปรึกษาได้',check:'เพิ่มเพื่อปรึกษา',reference:'ราคาอ้างอิงจากตารางโรงพยาบาลวันที่ 2026-11-10 หน่วย TWD ใช้ราคาที่อนุมัติล่าสุด ปริมาณและเวลาจริง รายการนี้ไม่ใช่คำสั่งซื้อ ความยินยอม หรือบันทึกการให้ยา',overlap:'บางบริการรวมยาและการติดตามที่มีแยกรายการอยู่แล้ว การตรวจครบชุดและครั้งเดียวต่างกัน โปรดยืนยันบริการซ้ำซ้อนและค่าเวลากับทีมก่อนรวมราคา',figure:'ภาพรายการที่เลือก',empty:'ยังไม่ได้เลือกรายการ เลือกเพิ่มด้านล่างได้',groups:['หัตถการ / การติดตาม','ยา','วัสดุการแพทย์','ระงับปวดคลอด','ระงับปวด','ระงับความรู้สึกทางเดินอาหาร','ทางเดินอาหารความเสี่ยงสูง','การตรวจภาพความเสี่ยงสูง','ค่าระงับความรู้สึก'],unitPiece:' / ชิ้น',unitDay:' / วัน',unitTime:' / 30 นาที',official:'ชื่อในโรงพยาบาล',search:'ค้นหาชื่อรายการ',count:'รายการ'},
vi:{surgery:'Chuyên khoa / loại phẫu thuật',title:'Danh sách trao đổi gây mê tự chi trả',plan:'Phương pháp gây mê mặc định',defaultNote:'Gây mê toàn thân được chọn ban đầu để trao đổi về ca mổ của bạn. Nhóm gây mê sẽ xác nhận kế hoạch thực tế.',bundle:'Gói bệnh viện liệt kê cho loại phẫu thuật này',bundleNote:'Chỉ để trao đổi. Không tự động chọn dịch vụ tự chi trả. Hãy xác nhận lựa chọn thuốc và xét nghiệm đông máu với nhóm.',items:'Tất cả 61 dịch vụ tự chi trả',selected:'Trong danh sách trao đổi',other:'Các mục khác có thể chọn để trao đổi',check:'Thêm để trao đổi',reference:'Giá tham khảo bệnh viện ngày 2026-11-10, đơn vị TWD. Áp dụng giá được duyệt mới nhất, số lượng và thời gian thực tế. Danh sách không phải đơn đặt hàng, đồng ý thực hiện hay hồ sơ dùng thuốc.',overlap:'Một số dịch vụ đã gồm thuốc hoặc theo dõi được liệt kê riêng. Xét nghiệm trọn bộ và một lần khác nhau. Xác nhận mục trùng và phụ thu thời gian với nhóm trước khi cộng phí.',figure:'Minh họa mục đã chọn',empty:'Chưa chọn dịch vụ tự chi trả. Có thể thêm bên dưới.',groups:['Thủ thuật / theo dõi','Thuốc','Vật tư','Giảm đau khi sinh','Giảm đau','Gây mê tiêu hóa','Tiêu hóa nguy cơ cao','Chẩn đoán hình ảnh nguy cơ cao','Phí gây mê'],unitPiece:' / miếng',unitDay:' / ngày',unitTime:' / 30 phút',official:'Tên tại bệnh viện',search:'Tìm tên dịch vụ',count:'mục'},
fil:{surgery:'Espesyalidad / uri ng operasyon',title:'Listahan ng pag-uusapan sa self-pay anesthesia',plan:'Paunang paraan ng anesthesia',defaultNote:'General anesthesia ang paunang pagpili para sa pag-uusap tungkol sa iyong operasyon. Kukumpirmahin ng team ang aktuwal na plano.',bundle:'Bundle ng ospital para sa operasyong ito',bundleNote:'Para sa pag-uusap lamang. Walang awtomatikong pinipiling self-pay item. Kumpirmahin ang gamot at opsiyon sa pagsusuri ng pamumuo ng dugo sa team.',items:'Lahat ng 61 self-pay item',selected:'Nasa listahan ng pag-uusapan',other:'Iba pang item na maaaring idagdag para pag-usapan',check:'Idagdag para pag-usapan',reference:'Presyong sanggunian ng ospital noong 2026-11-10, sa TWD. Masusunod ang pinakabagong aprubadong presyo, aktuwal na dami at oras. Hindi ito order, pahintulot o rekord ng pagbibigay ng gamot.',overlap:'May serbisyong kasama na ang gamot o monitoring na nakalista rin nang hiwalay. Magkaiba ang buong set at isang pagsusuri. Kumpirmahin sa team ang magkakaparehong serbisyo at dagdag na oras bago pagsamahin ang singil.',figure:'Larawan ng mga napiling item',empty:'Wala pang napiling self-pay item. Maaaring magdagdag sa ibaba.',groups:['Pamamaraan / monitoring','Mga gamot','Mga supply','Sakit sa panganganak','Pampawala ng sakit','GI anesthesia','GI anesthesia na mataas ang panganib','Imaging anesthesia na mataas ang panganib','Bayad sa anesthesia'],unitPiece:' / piraso',unitDay:' / araw',unitTime:' / 30 minuto',official:'Pangalan sa ospital',search:'Hanapin ang pangalan ng item',count:'item'}};
const CATALOG_EXTRA={
id:['Anestesi saluran cerna atas','Anestesi saluran cerna bawah','Anestesi saluran cerna atas + bawah','Anestesi EUS saluran cerna atas','Anestesi gastroskopi + EUS','Anestesi EUS + biopsi','Anestesi kolonoskopi + EUS','Anestesi enteroskopi atas','Anestesi enteroskopi bawah','Anestesi ESD','Anestesi ERCP (IV, 30 menit)','Anestesi saluran cerna atas berisiko tinggi (+ Remimazolam)','Anestesi saluran cerna bawah berisiko tinggi (+ Remimazolam)','Anestesi saluran cerna atas + bawah berisiko tinggi (+ Remimazolam)','Sedasi berpandu EEG (Remimazolam + BIS; hingga 60 menit)','Sedasi berpandu EEG (tambahan setelah 60 menit)','Anestesi pencitraan berisiko tinggi (hingga 60 menit)','Sedasi atas permintaan dengan anestesi spinal','Anestesi IV lebih dari 1 jam','Sedasi gigi kurang dari 1 jam','Sedasi gigi setelah 1 jam (per tambahan 30 menit)','Anestesi intubasi atau masker (termasuk bahan standar / sebagian bahan)','Anestesi intubasi atau masker setelah 2 jam (per tambahan 30 menit)','Anestesi intubasi atau masker setelah 4 jam (per tambahan 30 menit)'],
th:['ระงับความรู้สึกทางเดินอาหารส่วนบน','ระงับความรู้สึกทางเดินอาหารส่วนล่าง','ระงับความรู้สึกทางเดินอาหารส่วนบนและล่าง','ระงับความรู้สึก EUS ทางเดินอาหารส่วนบน','ระงับความรู้สึกส่องกล้องกระเพาะ + EUS','ระงับความรู้สึก EUS + ตัดชิ้นเนื้อ','ระงับความรู้สึกส่องกล้องลำไส้ใหญ่ + EUS','ระงับความรู้สึกส่องกล้องลำไส้เล็กทางด้านบน','ระงับความรู้สึกส่องกล้องลำไส้เล็กทางด้านล่าง','ระงับความรู้สึก ESD','ระงับความรู้สึก ERCP (ทางหลอดเลือด 30 นาที)','ระงับความรู้สึกทางเดินอาหารส่วนบนความเสี่ยงสูง (+ Remimazolam)','ระงับความรู้สึกทางเดินอาหารส่วนล่างความเสี่ยงสูง (+ Remimazolam)','ระงับความรู้สึกทางเดินอาหารส่วนบนและล่างความเสี่ยงสูง (+ Remimazolam)','ระงับความรู้สึกนำทางด้วย EEG (Remimazolam + BIS ภายใน 60 นาที)','ระงับความรู้สึกนำทางด้วย EEG (เพิ่มเมื่อเกิน 60 นาที)','ระงับความรู้สึกตรวจภาพความเสี่ยงสูง (ภายใน 60 นาที)','ค่าระงับความรู้สึกแบบหลับร่วมกับยาชาทางไขสันหลังตามคำขอ','ระงับความรู้สึกทางหลอดเลือดเกิน 1 ชั่วโมง','ระงับความรู้สึกแบบหลับทางทันตกรรมต่ำกว่า 1 ชั่วโมง','ระงับความรู้สึกแบบหลับทางทันตกรรมเกิน 1 ชั่วโมง (เพิ่มทุก 30 นาที)','ดมยาสลบด้วยท่อหรือหน้ากาก (รวมวัสดุมาตรฐาน / บางส่วน)','ดมยาสลบด้วยท่อหรือหน้ากากเกิน 2 ชั่วโมง (เพิ่มทุก 30 นาที)','ดมยาสลบด้วยท่อหรือหน้ากากเกิน 4 ชั่วโมง (เพิ่มทุก 30 นาที)'],
vi:['Gây mê tiêu hóa trên','Gây mê tiêu hóa dưới','Gây mê tiêu hóa trên + dưới','Gây mê EUS tiêu hóa trên','Gây mê nội soi dạ dày + EUS','Gây mê EUS + sinh thiết','Gây mê nội soi đại tràng + EUS','Gây mê nội soi ruột non đường trên','Gây mê nội soi ruột non đường dưới','Gây mê ESD','Gây mê ERCP (đường tĩnh mạch, 30 phút)','Gây mê tiêu hóa trên nguy cơ cao (+ Remimazolam)','Gây mê tiêu hóa dưới nguy cơ cao (+ Remimazolam)','Gây mê tiêu hóa trên + dưới nguy cơ cao (+ Remimazolam)','An thần hướng dẫn EEG (Remimazolam + BIS; trong 60 phút)','An thần hướng dẫn EEG (phụ thu quá 60 phút)','Gây mê chẩn đoán hình ảnh nguy cơ cao (trong 60 phút)','Phí an thần theo yêu cầu kèm gây tê tủy sống','Gây mê tĩnh mạch trên 1 giờ','An thần nha khoa dưới 1 giờ','An thần nha khoa quá 1 giờ (mỗi 30 phút thêm)','Gây mê qua ống nội khí quản hoặc mặt nạ (gồm vật tư tiêu chuẩn / một phần)','Gây mê qua ống hoặc mặt nạ quá 2 giờ (mỗi 30 phút thêm)','Gây mê qua ống hoặc mặt nạ quá 4 giờ (mỗi 30 phút thêm)'],
fil:['Anesthesia sa itaas na GI','Anesthesia sa ibabang GI','Anesthesia sa itaas + ibabang GI','Anesthesia para sa EUS ng itaas na GI','Anesthesia para sa gastroscopy + EUS','Anesthesia para sa EUS + biopsy','Anesthesia para sa colonoscopy + EUS','Anesthesia para sa upper enteroscopy','Anesthesia para sa lower enteroscopy','Anesthesia para sa ESD','Anesthesia para sa ERCP (IV, 30 minuto)','Anesthesia sa itaas na GI na mataas ang panganib (+ Remimazolam)','Anesthesia sa ibabang GI na mataas ang panganib (+ Remimazolam)','Anesthesia sa itaas + ibabang GI na mataas ang panganib (+ Remimazolam)','Sedation na ginagabayan ng EEG (Remimazolam + BIS; hanggang 60 minuto)','Sedation na ginagabayan ng EEG (dagdag lampas 60 minuto)','Anesthesia sa imaging na mataas ang panganib (hanggang 60 minuto)','Bayad sa sedation na hiniling kasama ng spinal anesthesia','IV anesthesia nang lampas 1 oras','Dental sedation nang mas maikli sa 1 oras','Dental sedation lampas 1 oras (bawat dagdag na 30 minuto)','Intubation o mask anesthesia (kasama ang pamantayan / ilang supply)','Intubation o mask anesthesia lampas 2 oras (bawat dagdag na 30 minuto)','Intubation o mask anesthesia lampas 4 oras (bawat dagdag na 30 minuto)']};
for(const code of ['id','th','vi','fil'])CATALOG_NAMES[code]=[...CATALOG_NAMES[code],...CATALOG_NAMES.en.slice(28,37),...CATALOG_EXTRA[code]];

const CATALOG_NO_PRICES={
'zh-Hant':'這是麻醉自費項目的討論清單，不代表訂購、同意施作或已給藥；適用性與實際照護請由團隊說明。',
en:'This is a discussion list for self-pay anesthesia items, not an order, consent or record of administration. Ask your team about suitability and actual care.',
id:'Ini daftar diskusi item anestesi biaya pribadi, bukan pesanan, persetujuan atau catatan pemberian obat. Tanyakan kesesuaian dan perawatan kepada tim.',
th:'เป็นรายการปรึกษาเรื่องการระงับความรู้สึกที่จ่ายเอง ไม่ใช่คำสั่งซื้อ ความยินยอมหรือบันทึกการให้ยา โปรดถามทีมเรื่องความเหมาะสมและการดูแลจริง',
vi:'Đây là danh sách trao đổi dịch vụ gây mê tự chi trả, không phải đơn đặt hàng, đồng ý hay hồ sơ dùng thuốc. Hãy hỏi nhóm về tính phù hợp và chăm sóc thực tế.',
fil:'Listahan ito para pag-usapan ang self-pay anesthesia, hindi order, pahintulot o rekord ng gamot. Tanungin ang team tungkol sa kaangkupan at aktuwal na pag-aalaga.'};
for(const [code,reference] of Object.entries(CATALOG_NO_PRICES)){CATALOG_UI[code].reference=reference;CATALOG_UI[code].overlap='';}
