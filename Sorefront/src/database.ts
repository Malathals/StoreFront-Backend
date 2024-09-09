const dotenv = require('dotenv');
import {Pool} from 'pg'


dotenv.config();

const{
    HOST, DB_NAME, USER, PASSWORD
} = process.env


const pool= new Pool({
    host: HOST,
    database: DB_NAME,
    user: USER,
    password: PASSWORD,
    ssl: {
        rejectUnauthorized: false, // Allows self-signed certificates
      },
})

pool.connect()
  .then(client => {
    console.log('Connection has been established successfully.');
    client.release(); 
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


export default pool;