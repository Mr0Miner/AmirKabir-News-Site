document.addEventListener('DOMContentLoaded', function() {
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

    // افزودن کتابخانه‌ها به صورت داینامیک
    function loadLibrary(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    // افزودن کتابخانه Persian Date
    loadLibrary("https://cdn.jsdelivr.net/npm/moment@2.29.4/moment.min.js", () => {
        loadLibrary("https://cdn.jsdelivr.net/npm/moment-jalaali@0.9.2/build/moment-jalaali.js", () => {
            // تنظیم تاریخ پس از بارگذاری کتابخانه‌ها
            moment.loadPersian({usePersianDigits: true});
            const date = moment().format("dddd jD jMMMM jYYYY");
            document.getElementById("date").textContent = date;
        });
    });

    // بارگذاری Moment.js و Moment Timezone
    loadLibrary("https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js", () => {
        loadLibrary("https://cdnjs.cloudflare.com/ajax/libs/moment-timezone/0.5.43/moment-timezone-with-data.min.js", () => {
            // به‌روزرسانی ساعت به وقت تهران
            function updateTime() {
                const tehranTime = moment.tz("Asia/Tehran").format("HH:mm");
                document.getElementById("time").textContent = `${tehranTime}`;
            }

            // به‌روزرسانی هر ثانیه
            updateTime();
            setInterval(updateTime, 1000);
        });
    });

    // تابع جستجو و ارسال به صفحه all-news.html
    function searchAndRedirect() {
        const searchInput = document.querySelector('.masthead-search .search');
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `all-news.html?search=${encodeURIComponent(query)}`;
        }
    }

    // افزودن رویداد به دکمه جستجو
    const searchButton = document.querySelector('.masthead-search button');
    if (searchButton) {
        searchButton.addEventListener('click', searchAndRedirect);
    }
});
