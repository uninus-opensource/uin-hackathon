/* eslint-disable */
export default {
  displayName: 'web-component-organisms',
  preset: '../../../../jest.preset.js',
  coverageDirectory: '../../../../coverage/libs/web/components/organisms',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};
