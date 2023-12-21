import './style.css'

const GAME_CONTAINER = document.querySelector("#game-container")

class Game {
  static MIN_NUMBER = 0;
  static MAX_NUMBER = 500;

  constructor() {
    this.startElement = new GameStart()
    this.boardElement = new GameBoard(Game.MIN_NUMBER, Game.MAX_NUMBER)
  }

  init() {
    console.log({ randomNumber: this.randomNumber });
    this.startElement.InitdisplayStart()
    this.boardElement.initBoard()
    const startButton = document.querySelector("#start");
    startButton.addEventListener('click', () => {
      this.startElement.element.classList.add('hidden')
      this.boardElement.board.classList.remove('hidden')
    })
  }



}

class GameStart {
  constructor() {
    this.element = document.createElement('div');
    this.element.setAttribute('id', 'game-start')
    GAME_CONTAINER.appendChild(this.element)
  }

  InitdisplayStart() {
    const paragraph = document.createElement('p');
    // paragraph.classList.add("font-raleway", "text-lg", "font-normal");
    paragraph.innerText = 'The application will generate a random number, and your task is to find it in as few attempts as possible.'
    this.element.appendChild(paragraph);
    const startButton = document.createElement('button');
    startButton.setAttribute('id', 'start');
    startButton.classList.add('mt-4');
    startButton.innerText = "start"
    this.element.appendChild(startButton)
  }
}

class GameBoard {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.score = 0;
    this.playerChoice = null;
    this.randomNumber = Math.floor(Math.random() * (Game.MAX_NUMBER - Game.MIN_NUMBER + 1)) + Game.MIN_NUMBER
    this.form = new GameForm()
    this.board = document.createElement('div');
    this.board.setAttribute('id', 'game-board');
    this.board.classList.add('hidden');
    GAME_CONTAINER.appendChild(this.board);

  }

  initBoard() {
    const title = document.createElement('p');
    const score = document.createElement('p');
    title.innerText = `I generated a number between ${this.min} and ${this.max}, try to find it 😆`
    score.innerText = `score : ${this.score}`
    score.classList.add('score')
    this.form.initForm()
    console.log(this.form);
    this.board.appendChild(title)
    this.board.appendChild(score)
    this.board.appendChild(this.form.form)
  }
}

class GameForm {
  constructor() {
    this.playerInput = null;
    this.form = document.createElement('form')
  }

  initForm() {
    this.displayForm()
  }

  displayForm() {
    // Création du formulaire
    this.form.id = 'myForm';

    // Création du label
    const label = document.createElement('label');
    label.setAttribute('for', 'number');
    label.textContent = 'Your guess :';

    // Création du conteneur flex
    const flexContainer = document.createElement('div');
    flexContainer.classList.add('flex-container');

    // Création de l'input
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'number';
    input.name = 'number';
    input.placeholder = '55';

    // Création du bouton
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'submit';

    // Création du span
    const instructionSpan = document.createElement('span');
    instructionSpan.id = 'instruction';
    instructionSpan.textContent = 'Enter your guessing number';

    // Ajout des éléments au DOM
    this.form.appendChild(label);
    this.form.appendChild(flexContainer);
    flexContainer.appendChild(input);
    flexContainer.appendChild(button);
    this.form.appendChild(instructionSpan);
  }
}

const game = new Game()
game.init()