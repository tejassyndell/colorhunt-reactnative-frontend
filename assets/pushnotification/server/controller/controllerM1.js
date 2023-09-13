/* eslint-disable */
const xmlrpc = require('xmlrpc')
const nodemailer = require('nodemailer');
const axios = require('axios');
const {promisify } = require('util');
const admin = require('firebase-admin');
const url = 'https://techultra-mahadev-16.odoo.com'
const db = 'techultra-mahadev-16-production-7083629'
const username = 'app@shreemahadevtex.com'
const password = 'syndell$17523'
const uid = 26
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add any other Firebase configuration options here
});
//login auth new by sarans
exports.loginAuth = async (req, res) => {
  const phone = req.body.phone
  const formate = req.body.formate

  const mobile = `91${phone}`;
  const number = parseInt(mobile)
  const MSG91_AUTH_KEY = '207228ABxH67XR5ef2da49P1';
  const MSG91_API_URL = 'https://api.msg91.com/api/v5/otp';
  const OTP_TEMPLATE_ID = '6475eae5d6fc050374184c14';


  async function sendOTP(number) {

  }


  sendOTP(number);

  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  }

  const modelsClient = xmlrpc.createSecureClient(modelsConfig)

  const searchParams = [
    db,
    uid,
    password,
    'res.partner',
    'search',
    [[['mobile', 'like', `${formate}`]]],
  ]

  modelsClient.methodCall('execute_kw', searchParams, (error, ids) => {

    if (ids.length > 0) {
      try {
        const response = axios.post(MSG91_API_URL, {
          template_id: OTP_TEMPLATE_ID,
          mobile: number,
          otp_expiry: 55,
        }, {
          headers: {
            'authkey': MSG91_AUTH_KEY,
            'Content-Type': 'application/json'

          }
        });
        if (response) {
          // console.log(response.data, "msg data")
          res.status(200).json(ids)
        }

        // console.log('OTP sent successfully!', response.data);
      } catch (error) {
        console.error('Failed to send OTP:', error.response.data);
      }

    } else {
      const modelsClient = xmlrpc.createSecureClient(modelsConfig)

      const searchParams = [
        db,
        uid,
        password,
        'res.partner',
        'search',
        [[['mobile', 'like', `${phone}`]]],
      ]

      modelsClient.methodCall('execute_kw', searchParams, (error, ids) => {
        if (ids.length > 0) {
          try {
            const response = axios.post(MSG91_API_URL, {
              template_id: OTP_TEMPLATE_ID,
              mobile: number,
              otp_expiry: 55,
            }, {
              headers: {
                'authkey': MSG91_AUTH_KEY,
                'Content-Type': 'application/json'

              }
            });
            if (response) {
              // console.log(response.data, "msg data")
              res.status(200).json(ids)
            }

            // console.log('OTP sent successfully!', response.data);
          } catch (error) {
            console.error('Failed to send OTP:', error.response.data);
          }

        } else {
          res.status(210).json("failed")
        }
      })

    }
  })


}

// exports.loginAuth = async (req, res) => {
//   const phone = req.body.phone
//   const formate = req.body.formate
//   const modelsConfig = {
//     url: `${url}/xmlrpc/2/object`,
//   }

//   const modelsClient = xmlrpc.createSecureClient(modelsConfig)

//   const searchParams = [
//     db,
//     uid,
//     password,
//     'res.partner',
//     'search',
//     [[['mobile', 'like', `${formate}`]]],
//   ]

//   modelsClient.methodCall('execute_kw', searchParams, (error, ids) => {
//     if (ids.length > 0) {
//       res.status(200).json(ids)
//     } else {
//       const modelsClient = xmlrpc.createSecureClient(modelsConfig)

//       const searchParams = [
//         db,
//         uid,
//         password,
//         'res.partner',
//         'search',
//         [[['mobile', 'like', `${phone}`]]],
//       ]

//       modelsClient.methodCall('execute_kw', searchParams, (error, ids) => {
//         if (ids.length > 0) {
//           res.status(200).json(ids)
//         } else {
//           res.status(210).json("failed")
//         }
//       })

//     }
//   })


// }
//---------------------new change 28-----------------------

exports.getProductName = async(req,res)=>{
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

      const searchParams = [
        db,
        uid,
        password,
        'product.template',
        'search_read',
        [[['can_publish', '=', true]]],
        {
          'fields': ['name']
        }
      ];

      modelsClient.methodCall('execute_kw', searchParams, (error, productData) => {
        if (error) {
          res.status(210).json("error")
        } else {
          res.status(200).json(productData)

        }
      });
}


exports.getNewImage =async(req,res)=>{
  const {id}=req.body;
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const methodCallPromise = promisify(modelsClient.methodCall).bind(modelsClient);
      const searchParams = [
        db,
        uid,
        password,
        'product.template',
        'search_read',
        [[['id','=',id]]],
        {
          'fields': ['image_1024']
        }
      ];

    try{
      const ids = await methodCallPromise('execute_kw',searchParams)
      res.status(200).json(ids)
    }
    catch(err){
      res.status(500).json('Data not retrieved');
    }
  
}

exports.getDataOfProduct = async (req,res)=>{
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const searchParamsPartner = [db, uid, password, 'product.template', 'search', [[['can_publish', '=', true]]]]
  const products = modelsClient.methodCall('execute_kw', searchParamsPartner, (error, ids) => {
    if (error) {
      console.error('Error:', error);
    } else {

      const searchParams = [
        db,
        uid,
        password,
        'product.template',
        'read',
        [ids],
        { 'fields': ['name', 'product_tag_ids', 'list_price', 'tax_string', 'categ_id', 'image_128', '__last_update', 'write_date', 'sale_ok'] }
      ];

      modelsClient.methodCall('execute_kw', searchParams, (error, productData) => {
        if (error) {
          res.status(210).json("error")
        } else {
          res.status(200).json(productData)

        }
      });
    }
  });
}


exports.serachProduct = async (req, res) => {
  const { query } = req.body;
  // console.log(query);

  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);
  const searchQuery = [['name', 'ilike', query]];
  const searchParams = [
    db,
    uid,
    password,
    'product.template',
    'search_read',
    [searchQuery],
    { fields: ['name', 'product_tag_ids', 'list_price', 'tax_string', 'categ_id', 'image_128', '__last_update', 'write_date', 'sale_ok'] },
  ];
  modelsClient.methodCall('execute_kw', searchParams, (error, result) => {
    if (error) {
      res.status(210).json("error")
    } else {
      res.status(200).json(result);
    }
  });
}
//---------------------new change 28-----------------------


exports.getProduct = async (req, res) => {
  const { page } = req.body;
  const offset = (page - 1) * 20;
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const searchParamsPartner = [
    db,
    uid, password,
    'product.template',
    'search',
    [[['can_publish', '=', true]]],
    { limit: 20, offset: offset }]
  const products = modelsClient.methodCall('execute_kw', searchParamsPartner, (error, ids) => {
    if (error) {
      console.error('Error:', error);
    } else {

      const searchParams = [
        db,
        uid,
        password,
        'product.template',
        'read',
        [ids],
        { 'fields': ['name', 'product_tag_ids', 'list_price', 'tax_string', 'categ_id', 'image_128', '__last_update', 'write_date', 'sale_ok'] }
      ];

      modelsClient.methodCall('execute_kw', searchParams, (error, productData) => {
        if (error) {
          res.status(210).json("error")
        } else {
          res.status(200).json(productData)

        }
      });
    }
  });
}




exports.UserDetails = async (req, res) => {
  const userid = parseInt(req.params.id)
  const commonConfig = {
    url: `${url}/xmlrpc/2/common`,
  };

  const client = xmlrpc.createSecureClient(commonConfig);
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const searchParams = [db, 26, password, "res.partner", "read",
    [userid],
    { 'fields': ['name', 'email', 'contact_address', 'avatar_1024', 'mobile', 'website', 'vat', 'l10n_in_pan'] }
  ];

  modelsClient.methodCall("execute_kw", searchParams, (error, ids) => {
    if (error) {
      res.status(210).json("error")
    } else {
      res.status(200).json(ids)
    }
  });

}

// exports.SendMail = async (req, res) => {
//   const { username, email, subject, message } = req.body;

//   // Send email using nodemailer (replace with your own email sending logic)
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'developersweb003@gmail.com',
//       pass: 'deve@web003#'
//     }
//   });

//   const mailOptions = {
//     from: email,
//     to: 'saranssingh.chauhan@gmail.com',
//     subject: subject,
//     text: `Name: ${username}\nEmail: ${email}\nSubject:${subject}\nMessage: ${message}`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).send('Error sending email');
//     } else {
//       console.log("sent")
//       res.status(200).send('sent');
//     }
//   });

// }

exports.SendMail = async (req, res) => {
  const { username, email, subject, message } = req.body;
  // console.log(username, email, "test")

  try {
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'developersweb001@gmail.com',
        pass: 'mntsgxnagxyluneo'
      }
    });

    // Define email content
    const mailOptions = {
      from: email,
      to: ' saranssingh.chauhan@gmail.com',
      subject: subject,
      text: `Name: ${username}\nEmail: ${email}\nSubject:${subject}\nMessage: ${message}`
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    // console.log('Email sent:', info);

    res.status(200).json('sent');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
}

exports.getOrderDetails = async (req, res) => {
   const userId = parseInt(req.params.id)
  // const userId = 5700
  //const userId = 5679


  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const searchParams = [
    db,
    uid,
    password,
    'sale.order',
    'search_read',
    [[['partner_id', '=', userId]]],
    { fields: ['name', 'date_order', 'amount_total', '__last_update', 'delivery_status'] }
  ];

  modelsClient.methodCall('execute_kw', searchParams, (error, ids) => {
    if (error) {
      res.status(210).json("error")
    } else {
      res.status(200).json(ids)
    }
  });

}

exports.OrderHistory = async (req, res) => {
  //const userId = parseInt(req.params.id)
  const userId = 5700
  //const userId = 5679

  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const searchParams = [
    db,
    26,
    password,
    'sale.order.line',
    'search_read',
    [[['order_partner_id', '=', userId]]],
    { fields: ['id', 'order_id', 'order_partner_id', 'product_uom_qty', 'price_unit', 'price_subtotal', 'name', 'order_id'] }
  ];

  modelsClient.methodCall('execute_kw', searchParams, (error, ids) => {
    if (error) {
      res.status(210).json("error")
    } else {
      res.status(200).json(ids)
    }
  });

}

exports.ProductTagApi = async (req, res) => {

  const productId = parseInt(req.params.id)

  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const searchParams = [db, 26, password, "product.tag", "search_read", [[['product_template_ids', '=', productId]]], { fields: ['name', 'color'] }];

  modelsClient.methodCall("execute_kw", searchParams, (error, ids) => {
    if (error) {
      res.status(500).json("error")
    } else {
      res.status(200).json(ids)
    }
  });
}

exports.ProductColor = async (req, res) => {
  const productName = req.params.name

  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };

  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const searchParams = [db, 26, password, "product.product", "search_read", [[['name', '=', productName]]], { 'fields': ['partner_ref'] }];

  modelsClient.methodCall("execute_kw", searchParams, (error, ids) => {
    if (error) {
      res.status(500).json("error")
      // console.log(ids, "test")
    } else {
      res.status(200).json(ids)
      // console.log(ids, "test")
    }
  });
}

exports.sendOtp = async (req, res) => {
  const phoneNumber = req.params.phone
  const mobile = `91${phoneNumber}`;
  const number = parseInt(mobile)
  const MSG91_AUTH_KEY = '207228ABxH67XR5ef2da49P1';
  const MSG91_API_URL = 'https://api.msg91.com/api/v5/otp';
  const OTP_TEMPLATE_ID = '6475eae5d6fc050374184c14';
  async function sendOTP(number) {
    try {
      const response = await axios.post(MSG91_API_URL, {
        template_id: OTP_TEMPLATE_ID,
        mobile: number,
        otp_expiry: 55,
      }, {
        headers: {
          'authkey': MSG91_AUTH_KEY,
          'Content-Type': 'application/json'

        }
      });

      // console.log('OTP sent successfully!', response.data);
    } catch (error) {
      console.error('Failed to send OTP:', error.response.data);
    }
  }


  sendOTP(number);
}

exports.verifyOtp = async (req, res) => {
  const { phoneNumber, combinedArray } = req.body;
  const intOtp = parseInt(combinedArray)
  const apiKey = '207228ABxH67XR5ef2da49P1';
  const mobile = `91${phoneNumber}`;
  const number = parseInt(mobile)

  // console.log(intOtp, number, "test")

  axios
    .get(`https://api.msg91.com/api/v5/otp/verify?otp=${intOtp}&mobile=${number}`, {
      headers: {
        'Content-Type': 'application/json',
        'authkey': '207228ABxH67XR5ef2da49P1'
      }
    })
    .then(response => {
      res.status(200).send(response.data.type)
      // console.log(response.data, "verified")
    })
    .catch(error => {
      res.status(210).send(response.data.type)
      // console.log(response.data, "verified")

    });
};


exports.resendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  console.log(phoneNumber,"")
  const mobile = `91${phoneNumber}`;
  const number = parseInt(mobile)
  // console.log(number, "phone")

  const url = 'https://control.msg91.com/api/v5/otp/retry';
  const authkey = '207228ABxH67XR5ef2da49P1';
  
 
  
  axios
    .get(url, {
      headers: {
        Accept: 'application/json',
        authkey: authkey
      },
      params: {
        retrytype: 'text',
        mobile: number
      }
    })
    .then(response => {
      // Handle the response data here
      console.log(response.data);
      res.send(response.data)
    })
    .catch(error => {
     res.send(error)
      console.error(error);
    });
  
};



exports.addinwishlist = async (req, res) => {
  const { userid, prdid, prdprice } = req.body;
  // console.log(userid, prdid);
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  }
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);
  const createParams = [
    db,
    uid,
    password,
    'product.wishlist',
    'create',
    [{
      partner_id: userid,
      product_id: prdid,
      // currency_id: 20,
      // pricelist_id: 1,
      // price: prdprice,
      website_id: 1,
    }]

  ];

  modelsClient.methodCall('execute_kw', createParams, (error, ids) => {
    if (error) {
      // console.log(error); // Log the error object for debugging
      res.status(500).json("Error occurred while creating wishlist"); // Provide an appropriate response to the client
    } else {
      res.status(200).json(ids); // Provide a successful response if the wishlist creation is successful
    }
  });

}

// Retrieve the wishlist items of a customer
exports.getWishlistItems = async (req, res) => {
  const { userid } = req.body;
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);
  const methodCallPromise = promisify(modelsClient.methodCall).bind(modelsClient);

  const searchParams = [db, 26, password, 'product.wishlist', 'search_read', [[['partner_id', '=', userid]]],{ fields: [ 'product_id'] }];

  try {
    const ids = await methodCallPromise('execute_kw', searchParams);
    res.status(200).json(ids);
  } catch (error) {
    res.status(500).json('Data not retrieved');
  }

}

// unlink product from wishlist....
exports.unlinkproductwishlist = async (req, res) => {
  const { id } = req.body;
  // const idNumber = Number(id);
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);
  const unlinkParams = [db, uid, password, 'product.wishlist', 'unlink', [[id]],
  ];
  modelsClient.methodCall("execute_kw", unlinkParams, (error, ids) => {
    if (error) {
      console.error('Error:', error);
    } else {
      res.status(200).json(ids)
    }
  });
}

// dashboard unlink product..
exports.unlinkproductdashboard = async (req, res) => {
  const { userid, productid } = req.body;
  // console.log(userid, productid);
  // const uid = Number(userid)
  // const pid = Number(productid);

  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const domain = [['parent_id', '=', userid], ['product_id', '=', productid]];
  const unlinkParams = [
    db,
    uid,
    password,
    'product.wishlist',
    'search',
    [[
      ["partner_id", "=", userid],
      ["product_id", "=", productid],
    ],
    ]];

  modelsClient.methodCall('execute_kw', unlinkParams, (error, ids) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      if (ids.length > 0) {
        const unlinkParams = [
          db,
          uid,
          password,
          'product.wishlist',
          'unlink',
          [ids],
        ];

        modelsClient.methodCall('execute_kw', unlinkParams, (error, result) => {
          if (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.status(200).json(result);
          }
        });
      } else {
        res.status(404).json({ error: 'Product not found in wishlist' });
      }
    }
  });
};

//Get product...

exports.productwishlist = async (req, res) => {
  const { id } = req.body;
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);
  const methodCallPromise = promisify(modelsClient.methodCall).bind(modelsClient);
  const searchParams = [db, uid, password, 'product.template',
    'search_read', [[['id', '=', id]]],
    { 'fields': ['name', 'product_tag_ids', 'list_price', 'tax_string', 'categ_id', 'image_128'] }
  ];
  try {
    const ids = await methodCallPromise('execute_kw', searchParams);
    res.status(200).json(ids);
  } catch (error) {
    res.status(500).json('Data not retrieved');
  }
}

//To get all category name.....
exports.getCategory = async (req, res) => {
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const searchParams = [
    db,
    uid,
    password,
    'product.category',
    'search_read',
    [[]],
    { fields: ['name'] }
  ];

  modelsClient.methodCall('execute_kw', searchParams, (error, categoryData) => {
    if (error) {
      res.status(500).json("Error: Failed to fetch product categories");
    } else {
      const categories = categoryData.map(category => category.name);
      res.status(200).json(categories);
    }
  });

}

//----------------------Add to cart start---------------



exports.createCartData = async (req, res) => {
  const { userId, productId, product_uom_qty, radioval } = req.body;
  // console.log(userId, productId, product_uom_qty, radioval);
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const createOrderParams = [
    db,
    uid,
    password,
    'sale.order',
    'create',
    [
      {
        partner_id: userId,
      },
    ],
  ];

  modelsClient.methodCall('execute_kw', createOrderParams, (orderError, orderId) => {
    if (orderError) {
      console.error('Error creating sale order:', orderError);
      res.status(500).json('Error occurred while creating sale order');
    } else {
      // console.log('Sale order created successfully');
      const createOrderLineParams = [
        db,
        uid,
        password,
        'sale.order.line',
        'create',
        [
          radioval === undefined ?
            {
              order_id: orderId,
              product_id: productId,
              product_uom_qty: product_uom_qty,
            } : {
              order_id: orderId,
              product_id: productId,
              product_uom_qty: product_uom_qty,
              name: radioval
            }
        ],
      ];
      // console.log(createOrderLineParams);
      modelsClient.methodCall('execute_kw', createOrderLineParams, (lineError, lineId) => {
        if (lineError) {
          console.error('Error creating sale order line:', lineError);
          res.status(500).json('Error occurred while creating sale order line');
        } else {
          // console.log('Product added to sale order successfully');
          res.status(200).json({ orderId });
        }
      });
    }
  });
};




//----------------------Add to cart end-----------------
//----------------------update Qty start----------------
exports.updateQty = async (req, res) => {
  const { id, product_uom_qty } = req.body;
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);
  const createOrderLineParams = [
    db,
    uid,
    password,
    'sale.order.line',
    'write',
    [
      [id],
      { product_uom_qty: product_uom_qty },
    ],
  ];

  modelsClient.methodCall('execute_kw', createOrderLineParams, (lineError, lineId) => {
    if (lineError) {
      console.error('Error updateing sale order line:', lineError);
      res.status(500).json('Error occurred while updateing sale order line');
    } else {
      // console.log('Product updated to sale order successfully');
      res.status(200).json('Product updated to sale order successfully');
    }
  });
}
//----------------------update Qty end------------------
//-----------------------Get product from cart start-------------------

exports.getCartData = async (req, res) => {
  const { userId } = req.body;
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  const searchParams = [
    db,
    uid,
    password,
    'sale.order',
    'search_read',
    [[['partner_id', '=', userId], ['state', '!=', 'cancel']]],
    { fields: ['id'] },
  ];

  modelsClient.methodCall('execute_kw', searchParams, (error, orderIds) => {
    if (error) {
      res.status(500).json('Error: Failed to fetch orders');
    } else {
      const orderLineSearchParams = [
        db,
        uid,
        password,
        'sale.order.line',
        'search_read',
        [[['order_id', 'in', orderIds.map(order => order.id)]]],
        { fields: ['name', 'order_id', 'product_id', 'product_uom_qty', 'price_total', 'price_unit'] },
      ];

      modelsClient.methodCall('execute_kw', orderLineSearchParams, (error, orderLines) => {
        if (error) {
          res.status(500).json('Error: Failed to fetch order lines');
        } else {
          const productIds = orderLines.map(orderLine => orderLine.product_id[0]);
          const getProductParams = [
            db,
            uid,
            password,
            'product.template',
            'read',
            [productIds],
            {
              fields: ['name', 'product_tag_ids', 'list_price', 'tax_string', 'categ_id', 'image_128'],
            },
          ];

          modelsClient.methodCall('execute_kw', getProductParams, (error, products) => {
            if (error) {
              res.status(500).json('Error: Failed to fetch product details');
            } else {
              const productMap = new Map();

              orderLines.forEach(orderLine => {
                const productId = orderLine.product_id[0];
                const product = productMap.get(productId);

                if (product) {
                  product.order_lines.push({
                    product_uom_qty: orderLine.product_uom_qty,
                    order_id: orderLine.order_id[0],
                    saleorder: orderLine.id,
                    total: orderLine.price_total,
                    colorname: orderLine.name,
                    price_unit: orderLine.price_unit,
                  });
                } else {
                  const matchingProduct = products.find(p => p.id === productId);

                  if (matchingProduct) {
                    productMap.set(productId, {
                      ...matchingProduct,
                      order_lines: [{
                        product_uom_qty: orderLine.product_uom_qty,
                        order_id: orderLine.order_id[0],
                        saleorder: orderLine.id,
                        total: orderLine.price_total,
                        colorname: orderLine.name,
                        price_unit: orderLine.price_unit,
                      }],
                    });
                  }
                }
              });

              const updatedProducts = Array.from(productMap.values());
              res.status(200).json(updatedProducts);
            }
          });
        }
      });
    }
  });
};


//-----------------------Get product from cart end-------------------


//------------------------Remove product from cart start---------------
exports.cartRemoveItem = async (req, res) => {
  const { saleorderId, order_id } = req.body; // The ID of the sale order line to be removed

  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);
  const searchParamssaleorder = [
    db,
    uid,
    password,
    'sale.order',
    'search',
    [[['id', '=', order_id]]],
  ];

  modelsClient.methodCall('execute_kw', searchParamssaleorder, (error, [lineId]) => {
    if (error) {
      res.status(500).json('Error: Failed to find the sale order line');
    } else {

      const writeParams = [
        db,
        uid,
        password,
        'sale.order',
        'write',
        [[lineId], { 'state': 'cancel' }],
      ];

      modelsClient.methodCall('execute_kw', writeParams, (writeError, result) => {
        if (writeError) {
          res.status(500).json('Error: Failed to remove product from cart');
        } else {
          res.status(200).json('Product removed from cart successfully');
          //     const searchParamsline = [
          //       db,
          //       uid,
          //       password,
          //       'sale.order.line',
          //       'search',
          //       [[['id', '=', saleorderId]]],
          //     ];

          //     modelsClient.methodCall('execute_kw', searchParamsline, (error, [lineId]) => {
          //       if (error) {
          //         res.status(500).json('Error: Failed to find the sale order line');
          //       } else {
          //         const writeParams = [
          //           db,
          //           uid,
          //           password,
          //           'sale.order.line',
          //           'write',
          //           [[lineId], { 'state': 'cancel' }],
          //         ];

          //         modelsClient.methodCall('execute_kw', writeParams, (writeError, result) => {
          //           if (writeError) {
          //             res.status(500).json('Error: Failed to remove product from cart');
          //           } else {
          //             res.status(200).json('Product removed from cart successfully');
          //           }
          //         });
          //       }
          //     });
        }
      });
    }
  });

};

//------------------------Remove product from cart end-----------------




//test//Get the order id on base of userId for cart
exports.getWishlist = async (req, res) => {
  const { userid } = req.body;
  const modelsConfig = {
    url: `${url}/xmlrpc/2/object`,
  };
  const modelsClient = xmlrpc.createSecureClient(modelsConfig);
  const searchParams = [
    db,
    uid,
    password,
    'product.wishlist',
    'search_read',[], { fields: [ 'product_id'] },]
  modelsClient.methodCall('execute_kw', searchParams, (error, products) => {
    if (error) {
      res.status(500).json('Error: Failed to fetch product details');
    } else {
      res.status(200).json(products);
    }
  });
  // const { saleorderId } = req.body; // The ID of the sale order line to be removed

  // const modelsConfig = {
  //   url: `${url}/xmlrpc/2/object`,
  // };
  // const modelsClient = xmlrpc.createSecureClient(modelsConfig);

  // const searchParams = [
  //   db,
  //   uid,
  //   password,
  //   'sale.order.line',
  //   'search',
  //   [[['id', '=', 5752]]],
  // ];

  // modelsClient.methodCall('execute_kw', searchParams, (searchError, [lineId]) => {
  //   if (searchError) {
  //     res.status(500).json('Error: Failed to find the sale order line');
  //   } else {
  //     const writeParams = [
  //       db,
  //       uid,
  //       password,
  //       'sale.order.line',
  //       'write',
  //       [[lineId], { 'state': 'cancel' }],
  //     ];

  //     modelsClient.methodCall('execute_kw', writeParams, (writeError, result) => {
  //       if (writeError) {
  //         res.status(500).json('Error: Failed to remove product from cart');
  //       } else {
  //         res.status(200).json('Product removed from cart successfully');
  //       }
  //     });
  //   }
  // });
};


exports.getHomePgeData = async (req, res) => {

  // Authenticate and obtain access token
  const authUrl = 'https://techultra-mahadev-16.odoo.com/web/session/authenticate';
  const authData = {
    jsonrpc: '2.0',
    params: {
      db: 'techultra-mahadev-16-production-7083629',
      login: 'app@shreemahadevtex.com',
      password: 'syndell$17523',
    },
  };

  axios.post(authUrl, authData)
    .then(response => {
      const accessToken = response.data.result.session_id;

      // Fetch home page content
      const apiUrl = 'https://techultra-mahadev-16.odoo.com/api/website.homepage';
      const headers = { Authorization: `Bearer ${accessToken}` };

      axios.get(apiUrl, { headers })
        .then(response => {
          const homePageContent = response.data.result.content;
          // Process the home page content as needed
        })
        .catch(error => {
          console.error('html -------------------- ', error.response.data);
          res.status(202).json(error.response.data)
        });
    })
    .catch(error => {
      console.error('Error:', error);
    });


}

exports.getNotification = async (req,res) =>{
  const {registrationToken} = req.body; // Device token to send the notification
  // console.log(registrationToken);
  const message = {
    notification: {
      title: 'Colorhunt',
      body: 'Push Notification',
    },
    token: "d2BYkjBj7zvXB8OqslQMFF:APA91bG78jlNydNHq8DJyju5Wl8fhjjT0mcpFoOGYBjXwUiaG98-cCkD54JgTWN_66yRdalww7on28xe95SSQA-1O99U9sRZNlpcbE_zZQJ2TENQMgrcYN3BGU1rsVBDSD3y89Noo5SJ",
  };

  // Send the notification using FCM
  admin.messaging().send(message)
    .then((response) => {
      // console.log('Successfully sent notification: ', response);
      res.send('Notification sent successfully');
    })
    .catch((error) => {
      console.log('Error sending notification: ', error);
      res.status(500).send('Internal Server Error');
    });
}