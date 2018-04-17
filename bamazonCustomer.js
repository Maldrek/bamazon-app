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

// Checking connection to mySQL and then initializing Node.js and beginning function
connection.connect(function (err) {
    if (err) throw (err);
    console.log("connected as: " + connection.threadID);
    welcome();
});

// Welcome function with inquirer to begin "shopping" experience
function welcome() {
    inquirer.prompt([
        {
            type: "list",
            name: "welcome",
            message: "Welcome to bamazon! How would you like to begin? \n(If you don't know product ID #'s, select the first option)",
            choices: ["See a list of products", "Begin shopping"]
        }
    ]).then(function (firstChoice) {

        // If the user chooses the first option, then go to productList function
        if (firstChoice.welcome === "See a list of products") {
            productList();

        // If the user chooses the second option, then go to promptCustomer function
        } else {
            promptCustomer();
        }
    })
}

// Function that displays list of products from SQL database
function productList() {
    connection.query("SELECT * FROM bamazon_products", function (err, data) {
        if (err) throw (err);
        console.log("Below is a list of our current products! \n");
        
        // Loops through database and prints out list of information for each item included, then calls keepShopping function
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].id + " | " + data[i].product_name + " | " + data[i].department_name + " | $" + data[i].price + " | In-Stock: " + data[i].stock_quantity);
        }
        console.log("");
        keepShopping();
    });
}

// Function that initializes the actual shopping based on a yes or no choice
function keepShopping() {
    inquirer.prompt([
        {
            type: "list",
            name: "keepShopping",
            message: "Are you ready to begin shopping?",
            choices: ["Yes", "No"]
        }
    ]).then(function (keepGoing) {

        // If user chooses 'Yes', then callse promptCustomer function
        if (keepGoing.keepShopping === "Yes") {
            promptCustomer();

        // If user chooses 'No', then thanks the user and ends the connection
        } else {
            console.log("Thank you for visiting Bamazon today!");
            connection.end();
        }
    })
}

// Allows the user to choose the item they would like to purchase as well as the amount they would like to purchase
function promptCustomer() {
    connection.query("SELECT * FROM bamazon_products", function (err, data) {
        if (err) throw (err);
        inquirer.prompt([
            {
                type: "input",
                name: "products",
                message: "What item would you like to purchase? (choose by ID #)",
            },
            {
                type: "input",
                name: "quantity",
                message: "How many would you like to purchase?"
            }
        ]).then(function (answer) {

            // Sets the answers equal to integers so they can be compared to the database output
            let quantity = parseInt(answer.quantity);
            let productChosen = parseInt(answer.products);

            // Connects to SQL Database
            connection.query('SELECT * FROM bamazon_products', function (err, products) {
                if (err) throw err;

                // Loops through the data to check that the quanitity asked for is available, and that the ID specified 
                // matches the ID number of the product in the database
                for (let i = 0; i < products.length; i++) {
                    if (quantity <= products[i].stock_quantity && productChosen === products[i].id) {

                        // Updates the Database to show the subtracted quantity from the original
                        connection.query(
                            "UPDATE bamazon_products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: (products[i].stock_quantity - quantity)
                                },
                                {
                                    id: products[i].id
                                }
                            ],
                            function (err, updateResults) {
                                if (err) throw err;

                                // Thanks the user for their purchase, shows them the amount of their purchase, and then calls the keepGoing function
                                console.log("Thank you for purchasing " + quantity + " of item: " + products[i].product_name + ", for a total of $" + (products[i].price * quantity) + "!");
                                keepGoing();
                            }
                        )

                    // If the quantity asked for is greater than the amount available, give the user multiple options of how to proceed with their shopping
                    } else if (quantity > data[i].stock_quantity && productChosen === data[i].id) {
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "tooMany",
                                message: "I'm sorry, we don't currently have enough in stock to fill your order. How would you like to proceed?",
                                choices: ["Purchase a different quantity", "Purchase a different product", "Stop shopping"]
                            }
                        ]).then(function (overQuantity) {

                            // If the user chooses to purchase a different amount or different item, calls promptCustomer function to 'reset'
                            if (overQuantity.tooMany === "Purchase a different quantity" || overQuantity.tooMany === "Purchase a different product") {
                                promptCustomer();
                            
                            // If the user chooses to end their shopping experience, then ends the connection and thanks them for visiting
                            } else {
                                console.log("Thank you for visiting Bamazon! Have a wonderful day!");
                                connection.end();
                            }
                        });
                    }
                }
            });
        });
    });
}

// Asks the user if they want to continue shopping after making a successful purchase
function keepGoing() {
    inquirer.prompt([
        {
            type: "list",
            name: "shopping",
            message: "Would you like to continue shopping?",
            choices: ["Yes", "No"]
        }

    // If the user chooses 'Yes', then resets shopping experience with promptCustomer function
    ]).then(function (goOn) {
        if (goOn.shopping === "Yes") {
            promptCustomer();

        // If the user chooses 'No', thanks them for visiting and ends the app
        } else {
            console.log("Thank you for visiting Bamazon! Have a wonderful day!");
        }
    });
}