# CNX CMS — Seu site profissional em minutos

CMS moderno feito com **Astro**, deploy grátis na **Vercel**.  
Sem banco de dados. Sem servidor. Você é dono de tudo.

---

## 🚀 Deploy em 1 clique

Clique no botão abaixo e siga as instruções — seu site estará no ar em menos de 5 minutos.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F8linksapp-maker%2Fcnx&env=ADMIN_SECRET&envDescription=Uma%20senha%20secreta%20para%20proteger%20o%20seu%20painel%20admin.%20Use%20qualquer%20texto%20longo%20e%20aleat%C3%B3rio.&envLink=https%3A%2F%2Fgithub.com%2F8linksapp-maker%2Fcnx%23-vari%C3%A1veis-de-ambiente&project-name=meu-site-cnx&repository-name=meu-site-cnx)

---

## 📋 Passo a passo completo para iniciantes

### Passo 1 — Criar contas gratuitas

Você vai precisar de duas contas gratuitas:

| Serviço | Para que serve | Link |
|---|---|---|
| **GitHub** | Armazena o código do seu site | [github.com/signup](https://github.com/signup) |
| **Vercel** | Publica o site na internet | [vercel.com/signup](https://vercel.com/signup) |

> 💡 **Dica:** Na Vercel, faça login usando sua conta do GitHub — fica mais fácil.

---

### Passo 2 — Clicar no botão de deploy

1. Clique no botão **"Deploy with Vercel"** acima
2. A Vercel vai abrir e pedir para você fazer login (use sua conta do GitHub)
3. Ela vai criar automaticamente uma **cópia deste repositório na sua conta** do GitHub

---

### Passo 3 — Configurar a senha do painel

Durante o processo, a Vercel vai pedir uma variável chamada `ADMIN_SECRET`.

- É a **senha de proteção** do seu painel administrativo
- **Use qualquer texto longo**, por exemplo: `meu-site-2024-senha-secreta`
- Guarde essa senha — você vai precisar dela se esquecer a senha do admin

---

### Passo 4 — Fazer o deploy

Clique em **Deploy** e aguarde cerca de 2 minutos.

Quando aparecer a mensagem de sucesso, seu site estará no ar! 🎉

---

### Passo 5 — Criar sua conta de administrador

1. Acesse `https://SEU-SITE.vercel.app/admin`
2. Na primeira vez, o sistema exibe a **tela de configuração inicial**
3. Preencha seu nome, e-mail e senha
4. Clique em **Criar conta e entrar**
5. Pronto — você está dentro do painel!

> Essa tela de configuração aparece **apenas uma vez**. Depois, o acesso é sempre pela tela de login.

---

## 🖥️ O que você pode fazer no painel

| Seção | O que faz |
|---|---|
| **Dashboard** | Visão geral do seu site |
| **Posts** | Criar, editar e publicar artigos no blog |
| **Autores** | Gerenciar autores |
| **Categorias** | Organizar os posts por categoria |
| **Mídia** | Fazer upload de imagens |
| **Páginas** | Editar Home, Sobre, Contato, Menu, Rodapé |
| **Analytics** | Ver dados do Google Analytics |
| **Pixels** | Configurar Google Analytics e Meta Pixel |
| **Importar WordPress** | Importar posts de um site WordPress |

---

## ✏️ Como publicar novo conteúdo

O fluxo correto para publicar conteúdo no site é:

```
1. Edite posts e páginas no painel local (localhost:4321/admin)
        ↓
2. Os arquivos são salvos no seu computador
        ↓
3. git add . && git commit -m "novo post"
        ↓
4. git push origin main
        ↓
5. Vercel detecta o push e republica o site em ~1 minuto ✓
```

> **Em produção no Vercel:** Configure as variáveis `GITHUB_TOKEN`, `GITHUB_OWNER` e `GITHUB_REPO` para que o painel salve diretamente no GitHub (sem precisar usar o computador local).

---

## ⚙️ Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `ADMIN_SECRET` | **Sim** | Senha para proteger os cookies de sessão do painel |
| `GITHUB_TOKEN` | Recomendada | Personal Access Token do GitHub (para editar conteúdo pelo painel em produção) |
| `GITHUB_OWNER` | Recomendada | Seu usuário do GitHub (ex: `joao-silva`) |
| `GITHUB_REPO` | Recomendada | Nome do seu repositório (ex: `meu-site-cnx`) |
| `OPENAI_API_KEY` | Opcional | Chave da OpenAI para geração de posts com IA |

Configure em: **Vercel → Settings → Environment Variables**

---

### Como gerar o GITHUB_TOKEN (para editar conteúdo pelo painel)

1. Acesse [github.com/settings/tokens](https://github.com/settings/tokens)
2. Clique em **"Generate new token (classic)"**
3. Marque a permissão **`repo`** (controle total de repositórios privados)
4. Clique em **Generate token**
5. Copie o token e adicione na Vercel como `GITHUB_TOKEN`

---

## 🔑 Esqueci a senha do admin

Edite o arquivo `src/content/authors/[slug].yaml` no seu repositório GitHub e **remova a linha `adminPasswordHash`**.  
Na próxima vez que acessar `/admin`, a tela de configuração inicial voltará a aparecer.

---

## 💻 Rodar localmente (para desenvolvedores)

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd SEU-REPO

# 2. Instale as dependências
bun install

# 3. Inicie o servidor de desenvolvimento
bun dev
```

Acesse **http://localhost:4321** para ver o site.  
Acesse **http://localhost:4321/admin** para o painel.

---

## 🛠️ Tecnologias

- **[Astro](https://astro.build)** — Framework web moderno
- **[Vercel](https://vercel.com)** — Hospedagem serverless gratuita
- **[Tailwind CSS](https://tailwindcss.com)** — Estilização
- **[React](https://react.dev)** — Componentes interativos do painel
- **[TipTap](https://tiptap.dev)** — Editor de texto rico (WYSIWYG)

---

## 📄 Licença

MIT — use, modifique e distribua livremente.
