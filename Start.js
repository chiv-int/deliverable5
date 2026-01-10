

document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('mainButton');

    startBtn.addEventListener('click', () => {
        startBtn.textContent = "Loading...";
        startBtn.style.opacity = "0.5";

        setTimeout(() => {
            alert("Welcome! Redirecting you to the dashboard...");
            window.location.href = "login.html";

            startBtn.textContent = "Get Started";
            startBtn.style.opacity = "1";
        }, 1500);
    });
});