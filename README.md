# Domma Tecnologia · site institucional

Site da Domma Tecnologia: sistemas web, agentes de IA, automação, apps e sites.
Rua José Bonifácio, 175, Parque Imperial, Monte Mor, SP · (19) 98460-7000.

Site estático (HTML, CSS e JavaScript puros), sem etapa de build. Segue o Design System Domma v1 (Manrope, JetBrains Mono, paleta violeta/tinta).

## Estrutura

```
index.html          página única com todas as seções
styles.css          tokens do design system e estilos (tema claro e escuro)
script.js           animações (editor de código, agentes, onda) e formulário → WhatsApp
site.webmanifest    ícones para instalar na tela inicial
assets/             logo, favicons, imagem de link preview e logo da RedBox
```

## Rodar localmente

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000.

## Publicar

O site está na Vercel (equipe REDBOX, projeto `site-domma-tecnologia`), ligado a este repositório:

- push na `main` → publica em produção em https://site-domma-tecnologia.vercel.app;
- push em outra branch → gera uma URL de pré-visualização (protegida por login da Vercel).

Não há framework nem comando de build: a Vercel serve os arquivos como estão.

## Domínio próprio

O link preview (WhatsApp, Instagram, LinkedIn) usa o endereço completo do site.
Quando o domínio próprio estiver na Vercel, troque `https://site-domma-tecnologia.vercel.app`
em `index.html` (tags `canonical`, `og:url`, `og:image` e `twitter:image`).

## Formulário

O formulário de orçamento não usa servidor: ele monta a mensagem e abre o WhatsApp
(19) 98460-7000 com o texto pronto.

---

Desenvolvido pela Agência RedBox.
