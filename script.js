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