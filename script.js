// Dados base da planilha (fallback se a conexão falhar)
let baseData = {
    'TMP-1144-W': [
        { code: 'MP-1144', desc: 'Placa Hoffer PLC com 4 entradas digitais e 4 saídas por relé NA/NF', qty: 1, price: 260.00 },
        { code: 'TFM-1003', desc: 'Fonte 12V – 3A tipo colmeia com aterramento', qty: 1, price: 41.90 },
        { code: 'MP-GB-4-4', desc: 'Gabinete para módulo com 4 entradas e 4 saídas', qty: 1, price: 30.00 },
        { code: 'MP-AD-4-4', desc: 'Adesivo para módulo 4 entradas e 4 saídas', qty: 1, price: 3.50 },
        { code: 'TP-PH-3Mx8MM', desc: 'Parafuso de fixação', qty: 8, price: 0.10 },
        { code: 'MP-CX-24X20X15', desc: 'Caixa de papelão para embalagem dos módulos Teep IoT', qty: 1, price: 4.50 },
        { code: 'FRETE', desc: 'Frete baseado na quantidade de 50 unidades', qty: 1, price: 2.00 },
        { code: 'MÃO DE OBRA', desc: 'Baseado no valor hora pessoa e o tempo em produzir uma peça', qty: 1, price: 5.00 }
    ],
    'TMP-1144-E': [
        { code: 'MP-1144', desc: 'Placa Hoffer PLC com 4 entradas digitais e 4 saídas por relé NA/NF', qty: 1, price: 260.00 },
        { code: 'TFM-1003', desc: 'Fonte 12V – 3A tipo colmeia com aterramento', qty: 1, price: 41.90 },
        { code: 'MP-GB-4-4', desc: 'Gabinete para módulo com 4 entradas e 4 saídas', qty: 1, price: 30.00 },
        { code: 'MP-AD-4-4', desc: 'Adesivo para módulo 4 entradas e 4 saídas', qty: 1, price: 3.50 },
        { code: 'TP-PH-3Mx8MM', desc: 'Parafuso de fixação', qty: 8, price: 0.10 },
        { code: 'MP-REDE-ESP32', desc: 'Módulo de rede para Esp32 no módulo MP-1144', qty: 1, price: 60.00 },
        { code: 'MP-CX-24X20X15', desc: 'Caixa de papelão para embalagem dos módulos Teep IoT', qty: 1, price: 4.50 },
        { code: 'FRETE', desc: 'Frete baseado na quantidade de 50 unidades', qty: 1, price: 2.00 },
        { code: 'MÃO DE OBRA', desc: 'Baseado no valor hora pessoa e o tempo em produzir uma peça', qty: 1, price: 5.00 }
    ]
};

// Carregar dados do arquivo JSON local ou da planilha Google Sheets
async function loadDataFromGoogleSheets() {
    try {
        // Tentar carregar do arquivo JSON local primeiro
        try {
            const response = await fetch('./data.json');
            if (response.ok) {
                const jsonData = await response.json();
                baseData = jsonData;
                console.log('Dados carregados do arquivo local data.json');
                return baseData;
            }
        } catch (localError) {
            console.log('Arquivo local não encontrado, tentando Google Sheets...');
        }
        
        // Se falhar, tentar carregar do Google Sheets
        const response = await fetch(SHEET_CONFIG.publicUrl);
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                complete: (results) => {
                    try {
                        const data = results.data;
                        
                        // Processar TMP-1144-W (linhas 3-10 da planilha = índices 2-9 do CSV)
                        const dataW = [];
                        for (let i = 2; i <= 9; i++) {
                            if (data[i] && data[i].length >= 4) {
                                const row = data[i];
                                // Limpar e converter valores
                                const priceStr = (row[3] || '').toString().replace(/R\$/g, '').replace(/\./g, '').replace(',', '.').trim();
                                const price = parseFloat(priceStr) || 0;
                                const qty = parseInt(row[2]) || 1;
                                
                                dataW.push({
                                    code: (row[0] || '').trim(),
                                    desc: (row[1] || '').trim(),
                                    qty: qty,
                                    price: price
                                });
                            }
                        }
                        
                        // Processar TMP-1144-E (linhas 13-21 da planilha = índices 12-20 do CSV)
                        const dataE = [];
                        for (let i = 12; i <= 20; i++) {
                            if (data[i] && data[i].length >= 4) {
                                const row = data[i];
                                // Limpar e converter valores
                                const priceStr = (row[3] || '').toString().replace(/R\$/g, '').replace(/\./g, '').replace(',', '.').trim();
                                const price = parseFloat(priceStr) || 0;
                                const qty = parseInt(row[2]) || 1;
                                
                                dataE.push({
                                    code: (row[0] || '').trim(),
                                    desc: (row[1] || '').trim(),
                                    qty: qty,
                                    price: price
                                });
                            }
                        }
                        
                        baseData = {
                            'TMP-1144-W': dataW,
                            'TMP-1144-E': dataE
                        };
                        
                        console.log('Dados carregados do Google Sheets');
                        resolve(baseData);
                    } catch (error) {
                        console.error('Erro ao processar dados da planilha:', error);
                        reject(error);
                    }
                },
                error: (error) => {
                    console.error('Erro ao fazer parse do CSV:', error);
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Erro ao carregar planilha:', error);
        throw error;
    }
}

// Atualizar tabela com dados da planilha
function updateTableFromData(moduleType, data) {
    const tableId = `table-${moduleType}`;
    const table = document.getElementById(tableId);
    const rows = table.querySelectorAll('tbody tr');
    
    data.forEach((item, index) => {
        if (rows[index]) {
            const row = rows[index];
            
            // Atualizar código
            row.querySelector('td:nth-child(1)').textContent = item.code;
            row.setAttribute('data-code', item.code);
            
            // Atualizar descrição
            row.querySelector('td:nth-child(2)').textContent = item.desc;
            
            // Atualizar quantidade unitária
            row.setAttribute('data-base-qty', item.qty);
            row.querySelector('.qty-unit').textContent = formatNumber(item.qty);
            
            // Atualizar preço
            row.querySelector('.input-price').value = item.price.toFixed(2);
        }
    });
}

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
async function restoreBaseData() {
    const btn = document.getElementById('refreshBtn');
    btn.classList.add('loading');
    
    try {
        // Carregar dados da planilha do Google Sheets
        await loadDataFromGoogleSheets();
        
        // Resetar produção
        document.getElementById('production-w').value = 1;
        document.getElementById('production-e').value = 1;
        
        // Atualizar tabelas com dados
        if (baseData['TMP-1144-W'] && baseData['TMP-1144-E']) {
            updateTableFromData('w', baseData['TMP-1144-W']);
            updateTableFromData('e', baseData['TMP-1144-E']);
        }
        
        // Recalcular ambos os módulos
        updateModule('w');
        updateModule('e');
        
        // Mostrar notificação
        showNotification('Dados atualizados do banco de dados com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar dados:', error);
        showNotification('Erro ao conectar com o banco de dados. Usando dados locais.');
        
        // Usar dados locais em caso de erro
        if (baseData['TMP-1144-W'] && baseData['TMP-1144-E']) {
            updateTableFromData('w', baseData['TMP-1144-W']);
            updateTableFromData('e', baseData['TMP-1144-E']);
        }
        updateModule('w');
        updateModule('e');
    } finally {
        btn.classList.remove('loading');
    }
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
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Carregar dados do banco de dados ao iniciar
        showNotification('Carregando dados do banco de dados...');
        await loadDataFromGoogleSheets();
        
        // Atualizar tabelas com dados
        if (baseData['TMP-1144-W'] && baseData['TMP-1144-E']) {
            updateTableFromData('w', baseData['TMP-1144-W']);
            updateTableFromData('e', baseData['TMP-1144-E']);
        }
        
        // Inicializar ambos os módulos
        updateModule('w');
        updateModule('e');
        
        showNotification('Dados carregados com sucesso!');
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        
        // Usar dados locais em caso de erro
        if (baseData['TMP-1144-W'] && baseData['TMP-1144-E']) {
            updateTableFromData('w', baseData['TMP-1144-W']);
            updateTableFromData('e', baseData['TMP-1144-E']);
        }
        updateModule('w');
        updateModule('e');
        
        showNotification('Sistema carregado com dados locais');
    }
    
    // Adicionar listeners
    attachPriceListeners();
    attachProductionListeners();
    
    // Adicionar listener ao botão de refresh
    document.getElementById('refreshBtn').addEventListener('click', restoreBaseData);
    
    // Adicionar listeners aos botões de exportação
    document.getElementById('exportExcelBtn').addEventListener('click', exportToExcel);
    document.getElementById('exportPdfBtn').addEventListener('click', exportToPDF);
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
