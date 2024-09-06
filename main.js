let menu = document.querySelector('#menu-icon');
let sidenavbar = document.querySelector('.side-navbar');
let content = document.querySelector('.content');

menu.onclick = () => {
    sidenavbar.classList.toggle('active');
    content.classList.toggle('active');
}
/*
function lucro() {
    // Pegando os valores dos campos de entrada
    const receita = parseFloat(document.getElementById("receita").value);
    const expenses = parseFloat(document.getElementById("expenses").value);

    // Somando os valores
    const lucro = receita + expenses;

    // Exibindo o resultado
    document.getElementById("resultado").textContent = lucro;
}
*/

/* BTN MENU*/
$(".btn-menu").click(function(){
    $(".menu").show();
});
$(".btn-closed").click(function(){
    $(".menu").hide();
});

/*-- TABELA GASTOS----*/

let expenses = [];

function addExpense() {
    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(document.getElementById("product-price").value);

        
    let s1 = parseFloat(document.getElementById("expenses").innerText);
    let expen = productPrice + s1;
       document.getElementById("expenses").innerText = expen;
       

    if (productName && !isNaN(productPrice) && productPrice > 0) {
        expenses.push({ name: productName, price: productPrice });
        updateTable();
        updateChart();
        updateh1();

       
        /*
            let h1Element = document.getElementById("expenses");
            h1Element.innerText = "-R$" + expenseValues;
            let inputValue = parseFloat(document.getElementById("product-price").value);
            let newTotal = currentTotal + inputValue; 
            document.getElementById("expenses").innerText = "-R$" + newTotal; */
        
    } else {
        alert("Por favor, insira um nome de produto válido e um preço positivo.");
    }
}

function updateTable() {
    const tableBody = document.getElementById("expenses-table").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = "";

    expenses.forEach(expense => {
        const row = tableBody.insertRow();
        const nameCell = row.insertCell(0);
        const priceCell = row.insertCell(1);

        nameCell.innerText = expense.name;
        priceCell.innerText = "R$ " + expense.price.toFixed(2);
    });
}

function updateChart() {
    const totalMoney = parseFloat(document.getElementById("total-money").value);
    const expenseNames = expenses.map(expense => expense.name);
    const expenseValues = expenses.map(expense => expense.price);
    const remainingMoney = totalMoney - expenseValues.reduce((a, b) => a + b, 0);

    let s1 = parseFloat(document.getElementById("expenses").innerText);
    let lucro = totalMoney - s1;
       document.getElementById("lucro").innerText = lucro;

    
    if (isNaN(totalMoney) || totalMoney <= 0) {
        alert("Por favor, insira um valor total de dinheiro válido.");
        return;
    }

    const chartData = {
        labels: [...expenseNames, "Restante"],
        datasets: [{
            label: '',
            data: [...expenseValues, remainingMoney],
            backgroundColor: [...expenseNames.map(() => 'rgba(255, 100, 100, 0.9)'), 'rgba(100, 255, 126, 0.9)'],
            borderColor: [...expenseNames.map(() => 'rgba(255, 100, 100, 0.9)'), 'rgba(100, 255, 126, 0.9)'],
            borderWidth: 2
        }]
    };

    const config = {
        type: 'pie',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Distribuição dos Gastos no Mês'
                }
            }
        },
    };

    const chartContainer = document.getElementById('expense-chart').getContext('2d');
    if (window.expenseChart) {
        window.expenseChart.destroy();
    }
    window.expenseChart = new Chart(chartContainer, config);


}