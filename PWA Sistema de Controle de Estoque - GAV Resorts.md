# PWA Sistema de Controle de Estoque - GAV Resorts

## 📱 Sobre a Aplicação

Este é um Progressive Web App (PWA) completo para controle de estoque desenvolvido especificamente para GAV Resorts. A aplicação oferece uma interface moderna e responsiva para gerenciar o inventário de produtos.

## ✨ Funcionalidades

### Dashboard Principal
- **Estatísticas em tempo real**: Total de itens, alertas, pedidos pendentes e itens OK
- **Cards informativos** com códigos de cores para fácil identificação
- **Interface responsiva** que funciona em desktop e mobile

### Gerenciamento de Estoque
- **Lista completa de produtos** com informações detalhadas
- **Sistema de busca** em tempo real por nome ou categoria
- **Status coloridos**: OK (verde), Alerta (amarelo), Realizar Pedido (vermelho)
- **Informações detalhadas**: estoque real, depósito, unidade de medida

### Funcionalidades PWA
- **Instalável** como app nativo no celular/desktop
- **Ícones personalizados** com tema GAV Resorts
- **Funciona offline** (dados em cache)
- **Interface otimizada** para dispositivos móveis

## 🚀 Como Fazer Deploy

### Opção 1: Netlify (Recomendado)
1. Acesse [netlify.com](https://netlify.com)
2. Faça login ou crie uma conta
3. Arraste a pasta `dist/` para a área de deploy
4. Sua aplicação estará online em segundos!

### Opção 2: Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Faça login com GitHub
3. Importe o projeto ou faça upload da pasta `dist/`
4. Deploy automático

### Opção 3: GitHub Pages
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Ative GitHub Pages nas configurações
4. Selecione a pasta `dist/` como source

## 📁 Estrutura do Projeto

```
estoque-pwa-clean/
├── dist/                 # Arquivos prontos para deploy
├── src/
│   ├── App.jsx          # Componente principal
│   ├── components/ui/   # Componentes de interface
│   └── assets/          # Recursos estáticos
├── public/
│   ├── manifest.json    # Configuração PWA
│   ├── icon-192x192.png # Ícone do app
│   └── icon-512x512.png # Ícone do app
└── package.json         # Dependências
```

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 18+ 
- pnpm (ou npm)

### Comandos
```bash
# Instalar dependências
pnpm install

# Executar em desenvolvimento
pnpm run dev

# Fazer build para produção
pnpm run build

# Preview do build
pnpm run preview
```

## 📊 Dados de Demonstração

A aplicação atualmente usa dados mock para demonstração, incluindo:
- 9 produtos de diferentes categorias (BAR, KIDS, LIMPEZA, ADMINISTRATIVO)
- Status variados para demonstrar as funcionalidades
- Dados baseados na planilha original fornecida

## 🔄 Integração com Google Sheets (Próximos Passos)

Para conectar com a planilha real do Google Sheets:

1. **Backend necessário**: A integração requer um servidor backend por questões de segurança
2. **Credenciais**: Use o arquivo JSON fornecido para autenticação
3. **API Google Sheets**: Implementar endpoints para leitura/escrita
4. **Atualização em tempo real**: Configurar polling ou webhooks

## 📱 Como Instalar como App

### No Celular (Android/iOS)
1. Abra a aplicação no navegador
2. Toque no menu do navegador (3 pontos)
3. Selecione "Adicionar à tela inicial" ou "Instalar app"
4. Confirme a instalação

### No Desktop (Chrome/Edge)
1. Abra a aplicação no navegador
2. Clique no ícone de instalação na barra de endereços
3. Ou vá em Menu > Instalar [Nome do App]
4. Confirme a instalação

## 🎨 Personalização

### Cores e Tema
- Edite `src/App.css` para alterar cores
- Modifique `public/manifest.json` para theme colors
- Substitua os ícones em `public/` por versões personalizadas

### Dados
- Modifique o array `mockData` em `src/App.jsx`
- Adicione/remova campos conforme necessário
- Implemente conexão real com Google Sheets

## 📞 Suporte

Para dúvidas sobre deploy ou personalização, consulte a documentação das plataformas:
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages](https://pages.github.com)

---

**Desenvolvido para GAV Resorts** 🏨
*Sistema de Controle de Estoque PWA*

