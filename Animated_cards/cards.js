// Criando cada elemento separadamente
const CARD1 = document.createElement("img")
const CARD2 = document.createElement("img")
const CARD3 = document.createElement("img")
const CARD4 = document.createElement("img")
const CARD5 = document.createElement("img")
const CARD6 = document.createElement("img")
const CARD7 = document.createElement("img")
const CARD8 = document.createElement("img")

const ARRAY_IMG = [CARD1, CARD2, CARD3, CARD4, CARD5, CARD6, CARD7, CARD8]

const CONTAINER = document.querySelector(".container")

// Função que insere as imagens dentro de uma div, junto com um overlay de filtro
for (indice in ARRAY_IMG){
    // Imagem
    let imagemSelecionada = ARRAY_IMG[indice]
    imagemSelecionada.setAttribute("src", `Images/Digimon_${parseInt(indice)+1}.jpg`)
    imagemSelecionada.style.width = "150px"
    imagemSelecionada.classList = "card"

    // Div container
    let divImagem = document.createElement("div")
    divImagem.classList = "img_container"
    divImagem.setAttribute("id",`card_${parseInt(indice)+1}`)


    // Eventos que determinam o elemento que foi selecionado e o anterior
    // Também executa as funções que determinam cada tipo de animação
    divImagem.addEventListener("mouseover", (eventoEntrada)=>{
        let elementoEntrada = eventoEntrada.target.parentElement
        ExecucaoEntrada.entrarElemento(elementoEntrada, ARRAY_IMG, "entrada")
    })

    divImagem.addEventListener("mouseleave", (eventoSaida)=>{
        let elementoSaida = eventoSaida.target.parentElement
        ExecucaoEntrada.entrarElemento(elementoSaida,ARRAY_IMG,"saida")
        let esperaNovaEntrada = new Promise((resolve, reject)=>{
            setTimeout(()=>{
                if (ExecucaoEntrada.getEntrada() != ExecucaoEntrada.getSaida()){
                    resolve(()=>{
                        executaMovimento(ExecucaoEntrada.getSaida(), ExecucaoEntrada.getEntrada(), ARRAY_IMG)
                    })
                } else {
                    reject(()=>{
                        executaSaida(eventoSaida.target, ARRAY_IMG)
                    })
                }
            },5)
        })

        esperaNovaEntrada.then(emMovimento =>{
            emMovimento()
        })
        .catch(saiu=>{
            try{
                saiu()
            } catch (erro){
                console.error(erro)
            }
        })
    })

    // Div overlay
    let divOverlay = document.createElement("div")
    divOverlay.classList = "overlay"

    // Inserção de elementos
    CONTAINER.appendChild(divImagem)
    divImagem.appendChild(imagemSelecionada)
    divImagem.appendChild(divOverlay)
}

// Função que executa alterações nas imagens adjacentes à imagem selecionada
function alteraPorSentido(ARRAY_IMG, direcao, comecoCard, passo){
    let condicao
    let fimCard
    
    if (direcao == "direita"){
        condicao = (condicaoInicio,condicaoFim) => condicaoInicio <= condicaoFim
        fimCard = ARRAY_IMG.length-1
    } else {
        condicao = (condicaoInicio,condicaoFim) => condicaoInicio >= condicaoFim
        fimCard = 0
    }

    let totalMudanca = 1
    for (comecoCard; condicao(comecoCard,fimCard); comecoCard+= passo){
        totalMudanca = (totalMudanca*2)/3
        totalMudanca = totalMudanca.toFixed(2)
        if (totalMudanca > 0.3){
            let divImagem = ARRAY_IMG[comecoCard].parentElement
            let novoOverlay = divImagem.querySelector(".overlay")
            animar(novoOverlay, totalMudanca, direcao)
        } else {
            break
        }
    }
}

// Função que determina os parâmetros da animação
function animar(novo, totalMudanca){
    novo.style.backgroundColor = `rgb(0,0,0,${totalMudanca})`

    
}

// Função que seleciona os fundamentos de entrada para cada direção da execução direcional
class ExecucaoEntrada{
    static entrarElemento(elementoAtual, ARRAY_IMG, ocorrencia){
        if (ocorrencia=="entrada"){
            let posicaoSelecionado = parseInt(elementoAtual.id.at(-1))-1
                
            elementoAtual.querySelector(".overlay").style.backgroundColor = "rgb(0,0,0,0.97)"
            
            let passoDireita = 1
            let comecoDireita = posicaoSelecionado+1

            alteraPorSentido(ARRAY_IMG, "direita", comecoDireita, passoDireita)

            let passoEsquerda = -1
            let comecoEsquerda = posicaoSelecionado-1

            alteraPorSentido(ARRAY_IMG, "esquerda", comecoEsquerda, passoEsquerda)
        
            this.mudaEntrada(elementoAtual)
        } if (ocorrencia =="saida"){
            this.mudaSaida(this.getEntrada())
        }
    }

    static elementoEntrada = undefined

    static elementoSaida = undefined

    static mudaEntrada(novo){
        this.elementoEntrada = novo
    }

    static mudaSaida(novo){
        this.elementoSaida = novo
    }

    static getEntrada(){
        return this.elementoEntrada
    }

    static getSaida(){
        return this.elementoSaida
    }
}

// Função que seleciona os fundamentos de movimento entre as imagens para cada direção da execução direcional
function executaMovimento(elementoAnterior, elementoAtual, ARRAY_IMG){
    let posicaoAnterior = parseInt(elementoAnterior.id.at(-1))-1
    let posicaoAtual = parseInt(elementoAtual.id.at(-1))-1

    let corrigir
    if (posicaoAnterior > posicaoAtual){
        corrigir = 2
    } else {
        corrigir = -2
    }
    let elementoCorrigir = ARRAY_IMG[posicaoAnterior+corrigir].parentElement
    elementoCorrigir = elementoCorrigir.querySelector(".overlay")

    animar(elementoCorrigir, 0)
}

// Função que seleciona os fundamentos de saída para cada direção da execução direcional
function executaSaida(elementoSaida, ARRAY_IMG){
    let posicaoAtual = parseInt(elementoSaida.id.at(-1))-1

    let funcaoForCrescente = (posicao, passo, ARRAY_IMG)=>{
        try {
            let elementoCorrigir = ARRAY_IMG[posicao-passo].parentElement
            elementoCorrigir = elementoCorrigir.querySelector(".overlay")
            animar(elementoCorrigir, 0)
        } catch (erro){

        } finally{
            funcaoForDecrescente(posicao, passo, ARRAY_IMG)
        }
    }
    let funcaoForDecrescente = (posicao, passo, ARRAY_IMG)=>{
        try{
            let elementoCorrigir = ARRAY_IMG[posicao+passo].parentElement
            elementoCorrigir = elementoCorrigir.querySelector(".overlay")
            animar(elementoCorrigir, 0)
        } catch {
            
        } finally {
            if (passo > 0){
                passo = passo-1 
                funcaoForCrescente(posicao, passo, ARRAY_IMG)
            }
            return
        }
    }

    funcaoForCrescente(posicaoAtual, 2, ARRAY_IMG)
}

// Realizando a alteração com uma mudança na opacidade do overlay para só depois realizar a animação completa.
// A animação acontece variando propoções, opacidade e borda.


