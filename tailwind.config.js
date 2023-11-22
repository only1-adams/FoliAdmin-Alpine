/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}", "./public/**/*"],
	theme: {
		extend: {
			colors: {
				primary: "#92faf4",
				secondary: {
					DEFAULT: "#06423d",
					40: "rgba(6, 66, 61, 0.4)",
					80: "rgba(6, 66, 61, 0.8)",
				},
				accent: "#298c84",
				accent2: "#4adad2",
			},
			fontFamily: {
				custom: ["Poppins"],
			},
		},
	},
	plugins: [],
};
