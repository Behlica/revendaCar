const frm = document.querySelector("form");
const resp1 = document.querySelector("h3");

const carros = [];

frm.addEventListener("submit", (e) => {
    e.preventDefault();
    const modelo = frm.inModelo.value;
    const preco = Number(frm.inPreco.value);
    carros.push({ modelo, preco });
    frm.inModelo.value = "";
    frm.inPreco.value = "";
    frm.inModelo.focus(); // posiciona o cursor em inModelo
    frm.btListarTodos.dispatchEvent(new Event("click"));
});

frm.btListarTodos.addEventListener("click", () => {
    if (carros.length === 0) {
        alert("Não há carros na lista");
        return;
    }
    const lista = carros.reduce((acumulador, carro) =>
        acumulador + carro.modelo + " -R$: " + carro.preco.toFixed(2) + "\n", ""
    );
    resp1.innerText = `Lista dos Carros Cadastrados\n${"-".repeat(40)}\n${lista}`;
});

frm.btFiltrarPorPreco.addEventListener("click", () => {
    const maximo = Number(prompt("Qual o valor máximo que o cliente deseja pagar?"));
    if (maximo === 0 || isNaN(maximo)) {
        return;
    }
    const carrosFiltro = carros.filter(carro => carro.preco <= maximo);
    if (carrosFiltro.length === 0) {
        alert("Não há carros com o preço inferior ou igual ao solicitado");
        return;
    }
    let lista = "";
    for (const carro of carrosFiltro) {
        lista += `${carro.modelo} - R$: ${carro.preco.toFixed(2)}\n`;
    }
    resp1.innerText = `Carros até R$: ${maximo.toFixed(2)}\n${"-".repeat(40)}\n ${lista}`;
});
frm.btSimularPromocao.addEventListener("click", () => {
    const desconto = Number(prompt("Qual o percentual de desconto: "))
    if(desconto == 0 || isNaN(desconto)){
        return
    }
    const carrosDesc = carros.map(aux => ({
        modelo: aux.modelo, 
        preco: aux.preco - (aux.preco* desconto / 100)
    }))
    let lista = ""
    for(const carro of carrosDesc){
        lista += `${carro.modelo} - R$: ${carro.preco.toFixed(2)}\n`
    }
    resp1.innerText = `Carros com desconto: ${desconto}%\n${"-".repeat(40)}\n ${lista}`
})
