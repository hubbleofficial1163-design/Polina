document.addEventListener('DOMContentLoaded', function() {
    // Анимация печатающегося текста - с именами Сергей и Полина
    const textElement = document.getElementById('typing-text');
    const cursor = document.getElementById('cursor');
    const fullText = "Сергей + Полина = ";
    const heartSpan = "<span class='heart'>❤</span>";
    let charIndex = 0;
    let isTyping = true;
    let isDeleting = false;
    let loopTimeout;
    
    function typeWriter() {
        if (isTyping) {
            if (charIndex < fullText.length) {
                textElement.innerHTML = fullText.substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeWriter, 150);
            } else {
                // После завершения печати текста, добавляем сердечко
                textElement.innerHTML = fullText + heartSpan;
                // Делаем сердечко видимым
                const heart = textElement.querySelector('.heart');
                if (heart) {
                    heart.style.opacity = '1';
                }
                // Оставляем курсор
                cursor.style.animation = 'none';
                cursor.style.opacity = '0.5';
                
                // Ждем 3 секунды и начинаем стирать
                loopTimeout = setTimeout(() => {
                    isTyping = false;
                    isDeleting = true;
                    const heart = textElement.querySelector('.heart');
                    if (heart) {
                        heart.style.opacity = '0';
                    }
                    deleteText();
                }, 3000);
            }
        }
    }
    
    function deleteText() {
        if (isDeleting) {
            if (charIndex > 0) {
                textElement.innerHTML = fullText.substring(0, charIndex - 1);
                charIndex--;
                setTimeout(deleteText, 80);
            } else {
                isDeleting = false;
                // Ждем немного и начинаем заново
                loopTimeout = setTimeout(() => {
                    isTyping = true;
                    cursor.style.animation = 'blink 1s infinite';
                    cursor.style.opacity = '1';
                    typeWriter();
                }, 1000);
            }
        }
    }
    
    // Запускаем анимацию через секунду после загрузки
    setTimeout(typeWriter, 800);
    
    // Музыкальный плеер
    const playButton = document.getElementById('playButton');
    const audio = document.getElementById('weddingMusic');
    const playIcon = playButton.querySelector('i');
    
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    playIcon.className = 'fas fa-pause';
                    playButton.style.background = '#888888';
                })
                .catch(error => {
                    console.log("Автовоспроизведение заблокировано: ", error);
                    alert("Пожалуйста, разрешите воспроизведение музыки в вашем браузере.");
                });
        } else {
            audio.pause();
            playIcon.className = 'fas fa-play';
            playButton.style.background = '#666666';
        }
    });
    
    // Обновляем иконку при окончании воспроизведения
    audio.addEventListener('ended', function() {
        playIcon.className = 'fas fa-play';
        playButton.style.background = '#666666';
    });
    
    // Таймер обратного отсчета до 26.08.2026 15:00
    function updateCountdown() {
        const weddingDate = new Date('2026-08-26T15:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('countdown').innerHTML = '<div style="font-size: 20px; color: #8B0000; font-weight: bold; padding: 20px;">Свадьба состоялась! Спасибо, что были с нами!</div>';
        }
    }
    
    // Обновляем таймер каждую секунду
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Генерация календаря на август 2026 с выделением 26 числа
    function generateCalendar() {
        const calendarContainer = document.getElementById('calendarContainer');
        const weddingDate = new Date(2026, 7, 26); // Август 2026, 26 число
        const today = new Date();
        
        // Названия дней недели
        const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
        
        // Названия месяцев
        const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 
                           'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        
        // Получаем первый день месяца и количество дней в месяце
        const firstDayOfMonth = new Date(2026, 7, 1);
        const lastDayOfMonth = new Date(2026, 8, 0); // 0 день следующего месяца = последний день текущего
        const totalDays = lastDayOfMonth.getDate();
        
        // Определяем день недели первого дня (0-6, где 0 - воскресенье, 1 - понедельник)
        let firstDayIndex = firstDayOfMonth.getDay();
        // Преобразуем к нашему формату (понедельник = 0)
        firstDayIndex = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
        
        let calendarHTML = `<div class="calendar-grid">`;
        
        // Добавляем дни недели
        for (let i = 0; i < 7; i++) {
            calendarHTML += `<div class="calendar-day">${daysOfWeek[i]}</div>`;
        }
        
        // Добавляем пустые ячейки для дней предыдущего месяца
        for (let i = 0; i < firstDayIndex; i++) {
            calendarHTML += `<div class="calendar-date-cell empty"></div>`;
        }
        
        // Добавляем дни текущего месяца
        for (let day = 1; day <= totalDays; day++) {
            let cellClass = 'calendar-date-cell';
            
            // Проверяем, является ли это день свадьбы (26 августа)
            if (day === 26) {
                cellClass += ' wedding-day';
            }
            // Проверяем, является ли это сегодняшний день (только если в том же месяце и году)
            else if (today.getFullYear() === 2026 && 
                    today.getMonth() === 7 && 
                    today.getDate() === day) {
                cellClass += ' current-day';
            }
            
            calendarHTML += `<div class="${cellClass}">${day}</div>`;
        }
        
        calendarHTML += `</div>`;
        // Месяц и год внизу
        calendarHTML += `<div class="calendar-month-label">Август 2026</div>`;
        
        calendarContainer.innerHTML = calendarHTML;
    }
    
    // Генерируем календарь
    generateCalendar();
    
    // Обработка кнопки "Карта"
    const mapButton = document.getElementById('mapButton');
    const mapPlaceholder = document.getElementById('mapPlaceholder');
    let mapVisible = false;
    
    mapButton.addEventListener('click', function() {
        if (!mapVisible) {
            mapPlaceholder.style.display = 'flex';
            mapButton.innerHTML = '<i class="fas fa-times"></i> Скрыть карту';
            mapVisible = true;
        } else {
            mapPlaceholder.style.display = 'none';
            mapButton.innerHTML = '<i class="fas fa-map-marker-alt"></i> Карта';
            mapVisible = false;
        }
    });
    
    // Обработка формы
    const guestForm = document.getElementById('guestForm');
    
    guestForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Собираем данные формы
        const formData = new FormData(guestForm);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            if (key === 'alcohol') {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        
        // В реальном проекте здесь будет отправка на сервер
        // Для демо просто показываем сообщение
        alert('Спасибо! Ваш ответ сохранен. Мы с нетерпением ждем встречи с вами на нашей свадьбе!');
        guestForm.reset();
    });
    
    // Плавная прокрутка при клике на ссылки
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Функция для скролла к основному контенту
function scrollToContent() {
    const content = document.querySelector('.content');
    window.scrollTo({
        top: content.offsetTop - 60,
        behavior: 'smooth'
    });
}