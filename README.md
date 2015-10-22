# educod@r
Projeto de game para ser usado no ensino de programação para crianças e adolescentes.

## Comandos Básicos:

girarParaDireita() - Gira o avião para a direita

girarParaEsquerda() - Gira o avião para a esquerda

andar(casas) -- Sem parâmetro anda uma casa

checarTesouro() -- Deve ser usado em uma casa anterior ao tesouro com o player apontado para ele.

## Funções (sequência de comandos):

meiaVolta() {
	girarParaDireita(); 
	girarParaDireita();
} 

andarEChecarTesouro(x){
	andar(x)
	checaTesouro()
}

andarChecandoTesouro(x) {
	andar(1)
	checarTesouro()
	...
	andar(1)
	checarTesouro()
}
