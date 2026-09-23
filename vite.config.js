import {defineConfig} from 'vite';
export default defineConfig({server:{host:'0.0.0.0',port:4173,strictPort:true,allowedHosts:['terminal.local']},build:{chunkSizeWarningLimit:700,rollupOptions:{input:{game:'index.html',studio:'lighting-review.html'}}}});
