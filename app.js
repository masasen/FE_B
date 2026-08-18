/opt/homebrew/Library/Homebrew/cmd/shellenv.sh: line 18: /bin/ps: Operation not permitted
/* questions.js が定義する QUESTIONS を使う。最新版取得時に差し替えるため let。 */
let Q = (typeof QUESTIONS !== "undefined") ? QUESTIONS : [];

/* ============ 状態 ============ */
const S = {view:"list", filter:"すべて", qi:0, picked:null, graded:false,
           step:0, timerId:null, sec:0, playId:null, results:{}};
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"']/g, c => ({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
}[c]));
const KEY = ["ア","イ","ウ","エ","オ","カ","キ","ク","ケ","コ"];

/* ---- 保存 ---- */
async function load(k){ try{ const r = localStorage.getItem(k); return r ? JSON.parse(r) : null; }catch(e){ return null; } }
async function save(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

function setDataStatus(msg, kind=""){
  const el = $("dataStatus");
  if(!el) return;
  el.textContent = msg;
  el.className = `data-status ${kind}`.trim();
  clearTimeout(setDataStatus.t);
  if(msg) setDataStatus.t = setTimeout(()=>{ el.textContent=""; el.className="data-status"; }, 5000);
}

/* ---- 問題データ更新 ----
   静的に読み込んだ questions.js をフォールバックとして残しつつ、
   GitHub Pages 上では cache-busting 付き fetch で最新版だけ取得する。
   localStorage の回答履歴・メモは触らない。 */
async function fetchLatestQuestions(){
  const stamp = Date.now().toString();
  const urls = ["questions.js", "official_questions.js"].map(name => {
    const url = new URL(name, location.href);
    url.searchParams.set("_", stamp);
    return url;
  });
  const responses = await Promise.all(urls.map(url => fetch(url.toString(), {cache:"no-store"})));
  const failed = responses.find(r => !r.ok);
  if(failed) throw new Error(`HTTP ${failed.status}`);
  const sources = await Promise.all(responses.map(r => r.text()));
  const fresh = new Function(`${sources.join("\n")}\n;return (typeof QUESTIONS !== "undefined") ? QUESTIONS : [];`)();
  if(!Array.isArray(fresh) || fresh.length === 0) throw new Error("問題データが空です");
  const ids = fresh.map(q=>q && q.id);
  if(ids.some(id=>!id) || new Set(ids).size !== ids.length) throw new Error("問題IDが不正です");
  return fresh;
}

function backToList(){
  clearInterval(S.timerId); stopPlay();
  S.view="list";
  $("viewQ").classList.add("hide");
  $("viewList").classList.remove("hide");
  renderFilters(); renderList();
  window.scrollTo(0,0);
}

async function updateQuestionData({silent=false}={}){
  const btn = $("btnUpdateQuestions");
  if(btn) btn.disabled = true;
  if(!silent) setDataStatus("問題データを確認中…");
  try{
    /* 更新直前のメモも確実に保存 */
    if(S.view==="q" && Q[S.qi]){
      await save("feb:memo:"+Q[S.qi].id, $("memo").value);
    }
    const before = Q.length;
    Q = await fetchLatestQuestions();
    if(S.view==="q") backToList();
    else { renderFilters(); renderList(); }
    if(!silent || Q.length !== before) setDataStatus(`問題データ更新完了：${Q.length}問`, "ok");
    return true;
  }catch(e){
    if(!silent) setDataStatus("更新できませんでした。通信状態を確認してください。", "ng");
    return false;
  }finally{
    if(btn) btn.disabled = false;
  }
}

function reloadApp(){
  /* URLを毎回変えてホーム画面版でもHTML自体を再取得させる。localStorageは維持される。 */
  const url = new URL(location.href);
  url.searchParams.set("_reload", Date.now().toString());
  location.replace(url.toString());
}

function resetLearningData(){
  const ok = window.confirm("回答履歴と各問題のメモをすべて削除します。問題データは削除されません。よろしいですか？");
  if(!ok) return;
  for(let i=localStorage.length-1;i>=0;i--){
    const k = localStorage.key(i);
    if(k === "feb:results" || (k && k.startsWith("feb:memo:"))) localStorage.removeItem(k);
  }
  S.results = {};
  if($("memo")) $("memo").value = "";
  backToList();
  setDataStatus("学習データをリセットしました。", "ok");
}

/* ============ 一覧 ============ */
function renderFilters(){
  const cats = ["すべて", ...new Set(Q.map(q=>q.cat))];
  $("filters").innerHTML = cats.map(c =>
    `<button class="chip" data-cat="${c}" aria-pressed="${c===S.filter}">${c}</button>`).join("");
  $("filters").querySelectorAll(".chip").forEach(b => b.onclick = () => {
    S.filter = b.dataset.cat; renderFilters(); renderList();
  });
}
function renderList(){
  const list = Q.filter(q => S.filter==="すべて" || q.cat===S.filter);
  $("cards").innerHTML = list.map(q => {
    const r = S.results[q.id];
    const cls = r ? (r.ok ? "done" : "miss") : "";
    const mk  = r ? `<span class="mark">${r.ok ? "○" : "×"}</span>` : "";
    return `<button class="card ${cls}" data-id="${q.id}">
      <div class="card-h"><span class="qno">問 ${String(Q.indexOf(q)+1).padStart(2,"0")}</span><span class="cat">${q.cat}</span></div>
      <div class="card-t">${esc(q.title)}${mk}</div>
      <div class="card-d">${esc(q.prompt).slice(0,58)}…</div></button>`;
  }).join("");
  $("cards").querySelectorAll(".card").forEach(b => b.onclick = () => openQ(Q.findIndex(x=>x.id===b.dataset.id)));
  const currentResults = Q.map(q=>S.results[q.id]).filter(Boolean);
  const done = currentResults.length, ok = currentResults.filter(r=>r.ok).length;
  $("stScore").textContent = `${ok}/${done||0}`;
}

/* ============ 問題表示 ============ */
async function openQ(i){
  S.qi=i; S.picked=null; S.graded=false; S.step=0; S.sec=0;
  stopPlay();
  const q = Q[i];
  S.view="q"; $("viewList").classList.add("hide"); $("viewQ").classList.remove("hide");
  window.scrollTo(0,0);

  $("qNo").textContent = `問 ${String(i+1).padStart(2,"0")} ／ ${q.cat}`;
  $("qTitle").textContent = q.title;
  $("qPrompt").textContent = q.prompt;

  if(q.code){
    $("qCode").innerHTML = q.code.map((l,n) =>
      `<div class="cl" data-line="${n+1}"><span class="n">${n+1}</span><span>${esc(l)}</span></div>`).join("");
    $("qCode").classList.remove("hide");
  } else { $("qCode").innerHTML=""; $("qCode").classList.add("hide"); }

  if(q.given){ $("qGiven").textContent = q.given; $("qGiven").classList.remove("hide"); }
  else $("qGiven").classList.add("hide");

  const source = $("qSource");
  if(q.source && q.source.url){
    source.innerHTML = `出典：<a href="${esc(q.source.url)}" target="_blank" rel="noopener noreferrer">${esc(q.source.label || q.source.url)}</a>`;
    source.classList.remove("hide");
  } else {
    source.innerHTML = "";
    source.classList.add("hide");
  }

  $("qChoices").innerHTML = q.choices.map((c,n) =>
    `<button class="ch" data-n="${n}" aria-pressed="false"><span class="k">${KEY[n]}</span><span>${esc(c)}</span></button>`).join("");
  $("qChoices").querySelectorAll(".ch").forEach(b => b.onclick = () => {
    if(S.graded) return;
    S.picked = +b.dataset.n;
    $("qChoices").querySelectorAll(".ch").forEach(x => x.setAttribute("aria-pressed", x===b));
    $("btnSolve").disabled = false;
  });

  $("result").classList.add("hide");
  $("btnSolve").disabled = true;
  $("btnReveal").classList.remove("hide");
  $("memo").value = (await load("feb:memo:"+q.id)) || "";
  startTimer();
}

/* ---- タイマー ---- */
function startTimer(){
  clearInterval(S.timerId);
  const t = $("timer"); t.classList.remove("over");
  S.timerId = setInterval(()=>{
    S.sec++;
    t.textContent = `${Math.floor(S.sec/60)}:${String(S.sec%60).padStart(2,"0")}`;
    if(S.sec >= 300) t.classList.add("over");
  },1000);
}

/* ============ 採点 ============ */
function grade(revealed){
  const q = Q[S.qi];
  clearInterval(S.timerId);
  S.graded = true;
  const ok = !revealed && S.picked === q.answer;

  $("qChoices").querySelectorAll(".ch").forEach((b,n) => {
    if(n===q.answer) b.classList.add("ok");
    else if(n===S.picked) b.classList.add("ng");
  });

  $("stamp").textContent = ok ? "○" : "×";
  $("verdictT").innerHTML = ok
    ? `正解 ${KEY[q.answer]}<span>所要 ${Math.floor(S.sec/60)}分${S.sec%60}秒。この解き方を再現できるか、下の過程と突き合わせてください。</span>`
    : `正解は ${KEY[q.answer]}<span>${revealed ? "解答を表示しました。" : "選んだのは "+KEY[S.picked]+"。"}どの1行で値がずれたのかを、下の表で特定してください。</span>`;

  const memo = $("memo").value.trim();
  if(memo){ $("myNote").textContent = "自分のメモ：\n"+memo; $("myNote").classList.remove("hide"); }
  else $("myNote").classList.add("hide");

  $("explain").innerHTML = q.explain;
  $("pRange").max = q.steps.length - 1;
  $("pRange").value = 0;
  S.step = 0; drawStep();

  $("result").classList.remove("hide");
  $("btnSolve").disabled = true;
  $("btnReveal").classList.add("hide");

  if(!revealed || !S.results[q.id]){
    S.results[q.id] = {ok, sec:S.sec};
    save("feb:results", S.results);
  }
  $("result").scrollIntoView({behavior:"smooth", block:"start"});
}

/* ============ ステップ再生 ============ */
function drawStep(){
  const q = Q[S.qi], st = q.steps[S.step];
  document.querySelectorAll(".cl").forEach(el => el.classList.remove("on"));
  if(st.line){
    const el = document.querySelector(`.cl[data-line="${st.line}"]`);
    if(el) el.classList.add("on");
  }
  $("stepNote").textContent = st.note ? (st.line ? `${st.line}行目 ／ ${st.note}` : st.note) : (st.v ? st.v[2] || "" : "");

  let html = `<thead><tr><th class="ln">#</th>${q.vars.map(v=>`<th>${esc(v)}</th>`).join("")}</tr></thead><tbody>`;
  for(let i=0;i<=S.step;i++){
    const s = q.steps[i];
    html += `<tr><td class="ln">${s.line ?? i+1}</td>${s.v.map(x=>`<td>${esc(x)}</td>`).join("")}</tr>`;
  }
  $("ttable").innerHTML = html + "</tbody>";
  $("pCount").textContent = `${S.step+1} / ${q.steps.length}`;
  $("pRange").value = S.step;
}
function go(n){
  const max = Q[S.qi].steps.length - 1;
  S.step = Math.max(0, Math.min(max, n));
  drawStep();
  return S.step < max;
}
function stopPlay(){ clearInterval(S.playId); S.playId=null; $("pPlay").textContent="自動再生"; }
function togglePlay(){
  if(S.playId){ stopPlay(); return; }
  $("pPlay").textContent = "停止";
  if(S.step === Q[S.qi].steps.length-1) go(0);
  S.playId = setInterval(()=>{ if(!go(S.step+1)) stopPlay(); }, 1400);
}

/* ============ メモ欄 ============ */
$("memo").addEventListener("keydown", e => {
  if(e.key === "Tab"){ e.preventDefault();
    const t=e.target, p=t.selectionStart;
    t.value = t.value.slice(0,p) + "  " + t.value.slice(t.selectionEnd);
    t.selectionStart = t.selectionEnd = p+2;
  }
});
let saveT;
$("memo").addEventListener("input", ()=>{
  clearTimeout(saveT);
  saveT = setTimeout(()=> save("feb:memo:"+Q[S.qi].id, $("memo").value), 500);
});
$("btnTable").onclick = ()=>{
  const q = Q[S.qi];
  const cols = q.vars.map(v => v.padEnd(9," ").slice(0,9));
  const head = " 回 | " + cols.join(" | ");
  const rule = "-".repeat(head.length);
  let t = "\n" + head + "\n" + rule + "\n";
  for(let i=1;i<=6;i++) t += ` ${String(i).padStart(2," ")} | ` + cols.map(c=>" ".repeat(9)).join(" | ") + "\n";
  const m = $("memo");
  m.value += t; m.focus(); m.scrollTop = m.scrollHeight;
  m.dispatchEvent(new Event("input"));
};
$("btnClear").onclick = ()=>{ $("memo").value=""; $("memo").focus(); $("memo").dispatchEvent(new Event("input")); };

/* ============ イベント ============ */
$("btnSolve").onclick  = ()=> grade(false);
$("btnReveal").onclick = ()=> grade(true);
$("back").onclick = backToList;
$("btnUpdateQuestions").onclick = ()=> updateQuestionData();
$("btnReloadApp").onclick = reloadApp;
$("btnResetData").onclick = resetLearningData;
$("btnNext").onclick = ()=> openQ((S.qi+1) % Q.length);
$("pNext").onclick  = ()=>{ stopPlay(); go(S.step+1); };
$("pPrev").onclick  = ()=>{ stopPlay(); go(S.step-1); };
$("pFirst").onclick = ()=>{ stopPlay(); go(0); };
$("pPlay").onclick  = togglePlay;
$("pRange").oninput = e =>{ stopPlay(); go(+e.target.value); };
document.addEventListener("keydown", e=>{
  if(S.view!=="q" || !S.graded || e.target.tagName==="TEXTAREA") return;
  if(e.key==="ArrowRight"){ stopPlay(); go(S.step+1); }
  if(e.key==="ArrowLeft"){ stopPlay(); go(S.step-1); }
});

/* ============ 起動 ============ */
(async ()=>{
  S.results = (await load("feb:results")) || {};
  /* まず同梱データで即表示できる状態を作り、続いて最新版を取得する。 */
  renderFilters(); renderList();
  await updateQuestionData({silent:true});
})();
