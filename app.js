let log = console.log;

let box = document.querySelector('.box');
let cells = document.querySelectorAll('[data-id]');
let rslt = document.querySelector('.rslt');
let title = document.querySelector('.rslt__title');
let btn = document.querySelector('.rslt__btn');


let start;
let x = "x";
let o = "o";
arr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


btn.onclick = restart;
startGame();
function startGame() {
    start = false;
    box.classList.remove(x);
    box.classList.remove(o);
    cells.forEach(function (cell) {
        cell.classList.remove(x);
        cell.classList.remove(o);
        cell.removeEventListener('click',add);
        cell.addEventListener('click',add,{once: true});
    })
    placeMark();
}

function add() {
    let cell = this;
    let currentClass = start ? o : x;

    addClass(cell,currentClass);
    
    if (winner(currentClass)) {
        log('win')
        endGame(false);
    } else if (isDraw()){
        endGame(true);
    } else {
        changeTurns();
        placeMark(currentClass);
    }
}

function addClass(ele,c) {
    ele.classList.add(c);
}

function winner(clas) {
    return arr.some(a => {
        return a.every(index => {
            return cells[index].classList.contains(clas);
        })
    })
}

function isDraw() {
   return [...cells].every(el => {
        return el.classList.contains(x) || el.classList.contains(o)
    })
} 

function endGame(b) {
    if (b) {
        title.innerHTML = 'Draw !';
    } else {
        title.innerHTML = `${start ? "O's": "X's"} Winner!`;
    }
    rslt.classList.add('show');
}

function changeTurns() {
    start = !start;
}

function placeMark() {
    if (start) {
        box.classList.remove(x);
        box.classList.add(o);
    } else {
        box.classList.remove(o);
        box.classList.add(x);
    }
}

function restart() {
    rslt.classList.remove('show');
    startGame();
}

