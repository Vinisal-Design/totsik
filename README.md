# Totsik — site

Site do DJ **Totsik** (Ayrton Siqueira) — São Paulo, BR.
HTML/CSS estático, sem build step, sem dependências.

## Páginas

| Arquivo | O quê |
|---|---|
| `index.html` | Home — hero, quem é, Sala Club, música (YouTube/SoundCloud/Spotify), conquistas |
| `sobre.html` | Bio completa, um parágrafo por foto |
| `sala-club.html` | O projeto: 15 artistas convidados + 10 episódios do Totsik |
| `artista-*.html` | Uma página por artista convidado (estilo, origem, set em vídeo e áudio) |
| `musica.html` | YouTube, SoundCloud (5 mais recentes) e playlists do Spotify |
| `contato.html` | Formulário que abre o WhatsApp com a mensagem pronta |
| `v2.html` | Versão alternativa: onepage resumida |

## Assets

- `assets/style.css` — folha única, mobile first
- `assets/v2.css` — folha da onepage
- `assets/*.ttf` — Archivo e Inter estáticas, servidas localmente
- `assets/sets/` — capas dos episódios do Sala Club
- `assets/artistas/` — fotos dos artistas convidados
- `assets/TOTSIK-PRESS-KIT.pdf` — press kit em PDF, 2 páginas

## Rodar local

Abrir `index.html` no navegador. Não precisa de servidor.

## Deploy

Vercel, estático. `vercel.json` cuida das URLs limpas (`/sobre` → `sobre.html`).

## Pendências

- Bios de 8 artistas convidados (Dionne, Por Um Fio, CHRIZ, PJ Sessions, DEV, Neck,
  Petrone, Vicky Fonttana) — as páginas existem e dizem "perfil em construção".
- As bios publicadas foram montadas de fontes públicas e estão marcadas como
  "a validar com o artista", com as fontes linkadas na própria página.
