let width, height, board, currentShipNum, currentShip, placedShips, placedShipsCount, ships, shipArr, allShipsPlaced, ship1, ship2, ship3, ship4, ship5, shipsHidden, validPos, isHorizontal, isVertical, computerBoard, positions, turn, playerHitCount, compHitCount, squareEls, squareEls2, playerSquare, computerSquare
const img1 = '🦌'
const img2 = '🛷'
const img3 = '🥛'
const img4 = '🍪'
const img5 = '🔔'
const playGame = document.getElementById("play-game");
const playerBoardEle = document.getElementById('player1')
const computerBoardEle = document.getElementById('computer');
const messageEl = document.getElementById("message1");
const messageEl2 = document.getElementById("message2");
const hideBtn = document.getElementById("hide-board");
const resetBtnEl = document.querySelector('#reset');

playGame.addEventListener('click', handleBtnClick)

function handleBtnClick(){
  positions = []
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      positions.push(row, col);
      playerSquare = document.createElement('div');
      playerSquare.setAttribute('class', 'sqr1');
      playerSquare.setAttribute('id', `${row}` + `${col}`);
      playerBoardEle.appendChild(playerSquare);
      computerSquare = document.createElement('div');
      computerSquare.setAttribute('class', 'sqr2');
      computerSquare.setAttribute('id', `${row}` + `${col}_`);
      computerBoardEle.appendChild(computerSquare);
    }
  }
  squareEls = document.querySelectorAll(".sqr1");
  squareEls2 = document.querySelectorAll(".sqr2");
  playGame.removeEventListener('click', handleBtnClick)
  init();
  squareEls.forEach(ele => {
    ele.addEventListener("click", handleSqClick);
  })
}

function init(){
  resetBtnEl.addEventListener('click', init)
  board = [
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null]
]
  computerBoard = [
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null], 
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null]
]
  width = board[0].length;
  height = board.length;
  currentShipNum = 1;
  ship1 = [img1, img1, img1, img1, img1]
  ship2 = [img2, img2, img2, img2]
  ship3 = [img3, img3, img3]
  ship4 = [img4, img4, img4]
  ship5 = [img5, img5]
  ships = {
    ship1: ship1,
    ship2: ship2,
    ship3: ship3,
    ship4: ship4,
    ship5: ship5
  }
  currentShip = ships[`ship${currentShipNum}`]
  placedShips = {
    ship1: [],
    ship2: [],
    ship3: [],
    ship4: [],
    ship5: [],
  }
  shipArr = [];
  validPos = [];
  placedShipsCount = 0;
  isVertical = false;
  isHorizotal = false;
  allShipsPlaced = false;
  shipsHidden = false;
  winner = false;
  playerHitCount = 0;
  compHitCount = 0;
  render();
}

function render(){
  updateBoard();
  updateMessage();
}

function updateBoard(){
  if (!allShipsPlaced) {
    let i = 0
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (board[row][col] === 1) {
          squareEls[i].textContent = img1
        } else if(board[row][col] === 2) {
          squareEls[i].textContent = img2
        } else if(board[row][col] === 3) {
          squareEls[i].textContent = img3
        } else if(board[row][col] === 4) {
          squareEls[i].textContent = img4
        } else if(board[row][col] === 5) {
          squareEls[i].textContent = img5
        } else if(board[row][col] === null) {
          squareEls[i].textContent = ""
        }
        i++
      }
    }
  } else if (allShipsPlaced && !shipsHidden) {
    return;
  } else if(shipsHidden && !winner) {
    let i = 0
    for (let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
        if (board[row][col] === -1) {
          squareEls[i].textContent = img1
        } else if(board[row][col] === -2) {
          squareEls[i].textContent = img2
        } else if(board[row][col] === -3) {
          squareEls[i].textContent = img3
        } else if(board[row][col] === -4) {
          squareEls[i].textContent = img4
        } else if(board[row][col] === -5) {
          squareEls[i].textContent = img5
        }
        if (computerBoard[row][col] === -1) {
          squareEls2[i].textContent = img1
        } 
        if(computerBoard[row][col] === -2) {
          squareEls2[i].textContent = img2
        } 
        if (computerBoard[row][col] === -3) {
          squareEls2[i].textContent = img3
        } 
        if (computerBoard[row][col] === -4) {
          squareEls2[i].textContent = img4
        } 
        if(computerBoard[row][col] === -5) {
          squareEls2[i].textContent = img5
        } 
        if(computerBoard[row][col] === 6) {
          squareEls2[i].textContent = "-"
        } 
        if(board[row][col] === 6) {
          squareEls[i].textContent = "-"
        }
        i++
      }
    }
  }
}

function updateMessage(){
  if (!winner && !allShipsPlaced && currentShipNum === 1) {
    messageEl.textContent = `Santa: "Place my 5 Reindeers ${img1} on the left board!" ---> Do this by clicking a square, then click squares adjacent to that square!`
  } else if (!winner && !allShipsPlaced && currentShipNum === 2) {
    messageEl.textContent = `Santa: "You know what's next, why do you have to ask! Place my 4 sleds ${img2} on the left board!" ---> Do this by clicking a square, then click squares adjacent to that square!`
  } else if (!winner && !allShipsPlaced && currentShipNum === 3) {
    messageEl.textContent = `Santa: "I'm thirsty. Leave 3 glasses of milk ${img3} for me, or you're getting no presents!---> Do this by clicking adjacent squares on the left board!`
  } else if (!winner && !allShipsPlaced && currentShipNum === 4) {
    messageEl.textContent = `Santa: "Hmmm. What goes with milk? Leave my 3 cookies ${img4} on the left board!" ---> Do this by clicking adjacent squares on the left board!`
  } else if (!winner && !allShipsPlaced && currentShipNum === 5) {
    messageEl.textContent = `Santa: "I'm on a tight budget this year so I only need 2 bells ${img5}" ---> Do this by clicking adjacent squares on the left board!`
  } else if (!winner && !shipsHidden) {
    messageEl.textContent = 'All ships have been placed! Press the \'Hide Board\' button to start the game!'
  } else if (!winner && shipsHidden ){
    messageEl.textContent = `It's your turn. Click anywhere on the opposite board once, then click a square on the opposite board to guess! Hits will be displayed by ${img1}, ${img2}, ${img3}, ${img4} and ${img5}. Misses will be displayed by a "-". Santa will guess automatically, after each of your guesses`
  } else if (!winner && turn === -1) {
    messageEl.textContent = 'Santa is thinking...'
  }
}

function handleSqClick(evt){
  let sqIdx = evt.target.id;
  let i = 0;
  let rowClicked, colClicked
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      if (sqIdx === squareEls[i].id && !shipsHidden) {
        if (!allShipsPlaced && (board[row][col] === 1 || board[row][col] === 2 || board[row][col] === 3 || board[row][col] === 4 || board[row][col] === 5)) return;
        rowClicked = row;
        colClicked = col;
      } 
      if ((sqIdx === squareEls2[i].id) && shipsHidden){
        if (winner === true) return;
        if (computerBoard[row][col] === -1 || computerBoard[row][col] === -2 || computerBoard[row][col] === -3 || computerBoard[row][col] === -4 || computerBoard[row][col] === -5) return;
        rowClicked = row;
        colClicked = col;
      }
      i++
    }
  }
  if (!allShipsPlaced) {
    placeShip(rowClicked, colClicked, isValid);
  } else if (allShipsPlaced && !shipsHidden) {
    return;
  } else {
    hideBtn.removeEventListener('click', hideShips)
    if ((computerBoard[rowClicked][colClicked] === -1 || computerBoard[rowClicked][colClicked] === -2 || computerBoard[rowClicked][colClicked] === -3 || computerBoard[rowClicked][colClicked] === -4 || computerBoard[rowClicked][colClicked] === -5 || computerBoard[rowClicked][colClicked] === 6)) return
    playerGuess(rowClicked, colClicked);
    computerGuess();
  }
  render();
}

function placeShip(row, col, isValid) {
  if (placedShipsCount >= 17) {
    allShipsPlaced = true;
    return
  }
  if (isValid(row, col)) {
    messageEl2.textContent = "";
    board[row][col] = currentShipNum;
    placedShipsCount++
    if (placedShipsCount === 17) {
      hideBtn.addEventListener('click', hideShips)
    }
    placedShips[`ship${currentShipNum}`].push(currentShip[0])
    if (placedShips[`ship${currentShipNum}`].length >= ships[`ship${currentShipNum}`].length) {
      currentShipNum++
      shipArr = [];
      validPos = [];
      isVertical = false;
      isHorizontal = false;
    } 
  } else {
  messageEl2.textContent = `Santa:\"Follow the Rules or you\'re getting no presents this year!\". You must click squares in a horizontal or vertical line for each of Santa\'s items`
  return;
  }
}

function isValid(row, col) {
  let max, min
  if (placedShips[`ship${currentShipNum}`].length === 0) {
    shipArr.push([row, col])
    if (row + 1 <= 10) validPos.push([row + 1, col])
    if (row - 1 >= 0) validPos.push([row - 1, col])
    if (col + 1 <= 10) validPos.push([row, col + 1])
    if (col - 1 >= 0) validPos.push([row, col - 1])
    return true;
  } else if (placedShips[`ship${currentShipNum}`].length < ships[`ship${currentShipNum}`].length) { 
    for (let i = 0; i < validPos.length; i++) {
      if (validPos[i][0] === row && validPos[i][1] === col) {
        shipArr.push([row, col])
        if (shipArr.length === 2 && (shipArr[0][1] === shipArr[1][1])) isVertical = true 
        if (shipArr.length === 2 && (shipArr[0][0] === shipArr[1][0])) isHorizontal = true 
        if (isVertical) {
          let idx2 = shipArr[0][1]
          let idx1 = []
          for (let i = 0; i < shipArr.length; i++) {
            idx1.push(shipArr[i][0])
          }
          max = Math.max(...idx1)
          min = Math.min(...idx1)
          validPos = [[min - 1, idx2], [max + 1, idx2]]
        }
        if (isHorizontal) {
          let idx1 = shipArr[0][0]
          let idx2 = []
          for (let i = 0; i < shipArr.length; i++) {
            idx2.push(shipArr[i][1])
          }
          max = Math.max(...idx2)
          min = Math.min(...idx2)
          validPos = [[idx1, min - 1], [idx1, max + 1]]
        }   
        return true;
      } 
    }
  } else {
    return false;
  }
}

function hideShips(){
  let i = 0
  for (let row = 0; row < height; row++) {
    for (let col = 0; col < width; col++) {
      squareEls[i].textContent = "";
      i++
    }
  }
  shipsHidden = true;
  computerPlaceShips()
}

function computerPlaceShips(){
  squareEls.forEach(ele => {
    ele.removeEventListener("click", handleSqClick);
  })
  squareEls2.forEach(ele => {
    ele.addEventListener("click", handleSqClick);
  })
  resetBtnEl.removeEventListener('click', init)
  resetBtnEl.addEventListener('click', resetGame)
  let occ = [0,1,2,3,4,5,6,7,8,9]
  let s1idx1 = Math.floor(Math.random() * 10)
  let s1idx2 = occ.splice(Math.floor(Math.random() * 10), 1)
  computerBoard[s1idx1][s1idx2] = 1
  if (s1idx1 + 1 <= 9 && s1idx1 + 2 <= 9 && s1idx1 + 3 <= 9 && s1idx1 + 4 <= 9) {
    computerBoard[s1idx1 + 1][s1idx2] = 1
    computerBoard[s1idx1 + 2][s1idx2] = 1
    computerBoard[s1idx1 + 3][s1idx2] = 1
    computerBoard[s1idx1 + 4][s1idx2] = 1
  } else {
    computerBoard[s1idx1 - 1][s1idx2] = 1
    computerBoard[s1idx1 - 2][s1idx2] = 1
    computerBoard[s1idx1 - 3][s1idx2] = 1
    computerBoard[s1idx1 - 4][s1idx2] = 1
  }
  s1idx1 = Math.floor(Math.random() * 10)
  s1idx2 = occ.splice(Math.floor(Math.random() * 9), 1)
  computerBoard[s1idx1][s1idx2] = 2
  if (s1idx1 - 1 >= 0 && s1idx1 - 2 >= 0 && s1idx1 - 3 >= 0) {
    computerBoard[s1idx1 - 1][s1idx2] = 2
    computerBoard[s1idx1 - 2][s1idx2] = 2
    computerBoard[s1idx1 - 3][s1idx2] = 2
  } else {
    computerBoard[s1idx1 + 1][s1idx2] = 2
    computerBoard[s1idx1 + 2][s1idx2] = 2
    computerBoard[s1idx1 + 3][s1idx2] = 2
  }
  s1idx1 = Math.floor(Math.random() * 10)
  s1idx2 = occ.splice(Math.floor(Math.random() * 8), 1)
  computerBoard[s1idx1][s1idx2] = 3
  if (s1idx1 + 1 <= 9 && s1idx1 + 2 <= 9) {
    computerBoard[s1idx1 + 1][s1idx2] = 3
    computerBoard[s1idx1 + 2][s1idx2] = 3
  } else {
    computerBoard[s1idx1 - 1][s1idx2] = 3
    computerBoard[s1idx1 - 2][s1idx2] = 3
  }
  s1idx1 = Math.floor(Math.random() * 10)
  s1idx2 = occ.splice(Math.floor(Math.random() * 7), 1)
  computerBoard[s1idx1][s1idx2] = 4
  if (s1idx1 - 1 >= 0 && s1idx1 - 2 >= 0) {
    computerBoard[s1idx1 - 1][s1idx2] = 4
    computerBoard[s1idx1 - 2][s1idx2] = 4
  } else {
    computerBoard[s1idx1 + 1][s1idx2] = 4
    computerBoard[s1idx1 + 2][s1idx2] = 4
  }
  s1idx1 = Math.floor(Math.random() * 10)
  s1idx2 = occ.splice(Math.floor(Math.random() * 6), 1)
  computerBoard[s1idx1][s1idx2] = 5
  if (s1idx1 - 1 >= 0) {
    computerBoard[s1idx1 - 1][s1idx2] = 5
  } else {
    computerBoard[s1idx1 + 1][s1idx2] = 5
  } 
  updateMessage()
}

function playerGuess(row, col){
  messageEl2.textContent = ""
  turn = 1
  if (computerBoard[row][col] === 1 || computerBoard[row][col] === 2 || computerBoard[row][col] === 3 || computerBoard[row][col] === 4 || computerBoard[row][col] === 5) {
    computerBoard[row][col] = computerBoard[row][col] * -1
    playerHitCount++
    messageEl2.textContent = "You Hit a Ship!"
    computerBoardEle.setAttribute('class', 'board animate__animated animate__bounce')
    setTimeout(() => {
      computerBoardEle.setAttribute('class', 'board')
    }, 500);
  } else if (computerBoard[row][col] === null) {
    computerBoard[row][col] = 6
  }
  if (playerHitCount === 17) {
    updateBoard()
    winner = true;
    messageEl.textContent = 'Congrats, You Win! You sunk all of Santa\'s ships';
    return;
  }
  updateBoard()
}

function computerGuess(){
  turn = -1
  let randEvenIdx = (Math.floor(Math.random() * (positions.length / 2))) * 2
  let row = positions[randEvenIdx]
  let col = positions[randEvenIdx + 1]
  positions.splice(randEvenIdx, 2)
  if (board[row][col] === 1 || board[row][col] === 2 || board[row][col] === 3 || board[row][col] === 4 || board[row][col] === 5) {
    board[row][col] = board[row][col] * -1
    compHitCount++
    playerBoardEle.setAttribute('class', 'board animate__animated animate__bounce')
    setTimeout(() => {
      playerBoardEle.setAttribute('class', 'board')
    }, 500);
    if (messageEl2.textContent === "You Hit a Ship!") messageEl2.textContent = 'You and Santa both hit!'
    if (messageEl2.textContent === "") messageEl2.textContent = "Santa Hit a Ship!"
  } else {
    board[row][col] = 6
  }
  if (turn === -1 && compHitCount === 17) {
    updateBoard()
    winner = true
    turn = -1
    messageEl.textContent = 'Santa Wins! Santa: "Time to enjoy my Milk and Cookies. Better luck next time!"'
    return;
  }
  updateBoard()
}

function resetGame(){
  messageEl.textContent = `Santa: "Place my 5 Reindeers ${img1} on the left board!" ---> Do so by clicking a square, then click squares adjacent to that square!`
  messageEl2.textContent = ''
  squareEls.forEach(ele => {
    ele.addEventListener("click", handleSqClick);
  })
  squareEls2.forEach(ele => {
    ele.removeEventListener("click", handleSqClick);
    ele.textContent = "";
  })
  resetBtnEl.removeEventListener('click', resetGame)
  init();
}