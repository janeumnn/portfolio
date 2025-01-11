import { addDynamicIconSelectors } from '@iconify/tailwind';
import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {}
  },
  plugins: [typography, containerQueries, aspectRatio, daisyui, addDynamicIconSelectors()],
  daisyui: {
    themes: [
      {
        light: {
          'primary': '#0a0a0a',
          'secondary': '#a8a8a8',
          'accent': '#3a5464',
          'neutral': '#262626',
          'base-100': '#ffffff',
          'base-200': '#dedede',
          'base-300': '#bebebe',
          'info': '#4ea6de',
          'success': '#4caf50',
          'warning': '#ffa726',
          'error': '#f44336',

          'primary-content': '#c7c7c7',
          'secondary-content': '#0a0a0a',
          'accent-content': '#d5dade',
          'neutral-content': '#cfcfcf',
          'base-content': '#161616',
          'info-content': '#020a12',
          'success-content': '#020b02',
          'warning-content': '#160a00',
          'error-content': '#140101',

          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',
          '--btn-focus-scale': '0.95',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0.5rem'
        },
        dark: {
          'primary': '#f5f5f5',
          'secondary': '#575757',
          'accent': '#9bb5c5',
          'neutral': '#262626',
          'base-100': '#000000',
          'base-200': '#1a1a1a',
          'base-300': '#333333',
          'info': '#4ea6de',
          'success': '#4caf50',
          'warning': '#ffa726',
          'error': '#f44336',

          'primary-content': '#151515',
          'secondary-content': '#dbdbdb',
          'accent-content': '#090c0e',
          'neutral-content': '#cfcfcf',
          'base-content': '#bebebe',
          'info-content': '#020a12',
          'success-content': '#020b02',
          'warning-content': '#160a00',
          'error-content': '#140101',

          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1.9rem',
          '--animation-btn': '0.25s',
          '--animation-input': '0.2s',
          '--btn-focus-scale': '0.95',
          '--border-btn': '1px',
          '--tab-border': '1px',
          '--tab-radius': '0.5rem'
        }
      }
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    logs: false,
    themeRoot: ':root'
  }
};
