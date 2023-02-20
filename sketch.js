const GRID_SIZE = 30;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

const AGENTE = 0;
const BUSCA = 3;
const CAMINHO = 4;

const AREIA = 1;
const ATOLEIRO = 5;
const AGUA = 10;
const OBSTACULO = 1000;

let cores = {};
cores[AREIA] = '#e2cfa6';
cores[ATOLEIRO] = '#AA907F';
cores[AGUA] = '#20596B';
cores[OBSTACULO] = '#010201';
cores[AGENTE] = '#C71C1C';
cores[BUSCA] = '#2DC71C9E';
cores[CAMINHO] = '#C71C1C89';

let busca = null;
let started = false;
let showBusca = true;

let estado = 'menu';

function setup() {
  createCanvas(GRID_SIZE*GRID_WIDTH + 50, GRID_SIZE*GRID_HEIGHT + 50);
  this.menu = new Menu();
}

function start(grid=null, agentPos=null, score=0) {
  this.gameMap = new GameMap(GRID_WIDTH, GRID_HEIGHT, grid, score);
  this.food = new Food(this.gameMap, agentPos);
  this.agent = new Agent(this.gameMap, this.food.pos, agentPos);
  
  //if (showBusca) this.calculateMethod();
  //else this.updateMethod();
  this.calculateMethod();
  this.index = 0;
  if (estado == 'busca') frameRate(30);
  else frameRate(5);
}

function draw() {
  switch(estado) {
    case 'menu':
      if (busca) {
        estado = 'busca';
        this.start();
      }
      break;
    
    case 'busca':
      if (this.index+1 < this.method.path.length) {
        this.index++;
      } else {
        this.index = 0;
        estado = 'caminho';
        frameRate(5);
      }
      this.display();
      break;
    
    case 'caminho':
      if (this.index+1 < this.method.chosenPath.length) {
        this.index++;
      } else {
        this.start(this.gameMap.grid, this.food.pos, this.getNewScore());
      }
      this.display();
      break;
  }
}

function display() {
  this.clearMap();
  this.gameMap.drawGameMap();
  this.food.drawFood();
  this.agent.drawAgent();
  
  if (estado == 'busca') this.method.drawPath(this.index);
  else {
    this.method.drawChosenPath(this.index);
  }
}

function clearMap() {
  clear();
  background('#EBC5DB');
}
  
function mouseClicked() {
  busca = this.menu.choice(mouseX, mouseY);
}

function calculateMethod() {
  if (busca == 'largura') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
  if (busca == 'profundidade') {
    this.method = new DFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath(this.method.origin);
    this.method.calculateChosenPath();
  }
  if (busca == 'custo uniforme') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
  if (busca == 'gulosa') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
  if (busca == 'a*') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
}

function getNewScore(){
  return this.gameMap.score + (this.method.chosenPath.length > 0);
}

function updateMethod() {
  this.method.origin = this.agent.pos;
  this.method.destiny = this.food.pos;
  this.method.calculateChosenPath();
}

