let snake = [0, 1, 2];
const size = 10;
const box = document.getElementById('snake-box');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const score = document.getElementById('score');


let interval = 500;
let divs;
let idInterval;
let moviento = 1;
let positionFood;
let boxGame = [];
let boxavailable = [];
let puntuacion;
let scoreLocalStorage;

playButton.addEventListener('click', () => {
  startGame();
});

pauseButton.addEventListener('click', () => {
  alert("Su juego se encuentra en pausa");
});

function createBox() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement('div');
      box.appendChild(div);
      element = i*10+j
      boxGame.push(element)
    }
  }
  sitiosDisponibles()
}

function drawSnake() {
  divs = document.querySelectorAll('.box div');
  snake.forEach((index) => divs[index].classList.add('snake'));
}

// Movimiento de la serpiente con eventos de teclado
window.addEventListener('keydown', (e) => {
  switch(e.code){
    case "ArrowDown":
      moviento = size;
      break;
    case "ArrowUp":
      moviento = -size;
      break;
    case "ArrowLeft":
      moviento = -1;
      break;
    case "ArrowRight":
      moviento = 1;
      break;
    default:
      moviento = 1;
      break;
  }
})

function moveSnake() {

  const tail = snake.shift();
  divs[tail].classList.remove('snake');
  const head = snake[snake.length - 1] + moviento
  if (isCollision(head)) {
    alert('game over');
    scoreLocalStorage = localStorage.getItem('score');
    if (scoreLocalStorage<(snake.length + 1)){
      localStorage.setItem('score',(snake.length+1).toString());
      scoreLocalStorage = localStorage.getItem('score');
    }
    clearGame();
    return;
  }
  snake.push(head);
  divs[head].classList.add('snake');

  if(isEatSnake(head,positionFood)){
    snake.unshift(tail)
    divs[tail].classList.add('snake')
    sitiosDisponibles()
    if(snake.length === size*size){

      console.log(snake.length)
      divs[positionFood].innerHTML = ''
      divs[positionFood].classList.add('snake')
      alert('Win!!!')
      clearGame();
      return;
    } else {
      generateFood()
      puntuacion = snake.length
      score.innerText = puntuacion
    }
  }
}

function isCollision(index) {
  const colisionWithSnake = snake.indexOf(index)
  if ((index % size === 0 && moviento === 1) 
  || ((index+1) % size === 0 && moviento === -1) 
  || index>=size*size 
  || index<0 
  || colisionWithSnake != -1) {
    return true;
  }
  return false;
}

function startGame() {
  clearGame();
  generateFood();
  puntuacion = snake.length
  score.innerText = puntuacion
  idInterval = setInterval(() => {
    moveSnake();
  }, interval);
}

function sitiosDisponibles(){
  boxavailable = [];
  boxavailable = boxGame.filter( elements => snake.indexOf(elements) === -1)
}

function generateFood(){
  if(positionFood != undefined){
    divs[positionFood].innerHTML = ''
  }
  positionFood = boxavailable[Math.floor(Math.random()*boxavailable.length)] 
  divs[positionFood].innerHTML = '<i class="fa-solid fa-apple-whole food-snake"></i>'
}

function isEatSnake(indexSnake, indexFood){
  if(indexSnake===indexFood){
    return true;
  } else{
    return false;
  }
}

function clearGame() {
  snake = [0, 1, 2];
  moviento = 1;
  boxGame = []
  score.innerText = ''
  box.innerHTML = '';
  clearInterval(idInterval);
  createBox();
  drawSnake();
  if (scoreLocalStorage == undefined) {
    maxScore.innerText = ''
  } else {
    maxScore.innerText = scoreLocalStorage
  }
}

clearGame();