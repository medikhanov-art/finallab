// Проверка номера
const phoneBlocks = document.querySelectorAll('.phone_block');

phoneBlocks.forEach(block => {
    const phoneInput = block.querySelector('#phone_input');
    const phoneButton = block.querySelector('#phone_button');
    const phoneSpan = block.querySelector('#phone_result');

    const reqExpKg = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/;
    const reqExpRu = /^\+7 \922 \d{3}-\d{2}-\d{2}$/;

    phoneButton.addEventListener('click', () => {
        const value = phoneInput.value.trim();
        
        const isRussianFormat = phoneInput.placeholder.includes('+7');
        
        if (isRussianFormat) {
            if (reqExpRu.test(value)) {
                phoneSpan.innerHTML = 'Этот номер существует';
                phoneSpan.style.color = 'green';
            } else {
                phoneSpan.innerHTML = 'Этот номер не существует';
                phoneSpan.style.color = 'red';
            }
        } else {
            if (reqExpKg.test(value)) {
                phoneSpan.innerHTML = 'Этот номер существует';
                phoneSpan.style.color = 'green';
            } else {
                phoneSpan.innerHTML = 'Этот номер не существует';
                phoneSpan.style.color = 'red';
            }
        }
    });
});

//Tab Slider
const tabsContentCards = document.querySelectorAll('.tab_content_block');
const tabsItems = document.querySelectorAll('.tab_content_item');
const tabsItemsParents =  document.querySelector('.tab_content_items');


const hightTabsContentCards = () =>{
    tabsContentCards.forEach((tabsContentCard)=>{
        tabsContentCard.style.display = 'none'
    })
    tabsItems.forEach((tabItem)=>{
        tabItem.classList.remove('tab_content_item_active')
    })
}

const showTabsContentCards = (indexElement = 0)=>{
    tabsContentCards[indexElement].style.display = 'block';
    tabsItems[indexElement].classList.add('tab_content_item_active')
}

hightTabsContentCards();
showTabsContentCards();


tabsItemsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex)=>{
            if(event.target === tabItem){
                hightTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

let curretIndex = 0; // Первая вкладка
let intervalId; //Переменная для хранения интервала

//Ф-ция для автоматического переключения

const startAuthoSlider = ()=>{
    intervalId = setInterval(()=>{
        hightTabsContentCards();
        showTabsContentCards(curretIndex);
        curretIndex = (curretIndex +1) % tabsItems.length;
    }, 2000); // 2сек
}
//Запуск автослайдера
startAuthoSlider();

//Остановка слайдера при клике на вкладку

tabsItemsParents.onclick = (event) => {
    clearInterval(intervalId);
    if (event.target.classList.contains('tab_content_item')){
        tabsItems.forEach((tabItem, tabItemIndex) =>{
            if(event.target === tabItem){
                hightTabsContentCards();
                showTabsContentCards(tabItemIndex);
                curretIndex = tabItemIndex;
                startAuthoSlider();
            }
        })
    }
}

// Получаем input элементы
const somInput = document.getElementById('som');
const usdInput = document.getElementById('usd');
const eurInput = document.getElementById('eur');

const converter = (element, target1, target2, currentType) => {
    element.addEventListener('input', async () => {
        try{
            const response = await fetch('../data/converter.json');
            if (!response.ok) throw new Error('Не удалось загрузить данные');

            const data = await response.json();
            const value = parseFloat(element.value);

            if(!element.value || isNaN(value)){
                target1.value = '';
                target2.value = '';
                return;
            }
            switch (currentType){
                case 'som':
                    target1.value = (value / data.usd).toFixed(2);
                    target2.value = (value / data.eur).toFixed(2);
                    break;
                case 'usd':
                    target1.value = (value * data.usd).toFixed(2);
                    target2.value = (value * data.usd / data.eur).toFixed(2);
                    break;
                case 'eur':
                    target1.value = (value * data.eur).toFixed(2);
                    target2.value = (value * data.eur / data.usd).toFixed(2);
                    break;
            }
        } catch (error){
            console.error('Ошибка:', error);
        }
    });
};

converter(somInput, usdInput, eurInput, 'som');
converter(usdInput, somInput, eurInput, 'usd');
converter(eurInput, somInput, usdInput, 'eur');


const card1 = document.querySelector('.card');
const btnPrev1 = document.querySelector('#btn-prev');
const btnNext1 = document.querySelector('#btn-next');

let count = 1;
const totalCards = 20;

const memeQuotes = [
    {
        id: 1,
        quote: "Я тот, кто стучится",
        context: "Уолтер Уайт:",
        reaction: "🚪👊 Начинается эпоха Гейзенберга"
    },
    {
        id: 2,
        quote: "Наука, сука!",
        context: "Джесси Пинкман:",
        reaction: "🧪⚗️ Химия - это круто!"
    },
    {
        id: 3,
        quote: "Никаких половинчатых мер",
        context: "Гус Фринг:",
        reaction: "🎯💀 Точность и хладнокровие"
    },
    {
        id: 4,
        quote: "Говори мне, что это не мет",
        context: "Хэнк Шрейдер:",
        reaction: "👮‍♂️🔍 Инстинкты копа"
    },
    {
        id: 5,
        quote: "Мы занимаемся этим ради семьи",
        context: "Уолтер Уайт:",
        reaction: "👨‍👩‍👧‍👦💵 Оправдание номер один"
    },
    {
        id: 6,
        quote: "Ты мой партнер, а не мой работник",
        context: "Уолтер к Джесси:",
        reaction: "🤝💼 Сложные рабочие отношения"
    },
    {
        id: 7,
        quote: "Лос Поллос Эрманос - лучший фастфуд",
        context: "Гус Фринг:",
        reaction: "🍗😎 Идеальное прикрытие"
    },
    {
        id: 8,
        quote: "Я не в опасности, Скайлер. Я сама опасность",
        context: "Уолтер Уайт:",
        reaction: "💀🔥 Превращение завершено"
    },
    {
        id: 9,
        quote: "Нужно больше синих кристаллов",
        context: "Джесси в лаборатории:",
        reaction: "🔵💎 99.1% чистоты"
    },
    {
        id: 10,
        quote: "Скажи мое имя",
        context: "Гейзенберг:",
        reaction: "🎭👑 Легенда рождается"
    },
    {
        id: 11,
        quote: "Тук-тук",
        context: "Кто-то у двери:",
        reaction: "🚪😨 Плохие новости"
    },
    {
        id: 12,
        quote: "Мы не готовим, мы занимаемся химией",
        context: "Уолтер Уайт:",
        reaction: "🧪🎓 Профессиональная гордость"
    },
    {
        id: 13,
        quote: "РВ-360 - это наш мобильный дом",
        context: "Джесси:",
        reaction: "🚐🔬 Мобильная лаборатория"
    },
    {
        id: 14,
        quote: "Я просыпаюсь, живу, потом снова ложусь спать",
        context: "Джесси о своей жизни:",
        reaction: "🔄😵‍💫 Бесконечный цикл"
    },
    {
        id: 15,
        quote: "Лучше звоните Солу",
        context: "Сол Гудман:",
        reaction: "📞⚖️ Юрист на все случаи"
    },
    {
        id: 16,
        quote: "Ничего личного, просто бизнес",
        context: "Майк Эрмантраут:",
        reaction: "💼🔫 Профессионализм"
    },
    {
        id: 17,
        quote: "Мы строим империю",
        context: "Уолтер Уайт:",
        reaction: "🏰💊 Наркоимперия"
    },
    {
        id: 18,
        quote: "Это не наркотики, это искусство",
        context: "Гейзенберг о своем мете:",
        reaction: "🎨🧪 Химическое искусство"
    },
    {
        id: 19,
        quote: "Деньги решают все проблемы",
        context: "Уолтер Уайт:",
        context: "💰🤔 Иллюзия контроля"
    },
    {
        id: 20,
        quote: "Мы делаем историю",
        context: "Гейзенберг:",
        reaction: "📖💣 Преступная легенда"
    }
];

// Функция для получения данных карточки
function getCardData(cardNumber) {
    const index = (cardNumber - 1) % memeQuotes.length;
    return memeQuotes[index];
}

// Функция для обновления отображения карточки
function updateCard(cardData) {
    if (!cardData) {
        card1.innerHTML = `
            <p>Ошибка загрузки данных</p>
            <span>#${count}</span>
        `;
        return;
    }
    
    card1.innerHTML = `
        <p class="quote-context">${cardData.context}</p>
        <p class="quote-text">"${cardData.quote}"</p>
        <p class="quote-reaction">${cardData.reaction}</p>
        <span class="quote-number">Емае #${cardData.id}</span>
    `;
}

// Функция для загрузки и отображения карточки
function loadCard(cardNumber) {
    const cardData = getCardData(cardNumber);
    updateCard(cardData);
}

// Обработчики для кнопок
btnPrev1.addEventListener('click', () => {
    if (count > 1) {
        count--;
        loadCard(count);
    }
});

btnNext1.addEventListener('click', () => {
    if (count < totalCards) {
        count++;
        loadCard(count);
    }
});

// Загружаем первую карточку при загрузке страницы
loadCard(count);


// Weather
const cityInput = document.querySelector('.cityName');
const citySpan = document.querySelector('.city');
const tempSpan = document.querySelector('.temp');

async function getWeather(city) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true`;
        
        const mockWeatherData = {
            'москва': { name: 'Москва', temp: 15 },
            'бишкек': { name: 'Бишкек', temp: 25 },
            'санкт-петербург': { name: 'Санкт-Петербург', temp: 12 },
            'нью-йорк': { name: 'Нью-Йорк', temp: 18 },
            'лондон': { name: 'Лондон', temp: 14 }
        };
        
        const cityLower = city.toLowerCase();
        
        if (mockWeatherData[cityLower]) {
            const data = mockWeatherData[cityLower];
            citySpan.textContent = data.name;
            tempSpan.textContent = `${data.temp}°C`;
            cityInput.value = '';
        } else {
            throw new Error('Город не найден');
        }
        
    } catch (error) {
        citySpan.textContent = 'Ошибка';
        tempSpan.textContent = error.message;
        cityInput.value = '';
        

        setTimeout(() => {
            citySpan.textContent = '';
            tempSpan.textContent = '';
        }, 3000);
    }
}


cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && cityInput.value.trim()) {
        getWeather(cityInput.value.trim());
    }
});

const weatherBlock = document.querySelector('.inner_weather');
const searchButton = document.createElement('button');
searchButton.textContent = 'Найти';
searchButton.className = 'btn';
searchButton.style.marginTop = '10px';

searchButton.addEventListener('click', () => {
    if (cityInput.value.trim()) {
        getWeather(cityInput.value.trim());
    }
});

weatherBlock.querySelector('div').appendChild(searchButton);