let currentIndex = 0;

function slideCards(direction) {
    const container = document.querySelector('.card-container');
    const cards = document.querySelectorAll('.card');
    const totalCards = cards.length;
    const visibleCards = 3; // تعداد کارت‌های نمایان

    // محاسبه تعداد کارت‌های نمایان
    currentIndex += direction;

    // محدود کردن به تعداد کارت‌های موجود
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > totalCards - visibleCards) {
        currentIndex = totalCards - visibleCards;
    }

    // محاسبه مقدار translateX
    const translateX = -currentIndex * (100 / visibleCards);
    container.style.transform = `translateX(${translateX}%)`; // استفاده از درصد برای translate

    // غیرفعال کردن دکمه‌ها در صورت لزوم
    document.querySelector('.left').disabled = currentIndex === 0;
    document.querySelector('.right').disabled = currentIndex === totalCards - visibleCards;

    // به‌روزرسانی دکمه‌ها بر اساس تعداد کارت‌های موجود
    document.querySelector('.left').style.display = currentIndex === 0 ? 'none' : 'block';
    document.querySelector('.right').style.display = currentIndex === totalCards - visibleCards ? 'none' : 'block';
}

// بارگذاری اولیه کارت‌ها
document.addEventListener('DOMContentLoaded', () => {
    slideCards(0); // بارگذاری اولیه
});


function checkLink(linkId, fallbackUrl) {
    const linkElement = document.getElementById(linkId);
    const originalUrl = linkElement.href;

    fetch(originalUrl, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                // اگر خطایی رخ داد لینک به fallbackUrl تغییر کند
                linkElement.href = fallbackUrl + originalUrl;
            }
        })
        .catch(error => {
            // در صورت هر خطای دیگری هم لینک را تغییر بده
            linkElement.href = fallbackUrl + originalUrl;
        });
}

// بررسی لینک‌ها
checkLink('home-link', '/hot/');
checkLink('about-link', '/hot/');