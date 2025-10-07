# TEEP - Sistema de Análise de Custos de Módulos IoT

Sistema web para análise e gestão de custos dos módulos IoT TEEP, integrado com planilha do Google Sheets.

## 🌐 Demo Online

Acesse o sistema online: **[https://SEU-USUARIO.github.io/teep-custos-modulos/](https://SEU-USUARIO.github.io/teep-custos-modulos/)**

*(Substitua `SEU-USUARIO` pelo seu usuário do GitHub)*

## 🚀 Funcionalidades

- ✅ **Visualização de Custos**: Interface clara e organizada para análise de custos dos módulos TMP-1044-W e TMP-1044-E
- ✅ **Edição Interativa**: Permite modificar quantidades e preços unitários em tempo real
- ✅ **Cálculo Automático**: Atualização automática de totais ao modificar valores
- ✅ **Atualização da Base**: Botão para restaurar dados originais da planilha
- ✅ **Resumo Geral**: Visão consolidada dos custos de todos os módulos
- ✅ **Design Responsivo**: Interface adaptável para desktop, tablet e mobile
- ✅ **Visual Moderno**: Layout profissional com as cores da TEEP

## 📋 Módulos Incluídos

### TMP-1044-W
Módulo IoT TEEP WiFi com 4 Entradas Digitais e 4 Saídas Digitais NA/NF

**Componentes:**
- Placa Hoffer PLC (MP-1044-W)
- Fonte 12V – 3A (TFM-1003)
- Gabinete (MP-GB-4-4)
- Adesivo (MP-AD-4-4)
- Parafusos de fixação (TP-PH-3Mx8MM)

### TMP-1044-E
Módulo IoT TEEP Ethernet com 4 Entradas Digitais e 4 Saídas Digitais NA/NF

**Componentes:**
- Placa Hoffer PLC (MP-1044-E)
- Fonte 12V – 3A (TFM-1003)
- Gabinete (MP-GB-4-4)
- Adesivo (MP-AD-4-4)
- Parafusos de fixação (TP-PH-3Mx8MM)

## 🎨 Características da Interface

- **Header com Logo**: Logo oficial da TEEP
- **Botão Atualizar**: Restaura valores da planilha original
- **Tabelas Interativas**: Campos editáveis para quantidade e preço
- **Cálculos em Tempo Real**: Totais atualizados automaticamente
- **Resumo Destacado**: Card com totais gerais
- **Notificações**: Feedback visual das ações
- **Animações Suaves**: Transições e efeitos visuais modernos

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis CSS e gradientes)
- JavaScript (ES6+)
- Design responsivo
- Animações CSS

## 📱 Como Usar

1. **Abrir o Sistema**
   - Abra o arquivo `index.html` em um navegador web moderno

2. **Visualizar Custos**
   - Os dados são carregados automaticamente da base de dados da planilha

3. **Editar Valores**
   - Clique nos campos de quantidade ou preço unitário para modificar
   - Os totais são atualizados automaticamente

4. **Atualizar Base de Dados**
   - Clique no botão "Atualizar com Base de Dados" para restaurar os valores originais da planilha

5. **Analisar Resumo**
   - Visualize o resumo geral na parte inferior com os totais de cada módulo

## 📊 Estrutura dos Dados

Os dados são organizados por módulo e incluem:
- **Código**: Identificador único do componente
- **Descrição**: Nome e especificação do item
- **Quantidade**: Número de unidades necessárias
- **Preço Unitário**: Valor individual em R$
- **Preço Total**: Cálculo automático (Qtd × Preço Unit.)

## 🔄 Integração com Google Sheets

O sistema está preparado para integração com a planilha:
`https://docs.google.com/spreadsheets/d/1XKXwSTNKVRSKqAZrY67tBxpdN-yfVfUzx-lU0krT9r0/edit`

### Para Ativar Integração Real (Opcional)

1. Configurar Google Sheets API
2. Adicionar credenciais no código
3. Implementar funções de leitura/escrita
4. Configurar CORS no Google Sheets

**Nota:** Atualmente o sistema funciona com dados locais que espelham a planilha.

## 🎯 Roadmap Futuro

- [ ] Integração real com Google Sheets API
- [ ] Exportação para PDF
- [ ] Histórico de alterações
- [ ] Múltiplos módulos adicionais
- [ ] Comparação de cenários
- [ ] Gráficos de análise de custos

## 📄 Licença

© 2025 TEEP - Tecnologia e Engenharia em Eletrônica de Potência

---

**Desenvolvido para TEEP** - Sistema de Gestão de Custos de Módulos IoT

