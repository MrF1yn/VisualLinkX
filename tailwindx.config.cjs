/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	plugins: [],

	darkMode: 'class',

	theme: {
		extend: {
			colors: {
				// flowbite-svelte
				primary: {
					0: '#0B5351',
				},
				palette: {
					0: '#0d0302',
					1: '#252123',
					2: '#fcfdfe',
					3: '#d6b389',
					4: '#d6b389',
					5: '#71d522',
					6: '#857899',

				},
				palette1: {
					0: '#0f1c25',
					1: '#0a0000',
					2: '#fffffb',
					3: '#d7d3da',
					4: '#f0af48',
					5: '#cd4420',

				}
			}
		}
	}
};

module.exports = config;