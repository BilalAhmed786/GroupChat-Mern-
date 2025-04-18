export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'xxs': '0.625rem', // 10px
        'xxxs': '0.525rem', // 8px
      },
      spacing: {
        '96': '24rem',  // 384px (default maximum spacing in Tailwind CSS)
        '100': '25rem', // 400px (custom spacing value)
        '104': '26rem', // 416px (custom spacing value)
        '108': '27rem', // 432px (custom spacing value)
      },

      borderRadius: {
        '360': '360px',
      },
    },
  },
  plugins: [],
}

