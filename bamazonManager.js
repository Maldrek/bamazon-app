// Require mySQL package and inquire package
let mysql = require("mysql");
let inquirer = require("inquirer");

let connection = mysql.createConnection({
    // Connect to host and port
    host: "localhost",
    port: 3306,

    // Using username in database
    user: "root",

    // Telling what password (if needed) and database to connect to
    password: "Magicman1684",
    database: "bamazon"
});

connection.connect(function(err, data) {
    if (err) throw err; 
    welcome();
});

function welcome() {
    console.log("Welcome, Bamazon manager!");
    console.log("");
    inquirer.prompt([
        {
            type: "list",
            name: "taskOne",
            message: "What would you like to do today?",
            choices: ["View Products", "View Low Inventory", "Add Inventory", "Add New Product"]
        }
    ]).then(function (choice) {
        let decision = choice.taskOne;
        if (decision === "View Products") {
            productView();
        } else if (decision === "View Low Inventory") {
            lowInventory();
        } else if (decision === "Add Inventory") {
            addInventory();
        } else if (decision === "Add New Product") {
            newProduct();
        }
     })
}

function productView() {
    connection.query("SELECT * FROM bamazon_products", function (err, data) {
        if (err) throw err;
        console.log("");
        for (var i = 0; i  < data.length; i++) {
            console.log (data[i].id + " | " + data[i].product_name + " | " + data[i].department_name + " | " + data[i].department_id + " | $" + data[i].price  + " | " + data[i].stock_quantity);    
        }
    });
}
