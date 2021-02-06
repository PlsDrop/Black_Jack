


let deckM = Object.keys(deck);
shuffle(deckM);
let nextCard = '';


nextCard = deckM.shift();
dillerCARD1.style.background = `url("../deck/${nextCard}.png") center no-repeat`;
dillerCARD1.style.backgroundSize = "cover";
diller1=nextCard;

nextCard = deckM.shift();
dillerCARD2.style.background = `url("../deck/рубаха.png") center no-repeat`;
dillerCARD2.style.backgroundSize = "cover";
diller2=nextCard;

dillerSUM.innerHTML = deck[diller1];
if (deck[diller1] == 1) { 
    if (deck[diller1] < 12) {dillerSUM.innerHTML = 11};
};




nextCard = deckM.shift();
playerCARD1.style.background = `url("../deck/${nextCard}.png") center no-repeat`;
playerCARD1.style.backgroundSize = "cover";
player1=deck[nextCard];

nextCard = deckM.shift();
playerCARD2.style.background = `url("../deck/${nextCard}.png") center no-repeat`;
playerCARD2.style.backgroundSize = "cover";
player2=deck[nextCard];


let playerS = player1 + player2;
playerSUM.innerHTML = playerS;
console.log(player1 + ' ' + player2 + ' ' + playerS);
if (player1 == 1 && playerS < 12) {playerS = 11 + player2; playerSUM.innerHTML = playerS; player1 = 11};
console.log(player1 + ' ' + player2 + ' ' + playerS);
if (player2 == 1 && playerS < 12) {playerS = player1 + 11; playerSUM.innerHTML = playerS; player2 = 11};
console.log(player1 + ' ' + player2 + ' ' + playerS);

let playerHAND = [player1, player2];

hit.onclick = () => {
    ++playerPOS
    let playerCARD = document.getElementById(`playerCARD${playerPOS}`);
    nextCard = deckM.shift();

    eval(`let player${playerPOS} = nextCard;`);

    playerCARD.style.background = `url("../deck/${nextCard}.png") center no-repeat`;
    playerCARD.style.backgroundSize = "cover";

    nextCard = deck[nextCard];
    

    let bruh = 0;
    let check = 0;
    playerS = playerS + nextCard;
    playerSUM.innerHTML = playerS;
    if (nextCard == 1 && playerS < 12) {playerS = playerS + 10; playerSUM.innerHTML = playerS; nextCard = 11};

    playerHAND.push(nextCard); 

    if (playerS > 21) {
        playerHAND.forEach((item) => {if (item == 11){item=1; check = 1}})
        player 
        console.log('check: ' + check);
        console.log('playerHAND: ' + playerHAND);
        if (check == 1) {
            playerHAND.forEach((item) => {bruh += item; playerS= bruh; console.log('bruh: ' + bruh);}); 
            playerSUM.innerHTML = playerS;
            console.log('playerS: ' + playerS)
            
        };
    };
};


//shuffle(deck);

//alert(deck.shift());
