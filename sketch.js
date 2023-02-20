const GRID_SIZE = 30;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

const AGENTE = 0;
const CAMINHO = 3;

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
cores[CAMINHO] = '#C71C1C9E';

let busca = null;
let started = false;

function setup() {
  frameRate(5);
  createCanvas(GRID_SIZE*GRID_WIDTH, GRID_SIZE*GRID_HEIGHT);
  this.menu = new Menu();
}

function start(grid=null, agentPos=null) {
  this.gameMap = new GameMap(GRID_WIDTH, GRID_HEIGHT, grid);
  this.food = new Food(this.gameMap);
  this.agent = new Agent(this.gameMap, this.food.pos, agentPos);
  this.calculateMethod();
  this.index = 0;
}

function draw() {
  if(this.busca){
    if (!this.started) {
      this.start();
      this.started = true;
    } else {
      if (this.index+1 < this.method.path.length) {
        this.index++;
      } else {
        this.start(this.gameMap.grid, this.food.pos);
      }

      this.display();
    }
  }
}

function display() {
  this.gameMap.drawGameMap();
  this.food.drawFood();
  this.agent.drawAgent();
  this.method.drawPath(this.index);
}
  
function mouseClicked() {
  this.busca = this.menu.choice(mouseX, mouseY);
}

function calculateMethod() {
  if (this.busca == 'largura') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
  }
  if (this.busca == 'profundidade') {
    this.method = new DFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath(this.method.origin);
  }
  if (this.busca == 'custo uniforme') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
  }
  if (this.busca == 'gulosa') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
  }
  if (this.busca == 'a*') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
  }
}

