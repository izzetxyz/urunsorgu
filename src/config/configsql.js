
const sql = require('mssql')


async function queryDatabase(query,sqlConfig) {
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