module.exports = {
  content: [
    "./index.html",
    "./main/main.html",
    "./main/diabetes.html",
    "./main/article.html",
    "./js/**/*.js",
    "./main/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4B9EF9',
        secondary: '#E8F3FF'
      },
      borderRadius: {
        'none': '0px',
        'sm': '2px',
        DEFAULT: '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
        'button': '4px'
      }
    }
  },
  plugins: [],
}