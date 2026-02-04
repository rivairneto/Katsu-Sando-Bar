/*************************
 * PRODUTOS
 *************************/
const produtos = [
    { 
        id: 1, cat: 'sando', nome: "TONKATSU", preco: 68,
        desc: "Barriga de porco, repolho, molho tare e togarashi mayo.",
        foto: "https://media-cdn2.greatbritishchefs.com/media/lkkh2jds/img84400.whqc_768x512q90.jpg"
    },
    { 
        id: 2, cat: 'sando', nome: "EBI", preco: 68,
        desc: "Camarão, salada de repolho, molho tártaro e molho tare.",
        foto: "https://cdn.sanity.io/images/f3knbc2s/production/948523db7651234ca569d22d265750a08b23dbcd-2500x1500.jpg"
    },
    { 
        id: 3, cat: 'sando', nome: "GYUKATSU", preco: 74,
        desc: "Filé mignon, japanese mayo e molho de ostra.",
        foto: "https://media-cdn.tripadvisor.com/media/photo-s/1c/eb/11/42/gyu-katsu-sando.jpg"
    },
    { 
        id: 4, cat: 'sando', nome: "TORI", preco: 58,
        desc: "Frango, picles, salada de repolho, tare e japanese mayo.",
        foto: "https://ironchefshellie.com/wp-content/uploads/2025/05/UMAI-Tori-Katsu-Sando-293776-1-e1748683905283.jpg"
    },
    { 
        id: 5, cat: 'sando', nome: "KARUPATCHO", preco: 68,
        desc: "Carpaccio Wagyu, parmesão, rúcula, repolho e mostarda.",
        foto: "https://images.getrecipekit.com/20250711211124-wagyu-sando.jpg"
    },
    { 
        id: 6, cat: 'sando', nome: "WAGYU", preco: 485,
        desc: "NY strip Wagyu, molho de ostra e japanese mayo.",
        foto: "https://i.redd.it/35xy8liu8v5c1.jpg"
    },

    { 
        id: 7, cat: 'bebida', nome: "Coca-Cola", preco: 6,
        desc: "Lata 350ml",
        foto: "https://app.cardapiodigital.net/sabordonordeste/2591-large_default/refrigerante-lata.jpg"
    },
    { 
        id: 8, cat: 'bebida', nome: "Coca-Cola Zero", preco: 6,
        desc: "Lata 350ml",
        foto: "https://drogal.vtexassets.com/arquivos/ids/264563/177004.jpg"
    },
    { 
        id: 9, cat: 'bebida', nome: "Guaraná", preco: 6,
        desc: "Lata 350ml",
        foto: "https://brf.file.force.com/servlet/servlet.ImageServer?id=015U600000025zh&oid=00D410000012TJa&lastMod=1703691077000"
    },
    { 
        id: 10, cat: 'bebida', nome: "Guaraná Zero", preco: 6,
        desc: "Lata 350ml",
        foto: "https://hortifrutibr.vtexassets.com/arquivos/ids/173876/Refrigerante-Guarana-Antarctica-zero-Lata-350ml.jpg.jpg"
    },
    { 
        id: 11, cat: 'bebida', nome: "Água Mineral", preco: 5,
        desc: "500ml",
        foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7tyW9us0wA1wWSW7iipCQkYYwRzTYZG4tZw&s"
    },
    { 
        id: 12, cat: 'bebida', nome: "Água com Gás", preco: 5,
        desc: "500ml",
        foto: "https://carrefourbrfood.vtexassets.com/arquivos/ids/18904682/agua-mineral-com-gas-crystal-500ml-1.jpg"
    }
];

/*************************
 * CONFIG
 *************************/
const WHATSAPP_NUMERO = "5584994336091"; // ALTERE
let carrinho = [];

/*************************
 * RENDER MENU
 *************************/
function renderizarMenu() {
    const gridSandos = document.getElementById('grid-sandos');
    const gridBebidas = document.getElementById('grid-bebidas');

    gridSandos.innerHTML = "";
    gridBebidas.innerHTML = "";

    produtos.forEach(p => {
        const itemHTML = `
            <div class="item-cardapio">
                <div class="foto-produto" style="background-image:url('${p.foto}')"></div>
                <div class="conteudo-item">
                    <div class="item-header">
                        <span class="item-nome">${p.nome}</span>
                        <span class="item-preco">R$ ${p.preco.toFixed(2)}</span>
                    </div>
                    <p class="item-desc">${p.desc}</p>

                    <div class="quantidade-controle">
                        <button class="btn-qtd" onclick="diminuir(${p.id})">−</button>
                        <span class="qtd-numero" id="qtd-${p.id}">0</span>
                        <button class="btn-qtd" onclick="adicionar(${p.id})">+</button>
                    </div>
                </div>
            </div>
        `;

        if (p.cat === 'sando') gridSandos.innerHTML += itemHTML;
        else gridBebidas.innerHTML += itemHTML;
    });
}

/*************************
 * CARRINHO
 *************************/
function adicionar(id) {
    const item = carrinho.find(i => i.id === id);

    if (item) {
        item.quantidade++;
    } else {
        const produto = produtos.find(p => p.id === id);
        carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarUI(id);
}

function diminuir(id) {
    const item = carrinho.find(i => i.id === id);
    if (!item) return;

    item.quantidade--;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(i => i.id !== id);
    }

    atualizarUI(id);
}

function atualizarUI(id) {
    atualizarContagem();

    const span = document.getElementById(`qtd-${id}`);
    if (!span) return;

    const item = carrinho.find(i => i.id === id);
    span.innerText = item ? item.quantidade : 0;
}

function atualizarContagem() {
    document.getElementById('contagem').innerText =
        carrinho.reduce((acc, i) => acc + i.quantidade, 0);
}

/*************************
 * MODAL
 *************************/
function abrirCarrinho() {
    const lista = document.getElementById('itens-lista');
    const totalDisplay = document.getElementById('total-valor');

    lista.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        lista.innerHTML += `
            <div class="item-carrinho">
                <div class="info-carrinho">
                    <strong>${item.nome}</strong>
                    <span>R$ ${subtotal.toFixed(2)}</span>
                </div>

                <div class="quantidade-controle">
                    <button class="btn-qtd" onclick="diminuir(${item.id}); abrirCarrinho()">−</button>
                    <span class="qtd-numero">${item.quantidade}</span>
                    <button class="btn-qtd" onclick="adicionar(${item.id}); abrirCarrinho()">+</button>
                </div>
            </div>
        `;
    });

    totalDisplay.innerText = `R$ ${total.toFixed(2)}`;
    document.getElementById('modal-carrinho').style.display = "flex";
}


function fecharCarrinho() {
    document.getElementById('modal-carrinho').style.display = "none";
}

function esvaziarCarrinho() {
    carrinho = [];
    atualizarContagem();
    document.querySelectorAll('.qtd-numero').forEach(q => q.innerText = "0");
    fecharCarrinho();
}

/*************************
 * FINALIZAR PEDIDO
 *************************/
function finalizarPedido() {
    if (carrinho.length === 0) return alert("Carrinho vazio!");

    const endereco = document.getElementById('endereco').value;
    const pagamento = document.getElementById('pagamento').value;
    const observacao = document.getElementById('observacao').value;
    const cupom = document.getElementById('cupom').value.trim().toUpperCase();

    if (!endereco) return alert("Informe o endereço!");
    if (!pagamento) return alert("Selecione o pagamento!");

    let total = 0;
    carrinho.forEach(i => total += i.preco * i.quantidade);

    let desconto = (cupom === "CHEF30") ? total * 0.30 : 0;
    let totalFinal = total - desconto;

    let msg = "🍽️ *NOVO PEDIDO – KATSU SANDO BAR*\n\n";

    carrinho.forEach(i => {
        msg += `${i.quantidade}x ${i.nome}\n`;
    });

    if (desconto > 0) {
        msg += `\n🎟️ Cupom CHEF30 (-30%)`;
        msg += `\n💸 Desconto: R$ ${desconto.toFixed(2)}`;
    }

    msg += `\n\n💰 Total: R$ ${totalFinal.toFixed(2)}`;
    msg += `\n📍 Endereço: ${endereco}`;
    msg += `\n💳 Pagamento: ${pagamento}`;

    if (observacao) msg += `\n📝 Obs: ${observacao}`;

    window.open(
        `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`,
        "_blank"
    );

    esvaziarCarrinho();
}

/*************************
 * INIT
 *************************/
document.addEventListener('DOMContentLoaded', renderizarMenu);



