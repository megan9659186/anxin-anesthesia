'use strict';
// 自費討論清單：每一項加上「可能的好處」，並標出和病人勾選的擔心有關的項目。
// 用詞保守：只說「可能有助於」，是否適合仍由麻醉團隊評估。
// [好處（中文）, 好處（英文）, 相關的擔心 CONDITION_IDS]
const ITEM_BENEFITS={
'01':['讓呼吸道保持穩定通暢，麻醉中換氣更順，減少喉嚨不適與呼吸方面的風險。','Keeps the airway steady and open, helping breathing during anesthesia and reducing throat discomfort and breathing risks.',['airway','breathing']],
'02':['提供溫暖、濕潤的高流量氧氣，幫助維持血氧，呼吸比較輕鬆。','Gives warm, humidified high-flow oxygen to help keep oxygen levels up and make breathing easier.',['breathing','airway']],
'03':['依腦波調整麻醉深度，避免太深或太淺；醒來可能較快、較清醒，也讓擔心手術中有知覺的人比較安心。','Adjusts anesthesia depth by brain waves to avoid too deep or too light; waking may be quicker and clearer, easing worries about awareness.',['awareness']],
'04':['手術中持續保暖，減少低體溫，醒來時比較不會冷得發抖。','Keeps you warm during surgery, lowering the chance of feeling cold and shivering when you wake.',['cold']],
'05':['即時看見腦部的含氧狀況，團隊能更早發現變化並調整。','Shows brain oxygen in real time so the team can notice and respond to changes earlier.',[]],
'06':['較快掌握凝血狀況，幫助團隊判斷止血與輸血。','Gives a faster picture of blood clotting to guide bleeding control and transfusion.',['bleeding']],
'07':['較快掌握凝血狀況，幫助團隊判斷止血與輸血。','Gives a faster picture of blood clotting to guide bleeding control and transfusion.',['bleeding']],
'08':['客觀評估身體對疼痛的反應，止痛藥用得剛剛好，醒來可能比較不痛，也較少因止痛藥過多而想吐或昏沉。','Measures your body’s response to pain so pain medicine is dosed just right; waking may hurt less, with less nausea or grogginess from extra medicine.',['pain','nausea']],
'09':['連續聽呼吸聲音，鎮靜時更早發現呼吸變化，比較安全。','Listens to breathing continuously so changes during sedation are caught earlier.',['breathing']],
'10':['依腦波調整鎮靜深度，睡得安穩、醒得較快，也可能減少呼吸被抑制的機會。','Uses brain waves to fine-tune sedation: steady sleep, quicker waking, and possibly less breathing suppression.',['awareness','breathing']],
'11':['依腦波調整鎮靜深度，睡得安穩、醒得較快，也可能減少呼吸被抑制的機會。','Uses brain waves to fine-tune sedation: steady sleep, quicker waking, and possibly less breathing suppression.',['awareness','breathing']],
'12':['手術後讓肌肉放鬆藥更快、更完整地退掉，醒來呼吸較有力，減少全身無力的感覺。','Reverses muscle relaxants faster and more completely, so breathing is stronger and you feel less weak when you wake.',['breathing']],
'13':['讓肌肉放鬆藥更快、更完整地退掉，醒來呼吸較有力，減少全身無力的感覺。','Reverses muscle relaxants faster and more completely, so breathing is stronger and you feel less weak when you wake.',['breathing']],
C01:['減少頭部長時間受壓，降低壓傷與醒來後的不舒服。','Reduces pressure on the head during long surgery, lowering pressure injury and discomfort.',[]],
C02:['依你的呼吸道狀況選用較合適的管子，可能減少喉嚨的不適。','A tube chosen to fit your airway may cause less throat discomfort.',['airway']],
C03:['保護長時間受壓的皮膚，減少壓傷或破皮。','Protects skin under long pressure, reducing pressure sores and skin breaks.',[]],
C04:['保護長時間受壓的皮膚，減少壓傷或破皮。','Protects skin under long pressure, reducing pressure sores and skin breaks.',[]],
C05:['把輸液、輸血加溫後再給，幫助維持體溫，減少發抖。','Warms IV fluids and blood before they go in, helping keep you warm and reducing shivering.',['cold']],
C06:['保護眼睛與受壓的皮膚，減少乾眼與壓傷。','Protects the eyes and pressured skin, reducing dryness and pressure injury.',[]],
C07:['鎮靜或恢復時持續給氧，呼吸比較安心。','Gives steady oxygen during sedation or recovery for easier breathing.',['breathing']],
C08:['薄薄的人工皮保護受壓處皮膚，減少壓傷。','A thin protective dressing shields pressured skin from injury.',[]],
OB01:['減輕分娩時的疼痛，讓產程比較能放鬆、保留體力。','Eases labor pain so you can relax more and save energy.',['pain']],
OB02:['減輕分娩時的疼痛，讓產程比較能放鬆、保留體力。','Eases labor pain so you can relax more and save energy.',['pain']],
PA01:['痛的時候可以自己按壓給藥，及時止痛，不必等待。','Lets you press a button for pain medicine when you need it, without waiting.',['pain']],
PA02:['持續減輕手術後疼痛，比較敢深呼吸、咳嗽和下床活動。','Steadily eases pain after surgery so deep breathing, coughing and walking feel easier.',['pain']],
PA03:['延長止痛的天數，讓恢復期間持續比較不痛。','Extends pain control so recovery stays more comfortable.',['pain']],
PA04:['腰椎麻醉時加入長效止痛藥，手術後較長時間比較不痛。','Adds long-acting pain medicine to spinal anesthesia for longer comfort after surgery.',['pain']],
PA05:['針對手術部位止痛，可減少嗎啡類止痛藥的用量，因此也可能比較少噁心、嘔吐和頭暈。','Numbs the surgical area so less morphine-type medicine is needed, which may also mean less nausea, vomiting and dizziness.',['pain','limb','nausea']],
DR01:['非嗎啡類的止痛藥，減輕手術後疼痛，並可減少嗎啡類用量，降低噁心、嘔吐的機會。','A non-morphine pain medicine that eases pain and reduces morphine-type use, lowering the chance of nausea and vomiting.',['pain','nausea']],
DR02:['靜脈止痛藥，搭配其他止痛方法，可減少嗎啡類用量，醒來比較舒服。','An IV pain reliever that, combined with others, reduces morphine-type use for a more comfortable recovery.',['pain','nausea']],
DR03:['幫助放鬆、平穩地醒來，可能減少醒來時的躁動與不安。','Helps you relax and wake smoothly, possibly with less restlessness or agitation.',['awareness']],
DR04:['作用快、退得也快的止痛藥，手術中止痛穩定，結束後醒得較快。','A fast-on, fast-off pain medicine: steady pain control during surgery and quicker waking afterward.',['pain']],
DR05:['預防或減輕手術後噁心、嘔吐，降低發生的機會，醒來比較舒服。','Helps prevent or lessen nausea and vomiting after surgery, lowering how often it happens.',['nausea']],
DR06:['長效止痛藥，手術後幾天內都比較不痛。','A long-acting pain medicine that keeps pain lower for several days after surgery.',['pain']],
DR07:['幫助血液凝固、減少出血。','Helps blood clot and reduces bleeding.',['bleeding']],
DR08:['補充凝血需要的成分，幫助止血。','Replaces a clotting factor to help stop bleeding.',['bleeding']],
DR09:['作用與消退都快的鎮靜藥，睡得安穩，醒得較快、較清楚。','A sedative that works and wears off quickly: steady sleep and a quicker, clearer wake-up.',['awareness']]};
const GI_BENEFIT=['檢查時在睡夢中完成，不痛也不害怕，醒來比較舒服。','You sleep through the procedure without pain or fear and wake more comfortably.',['awareness']];
const AN_BENEFIT=['讓你在手術或治療中舒服地睡著，減少緊張與不適。','Lets you sleep comfortably through the procedure, easing anxiety and discomfort.',['awareness']];
const BENEFIT_TEXT={'zh-Hant':['可能的好處','和你的擔心有關','這些自費項目可以怎麼幫你：依你的手術方式和你勾選的擔心（例如容易噁心嘔吐、怕痛、怕冷），部分項目可能有助於降低不舒服發生的機會、減輕程度，讓手術醒來更舒適。和你的擔心有關的項目會用 💗 標出。實際是否適合，仍由麻醉團隊依你的狀況評估。'],
en:['Possible benefits','Related to your concerns','How these self-pay items may help: depending on your surgery and the concerns you ticked (such as nausea, pain or feeling cold), some items may lower the chance or severity of discomfort and help you wake up more comfortably. Items related to your concerns are marked with 💗. The anesthesia team will decide what suits you.']};
const benefitText=()=>BENEFIT_TEXT[language]||BENEFIT_TEXT.en;
function itemBenefit(item){const code=item.code;if(ITEM_BENEFITS[code])return ITEM_BENEFITS[code];if(/^GI1[5-7]$/.test(code))return ITEM_BENEFITS['10'];if(code.startsWith('GI'))return GI_BENEFIT;if(code.startsWith('AN'))return AN_BENEFIT;return null;}
function patientConcerns(){return new Set([...careState.conditions,...(typeof careInherited==='function'?careInherited(patient):[])]);}
function concernLabel(id){return careText().conditionLabels[CONDITION_IDS.indexOf(id)]||'';}
function fillBenefit(card,item){const b=itemBenefit(item);let box=card.querySelector('.catalog-benefit');if(!b){box?.remove();return}if(!box){box=document.createElement('span');box.className='catalog-benefit';card.querySelector('.catalog-card-copy').append(box)}const t=benefitText(),zh=language==='zh-Hant',concerns=patientConcerns(),hits=b[2].filter(c=>concerns.has(c));box.innerHTML=`<b>${esc(t[0])}：</b>${esc(zh?b[0]:b[1])}${hits.length?`<em class="catalog-benefit-match">💗 ${esc(t[1])}：${hits.map(c=>esc(concernLabel(c))).join('、')}</em>`:''}`;card.classList.toggle('matches-concern',!!hits.length);}
function updateBenefitMatches(){document.querySelectorAll('.catalog-card[data-catalog-code]').forEach(card=>{const item=catalogItem(card.dataset.catalogCode);if(item)fillBenefit(card,item)});}
{const baseCard=catalogCard;catalogCard=function(item,onChange){const card=baseCard(item,onChange);fillBenefit(card,item);return card};}
{const baseRender=renderCatalog;renderCatalog=function(root,options={}){const section=baseRender(root,options);if(!options.room){const p=document.createElement('p');p.className='catalog-benefit-intro';p.textContent=benefitText()[2];(section.querySelector('.hint')||section.firstChild).after(p)}return section};}
{const baseChoices=renderCareChoices;renderCareChoices=function(){baseChoices();updateBenefitMatches()};}
