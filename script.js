//Função que busca dados do localstorage ou inicia uma lista vazia

let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

//Elementos do DOM

const form = document.getElementById("form-produto");
const tabela = document.getElementById("tabela-produtos");
const busca = document.getElementById("busca");

//Funcão para salvar os dados do localstorage

function salvarDados(){
    localStorage.setItem("produtos", JSON,stringify(produtos));
}

//Função para desenhar a tabela com os produtos

function atualizarTabela(){
    //limpar a tabela de atualização
    tabela.innerHTML = "";

    //Filtro de busca
    const filtro = busca.value.toLowerCase();
    //Percorrer todos os produtos
    produtos.forEach((produto, index) => {
        if(produto.nome.toLowerCase().includes(filtro)){
            const tr = document.createElement("tr");

            //Colunas de tabela
            tr.innerHTML = `
                <td>${produto.nome}<\td>
                <td>${produto.quantidade}<\td>
                <td>${produto.unidade}<\td>
                <td>${produto.categoria}<\td>
                <td>
                    <button class="acao adicionar" onclick="alterarQuantidade(${index},1)">+</button>
                    <button class="acao remover" onclick="alterarQuantidade(${index},-1)">-</button>
                    <button class="acao remover" onclick="removerProduto(${index})">Excluir</button>
                <\td>
            `;
                     tabela.appendChild(tr);
        }
    });
}
//Adicionar um novo produto
form.addEventListener("submit",function(event){
    event.preventDefault(); //Evita o recarregamento da página

    const nome = document.getElementById("nome").value;
    const quantidade = parsetInt(document.getElementById("quantidade").value);
    const unidade = document.getElementById("unidade").value;
    const categoria = document.getElementById("categoria").value;

    //Cria um novo objeto de produto
    const novoProduto = {
        nome,
        quantidade,
        unidade,
        categoria
    }

    //Adiciona na lista 
    produtos.push(novoProduto);

    //Atualiza a tabela e salva
    salvarDados();
    atualizarTabela();

    //Limpa o formulário
    form.reset();
});

//Alterar a quantidade do produto
function alterarQuantidade(index,valor){
    produtos[index].quantidade +=valor;

//Evita quantidade negativa
    if (produtos[index].quantidade < 0){
         produtos[index].quantidade = 0;
    }

    salvarDados();
    atualizarTabela();
}
//remove um produto da lista
function removerProduto(index){
    produtos.splice(index,1);
    salvarDados();
    atualizarTabela();
}
//Atualiza a tabela ao digitar no campo de busca
busca.addEventListener("input", atualizarTabela);

//Primeira renderização
atualizarTabela();
