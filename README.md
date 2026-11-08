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

- push na `main` → publica em produção em https://dommasistemas.com.br (também em https://site-domma-tecnologia.vercel.app);
- push em outra branch → gera uma URL de pré-visualização (protegida por login da Vercel).

Não há framework nem comando de build: a Vercel serve os arquivos como estão.

## Domínio

`dommasistemas.com.br` aponta para a Vercel (entrada A na HostGator) e `www` redireciona para ele.
O e-mail (`mail`, MX), o webmail, o cPanel e o FTP continuam na HostGator, cada um com entrada própria.

As tags `canonical` e `og:url` usam `https://dommasistemas.com.br/`. A imagem do link preview
(`og:image`, `twitter:image`) carrega do endereço da Vercel, que funciona mesmo durante mudanças de DNS.

## Formulário

O formulário de orçamento não usa servidor: ele monta a mensagem e abre o WhatsApp
(19) 98460-7000 com o texto pronto.

---

Desenvolvido pela Agência RedBox.
