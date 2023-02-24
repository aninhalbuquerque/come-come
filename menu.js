class Menu {
  constructor() {
    background('#EBC5DB');
    textAlign(CENTER);
    textFont('Courier New', 30);
    
    stroke(0);
    strokeWeight(2);
    fill(255);
    text('Escolha a busca desejada', GRID_SIZE*GRID_WIDTH / 2, 80);
    
    strokeWeight(1);
    fill(255);
    rect(25, 125, 250, 75);
    rect(325, 125, 250, 75);
    rect(25, 250, 250, 75);
    rect(325, 250, 250, 75);
    rect(25, 375, 250, 75);
    
    fill(0);
    textSize(24);
    text('LARGURA', 150, 170);
    text('PROFUNDIDADE', 450, 170);
    text('CUSTO UNIFORME', 150, 295);
    text('GULOSA', 450, 295);
    text('A*', 150, 420);
  }
  
  choice(mouseX, mouseY) {
    if (this.chooseLargura(mouseX, mouseY)) return 'Largura';
    if (this.chooseProfundidade(mouseX, mouseY)) return 'Profundidade';
    if (this.chooseCustoUniforme(mouseX, mouseY)) return 'Custo Uniforme';
    if (this.chooseGulosa(mouseX, mouseY)) return 'Gulosa';
    if (this.chooseA(mouseX, mouseY)) return 'A*';
    
    return null;
  }
    
  chooseLargura(mouseX, mouseY) {
    return mouseX >= 25 && mouseX <= 275 && mouseY >= 125 && mouseY <= 200;
  }
    
  chooseProfundidade(mouseX, mouseY) {
    return mouseX >= 325 && mouseX <= 575 && mouseY >= 125 && mouseY <= 200;
  }
    
  chooseCustoUniforme(mouseX, mouseY) {
    return mouseX >= 25 && mouseX <= 275 && mouseY >= 250 && mouseY <= 325;
  }
    
  chooseGulosa(mouseX, mouseY) {
    return mouseX >= 325 && mouseX <= 575 && mouseY >= 250 && mouseY <= 325;
  }
    
  chooseA(mouseX, mouseY) {
    return mouseX >= 25 && mouseX <= 275 && mouseY >= 375 && mouseY <= 450;
  }
}