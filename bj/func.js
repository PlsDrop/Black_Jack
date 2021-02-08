// Тут я объявляю всякие мелкие функции что бы не забивать основной скрипт

// clearPAGE + track
let clearTrack = function() {
    clearPAGE(playerHand, dillerHand);
    track();
};

// Разблокировка кнопок 
let betMAXUnblock = function() {
    betMAX.disabled = false;
    betMAX.style.color = "rgba(243, 175, 66, 0.95)";
    blockBetMAX = 1;
};
let betPlusUnblock = function() {
    betPlus.disabled = false;
    betPlus.style.color = "rgba(243, 175, 66, 0.95)";
    blockBetPlus = 1;
};
let betMinusUnblock = function() {
    betMinus.disabled = false;
    betMinus.style.color = "rgba(243, 175, 66, 0.95)";
    blockBetMinus = 1;
};
let NGUnblock = function() {
    NG.disabled = false;
    NG.style.color = "rgba(243, 175, 66, 0.95)";
    blockNG = 1;
};
let hitUnblock = function() {
    hit.disabled = false;
    hit.style.color = "rgba(243, 175, 66, 0.95)";
    blockHIT = 1;
};
let stayUnblock = function() {
    stay.disabled = false;
    stay.style.color = "rgba(243, 175, 66, 0.95)";
    blockSTAY = 1;
};
let stopButUnblock = function() {
    stopBut.disabled = false;
    stopBut.style.color = "rgba(243, 175, 66, 0.95)";
    blockStopBut = 1;
};
let doubleButUnblock = function() {
    doubleBut.disabled = false;
    doubleBut.style.color = "rgba(243, 175, 66, 0.95)";
    blockDoubleBut = 1;
};

// Блокировка кнопок
let betMAXBlock = function() {
    betMAX.style.color = "rgba(243, 175, 66, 0.5)";
    betMAX.disabled = true;
    blockBetMAX = 0;
};
let betPlusBlock = function() {
    betPlus.style.color = "rgba(243, 175, 66, 0.5)";
    betPlus.disabled = true;
    blockBetPlus = 0;
};
let betMinusBlock = function() {
    betMinus.style.color = "rgba(243, 175, 66, 0.5)";
    betMinus.disabled = true;
    blockBetMinus = 0;
}; 
let NGBlock = function() {
    NG.style.color = "rgba(243, 175, 66, 0.5)";
    NG.disabled = true;
    blockNG = 0;
};
let hitBlock = function() {
    hit.style.color = "rgba(243, 175, 66, 0.5)";
    hit.disabled = true;
    blockHIT = 0;
};
let stayBlock = function() {
    stay.style.color = "rgba(243, 175, 66, 0.5)";
    stay.disabled = true;
    blockSTAY = 0;
};
let stopButBlock = function() {
    stopBut.style.color = "rgba(243, 175, 66, 0.5)";
    stopBut.disabled = true;
    blockStopBut = 0;
};
let doubleButBlock = function() {
    doubleBut.style.color = "rgba(243, 175, 66, 0.5)";
    doubleBut.disabled = true;
    blockDoubleBut = 0;
};


// Показываем количество фишек, ставку, статистику
let showALLstat = function() {
    betP.innerHTML = bet;
    chipsP.innerHTML = chips;
    statP.innerHTML = stat;
};

// Рисуем фишки
let drawChips = function() {
    chipsIMG.src = `../images/LuxeChips/${bet}.jpg`;
};

let drawDillerCARD = function() {
    dillerCARD = document.getElementById(`dillerCARD${dillerPOS}`);
    dillerCARD.style.background = `url("../deck/${dillerHand[i2]}.png") center no-repeat`;
    dillerCARD.style.backgroundSize = "contain";
    dillerCARD.classList.remove("hidden");
}; 
let showBruhCARD = function() {
    dillerCARD = document.getElementById(`dillerCARD${dillerPOS}`);
    dillerCARD.style.background = `url("../deck/${dillerHand[1]}.png") center no-repeat`;
    dillerCARD.style.backgroundSize = "contain";
    dillerCARD.classList.remove("hidden");
};

let drawPlayerCARD = function() {
    playerCARD = document.getElementById(`playerCARD${playerPOS}`);
    playerCARD.style.background = `url("../deck/${playerHand[i1]}.png") center no-repeat`;
    playerCARD.style.backgroundSize = "contain";
    playerCARD.classList.remove("hidden");
};

//Включение стартовых кнопок и назначение функций
let turnON = function() {
    stay.addEventListener("click", stayLoop);
    hit.addEventListener("click", hitClick);

    document.addEventListener('keyup', (e) =>{

        if (e.key == "w" || e.key == "W" || e.key == "ц" || e.key == "Ц") {
            if (blockNG == 1) {
                newGame();
            }
            else if (blockDoubleBut == 1) {
                doubleButFunc();
            };
        }
        else if (e.key == "e" || e.key == "E" || e.key == "у" || e.key == "У") {
            if (blockBetPlus == 1) {
                betPlusFunc();
            }
            else if (blockHIT == 1) {
                hitClick();
            };
        }
        else if (e.key == "q" || e.key == "Q" || e.key == "й" || e.key == "Й") {
            if (blockBetMinus == 1){
                betMinusFunc();
            }
            else if (blockSTAY == 1){
                stayLoop();
            };
        }
        else if (e.key == "s" || e.key == "S" || e.key == "ы" || e.key == "Ы") {
            if (blockBetMAX == 1){
                betMAXFunc();
            }
            else if (blockStopBut == 1){
                stopButFunc();
            };
        }
        else if (e.key == " ") {
            showSUMfunc();
        };
    });

    betPlus.addEventListener("click", betPlusFunc);
    betMinus.addEventListener("click", betMinusFunc);
    betMAX.addEventListener("click", betMAXFunc);
    NG.addEventListener("click", newGame);
    showSUM.addEventListener("click", showSUMfunc);
    doubleBut.addEventListener("click", doubleButFunc);
    stopBut.addEventListener("click", stopButFunc);

    showSUM.style.color = "rgba(243, 175, 66, 0.95)";
    NGUnblock();
    betPlusUnblock();
    betMAXUnblock();
};