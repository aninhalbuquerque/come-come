const GRID_SIZE = 30;
const GRID_WIDTH = 20;
const GRID_HEIGHT = 20;

const AGENTE = 0;
const BUSCA = 3;
const CAMINHO = 4;
const FRONTEIRA= 2
const COMIDA= 6

const AREIA = 1;
const ATOLEIRO = 5;
const AGUA = 10;
const OBSTACULO = 1000;

const FRAME_RATE_BUSCA = 15;
const FRAME_RATE_DESLOCAMENTO = 5;

let cores = {};
cores[AREIA] = '#e2cfa6';
cores[ATOLEIRO] = '#AA907F';
cores[AGUA] = '#20596B';
cores[OBSTACULO] = '#010201';
cores[AGENTE] = '#C71C1C';
cores[BUSCA] = '#2DC71C9E';
cores[CAMINHO] = '#C71C1C89';
cores[COMIDA] = '#ffcc00';
cores[FRONTEIRA] = '#AD52E9B5';

let busca = null;
let started = false;
let showBusca = true;

let estado = 'menu';

let block = 0;

function setup() {
  createCanvas(GRID_SIZE*GRID_WIDTH + 50, GRID_SIZE*GRID_HEIGHT + 50);
  this.menu = new Menu();
}

function start(grid=null, agentPos=null, score=0) {
  this.gameMap = new GameMap(GRID_WIDTH, GRID_HEIGHT, grid, score);
  this.gameMap.busca = busca;
  this.food = new Food(this.gameMap, agentPos);
  this.agent = new Agent(this.gameMap, this.food.pos, agentPos);
  
  this.calculateMethod();
  this.index = 0;
  frameRate(FRAME_RATE_BUSCA);
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
      }
      this.display();
      break;
    
    case 'caminho':
      if (this.index+1 < this.method.chosenPath.length) {
        this.index++;
      } else {
        this.index = 0;
        estado = 'deslocamento';
        frameRate(FRAME_RATE_DESLOCAMENTO);
      }
      this.display();
      break;
      
    case 'deslocamento':
      if (this.index+1 < this.method.chosenPath.length) {
        if (this.blocksIndex()) block++;
        else {
          block = 0;
          this.index++;
        }
      } else {
        estado = 'busca';
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
  
  if (estado == 'busca') this.method.drawPath(this.index);
  if (estado == 'caminho') this.method.drawChosenPath(this.index);
  if (estado == 'deslocamento') {
    this.method.drawChosenPath(this.method.chosenPath.length-1);
    this.updateAgentPos();
  }
  
  this.agent.drawAgent();
}

function clearMap() {
  clear();
  background('#EBC5DB');
}
  
function mouseClicked() {
  busca = this.menu.choice(mouseX, mouseY);
}

function keyPressed() {
  if (keyCode === ESCAPE) {
    busca = null;
    estado = 'menu';
    this.menu = new Menu();
  }
}

function calculateMethod() {
  if (busca == 'Largura') {
    this.method = new BFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
  if (busca == 'Profundidade') {
    this.method = new DFS(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath(this.method.origin);
    this.method.calculateChosenPath();
  }
  if (busca == 'Custo Uniforme') {
    this.method = new CustoUniforme(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
  if (busca == 'Gulosa') {
    this.method = new Gulosa(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
  if (busca == 'A*') {
    this.method = new AEstrela(this.agent.pos, this.food.pos, this.gameMap);
    this.method.calculatePath();
    this.method.calculateChosenPath();
  }
}

function getNewScore(){
  return this.gameMap.score + (this.method.chosenPath.length > 0);
}

function blocksIndex() {
  let pos = this.method.chosenPath[this.index];
  let type = this.gameMap.grid[pos.x][pos.y];
  return block < type;
}

function updateAgentPos() {
  this.agent.pos.x = this.method.chosenPath[this.index].x;
  this.agent.pos.y = this.method.chosenPath[this.index].y;
}

