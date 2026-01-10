document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('taskModal');
    const openBtn = document.getElementById('openModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const tasksList = document.getElementById('tasksList');
    const monthBtns = document.querySelectorAll('.month-filters .filter-btn');
    const days = document.querySelectorAll('.calendar-grid span:not(.day-label):not(.empty)');

    let selectedDate = "11"; 
    let selectedMonth = "Nov";
    // Using a specific key for calendar tasks to keep them separate from the daily schedule
    let allCalendarTasks = JSON.parse(localStorage.getItem('calendarTasks')) || [];

    // Core Rendering Function (Matches your Schedule style)
// Replace your existing renderTasks function with this one
const renderTasks = () => {
    // Matches the label style from your schedule page
    tasksList.innerHTML = `<p class="task-label">${selectedMonth} ${selectedDate} Tasks</p>`;

    const filtered = allCalendarTasks.filter(t => t.day === selectedDate && t.month === selectedMonth);

    if (filtered.length === 0) {
        const emptyMsg = document.createElement('p');
        emptyMsg.style.cssText = "text-align:center; opacity:0.5; margin-top:20px; font-size:14px;";
        emptyMsg.innerText = "No tasks for this date.";
        tasksList.appendChild(emptyMsg);
        return;
    }

    filtered.forEach(task => {
        const card = document.createElement('div');
        // Applying the EXACT class logic from your schedule page
        card.className = `task-card ${task.color}`;
        
        if(task.completed) card.style.opacity = '0.4';

        // HTML structure matches your schedule page perfectly
        card.innerHTML = `
            <div class="task-info">
                <strong>${task.name}</strong>
                <span>Set: ${task.dateSet}</span>
            </div>
            <div class="task-time">${task.time}</div>
        `;

        // Click to complete
        card.addEventListener('click', () => {
            task.completed = !task.completed;
            saveAndRender();
        });

        // Double click to delete
        card.addEventListener('dblclick', () => {
            if(confirm("Delete this task?")) {
                allCalendarTasks = allCalendarTasks.filter(t => t.id !== task.id);
                saveAndRender();
            }
        });

        tasksList.appendChild(card);
    });
};

    const saveAndRender = () => {
        localStorage.setItem('calendarTasks', JSON.stringify(allCalendarTasks));
        renderTasks();
    };

    // Modal Controls
    openBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

    // Save Logic (Matches Schedule format)
    saveBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('taskName');
        const timeInput = document.getElementById('taskTime');
        const colorInput = document.getElementById('taskColor');

        if (nameInput.value && timeInput.value) {
            const newTask = {
                id: Date.now(),
                name: nameInput.value,
                time: formatAMPM(timeInput.value),
                color: colorInput.value,
                day: selectedDate,
                month: selectedMonth,
                dateSet: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                completed: false
            };

            allCalendarTasks.push(newTask);
            saveAndRender();
            
            nameInput.value = '';
            modal.classList.add('hidden');
        } else {
            alert("Please enter a name and time");
        }
    });

    // Calendar Date Selection
    days.forEach(day => {
        day.addEventListener('click', () => {
            days.forEach(d => d.classList.remove('today'));
            day.classList.add('today');
            selectedDate = day.innerText;
            renderTasks();
        });
    });

    // Month Filtering
    monthBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            monthBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedMonth = btn.innerText;
            const titleMap = { 'Nov': 'NOVEMBER', 'Dec': 'DECEMBER', 'Jan': 'JANUARY' };
            document.querySelector('.month-title').innerText = titleMap[selectedMonth] || selectedMonth.toUpperCase();
            renderTasks();
        });
    });

    function formatAMPM(time) {
        let [h, m] = time.split(':');
        let ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        return `${h}:${m} ${ampm}`;
    }

    renderTasks();
});