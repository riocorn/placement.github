/* Sidebar */
function toggleSidebar(){
document.getElementById("sidebar").classList.toggle("active");
}

/* Theme */
function toggleTheme(){
document.body.classList.toggle("dark");
document.body.classList.toggle("light");
}

/* Login Modal */
function openLogin(){
document.getElementById("loginModal").style.display="flex";
}
function closeLogin(){
document.getElementById("loginModal").style.display="none";
}

/* Counter Animation */
document.addEventListener("DOMContentLoaded", function(){
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
});
