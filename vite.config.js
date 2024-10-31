import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@styles': path.resolve(__dirname, 'src/assets/styles'),
            '@images': path.resolve(__dirname, 'src/assets/images'),
            '@icons': path.resolve(__dirname, 'src/assets/icons'),
            '@apis': path.resolve(__dirname, 'src/apis'),
            '@routers': path.resolve(__dirname, 'src/routers'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@contexts': path.resolve(__dirname, 'src/contexts'),
            '@pages': path.resolve(__dirname, 'src/pages'),
        },
    },
});
