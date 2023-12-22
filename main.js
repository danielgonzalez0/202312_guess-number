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
    startButton.innerText = "start"
    this.element.appendChild(startButton)
  }
}

class GameBoard {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.score = 0;
    this._randomNumber = null
    this.form = new GameForm(min, max)
    this.choicesBoard = new ChoicesBoard(min, max)
    this.board = document.createElement('div');
    this.board.setAttribute('id', 'game-board');
    this.board.classList.add('hidden');
    GAME_CONTAINER.appendChild(this.board);

  }

  get randomNumber() {
    return this._randomNumber;
  }

  restart() {
    this.setRandomNumber()
    this.score = 0;
    const score = document.querySelector('#score')
    score.innerText = this.score
    this.resultElement.classList.add('hidden')
    this.restartButton.classList.add('hidden')
    document.querySelector('#number').value = "";
    console.log({ number: this._randomNumber });

  }

  setRandomNumber() {
    this._randomNumber = Math.floor(Math.random() * (Game.MAX_NUMBER - Game.MIN_NUMBER + 1)) + Game.MIN_NUMBER
  }

  setCounter() {
    this.score++
    const score = document.querySelector('#score')
    score.innerText = this.score
  }

  displayResult(playerChoice) {
    if (playerChoice === this.randomNumber) {
      this.resultElement.innerText = `🟢 You found my guess, it's ${this.randomNumber}`
      this.restartButton.classList.remove('hidden')
    }

    if (playerChoice < this.randomNumber) this.resultElement.innerText = `🔴 My guess is above ${playerChoice}`

    if (playerChoice > this.randomNumber) this.resultElement.innerText = `🔴 My guess is below ${playerChoice}`

    this.resultElement.classList.remove('hidden')
  }

  initBoard() {
    this.setRandomNumber()
    console.log({ randomNumber: this.randomNumber });
    const title = document.createElement('p');
    const score = document.createElement('p');
    title.innerText = `I generated a number between ${this.min} and ${this.max}, try to find it 😆`
    score.innerText = `score : ${this.score}`
    score.id = "score"
    score.classList.add('score')
    //form
    this.form.initForm()
    this.form.form.addEventListener('submit', (e) => {
      e.preventDefault()
      this.form.handleSubmitForm()
      if (this.form.isInputTrue) {
        this.setCounter()
        this.displayResult(Number(this.form.playerInput))
      }
    })

    //result
    this.resultElement = document.createElement('div');
    this.resultElement.id = "game-result"
    this.resultElement.classList.add('hidden')

    //board
    this.choicesBoard.initChoicesBoard()

    //restart
    this.restartButton = document.createElement('button')
    this.restartButton.classList.add('hidden')
    this.restartButton.innerText = "restart"
    this.restartButton.id = "restart"
    this.restartButton.addEventListener('click', () => {
      this.restart()
    })

    //appned element
    this.board.appendChild(title)
    this.board.appendChild(score)
    this.board.appendChild(this.form.form)
    this.board.appendChild(this.resultElement)
    this.board.appendChild(this.choicesBoard.element)
    this.board.appendChild(this.restartButton)
  }
}

class GameForm {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.playerInput = null;
    this.isInputTrue = true;
    this.form = document.createElement('form')
    this.errorSpan = document.createElement('span');
    this.errorSpan.id = 'error';
    this.errorSpan.classList.add('hidden')
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

    input.addEventListener('focus', () => {
      this.errorSpan.innerText = ''
      this.errorSpan.classList.add('hidden')
      this.instructionSpan.classList.remove('hidden')
    })

    // Création du bouton
    const button = document.createElement('button');
    button.type = 'submit';
    button.textContent = 'submit';

    // Création du span
    this.instructionSpan = document.createElement('span');
    this.instructionSpan.id = 'instruction';
    this.instructionSpan.textContent = 'Enter your guessing number';




    // Ajout des éléments au DOM
    this.form.appendChild(label);
    this.form.appendChild(flexContainer);
    flexContainer.appendChild(input);
    flexContainer.appendChild(button);
    this.form.appendChild(this.instructionSpan);
    this.form.appendChild(this.errorSpan);
  }


  handleSubmitForm() {
    console.log('choice submit');
    const formData = new FormData(this.form)
    const inputValue = formData.get('number')
    console.log(Number.isNaN(inputValue))
    try {
      if (inputValue === '' || Number.isNaN(Number(inputValue)) || inputValue < this.min || inputValue > this.max) {
        this.isInputTrue = false;
        throw new Error(`Please enter a number between ${this.min} and ${this.max}`)
      } else {
        this.isInputTrue = true;
        return this.playerInput = inputValue
      }
    } catch (error) {
      this.errorSpan.innerText = error.message
      this.errorSpan.classList.remove('hidden')
      this.instructionSpan.classList.add('hidden')
    }
  }
}

class ChoicesBoard {
  constructor(min, max) {
    this.min = min;
    this.max = max;
    this.currentChoice = null;
    this.Choices = [];
    this.element = document.createElement("div");
    this.element.setAttribute('id', 'choices-board');
  }

  initChoicesBoard() {
    const spanMin = document.createElement('span')
    const spanMax = document.createElement('span')
    spanMin.innerText = this.min;
    spanMax.innerText = this.max;
    this.element.appendChild(spanMin)
    this.element.appendChild(spanMax)
  }

}

const game = new Game()
game.init()