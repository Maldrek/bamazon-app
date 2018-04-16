# Bamazon Storefront Application
This introductory project to SQL and node creates an Amazon-esque app on a small scale. Functions of the app include displaying a list of current stock and the properties related to them, and future updates will include managerial and departmental components to simulate an actual business model. 

# Summation

This app replicates an online store such as Amazon or Ebay in order to show the power of database use at a very simple level. Future updates will include a Manager and Regional application that allows for greater manipulation of the database and control over inventory and pricing including configuring overhead costs and managing "success" of various departments.Lan

<h3>Languages Used</h3>

This application uses JavaScript (Node.js) and mySQl as its database.

# Intro

To begin, the app welcomes you and gives you two options: One to see a list of all of the products offered for people new to Bamazon, and another to begin the shopping experience: 

![Intro to Bamazon App](images/intro.png?raw=true "Intro to Bamazon App")

# Product List

If the customer chooses to see a list of products, the app reaches into the created SQL database and retrieves a list of the products' ID numbers, names, departments, prices, and quantity available:

![SQL Product List](images/product_list.png?raw=true "SQL Product List")

# Start Shopping

If the customer chooses to begin shopping instead, or decides to shop after seeing the product list, they are asked to enter a product ID number and the quantity of that item they would like to purchase:

![Beginning of Shopping Experience](images/start_shopping.png?raw=true "Beginning of Shopping Experience")

# Below Stock Quantity

If the amount purchased is lower than the amount of the product that is available, the customer is given a thank you message with the price of the items chosen, and then are asked whether they would like to continue shopping: 

![After Purchase Options](images/after_purchase.png?raw=true "After Purchase Options")

# Over Stock Quantity

If the amount purchased is greater than the amount of the product that is available, the customer is given the option to purchase a different amount, purchase a different product, or end their shopping experience: 

![Over Quantity Response](images/over_quantity.png?raw=true "Over Quantity Response")

Choosing to choose a different product or amount resets their shopping experience: 

![Shopping Reset](images/if_new_choice.png?raw=true "Shopping Reset")

# Ending the Shopping Experience

If the user chooses to end their shopping experience after purchasing or if they ask for more than is available, they are given a thank you message and the app ends: 

![End Shopping Image](images/stop_shopping.png?raw=true "End Shopping Image")
