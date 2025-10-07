# 🔧 Soluções para Atualizar com a Planilha

## ⚠️ Problema Atual

Quando você abre o `index.html` diretamente (duplo clique), o navegador bloqueia o carregamento da planilha Google Sheets por segurança (CORS - Cross-Origin Resource Sharing).

## ✅ Soluções (em ordem de recomendação)

---

## 🌐 **SOLUÇÃO 1: Publicar no GitHub Pages (RECOMENDADO)**

### Por que funciona:
- GitHub Pages serve os arquivos via HTTPS
- Não tem restrições de CORS
- Google Sheets aceita requisições de sites hospedados

### Como fazer:
1. Siga o guia em `PUBLICAR_GITHUB.md`
2. Publique a planilha (Arquivo → Publicar na web)
3. Configure permissões (Qualquer pessoa com o link)
4. Acesse: `https://SEU-USUARIO.github.io/teep-custos-modulos/`

### ✅ Funcionará 100% online!

---

## 💻 **SOLUÇÃO 2: Usar Servidor Local (Para Desenvolvimento)**

### Método A: Python (Recomendado)

Abra o terminal na pasta do projeto e execute:

```bash
# Windows
server.bat

# Ou manualmente:
python -m http.server 8000
```

Acesse: `http://localhost:8000`

### Método B: Node.js

```bash
npx http-server -p 8000
```

### Método C: VS Code Live Server

1. Instale a extensão "Live Server"
2. Clique com botão direito no `index.html`
3. Selecione "Open with Live Server"

### ✅ Funcionará localmente com a planilha!

---

## 📁 **SOLUÇÃO 3: Usar `data.json` (Offline)**

### Quando usar:
- Sem conexão internet
- Não quer publicar no GitHub
- Não quer usar servidor local

### Como funciona:
1. Edite o arquivo `data.json` com os valores da planilha
2. Inicie um servidor local (Solução 2)
3. O sistema carregará automaticamente de `data.json`

### Como atualizar:

**Copiar dados da planilha para `data.json`:**

1. Abra a planilha Google Sheets
2. Copie os dados
3. Edite `data.json` seguindo a estrutura:

```json
{
  "TMP-1144-W": [
    {
      "code": "MP-1144",
      "desc": "Descrição...",
      "qty": 1,
      "price": 260.00
    }
  ]
}
```

### ✅ Funciona offline, mas precisa atualizar manualmente!

---

## 🔄 **SOLUÇÃO 4: Script para Atualizar `data.json` Automaticamente**

Crie um arquivo `atualizar_dados.py`:

```python
import requests
import json

# ID da planilha
SHEET_ID = '1XKXwSTNKVRSKqAZrY67tBxpdN-yfVfUzx-lU0krT9r0'
URL = f'https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv'

# Baixar CSV
response = requests.get(URL)
lines = response.text.split('\n')

# Processar dados (adapte conforme necessário)
data = {
    "TMP-1144-W": [],
    "TMP-1144-E": []
}

# Processar TMP-1144-W (linhas 3-10)
for i in range(2, 10):
    if i < len(lines):
        cols = lines[i].split(',')
        if len(cols) >= 4:
            data["TMP-1144-W"].append({
                "code": cols[0],
                "desc": cols[1],
                "qty": int(cols[2]) if cols[2] else 1,
                "price": float(cols[3].replace('R$', '').replace('.', '').replace(',', '.').strip())
            })

# Processar TMP-1144-E (linhas 13-21)
for i in range(12, 21):
    if i < len(lines):
        cols = lines[i].split(',')
        if len(cols) >= 4:
            data["TMP-1144-E"].append({
                "code": cols[0],
                "desc": cols[1],
                "qty": int(cols[2]) if cols[2] else 1,
                "price": float(cols[3].replace('R$', '').replace('.', '').replace(',', '.').strip())
            })

# Salvar JSON
with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✅ data.json atualizado com sucesso!")
```

Execute:
```bash
python atualizar_dados.py
```

### ✅ Atualiza `data.json` automaticamente da planilha!

---

## 📋 **Comparação das Soluções**

| Solução | Funciona Offline | Atualização Automática | Dificuldade |
|---------|------------------|------------------------|-------------|
| GitHub Pages | ❌ Precisa internet | ✅ Sim (da planilha) | ⭐⭐ Fácil |
| Servidor Local | ❌ Precisa internet | ✅ Sim (da planilha) | ⭐ Muito Fácil |
| data.json | ✅ Sim | ❌ Manual | ⭐⭐⭐ Médio |
| Script Python | ❌ Precisa internet | ✅ Semi-automático | ⭐⭐⭐⭐ Difícil |

---

## 🎯 **Recomendação Final**

### Para uso em produção (equipe):
→ **Use GitHub Pages** (Solução 1)

### Para desenvolvimento local:
→ **Use servidor local** com `server.bat` (Solução 2)

### Para trabalhar offline:
→ **Edite `data.json`** (Solução 3)

---

## 🔍 **Como Verificar se Está Funcionando**

### Teste 1: Abra o Console do Navegador
1. Pressione `F12`
2. Vá na aba "Console"
3. Procure por mensagens de erro
4. Deve aparecer: "Dados carregados do arquivo local data.json" ou "Dados carregados do Google Sheets"

### Teste 2: Clique em "Atualizar Dados"
- Se funcionar: ✅ "Dados atualizados do banco de dados com sucesso!"
- Se falhar: ⚠️ "Erro ao conectar com o banco de dados. Usando dados locais."

### Teste 3: Mude um valor na planilha
1. Edite um preço na planilha
2. Aguarde 30 segundos
3. Clique em "Atualizar Dados"
4. Verifique se o valor mudou

---

## 💡 **Dica Extra: Publicar Planilha Google Sheets**

Para funcionar com o sistema online:

1. **Abra a planilha**
2. **Arquivo** → **Compartilhar** → **Publicar na web**
3. Selecione:
   - Link: Planilha inteira
   - Formato: Página da Web
4. Clique em **Publicar**
5. **Compartilhar** → **Acesso geral** → **Qualquer pessoa com o link** (Visualizador)

---

**© 2025 TEEP - Tecnologia e Engenharia em Eletrônica de Potência**

