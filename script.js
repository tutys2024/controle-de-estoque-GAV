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
    const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQSln3UzUEjwe1BPpvH5HouBNgegVL612Wo47dcPPRf6pdyd5l0olrh92oF0f10Aw/pub?output=csv', {
      mode: 'cors' // Tentativa de forçar CORS
    });
    if (!response.ok) throw new Error(`Falha ao carregar CSV. Status: ${response.status}`);
    const data = await response.text();
    stockData = parseCSV(data);
    if (stockData.length === 0) throw new Error('Nenhum dado válido encontrado no CSV.');
    console.log('Dados carregados da planilha:', stockData);
  } catch (error) {
    console.error('Erro ao carregar dados da planilha:', error);
    alert('Não foi possível carregar os dados da planilha. Usando dados de exemplo. Verifique o console para detalhes.');
    stockData = [
      { Item: 'Produto A', Quantidade: 10, Preço: 5.00 },
      { Item: 'Produto B', Quantidade: 15, Preço: 7.50 }
    ]; // Fallback com dados de exemplo
  }
  renderTable();
  renderChart();
}

function parseCSV(csv) {
  const lines = csv.split('\n');
  if (lines.length < 2) return [];
  const result = [];
  const headers = lines[0].split(',').map(header => header.trim().toLowerCase());
  const expectedHeaders = ['item', 'quantidade', 'preço']; // Case insensitive
  if (!headers.every(h => expectedHeaders.includes(h))) {
    console.warn('Cabeçalhos inesperados:', headers);
    return [];
  }
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim()) {
      const obj = {};
      const currentLine = lines[i].split(',');
      headers.forEach((header, index) => {
        obj[header] = currentLine[index] ? currentLine[index].trim() : '';
        if (header === 'quantidade' || header === 'preço') {
          obj[header] = isNaN(parseFloat(obj[header])) ? 0 : parseFloat(obj[header]);
        }
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
      <td>${item.item || 'Sem nome'}</td>
      <td>${item.quantidade || 0}</td>
      <td>R$ ${parseFloat(item.preço || 0).toFixed(2)}</td>
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
    item: document.getElementById('itemName').value,
    quantidade: document.getElementById('itemQty').value,
    preço: document.getElementById('itemPrice').value
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
    <input id="itemName" value="${item.item}">
    <input id="itemQty" type="number" value="${item.quantidade}">
    <input id="itemPrice" type="number" step="0.01" value="${item.preço}">
    <button onclick="updateItem(${index})">Atualizar</button>
    <button onclick="closeForm()">Cancelar</button>
  `;
  document.getElementById('stockContainer').appendChild(form);
}

function updateItem(index) {
  stockData[index] = {
    item: document.getElementById('itemName').value,
    quantidade: document.getElementById('itemQty').value,
    preço: document.getElementById('itemPrice').value
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
      labels: stockData.map(item => item.item || 'Sem nome'),
      datasets: [{
        label: 'Quantidade em Estoque',
        data: stockData.map(item => parseInt(item.quantidade) || 0),
        backgroundColor: ['#4A90E2', '#50E3C2', '#F5A623', '#FF2E63', '#9013FE'],
        borderColor: ['#357ABD', '#3DBD92', '#D68A1E', '#D92057', '#720ECE'],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: { color: document.body.classList.contains('night-mode') ? '#e0e0e0' : '#333' }
        },
        x: { ticks: { color: document.body.classList.contains('night-mode') ? '#e0e0e0' : '#333' } }
      },
      plugins: {
        legend: {
          labels: {
            color: document.body.classList.contains('night-mode') ? '#e0e0e0' : '#333'
          }
        }
      }
    }
  });
}

loadStock();
