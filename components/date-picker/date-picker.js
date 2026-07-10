function TomatoDatePicker(options = {}) {
  const {
    selectedDate = new Date(),
    onSelect = null
  } = options;

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  let currentDate = new Date(selectedDate);
  let tempSelected = new Date(selectedDate);

  const anchor = document.getElementById('diaryDateDisplay').parentElement;
  anchor.style.position = 'relative';

  removeExistingPicker();

  const dropdown = document.createElement('div');
  dropdown.className = 'date-picker-dropdown';
  dropdown.id = 'tomatoDatePicker';

  const backdrop = document.createElement('div');
  backdrop.className = 'date-picker-backdrop';

  function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay();
  }

  function isSameDate(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  function isToday(date) {
    return isSameDate(date, new Date());
  }

  function render() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    let daysHTML = '';

    for (let i = 0; i < firstDay; i++) {
      const day = daysInPrevMonth - firstDay + i + 1;
      daysHTML += `<button class="date-picker__day date-picker__day--other-month" disabled>${day}</button>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const classes = ['date-picker__day'];
      if (isToday(date)) classes.push('date-picker__day--today');
      if (isSameDate(date, tempSelected)) classes.push('date-picker__day--selected');
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      daysHTML += `<button class="${classes.join(' ')}" data-date="${dateStr}">${day}</button>`;
    }

    const totalCells = firstDay + daysInMonth;
    const remaining = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let i = 1; i <= remaining; i++) {
      daysHTML += `<button class="date-picker__day date-picker__day--other-month" disabled>${i}</button>`;
    }

    dropdown.innerHTML = `
      <div class="date-picker__header">
        <h3 class="date-picker__title">${MONTHS[month]} ${year}</h3>
        <div class="date-picker__nav">
          <button class="date-picker__nav-btn" data-nav="prev-year" aria-label="Previous year">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>
          </button>
          <button class="date-picker__nav-btn" data-nav="prev-month" aria-label="Previous month">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <button class="date-picker__nav-btn" data-nav="next-month" aria-label="Next month">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <button class="date-picker__nav-btn" data-nav="next-year" aria-label="Next year">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
          </button>
        </div>
      </div>
      <div class="date-picker__weekdays">
        ${WEEKDAYS.map(d => `<span class="date-picker__weekday">${d}</span>`).join('')}
      </div>
      <div class="date-picker__days">${daysHTML}</div>
      <div class="date-picker__footer">
        <button class="date-picker__today-btn" data-action="today">Today</button>
        <div class="date-picker__actions">
          <button class="date-picker__cancel" data-action="cancel">Cancel</button>
          <button class="date-picker__confirm" data-action="confirm">Select</button>
        </div>
      </div>
    `;

    bindEvents();
  }

  function bindEvents() {
    dropdown.querySelector('[data-nav="prev-year"]').addEventListener('click', () => {
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      render();
    });
    dropdown.querySelector('[data-nav="prev-month"]').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      render();
    });
    dropdown.querySelector('[data-nav="next-month"]').addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      render();
    });
    dropdown.querySelector('[data-nav="next-year"]').addEventListener('click', () => {
      currentDate.setFullYear(currentDate.getFullYear() + 1);
      render();
    });
    dropdown.querySelector('[data-action="today"]').addEventListener('click', () => {
      const today = new Date();
      tempSelected = new Date(today);
      currentDate = new Date(today);
      render();
    });

    dropdown.querySelectorAll('.date-picker__day:not(.date-picker__day--other-month):not(.date-picker__day--disabled)').forEach(btn => {
      btn.addEventListener('click', () => {
        const parts = btn.dataset.date.split('-');
        tempSelected = new Date(parts[0], parts[1] - 1, parts[2]);
        render();
      });
    });

    dropdown.querySelector('[data-action="cancel"]').addEventListener('click', close);
    dropdown.querySelector('[data-action="confirm"]').addEventListener('click', () => {
      if (onSelect) onSelect(new Date(tempSelected));
      close();
    });

    backdrop.addEventListener('click', close);
  }

  function close() {
    dropdown.classList.remove('active');
    backdrop.remove();
    setTimeout(() => dropdown.remove(), 300);
  }

  function removeExistingPicker() {
    const existing = document.getElementById('tomatoDatePicker');
    if (existing) existing.remove();
    const existingBackdrop = document.querySelector('.date-picker-backdrop');
    if (existingBackdrop) existingBackdrop.remove();
  }

  anchor.appendChild(dropdown);
  document.body.appendChild(backdrop);

  render();

  requestAnimationFrame(() => {
    dropdown.classList.add('active');
  });

  return { close };
}
