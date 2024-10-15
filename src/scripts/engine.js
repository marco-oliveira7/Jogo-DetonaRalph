const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector("enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lifes: document.querySelector("#lifes"),
    },
    values: {
        gameVelocity: 1000,
        hitposition: 0,
        result: 0,
        lifesRemaning: 3,
        currentTime: 10,
    },
    action: {
        countDownTimerId: setInterval(countDown, 1000),
        //1º maneira de mover o enemy
        timerId: setInterval(randomSquare, 1000),
    }
};
    function countDown() {
        state.values.currentTime--;
        state.view.timeLeft.textContent = state.values.currentTime;
        if (state.values.currentTime <= 0) {
            clearInterval(state.action.countDownTimerId)
            clearInterval(state.action.timerId)
            state.values.lifesRemaning--
            state.view.lifes.textContent = state.values.lifesRemaning;
            alert('Game Over! O seu resultado foi: ' + state.values.result);
        }
    }

    function playSound(audioName) {
        let audio = new Audio(`./src/sounds/${audioName}.m4a`)
        audio.volume = 0.1;
        audio.play();
    }

    function randomSquare() {
        state.view.squares.forEach((square) => {
            square.classList.remove("enemy");
        })

        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = state.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
        state.values.hitposition = randomSquare.id;

    }

    //2º maneira de mover o enemy
    // function moveEnemy(){
    //     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
    // }

    function addListenerHitBox() {
        state.view.squares.forEach((square) => {
            square.addEventListener("mousedown", () => {
                if (square.id === state.values.hitposition) {
                    playSound("hit");
                    state.values.result++
                    state.view.score.textContent = state.values.result;
                    state.values.hitposition = null;
                }

            })
        });
    }

    function init() {
        //moveEnemy();
        addListenerHitBox();
    }

    init();
