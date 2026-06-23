// ===== زر الرجوع لأعلى الصفحة =====
const topBtn = document.createElement("button");
topBtn.innerHTML = "↑";
topBtn.classList.add("top-btn");
document.body.appendChild(topBtn);

// إظهار الزر عند النزول
window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

// الرجوع لأعلى
topBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// ===== Animation عند ظهور العناصر =====
const elements = document.querySelectorAll(".service-card, .why-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

elements.forEach(el => observer.observe(el));

// ===== Mobile Menu Toggle =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// ============================================
// ===== 🛠️ حل مشكلة الأزرار المكررة 🛠️ =====
// ============================================

// الحل 1: إخفاء الزر المكرر عند تحميل الصفحة
function fixDuplicateButtons() {
    // جيب كل الأزرار في الـ header
    const headerBtns = document.querySelectorAll('header .btn-primary');
    
    // لو فيه أكتر من زر
    if (headerBtns.length > 1) {
        // خلي أول زر بس (اللي جنب القائمة)
        // واشيل أي زر تاني (اللي جوه القائمة)
        headerBtns.forEach(function(btn, index) {
            if (index > 0) {
                btn.style.display = 'none';
            }
        });
    }
    
    // كمان تأكد إن زر الموبايل مختفي في الديسكتوب
    const mobileBtns = document.querySelectorAll('.mobile-btn');
    mobileBtns.forEach(function(btn) {
        if (window.innerWidth > 768) {
            btn.style.display = 'none';
        } else {
            btn.style.display = 'block';
        }
    });
}

// شغلها عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', fixDuplicateButtons);

// شغلها كمان لما يتغير حجم الشاشة
window.addEventListener('resize', fixDuplicateButtons);

// ============================================
// ===== الحل 2: طريقة أقوى (لو الأول مشتغلش) =====
// ============================================

// استنى 1 ثانية وطبق تاني عشان نتأكد
setTimeout(function() {
    // جيب كل الأزرار في الـ header
    const allHeaderBtns = document.querySelectorAll('header .btn-primary');
    
    // لو فيه أكتر من 1
    if (allHeaderBtns.length > 1) {
        // اشيل الأزرار الزيادة
        for (let i = 1; i < allHeaderBtns.length; i++) {
            allHeaderBtns[i].remove();
        }
    }
    
    // كمان لو في زر جوه القائمة في الديسكتوب
    if (window.innerWidth > 768) {
        const mobileBtnsInNav = document.querySelectorAll('.nav-links .btn-primary');
        mobileBtnsInNav.forEach(function(btn) {
            btn.style.display = 'none';
        });
    }
}, 1000);

// ============================================
// ===== الحل 3: التحكم الكامل (أضمن حل) =====
// ============================================

// ضيف ستايل جديد يخفي الأزرار المكررة نهائياً
const style = document.createElement('style');
style.textContent = `
    /* إخفاء أي زر مكرر في الهيدر */
    header .btn-primary:not(:first-of-type) {
        display: none !important;
    }
    
    /* في الموبايل اظهر الزر اللي جوه القائمة */
    @media (max-width: 768px) {
        header .nav-links .btn-primary {
            display: block !important;
        }
        
        header > a.btn-primary {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);