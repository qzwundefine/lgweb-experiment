import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";

export default defineConfig({
  // ...UnoCSS options
  shortcuts: {
    "login-triangle":
      "w-0 h-0 absolute top-0 right-0 border-b-[80px] border-b-solid border-b-white border-r-[80px] border-r-solid border-r-transparent cursor-pointer",
  },
  theme: {
    colors: {
      // ...
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        // ...
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
