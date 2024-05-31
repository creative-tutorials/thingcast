import { JSX, SVGProps } from "react";

export const TwitchAlt = (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
  <svg
    height={props.height}
    width={props.width}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.76 2A3.758 3.758 0 0 0 2 5.76v12.48A3.758 3.758 0 0 0 5.76 22h12.48A3.758 3.758 0 0 0 22 18.24V5.76A3.758 3.758 0 0 0 18.24 2z"
      fill="#5a3e85"
    />
    <path
      d="M6.142 4.5h13.322v9.18l-3.918 3.918h-2.91L10.816 19.5H8.8v-1.902H5.218V7.074zM7.374 5.844v9.402h3.022v1.902L12.54 15.246h3.58l2.238-2.238V5.844zM10.956 8.418h1.342v3.918h-1.342zm3.582 0h1.342v3.918h-1.342z"
      fill="#FFFFFF"
    />
  </svg>
);
