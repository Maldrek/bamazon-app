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

connection.connect(function (err, data) {
    if (err) throw err;
    welcome();
});

function welcome() {
    console.log("Welcome, Bamazon manager!");
    console.log("");
    managerChoices();
}

function managerChoices() {
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
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | " + data[i].department_name + " | $" + data[i].price + " | Stock: " + data[i].stock_quantity);
        }
        console.log("");
        anythingElse();
    });
}

function anythingElse() {
    inquirer.prompt([
        {
            type: "list",
            name: "goBack",
            message: "Is there anything else you would like to do?",
            choices: ["Yes", "No"]
        }
    ]).then(function (redo) {
        if (redo.goBack === "Yes") {
            managerChoices();
        } else {
            console.log("Thank you for your great management! Have a great day!");
            connection.end();
        }
    });
}

function lowInventory() {
    connection.query("SELECT * FROM bamazon_products", function (err, data) {
        if (err) throw err;
        console.log("");
        for (var i = 0; i < data.length; i++) {
            if (data[i].stock_quantity <= 5) {
                console.log(data[i].id + " | " + data[i].product_name + " | " + data[i].department_name + " | Inventory left: " + data[i].stock_quantity);
            }
        }
        console.log("");
        inquirer.prompt([
            {
                type: "list",
                name: "inventoryChoice",
                message: "Would you like to add more inventory anywhere?",
                choices: ["Yes", "No"]
            }
        ]).then(function (restock) {
            if (restock.inventoryChoice === "Yes") {
                addInventory();
            } else {
                anythingElse();
            }
        });
    })
}

// Function to add more stock to an item in the inventory with less than or equal to 5 stock
function addInventory() {
    connection.query("SELECT * FROM bamazon_products", function (err, data) {
        console.log("");
        inquirer.prompt([

            {
                type: "list",
                name: "addInventory",
                message: "\nWhich item would you like to add more of?\n",
                choices: function () {
                    var choiceArray = [];
                    for (i = 0; i < data.length; i++) {
                        if (data[i].stock_quantity <= 5) {
                            choiceArray.push(data[i].product_name);
                        }
                    }
                    return choiceArray;
                }
            },
            {
                type: "input",
                name: "addNumber",
                message: "\nHow many of this item would you like to add to the inventory?\n"
            }
        ]).then(function (answer) {
            var chosenItem;

            connection.query("SELECT * FROM bamazon_products", function (err, data) {
                if (err) throw err;

                // Loops through the database for the item with the product name the user has selected
                // and sets the variable chosenItem to that item
                for (var i = 0; i < data.length; i++) {
                    if (data[i].product_name === answer.addInventory) {
                        chosenItem = data[i];
                    }
                }

                // Updates the quantity of the manager's selected item within the database
                connection.query("UPDATE bamazon_products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: chosenItem.stock_quantity += parseInt(answer.addNumber)
                        },
                        {
                            product_name: chosenItem.product_name
                        }
                    ],

                    // Notifies the manager of how much total stock of their selected item we now have and calls anythingElse function
                    function (err, res) {
                        console.log("Thank you! We now have " + chosenItem.stock_quantity + " of item: " + answer.addInventory + "!");
                        console.log("");
                        anythingElse();
                    }
                );
            });
        });
    });
};

function newProduct() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemName",
            message: "What is the name of the item?"
        },
        {
            type: "input",
            name: "itemDepartment",
            message: "What department is this item sold in?"
        },
        {
            type: "input",
            name: "itemPrice",
            message: "What is the price of the item?"
        },
        {
            type: "input",
            name: "newItemQuantity",
            message: "How many of this item should we stock?"
        }
    ]).then(function (adding) {
        connection.query(
            "INSERT INTO bamazon_products SET ?",
            {
                product_name: adding.itemName,
                department_name: adding.itemDepartment,
                price: adding.itemPrice,
                stock_quantity: adding.newItemQuantity
            },
            function (err, res) {
                if (err) throw err;
                console.log("Thank you! You have added " + adding.newItemQuantity + " of item: " + adding.itemName + " in dept: " + adding.itemDepartment + " at price: $" + adding.itemPrice);
                anythingElse();
            }
        )
    });
}