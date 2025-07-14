// Tema dinâmico baseado no horário
const hour = new Date().getHours();
if (hour >= 18 || hour < 6) document.body.classList.add('night-mode');
else document.body.classList.remove('night-mode');

document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('night-mode');
});

let stockData = [];
let chartInstance = null;

async function loadStock() {
  try {
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQSln3UzUEjwe1BPpvH5HouBNgegVL612Wo47dcPPRf6pdyd5l0olrh92oF0f10Aw/pub?output=csv');
    if (!response.ok) throw new Error('Falha ao carregar CSV');
    const data = await response.text();
    stockData = parseCSV(data);
    console.log('Dados carregados:', stockData); // Para depuração
    renderTable();
    renderChart();
  } catch (error) {
    console.error('Erro ao carregar dados:', error);
    alert('Erro ao carregar dados da planilha. Verifique o console.');
  }
}

function parseCSV(csv) {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',').map(header => header.trim());
  for (let i = 1; i < lines.length; i++) {
    if (lines[i]) {
      const obj = {};
      const currentLine = lines[i].split(',');
      headers.forEach((header, index) => {
        obj[header] = currentLine[index] ? currentLine[index].trim() : '';
      });
      result.push(obj);
    }
  }
  return result;
}

function renderTable() {
  const tbody = document.querySelector('#stockTable tbody');
  tbody.innerHTML = '';
  stockData.forEach((item, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.Item || 'Sem nome'}</td>
      <td>${item.Quantidade || 0}</td>
      <td>${item.Preço || 0.00}</td>
      <td><button onclick="editItem(${index})">Editar</button> <button onclick="deleteItem(${index})">Excluir</button></td>
    `;
    tbody.appendChild(row);
  });
}

function addItemForm() {
  const form = document.createElement('div');
  form.id = 'stockForm';
  form.innerHTML = `
    <input id="itemName" placeholder="Nome do Item">
    <input id="itemQty" type="number" placeholder="Quantidade">
    <input id="itemPrice" type="number" step="0.01" placeholder="Preço">
    <button onclick="saveItem()">Salvar</button>
    <button onclick="closeForm()">Cancelar</button>
  `;
  document.getElementById('stockContainer').appendChild(form);
}

function saveItem() {
  const item = {
    Item: document.getElementById('itemName').value,
    Quantidade: document.getElementById('itemQty').value,
    Preço: document.getElementById('itemPrice').value
  };
  stockData.push(item);
  renderTable();
  renderChart();
  closeForm();
}

function editItem(index) {
  const item = stockData[index];
  const form = document.createElement('div');
  form.id = 'stockForm';
  form.innerHTML = `
    <input id="itemName" value="${item.Item}">
    <input id="itemQty" type="number" value="${item.Quantidade}">
    <input id="itemPrice" type="number" step="0.01" value="${item.Preço}">
    <button onclick="updateItem(${index})">Atualizar</button>
    <button onclick="closeForm()">Cancelar</button>
  `;
  document.getElementById('stockContainer').appendChild(form);
}

function updateItem(index) {
  stockData[index] = {
    Item: document.getElementById('itemName').value,
    Quantidade: document.getElementById('itemQty').value,
    Preço: document.getElementById('itemPrice').value
  };
  renderTable();
  renderChart();
  closeForm();
}

function deleteItem(index) {
  stockData.splice(index, 1);
  renderTable();
  renderChart();
}

function closeForm() {
  const form = document.getElementById('stockForm');
  if (form) form.remove();
}

function renderChart() {
  const ctx = document.getElementById('stockChart').getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: stockData.map(item => item.Item || 'Sem nome'),
      datasets: [{
        label: 'Quantidade em Estoque',
        data: stockData.map(item => parseInt(item.Quantidade) || 0),
        backgroundColor: ['#4CAF50', '#FF9800', '#2196F3', '#9C27B0', '#F44336'],
        borderColor: ['#388E3C', '#F57C00', '#1976D2', '#7B1FA2', '#D32F2F'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      plugins: {
        legend: {
          labels: {
            color: document.body.classList.contains('night-mode') ? '#fff' : '#000'
          }
        }
      }
    }
  });
}

loadStock();