document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('taskModal');
    const addBtn = document.getElementById('openModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const saveBtn = document.getElementById('saveBtn');
    const taskContainer = document.querySelector('.task-container');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // 1. Initialize App Data
    let tasks = JSON.parse(localStorage.getItem('steadyTasks')) || [];
    let currentFilter = 'Today';

    // Update the Header with Real Date/Time
    const updateHeader = () => {
        const now = new Date();
        document.querySelector('.day-name').innerText = now.toLocaleDateString('en-US', { weekday: 'long' });
        document.querySelector('.day-num').innerText = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toUpperCase();
        document.querySelector('.timezone strong').innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };
    updateHeader();
    setInterval(updateHeader, 60000); // Update clock every minute

    // 2. Core Rendering Function
    const renderTasks = () => {
        // Keep your label at the top
        taskContainer.innerHTML = `<p class="task-label">${currentFilter}'s Tasks</p>`;

        const filtered = tasks.filter(task => {
            if (currentFilter === 'All') return true;
            return task.category === currentFilter;
        });

        filtered.forEach((task, index) => {
            const card = document.createElement('div');
            // Using your exact CSS classes
            card.className = `task-card ${task.color} ${task.completed ? 'completed-opacity' : ''}`;
            card.style.cursor = 'pointer';
            card.style.transition = '0.3s';
            if(task.completed) card.style.opacity = '0.4';

            card.innerHTML = `
                <div class="task-info">
                    <strong>${task.name}</strong>
                    <span>Set: ${task.dateSet}</span>
                </div>
                <div class="task-time">${task.time}</div>
            `;

            // Function: Toggle Complete
            card.addEventListener('click', () => {
                task.completed = !task.completed;
                saveAndRender();
            });

            // Function: Delete (Double Click)
            card.addEventListener('dblclick', () => {
                if(confirm("Delete this task?")) {
                    tasks = tasks.filter(t => t.id !== task.id);
                    saveAndRender();
                }
            });

            taskContainer.appendChild(card);
        });
    };

    const saveAndRender = () => {
        localStorage.setItem('steadyTasks', JSON.stringify(tasks));
        renderTasks();
    };

    // 3. Modal Logic
    addBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    cancelBtn.addEventListener('click', () => modal.classList.add('hidden'));

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
                category: currentFilter === 'All' ? 'Today' : currentFilter, // Assign to current view
                dateSet: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                completed: false
            };

            tasks.push(newTask);
            saveAndRender();

            // Reset
            nameInput.value = "";
            modal.classList.add('hidden');
        } else {
            alert("Please enter a name and time");
        }
    });

    // 4. Filter Functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.innerText;
            renderTasks();
        });
    });

    // Initial load
    renderTasks();
});

function formatAMPM(time) {
    let [hours, minutes] = time.split(':');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
}