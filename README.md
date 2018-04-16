# Bamazon Storefront Application
This introductory project to SQL and node creates an Amazon-esque app on a small scale. Functions of the app include displaying a list of current stock and the properties related to them, and future updates will include managerial and departmental components to simulate an actual business model. 

<h2>Summation</h2>

This app replicates an online store such as Amazon or Ebay in order to show the power of database use at a very simple level. Future updates will include a Manager and Regional application that allows for greater manipulation of the database and control over inventory and pricing including configuring overhead costs and managing "success" of various departments.Lan

<h2>Languages Used</h2>

This application uses JavaScript (Node.js) and mySQl as its database.

<h2>Setup in SQL</h2>

![SQL Setup](images/SQL_setup.PNG)

<h2>Intro</h2>

To begin, the app welcomes you and gives you two options: One to see a list of all of the products offered for people new to Bamazon, and another to begin the shopping experience: 

![Intro to Bamazon App](images/Intro.PNG)

<h2>Product List</h2>

If the customer chooses to see a list of products, the app reaches into the created SQL database and retrieves a list of the products' ID numbers, names, departments, prices, and quantity available:

![SQL Product List](images/product_list.PNG)

<h2>Start Shopping</h2>

If the customer chooses to begin shopping instead, or decides to shop after seeing the product list, they are asked to enter a product ID number and the quantity of that item they would like to purchase:

![Beginning of Shopping Experience](images/start_shopping.PNG)

<h2>Within Stock Quantity</h2>

If the amount purchased is lower than the amount of the product that is available, the customer is given a thank you message with the price of the items chosen, and then are asked whether they would like to continue shopping: 

![After Purchase Options](images/after_purchase.PNG)

<h2>Over Stock Quantity</h2>

If the amount purchased is greater than the amount of the product that is available, the customer is given the option to purchase a different amount, purchase a different product, or end their shopping experience: 

![Over Quantity Response](images/over_quantity.PNG)

Choosing to choose a different product or amount resets their shopping experience: 

![Shopping Reset](images/if_new_choice.PNG)

<h2>Ending the Shopping Experience</h2>

If the user chooses to end their shopping experience after purchasing or if they ask for more than is available, they are given a thank you message and the app ends: 

![End Shopping Image](images/stop_shopping.PNG)
