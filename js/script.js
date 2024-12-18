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

fetch('assets/json/quotes.json')
    .then(response => response.json())
    .then(quotes => {
        // انتخاب یک جمله تصادفی
        const randomIndex = Math.floor(Math.random() * quotes.length);
        document.getElementById('quote').textContent = quotes[randomIndex];
    })
    .catch(error => {
        console.error('خطا در بارگذاری جملات:', error);
        document.getElementById('quote').textContent = 'خطا در بارگذاری جملات!';
    });

// اضافه کردن رویداد کلیک به دکمه‌ها
document.querySelector('.left').addEventListener('click', () => slideCards(-1));
document.querySelector('.right').addEventListener('click', () => slideCards(1));