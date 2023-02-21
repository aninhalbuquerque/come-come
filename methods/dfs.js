class DFS {
  constructor(origin, destiny, gameMap) {
    this.origin = origin;
    this.destiny = destiny;
    this.gameMap = gameMap;
    this.path = [];
    this.chosenPath = [];
    this.ways = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
    
    this.vis = this.gameMap.createGrid(0);
    this.dist = this.gameMap.createGrid(-1);
    this.vis[this.origin.x][this.origin.y] = 1;
    this.dist[this.origin.x][this.origin.y] = 0;
  }
  
  calculatePath(pos) {   
    for (let i = 0; i < this.ways.length; i++) {
      let x = pos.x + this.ways[i][0];
      let y = pos.y + this.ways[i][1];

      if(this.validPosition(x, y) && this.haveToVisit(x, y, this.getDist(pos)+1)) {
        this.vis[x][y] = 1;
        this.dist[x][y] = this.getDist(pos)+1;
        this.calculatePath({x, y});
      }
    }
  }
  
  calculateChosenPath() {
    if(this.getDistToDestiny() == -1) return;
    this.chosenPath = [];
    
    let pos = this.destiny;
    
    while (!this.isOrigin(pos)) {
      this.chosenPath.push(pos);
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];
        
        if(this.validPosition(x, y) && this.getDist({x, y}) == this.getDist(pos)-1) {
          pos = {x, y};
          break;
        }
      }
    }
    this.chosenPath.push(pos);
    this.chosenPath = this.chosenPath.reverse();
  }
  
  validPosition(x, y) {
    return x >= 0 && x < this.gameMap.width && y >=0 && y < this.gameMap.height && this.gameMap.grid[x][y] != OBSTACULO;
  }
  
  haveToVisit(x, y, dist) {
    return !this.wasVisited(x, y) || this.hasBiggerDistance(x, y, dist);
  }
  
  wasVisited(x, y) {
    if (!this.vis[x][y]) this.path.push({x, y});
    return this.vis[x][y];
  }
  
  hasBiggerDistance(x, y, dist) {
    return this.getDist({x, y}) == -1 ? true : this.getDist({x, y}) > dist;
  }
    
  isOrigin(pos) {
    return pos.x == this.origin.x && pos.y == this.origin.y;
  }
  
  isDestiny(pos) {
    return pos.x == this.destiny.x && pos.y == this.destiny.y;
  }
  
  drawPath(i) {
    for(let j = 0; j <= i; j++) {
      rectMode(CORNER);
      stroke(0);
      fill(cores[BUSCA]);
      rect(this.path[j].x*GRID_SIZE, this.path[j].y*GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }
  
  drawChosenPath(i) {
    if (this.chosenPath.length) {
      for(let j = 0; j <= i; j++) {
        rectMode(CORNER);
        stroke(0);
        fill(cores[CAMINHO]);
        rect(this.chosenPath[j].x*GRID_SIZE, this.chosenPath[j].y*GRID_SIZE, GRID_SIZE, GRID_SIZE);
      }
    }
  }
  
  getDist(pos) {
    return this.dist[pos.x][pos.y];
  }
  
  getDistToDestiny() {
    return this.dist[this.destiny.x][this.destiny.y];
  }
  
}