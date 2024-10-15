document.addEventListener("DOMContentLoaded", function () {
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 3, // تعداد آیتم‌هایی که همزمان نمایش داده می‌شود
        spaceBetween: 30, // فاصله بین آیتم‌ها
        loop: true, // تکرار شدن خودکار
        autoplay: {
            delay: 3000, // تاخیر در حرکت خودکار (3 ثانیه)
            disableOnInteraction: false, // متوقف نشدن با کلیک کاربر
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
