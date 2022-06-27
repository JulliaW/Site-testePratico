let acessoLiberado = false;

const response = {
    products: [
        {
            "id": "1",
            "nome": "Produto1",
            "descricao": "Produto voltado para teste....",
            "quantidade": "50",
            "preco": "5.0",
            "lote": "AC32",
            "imagem" : "/imagens/produto1"
        },
        {
            "id": "1",
            "nome": "Produto2",
            "descricao": "Produto voltado para teste....",
            "quantidade": "70",
            "preco": "15.0",
            "lote": "BA21",
            "imagem" : "/imagens/produto2"
        },
        {
            "id": "1",
            "nome": "Produto2",
            "descricao": "Produto voltado para teste....",
            "quantidade": "5",
            "preco": "10.0",
            "lote": "tr54",
            "imagem" : "/imagens/produto3"
        }
    ]
}

construirLinhasDaTabela = function() {
    let tableLista = document.querySelector("");

    for(let i=0;i<response.products.length;i++){
        let novaLinha = document.createElement("tr");

        let idTd = document.createElement("td")
        let nomeTd = document.createElement("td")
        let descricaoTd = document.createElement("td")
        let quantidadeTd = document.createElement("td")
        let precoTd = document.createElement("td")
        let loteTd = document.createElement("td")
        let imagemTd = document.createElement("td")

        idTd.textContent = response.products[i].id;
        nomeTd.textContent = response.products[i].nome;
        descricaoTd.textContent = response.products[i].descricao;
        quantidadeTd.textContent = response.products[i].quantidade;
        precoTd.textContent = response.products[i].preco;
        loteTd.textContent = response.products[i].lote;
        imagemTd.textContent = response.products[i].imagem;

        novaLinha.appendChild(tdId);
        novaLinha.appendChild(nomeTd);
        novaLinha.appendChild(descricaoTd);
        novaLinha.appendChild(quantidadeTd);
        novaLinha.appendChild(precoTd);
        novaLinha.appendChild(loteTd);
        novaLinha.appendChild(imagemTd);
        
        tableLista.appendChild(novaLinha);
    }
}

var FILTRO = ''

function pesquisar(value){
    FILTRO = value;
    desenhar()
}


function desenhar(){
    const tbody = document.getElementById('listaRegistrosBody')
    if(tbody){
        var data = produto.produtos;
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
                        <td>${produto.imagem}</td>
                        <td>
                            <button onclick='vizualizar("cadastro",false,${produto.id})'>Editar</button>
                            <button class='vermelho' onclick='perguntarSeDeleta(${produto.id})'>Excluir</button>
                        </td>
                    </tr>`
            } )
        tbody.innerHTML = data.join('')
    }
}


function insertProduto(nome, descricao, quantidade, preco, lote, imagem){
    
    obj = {
        "id": inputId.textContent,
        "nome": inputNome.textContent,
        "descricao": inputDescricao.textContent,
        "quantidade": inputQuantidade.textContent,
        "preco": inputPreco.textContent,
        "lote": inputLote.textContent,
        "imagem" : inputImagem.imageContent
    }

    //response = fetch('url', () => { method: 'POST', body: obj } ).then(r => JSON.parse(r))

    response.products.push(obj);

    construirLinhasDaTabela(response);
}

function vizualizar(pagina, novo=false, id=null){
    document.body.setAttribute('page',pagina)
}

/*function inserirImagem{
    //abrir página para inserir imagem   
}*/

window.addEventListener('load', () => {

    if(acessoLiberado == true)
    {
        // response = fetch('url', () => { method: 'GET'} ).then(r => JSON.parse(r));
        construirLinhasDaTabela(response)
    }
    else
    {
        window.location = '/Login.html'
        alert("Realize o login para ter acesso ao sistema.")
    }
    
})

function openModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'Block';
    document.body.style.overflow = 'hidden';
}

function closeModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}