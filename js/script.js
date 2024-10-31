let slideCurrentIndex = 0;

function slideCards(direction) {
    const container = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const totalCards = cards.length;
    const visibleCards = 3; // تعداد کارت‌های نمایان

    // محاسبه تعداد کارت‌های نمایان
    slideCurrentIndex += direction;

    // محدود کردن به تعداد کارت‌های موجود
    if (slideCurrentIndex < 0) {
        slideCurrentIndex = 0;
    } else if (slideCurrentIndex > totalCards - visibleCards) {
        slideCurrentIndex = totalCards - visibleCards;
    }

    // محاسبه مقدار translateX
    const translateX = -slideCurrentIndex * (100 / visibleCards);
    container.style.transform = `translateX(${translateX}%)`; // استفاده از درصد برای translate

    // غیرفعال کردن دکمه‌ها در صورت لزوم
    document.querySelector('.left').disabled = slideCurrentIndex === 0;
    document.querySelector('.right').disabled = slideCurrentIndex === totalCards - visibleCards;

    // به‌روزرسانی دکمه‌ها بر اساس تعداد کارت‌های موجود
    document.querySelector('.left').style.display = slideCurrentIndex === 0 ? 'none' : 'block';
    document.querySelector('.right').style.display = slideCurrentIndex === totalCards - visibleCards ? 'none' : 'block';
}

// بارگذاری اولیه کارت‌ها
document.addEventListener('DOMContentLoaded', () => {
    slideCards(0); // بارگذاری اولیه
});

let lightboxCurrentIndex = 0;
const images = ["img/img-of-school-1.jpg", "img/img-of-school-2.jpg", "img/img-of-school-3.jpg", "img/staff-of-school.png"];

function openLightbox(index) {
    lightboxCurrentIndex = index;
    document.getElementById("lightbox").style.display = "flex";
    updateLightboxImage();
}

function closeLightbox(event) {
    if (event.target === document.getElementById("lightbox")) {
        document.getElementById("lightbox").style.display = "none";
    }
}

function changeImage(direction, event) {
    event.stopPropagation(); // جلوگیری از بسته شدن لایت‌باکس هنگام کلیک روی دکمه‌ها
    lightboxCurrentIndex = (lightboxCurrentIndex + direction + images.length) % images.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById("lightboxImage");
    lightboxImage.classList.remove("active"); // حذف کلاس برای شروع دوباره انیمیشن
    setTimeout(() => {
        lightboxImage.src = images[lightboxCurrentIndex];
        lightboxImage.classList.add("active"); // اضافه کردن کلاس برای انیمیشن محو شدن
        lightboxImage.style.maxWidth = "80%"; // اطمینان از حداکثر عرض تصویر
        lightboxImage.style.maxHeight = "80%"; // اطمینان از حداکثر ارتفاع تصویر
    }, 50); // کمی تاخیر برای روان بودن
}
