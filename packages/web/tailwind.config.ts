import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-background)',
        bc: 'var(--color-border)',
        pc: 'var(--color-primary)',
        ptc: 'var(--color-t-primary)',
        sc: 'var(--color-secondary)',
        pt: 'var(--color-primary-text)',
        st: 'var(--color-secondary-text)',
        tp: 'var(--color-transparent)',
        red: 'var(--color-red)',
        green: 'var(--color-green)'
      },
      fontFamily: {
        sans: ['Outfit', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', ...defaultTheme.fontFamily.sans],
        source: ['Outfit', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
}
export default config
