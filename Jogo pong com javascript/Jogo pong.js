//Sessão de declaração de variáveis:

//Bolinha:
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

//Velocidade da bolinha:
 let velocidadeXBolinha = 10;
 let velocidadeYBolinha = 10;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;
let colidiu = false;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;
let chancedeErrar = 0

//Variáveis som do jogo
let raquetada
let somPonto
let trilha
//Placar do jogo

let meusPontos = 0 
let pontosOponente = 0

//Sessão de funções:

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    bolinhaNaoFicaPresa ();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    movimentaRaqueteOponente()
    //verificaColisaoRaquetenaousa();
    verificaColisaoRaquete(xRaquete,yRaquete);
    verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    placar ();
}

//Função mostrar a bolinha:
  function mostraBolinha(){
    circle (xBolinha,yBolinha,diametro) 
  }
//Função movimento da bolinha
function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;

}
  //Função bolinha nao fica presa:
  function bolinhaNaoFicaPresa(){
    if (xBolinha - raio <= 0){
    xBolinha = 11
    }
}

//Função verifica colisão bolinha com a borda

function verificaColisaoBorda() {
    if (xBolinha + raio > width || xBolinha - raio < 0) {
        velocidadeXBolinha *= -1;
    }
    if (yBolinha + raio >= height || yBolinha - raio < 0) {
        velocidadeYBolinha *= -1;
    }
}

//Função mostra a raquete: 

function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, raqueteAltura);
}
//Função movimenta a raquete:

function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}
// Função colisao com raquete:
function verificaColisaoRaquetenaousa() {
    if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}
function verificaColisaoRaquete(x,y) {
    colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

//Função movimento raquete oponente: 

function movimentaRaqueteOponente() {
    velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
    yRaqueteOponente += velocidadeYOponente - chancedeErrar
    chanceOponenteErrar();
}

//Função chance do oponente errar:
  function chanceOponenteErrar(){
   if (pontosOponente >= meusPontos) {
     chancedeErrar -= 1;
    if (chancedeErrar >= 39){
      chancedeErrar = 40;
    } else {
      chancedeErrar -= 1
      if (chancedeErrar <= 0 ){
        chancedeErrar = 0
      }
    }
   }
  }
//Funções do placar:

function placar (){
  stroke(255)
  textSize(40)
  textAlign(CENTER)
  fill(255,140,0)
  rect (120,5,60,50)
  rect (420,5,60,50)
  fill(255) 
  text(meusPontos, 150,45);
  fill(255)
  text(pontosOponente, 450,45);
  text (chancedeErrar, 550,30)
  if (xBolinha + raio > 599 ){    
    meusPontos +=  1;
    somPonto.play();
  }
  if (xBolinha - raio < 1) {
    pontosOponente += 1;
    somPonto.play();
  }
}

//função sons

  function preload (){
    trilha = loadSound("trilha.mp3");
    somPonto = loadSound ("ponto.mp3");
    raquetada = loadSound ("raquetada.mp3"); 
  }
