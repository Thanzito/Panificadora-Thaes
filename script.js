// Função que busca dados do localStorage ou inicia uma lista vazia
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
let editandoIndex = null;

//Elementos do DOM
const form = document.getElementById("form-produto");
const tabela = document.getElementById("tabela-produtos");
const busca = document.getElementById("busca");
const filtroCategoria = document.getElementById("filtro-categoria");

function salvarDados(){
    localStorage.setitem("produtos", JSON.stringify(produtos));
}
function atualizarCategoria(){
    filtroCategoria.innerHTML = '<option value="">Todas as categorias</option>';
    const categoriasunicas = [... new Set(produtos.map(p=> p.categoria))];
    categoriasunicas.forEach(cat =>{
        const option = document.createElement("option");
        option.value.textContent = cat;
        filtroCategoria.appendChild(option);
    });
}

//Atualiza a tabela com produtos filtrados
function atualizarTabela(){
    tabela.innerHTML = "";

    const filtroTexto = busca.value.toLowerCase();
    const categoriaSelecionada = filtroCategoria.value;

    produtos.forEach((produto,index)=> {
        const nomeOk = produto.nome.toLowerCase().includes(filtroTexto);
        const categoriaOk = categoriaSelecionada === "" || produto.categoria === categoriaSelecionada;

        if(nomeOk && categoriaOk){
            const tr = document.createElement("tr");
            
            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.unidade}</td>
                <td>${produto.categoria}</td>
                <td>
                    <button class="acao adicionar" onclick="alterarQuantidade(${index}, 1)">+</button>
                    <button class="acao remover" onclick="alterarQuantidade(${index}, -1)">-</button>
                    <button class="acao editar" onclick="editarProduto(${index}, 1)">Editar</button>
                    <button class="acao remover" onclick="removerProduto(${index}, 1)">Remover</button>

                </td>
            `;
                tabela.appendChild(tr);
        }
    })
}

//Adicionar ou editar produto
form.addEventListener("submit",function(event){
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const quantidade = parseInt(document.getElementById("quantidade").value);
    const unidade = document.getElementById("unidade").value;
    const categoria = document.getElementById("categoria").value;

    const novoProduto = {nome, quantidade, unidade, categoria};

    if(editandoIndex === null){
        produtos.push(novoProduto);
    } else {
        produtos[editandoIndex] = novoProduto;
        editandoIndex = null;
    }
    salvarDados();
    atualizarTabela();
    atualizarCategoria();
    form.reset()
});
//Alterar quantidade
function alterarQuantidade(index, valor){
    produtos[index].quantidade += valor;
    if(produtos[index].quantidade < 0){
        produtos[index].quantidade = 0;
    }
    salvarDados();
    atualizarTabela();
}
//Editar produto
function editarProduto(){
    const produto = produtos[index];
    document.getElementById("nome").value = produto.nome;
    document.getElementById("quantidade").value = produto.quantidade;
    document.getElementById("unidade").value = produto.unidade;
    document.getElementById("categoria").value = produto.categoria;
    editandoIndex = index;
}
//Remover produto
function removerProduto(){
    produtos.splice(index, 1);
    salvarDados()
    atualizarCategoria();
    atualizarTabela();
}
