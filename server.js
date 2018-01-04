var mysql = require('mysql');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var {
  graphql,
  buildSchema
} = require('graphql');

var connection = mysql.createConnection({
  host: 'den1.mysql5.gear.host',
  user: 'tootorstest1',
  password: 'Ry6NT-nq0s-A',
  database: 'tootorstest1'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  var sql = "SELECT * FROM student";
  connection.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result);
  });

});

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world!' };

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
