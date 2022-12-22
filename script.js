const celula = document.querySelector('#board'); /* seleciona o id board */
const celulas = document.querySelectorAll('#board .cell'); /* seleciona uma celula dentro de board */
const combinacoes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8]
];
let currentTurn;

setup();

function setup(){
    celula.classList.remove('turn-x', 'turn-o');

    for (let celula of celulas){
        celula.classList.remove('x', 'o');
        celula.addEventListener('click', fillCell, {once: true});
    }

    currentTurn = Math.round(Math.random(0,1)) == 1 ? 'x' : 'o'; /* define quem inicia a rodada */
    celula.classList.add('turn-' + currentTurn); /* preenche a celula com provalvel proxima jogada */
}

function fillCell() {
    this.classList.add(currentTurn); /* adiciona definitivamente a celula selecionada a classe de X ou O */

    if (vitoria()){
        const restart = confirm(currentTurn.toUpperCase() + " Venceu, parabéns! Jogar novamente?");
        if (restart) setup();
    } else if(empate()){
        const restart = confirm("Empate! Jogar Novamente?")
        if(restart) setup();
    } else{
        currentTurn = currentTurn == 'x' ? 'o' : 'x'; /* faz com que os jogadores vao se alternando rodada apos rodada */
        celula.classList.remove('turn-o', 'turn-x'); /* remove o simbolo do ultima jogada */
        celula.classList.add('turn-' + currentTurn); /* adiciona o simbolo representando a jogada do jogador X ou O */
    }
}

function vitoria(){
    return combinacoes.some(combinacao => {
        return combinacao.every(c =>{
            if(celulas[c].classList.contains(currentTurn)){
                return true;
            }
            return false;
        });
    });
}

function empate(){
    return [...celulas].every(c =>{
        if(
            c.classList.contains('x') ||
            c.classList.contains('o')
        ) {
            return true;
        }
        return false;
    });
}
