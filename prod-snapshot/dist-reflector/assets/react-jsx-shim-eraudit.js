// JSX runtime shim — bridges esbuild output → prod's vendor-react `j` export.
// Prod vendor-react's `j` is the bundled jsx-runtime module (has .jsx, .jsxs, .Fragment).
import {
  j
} from './vendor-react-ByYOq5k4.js';
export const jsx = j.jsx;
export const jsxs = j.jsxs;
export const Fragment = j.Fragment;