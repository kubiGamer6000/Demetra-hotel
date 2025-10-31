/// <reference types="node" />

declare module "*.json" {
  const value: any;
  export default value;
}

declare module "*.woff";
declare module "*.woff2";
declare module "*.ttf";

// Ensure TypeScript recognizes JSX
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
