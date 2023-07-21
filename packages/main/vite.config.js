import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      configFile: "./uno.config.js",
    }),
  ],
  server: {
    host: "localhost",
    port: 4170,
  },
  // define: {
  //   "process.env": {},
  // },
});
