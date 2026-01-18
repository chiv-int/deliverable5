document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const btn = e.target.querySelector('button');
    btn.innerText = "Signing in...";
    
    setTimeout(() => {
        window.location.href = "home.html";
    }, 1000);
});