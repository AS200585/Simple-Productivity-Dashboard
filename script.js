document.addEventListener('DOMContentLoaded', () => {
  // Restore theme
  const theme = localStorage.getItem('theme');
  document.documentElement.classList.toggle('dark', theme !== 'light');

  // Theme toggle logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // Live Clock (top‑right corner)
  const clockEl = document.getElementById('live-clock');
  if (clockEl) {
    const updateClock = () => {
      clockEl.textContent = new Date().toLocaleTimeString();
    };
    updateClock();
    setInterval(updateClock, 1000);  // runs every second 
  }

  if (document.getElementById('todo-list')) {
    // To‑Do List logic
    const todoInput    = document.getElementById('todo-input');
    const todoAddBtn   = document.getElementById('todo-add-btn');
    const todoClearBtn = document.getElementById('todo-clear-btn');
    const todoList     = document.getElementById('todo-list');
    const todoEmpty    = document.getElementById('todo-empty');

    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');  // use localStorage 

    const renderTasks = () => {
      todoList.innerHTML = '';
      if (tasks.length === 0) {
        todoEmpty.classList.remove('hidden');
      } else {
        todoEmpty.classList.add('hidden');
        tasks.forEach((task, i) => {
          const li = document.createElement('li');
          li.className = 'flex justify-between items-center bg-gray-700 p-2 rounded-lg';
          li.innerHTML = `
            <span>${task}</span>
            <button class="text-red-500 hover:text-red-700"> X</button>
            `;
          li.querySelector('button').addEventListener('click', () => {
            tasks.splice(i, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
          });
          todoList.appendChild(li);
        });
      }
    };
    renderTasks();  // initial render
    todoAddBtn.addEventListener('click', () => {
      const text = todoInput.value.trim();
      if (!text) return;
      tasks.push(text);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      todoInput.value = '';
      renderTasks();
    });

    todoClearBtn.addEventListener('click', () => {
      tasks = [];
      localStorage.removeItem('tasks');
      renderTasks();
    });

    // Array of quotes (text + author) :contentReference[oaicite:5]{index=5}
    const quotes = [
      { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
      { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
      { text: "Two things are infinite: the universe and human stupidity...", author: "Albert Einstein" },
      { text: "Impossible is a word to be found only in the dictionary of fools.", author: "Napoleon Bonaparte" },
      { text: "I will either find a way or make one.", author: "Hannibal Barca" },
      { text: "A person should not be too honest. Straight trees are cut first and honest people are screwed first.", author: "Chanakya" },
      { text: "Freedom is a boon, which everyone has the right to receive.", author: "Chhatrapati Shivaji Maharaj" },
      { text: "Victory belongs to the most persevering.", author: "Napoleon Bonaparte" },
      { text: "Many things which nature makes difficult become easy to the man who uses his brains.", author: "Hannibal Barca" },
      { text: "Education is the best friend. An educated person is respected everywhere.", author: "Chanakya" },
      { text: "Of all the rights of women, the greatest is to be a mother.", author: "Napoleon Bonaparte" },
      { text: "Do not think of the enemy as weak, then do not be too scared to defeat him.", author: "Chhatrapati Shivaji Maharaj" },
      { text: "As soon as the fear approaches near, attack and destroy it.", author: "Chanakya" },
    ];

    // References to DOM elements :contentReference[oaicite:6]{index=6}
    const quoteEl      = document.getElementById('quote-text');
    const authorEl     = document.getElementById('quote-author');
    const newQuoteBtn  = document.getElementById('new-quote-btn');

    // Function to pick and display a random quote 
    function displayRandomQuote() {
      // a) Generate random index
      const idx = Math.floor(Math.random() * quotes.length); 
      // b) Destructure quote & author
      const { text, author } = quotes[idx];
      // c) Update blockquote & footer
      quoteEl.textContent  = text;
      authorEl.textContent = `— ${author}`;
    }
    displayRandomQuote();
    // New‑Quote button click handler :contentReference
    newQuoteBtn.addEventListener('click', displayRandomQuote);
  }

  if (document.getElementById('notes-area')) {
    // Notes logic
    const notesArea     = document.getElementById('notes-area');
    const notesClearBtn = document.getElementById('notes-clear-btn');

    if (notesArea) {
      notesArea.value = localStorage.getItem('dailyNotes') || '';
      notesArea.addEventListener('input', () => {
        localStorage.setItem('dailyNotes', notesArea.value);
      });
      notesClearBtn.addEventListener('click', () => {
        localStorage.removeItem('dailyNotes');
        notesArea.value = '';
      });
    }
  }

  if (document.getElementById('timer-display')) {
    // Pomodoro logic
    const timerDisplay = document.getElementById('timer-display');
    const cycleCountEl = document.getElementById('cycle-count');
    const startBtn     = document.getElementById('pom-start-btn');
    const pauseBtn     = document.getElementById('pom-pause-btn');
    const resetBtn     = document.getElementById('pom-reset-btn');

    if (timerDisplay && cycleCountEl && startBtn && pauseBtn && resetBtn) {
      const WORK_SEC  = 25 * 60;
      const BREAK_SEC = 5  * 60;
      let timeLeft    = WORK_SEC;
      let isWork      = true;
      let intervalId  = null;
      let cycles      = parseInt(localStorage.getItem('pomodoroCycles') || '0', 10);

      cycleCountEl.textContent = cycles;
      const updateDisplay = () => {
        const m = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        const s = String(timeLeft % 60).padStart(2, '0');
        timerDisplay.textContent = `${m}:${s}`;
      };

      const startTimer = () => {
        if (intervalId) return;
        intervalId = setInterval(() => {
          timeLeft--;
          if (timeLeft < 0) {
            clearInterval(intervalId);
            intervalId = null;
            if (isWork) {
              cycles++;
              localStorage.setItem('pomodoroCycles', cycles);
              cycleCountEl.textContent = cycles;
              timeLeft = BREAK_SEC;
            } else {
              timeLeft = WORK_SEC;
            }
            isWork = !isWork;
            startTimer();  // auto-start next session
          }
          updateDisplay();
        }, 1000);
      };

      const pauseTimer = () => {
        clearInterval(intervalId);
        intervalId = null;
      };

      const resetTimer = () => {
        pauseTimer();
        isWork   = true;
        timeLeft = WORK_SEC;
        updateDisplay();
      };

      updateDisplay();  // show initial 25:00
      startBtn.addEventListener('click', startTimer);
      pauseBtn.addEventListener('click', pauseTimer);
      resetBtn.addEventListener('click', resetTimer);
    }
  }
});