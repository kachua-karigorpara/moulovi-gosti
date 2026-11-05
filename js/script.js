/* ===== তথ্য (এখানে নাম বদলালেই ওয়েবসাইট বদলে যাবে) ===== */
const father = {name:'মোহাম্মদ ময়েন উদ্দীন প্রামাণিক', img:'father.jpg'};
const mother = {name:'আমেনা বেগম', img:'mother.jpg'};
const sons = [
 {name:'মোহাম্মদ মোসলেম উদ্দিন', kids:['মোস্তফা আলী','হানিফ আলী']},
 {name:'মসজিদের ইমাম মোহাম্মদ মোজাহার আলী', kids:['প্রভাষক ও মসজিদের ইমাম মজনুল হক','মালেক আলী','ফুরকান আলী']},
 {name:'মোহাম্মদ মোয়াজ্জেম আলী', kids:['সোলেমান আলী','নুরুল আলী','হাফেজ আরাফাত আলী']},
 {name:'মোহাম্মদ মজিবর রহমান', kids:[]},
 {name:'মোহাম্মদ মফিজ্জল আলী', kids:['আব্দুল খালেক আলী']},
 {name:'মোহাম্মদ মখলেছুর রহমান', kids:['আমিনুল হক পলাশ','আরিফুল ইসলাম']}
];
const ord = ['১ম','২য়','৩য়','৪র্থ','৫ম','৬ষ্ঠ'];
const bn = n => String(n).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
const IMG = 'images/', FALL = 'images/default.svg';
const $ = id => document.getElementById(id);
const pic = (f,alt) => `<img src="${IMG+f}" alt="${alt}" loading="lazy" onerror="this.onerror=null;this.src='${FALL}'">`;
const totalKids = sons.reduce((a,s)=>a+s.kids.length,0);

/* ===== হিরো স্লাইডার ===== */
const slides = [{role:'বাবা', name:father.name, img:father.img,
  text:`মা: ${mother.name}। ${bn(sons.length)} ছেলে ও ${bn(totalKids)} নাতি নিয়ে আমাদের মৌলভী গোষ্ঠী।`, list:sons.map(s=>s.name)}]
 .concat(sons.map((s,i)=>({role:ord[i]+' ছেলে', name:s.name, img:`son${i+1}.jpg`, no:i+1,
  text:`বাবা: ${father.name}। ${s.kids.length?`এঁর ${bn(s.kids.length)} ছেলে:`:''}`, list:s.kids})));
$('slides').innerHTML = slides.map(s=>`<div class="slide"><div>
 <span class="role">${s.role}</span><h1>${s.name}</h1><p>${s.text}</p><ul>${s.list.map(l=>`<li>${l}</li>`).join('')}</ul></div>
 <div class="pwrap">${s.no?`<span class="no">${bn(s.no)}</span>`:''}<div class="portrait">${pic(s.img,s.name)}</div></div></div>`).join('');
$('dots').innerHTML = slides.map((_,i)=>`<button aria-label="স্লাইড ${bn(i+1)}"></button>`).join('');
let cur=0, timer;
function fit(){const s=$('slides').children[cur];if(s)$('slides').style.height=s.offsetHeight+'px';}
addEventListener('resize',fit);addEventListener('load',fit);
function go(i){cur=(i+slides.length)%slides.length;$('slides').style.transform=`translateX(-${cur*100}%)`;
 [...$('dots').children].forEach((d,k)=>d.classList.toggle('on',k===cur));
 fit();
 $('cnt').textContent=`${bn(cur+1)} / ${bn(slides.length)}`;}
function auto(){clearInterval(timer);timer=setInterval(()=>go(cur+1),5500);}
$('prev').onclick=()=>{go(cur-1);auto()};$('next').onclick=()=>{go(cur+1);auto()};
[...$('dots').children].forEach((d,i)=>d.onclick=()=>{go(i);auto()});
$('hero').onmouseenter=()=>clearInterval(timer);$('hero').onmouseleave=auto;
let tx=0,ty=0;
$('hero').addEventListener('touchstart',e=>{tx=e.touches[0].clientX;ty=e.touches[0].clientY;clearInterval(timer)},{passive:true});
$('hero').addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;
 if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))go(cur+(dx<0?1:-1));auto();},{passive:true});
go(0);auto();

/* ===== বংশ তালিকা ===== */
$('stats').innerHTML=`<span>ছেলে: ${bn(sons.length)} জন</span><span>নাতি: ${bn(totalKids)} জন</span><span>মোট সদস্য: ${bn(2+sons.length+totalKids)} জন</span>`;
$('root').innerHTML=[[father,'বাবা'],[mother,'মা']].map(([p,r])=>`<div class="pcard big">${pic(p.img,p.name)}<h4>${p.name}</h4><small>${r}</small></div>`).join('');
$('branches').innerHTML=sons.map((s,i)=>`<article class="branch"><div class="pcard"><span class="no">${bn(i+1)}</span>${pic(`son${i+1}.jpg`,s.name)}<h4>${s.name}</h4><small>${ord[i]} ছেলে</small></div>
 ${s.kids.length?`<div class="kids">${s.kids.map((k,j)=>`<div class="pcard">${pic(`gson-${i+1}-${j+1}.jpg`,k)}<h4>${k}</h4><small>নাতি</small></div>`).join('')}</div>`:''}</article>`).join('');

/* ===== তারিখ ও সময় ===== */
// [নাম, ইংরেজি মাস, শুরুর তারিখ] – বাংলাদেশ সংশোধিত পঞ্জিকা
const bnMonths=[['বৈশাখ',4,14],['জ্যৈষ্ঠ',5,15],['আষাঢ়',6,15],['শ্রাবণ',7,16],['ভাদ্র',8,16],['আশ্বিন',9,16],['কার্তিক',10,16],['অগ্রহায়ণ',11,15],['পৌষ',12,15],['মাঘ',1,14],['ফাল্গুন',2,13],['চৈত্র',3,15]];
const bnDays=['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
const season=['গ্রীষ্ম','গ্রীষ্ম','বর্ষা','বর্ষা','শরৎ','শরৎ','হেমন্ত','হেমন্ত','শীত','শীত','বসন্ত','বসন্ত'];
const HIJRI_ADJUST = 0; // বাংলাদেশে চাঁদ দেখা অনুযায়ী প্রয়োজনে -1 বা +1 দিন দিন
function tick(){
 const now=new Date();
 const p=Object.fromEntries(new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Dhaka',hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric'}).formatToParts(now).map(x=>[x.type,x.value]));
 const Y=+p.year,M=+p.month,D=+p.day,h=+p.hour,m=+p.minute,s=+p.second;
 const day=Date.UTC(Y,M-1,D), wd=new Date(day).getUTCDay();
 const before=(M<4||(M===4&&D<14)), sy=before?Y-1:Y;
 let idx=0,start=0;
 bnMonths.forEach((b,i)=>{const t=Date.UTC(b[1]<4?sy+1:sy,b[1]-1,b[2]); if(t<=day){idx=i;start=t}});
 const bY=before?Y-594:Y-593, bD=Math.round((day-start)/864e5)+1;
 $('d-bn').textContent=`${bn(bD)} ${bnMonths[idx][0]} ${bn(bY)}`;
 $('d-bn2').textContent=`${bnDays[wd]} • ${season[idx]}কাল`;
 const hd=new Date(day+HIJRI_ADJUST*864e5+432e5);
 const f=(loc,o)=>new Intl.DateTimeFormat(loc,{timeZone:'UTC',...o}).format(hd);
 $('d-ar').textContent=f('bn-BD-u-ca-islamic-umalqura-nu-beng',{day:'numeric',month:'long',year:'numeric'});
 $('d-ar2').textContent=f('ar-SA-u-ca-islamic-umalqura-nu-arab',{day:'numeric',month:'long',year:'numeric'});
 $('d-en').textContent=f('bn-BD',{day:'numeric',month:'long',year:'numeric'});
 $('d-en2').textContent=f('bn-BD',{weekday:'long'});
 const per=h<5?'রাত':h<12?'সকাল':h<15?'দুপুর':h<18?'বিকেল':h<20?'সন্ধ্যা':'রাত';
 const z=n=>String(n).padStart(2,'0');
 $('dt').textContent=per+' '+bn(`${z(h%12||12)}:${z(m)}:${z(s)}`);
 document.querySelectorAll('#nums span').forEach((e,i)=>e.classList.toggle('now',i+1===(h%12||12)));
 $('hh').style.transform=`rotate(${(h%12)*30+m/2}deg)`;
 $('mm').style.transform=`rotate(${m*6+s/10}deg)`;
 $('ss').style.transform=`rotate(${s*6}deg)`;
}
tick();setInterval(tick,1000);

/* ঘড়ির বাংলা সংখ্যা */
$('nums').innerHTML=Array.from({length:12},(_,i)=>`<span style="--a:${(i+1)*30}deg"><b>${bn(i+1)}</b></span>`).join('');

$('ticks').innerHTML=Array.from({length:60},(_,i)=>`<span class="${i%5?'':'big'}" style="--a:${i*6}deg"></span>`).join('');

/* ছবিতে ক্লিক করলে বড় করে দেখানো */
const lb=$('lb');
document.addEventListener('click',e=>{
 const im=e.target.closest('.portrait img,.pcard img');
 if(im){$('lbi').src=im.src;$('lbi').alt=im.alt;$('lbc').textContent=im.alt;lb.hidden=false;document.body.style.overflow='hidden';$('lbx').focus();}
 else if(e.target===lb||e.target.id==='lbx')closeLb();
});
function closeLb(){lb.hidden=true;document.body.style.overflow='';}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLb()});

/* মোবাইল মেনু */
const mb=$('menuBtn'),mn=$('menu');
function menu(o){mn.classList.toggle('open',o);mb.classList.toggle('x',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'মেনু বন্ধ করুন':'মেনু খুলুন');}
mb.onclick=()=>menu(!mn.classList.contains('open'));
mn.addEventListener('click',e=>{if(e.target.tagName==='A')menu(false)});
addEventListener('keydown',e=>{if(e.key==='Escape')menu(false)});
