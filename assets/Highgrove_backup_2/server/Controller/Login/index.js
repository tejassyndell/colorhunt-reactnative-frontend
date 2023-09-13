/* eslint-disable */

const mysql = require('mysql')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cache = require('../../node-cache/cache');

require('dotenv').config();
const url = 'http://localhost:3000'
// const url = 'http://192.168.2.199:3000'
// const url = 'https://highgrove.sincprojects.com'
// const url = 'https://highgrove-two.sincprojects.com/'


const CryptoJS = require("crypto-js");
const fetch = require("node-fetch");

const AuthMail = process.env.email;
const Authpass = process.env.password;
const JWT_secret = '5ea4ba0fe6803e201c321c02f09fe9c8bb451cdfce398dec0c36e3643c586e6d'
 

//connect sql
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'highgrove',
    timezone: 'Europe/London',
  // host: '192.145.239.212',
  // user: 'sincpr5_sincpr5',
  // password: 'asdfghjklasdfghjklasdfghjkl',
  // database: 'sincpr5_highgrove',
  })





exports.customersData = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM customers', (err, result) => {
      connection.release()
      if (!err) {
        res.status(203).json(result)
      } else {
        console.log(err)
        res.status(400).send(err)
      }
    })
  })
}




exports.UpdateProductsData =  async (req, res) => {
  const accessTokendata = await cache.get('data');

  console.log('Update product')

  //WORKED
    fetch('https://api.columbus.sage.com/uk/sage200extra/accounts/v1/products', {
      headers: {
        'ocp-apim-subscription-key': process.env.subscriptionKey,
        'Authorization': 'Bearer ' + accessTokendata.accessToken,
        'Content-Type': 'application/json',
        'X-Site': process.env.site,
        'X-Company': process.env.company,
        }
      })
      .then(response => response.json())
      .then(data => {        
        {
          pool.getConnection((err, connection) => {
            data.forEach(record => {
              const name = record.name.replace(/"/g, "''"); // escape any single quotes in the name
              const sql = `INSERT INTO products (code, name) VALUES ("${record.code}", "${name}")`;
              connection.query(sql, (error, results, fields) => {
                if (error) throw error;
              });
            });
          })
        }
      })
      .catch(error => console.error(error));
  
  }

exports.updateCustomersData =  async (req, res) => {
  // req.session.myData = 'Hello, Session!';
  // res.send('Session data set!');
  const accessTokendata = await cache.get('data');

//WORKED
  // fetch('https://api.columbus.sage.com/uk/sage200extra/accounts/v1/sites', {
  //   headers: {
  //     'ocp-apim-subscription-key': '1dd5ff1912ca43e6b0ce97992884db24',
  //     'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik56TXdPVVJHTVVZNU5ERXpRelJHUVVNMVF6azJSa1U1UVRJMU0wRTROemhGUmpWQ04wSTNOQSJ9.eyJpc3MiOiJodHRwczovL2lkLnNhZ2UuY29tLyIsInN1YiI6ImF1dGgwfDU3MzE4NmZiMzQ4MjFhNTRiNTE0OTFiYjY1NDgwYjhkNjJkNjlhNjczNWQyYzBiNiIsImF1ZCI6InMyMDB1a2lwZC9zYWdlMjAwIiwiaWF0IjoxNjgyNjYzNzc4LCJleHAiOjE2ODI2OTI1NzgsImF6cCI6IkU0U1hLOFFCMFg3MHAwZzlnMm1VZDNMc2d3Zm5zWm13In0.FTrWPGHa-4QD32ADGj45RB7i51DwmtDs3mWbAgGAJjV2z9dUlV79TE8HpCBBzcpWnS_wNUZuunz4xJZnSDodESJDDu7Cp288UcOmRuZsCuBr1NJiGUjlFPPHVl7own5udMXfOv6m50T9eOtlSmIyvyoVGM0YP-fGieYyLIpBFftcATx9YHAUALzrUI11_yBZztTy-hZlXZzqTX7xQ1f1KI0BNApneG-5XnKcZRCS5MTs6b_0ZrhieD86F-nrz4cOharg1krgupJ0_MK2IxiOIasaFDyzNQvAuS3xu9IjNubVICUPnJnKuVk3UmdokjHyLlupwLJymT8SI1xq7Pp4PQ',
  //     'Content-Type': 'application/json',
      
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(data => console.log('res', data))
  //   .catch(error => console.error(error));


  var cdata = [];

  fetch('https://api.columbus.sage.com/uk/sage200extra/accounts/v1/customer_views?$orderby=id asc&$top=5000', {
    headers: {
      'ocp-apim-subscription-key': process.env.subscriptionKey,
      // 'Authorization': 'Bearer ' + process.env.authorization,
      'Authorization': 'Bearer ' + accessTokendata.accessToken,
      'Content-Type': 'application/json',
      'X-Site': process.env.site,
      'X-Company': process.env.company,
      }
    })
    .then(response => response.json())
    .then(data =>  {
      pool.getConnection((err, connection) => {
        data.forEach(record => {
          const sql = `INSERT INTO customers (id, reference, name, short_name, balance, on_hold, account_status_type, telephone_subscriber_number, credit_limit, account_status, agent) VALUES (${record.id},"${record.reference}","${record.name}", "${record.short_name}","${record.balance}","${record.account_is_on_hold}","${record.account_status_type}","${record.telephone_subscriber_number}","${record.credit_limit}","${record.account_status_type_id}", "${record.analysis_code_1}")`;
          connection.query(sql, (error, results, fields) => {
            if (error) throw error;
          });
        });
      })
    })
    .catch(error => console.error(error));
}


//login auth new by sarans
exports.loginAuth = async (req, res) => {
  const username = req.body.email
  const password = req.body.password
  console.log('input Password',password)

  const bcrypt = require('bcrypt');
  const saltRounds = 10; 
  const key = "my secret key";

  try{
    pool.getConnection((err, connection) => {
      connection.query("select * from `users` where `email`= ? ", [username],(err, result)=>{
        connection.release()
        console.log('result',result)

        if(result != ''){
          console.log('Found')
          // res.send(result);

          // Decryption
          const dbPassword = result[0].password;
          const bytes = CryptoJS.AES.decrypt(dbPassword, key);
          const DecryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
          console.log("Decrypted message:", DecryptedPassword);

          if(password==DecryptedPassword){
            connection.query('SELECT * FROM users WHERE email = ?', [username], (err, data)=>{
              console.log('data',data)
              res.send(data);
            })
          }
          else{
            res.send("wrong password")
          }
          // res.send(result);
        }
        else{
          console.log('Not Found')
          res.send("Not Exist");
        }
      })
    })
  }
  catch(err){
    console.log('err')
  }
  

}

//  ------------------user api ---------------------

//get user details
exports.allUser = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    // connection.query('SELECT * FROM users', (err, result) => {
      connection.query('SELECT id,role_id, first_name, last_name, username, email FROM users', (err, result) => {
      connection.release()

      if (!err) {
        res.status(203).json(result)
        console.log('The data from users table are: \n')
      } else {
        console.log(err)
        // res.status(400).send(err)
      }
    })
  })
}

//to get userDetais
// exports.GetUserDetails = async (req, res) => {

//   const Userid = req.params.ID
//   pool.getConnection((err, connection) => {
//     if (err) throw err
//     connection.query(`SELECT * FROM users WHERE id = ${Userid}`, (err, result) => {
//       connection.release()
//       console.log('GetUserDetails', result)
//       if (!err) {
//         res.status(203).json(result)
//         console.log('user deleted succesfully')
//       } else {
//         console.log(err)
//         res.status(400).send(err)
//       }
//     })
//   })
// }

//to get userDetais
exports.GetUserDetails = async (req, res) => {
  const Userid = req.params.ID;
  
  pool.getConnection((err, connection) => {
    if (err) throw err;
    
    connection.query(`SELECT * FROM users WHERE id = ${Userid}`, (err, result) => {
      connection.release();
      
      if (err) {
        console.log(err);
        res.status(201).send(err);
        return;
      }
      
      const dbpassword = result[0].password;
      const key = "my secret key";
      
      
        try {
          const dbPassword = result[0].password;
          const bytes = CryptoJS.AES.decrypt(dbPassword, key);
          const DecryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
          console.log("Decrypted message:", DecryptedPassword);

          res.send(JSON.stringify({
            id: result[0].id,
            role_id: result[0].role_id,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            username: result[0].username,
            email: result[0].email,
            // password: result[0].password,
            password: DecryptedPassword,
            contact_no: result[0].contact_no,
            address: result[0].address
          }));  
        } catch (error) {
          console.error("Decryption error:", error);
        } 
     
    });
  });
};



// //to update user details
// exports.UpdateUserdetais = async (req, res) => {
//   const Userid = req.body.id
//   pool.getConnection((err, connection) => {
//     if (err) throw err
//     connection.query('UPDATE users SET ? WHERE id = ?', [req.body, Userid], (err, result) => {
//       connection.release()
//       if (!err) {
//         res.status(203).json(result)
//         console.log('user updated succesfully')
//       } else {
//         console.log(err)
//         res.status(400).send(err)
//       }
//     })
//   })
// }

//to update user details
exports.UpdateUserdetais = async (req, res) => {
  const Userid = req.body.id
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(req.body)

    const key = "my secret key";
    const password = req.body.password
    console.log('*****password*****',password)

    // Encryption
    const EncryptedPassword = CryptoJS.AES.encrypt(password, key).toString();
    console.log("Encrypted message:", EncryptedPassword);

    connection.query('UPDATE `users` SET `role_id`=?,`first_name`=?,`last_name`=?,`username`=?,`email`=?,`password`=? WHERE id = ?', 
      [req.body.role_id, req.body.first_name, req.body.last_name, req.body.username, req.body.email, EncryptedPassword, Userid], (err, result)=>{
          if (!err) {
            res.status(200).json(result)
            console.log('user updated succesfully')
          } else {
            console.log(err)
            res.status(201).send(err)
          }
      } )
    
  })
}

//register user
exports.registerUser = async (req, res) => {
  console.log('Inserte data', req.body);
  
  // pool.getConnection((err, connection) => {
  //   if (err) throw err
  //   const saltRounds = 10;
  //   const plainPassword = req.body.password;
  //   bcrypt.hash(plainPassword, saltRounds, function(err, hash) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       connection.query('INSERT INTO `users`(`role_id`,`first_name`, `last_name`, `username`, `email`, `password`) VALUES (?,?,?,?,?,?)', [req.body.role_id, req.body.first_name, req.body.last_name, req.body.username, req.body.email, hash], (err, result) => {
  //         connection.release()
  //         console.log(result)
  //         if (!err) {
  //           res.status(202).json('registered')
  //         } else {
  //           console.log(err)
  //           res.status(201).json(err.sqlMessage)
  //         }
  //       })
  //     }
  //   });
  // });

   pool.getConnection((err, connection) => {
    if (err) throw err
      const key = "my secret key"; // Replace this with your secret key
      const encryptedPassword = CryptoJS.AES.encrypt(req.body.password, key).toString();
      // Use the encryptedPassword in your database query or wherever you need it
      try {
        connection.query('INSERT INTO `users`(`role_id`,`first_name`, `last_name`, `username`, `email`, `password`) VALUES (?,?,?,?,?,?)', [req.body.role_id, req.body.first_name, req.body.last_name, req.body.username, req.body.email, encryptedPassword], (err, result) => {
          connection.release();
          console.log(result);
          if (!err) {
            res.status(200).json('registered');
          } else {
            console.log(err);
            res.status(201).json(err.sqlMessage);
          }
        })
      } catch (error) {
        res.status(201).json(error);
        
      }
    // // connection.query('INSERT INTO users SET ?', [req.body], (err, result) => {
    //   connection.query('INSERT INTO `users`(`role_id`,`first_name`, `last_name`, `username`, `email`, `password`, `contact_no`, `address`) VALUES (?,?,?,?,?,?,?,?)',[req.body.role_id, req.body.first_name, req.body.last_name, req.body.username, req.body.email, hash, req.body.contact_no, req.body.address], (err, result) => {
    //   connection.release()
    //   console.log(result)
    //   if (!err) {
    //     res.status(202).json('registered')
    //     // console.log('The data from users table are: \n', result)
    //   } else {
    //     console.log(err)
    //     res.status(400).json(err.sqlMessage)
    //   }
    // })
})
}

//to delete user by id
exports.userDelete = async (req, res) => {
  const userid = req.params.id
  // console.log(id)
  // res.send(id + "test")
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('DELETE from users WHERE id = ?', [userid], (err, result) => {
      connection.release()

      if (!err) {
        res.json('deleted')
        // console.log('The data from users table are: \n', result)
      } else {
        console.log(err)
        res.status(400).send(err)
      }
    })
  })
}

//  ------------------Profile api ---------------------
exports.userProfile = async (req, res) => {
  console.log('req from front',req.query.id)
  pool.getConnection((err, connection) => {
    if (err) throw err;
    
    connection.query(`SELECT * FROM users WHERE id = ${req.query.id}`, (err, result) => {
      connection.release();
      
      if (err) {
        console.log(err);
        res.status(201).send(err);
        return;
      }
      
      const dbpassword = result[0].password;
      const key = "my secret key";
      
      
        try {
          const dbPassword = result[0].password;
          const bytes = CryptoJS.AES.decrypt(dbPassword, key);
          const DecryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
          console.log("Decrypted message:", DecryptedPassword);

          res.send(JSON.stringify({
            id: result[0].id,
            role_id: result[0].role_id,
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            username: result[0].username,
            email: result[0].email,
            // password: result[0].password,
            password: DecryptedPassword,
            contact_no: result[0].contact_no,
            address: result[0].address
          }));  
        } catch (error) {
          console.error("Decryption error:", error);
        } 
     
    });
  });
}

//Update Profile 
exports.updateProfile = async (req, res) => {
  const Userid = req.body.id
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log(req.body)

    const key = "my secret key";
    const password = req.body.password
    console.log('*****password*****',password)

    // Encryption
    const EncryptedPassword = CryptoJS.AES.encrypt(password, key).toString();
    console.log("Encrypted message:", EncryptedPassword);

    connection.query('UPDATE `users` SET `role_id`=?,`first_name`=?,`last_name`=?,`username`=?,`email`=?,`password`=? WHERE id = ?', 
      [req.body.role_id, req.body.first_name, req.body.last_name, req.body.username, req.body.email, EncryptedPassword, Userid], (err, result)=>{
          if (!err) {
            res.status(200).json(result)
            console.log('user updated succesfully')
          } else {
            console.log(err)
            res.status(201).send(err)
          }
      } )
    
  })
}

// forgot pass mail
exports.userExist = async (req, res) => {
  const username = req.body.email
  console.log(username)
  pool.getConnection((err, connection) => {
    connection.query("select * from users where email = ?",[username],(err, result)=>{
      connection.release()
      if (result.length > 0) {
        console.log(result);
        res.status(200).json("FOUND")
        console.log('found ',result)
      } else {
      
        res.status(201).send("not found")
      }
    })
    if (err) {
      console.log(err,);
    }
  }
  )
}

//to send mail to  user

//send email
exports.sendMail = async(req, res) =>{
  const userMail = req.query.user;
  // console.log(AuthMail + " ss  " + Authpass);
  console.log(userMail);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: 'mail.sincprojects.com',
    // port: 465,
    // secure: true,
    auth: {
        user: AuthMail,
        pass: Authpass
    }
});
const uniToken = `${JWT_secret}${userMail}`
const payload = {
  email:userMail
}
  const token = jwt.sign({payload}, uniToken)
  const URL = `${url}/resetpassword?id=${userMail}&token=${token}`
  console.log(URL);

  // send mail with defined transport object
  let info = transporter.sendMail({
    from: '"Highgrove" <developersweb001@gmail.com>', // sender address
    to: userMail, // list of receivers
    subject: "Change password for Highgrove", // Subject line
    text: `This is test message`, // plain text body
    html: `<img src="http://localhost:3000/static/media/LogoImg.dddb0559996bf9af8050.png" style="background-color: #000;width: 250px;margin-bottom:20px;
  }"><br/>
    <h5>Reset password</h5>
    <p>A password change has been requested for your account. If this was you, please use the link below to reset your password. 
    </p>
    <a href= ${URL} target="_blank" rel="noopener noreferrer" style="background-color: #000;padding: 8px 16px;color: #fff;border-radius: 5px;display: block;width: fit-content;margin-top: 10px;">Reset Password</a>`, // html body
  }, (err)=>{
    if(err){
      res.status(201).json(err);
      console.log("Email has an error");
      console.log(err);
    }else{
      res.status(200).json(info);
      console.log("Email sent");
    }
  }
  );
}

// to check whether user is user is authentic or not to update password
exports.authUser = async(req, res) =>{
  const jwt_token = req.body.token;
  const sec_token = req.body.unitok;
  try {
    jwt.verify(jwt_token, sec_token);
    res.status(200).json({msg : "done"});
  } catch (error) {
    res.status(201).json(error);
    console.log(error);
  }
}

//To update password

exports.setNewPassword = async(req, res) =>{
  const Email = req.query.email;
  const password = req.query.ps;
  console.log(req.query);
  // console.log('ASJD');

  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('UPDATE users SET password = ? WHERE email = ?', [password, Email], (err, result) => {
      connection.release()
      if (!err) {
        res.status(200).json(result)
        console.log('user updated succesfully')
      } else {
        res.status(201).send(err)
        console.log(err)
      }
    })
  })



  // connection.query('UPDATE user SET user_password = ? WHERE user_email = ?', [password, Email], (err, result) => {
  //   if (!err) {
  //     res.json('updated')
  //   } else {
  //     res.status(400).send(err)
  //   }
  // })
}


// //  ------------------Customer api ---------------------

// //get user details
// exports.customersdetails = async (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err
//     connection.query('SELECT * FROM customers', (err, result) => {
//       // connection.query('SELECT id, role_id, first_name, last_name, username, email, contact_no FROM users', (err, result) => {
//       connection.release()

//       if (!err) {
//         res.status(203).json(result)
//         // console.log('Customers Data')
//       } else {
//         console.log(err)
//         // res.status(400).send(err)
//       }
//     })
//   })
// }


// //  ------------------Customer api ---------------------

// //get Product details
// exports.productsdetails = async (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err
//     connection.query('SELECT * FROM products', (err, result) => {
//       // connection.query('SELECT id, role_id, first_name, last_name, username, email, contact_no FROM users', (err, result) => {
//       connection.release()

//       if (!err) {
//         res.status(203).json(result)
//         // console.log('Customers Data')
//       } else {
//         console.log(err)
//         // res.status(400).send(err)
//       }
//     })
//   })
// }

// //get Cart details
// exports.cartdetails = async(req,res) =>{
//   pool.getConnection((err,connection)=>{
//     if(err) throw err
//     connection.query('SELECT * FROM orders where status=2', (err,result)=>{
//       connection.release()
//       if(!err){
//         res.status(203).json(result)
//       }
//       else{
//         console.log(err)
//       }
//     })
//   })
// }

// //get orders & product details
// exports.cartorder = async(req,res) =>{
//   pool.getConnection((err,connection)=>{
//     if(err) throw err
//     // connection.query('SELECT * FROM `customers` LEFT JOIN `orders` ON customers.reference=orders.customer_code RIGHT JOIN `order_state` ON order_state.order_id = orders.order_id WHERE orders.status=2', (err,result)=>{
//     // connection.query('SELECT * FROM `orders` LEFT JOIN customer_delivery_addresses ON orders.customer_id=customer_delivery_addresses.customer_id WHERE orders.status=2', (err,result)=>{ 
//     connection.query('SELECT * FROM orders where status=2', (err,result)=>{
//       connection.release()
//       if(!err){
//         res.status(203).json(result)
//       }
//       else{
//         console.log(err)
//       }
//     })
//   })
// }

// exports.cartorderbyid = async (req, res) => {
//   console.log('product_id',req.params.id)
//   pool.getConnection((err,connection)=>{
//     if(err) throw err
//     // connection.query('SELECT * FROM `orders` LEFT JOIN customer_delivery_addresses ON orders.customer_id=customer_delivery_addresses.customer_id WHERE orders.status=2 AND orders.product_id=?',[req.params.id], (err,result)=>{
//     connection.query('SELECT * FROM orders where status=2 AND orders.product_id=?',[req.params.id], (err,result)=>{
//       connection.release()
//       if(!err){
//         res.status(203).json(result)
//       }
//       else{
//         console.log(err)
//       }
//     })
//   })
// }



// //get orders & product details
// exports.shippingAddress = async(req,res) =>{
//   pool.getConnection((err,connection)=>{
//     if(err) throw err
//     connection.query('SELECT * FROM orders LEFT JOIN customer_delivery_addresses ON orders.customer_id=customer_delivery_addresses.customer_id WHERE orders.status=2 AND orders.product_id=?', [req.params.id],(err,result)=>{
//       connection.release()
//       if(!err){
//         res.status(203).json(result)
//       }
//       else{
//         console.log(err)
//       }
//     })
//   })
// }


// //get orders & product details
// exports.RemoveProduct = async(req,res) =>{
//   console.log('remove product',req.params)
//   pool.getConnection((err,connection)=>{
//     if(err) throw err
//     connection.query('DELETE FROM `orders` WHERE product_id=?', [req.params.id],(err,result)=>{
//       connection.release()
//       if(!err){
//         res.status(203).json(result)
//       }
//       else{
//         console.log(err)
//       }
//     })
//   })
// }