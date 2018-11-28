//sequelize setup
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/my_db')

//models
const User = conn.define('user', {
  name : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : true,
    validate : {
      notEmpty : true
    }
  },
  password : {
    type : Sequelize.STRING,
    allowNull : false,
    unique : true,
    validate : {
      notEmpty : true
    }
  },
  googleId : {
    type : Sequelize.STRING
  },
  accessToken : {
    type : Sequelize.STRING
  }
});

//seed data
const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        User.create({ name: 'moe', password: 'MOE' }),
        User.create({ name: 'larry', password: 'LARRY' }),
        User.create({ name: 'curly', password: 'CURLY' }),
      ]);
    });
};

module.exports = {
  User,
  syncAndSeed
};
