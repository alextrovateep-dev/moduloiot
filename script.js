// Dados base da planilha
const baseData = {
    'TMP-1044-W': [
        { code: 'MP-1044-W', desc: 'Placa Hoffer PLC com 4 entradas digitais e 4 saídas por relé NA/NF', qty: 1, price: 260.00 },
        { code: 'TFM-1003', desc: 'Fonte 12V – 3A tipo colmeia com aterramento', qty: 1, price: 41.90 },
        { code: 'MP-GB-4-4', desc: 'Gabinete para módulo com 4 entradas e 4 saídas', qty: 1, price: 30.00 },
        { code: 'MP-AD-4-4', desc: 'Matéria-prima – adesivo para módulo 4 entradas e 4 saídas', qty: 1, price: 3.50 },
        { code: 'TP-PH-3Mx8MM', desc: 'Parafuso de fixação', qty: 8, price: 0.10 }
    ],
    'TMP-1044-E': [
        { code: 'MP-1044-E', desc: 'Placa Hoffer PLC com 4 entradas digitais e 4 saídas por relé NA/NF', qty: 1, price: 260.00 },
        { code: 'TFM-1003', desc: 'Fonte 12V – 3A tipo colmeia com aterramento', qty: 1, price: 41.90 },
        { code: 'MP-GB-4-4', desc: 'Gabinete para módulo com 4 entradas e 4 saídas', qty: 1, price: 30.00 },
        { code: 'MP-AD-4-4', desc: 'Matéria-prima – adesivo para módulo 4 entradas e 4 saídas', qty: 1, price: 3.50 },
        { code: 'TP-PH-3Mx8MM', desc: 'Parafuso de fixação', qty: 8, price: 0.10 }
    ]
};

// Formatação de moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

// Formatar número
function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
}

// Calcular e atualizar quantidades baseado na produção
function updateProductionQuantities(tableId, productionQty) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const baseQty = parseInt(row.getAttribute('data-base-qty')) || 1;
        const totalQty = baseQty * productionQty;
        
        const qtyUnitCell = row.querySelector('.qty-unit');
        const qtyTotalCell = row.querySelector('.qty-total');
        
        qtyUnitCell.textContent = formatNumber(baseQty);
        qtyTotalCell.textContent = formatNumber(totalQty);
    });
}

// Calcular total de uma linha
function calculateRowTotal(row, productionQty = 1) {
    const baseQty = parseInt(row.getAttribute('data-base-qty')) || 1;
    const totalQty = baseQty * productionQty;
    const priceInput = row.querySelector('.input-price');
    const totalCell = row.querySelector('.total-cell');
    
    const price = parseFloat(priceInput.value) || 0;
    const total = totalQty * price;
    
    totalCell.textContent = formatCurrency(total);
    return total;
}

// Calcular total do módulo
function calculateModuleTotal(tableId, productionQty = 1) {
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tbody tr');
    let moduleTotal = 0;
    
    rows.forEach(row => {
        moduleTotal += calculateRowTotal(row, productionQty);
    });
    
    const totalElement = document.getElementById(`total-${tableId.split('-')[1]}`);
    totalElement.textContent = formatCurrency(moduleTotal);
    
    return moduleTotal;
}

// Atualizar módulo completo
function updateModule(moduleType) {
    const productionInput = document.getElementById(`production-${moduleType}`);
    const productionQty = parseInt(productionInput.value) || 1;
    
    updateProductionQuantities(`table-${moduleType}`, productionQty);
    calculateModuleTotal(`table-${moduleType}`, productionQty);
}

// Adicionar listeners aos inputs de preço
function attachPriceListeners() {
    const priceInputs = document.querySelectorAll('.input-price');
    
    priceInputs.forEach(input => {
        input.addEventListener('input', () => {
            const row = input.closest('tr');
            const table = input.closest('table');
            const tableId = table.id;
            const moduleType = tableId.split('-')[1];
            
            updateModule(moduleType);
        });
        
        input.addEventListener('change', () => {
            const row = input.closest('tr');
            const table = input.closest('table');
            const tableId = table.id;
            const moduleType = tableId.split('-')[1];
            
            updateModule(moduleType);
        });
    });
}

// Adicionar listeners aos inputs de produção
function attachProductionListeners() {
    const productionW = document.getElementById('production-w');
    const productionE = document.getElementById('production-e');
    
    productionW.addEventListener('input', () => {
        updateModule('w');
    });
    
    productionW.addEventListener('change', () => {
        updateModule('w');
    });
    
    productionE.addEventListener('input', () => {
        updateModule('e');
    });
    
    productionE.addEventListener('change', () => {
        updateModule('e');
    });
}

// Restaurar dados da planilha
function restoreBaseData() {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('loading');
    
    // Simula carregamento da planilha
    setTimeout(() => {
        // Resetar produção
        document.getElementById('production-w').value = 1;
        document.getElementById('production-e').value = 1;
        
        // Atualizar tabela W
        const tableW = document.getElementById('table-w');
        const rowsW = tableW.querySelectorAll('tbody tr');
        rowsW.forEach((row, index) => {
            const data = baseData['TMP-1044-W'][index];
            row.querySelector('.input-price').value = data.price.toFixed(2);
            row.setAttribute('data-base-qty', data.qty);
        });
        
        // Atualizar tabela E
        const tableE = document.getElementById('table-e');
        const rowsE = tableE.querySelectorAll('tbody tr');
        rowsE.forEach((row, index) => {
            const data = baseData['TMP-1044-E'][index];
            row.querySelector('.input-price').value = data.price.toFixed(2);
            row.setAttribute('data-base-qty', data.qty);
        });
        
        // Recalcular ambos os módulos
        updateModule('w');
        updateModule('e');
        
        // Mostrar notificação
        showNotification('Dados atualizados com sucesso!');
        
        btn.classList.remove('loading');
    }, 800);
}

// Mostrar notificação
function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Inicializar aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar ambos os módulos
    updateModule('w');
    updateModule('e');
    
    // Adicionar listeners
    attachPriceListeners();
    attachProductionListeners();
    
    // Adicionar listener ao botão de refresh
    document.getElementById('refreshBtn').addEventListener('click', restoreBaseData);
    
    // Mostrar notificação de boas-vindas
    setTimeout(() => {
        showNotification('Sistema carregado com dados da planilha!');
    }, 500);
});

// Prevenir valores negativos e caracteres inválidos
document.addEventListener('DOMContentLoaded', () => {
    const numInputs = document.querySelectorAll('input[type="number"]');
    numInputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === '-' || e.key === 'e' || e.key === 'E') {
                e.preventDefault();
            }
        });
        
        // Garantir valor mínimo
        input.addEventListener('blur', () => {
            const min = parseInt(input.getAttribute('min')) || 0;
            if (parseInt(input.value) < min) {
                input.value = min;
                // Trigger update se for input de produção
                if (input.classList.contains('production-input')) {
                    input.dispatchEvent(new Event('input'));
                }
            }
        });
    });
});
