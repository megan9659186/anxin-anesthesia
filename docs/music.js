'use strict';
// 背景音樂：用 Web Audio 即時合成的音樂盒搖籃曲（原創旋律，不需要音檔）。
// 瀏覽器規定要使用者先點一下畫面才能出聲，所以第一次點擊時才開始播放；開關狀態記在 localStorage。
(()=>{
 const LABELS={'zh-Hant':['背景音樂','開啟背景音樂','關閉背景音樂','開','關'],en:['Music','Turn music on','Turn music off','On','Off'],id:['Musik','Nyalakan musik','Matikan musik','Nyala','Mati'],th:['เพลง','เปิดเพลง','ปิดเพลง','เปิด','ปิด'],vi:['Nhạc','Bật nhạc','Tắt nhạc','Bật','Tắt'],fil:['Musika','Buksan ang musika','Patayin ang musika','On','Off']};
 const BPM=92, BEAT=60/BPM, VOLUME=.07;
 // 旋律（MIDI 音高, 拍數）— 3/4 拍，16 小節
 const MELODY=[[76,2],[79,1],[84,2],[79,1],[81,1],[79,1],[76,1],[79,3],
  [77,2],[81,1],[86,2],[81,1],[79,1],[77,1],[74,1],[76,3],
  [76,2],[79,1],[84,2],[83,1],[81,1],[84,1],[81,1],[79,3],
  [77,1],[81,1],[79,1],[76,1],[74,1],[76,1],[74,2],[67,1],[72,3]];
 // 每小節的和弦（根音, 三音, 五音）
 const C=[48,64,67],F=[53,65,69],G=[43,62,67],Am=[45,64,69],Dm=[50,65,69];
 const CHORDS=[C,C,F,C,F,Dm,G,C,C,Am,F,C,F,C,G,C];
 const BAR=3*BEAT, LOOP=CHORDS.length*BAR;
 let ac=null,master=null,echo=null,timer=null,loopStart=0,scheduledLoops=0,playing=false;
 let wanted=true;try{wanted=localStorage.getItem('anxin-music')!=='off'}catch{}
 const hz=m=>440*Math.pow(2,(m-69)/12);
 function setup(){
  try{if(navigator.audioSession)navigator.audioSession.type='playback'}catch{}
  ac=new (window.AudioContext||window.webkitAudioContext)();
  master=ac.createGain();master.gain.value=0;master.connect(ac.destination);
  // 柔和的回音，讓音色像在小房間裡的音樂盒
  echo=ac.createDelay();echo.delayTime.value=BEAT*.75;const fb=ac.createGain();fb.gain.value=.28;const lp=ac.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2200;
  echo.connect(lp);lp.connect(fb);fb.connect(echo);const wet=ac.createGain();wet.gain.value=.35;lp.connect(wet);wet.connect(master);
 }
 function bell(midi,time,length,level){
  const f=hz(midi),out=ac.createGain();out.gain.setValueAtTime(0,time);out.gain.linearRampToValueAtTime(level,time+.012);out.gain.exponentialRampToValueAtTime(level*.35,time+.25);out.gain.exponentialRampToValueAtTime(.0001,time+Math.max(.6,length*1.6));
  out.connect(master);out.connect(echo);
  [[1,'sine',1],[2,'sine',.18],[3,'triangle',.06]].forEach(([mult,type,amp])=>{const o=ac.createOscillator(),g=ac.createGain();o.type=type;o.frequency.value=f*mult;g.gain.value=amp;o.connect(g);g.connect(out);o.start(time);o.stop(time+Math.max(.7,length*1.7))});
 }
 function scheduleLoop(start){
  let t=start;MELODY.forEach(([m,beats])=>{bell(m,t,beats*BEAT,.5);t+=beats*BEAT});
  CHORDS.forEach(([root,third,fifth],bar)=>{const s=start+bar*BAR;bell(root,s,BEAT*2,.32);bell(third,s+BEAT,BEAT*.8,.12);bell(fifth,s+BEAT,BEAT*.8,.1);bell(third,s+2*BEAT,BEAT*.8,.12);bell(fifth,s+2*BEAT,BEAT*.8,.1)});
 }
 function tick(){while(loopStart+scheduledLoops*LOOP<ac.currentTime+1.5){scheduleLoop(loopStart+scheduledLoops*LOOP);scheduledLoops++}}
 function start(){
  if(!ac)setup();ac.resume();if(playing)return;playing=true;
  loopStart=ac.currentTime+.15;scheduledLoops=0;tick();timer=setInterval(tick,400);
  master.gain.cancelScheduledValues(ac.currentTime);master.gain.setValueAtTime(master.gain.value,ac.currentTime);master.gain.linearRampToValueAtTime(VOLUME,ac.currentTime+1.5);
 }
 function stop(){
  if(!ac||!playing)return;playing=false;clearInterval(timer);
  master.gain.cancelScheduledValues(ac.currentTime);master.gain.setValueAtTime(master.gain.value,ac.currentTime);master.gain.linearRampToValueAtTime(0,ac.currentTime+.4);
  setTimeout(()=>{if(!playing)ac.suspend()},500);
 }
 // 開關按鈕：放在頁面右上角字體大小旁，以及每一站視窗的字體大小旁，全部同步
 const buttons=[];
 function makeButton(){const button=document.createElement('button');button.type='button';button.className='music-toggle';button.onclick=e=>{e.stopPropagation();wanted=!wanted;try{localStorage.setItem('anxin-music',wanted?'on':'off')}catch{}label();wanted?start():stop()};buttons.push(button);return button;}
 function label(){const l=LABELS[document.documentElement.lang]||LABELS['zh-Hant'];buttons.forEach(button=>{button.innerHTML=`<span aria-hidden="true">${wanted?'🎵':'🔇'}</span><span class="music-name">${l[0]}</span><span class="music-state" aria-hidden="true">${wanted?l[3]:l[4]}</span>`;button.setAttribute('aria-pressed',String(wanted));button.setAttribute('aria-label',l[wanted?2:1]);button.title=l[wanted?2:1];button.classList.toggle('is-off',!wanted)});}
 document.querySelectorAll('.font-controls').forEach(controls=>controls.append(makeButton()));
 if(!buttons.length)document.body.append(makeButton());
 label();
 new MutationObserver(label).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 // 選擇語言時，背景音樂預設開啟（之後使用者可以自己關掉）
 let languagePicked=false;
 document.addEventListener('click',e=>{if(languagePicked||!e.target.closest('#language-dialog [data-lang]'))return;languagePicked=true;wanted=true;try{localStorage.setItem('anxin-music','on')}catch{}label();start()},true);
 // 第一次點擊畫面（例如選語言）時開始播放
 const first=()=>{document.removeEventListener('pointerdown',first,true);document.removeEventListener('keydown',first,true);if(wanted)start()};
 document.addEventListener('pointerdown',first,true);document.addEventListener('keydown',first,true);
 // 切到別的分頁時暫停，回來再繼續
 document.addEventListener('visibilitychange',()=>{if(!ac)return;if(document.hidden){if(playing)ac.suspend()}else if(playing)ac.resume()});
})();
