// ==UserScript==
// @name         Autobet
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://freebitco.in/?op=home
// @grant        none
// ==/UserScript==


/**
switchBet
@param String value ('HI','LO','ALTERNATE')
Coche le bet choisi
*/
function switchBet(value){
	$('#autobet_bet_' + newValue).get(0).click();
}

/**
startBet
Click sur le bouton 'START_AUTO_BET'
*/
function startBet(){

	$('#start_autobet').get(0).click();
}


/**
Change la valeur max
@param Float value 
*/
function changeMaxBet(value){
	$('#autobet_max_bet').val(value);
}


/**
Passage vers augmentation du bet de 100% en cas de loose

*/
function onLoseConf(){
	$('#autobet_lose_increase_bet_percent').val(100);
	$('#autobet_lose_increase_bet').get(0).click();
}

/**
Change la valeur du pari
@param Float value 
*/
function changeBet(value){
	$('#autobet_base_bet').val(value);
}

/**
Change le nombre de répétitions
@param Float value 
*/
function changeRollCount(value){
$('#autobet_roll_count').val(value);
}


/**
main
Déroulement des fonctions
*/
function main(){

changeRollCount(20);
switchBet('alternate');
$(document).ready(function(){
	onLoseConf();
});
}


main();

setInterval(function(){ 

startBet();
    
}, 6500);
