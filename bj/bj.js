// Делаем глобальную переменную для колоды 
let deck = {
B2: 2, B3: 3, B4: 4, B5: 5, B6: 6, B7: 7, B8: 8, B9: 9, B10:10, B11:10, B12:10, B13:10, B14:1,
H2: 2, H3: 3, H4: 4, H5: 5, H6: 6, H7: 7, H8: 8, H9: 9, H10:10, H11:10, H12:10, H13:10, H14:1,
P2: 2, P3: 3, P4: 4, P5: 5, P6: 6, P7: 7, P8: 8, P9: 9, P10:10, P11:10, P12:10, P13:10, P14:1,
T2: 2, T3: 3, T4: 4, T5: 5, T6: 6, T7: 7, T8: 8, T9: 9, T10:10, T11:10, T12:10, T13:10, T14:1,
}

// Объявляем переменную для ключей колоды, для дальнейших манипуляций
let deckM = [];

// Объявляем переменные всех кнопок
let hit = document.getElementById('hit');
let stay = document.getElementById('stay');
let NG = document.getElementById('NG');
let hitstay = document.getElementById('hitstay');

// Объявляем переменные полей победы/поражения/суммы карт
let winsP = document.getElementById('wins');
let loosesP = document.getElementById('looses');
let dillerHIDE = document.getElementById('dillerHIDE');
let playerHIDE = document.getElementById('playerHIDE');

// Объявляем переменные для текущего статуса игры, для руки диллера/руки игрока и т.д. 
let gameStatus = 0;
let dillerHand = [];
let playerHand = [];
let wins = 0;
let looses = 0;
let games = 0; 


// Объявляем переменные для управления позицией карт в CSS
let playerPOS = 0;
let dillerPOS = 0;
let i1 = 0;
let i2 = 0;

// Объявляем переменные полей суммы карт для диллера и игрока
let dillerSUM = document.getElementById('dillerSUM');
let playerSUM = document.getElementById('playerSUM');

// Блоки для карт в CSS
let dillerCARD;
let playerCARD;


// Функция перетасовки массива
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

// Функция для начала новой игры
let newGame = function () {

    // Показываем поля сумм карт
    dillerHIDE.classList.remove("hidden");
    playerHIDE.classList.remove("hidden");

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

    
    
    // Делаем масив ключей колоды
    deckM = Object.keys(deck);

    // Тасуем колоду
    shuffle(deckM);

    // Берем игроку и диллеру 2 карты и показываем их на странице 
    //setTimeout(() => console.log(''), 1000);
    playerHand.push(deckM.shift())
    playerPOS += 1;
    

    playerCARD = document.getElementById(`playerCARD${playerPOS}`);
    playerCARD.style.background = `url("../deck/${playerHand[i1]}.png") center no-repeat`;
    playerCARD.style.backgroundSize = "cover";

    playerSUM.innerHTML = handTotal(playerHand);
    
    //setTimeout(() => console.log(''), 1000);
    dillerHand.push(deckM.shift())
    dillerPOS += 1;
    

    dillerCARD = document.getElementById(`dillerCARD${dillerPOS}`);
    dillerCARD.style.background = `url("../deck/${dillerHand[i2]}.png") center no-repeat`;
    dillerCARD.style.backgroundSize = "cover";
    
    dillerSUM.innerHTML = deck[dillerHand[0]];
    if (deck[dillerHand[0]] === 1 ) {
        dillerSUM.innerHTML = 11;
    };

    //setTimeout(() => console.log(''), 1000);
    playerHand.push(deckM.shift())
    playerPOS += 1;
    i1 += 1;

    playerCARD = document.getElementById(`playerCARD${playerPOS}`);
    playerCARD.style.background = `url("../deck/${playerHand[i1]}.png") center no-repeat`;
    playerCARD.style.backgroundSize = "cover";

    playerSUM.innerHTML = handTotal(playerHand);

    //setTimeout(() => console.log(''), 1000);
    dillerHand.push(deckM.shift())
    dillerPOS += 1;
    i2 += 1;

    dillerCARD = document.getElementById(`dillerCARD${dillerPOS}`);
    dillerCARD.style.background = `url("../deck/bruh.png") center no-repeat`;
    dillerCARD.style.backgroundSize = "cover";
    

    // Проверяем не победил ли игрок при первой раздаче
    if (handTotal(playerHand) === 21)
    {
        wins += 1;
        track();

        //games += 1;        
        //gameStatus = 1; // маркер что бы скрыть карты диллера
        //textUpdates.innerHTML = "Ты победил, в стартовой руке 21!";
        //gameStatus = 2; // маркер что игра закончена
        return;
    }

    

    // Проверяем не победил ли диллер при первой раздаче
    if (handTotal(dillerHand) === 21)
    {

        dillerCARD = document.getElementById(`dillerCARD${dillerPOS}`);
        dillerCARD.style.background = `url("../deck/${dillerHand[1]}.png") center no-repeat`;
        dillerCARD.style.backgroundSize = "cover";
        dillerSUM.innerHTML = handTotal(dillerHand);
        
        looses += 1;
        track();

        //games += 1;        
        //gameStatus = 1; // маркер что бы скрыть карты диллера
        //textUpdates.innerHTML = "Ты проиграл, в стартовой руке диллера 21!";
        //gameStatus = 2; // маркер что игра закончена 
        return;
    }
    
    // Убираем/показываем кнопки и поля если никто не выиграл с первой раздачи
    NG.classList.add("hidden");
    hitstay.classList.remove("hidden");

};

// Функция очистки страницы от карт
let clearPAGE = function(hand1, hand2) {
    for (let i = 0; i < hand1.length; i++) {
        playerCARD = document.getElementById(`playerCARD${i+1}`);
        playerCARD.style.background = '';
        playerCARD.style.backgroundSize = '';
    }
    for (let j = 0; j < hand2.length; j++) {
        dillerCARD = document.getElementById(`dillerCARD${j+1}`);
        dillerCARD.style.background = '';
        dillerCARD.style.backgroundSize = '';
    }
};

// Функция подсчета суммы карт
let handTotal = function (hand) {
    //console.log("Checking hand value");
    let total = 0;
    let aceFlag = 0; // Отслеживем количество тузов в руке
    for (let i = 0; i < hand.length; i++) {
        //console.log("Card: " + hand[i].name);
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
    
    // console.log("Total: " + total);
    return total;
};

// Функция для обновления счетчика побед/поражений и отображения кнопки новой игры 
let track = function () {
    winsP.innerHTML = wins;
    loosesP.innerHTML = looses;
    NG.classList.remove("hidden");
    hitstay.classList.add("hidden");
}

// Назначаем на кнопку новой игры соответсвующую функцию
NG.addEventListener("click", newGame);

// Кнопка "Еще"
hit.addEventListener("click", function () {
    
    // Даем игроку карту и показываем ее на странице
    playerHand.push(deckM.shift())
    playerPOS += 1;
    i1 += 1;

    playerCARD = document.getElementById(`playerCARD${playerPOS}`);
    playerCARD.style.background = `url("../deck/${playerHand[i1]}.png") center no-repeat`;
    playerCARD.style.backgroundSize = "cover";

    playerSUM.innerHTML = handTotal(playerHand);
   
    //Проверяем не перебор ли у игрока, если да показываем карты диллера (ваще в оригинале диллер не показывает карты при переборе, но так интереснее)
    let handVal = handTotal(playerHand);
    if (handVal > 21)
    {
        dillerCARD = document.getElementById(`dillerCARD${dillerPOS}`);
        dillerCARD.style.background = `url("../deck/${dillerHand[1]}.png") center no-repeat`;
        dillerCARD.style.backgroundSize = "cover";
        dillerSUM.innerHTML = handTotal(dillerHand);
        
        looses += 1;
        track();
        return;
    }
    //Проверяем не победил ли игрок
    else if (handTotal(playerHand) === 21)
    {
        wins += 1;
        track(); 
        //games += 1;       
        //gameStatus = 1; // маркер что бы скрыть карты диллера
        //textUpdates.innerHTML = "Ты победил, в стартовой руке 21!";
        //gameStatus = 2; // маркер что игра закончена
        return;
    }
    //jsbApp.textUpdates.innerHTML = 
    return; 
});



// Кнопка "Стоп", с циклом
stay.addEventListener("click", function stayLoop() {
    
    
    
    // Показываем сумму диллера
    dillerSUM.innerHTML = handTotal(dillerHand);
    

    if (gameStatus === 0) //первое нажатие
    {
        // Показываем карту диллера
        dillerCARD = document.getElementById(`dillerCARD${dillerPOS}`);
        dillerCARD.style.background = `url("../deck/${dillerHand[1]}.png") center no-repeat`;
        dillerCARD.style.backgroundSize = "cover";
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
            wins += 1;
            gameStatus = 2;
            track();
            return;
        }
        else if (playerVal < dillerVal)
        {            
            looses +=1;
            gameStatus = 2;
            track();
            return;
        }
        else
        {            
            gameStatus = 2;
            track();
            return;
        }
    }
    if (dillerVal > 21)
    {
        wins += 1;
        gameStatus = 2;
        track();
        return;
    }
    else // диллер берет еще карту
    {
        dillerHand.push(deckM.shift())
        dillerPOS += 1;
        i2 += 1;

        dillerCARD = document.getElementById(`dillerCARD${dillerPOS}`);
        dillerCARD.style.background = `url("../deck/${dillerHand[i2]}.png") center no-repeat`;
        dillerCARD.style.backgroundSize = "cover";
        dillerSUM.innerHTML = handTotal(dillerHand);
        setTimeout(stayLoop, 750);
        return;
    }   
    }
});