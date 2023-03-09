
const sql = require('mssql')
const sqlConfig = {
  user:'sa',
  password:'A+1197!',
  database: 'NebimV3Burkay',
  server: '185.254.94.168',
  port: 1435,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

async function queryDatabase(query) {
  try {
    console.log("sql connecting......")
    let pool = await sql.connect(sqlConfig)
    let result = await pool.request()
      .query(query)  // subject is my database table name
    return result

  } catch (err) {
    console.log(err);
  }
}

module.exports = { queryDatabase }