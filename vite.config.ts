import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

    return defineConfig({
        plugins: [vue()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        build: {
            sourcemap: true,
        },
        server: {
            // port: 5173,
            // proxy: {
            //   "/api": {
            //     target: process.env.VITE_API_URL,
            //     changeOrigin: true,
            //     rewrite: (path) => path.replace(/^\/api/, ""),
            //     secure: false,
            //     ws: true,
            //   },
            // },
        },
        base: "/",
    });
};
