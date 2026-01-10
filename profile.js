document.addEventListener('DOMContentLoaded', () => {
    // 1. Update Stats from LocalStorage
    const updateStats = () => {
        const tasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        const pendingCount = document.getElementById('pendingCount');
        if (pendingCount) {
            pendingCount.innerText = tasks.length;
        }
    };

    updateStats();

    // 2. Setup Chart
    const ctx = document.getElementById('statsChart').getContext('2d');
    
    // Create a gradient for the line chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(168, 87, 67, 0.4)');
    gradient.addColorStop(1, 'rgba(168, 87, 67, 0)');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Study Minutes',
                data: [300, 450, 320, 780, 520, 600],
                borderColor: '#A85743',
                backgroundColor: gradient,
                fill: true,
                borderWidth: 4,
                tension: 0.4,
                pointRadius: 0, // Hides points for a cleaner look
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false, beginAtZero: true },
                x: { 
                    grid: { display: false },
                    ticks: { color: '#999', font: { size: 10 } }
                }
            }
        }
    });
});