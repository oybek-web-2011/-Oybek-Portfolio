const menuBtn = document.querySelector(".menu-btn");
const navbar = document.querySelector(".navbar");

alert("Eslatma:Shunga o'xshash sayt kerak bo'lsa yozishingiz mumkin")

menuBtn.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("show");
    menuBtn.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", () => {
        navbar.classList.remove("show");
        menuBtn.setAttribute("aria-expanded", "false");
    });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) current = section.getAttribute("id");
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// ================= EMAILJS CONTACT FORM =================
emailjs.init("4-kMwM0rvV-xejA4U");

const contactForm = document.querySelector(".contact-form");
const submitBtn = contactForm.querySelector("button[type='submit']");
const submitBtnDefaultHTML = submitBtn.innerHTML;

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    submitBtn.innerHTML = "Yuborilmoqda...";
    submitBtn.disabled = true;

    emailjs.sendForm("service_zw2odx8", "template_az4xmc8", this)
        .then(() => {
            alert("Xabaringiz muvaffaqiyatli yuborildi!");
            contactForm.reset();
        })
        .catch((error) => {
            console.error("EmailJS xatosi:", error);
            alert("Xabar yuborishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
        })
        .finally(() => {
            submitBtn.innerHTML = submitBtnDefaultHTML;
            submitBtn.disabled = false;
        });
});

// Scroll-reveal animation (respects reduced-motion preference)
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
} else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in-view"));
}

// ================= LANGUAGE TOGGLE (UZ / ENG) =================
const translations = {
    "Home": "Bosh sahifa",
    "About": "Men haqimda",
    "Skills": "Ko‘nikmalar",
    "Projects": "Loyihalar",
    "Contact": "Aloqa",
    "Hire Me": "Menga buyurtma bering",

    "HELLO, I'M": "SALOM, MEN",
    "FRONTEND": "FRONTEND",
    "DEVELOPER": "DASTURCHI",

    "I build modern, fast and responsive websites with clean code and creative design.":
    "Men zamonaviy, tezkor va responsive websaytlarni toza kod va kreativ dizayn bilan yarataman.",

    "View My Work": "Ishlarimni ko‘rish",
    "Download CV": "CV yuklab olish",

    "Clean Code": "Toza kod",
    "Pixel Perfect": "Mukammal dizayn",
    "Fully Responsive": "To‘liq responsive",

    "Projects Completed": "Tugallangan loyihalar",
    "Happy Clients": "Mamnun mijozlar",
    "Years Experience": "Yillik tajriba",
    "Client Satisfaction": "Mijozlar mamnunligi",

    "ABOUT ME": "MEN HAQIMDA",
    "Who Am I?": "Men kimman?",

    "I'm a passionate frontend developer who loves building modern, fast and responsive websites. I focus on writing clean code and creating great user experiences.":
    "Men zamonaviy, tezkor va responsive websaytlar yaratishni yaxshi ko‘radigan frontend dasturchiman. Toza kod va foydalanuvchi uchun qulay tajriba yaratishga e’tibor beraman.",
    "Name:": "Ism:",
    "Email:": "Email:",
    "From:": "Manzil:",
    "Freelance:": "Freelance:",
    "Available": "Mavjud",
    "More About Me": "Men haqimda batafsil",

    "MY SKILLS": "MENING KO‘NIKMALARIM",
    "My Expertise": "Mening tajribam",

    "MY PROJECTS": "MENING LOYIHALARIM",
    "Recent Projects": "So‘nggi loyihalar",
    "View All Projects": "Barcha loyihalarni ko‘rish",

    "Portfolio Website": "Portfolio websayt",
    "E-Commerce Website": "E-Commerce websayt",
    "Task Management App": "Vazifalarni boshqarish ilovasi",
    "Weather App": "Ob-havo ilovasi",

    "CONTACT ME": "MEN BILAN BOG‘LANING",
    "Get In Touch": "Bog‘lanish",

    "Your Name": "Ismingiz",
    "Your Email": "Emailingiz",
    "Your Message": "Xabaringiz",
    "Send Message": "Xabar yuborish",

    "All rights reserved.": "Barcha huquqlar himoyalangan."
};

let isEnglish = true;

function translatePage() {
    document.querySelectorAll("*").forEach(element => {

        // Faqat to'g'ridan-to'g'ri text node'larni tekshiramiz
        element.childNodes.forEach(node => {

            if (node.nodeType === Node.TEXT_NODE) {

                const original = node.textContent.trim();

                if (!original) return;

                if (isEnglish && translations[original]) {
                    node.textContent =
                        node.textContent.replace(
                            original,
                            translations[original]
                        );
                }

                else if (!isEnglish) {
                    const uzbek = Object.keys(translations).find(
                        key => translations[key] === original
                    );

                    if (uzbek) {
                        node.textContent =
                            node.textContent.replace(
                                original,
                                uzbek
                            );
                    }
                }
            }
        });
    });

    // Input placeholder
    document.querySelectorAll("input, textarea").forEach(input => {

        const placeholder = input.getAttribute("placeholder");

        if (!placeholder) return;

        if (isEnglish && translations[placeholder]) {
            input.setAttribute(
                "placeholder",
                translations[placeholder]
            );
        } else if (!isEnglish) {
            const uzbek = Object.keys(translations).find(
                key => translations[key] === placeholder
            );

            if (uzbek) {
                input.setAttribute("placeholder", uzbek);
            }
        }
    });

    // FIX: holat (isEnglish) avval yangilanadi, keyin HTML lang
    // va tugma matni SHU yangi holatga qarab yoziladi.
    isEnglish = !isEnglish;

    document.documentElement.lang = isEnglish ? "en" : "uz";

    document.getElementById("languageBtn").textContent =
        isEnglish ? "UZ" : "ENG";
}

document.getElementById("languageBtn")
    .addEventListener("click", translatePage);
