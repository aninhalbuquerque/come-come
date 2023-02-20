class BFS {
  constructor(origin, destiny, gameMap) {
    this.origin = origin;
    this.destiny = destiny;
    //console.log('destino:' + str(destiny));
    this.gameMap = gameMap;
    this.path = [];
    this.ways = [[-1, 0], [0, -1], [1, 0], [0, 1]];
  }
  
  calculatePath() {
    let vis = this.gameMap.createEmptyGrid();
    let queue = new Array();
    queue.push(this.origin);
    vis[this.origin.x][this.origin.y] = 1;
    
    while(queue.length > 0) {
      let pos = queue.shift();
      //console.log(pos);
      this.path.push(pos);
      
      if(this.isDestiny(pos)) {
        console.log('achei bfs');
        break;
      }
      
      for (let i = 0; i < this.ways.length; i++) {
        let x = pos.x + this.ways[i][0];
        let y = pos.y + this.ways[i][1];
        
        if(this.validPosition(x, y) && !vis[x][y]) {
          vis[x][y] = 1;
          queue.push({x, y});
        }
      }
    }
  }
  
  validPosition(x, y) {
    return x >= 0 && x < this.gameMap.width && y >=0 && y < this.gameMap.height && this.gameMap.grid[x][y] != OBSTACULO;
  }
  
  isDestiny(pos) {
    return pos.x == this.destiny.x && pos.y == this.destiny.y;
  }
  
  drawPath(i) {
    for(let j = 0; j <= i; j++) {
      rectMode(CORNER);
      stroke(0);
      fill(cores[CAMINHO]);
      rect(this.path[j].x*GRID_SIZE, this.path[j].y*GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
  }
}