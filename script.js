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
    
    // Пытаемся загрузить аудио
    audio.load();
    
    playButton.addEventListener('click', function() {
        if (audio.paused) {
            // Пытаемся воспроизвести
            audio.play()
                .then(() => {
                    playIcon.className = 'fas fa-pause';
                    playButton.style.background = '#888888';
                })
                .catch(error => {
                    console.log("Автовоспроизведение заблокировано: ", error);
                    // Показываем более дружелюбное сообщение
                    alert("Чтобы включить музыку, нажмите на кнопку еще раз и разрешите воспроизведение в браузере.");
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
    
    /// Обработка кнопки "Карта" с Яндекс.Картой
    const mapButton = document.getElementById('mapButton');
    const mapContainer = document.getElementById('mapContainer');
    let mapVisible = false;

    mapButton.addEventListener('click', function() {
        if (!mapVisible) {
            mapContainer.style.display = 'block';
            mapButton.innerHTML = '<i class="fas fa-times"></i> Скрыть карту';
            mapVisible = true;
            
            // Плавный скролл к карте
            setTimeout(() => {
                mapContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
        } else {
            mapContainer.style.display = 'none';
            mapButton.innerHTML = '<i class="fas fa-map-marker-alt"></i> Карта';
            mapVisible = false;
        }
    });
    
    // Функция для показа уведомлений
    function showNotification(message, type) {
        // Удаляем существующее уведомление, если есть
        const existingNotification = document.querySelector('.form-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Создаем новое уведомление
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 15px 25px;
            border-radius: 8px;
            font-family: 'Raleway', sans-serif;
            font-size: 16px;
            text-align: center;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideDown 0.3s ease;
            max-width: 90%;
            width: auto;
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            border: 2px solid ${type === 'success' ? '#45a049' : '#d32f2f'};
        `;
        
        document.body.appendChild(notification);
        
        // Добавляем ключевые кадры для анимации, если их нет
        if (!document.querySelector('#notification-keyframes')) {
            const style = document.createElement('style');
            style.id = 'notification-keyframes';
            style.textContent = `
                @keyframes slideDown {
                    from {
                        top: -100px;
                        opacity: 0;
                    }
                    to {
                        top: 20px;
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Скрываем уведомление через 5 секунд
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }
    
    // Функция для преобразования значений алкоголя в русские названия
    function getAlcoholText(alcoholValues) {
        if (alcoholValues.length === 0) return 'Не выбрано';
        
        const alcoholMap = {
            'sparkling': 'Игристое',
            'white_wine': 'Белое вино',
            'red_wine': 'Красное вино',
            'whiskey': 'Виски',
            'vodka': 'Водка',
            'no_alcohol': 'Не буду пить алкоголь'
        };
        
        const russianValues = alcoholValues.map(value => alcoholMap[value] || value);
        return russianValues.join(', ');
    }
    
    // Функция для экранирования специальных символов в телефоне
    function escapePhoneNumber(phone) {
        if (!phone) return '';
        // Просто возвращаем телефон как строку, без специального форматирования
        // Это предотвратит интерпретацию как формулы в Google Sheets
        return phone;
    }
    
    // Обработка формы с отправкой в Google Sheets
    const guestForm = document.getElementById('guestForm');
    
    guestForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Проверяем заполнение обязательных полей
        const fio = this.querySelector('[name="fio"]').value.trim();
        const phone = this.querySelector('[name="phone"]').value.trim();
        const attendance = this.querySelector('[name="attendance"]:checked');
        
        if (!fio || !phone || !attendance) {
            showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
            return;
        }
        
        // Показываем сообщение о отправке
        const submitButton = this.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        // Собираем данные формы
        const formData = new FormData(guestForm);
        
        // Получаем ФИО
        const name = formData.get('fio') || '';
        
        // Получаем телефон (просто как строку, без экранирования)
        const phone_number = formData.get('phone') || '';
        
        // Получаем ответ о присутствии
        const attendance_value = formData.get('attendance') || '';
        const attendanceText = attendance_value === 'yes' ? 'С удовольствием приду' : 'Не смогу присутствовать';
        
        // Собираем выбранные напитки и преобразуем в русские названия
        const alcoholValues = formData.getAll('alcohol');
        const alcoholText = getAlcoholText(alcoholValues);
        
        // Получаем комментарии
        const comments = formData.get('comments') || '';
        
        // Создаем объект с данными для отправки
        const data = {
            name: name,
            phone: phone_number,
            attendance: attendanceText,
            alcohol: alcoholText,
            comments: comments,
            timestamp: new Date().toLocaleString('ru-RU')
        };
        
        try {
            // !!! ВАЖНО: Замените этот URL на ваш собственный из развернутого веб-приложения Google Apps Script !!!
            const scriptURL = 'https://script.google.com/macros/s/AKfycbz9KN_ZkTb-I74a1IfxZM6Ab2lh2lC_zcsqAuZsomNv27NeLYwuAUc8ozfGTJzg_6GJ/exec';
            
            // Создаем FormData для отправки
            const formBody = new URLSearchParams();
            formBody.append('name', data.name);
            formBody.append('phone', data.phone);
            formBody.append('attendance', data.attendance);
            formBody.append('alcohol', data.alcohol);
            formBody.append('comments', data.comments);
            
            // Отправляем данные
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors', // Важно для работы с Google Apps Script
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formBody
            });
            
            // Из-за mode: 'no-cors' мы не можем прочитать ответ
            // Но если ошибки не было, считаем что все хорошо
            showNotification('Спасибо! Ваш ответ отправлен. Мы с нетерпением ждем вас на свадьбе! ❤️', 'success');
            guestForm.reset();
            
        } catch (error) {
            console.error('Ошибка при отправке:', error);
            showNotification('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.', 'error');
        } finally {
            // Возвращаем кнопку в исходное состояние
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
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

    // Добавляем обработчик для кнопки Telegram (если она есть)
    const telegramButton = document.querySelector('.telegram-button');
    if (telegramButton) {
        telegramButton.addEventListener('click', function(e) {
            // Можно добавить аналитику или дополнительную логику
            console.log('Переход в Telegram чат');
        });
    }

    // Добавляем валидацию телефона в реальном времени
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 1) {
                    value = '+7 (' + value;
                } else if (value.length <= 4) {
                    value = '+7 (' + value.substring(1, 4);
                } else if (value.length <= 7) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7);
                } else if (value.length <= 9) {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9);
                } else {
                    value = '+7 (' + value.substring(1, 4) + ') ' + value.substring(4, 7) + '-' + value.substring(7, 9) + '-' + value.substring(9, 11);
                }
                this.value = value;
            }
        });
    }
});

// Функция для скролла к основному контенту
function scrollToContent() {
    const content = document.querySelector('.content');
    if (content) {
        window.scrollTo({
            top: content.offsetTop - 60,
            behavior: 'smooth'
        });
    }
}

// Добавляем обработку ошибок для изображений
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.log('Ошибка загрузки изображения:', this.src);
            // Можно добавить заглушку для отсутствующих изображений
            if (!this.src.includes('placeholder')) {
                // this.src = 'placeholder.jpg'; // если есть заглушка
            }
        });
    });
});
