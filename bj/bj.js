// Тут основной скрипт игры

// Делаем глобальную переменную для колоды 
let deck = {
B2: 2, B3: 3, B4: 4, B5: 5, B6: 6, B7: 7, B8: 8, B9: 9, B10:10, B11:10, B12:10, B13:10, B14:1,
H2: 2, H3: 3, H4: 4, H5: 5, H6: 6, H7: 7, H8: 8, H9: 9, H10:10, H11:10, H12:10, H13:10, H14:1,
P2: 2, P3: 3, P4: 4, P5: 5, P6: 6, P7: 7, P8: 8, P9: 9, P10:10, P11:10, P12:10, P13:10, P14:1,
T2: 2, T3: 3, T4: 4, T5: 5, T6: 6, T7: 7, T8: 8, T9: 9, T10:10, T11:10, T12:10, T13:10, T14:1,
}

// Объявляем переменную для ключей колоды, и рук игрока/дилера для дальнейших манипуляций
let deckM = [], dillerHand = [], playerHand = [];

// Объявляем переменные всех кнопок
let hit = document.getElementById('hit'), stay = document.getElementById('stay'), NG = document.getElementById('NG'); showSUM = document.getElementById('showSUM');
let betPlus = document.getElementById('betPlus'), betMinus = document.getElementById('betMinus'), betMAX = document.getElementById('betMAX');
let stopBut = document.getElementById('stopBut'), doubleBut = document.getElementById('doubleBut');


// Объявляем переменную для блока рисования фишечек и кеширования
let chipsIMG = document.getElementById('chipsIMG');
let keshIMG = document.getElementById('keshIMG');


// Объявляем переменные полей победы/поражения/суммы карт/подсказок
let winsP = document.getElementById('wins'), loosesP = document.getElementById('looses'), dillerSTAND = document.getElementById('dillerSTAND');
let playerHIDE = document.getElementById('playerHIDE'), dillerHIDE = document.getElementById('dillerHIDE');
let betVL = document.getElementById('betVL');

// Объявляем переменные полей количества фишек/ставки
let betP = document.getElementById('betP'), statP = document.getElementById('statP'), chipsP = document.getElementById('chipsP');

// Объявляем переменные количества фишек/ставки
let bet = 1, bet2 = 0, chips = 10000, stat = 0;


// Объявляем переменные позиционирования карт
let playerPOS = 0, dillerPOS = 0, i1 = 0, i2 = 0;

// Объявляем переменные статистики и статуса игры
let games = 0, looses = 0, wins = 0, gameStatus = 0;


// Объявляем переменные полей суммы карт для диллера и игрока
let dillerSUM = document.getElementById('dillerSUM'), playerSUM = document.getElementById('playerSUM');

// Блокираторы функций
let blockHIT = 0, blockSTAY = 0, blockNG = 1, blockBetPlus = 1, blockBetMinus = 0, blockBetMAX = 0; showSUMCheck = 0; blockStopBut = 0; blockDoubleBut = 0;

// Блоки для карт в CSS
let dillerCARD, playerCARD;

// Делаем масив ключей колоды
deckM = Object.keys(deck);

betPlusBlock();
betMAXBlock();
NGBlock();

// Функция перетасовки массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

// Функция кнопки увеличить ставку
let betPlusFunc = function() {
    if (blockBetPlus == 1) {
        if (bet < 10) {
            bet += 1;
        }
        else if (bet < 50) {
            bet += 5;
        }
        else if (bet < 100){
            bet += 10;
        }
        else if (bet < 200){
            bet += 25;
        };
        if (bet == 200) {
            betPlusBlock();
            betMAXBlock();
        };
        showALLstat();
        betMinusUnblock();
        drawChips();
    }
};

// Функция кнопки уменьшить ставку
let betMinusFunc = function() {
    if (blockBetMinus == 1) {
        if (bet > 100) {
            bet -= 25;
        }
        else if (bet > 50) {
            bet -= 10;
        }
        else if (bet > 10){
            bet -= 5;
        }
        else if (bet <= 10 && bet > 1){
            bet -= 1;
        };
        if (bet == 1) {
            betMinusBlock();
        };
        showALLstat();
        betPlusUnblock();
        betMAXUnblock();
        drawChips();
    }
};

// Функция кнопки макс. ставка
let betMAXFunc = function() {
    if (bet < 200) {
        bet = 200;
        showALLstat();
        betPlusBlock();
        betMAXBlock();
        betMinusUnblock();
        drawChips();
    }
}

//Math.ceil(3/*2) деление/умножение без остатка с округлением в большую сторону

// Функция для новой раздачи карт
let newGame = function () {
    if  (blockNG == 1) {
        // Показываем поля сумм карт
        /* dillerHIDE.classList.remove("hidden");
        playerHIDE.classList.remove("hidden"); */
        if (bet>chips) {
            dillerSTAND.innerHTML = "Недостаточно фишек для ставки!";
            return;
        };

        NG.classList.add("hidden");
        betMAX.classList.add("hidden");
        betPlus.classList.add("hidden");
        betMinus.classList.add("hidden");
        
        dillerSTAND.innerHTML = "Дилер должен остановиться на 17"
        
        
        
        NGBlock();
        betPlusBlock();
        betMAXBlock();
        betMinusBlock();
        
        
        
        // Убираем карты со страницы 
        clearPAGE(playerHand, dillerHand);

        // Сбрасываем все значения
        dillerSUM.innerHTML = "0";
        playerSUM.innerHTML = "0";
        playerHand = [];
        dillerHand = [];
        gameStatus = 0;
        playerPOS = 0;
        dillerPOS = 0;
        i1 = 0;
        i2 = 0;

        deckM = Object.keys(deck);
        // Тасуем колоду
        shuffle(deckM);

        // Берем игроку и диллеру 2 карты и показываем их на странице 
        //setTimeout(() => console.log(''), 1000);
        playerHand.push(deckM.shift());
        playerPOS += 1;
        
        drawPlayerCARD();

        playerSUM.innerHTML = handTotal(playerHand);
        
        //setTimeout(() => console.log(''), 1000);
        dillerHand.push(deckM.shift());
        dillerPOS += 1;
        
        drawDillerCARD();

        dillerSUM.innerHTML = deck[dillerHand[0]];
        if (deck[dillerHand[0]] === 1 ) {
            dillerSUM.innerHTML = 11;
        };

        //setTimeout(() => console.log(''), 1000);
        playerHand.push(deckM.shift());
        playerPOS += 1;
        i1 += 1;

        drawPlayerCARD();

        playerSUM.innerHTML = handTotal(playerHand);

        //setTimeout(() => console.log(''), 1000);
        dillerHand.push(deckM.shift());
        dillerPOS += 1;
        i2 += 1;

        dillerCARD = document.getElementById(`dillerCARD${dillerPOS}`);
        dillerCARD.style.background = `url("../deck/bruh.png") center no-repeat`;
        dillerCARD.style.backgroundSize = "contain";
        dillerCARD.classList.remove("hidden");
        
        doubleButUnblock();
        stopButUnblock();
        doubleBut.classList.remove("hidden");
        stopBut.classList.remove("hidden");
        doubleButBlock();
        stopButBlock();

        hitUnblock();
        stayUnblock();
        hit.classList.remove("hidden");
        stay.classList.remove("hidden");
        hitBlock();
        stayBlock();



        // Проверяем не победил ли игрок при первой раздаче
        if (handTotal(playerHand) === 21)
        {
            dillerSTAND.innerHTML = `Ты победил, в стартовой руке 21!`;
            betVL.innerHTML = `Получено фишек: ${Math.ceil(bet*1.5)}`;
            betVL.classList.remove("hidden");
            wins += 1;
            NGBlock();
            chips += Math.ceil(bet*1.5);
            stat += Math.ceil(bet*1.5);
            setTimeout(clearTrack, 3000);
            return;
        }

        

        // Проверяем не победил ли диллер при первой раздаче
        if (handTotal(dillerHand) === 21)
        {
            dillerSTAND.innerHTML = `Дилер победил, в стартовой руке 21!`;
            betVL.innerHTML = `Потеряно фишек: ${bet}`;
            betVL.classList.remove("hidden");
            showBruhCARD();
            dillerSUM.innerHTML = handTotal(dillerHand);
            NGBlock();
            chips -= bet;
            stat -= bet;
            looses += 1;
            setTimeout(clearTrack, 3000);

            return;
        }
        
        if ((bet*2) <= chips) {
            doubleButUnblock();
        };
        stopButUnblock();
        hitUnblock();
        stayUnblock();

    }
};

// Функция очистки страницы от карт
let clearPAGE = function(hand1, hand2) {
    for (let i = 0; i < hand1.length; i++) {
        playerCARD = document.getElementById(`playerCARD${i+1}`);
        playerCARD.style.background = '';
        playerCARD.style.backgroundSize = '';
        playerCARD.classList.add("hidden");
    }
    for (let j = 0; j < hand2.length; j++) {
        dillerCARD = document.getElementById(`dillerCARD${j+1}`);
        dillerCARD.style.background = '';
        dillerCARD.style.backgroundSize = '';
        dillerCARD.classList.add("hidden");
    }
};

// Функция подсчета суммы карт
let handTotal = function (hand) {
    let total = 0;
    let aceFlag = 0; // Отслеживем количество тузов в руке
    for (let i = 0; i < hand.length; i++) {
        total += deck[hand[i]];
        if (deck[hand[i]] == 1)
        {
            aceFlag += 1;
        }
    }

    // Для каждого туза в руке добавляем 10 к сумме карт, если это не вызовет перебор
    for (let j = 0; j < aceFlag; j++)
    {
        if (total + 10 <= 21)
        {
            total +=10;
        }
    }
    return total;
};

// Функция для окончания игры, отображение кнопок, запись статы и тд
let track = function () {
    winsP.innerHTML = wins;
    loosesP.innerHTML = looses;
    NGUnblock();
    NG.classList.remove("hidden");
    
    hit.classList.add("hidden");
    stay.classList.add("hidden");
    hitBlock();
    stayBlock();
    
    
    
    doubleBut.classList.add("hidden");
    doubleButBlock();
    
    betVL.classList.add("hidden");
    
    stopBut.classList.add("hidden");
    stopButBlock();
    
    betMAXUnblock();
    betMAX.classList.remove("hidden");
    betMAXBlock();
    
    betPlusUnblock();
    betPlus.classList.remove("hidden");
    betPlusBlock();
    
    betMinusUnblock();
    betMinus.classList.remove("hidden");
    betMinusBlock();
    
    if (bet < 200) {
        betMAXUnblock();
        betPlusUnblock();
    };
    if (bet > 1) {
        betMinusUnblock();
    };
    if (bet2 > bet) {
        bet = bet/2;
        bet2 = 0;
    };
    drawChips();
    showALLstat();
} 

// Назначаем на кнопку новой игры соответсвующую функцию
let hitClick = function () {
    
    doubleButBlock();
    stopButBlock();
    
    // Даем игроку карту и показываем ее на странице
    playerHand.push(deckM.shift());
    playerPOS += 1;
    i1 += 1;

    drawPlayerCARD();

    playerSUM.innerHTML = handTotal(playerHand);
   
    //Проверяем не перебор ли у игрока, если да показываем карты диллера (ваще в оригинале диллер не показывает карты при переборе, но так интереснее)
    let handVal = handTotal(playerHand);
    if (handVal > 21)
    {
        hitBlock();
        stayBlock();

        showBruhCARD();
        dillerSUM.innerHTML = handTotal(dillerHand);
        
        dillerSTAND.innerHTML = `Ты проиграл, перебор!`;
        betVL.innerHTML = `Потеряно фишек: ${bet}`;
        betVL.classList.remove("hidden");
        chips -= bet;
        stat -= bet;

        looses += 1;
        setTimeout(clearTrack, 3000);
        return;
    }
    else if (handVal == 21) {
        stayLoop()
    };

    //jsbApp.textUpdates.innerHTML = 
    return; 
};

// Кнопка "Стоп", с циклом
let stayLoop = function () {

    // Показываем сумму диллера
    dillerSUM.innerHTML = handTotal(dillerHand);
    doubleButBlock();
    stopButBlock();
    hitBlock();
    stayBlock();

    if (gameStatus === 0) //первое нажатие
    {
        // Показываем карту диллера
        showBruhCARD();
        gameStatus = 1; // Вход в цикл
        setTimeout(stayLoop, 750); 
    }
    else if (gameStatus === 1) {    

        // Если у диллера меньше 17, он берет еще
        let dillerVal = handTotal(dillerHand);
        if (dillerVal > 16 && dillerVal <= 21) // если у диллера больше 17 и меньше 21, идет сравнение
        {
            
            
            let playerVal = handTotal(playerHand);
            if (playerVal > dillerVal)
            {          
                dillerSTAND.innerHTML = `Ты победил, твоя рука больше!`;  
                betVL.innerHTML = `Получено фишек: ${bet}`;
                betVL.classList.remove("hidden");
                wins += 1;
                gameStatus = 2;
                chips += bet;
                stat += bet; 
                setTimeout(clearTrack, 3000);
                return;
            }
            else if (playerVal < dillerVal)
            {          
                dillerSTAND.innerHTML = `Ты проиграл, твоя рука меньше!`;  
                betVL.innerHTML = `Потеряно фишек: ${bet}`;
                betVL.classList.remove("hidden");
                looses +=1;
                gameStatus = 2;
                chips -= bet;
                stat -= bet; 
                setTimeout(clearTrack, 3000);
                return;
            }
            else
            {         
                dillerSTAND.innerHTML = "Ничья, ваши карты равны!"   
                gameStatus = 2;
                setTimeout(clearTrack, 3000);
                return;
            }
        }
        if (dillerVal > 21)
        {
            dillerSTAND.innerHTML = `Ты победил, у дилера перебор!`
            betVL.innerHTML = `Получено фишек: ${bet}`;
            betVL.classList.remove("hidden");
            wins += 1;
            chips += bet;
            stat += bet;
            gameStatus = 2;
            setTimeout(clearTrack, 3000);
            return;
        }
        else // диллер берет еще карту
        {
            dillerHand.push(deckM.shift())
            dillerPOS += 1;
            i2 += 1;

            drawDillerCARD();

            dillerSUM.innerHTML = handTotal(dillerHand);
            setTimeout(stayLoop, 750);
            return;
        }   
    }
};

let showSUMfunc = function() {
    if (showSUMCheck == 0) {
        showSUM.innerHTML = "Скрыть суммы карт Space)";
        playerHIDE.classList.remove("hidden");
        dillerHIDE.classList.remove("hidden");
        showSUMCheck = 1;
    }
    else {
        showSUM.innerHTML = "Показать суммы карт Space)";
        playerHIDE.classList.add("hidden");
        dillerHIDE.classList.add("hidden");
        showSUMCheck = 0;
    };
};

let doubleButFunc = function() {
    doubleButBlock();
    stopButBlock();
    hitBlock();
    stayBlock();
    bet = bet*2;
    bet2 = bet*2;
    betP.innerHTML = bet;
    // Даем игроку карту и показываем ее на странице
    playerHand.push(deckM.shift());
    playerPOS += 1;
    i1 += 1;

    drawPlayerCARD();

    playerSUM.innerHTML = handTotal(playerHand);
   
    //Проверяем не перебор ли у игрока, если да показываем карты диллера
    let handVal = handTotal(playerHand);
    if (handVal > 21)
    {
        hitBlock();
        stayBlock();

        showBruhCARD();
        dillerSUM.innerHTML = handTotal(dillerHand);
        
        dillerSTAND.innerHTML = `Ты проиграл, перебор!`;
        betVL.innerHTML = `Потеряно фишек: ${bet}`;
        betVL.classList.remove("hidden");
        chips -= bet;
        stat -= bet;

        looses += 1;
        setTimeout(clearTrack, 3000);
        return;
    }
    else if (handVal <= 21) {
        stayLoop()
    };

    //jsbApp.textUpdates.innerHTML = 
    return; 
};

let stopButFunc = function() {
    doubleButBlock();
    stopButBlock();
    hitBlock();
    stayBlock();
    showBruhCARD();



    dillerSTAND.innerHTML = `Ты отказался от игры и вернул половину ставки.`;
    betVL.innerHTML = `Потеряно фишек: ${Math.ceil(bet/2)}`;
    betVL.classList.remove("hidden");
    chips -= Math.ceil(bet/2);
    stat -= Math.ceil(bet/2);
    looses += 1;
    setTimeout(clearTrack, 3000);
    return;
};



setTimeout(turnON, 3000);

//Делаем массив изображений колоды
let keshDeck = [];
for (let m = 0; m < deckM.length; m++) {
    keshDeck.push(`../deck/${deckM[m]}.png`) 
};

//Делаем массив изображений фишек
let chips123 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200];

let keshChips = [];
for (let z = 0; z < chips123.length; z++) {
    keshChips.push(`../images/LuxeChips/${chips123[z]}.jpg`)
};

//Функция кеширования изображений
function preloadImages(array) {
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                // remove image from the array once it loaded
                // for memory consumption reasons
                list.splice(index, 1);
            }
        }
        list.push(img);
        img.src = array[i];
    }
};

//Врубаем
preloadImages(keshDeck);
preloadImages(keshChips);


