# 🚀 Como Usar o Sistema TEEP

## ⚡ Início Rápido

Você tem **3 opções** para usar o sistema:

---

## 📌 **OPÇÃO 1: Servidor Local Simples (RECOMENDADO)**

### Passo 1: Iniciar o Servidor
Dê um duplo clique no arquivo:
```
server.bat
```

### Passo 2: Abrir o Sistema
Uma janela de comando abrirá. Acesse no navegador:
```
http://localhost:8000
```

### ✅ Pronto! O sistema estará funcionando.

**Para parar o servidor:** Pressione `Ctrl+C` na janela de comando

---

## 📌 **OPÇÃO 2: Usar Arquivo Local (Sem Servidor)**

Se você não conseguir iniciar o servidor, o sistema funcionará com dados locais:

### 1. Abrir o Sistema
Dê duplo clique no arquivo:
```
index.html
```

### 2. Editar Dados Locais
Para atualizar os dados, edite o arquivo:
```
data.json
```

Altere os valores de `code`, `desc`, `qty` e `price` conforme necessário.

### 3. Atualizar no Sistema
Após salvar o `data.json`, clique no botão **"Atualizar Dados"** no sistema.

⚠️ **Nota:** Nesta opção, você verá a mensagem "Carregado com dados locais (offline)". Isso é normal!

---

## 📌 **OPÇÃO 3: Integração com Google Sheets (Avançado)**

Para conectar diretamente com o Google Sheets:

### Passo 1: Publicar a Planilha
1. Abra sua planilha no Google Sheets
2. Menu **Arquivo** → **Compartilhar** → **Publicar na web**
3. Selecione "Planilha inteira" e "Página da Web"
4. Clique em **Publicar**

### Passo 2: Configurar Permissões
1. Clique no botão **Compartilhar** (canto superior direito)
2. Em "Acesso geral", selecione: **Qualquer pessoa com o link**
3. Permissão: **Visualizador**
4. Clique em **Concluído**

### Passo 3: Usar com Servidor
⚠️ **IMPORTANTE:** Esta opção só funciona com servidor local (Opção 1)

Inicie o servidor com `server.bat` e acesse `http://localhost:8000`

---

## 🎯 Como Atualizar os Dados

### Se estiver usando **Arquivo Local (data.json)**:
1. Edite o arquivo `data.json` com seu editor favorito (Notepad, VSCode, etc.)
2. Salve as alterações
3. No sistema, clique em **"Atualizar Dados"**

### Se estiver usando **Google Sheets**:
1. Edite a planilha no Google Sheets
2. Aguarde alguns segundos (cache do Google)
3. No sistema, clique em **"Atualizar Dados"**

---

## 📊 Funcionalidades do Sistema

### 🔢 Simulador de Produção
- Digite a quantidade de unidades a produzir
- O sistema calcula automaticamente:
  - Quantidade total de cada componente
  - Valor total de cada item
  - Valor total do módulo

### 📥 Exportar Excel
- Clique em **"Exportar Excel"**
- Gera arquivo `.xlsx` com duas abas (TMP-1044-W e TMP-1044-E)
- Nome do arquivo: `TEEP_Analise_Custos_2025-XX-XX.xlsx`

### 📄 Exportar PDF
- Clique em **"Exportar PDF"**
- Gera relatório PDF profissional formatado
- Nome do arquivo: `TEEP_Analise_Custos_2025-XX-XX.pdf`

### 💰 Editar Preços
- Clique nos campos de "Preço Unitário" para editar
- Os totais são recalculados automaticamente

---

## 🔧 Requisitos

### Para usar com Servidor (Opção 1):
- **Python** instalado no computador
  - Python já vem instalado no Windows 10/11
  - Para verificar, abra o CMD e digite: `python --version`

### Para usar Offline (Opção 2):
- Nenhum requisito! Apenas o navegador web

### Para Google Sheets (Opção 3):
- Conexão com internet
- Planilha publicada na web
- Servidor local rodando

---

## ❓ Problemas Comuns

### ❌ "Erro ao carregar planilha"
**Solução:** Use a Opção 2 (arquivo local) ou inicie o servidor (Opção 1)

### ❌ "Python não encontrado"
**Solução:** 
1. Instale o Python de https://www.python.org/downloads/
2. Ou use a Opção 2 (sem servidor)

### ❌ "Dados não atualizam"
**Solução:**
1. Se usando `data.json`: Verifique se salvou o arquivo
2. Se usando Google Sheets: Aguarde 30 segundos após editar
3. Clique em **"Atualizar Dados"** novamente

### ❌ "Porta 8000 já está em uso"
**Solução:**
Edite o arquivo `server.bat` e mude `8000` para outra porta (ex: `8080`)

---

## 💡 Dicas

✅ **Use a Opção 1** (servidor local) para melhor experiência
✅ **Edite data.json** para atualizar rapidamente os dados
✅ **Exporte para Excel/PDF** antes de fazer grandes mudanças
✅ **Mantenha backup** do arquivo `data.json`

---

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- `README.md` - Documentação completa
- `INSTRUCOES_GOOGLE_SHEETS.md` - Detalhes da integração
- `data.json` - Estrutura dos dados

---

**© 2025 TEEP - Tecnologia e Engenharia em Eletrônica de Potência**

