const connection = require('../config/mainDB.js');
const tableName  = "UserData";

class UserDataManager{
    constructor(){
        connection.query("CREATE TABLE IF NOT EXISTS UserData (`name` TEXT NOT NULL , `email` VARCHAR(200) NOT NULL , `password` TEXT NOT NULL , `andress` TEXT NULL , `phonenumber` TEXT NULL , PRIMARY KEY (`email`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci", (err, result) => {
            if(err) return console.log(err);

            console.log(result);
        })
    }

    checkUser(email, password, fn){
        connection.query("SELECT * FROM UserData WHERE email = ?", [email], (err, result, field) => {
            if(err){
                console.log(err);
                return fn("err");
            }else if(result.length < 0) {
                return fn("email_c");
            } 
            
            if(password === result[0].password) {
                return fn(result[0]);
            }else{
                return fn("password_c");
            }
        })
    }

    getUserInformation(email, fn){
        connection.query("SELECT * FROM "+tableName+" WHERE email = ?", [email], (err, result) => {
            if(err){
                console.log(err);
                return fn('err');
            }

            fn(result[0]);
        })
    }

    newUser(name, email, password, fn){
        connection.query("INSERT INTO "+tableName+" SET ?", {name: name, email: email, password: password} , (err, result, field) => {
            if(err) {
                console.log(err);
                return fn(false);
            }

            console.log(result);
            console.log(field);
            return fn(true);
        });
    }

    updateUserInfo(email, name, andress, phonenumber, fn){
        connection.query("UPDATE "+tableName+" SET name = ?, andress = ?, phonenumber = ? WHERE email = ?", [name, andress, phonenumber, email], (err) => {
            if(err) {
                console.log(err);
                return fn("err");
            }

            return fn("Success");
        })
    }

    changePasswordUser(email, newPassword, fn){
        connection.query("UPDATE "+tableName+" SET password = ? WHERE email = ?", [newPassword, email
        ], (err, result) => {
            if(err) {
                console.log(err);
                return fn("err");
            }

            return fn("Success");
        })
    }
    
    dropTable(fn){
        connection.query("DROP TABLE "+tableName+"", err => {
            if(err) {
                console.log(err);
                return fn("error");
            }

            fn("Drop table succsess!");
        })
    }
}

module.exports = new UserDataManager();