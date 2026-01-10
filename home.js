document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    
    // Get the current filename (e.g., "Schedule.html")
    const currentPage = window.location.pathname.split("/").pop();

    navItems.forEach(item => {
        // Get the href of the link
        const linkTarget = item.getAttribute('href');

        // If the link matches the current page, make it active
        if (currentPage === linkTarget) {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        }

        // Add a click effect, but don't prevent the navigation
        item.addEventListener('click', () => {
            if (window.navigator.vibrate) window.navigator.vibrate(5);
        });
    });

    // --- Rest of your Day Selection Logic ---
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.addEventListener('click', () => {
            days.forEach(d => d.classList.remove('active'));
            day.classList.add('active');
        });
    });
});