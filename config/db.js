module.exports = {
  url: process.env.DB_URI,
  logging: true,
  options: {
    host: '127.0.0.1',
    dialect: 'postgres',
    pool: {
      min: 0,
      max: 10,
      idle: 10000
    },
    define: {
      userscored: true,
      timestamps: false
    }
  }
};
