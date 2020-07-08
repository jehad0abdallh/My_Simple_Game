var playing=false;
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
var timeremaining;
let circleTurn;
//a7tmlat win 
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = winningMessageElement.querySelector('[data-winning-message-text]');
const cellElements = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const board = document.getElementById('board');

document.getElementById("startreset").onclick = startGame();
restartButton.addEventListener('click', startGame)
    function startGame()  {
        show("timeremaining");
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        startCountdown()
        winningMessageElement.classList.remove('show')
        circleTurn = false
        cellElements.forEach(cell => {
          cell.classList.remove(X_CLASS)
          cell.classList.remove(CIRCLE_CLASS)
          cell.removeEventListener('click',  handelClick)
          cell.addEventListener('click',  handelClick, { once: true })
        })
        setBoardHoverClass()
      }

function handelClick(e)
{
    let cell=e.target;
    let currentCless =circleTurn? CIRCLE_CLASS: X_CLASS;
    placeMark(cell, currentCless)
    if (isWin(currentCless))
    {
        
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Win!`
    winningMessageElement.classList.add('show')   
    }
    else if(isDraw())
    { winningMessageTextElement.innerText = 'Draw!'
      winningMessageElement.classList.add('show')

    }
    else{
 //swaping 
 circleTurn = !circleTurn;
 //for Desgine hover
 setBoardHoverClass()
    }
   

}
function isDraw() {
    return [...cellElements].every(cell => {
      return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
  }
function isWin(classToCheck) {
    return WINNING_COMBINATIONS.some(c => {
      return c.every(index => {
        return cellElements[index].classList.contains(classToCheck)
      })
    })
  }
function placeMark(cell, classToAdd) {
    cell.classList.add(classToAdd)
  }
  function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if (circleTurn) {
      board.classList.add(CIRCLE_CLASS)
    } else {
      board.classList.add(X_CLASS)
    }
  }
  function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;


        if (timeremaining == 0) {     
           
            stopCountdown();
           
            hide("timeremaining");
            winningMessageTextElement.innerText = 'Draw!'
            winningMessageElement.classList.add('show')


            
        }
    }, 1000);
}

function stopCountdown() {
    clearInterval(action);
}

function hide(Id) {
    document.getElementById(Id).style.display = "none";
}

function show(Id) {
    document.getElementById(Id).style.display = "block";
}
