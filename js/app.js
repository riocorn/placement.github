/* THEME */
function toggleTheme(){
document.body.classList.toggle("dark");
document.body.classList.toggle("light");
}

/* SIDEBAR */
function toggleSidebar(){
document.getElementById("sidebar").classList.toggle("expanded");
}

function expandCollapse(){
let s=document.getElementById("sidebar");
if(s.classList.contains("expanded")){
s.classList.remove("expanded");
s.classList.add("collapsed");
}else{
s.classList.remove("collapsed");
s.classList.add("expanded");
}
}

/* LOGIN MODAL */
function openLogin(){
document.getElementById("loginModal").style.display="flex";
}
function closeLogin(){
document.getElementById("loginModal").style.display="none";
}

/* COUNTER ANIMATION */
const counters=document.querySelectorAll('.counter');

counters.forEach(counter=>{
counter.innerText='0';

const updateCounter=()=>{
const target=+counter.getAttribute('data-target');
const c=+counter.innerText;
const increment=target/200;

if(c<target){
counter.innerText=Math.ceil(c+increment);
setTimeout(updateCounter,10);
}else{
counter.innerText=target;
}
};

updateCounter();
});
