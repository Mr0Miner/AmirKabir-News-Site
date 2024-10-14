// مثال برای پیاده‌سازی پویا
document.querySelectorAll('.read-more').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        alert('این ویژگی به زودی اضافه خواهد شد!');
    });
});
