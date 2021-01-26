
const mySQL = require("mysql");

const connection = mySQL.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "password",
    database: "employeetracker_db",
});

module.exports = {
    addTo: function(table,data) {
        let keys = Object.keys(data).join()
        let values = Object.values(data)
        values = "'" + values.join("', '") + "'";
        var query = `INSERT INTO ${table} (${keys}) VALUES (${values})`
        console.log(query)
        connection.query(`INSERT INTO ${table} (${keys}) VALUES (${values})`, (err, result) => {
            if (err) throw err;
            console.log(`Record added to ${table}.`)
            this.viewData(table)
        })
    },
    viewData: function (table) {
        connection.query(`SELECT * FROM ${table}`, function(err, result) {
            if (err) throw err;
            console.table(result)
            console.log("Press a key to continue")
            return
        })
    },
    selectData: async function(table, column_name) {
        let promise = new Promise(function(resolve, reject) {
            connection.query(`SELECT ${column_name} FROM ${table}`, function(err, result) {
                if (err) throw err;
                console.table(result)
                resolve(result)
            })
        });
        return promise   
    },
    deleteFrom: function (table,data){
        let keys = Object.keys(data).join()
        let values = Object.values(data)
        values = "'" + values.join("', '") + "'";
        console.log(values)
        connection.query(`DELETE FROM ${table} WHERE (${keys}) = (${values})`, (err, result) => {
            console.log("after query")
            if (err) throw err;
            console.log(`Record removed from ${table}.`)
            this.viewData(table)
        })
    },
    updateData: function (table,data) {
        let keys = Object.keys(data).join()
        let values = Object.values(data)
        values = "'" + values.join("', '") + "'";
        connection.query(`UPDATE ${table} SET (${key}) = (${value})`, (err, result) => {
            if (err) throw err;
            console.log(`${table} record updated.`)
            this.viewData(table)
        })
    },
    // totalBudget: function() {
    //     connection.query( `SELECT SUM(salary) AS TotalBudget FROM employeetracker_db;`)
    // }
}
