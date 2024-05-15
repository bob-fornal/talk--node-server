const env = process.env.NODE_ENV || 'development';

const environments = {
  default: {
    env
  },
  development: {
    PORT: 3000,
  },
};

const config = {
  ...environments.default,
  ...environments[env],
};

module.exports = config;