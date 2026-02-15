/* =========================================================
   GLOBAL VARIABLES
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.querySelector("header");
    const mobileToggle = document.querySelector(".mobile-toggle");
    const navMenu = document.querySelector("nav ul");
    const counters = document.querySelectorAll(".counter");
    const scrollElements = document.querySelectorAll(".reveal");
    const backToTop = document.querySelector(".back-to-top");
    const themeToggle = document.querySelector(".theme-toggle");
    const faqItems = document.querySelectorAll(".faq-item");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const courseCards = document.querySelectorAll(".course-card");
    const testimonialSlides = document.querySelectorAll(".testimonial-card");
    const contactForm = document.querySelector("#contactForm");

    let testimonialIndex = 0;

/* =========================================================
   STICKY NAVBAR SHADOW
========================================================= */

    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 15px rgba(0,0,0,0.08)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

/* =========================================================
   MOBILE MENU TOGGLE
========================================================= */

    if (mobileToggle) {
        mobileToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
        });
    }

/* =========================================================
   SMOOTH SCROLL
========================================================= */

    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

/* =========================================================
   HERO TEXT TYPING EFFECT
========================================================= */

    const typingElement = document.querySelector(".typing-text");
    const words = ["Crack Exams", "Get Placed", "Build Career", "Achieve Success"];
    let wordIndex = 0;
    let charIndex = 0;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newWordDelay = 1500;

    function type() {
        if (typingElement && charIndex < words[wordIndex].length) {
            typingElement.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newWordDelay);
        }
    }

    function erase() {
        if (typingElement && charIndex > 0) {
            typingElement.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            wordIndex++;
            if (wordIndex >= words.length) wordIndex = 0;
            setTimeout(type, typingDelay);
        }
    }

    if (typingElement) {
        type();
    }

/* =========================================================
   COUNTER ANIMATION
========================================================= */

    function animateCounters() {
        counters.forEach(counter => {
            counter.innerText = "0";
            const updateCounter = () => {
                const target = +counter.getAttribute("data-target");
                const current = +counter.innerText;
                const increment = target / 200;

                if (current < target) {
                    counter.innerText = `${Math.ceil(current + increment)}`;
                    setTimeout(updateCounter, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }

    let counterStarted = false;
    window.addEventListener("scroll", function () {
        const statsSection = document.querySelector(".stats");
        if (statsSection) {
            const sectionTop = statsSection.offsetTop;
            if (window.scrollY > sectionTop - window.innerHeight && !counterStarted) {
                animateCounters();
                counterStarted = true;
            }
        }
    });

/* =========================================================
   TESTIMONIAL SLIDER
========================================================= */

    function showTestimonial(index) {
        testimonialSlides.forEach(slide => slide.style.display = "none");
        testimonialSlides[index].style.display = "block";
    }

    function nextTestimonial() {
        testimonialIndex++;
        if (testimonialIndex >= testimonialSlides.length) {
            testimonialIndex = 0;
        }
        showTestimonial(testimonialIndex);
    }

    if (testimonialSlides.length > 0) {
        showTestimonial(testimonialIndex);
        setInterval(nextTestimonial, 4000);
    }

/* =========================================================
   COURSE FILTER
========================================================= */

    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            const category = this.getAttribute("data-filter");

            courseCards.forEach(card => {
                if (category === "all" || card.classList.contains(category)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

/* =========================================================
   FORM VALIDATION
========================================================= */

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.querySelector("#name").value.trim();
            const email = document.querySelector("#email").value.trim();
            const message = document.querySelector("#message").value.trim();

            if (name === "" || email === "" || message === "") {
                showNotification("Please fill all fields", "error");
                return;
            }

            if (!validateEmail(email)) {
                showNotification("Enter valid email address", "error");
                return;
            }

            showNotification("Form submitted successfully!", "success");
            contactForm.reset();
        });
    }

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

/* =========================================================
   SCROLL REVEAL
========================================================= */

    function revealOnScroll() {
        scrollElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 100) {
                el.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);

/* =========================================================
   FAQ ACCORDION
========================================================= */

    faqItems.forEach(item => {
        item.addEventListener("click", function () {
            this.classList.toggle("active");
            const content = this.querySelector(".faq-content");
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

/* =========================================================
   BACK TO TOP
========================================================= */

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

/* =========================================================
   LIGHT/DARK TOGGLE
========================================================= */

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");
        });
    }

/* =========================================================
   NOTIFICATION SYSTEM
========================================================= */

    function showNotification(message, type) {
        const notification = document.createElement("div");
        notification.classList.add("notification");
        notification.classList.add(type);
        notification.innerText = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add("show");
        }, 100);

        setTimeout(() => {
            notification.classList.remove("show");
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

/* =========================================================
   EXTRA UI ENHANCEMENTS
========================================================= */

    window.addEventListener("scroll", function () {
        const hero = document.querySelector(".hero");
        if (hero) {
            hero.style.backgroundPositionY = window.scrollY * 0.3 + "px";
        }
    });

});
