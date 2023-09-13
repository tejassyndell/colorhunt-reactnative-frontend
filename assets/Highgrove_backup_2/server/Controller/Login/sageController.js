/* eslint-disable */

const { response } = require('express');
const mysql = require('mysql')
const fetch = require("node-fetch")
const cache = require('../../node-cache/cache');
const axios = require('axios');




const url = 'http://192.168.2.199:3000'
// const url = 'http://localhost:3000'
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

//function to push orders in sage
// exports.pushOrdersToSage = async (req, res) => {
//   const orderData = req.body.singleOrder;
//   const productsData = req.body.orderProducts;

//   const { VAT, address, agent_id, cus_id, customer_id, cus_po_num, customer_name, del_date, discount, id, load_date, order_number, os_ref, status, sub_total, total_amount,
//   } = orderData;
//   const { discount: OrderDiscount, id: OdID, item_id, order_id, product_code, product_name, product_po, quantity, unit_price } = productsData;


//     const accessTokendata = await cache.get('data');
//     const API_BASE_URL = 'https://api.columbus.sage.com/uk/sage200extra/accounts/v1/sop_orders/';
//                     const linesData = () => {
//                         return productsData.map((item, index) => {
//                           return {
//                             "product_id": item.item_id,
//                             // "line_number": item.line_number,
//                             "line_type": "EnumLineTypeStandard",
//                             "code": item.product_code,
//                             "description": "test description",
//                             "use_description": true,
//                             // "use_description": item.use_description,
//                             "line_quantity": item.quantity,
//                             "stock_unit_line_quantity": 4.0,
//                             "selling_unit_price": item.unit_price,
//                             "selling_unit_price": 0,
//                             "unit_discount_percent": 0,
//                             // "unit_discount_percent": item.discount,
//                             "unit_discount_value": 50.5,
//                             "discounted_unit_price": 0.0,
//                             "cost_price": 0.0,
//                             "show_on_customer_docs": true,
//                             "show_on_picking_list_type": "DoNotShow",
//                             "confirmation_intent_type": "ConfirmOnDespatch",
//                             "has_pop_order": false,
//                             "is_complete": false,
//                             "line_total_value": 0.0,
//                             "line_tax_value": 0.0,
//                             "analysis_code_1": item.product_po,
//                             // "analysis_code_2": item.analysis_code_2,
//                             // "analysis_code_3": item.analysis_code_3,
//                             // "analysis_code_4": item.analysis_code_4,
//                             // "analysis_code_5": item.analysis_code_5,
//                             // "analysis_code_6": item.analysis_code_6,
//                             // "analysis_code_7": item.analysis_code_7,
//                             // "analysis_code_8": item.analysis_code_8,
//                             // "analysis_code_9": item.analysis_code_9,
//                             // "analysis_code_10": item.analysis_code_10,
//                           };
//                         });
//                       };                      
//         const linesDataResult = linesData();
//     const postData = {
//         "customer_id" : customer_id,
//         "customer_delivery_address_id" :address,
//         // "customer_type":"",
//         "document_date" : new Date(),
//         "requested_delivery_date" : del_date,
//         // "customer_document_no":"",
//         // "document_created_by":"",
//         // "requested_delivery_date":"",
//         "promised_delivery_date":del_date,
//         // "payment_type":"",
//         "analysis_code_1": cus_po_num,
//         "analysis_code_12": load_date,
//         "lines" : linesDataResult
//     }
//     console.log(postData);
//     try {
       
//         const response = await axios.post(API_BASE_URL, postData, {
//           headers: {
//             'ocp-apim-subscription-key': process.env.subscriptionKey,
//             'Authorization': 'Bearer ' + accessTokendata.accessToken,
//             'Content-Type': 'application/json',
//             'X-Site': process.env.site,
//             'X-Company': process.env.company,
//           },
//         });
    
//         console.log(response.data)
//         if(response.status != 200){
//           res.status(201).send({msg : "failed to push orders"})  
//         }
        
//         pool.getConnection((err, connection) => {
//           if (err) throw err
//           connection.query(`UPDATE orders SET 'order_num' = ${response.document_number} where portal_ref_num = ${order_number}`, (err, result) => {
//             connection.release()
//             if (!err) {
//               res.status(200).send("Saved") 
//             } else {
//               console.log(err)
//               res.status(201).send(err)   
//             }
//           })
//         })

//       } catch (error) {
//         console.log(error)
//         res.status(201).send(error)   
//         // throw new Error(error.message);
//       }   
//   }

exports.pushOrdersToSage = async (req, res) => {
  const orderDataArray = req.body;
  // console.log(orderDataArray.orderProducts);

  try {
    for (const { singleOrder, orderProducts } of orderDataArray) {
      const { VAT, address, agent_id, cus_id, customer_id, cus_po_num, customer_name, del_date, discount, id, load_date, order_number, os_ref, status, sub_total, total_amount } = singleOrder;
      const { discount: OrderDiscount, id: OdID, item_id, order_id, product_code, product_name, product_po, quantity, unit_price, description, swatch } = orderProducts[0];

      const accessTokendata = await cache.get('data');
      const API_BASE_URL = 'https://api.columbus.sage.com/uk/sage200extra/accounts/v1/sop_orders/';

      const linesData = () => {
        return orderProducts.map((item, index) => {
          return {
            "product_id": item.item_id,
            // "line_number": item.line_number,
            "line_type": "EnumLineTypeStandard",
            "code": item.product_code,
            "description": item.description,
            "use_description": true,
            "use_description": item.use_description,
            "line_quantity": item.quantity,
            // "stock_unit_line_quantity": 4.0,
            // "selling_unit_price": item.unit_price,
            // "selling_unit_price": 0,
            // "unit_discount_percent": 0,
            // "unit_discount_percent": item.discount,
            // "unit_discount_value": 50.5,
            // "discounted_unit_price": 0.0,
            // "cost_price": 0.0,
            "show_on_customer_docs": true,
            "show_on_picking_list_type": "DoNotShow",
            "confirmation_intent_type": "ConfirmOnDespatch",
            "has_pop_order": false,
            "is_complete": false,
            "line_total_value": 0.0,
            "line_tax_value": 0.0,
            "analysis_code_1": item.product_po,
            // "analysis_code_2": item.analysis_code_2,
            "analysis_code_3": item.swatch,
            // "analysis_code_4": item.analysis_code_4,
            // "analysis_code_5": item.analysis_code_5,
            // "analysis_code_6": item.analysis_code_6,
            // "analysis_code_7": item.analysis_code_7,
            // "analysis_code_8": item.analysis_code_8,
            // "analysis_code_9": item.analysis_code_9,
            // "analysis_code_10": item.analysis_code_10,
          };
        });
      };

      const linesDataResult = linesData();
      const postData = {
        "customer_id" : customer_id,
        "customer_delivery_address_id" :address,
        // "customer_type":"",
        "document_date" : new Date(),
        "requested_delivery_date" : del_date,
        // "customer_document_no":"",
        // "document_created_by":"",
        // "requested_delivery_date":"",
        "promised_delivery_date":del_date,
        // "payment_type":"",
        "analysis_code_1": cus_po_num,
        "analysis_code_12": load_date,
        "lines" : linesDataResult
      }

      console.log(postData);

      const response = await axios.post(API_BASE_URL, postData, {
        headers: {
          'ocp-apim-subscription-key': process.env.subscriptionKey,
          'Authorization': 'Bearer ' + accessTokendata.accessToken,
          'Content-Type': 'application/json',
          'X-Site': process.env.site,
          'X-Company': process.env.company,
        },
      });

      console.log(response.data);

      if (response.status !== 200) {
        res.status(201).send({ msg: "Failed to push orders" });
        return; 
      }

      pool.getConnection((err, connection) => {
        if (err) throw err;
        console.log(response.data.document_no)
        console.log(order_number)
        connection.query(`UPDATE orders SET order_num = '${response.data.document_no}', status = 1 WHERE portal_ref_num = '${order_number}'`, (err, result) => {
          if (!err) {
            connection.release();
            console.log(result);
            console.log("Order updated successfully");
          } else {
            console.log(err);
            res.status(201).send({ error: "An error occurred while pushing orders to Sage." });
          }
        });
      });
    }

    res.status(200).send("All orders pushed to Sage successfully.");
  } catch (error) {
    console.log(error);
    res.status(201).send({ error: "An error occurred while pushing orders to Sage." });
  }
};

  