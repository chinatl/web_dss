var config = {
  basename: '/dss',
  apiPrefix: process.env.NODE_ENV === 'development' ? '/api/': '/api/',
};

module.exports = config;
