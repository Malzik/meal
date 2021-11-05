module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                indigo: {
                    200: '#F0F7FF'
                }
            }
        },
    },
    variants: {
        extend: {
        },
    },
    plugins: [],
}
