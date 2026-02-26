# CNX CMS — Seu site profissional em minutos

CMS moderno feito com **Astro**, deploy grátis na **Vercel**.  
Sem banco de dados. Sem servidor. Você é dono de tudo.

---

## 🚀 Deploy em 1 clique

Clique no botão abaixo para começar — seu site estará no ar em menos de 5 minutos.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F8linksapp-maker%2Fcnx&env=ADMIN_SECRET&envDescription=Uma%20senha%20secreta%20para%20proteger%20o%20seu%20painel%20admin.%20Use%20qualquer%20texto%20longo%20e%20aleat%C3%B3rio.&envLink=https%3A%2F%2Fgithub.com%2F8linksapp-maker%2Fcnx%23-vari%C3%A1veis-de-ambiente&project-name=meu-site-cnx&repository-name=meu-site-cnx)

---

## 📋 Guia completo — do zero ao site no ar

Siga os passos abaixo **em ordem**. Cada um leva menos de 2 minutos.

---

### ✅ Passo 1 — Criar duas contas gratuitas

Você vai precisar de:

| Serviço | Para que serve | Link |
|---|---|---|
| **GitHub** | Guarda o código do seu site | [github.com/signup](https://github.com/signup) |
| **Vercel** | Publica o site na internet | [vercel.com/signup](https://vercel.com/signup) |

> 💡 **Dica:** Na Vercel, clique em **"Continue with GitHub"** — isso conecta as duas contas automaticamente.

---

### ✅ Passo 2 — Fazer o deploy

1. Clique no botão **"Deploy with Vercel"** acima
2. Faça login com sua conta do GitHub quando solicitado
3. A Vercel vai criar automaticamente **uma cópia deste repositório na sua conta** do GitHub
4. Quando aparecer o campo `ADMIN_SECRET`, insira qualquer texto longo (ex: `meu-site-2025-seguro`) — **anote essa senha**
5. Clique em **Deploy** e aguarde ~2 minutos

Quando aparecer a tela de sucesso, seu site já está no ar! 🎉

---

### ✅ Passo 3 — Criar sua conta de administrador

1. Acesse `https://SEU-SITE.vercel.app/admin`
2. Na primeira vez, o sistema exibe a **tela de configuração inicial**
3. Preencha seu nome, e-mail e crie uma senha
4. Clique em **Criar conta e entrar**

> Essa tela aparece **apenas uma vez**. Depois, o login é sempre pelo e-mail e senha que você criou.

---

### ✅ Passo 4 — Ativar edição de conteúdo pelo painel (recomendado)

Por padrão, o painel só salva conteúdo localmente. Para salvar direto pelo site (em qualquer lugar), configure estas variáveis na Vercel:

**Como gerar o GITHUB_TOKEN:**

1. Acesse [github.com/settings/tokens](https://github.com/settings/tokens)
2. Clique em **"Generate new token (classic)"**
3. Em **"Note"**, escreva: `CNX Token`
4. Marque a permissão **`repo`**
5. Clique em **Generate token** e copie o valor gerado

**Como adicionar na Vercel:**

1. Acesse seu projeto na Vercel → **Settings → Environment Variables**
2. Adicione as três variáveis abaixo:

| Variável | Valor |
|---|---|
| `GITHUB_TOKEN` | O token que você gerou acima |
| `GITHUB_OWNER` | Seu usuário do GitHub (ex: `joao-silva`) |
| `GITHUB_REPO` | Nome do repositório criado (ex: `meu-site-cnx`) |

3. Clique em **Save** e aguarde o redeploy automático (~1 min)

---

### ✅ Passo 5 — Ativar atualizações automáticas do template

Este passo é **obrigatório** para receber melhorias futuras do CNX automaticamente.

1. Acesse o seu repositório no GitHub
2. Clique em **Settings** (engrenagem no menu superior)
3. No menu lateral, clique em **Actions → General**
4. Role até **"Workflow permissions"**
5. Marque **"Read and write permissions"**
6. Marque **"Allow GitHub Actions to create and approve pull requests"** ✓
7. Clique em **Save**

> ⚠️ **Sem este passo**, as atualizações automáticas do template não funcionarão.

---

### ✅ Passo 6 — Testar tudo

Acesse seu site e confirme que está funcionando:

| O que testar | Endereço |
|---|---|
| Site público | `https://SEU-SITE.vercel.app` |
| Painel admin | `https://SEU-SITE.vercel.app/admin` |
| Criar um post | Admin → Posts → Novo Post |
| Criar tema com IA | Admin → 🎨 Criar Tema com IA |

---

## 🎨 Criar um tema personalizado com IA

O CNX possui um **Wizard de Criação de Temas** integrado ao painel admin.

Ele gera um prompt completo para você colar no **Cursor** (IDE com IA) — a IA cria o tema, faz o commit e publica na Vercel automaticamente.

**Como acessar:** Admin → **🎨 Criar Tema com IA**

**O que o wizard faz:**
- Coleta sua identidade visual (cores, estilo, fonte)
- Configura SEO, Open Graph e Schema.org
- Gera o texto da página /sobre e /contato
- Produz um prompt único pronto para o Cursor Agent

**Tipos de site disponíveis:**
| Tipo | Status |
|---|---|
| 📝 Blog / Conteúdo | ✅ Disponível |
| 🏠 Imobiliária | 🔒 Em breve |
| 🍕 Restaurante | 🔒 Em breve |
| 💼 Portfólio | 🔒 Em breve |
| 👩‍⚕️ Clínica / Saúde | 🔒 Em breve |
| 🎓 Curso / Mentoria | 🔒 Em breve |

---

## 🔄 Como receber atualizações do template

O repositório possui uma **Action automática** que verifica melhorias no CNX e abre um Pull Request para você aplicar.

### Atualização automática (toda segunda-feira às 9h)

Se houver novidades, você receberá um e-mail do GitHub com o assunto:
> *"🔄 Atualização disponível do Template CNX"*

### Como aplicar a atualização (2 cliques)

1. Abra o e-mail e clique no link **ou** acesse a aba **"Pull requests"** no seu repositório
2. Clique no botão verde **"Merge pull request"**
3. Clique em **"Confirm merge"**
4. Aguarde ~2 minutos — seu site é reconstruído automaticamente ✅

> **Seu conteúdo (posts, páginas, imagens) nunca é alterado.** Apenas os arquivos de código do template são atualizados.

### Atualizar agora manualmente

1. Acesse seu repositório no GitHub
2. Clique na aba **"Actions"**
3. Clique em **"🔄 Atualizar Template CNX"**
4. Clique em **"Run workflow"** → **"Run workflow"**
5. Se houver novidades, um Pull Request será aberto automaticamente

> ⚠️ Se aparecer o erro *"GitHub Actions is not permitted to create or approve pull requests"*, volte ao **Passo 5** e ative a permissão.

---

## 🖥️ O que você pode fazer no painel

| Seção | O que faz |
|---|---|
| **Dashboard** | Visão geral do site com versão do template |
| **Posts** | Criar, editar e publicar artigos no blog |
| **Autores** | Gerenciar autores e perfis |
| **Categorias** | Organizar posts por categoria |
| **Mídia** | Fazer upload de imagens |
| **Páginas** | Editar Home, Sobre, Contato, Menu, Rodapé |
| **Analytics** | Ver dados do Google Analytics |
| **Pixels** | Configurar Google Analytics e Meta Pixel |
| **Importar WordPress** | Importar posts de um site WordPress |
| **🎨 Criar Tema com IA** | Gerar prompt para criar tema personalizado no Cursor |

---

## ⚙️ Variáveis de ambiente — referência completa

Configure em: **Vercel → Settings → Environment Variables**

| Variável | Obrigatória | Descrição |
|---|---|---|
| `ADMIN_SECRET` | **Sim** | Protege os cookies de sessão do painel. Use qualquer texto longo e aleatório. |
| `GITHUB_TOKEN` | Recomendada | Personal Access Token (permissão `repo`) — permite salvar conteúdo pelo painel em produção |
| `GITHUB_OWNER` | Recomendada | Seu usuário do GitHub (ex: `joao-silva`) |
| `GITHUB_REPO` | Recomendada | Nome do repositório (ex: `meu-site-cnx`) |
| `OPENAI_API_KEY` | Opcional | Chave da OpenAI para geração de posts com IA |

---

## 🔑 Esqueci a senha do admin

1. Acesse seu repositório no GitHub
2. Navegue até `src/content/authors/`
3. Abra o arquivo `.yaml` do seu usuário
4. **Remova a linha** `adminPasswordHash: ...`
5. Faça commit da alteração
6. Acesse `/admin` — a tela de configuração inicial reaparecerá

---

## 💻 Rodar localmente (para desenvolvedores)

```bash
# 1. Clone o repositório
git clone https://github.com/SEU-USUARIO/SEU-REPO.git
cd SEU-REPO

# 2. Instale as dependências
bun install

# 3. Crie o arquivo de variáveis
cp .env.example .env
# Edite o .env e adicione suas variáveis

# 4. Inicie o servidor
bun dev
```

Acesse **http://localhost:4321** para ver o site.  
Acesse **http://localhost:4321/admin** para o painel.

### Publicar alterações feitas localmente

```bash
git add .
git commit -m "descrição do que você alterou"
git push origin main
# A Vercel detecta o push e republica o site em ~1 minuto
```

---

## 🛠️ Tecnologias

- **[Astro](https://astro.build)** — Framework web moderno e ultrarrápido
- **[Vercel](https://vercel.com)** — Hospedagem serverless gratuita
- **[Tailwind CSS](https://tailwindcss.com)** — Estilização utilitária
- **[React](https://react.dev)** — Componentes interativos do painel
- **[TipTap](https://tiptap.dev)** — Editor de texto rico (WYSIWYG)

---

## 📄 Licença

MIT — use, modifique e distribua livremente.
