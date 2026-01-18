document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    
    
    localStorage.setItem('userName', name);
    
    alert("Account created! Redirecting to login...");
    window.location.href = "login.html";
});