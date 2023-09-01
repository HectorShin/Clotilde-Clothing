var data;

function appendToStorage(name, data) {
    var old = localStorage.getItem(name);
    if(old === null) old = "";
    if(old.includes(data)!=true) {
        localStorage.setItem(name, old + data);
    }
    console.log(localStorage.getItem(name));
}

async function loadCart(name) {
    await fetchAsync('https://entregavel.polijrinternal.com/produtos');
    console.log(data);
    var cart = localStorage.getItem(name);
    var productsDiv = document.getElementById("cart-container");
    if (cart == null) {
        var noneDiv = document.createElement("div");
        noneDiv.innerHTML = "Nenhum item adicionado"
        noneDiv.classList.add("produto-div")
        productsDiv.appendChild(noneDiv)
    }
    else {
        let totalValor = 0
        for (let i = 0; i < cart.length; i++) {
            var product = document.createElement("div");
            product.classList.add("produto-div");
            productsDiv.appendChild(product)

            var productFoto = document.createElement("img");
            productFoto.classList.add("produto-foto");
            productFoto.src = data[parseInt(cart[i])]["foto"];
            product.appendChild(productFoto)
            

            var productNome = document.createElement("div");
            productNome.classList.add("produto-nome");
            productNome.innerHTML = data[parseInt(cart[i])]["nome"];
            product.appendChild(productNome)

            var productPreco = document.createElement("div");
            productPreco.classList.add("produto-preco");
            var valor = (data[parseInt(cart[i])]["preco"] * (1 - data[parseInt(cart[i])]["porcentagem_de_desconto"])).toFixed(2)
            productPreco.innerHTML = "R$ " + valor;
            product.appendChild(productPreco)

            totalValor += parseFloat(valor);
            console.log(totalValor)
        }
        var total = document.createElement("div");
        var totalTexto = document.createElement("div");
        var totalPreco = document.createElement("div");

        totalTexto.innerHTML = "TOTAL A PAGAR"

        totalPreco.innerHTML = "R$ " + totalValor

        total.classList.add("carrinho-total");

        total.appendChild(totalTexto)
        total.appendChild(totalPreco)
        productsDiv.appendChild(total)
    }
}

async function fetchAsync (url, homepage) {
    console.log("teste")
    let response = await fetch(url);
    data = await response.json();
    if (homepage == true) updateProducts()
  }

function updateProducts () {
    var productsDiv = document.getElementById("produtos-flex");
    console.log(productsDiv);
    for (let i = 0; i < data.length; i++) {
        var newProduct = document.createElement("div");
        var photo = document.createElement("img");
        var desc = document.createElement("h2");
        var temporada = document.createElement("h3");
        var preco = document.createElement("h2");

        photo.src = data[i]["foto"];
        photo.classList.add("produto-foto");

        desc.textContent = data[i]["nome"];

        temporada.textContent = data[i]["temporada"];

        

        newProduct.classList.add("um-produto");
        productsDiv.appendChild(newProduct);
        newProduct.appendChild(photo);
        newProduct.appendChild(temporada);
        newProduct.appendChild(desc);
        
        var desconto = data[i]["porcentagem_de_desconto"];
        console.log(desconto);
        if (desconto != 0) {
            var precoAntigo = document.createElement("h3");
            precoAntigo.textContent = "R$ " + data[i]["preco"];
            precoAntigo.style.textDecoration = "line-through";
            newProduct.appendChild(precoAntigo);
            precoValue = data[i]["preco"] * (1 - desconto);
            console.log(preco);
        }
        else {
            precoValue = data[i]["preco"];
        }

        precoValue = precoValue.toFixed(2);
        
        preco.textContent = "RS " + precoValue;
        
        newProduct.appendChild(preco);

        var tamanhos = data[i]["tamanhos_disponiveis"];

        var tamanhosDiv = document.createElement("div");
        tamanhosDiv.classList.add("tamanhos");

        for (let j = 0; j < tamanhos.length; j++){
            console.log("id " + i + " tamanho" + tamanhos[j]);
            var tamanho = document.createElement("div");
            tamanho.innerHTML = tamanhos[j];
            tamanho.classList.add("tamanho");
            newProduct.appendChild(tamanhosDiv);
            tamanhosDiv.appendChild(tamanho);
            console.log(newProduct);
        }
        newProduct.onclick = function() {
            console.log(data[i])
            appendToStorage("carrinho", i)
            window.location.href = "carrinho.html";
        };
    }
}

