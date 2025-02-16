import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import polyfillNode from "rollup-plugin-polyfill-node"
import Components from 'unplugin-vue-components/vite'
import RadixVueResolver from 'radix-vue/resolver'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        Components({
            dts: true,
            resolvers: [RadixVueResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            "stream": "readable-stream"
        },
    },
    define: {global: 'window'},
    optimizeDeps: {
        esbuildOptions: {
            define: {
                global: 'globalThis'
            },
        }
    },
    build: {
        rollupOptions: {
            plugins: [polyfillNode()],
        },
    }
})
