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

// Exportar para Excel
function exportToExcel() {
    const wb = XLSX.utils.book_new();
    
    // Obter dados dos módulos
    const productionW = parseInt(document.getElementById('production-w').value) || 1;
    const productionE = parseInt(document.getElementById('production-e').value) || 1;
    
    // Criar planilha para TMP-1044-W
    const dataW = [
        ['TMP-1044-W - Módulo IoT TEEP WiFi com 4 Entradas Digitais e 4 Saídas Digitais NA/NF'],
        [`Quantidade a Produzir: ${productionW} unidades`],
        [],
        ['Código', 'Descrição', 'Qtde. Unit.', 'Qtde. Total', 'Preço Unit. (R$)', 'Preço Total (R$)']
    ];
    
    const tableW = document.getElementById('table-w');
    const rowsW = tableW.querySelectorAll('tbody tr');
    let totalW = 0;
    
    rowsW.forEach(row => {
        const code = row.querySelector('td:nth-child(1)').textContent;
        const desc = row.querySelector('td:nth-child(2)').textContent;
        const qtyUnit = row.querySelector('.qty-unit').textContent;
        const qtyTotal = row.querySelector('.qty-total').textContent;
        const price = parseFloat(row.querySelector('.input-price').value);
        const baseQty = parseInt(row.getAttribute('data-base-qty'));
        const total = baseQty * productionW * price;
        totalW += total;
        
        dataW.push([code, desc, qtyUnit, qtyTotal, price, total]);
    });
    
    dataW.push([]);
    dataW.push(['', '', '', '', 'TOTAL:', totalW]);
    
    // Criar planilha para TMP-1044-E
    const dataE = [
        ['TMP-1044-E - Módulo IoT TEEP Ethernet com 4 Entradas Digitais e 4 Saídas Digitais NA/NF'],
        [`Quantidade a Produzir: ${productionE} unidades`],
        [],
        ['Código', 'Descrição', 'Qtde. Unit.', 'Qtde. Total', 'Preço Unit. (R$)', 'Preço Total (R$)']
    ];
    
    const tableE = document.getElementById('table-e');
    const rowsE = tableE.querySelectorAll('tbody tr');
    let totalE = 0;
    
    rowsE.forEach(row => {
        const code = row.querySelector('td:nth-child(1)').textContent;
        const desc = row.querySelector('td:nth-child(2)').textContent;
        const qtyUnit = row.querySelector('.qty-unit').textContent;
        const qtyTotal = row.querySelector('.qty-total').textContent;
        const price = parseFloat(row.querySelector('.input-price').value);
        const baseQty = parseInt(row.getAttribute('data-base-qty'));
        const total = baseQty * productionE * price;
        totalE += total;
        
        dataE.push([code, desc, qtyUnit, qtyTotal, price, total]);
    });
    
    dataE.push([]);
    dataE.push(['', '', '', '', 'TOTAL:', totalE]);
    
    // Adicionar planilhas ao workbook
    const wsW = XLSX.utils.aoa_to_sheet(dataW);
    const wsE = XLSX.utils.aoa_to_sheet(dataE);
    
    // Configurar largura das colunas
    wsW['!cols'] = [
        { wch: 15 },
        { wch: 60 },
        { wch: 12 },
        { wch: 12 },
        { wch: 18 },
        { wch: 18 }
    ];
    
    wsE['!cols'] = [
        { wch: 15 },
        { wch: 60 },
        { wch: 12 },
        { wch: 12 },
        { wch: 18 },
        { wch: 18 }
    ];
    
    XLSX.utils.book_append_sheet(wb, wsW, 'TMP-1044-W');
    XLSX.utils.book_append_sheet(wb, wsE, 'TMP-1044-E');
    
    // Gerar arquivo
    const today = new Date().toISOString().split('T')[0];
    XLSX.writeFile(wb, `TEEP_Analise_Custos_${today}.xlsx`);
    
    showNotification('Planilha Excel exportada com sucesso!');
}

// Exportar para PDF
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Obter dados dos módulos
    const productionW = parseInt(document.getElementById('production-w').value) || 1;
    const productionE = parseInt(document.getElementById('production-e').value) || 1;
    
    // Configurar fonte
    doc.setFont('helvetica');
    
    // Cabeçalho
    doc.setFontSize(16);
    doc.setTextColor(0, 166, 81);
    doc.text('TEEP - Análise de Custos de Módulos IoT', 105, 15, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    const today = new Date().toLocaleDateString('pt-BR');
    doc.text(`Data: ${today}`, 105, 22, { align: 'center' });
    
    let yPos = 35;
    
    // TMP-1044-W
    doc.setFontSize(12);
    doc.setTextColor(0, 166, 81);
    doc.text('TMP-1044-W', 14, yPos);
    
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text('Módulo IoT TEEP WiFi com 4 Entradas Digitais e 4 Saídas Digitais NA/NF', 14, yPos + 5);
    doc.text(`Quantidade a Produzir: ${productionW} unidades`, 14, yPos + 10);
    
    // Tabela W
    const tableW = document.getElementById('table-w');
    const rowsW = tableW.querySelectorAll('tbody tr');
    const bodyW = [];
    let totalW = 0;
    
    rowsW.forEach(row => {
        const code = row.querySelector('td:nth-child(1)').textContent;
        const desc = row.querySelector('td:nth-child(2)').textContent;
        const qtyUnit = row.querySelector('.qty-unit').textContent;
        const qtyTotal = row.querySelector('.qty-total').textContent;
        const price = parseFloat(row.querySelector('.input-price').value);
        const baseQty = parseInt(row.getAttribute('data-base-qty'));
        const total = baseQty * productionW * price;
        totalW += total;
        
        bodyW.push([
            code,
            desc,
            qtyUnit,
            qtyTotal,
            formatCurrency(price),
            formatCurrency(total)
        ]);
    });
    
    doc.autoTable({
        startY: yPos + 15,
        head: [['Código', 'Descrição', 'Qtde. Unit.', 'Qtde. Total', 'Preço Unit.', 'Preço Total']],
        body: bodyW,
        foot: [['', '', '', '', 'TOTAL:', formatCurrency(totalW)]],
        theme: 'striped',
        headStyles: { fillColor: [0, 166, 81], textColor: 255, fontSize: 8 },
        footStyles: { fillColor: [240, 249, 244], textColor: [0, 166, 81], fontStyle: 'bold', fontSize: 9 },
        styles: { fontSize: 7, cellPadding: 2 },
        columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 70 },
            2: { cellWidth: 18 },
            3: { cellWidth: 18 },
            4: { cellWidth: 25 },
            5: { cellWidth: 25 }
        }
    });
    
    yPos = doc.lastAutoTable.finalY + 15;
    
    // Verificar se precisa de nova página
    if (yPos > 200) {
        doc.addPage();
        yPos = 20;
    }
    
    // TMP-1044-E
    doc.setFontSize(12);
    doc.setTextColor(0, 166, 81);
    doc.text('TMP-1044-E', 14, yPos);
    
    doc.setFontSize(9);
    doc.setTextColor(80);
    doc.text('Módulo IoT TEEP Ethernet com 4 Entradas Digitais e 4 Saídas Digitais NA/NF', 14, yPos + 5);
    doc.text(`Quantidade a Produzir: ${productionE} unidades`, 14, yPos + 10);
    
    // Tabela E
    const tableE = document.getElementById('table-e');
    const rowsE = tableE.querySelectorAll('tbody tr');
    const bodyE = [];
    let totalE = 0;
    
    rowsE.forEach(row => {
        const code = row.querySelector('td:nth-child(1)').textContent;
        const desc = row.querySelector('td:nth-child(2)').textContent;
        const qtyUnit = row.querySelector('.qty-unit').textContent;
        const qtyTotal = row.querySelector('.qty-total').textContent;
        const price = parseFloat(row.querySelector('.input-price').value);
        const baseQty = parseInt(row.getAttribute('data-base-qty'));
        const total = baseQty * productionE * price;
        totalE += total;
        
        bodyE.push([
            code,
            desc,
            qtyUnit,
            qtyTotal,
            formatCurrency(price),
            formatCurrency(total)
        ]);
    });
    
    doc.autoTable({
        startY: yPos + 15,
        head: [['Código', 'Descrição', 'Qtde. Unit.', 'Qtde. Total', 'Preço Unit.', 'Preço Total']],
        body: bodyE,
        foot: [['', '', '', '', 'TOTAL:', formatCurrency(totalE)]],
        theme: 'striped',
        headStyles: { fillColor: [0, 166, 81], textColor: 255, fontSize: 8 },
        footStyles: { fillColor: [240, 249, 244], textColor: [0, 166, 81], fontStyle: 'bold', fontSize: 9 },
        styles: { fontSize: 7, cellPadding: 2 },
        columnStyles: {
            0: { cellWidth: 20 },
            1: { cellWidth: 70 },
            2: { cellWidth: 18 },
            3: { cellWidth: 18 },
            4: { cellWidth: 25 },
            5: { cellWidth: 25 }
        }
    });
    
    // Rodapé
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(
            `© 2025 TEEP - Tecnologia e Engenharia em Eletrônica de Potência - Página ${i} de ${pageCount}`,
            105,
            290,
            { align: 'center' }
        );
    }
    
    // Salvar PDF
    const todayStr = new Date().toISOString().split('T')[0];
    doc.save(`TEEP_Analise_Custos_${todayStr}.pdf`);
    
    showNotification('PDF exportado com sucesso!');
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
    
    // Adicionar listeners aos botões de exportação
    document.getElementById('exportExcelBtn').addEventListener('click', exportToExcel);
    document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);
    
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
