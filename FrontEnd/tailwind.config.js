/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      keyframes: {
        "jump-pencil": {
          "0%, 100%": {
            transform: "translateY(-30px)rotate(45deg) ",
          },
          "50%": {
            transform: "translateY(0px)rotate(45deg) ",
          },
        },
        line: {
          "0%, 100%": {
            transform: "scaleX(0.8)",
            opacity: 0.5,
          },
          "50%": {
            transform: "scaleX(1.5)",
            opacity: 1,
          },
        }
      }
    },
    fontFamily: {
      display:["Fredoka"]
    },
    animation: {
      // heart jumping
      "jump-pencil": "jump-pencil 1.5s ease-out infinite",
      line: "line 1.5s ease-out infinite",
    }
  },
  plugins: [],
}

