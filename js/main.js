const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
/* criar array pra poder armazenar varios elementos. */
const itens = JSON.parse(localStorage.getItem("itens")) || [];

/* ao carregar a pagina buscar os elementos do localstorage */
itens.forEach((elemento) => {
    criaElemento(elemento)
});


form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']



    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome":nome.value,
        "quantidade":quantidade.value
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        /*atualizar o localstorage após fazer uma alteração na quantidade de produtos */
        itens[itens.findIndex(elemento  => elemento.id === existe.id)] = itemAtual

    } else{
        /*outra forma de fazer if/else (? :) */
        itemAtual.id = itens[itens.length-1] ?  (itens[itens.length-1]).id + 1 : 0;
        criaElemento(itemAtual)
        /* puxar o item atual pra dentro do array (colocar cada elemento inserido pelo usuário no array) */
        itens.push(itemAtual)
    }

   

    /* armazenar no local storage (JSON.stringify - transformar em string ) */
    localStorage.setItem("itens",JSON.stringify( itens))


    /* zerar os valores após o submit */
    nome.value = ""
    quantidade.value = ""
})

function criaElemento(item){

    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade 
    numeroItem.dataset.id = item.id
    novoItem.appendChild (numeroItem)
    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

 
    lista.appendChild(novoItem)

}

function atualizaElemento (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}


function botaoDeleta(id){
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function(){
        /*parent node para remover o elemento pai, se fizer apenas usando o this ira remover apenas o botao, para remover tudo usar o parentNode */
        deletaElemento(this.parentNode, id)
    })
    return elementoBotao
}

function deletaElemento (tag, id){
    tag.remove()

    /*remover um item do localstorage usar o splice */
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens",JSON.stringify( itens))
}