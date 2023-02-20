class Food {
  constructor(gameMap) {
    this.gameMap = gameMap;
    this.generatePos();
  }
  
  generatePos() {
    let x = floor(random(this.gameMap.width));
    let y = floor(random(this.gameMap.height));
    
    while(this.gameMap.grid[x][y] == OBSTACULO) {
      x = floor(random(this.gameMap.width));
      y = floor(random(this.gameMap.height));
    }
    
    this.pos = {x, y};
  }
  
  drawFood() {
    rectMode(CORNER);
    stroke(0);
    fill(255, 204, 0);
    rect(this.pos.x*GRID_SIZE, this.pos.y*GRID_SIZE, GRID_SIZE, GRID_SIZE);
  }
}