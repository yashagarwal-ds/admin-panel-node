const employeeSchema = require("../models/employeeModel");
const bcrypt = require ('bcrypt');

const createEmployee = async(req, res) => {
    const {name, email, mobile, password, cpassword} = req.body;

    console.log(req.file);

    if(!name || !email || !mobile || !password || !cpassword) {
        return res.status(400).json({msg : "Please fill the details properly"});
    }

    try{
        let employee = await employeeSchema.findOne({email : email});

        if(employee){
            return res.status(403).json({msg : "User is already exists"});
        }

        const newPassword = await bcrypt.hash(password, 10);
        const newCpassword = await bcrypt.hash(cpassword, 10);

        if(password !== cpassword){
            return res.status(400).json({msg : "Password doesn't match"});
        }

        employee = new employeeSchema({
            name : name,
            email : email,
            mobile : mobile,
            password : newPassword,
            cpassword : newCpassword,
            image : req.file.filename,
            is_admin : 0
        })
        
        const employeeData = await employee.save();

        if(employeeData){
            res.render("/")
        }else{
            res.render("register")

        }

        res.status(200).json({employee : employee, isSuccess : true});
    }catch(error){
        res.status(400).json({msg : error.message})
    }
};

const loadLogin = async(req, res) => {
    try{
        res.render("login");
    }catch(error){
        res.status(400).json({msg : error.message})
    }
};

const loginEmployee = async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({msg : "Please fill the details properly"});
    }

    try{
        const employee = await employeeSchema.findOne({email : email});

        console.log(employee);

        if(!employee){
            return res.status(404).json({msg : "Please Enter a valid mail id"});
        }

        const isMatch = await bcrypt.compare(password, employee.password);

        if(!isMatch){
            return res.status(400).json({msg : "Please Enter valid password"});
        }

        res.status(200).json({employee : employee, isSuccess : true});

    }catch(error){
        res.status(400).json({msg : error.message});
    }
}

module.exports = {createEmployee, loadLogin, loginEmployee};