# Dual Portfolio

Base local de Next.js + TypeScript, next-intl y Prisma 7 con SQLite.

## Requisitos
Node.js 22.12+ o 24 y npm. Ejecutar siempre desde la raíz del proyecto.

## Primer inicio
```bash
npm ci
cp .env.example .env
npm run db:generate
npm run db:deploy
npm run db:seed
npm run dev
```
En Windows puedes copiar `.env.example` a `.env` desde el explorador.
Visita http://localhost:3000. La raíz dirige a /en, incluso con navegador en español.

## Rutas
- /en y /es: portada.
- /en/web-development y /es/web-development: desarrollo web.
- /en/electrical-engineering y /es/electrical-engineering: ingeniería eléctrica y comunicaciones.

## Datos
```bash
npm run db:studio
```
Prisma Studio permite crear y modificar proyectos y traducciones localmente. No exponer Studio a Internet.
El seed crea dos áreas sin inventar proyectos ni modificar tus proyectos existentes.
Crea un Project asociado a un Portfolio, añade ProjectTranslation para `en` y `es` y activa `published`.
Las traducciones de proyectos usan inglés si falta el idioma solicitado. Los textos de interfaz están en messages/.
La BD está en prisma/dev.db; no se incluye en el ZIP ni en Git. Guarda copia de ese archivo para respaldar datos.

## Desarrollo
```bash
npm run lint
npm run typecheck
npm run build
npm run db:migrate -- --name nombre_del_cambio
```
`db:migrate` crea migraciones durante desarrollo. `db:deploy` aplica las ya incluidas.

## Alcance inicial
No incluye login, panel administrativo público, carga de imágenes ni envío de correo.
La gestión inicial se hace con Prisma Studio. Los enlaces de idioma de la cabecera llevan a la portada del idioma elegido.
SQLite local necesita un servidor Node con disco persistente; no publicar este archivo local en un alojamiento efímero esperando persistencia.
