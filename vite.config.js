import { defineConfig } from 'vite';

export default defineConfig({
  // build: {
  //   outDir: 'dist',
  //   emptyOutDir: true,
  //   target: ['es2020'],
  //   assetsDir: './',
  //   cssCodeSplit: true,
  //   rollupOptions: {
  //     output: {
  //       // Все файлы будут помещены в корневую папку dist
  //       entryFileNames: 'script.js',
  //       chunkFileNames: 'script.js',
  //       assetFileNames: ({ name }) => {
  //         if (/\.css$/.test(name ?? '')) {
  //           return 'style.css';
  //         }
  //         return '[name][extname]';
  //       },
  //     },
  //   },
  // },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: ['es2020'],
    assetsDir: './',
    cssCodeSplit: false,
  },

  server: {
    port: 5000,
    setup: (server) => {
      server.middlewares.use((req, res, next) => {
        // Устанавливаем заголовок для обхода предупреждения ngrok
        res.setHeader('ngrok-skip-browser-warning', 'true');
        next();
      });

      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST') {
          res.redirect(req.originalUrl);
        } else {
          next();
        }
      });
    },
    static: {
      directory: './dist',
    },
  },
});
