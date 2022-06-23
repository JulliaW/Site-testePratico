const KEY_BD = '@produtos'

/*const response = {
    products: [
        {
            "id": "1",
            "nome": "Produto1",
            "descricao": "Produto voltado para teste....",
            "quantidade": "50",
            "preco": "5.0",
            "lote": "AC32"
        },
        {
            "id": "1",
            "nome": "Produto2",
            "descricao": "Produto voltado para teste....",
            "quantidade": "70",
            "preco": "15.0",
            "lote": "BA21"
        },
        {
            "id": "1",
            "nome": "Produto2",
            "descricao": "Produto voltado para teste....",
            "quantidade": "5",
            "preco": "10.0",
            "lote": "tr54"
        }
    ]
}*/

/*construirLinhasDaTabela = function() {
    let table = document.querySelector("");

    for(let i=0;i<response.products.length;i++){
        let novaLinha = document.createElement("li");

        let idTd = document.createElement("td")
        let nomeTd = document.createElement("td")
        let descricaoTd = document.createElement("td")
        let quantidadeTd = document.createElement("td")
        let precoTd = document.createElement("td")
        let loteTd = document.createElement("td")

        idTd.textContent = response.products[i].id;

        novaLinha.appendChild(tdId);
        
        table.appendChild(novaLinha);
    }
}*/


var listaRegistros = {
    ultimoIdGerado:0,
    produtos:[]
}


var FILTRO = ''


function gravarBD(){
    localStorage.setItem(KEY_BD, JSON.stringify(listaRegistros) )
}

function lerBD(){
    const data = localStorage.getItem(KEY_BD)
    if(data){
        listaRegistros = JSON.parse(data)
    }
    desenhar()
}


function pesquisar(value){
    FILTRO = value;
    desenhar()
}


function desenhar(){
    const tbody = document.getElementById('listaRegistrosBody')
    if(tbody){
        var data = listaRegistros.produtos;
        if(FILTRO.trim()){
            const expReg = eval(`/${FILTRO.trim().replace(/[^\d\w]+/g,'.*')}/i`)
            data = data.filter( produto => {
                return expReg.test( produto.nome ) || expReg.test( produto.descricao ) || expReg.test( produto.quantidade ) || expReg.test( produto.preco ) || expReg.test( produto.lote ) 
            } )
        }
        data = data
            .sort( (a, b) => {
                return a.nome < b.nome ? -1 : 1
            })
            .map( produto => {
                return `<tr>
                        <td>${produto.id}</td>
                        <td>${produto.nome}</td>
                        <td>${produto.descricao}</td>
                        <td>${produto.quantidade}</td>
                        <td>${produto.preco}</td>
                        <td>${produto.lote}</td>
                        <td>
                            <button onclick='vizualizar("cadastro",false,${produto.id})'>Editar</button>
                            <button class='vermelho' onclick='perguntarSeDeleta(${produto.id})'>Excluir</button>
                        </td>
                    </tr>`
            } )
        tbody.innerHTML = data.join('')
    }
}

let inputId = document.querySelector("#id");

function insertProduto(nome, descricao, quantidade, preco, lote){
    
    /*
    obj = {
        "id": inputId.textContent
        "nome": inputNome.textContent
        "descricao": inputDescricao.textContent
        "quantidade": inputQuantidade.textContent
        "preco": inputPreco.textContent
        "lote": inputLote.textContent
    }

    //response = fetch('url', () => { method: 'POST', body: obj } ).then(r => JSON.parse(r))

    response.products.push(obj);

    construirLinhasDaTabela(response);*/
    
    const id = listaRegistros.ultimoIdGerado + 1;
    listaRegistros.ultimoIdGerado = id;
    listaRegistros.produtos.push({
        id, nome, descricao, quantidade, preco, lote
    })
    gravarBD()
    desenhar()
    vizualizar('lista')
}

function editProduto(id, nome, descricao, quantidade, preco, lote){
    var produto = listaRegistros.produtos.find( produto => produto.id == id )
    produto.nome = nome;
    produto.descricao = descricao;
    produto.quantidade = quantidade;
    produto.preco = preco;
    produto.lote = lote;
    gravarBD()
    desenhar()
    vizualizar('lista')
}

function deleteProduto(id){
    listaRegistros.produtos = listaRegistros.produtos.filter( produto => {
        return produto.id != id
    } )
    gravarBD()
    desenhar()
}

function perguntarSeDeleta(id){
    if(confirm('Tem certeza que deseja deletar o produto '+id +'?')){
        deleteProduto(id)
    }
}


function limparEdicao(){
    document.getElementById('nome').value = ''
    document.getElementById('descricao').value = ''
    document.getElementById('quantidade').value = ''
    document.getElementById('preco').value = ''
    document.getElementById('lote').value = ''
}

function vizualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page',pagina)
    if(pagina == 'cadastro'){
        if(novo) limparEdicao()
        if(id){
            const produto = listaRegistros.produtos.find( produto => produto.id == id )
            if(produto){
                document.getElementById('id').value = produto.id
                document.getElementById('nome').value = produto.nome
                document.getElementById('descricao').value = produto.descricao
                document.getElementById('quantidade').value = produto.quantidade
                document.getElementById('preco').value = produto.preco
                document.getElementById('lote').value = produto.lote
            }
        }
        document.getElementById('nome').focus()
    }
}



function submeter(e){
    e.preventDefault()
    const data = {
        id: document.getElementById('id').value,
        nome: document.getElementById('nome').value,
        descricao: document.getElementById('descricao').value,
        quantidade: document.getElementById('quantidade').value,
        preco: document.getElementById('preco').value, 
        lote: document.getElementById('lote').value,
    }
    if(data.id){
        editProduto(data.id, data.nome, data.descricao, data.quantidade, data.preco, data.lote)
    }else{
        insertProduto( data.nome, data.descricao, data.quantidade, data.preco, data.lote )
    }
}


window.addEventListener('load', () => {
    lerBD()
    document.getElementById('cadastroRegistro').addEventListener('submit', submeter)
    document.getElementById('inputPesquisa').addEventListener('keyup', e => {
        pesquisar(e.target.value)
    })

    // response = fetch('url', () => { method: 'GET'} ).then(r => JSON.parse(r));

    //construirLinhasDaTabela(response)
})