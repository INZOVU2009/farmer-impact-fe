var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// postcss.config.cjs
var require_postcss_config = __commonJS({
  "postcss.config.cjs"(exports, module) {
    module.exports = ({ env }) => ({
      plugins: [
        __require("file:///Users/a1/Desktop/RTC/farmer-impact-fe/node_modules/tailwindcss/lib/index.js")({
          config: "./src/css/tailwind.config.js"
        }),
        __require("file:///Users/a1/Desktop/RTC/farmer-impact-fe/node_modules/autoprefixer/lib/autoprefixer.js")()
      ]
    });
  }
});

// vite.config.js
var import_postcss_config = __toESM(require_postcss_config(), 1);
import { defineConfig } from "file:///Users/a1/Desktop/RTC/farmer-impact-fe/node_modules/vite/dist/node/index.js";
import react from "file:///Users/a1/Desktop/RTC/farmer-impact-fe/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  define: {
    "process.env": process.env
  },
  css: {
    postcss: import_postcss_config.default
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^~.+/,
        replacement: (val) => {
          return val.replace(/^~/, "");
        }
      }
    ]
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicG9zdGNzcy5jb25maWcuY2pzIiwgInZpdGUuY29uZmlnLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2ExL0Rlc2t0b3AvUlRDL2Zhcm1lci1pbXBhY3QtZmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hMS9EZXNrdG9wL1JUQy9mYXJtZXItaW1wYWN0LWZlL3Bvc3Rjc3MuY29uZmlnLmNqc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYTEvRGVza3RvcC9SVEMvZmFybWVyLWltcGFjdC1mZS9wb3N0Y3NzLmNvbmZpZy5janNcIjttb2R1bGUuZXhwb3J0cyA9ICh7IGVudiB9KSA9PiAoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVxdWlyZSgndGFpbHdpbmRjc3MnKSh7XG4gICAgICBjb25maWc6ICcuL3NyYy9jc3MvdGFpbHdpbmQuY29uZmlnLmpzJ1xuICAgIH0pLFxuICAgIHJlcXVpcmUoJ2F1dG9wcmVmaXhlcicpKClcbiAgXSxcbn0pIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYTEvRGVza3RvcC9SVEMvZmFybWVyLWltcGFjdC1mZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2ExL0Rlc2t0b3AvUlRDL2Zhcm1lci1pbXBhY3QtZmUvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2ExL0Rlc2t0b3AvUlRDL2Zhcm1lci1pbXBhY3QtZmUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHBvc3Rjc3MgZnJvbSAnLi9wb3N0Y3NzLmNvbmZpZy5janMnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBkZWZpbmU6IHtcbiAgICAncHJvY2Vzcy5lbnYnOiBwcm9jZXNzLmVudlxuICB9LFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzLFxuICB9LFxuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczogW1xuICAgICAge1xuICAgICAgICBmaW5kOiAvXn4uKy8sXG4gICAgICAgIHJlcGxhY2VtZW50OiAodmFsKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHZhbC5yZXBsYWNlKC9efi8sIFwiXCIpO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICBidWlsZDoge1xuICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgdHJhbnNmb3JtTWl4ZWRFc01vZHVsZXM6IHRydWUsXG4gICAgfVxuICB9IFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQTRTLFdBQU8sVUFBVSxDQUFDLEVBQUUsSUFBSSxPQUFPO0FBQUEsTUFDelUsU0FBUztBQUFBLFFBQ1AsVUFBUSxxRkFBYSxFQUFFO0FBQUEsVUFDckIsUUFBUTtBQUFBLFFBQ1YsQ0FBQztBQUFBLFFBQ0QsVUFBUSw2RkFBYyxFQUFFO0FBQUEsTUFDMUI7QUFBQSxJQUNGO0FBQUE7QUFBQTs7O0FDTkEsNEJBQW9CO0FBRGdSLFNBQVMsb0JBQW9CO0FBRWpVLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixlQUFlLFFBQVE7QUFBQSxFQUN6QjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsK0JBQUFBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhLENBQUMsUUFBUTtBQUNwQixpQkFBTyxJQUFJLFFBQVEsTUFBTSxFQUFFO0FBQUEsUUFDN0I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGlCQUFpQjtBQUFBLE1BQ2YseUJBQXlCO0FBQUEsSUFDM0I7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsicG9zdGNzcyJdCn0K
