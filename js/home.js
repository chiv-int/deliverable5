document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    const currentPage = window.location.pathname.split("/").pop();

    navItems.forEach(item => {
        const linkTarget = item.getAttribute('href');

        if (currentPage === linkTarget) {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        }

        item.addEventListener('click', () => {
            if (window.navigator.vibrate) window.navigator.vibrate(5);
        });
    });
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.addEventListener('click', () => {
            days.forEach(d => d.classList.remove('active'));
            day.classList.add('active');
        });
    });
});