class Gulosa {
  constructor(origin, destiny, gameMap) {
    this.origin = origin;
    this.destiny = destiny;
    this.gameMap = gameMap;
    this.path = [];
    this.chosenPath = [];
    this.ways = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]];
  }
  
  calculatePath() {
    let queue = new PriorityQueue();
    queue.enqueue({ x: this.origin.x, y: this.origin.y, w: 0 });
    this.vis = this.gameMap.createGrid(0);
    this.vis[this.origin.x][this.origin.y] = 1;
    this.cameFrom = {};
    this.cameFrom[JSON.stringify(this.origin)] = null;
    
    while(!queue.isEmpty()) {
      let pos = queue.dequeue();
      //console.log(pos);
      
      if (this.isDestiny(pos)) break;
      
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];
        
        if(this.validPosition(x, y) && !this.wasVisited(x, y)) {
          this.vis[x][y] = 1;
          this.cameFrom[JSON.stringify({x, y})] = {x : pos.x, y: pos.y};
          queue.enqueue({x, y, w: this.heuristica(this.destiny, {x, y})});
        }
      }
    }
  }
  
  calculateChosenPath() {
    this.chosenPath = [];
    
    //console.log(this.cameFrom);
    
    //console.log('origem:', this.origin.x, this.origin.y);
    //console.log('destino:', this.destiny.x, this.destiny.y);
    let pos = this.destiny;
    this.chosenPath.push(pos);
    
    while(!this.isOrigin(pos)) {
      pos = this.cameFrom[JSON.stringify(pos)];
      this.chosenPath.push(pos);
    }
    
    //console.log(this.chosenPath);
    this.chosenPath = this.chosenPath.reverse();
  }
  
  validPosition(x, y) {
    return x >= 0 && x < this.gameMap.width && y >=0 && y < this.gameMap.height && this.gameMap.grid[x][y] != OBSTACULO;
  }
  
  wasVisited(x, y) {
    if (!this.vis[x][y]) this.path.push({x, y});
    return this.vis[x][y];
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
  
  getWeight(pos) {
    return this.gameMap.grid[pos.x][pos.y];
  }
  
  getDistToDestiny() {
    return this.dist[this.destiny.x][this.destiny.y];
  }
  
  heuristica(pos1, pos2) {
    return abs(pos1.x - pos2.x) + abs(pos1.y - pos2.y);
  }
}