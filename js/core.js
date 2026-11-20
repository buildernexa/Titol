const $=s=>document.querySelector(s),sleep=ms=>new Promise(r=>setTimeout(r,ms));
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},sv=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const esc=s=>String(s??"").replace(/[&<>"'`]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"}[c]));
const cn=x=>String(x??"").replace(/[^\w-]/g,"");
let S=ld("s",{}),H=ld("h",[]),PR=ld("p",{}),P={},run=null,busy=false,stp="",lg="";
/* data dari localStorage tidak dipercaya: bentuknya divalidasi sebelum dipakai */
if(!S||typeof S!=="object"||Array.isArray(S))S={};
if(!PR||typeof PR!=="object"||Array.isArray(PR))PR={};
H=(Array.isArray(H)?H:[]).filter(x=>x&&typeof x==="object").map(x=>({...x,cfg:x.cfg&&typeof x.cfg==="object"?x.cfg:{}}));
H.forEach(h=>{if(h.st==="running"&&!h.runId)h.st="terputus"});
const LAB={success:"Berhasil",failure:"Gagal",running:"Berjalan",cancelled:"Dibatalkan"},lab=s=>LAB[s]||"Terputus";
const IC={home:'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',cam:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',gauge:'<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 18l4-6"/>',wifi:'<path d="M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01"/>',layers:'<path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5"/>',run:'<path d="M21 12a9 9 0 1 1-3-6.7M21 4v5h-5"/>',check:'<path d="M4 12l5 5 11-11"/>',plus:'<path d="M12 5v14M5 12h14"/>',redo:'<path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5"/>',hist:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',ext:'<path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6"/>',gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9L7 7M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/>'};
const ic=n=>`<svg viewBox="0 0 24 24">${IC[n]}</svg>`;
let tab=0,tt,ANIM=true,PL={};
function toast(m){const t=$("#ts");t.textContent=m;t.classList.add("show");clearTimeout(tt);tt=setTimeout(()=>t.classList.remove("show"),2600)}

const NEXA_VER="1.2.0";
async function api(p,o={}){
 const h={Authorization:"Bearer "+S.t,Accept:"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28"};
 if(o.body)h["Content-Type"]="application/json";
 let r;try{r=await fetch("https://api.github.com"+p,{...o,headers:h})}catch{throw Error("Tidak bisa terhubung ke GitHub. Periksa koneksi internet.")}
 if(r.status===401)throw Error("Token salah atau sudah kedaluwarsa.");
 if(r.status===403&&r.headers.get("x-ratelimit-remaining")==="0"){const rs=+r.headers.get("x-ratelimit-reset");throw Error("Batas API GitHub habis."+(rs?" Coba lagi pukul "+new Date(rs*1000).toLocaleTimeString("id-ID",{hour:"2-digit",minute:"2-digit"})+".":" Coba lagi nanti."))};
 if(!r.ok){let m="";try{m=(await r.json()).message}catch{}throw Error(r.status+" "+m)}
 return o.raw?r:r.status===204?null:r.json();
}
function scopes(r){
 const s=r.headers.get("x-oauth-scopes");if(s===null)return;
 const have=s.split(",").map(x=>x.trim()),miss=["repo","workflow"].filter(x=>!have.includes(x));
 if(miss.length)throw Error("Scope kurang: "+miss.join(", ")+". Buat ulang token dengan scope tersebut.");
}

/* drawer */
function drawer(o){document.body.classList.toggle("open",o);$("#dr").setAttribute("aria-hidden",!o);if(o)ui()}
function ui(){
 $("#ds").innerHTML=S.t?`<span class="tag success">Terhubung</span><p style="margin:8px 0 0">${esc(S.u)}<br>${esc(S.r)}</p>`:`<span class="tag">Belum terhubung</span>`;
 const rp=$("#rpw");if(rp)rp.hidden=!S.t||S.repoPrivate!==false;
 if(!$("#rn").dataset.s){$("#rn").value=S.rn||"apk-builder";$("#vis").value=S.vis||"private";$("#wf").value=S.wf||"build.yml";$("#cm").checked=!!S.cm;$("#rn").dataset.s=1}
 if(S.tp&&!$("#tu").dataset.s){const q=S.tp.split("/");$("#tu").value=q[0];$("#tr").value=q[1]||"";$("#tu").dataset.s=1}
 $("#tk").placeholder=S.t?"Tersimpan di perangkat":"ghp_...";
 $("#lo").disabled=$("#tt").disabled=!S.t;
}
const ep=p=>String(p).split("/").map(encodeURIComponent).join("/");
const parseRepo=v=>{v=String(v||"").trim().replace(/^https?:\/\/(www\.)?github\.com\//i,"").replace(/\.git$/i,"").replace(/\/+$/,"");const m=v.match(/^([\w.-]+)\/([\w.-]+)/);return m?m[1]+"/"+m[2]:""};
function parseWfInputs(y){
 const L=String(y).split(/\r?\n/);let i=L.findIndex(l=>/^\s*workflow_dispatch\s*:/.test(l));if(i<0)return null;
 const base=L[i].match(/^\s*/)[0].length,out=[];let inp=false,ind=-1;
 for(i++;i<L.length;i++){
  const l=L[i];if(!l.trim()||/^\s*#/.test(l))continue;const cur=l.match(/^\s*/)[0].length;if(cur<=base)break;
  if(/^\s*inputs\s*:/.test(l)){inp=true;ind=-1;continue}
  if(inp){if(ind<0)ind=cur;if(cur===ind){const m=l.match(/^\s*['"]?([\w-]+)['"]?\s*:/);if(m)out.push(m[1])}else if(cur<ind)inp=false}
 }
 return out;
}
let WFIN=null;
async function wfInputs(){
 if(WFIN)return WFIN.v;
 try{const f=await api(`/repos/${S.r}/contents/.github/workflows/${ep(S.wf||"build.yml")}`);const y=decodeURIComponent(escape(atob((f.content||"").replace(/\s/g,""))));WFIN={v:parseWfInputs(y)}}
 catch{WFIN={v:null}}
 return WFIN.v;
}
async function loadWorkflows(){
 try{
  const r=await api(`/repos/${S.r}/actions/workflows?per_page=100`),fs=(r.workflows||[]).map(w=>w.path.replace(/^.*\//,""));
  const dl=$("#wfl");if(dl)dl.innerHTML=fs.map(x=>`<option value="${esc(x)}">`).join("");
  return fs;
 }catch{return[]}
}
/* salin isi repo template (untuk repo yang tidak ditandai Template di GitHub) */
async function copyTpl(src,dst,m){
 const info=await api("/repos/"+src),tree=await api(`/repos/${src}/git/trees/${encodeURIComponent(info.default_branch)}?recursive=1`);
 const fl=(tree.tree||[]).filter(x=>x.type==="blob"&&x.mode!=="120000");
 if(!fl.length)throw Error("Repo template kosong.");
 if(fl.length>600)throw Error("Repo template terlalu besar ("+fl.length+" berkas).");
 for(const [i,f] of fl.entries()){
  m.textContent=`Menyalin template ${i+1}/${fl.length}...`;
  const bl=await api(`/repos/${src}/git/blobs/${f.sha}`);let sha;
  try{sha=(await api(`/repos/${dst}/contents/${ep(f.path)}`)).sha}catch{}
  await api(`/repos/${dst}/contents/${ep(f.path)}`,{method:"PUT",body:JSON.stringify({message:"Salin template",content:String(bl.content).replace(/\s/g,""),sha})});
 }
}
async function connect(){
 const t=$("#tk").value.trim()||S.t,m=$("#lm"),b=$("#lb");
 const tuv=$("#tu").value.trim(),trv=$("#tr").value.trim();
 const tp=tuv.includes("/")?parseRepo(tuv):(tuv&&trv?parseRepo(tuv+"/"+trv):"");
 const rn=($("#rn").value.trim()||"apk-builder").replace(/[^\w.-]/g,"-"),vis=$("#vis").value==="public"?"public":"private";
 const wf=($("#wf").value.trim()||"build.yml").replace(/^.*\//,""),cm=$("#cm").checked;
 if(!t){m.textContent="Isi token GitHub dulu.";return}
 if(tuv&&!tp){m.textContent="Template tidak valid. Tulis username/repo atau tempel URL repo GitHub.";return}
 b.disabled=true;const old=S;S={...S,t,tp,rn,vis,wf,cm};WFIN=null;
 try{
  m.textContent="1/4 Memeriksa token...";
  const r=await api("/user",{raw:true});scopes(r);const u=await r.json();
  S.u=u.login;S.r=u.login+"/"+rn;
  let existed=true;
  try{await api("/repos/"+S.r)}catch(e){
   if(!/^404/.test(e.message))throw e;existed=false;
   const priv=vis!=="public";let done=false,note="";
   if(tp){
    m.textContent="2/4 Membuat repo dari template...";
    try{await api(`/repos/${tp}/generate`,{method:"POST",body:JSON.stringify({owner:u.login,name:rn,private:priv})});done=true}
    catch(e2){
     try{
      m.textContent="2/4 Menyalin isi template...";
      await api("/user/repos",{method:"POST",body:JSON.stringify({name:rn,private:priv,auto_init:true,description:"Dibuat oleh NexaBuild"})});
      await sleep(2500);await copyTpl(tp,S.r,m);done=true;
     }catch(e3){
      note="Template "+tp+" tidak bisa dipakai ("+e3.message+"). Memakai workflow bawaan NexaBuild.";
      try{await api("/repos/"+S.r)}catch{await api("/user/repos",{method:"POST",body:JSON.stringify({name:rn,private:priv,auto_init:true,description:"Dibuat oleh NexaBuild"})});await sleep(2500)}
     }
    }
   }else{
    m.textContent="2/4 Membuat repo build...";
    await api("/user/repos",{method:"POST",body:JSON.stringify({name:rn,private:priv,auto_init:true,description:"Dibuat oleh NexaBuild"})});await sleep(2500);
   }
   if(!done){S.cm=false;S.wf="build.yml";$("#wf").value="build.yml";$("#cm").checked=false;TPLOK=false;SYNC_BAD=[];m.textContent="3/4 Memasang workflow bawaan...";if(!await syncTpl(true))throw Error("Gagal memasang workflow bawaan ke repo build.");if(note)toast(note)}
  }
  m.textContent="3/4 Menunggu workflow siap...";
  let wfs=[];for(let i=0;i<15;i++){wfs=await loadWorkflows();if(wfs.length)break;await sleep(2000)}
  if(!wfs.length&&!S.cm){S.wf="build.yml";TPLOK=false;SYNC_BAD=[];await syncTpl(true);for(let i=0;i<10&&!wfs.length;i++){await sleep(2000);wfs=await loadWorkflows()}}
  if(wfs.length&&!wfs.includes(S.wf)){const pick=wfs.find(x=>/build|apk|android/i.test(x))||wfs[0];toast("Workflow "+S.wf+" tidak ada. Memakai "+pick);S.wf=pick;$("#wf").value=pick}
  if(!wfs.length)throw Error("Tidak ada workflow di repo build. Pastikan template berisi folder .github/workflows.");
  m.textContent="4/4 Menyimpan...";
  try{const br=await api("/repos/"+S.r);S.repoPrivate=!!br.private}catch{}
  sv("s",S);$("#tk").value="";m.textContent="";toast(existed?"Terhubung ke repo "+S.r:"Terhubung. Repo build dibuat");drawer(false);loadProfile();checkTpl();checkFixed();
 }catch(e){S=old;m.textContent=e.message}
 b.disabled=false;ui();
}
async function test(){
 const m=$("#lm");m.textContent="Menguji koneksi...";
 try{const r=await api("/user",{raw:true});scopes(r);await api("/repos/"+S.r);m.textContent="";toast("Koneksi baik")}
 catch(e){m.textContent=e.message}
}
async function makeBuildRepoPrivate(){
 const b=$("#priv");if(b)b.disabled=true;
 try{const r=await api("/repos/"+S.r,{method:"PATCH",body:JSON.stringify({private:true})});S.repoPrivate=!!r.private;P.priv=S.repoPrivate;sv("s",S);ui();home();toast("Repo build sekarang private")}
 catch(e){toast("Gagal mengubah privasi repo: "+e.message)}
 if(b)b.disabled=false;
}
function disc(){S={vc:S.vc,vcByPkg:S.vcByPkg||{},repoPrivate:S.repoPrivate,tp:S.tp,rn:S.rn,vis:S.vis,wf:S.wf,cm:S.cm,pubOk:S.pubOk};WFIN=null;localStorage.setItem("s",JSON.stringify(S));P={};ui();home();TPLOK=null;SYNC_BAD=[];TPLT=0;FIXED=null;toast("Koneksi diputus")}

/* home */
function go(n){
 tab=n;["#v-home","#v-build","#v-hist"].forEach((s,i)=>{const e=$(s);e.hidden=i!==n;if(i===n){e.classList.remove("in");void e.offsetWidth;e.classList.add("in")}});
 document.querySelectorAll("nav button").forEach(b=>{const on=+b.dataset.t===n;on?b.setAttribute("aria-current","page"):b.removeAttribute("aria-current")});
 if(n===0){ANIM=true;home()}if(n===1){queue();checkTpl();checkFixed()}if(n===2){hist();reconcile()}scrollTo(0,0);
}

/* history */
