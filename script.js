'use strict'

const playerOne = document.querySelector('.player-1');
const playerTwo = document.querySelector('.player-2');
const btnAgain = document.querySelector('.play-again');
const btnRoll = document.querySelector('.roll-dice');
const btnHold = document.querySelector('.hold-score');
const finalP1 = document.querySelector('.p1-final');
const finalP2 = document.querySelector('.p2-final');
const currentP1 = document.querySelector('.p1-current');
const currentP2 = document.querySelector('.p2-current');
const diceImg = document.querySelector('.dice');


// initial states 
playerOne.classList.add('current-player-1');
diceImg.classList.add('hidden');
let player_active = 1;

// dice roll 
btnRoll.addEventListener('click', ()=>{
    // random number generator
    var number = Math.trunc(Math.random()*6) + 1;
    // console.log(number);

    // diasplay image 
    diceImg.classList.remove('hidden');
    diceImg.src = `images/dice_${number}.png`;

    // check 1. if one switch player else add to current score 
    if(number != 1){
        if(give_current_player()){
            let score_curr = Number(currentP1.textContent);
            score_curr = score_curr+number;
            currentP1.textContent = score_curr;
        }
        else{
            let score_curr = Number(currentP2.textContent);
            score_curr = score_curr+number;
            currentP2.textContent = score_curr;
        }
        
    }
    else{
        if(give_current_player()){
            currentP1.textContent = 0; 
            activatePlayerTwo();
        }
             
        else{
            currentP2.textContent = 0;
            activatePlayerOne();
        }
            
    }
})



const activatePlayerOne = ()=>{
    playerOne.classList.add('current-player-1');
    playerTwo.classList.remove('current-player-2');
    player_active = 1;

}

const activatePlayerTwo = ()=>{
    playerOne.classList.remove('current-player-1');
    playerTwo.classList.add('current-player-2');
    player_active = 2;
}

function give_current_player(){
    if(player_active == 1)
        return true;
    return false;
}

// hold score 
btnHold.addEventListener('click', ()=>{
    console.log('a');

    var high = 0;
    var cur =0 ;
    console.log(give_current_player());
    if(give_current_player()){
        high = Number(finalP1.textContent);console.log(high)
        cur = Number(currentP1.textContent);
        high += cur;
        finalP1.textContent = high;
        currentP1.textContent = 0;
        // check victory
        victory(high);
        activatePlayerTwo();
        high = cur =0;
    }
    else{
        console.log('ennt');
         high = Number(finalP2.textContent);
        console.log(high)
         cur = Number(currentP2.textContent);
        high += cur;
        finalP2.textContent = high;
        console.log(finalP2.textContent);
        currentP2.textContent = 0;
        // check victory
        victory(high);
        activatePlayerOne();
        high = cur =0;

    }
})

const victory = (n)=>{
    if(n>=100){
        btnRoll.disabled = true
        btnHold.disabled = true

        if(give_current_player()){
           
            playerOne.classList.add('victory-player-1')
        }
        else{
            playerOne.classList.add('victory-player-2')
        }
    }
    
}

// again button
btnAgain.addEventListener('click', ()=>{
    playerOne.classList.add('current-player-1');
    playerOne.classList.remove('victory-player-1');
    playerTwo.classList.remove('current-player-2');
    playerTwo.classList.remove('victory-player-2');
    diceImg.classList.add('hidden');
    player_active = 1;
    finalP1.textContent = 0;
    finalP2.textContent = 0;
    currentP1.textContent = 0;
    currentP2.textContent = 0;
    btnRoll.disabled = false
    btnHold.disabled = false
})