document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    
    // Save the name so the home page can say "Hello Name"
    localStorage.setItem('userName', name);
    
    alert("Account created! Redirecting to login...");
    window.location.href = "login.html";
});