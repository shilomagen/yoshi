module.exports = function(wallaby) {
  const wallabyCommon = require('./wallaby-common')(wallaby);
  // We need to add a wallaby compiler, because apparently wallaby doesn't
  // use the transform configuration of jest
  wallabyCommon.compilers = {
    '**/*.js{,x}': wallaby.compilers.babel({
      babel: require('@babel/core'),
      babelrc: true,
    }),
  };
  wallabyCommon.testFramework = 'jest';
  wallabyCommon.setup = () => {
    const jestConfig = require('yoshi/config/jest.config.js'); // eslint-disable-line import/no-unresolved
    wallaby.testFramework.configure(jestConfig);
    process.env.IN_WALLABY = true;
  };
  return wallabyCommon;
};
