import { createConnection, Connection, ConnectionOptions } from 'mysql2';

var db_info: ConnectionOptions = {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '1'),
  user: 'root',
  password: process.env.DB_PW,
  database: 'react_node',
};

function init(): Connection {
  return createConnection(db_info);
}

function connect(conn: { connect: (arg0: (err: any) => void) => void }) {
  conn.connect(function (err) {
    if (err) console.error('mysql connection error : ' + err);
    else console.log('mysql is connected successfully!');
  });
}

export { init, connect };
