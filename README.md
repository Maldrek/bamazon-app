# bamazon-app
This introductory project to SQL and node creates an Amazon-esque app on a small scale. Functions of the app include displaying a list of current stock and the properties related to them, and future updates will include managerial and departmental components to simulate an actual business model. 

# Summation

This app replicates an online store such as Amazon or Ebay in order to show the power of database use at a very simple level. Future updates will include a Manager and Regional application that allows for greater manipulation of the database and control over inventory and pricing including configuring overhead costs and managing "success" of various departments.

# Intro

To begin, the app welcomes you and gives you two options: One to see a list of all of the products offered for people new to Bamazon, and another to begin the shopping experience: 

![Alt text](Pictures/Screenshots/MySQL-HW/intro.png?raw=true "Intro")

# Product List

If the customer chooses to see a list of products, the app reaches into the created SQL database and retrieves a list of the products' ID numbers, names, departments, prices, and quantity available:

# Start Shopping

If the customer chooses to begin shopping instead, or decides to shop after seeing the product list, they are asked to enter a product ID number and the quantity of that item they would like to purchase:

# Below Stock Quantity

If the amount purchased is lower than the amount of the product that is available, the customer is given a thank you message with the price of the items chosen, and then are asked whether they would like to continue shopping: 

# Over Stock Quantity

If the amount purchased is greater than the amount of the product that is available, the customer is given the option to purchase a different amount, purchase a different product, or end their shopping experience: 


Choosing to choose a different product or amount resets their shopping experience: 

# Ending the Shopping Experience

If the user chooses to end their shopping experience after purchasing or if they ask for more than is available, they are given a thank you message and the app ends: 
