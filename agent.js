class Agent {
  constructor(gameMap, foodPos, pos=null) {
    this.gameMap = gameMap;
    this.foodPos = foodPos;
    if (pos) this.pos = pos;
    else this.generatePos();
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
    return this.gameMap.grid[x][y] == OBSTACULO || (this.foodPos.x == x && this.foodPos.y == y)
  }
  
  drawAgent() {
    rectMode(CORNER);
    stroke(0);
    fill(cores[AGENTE]);
    rect(this.pos.x*GRID_SIZE, this.pos.y*GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }
}