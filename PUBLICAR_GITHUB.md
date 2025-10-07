# 🚀 Como Publicar no GitHub Pages

## 📋 Passo a Passo Completo

### 1️⃣ Criar Repositório no GitHub

1. Acesse https://github.com e faça login
2. Clique no botão **"New"** (ou ícone **+** → **New repository**)
3. Preencha:
   - **Repository name**: `teep-custos-modulos` (ou nome de sua preferência)
   - **Description**: `Sistema de Análise de Custos - Módulos IoT TEEP`
   - Marque **Public** (para usar GitHub Pages grátis)
   - ✅ Marque **"Add a README file"** (opcional)
   - Clique em **"Create repository"**

### 2️⃣ Preparar os Arquivos Localmente

Abra o terminal/CMD na pasta do projeto:
```bash
cd C:\Users\trova\Documents\Precodemodulos
```

### 3️⃣ Inicializar Git no Projeto

```bash
git init
git add .
git commit -m "Initial commit - Sistema TEEP de Análise de Custos"
```

### 4️⃣ Conectar com o GitHub

Substitua `SEU-USUARIO` pelo seu usuário do GitHub:

```bash
git remote add origin https://github.com/SEU-USUARIO/teep-custos-modulos.git
git branch -M main
git push -u origin main
```

**Se pedir credenciais:**
- Use seu email do GitHub
- Para senha, crie um **Personal Access Token**:
  1. GitHub → Settings → Developer settings → Personal access tokens → Generate new token
  2. Marque "repo" e "workflow"
  3. Copie o token gerado e use como senha

### 5️⃣ Ativar GitHub Pages

1. No repositório do GitHub, vá em **Settings**
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione:
   - Branch: **main**
   - Folder: **/ (root)**
4. Clique em **Save**
5. Aguarde 1-2 minutos

### 6️⃣ Acessar o Sistema Online

Seu sistema estará disponível em:
```
https://SEU-USUARIO.github.io/teep-custos-modulos/
```

---

## 🔄 Atualizar o Sistema (Após Mudanças)

Sempre que fizer alterações:

```bash
git add .
git commit -m "Descrição das alterações"
git push
```

Aguarde 1-2 minutos e as mudanças estarão no ar!

---

## ✅ Arquivos que Serão Publicados

- ✅ `index.html` - Interface principal
- ✅ `styles.css` - Estilos
- ✅ `script.js` - Lógica do sistema
- ✅ `config.js` - Configurações
- ✅ `data.json` - Dados locais
- ✅ `README.md` - Documentação
- ✅ `COMO_USAR.md` - Instruções
- ✅ `server.bat` - Para desenvolvimento local

---

## 🎯 Integração com Google Sheets

### Para funcionar online com Google Sheets:

1. **Publicar a Planilha:**
   - Abra sua planilha
   - Arquivo → Compartilhar → Publicar na web
   - Publicar como "Página da Web"

2. **Configurar Permissões:**
   - Compartilhar → Acesso geral
   - Selecione: "Qualquer pessoa com o link"
   - Permissão: "Visualizador"

3. **O sistema já está configurado!**
   - Ao abrir online, tentará carregar do Google Sheets
   - Se falhar, usa dados do `data.json`
   - Se ambos falharem, usa dados embutidos no código

---

## 📊 Atualizar Dados da Planilha

### Opção 1: Editar `data.json` no GitHub

1. No GitHub, clique no arquivo `data.json`
2. Clique no ícone do lápis (Edit)
3. Edite os valores
4. Commit changes

### Opção 2: Usar Google Sheets (Recomendado)

1. Edite a planilha no Google Sheets
2. O sistema carregará automaticamente os novos dados
3. Usuários podem clicar em "Atualizar Dados" para ver as mudanças

---

## 🔒 Segurança

✅ **Seguro para publicar:**
- Não contém senhas ou chaves de API
- Dados são públicos (preços de produtos)
- Somente leitura da planilha
- Ninguém pode editar seus dados

⚠️ **Atenção:**
- A planilha Google Sheets ficará pública (somente leitura)
- Qualquer pessoa pode ver os preços
- Se quiser manter privado, não publique no GitHub Pages

---

## 🎨 Personalizar Domínio (Opcional)

Se tiver um domínio próprio (ex: `teep.com.br`):

1. Settings → Pages → Custom domain
2. Digite: `custos.teep.com.br`
3. Configure DNS no seu provedor:
   - CNAME apontando para: `SEU-USUARIO.github.io`

---

## 💡 Comandos Git Úteis

```bash
# Ver status dos arquivos
git status

# Ver histórico de commits
git log

# Desfazer mudanças não commitadas
git checkout .

# Criar nova branch
git checkout -b nova-funcionalidade

# Trocar de branch
git checkout main

# Ver diferenças
git diff
```

---

## 🆘 Problemas Comuns

### Erro: "Git não é reconhecido"
**Solução:** Instale o Git: https://git-scm.com/downloads

### Erro: "Permission denied"
**Solução:** Use Personal Access Token ao invés de senha

### Página não atualiza
**Solução:** 
- Aguarde 2 minutos
- Limpe o cache do navegador (Ctrl+Shift+Del)
- Teste em aba anônima

### Dados não carregam
**Solução:** 
- Verifique se a planilha está publicada
- Abra o Console do navegador (F12) para ver erros
- Use `data.json` como fonte de dados

---

## 📞 Links Úteis

- **GitHub**: https://github.com
- **GitHub Pages Docs**: https://pages.github.com
- **Git Download**: https://git-scm.com
- **Git Tutorial**: https://try.github.io

---

**© 2025 TEEP - Tecnologia e Engenharia em Eletrônica de Potência**

