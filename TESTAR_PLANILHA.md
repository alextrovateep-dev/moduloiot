# 🧪 Como Testar se Está Lendo da Planilha

## 📋 Passo a Passo para Verificar

### 1️⃣ Abra o Console do Navegador
1. Pressione `F12` no navegador
2. Vá na aba **Console**
3. Recarregue a página (`Ctrl+R` ou `F5`)

### 2️⃣ Verifique as Mensagens

**Se estiver lendo do Google Sheets, você verá:**
```
🚀 Iniciando sistema TEEP...
🔄 Tentando carregar do Google Sheets...
✅ Dados carregados do Google Sheets com sucesso!
📊 TMP-1144-W: 8 itens
📊 TMP-1144-E: 9 itens
📋 Dados recebidos: {TMP-1144-W: Array(8), TMP-1144-E: Array(9)}
🔄 Atualizando tabelas com dados carregados...
```

**Se estiver lendo do data.json, você verá:**
```
🚀 Iniciando sistema TEEP...
🔄 Tentando carregar do Google Sheets...
⚠️ Google Sheets não acessível, tentando arquivo local...
✅ Dados carregados do arquivo local data.json
```

**Se estiver usando dados embutidos, você verá:**
```
🚀 Iniciando sistema TEEP...
❌ Erro ao carregar dados: ...
🔄 Tentando usar dados embutidos no código...
```

---

## 🔍 Teste Prático

### Método 1: Mudar Valor na Planilha

1. **Abra a planilha Google Sheets**
2. **Mude um preço** (ex: MP-1144 de R$ 260,00 para R$ 999,00)
3. **Aguarde 30 segundos**
4. **No sistema, clique em "Atualizar Dados"**
5. **Verifique se o preço mudou para R$ 999,00**

✅ **Mudou?** Está lendo da planilha!
❌ **Não mudou?** Está usando dados locais

---

### Método 2: Verificar URL Atual

**Se você está abrindo assim:**
```
file:///C:/Users/trova/Documents/Precodemodulos/index.html
```
❌ **NÃO VAI FUNCIONAR** - CORS bloqueado

**Se você está abrindo assim:**
```
http://localhost:8000
```
✅ **DEVE FUNCIONAR** - Servidor local

**Se você está abrindo assim:**
```
https://seuusuario.github.io/teep-custos-modulos/
```
✅ **VAI FUNCIONAR** - GitHub Pages

---

## ⚙️ Configuração da Planilha

Para que o sistema consiga ler, a planilha DEVE estar:

### ✅ Checklist:

- [ ] **Publicada na Web**
  - Arquivo → Compartilhar → Publicar na web
  - Formato: "Página da Web"
  - Botão "Publicar" clicado

- [ ] **Permissões Corretas**
  - Compartilhar → Acesso geral
  - "Qualquer pessoa com o link"
  - Permissão: "Visualizador"

- [ ] **URL Correta no config.js**
  - Verificar se o ID está correto
  - Formato: `https://docs.google.com/spreadsheets/d/ID_DA_PLANILHA/export?format=csv&gid=0`

---

## 🛠️ Solução de Problemas

### ❌ Erro: "Failed to fetch"
**Causa:** Abrindo arquivo localmente (`file://`)
**Solução:** Use servidor local ou GitHub Pages

### ❌ Sempre carrega dados locais
**Causa:** Planilha não publicada ou sem permissão
**Solução:** Publique a planilha e configure permissões

### ❌ Dados antigos/não atualizam
**Causa:** Cache do Google
**Solução:** Aguarde 1-2 minutos após editar a planilha

### ❌ CORS error
**Causa:** Abrindo direto do arquivo
**Solução:** Use `server.bat` ou publique no GitHub

---

## 🧪 Teste Rápido

Execute no Console do navegador:

```javascript
// Verificar URL da planilha
console.log(SHEET_CONFIG.publicUrl);

// Testar buscar planilha manualmente
fetch(SHEET_CONFIG.publicUrl)
  .then(r => r.text())
  .then(t => console.log('✅ Planilha acessível:', t.substring(0, 200)))
  .catch(e => console.log('❌ Erro ao acessar planilha:', e));

// Verificar dados atuais
console.log('Dados carregados:', baseData);
```

**Se ver os dados CSV:** ✅ Planilha acessível
**Se der erro:** ❌ Problema de acesso

---

## 📊 Estrutura Esperada da Planilha

```
Linha 1:  TMP-1144-W – MÓDULO IOT...
Linha 2:  Código | Descrição | Qtde. | Preço Unitário | Preço Total
Linha 3:  MP-1144 | Placa... | 1 | R$ 260,00 | R$ 260,00
...
Linha 10: MÃO DE OBRA | ... | 1 | R$ 5,00 | R$ 5,00
Linha 11: (vazia)
Linha 12: TMP-1144-E – MÓDULO IOT...
Linha 13: Código | Descrição | Qtde. | Preço Unitário | Preço Total
Linha 14: MP-1144 | Placa... | 1 | R$ 260,00 | R$ 260,00
...
Linha 21: MÃO DE OBRA | ... | 1 | R$ 5,00 | R$ 5,00
```

---

## ✅ Confirmação Final

**O sistema está lendo da planilha se:**
1. Console mostra "✅ Dados carregados do Google Sheets"
2. Mudanças na planilha aparecem ao clicar "Atualizar Dados"
3. Console mostra quantidade correta de itens (8 e 9)

**Se não estiver funcionando:**
1. Use `server.bat` para testar localmente
2. Ou publique no GitHub Pages
3. Verifique se a planilha está publicada

---

**© 2025 TEEP - Tecnologia e Engenharia em Eletrônica de Potência**

