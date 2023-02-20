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

function setup() {
  createCanvas(GRID_SIZE*GRID_WIDTH, GRID_SIZE*GRID_HEIGHT);
  this.menu = new Menu();
}

function start(grid=null, agentPos=null) {
  this.gameMap = new GameMap(GRID_WIDTH, GRID_HEIGHT, grid);
  this.food = new Food(this.gameMap);
  this.agent = new Agent(this.gameMap, this.food.pos, agentPos);
  
  //if (showBusca) this.calculateMethod();
  //else this.updateMethod();
  this.calculateMethod();
  this.index = 0;
  if (showBusca) frameRate(30);
  else frameRate(5);
}

function draw() {
  if(busca){
    if (!started) {
      this.start();
      started = true;
    } else {
      if (showBusca) {
        if (this.index+1 < this.method.path.length) {
          this.index++;
        } else {
          this.index = 0;
          showBusca = false;
          frameRate(5);
        }
      } else {
        if (this.index+1 < this.method.chosenPath.length) {
          this.index++;
        } else {
          this.start(this.gameMap.grid, this.food.pos);
        }
      }
  
      this.display();
    }
  }
}

function display() {
  this.gameMap.drawGameMap();
  this.food.drawFood();
  this.agent.drawAgent();
  
  if (showBusca) this.method.drawPath(this.index);
  else {
    this.method.drawChosenPath(this.index);
  }
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

function updateMethod() {
  this.method.origin = this.agent.pos;
  this.method.destiny = this.food.pos;
  this.method.calculateChosenPath();
}

