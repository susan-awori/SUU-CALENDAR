// Variables
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const monthYearDisplay = document.getElementById("current-month-year");
const calendarGrid = document.getElementById("calendar-grid");
const prevButton = document.getElementById("prev-month");
const nextButton = document.getElementById("next-month");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function renderCalendar(month, year) {
  // 1. Clear previous days
  calendarGrid.innerHTML = "";

  // 2. Month year
  monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

  // 3. Calculate key dates for the current month
  const firstDayOfMonth = new Date(year, month, 1);
  const firstDayWeekday = firstDayOfMonth.getDay();
  // Get the total number of days in the current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 4. Get today's date for marking the 'today' class
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === month && today.getFullYear() === year;

  // 5. Add 'empty' day cells for the preceding month
  for (let i = 0; i < firstDayWeekday; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("day", "empty-day");
    calendarGrid.appendChild(emptyDay);
  }

  // 6. Add actual day cells for the current month
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.classList.add("day");
    dayCell.textContent = day;

    // Mark today's date
    if (isCurrentMonth && day === today.getDate()) {
      dayCell.classList.add("today");
    }

    // Add event
    dayCell.addEventListener("click", () => {
      console.log(`Clicked on: ${monthNames[month]} ${day}, ${year}`);
    });

    calendarGrid.appendChild(dayCell);
  }
}

// --- Navigation Functions ---

function previousMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 13; // December
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 13) {
    currentMonth = 0; // January
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
}

prevButton.addEventListener("click", previousMonth);
nextButton.addEventListener("click", nextMonth);

// Rendering of the calendar
renderCalendar(currentMonth, currentYear);
