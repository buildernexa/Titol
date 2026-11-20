async function loadProfile(){
 if(!S.t)return home();
 P.loading=!P.name;home();
 const [u,r,l]=await Promise.allSettled([api("/user"),api("/repos/"+S.r),api("/rate_limit")]);
 P.ok=u.status==="fulfilled"||l.status==="fulfilled";
 if(u.status==="fulfilled"){const v=u.value;P.name=v.name||v.login;P.email=v.email||v.login;P.av=v.avatar_url;P.plan=v.plan?.name||"free"}else{toast(u.reason.message);if(/Token/.test(u.reason.message))drawer(true)}
 if(r.status==="fulfilled"){P.priv=r.value.private;S.repoPrivate=!!r.value.private;sv("s",S);ui()}
 if(l.status==="fulfilled")P.rate=l.value.resources.core;
 if(!P.name)P.name=S.u;P.loading=false;home();
}
function avatar(){P.av=(P.av||"").split("&t=")[0];loadProfile().then(()=>{P.av+="&t="+Date.now();home();toast("Avatar diperbarui")})}

const WIDGETS=()=>[wStatus,wVidHero,wGuide,wFrame,wNext,wQuick,wPipeline,wActivity,wRecent,wLink];
const CUBE='<svg viewBox="0 0 32 32" aria-hidden="true" width="32" height="32" stroke="none"><polygon points="16,3 28,10 16,17 4,10" fill="currentColor" opacity=".2"/><polygon points="4,10 16,17 16,30 4,23" fill="var(--ac)"/><polygon points="28,10 16,17 16,30 28,23" fill="currentColor" opacity=".5"/></svg>';

function home(){
 const el=$("#v-home");
 if(!S.t){el.className="pop";el.innerHTML=`<div class="vid-hero vid-hero-idle">
 <video autoplay muted loop playsinline src="video/hero.mp4" style="height:180px"></video>
 <div class="vid-hero-ov" style="flex-direction:column;align-items:flex-start;gap:12px">
  <div style="display:flex;align-items:center;gap:12px">
   <div style="color:var(--ac)">${CUBE}</div>
   <div class="vid-hero-txt"><b>NexaBuild</b><span>Ubah proyek jadi APK langsung dari HP. Gratis.</span></div>
  </div>
  <button class="btn" onclick="drawer(true)" style="width:100%">Hubungkan GitHub</button>
 </div>
</div>
<div class="card"><div class="sec"><b>Mulai dalam 3 langkah</b><span class="tag">±2 menit</span></div>
${gStep(1,"Buat token GitHub","Pengaturan GitHub → Personal access token (classic) → centang repo dan workflow.",false,"")}
${gStep(2,"Tempel token di Settings","Ketuk ☰ lalu masukkan token. Repo build dibuat otomatis.",false,"")}
${gStep(3,"Pilih proyek lalu Build","Upload ZIP, tempel URL, atau mulai dari nol.",false,"")}</div>`;return}
 if(P.loading||!P.name){el.className="";el.innerHTML=`<div class="card sk" style="height:200px"></div><div class="card sk" style="height:80px"></div><div class="card sk" style="height:140px"></div>`;return}
 el.className=ANIM?"pop":"";ANIM=false;
 el.innerHTML=WIDGETS().map(f=>f()).join("");
 stats();plRender();tick();
}

const gStep=(n,t,d,done,f)=>`<div class="gs${done?" done":""}${f?` onclick="${f}" role="button" tabindex="0"`:""}" style="cursor:${f?'pointer':'default'}"><span class="gn">${done?'<svg viewBox="0 0 24 24" width="14" height="14"><path d="M5 12l5 5 9-10"/></svg>':n}</span><span class="gt"><b>${t}</b><em>${d}</em></span></div>`;

function wGuide(){
 const n=H.length,ok=H.some(h=>h.st==="success");if(ok&&n>=2)return"";
 return `<div class="card"><div class="sec"><b>Panduan cepat</b><span class="tag">${ok?"Hampir selesai":"Langkah demi langkah"}</span></div>
${gStep(1,"GitHub terhubung","Repo build: "+esc(S.r),true,"drawer(true)")}
${gStep(2,"Pilih proyek",n?"Sudah pernah build":"ZIP, URL, atau dari nol",n>0,"go(1)")}
${gStep(3,"Build dan unduh APK",ok?"Selesai. Unduh dari Riwayat":"Tekan Build, tunggu, lalu unduh",ok,ok?"go(2)":"go(1)")}</div>`;
}

function wStatus(){
 const rt=P.rate,on=navigator.onLine&&P.ok,l=H[0];
 return `<div class="pills"><span class="pill"><i class="${on?"ok":"er"}"></i>${on?"Terhubung":"Offline"}</span><span class="pill"><i class="ok"></i>API ${rt?Math.round(rt.remaining/rt.limit*100)+"%":"-"}</span><span class="pill"><i class="${busy?"on":l&&l.st==="failure"?"er":"ok"}"></i>${busy?"Berjalan":l?lab(l.st):"Siap"}</span></div>`;
}

function wVidHero(){
 const p=busy?T.pct||0:0;
 return `<div class="vid-hero">
 <video autoplay muted loop playsinline src="video/hero.mp4"></video>
 <div class="vid-hero-ov">
  <div style="display:flex;align-items:center;gap:12px;width:100%">
   <div style="color:var(--ac)">${CUBE}</div>
   <div class="vid-hero-txt">
    <b>NexaBuild${busy?" · Build Berjalan":""}</b>
    <span>${busy?p+"% selesai":"Ubah proyek jadi APK langsung dari HP."}</span>
   </div>
   <button class="btn" onclick="go(1)" style="width:auto;min-height:36px;padding:0 14px;flex:none">${busy?"Lihat":"Build"}</button>
  </div>
 </div>
</div>`;
}

function wProfile(){return `<div class="card pf"><div class="pf-l"><div class="av"><img src="${esc(P.av)}" alt=""><button class="cam" onclick="avatar()" aria-label="Perbarui avatar">${ic("cam")}</button></div>
<div class="who"><span class="note ell">Halo, ${esc(P.name||S.u)}</span><b class="ell">${esc(P.email||S.u)}</b></div></div>
<div class="clk"><span class="tag" id="dtp"></span><svg viewBox="0 0 48 48" stroke="var(--fg)" fill="none"><circle cx="24" cy="24" r="21" fill="var(--bg3)"/><line id="hh" x1="24" y1="24" x2="24" y2="14" stroke-width="3"/><line id="hm" x1="24" y1="24" x2="24" y2="8"/></svg><span class="tag" id="tm"></span></div>
<div class="chips"><span class="tag">${esc((P.plan||"free").replace(/^./,c=>c.toUpperCase()))}</span><span class="tag">${P.priv?"Private":"Public"}</span></div></div>`}

function wInfo(){
 const rt=P.rate,pc=rt?Math.round(rt.remaining/rt.limit*100):0,on=navigator.onLine&&P.ok;
 return `<div class="row2"><div class="card it"><div class="ib">${ic("gauge")}</div><div class="tt"><b>Kuota API</b><span class="note">${rt?rt.remaining+" / "+rt.limit:"-"}</span><div class="bar"><i style="width:${pc}%"></i></div></div></div>
<div class="card it"><div class="ib">${ic("wifi")}</div><div class="tt"><b>${on?"Online":"Offline"}</b><span class="note ell">${esc(S.r)}</span></div></div></div>`}

function wStats(){return `<div class="g3"><div class="card"><div class="ib">${ic("layers")}</div><b id="s1"></b><span class="note">Total</span><span class="tag">Semua</span></div>
<div class="card"><div class="ib">${ic("run")}</div><b id="s2"></b><span class="note">Berjalan</span><span class="tag success" id="lv">Live</span></div>
<div class="card"><div class="ib">${ic("check")}</div><b id="s3"></b><span class="note">Berhasil</span><span class="tag" id="b3"></span></div></div>`}

function wFrame(){return `<div class="fr">${wProfile()}${wInfo()}${wStats()}</div>`}

function streak(){const ds=new Set(H.map(h=>new Date(h.t).toDateString()));let n=0,d=new Date();if(!ds.has(d.toDateString()))d.setDate(d.getDate()-1);while(ds.has(d.toDateString())){n++;d.setDate(d.getDate()-1)}return n}

function wNext(){
 const n=H.length,ok=H.filter(h=>h.st==="success").length;let c=0;for(const h of H){if(h.st==="success")c++;else if(h.st!=="running")break}
 const M=[["Build pertama",n>=1],["10 build",n>=10],["5 sukses beruntun",c>=5]];
 const [t,b,f]=!n?["Mulai dari file ZIP, URL, atau dari nol. Cukup isi nama aplikasinya.","Mulai","go(1)"]:H[0].st==="failure"?["Build terakhir gagal. "+(H[0].hint||"Buka riwayat untuk detailnya."),"Lihat riwayat","go(2)"]:!ok?["Tunggu build pertama selesai, lalu unduh hasilnya.","Pantau","go(1)"]:["Coba format AAB untuk Play Store, atau pasang ikon sendiri.","Atur build","go(1)"];
 return `<div class="nx"><div class="nx-h"><span class="tag">Langkah berikutnya</span><span class="tag">🔥 ${streak()} hari</span></div><b>${esc(t)}</b><div class="chips">${M.map(([x,d])=>`<span class="tag ${d?"success":""}">${d?"✓ ":""}${x}</span>`).join("")}</div><button class="btn w" onclick="${f}">${b}</button></div>`;
}

const quickAgain=()=>H.length?(again(0),toast("Konfigurasi dimuat")):toast("Belum ada build");
const openRepo=()=>window.open("https://github.com/"+S.r,"_blank","noopener");

function wQuick(){
 const Q=[["plus","Build baru","File, URL, atau dari nol","go(1)"],["redo","Ulangi terakhir",H[0]?H[0].name:"Belum ada build","quickAgain()"],["hist","Riwayat",H.length+" build","go(2)"],["gear","Pengaturan","Koneksi & tampilan","drawer(true)"],["ext","Repo build",S.r,"openRepo()"],["layers","Perbarui repo","Sinkronkan template","go(1)"]];
 return `<div class="blk"><div class="sec"><b>Akses cepat</b><span class="tag">6 menu</span></div><div class="qg">${Q.map(([i,t,s,f])=>`<button class="qt" onclick="${f}"><span class="ib">${ic(i)}</span><span class="qx"><b>${esc(t)}</b><em class="ell">${esc(s)}</em></span></button>`).join("")}</div></div>`;
}

function wPipeline(){return `<div class="blk"><div class="sec"><b>Pipeline</b><span class="tag" id="pls"></span></div><div class="card"><div class="pl" id="pl"></div></div></div>`}

function wActivity(){
 const days=[...Array(7)].map((_,i)=>{const d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-6+i);return d});
 const n=days.map(d=>H.filter(h=>new Date(h.t).toDateString()===d.toDateString()).length),mx=Math.max(1,...n);
 return `<div class="blk"><div class="sec"><b>Aktivitas</b><span class="tag">7 hari</span></div><div class="card"><div class="ch">${days.map((d,i)=>`<div class="cb"><b>${n[i]||""}</b><i style="height:${Math.max(4,Math.round(n[i]/mx*76))}px"></i><span>${d.toLocaleDateString("id-ID",{weekday:"short"})}</span></div>`).join("")}</div></div></div>`;
}

function wRecent(){return `<div class="blk"><div class="sec"><b>Build terakhir</b><span class="tag">${H.length?H.length+" total":""}</span></div><div class="card">${H.length?H.slice(0,3).map(h=>`<div class="li"><span class="ell">${esc(h.name)} ${esc(h.vn)}</span><span class="tag ${cn(h.st)}">${lab(h.st)}</span></div>`).join(""):"<p style='margin:0'>Belum ada build. Mulai dari Build baru.</p>"}</div></div>`}

function wLink(){const tp=S.tp||"buildernexa/apk-template";return `<a class="lk" href="https://github.com/${esc(tp)}" target="_blank" rel="noopener"><span class="ib">${ic("ext")}</span><span class="qx"><b>Repo template</b><em class="ell">github.com/${esc(tp)}</em></span><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></a>`}

const PS=[["Prepare source","Source"],["Setup Java","Java"],["Setup Gradle","Gradle"],["Generate project","Gen"],["Build","Build"],["Sign and validate outputs","Sign"],["Release","Rilis"]];

function plRender(){
 const e=$("#pl");if(!e)return;
 e.innerHTML=PS.map(([n,l])=>{const v=PL[n],c=v==="success"?"ok":v==="in_progress"?"on":v==="failure"?"er":"";return `<div class="ps ${c}"><i>${c==="ok"?"✓":c==="er"?"✕":""}</i><span>${l}</span></div>`}).join("");
 $("#pls").textContent=busy?"Berjalan":Object.values(PL).includes("failure")?"Gagal":Object.keys(PL).length?"Selesai":"Siap";
}

function stats(){
 const t=H.length,ok=H.filter(h=>h.st==="success").length,s=(i,v)=>{const e=$(\"#\"+i);if(e)/^\d+$/.test(v)?cu(e,+v):e.textContent=v};
 s("s1",t);s("s2",busy?1:0);s("s3",ok);s("b3",(t?Math.round(ok/t*100):0)+"%");const lv=$("#lv");if(lv)lv.classList.toggle("live",busy);
}

function tick(){
 const d=new Date(),h=$("#hh");if(!h)return;
 h.setAttribute("transform",`rotate(${(d.getHours()%12+d.getMinutes()/60)*30} 24 24)`);
 $("#hm").setAttribute("transform",`rotate(${d.getMinutes()*6} 24 24)`);
 $("#tm").textContent=d.toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit",timeZoneName:"short"});const dt=$("#dtp");if(dt)dt.textContent=d.toLocaleDateString("id-ID",{day:"numeric",month:"short"});
}
