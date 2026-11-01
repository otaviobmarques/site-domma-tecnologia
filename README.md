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

Qualquer hospedagem estática serve (Vercel, Netlify, GitHub Pages). Na Vercel, importe o repositório sem framework e sem comando de build.

## Antes de ir ao ar

O link preview (WhatsApp, Instagram, LinkedIn) precisa do endereço completo do site.
Em `index.html`, troque `https://www.dommatecnologia.com.br` pelo domínio definitivo
(tags `canonical`, `og:url`, `og:image` e `twitter:image`).

## Formulário

O formulário de orçamento não usa servidor: ele monta a mensagem e abre o WhatsApp
(19) 98460-7000 com o texto pronto.

---

Desenvolvido pela Agência RedBox.
