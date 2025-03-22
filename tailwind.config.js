/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
          light: "var(--primary-light)",
          foreground: "white",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "white",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--background-muted)",
          foreground: "var(--foreground-muted)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "white",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        success: {
          DEFAULT: "var(--success)",
          foreground: "white",
        },
        warning: {
          DEFAULT: "var(--warning)",
          foreground: "white",
        },
        blue: {
          50: "#f0f7ff",
          100: "#e0eefe",
          200: "#bae0fd",
          300: "#7cc8fc",
          400: "#36aff8",
          500: "#0d96e6",
          600: "#0076c5",
          700: "#0056b3", // Our primary blue
          800: "#064d8c",
          900: "#0a3966",
          950: "#0a2647",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'blue-sm': 'var(--shadow-sm)',
        'blue': 'var(--shadow)',
        'blue-md': 'var(--shadow-md)',
        'blue-lg': 'var(--shadow-lg)',
        'blue-xl': 'var(--shadow-xl)',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%)',
        'blue-accent-gradient': 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
        'blue-subtle': 'linear-gradient(135deg, var(--background) 0%, var(--background-alt) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 