class Food {
  constructor(gameMap, agentPos=null) {
    this.gameMap = gameMap;
    this.agentPos = agentPos;
    this.generatePos();
  }
  
  generatePos() {
    let x = floor(random(this.gameMap.width));
    let y = floor(random(this.gameMap.height));
    
    while(this.isInvalidPosition(x, y)) {
      x = floor(random(this.gameMap.width));
      y = floor(random(this.gameMap.height));
    }
    
    this.pos = {x, y};
  }
  
  isInvalidPosition(x, y) {
    if (this.agentPos) {
      return this.gameMap.grid[x][y] == OBSTACULO || (this.agentPos.x == x && this.agentPos.y == y);
    }
    return this.gameMap.grid[x][y] == OBSTACULO;  
  }
  
  drawFood() {
    rectMode(CORNER);
    stroke(0);
    fill(cores[COMIDA]);
    rect(this.pos.x*GRID_SIZE, this.pos.y*GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }
}