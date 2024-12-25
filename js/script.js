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