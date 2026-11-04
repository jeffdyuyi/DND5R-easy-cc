module.exports = {
  content: ['./index.html', './*.tsx', './components/**/*.{ts,tsx}', './contexts/**/*.{ts,tsx}', './hooks/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { dndRed: '#E0C38E', parchment: '#1B222C', parchmentDark: '#252F3D', slate: '#10141B' },
    fontFamily: Object.fromEntries(['serif','sans','mono','pixel'].map(key => [key, ['"Fusion Pixel"', 'monospace']]))
  } }, plugins: []
};
