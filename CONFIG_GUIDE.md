# Guia de Configuração e Testes — Borogodó Landing Page

Este guia explica como configurar a Rádio Spotify, a conexão dinâmica com o Substack, usar o painel administrativo "Estúdio Borogodó" e executar a suíte de testes unitários.

---

## 🎧 1. Rádio Borogodó (Spotify Player)

O reprodutor do Spotify é um player flutuante dinâmico integrado que carrega uma playlist pública.

### Como alterar a Playlist Padrão:
1. Abra o arquivo `index.html` e procure pela tag `<iframe>` com o id `spotify-iframe`.
2. Altere o ID da playlist no atributo `src`.
   - Por exemplo, em `https://open.spotify.com/embed/playlist/37i9dQZF1DX4b9tI0T0q7A`, o ID é `37i9dQZF1DX4b9tI0T0q7A`.
3. No painel administrativo em tempo de execução, você também pode alterar o ID no campo correspondente e clicar em **Exportar index.html Atualizado**. O novo arquivo baixado já virá com a playlist configurada como padrão.

---

## 📰 2. Diários de Borogodó (Conexão Substack)

O site carrega os artigos mais recentes da sua newsletter diretamente do Substack via feed RSS.

### Como funciona:
- O JavaScript do cliente lê a URL do Substack configurada no painel administrativo (por padrão, `https://aborogodo.substack.com`).
- A requisição é feita através do proxy público CORS `https://api.allorigins.win`, contornando bloqueios de segurança do navegador.
- Os 3 posts mais recentes são processados:
  - Títulos, links e datas de publicação reais são exibidos.
  - As descrições são limpas (removendo tags HTML) e limitadas a 150 caracteres.
  - O tempo estimado de leitura é calculado dividindo o número total de palavras por 200 (média padrão).
- **Fallback Seguro:** Caso a rede esteja indisponível, o Substack esteja fora do ar ou o proxy CORS apresente instabilidade, o site exibe os posts estáticos pré-renderizados nativamente no HTML, garantindo que a seção nunca fique em branco ou quebrada.

---

## 🔐 3. Estúdio Borogodó (Painel Secreto)

O site possui um micro-CMS estático integrado para edição visual rápida de textos.

### Como acessar o Painel:
1. Abra a página em qualquer navegador.
2. Role até o rodapé e **clique 5 vezes seguidas** no copyright (`© 2026 Todos os direitos reservados.`).
3. Ou utilize o atalho de teclado: `Ctrl + Shift + E`.
4. Digite a senha padrão: `borogodo2026`.

### Como editar e salvar:
1. Uma vez autenticado, o modo de edição visual inline estará ativo.
2. Textos editáveis ficarão com bordas tracejadas. Clique em qualquer um deles e altere diretamente na tela.
3. No painel, você também pode atualizar a URL do Substack e o ID da Playlist do Spotify.
4. Para salvar, clique no botão **Exportar index.html Atualizado** para baixar o código consolidado com as suas alterações pronto para publicação.

---

## 🧪 4. Suíte de Testes Unitários

Configuramos uma suíte de testes automatizados com Jest para validar o comportamento de interface do JavaScript.

### Pré-requisitos:
- Ter o **Node.js** (v18+) e **npm** instalados na sua máquina.

### Executando os testes:
1. Abra o terminal na pasta raiz do projeto.
2. Instale as dependências executando:
   ```bash
   npm install
   ```
3. Execute os testes com o comando:
   ```bash
   npm test
   ```

Os testes cobrem:
- Mudanças de temas visuais e rituais sensoriais (`coqueiro`, `drink`, `feijoada`, `cafe`).
- Toggle e controle de acessibilidade (`aria-expanded`) do Spotify Player.
- Autenticação de credenciais administrativas.
- Comportamento de abertura/fechamento das abas do manifesto (acordeão).
