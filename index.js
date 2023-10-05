import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var weekdayNames = ["Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"];
var monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"];

var date="";
const currentDate = new Date();
var todoList = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    const today = new Date();
    date = weekdayNames[today.getDay()] + ", " + monthNames[today.getMonth()] + " " + today.getDate();

    // Render the EJS template with the to-do list data
    res.render("index.ejs", {
        title: date,
        todoList: todoList, // Pass the to-do list array to the template
        monthAndDay: `${monthNames[today.getMonth()]} ${today.getDate()}`,
    });
});

app.post("/", (req, res) => {
    const newItem = req.body.newItem;

    // Add the new to-do item to the to-do list array
    todoList.push(newItem);

    // Redirect back to the root URL after adding the item
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Site is running on port: ${port}`);
})