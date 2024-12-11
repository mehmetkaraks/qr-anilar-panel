const calendarDays = document.getElementById("calendarDays");
const monthYear = document.getElementById("monthYear");
const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const eventModal = document.getElementById("eventModal");
const selectedDate = document.getElementById("selectedDate");
const eventName = document.getElementById("eventName");
const eventCategory = document.getElementById("eventCategory");
const eventClock = document.getElementById("eventClock");
document.getElementById("continueButton").addEventListener("click", function () {
  window.location.href = "packets.html";
});

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDateValue = null;

function createCalendar(month, year) {
  calendarDays.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = new Date(year, month).toLocaleDateString("tr-TR", {
    month: "long",
    year: "numeric",
  });

  for (let i = 0; i < firstDay; i++) {
    calendarDays.innerHTML += "<div></div>";
  }

  for (let date = 1; date <= lastDate; date++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = date;
    dayDiv.addEventListener("click", () => selectDate(date));
    calendarDays.appendChild(dayDiv);
  }
}

function selectDate(date) {
  selectedDateValue = new Date(currentYear, currentMonth, date);
  const formattedDate = selectedDateValue.toLocaleDateString("tr-TR");
  selectedDate.textContent = `${formattedDate}`; // Only date, no label
  eventModal.classList.remove("hidden");
}

prevMonth.addEventListener("click", () => {
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  createCalendar(currentMonth, currentYear);
});

nextMonth.addEventListener("click", () => {
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  createCalendar(currentMonth, currentYear);
});

createCalendar(currentMonth, currentYear);
