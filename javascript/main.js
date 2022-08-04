const canva = document.querySelector('#folha');
let area = canva.getContext("2d");

const larguraCampo = 600;
const alturaCampo = 500;
const larguraLinha = 5;
const larguraBola = 10;
const alturaRaquete = 50;
const larguraRaquete = 5;

let posicaoP1 = 200;
let posicaoP2 = 200;
let pontuacaoP1 = 0;
let pontuacaoP2 = 0;
let velocidadeP2 = 6;

let xBola = 295;
let yBola = 245;
let velocidadeBolaX = -5;
let velocidadeBolaY = 5;

let efeitoRaquete = 0.05;



window.onload = function(){
    setInterval(principal, 1000/30)
}

canva.addEventListener('mousemove',function(event){
    posicaoP1 = event.clientY - alturaRaquete/2 - 80;
});

function desenhar(){
    // Background
    area.fillStyle = '#000000';
    area.fillRect(0, 0, larguraCampo, alturaCampo);

    area.fillStyle = '#FFFFFF';

    // Linha
    area.fillRect((larguraCampo/2) - (larguraLinha/2), 0, larguraLinha, alturaCampo);

    //Raquete P1
    area.fillRect(0, posicaoP1, larguraRaquete, alturaRaquete);

    //Raquete P2
    area.fillRect((larguraCampo-larguraRaquete), posicaoP2, larguraRaquete, alturaRaquete);

    //Desenha Bola
    area.fillRect(xBola, yBola, larguraBola, larguraBola);
}

function continuar(){
    xBola = larguraCampo/2 - larguraBola/2;
    yBola = alturaCampo/2 - larguraBola/2;
    velocidadeBolaX = -5;
    velocidadeBolaY = 5;
}


function calcular(){
    //Verifica laterais cima e baixo
    if(yBola <= 0 || yBola >= (alturaCampo-larguraBola)){
        velocidadeBolaY*=-1;
    }

    //verifica bateu Raquete P1
    if(xBola <= 0){
        if((yBola+larguraBola) > posicaoP1 && yBola < (posicaoP1 + alturaRaquete)){
            velocidadeBolaX*=-1.05;
            velocidadeBolaY*=1.05;
        }else{
            pontuacaoP2++;
            continuar();
        }
    }

    //verifica bateu Raquete 2
    if((xBola+larguraBola)>=larguraCampo){
        if((yBola+larguraBola) > posicaoP2 && yBola < (posicaoP2 + alturaRaquete)){
            velocidadeBolaX*=-1.05;
            velocidadeBolaY*=1.05;
        }else{
            pontuacaoP1++;
            continuar();
        }
    }

    //Escrever pontuação do jogo
    area.font = '14px serif'
    area.fillText(`Humano - ${pontuacaoP1} pontos`, 100,100);
    area.fillText(`Computador - ${pontuacaoP2} pontos`, (larguraCampo-200),100);

    xBola +=velocidadeBolaX;
    yBola +=velocidadeBolaY;

    //Atualizar jogador 2
    if((posicaoP2 + alturaRaquete/2) < yBola){
        posicaoP2+= velocidadeP2;
    }else{
        posicaoP2 -= velocidadeP2;
    }
}

function principal(){
    desenhar();
    calcular();
}
