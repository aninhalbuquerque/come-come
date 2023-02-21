class GameMap {
  constructor(width, height, grid=null, score=0) {
    this.width = width;
    this.height = height;
    this.score = score;
    if (grid) this.grid = grid;
    else {
      this.generateGrid();
    }
  }
  
  generateGrid() {
    let noiseScale = 20.0;
    let iterations = 1;
    this.grid = new Array(this.width);
    for (let i = 0; i < this.width; i++) {
      this.grid[i] = new Array(this.height);
      for (let j = 0; j < this.height; j++) {
        let noiseVal = noise(i / noiseScale, j / noiseScale, iterations);
        let chanceObstacle = random();
        if (noiseVal < 0.3) {
          this.grid[i][j] = AGUA;
        } else if (noiseVal < 0.4) {
          this.grid[i][j] = ATOLEIRO;
        } else {
          this.grid[i][j] = AREIA;
        }
        
        if(chanceObstacle < 0.1){
          this.grid[i][j] = OBSTACULO;
        }
      }
    }
  }
  
  drawGameMap() {
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        rectMode(CORNER);
        stroke(0);
        fill(cores[this.grid[i][j]]);
        rect(i*GRID_SIZE, j*GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }
    }
    
    stroke(0);
    fill(0);
    text(`Pontuação: ${this.score}`, 525, 625);
  }
  
  createGrid(value) {
    let newGrid = new Array(this.width);
    for (let i = 0; i < this.width; i++) {
      newGrid[i] = new Array(this.height);
      for (let j = 0; j < this.height; j++) {
        newGrid[i][j] = value;
      }
    }
    
    return newGrid;
  }
}