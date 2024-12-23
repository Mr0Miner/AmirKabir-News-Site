// تعریف متغیر برای نگهداری ایندکس تصویر فعلی در لایت‌باکس
let lightboxCurrentIndex = 0;

// آرایه‌ای از مسیرهای تصاویر
const images = [
    "image/about-us/img-of-school-1.jpg",
    "image/about-us/img-of-school-2.jpg",
    "image/about-us/img-of-school-3.jpg",
    "image/about-us/staff-of-school.png"
];

// تابع برای باز کردن لایت‌باکس و نمایش تصویر مشخص شده
function openLightbox(index) {
    lightboxCurrentIndex = index; // تنظیم ایندکس تصویر فعلی
    document.getElementById("lightbox").style.display = "flex"; // نمایش لایت‌باکس
    updateLightboxImage(); // به‌روزرسانی تصویر لایت‌باکس
}

// تابع برای بستن لایت‌باکس
function closeLightbox(event) {
    if (event.target === document.getElementById("lightbox")) {
        document.getElementById("lightbox").style.display = "none"; // پنهان کردن لایت‌باکس
    }
}

// تابع برای تغییر تصویر در لایت‌باکس با توجه به جهت
function changeImage(direction, event) {
    event.stopPropagation(); // جلوگیری از بسته شدن لایت‌باکس هنگام کلیک روی دکمه‌ها
    lightboxCurrentIndex = (lightboxCurrentIndex + direction + images.length) % images.length; // محاسبه ایندکس جدید
    updateLightboxImage(); // به‌روزرسانی تصویر لایت‌باکس
}

// تابع برای به‌روزرسانی تصویر در لایت‌باکس
function updateLightboxImage() {
    const lightboxImage = document.getElementById("lightboxImage");
    lightboxImage.classList.remove("active"); // حذف کلاس برای شروع دوباره انیمیشن
    setTimeout(() => {
        lightboxImage.src = images[lightboxCurrentIndex]; // تنظیم منبع تصویر
        lightboxImage.classList.add("active"); // اضافه کردن کلاس برای انیمیشن محو شدن
        lightboxImage.style.maxWidth = "80%"; // اطمینان از حداکثر عرض تصویر
        lightboxImage.style.maxHeight = "80%"; // اطمینان از حداکثر ارتفاع تصویر
    }, 50); // کمی تاخیر برای روان بودن
}

// بارگذاری احادیث از یک فایل JSON و نمایش یک حدیث تصادفی
function fetchQuotes() {
    fetch('https://raw.githubusercontent.com/Mr0Miner/AmirKabir-files/refs/heads/master/json/quotes.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(quotes => {
            const randomIndex = Math.floor(Math.random() * quotes.length); // انتخاب یک حدیث تصادفی
            document.getElementById('quote').textContent = quotes[randomIndex]; // نمایش حدیث
        })
        .catch(error => {
            console.error('خطا در بارگذاری احادیث:', error); // نمایش خطا در کنسول
            document.getElementById('quote').textContent = 'خطا در بارگذاری احادیث!'; // نمایش پیام خطا
            setTimeout(fetchQuotes, 5000); // تلاش مجدد بعد از 5 ثانیه
        });
}

fetchQuotes(); // فراخوانی تابع برای بارگذاری احادیث

// اضافه کردن رویداد کلیک به دکمه‌ها برای تغییر تصاویر
document.querySelector('.left').addEventListener('click', () => changeImage(-1)); // دکمه چپ
document.querySelector('.right').addEventListener('click', () => changeImage(1)); // دکمه راست