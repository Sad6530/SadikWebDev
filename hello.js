document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const menuItems = document.querySelectorAll("header nav ul li");

    // ১. পেজ লোড হওয়ার সাথে সাথে ন্যাভবার উপর থেকে স্মুথলি নিচে নামবে
    header.style.opacity = "0";
    header.style.transform = "translate(-50%, -40px)";
    header.style.transition = "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)";

    setTimeout(() => {
        header.style.opacity = "1";
        header.style.transform = "translate(-50%, 0)";
    }, 100);

    // ২. মেনু আইটেমগুলো একের পর এক ফেড-ইন হয়ে আসবে (Staggered Animation)
    menuItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(-10px)";
        item.style.transition = `all 0.5s ease ${index * 0.1 + 0.3}s`;

        setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
        }, 100);

        // ৩. কোনো মেনুতে ক্লিক করলে সেটি হাইলাইট (Active) হয়ে থাকবে
        item.addEventListener("click", () => {
            menuItems.forEach(el => el.style.color = ""); // আগের অ্যাক্টিভ কালার রিসেট
            item.style.color = "#38bdf8"; // ক্লিক করা আইটেমে স্কাই ব্লু কালার
        });
    });

    // ৪. পেজ নিচে স্ক্রল করলে ন্যাভবার একটু ছোট এবং গ্লোয়িং হবে
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.style.padding = "8px 28px";
            header.style.background = "rgba(15, 23, 42, 0.95)";
            header.style.boxShadow = "0 10px 30px rgba(56, 189, 248, 0.25)";
        } else {
            header.style.padding = "12px 35px";
            header.style.background = "rgba(15, 23, 42, 0.85)";
            header.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.4)";
        }
    });
});





// ══ MULTI-COLOR PALETTE PICKER ══
const paletteToggle = document.getElementById("paletteToggle");
const paletteDropdown = document.getElementById("paletteDropdown");
const colorButtons = document.querySelectorAll(".palette-color-btn");

const themeColors = {
  blue:    { hex: "#2563eb", glow: "rgba(37, 99, 235, 0.45)" },
  emerald: { hex: "#059669", glow: "rgba(5, 150, 105, 0.45)" },
  purple:  { hex: "#7c3aed", glow: "rgba(124, 58, 237, 0.45)" },
  amber:   { hex: "#ea580c", glow: "rgba(234, 88, 12, 0.45)" },
  rose:    { hex: "#e11d48", glow: "rgba(225, 29, 72, 0.45)" },
  cyan:    { hex: "#0284c7", glow: "rgba(2, 132, 199, 0.45)" }
};

// ড্রপডাউন খোলা ও বন্ধ করা
paletteToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  paletteDropdown.classList.toggle("open");
});

// বাইরে ক্লিক করলে ড্রপডাউন বন্ধ হবে
window.addEventListener("click", (e) => {
  if (!paletteDropdown.contains(e.target) && e.target !== paletteToggle) {
    paletteDropdown.classList.remove("open");
  }
});

// কালার পরিবর্তন করার ফাংশন
function setAccentColor(colorKey) {
  const selected = themeColors[colorKey];
  if (!selected) return;

  document.documentElement.style.setProperty("--accent", selected.hex);
  document.documentElement.style.setProperty("--accent-glow", selected.glow);

  colorButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.color === colorKey);
  });

  localStorage.setItem("sadik-accent", colorKey);
}

colorButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setAccentColor(btn.dataset.color);
  });
});

// ══ DARK / LIGHT MODE TOGGLE ══
const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle.querySelector("i");

function applyThemeMode(isLight) {
  document.body.classList.toggle("light-mode", isLight);
  if (isLight) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  } else {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  }
  localStorage.setItem("sadik-theme", isLight ? "light" : "dark");
}

themeToggle.addEventListener("click", () => {
  const isCurrentlyLight = document.body.classList.contains("light-mode");
  applyThemeMode(!isCurrentlyLight);
});

// ══ SAVED PREFERENCES লোড করা ══
window.addEventListener("DOMContentLoaded", () => {
  const savedAccent = localStorage.getItem("sadik-accent") || "blue";
  const savedTheme = localStorage.getItem("sadik-theme");

  setAccentColor(savedAccent);
  if (savedTheme === "light") {
    applyThemeMode(true);
  }
});

// ══ NAV ACTIVE LINK স্টেট ══
const navItems = document.querySelectorAll("nav ul li");
navItems.forEach((item, index) => {
  if (index === 0) item.classList.add("active"); // ডিফল্টভাবে Home অ্যাক্টিভ থাকবে
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
  });
});








// ১. ইন্ট্রো স্ক্রিন হাইড করা (প্রোগ্রেস বার শেষ হওয়ার পর)
window.addEventListener("load", () => {
  const intro = document.getElementById("intro");
  setTimeout(() => {
    intro.classList.add("hide");
  }, 2400); // ২.৪ সেকেন্ড পর ইন্ট্রো চলে যাবে
});

// ২. স্মুথ কাস্টম কার্সর
const cur = document.getElementById("cur");
const cur2 = document.getElementById("cur2");
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cur.style.left = `${mouseX}px`;
  cur.style.top = `${mouseY}px`;
});

function animateCursor() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  cur2.style.left = `${ringX}px`;
  cur2.style.top = `${ringY}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ৩. ব্যাকগ্রাউন্ড স্টার (Stars Canvas)
const starCanvas = document.getElementById("stars");
const sCtx = starCanvas.getContext("2d");
let stars = [];

function initStars() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
  stars = [];
  for (let i = 0; i < 120; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.02 + 0.005
    });
  }
}

function drawStars() {
  sCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
  stars.forEach((s) => {
    s.alpha += s.speed;
    if (s.alpha > 1 || s.alpha < 0.1) s.speed = -s.speed;
    sCtx.beginPath();
    sCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    sCtx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    sCtx.fill();
  });
  requestAnimationFrame(drawStars);
}

// ৪. মাউস ট্রেল পার্টিকেল (VFX Canvas)
const vfxCanvas = document.getElementById("vfx");
const vCtx = vfxCanvas.getContext("2d");
let particles = [];

function resizeVfx() {
  vfxCanvas.width = window.innerWidth;
  vfxCanvas.height = window.innerHeight;
}

window.addEventListener("mousemove", (e) => {
  for (let i = 0; i < 2; i++) {
    particles.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      size: Math.random() * 2.5 + 1,
      life: 1
    });
  }
});

function drawVfx() {
  vCtx.clearRect(0, 0, vfxCanvas.width, vfxCanvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.life -= 0.025;
    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }
    vCtx.beginPath();
    vCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    vCtx.fillStyle = `rgba(0, 240, 255, ${p.life})`;
    vCtx.fill();
  }
  requestAnimationFrame(drawVfx);
}

// রিসাইজ হ্যান্ডলার ও শুরু করা
window.addEventListener("resize", () => {
  initStars();
  resizeVfx();
});

initStars();
drawStars();
resizeVfx();
drawVfx();


// hero

// ══ TYPING TEXT ANIMATION ══
const typingEl = document.querySelector(".typing-text");
const roles = [
  "Diploma in CST Student",
  "Frontend Web Developer",
  "UI/UX Enthusiast",
  "Tech Explorer"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingEl) return;
  const currentWord = roles[roleIndex];

  if (isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 45 : 95;

  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 1800; // পুরো শব্দ লেখার পর একটু বিরতি
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

document.addEventListener("DOMContentLoaded", typeEffect);

// ══ MOUSE PARALLAX FOR FLOATING CARDS ══
const floatingCards = document.querySelectorAll(".floating-card");

window.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  floatingCards.forEach((card) => {
    const speed = parseFloat(card.getAttribute("data-speed")) || 1;
    card.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
  });
});



// about

document.addEventListener("DOMContentLoaded", () => {
    // ১. Scroll Reveal Animation (স্ক্রল করলে কার্ড ও টেক ব্যাজগুলো স্মুথলি ভেসে উঠবে)
    const revealElements = document.querySelectorAll(
        ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale"
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("revealed");
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ২. Mouse-Tracking Glow Border Effect (কার্ডের ওপর মাউস নিলে গ্লো লাইট নড়বে)
    const glowCards = document.querySelectorAll(".glow-border");

    glowCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--mouse-x", x + "px");
            card.style.setProperty("--mouse-y", y + "px");
        });
    });
});


// contact 

document.addEventListener("DOMContentLoaded", () => {
    // 1. Scroll Reveal Animation Observer
    const revealElements = document.querySelectorAll(
        ".scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target); // একবার অ্যানিমেশন হলে আর রিপিট হবে না
                }
            });
        },
        {
            threshold: 0.15, // এলিমেন্টের ১৫% স্ক্রিনে আসলে অ্যানিমেশন শুরু হবে
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // 2. Contact Form Submit Feedback (Netlify & Local Testing)
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function () {
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
                submitBtn.style.opacity = "0.8";
                submitBtn.style.pointerEvents = "none";
            }
        });
    }
});

const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
