# Grocery List
An application where users can sign up and create grocery lists that they can share with family and friends.

## Getting Started
This app is hosted on Heroku and can be found [here] (https://raibola-grocerylist.herokuapp.com/).

### User Sign-Up
First time users should register by clicking the 'Sign Up' link in the navigation bar or clicking the Sign-up button on the landing page. Validation is used to make sure a valid email is entered for signing up.

Enter an email and password and click 'Sign-up' and registration is complete. You're now registered as a member of Grocery List and you can start creating your grocery list.

### View Grocery Lists
Click the 'List' link in the navigation bar to view a list of all grocery lists. This can only be accessed by a registered user.

### Add a product on a list
All signed-in users will be able to add a product on a grocery list with the option of editing, deleting and marking it as purchased. Validations are also added so that you can never add an empty product.

## Testing
Unit and integration tests are provided by Jasmine and can be found in the `spec` folder. 

## npm Packages/Dependencies:
For a full list of dependencies, visit the `package.json` file. Highlights include:

* PostgreSQL for modeling data in a relational database.
* Sequelize, a promise-based ORM, to handle tasks such as defining models, setting up associations between models, and generating migrations.
* Express for routing and handling middleware.
* EJS (Embedded JavaScript) is the templating engine which renders the client view. It uses JavaScript to generate HTML using simple syntax with fast compilation and rendering times.
* Passport for user authentication. Grocery List implements a stateful session-based authentication system using cookies.
* Bcrypt for encrypting user passwords.
* dotenv for storing environment variables and sensitive API keys.
