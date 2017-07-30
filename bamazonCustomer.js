var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "74958316",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  selectAllProducts();
});

function selectAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (i = 0; i < res.length; i++) {
      console.log(
        "ID: " +
          res[i].item_id +
          " " +
          res[i].product_name +
          " $" +
          res[i].price
      );
    }
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message:
            "Please input the ID number for the item you would like to buy."
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        }
      ])
      .then(function(answer) {
        var chosenItem;
        for (i = 0; i < res.length; i++) {
          if (answer.item == res[i].item_id) {
            chosenItem = res[i];
          }
        }

        if (chosenItem.stock_quantity >= answer.quantity) {
          var quantity = parseInt(chosenItem.stock_quantity) - parseInt(answer.quantity);

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: quantity
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw error;
              console.log(
                "your total is $" + chosenItem.price * answer.quantity
              );
              inquirer
                .prompt([
                  {
                    name: "continue",
                    type: "list",
                    message: "Continue shopping?",
                    choices: ["yes", "no"]
                  }
                ])
                .then(function(answer) {
                  if (answer.continue == "yes") {
                    selectAllProducts();
                  } else {
                    console.log("Thank you for shopping at Bamazon!");
                  }
                });
            }
          );
        } else {
          console.log("Insufficient quantity!");
          inquirer
            .prompt([
              {
                name: "continue",
                type: "list",
                message: "Continue shopping?",
                choices: ["yes", "no"]
              }
            ])
            .then(function(answer) {
              if (answer.continue == "yes") {
                selectAllProducts();
              } else {
                console.log("Thank you for shopping at Bamazon!");
              }
            });
        }
      });
  });
};
