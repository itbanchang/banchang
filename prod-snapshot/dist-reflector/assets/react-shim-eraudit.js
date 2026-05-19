// React shim for ErauditTab — re-exports prod's vendor-react chunk
// as named React API exports. Bridges esbuild output → prod vendor-react.
// Vendor-react's `R` export is the React module with hooks attached.
import {
  R
} from './vendor-react-ByYOq5k4.js';
export default R;
export const useState = R.useState;
export const useEffect = R.useEffect;
export const useMemo = R.useMemo;
export const useCallback = R.useCallback;
export const useRef = R.useRef;
export const useLayoutEffect = R.useLayoutEffect;
export const useReducer = R.useReducer;
export const useContext = R.useContext;
export const useImperativeHandle = R.useImperativeHandle;
export const useDebugValue = R.useDebugValue;
export const useId = R.useId;
export const useTransition = R.useTransition;
export const useDeferredValue = R.useDeferredValue;
export const useSyncExternalStore = R.useSyncExternalStore;
export const useInsertionEffect = R.useInsertionEffect;
export const createElement = R.createElement;
export const cloneElement = R.cloneElement;
export const createContext = R.createContext;
export const isValidElement = R.isValidElement;
export const Fragment = R.Fragment;
export const Component = R.Component;
export const PureComponent = R.PureComponent;
export const Suspense = R.Suspense;
export const lazy = R.lazy;
export const memo = R.memo;
export const forwardRef = R.forwardRef;
export const Children = R.Children;
export const startTransition = R.startTransition;
export const version = R.version;