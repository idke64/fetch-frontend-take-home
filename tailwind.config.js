/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: "#dedede",
      },
      borderRadius: {
        DEFAULT: "8px",
      },
      borderWidth: {
        DEFAULT: "1.5px",
      },
    },
  },
  plugins: [],
};
