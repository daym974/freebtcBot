// ==UserScript==
// @name         Autobet
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       Daym
// @match        https://freebitco.in/?op=home
// @grant        none
// ==/UserScript==


/**
switchBet
@param String value ('hi','lo','alternate')
Coche le bet choisi
*/
function switchBet(value){
	$('#autobet_bet_' + value).get(0).click();
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

var counter = 0;

changeRollCount(20);
switchBet('alternate');
$(document).ready(function(){
	onLoseConf();
});

setInterval(function(){ 

	if(counter < 300000){
		
	if(counter < 100000){
		changeBet('hi');
	}else if(100000 < counter <200000){
		changeBet('lo');
	}else
		changeBet('alternate');


		$('#start_autobet').get(0).click();
		counter+=6500;
	}else{
		alert('Game finished. Please wait before relauching autobet...');
	}
},6500);
}


main();

