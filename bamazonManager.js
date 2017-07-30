var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "74958316",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  managerStuff();
});

function managerStuff() {
  connection.query("SELECT * FROM products", function(err, res) {
    inquirer
      .prompt([
        {
          name: "options",
          type: "list",
          message: "Select an option",
          choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add New Product"
          ]
        }
      ])
      .then(function(answer) {
        if (answer.options === "View Products for Sale") {
          if (err) throw err;
          for (i = 0; i < res.length; i++) {
            console.log(
              "ID: " +
                res[i].item_id +
                " " +
                res[i].product_name +
                " $" +
                res[i].price +
                " department: " +
                res[i].department_name +
                " stock: " +
                res[i].stock_quantity
            );
          }
        } else if (answer.options === "View Low Inventory") {
          if (err) throw err;
          for (i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5) {
              console.log(
                "Low on stock: " +
                  res[i].product_name +
                  " stock: " +
                  res[i].stock_quantity
              );
            }
          }
        } else if (answer.options === "Add to Inventory") {
          for (i = 0; i < res.length; i++) {
            console.log(
              "ID: " +
                res[i].item_id +
                " Product: " +
                res[i].product_name +
                " stock: " +
                res[i].stock_quantity
            );
          }
          inquirer
            .prompt([
              {
                name: "item",
                type: "input",
                message:
                  "Please input the ID number for the item you would like to add to."
              },
              {
                name: "quantity",
                type: "input",
                message: "How much would you like to add?",
                validate: function(value) {
                  if (isNaN(value) === false) {
                    return true;
                  }
                  return false;
                }
              }
            ])
            .then(function(answer) {
              // continue here
              var chosenItem;

              for (i = 0; i < res.length; i++) {
                if (answer.item == res[i].item_id) {
                  chosenItem = res[i];
                }
              }
              var quantity =
                parseInt(chosenItem.stock_quantity) + parseInt(answer.quantity);
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
                function(err, res) {
                  console.log(res.affectedRows + " products updated!\n");
                }
              );
            });
        } else if (answer.options === "Add New Product") {
          inquirer
            .prompt([
              {
                name: "name",
                type: "input",
                message: "Please type the name of the product"
              },
              {
                name: "department",
                type: "input",
                message: "Please input the department"
              },
              {
                name: "price",
                type: "input",
                message: "Please input the price"
              },
              {
                name: "quantity",
                type: "input",
                message: "Please input the quantity"
              }
            ])
            .then(function(answer) {
              connection.query(
                "INSERT INTO products SET ?",
                {
                  product_name: answer.name,
                  department_name: answer.department,
                  price: answer.price,
                  stock_quantity: answer.quantity
                },
                function(err, res) {
                  console.log(res.affectedRows + " product inserted!\n");
                }
              );
            });
        }
      });
  });
}
