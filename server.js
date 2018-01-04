var mysql = require('mysql');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  graphql,
  buildSchema
} = require('graphql');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('tootorstest1', 'tootorstest1', 'Ry6NT-nq0s-A', {
  host: 'den1.mysql5.gear.host',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: false
});


sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const Student = sequelize.define('student', {
  name: {
    type: Sequelize.STRING
  },
  alias: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.STRING
  },
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

Student.findAll().then(users => {
  console.log(users)
})






var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = {
  hello: () => 'Hello world!'
};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
