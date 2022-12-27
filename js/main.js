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

    } else{

        itemAtual.id = itens.length
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

 
    lista.appendChild(novoItem)

}

function atualizaElemento (item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

