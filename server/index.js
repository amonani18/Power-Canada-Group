const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require("./model/Employee")

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://powercan:powercan@power-cananda.9d84td9.mongodb.net/Power-Can?retryWrites=true&w=majority&appName=Power-Cananda");

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    EmployeeModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post("/register", (req, res) => {
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})

app.get("/users", (req, res) => {
    EmployeeModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(500).json(err));
});

// Update a user
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    EmployeeModel.findByIdAndUpdate(id, { name, email }, { new: true })
    .then(updatedUser => res.json(updatedUser))
    .catch(err => res.status(500).json({ message: "Error updating user", error: err }));
});


app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    EmployeeModel.findByIdAndDelete(id)
    .then(() => {
        console.log("User with ID " + id + " deleted successfully");
        res.json({ message: "User deleted successfully" });
    })
    .catch(err => {
        console.error("Error deleting user:", err);
        res.status(500).json({ message: "Error deleting user", error: err });
    });
});



app.listen(3001, () => {
    console.log("server is running")
})