// 第一組背面圖片
const cardDataSet1 = [
    'images/picture-1.png',
    'images/picture-2.png',
    'images/picture-3.png',
    'images/picture-4.png',
    'images/picture-5.png',
    'images/picture-6.png',
    'images/picture-7.png',
    'images/picture-8.png'
];

// 第二組背面圖片
const cardDataSet2 = [
    'images/picture-1.png',
    'images/picture-2.png',
    'images/picture-3.png',
    'images/picture-4.png',
    'images/picture-5.png',
    'images/picture-6.png',
    'images/picture-7.png',
    'images/picture-8.png'
];

// 統一的正面圖片
const frontImage = 'images/picture-0.jpg';

// 將兩組背面圖片合併
const allCardData = [...cardDataSet1, ...cardDataSet2];

// 打亂陣列的函數（Fisher-Yates 洗牌演算法）
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// 動態生成卡片
function generateCards(containerId, cardImages, frontImage) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // 先清空容器

    // 動態調整網格佈局，計算列數
    const columns = Math.ceil(Math.sqrt(cardImages.length));
    container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

    // 打亂圖片順序
    shuffleArray(cardImages);

    // 為每個圖片生成對應的卡片
    cardImages.forEach((image, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('onclick', 'flipCard(this)');

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const frontImg = document.createElement('img');
        frontImg.setAttribute('src', frontImage);
        frontImg.setAttribute('alt', `Front Image ${index + 1}`);
        cardFront.appendChild(frontImg);

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        const backImg = document.createElement('img');
        backImg.setAttribute('src', image);
        backImg.setAttribute('alt', `Back Image ${index + 1}`);
        cardBack.appendChild(backImg);

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);

        container.appendChild(card);
    });
}

// 翻轉單個卡片的函數
function flipCard(cardElement) {
    cardElement.classList.toggle('flipped');
}

// 將所有卡片翻到正面
function flipAllToFront() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.remove('flipped');
    });
}

// 將所有卡片依次翻到背面
function flipAllToBack() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, index * 200); // 每張卡片依次延遲 200 毫秒
    });
}

// 倒數計時函數
function startCountdown(seconds, callback) {
    const countdownElem = document.getElementById('countdown-timer');
    const countdownDiv = document.getElementById('countdown');
    countdownDiv.style.display = 'block';
    let remainingTime = seconds;

    const interval = setInterval(() => {
        countdownElem.textContent = remainingTime;
        if (remainingTime <= 0) {
            clearInterval(interval);
            countdownDiv.style.display = 'none';
            callback(); // 在倒數結束時執行回調
        } else {
            remainingTime--;
        }
    }, 1000);
}

// 開始遊戲函數
function startGame() {
    // 生成卡片並立即將它們翻到背面
    generateCards('card-container', allCardData, frontImage);
    flipAllToBack();

    // 開始倒數 10 秒
    startCountdown(10, () => {
        flipAllToFront(); // 10 秒後將所有卡片翻到正面
    });
}