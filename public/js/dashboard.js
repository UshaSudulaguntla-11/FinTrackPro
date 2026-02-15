let expenses = [];
let income = [];
let transactionsTable;

document.addEventListener('DOMContentLoaded', async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.getElementById('user-display-name').innerText = user.displayName || user.email;
    }

    await fetchData();
    checkMockMode();
    initTable();
    initCharts();
    setupTheme();
    setupModals();
    setupNavigation();
});

let currentView = 'all'; // 'all', 'expense', 'income'

function setupNavigation() {
    document.getElementById('nav-dashboard').addEventListener('click', (e) => {
        e.preventDefault();
        setView('all', 'Dashboard');
    });
    document.getElementById('nav-expenses').addEventListener('click', (e) => {
        e.preventDefault();
        setView('expense', 'Expenses');
    });
    document.getElementById('nav-income').addEventListener('click', (e) => {
        e.preventDefault();
        setView('income', 'Income');
    });

    // Mark dashboard as active initially
    document.getElementById('nav-dashboard').classList.add('active');
}

function setView(view, title) {
    currentView = view;
    document.getElementById('page-title').innerText = title;

    // Update Sidebar Active state
    document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
    const activeBtn = document.getElementById(`nav-${view === 'all' ? 'dashboard' : view === 'expense' ? 'expenses' : 'income'}`);
    if (activeBtn) activeBtn.classList.add('active');

    // Toggle Visibility with smooth fade
    const summaryGrid = document.querySelector('.summary-grid');
    const chartsSection = document.querySelector('.charts-grid');

    if (view === 'all') {
        summaryGrid.style.display = 'grid';
        chartsSection.style.display = 'grid';
        setTimeout(() => {
            summaryGrid.style.opacity = '1';
            chartsSection.style.opacity = '1';
        }, 50);
    } else {
        summaryGrid.style.opacity = '0';
        chartsSection.style.opacity = '0';
        setTimeout(() => {
            summaryGrid.style.display = 'none';
            chartsSection.style.display = 'none';
        }, 300);
    }

    refreshTable();
}

function refreshTable() {
    if (transactionsTable) {
        transactionsTable.clear().rows.add(getCombinedData()).draw();
    }
}

let editMode = false;
let currentEditId = null;
let currentEditType = null;

function setupModals() {
    document.getElementById('add-expense-btn').addEventListener('click', () => {
        editMode = false;
        document.getElementById('expense-modal').querySelector('h2').innerText = 'Add Expense';
        document.getElementById('expense-modal').style.display = 'flex';
    });
    document.getElementById('add-income-btn').addEventListener('click', () => {
        editMode = false;
        document.getElementById('income-modal').querySelector('h2').innerText = 'Add Income';
        document.getElementById('income-modal').style.display = 'flex';
    });

    document.getElementById('expense-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            amount: document.getElementById('exp-amount').value,
            category: document.getElementById('exp-category').value,
            description: document.getElementById('exp-description').value,
            date: document.getElementById('exp-date').value
        };
        try {
            if (editMode) {
                await utils.request(`/expenses/${currentEditId}`, 'PUT', data);
            } else {
                await utils.request('/expenses', 'POST', data);
            }
            closeModal('expense-modal');
            refreshData();
        } catch (error) { alert(error.message); }
    });

    document.getElementById('income-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            amount: document.getElementById('inc-amount').value,
            source: document.getElementById('inc-source').value,
            date: document.getElementById('inc-date').value
        };
        try {
            if (editMode) {
                await utils.request(`/income/${currentEditId}`, 'PUT', data);
            } else {
                await utils.request('/income', 'POST', data);
            }
            closeModal('income-modal');
            refreshData();
        } catch (error) { alert(error.message); }
    });
}

function editItem(id, type) {
    editMode = true;
    currentEditId = id;
    currentEditType = type;
    const item = type === 'Expense' ? expenses.find(e => e.id === id) : income.find(i => i.id === id);

    if (type === 'Expense') {
        document.getElementById('exp-amount').value = item.amount;
        document.getElementById('exp-category').value = item.category;
        document.getElementById('exp-description').value = item.description;
        document.getElementById('exp-date').value = item.date;
        document.getElementById('expense-modal').querySelector('h2').innerText = 'Edit Expense';
        document.getElementById('expense-modal').style.display = 'flex';
    } else {
        document.getElementById('inc-amount').value = item.amount;
        document.getElementById('inc-source').value = item.source;
        document.getElementById('inc-date').value = item.date;
        document.getElementById('income-modal').querySelector('h2').innerText = 'Edit Income';
        document.getElementById('income-modal').style.display = 'flex';
    }
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById(id).querySelector('form').reset();
    editMode = false;
}

async function refreshData() {
    await fetchData();
    refreshTable();
    initCharts(); // Re-render charts
}

async function fetchData() {
    try {
        expenses = await utils.request('/expenses');
        income = await utils.request('/income');
        updateSummary();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function checkMockMode() {
    try {
        const { mockMode } = await utils.request('/status');
        if (mockMode) {
            document.getElementById('mock-banner').style.display = 'block';
        }
    } catch (error) {
        console.error('Error checking mock mode:', error);
    }
}

function updateSummary() {
    const totalExp = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const totalInc = income.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const balance = totalInc - totalExp;
    const savings = totalInc > 0 ? ((totalInc - totalExp) / totalInc * 100).toFixed(1) : 0;

    document.getElementById('total-expenses').innerText = utils.formatCurrency(totalExp);
    document.getElementById('total-income').innerText = utils.formatCurrency(totalInc);
    document.getElementById('total-balance').innerText = utils.formatCurrency(balance);
    document.getElementById('savings-percent').innerText = `${savings}%`;
}

function initTable() {
    const combinedData = getCombinedData();

    transactionsTable = $('#transactionsTable').DataTable({
        data: combinedData,
        columns: [
            { data: 'date' },
            { data: 'description' },
            { data: 'category' },
            {
                data: 'amount',
                render: (data, type, row) => `<span style="color: ${row.type === 'Expense' ? '#ef4444' : '#10b981'}">${row.type === 'Expense' ? '-' : '+'}${utils.formatCurrency(data)}</span>`
            },
            { data: 'type' },
            {
                data: null,
                render: (data, type, row) => `
                    <button class="btn btn-secondary btn-sm" onclick="editItem('${row.id}', '${row.type}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteItem('${row.id}', '${row.type}')">Delete</button>
                `
            }
        ],
        dom: 'Bfrtip',
        buttons: ['csv', 'excel', 'pdf']
    });
}

async function deleteItem(id, type) {
    if (!confirm(`Are you sure you want to delete this ${type.toLowerCase()}?`)) return;
    try {
        const endpoint = type === 'Expense' ? `/expenses/${id}` : `/income/${id}`;
        await utils.request(endpoint, 'DELETE');
        await refreshData();
    } catch (error) {
        alert(error.message);
    }
}

function getCombinedData() {
    let data = [
        ...expenses.map(e => ({ ...e, type: 'Expense' })),
        ...income.map(i => ({ ...i, type: 'Income', category: 'Source: ' + i.source, description: 'Income' }))
    ];

    if (currentView === 'expense') {
        data = data.filter(d => d.type === 'Expense');
    } else if (currentView === 'income') {
        data = data.filter(d => d.type === 'Income');
    }

    return data.sort((a, b) => new Date(b.date) - new Date(a.date));
}

let catChart, trendChart;

function initCharts() {
    if (catChart) catChart.destroy();
    if (trendChart) trendChart.destroy();

    // Register the data labels plugin
    Chart.register(ChartDataLabels);

    // 1. Expense Category Breakdown (Pie Chart)
    const categories = {};
    expenses.forEach(e => {
        categories[e.category] = (categories[e.category] || 0) + parseFloat(e.amount);
    });

    catChart = new Chart(document.getElementById('expenseCategoryChart'), {
        type: 'pie',
        data: {
            labels: Object.keys(categories),
            datasets: [{
                data: Object.values(categories),
                backgroundColor: ['#6366f1', '#a855f7', '#ec4899', '#10b981', '#f59e0b', '#ef4444']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Expense Categories' },
                datalabels: {
                    color: '#fff',
                    font: { weight: 'bold' },
                    formatter: (value, ctx) => {
                        let sum = 0;
                        let dataArr = ctx.chart.data.datasets[0].data;
                        dataArr.map(data => { sum += data; });
                        let percentage = (value * 100 / sum).toFixed(1) + "%";
                        return percentage;
                    }
                }
            }
        }
    });

    // 2. Monthly Expense Trend (Line Graph)
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyTotals = new Array(12).fill(0);
    expenses.forEach(e => {
        const monthIndex = new Date(e.date).getMonth();
        monthlyTotals[monthIndex] += parseFloat(e.amount);
    });

    trendChart = new Chart(document.getElementById('monthlyTrendChart'), {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Monthly Spending',
                data: monthlyTotals,
                borderColor: '#6366f1',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(99, 102, 241, 0.1)'
            }]
        },
        options: { responsive: true, plugins: { title: { display: true, text: 'Monthly Expense Trend' } } }
    });
}

function setupTheme() {
    const toggle = document.getElementById('dark-mode-toggle');
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) {
        document.body.classList.add('dark-mode');
        toggle.innerText = '☀️ Light Mode';
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const darkNow = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', darkNow);
        toggle.innerText = darkNow ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
}

document.getElementById('logout-btn').addEventListener('click', () => utils.logout());
