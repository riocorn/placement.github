/* =========================================================
   GLOBAL VARIABLES
========================================================= */

const body = document.body;
const sidebar = document.getElementById("sidebar");
const themeBtn = document.getElementById("themeToggle");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const closeLogin = document.getElementById("closeLogin");
const closeSignup = document.getElementById("closeSignup");
const menuToggle = document.getElementById("menuToggle");
const counterElements = document.querySelectorAll(".counter");
const navbar = document.querySelector(".navbar");

/* =========================================================
   SIDEBAR TOGGLE
========================================================= */

function toggleSidebar() {
    sidebar.classList.toggle("active");
}

menuToggle?.addEventListener("click", toggleSidebar);

/* =========================================================
   THEME TOGGLE
========================================================= */

function toggleTheme() {
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        body.classList.add("light");
        localStorage.setItem("theme", "light");
    } else {
        body.classList.remove("light");
        body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
}

themeBtn?.addEventListener("click", toggleTheme);

window.onload = function () {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        body.classList.remove("dark", "light");
        body.classList.add(savedTheme);
    }
};

/* =========================================================
   MODAL SYSTEM
========================================================= */

function openLogin() {
    loginModal.style.display = "flex";
}

function openSignup() {
    signupModal.style.display = "flex";
}

function closeLoginModal() {
    loginModal.style.display = "none";
}

function closeSignupModal() {
    signupModal.style.display = "none";
}

loginBtn?.addEventListener("click", openLogin);
signupBtn?.addEventListener("click", openSignup);
closeLogin?.addEventListener("click", closeLoginModal);
closeSignup?.addEventListener("click", closeSignupModal);

window.addEventListener("click", function (e) {
    if (e.target === loginModal) closeLoginModal();
    if (e.target === signupModal) closeSignupModal();
});

/* =========================================================
   FAKE AUTH SYSTEM (FRONTEND ONLY)
========================================================= */

function showToast(message) {
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "12px 20px";
    toast.style.background = "#ff7e5f";
    toast.style.color = "white";
    toast.style.borderRadius = "8px";
    toast.style.zIndex = "3000";
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function loginUser() {
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;

    if (email === "" || pass === "") {
        showToast("Please fill all fields");
        return;
    }

    localStorage.setItem("user", email);
    showToast("Login Successful!");
    closeLoginModal();
}

function signupUser() {
    const email = document.getElementById("signupEmail").value;
    const pass = document.getElementById("signupPassword").value;

    if (email === "" || pass === "") {
        showToast("Please fill all fields");
        return;
    }

    showToast("Account Created!");
    closeSignupModal();
}

document.getElementById("loginSubmit")?.addEventListener("click", loginUser);
document.getElementById("signupSubmit")?.addEventListener("click", signupUser);

/* =========================================================
   ANIMATED COUNTERS
========================================================= */

function animateCounter(counter) {
    const target = +counter.getAttribute("data-target");
    let count = 0;
    const increment = target / 100;

    const update = () => {
        count += increment;
        if (count < target) {
            counter.innerText = Math.floor(count);
            requestAnimationFrame(update);
        } else {
            counter.innerText = target;
        }
    };

    update();
}

counterElements.forEach(counter => {
    animateCounter(counter);
});

/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0,0,0,0.9)";
    } else {
        navbar.style.background = "rgba(0,0,0,0.6)";
    }
});

/* =========================================================
   SMOOTH SCROLL FOR LINKS
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        target?.scrollIntoView({ behavior: "smooth" });
    });
});

/* =========================================================
   FAQ ACCORDION
========================================================= */

document.querySelectorAll(".faq h4").forEach(question => {
    question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        answer.style.display =
            answer.style.display === "block" ? "none" : "block";
    });
});

/* =========================================================
   TYPING HERO EFFECT
========================================================= */

const typingText = document.getElementById("typingText");
const phrases = [
    "Learn from IITians",
    "Master GATE Preparation",
    "Industry Expert Mentorship",
    "Structured Course Roadmap"
];

let phraseIndex = 0;
let letterIndex = 0;

function typeEffect() {
    if (!typingText) return;

    if (letterIndex < phrases[phraseIndex].length) {
        typingText.innerHTML += phrases[phraseIndex].charAt(letterIndex);
        letterIndex++;
        setTimeout(typeEffect, 80);
    } else {
        setTimeout(eraseEffect, 1500);
    }
}

function eraseEffect() {
    if (letterIndex > 0) {
        typingText.innerHTML =
            phrases[phraseIndex].substring(0, letterIndex - 1);
        letterIndex--;
        setTimeout(eraseEffect, 40);
    } else {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 200);
    }
}

typeEffect();

/* =========================================================
   BACK TO TOP BUTTON
========================================================= */

const topBtn = document.createElement("button");
topBtn.innerText = "↑";
topBtn.style.position = "fixed";
topBtn.style.bottom = "30px";
topBtn.style.right = "30px";
topBtn.style.padding = "10px 15px";
topBtn.style.borderRadius = "50%";
topBtn.style.border = "none";
topBtn.style.background = "#ff7e5f";
topBtn.style.color = "white";
topBtn.style.cursor = "pointer";
topBtn.style.display = "none";
document.body.appendChild(topBtn);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/* =========================================================
   SECTION ACTIVE HIGHLIGHT
========================================================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".sidebar a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* =========================================================
   DASHBOARD SWITCH SYSTEM
========================================================= */

function showDashboard(type) {
    const userDash = document.getElementById("userDashboard");
    const adminDash = document.getElementById("adminDashboard");

    if (type === "admin") {
        userDash.style.display = "none";
        adminDash.style.display = "block";
    } else {
        adminDash.style.display = "none";
        userDash.style.display = "block";
    }
}

/* =========================================================
   LOGOUT SYSTEM
========================================================= */

function logoutUser() {
    localStorage.removeItem("user");
    showToast("Logged Out Successfully");
}

document.getElementById("logoutBtn")?.addEventListener("click", logoutUser);

/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.display = "none";
    }
});

/* =========================================================
   SIMPLE FORM VALIDATION
========================================================= */

document.querySelectorAll("form").forEach(form => {
    form.addEventListener("submit", e => {
        e.preventDefault();
        showToast("Form Submitted Successfully!");
    });
});
