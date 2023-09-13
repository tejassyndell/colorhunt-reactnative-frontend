/* eslint-disable */

const { response } = require('express');
const mysql = require('mysql')
const fetch = require("node-fetch")
const cache = require('../../node-cache/cache');




// const url = 'http://192.168.2.199:3000'
const url = 'http://localhost:3000'
// const url = 'https://highgrove.sincrprojects.com/'
// const url = 'https://highgrove-two.sincprojects.com/'



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

const express = require('express');

const app = express();

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true
// }));

exports.showProducts = async (req, res) => {
  const ID = req.body.id;
  console.log("ID",ID);
  pool.getConnection((err, connection) => {
    if (err) throw err
    // connection.query('SELECT * FROM users', (err, result) => {
    connection.query('SELECT ss.itemID, ss.Code, sp.price FROM customers c JOIN sage_price sp ON c.id = sp.customerId JOIN sage_stock ss ON sp.itemId = ss.itemID WHERE c.id = ?', [ID], (err, result) => {
      connection.release()
      if (!err) {
        const priceData = result;
        // console.log(priceData)rs
        // priceData.forEach((item) => {
        //   if (!itemid.includes(item.Code)) {
        //     itemid.push({codes : item.Code});
        //   }
        // });
        getProductNames(priceData)
          .then((result) => {
            // res.status(200).json(result);

          })
          .catch((error) => {
            console.error(error);
            // res.status(500).json({ error: "An error occurred" });
          });
      } else {
        console.log(err)
        // res.status(201).send(err)
      }
    })
  })

  const getProductNames = (e) => {
    return new Promise((resolve, reject) => {
      let productNameData = [];
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        }
        const promises = e.map((data) => {
          return new Promise((resolve, reject) => {
            connection.query(
              // `SELECT group_id,name,code FROM products_variations WHERE code = ?`,
              `SELECT * FROM products_variations WHERE code = ?`,
              [data.Code],
              (err, result) => {
                if (!err) {
                  for (const res of result) {
                    if (res.code === data.Code) {
                      const productData = { ...data, ...res };
                      productNameData.push(productData);
                      // console.log(productNameData);
                    }
                    // console.log(productNameData);
                  }
                  // res.status(200).json(productNameData);
                  // console.log(productNameData);
                  resolve();
                  // res.status(200).send(productNameData)
                } else {
                  reject(err);
                }
              }
            );
          },
          );
        });

        Promise.all(promises)
          .then(() => {
            resolve(productNameData);
            console.log(productNameData);
            res.status(200).send(productNameData)
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            // connection.release();
          });
      });
    });
  };
}

exports.fetchCustomerIds = async (req, res) => {
  let fetchData = {} // to store fetched custID and product categories
  pool.getConnection((err, connection) => {
    if (err) throw err
    // connection.query('SELECT * FROM users', (err, result) => {
    connection.query('SELECT `short_name`, `reference`, `id` FROM customers', (err, result) => {
      if (!err) {
        // res.status(203).json(result)
        fetchData.cusID = result
      } else {
        console.log(err)
        res.status(400).send(err)
      }
    })

    connection.query('SELECT * FROM product_category', (err, result) => {
      connection.release()

      if (!err) {
        // res.status(203).json(result)
        fetchData.product_id = result
        // console.log(fetchData)

      } else {
        console.log(err)
        res.status(201).send(err)
      }
      res.status(200).json(fetchData);
    })
    // connection.query('SELECT ss.Code FROM customers c JOIN sage_price sp ON c.id = sp.customerId JOIN sage_stock ss ON sp.itemId = ss.itemID WHERE c.id = "33299473"', (err, result) => {
    // connection.query('SELECT pv.id FROM customers c JOIN sage_price sp ON c.id = sp.customerId JOIN sage_stock ss ON sp.itemId = ss.itemID JOIN products_variations pv ON ss.Code = pv.code WHERE c.id = "33299473"', (err, result) => {
    // connection.query('SELECT p.name FROM customers c JOIN sage_stock ss ON c.id = ss.itemID JOIN products_variations pv ON ss.Code = pv.code JOIN products p ON pv.group_id = p.group_id WHERE c.id = "33299473";', (err, result) => {
    // connection.query('SELECT distinct p.name FROM customers c JOIN sage_price sp ON c.id = sp.customerId JOIN sage_stock ss ON sp.itemId = ss.itemID JOIN products_variations pv ON ss.Code = pv.code JOIN products p ON pv.group_id = p.group_id WHERE c.id = "33299473"', (err, result) => {
    //   connection.release()
    //   fetchData.product_group = result
    //   if (!err) {
    //     res.status(203).json(result)
    //     fetchData.product_id = result
    //     console.log(result)
    //     console.log(fetchData.product_group);
    //     console.log("This is..................");
    //   } else {
    //     console.log(err)
    //     res.status(400).send(err)
    //   }
    //   res.status(200).json(fetchData);
    // })
  })
}

//test function
exports.testfunction = async (req, res) => {
  const accessTokendata = await cache.get('data');

  console.log(accessTokendata);
  res.send(accessTokendata.refreshToken)
}

//to get orderDetais
exports.GetorderDetails = async (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`SELECT 
    orders.*, 
    cart_orders.*,
    users.first_name,
    orders.status AS status
FROM 
    orders 
RIGHT JOIN 
    cart_orders ON orders.portal_ref_num = cart_orders.order_number 
LEFT JOIN 
    users ON orders.created_by_agent = users.id
WHERE 
    orders.status != 2 
ORDER BY 
    orders.creation_date;
`, (err, result) => {
      connection.release()
      console.log('GetOrderDetails', result)
      if (!err) {
        res.status(203).json(result)
        console.log('order....')
      } else {
        console.log(err)
        res.status(400).send(err)
      }
    })
  })
}


// exports.getAccessToken = async (req, res) => {
//   res.send("API CALL")
// }


//get access token function starst from here
const getClientCredentials = () => {
  return {
    client_id: process.env.client_id,
    redirect_uri: 'https://highgrove.sincprojects.com/getToken'
  };
};

const getToken = async (req, res, grant_type, tokenValue) => {
  const url = 'https://id.sage.com/oauth/token';
  const data = {
    ...getClientCredentials(),
    grant_type,
    [grant_type === 'authorization_code' ? 'code' : 'refresh_token']: tokenValue,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams(data),
    });

    const responseData = await response.json();
    console.log(responseData);
    if (responseData) {
      console.log(responseData);
      const data = {
        'accessToken': responseData.access_token,
        'refreshToken': responseData.refresh_token,
        'idToken': responseData.id_token,
        // Add more key-value pairs as needed
      };
      cache.set('data', data);
      res.status(200).send("Token fetched");
    } else {
      res.status(201).send("Token not found");
    }
  } catch (error) {
    console.error(error);
    res.status(201).send('Error occurred while fetching access token.');
  }
};

exports.getAccessToken = async (req, res) => {
  console.log(req.body)
  if (req.body.code) {
    const code = req.body.code;
    getToken(req, res, 'authorization_code', code);
  } else {
    const accessTokendata = await cache.get('data');

    const refresh_token = accessTokendata.refreshToken;
    getToken(req, res, 'refresh_token', refresh_token);
  }
};

//to Get Latest orderDetails
exports.GetLatestorderDetails = async (req, res) => {

  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`SELECT 
    orders.*, 
    cart_orders.*,
    users.first_name,
    orders.status AS status
FROM 
    orders 
RIGHT JOIN 
    cart_orders ON orders.portal_ref_num = cart_orders.order_number 
LEFT JOIN 
    users ON orders.created_by_agent = users.id
WHERE 
    orders.status != 2 
ORDER BY 
    orders.order_id DESC
LIMIT 10;
`, (err, result) => {
      connection.release()
      console.log('GetlatestOrderDetails', result)
      if (!err) {
        res.status(203).json(result)
        console.log('order....')
      } else {
        console.log(err)
        res.status(400).send(err)
      }
    })
  })
}


//to filter data date wise in all orders
exports.filterDates = async (req, res) => {
  const startDate = req.body.startDate;
  const EndDate = req.body.endData;
  const ProDate = req.body.proData;

  console.log("sd" + startDate);
  console.log("ED" + EndDate);
  console.log("PD" + ProDate);
  pool.getConnection((err, connection) => {
    if (err) throw err
    if (ProDate == null || ProDate == 'Invalid date') {
      // connection.query(`SELECT * FROM orders WHERE creation_date BETWEEN ? AND ?`,[startDate, EndDate], (err, result) => {
      connection.query(`SELECT *
      FROM (
          SELECT *
          FROM orders
          WHERE creation_date >= '${startDate}' AND creation_date <= '${EndDate}'
      ) AS filtered_orders
      RIGHT JOIN cart_orders ON filtered_orders.portal_ref_num = cart_orders.order_number
      WHERE filtered_orders.status IS NULL OR filtered_orders.status != 2
      ORDER BY filtered_orders.creation_date;`, (err, result) => {
        connection.release()
        console.log(result);
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        if (!err) {
          res.status(200).json(result)
          // console.log('order....')
        } else {
          // console.log(err)
          res.status(201).send(err)
        }
      })
    } else {
      connection.query(`SELECT *
      FROM (
          SELECT *
          FROM orders
          WHERE promise_delivery_date = ?
      ) AS filtered_orders
      INNER JOIN cart_orders ON filtered_orders.portal_ref_num = cart_orders.order_number
      WHERE filtered_orders.status IS NULL OR filtered_orders.status != 2
      ORDER BY filtered_orders.creation_date;
      `, [ProDate], (err, result) => {
        // console.log(ProDate);
        console.log(result);
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        connection.release()
        if (!err) {
          res.status(200).json(result)
          // console.log('order....')
        } else {
          // console.log(err)
          res.status(201).send(err)
        }
      })
    }
  })
}
// to fetch products when user select type
exports.fetchProductdata = async (req, res) => {
  const productType = req.body.product
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT p.* FROM products p JOIN product_category pc ON p.category = pc.id WHERE pc.id = ?', [productType], (err, result) => {
      // connection.query('SELECT id, role_id, first_name, last_name, username, email, contact_no FROM users', (err, result) => {
      connection.release()
      if (!err) {
        res.status(200).json(result)
        // console.log(result)
      } else {
        console.log(err)
        res.status(201).send(err)
      }
    })
  })
}

// to fetch products options when user select type
exports.fetchProductOptions = async (req, res) => {
  const product_code = req.body.productCode;
  console.log(req.body)
  let ProductDetails = {} // empty object to store data 
  let ProductSize = {} // empty object to store data 
  let ProductheadOptions = {} // empty object to store data 
  let ProductfabDetails = {} // empty object to store data 
  let Productfootboards = {} // empty object to store data 
  let combinedResultData = {}
  pool.getConnection((err, connection) => {
    if (err) throw err
    // ------------ this query will get product details
    connection.query('SELECT name FROM products WHERE products.id = ?', [product_code], (err, result) => {
      // connection.query('SELECT id, role_id, first_name, last_name, username, email, contact_no FROM users', (err, result) => {
      if (!err) {
        // res.status(200).json(resultData).
        // ProductSize[`Mattress Details`] = result;
        ProductDetails.details = result;
        combinedResultData.deatails = ProductDetails;
        console.log(result)
      } else {
        console.log(err)
        res.status(201).send(err)
      }
    })

    // ------------ this query will get fabric details
    // connection.query('SELECT DISTINCT name, product_fabric.fabric_ranges FROM products LEFT JOIN product_fabric ON FIND_IN_SET(product_fabric.id, products.product_fabric) WHERE products.id = ?',[product_code], (err, result) => {
    //   if (!err) {
    //     // res.status(200).json(resultData)
    //     ProductfabDetails[`Fabric Range`] = result;
    //     combinedResultData.ProductfabDetails = ProductfabDetails;
    //     // console.log(result)
    //   } else {
    //     console.log(err)
    //     res.status(201).send(err)
    //   }
    // })

    // ------------ this query will get storage details
    // connection.query('SELECT DISTINCT product_storage.storage_options FROM products LEFT JOIN product_storage ON FIND_IN_SET(product_storage.id, products.product_storage) WHERE products.id = ?',[product_code], (err, result) => {
    //   if (!err) {
    //     // res.status(200).json(resultData)
    //     ProductfabDetails[`Storage`] = result;
    //     combinedResultData.ProductfabDetails = ProductfabDetails;
    //     // console.log(result)
    //   } else {
    //     console.log(err)
    //     res.status(201).send(err)
    //   }
    // })

    // ------------ this query will get storage details
    //  connection.query('SELECT DISTINCT product_feet.feet_options FROM products LEFT JOIN product_feet ON FIND_IN_SET(product_feet.id, products.product_feet) WHERE products.id = ?',[product_code], (err, result) => {
    //   if (!err) {
    //     // res.status(200).json(resultData)
    //     ProductfabDetails[`Feet Option`] = result;
    //     combinedResultData.ProductfabDetails = ProductfabDetails;
    //     // console.log(result)
    //   } else {
    //     console.log(err)
    //     res.status(201).send(err)
    //   }
    // })

    // ------------ this query will get headboard details
    //  connection.query('SELECT DISTINCT headboard_range.headboard_range, headboard_range.id FROM products LEFT JOIN headboard_range ON FIND_IN_SET(headboard_range.id, products.headboard_range) WHERE products.id = ?',[product_code], (err, result) => {
    //   if (!err) {
    //     // res.status(200).json(resultData)
    //     ProductheadOptions[`Headboard Range`] = result;
    //     combinedResultData.ProductheadOptions = ProductheadOptions;
    //     // console.log(result)
    //   } else {
    //     console.log(err)
    //     res.status(201).send(err)
    //   }
    // })

    // ------------ this query will get footboard details
    //  connection.query('SELECT DISTINCT fb.footboards AS fb, fb.id FROM products p LEFT JOIN footboards fb ON FIND_IN_SET(fb.id, p.footboards) WHERE p.id = ?',[product_code], (err, result) => {
    //   if (!err) {
    //     // res.status(200).json(resultData)
    //     Productfootboards[`FootBoards`] = result;
    //     combinedResultData.Productfootboards = Productfootboards;
    //     // console.log(result)
    //   } else {
    //     console.log(err)
    //     res.status(201).send(err)
    //   }
    // })

    // ------------ this query will get size details
    // connection.query('SELECT DISTINCT product_size.sizes FROM products LEFT JOIN product_size ON FIND_IN_SET(product_size.product_size_id, products.product_size) WHERE products.id = ?',[product_code], (err, result) => {
    //   // connection.query('SELECT id, role_id, first_name, last_name, username, email, contact_no FROM users', (err, result) => {
    //   connection.release()
    //   if (!err) {
    //     // res.status(200).json(resultData)
    //     ProductSize[`Mattress Size`] = result;
    //     combinedResultData.sizeData = ProductSize;
    //     // console.log(result)
    //   } else {
    //     console.log(err)
    //     res.status(201).send(err)
    //   }
    //   // console.log(combinedResultData);
    //   res.send(combinedResultData);
    // })
  })
}

//to get product size and other options
exports.getProductSize = async (req, res) => {
  const rangeID = req.body.range;
  const sizeID = req.body.size;

  pool.getConnection((err, connection) => {
    if (err) throw err;

    if (rangeID) {
      connection.query(
        'SELECT hs.headboardsize, hs.id FROM headboard_range hr LEFT JOIN headboard_size hs ON FIND_IN_SET(hs.id, hr.headboard_size) WHERE hr.id = ?',
        [rangeID],
        (err, result) => {
          connection.release();
          if (!err) {
            res.status(200).json(result);
          } else {
            console.log(err);
            res.status(500).json({ error: 'Internal server error' })
          }
        }
      )
    } else if (sizeID) {
      connection.query(
        'SELECT hs.headboard_style, hs.id FROM headboard_size hsz LEFT JOIN headboard_style hs ON FIND_IN_SET(hs.id, hsz.headboard_style) WHERE hsz.id = ?',
        [sizeID],
        (err, result) => {
          connection.release();
          if (!err) {
            res.status(200).json(result);
          } else {
            console.log(err);
            res.status(201).json({ error: 'Internal server error' });
          }
        }
      )
    }
  })
}


/***Ashvini****/

//  ------------------Customer api ---------------------

//get Customer details
exports.customersdetails = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`SELECT * FROM customers WHERE account_status <> 1 AND name NOT LIKE '%void%'`, (err, result) => {
      // connection.query(`SELECT * FROM customers`, (err, result) => {
      connection.release()
      if (!err) {
        res.status(203).json(result)
      } else {
        console.log(err)
      }
    })
  })
}


//  ------------------Product api ---------------------

//get Product details
exports.productsdetails = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM products', (err, result) => {
      connection.release()

      if (!err) {
        res.status(203).json(result)
      } else {
        console.log(err)
      }
    })
  })
}

//get Cart details
exports.cartdetails = async (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM cart_orders  where status=3', (err, result) => {
      connection.release()
      if (!err) {
        res.status(203).json(result)
      }
      else {
        console.log(err)
      }
    })
  })
}

//get orders & product details
exports.cartorder = async (req, res) => {
  pool.getConnection((err, connection) => {

    if (err) throw err
    // connection.query('SELECT * FROM `customers` LEFT JOIN `orders` ON customers.reference=orders.customer_code RIGHT JOIN `order_state` ON order_state.order_id = orders.order_id WHERE orders.status=2', (err,result)=>{
    // connection.query('SELECT * FROM `orders` LEFT JOIN customer_delivery_addresses ON orders.customer_id=customer_delivery_addresses.customer_id WHERE orders.status=2', (err,result)=>{ 
    connection.query('SELECT * FROM orders ', (err, result) => {
      connection.release()
      if (!err) {
        res.status(203).json(result)
      }
      else {
        console.log(err)
      }
    })

  })
}

//OS Refernce Validation 
exports.osrefValidation = async (req, res) => {
  pool.getConnection((err, connection) => {
    console.log('osrefValidation', req.body.osrefernce)
    if (err) throw err
    try {
      pool.getConnection((err, connection) => {
        connection.query("select * from `orders` where `os_reference`= ? ", [req.body.osrefernce], (err, result) => {
          connection.release()
          console.log('result', result)
          if (result != '') {
            res.send("exist");
          } else {
            res.send("not exist")
          }
        })
      })
    }
    catch (error) {
      console.log(error)
    }
  })
}


exports.cartorderbyid = async (req, res) => {
  console.log('product_id', req.params.id)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM orders where status=2 AND orders.order_id=?', [req.params.id], (err, result) => {
      connection.release()
      if (!err) {
        res.status(203).json(result)
      }
      else {
        console.log(err)
      }
    })
  })
}


//get orders & product details
exports.shippingAddress = async (req, res) => {
  console.log('address', req.params)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM `order_state` LEFT JOIN orders ON order_state.order_id=orders.order_id LEFT JOIN product_base_size ON product_base_size.id=order_state.product_size_id LEFT JOIN product_feet ON product_feet.id=order_state.product_feet_id LEFT JOIN headboard_fabric ON headboard_fabric.id=order_state.product_fabric_id LEFT JOIN products_drawers ON products_drawers.id=order_state.product_storage_id WHERE orders.order_id=?', [req.params.id], (err, result) => {
      connection.release()
      if (!err) {
        res.status(203).json(result)
      }
      else {
        console.log(err)
      }
    })
  })
}

// customer product data 
// exports.customersdetailsid = async (req, res) => {
//   try {
//    pool.getConnection((err,connection) => {
//     if(err) throw  err;
//     connection.query('SELECT Code FROM sage_stock WHERE itemID IN (SELECT itemID FROM sage_price where customerId = ?)',[req.params.id] ,(err,result)=>{
//       connection.release()
//       if(!err){
//         // res.json(result)
//         testfuction(result)
//       }
//       else{
//         console.log(err)
//       }
//     })
//    })
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: err.message });
//   }

//   const testfuction = (pCodes)=> {
//     let results = []
//     pool.getConnection((err,connection) => {
//       if(err) throw  err;
//     for(const data of pCodes){
//       connection.query(`SELECT * FROM products_variations WHERE code = ?`,[data.Code], (err, result) => {
//         if (!err) {
//           // res.status(200).json(result)
//           results.push(result[0])
//           console.log("iam data",results[0]);
//         } else {
//           console.log(err)
//           res.status(201).json(err);
//         }
//       })
//     }
//     console.log(results,'testdata');
//     res.status(200).json({
//       results
//     })
//     connection.release()
//   })

//   }
// };
const testfuction = (pCodes, res) => {
  let promises = [];
  let results = [];

  pool.getConnection((err, connection) => {
    if (err) throw err;

    for (const data of pCodes) {
      let queryPromise = new Promise((resolve, reject) => {
        connection.query(
          'SELECT * FROM products_variations WHERE code = ?',
          [data.Code],
          (err, result) => {
            if (!err) {
              if (result.length > 0) {
                // Only push the result if it's not empty
                results.push(result[0]);
              }
              resolve();
            } else {
              reject(err);
            }
          }
        );
      });
      promises.push(queryPromise);
    }


    Promise.all(promises)
      .then(() => {
        console.log('iam data', results);
        res.status(200).json({ results });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err.message });
      })
      .finally(() => {
        connection.release();
      });
  });
};

exports.customersdetailsid = async (req, res) => {
  try {
    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(
        'SELECT Code FROM sage_stock WHERE itemID IN ( SELECT itemID FROM sage_price WHERE customerId = ? AND itemID IS NOT NULL);',
        [req.params.id],
        (err, result) => {
          connection.release();
          if (!err) {
            testfuction(result, res);
          } else {
            console.log(err);
            res.status(500).json({ error: err.message });
          }
        }
      );
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
  }
};
// exports.customersdetailsid = async (req, res) => {
//   try {
//     pool.getConnection((err, connection) => {
//       if (err) throw err;

//       connection.query(
//         'SELECT Code FROM sage_stock WHERE itemID IN (SELECT itemID FROM sage_price WHERE customerId = ?)',
//         [req.params.id],
//         (err, result) => {
//           connection.release();
//           if (!err) {
//             const filteredResult = result.filter((item) => item !== null);
//             return res.status(200).json(filteredResult);
//           } else {
//             console.log(err);
//             res.status(500).json({ error: err.message });
//           }
//         }
//       );
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: err.message });
//   }
// };



//get product variation on place order screen
exports.ProductVariations = async (req, res) => {
  console.log('product id for variations ', req.params.id)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM order_state LEFT JOIN orders ON order_state.order_id = orders.order_id LEFT JOIN (SELECT id as base_id, value as base_value FROM product_base_size) AS product_base_size ON product_base_size.base_id = order_state.product_size_id LEFT JOIN (SELECT id as feet_id, value as feet_value FROM product_feet) AS product_feet ON product_feet.feet_id = order_state.product_feet_id  LEFT JOIN (SELECT id as storage_id, value as storage_value FROM products_drawers) AS products_drawers ON products_drawers.storage_id = order_state.product_storage_id LEFT JOIN (SELECT id as fabric_id, value as fabric_value FROM headboard_fabric) AS headboard_fabric ON headboard_fabric.fabric_id = order_state.product_feet_id WHERE orders.order_id=?', [req.params.id], (err, result) => {
      connection.release()
      if (!err) {
        // res.status(203).json(result)
        res.send(result)
      }
      else {
        console.log(err)
      }
    })
  })
}

exports.ProductVariationsById = async (req, res) => {
  console.log('ProductVariationsById', req.params.id)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT order_state.order_state_id, orders.os_reference, order_state.po_number, order_state.product_qty, order_state.product_discount, order_state.product_amount FROM `order_state` LEFT JOIN orders ON order_state.order_id=orders.order_id LEFT JOIN product_base_size ON product_base_size.id=order_state.product_size_id LEFT JOIN product_feet ON product_feet.id=order_state.product_feet_id LEFT JOIN headboard_fabric ON headboard_fabric.id=order_state.product_fabric_id LEFT JOIN products_drawers ON products_drawers.id=order_state.product_storage_id WHERE order_state.order_state_id=?', [req.params.id], (err, result) => {
      connection.release()
      if (!err) {
        res.status(203).json(result)
        console.log(result, 'variation Data')
      }
      else {
        console.log(err)
      }
    })
  })
}
//create a function that takes logs values and add into database

exports.updateOrderData = async (req, res) => {
  console.log('updateOrderDataID', req.params.id)
  console.log('req.body', req.body)


  pool.getConnection((err, connection) => {
    if (err) throw err

    // connection.query('SELECT order_state.id, orders.os_reference, order_state.po_number, order_state.product_qty, order_state.product_discount, order_state.product_amount FROM `order_state` LEFT JOIN orders ON order_state.order_id=orders.order_id LEFT JOIN product_size ON product_size.product_size_id=order_state.product_size_id LEFT JOIN product_feet ON product_feet.product_feet_id=order_state.product_feet_id LEFT JOIN product_fabric ON product_fabric.product_fabric_id=order_state.product_fabric_id LEFT JOIN product_storage ON product_storage.product_storage_id=order_state.product_storage_id WHERE order_state.id=?',[req.params.id], (err,result)=>{
    connection.query('SELECT order_state.order_state_id, orders.os_reference, order_state.po_number, order_state.product_qty, order_state.product_discount, order_state.product_amount FROM `order_state` LEFT JOIN orders ON order_state.order_id=orders.order_id LEFT JOIN product_base_size ON product_base_size.id=order_state.product_size_id LEFT JOIN product_feet ON product_feet.id=order_state.product_feet_id LEFT JOIN headboard_fabric ON headboard_fabric.id=order_state.product_fabric_id LEFT JOIN products_drawers ON products_drawers.id=order_state.product_storage_id WHERE order_state.order_state_id=?', [req.params.id], (err, result) => {
      if (!err) {
        console.log('Data need to be updated', result)
        console.log('length', result)


        function generateRandomNumber() {
          const min = 1000000000; // Minimum 10-digit number (inclusive)
          const max = 9999999999; // Maximum 10-digit number (inclusive)
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const randomNumber = generateRandomNumber();
        console.log(randomNumber);

        //getting agent name
        let agentFirstName; // Declare a variable outside the function
        connection.query('SELECT `id`, `first_name`, `last_name` FROM `users` WHERE id = ?', [req.body.agent_name], (err, agentdata) => {
          if (err) {
            console.error(err);
            return;
          }
          agentFirstName = agentdata[0].id;
          console.log('agentFirstName', agentFirstName);



          //Insert old data on log table
          connection.query('INSERT INTO `tbl_log`(`order_state_id`, `old_os_reference`, `old_po_number`, `old_product_qty`, `old_discount`, `old_price`, `refernce_num`, `agent_name`) VALUES (?,?,?,?,?,?,?,?)',
            [req.params.id, result[0].os_reference, result[0].po_number, result[0].product_qty, result[0].product_discount, result[0].product_amount, randomNumber, agentFirstName], (err, InsertedOldValues) => {
              if (!err) {
                console.log("data Inserted to log table", InsertedOldValues)
              }
              else {
                console.log(err)
              }
            })

        });

        //Update orders data
        connection.query('UPDATE `order_state` LEFT JOIN orders ON order_state.order_id=orders.order_id SET orders.os_reference=?, order_state.po_number=?, order_state.product_qty=?, order_state.product_discount=? , order_state.product_amount=? WHERE order_state.order_state_id=?',
          [req.body.os_reference, req.body.po_number, req.body.product_qty, req.body.product_discount, req.body.amount, req.params.id], (err, result) => {
            connection.release()
            if (!err) {
              console.log("success", result)
              res.send(result)
            }
            else {
              console.log(err)
            }
          })
        //update inserted log for adding updated value of orders 
        connection.query('UPDATE `tbl_log` SET `new_os_reference`=?,`new_po_number`=?,`new_product_qty`=?,`new_discount`=?,`new_price`=? WHERE order_state_id=?',
          [req.body.os_reference, req.body.po_number, req.body.product_qty, req.body.product_discount, req.body.amount, req.params.id], (err, InsertedNewValues) => {
            if (!err) {
              console.log("InsertedNewValues", InsertedNewValues)
            }
            else {
              console.log(err)
            }
          })
      }
      else {
        console.log(err)
      }
    })
  })
}

exports.changeLogDetail = async (req, res) => {
  console.log(req.body)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM `tbl_log` LEFT JOIN users ON tbl_log.agent_name=users.id', (err, changelogDetails) => {
      if (!err) {
        // console.log(changelogDetails)
        res.send(changelogDetails)
      }
      else {
        console.log(err)
      }
    })
  })
}


//get orders & product details
exports.shippingAddress = async (req, res) => {
  console.log('address', req.params)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM orders LEFT JOIN customer_delivery_addresses ON orders.customer_id=customer_delivery_addresses.customer_id WHERE orders.order_id=?', [req.params.id], (err, result) => {
      connection.release()
      if (!err) {
        res.status(203).json(result)
      }
      else {
        console.log(err)
      }
    })
  })
}

//get orders & product details
exports.UpdateOrderData = async (req, res) => {
  console.log('UpdateOrderData', req.params)
  console.log('Data need to be updated', req.body)
  // pool.getConnection((err,connection)=>{
  //   if(err) throw err
  //   connection.query('UPDATE order_state SET ? WHERE id = ?', [req.params.id],(err,result)=>{
  //     connection.release()
  //     if(!err){
  //       res.status(203).json(result)
  //     }
  //     else{
  //       console.log(err)
  //     }
  //   })
  // })
}

//get orders & product details
exports.RemoveProduct = async (req, res) => {
  console.log('remove product', req.params)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('DELETE FROM `orders` WHERE product_id=?', [req.params.id], (err, result) => {
      connection.release()
      if (!err) {
        res.status(203).json(result)
      }
      else {
        console.log(err)
      }
    })
  })
}



//////////////////////////ADD PRODUCT APIs\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//Add Varient API...
exports.AddVarient = async (req, res) => {
  console.log(req.body)
  const { table, variation, name, code, status } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`INSERT INTO ${variation} (value, code) VALUES (?,?)`, [name, code], (err, result) => {
      connection.release()
      if (!err) {
        res.status(200).json(result)
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })
  })
}


//get product details API
exports.getProductDetails = async (req, res) => {

  let combinedproductData = { category: [], groups: [], mat_size: [], springs: [], base_size: [], base_fab_color: [], product_feet: [], footboards: [], drawers: [], headboard_size: [], headboard_style: [], }

  // const {Category, Name, Code, Description, MattressSizes, Springs, BaseSizes, BaseFabricColour, FeetOption, FootBoard, Drawers} = req.body
  pool.getConnection((err, connection) => {
    if (err) throw err

    // this query will get product category data
    connection.query('SELECT * FROM product_category ORDER BY id ASC', (err, result) => {
      if (!err) {
        console.log(result);
        combinedproductData.category = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })

    // this query will get product group data
    connection.query('SELECT * FROM product_groups', (err, result) => {
      // connection.release()
      if (!err) {
        console.log(result);
        combinedproductData.groups = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })

    // this query will get product matsize data
    connection.query('SELECT * FROM product_mat_size', (err, result) => {
      connection.release()
      if (!err) {
        console.log(result);
        combinedproductData.mat_size = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })

    // this query will get product category data
    connection.query('SELECT * FROM product_springs', (err, result) => {
      if (!err) {
        console.log(result);
        combinedproductData.springs = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })

    // this query will get product category data
    connection.query('SELECT * FROM product_base_size', (err, result) => {
      if (!err) {
        console.log(result);
        combinedproductData.base_size = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })

    //  // this query will get product category data
    //  connection.query('SELECT * FROM product_feet',(err,result)=>{
    //   if(!err){
    //     console.log(result);
    //     combinedproductData.product_feet = result;
    //   }
    //   else{
    //     console.log(err)
    //     res.status(201).json(err)
    //   }
    // })

    // this query will get product category data
    connection.query('SELECT * FROM product_feet', (err, result) => {
      if (!err) {
        console.log(result);
        combinedproductData.product_feet = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })
    // this query will get product category data
    connection.query('SELECT * FROM products_footboards', (err, result) => {
      if (!err) {
        console.log(result);
        combinedproductData.footboards = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })
    // this query will get product category data
    connection.query('SELECT * FROM products_drawers', (err, result) => {
      if (!err) {
        console.log(result);
        combinedproductData.drawers = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })
    // this query will get product category data
    connection.query('SELECT * FROM product_headboard_size', (err, result) => {
      if (!err) {
        console.log(result);
        combinedproductData.headboard_size = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })
    // this query will get product category data
    connection.query('SELECT * FROM product_base_fabcolor', (err, result) => {
      if (!err) {
        console.log(result);
        combinedproductData.base_fab_color = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })
    // this query will get product category data
    connection.query('SELECT * FROM products_headboard_style', (err, result) => {
      if (!err) {
        console.log(result);
        combinedproductData.headboard_style = result;
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
      res.send(combinedproductData);
      // console.log("...................");
      // console.log(combinedproductData);
    })
  })
}

//Add Varient API...
exports.storeproduct = async (req, res) => {
  const product = JSON.parse(req.body.product);
  const productGroup = JSON.parse(req.body.product_group);


  let insertedId;

  const { Category, Name, Code, Description, GroupName, GroupCode, group, MattressSizes, Springs, BaseSizes, BaseFabricColour, FeetOption, FootBoard, Drawers, HeadboardSizes, HeadboardColur } = product;


  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      'INSERT INTO products (category, name, description,group_name, group_code, product_code, code, mat_size, springs, base_fab_color, feet_options, foot_board, drawers, baseSizes, headboardSizes, headboardColor) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
      [Category, Name, Description, GroupName, GroupCode, group, Code, `${MattressSizes.map((item) => item.id)}`, `${Springs.map((item) => item.id)}`, `${BaseFabricColour.map((item) => item.id)}`, `${FeetOption.map((item) => item.id)}`, `${FootBoard.map((item) => item.id)}`, `${Drawers.map((item) => item.id)}`, `${BaseSizes.map((item) => item.id)}`, `${HeadboardSizes.map((item) => item.id)}`, `${HeadboardColur.map((item) => item.id)}`],
      (err, result) => {
        if (err) {
          // Handle the error
          console.error(err);
          res.status(201).json(err);
          connection.release();
          return;
        }
        // fetch the generated id
        insertedId = result.insertId;
        console.log('Inserted ID:', insertedId);

        // Update group_id with the fetched id
        connection.query(
          'UPDATE products SET group_id = ? WHERE id = ?',
          [insertedId, insertedId],
          (err, result) => {
            if (err) {
              console.error(err);
              res.status(201).json(err);
              connection.release();
              return;
            } else {
              console.log('Group ID updated successfully');
              // res.status(200).json(result);
              // connection.release();
              addvariationdata(insertedId)
            }
          }
        )
      }
    )
    function addvariationdata(insertedId) {
      let count = 0
      try {
        for (const data of productGroup) {
          connection.query(`INSERT INTO products_variations (name, description, group_code, group_id, code, mat_size, springs, baseSizes, base_fab_color, feet_options, foot_board, include_footboard, drawers,headboardSizes, headboardColor ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [data.variationName,
             data.variationDescription, GroupName, insertedId, data.variationcode, data.MattressSizeGroup, data.SpringGroup, data.BaseSizesGroup, data.BaseFabricColourGroup, data.FeetOptionGroup, data.FootBoardGroup, data.IsFootboard, data.DrawersGroup, data.HeadboardSizesGroup, data.HeadboardColurGroup],
            (err, result) => {
              if (err) {
                // Handle the error
                console.error(err);
                // res.status(201).json(err);
                return;
              } else {
                // count++
                // console.log(count)
              }
            }
          )
        }
        fetchlatestData(insertedId);
        // connection.release();
        // res.status(200).json("data inserted successfully")
      } catch (error) {
        res.status(201).json(error);
      }
    }

    function fetchlatestData(insertedId) {
      connection.query(`SELECT * FROM products_variations WHERE group_id = ?`, [insertedId],
        (err, result) => {
          if (err) {
            // Handle the error
            console.error(err);
            res.status(201).json(err);
            return;
          } else {
            res.status(200).json(result);
            // console.log(result)
          }
        })
    }
  });

}


//to delete variation 
// exports.deleteVariant = async (req, res) => {
//   console.log(req.body)
//   const itemIDs = req.body.items.split(", ");
//   console.log(itemIDs)
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     for (const id of itemIDs) {
//       console.log(id);
//       connection.query(
//         `DELETE FROM products_variations WHERE id = ${id}`,
//         (err, result) => {
//           if (!err) {
//             console.log('Deleted:', id);
//           } else {
//             // res.status(500).json(err); // Use appropriate status code for error
//             console.log(err);
//           }
//         }
//       );
//     }
//     connection.release(); // Release the connection outside the loop
//     res.status(200).json("deleted");
//   });
// };
exports.deleteVariant = async (req, res) => {
  console.log(req.body)
  const { items } = req.body
  console.log(items);
  // const values =  req.body.split(",");
  pool.getConnection((err, connection) => {
    if (err) throw err;
    for (const data of items) {
      connection.query(
        'DELETE FROM products_variations WHERE id = ?',
        [data],
        (err, result) => {
          if (!err) {
            console.log('deleted')
          } else {
            res.status(201).json(err);
            console.log(err);
          }
        }
      );
    }
    connection.release(response.res); // Release the connection outside the loop
    res.status(200).json("deleted");

  });
}



//to edit variation
exports.variationEdit = async (req, res) => {
  console.log("req.body", req.body);
  console.log("Called...............");
  const { value, code, id, isVariation } = req.body;
  console.log(value);
  console.log(code);
  console.log(id);

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Failed to connect to the database.");
    }

    // Use the SELECT query to check if another record with the same code and a different id exists
    connection.query(
      `SELECT * FROM ?? WHERE code = ? AND id <> ?`,
      [isVariation, code, id],
      (err, results) => {
        if (err) {
          connection.release();
          console.log(err);
          return res.status(500).send("Database error.");
        }

        if (results.length === 0) {
          // If no record with the same code and a different id exists, proceed with the UPDATE query
          connection.query(
            `UPDATE ?? SET value = ?, code = ? WHERE id = ?`,
            [isVariation, value, code, id],
            (err, result) => {
              connection.release();
              if (err) {
                console.log(err);
                return res.status(500).send("Database error.");
              }
              return res.json('edited');
            }
          );
        } else {
          // If a record with the same code and a different id exists, send an error response
          connection.release();
          return res.status(200).json("true");
        }
      }
    );
  });
};

// exports.variationEdit = variationEdit;


// exports.variationEdit = variationEdit;


// exports.variationEdit = variationEdit;





//to Select variation delete by 
// exports.selectVariationDelete = async (req, res) => {
//   // const variationid = req.params.id;
//   // const category = req.body.category;
//   console.log(req.body);
//   const { variation} = req.body;
//   // // const itemid =
//   const {id, columnName, value } = req.body.ItemId;
//   console.log(id, columnName, value)
//   pool.getConnection((err, connection) => {
//     if (err) throw err
//     connection.query(`DELETE from ${variation} WHERE id = ?`, [id], (err, result) => {
//       if (!err) {
//         res.json('deleted')
//         console.log('The data from users table are: \n', result)
//         // console.log('The data from users table are: \n', result)
//       } else {
//         console.log(err)
//         res.status(201).send(err)
//       }
//     })

//     connection.query(`UPDATE products SET ${columnName} = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', ${columnName} , ','), ',?,', ',')) WHERE FIND_IN_SET('?', ${columnName}) > 0 `, [id, id], (err, result) => {
//       if (!err) {
//         // console.log('The data from users table are: \n', result)
//       } else {
//         console.log(err)
//         res.status(201).send(err)
//       }
//     })

//     connection.query(`DELETE from products_variations WHERE ${columnName} = ?`, [value], (err, result) => {
//       connection.release()
//       if (!err) {
//         // console.log('The data from users table are: \n', result)
//         res.json('deleted')
//       } else {
//         console.log(err)
//         res.status(201).send(err)
//       }
//     })
//   })
// }
exports.selectVariationDelete = async (req, res) => {
  try {
    const { variation } = req.body;
    const { id, columnName, value } = req.body.ItemId;

    pool.getConnection((err, connection) => {
      if (err) throw err;

      connection.query(`DELETE from ${variation} WHERE id = ?`, [id], (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          console.log('The data from users table are: \n', result);
          connection.query(
            `UPDATE products SET ${columnName} = TRIM(BOTH ',' FROM REPLACE(CONCAT(',', ${columnName} , ','), ',?,', ',')) WHERE FIND_IN_SET('?', ${columnName}) > 0 `,
            [id, id],
            (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).send(err);
              } else {
                connection.query(`DELETE from products_variations WHERE ${columnName} = ?`, [value], (err, result) => {
                  connection.release();
                  if (err) {
                    console.log(err);
                    res.status(500).send(err);
                  } else {
                    res.json('deleted');
                  }
                });
              }
            }
          );
        }
      });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};


//get Product details
exports.ViewVarient = async (req, res) => {
  // res.send("asdasnd")
  const category = req.body.category;
  console.log(req.body)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`SELECT * FROM ${category}`, (err, result) => {
      connection.release()

      if (!err) {
        res.status(203).json(result)
      } else {
        console.log(err)
      }
    })
  })
}

//to fetch variation details when user clicks from all products

exports.fetchVariationsDetails = async (req, res) => {
  const ID = req.body.id;
  console.log(ID)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`SELECT * FROM products_variations where group_id = ?`, [ID], (err, result) => {
      connection.release()
      if (!err) {
        res.status(200).json(result)
        console.log(result);
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
  })
}


//to delete product and its all variations
exports.deleteProductWithvariation = async (req, res) => {
  const ID = req.body.itemid;
  console.log(ID)
  let resultvalues = { prodcts: "", prodcts_variations: "" };
  pool.getConnection((err, connection) => {
    if (err) throw err
    try {
      connection.query(`DELETE FROM products WHERE id = ?`, [ID], (err, result) => {
        if (!err) {
          // res.status(200).json(result)
          console.log(result);
          resultvalues.prodcts = "deteted";
        } else {
          console.log(err)
          res.status(201).json(err);
        }
      })
      connection.query(`DELETE FROM products_variations where group_id = ?`, [ID], (err, result) => {
        connection.release()
        if (!err) {
          resultvalues.prodcts_variations = "deteted";
          console.log(result);
        } else {
          console.log(err)
          res.status(201).json(err);
        }
        res.status(200).json(resultvalues);
      })
    } catch (error) {
      res.status(201).json(error);
    }
  })

}
//to delete order from the cart
exports.deleteCartOrder = async (req, res) => {
  console.log(req.body)
  const { orderID } = req.body
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('DELETE FROM cart_orders WHERE id = ?', [orderID], (err, result) => {
      connection.release()
      if (!err) {
        res.status(200).json(result)
        console.log("deleted")
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })
  })
}

//to fetch product details when its clicked to edit 

exports.getEditproductDetail = async (req, res) => {
  const ID = req.body.Id;
  console.log(ID)
  let productVariationsdata = {};
  let productData = { singleProductData: [], VariationsData: [] }
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`SELECT * FROM products where id = ?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.product = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT DISTINCT pms.* FROM products p INNER JOIN product_mat_size pms ON FIND_IN_SET(pms.id, p.mat_size) WHERE p.id = ?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.matsizeData = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT DISTINCT ps.* FROM products p INNER JOIN product_springs ps ON FIND_IN_SET(ps.id, p.springs) WHERE p.id = ?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.springs = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT DISTINCT pbf.* FROM products p INNER JOIN product_base_fabcolor pbf ON FIND_IN_SET(pbf.id, p.base_fab_color) WHERE p.id = ?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.base_fab_color = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT DISTINCT pf.* FROM products p INNER JOIN product_feet pf ON FIND_IN_SET(pf.id, p.feet_options) WHERE p.id = ?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.feet_options = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT DISTINCT fb.* FROM products p INNER JOIN products_footboards fb ON FIND_IN_SET(fb.id, p.foot_board) WHERE p.id = ?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.foot_board = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT DISTINCT pd.* FROM products p INNER JOIN products_drawers pd ON FIND_IN_SET(pd.id, p.drawers) WHERE p.id =?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.drawers = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT DISTINCT pbs.* FROM products p INNER JOIN product_base_size pbs ON FIND_IN_SET(pbs.id, p.baseSizes) WHERE p.id = ?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.baseSizes = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT DISTINCT hbs.* FROM products p INNER JOIN product_headboard_size hbs ON FIND_IN_SET(hbs.id, p.headboardSizes) WHERE p.id = ?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.headboardSizes = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT DISTINCT phs.* FROM products p INNER JOIN products_headboard_style phs ON FIND_IN_SET(phs.id, p.headboardColor) WHERE p.id = ?`, [ID], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        productVariationsdata.headboardColor = result
        productData = { ...productData, singleProductData: productVariationsdata }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT * FROM products_variations where group_id = ?`, [ID], (err, result) => {
      connection.release()
      if (!err) {
        // res.status(200).json(result)
        productData = { ...productData, VariationsData: result }

      } else {
        console.log(err)
        res.status(201).json(err);
      }
      res.status(200).json(productData);
    })
  })
}

//to store edited product Variations 
exports.updateProductVariation = async (req, res) => {

  JSON.parse(req.body.deletedValuesdata);
  const deletedvariations = JSON.parse(req.body.deletedValuesdata);
  const Addedvariations = JSON.parse(req.body.AddedValuesdata);
  const { id, Category, Group_id, Name, Code, Description, MattressSizes, Springs, BaseSizes, BaseFabricColour, FeetOption, FootBoard, Drawers, HeadboardSizes, HeadboardColur } = JSON.parse(req.body.product);

  pool.getConnection((err, connection) => {
    if (err) throw err;
    try {
      connection.query(
        'UPDATE products SET category=?, name=?, description=?, code=?, mat_size=?, springs=?, base_fab_color=?, feet_options=?, foot_board=?, drawers=?, baseSizes=?, headboardSizes=?, headboardColor=? WHERE id=?',
        [Category, Name, Description, Code, `${MattressSizes.map((item) => item.id)}`, `${Springs.map((item) => item.id)}`, `${BaseFabricColour.map((item) => item.id)}`, `${FeetOption.map((item) => item.id)}`, `${FootBoard.map((item) => item.id)}`, `${Drawers.map((item) => item.id)}`, `${BaseSizes.map((item) => item.id)}`, `${HeadboardSizes.map((item) => item.id)}`, `${HeadboardColur.map((item) => item.id)}`, id],
        (err, result) => {
          if (err) {
            // Handle the error
            console.error(err);
            res.status(201).json(err);
            connection.release();
            return;
          }
          else {
            // res.status(200).json(result);
            // console.log(result)
          }
        })
      connection.query(
        'UPDATE products_variations SET name=?, description=?',
        [Name, Description, id],
        (err, result) => {
          if (err) {
            // Handle the error
            console.error(err);
            res.status(201).json(err);
            connection.release();
            return;
          }
          else {
            // res.status(200).json(result);
            // console.log(result)
          }
        })

      try {
        if (Addedvariations.length > 0) {
          for (const data of Addedvariations) {
            connection.query(`INSERT INTO products_variations (name, description, group_id, code, mat_size, springs, baseSizes, base_fab_color, feet_options, foot_board, include_footboard, drawers,headboardSizes, headboardColor ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`, [data.variationName, data.variationDescription, id, data.variationcode, data.MattressSizeGroup, data.SpringGroup, data.BaseSizesGroup, data.BaseFabricColourGroup, data.FeetOptionGroup, data.FootBoardGroup, data.IsFootboard, data.DrawersGroup, data.HeadboardSizesGroup, data.HeadboardColurGroup],
              (err, result) => {
                if (err) {
                  // Handle the error
                  console.error(err);
                  // res.status(201).json(err);
                  return;
                } else {
                  //
                }
              }
            )
          }
        }
        if (deletedvariations.length > 0) {
          for (const data of deletedvariations) {
            connection.query(`DELETE FROM products_variations where id = ?`, [data.id], (err, result) => {
              if (!err) {
                // console.log(result);
              } else {
                console.log(err)
                res.status(201).json(err);
              }
            })
          }
        }
        // connection.release();
        res.status(200).json("data inserted successfully")
      } catch (error) {
        res.status(201).json(error);
      }
    } catch (error) {
      res.status(201).json(error);
    }
  })
}



//to fetch order details when user clicks from all orders

exports.fetchOrderDetails = async (req, res) => {
  const ID = req.body.id;
  console.log(ID, "done")
  let productOrderdata = {};
  let orderData = { singleOrderData: [], OrderData: [] }
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`SELECT * FROM orders where order_id = ?`, [ID], (err, result) => {
      connection.release()
      if (!err) {
        // res.status(200).json(result)
        productOrderdata.product = result
        orderData = { ...orderData, singleOrderData: productOrderdata }
        console.log(result);
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.query(`SELECT * FROM cart_product where order_id = ?`, [ID], (err, result) => {
      if (!err) {
        productOrderdata.productOrder = result
        orderData = { ...orderData, singleOrderData: productOrderdata }
        res.status(200).json(orderData)
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
  })
}

//jigar
// new api for orders module
//to fetch cart single product data
exports.fetchorderedProducts = async (req, res) => {
  const ID = req.body.id;
  // let productVariationsdata = {};
  let productData = { addressData: [], orderData: [] }
  pool.getConnection((err, connection) => {
    connection.query(`SELECT cart_orders.*, customers.id AS customer_id, DATE_FORMAT(cart_orders.del_date, '%Y-%m-%d') AS formatted_del_date,  DATE_FORMAT(cart_orders.load_date, '%Y-%m-%d') AS formatted_load_date FROM cart_orders JOIN customers ON cart_orders.cus_id = customers.reference WHERE cart_orders.id = ?`,[ID], (err, result) => {
      connection.release()
      if (!err) {
        getaddress(result)
        // res.status(200).json(result)
        productData = { ...productData, orderData: result }
      } else {
        console.log(err)
        res.status(201).json(err);
      }
      // res.status(200).json(productData);
    })
  })
  const getaddress = (result) => {
    pool.getConnection((err, connection) => {
      connection.query(`SELECT id, address_1, address_2, address_3, address_4 FROM customer_delivery_addresses WHERE customer_id = ?`, [result[0].customer_id], (err, result) => {
        connection.release()
        if (!err) {
          console.log(result);
          productData = { ...productData, addressData: result }
          res.status(200).json(productData)
        } else {
          console.log(err)
          res.status(201).json(err);
        }
      })
    })
  }
}

//to fetch cart products data
exports.fetchcartproductData = async (req, res) => {
  const ID = req.body.id;
  pool.getConnection((err, connection) => {
    connection.query(`SELECT * FROM cart_product where order_id = ?`, [ID], (err, result) => {
      connection.release()
      if (!err) {
        res.status(200).json(result)
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
  })
}

exports.saveChangesLogs = async (req, res) => {
  console.log(req.body)
  const { date , userID, orderID, change_type, reason} = req.body.userInfo || {};
  const { change_type: deleteProductChangeType, reason: deleteProductReason } = req.body.deletproductInfo || {};
  const { change_type: AddedPRoductType, reason: AddedProductReason, orderID: oldAddedID, userID: oldUserID } = req.body.addedProductInfo || {};
  const { code } = req.body.deleteproduct || {};
  const { code : AddedProductCode } = req.body.AddedPRoduct || {};
  const logsValues = req.body.changeLogs;

  try {
    pool.getConnection((err, connection) => {
    if(logsValues){
      console.log('called1')
      for (const data of logsValues) {
        connection.query(
          `INSERT INTO changes_logs (order_id, product_id , filed_name, old_value, new_value, agent_name, change_type, reason) VALUES (?,?,?,?,?,?,?,?)`,
          [orderID, data.code, data.field, data.oldValue, data.newValue, userID, change_type, reason]
        );
      }
    }

    if (req.body.deleteproduct || req.body.deletproductInfo) {
      console.log('called2');
      connection.query(
        `INSERT INTO changes_logs (order_id, product_id, agent_name, change_type, reason) VALUES (?,?,?,?,?)`,
        [orderID, code, userID, deleteProductChangeType, deleteProductReason]
      );
    }
    if (req.body.AddedPRoduct || req.body.addedProductInfo) {
      console.log('called2');
      connection.query(
        `INSERT INTO changes_logs (order_id, product_id, agent_name, change_type, reason) VALUES (?,?,?,?,?)`,
        [oldAddedID, AddedProductCode, oldUserID, AddedPRoductType, AddedProductReason]
      );
    }
    connection.release();
    res.send("done");
  })

  } catch (err) {
    console.error(err);
    res.status(201).json({ error: "An error occurred" });
  }
};


// delete product from cart edit order product
exports.deleteOrderProduct = async (req, res) => {
  console.log(req.body)
  const { orderID } = req.body
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('DELETE FROM cart_product WHERE id = ?', [orderID], (err, result) => {
      connection.release()
      if (!err) {
        res.status(200).json(result)
        console.log("deleted")
      }
      else {
        console.log(err)
        res.status(201).json(err)
      }
    })
  })
}



//to fetch cart products data
exports.fetchLogs = async (req, res) => {
  const ID = req.body.id;
  console.log(ID)
  if (ID) {
    pool.getConnection((err, connection) => {
      connection.query(`SELECT changes_logs.*, users.first_name FROM changes_logs JOIN users ON changes_logs.agent_name = users.id WHERE changes_logs.order_id = ?`, [ID], (err, result) => {
        connection.release()
        if (!err) {
          res.status(200).json(result)
        } else {
          console.log(err)
          res.status(201).json(err);
        }
      })
    })
  }
}


//to fetch cart products data
exports.updateCartData = async (req, res) => {
  const { cus_po_num, sub_total, VAT, total_amount, id, load_date, del_date, discount, os_ref, formatted_load_date, formatted_del_date , address } = req.body.singleorder
  console.log(id, os_ref);
  console.log(req.body);
  const cartProducts = req.body.productsData
  // const totalPrice = req.body.totalPrice;
  let totalPrice = 0; // Initialize the totalPrice to zero

  for (const data of cartProducts) {
    // Calculate the discounted unit price for each product
    const discountedUnitPrice = (data.unit_price * (1 - data.discount / 100)*data.quantity);
    // Add the discounted unit price to the totalPrice
    totalPrice += discountedUnitPrice;
  }
  totalPrice = (totalPrice * (1 + VAT / 100)).toFixed(2);
  console.log(totalPrice);
  // console.log(cartProducts);


  pool.getConnection((err, connection) => {
    // connection.query('SELECT id  FROM cart_orders WHERE os_ref = ?', [os_ref], (err, result) => {
    connection.query(`SELECT id FROM cart_orders WHERE os_ref = ?`, [os_ref], (error, result)=>{
      if (!err && result.length > 0 && result[0].id !== id){
        console.log(result[0].id);
        console.log(id);
        console.log(result[0].id == id);
        console.log("...................");
        connection.release()
        res.status(200).json(true);
      }
      else{
        connection.query(`UPDATE cart_orders SET cus_po_num = ? ,load_date = ? ,del_date = ? ,sub_total = ? , discount = ? , VAT =  ?,os_ref = ?  , total_amount = ? , address = ? WHERE id = ?`, [cus_po_num, formatted_load_date, formatted_del_date, sub_total, discount, VAT, os_ref, totalPrice, address, id], (err, result) => {
          if (!err) {
            // res.status(200).json(result)
          } else {
            console.log(err)
            res.status(201).json(err);
          }
        })
        for (const data of cartProducts) {
          connection.query(`UPDATE cart_product SET product_po = ? ,quantity = ? ,discount = ? ,unit_price = ? WHERE id = ?`, [data.product_po, data.quantity, data.discount, data.unit_price, data.id], (err, result) => {
            if (!err) {
              // res.status(200).json(result)
            } else {
              console.log(err)
              res.status(201).json(err);
            }
          })
        }
        connection.release()
        res.status(200).json("update")
      }

    })
  
   

  })
}

//to Show all variations for selected Customer
// exports.showProducts = async (req, res) => {
//   const ID = req.body.id;
//   let itemid = [];

//   try {
//     const result = pool.query(
//       `SELECT ss.itemID, ss.Code, sp.price FROM customers c JOIN sage_price sp ON c.id = sp.customerId JOIN sage_stock ss ON sp.itemId = ss.itemID WHERE c.id = ${ID}`,
//     );
//     console.log(result);
//     // const priceData = result.recordset || [];

//     // priceData.forEach((item) => {
//     //   if (!itemid.includes(item.Code)) {
//     //     itemid.push(item.Code);
//     //   }
//     // });

//     // pool.getConnection((err, connection) => {
//     //   if (err) throw err;
//     //   connection.query(
//     //     `SELECT name FROM products_variations WHERE code IN ?`,
//     //     [itemid],
//     //     (err, result) => {
//     //       connection.release();
//     //       if (!err) {
//     //         console.log(result);
//     //         console.log('This is..................');
//     //       } else {
//     //         console.log(err);
//     //       }
//     //     }
//     //   );
//     // });
//   } catch (err) {
//     // console.log(err);
//   }
// };

//to Show all Product Group based on Category
exports.selectCategory = async (req, res) => {
  const ID = req.body.id;
  if (ID) {
    pool.getConnection((err, connection) => {
      connection.query(`SELECT group_id,name,code FROM products WHERE category = ?`, [ID], (err, result) => {
        console.log(result);
        connection.release()
        if (!err) {
          res.status(200).json(result)
        } else {
          console.log(err)
          res.status(201).json(err);
        }
      })
    })
  }
}

//to fetch variation details when user clicks from all products

exports.fetchColorsDetails = async (req, res) => {
  const ID = req.body.id;
  console.log(ID)
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`SELECT * FROM product_color where group_id = ?`, [ID], (err, result) => {
      connection.release()
      if (!err) {
        res.status(200).json(result)
        console.log(result);
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
  })
}

//to Show all Product Group based on Category
exports.SaveOrderData = async (req, res) => {
  // console.log(req.body.customerDetails)
  // console.log(req.body)
  function generateOrderNumber() {
    const prefix = "S";
    const timestamp = Date.now().toString().slice(-9);
    const orderNumber = prefix + timestamp;
    return orderNumber;
}
  

// Example usage
const uniqueOrderNumber = generateOrderNumber();
  console.log(uniqueOrderNumber);
  console.log(req.body.orderData)
  const orderNum = uniqueOrderNumber;
  // const {cusID , name: customerName, ReferenceID, agentName } = req.body.customerDetails;
  const { cusID, name: customerName, ReferenceID, agentName, OrderID = null } = req.body.customerDetails || {};
  console.log(OrderID)
  console.log("test")
  const { itemID, Code, price, id, name, description, group_id, code, mat_size, springs, base_fab_color, feet_options, foot_board, drawers, baseSizes, headboardSizes, headboardColor, swatch } = req.body.orderData[0];

  console.log(name, Code, price)
  if (req.body) {
    pool.getConnection((err, connection) => {
      const insertProductDatas = (orderID) => {
        connection.query(
          `INSERT INTO cart_product (order_id, product_name, product_code, unit_price, swatch, description, item_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [orderID, name, Code, price, swatch, description, itemID], (err, result) => {
            if (!err) {
              // console.log(result);
              connection.release()
              res.status(200).json(result)
            } else {
              console.log(err)
              res.status(201).json(err);
            }
          })
      }
      if (OrderID === null) {
        connection.query(`INSERT INTO cart_orders (order_number, cus_id, customer_name, agent_id ) VALUES (?,?,?,?)`, [orderNum, ReferenceID, customerName, agentName], (err, result) => {
          // connection.release()
          if (!err) {
            // console.log(result);
            const orderID = result.insertId;
            insertProductDatas(orderID);
            // res.status(200).json(result)
          } else {
            console.log(err)
            res.status(201).json(err);
          }
        })
      } else {
        insertProductDatas(OrderID)
      }

    }
    )
  }
}

// to add color variation
exports.addColorVariation = async (req, res) => {
  console.log(req.body);

  pool.getConnection((err, connection) => {
    connection.query(
      `INSERT INTO product_color (group_id, name, code) VALUES (?,?,?)`,
      [req.body.id, req.body.name, req.body.code],
      (err, result) => {
        if (err) {
          res.status(201).json(err);
          console.error(err);
          return;
        } else {
          connection.release();
          res.status(200).json('succsess');
          // console.log(result);
        }
      }
    );
  });
};


//to delete color variation 
exports.deleteColor = async (req, res) => {
  console.log(req.body)
  const { itemid } = req.body
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('DELETE FROM product_color WHERE id = ?', [itemid], (err, result) => {
      if (!err) {
        res.status(200).json(result)
        console.log('deleted')
        connection.release()
      } else {
        console.log(err)
        res.status(201).json(err)
      }
    })
  })
}

// Assuming you have the 'pool' instance for database connection

exports.placeOrder = async (req, res) => {
  const { id, order_number, status, cus_id, customer_name, agent_id, address, os_ref, cus_po_num, load_date, del_date, sub_total, discount, VAT, total_amount, customer_id } = req.body && req.body;
  console.log(req.body);
  console.log(order_number, cus_id, customer_name, agent_id, del_date, VAT);
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`UPDATE cart_orders SET status = ?  WHERE id = ?`, [0, id], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
        connection.query('INSERT INTO `orders`(`portal_ref_num`, `customer_code`, `customer_name`, `created_by_agent`, `delivery_address`, `promise_delivery_date`, `os_reference`, `customer_id`, `vat`, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [order_number, cus_id, customer_name, agent_id, address, del_date, os_ref, customer_id ,VAT, total_amount], (err, result) => {
          // connection.query('INSERT INTO `orders`(`portal_ref_num`, `customer_code`, `customer_name`, `created_by_agent`, `delivery_address`, `promise_delivery_date`, `os_reference`, `vat`, `price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [order_number, cus_id, customer_name, agent_id, "BT41 1AE", del_date, cus_id, VAT, total_amount], (err, result) => {
          //replace address with actual variable currently is static address because it cant be null
          if (!err) {
            res.status(200).json(result)
            connection.release()
          } else {
            console.log(err)
            res.status(201).json(err)
          }
        })
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })

  })
}


exports.ViewDetails = async (req, res) => {
  const { portal_ref_num } = req.body;
  const query = `
    SELECT
      users.email,
      orders.*,
      cart_orders.*,
      cart_product.*
    FROM
      cart_orders
      LEFT JOIN orders ON cart_orders.order_number = orders.portal_ref_num
      LEFT JOIN cart_product ON cart_orders.id = cart_product.order_id
      LEFT JOIN users ON cart_orders.agent_id = users.id
    WHERE
      orders.portal_ref_num = ?;
  `;

  const orderNumber = portal_ref_num;

  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'Database connection error' });
      return;
    }

    connection.query(query, [orderNumber], (err, results) => {
      connection.release();
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Database query error' });
        return;
      }

      if (results.length === 0) {
        res.status(404).json({ message: 'Order not found' });
        return;
      }

      let completeOrderDetails = {
        email: results[0].email,
        singleOrderDetails: {
          customer_code: results[0].customer_code,
          customer_name: results[0].customer_name,
          created_by_agent: results[0].created_by_agent,
          delivery_address: results[0].delivery_address,
          promise_delivery_date: results[0].promise_delivery_date,
          customer_doc_num: results[0].customer_doc_num,
          os_reference: results[0].os_reference,
          load_date: results[0].load_date,
          sub_total: results[0].sub_total,
          discount: results[0].discount,
          VAT: results[0].VAT,
          total_amount: results[0].total_amount,
          creation_date: results[0].creation_date,
          price: results[0].price,
        },
        cartProductDetails: {}, // Object to store cart product details for each cartOrderId
      };

      results.forEach((row) => {
        // Check if cartOrderId exists in cartProductDetails, if not, initialize it as an empty array
        if (!completeOrderDetails.cartProductDetails[row.cartOrderId]) {
          completeOrderDetails.cartProductDetails[row.cartOrderId] = [];
        }

        // Push the current row's cartProduct details to the corresponding cartOrderId array
        completeOrderDetails.cartProductDetails[row.cartOrderId].push({
          productId: row.id,
          product_name: row.product_name,
          product_code: row.product_code,
          product_po: row.product_po,
          quantity: row.quantity,
          discount: row.discount,
          unit_price: row.unit_price,
          // Add other cart product-related properties
        });
      });
      // console.log(completeOrderDetails.singleOrderDetails);
      res.status(200).json(completeOrderDetails);
    });
  });
};

exports.cartId = async (req, res) => {
  const { portal_ref_num } = req.body;
  pool.getConnection((err, connection) => {
    connection.query(`SELECT id FROM cart_orders  WHERE order_number = ?`, [portal_ref_num], (err, result) => {
      if (!err) {
        res.status(200).json(result)
        connection.release()
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
  })
}

//to Get Latest orderDetails
exports.GetColourData = async (req, res) => {

  let ColourData = { colourGroup: [], allColours: [] }

  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query(`SELECT * FROM product_base_fabcolor`, (err, result) => {
      connection.release()
      ColourData = { ...ColourData, colourGroup: result }
      getallColours();
    })
  })

  const getallColours = () => {
    pool.getConnection((err, connection) => {
      connection.query(`SELECT * FROM product_color`, (err, result) => {
        connection.release()
        if (!err) {
          console.log(result);
          ColourData = { ...ColourData, allColours: result }
          console.log(".................");
          console.log(ColourData);
          console.log("...................");
          res.status(200).json(ColourData)
        } else {
          console.log(err)
          res.status(201).json(err);
        }
      })
    })
  }

}


// exports.RemoveProduct = async (req, res) => {
//   console.log('remove product', req.params)
//   pool.getConnection((err, connection) => {
//     if (err) throw err
//     connection.query('DELETE FROM `orders` WHERE product_id=?', [req.params.id], (err, result) => {
//       connection.release()
//       if (!err) {
//         res.status(203).json(result)
//       }
//       else {
//         console.log(err)
//       }
//     })
//   })
// }

exports.orderDelete = async (req, res) => {
  console.log("remove item from order", req.body)
  const id = req.body.id
  const order_id = req.body.order_id
  console.log("body", req.body)
  pool.getConnection((err, connection) => {
    if (err) throw err

    try {
      connection.query('DELETE from `orders` where order_id = ?', [order_id], (err, result) => {
        if (!err) {
          // res.status(200).json(result)
          console.log("data deleted orders from orders table", order_id)
        }
        else {
          res.status(201).json(err)
        }
      })


      connection.query('DELETE from `cart_orders` where id = ?', [id], (err, result) => {
        if (!err) {
          console.log("data deleted from cart_orders table", id)
        }
        else {
          res.status(201).json(err)

        }
      })


      connection.query('DELETE from `cart_product` where order_id = ?', [order_id], (err, result) => {
        if (!err) {
          console.log("data delete from cart_product table", order_id)

        }
        else {
          res.status(201).json(err)

        }
      })


      connection.query('DELETE from `changes_logs` where order_id = ?', [order_id], (err, result) => {
        if (!err) {
          connection.release()
          console.log("data deleted from changes_log table", order_id)
        }
        else {
          res.status(201).json(err)

        }
      })
      res.status(200).json("Deleted")
    } catch (error) {
      res.status(201).json(error)
    }
  })
}

// to update placed order
exports.updateDashboardData = async (req, res) => {
  const { order_number, formatted_del_date, address, os_ref } = req.body.singleorder
  console.log("--------------------------------------");
  console.log(order_number, formatted_del_date, address);

  pool.getConnection((err, connection) => {
    connection.query(`UPDATE orders SET promise_delivery_date = ? , delivery_address = ? ,os_reference = ? WHERE portal_ref_num = ?`, [formatted_del_date, address, os_ref, order_number], (err, result) => {
      if (!err) {
        // res.status(200).json(result)
      } else {
        console.log(err)
        res.status(201).json(err);
      }
    })
    connection.release()
    res.status(200).json("update")

  })
}

//to Get Latest orderDetails
exports.fetchOrderDataToPush = async (req, res) => {
  const orderDataArray = req.body;
  const orderResults = [];

  try {
    for (const { productIDs, orderID } of orderDataArray) {
      const OrderData = { singleOrder: {}, orderProducts: {} };
      
      const singleOrder = await executeQuery(`SELECT co.*, o.customer_id FROM cart_orders AS co CROSS JOIN orders AS o WHERE co.id = ${productIDs} AND o.order_id = ${orderID};`);
      OrderData.singleOrder = singleOrder[0];

      const orderProducts = await executeQuery(`SELECT * FROM cart_product WHERE order_id = ${productIDs}`);
      console.log(orderID)
      OrderData.orderProducts = orderProducts;

      console.log(orderProducts)
      orderResults.push(OrderData);
    }

    res.status(200).json(orderResults);
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
    // res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

// A helper function to execute a query and return a promise
function executeQuery(query) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(query, (err, result) => {
          connection.release();
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      }
    });
  });
}

exports.allOrderDelete = async (req, res) => {
  // console.log("remove item from order", req.body)
  const order_id = req.body
  console.log("body", order_id)
  pool.getConnection((err, connection) => {
    if (err) throw err

    try {
      for(const { orderID } of order_id) {
        console.log(orderID);
        connection.query('DELETE from `orders` where order_id = ?', [orderID], (err, result) => {
          if (!err) {
            // res.status(200).json(result)
            // console.log("data deleted orders from orders table")
          }
        })


        connection.query('DELETE from `cart_orders` where id = ?',[orderID], (err, result) => {
          if (!err) {
            // console.log("data deleted from cart_orders table")
          }

        })


        connection.query('DELETE from `cart_product` where order_id = ?', [orderID], (err, result) => {
          if (!err) {
            // console.log("data delete from cart_product table")

          }

        })


        connection.query('DELETE from `changes_logs` where order_id = ?', [orderID], (err, result) => {
          if (!err) {
            // console.log("data deleted from changes_log table")
          }

        })
      }
      res.status(200).json("Deleted")
    } catch (error) {
      res.status(201).json(error)
    }
  })
}