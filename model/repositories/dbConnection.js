async function connect() {
  //Confirma se está conectado com a variável Global
  if (global.connection && global.connection.state != "desconectado"){
    return global.connection;
}

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection("mysql://root:RoyoMarco230379@localhost:3306/syscalldb?");
  console.log("Conectou no MySql!!");
  global.connection = connection;
  return connection;
}

module.exports = { connect };
