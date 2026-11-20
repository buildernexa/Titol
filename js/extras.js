/* NexaBuild · extras.js — boot, event, util */
function cu(e,to,instant){
 const id=e._id=(e._id||0)+1,from=+e.dataset.v||0;e.dataset.v=to;
 if(instant||from===to||matchMedia("(prefers-reduced-motion:reduce)").matches){e.textContent=to;return}
 const t0=performance.now();(function f(t){if(id!==e._id)return;const k=Math.min(1,(t-t0)/600);e.textContent=Math.round(from+(to-from)*k);if(k<1)requestAnimationFrame(f)})(t0);
}
function presets(){const s=$("#ps");if(s)s.innerHTML='<option value="">Pilih</option>'+Object.keys(PR).map(k=>`<option>${esc(k)}</option>`).join("")}

/* events */
const _=$,mn=$("#mn"),dx=$("#dx"),sc=$("#sc"),te=$("#te");
if(mn)mn.onclick=()=>{drawer(true);custRender()};
if(dx)dx.onclick=()=>drawer(false);
if(sc)sc.onclick=()=>drawer(false);
if(te)te.onclick=()=>{const i=$("#tk");i.type=i.type==="password"?"text":"password"};
const tu=$("#tu"),tr=$("#tr");
if(tu)tu.oninput=()=>{if(tr)tr.oninput?.()};
if(tr)tr.oninput=()=>{const tu2=$("#tu"),tr2=$("#tr");const v=(tu2?.value||"")+(tr2?.value?"/"+tr2.value:"");const cm=$("#cm");if(cm)cm.checked=!!(tu2?.value?.trim())&&v!=="buildernexa/apk-template"};
const lb=$("#lb"),tt2=$("#tt"),lo=$("#lo");
if(lb)lb.onclick=connect;
if(tt2)tt2.onclick=test;
if(lo)lo.onclick=disc;
const privBtn=$("#priv");if(privBtn)privBtn.onclick=makeBuildRepoPrivate;
const go2=$("#go"),cn=$("#cn");if(go2)go2.onclick=build;if(cn)cn.onclick=cancel;
const cp=$("#cp"),dt=$("#dt"),as=$("#as");
if(cp)cp.onclick=()=>navigator.clipboard.writeText(termTxt()).then(()=>toast("Log disalin"));
if(dt)dt.onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([termTxt()],{type:"text/plain"}));a.download="nexabuild-log.txt";a.click()};
if(as)as.onclick=e=>{T.as=!T.as;e.currentTarget.setAttribute("aria-pressed",!!T.as)};
document.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{T.f=b.dataset.f;document.querySelectorAll("[data-f]").forEach(x=>x.setAttribute("aria-pressed",x===b));logDraw()});
const sq2=$("#sq");if(sq2)sq2.oninput=logDraw;
document.querySelectorAll("#srcs button").forEach(b=>b.onclick=()=>setSrc(b.dataset.v));
const zf=$("#zf");if(zf)zf.onchange=e=>e.target.files[0]&&onFile(e.target.files[0]);
const dzx=$("#dzx");if(dzx)dzx.onclick=e=>{e.preventDefault();PF=null;FZ=null;A=null;AUTO={};const z=$("#zf");if(z)z.value="";const an=$("#an");if(an)an.innerHTML="";const kdw=$("#kdw");if(kdw)kdw.hidden=true;dzUI();auUI();idleDraw()};
const anb=$("#anb");if(anb)anb.onclick=readUrl;
const su=$("#su");if(su)su.onchange=()=>{URLOK=false};
const ksb=$("#ksb");if(ksb)ksb.onclick=saveKs;
const fkb=$("#fkb");if(fkb)fkb.onclick=enableFixed;
const sb=$("#sb");if(sb)sb.onchange=()=>{const v=$("#sr")?.value;if(v==="zip"&&FZ)onFile(FZ);else if(v==="url"&&su?.value?.trim())readUrl()};
const kd=$("#kd");if(kd)kd.onchange=()=>idleDraw();
const name=$("#name"),vn=$("#vn");if(name)name.oninput=auUI;if(vn)vn.oninput=auUI;
document.addEventListener("click",e=>{const r=e.target.closest("[data-r]");if(r){const el=$("#"+r.dataset.r);if(el){el.value=AUTO[r.dataset.r];auUI();val()}}});
const mm=$("#mm");if(mm)mm.onclick=e=>{const mu=$("#mu");if(mu){mu.hidden=!mu.hidden;e.currentTarget.setAttribute("aria-expanded",!mu.hidden)}};
document.addEventListener("click",e=>{if(!e.target.closest("#mu,#mm")){const mu=$("#mu");if(mu)mu.hidden=true}});
const ex=$("#ex");if(ex)ex.onclick=()=>{try{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(cfg(true),null,2)],{type:"application/json"}));a.download="nexabuild-config.json";a.click()}catch(e){toast(e.message)}};
const im2=$("#im2");if(im2)im2.onchange=async e=>{const f=e.target.files[0];if(!f)return;try{const c=JSON.parse(await f.text());if(!c||typeof c!=="object"||!c.name)throw Error("Format tidak dikenali");fill(c);toast("Konfigurasi diimpor")}catch(x){toast(x.message)}e.target.value=""};
let ipr;addEventListener("beforeinstallprompt",e=>{e.preventDefault();ipr=e;const ib=$("#ib");if(ib)ib.hidden=false});
const ib=$("#ib");if(ib)ib.onclick=async()=>{if(!ipr)return;ipr.prompt();await ipr.userChoice;ib.hidden=true};
const pkg=$("#pkg"),vc=$("#vc");if(pkg)pkg.oninput=val;if(vc)vc.oninput=val;
const ic=$("#ic");if(ic)ic.onchange=e=>e.target.files[0]&&upIcon(e.target.files[0]);
const psv=$("#psv");if(psv)psv.onclick=()=>{const n=prompt("Nama preset");if(!n)return;try{PR[n]=cfg(true);sv("p",PR);presets();const ps=$("#ps");if(ps)ps.value=n;toast("Preset disimpan")}catch(e){toast(e.message)}};
const ps=$("#ps");if(ps)ps.onchange=e=>{const c=PR[e.target.value];if(c){fill(c);toast("Preset dimuat")}};
const hq=$("#hq"),hf=$("#hf");if(hq)hq.oninput=hist;if(hf)hf.onchange=hist;
document.querySelectorAll("nav button").forEach(b=>b.onclick=()=>go(+b.dataset.t));

/* Swipe to close drawer */
let sx=0;
const dr=$("#dr");
if(dr){
 dr.addEventListener("touchstart",e=>{sx=e.touches[0].clientX},{passive:true});
 dr.addEventListener("touchend",e=>{if(e.changedTouches[0].clientX-sx<-60)drawer(false)},{passive:true});
}

/* Pull-to-refresh */
let py=null;
addEventListener("touchstart",e=>{py=scrollY===0&&!document.body.classList.contains("open")&&tab!==1?e.touches[0].clientY:null},{passive:true});
addEventListener("touchmove",e=>{if(py==null)return;const d=e.touches[0].clientY-py;const pt=$("#pt");if(pt){pt.style.transform=`translateY(${Math.max(0,Math.min(d,80))-60}px)`;pt.textContent=d>70?"Lepas untuk muat ulang":"Tarik untuk muat ulang"}},{passive:true});
addEventListener("touchend",e=>{if(py==null)return;const d=e.changedTouches[0].clientY-py;py=null;const pt=$("#pt");if(pt)pt.style.transform="";if(d>70){loadProfile();if(tab===2)hist();toast("Dimuat ulang")}},{passive:true});
addEventListener("touchcancel",()=>{py=null;const pt=$("#pt");if(pt)pt.style.transform=""},{passive:true});
addEventListener("online",()=>tab===0&&home());
addEventListener("offline",()=>tab===0&&home());
setInterval(stats,3000);setInterval(tick,1000);

/* Boot — urutan penting */
initCustomize();         /* 1. apply saved appearance */
presets();               /* 2. init presets dropdown */
ui();                    /* 3. init drawer UI */
go(0);                   /* 4. show first tab */
tplInit();               /* 5. init templates */
val();                   /* 6. validate form */
idleDraw();              /* 7. draw idle state */
termDraw();              /* 8. draw terminal */
logDraw();               /* 9. draw log */
custRender();            /* 10. render customization area */
if(S.t){loadProfile();reconcile();}
if("serviceWorker"in navigator)navigator.serviceWorker.register("sw.js");
addEventListener("error",e=>{if(e.message&&!/ResizeObserver|Script error/.test(e.message))toast("Galat: "+e.message)});
addEventListener("unhandledrejection",e=>toast("Galat: "+((e.reason&&e.reason.message)||e.reason)));
const ver=$("#ver");if(ver)ver.textContent=NEXA_VER;
const q=new URLSearchParams(location.search).get("go");if(q==="build")go(1);else if(q==="history")go(2);
