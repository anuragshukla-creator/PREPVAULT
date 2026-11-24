const K='prepvault_demo_v1';
const pad=n=>String(n).padStart(2,'0');
const iso=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate());
const dd=n=>{const d=new Date();d.setDate(d.getDate()+n);return iso(d)};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const val=id=>{const e=document.getElementById(id);return e?e.value.trim():''};
const seed=()=>({next:2,vaults:[{id:1,name:'JEE Prep',desc:'Cracking JEE Main & Advanced',tasks:[{t:'Finish kinematics notes',d:dd(2),x:0},{t:'Solve 30 organic problems',d:dd(5),x:0},{t:'Mock test 1',d:dd(-1),x:1}],habits:[{n:'Study 2 hours',w:[1,1,0,1,0,0,0]},{n:'Revise flashcards',w:[1,0,1,1,1,0,0]}],notes:[{t:'Remember: v = u + at'}],cards:[{q:'SI unit of force?',a:'Newton (N)'},{q:'Speed of light?',a:'≈ 3 × 10⁸ m/s'}],links:[{t:'Khan Academy',u:'https://www.khanacademy.org'}],files:[],rem:[],chart:'Math:80,Physics:65,Chem:72',ses:0}]});
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}if(!S||!S.vaults)S=seed();
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
let view='home',vid=null,tab='dash',qi=0,ci=0,flip=0,qv=null,ce='',tm={m:25,left:1500,iv:null},qiv=null;
const V=()=>S.vaults.find(v=>v.id===vid);
const toast=m=>{const t=document.getElementById('toast');t.textContent=m;t.style.display='block';clearTimeout(toast.h);toast.h=setTimeout(()=>t.style.display='none',3000)};
const go=t=>{if(t)tab=t;render()};
const Q=[['Nelson Mandela','NM','It always seems impossible until it’s done.','#0b2a6f'],['Marie Curie','MC','Nothing in life is to be feared, it is only to be understood.','#410000'],['Albert Einstein','AE','Learning is not the product of schooling but the lifelong attempt to acquire it.','#13389b']];
const pf=(i,c)=>`<svg width="76" height="76" viewBox="0 0 76 76" style="flex:none"><circle cx="38" cy="38" r="36" fill="${c}" stroke="#2f55d4" stroke-width="2"/><circle cx="38" cy="30" r="12" fill="#ececf1" opacity=".85"/><path d="M14 66c4-16 12-20 24-20s20 4 24 20z" fill="#ececf1" opacity=".85"/><text x="38" y="72" font-size="9" text-anchor="middle" fill="#fff">${i}</text></svg>`;
function render(){clearInterval(qiv);const a=document.getElementById('app');a.innerHTML=view==='home'?home():view==='vaults'?vaults():vault();
if(view==='vault'&&tab==='ana')uf();
if(view==='home')qiv=setInterval(()=>{qi=(qi+1)%Q.length;const s=document.getElementById('sl'),d=document.getElementById('dt');if(s)s.outerHTML=slideCard();if(d)d.innerHTML=slideDots()},5000)}
const slideCard=()=>{const q=Q[qi];return `<div class="slide" id="sl">${pf(q[1],q[3])}<div><q>${q[2]}</q><small>— ${q[0]}</small></div></div>`},slideDots=()=>Q.map((_,i)=>`<i class="${i===qi?'on':''}" onclick="qi=${i};render()"></i>`).join(''),slide=()=>slideCard()+`<div class="dots" id="dt">${slideDots()}</div>`;
function home(){return `<div class="nav"><div class="logo">PREP<b>VAULT</b></div><button onclick="view='vaults';render()">Get started</button></div>
<div class="hero"><h1>Your personal vault for <span style="color:#6a8cff">learning anything</span></h1><p>One calm, focused space to plan, practice and track progress — for an exam, a skill or a hobby.</p>
<button class="big" onclick="view='vaults';render()">Get started — try the demo</button><p style="font-size:.8rem;margin-top:10px">Demo mode: sign up and login are skipped.</p>${slide()}</div>
<section class="w"><h2>Why PREPVAULT?</h2><div class="grid">
<div class="card"><h3>Purpose</h3>A personal learning environment that brings planning, resources and practice together in one place.</div>
<div class="card"><h3>Goal</h3>Help you stay consistent and reach what you set out to learn, without juggling ten different apps.</div>
<div class="card p"><h3>Separate vaults</h3>Each goal gets its own environment, so exams, skills and hobbies never get mixed up.</div>
<div class="card"><h3>Plan</h3>Tasks, habits, calendar, focus timer and reminders.</div>
<div class="card"><h3>Collect</h3>Links, files and sources organised per vault.</div>
<div class="card p"><h3>Practice and measure</h3>Flashcards, quizzes, notes, calculators and charts.</div></div></section>`}
function vaults(){return `<div class="nav"><div class="logo" style="cursor:pointer" onclick="view='home';render()">PREP<b>VAULT</b></div><span style="color:var(--mu)">Demo user</span></div>
<section class="w"><h2>Your vaults</h2><div class="grid">${S.vaults.map(v=>`<div class="card p"><h3>${esc(v.name)}</h3><p style="color:var(--mu)">${esc(v.desc)||'—'}</p><div class="row"><button onclick="vid=${v.id};tab='dash';view='vault';render()">Enter</button><button class="g" onclick="delV(${v.id})">Delete</button></div></div>`).join('')}
<div class="card" style="display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:2.4rem;min-height:130px" onclick="newV()">+</div></div></section>`}
function newV(){const m=document.createElement('div');m.className='modal';m.id='mod';m.innerHTML=`<div class="card"><h3>Create vault</h3><label>Name (hobby, skill or exam)</label><input id="vn" placeholder="e.g. Drawing, Coding, NEET"><br><br><label>What are you studying for?</label><textarea id="vd" rows="3"></textarea><br><br><div class="row"><button onclick="addV()">Create</button><button class="g" onclick="mod.remove()">Cancel</button></div></div>`;document.body.appendChild(m)}
function addV(){const n=val('vn');if(!n)return toast('Please name your vault');S.vaults.push({id:S.next++,name:n,desc:val('vd'),tasks:[],habits:[],notes:[],cards:[],links:[],files:[],rem:[],chart:'',ses:0});save();document.getElementById('mod').remove();render()}
function delV(id){if(confirm('Delete this vault?')){S.vaults=S.vaults.filter(v=>v.id!==id);save();render();SRC.gc&&SRC.gc()}}
const NAV=[['dash','Dashboard'],['plan','Planning centre'],['src','Sources centre'],['ana','Analytics centre'],['learn','Learning centre'],['set','Settings']];
function vault(){const v=V();return `<div class="app"><aside><div class="logo" style="margin-bottom:6px">PREP<b>VAULT</b></div><div style="color:var(--mu);margin-bottom:10px">${esc(v.name)}</div>${NAV.map(n=>`<button class="${tab===n[0]?'on':''}" onclick="go('${n[0]}')">${n[1]}</button>`+(n[0]==='plan'&&PT.includes(tab)?PS.map(q=>`<button class="${tab===q[0]?'on':''}" style="padding-left:26px;font-size:.9rem" onclick="go('${q[0]}')">↳ ${q[1]}</button>`).join(''):'')).join('')}<button class="r" onclick="view='vaults';render()">← Leave vault</button></aside><main>${({dash,plan,src,ana,learn,set,hj,pt:()=>psub('pt'),pf:()=>psub('pf'),pr:()=>psub('pr'),pc:()=>psub('pc')})[tab]()}</main></div>`}
const soon=a=>'<p>'+a.map(x=>`<span class="chip">${x} · coming soon</span>`).join('')+'</p>';
const pct=v=>v.tasks.length?Math.round(v.tasks.filter(t=>t.x).length/v.tasks.length*100):0;
function dashOld(){const v=V(),t=today=iso(new Date());const up=v.tasks.filter(x=>!x.x).sort((a,b)=>(a.d||'9').localeCompare(b.d||'9')).slice(0,5);
return `<h2>${esc(v.name)} — Dashboard</h2><p style="color:var(--mu)">Studying for: ${esc(v.desc)||'—'}</p><div class="grid">
<div class="card"><h3>Progress</h3><div class="big2">${pct(v)}%</div><div class="bar"><i style="width:${pct(v)}%"></i></div></div>
<div class="card"><h3>Focus sessions</h3><div class="big2">${v.ses}</div></div>
<div class="card"><h3>Habit check-ins</h3><div class="big2">${v.habits.reduce((a,h)=>a+h.w.reduce((x,y)=>x+y,0),0)}</div></div></div><br>
<div class="grid"><div class="card"><h3>Upcoming tasks & deadlines</h3>${up.map(x=>`<div class="t"><span>${esc(x.t)}</span><small style="color:${x.d&&x.d<t?'#e04646':'var(--mu)'}">${x.d||'no date'}</small></div>`).join('')||'<small>All clear 🎉</small>'}</div>
<div class="card"><h3>Habits</h3>${v.habits.map(h=>`<div class="t"><span>${esc(h.n)}</span><small>${h.w.reduce((a,b)=>a+b,0)}/7</small></div>`).join('')||'<small>No habits yet</small>'}</div>
<div class="card"><h3>Shortcuts</h3>${v.links.map(l=>`<div class="t"><a style="color:#6a8cff" target="_blank" rel="noopener" href="${esc(l.u)}">${esc(l.t)}</a></div>`).join('')||'<small>Add links in Sources</small>'}</div></div><br><div class="card"><h3>Calendar</h3>${cal(v)}</div>`}
function cal(v){const n=new Date(),y=n.getFullYear(),m=n.getMonth(),f=new Date(y,m,1).getDay(),L=new Date(y,m+1,0).getDate();let h=`<b>${n.toLocaleString('en',{month:'long'})} ${y}</b><div class="cal" style="margin-top:8px">`+['S','M','T','W','T','F','S'].map(d=>`<div style="background:none;color:var(--mu)">${d}</div>`).join('')+'<span></span>'.repeat(f);
for(let i=1;i<=L;i++){const k=y+'-'+pad(m+1)+'-'+pad(i);h+=`<div class="${i===n.getDate()?'td':''}" title="${esc(v.tasks.filter(t=>t.d===k).map(t=>t.t).join(', '))}">${i}${v.tasks.some(t=>t.d===k&&!t.x)?'<em></em>':''}</div>`}return h+'</div>'}
function planOld(){const v=V(),D=['M','T','W','T','F','S','S'];return `<h2>Planning centre</h2>
<div class="card"><h3>Task manager</h3><div class="row"><input id="tt" placeholder="New task"><input id="td" type="date" style="max-width:150px"><button onclick="addT()">Add</button></div>
${v.tasks.map((t,i)=>`<div class="t"><input type="checkbox" style="width:auto" ${t.x?'checked':''} onchange="tg(${i})"><span class="${t.x?'done':''}">${esc(t.t)}</span><small>${t.d||''}</small><button class="x" onclick="rm('tasks',${i})">✕</button></div>`).join('')}<div class="bar" style="margin-top:10px"><i style="width:${pct(v)}%"></i></div></div><br>
<div class="card"><h3>Habit tracker</h3><div class="row"><input id="hn" placeholder="New habit"><button onclick="addH()">Add</button></div>
${v.habits.map((h,i)=>`<div class="t"><span>${esc(h.n)}</span>${h.w.map((x,j)=>`<button class="hb g ${x?'on':''}" onclick="hb(${i},${j})">${D[j]}</button>`).join('')}<button class="x" onclick="rm('habits',${i})">✕</button></div>`).join('')}</div><br>
<div class="grid"><div class="card"><h3>Focus timer</h3><div class="sw">${[[25,'Focus'],[5,'Short'],[15,'Long']].map(a=>`<button class="${tm.m===a[0]?'':'g'}" onclick="tmode(${a[0]})">${a[1]}</button>`).join('')}</div><div class="big2" id="tm">${fmt(tm.left)}</div><div class="row"><button onclick="tgl()">${tm.iv?'Pause':'Start'}</button><button class="g" onclick="tmode(tm.m)">Reset</button></div></div>
<div class="card"><h3>Reminders</h3><div class="row"><input id="rt" placeholder="Remind me to…"><input id="ra" type="datetime-local" style="max-width:200px"><button onclick="addR()">Add</button></div>${v.rem.map((r,i)=>`<div class="t"><span class="${r.d?'done':''}">${esc(r.t)}</span><small>${esc(r.a.replace('T',' '))}</small><button class="x" onclick="rm('rem',${i})">✕</button></div>`).join('')}</div></div><br><div class="card"><h3>Calendar</h3>${cal(v)}</div>${soon(['Time table','Scheduler'])}`}
const fmt=s=>pad(Math.floor(s/60))+':'+pad(s%60);
function tmode(m){clearInterval(tm.iv);tm={m,left:m*60,iv:null};go()}
function tgl(){if(tm.iv){clearInterval(tm.iv);tm.iv=null}else tm.iv=setInterval(()=>{tm.left--;const e=document.getElementById('tm');if(e)e.textContent=fmt(tm.left);if(tm.left<=0){clearInterval(tm.iv);tm.iv=null;if(tm.m===25){V().ses++;save()}toast('Timer finished!');tm.left=tm.m*60;if(tab==='pf')go()}},1000);go()}
function addT(){const t=val('tt');if(!t)return toast('Enter a task');V().tasks.push({t,d:val('td'),x:0});save();go()}
const tg=i=>{V().tasks[i].x^=1;save();go()},rm=(k,i)=>{V()[k].splice(i,1);save();go()},hb=(i,j)=>{V().habits[i].w[j]^=1;save();go()};
function addH(){const n=val('hn');if(!n)return;V().habits.push({n,w:[0,0,0,0,0,0,0]});save();go()}
function addR(){const t=val('rt'),a=val('ra');if(!t||!a)return toast('Add text and a date/time');V().rem.push({t,a,d:0});save();go()}
/* legacy reminder timer removed: Taskflow's checkRem() now fires all reminders */
function src(){const v=V();return `<h2>Sources centre</h2><div class="grid"><div class="card"><h3>Website slots</h3><div class="row"><input id="lt" placeholder="Title"><input id="lu" placeholder="https://…"><button onclick="addL()">Add</button></div>${v.links.map((l,i)=>`<div class="t"><a style="color:#6a8cff" target="_blank" rel="noopener" href="${esc(l.u)}">${esc(l.t)}</a><span></span><button class="x" onclick="rm('links',${i})">✕</button></div>`).join('')}</div>
<div class="card"><h3>File manager (video, image, pdf, doc, txt)</h3><input type="file" id="fi" multiple onchange="addF(this)">${v.files.map((f,i)=>`<div class="t"><span>${esc(f.n)}</span><small>${esc(f.k)} · ${f.s} KB</small><button class="x" onclick="rm('files',${i})">✕</button></div>`).join('')}<small style="color:var(--mu)">Demo stores file names only.</small></div></div>${soon(['Citations & annotations','Media editor'])}`}
function addL(){let u=val('lu'),t=val('lt');if(!u)return toast('Enter a URL');if(!/^https?:\/\//i.test(u))u='https://'+u;V().links.push({t:t||u,u});save();go()}
function addF(e){[...e.files].forEach(f=>V().files.push({n:f.name,k:(f.type||'file').split('/')[0],s:Math.max(1,Math.round(f.size/1024))}));save();go()}
const UN={Length:{m:1,km:1000,cm:.01,mi:1609.344,ft:.3048,in:.0254},Mass:{kg:1,g:.001,lb:.45359237,oz:.0283495},Temperature:{C:1,F:1,K:1}};
let anm='ov';
const IC=(b)=>`<svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="#6a8cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1" y="1" width="46" height="46" rx="10" stroke="#1d2340" fill="#08080d"/>${b}</svg>`;
const AM=[
['comp','COMP','Computation','Default mode for everyday maths: arithmetic, algebra, trigonometry, logarithms, powers and roots, and basic functions.',IC('<path d="M16 12v12M10 18h12M28 18h12M10 32h12M28 28l12 8M40 28l-12 8"/><circle cx="34" cy="38" r="0"/>')],
['cmplx','CMPLX','Complex numbers','Work with complex and imaginary numbers (i): add, multiply, divide, find modulus and argument, conjugates and polar form.',IC('<path d="M8 24h32M24 8v32"/><circle cx="33" cy="15" r="2.5" fill="#6a8cff"/><path d="M24 24l9-9" stroke-dasharray="3 3"/><text x="9" y="14" font-size="11" fill="#6a8cff" stroke="none" font-style="italic" font-family="serif">i</text>')],
['stat','STAT','Statistics','Single-variable statistics (mean, median, standard deviation, quartiles) and regression analysis on your data.',IC('<path d="M10 38V28M18 38V20M26 38V25M34 38V14"/><path d="M9 30l9-9 8 5 12-13" stroke="#ececf1"/>')],
['basen','BASE-N','Number bases','Convert and calculate in binary, octal, decimal and hexadecimal, with logic operations like AND, OR, XOR and NOT.',IC('<text x="24" y="21" font-size="12" text-anchor="middle" fill="#6a8cff" stroke="none" font-family="monospace" font-weight="700">1010</text><text x="24" y="37" font-size="12" text-anchor="middle" fill="#ececf1" stroke="none" font-family="monospace" font-weight="700">0xA</text>')],
['eqn','EQN','Equation solver','Solve simultaneous linear equations (2 or 3 unknowns), quadratic equations and cubic equations.',IC('<text x="24" y="22" font-size="13" text-anchor="middle" fill="#6a8cff" stroke="none" font-family="serif" font-style="italic">ax²+bx</text><path d="M10 27h28"/><text x="24" y="39" font-size="12" text-anchor="middle" fill="#ececf1" stroke="none" font-family="serif" font-style="italic">x = ?</text>')],
['matrix','MATRIX','Matrices','Add, subtract and multiply matrices, and find determinants, inverses and transposes, up to 3 × 3.',IC('<path d="M14 11H10v26h4M34 11h4v26h-4"/><g fill="#6a8cff" stroke="none"><circle cx="18" cy="18" r="2"/><circle cx="24" cy="18" r="2"/><circle cx="30" cy="18" r="2"/><circle cx="18" cy="24" r="2"/><circle cx="24" cy="24" r="2"/><circle cx="30" cy="24" r="2"/><circle cx="18" cy="30" r="2"/><circle cx="24" cy="30" r="2"/><circle cx="30" cy="30" r="2"/></g>')],
['table','TABLE','Function table','Enter a function f(x) and get a table of x and f(x) values over a range you choose.',IC('<rect x="10" y="10" width="28" height="28" rx="2"/><path d="M10 19h28M24 10v28M10 28h28"/><text x="17" y="17" font-size="7" text-anchor="middle" fill="#ececf1" stroke="none" font-style="italic" font-family="serif">x</text><text x="31" y="17" font-size="7" text-anchor="middle" fill="#ececf1" stroke="none" font-style="italic" font-family="serif">f(x)</text>')],
['vector','VECTOR','Vectors','Vector operations for 2D and 3D vectors: dot product, cross product, magnitude and angle between vectors.',IC('<path d="M12 36L34 14M34 14h-9M34 14v9"/><path d="M12 36l20 0M32 36l-5-3M32 36l-5 3" stroke="#ececf1"/>')]];
const anIc=k=>(AM.find(m=>m[0]===k)||[])[4]||'';
function anT(m){anm=m;go()}
function anOv(){return `<p style="color:var(--mu);margin-top:0">Calculator modes, inspired by the Casio fx-991ES Plus. Pick a mode to open it.</p><div class="grid">${AM.map((m,i)=>`<button class="amc" onclick="anT('${m[0]}')">${m[4]}<span><small>MODE ${i+1}</small><b>${m[1]} · ${m[2]}</b><p>${m[3]}</p><em>${m[0]==='comp'?'Open →':'Open →'}</em></span></button>`).join('')}</div><p style="color:var(--mu);font-size:.85rem;margin-top:14px">Also in this centre: <a href="#" style="color:#6a8cff" onclick="anT('tools');return false">Unit converter and Graph maker</a>.</p>`}
function anComp(){return `<div class="grid"><div class="card"><h3>Scientific calculator</h3><input id="cd" readonly value="${esc(ce)}" style="font-size:1.2rem;margin-bottom:8px"><div class="kp">${['7','8','9','/','4','5','6','*','1','2','3','-','0','.','(',')','+','^','π','sqrt(','sin(','cos(','tan(','log(','C','⌫','='].map(k=>`<button class="${'C⌫='.includes(k)?'r':'g'}" onclick="kp('${k}')">${k}</button>`).join('')}</div><small style="color:var(--mu)">Trig uses radians.</small></div><div class="card"><h3>COMP mode</h3><p style="color:var(--mu);margin-top:0">${AM[0][3]}</p><small style="color:var(--mu)">Next version: ln, factorial, nPr/nCr, degree/radian switch, answer memory, fractions.</small></div></div>`}
function anSoon(k){const m=AM.find(x=>x[0]===k)||AM[0];return `<div class="card" style="max-width:620px"><div class="row" style="gap:14px;flex-wrap:nowrap">${m[4]}<div><h3 style="margin:0">${m[1]} · ${m[2]}</h3><p style="color:var(--mu);margin:4px 0 0">${m[3]}</p></div></div><br><span class="chip">${m[1]} · coming in the next version</span><br><br><button class="g" onclick="anT('ov')">← Back to overview</button></div>`}
function anTools(v){return `<div class="grid"><div class="card"><h3>Unit converter</h3><select id="ut" onchange="uf()">${Object.keys(UN).map(k=>`<option>${k}</option>`).join('')}</select><br><br><div class="row"><input id="uv" type="number" value="1" oninput="uc()"><select id="ua" onchange="uc()" style="max-width:90px"></select><span>→</span><select id="ub" onchange="uc()" style="max-width:90px"></select></div><div class="big2" id="ur"></div></div></div><br><div class="card"><h3>Graph maker</h3><div class="row"><input id="gd" value="${esc(v.chart)}" placeholder="Math:80,Physics:65"><button onclick="V().chart=val('gd');save();go()">Plot</button></div>${bars(v.chart)}<br></div>${soon(['Geometry','Date-time','Finance'])}`}
function ana(){const v=V(),T=[['ov','Overview'],...AM.map(m=>[m[0],m[1]]),['tools','Tools']];
return `<h2>Analytics centre</h2><div class="sw">${T.map(t=>`<button class="${anm===t[0]?'':'g'}" onclick="anT('${t[0]}')">${t[1]}</button>`).join('')}</div>`+(anm==='ov'?anOv():anm==='comp'?anComp():anm==='tools'?anTools(v):anSoon(anm))}
function bars(s){const d=s.split(',').map(x=>x.split(':')).filter(x=>x.length===2&&!isNaN(parseFloat(x[1])));if(!d.length)return '<small>Format label:value, comma-separated</small>';const m=Math.max(...d.map(x=>parseFloat(x[1])),1);return '<div class="bars">'+d.map(x=>`<div style="height:${Math.max(2,parseFloat(x[1])/m*100)}%"><span>${esc(x[1])}</span><small>${esc(x[0])}</small></div>`).join('')+'</div>'}
function kp(k){if(k==='C')ce='';else if(k==='⌫')ce=ce.slice(0,-1);else if(k==='='){try{const e=ce.replace(/π/g,'pi').replace(/\^/g,'**');if(/[a-z]/i.test(e.replace(/sin|cos|tan|sqrt|log|pi/g,''))||/[^0-9a-z+\-*\/().% ]/.test(e))throw 0;const r=Function('sin','cos','tan','sqrt','log','pi','"use strict";return ('+e+')')(Math.sin,Math.cos,Math.tan,Math.sqrt,Math.log10,Math.PI);if(!isFinite(r))throw 0;ce=String(+r.toPrecision(12))}catch(x){toast('Invalid expression')}}else ce+=k;document.getElementById('cd').value=ce}
function uf(){if(!document.getElementById('ut'))return;const t=val('ut'),k=Object.keys(UN[t]),o=k.map(x=>`<option>${x}</option>`).join('');ua.innerHTML=o;ub.innerHTML=o;ub.selectedIndex=1;uc()}
function uc(){const t=val('ut'),a=ua.value,b=ub.value,x=parseFloat(uv.value);if(isNaN(x)){ur.textContent='—';return}let r;if(t==='Temperature'){const c=a==='C'?x:a==='F'?(x-32)*5/9:x-273.15;r=b==='C'?c:b==='F'?c*9/5+32:c+273.15}else r=x*UN[t][a]/UN[t][b];ur.textContent=+r.toPrecision(8)+' '+b}
function learn(){const v=V();if(ci>=v.cards.length)ci=0;const c=v.cards[ci];return `<h2>Learning centre</h2><div class="grid"><div class="card"><h3>Sticky notes</h3><div class="row"><input id="nt" placeholder="Write a note"><button onclick="addN()">Add</button></div><br><div class="grid">${v.notes.map((n,i)=>`<div class="note">${esc(n.t)}<button class="x" onclick="rm('notes',${i})">✕</button></div>`).join('')}</div></div>
<div class="card"><h3>Flashcards</h3><div class="row"><input id="fq" placeholder="Question"><input id="fa" placeholder="Answer"><button onclick="addC()">Add</button></div><br>${c?`<div class="fc" onclick="flip^=1;go()">${esc(flip?c.a:c.q)}</div><div class="row" style="margin-top:8px;justify-content:space-between"><button class="g" onclick="ci=(ci-1+${v.cards.length})%${v.cards.length};flip=0;go()">←</button><small>${ci+1}/${v.cards.length} · tap to flip</small><button class="g" onclick="ci=(ci+1)%${v.cards.length};flip=0;go()">→</button><button class="x" onclick="rm('cards',${ci});ci=0;flip=0">✕</button></div>`:'<small>No cards yet</small>'}</div></div><br>
<div class="card"><h3>Quiz from your flashcards</h3>${quiz(v)}</div>${soon(['Whiteboard','Library','Mind maps','Revision reminders','Grading space','Roadmap'])}`}
function quiz(v){if(v.cards.length<2)return '<small>Add at least 2 flashcards to start a quiz.</small>';if(!qv)return '<button onclick="qs()">Start quiz</button>';if(qv.i>=qv.q.length)return `<div class="big2">${qv.s}/${qv.q.length}</div><button onclick="qs()">Retry</button>`;const q=qv.q[qv.i];return `<p><b>${esc(q.q)}</b></p>${q.o.map((o,i)=>`<button class="g" style="display:block;margin:5px 0" onclick="qa(${i})">${esc(o)}</button>`).join('')}<small>Question ${qv.i+1} of ${qv.q.length}</small>`}
function qs(){const v=V(),sh=a=>a.map(x=>[Math.random(),x]).sort((a,b)=>a[0]-b[0]).map(x=>x[1]);qv={i:0,s:0,q:sh(v.cards).map(c=>({q:c.q,a:c.a,o:sh([c.a,...sh(v.cards.filter(x=>x.a!==c.a)).slice(0,3).map(x=>x.a)])}))};go()}
function qa(i){const q=qv.q[qv.i];if(!q||!Number.isInteger(i)||i<0||i>=q.o.length)return;const o=q.o[i];if(o===q.a){qv.s++;toast('Correct ✓')}else toast('Answer: '+q.a);qv.i++;go()}
function addN(){const t=val('nt');if(!t)return;V().notes.push({t});save();go()}
function addC(){const q=val('fq'),a=val('fa');if(!q||!a)return toast('Fill both sides');V().cards.push({q,a});save();go()}
function set(){const v=V();return `<h2>Settings</h2><div class="grid"><div class="card"><h3>Vault</h3><input id="sn" value="${esc(v.name)}"><br><br><textarea id="sd" rows="2">${esc(v.desc)}</textarea><br><br><button onclick="V().name=val('sn')||V().name;V().desc=val('sd');save();toast('Saved');render()">Save</button></div>
<div class="card"><h3>Data</h3><p style="color:var(--mu)">Demo data is stored in this browser only.</p><button class="r" onclick="if(confirm('Reset all demo data?')){S=seed();save();view='vaults';render();SRC.gc&&SRC.gc()}">Reset demo data</button></div>
<div class="card"><h3>About</h3>PREPVAULT ${(window.PVX&&PVX.VERSION)||'v13'} (Clockwork + all 8 calculator modes + Tools). Sign up is bypassed.</div></div>${soon(['Appearance','Accounts','Help'])}`}
/* ===== Habit Graph Tracker ===== */
const HC=['#4f8cff','#b07cff','#2fd0a0','#f0a040','#e05a7a','#6ad0e8'],MK=['circle','hollow','square','triangle','diamond','cross','plus'],LD={solid:'',dashed:'8 4',dotted:'2 4','dash-dot':'8 4 2 4'},MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const ds=(y,m,d)=>y+'-'+pad(m+1)+'-'+pad(d),dim=(y,m)=>new Date(y,m+1,0).getDate(),rid=()=>'h'+Math.random().toString(36).slice(2,8),act=g=>g.hs.filter(h=>h.on),f1=v=>v==null||isNaN(v)?'—':String(+(+v).toFixed(2));
const mkH=(n,t,u,tg,i,mk='circle',ls='solid')=>({id:rid(),n,t,u,tg,c:HC[i%6],mk,ls,lw:2,ms:5,op:.4,on:1});
const med=a=>{if(!a.length)return null;const s=[...a].sort((x,y)=>x-y),i=s.length>>1;return s.length%2?s[i]:(s[i-1]+s[i])/2};
function lastD(y,m){const n=new Date(),a=y*12+m,b=n.getFullYear()*12+n.getMonth();return a<b?dim(y,m):a===b?n.getDate():0}
function HG(){const v=V();if(!v.hg){const n=new Date(),y=n.getFullYear(),m=n.getMonth(),hs=[mkH('Studying','dur','hours',4,0),mkH('Coding','dur','hours',2,1,'square','dashed'),mkH('Meditation','comp','',20,2),mkH('Syllabus','pct','%',70,3,'diamond','dotted')],e={};
if(v.id===1)for(let d=1;d<=n.getDate();d++){const k=ds(y,m,d);if(d%5)e[hs[0].id+'|'+k]={t:'dur',u:'hours',v:d%9?+(1+(d*37%50)/10).toFixed(1):0};if(d%2)e[hs[1].id+'|'+k]={t:'dur',u:'hours',v:+((d*13%30)/10).toFixed(1)};e[hs[2].id+'|'+k]={t:'comp',u:'',s:d%7?d%3?'done':'inc':'pen'};if(d%4)e[hs[3].id+'|'+k]={t:'pct',u:'%',v:30+(d*7)%70}}
v.hg={hs,e,arch:[],y,m,sd:n.getDate(),jt:'graph',ym:12,grid:1,go:.15,h:380,so:.2,hl:null}}return v.hg}
const ent=(g,h,k)=>{const x=g.e[h.id+'|'+k];return x&&x.t===h.t?x:null};
const fmtE=(h,x)=>!x?'Missing':h.t==='comp'?{done:'Completed',inc:'Incomplete',pen:'Pending'}[x.s]:x.v+' '+(x.u||'');
function mk(s,x,y,r,c,t){const a=`fill="${c}" stroke="${c}"`,f={circle:`<circle cx="${x}" cy="${y}" r="${r}" ${a}/>`,hollow:`<circle cx="${x}" cy="${y}" r="${r}" fill="#050505" stroke="${c}" stroke-width="2"/>`,square:`<rect x="${x-r}" y="${y-r}" width="${2*r}" height="${2*r}" ${a}/>`,triangle:`<path d="M${x} ${y-r-1}L${x+r+1} ${y+r}L${x-r-1} ${y+r}Z" ${a}/>`,diamond:`<path d="M${x} ${y-r-2}L${x+r+2} ${y}L${x} ${y+r+2}L${x-r-2} ${y}Z" ${a}/>`,cross:`<path d="M${x-r} ${y-r}L${x+r} ${y+r}M${x+r} ${y-r}L${x-r} ${y+r}" stroke="${c}" stroke-width="2.5"/>`,plus:`<path d="M${x-r-1} ${y}H${x+r+1}M${x} ${y-r-1}V${y+r+1}" stroke="${c}" stroke-width="2.5"/>`};return `<g>${f[s]||f.circle}</g>`}
function graph(big){const g=HG(),y=g.y,m=g.m,N=dim(y,m),W=900,H=big?g.h:Math.min(g.h,220),L=46,R=44,T=12,B=28,pw=W-L-R,ph=H-T-B,cw=pw/N,ym=g.ym,n=new Date(),tk=ds(n.getFullYear(),n.getMonth(),n.getDate());
const X=d=>L+cw*(d-.5),Yh=v=>T+ph*(1-Math.min(v,ym)/ym),Yp=v=>T+ph*(1-v/100),hs=act(g),cs=hs.filter(h=>h.t==='comp'),st=Math.max(1,Math.ceil(ym/12));
let s=big?`<svg viewBox="0 0 ${W} ${H}" style="width:100%;min-width:680px;display:block;font-size:11px" fill="#9a9ab0">`:`<svg class="pvx-hg" viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;min-width:480px;max-height:260px;display:block;font-size:13px" fill="#9a9ab0">`;
for(let v=0;v<=ym;v+=st)s+=`<text x="${L-6}" y="${Yh(v)+4}" text-anchor="end">${v}</text>`+(g.grid?`<line x1="${L}" x2="${W-R}" y1="${Yh(v)}" y2="${Yh(v)}" stroke="#fff" stroke-opacity="${g.go}"/>`:'');
for(let p=0;p<=100;p+=25)s+=`<text x="${W-R+6}" y="${Yp(p)+4}">${p}%</text>`;
s+=`<text x="12" y="${T+ph/2}" transform="rotate(-90 12 ${T+ph/2})" text-anchor="middle">Hours (duration)</text><text x="${W-6}" y="${T+ph/2}" transform="rotate(90 ${W-6} ${T+ph/2})" text-anchor="middle">Percent (completion and %)</text>`;
for(let d=1;d<=N;d++){const k=ds(y,m,d);if(big||d===1||d===N||d%5===0||k===tk)s+=`<text x="${X(d)}" y="${H-10}" text-anchor="middle" ${k===tk?'fill="#6a8cff" font-weight="700"':''}>${d}</text>`;if(k>tk)s+=`<rect x="${L+cw*(d-1)}" y="${T}" width="${cw}" height="${ph}" fill="#fff" fill-opacity=".03"/>`;if(d===g.sd&&big)s+=`<rect x="${L+cw*(d-1)}" y="${T}" width="${cw}" height="${ph}" fill="#2f55d4" fill-opacity=".25"/>`}
hs.forEach(h=>{s+=`<g opacity="${g.hl&&g.hl!==h.id?g.so:1}">`;
if(h.t==='comp'){const ci=cs.indexOf(h),bw=cw*.8/cs.length;for(let d=1;d<=N;d++){const x=ent(g,h,ds(y,m,d));if(!x)continue;const bx=L+cw*(d-1)+cw*.1+ci*bw;s+=x.s==='done'?`<rect x="${bx}" y="${Yp(100)}" width="${bw}" height="${ph}" fill="${h.c}" fill-opacity="${h.op}"/>`:x.s==='inc'?`<rect x="${bx}" y="${Yp(0)-3}" width="${bw}" height="3" fill="${h.c}"/>`:`<rect x="${bx}" y="${Yp(100)}" width="${bw}" height="${ph}" fill="none" stroke="${h.c}" stroke-dasharray="3 3"/>`}}
else{const Y=h.t==='pct'?Yp:Yh;let seg=[],segs=[],pd=0;for(let d=1;d<=N;d++){const x=ent(g,h,ds(y,m,d));if(!x)continue;const p=[d,x.v];if(pd===d-1&&seg.length)seg.push(p);else{seg=[p];segs.push(seg)}pd=d}
segs.forEach(q=>{if(q.length>1)s+=`<polyline fill="none" stroke="${h.c}" stroke-width="${h.lw}" stroke-dasharray="${LD[h.ls]||''}" points="${q.map(p=>X(p[0])+','+Y(p[1])).join(' ')}"/>`});segs.flat().forEach(p=>s+=mk(h.mk,X(p[0]),Y(p[1]),h.ms,h.c))}
s+='</g>'});
for(let d=1;d<=N;d++){const k=ds(y,m,d);s+=`<rect x="${L+cw*(d-1)}" y="${T}" width="${cw}" height="${ph}" fill="transparent" style="cursor:pointer" onclick="${big?'selD':'openJ'}(${d})"><title>${d} ${MN[m]}\n${esc(hs.map(h=>h.n+': '+fmtE(h,ent(g,h,k))).join('\n'))}</title></rect>`}
return s+'</svg>'}
function legend(){const g=HG();return `<div class="row" style="margin:8px 0">${act(g).map(h=>`<button class="g" style="${g.hl===h.id?'border-color:'+h.c+';background:#12121c':''}" onclick="hl('${h.id}')"><svg width="34" height="12">${h.t==='comp'?`<rect x="4" y="0" width="26" height="12" fill="${h.c}" fill-opacity="${h.op}" stroke="${h.c}"/>`:`<line x1="0" x2="34" y1="6" y2="6" stroke="${h.c}" stroke-width="${h.lw}" stroke-dasharray="${LD[h.ls]}"/>`+mk(h.mk,17,6,4,h.c)}</svg> ${esc(h.n)} <small style="color:var(--mu)">${{dur:'hours',comp:'done/not',pct:'%'}[h.t]}</small></button>`).join('')}</div>`}
function hl(id){const g=HG();g.hl=g.hl===id?null:id;go()}
const mbar=()=>{const g=HG();return `<div class="row"><button class="g" onclick="mn(-1)">←</button><select onchange="HG().m=+this.value;save();go()" style="width:auto">${MN.map((a,i)=>`<option value="${i}" ${i===g.m?'selected':''}>${a}</option>`).join('')}</select><input type="number" value="${g.y}" min="1970" max="2100" style="width:90px" onchange="HG().y=Math.min(2100,Math.max(1970,+this.value||2026));save();go()"><button class="g" onclick="mn(1)">→</button><button class="g" onclick="mt()">This month</button><small style="color:var(--mu)">${dim(g.y,g.m)} days</small></div>`};
function mn(d){const g=HG();g.m+=d;if(g.m<0){g.m=11;g.y--}if(g.m>11){g.m=0;g.y++}g.sd=Math.min(Math.max(g.sd,1),dim(g.y,g.m));save();go()}
function mt(){const g=HG(),n=new Date();g.y=n.getFullYear();g.m=n.getMonth();g.sd=n.getDate();save();go()}
function openJ(d){const g=HG();if(d)g.sd=d;g.jt='graph';tab='hj';save();render()}
function selD(d){HG().sd=d;go()}
function dayNav(n){const g=HG();g.sd+=n;if(g.sd<1){mn(-1);g.sd=dim(g.y,g.m)}else if(g.sd>dim(g.y,g.m)){mn(1);g.sd=1}save();go()}
const hjCard=()=>`<div class="card hjc"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Habit journal — ${MN[HG().m]} ${HG().y}</h3><button onclick="openJ()">Open habit journal →</button></div>${mbar()}${legend()}<div style="overflow-x:auto">${graph(0)}</div><small style="color:var(--mu)">Click the graph or the button to open the full habit journal.</small></div>`;
const HRE=/<div class="card"><h3>Habit tracker<\/h3>[\s\S]*?(?=<div class="grid"><div class="card"><h3>Focus timer)/;
function dash(){return dashOld().replace(/<div class="card"><h3>Habits<\/h3>[\s\S]*?(?=\n<div class="card"><h3>Shortcuts)/,'').replace('<br><div class="card"><h3>Calendar</h3>',()=>'<br>'+hjCard()+'<br><div class="card"><h3>Calendar</h3>')}
const PS=[['hj','Habit journal'],['pt','Task manager'],['pf','Clockwork'],['pr','Reminders'],['pc','Calendar']],PT=['plan',...PS.map(q=>q[0])];
const PM={pt:['Task manager','<div class="card"><h3>Task manager','<div class="grid"><div class="card"><h3>Focus timer',''],pf:['Focus timer','<div class="card"><h3>Focus timer','<div class="card"><h3>Reminders',''],pr:['Reminders','<div class="card"><h3>Reminders','</div></div><br><div class="card"><h3>Calendar','</div>'],pc:['Calendar','<div class="card"><h3>Calendar','<p><span class="chip"','']};
function psub(k){const m=PM[k],s=planNo(),i=s.indexOf(m[1]),j=s.indexOf(m[2],i+1);return `<h2>Planning centre › ${m[0]}</h2>`+s.slice(i,j<0?undefined:j)+m[3]+`<br><small style="color:var(--mu)">More ${m[0].toLowerCase()} features coming soon.</small>`}
function plan(){const v=V(),d=v.tasks.filter(t=>t.x).length,pn=v.rem.filter(r=>!r.d).length,c=(k,t,b)=>`<div class="card"><h3>${t}</h3>${b}<br><button class="g" onclick="go('${k}')">Open ${t.toLowerCase()} →</button></div>`;
return `<h2>Planning centre</h2><p style="color:var(--mu)">Overview of every planning section. Open any one for its full view.</p>${hjCard()}<br><div class="grid">${c('pt','Task manager',`${d}/${v.tasks.length} done<div class="bar" style="margin:8px 0"><i style="width:${pct(v)}%"></i></div>`)+c('pf','Focus timer',`<div class="big2">${fmt(tm.left)}</div>${v.ses} focus sessions`)+c('pr','Reminders',`${pn} pending`)+c('pc','Calendar',`${v.tasks.filter(t=>!t.x&&t.d).length} dated open tasks`)}</div>${soon(['Time table','Scheduler'])}`}
function planNo(){return planOld().replace(HRE,'')}
function hj(){const g=HG(),TB=[['graph','Graph'],['habits','Habits'],['stats','Statistics'],['ins','Insights'],['data','Settings and data']];return `<h2>Planning centre › Habit journal</h2><div class="sw">${TB.map(t=>`<button class="${g.jt===t[0]?'':'g'}" onclick="HG().jt='${t[0]}';go()">${t[1]}</button>`).join('')}</div>${({graph:jg,habits:jh,stats:jstats,ins:ji,data:jd})[g.jt]()}`}
function jg(){return `<div class="card">${mbar()}${legend()}<div style="overflow-x:auto">${graph(1)}</div><small style="color:var(--mu)">Gap = missing · dashed box = pending · short bar on 0% = incomplete · recorded zero sits on the 0 line · shaded days are in the future.</small></div><br>${dayP()}`}
function dayP(){const g=HG(),d=g.sd,k=ds(g.y,g.m,d),hs=act(g);return `<div class="card"><div class="row" style="justify-content:space-between"><button class="g" onclick="dayNav(-1)">← Prev</button><h3 style="margin:0">${d} ${MN[g.m]} ${g.y}</h3><button class="g" onclick="dayNav(1)">Next →</button></div>${hs.map(h=>{const x=ent(g,h,k),id=h.id;return `<div class="t"><span style="color:${h.c}">● ${esc(h.n)}<br><small style="color:var(--mu)">target ${h.tg} ${h.t==='comp'?'days/month':h.u} · ${fmtE(h,x)}</small></span>`+(h.t==='comp'?['done','inc','pen'].map(s=>`<button class="${x&&x.s===s?'':'g'}" onclick="setE('${id}',0,'${s}')">${{done:'Done',inc:'Incomplete',pen:'Pending'}[s]}</button>`).join(''):`<input type="number" step="0.25" min="0" max="${h.t==='pct'?100:24}" value="${x?x.v:''}" style="width:90px" onchange="setE('${id}',this.value)">${h.t==='pct'?`<input type="range" min="0" max="100" value="${x?x.v:0}" style="width:110px" onchange="setE('${id}',this.value)">`:''}`)+`<button class="x" onclick="setE('${id}','','clr')">Clear</button></div>`}).join('')||'<small>No active habits.</small>'}</div>`}
function setE(id,x,st){const g=HG(),h=g.hs.find(a=>a.id===id),key=id+'|'+ds(g.y,g.m,g.sd);if(st==='clr'||x==='')delete g.e[key];else if(h.t==='comp')g.e[key]={t:'comp',u:'',s:st};else{const n=parseFloat(x),mx=h.t==='pct'?100:24;if(isNaN(n)||n<0||n>mx)return toast('Enter a value from 0 to '+mx);g.e[key]={t:h.t,u:h.u,v:n}}save();go()}
const pv=h=>`<svg width="200" height="34" style="background:#08080d;border-radius:6px">${h.t==='comp'?`<rect x="20" y="4" width="14" height="26" fill="${h.c}" fill-opacity="${h.op}"/><rect x="60" y="27" width="14" height="3" fill="${h.c}"/><rect x="100" y="4" width="14" height="26" fill="none" stroke="${h.c}" stroke-dasharray="3 3"/>`:`<polyline fill="none" stroke="${h.c}" stroke-width="${h.lw}" stroke-dasharray="${LD[h.ls]}" points="15,24 65,10 115,20 165,8"/>`+[[15,24],[65,10],[115,20],[165,8]].map(p=>mk(h.mk,p[0],p[1],h.ms,h.c)).join('')}</svg>`;
function jh(){const g=HG();return `<div class="row"><button onclick="addHb()">+ Add habit</button><small style="color:var(--mu)">${act(g).length}/6 active · deleting keeps recorded entries in the backup</small></div><br><div class="grid">${g.hs.map((h,i)=>`<div class="card" style="border-left:4px solid ${h.c}"><div class="row"><input value="${esc(h.n)}" onchange="sh('${h.id}','n',this.value)"><input type="color" value="${h.c}" style="width:46px;padding:2px" onchange="sh('${h.id}','c',this.value)"></div><div class="row" style="margin:6px 0"><select onchange="sh('${h.id}','t',this.value)">${[['dur','Duration'],['comp','Completion'],['pct','Percentage']].map(a=>`<option value="${a[0]}" ${h.t===a[0]?'selected':''}>${a[1]}</option>`).join('')}</select><input value="${esc(h.u)}" placeholder="unit" style="max-width:80px" onchange="sh('${h.id}','u',this.value)"><input type="number" value="${h.tg}" title="target (comp = days per month)" style="max-width:80px" onchange="sh('${h.id}','tg',this.value)"></div>`+(h.t==='comp'?`<label>Band opacity <input type="range" min=".1" max=".9" step=".05" value="${h.op}" onchange="sh('${h.id}','op',this.value)"></label>`:`<div class="row"><select onchange="sh('${h.id}','mk',this.value)">${MK.map(a=>`<option ${h.mk===a?'selected':''}>${a}</option>`).join('')}</select><select onchange="sh('${h.id}','ls',this.value)">${Object.keys(LD).map(a=>`<option ${h.ls===a?'selected':''}>${a}</option>`).join('')}</select><input type="number" min="1" max="6" value="${h.lw}" title="line width" style="max-width:60px" onchange="sh('${h.id}','lw',this.value)"><input type="number" min="3" max="10" value="${h.ms}" title="marker size" style="max-width:60px" onchange="sh('${h.id}','ms',this.value)"></div>`)+`<div style="margin:8px 0">${pv(h)}</div><div class="row"><button class="${h.on?'':'g'}" onclick="sh('${h.id}','on',${h.on?0:1})">${h.on?'Active':'Disabled'}</button><button class="g" onclick="mv(${i},-1)">↑</button><button class="g" onclick="mv(${i},1)">↓</button><button class="g" onclick="dup(${i})">Duplicate</button><button class="x" onclick="hdel(${i})">Delete</button></div></div>`).join('')}</div>`}
function sh(id,f,v){const g=HG(),h=g.hs.find(a=>a.id===id);if(f==='on'&&v&&act(g).length>=6)return toast('Maximum of six active habits');if(['tg','lw','ms','op'].includes(f)){v=parseFloat(v);if(isNaN(v)||v<0)return toast('Invalid number')}if(f==='n'&&!String(v).trim())return toast('Name required');h[f]=v;if(f==='t'){h.u=v==='pct'?'%':v==='dur'?'hours':'';h.tg=v==='comp'?20:v==='pct'?70:4;toast('Old entries keep their original type and are not converted')}save();go()}
function addHb(){const g=HG();if(act(g).length>=6)return toast('Maximum of six active habits');g.hs.push(mkH('New habit','dur','hours',2,g.hs.length));save();go()}
function mv(i,d){const a=HG().hs,j=i+d;if(j<0||j>=a.length)return;[a[i],a[j]]=[a[j],a[i]];save();go()}
function dup(i){const g=HG(),h=g.hs[i],on=act(g).length<6?1:0;g.hs.splice(i+1,0,{...h,id:rid(),n:h.n+' copy',on});if(!on)toast('Copied as disabled: six habits are already active');save();go()}
function hdel(i){const g=HG();if(confirm('Delete this habit? Its recorded entries stay in the saved data.')){g.arch.push(g.hs.splice(i,1)[0]);save();go()}}
function sts(g,h,y,m){const L=lastD(y,m);let r=[],dn=0,ic=0,pn=0,ms=0,run=0,bs=0;for(let d=1;d<=L;d++){const x=ent(g,h,ds(y,m,d));if(!x){ms++;run=0;continue}if(h.t==='comp'){if(x.s==='done'){dn++;bs=Math.max(bs,++run)}else{run=0;x.s==='inc'?ic++:pn++}}else r.push(x.v)}const sum=r.reduce((a,b)=>a+b,0);return{r,dn,ic,pn,ms,bs,sum,L,avg:r.length?sum/r.length:null,met:r.filter(v=>v>=h.tg).length,rate:dn+ic?dn/(dn+ic)*100:null}}
function wk(g,h){const N=dim(g.y,g.m),L=lastD(g.y,g.m),o=[];for(let w=0;w*7<L;w++){const r=[];for(let d=w*7+1;d<=Math.min(L,w*7+7);d++){const x=ent(g,h,ds(g.y,g.m,d));if(x)r.push(x.v)}o.push('W'+(w+1)+' '+(r.length?f1(r.reduce((a,b)=>a+b,0)/r.length):'—'))}return o.join(' · ')||'—'}
function jstats(){const g=HG(),pm=g.m?[g.y,g.m-1]:[g.y-1,11];return mbar()+`<br><div class="grid">${act(g).map(h=>{const a=sts(g,h,g.y,g.m),b=sts(g,h,pm[0],pm[1]);let rows;if(h.t==='comp')rows=[['Completed',a.dn],['Incomplete',a.ic],['Pending',a.pn],['Missing',a.ms],['Completion rate (done ÷ done+incomplete)',a.rate==null?'—':f1(a.rate)+'%'],['Longest streak (explicit completions; anything else breaks it)',a.bs],['Monthly target ('+h.tg+' days)',h.tg>0?f1(a.dn/h.tg*100)+'%':'—'],['Previous month completed',b.dn]];else{const u=h.t==='pct'?'%':' '+h.u;rows=[...(h.t==='dur'?[['Total',f1(a.sum)+u]]:[]),['Average (recorded days only)',a.avg==null?'—':f1(a.avg)+u],['Highest',f1(a.r.length?Math.max(...a.r):null)],['Lowest',f1(a.r.length?Math.min(...a.r):null)],['Median',f1(med(a.r))],['Recorded days',a.r.length],['Missing days',a.ms],[h.t==='dur'?'Days meeting target':'Days at or above target',a.met+' / '+a.r.length+(a.r.length?' ('+f1(a.met/a.r.length*100)+'%)':'')],['Weekly averages',wk(g,h)],['Previous month average',b.avg==null?'—':f1(b.avg)]]}return `<div class="card" style="border-top:3px solid ${h.c}"><h3>${esc(h.n)} <small style="color:var(--mu)">${{dur:'duration',comp:'completion',pct:'percentage'}[h.t]}</small></h3>${rows.map(r=>`<div class="t"><span>${r[0]}</span><b>${r[1]}</b></div>`).join('')}</div>`}).join('')}</div><small style="color:var(--mu)">Missing days are excluded from averages; future days are never counted as missed; different units are never compared.</small>`}
function ji(){const g=HG(),hs=act(g),L=lastD(g.y,g.m),S=hs.map(h=>({h,s:sts(g,h,g.y,g.m)})),n=S.reduce((a,x)=>a+x.s.r.length+x.s.dn+x.s.ic+x.s.pn,0),out=[];if(n<10)return mbar()+`<br><div class="card">Insufficient data: at least 10 recorded entries are needed for this month (found ${n}).</div>`;
const cs=S.filter(x=>(x.h.t==='comp'?x.s.dn+x.s.ic:x.s.r.length)>=5).map(x=>({...x,k:x.h.t==='comp'?x.s.rate:x.s.met/x.s.r.length*100})).sort((p,q)=>q.k-p.k);
if(cs.length>1)out.push(`Most consistent: ${esc(cs[0].h.n)} (${f1(cs[0].k)}% on target). Least consistent: ${esc(cs.at(-1).h.n)} (${f1(cs.at(-1).k)}%).`);
const mm=[...S].sort((p,q)=>q.s.ms-p.s.ms)[0];if(mm&&mm.s.ms>0)out.push(`Most frequently missing: ${esc(mm.h.n)} (${mm.s.ms} of ${L} past days without an entry).`);
const sk=S.filter(x=>x.h.t==='comp').sort((p,q)=>q.s.bs-p.s.bs)[0];if(sk&&sk.s.bs>0)out.push(`Longest streak: ${esc(sk.h.n)}, ${sk.s.bs} consecutive completed days.`);
const du=S.filter(x=>x.h.t==='dur'&&x.s.avg!=null).sort((p,q)=>q.s.avg-p.s.avg);if(du.length&&du.every(x=>x.h.u===du[0].h.u))out.push(`Highest average duration: ${esc(du[0].h.n)} (${f1(du[0].s.avg)} ${esc(du[0].h.u)} per recorded day).`);
const dt={};hs.filter(h=>h.t==='dur').forEach(h=>{for(let d=1;d<=L;d++){const x=ent(g,h,ds(g.y,g.m,d));if(x)dt[d]=(dt[d]||0)+x.v}});const ks=Object.keys(dt).sort((a,b)=>dt[b]-dt[a]);if(ks.length>=3)out.push(`Most productive day: ${ks[0]} ${MN[g.m]} (${f1(dt[ks[0]])} h across duration habits). Least: ${ks.at(-1)} (${f1(dt[ks.at(-1)])} h).`);
S.filter(x=>x.h.t==='dur').forEach(({h})=>{const w=[];for(let k=0;k*7<L;k++){const r=[];for(let d=k*7+1;d<=Math.min(L,k*7+7);d++){const x=ent(g,h,ds(g.y,g.m,d));if(x)r.push(x.v)}if(r.length>=3)w.push([k+1,r.reduce((a,b)=>a+b,0)/r.length])}if(w.length>1){const a=w.at(-2),b=w.at(-1);out.push(`${esc(h.n)}: week ${b[0]} averaged ${f1(b[1])} vs ${f1(a[1])} in week ${a[0]} (${b[1]>=a[1]?'+':''}${f1(b[1]-a[1])}).`)}});
return mbar()+`<br><div class="card">${out.map(o=>`<div class="t"><span>${o}</span></div>`).join('')||'Not enough data for further insights.'}</div>`}
function jd(){const g=HG(),F=(l,k,a,b,s=1)=>`<label>${l}<input type="number" min="${a}" max="${b}" step="${s}" value="${g[k]}" onchange="gs('${k}',this.value,${a},${b})"></label><br><br>`;return `<div class="grid"><div class="card"><h3>Graph settings</h3>${F('Y-axis max (hours)','ym',2,24)}${F('Graph height (px)','h',240,700,20)}${F('Gridline opacity','go',0,.5,.05)}${F('Opacity of unselected habits','so',0,.8,.05)}<label><input type="checkbox" style="width:auto" ${g.grid?'checked':''} onchange="HG().grid^=1;save();go()"> Gridlines</label><br><br><button class="g" onclick="Object.assign(HG(),{ym:12,grid:1,go:.15,h:380,so:.2});save();go()">Reset to default</button></div><div class="card"><h3>Backup and restore (JSON)</h3><textarea id="bk" rows="8">${esc(JSON.stringify(g))}</textarea><br><br><div class="row"><button onclick="bi()">Restore from text above</button><button class="r" onclick="if(confirm('Clear ALL entries of this vault?')){HG().e={};save();go()}">Clear all entries</button></div><small style="color:var(--mu)">Copy the text to back up. Downloads are blocked in the hosted demo, so paste it back to restore.</small></div></div>`}
function gs(k,v,a,b){v=parseFloat(v);if(isNaN(v)||v<a||v>b)return toast('Enter a value from '+a+' to '+b);HG()[k]=v;save();go()}
function bi(){try{const o=JSON.parse(document.getElementById('bk').value);if(!Array.isArray(o.hs)||typeof o.e!=='object'||!o.y)throw 0;V().hg=o;save();go();toast('Restored')}catch(x){toast('Invalid backup text')}}
const TFH0={V,all:()=>S.vaults,save,toast,open:()=>go('pt'),inVault:()=>view==='vault'&&!!V()};window.__TFH=TFH0;
(function(){
"use strict";
/* ============ State ============ */
const KEY="taskflow.demo.v2", SV=1;
const PR=["low","medium","high","urgent"], PSYM={low:"▽",medium:"◇",high:"△",urgent:"▲"};
const TABS=[["overview","Overview"],["todo","To-Do List"],["kanban","Kanban"],["scheduler","Scheduler"],["matrix","Matrix"],["analytics","Analytics"],["reminders","Reminders"]];
let S, ui={tab:"overview",slide:0,dir:1,cp:false,shown:-1,list:"inbox",sort:"priority",group:"none",q:"",cat:"",pd:null,pm:"day",sv:"week",sd:null,colorBy:"category",arange:14,limit:150}, hist=[], saveT=null, drag=null;
const COLS=()=>S.columns;
/* ============ Utils ============ */
const uid=()=>crypto.randomUUID?crypto.randomUUID():Date.now().toString(36)+Math.random().toString(36).slice(2);
const pad=n=>String(n).padStart(2,"0");
const iso=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const fromISO=s=>{const [y,m,d]=s.split("-").map(Number);return new Date(y,m-1,d)};   // local, avoids UTC off-by-one
const addDays=(s,n)=>{const d=fromISO(s);d.setDate(d.getDate()+n);return iso(d)};
const today=()=>iso(new Date());
const now=()=>new Date().toISOString();
const h=(t,a={},...c)=>{const e=document.createElement(t);for(const k in a){const v=a[k];if(k==="class")e.className=v;else if(k.startsWith("on"))e.addEventListener(k.slice(2),v);else if(v===true)e.setAttribute(k,"");else if(v!==false&&v!=null)e.setAttribute(k,v)}c.flat().forEach(x=>x!=null&&e.append(x));return e}; // append(string) = text node, so user text is never parsed as HTML
let ROOT=null,MODE="full";const $=s=>ROOT.querySelector(s);
function dueLabel(t){if(!t.dueDate)return"";const d=Math.round((fromISO(t.dueDate)-fromISO(today()))/864e5);const base=d===0?"Today":d===1?"Tomorrow":d===-1?"Yesterday":d<0?Math.abs(d)+"d overdue":iso(fromISO(t.dueDate)).slice(5);return base+(t.dueTime?" "+t.dueTime:"")}
const overdue=t=>t.dueDate&&t.dueDate<today()&&t.status!=="done";
/* ============ Storage ============ */
function mk(title,o={}){const n=now();return Object.assign({id:uid(),title,description:"",status:"todo",priority:"medium",category:"inbox",tags:[],dueDate:null,dueTime:null,scheduledStart:null,scheduledEnd:null,estimateMinutes:null,actualMinutes:0,reminders:[],recurrence:null,subtasks:[],dependsOn:[],blocked:false,important:null,urgent:null,order:0,createdAt:n,updatedAt:n,startedAt:null,completedAt:null,archived:false,history:[{status:o.status||"todo",at:n}]},o)}
function seed(){const D=n=>addDays(today(),n);
const T=[mk("Submit Q4 report",{category:"work",priority:"urgent",dueDate:D(-2),status:"in-progress",estimateMinutes:120,important:true,urgent:true,tags:["finance"],subtasks:[{id:uid(),title:"Gather numbers",done:true},{id:uid(),title:"Write summary",done:false}]}),
mk("Reply to client emails",{category:"work",priority:"high",dueDate:D(0),dueTime:"11:00",estimateMinutes:30,important:true,urgent:true,reminders:[{id:uid(),type:"relative",offsetMinutes:30,fired:false}]}),
mk("Design review",{category:"work",priority:"high",dueDate:D(1),status:"review",important:true,urgent:false}),
mk("Plan sprint backlog",{category:"work",priority:"medium",dueDate:D(3),important:true,urgent:false,estimateMinutes:90}),
mk("Renew passport",{category:"personal",priority:"high",dueDate:D(-5),important:true,urgent:true}),
mk("Buy groceries",{category:"personal",priority:"low",dueDate:D(0),estimateMinutes:45,important:false,urgent:true}),
mk("Book dentist",{category:"health",priority:"medium",dueDate:D(5),reminders:[{id:uid(),type:"relative",offsetMinutes:1440,fired:false}]}),
mk("Weekly review",{category:"personal",priority:"medium",dueDate:D(2),recurrence:{freq:"weekly",interval:1,daysOfWeek:[5],endDate:null},important:true,urgent:false}),
mk("Learn JavaScript closures",{category:"learning",priority:"medium",status:"in-progress",estimateMinutes:60,important:true,urgent:false}),
mk("Read 20 pages",{category:"learning",priority:"low",important:false,urgent:false}),
mk("Fix login bug",{category:"work",priority:"urgent",status:"in-progress",dueDate:D(0),important:true,urgent:true,blocked:true}),
mk("Set up backups",{category:"work",priority:"medium",status:"done",completedAt:now(),dueDate:D(0)})];
[[0,0,9,120],[1,0,11,30],[2,1,14,60],[3,3,10,90],[5,0,17,45],[7,2,15,60],[8,0,9,60],[10,1,10,60],[6,4,9,30]].forEach(([i,dd,hr,du])=>{T[i].scheduledStart=stamp(D(dd),hr*60);T[i].scheduledEnd=stamp(D(dd),hr*60+du)});
T[7].dueDate=D(2);
[["Write weekly update","work",60,75,"medium"],["Gym session","health",45,50,"low"],["Refactor utils","work",120,210,"high"],["Pay bills","personal",20,25,"medium"],["Draft proposal","work",90,150,"high"],["Read article","learning",30,35,"low"],["Clean inbox","work",30,20,"low"],["Team sync prep","work",45,60,"medium"],["Meal prep","personal",60,70,"low"],["Code review","work",60,55,"medium"]].forEach((x,i)=>{const c=new Date(Date.now()-(i*1.3+.2)*864e5),s=new Date(c-x[3]*18e4),cr=new Date(c-5*864e5);T.push(mk(x[0],{category:x[1],estimateMinutes:x[2],actualMinutes:x[3],priority:x[4],status:"done",createdAt:cr.toISOString(),startedAt:s.toISOString(),completedAt:c.toISOString(),dueDate:iso(c),history:[{status:"todo",at:cr.toISOString()},{status:"in-progress",at:s.toISOString()},{status:"done",at:c.toISOString()}]}))});
return T}
function defaults(){return{schemaVersion:SV,tasks:seed(),columns:[{id:"todo",name:"To Do",wip:4},{id:"in-progress",name:"In Progress",wip:3},{id:"review",name:"Review",wip:2},{id:"done",name:"Done",wip:0}],settings:{staleDays:7,hardWip:false,workStart:9,workEnd:17},overdueLog:{},reminders:[]}}
function migrate(d){if(!d||typeof d!=="object"||!Array.isArray(d.tasks))throw new Error("bad data");d.schemaVersion=d.schemaVersion||0;
 if(d.schemaVersion<1){d.tasks.forEach(t=>{t.history=t.history||[{status:t.status,at:t.createdAt||now()}];t.tags=t.tags||[];t.subtasks=t.subtasks||[]});d.schemaVersion=1}
 const f=defaults();d.columns=d.columns||f.columns;d.settings=Object.assign({},f.settings,d.settings);d.overdueLog=d.overdueLog||{};d.reminders=Array.isArray(d.reminders)?d.reminders:[];return d}
function load(){try{let r=localStorage.getItem(KEY);if(!r){r=localStorage.getItem("taskflow.demo.v1");if(!r)return defaults()}return migrate(JSON.parse(r))}catch(e){banner("Saved data unreadable or storage unavailable. Running in memory only; changes won't persist.");return defaults()}}
function logOverdue(){const L=S.overdueLog=S.overdueLog||{};L[today()]=S.tasks.filter(t=>!t.archived&&overdue(t)).length;const k=Object.keys(L).sort();while(k.length>120)delete L[k.shift()]}
function saveNow(){logOverdue();try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){banner(e&&e.name==="QuotaExceededError"?"Storage full. Export your data to keep it.":"Can't write to storage. Changes live in memory only.")}}
function save(){clearTimeout(saveT);saveT=setTimeout(saveNow,200)}
function banner(m){const b=$("#banner");b.textContent=m;b.style.display="block"}
/* ============ Parser ============ */
const DOW=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];
function parse(text){let t=" "+text+" ",r={tags:[]},chips=[],rm=0;
 const take=(re,fn)=>{const m=t.match(re);if(m){t=t.replace(m[0]," ");fn(m)}};
 take(/\s#([\w-]+)/i,m=>{r.category=m[1].toLowerCase();chips.push("#"+r.category)});
 for(let i=0;i<8;i++)take(/\s@([\w-]+)/i,m=>{r.tags.push(m[1]);chips.push("@"+m[1])});
 take(/\s!(low|medium|high|urgent)\b/i,m=>{r.priority=m[1].toLowerCase();chips.push("! "+r.priority)});
 take(/\s~(\d+(?:\.\d+)?)(m|h)\b/i,m=>{r.estimateMinutes=Math.round(m[1]*(m[2]==="h"?60:1));chips.push("~ "+r.estimateMinutes+"m")});
 take(/\sremind\s+me\b(?:\s+to\b)?/i,()=>{rm=1;chips.push("🔔 reminder")});
 take(/\sremind\s+(\d+)(m|h|d)\s+before\b/i,m=>{const o=m[1]*({m:1,h:60,d:1440})[m[2]];r.reminders=[{id:uid(),type:"relative",offsetMinutes:o,fired:false}];chips.push("remind "+m[1]+m[2])});
 take(/\severy\s+(?:(\d+)\s+)?(days?|weekdays?|weeks?|months?|sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i,m=>{const w=m[2].toLowerCase().replace(/s$/,""),n=+m[1]||1,i=DOW.indexOf(w);
  r.recurrence=i>=0?{freq:"weekly",interval:n,daysOfWeek:[i],endDate:null}:w==="weekday"?{freq:"custom",interval:n,daysOfWeek:[1,2,3,4,5],endDate:null}:{freq:w==="day"?"daily":w==="week"?"weekly":"monthly",interval:n,daysOfWeek:[],endDate:null};chips.push("↻ every "+(n>1?n+" ":"")+w)});
 const T0=today();
 take(/\s(\d{4}-\d{2}-\d{2})\b/,m=>{r.dueDate=m[1];chips.push("📅 "+m[1])});
 take(/\sin\s+(\d+)\s+days?\b/i,m=>{r.dueDate=addDays(T0,+m[1]);chips.push("📅 +"+m[1]+"d")});
 take(/\snext\s+(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\b/i,m=>{const want=DOW.indexOf(m[1].toLowerCase());let n=(want-fromISO(T0).getDay()+7)%7||7;r.dueDate=addDays(T0,n);chips.push("📅 "+r.dueDate)});
 take(/\stomorrow\b/i,()=>{r.dueDate=addDays(T0,1);chips.push("📅 tomorrow")});
 take(/\stoday\b/i,()=>{r.dueDate=T0;chips.push("📅 today")});
 take(/\s(\d{1,2})\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/i,m=>{const mo="jan feb mar apr may jun jul aug sep oct nov dec".split(" ").indexOf(m[2].toLowerCase());let y=fromISO(T0).getFullYear(),d=new Date(y,mo,+m[1]);if(iso(d)<T0)d=new Date(y+1,mo,+m[1]);r.dueDate=iso(d);chips.push("📅 "+r.dueDate)});
 take(/\s(?:at\s+)?(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i,m=>{let hr=+m[1]%12+(m[3].toLowerCase()==="pm"?12:0);r.dueTime=pad(hr)+":"+(m[2]||"00");chips.push("⏰ "+r.dueTime)});
 take(/\s(\d{1,2}):(\d{2})\b/,m=>{r.dueTime=pad(+m[1])+":"+m[2];chips.push("⏰ "+r.dueTime)});
 take(/\sat\s(\d{1,2})\b/i,m=>{r.dueTime=pad(+m[1])+":00";chips.push("⏰ "+r.dueTime)});
 if(r.dueTime&&!r.dueDate){r.dueDate=T0}
 if(rm){if(!r.dueDate)r.dueDate=T0;if(!r.reminders)r.reminders=[{id:uid(),type:"relative",offsetMinutes:0,fired:false}]}
 r.title=t.replace(/\s+/g," ").trim();return{r,chips}}
/* ============ Task Actions ============ */
function snap(){hist.push(JSON.stringify({tasks:S.tasks,settings:S.settings,columns:S.columns,reminders:S.reminders}));if(hist.length>20)hist.shift()}
function mutate(fn,msg){snap();fn();save();render();if(msg)toast(msg,true)}
function undo(){if(!hist.length)return toast("Nothing to undo");{const p=JSON.parse(hist.pop());S.tasks=p.tasks;S.settings=p.settings;S.columns=p.columns;S.reminders=p.reminders||[]}save();render();toast("Undone")}
function nextDue(t){const r=t.recurrence,iv=r.interval||1,b=t.dueDate||(t.scheduledStart&&t.scheduledStart.slice(0,10))||today();if(r.freq==="daily")return addDays(b,iv);
 if(r.freq==="monthly"){const d=fromISO(b),day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+iv);d.setDate(Math.min(day,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()));return iso(d)}
 const dw=r.daysOfWeek&&r.daysOfWeek.length?r.daysOfWeek:[fromISO(b).getDay()];
 for(let i=1;i<=7;i++){const c=addDays(b,i);if(wk(c)!==wk(b))break;if(dw.includes(fromISO(c).getDay()))return c}
 const nw=addDays(wk(b),7*iv);for(let i=0;i<7;i++){const c=addDays(nw,i);if(dw.includes(fromISO(c).getDay()))return c}return addDays(b,7*iv)}
function setStatus(t,s){if(t.status===s)return;if(s===S.columns[S.columns.length-1].id){const b=openDeps(t);if(b.length){toast("Waiting on: "+b.map(x=>x.title).join(", "));return}}const n=now(),last=S.columns[S.columns.length-1].id;t.status=s;t.history.push({status:s,at:n});t.updatedAt=n;
 if(s==="in-progress"&&!t.startedAt)t.startedAt=n;
 if(s===last){t.completedAt=n;if(t.recurrence){const c=mk(t.title,Object.assign({},t,{id:uid(),status:S.columns[0].id,completedAt:null,startedAt:null,dueDate:nextDue(t),scheduledStart:t.scheduledStart?stamp(nextDue(t),mins(t.scheduledStart)):null,scheduledEnd:t.scheduledEnd?stamp(nextDue(t),mins(t.scheduledEnd)):null,actualMinutes:0,history:[{status:S.columns[0].id,at:n}],createdAt:n,subtasks:t.subtasks.map(x=>({...x,id:uid(),done:false})),reminders:t.reminders.map(x=>({...x,id:uid(),fired:false}))}));S.tasks.push(c);t.recurrence=null}}else t.completedAt=null}
const toggle=t=>mutate(()=>setStatus(t,t.status==="done"?S.columns[0].id:S.columns[S.columns.length-1].id));
function addTask(o){const t=mk(o.title,o);S.tasks.push(t);return t}
function visible(){const q=ui.q.toLowerCase();return S.tasks.filter(t=>!t.archived&&(!q||(t.title+" "+t.category+" "+t.tags.join(" ")).toLowerCase().includes(q))&&(!ui.cat||t.category===ui.cat))}
/* ============ Reminders ============ */
function remTime(t,r){if(!t.dueDate)return null;const [hh,mm]=(t.dueTime||"09:00").split(":").map(Number),d=fromISO(t.dueDate);d.setHours(hh,mm,0,0);return new Date(d.getTime()-r.offsetMinutes*6e4)}
function upcomingRem(){const out=[];S.tasks.forEach(t=>t.status!=="done"&&t.reminders.forEach(r=>{const w=remTime(t,r);if(w&&!r.fired)out.push({t,r,w})}));return out.sort((a,b)=>a.w-b.w)}
function relT(ms){const m=Math.round(ms/6e4),a=Math.abs(m),s=a<60?a+"m":a<1440?Math.round(a/60)+"h":Math.round(a/1440)+"d";return m>=0?"in "+s:s+" ago"}
/* ============ Shared view bits ============ */
function empty(m){return h("div",{class:"empty"},m)}
const prSort=(a,b)=>PR.indexOf(b.priority)-PR.indexOf(a.priority);
/* ============ Views ============ */
function vKanban(){const V=visible(),B=h("div",{class:"board"});
 COLS().forEach(c=>{const items=V.filter(t=>t.status===c.id),w=c.wip&&items.length>c.wip;
  const col=h("div",{class:"col"+(w?" wip":""),ondragover:e=>{e.preventDefault();col.classList.add("over")},ondragleave:()=>col.classList.remove("over"),ondrop:e=>{e.preventDefault();if(!drag)return;const t=drag;drag=null;if(c.wip&&S.settings.hardWip&&items.length>=c.wip&&t.status!==c.id)return toast("WIP limit reached");mutate(()=>setStatus(t,c.id))}});
  col.append(h("h4",{},h("span",{},c.name),h("span",{class:w?"warn":"mut"},items.length+(c.wip?"/"+c.wip:""))));if(w)col.append(h("div",{class:"warn"},"⚠ Over WIP limit"));
  items.slice(0,60).forEach(t=>{const age=Math.floor((Date.now()-new Date(t.history[t.history.length-1].at))/864e5),stale=age>=S.settings.staleDays&&c.id!=="done";
   col.append(h("div",{class:"kc",draggable:true,ondragstart:()=>{drag=t},style:"border-left-color:var(--"+(t.priority==="urgent"?"red":t.priority==="high"?"amb":"blue")+")"},
    h("div",{style:"cursor:pointer",onclick:()=>openTask(t)},t.title),h("small",{},PSYM[t.priority]+" "+t.priority+" · "+t.category+(t.dueDate?" · "+dueLabel(t):"")),
    h("small",{},"age "+age+"d"+(stale?" ⚠ stale":"")+(t.blocked||openDeps(t).length?" · ⛔ blocked"+(openDeps(t).length?" by "+openDeps(t).length:""):"")+(t.subtasks.length?" · ☑ "+t.subtasks.filter(s=>s.done).length+"/"+t.subtasks.length:"")),
    h("select",{"aria-label":"Move "+t.title+" to",onchange:e=>mutate(()=>setStatus(t,e.target.value))},COLS().map(k=>h("option",{value:k.id,selected:k.id===t.status},"Move to: "+k.name)))))});
  if(items.length>60)col.append(h("div",{class:"mut sm"},"+"+(items.length-60)+" more hidden. Open To-Do to see them all."));const inp=h("input",{placeholder:"+ Add card",style:"width:100%","aria-label":"Add card to "+c.name,onkeydown:e=>{if(e.key==="Enter"&&inp.value.trim()){const v=inp.value.trim();mutate(()=>addTask({title:v,status:c.id}),"Card added")}}});
  col.append(inp);B.append(col)});
 return B}
function addInline(label,make){const inp=h("input",{placeholder:"+ "+label,"aria-label":label,style:"width:100%;margin-top:8px",onkeydown:e=>{if(e.key==="Enter"&&inp.value.trim()){const v=inp.value.trim();mutate(()=>make(v),"Task added")}}});return inp}
function vMatrix(){const V=visible().filter(t=>t.status!=="done"),Q=[["Do first","urgent + important",true,true],["Schedule","important, not urgent",true,false],["Delegate","urgent, not important",false,true],["Eliminate","neither",false,false]];
 const g=h("div",{class:"mx"});
 Q.forEach(([n,d,i,u])=>{const q=h("div",{class:"card q",ondragover:e=>{e.preventDefault();q.classList.add("over")},ondragleave:()=>q.classList.remove("over"),ondrop:e=>{e.preventDefault();if(drag){const t=drag;drag=null;mutate(()=>{t.important=i;t.urgent=u})}}},h("h3",{},n+" "),h("div",{class:"mut"},d));
  const l=V.filter(t=>t.important===i&&t.urgent===u);l.length?l.forEach(t=>q.append(h("div",{class:"kc",draggable:true,onclick:()=>openTask(t),ondragstart:()=>{drag=t;dragOff=0}},t.title))):q.append(empty("Drag a task here"));q.append(addInline("Add task to "+n,v=>addTask({title:v,important:i,urgent:u})));g.append(q)});
 const un=V.filter(t=>t.important===null||t.urgent===null);
 const pool=h("div",{class:"card",style:"margin-top:12px"},h("h3",{},"Unclassified ("+un.length+")"),h("button",{class:"pri",onclick:()=>mutate(()=>{V.forEach(t=>{if(t.important===null||t.urgent===null){t.important=PR.indexOf(t.priority)>=2;t.urgent=!!t.dueDate&&t.dueDate<=addDays(today(),2)}})},"Auto-classified by priority and due date. Drag to override.")},"Auto-classify"));
 un.forEach(t=>pool.append(h("div",{class:"kc",draggable:true,onclick:()=>openTask(t),ondragstart:()=>{drag=t;dragOff=0}},t.title)));
 return h("div",{},g,pool)}
/* ============ Helpers (v2) ============ */
const wk=d=>addDays(d,-((fromISO(d).getDay()+6)%7));
const ld=s=>iso(new Date(s));
const dl=(name,text,type)=>{const a=h("a",{href:URL.createObjectURL(new Blob([text],{type})),download:name});document.body.append(a);a.click();a.remove()};
const PCOL={low:"#8a96c4",medium:"#6f8cff",high:"#ffb84d",urgent:"#ff5d6c"},PAL=["#4169e1","#3ddc97","#ffb84d","#c77dff","#ff7a90","#40c4ff","#e0e060"];
const col=t=>ui.colorBy==="priority"?PCOL[t.priority]:PAL[[...t.category].reduce((a,c)=>a+c.charCodeAt(0),0)%PAL.length];
const sv=(tag,a={},...c)=>{const e=document.createElementNS("http://www.w3.org/2000/svg",tag);for(const k in a)e.setAttribute(k,a[k]);c.flat().forEach(x=>x!=null&&e.append(x));return e};
const fd=ms=>{const m=ms/6e4;return m<60?Math.round(m)+"m":m<2880?(m/60).toFixed(1)+"h":(m/1440).toFixed(1)+"d"};
const HH=48,SNAP=15;
const mins=s=>+s.slice(11,13)*60+ +s.slice(14,16);
const stamp=(day,m)=>day+"T"+pad(Math.floor(m/60))+":"+pad(m%60);
const durOf=t=>Math.max(SNAP,t.scheduledEnd?mins(t.scheduledEnd)-mins(t.scheduledStart):(t.estimateMinutes||60));
let dragOff=0;
const openDeps=t=>t.dependsOn.map(id=>S.tasks.find(x=>x.id===id)).filter(x=>x&&x.status!=="done"&&!x.archived);
const cyc=(x,id,seen=new Set())=>x.dependsOn.some(i=>{if(i===id)return true;if(seen.has(i))return false;seen.add(i);const y=S.tasks.find(z=>z.id===i);return !!y&&cyc(y,id,seen)});
function occ(t,day){if(!t.scheduledStart||t.archived)return 0;const b=t.scheduledStart.slice(0,10);if(day===b)return 1;const r=t.recurrence;if(!r||day<b||(r.endDate&&day>r.endDate))return 0;
 const iv=r.interval||1,A=fromISO(day),B=fromISO(b),dd=Math.round((A-B)/864e5);
 if(r.freq==="daily")return dd%iv===0?2:0;
 if(r.freq==="monthly")return A.getDate()===B.getDate()&&((A.getFullYear()-B.getFullYear())*12+A.getMonth()-B.getMonth())%iv===0?2:0;
 const wks=Math.round((fromISO(wk(day))-fromISO(wk(b)))/6048e5);
 return wks%iv===0&&(r.daysOfWeek&&r.daysOfWeek.length?r.daysOfWeek:[B.getDay()]).includes(A.getDay())?2:0}
function dayItems(d){const out=[];S.tasks.forEach(t=>{if(t.archived)return;const o=occ(t,d);if(o)out.push({t,kind:"s",m:mins(t.scheduledStart),rep:o===2});else if(t.dueDate===d&&t.status!=="done")out.push({t,kind:"d",m:2000})});return out.sort((a,b)=>a.m-b.m)}
function weekUsed(sd){let u=0;const s=wk(sd);for(let i=0;i<7;i++){const d=addDays(s,i);S.tasks.forEach(t=>{if(occ(t,d))u+=durOf(t)})}return u}
/* ============ Task detail modal ============ */
function openTask(t,isNew){const d=structuredClone(t),dlg=$("#dlg");dlg.className="bigd";
 const F=(l,el)=>h("label",{class:"f"},h("span",{class:"mut sm"},l),el);
 const sel=(opts,val,fn)=>h("select",{onchange:e=>fn(e.target.value)},opts.map(([v,n])=>h("option",{value:v,selected:v===val},n)));
 const tri=v=>v===true?"y":v===false?"n":"",T3=[["","Unset"],["y","Yes"],["n","No"]],un=v=>v==="y"?true:v==="n"?false:null;
 const ol=m=>(m>=1440&&m%1440===0?m/1440+"d":m>=60&&m%60===0?m/60+"h":m+"m")+" before due";
 const subBox=h("div"),remBox=h("div"),depBox=h("div");
 const drawSubs=()=>subBox.replaceChildren(...d.subtasks.map((s,i)=>h("div",{class:"mini"},h("input",{type:"checkbox",checked:s.done,"aria-label":"Subtask done",onchange:e=>{s.done=e.target.checked}}),h("span",{class:"lnk"},s.title),
  h("button",{"aria-label":"Move up",onclick:()=>{if(i){[d.subtasks[i-1],d.subtasks[i]]=[d.subtasks[i],d.subtasks[i-1]];drawSubs()}}},"↑"),
  h("button",{"aria-label":"Move down",onclick:()=>{if(i<d.subtasks.length-1){[d.subtasks[i+1],d.subtasks[i]]=[d.subtasks[i],d.subtasks[i+1]];drawSubs()}}},"↓"),
  h("button",{"aria-label":"Remove subtask",onclick:()=>{d.subtasks.splice(i,1);drawSubs()}},"✕"))));
 const drawRem=()=>remBox.replaceChildren(...d.reminders.map((r,i)=>h("div",{class:"mini"},h("span",{class:"lnk"},"🔔 "+ol(r.offsetMinutes)+(r.fired?" (fired)":"")),h("button",{"aria-label":"Remove reminder",onclick:()=>{d.reminders.splice(i,1);drawRem()}},"✕"))));
 const others=S.tasks.filter(x=>x.id!==d.id&&!x.archived);
 const drawDeps=()=>depBox.replaceChildren(...d.dependsOn.map((id,i)=>{const x=S.tasks.find(y=>y.id===id);return h("div",{class:"mini"},h("span",{class:"lnk"},"⛓ "+(x?x.title:"(deleted task)")),h("button",{"aria-label":"Remove dependency",onclick:()=>{d.dependsOn.splice(i,1);drawDeps()}},"✕"))}));
 drawSubs();drawRem();drawDeps();
 const subIn=h("input",{placeholder:"Add subtask, press Enter",onkeydown:e=>{if(e.key==="Enter"&&subIn.value.trim()){d.subtasks.push({id:uid(),title:subIn.value.trim(),done:false});subIn.value="";drawSubs()}}});
 let rp=30;const rSel=sel([["10","10 min"],["30","30 min"],["60","1 hour"],["1440","1 day"]],"30",v=>{rp=+v});
 const rk=r=>!r?"":r.freq==="custom"?"weekday":r.freq;
 let iv=d.recurrence?d.recurrence.interval||1:1;const setRec=v=>{const b=d.dueDate?fromISO(d.dueDate).getDay():new Date().getDay();d.recurrence=!v?null:v==="weekday"?{freq:"custom",interval:iv,daysOfWeek:[1,2,3,4,5],endDate:null}:{freq:v,interval:iv,daysOfWeek:v==="weekly"?[b]:[],endDate:null}};
 const dsel=sel([["","Add dependency…"],...others.filter(x=>!cyc(x,d.id)).map(x=>[x.id,x.title])],"",v=>{if(v&&!d.dependsOn.includes(v)){d.dependsOn.push(v);drawDeps()}});
 const title=h("input",{value:d.title,"aria-label":"Title",oninput:e=>{d.title=e.target.value}});
 const save=()=>{if(!d.title.trim())return toast("Title is required");d.title=d.title.trim();d.updatedAt=now();const ns=d.status;d.status=t.status;
  mutate(()=>{Object.assign(t,d);if(isNew)S.tasks.push(t);if(ns!==t.status)setStatus(t,ns)},isNew?"Created":"Saved");dlg.close()};
 dlg.replaceChildren(h("h3",{},isNew?"New task":"Edit task"),F("Title",title),
  F("Description",h("textarea",{rows:3,oninput:e=>{d.description=e.target.value}},d.description)),
  h("div",{class:"two"},F("Category",h("input",{value:d.category,oninput:e=>{d.category=e.target.value.trim().toLowerCase()||"inbox"}})),F("Tags (comma separated)",h("input",{value:d.tags.join(", "),oninput:e=>{d.tags=e.target.value.split(",").map(s=>s.trim().replace(/^@/,"")).filter(Boolean)}})),
   F("Priority",sel(PR.map(p=>[p,p]),d.priority,v=>{d.priority=v})),F("Status",sel(COLS().map(c=>[c.id,c.name]),d.status,v=>{d.status=v})),
   F("Due date",h("input",{type:"date",value:d.dueDate||"",oninput:e=>{d.dueDate=e.target.value||null}})),F("Due time",h("input",{type:"time",value:d.dueTime||"",oninput:e=>{d.dueTime=e.target.value||null}})),
   F("Estimate (minutes)",h("input",{type:"number",min:0,value:d.estimateMinutes??"",oninput:e=>{d.estimateMinutes=e.target.value?+e.target.value:null}})),F("Actual minutes",h("input",{type:"number",min:0,value:d.actualMinutes,oninput:e=>{d.actualMinutes=+e.target.value||0}})),
   F("Scheduled start",h("input",{type:"datetime-local",value:d.scheduledStart||"",oninput:e=>{d.scheduledStart=e.target.value||null;if(!d.scheduledStart)d.scheduledEnd=null;else if(!d.scheduledEnd||d.scheduledEnd<=d.scheduledStart)d.scheduledEnd=stamp(d.scheduledStart.slice(0,10),Math.min(1440,mins(d.scheduledStart)+(d.estimateMinutes||60)))}})),
   F("Scheduled end",h("input",{type:"datetime-local",value:d.scheduledEnd||"",oninput:e=>{d.scheduledEnd=e.target.value||null}})),
   F("Repeats",sel([["","Never"],["daily","Daily"],["weekday","Weekdays"],["weekly","Weekly"],["monthly","Monthly"]],rk(d.recurrence),setRec)),F("Repeat every N",h("input",{type:"number",min:1,max:99,value:iv,oninput:e=>{iv=Math.max(1,+e.target.value||1);if(d.recurrence)d.recurrence.interval=iv}})),F("Blocked",sel([["n","No"],["y","Yes"]],d.blocked?"y":"n",v=>{d.blocked=v==="y"})),
   F("Important",sel(T3,tri(d.important),v=>{d.important=un(v)})),F("Urgent",sel(T3,tri(d.urgent),v=>{d.urgent=un(v)}))),
  h("h4",{},"Subtasks"),subBox,subIn,h("h4",{},"Reminders"),remBox,h("div",{class:"bar"},rSel,h("button",{onclick:()=>{d.reminders.push({id:uid(),type:"relative",offsetMinutes:rp,fired:false});drawRem()}},"Add reminder")),
  h("h4",{},"Dependencies"),depBox,dsel,
  h("p",{class:"mut sm"},"Created "+new Date(d.createdAt).toLocaleString()+" · Updated "+new Date(d.updatedAt).toLocaleString()+(d.completedAt?" · Completed "+new Date(d.completedAt).toLocaleString():"")),
  h("div",{class:"bar"},h("button",{class:"pri",onclick:save},"Save"),h("button",{onclick:()=>dlg.close()},"Cancel"),
   isNew?null:[h("button",{onclick:()=>{dlg.close();mutate(()=>{const c=structuredClone(t);c.id=uid();c.title+=" (copy)";c.reminders.forEach(r=>{r.id=uid();r.fired=false});S.tasks.push(c)},"Duplicated")}},"Duplicate"),
   h("button",{onclick:()=>{dlg.close();mutate(()=>{t.archived=!t.archived},t.archived?"Archived":"Restored")}},t.archived?"Unarchive":"Archive"),
   h("button",{onclick:()=>{if(confirm("Delete this task?")){dlg.close();mutate(()=>{S.tasks=S.tasks.filter(x=>x!==t);S.tasks.forEach(x=>{x.dependsOn=x.dependsOn.filter(i=>i!==t.id)})},"Deleted")}}},"Delete")]));
 dlg.showModal();title.focus()}
function openSettings(){const d=$("#dlg"),s=S.settings;d.className="";
 const num=(k,min,max)=>h("input",{type:"number",min,max,value:s[k],style:"width:80px",onchange:e=>{snap();s[k]=Math.max(min,Math.min(max,+e.target.value||s[k]));save();render()}});
 d.replaceChildren(h("h3",{},"Settings"),h("label",{class:"f"},"Working hours start (hour)",num("workStart",0,23)),h("label",{class:"f"},"Working hours end (hour)",num("workEnd",1,24)),h("label",{class:"f"},"Mark Kanban cards stale after (days)",num("staleDays",1,90)),
  h("label",{class:"mini"},h("input",{type:"checkbox",checked:s.hardWip,onchange:e=>{snap();s.hardWip=e.target.checked;save()}}),"Hard WIP limits (block moves into full columns)"),
  h("div",{class:"bar",style:"margin-top:10px"},h("button",{onclick:()=>{if(!window.Notification)return toast("Notifications not supported here");Notification.requestPermission().then(p=>toast("Notifications: "+p))}},"Enable desktop notifications")),
  h("h4",{},"Data"),h("div",{class:"bar"},h("button",{onclick:()=>{d.close();$("#exp").click()}},"Export file"),h("button",{onclick:()=>{d.close();$("#imp").click()}},"Import file"),h("button",{onclick:()=>{const x=JSON.stringify(S);navigator.clipboard?navigator.clipboard.writeText(x).then(()=>toast("Copied")).catch(()=>prompt("Copy:",x)):prompt("Copy:",x)}},"Copy JSON"),h("button",{onclick:()=>{const x=prompt("Paste exported JSON");if(!x)return;try{const y=migrate(JSON.parse(x));if(confirm("Replace "+S.tasks.length+" tasks with "+y.tasks.length+"?")){S=y;hist=[];saveNow();d.close();render();toast("Imported")}}catch(e){toast("Invalid JSON")}}},"Paste JSON"),h("button",{onclick:()=>{d.close();$("#demo").click()}},"Reset demo data")),h("p",{class:"mut sm"},"Reminders only fire while this app is open in a browser tab (no backend)."),h("button",{class:"pri",onclick:()=>d.close()},"Done"));d.showModal()}
/* ============ Overview ============ */
function miniRow(t,chk){return h("div",{class:"mini"},chk?h("input",{type:"checkbox",checked:t.status==="done","aria-label":"Complete "+t.title,onchange:()=>toggle(t)}):h("span",{class:"p-"+t.priority,title:"Priority "+t.priority},PSYM[t.priority]),h("button",{class:"lnk",title:t.title,onclick:()=>openTask(t)},t.title),h("span",{class:"mut sm"},t.dueDate?dueLabel(t):""))}
function blockList(title,cls,arr,max,chk){return h("div",{},h("div",{class:"bh "+cls},title+" ("+arr.length+")"),arr.length?arr.slice(0,max).map(t=>miniRow(t,chk)):h("div",{class:"mut sm"},"None"),arr.length>max?h("div",{class:"mut sm"},"+"+(arr.length-max)+" more"):null)}
const cardHead=(n,tab)=>h("h3",{},h("button",{class:"lnk",style:"font-weight:600;color:var(--glow)",onclick:()=>{ui.tab=tab;openTab()}},n+" →"));
function ringSvg(pct){const C=2*Math.PI*44,r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox","0 0 110 110");r.setAttribute("class","ring");r.setAttribute("role","img");r.setAttribute("aria-label",pct+" percent done");
 r.innerHTML='<circle cx="55" cy="55" r="44" fill="none" stroke="#16224a" stroke-width="9"/><circle cx="55" cy="55" r="44" fill="none" stroke="#4169e1" stroke-width="9" stroke-linecap="round" stroke-dasharray="'+(C*pct/100)+" "+C+'" transform="rotate(-90 55 55)"/><text x="55" y="61" text-anchor="middle" fill="#e8ecff" font-size="20" font-weight="700">'+(+pct)+'%</text>';return r}
function doneByDay(n){const T0=today();return[...Array(n)].map((_,i)=>{const d=addDays(T0,i-n+1);return{d,v:S.tasks.filter(t=>!t.archived&&t.completedAt&&ld(t.completedAt)===d).length}})}
function streak(){const a=doneByDay(60).reverse();let i=a[0].v?0:1,n=0;while(i<a.length&&a[i].v){n++;i++}return n}
/* ============ Standalone reminders (not tied to any task) ============ */
const RREP=[["","Does not repeat"],["daily","Daily"],["weekdays","Weekdays"],["weekly","Weekly"],["monthly","Monthly"]];
const mkSel=(opts,val,fn)=>h("select",{onchange:e=>fn(e.target.value)},opts.map(([v,n])=>h("option",{value:v,selected:v===val},n)));
const nowStamp=()=>{const n=new Date();return iso(n)+"T"+pad(n.getHours())+":"+pad(n.getMinutes())};   // "YYYY-MM-DDTHH:MM" in LOCAL time; strings of this shape sort correctly
const stampOf=ms=>{const n=new Date(ms);return iso(n)+"T"+pad(n.getHours())+":"+pad(n.getMinutes())};
const nextHour=()=>{const n=new Date();n.setMinutes(0,0,0);n.setHours(n.getHours()+1);return stampOf(n)};
function stepDay(x,rp){if(rp==="daily")return addDays(x,1);if(rp==="weekly")return addDays(x,7);
 if(rp==="weekdays"){let y=addDays(x,1);while([0,6].includes(fromISO(y).getDay()))y=addDays(y,1);return y}
 const d=fromISO(x),day=d.getDate();d.setDate(1);d.setMonth(d.getMonth()+1);d.setDate(Math.min(day,new Date(d.getFullYear(),d.getMonth()+1,0).getDate()));return iso(d)}
function nextAt(at,rp){const tm=at.slice(10);let d=stepDay(at.slice(0,10),rp);for(let i=0;i<4000&&d+tm<=nowStamp();i++)d=stepDay(d,rp);return d+tm}
function remWhen(at){const n=Math.round((fromISO(at.slice(0,10))-fromISO(today()))/864e5);return(n===0?"Today":n===1?"Tomorrow":n===-1?"Yesterday":fromISO(at.slice(0,10)).toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"}))+", "+at.slice(11)}
const mkRem=(o={})=>Object.assign({id:uid(),title:"",note:"",at:nextHour(),repeat:"",done:false,fired:false,createdAt:now()},o);
const remDue=r=>!r.done&&r.at<=nowStamp();
function completeRem(r){if(r.repeat&&!r.done){r.at=nextAt(r.at,r.repeat);r.fired=false;return}r.done=!r.done;r.fired=r.done||r.at<=nowStamp()}
function snooze(r,v){r.at=v==="tom"?addDays(today(),1)+"T09:00":stampOf(Date.now()+ +v*6e4);r.done=false;r.fired=false}
function fireRem(r){if(r.repeat){r.at=nextAt(r.at,r.repeat);r.fired=false}else r.fired=true}
function allRem(){const a=[];S.reminders.forEach(r=>{if(!r.done)a.push({k:"s",r,w:new Date(r.at)})});upcomingRem().forEach(x=>a.push({k:"t",t:x.t,w:x.w}));return a.sort((p,q)=>p.w-q.w)}
function notify(hits){toast("⏰ "+(hits.length===1?hits[0]:hits.length+" reminders: "+hits.slice(0,3).join(", ")));try{if(window.Notification&&Notification.permission==="granted")new Notification("Reminder",{body:hits.join("\n")})}catch(e){}}
function checkRem(){const hits=[],ns=nowStamp();
 TFH.all().forEach(v=>{const s=v.tf;if(!s||!Array.isArray(s.reminders))return;s.reminders.forEach(r=>{if(!r.done&&!r.fired&&r.at<=ns){hits.push(r.title+(s===S?"":" ("+v.name+")"));fireRem(r)}})});
 upcomingRem().forEach(({t,r,w})=>{if(w<=new Date()){r.fired=true;hits.push(t.title+" ("+dueLabel(t)+")")}});
 if(hits.length){notify(hits);saveNow();render()}}
function openReminder(r,isNew){const d=structuredClone(r),dlg=$("#dlg");dlg.className="";let D=d.at.slice(0,10),T=d.at.slice(11);
 const F=(l,el)=>h("label",{class:"f"},h("span",{class:"mut sm"},l),el);
 const title=h("input",{value:d.title,"aria-label":"Reminder text",oninput:e=>{d.title=e.target.value}});
 const save=()=>{const tt=d.title.trim();if(!tt)return toast("Write what to be reminded of");if(!D||!T)return toast("Pick a date and time");const at=D+"T"+T;if(at!==r.at&&at<=nowStamp())return toast("Pick a time in the future");
  mutate(()=>{Object.assign(r,d,{title:tt,at,fired:at<=nowStamp()});if(isNew)S.reminders.push(r)},isNew?"Reminder set":"Saved");dlg.close()};
 title.onkeydown=e=>{if(e.key==="Enter")save()};
 dlg.replaceChildren(h("h3",{},isNew?"New reminder":"Edit reminder"),F("Remind me to",title),
  h("div",{class:"two"},F("Date",h("input",{type:"date",value:D,oninput:e=>{D=e.target.value}})),F("Time",h("input",{type:"time",value:T,oninput:e=>{T=e.target.value}}))),
  F("Repeat",mkSel(RREP,d.repeat,v=>{d.repeat=v})),F("Note (optional)",h("textarea",{rows:2,oninput:e=>{d.note=e.target.value}},d.note)),
  h("div",{class:"bar"},h("button",{class:"pri",onclick:save},"Save"),h("button",{onclick:()=>dlg.close()},"Cancel"),
   isNew?null:h("button",{onclick:()=>{dlg.close();mutate(()=>{S.reminders=S.reminders.filter(x=>x!==r)},"Deleted")}},"Delete")));
 dlg.showModal();title.focus()}
function remForm(){const d0=nextHour();let D=d0.slice(0,10),T=d0.slice(11),rp="";
 const title=h("input",{placeholder:"Remind me to…","aria-label":"Reminder text"}),
  dI=h("input",{type:"date",value:D,"aria-label":"Reminder date",oninput:e=>{D=e.target.value}}),
  tI=h("input",{type:"time",value:T,"aria-label":"Reminder time",oninput:e=>{T=e.target.value}}),
  rS=mkSel(RREP,"",v=>{rp=v});rS.setAttribute("aria-label","Repeat");
 const setAt=s=>{D=s.slice(0,10);T=s.slice(11);dI.value=D;tI.value=T};
 const add=()=>{const tt=title.value.trim();if(!tt)return toast("Write what to be reminded of");if(!D||!T)return toast("Pick a date and time");const at=D+"T"+T;if(at<=nowStamp())return toast("Pick a time in the future");
  mutate(()=>S.reminders.push(mkRem({title:tt,at,repeat:rp})),"Reminder set for "+remWhen(at))};
 title.onkeydown=e=>{if(e.key==="Enter")add()};
 return h("div",{class:"remform"},title,h("div",{class:"rf2"},dI,tI,rS),
  h("div",{class:"bar"},[["In 10 min",()=>stampOf(Date.now()+6e5)],["In 1 hour",()=>stampOf(Date.now()+36e5)],["Tomorrow 9:00",()=>addDays(today(),1)+"T09:00"]].map(([l,f])=>h("button",{onclick:()=>setAt(f())},l)),h("button",{class:"pri",onclick:add},"＋ Add reminder")))}
function remRow(r){const due=remDue(r),rel=relT(new Date(r.at)-new Date());
 return h("tr",{class:r.done?"done":""},
  h("td",{class:"ck"},h("input",{type:"checkbox",checked:r.done,"aria-label":(r.done?"Mark pending: ":"Mark done: ")+r.title,onchange:()=>mutate(()=>completeRem(r),r.repeat&&!r.done?"Done. Next reminder scheduled.":undefined)})),
  h("td",{},h("span",{class:"tt"},r.title),r.note?h("span",{class:"sub"},r.note):null),
  h("td",{class:"n"},remWhen(r.at),h("span",{class:"sub"},r.done?"":(due?"Due ":"")+rel)),
  h("td",{class:"n"},r.repeat?"↻ "+r.repeat:"—"),
  h("td",{class:"act"},due&&!r.repeat?h("select",{"aria-label":"Snooze "+r.title,onchange:e=>{const v=e.target.value;if(v)mutate(()=>snooze(r,v),"Snoozed")}},[["","Snooze…"],["10","10 min"],["60","1 hour"],["tom","Tomorrow 9:00"]].map(([v,n])=>h("option",{value:v},n))):null,
   h("button",{class:"ic","aria-label":"Edit "+r.title,onclick:()=>openReminder(r)},"✎"),h("button",{class:"ic","aria-label":"Delete "+r.title,onclick:()=>mutate(()=>{S.reminders=S.reminders.filter(x=>x!==r)},"Deleted")},"✕")))}
function remTable(list){return h("div",{class:"tdwrap"},h("table",{class:"tdt"},h("thead",{},h("tr",{},[["Done",1],["Reminder"],["When"],["Repeats"],["Actions",1]].map(([x,v])=>h("th",{scope:"col"},v?h("span",{class:"vh"},x):x)))),h("tbody",{},list.map(remRow))))}
function vReminders(){const ns=nowStamp(),R=S.reminders,due=R.filter(r=>!r.done&&r.at<=ns).sort((a,b)=>a.at.localeCompare(b.at)),up=R.filter(r=>!r.done&&r.at>ns).sort((a,b)=>a.at.localeCompare(b.at)),dn=R.filter(r=>r.done).sort((a,b)=>b.at.localeCompare(a.at)),tl=upcomingRem();
 const sec=(t,...b)=>h("section",{class:"card"},h("h3",{},t),b.flat());
 return h("div",{class:"stack"},sec("New reminder",remForm()),
  due.length?sec("Needs attention ("+due.length+")",remTable(due)):null,
  sec("Upcoming ("+up.length+")",up.length?remTable(up):empty("Nothing upcoming. Set a reminder above.")),
  tl.length?sec("From your tasks ("+tl.length+")",tl.map(x=>h("div",{class:"mini"},h("button",{class:"lnk",onclick:()=>openTask(x.t)},"🔔 "+x.t.title),h("span",{class:"mut sm"},x.w.toLocaleString(undefined,{weekday:"short",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})+" · "+relT(x.w-new Date())))),h("div",{class:"mut sm",style:"margin-top:8px"},"These are set inside each task. Open a task to change them.")):null,
  dn.length?sec("Done ("+dn.length+")",remTable(dn.slice(0,10)),h("button",{style:"margin-top:12px",onclick:()=>mutate(()=>{S.reminders=S.reminders.filter(r=>!r.done)},"Cleared")},"Clear done")):null)}
/* ============ Overview sections (shared by the grid and the slideshow) ============ */
const ctx=()=>{const V=visible(),T0=today();if(!ui.pd)ui.pd=T0;return{V,T0,open:V.filter(t=>t.status!=="done")}};
const tile=(n,l)=>h("div",{class:"tile"},h("b",{},""+n),h("span",{class:"mut sm"},l));
function secTodo(big){const{V,T0,open}=ctx(),n=big?6:3,od=open.filter(overdue).sort(prSort),dueT=open.filter(t=>t.dueDate===T0).sort(prSort),doneT=V.filter(t=>t.completedAt&&ld(t.completedAt)===T0),nx=open.filter(t=>t.dueDate&&t.dueDate>T0&&t.dueDate<=addDays(T0,7)).sort((a,b)=>a.dueDate.localeCompare(b.dueDate));
 const p=[blockList("Overdue","red",od,n,true),blockList("Due today","blu",dueT,n,true)];if(big)p.push(blockList("Next 7 days","blu",nx,n,true));p.push(blockList("Completed today","grn",doneT,n,true));
 return h("div",{class:"card"},cardHead("To-Do","todo"),big?h("div",{class:"split2"},p):p)}
function secKanban(big){const{V}=ctx(),n=big?3:2;
 const cols=COLS().map(c=>{const it=V.filter(t=>t.status===c.id),w=c.wip&&it.length>c.wip;return h("div",{},h("div",{class:"bh "+(w?"warn":"")},c.name+" "+it.length+(c.wip?"/"+c.wip:"")+(w?" ⚠ over WIP":"")),h("div",{class:"track"},h("div",{class:"fill"+(w?" w":""),style:"width:"+(c.wip?Math.min(100,it.length/c.wip*100):Math.min(100,it.length*20))+"%"})),it.slice(0,n).map(t=>miniRow(t)),it.length>n?h("div",{class:"mut sm"},"+"+(it.length-n)+" more"):null)});
 return h("div",{class:"card"},cardHead("Kanban","kanban"),big?h("div",{class:"split4"},cols):cols)}
function secSched(big){const T0=today(),max=big?6:3,d0=new Date(),nm=d0.getHours()*60+d0.getMinutes(),up=[];
 for(let i=0;i<14;i++){const d=addDays(T0,i);S.tasks.forEach(t=>{if(t.status!=="done"&&occ(t,d)&&(i>0||mins(t.scheduledStart)>=nm))up.push({t,d,m:mins(t.scheduledStart)})});if(up.length>=max)break}
 up.sort((a,b)=>a.d.localeCompare(b.d)||a.m-b.m);const used=weekUsed(T0),cap=(S.settings.workEnd-S.settings.workStart)*300,ow=used>cap,unsch=S.tasks.filter(t=>!t.archived&&t.status!=="done"&&!t.scheduledStart).length;
 const add=()=>{const s=Math.min(1380,Math.max(S.settings.workStart*60,Math.ceil((nm+1)/60)*60));openTask(mk("",{scheduledStart:stamp(T0,s),scheduledEnd:stamp(T0,s+60),estimateMinutes:60}),true)};
 return h("div",{class:"card"},cardHead("Scheduler","scheduler"),h("div",{class:"bh blu"},"Next up"),up.length?up.slice(0,max).map(x=>h("div",{class:"mini"},h("span",{class:"mut sm"},(x.d===T0?"Today":fromISO(x.d).toLocaleDateString(undefined,{weekday:"short"}))+" "+stamp(x.d,x.m).slice(11)),h("button",{class:"lnk",onclick:()=>openTask(x.t)},x.t.title))):h("div",{class:"mut sm"},"Nothing scheduled. Drag a task onto the calendar."),
  h("div",{class:"bh "+(ow?"red":"")},"This week: "+(used/60).toFixed(1)+"h of "+(cap/60)+"h"+(ow?" ⚠ overbooked":"")),h("div",{class:"track"},h("div",{class:"fill"+(ow?" r":""),style:"width:"+Math.min(100,used/cap*100)+"%"})),
  big?h("div",{class:"bar",style:"margin:14px 0 0"},h("button",{class:"pri",onclick:add},"＋ Schedule a task"),h("span",{class:"mut sm"},unsch+" task"+(unsch===1?"":"s")+" still unscheduled")):null)}
function secMatrix(big){const{open}=ctx(),n=big?4:2,Q=[["Do first",true,true],["Schedule",true,false],["Delegate",false,true],["Eliminate",false,false]];
 const qs=Q.map(([nm,i,u])=>{const it=open.filter(t=>t.important===i&&t.urgent===u);return h("div",{style:"border:1px solid var(--line);border-radius:10px;padding:10px;background:var(--s2);min-width:0"},h("div",{class:"bh blu"},nm+" ("+it.length+")"),it.slice(0,n).map(t=>miniRow(t)),it.length>n?h("div",{class:"mut sm"},"+"+(it.length-n)+" more"):null)}),lb=(t,v)=>h("div",{class:"mut sm",style:"text-align:center;align-self:center;"+(v?"writing-mode:vertical-rl;transform:rotate(180deg)":"")},t);
 return h("div",{class:"card"},cardHead("Matrix","matrix"),h("div",{style:"display:grid;grid-template-columns:auto 1fr 1fr;gap:8px"},h("div"),lb("Urgent"),lb("Not urgent"),lb("Important",1),qs[0],qs[1],lb("Not important",1),qs[2],qs[3]))}
function secAnalytics(big){const n=big?14:7,dd=doneByDay(n),mx=Math.max(1,...dd.map(x=>x.v)),T0=today(),done7=doneByDay(7).reduce((a,x)=>a+x.v,0),made7=S.tasks.filter(t=>!t.archived&&ld(t.createdAt)>=addDays(T0,-6)).length,k=streak();
 return h("div",{class:"card"},cardHead("Analytics","analytics"),big?h("div",{class:"tiles",style:"margin-bottom:8px"},tile(done7,"completed (7d)"),tile(made7,"created (7d)"),tile(k+"d","streak"),tile(S.tasks.filter(t=>!t.archived&&overdue(t)).length,"overdue now")):null,
  h("div",{class:"bh grn"},"Completed, last "+n+" days"),h("div",{class:"spark",style:big?"height:100px":""},dd.map(x=>h("div",{title:x.d+": "+x.v,style:"height:"+(6+x.v/mx*(big?84:44))+"px"},h("span",{class:"sm"},x.v)))),h("div",{class:"mut sm",style:"margin-top:6px"},"Completion streak: "+k+" day"+(k===1?"":"s")))}
function secProgress(big){const{V,T0}=ctx(),day=ui.pd,rs=ui.pm==="week"?wk(day):day,re=ui.pm==="week"?addDays(wk(day),6):day;
 const inR=V.filter(t=>t.dueDate&&t.dueDate>=rs&&t.dueDate<=re).sort((a,b)=>a.dueDate.localeCompare(b.dueDate)||prSort(a,b)),done=inR.filter(t=>t.status==="done").length,pct=inR.length?Math.round(done/inR.length*100):0;
 const compl=S.tasks.filter(t=>!t.archived&&t.completedAt&&ld(t.completedAt)>=rs&&ld(t.completedAt)<=re).length,odR=inR.filter(overdue).length;
 const step=k=>()=>{ui.pd=addDays(ui.pd,k*(ui.pm==="week"?7:1));render()};
 const lbl=ui.pm==="week"?"Week of "+fromISO(rs).toLocaleDateString(undefined,{month:"short",day:"numeric"})+" – "+fromISO(re).toLocaleDateString(undefined,{month:"short",day:"numeric"}):fromISO(day).toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"})+(day===T0?" (today)":"");
 const strip=h("div",{class:"pstrip"},[...Array(7)].map((_,i)=>{const d=addDays(wk(day),i),it=V.filter(t=>t.dueDate===d),dn=it.filter(t=>t.status==="done").length,p=it.length?dn/it.length*100:0;
  return h("button",{"aria-pressed":String(ui.pm==="day"&&d===day),"aria-label":d+": "+dn+" of "+it.length+" done",title:d+": "+dn+"/"+it.length+" done",onclick:()=>{ui.pd=d;ui.pm="day";render()}},h("div",{class:"sm mut"},"MTWTFSS"[i]),h("b",{},+d.slice(8)),h("div",{class:"track"},h("div",{class:"fill",style:"width:"+p+"%"})),h("div",{class:"sm "+(d===T0?"p-medium":"mut")},dn+"/"+it.length))}));
 const ctl=h("div",{class:"bar seg"},h("button",{"aria-pressed":String(ui.pm==="day"),onclick:()=>{ui.pm="day";render()}},"Day"),h("button",{"aria-pressed":String(ui.pm==="week"),onclick:()=>{ui.pm="week";render()}},"Week"),h("button",{"aria-label":"Previous",onclick:step(-1)},"‹"),h("input",{type:"date","aria-label":"Pick a date",value:day,onchange:e=>{if(e.target.value){ui.pd=e.target.value;render()}}}),h("button",{onclick:step(1),"aria-label":"Next"},"›"),h("button",{onclick:()=>{ui.pd=T0;render()}},"Today"));
 const pg=h("div",{class:"pg"},h("div",{style:"text-align:center"},ringSvg(pct),h("div",{class:"sm mut"},lbl)),h("div",{style:"flex:1;min-width:200px"},h("div",{},h("b",{},done+" of "+inR.length)," due tasks done"),h("div",{class:"mut sm"},compl+" completed in this range (any due date)"),h("div",{class:odR?"red sm":"mut sm"},odR+" still overdue"),h("div",{style:"margin-top:10px"},strip)));
 const list=h("div",{class:"scroll",style:"margin-top:10px"},inR.length?inR.map(t=>miniRow(t,true)):empty("No tasks due in this range. Add one with Quick add, e.g. “Call Sam "+(day>T0?day:"tomorrow")+" 3pm”."));
 if(!big)return h("div",{class:"card wide"},h("h3",{},"Progress"),ctl,pg,list);
 const all=S.tasks.filter(t=>!t.archived),dnA=all.filter(t=>t.status==="done").length,cats={};all.forEach(t=>{const c=cats[t.category]=cats[t.category]||[0,0];c[1]++;if(t.status==="done")c[0]++});
 const catRows=Object.entries(cats).sort((a,b)=>b[1][1]-a[1][1]).slice(0,5).map(([c,[a,b]])=>h("div",{class:"mini"},h("span",{class:"sm",style:"width:90px;flex:none;overflow:hidden;text-overflow:ellipsis"},c),h("div",{class:"track",style:"flex:1"},h("div",{class:"fill",style:"width:"+(b?a/b*100:0)+"%"})),h("span",{class:"mut sm"},a+"/"+b)));
 return h("div",{class:"card"},cardHead("Progress","overview"),h("div",{class:"tiles",style:"margin-bottom:16px"},tile(dnA,"completed"),tile(all.length-dnA,"open"),tile(all.filter(t=>t.status!=="done"&&t.dueDate===T0).length,"due today"),tile(all.filter(overdue).length,"overdue"),tile(streak()+"d","streak")),
  h("div",{class:"split2"},h("div",{},ctl,pg),h("div",{},h("div",{class:"bh blu"},"By category"),catRows.length?catRows:h("div",{class:"mut sm"},"No tasks yet"),h("div",{class:"bh blu"},"Due in range"),list)))}
function secRem(big){const n=big?6:5,a=allRem(),due=S.reminders.filter(remDue).length;
 const rows=a.length?a.slice(0,n).map(x=>x.k==="s"?h("div",{class:"mini"},h("input",{type:"checkbox","aria-label":"Mark done: "+x.r.title,onchange:()=>mutate(()=>completeRem(x.r),x.r.repeat?"Done. Next reminder scheduled.":"Reminder done")}),h("button",{class:"lnk",title:"Edit reminder",onclick:()=>openReminder(x.r)},x.r.title),h("span",{class:"mut sm"},remWhen(x.r.at)+(x.r.repeat?" ↻":""))):h("div",{class:"mini"},h("span",{title:"Reminder inside a task"},"🔔"),h("button",{class:"lnk",onclick:()=>openTask(x.t)},x.t.title),h("span",{class:"mut sm"},relT(x.w-new Date())))):[empty("No reminders yet.")];
 return h("div",{class:"card"},cardHead("Reminders","reminders"),due?h("div",{class:"bh red"},due+" due now"):null,rows,a.length>n?h("div",{class:"mut sm",style:"margin-top:6px"},"+"+(a.length-n)+" more"):null,
  big?[h("div",{class:"bh blu",style:"margin-top:16px"},"Add a reminder"),remForm()]:h("div",{class:"mut sm",style:"margin-top:8px"},"Open reminders to add one."))}
function vOverview(){return h("div",{class:"grid ov"},secProgress(false),secTodo(false),secKanban(false),secSched(false),secMatrix(false),secAnalytics(false),secRem(false))}
/* ============ Netflix-style slideshow (Planning centre) ============ */
const SLIDES=[["Progress","overview",secProgress],["To-Do","todo",secTodo],["Kanban","kanban",secKanban],["Matrix","matrix",secMatrix],["Scheduler","scheduler",secSched],["Analytics","analytics",secAnalytics],["Reminders","reminders",secRem]];
function vCarousel(){const N=SLIDES.length,i=(((ui.slide||0)%N)+N)%N,changed=ui.shown!==i;ui.slide=i;ui.shown=i;
 const jump=k=>{ui.dir=k>=i?1:-1;ui.slide=(k+N)%N;render()};
 const refocus=()=>requestAnimationFrame(()=>{const t=ROOT&&ROOT.querySelector(".ct[aria-selected=true]");if(t)t.focus()});
 const tabs=SLIDES.map(([n],j)=>{const on=j===i;return h("button",{class:"ct",role:"tab",id:"ct"+j,"aria-selected":String(on),"aria-controls":"cbody",tabindex:on?0:-1,onclick:()=>{if(j!==i)jump(j)}},n,on?h("span",{class:"cf",onanimationend:()=>jump(i+1)}):null)});
 const body=h("div",{class:"cbody"+(changed?" enter":"")+(changed&&ui.dir<0?" back":""),id:"cbody",role:"tabpanel","aria-labelledby":"ct"+i},SLIDES[i][2](true));
 const bar=h("div",{class:"cbar"},h("button",{class:"cn","aria-label":"Previous slide",onclick:()=>jump(i-1)},"‹"),
  h("div",{class:"ctabs",role:"tablist","aria-label":"Task system sections",onkeydown:e=>{if(e.key==="ArrowRight"){e.preventDefault();jump(i+1);refocus()}else if(e.key==="ArrowLeft"){e.preventDefault();jump(i-1);refocus()}}},tabs),
  h("button",{class:"cn","aria-label":"Next slide",onclick:()=>jump(i+1)},"›"),
  h("button",{class:"cn pz","aria-pressed":String(!!ui.cp),title:"Pause or play the automatic slideshow",onclick:()=>{ui.cp=!ui.cp;render()}},ui.cp?"▶ Play":"❚❚ Pause"));
 return h("div",{class:"car"+(ui.cp?" paused":"")},bar,h("div",{class:"stage"},body))}

/* ============ To-Do ============ */
function startRename(t,title){const i=h("input",{value:t.title,"aria-label":"Rename"});let fin_=false;const fin=ok=>{if(fin_)return;fin_=true;if(ok&&i.value.trim())mutate(()=>{t.title=i.value.trim();t.updatedAt=now()});else render()};i.onkeydown=e=>{if(e.key==="Enter")fin(true);if(e.key==="Escape")fin(false)};i.onblur=()=>fin(true);title.replaceWith(i);i.focus();i.select()}
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
function todoRow(t){const dn=t.status==="done",sub=t.subtasks.length?t.subtasks.filter(s=>s.done).length+"/"+t.subtasks.length:"",
 notes=[t.blocked?"blocked":"",openDeps(t).length?"waits on "+openDeps(t).length:"",t.recurrence?"repeats":"",t.reminders.length?t.reminders.length+" reminder"+(t.reminders.length>1?"s":""):"",...t.tags.map(g=>"@"+g)].filter(Boolean).join(" · ");
 const title=h("span",{class:"tt",tabindex:0,title:"Double-click to rename",ondblclick:()=>startRename(t,title)},t.title);
 return h("tr",{class:dn?"done":""},
  h("td",{class:"ck"},h("input",{type:"checkbox",checked:dn,"aria-label":"Complete "+t.title,onchange:()=>toggle(t)})),
  h("td",{},title,notes?h("span",{class:"sub"},notes):null),
  h("td",{class:"n"},cap(t.priority)),h("td",{class:"n"},cap(t.category)),
  h("td",{class:"n"},t.dueDate?(overdue(t)?"Overdue · ":"")+dueLabel(t):"—"),
  h("td",{class:"n"},t.estimateMinutes?t.estimateMinutes+"m":"—"),h("td",{class:"n"},sub||"—"),
  h("td",{class:"act"},h("button",{class:"ic","aria-label":"Edit "+t.title,onclick:()=>openTask(t)},"✎"),h("button",{class:"ic","aria-label":"Delete "+t.title,onclick:()=>mutate(()=>{S.tasks=S.tasks.filter(x=>x!==t)},"Deleted")},"✕")))}
function vTodo(){const T0=today(),cats=[...new Set(S.tasks.map(t=>t.category))],V=ui.list==="archived"?S.tasks.filter(t=>t.archived):visible();
 const L={inbox:t=>t.status!=="done",today:t=>t.status!=="done"&&t.dueDate===T0,upcoming:t=>t.status!=="done"&&t.dueDate>T0&&t.dueDate<=addDays(T0,7),overdue:t=>overdue(t),nodate:t=>t.status!=="done"&&!t.dueDate,high:t=>t.status!=="done"&&PR.indexOf(t.priority)>=2,done:t=>t.status==="done",archived:()=>true};
 const so={priority:(a,b)=>prSort(a,b)||(a.dueDate||"9").localeCompare(b.dueDate||"9"),due:(a,b)=>(a.dueDate||"9").localeCompare(b.dueDate||"9"),created:(a,b)=>b.createdAt.localeCompare(a.createdAt),alpha:(a,b)=>a.title.localeCompare(b.title)};
 const list=V.filter(L[ui.list]).sort(so[ui.sort]);
 const gk={none:()=>"",category:t=>cap(t.category),priority:t=>cap(t.priority),due:t=>!t.dueDate?"No date":overdue(t)?"Overdue":t.dueDate===T0?"Today":"Later"}[ui.group];
 const groups={};list.slice(0,ui.limit).forEach(t=>(groups[gk(t)]=groups[gk(t)]||[]).push(t));
 const S_=(opts,val,fn,lab)=>h("select",{"aria-label":lab,onchange:e=>{fn(e.target.value);render()}},opts.map(([v,n])=>h("option",{value:v,selected:v===val},n)));
 const tb=h("tbody");Object.keys(groups).forEach(k=>{if(k)tb.append(h("tr",{class:"gr"},h("td",{colspan:8},k+" ("+groups[k].length+")")));groups[k].forEach(t=>tb.append(todoRow(t)))});
 const body=h("div",{class:"card"},list.length?h("div",{class:"tdwrap"},h("table",{class:"tdt"},h("thead",{},h("tr",{},[["Done",1],["Task"],["Priority"],["Category"],["Due"],["Est."],["Subtasks"],["Actions",1]].map(([x,v])=>h("th",{scope:"col"},v?h("span",{class:"vh"},x):x)))),tb)):empty("Nothing here. Press “＋ New task” to add one."));
 return h("div",{},h("div",{class:"bar"},S_([["inbox","Inbox (open)"],["today","Today"],["upcoming","Upcoming 7d"],["overdue","Overdue"],["nodate","No date"],["high","High priority"],["done","Completed"],["archived","Archived"]],ui.list,v=>{ui.list=v;ui.limit=150},"Smart list"),
  S_([["","All categories"],...cats.map(c=>[c,cap(c)])],ui.cat,v=>{ui.cat=v},"Category"),S_([["priority","Sort: priority"],["due","Sort: due date"],["created","Sort: newest"],["alpha","Sort: A–Z"]],ui.sort,v=>{ui.sort=v},"Sort"),
  S_([["none","No grouping"],["category","Group: category"],["priority","Group: priority"],["due","Group: due"]],ui.group,v=>{ui.group=v},"Group"),h("button",{class:"pri",onclick:()=>openTask(mk("",{}),true)},"＋ New task"),h("span",{class:"mut"},list.length+" tasks")),body,
  list.length>ui.limit?h("button",{style:"margin-top:12px",onclick:()=>{ui.limit+=150;render()}},"Show more ("+(list.length-ui.limit)+" hidden)"):null)}
/* ============ Scheduler ============ */
function vScheduler(){const T0=today(),v=ui.sv,sd=ui.sd||(ui.sd=T0);
 const shift=k=>{const d=fromISO(sd);if(v==="month")d.setMonth(d.getMonth()+k);else d.setDate(d.getDate()+k*(v==="week"?7:v==="agenda"?14:1));ui.sd=iso(d);render()};
 const seg=(id,n)=>h("button",{"aria-pressed":String(v===id),onclick:()=>{ui.sv=id;render()}},n);
 const label=v==="day"?fromISO(sd).toLocaleDateString(undefined,{weekday:"long",day:"numeric",month:"long"}):v==="week"?"Week of "+wk(sd):v==="month"?fromISO(sd).toLocaleDateString(undefined,{month:"long",year:"numeric"}):"Agenda from "+sd;
 const used=weekUsed(sd),cap=(S.settings.workEnd-S.settings.workStart)*300,ow=used>cap;
 const tools=h("div",{class:"bar seg"},seg("day","Day"),seg("week","Week"),seg("month","Month"),seg("agenda","Agenda"),h("button",{onclick:()=>shift(-1),"aria-label":"Previous"},"‹"),h("button",{onclick:()=>{ui.sd=T0;render()}},"Today"),h("button",{onclick:()=>shift(1),"aria-label":"Next"},"›"),h("b",{style:"align-self:center"},label),
  h("select",{"aria-label":"Color by",onchange:e=>{ui.colorBy=e.target.value;render()}},[["category","Color: category"],["priority","Color: priority"]].map(([a,b])=>h("option",{value:a,selected:ui.colorBy===a},b))),h("button",{onclick:exportICS},"Export .ics"));
 const capBar=h("div",{class:"card",style:"margin-bottom:10px;padding:8px 12px"},h("span",{class:ow?"red":"mut"},"Week capacity: "+(used/60).toFixed(1)+"h scheduled of "+(cap/60)+"h working time"+(ow?" ⚠ overbooked by "+((used-cap)/60).toFixed(1)+"h":"")),h("div",{class:"track"},h("div",{class:"fill"+(ow?" r":""),style:"width:"+Math.min(100,used/cap*100)+"%"})));
 const main=v==="month"?monthView():v==="agenda"?agendaView():timeGrid(v==="day"?[sd]:[...Array(7)].map((_,i)=>addDays(wk(sd),i)));
 return h("div",{},tools,capBar,h("div",{class:"sch"},h("div",{style:"flex:1;min-width:0"},main),sideList()))}
function sideList(){const un=S.tasks.filter(t=>!t.archived&&t.status!=="done"&&!t.scheduledStart).sort(prSort);
 const s=h("div",{class:"card side",ondragover:e=>e.preventDefault(),ondrop:e=>{e.preventDefault();if(drag&&drag.scheduledStart){const t=drag;drag=null;mutate(()=>{t.scheduledStart=null;t.scheduledEnd=null},"Unscheduled")}}},h("h3",{},"Unscheduled ("+un.length+")"),h("div",{class:"mut sm",style:"margin-bottom:6px"},"Drag onto the calendar. Drop a block here to unschedule it."));
 un.forEach(t=>s.append(h("div",{class:"kc",draggable:true,ondragstart:()=>{drag=t;dragOff=0},style:"border-left-color:"+col(t)},h("button",{class:"lnk",style:"display:block;width:100%",onclick:()=>openTask(t)},t.title),h("small",{},PSYM[t.priority]+" "+(t.estimateMinutes||60)+"m"+(t.dueDate?" · due "+dueLabel(t):"")))));
 if(!un.length)s.append(empty("All tasks are scheduled."));return s}
function timeGrid(days){const T0=today(),box=h("div",{class:"tg"});
 box.append(h("div",{class:"tgh"},h("div",{class:"gut"}),days.map(d=>h("div",{class:"dh"+(d===T0?" now":""),title:"Open day view",onclick:()=>{ui.sd=d;ui.sv="day";render()}},fromISO(d).toLocaleDateString(undefined,{weekday:"short",day:"numeric"})))));
 box.append(h("div",{class:"tgh"},h("div",{class:"gut sm"},"due"),days.map(d=>h("div",{class:"dh adc"},S.tasks.filter(t=>!t.archived&&t.status!=="done"&&t.dueDate===d).map(t=>h("button",{class:"mchip",style:"border-color:"+col(t),title:t.title,onclick:()=>openTask(t)},"⚑ "+t.title))))));
 const hrs=h("div",{class:"hrs",style:"height:"+24*HH+"px"},[...Array(24)].map((_,i)=>i?h("span",{style:"top:"+i*HH+"px"},pad(i)+":00"):null));
 const body=h("div",{class:"tgb"},hrs,days.map(dayCol));body.onscroll=()=>{ui.sy=body.scrollTop};requestAnimationFrame(()=>{body.scrollTop=ui.sy??Math.max(0,Math.min(new Date().getHours()-1,16))*HH});box.append(body);return box}
function yToMin(col,e,off){const r=col.getBoundingClientRect();return Math.round(((e.clientY-r.top)/HH*60-off)/SNAP)*SNAP}
function dayCol(d){const T0=today(),W=S.settings,c=h("div",{class:"dc",style:"height:"+24*HH+"px",
  ondragover:e=>e.preventDefault(),
  ondrop:e=>{e.preventDefault();if(!drag)return;const t=drag;drag=null;const dur=t.scheduledStart?durOf(t):(t.estimateMinutes||60),m=Math.max(0,Math.min(1440-dur,yToMin(c,e,dragOff)));mutate(()=>{t.scheduledStart=stamp(d,m);t.scheduledEnd=stamp(d,m+dur);t.updatedAt=now()},"Scheduled "+stamp(d,m).slice(11))},
  onclick:e=>{if(e.target!==c)return;const m=Math.max(0,Math.min(1380,Math.floor(yToMin(c,e,0)/SNAP)*SNAP));openTask(mk("",{scheduledStart:stamp(d,m),scheduledEnd:stamp(d,m+60),estimateMinutes:60}),true)}});
 c.append(h("div",{class:"off",style:"top:0;height:"+W.workStart*HH+"px"}),h("div",{class:"off",style:"top:"+W.workEnd*HH+"px;height:"+(24-W.workEnd)*HH+"px"}));
 const it=S.tasks.filter(t=>occ(t,d)).map(t=>({t,s:mins(t.scheduledStart),e:mins(t.scheduledStart)+durOf(t),rep:occ(t,d)===2})).sort((a,b)=>a.s-b.s);
 const cl=[];let end=-1;it.forEach(x=>{if(x.s>=end){cl.push([x]);end=x.e}else{cl[cl.length-1].push(x);end=Math.max(end,x.e)}});
 cl.forEach(g=>{const lanes=[];g.forEach(x=>{let i=lanes.findIndex(le=>le<=x.s);if(i<0){i=lanes.length;lanes.push(0)}lanes[i]=x.e;x.l=i});g.forEach(x=>{x.n=lanes.length})});
 it.forEach(x=>{const t=x.t;const el=h("div",{class:"ev"+(x.rep?" rep":"")+(t.status==="done"?" dn":""),draggable:!x.rep,tabindex:0,title:t.title+" "+stamp(d,x.s).slice(11)+"–"+stamp(d,Math.min(1440,x.e)).slice(11)+(x.n>1?" (overlaps)":"")+(x.rep?" (repeat)":""),
   style:"top:"+x.s/60*HH+"px;height:"+Math.max(18,(x.e-x.s)/60*HH-1)+"px;left:"+x.l/x.n*100+"%;width:calc("+100/x.n+"% - 2px);border-color:"+col(t),
   onclick:e=>{e.stopPropagation();openTask(t)},onkeydown:e=>{if(e.key==="Enter")openTask(t)},ondragstart:e=>{drag=t;dragOff=(e.clientY-el.getBoundingClientRect().top)/HH*60}},
   h("div",{class:"sm"},(x.n>1?"⚠ ":"")+(x.rep?"↻ ":"")+PSYM[t.priority]+" "+t.title),h("div",{class:"sm mut"},ui.sv==="day"?stamp(d,x.s).slice(11)+"–"+stamp(d,Math.min(1440,x.e)).slice(11)+" · "+t.category:t.category),
   x.rep?null:h("div",{class:"rz",title:"Drag to resize",onclick:e=>e.stopPropagation(),onpointerdown:e=>startResize(e,t,el,d,x.s)}));c.append(el)});
 if(d===T0){const n=new Date();c.append(h("div",{class:"nowl","data-now":1,style:"top:"+(n.getHours()*60+n.getMinutes())/60*HH+"px"}))}
 return c}
function startResize(e,t,el,day,s){e.preventDefault();e.stopPropagation();const y0=e.clientY,d0=durOf(t);let dur=d0;el.draggable=false;
 const mv=ev=>{dur=Math.max(SNAP,Math.min(1440-s,Math.round((d0+(ev.clientY-y0)/HH*60)/SNAP)*SNAP));el.style.height=(dur/60*HH-1)+"px"};
 const up=()=>{removeEventListener("pointermove",mv);removeEventListener("pointerup",up);el.draggable=true;if(dur!==d0)mutate(()=>{t.scheduledEnd=stamp(day,s+dur);t.estimateMinutes=dur;t.updatedAt=now()},"Resized to "+dur+"m")};
 addEventListener("pointermove",mv);addEventListener("pointerup",up)}
function updNow(){const n=new Date();(ROOT?ROOT.querySelectorAll("[data-now]"):[]).forEach(e=>{e.style.top=(n.getHours()*60+n.getMinutes())/60*HH+"px"})}
const chipBtn=x=>h("button",{class:"mchip",style:"border-color:"+col(x.t),title:x.t.title,onclick:()=>openTask(x.t)},(x.kind==="s"?stamp(ui.sd,x.m).slice(11)+" ":"⚑ ")+x.t.title);
function monthView(){const T0=today(),a=fromISO(ui.sd),first=iso(new Date(a.getFullYear(),a.getMonth(),1)),g=h("div",{class:"mon"});
 ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(n=>g.append(h("div",{class:"mut sm"},n)));
 for(let i=0;i<42;i++){const d=addDays(wk(first),i),items=dayItems(d),c=h("div",{class:"mc"+(d.slice(0,7)!==first.slice(0,7)?" dim":"")+(d===T0?" td":"")},h("button",{class:"lnk",onclick:()=>{ui.sd=d;ui.sv="day";render()}},""+(+d.slice(8))));
  items.slice(0,3).forEach(x=>c.append(h("button",{class:"mchip",style:"border-color:"+col(x.t),title:x.t.title,onclick:()=>openTask(x.t)},(x.kind==="s"?stamp(d,x.m).slice(11)+" ":"⚑ ")+x.t.title)));
  if(items.length>3)c.append(h("button",{class:"mchip",style:"border-color:var(--mut)",onclick:()=>{const dg=$("#dlg");dg.className="";dg.replaceChildren(h("h3",{},d),items.map(x=>miniRow(x.t)),h("button",{onclick:()=>dg.close()},"Close"));dg.showModal()}},"+"+(items.length-3)+" more"));g.append(c)}
 return g}
function agendaView(){const w=h("div",{class:"card"});let any=false;
 for(let i=0;i<30;i++){const d=addDays(ui.sd,i),items=dayItems(d);if(!items.length)continue;any=true;w.append(h("div",{class:"bh blu"},fromISO(d).toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"})),items.map(x=>h("div",{class:"mini"},h("span",{class:"mut sm",style:"width:70px"},x.kind==="s"?stamp(d,x.m).slice(11)+(x.rep?" ↻":""):"due"),h("button",{class:"lnk",onclick:()=>openTask(x.t)},x.t.title),h("span",{class:"mut sm"},x.t.category))))}
 if(!any)w.append(empty("Nothing scheduled or due in the next 30 days."));return w}
function exportICS(){const L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Taskflow//EN"],f=s=>s.replace(/[-:]/g,"")+"00",e=s=>s.replace(/([\\;,])/g,"\\$1").replace(/\n/g,"\\n"),Z=new Date().toISOString().replace(/[-:]/g,"").slice(0,15)+"Z",D=["SU","MO","TU","WE","TH","FR","SA"];
 const list=S.tasks.filter(t=>t.scheduledStart&&!t.archived);
 list.forEach(t=>{L.push("BEGIN:VEVENT","UID:"+t.id+"@taskflow","DTSTAMP:"+Z,"DTSTART:"+f(t.scheduledStart),"DTEND:"+f(t.scheduledEnd||stamp(t.scheduledStart.slice(0,10),Math.min(1440,mins(t.scheduledStart)+durOf(t)))),"SUMMARY:"+e(t.title));
  const r=t.recurrence;if(r)L.push("RRULE:INTERVAL="+(r.interval||1)+";"+(r.freq==="daily"?"FREQ=DAILY":r.freq==="monthly"?"FREQ=MONTHLY":"FREQ=WEEKLY;BYDAY="+((r.daysOfWeek&&r.daysOfWeek.length?r.daysOfWeek:[fromISO(t.scheduledStart.slice(0,10)).getDay()]).map(i=>D[i]).join(","))));L.push("END:VEVENT")});
 L.push("END:VCALENDAR");dl("taskflow-"+today()+".ics",L.join("\r\n"),"text/calendar");toast("Exported "+list.length+" events")}
/* ============ Analytics ============ */
function vAnalytics(){const n=ui.arange,T0=today(),all=S.tasks.filter(t=>!t.archived),dn=all.filter(t=>t.completedAt),days=[...Array(n)].map((_,i)=>addDays(T0,i-n+1));
 const per=doneByDay(n),W=620,H=150;
 const bars=(data)=>{const mx=Math.max(1,...data.map(x=>x.v)),bw=W/data.length,s=sv("svg",{viewBox:"0 0 "+W+" "+(H+18),class:"chart",role:"img","aria-label":"Tasks completed per day"});
  data.forEach((x,i)=>{const bh=x.v/mx*(H-14);s.append(sv("rect",{x:i*bw+2,y:H-bh,width:Math.max(2,bw-4),height:bh,rx:3,fill:"#4169e1"},sv("title",{},x.d+": "+x.v+" completed")),x.v?sv("text",{x:i*bw+bw/2,y:H-bh-3,"text-anchor":"middle"},""+x.v):null);if(i%Math.ceil(data.length/7)===0)s.append(sv("text",{x:i*bw+bw/2,y:H+12,"text-anchor":"middle"},x.d.slice(5)))});return s};
 const od=days.map(d=>({d,v:S.overdueLog[d]!==undefined?S.overdueLog[d]:all.filter(t=>t.dueDate&&t.dueDate<d&&ld(t.createdAt)<=d&&(!t.completedAt||ld(t.completedAt)>d)).length}));
 const line=()=>{const mx=Math.max(1,...od.map(x=>x.v)),dx=W/Math.max(1,od.length-1),s=sv("svg",{viewBox:"0 0 "+W+" "+(H+18),class:"chart",role:"img","aria-label":"Overdue tasks trend"}),pts=od.map((x,i)=>[i*dx,H-4-x.v/mx*(H-20)]);
  s.append(sv("polyline",{points:pts.map(p=>p.join(",")).join(" "),fill:"none",stroke:"#ff5d6c","stroke-width":2}));pts.forEach((p,i)=>s.append(sv("circle",{cx:p[0],cy:p[1],r:4,fill:"#ff5d6c"},sv("title",{},od[i].d+": "+od[i].v+" overdue")),i%Math.ceil(od.length/7)===0?sv("text",{x:p[0],y:H+12,"text-anchor":"middle"},od[i].d.slice(5)):null));return s};
 const split=(keys,fn,go)=>h("div",{},keys.map(k=>{const it=all.filter(t=>fn(t)===k),d=it.filter(t=>t.status==="done").length;return h("button",{class:"hb",title:k+": "+d+" done, "+(it.length-d)+" open. Click to filter.",onclick:()=>go(k)},h("span",{class:"hl"},k),h("span",{class:"track",style:"flex:1"},h("span",{class:"fill",style:"width:"+(it.length?d/it.length*100:0)+"%;display:block"})),h("span",{class:"sm mut"},d+"/"+it.length))}));
 const ea=dn.filter(t=>t.estimateMinutes&&t.actualMinutes),ratio=ea.length?ea.reduce((a,t)=>a+t.actualMinutes/t.estimateMinutes,0)/ea.length:0,mxE=Math.max(1,...ea.map(t=>Math.max(t.estimateMinutes,t.actualMinutes)));
 const cyc=dn.length?dn.reduce((a,t)=>a+(new Date(t.completedAt)-new Date(t.startedAt||t.createdAt)),0)/dn.length:0;
 const tin={};all.forEach(t=>t.history.forEach((x,i)=>{if(x.status==="done")return;const e=t.history[i+1]?new Date(t.history[i+1].at):new Date();(tin[x.status]=tin[x.status]||[]).push(e-new Date(x.at))}));
 const K=(v,l)=>h("div",{class:"card"},h("div",{class:"big"},v),h("div",{class:"mut sm"},l));
 return h("div",{},h("div",{class:"bar"},h("select",{"aria-label":"Range",onchange:e=>{ui.arange=+e.target.value;render()}},[7,14,30].map(x=>h("option",{value:x,selected:x===n},"Last "+x+" days")))),
  h("div",{class:"grid",style:"margin-bottom:12px"},K(per.reduce((a,x)=>a+x.v,0),"completed in range"),K(streak()+"d","completion streak"),K(dn.length?fd(cyc):"–","avg cycle time (start → done)"),K(ea.length?ratio.toFixed(2)+"×":"–","actual ÷ estimate")),
  h("div",{class:"grid"},h("div",{class:"card wide"},h("h3",{},"Completed per day"),bars(per)),h("div",{class:"card wide"},h("h3",{},"Overdue trend (recorded daily while the app is open; older days estimated)"),line()),
   h("div",{class:"card"},h("h3",{},"By category (done / total)"),split([...new Set(all.map(t=>t.category))],t=>t.category,k=>{ui.cat=k;ui.list="inbox";ui.tab="todo";render()})),
   h("div",{class:"card"},h("h3",{},"By priority (done / total)"),split(PR,t=>t.priority,k=>{ui.cat="";ui.list="high";ui.tab="todo";render()})),
   h("div",{class:"card wide"},h("h3",{},"Estimate vs actual"),ea.length?[h("div",{class:ratio>1.15?"warn":"mut"},ratio>1.15?"Planning fallacy: tasks take "+Math.round((ratio-1)*100)+"% longer than you estimate on average.":ratio<.85?"You overestimate: tasks finish ~"+Math.round((1-ratio)*100)+"% faster than planned.":"Your estimates are close to reality."),h("div",{class:"scroll"},ea.slice(0,10).map(t=>h("button",{class:"hb",onclick:()=>openTask(t),title:"estimate "+t.estimateMinutes+"m, actual "+t.actualMinutes+"m"},h("span",{class:"hl"},t.title),h("span",{style:"flex:1"},h("span",{class:"track",style:"display:block;margin-bottom:2px"},h("span",{class:"fill",style:"display:block;width:"+t.estimateMinutes/mxE*100+"%;background:var(--mut)"})),h("span",{class:"track",style:"display:block"},h("span",{class:"fill"+(t.actualMinutes>t.estimateMinutes?" w":""),style:"display:block;width:"+t.actualMinutes/mxE*100+"%"}))),h("span",{class:"sm mut"},t.estimateMinutes+"/"+t.actualMinutes+"m"))))]:empty("Finish tasks that have an estimate and logged minutes to see this.")),
   h("div",{class:"card"},h("h3",{},"Avg time in column"),COLS().filter(c=>c.id!=="done").map(c=>h("div",{class:"mini"},h("span",{class:"lnk"},c.name),h("span",{class:"mut"},tin[c.id]?fd(tin[c.id].reduce((a,b)=>a+b,0)/tin[c.id].length):"–"))))))}

const TFCSS=":host{--bg:#000;--s1:#05070f;--s2:#0a1024;--s3:#101a3a;--line:#16224a;--blue:#4169e1;--blue2:#1e3a8a;--glow:#6f8cff;--tx:#e8ecff;--mut:#8a96c4;--red:#ff5d6c;--amb:#ffb84d;--grn:#3ddc97;--r:10px}\n*{box-sizing:border-box}:host{display:block;background:var(--bg);color:var(--tx);font:14px/1.5 \"Segoe UI\",system-ui,-apple-system,Roboto,sans-serif}\nbutton,input,select{font:inherit;color:inherit}\nbutton{background:var(--s3);border:1px solid var(--line);border-radius:7px;padding:5px 10px;cursor:pointer}\nbutton:hover{border-color:var(--blue)}button.pri{background:var(--blue);border-color:var(--blue);color:#fff}\ninput,select{background:var(--s1);border:1px solid var(--line);border-radius:7px;padding:6px 9px;min-width:0}\n:focus-visible{outline:2px solid var(--glow);outline-offset:2px}\nheader{display:flex;gap:10px;align-items:center;padding:10px 16px;border-bottom:1px solid var(--line);flex-wrap:wrap;position:sticky;top:0;background:var(--bg);z-index:5}\n.logo{font-weight:700;font-size:17px;letter-spacing:.3px;color:var(--glow)}\n.qa{flex:1 1 320px;position:relative}.qa input{width:100%;border-color:var(--blue2);padding:8px 11px}\n#chips{position:absolute;top:100%;left:0;right:0;display:flex;gap:5px;flex-wrap:wrap;padding-top:5px;z-index:4}\n.chip{background:var(--blue2);border-radius:99px;padding:1px 9px;font-size:12px;white-space:nowrap}\n.chip.k{background:var(--s3);color:var(--mut);border:1px solid var(--line)}\nnav{display:flex;gap:2px;padding:0 12px;border-bottom:1px solid var(--line);overflow-x:auto;background:var(--s1)}\nnav button{background:none;border:0;border-bottom:2px solid transparent;border-radius:0;padding:11px 14px;color:var(--mut);white-space:nowrap}\nnav button[aria-selected=true]{color:var(--tx);border-color:var(--blue)}\nnav .soon::after{content:\"soon\";margin-left:6px;font-size:10px;color:var(--amb);border:1px solid var(--amb);border-radius:99px;padding:0 5px}\nmain{padding:16px;max-width:1300px;margin:0 auto}\n.banner{background:#3a2a05;color:var(--amb);padding:8px 16px;display:none}\n.grid{display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}\n.card{background:var(--s1);border:1px solid var(--line);border-radius:var(--r);padding:14px}\n.card h3{margin:0 0 8px;font-size:14px;color:var(--glow)}\n.card.click{cursor:pointer}.card.click:hover{border-color:var(--blue)}\n.big{font-size:28px;font-weight:700}.mut{color:var(--mut)}.red{color:var(--red)}.warn{color:var(--amb)}\n.row{display:flex;align-items:center;gap:9px;padding:8px 10px;border-bottom:1px solid var(--line)}\n.row .t{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis}.row.done .t{text-decoration:line-through;color:var(--mut)}\n.pr{font-size:12px;border:1px solid currentColor;border-radius:5px;padding:0 6px}\n.p-low{color:var(--mut)}.p-medium{color:var(--glow)}.p-high{color:var(--amb)}.p-urgent{color:var(--red)}\n.bar{display:flex;gap:10px;margin-bottom:12px;flex-wrap:wrap}\n.board{display:flex;gap:12px;overflow-x:auto;align-items:flex-start}\n.col{background:var(--s1);border:1px solid var(--line);border-radius:var(--r);min-width:250px;flex:1;padding:10px}\n.col.over{border-color:var(--glow);background:var(--s2)}.col.wip{border-color:var(--amb)}\n.col h4{margin:0 0 8px;display:flex;justify-content:space-between}\n.kc{background:var(--s2);border:1px solid var(--line);border-left:3px solid var(--blue);border-radius:8px;padding:8px;margin-bottom:8px;cursor:grab}\n.kc small{display:block;color:var(--mut)}\n.mx{display:grid;grid-template-columns:1fr 1fr;gap:12px}\n.q{min-height:150px}.q.over{border-color:var(--glow)}\n.ring{width:110px;height:110px}.strip{display:flex;gap:6px}.strip button{flex:1;padding:8px 2px;text-align:center}\n.timer{font-size:64px;font-weight:700;font-variant-numeric:tabular-nums;color:var(--glow)}\n.toast{position:fixed;bottom:16px;left:50%;transform:translateX(-50%);background:var(--blue2);padding:9px 14px;border-radius:9px;display:flex;gap:10px;z-index:9;box-shadow:0 0 24px #4169e155}\n.empty{color:var(--mut);padding:18px;text-align:center;border:1px dashed var(--line);border-radius:var(--r)}\nul.up{margin:6px 0 0;padding-left:18px;color:var(--mut)}\ndialog{background:var(--s1);color:var(--tx);border:1px solid var(--blue);border-radius:var(--r);max-width:460px}\ndialog::backdrop{background:#000c}\n@media(max-width:700px){.mx{grid-template-columns:1fr}.timer{font-size:48px}}\n@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}\n.card{min-width:0;overflow:hidden}\n.wide{grid-column:span 2}\n.ov{grid-template-columns:repeat(auto-fit,minmax(300px,1fr));grid-auto-flow:row dense}\n@media(max-width:760px){.wide{grid-column:span 1}.sch{flex-direction:column}.side{width:100%!important}}\n.mini{display:flex;gap:7px;align-items:center;min-width:0;padding:2px 0}\n.lnk{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-align:left;background:none;border:0;padding:0;color:var(--tx);cursor:pointer;border-radius:4px}\n.lnk:hover{color:var(--glow);text-decoration:underline}\n.sm{font-size:12px}.bh{font-size:12px;font-weight:600;margin:9px 0 2px}.bh.red{color:var(--red)}.bh.blu{color:var(--glow)}.bh.grn{color:var(--grn)}.bh.warn{color:var(--amb)}\n.track{height:8px;background:var(--s3);border-radius:4px;overflow:hidden;margin:3px 0}.fill{height:100%;background:var(--blue);display:block}.fill.w{background:var(--amb)}.fill.r{background:var(--red)}\n.pstrip{display:grid;grid-template-columns:repeat(7,1fr);gap:6px}.pstrip button{padding:5px 2px;text-align:center;min-width:0}\n.pstrip button[aria-pressed=true],.seg button[aria-pressed=true]{background:var(--blue);border-color:var(--glow)}\n.pg{display:flex;gap:18px;flex-wrap:wrap;align-items:center;margin-top:8px}\n.scroll{max-height:230px;overflow:auto}\n.spark{display:flex;gap:6px;align-items:flex-end;height:56px}.spark div{flex:1;background:var(--blue);border-radius:3px;text-align:center;min-height:6px}.spark span{display:block;margin-top:-16px;color:var(--tx)}\ndialog.bigd{width:min(700px,94vw);max-height:92vh;overflow:auto}\ndialog .f{display:flex;flex-direction:column;gap:2px;margin-bottom:8px}dialog textarea{background:var(--s1);border:1px solid var(--line);border-radius:7px;padding:6px 9px;color:var(--tx);font:inherit;width:100%}\ndialog h4{margin:12px 0 4px}.two{display:grid;grid-template-columns:1fr 1fr;gap:0 12px}@media(max-width:600px){.two{grid-template-columns:1fr}}\ndialog input,dialog select{width:100%}dialog input[type=checkbox]{width:auto}\n.sch{display:flex;gap:12px;align-items:flex-start}.side{width:230px;flex:none;max-height:700px;overflow:auto}\n.tg{border:1px solid var(--line);border-radius:var(--r);background:var(--s1);overflow:hidden}\n.tgh{display:flex;border-bottom:1px solid var(--line)}.gut{width:46px;flex:none;padding:4px;color:var(--mut)}\n.dh{flex:1;min-width:0;padding:5px;text-align:center;border-left:1px solid var(--line);cursor:pointer}.dh.now{color:var(--glow);font-weight:700}.adc{text-align:left;cursor:default;min-height:26px}\n.tgb{display:flex;max-height:580px;overflow-y:auto}\n.hrs{width:46px;flex:none;position:relative}.hrs span{position:absolute;right:4px;font-size:11px;color:var(--mut);transform:translateY(-50%)}\n.dc{flex:1;min-width:0;position:relative;border-left:1px solid var(--line);background-image:repeating-linear-gradient(to bottom,var(--line) 0,var(--line) 1px,transparent 1px,transparent 48px)}\n.off{position:absolute;left:0;right:0;background:var(--offc,#000a);pointer-events:none}\n.ev{position:absolute;border-radius:6px;border-left:3px solid;padding:1px 5px;overflow:hidden;cursor:grab;background:var(--s3);z-index:2;box-shadow:0 0 0 1px #000}\n.ev.rep{opacity:.65;border-left-style:dashed}.ev.dn{opacity:.45}.ev.dn .sm:first-child{text-decoration:line-through}\n.rz{position:absolute;left:0;right:0;bottom:0;height:8px;cursor:ns-resize;background:linear-gradient(transparent,#6f8cff55)}\n.nowl{position:absolute;left:0;right:0;height:2px;background:var(--red);pointer-events:none;z-index:4}\n.mon{display:grid;grid-template-columns:repeat(7,1fr);gap:4px}.mc{min-height:100px;background:var(--s1);border:1px solid var(--line);border-radius:8px;padding:4px;min-width:0;overflow:hidden}.mc.dim{opacity:.4}.mc.td{border-color:var(--glow)}\n.mchip{display:block;width:100%;font-size:11px;text-align:left;padding:1px 5px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border-left:3px solid var(--blue);background:var(--s2);border-top:0;border-right:0;border-bottom:0;border-radius:4px}\n.chart{width:100%;height:auto}svg text{fill:var(--mut);font-size:10px}\n.hb{display:flex;gap:8px;align-items:center;width:100%;background:none;border:0;padding:4px 0;text-align:left}.hb:hover .hl{color:var(--glow)}.hl{width:110px;flex:none;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n\nheader{position:static;border:1px solid var(--line);border-radius:var(--r);margin-bottom:12px;background:var(--s1)}\nmain{padding:0;max-width:none;margin:0}\n.embed .ov{grid-template-columns:1fr}.embed .wide{grid-column:auto}\nnav{border:1px solid var(--line);border-radius:var(--r);margin-bottom:12px}\n.gc{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px}.gc .gt{margin:0 8px;font-size:18px;color:var(--tx)}.gsp{flex:1}\n.gc .seg{display:flex}.gc .seg button{border-radius:0}.gc .seg button:first-child{border-radius:7px 0 0 7px}.gc .seg button:last-child{border-radius:0 7px 7px 0}.gc .seg button[aria-pressed=true]{background:var(--blue);border-color:var(--glow)}\n.mini-cal{display:grid;grid-template-columns:repeat(7,1fr);gap:2px}.mc-h{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}.mc-h button{padding:0 8px}\n.md{padding:3px 0;font-size:12px;border:0;background:none;border-radius:50%;text-align:center}.md:hover{background:var(--s3)}.md.dim{color:var(--mut);opacity:.6}.md.td{color:var(--glow);font-weight:700}.md.sel{background:var(--blue2)}\n.mc.over{border-color:var(--glow);background:var(--s2)}.mchip.due{border-left-style:dashed;opacity:.85}.mon .lnk.dn{flex:none;font-weight:600}\n.side{width:240px}\n";
const TFH=window.__TFH;
function exportJSON(){const b=new Blob([JSON.stringify(S,null,2)],{type:"application/json"}),a=h("a",{href:URL.createObjectURL(b),download:"taskflow-"+today()+".json"});document.body.append(a);a.click();a.remove()}
function importJSON(f){const r=new FileReader();r.onload=()=>{try{const d=migrate(JSON.parse(r.result));if(confirm("This will replace "+S.tasks.length+" tasks with "+d.tasks.length+" imported tasks. Continue?")){S=d;hist=[];saveNow();render();toast("Imported")}}catch(e){toast("Import failed: not a valid Taskflow file")}};r.readAsText(f)}
function help(){const d=$("#dlg");d.className="";d.replaceChildren(h("h3",{},"Quick add syntax"),h("ul",{},["tomorrow, next monday, in 3 days, 25 dec, 2026-12-25","5pm, 17:30, at 9","#category  @tag  !low|medium|high|urgent  ~30m  ~2h","every day/weekday/week/month/friday","remind 30m before"].map(x=>h("li",{},x))),h("h3",{},"Shortcuts"),h("div",{},"/ or Ctrl+K: quick add (Planning centre) · Ctrl+Z: undo · ?: this help"),h("p",{class:"mut"},"Reminders only fire while this tab is open (no backend)."),h("button",{onclick:()=>d.close()},"Close"));d.showModal()}
/* ===== PrepVault host glue ===== */
let OWNV=null;
const live=()=>ROOT&&ROOT.host.isConnected;
const openTab=()=>{if(MODE==="embed")TFH.open();else render()};
function banner(m){if(live()){const b=$("#banner");b.textContent=m;b.style.display="block"}else TFH.toast(m)}
function blank(){const f=defaults();return{schemaVersion:SV,tasks:[],columns:f.columns,settings:f.settings,overdueLog:{},reminders:[]}}
function demoRem(d){const T=today(),fut=(n,hh,mm)=>{let x=addDays(T,n)+"T"+pad(hh)+":"+pad(mm);if(x<=nowStamp())x=addDays(T,n+1)+"T"+pad(hh)+":"+pad(mm);return x};d.reminders=d.reminders||[];
 [["Take a 5-minute break and stretch",stampOf(Date.now()+105*6e4),""],["Drink water",fut(0,16,30),"daily"],["Pack admit card and pens for the mock test",fut(1,7,30),""],["Revise the formula sheet",fut(3,18,0),"weekly"]].forEach(([title,at,repeat])=>d.reminders.push(mkRem({title,at,repeat})))}
function studyDemo(d){demoRem(d);const D=n=>addDays(today(),n),A=(title,cat,o,n,hr,m)=>{const t=mk(title,Object.assign({category:cat,estimateMinutes:m,dueDate:D(n)},o));t.scheduledStart=stamp(D(n),hr*60);t.scheduledEnd=stamp(D(n),hr*60+m);d.tasks.push(t)};
 A("Revise Newton's laws","physics",{priority:"high",important:true,urgent:true},0,18,60);
 A("Formula flashcards","physics",{priority:"low",important:false,urgent:false},0,20,30);
 A("Integration problem set","maths",{priority:"high",status:"in-progress",important:true,urgent:false},1,17,90);
 A("Review mock test errors","maths",{priority:"medium",important:true,urgent:true,reminders:[{id:uid(),type:"relative",offsetMinutes:30,fired:false}]},1,20,45);
 A("Periodic trends notes","chemistry",{priority:"medium",important:true,urgent:false},2,16,60);
 A("Weekly mock test","maths",{priority:"urgent",important:true,urgent:true,recurrence:{freq:"weekly",interval:1,daysOfWeek:[fromISO(D(3)).getDay()],endDate:null}},3,10,180);
 A("Organic reactions practice","chemistry",{priority:"medium",status:"review",important:true,urgent:false},4,17,60);
 [["Optics chapter","physics",60,70],["Algebra drills","maths",45,50],["Mole concept notes","chemistry",60,75],["Vectors revision","physics",50,45],["Calculus quiz","maths",30,35],["Bonding summary","chemistry",40,55]].forEach((x,i)=>{const c=new Date(Date.now()-(i*1.2+.3)*864e5),s=new Date(c-x[3]*18e4),cr=new Date(c-4*864e5);d.tasks.push(mk(x[0],{category:x[1],estimateMinutes:x[2],actualMinutes:x[3],status:"done",createdAt:cr.toISOString(),startedAt:s.toISOString(),completedAt:c.toISOString(),dueDate:iso(c),history:[{status:"todo",at:cr.toISOString()},{status:"in-progress",at:s.toISOString()},{status:"done",at:c.toISOString()}]}))})}
function initTF(v){const d=blank();(v.tasks||[]).forEach(o=>{const t=mk(o.t,{category:"study",dueDate:o.d||null,status:o.x?"done":"todo"});if(o.x){t.completedAt=now();t.history=[{status:"todo",at:t.createdAt},{status:"done",at:t.completedAt}]}else if(o.d){t.scheduledStart=stamp(o.d,15*60);t.scheduledEnd=stamp(o.d,16*60);t.estimateMinutes=60}d.tasks.push(t)});if(v.name==="JEE Prep")studyDemo(d);return d}
function syncLegacy(v,s){v.tasks=s.tasks.filter(t=>!t.archived).map(t=>({t:t.title,d:t.dueDate||(t.scheduledStart?t.scheduledStart.slice(0,10):""),x:t.status==="done"?1:0}))}
function legacyRem(v){return(v.rem||[]).filter(r=>r&&r.t&&r.a).map(r=>mkRem({title:r.t,at:String(r.a).slice(0,16),done:!!r.d,fired:!!r.d}))}
function ensure(v){if(!v.tf){v.tf=initTF(v);v.tf.reminders=legacyRem(v).concat(v.tf.reminders||[]);syncLegacy(v,v.tf);TFH.save()}else{if(!Array.isArray(v.tf.reminders)){v.tf.reminders=legacyRem(v);TFH.save()}migrate(v.tf)}return v.tf}
function bind(){OWNV=TFH.V();const s=ensure(OWNV);if(s!==S){S=s;hist=[]}}
function saveNow(){logOverdue();if(OWNV){OWNV.tf=S;syncLegacy(OWNV,S)}TFH.save()}
let tT;function toast(msg,u){if(!live())return TFH.toast(msg);clearTimeout(tT);ROOT.querySelectorAll(".toast").forEach(e=>e.remove());const t=h("div",{class:"toast",role:"status"},h("span",{},msg),u?h("button",{onclick:()=>{undo();t.remove()}},"Undo"):null);ROOT.append(t);tT=setTimeout(()=>t.remove(),4500)}
let rq=0;function render(){if(rq)return;rq=requestAnimationFrame(()=>{rq=0;renderNow()})}
function renderNow(){if(!live())return;const nav=$("#tabs"),m=$("#main");ROOT.host.dataset.m=MODE;m.classList.toggle("embed",MODE==="embed");nav.style.display=MODE==="full"?"":"none";
 if(MODE==="full"){const V={overview:vOverview,todo:vTodo,kanban:vKanban,scheduler:vScheduler,matrix:vMatrix,analytics:vAnalytics,reminders:vReminders};if(!V[ui.tab])ui.tab="overview";
  nav.replaceChildren(...TABS.map(([id,n])=>h("button",{role:"tab",id:"tab-"+id,"aria-selected":String(ui.tab===id),"aria-controls":"main",tabindex:ui.tab===id?0:-1,onclick:()=>{ui.tab=id;render()}},n)));m.replaceChildren(V[ui.tab]())}
 else if(MODE==="rem")m.replaceChildren(vReminders());else m.replaceChildren(vCarousel())}
const TFCSS2=`[hidden]{display:none!important}
:host(.pvx-rm) *,:host(.pvx-rm) *::before,:host(.pvx-rm) *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
:host{--gap:20px}
header{padding:14px 18px;gap:12px;margin-bottom:var(--gap)}
header .ttl{font-weight:600;font-size:15px;color:var(--glow)}
:host([data-m=embed]) .o-full,:host([data-m=full]) .o-embed,:host([data-m=rem]) header{display:none!important}
.qrow{flex:1 1 100%;display:flex;gap:12px;flex-wrap:wrap;align-items:center}
.qrow .qa{flex:1 1 320px}#chips{position:static;flex:1 1 100%;padding:0}
nav{margin-bottom:var(--gap)}nav button{padding:12px 18px}
.grid,.ov{gap:var(--gap)}
.card{padding:20px 24px}.card h3{margin-bottom:14px}
.bar{gap:12px;margin-bottom:var(--gap)}
.board{gap:16px}.col{padding:14px}.kc{padding:10px 12px;margin-bottom:10px}
.mx{gap:16px}.sch{gap:var(--gap)}.gc{margin-bottom:16px}
.bh{margin:16px 0 4px}.mini{padding:4px 0}
.stack{display:flex;flex-direction:column;gap:var(--gap)}
.vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.tdwrap{overflow-x:auto}
.tdt{width:100%;border-collapse:separate;border-spacing:0}
.tdt th{font-size:12px;font-weight:500;color:var(--mut);text-align:left;padding:0 14px 12px;white-space:nowrap}
.tdt td{padding:11px 14px;vertical-align:top}
.tdt td.n{white-space:nowrap;color:var(--mut)}
.tdt td.ck{width:36px;padding-right:0}
.tdt td.act{white-space:nowrap;text-align:right}
.tdt .tt{display:inline-block;max-width:100%}
.tdt .sub{display:block;font-size:12px;color:var(--mut);margin-top:2px}
.tdt tr.done .tt{text-decoration:line-through;color:var(--mut)}
.tdt tbody tr:hover td{background:var(--s2)}
.tdt tbody tr:hover td:first-child{border-radius:8px 0 0 8px}.tdt tbody tr:hover td:last-child{border-radius:0 8px 8px 0}
.tdt tr.gr td{padding:24px 14px 6px;font-size:12px;font-weight:600;color:var(--mut);background:none!important}
.tdt input[type=checkbox]{accent-color:var(--blue);width:16px;height:16px;margin:2px 0 0}
.tdt select{font-size:12px;padding:3px 6px}
.ic{background:none;border:0;padding:3px 8px;color:var(--mut)}.ic:hover{color:var(--tx)}
.remform{display:flex;flex-direction:column;gap:12px}.remform input,.remform select{width:100%}.remform .bar{margin:0}
.rf2{display:grid;grid-template-columns:1fr 1fr 1.3fr;gap:12px}
@media(max-width:600px){.rf2{grid-template-columns:1fr}}
.tiles{display:flex;gap:12px;flex-wrap:wrap}
.tile{background:var(--s2);border:1px solid var(--line);border-radius:10px;padding:10px 16px;min-width:96px}.tile b{display:block;font-size:22px}
.split2,.split4{display:grid;gap:20px}
.split2{grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}.split4{grid-template-columns:repeat(auto-fit,minmax(170px,1fr))}
.car{display:flex;flex-direction:column;gap:16px}
.cbar{display:flex;gap:8px;align-items:stretch}
.ctabs{display:flex;gap:8px;flex:1;min-width:0;overflow-x:auto}
.ct{flex:1 0 auto;position:relative;background:var(--s1);border:1px solid var(--line);border-radius:8px;padding:9px 14px 12px;color:var(--mut);white-space:nowrap;overflow:hidden}
.ct[aria-selected=true]{color:var(--tx);border-color:var(--blue)}
.cf{position:absolute;left:0;bottom:0;height:3px;width:0;background:var(--glow);animation:cfill 9s linear forwards}
.car:hover .cf,.car:focus-within .cf{animation-play-state:paused}
.car.paused .cf{animation:none;width:100%;opacity:.45}
@keyframes cfill{to{width:100%}}
.cn{flex:none;width:38px;border-radius:8px;padding:0}.cn.pz{width:auto;padding:0 14px;font-size:12px}
.stage{background:radial-gradient(120% 140% at 0 0,var(--s3),var(--s1) 60%);border:1px solid var(--line);border-radius:14px;padding:6px;min-height:380px}
.stage .card{background:transparent;border:0;overflow:visible}
.cbody.enter .card{animation:sin .45s ease both}.cbody.enter.back .card{animation-name:sinb}
@keyframes sin{from{opacity:0;transform:translateX(28px)}to{opacity:1;transform:none}}
@keyframes sinb{from{opacity:0;transform:translateX(-28px)}to{opacity:1;transform:none}}
@media(prefers-reduced-motion:reduce){.ct[aria-selected=true] .cf{width:100%;opacity:.45}}
`;
const SHELL='<style>'+TFCSS+TFCSS2+'</style><div class="banner" id="banner" role="alert"></div><header><span class="ttl o-embed">Task system</span><span class="ttl o-full">Task manager</span><span class="gsp"></span><button id="qadd" class="pri o-embed" aria-expanded="false" aria-controls="qarow">＋ Quick add</button><button id="undo" class="o-embed" title="Ctrl+Z">↶ Undo</button><button id="open" class="o-embed">Open task manager →</button><button id="exp" hidden>Export</button><button id="imp" hidden>Import</button><button id="demo" hidden>Reset demo</button><button id="settings" class="o-full" aria-label="Settings">⚙</button><button id="help" aria-label="Help">?</button><div class="qrow o-embed" id="qarow" hidden><div class="qa"><input id="qa" aria-label="Quick add task" placeholder="Quick add: Submit report tomorrow 5pm #work !high @x ~2h every friday" autocomplete="off"></div><button id="qgo" class="pri">Add</button><div id="chips" aria-live="polite"></div></div><input type="file" id="file" accept=".json" hidden></header><nav role="tablist" id="tabs" aria-label="Views"></nav><main id="main" role="tabpanel"></main><dialog id="dlg"></dialog>';
let openQA=()=>{};
function wire(){const qa=$("#qa"),row=$("#qarow"),btn=$("#qadd");
 const setQA=on=>{row.hidden=!on;btn.setAttribute("aria-expanded",String(on));if(on)qa.focus()};openQA=()=>setQA(true);
 btn.onclick=()=>setQA(row.hidden);
 const submit=()=>{if(!qa.value.trim())return;const {r}=parse(qa.value);if(!r.title)return toast("Add a title too");qa.value="";qa.dispatchEvent(new Event("input"));mutate(()=>addTask(r),"Created: "+r.title)};
 $("#qgo").onclick=submit;
 qa.addEventListener("input",()=>{const {chips}=parse(qa.value);$("#chips").replaceChildren(...chips.map(c=>h("span",{class:"chip"},c)),...(qa.value&&!chips.length?[h("span",{class:"chip k"},"no tokens detected: all text becomes the title")]:[]))});
 qa.addEventListener("keydown",e=>{if(e.key==="Escape"){qa.value="";qa.dispatchEvent(new Event("input"));setQA(false);btn.focus()}else if(e.key==="Enter")submit()});
 $("#undo").onclick=undo;$("#open").onclick=()=>TFH.open();$("#exp").onclick=exportJSON;$("#imp").onclick=()=>$("#file").click();$("#file").onchange=e=>{if(e.target.files[0])importJSON(e.target.files[0]);e.target.value=""};
 $("#demo").onclick=()=>{if(confirm("Replace this vault's tasks with study demo data?")){const d=blank();studyDemo(d);S=d;hist=[];saveNow();render()}};
 $("#settings").onclick=openSettings;$("#help").onclick=help}
function mount(host,mode){MODE=mode;bind();ROOT=host.attachShadow({mode:"open"});ROOT.innerHTML=SHELL;wire();renderNow();checkRem()}
const typing=()=>{const a=ROOT&&ROOT.activeElement,r=/INPUT|SELECT|TEXTAREA/;return r.test(document.activeElement.tagName)||!!(a&&r.test(a.tagName))};
document.addEventListener("dragstart",e=>{try{e.dataTransfer.setData("text/plain","x");e.dataTransfer.effectAllowed="move"}catch(_){}});
document.addEventListener("dragend",()=>{drag=null;dragDue=false;if(live())ROOT.querySelectorAll(".over").forEach(x=>x.classList.remove("over"))});
document.addEventListener("keydown",e=>{if(!live())return;const ty=typing(),dg=$("#dlg");
 if(MODE==="full"&&ui.tab==="scheduler"&&!e.ctrlKey&&!e.metaKey&&!ty&&!dg.open){const k={d:"day",w:"week",m:"month",a:"agenda"}[e.key.toLowerCase()];if(k){ui.sv=k;render();return}}
 if(MODE==="embed"&&((e.key==="/"&&!ty)||((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"))){e.preventDefault();openQA()}
 else if(e.key==="?"&&!ty)help();
 else if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"&&!ty){e.preventDefault();undo()}
 else{const t=e.composedPath()[0];if(MODE==="full"&&t&&t.getAttribute&&t.getAttribute("role")==="tab"&&(e.key==="ArrowRight"||e.key==="ArrowLeft")){const i=TABS.findIndex(x=>x[0]===ui.tab),n=(i+(e.key==="ArrowRight"?1:TABS.length-1))%TABS.length;ui.tab=TABS[n][0];renderNow();$("#tab-"+ui.tab).focus()}}});
setInterval(()=>{if(!TFH.inVault())return;bind();checkRem();if(live()&&ui.tab==="scheduler")updNow()},30000);
/* ===== Google-Calendar-style scheduler: Day (name+time+category) > Week (name+category) > Month (name only) ===== */
let dragDue=false;
function miniCal(){const T0=today(),a=fromISO(ui.sd),first=iso(new Date(a.getFullYear(),a.getMonth(),1)),g=h("div",{class:"mini-cal"}),s0=wk(ui.sd),s1=addDays(s0,6),mv=k=>()=>{const d=fromISO(ui.sd);d.setDate(1);d.setMonth(d.getMonth()+k);ui.sd=iso(d);render()};
 [..."MTWTFSS"].forEach(n=>g.append(h("div",{class:"mut sm",style:"text-align:center"},n)));
 for(let i=0;i<42;i++){const d=addDays(wk(first),i),sel=ui.sv==="week"?d>=s0&&d<=s1:d===ui.sd;g.append(h("button",{class:"md"+(d===T0?" td":"")+(sel?" sel":"")+(d.slice(0,7)!==first.slice(0,7)?" dim":""),"aria-label":d,onclick:()=>{ui.sd=d;render()}},""+(+d.slice(8))))}
 return h("div",{},h("div",{class:"mc-h"},h("b",{},a.toLocaleDateString(undefined,{month:"long",year:"numeric"})),h("span",{},h("button",{"aria-label":"Previous month",onclick:mv(-1)},"‹"),h("button",{"aria-label":"Next month",onclick:mv(1)},"›"))),g)}
function sideList(){const un=S.tasks.filter(t=>!t.archived&&t.status!=="done"&&!t.scheduledStart).sort(prSort);
 const s=h("div",{class:"card side",ondragover:e=>e.preventDefault(),ondrop:e=>{e.preventDefault();if(drag&&drag.scheduledStart){const t=drag;drag=null;mutate(()=>{t.scheduledStart=null;t.scheduledEnd=null},"Unscheduled")}}},miniCal(),h("h3",{style:"margin-top:14px"},"Unscheduled ("+un.length+")"),h("div",{class:"mut sm",style:"margin-bottom:6px"},"Drag onto the calendar. Drop a block here to unschedule it."));
 un.forEach(t=>s.append(h("div",{class:"kc",draggable:true,ondragstart:()=>{drag=t;dragOff=0},style:"border-left-color:"+col(t)},h("button",{class:"lnk",style:"display:block;width:100%",onclick:()=>openTask(t)},t.title),h("small",{},PSYM[t.priority]+" "+(t.estimateMinutes||60)+"m"+(t.dueDate?" · due "+dueLabel(t):"")))));
 if(!un.length)s.append(empty("All tasks are scheduled."));return s}
function dropOnDay(d){if(!drag)return;const t=drag,due=dragDue;drag=null;dragDue=false;
 mutate(()=>{if(t.scheduledStart){const m=mins(t.scheduledStart),du=durOf(t);t.scheduledStart=stamp(d,m);t.scheduledEnd=stamp(d,Math.min(1440,m+du))}
  else if(due)t.dueDate=d;else{const du=t.estimateMinutes||60,m=S.settings.workStart*60;t.scheduledStart=stamp(d,m);t.scheduledEnd=stamp(d,m+du)}t.updatedAt=now()},"Moved to "+d)}
function monthView(){const T0=today(),a=fromISO(ui.sd),first=iso(new Date(a.getFullYear(),a.getMonth(),1)),g=h("div",{class:"mon"});
 ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach(n=>g.append(h("div",{class:"mut sm",style:"text-align:center"},n)));
 for(let i=0;i<42;i++){const d=addDays(wk(first),i),items=dayItems(d);
  const c=h("div",{class:"mc"+(d.slice(0,7)!==first.slice(0,7)?" dim":"")+(d===T0?" td":""),ondragover:e=>{e.preventDefault();c.classList.add("over")},ondragleave:()=>c.classList.remove("over"),ondrop:e=>{e.preventDefault();c.classList.remove("over");dropOnDay(d)},
   onclick:e=>{if(e.target===c)openTask(mk("",{scheduledStart:stamp(d,540),scheduledEnd:stamp(d,600),estimateMinutes:60}),true)}},
   h("button",{class:"lnk dn",onclick:()=>{ui.sd=d;ui.sv="day";render()},title:"Open day view"},""+(+d.slice(8))));
  items.slice(0,3).forEach(x=>c.append(h("button",{class:"mchip"+(x.kind==="d"?" due":""),draggable:!x.rep,style:"border-color:"+col(x.t),title:x.t.title+(x.kind==="s"?" · "+stamp(d,x.m).slice(11):" · due"),ondragstart:()=>{drag=x.t;dragOff=0;dragDue=x.kind==="d"},onclick:e=>{e.stopPropagation();openTask(x.t)}},x.t.title)));
  if(items.length>3)c.append(h("button",{class:"mchip",style:"border-color:var(--mut)",onclick:e=>{e.stopPropagation();const dg=$("#dlg");dg.className="";dg.replaceChildren(h("h3",{},d),items.map(x=>miniRow(x.t)),h("button",{onclick:()=>dg.close()},"Close"));dg.showModal()}},"+"+(items.length-3)+" more"));g.append(c)}
 return g}
function vScheduler(){const T0=today(),v=ui.sv,sd=ui.sd||(ui.sd=T0);
 const shift=k=>{const d=fromISO(sd);if(v==="month"){d.setDate(1);d.setMonth(d.getMonth()+k)}else d.setDate(d.getDate()+k*(v==="week"?7:v==="agenda"?14:1));ui.sd=iso(d);render()};
 const fm=(d,o)=>fromISO(d).toLocaleDateString(undefined,o),w0=wk(sd),w1=addDays(w0,6);
 const label=v==="day"?fm(sd,{weekday:"long",day:"numeric",month:"long",year:"numeric"}):v==="week"?(fm(w0,{month:"short",day:"numeric"})+" – "+fm(w1,{month:"short",day:"numeric",year:"numeric"})):v==="month"?fm(sd,{month:"long",year:"numeric"}):"Agenda from "+sd;
 const used=weekUsed(sd),cap=(S.settings.workEnd-S.settings.workStart)*300,ow=used>cap;
 const tools=h("div",{class:"gc"},h("button",{class:"pri",onclick:()=>{ui.sd=T0;render()}},"Today"),h("button",{"aria-label":"Previous",onclick:()=>shift(-1)},"‹"),h("button",{"aria-label":"Next",onclick:()=>shift(1)},"›"),h("h3",{class:"gt"},label),h("span",{class:"gsp"}),
  h("select",{"aria-label":"Color by",onchange:e=>{ui.colorBy=e.target.value;render()}},[["category","Color: category"],["priority","Color: priority"]].map(([a,b])=>h("option",{value:a,selected:ui.colorBy===a},b))),
  h("button",{onclick:exportICS},"Export .ics"),h("button",{onclick:()=>openTask(mk("",{scheduledStart:stamp(sd,S.settings.workStart*60),scheduledEnd:stamp(sd,S.settings.workStart*60+60),estimateMinutes:60}),true)},"＋ Create"),
  h("div",{class:"seg"},[["day","Day"],["week","Week"],["month","Month"],["agenda","Agenda"]].map(([id,n])=>h("button",{"aria-pressed":String(v===id),onclick:()=>{ui.sv=id;render()}},n))));
 const hint=({day:"Day view: name, time and category.",week:"Week view: name and category (no time).",month:"Month view: task names only. Open a day for more detail.",agenda:"Agenda: next 30 days."})[v];
 const capBar=h("div",{class:"card",style:"margin-bottom:10px;padding:8px 12px"},h("span",{class:ow?"red":"mut"},"Week capacity: "+(used/60).toFixed(1)+"h scheduled of "+(cap/60)+"h working time"+(ow?" ⚠ overbooked by "+((used-cap)/60).toFixed(1)+"h":"")+"  ·  "+hint),h("div",{class:"track"},h("div",{class:"fill"+(ow?" r":""),style:"width:"+Math.min(100,used/cap*100)+"%"})));
 const main=v==="month"?monthView():v==="agenda"?agendaView():timeGrid(v==="day"?[sd]:[...Array(7)].map((_,i)=>addDays(wk(sd),i)));
 return h("div",{},tools,capBar,h("div",{class:"sch"},sideList(),h("div",{style:"flex:1;min-width:0"},main)))}
window.TFAPI={mount,ensure,tab:t=>{ui.tab=t},counts:v=>{const s=ensure(v),a=s.tasks.filter(t=>!t.archived),dn=a.filter(t=>t.status==="done").length,T0=today();return{n:a.length,dn,op:a.length-dn,rem:(s.reminders||[]).filter(r=>!r.done).length,due:a.filter(t=>t.status!=="done"&&t.dueDate===T0).length,od:a.filter(overdue).length,p:a.length?Math.round(dn/a.length*100):0}}};

})();
/* ===== Taskflow host bridge ===== */
const tfTile=(n,l,c)=>`<div class="tfs"><b style="${c?'color:'+c:''}">${n}</b><small>${l}</small></div>`;
const tfRing=p=>`<svg width="120" height="120" viewBox="0 0 120 120" style="flex:none" role="img" aria-label="${p} percent done"><circle cx="60" cy="60" r="46" fill="none" stroke="#12121c" stroke-width="12"/><circle cx="60" cy="60" r="46" fill="none" stroke="#2f55d4" stroke-width="12" stroke-linecap="round" stroke-dasharray="${2.89*p} 289" transform="rotate(-90 60 60)"/><text x="60" y="67" text-anchor="middle" style="fill:#ececf1;font-size:24px;font-weight:700">${p}%</text></svg>`;
function tfOpen(t){TFAPI.tab(t);go('pt')}
const _render=render;render=function(){_render();const h=document.getElementById('tfhost');if(h&&view==='vault')TFAPI.mount(h,h.dataset.mode)};
const _dash=dash;dash=function(){const c=TFAPI.counts(V());return _dash().replace(/<div class="card"><h3>Progress<\/h3>[\s\S]*?<\/div><\/div>/,()=>`<div class="card" style="grid-column:span 2;min-width:min(100%,360px)"><div class="row" style="justify-content:space-between"><h3 style="margin:0">Progress</h3><button class="g" onclick="tfOpen('overview')">Task overview →</button></div><div class="row" style="gap:20px;margin-top:10px">${tfRing(c.p)}<div style="flex:1;min-width:200px"><div class="row">${tfTile(c.dn,'completed','#3ddc97')+tfTile(c.op,'open')+tfTile(c.due,'due today','#ffb84d')+tfTile(c.od,'overdue',c.od?'#e04646':'')}</div><div class="bar" style="margin-top:12px"><i style="width:${c.p}%"></i></div></div></div></div>`)};
const _ps=psub;psub=k=>{TFAPI.ensure(V());return k==='pt'?'<h2>Planning centre › Task manager</h2><div id="tfhost" data-mode="full"></div>':k==='pr'?'<h2>Planning centre › Reminders</h2><div id="tfhost" data-mode="rem"></div>':_ps(k)};
plan=function(){const v=V();TFAPI.ensure(v);const c=(k,t,b)=>`<div class="card"><h3>${t}</h3>${b}<br><button class="g" onclick="go('${k}')">Open ${t.toLowerCase()} →</button></div>`;
return `<h2>Planning centre</h2><p style="color:var(--mu)">Overview of every planning section. Open any one for its full view.</p>${hjCard()}<br><div id="tfhost" data-mode="embed"></div><br><div class="grid">${c('pf','Focus timer',`<div class="big2">${fmt(tm.left)}</div>${v.ses} focus sessions`)+c('pc','Calendar',`${v.tasks.filter(t=>!t.x&&t.d).length} dated open tasks`)}</div>${soon(['Time table'])}`};

/* ===== v3: Clockwork + sidebar + profile + backup ===== */
(function(){
const UK='prepvault_ui_v3',nw=()=>Date.now(),Q=s=>document.querySelectorAll(s);
let U={sb:innerWidth>700?1:0,open:{plan:1}};try{Object.assign(U,JSON.parse(localStorage.getItem(UK))||{})}catch(e){}
const sU=()=>{try{localStorage.setItem(UK,JSON.stringify(U))}catch(e){}};
S.profile=S.profile||{};
document.head.insertAdjacentHTML('beforeend','<style>.cwt{font-size:1.9rem;font-weight:700;font-variant-numeric:tabular-nums;line-height:1.1}.cwt2{font-size:1.05rem;font-variant-numeric:tabular-nums}.cwl{color:var(--mu);font-size:.78rem}.rd{display:flex;gap:6px;align-items:center;margin-top:8px}.rd i{width:7px;height:7px;border-radius:9px;background:var(--bd);cursor:pointer}.rd i.on{background:var(--navy2)}.rd button{padding:0 8px;font-size:.8rem}.cwc h3{font-size:.9rem}.cwx .card{padding:16px}.cwx .card h3{font-size:1.17em}.cwm{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))!important;gap:8px;align-items:start}.cwm .cwt{font-size:1.5rem}.cwm button{padding:3px 8px;font-size:.8rem}.cwm .row{gap:4px;margin-top:4px}.card{padding:12px 14px}.card h3{font-size:.95rem}main{padding:16px}.big2{font-size:2.1rem}.hjc svg{max-height:240px}.hjc button{padding:4px 10px;font-size:.82rem}.hb3{position:fixed;top:10px;left:10px;z-index:8;background:#0d0d13;font-size:1.1rem;padding:5px 11px}aside.sb{display:flex;flex-direction:column;padding-top:54px}.app.cl aside.sb{display:none}.app.cl main{padding-top:54px}.sbm{flex:1;overflow:auto}.sbb{border-top:1px solid var(--bd);padding-top:6px}.sbr{display:flex;gap:2px}.sbr button:first-child{flex:1}aside .ch{width:34px;padding:8px 0;text-align:center}@media(max-width:700px){.app{flex-direction:row}aside.sb{position:fixed;left:0;top:0;width:240px;height:100vh;z-index:7;flex-wrap:nowrap}}</style>');
const SN={Chime:[[880,.15],[1320,.3]],Beep:[[1000,.25]],Bell:[[660,.7,'triangle']],Digital:[[1500,.08],[0,.06],[1500,.08],[0,.06],[1500,.08]],Soft:[[440,.45],[550,.45]],Alarm:[[900,.2,'square'],[700,.2,'square']]};
let AC;function snd(n,vol,rep){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();let t=AC.currentTime;for(let r=0;r<rep;r++)(SN[n]||SN.Chime).forEach(([f,d,w])=>{if(f){const o=AC.createOscillator(),g=AC.createGain();o.type=w||'sine';o.frequency.value=f;g.gain.value=vol*.3;o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d)}t+=d+.05})}catch(e){}}
function CW(v){if(!v.cw)v.cw={set:{h24:0,sec:1,df:0,dig:0,ana:0,prec:2,snd:'Chime',vol:.6,rep:2,rot:6,n:{pom:1,tim:1,sw:1,foc:1,alm:1}},z:['','UTC','Europe/London','America/New_York','Asia/Tokyo','Asia/Dubai'],alm:[],
pom:{w:25,s:5,l:15,n:4,auto:0,goal:8,ph:'w',c:0,run:0,end:0,rem:1500000,log:[],task:''},foc:{w:50,b:10,ph:'w',run:0,end:0,rem:3000000,log:[],base:v.ses||0,task:''},
tim:[],pre:[{l:'5 min',s:300},{l:'10 min',s:600},{l:'25 min',s:1500}],sw:{acc:0,st:0,run:0,laps:[]},tab:'ov'};const c=v.cw;if(!c.sws)c.sws=[Object.assign({id:rid(),l:'Stopwatch 1',acc:0,st:0,run:0,laps:[]},c.sw||{})];if(!c.ppre)c.ppre=[{nm:'Classic 25/5',w:25,s:5,l:15,n:4},{nm:'Long 50/10',w:50,s:10,l:30,n:3},{nm:'Short 15/3',w:15,s:3,l:10,n:4}];if(!c.fpre)c.fpre=[{nm:'25 / 5',w:25,b:5},{nm:'50 / 10',w:50,b:10},{nm:'90 / 15',w:90,b:15}];return c}
const L=p=>p.run?p.end-nw():p.rem,mm=ms=>{const s=Math.max(0,Math.ceil(ms/1e3)),h=s/3600|0;return(h?h+':':'')+pad(s%3600/60|0)+':'+pad(s%60)},
sf=(ms,d)=>pad(ms/6e4|0)+':'+pad(ms/1e3%60|0)+(d?'.'+String(ms%1000|0).padStart(3,'0').slice(0,d):''),
dur=(k,p)=>k==='pom'?{w:p.w,s:p.s,l:p.l}[p.ph]:p.ph==='w'?p.w:p.b,
PHN=(k,p)=>({w:k==='pom'?'Work':'Focus',s:'Short break',l:'Long break',b:'Break'})[p],zl=z=>z?z.replace(/_/g,' '):'Local',td=()=>iso(new Date());
function ck(z){const s=CW(V()).set,d=new Date(),o={hour:'2-digit',minute:'2-digit',hour12:!s.h24};if(s.sec)o.second='2-digit';if(z)o.timeZone=z;
const P=q=>Object.fromEntries(new Intl.DateTimeFormat('en-GB',Object.assign({timeZone:z||undefined},q)).formatToParts(d).map(x=>[x.type,x.value])),a=P({day:'2-digit',month:'2-digit',year:'numeric',weekday:'long'}),m=P({month:'short'}).month;
return{t:new Intl.DateTimeFormat(s.dig?'en-US-u-nu-deva':'en-US',o).format(d),d:[`${+a.day} ${m} ${a.year}`,`${a.day}/${a.month}/${a.year}`,`${a.month}/${a.day}/${a.year}`,`${a.year}-${a.month}-${a.day}`][s.df]+' · '+a.weekday}}
function lnk(v,id,m){if(!id||!v.tf)return;const t=v.tf.tasks.find(x=>x.id===id);if(t)t.actualMinutes=(t.actualMinutes||0)+m}
(window.PVX=window.PVX||{}).snd=snd;PVX.CW=CW;
function ale(v,k,t,b){const c=CW(v);if(!c.set.n[k])return;snd(c.set.snd,c.set.vol,c.set.rep);try{window.PVX&&PVX.alertFx&&PVX.alertFx(t,b)}catch(e){}toast(t+' — '+b);try{if(window.Notification&&Notification.permission==='granted')new Notification(t,{body:b+' ('+v.name+')'})}catch(e){}
const m=document.createElement('div');m.className='modal';m.style.zIndex=20;m.innerHTML=`<div class="card"><h3>${esc(t)}</h3><p>${esc(b)} · ${esc(v.name)}</p><div class="row"><button class="d">Dismiss</button><button class="g z">Snooze 5 min</button></div></div>`;document.body.appendChild(m);
m.querySelector('.d').onclick=()=>m.remove();m.querySelector('.z').onclick=()=>{c.tim.push({id:rid(),l:'Snooze: '+t,s:300,rem:3e5,end:nw()+3e5,run:1,rep:0,snd:c.set.snd});save();m.remove()};
if(document.hidden){const o=document.title;let i=0;const h=setInterval(()=>{document.title=i++%2?o:'⏰ '+t;if(!document.hidden||i>40){clearInterval(h);document.title=o}},800)}}
function adv(v,k,done){const p=CW(v)[k],w=p.ph==='w';if(done&&w){p.log.push({d:td(),m:p.w,t:p.task||''});lnk(v,p.task,p.w)}let x;if(k==='pom'){if(w){p.c++;x=p.c>=p.n?(p.c=0,'l'):'s'}else x='w'}else x=w?'b':'w';p.ph=x;p.rem=dur(k,p)*6e4;p.run=k==='pom'&&p.auto&&done?1:0;if(p.run)p.end=nw()+p.rem;save();return w}
function eng(){const n=nw();S.vaults.forEach(v=>{const c=CW(v);['pom','foc'].forEach(k=>{const p=c[k];if(p.run&&n>=p.end){p.run=0;const w=adv(v,k,1);ale(v,k,w?'Work session done':'Break over','Next: '+PHN(k,p.ph))}});
c.tim.forEach(t=>{if(t.run&&n>=t.end){if(t.rep){t.end=n+t.s*1e3}else{t.run=0;t.rem=0}save();ale(v,'tim','⏲ '+(t.l||'Timer'),'Time is up')}});
const d=new Date(),hm=pad(d.getHours())+':'+pad(d.getMinutes()),k=td()+hm;c.alm.forEach(a=>{if(a.on&&a.t===hm&&a.last!==k&&(!a.days.length||a.days.includes(d.getDay()))){a.last=k;if(!a.days.length)a.on=0;save();ale(v,'alm','⏰ '+(a.l||'Alarm'),a.t)}})})}
window.cwA=(o,a,b,x)=>{const v=V(),c=CW(v),p=c[a],s=c.set,sw=c.sw;
switch(o){
case'tab':c.tab=a;break;
case'xpre':{const q=(a==='pom'?c.ppre:c.fpre)[+b];if(b===''||!q)break;Object.assign(p,a==='pom'?{w:q.w,s:q.s,l:q.l,n:q.n}:{w:q.w,b:q.b});p.sel=+b;p.run=0;p.ph='w';p.c=0;p.rem=p.w*6e4;break}
case'xsave':{const nm=prompt('Preset name');if(!nm)return;(a==='pom'?c.ppre:c.fpre).push(a==='pom'?{nm,w:p.w,s:p.s,l:p.l,n:p.n}:{nm,w:p.w,b:p.b});break}
case'xedit':{const A=a==='pom'?c.ppre:c.fpre,q=A[+b],nm=prompt('Preset name (saves the current settings into it)',q.nm);if(!nm)return;A[+b]=a==='pom'?{nm,w:p.w,s:p.s,l:p.l,n:p.n}:{nm,w:p.w,b:p.b};break}
case'xdel':(a==='pom'?c.ppre:c.fpre).splice(+b,1);p.sel=-1;break;
case'padd':if(p.run)p.end+=b*6e4;else p.rem+=b*6e4;break;
case'tsel':{const q=c.pre[+a];if(a===''||!q)break;let t=c.tim[0];if(!t){t={id:rid(),snd:s.snd,rep:0};c.tim.push(t)}Object.assign(t,{l:q.l,s:q.s,rem:q.s*1e3,end:0,run:0,pi:+a});break}
case'tog':if(p.run){p.rem=p.end-nw();p.run=0}else{p.end=nw()+p.rem;p.run=1}break;
case'rst':p.run=0;p.ph='w';p.c=0;p.rem=dur(a,p)*6e4;break;
case'skip':p.run=0;adv(v,a,0);break;
case'ps':p[b]=b==='task'?x:b==='auto'?+x:Math.max(1,+x||1);if(!p.run)p.rem=dur(a,p)*6e4;break;
case'tadd':case'tpsave':{const l=val('tl'),sec=(+val('th')||0)*3600+(+val('tmn')||0)*60+(+val('ts')||0);if(!sec)return toast('Enter a duration');
if(o==='tpsave')c.pre.push({l:l||mm(sec*1e3),s:sec});else c.tim.push({id:rid(),l,s:sec,rem:sec*1e3,end:0,run:0,snd:val('tsn')||s.snd,rep:document.getElementById('trp').checked});break}
case'tq':c.tim.push({id:rid(),l:'Quick',s:300,rem:3e5,end:0,run:0,snd:s.snd,rep:0});break;
case'tpre':{const q=c.pre[+a];if(q)c.tim.push({id:rid(),l:q.l,s:q.s,rem:q.s*1e3,end:nw()+q.s*1e3,run:1,snd:s.snd,rep:0});break}
case'pedit':{const q=c.pre[+a],l=prompt('Preset name',q.l),m=l===null?null:prompt('Minutes',q.s/60);if(m!==null&&+m>0){q.l=l||q.l;q.s=Math.round(m*60)}break}
case'pdel':c.pre.splice(+a,1);break;
case'ttog':case'trst':case'tplus':{const t=c.tim.find(q=>q.id===a);if(!t)break;if(o==='ttog'){if(t.run){t.rem=t.end-nw();t.run=0}else{t.end=nw()+t.rem;t.run=1}}else if(o==='trst'){t.run=0;t.rem=t.s*1e3}else{const m=(+b||1)*6e4;if(t.run)t.end+=m;else t.rem+=m}break}
case'tdel':c.tim=c.tim.filter(q=>q.id!==a);break;
case'swa':c.sws.push({id:rid(),l:'Stopwatch '+(c.sws.length+1),acc:0,st:0,run:0,laps:[]});break;
case'swt':{const w=c.sws.find(q=>q.id===a);if(w){if(w.run){w.acc+=nw()-w.st;w.run=0}else{w.st=nw();w.run=1}}break}
case'swd':c.sws=c.sws.filter(q=>q.id!==a);break;
case'swn':{const w=c.sws.find(q=>q.id===a),n=w&&prompt('Stopwatch name',w.l);if(n)w.l=n;break}
case'swl':{const w=c.sws.find(q=>q.id===a),t=w?w.acc+(w.run?nw()-w.st:0):0;if(t>0){w.laps.push(t);if(s.n.sw)toast(w.l+' lap '+w.laps.length+' · '+sf(t,s.prec))}break}
case'swr':{const w=c.sws.find(q=>q.id===a);if(w)Object.assign(w,{acc:0,st:0,run:0,laps:[]});break}
case'aadd':{const t=val('at');if(!t)return toast('Pick a time');c.alm.push({id:rid(),t,l:val('al'),days:[...Q('.ad:checked')].map(q=>+q.value),on:1,last:''});break}
case'atog':{const q=c.alm.find(z=>z.id===a);if(q)q.on^=1;break}
case'adel':c.alm=c.alm.filter(q=>q.id!==a);break;
case'zadd':{const z=val('zi');try{new Intl.DateTimeFormat('en',{timeZone:z});c.z.push(z)}catch(e){return toast('Unknown time zone')}break}
case'zdel':c.z.splice(+a,1);break;
case'set':s[a]=/^-?\d+(\.\d+)?$/.test(b)?+b:b;if(a==='rot')s.rot=Math.min(30,Math.max(3,+b||6));break;
case'nt':s.n[a]^=1;break;
case'reqN':if(!window.Notification)return toast('Notifications not supported here');Notification.requestPermission().then(r=>toast('Notifications: '+r));return;
case'test':snd(s.snd,s.vol,s.rep);return}
save();go()};
const rv=i=>`<div class="rv" data-r="${i}"></div>`,ck0=()=>'<div class="cwt" data-k="c:0"></div><div class="cwl" data-k="d:0"></div>',
bt=(o,a,l,g)=>`<button class="${g?'g':''}" onclick="cwA('${o}','${a}')">${l}</button>`;
const psel=k=>{const c=CW(V()),p=c[k],a=k==='pom'?c.ppre:c.fpre;return `<select style="margin-top:4px" onchange="cwA('xpre','${k}',this.value)"><option value="">Preset…</option>${a.map((q,i)=>`<option value="${i}" ${p.sel===i?'selected':''}>${esc(q.nm)}</option>`).join('')}</select>`};
function tvd(){const c=CW(V()),t=c.tim[0];return(t?`<div class="cwl">Timer · ${esc(t.l||'Timer')}</div><div class="cwt" data-k="t:${t.id}"></div><div class="row">${bt('ttog',t.id,t.run?'Pause':'Start')}${bt('trst',t.id,'Reset',1)}<button class="g" onclick="cwA('tplus','${t.id}',1)">+1</button><button class="g" onclick="cwA('tplus','${t.id}',10)">+10</button></div>`:'<div class="cwl">Timer</div><div class="cwt">00:00</div>')+`<select style="margin-top:4px" onchange="cwA('tsel',this.value)"><option value="">Preset…</option>${c.pre.map((q,i)=>`<option value="${i}" ${t&&t.pi===i?'selected':''}>${esc(q.l)}</option>`).join('')}</select>`}
const prc=k=>{const c=CW(V()),a=k==='pom'?c.ppre:c.fpre;return `<div class="card"><h3>Presets</h3><div class="row">${a.map((q,i)=>`<span class="chip">${esc(q.nm)} (${k==='pom'?q.w+'/'+q.s+'/'+q.l:q.w+'/'+q.b}) <button class="g" onclick="cwA('xpre','${k}',${i})">▶</button><button class="g" onclick="cwA('xedit','${k}',${i})">✎</button><button class="x" onclick="cwA('xdel','${k}',${i})">✕</button></span>`).join('')||'<small>None</small>'}</div><br><button class="g" onclick="cwA('xsave','${k}')">Save current settings as preset</button><p class="cwl">+1 / +10 min only change the current session, never the preset.</p></div>`};
function pv(k,m){const p=CW(V())[k];return `<div class="cwl">${k==='pom'?'Pomodoro':'Focus timer'} · ${PHN(k,p.ph)}</div><div class="cwt" data-k="${k}"></div><div class="row">${bt('tog',k,p.run?(m==='o'?'Stop':'Pause'):'Start')}${m==='o'?'':bt('rst',k,'Reset',1)}${m==='f'||m==='x'?bt('skip',k,'Skip',1):''}${m==='f'||m==='d'||m==='x'?`<button class="g" onclick="cwA('padd','${k}',1)">+1</button><button class="g" onclick="cwA('padd','${k}',10)">+10</button>`:''}</div>${m==='d'||m==='x'?psel(k):''}`}
function tv(){const t=CW(V()).tim[0];return t?`<div class="cwl">Timer · ${esc(t.l||'Timer')}</div><div class="cwt" data-k="t:${t.id}"></div><div class="row">${bt('ttog',t.id,t.run?'Pause':'Start')}${bt('trst',t.id,'Reset',1)}</div>`:`<div class="cwl">Timer</div><div class="cwt">00:00</div>${bt('tq','','Quick 5:00')}`}
const dm=(c,d)=>[...c.pom.log,...c.foc.log].filter(x=>x.d===d).reduce((a,x)=>a+x.m,0),day=n=>{const d=new Date();d.setDate(d.getDate()-n);return iso(d)},
wkm=c=>[0,1,2,3,4,5,6].reduce((a,i)=>a+dm(c,day(i)),0),stk=c=>{let i=dm(c,day(0))?0:1,n=0;while(i<400&&dm(c,day(i))){n++;i++}return n};
const SEP='<div style="border-top:1px solid var(--bd);margin:8px 0"></div>',RV={clkS:c=>[`<div class="cwl">${zl(c.z[0])}</div>`+ck0()+c.z.slice(1).map((z,i)=>`<div class="t"><span>${esc(zl(z))}</span><b data-k="c:${i+1}"></b></div>`).join('')],pomS:c=>[pv('pom','x')+SEP+RV.pom(c)[1]+'<button class="g" style="margin-top:6px" onclick="cwA(\'tab\',\'pom\')">Open Pomodoro →</button>'],timS:c=>[RV.tim(c).join(SEP)],focS:c=>[pv('foc','x')+SEP+RV.foc(c)[1]+'<button class="g" style="margin-top:6px" onclick="cwA(\'tab\',\'foc\')">Open Focus timer →</button>'],dPom:c=>[pv('pom','d')],dTim:c=>[tvd()],dFoc:c=>[pv('foc','d')],clk:c=>[`<div class="cwl">${zl(c.z[0])}</div>`+ck0(),...c.z.slice(1).map((z,i)=>`<div class="cwl">${esc(zl(z))}</div><div class="cwt" data-k="c:${i+1}"></div><div class="cwl" data-k="d:${i+1}"></div>`)],
pom:c=>[pv('pom','o'),`<div class="cwl">Pomodoro cycles</div><div class="cwt2">${c.pom.c}/${c.pom.n} in this cycle</div><small>Today ${c.pom.log.filter(x=>x.d===td()).length}/${c.pom.goal} · total ${c.pom.log.length}</small>`],
tim:c=>[tv(),`<div class="cwl">Presets</div><div class="row">${c.pre.slice(0,4).map((p,i)=>bt('tpre',i,esc(p.l),1)).join('')}</div>`],
foc:c=>[pv('foc','n'),`<div class="cwl">Focus analytics</div><div class="cwt2">${dm(c,td())} min today</div><small>Week ${wkm(c)} min · streak ${stk(c)}d · ${c.foc.base+c.foc.log.length} sessions</small>`],
dsh:c=>[pv('pom','o'),tv(),pv('foc','n')]};
function ptab(k){const c=CW(V()),p=c[k],F=k==='pom'?[['w','Work (min)'],['s','Short break'],['l','Long break'],['n','Cycles before long break'],['goal','Daily goal (sessions)']]:[['w','Focus (min)'],['b','Break (min)']];TFAPI.ensure(V());const ts=(V().tf.tasks||[]).filter(t=>t.status!=='done'&&!t.archived);
return `<div class="card">${pv(k,'f')}<br><div class="grid">${F.map(f=>`<label>${f[1]}<input type="number" min="1" value="${p[f[0]]}" onchange="cwA('ps','${k}','${f[0]}',this.value)"></label>`).join('')}<label>Link to task (adds minutes)<select onchange="cwA('ps','${k}','task',this.value)"><option value="">None</option>${ts.map(t=>`<option value="${t.id}" ${p.task===t.id?'selected':''}>${esc(t.title)}</option>`).join('')}</select></label></div>${k==='pom'?`<br><label><input type="checkbox" style="width:auto" ${p.auto?'checked':''} onchange="cwA('ps','pom','auto',this.checked?1:0)"> Auto-start next phase</label>`:''}</div><br>${prc(k)}<br><div class="card"><h3>History</h3>${p.log.slice(-10).reverse().map(x=>`<div class="t"><span>${x.d}</span><small>${x.m} min${x.t?' · linked to task':''}</small></div>`).join('')||'<small>No sessions yet</small>'}</div>`}
function ttab(){const c=CW(V());return `<div class="card"><h3>New timer</h3><div class="row"><input id="tl" placeholder="Label"><input id="th" type="number" min="0" placeholder="h" style="width:64px"><input id="tmn" type="number" min="0" placeholder="m" style="width:64px"><input id="ts" type="number" min="0" placeholder="s" style="width:64px"><select id="tsn" style="width:auto">${Object.keys(SN).map(n=>`<option ${n===c.set.snd?'selected':''}>${n}</option>`).join('')}</select><label><input id="trp" type="checkbox" style="width:auto"> repeat</label></div><br><div class="row"><button onclick="cwA('tadd')">Add timer</button><button class="g" onclick="cwA('tpsave')">Save as preset</button></div></div><br><div class="card"><h3>Presets</h3><div class="row">${c.pre.map((p,i)=>`<span class="chip">${esc(p.l)} <button class="g" onclick="cwA('tpre',${i})">▶</button><button class="g" onclick="cwA('pedit',${i})">✎</button><button class="x" onclick="cwA('pdel',${i})">✕</button></span>`).join('')||'<small>None</small>'}</div></div><br><div class="card"><h3>Timers</h3>${c.tim.map(t=>`<div class="t"><span>${esc(t.l||'Timer')}${t.rep?' ↻':''}</span><b class="cwt2" data-k="t:${t.id}"></b>${bt('ttog',t.id,t.run?'Pause':'Start')}${bt('trst',t.id,'Reset',1)}${bt('tplus',t.id,'+1m',1)}<button class="x" onclick="cwA('tdel','${t.id}')">✕</button></div>`).join('')||'<small>No timers yet</small>'}</div>`}
function swtab(){const c=CW(V()),d=c.set.prec;return `<div class="row"><button onclick="cwA('swa')">+ Add stopwatch</button><label>Precision <select onchange="cwA('set','prec',this.value)">${[0,1,2,3].map(n=>`<option value="${n}" ${d==n?'selected':''}>${n} decimals</option>`).join('')}</select></label></div><br><div class="grid">${c.sws.map(w=>{const La=w.laps.map((t,i)=>({t,s:t-(w.laps[i-1]||0)})),ss=La.map(x=>x.s),mn=Math.min(...ss),mx=Math.max(...ss);return `<div class="card"><div class="row" style="justify-content:space-between"><b>${esc(w.l)}</b><span><button class="g" onclick="cwA('swn','${w.id}')">✎</button> <button class="x" onclick="cwA('swd','${w.id}')">✕</button></span></div><div class="cwt" data-k="sw:${w.id}"></div><br><div class="row"><button onclick="cwA('swt','${w.id}')">${w.run?'Pause':'Start'}</button><button class="g" onclick="cwA('swl','${w.id}')">Lap</button><button class="g" onclick="cwA('swr','${w.id}')">Reset</button></div><br>${La.slice().reverse().map((x,i)=>`<div class="t" style="color:${La.length>1&&x.s===mn?'#3ddc97':La.length>1&&x.s===mx?'#e04646':'inherit'}"><span>Lap ${La.length-i}</span><b>${sf(x.s,d)}</b><small>${sf(x.t,d)}</small></div>`).join('')||'<small>No laps (green = best, red = worst)</small>'}</div>`}).join('')||'<small>No stopwatches</small>'}</div>`}
function cltab(){const c=CW(V()),s=c.set;return `<div class="card">${s.ana?'<svg data-an viewBox="0 0 100 100" width="170"><circle cx="50" cy="50" r="46" fill="none" stroke="#2f55d4" stroke-width="2"/><line class="h" x1="50" y1="50" x2="50" y2="28" stroke="#ececf1" stroke-width="3"/><line class="m" x1="50" y1="50" x2="50" y2="14" stroke="#ececf1" stroke-width="2"/><line class="s" x1="50" y1="50" x2="50" y2="10" stroke="#e04646" stroke-width="1"/></svg>':'<div class="cwt" data-k="c:0"></div>'}<div class="cwl" data-k="d:0"></div></div><br><div class="grid"><div class="card"><h3>Locations</h3>${c.z.map((z,i)=>`<div class="t"><span>${esc(zl(z))}</span><b data-k="c:${i}"></b>${i?`<button class="x" onclick="cwA('zdel',${i})">✕</button>`:''}</div>`).join('')}<div class="row" style="margin-top:8px"><input id="zi" list="zl" placeholder="e.g. Europe/Paris"><datalist id="zl">${(Intl.supportedValuesOf?Intl.supportedValuesOf('timeZone'):[]).map(z=>`<option>${z}</option>`).join('')}</datalist><button onclick="cwA('zadd')">Add</button></div></div><div class="card"><h3>Alarms</h3><div class="row"><input id="at" type="time" style="width:auto"><input id="al" placeholder="Label"></div><div class="row" style="margin:6px 0">${[...'SMTWTFS'].map((d,i)=>`<label><input class="ad" type="checkbox" value="${i}" style="width:auto">${d}</label>`).join('')}<button onclick="cwA('aadd')">Add</button></div>${c.alm.map(a=>`<div class="t ${a.on?'':'done'}"><span>${a.t} ${esc(a.l)}<br><small>${a.days.length?a.days.map(d=>'SMTWTFS'[d]).join(' '):'Once'}</small></span><button class="g" onclick="cwA('atog','${a.id}')">${a.on?'On':'Off'}</button><button class="x" onclick="cwA('adel','${a.id}')">✕</button></div>`).join('')}</div></div>`}
function antab(){const c=CW(V()),ds=[6,5,4,3,2,1,0].map(i=>day(i)),ms=ds.map(d=>dm(c,d)),mx=Math.max(1,...ms),tot=[...c.pom.log,...c.foc.log].reduce((a,x)=>a+x.m,0);
return `<div class="grid"><div class="card"><div class="cwt">${dm(c,td())}</div><div class="cwl">minutes today</div></div><div class="card"><div class="cwt">${wkm(c)}</div><div class="cwl">minutes, last 7 days</div></div><div class="card"><div class="cwt">${tot}</div><div class="cwl">minutes total</div></div><div class="card"><div class="cwt">${stk(c)}d</div><div class="cwl">streak</div></div><div class="card"><div class="cwt">${c.pom.log.length}</div><div class="cwl">pomodoros (${c.pom.log.filter(x=>x.d===td()).length}/${c.pom.goal} today)</div></div><div class="card"><div class="cwt">${c.foc.base+c.foc.log.length}</div><div class="cwl">focus sessions</div></div></div><br><div class="card"><h3>Focus minutes, last 7 days</h3><div class="bars" style="height:120px;margin-bottom:24px">${ms.map((m,i)=>`<div style="height:${Math.max(3,m/mx*100)}%"><span>${m}</span><small>${ds[i].slice(5)}</small></div>`).join('')}</div></div>`}
function sttab(){const c=CW(V()),s=c.set,sel=(k,o)=>`<select onchange="cwA('set','${k}',this.value)">${o.map(([v,l])=>`<option value="${v}" ${String(v)===String(s[k])?'selected':''}>${l}</option>`).join('')}</select>`,ck_=(k,l)=>`<label><input type="checkbox" style="width:auto" ${s[k]?'checked':''} onchange="cwA('set','${k}',this.checked?1:0)"> ${l}</label><br>`,N={pom:'Pomodoro',tim:'Timers',sw:'Stopwatch laps',foc:'Focus timer',alm:'Alarms'};
return `<div class="grid"><div class="card"><h3>Clock format</h3>Time ${sel('h24',[[0,'12-hour (AM/PM)'],[1,'24-hour']])}<br><br>Date ${sel('df',[[0,'22 Nov 2026'],[1,'DD/MM/YYYY'],[2,'MM/DD/YYYY'],[3,'YYYY-MM-DD']])}<br><br>Digits ${sel('dig',[[0,'0-9'],[1,'Devanagari ०-९']])}<br><br>Style ${sel('ana',[[0,'Digital'],[1,'Analog + date']])}<br><br>${ck_('sec','Show seconds')}</div><div class="card"><h3>Sound</h3>Tone ${sel('snd',Object.keys(SN).map(n=>[n,n]))}<br><br><label>Volume<input type="range" min="0" max="1" step=".1" value="${s.vol}" onchange="cwA('set','vol',this.value)"></label><br><label>Repeat<input type="number" min="1" max="10" value="${s.rep}" onchange="cwA('set','rep',this.value)"></label><br><button class="g" onclick="cwA('test')">Test sound</button></div><div class="card"><h3>Notifications and pop-ups</h3>${Object.keys(N).map(k=>`<label><input type="checkbox" style="width:auto" ${s.n[k]?'checked':''} onchange="cwA('nt','${k}')"> ${N[k]}</label><br>`).join('')}<br><button class="g" onclick="cwA('reqN')">Enable browser notifications</button><p class="cwl">Alerts only fire while this page is open.</p></div><div class="card"><h3>Overview rotation</h3><label>Seconds per view (3-30)<input type="number" min="3" max="30" value="${s.rot}" onchange="cwA('set','rot',this.value)"></label></div></div>`}
function cwFull(){const c=CW(V()),T=[['ov','Overview'],['clock','Clock'],['pom','Pomodoro'],['tim','Timers'],['sw','Stopwatch'],['foc','Focus timer'],['an','Analytics'],['st','Settings']];
const B={ov:()=>`<div class="grid">${[['Clock','clkS'],['Pomodoro','pomS'],['Timer','timS'],['Focus timer','focS']].map(([t,i])=>`<div class="card"><h3>${t}</h3>${rv(i)}</div>`).join('')}</div>`,clock:cltab,pom:()=>ptab('pom'),tim:ttab,sw:swtab,foc:()=>ptab('foc'),an:antab,st:sttab};
return `<div class="cwx"><h2>Planning centre › Clockwork</h2><div class="sw">${T.map(t=>`<button class="${c.tab===t[0]?'':'g'}" onclick="cwA('tab','${t[0]}')">${t[1]}</button>`).join('')}</div>`+(B[c.tab]||B.ov)()+'</div>'}
window.cwR=(el,j,rel)=>{const r=el.closest('.rv');r._i=rel?((r._i||0)+j+r._n)%r._n:j;r._man=nw()+2e4;ui()};
function ui(){if(view!=='vault'||!V())return;const c=CW(V());
Q('.rv').forEach(e=>{const vs=RV[e.dataset.r](c),n=vs.length;e._n=n;let i=e._i||0;if(!(nw()<(e._man||0)||e.matches(':hover')))i=Math.floor(nw()/(c.set.rot*1e3))%n;i=e._i=i%n;
const h=vs[i]+(n<2?'':`<div class="rd"><button class="g" onclick="cwR(this,-1,1)">‹</button>${vs.map((_,j)=>`<i class="${j===i?'on':''}" onclick="cwR(this,${j})"></i>`).join('')}<button class="g" onclick="cwR(this,1,1)">›</button></div>`);if(e._h!==h){e.innerHTML=h;e._h=h}});
Q('[data-k]').forEach(e=>{const[a,b]=e.dataset.k.split(':');let t='';if(a==='pom'||a==='foc')t=mm(L(c[a]));else if(a==='t'){const x=c.tim.find(q=>q.id===b);t=x?mm(L(x)):''}else if(a==='sw'){const w=c.sws.find(q=>q.id===b);t=w?sf(w.acc+(w.run?nw()-w.st:0),c.set.prec):''}else{const o=ck(c.z[+b]);t=a==='c'?o.t:o.d}if(e.textContent!==t)e.textContent=t});
Q('[data-an]').forEach(s=>{const d=new Date(),R=(q,a)=>s.querySelector(q).setAttribute('transform',`rotate(${a} 50 50)`);R('.h',(d.getHours()%12+d.getMinutes()/60)*30);R('.m',(d.getMinutes()+d.getSeconds()/60)*6);R('.s',d.getSeconds()*6)})}
const mini=b=>`<div class="card cwc" style="padding:8px 10px">${b}</div>`,cwMini=()=>mini(ck0())+mini(rv('dPom'))+mini(rv('dTim'))+mini(rv('dFoc')),cwDash=()=>`<div class="grid cwm">${cwMini()}</div><button class="g" style="margin:6px 0 10px" onclick="go('pf')">Open Clockwork →</button>`;
const _d=dash;dash=function(){return _d().replace('</p><div class="grid">',()=>'</p>'+cwDash()+'<div class="grid">')};
const _p=plan;plan=function(){return _p().replace(/<div class="card"><h3>Focus timer<\/h3>[\s\S]*?Open focus timer →<\/button><\/div>/,()=>`<div class="card cwc" style="grid-column:1/-1"><h3>Clockwork</h3><div class="grid cwm">${cwMini()}</div><button class="g" style="margin-top:6px" onclick="go('pf')">Open Clockwork →</button></div>`)};
const _ps=psub;psub=k=>k==='pf'?cwFull():_ps(k);
const SUBS={src:['Overview','File system','Website library','YT videos/playlists'],ana:['Overview','COMP','CMPLX','STAT','BASE-N','EQN','MATRIX','TABLE','VECTOR','Tools'],learn:['Overview','Sticky notes','Flashcards','Quizzes']},NV=[['dash','Dashboard'],['plan','Planning centre'],['src','Sources centre'],['ana','Analytics centre'],['learn','Learning centre']],mob=()=>{if(innerWidth<=700){U.sb=0;sU()}};
window.cwSb=()=>{U.sb^=1;sU();render()};window.sbT=c=>{U.open[c]=!U.open[c];sU();render()};
window.sbGo=c=>{if(c==='ana')anm='ov';if(SUBS[c]||c==='plan')U.open[c]=1;mob();sU();go(c)};window.sbPl=k=>{mob();go(k)};
window.sbSub=(c,l)=>{mob();if(c==='ana'){anm=({'Overview':'ov','COMP':'comp','CMPLX':'cmplx','STAT':'stat','BASE-N':'basen','EQN':'eqn','MATRIX':'matrix','TABLE':'table','VECTOR':'vector','Tools':'tools'})[l]||'ov';go(c);return}go(c);setTimeout(()=>{const e=[...Q('main h3')].find(x=>x.textContent.includes(l));if(e)e.scrollIntoView({behavior:'smooth'})},60)};
vault=function(){const v=V();if(!v)return'';const on=c=>c==='plan'?PT.includes(tab):tab===c,
row=(c,l)=>{const sub=c==='plan'?PS.map(q=>`<button class="${tab===q[0]?'on':''}" style="padding-left:26px;font-size:.9rem" onclick="sbPl('${q[0]}')">↳ ${q[1]}</button>`):(SUBS[c]||[]).map(s=>`<button style="padding-left:26px;font-size:.9rem" onclick="sbSub('${c}','${s}')">↳ ${s}</button>`),has=sub.length;
return `<div class="sbr"><button class="${on(c)?'on':''}" onclick="sbGo('${c}')">${l}</button>${has?`<button class="g ch" onclick="sbT('${c}')" aria-label="Expand or collapse">${U.open[c]?'▾':'▸'}</button>`:''}</div>`+(has&&U.open[c]?sub.join(''):'')};
return `<div class="app${U.sb?'':' cl'}"><button class="hb3" onclick="cwSb()" aria-label="Toggle sidebar">☰</button><aside class="sb"><div class="logo" style="margin-bottom:6px">PREP<b>VAULT</b></div><div style="color:var(--mu);margin-bottom:10px">${esc(v.name)}</div><div class="sbm">${NV.map(n=>row(n[0],n[1])).join('')}</div><div class="sbb"><button class="${tab==='prof'?'on':''}" onclick="sbPl('prof')">👤 Profile</button><button class="${tab==='set'?'on':''}" onclick="sbPl('set')">⚙ Settings</button><button class="r" onclick="view='vaults';render()">← Leave vault</button></div></aside><main>${(()=>{const M={dash,plan,src,ana,learn,set,hj,prof,pt:()=>psub('pt'),pf:()=>psub('pf'),pr:()=>psub('pr'),pc:()=>psub('pc')};if(!M[tab])tab='dash';return M[tab]()})()}</main></div>`};
const PF=[['name','Name'],['email','Email'],['username','Username'],['age','Age (optional)'],['gender','Gender (optional)'],['occupation','Occupation'],['workplace','Workplace (optional)'],['skills','Skills'],['future','Future skill goals'],['goal','Goal']];(window.PVX=window.PVX||{}).PF=PF;
function prof(){const p=S.profile||(S.profile={});return `<h2>Profile</h2>${PVX.header()}<div class="card" style="max-width:640px"><div class="grid">${PF.map(f=>PVX.field(f,p)).join('')}</div><p class="pvx-note">Optional details stay in this browser and are only included in your own backups.</p><br><button onclick="cwPS()">Save profile</button></div>`}
window.cwPS=()=>{PF.forEach(f=>S.profile[f[0]]=val('pf_'+f[0]));save();toast('Profile saved')};
window.cwPic=i=>{const f=i.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),m=Math.min(im.width,im.height);x.drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,128,128);S.profile.pic=c.toDataURL('image/jpeg',.8);save();go()};im.src=r.result};r.readAsDataURL(f)};
window.cwBk=m=>{if(!m){const s=JSON.stringify(S);(navigator.clipboard?navigator.clipboard.writeText(s).then(()=>toast('All data copied')):Promise.reject()).catch(()=>prompt('Copy all data:',s))}else{const t=prompt('Paste all data text');if(!t)return;try{const o=JSON.parse(t);if(!Array.isArray(o.vaults))throw 0;if(!confirm('Replace ALL current data?'))return;S=o;save();view='vaults';render();toast('Restored')}catch(e){toast('Invalid data text')}}};
const _s=set;set=function(){return _s().replace('<div class="card"><h3>About</h3>',()=>'<div class="card"><h3>All data backup</h3><p style="color:var(--mu)">Copy everything (all vaults, profile, Clockwork) as text, or restore it.</p><div class="row"><button onclick="cwBk(0)">Copy all data</button><button class="g" onclick="cwBk(1)">Restore from text</button></div></div><div class="card"><h3>About</h3>')};
const R0=render;render=function(){R0();ui()};
setInterval(()=>{eng();ui()},250);eng();
})();

/* ================= v9 CALCULATOR MODES + TOOLS (override block) ================= */
(function(){
const $=id=>document.getElementById(id),E=s=>esc(String(s));
function CE(m){this.message=m;this.isC=1}
const err=m=>{throw new CE(m)},ME=()=>err('Math error'),SY=()=>err('Syntax error');
const AU={deg:Math.PI/180,rad:1,gra:Math.PI/200},ANGN={deg:'DEG',rad:'RAD',gra:'GRA'};
const chk=x=>{if(typeof x!=='number'||!isFinite(x))ME();return x===0?0:x};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b){[a,b]=[b,a%b]}return a};

/* ---------- rational / exact-form detection ---------- */
function ratio(x,maxd,tol){
 if(!isFinite(x))return null;const s=x<0?-1:1,y=Math.abs(x);if(y===0)return[0,1];
 let h1=1,h0=0,k1=0,k0=1,b=y;
 for(let i=0;i<40;i++){const a=Math.floor(b),h2=a*h1+h0,k2=a*k1+k0;if(k2>maxd)break;h0=h1;h1=h2;k0=k1;k1=k2;
  if(Math.abs(y-h1/k1)<=tol*y)return[s*h1,k1];const fr=b-a;if(fr<1e-15)break;b=1/fr}
 return null}
function fracStr(p,q){return q===1?String(p):p+'/'+q}
function piStr(p,q){const s=p<0?'-':'',a=Math.abs(p);if(q===1)return s+(a===1?'':a)+'π';return s+(a===1?'':a)+'π/'+q}
function surdStr(p,q,neg){if(!Number.isInteger(p)||!Number.isInteger(q))return null;const N=p*q;if(N>1e6||N<2)return null;
 let f=1,m=N;for(let k=2;k*k<=m;k++)while(m%(k*k)===0){m/=k*k;f*=k}
 if(m===1)return null;const g=gcd(f,q);f/=g;q/=g;return(neg?'-':'')+(f===1?'':f)+'√'+m+(q>1?'/'+q:'')}
function exactForm(v,apx){
 if(!isFinite(v)||v===0)return null;const tol=apx?1e-8:1e-11,a=Math.abs(v);
 if(a<1e15&&Math.abs(v-Math.round(v))<=tol*a)return null;
 let r=ratio(v,10000,tol);
 if(r&&r[1]>1){const mixed=Math.abs(r[0])>r[1]?(r[0]<0?'-':'')+Math.floor(Math.abs(r[0])/r[1])+' '+(Math.abs(r[0])%r[1])+'/'+r[1]:'';return{s:fracStr(r[0],r[1]),mixed}}
 r=ratio(v/Math.PI,100,tol);if(r&&r[0]!==0&&Math.abs(r[0])<=1000)return{s:piStr(r[0],r[1])};
 r=ratio(v*v,1000,tol);if(r){const q=surdStr(r[0],r[1],v<0);if(q)return{s:q}}
 return null}
function fmtN(x){
 if(!isFinite(x))return String(x);if(x===0)return'0';const a=Math.abs(x);
 if(a>=1e10||a<1e-5){let m=x.toExponential(9);const[mm,ee]=m.split('e');return mm.replace(/\.?0+$/,'')+'×10^'+(+ee)}
 return String(+x.toPrecision(10))}
function fmtRes(v,sd,apx){
 if(apx)v=+v.toPrecision(9);const ex=exactForm(v,apx),dec=fmtN(v);
 if(!ex)return{main:dec,alt:'',ex:null,dec};
 if(sd==='S')return{main:ex.s,alt:(ex.mixed?ex.mixed+' · ':'')+dec,ex:ex.s,dec};
 return{main:dec,alt:ex.s,ex:ex.s,dec}}
const fv=(v,sd)=>fmtRes(v,sd,0).main;

/* ---------- number helpers ---------- */
function fact(a){if(!Number.isInteger(a)||a<0||a>170)ME();let r=1;for(let i=2;i<=a;i++)r*=i;return chk(r)}
function npr(n,r){if(!Number.isInteger(n)||!Number.isInteger(r)||n<0||r<0||r>n)ME();let x=1;for(let i=0;i<r;i++)x*=(n-i);return chk(x)}
function ncr(n,r){if(!Number.isInteger(n)||!Number.isInteger(r)||n<0||r<0||r>n)ME();r=Math.min(r,n-r);let x=1;for(let i=1;i<=r;i++)x=x*(n-r+i)/i;return chk(Math.round(x))}
function pw(a,b){if(a===0&&b===0)ME();if(a===0&&b<0)ME();
 if(a<0&&!Number.isInteger(b)){const r=ratio(b,99,1e-12);if(r&&r[1]%2===1)return(Math.abs(r[0])%2===1?-1:1)*Math.pow(-a,b);ME()}
 return Math.pow(a,b)}
function rootN(n,x){if(n===0)ME();if(Number.isInteger(n)){if(x<0){if(n%2===0)ME();return-Math.pow(-x,1/n)}return Math.pow(x,1/n)}if(x<0)ME();return Math.pow(x,1/n)}
function trig(k,a,ang){
 const q=a*AU[ang]/(Math.PI/2),r=Math.round(q);
 if(Math.abs(q-r)<1e-12*Math.max(1,Math.abs(q))){const m=((r%4)+4)%4;
  if(k==='sin')return[0,1,0,-1][m];if(k==='cos')return[1,0,-1,0][m];if(m%2===1)ME();return 0}
 return Math[k](a*AU[ang])}
const clamp=x=>Math.max(-1,Math.min(1,x));
function fnNum(nm,v,ang){
 const need=k=>{if(v.length!==k)SY()},x=v[0];
 switch(nm){
 case'sin':case'cos':case'tan':need(1);return trig(nm,x,ang);
 case'asin':need(1);if(Math.abs(x)>1+1e-12)ME();return Math.asin(clamp(x))/AU[ang];
 case'acos':need(1);if(Math.abs(x)>1+1e-12)ME();return Math.acos(clamp(x))/AU[ang];
 case'atan':need(1);return Math.atan(x)/AU[ang];
 case'sinh':need(1);return Math.sinh(x);case'cosh':need(1);return Math.cosh(x);case'tanh':need(1);return Math.tanh(x);
 case'asinh':need(1);return Math.asinh(x);
 case'acosh':need(1);if(x<1)ME();return Math.acosh(x);
 case'atanh':need(1);if(Math.abs(x)>=1)ME();return Math.atanh(x);
 case'ln':need(1);if(x<=0)ME();return Math.log(x);
 case'log':if(v.length===2){const b=v[0],y=v[1];if(b<=0||b===1||y<=0)ME();return Math.log(y)/Math.log(b)}need(1);if(x<=0)ME();return Math.log10(x);
 case'logb':{need(2);const b=v[0],y=v[1];if(b<=0||b===1||y<=0)ME();return Math.log(y)/Math.log(b)}
 case'exp':need(1);return Math.exp(x);
 case'sqrt':need(1);if(x<0)ME();return Math.sqrt(x);
 case'cbrt':need(1);return Math.cbrt(x);
 case'root':need(2);return rootN(v[0],v[1]);
 case'abs':case'Abs':need(1);return Math.abs(x);
 case'fact':need(1);return fact(x);
 case'floor':need(1);return Math.floor(x);case'ceil':need(1);return Math.ceil(x);case'round':need(1);return Math.round(x);
 case'sign':need(1);return Math.sign(x);
 case'nPr':need(2);return npr(v[0],v[1]);case'nCr':need(2);return ncr(v[0],v[1]);
 case'Re':case're':case'Conj':case'conj':need(1);return x;
 case'Im':case'im':need(1);return 0;
 case'Arg':case'arg':need(1);if(x===0)ME();return(x<0?Math.PI:0)/AU[ang];
 }SY()}

/* ---------- tokenizer + parser ---------- */
const FN1=['sin','cos','tan','asin','acos','atan','sinh','cosh','tanh','asinh','acosh','atanh','ln','log','exp','sqrt','cbrt','abs','Abs','Arg','arg','Conj','conj','Re','re','Im','im','fact','floor','ceil','round','sign'];
const FNM=['logb','root','nPr','nCr','deriv','integ'];
const KN=[...FN1,...FNM,'pi','e','i','Ans','x','A','B','C','D','E','F','M'];
function splitId(w){if(KN.includes(w))return[w];for(let l=w.length-1;l>=1;l--){const p=w.slice(0,l);if(KN.includes(p)){const r=splitId(w.slice(l));if(r)return[p,...r]}}return null}
function tokenize(s){
 s=s.replace(/⁻¹/g,'^(-1)').replace(/²/g,'^2').replace(/³/g,'^3').replace(/[×·]/g,'*').replace(/÷/g,'/').replace(/[−–]/g,'-').replace(/π/g,'pi').replace(/√/g,'sqrt').replace(/∛/g,'cbrt').replace(/∠/g,'@');
 const t=[];let i=0;
 while(i<s.length){const c=s[i];if(/\s/.test(c)){i++;continue}
  let m=/^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/.exec(s.slice(i));
  if(m){t.push({k:'n',v:parseFloat(m[0])});i+=m[0].length;if(s[i]==='.')SY();continue}
  m=/^[A-Za-z]+/.exec(s.slice(i));
  if(m){const p=splitId(m[0]);if(!p)SY();p.forEach(x=>t.push({k:'i',v:x}));i+=m[0].length;continue}
  if('+-*/^(),!%°@'.includes(c)){t.push({k:'o',v:c});i++;continue}
  SY()}
 return t}
function parse(T){
 let p=0;const pk=()=>T[p],nx=()=>T[p++],isO=v=>pk()&&pk().k==='o'&&pk().v===v;
 const startsOp=()=>{const k=pk();if(!k)return false;if(k.k==='n')return true;if(k.k==='o')return k.v==='(';return k.v!=='nPr'&&k.v!=='nCr'};
 function sum(){let a=prod();while(pk()&&pk().k==='o'&&(pk().v==='+'||pk().v==='-')){const o=nx().v;a={t:'b',o,a,b:prod()}}return a}
 function prod(){let a=nprc();for(;;){const k=pk();if(!k)break;
  if(k.k==='o'&&(k.v==='*'||k.v==='/')){nx();a={t:'b',o:k.v,a,b:nprc()}}
  else if(startsOp())a={t:'b',o:'*',a,b:nprc()};else break}return a}
 function nprc(){let a=unary();while(pk()&&pk().k==='i'&&(pk().v==='nPr'||pk().v==='nCr')){const o=nx().v;a={t:'b',o,a,b:unary()}}return a}
 function unary(){if(isO('-')){nx();return{t:'u',a:unary()}}if(isO('+')){nx();return unary()}return polar()}
 function unaryPow(){if(isO('-')){nx();return{t:'u',a:unaryPow()}}if(isO('+')){nx();return unaryPow()}return pow()}
 function polar(){const a=pow();if(isO('@')){nx();return{t:'pol',a,b:unaryPow()}}return a}
 function pow(){const a=post();if(isO('^')){nx();return{t:'b',o:'^',a,b:unaryPow()}}return a}
 function post(){let a=primary();while(pk()&&pk().k==='o'&&(pk().v==='!'||pk().v==='%'||pk().v==='°'))a={t:'p',o:nx().v,a};return a}
 function close(){if(isO(')'))nx();else if(p<T.length)SY()}
 function primary(){const k=nx();if(!k)SY();
  if(k.k==='n')return{t:'n',v:k.v};
  if(k.k==='o'){if(k.v==='('){const e=sum();close();return e}SY()}
  const v=k.v;
  if(v==='pi')return{t:'k',v:Math.PI};if(v==='e')return{t:'k',v:Math.E};
  if(v==='i')return{t:'i'};if(v==='Ans')return{t:'ans'};if(v==='x')return{t:'x'};
  if(/^[A-FM]$/.test(v))return{t:'var',n:v};
  if(isO('(')){nx();const args=[];if(!isO(')')){for(;;){args.push(sum());if(isO(',')){nx();continue}break}}close();return{t:'f',n:v,args}}
  if(FN1.includes(v))return{t:'f',n:v,args:[unaryPow()]};
  SY()}
 const r=sum();if(p<T.length)SY();return r}
const parseStr=s=>{const T=tokenize(s);if(!T.length)SY();return parse(T)};

/* ---------- real evaluator ---------- */
function evR(n,env){
 switch(n.t){
 case'n':case'k':return n.v;
 case'ans':return env.ans;
 case'var':return env.vars&&env.vars[n.n]!=null?env.vars[n.n]:0;
 case'x':if(env.x===undefined)SY();return env.x;
 case'i':case'pol':SY();break;
 case'u':return-evR(n.a,env);
 case'p':{const a=evR(n.a,env);if(n.o==='!')return fact(a);if(n.o==='%')return a/100;return a*(Math.PI/180)/AU[env.ang]}
 case'b':{const a=evR(n.a,env),b=evR(n.b,env);
  switch(n.o){case'+':return chk(a+b);case'-':return chk(a-b);case'*':return chk(a*b);case'/':if(b===0)ME();return chk(a/b);case'^':return chk(pw(a,b));case'nPr':return npr(a,b);case'nCr':return ncr(a,b)}break}
 case'f':return chk(fnR(n,env));
 }SY()}
function fnR(n,env){
 const a=n.args;
 if(n.n==='deriv'){if(a.length!==2)SY();const at=evR(a[1],env);if(env.flags)env.flags.apx=1;return deriv(a[0],at,env)}
 if(n.n==='integ'){if(a.length!==3)SY();const lo=evR(a[1],env),hi=evR(a[2],env);if(env.flags)env.flags.apx=1;return integ(a[0],lo,hi,env)}
 return fnNum(n.n,a.map(q=>evR(q,env)),env.ang)}
function deriv(node,a,env){const f=x=>chk(evR(node,Object.assign({},env,{x}))),h=1e-3*Math.max(1,Math.abs(a));
 return(f(a-2*h)-8*f(a-h)+8*f(a+h)-f(a+2*h))/(12*h)}
function integ(node,a,b,env){
 if(a===b)return 0;let sg=1;if(a>b){[a,b]=[b,a];sg=-1}
 let cnt=0;const f=x=>{const y=evR(node,Object.assign({},env,{x}));if(!isFinite(y))ME();return y};
 const simp=(fa,fm,fb,l,r)=>(r-l)/6*(fa+4*fm+fb);
 function rec(l,r,fl,fm,fr,whole,tol,d){const m=(l+r)/2,lm=(l+m)/2,rm=(m+r)/2,flm=f(lm),frm=f(rm);if(++cnt>300000)ME();
  const L=simp(fl,flm,fm,l,m),R=simp(fm,frm,fr,m,r);
  if(d<=0||Math.abs(L+R-whole)<=15*tol)return L+R+(L+R-whole)/15;
  return rec(l,m,fl,flm,fm,L,tol/2,d-1)+rec(m,r,fm,frm,fr,R,tol/2,d-1)}
 const N=16,w=(b-a)/N;let tot=0;
 for(let i=0;i<N;i++){const l=a+i*w,r=i===N-1?b:a+(i+1)*w,m=(l+r)/2,fl=f(l),fm=f(m),fr=f(r);tot+=rec(l,r,fl,fm,fr,simp(fl,fm,fr,l,r),1e-11,30)}
 return sg*tot}
function calcExpr(src,env){
 let s=String(src).trim(),sto=null;const m=/(?:→|->)\s*([A-FM])\s*$/.exec(s);if(m){sto=m[1];s=s.slice(0,m.index)}
 if(!s)SY();const flags={},v=evR(parseStr(s),Object.assign({},env,{flags}));if(!isFinite(v))ME();
 return{v:v===0?0:v,apx:!!flags.apx,sto}}
/* plain number input (accepts fractions / expressions); '' -> null */
function numIn(str,env){const s=String(str==null?'':str).trim();if(s==='')return null;const n=Number(s);if(isFinite(n))return n;return calcExpr(s,env||{ang:'rad',ans:0,vars:{}}).v}
const nz=(str,env)=>{const v=numIn(str,env);return v===null?0:v};

/* ---------- complex ---------- */
const cadd=(a,b)=>[a[0]+b[0],a[1]+b[1]],csub=(a,b)=>[a[0]-b[0],a[1]-b[1]],cmul=(a,b)=>[a[0]*b[0]-a[1]*b[1],a[0]*b[1]+a[1]*b[0]];
const cdiv=(a,b)=>{const d=b[0]*b[0]+b[1]*b[1];if(d===0)ME();return[(a[0]*b[0]+a[1]*b[1])/d,(a[1]*b[0]-a[0]*b[1])/d]};
const cabs=a=>Math.hypot(a[0],a[1]),carg=a=>Math.atan2(a[1],a[0]);
const cexp=a=>{const e=Math.exp(a[0]);return[e*Math.cos(a[1]),e*Math.sin(a[1])]};
const cln=a=>{if(a[0]===0&&a[1]===0)ME();return[Math.log(cabs(a)),carg(a)]};
function csqrt(a){if(a[1]===0)return a[0]>=0?[Math.sqrt(a[0]),0]:[0,Math.sqrt(-a[0])];const r=Math.sqrt(cabs(a)),t=carg(a)/2;return[r*Math.cos(t),r*Math.sin(t)]}
function cpow(a,b){
 if(a[0]===0&&a[1]===0){if(b[1]===0&&b[0]>0)return[0,0];ME()}
 if(b[1]===0&&Number.isInteger(b[0])&&Math.abs(b[0])<=1e4){let n=Math.abs(b[0]),r=[1,0],base=a;while(n){if(n&1)r=cmul(r,base);base=cmul(base,base);n=Math.floor(n/2)}return b[0]<0?cdiv([1,0],r):r}
 return cexp(cmul(b,cln(a)))}
function cclean(z){const s=Math.max(Math.abs(z[0]),Math.abs(z[1]),1e-300);return[Math.abs(z[0])<1e-13*s?0:z[0],Math.abs(z[1])<1e-13*s?0:z[1]]}
function evC(n,env){
 const R=x=>[x,0],real=z=>{if(z[1]!==0)ME();return z[0]};
 switch(n.t){
 case'n':case'k':return R(n.v);case'i':return[0,1];
 case'ans':return env.ansC||R(0);
 case'var':return R(env.vars&&env.vars[n.n]!=null?env.vars[n.n]:0);
 case'x':case'':SY();break;
 case'u':{const a=evC(n.a,env);return[-a[0],-a[1]]}
 case'pol':{const r=real(evC(n.a,env)),th=real(evC(n.b,env));return[r*trig('cos',th,env.ang),r*trig('sin',th,env.ang)]}
 case'p':{const a=evC(n.a,env);if(n.o==='!')return R(fact(real(a)));if(n.o==='%')return[a[0]/100,a[1]/100];const k=(Math.PI/180)/AU[env.ang];return[a[0]*k,a[1]*k]}
 case'b':{const a=evC(n.a,env),b=evC(n.b,env);
  switch(n.o){case'+':return cadd(a,b);case'-':return csub(a,b);case'*':return cmul(a,b);case'/':return cdiv(a,b);case'^':return cpow(a,b);
   case'nPr':return R(npr(real(a),real(b)));case'nCr':return R(ncr(real(a),real(b)))}break}
 case'f':{const nm=n.n,v=n.args.map(q=>evC(q,env)),need=k=>{if(v.length!==k)SY()};
  switch(nm){
  case'sqrt':need(1);return csqrt(v[0]);
  case'exp':need(1);return cexp(v[0]);
  case'ln':need(1);return cln(v[0]);
  case'log':need(1);return cdiv(cln(v[0]),R(Math.LN10));
  case'abs':case'Abs':need(1);return R(cabs(v[0]));
  case'arg':case'Arg':need(1);if(v[0][0]===0&&v[0][1]===0)ME();return R(carg(v[0])/AU[env.ang]);
  case'conj':case'Conj':need(1);return[v[0][0],-v[0][1]];
  case're':case'Re':need(1);return R(v[0][0]);
  case'im':case'Im':need(1);return R(v[0][1]);
  case'root':need(2);return cexp(cdiv(cln(v[1]),v[0]));
  case'deriv':case'integ':SY();break;
  default:return R(fnNum(nm,v.map(real),env.ang))}}
 }SY()}
function calcC(src,env){const s=String(src).trim();if(!s)SY();const z=cclean(evC(parseStr(s),env));if(!isFinite(z[0])||!isFinite(z[1]))ME();return z}
function cPart(v,sd){const e=sd==='S'?exactForm(v,0):null;return e?e.s:fmtN(v)}
function cRect(z,sd){
 const a=z[0],b=z[1],A=cPart(a,sd);if(b===0)return A;
 const ab=Math.abs(b),B=ab===1?'':cPart(ab,sd),Bw=/^[0-9.]*$/.test(B)||/×10\^/.test(B)?B:'('+B+')',im=Bw+'i';
 if(a===0)return(b<0?'-':'')+im;return A+(b<0?' − ':' + ')+im}
function cPolar(z,ang,sd){const r=cabs(z);if(r===0)return'0';return cPart(r,sd)+'∠'+cPart(carg(z)/AU[ang],sd)}

/* ---------- BASE-N ---------- */
const BN_B={BIN:2,OCT:8,DEC:10,HEX:16},BN_KW=['AND','OR','XOR','XNOR','NOT','NEG'];
function bnEval(src,base,W){
 const B=BigInt(W),lo=-(1n<<(B-1n)),hi=(1n<<(B-1n))-1n,rg=x=>{if(x<lo||x>hi)ME();return x},radix=BN_B[base];
 const T=[];let i=0;const s=String(src);
 while(i<s.length){const c=s[i];if(/\s/.test(c)){i++;continue}
  const m=/^[0-9A-Za-z]+/.exec(s.slice(i));
  if(m){const w=m[0].toUpperCase();
   if(BN_KW.includes(w))T.push({k:'k',v:w});
   else{const dg='0123456789ABCDEF'.slice(0,radix);for(const ch of w)if(!dg.includes(ch))SY();let v=0n;for(const ch of w)v=v*BigInt(radix)+BigInt(dg.indexOf(ch));
    if(base==='DEC'){if(v>hi)ME()}else{if(v>=(1n<<B))ME();if(v>hi)v-=(1n<<B)}T.push({k:'n',v})}
   i+=m[0].length;continue}
  if('+-*/()'.includes(c)){T.push({k:'o',v:c});i++;continue}
  if(c==='×'){T.push({k:'o',v:'*'});i++;continue}if(c==='÷'){T.push({k:'o',v:'/'});i++;continue}if(c==='−'){T.push({k:'o',v:'-'});i++;continue}
  SY()}
 if(!T.length)SY();let p=0;const pk=()=>T[p],isK=w=>pk()&&pk().k==='k'&&w.includes(pk().v),isO=v=>pk()&&pk().k==='o'&&pk().v===v;
 function orL(){let a=andL();while(isK(['OR','XOR','XNOR'])){const o=T[p++].v,b=andL();a=o==='OR'?a|b:o==='XOR'?a^b:~(a^b)}return a}
 function andL(){let a=sumL();while(isK(['AND'])){p++;a=a&sumL()}return a}
 function sumL(){let a=prodL();while(isO('+')||isO('-')){const o=T[p++].v,b=prodL();a=rg(o==='+'?a+b:a-b)}return a}
 function prodL(){let a=un();while(isO('*')||isO('/')){const o=T[p++].v,b=un();if(o==='*')a=rg(a*b);else{if(b===0n)ME();a=rg(a/b)}}return a}
 function un(){if(isK(['NOT'])){p++;return~un()}if(isK(['NEG'])){p++;return rg(-un())}if(isO('-')){p++;return rg(-un())}if(isO('+')){p++;return un()}return pr()}
 function pr(){const k=T[p++];if(!k)SY();if(k.k==='n')return k.v;if(k.k==='o'&&k.v==='('){const v=orL();if(isO(')'))p++;else if(p<T.length)SY();return v}SY()}
 const r=orL();if(p<T.length)SY();return rg(r)}
function bnFmt(x,base,W){const radix=BN_B[base];if(radix===10)return x.toString();const u=x<0n?x+(1n<<BigInt(W)):x;let s=u.toString(radix).toUpperCase();
 if(base==='BIN'){while(s.length%4)s='0'+s;s=s.replace(/(.{4})(?=.)/g,'$1 ')}return s}

/* ---------- linear algebra helpers ---------- */
const det2=(a,b,c,d)=>a*d-b*c;
function det(M){const n=M.length;if(n===1)return M[0][0];if(n===2)return det2(M[0][0],M[0][1],M[1][0],M[1][1]);
 return M[0][0]*det2(M[1][1],M[1][2],M[2][1],M[2][2])-M[0][1]*det2(M[1][0],M[1][2],M[2][0],M[2][2])+M[0][2]*det2(M[1][0],M[1][1],M[2][0],M[2][1])}
function isSing(M,d){const sc=Math.max(1,...M.flat().map(Math.abs));return d===0||Math.abs(d)<=1e-12*Math.pow(sc,M.length)}
function minor(M,i,j){return M.filter((_,r)=>r!==i).map(r=>r.filter((_,c)=>c!==j))}
function inv(M){const n=M.length,d=det(M);if(isSing(M,d))err('Singular matrix');
 if(n===1)return[[1/M[0][0]]];
 const out=[];for(let i=0;i<n;i++){out.push([]);for(let j=0;j<n;j++){const cof=((i+j)%2?-1:1)*det(minor(M,j,i));out[i].push(cof/d)}}return out}
const tr=M=>M[0].map((_,j)=>M.map(r=>r[j]));
function mmul(A,B){if(A[0].length!==B.length)err('Dimension error');return A.map(r=>B[0].map((_,j)=>r.reduce((s,v,k)=>s+v*B[k][j],0)))}
const mapM=(M,f)=>M.map(r=>r.map(f));
function solveSym(A,b){const n=A.length,M=A.map((r,i)=>[...r,b[i]]);
 for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(M[r][c])>Math.abs(M[p][c]))p=r;if(Math.abs(M[p][c])<1e-12)ME();[M[c],M[p]]=[M[p],M[c]];
  for(let r=0;r<n;r++)if(r!==c){const f=M[r][c]/M[c][c];for(let k=c;k<=n;k++)M[r][k]-=f*M[c][k]}}
 return M.map((r,i)=>r[n]/r[i])}

/* ---------- statistics ---------- */
const sumA=a=>a.reduce((s,v)=>s+v,0);
function median(s){const n=s.length;if(!n)return null;const h=n>>1;return n%2?s[h]:(s[h-1]+s[h])/2}
function stat1(vals,freqs){
 const xs=[];vals.forEach((x,i)=>{const f=freqs[i];for(let k=0;k<f;k++)xs.push(x);if(xs.length>200000)err('Too much data')});
 const n=xs.length;if(!n)ME();const s=[...xs].sort((a,b)=>a-b),sx=sumA(xs),sx2=sumA(xs.map(v=>v*v)),mean=sx/n;
 const ss=sumA(xs.map(v=>(v-mean)*(v-mean))),cnt=new Map();xs.forEach(v=>cnt.set(v,(cnt.get(v)||0)+1));
 let mx=0;cnt.forEach(c=>{if(c>mx)mx=c});const modes=mx>1||n===1?[...cnt].filter(e=>e[1]===mx).map(e=>e[0]).sort((a,b)=>a-b):[];
 const h=n>>1,q1=n>=2?median(s.slice(0,h)):null,q3=n>=2?median(s.slice(n-h)):null;
 return{n,sx,sx2,mean,varP:ss/n,sdP:Math.sqrt(ss/n),varS:n>1?ss/(n-1):null,sdS:n>1?Math.sqrt(ss/(n-1)):null,med:median(s),modes,mxc:mx,q1,q3,min:s[0],max:s[n-1],range:s[n-1]-s[0],iqr:n>=2?q3-q1:null}}
function linfit(X,Y){const n=X.length;if(n<2)ME();const sx=sumA(X),sy=sumA(Y),sxy=sumA(X.map((x,i)=>x*Y[i])),sxx=sumA(X.map(x=>x*x)),syy=sumA(Y.map(y=>y*y));
 const dn=n*sxx-sx*sx;if(dn===0)ME();const b=(n*sxy-sx*sy)/dn,a=(sy-b*sx)/n,dr=Math.sqrt(dn*(n*syy-sy*sy));return{a,b,r:dr===0?null:(n*sxy-sx*sy)/dr}}
function regress(type,X,Y){
 const n=X.length;if(n<2)ME();
 if(type==='lin'){const f=linfit(X,Y);return{type,a:f.a,b:f.b,r:f.r,rl:'r',eq:'y = a + bx',y:x=>f.a+f.b*x,n}}
 if(type==='log'){if(X.some(x=>x<=0))ME();const f=linfit(X.map(Math.log),Y);return{type,a:f.a,b:f.b,r:f.r,rl:'r',eq:'y = a + b·ln x',y:x=>f.a+f.b*Math.log(x),n}}
 if(type==='exp'){if(Y.some(y=>y<=0))ME();const f=linfit(X,Y.map(Math.log)),a=Math.exp(f.a);return{type,a,b:f.b,r:f.r,rl:'r',eq:'y = a·e^(bx)',y:x=>a*Math.exp(f.b*x),n}}
 if(type==='pow'){if(X.some(x=>x<=0)||Y.some(y=>y<=0))ME();const f=linfit(X.map(Math.log),Y.map(Math.log)),a=Math.exp(f.a);return{type,a,b:f.b,r:f.r,rl:'r',eq:'y = a·x^b',y:x=>a*Math.pow(x,f.b),n}}
 if(type==='quad'){if(n<3)ME();const S=k=>sumA(X.map(x=>Math.pow(x,k))),T=k=>sumA(X.map((x,i)=>Math.pow(x,k)*Y[i]));
  const[a,b,c]=solveSym([[n,S(1),S(2)],[S(1),S(2),S(3)],[S(2),S(3),S(4)]],[T(0),T(1),T(2)]),yf=x=>a+b*x+c*x*x,my=sumA(Y)/n;
  const sst=sumA(Y.map(y=>(y-my)*(y-my))),sse=sumA(X.map((x,i)=>(Y[i]-yf(x))*(Y[i]-yf(x))));
  return{type,a,b,c,r:sst===0?null:1-sse/sst,rl:'R²',eq:'y = a + bx + cx²',y:yf,n}}
 ME()}
function regInv(R,y){
 const{type,a,b,c}=R;
 if(type==='lin'){if(b===0)ME();return[(y-a)/b]}
 if(type==='log'){if(b===0)ME();return[Math.exp((y-a)/b)]}
 if(type==='exp'){if(b===0||y/a<=0)ME();return[Math.log(y/a)/b]}
 if(type==='pow'){if(b===0||y/a<=0)ME();return[Math.pow(y/a,1/b)]}
 if(type==='quad'){if(c===0){if(b===0)ME();return[(y-a)/b]}const D=b*b-4*c*(a-y);if(D<0)return[];const s=Math.sqrt(D);return D===0?[-b/(2*c)]:[(-b-s)/(2*c),(-b+s)/(2*c)]}
 return[]}

/* ---------- equations ---------- */
function solveQuad(a,b,c){
 if(a===0)err('Math error');const D=b*b-4*a*c;
 if(D>=0){const s=Math.sqrt(D);return{D,roots:D===0?[[-b/(2*a),0]]:[[(-b+s)/(2*a),0],[(-b-s)/(2*a),0]]}}
 const s=Math.sqrt(-D),re=-b/(2*a),im=s/(2*a);return{D,roots:[[re,im],[re,-im]]}}
function solveCubic(a,b,c,d){
 if(a===0)err('Math error');const p=b/a,q=c/a,r=d/a,A=q-p*p/3,B=2*p*p*p/27-p*q/3+r,Dl=B*B/4+A*A*A/27,sh=-p/3;let t,kind;
 if(Math.abs(Dl)<1e-14*Math.max(1,Math.abs(B*B/4),Math.abs(A*A*A/27))){
  if(Math.abs(A)<1e-12&&Math.abs(B)<1e-12){t=[[0,0],[0,0],[0,0]];kind='triple'}else{t=[[3*B/A,0],[-3*B/(2*A),0],[-3*B/(2*A),0]];kind='double'}}
 else if(Dl>0){const sq=Math.sqrt(Dl),u=Math.cbrt(-B/2+sq),v=Math.cbrt(-B/2-sq);t=[[u+v,0],[-(u+v)/2,Math.sqrt(3)/2*(u-v)],[-(u+v)/2,-Math.sqrt(3)/2*(u-v)]];kind='one real'}
 else{const m=2*Math.sqrt(-A/3),th=Math.acos(clamp(3*B/(A*m)))/3;t=[0,1,2].map(k=>[m*Math.cos(th-2*Math.PI*k/3),0]);kind='three real'}
 let roots=t.map(z=>[z[0]+sh,z[1]]);
 roots=roots.map(z=>{let w=z;for(let k=0;k<6;k++){const f=cadd(cadd(cmul(cmul(cmul(w,w),w),[a,0]),cmul(cmul(w,w),[b,0])),cadd(cmul(w,[c,0]),[d,0])),
   fp=cadd(cadd(cmul(cmul(w,w),[3*a,0]),cmul(w,[2*b,0])),[c,0]);if(cabs(fp)<1e-9)break;const nw=csub(w,cdiv(f,fp));if(!isFinite(nw[0])||!isFinite(nw[1]))break;w=nw}return w});
 roots=roots.map(z=>{const s=Math.max(1,Math.abs(z[0]));return[Math.abs(z[0])<1e-12?0:z[0],Math.abs(z[1])<1e-9*s?0:z[1]]});
 roots.sort((x,y)=>(x[1]===0?0:1)-(y[1]===0?0:1)||x[0]-y[0]);
 return{p,q,r,A,B,Dl,kind,roots}}

/* ---------- per-vault state: v.calc (inside the vault, so "Copy all data" covers it) ---------- */
const isoT=()=>iso(new Date());
const DEF=()=>({ang:'deg',sd:'S',ans:0,expr:'',vars:{},h:[],
 cm:{expr:'',ans:[0,0],ra:'1',rb:'1',rr:'2',rt:'45',rz:'-8',rn:'3'},
 st:{type:'1var',rows:[{x:'',y:'',f:''},{x:'',y:'',f:''},{x:'',y:'',f:''},{x:'',y:'',f:''},{x:'',y:'',f:''},{x:'',y:'',f:''}],bulk:'',px:'',py:''},
 bn:{base:'DEC',w:'32',expr:''},
 eq:{k:'quad',l2:{a1:'1',b1:'1',c1:'3',a2:'1',b2:'-1',c2:'1'},l3:{a1:'1',b1:'1',c1:'1',d1:'6',a2:'0',b2:'2',c2:'5',d2:'-4',a3:'2',b3:'5',c3:'-1',d3:'27'},q:{a:'1',b:'-5',c:'6'},cu:{a:'1',b:'-6',c:'11',d:'-6'}},
 mx:{A:{r:2,c:2,d:[['1','2','0'],['3','4','0'],['0','0','0']]},B:{r:2,c:2,d:[['5','6','0'],['7','8','0'],['0','0','0']]},C:{r:3,c:3,d:[['1','0','0'],['0','1','0'],['0','0','1']]},op:'add',x:'A',y:'B',k:'2',ans:null},
 tb:{f:'x^2',g:'',s:'1',e:'10',st:'1'},
 ve:{A:{n:3,d:['1','2','3']},B:{n:3,d:['4','5','6']},C:{n:3,d:['1','0','0']},op:'dot',x:'A',y:'B',k:'2',ans:null},
 geo:{shape:'Circle',v:{}},
 dt:{a:isoT(),b:isoT(),s:isoT(),n:'30',u:'days',sg:'+',w:isoT()},
 fin:{si:{p:'10000',r:'8',t:'2'},ci:{p:'10000',r:'8',t:'3',n:'12'},emi:{p:'500000',r:'9',t:'5',u:'years'},pc:{o:'80',n:'100',x:'20',y:'450',pi:'200',pr:'15'}},
 gp:null,gm:'line'});
function mergeDef(t,d){for(const k in d){if(t[k]===undefined||t[k]===null&&d[k]!==null&&typeof d[k]==='object')t[k]=JSON.parse(JSON.stringify(d[k]));else if(d[k]&&typeof d[k]==='object'&&!Array.isArray(d[k])&&typeof t[k]==='object')mergeDef(t[k],d[k])}}
function C(){const v=V();if(!v)return null;if(!v.calc||typeof v.calc!=='object'||Array.isArray(v.calc))v.calc={};mergeDef(v.calc,DEF());return v.calc}
function setPath(o,path,val){const p=path.split('.'),isN=s=>/^\d+$/.test(s);
 for(let i=0;i<p.length-1;i++){const k=isN(p[i])?+p[i]:p[i];if(o[k]==null||typeof o[k]!=='object')o[k]=isN(p[i+1])?[]:{};o=o[k]}
 const k=p[p.length-1];o[isN(k)?+k:k]=val}
let sT;const sv=()=>{clearTimeout(sT);sT=setTimeout(save,250)};
const RES={},rk=m=>vid+':'+m,ST={fresh:0};
const envR=c=>({ang:c.ang,ans:c.ans,vars:c.vars});
function hpush(m,i,o,rc){const c=C(),h=c.h;if(h[0]&&h[0].m===m&&h[0].i===i&&h[0].o===o)return;h.unshift({m,i:String(i),o:String(o),t:Date.now(),rc:rc||null});if(h.length>50)h.length=50;save()}
const CX={A:{},live:()=>{},eng:null};window.CX=CX;
const fail=(m,e)=>{if(e&&!e.isC)throw e;toast(e?e.message:m)};

/* ---------- small UI builders ---------- */
const bt=(t,d,a,cls,sty)=>`<button class="${cls||''}" data-do="${d}"${a!=null?` data-a="${E(a)}"`:''}${sty?` style="${sty}"`:''}>${t}</button>`;
const SM='padding:3px 9px;font-size:.8rem';
const angBar=()=>{const c=C();return`<span class="row" style="gap:4px">${['deg','rad','gra'].map(a=>bt(ANGN[a],'ang',a,c.ang===a?'':'g',SM)).join('')}</span>`};
const sdBtn=()=>bt('S⇔D · '+C().sd,'sd',null,'g',SM).replace('<button','<button title="Switch between exact (S) and decimal (D) display"');
const inp=(path,val,o)=>{o=o||{};return`<input data-cp="${path}" value="${E(val)}"${o.id?` id="${o.id}"`:''}${o.live?` data-live="${o.live}"`:''}${o.ph?` placeholder="${E(o.ph)}"`:''} autocomplete="off" spellcheck="false" style="${o.sty||''}">`};
const sel=(path,opts,cur,o)=>{o=o||{};return`<select data-cp="${path}"${o.live?` data-live="${o.live}"`:''}${o.id?` id="${o.id}"`:''} style="${o.sty||''}">${opts.map(x=>{const v=Array.isArray(x)?x[0]:x,l=Array.isArray(x)?x[1]:x;return`<option value="${E(v)}"${String(v)===String(cur)?' selected':''}>${E(l)}</option>`}).join('')}</select>`};
const resBox=(main,alt,cls)=>`<div class="cres"><b class="${cls||''}">${main}</b>${alt?`<small>${alt}</small>`:''}</div>`;
const errBox=m=>`<div class="cres"><b class="cerr">${E(m)}</b></div>`;
const paint=(id,html)=>{const e=$(id);if(e)e.innerHTML=html};
const histHTML=()=>{const h=C().h;if(!h.length)return'<small style="color:var(--mu)">Nothing yet. Results from every mode are logged here (last 50 per vault).</small>';
 return h.map((e,i)=>`<div class="hl"><span class="chip" style="margin:0">${E(e.m)}</span><span style="flex:1;word-break:break-all">${E(e.i)}</span><b>= ${E(e.o)}</b>${e.rc?bt('↩','hRecall',i,'g','padding:0 8px'):''}</div>`).join('')};
const histCard=()=>`<br><div class="card"><div class="row" style="justify-content:space-between"><h3 style="margin:0">History · this vault</h3>${bt('Clear history','hClear',null,'g',SM)}</div><div id="hist" style="margin-top:6px;max-height:260px;overflow:auto">${histHTML()}</div></div>`;
const refreshHist=()=>paint('hist',histHTML());
const note=t=>`<small style="color:var(--mu);display:block;margin-top:8px">${t}</small>`;
const modeHead=(k,extra)=>{const m=AM.find(x=>x[0]===k);return`<div class="row" style="justify-content:space-between;margin-bottom:8px"><h3 style="margin:0">${m[1]} · ${m[2]}</h3><span class="row" style="gap:6px">${extra||''}</span></div>`};

/* ---------- key insertion (keypad + keyboard) ---------- */
function insertAt(el,s){const a=document.activeElement===el&&el.selectionStart!=null?el.selectionStart:el.value.length,b=document.activeElement===el&&el.selectionEnd!=null?el.selectionEnd:a;
 el.value=el.value.slice(0,a)+s+el.value.slice(b);const p=a+s.length;if(matchMedia('(pointer:fine)').matches)el.focus();try{el.setSelectionRange(p,p)}catch(e){}el.dispatchEvent(new Event('input',{bubbles:true}))}
function backspace(el){const a=document.activeElement===el&&el.selectionStart!=null?el.selectionStart:el.value.length,b=document.activeElement===el?el.selectionEnd:a;
 let from=a;if(a===b){const m=/(?:asinh|acosh|atanh|sinh|cosh|tanh|asin|acos|atan|sin|cos|tan|sqrt|cbrt|root|logb|log|ln|exp|abs|Abs|Arg|Conj|Re|Im|deriv|integ)\($|\s?n(?:Pr|Cr)\s?$|Ans$|×10\^$/.exec(el.value.slice(0,a));from=a-(m?m[0].length:1)}
 if(from<0)from=0;el.value=el.value.slice(0,from)+el.value.slice(b);try{el.setSelectionRange(from,from)}catch(e){}if(matchMedia('(pointer:fine)').matches)el.focus();el.dispatchEvent(new Event('input',{bubbles:true}))}
const BINOP=/^[+\-*\/^]$/,POSTOP=['^2','^3','^(-1)','!','%','°',' nPr ',' nCr '];
function compKey(k){const el=$('cd');if(!el)return;
 if(k==='C'){el.value='';ST.fresh=0;el.dispatchEvent(new Event('input',{bubbles:true}));return}
 if(k==='⌫'){ST.fresh=0;backspace(el);return}
 if(k==='=')return CX.A.eq();
 let s=k.startsWith('i:')?k.slice(2):k;
 if(ST.fresh){el.value=(BINOP.test(s)||POSTOP.includes(s))?'Ans':'';ST.fresh=0;try{el.setSelectionRange(el.value.length,el.value.length)}catch(e){}}
 insertAt(el,s)}
function genKey(k,tid){const el=$(tid);if(!el)return;
 if(k==='C'){el.value='';el.dispatchEvent(new Event('input',{bubbles:true}));return}
 if(k==='⌫')return backspace(el);
 if(k==='='){return({cmx:()=>CX.A.cmRun(),bnx:()=>CX.A.bnRun()})[tid]&&({cmx:()=>CX.A.cmRun(),bnx:()=>CX.A.bnRun()})[tid]()}
 insertAt(el,k.startsWith('i:')?k.slice(2):k)}
CX.key=(k,tid)=>tid&&tid!=='cd'?genKey(k,tid):compKey(k);

/* ================= COMP ================= */
const MAINKEYS=['7','8','9','/','4','5','6','*','1','2','3','-','0','.','(',')','+','^','π','sqrt(','sin(','cos(','tan(','log(','C','⌫','='];
const FKEYS=[['sin⁻¹','asin('],['cos⁻¹','acos('],['tan⁻¹','atan('],['sinh','sinh('],['cosh','cosh('],['tanh','tanh('],['sinh⁻¹','asinh('],['cosh⁻¹','acosh('],['tanh⁻¹','atanh('],['ln','ln('],['logₐ','logb('],['eˣ','exp('],['10ˣ','10^('],['x²','^2'],['x³','^3'],['x⁻¹','^(-1)'],['xʸ','^'],['∛','cbrt('],['ˣ√','root('],['x!','!'],['nPr',' nPr '],['nCr',' nCr '],['%','%'],['|x|','abs('],['Ans','Ans'],['e','e'],['×10ˣ','×10^'],[',',','],['°','°'],['d/dx','deriv('],['∫','integ('],['x','x'],['A','A'],['B','B'],['C','C'],['D','D'],['E','E'],['F','F'],['M','M'],['STO →','→']];
const kb=(k,lab,t,cls)=>`<button class="${cls||'g'}" data-ck="${E(k)}"${t?` data-t="${t}"`:''}>${E(lab)}</button>`;
function resComp(){const c=C(),R=RES[rk('comp')];if(!R)return'<div class="cres"><small>Result appears here</small></div>';if(R.err)return errBox(R.err);
 const f=fmtRes(R.r.v,c.sd,R.r.apx);return resBox(E(f.main),(f.alt?E(f.alt):'')+(R.r.sto?` · stored in ${R.r.sto}`:''))}
function varsHTML(){const c=C(),ks=Object.keys(c.vars).filter(k=>c.vars[k]!==0);
 return`<div style="margin-top:10px;font-size:.85rem;color:var(--mu)">Ans = <b style="color:var(--tx)">${E(fv(c.ans,c.sd))}</b>${ks.length?' · '+ks.map(k=>`${k} = <b style="color:var(--tx)">${E(fv(c.vars[k],c.sd))}</b>`).join(' · '):' · no stored variables'} ${ks.length?bt('clear','varClr',null,'g','padding:0 8px;font-size:.75rem'):''}</div>`}
function compUI(){const c=C();
 return`<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:start">
<div class="card">${modeHead('comp',angBar()+sdBtn())}
<input id="cd" data-cp="expr" value="${E(c.expr)}" autocomplete="off" spellcheck="false" placeholder="Type, or tap the keys…" style="font-size:1.15rem">
<div id="res-comp">${resComp()}</div>
<div class="kp" style="margin-top:6px">${MAINKEYS.map(k=>kb(k,k,'','C⌫='.includes(k)?'r':'g')).join('')}</div>
${note('Keyboard works too: Enter = equals, Esc = clear. Angles: '+ANGN[c.ang]+'. Pressing an operator right after = continues from Ans.')}</div>
<div class="card"><h3>More functions</h3><div class="kp5">${FKEYS.map(f=>kb('i:'+f[1],f[0])).join('')}</div><div id="cvars">${varsHTML()}</div>
${note('Calculus: <b>deriv(x^2, 3)</b> = derivative at x=3 · <b>integ(sin(x), 0, π)</b> = definite integral. Store: <b>5→A</b> then use A in later expressions. Roots: <b>root(3, 27)</b>. Log base: <b>logb(2, 8)</b>. Fractions: toggle <b>S⇔D</b> for exact (1/3, π/4, √2) or decimal answers.')}</div></div>${histCard()}`}
CX.A.eq=()=>{const c=C(),el=$('cd'),src=(el?el.value:c.expr).trim();c.expr=src;if(!src)return;
 try{const r=calcExpr(src,envR(c));c.ans=r.v;if(r.sto)c.vars[r.sto]=r.v;RES[rk('comp')]={src,r};ST.fresh=1;hpush('COMP',src,fv(r.v,c.sd)+(r.sto?' → '+r.sto:''),{m:'comp',e:src})}
 catch(e){if(!e.isC)throw e;RES[rk('comp')]={src,err:e.message};toast(e.message)}
 save();paint('res-comp',resComp());paint('cvars',varsHTML());refreshHist()};
CX.A.varClr=()=>{C().vars={};save();paint('cvars',varsHTML())};
CX.A.ang=a=>{C().ang=a;save();go()};
CX.A.sd=()=>{const c=C();c.sd=c.sd==='S'?'D':'S';save();go()};
CX.A.hClear=()=>{C().h=[];save();refreshHist()};
CX.A.hRecall=i=>{const e=C().h[+i];if(!e||!e.rc)return;const c=C(),r=e.rc;
 if(r.m==='comp'){c.expr=r.e;anm='comp'}else if(r.m==='cmplx'){c.cm.expr=r.e;anm='cmplx'}else if(r.m==='basen'){c.bn.expr=r.e;c.bn.base=r.b;c.bn.w=r.w;anm='basen'}
 save();go()};

/* ================= CMPLX ================= */
const CKEYS=['7','8','9','+','-','4','5','6','*','/','1','2','3','(',')','0','.','i','∠','^','Abs(','Arg(','Conj(','Re(','Im(','sqrt(','exp(','ln(','root(','π'];
function cmEnv(c){return{ang:c.ang,vars:c.vars,ansC:c.cm.ans,ans:c.cm.ans[0]}}
function resCm(){const c=C(),R=RES[rk('cmplx')];if(!R)return'<div class="cres"><small>Result appears here</small></div>';if(R.err)return errBox(R.err);
 const z=R.z,sd=c.sd,m=cabs(z);
 return`<div class="cres" style="text-align:left"><table class="rtab"><tr><td style="text-align:left">Rectangular</td><td><b>${E(cRect(z,sd))}</b></td></tr><tr><td style="text-align:left">Polar r∠θ</td><td><b>${E(cPolar(z,c.ang,sd))}</b></td></tr><tr><td style="text-align:left">Modulus |z|</td><td>${E(cPart(m,sd))}</td></tr><tr><td style="text-align:left">Argument (${ANGN[c.ang]})</td><td>${m===0?'undefined':E(cPart(carg(z)/AU[c.ang],sd))}</td></tr><tr><td style="text-align:left">Conjugate</td><td>${E(cRect([z[0],-z[1]],sd))}</td></tr></table></div>`}
function cmConvHTML(){const R=RES[rk('cmconv')];return R?(R.err?errBox(R.err):`<div class="cres" style="text-align:left">${R.html}</div>`):''}
function cmplxUI(){const c=C(),m=c.cm;
 return`<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:start">
<div class="card">${modeHead('cmplx',angBar()+sdBtn())}
<input id="cmx" data-cp="cm.expr" value="${E(m.expr)}" autocomplete="off" spellcheck="false" placeholder="e.g. (2+3i)*(1-i)   or   2∠45" style="font-size:1.1rem">
<div id="res-cmplx">${resCm()}</div>
<div class="row" style="margin:6px 0">${bt('= Evaluate','cmRun',null,'','')}${bt('Ans','cmAns',null,'g')}</div>
<div class="kp5">${CKEYS.map(k=>kb(k,k,'cmx')).join('')}${kb('C','C','cmx','r')}${kb('⌫','⌫','cmx','r')}${kb('=','=','cmx','r')}</div>
${note('Type <b>i</b> for the imaginary unit and <b>∠</b> (or @) for polar input, e.g. 2∠90 = 2i. Angles use '+ANGN[c.ang]+'. Powers and roots: (1+i)^8, root(3, 8) gives the principal root.')}</div>
<div class="card"><h3>Converters and roots</h3>
<div class="row"><b style="min-width:92px">Rect → polar</b>${inp('cm.ra',m.ra,{sty:'max-width:80px',ph:'a'})}<span>+</span>${inp('cm.rb',m.rb,{sty:'max-width:80px',ph:'b'})}<span>i</span>${bt('Go','cvRP',null,'g')}</div><br>
<div class="row"><b style="min-width:92px">Polar → rect</b>${inp('cm.rr',m.rr,{sty:'max-width:80px',ph:'r'})}<span>∠</span>${inp('cm.rt',m.rt,{sty:'max-width:80px',ph:'θ'})}${bt('Go','cvPR',null,'g')}</div><br>
<div class="row"><b style="min-width:92px">n-th roots</b>${inp('cm.rz',m.rz,{sty:'max-width:120px',ph:'z (expression)'})}<span>n =</span>${inp('cm.rn',m.rn,{sty:'max-width:60px'})}${bt('List roots','cvRoots',null,'g')}</div>
<div id="cmconv" style="margin-top:8px">${cmConvHTML()}</div></div></div>${histCard()}`}
CX.A.cmRun=()=>{const c=C(),el=$('cmx'),src=(el?el.value:c.cm.expr).trim();c.cm.expr=src;if(!src)return;
 try{const z=calcC(src,cmEnv(c));c.cm.ans=z;RES[rk('cmplx')]={z};hpush('CMPLX',src,cRect(z,c.sd),{m:'cmplx',e:src})}
 catch(e){if(!e.isC)throw e;RES[rk('cmplx')]={err:e.message};toast(e.message)}
 save();paint('res-cmplx',resCm());refreshHist()};
CX.A.cmAns=()=>{const el=$('cmx');if(el)insertAt(el,'Ans')};
const cvVal=(s,c)=>{const v=numIn(s,{ang:c.ang,ans:c.ans,vars:c.vars});if(v===null)SY();return v};
CX.A.cvRP=()=>{const c=C();try{const a=cvVal(c.cm.ra,c),b=cvVal(c.cm.rb,c),z=[a,b];if(a===0&&b===0)ME();
  RES[rk('cmconv')]={html:`<b>${E(cPolar(z,c.ang,c.sd))}</b> <small style="color:var(--mu)">(r = ${E(cPart(cabs(z),c.sd))}, θ = ${E(cPart(carg(z)/AU[c.ang],c.sd))} ${ANGN[c.ang]})</small>`};
  hpush('CMPLX','Rect→Polar '+cRect(z,'D'),cPolar(z,c.ang,'D'))}catch(e){RES[rk('cmconv')]={err:e.message||'Error'};fail('',e)}paint('cmconv',cmConvHTML());refreshHist()};
CX.A.cvPR=()=>{const c=C();try{const r=cvVal(c.cm.rr,c),th=cvVal(c.cm.rt,c),z=cclean([r*trig('cos',th,c.ang),r*trig('sin',th,c.ang)]);
  RES[rk('cmconv')]={html:`<b>${E(cRect(z,c.sd))}</b>`};hpush('CMPLX','Polar→Rect '+fmtN(r)+'∠'+fmtN(th),cRect(z,'D'))}catch(e){RES[rk('cmconv')]={err:e.message||'Error'};fail('',e)}paint('cmconv',cmConvHTML());refreshHist()};
CX.A.cvRoots=()=>{const c=C();try{const z=calcC(c.cm.rz,cmEnv(c)),n=cvVal(c.cm.rn,c);if(!Number.isInteger(n)||n<1||n>20)err('n must be an integer 1–20');
  const r=cabs(z),th=carg(z),rows=[];for(let k=0;k<n;k++){const rr=Math.pow(r,1/n),a=(th+2*Math.PI*k)/n,w=r===0?[0,0]:cclean([rr*Math.cos(a),rr*Math.sin(a)]);rows.push(`<tr><td style="text-align:left">k = ${k}</td><td>${E(cRect(w,c.sd))}</td><td>${E(cPolar(w,c.ang,c.sd))}</td></tr>`)}
  RES[rk('cmconv')]={html:`<small style="color:var(--mu)">${n} roots of ${E(cRect(z,c.sd))}</small><table class="rtab">${rows.join('')}</table>`};hpush('CMPLX','roots('+c.cm.rz+', '+n+')',n+' roots')}catch(e){RES[rk('cmconv')]={err:e.message||'Error'};fail('',e)}paint('cmconv',cmConvHTML());refreshHist()};

/* ================= STAT ================= */
const STT=[['1var','1-VAR · single-variable statistics'],['lin','Linear · y = a + bx'],['quad','Quadratic · y = a + bx + cx²'],['exp','Exponential · y = a·e^(bx)'],['log','Logarithmic · y = a + b·ln x'],['pow','Power · y = a·x^b']];
const SENV={ang:'rad',ans:0,vars:{}};
function rowNum(s,i){try{return numIn(s,SENV)}catch(e){if(e.isC)e.message+=' (row '+(i+1)+')';throw e}}
function statData(c){const s=c.st;
 if(s.type==='1var'){const v=[],f=[];s.rows.forEach((r,i)=>{const x=rowNum(r.x,i);if(x===null)return;let fr=r.f===''||r.f==null?1:rowNum(r.f,i);if(!Number.isInteger(fr)||fr<1)err('Frequency must be a whole number ≥ 1 (row '+(i+1)+')');v.push(x);f.push(fr)});return{v,f}}
 const X=[],Y=[];s.rows.forEach((r,i)=>{const x=rowNum(r.x,i),y=rowNum(r.y,i);if(x===null&&y===null)return;if(x===null||y===null)err('Row '+(i+1)+' needs both X and Y');X.push(x);Y.push(y)});return{X,Y}}
function statCompute(c){const d=statData(c);if(c.st.type==='1var'){if(!d.v.length)err('Enter some data first');return{kind:'1',r:stat1(d.v,d.f)}}
 if(d.X.length<2)err('Enter at least 2 (x, y) pairs');return{kind:'reg',R:regress(c.st.type,d.X,d.Y)}}
const tr2=(l,v)=>`<tr><td style="text-align:left">${l}</td><td>${v}</td></tr>`;
function resStat(){const c=C(),sd=c.sd;let S;try{S=statCompute(c)}catch(e){if(!e.isC)throw e;return`<small style="color:var(--mu)">${E(e.message)}</small>`}
 if(S.kind==='1'){const r=S.r,f=x=>x==null?'—':E(fv(x,sd));
  return`<table class="rtab">${tr2('n',r.n)}${tr2('Σx',f(r.sx))}${tr2('Σx²',f(r.sx2))}${tr2('Mean x̄',f(r.mean))}${tr2('Population σx',f(r.sdP))}${tr2('Sample sx',f(r.sdS))}${tr2('Population variance σ²',f(r.varP))}${tr2('Sample variance s²',f(r.varS))}${tr2('Minimum',f(r.min))}${tr2('Q1',f(r.q1))}${tr2('Median',f(r.med))}${tr2('Q3',f(r.q3))}${tr2('Maximum',f(r.max))}${tr2('Range',f(r.range))}${tr2('IQR',f(r.iqr))}${tr2('Mode',r.modes.length?r.modes.map(m=>E(fv(m,sd))).join(', ')+(r.modes.length>1?' (multimodal)':''):'none (all values unique)')}</table>${note('Quartiles use the calculator method: the median of the lower and upper halves (the middle value is left out when n is odd).')}`}
 const R=S.R,f=x=>x==null?'undefined':E(fv(x,sd));
 return`<div style="margin-bottom:6px"><b>${E(R.eq)}</b></div><table class="rtab">${tr2('n',R.n)}${tr2('a',f(R.a))}${tr2('b',f(R.b))}${R.type==='quad'?tr2('c',f(R.c)):''}${tr2(R.rl,f(R.r))}${R.r!=null&&R.type!=='quad'?tr2('r²',E(fmtN(R.r*R.r))):''}</table>${R.type==='exp'||R.type==='pow'||R.type==='log'?note('r is measured on the linearised data (as on the calculator).'):''}`}
function statPred(){const c=C(),s=c.st;if(s.type==='1var')return'';let R;try{const d=statData(c);R=regress(s.type,d.X,d.Y)}catch(e){return'<small style="color:var(--mu)">Fit the data first.</small>'}
 let h='';const sd=c.sd;
 try{const px=numIn(s.px,SENV);if(px!==null){try{h+=`<div>x = ${E(fv(px,sd))} → <b>ŷ = ${E(fv(chk(R.y(px)),sd))}</b></div>`}catch(e){h+=`<div class="cerr">ŷ: ${E(e.message||'Math error')}</div>`}}}catch(e){h+='<div class="cerr">x: syntax error</div>'}
 try{const py=numIn(s.py,SENV);if(py!==null){try{const xs=regInv(R,py);h+=xs.length?`<div>y = ${E(fv(py,sd))} → <b>x̂ = ${xs.map(x=>E(fv(chk(x),sd))).join(' or ')}</b></div>`:'<div>No real x gives that y.</div>'}catch(e){h+=`<div class="cerr">x̂: ${E(e.message||'Math error')}</div>`}}}catch(e){h+='<div class="cerr">y: syntax error</div>'}
 return h||'<small style="color:var(--mu)">Enter an x to predict y, or a y to estimate x.</small>'}
function statUI(){const c=C(),s=c.st,one=s.type==='1var';
 const rows=s.rows.map((r,i)=>`<tr><td style="text-align:left;color:var(--mu)">${i+1}</td><td>${inp('st.rows.'+i+'.x',r.x,{live:'stat',sty:'padding:4px 6px;min-width:70px'})}</td><td>${one?inp('st.rows.'+i+'.f',r.f,{live:'stat',ph:'1',sty:'padding:4px 6px;max-width:70px'}):inp('st.rows.'+i+'.y',r.y,{live:'stat',sty:'padding:4px 6px;min-width:70px'})}</td><td>${bt('✕','stDel',i,'x')}</td></tr>`).join('');
 return`<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:start">
<div class="card">${modeHead('stat',sdBtn())}${sel('st.type',STT,s.type,{live:'statType',sty:'margin-bottom:8px'})}
<div style="max-height:340px;overflow:auto"><table class="rtab"><tr><th style="text-align:left">#</th><th>X</th><th>${one?'Freq (optional)':'Y'}</th><th></th></tr>${rows}</table></div>
<div class="row" style="margin-top:8px">${bt('+ Row','stAdd')}${bt('Clear data','stClr',null,'g')}${bt('Calculate &amp; log','stCalc',null,'g')}</div>
<details style="margin-top:8px"><summary style="cursor:pointer;color:#6a8cff">Paste a data list</summary><textarea data-cp="st.bulk" rows="4" placeholder="${one?'5, 7, 7, 9, 12  (or one value per line; optional second number = frequency)':'one pair per line: 1,2 ↵ 2,4 ↵ 3,5'}" style="margin-top:6px">${E(s.bulk)}</textarea><div class="row" style="margin-top:6px">${bt('Load into the list','stLoad',null,'g')}</div></details></div>
<div class="card"><h3>Results</h3><div id="res-stat">${resStat()}</div></div>
${one?'':`<div class="card"><h3>Prediction</h3><div class="row"><span>x =</span>${inp('st.px',s.px,{live:'stat',sty:'max-width:110px'})}<span style="margin-left:10px">y =</span>${inp('st.py',s.py,{live:'stat',sty:'max-width:110px'})}</div><div id="st-pred" style="margin-top:8px">${statPred()}</div></div>`}</div>${histCard()}`}
CX.A.stAdd=()=>{C().st.rows.push({x:'',y:'',f:''});save();go()};
CX.A.stDel=i=>{const r=C().st.rows;r.splice(+i,1);if(!r.length)r.push({x:'',y:'',f:''});save();go()};
CX.A.stClr=()=>{const s=C().st;s.rows=[0,1,2,3,4,5].map(()=>({x:'',y:'',f:''}));s.px='';s.py='';save();go()};
CX.A.stLoad=()=>{const c=C(),s=c.st,txt=String(s.bulk||'').trim();if(!txt)return toast('Paste some numbers first');
 const lines=txt.split(/\n+/).map(l=>l.trim()).filter(Boolean),one=s.type==='1var',rows=[],ok=x=>x!==''&&isFinite(Number(x));
 const tok=l=>l.split(/[,\s;\t]+/).filter(Boolean);
 if(lines.length===1){const t=tok(lines[0]);if(!t.every(ok))return toast('Syntax error');
  if(one)t.forEach(x=>rows.push({x,y:'',f:''}));else{if(t.length%2)return toast('Need an even number of values for (x, y) pairs');for(let i=0;i<t.length;i+=2)rows.push({x:t[i],y:t[i+1],f:''})}}
 else lines.forEach(l=>{const t=tok(l);if(!t.every(ok)||(!one&&t.length<2))return;rows.push(one?{x:t[0],y:'',f:t[1]||''}:{x:t[0],y:t[1],f:''})});
 if(!rows.length)return toast('Syntax error');if(rows.length>500)rows.length=500;s.rows=rows;save();go()};
CX.A.stCalc=()=>{const c=C();try{const S=statCompute(c);let sum;
  if(S.kind==='1'){const r=S.r;sum='n='+r.n+', x̄='+fmtN(r.mean)+', σ='+fmtN(r.sdP)+(r.sdS!=null?', s='+fmtN(r.sdS):'')+', median='+fmtN(r.med)}
  else{const R=S.R;sum=R.eq.replace('y = ','')+' · a='+fmtN(R.a)+', b='+fmtN(R.b)+(R.type==='quad'?', c='+fmtN(R.c):'')+(R.r!=null?', '+R.rl+'='+fmtN(R.r):'')}
  hpush('STAT',STT.find(x=>x[0]===c.st.type)[1].split(' · ')[0]+' · '+(S.kind==='1'?S.r.n:S.R.n)+' pts',sum);toast('Logged to history')}catch(e){fail('',e)}paint('res-stat',resStat())};

/* ================= BASE-N ================= */
const BNK=[...'0123456789ABCDEF'];
function resBn(){const c=C(),R=RES[rk('basen')];if(!R)return'<div class="cres"><small>Enter a number or an expression, then press =</small></div>';if(R.err)return errBox(R.err);
 return`<div class="cres" style="text-align:left"><table class="rtab">${['BIN','OCT','DEC','HEX'].map(b=>`<tr><td style="text-align:left"><b>${b}</b></td><td style="font-family:monospace;word-break:break-all"><b>${E(bnFmt(R.x,b,R.W))}</b></td><td>${bt('use','bnUse',b,'g','padding:0 8px;font-size:.75rem')}</td></tr>`).join('')}</table><small style="color:var(--mu)">${R.W}-bit two's complement · negative numbers shown as bit patterns in BIN/OCT/HEX</small></div>`}
function bnUI(){const c=C(),b=c.bn,radix=BN_B[b.base],dis=k=>BNK.indexOf(k)>=radix;
 const ops=[['+','+'],['−','-'],['×','*'],['÷','/'],['(','('],[')',')'],['AND',' AND '],['OR',' OR '],['XOR',' XOR '],['XNOR',' XNOR '],['NOT','NOT '],['NEG','NEG ']];
 return`<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:start">
<div class="card">${modeHead('basen',sel('bn.w',[['8','8-bit'],['16','16-bit'],['32','32-bit']],b.w,{live:'bnW',sty:'width:auto;padding:3px 8px'}))}
<div class="row" style="gap:4px;margin-bottom:8px">${['BIN','OCT','DEC','HEX'].map(x=>bt(x,'bnBase',x,b.base===x?'':'g')).join('')}</div>
<input id="bnx" data-cp="bn.expr" value="${E(b.expr)}" autocomplete="off" spellcheck="false" placeholder="Number in ${b.base}, e.g. ${({BIN:'1010 + 11',OCT:'17 + 5',DEC:'255',HEX:'FF AND 0F'})[b.base]}" style="font-family:monospace;font-size:1.1rem">
<div id="res-basen">${resBn()}</div>
<div class="kp" style="max-width:340px;margin-top:6px">${BNK.map(k=>dis(k)?`<button class="g" disabled>${k}</button>`:kb(k,k,'bnx')).join('')}${ops.map(o=>kb('i:'+o[1],o[0],'bnx')).join('')}${kb('C','C','bnx','r')}${kb('⌫','⌫','bnx','r')}${kb('=','=','bnx','r')}</div>
${note('Type with your keyboard too (Enter = equals). Keep spaces around AND, OR, XOR, XNOR. Operator priority: NOT/NEG, then × ÷, then + −, then AND, then OR/XOR/XNOR. Division is whole-number division.')}</div></div>${histCard()}`}
CX.A.bnBase=nb=>{const c=C(),b=c.bn;if(b.base===nb)return;const ex=(b.expr||'').trim();
 if(ex){try{const W=+b.w,x=bnEval(ex,b.base,W);if(/^[0-9A-Fa-f]+$/.test(ex))b.expr=bnFmt(x,nb,W).replace(/\s/g,'')}catch(e){}}
 b.base=nb;save();go()};
CX.A.bnRun=silent=>{const c=C(),b=c.bn,el=$('bnx'),src=(el?el.value:b.expr).trim();b.expr=src;if(!src)return;
 try{const W=+b.w,x=bnEval(src,b.base,W);RES[rk('basen')]={x,W};if(silent!==true)hpush('BASE-N',b.base+': '+src,bnFmt(x,b.base,W)+(b.base!=='DEC'?' (= '+x+')':''),{m:'basen',e:src,b:b.base,w:b.w})}
 catch(e){if(!e.isC)throw e;RES[rk('basen')]={err:e.message};if(silent!==true)toast(e.message)}
 save();paint('res-basen',resBn());refreshHist()};
CX.A.bnUse=nb=>{const c=C(),R=RES[rk('basen')];if(!R||R.err)return;c.bn.base=nb;c.bn.expr=bnFmt(R.x,nb,R.W).replace(/\s/g,'');save();go()};

/* ================= EQN ================= */
const EQK=[['l2','Simultaneous · 2 unknowns'],['l3','Simultaneous · 3 unknowns'],['q','Quadratic · ax² + bx + c = 0'],['cu','Cubic · ax³ + bx² + cx + d = 0']];
const EQE={ang:'rad',ans:0,vars:{}};
const pn=(v,k)=>fmtN(v),sg=v=>v<0?'('+fmtN(v)+')':fmtN(v);
function eqnSolve(c){const e=c.eq,k=e.k,g=(o,key)=>nz(o[key],EQE);
 if(k==='l2'){const o=e.l2,a1=g(o,'a1'),b1=g(o,'b1'),c1=g(o,'c1'),a2=g(o,'a2'),b2=g(o,'b2'),c2=g(o,'c2');
  const D=a1*b2-a2*b1,Dx=c1*b2-c2*b1,Dy=a1*c2-a2*c1,sc=Math.max(1,Math.abs(a1*b2),Math.abs(a2*b1));
  if(Math.abs(D)<=1e-12*sc)err('Math error: no unique solution (D = 0)');
  return{eq:`${fmtN(a1)}x + ${fmtN(b1)}y = ${fmtN(c1)}; ${fmtN(a2)}x + ${fmtN(b2)}y = ${fmtN(c2)}`,
   steps:[`D = a₁b₂ − a₂b₁ = ${sg(a1)}·${sg(b2)} − ${sg(a2)}·${sg(b1)} = ${pn(D)}`,`Dx = c₁b₂ − c₂b₁ = ${sg(c1)}·${sg(b2)} − ${sg(c2)}·${sg(b1)} = ${pn(Dx)}`,`Dy = a₁c₂ − a₂c₁ = ${sg(a1)}·${sg(c2)} − ${sg(a2)}·${sg(c1)} = ${pn(Dy)}`,`x = Dx / D = ${pn(Dx)} / ${pn(D)}`,`y = Dy / D = ${pn(Dy)} / ${pn(D)}`],
   sols:[['x',[Dx/D,0]],['y',[Dy/D,0]]]}}
 if(k==='l3'){const o=e.l3,M=[1,2,3].map(r=>['a','b','c'].map(l=>g(o,l+r))),R=[1,2,3].map(r=>g(o,'d'+r)),D=det(M);
  if(isSing(M,D))err('Math error: no unique solution (D = 0)');
  const rep=j=>M.map((r,i)=>r.map((v,jj)=>jj===j?R[i]:v)),Dx=det(rep(0)),Dy=det(rep(1)),Dz=det(rep(2));
  return{eq:M.map((r,i)=>`${fmtN(r[0])}x + ${fmtN(r[1])}y + ${fmtN(r[2])}z = ${fmtN(R[i])}`).join('; '),
   steps:[`D = |coefficient matrix| = ${pn(D)}  (expansion along the first row)`,`Dx (column 1 replaced by the constants) = ${pn(Dx)}`,`Dy (column 2 replaced) = ${pn(Dy)}`,`Dz (column 3 replaced) = ${pn(Dz)}`,`x = Dx/D = ${pn(Dx)}/${pn(D)},  y = Dy/D = ${pn(Dy)}/${pn(D)},  z = Dz/D = ${pn(Dz)}/${pn(D)}`],
   sols:[['x',[Dx/D,0]],['y',[Dy/D,0]],['z',[Dz/D,0]]]}}
 if(k==='q'){const o=e.q,a=g(o,'a'),b=g(o,'b'),cc=g(o,'c');if(a===0)err('Math error: a must not be 0');const S=solveQuad(a,b,cc),D=S.D,st=[];
  st.push(`Discriminant D = b² − 4ac = ${sg(b)}² − 4·${sg(a)}·${sg(cc)} = ${pn(D)}`);
  if(D>0)st.push('D > 0 → two distinct real roots',`x = (−b ± √D) / 2a = (${pn(-b)} ± √${pn(D)}) / ${pn(2*a)}`);
  else if(D===0)st.push('D = 0 → one repeated real root',`x = −b / 2a = ${pn(-b)} / ${pn(2*a)}`);
  else st.push('D < 0 → no real roots; the roots are a complex-conjugate pair',`x = −b/2a ± (√(−D)/2a)·i = ${pn(-b/(2*a))} ± (√${pn(-D)}/${pn(2*a)})·i`);
  if(D<0)toast('No real roots — complex roots shown');
  return{eq:`${fmtN(a)}x² + ${fmtN(b)}x + ${fmtN(cc)} = 0`,steps:st,sols:S.roots.map((z,i)=>['x'+(S.roots.length>1?'₁₂'[i]:''),z])}}
 const o=e.cu,a=g(o,'a'),b=g(o,'b'),cc=g(o,'c'),d=g(o,'d');if(a===0)err('Math error: a must not be 0');const S=solveCubic(a,b,cc,d);
 const nr=S.roots.filter(z=>z[1]===0).length;
 if(nr<3)toast('Complex roots found — shown as a ± bi');
 return{eq:`${fmtN(a)}x³ + ${fmtN(b)}x² + ${fmtN(cc)}x + ${fmtN(d)} = 0`,
  steps:[`Divide by a: x³ + ${pn(S.p)}x² + ${pn(S.q)}x + ${pn(S.r)} = 0`,`Substitute x = t − ${pn(S.p/3)} to remove the x² term: t³ + At + B = 0`,`A = q − p²/3 = ${pn(S.A)},  B = 2p³/27 − pq/3 + r = ${pn(S.B)}`,`Δ = (B/2)² + (A/3)³ = ${pn(S.Dl)}  →  ${S.kind==='three real'?'three distinct real roots (trigonometric method)':S.kind==='one real'?'one real root and a complex-conjugate pair (Cardano)':S.kind==='double'?'a repeated root':'a triple root'}`,`Roots are refined with Newton's method and converted back with x = t − ${pn(S.p/3)}`],
  sols:S.roots.map((z,i)=>['x'+'₁₂₃'[i],z])}}
function resEqn(){const c=C(),R=RES[rk('eqn')];if(!R)return'<div class="cres"><small>Press Solve to see the answer with the steps</small></div>';if(R.err)return errBox(R.err);
 return`<div class="cres" style="text-align:left"><div style="color:var(--mu);font-size:.85rem;word-break:break-word">${E(R.eq)}</div><table class="rtab" style="margin:6px 0">${R.sols.map(s=>`<tr><td style="text-align:left"><b>${s[0]}</b></td><td><b>${E(s[1][1]===0?fv(s[1][0],c.sd):cRect(cclean(s[1]),c.sd))}</b></td></tr>`).join('')}</table><b style="font-size:.85rem">Steps</b><ol class="stp">${R.steps.map(t=>`<li>${E(t)}</li>`).join('')}</ol></div>`}
function eqField(path,v,lab){return`<label style="display:flex;align-items:center;gap:4px">${inp(path,v,{sty:'width:64px;padding:5px 6px;text-align:center'})}<span>${lab}</span></label>`}
function eqnUI(){const c=C(),e=c.eq;let f='';
 if(e.k==='l2')f=[[1],[2]].map(([r])=>`<div class="row" style="margin:6px 0">${eqField(`eq.l2.a${r}`,e.l2['a'+r],'x +')}${eqField(`eq.l2.b${r}`,e.l2['b'+r],'y =')}${eqField(`eq.l2.c${r}`,e.l2['c'+r],'')}</div>`).join('');
 else if(e.k==='l3')f=[1,2,3].map(r=>`<div class="row" style="margin:6px 0">${eqField(`eq.l3.a${r}`,e.l3['a'+r],'x +')}${eqField(`eq.l3.b${r}`,e.l3['b'+r],'y +')}${eqField(`eq.l3.c${r}`,e.l3['c'+r],'z =')}${eqField(`eq.l3.d${r}`,e.l3['d'+r],'')}</div>`).join('');
 else if(e.k==='q')f=`<div class="row" style="margin:6px 0">${eqField('eq.q.a',e.q.a,'x² +')}${eqField('eq.q.b',e.q.b,'x +')}${eqField('eq.q.c',e.q.c,'= 0')}</div>`;
 else f=`<div class="row" style="margin:6px 0">${eqField('eq.cu.a',e.cu.a,'x³ +')}${eqField('eq.cu.b',e.cu.b,'x² +')}${eqField('eq.cu.c',e.cu.c,'x +')}${eqField('eq.cu.d',e.cu.d,'= 0')}</div>`;
 return`<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:start">
<div class="card">${modeHead('eqn',sdBtn())}${sel('eq.k',EQK,e.k,{live:'eqKind',sty:'margin-bottom:8px'})}${f}<div class="row" style="margin-top:8px">${bt('Solve','eqSolve')}</div>${note('Coefficients can be fractions or expressions, e.g. 1/2 or sqrt(2).')}</div>
<div class="card"><h3>Solution</h3><div id="res-eqn">${resEqn()}</div></div></div>${histCard()}`}
CX.A.eqSolve=()=>{const c=C();try{const R=eqnSolve(c);RES[rk('eqn')]=R;hpush('EQN',R.eq,R.sols.map(s=>s[0]+' = '+(s[1][1]===0?fv(s[1][0],c.sd):cRect(cclean(s[1]),c.sd))).join(', '))}
 catch(e){if(!e.isC)throw e;RES[rk('eqn')]={err:e.message};toast(e.message)}save();paint('res-eqn',resEqn());refreshHist()};

/* ================= MATRIX ================= */
const MXOPS=[['add','X + Y'],['sub','X − Y'],['mul','X × Y'],['sc','k × X'],['det','det X'],['inv','X⁻¹ (inverse)'],['tr','Xᵀ (transpose)']];
const MXN=[['A','A'],['B','B'],['C','C'],['Ans','MatAns']];
const MENV={ang:'rad',ans:0,vars:{}};
function getMat(c,nm){if(nm==='Ans'){const a=c.mx.ans;if(!a)err('No MatAns yet — run an operation first');return a.d.map(r=>r.slice())}
 const m=c.mx[nm],R=+m.r,K=+m.c,M=[];for(let i=0;i<R;i++){M.push([]);for(let j=0;j<K;j++){try{M[i].push(nz(m.d[i][j],MENV))}catch(e){if(e.isC)e.message+=` (${nm}[${i+1},${j+1}])`;throw e}}}return M}
const mname=nm=>nm==='Ans'?'MatAns':nm;
function mxCompute(c){const m=c.mx,op=m.op,X=getMat(c,m.x),two=['add','sub','mul'].includes(op),Y=two?getMat(c,m.y):null,k=nz(m.k,MENV);
 if(op==='add'||op==='sub'){if(X.length!==Y.length||X[0].length!==Y[0].length)err('Dimension error');return{M:X.map((r,i)=>r.map((v,j)=>op==='add'?v+Y[i][j]:v-Y[i][j])),lab:`${mname(m.x)} ${op==='add'?'+':'−'} ${mname(m.y)}`}}
 if(op==='mul')return{M:mmul(X,Y),lab:`${mname(m.x)} × ${mname(m.y)}`};
 if(op==='sc')return{M:mapM(X,v=>v*k),lab:`${fmtN(k)} × ${mname(m.x)}`};
 if(op==='tr')return{M:tr(X),lab:`${mname(m.x)}ᵀ`};
 if(X.length!==X[0].length)err('Dimension error');
 if(op==='det')return{s:det(X),lab:`det ${mname(m.x)}`};
 return{M:inv(X),lab:`${mname(m.x)}⁻¹`}}
const matStr=(M,sd)=>'['+M.map(r=>r.map(v=>fv(v,sd)).join(' ')).join('; ')+']';
function matHTML(M,sd){return`<table class="mxo">${M.map(r=>`<tr>${r.map(v=>`<td>${E(fv(v,sd))}</td>`).join('')}</tr>`).join('')}</table>`}
function resMx(){const c=C(),R=RES[rk('mx')];if(!R)return'<div class="cres"><small>Choose an operation and press =</small></div>';if(R.err)return errBox(R.err);
 const sd=c.sd;if(R.s!==undefined)return`<div class="cres"><small>${E(R.lab)}</small><b>${E(fv(R.s,sd))}</b></div>`;
 return`<div class="cres" style="text-align:left"><small style="text-align:left">${E(R.lab)}</small><div style="overflow:auto;margin:6px 0">${matHTML(R.M,sd)}</div><div class="row" style="gap:4px"><small>Store in</small>${['A','B','C'].map(n=>bt('→ '+n,'mxStore',n,'g','padding:2px 9px;font-size:.8rem')).join('')}</div></div>`}
function mxCard(nm){const c=C(),m=c.mx[nm],R=+m.r,K=+m.c;let g='';
 for(let i=0;i<R;i++){g+='<div class="row" style="gap:4px;margin:3px 0;flex-wrap:nowrap">';for(let j=0;j<K;j++)g+=inp(`mx.${nm}.d.${i}.${j}`,m.d[i][j],{sty:'width:62px;padding:5px;text-align:center'});g+='</div>'}
 const ds=k=>sel(`mx.${nm}.${k}`,[1,2,3],m[k],{live:'mxDim',sty:'width:auto;padding:2px 6px'});
 return`<div class="card" style="padding:10px"><div class="row" style="justify-content:space-between"><b>Matrix ${nm}</b><span class="row" style="gap:4px">${ds('r')}<span>×</span>${ds('c')}</span></div><div style="margin-top:6px;overflow:auto">${g}</div></div>`}
function matrixUI(){const c=C(),m=c.mx,two=['add','sub','mul'].includes(m.op);
 return`<div class="card">${modeHead('matrix',sdBtn())}<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(210px,1fr))">${['A','B','C'].map(mxCard).join('')}</div>
<div class="row" style="margin-top:10px">${sel('mx.op',MXOPS,m.op,{live:'mxOp',sty:'width:auto'})}<span>X =</span>${sel('mx.x',MXN,m.x,{sty:'width:auto'})}${two?`<span>Y =</span>${sel('mx.y',MXN,m.y,{sty:'width:auto'})}`:''}${m.op==='sc'?`<span>k =</span>${inp('mx.k',m.k,{sty:'width:80px'})}`:''}${bt('= Calculate','mxRun')}</div>
<div id="res-mx">${resMx()}</div>${note('Sizes up to 3 × 3. Entries can be fractions (1/2) or expressions. Singular matrices have no inverse.')}</div>${histCard()}`}
CX.A.mxRun=()=>{const c=C();try{const R=mxCompute(c);RES[rk('mx')]=R;if(R.M)c.mx.ans={r:R.M.length,c:R.M[0].length,d:R.M};hpush('MATRIX',R.lab,R.s!==undefined?fv(R.s,c.sd):matStr(R.M,c.sd))}
 catch(e){if(!e.isC)throw e;RES[rk('mx')]={err:e.message};toast(e.message)}save();paint('res-mx',resMx());refreshHist()};
CX.A.mxStore=nm=>{const c=C(),R=RES[rk('mx')];if(!R||!R.M)return;const d=[0,1,2].map(i=>[0,1,2].map(j=>R.M[i]&&R.M[i][j]!==undefined?String(+R.M[i][j].toPrecision(12)):'0'));
 c.mx[nm]={r:R.M.length,c:R.M[0].length,d};save();go();toast('Stored in '+nm)};

/* ================= VECTOR ================= */
const VEOPS=[['add','X + Y'],['sub','X − Y'],['sc','k × X'],['dot','X · Y (dot)'],['cross','X × Y (cross)'],['mag','|X| (magnitude)'],['ang','Angle between X and Y'],['unit','Unit vector of X']];
const VEN=[['A','A'],['B','B'],['C','C'],['Ans','VctAns']];
function getVec(c,nm){if(nm==='Ans'){if(!c.ve.ans)err('No VctAns yet — run an operation first');return c.ve.ans.slice()}
 const v=c.ve[nm],n=+v.n,out=[];for(let i=0;i<n;i++){try{out.push(nz(v.d[i],MENV))}catch(e){if(e.isC)e.message+=` (${nm}${'ijk'[i]})`;throw e}}return out}
const vname=nm=>nm==='Ans'?'VctAns':nm,vmag=a=>Math.hypot(...a);
function veCompute(c){const v=c.ve,op=v.op,X=getVec(c,v.x),two=['add','sub','dot','cross','ang'].includes(op),Y=two?getVec(c,v.y):null,k=nz(v.k,MENV);
 const same=()=>{if(X.length!==Y.length)err('Dimension error')},nx=vname(v.x),ny=vname(v.y);
 if(op==='add'||op==='sub'){same();return{V:X.map((a,i)=>op==='add'?a+Y[i]:a-Y[i]),lab:`${nx} ${op==='add'?'+':'−'} ${ny}`}}
 if(op==='sc')return{V:X.map(a=>a*k),lab:`${fmtN(k)} × ${nx}`};
 if(op==='dot'){same();return{s:X.reduce((s,a,i)=>s+a*Y[i],0),lab:`${nx} · ${ny}`}}
 if(op==='cross'){same();const a=X.length===2?[X[0],X[1],0]:X,b=Y.length===2?[Y[0],Y[1],0]:Y;
  return{V:[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],lab:`${nx} × ${ny}`,nt:X.length===2?'2D vectors are treated as 3D with z = 0.':''}}
 if(op==='mag')return{s:vmag(X),lab:`|${nx}|`};
 if(op==='ang'){same();const m=vmag(X)*vmag(Y);if(m===0)ME();const cs=X.reduce((s,a,i)=>s+a*Y[i],0)/m;return{s:Math.acos(clamp(cs))/AU[c.ang],lab:`angle(${nx}, ${ny})`,u:ANGN[c.ang]}}
 const m=vmag(X);if(m===0)ME();return{V:X.map(a=>a/m),lab:`unit(${nx})`}}
const vecStr=(V,sd)=>'('+V.map(a=>fv(a,sd)).join(', ')+')';
function resVe(){const c=C(),R=RES[rk('ve')];if(!R)return'<div class="cres"><small>Choose an operation and press =</small></div>';if(R.err)return errBox(R.err);const sd=c.sd;
 if(R.s!==undefined)return`<div class="cres"><small>${E(R.lab)}</small><b>${E(fv(R.s,sd))}${R.u?' '+R.u:''}</b></div>`;
 return`<div class="cres" style="text-align:left"><small style="text-align:left">${E(R.lab)}</small><b style="display:block;margin:4px 0">${E(vecStr(R.V,sd))}</b>${R.V.length===3||R.V.length===2?`<small style="text-align:left">|result| = ${E(fv(vmag(R.V),sd))}</small>`:''}${R.nt?`<small style="text-align:left">${E(R.nt)}</small>`:''}<div class="row" style="gap:4px;margin-top:6px"><small>Store in</small>${['A','B','C'].map(n=>bt('→ '+n,'veStore',n,'g','padding:2px 9px;font-size:.8rem')).join('')}</div></div>`}
function veCard(nm){const c=C(),v=c.ve[nm],n=+v.n;let g='<div class="row" style="gap:4px;flex-wrap:nowrap">';for(let i=0;i<n;i++)g+=inp(`ve.${nm}.d.${i}`,v.d[i],{sty:'width:62px;padding:5px;text-align:center',ph:'ijk'[i]});g+='</div>';
 return`<div class="card" style="padding:10px"><div class="row" style="justify-content:space-between"><b>Vector ${nm}</b>${sel(`ve.${nm}.n`,[[2,'2D'],[3,'3D']],v.n,{live:'veDim',sty:'width:auto;padding:2px 6px'})}</div><div style="margin-top:6px">${g}</div></div>`}
function vectorUI(){const c=C(),v=c.ve,two=['add','sub','dot','cross','ang'].includes(v.op);
 return`<div class="card">${modeHead('vector',angBar()+sdBtn())}<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(210px,1fr))">${['A','B','C'].map(veCard).join('')}</div>
<div class="row" style="margin-top:10px">${sel('ve.op',VEOPS,v.op,{live:'veOp',sty:'width:auto'})}<span>X =</span>${sel('ve.x',VEN,v.x,{sty:'width:auto'})}${two?`<span>Y =</span>${sel('ve.y',VEN,v.y,{sty:'width:auto'})}`:''}${v.op==='sc'?`<span>k =</span>${inp('ve.k',v.k,{sty:'width:80px'})}`:''}${bt('= Calculate','veRun')}</div>
<div id="res-ve">${resVe()}</div>${note('2D or 3D. Angle between vectors uses '+ANGN[c.ang]+' (change it with the buttons above). Add and subtract need equal dimensions.')}</div>${histCard()}`}
CX.A.veRun=()=>{const c=C();try{const R=veCompute(c);RES[rk('ve')]=R;if(R.V)c.ve.ans=R.V;hpush('VECTOR',R.lab,R.s!==undefined?fv(R.s,c.sd)+(R.u?' '+R.u:''):vecStr(R.V,c.sd))}
 catch(e){if(!e.isC)throw e;RES[rk('ve')]={err:e.message};toast(e.message)}save();paint('res-ve',resVe());refreshHist()};
CX.A.veStore=nm=>{const c=C(),R=RES[rk('ve')];if(!R||!R.V)return;c.ve[nm]={n:R.V.length,d:[0,1,2].map(i=>R.V[i]!==undefined?String(+R.V[i].toPrecision(12)):'0')};save();go();toast('Stored in '+nm)};

/* ================= TABLE ================= */
function tbCompute(c){const t=c.tb,env=envR(c);if(!String(t.f).trim())err('Enter f(x)');
 let fa,ga=null;try{fa=parseStr(t.f);if(String(t.g).trim())ga=parseStr(t.g)}catch(e){if(e.isC)e.message+=' in f(x)/g(x)';throw e}
 const s=numIn(t.s,env),e=numIn(t.e,env),st=numIn(t.st,env);if(s===null||e===null||st===null)SY();if(st===0)ME();if((e-s)/st<0)ME();
 const n=Math.floor((e-s)/st+1e-9)+1;if(n>45)err('Too many rows (max 45) — increase the step');
 const ev=(a,x)=>{try{return chk(evR(a,Object.assign({},env,{x})))}catch(er){if(!er.isC)throw er;return null}};
 const X=[],F=[],G=[];for(let i=0;i<n;i++){const x=+(s+i*st).toPrecision(12);X.push(x);F.push(ev(fa,x));if(ga)G.push(ev(ga,x))}
 return{X,F,G:ga?G:null,f:t.f,g:ga?t.g:''}}
function resTb(){const c=C(),R=RES[rk('table')];if(!R)return'<div class="cres"><small>Enter f(x), the range and step, then press Generate</small></div>';if(R.err)return errBox(R.err);const sd=c.sd,cell=v=>v===null?'<span class="cerr">Math error</span>':E(fv(v,sd));
 return`<div style="max-height:360px;overflow:auto"><table class="rtab"><tr><th>#</th><th>x</th><th>f(x)</th>${R.G?'<th>g(x)</th>':''}</tr>${R.X.map((x,i)=>`<tr><td style="color:var(--mu)">${i+1}</td><td>${E(fv(x,sd))}</td><td>${cell(R.F[i])}</td>${R.G?`<td>${cell(R.G[i])}</td>`:''}</tr>`).join('')}</table></div><div class="row" style="margin-top:8px">${bt('Send to graph maker →','tbSend')}<small style="color:var(--mu)">${R.X.length} rows</small></div>`}
function tableUI(){const c=C(),t=c.tb;
 return`<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:start">
<div class="card">${modeHead('table',angBar()+sdBtn())}
<label>f(x) =${inp('tb.f',t.f,{sty:'margin-top:3px',ph:'e.g. x^2 - 3x + 2'})}</label><br><br>
<label>g(x) = <small style="color:var(--mu)">(optional)</small>${inp('tb.g',t.g,{sty:'margin-top:3px',ph:'e.g. sin(x)'})}</label><br><br>
<div class="row"><label style="flex:1;min-width:80px">Start${inp('tb.s',t.s)}</label><label style="flex:1;min-width:80px">End${inp('tb.e',t.e)}</label><label style="flex:1;min-width:80px">Step${inp('tb.st',t.st)}</label></div>
<div class="row" style="margin-top:10px">${bt('Generate table','tbRun')}</div>${note('Up to 45 rows. Use x as the variable (e.g. sin(x), x^3, 1/x). Trig functions use '+ANGN[c.ang]+'. Values that cannot be computed show Math error.')}</div>
<div class="card"><h3>Table</h3><div id="res-table">${resTb()}</div></div></div>${histCard()}`}
CX.A.tbRun=()=>{const c=C();try{const R=tbCompute(c);RES[rk('table')]=R;hpush('TABLE','f(x) = '+R.f+(R.g?' ; g(x) = '+R.g:''),R.X.length+' rows, x = '+fmtN(R.X[0])+' … '+fmtN(R.X[R.X.length-1]))}
 catch(e){if(!e.isC)throw e;RES[rk('table')]={err:e.message};toast(e.message)}save();paint('res-table',resTb());refreshHist()};
CX.A.tbSend=()=>{const c=C(),R=RES[rk('table')];if(!R||R.err)return toast('Generate a table first');
 const s=[{n:'f(x) = '+R.f,y:R.F}];if(R.G)s.push({n:'g(x) = '+R.g,y:R.G});c.gp={x:R.X,s};save();anm='tools';go();toast('Sent to graph maker');
 setTimeout(()=>{const e=$('gpcard');if(e)e.scrollIntoView({behavior:'smooth'})},80)};

/* ================= TOOLS ================= */
Object.assign(UN.Length,{mm:.001,yd:.9144,nmi:1852,'µm':1e-6});Object.assign(UN.Mass,{mg:1e-6,t:1000,st:6.35029318});
Object.assign(UN,{
 Area:{'m²':1,'cm²':1e-4,'km²':1e6,ha:1e4,'ft²':0.09290304,'in²':0.00064516,'yd²':0.83612736,acre:4046.8564224,'mi²':2589988.110336},
 Volume:{L:1,mL:.001,'m³':1000,'cm³':.001,'gal (US)':3.785411784,'qt (US)':0.946352946,'pt (US)':0.473176473,'cup (US)':0.2365882365,'fl oz (US)':0.0295735295625,'in³':0.016387064,'ft³':28.316846592},
 Speed:{'m/s':1,'km/h':1/3.6,mph:0.44704,knot:1852/3600,'ft/s':0.3048},
 Time:{s:1,ms:.001,min:60,h:3600,day:86400,week:604800,'year (365 d)':31536000},
 Energy:{J:1,kJ:1000,cal:4.184,kcal:4184,Wh:3600,kWh:3.6e6,eV:1.602176634e-19,BTU:1055.05585262},
 Pressure:{Pa:1,kPa:1000,bar:1e5,atm:101325,psi:6894.757293168,mmHg:133.322387415,torr:101325/760},
 Data:{bit:1,byte:8,KB:8e3,MB:8e6,GB:8e9,TB:8e12,KiB:8192,MiB:8388608,GiB:8589934592}});

/* graph maker: function plot sent from TABLE */
function plotSVG(gp,mode){
 const W=640,H=280,L=52,R=14,T=12,B=26,xs=gp.x,ys=gp.s.flatMap(s=>s.y).filter(v=>v!==null&&isFinite(v));
 if(!xs.length||!ys.length)return'<small style="color:var(--mu)">Nothing to plot (no valid values).</small>';
 let x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys);if(x0===x1){x0-=1;x1+=1}if(y0===y1){y0-=1;y1+=1}const py=(y1-y0)*.06;y0-=py;y1+=py;
 const X=x=>L+(x-x0)/(x1-x0)*(W-L-R),Y=y=>T+(1-(y-y0)/(y1-y0))*(H-T-B);let s=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;min-width:480px;display:block;font-size:11px" fill="#9a9ab0">`;
 for(let i=0;i<=5;i++){const yv=y0+(y1-y0)*i/5,xv=x0+(x1-x0)*i/5;s+=`<line x1="${L}" x2="${W-R}" y1="${Y(yv)}" y2="${Y(yv)}" stroke="#fff" stroke-opacity=".08"/><text x="${L-6}" y="${Y(yv)+4}" text-anchor="end">${E(fmtN(+yv.toPrecision(4)))}</text><line y1="${T}" y2="${H-B}" x1="${X(xv)}" x2="${X(xv)}" stroke="#fff" stroke-opacity=".06"/><text x="${X(xv)}" y="${H-8}" text-anchor="middle">${E(fmtN(+xv.toPrecision(4)))}</text>`}
 if(y0<0&&y1>0)s+=`<line x1="${L}" x2="${W-R}" y1="${Y(0)}" y2="${Y(0)}" stroke="#9a9ab0" stroke-opacity=".6"/>`;if(x0<0&&x1>0)s+=`<line y1="${T}" y2="${H-B}" x1="${X(0)}" x2="${X(0)}" stroke="#9a9ab0" stroke-opacity=".6"/>`;
 gp.s.forEach((sr,k)=>{const col=HC[k%HC.length];let seg=[],segs=[];sr.y.forEach((v,i)=>{if(v===null||!isFinite(v)){seg=[];return}if(!seg.length){seg=[];segs.push(seg)}seg.push([X(xs[i]),Y(v)])});
  if(mode!=='points')segs.forEach(q=>{if(q.length>1)s+=`<polyline fill="none" stroke="${col}" stroke-width="2" points="${q.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')}"/>`});
  if(mode!=='line')segs.flat().forEach(p=>s+=`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3" fill="${col}"/>`)});
 return s+'</svg>'}
function gpBlock(){const c=C();if(!c.gp)return`<div style="margin-top:10px;border-top:1px solid var(--bd);padding-top:8px"><b>Function plot</b><br><small style="color:var(--mu)">Nothing here yet. Open TABLE, generate a table and press “Send to graph maker”.</small></div>`;
 return`<div id="gpcard" style="margin-top:10px;border-top:1px solid var(--bd);padding-top:8px"><div class="row" style="justify-content:space-between"><b>Function plot <small style="color:var(--mu)">(from TABLE)</small></b><span class="row" style="gap:6px">${sel('gm',[['line','Line'],['points','Points'],['both','Line + points']],c.gm,{live:'gpMode',sty:'width:auto;padding:3px 8px'})}${bt('Clear plot','gpClr',null,'g',SM)}</span></div>
<div style="overflow-x:auto;margin-top:6px">${plotSVG(c.gp,c.gm)}</div><div class="row" style="gap:12px;margin-top:4px">${c.gp.s.map((s,k)=>`<small><span style="color:${HC[k%HC.length]}">●</span> ${E(s.n)}</small>`).join('')}</div></div>`}
CX.A.gpClr=()=>{C().gp=null;save();go()};
CX.A.jump=id=>{const e=$(id);if(e)e.scrollIntoView({behavior:'smooth'})};

/* geometry */
const PI=Math.PI,GEOL=[
['Circle','2D',[['r','radius']],v=>[['Area',PI*v.r*v.r],['Circumference',2*PI*v.r],['Diameter',2*v.r]]],
['Rectangle','2D',[['l','length'],['w','width']],v=>[['Area',v.l*v.w],['Perimeter',2*(v.l+v.w)],['Diagonal',Math.hypot(v.l,v.w)]]],
['Square','2D',[['a','side']],v=>[['Area',v.a*v.a],['Perimeter',4*v.a],['Diagonal',v.a*Math.SQRT2]]],
['Triangle (base, height)','2D',[['b','base'],['h','height']],v=>[['Area',v.b*v.h/2]]],
['Triangle (3 sides)','2D',[['a','side a'],['b','side b'],['c','side c']],v=>{if(v.a+v.b<=v.c||v.a+v.c<=v.b||v.b+v.c<=v.a)err('Invalid triangle: the sides break the triangle inequality');const s=(v.a+v.b+v.c)/2,A=Math.sqrt(s*(s-v.a)*(s-v.b)*(s-v.c));return[['Area (Heron)',A],['Perimeter',2*s],['Inradius',A/s],['Circumradius',v.a*v.b*v.c/(4*A)]]}],
['Right triangle (legs)','2D',[['a','leg a'],['b','leg b']],v=>[['Hypotenuse',Math.hypot(v.a,v.b)],['Area',v.a*v.b/2],['Perimeter',v.a+v.b+Math.hypot(v.a,v.b)]]],
['Parallelogram','2D',[['b','base'],['s','slant side'],['h','height']],v=>[['Area',v.b*v.h],['Perimeter',2*(v.b+v.s)]]],
['Trapezoid','2D',[['a','parallel side a'],['b','parallel side b'],['h','height'],['c','leg c'],['d','leg d']],v=>[['Area',(v.a+v.b)*v.h/2],['Perimeter',v.a+v.b+v.c+v.d]]],
['Rhombus','2D',[['p','diagonal p'],['q','diagonal q']],v=>{const s=Math.hypot(v.p/2,v.q/2);return[['Area',v.p*v.q/2],['Side',s],['Perimeter',4*s]]}],
['Ellipse','2D',[['a','semi-axis a'],['b','semi-axis b']],v=>[['Area',PI*v.a*v.b],['Perimeter (Ramanujan approx.)',PI*(3*(v.a+v.b)-Math.sqrt((3*v.a+v.b)*(v.a+3*v.b)))]]],
['Regular polygon','2D',[['n','number of sides'],['s','side length']],v=>{if(!Number.isInteger(v.n)||v.n<3)err('Number of sides must be a whole number ≥ 3');return[['Area',v.n*v.s*v.s/(4*Math.tan(PI/v.n))],['Perimeter',v.n*v.s],['Apothem',v.s/(2*Math.tan(PI/v.n))],['Interior angle (°)',180*(v.n-2)/v.n]]}],
['Circular sector','2D',[['r','radius'],['t','angle (°)']],v=>{const th=v.t*PI/180;return[['Area',v.r*v.r*th/2],['Arc length',v.r*th],['Perimeter',2*v.r+v.r*th]]}],
['Cube','3D',[['a','edge']],v=>[['Volume',v.a**3],['Surface area',6*v.a*v.a],['Space diagonal',v.a*Math.sqrt(3)]]],
['Cuboid','3D',[['l','length'],['w','width'],['h','height']],v=>[['Volume',v.l*v.w*v.h],['Surface area',2*(v.l*v.w+v.w*v.h+v.l*v.h)],['Space diagonal',Math.sqrt(v.l*v.l+v.w*v.w+v.h*v.h)]]],
['Sphere','3D',[['r','radius']],v=>[['Volume',4/3*PI*v.r**3],['Surface area',4*PI*v.r*v.r]]],
['Hemisphere','3D',[['r','radius']],v=>[['Volume',2/3*PI*v.r**3],['Curved surface',2*PI*v.r*v.r],['Total surface',3*PI*v.r*v.r]]],
['Cylinder','3D',[['r','radius'],['h','height']],v=>[['Volume',PI*v.r*v.r*v.h],['Lateral surface',2*PI*v.r*v.h],['Total surface',2*PI*v.r*(v.r+v.h)]]],
['Cone','3D',[['r','radius'],['h','height']],v=>{const l=Math.hypot(v.r,v.h);return[['Volume',PI*v.r*v.r*v.h/3],['Slant height',l],['Lateral surface',PI*v.r*l],['Total surface',PI*v.r*(v.r+l)]]}],
['Square pyramid','3D',[['a','base edge'],['h','height']],v=>{const l=Math.hypot(v.a/2,v.h);return[['Volume',v.a*v.a*v.h/3],['Slant height',l],['Lateral surface',2*v.a*l],['Total surface',v.a*v.a+2*v.a*l]]}],
['Triangular prism','3D',[['b','triangle base'],['h','triangle height'],['L','prism length']],v=>[['Base area',v.b*v.h/2],['Volume',v.b*v.h/2*v.L]]]];
function geoIn(){const c=C(),sh=GEOL.find(s=>s[0]===c.geo.shape)||GEOL[0];return`<div class="row">${sh[2].map(f=>`<label style="flex:1;min-width:90px;font-size:.8rem;color:var(--mu)">${f[1]}${inp('geo.v.'+f[0],c.geo.v[f[0]]==null?'':c.geo.v[f[0]],{live:'geo',sty:'margin-top:3px;color:var(--tx)'})}</label>`).join('')}</div>`}
function geoOut(){const c=C(),sh=GEOL.find(s=>s[0]===c.geo.shape)||GEOL[0],vals={};
 try{for(const f of sh[2]){const x=numIn(c.geo.v[f[0]],MENV);if(x===null)return'<small style="color:var(--mu)">Enter the values above.</small>';if(x<0)err('Values must be 0 or more');vals[f[0]]=x}
  const rows=sh[3](vals);return`<table class="rtab">${rows.map(r=>`<tr><td style="text-align:left">${r[0]}</td><td><b>${E(isFinite(r[1])?fmtN(r[1]):'—')}</b></td></tr>`).join('')}</table>${note('Use one unit throughout: results are in that unit² (areas) or unit³ (volumes).')}`}
 catch(e){if(!e.isC)throw e;return`<span class="cerr">${E(e.message)}</span>`}}
const paintGeo=()=>paint('geo-out',geoOut());

/* date-time */
const MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'],WDN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const pdt=s=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(s||'');if(!m)return null;const d=new Date(Date.UTC(+m[1],+m[2]-1,+m[3]));return d.getUTCFullYear()===+m[1]&&d.getUTCMonth()===+m[2]-1&&d.getUTCDate()===+m[3]?d:null};
const dIso=d=>d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate()),longD=d=>WDN[d.getUTCDay()]+', '+d.getUTCDate()+' '+MONTHS[d.getUTCMonth()]+' '+d.getUTCFullYear();
const dimU=(y,m)=>new Date(Date.UTC(y,m+1,0)).getUTCDate();
function addM(d,n){const m=d.getUTCMonth()+n,ty=d.getUTCFullYear()+Math.floor(m/12),tm=((m%12)+12)%12;return new Date(Date.UTC(ty,tm,Math.min(d.getUTCDate(),dimU(ty,tm))))}
function ymdDiff(a,b){let mo=(b.getUTCFullYear()-a.getUTCFullYear())*12+b.getUTCMonth()-a.getUTCMonth();if(addM(a,mo)>b)mo--;const mid=addM(a,mo);return[Math.floor(mo/12),mo%12,Math.round((b-mid)/864e5)]}
function isoWeek(d){const t=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()));t.setUTCDate(t.getUTCDate()-((t.getUTCDay()+6)%7)+3);const fy=new Date(Date.UTC(t.getUTCFullYear(),0,4));return 1+Math.round(((t-fy)/864e5-3+((fy.getUTCDay()+6)%7))/7)}
const plural=(n,w)=>n+' '+w+(n===1?'':'s');
function dtDiff(){const c=C(),a=pdt(c.dt.a),b=pdt(c.dt.b);if(!a||!b)return'<small style="color:var(--mu)">Pick both dates.</small>';
 const lo=a<=b?a:b,hi=a<=b?b:a,days=Math.round((hi-lo)/864e5),[y,m,d]=ymdDiff(lo,hi);let wk=0;for(let t=new Date(lo.getTime()+864e5);t<=hi&&wk<40000;t=new Date(t.getTime()+864e5)){const w=t.getUTCDay();if(w!==0&&w!==6)wk++}
 return`<table class="rtab">${tr2('Difference',`<b>${plural(days,'day')}</b>${a>b?' <small>(second date is earlier)</small>':''}`)}${tr2('In weeks',`${plural(Math.floor(days/7),'week')} ${plural(days%7,'day')}`)}${tr2('Years · months · days',`${y} y · ${m} m · ${d} d`)}${tr2('Working days (Mon–Fri)',wk+' <small style="color:var(--mu)">(start excluded, end included)</small>')}${tr2('Dates',`${E(longD(a))}<br>${E(longD(b))}`)}</table>`}
function dtAdd(){const c=C(),s=pdt(c.dt.s),n=Number(c.dt.n);if(!s)return'<small style="color:var(--mu)">Pick a start date.</small>';if(c.dt.n===''||!Number.isInteger(n))return'<small class="cerr">Enter a whole number.</small>';
 const k=(c.dt.sg==='-'?-1:1)*n;let r;if(c.dt.u==='days')r=new Date(s.getTime()+k*864e5);else if(c.dt.u==='weeks')r=new Date(s.getTime()+k*7*864e5);else if(c.dt.u==='months')r=addM(s,k);else r=addM(s,12*k);
 if(isNaN(r)||Math.abs(r.getUTCFullYear())>9999||r.getUTCFullYear()<1)return'<small class="cerr">Date out of range.</small>';return`<div class="cres"><b>${E(dIso(r))}</b><small>${E(longD(r))}</small></div>`}
function dtWd(){const c=C(),w=pdt(c.dt.w);if(!w)return'<small style="color:var(--mu)">Pick a date.</small>';const y=w.getUTCFullYear(),ly=(y%4===0&&y%100!==0)||y%400===0,doy=Math.round((w-new Date(Date.UTC(y,0,1)))/864e5)+1;
 return`<div class="cres"><b>${WDN[w.getUTCDay()]}</b><small>day ${doy} of ${ly?366:365} · ISO week ${isoWeek(w)} · ${ly?'leap year':'not a leap year'}</small></div>`}
const paintDt=()=>{paint('dt-diff',dtDiff());paint('dt-add',dtAdd());paint('dt-wd',dtWd())};

/* finance */
const fm=x=>isFinite(x)?x.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}):'—';
const fnum=(s,name)=>{let v;try{v=numIn(s,MENV)}catch(e){err('Check '+name)}if(v===null)err('Enter '+name);return v};
function finSI(){const f=C().fin.si;try{const P=fnum(f.p,'principal'),r=fnum(f.r,'rate'),t=fnum(f.t,'time'),I=P*r*t/100;return`<table class="rtab">${tr2('Interest',`<b>${fm(I)}</b>`)}${tr2('Total amount',`<b>${fm(P+I)}</b>`)}</table>`}catch(e){return`<small style="color:var(--mu)">${E(e.message)}</small>`}}
function finCI(){const f=C().fin.ci;try{const P=fnum(f.p,'principal'),r=fnum(f.r,'rate'),t=fnum(f.t,'time');let A;if(f.n==='cont')A=P*Math.exp(r*t/100);else{const n=Number(f.n);A=P*Math.pow(1+r/(100*n),n*t)}
 return`<table class="rtab">${tr2('Compound interest',`<b>${fm(A-P)}</b>`)}${tr2('Total amount',`<b>${fm(A)}</b>`)}</table>`}catch(e){return`<small style="color:var(--mu)">${E(e.message)}</small>`}}
function finEMI(){const f=C().fin.emi;try{const P=fnum(f.p,'loan amount'),ra=fnum(f.r,'rate'),t=fnum(f.t,'tenure'),n=f.u==='years'?t*12:t;if(!Number.isInteger(n)||n<1)err('Tenure must be a whole number of months');if(P<0||ra<0)err('Values must be 0 or more');
 const r=ra/1200,emi=r===0?P/n:P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1),tot=emi*n;
 return`<table class="rtab">${tr2('Monthly EMI',`<b>${fm(emi)}</b>`)}${tr2('Total payment',fm(tot))}${tr2('Total interest',fm(tot-P))}${tr2('Instalments',n)}${tr2('Interest in 1st instalment',fm(P*r))}</table>`}catch(e){return`<small style="color:var(--mu)">${E(e.message)}</small>`}}
function finPC(){const f=C().fin.pc;let h='';
 try{const o=fnum(f.o,'old value'),n=fnum(f.n,'new value');if(o===0)err('Old value is 0');const p=(n-o)/Math.abs(o)*100;h+=`<tr><td style="text-align:left">Change ${E(fmtN(o))} → ${E(fmtN(n))}</td><td><b>${p>=0?'+':''}${E(fmtN(+p.toPrecision(10)))}%</b> <small>${p>0?'increase':p<0?'decrease':'no change'}</small></td></tr>`}catch(e){h+=`<tr><td colspan="2"><small style="color:var(--mu)">Change: ${E(e.message)}</small></td></tr>`}
 try{const x=fnum(f.x,'percent'),y=fnum(f.y,'value');h+=`<tr><td style="text-align:left">${E(fmtN(x))}% of ${E(fmtN(y))}</td><td><b>${E(fmtN(+(x*y/100).toPrecision(10)))}</b></td></tr>`}catch(e){h+=`<tr><td colspan="2"><small style="color:var(--mu)">X% of Y: ${E(e.message)}</small></td></tr>`}
 try{const v=fnum(f.pi,'value'),p=fnum(f.pr,'percent');h+=`<tr><td style="text-align:left">${E(fmtN(v))} + ${E(fmtN(p))}%</td><td><b>${E(fmtN(+(v*(1+p/100)).toPrecision(10)))}</b></td></tr><tr><td style="text-align:left">${E(fmtN(v))} − ${E(fmtN(p))}%</td><td><b>${E(fmtN(+(v*(1-p/100)).toPrecision(10)))}</b></td></tr>`}catch(e){h+=`<tr><td colspan="2"><small style="color:var(--mu)">Increase/decrease: ${E(e.message)}</small></td></tr>`}
 return`<table class="rtab">${h}</table>`}
const paintFin=()=>{paint('fin-si',finSI());paint('fin-ci',finCI());paint('fin-emi',finEMI());paint('fin-pc',finPC())};
const fr=(lab,path,val,w)=>`<label style="flex:1;min-width:${w||80}px;font-size:.8rem;color:var(--mu)">${lab}${inp(path,val,{live:'fin',sty:'margin-top:3px;color:var(--tx)'})}</label>`;

function toolsUI(v){const c=C(),f=c.fin,d=c.dt;
 return`<div class="row" style="margin-bottom:10px"><small style="color:var(--mu)">Jump to:</small>${[['tool-unit','Unit converter'],['tool-graph','Graph maker'],['tool-geo','Geometry'],['tool-dt','Date-time'],['tool-fin','Finance']].map(x=>bt(x[1],'jump',x[0],'g',SM)).join('')}</div>
<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:start">
<div class="card" id="tool-unit"><h3>Unit converter</h3><select id="ut" onchange="uf()">${Object.keys(UN).map(k=>`<option>${k}</option>`).join('')}</select><br><br><div class="row"><input id="uv" type="number" value="1" oninput="uc()"><select id="ua" onchange="uc()" style="max-width:110px"></select><span>→</span><select id="ub" onchange="uc()" style="max-width:110px"></select></div><div class="big2" id="ur"></div></div>
<div class="card" id="tool-geo"><h3>Geometry</h3><select data-cp="geo.shape" data-live="geoShape" style="margin-bottom:8px">${['2D','3D'].map(g=>`<optgroup label="${g==='2D'?'Plane shapes (area, perimeter)':'Solids (volume, surface area)'}">${GEOL.filter(s=>s[1]===g).map(s=>`<option${s[0]===c.geo.shape?' selected':''}>${E(s[0])}</option>`).join('')}</optgroup>`).join('')}</select><div id="geo-in">${geoIn()}</div><div id="geo-out" style="margin-top:8px"></div></div></div><br>
<div class="card" id="tool-graph"><h3>Graph maker</h3><div class="row"><input id="gd" value="${esc(v.chart)}" placeholder="Math:80,Physics:65"><button onclick="V().chart=val('gd');save();go()">Plot</button></div>${bars(v.chart)}<br>${gpBlock()}</div><br>
<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));align-items:start">
<div class="card" id="tool-dt"><h3>Date-time</h3>
<b style="font-size:.85rem">Difference between two dates</b><div class="row" style="margin:4px 0"><input type="date" data-cp="dt.a" data-live="dt" value="${E(d.a)}"><span>→</span><input type="date" data-cp="dt.b" data-live="dt" value="${E(d.b)}"></div><div id="dt-diff"></div><br>
<b style="font-size:.85rem">Add or subtract</b><div class="row" style="margin:4px 0"><input type="date" data-cp="dt.s" data-live="dt" value="${E(d.s)}" style="max-width:150px">${sel('dt.sg',[['+','add'],['-','subtract']],d.sg,{live:'dt',sty:'width:auto'})}${inp('dt.n',d.n,{live:'dt',sty:'max-width:70px'})}${sel('dt.u',['days','weeks','months','years'],d.u,{live:'dt',sty:'width:auto'})}</div><div id="dt-add"></div><br>
<b style="font-size:.85rem">Weekday of a date</b><div class="row" style="margin:4px 0"><input type="date" data-cp="dt.w" data-live="dt" value="${E(d.w)}" style="max-width:170px"></div><div id="dt-wd"></div></div>
<div class="card" id="tool-fin"><h3>Finance</h3>
<b style="font-size:.85rem">Simple interest</b><div class="row" style="margin:4px 0">${fr('Principal','fin.si.p',f.si.p)}${fr('Rate % / yr','fin.si.r',f.si.r)}${fr('Years','fin.si.t',f.si.t,60)}</div><div id="fin-si"></div><br>
<b style="font-size:.85rem">Compound interest</b><div class="row" style="margin:4px 0">${fr('Principal','fin.ci.p',f.ci.p)}${fr('Rate % / yr','fin.ci.r',f.ci.r)}${fr('Years','fin.ci.t',f.ci.t,60)}<label style="font-size:.8rem;color:var(--mu)">Compounded${sel('fin.ci.n',[['1','yearly'],['2','half-yearly'],['4','quarterly'],['12','monthly'],['365','daily'],['cont','continuously']],f.ci.n,{live:'fin',sty:'margin-top:3px'})}</label></div><div id="fin-ci"></div><br>
<b style="font-size:.85rem">Loan EMI</b><div class="row" style="margin:4px 0">${fr('Loan amount','fin.emi.p',f.emi.p)}${fr('Rate % / yr','fin.emi.r',f.emi.r)}${fr('Tenure','fin.emi.t',f.emi.t,60)}<label style="font-size:.8rem;color:var(--mu)">in${sel('fin.emi.u',['years','months'],f.emi.u,{live:'fin',sty:'margin-top:3px'})}</label></div><div id="fin-emi"></div><br>
<b style="font-size:.85rem">Percentages</b><div class="row" style="margin:4px 0">${fr('Old value','fin.pc.o',f.pc.o,70)}${fr('New value','fin.pc.n',f.pc.n,70)}</div><div class="row" style="margin:4px 0">${fr('X %','fin.pc.x',f.pc.x,70)}${fr('of Y','fin.pc.y',f.pc.y,70)}</div><div class="row" style="margin:4px 0">${fr('Value','fin.pc.pi',f.pc.pi,70)}${fr('± percent','fin.pc.pr',f.pc.pr,70)}</div><div id="fin-pc"></div></div></div>`}
const liveAll=()=>{paintGeo();paintDt();paintFin()};

/* ================= wiring and overrides (existing function-override chain kept) ================= */
function ovUI(){return`<p style="color:var(--mu);margin-top:0">Calculator modes, inspired by the Casio fx-991ES Plus. Pick a mode to open it.</p><div class="grid">${AM.map((m,i)=>`<button class="amc" onclick="anT('${m[0]}')">${m[4]}<span><small>MODE ${i+1}</small><b>${m[1]} · ${m[2]}</b><p>${m[3]}</p><em>Open →</em></span></button>`).join('')}</div><p style="color:var(--mu);font-size:.85rem;margin-top:14px">Also in this centre: <a href="#" style="color:#6a8cff" onclick="anT('tools');return false">Tools</a> — unit converter, graph maker, geometry, date-time and finance.</p>${histCard()}`}
const MODEUI={cmplx:cmplxUI,stat:statUI,basen:bnUI,eqn:eqnUI,matrix:matrixUI,table:tableUI,vector:vectorUI};
anComp=()=>compUI();anSoon=k=>(MODEUI[k]||compUI)();anTools=v=>toolsUI(v);anOv=()=>ovUI();kp=k=>{if(!$('cd'))return;compKey(k)};
const LIVE={statType:()=>go(),stat:()=>{paint('res-stat',resStat());paint('st-pred',statPred())},eqKind:()=>go(),mxDim:()=>go(),mxOp:()=>go(),veDim:()=>go(),veOp:()=>go(),
 bnW:()=>{CX.A.bnRun(true);go()},geoShape:()=>{paint('geo-in',geoIn());paintGeo()},geo:paintGeo,dt:paintDt,fin:paintFin,gpMode:()=>go()};
CX.live=n=>{const f=LIVE[n];if(f)f()};
document.addEventListener('input',e=>{const t=e.target;if(!t||!t.dataset||!t.dataset.cp||view!=='vault')return;const c=C();if(!c)return;setPath(c,t.dataset.cp,t.value);if(t.id==='cd')ST.fresh=0;sv();if(t.dataset.live)CX.live(t.dataset.live)});
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-do],[data-ck]');if(!b||b.disabled||view!=='vault')return;
 if(b.dataset.ck!==undefined){CX.key(b.dataset.ck,b.dataset.t||'cd');return}const f=CX.A[b.dataset.do];if(f)f(b.dataset.a,b)});
document.addEventListener('keydown',e=>{if(view!=='vault'||tab!=='ana'||e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target,tag=t&&t.tagName;
 if(t&&t.id==='cd'){if(e.key==='Enter'){e.preventDefault();CX.A.eq();return}if(e.key==='Escape'){compKey('C');return}
  if(ST.fresh&&e.key.length===1){t.value=(BINOP.test(e.key)||e.key==='!'||e.key==='%')?'Ans':'';ST.fresh=0;try{t.setSelectionRange(t.value.length,t.value.length)}catch(_){}}return}
 if(t&&t.id==='cmx'&&e.key==='Enter'){e.preventDefault();CX.A.cmRun();return}
 if(t&&t.id==='bnx'&&e.key==='Enter'){e.preventDefault();CX.A.bnRun();return}
 if(anm==='comp'&&e.key.length===1&&e.key!==' '&&!/^(INPUT|TEXTAREA|SELECT)$/.test(tag)){const d=$('cd');if(d){d.focus();try{d.setSelectionRange(d.value.length,d.value.length)}catch(_){}}}});
const SUBMAP={'Overview':'ov','COMP':'comp','CMPLX':'cmplx','STAT':'stat','BASE-N':'basen','EQN':'eqn','MATRIX':'matrix','TABLE':'table','VECTOR':'vector','Tools':'tools'};
const R9=render;render=function(){R9();
 if(view!=='vault'||tab!=='ana')return;
 document.querySelectorAll('aside .sbm button[onclick^="sbSub(\'ana\'"]').forEach(b=>{const m=/sbSub\('ana','([^']*)'\)/.exec(b.getAttribute('onclick')||'');if(m)b.classList.toggle('on',SUBMAP[m[1]]===anm)});
 if(anm==='tools')liveAll()};
document.head.insertAdjacentHTML('beforeend','<style id="v9css">.kp{max-width:320px}.kp button{padding:8px 4px}.kp5{display:grid;grid-template-columns:repeat(5,1fr);gap:4px}.kp5 button{padding:6px 2px;font-size:.78rem;min-width:0}button:disabled{opacity:.3;cursor:not-allowed}button:disabled:hover{background:var(--navy)}button.g:disabled:hover{background:transparent}.cres{background:#08080d;border:1px solid var(--bd);border-radius:10px;padding:10px 12px;margin:8px 0;min-height:56px;text-align:right}.cres>b{display:block;font-size:1.5rem;font-variant-numeric:tabular-nums;word-break:break-all;line-height:1.25}.cres>small{display:block;color:var(--mu);word-break:break-all}.cerr{color:#e04646}.rtab{width:100%;border-collapse:collapse;font-size:.88rem}.rtab td,.rtab th{border-bottom:1px solid var(--bd);padding:4px 8px;text-align:right;font-weight:400;vertical-align:top}.rtab th{color:var(--mu);font-size:.78rem}.rtab td input{min-width:0}.mxo{border-collapse:collapse;display:inline-table;border-left:2px solid #6a8cff;border-right:2px solid #6a8cff;border-radius:6px;padding:0 4px}.mxo td{padding:3px 10px;text-align:right;font-variant-numeric:tabular-nums}.stp{color:var(--mu);font-size:.85rem;line-height:1.55;margin:6px 0 0;padding-left:20px;text-align:left}.hl{display:flex;gap:8px;align-items:center;padding:5px 0;border-bottom:1px solid var(--bd);font-size:.85rem}.hl b{font-variant-numeric:tabular-nums;word-break:break-all;max-width:45%;text-align:right}details summary{outline:none}</style>');
})();

/* ===================== v10 SOURCES CENTRE — PART 1 (p1) =====================
 p1 = SHARED ENGINE + routing + Website library + read-only Overview/Dashboard sections.
 p2 (File system) and p3 (YT library) register themselves with SRC.libs.fs / SRC.libs.yt.
 LIB CONTRACT: {name,title(it),sorts:[[key,label,cmp]],groups:[['','No grouping'],[key,label,it=>[names]]],
  ico(it)->html, sub(it)->safe html, text?(it), open(it), edit(id), chips()->html, add()->html (Add tab),
  manager?(k) optional custom Manage tab, settings?() optional, del?(it), copy?(it)}.
 Shared helpers for p2/p3: SRC.u = {uid,E,SR,sv,modal,closeM,fEdit,fopts,fp,inF,cf,paint,ctl,IUI,SQ,SEL,emo,labsOf}
 Instances: 'm:<lib>' = full manager (persisted ui), 'o:<lib>' = Overview, 'd:<lib>' = Dashboard (read-only, session ui).
============================================================================== */
(function(){
const NS={libs:{},t:'ov',it:{fs:'manage',web:'manage',yt:'manage'}},SUI={},SQ={},SEL={};window.SRC=NS;
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6),E=s=>esc(s==null?'':s),$i=id=>document.getElementById(id);
const emo=s=>{s=(s||'').trim();if(!s)return'';try{return[...new Intl.Segmenter().segment(s)][0].segment}catch(e){return[...s][0]}};
const host=u=>{try{return new URL(u).hostname.replace(/^www\./,'')}catch(e){return u||''}};
const nu=u=>{u=(u||'').trim();if(!u)return'';if(!/^https?:\/\//i.test(u))u='https://'+u;try{const x=new URL(u);return/^https?:$/.test(x.protocol)?x.href:''}catch(e){return''}};
const mkW=o=>({id:uid(),t:o.t||host(o.u),u:o.u,d:o.d||'',labels:o.labels||[],folder:o.folder||'',fav:!!o.fav,icon:o.icon||'',color:o.color||'#0b2a6f',note:o.note||'',added:Date.now(),opened:0,count:0});
const SR=v=>{v=v||V();const s=v.src=v.src||{};['fs','web','yt'].forEach(k=>{const l=s[k]=s[k]||{};l.folders=l.folders||[];l.items=l.items||[];l.ui=l.ui||{}});s.fs.trash=s.fs.trash||[];
 if(!s.mig){s.mig=1;if((v.links||[]).length){const f=uid();s.web.folders.push({id:f,name:'Imported',desc:'',color:'#2f55d4',emoji:'🔗',parent:''});v.links.forEach(l=>s.web.items.push(mkW({t:l.t,u:l.u,folder:f})))}}return s};
const syncLinks=()=>{const v=V(),w=SR().web.items,f=w.filter(i=>i.fav);v.links=(f.length?f:w).slice(0,6).map(i=>({t:i.t,u:i.u}))};
const fp=(k,f)=>{const m=Object.fromEntries(SR()[k].folders.map(x=>[x.id,x])),a=[];while(f&&m[f]){a.unshift(m[f].name);f=m[f].parent}return a.join(' / ')};
const inF=(k,f,r)=>{const m=Object.fromEntries(SR()[k].folders.map(x=>[x.id,x]));while(f){if(f===r)return true;f=m[f]&&m[f].parent}return false};
function fopts(k,p,d,sel,ex){return SR()[k].folders.filter(f=>(f.parent||'')===p&&f.id!==ex).map(f=>`<option value="${f.id}"${f.id===sel?' selected':''}>${'\u00a0\u00a0'.repeat(d)}${E(f.name)}</option>`+fopts(k,f.id,d+1,sel,ex)).join('')}
const fsel=(k,sel,id)=>`<select id="${id}" data-fsel="${k}"><option value="">Unfiled</option>${fopts(k,'',0,sel)}</select>`;
const labsOf=k=>[...new Set(SR()[k].items.flatMap(i=>i.labels||[]))];
const IUI=(k,inst)=>{const L=NS.libs[k],o=inst[0]==='m'?SR()[k].ui:(SUI[inst]=SUI[inst]||{});if(o.sort==null){o.sort=L.sorts[0][0];o.dir=1;o.group='';o.view='grid';o.folder='';o.label='';o.fav=0}return o};
/* ---- modal ---- */
let MK=null;function closeM(){const m=$i('smod');if(m)m.remove();if(MK){document.removeEventListener('keydown',MK);MK=null}}
function modal(h,key,wide){closeM();const m=document.createElement('div');m.className='modal scm';m.id='smod';m.innerHTML=`<div class="card" style="width:min(${wide||560}px,100%);max-height:92vh;overflow:auto">${h}</div>`;m.onmousedown=e=>{if(e.target===m)closeM()};document.body.appendChild(m);MK=key||(e=>{if(e.key==='Escape')closeM()});document.addEventListener('keydown',MK)}
function cf(k,it){const L=NS.libs[k];modal(`<h3>Open “${E(L.title(it))}”?</h3><div class="row"><button id="cfy">Yes</button><button class="g" id="cfn">No</button></div><small style="color:var(--mu)">Enter = Yes · Esc = No</small>`,e=>{if(e.key==='Enter'||/^y$/i.test(e.key)){e.preventDefault();closeM();L.open(it)}else if(e.key==='Escape'||/^n$/i.test(e.key)){e.preventDefault();closeM()}},380);$i('cfy').onclick=()=>{closeM();L.open(it)};$i('cfn').onclick=closeM;$i('cfy').focus()}
/* ---- rows / paint ---- */
function rows(k,inst){const L=NS.libs[k],s=SR()[k],u=IUI(k,inst),q=(SQ[inst]||'').toLowerCase();
 const a=s.items.filter(it=>(!u.fav||it.fav)&&(!u.label||(it.labels||[]).includes(u.label))&&(L.filters||[]).every(f=>!u['f_'+f[0]]||L.fil(it,f[0],u['f_'+f[0]]))&&(!u.folder||inF(k,it.folder,u.folder))&&(!q||[L.title(it),it.d,(it.labels||[]).join(' '),fp(k,it.folder),L.text?L.text(it):''].join(' ').toLowerCase().includes(q)));
 const so=L.sorts.find(x=>x[0]===u.sort)||L.sorts[0];a.sort((x,y)=>so[2](x,y)*(u.dir||1));
 const g=L.groups.find(x=>x[0]===u.group);if(!g||!g[0])return[['',a]];
 const m=new Map();a.forEach(it=>(g[2](it)||['—']).forEach(n=>{if(!m.has(n))m.set(n,[]);m.get(n).push(it)}));return[...m]}
function item(k,inst,it,view,mgr,on){const L=NS.libs[k],A=(a,t,c)=>`<button class="${c||'g'}" title="${t}" onclick="SRC.act('${k}','${a}','${it.id}')">${{fav:'★',edit:'✎',copy:'⧉',del:'✕'}[a]}</button>`;
 return `<div class="sc ${view==='list'?'l':'g'}${on?' sel':''}"${mgr?` draggable="true" ondragstart="SRC.ds(event,'${k}','${it.id}')" ondragover="event.preventDefault()" ondrop="SRC.dr(event,'${k}','${it.id}')"`:''} onclick="SRC.clk('${k}','${inst}','${it.id}',event)" ondblclick="SRC.dbl('${k}','${inst}','${it.id}')">${mgr?`<input type="checkbox" ${on?'checked':''} onclick="event.stopPropagation();SRC.tg('${k}','${it.id}')">`:''}<span class="si">${L.ico(it)}</span><span class="sx"><b>${E(L.title(it))}${it.fav?' ★':''}</b><small>${L.sub(it)}</small><span>${(it.labels||[]).map(l=>`<i class="lb">${E(l)}</i>`).join('')}</span></span>${L.extra?L.extra(it,mgr):''}${mgr?`<span class="sa" onclick="event.stopPropagation()">${A('fav','Favourite')}${A('edit','Edit')}${A('copy','Copy')}${A('del','Delete','x')}</span>`:''}</div>`}
function paint(inst){const el=$i('sl-'+inst);if(!el)return;const k=inst.split(':')[1],L=NS.libs[k];if(!L)return;const u=IUI(k,inst),mgr=inst[0]==='m',g=rows(k,inst),sel=SEL[k]||[],t=el.scrollTop;
 if(L.paintList){L.paintList(el,inst,g,u,mgr)}else el.innerHTML=g.map(([n,a])=>(n?`<h4 style="margin:10px 0 4px">${E(n)} <small style="color:var(--mu)">(${a.length})</small></h4>`:'')+`<div class="${u.view==='list'?'scl':'scg'}">${a.map(it=>item(k,inst,it,u.view,mgr,sel.includes(it.id))).join('')}</div>`).join('')||'<div style="color:var(--mu);padding:18px;text-align:center">Nothing here yet.</div>';
 el.scrollTop=t;const c=$i('cnt-'+inst);if(c)c.textContent=g.reduce((n,x)=>n+x[1].length,0)+' shown';
 const b=$i('bk-'+k);if(b&&mgr)b.innerHTML=bulk(k)}
const ids=(k,inst)=>rows(k,inst||'m:'+k).flatMap(x=>x[1].map(i=>i.id));
function bulk(k){const n=(SEL[k]||[]).length;return `<div class="row" style="margin:6px 0"><button class="g" onclick="SRC.bulk('${k}','all')">Select all</button><button class="g" onclick="SRC.bulk('${k}','none')">Clear</button><small style="color:var(--mu)">${n} selected</small>${n?`<button class="g" onclick="SRC.bulk('${k}','fav')">★ Favourite</button><select id="bm-${k}" data-fsel="${k}" style="width:auto"><option value="">Unfiled</option>${fopts(k,'',0)}</select><button class="g" onclick="SRC.bulk('${k}','move')">Move</button><button class="g" onclick="SRC.bulk('${k}','labels')">Add labels</button><button class="g" onclick="SRC.bulk('${k}','copy')">Copy</button><button class="x" onclick="SRC.bulk('${k}','del')">Delete</button>`:''}</div>`}
function tree(k,inst){const s=SR()[k],u=IUI(k,inst),ch=p=>s.folders.filter(f=>(f.parent||'')===p).map(f=>`<div style="padding-left:12px"><button class="g tb${u.folder===f.id?' on':''}" ondragover="event.preventDefault()" ondrop="SRC.tdrop('${k}','${f.id}',event)" onclick="SRC.st('${inst}','folder','${f.id}')"><span style="color:${E(f.color)}">${f.emoji?E(f.emoji):'■'}</span> ${E(f.name)}</button><button class="g" title="Edit folder" style="padding:2px 6px" onclick="SRC.fEdit('${k}','${f.id}')">✎</button>${ch(f.id)}</div>`).join('');
 return `<button class="g tb${!u.folder?' on':''}" ondragover="event.preventDefault()" ondrop="SRC.tdrop('${k}','',event)" onclick="SRC.st('${inst}','folder','')">All items</button>`+ch('')+`<div style="margin-top:6px"><button class="g" onclick="SRC.fEdit('${k}')">＋ New folder</button></div>`}
function ctl(k,inst){const L=NS.libs[k],u=IUI(k,inst),o=(a,v)=>a.map(x=>`<option value="${x[0]}"${x[0]===v?' selected':''}>${x[1]}</option>`).join('');
 return `<div class="row" style="margin-bottom:8px"><input placeholder="Search…" value="${E(SQ[inst]||'')}" oninput="SRC.st('${inst}','q',this.value)" style="min-width:150px"><select onchange="SRC.st('${inst}','sort',this.value)">${o(L.sorts,u.sort)}</select><select onchange="SRC.st('${inst}','dir',+this.value)">${o([[1,'Ascending'],[-1,'Descending']],u.dir)}</select><select onchange="SRC.st('${inst}','group',this.value)">${o(L.groups,u.group)}</select><select onchange="SRC.st('${inst}','view',this.value)">${o(inst[0]==='m'&&L.views||[['grid','Grid'],['list','List']],u.view)}</select>${inst[0]==='m'?(L.filters||[]).map(f=>`<select onchange="SRC.st('${inst}','f_${f[0]}',this.value)"><option value="">${f[1]}: all</option>${f[2].map(x=>`<option value="${x[0]}"${u['f_'+f[0]]===x[0]?' selected':''}>${x[1]}</option>`).join('')}</select>`).join('')+`<select onchange="SRC.st('${inst}','label',this.value)"><option value="">All labels</option>${labsOf(k).map(l=>`<option${l===u.label?' selected':''}>${E(l)}</option>`).join('')}</select><label><input type="checkbox" ${u.fav?'checked':''} onchange="SRC.st('${inst}','fav',this.checked?1:0)"> ★ only</label>`:''}<small id="cnt-${inst}" style="color:var(--mu)"></small></div>`}
const TT={fs:'File system',web:'Website library',yt:'YT videos/playlists'};
function sec(k,inst){const L=NS.libs[k];if(!L)return `<div class="card" style="margin-bottom:12px"><h3>${TT[k]}</h3><small style="color:var(--mu)">Not available.</small></div>`;
 return `<div class="card" style="margin-bottom:12px"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${L.name} <small style="color:var(--mu)">· ${SR()[k].items.length}</small></h3><a href="#" style="color:#6a8cff" onclick="SRC.goto('${k}');return false">Open full manager →</a></div><div class="row" style="margin:6px 0">${L.chips()}</div>${ctl(k,inst)}<div id="sl-${inst}" data-sl="${inst}" style="height:300px;overflow:auto"></div></div>`}
function manager(k){const inst='m:'+k;return `<div style="display:grid;grid-template-columns:210px 1fr;gap:12px"><div class="card" id="tr-${inst}" style="overflow:auto;max-height:72vh">${tree(k,inst)}</div><div>${ctl(k,inst)}<div id="bk-${k}"></div><div id="sl-${inst}" data-sl="${inst}" style="max-height:62vh;overflow:auto"></div></div></div>`}
function settings(k){const L=NS.libs[k],u=IUI(k,'m:'+k),o=(a,v)=>a.map(x=>`<option value="${x[0]}"${x[0]===v?' selected':''}>${x[1]}</option>`).join('');
 return `<div class="grid"><div class="card scm"><h3>Defaults</h3><label>View<select onchange="SRC.st('m:${k}','view',this.value)">${o(L.views||[['grid','Grid'],['list','List']],u.view)}</select></label><label>Sort<select onchange="SRC.st('m:${k}','sort',this.value)">${o(L.sorts,u.sort)}</select></label><label>Group<select onchange="SRC.st('m:${k}','group',this.value)">${o(L.groups,u.group)}</select></label></div><div class="card"><h3>Reset</h3><p style="color:var(--mu)">Removes every item and folder in this library for this vault.</p><button class="r" onclick="SRC.reset('${k}')">Reset ${L.name}</button></div>${L.settings?L.settings():''}</div>`}
function lib(k){const L=NS.libs[k];if(!L)return `<div class="card"><h3>${TT[k]}</h3><small style="color:var(--mu)">Installed in a later part of the Sources build (p2 = File system, p3 = YT library).</small></div>`;
 const t=NS.it[k],T=[['add','Add'],['manage','Manage'],['settings','Settings']];
 return `<div class="sw" style="margin-bottom:10px">${T.map(x=>`<button class="${t===x[0]?'':'g'}" onclick="SRC.itab('${k}','${x[0]}')">${x[1]}</button>`).join('')}</div>`+(t==='add'?L.add():t==='settings'?settings(k):(L.manager||manager)(k))}
/* ---- routing ---- */
src=function(){SR();const T=[['ov','Overview'],['fs','File system'],['web','Website library'],['yt','YT videos/playlists']];
 return `<h2>Sources centre</h2><div class="sw" style="margin-bottom:12px">${T.map(t=>`<button class="${NS.t===t[0]?'':'g'}" onclick="SRC.tab('${t[0]}')">${t[1]}</button>`).join('')}</div>`+(NS.t==='ov'?['fs','web','yt'].map(k=>sec(k,'o:'+k)).join(''):lib(NS.t))};
const _D=dash;dash=function(){return _D()+`<h2 style="margin-top:22px">Sources</h2>`+['fs','web','yt'].map(k=>sec(k,'d:'+k)).join('')};
const _R=render;render=function(){_R();NS.refresh()};
const _sb=window.sbSub;window.sbSub=(c,l)=>{if(c==='src'){NS.t=({'Overview':'ov','File system':'fs','Website library':'web','YT videos/playlists':'yt'})[l]||'ov';go('src');return}return _sb(c,l)};
NS.refresh=()=>{document.querySelectorAll('select[data-fsel]').forEach(s=>{const v=s.value,k=s.dataset.fsel;s.innerHTML='<option value="">Unfiled</option>'+fopts(k,'',0);s.value=v});
 document.querySelectorAll('[id^="tr-m:"]').forEach(e=>{const k=e.id.slice(5);if(NS.libs[k])e.innerHTML=(NS.libs[k].tree||tree)(k,'m:'+k)});document.querySelectorAll('[data-sl]').forEach(e=>paint(e.dataset.sl))};
NS.ds=(e,k,id)=>{const a=SEL[k]||[];NS.drag={k,ids:a.includes(id)?a.slice():[id]};e.dataTransfer.setData('text/plain','sc');e.dataTransfer.effectAllowed='move'};
NS.tdrop=(k,f,e)=>{e.preventDefault();e.stopPropagation();const d=NS.drag;if(!d||d.k!==k)return;SR()[k].items.forEach(i=>{if(d.ids.includes(i.id))i.folder=f});NS.drag=null;sv(k)};
NS.dr=(e,k,id)=>{e.preventDefault();e.stopPropagation();const d=NS.drag,s=SR()[k];if(!d||d.k!==k||IUI(k,'m:'+k).sort!=='ord'||d.ids.includes(id))return;const mv=s.items.filter(i=>d.ids.includes(i.id));s.items=s.items.filter(i=>!d.ids.includes(i.id));const t=s.items.findIndex(i=>i.id===id);s.items.splice(t<0?s.items.length:t,0,...mv);NS.drag=null;sv(k)};
NS.tab=t=>{NS.t=t;go('src')};NS.goto=k=>{NS.t=k;NS.it[k]='manage';go('src')};NS.itab=(k,t)=>{NS.it[k]=t;go('src')};NS.close=closeM;
const find=(k,id)=>SR()[k].items.find(i=>i.id===id),sv=k=>{if(k==='web')syncLinks();save();NS.refresh()};
NS.st=(inst,key,v)=>{const k=inst.split(':')[1];if(key==='q'){SQ[inst]=v;paint(inst);return}IUI(k,inst)[key]=v;if(inst[0]==='m')save();if(key==='folder'){const t=$i('tr-'+inst);if(t)t.innerHTML=(NS.libs[k].tree||tree)(k,inst)}paint(inst)};
NS.tg=(k,id)=>{const a=SEL[k]=SEL[k]||[],i=a.indexOf(id);i<0?a.push(id):a.splice(i,1);paint('m:'+k)};
NS.clk=(k,inst,id,e)=>{if(inst[0]==='m'){if(e.ctrlKey||e.metaKey)return NS.tg(k,id);SEL[k]=[id];paint(inst);return}cf(k,find(k,id))};
NS.dbl=(k,inst,id)=>{if(inst[0]==='m')NS.libs[k].open(find(k,id))};
NS.act=(k,a,id)=>{const L=NS.libs[k],s=SR()[k],it=find(k,id);if(!it)return;
 if(a==='fav'){it.fav=!it.fav;sv(k)}else if(a==='edit')L.edit(id);
 else if(a==='copy'){L.copy?L.copy(it):s.items.push({...JSON.parse(JSON.stringify(it)),id:uid(),t:it.t+' - Copy',added:Date.now(),opened:0,count:0});sv(k);toast('Copied')}
 else if(a==='del'){if(!confirm('Delete “'+L.title(it)+'”?'))return;L.del?L.del(it):s.items=s.items.filter(x=>x.id!==id);SEL[k]=(SEL[k]||[]).filter(x=>x!==id);sv(k)}};
NS.bulk=(k,a)=>{const s=SR()[k],L=NS.libs[k],sel=SEL[k]=SEL[k]||[];
 if(a==='all'){SEL[k]=ids(k);return paint('m:'+k)}if(a==='none'){SEL[k]=[];return paint('m:'+k)}
 const its=s.items.filter(i=>sel.includes(i.id));if(!its.length)return;
 if(a==='fav'){const all=its.every(i=>i.fav);its.forEach(i=>i.fav=!all)}
 else if(a==='move'){const f=$i('bm-'+k).value;its.forEach(i=>i.folder=f)}
 else if(a==='labels'){const t=prompt('Labels to add (comma separated)');if(!t)return;const l=t.split(',').map(x=>x.trim()).filter(Boolean);its.forEach(i=>i.labels=[...new Set([...(i.labels||[]),...l])])}
 else if(a==='copy')its.forEach(i=>L.copy?L.copy(i):s.items.push({...JSON.parse(JSON.stringify(i)),id:uid(),t:i.t+' - Copy',added:Date.now(),opened:0,count:0}));
 else if(a==='del'){if(!confirm('Delete '+its.length+' item(s)?'))return;its.forEach(i=>L.del?L.del(i):s.items.splice(s.items.indexOf(i),1));SEL[k]=[]}
 sv(k)};
NS.reset=k=>{if(!confirm('Reset this library? All its items and folders are removed.'))return;const s=SR()[k];s.items=[];s.folders=[];if(s.trash)s.trash=[];if(NS.libs[k].onReset)NS.libs[k].onReset();SEL[k]=[];sv(k);toast('Library reset')};
/* ---- folder editor (shared by all libraries; folders are separate per library) ---- */
NS.fEdit=(k,id)=>{const s=SR()[k],f=id?s.folders.find(x=>x.id===id):{name:'',desc:'',color:'#2f55d4',emoji:'📁',parent:IUI(k,'m:'+k).folder||''};
 modal(`<h3>${id?'Edit':'New'} folder</h3><label>Name<input id="fn" value="${E(f.name)}"></label><label>Description<input id="fd" value="${E(f.desc)}"></label><label>Colour<input type="color" id="fc" value="${f.color}"></label><div class="row">${['#2f55d4','#e04646','#2fa86a','#e0a030','#9b59d0','#20b2c4','#8a8a99'].map(c=>`<button class="g" style="background:${c};width:26px;height:26px;padding:0" onclick="document.getElementById('fc').value='${c}'"></button>`).join('')}</div><label>Emoji icon (type or paste any emoji)<input id="fe" value="${E(f.emoji)}" placeholder="Press Win + . to open the Windows emoji panel" oninput="document.getElementById('fpv').textContent=SRC.u.emo(this.value)"> <span id="fpv" style="font-size:1.5rem">${E(f.emoji)}</span></label><label>Parent folder<select id="fpar"><option value="">(top level)</option>${fopts(k,'',0,f.parent,id)}</select></label><div class="row" style="margin-top:10px"><button onclick="SRC.fSave('${k}','${id||''}')">Save</button>${id?`<button class="x" onclick="SRC.fDel('${k}','${id}')">Delete folder</button>`:''}<button class="g" onclick="SRC.close()">Cancel</button></div>`)};
NS.fSave=(k,id)=>{const s=SR()[k],n=val('fn');if(!n)return toast('Name the folder');const o={name:n,desc:val('fd'),color:val('fc')||'#2f55d4',emoji:emo(val('fe')),parent:val('fpar')};
 if(id)Object.assign(s.folders.find(x=>x.id===id),o);else s.folders.push({id:uid(),...o});closeM();sv(k)};
NS.fDel=(k,id)=>{if(!confirm('Delete this folder? Its items move up one level.'))return;const s=SR()[k],f=s.folders.find(x=>x.id===id),p=f.parent||'';s.folders.forEach(x=>{if(x.parent===id)x.parent=p});s.items.forEach(i=>{if(i.folder===id)i.folder=p});s.folders=s.folders.filter(x=>x.id!==id);['m:','o:','d:'].forEach(x=>{const u=IUI(k,x+k);if(u.folder===id)u.folder=''});closeM();sv(k)};
/* ---- WEBSITE LIBRARY ---- */
const wf=(i,p)=>`<label>URL<input id="${p}u" value="${E(i.u||'')}" placeholder="https://…"></label><label>Title<input id="${p}t" value="${E(i.t||'')}" placeholder="Defaults to the site name"></label><label>Description<textarea id="${p}d" rows="2">${E(i.d||'')}</textarea></label><label>Labels (comma separated)<input id="${p}l" list="dl-web" value="${E((i.labels||[]).join(', '))}"></label><label>Folder ${fsel('web',i.folder,p+'f')}</label><label>Icon (type or paste any emoji, or leave empty for a letter tile)<input id="${p}e" value="${E(i.icon||'')}" placeholder="Win + . opens the Windows emoji panel" oninput="document.getElementById('${p}pv').textContent=SRC.u.emo(this.value)"> <span id="${p}pv" style="font-size:1.5rem">${E(i.icon||'')}</span></label><label>Tile colour<input type="color" id="${p}c" value="${i.color||'#0b2a6f'}"></label><label>Note<textarea id="${p}n" rows="2">${E(i.note||'')}</textarea></label><label><input type="checkbox" id="${p}s" ${i.fav?'checked':''}> Favourite</label><datalist id="dl-web">${labsOf('web').map(l=>`<option value="${E(l)}">`).join('')}</datalist>`;
const wr=p=>({u:nu(val(p+'u')),t:val(p+'t'),d:val(p+'d'),labels:[...new Set(val(p+'l').split(',').map(x=>x.trim()).filter(Boolean))],folder:$i(p+'f').value,icon:emo(val(p+'e')),color:val(p+'c'),note:val(p+'n'),fav:$i(p+'s').checked});
NS.wAdd=()=>{const o=wr('wa_');if(!o.u)return toast('Enter a valid http/https URL');const s=SR().web;if(s.items.some(i=>i.u===o.u)&&!confirm('This URL is already saved. Add anyway?'))return;s.items.push(mkW(o));sv('web');toast('Website added');go('src')};
NS.wBulk=()=>{const s=SR().web,f=$i('wb_f').value,l=val('wb_l').split(',').map(x=>x.trim()).filter(Boolean);let n=0,bad=0;($i('wb_t').value.split('\n')).map(x=>x.trim()).filter(Boolean).forEach(x=>{const u=nu(x);if(!u)return bad++;if(s.items.some(i=>i.u===u))return bad++;s.items.push(mkW({u,folder:f,labels:l}));n++});sv('web');toast(n+' added'+(bad?', '+bad+' skipped (invalid or duplicate)':''));go('src')};
NS.wSave=id=>{const o=wr('we_');if(!o.u)return toast('Enter a valid http/https URL');const it=find('web',id);Object.assign(it,o,{t:o.t||host(o.u)});closeM();sv('web')};
NS.libs.web={name:'Website library',title:i=>i.t,
 sorts:[['t','Title',(a,b)=>a.t.localeCompare(b.t)],['added','Date added',(a,b)=>a.added-b.added],['opened','Last opened',(a,b)=>(a.opened||0)-(b.opened||0)],['count','Most opened',(a,b)=>(a.count||0)-(b.count||0)],['fav','Favourite',(a,b)=>(b.fav?1:0)-(a.fav?1:0)]],
 groups:[['','No grouping'],['folder','Folder',i=>[fp('web',i.folder)||'Unfiled']],['label','Label',i=>i.labels&&i.labels.length?i.labels:['No label']]],
 ico:i=>`<span class="ti" style="background:${E(i.color)}">${E(i.icon||(i.t||'?')[0].toUpperCase())}</span>`,
 sub:i=>E(host(i.u))+(i.count?` · opened ${i.count}×`:''),text:i=>i.u+' '+(i.note||''),
 open:i=>{window.open(i.u,'_blank','noopener,noreferrer');i.count=(i.count||0)+1;i.opened=Date.now();sv('web')},
 edit:id=>modal(`<h3>Edit website</h3>${wf(find('web',id),'we_')}<div class="row" style="margin-top:10px"><button onclick="SRC.wSave('${id}')">Save</button><button class="g" onclick="SRC.close()">Cancel</button></div>`),
 chips:()=>{const w=SR().web.items,r=w.filter(i=>i.opened).sort((a,b)=>b.opened-a.opened)[0];return `<i class="lb">${w.length} sites</i><i class="lb">${w.filter(i=>i.fav).length} ★</i><i class="lb">${SR().web.folders.length} folders</i>${r?`<i class="lb">recent: ${E(r.t)}</i>`:''}`},
 add:()=>`<div class="grid scm"><div class="card"><h3>Add a website</h3>${wf({},'wa_')}<div class="row" style="margin-top:10px"><button onclick="SRC.wAdd()">Add website</button><button class="g" onclick="SRC.fEdit('web')">＋ New folder</button></div></div><div class="card"><h3>Bulk paste (one URL per line)</h3><textarea id="wb_t" rows="8" placeholder="https://example.com&#10;docs.python.org"></textarea><label>Labels (comma separated)<input id="wb_l"></label><label>Folder ${fsel('web','','wb_f')}</label><div class="row" style="margin-top:10px"><button onclick="SRC.wBulk()">Add all</button></div><small style="color:var(--mu)">Titles default to the site name; edit them later in Manage.</small></div></div>`};
NS.u={uid,E,SR,sv,modal,closeM,fEdit:NS.fEdit,fopts,fsel,fp,inF,cf,paint,ctl,IUI,SQ,SEL,emo,labsOf,find,nu,host};
document.head.insertAdjacentHTML('beforeend','<style>.sc{border:1px solid var(--bd);border-radius:10px;background:#08080d;padding:8px;cursor:pointer;position:relative}.sc:hover{border-color:var(--navy2)}.sc.sel{outline:2px solid var(--navy2);background:#0d1330}.sc.g{display:flex;flex-direction:column;gap:6px;align-items:flex-start}.sc.l{display:flex;align-items:center;gap:10px}.scg{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:8px}.scl{display:flex;flex-direction:column;gap:4px}.sx{display:flex;flex-direction:column;gap:2px;min-width:0;flex:1}.sx small{color:var(--mu);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ti{display:inline-flex;width:38px;height:38px;border-radius:9px;align-items:center;justify-content:center;font-size:1.3rem;font-weight:700;flex:none}.lb{font-style:normal;font-size:.72rem;border:1px solid var(--bd);border-radius:99px;padding:0 7px;color:var(--mu);margin:1px 3px 0 0;display:inline-block}.sa{display:flex;gap:2px}.sa button{padding:2px 7px}.tb{width:calc(100% - 34px);text-align:left;margin:1px 0}.tb.on{background:var(--navy2)}.scm label{display:block;margin:6px 0}.scm input:not([type=checkbox]):not([type=color]),.scm textarea,.scm select{width:100%}</style>');
})();


/* ===================== v11 SOURCES CENTRE — PART 2 (p2): FILE SYSTEM ===================== */
(function(){
const NS=window.SRC,U=NS.u,{uid,E,SR,sv,modal,fopts,fsel,fp,inF,paint,IUI,SQ,labsOf}=U,$i=id=>document.getElementById(id),FX=NS.fx={};
const FS={hist:[],fwd:[],sel:[],clip:null,trash:0,props:0,ord:[]},ST=[];let busy=0,gct=0;
const S_=()=>SR().fs,u_=()=>IUI('fs','m:fs'),cur=()=>u_().folder||'',fnd=id=>S_().items.find(i=>i.id===id),fld=id=>S_().folders.find(f=>f.id===id),key=id=>V().id+':'+id;
const lb=t=>[...new Set((t||'').split(',').map(x=>x.trim()).filter(Boolean))],ext=n=>{const m=/\.([^.]+)$/.exec(n||'');return m?m[1].toLowerCase():''};
const fz=n=>n<1024?n+' B':n<1048576?(n/1024).toFixed(1)+' KB':n<1073741824?(n/1048576).toFixed(1)+' MB':(n/1073741824).toFixed(2)+' GB',tot=()=>S_().items.reduce((a,i)=>a+(i.size||0),0),md=d=>d?new Date(d).toLocaleDateString():'—';
/* ---- IndexedDB blob store ---- */
let _db;const idb=()=>_db||(_db=new Promise((res,rej)=>{const r=indexedDB.open('prepvault_files',1);r.onupgradeneeded=()=>r.result.createObjectStore('blobs');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}));
const tx=(m,f)=>idb().then(d=>new Promise((res,rej)=>{const t=d.transaction('blobs',m),q=f(t.objectStore('blobs'));t.oncomplete=()=>res(q&&q.result);t.onerror=t.onabort=()=>rej(t.error)}));
const bput=(k,b)=>tx('readwrite',s=>s.put(b,k)),bget=k=>tx('readonly',s=>s.get(k)),bdel=k=>tx('readwrite',s=>s.delete(k)),bkeys=()=>tx('readonly',s=>s.getAllKeys());
const gc=async()=>{if(busy||Date.now()-gct<4000)return;gct=Date.now();try{const ks=await bkeys(),live=new Set();S.vaults.forEach(v=>{const f=v.src&&v.src.fs;if(f)[...(f.items||[]),...(f.trash||[]).flatMap(r=>r.kind==='file'?[r.file]:r.files||[])].forEach(i=>live.add(v.id+':'+i.id))});if(busy)return;for(const k of ks)if(!live.has(k))await bdel(k)}catch(e){}};
/* ---- types / icons ---- */
const CAT={pdf:['pdf'],doc:['doc','docx','rtf','odt'],ppt:['ppt','pptx','odp'],xls:['xls','xlsx','csv','ods'],txt:['txt','md','log'],zip:['zip','rar','7z','gz','tar'],img:['png','jpg','jpeg','gif','svg','webp','bmp','ico'],vid:['mp4','mkv','mov','avi','webm'],aud:['mp3','wav','flac','m4a','ogg'],code:['js','ts','py','java','c','cpp','cs','html','css','json','xml','sql','sh']};
const CC={pdf:'#e04646',doc:'#2f6fd4',ppt:'#e0742f',xls:'#2fa86a',txt:'#8a8a99',zip:'#c9a227',img:'#9b59d0',vid:'#d4399b',aud:'#20b2c4',code:'#4fb36b',o:'#6a6a7c'},CN={pdf:'PDF',doc:'Documents',ppt:'Presentations',xls:'Spreadsheets',txt:'Text',zip:'Archives',img:'Images',vid:'Videos',aud:'Audio',code:'Code',o:'Other'};
const cat=e=>{e=(e||'').toLowerCase();for(const c in CAT)if(CAT[c].includes(e))return c;return'o'};
const fic=(e,w)=>{const c=CC[cat(e)];w=w||44;return `<svg width="${w}" height="${w*1.18}" viewBox="0 0 44 52"><path d="M6 2h22l10 10v36a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#14141c" stroke="${c}" stroke-width="2"/><path d="M28 2v10h10" fill="none" stroke="${c}" stroke-width="2"/><rect x="2" y="28" width="32" height="14" rx="3" fill="${c}"/><text x="18" y="38.5" font-size="${(e||'').length>3?7:9}" font-weight="700" text-anchor="middle" fill="#fff" font-family="sans-serif">${E((e||'file').slice(0,4).toUpperCase())}</text></svg>`};
const fol=(f,w)=>`<span style="position:relative;display:inline-block;width:${w}px;height:${w*.8}px;line-height:0"><svg width="${w}" height="${w*.8}" viewBox="0 0 46 37"><path d="M2 6a3 3 0 0 1 3-3h12l4 5h20a3 3 0 0 1 3 3v21a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z" fill="${E(f.color)}"/></svg><span style="position:absolute;left:0;right:0;top:32%;text-align:center;line-height:1;font-size:${w*.36}px">${E(f.emoji||'')}</span></span>`;
const dg=t=>{const d=(Date.now()-t)/864e5;return d<1?'Today':d<2?'Yesterday':d<7?'Last 7 days':'Earlier'};
/* ---- tiles ---- */
function mt(o,v,on){const f=o.f,i=o.i,x=f||i,id=x.id,ev=`data-id="${id}" onclick="SRC.fx.clk('${id}',event)" ondblclick="SRC.fx.dbl('${id}')" oncontextmenu="SRC.fx.ctx(event,'${id}')" draggable="true" ondragstart="SRC.fx.ds(event,'${id}')"${f?` ondragover="event.preventDefault()" ondrop="SRC.fx.dp(event,'${id}')"`:''}`;
 const ic=f?fol(f,v==='grid'?64:v==='small'?26:30):fic(i.ext,v==='grid'?46:v==='small'?20:24),nm=E(f?f.name:i.t)+(!f&&i.fav?' ★':''),lab=f?'':(i.labels||[]).map(l=>`<i class="lb">${E(l)}</i>`).join('');
 if(v==='details')return `<tr class="${on?'sel':''}" ${ev}><td>${ic} ${nm}</td><td>${f?'Folder':E((i.ext||'file').toUpperCase())}</td><td>${f?'':fz(i.size)}</td><td>${lab}</td><td>${md(x.added)}</td><td>${f?'':md(i.opened)}</td></tr>`;
 const th=!f&&v==='grid'&&cat(i.ext)==='img'?`<img class="fth" data-b="${id}" alt="">`:`<span class="si">${ic}</span>`;
 return `<div class="sc ${v==='list'||v==='small'?'l':'g'}${on?' sel':''}" ${ev}>${th}<span class="sx"><b>${nm}</b>${v==='small'?'':`<small>${f?'Folder':E(i.ext.toUpperCase())+' · '+fz(i.size)}</small>`}${v==='grid'?lab:''}</span></div>`}
const blk=(os,v)=>{const on=id=>FS.sel.includes(id);os.forEach(o=>FS.ord.push((o.f||o.i).id));return v==='details'?`<table class="fsd"><thead><tr>${[['t','Name'],['type','Type'],['size','Size'],['','Labels'],['added','Added'],['opened','Opened']].map(h=>`<th${h[0]?` style="cursor:pointer" onclick="SRC.st('m:fs','sort','${h[0]}')"`:''}>${h[1]}</th>`).join('')}</tr></thead><tbody>${os.map(o=>mt(o,v,on((o.f||o.i).id))).join('')}</tbody></table>`:`<div class="${v==='list'?'scl':'scg '+(v==='small'?'sm':'big')}">${os.map(o=>mt(o,v,on((o.f||o.i).id))).join('')}</div>`};
const ov=(o,inst,v)=>{const f=o.f,i=o.i,id=(f||i).id;return `<div class="sc ${v==='list'?'l':'g'}" onclick="${f?`SRC.st('${inst}','folder','${id}')`:`SRC.clk('fs','${inst}','${id}',event)`}"><span class="si">${f?fol(f,32):fic(i.ext,26)}</span><span class="sx"><b>${E(f?f.name:i.t)}${!f&&i.fav?' ★':''}</b><small>${f?'Folder':E(i.ext.toUpperCase())+' · '+fz(i.size)}</small></span></div>`};
const selO=()=>FS.sel.map(id=>fld(id)?{f:fld(id)}:fnd(id)?{i:fnd(id)}:null).filter(Boolean);
async function thumbs(el){for(const x of[...el.querySelectorAll('img.fth')].slice(0,40)){const b=await bget(key(x.dataset.b)).catch(()=>0);if(b&&x.isConnected){x.onload=()=>URL.revokeObjectURL(x.src);x.src=URL.createObjectURL(b)}}}
function trashV(el){const s=S_(),t=[...s.trash].reverse();el.innerHTML=`<div class="row" style="margin-bottom:8px"><button class="g" onclick="SRC.fx.tr('all')" ${t.length?'':'disabled'}>Restore all</button><button class="x" onclick="SRC.fx.tr('empty')" ${t.length?'':'disabled'}>Empty Trash</button></div>`+(t.map(r=>{const f=r.kind==='file'?r.file:r.folders.find(x=>x.id===r.rootId);return `<div class="sc l"><span class="si">${r.kind==='file'?fic(f.ext,24):fol(f,30)}</span><span class="sx"><b>${E(r.kind==='file'?f.t:f.name)}</b><small>${r.kind==='file'?fz(f.size):r.files.length+' files, '+r.folders.length+' folders'} · deleted ${md(r.at)}</small></span><button class="g" onclick="SRC.fx.tr('rest','${r.id}')">Restore</button><button class="x" onclick="SRC.fx.tr('del','${r.id}')">Delete permanently</button></div>`}).join('')||'<div style="color:var(--mu);padding:18px;text-align:center">Trash is empty.</div>')}
function meta(){const n=$i('fx-nav');if(!n)return;const cr=[];let f=cur();while(f&&fld(f)){cr.unshift(fld(f));f=fld(f).parent}
 n.innerHTML=`<button class="g" onclick="SRC.fx.nav(-1)" ${FS.hist.length?'':'disabled'}>←</button><button class="g" onclick="SRC.fx.nav(1)" ${FS.fwd.length?'':'disabled'}>→</button><button class="g" onclick="SRC.fx.up()">↑</button><span class="fxc" style="flex:1">${FS.trash?'🗑 Trash':`<a href="#" onclick="SRC.fx.cd('');return false">This vault</a>`+cr.map(x=>` › <a href="#" onclick="SRC.fx.cd('${x.id}');return false">${E(x.name)}</a>`).join('')}</span><button class="g" onclick="SRC.fEdit('fs')">＋ New folder</button><button class="g" onclick="SRC.fx.cmd('paste')" ${FS.clip?'':'disabled'}>Paste</button><button class="g" onclick="SRC.fx.pr()">${FS.props?'Hide':'Show'} properties</button>`;
 const k=FS.sel.length,B={open:'Open',rename:'Rename',details:'Edit details',move:'Move to…',copy:'Copy',cut:'Cut',fav:'★',download:'Download',del:'Delete'};
 $i('fx-bar').innerHTML=`<small style="color:var(--mu)">${k} selected · ${fz(tot())} used<span id="fx-est"></span></small><button class="g" onclick="SRC.fx.cmd('all')">Select all</button>`+(k&&!FS.trash?Object.keys(B).map(c=>`<button class="${c==='del'?'x':'g'}" onclick="SRC.fx.cmd('${c}')">${B[c]}</button>`).join(''):'');
 if(navigator.storage&&navigator.storage.estimate)navigator.storage.estimate().then(e=>{const x=$i('fx-est');if(x)x.textContent=' · browser storage '+fz(e.usage||0)+' of '+fz(e.quota||0)});
 const p=$i('fx-pp'),o=selO();p.style.display=FS.props?'block':'none';if(FS.props){const x=o.length===1?o[0]:null;p.innerHTML=x?(x.f?`<h3>${E(x.f.name)}</h3>${fol(x.f,60)}<p>${E(x.f.desc||'')}</p><small>Folder · ${E(fp('fs',x.f.id))}</small>`:`<h3>${E(x.i.t)}</h3>${fic(x.i.ext,50)}<p>${E(x.i.d||'')}</p><small>Type: ${E(x.i.ext||'file')}<br>Size: ${fz(x.i.size)}<br>Folder: ${E(fp('fs',x.i.folder)||'This vault')}<br>Labels: ${E((x.i.labels||[]).join(', ')||'—')}<br>Added: ${md(x.i.added)}<br>Opened: ${md(x.i.opened)}<br>Favourite: ${x.i.fav?'yes':'no'}</small>`):`<small style="color:var(--mu)">${o.length?o.length+' items selected':'Select one item to see its properties.'}</small>`}}
const selUI=()=>{document.querySelectorAll('#sl-m\\:fs [data-id]').forEach(e=>e.classList.toggle('sel',FS.sel.includes(e.dataset.id)));meta()};
/* ---- trash / move / copy ---- */
function toTrash(ids){const s=S_(),at=Date.now();ids.forEach(id=>{const f=fld(id);if(f){const sub=[id];for(let ch=1;ch;){ch=0;s.folders.forEach(x=>{if(!sub.includes(x.id)&&sub.includes(x.parent)){sub.push(x.id);ch=1}})}s.trash.push({id:uid(),kind:'folder',at,rootId:id,parent:f.parent||'',folders:s.folders.filter(x=>sub.includes(x.id)),files:s.items.filter(i=>sub.includes(i.folder))});s.folders=s.folders.filter(x=>!sub.includes(x.id));s.items=s.items.filter(i=>!sub.includes(i.folder))}else{const i=fnd(id);if(i){s.trash.push({id:uid(),kind:'file',at,file:i});s.items=s.items.filter(x=>x.id!==id)}}})}
const rfiles=r=>r.kind==='file'?[r.file]:r.files,pdel=r=>rfiles(r).forEach(i=>bdel(key(i.id)).catch(()=>0));
function restore(r){const s=S_();if(r.kind==='file'){if(!fld(r.file.folder))r.file.folder='';s.items.push(r.file)}else{r.folders.find(x=>x.id===r.rootId).parent=fld(r.parent)?r.parent:'';s.folders.push(...r.folders);s.items.push(...r.files)}s.trash=s.trash.filter(x=>x!==r)}
function move(ids,t){const s=S_();ids.forEach(id=>{const f=fld(id);if(f){if(t===id||inF('fs',t,id))return;f.parent=t}else{const i=fnd(id);if(i)i.folder=t}});sv('fs')}
async function dup(i,folder){const n={...JSON.parse(JSON.stringify(i)),id:uid(),t:i.t.replace(/(\.[^.]*)?$/,' - Copy$1'),folder,added:Date.now(),opened:0};const b=await bget(key(i.id));if(b)await bput(key(n.id),b);S_().items.push(n)}
async function dl(i){const b=await bget(key(i.id));if(!b)return toast('File content not found');const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=i.t;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),4000)}
async function preview(i){const b=await bget(key(i.id)).catch(()=>0);if(!b)return toast('File content not found');i.opened=Date.now();sv('fs');const c=cat(i.ext),url=URL.createObjectURL(b);let body;
 if(c==='img')body=`<img src="${url}" style="max-width:100%;max-height:70vh">`;else if(i.ext==='pdf')body=`<iframe src="${url}" style="width:100%;height:72vh;border:0"></iframe>`;else if(c==='vid')body=`<video src="${url}" controls style="max-width:100%;max-height:70vh"></video>`;else if(c==='aud')body=`<audio src="${url}" controls></audio>`;else if(c==='txt'||c==='code')body=`<pre style="max-height:70vh;overflow:auto;white-space:pre-wrap">${E(await b.slice(0,1048576).text())}</pre>${b.size>1048576?'<small>Showing the first 1 MB.</small>':''}`;else body='<p style="color:var(--mu)">No preview for this file type. Use Download.</p>';
 modal(`<div class="row" style="justify-content:space-between"><h3 style="margin:0">${E(i.t)}</h3><span><a href="${url}" download="${E(i.t)}"><button>Download</button></a> <button class="g" onclick="SRC.close()">Close</button></span></div><br>${body}`,null,900);
 const mo=new MutationObserver(()=>{if(!$i('smod')){URL.revokeObjectURL(url);mo.disconnect()}});mo.observe(document.body,{childList:true})}
/* ---- commands ---- */
FX.clk=(id,e)=>{if(e.shiftKey&&FS.sel.length){const a=FS.ord.indexOf(FS.sel[FS.sel.length-1]),b=FS.ord.indexOf(id);FS.sel=FS.ord.slice(Math.min(a,b),Math.max(a,b)+1)}else if(e.ctrlKey||e.metaKey){const i=FS.sel.indexOf(id);i<0?FS.sel.push(id):FS.sel.splice(i,1)}else FS.sel=[id];selUI()};
FX.dbl=id=>{if(FS.trash)return;if(fld(id))FX.cd(id);else if(fnd(id))preview(fnd(id))};
FX.cd=id=>{if(id!==cur()||FS.trash){FS.hist.push(cur());FS.fwd=[]}FS.trash=0;u_().folder=id;FS.sel=[];save();NS.refresh()};
FX.nav=d=>{const a=d<0?FS.hist:FS.fwd,b=d<0?FS.fwd:FS.hist;if(!a.length)return;b.push(cur());FS.trash=0;u_().folder=a.pop();FS.sel=[];save();NS.refresh()};
FX.up=()=>{const f=fld(cur());if(f||FS.trash)FX.cd(f?f.parent||'':'')};
FX.trashV=()=>{FS.trash=1;FS.sel=[];NS.refresh()};FX.pr=()=>{FS.props^=1;meta()};
FX.ds=(e,id)=>{if(!FS.sel.includes(id))FS.sel=[id];e.dataTransfer.setData('text/plain','fx');e.dataTransfer.effectAllowed='move'};
FX.dp=(e,t)=>{e.preventDefault();e.stopPropagation();if(e.dataTransfer.files&&e.dataTransfer.files.length&&!FS.sel.length)return;move(FS.sel,t==='__cur'?cur():t)};
FX.tr=(a,id)=>{const s=S_(),r=s.trash.find(x=>x.id===id);if(a==='rest'&&r)restore(r);else if(a==='del'&&r&&confirm('Delete permanently?')){pdel(r);s.trash=s.trash.filter(x=>x!==r)}else if(a==='all')[...s.trash].forEach(restore);else if(a==='empty'&&confirm('Empty the Trash? This cannot be undone.')){s.trash.forEach(pdel);s.trash=[]}sv('fs')};
function details(i){modal(`<h3>Edit details</h3><label>Name<input id="fd_n" value="${E(i.t)}"></label><label>Description<textarea id="fd_d" rows="3">${E(i.d||'')}</textarea></label><label>Labels (comma separated)<input id="fd_l" list="dl-fs" value="${E((i.labels||[]).join(', '))}"></label><label>Folder ${fsel('fs',i.folder,'fd_f')}</label><label><input type="checkbox" id="fd_s" ${i.fav?'checked':''}> Favourite</label><datalist id="dl-fs">${labsOf('fs').map(l=>`<option value="${E(l)}">`).join('')}</datalist><div class="row" style="margin-top:10px"><button onclick="SRC.fx.dsv('${i.id}')">Save</button><button class="g" onclick="SRC.close()">Cancel</button></div>`)}
FX.dsv=id=>{const i=fnd(id),n=val('fd_n');if(!n)return toast('Name required');Object.assign(i,{t:n,ext:ext(n),d:val('fd_d'),labels:lb(val('fd_l')),folder:$i('fd_f').value,fav:$i('fd_s').checked});NS.close();sv('fs')};
FX.mv=()=>{move(FS.sel,$i('mv_f').value);NS.close()};
FX.ml=()=>{const l=lb(val('ml_l'));selO().filter(o=>o.i).forEach(o=>o.i.labels=[...new Set([...(o.i.labels||[]),...l])]);NS.close();sv('fs')};
FX.cmd=async c=>{const o=selO(),fl=o.filter(x=>x.i).map(x=>x.i),s=S_();
 if(c==='all'){FS.sel=FS.ord.slice();return selUI()}if(c==='paste'){if(!FS.clip)return;busy++;try{const ids=FS.clip.ids;if(FS.clip.cut)move(ids,cur());else{for(const id of ids){const i=fnd(id);if(i)await dup(i,cur())}sv('fs')}}finally{busy--}if(FS.clip.cut)FS.clip=null;return}
 if(!o.length)return;
 if(c==='open')o.forEach(x=>FX.dbl((x.f||x.i).id));
 else if(c==='rename'){const x=o[0];if(x.f)NS.fEdit('fs',x.f.id);else{const n=prompt('Rename',x.i.t);if(n){x.i.t=n;x.i.ext=ext(n);sv('fs')}}}
 else if(c==='details'){if(o.length===1)o[0].f?NS.fEdit('fs',o[0].f.id):details(o[0].i);else modal(`<h3>Edit ${fl.length} files</h3><label>Add labels<input id="ml_l"></label><div class="row"><button onclick="SRC.fx.ml()">Apply</button><button class="g" onclick="SRC.close()">Cancel</button></div>`)}
 else if(c==='move')modal(`<h3>Move ${o.length} item(s) to</h3><label>${fsel('fs','','mv_f')}</label><div class="row"><button onclick="SRC.fx.mv()">Move</button><button class="g" onclick="SRC.close()">Cancel</button></div>`);
 else if(c==='copy'||c==='cut'){FS.clip={ids:FS.sel.slice(),cut:c==='cut'};toast(c==='cut'?'Cut — paste in a folder':'Copied — paste in a folder (folders can only be moved)')}
 else if(c==='fav'){const all=fl.every(i=>i.fav);fl.forEach(i=>i.fav=!all);sv('fs')}
 else if(c==='download')fl.forEach(dl);
 else if(c==='del'){toTrash(FS.sel.slice());FS.sel=[];sv('fs');toast('Moved to Trash')}
 else if(c==='perm'){if(!confirm('Delete '+o.length+' item(s) permanently?'))return;const n=s.trash.length;toTrash(FS.sel.slice());s.trash.splice(n).forEach(pdel);FS.sel=[];sv('fs')}};
FX.ctx=(e,id)=>{e.preventDefault();e.stopPropagation();if(FS.trash)return;if(id&&!FS.sel.includes(id)){FS.sel=[id];selUI()}const M=id?[['open','Open'],['rename','Rename'],['details','Edit details'],['move','Move to…'],['copy','Copy'],['cut','Cut'],['fav','Favourite'],['download','Download'],['del','Delete'],['pr','Properties']]:[['paste','Paste'],['nf','New folder'],['all','Select all']];
 const m=document.createElement('div');m.className='fxm';m.style.cssText=`left:${Math.min(e.clientX,innerWidth-190)}px;top:${Math.min(e.clientY,innerHeight-M.length*30-10)}px`;m.innerHTML=M.map(x=>`<button onclick="SRC.fx.mc('${x[0]}')">${x[1]}</button>`).join('');document.body.appendChild(m);setTimeout(()=>document.addEventListener('click',()=>m.remove(),{once:true}),0)};
FX.mc=c=>c==='pr'?(FS.props=1,meta()):c==='nf'?NS.fEdit('fs'):FX.cmd(c);
document.addEventListener('keydown',e=>{if(NS.t!=='fs'||NS.it.fs!=='manage'||!$i('sl-m:fs')||$i('smod'))return;const c=e.ctrlKey||e.metaKey,k=e.key;if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)&&k!=='Escape')return;
 if(k==='Enter')e.altKey?FX.pr():FX.cmd('open');else if(k==='F2')FX.cmd('rename');else if(k==='Delete')FX.cmd(e.shiftKey?'perm':'del');else if(c&&k==='a'){e.preventDefault();FX.cmd('all')}else if(c&&k==='c')FX.cmd('copy');else if(c&&k==='x')FX.cmd('cut');else if(c&&k==='v')FX.cmd('paste');else if(c&&k==='f'){e.preventDefault();const i=document.querySelector('#fx-nav+.row input');if(i)i.focus()}
 else if(k==='Backspace'||(e.altKey&&k==='ArrowLeft'))FX.nav(-1);else if(e.altKey&&k==='ArrowUp')FX.up();else if(k==='Escape'){FS.sel=[];selUI()}
 else if(/^Arrow/.test(k)&&FS.ord.length){e.preventDefault();const i=FS.ord.indexOf(FS.sel[FS.sel.length-1]),n=/Down|Right/.test(k)?Math.min(FS.ord.length-1,i+1):Math.max(0,i<0?0:i-1);FS.sel=[FS.ord[n]];selUI()}});
/* ---- ADD: staging ---- */
const rd=(en,path,out)=>new Promise(r=>{if(en.isFile)en.file(f=>{out.push({file:f,path});r()},()=>r());else{const dr=en.createReader(),all=[];(function more(){dr.readEntries(es=>{if(!es.length)return Promise.all(all.map(x=>rd(x,[...path,en.name],out))).then(r);all.push(...es);more()},()=>r())})()}});
const stage=a=>{a.forEach(x=>ST.push({file:x.file,path:x.path,name:x.file.name,d:'',labels:'',folder:'',fav:false,on:false}));stg()};
FX.drop=async e=>{e.preventDefault();$i('fa_dz').classList.remove('hot');const en=[...e.dataTransfer.items].map(x=>x.webkitGetAsEntry&&x.webkitGetAsEntry()).filter(Boolean),out=[];await Promise.all(en.map(x=>rd(x,[],out)));stage(out)};
FX.pick=i=>{stage([...i.files].map(f=>({file:f,path:f.webkitRelativePath?f.webkitRelativePath.split('/').slice(0,-1):[]})));i.value=''};
FX.sti=(i,k,v)=>{ST[i][k]=v};FX.stc=(i,v)=>{ST[i].on=v};FX.str=i=>{ST.splice(i,1);stg()};FX.clr=()=>{ST.length=0;stg()};FX.sa=()=>{const a=ST.every(x=>x.on);ST.forEach(x=>x.on=!a);stg()};
FX.ap=()=>{const l=val('fb_l'),d=val('fb_d'),f=$i('fb_f').value;ST.filter(x=>x.on).forEach(x=>{if(l)x.labels=lb(x.labels+','+l).join(', ');if(d)x.d=d;if(f)x.folder=f});stg()};
function stg(){const l=$i('fa_list');if(!l)return;$i('fa_n').textContent=ST.length?`(${ST.length})`:'';
 $i('fa_bar').innerHTML=ST.length?`<div class="row scm"><button class="g" onclick="SRC.fx.sa()">Select all</button><input id="fb_l" placeholder="Labels" style="max-width:170px"><input id="fb_d" placeholder="Description" style="max-width:210px"><select id="fb_f" style="max-width:170px"><option value="">(folder: keep)</option><option value="/">Unfiled</option>${fopts('fs','',0)}</select><button class="g" onclick="SRC.fx.ap()">Apply to selected</button><button onclick="SRC.fx.commit()">Add ${ST.length} file(s)</button><button class="x" onclick="SRC.fx.clr()">Clear</button><progress id="fa_pb" style="display:none"></progress></div>`:'';
 l.innerHTML=ST.length?`<table class="fsd scm">${ST.map((x,i)=>`<tr><td><input type="checkbox" ${x.on?'checked':''} onchange="SRC.fx.stc(${i},this.checked)"></td><td><input value="${E(x.name)}" oninput="SRC.fx.sti(${i},'name',this.value)"></td><td><input value="${E(x.d)}" placeholder="Description" oninput="SRC.fx.sti(${i},'d',this.value)"></td><td><input value="${E(x.labels)}" placeholder="Labels" list="dl-fs" oninput="SRC.fx.sti(${i},'labels',this.value)"></td><td><select onchange="SRC.fx.sti(${i},'folder',this.value)"><option value="">(destination)</option><option value="/"${x.folder==='/'?' selected':''}>Unfiled</option>${fopts('fs','',0,x.folder)}</select></td><td><label><input type="checkbox" ${x.fav?'checked':''} onchange="SRC.fx.sti(${i},'fav',this.checked)">★</label></td><td><small>${E(x.path.join('/'))} ${fz(x.file.size)}</small></td><td><button class="x" onclick="SRC.fx.str(${i})">✕</button></td></tr>`).join('')}</table>`:'<small style="color:var(--mu)">Nothing staged yet.</small>'}
FX.commit=async()=>{if(!ST.length)return;const s=S_(),dest=$i('fa_dest').value,all=ST.splice(0),pb=$i('fa_pb'),fm={};let ok=0,bad=0;if(pb){pb.style.display='';pb.max=all.length;pb.value=0}busy++;
 const mk=(base,path)=>{let p=base;for(const nm of path){const k=p+'/'+nm;if(!fm[k]){let f=s.folders.find(x=>(x.parent||'')===p&&x.name===nm);if(!f){f={id:uid(),name:nm,desc:'',color:'#2f55d4',emoji:'📁',parent:p};s.folders.push(f)}fm[k]=f.id}p=fm[k]}return p};
 try{for(const x of all){try{const id=uid(),n=x.name||x.file.name;await bput(key(id),x.file);s.items.push({id,t:n,d:x.d,labels:lb(x.labels),folder:mk(x.folder==='/'?'':x.folder||dest,x.path),fav:x.fav,size:x.file.size,ext:ext(n),mime:x.file.type,added:Date.now(),opened:0});ok++}catch(e){bad++}if(pb)pb.value=ok+bad}}finally{busy--}
 sv('fs');toast(ok+' of '+all.length+' added'+(bad?', '+bad+' failed: not enough storage or access error':''));go('src')};
/* ---- library registration ---- */
NS.libs.fs={name:'File system',title:i=>i.t,views:[['grid','Large icons'],['small','Small icons'],['list','List'],['details','Details']],
 sorts:[['t','Name',(a,b)=>a.t.localeCompare(b.t)],['type','Type',(a,b)=>a.ext.localeCompare(b.ext)],['size','Size',(a,b)=>(a.size||0)-(b.size||0)],['added','Date added',(a,b)=>a.added-b.added],['opened','Date opened',(a,b)=>(a.opened||0)-(b.opened||0)],['fav','Favourite',(a,b)=>(b.fav?1:0)-(a.fav?1:0)]],
 groups:[['','No grouping'],['type','Type',i=>[CN[cat(i.ext)]]],['label','Label',i=>i.labels&&i.labels.length?i.labels:['No label']],['folder','Folder',i=>[fp('fs',i.folder)||'This vault']],['date','Date added',i=>[dg(i.added)]]],
 filters:[['type','Type',Object.keys(CN).map(k=>[k,CN[k]])]],fil:(i,k,v)=>cat(i.ext)===v,
 ico:i=>fic(i.ext,30),sub:i=>E(i.ext.toUpperCase())+' · '+fz(i.size),text:i=>i.ext,open:preview,edit:id=>details(fnd(id)),
 chips:()=>{const s=S_();return `<i class="lb">${s.items.length} files</i><i class="lb">${s.folders.length} folders</i><i class="lb">${fz(tot())}</i><i class="lb">🗑 ${s.trash.length}</i>`},
 onReset:()=>{gct=0;FS.sel=[]},
 tree:()=>{const s=S_(),c=cur(),dr=t=>`ondragover="event.preventDefault()" ondrop="SRC.fx.dp(event,'${t}')"`,ch=p=>s.folders.filter(f=>(f.parent||'')===p).map(f=>`<div style="padding-left:12px"><button class="g tb${!FS.trash&&c===f.id?' on':''}" onclick="SRC.fx.cd('${f.id}')" ${dr(f.id)}><span style="color:${E(f.color)}">${E(f.emoji||'■')}</span> ${E(f.name)}</button><button class="g" style="padding:2px 6px" onclick="SRC.fEdit('fs','${f.id}')">✎</button>${ch(f.id)}</div>`).join('');return `<button class="g tb${!FS.trash&&!c?' on':''}" onclick="SRC.fx.cd('')" ${dr('')}>🖥 This vault</button>`+ch('')+`<div style="margin-top:8px"><button class="g tb${FS.trash?' on':''}" onclick="SRC.fx.trashV()">🗑 Trash (${s.trash.length})</button></div>`},
 manager:()=>`<div style="display:grid;grid-template-columns:210px 1fr;gap:12px"><div class="card" id="tr-m:fs" style="overflow:auto;max-height:74vh">${NS.libs.fs.tree()}</div><div style="min-width:0"><div class="row" id="fx-nav"></div>${U.ctl('fs','m:fs')}<div class="row" id="fx-bar"></div><div style="display:flex;gap:10px"><div id="sl-m:fs" data-sl="m:fs" style="flex:1;min-width:0;max-height:62vh;overflow:auto" ondragover="event.preventDefault()" ondrop="SRC.fx.dp(event,'__cur')" oncontextmenu="SRC.fx.ctx(event,'')"></div><div id="fx-pp" class="card" style="width:230px;display:none"></div></div></div></div>`,
 paintList:(el,inst,g,u,mgr)=>{const q=(SQ[inst]||'').toLowerCase(),cf=u.folder||'',dir=!q,gs=g.map(([n,a])=>[n,dir?a.filter(i=>(i.folder||'')===cf):a]).filter(x=>x[1].length),showF=!u.group&&!u.f_type&&!u.label&&!u.fav,fl=showF?S_().folders.filter(f=>q?f.name.toLowerCase().includes(q):(f.parent||'')===cf):[];
  if(mgr){FS.ord=[];if(FS.trash)trashV(el);else{const v=u.view||'grid',h=[];if(!u.group){const os=[...fl.map(f=>({f})),...(gs[0]?gs[0][1]:[]).map(i=>({i}))];h.push(os.length?blk(os,v):'')}else gs.forEach(([n,a])=>h.push(`<h4 style="margin:10px 0 4px">${E(n)} <small style="color:var(--mu)">(${a.length})</small></h4>`+blk(a.map(i=>({i})),v)));el.innerHTML=h.join('')||'<div style="color:var(--mu);padding:18px;text-align:center">This folder is empty. Use the Add tab or drag files here.</div>';thumbs(el)}meta();return}
  const v=u.view==='list'?'list':'grid',f0=fld(cf),h=[];if(!q&&!u.group)h.push(`<div class="row" style="margin-bottom:6px"><button class="g" onclick="SRC.st('${inst}','folder','${f0?f0.parent||'':''}')" ${cf?'':'disabled'}>↑ Up</button><small style="color:var(--mu)">${E(fp('fs',cf)||'This vault')}</small></div>`);
  if(!u.group)h.push(`<div class="${v==='list'?'scl':'scg'}">${[...fl.map(f=>({f})),...(gs[0]?gs[0][1]:[]).map(i=>({i}))].map(o=>ov(o,inst,v)).join('')}</div>`);else gs.forEach(([n,a])=>h.push(`<h4 style="margin:10px 0 4px">${E(n)}</h4><div class="${v==='list'?'scl':'scg'}">${a.map(i=>ov({i},inst,v)).join('')}</div>`));
  el.innerHTML=h.join('')||'<div style="color:var(--mu);padding:18px;text-align:center">Nothing here yet.</div>'},
 add:()=>`<div class="grid scm"><div class="card" style="grid-column:1/-1"><h3>Add files or folders</h3><div id="fa_dz" class="fdz" ondragover="event.preventDefault();this.classList.add('hot')" ondragleave="this.classList.remove('hot')" ondrop="SRC.fx.drop(event)">Drag files or whole folders here from Windows Explorer</div><div class="row" style="margin-top:8px"><button onclick="document.getElementById('fa_f').click()">Add files</button><button class="g" onclick="document.getElementById('fa_d').click()">Add folder</button><button class="g" onclick="SRC.fEdit('fs')">＋ New folder</button><input type="file" id="fa_f" multiple hidden onchange="SRC.fx.pick(this)"><input type="file" id="fa_d" webkitdirectory hidden onchange="SRC.fx.pick(this)"><label style="margin:0;flex:1">Destination folder ${fsel('fs','','fa_dest')}</label></div></div><div class="card" style="grid-column:1/-1"><h3>Ready to add <span id="fa_n"></span></h3><div id="fa_bar"></div><div id="fa_list" style="max-height:50vh;overflow:auto"></div><datalist id="dl-fs">${labsOf('fs').map(l=>`<option value="${E(l)}">`).join('')}</datalist></div></div>`};
NS.gc=()=>{gct=0;gc()};const _rf=NS.refresh;NS.refresh=()=>{_rf();if($i('fa_list'))stg();gc()};
document.head.insertAdjacentHTML('beforeend','<style>.fsd{width:100%;border-collapse:collapse}.fsd td,.fsd th{padding:4px 8px;border-bottom:1px solid var(--bd);text-align:left;font-size:.88rem;vertical-align:middle}.fsd th{color:var(--mu);font-weight:400}.fsd tr.sel{background:#0d1330}.fsd tbody tr{cursor:pointer}.fsd svg{vertical-align:middle}.fdz{border:2px dashed var(--bd);border-radius:12px;padding:34px;text-align:center;color:var(--mu)}.fdz.hot{border-color:var(--navy2);background:#0d1330}.scg.big{grid-template-columns:repeat(auto-fill,minmax(130px,1fr))}.scg.sm{grid-template-columns:repeat(auto-fill,minmax(190px,1fr))}.fth{width:100%;height:84px;object-fit:cover;border-radius:6px}.fxm{position:fixed;z-index:20;background:#0d0d13;border:1px solid var(--bd);border-radius:8px;padding:4px;min-width:170px}.fxm button{display:block;width:100%;text-align:left;border:0;background:none}.fxm button:hover{background:var(--navy2)}.fxc a{color:#6a8cff}</style>');
})();

/* ===================== v11 SOURCES CENTRE — PART 3 (p3): YT VIDEOS / PLAYLISTS ===================== */
(function(){
const NS=window.SRC,U=NS.u,{E,SR,sv,modal,fsel,fp,labsOf}=U,$i=id=>document.getElementById(id),YX=NS.yx={};
const S_=()=>SR().yt,find=id=>S_().items.find(i=>i.id===id),lb=t=>[...new Set((t||'').split(',').map(x=>x.trim()).filter(Boolean))];
const ST={to:'To watch',watching:'Watching',done:'Done'},ID11=/^[\w-]{11}$/,PLID=/^[\w-]{10,64}$/,OPEN=new Set();
let YE={id:'',vids:[]},BS=[];
const ttl=i=>i.t||((i.kind==='p'?'Playlist ':'Video ')+i.yid),url=(k,id)=>k==='p'?'https://www.youtube.com/playlist?list='+id:'https://www.youtube.com/watch?v='+id;
/* ---- link parsing: watch?v=, youtu.be/, shorts/, embed/, live/, playlist?list= ---- */
function parse(t){t=(t||'').trim();if(!t)return null;if(!/^https?:\/\//i.test(t))t='https://'+t;let x;try{x=new URL(t)}catch(e){return null}
 const h=x.hostname.replace(/^(www|m|music)\./,''),l=x.searchParams.get('list'),v=x.searchParams.get('v'),p=x.pathname.split('/').filter(Boolean);
 if(h==='youtu.be')return ID11.test(p[0]||'')?{kind:'v',id:p[0]}:null;
 if(h!=='youtube.com'&&h!=='youtube-nocookie.com')return null;
 if(p[0]==='playlist'||(p[0]==='embed'&&p[1]==='videoseries'))return l&&PLID.test(l)?{kind:'p',id:l}:null;
 if(p[0]==='watch'){if(v&&ID11.test(v))return{kind:'v',id:v};return l&&PLID.test(l)?{kind:'p',id:l}:null}
 if(['shorts','embed','live','v'].includes(p[0]))return ID11.test(p[1]||'')?{kind:'v',id:p[1]}:null;return null}
const mk=o=>({id:U.uid(),kind:o.kind,yid:o.yid,u:url(o.kind,o.yid),t:o.t||'',creator:o.creator||'',d:o.d||'',labels:o.labels||[],folder:o.folder||'',fav:!!o.fav,icon:o.icon||'',notes:o.notes||'',status:o.status||'to',vids:o.vids||[],added:Date.now(),opened:0,count:0});
/* ---- best-effort metadata: oEmbed, then noembed fallback ---- */
async function jf(u){const c=new AbortController(),t=setTimeout(()=>c.abort(),7000);try{const r=await fetch(u,{signal:c.signal});if(!r.ok)throw 0;return await r.json()}finally{clearTimeout(t)}}
async function meta(u){for(const b of['https://www.youtube.com/oembed?format=json&url=','https://noembed.com/embed?url='])try{const j=await jf(b+encodeURIComponent(u));if(j&&j.title&&!j.error)return{t:j.title,creator:j.author_name||''}}catch(e){}return null}
async function pool(a,n,f){let i=0;await Promise.all(Array.from({length:Math.min(n,a.length)},async()=>{while(i<a.length)await f(a[i++])}))}
/* ---- playlist contents via hidden IFrame Player (no API key) ---- */
let apiP;const api=()=>apiP||(apiP=new Promise((res,rej)=>{if(window.YT&&YT.Player)return res();const s=document.createElement('script'),pr=window.onYouTubeIframeAPIReady;s.src='https://www.youtube.com/iframe_api';window.onYouTubeIframeAPIReady=()=>{pr&&pr();res()};s.onerror=()=>{apiP=0;rej(new Error('blocked'))};document.head.appendChild(s);setTimeout(()=>{if(!(window.YT&&YT.Player)){apiP=0;rej(new Error('timeout'))}},10000)}));
const plIds=pid=>api().then(()=>new Promise((res,rej)=>{const d=document.createElement('div'),i=document.createElement('div');d.style.cssText='position:fixed;left:-9999px;top:0;width:200px;height:120px;overflow:hidden';d.appendChild(i);document.body.appendChild(d);let done=0,p,to;
 const fin=(v,er)=>{if(done)return;done=1;clearTimeout(to);try{p&&p.destroy()}catch(e){}d.remove();er?rej(er):res(v)};to=setTimeout(()=>fin(0,new Error('timeout')),14000);
 try{p=new YT.Player(i,{height:'120',width:'200',playerVars:{listType:'playlist',list:pid},events:{onReady:()=>{let n=0;(function poll(){let a;try{a=p.getPlaylist()}catch(x){}if(a&&a.length)return fin(a);if(++n>24)return fin(0,new Error('empty'));setTimeout(poll,400)})()},onError:()=>fin(0,new Error('error'))}})}catch(e){fin(0,e)}}));
async function fetchVids(pid,old,onp){const ids=await plIds(pid);if(!ids.length)throw new Error('empty');const m=Object.fromEntries((old||[]).map(v=>[v.id,v])),vids=ids.map(i=>m[i]||{id:i,title:'',creator:''});let n=0;
 await pool(vids,4,async v=>{if(!v.title){const r=await meta(url('v',v.id));if(r){v.title=r.t;v.creator=r.creator}}onp&&onp(++n,vids.length)});return vids}
YX.load=async(id,quiet)=>{const it=find(id);if(!it||it.kind!=='p')return;if(!quiet)modal('<h3>Loading playlist videos…</h3><progress id="yl_p" style="width:100%"></progress><small id="yl_s" style="color:var(--mu)">Asking YouTube for the playlist…</small>',null,420);
 try{it.vids=await fetchVids(it.yid,it.vids,(n,t)=>{const p=$i('yl_p'),s=$i('yl_s');if(p){p.max=t;p.value=n}if(s)s.textContent=n+' / '+t+' videos';else if(quiet)toast('Playlist videos '+n+' / '+t)});if(!quiet)U.closeM();sv('yt');toast(it.vids.length+' videos loaded')}
 catch(e){if(!quiet)U.closeM();toast('Could not load the playlist automatically');YX.edit(id,1)}};
/* ---- forms ---- */
const fields=(i,p)=>`<label>Title<input id="${p}t" value="${E(i.t||'')}" placeholder="Auto-filled when possible"></label><label>Creator / channel<input id="${p}c" list="dl-ytc" value="${E(i.creator||'')}"></label><label>Description<textarea id="${p}d" rows="2">${E(i.d||'')}</textarea></label><label>Labels (comma separated)<input id="${p}l" list="dl-yt" value="${E((i.labels||[]).join(', '))}"></label><label>Folder ${fsel('yt',i.folder,p+'f')}</label><label>Emoji icon (type or paste any emoji)<input id="${p}e" value="${E(i.icon||'')}" placeholder="Press Win + . to open the Windows emoji panel" oninput="document.getElementById('${p}pv').textContent=SRC.u.emo(this.value)"><span id="${p}pv" style="font-size:1.6rem">${E(i.icon||'')}</span></label><label>Watch status<select id="${p}st">${Object.keys(ST).map(k=>`<option value="${k}"${(i.status||'to')===k?' selected':''}>${ST[k]}</option>`).join('')}</select></label><label>Personal notes<textarea id="${p}n" rows="2">${E(i.notes||'')}</textarea></label><label><input type="checkbox" id="${p}s" ${i.fav?'checked':''}> Favourite</label><datalist id="dl-yt">${labsOf('yt').map(l=>`<option value="${E(l)}">`).join('')}</datalist><datalist id="dl-ytc">${[...new Set(S_().items.map(i=>i.creator).filter(Boolean))].map(c=>`<option value="${E(c)}">`).join('')}</datalist>`;
const rd=p=>({t:val(p+'t'),creator:val(p+'c'),d:val(p+'d'),labels:lb(val(p+'l')),folder:$i(p+'f').value,icon:U.emo(val(p+'e')),status:$i(p+'st').value,notes:val(p+'n'),fav:$i(p+'s').checked});
const thumb=p=>p.kind==='v'?'https://img.youtube.com/vi/'+p.id+'/hqdefault.jpg':'';
const prev=p=>`<div class="row" style="margin:6px 0"><span class="yt-th"><span class="yt-bg">${p.kind==='p'?'📚':'🎬'}</span>${thumb(p)?`<img src="${thumb(p)}" alt="" onerror="this.style.display='none'">`:''}</span><span><b>${p.kind==='p'?'Playlist':'Video'}</b> detected<br><small style="color:var(--mu)">ID ${E(p.id)}</small></span></div>`;
let dtm;YX.det=()=>{clearTimeout(dtm);dtm=setTimeout(()=>{const p=parse(val('ya_u')),pv=$i('ya_pv');if(!pv)return;if(!p){pv.innerHTML=val('ya_u')?'<small style="color:#e04646">Not a recognised YouTube video or playlist link.</small>':'';return}pv.innerHTML=prev(p);if(S_().ui.auto!==0&&!val('ya_t'))YX.fetch()},350)};
YX.fetch=async force=>{const p=parse(val('ya_u')),st=$i('ya_ms');if(!p)return toast('Enter a valid YouTube link');st.textContent='Fetching…';const m=await meta(url(p.kind,p.id));if(!$i('ya_t'))return;
 if(m){if(force||!val('ya_t'))$i('ya_t').value=m.t;if(force||!val('ya_c'))$i('ya_c').value=m.creator;st.textContent='Fetched. You can still edit both.'}else st.textContent='Could not fetch (offline or blocked). Type the title and creator by hand.'};
YX.add=()=>{const p=parse(val('ya_u'));if(!p)return toast('Enter a valid YouTube video or playlist link');const s=S_(),ex=s.items.find(i=>i.kind===p.kind&&i.yid===p.id);if(ex&&!confirm('Already saved as “'+ttl(ex)+'”. Add anyway?'))return;
 const it=mk({...rd('ya_'),kind:p.kind,yid:p.id});s.items.push(it);sv('yt');toast((p.kind==='p'?'Playlist':'Video')+' added');if(p.kind==='p'&&s.ui.autopl!==0)YX.load(it.id,1);go('src')};
/* ---- bulk staging ---- */
YX.stage=()=>{let bad=0;$i('yb_t').value.split('\n').map(x=>x.trim()).filter(Boolean).forEach(l=>{const p=parse(l);if(!p)return bad++;if(!BS.some(x=>x.kind===p.kind&&x.yid===p.id))BS.push({kind:p.kind,yid:p.id,t:'',creator:''})});$i('yb_t').value='';if(bad)toast(bad+' line(s) skipped: not a YouTube link');bsR();YX.bfetch()};
YX.bfetch=async()=>{if(S_().ui.auto===0)return;const td=BS.filter(x=>!x.t&&!x.fx);BS.forEach(x=>x.fx=1);await pool(td,4,async x=>{const m=await meta(url(x.kind,x.yid));if(m){x.t=m.t;x.creator=m.creator}bsR()})};
YX.bs=(i,k,v)=>{BS[i][k]=v};YX.bx=i=>{BS.splice(i,1);bsR()};YX.bclr=()=>{BS=[];bsR()};
YX.bcommit=()=>{if(!BS.length)return;const s=S_(),l=lb(val('yb_l')),f=$i('yb_f').value,st=$i('yb_s').value,all=BS.splice(0),pl=[];all.forEach(x=>{const it=mk({kind:x.kind,yid:x.yid,t:x.t,creator:x.creator,labels:l,folder:f,status:st});s.items.push(it);if(it.kind==='p')pl.push(it.id)});sv('yt');toast(all.length+' added');go('src');
 if(s.ui.autopl!==0)(async()=>{for(const id of pl)await YX.load(id,1)})()};
function bsR(){const l=$i('yb_list');if(!l)return;const sig=BS.map(x=>x.kind+x.yid).join();
 if(l.dataset.sig===sig){BS.forEach((x,i)=>[['t','t'],['c','creator']].forEach(([a,k])=>{const e=$i('yb_'+a+i);if(e&&e!==document.activeElement)e.value=x[k]}));return}
 l.dataset.sig=sig;l.innerHTML=BS.length?`<table class="fsd scm">${BS.map((x,i)=>`<tr><td>${x.kind==='p'?'📚':'🎬'}</td><td><input id="yb_t${i}" value="${E(x.t)}" placeholder="Title (${E(x.yid)})" oninput="SRC.yx.bs(${i},'t',this.value)"></td><td><input id="yb_c${i}" list="dl-ytc" value="${E(x.creator)}" placeholder="Creator" oninput="SRC.yx.bs(${i},'creator',this.value)"></td><td><button class="x" onclick="SRC.yx.bx(${i})">✕</button></td></tr>`).join('')}</table>`:'<small style="color:var(--mu)">Nothing staged yet.</small>';
 const b=$i('yb_bar');if(b)b.innerHTML=BS.length?`<div class="row" style="margin-top:8px"><button onclick="SRC.yx.bcommit()">Add ${BS.length} link(s)</button><button class="g" onclick="SRC.yx.bclr()">Clear</button></div>`:''}
/* ---- edit dialog (incl. playlist video list) ---- */
const rv=()=>{const e=$i('ye_v');if(e)e.innerHTML=YE.vids.map((v,i)=>`<div class="row" style="margin:3px 0;flex-wrap:nowrap"><small style="width:22px;color:var(--mu)">${i+1}</small><input value="${E(v.title)}" placeholder="Title (${E(v.id)})" oninput="SRC.yx.rvs(${i},'title',this.value)" style="flex:2"><input value="${E(v.creator)}" placeholder="Creator" oninput="SRC.yx.rvs(${i},'creator',this.value)" style="flex:1"><button class="x" onclick="SRC.yx.rvd(${i})">✕</button></div>`).join('')||'<small style="color:var(--mu)">No videos loaded yet.</small>'};
YX.rvs=(i,k,v)=>{YE.vids[i][k]=v};YX.rvd=i=>{YE.vids.splice(i,1);rv()};
YX.edit=(id,fail)=>{const it=find(id);if(!it)return;YE={id,vids:JSON.parse(JSON.stringify(it.vids||[]))};
 modal(`<h3>Edit ${it.kind==='p'?'playlist':'video'}</h3>${fail?'<p style="color:#e04646">Couldn’t load the playlist automatically (offline, blocked or private). Paste the video links in the box below and press “Resolve pasted links”, or type titles by hand.</p>':''}<label>Link<input value="${E(it.u)}" readonly></label><div class="row"><button class="g" onclick="SRC.yx.refetchE()">Re-fetch title &amp; creator</button><small id="ye_ms" style="color:var(--mu)"></small></div>${fields(it,'ye_')}${it.kind==='p'?`<h4>Playlist videos <small style="color:var(--mu)">(titles and creators are editable)</small></h4><div class="row"><button class="g" onclick="SRC.yx.loadE()">Load videos</button><progress id="ye_pb" style="display:none"></progress><small id="ye_ps" style="color:var(--mu)"></small></div><div id="ye_v" style="max-height:220px;overflow:auto"></div><label>Manual fallback: paste video links, one per line<textarea id="ye_m" rows="3"></textarea></label><button class="g" onclick="SRC.yx.man()">Resolve pasted links</button>`:''}<div class="row" style="margin-top:10px"><button onclick="SRC.yx.save('${id}')">Save</button><button class="g" onclick="SRC.close()">Cancel</button></div>`,null,660);if(it.kind==='p')rv()};
YX.refetchE=async()=>{const it=find(YE.id),st=$i('ye_ms');st.textContent='Fetching…';const m=await meta(it.u);if(!$i('ye_t'))return;if(m){$i('ye_t').value=m.t;$i('ye_c').value=m.creator;st.textContent='Fetched.'}else st.textContent='Could not fetch. Edit by hand.'};
const pgs=(n,t)=>{const p=$i('ye_pb'),s=$i('ye_ps');if(p){p.style.display='';p.max=t;p.value=n}if(s)s.textContent=n+' / '+t};
YX.loadE=async()=>{const it=find(YE.id);if(!$i('ye_ps'))return;$i('ye_ps').textContent='Asking YouTube…';try{YE.vids=await fetchVids(it.yid,YE.vids,(n,t)=>{pgs(n,t);if(n===t||n%4===0)rv()});rv();if($i('ye_ps'))$i('ye_ps').textContent=YE.vids.length+' videos loaded'}catch(e){if($i('ye_ps'))$i('ye_ps').innerHTML='<span style="color:#e04646">Could not load automatically. Use the manual paste box below.</span>'}};
YX.man=async()=>{const m=$i('ye_m');if(!m)return;const ids=[...new Set(m.value.split('\n').map(parse).filter(p=>p&&p.kind==='v').map(p=>p.id))];if(!ids.length)return toast('No valid video links found');const have=new Set(YE.vids.map(v=>v.id)),nw=ids.filter(i=>!have.has(i)).map(id=>({id,title:'',creator:''}));YE.vids.push(...nw);m.value='';rv();let n=0;await pool(nw,4,async v=>{const r=await meta(url('v',v.id));if(r){v.title=r.t;v.creator=r.creator}pgs(++n,nw.length)});rv()};
YX.save=id=>{const it=find(id);if(!it)return;Object.assign(it,rd('ye_'));if(it.kind==='p')it.vids=YE.vids.filter(v=>v.id);U.closeM();sv('yt')};
YX.stat=(id,v)=>{const it=find(id);if(it){it.status=v;sv('yt')}};
YX.opt=(k,v)=>{S_().ui[k]=v?1:0;save()};
/* ---- in-app player ---- */
YX.play=(id,vid)=>{const it=find(id);if(!it)return;it.opened=Date.now();it.count=(it.count||0)+1;sv('yt');const pl=it.kind==='p',vv=vid||(pl?'':it.yid),cur=pl&&vid?(it.vids||[]).find(v=>v.id===vid):null,
 src=vv?`https://www.youtube-nocookie.com/embed/${vv}?autoplay=1&rel=0${pl?'&list='+it.yid:''}`:`https://www.youtube-nocookie.com/embed/videoseries?list=${it.yid}`,
 yt=vv?`https://www.youtube.com/watch?v=${vv}${pl?'&list='+it.yid:''}`:url('p',it.yid),file=location.protocol==='file:';
 modal(`<div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div style="min-width:0"><h3 style="margin:0">${E(cur&&cur.title||ttl(it))}</h3><small style="color:var(--mu)">${E((cur&&cur.creator)||it.creator||'')}</small></div><span style="white-space:nowrap"><a href="${yt}" target="_blank" rel="noopener noreferrer"><button>Open on YouTube</button></a> <button class="g" onclick="SRC.close()">Close</button></span></div><br>${file?'<div class="card" style="text-align:center;padding:30px"><p>Playback blocked here — open on YouTube, or run the file from a local server.</p><small style="color:var(--mu)">YouTube often refuses embeds for pages opened from file://.</small></div>':`<div style="aspect-ratio:16/9;background:#000;border-radius:8px;overflow:hidden"><iframe src="${src}" style="width:100%;height:100%;border:0" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div><small style="color:var(--mu)">If the video doesn’t play here (offline or embedding blocked), use “Open on YouTube”.</small>`}`,null,880)};
YX.tg=(b,id)=>{const d=b.nextElementSibling;if(!d)return;const o=d.style.display!=='block';d.style.display=o?'block':'none';o?OPEN.add(id):OPEN.delete(id)};
/* ---- card pieces ---- */
const ico=i=>{const p=i.kind==='p'?(i.vids&&i.vids[0]?{kind:'v',id:i.vids[0].id}:{kind:'p'}):{kind:'v',id:i.yid},e=E(i.icon||(i.kind==='p'?'📚':'🎬'));return `<span class="yt-th"><span class="yt-bg">${e}</span>${p.kind==='v'?`<img loading="lazy" src="${thumb(p)}" alt="" onerror="this.style.display='none'">`:''}<b class="yt-e">${e}</b></span>`};
const extra=(i,mgr)=>`<span class="yx" onclick="event.stopPropagation()" ondblclick="event.stopPropagation()"><i class="lb yst-${i.status||'to'}">${ST[i.status||'to']}</i>${i.kind==='p'?'<i class="lb">Playlist</i>':''}${mgr?`<select title="Watch status" onchange="SRC.yx.stat('${i.id}',this.value)" style="width:auto;padding:1px 4px">${Object.keys(ST).map(k=>`<option value="${k}"${(i.status||'to')===k?' selected':''}>${ST[k]}</option>`).join('')}</select>`:''}${i.kind==='p'?((i.vids||[]).length?`<button class="g" onclick="SRC.yx.tg(this,'${i.id}')">▾ ${i.vids.length} videos</button><span class="ydd" style="display:${OPEN.has(i.id)?'block':'none'}">${i.vids.map(v=>`<div class="ydr" onclick="SRC.yx.play('${i.id}','${E(v.id)}')"><b>${E(v.title||v.id)}</b><small>${E(v.creator||'')}</small></div>`).join('')}</span>`:(mgr?`<button class="g" onclick="SRC.yx.load('${i.id}')">Load videos</button>`:'')):''}</span>`;
NS.libs.yt={name:'YT library',title:ttl,
 sorts:[['t','Title',(a,b)=>ttl(a).localeCompare(ttl(b))],['creator','Creator',(a,b)=>(a.creator||'').localeCompare(b.creator||'')],['added','Date added',(a,b)=>a.added-b.added],['opened','Last opened',(a,b)=>(a.opened||0)-(b.opened||0)],['status','Status',(a,b)=>Object.keys(ST).indexOf(a.status||'to')-Object.keys(ST).indexOf(b.status||'to')],['fav','Favourite',(a,b)=>(b.fav?1:0)-(a.fav?1:0)],['ord','Manual',()=>0]],
 groups:[['','No grouping'],['folder','Folder',i=>[fp('yt',i.folder)||'Unfiled']],['creator','Creator',i=>[i.creator||'Unknown creator']],['label','Label',i=>i.labels&&i.labels.length?i.labels:['No label']],['status','Status',i=>[ST[i.status||'to']]],['type','Type',i=>[i.kind==='p'?'Playlists':'Videos']]],
 filters:[['type','Type',[['v','Videos'],['p','Playlists']]],['status','Status',Object.keys(ST).map(k=>[k,ST[k]])]],fil:(i,f,v)=>f==='type'?i.kind===v:(i.status||'to')===v,
 ico,extra,sub:i=>E(i.creator||'—')+(i.kind==='p'?' · '+(i.vids||[]).length+' videos':'')+(i.count?' · opened '+i.count+'×':''),
 text:i=>[i.creator,i.notes,i.kind==='p'?'playlist':'video',ST[i.status||'to'],...(i.vids||[]).map(v=>v.title+' '+v.creator)].join(' '),
 open:i=>YX.play(i.id),edit:id=>YX.edit(id),
 chips:()=>{const a=S_().items,r=a.filter(i=>i.opened).sort((x,y)=>y.opened-x.opened)[0];return `<i class="lb">${a.filter(i=>i.kind==='v').length} videos</i><i class="lb">${a.filter(i=>i.kind==='p').length} playlists</i><i class="lb">${a.filter(i=>i.fav).length} ★</i><i class="lb">${a.filter(i=>i.status==='done').length} done</i>${r?`<i class="lb">recent: ${E(ttl(r))}</i>`:''}`},
 settings:()=>{const u=S_().ui;return `<div class="card scm"><h3>YouTube options</h3><label><input type="checkbox" ${u.auto!==0?'checked':''} onchange="SRC.yx.opt('auto',this.checked)"> Auto-fetch title and creator when adding</label><label><input type="checkbox" ${u.autopl!==0?'checked':''} onchange="SRC.yx.opt('autopl',this.checked)"> Load a playlist’s videos automatically when it is added</label><small style="color:var(--mu)">Fetching is best-effort (YouTube oEmbed, then noembed.com). Offline, nothing is sent and you can type everything by hand.</small></div>`},
 add:()=>`<div class="grid scm"><div class="card"><h3>Add a YouTube video or playlist</h3><label>YouTube link<input id="ya_u" placeholder="https://www.youtube.com/watch?v=…  ·  youtu.be/…  ·  playlist?list=…" oninput="SRC.yx.det()"></label><div id="ya_pv"></div><div class="row"><button class="g" onclick="SRC.yx.fetch(1)">Re-fetch</button><small id="ya_ms" style="color:var(--mu)">Title and creator fill in automatically when possible and stay editable.</small></div>${fields({},'ya_')}<div class="row" style="margin-top:10px"><button onclick="SRC.yx.add()">Add</button><button class="g" onclick="SRC.fEdit('yt')">＋ New folder</button></div></div><div class="card"><h3>Bulk paste (one link per line)</h3><textarea id="yb_t" rows="6" placeholder="https://youtu.be/…&#10;https://www.youtube.com/playlist?list=…"></textarea><div class="row" style="margin:6px 0"><button onclick="SRC.yx.stage()">Review links</button></div><label>Labels for all (comma separated)<input id="yb_l" list="dl-yt"></label><label>Folder for all ${fsel('yt','','yb_f')}</label><label>Status for all<select id="yb_s">${Object.keys(ST).map(k=>`<option value="${k}">${ST[k]}</option>`).join('')}</select></label><div id="yb_list" style="max-height:44vh;overflow:auto;margin-top:8px"></div><div id="yb_bar"></div></div></div>`};
const _rf=NS.refresh;NS.refresh=()=>{_rf();if($i('yb_list'))bsR()};
document.head.insertAdjacentHTML('beforeend','<style>.yt-th{position:relative;display:inline-block;width:152px;height:86px;border-radius:8px;overflow:hidden;background:#0b1233;flex:none}.sc.l .yt-th{width:76px;height:43px}.yt-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2rem}.sc.l .yt-bg{font-size:1.2rem}.yt-th img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.yt-e{position:absolute;right:3px;bottom:3px;background:#000a;border-radius:6px;padding:0 4px;font-size:.9rem;font-weight:400}.sc.l .yt-e{display:none}.yx{position:relative;display:flex;gap:4px;flex-wrap:wrap;align-items:center}.ydd{position:absolute;z-index:7;left:0;top:100%;min-width:240px;max-width:340px;max-height:220px;overflow:auto;background:#0d0d13;border:1px solid var(--bd);border-radius:8px;padding:4px}.ydr{padding:4px 6px;border-radius:6px;cursor:pointer;display:flex;flex-direction:column}.ydr:hover{background:var(--navy2)}.ydr small{color:var(--mu)}.yst-watching{color:#e0a030;border-color:#e0a030}.yst-done{color:#2fa86a;border-color:#2fa86a}</style>');
})();

/* ===================== v11 SOURCES CENTRE — DEMO DATA (first vault auto-seeded; "Load sample data" in each library's Settings) ===================== */
(function(){
const NS=window.SRC,U=NS.u,{uid,SR}=U,DAY=864e5,now=()=>Date.now();
const fo=(s,name,emoji,color,parent,desc)=>{const f={id:uid(),name,desc:desc||'',color,emoji,parent:parent||''};s.folders.push(f);return f.id};
function loadWeb(v){const s=SR(v).web,A=fo(s,'Study','📚','#2f55d4',0,'Learning resources'),T=fo(s,'Dev tools','🛠','#2fa86a',0,'Documentation and utilities'),N=fo(s,'Reference','📖','#e0a030'),M=fo(s,'Media & news','📰','#e04646');
 [['https://en.wikipedia.org/','Wikipedia','Free encyclopedia',['reference','general'],N,1,'📖'],['https://www.khanacademy.org/','Khan Academy','Free lessons in maths, science and more',['maths','science','learning'],A,1,'🎓'],['https://www.coursera.org/','Coursera','Online courses from universities',['courses','learning'],A,0],['https://ocw.mit.edu/','MIT OpenCourseWare','Free MIT course materials',['courses','science'],A,1,'🏛'],['https://developer.mozilla.org/','MDN Web Docs','HTML, CSS and JavaScript reference',['web','docs'],T,1,'🦊'],['https://docs.python.org/3/','Python docs','Official Python documentation',['python','docs'],T,0,'🐍'],['https://github.com/','GitHub','Code hosting and collaboration',['code','tools'],T,1],['https://stackoverflow.com/','Stack Overflow','Programming Q&A',['code','help'],T,0],['https://www.wolframalpha.com/','Wolfram Alpha','Computational knowledge engine',['maths','tools'],N,0,'🧮'],['https://scholar.google.com/','Google Scholar','Search scholarly papers',['research','reference'],N,1,'🔬'],['https://www.bbc.com/news','BBC News','World news',['news'],M,0],['https://www.nature.com/','Nature','Science journal and news',['science','news'],M,0]].forEach((x,i)=>{
  s.items.push({id:uid(),t:x[1],u:x[0],d:x[2],labels:x[3],folder:x[4],fav:!!x[5],icon:x[6]||'',color:['#0b2a6f','#7a1f2b','#1f6f4a','#6b3fa0','#8a5a12'][i%5],note:'',added:now()-i*DAY*2,opened:i%3?0:now()-i*3600e3,count:i%3?0:i+1})})}
function loadYT(v){const s=SR(v).yt,A=fo(s,'Music','🎵','#9b59d0',0,'Demo music videos'),B=fo(s,'Classics','📼','#e0a030'),C=fo(s,'Playlists','📚','#2f55d4');
 const V=[['dQw4w9WgXcQ','Never Gonna Give You Up','Rick Astley'],['fJ9rUzIMcZQ','Bohemian Rhapsody','Queen'],['kJQP7kiw5Fk','Despacito','Luis Fonsi'],['9bZkp7q19f0','GANGNAM STYLE','PSY'],['YQHsXMglC9A','Hello','Adele'],['60ItHLz5WEA','Faded','Alan Walker'],['RgKAFK5djSk','See You Again','Wiz Khalifa'],['jNQXAC9IJRE','Me at the zoo','jawed']];
 const mk=(o,i)=>({id:uid(),kind:o.kind||'v',yid:o.yid,u:o.kind==='p'?'https://www.youtube.com/playlist?list='+o.yid:'https://www.youtube.com/watch?v='+o.yid,t:o.t,creator:o.creator||'',d:o.d||'',labels:o.labels||[],folder:o.folder||'',fav:!!o.fav,icon:o.icon||'',notes:o.notes||'',status:o.status||'to',vids:o.vids||[],added:now()-i*DAY,opened:o.op?now()-i*7200e3:0,count:o.op?2:0});
 const L=a=>a.map(x=>({id:x[0],title:x[1],creator:x[2]}));
 [{yid:V[0][0],t:V[0][1],creator:V[0][2],folder:B,labels:['classic','80s'],fav:1,icon:'🕺',status:'done',op:1,notes:'The original rickroll.'},{yid:V[1][0],t:V[1][1],creator:V[1][2],folder:B,labels:['rock','classic'],fav:1,icon:'🎸',status:'watching'},{yid:V[2][0],t:V[2][1],creator:V[2][2],folder:A,labels:['pop','latin'],icon:'💃'},{yid:V[3][0],t:V[3][1],creator:V[3][2],folder:A,labels:['pop','k-pop'],icon:'🐴',status:'done'},{yid:V[7][0],t:V[7][1],creator:V[7][2],folder:B,labels:['history','first-video'],icon:'🐘',d:'The first video ever uploaded to YouTube.',op:1},
  {kind:'p',yid:'PLDEMO0000000001',t:'Chart hits (demo playlist)',creator:'Demo Channel',folder:C,labels:['pop','playlist'],fav:1,icon:'🎧',status:'watching',d:'Sample playlist with a pre-filled video list.',vids:L([V[2],V[3],V[4],V[5],V[6]])},
  {kind:'p',yid:'PLDEMO0000000002',t:'Rock & classics (demo playlist)',creator:'Demo Channel',folder:C,labels:['rock','classic','playlist'],icon:'📚',vids:L([V[0],V[1]])}].forEach((o,i)=>s.items.push(mk(o,i)))}
function loadFS(v){const s=SR(v).fs,N=fo(s,'Notes','📝','#2f55d4',0,'Study notes'),P=fo(s,'Projects','💻','#4fb36b'),D=fo(s,'Data','📊','#e0742f'),I=fo(s,'Images','🖼','#9b59d0'),W=fo(s,'Week 1','🗓','#20b2c4',N);
 const svg=(c,t)=>`<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200"><rect width="320" height="200" fill="${c}"/><text x="160" y="110" font-size="30" fill="#fff" text-anchor="middle" font-family="sans-serif">${t}</text></svg>`;
 const F=[['study-plan.md',N,'text/markdown','# Study plan\n\n- Mon: Maths\n- Tue: Physics\n- Wed: Revision\n\n> Demo file created by PREPVAULT.',['plan','exam'],1,'Weekly study plan'],['formulas.txt',N,'text/plain','Quadratic: x = (-b ± √(b²-4ac)) / 2a\nArea of circle: πr²\nv = u + at',['maths','formulas'],1,'Formula sheet'],['lecture-1.md',W,'text/markdown','# Lecture 1\n\nIntroduction to the course.\n\n1. Limits\n2. Derivatives',['lecture','maths'],0,''],['lecture-2.md',W,'text/markdown','# Lecture 2\n\nIntegrals and applications.',['lecture','maths'],0,''],['hello.py',P,'text/x-python','def greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("PREPVAULT"))\n',['code','python'],0,'Tiny Python demo'],['index.html',P,'text/html','<!doctype html>\n<title>Demo</title>\n<h1>Hello from a stored file</h1>\n',['code','web'],0,''],['config.json',P,'application/json','{\n  "name": "demo",\n  "version": 1,\n  "tags": ["sample","json"]\n}\n',['code','json'],0,''],['scores.csv',D,'text/csv','student,maths,physics\nAsha,88,92\nRavi,75,81\nMeera,93,89\n',['data','marks'],1,'Sample marks'],['tasks.sql',D,'text/plain','SELECT id, title FROM tasks WHERE done = 0 ORDER BY id;\n',['data','sql'],0,''],['banner-blue.svg',I,'image/svg+xml',svg('#2f55d4','Blue banner'),['image','design'],0,''],['banner-red.svg',I,'image/svg+xml',svg('#c0392b','Red banner'),['image','design'],1,''],['logo.svg',I,'image/svg+xml',svg('#2fa86a','Logo'),['image'],0,'']];
 const bl=[];F.forEach((f,i)=>{const b=new Blob([f[3]],{type:f[2]}),id=uid();bl.push([v.id+':'+id,b]);s.items.push({id,t:f[0],d:f[6],labels:f[4],folder:f[1],fav:!!f[5],size:b.size,ext:f[0].split('.').pop(),mime:f[2],added:now()-i*DAY,opened:i%4?0:now()-i*3600e3})});
 const r=indexedDB.open('prepvault_files',1);r.onupgradeneeded=()=>r.result.createObjectStore('blobs');r.onsuccess=()=>{const t=r.result.transaction('blobs','readwrite'),st=t.objectStore('blobs');bl.forEach(x=>st.put(x[1],x[0]))}}
const LD={fs:loadFS,web:loadWeb,yt:loadYT},sync=v=>{const w=SR(v).web.items,f=w.filter(i=>i.fav);v.links=(f.length?f:w).slice(0,6).map(i=>({t:i.t,u:i.u}))};
function seed(){const v=S.vaults[0];if(!v)return;const s=SR(v);if(s.demo)return;s.demo=1;['fs','web','yt'].forEach(k=>{if(k==='web'||!s[k].items.length)LD[k](v)});sync(v);save()}
NS.demo=k=>{const v=V();if(!v)return;LD[k](v);if(k==='web')sync(v);save();NS.refresh();toast('Sample data added')};
['fs','web','yt'].forEach(k=>{const L=NS.libs[k],o=L.settings;L.settings=()=>(o?o():'')+`<div class="card"><h3>Sample data</h3><p style="color:var(--mu)">Adds demo folders and items to this library.</p><button class="g" onclick="SRC.demo('${k}')">Load sample data</button></div>`});
const _rf=NS.refresh;NS.refresh=()=>{seed();_rf()};
})();

/* ===== v11: Website library manual order ===== */
window.SRC.libs.web.sorts.push(['ord','Manual',()=>0]);

/* ===== v11.2: Planning centre horizontal tab bar ===== */
(function(){
const PLT=()=>[['plan','Overview'],...PS];
const bar=()=>`<div class="sw" role="tablist" aria-label="Planning centre sections" style="margin-bottom:12px">${PLT().map(t=>`<button role="tab" aria-selected="${tab===t[0]}" class="${tab===t[0]?'':'g'}" onclick="go('${t[0]}')">${t[1]}</button>`).join('')}</div>`;
const wrap=f=>function(){const r=f.apply(this,arguments);if(typeof r!=='string')return r;return r.indexOf('</h2>')>-1?r.replace('</h2>',()=>'</h2>'+bar()):bar()+r};
plan=wrap(plan);hj=wrap(hj);psub=wrap(psub);
})();

/* ===== v11.3: Appearance settings (theme, accent, font, size, shape, density, accessibility) ===== */
(function(){
const KEY='prepvault_appearance_v1';
const DEF={mode:'dark',accent:'#2f55d4',font:'system',size:100,rad:'default',dens:'default',lh:'default',motion:0,contrast:0};
const THEMES={
dark:{n:'Midnight',l:0,bg:'#050505',cd:'#0d0d13',bd:'#1d2340',tx:'#ececf1',mu:'#9a9ab0',inp:'#08080d',sid:'#070709',bar:'#12121c',hov:'#10101a',nt:'#1a1204',ntb:'#5a4210',sel:'#0d1330',s2:'#0a1024'},
black:{n:'Pure black',l:0,bg:'#000000',cd:'#08080b',bd:'#1c1c26',tx:'#f0f0f5',mu:'#9a9aae',inp:'#050507',sid:'#000000',bar:'#14141c',hov:'#101018',nt:'#16110a',ntb:'#4d3a12',sel:'#0b1026',s2:'#0b0b12'},
slate:{n:'Slate',l:0,bg:'#0f141c',cd:'#161d29',bd:'#2a3550',tx:'#e6ebf5',mu:'#93a0b8',inp:'#0d121a',sid:'#0b1017',bar:'#1d2636',hov:'#1b2433',nt:'#2a2410',ntb:'#6b5818',sel:'#18233d',s2:'#121a26'},
light:{n:'Light',l:1,bg:'#f4f5fa',cd:'#ffffff',bd:'#d3d8e6',tx:'#1a1f2e',mu:'#5a6478',inp:'#ffffff',sid:'#eceef6',bar:'#e1e5f0',hov:'#eef1fa',nt:'#fff6d6',ntb:'#e3c866',sel:'#e2e9fb',s2:'#eef0f7'}};
const FONTS={system:['System','system-ui,-apple-system,Segoe UI,Roboto,sans-serif'],clean:['Clean','"Helvetica Neue",Helvetica,Arial,sans-serif'],humanist:['Humanist','"Segoe UI",Candara,Optima,"Gill Sans",sans-serif'],readable:['Readable','Verdana,Tahoma,"Trebuchet MS",sans-serif'],easy:['Easy reading','OpenDyslexic,Lexend,"Atkinson Hyperlegible",Verdana,sans-serif'],serif:['Serif','Georgia,"Times New Roman",serif'],mono:['Monospace','ui-monospace,"SF Mono",Consolas,"Liberation Mono",monospace']};
const ACC=[['Royal blue','#2f55d4'],['Violet','#7b4fe0'],['Teal','#14a3a8'],['Green','#2fa86a'],['Amber','#d98a1f'],['Orange','#e0742f'],['Rose','#d6457a'],['Red','#d64545'],['Slate','#6b7a99']];
const LHS={compact:1.35,default:1.5,relaxed:1.75};
const RAD={sharp:[2,2],default:[12,8],round:[22,14]};
const DENS={compact:{m:14,c:10,t:4,b:'5px 10px'},default:null,spacious:{m:30,c:22,t:11,b:'10px 18px'}};
let A=Object.assign({},DEF);
try{const o=JSON.parse(localStorage.getItem(KEY));if(o&&typeof o==='object')Object.assign(A,o)}catch(e){}
const clean=()=>{if(!THEMES[A.mode]&&A.mode!=='auto')A.mode=DEF.mode;if(!/^#[0-9a-f]{6}$/i.test(A.accent))A.accent=DEF.accent;if(!FONTS[A.font])A.font=DEF.font;A.size=Math.max(80,Math.min(150,Math.round(+A.size)||100));if(!RAD[A.rad])A.rad='default';if(!(A.dens in DENS))A.dens='default';if(!LHS[A.lh])A.lh='default';A.motion=A.motion?1:0;A.contrast=A.contrast?1:0};
clean();
const h2=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const hx=a=>'#'+a.map(x=>Math.round(Math.max(0,Math.min(255,x))).toString(16).padStart(2,'0')).join('');
const mix=(a,b,t)=>{const x=h2(a),y=h2(b);return hx(x.map((v,i)=>v+(y[i]-v)*t))};
const mq=window.matchMedia?matchMedia('(prefers-color-scheme: light)'):null;
const resolved=()=>A.mode==='auto'?(mq&&mq.matches?'light':'dark'):A.mode;
function build(){
 const id=resolved(),T=Object.assign({},THEMES[id]),L=T.l,def=id==='dark'&&A.accent.toLowerCase()===DEF.accent;
 if(A.contrast){if(L){T.tx='#000000';T.mu='#262c3c';T.bd='#5c6682'}else{T.tx='#ffffff';T.mu='#cfd3e6';T.bd='#58648c'}}
 const ac=A.accent,navy2=ac,navy=L?mix(ac,'#ffffff',.82):mix(ac,'#000000',.5),glow=def?'#6a8cff':(L?mix(ac,'#000000',.15):mix(ac,'#ffffff',.35));
 const red=L?'#fbdada':'#410000',redb=L?'#e0a0a0':'#7a1a1a';
 let c=`:root{color-scheme:${L?'light':'dark'};--bg:${T.bg};--cd:${T.cd};--bd:${T.bd};--tx:${T.tx};--mu:${T.mu};--navy:${navy};--navy2:${navy2};--glow:${glow};--red:${red};--inp:${T.inp};--zm:${A.size/100}}
input,select,textarea{background:var(--inp)}.cal div,.tfs,.cres,.sc{background:var(--inp)}
aside{background:${T.sid}}.bar{background:${T.bar}}.amc:hover{background:${T.hov}}.note{background:${T.nt};border-color:${T.ntb}}
.sc.sel,.fsd tr.sel,.fdz.hot{background:${T.sel}}
.x,button.r,#toast{border-color:${redb}}
#tfhost{--bg:${T.bg};--s1:${T.cd};--s2:${T.s2};--s3:${T.bar};--line:${T.bd};--blue:${navy2};--blue2:${L?mix(ac,'#ffffff',.6):mix(ac,'#000000',.4)};--glow:${glow};--tx:${T.tx};--mut:${T.mu};--offc:${L?'#ffffffaa':'#000a'}}
.apx button[aria-pressed=true]{background:var(--navy2);border-color:var(--glow);color:${L?'#fff':'var(--tx)'}}
`;
 if(!def)c+=`[style*="color:#6a8cff"]{color:var(--glow)!important}.bar i{background:linear-gradient(90deg,var(--navy2),var(--glow))}\n`;
 if(L)c+=`button:hover{color:#fff}.hb.on{color:#fff}.card.p{border-color:#e0a0a0;background:linear-gradient(160deg,#fdecec,var(--cd))}.x,button.r{color:#7a1a1a}.x:hover,button.r:hover{color:#fff;background:#c0392b}.hero p,.slide small{color:var(--mu)}svg text{fill:var(--mu)}.fc{background:linear-gradient(160deg,var(--navy),var(--cd))}.hb3{background:var(--cd)!important;color:var(--tx)!important}\n`;
 if(A.font!=='system')c+=`html,body,button,input,select,textarea,#tfhost{font-family:${FONTS[A.font][1]}}\n`;
 if(A.lh!=='default')c+=`html,body{line-height:${LHS[A.lh]}}\n`;
 if(A.size!==100)c+=`#app{zoom:${A.size/100}}@media(min-width:701px){.app{min-height:calc(100vh / var(--zm))}aside{height:calc(100vh / var(--zm))}}\n`;
 if(A.rad!=='default'){const r=RAD[A.rad];c+=`.card,.amc,.slide,.tfs,.sc{border-radius:${r[0]}px!important}button,input,select,textarea{border-radius:${r[1]}px!important}\n`}
 const d=DENS[A.dens];if(d)c+=`main{padding:${d.m}px}.card{padding:${d.c}px}.t{padding:${d.t}px 0}button{padding:${d.b}}\n`;
 if(A.motion)c+=`*,*::before,*::after{transition:none!important;animation:none!important;scroll-behavior:auto!important}\n`;
 return c}
function apply(){
 let st=document.getElementById('apx');if(st)st.remove();
 st=document.createElement('style');st.id='apx';st.textContent=build();document.head.appendChild(st);
 const m=document.querySelector('meta[name=color-scheme]');if(m)m.content=THEMES[resolved()].l?'light':'dark';
 let tc=document.querySelector('meta[name=theme-color]');if(!tc){tc=document.createElement('meta');tc.name='theme-color';document.head.appendChild(tc)}tc.content=THEMES[resolved()].bg}
function store(){try{localStorage.setItem(KEY,JSON.stringify(A))}catch(e){toast('Could not save appearance (storage unavailable)')}}
const APX=window.APX={
 s(k,v,re){if(!(k in DEF))return;A[k]=v;clean();store();apply();if(re)go();else if(k==='size'){const o=document.getElementById('apxsz');if(o)o.textContent=A.size+'%'}},
 reset(){A=Object.assign({},DEF);store();apply();go();toast('Appearance reset to defaults')}};
if(mq){const f=()=>{if(A.mode==='auto'){apply();if(view==='vault'&&tab==='set')go()}};mq.addEventListener?mq.addEventListener('change',f):mq.addListener&&mq.addListener(f)}
const P=(k,v,t,x)=>`<button class="g" aria-pressed="${A[k]===v}" onclick="APX.s('${k}',${typeof v==='number'?v:`'${v}'`},1)"${x||''}>${t}</button>`;
const sec=(t,b,n)=>`<div style="margin:14px 0 4px"><b>${t}</b>${n?` <small style="color:var(--mu)">${n}</small>`:''}</div><div class="row">${b}</div>`;
function card(){
 const th=[...Object.keys(THEMES),'auto'].map(k=>{const T=THEMES[k]||THEMES.dark,on=A.mode===k,sw=k==='auto'?`background:linear-gradient(90deg,${THEMES.dark.bg} 50%,${THEMES.light.bg} 50%)`:`background:${T.bg}`;
  return `<button class="g" aria-pressed="${on}" onclick="APX.s('mode','${k}',1)" style="display:flex;align-items:center;gap:8px"><span style="width:34px;height:22px;border-radius:5px;border:1px solid ${k==='auto'?'#888':T.bd};${sw};display:inline-block;position:relative"><i style="position:absolute;right:3px;bottom:3px;width:9px;height:9px;border-radius:50%;background:${A.accent}"></i></span>${k==='auto'?'Auto (system)':T.n}</button>`}).join('');
 const ac=ACC.map(a=>`<button class="g" aria-pressed="${A.accent.toLowerCase()===a[1]}" title="${a[0]}" aria-label="${a[0]}" onclick="APX.s('accent','${a[1]}',1)" style="display:flex;align-items:center;gap:6px"><span style="width:14px;height:14px;border-radius:50%;background:${a[1]};display:inline-block"></span>${a[0]}</button>`).join('')+`<label class="row" style="gap:6px;margin-left:4px">Custom<input type="color" value="${A.accent}" onchange="APX.s('accent',this.value,1)" style="width:44px;height:34px;padding:2px;flex:none" aria-label="Custom accent colour"></label>`;
 const fo=Object.keys(FONTS).map(k=>P('font',k,FONTS[k][0],` style="font-family:${FONTS[k][1]}"`)).join('');
 const sz=[['Small',90],['Default',100],['Large',115],['Extra large',130]].map(a=>P('size',a[1],a[0])).join('')+`<input type="range" min="80" max="150" step="5" value="${A.size}" oninput="APX.s('size',+this.value,0)" aria-label="Text and interface size" style="width:160px;flex:none;padding:0"><b id="apxsz" style="min-width:44px">${A.size}%</b>`;
 const pv=`<div class="card" style="margin-top:14px"><small style="color:var(--mu)">Preview</small><h3 style="margin:4px 0">The quick brown fox jumps over the lazy dog</h3><p style="margin:0 0 8px;color:var(--mu)">Revise formulas, plan the week and track progress in one calm place.</p><div class="row"><button>Primary</button><button class="g">Secondary</button><button class="r">Delete</button><span class="chip">label</span></div><div class="bar" style="margin-top:10px"><i style="width:62%"></i></div></div>`;
 return `<div class="card apx" style="grid-column:1/-1"><h3>Appearance</h3><small style="color:var(--mu)">Saved on this device and applied to every vault. Changes show instantly.</small>`
 +sec('Theme',th)+sec('Accent colour',ac)+sec('Font',fo,'(Easy reading uses OpenDyslexic or Lexend if installed on your device, otherwise Verdana)')
 +sec('Text and interface size',sz,'(scales the whole interface)')
 +sec('Line spacing',[['compact','Compact'],['default','Default'],['relaxed','Relaxed']].map(a=>P('lh',a[0],a[1])).join(''))
 +sec('Corners',[['sharp','Sharp'],['default','Default'],['round','Round']].map(a=>P('rad',a[0],a[1])).join(''))
 +sec('Spacing density',[['compact','Compact'],['default','Comfortable'],['spacious','Spacious']].map(a=>P('dens',a[0],a[1])).join(''))
 +sec('Accessibility',`<button class="g" aria-pressed="${!!A.contrast}" onclick="APX.s('contrast',${A.contrast?0:1},1)">High contrast: ${A.contrast?'On':'Off'}</button><button class="g" aria-pressed="${!!A.motion}" onclick="APX.s('motion',${A.motion?0:1},1)">Reduce motion: ${A.motion?'On':'Off'}</button>`)
 +pv+`<div class="row" style="margin-top:14px"><button class="g" onclick="APX.reset()">Reset to defaults</button></div></div>`}
const _st=set;set=function(){return _st().replace('<span class="chip">Appearance · coming soon</span>','').replace('<div class="grid">',()=>'<div class="grid">'+card())};
apply();
})();

render();
/*LRN:BEGIN*/
/*LRN:CORE (db, overlay manager, rich text)*/
(function(L){'use strict';
const $=id=>document.getElementById(id),EE=s=>esc(s==null?'':s);L.E=EE;L.uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);L.emo=s=>{s=(s||'').trim();if(!s)return'';try{return[...new Intl.Segmenter().segment(s)][0].segment}catch(e){return[...s][0]}};L.col=c=>/^#[0-9a-f]{3,8}$/i.test(c||'')?c:'#2f55d4';
/* ===== LDB: storage adapter (swappable; callers must not assume sync persistence) ===== */
const KEY='prepvault_learning_v1',CAP_ATT=200,CAP_DR=5;
let cache={v:1,vaults:{}},loaded=false,tm=null,mem=false,noted=false,full=false;
function bn(m){let b=$('lrn-bn');if(!m){if(b)b.remove();return}if(!b){b=document.createElement('div');b.id='lrn-bn';b.className='lrn-bn';b.setAttribute('role','alert');document.body.insertBefore(b,document.body.firstChild)}b.textContent=m}
function norm(o){o=o&&typeof o==='object'?o:{};const f=(k,x)=>{const s=o[k]=o[k]&&typeof o[k]==='object'?o[k]:{};s.folders=Array.isArray(s.folders)?s.folders:[];s.items=Array.isArray(s.items)?s.items:[];s.ui=s.ui&&typeof s.ui==='object'?s.ui:{};s.drafts=Array.isArray(s.drafts)?s.drafts:[];if(x)Object.assign(s,x(s))};
 f('sn',s=>({seq:s.seq|0,def:s.def||{}}));f('fc',s=>({def:s.def||{}}));f('qz',s=>({bank:Array.isArray(s.bank)?s.bank:[],attempts:Array.isArray(s.attempts)?s.attempts:[],migrated:!!s.migrated}));return o}
function trim(){Object.values(cache.vaults).forEach(v=>{if(v.qz&&v.qz.attempts.length>CAP_ATT)v.qz.attempts=v.qz.attempts.slice(-CAP_ATT);const all=['sn','fc','qz'].flatMap(k=>v[k]?v[k].drafts.map(d=>[k,d]):[]);if(all.length>CAP_DR){all.sort((a,b)=>(a[1].ts||0)-(b[1].ts||0)).slice(0,all.length-CAP_DR).forEach(([k,d])=>{v[k].drafts=v[k].drafts.filter(x=>x!==d)})}})}
function write(){tm=null;if(mem)return;try{trim();localStorage.setItem(KEY,JSON.stringify(cache));if(full){full=false;bn('')}}catch(e){if(e&&(e.name==='QuotaExceededError'||e.code===22||e.code===1014)){full=true;bn('Storage full - export your data')}else{mem=true;if(!noted){noted=true;try{toast('Learning data cannot be saved in this browser - working in memory only')}catch(x){}}}}}
function sched(){if(tm)clearTimeout(tm);tm=setTimeout(write,300)}
function okS(s){return s==null||(typeof s==='object'&&(s.folders==null||Array.isArray(s.folders))&&(s.items==null||Array.isArray(s.items))&&[...(s.folders||[]),...(s.items||[])].every(x=>x&&typeof x==='object'&&typeof x.id==='string'&&x.id.length<80))}
const db=L.db={
 load(){if(loaded)return;loaded=true;try{const r=localStorage.getItem(KEY);if(r){const o=JSON.parse(r);if(o&&o.v===1&&o.vaults&&typeof o.vaults==='object'&&!Array.isArray(o.vaults))cache=o}}catch(e){mem=true;if(!noted){noted=true;setTimeout(()=>{try{toast('Learning data cannot be saved in this browser - working in memory only')}catch(x){}},500)}}},
 get(id){db.load();return cache.vaults[id]=norm(cache.vaults[id])},
 set(id,d){db.load();cache.vaults[id]=d;sched()},
 remove(id){db.load();delete cache.vaults[id];sched()},
 flush(){if(tm)clearTimeout(tm);write()},
 export(){db.load();return JSON.parse(JSON.stringify(cache))},
 validate(o){if(!o||typeof o!=='object'||o.v!==1||!o.vaults||typeof o.vaults!=='object'||Array.isArray(o.vaults))return false;return Object.values(o.vaults).every(v=>v&&typeof v==='object'&&okS(v.sn)&&okS(v.fc)&&okS(v.qz)&&(!v.qz||((v.qz.bank==null||Array.isArray(v.qz.bank))&&(v.qz.attempts==null||Array.isArray(v.qz.attempts)))))},
 import(o){if(!db.validate(o))return false;db.load();cache=JSON.parse(JSON.stringify(o));sched();return true},
 clear(){db.load();cache={v:1,vaults:{}};sched()},
 size(){db.load();return JSON.stringify(cache).length}};
addEventListener('pagehide',()=>db.flush());document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')db.flush()});
/* drafts: kind sn|fc|qz|at ; stored inside that store's drafts[] ; max 5 per vault */
L.draft={store(k){return k==='at'?'qz':k},
 put(vid,kind,key,data){const v=db.get(vid),s=v[L.draft.store(kind)];s.drafts=s.drafts.filter(d=>!(d.k===kind&&d.key===key));s.drafts.push({k:kind,key,ts:Date.now(),data});db.set(vid,v)},
 get(vid,kind,key){const s=db.get(vid)[L.draft.store(kind)];return s.drafts.find(d=>d.k===kind&&d.key===key)||null},
 del(vid,kind,key){const v=db.get(vid),s=v[L.draft.store(kind)];s.drafts=s.drafts.filter(d=>!(d.k===kind&&d.key===key));db.set(vid,v)},
 list(vid,kind){return db.get(vid)[L.draft.store(kind)].drafts.filter(d=>d.k===kind)}};
/* ===== overlay / dialog manager ===== */
const stack=[];let sov='';
const FOC='button,[href],input,select,textarea,[contenteditable="true"],[tabindex]:not([tabindex="-1"])';
const foc=el=>[...el.querySelectorAll(FOC)].filter(x=>!x.disabled&&x.type!=='hidden');
L.layer=function(html,o){o=o||{};const el=document.createElement('div');el.className=o.dialog?'lrn-dlg':'lrn-ov '+(o.cls||'');el.setAttribute('role','dialog');el.setAttribute('aria-modal','true');if(o.label)el.setAttribute('aria-label',o.label);el.innerHTML=html;
 const lay={el,esc:o.esc,key:o.key,prev:document.activeElement,onClose:o.onClose,dialog:!!o.dialog};if(!stack.length){sov=document.body.style.overflow;document.body.style.overflow='hidden'}
 document.body.appendChild(el);stack.push(lay);if(o.dialog)el.addEventListener('mousedown',e=>{if(e.target===el&&o.esc)o.esc()});const f=o.focus?el.querySelector(o.focus):foc(el)[0];if(f)f.focus();return lay};
L.close=function(lay){const i=stack.indexOf(lay);if(i<0)return;stack.splice(i,1);lay.el.remove();if(!stack.length)document.body.style.overflow=sov;if(lay.prev&&lay.prev.isConnected&&lay.prev.focus)try{lay.prev.focus()}catch(e){}if(lay.onClose)lay.onClose()};
L.top=()=>stack[stack.length-1]||null;L.depth=()=>stack.length;
document.addEventListener('keydown',e=>{const t=stack[stack.length-1];if(!t)return;
 if(e.key==='Escape'){e.preventDefault();e.stopPropagation();t.esc?t.esc():L.close(t);return}
 if(e.key==='Tab'){const f=foc(t.el);if(!f.length)return;const a=document.activeElement,i=f.indexOf(a);if(e.shiftKey&&(i<=0)){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&(i===f.length-1||i<0)){e.preventDefault();f[0].focus()}return}
 if(t.key)t.key(e)},true);
L.confirm=function(title,o){o=o||{};let lay;const yes=()=>{L.close(lay);o.onYes&&o.onYes()},no=()=>{L.close(lay);o.onNo&&o.onNo()};
 lay=L.layer(`<div class="card"><h3>${EE(title)}</h3>${o.detail?`<p style="color:var(--mu)">${EE(o.detail)}</p>`:''}<div class="row"><button data-y>${EE(o.yes||'Yes')}</button><button class="${o.danger?'g':'g'}" data-n>${EE(o.no||'No')}</button></div><small style="color:var(--mu)">Enter = ${EE(o.yes||'Yes')} · Esc = ${EE(o.no||'No')}</small></div>`,{dialog:1,label:title,esc:no,key:e=>{if(e.key==='Enter'){e.preventDefault();yes()}else if(!o.noYN&&/^y$/i.test(e.key)&&e.target.tagName!=='INPUT'){e.preventDefault();yes()}else if(!o.noYN&&/^n$/i.test(e.key)&&e.target.tagName!=='INPUT'){e.preventDefault();no()}},focus:'[data-y]'});
 lay.el.querySelector('[data-y]').onclick=yes;lay.el.querySelector('[data-n]').onclick=no;return lay};
/* form dialog: onOk(el) returns falsy (ok) | string | {fieldKey:msg}. Fields mark errors with <div class=lrn-err data-err="key"> */
L.form=function(o){let lay;const cancel=()=>{L.close(lay);o.onCancel&&o.onCancel()};
 const submit=()=>{const el=lay.el;el.querySelectorAll('.lrn-err').forEach(x=>x.textContent='');const r=o.onOk(el);if(!r){L.close(lay);return}const m=typeof r==='string'?{_:r}:r;let first=null;Object.keys(m).forEach(k=>{const d=el.querySelector(`[data-err="${k}"]`)||el.querySelector('[data-err="_"]');if(d){d.textContent=m[k];if(!first)first=d}});const bad=el.querySelector('[aria-invalid="true"]');if(first&&first.previousElementSibling&&first.previousElementSibling.focus)try{first.previousElementSibling.focus()}catch(e){}};
 lay=L.layer(`<div class="card" style="${o.wide?'width:min(640px,100%)':''}"><h3>${EE(o.title)}</h3>${o.body}<div class="lrn-err" data-err="_"></div><div class="row" style="margin-top:10px"><button data-ok>${EE(o.ok||'Save')}</button><button class="g" data-cancel>${EE(o.cancel||'Cancel')}</button>${o.extra||''}</div></div>`,{dialog:1,label:o.title,esc:cancel,key:e=>{if(e.key==='Enter'&&e.target.tagName!=='TEXTAREA'&&e.target.tagName!=='BUTTON'&&!e.target.isContentEditable){e.preventDefault();submit()}}});
 lay.el.querySelector('[data-ok]').onclick=submit;lay.el.querySelector('[data-cancel]').onclick=cancel;lay.submit=submit;return lay};
L.progress=function(on){let e=$('lrn-ind');if(on){if(!e){e=document.createElement('div');e.id='lrn-ind';e.className='lrn-ind';e.setAttribute('role','status');e.textContent='Reflowing…';document.body.appendChild(e)}}else if(e)e.remove()};
/* ===== RT: rich text ===== */
const rt=L.rt={ctx:{}};
const FONTS=rt.FONTS={sans:"system-ui,Segoe UI,Arial,sans-serif",serif:"Georgia,'Times New Roman',serif",mono:"ui-monospace,Consolas,'Courier New',monospace",hand:"'Comic Sans MS','Segoe Print','Bradley Hand',cursive"};
const TAGS=new Set('b strong i em u s strike span p div br ul ol li h1 h2 h3 blockquote'.split(' ')),BLK=new Set(['p','div','h1','h2','h3','blockquote','ul','ol','li']);
const DROP=new Set('script style link iframe object embed template noscript head meta svg math title frame frameset applet base form textarea select option button input img video audio source canvas track map area'.split(' '));
const TOBLK=new Set('section article header footer main nav aside figure figcaption table tr td th tbody thead tfoot pre dl dt dd address fieldset details summary center'.split(' '));
const MIN_PX=12,MAX_PX=72;
const fkey=v=>{v=String(v).toLowerCase();if(/mono|courier|consolas|menlo/.test(v))return'mono';if(/comic|cursive|hand|script|segoe print|bradley/.test(v))return'hand';if(/serif/.test(v)&&!/sans/.test(v)||/georgia|times|garamond|palatino/.test(v))return'serif';if(/sans|arial|helvetica|system|roboto|verdana|calibri|tahoma|inter/.test(v))return'sans';return''};
const COL=/^(#[0-9a-f]{3,8}|rgba?\(\s*[\d.]+%?\s*,\s*[\d.]+%?\s*,\s*[\d.]+%?\s*(,\s*[\d.]+%?\s*)?\)|hsla?\([\d.\s,%deg]+\)|[a-z]{3,24})$/i;
const toPx=v=>{const m=/^(\d{1,3}(?:\.\d+)?)(px|pt|em|rem|%)$/i.exec(String(v).trim());if(!m)return null;let n=+m[1];const u=m[2].toLowerCase();n=u==='pt'?n*4/3:u==='px'?n:u==='%'?n*.18:n*18;return Math.max(MIN_PX,Math.min(MAX_PX,Math.round(n)))};
const SZ={xx:0,'xx-small':12,'x-small':12,small:13,medium:18,large:20,'x-large':24,'xx-large':32,'xxx-large':48,'-webkit-xxx-large':48};
function cleanStyle(st){const o=[];String(st||'').split(';').forEach(d=>{const i=d.indexOf(':');if(i<0)return;const p=d.slice(0,i).trim().toLowerCase(),v=d.slice(i+1).trim();if(!v||/url\s*\(|expression|javascript|[<>\\@]|!important/i.test(v))return;
 if(p==='color'||p==='background-color'){if(COL.test(v))o.push(p+':'+v)}
 else if(p==='background'){if(COL.test(v))o.push('background-color:'+v)}
 else if(p==='font-size'){const px=SZ[v.toLowerCase()]||toPx(v);if(px)o.push('font-size:'+px+'px')}
 else if(p==='font-family'){const k=fkey(v);if(k)o.push('font-family:'+FONTS[k])}
 else if(p==='text-align'){if(/^(left|right|center|justify)$/i.test(v))o.push('text-align:'+v.toLowerCase())}
 else if(p==='font-weight'){if(/^(normal|bold|bolder|[1-9]00)$/i.test(v))o.push('font-weight:'+v.toLowerCase())}
 else if(p==='font-style'){if(/^(normal|italic|oblique)$/i.test(v))o.push('font-style:'+v.toLowerCase())}
 else if(p==='text-decoration'||p==='text-decoration-line'){const t=v.toLowerCase().split(/\s+/).filter(x=>/^(underline|line-through|none)$/.test(x));if(t.length)o.push('text-decoration:'+t.join(' '))}});return o.join(';')}
function walk(src,dst,depth){for(const n of [...src.childNodes]){if(n.nodeType===3){dst.appendChild(document.createTextNode(n.nodeValue));continue}if(n.nodeType!==1)continue;let t=n.tagName.toLowerCase();if(DROP.has(t))continue;
 if(depth>40){dst.appendChild(document.createTextNode(n.textContent));continue}
 let st=cleanStyle(n.getAttribute('style'));
 if(t==='font'){const a=[];const c=n.getAttribute('color');if(c&&COL.test(c))a.push('color:'+c);const f=n.getAttribute('face');if(f&&fkey(f))a.push('font-family:'+FONTS[fkey(f)]);const z=+n.getAttribute('size');if(z>=1&&z<=7)a.push('font-size:'+[12,13,16,18,24,32,48][z-1]+'px');st=[a.join(';'),st].filter(Boolean).join(';');t='span'}
 else if(TOBLK.has(t))t='div';
 if(!TAGS.has(t)){walk(n,dst,depth+1);continue}
 const e=document.createElement(t);if(st&&t!=='br')e.setAttribute('style',st);
 const al=n.getAttribute('align');if(al&&/^(left|right|center|justify)$/i.test(al)&&BLK.has(t)&&!/text-align/.test(st))e.setAttribute('style',(st?st+';':'')+'text-align:'+al.toLowerCase());
 if(BLK.has(t)&&/^[12]$/.test(n.getAttribute('data-c')||''))e.setAttribute('data-c',n.getAttribute('data-c'));
 if(t==='ol'){const s=n.getAttribute('start');if(s&&/^\d{1,5}$/.test(s))e.setAttribute('start',s)}
 dst.appendChild(e);if(t!=='br')walk(n,e,depth+1)}}
rt.clean=function(html){html=html==null?'':String(html);const out=document.createElement('div');if(html.length>6e6){out.textContent=html.slice(0,6e6);return out.innerHTML}
 let doc;try{doc=new DOMParser().parseFromString('<!doctype html><body>'+html,'text/html')}catch(e){out.textContent=html;return out.innerHTML}walk(doc.body,out,0);return out.innerHTML};
rt.text=h=>{const d=document.createElement('div');d.innerHTML=rt.clean(h);return d.textContent};
rt.fromText=t=>String(t).replace(/\r\n?/g,'\n').split('\n').map(l=>`<p>${l?EE(l):'<br>'}</p>`).join('');
rt.plain=h=>rt.text(h).replace(/\s+/g,' ').trim();
const SIZES=[12,14,16,18,20,24,28,32,40,48];
rt.toolbar=function(cid,opt){opt=opt||{};const b=(c,l,t,a,x)=>`<button type="button" class="g" title="${t}" aria-label="${t}" onmousedown="event.preventDefault()" onclick="LRN.rt.cmd('${cid}','${c}'${a!=null?`,'${a}'`:''})"${x||''}>${l}</button>`;
 return `<div class="lrn-tb" role="toolbar" aria-label="Text formatting">${b('bold','<b>B</b>','Bold')}${b('italic','<i>I</i>','Italic')}${b('underline','<u>U</u>','Underline')}${b('strikeThrough','<s>S</s>','Strikethrough')}<select aria-label="Font family" onchange="LRN.rt.cmd('${cid}','font',this.value);this.selectedIndex=0"><option value="">Font</option><option value="sans">Sans</option><option value="serif">Serif</option><option value="mono">Mono</option><option value="hand">Handwriting</option></select><select aria-label="Font size" onchange="LRN.rt.cmd('${cid}','size',this.value);this.selectedIndex=0"><option value="">Size</option>${SIZES.map(s=>`<option>${s}</option>`).join('')}</select>${b('size-','A−','Smaller text')}${b('size+','A+','Larger text')}<label title="Text colour" style="display:inline-flex;align-items:center;gap:2px;margin:0">A<input type="color" value="#161616" aria-label="Text colour" oninput="LRN.rt.cmd('${cid}','color',this.value)"></label><label title="Highlight colour" style="display:inline-flex;align-items:center;gap:2px;margin:0">▮<input type="color" value="#ffe14d" aria-label="Highlight colour" oninput="LRN.rt.cmd('${cid}','hl',this.value)"></label>${b('justifyLeft','⯇','Align left')}${b('justifyCenter','≡','Align centre')}${b('justifyRight','⯈','Align right')}${b('insertUnorderedList','• List','Bullet list')}${b('insertOrderedList','1. List','Numbered list')}${b('removeFormat','⌫','Clear formatting')}${b('undo','↶','Undo')}${b('redo','↷','Redo')}${opt.extra||''}</div>`};
function saveSel(c){const s=getSelection();if(c.ed&&s.rangeCount&&c.ed.contains(s.anchorNode))c.rng=s.getRangeAt(0).cloneRange()}
rt.bind=function(cid,ed,h){const c=rt.ctx[cid]=Object.assign(rt.ctx[cid]||{},h||{});c.ed=ed;['keyup','mouseup','input','blur','focusout'].forEach(ev=>ed.addEventListener(ev,()=>saveSel(c)));
 ed.addEventListener('paste',e=>{e.preventDefault();const cd=e.clipboardData;if(!cd)return;const h=cd.getData('text/html'),t=cd.getData('text/plain')||'';const html=h?rt.clean(h):rt.fromText(t);if(c.onPaste&&c.onPaste(html,t)===false)return;rt.insert(ed,html);c.change&&c.change(true)});return c};
rt.insert=function(ed,html){ed.focus();let ok=false;try{ok=document.execCommand('insertHTML',false,html)}catch(e){}if(!ok){const s=getSelection();if(s.rangeCount){const r=s.getRangeAt(0);r.deleteContents();const f=r.createContextualFragment(html);const last=f.lastChild;r.insertNode(f);if(last){r.setStartAfter(last);r.collapse(true);s.removeAllRanges();s.addRange(r)}}else ed.insertAdjacentHTML('beforeend',html)}};
rt.cmd=function(cid,c,a){const x=rt.ctx[cid];if(!x||!x.ed)return;const ed=x.ed;if(c==='undo'||c==='redo'){if(x[c])x[c]();else{ed.focus();document.execCommand(c)}return}
 ed.focus();if(x.rng){const s=getSelection();try{s.removeAllRanges();s.addRange(x.rng)}catch(e){}}
 try{document.execCommand('styleWithCSS',false,true)}catch(e){}
 const px=n=>{document.execCommand('fontSize',false,'7');ed.querySelectorAll('font[size="7"]').forEach(f=>{const s=document.createElement('span');s.style.fontSize=n+'px';while(f.firstChild)s.appendChild(f.firstChild);f.replaceWith(s)});ed.querySelectorAll('span').forEach(s=>{if(/xxx-large/.test(s.style.fontSize))s.style.fontSize=n+'px'})};
 if(c==='font'){if(a&&FONTS[a])document.execCommand('fontName',false,FONTS[a])}
 else if(c==='size'){const n=+a;if(n)px(Math.max(MIN_PX,Math.min(MAX_PX,n)))}
 else if(c==='size+'||c==='size-'){let cur=18;const s=getSelection();if(s.anchorNode){const el=s.anchorNode.nodeType===1?s.anchorNode:s.anchorNode.parentElement;if(el)cur=Math.round(parseFloat(getComputedStyle(el).fontSize))||18}
  const i=c==='size+'?SIZES.findIndex(v=>v>cur):[...SIZES].reverse().findIndex(v=>v<cur);const n=c==='size+'?SIZES[i<0?SIZES.length-1:i]:[...SIZES].reverse()[i<0?SIZES.length-1:i];px(Math.max(MIN_PX,n))}
 else if(c==='color')document.execCommand('foreColor',false,a);
 else if(c==='hl'){if(!document.execCommand('hiliteColor',false,a))document.execCommand('backColor',false,a)}
 else document.execCommand(c,false,null);
 saveSel(x);x.change&&x.change()};
/* ===== scaling of fixed-size pages ===== */
L.fit=function(){document.querySelectorAll('.lrn-fit').forEach(w=>{const p=w.firstElementChild;if(!p)return;const W=+w.dataset.w||640,H=+w.dataset.h||480,res=+w.dataset.res||250,host=w.parentElement,aw=Math.max(200,(host?host.clientWidth:innerWidth)-10),s=Math.max(.35,Math.min(aw/W,(innerHeight-res)/H,+w.dataset.max||2));p.style.transform=`scale(${s})`;w.style.width=W*s+'px';w.style.height=H*s+'px'})};
addEventListener('resize',()=>L.fit());
})(window.LRN=window.LRN||{});

/*LRN:ENGINE (managers cloned from Sources pattern)*/
(function(L){'use strict';
const $=id=>document.getElementById(id),E=L.E,db=L.db,rt=L.rt;
L.libs={};L.t='ov';L.it={sn:'manage',fc:'manage',qz:'manage'};L.SEL={};L.SQ={};L.SUI={};L.drag=null;
L.vid=()=>{const v=V();return v?v.id:null};
const mkid=()=>L.uid();
L.ensure=function(id){const o=db.get(id);if(o.sn.migrated&&o.fc.migrated&&o.qz.migrated)return o;try{L.migrate(id)}catch(e){console.warn('LRN migrate',e)}return db.get(id)};
L.D=k=>{const id=L.vid();return L.ensure(id)[k]};
L.sv=k=>{const id=L.vid();db.set(id,db.get(id));L.refresh()};
/* ---- folders ---- */
const fmap=k=>Object.fromEntries(L.D(k).folders.map(x=>[x.id,x]));
L.fp=(k,f)=>{const m=fmap(k),a=[];let n=0;while(f&&m[f]&&n++<50){a.unshift(m[f].name);f=m[f].parent}return a.join(' / ')};
L.inF=(k,f,r)=>{const m=fmap(k);let n=0;while(f&&n++<50){if(f===r)return true;f=m[f]&&m[f].parent}return false};
L.fopts=function fo(k,p,d,sel,ex){return L.D(k).folders.filter(f=>(f.parent||'')===p&&f.id!==ex).map(f=>`<option value="${f.id}"${f.id===sel?' selected':''}>${'\u00a0\u00a0'.repeat(d)}${E(f.name)}</option>`+fo(k,f.id,d+1,sel,ex)).join('')};
L.fsel=(k,sel,id)=>`<select id="${id}" data-lfsel="${k}"><option value="">Unfiled</option>${L.fopts(k,'',0,sel)}</select>`;
L.labsOf=k=>[...new Set(L.D(k).items.flatMap(i=>i.labels||[]))].sort();
L.IUI=(k,inst)=>{const Lb=L.libs[k],o=inst[0]==='m'?L.D(k).ui:(L.SUI[inst]=L.SUI[inst]||{});if(o.sort==null){o.sort=Lb.sorts[0][0];o.dir=1;o.group='';o.view='grid';o.folder='';o.label='';o.fav=0}return o};
/* ---- rows / item / paint ---- */
L.rows=function(k,inst){const Lb=L.libs[k],s=L.D(k),u=L.IUI(k,inst),q=(L.SQ[inst]||'').toLowerCase();
 const a=s.items.filter(it=>(!u.fav||it.fav)&&(!u.label||(it.labels||[]).includes(u.label))&&(Lb.filters||[]).every(f=>!u['f_'+f[0]]||Lb.fil(it,f[0],u['f_'+f[0]]))&&(!u.folder||L.inF(k,it.folder,u.folder))&&(!q||[Lb.title(it),it.d,(it.labels||[]).join(' '),L.fp(k,it.folder),Lb.text?Lb.text(it):''].join(' ').toLowerCase().includes(q)));
 const so=Lb.sorts.find(x=>x[0]===u.sort)||Lb.sorts[0];a.sort((x,y)=>so[2](x,y)*(u.dir||1));
 const g=Lb.groups.find(x=>x[0]===u.group);if(!g||!g[0])return[['',a]];const m=new Map();a.forEach(it=>(g[2](it)||['—']).forEach(n=>{if(!m.has(n))m.set(n,[]);m.get(n).push(it)}));return[...m]};
L.ids=(k,inst)=>L.rows(k,inst||'m:'+k).flatMap(x=>x[1].map(i=>i.id));
L.item=function(k,inst,it,view,mgr,on){const Lb=L.libs[k],A=(a,t,c)=>`<button class="${c||'g'}" title="${t}" aria-label="${t}" onclick="LRN.act('${k}','${a}','${it.id}')">${{open:'▶',fav:it.fav?'★':'☆',edit:'✎',copy:'⧉',del:'✕'}[a]}</button>`;
 return `<div class="sc ${view==='list'?'l':'g'}${on?' sel':''}" tabindex="0"${mgr?` draggable="true" ondragstart="LRN.ds(event,'${k}','${it.id}')" ondragover="event.preventDefault()" ondrop="LRN.dr(event,'${k}','${it.id}')"`:''} onclick="LRN.clk('${k}','${inst}','${it.id}',event)" ondblclick="LRN.dbl('${k}','${inst}','${it.id}')" onkeydown="if(event.key==='Enter'&&event.target===this){LRN.cf('${k}','${it.id}')}"><span style="display:flex;gap:6px;align-items:center;width:100%">${mgr?`<input type="checkbox" aria-label="Select" ${on?'checked':''} onclick="event.stopPropagation();LRN.tg('${k}','${it.id}')" style="width:auto">`:''}<span class="si">${Lb.ico(it)}</span><span class="sx"><b>${E(Lb.title(it))}${it.fav?' ★':''}</b><small>${Lb.sub(it)}</small></span></span>${Lb.prev?`<span class="lrn-prev" style="color:var(--mu);font-size:.8rem;overflow:hidden;max-height:3.2em">${Lb.prev(it)}</span>`:''}<span>${(it.labels||[]).map(l=>`<i class="lb">${E(l)}</i>`).join('')}${it.folder?`<i class="lb">📁 ${E(L.fp(k,it.folder))}</i>`:''}</span>${Lb.extra?Lb.extra(it,mgr):''}${mgr?`<span class="sa" onclick="event.stopPropagation()">${A('open','Open')}${A('fav','Favourite')}${A('edit','Edit')}${A('copy','Copy')}${A('del','Delete','x')}</span>`:''}</div>`};
L.paint=function(inst){const el=$('sl-'+inst);if(!el)return;const k=inst.split(':')[1],Lb=L.libs[k];if(!Lb)return;const u=L.IUI(k,inst),mgr=inst[0]==='m',g=L.rows(k,inst),sel=L.SEL[k]||[],t=el.scrollTop,total=L.D(k).items.length;
 if(!total)el.innerHTML=`<div style="color:var(--mu);padding:22px;text-align:center"><p>${E(Lb.empty.msg)}</p><button onclick="${Lb.empty.fn}">${E(Lb.empty.btn)}</button></div>`;
 else el.innerHTML=g.map(([n,a])=>(n?`<h4 style="margin:10px 0 4px">${E(n)} <small style="color:var(--mu)">(${a.length})</small></h4>`:'')+`<div class="${u.view==='list'?'scl':'scg'}">${a.map(it=>L.item(k,inst,it,u.view,mgr,sel.includes(it.id))).join('')}</div>`).join('')||'<div style="color:var(--mu);padding:18px;text-align:center">Nothing matches these filters.</div>';
 el.scrollTop=t;const c=$('cnt-'+inst);if(c)c.textContent=g.reduce((n,x)=>n+x[1].length,0)+' shown';const b=$('bk-'+k);if(b&&mgr)b.innerHTML=L.bulk(k)};
L.bulk=function(k){const n=(L.SEL[k]||[]).length;return `<div class="row" style="margin:6px 0"><button class="g" onclick="LRN.bulkA('${k}','all')">Select all</button><button class="g" onclick="LRN.bulkA('${k}','none')">Clear</button><small style="color:var(--mu)">${n} selected</small>${n?`<button class="g" onclick="LRN.bulkA('${k}','fav')">★ Favourite</button><select id="bm-${k}" data-lfsel="${k}" aria-label="Move to folder" style="width:auto"><option value="">Unfiled</option>${L.fopts(k,'',0)}</select><button class="g" onclick="LRN.bulkA('${k}','move')">Move</button><button class="g" onclick="LRN.bulkA('${k}','labels')">Add labels</button><button class="g" onclick="LRN.bulkA('${k}','copy')">Copy</button><button class="x" onclick="LRN.bulkA('${k}','del')">Delete</button>`:''}</div>`};
L.tree=function(k,inst){const s=L.D(k),u=L.IUI(k,inst),ch=(p,d)=>d>20?'':s.folders.filter(f=>(f.parent||'')===p).map(f=>`<div style="padding-left:12px"><div style="display:flex;gap:2px;align-items:center"><button class="g tb${u.folder===f.id?' on':''}" ondragover="event.preventDefault()" ondrop="LRN.tdrop('${k}','${f.id}',event)" onclick="LRN.st('${inst}','folder','${f.id}')"><span style="color:${L.col(f.color)}">${f.emoji?E(f.emoji):'■'}</span> ${E(f.name)}</button><button class="g" title="Edit folder" aria-label="Edit folder ${E(f.name)}" style="padding:2px 6px" onclick="LRN.fEdit('${k}','${f.id}')">✎</button></div>${ch(f.id,d+1)}</div>`).join('');
 return `<button class="g tb${!u.folder?' on':''}" ondragover="event.preventDefault()" ondrop="LRN.tdrop('${k}','',event)" onclick="LRN.st('${inst}','folder','')">All items</button>`+ch('',0)+`<div style="margin-top:6px"><button class="g" onclick="LRN.fEdit('${k}')">＋ New folder</button></div>`};
L.ctl=function(k,inst){const Lb=L.libs[k],u=L.IUI(k,inst),o=(a,v)=>a.map(x=>`<option value="${x[0]}"${String(x[0])===String(v)?' selected':''}>${x[1]}</option>`).join(''),sl=(l,fn,body)=>`<select aria-label="${l}" onchange="${fn}">${body}</select>`;
 return `<div class="row" style="margin-bottom:8px"><input type="search" aria-label="Search" placeholder="Search…" value="${E(L.SQ[inst]||'')}" oninput="LRN.st('${inst}','q',this.value)" style="min-width:150px">${sl('Sort by',`LRN.st('${inst}','sort',this.value)`,o(Lb.sorts,u.sort))}${sl('Direction',`LRN.st('${inst}','dir',+this.value)`,o([[1,'Ascending'],[-1,'Descending']],u.dir))}${sl('Group by',`LRN.st('${inst}','group',this.value)`,o(Lb.groups,u.group))}${sl('View',`LRN.st('${inst}','view',this.value)`,o([['grid','Grid'],['list','List']],u.view))}${inst[0]==='m'?(Lb.filters||[]).map(f=>sl(f[1],`LRN.st('${inst}','f_${f[0]}',this.value)`,`<option value="">${f[1]}: all</option>`+f[2]().map(x=>`<option value="${E(x[0])}"${u['f_'+f[0]]===x[0]?' selected':''}>${E(x[1])}</option>`).join(''))).join(''):''}${sl('Label filter',`LRN.st('${inst}','label',this.value)`,`<option value="">All labels</option>${L.labsOf(k).map(l=>`<option${l===u.label?' selected':''}>${E(l)}</option>`).join('')}`)}<label style="margin:0"><input type="checkbox" style="width:auto" ${u.fav?'checked':''} onchange="LRN.st('${inst}','fav',this.checked?1:0)"> ★ only</label><small id="cnt-${inst}" style="color:var(--mu)"></small></div>`};
L.sec=function(k,inst){const Lb=L.libs[k];return `<div class="card lrn-wrap" style="margin-bottom:12px"><div class="row" style="justify-content:space-between"><h3 style="margin:0">${Lb.name} <small style="color:var(--mu)">· ${L.D(k).items.length}</small></h3><a href="#" style="color:#6a8cff" onclick="LRN.goto('${k}');return false">Open full manager →</a></div><div class="row" style="margin:6px 0">${Lb.chips()}</div>${L.ctl(k,inst)}<div id="sl-${inst}" data-lsl="${inst}" style="height:300px;overflow:auto"></div></div>`};
L.manager=function(k){const inst='m:'+k;return `<div class="lrn-mgr"><div class="card" id="tr-${inst}" style="overflow:auto;max-height:72vh">${L.tree(k,inst)}</div><div>${L.ctl(k,inst)}<div id="bk-${k}"></div><div id="sl-${inst}" data-lsl="${inst}" style="max-height:62vh;overflow:auto"></div></div></div>`};
L.settings=function(k){const Lb=L.libs[k],u=L.IUI(k,'m:'+k),o=(a,v)=>a.map(x=>`<option value="${x[0]}"${x[0]===v?' selected':''}>${x[1]}</option>`).join('');
 return `<div class="grid"><div class="card"><h3>Defaults</h3><label>View<select onchange="LRN.st('m:${k}','view',this.value)">${o([['grid','Grid'],['list','List']],u.view)}</select></label><label>Sort<select onchange="LRN.st('m:${k}','sort',this.value)">${o(Lb.sorts,u.sort)}</select></label><label>Group<select onchange="LRN.st('m:${k}','group',this.value)">${o(Lb.groups,u.group)}</select></label>${Lb.settings?Lb.settings():''}</div><div class="card"><h3>Learning data</h3><p style="color:var(--mu)">Stored in this browser only. Size of all learning data: <b>${(db.size()/1024).toFixed(1)} KB</b>. Kept per vault: last 200 quiz attempts and last 5 unsaved drafts.</p><div class="row"><button class="g" onclick="LRN.exportData()">Export learning data</button></div></div><div class="card"><h3>Reset</h3><p style="color:var(--mu)">Removes every item and folder in ${Lb.name} for this vault.</p><button class="r" onclick="LRN.reset('${k}')">Reset ${Lb.name}</button></div></div>`};
L.lib=function(k){const Lb=L.libs[k],t=L.it[k],T=[['make',Lb.maker||'Maker'],['manage','Manager'],['settings','Settings']];
 const mk=`<div class="card" style="max-width:640px"><h3>${E(Lb.maker)}</h3><p style="color:var(--mu)">${Lb.makerInfo}</p><button onclick="${Lb.empty.fn}">${E(Lb.empty.btn)}</button></div>`;
 return `<div class="sw" style="margin-bottom:10px;align-items:center">${T.map(x=>`<button class="${t===x[0]?'':'g'}" onclick="LRN.itab('${k}','${x[0]}')">${x[1]}</button>`).join('')}<span style="flex:1"></span><button onclick="${Lb.empty.fn}" data-create="${k}">＋ Create new</button></div>`+(t==='make'?mk:t==='settings'?L.settings(k):L.manager(k))};
/* ---- interaction ---- */
L.cf=(k,id)=>{const it=L.D(k).items.find(x=>x.id===id);if(!it)return;L.confirm(`Open “${L.libs[k].title(it)}”?`,{onYes:()=>L.libs[k].open(it)})};
L.st=(inst,key,v)=>{const k=inst.split(':')[1];if(key==='q'){L.SQ[inst]=v;L.paint(inst);return}const u=L.IUI(k,inst);u[key]=v;if(inst[0]==='m')L.sv(k);if(key==='folder'){const t=$('tr-'+inst);if(t)t.innerHTML=L.tree(k,inst)}L.paint(inst)};
L.tg=(k,id)=>{const a=L.SEL[k]=L.SEL[k]||[],i=a.indexOf(id);i<0?a.push(id):a.splice(i,1);L.paint('m:'+k)};
L.clk=(k,inst,id,e)=>{if(inst[0]==='m'){if(e.ctrlKey||e.metaKey)return L.tg(k,id);L.SEL[k]=[id];L.paint(inst);return}L.cf(k,id)};
L.dbl=(k,inst,id)=>{L.cf(k,id)};
L.ds=(e,k,id)=>{const a=L.SEL[k]||[];L.drag={k,ids:a.includes(id)?a.slice():[id]};e.dataTransfer.setData('text/plain','lrn');e.dataTransfer.effectAllowed='move'};
L.tdrop=(k,f,e)=>{e.preventDefault();e.stopPropagation();const d=L.drag;if(!d||d.k!==k)return;L.D(k).items.forEach(i=>{if(d.ids.includes(i.id))i.folder=f});L.drag=null;L.sv(k)};
L.dr=(e,k,id)=>{e.preventDefault();e.stopPropagation();const d=L.drag,s=L.D(k);if(!d||d.k!==k||L.IUI(k,'m:'+k).sort!=='ord'||d.ids.includes(id))return;const mv=s.items.filter(i=>d.ids.includes(i.id));s.items=s.items.filter(i=>!d.ids.includes(i.id));const t=s.items.findIndex(i=>i.id===id);s.items.splice(t<0?s.items.length:t,0,...mv);L.drag=null;L.sv(k)};
L.tab=t=>{L.t=t;go('learn')};L.goto=k=>{L.t=k;L.it[k]='manage';go('learn')};L.itab=(k,t)=>{L.it[k]=t;go('learn')};
L.open=(tab,sub)=>{L.t=tab||'ov';if(sub&&L.it[tab]!==undefined)L.it[tab]=sub;window.sbGo('learn')};
L.copyItem=(k,it)=>{const c=JSON.parse(JSON.stringify(it));c.id=mkid();c.t=it.t+' - Copy';c.created=c.updated=Date.now();return c};
L.act=(k,a,id)=>{const Lb=L.libs[k],s=L.D(k),it=s.items.find(x=>x.id===id);if(!it)return;
 if(a==='open')L.cf(k,id);else if(a==='fav'){it.fav=!it.fav;L.sv(k)}
 else if(a==='edit')L.confirm(`Open “${Lb.title(it)}” in the maker?`,{onYes:()=>Lb.edit(id)});
 else if(a==='copy'){s.items.push(Lb.copy?Lb.copy(it):L.copyItem(k,it));L.sv(k);toast('Copied')}
 else if(a==='del')L.confirm(`Delete “${Lb.title(it)}”?`,{detail:'This cannot be undone.',yes:'Delete',no:'Keep',noYN:1,onYes:()=>{L.D(k).items=L.D(k).items.filter(x=>x.id!==id);L.SEL[k]=(L.SEL[k]||[]).filter(x=>x!==id);L.sv(k)}})};
L.bulkA=(k,a)=>{const s=L.D(k),sel=L.SEL[k]=L.SEL[k]||[];if(a==='all'){L.SEL[k]=L.ids(k);return L.paint('m:'+k)}if(a==='none'){L.SEL[k]=[];return L.paint('m:'+k)}
 const its=s.items.filter(i=>sel.includes(i.id));if(!its.length)return;
 if(a==='fav'){const all=its.every(i=>i.fav);its.forEach(i=>i.fav=!all);L.sv(k)}
 else if(a==='move'){const f=$('bm-'+k).value;its.forEach(i=>i.folder=f);L.sv(k)}
 else if(a==='copy'){its.forEach(i=>s.items.push(L.libs[k].copy?L.libs[k].copy(i):L.copyItem(k,i)));L.sv(k)}
 else if(a==='labels')L.form({title:'Add labels',body:`<label>Labels (comma separated)<input id="lb_l" aria-label="Labels"></label><div class="lrn-err" data-err="l"></div>`,ok:'Add',onOk:el=>{const l=el.querySelector('#lb_l').value.split(',').map(x=>x.trim().slice(0,30)).filter(Boolean);if(!l.length)return{l:'Enter at least one label'};its.forEach(i=>i.labels=[...new Set([...(i.labels||[]),...l])]);L.sv(k)}});
 else if(a==='del')L.confirm(`Delete ${its.length} item(s)?`,{detail:'This cannot be undone.',yes:'Delete',no:'Keep',noYN:1,onYes:()=>{const ids=its.map(i=>i.id);L.D(k).items=L.D(k).items.filter(i=>!ids.includes(i.id));L.SEL[k]=[];L.sv(k)}})};
L.reset=k=>L.confirm(`Reset ${L.libs[k].name}?`,{detail:'All its items and folders are removed for this vault.',yes:'Reset',no:'Cancel',noYN:1,onYes:()=>{const s=L.D(k);s.items=[];s.folders=[];L.SEL[k]=[];L.sv(k);toast('Reset')}});
/* folder editor */
L.fEdit=(k,id)=>{const s=L.D(k),f=id?s.folders.find(x=>x.id===id):{name:'',desc:'',color:'#2f55d4',emoji:'📁',parent:L.IUI(k,'m:'+k).folder||''};if(!f)return;
 const bad=new Set();if(id){const d=x=>{bad.add(x);s.folders.filter(y=>y.parent===x).forEach(y=>d(y.id))};d(id)}
 const po=(p,dp)=>s.folders.filter(x=>(x.parent||'')===p&&!bad.has(x.id)).map(x=>`<option value="${x.id}"${x.id===f.parent?' selected':''}>${'\u00a0\u00a0'.repeat(dp)}${E(x.name)}</option>`+po(x.id,dp+1)).join('');
 L.form({title:(id?'Edit':'New')+' folder',body:`<label>Name<input id="lf_n" maxlength="40" value="${E(f.name)}"></label><div class="lrn-err" data-err="n"></div><label>Description<input id="lf_d" maxlength="200" value="${E(f.desc)}"></label><label>Parent folder<select id="lf_p"><option value="">(top level)</option>${po('',0)}</select></label><label>Colour<input type="color" id="lf_c" value="${L.col(f.color||'#2f55d4')}"></label><label>Emoji<input id="lf_e" maxlength="4" value="${E(f.emoji||'')}"></label>`,
  extra:id?'<button class="x" data-del type="button">Delete folder</button>':'',
  onOk:el=>{const n=el.querySelector('#lf_n').value.trim();if(!n)return{n:'Name the folder'};const o={name:n.slice(0,40),desc:el.querySelector('#lf_d').value.trim().slice(0,200),color:el.querySelector('#lf_c').value,emoji:L.emo(el.querySelector('#lf_e').value),parent:el.querySelector('#lf_p').value};if(id)Object.assign(s.folders.find(x=>x.id===id),o);else s.folders.push({id:mkid(),...o});L.sv(k)}});
 const dl=L.top().el.querySelector('[data-del]');if(dl)dl.onclick=()=>{const lay=L.top();L.confirm('Delete this folder?',{detail:'Its items and sub-folders move up one level.',yes:'Delete',no:'Keep',noYN:1,onYes:()=>{const p=f.parent||'';s.folders.forEach(x=>{if(x.parent===id)x.parent=p});s.items.forEach(i=>{if(i.folder===id)i.folder=p});s.folders=s.folders.filter(x=>x.id!==id);['m:','o:','d:'].forEach(x=>{const u=L.IUI(k,x+k);if(u.folder===id)u.folder=''});L.close(lay);L.sv(k)}})};};
/* refresh + after-render */
L.refresh=()=>{document.querySelectorAll('select[data-lfsel]').forEach(s=>{const v=s.value,k=s.dataset.lfsel;s.innerHTML='<option value="">Unfiled</option>'+L.fopts(k,'',0);s.value=v});document.querySelectorAll('[id^="tr-m:"]').forEach(e=>{const k=e.id.slice(5);if(L.libs[k])e.innerHTML=L.tree(k,'m:'+k)});document.querySelectorAll('[data-lsl]').forEach(e=>L.paint(e.dataset.lsl))};
L.exportData=()=>{const s=JSON.stringify(db.export());L.form({title:'Export learning data',ok:'Copy',cancel:'Close',body:`<p style="color:var(--mu)">Copy this text and keep it safe. The main backup (Settings) also includes it.</p><textarea id="lx" rows="8" readonly aria-label="Learning data">${E(s)}</textarea>`,onOk:el=>{const t=el.querySelector('#lx');t.select();try{navigator.clipboard.writeText(s).then(()=>toast('Copied'),()=>document.execCommand('copy'))}catch(e){document.execCommand('copy')}return 'Copied - you may close this dialog.'}})};
})(window.LRN);

/*LRN:STICKY NOTES*/
(function(L){'use strict';
const $=id=>document.getElementById(id),E=L.E,rt=L.rt,db=L.db;
const BG=['#fff7b8','#ffd6e0','#d4f5dc','#d6e8ff','#e9dcff','#ffe3c2','#ffffff','#e3e3e3'],PH=480,MAXP=500,EMPTY='<p><br></p>';
const sn=L.sn={M:null,offered:new Set()};
L.mkNote=o=>({id:L.uid(),t:o.t||'Untitled',d:o.d||'',labels:o.labels||[],folder:o.folder||'',fav:!!o.fav,color:o.color||BG[0],emoji:o.emoji||'📝',pages:o.pages||[{h:EMPTY,bg:o.color||BG[0],ov:false}],created:Date.now(),updated:Date.now()});
const wrap=h=>{const d=document.createElement('div');d.innerHTML=h;return d};
const normH=h=>/^(<p><br><\/p>|<div><br><\/div>|<br>|)$/.test(h)?'':h;
/* ---------- measuring ---------- */
function msEl(){let m=$('lrn-ms');if(!m){m=document.createElement('div');m.id='lrn-ms';m.className='lrn-page lrn-ms';m.setAttribute('aria-hidden','true');document.body.appendChild(m)}return m}
sn.metric=h=>{const m=msEl();m.innerHTML=h;return m.offsetHeight};
const fits=h=>sn.metric(h)<=PH;
/* ---------- units / coalesce ---------- */
const isBlk=n=>n.nodeType===1&&/^(P|DIV|H1|H2|H3|BLOCKQUOTE|UL|OL)$/.test(n.tagName);
function units(html){const d=wrap(rt.clean(html)),out=[];let inl=null;const fl=()=>{if(inl){out.push({h:inl.outerHTML});inl=null}};
 for(const n of [...d.childNodes]){if(n.nodeType===3&&!n.nodeValue.trim()&&!inl)continue;
  if(isBlk(n)){fl();if(n.tagName==='UL'||n.tagName==='OL'){const ol=n.tagName==='OL',st=ol?(+n.getAttribute('start')||1):0,ch=[...n.children];if(!ch.length){out.push({h:n.outerHTML});continue}
    ch.forEach((c,i)=>{const li=c.tagName==='LI'?c.cloneNode(true):(()=>{const x=document.createElement('li');x.appendChild(c.cloneNode(true));return x})(),u=n.cloneNode(false);u.removeAttribute('start');u.removeAttribute('data-c');if(i>0||n.getAttribute('data-c')==='1')u.setAttribute('data-c','1');else if(n.getAttribute('data-c')==='2')u.setAttribute('data-c','2');if(ol)u.setAttribute('start',st+i);u.appendChild(li);out.push({h:u.outerHTML})})}
   else out.push({h:n.outerHTML})}
  else{if(!inl)inl=document.createElement('div');inl.appendChild(n.cloneNode(true))}}
 fl();return out}
function coalesce(us){const out=[];for(const u of us){const e=wrap(u.h).firstElementChild;if(!e)continue;const p=out[out.length-1],c=e.getAttribute('data-c');
  if(p&&c&&p.tag===e.tagName){if(c==='2'&&(e.tagName==='UL'||e.tagName==='OL')){const a=p.el.lastElementChild,b=e.firstElementChild;if(a&&b){while(b.firstChild)a.appendChild(b.firstChild);continue}}
   else if(c==='1'){while(e.firstChild)p.el.appendChild(e.firstChild);continue}}
  if(c&&out.length)e.removeAttribute('data-c');out.push({tag:e.tagName,el:e})}
 return out.map(x=>x.el.outerHTML).join('')}
/* ---------- splitting one unit by text ---------- */
function cut(el,k){const c=el.cloneNode(true),tw=document.createTreeWalker(c,4);let acc=0,node=null,off=0,nn;while((nn=tw.nextNode())){const l=nn.nodeValue.length;if(acc+l>=k){node=nn;off=k-acc;break}acc+=l}if(!node)return null;
 const r1=document.createRange();r1.setStart(c,0);r1.setEnd(node,off);const r2=document.createRange();r2.setStart(node,off);r2.setEnd(c,c.childNodes.length);const a=c.cloneNode(false),b=c.cloneNode(false);a.appendChild(r1.cloneContents());b.appendChild(r2.cloneContents());return[a,b]}
function splitUnit(u,prefix){const el=wrap(u.h).firstElementChild;if(!el)return[null,u];const t=el.textContent,n=t.length;if(n<2)return[null,u];
 const test=k=>{const r=cut(el,k);return r&&fits(coalesce(prefix.concat([{h:r[0].outerHTML}])))};
 let lo=0,hi=n,k=Math.min(n-1,1500);
 if(test(k)){lo=k;while(lo<n-1){const nk=Math.min(n-1,lo*2);if(!test(nk)){hi=nk;break}lo=nk}}else hi=k;
 let it=0;while(hi-lo>1&&it++<40){const m=(lo+hi)>>1;if(test(m))lo=m;else hi=m}
 let k2=lo;if(k2<1){if(prefix.length)return[null,u];k2=1}
 if(k2<n){let j=k2;while(j>k2-100&&j>1&&!/\s/.test(t[j-1]))j--;if(j>1&&j>k2-100&&/\s/.test(t[j-1]))k2=j}
 const cc=t.charCodeAt(k2-1);if(cc>=0xD800&&cc<=0xDBFF&&k2>1)k2--;
 const r=cut(el,k2);if(!r)return[null,u];const li=el.tagName==='UL'||el.tagName==='OL';r[1].setAttribute('data-c',li?'2':'1');return[{h:r[0].outerHTML},{h:r[1].outerHTML}]}
/* ---------- packing a stream of units into pages (async, never freezes) ---------- */
sn.pack=async function(us){const pages=[],q=us.slice();let cur=[],i=0,guard=0;const limit=q.length*8+30000;let tl=performance.now();
 const tick=async()=>{const n=performance.now();if(n-tl>12){tl=n;await new Promise(r=>setTimeout(r,0))}};
 while(i<q.length){if(++guard>limit)return null;
  const rem=q.length-i,test=n=>fits(coalesce(cur.concat(q.slice(i,i+n))));let lo=0,take=1,hi=-1;
  for(;;){const n=Math.min(rem,take);if(test(n)){lo=n;if(n===rem)break;take*=2}else{hi=n;break}}
  if(hi>0)while(hi-lo>1){const m=(lo+hi)>>1;if(test(m))lo=m;else hi=m}
  if(lo>0){cur=cur.concat(q.slice(i,i+lo));i+=lo}if(i>=q.length)break;
  const b=q[i];
  if(cur.length){if(fits(coalesce([b]))){pages.push(coalesce(cur));cur=[]}else{const[a,r]=splitUnit(b,cur);if(a&&r){cur.push(a);q[i]=r}pages.push(coalesce(cur));cur=[]}}
  else{const[a,r]=splitUnit(b,[]);if(a&&r){pages.push(coalesce([a]));q[i]=r}else{pages.push(coalesce([b]));i++}}
  if(pages.length>MAXP)return null;await tick()}
 if(cur.length||!pages.length)pages.push(coalesce(cur));return pages};
sn.fallback=function(us){const t=us.map(u=>rt.text(u.h)).join(''),o=[];for(let i=0;i<t.length;i+=500){let e=Math.min(t.length,i+500);const c=t.charCodeAt(e-1);if(c>=0xD800&&c<=0xDBFF&&e<t.length)e++;o.push('<p>'+E(t.slice(i,e))+'</p>');i=e-500}return o.length?o:[EMPTY]};
const txt=a=>a.map(h=>rt.text(h)).join('');
/* caret helpers */
function caretOff(ed){const s=getSelection();if(!s.rangeCount||!ed.contains(s.anchorNode))return null;const r=document.createRange();r.setStart(ed,0);r.setEnd(s.anchorNode,s.anchorOffset);return r.toString().length}
function setCaret(ed,off){ed.focus();const tw=document.createTreeWalker(ed,4);let acc=0,n,tn=null,o=0;while((n=tw.nextNode())){const l=n.nodeValue.length;if(acc+l>=off){tn=n;o=off-acc;break}acc+=l;tn=n;o=l}
 const r=document.createRange();if(tn){r.setStart(tn,o)}else{r.setStart(ed,0)}r.collapse(true);const s=getSelection();s.removeAllRanges();s.addRange(r)}
/* ---------- reflow driver: operates on M.pages from edited page k ---------- */
sn.reflow=async function(M,k){const pg=M.pages;if(!pg[k])return false;let e=k;while(e+1<pg.length&&pg[e+1].ov)e++;
 const live=M.ed&&M.cur===k?M.ed.innerHTML:pg[k].h;const us0=units(live),h0=coalesce(us0);pg[k].h=h0;
 if(fits(h0)){if(e===k)return false;if(!fits(coalesce(us0.concat([{h:'<p>x</p>'}]))))return false}
 const us=[...us0];for(let j=k+1;j<=e;j++)us.push(...units(pg[j].h));const old=[h0];for(let j=k+1;j<=e;j++)old.push(pg[j].h);const tOld=txt(old);
 const big=tOld.length>20000;let ind=null;if(big)ind=setTimeout(()=>L.progress(true),150);if(M.ed&&big)M.ed.contentEditable='false';
 let np;try{np=await sn.pack(us);if(!np)np=sn.fallback(us)}finally{if(ind)clearTimeout(ind);L.progress(false);if(M.ed)M.ed.contentEditable='true'}
 if(txt(np)!==tOld){console.warn('LRN reflow text mismatch - aborted');np=sn.fallback(us);if(txt(np)!==tOld)return false}
 if(pg.length-(e-k+1)+np.length>MAXP){toast('Note is too long (max '+MAXP+' pages)');return 'toolong'}
 const co=M.ed&&M.cur===k?caretOff(M.ed):null;
 if(np.length===e-k+1&&np.every((h,i)=>h===(i?pg[k+i].h:h0)))return false;
 const bgs=[];for(let j=k;j<=e;j++)bgs.push(pg[j].bg);
 pg.splice(k,e-k+1,...np.map((h,i)=>({h,bg:bgs[Math.min(i,bgs.length-1)],ov:i?true:pg[k]?pg[k].ov:false})));
 if(co!=null){let acc=0,tgt=0,pos=co;for(let i=0;i<np.length;i++){const l=rt.text(np[i]).length;if(co<=acc+l||i===np.length-1){tgt=i;pos=Math.max(0,co-acc);break}acc+=l}M.cur=k+tgt;M.caret=pos}
 return true};
/* ---------- manager library ---------- */
const cache=new Map(),alltext=it=>{const key=it.id+':'+it.updated;let v=cache.get(key);if(v==null){v=it.pages.map(p=>rt.plain(p.h)).join(' ');cache.set(key,v);if(cache.size>500)cache.clear()}return v};
const fd=t=>t?new Date(t).toLocaleDateString():'—';
L.libs.sn={name:'Sticky notes',maker:'Sticky note maker',makerInfo:'A small stack of one-sided pages for definitions, formulas and lists. Text that overflows a page flows onto the next page automatically.',
 title:i=>i.t,text:alltext,prev:i=>E(rt.plain(i.pages[0]?i.pages[0].h:'').slice(0,110)),
 sorts:[['t','Title',(a,b)=>a.t.localeCompare(b.t)],['created','Created',(a,b)=>a.created-b.created],['updated','Updated',(a,b)=>a.updated-b.updated],['pages','Pages',(a,b)=>a.pages.length-b.pages.length],['ord','Manual order',()=>0]],
 groups:[['','No grouping'],['folder','Folder',i=>[L.fp('sn',i.folder)||'Unfiled']],['label','Label',i=>i.labels&&i.labels.length?i.labels:['No label']]],filters:[],
 ico:i=>`<span class="lrn-card-ico" style="background:${L.col(i.color)}">${E(i.emoji||'📝')}</span>`,
 sub:i=>`${i.pages.length} page${i.pages.length===1?'':'s'} · updated ${fd(i.updated)}`,
 chips:()=>{const s=L.D('sn');return `<i class="lb">${s.items.length} notes</i><i class="lb">${s.items.filter(i=>i.fav).length} ★</i><i class="lb">${s.folders.length} folders</i>`},
 open:it=>sn.view(it),edit:id=>sn.openMaker(id),
 empty:{msg:'No sticky notes yet.',btn:'Create new',fn:'LRN.sn.create()'},
 settings:()=>`<label>New-note page colour</label><div>${BG.map(c=>`<button class="lrn-sw" style="background:${c}" aria-label="Page colour ${c}" onclick="LRN.sn.setDef('${c}')"></button>`).join('')}</div><small style="color:var(--mu)">Current: ${E(L.D('sn').def.bg||BG[0])}</small>`};
sn.setDef=c=>{L.D('sn').def.bg=c;L.sv('sn');L.itab('sn','settings')};
sn.create=()=>L.confirm('Open the sticky note maker?',{onYes:()=>sn.openMaker(null)});
/* ---------- maker ---------- */
const CID='lrn-sn';
const pcopy=p=>({h:p.h,bg:p.bg,ov:!!p.ov});
function sig(M){flushLive(M);return JSON.stringify([M.t,M.d,M.labels,M.folder,M.color,M.emoji,M.fav,M.pages.map(p=>[normH(rt.clean(p.h)),p.bg,!!p.ov])])}
function flushLive(M){if(M.ed&&M.pages[M.cur])M.pages[M.cur].h=M.ed.innerHTML}
sn.openMaker=function(id,fromDraft){const vid=L.vid();L.ensure(vid);const key=id||'new',dr=L.draft.get(vid,'sn',key);
 if(dr&&!fromDraft)L.confirm('Restore draft?',{detail:'An unsaved draft of this note was found.',yes:'Restore',no:'Discard',onYes:()=>sn.build(id,dr.data),onNo:()=>{L.draft.del(vid,'sn',key);sn.build(id,null)}});else sn.build(id,null)};
sn.build=function(id,data){if(sn.M)return;const vid=L.vid(),s=db.get(vid).sn,it=id?s.items.find(x=>x.id===id):null;if(id&&!it)return toast('Note not found');
 const bg=s.def.bg||BG[0],src=data||it||{},M=sn.M={vid,id:id||null,t:src.t||'',d:src.d||'',labels:(src.labels||[]).slice(),folder:src.folder||'',color:src.color||bg,emoji:src.emoji||'📝',fav:!!src.fav,pages:(src.pages&&src.pages.length?src.pages:[{h:EMPTY,bg,ov:false}]).map(p=>({h:rt.clean(p.h)||EMPTY,bg:/^#[0-9a-f]{3,8}$/i.test(p.bg||'')?p.bg:bg,ov:!!p.ov})),cur:Math.min(src.cur|0,(src.pages||[1]).length-1)||0,hist:[],hi:-1,busy:false};
 if(!M.pages[M.cur])M.cur=0;
 const base=it?{t:it.t,d:it.d,labels:it.labels,folder:it.folder,color:it.color,emoji:it.emoji,fav:it.fav,pages:it.pages}:{t:'',d:'',labels:[],folder:'',color:bg,emoji:'📝',fav:false,pages:[{h:EMPTY,bg,ov:false}]};
 M.base=JSON.stringify([base.t,base.d,base.labels,base.folder,base.color,base.emoji,base.fav,base.pages.map(p=>[normH(rt.clean(p.h)),p.bg,!!p.ov])]);
 M.lay=L.layer(`<div class="lrn-top"><button class="g" onclick="LRN.sn.act('close')">✕ Close</button><b>Sticky note maker</b><small id="lrn-st" style="color:var(--mu)"></small><span style="flex:1"></span><button onclick="LRN.sn.act('save')" aria-label="Save">💾 Save</button></div><div class="lrn-body">${rt.toolbar(CID)}<div class="row" style="justify-content:center;margin-bottom:6px"><small style="color:var(--mu)">Page colour</small><span id="lrn-bgs">${BG.map(c=>`<button class="lrn-sw" style="background:${c}" aria-label="Page colour ${c}" onclick="LRN.sn.act('bg','${c}')"></button>`).join('')}</span><input type="color" id="lrn-bgc" aria-label="Custom page colour" style="width:34px;height:26px;padding:1px" oninput="LRN.sn.act('bg',this.value)"></div><div class="lrn-fit" data-res="360"><div class="lrn-page" id="lrn-ed" contenteditable="true" role="textbox" aria-multiline="true" aria-label="Page content"></div></div><div class="row" style="justify-content:center;margin:8px 0"><button class="g" onclick="LRN.sn.act('prev')" aria-label="Previous page">◀</button><b id="lrn-pc"></b><button class="g" onclick="LRN.sn.act('next')" aria-label="Next page">▶</button><button class="g" onclick="LRN.sn.act('add')">＋ Add page</button><button class="g" onclick="LRN.sn.act('del')">🗑 Delete page</button><button class="g" onclick="LRN.sn.act('left')" aria-label="Move page earlier">⇦</button><button class="g" onclick="LRN.sn.act('right')" aria-label="Move page later">⇨</button><select id="lrn-jmp" aria-label="Jump to page" onchange="LRN.sn.act('go',this.value)" style="width:auto"></select></div><div class="lrn-thumbs" id="lrn-th"></div></div>`,{cls:'lrn-mk',label:'Sticky note maker',esc:()=>sn.act('close')});
 const ed=M.ed=$('lrn-ed');try{document.execCommand('defaultParagraphSeparator',false,'p')}catch(e){}
 rt.bind(CID,ed,{change:p=>onChange(p),undo:()=>hist(-1),redo:()=>hist(1)});
 ed.addEventListener('input',()=>onChange());ed.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&/^s$/i.test(e.key)){e.preventDefault();sn.act('save')}else if((e.ctrlKey||e.metaKey)&&/^z$/i.test(e.key)&&!e.shiftKey){e.preventDefault();hist(-1)}else if((e.ctrlKey||e.metaKey)&&(/^y$/i.test(e.key)||(e.shiftKey&&/^z$/i.test(e.key)))){e.preventDefault();hist(1)}});
 ed.addEventListener('paste',()=>{M.big=1});
 show(M.cur);histPush();L.fit();ed.focus()};
function show(i,caret){const M=sn.M;if(!M)return;M.cur=i;const p=M.pages[i];M.ed.innerHTML=p.h;M.ed.style.background=p.bg;paintUI();if(caret!=null)setCaret(M.ed,caret)}
function paintUI(){const M=sn.M;if(!M)return;const n=M.pages.length;$('lrn-pc').textContent=`Page ${M.cur+1} of ${n}`;$('lrn-jmp').innerHTML=M.pages.map((p,i)=>`<option value="${i}"${i===M.cur?' selected':''}>Page ${i+1}</option>`).join('');
 $('lrn-th').innerHTML=M.pages.map((p,i)=>`<button class="lrn-th${i===M.cur?' on':''}" style="background:${L.col(p.bg)}" aria-label="Go to page ${i+1}" onclick="LRN.sn.act('go',${i})">${i+1}</button>`).join('');$('lrn-bgc').value=/^#[0-9a-f]{6}$/i.test(M.pages[M.cur].bg)?M.pages[M.cur].bg:'#ffffff';const st=$('lrn-st');if(st)st.textContent=M.dirty?'· unsaved changes':''}
let rtm=null,dtm=null,htm=null;
function onChange(paste){const M=sn.M;if(!M)return;M.dirty=true;M.pages[M.cur].h=M.ed.innerHTML;clearTimeout(rtm);rtm=setTimeout(doReflow,paste?0:70);clearTimeout(dtm);dtm=setTimeout(saveDraft,1500);clearTimeout(htm);htm=setTimeout(histPush,500);const st=$('lrn-st');if(st)st.textContent='· unsaved changes'}
async function doReflow(){const M=sn.M;if(!M)return;if(M.busy){M.again=true;return}M.busy=true;try{const k=M.cur,r=await sn.reflow(M,k);if(sn.M!==M)return;if(r==='toolong'){hist(-1,true)}else if(r){const c=M.caret;show(M.cur,c);M.caret=null;histPush()}else paintUI()}finally{M.busy=false;if(M.again&&sn.M===M){M.again=false;doReflow()}}}
function snapshot(M){return JSON.stringify([M.pages.map(pcopy),M.cur])}
function histPush(){const M=sn.M;if(!M)return;flushLive(M);const s=snapshot(M);if(M.hist[M.hi]===s)return;M.hist=M.hist.slice(0,M.hi+1);M.hist.push(s);if(M.hist.length>100)M.hist.shift();M.hi=M.hist.length-1}
function hist(d,quiet){const M=sn.M;if(!M)return;if(!quiet)histPush();const t=M.hi+d;if(t<0||t>=M.hist.length)return;M.hi=t;const[p,c]=JSON.parse(M.hist[t]);M.pages=p.map(pcopy);show(Math.min(c,M.pages.length-1));M.dirty=true;paintUI()}
function draftData(M){flushLive(M);return{id:M.id,t:M.t,d:M.d,labels:M.labels,folder:M.folder,color:M.color,emoji:M.emoji,fav:M.fav,cur:M.cur,pages:M.pages.map(p=>({h:rt.clean(p.h),bg:p.bg,ov:!!p.ov}))}}
function saveDraft(){const M=sn.M;if(!M||!M.dirty)return;try{L.draft.put(M.vid,'sn',M.id||'new',draftData(M))}catch(e){}}
addEventListener('pagehide',()=>{saveDraft();db.flush()});
sn.act=function(a,v){const M=sn.M;if(!M)return;flushLive(M);
 if(a==='close')return closeAsk();
 if(a==='save')return saveDlg();
 if(a==='bg'){M.pages[M.cur].bg=v;M.ed.style.background=v;onChange();paintUI();return}
 if(a==='prev'&&M.cur>0)return show(M.cur-1);if(a==='next'&&M.cur<M.pages.length-1)return show(M.cur+1);if(a==='go')return show(+v);
 if(a==='add'){if(M.pages.length>=MAXP)return toast('Maximum '+MAXP+' pages');M.pages.splice(M.cur+1,0,{h:EMPTY,bg:M.pages[M.cur].bg,ov:false});M.dirty=true;show(M.cur+1);histPush();return onChange()}
 if(a==='del'){const doit=()=>{const p=M.pages;if(p.length===1){p[0]={h:EMPTY,bg:p[0].bg,ov:false}}else{const was=p[M.cur];p.splice(M.cur,1);if(!was.ov&&p[M.cur]&&p[M.cur].ov)p[M.cur].ov=false;M.cur=Math.min(M.cur,p.length-1)}M.dirty=true;show(M.cur);histPush();onChange()};
  if(rt.text(M.pages[M.cur].h).trim())L.confirm('Delete this page?',{detail:'Its content will be removed.',yes:'Delete',no:'Keep',noYN:1,onYes:doit});else doit();return}
 if(a==='left'||a==='right'){const j=M.cur+(a==='left'?-1:1);if(j<0||j>=M.pages.length)return;const p=M.pages;[p[M.cur],p[j]]=[p[j],p[M.cur]];p[M.cur].ov=p[j].ov=false;if(p[Math.max(M.cur,j)+1])p[Math.max(M.cur,j)+1].ov=false;M.dirty=true;show(j);histPush();return onChange()}};
function closeAsk(){const M=sn.M;if(!M)return;if(sig(M)!==M.base)L.confirm('Discard changes?',{detail:'Your unsaved changes to this note will be lost.',yes:'Discard',no:'Keep editing',onYes:()=>closeMaker(true)});else closeMaker(true)}
function closeMaker(dropDraft){const M=sn.M;if(!M)return;[rtm,dtm,htm].forEach(clearTimeout);if(dropDraft)L.draft.del(M.vid,'sn',M.id||'new');sn.M=null;L.close(M.lay)}
function saveDlg(){const M=sn.M;flushLive(M);const s=db.get(M.vid).sn;const pagesOk=M.pages.some(p=>rt.text(p.h).trim());if(!pagesOk)return toast('Add some text before saving');
 const first=rt.plain(M.pages[0].h).slice(0,60),fo=(p,d)=>s.folders.filter(f=>(f.parent||'')===p).map(f=>`<option value="${f.id}"${f.id===M.folder?' selected':''}>${'\u00a0\u00a0'.repeat(d)}${E(f.name)}</option>`+fo(f.id,d+1)).join('');
 L.form({title:'Save sticky note',wide:1,body:`<label>Title *<input id="sv_t" maxlength="80" value="${E(M.t||first)}" aria-required="true"></label><div class="lrn-err" data-err="t"></div><label>Description<textarea id="sv_d" rows="2" maxlength="300">${E(M.d)}</textarea></label><div class="lrn-err" data-err="d"></div><label>Labels (comma separated)<input id="sv_l" value="${E(M.labels.join(', '))}"></label><label>Folder<select id="sv_f"><option value="">Unfiled</option>${fo('',0)}</select></label><label>…or create a new folder<input id="sv_nf" maxlength="40" placeholder="New folder name (optional)"></label><div class="lrn-err" data-err="nf"></div><div class="row"><label style="margin:0">Colour <input type="color" id="sv_c" value="${/^#[0-9a-f]{6}$/i.test(M.color)?M.color:'#fff7b8'}"></label><label style="margin:0">Emoji <input id="sv_e" maxlength="4" style="width:70px" value="${E(M.emoji)}"></label><label style="margin:0"><input type="checkbox" id="sv_s" style="width:auto" ${M.fav?'checked':''}> ★ Favourite</label></div>`,
  onOk:el=>{const q=x=>el.querySelector(x),t=q('#sv_t').value.trim(),d=q('#sv_d').value.trim(),err={};if(!t)err.t='Title is required';else if(t.length>80)err.t='Title must be 80 characters or fewer';if(d.length>300)err.d='Description must be 300 characters or fewer';const nf=q('#sv_nf').value.trim();if(nf.length>40)err.nf='Folder name must be 40 characters or fewer';if(Object.keys(err).length)return err;
   let folder=q('#sv_f').value;if(nf){const f={id:L.uid(),name:nf,desc:'',color:'#e0a030',emoji:'📁',parent:folder};s.folders.push(f);folder=f.id}
   let pg=M.pages.map(p=>({h:rt.clean(p.h)||EMPTY,bg:p.bg,ov:!!p.ov}));while(pg.length>1&&!rt.text(pg[pg.length-1].h).trim())pg.pop();
   const data={t,d,labels:[...new Set(q('#sv_l').value.split(',').map(x=>x.trim().slice(0,30)).filter(Boolean))],folder,fav:q('#sv_s').checked,color:q('#sv_c').value,emoji:L.emo(q('#sv_e').value)||'📝',pages:pg,updated:Date.now()};
   let it=M.id&&s.items.find(x=>x.id===M.id);if(it)Object.assign(it,data);else{it=Object.assign(L.mkNote({}),data,{created:Date.now()});s.items.push(it)}
   db.set(M.vid,db.get(M.vid));L.draft.del(M.vid,'sn',M.id||'new');closeMaker(false);toast('Saved');if(L.vid()===M.vid)L.refresh()}})}
/* ---------- revision viewer ---------- */
sn.view=function(it){let order=it.pages.map((p,i)=>i),pos=0,sh=false;const pages=it.pages.map(p=>({h:rt.clean(p.h),bg:L.col(p.bg)}));
 const lay=L.layer(`<div class="lrn-top"><button class="g" onclick="LRN.sn.vclose()">✕ Close</button><b>${E(it.t)}</b><span style="flex:1"></span><button class="g" id="lrn-vsh" aria-pressed="false" onclick="LRN.sn.vshuf()">🔀 Shuffle: off</button><button class="g" onclick="LRN.sn.vedit()">✎ Edit</button></div><div class="lrn-body" style="display:flex;flex-direction:column;align-items:center;gap:10px"><div class="lrn-fit" data-res="190" data-max="3"><div class="lrn-page lrn-view" id="lrn-vp"></div></div><div class="row"><button class="g" onclick="LRN.sn.vnav(-1)" aria-label="Previous page">◀ Previous</button><b id="lrn-vc"></b><button class="g" onclick="LRN.sn.vnav(1)" aria-label="Next page">Next ▶</button></div><small style="color:var(--mu)">← → keys to turn pages · Esc to close</small></div>`,{cls:'lrn-vw',label:'Revision viewer',key:e=>{if(e.key==='ArrowRight'||e.key==='PageDown'){e.preventDefault();nav(1)}else if(e.key==='ArrowLeft'||e.key==='PageUp'){e.preventDefault();nav(-1)}}});
 const paint=()=>{const p=pages[order[pos]],el=$('lrn-vp');el.innerHTML=p.h;el.style.background=p.bg;$('lrn-vc').textContent=`Page ${pos+1} of ${order.length}`;L.fit()};
 const nav=d=>{pos=Math.max(0,Math.min(order.length-1,pos+d));paint()};
 sn._v={nav,close:()=>L.close(lay),edit:()=>L.confirm(`Open “${it.t}” in the maker?`,{onYes:()=>{L.close(lay);sn.openMaker(it.id)}}),shuf:()=>{sh=!sh;const cur=order[pos];if(sh){for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}}else order=it.pages.map((p,i)=>i);pos=Math.max(0,order.indexOf(cur));const b=$('lrn-vsh');b.textContent='🔀 Shuffle: '+(sh?'on':'off');b.setAttribute('aria-pressed',sh);paint()}};paint()};
sn.vnav=d=>sn._v&&sn._v.nav(d);sn.vclose=()=>sn._v&&sn._v.close();sn.vedit=()=>sn._v&&sn._v.edit();sn.vshuf=()=>sn._v&&sn._v.shuf();
/* ---------- draft prompt after refresh / accidental close ---------- */
sn.checkDrafts=function(){if(sn.M||L.depth())return;const vid=L.vid();if(vid==null)return;const d=L.draft.list(vid,'sn').find(x=>!sn.offered.has(vid+':'+x.key));if(!d)return;sn.offered.add(vid+':'+d.key);
 L.confirm('Restore draft?',{detail:`An unsaved sticky note draft${d.data&&d.data.t?` “${d.data.t}”`:''} was found.`,yes:'Restore',no:'Discard',onYes:()=>sn.build(d.data.id||null,d.data),onNo:()=>L.draft.del(vid,'sn',d.key)})};
})(window.LRN);

/*LRN:FLASHCARDS*/
(function(L){'use strict';
const $=id=>document.getElementById(id),E=L.E,rt=L.rt,db=L.db;
const LIM=600,EMPTY='<p><br></p>',RINGS=['#2f55d4','#d43f5a','#2fa36b','#e0a030','#8a5fd4','#26a5b8','#8b8b95','#161616'];
const fc=L.fc={M:null,S:null,offered:new Set()};
const fd=t=>t?new Date(t).toLocaleDateString():'—';
const normH=h=>/^(<p><br><\/p>|<div><br><\/div>|<br>|)$/.test(h)?'':h;
const empt=h=>!rt.text(h).trim();
const plen=el=>el.textContent.length;
const mkCard=()=>({id:L.uid(),f:EMPTY,b:EMPTY,h:'',k:0,m:0});
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const grp=[['','No grouping'],['folder','Folder',i=>[L.fp('fc',i.folder)||'Unfiled']],['label','Label',i=>i.labels&&i.labels.length?i.labels:['No label']]];
const deckOf=(vid,id)=>db.get(vid).fc.items.find(x=>x.id===id);
const known=i=>{const c=i.cards||[],k=c.reduce((a,x)=>a+(x.k||0),0),m=c.reduce((a,x)=>a+(x.m||0),0);return k+m?Math.round(100*k/(k+m)):0};
/* ---------- manager registration ---------- */
L.libs.fc={name:'Flashcards',maker:'Flashcard maker',makerInfo:'Two-sided ring-binder decks: information on both sides of every card. Build a deck, then study it with a flip animation, “Knew it / Missed it” tracking and a review-only-missed round. A deck can also be turned into a quiz.',
 title:i=>i.t,text:i=>(i.cards||[]).map(c=>rt.plain(c.f||'')+' '+rt.plain(c.b||'')).join(' '),
 sorts:[['t','Title',(a,b)=>a.t.localeCompare(b.t)],['created','Created',(a,b)=>a.created-b.created],['updated','Updated',(a,b)=>a.updated-b.updated],['cards','Cards',(a,b)=>(a.cards||[]).length-(b.cards||[]).length],['studied','Last studied',(a,b)=>(a.studied||0)-(b.studied||0)],['ord','Manual order',()=>0]],groups:grp,filters:[],
 ico:i=>`<span class="lrn-card-ico" style="background:${L.col(i.ring||'#2f55d4')}">${E(i.emoji||'🗂')}</span>`,
 sub:i=>{const n=(i.cards||[]).length;return `${n} card${n===1?'':'s'} · known ${known(i)}% · studied ${fd(i.studied)}`},
 chips:()=>{const s=L.D('fc');return `<i class="lb">${s.items.length} decks</i><i class="lb">${s.items.filter(i=>i.fav).length} ★</i><i class="lb">${s.folders.length} folders</i>`},
 copy:it=>{const c=L.copyItem('fc',it);c.cards.forEach(x=>{x.id=L.uid();x.k=0;x.m=0});c.studied=0;delete c.sess;return c},
 open:it=>fc.study(it.id),edit:id=>fc.openMaker(id),
 empty:{msg:'No flashcard decks yet. (Your old flashcards, if any, appear as “Imported cards”.)',btn:'Create new deck',fn:'LRN.fc.create()'},
 settings:()=>{const d=L.D('fc').def.ring||RINGS[0];return `<label>New-deck ring colour</label><div>${RINGS.map(c=>`<button class="lrn-sw" style="background:${c};${c===d?'outline:2px solid #fff':''}" aria-label="Ring colour ${c}" onclick="LRN.fc.setDef('${c}')"></button>`).join('')}</div><small style="color:var(--mu)">Current: ${E(d)}</small>`}};
fc.setDef=c=>{L.D('fc').def.ring=c;L.sv('fc');L.itab('fc','settings')};
fc.create=()=>L.confirm('Open the flashcard maker?',{onYes:()=>fc.openMaker(null)});
/* ---------- card rendering (shared by preview + study) ---------- */
function face(h,cls){const t=rt.text(h).length,fs=t<=80?30:t<=220?24:t<=400?19:16,c=rt.clean(h);return `<div class="lrn-fs ${cls}"><div class="lrn-fsc" style="font-size:${fs}px">${normH(c)?c:'<span style="opacity:.4">(empty)</span>'}</div></div>`}
function cardHTML(a,b,ring,fl,idn){return `<div class="lrn-fit" data-w="560" data-h="360" data-res="340" data-max="1.5"><div class="lrn-fcw" onclick="LRN.fc.flip('${idn}')"><div class="lrn-fcd${fl?' fl':''}" id="${idn}">${face(a,'fr')}${face(b,'bk')}</div><div class="lrn-rings" style="--ring:${L.col(ring)}"><i></i><i></i><i></i></div></div></div>`}
fc.flip=idn=>{const e=$(idn);if(e)e.classList.toggle('fl')};
/* ================= MAKER ================= */
const CF='lrn-fcF',CB='lrn-fcB';
function sig(M){flush(M);return JSON.stringify([M.t,M.d,M.labels,M.folder,M.ring,M.emoji,M.fav,M.cards.map(c=>[normH(rt.clean(c.f)),normH(rt.clean(c.b)),c.h||''])])}
function flush(M){if(!M||!M.edF)return;const c=M.cards[M.cur];if(c){c.f=M.edF.innerHTML;c.b=M.edB.innerHTML;c.h=($('lrn-eh')?$('lrn-eh').value:c.h).slice(0,120)}}
fc.openMaker=function(id){const vid=L.vid();L.ensure(vid);const key=id||'new',dr=L.draft.get(vid,'fc',key);
 if(dr)L.confirm('Restore draft?',{detail:'An unsaved draft of this deck was found.',yes:'Restore',no:'Discard',onYes:()=>fc.build(id,dr.data),onNo:()=>{L.draft.del(vid,'fc',key);fc.build(id,null)}});else fc.build(id,null)};
fc.build=function(id,data){if(fc.M)return;const vid=L.vid(),s=db.get(vid).fc,it=id?s.items.find(x=>x.id===id):null;if(id&&!it)return toast('Deck not found');
 const ring=s.def.ring||RINGS[0],src=data||it||{};
 const M=fc.M={vid,id:id||null,t:src.t||'',d:src.d||'',labels:(src.labels||[]).slice(),folder:src.folder||'',ring:src.ring||ring,emoji:src.emoji||'🗂',fav:!!src.fav,
  cards:(src.cards&&src.cards.length?src.cards:[mkCard()]).map(c=>({id:c.id||L.uid(),f:rt.clean(c.f)||EMPTY,b:rt.clean(c.b)||EMPTY,h:String(c.h||'').slice(0,120),k:c.k|0,m:c.m|0})),cur:0,q:'',dirty:false,good:{f:EMPTY,b:EMPTY}};
 const bs=it?it:{t:'',d:'',labels:[],folder:'',ring,emoji:'🗂',fav:false,cards:[mkCard()]};
 M.base=JSON.stringify([bs.t,bs.d,bs.labels,bs.folder,bs.ring,bs.emoji,bs.fav,bs.cards.map(c=>[normH(rt.clean(c.f)),normH(rt.clean(c.b)),c.h||''])]);
 const side=(n,c,cid,l)=>`<div class="lrn-fside"><b>${l}</b>${rt.toolbar(cid)}<div class="lrn-face" id="lrn-e${n}" contenteditable="true" role="textbox" aria-multiline="true" aria-label="${l} of card"></div><div class="lrn-cnt" id="lrn-c${n}" aria-live="polite"></div></div>`;
 M.lay=L.layer(`<div class="lrn-top"><button class="g" onclick="LRN.fc.act('close')">✕ Close</button><b>Flashcard maker</b><small id="lrn-fst" style="color:var(--mu)"></small><span style="flex:1"></span><button class="g" onclick="LRN.fc.act('preview')">👁 Preview</button><button onclick="LRN.fc.act('save')" aria-label="Save">💾 Save</button></div><div class="lrn-body"><div class="lrn-fcm"><div class="card lrn-rail"><input type="search" id="lrn-rq" aria-label="Search within deck" placeholder="Search in deck…" oninput="LRN.fc.act('q',this.value)"><div class="row" style="margin:6px 0"><button class="g" onclick="LRN.fc.act('add')" aria-label="Add card">＋ Add</button><button class="g" onclick="LRN.fc.act('dup')" aria-label="Duplicate card">⧉</button><button class="g" onclick="LRN.fc.act('up')" aria-label="Move card up">⇧</button><button class="g" onclick="LRN.fc.act('down')" aria-label="Move card down">⇩</button><button class="x" onclick="LRN.fc.act('del')" aria-label="Delete card">🗑</button></div><small id="lrn-rc" style="color:var(--mu)"></small><div id="lrn-rl" class="lrn-rl"></div></div><div><div class="lrn-faces">${side('f',0,CF,'Front')}${side('b',0,CB,'Back')}</div><label>Hint (optional, shown during study on request)<input id="lrn-eh" maxlength="120" aria-label="Hint"></label><div class="lrn-err" id="lrn-fm" role="status"></div></div></div></div>`,{cls:'lrn-mk',label:'Flashcard maker',esc:()=>fc.act('close')});
 M.edF=$('lrn-ef');M.edB=$('lrn-eb');try{document.execCommand('defaultParagraphSeparator',false,'p')}catch(e){}
 [['f',CF,M.edF],['b',CB,M.edB]].forEach(([n,cid,ed])=>{
  rt.bind(cid,ed,{change:()=>onFace(n),onPaste:html=>pasteOk(n,html)});
  ed.addEventListener('input',()=>onFace(n));
  ed.addEventListener('beforeinput',e=>{const t=e.inputType||'';if(!/^insert/.test(t)||/Paste|Paragraph|LineBreak|Composition|Drop/.test(t))return;const add=(e.data||'').length||1;if(plen(ed)-selLen(ed)+add>LIM){e.preventDefault();msg(`Limit reached: a card face holds at most ${LIM} characters.`)}});
  ed.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&/^s$/i.test(e.key)){e.preventDefault();fc.act('save')}});
  ed.addEventListener('drop',e=>{const dt=e.dataTransfer;if(dt&&(dt.getData('text/plain')||'').length+plen(ed)>LIM){e.preventDefault();msg(`Drop rejected: it would exceed ${LIM} characters.`)}});});
 $('lrn-eh').addEventListener('input',()=>{M.dirty=true;M.cards[M.cur].h=$('lrn-eh').value;touch()});
 load(0);L.fit();M.edF.focus()};
function selLen(ed){const s=getSelection();return s.rangeCount&&ed.contains(s.anchorNode)?s.toString().length:0}
let mt=null;function msg(t){const e=$('lrn-fm');if(e){e.textContent=t;clearTimeout(mt);mt=setTimeout(()=>{if(e)e.textContent=''},4000)}}
function pasteOk(n,html){const M=fc.M,ed=n==='f'?M.edF:M.edB,add=rt.text(html).length;if(plen(ed)-selLen(ed)+add>LIM){msg(`Paste rejected: it would exceed the ${LIM}-character limit on this side (${add} characters pasted, ${LIM-plen(ed)+selLen(ed)} free). Shorten the text and try again.`);return false}return true}
function counters(){const M=fc.M;if(!M)return;[['f',M.edF],['b',M.edB]].forEach(([n,ed])=>{const c=plen(ed),e=$('lrn-c'+n);e.textContent=`${c} / ${LIM}`+(c>=LIM?' - limit reached':c>=LIM*.9?' - almost full':'');e.className='lrn-cnt'+(c>=LIM?' full':c>=LIM*.9?' warn':'')})}
function onFace(n){const M=fc.M;if(!M)return;const ed=n==='f'?M.edF:M.edB;if(plen(ed)>LIM){ed.innerHTML=M.good[n];msg(`Text exceeded ${LIM} characters and was not accepted.`)}else M.good[n]=ed.innerHTML;M.cards[M.cur][n]=ed.innerHTML;M.dirty=true;counters();touch();rail()}
let dtm=null;function touch(){const M=fc.M;if(!M)return;const s=$('lrn-fst');if(s)s.textContent='· unsaved changes';clearTimeout(dtm);dtm=setTimeout(saveDraft,1500)}
function load(i){const M=fc.M;if(!M)return;M.cur=Math.max(0,Math.min(M.cards.length-1,i));const c=M.cards[M.cur];M.edF.innerHTML=c.f;M.edB.innerHTML=c.b;M.good={f:M.edF.innerHTML,b:M.edB.innerHTML};$('lrn-eh').value=c.h||'';counters();rail()}
function rail(){const M=fc.M;if(!M)return;const q=(M.q||'').toLowerCase(),n=M.cards.length;$('lrn-rc').textContent=`Card ${M.cur+1} of ${n}`;
 $('lrn-rl').innerHTML=M.cards.map((c,i)=>({c,i})).filter(x=>!q||(rt.plain(x.c.f)+' '+rt.plain(x.c.b)+' '+(x.c.h||'')).toLowerCase().includes(q)).map(({c,i})=>`<div class="lrn-ri${i===M.cur?' on':''}" tabindex="0" role="button" draggable="true" aria-label="Card ${i+1}" ondragstart="LRN.fc.act('ds',${i})" ondragover="event.preventDefault()" ondrop="LRN.fc.act('dr',${i})" onclick="LRN.fc.act('go',${i})" onkeydown="if(event.key==='Enter'){LRN.fc.act('go',${i})}"><b>${i+1}</b><span>${E(rt.plain(c.f).slice(0,28)||'(empty)')}<br><small>${E(rt.plain(c.b).slice(0,28)||'(empty)')}</small></span></div>`).join('')||'<small style="color:var(--mu)">No cards match.</small>'}
fc.act=function(a,v){const M=fc.M;if(!M)return;
 if(a==='q'){M.q=v;return rail()}
 if(a==='close')return closeAsk();
 flush(M);
 if(a==='go'){load(+v);return}
 if(a==='add'){if(M.cards.length>=500)return toast('Maximum 500 cards per deck');M.cards.splice(M.cur+1,0,mkCard());M.dirty=true;load(M.cur+1);touch();M.edF.focus();return}
 if(a==='dup'){const c=M.cards[M.cur],n=Object.assign({},c,{id:L.uid(),k:0,m:0});M.cards.splice(M.cur+1,0,n);M.dirty=true;load(M.cur+1);touch();return}
 if(a==='del'){const doit=()=>{if(M.cards.length===1)M.cards[0]=mkCard();else M.cards.splice(M.cur,1);M.dirty=true;load(Math.min(M.cur,M.cards.length-1));touch()};const c=M.cards[M.cur];if(!empt(c.f)||!empt(c.b))L.confirm('Delete this card?',{yes:'Delete',no:'Keep',noYN:1,onYes:doit});else doit();return}
 if(a==='up'||a==='down'){const j=M.cur+(a==='up'?-1:1);if(j<0||j>=M.cards.length)return;[M.cards[M.cur],M.cards[j]]=[M.cards[j],M.cards[M.cur]];M.dirty=true;load(j);touch();return}
 if(a==='ds'){M.dragI=+v;return}
 if(a==='dr'){const f=M.dragI,t=+v;M.dragI=null;if(f==null||f===t)return;const[c]=M.cards.splice(f,1);M.cards.splice(t,0,c);M.dirty=true;load(t);touch();return}
 if(a==='preview')return preview();
 if(a==='save')return trySave()};
function preview(){const M=fc.M;flush(M);const c=M.cards[M.cur];let lay;lay=L.layer(`<div class="lrn-top"><button class="g" data-x>✕ Close preview</button><b>Preview · card ${M.cur+1}</b></div><div class="lrn-body" style="display:flex;flex-direction:column;align-items:center;gap:10px">${cardHTML(c.f,c.b,M.ring,false,'lrn-pvd')}<button class="g" data-f>↻ Flip</button><small style="color:var(--mu)">Click the card or press Space to flip · Esc closes</small></div>`,{cls:'lrn-vw',label:'Card preview',key:e=>{if(e.key===' '&&e.target.tagName!=='SELECT'){e.preventDefault();fc.flip('lrn-pvd')}}});
 lay.el.querySelector('[data-x]').onclick=()=>L.close(lay);lay.el.querySelector('[data-f]').onclick=()=>fc.flip('lrn-pvd');L.fit()}
function closeAsk(){const M=fc.M;if(!M)return;if(sig(M)!==M.base)L.confirm('Discard changes?',{detail:'Your unsaved changes to this deck will be lost.',yes:'Discard',no:'Keep editing',onYes:()=>closeMaker(true)});else closeMaker(true)}
function closeMaker(drop){const M=fc.M;if(!M)return;clearTimeout(dtm);clearTimeout(mt);if(drop)L.draft.del(M.vid,'fc',M.id||'new');fc.M=null;L.close(M.lay)}
function draftData(M){flush(M);return{id:M.id,t:M.t,d:M.d,labels:M.labels,folder:M.folder,ring:M.ring,emoji:M.emoji,fav:M.fav,cards:M.cards.map(c=>({id:c.id,f:rt.clean(c.f),b:rt.clean(c.b),h:c.h,k:c.k,m:c.m}))}}
function saveDraft(){const M=fc.M;if(!M||!M.dirty)return;try{L.draft.put(M.vid,'fc',M.id||'new',draftData(M))}catch(e){}}
addEventListener('pagehide',()=>{saveDraft();db.flush()});
function trySave(){const M=fc.M;flush(M);const emp=M.cards.filter(c=>empt(c.f)&&empt(c.b));
 if(emp.length){const first=M.cards.findIndex(c=>empt(c.f)&&empt(c.b));L.confirm(`Remove ${emp.length} empty card${emp.length===1?'':'s'}?`,{detail:'A card needs content on at least one side. Remove the empty cards and continue saving?',yes:'Remove',no:'Keep editing',noYN:1,
  onYes:()=>{M.cards=M.cards.filter(c=>!(empt(c.f)&&empt(c.b)));M.dirty=true;if(!M.cards.length){M.cards=[mkCard()];load(0);toast('A deck needs at least 1 card with content');return}load(0);saveDlg()},onNo:()=>load(first)});return}
 saveDlg()}
function saveDlg(){const M=fc.M,s=db.get(M.vid).fc;flush(M);
 const fo=(p,d)=>s.folders.filter(f=>(f.parent||'')===p).map(f=>`<option value="${f.id}"${f.id===M.folder?' selected':''}>${'\u00a0\u00a0'.repeat(d)}${E(f.name)}</option>`+fo(f.id,d+1)).join('');
 L.form({title:'Save flashcard deck',wide:1,body:`<label>Title *<input id="sv_t" maxlength="80" value="${E(M.t)}" aria-required="true"></label><div class="lrn-err" data-err="t"></div><label>Description<textarea id="sv_d" rows="2" maxlength="300">${E(M.d)}</textarea></label><div class="lrn-err" data-err="d"></div><label>Labels (comma separated)<input id="sv_l" value="${E(M.labels.join(', '))}"></label><label>Folder<select id="sv_f"><option value="">Unfiled</option>${fo('',0)}</select></label><label>…or create a new folder<input id="sv_nf" maxlength="40" placeholder="New folder name (optional)"></label><div class="lrn-err" data-err="nf"></div><div class="row"><label style="margin:0">Ring colour <input type="color" id="sv_c" value="${/^#[0-9a-f]{6}$/i.test(M.ring)?M.ring:RINGS[0]}"></label><span>${RINGS.map(c=>`<button type="button" class="lrn-sw" style="background:${c}" aria-label="Ring colour ${c}" onclick="document.getElementById('sv_c').value='${c}'"></button>`).join('')}</span></div><div class="row"><label style="margin:0">Emoji <input id="sv_e" maxlength="4" style="width:70px" value="${E(M.emoji)}"></label><label style="margin:0"><input type="checkbox" id="sv_s" style="width:auto" ${M.fav?'checked':''}> ★ Favourite</label></div>`,
  onOk:el=>{const q=x=>el.querySelector(x),t=q('#sv_t').value.trim(),d=q('#sv_d').value.trim(),err={};if(!t)err.t='Title is required';else if(t.length>80)err.t='Title must be 80 characters or fewer';if(d.length>300)err.d='Description must be 300 characters or fewer';const nf=q('#sv_nf').value.trim();if(nf.length>40)err.nf='Folder name must be 40 characters or fewer';if(Object.keys(err).length)return err;
   if(!M.cards.length)return 'A deck needs at least 1 card';
   let folder=q('#sv_f').value;if(nf){const f={id:L.uid(),name:nf,desc:'',color:'#e0a030',emoji:'📁',parent:folder};s.folders.push(f);folder=f.id}
   const data={t,d,labels:[...new Set(q('#sv_l').value.split(',').map(x=>x.trim().slice(0,30)).filter(Boolean))],folder,fav:q('#sv_s').checked,ring:q('#sv_c').value,emoji:L.emo(q('#sv_e').value)||'🗂',cards:M.cards.map(c=>({id:c.id,f:rt.clean(c.f)||EMPTY,b:rt.clean(c.b)||EMPTY,h:(c.h||'').slice(0,120),k:c.k|0,m:c.m|0})),updated:Date.now()};
   let it=M.id&&s.items.find(x=>x.id===M.id);if(it)Object.assign(it,data);else{it=Object.assign({id:L.uid(),created:Date.now(),studied:0},data);s.items.push(it)}
   db.set(M.vid,db.get(M.vid));L.draft.del(M.vid,'fc',M.id||'new');closeMaker(false);toast('Saved');if(L.vid()===M.vid)L.refresh()}})}
fc.checkDrafts=function(){if(fc.M||L.depth())return;const vid=L.vid();if(vid==null)return;const d=L.draft.list(vid,'fc').find(x=>!fc.offered.has(vid+':'+x.key));if(!d)return;fc.offered.add(vid+':'+d.key);
 L.confirm('Restore draft?',{detail:`An unsaved flashcard draft${d.data&&d.data.t?` “${d.data.t}”`:''} was found.`,yes:'Restore',no:'Discard',onYes:()=>fc.build(d.data.id||null,d.data),onNo:()=>L.draft.del(vid,'fc',d.key)})};
/* ================= STUDY MODE ================= */
fc.study=function(id){if(fc.S)return;const vid=L.vid(),deck=deckOf(vid,id);if(!deck)return toast('Deck not found');if(!(deck.cards||[]).length)return toast('This deck has no cards');
 const S=fc.S={vid,id,dir:'fb',sh:false,order:[],pos:0,res:{},dirs:{},hint:false,sum:null};
 S.lay=L.layer(`<div class="lrn-top"><button class="g" onclick="LRN.fc.sx('close')">✕ Close</button><b>${E(deck.t)}</b><span style="flex:1"></span><select aria-label="Direction" onchange="LRN.fc.sx('dir',this.value)" style="width:auto"><option value="fb">Front → back</option><option value="bf">Back → front</option><option value="rnd">Random side</option></select><button class="g" id="lrn-fsh" aria-pressed="false" onclick="LRN.fc.sx('shuf')">🔀 Shuffle: off</button><button class="g" onclick="LRN.fc.sx('quiz')">❓ Generate quiz</button><button class="g" onclick="LRN.fc.sx('fin')">Finish</button></div><div class="lrn-body" style="display:flex;flex-direction:column;align-items:center;gap:10px"><div class="lrn-bar" role="progressbar" aria-label="Progress" id="lrn-fbar"><i id="lrn-fbi"></i></div><small id="lrn-fpc" style="color:var(--mu)"></small><div id="lrn-fstg" style="width:100%"></div><div id="lrn-fht" style="min-height:1.4em;color:var(--mu)"></div><div class="row" id="lrn-fbt"></div></div>`,{cls:'lrn-vw lrn-st',label:'Flashcard study mode',onClose:()=>{if(fc.S===S)fc.S=null},key:e=>{if(S.sum)return;if(e.key===' '&&e.target.tagName!=='SELECT'){e.preventDefault();fc.flip('lrn-fcd')}else if(e.key==='ArrowRight'&&e.target.tagName!=='SELECT'){e.preventDefault();fc.sx('nav',1)}else if(e.key==='ArrowLeft'&&e.target.tagName!=='SELECT'){e.preventDefault();fc.sx('nav',-1)}}});
 start(deck.cards.map(c=>c.id))};
function dirs(){const S=fc.S;S.dirs={};S.order.forEach(i=>S.dirs[i]=S.dir==='rnd'?(Math.random()<.5?'fb':'bf'):S.dir)}
function start(ids){const S=fc.S;S.order=S.sh?shuf(ids):ids.slice();S.pos=0;S.res={};S.sum=null;S.hint=false;dirs();paint()}
function paint(){const S=fc.S;if(!S)return;const deck=deckOf(S.vid,S.id);if(!deck)return;const tot=S.order.length,rated=Object.keys(S.res).length;
 if(S.sum){const m=S.sum;$('lrn-fstg').innerHTML=`<div class="card" style="max-width:520px;margin:0 auto;text-align:center"><h2 style="margin-top:0">Session complete</h2><p style="font-size:1.1rem"><b style="color:#5fd38b">${m.known} knew it</b> · <b style="color:#ff8a8a">${m.missed} missed</b>${m.skip?` · ${m.skip} not rated`:''}</p><p style="color:var(--mu)">${m.total} card${m.total===1?'':'s'} · ${m.total?Math.round(100*m.known/m.total):0}% known this session · deck known overall: ${known(deck)}%</p><div class="row" style="justify-content:center">${m.missed?'<button onclick="LRN.fc.sx(\'missed\')">Review only missed cards</button>':''}<button class="g" onclick="LRN.fc.sx('restart')">Restart deck</button><button class="g" onclick="LRN.fc.sx('close')">Close</button></div></div>`;$('lrn-fbt').innerHTML='';$('lrn-fht').textContent='';$('lrn-fpc').textContent='';$('lrn-fbi').style.width='100%';return}
 const id=S.order[S.pos],c=deck.cards.find(x=>x.id===id);if(!c){S.order.splice(S.pos,1);return paint()}const d=S.dirs[id]||'fb',a=d==='bf'?c.b:c.f,b=d==='bf'?c.f:c.b;
 $('lrn-fstg').innerHTML=cardHTML(a,b,deck.ring,false,'lrn-fcd');$('lrn-fpc').textContent=`Card ${S.pos+1} of ${tot} · ${rated} rated · showing ${d==='bf'?'back':'front'} first`;$('lrn-fbi').style.width=Math.round(100*rated/Math.max(1,tot))+'%';$('lrn-fbar').setAttribute('aria-valuenow',Math.round(100*rated/Math.max(1,tot)));
 $('lrn-fht').innerHTML=c.h?(S.hint?`💡 ${E(c.h)}`:'<button class="g" onclick="LRN.fc.sx(\'hint\')">💡 Show hint</button>'):'';
 const r=S.res[id];$('lrn-fbt').innerHTML=`<button class="g" onclick="LRN.fc.sx('nav',-1)" aria-label="Previous card">◀ Prev</button><button class="g" onclick="LRN.fc.flip('lrn-fcd')">↻ Flip (Space)</button><button class="g" onclick="LRN.fc.sx('nav',1)" aria-label="Next card">Next ▶</button><button class="${r==='k'?'':'g'}" style="border-color:#5fd38b" onclick="LRN.fc.sx('rate','k')">✓ Knew it</button><button class="${r==='m'?'':'g'}" style="border-color:#ff8a8a" onclick="LRN.fc.sx('rate','m')">✗ Missed it</button>`;L.fit()}
function rate(r){const S=fc.S,deck=deckOf(S.vid,S.id),id=S.order[S.pos],c=deck.cards.find(x=>x.id===id);if(!c)return;const p=S.res[id];
 if(p!==r){if(p==='k')c.k=Math.max(0,(c.k||0)-1);if(p==='m')c.m=Math.max(0,(c.m||0)-1);if(r==='k')c.k=(c.k||0)+1;else c.m=(c.m||0)+1;S.res[id]=r}
 deck.studied=Date.now();db.set(S.vid,db.get(S.vid));if(L.vid()===S.vid)L.refresh();
 if(S.pos<S.order.length-1){S.pos++;S.hint=false;paint()}else finish()}
function finish(){const S=fc.S,deck=deckOf(S.vid,S.id);if(!deck)return;const v=Object.values(S.res),k=v.filter(x=>x==='k').length,m=v.filter(x=>x==='m').length;
 S.sum={total:S.order.length,known:k,missed:m,skip:S.order.length-k-m};S.missedIds=S.order.filter(i=>S.res[i]==='m');deck.sess={ts:Date.now(),total:S.sum.total,known:k,missed:m};if(k+m)deck.studied=Date.now();db.set(S.vid,db.get(S.vid));if(L.vid()===S.vid)L.refresh();paint()}
fc.sx=function(a,v){const S=fc.S;if(!S)return;
 if(a==='close'){const l=S.lay;fc.S=null;L.close(l);return}
 if(a==='nav'){if(S.sum)return;S.pos=Math.max(0,Math.min(S.order.length-1,S.pos+v));S.hint=false;return paint()}
 if(a==='rate'){if(!S.sum)rate(v);return}
 if(a==='hint'){S.hint=true;return paint()}
 if(a==='dir'){S.dir=v;if(!S.sum){dirs();paint()}return}
 if(a==='shuf'){S.sh=!S.sh;const b=$('lrn-fsh');b.textContent='🔀 Shuffle: '+(S.sh?'on':'off');b.setAttribute('aria-pressed',S.sh);const deck=deckOf(S.vid,S.id);start(deck.cards.map(c=>c.id));return}
 if(a==='fin'){if(!S.sum)finish();return}
 if(a==='restart'){const deck=deckOf(S.vid,S.id);return start(deck.cards.map(c=>c.id))}
 if(a==='missed'){return start(S.missedIds.slice())}
 if(a==='quiz'){const id=S.id;fc.sx('close');if(L.qz&&L.qz.fromDeck)L.qz.fromDeck(id);else toast('Quizzes are not available');return}};
})(window.LRN);

/*LRN:QUIZZES*/
(function(L){'use strict';
const $=id=>document.getElementById(id),E=L.E,db=L.db,rt=L.rt;
const qz=L.qz={M:null,T:null,R:null,offered:new Set()};
const fd=t=>t?new Date(t).toLocaleDateString():'—';
const DIFF=['Easy','Medium','Hard'];
let _n=0;const nid=()=>L.uid()+(_n++).toString(36);
const norm=s=>String(s==null?'':s).toLowerCase().replace(/\s+/g,' ').trim();
const num=(v,d)=>{const n=parseFloat(v);return isFinite(n)?n:d};
const r2=n=>Math.round(n*100)/100;
const OL=i=>String.fromCharCode(65+i);
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const fT=s=>{s=Math.max(0,Math.round(s||0));const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60,p=n=>String(n).padStart(2,'0');return h?`${h}:${p(m)}:${p(x)}`:`${m}:${p(x)}`};
qz.fT=fT;qz.r2=r2;qz.DIFF=DIFF;qz.nid=nid;
const mo=t=>({id:nid(),t:t||''});
const TF=()=>[{id:'t',t:'True'},{id:'f',t:'False'}];
/* ================= QUESTION TYPE REGISTRY ================= */
const optValid=q=>q.opts.filter(o=>o.t.trim());
const chosen=(q,v)=>(Array.isArray(v)?v:v?[v]:[]).filter(x=>q.opts.some(o=>o.id===x));
const radioIn=(q,val,ord,name)=>ord.map((oid,i)=>{const o=q.opts.find(x=>x.id===oid);if(!o)return'';const on=val===oid;return `<label class="lrn-opt${on?' on':''}"><input type="radio" name="lrn-a" value="${E(o.id)}" ${on?'checked':''} onchange="LRN.qz.tk('set')"><b>${i+1}</b><span>${E(o.t)}</span></label>`}).join('');
const checkIn=(q,val,ord)=>ord.map((oid,i)=>{const o=q.opts.find(x=>x.id===oid);if(!o)return'';const on=(val||[]).includes(oid);return `<label class="lrn-opt${on?' on':''}"><input type="checkbox" name="lrn-a" value="${E(o.id)}" ${on?'checked':''} onchange="LRN.qz.tk('set')"><b>${i+1}</b><span>${E(o.t)}</span></label>`}).join('');
const readRadio=root=>{const c=root.querySelector('input[name="lrn-a"]:checked');return c?c.value:''};
const readChecks=root=>[...root.querySelectorAll('input[name="lrn-a"]:checked')].map(x=>x.value);
const txtOf=(q,ids)=>ids.map(i=>{const o=q.opts.find(x=>x.id===i);return o?o.t:''}).filter(Boolean).join('; ');
const T=qz.QTYPES={
 mcq:{name:'Single answer (MCQ)',icon:'◉',blank:()=>({opts:[mo(),mo(),mo(),mo()],ans:[]}),
  validate:q=>{const e=[],o=optValid(q);if(o.length<2)e.push('needs at least 2 non-empty options');const c=q.ans.filter(a=>o.some(x=>x.id===a));if(c.length!==1)e.push('select exactly 1 correct option');return e},
  input:(q,v,o)=>radioIn(q,v,o),read:readRadio,isAns:v=>!!v,hint:'Choose one answer',
  grade:(q,v,m)=>{if(!v||!q.opts.some(o=>o.id===v))return{st:'skip',got:0};return q.ans.includes(v)?{st:'correct',got:m.marks}:{st:'wrong',got:-m.neg}},
  fmt:(q,v)=>v?txtOf(q,[v])||'—':'—',fmtC:q=>txtOf(q,q.ans)},
 multi:{name:'Multiple select',icon:'☑',blank:()=>({opts:[mo(),mo(),mo(),mo()],ans:[]}),
  validate:q=>{const e=[],o=optValid(q);if(o.length<2)e.push('needs at least 2 non-empty options');if(!q.ans.some(a=>o.some(x=>x.id===a)))e.push('select at least 1 correct option');return e},
  input:(q,v,o)=>checkIn(q,v,o),read:readChecks,isAns:v=>Array.isArray(v)&&v.length>0,hint:'Select all that apply',
  grade:(q,v,m)=>{const s=chosen(q,v);if(!s.length)return{st:'skip',got:0};const A=q.ans,c=s.filter(x=>A.includes(x)).length,w=s.length-c;
   if(w===0&&c===A.length)return{st:'correct',got:m.marks};
   if(q.partial){const f=Math.max(0,(c-w)/A.length);if(f>0)return{st:'partial',got:r2(m.marks*f)};}
   return{st:'wrong',got:-m.neg}},
  fmt:(q,v)=>{const s=chosen(q,v);return s.length?txtOf(q,s):'—'},fmtC:q=>txtOf(q,q.ans)},
 tf:{name:'True / False',icon:'⊤',blank:()=>({opts:TF(),ans:[]}),
  validate:q=>q.ans.length===1&&(q.ans[0]==='t'||q.ans[0]==='f')?[]:['select True or False as the correct answer'],
  input:(q,v,o)=>radioIn(q,v,o),read:readRadio,isAns:v=>!!v,hint:'True or false?',
  grade:(q,v,m)=>{if(!v)return{st:'skip',got:0};return q.ans.includes(v)?{st:'correct',got:m.marks}:{st:'wrong',got:-m.neg}},
  fmt:(q,v)=>v?txtOf(q,[v])||'—':'—',fmtC:q=>txtOf(q,q.ans)},
 short:{name:'Short answer',icon:'✎',blank:()=>({opts:[],ans:[]}),
  validate:q=>(q.acc||[]).some(a=>a.trim())?[]:['needs at least 1 accepted answer'],
  input:(q,v)=>`<input type="text" id="lrn-ta" autocomplete="off" maxlength="300" value="${E(v||'')}" oninput="LRN.qz.tk('set')" aria-label="Your answer" style="width:100%;max-width:520px">`,
  read:root=>{const e=root.querySelector('#lrn-ta');return e?e.value:''},isAns:v=>!!String(v||'').trim(),hint:'Type your answer',
  grade:(q,v,m)=>{if(!String(v||'').trim())return{st:'skip',got:0};if((q.acc||[]).some(a=>norm(a)&&norm(a)===norm(v)))return{st:'correct',got:m.marks};if(m.sg===true)return{st:'correct',got:m.marks};if(m.sg===false)return{st:'wrong',got:-m.neg};return{st:'self',got:0}},
  fmt:(q,v)=>String(v||'').trim()||'—',fmtC:q=>(q.acc||[]).filter(a=>a.trim()).join(' / ')}};
const gradeQ=(q,v,m)=>{const t=T[q.type];return t?t.grade(q,v,m):{st:'skip',got:0}};
qz.gradeQ=gradeQ;
/* question normaliser: used for loading drafts, copying and bank entries */
qz.newQ=type=>{type=T[type]?type:'mcq';return Object.assign({id:nid(),type,text:'',marks:null,neg:null,exp:'',acc:[],partial:false},T[type].blank())};
qz.cleanQ=q=>{q=q&&typeof q==='object'?q:{};const type=T[q.type]?q.type:'mcq',b=T[type].blank(),o=Object.assign({id:String(q.id||nid()).slice(0,60),type,text:String(q.text||'').slice(0,1000),exp:String(q.exp||'').slice(0,1000),acc:Array.isArray(q.acc)?q.acc.map(x=>String(x).slice(0,300)):[],partial:!!q.partial,marks:q.marks==null||q.marks===''?null:num(q.marks,null),neg:q.neg==null||q.neg===''?null:num(q.neg,null)},b);
 if(type==='tf'){o.opts=TF();o.ans=(q.ans||[]).filter(x=>x==='t'||x==='f').slice(0,1)}
 else if(type==='short'){o.opts=[];o.ans=[]}
 else{o.opts=Array.isArray(q.opts)?q.opts.slice(0,10).map(x=>({id:String(x&&x.id||nid()).slice(0,60),t:String(x&&x.t||'').slice(0,300)})):b.opts;o.ans=(Array.isArray(q.ans)?q.ans:[]).filter(a=>o.opts.some(x=>x.id===a));if(type==='mcq')o.ans=o.ans.slice(0,1)}
 return o};
qz.copyQ=q=>{const c=qz.cleanQ(JSON.parse(JSON.stringify(q)));const m={};c.opts.forEach(o=>{if(c.type!=='tf'){const n=nid();m[o.id]=n;o.id=n}});c.ans=c.ans.map(a=>m[a]||a);c.id=nid();return c};
const qMarks=(q,dm)=>q.marks!=null?q.marks:dm,qNeg=(q,dn)=>q.neg!=null?q.neg:dn;
qz.total=it=>r2((it.questions||[]).reduce((a,q)=>a+qMarks(q,it.dm==null?1:it.dm),0));
qz.validateQ=q=>{const e=[];if(!String(q.text||'').trim())e.push('question text is required');if(q.marks!=null&&!(q.marks>0))e.push('marks must be greater than 0');if(q.neg!=null&&!(q.neg>=0))e.push('negative marks must be 0 or more');const t=T[q.type];return e.concat(t?t.validate(q):['unknown type'])};
/* ================= ATTEMPT GRADING ================= */
qz.gradeAttempt=function(att){const rows=att.order.map(id=>{const q=att.qs.find(x=>x.id===id);if(!q)return null;const mk=qMarks(q,att.dm),ng=qNeg(q,att.dn),r=gradeQ(q,att.ans[id],{marks:mk,neg:ng,sg:att.sg?att.sg[id]:undefined});return{id,st:r.st,got:r.got,max:mk,tm:(att.tm&&att.tm[id])||0}}).filter(Boolean);
 const c=s=>rows.filter(x=>x.st===s).length,cor=c('correct'),wr=c('wrong'),sk=c('skip'),pa=c('partial'),pend=c('self'),marks=r2(rows.reduce((a,x)=>a+x.got,0)),max=r2(rows.reduce((a,x)=>a+x.max,0)),att2=cor+wr+pa+pend;
 return{rows,marks,max,pct:max?r2(100*marks/max):0,acc:att2?r2(100*cor/att2):0,cor,wr,sk,pa,pend,status:pend?'prov':'final'}};
const stats=(vid,qid)=>{const a=db.get(vid).qz.attempts.filter(x=>x.qid===qid&&x.r),f=a.filter(x=>x.r.status==='final');return{n:a.length,best:f.length?Math.max(...f.map(x=>x.r.pct)):null,last:a.length?Math.max(...a.map(x=>x.sub||0)):0}};
qz.stats=stats;
const sync=(vid,qid)=>{const it=db.get(vid).qz.items.find(x=>x.id===qid);if(it){const t=stats(vid,qid);it.best=t.best==null?0:t.best;it.last=t.last}};
/* ================= MANAGER REGISTRATION ================= */
const grp=[['','No grouping'],['folder','Folder',i=>[L.fp('qz',i.folder)||'Unfiled']],['label','Label',i=>i.labels&&i.labels.length?i.labels:['No label']]];
const fo=k=>()=>[...new Set(L.D('qz').items.map(i=>i[k]).filter(Boolean))].sort().map(x=>[x,x]);
const qdef=()=>{const s=L.D('qz');s.def=s.def||{};return Object.assign({marks:1,neg:0,rq:false,ro:false},s.def)};
L.libs.qz={name:'Quizzes',maker:'Quiz maker',makerInfo:'Single-answer, multiple-select, true/false and short-answer quizzes with an optional timer, negative marking, review palette and full results analysis.',
 title:i=>i.t,text:i=>[i.subject,i.topic,i.d].join(' '),
 sorts:[['t','Title',(a,b)=>a.t.localeCompare(b.t)],['created','Created',(a,b)=>a.created-b.created],['updated','Updated',(a,b)=>a.updated-b.updated],['difficulty','Difficulty',(a,b)=>DIFF.indexOf(a.difficulty)-DIFF.indexOf(b.difficulty)],['questions','Questions',(a,b)=>(a.questions||[]).length-(b.questions||[]).length],['last','Last attempted',(a,b)=>(a.last||0)-(b.last||0)],['best','Best score',(a,b)=>(a.best||0)-(b.best||0)],['ord','Manual order',()=>0]],groups:grp,
 filters:[['subject','Subject',fo('subject')],['topic','Topic',fo('topic')],['difficulty','Difficulty',fo('difficulty')]],fil:(it,k,v)=>it[k]===v,
 ico:i=>`<span class="lrn-card-ico" style="background:${L.col(i.color||'#2f55d4')}">${E(i.emoji||'❓')}</span>`,
 sub:i=>`${(i.questions||[]).length} question${(i.questions||[]).length===1?'':'s'} · ${i.subject?E(i.subject):'no subject'}${i.topic?' / '+E(i.topic):''}`,
 extra:i=>{const t=stats(L.vid(),i.id);return `<small class="lrn-qx" style="color:var(--mu)">${i.difficulty?E(i.difficulty)+' · ':''}${qz.total(i)} marks · ${i.time>0?i.time+' min':'no time limit'} · ${t.n} attempt${t.n===1?'':'s'} · best ${t.best==null?'—':t.best+'%'} · last ${fd(t.last)}</small>`},
 chips:()=>{const s=L.D('qz');return `<i class="lb">${s.items.length} quizzes</i><i class="lb">${s.items.filter(i=>i.fav).length} ★</i><i class="lb">${s.folders.length} folders</i>`},
 copy:it=>{const c=L.copyItem('qz',it);c.questions=(it.questions||[]).map(qz.copyQ);c.last=0;c.best=0;return c},
 open:it=>qz.open(it),edit:id=>qz.openMaker(id),
 empty:{msg:'No quizzes yet.',btn:'Create your first quiz',fn:'LRN.qz.create()'},
 settings:()=>{const d=qdef();return `<h4>Defaults for new quizzes</h4><label>Marks per question<input type="number" min="0.01" step="any" value="${d.marks}" onchange="LRN.qz.setDef('marks',this.value)"></label><label>Negative marks per wrong answer<input type="number" min="0" step="any" value="${d.neg}" onchange="LRN.qz.setDef('neg',this.value)"></label><label><input type="checkbox" style="width:auto" ${d.rq?'checked':''} onchange="LRN.qz.setDef('rq',this.checked)"> Random question order</label><label><input type="checkbox" style="width:auto" ${d.ro?'checked':''} onchange="LRN.qz.setDef('ro',this.checked)"> Shuffle options</label>`}};
qz.setDef=(k,v)=>{const s=L.D('qz');s.def=s.def||{};if(k==='marks'){const n=num(v,1);s.def.marks=n>0?n:1}else if(k==='neg'){const n=num(v,0);s.def.neg=n>=0?n:0}else s.def[k]=!!v;L.sv('qz');L.itab('qz','settings')};
qz.create=()=>L.confirm('Open the quiz maker?',{onYes:()=>qz.openMaker(null)});
/* ================= QUESTION EDITOR (shared by maker and bank) ================= */
const QE=qz.QE={};
QE.convert=function(q,nt){const o=q.type;if(o===nt)return;q.type=nt;
 if(nt==='tf'){q.opts=TF();q.ans=[]}
 else if(nt==='short'){q.acc=q.acc&&q.acc.length?q.acc:[];q.opts=[];q.ans=[]}
 else{if(o==='tf'||o==='short'){q.opts=[mo(),mo(),mo(),mo()];q.ans=[]}if(nt==='mcq')q.ans=q.ans.slice(0,1)}};
QE.mount=function(host,q,o){o=o||{};const dm=o.dm==null?1:o.dm,dn=o.dn==null?0:o.dn,ch=()=>{o.onChange&&o.onChange()};
 const multi=q.type==='multi',pick=q.type==='mcq'||multi;
 let body='';
 if(pick)body=`<div class="lrn-opts">${q.opts.map((x,i)=>`<div class="row" style="flex-wrap:nowrap"><input type="${multi?'checkbox':'radio'}" name="lrn-cor" data-cor="${i}" ${q.ans.includes(x.id)?'checked':''} aria-label="Option ${OL(i)} is correct" title="Mark as correct" style="width:auto"><input data-opt="${i}" maxlength="300" value="${E(x.t)}" placeholder="Option ${OL(i)}" aria-label="Option ${OL(i)} text" style="flex:1"><button type="button" class="x" data-rm="${i}" aria-label="Remove option ${OL(i)}">✕</button></div>`).join('')}</div><button type="button" class="g" data-addopt>＋ Add option</button> <small style="color:var(--mu)">${multi?'Tick every correct option.':'Select the one correct option.'}</small>`;
 else if(q.type==='tf')body=`<div class="row">${TF().map(x=>`<label style="margin:0"><input type="radio" name="lrn-cor" data-tf="${x.id}" ${q.ans[0]===x.id?'checked':''} style="width:auto"> ${x.t} is correct</label>`).join('')}</div>`;
 else body=`<label>Accepted answers (one per line) *<textarea data-f="acc" rows="3" maxlength="1500">${E((q.acc||[]).join('\n'))}</textarea></label><small style="color:var(--mu)">Matched ignoring case and extra spaces. Anything else is flagged for self-grading.</small>`;
 host.innerHTML=`<label>Question type<select data-f="type" aria-label="Question type">${Object.keys(T).map(k=>`<option value="${k}"${k===q.type?' selected':''}>${E(T[k].name)}</option>`).join('')}</select></label><label>Question text *<textarea data-f="text" rows="3" maxlength="1000" aria-required="true">${E(q.text)}</textarea></label>${body}<div class="row" style="margin-top:8px"><label style="margin:0">Marks <input type="number" min="0" step="any" data-f="marks" placeholder="default ${dm}" value="${q.marks==null?'':q.marks}" style="width:110px"></label><label style="margin:0">Negative marks <input type="number" min="0" step="any" data-f="neg" placeholder="default ${dn}" value="${q.neg==null?'':q.neg}" style="width:110px"></label>${multi?`<label style="margin:0"><input type="checkbox" data-f="partial" ${q.partial?'checked':''} style="width:auto"> Partial credit</label>`:''}</div><label>Explanation (shown after submission)<textarea data-f="exp" rows="2" maxlength="1000">${E(q.exp||'')}</textarea></label>`;
 host.querySelectorAll('[data-f]').forEach(el=>{const f=el.dataset.f,ev=el.tagName==='SELECT'||el.type==='checkbox'?'change':'input';el.addEventListener(ev,()=>{
  if(f==='type'){QE.convert(q,el.value);QE.mount(host,q,o);ch();return}
  if(f==='text')q.text=el.value;else if(f==='exp')q.exp=el.value;else if(f==='acc')q.acc=el.value.split('\n').slice(0,50);else if(f==='partial')q.partial=el.checked;
  else if(f==='marks')q.marks=el.value===''?null:num(el.value,0);else if(f==='neg')q.neg=el.value===''?null:num(el.value,0);ch()})});
 host.querySelectorAll('[data-opt]').forEach(el=>el.addEventListener('input',()=>{q.opts[+el.dataset.opt].t=el.value;ch()}));
 host.querySelectorAll('[data-cor]').forEach(el=>el.addEventListener('change',()=>{const id=q.opts[+el.dataset.cor].id;if(multi){q.ans=el.checked?[...new Set([...q.ans,id])]:q.ans.filter(x=>x!==id)}else q.ans=[id];ch()}));
 host.querySelectorAll('[data-tf]').forEach(el=>el.addEventListener('change',()=>{q.ans=[el.dataset.tf];ch()}));
 host.querySelectorAll('[data-rm]').forEach(el=>el.addEventListener('click',()=>{if(q.opts.length<=2)return toast('A question needs at least 2 options');const i=+el.dataset.rm,id=q.opts[i].id;q.opts.splice(i,1);q.ans=q.ans.filter(x=>x!==id);QE.mount(host,q,o);ch()}));
 const ad=host.querySelector('[data-addopt]');if(ad)ad.addEventListener('click',()=>{if(q.opts.length>=10)return toast('Maximum 10 options');q.opts.push(mo());QE.mount(host,q,o);ch();const l=host.querySelectorAll('[data-opt]');if(l.length)l[l.length-1].focus()})};
/* ================= MAKER ================= */
const normQ=q=>{q=qz.cleanQ(q);return JSON.stringify([q.type,q.text,q.opts.map(o=>o.t),q.ans.map(a=>q.opts.findIndex(o=>o.id===a)),q.marks,q.neg,q.exp,q.acc,q.partial])};
function sig(M){return JSON.stringify([M.t,M.d,M.subject,M.topic,M.difficulty,M.time,M.dm,M.dn,M.rq,M.ro,M.labels,M.folder,M.color,M.emoji,M.fav,M.qs.map(normQ)])}
qz.openMaker=function(id,data){const vid=L.vid();L.ensure(vid);const key=id||'new',dr=data?null:L.draft.get(vid,'qz',key);
 if(data&&!id){const ex=L.draft.get(vid,'qz','new');if(ex)return L.confirm('Replace your unsaved quiz draft?',{detail:'An unsaved new-quiz draft already exists. Starting from the deck replaces it.',yes:'Replace',no:'Keep the draft',onYes:()=>{L.draft.del(vid,'qz','new');qz.build(null,data)},onNo:()=>qz.build(null,ex.data)})}
 if(dr)L.confirm('Restore draft?',{detail:'An unsaved draft of this quiz was found.',yes:'Restore',no:'Discard',onYes:()=>qz.build(id,dr.data),onNo:()=>{L.draft.del(vid,'qz',key);qz.build(id,null)}});else qz.build(id,data||null)};
qz.build=function(id,data){if(qz.M)return;const vid=L.vid(),s=db.get(vid).qz,it=id?s.items.find(x=>x.id===id):null;if(id&&!it)return toast('Quiz not found');
 const d=Object.assign({marks:1,neg:0,rq:false,ro:false},s.def||{}),src=data||it||{};
 const mk=o=>({t:o.t||'',d:o.d||'',subject:o.subject||'',topic:o.topic||'',difficulty:DIFF.includes(o.difficulty)?o.difficulty:'',time:Math.max(0,Math.floor(num(o.time,0))),dm:o.dm==null?d.marks:num(o.dm,1),dn:o.dn==null?d.neg:num(o.dn,0),rq:o.rq==null?!!d.rq:!!o.rq,ro:o.ro==null?!!d.ro:!!o.ro,labels:(o.labels||[]).slice(),folder:o.folder||'',color:o.color||'#2f55d4',emoji:o.emoji||'❓',fav:!!o.fav,qs:((o.questions||o.qs)||[]).map(qz.cleanQ)});
 const M=qz.M=Object.assign({vid,id:id||null,cur:0,dirty:!!(data&&data.fromDeck),errs:[]},mk(src));if(!M.qs.length)M.qs.push(qz.newQ('mcq'));
 M.base=sig(it?mk(it):Object.assign(mk({}),{qs:[qz.newQ('mcq')]}));
 const sw=(k,l,v,x)=>`<label style="margin:0">${l}<input ${x||''} value="${E(v)}" oninput="LRN.qz.mk('${k}',this.value)"></label>`;
 M.lay=L.layer(`<div class="lrn-top"><button class="g" onclick="LRN.qz.ma('close')">✕ Close</button><b>Quiz maker</b><small id="lrn-qst" style="color:var(--mu)"></small><span style="flex:1"></span><button class="g" onclick="LRN.qz.ma('frombank')">🏦 Add from bank</button><button onclick="LRN.qz.ma('save')" aria-label="Save">💾 Save</button></div><div class="lrn-body"><div class="card" style="margin-bottom:10px"><div class="row">${sw('subject','Subject',M.subject,'maxlength="60" style="width:150px"')}${sw('topic','Topic',M.topic,'maxlength="60" style="width:150px"')}<label style="margin:0">Difficulty<select onchange="LRN.qz.mk('difficulty',this.value)" style="width:auto"><option value="">—</option>${DIFF.map(x=>`<option${x===M.difficulty?' selected':''}>${x}</option>`).join('')}</select></label>${sw('time','Time limit (min, 0 = none)',M.time,'type="number" min="0" max="1440" step="1" style="width:90px"')}${sw('dm','Default marks',M.dm,'type="number" min="0.01" step="any" style="width:80px"')}${sw('dn','Default negative',M.dn,'type="number" min="0" step="any" style="width:80px"')}<label style="margin:0"><input type="checkbox" style="width:auto" ${M.rq?'checked':''} onchange="LRN.qz.mk('rq',this.checked)"> Random question order</label><label style="margin:0"><input type="checkbox" style="width:auto" ${M.ro?'checked':''} onchange="LRN.qz.mk('ro',this.checked)"> Shuffle options</label></div></div><div class="lrn-fcm"><div class="card lrn-rail"><div class="row" style="margin-bottom:6px"><select id="lrn-qnt" aria-label="New question type" style="width:auto">${Object.keys(T).map(k=>`<option value="${k}">${E(T[k].name)}</option>`).join('')}</select><button class="g" onclick="LRN.qz.ma('add')">＋ Add</button></div><div class="row" style="margin-bottom:6px"><button class="g" onclick="LRN.qz.ma('dup')" aria-label="Duplicate question">⧉</button><button class="g" onclick="LRN.qz.ma('up')" aria-label="Move question up">⇧</button><button class="g" onclick="LRN.qz.ma('down')" aria-label="Move question down">⇩</button><button class="g" onclick="LRN.qz.ma('tobank')" aria-label="Save question to bank" title="Save question to bank">🏦</button><button class="x" onclick="LRN.qz.ma('del')" aria-label="Delete question">🗑</button></div><div id="lrn-ql" class="lrn-rl"></div></div><div><div id="lrn-qerr" class="lrn-err" role="alert"></div><div class="card" id="lrn-qe"></div></div></div></div>`,{cls:'lrn-mk',label:'Quiz maker',esc:()=>qz.ma('close')});
 mount();L.fit()};
function mount(){const M=qz.M;if(!M)return;const q=M.qs[M.cur];QE.mount($('lrn-qe'),q,{dm:M.dm,dn:M.dn,onChange:()=>{M.dirty=true;M.errs=[];touch();rail();status()}});rail();status()}
function status(){const M=qz.M;if(!M)return;const e=$('lrn-qst');if(!e)return;e.textContent=`${M.qs.length} question${M.qs.length===1?'':'s'} · total ${qz.total({questions:M.qs,dm:M.dm})} marks${M.dirty?' · unsaved changes':''}`}
function rail(){const M=qz.M;if(!M)return;$('lrn-ql').innerHTML=M.qs.map((q,i)=>{const bad=M.errs.some(x=>x.i===i);return `<div class="lrn-ri${i===M.cur?' on':''}${bad?' bad':''}" tabindex="0" role="button" draggable="true" aria-label="Question ${i+1}" ondragstart="LRN.qz.ma('ds',${i})" ondragover="event.preventDefault()" ondrop="LRN.qz.ma('dr',${i})" onclick="LRN.qz.ma('go',${i})" onkeydown="if(event.key==='Enter'){LRN.qz.ma('go',${i})}"><b>${i+1}</b><span>${T[q.type].icon} ${E(q.text.slice(0,34)||'(no text)')}</span></div>`}).join('')}
let dtm=null;function touch(){clearTimeout(dtm);dtm=setTimeout(saveDraft,1500)}
qz.mk=(k,v)=>{const M=qz.M;if(!M)return;if(k==='time')M.time=Math.max(0,Math.floor(num(v,0)));else if(k==='dm')M.dm=num(v,1);else if(k==='dn')M.dn=num(v,0);else if(k==='rq'||k==='ro')M[k]=!!v;else M[k]=String(v);M.dirty=true;touch();status()};
qz.ma=function(a,v){const M=qz.M;if(!M)return;
 if(a==='close')return closeAsk();
 if(a==='go'){M.cur=+v;return mount()}
 if(a==='add'){if(M.qs.length>=300)return toast('Maximum 300 questions');M.qs.splice(M.cur+1,0,qz.newQ($('lrn-qnt').value));M.cur++;M.dirty=true;touch();return mount()}
 if(a==='dup'){M.qs.splice(M.cur+1,0,qz.copyQ(M.qs[M.cur]));M.cur++;M.dirty=true;touch();return mount()}
 if(a==='del'){const doit=()=>{if(M.qs.length===1)M.qs[0]=qz.newQ('mcq');else M.qs.splice(M.cur,1);M.cur=Math.min(M.cur,M.qs.length-1);M.dirty=true;touch();mount()};if(M.qs[M.cur].text.trim())L.confirm('Delete this question?',{yes:'Delete',no:'Keep',noYN:1,onYes:doit});else doit();return}
 if(a==='up'||a==='down'){const j=M.cur+(a==='up'?-1:1);if(j<0||j>=M.qs.length)return;[M.qs[M.cur],M.qs[j]]=[M.qs[j],M.qs[M.cur]];M.cur=j;M.dirty=true;touch();return mount()}
 if(a==='ds'){M.dragI=+v;return}
 if(a==='dr'){const f=M.dragI,t=+v;M.dragI=null;if(f==null||f===t)return;const[x]=M.qs.splice(f,1);M.qs.splice(t,0,x);M.cur=t;M.dirty=true;touch();return mount()}
 if(a==='save')return trySave();
 if(a==='tobank')return qz.toBank();
 if(a==='frombank')return qz.fromBank()};
function closeAsk(){const M=qz.M;if(!M)return;if(sig(M)!==M.base)L.confirm('Discard changes?',{detail:'Your unsaved changes to this quiz will be lost.',yes:'Discard',no:'Keep editing',onYes:()=>closeMaker(true)});else closeMaker(true)}
function closeMaker(drop){const M=qz.M;if(!M)return;clearTimeout(dtm);if(drop)L.draft.del(M.vid,'qz',M.id||'new');qz.M=null;L.close(M.lay)}
const dd=M=>({id:M.id,t:M.t,d:M.d,subject:M.subject,topic:M.topic,difficulty:M.difficulty,time:M.time,dm:M.dm,dn:M.dn,rq:M.rq,ro:M.ro,labels:M.labels,folder:M.folder,color:M.color,emoji:M.emoji,fav:M.fav,questions:M.qs.map(qz.cleanQ)});
function saveDraft(){const M=qz.M;if(!M||!M.dirty)return;try{L.draft.put(M.vid,'qz',M.id||'new',dd(M))}catch(e){}}
addEventListener('pagehide',()=>{saveDraft();db.flush()});
function finalQs(M){return M.qs.map(q=>{q=qz.cleanQ(q);if(q.type==='mcq'||q.type==='multi'){const keep=q.opts.filter(o=>o.t.trim());q.opts=keep;q.ans=q.ans.filter(a=>keep.some(o=>o.id===a))}if(q.type==='short')q.acc=q.acc.map(a=>a.trim()).filter(Boolean);q.text=q.text.trim();return q})}
qz.finalQ=q=>finalQs({qs:[q]})[0];qz.mRefresh=()=>mount();
function trySave(){const M=qz.M;if(!(M.dm>0)||!(M.dn>=0)){toast('Default marks must be above 0 and negative marks 0 or more');return}
 const fq=finalQs(M),errs=[];fq.forEach((q,i)=>{qz.validateQ(q).forEach(m=>errs.push({i,m}))});if(!fq.length)errs.push({i:0,m:'a quiz needs at least 1 question'});
 M.errs=errs;rail();const box=$('lrn-qerr');
 if(errs.length){box.innerHTML=errs.slice(0,6).map(e=>`Question ${e.i+1}: ${E(e.m)}`).join('<br>')+(errs.length>6?`<br>…and ${errs.length-6} more`:'');if(M.cur!==errs[0].i){M.cur=errs[0].i;mount();$('lrn-qerr').innerHTML=box.innerHTML}toast('Fix the highlighted questions before saving');return}
 box.textContent='';saveDlg(fq)}
function saveDlg(fq){const M=qz.M,s=db.get(M.vid).qz;
 const fo2=(p,d)=>s.folders.filter(f=>(f.parent||'')===p).map(f=>`<option value="${f.id}"${f.id===M.folder?' selected':''}>${'\u00a0\u00a0'.repeat(d)}${E(f.name)}</option>`+fo2(f.id,d+1)).join('');
 L.form({title:'Save quiz',wide:1,body:`<label>Title *<input id="sv_t" maxlength="80" value="${E(M.t)}" aria-required="true"></label><div class="lrn-err" data-err="t"></div><label>Description<textarea id="sv_d" rows="2" maxlength="300">${E(M.d)}</textarea></label><div class="lrn-err" data-err="d"></div><label>Labels (comma separated)<input id="sv_l" value="${E(M.labels.join(', '))}"></label><label>Folder<select id="sv_f"><option value="">Unfiled</option>${fo2('',0)}</select></label><label>…or create a new folder<input id="sv_nf" maxlength="40" placeholder="New folder name (optional)"></label><div class="lrn-err" data-err="nf"></div><div class="row"><label style="margin:0">Colour <input type="color" id="sv_c" value="${/^#[0-9a-f]{6}$/i.test(M.color)?M.color:'#2f55d4'}"></label><label style="margin:0">Emoji <input id="sv_e" maxlength="4" style="width:70px" value="${E(M.emoji)}"></label><label style="margin:0"><input type="checkbox" id="sv_s" style="width:auto" ${M.fav?'checked':''}> ★ Favourite</label></div><small style="color:var(--mu)">${fq.length} questions · ${qz.total({questions:fq,dm:M.dm})} marks · ${M.time>0?M.time+' min limit':'no time limit'}</small>`,
  onOk:el=>{const q=x=>el.querySelector(x),t=q('#sv_t').value.trim(),d=q('#sv_d').value.trim(),err={};if(!t)err.t='Title is required';else if(t.length>80)err.t='Title must be 80 characters or fewer';if(d.length>300)err.d='Description must be 300 characters or fewer';const nf=q('#sv_nf').value.trim();if(nf.length>40)err.nf='Folder name must be 40 characters or fewer';if(Object.keys(err).length)return err;
   let folder=q('#sv_f').value;if(nf){const f={id:L.uid(),name:nf,desc:'',color:'#e0a030',emoji:'📁',parent:folder};s.folders.push(f);folder=f.id}
   const data={t,d,subject:M.subject.trim().slice(0,60),topic:M.topic.trim().slice(0,60),difficulty:M.difficulty,time:M.time,dm:M.dm,dn:M.dn,rq:M.rq,ro:M.ro,labels:[...new Set(q('#sv_l').value.split(',').map(x=>x.trim().slice(0,30)).filter(Boolean))],folder,fav:q('#sv_s').checked,color:q('#sv_c').value,emoji:L.emo(q('#sv_e').value)||'❓',questions:fq,updated:Date.now()};
   let it=M.id&&s.items.find(x=>x.id===M.id);if(it)Object.assign(it,data);else{it=Object.assign({id:L.uid(),created:Date.now(),last:0,best:0},data);s.items.push(it)}
   db.set(M.vid,db.get(M.vid));L.draft.del(M.vid,'qz',M.id||'new');closeMaker(false);toast('Saved');if(L.vid()===M.vid)L.refresh()}})}
/* ================= TAKING A QUIZ ================= */
qz.open=function(it){const vid=L.vid(),d=L.draft.get(vid,'at',it.id);
 if(d)return L.confirm('Resume attempt?',{detail:'You have an unfinished attempt of this quiz.',yes:'Resume',no:'Discard',onYes:()=>qz.resume(d.data),onNo:()=>{L.draft.del(vid,'at',it.id);qz.startScreen(it)}});
 qz.startScreen(it)};
qz.startScreen=function(it){if(qz.T||qz.starting)return;qz.starting=true;const vid=L.vid(),t=stats(vid,it.id),n=(it.questions||[]).length;
 const lay=L.layer(`<div class="lrn-top"><button class="g" data-x>✕ Close</button><b>${E(it.t)}</b><span style="flex:1"></span><button class="g" data-e>✎ Edit</button></div><div class="lrn-body"><div class="card" style="max-width:620px;margin:0 auto"><h2 style="margin-top:0">${E(it.emoji||'❓')} ${E(it.t)}</h2>${it.d?`<p style="color:var(--mu)">${E(it.d)}</p>`:''}<div class="row" style="margin:8px 0"><i class="lb">${n} question${n===1?'':'s'}</i><i class="lb">${qz.total(it)} marks</i><i class="lb">${it.time>0?it.time+' min':'No time limit'}</i>${it.difficulty?`<i class="lb">${E(it.difficulty)}</i>`:''}${it.subject?`<i class="lb">${E(it.subject)}</i>`:''}${it.topic?`<i class="lb">${E(it.topic)}</i>`:''}${it.dn>0?`<i class="lb">−${it.dn} per wrong</i>`:''}</div><p style="color:var(--mu)">Attempts: ${t.n} · Best score: ${t.best==null?'—':t.best+'%'} · Last attempted: ${fd(t.last)}</p><label><input type="checkbox" id="lrn-so1" style="width:auto" ${it.rq?'checked':''}> Random question order</label><label><input type="checkbox" id="lrn-so2" style="width:auto" ${it.ro?'checked':''}> Shuffle options</label>${it.time>0?'<p style="color:var(--mu)">The timer starts when you press Start and the quiz is submitted automatically at zero.</p>':'<p style="color:var(--mu)">No time limit: elapsed time is recorded.</p>'}<div class="row"><button data-s ${n?'':'disabled'}>▶ Start quiz</button><button class="g" data-x2>Cancel</button></div></div></div>`,{cls:'lrn-vw',label:'Quiz start',onClose:()=>{qz.starting=false}});
 const cl=()=>L.close(lay);lay.el.querySelector('[data-x]').onclick=cl;lay.el.querySelector('[data-x2]').onclick=cl;
 lay.el.querySelector('[data-e]').onclick=()=>L.confirm(`Open “${it.t}” in the maker?`,{onYes:()=>{cl();qz.openMaker(it.id)}});
 lay.el.querySelector('[data-s]').onclick=()=>{const rq=$('lrn-so1').checked,ro=$('lrn-so2').checked;cl();qz.begin(it,{rq,ro})}};
qz.begin=function(it,o){if(qz.T)return;const vid=L.vid(),qs=(it.questions||[]).map(qz.cleanQ);if(!qs.length)return toast('This quiz has no questions');
 const att={id:L.uid(),vid,qid:it.id,t:it.t,subject:it.subject||'',topic:it.topic||'',difficulty:it.difficulty||'',ts:Date.now(),end:it.time>0?Date.now()+it.time*60000:0,tl:it.time||0,dm:it.dm==null?1:it.dm,dn:it.dn||0,qs,order:[],oo:{},ans:{},rev:{},tm:{},sg:{},cur:0};
 att.order=(o&&o.rq?shuf(qs.map(q=>q.id)):qs.map(q=>q.id));qs.forEach(q=>{att.oo[q.id]=q.type==='tf'?['t','f']:o&&o.ro&&(q.type==='mcq'||q.type==='multi')?shuf(q.opts.map(x=>x.id)):q.opts.map(x=>x.id)});
 L.draft.put(vid,'at',att.qid,att);qz.take(att)};
qz.resume=function(att){att=Object.assign({ans:{},rev:{},tm:{},sg:{},oo:{},cur:0},att);if(att.end&&Date.now()>=att.end){toast('Time ran out while you were away - submitting your answers');return qz.submit(att,true)}qz.take(att)};
qz.take=function(att){if(qz.T)return;const T0=qz.T={att,vid:att.vid,tick:0,dirty:false};
 T0.lay=L.layer(`<div class="lrn-top"><button class="g" onclick="LRN.qz.tk('leave')">✕ Leave</button><b>${E(att.t)}</b><span style="flex:1"></span><b id="lrn-tmr" class="lrn-timer" role="timer" aria-label="Time"></b><button onclick="LRN.qz.tk('submit')">Submit</button></div><div class="lrn-body"><div class="lrn-take"><div class="card" id="lrn-q"></div><div class="card lrn-pal"><div id="lrn-pal"></div><small style="color:var(--mu)"><i class="lrn-dot ans"></i> answered <i class="lrn-dot"></i> not answered <i class="lrn-dot mk"></i> marked for review</small></div></div></div>`,{cls:'lrn-vw lrn-tk',label:'Quiz',esc:()=>qz.tk('leave'),key:e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)&&!(e.target.type==='radio'||e.target.type==='checkbox'))return;
  if(e.key==='ArrowRight'){e.preventDefault();qz.tk('nav',1)}else if(e.key==='ArrowLeft'){e.preventDefault();qz.tk('nav',-1)}else if(/^[1-9]$/.test(e.key)&&!e.ctrlKey&&!e.metaKey&&!e.altKey){qz.tk('key',+e.key)}}});
 T0.iv=setInterval(tick,1000);paintQ();timer()};
const cq=()=>{const T0=qz.T;return T0.att.qs.find(x=>x.id===T0.att.order[T0.att.cur])};
function paintQ(){const T0=qz.T;if(!T0)return;const a=T0.att,q=cq(),t=T[q.type],N=a.order.length,mk=qMarks(q,a.dm),ng=qNeg(q,a.dn);
 $('lrn-q').innerHTML=`<small style="color:var(--mu)">Question ${a.cur+1} of ${N} · ${mk} mark${mk===1?'':'s'}${ng>0?` · −${ng} if wrong`:''} · ${E(t.hint)}</small><h3 class="lrn-qt">${E(q.text)}</h3><div id="lrn-ans" class="lrn-ans">${t.input(q,a.ans[q.id],a.oo[q.id]||q.opts.map(o=>o.id))}</div><div class="row" style="margin-top:12px"><button class="g" onclick="LRN.qz.tk('nav',-1)" ${a.cur===0?'disabled':''} aria-label="Previous question">◀ Previous</button><button class="g" onclick="LRN.qz.tk('nav',1)" ${a.cur===N-1?'disabled':''} aria-label="Next question">Next ▶</button><button class="${a.rev[q.id]?'':'g'}" aria-pressed="${!!a.rev[q.id]}" onclick="LRN.qz.tk('mark')">🚩 ${a.rev[q.id]?'Marked for review':'Mark for review'}</button><button class="g" onclick="LRN.qz.tk('clear')">Clear answer</button></div>`;pal()}
function pal(){const T0=qz.T;if(!T0)return;const a=T0.att;$('lrn-pal').innerHTML=a.order.map((id,i)=>{const q=a.qs.find(x=>x.id===id),an=T[q.type].isAns(a.ans[id]);return `<button class="lrn-pb${an?' ans':''}${a.rev[id]?' mk':''}${i===a.cur?' cur':''}" onclick="LRN.qz.tk('go',${i})" aria-label="Question ${i+1}${an?', answered':', not answered'}${a.rev[id]?', marked for review':''}${i===a.cur?', current':''}">${i+1}</button>`}).join('')}
function counts(a){let an=0,mk=0;a.order.forEach(id=>{const q=a.qs.find(x=>x.id===id);if(T[q.type].isAns(a.ans[id]))an++;if(a.rev[id])mk++});return{an,un:a.order.length-an,mk}}
function timer(){const T0=qz.T;if(!T0)return;const a=T0.att,e=$('lrn-tmr');if(!e)return;if(a.end){const r=Math.max(0,Math.ceil((a.end-Date.now())/1000));e.textContent='⏳ '+fT(r);e.classList.toggle('warn',r<=60)}else e.textContent='⏱ '+fT(Object.values(a.tm).reduce((x,y)=>x+y,0))}
function tick(){const T0=qz.T;if(!T0)return;const a=T0.att;if(a.end&&Date.now()>=a.end){toast('Time is up - your quiz was submitted');return qz.tk('auto')}
 if(!document.hidden){const id=a.order[a.cur];a.tm[id]=(a.tm[id]||0)+1}timer();if(++T0.tick%5===0||T0.dirty){T0.dirty=false;persist()}}
function persist(){const T0=qz.T;if(!T0)return;try{L.draft.put(T0.vid,'at',T0.att.qid,T0.att)}catch(e){}}
addEventListener('pagehide',()=>{if(qz.T)persist();db.flush()});
qz.tk=function(a,v){const T0=qz.T;if(!T0)return;const at=T0.att;
 if(a==='set'){const q=cq(),val=T[q.type].read($('lrn-ans'));if(T[q.type].isAns(val))at.ans[q.id]=val;else delete at.ans[q.id];$('lrn-ans').querySelectorAll('.lrn-opt').forEach(l=>{const i=l.querySelector('input');l.classList.toggle('on',i.checked)});pal();T0.dirty=true;persist();return}
 if(a==='nav'){const j=at.cur+v;if(j<0||j>=at.order.length)return;at.cur=j;paintQ();persist();return}
 if(a==='go'){at.cur=+v;paintQ();persist();return}
 if(a==='mark'){const id=cq().id;if(at.rev[id])delete at.rev[id];else at.rev[id]=1;paintQ();persist();return}
 if(a==='clear'){delete at.ans[cq().id];paintQ();persist();return}
 if(a==='key'){const q=cq(),root=$('lrn-ans'),ins=[...root.querySelectorAll('input[name="lrn-a"]')],x=ins[v-1];if(!x)return;if(x.type==='checkbox')x.checked=!x.checked;else x.checked=true;qz.tk('set');return}
 if(a==='leave'){L.confirm('Leave the quiz?',{detail:'Your progress is saved. You can resume this attempt later from the quiz.',yes:'Leave',no:'Keep going',onYes:()=>{persist();stop();L.close(T0.lay);if(L.vid()===T0.vid)L.refresh()}});return}
 if(a==='submit'){const c=counts(at);L.confirm('Submit the quiz?',{detail:`Answered: ${c.an} · Unanswered: ${c.un} · Marked for review: ${c.mk}`,yes:'Submit',no:'Keep working',onYes:()=>{stop();L.close(T0.lay);qz.submit(at,false)}});return}
 if(a==='auto'){stop();while(L.depth()>0&&L.top()!==T0.lay)L.close(L.top());L.close(T0.lay);qz.submit(at,true)}};
function stop(){const T0=qz.T;if(!T0)return;clearInterval(T0.iv);qz.T=null}
qz.submit=function(att,auto){const vid=att.vid||L.vid();att=JSON.parse(JSON.stringify(att));const expired=auto&&att.end&&Date.now()>=att.end;
 att.sub=expired?Math.min(att.end,Date.now()):Date.now();const used=Object.values(att.tm||{}).reduce((x,y)=>x+y,0);att.time=expired?(att.tl*60):Math.max(1,used);att.r=qz.gradeAttempt(att);
 const s=db.get(vid).qz;s.attempts.push(att);L.draft.del(vid,'at',att.qid);sync(vid,att.qid);db.set(vid,db.get(vid));if(L.vid()===vid)L.refresh();
 if(auto)toast('Quiz submitted automatically');qz.results(att.id,vid)};
/* ================= RESULTS ================= */
qz.results=function(id,vid){vid=vid||L.vid();const at0=db.get(vid).qz.attempts.find(x=>x.id===id);if(!at0)return toast('Attempt not found');const R={id,vid,f:'all'};
 R.lay=L.layer(`<div class="lrn-top"><button class="g" onclick="LRN.qz.rs('close')">✕ Close</button><b>Results · ${E(at0.t)}</b><span style="flex:1"></span><button onclick="LRN.qz.rs('retake')">↻ Retake</button></div><div class="lrn-body"><div id="lrn-res" style="max-width:980px;margin:0 auto"></div></div>`,{cls:'lrn-vw',label:'Quiz results',onClose:()=>{if(qz.R===R)qz.R=null}});qz.R=R;paintRes()};
function attOf(){const R=qz.R;return R&&db.get(R.vid).qz.attempts.find(x=>x.id===R.id)}
function paintRes(){const R=qz.R,a=attOf();if(!a||!$('lrn-res'))return;const r=a.r,pend=r.pend,st=(k,v,c)=>`<div class="card" style="text-align:center;min-width:120px"><div style="font-size:1.5rem;font-weight:700;${c?'color:'+c:''}">${v}</div><small style="color:var(--mu)">${k}</small></div>`;
 const F={all:()=>1,correct:x=>x.st==='correct',incorrect:x=>x.st==='wrong'||x.st==='partial',skipped:x=>x.st==='skip',pending:x=>x.st==='self'};
 const rows=r.rows.map((x,i)=>({x,i,q:a.qs.find(q=>q.id===x.id)})).filter(o=>o.q&&F[R.f](o.x));
 const lab={correct:'✓ Correct',wrong:'✗ Incorrect',partial:'◐ Partial',skip:'— Skipped',self:'? Needs self-grade'},cl={correct:'#5fd38b',wrong:'#ff8a8a',partial:'#e0a030',skip:'var(--mu)',self:'#e0a030'};
 $('lrn-res').innerHTML=(pend?`<div class="card" role="status" style="border-color:#e0a030"><b>⚠ Provisional result.</b> ${pend} short answer${pend===1?' needs':'s need'} self-grading. Mark each as correct or incorrect below; only the final result counts in your history.</div>`:'')+
 `<div class="row" style="margin:10px 0;align-items:stretch">${st(pend?'Marks (provisional)':'Marks',r.marks+' / '+r.max)}${st('Percentage',r.pct+'%',r.pct>=50?'#5fd38b':'#ff8a8a')}${st('Accuracy',r.acc+'%')}${st('Time taken',fT(a.time))}${st('Correct',r.cor,'#5fd38b')}${st('Incorrect',r.wr+r.pa,'#ff8a8a')}${st('Skipped',r.sk)}${pend?st('To self-grade',pend,'#e0a030'):''}</div>
 <div class="row"><label style="margin:0">Show <select aria-label="Filter questions" onchange="LRN.qz.rs('f',this.value)" style="width:auto">${[['all','All questions'],['correct','Correct'],['incorrect','Incorrect'],['skipped','Skipped'],['pending','Needs self-grade']].map(x=>`<option value="${x[0]}"${R.f===x[0]?' selected':''}>${x[1]}</option>`).join('')}</select></label><small style="color:var(--mu)">${rows.length} shown</small></div>
 <div style="overflow-x:auto"><table class="lrn-tbl"><thead><tr><th>#</th><th>Question</th><th>Your answer</th><th>Correct answer</th><th>Marks</th><th>Time</th></tr></thead><tbody>${rows.map(({x,i,q})=>`<tr><td>${i+1}</td><td><div class="lrn-pre">${E(q.text)}</div><b style="color:${cl[x.st]}">${lab[x.st]}</b>${q.exp?`<details><summary>Explanation</summary><div class="lrn-pre">${E(q.exp)}</div></details>`:''}${x.st==='self'||(a.sg&&a.sg[q.id]!=null&&q.type==='short')?`<div class="row" style="margin-top:4px"><small>Self-grade:</small><button class="${a.sg&&a.sg[q.id]===true?'':'g'}" onclick="LRN.qz.rs('sg','${q.id}',true)">Mark correct</button><button class="${a.sg&&a.sg[q.id]===false?'':'g'}" onclick="LRN.qz.rs('sg','${q.id}',false)">Mark incorrect</button></div>`:''}</td><td class="lrn-pre">${E(T[q.type].fmt(q,a.ans[q.id]))}</td><td class="lrn-pre">${E(T[q.type].fmtC(q))}</td><td>${x.got>0?'+':''}${x.got} / ${x.max}</td><td>${x.tm?fT(x.tm):'—'}</td></tr>`).join('')||'<tr><td colspan="6" style="color:var(--mu);text-align:center;padding:16px">No questions match this filter.</td></tr>'}</tbody></table></div>`}
qz.rs=function(a,v,w){const R=qz.R;if(!R||!R.id)return;
 if(a==='close'){return L.close(R.lay)}
 if(a==='f'){R.f=v;return paintRes()}
 if(a==='retake'){const it=db.get(R.vid).qz.items.find(x=>x.id===attOf().qid);if(!it)return toast('This quiz no longer exists');const l=R.lay;L.close(l);if(L.vid()===R.vid)qz.open(it);return}
 if(a==='sg'){const at=attOf();at.sg=at.sg||{};at.sg[v]=w;at.r=qz.gradeAttempt(at);sync(R.vid,at.qid);db.set(R.vid,db.get(R.vid));if(L.vid()===R.vid)L.refresh();paintRes();if(at.r.status==='final')toast('All answers graded - final result saved')}};
/* ================= DRAFT PROMPTS ================= */
qz.checkDrafts=function(){if(qz.M||qz.T||L.depth())return;const vid=L.vid();if(vid==null)return;
 const at=L.draft.list(vid,'at').find(x=>!qz.offered.has('at'+vid+x.key));
 if(at){qz.offered.add('at'+vid+at.key);return L.confirm('Resume attempt?',{detail:`You have an unfinished attempt of “${at.data&&at.data.t||'a quiz'}”.`,yes:'Resume',no:'Discard',onYes:()=>qz.resume(at.data),onNo:()=>L.draft.del(vid,'at',at.key)})}
 const d=L.draft.list(vid,'qz').find(x=>!qz.offered.has('qz'+vid+x.key));if(!d)return;qz.offered.add('qz'+vid+d.key);
 L.confirm('Restore draft?',{detail:`An unsaved quiz draft${d.data&&d.data.t?` “${d.data.t}”`:''} was found.`,yes:'Restore',no:'Discard',onYes:()=>qz.build(d.data.id||null,d.data),onNo:()=>L.draft.del(vid,'qz',d.key)})};
})(window.LRN);

/*LRN:QUIZ BANK, HISTORY, FROM-DECK, TABS*/
(function(L){'use strict';
const $=id=>document.getElementById(id),E=L.E,db=L.db,rt=L.rt,qz=L.qz,T=qz.QTYPES,DIFF=qz.DIFF,fT=qz.fT;
const fd=t=>t?new Date(t).toLocaleDateString():'—';
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const uniq=a=>[...new Set(a.filter(Boolean))].sort((x,y)=>String(x).localeCompare(String(y)));
const tags=s=>[...new Set(String(s||'').split(',').map(x=>x.trim().slice(0,30)).filter(Boolean))];
const bank=()=>L.D('qz').bank;
/* ================= QUESTION BANK ================= */
qz.B={q:'',subject:'',topic:'',difficulty:'',type:'',sort:'created',dir:-1,sel:[]};
const BS={text:(a,b)=>a.text.localeCompare(b.text),subject:(a,b)=>(a.subject||'').localeCompare(b.subject||''),topic:(a,b)=>(a.topic||'').localeCompare(b.topic||''),difficulty:(a,b)=>DIFF.indexOf(a.difficulty)-DIFF.indexOf(b.difficulty),created:(a,b)=>(a.created||0)-(b.created||0)};
function bRows(){const B=qz.B,q=B.q.toLowerCase();return bank().filter(x=>(!B.subject||x.subject===B.subject)&&(!B.topic||x.topic===B.topic)&&(!B.difficulty||x.difficulty===B.difficulty)&&(!B.type||x.type===B.type)&&(!q||[x.text,x.subject,x.topic,(x.tags||[]).join(' '),(x.opts||[]).map(o=>o.t).join(' ')].join(' ').toLowerCase().includes(q))).sort((a,b)=>(BS[B.sort]||BS.created)(a,b)*B.dir)}
function bList(){const B=qz.B,rows=bRows();B.sel=B.sel.filter(id=>bank().some(x=>x.id===id));
 if(!bank().length)return `<div style="color:var(--mu);padding:22px;text-align:center"><p>The question bank is empty. Add reusable questions here, or save a question from the quiz maker.</p><button onclick="LRN.qz.bankEdit()">＋ Add your first question</button></div>`;
 return `<div class="row" style="margin:6px 0"><button class="g" onclick="LRN.qz.bs('all')">Select all</button><button class="g" onclick="LRN.qz.bs('none')">Clear</button><small style="color:var(--mu)">${B.sel.length} selected · ${rows.length} shown of ${bank().length}</small>${B.sel.length?'<button class="x" onclick="LRN.qz.bs(\'delsel\')">Delete selected</button>':''}</div><div style="overflow-x:auto"><table class="lrn-tbl"><thead><tr><th></th><th>Question</th><th>Type</th><th>Subject / topic</th><th>Difficulty</th><th>Tags</th><th></th></tr></thead><tbody>${rows.map(x=>`<tr><td><input type="checkbox" aria-label="Select question" style="width:auto" ${B.sel.includes(x.id)?'checked':''} onchange="LRN.qz.bs('tog','${x.id}')"></td><td class="lrn-pre">${E(x.text.slice(0,160))}</td><td>${E(T[x.type]?T[x.type].name:x.type)}</td><td>${E(x.subject||'—')}${x.topic?' / '+E(x.topic):''}</td><td>${E(x.difficulty||'—')}</td><td>${(x.tags||[]).map(t=>`<i class="lb">${E(t)}</i>`).join('')}</td><td style="white-space:nowrap"><button class="g" aria-label="Edit question" onclick="LRN.qz.bankEdit('${x.id}')">✎</button><button class="g" aria-label="Duplicate question" onclick="LRN.qz.bankDup('${x.id}')">⧉</button><button class="x" aria-label="Delete question" onclick="LRN.qz.bankDel('${x.id}')">✕</button></td></tr>`).join('')||'<tr><td colspan="7" style="color:var(--mu);text-align:center;padding:16px">Nothing matches these filters.</td></tr>'}</tbody></table></div>`}
function bankInner(){const B=qz.B,b=bank(),o=(arr,v,l)=>`<option value="">${l}: all</option>`+arr.map(x=>`<option${x===v?' selected':''}>${E(x)}</option>`).join('');
 return `<div class="row" style="margin-bottom:8px"><input type="search" aria-label="Search questions" placeholder="Search questions…" value="${E(B.q)}" oninput="LRN.qz.bs('q',this.value)" style="min-width:180px"><select aria-label="Subject" onchange="LRN.qz.bs('subject',this.value)">${o(uniq(b.map(x=>x.subject)),B.subject,'Subject')}</select><select aria-label="Topic" onchange="LRN.qz.bs('topic',this.value)">${o(uniq(b.map(x=>x.topic)),B.topic,'Topic')}</select><select aria-label="Difficulty" onchange="LRN.qz.bs('difficulty',this.value)">${o(DIFF,B.difficulty,'Difficulty')}</select><select aria-label="Type" onchange="LRN.qz.bs('type',this.value)"><option value="">Type: all</option>${Object.keys(T).map(k=>`<option value="${k}"${B.type===k?' selected':''}>${E(T[k].name)}</option>`).join('')}</select><select aria-label="Sort by" onchange="LRN.qz.bs('sort',this.value)">${[['created','Created'],['text','Question'],['subject','Subject'],['topic','Topic'],['difficulty','Difficulty']].map(x=>`<option value="${x[0]}"${B.sort===x[0]?' selected':''}>Sort: ${x[1]}</option>`).join('')}</select><select aria-label="Direction" onchange="LRN.qz.bs('dir',this.value)"><option value="1"${B.dir===1?' selected':''}>Ascending</option><option value="-1"${B.dir===-1?' selected':''}>Descending</option></select><button onclick="LRN.qz.bankEdit()">＋ New question</button></div><div id="lrn-bl">${bList()}</div>`}
qz.bankUI=()=>`<div id="lrn-bank">${bankInner()}</div>`;
qz.bs=function(k,v){const B=qz.B;if(k==='q'){B.q=v;$('lrn-bl').innerHTML=bList();return}
 if(k==='all')B.sel=bRows().map(x=>x.id);else if(k==='none')B.sel=[];else if(k==='tog'){const i=B.sel.indexOf(v);i<0?B.sel.push(v):B.sel.splice(i,1);$('lrn-bl').innerHTML=bList();return}
 else if(k==='delsel'){const ids=B.sel.slice();return L.confirm(`Delete ${ids.length} question(s) from the bank?`,{detail:'Quizzes that already use copies of them are not affected.',yes:'Delete',no:'Keep',noYN:1,onYes:()=>{const s=L.D('qz');s.bank=s.bank.filter(x=>!ids.includes(x.id));B.sel=[];L.sv('qz')}})}
 else B[k]=k==='dir'?+v:v;$('lrn-bank').innerHTML=bankInner()};
qz.bankDup=id=>{const s=L.D('qz'),x=s.bank.find(y=>y.id===id);if(!x)return;const c=Object.assign(qz.copyQ(x),{subject:x.subject,topic:x.topic,difficulty:x.difficulty,tags:(x.tags||[]).slice(),created:Date.now()});c.text=c.text;s.bank.push(c);L.sv('qz');toast('Duplicated')};
qz.bankDel=id=>L.confirm('Delete this question from the bank?',{yes:'Delete',no:'Keep',noYN:1,onYes:()=>{const s=L.D('qz');s.bank=s.bank.filter(x=>x.id!==id);L.sv('qz')}});
const meta=(m,p)=>`<div class="row"><label style="margin:0">Subject <input id="${p}s" maxlength="60" value="${E(m.subject||'')}" style="width:150px"></label><label style="margin:0">Topic <input id="${p}t" maxlength="60" value="${E(m.topic||'')}" style="width:150px"></label><label style="margin:0">Difficulty <select id="${p}d"><option value="">—</option>${DIFF.map(x=>`<option${x===m.difficulty?' selected':''}>${x}</option>`).join('')}</select></label><label style="margin:0">Tags (comma separated) <input id="${p}g" value="${E((m.tags||[]).join(', '))}" style="width:180px"></label></div>`;
const readMeta=(el,p)=>({subject:el.querySelector('#'+p+'s').value.trim().slice(0,60),topic:el.querySelector('#'+p+'t').value.trim().slice(0,60),difficulty:el.querySelector('#'+p+'d').value,tags:tags(el.querySelector('#'+p+'g').value)});
qz.bankEdit=function(id){const s=L.D('qz'),orig=id?s.bank.find(x=>x.id===id):null,q=orig?qz.cleanQ(JSON.parse(JSON.stringify(orig))):qz.newQ('mcq'),m=orig||{};
 const lay=L.form({title:id?'Edit bank question':'New bank question',wide:1,ok:'Save to bank',body:meta(m,'bk_')+'<div id="lrn-bqe" style="margin-top:8px"></div>',
  onOk:el=>{const f=qz.finalQ(q),er=qz.validateQ(f);if(er.length)return 'Fix this question: '+er.join('; ');const data=Object.assign(f,readMeta(el,'bk_'));
   if(orig){Object.assign(orig,data,{id:orig.id,created:orig.created||Date.now()})}else s.bank.push(Object.assign(data,{created:Date.now()}));L.sv('qz');toast('Saved to bank')}});
 qz.QE.mount(lay.el.querySelector('#lrn-bqe'),q,{dm:1,dn:0})};
qz.toBank=function(){const M=qz.M;if(!M)return;const f=qz.finalQ(M.qs[M.cur]),er=qz.validateQ(f);if(er.length)return toast('Fix the question first: '+er[0]);
 L.form({title:'Save question to bank',ok:'Save to bank',body:meta({subject:M.subject,topic:M.topic,difficulty:M.difficulty,tags:[]},'tb_'),onOk:el=>{const s=db.get(M.vid).qz;s.bank.push(Object.assign(qz.copyQ(f),readMeta(el,'tb_'),{created:Date.now()}));db.set(M.vid,db.get(M.vid));toast('Saved to bank');if(L.vid()===M.vid)L.refresh()}})};
qz.fromBank=function(){const M=qz.M;if(!M)return;const b=db.get(M.vid).qz.bank;if(!b.length)return toast('The question bank is empty');const sel=new Set();let flt='';
 const list=()=>{const q=flt.toLowerCase();return b.filter(x=>!q||[x.text,x.subject,x.topic,(x.tags||[]).join(' ')].join(' ').toLowerCase().includes(q)).map(x=>`<label class="lrn-opt" style="margin:3px 0"><input type="checkbox" data-b="${x.id}" ${sel.has(x.id)?'checked':''} style="width:auto"><span><b>${E(T[x.type]?T[x.type].icon:'')}</b> ${E(x.text.slice(0,120))}<br><small style="color:var(--mu)">${E(x.subject||'—')}${x.topic?' / '+E(x.topic):''} · ${E(x.difficulty||'no difficulty')}</small></span></label>`).join('')||'<small style="color:var(--mu)">Nothing matches.</small>'};
 const lay=L.form({title:'Add questions from bank',wide:1,ok:'Add selected',body:`<input type="search" id="fb_q" aria-label="Search bank" placeholder="Search…"><div id="fb_l" style="max-height:46vh;overflow:auto;margin-top:6px">${list()}</div><small id="fb_c" style="color:var(--mu)">0 selected</small>`,
  onOk:()=>{const pk=b.filter(x=>sel.has(x.id));if(!pk.length)return 'Select at least one question';const lone=M.qs.length===1&&!M.qs[0].text.trim()&&!M.qs[0].opts.some(o=>o.t.trim());if(lone)M.qs=[];M.qs.push(...pk.map(qz.copyQ));M.cur=Math.max(0,M.qs.length-pk.length);M.dirty=true;qz.mRefresh();toast(pk.length+' question(s) added')}});
 const wire=()=>lay.el.querySelectorAll('[data-b]').forEach(c=>c.addEventListener('change',()=>{c.checked?sel.add(c.dataset.b):sel.delete(c.dataset.b);lay.el.querySelector('#fb_c').textContent=sel.size+' selected'}));wire();
 lay.el.querySelector('#fb_q').addEventListener('input',e=>{flt=e.target.value;lay.el.querySelector('#fb_l').innerHTML=list();wire()})};
/* ================= GENERATE QUIZ FROM DECK ================= */
const pl=h=>rt.plain(h).slice(0,300);
const validCards=d=>(d.cards||[]).filter(c=>pl(c.f)&&pl(c.b));
function gen(deck,dir,n){const pool=validCards(deck).map(c=>({q:pl(dir==='bf'?c.b:c.f),a:pl(dir==='bf'?c.f:c.b)}));
 const answers=[...new Set(pool.map(x=>x.a))];if(answers.length<2)return null;
 const qs=shuf(pool).slice(0,n).map(p=>{const wrong=shuf(answers.filter(a=>a!==p.a)).slice(0,3),opts=shuf([p.a,...wrong]).map(t=>({id:qz.nid(),t}));return Object.assign(qz.newQ('mcq'),{text:p.q,opts,ans:[opts.find(o=>o.t===p.a).id]})});return qs}
qz.fromDeck=function(deckId){const s=L.D('fc'),ok=s.items.filter(d=>validCards(d).length>=4);
 if(deckId){const d=s.items.find(x=>x.id===deckId);if(!d)return toast('Deck not found');if(validCards(d).length<4)return toast('A deck needs at least 4 cards with text on both sides to generate a quiz')}
 else if(!ok.length)return toast('No deck has at least 4 usable cards yet');
 const pickD=deckId?'':`<label>Flashcard deck<select id="gd_k">${ok.map(d=>`<option value="${d.id}">${E(d.t)} (${validCards(d).length} cards)</option>`).join('')}</select></label>`,d0=deckId?s.items.find(x=>x.id===deckId):ok[0],n0=validCards(d0).length;
 L.form({title:'Generate quiz from deck',ok:'Generate',body:`${pickD}${deckId?`<p>Deck: <b>${E(d0.t)}</b> (${n0} usable cards)</p>`:''}<label>Direction<select id="gd_d"><option value="fb">Front = question, back = answer</option><option value="bf">Back = question, front = answer</option></select></label><label>Number of questions<input type="number" id="gd_n" min="1" max="${n0}" step="1" value="${Math.min(10,n0)}"></label><small style="color:var(--mu)">Wrong options are taken from other cards. The result opens in the maker so you can review it before saving.</small>`,
  onOk:el=>{const deck=deckId?d0:s.items.find(x=>x.id===el.querySelector('#gd_k').value),nmax=validCards(deck).length,n=Math.floor(Number(el.querySelector('#gd_n').value));if(!(n>=1&&n<=nmax))return `Enter a number of questions between 1 and ${nmax}`;
   const qs=gen(deck,el.querySelector('#gd_d').value,n);if(!qs)return 'The cards need at least 2 different answers to make multiple-choice questions';
   setTimeout(()=>qz.openMaker(null,{fromDeck:true,t:('Quiz: '+deck.t).slice(0,80),topic:deck.t.slice(0,60),color:deck.ring||'#2f55d4',questions:qs}),0)}})};
/* ================= HISTORY & ANALYTICS ================= */
qz.H={quiz:'',subject:'',status:'all',sort:'ts',dir:-1};
const HS={ts:a=>a.sub||0,score:a=>a.r.pct,acc:a=>a.r.acc,time:a=>a.time||0};
function svg(title,pts,o){o=o||{};if(!pts.length)return `<div class="card"><h4 style="margin:0 0 6px">${E(title)}</h4><small style="color:var(--mu)">No completed attempts to chart yet.</small></div>`;
 const W=560,H=190,l=44,r=14,t=14,b=28,ymax=o.max||Math.max(1,...pts.map(p=>p.y))*1.15,n=pts.length,cw=W-l-r,x=i=>n===1?l+cw/2:l+i*cw/(n-1),y=v=>t+(H-t-b)*(1-Math.max(0,Math.min(ymax,v))/ymax),f=o.fmt||(v=>Math.round(v));
 const grid=[0,.5,1].map(k=>`<line x1="${l}" x2="${W-r}" y1="${y(ymax*k)}" y2="${y(ymax*k)}" stroke="#ffffff26"/><text x="${l-5}" y="${y(ymax*k)+4}" text-anchor="end" font-size="10" fill="#9aa3b5">${f(ymax*k)}${o.u||''}</text>`).join('');
 const bw=Math.max(4,Math.min(34,cw/n*.6));
 const body=o.bar?pts.map((p,i)=>`<rect x="${x(i)-bw/2}" y="${y(p.y)}" width="${bw}" height="${H-b-y(p.y)}" fill="#6a8cff" rx="2"><title>${E(p.l)}: ${f(p.y)}${o.u||''}</title></rect>`).join(''):`<polyline fill="none" stroke="#6a8cff" stroke-width="2" points="${pts.map((p,i)=>x(i)+','+y(p.y)).join(' ')}"/>`+pts.map((p,i)=>`<circle cx="${x(i)}" cy="${y(p.y)}" r="4" fill="#6a8cff"><title>${E(p.l)}: ${f(p.y)}${o.u||''}</title></circle>`).join('');
 return `<div class="card"><h4 style="margin:0 0 6px">${E(title)}</h4><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${E(title)}" style="width:100%;height:auto">${grid}${body}<text x="${l}" y="${H-8}" font-size="10" fill="#9aa3b5">${E(pts[0].l)}</text>${n>1?`<text x="${W-r}" y="${H-8}" font-size="10" fill="#9aa3b5" text-anchor="end">${E(pts[n-1].l)}</text>`:''}</svg></div>`}
function histInner(){const H=qz.H,all=L.D('qz').attempts.filter(a=>a.r),opt=(arr,v,l)=>`<option value="">${l}: all</option>`+arr.map(x=>`<option value="${E(x[0])}"${x[0]===v?' selected':''}>${E(x[1])}</option>`).join('');
 const qmap=new Map();all.forEach(a=>qmap.set(a.qid,a.t));
 if(!all.length)return `<div style="color:var(--mu);padding:22px;text-align:center"><p>No quiz attempts yet. Take a quiz and your scores, accuracy and time will appear here.</p></div>`;
 const fl=all.filter(a=>(!H.quiz||a.qid===H.quiz)&&(!H.subject||a.subject===H.subject)&&(H.status==='all'||(H.status==='final')===(a.r.status==='final'))),fin=fl.filter(a=>a.r.status==='final').sort((a,b)=>a.sub-b.sub),lab=a=>new Date(a.sub).toLocaleDateString();
 const rows=fl.slice().sort((a,b)=>(HS[H.sort](a)-HS[H.sort](b))*H.dir);
 const byQ=new Map();fl.forEach(a=>{if(!byQ.has(a.qid))byQ.set(a.qid,[]);byQ.get(a.qid).push(a)});
 const prog=[...byQ].map(([id,arr])=>{const f=arr.filter(a=>a.r.status==='final').sort((a,b)=>a.sub-b.sub),it=L.D('qz').items.find(x=>x.id===id),pc=f.map(a=>a.r.pct),tr=f.length>1?qz.r2(pc[pc.length-1]-pc[0]):null;return `<tr><td>${E(arr[arr.length-1].t)}</td><td>${arr.length}</td><td>${f.length?pc[0]+'%':'—'}</td><td>${f.length?pc[pc.length-1]+'%':'—'}</td><td>${f.length?Math.max(...pc)+'%':'—'}</td><td>${f.length?qz.r2(pc.reduce((x,y)=>x+y,0)/pc.length)+'%':'—'}</td><td style="color:${tr==null?'var(--mu)':tr>=0?'#5fd38b':'#ff8a8a'}">${tr==null?'—':(tr>=0?'▲ +':'▼ ')+tr+' pts'}</td><td>${it?`<button class="g" onclick="LRN.qz.hs('retake','${id}')">↻ Retake</button>`:''}</td></tr>`}).join('');
 return `<div class="row" style="margin-bottom:8px"><select aria-label="Quiz" onchange="LRN.qz.hs('quiz',this.value)">${opt([...qmap].map(([k,v])=>[k,v]),H.quiz,'Quiz')}</select><select aria-label="Subject" onchange="LRN.qz.hs('subject',this.value)">${opt(uniq(all.map(a=>a.subject)).map(x=>[x,x]),H.subject,'Subject')}</select><select aria-label="Status" onchange="LRN.qz.hs('status',this.value)">${[['all','All results'],['final','Final only'],['prov','Provisional only']].map(x=>`<option value="${x[0]}"${H.status===x[0]?' selected':''}>${x[1]}</option>`).join('')}</select><select aria-label="Sort by" onchange="LRN.qz.hs('sort',this.value)">${[['ts','Date'],['score','Score %'],['acc','Accuracy'],['time','Time taken']].map(x=>`<option value="${x[0]}"${H.sort===x[0]?' selected':''}>Sort: ${x[1]}</option>`).join('')}</select><select aria-label="Direction" onchange="LRN.qz.hs('dir',this.value)"><option value="-1"${H.dir===-1?' selected':''}>Newest / highest first</option><option value="1"${H.dir===1?' selected':''}>Oldest / lowest first</option></select><small style="color:var(--mu)">${fl.length} attempt${fl.length===1?'':'s'} · charts use final results only (${fin.length})</small></div>
 <div class="grid">${svg('Score % over time',fin.map(a=>({l:lab(a),y:a.r.pct})),{max:100,u:'%'})}${svg('Accuracy over time',fin.map(a=>({l:lab(a),y:a.r.acc})),{max:100,u:'%'})}${svg('Time taken per attempt',fin.map(a=>({l:lab(a),y:a.time||0})),{bar:1,fmt:fT})}</div>
 <h4>Per-quiz progress</h4><div style="overflow-x:auto"><table class="lrn-tbl"><thead><tr><th>Quiz</th><th>Attempts</th><th>First</th><th>Latest</th><th>Best</th><th>Average</th><th>Change</th><th></th></tr></thead><tbody>${prog||'<tr><td colspan="8">—</td></tr>'}</tbody></table></div>
 <h4>All attempts</h4><div style="overflow-x:auto"><table class="lrn-tbl"><thead><tr><th>Date</th><th>Quiz</th><th>Marks</th><th>Score</th><th>Accuracy</th><th>Time</th><th>Status</th><th></th></tr></thead><tbody>${rows.map(a=>`<tr><td>${new Date(a.sub).toLocaleString()}</td><td>${E(a.t)}</td><td>${a.r.marks} / ${a.r.max}</td><td>${a.r.pct}%</td><td>${a.r.acc}%</td><td>${fT(a.time)}</td><td>${a.r.status==='final'?'Final':'<span style="color:#e0a030">Provisional</span>'}</td><td style="white-space:nowrap"><button class="g" onclick="LRN.qz.hs('view','${a.id}')">View</button><button class="g" onclick="LRN.qz.hs('retake','${a.qid}')">↻ Retake</button></td></tr>`).join('')||'<tr><td colspan="8" style="color:var(--mu);text-align:center;padding:14px">No attempts match.</td></tr>'}</tbody></table></div>`}
qz.histUI=()=>`<div id="lrn-hist">${histInner()}</div>`;
qz.hs=function(k,v){const H=qz.H;if(k==='view')return qz.results(v);if(k==='retake'){const it=L.D('qz').items.find(x=>x.id===v);if(!it)return toast('This quiz no longer exists');return qz.open(it)}
 H[k]=k==='dir'?+v:v;if(k==='quiz'&&v)H.subject='';$('lrn-hist').innerHTML=histInner()};
/* ================= TAB BAR (replaces the generic 3-tab library view for quizzes) ================= */
const _lib=L.lib,_rf=L.refresh;
L.lib=function(k){if(k!=='qz')return _lib(k);let t=L.it.qz;const TB=[['make','Quiz maker'],['manage','Quiz manager'],['bank','Question bank'],['hist','History & analytics'],['settings','Settings']];if(!TB.some(x=>x[0]===t))t=L.it.qz='manage';
 const mk=`<div class="card" style="max-width:640px"><h3>Quiz maker</h3><p style="color:var(--mu)">${L.libs.qz.makerInfo}</p><div class="row"><button onclick="LRN.qz.create()">${L.D('qz').items.length?'＋ Create new quiz':'Create your first quiz'}</button><button class="g" onclick="LRN.qz.fromDeck()">🗂 Generate from a flashcard deck</button></div><p style="color:var(--mu)">Question types: single answer, multiple select, true/false and short answer. Reuse questions through the Question bank tab.</p></div>`;
 return `<div class="sw" style="margin-bottom:10px;align-items:center" role="tablist">${TB.map(x=>`<button role="tab" aria-selected="${t===x[0]}" class="${t===x[0]?'':'g'}" onclick="LRN.itab('qz','${x[0]}')">${x[1]}</button>`).join('')}<span style="flex:1"></span><button onclick="LRN.qz.create()" data-create="qz">＋ Create new</button></div>`+(t==='make'?mk:t==='bank'?qz.bankUI():t==='hist'?qz.histUI():t==='settings'?L.settings('qz'):L.manager('qz'))};
L.refresh=function(){_rf();try{if($('lrn-hist'))$('lrn-hist').innerHTML=histInner();if($('lrn-bank'))$('lrn-bank').innerHTML=bankInner()}catch(e){console.warn('LRN refresh',e)}};
})(window.LRN);

/*LRN:GLUE (nav, migration, hooks, dashboard)*/
(function(L){'use strict';
const E=L.E,rt=L.rt,db=L.db,$=id=>document.getElementById(id);
const fd=t=>t?new Date(t).toLocaleDateString():'—';
const grp=k=>[['','No grouping'],['folder','Folder',i=>[L.fp(k,i.folder)||'Unfiled']],['label','Label',i=>i.labels&&i.labels.length?i.labels:['No label']]];
const soon=n=>()=>toast(n);
L.stage=m=>toast(m);
/* ---- one-time lazy migration (idempotent, flags live in the learning store; v.notes / v.cards are never touched) ---- */
L.migrate=function(id){const o=db.get(id),v=S.vaults.find(x=>x.id===id);let ch=false;
 if(!o.sn.migrated){o.sn.migrated=1;ch=true;const nn=v?(v.notes||[]).filter(n=>n&&typeof n.t==='string'&&n.t.trim()):[];
  if(nn.length){const f={id:L.uid(),name:'Imported',desc:'Imported from your old sticky notes',color:'#e0a030',emoji:'📥',parent:''};o.sn.folders.push(f);const bg=(o.sn.def&&o.sn.def.bg)||'#fff7b8';nn.forEach(n=>{o.sn.items.push(L.mkNote({t:n.t.trim().split('\n')[0].slice(0,60),pages:[{h:rt.clean(rt.fromText(n.t.trim())),bg,ov:false}],folder:f.id,color:bg}))})}}
 if(!o.fc.migrated){o.fc.migrated=1;ch=true;const cc=v?(v.cards||[]).filter(c=>c&&(String(c.q||'').trim()||String(c.a||'').trim())):[];
  if(cc.length){const n=Date.now();o.fc.items.push({id:L.uid(),t:'Imported cards',d:'Imported from your old flashcards',labels:[],folder:'',fav:false,ring:'#2f55d4',emoji:'🗂',cards:cc.map(c=>({id:L.uid(),f:rt.clean(rt.fromText(String(c.q||''))),b:rt.clean(rt.fromText(String(c.a||''))),h:'',k:0,m:0})),created:n,updated:n,studied:0})}}
 if(!o.qz.migrated){o.qz.migrated=true;ch=true}
 if(ch)db.set(id,o)};
/* ---- Learning page ---- */
const TABS=[['ov','Overview'],['sn','Sticky notes'],['fc','Flashcards'],['qz','Quizzes']];
learn=function(){try{L.db.load();return `<div class="lrn-wrap"><h2>Learning centre</h2><div class="sw" style="margin-bottom:12px" role="tablist">${TABS.map(t=>`<button role="tab" aria-selected="${L.t===t[0]}" class="${L.t===t[0]?'':'g'}" onclick="LRN.tab('${t[0]}')">${t[1]}</button>`).join('')}</div>`+(L.t==='ov'?['sn','fc','qz'].map(k=>L.sec(k,'o:'+k)).join('')+soon(['Whiteboard','Library','Mind maps','Revision reminders','Grading space','Roadmap']):L.lib(L.t))+'</div>'}catch(e){console.error('LRN learn()',e);return `<h2>Learning centre</h2><div class="card">The Learning centre could not load: ${esc(e&&e.message||e)}</div>`}};
/* ---- sidebar ---- */
const _sb=window.sbSub;window.sbSub=(c,l)=>{if(c==='learn'){L.t=({'Overview':'ov','Sticky notes':'sn','Flashcards':'fc','Quizzes':'qz'})[l]||'ov';window.sbGo('learn');return}return _sb(c,l)};
/* ---- render hook ---- */
let lastV=null;
L.after=function(){if(view!=='vault'){return}const id=L.vid();if(id!==lastV){lastV=id;L.SEL={};L.SQ={};L.SUI={}}
 if(tab==='learn'){document.querySelectorAll('aside button[onclick^="sbSub(\'learn\'"]').forEach(b=>{const m=/sbSub\('learn','([^']+)'/.exec(b.getAttribute('onclick')),k=m&&({'Overview':'ov','Sticky notes':'sn','Flashcards':'fc','Quizzes':'qz'})[m[1]];b.classList.toggle('on',k===L.t)})}
 L.refresh();L.fit();setTimeout(()=>{try{if(tab==='learn'){L.sn.checkDrafts();L.fc.checkDrafts()}L.qz.checkDrafts()}catch(e){console.warn('LRN drafts',e)}},0)};
const _r=render;render=function(){_r();try{L.after()}catch(e){console.error('LRN after',e)}};
/* ---- dashboard blocks (above Sources) ---- */
const _d=dash;dash=function(){let h=_d();try{const a='<h2 style="margin-top:22px">Sources</h2>';if(h.split(a).length===2){L.db.load();h=h.replace(a,()=>'<h2 style="margin-top:22px">Learning</h2>'+['sn','fc','qz'].map(k=>L.sec(k,'d:'+k)).join('')+a)}else console.warn('LRN: dashboard anchor not found, Learning blocks skipped')}catch(e){console.warn('LRN dash',e)}return h};
/* ---- delete vault hook ---- */
const _dv=delV;delV=function(id){_dv(id);try{if(!S.vaults.some(v=>v.id===id))L.db.remove(id)}catch(e){console.warn('LRN delV',e)}};
/* ---- backup hook ---- */
const _bk=window.cwBk;window.cwBk=m=>{
 if(!m){S.learning=L.db.export();try{_bk(m)}finally{delete S.learning}return}
 const t=prompt('Paste all data text');if(!t)return;
 try{const o=JSON.parse(t);if(!Array.isArray(o.vaults))throw 0;const hasL=o.learning!==undefined;
  if(hasL&&!L.db.validate(o.learning)){toast('Invalid learning data in backup - nothing was changed');return}
  if(!confirm('Replace ALL current data?'))return;
  const lr=o.learning;delete o.learning;S=o;save();
  if(hasL)L.db.import(lr);else{L.db.clear();toast('Old backup: learning data was cleared')}
  L.db.flush();view='vaults';render();if(hasL)toast('Restored')}catch(e){toast('Invalid data text')}};
})(window.LRN);

/*LRN:END*/
/*DSH:BEGIN dashboard tidy-up (progress+upcoming merged, editable shortcuts)*/
window.DSH=(function(){
const D={};
const DEF=[['Wikipedia','https://en.wikipedia.org/'],['Khan Academy','https://www.khanacademy.org/'],['MIT OpenCourseWare','https://ocw.mit.edu/'],['MDN Web Docs','https://developer.mozilla.org/'],['GitHub','https://github.com/'],['Google Scholar','https://scholar.google.com/']];
const MAX=40;
const list=v=>{if(!Array.isArray(v.shortcuts))v.shortcuts=DEF.map(x=>({t:x[0],u:x[1]}));return v.shortcuts};
const normUrl=s=>{s=String(s||'').trim();if(!s)return null;if(!/^[a-z][a-z0-9+.-]*:/i.test(s))s='https://'+s;try{const u=new URL(s);if(u.protocol!=='http:'&&u.protocol!=='https:')return null;if(!u.hostname||(u.hostname.indexOf('.')<0&&u.hostname!=='localhost'))return null;return u.href}catch(e){return null}};
const ui=D.ui={vid:null,add:false,sel:false,pick:[]};
const msg=(t)=>{const e=document.getElementById('dsh-err');if(e)e.textContent=t||''};
const repaint=()=>{const v=V(),e=document.getElementById('dsh-card');if(!v||!e){render();return}e.outerHTML=D.shortcuts(v)};
D.add=function(){const v=V();if(!v)return;const t=(document.getElementById('dsh-t')||{}).value||'',u=(document.getElementById('dsh-u')||{}).value||'';
 const tt=t.trim();if(!tt)return msg('Enter a title.');if(tt.length>40)return msg('Title must be 40 characters or fewer.');
 const url=normUrl(u);if(!url)return msg('Enter a valid web address, e.g. example.com');
 const a=list(v);if(a.length>=MAX)return msg('You can keep up to '+MAX+' quick links. Remove one first.');
 a.push({t:tt,u:url});save();repaint();setTimeout(()=>{const e=document.getElementById('dsh-t');if(e)e.focus()},0)};
D.del=function(i){const v=V();if(!v)return;const a=list(v);if(i<0||i>=a.length)return;a.splice(i,1);save();ui.pick=[];repaint()};
D.key=function(e){if(e.key==='Enter'){e.preventDefault();D.add()}else if(e.key==='Escape'){ui.add=false;repaint()}};
D.toggleAdd=function(){ui.add=!ui.add;if(ui.add)ui.sel=false;ui.pick=[];repaint();if(ui.add)setTimeout(()=>{const e=document.getElementById('dsh-t');if(e)e.focus()},0)};
D.toggleSel=function(){ui.sel=!ui.sel;if(ui.sel)ui.add=false;ui.pick=[];repaint()};
D.tog=function(i){const k=ui.pick.indexOf(i);if(k>=0)ui.pick.splice(k,1);else ui.pick.push(i);repaint()};
D.all=function(){const v=V();if(!v)return;const n=list(v).length;ui.pick=ui.pick.length===n?[]:Array.from({length:n},(_,i)=>i);repaint()};
D.rmSel=function(){const v=V();if(!v||!ui.pick.length)return;const a=list(v),s=new Set(ui.pick);v.shortcuts=a.filter((_,i)=>!s.has(i));save();ui.pick=[];ui.sel=false;repaint()};
const lbl=(d,t0,t1)=>{if(!d)return['No date','var(--mu)'];if(d<t0)return['Overdue · '+d,'#ff8a8a'];if(d===t0)return['Today','#ffb84d'];if(d===t1)return['Tomorrow','#ffb84d'];return[d,'var(--mu)']};
D.upcoming=function(v){const t0=iso(new Date()),n=new Date();n.setDate(n.getDate()+1);const t1=iso(n);
 const all=(v.tasks||[]).filter(x=>x&&!x.x),up=all.slice().sort((a,b)=>(a.d||'9').localeCompare(b.d||'9')).slice(0,6);
 const over=all.filter(x=>x.d&&x.d<t0).length;
 return `<div style="margin-top:16px;padding-top:12px;border-top:1px solid var(--bd)"><div class="row" style="justify-content:space-between;margin-bottom:6px"><h4 style="margin:0">Upcoming tasks &amp; deadlines <small style="color:var(--mu);font-weight:400">· ${all.length} open${over?` · <span style="color:#ff8a8a">${over} overdue</span>`:''}</small></h4></div>${up.length?`<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:0 18px">${up.map(x=>{const l=lbl(x.d,t0,t1);return `<div class="t"><span>${esc(x.t)}</span><small style="color:${l[1]}">${esc(l[0])}</small></div>`}).join('')}</div>`:'<p style="color:var(--mu);margin:6px 0">No open tasks. Nice work!</p>'}</div>`};
D.shortcuts=function(v){const a=list(v);if(ui.vid!==v.id){ui.vid=v.id;ui.add=false;ui.sel=false;ui.pick=[]}ui.pick=ui.pick.filter(i=>i<a.length);
 const sel=ui.sel,box=(s,i)=>sel?`<button type="button" class="dsh-box${ui.pick.includes(i)?' on':''}" aria-pressed="${ui.pick.includes(i)}" title="${esc(s.u)}" onclick="DSH.tog(${i})"><span class="dsh-ck" aria-hidden="true">${ui.pick.includes(i)?'✓':''}</span><span class="dsh-tx">${esc(s.t)}</span></button>`:`<a class="dsh-box" target="_blank" rel="noopener noreferrer" href="${esc(s.u)}" title="${esc(s.u)}"><span class="dsh-tx">${esc(s.t)}</span><span class="dsh-ar" aria-hidden="true">↗</span></a>`;
 return `<div class="card" id="dsh-card" style="grid-column:1/-1"><style>.dsh-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px;margin-top:12px}.dsh-box{display:flex;align-items:center;gap:8px;justify-content:space-between;min-width:0;padding:10px 12px;border:1px solid var(--bd);border-radius:10px;background:rgba(255,255,255,.03);color:#6a8cff;text-decoration:none;cursor:pointer;font:inherit;text-align:left;transition:background .15s,border-color .15s}.dsh-box:hover{background:rgba(106,140,255,.12);border-color:#6a8cff}.dsh-box:focus-visible{outline:2px solid #6a8cff;outline-offset:2px}.dsh-tx{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}.dsh-ar{opacity:.6;flex:none}.dsh-ck{flex:none;width:18px;height:18px;border:1.5px solid var(--mu);border-radius:5px;display:inline-flex;align-items:center;justify-content:center;font-size:.8rem;color:#fff}.dsh-box.on{border-color:#6a8cff;background:rgba(106,140,255,.2)}.dsh-box.on .dsh-ck{background:#2f55d4;border-color:#2f55d4}</style>
<div class="row" style="justify-content:space-between"><h3 style="margin:0">Shortcuts</h3><div class="row"><button class="${ui.add?'':'g'}" aria-pressed="${ui.add}" onclick="DSH.toggleAdd()">＋ Quick add</button><button class="${sel?'':'g'}" aria-pressed="${sel}" onclick="DSH.toggleSel()"${a.length?'':' disabled'}>☑ Select</button></div></div>
${ui.add?`<div class="row" style="margin-top:12px"><input id="dsh-t" maxlength="40" placeholder="Title" aria-label="Link title" style="flex:1 1 140px;min-width:120px;width:auto" onkeydown="DSH.key(event)"><input id="dsh-u" placeholder="URL (e.g. example.com)" aria-label="Link URL" inputmode="url" style="flex:2 1 220px;min-width:160px;width:auto" onkeydown="DSH.key(event)"><button onclick="DSH.add()">Add</button><button class="g" onclick="DSH.toggleAdd()">Cancel</button></div><div id="dsh-err" role="alert" style="color:#ff8a8a;font-size:.85rem;min-height:1.2em;margin-top:4px"></div>`:''}
${sel?`<div class="row" style="margin-top:12px"><button class="g" onclick="DSH.all()">${ui.pick.length===a.length?'Clear selection':'Select all'}</button><small style="color:var(--mu)">${ui.pick.length} selected</small><span style="flex:1"></span><button class="x" onclick="DSH.rmSel()"${ui.pick.length?'':' disabled'}>🗑 Remove selected</button><button class="g" onclick="DSH.toggleSel()">Done</button></div>`:''}
${a.length?`<div class="dsh-g">${a.map(box).join('')}</div>`:'<p style="color:var(--mu);margin:12px 0 0">No quick links yet. Use “Quick add” to add one.</p>'}</div>`};
const _d=dash;
dash=function(){let h=_d();try{const v=V();if(!v)return h;
 const rxF=/<div class="card"><h3>Focus sessions<\/h3><div class="big2">[^<]*<\/div><\/div>\n?/,rxH=/<div class="card"><h3>Habit check-ins<\/h3><div class="big2">[^<]*<\/div><\/div>\n?/,
  rxP=/<div class="card" style="grid-column:span 2;min-width:min\(100%,360px\)">(<div class="row" style="justify-content:space-between"><h3 style="margin:0">Progress<\/h3>[\s\S]*?)<\/div>(?=\n?<div class="card"><h3>Focus sessions)/,
  rxU=/<div class="card"><h3>Upcoming tasks &(?:amp;)? deadlines<\/h3>[\s\S]*?<\/div>\n+(?=<div class="card"><h3>Shortcuts)/,
  rxS=/<div class="card"><h3>Shortcuts<\/h3>[\s\S]*?<\/div><\/div>(?=<br>)/;
 const ok=[rxF,rxH,rxP,rxU,rxS].every(r=>r.test(h));
 if(!ok){console.warn('DSH: dashboard markup not recognised, left unchanged');return h}
 h=h.replace(rxP,(m,inner)=>`<div class="card" style="grid-column:1/-1">${inner}${D.upcoming(v)}</div>`);
 h=h.replace(rxF,'').replace(rxH,'');
 h=h.replace(rxU,'');
 h=h.replace(rxS,()=>D.shortcuts(v)+'</div>');
}catch(e){console.warn('DSH',e)}return h};
return D})();
/*DSH:END*/
/* ===== v13 extras ===== */
window.PVX=window.PVX||{};
(function(P){'use strict';
/* --- Profile: header card, avatar picker, validation --- */
P.VERSION='v13';
P.css=`.pvx-hd{max-width:640px;margin-bottom:14px}.pvx-hd1{display:flex;gap:16px;align-items:center;flex-wrap:wrap}.pvx-hdt{flex:1;min-width:180px}
.pvx-nm{font-size:1.35rem;font-weight:700;overflow-wrap:anywhere}.pvx-hl{color:var(--tx);opacity:.9;margin-top:2px;overflow-wrap:anywhere}.pvx-gl{color:var(--mu);margin-top:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;overflow-wrap:anywhere}
.pvx-cp{margin-top:14px}.pvx-cp .row{justify-content:space-between;margin-bottom:4px}
.pvx-pick{margin-top:14px;border-top:1px solid var(--bd);padding-top:12px}.pvx-pick .row{margin-bottom:8px}.pvx-pick button[aria-pressed=true]{border-color:var(--navy2);background:#12121c}
.pvx-sw{width:30px;height:30px;border-radius:50%;padding:0;border:2px solid transparent;flex:none}.pvx-sw[aria-pressed=true]{border-color:#fff}
.pvx-ic{width:44px;height:44px;padding:4px;border-radius:10px;display:inline-flex;align-items:center;justify-content:center}
.pvx-st{margin-top:8px}.pvx-st .bar{margin-top:6px}.pvx-st .bar i.pvx-warn{background:linear-gradient(90deg,#c0392b,#ff8a8a)}
.pvx-pr{display:flex;gap:10px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;padding:10px 0;border-top:1px solid var(--bd)}.pvx-pr:first-of-type{border-top:0}.pvx-pr>div:first-child{flex:1;min-width:200px}
.pvx-sb{display:inline-block;padding:1px 9px;border-radius:20px;font-size:.78rem;border:1px solid var(--bd);margin-left:6px}.pvx-sb.ok{color:#2fd0a0;border-color:#2fd0a0}.pvx-sb.no{color:#ff8a8a;border-color:#ff8a8a}.pvx-sb.na{color:var(--mu)}
.pvx-note{color:var(--mu);font-size:.85rem;margin:6px 0 0}
.pvx-flash{position:fixed;left:0;right:0;top:0;z-index:60;background:#fff;color:#000;text-align:center;font-weight:700;padding:14px 12px;border-bottom:4px solid #ff3b3b;box-shadow:0 4px 20px rgba(0,0,0,.6)}
.pvx-rm *,.pvx-rm *::before,.pvx-rm *::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important;scroll-behavior:auto!important}
.pvx-rm .lrn-ov *{transition:none!important;animation:none!important}.pvx-rm .lrn-fcd{transform:none!important;transition:none}.pvx-rm .lrn-fs{backface-visibility:visible;-webkit-backface-visibility:visible}.pvx-rm .lrn-fs.bk{transform:none;opacity:0}.pvx-rm .lrn-fcd.fl .lrn-fs.fr{opacity:0}.pvx-rm .lrn-fcd.fl .lrn-fs.bk{opacity:1}`;
document.head.insertAdjacentHTML('beforeend','<style id="pvx-css">'+P.css+'</style>');
const SW=HC;
const ICN={book:'<path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 1-2-2z"/><path d="M5 18a2 2 0 0 1 2-2h12"/>',rocket:'<path d="M12 3c3 2 5 5 5 9l-2 3H9l-2-3c0-4 2-7 5-9z"/><circle cx="12" cy="10" r="1.6"/><path d="M9 15l-2 4 3-1M15 15l2 4-3-1"/>',star:'<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',code:'<path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',brain:'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1z"/><path d="M15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/>',atom:'<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.8"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)"/>',music:'<path d="M9 18V5l11-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',leaf:'<path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15z"/><path d="M5 19l8-8"/>'};
const ICK=Object.keys(ICN);
const PR=()=>(S.profile||(S.profile={}));
const AV=()=>{const p=PR();let a=p.avatar;if(!a||typeof a!=='object'||!a.t)a={t:p.pic?'upload':'initials',c:0,i:'book'};if(a.t==='upload'&&!p.pic)a=Object.assign({},a,{t:'initials'});if(a.t==='icon'&&!ICN[a.i])a=Object.assign({},a,{i:'book'});a.c=((+a.c||0)%SW.length+SW.length)%SW.length;return a};
const MODE=()=>{const a=PR().avatar;return a&&['upload','initials','icon'].includes(a.t)?a.t:AV().t};
const initials=n=>{const w=String(n||'').trim().split(/\s+/).filter(Boolean).slice(0,2);return w.length?w.map(x=>Array.from(x)[0].toUpperCase()).join(''):'?'};
P.avatar=function(size){size=size||88;const p=PR(),a=AV(),c=SW[a.c];
 if(a.t==='upload')return `<img src="${esc(p.pic)}" alt="Profile picture" width="${size}" height="${size}" style="border-radius:50%;object-fit:cover;flex:none;border:2px solid #2f55d4">`;
 if(a.t==='icon')return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" style="flex:none" role="img" aria-label="Profile icon"><circle cx="24" cy="24" r="23" fill="${c}" stroke="#2f55d4" stroke-width="2"/><g transform="translate(10 10) scale(1.1667)" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICN[a.i]}</g></svg>`;
 const t=initials(p.name);return `<svg width="${size}" height="${size}" viewBox="0 0 48 48" style="flex:none" role="img" aria-label="Initials ${esc(t)}"><circle cx="24" cy="24" r="23" fill="${c}" stroke="#2f55d4" stroke-width="2"/><text x="24" y="24" dy=".35em" text-anchor="middle" font-size="${t.length>1?18:22}" font-weight="700" fill="#fff" font-family="inherit">${esc(t)}</text></svg>`};
const isFull=e=>!!e&&(e.name==='QuotaExceededError'||e.code===22||e.code===1014||/quota/i.test(e.name||''));
const snapP=()=>JSON.stringify(PR());
const restoreP=sn=>{const p=PR();Object.keys(p).forEach(k=>delete p[k]);Object.assign(p,JSON.parse(sn))};
/* try to save now; on failure restore the old profile and tell the user */
P.commitProfile=function(mut,what){const sn=snapP();try{mut();localStorage.setItem(K,JSON.stringify(S))}catch(e){restoreP(sn);toast(isFull(e)?'Storage is full, so '+what+' was not saved. Your previous data is unchanged. Copy your data from Settings to free space.':'Could not save '+what+'. Your previous data is unchanged.');return false}try{save()}catch(e){}return true};
const PCNT=['name','email','username','age','gender','occupation','skills','future','goal'];
P.header=function(){const p=PR(),a=AV(),md=MODE(),n=PCNT.filter(k=>String(p[k]||'').trim()).length,pc=Math.round(n/PCNT.length*100),hl=[String(p.occupation||'').trim(),String(p.workplace||'').trim()].filter(Boolean),head=hl.length===2?hl[0]+' at '+hl[1]:hl[0]||'',
 swatches=`<div class="row" role="group" aria-label="Avatar colour">${SW.map((c,i)=>`<button type="button" class="pvx-sw" style="background:${c}" aria-label="Colour ${i+1}" aria-pressed="${a.c===i}" onclick="PVX.setAv({c:${i}})"></button>`).join('')}</div>`,
 icons=`<div class="row" role="group" aria-label="Avatar icon">${ICK.map(k=>`<button type="button" class="g pvx-ic" aria-label="${k} icon" aria-pressed="${a.t==='icon'&&a.i===k}" onclick="PVX.setAv({t:'icon',i:'${k}'})"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICN[k]}</svg></button>`).join('')}</div>`;
 return `<div class="card pvx-hd"><div class="pvx-hd1">${P.avatar(88)}<div class="pvx-hdt"><div class="pvx-nm">${esc(String(p.name||'').trim()||'Your name')}</div><div class="pvx-hl">${esc(head||'Add your occupation below')}</div>${String(p.goal||'').trim()?`<div class="pvx-gl">${esc(String(p.goal).trim())}</div>`:''}</div></div>
<div class="pvx-cp"><div class="row"><small style="color:var(--mu)">Profile completeness</small><small id="pvx-cpt" style="color:var(--mu)">${n} of ${PCNT.length} complete</small></div><div class="bar" role="progressbar" aria-label="Profile completeness" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pc}"><i style="width:${pc}%"></i></div></div>
<div class="pvx-pick"><div class="row" role="group" aria-label="Avatar type"><button type="button" class="g" aria-pressed="${md==='upload'}" onclick="PVX.setAv({t:'upload'})">Photo</button><button type="button" class="g" aria-pressed="${md==='initials'}" onclick="PVX.setAv({t:'initials'})">Initials</button><button type="button" class="g" aria-pressed="${md==='icon'}" onclick="PVX.setAv({t:'icon'})">Icon</button></div>
${md==='upload'?`<div class="row"><input id="pvx-file" type="file" accept="image/*" aria-label="Upload a photo" onchange="cwPic(this)">${p.pic?'<button type="button" class="x" onclick="PVX.rmPic()">Remove photo</button>':''}</div><small style="color:var(--mu)">Picture is cropped to a square, resized and stored in this browser.</small>`:md==='icon'?swatches+icons:swatches}</div></div>`};
P.setAv=function(o){const p=PR();P.commitProfile(()=>{p.avatar=Object.assign({},AV(),o)},'the avatar')&&go()};
P.rmPic=function(){if(!confirm('Remove your photo?'))return;const p=PR();P.commitProfile(()=>{delete p.pic;p.avatar=Object.assign({},AV(),{t:'initials'})},'the change')&&go()};
window.cwPic=function(inp){const f=inp&&inp.files&&inp.files[0];if(!f)return;
 if(!/^image\//.test(f.type)){toast('Please choose an image file');inp.value='';return}
 if(f.size>10*1024*1024){toast('That image is over 10 MB. Choose a smaller one.');inp.value='';return}
 const r=new FileReader();r.onerror=()=>toast('Could not read that image');
 r.onload=()=>{const im=new Image();im.onerror=()=>toast('Could not read that image');
  im.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d'),m=Math.min(im.width,im.height);if(!m)throw 0;x.drawImage(im,(im.width-m)/2,(im.height-m)/2,m,m,0,0,128,128);const url=c.toDataURL('image/jpeg',.8),p=PR();P.commitProfile(()=>{p.pic=url;p.avatar=Object.assign({},AV(),{t:'upload'})},'the photo')&&go()}catch(e){toast('Could not read that image')}};
  im.src=r.result};r.readAsDataURL(f)};
const GEN=['Female','Male','Non-binary','Prefer not to say','Other'];
P.field=function(f,p){const k=f[0],v=String(p[k]||'');
 if(k==='gender'){const opts=['',...GEN];if(v&&!opts.includes(v))opts.push(v);return `<label>${f[1]}<select id="pf_gender">${opts.map(o=>`<option value="${esc(o)}"${o===v?' selected':''}>${esc(o||'—')}</option>`).join('')}</select></label>`}
 const mx={name:80,skills:500,future:500,goal:500}[k]||300;
 return `<label>${f[1]}<input id="pf_${k}" value="${esc(v)}" maxlength="${mx+(k==='age'?-290:0)}"${k==='age'?' inputmode="numeric"':''}${k==='email'?' type="email" autocomplete="email"':''}></label>`};
window.cwPS=function(){const L={name:80,skills:500,future:500,goal:500},get=k=>val('pf_'+k),bad=(k,m)=>{toast(m);const e=document.getElementById('pf_'+k);if(e)e.focus();return false};
 for(const f of P.PF){const k=f[0],v=get(k),mx=L[k]||300;if(v.length>mx)return bad(k,f[1].replace(/ \(.*\)/,'')+' is too long (max '+mx+' characters)')}
 const em=get('email');if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))return bad('email','Enter a valid email address, or leave it empty');
 const ag=get('age');if(ag&&(!/^\d{1,3}$/.test(ag)||+ag<3||+ag>120))return bad('age','Age must be a whole number from 3 to 120, or leave it empty');
 const p=PR();if(P.commitProfile(()=>{P.PF.forEach(f=>{p[f[0]]=get(f[0])})},'your profile')){toast('Profile saved');go()}};

/* --- Preferences, reduce motion, Clockwork alert options --- */
P.P=function(){if(!S.prefs||typeof S.prefs!=='object')S.prefs={};if(!S.prefs.pvx||typeof S.prefs.pvx!=='object')S.prefs.pvx={};const x=S.prefs.pvx;if(!['system','on','off'].includes(x.rm))x.rm='system';if(typeof x.vis!=='boolean')x.vis=true;if(typeof x.vib!=='boolean')x.vib=false;return x};
P.commitPrefs=function(mut){const had=Object.prototype.hasOwnProperty.call(S,'prefs'),sn=JSON.stringify(S.prefs);try{mut(P.P());localStorage.setItem(K,JSON.stringify(S))}catch(e){if(had&&sn!==undefined)S.prefs=JSON.parse(sn);else delete S.prefs;toast(isFull(e)?'Storage is full, so the setting was not saved. Copy your data from Settings to free space.':'Could not save the setting.');return false}try{save()}catch(e){}return true};
const mq=window.matchMedia?matchMedia('(prefers-reduced-motion: reduce)'):null;
/* the Appearance card has its own Reduce motion button (saved in prepvault_appearance_v1); read it, never write it */
P.aprm=()=>{try{const a=JSON.parse(localStorage.getItem('prepvault_appearance_v1'));return !!(a&&a.motion)}catch(e){return false}};
P.rmOn=()=>{const m=P.P().rm;return m==='on'||(m==='system'&&(!!(mq&&mq.matches)||P.aprm()))};
P.applyMotion=function(){const on=P.rmOn();document.documentElement.classList.toggle('pvx-rm',on);const h=document.getElementById('tfhost');if(h)h.classList.toggle('pvx-rm',on)};
if(mq){try{mq.addEventListener('change',()=>{P.applyMotion();if(view==='vault'&&tab==='set')go()})}catch(e){try{mq.addListener(()=>P.applyMotion())}catch(e2){}}}
P.setRm=function(v){if(!['system','on','off'].includes(v))return;if(P.commitPrefs(x=>{x.rm=v})){P.applyMotion();go()}};
P.setAcc=function(k,v){if(!['vis','vib'].includes(k))return;if(P.commitPrefs(x=>{x[k]=!!v}))go()};
P.flash=function(t,b){const old=document.getElementById('pvx-flash');if(old)old.remove();const d=document.createElement('div');d.id='pvx-flash';d.className='pvx-flash';d.setAttribute('role','alert');d.textContent='⏰ '+(t||'Alert')+(b?' — '+b:'');document.body.appendChild(d);
 if(!P.rmOn()&&d.animate){try{d.animate([{opacity:1},{opacity:.35},{opacity:1},{opacity:.35},{opacity:1}],{duration:1200})}catch(e){}}
 setTimeout(()=>{if(d.parentNode)d.remove()},5000)};
const canVib=()=>typeof navigator.vibrate==='function';
P.alertFx=function(t,b){const x=P.P();if(x.vis)P.flash(t,b);if(x.vib&&canVib()){try{navigator.vibrate([200,100,200])}catch(e){}}};
P.testAlert=function(){P.alertFx('Test alert','This is how a Clockwork alert will look.');toast('Test alert sent')};
/* --- Settings cards --- */
const btn=(t,f,c)=>`<button type="button" class="${c||'g'}" onclick="${f}">${t}</button>`;
P.accCard=function(){const x=P.P(),sel=(v,l)=>`<option value="${v}"${x.rm===v?' selected':''}>${l}</option>`;
 return `<div class="card" id="pvx-acc"><h3>Accessibility</h3><label>Reduce motion<select id="pvx-rm" onchange="PVX.setRm(this.value)">${sel('system','Follow system (default)')}${sel('on','Always reduce')}${sel('off','Never reduce')}</select></label>
<p class="pvx-note">Turns off animations and transitions across PREPVAULT. Right now: <b>${P.rmOn()?'reduced':'normal'}</b>.</p>${P.aprm()?'<p class="pvx-note">The “Reduce motion” button in Appearance is on, so motion stays reduced whatever you choose here.</p>':''}
<h4 style="margin:16px 0 6px">Clockwork alerts</h4>
<label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" style="width:auto" id="pvx-vis"${x.vis?' checked':''} onchange="PVX.setAcc('vis',this.checked)"> Visual alert (banner at the top of the page)</label>
<label style="display:flex;gap:8px;align-items:center;margin:6px 0"><input type="checkbox" style="width:auto" id="pvx-vib"${x.vib&&canVib()?' checked':''}${canVib()?'':' disabled'} onchange="PVX.setAcc('vib',this.checked)"> Vibration${canVib()?' <span class="pvx-note" style="margin:0">Only works on devices with a vibration motor, such as phones</span>':' <span class="pvx-note" style="margin:0">Not supported on this device</span>'}</label>
<div class="row" style="margin-top:8px">${btn('Test alert','PVX.testAlert()')}</div></div>`};
const fmt=n=>n<0?'?':n<1024?n+' B':n<1048576?(n/1024).toFixed(1)+' KB':n<1073741824?(n/1048576).toFixed(1)+' MB':(n/1073741824).toFixed(2)+' GB';
const badge=(c,t)=>`<span class="pvx-sb ${c}">${t}</span>`;
const prow=(title,use,b,acts,extra)=>`<div class="pvx-pr"><div><b>${title}</b>${b}<div class="pvx-note">${use}</div>${extra||''}</div><div class="row">${acts||''}</div></div>`;
P.permCard=function(){return `<div class="card" id="pvx-perm" style="grid-column:1/-1"><h3>Permissions</h3><p class="pvx-note" style="margin-top:0">PREPVAULT only asks for a permission when you click a button here.</p><div id="pvx-permb"><small style="color:var(--mu)">Checking…</small></div></div>`};
P.refreshPerms=async function(){if(!document.getElementById('pvx-permb'))return;
 let per,est=null,ls=0,cb='na',cbl='Available when you click';
 try{if(navigator.storage&&navigator.storage.persisted)per=await navigator.storage.persisted()}catch(e){per=undefined}
 try{if(navigator.storage&&navigator.storage.estimate)est=await navigator.storage.estimate()}catch(e){est=null}
 try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);ls+=(k.length+(localStorage.getItem(k)||'').length)*2}}catch(e){ls=-1}
 try{const q=await navigator.permissions.query({name:'clipboard-write'});if(q.state==='denied'){cb='no';cbl='Blocked'}else if(q.state==='granted'){cb='ok';cbl='Granted'}}catch(e){}
 if(!navigator.clipboard)cbl='Not available here';
 const el=document.getElementById('pvx-permb');if(!el)return;
 let nb,na='',ne='';
 if(!('Notification' in window))nb=badge('na','Not supported');
 else{const pm=Notification.permission;
  if(pm==='granted'){nb=badge('ok','Granted');na=btn('Send test notification','PVX.testNotif()')}
  else if(pm==='denied'){nb=badge('no','Blocked');ne='<div class="pvx-note">To allow notifications, click the lock or site settings icon in the address bar, set Notifications to Allow, then reload this page. In Firefox, click the permissions icon and clear the blocked Notifications entry.</div>'}
  else{nb=badge('na','Not asked');na=btn('Enable','PVX.reqNotif()')}
  if(location.protocol==='file:')ne+='<div class="pvx-note">This page is open from a file on your computer. Some browsers do not remember permissions for local files.</div>'}
 let sb,sa='';if(per===true)sb=badge('ok','Persistent');else if(per===false){sb=badge('na','Not persistent');sa=btn('Request persistent storage','PVX.reqPersist()')}else sb=badge('na','Not supported');
 const LS=5*1024*1024,lp=ls<0?0:Math.min(100,Math.round(ls/LS*100));
 let m='';
 if(est&&est.quota){const pc=Math.min(100,Math.round(est.usage/est.quota*100));m+=`<div class="pvx-st"><small>Browser storage for this site: ${fmt(est.usage)} used of ${fmt(est.quota)} (${pc}%)</small><div class="bar" role="progressbar" aria-label="Browser storage used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pc}"><i class="${pc>=80?'pvx-warn':''}" style="width:${Math.max(1,pc)}%"></i></div>${pc>=80?'<div class="pvx-note" style="color:#ff8a8a">Storage is nearly full. Copy your data from Settings and remove files you no longer need.</div>':''}</div>`}
 else m+='<div class="pvx-st"><small>Storage estimate: not available in this browser.</small></div>';
 m+=`<div class="pvx-st"><small>Saved app data (settings, tasks, notes): ${fmt(ls)} of about 5 MB that browsers usually allow here (${lp}%)</small><div class="bar" role="progressbar" aria-label="Saved app data used" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${lp}"><i class="${lp>=80?'pvx-warn':''}" style="width:${Math.max(1,lp)}%"></i></div>${lp>=80?'<div class="pvx-note" style="color:#ff8a8a">Close to the browser limit. Copy your data from Settings now so nothing is lost.</div>':''}</div>`;
 el.innerHTML=prow('Notifications','Reminders and Clockwork alerts can pop up even when this tab is in the background.',nb,na,ne)
  +prow('Persistent storage','Asks the browser not to clear your data when space runs low.',sb,sa,m)
  +prow('Clipboard','Used by “Copy all data”. If copying is blocked, a text box appears instead.',badge(cb,cbl),btn('Test copy','PVX.testCopy()'))
  +prow('Sound','Browsers only play alarm sounds after you have clicked something on the page.',badge('na','Plays after a click'),btn('Play test sound','PVX.testSound()'))
  +'<p class="pvx-note">Your vaults, tasks, notes and files stay in this browser. The only network use is in Sources, under YT videos/playlists: it contacts YouTube and noembed.com for titles, thumbnails and playback when you add or play a video.</p>'};
P.reqNotif=function(){if(!('Notification' in window))return toast('Notifications are not supported in this browser');const done=r=>{toast(r==='granted'?'Notifications allowed':r==='denied'?'Notifications blocked. See the steps below to allow them.':'No choice made');P.refreshPerms()};try{const r=Notification.requestPermission();if(r&&r.then)r.then(done);else done(Notification.permission)}catch(e){toast('Could not ask for permission here')}};
P.testNotif=function(){try{new Notification('PREPVAULT',{body:'Test notification. Reminders will look like this.'});toast('Test notification sent')}catch(e){toast('Could not show a notification here')}};
P.reqPersist=function(){try{navigator.storage.persist().then(ok=>{toast(ok?'Persistent storage granted':'The browser declined. It may allow it later, after you use the app more.');P.refreshPerms()}).catch(()=>toast('Could not request persistent storage'))}catch(e){toast('Not supported in this browser')}};
P.testCopy=function(){const fail=()=>toast('Copy was blocked. “Copy all data” will show a text box instead.');try{if(!navigator.clipboard||!navigator.clipboard.writeText)return fail();navigator.clipboard.writeText('PREPVAULT clipboard test').then(()=>{toast('Copy works');P.refreshPerms()},fail)}catch(e){fail()}};
P.testSound=function(){try{const c=P.CW(V());P.snd(c.set.snd,c.set.vol,1);toast('Playing test sound')}catch(e){toast('Could not play a sound here')}};
P.after=function(){try{P.applyMotion()}catch(e){}try{if(view==='vault'&&tab==='set')P.refreshPerms()}catch(e){}};
(function(){const _set=set;set=function(){let h=_set();try{const cards=P.accCard()+P.permCard(),a='<div class="card"><h3>Data</h3>';if(h.split(a).length===2)h=h.replace(a,()=>cards+a);else{const b='<div class="card"><h3>About</h3>';if(h.split(b).length===2)h=h.replace(b,()=>cards+b);else h+='<div class="grid" style="margin-top:14px">'+cards+'</div>'}}catch(e){console.warn('PVX settings',e)}return h};
 const _rn=render;render=function(){_rn();P.after()}})();
addEventListener('focus',()=>{if(view==='vault'&&tab==='set')P.refreshPerms()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&view==='vault'&&tab==='set')P.refreshPerms()});
try{navigator.permissions.query({name:'notifications'}).then(q=>{q.onchange=()=>{if(view==='vault'&&tab==='set')P.refreshPerms()}}).catch(()=>{})}catch(e){}
P.applyMotion();

})(window.PVX);
/* ===== end v13 extras ===== */
