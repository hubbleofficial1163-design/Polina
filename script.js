// Ждем полной загрузки страницы
window.addEventListener('load', function() {
    // Запускаем таймер
    startTimer();
    // Инициализируем слайдер пожеланий
    initWishesSlider();
    // Инициализируем модальное окно со списком подарков
    initGiftModal();
    // Инициализируем модальное окно с анкетой
    initGuestModal();
    // Анимации при скролле
    initScrollAnimations();
});

function startTimer() {
    const timerElement = document.getElementById('timer');
    
    // Целевая дата: 26 июня 2026 года (в JavaScript месяцы с 0, поэтому 5 = июнь)
    const targetDate = new Date(2026, 5, 26, 0, 0, 0);
    
    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            timerElement.innerHTML = `
                <div class="time-unit">
                    <span class="time-number">0</span>
                    <span class="time-label">дней</span>
                </div>
                <div class="time-unit">
                    <span class="time-number">0</span>
                    <span class="time-label">часов</span>
                </div>
                <div class="time-unit">
                    <span class="time-number">0</span>
                    <span class="time-label">минут</span>
                </div>
                <div class="time-unit">
                    <span class="time-number">0</span>
                    <span class="time-label">секунд</span>
                </div>
            `;
            return;
        }
        
        // Расчет дней, часов, минут и секунд
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Формируем HTML с цифрами и подписями под ними
        timerElement.innerHTML = `
            <div class="time-unit">
                <span class="time-number">${days}</span>
                <span class="time-label">дней</span>
            </div>
            <div class="time-unit">
                <span class="time-number">${hours}</span>
                <span class="time-label">часов</span>
            </div>
            <div class="time-unit">
                <span class="time-number">${minutes}</span>
                <span class="time-label">минут</span>
            </div>
            <div class="time-unit">
                <span class="time-number">${seconds}</span>
                <span class="time-label">секунд</span>
            </div>
        `;
    }
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Функция для слайдера пожеланий
function initWishesSlider() {
    const wishes = [
        "Просим оставить ваших малышей в надежных руках на день торжества. Чтобы вы могли как следует отдохнуть и повеселиться на нашем празднике.",
        "Будем очень признательны, если Вы воздержитесь от криков «Горько». Ведь поцелуй - это знак выражения чувств, И он не может быть по заказу."
    ];
    
    let currentWishIndex = 0;
    const wishTextElement = document.getElementById('wishText');
    const wishCounterElement = document.getElementById('wishCounter');
    const prevButton = document.getElementById('prevWish');
    const nextButton = document.getElementById('nextWish');
    
    function updateWish() {
        // Обновляем текст
        wishTextElement.textContent = wishes[currentWishIndex];
        
        // Обновляем счетчик
        wishCounterElement.textContent = `${currentWishIndex + 1}/${wishes.length}`;
        
        // Блокируем/разблокируем кнопки
        if (prevButton) {
            prevButton.disabled = currentWishIndex === 0;
        }
        if (nextButton) {
            nextButton.disabled = currentWishIndex === wishes.length - 1;
        }
    }
    
    // Обработчики для кнопок
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentWishIndex > 0) {
                currentWishIndex--;
                updateWish();
            }
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (currentWishIndex < wishes.length - 1) {
                currentWishIndex++;
                updateWish();
            }
        });
    }
    
    // Инициализация
    updateWish();
}

// Функция для модального окна со списком подарков
function initGiftModal() {
    const modal = document.getElementById('giftModal');
    const giftButton = document.getElementById('giftButton');
    const closeButton = document.getElementById('closeModal');
    
    // Открыть модальное окно при клике на кнопку
    if (giftButton) {
        giftButton.addEventListener('click', function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
        });
    }
    
    // Закрыть модальное окно при клике на крестик
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Возвращаем прокрутку
        });
    }
    
    // Закрыть модальное окно при клике вне его
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
    
    // Закрыть по нажатию ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// Инициализация модального окна с анкетой
function initGuestModal() {
    const modal = document.getElementById('guestModal');
    const guestButton = document.getElementById('guestConfirmButton');
    const closeButton = document.getElementById('closeGuestModal');
    const cancelButton = document.getElementById('cancelGuestForm');
    const form = document.getElementById('guestForm');
    
    // Открыть модальное окно при клике на кнопку "ПОДТВЕРДИТЬ"
    if (guestButton) {
        // Убираем старые обработчики и добавляем новый
        guestButton.replaceWith(guestButton.cloneNode(true));
        const newGuestButton = document.getElementById('guestConfirmButton');
        
        newGuestButton.addEventListener('click', function() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Функция закрытия модального окна
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Возвращаем прокрутку
    }
    
    // Закрыть при клике на крестик
    if (closeButton) {
        closeButton.replaceWith(closeButton.cloneNode(true));
        const newCloseButton = document.getElementById('closeGuestModal');
        newCloseButton.addEventListener('click', closeModal);
    }
    
    // Закрыть при клике на кнопку "ОТМЕНА"
    if (cancelButton) {
        cancelButton.replaceWith(cancelButton.cloneNode(true));
        const newCancelButton = document.getElementById('cancelGuestForm');
        newCancelButton.addEventListener('click', closeModal);
    }
    
    // Закрыть при клике вне окна
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Закрыть по нажатию ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Обработка отправки формы
    if (form) {
        // Убираем все старые обработчики формы
        const newForm = form.cloneNode(true);
        form.parentNode.replaceChild(newForm, form);
        
        const newFormElement = document.getElementById('guestForm');
        
        newFormElement.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Проверка обязательных полей
            const fullname = document.getElementById('fullname').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (!fullname || !phone) {
                alert('Пожалуйста, заполните обязательные поля (ФИО и телефон)');
                return;
            }
            
            // Блокируем кнопку отправки
            const submitButton = newFormElement.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
            }
            
            // Собираем данные из чекбоксов
            const alcoholPreferences = [];
            document.querySelectorAll('input[name="alcohol"]:checked').forEach(checkbox => {
                alcoholPreferences.push(checkbox.value);
            });
            
            const alcoholString = alcoholPreferences.join(',');
            
            // Собираем данные формы
            const formData = new URLSearchParams();
            formData.append('fullname', fullname);
            formData.append('phone', phone);
            formData.append('attendance', document.querySelector('input[name="attendance"]:checked').value);
            formData.append('companion', document.querySelector('input[name="companion"]:checked').value);
            formData.append('alcohol', alcoholString);
            formData.append('wishes', document.getElementById('wishes').value.trim());
            
            // URL вашего Google Apps Script
            const scriptUrl = 'https://script.google.com/macros/s/AKfycbypSkB0uDLrI7aWOI4rl7kdHxP4qKYzPSxWlTRH-4ZsApUzGL7cKsnHz1NwlhUsJIwG/exec';
            
            // Отправляем данные
            fetch(scriptUrl, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData
            })
            .then(() => {
                alert('Спасибо! Ваша анкета отправлена. До встречи на свадьбе!');
                newFormElement.reset();
                closeModal();
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
            })
            .finally(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                }
            });
        });
    }
}

// ========== АНИМАЦИИ ПРИ СКРОЛЛЕ ==========
function initScrollAnimations() {
    const elements = document.querySelectorAll('.photo-container, .location-section, .timing-section, .wishes-section, .contacts-section, .guest-section');
    
    function checkScroll() {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Элемент появляется, когда он входит в видимую область
            if (elementTop < windowHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    // Проверяем при загрузке
    checkScroll();
    
    // Проверяем при скролле
    window.addEventListener('scroll', checkScroll);
}
