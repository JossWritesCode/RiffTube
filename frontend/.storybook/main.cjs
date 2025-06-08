module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  viteFinal: async config => {
    config.optimizeDeps ??= {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      '*.test.js',
      '*.test.jsx',
      '*.test.ts',
      '*.test.tsx',
    ];
    return config;
  },
  addons: ['@storybook/addon-essentials'],
  framework: { name: '@storybook/react-vite', options: {} },
};
