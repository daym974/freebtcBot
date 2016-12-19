// ==UserScript==
// @name         Autobet
// @namespace    Autobet script
// @version      0.3
// @description  freebitco.in auto bet player. 
// @author       Daym
// @match        https://freebitco.in/?op=home
// @grant        none
// ==/UserScript==


var playing = true; //savoir si autobet tourne ou pas

/**
switchBet
@param String value ('hi','lo','alternate')
Coche le bet choisi
*/
function switchBet(value){
    $('#autobet_bet_' + value).get(0).click();
    console.log("Bet switched to " + value + "\n");
}

/**
startBet
Click sur le bouton 'START_AUTO_BET'
*/
function startBet(){

    $('#start_autobet').get(0).click();
    console.log("Bet has started\n");
}


/**
Change la valeur max
@param Float value
*/
function changeMaxBet(value){
    $('#autobet_max_bet').val(value);
    console.log("Max bet switched to " + value + "\n");
}


/**
Passage vers augmentation du bet de 100% en cas de loose
*/
function onLoseConf(){
    $('#autobet_lose_increase_bet_percent').val(100);
    $('#autobet_lose_increase_bet').get(0).click();
    console.log("Config on lose done\n");
}

/**
Change la valeur du pari
@param Float value
*/
function changeBet(value){
    $('#autobet_base_bet').val(value);
    console.log("Bet changed to " + value + "\n");
}

/**
Change le nombre de répétitions
@param Float value
*/
function changeRollCount(value){
    $('#autobet_roll_count').val(value);
    console.log("Roll count set to " + value +"\n");
}

/**
Retourne la balance actuelle
*/
function getBalance(){
    return parseFloat($('#balance').text());
}

/**
Retourne la valeur actuelle du bet
*/
function getBet(){
    return parseFloat($('#autobet_base_bet').val());
}

/**
Calcule le max de répétitions possibles en fonction de la balance
*/
function maxRolls(){
    var balance = getBalance();
    var bet = getBet();
    var count = 0;

    while(bet < balance){
        bet *= 2;
        count+=1;
    }
    count = parseInt(count/3);
    console.log("Max rolls: " + count + "\n");
    if(count < 10){
        alert("Not enough funds to use autobet! You need to reach 10 rolls at least!");
        playing = false;
    }
    return count;
}


/**
Procède aux calculs nécessaires pour démarrer autobet
*/
function init(){
    $(document).ready(function(){
        onLoseConf();
    });
    changeRollCount(maxRolls());
}

/**
Choisit aléatoirement le type de bet
*/
function randomBet(){
    var min = 1;
    var max = 10;
    var res = parseInt(Math.random() * (max - min) + min);
    if(res % 2 == 0){
        switchBet('alternate');
    }else if(res % 3 == 0){
        switchBet('lo');
    }else{
        switchBet('hi');
    }
}



/**
startAutobet
Déroulement des fonctions
*/
function startAutobet(){
    var balanceDebut = getBalance(); //pour avoir les profits après
    var counter = 0; //timer pour l'intervalle
    var remaining = 0; //restant
    var attente = 1000;
    init();

    console.log("Balance: " + getBalance() + "\n");


    setInterval(function(){
        remaining = parseInt($('#rolls_remaining_count').text());
        if(playing && remaining == 0){
            if(counter < 300000){
                randomBet();
                startBet();
                counter+=6500;
            }else{
                playing = false;
                alert('Game finished. Please wait before relauching autobet...');
                console.log("Balance: " + getBalance() + "\n");
                var balanceFin = getBalance();
                var profit = balanceFin - balanceDebut;
                console.log("Profit: " + profit + "\n");
            }
        }else if(remaining != 0){
            attente+=1000;
        }
    },attente);


}

/**

  /''''''\
~|Démarrage''>
   (.)   (.)

*/
if(confirm("Do you want to start autobet?"))
    startAutobet();
