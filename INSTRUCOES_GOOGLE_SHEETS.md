# 📋 Instruções para Publicar a Planilha Google Sheets

Para que o sistema possa ler automaticamente os dados da planilha, você precisa publicá-la na web.

## 🔧 Passo a Passo:

### 1️⃣ Abrir a Planilha
Acesse: https://docs.google.com/spreadsheets/d/1XKXwSTNKVRSKqAZrY67tBxpdN-yfVfUzx-lU0krT9r0/edit

### 2️⃣ Publicar na Web
1. Clique em **Arquivo** → **Compartilhar** → **Publicar na web**
2. Na janela que abrir:
   - Em "Link", selecione: **Planilha inteira**
   - Em "Formato", selecione: **Página da Web**
3. Clique em **Publicar**
4. Confirme clicando em **OK**

### 3️⃣ Configurar Permissões
1. Clique no botão **Compartilhar** (canto superior direito)
2. Em "Acesso geral", selecione: **Qualquer pessoa com o link**
3. Permissão: **Visualizador**
4. Clique em **Concluído**

## ✅ Verificar se Está Funcionando

Após publicar, teste acessando esta URL no navegador:
```
https://docs.google.com/spreadsheets/d/1XKXwSTNKVRSKqAZrY67tBxpdN-yfVfUzx-lU0krT9r0/export?format=csv&gid=0
```

Se aparecer os dados da planilha em formato CSV, está funcionando! ✨

## 🔄 Como o Sistema Funciona

### Carregamento Automático:
- Ao abrir a página, o sistema **busca automaticamente** os dados da planilha
- Todos os campos são atualizados: **códigos, descrições, quantidades e preços**

### Botão "Atualizar Dados":
- Clique para **recarregar os dados mais recentes** da planilha
- Útil quando você faz alterações na planilha e quer ver as mudanças

### Estrutura da Planilha:

A planilha deve seguir esta estrutura exata:

```
Linha 1:  TMP-1044-W – MÓDULO IOT TEEP WIFI COM 4 ENTRADAS DIGITAIS E 4 SAÍDAS DIGITAIS NA/NF
Linha 2:  Código | Descrição | Qtde. | Preço Unitário | Preço Total
Linha 3:  MP-1044-W | Placa Hoffer PLC... | 1 | R$ 260,00 | R$ 260,00
Linha 4:  TFM-1003 | Fonte 12V – 3A... | 1 | R$ 41,90 | R$ 41,90
Linha 5:  MP-GB-4-4 | Gabinete para módulo... | 1 | R$ 30,00 | R$ 30,00
Linha 6:  MP-AD-4-4 | Matéria-prima – adesivo... | 1 | R$ 3,50 | R$ 3,50
Linha 7:  TP-PH-3Mx8MM | Parafuso de fixação | 8 | R$ 0,10 | R$ 0,80
Linha 8:  (vazia)
Linha 9:  TMP-1044-E – MÓDULO IOT TEEP WIFI COM 4 ENTRADAS DIGITAIS E 4 SAÍDAS DIGITAIS NA/NF
Linha 10: Código | Descrição | Qtde. | Preço Unitário | Preço Total
Linha 11: MP-1044-E | Placa Hoffer PLC... | 1 | R$ 260,00 | R$ 260,00
Linha 12: TFM-1003 | Fonte 12V – 3A... | 1 | R$ 41,90 | R$ 41,90
Linha 13: MP-GB-4-4 | Gabinete para módulo... | 1 | R$ 30,00 | R$ 30,00
Linha 14: MP-AD-4-4 | Matéria-prima – adesivo... | 1 | R$ 3,50 | R$ 3,50
Linha 15: TP-PH-3Mx8MM | Parafuso de fixação | 8 | R$ 0,10 | R$ 0,80
```

**O sistema lê:**
- **TMP-1044-W**: Linhas 3-7 (dados dos componentes)
- **TMP-1044-E**: Linhas 11-15 (dados dos componentes)

### Formato Esperado das Colunas:
- **Coluna A**: Código (ex: MP-1044-W, TFM-1003)
- **Coluna B**: Descrição completa do item
- **Coluna C**: Quantidade (número inteiro: 1, 8, etc.)
- **Coluna D**: Preço Unitário (formato aceito: R$ 260,00 ou 260.00 ou 260,00)
- **Coluna E**: Preço Total (ignorado - calculado pelo sistema)

## 🚨 Importante

⚠️ **NÃO altere a estrutura das linhas** na planilha (posição das linhas 3-7 e 11-15)
⚠️ **Mantenha as colunas A-E** com os dados corretos
✅ Você **pode alterar** os valores (preços, quantidades, descrições)
✅ O sistema **atualiza automaticamente** quando você clica em "Atualizar Dados"

## 🔒 Segurança

- A planilha fica **somente leitura** (visualizador)
- Ninguém pode editar pela web
- Apenas você (dono) pode editar no Google Sheets
- O sistema apenas **lê** os dados, nunca escreve

## 💡 Dica

Se você fizer alterações na planilha:
1. Salve as alterações no Google Sheets
2. Aguarde alguns segundos (cache do Google)
3. Clique em **"Atualizar Dados"** no sistema
4. Os novos valores aparecerão automaticamente! 🎉

