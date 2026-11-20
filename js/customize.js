/* NexaBuild · customize.js — 16 sumbu kostumisasi */

const CU_TEMA=[
 {id:'cream',   nm:'Krem',   bg:'#F4F3EF',paper:'#FFFFFF',paper2:'#FAF9F5',ink:'#111111',ink2:'#555555',bd:'#111111',sh:'4px 4px 0 #111111'},
 {id:'white',   nm:'Putih',  bg:'#F8F8F8',paper:'#FFFFFF',paper2:'#F2F2F2',ink:'#111111',ink2:'#555555',bd:'#111111',sh:'4px 4px 0 #111111'},
 {id:'pink',    nm:'Pink',   bg:'#FFF0F3',paper:'#FFFFFF',paper2:'#FFE4EA',ink:'#111111',ink2:'#666666',bd:'#111111',sh:'4px 4px 0 #111111'},
 {id:'mint',    nm:'Mint',   bg:'#F0FFF6',paper:'#FFFFFF',paper2:'#E4FFee',ink:'#111111',ink2:'#444444',bd:'#111111',sh:'4px 4px 0 #111111'},
 {id:'sky',     nm:'Langit', bg:'#F0F8FF',paper:'#FFFFFF',paper2:'#E4F3FF',ink:'#111111',ink2:'#555555',bd:'#111111',sh:'4px 4px 0 #111111'},
 {id:'lemon',   nm:'Lemon',  bg:'#FFFDE0',paper:'#FFFFFF',paper2:'#FFFACC',ink:'#111111',ink2:'#555555',bd:'#111111',sh:'4px 4px 0 #111111'},
 {id:'dark',    nm:'Gelap',  bg:'#111111',paper:'#222222',paper2:'#2D2D2D',ink:'rgba(255,255,255,0.3)',ink2:'#AAAAAA',bd:'rgba(255,255,255,0.3)',sh:'4px 4px 0 rgba(255,214,0,.35)'},
 {id:'void',    nm:'Void',   bg:'#000000',paper:'#1A1A1A',paper2:'#252525',ink:'rgba(255,255,255,0.28)',ink2:'#999999',bd:'rgba(255,255,255,0.28)',sh:'4px 4px 0 rgba(255,214,0,.3)'},
 {id:'slate',   nm:'Slate',  bg:'#0D1117',paper:'#161B22',paper2:'#21262D',ink:'rgba(255,255,255,0.25)',ink2:'#8B949E',bd:'rgba(255,255,255,0.25)',sh:'4px 4px 0 rgba(100,200,255,.3)'},
];

const CU_AKSEN=[
 {id:'yellow', nm:'Kuning',    hex:'#FFD600',txt:'#111111'},
 {id:'white',  nm:'Putih',     hex:'#FFFFFF',txt:'#111111'},
 {id:'black',  nm:'Hitam',     hex:'#111111',txt:'#FFFFFF'},
 {id:'red',    nm:'Merah',     hex:'#FF3B3B',txt:'#FFFFFF'},
 {id:'orange', nm:'Oranye',    hex:'#FF7A00',txt:'#FFFFFF'},
 {id:'pink',   nm:'Pink',      hex:'#FF5FA3',txt:'#FFFFFF'},
 {id:'green',  nm:'Hijau',     hex:'#00C853',txt:'#111111'},
 {id:'blue',   nm:'Biru',      hex:'#0057FF',txt:'#FFFFFF'},
 {id:'purple', nm:'Ungu',      hex:'#7B2FFF',txt:'#FFFFFF'},
 {id:'cyan',   nm:'Cyan',      hex:'#00B8D9',txt:'#111111'},
 {id:'teal',   nm:'Toska',     hex:'#00897B',txt:'#FFFFFF'},
 {id:'custom', nm:'Kustom',    hex:'',         txt:'#111111'},
];

const CU_FONT=[
 {id:'grotesk',nm:'Grotesk',val:'"Space Grotesk",system-ui,sans-serif'},
 {id:'mono',   nm:'Mono',    val:'"JetBrains Mono",ui-monospace,monospace'},
 {id:'dmsans', nm:'DM Sans', val:'"DM Sans",system-ui,sans-serif'},
 {id:'inter',  nm:'Inter',   val:'"Inter",system-ui,sans-serif'},
 {id:'system', nm:'System',  val:'system-ui,-apple-system,sans-serif'},
 {id:'serif',  nm:'Serif',   val:'Georgia,"Times New Roman",serif'},
];

const CU_FZ=[
 {id:'xs',nm:'10px',val:'10px'},{id:'sm',nm:'12px',val:'12px'},{id:'md',nm:'14px',val:'14px'},
 {id:'lg',nm:'16px',val:'16px'},{id:'xl',nm:'18px',val:'18px'},
];

const CU_BW=[
 {id:'0',nm:'0px',val:'0px'},{id:'1',nm:'1px',val:'1px'},{id:'2',nm:'2px',val:'2px'},
 {id:'3',nm:'3px',val:'3px'},{id:'4',nm:'4px',val:'4px'},
];

const CU_R=[
 {id:'none', nm:'Kotak',    r:'0px', rc:'0px',  rf:'4px'},
 {id:'xs',   nm:'XS 4px',   r:'4px', rc:'6px',  rf:'10px'},
 {id:'sm',   nm:'8px',      r:'8px', rc:'12px', rf:'20px'},
 {id:'md',   nm:'12px',     r:'12px',rc:'18px', rf:'28px'},
 {id:'lg',   nm:'Bulat',    r:'20px',rc:'28px', rf:'999px'},
];

const CU_SH=[
 {id:'0',  nm:'Tanpa',    sh:'none',                      sh2:'none'},
 {id:'1',  nm:'1px',      sh:'1px 1px 0 var(--sh-c)',     sh2:'1px 1px 0 var(--sh-c)'},
 {id:'2',  nm:'2px',      sh:'2px 2px 0 var(--sh-c)',     sh2:'2px 2px 0 var(--sh-c)'},
 {id:'4',  nm:'4px',      sh:'4px 4px 0 var(--sh-c)',     sh2:'3px 3px 0 var(--sh-c)'},
 {id:'6',  nm:'6px',      sh:'6px 6px 0 var(--sh-c)',     sh2:'4px 4px 0 var(--sh-c)'},
 {id:'8',  nm:'8px',      sh:'8px 8px 0 var(--sh-c)',     sh2:'5px 5px 0 var(--sh-c)'},
];

const CU_SHC=[
 {id:'black', nm:'Hitam',  get val(){return'#111111'}},
 {id:'ac',    nm:'Aksen',  get val(){return acFromState()}},
 {id:'grey',  nm:'Abu',    get val(){return'rgba(0,0,0,0.3)'}},
 {id:'white', nm:'Putih',  get val(){return'rgba(255,255,255,0.3)'}},
];

const CU_SP=[
 {id:'xs',   nm:'XS',    s3:'4px', s4:'8px',  s5:'14px'},
 {id:'sm',   nm:'Padat', s3:'8px', s4:'12px', s5:'18px'},
 {id:'md',   nm:'Sedang',s3:'12px',s4:'16px', s5:'24px'},
 {id:'lg',   nm:'Luas',  s3:'18px',s4:'22px', s5:'32px'},
 {id:'xl',   nm:'XL',    s3:'24px',s4:'28px', s5:'40px'},
];

const CU_AN=[
 {id:'full',   nm:'Penuh'},
 {id:'medium', nm:'Sedang'},
 {id:'minimal',nm:'Minimal'},
 {id:'off',    nm:'Mati'},
];

const CU_PAT=[
 {id:'none', nm:'Polos'},
 {id:'grid', nm:'Grid'},
 {id:'dots', nm:'Titik'},
 {id:'lines',nm:'Garis'},
 {id:'noise',nm:'Noise'},
];

const CU_BTN=[
 {id:'solid',  nm:'Solid'},
 {id:'outline',nm:'Outline'},
 {id:'soft',   nm:'Lembut'},
 {id:'ghost',  nm:'Ghost'},
];

const CU_NAV=[
 {id:'pill',   nm:'Pil'},
 {id:'flat',   nm:'Flat'},
 {id:'minimal',nm:'Minimal'},
];

const CU_CARD=[
 {id:'solid', nm:'Solid'},
 {id:'glass', nm:'Glass'},
 {id:'raised',nm:'Raised'},
];

const CU_WIDTH=[
 {id:'narrow',nm:'Sempit',val:'380px'},
 {id:'normal',nm:'Normal',val:'560px'},
 {id:'wide',  nm:'Lebar', val:'720px'},
 {id:'full',  nm:'Full',  val:'100%'},
];

const CU_BORDER_STYLE=[
 {id:'solid', nm:'Solid'},
 {id:'dashed',nm:'Putus'},
 {id:'double',nm:'Ganda'},
];

let CState={
 tema:'cream',aksen:'yellow',aksenHex:'#FFD600',
 font:'grotesk',fz:'md',bw:'2',r:'sm',sh:'4',shc:'black',
 sp:'md',an:'full',pat:'none',btn:'solid',nav:'pill',card:'solid',
 width:'normal',bstyle:'solid',
};

function cuLoad(){try{const s=JSON.parse(localStorage.getItem('cu'));if(s&&typeof s==='object')Object.assign(CState,s)}catch{}}
function cuSave(){localStorage.setItem('cu',JSON.stringify(CState))}

function acFromState(){
 if(CState.aksen==='custom')return CState.aksenHex||'#FFD600';
 const a=CU_AKSEN.find(x=>x.id===CState.aksen);return a?a.hex:'#FFD600';
}
function acTxtFromState(){
 const a=CU_AKSEN.find(x=>x.id===CState.aksen);return a?a.txt:'#111111';
}
function hexAlpha(hex,a){
 if(!hex||hex.length<7)return`rgba(0,0,0,${a})`;
 try{const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);return`rgba(${r},${g},${b},${a})`;}catch{return`rgba(0,0,0,${a})`}
}

function cuApply(){
 const R=document.documentElement;
 const tema=CU_TEMA.find(x=>x.id===CState.tema)||CU_TEMA[0];
 const font=CU_FONT.find(x=>x.id===CState.font)||CU_FONT[0];
 const fz=CU_FZ.find(x=>x.id===CState.fz)||CU_FZ[2];
 const bw=CU_BW.find(x=>x.id===CState.bw)||CU_BW[2];
 const radius=CU_R.find(x=>x.id===CState.r)||CU_R[2];
 const sh=CU_SH.find(x=>x.id===CState.sh)||CU_SH[3];
 const shc=CU_SHC.find(x=>x.id===CState.shc)||CU_SHC[0];
 const sp=CU_SP.find(x=>x.id===CState.sp)||CU_SP[2];
 const an=CU_AN.find(x=>x.id===CState.an)||CU_AN[0];
 const width=CU_WIDTH.find(x=>x.id===CState.width)||CU_WIDTH[1];
 const bs=CU_BORDER_STYLE.find(x=>x.id===CState.bstyle)||CU_BORDER_STYLE[0];
 const acHex=acFromState();
 const acTxt=acTxtFromState();

 R.style.setProperty('--bg',tema.bg);
 R.style.setProperty('--paper',tema.paper);
 R.style.setProperty('--paper2',tema.paper2);
 R.style.setProperty('--paper3',tema.paper2);
 R.style.setProperty('--ink',tema.ink||'#111111');
 R.style.setProperty('--ink2',tema.ink2||'#555555');
 R.style.setProperty('--bd',tema.bd||tema.ink||'#111111');
 R.style.setProperty('--ac',acHex);
 R.style.setProperty('--ac-txt',acTxt);
 R.style.setProperty('--ac2',hexAlpha(acHex,.18));
 R.style.setProperty('--ac3',hexAlpha(acHex,.08));
 const shColor=shc.val;
 R.style.setProperty('--sh-c',shColor);
 const shStr=sh.sh.replace(/var\(--sh-c\)/g,shColor);
 const sh2Str=sh.sh2.replace(/var\(--sh-c\)/g,shColor);
 R.style.setProperty('--sh',shStr);
 R.style.setProperty('--sh2',shStr);
 R.style.setProperty('--sh-sm',sh2Str);
 R.style.setProperty('--sh-ac',shStr.replace(shColor,acHex));
 R.style.setProperty('--f',font.val);
 R.style.setProperty('--fz',fz.val);
 R.style.setProperty('--bw',bw.val);
 R.style.setProperty('--r',radius.r);
 R.style.setProperty('--rc',radius.rc);
 R.style.setProperty('--rf',radius.rf);
 R.style.setProperty('--s3',sp.s3);
 R.style.setProperty('--s4',sp.s4);
 R.style.setProperty('--s5',sp.s5);
 const main=document.querySelector('main');if(main)main.style.maxWidth=width.val;
 applyBorderStyle(bs.id,bw.val);
 applyPattern(CState.pat);
 applyBtnStyle(CState.btn);
 applyNavStyle(CState.nav);
 applyCardEffect(CState.card);
 switch(an.id){
  case'off': ['--t1','--t2','--t3'].forEach(v=>R.style.setProperty(v,'0s'));break;
  case'minimal': R.style.setProperty('--t1','.05s');R.style.setProperty('--t2','.1s');R.style.setProperty('--t3','.15s');break;
  case'medium': R.style.setProperty('--t1','.08s');R.style.setProperty('--t2','.14s');R.style.setProperty('--t3','.22s');break;
  default: ['--t1','--t2','--t3'].forEach(v=>R.style.removeProperty(v));
 }
}

function applyBorderStyle(s,bw){
 const el=_getOverride('cu-bs');
 if(s==='solid'){el.textContent='';return}
 const w=bw||'2px';
 el.textContent=`*{border-style:${s}!important}input,select,textarea,nav,#bar,#dr,.btn,.sq,.chipb,.qt,.lk,.card,.sc,.term,.pill,.tag,.ib,.gn,.dz,.pbar,.nl i,.gs,.pf>.chips .tag,.fr,.pf img{border-style:${s}!important}`;
}
function applyPattern(pat){
 const el=_getOverride('cu-pat');
 const patterns={
  grid:`body{background-image:repeating-linear-gradient(rgba(0,0,0,.06) 0,rgba(0,0,0,.06) 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,rgba(0,0,0,.06) 0,rgba(0,0,0,.06) 1px,transparent 1px,transparent 40px)}`,
  dots:`body{background-image:radial-gradient(rgba(0,0,0,.12) 1px,transparent 1px);background-size:16px 16px}`,
  lines:`body{background-image:repeating-linear-gradient(90deg,rgba(0,0,0,.04) 0,rgba(0,0,0,.04) 1px,transparent 1px,transparent 32px)}`,
  noise:`body::after{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:256px 256px}`,
 };
 el.textContent=patterns[pat]||'';
}
function applyBtnStyle(s){
 const el=_getOverride('cu-btn');
 if(s==='solid'){el.textContent='';return}
 if(s==='outline')el.textContent=`.btn{background:transparent!important;color:var(--ac)!important;border-color:var(--ac)!important}.btn.w{color:var(--ink)!important;border-color:var(--bd)!important}`;
 else if(s==='soft')el.textContent=`.btn{background:var(--ac2)!important;color:var(--ink)!important;box-shadow:none!important;transform:none!important}.btn.w{background:var(--paper2)!important}`;
 else el.textContent=`.btn,.sq,.chipb,.qt,.lk{box-shadow:none!important}.btn:active,.sq:active,.chipb:active,.qt:active,.lk:active{transform:translate(0,0)!important}`;
}
function applyNavStyle(s){
 const el=_getOverride('cu-nav');
 if(s==='flat')el.textContent=`nav{border-radius:0!important;bottom:0!important;width:100%!important;max-width:100%!important;left:0!important;transform:none!important;border-left:0!important;border-right:0!important;border-bottom:0!important}nav button{border-radius:0!important}`;
 else if(s==='minimal')el.textContent=`nav{background:transparent!important;border-color:transparent!important;box-shadow:none!important}nav button[aria-current=page]{background:var(--ac2)!important;color:var(--ac)!important;border-color:var(--ac)!important}`;
 else el.textContent='';
}
function applyCardEffect(s){
 const el=_getOverride('cu-card');
 if(s==='glass')el.textContent=`.card,.fr,.sc{background:rgba(255,255,255,.65)!important;backdrop-filter:blur(12px)!important;-webkit-backdrop-filter:blur(12px)!important}`;
 else if(s==='raised')el.textContent=`.card{box-shadow:0 2px 8px rgba(0,0,0,.12),var(--sh)!important}`;
 else el.textContent='';
}
function _getOverride(id){let el=document.getElementById(id);if(!el){el=document.createElement('style');el.id=id;document.head.appendChild(el)}return el;}

function cuBtn(label,preview,active,onclick){
 return`<button class="cu-btn" aria-pressed="${active}" onclick="${onclick}">${preview}<span>${label}</span></button>`;
}
function cuSwatch(color,bd){return`<div class="cu-prev" style="background:${color};border-color:${bd||'#111'}"></div>`;}
function cuFontPrev(val){return`<div class="cu-prev" style="font:700 10px ${val};display:flex;align-items:center;justify-content:center">Aa</div>`;}
function cuShPrev(sh){
 if(sh.sh==='none')return`<div class="cu-prev" style="box-shadow:none"></div>`;
 const off=sh.id==='8'?'6px':sh.id==='6'?'5px':sh.id==='4'?'4px':sh.id==='2'?'2px':'1px';
 return`<div class="cu-prev" style="box-shadow:${off} ${off} 0 #111"></div>`;
}

function custRender(){
 const C=CState,ac=acFromState();
 let h='';
 const sec=(t,c)=>`<div class="dr-sec-h" style="margin-top:var(--s3)">${t}</div>${c}`;
 const grid=(items)=>`<div class="cu-g">${items}</div>`;

 h+=sec('Tema',grid(CU_TEMA.map(t=>cuBtn(t.nm,`<div class="cu-prev" style="background:${t.paper};border-color:${t.bd||'#111'};box-shadow:2px 2px 0 ${t.bd||'#111'}"></div>`,C.tema===t.id,`cuSet('tema','${t.id}')`)).join('')));
 h+=sec('Warna Aksen',grid([...CU_AKSEN.filter(a=>a.id!=='custom').map(a=>cuBtn(a.nm,cuSwatch(a.hex),C.aksen===a.id,`cuSet('aksen','${a.id}')`)),`<button class="cu-btn" aria-pressed="${C.aksen==='custom'}" onclick="cuSet('aksen','custom')" style="grid-column:span 3;min-height:36px"><span>🎨 Warna kustom</span></button>`].join('')));
 if(C.aksen==='custom')h+=`<div style="display:flex;gap:8px;align-items:center;margin-top:6px"><input type="color" value="${C.aksenHex||'#FFD600'}" oninput="CState.aksenHex=this.value;cuApply();cuSave()" style="flex:1;min-height:40px;border:2px solid #111;border-radius:6px;padding:3px"><span style="font:700 11px var(--f);color:var(--ink2)">${C.aksenHex||'#FFD600'}</span></div>`;
 h+=sec('Font',grid(CU_FONT.map(f=>cuBtn(f.nm,cuFontPrev(f.val),C.font===f.id,`cuSet('font','${f.id}')`)).join('')));
 h+=sec('Ukuran Teks',grid(CU_FZ.map(f=>cuBtn(f.nm,`<div class="cu-prev" style="display:flex;align-items:center;justify-content:center;font:700 ${f.val} var(--f)">${f.val}</div>`,C.fz===f.id,`cuSet('fz','${f.id}')`)).join('')));
 h+=sec('Tebal Garis',grid(CU_BW.map(b=>cuBtn(b.nm,`<div class="cu-prev" style="border-width:${b.val||'1px'};border-color:#111"></div>`,C.bw===b.id,`cuSet('bw','${b.id}')`)).join('')));
 h+=sec('Gaya Garis',grid(CU_BORDER_STYLE.map(b=>cuBtn(b.nm,`<div class="cu-prev" style="border-style:${b.id};border-color:#111"></div>`,C.bstyle===b.id,`cuSet('bstyle','${b.id}')`)).join('')));
 h+=sec('Sudut Kartu',grid(CU_R.map(r=>cuBtn(r.nm,`<div class="cu-prev" style="border-radius:${r.rc};border-color:#111"></div>`,C.r===r.id,`cuSet('r','${r.id}')`)).join('')));
 h+=sec('Bayangan',grid(CU_SH.map(s=>cuBtn(s.nm,cuShPrev(s),C.sh===s.id,`cuSet('sh','${s.id}')`)).join('')));
 h+=sec('Warna Bayangan',grid(CU_SHC.map(s=>cuBtn(s.nm,`<div class="cu-prev" style="box-shadow:3px 3px 0 ${s.val};border-color:#111"></div>`,C.shc===s.id,`cuSet('shc','${s.id}')`)).join('')));
 h+=sec('Spasi',grid(CU_SP.map(s=>cuBtn(s.nm,`<div class="cu-prev" style="display:flex;align-items:center;justify-content:center"><div style="width:${parseInt(s.s4)*1.2}px;height:6px;background:#111;border-radius:2px"></div></div>`,C.sp===s.id,`cuSet('sp','${s.id}')`)).join('')));
 h+=sec('Pola Latar',grid(CU_PAT.map(p=>cuBtn(p.nm,`<div class="cu-prev" style="background:${p.id==='grid'?'repeating-linear-gradient(rgba(0,0,0,.2) 0,rgba(0,0,0,.2) 1px,transparent 1px,transparent 8px),repeating-linear-gradient(90deg,rgba(0,0,0,.2) 0,rgba(0,0,0,.2) 1px,transparent 1px,transparent 8px)':p.id==='dots'?'radial-gradient(rgba(0,0,0,.3) 1px,transparent 1px);background-size:6px 6px':p.id==='lines'?'repeating-linear-gradient(90deg,rgba(0,0,0,.2) 0,rgba(0,0,0,.2) 1px,transparent 1px,transparent 8px)':'#FAF9F5'};border-color:#111">`,C.pat===p.id,`cuSet('pat','${p.id}')`)).join('')));
 h+=sec('Gaya Tombol',grid(CU_BTN.map(b=>cuBtn(b.nm,`<div class="cu-prev" style="display:flex;align-items:center;justify-content:center"><div style="padding:2px 6px;font:700 9px var(--f);border:1.5px solid #111;border-radius:3px;${b.id==='solid'?'background:#FFD600;':''}${b.id==='outline'?'color:#111;border-color:#111;':''}${b.id==='soft'?'background:rgba(255,214,0,.2);':''}${b.id==='ghost'?'border:none;':''}box-shadow:${b.id==='solid'?'2px 2px 0 #111':'none'}">BTN</div></div>`,C.btn===b.id,`cuSet('btn','${b.id}')`)).join('')));
 h+=sec('Gaya Nav',grid(CU_NAV.map(n=>cuBtn(n.nm,`<div class="cu-prev" style="display:flex;align-items:center;justify-content:center;gap:3px">${[0,1,2].map(i=>`<div style="width:8px;height:8px;border-radius:${n.id==='pill'?'50%':'2px'};background:${i===0?'#FFD600':'#eee'};border:1px solid #111"></div>`).join('')}</div>`,C.nav===n.id,`cuSet('nav','${n.id}')`)).join('')));
 h+=sec('Efek Kartu',grid(CU_CARD.map(c=>cuBtn(c.nm,`<div class="cu-prev" style="${c.id==='glass'?'background:rgba(255,255,255,.6);backdrop-filter:blur(4px)':c.id==='raised'?'box-shadow:0 4px 8px rgba(0,0,0,.2)':'background:#fff'};border-color:#111"></div>`,C.card===c.id,`cuSet('card','${c.id}')`)).join('')));
 h+=sec('Lebar Konten',grid(CU_WIDTH.map(w=>cuBtn(w.nm,`<div class="cu-prev" style="display:flex;align-items:center;justify-content:center"><div style="height:12px;background:#FFD600;border:1px solid #111;border-radius:2px;width:${w.id==='narrow'?'10px':w.id==='normal'?'16px':w.id==='wide'?'22px':'28px'}"></div></div>`,C.width===w.id,`cuSet('width','${w.id}')`)).join('')));
 h+=sec('Animasi',grid(CU_AN.map(a=>cuBtn(a.nm,`<div class="cu-prev" style="display:flex;align-items:center;justify-content:center;font-size:14px">${a.id==='full'?'✨':a.id==='medium'?'💫':a.id==='minimal'?'💤':'⏹️'}</div>`,C.an===a.id,`cuSet('an','${a.id}')`)).join('')));
 h+=`<button class="btn w" onclick="cuReset()" style="margin-top:var(--s3);font-size:12px">↺ Reset tampilan ke default</button>`;

 const area=document.getElementById('cu-area');if(area)area.innerHTML=h;
}

function cuSet(axis,val){CState[axis]=val;cuApply();cuSave();custRender();}
function cuReset(){
 CState={tema:'cream',aksen:'yellow',aksenHex:'#FFD600',font:'grotesk',fz:'md',bw:'2',r:'sm',sh:'4',shc:'black',sp:'md',an:'full',pat:'none',btn:'solid',nav:'pill',card:'solid',width:'normal',bstyle:'solid'};
 cuApply();cuSave();custRender();
}
function initCustomize(){cuLoad();cuApply();}
