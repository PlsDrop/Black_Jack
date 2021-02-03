// Делаем глобальную переменную для колоды 
var deck = {
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

// Объявляем переменные полей победы/поражения
let winsP = document.getElementById('wins');
let loosesP = document.getElementById('looses');

// Объявляем переменные для текущего статуса игры, для руки диллера/руки игрока и т.д. 
var gameStatus = 0;
let dellerHand = [];
let playerHand = [];
let wins = 0;
let games = 0; 
let i1 = 0;

// Объявляем переменные для управления позицией карт в CSS
let playerPOS = 0;
let dillerPOS = 0;

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
var newGame = function () {

    // Убираем/показываем кнопки после начала игры
    NG.style.visibility = "hidden";
    hit.style.visibility = "visible";
    stay.style.visibility = "visible";

    // Сбрасываем все значения
    dillerSUM.innerHTML = "0";
    playerSUM.innerHTML = "0";
    playerHand = [];
    dealerHand = [];
    gameStatus = 0;
    playerPOS = 0;
    dillerPOS = 0;
    i1 = 0;

    // Делаем масив ключей колоды
    deckM = Object.keys(deck);

    // Тасуем колоду
    shuffle(deckM);

    // Берем игроку 2 карты и показываем их в CSS
    playerPOS += 1;
    playerHand.push(deckM.shift());

    playerCARD = document.getElementById(`playerCARD${playerPOS}`);
    playerCARD.style.background = `url("../deck/${playerHand[i1]}.png") center no-repeat`;
    playerCARD.style.backgroundSize = "cover";


    playerPOS += 1;
    playerHand.push(deckM.shift());
    
    i1 += 1;

    playerCARD = document.getElementById(`playerCARD${playerPOS}`);
    playerCARD.style.background = `url("../deck/${playerHand[i1]}.png") center no-repeat`;
    playerCARD.style.backgroundSize = "cover";


    // Проверяем не победил ли игрок при первой раздаче
    if (handTotal(playerHand) === 21)
    {
        wins += 1;
        games += 1;        
        gameStatus = 1; // маркер что бы скрыть карты диллера
        //textUpdates.innerHTML = "Ты победил, в стартовой руке 21!";
        track();
        gameStatus = 2; // маркер что игра выиграна 
        return;
    }
};

// Функция подсчета суммы карт в руке игрока
var handTotal = function (hand) {
    //console.log("Checking hand value");
    var total = 0;
    var aceFlag = 0; // Отслеживем количество тузов в руке
    for (var i = 0; i < hand.length; i++) {
        //console.log("Card: " + hand[i].name);
        total += deck[hand[i]];
        if (deck[hand[i]] == 1)
        {
            aceFlag += 1;
        }
    }

    // Для каждого туза в руке добавляем 10 к сумме карт, если это не вызовет перебор
    for (var j = 0; j < aceFlag; j++)
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
var track = function () {
    winsP.innerHTML = wins;
    //loosesP.innerHTML =
    NG.style.visibility = "visible";
    hit.style.visibility = "hidden";
    stay.style.visibility = "hidden";
}

// Назначаем на кнопку новой игры соответсвующую функцию
NG.addEventListener("click", newGame);

