// Configuração da API do Google Sheets
const SHEET_CONFIG = {
    // ID da planilha (extraído da URL)
    spreadsheetId: '1XKXwSTNKVRSKqAZrY67tBxpdN-yfVfUzx-lU0krT9r0',
    
    // Estrutura da planilha conforme dados fornecidos:
    // TMP-1044-W:
    //   Linha 1: Título "TMP-1044-W – MÓDULO IOT TEEP WIFI..."
    //   Linha 2: Cabeçalhos (Código, Descrição, Qtde., Preço Unitário, Preço Total)
    //   Linhas 3-7: Dados (MP-1044-W, TFM-1003, MP-GB-4-4, MP-AD-4-4, TP-PH-3Mx8MM)
    //
    // TMP-1044-E:
    //   Linha 9: Título "TMP-1044-E – MÓDULO IOT TEEP WIFI..."
    //   Linha 10: Cabeçalhos
    //   Linhas 11-15: Dados (MP-1044-E, TFM-1003, MP-GB-4-4, MP-AD-4-4, TP-PH-3Mx8MM)
    
    ranges: {
        'TMP-1044-W': 'Página1!A3:E7',  // Linhas 3-7 para TMP-1044-W
        'TMP-1044-E': 'Página1!A11:E15' // Linhas 11-15 para TMP-1044-E
    },
    
    // URL pública da planilha (publicada como CSV)
    // Formato: https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/export?format=csv&gid={SHEET_ID}
    publicUrl: 'https://docs.google.com/spreadsheets/d/1XKXwSTNKVRSKqAZrY67tBxpdN-yfVfUzx-lU0krT9r0/export?format=csv&gid=0'
};

