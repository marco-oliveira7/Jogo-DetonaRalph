const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector("enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitposition: 0,
        result: 0,
    },
};

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitposition = randomSquare.id;
    
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitposition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitposition = null;
            }
        })
    });
}

function init() {
    moveEnemy();
    addListenerHitBox();
}

init();
