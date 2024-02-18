import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false //
                })
            ]
        })
    ],
    base: '/',
    resolve: {
        alias: {
            '@': new URL('src', import.meta.url).pathname
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/assets/css/global.scss";',
                javascriptEnabled: true,
                // modifyVars: 这是用于覆盖Ant Design Vue主题变量的配置。在这里，它修改了@primary-color和@link-color的值，以定制Ant Design Vue的主题颜色。
                modifyVars: {
                    '@primary-color': '#c8b288',
                    '@link-color': '#034078'
                }
            }
        }
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://47.92.89.106/api',
                changeOrigin: true,
                // secure:true,//是否https接口
                // ws:true,//是否代理websockets
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        outDir: 'dist'
    }
});
