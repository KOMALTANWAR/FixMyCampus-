import { createReport, getCounts, filterReports, STATUSES } from "./task-utils.js";

const KEY = "fixmycampus-reports-v1";
const $ = (selector) => document.querySelector(selector);
const demoReports = [
  {id:"FMC-10482",title:"Water cooler not working",category:"Water",location:"Library · Ground floor",priority:"High",description:"The water cooler near the reading area is not dispensing water.",reporter:"Aarav",status:"In Progress",createdAt:"2026-11-22T08:30:00.000Z"},
  {id:"FMC-10481",title:"Lights flickering in Room 204",category:"Electrical",location:"Academic Block · Room 204",priority:"Medium",description:"Ceiling lights flicker during lectures.",reporter:"Student",status:"Pending",createdAt:"2026-11-21T10:15:00.000Z"},
  {id:"FMC-10480",title:"Garden pathway needs cleaning",category:"Cleanliness",location:"Central Garden",priority:"Low",description:"Leaves and litter are collecting on the walking path.",reporter:"Meera",status:"Resolved",createdAt:"2026-11-20T07:00:00.000Z"},
  {id:"FMC-10479",title:"Wi-Fi signal weak",category:"Internet",location:"Hostel · Study lounge",priority:"Medium",description:"Wi-Fi disconnects frequently in the study lounge.",reporter:"Kabir",status:"In Progress",createdAt:"2026-11-19T12:20:00.000Z"}
];
let reports = loadReports();
let adminMode = false;
let photoData = "";

function loadReports() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved === null ? demoReports : JSON.parse(saved);
  } catch { return demoReports; }
}
function save() { localStorage.setItem(KEY, JSON.stringify(reports)); }
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function iconFor(category) {
  return ({Water:"◉",Electrical:"ϟ",Cleanliness:"✧",Infrastructure:"⌂",Internet:"⌁",Other:"＋"})[category] || "＋";
}
function dateLabel(iso) {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? "Recently" : date.toLocaleDateString(undefined,{day:"numeric",month:"short"});
}
function pill(status) {
  const cls = status === "Resolved" ? "pill-resolved" : status === "In Progress" ? "pill-progress" : "pill-pending";
  return `<span class="status-pill ${cls}">${escapeHTML(status)}</span>`;
}
function row(report, withAdmin = false) {
  return `<article class="report-row">
    <div class="category-icon">${iconFor(report.category)}</div>
    <div class="report-main"><strong>${escapeHTML(report.title)}</strong><small>${escapeHTML(report.id)} · ${escapeHTML(report.location)} · ${dateLabel(report.createdAt)}</small></div>
    ${withAdmin ? `<div class="row-actions"><select data-update="${escapeHTML(report.id)}" aria-label="Update status for ${escapeHTML(report.id)}">${STATUSES.map(s=>`<option ${report.status===s?"selected":""}>${s}</option>`).join("")}</select></div>` : pill(report.status)}
  </article>`;
}
function render() {
  const counts = getCounts(reports);
  $("#stat-total").textContent = counts.total;
  $("#stat-pending").textContent = counts.pending;
  $("#stat-progress").textContent = counts.progress;
  $("#stat-resolved").textContent = counts.resolved;
  $("#nav-report-count").textContent = counts.total;
  $("#donut-total").textContent = counts.total;
  $("#legend-pending").textContent = counts.pending;
  $("#legend-progress").textContent = counts.progress;
  $("#legend-resolved").textContent = counts.resolved;
  const total = counts.total || 1;
  const p = counts.pending / total * 360, i = counts.progress / total * 360;
  $("#status-donut").style.background = `conic-gradient(#efb45c 0deg ${p}deg,#5b9ce5 ${p}deg ${p+i}deg,#36b88b ${p+i}deg 360deg)`;
  const recent = [...reports].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).slice(0,4);
  $("#recent-list").innerHTML = recent.length ? recent.map(r=>row(r)).join("") : '<div class="empty-state">✳<strong>No reports yet</strong>Be the first to report a campus issue.</div>';
  renderAll();
}
function renderAll() {
  const filtered = filterReports(reports, {status:$("#status-filter").value,category:$("#category-filter").value,query:$("#search-input").value});
  $("#all-reports-list").innerHTML = filtered.length
    ? [...filtered].sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)).map(r=>row(r,adminMode)).join("")
    : '<div class="empty-state">⌕<strong>No matching reports</strong>Try changing your search or filters.</div>';
}
function showView(view) {
  ["overview","reports","new"].forEach(v => $(`#${v}-view`).classList.toggle("hidden", v !== view));
  document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.view===view));
  $("#breadcrumb-current").textContent = view === "new" ? "Report an issue" : view[0].toUpperCase()+view.slice(1);
  $("#sidebar").classList.remove("open");
  if(view==="reports") renderAll();
  window.scrollTo({top:0,behavior:"smooth"});
}
let toastTimer;
function toast(message) {
  const el=$("#toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2600);
}
document.querySelectorAll("[data-view]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.view)));
document.querySelectorAll("[data-goto]").forEach(b=>b.addEventListener("click",()=>showView(b.dataset.goto)));
["#new-report-top","#new-report-list","#help-report"].forEach(id=>$(id).addEventListener("click",()=>showView("new")));
$("#role-switch").addEventListener("click",()=>{
  adminMode=!adminMode;
  $("#role-label").textContent=adminMode?"Admin demo view":"Student view";
  $("#role-switch").style.borderColor=adminMode?"#8c83ec":"#e7eaf1";
  renderAll(); toast(adminMode?"Admin demo mode enabled":"Student view enabled");
});
$("#search-input").addEventListener("input",renderAll);
$("#status-filter").addEventListener("change",renderAll);
$("#category-filter").addEventListener("change",renderAll);
$("#all-reports-list").addEventListener("change",e=>{
  const id=e.target.dataset.update;
  if(!id || !STATUSES.includes(e.target.value)) return;
  reports=reports.map(r=>r.id===id?{...r,status:e.target.value}:r); save(); render();
  toast("Report status updated.");
});
$("#mobile-menu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#photo-input").addEventListener("change",async e=>{
  const file=e.target.files?.[0]; if(!file){photoData="";$("#file-name").textContent="No file selected";return;}
  if(!file.type.startsWith("image/") || file.size>1.5*1024*1024){e.target.value="";photoData="";$("#file-name").textContent="No file selected";toast("Choose an image smaller than 1.5 MB.");return;}
  photoData=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});
  $("#file-name").textContent=file.name;
});
$("#report-form").addEventListener("submit",e=>{
  e.preventDefault();
  const data=Object.fromEntries(new FormData(e.currentTarget).entries());
  try {
    const report=createReport({...data,photo:photoData});
    reports.unshift(report); save(); render(); e.currentTarget.reset(); photoData="";$("#file-name").textContent="No file selected";
    toast(`Report submitted! Your ID is ${report.id}`); showView("reports");
  } catch(err) { toast(err.message); }
});
$("#clear-form").addEventListener("click",()=>{photoData="";$("#file-name").textContent="No file selected";});
render();
