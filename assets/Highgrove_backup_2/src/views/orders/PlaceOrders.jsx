/* eslint-disable */
import React, { useEffect, useState, useRef, useContext } from 'react'
import {
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CCard,
  CCardText
} from '@coreui/react'

import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ShowLogs from './showLog'
import { DataContext } from 'src/ContextData/DataContext'

//import icons & images
import EditIcon from 'src/assets/images/edit.png'
import CrossIcon from 'src/assets/images/Cross_Icon.png'
import DeletePopUp from 'src/assets/images/PopUp-Delete.svg'
import 'src/views/orders/css/addOrder.css'
import 'src/views/orders/css/allOrder.css'
import { useNavigate, useParams } from 'react-router-dom'
import Success from './../../assets/images/successfully-done.gif'
import uparrow from './../../assets/images/uparrow.svg'
import downarrow from './../../assets/images/downarrow.svg'
import {
  fetchOrderProductData,
  fetchcartproductData,
  saveChangesLog,
  updateCartProduct,
  deleteOrderProduct,
  submitOrder,
  showProducts,
  deleteCartOrder,
  updateDashboardData
} from '../api/api'
import { ToastContainer, toast } from 'react-toastify'
const url = 'http://localhost:8010'



function PlaceOrders() {
  const { id } = useParams()
  let initiallogsValues = {
    date: new Date().toLocaleDateString(),
    userID: localStorage.getItem('userId'),
    orderID: id,
    reason: 'Update',
    change_type: 'EDIT',
  }
  // let initialPlaceOrderDetails = {
  //   orderNum : "",
  //   customerCode : "",
  //   customerCode : "",
  //   customerName : "",
  //   agentID : "",
  //   delDate : "",
  //   cus_id : null,
  //   OSref : "",
  //   VAT : "",
  //   CreationDate : ""
  // }
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [popUpmsg, SetpopUpmsg] = useState("Cart Updated Succesfully")
  const [singlOrderDetails, setsinglOrderDetails] = useState({})
  const [productsData, setProductsData] = useState([])
  const [placeOrderData, SetplaceOrderData] = useState()
  const [initialFetchedValues, setInitialFetchedValues] = useState({
    produtsOforders: [],
    singleorder: [],
  })
  const [total, setTotal] = useState(0)
  const [oldValues, setOldValues] = useState({ products: [] })
  const [newLogs, setNewlogs] = useState({ userInfo: initiallogsValues })
  const [singleproductlog, setSingleProductlog] = useState([])
  const [isLogsChanged, setIsLogsChanged] = useState(false)
  const [loadDate, setLoadDate] = useState(null)
  const [proDate, setProDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [showdelModal, setShowdelModal] = useState(false)
  const [shippingAddress, setShippingAddress] = useState(false)
  const [delteorderID, setdeleteorderID] = useState({ orderID: '', prodcutCode: '' })
  const moment = require('moment')
  const [newloarddate1, setNewloarddate] = useState()
  const [newloarddate2, setNewloarddate2] = useState()
  const [deletedProduct, setDeletedProduct] = useState()
  const [Totalprice, SetTotalprice] = useState()
  const navigate = useNavigate();
  const { SetCartData } = useContext(DataContext);
  const roleauth = localStorage.getItem('roleId')
  const [updateStatus, setUpdateStatus] = useState(true);
  const totalAmount = useRef(null);
  const [errorMessages, setErrorMessages] = useState({});
  const [errorMessages2, setErrorMessages2] = useState({});
  const [errorMessages3, setErrorMessages3] = useState({});
  const [os_ref_duplicate, setOs_ref_duplicate] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        setShowModal(false)
        setShowSuccess(false)
      }
    }
    console.log(startDate)

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [showModal, showSuccess]) // Include showModal in the dependency array
  useEffect(() => {
    setLoadDate(
      initialFetchedValues.singleorder.formatted_load_date &&
      moment(initialFetchedValues.singleorder.formatted_load_date).toDate(),
    )
    setNewloarddate(
      initialFetchedValues.singleorder.formatted_load_date &&
      moment(initialFetchedValues.singleorder.formatted_load_date).toDate(),
    )
    setProDate(
      initialFetchedValues.singleorder.formatted_del_date &&
      moment(initialFetchedValues.singleorder.formatted_del_date).toDate(),
    )
    setNewloarddate2(
      initialFetchedValues.singleorder.formatted_del_date &&
      moment(initialFetchedValues.singleorder.formatted_del_date).toDate(),
    )
  }, [initialFetchedValues])

  // console.log(newloarddate1,loadDate)
  console.log(moment(newloarddate1).format('DD/MM/YYYY'), moment(loadDate).format('DD/MM/YYYY'))
  console.log(moment(newloarddate2).format('DD/MM/YYYY'), moment(proDate).format('DD/MM/YYYY'))
  // const loadorderProductsData = async () => {
  //   // API call to fetch orders product data
  //   const response = await fetchOrderProductData({ id: id })
  //   if (response.status === 200) {
  //     console.log(response.data.orderData)
  //     setsinglOrderDetails(response.data.orderData[0])
  //     SetplaceOrderData(response.data.orderData[0])
  //     setInitialFetchedValues((prevValues) => ({ ...prevValues, singleorder: response.data.orderData[0] }))
  //     console.log(response.data.addressData);
  //     setShippingAddress(response.data.addressData)
  //   } else {
  //     alert('Error in data fetching')
  //   }
  // }
  const loadorderProductsData = async () => {
    // API call to fetch orders product data
    const response = await fetchOrderProductData({ id: id })
    if (response.status === 200) {

      console.log("response.data", response.data.orderData)
      setsinglOrderDetails(response.data.orderData[0])
      SetplaceOrderData(response.data.orderData[0])
      setInitialFetchedValues((prevValues) => ({ ...prevValues, singleorder: response.data.orderData[0] }))
      console.log(response.data.addressData);
      setShippingAddress(response.data.addressData)
    } else {
      // alert('Error in data fetching')
      console.log('Error in data fetching');
    }
  }
  const loadproductsData = async () => {
    //API call to fetch cart product data
    const response = await fetchcartproductData({ id: id })
    if (response.status == 200) {
      console.log(response.data)
      if (response.data.length !== 0) {
        setProductsData(response.data)
        setInitialFetchedValues((prevValues) => ({ ...prevValues, produtsOforders: response.data }))
        // Calculate the total
        let sum = 0
        response.data.forEach((item) => {
          // sum += item.quantity * item.unit_price;
          sum += item.quantity * (item.unit_price - (item.discount * item.unit_price) / 100)
        })
        console.log(response.data)
        console.log(sum)
        setTotal(Math.round(sum * 100) / 100)
      } else {
        const data = {
          orderID: id
        }
        await deleteCartOrder(data).then((res) => {
          if (res.status == 200) {
            navigate("/cart")
          }
        })
      }
    } else {
      // alert('Error in data fetching')
      console.log('Error in data fetching');
    }
  }


  useEffect(() => {
    console.log(initialFetchedValues)
    console.log(placeOrderData)
  }, [initialFetchedValues])

  const setDatevaluetest = (e, name) => {
    setUpdateStatus(false);
    console.log(name)

    const formattedDate = moment(e).format('YYYY-MM-DD')
    const log = {
      field: name,
      newValue: formattedDate,
      oldValue: moment(initialFetchedValues.singleorder[name]).format('YYYY-MM-DD'),
    }
    if (name === 'load_date') {
      console.log("yes1")
      setsinglOrderDetails({ ...singlOrderDetails, formatted_load_date: formattedDate })
    } else if (name === 'del_date') {
      console.log("yes2")
      setsinglOrderDetails({ ...singlOrderDetails, formatted_del_date: formattedDate })
    }

    setSingleProductlog((prevLogsValue) => {
      // Check if there is a previous log with the same field
      const existingLogIndex = prevLogsValue.findIndex((item) => item.field === name)

      // If a previous log exists, update the log with the new value
      if (existingLogIndex !== -1) {
        const updatedLogsValue = [...prevLogsValue]
        updatedLogsValue[existingLogIndex] = log
        return updatedLogsValue
      }

      // If no previous log exists, add the new log to the array
      return [...prevLogsValue, log]
    })

    // setNewlogs({...newLogs, changeLogs :singleproductlog });
    console.log(singleproductlog)
    console.log(singlOrderDetails)
  }

  // const onchangeValue = (e, code) => {
  //   console.log("chnage value",e.target.value);
  //   const sanitizedValue = e.target.value.replace(/[^0-9+-]/g, '')
  //   console.log("sanitizedValue",sanitizedValue)
  //   const { name, value, id } = e.target
  //   const updatedData = [...productsData]
  //   console.log(updatedData);
  //   const index = updatedData.findIndex((object) => object.id === parseInt(id))

  //   if (index !== -1) {
  //     const old = updatedData[index][name]
  //     updatedData[index] = { ...updatedData[index], [name]: value, old }
  //     setProductsData(updatedData)

  //     const log = generateLog(name, value, id, code)
  //     updateChangeLogs(log)
  //   }
  // }


  // const onchangeValue = (e, code) => {
  //   console.log("change value", typeof (e.target.value));
  //   const numericValue = parseInt(e.target.value, (/[^0-9+-]/g, ''));
  //   console.log("numericValue", typeof (numericValue));
  //   const { name, id } = e.target;
  //   const updatedData = [...productsData];
  //   console.log(updatedData);
  //   const index = updatedData.findIndex((object) => object.id === parseInt(id));

  //   if (index !== -1) {
  //     const old = updatedData[index][name];
  //     updatedData[index] = { ...updatedData[index], [name]: numericValue, old };
  //     setProductsData(updatedData);

  //     const log = generateLog(name, numericValue, id, code);
  //     updateChangeLogs(log);
  //   }
  // };

  const onchangeValue = (e, code) => {
    // console.log("change value", typeof e.target.value);
    // const numericValue = parseInt(e.target.value.replace(/[^0-9+-]/g, '')); // Remove non-numeric characters before parsing
    // console.log("numericValue", typeof numericValue);
    setUpdateStatus(false);
    console.log("change value", typeof (e.target.value));
    const numericValue = parseInt(e.target.value, (/[^0-9+-]/g, ''));
    console.log("numericValue", typeof (numericValue));
    const { name, id } = e.target;
    const updatedData = [...productsData];
    console.log(updatedData);
    const index = updatedData.findIndex((object) => object.id === parseInt(id));

    if (index !== -1) {
      // Check if numericValue is less than 1, then set it to 1
      const newValue = Math.max(1, numericValue);
      const old = updatedData[index][name];
      updatedData[index] = { ...updatedData[index], [name]: numericValue, old };
      setProductsData(updatedData);

      // const log = generateLog(name, newValue, id, code);
      const log = generateLog(name, numericValue, id, code);
      updateChangeLogs(log);
    }
  };

  // const onchangeValueUnitprice=(e,code)=>{
  //   console.log("change unit price value",typeof( e.target.value));
  //   const numericValue = parseInt(e.target.value,(/[^0-9+-]/g, ''));
  //   console.log("numericValue",typeof( numericValue));
  //   const { name, id } = e.target;
  //   const updatedData = [...productsData];
  //   console.log(updatedData);
  //   const index = updatedData.findIndex((object) => object.id === parseInt(id));

  //   if (index !== -1) {
  //     const old = updatedData[index][name];
  //     updatedData[index] = { ...updatedData[index], [name]: numericValue, old };
  //     setProductsData(updatedData);

  //     const log = generateLog(name, numericValue, id, code);
  //     updateChangeLogs(log);
  //   }
  // }
  const onchangeValueUnitprice = (e, code) => {
    console.log("change value", typeof (e.target.value));
    const numericValue = parseInt(e.target.value, (/[^0-9+-]/g, ''));
    console.log("numericValue", typeof (numericValue));
    const { name, id } = e.target;
    const updatedData = [...productsData];
    console.log(updatedData);
    const index = updatedData.findIndex((object) => object.id === parseInt(id));

    if (index !== -1) {
      const old = updatedData[index][name];
      updatedData[index] = { ...updatedData[index], [name]: numericValue, old };
      setProductsData(updatedData);

      const log = generateLog(name, numericValue, id, code);
      updateChangeLogs(log);
    }
  };





  const generateLog = (field, newValue, recordId, code) => {
    const oldValue = initialFetchedValues.produtsOforders.find(
      (item) => item.id === parseInt(recordId),
    )[field]
    return {
      field,
      newValue,
      recordId,
      code,
      oldValue,
    }
  }

  const updateChangeLogs = (log) => {
    console.log(log);
    setOldValues((prevLogs) => {
      const updatedLogs = {
        ...prevLogs,
        products: {
          ...prevLogs.products,
          logs: [...(prevLogs.products.logs || []), log],
        },
      }

      const changeLogs = getUniqueChangeLogs(updatedLogs.products.logs)
      return {
        ...updatedLogs,
        products: {
          ...updatedLogs.products,
          changeLogs,
        },
      }
    })
  }

  const getUniqueChangeLogs = (logs) => {
    const uniqueObjects = {}

    for (const obj of logs) {
      const key = `${obj.field}-${obj.recordId}`
      uniqueObjects[key] = obj // Overwrite existing entry with the latest log
    }

    return Object.values(uniqueObjects)
  }

  useEffect(() => {
    if (oldValues.products.logs && oldValues.products.logs.length > 0) {
      const updatedChangeLogs = { ...newLogs }
      const changeLogs = getUniqueChangeLogs(oldValues.products.logs)
      updatedChangeLogs.changeLogs = changeLogs
      setNewlogs(updatedChangeLogs)
      console.log(updatedChangeLogs)
    } else {
      console.log('error')
    }
  }, [oldValues.products.logs])

  console.log(newLogs)
  //////////////////

  const onSingleValuechange = (e) => {
    setUpdateStatus(false);
    console.log(e.target.value)
    const numericValue = parseInt(e.target.value, (/[^0-9+-]/g, ''));
    const { name, value } = e.target
    const Tprice = totalAmount.current.value;
    console.log(Tprice)
    setsinglOrderDetails((prevOrderDetails) => ({
      ...prevOrderDetails,
      [name]: numericValue,
      total_amount: Tprice
    }))

    const log = {
      field: name,
      newValue: numericValue,
      oldValue: initialFetchedValues.singleorder[name],
    }

    console.log(singlOrderDetails)
    console.log(log)

    setSingleProductlog((prevLogsValue) => {
      // Check if there is a previous log with the same field
      const existingLogIndex = prevLogsValue.findIndex((item) => item.field === name)

      // If a previous log exists, update the log with the new value
      if (existingLogIndex !== -1) {
        const updatedLogsValue = [...prevLogsValue]
        updatedLogsValue[existingLogIndex] = log
        return updatedLogsValue
      }

      // If no previous log exists, add the new log to the array
      return [...prevLogsValue, log]
    })


    // setNewlogs({...newLogs, changeLogs :singleproductlog });
    console.log(singleproductlog)





    // console.log("change value",typeof( e.target.value));
    // const numericValue = parseInt(e.target.value,(/[^0-9+-]/g, ''));
    // console.log("numericValue",typeof( numericValue));
    // const { name, id } = e.target;
    // const updatedData = [...productsData];
    // console.log(updatedData);
    // const index = updatedData.findIndex((object) => object.id === parseInt(id));

    // if (index !== -1) {
    //   const old = updatedData[index][name];
    //   updatedData[index] = { ...updatedData[index], [name]: numericValue, old };
    //   setProductsData(updatedData);

    //   const log = generateLog(name, numericValue, id, code);
    //   updateChangeLogs(log);
    // }
  }


  useEffect(() => {
    console.log(newLogs)
  }, [newLogs])
  useEffect(() => {
    if (singlOrderDetails !== null && shippingAddress[0] !== undefined) {
      // singlOrderDetails.VAT = shippingAddress[0].TaxRate;
      singlOrderDetails.VAT = 20;
      console.log(singlOrderDetails);
    }
  }, [singlOrderDetails])




  // console.log(singleproductlog);

  useEffect(() => {
    const saveChanges = async () => {
      if (isLogsChanged && singlOrderDetails.status === 0) {
        // API call
        console.log(newLogs)
        const result = await saveChangesLog(newLogs)
        console.log(result.data)
        if (result.status === 200) {
          setNewlogs({ ...newLogs, changeLogs: null })
          //logs saved
        } else {
          // alert('error in saving logs')
          console.log('error in saving logs');
        }
      } else {
        console.log('else part');
      }
      setIsLogsChanged(false) // Reset the flag
    }

    saveChanges()
  }, [isLogsChanged])
  // console.log(newLogs);

  useEffect(() => {
    console.log(placeOrderData);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
  }, [placeOrderData])
  useEffect(() => {
    console.log(newLogs.changeLogs);

  }, [newLogs.changeLogs])

  const updateChanges = async () => {
    const Tprice = totalAmount.current.value;
    console.log(singlOrderDetails)
    console.log(Tprice)

    const response = await updateCartProduct({
      singleorder: singlOrderDetails,
      productsData: productsData,
      totalPrice: Tprice
    })
    console.log(response.data)
    if (response.status == 200) {
      if (response.data == true) {
        setOs_ref_duplicate(true)
      }
      else {
        loadorderProductsData();
        loadproductsData();
        setShowSuccess(true)
        setUpdateStatus(true);
        setOs_ref_duplicate(false)
        setTimeout(() => {
          setShowSuccess(false)
        }, 3000)
      }

    } else {
      // alert('error in updating product')
      console.log('error in updating product');
    }

    if (singleproductlog.length > 0 || newLogs.changeLogs) {
      setNewlogs((prevLogs) => {
        if (prevLogs.changeLogs) {
          return {
            ...prevLogs,
            changeLogs: [...prevLogs.changeLogs, ...singleproductlog],
          }
        } else {
          return {
            ...prevLogs,
            changeLogs: singleproductlog,
          }
        }
      })
      setIsLogsChanged(true) // Set the flag to indicate logs have changed
    } else if (newLogs.changeLogs) {
      setNewlogs((prevLogs) => {
        return {
          ...prevLogs,
          changeLogs: [...prevLogs.changeLogs, ...singleproductlog],
        }
      })
      setIsLogsChanged(true) // Set the flag to indicate logs have changed
    }
    else {
    }

  }

  //to load data for product
  useEffect(() => {
    loadorderProductsData()
    loadproductsData()
  }, [])
  useEffect(() => {
  }, [placeOrderData])

  const openModal = () => {
    setShowModal(!showModal)
  }

  const setDeleteProduct = (e) => {
    setdeleteorderID({ ...delteorderID, orderID: e.target.id, prodcutCode: e.target.name })
    // setNewlogs
    let initiallogsValues = {
      date: new Date().toLocaleDateString(),
      userID: localStorage.getItem('userId'),
      orderID: id,
      reason: 'DELETE',
      change_type: 'Delete',
    }
    const deletelogs = {
      code: e.target.name
    }
    setNewlogs({ ...newLogs, deletproductInfo: initiallogsValues, deleteproduct: deletelogs })

    setShowdelModal(true)
  }
  const deleteOrder = async () => {
    console.log(delteorderID.orderID)
    if (delteorderID.orderID != '') {
      //API CALL to Delete an order
      const res = await deleteOrderProduct(delteorderID)
      if (res.status === 200) {
        console.log(res.data)
        // LoadCartDetails();
        loadorderProductsData()
        loadproductsData()
        setShowdelModal(false)
        setIsLogsChanged(true)
      } else {
        // alert('error')
        console.log('error');
      }
    } else {
      // alert('error')
      console.log('error');

    }
  }
  const PlaceOrder = async () => {
    console.log(singlOrderDetails)
    const Tprice = totalAmount.current.value;
    console.log(Tprice);
    const nullProperties = Object.keys(singlOrderDetails).filter(key => {
      if (key === "sub_total" || key === "discount" || key === "total_amount" || key === "load_date" || key === "del_date") { } else {
        return singlOrderDetails[key] === null || singlOrderDetails[key] === "";
      }
    });
    const nullProductPO = productsData.filter(item => {
      return item.product_po === null || item.product_po === "";
    });
    // Log the null properties
    console.log('Null Properties:', nullProperties, nullProductPO);
    console.log(productsData);
    if (nullProperties.length <= 0 && nullProductPO.length <= 0) {
      if (updateStatus === false) {
        // alert("Please add Customer PO number and update cart Product to place order")
        toast.error('Please Update Chnages !', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        placeOrderData.total_amount = Tprice;
        console.log(Tprice);
        console.log(placeOrderData, updateStatus);
        setUpdateStatus(false)
        const res = await submitOrder(placeOrderData)
        if (res.status === 200) {
          console.log(res);
          let initiallogsValues = {
            date: new Date().toLocaleDateString(),
            userID: localStorage.getItem('userId'),
            orderID: placeOrderData.id,
            reason: 'Place Order',
            change_type: 'Place Order',
          }
          const AddedLogs = {
            code: placeOrderData.order_number,
          }
          const logsValues = ({ addedProductInfo: initiallogsValues, AddedPRoduct: AddedLogs })
          console.log(logsValues);
          const result = await saveChangesLog(logsValues)
          if (result.status === 200) {
            console.log("response", res)
            setShowSuccess(true)
            setUpdateStatus(false)
            SetpopUpmsg("Order Placed Successfully")
            setTimeout(() => {
              setShowSuccess(false)
              navigate("/dashboard")
            }, 2000);
          }
        } else {
          // alert('failed')
          console.log('failed');
        }
      }
      console.log("Done");
    }
    else {
      let data = nullProperties.find((item) => { if (item === "address") { return true } });
      console.log(data);
      if (data === "address") {
        toast.error('Address selection is required!', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      nullProductPO.forEach(item => {
        const element = document.querySelector(`[id="${item.id}"]`);
        if (element) {
          element.style.border = '2px solid red';
          element.style.animation = 'shake 0.1s';
          setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [item.id]: 'Required field!',
          }));
        }
      })
      nullProperties.forEach(property => {
        const element = document.querySelector(`[name="${property}"]`);
        if (element) {
          element.style.border = '2px solid red';
          element.style.animation = 'shake 0.1s';
          setErrorMessages2((prevErrors) => ({
            ...prevErrors,
            [property]: 'Field cannot be empty!',
          }));
        }
      });
      nullProperties.forEach(property => {
        const wrapperElement = document.querySelector(`[data-datepicker-name="${property}"]`);
        if (wrapperElement) {
          wrapperElement.style.border = '2px solid red';
          wrapperElement.style.borderRadius = '8px';
          wrapperElement.style.animation = 'shake 0.1s';
          wrapperElement.style.padding = '0px';
          setErrorMessages3((prevErrors) => ({
            ...prevErrors,
            [property]: 'Date cannot be empty!',
          }));
        }
      });
    }
  }

  const addShakeAnimation = (e) => {
    if (e.target.value === "") {
      const element = document.querySelector(`[name="${e.target.name}"]`);
      if (element) {
        element.style.border = '2px solid red';
        element.style.animation = 'shake 0.1s';
        setErrorMessages2((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: 'Field cannot be empty!',
        }));
      }
    }
    else {
      const element = document.querySelector(`[name="${e.target.name}"]`);
      if (element) {
        element.style.border = '';
        element.style.animation = '';
        setErrorMessages2((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: '',
        }));
      }
    }
  }

  const shakeAnimationPoNumber = (e, id) => {
    const inputValue = e.target.value;
    const element = document.querySelector(`[id="${id}"]`);

    if (!inputValue) {
      element.style.border = '2px solid red';
      element.style.animation = 'shake 0.1s';
      element.style.margin = "0px";
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: 'Required field!',
      }));
    } else {
      element.style.border = '';
      element.style.animation = '';
      element.style.margin = "";
      setErrorMessages((prevErrors) => ({
        ...prevErrors,
        [id]: '',
      }));
    }
  };

  const ShakeAnimationForDatapiker = (e, name) => {
    console.log(e);
    if (e === "") {
      const wrapperElement = document.querySelector(`[data-datepicker-name="${name}"]`);
      if (wrapperElement) {
        wrapperElement.style.border = '2px solid red';
        wrapperElement.style.borderRadius = '8px';
        wrapperElement.style.animation = 'shake 0.1s';
        wrapperElement.style.padding = '0px';
        setErrorMessages3((prevErrors) => ({
          ...prevErrors,
          [name]: 'Date cannot be empty!',
        }));
      }
    }
    else {
      const wrapperElement = document.querySelector(`[data-datepicker-name="${name}"]`);
      if (wrapperElement) {
        wrapperElement.style.border = '';
        wrapperElement.style.animation = '';
        wrapperElement.style.borderRadius = '';
        setErrorMessages3((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    }
  }
  const selectAddress = (addressId) => {
    console.log(addressId);
    setUpdateStatus(false);
    console.log(placeOrderData);
    SetplaceOrderData({ ...placeOrderData, address: addressId })
    setsinglOrderDetails({ ...singlOrderDetails, address: addressId })
    console.log(placeOrderData);
  }
  const AddMoreProducts = async () => {
    SetCartData((prevCartData) => ({
      ...prevCartData,
      placeOrderData,
      orderId: id
    }));
    navigate("/add-new-order", {
      state: {
        status: false
      }
    })
  }
  console.log(productsData, "productsData")

  const UpdateOrder = async () => {

    const nullProperties = Object.keys(singlOrderDetails).filter(key => {
      if (key === "sub_total" || key === "discount" || key === "total_amount" || key === "load_date" || key === "del_date") { } else {
        return singlOrderDetails[key] === null || singlOrderDetails[key] === "";
      }
    });
    const nullProductPO = productsData.filter(item => {
      return item.product_po === null || item.product_po === "";
    });
    // Log the null properties
    console.log('Null Properties:', nullProperties, nullProductPO);
    console.log(productsData, singlOrderDetails);
    if (nullProperties.length <= 0 && nullProductPO.length <= 0) {
      if (updateStatus === false) {
        // alert("Please add Customer PO number and update cart Product to place order")
        toast.error('Please Update Chnages !', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const data = {
          singleorder: placeOrderData,
        }
        const response = await updateDashboardData(data)
        console.log(response)
        if (response.status === 200) {
          let initiallogsValues = {
            date: new Date().toLocaleDateString(),
            userID: localStorage.getItem('userId'),
            orderID: singlOrderDetails.id,
            reason: 'Update Order',
            change_type: 'Update Order',
          }
          const AddedLogs = {
            code: singlOrderDetails.order_number,
          }
          const logsValues = ({ addedProductInfo: initiallogsValues, AddedPRoduct: AddedLogs })
          console.log(logsValues);
          const result = await saveChangesLog(logsValues)
          if (result.status === 200) {
            setShowSuccess(true)
            setUpdateStatus(false)
            setTimeout(() => {
              setShowSuccess(false)
              navigate("/dashboard")
            }, 3000)
          }
        } else {
          // alert('error in updating product')
          console.log('error in updating product');
        }
      }
      console.log("Done");
    }
    else {
      let data = nullProperties.find((item) => { if (item === "address") { return true } });
      console.log(data);
      if (data === "address") {
        toast.error('Address selection is required!', {
          position: 'top-right',
          autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      nullProductPO.forEach(item => {
        const element = document.querySelector(`[id="${item.id}"]`);
        if (element) {
          element.style.border = '2px solid red';
          element.style.animation = 'shake 0.1s';
          setErrorMessages((prevErrors) => ({
            ...prevErrors,
            [item.id]: 'Required field!',
          }));
        }
      })
      nullProperties.forEach(property => {
        const element = document.querySelector(`[name="${property}"]`);
        if (element) {
          element.style.border = '2px solid red';
          element.style.animation = 'shake 0.1s';
          setErrorMessages2((prevErrors) => ({
            ...prevErrors,
            [property]: 'Field cannot be empty!',
          }));
        }
      });
      nullProperties.forEach(property => {
        const wrapperElement = document.querySelector(`[data-datepicker-name="${property}"]`);
        if (wrapperElement) {
          wrapperElement.style.border = '2px solid red';
          wrapperElement.style.borderRadius = '8px';
          wrapperElement.style.animation = 'shake 0.1s';
          wrapperElement.style.padding = '0px';
          setErrorMessages3((prevErrors) => ({
            ...prevErrors,
            [property]: 'Date cannot be empty!',
          }));
        }
      });
    }
  }

  return (
    <div style={{ marginTop: '-20px' }}>
      <div className="row customer-detail">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="col-xl-6">
          <CTable className="view-table place-order-tbl">
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell>Customer Id:</CTableHeaderCell>
                <CTableDataCell className="place-order-tbl-data">
                  {singlOrderDetails && singlOrderDetails.cus_id}
                </CTableDataCell>
              </CTableRow>
              <br />
              <CTableRow>
                <CTableHeaderCell>Customer Name:</CTableHeaderCell>
                <CTableDataCell className="place-order-tbl-data">
                  {singlOrderDetails && singlOrderDetails.customer_name}
                </CTableDataCell>
              </CTableRow>
              <br />
              <CTableRow className="date-filter">
                <CTableHeaderCell>Loading Date:</CTableHeaderCell>
                <div data-datepicker-name="formatted_load_date" className='loading_date'>
                  <DatePicker
                    className="place-order-tbl-data loading_date"
                    onChange={(e) => {
                      setDatevaluetest(e, 'load_date')
                      setStartDate(e)
                      ShakeAnimationForDatapiker(e, 'formatted_load_date')
                    }}
                    closeOnScroll={true}
                    value={singlOrderDetails.formatted_load_date}
                    format="dd/MM/yyyy"
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYYY"
                    name='load_date'
                  />
                  {errorMessages3["formatted_load_date"] && <div className="feedback-invalid single_error">{errorMessages3["formatted_load_date"]}</div>}
                </div>
              </CTableRow>
              <br />
            </CTableBody>
          </CTable>
        </div>
        <div className="col-xl-6">
          <CTable className="view-table place-order-tbl">
            <CTableBody>
              <CTableRow>
                <CTableHeaderCell>OS Reference:</CTableHeaderCell>
                <CFormInput
                  value={singlOrderDetails && singlOrderDetails.os_ref}
                  type='number'
                  className="place-order-tbl-data"
                  name="os_ref"
                  // feedbackInvalid="Filed not be empty!"
                  onChange={(e) => {
                    onSingleValuechange(e)
                    addShakeAnimation(e)
                    setOs_ref_duplicate(false)
                  }}
                />
                {errorMessages2["os_ref"] && <div className="feedback-invalid-os_ref single_error ">{errorMessages2["os_ref"]}</div>}
                {os_ref_duplicate === true ? <div className="feedback-invalid-os_ref single_error ">OS reference must be unique!</div> : ""}
              </CTableRow>
              <br />
              <CTableRow>
                <CTableHeaderCell>Customer PO Number:</CTableHeaderCell>
                <CFormInput
                  name="cus_po_num"
                  type='number'
                  className="place-order-tbl-data"
                  style={{ margin: "0px" }}
                  value={singlOrderDetails && singlOrderDetails.cus_po_num}
                  onChange={(e) => {
                    onSingleValuechange(e)
                    addShakeAnimation(e)
                  }}
                />

                {errorMessages2["cus_po_num"] && <div className="feedback-invalid-cpnum single_error">{errorMessages2["cus_po_num"]}</div>}
              </CTableRow>
              <br />
              <CTableRow className="date-filter">
                <CTableHeaderCell>Promised Delivery Date:</CTableHeaderCell>
                <div data-datepicker-name="formatted_del_date" className='promise_date'>
                  <DatePicker
                    className="place-order-tbl-data "
                    selectsEnd
                    onClickOutside={() => setdate()}
                    onChange={(e) => {
                      setDatevaluetest(e, 'del_date')
                      ShakeAnimationForDatapiker(e, 'formatted_del_date')
                    }}
                    value={singlOrderDetails.formatted_del_date}
                    placeholderText="Select end date"
                    minDate={startDate} // Set minDate to the startDate value
                    format="dd/MM/yyyy"
                    dayPlaceholder="DD"
                    monthPlaceholder="MM"
                    yearPlaceholder="YYYY"
                    name="del_date"
                  />
                  {errorMessages3["formatted_del_date"] && <div className="feedback-invalid single_error">{errorMessages3["formatted_del_date"]}</div>}
                </div>
              </CTableRow>
              <br />
            </CTableBody>
          </CTable>
        </div>
      </div>
      <div className="userdetail-sec">
        <CCol xs={12}>
          <div className="mb-4 p-2 users-table-div">
            <CCardBody className="users-table" style={{ width: '100%', overflowX: 'auto' }}>
              <CTable id="table-to-xls" className="users-table customer-order">
                <CTableHead>
                  <CTableRow className="order-palce-hader">
                    {/* <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">Item Code</span>
                    </CTableHeaderCell> */}
                    <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">Product Name</span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">Product Code</span>
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">Swatch</span>
                    </CTableHeaderCell> */}
                    <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">PO Number</span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">Quantity</span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">Discount(%)</span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">Unit Price</span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">Disc Unit Price</span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="table-head-th">
                      <span className="th_text">Action</span>
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody className="order-body">
                  {productsData &&
                    productsData.map((item, index) => (
                      <CTableRow>
                        {/* <CTableDataCell className="index-class ps-4">{index + 1}</CTableDataCell> */}
                        <CTableDataCell>
                          {item.product_name}
                          <br />
                          {item.swatch ?
                            <span>
                              {item.swatch}
                            </span> : ""}
                        </CTableDataCell>
                        <CTableDataCell className='td_product_code'>
                          {item.product_code}
                        </CTableDataCell>
                        {/* <CTableDataCell>
                          {item.swatch}
                        </CTableDataCell> */}
                        <CTableDataCell>
                          <CFormInput
                            id={item.id}
                            className={`Qnty-picker placeorderinputs ${errorMessages[item.id] ? 'is-invalid' : ''}`}
                            value={item.product_po}
                            type="number"
                            name="product_po"
                            onChange={(e) => {
                              onchangeValue(e, item.product_code);
                              shakeAnimationPoNumber(e, item.id);
                            }}
                          />
                          {errorMessages[item.id] && <div className="feedback-invalid multiple_error">{errorMessages[item.id]}</div>}
                        </CTableDataCell>

                        <CTableDataCell className='qntytd'>
                          <CFormInput
                            className="Qnty-picker placeorderinputs"
                            id={item.id}
                            type="number"
                            value={item.quantity}
                            onChange={(e) => { onchangeValue(e, item.product_code) }}
                            // onChange={(e) => onchangeValue(e)}
                            name="quantity"
                            min={1} // Set the minimum value for the input field here
                          // name="quantity"
                          />

                          {/* <p>
                            <img src={uparrow} alt="uparrow" style={{width:"20%"}}/>
                            <img src={downarrow} alt="uparrow" style={{width:"20%"}}/>
                          </p> */}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                            id={item.id}
                            type="number"
                            className="Qnty-picker "
                            onChange={(e) => onchangeValue(e, item.product_code)}
                            value={item.discount}
                            disabled={roleauth === 'Agent'}
                            name="discount"
                          />
                        </CTableDataCell>
                        <CTableDataCell>
                          <span style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
                            £&nbsp;
                            <CFormInput
                              // id={item.id}
                              // type="number"
                              // className="Qnty-picker "
                              // onChange={(e) => onchangeValueUnitprice(e, item.product_code)}
                              // Value={item.unit_price}
                              // disabled={roleauth === 'Agent'}
                              // name="unit_price"

                              id={item.id}
                              type="number"
                              className="Qnty-picker "
                              onChange={(e) => onchangeValue(e, item.product_code)}
                              value={item.unit_price}
                              // disabled={roleauth === 'Agent'}
                              disabled
                              name="unit_price"
                            />
                          </span>
                        </CTableDataCell>
                        <CTableDataCell>
                          <span style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
                            £&nbsp;
                            <CFormInput
                              id={item.id}
                              className="placeorderinputs"
                              name="discounted_unit_price"
                              onChange={(e) => onchangeValue(e, item.product_code)}
                              value={
                                item.unit_price -
                                ((item.discount * item.unit_price) / 100).toFixed(2)
                              }
                              type="number"
                              disabled
                            />
                          </span>
                        </CTableDataCell>
                        <CTableDataCell>
                          <span style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
                            {/* {
                            singlOrderDetails.status!==0? <p>
                            <img src={EditIcon} title='Edite order' />
                          </p>:""
                           } */}
                            &nbsp;&nbsp;
                            <p>
                              <img
                                src={CrossIcon}
                                id={item.id}
                                name={item.product_code}
                                title='Delete order'
                                onClick={(e) => setDeleteProduct(e)}
                              />
                            </p>
                            &nbsp;&nbsp;
                            {/* <p>
                              <button onClick={updateChanges} className="top-button">
                                Update
                              </button>
                            </p> */}
                          </span>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
                <CTableRow>
                  <CTableDataCell className='update_btn_cart'>
                    <p>
                      <button onClick={updateChanges} className="top-button">
                        Update
                      </button>
                    </p>
                  </CTableDataCell>
                  <CTableDataCell className="pe-3 tableCell-padding" colSpan={9}>
                    <CFormInput disabled className="total-input" value={total} />
                    <p className="total-text">Sub Total: &nbsp;&nbsp;&nbsp; £</p>
                    <br />
                    <br />
                    <CFormInput
                      type="number"
                      className="total-input"
                      min="0"
                      max="3"
                      step="1"
                      inputMode="numeric"
                      maxLength={3}
                      name="VAT"
                      value={singlOrderDetails && singlOrderDetails.VAT}
                      disabled
                      onChange={(e) => {
                        onSingleValuechange(e)
                        addShakeAnimation(e)
                      }}
                    />
                    <p className="total-text">VAT: &nbsp;&nbsp;&nbsp; % </p>
                    <br />
                    <br />
                    {errorMessages2["VAT"] && <div className="feedback-invalid VAT_error">{errorMessages2["VAT"]}</div>}
                    <CFormInput
                      // disabled
                      id='total-amount'
                      type="number"
                      className="total-input" /* value={ singlOrderDetails &&(parseFloat(total) + parseFloat(singlOrderDetails.VAT)).toFixed(2)} */
                      value={
                        singlOrderDetails &&
                        (
                          total +
                          (parseFloat(total) * parseFloat(singlOrderDetails.VAT)) / 100
                        ).toFixed(2)
                      }
                      ref={totalAmount}
                      disabled
                    />
                    <p className="total-text">Total Amount:&nbsp;&nbsp;&nbsp; £ </p>
                    <br />
                    <br />
                  </CTableDataCell>
                  {showSuccess ? (
                    <div className="model-div delete-popup">
                      <div className="modal">
                        <button onClick={() => setShowSuccess(false)} className="popup-close">
                          X
                        </button>
                        <img src={Success} style={{ width: '80%', height: 'auto' }} />
                        <p>
                          <br />
                          <strong>{popUpmsg}</strong>
                        </p>
                      </div>
                    </div>
                  ) : null}
                </CTableRow>
              </CTable>
            </CCardBody>
          </div>
        </CCol>

        {/* <ul>
                    {productVariations.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.product_amount * product.product_qty}
                    </li>
                    ))}
                </ul>
                <p>Total Price: ${calculateTotalPrice()}</p> */}

        <h4>Shipping Address</h4>
        <CRow>
          {shippingAddress &&
            shippingAddress.map((address) => {
              return (
                <CCol lg={4} key={address.id}>
                  <CCard
                    className={placeOrderData.address == address.id ? 'shipping-address-div selected' : 'shipping-address-div'}
                  >
                    <CCardBody>
                      <input
                        type='checkbox'
                        checked={placeOrderData.address == address.id}
                        // checked={ address.id === singlOrderDetails.address}
                        onChange={() => selectAddress(address.id)}
                      />
                      <CCardText>
                        {address.address_1} {address.address_2} {address.address_3} {address.address_4}
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </CCol>
              );
            })}
          {/* {shippingAddress &&
          shippingAddress.map((address) => {
            return (
              <CCol lg={4} key={address.SLCustomerLocationID}>
                <CCard
                  className={placeOrderData.address == address.SLCustomerLocationID ? 'shipping-address-div selected' : 'shipping-address-div'}
                >
                  <CCardBody>
                    <input
                      type='checkbox'
                      checked={placeOrderData.address == address.SLCustomerLocationID}
                      onChange={() => selectAddress(address.SLCustomerLocationID)}
                    />
                    <CCardText>
                      {address.AddressLine1} {address.AddressLine2} {address.AddressLine3} {address.AddressLine4}
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            );
          })} */}
        </CRow>
        <CRow>
          <CCol lg={12} className="place-order-btn-group">
            {singlOrderDetails.status === 0 ? <>
              <button onClick={openModal} className="top-button">
                View Changes
              </button>
            </> : ''
            }
            <button className="top-button" onClick={AddMoreProducts}>
              Add More
            </button>
            {singlOrderDetails.status === 0 ? <button className="top-button" onClick={UpdateOrder}>
              Update Order
            </button> : <button className="top-button" onClick={PlaceOrder}>
              Place Order
            </button>}
          </CCol>
        </CRow>
        <div className="row order-calc">
          {showModal ? <ShowLogs data={id} closeModal={openModal} /> : null}
        </div>
        {showdelModal ? (
          <div className="model-div delete-popup">
            <div className="modal">
              <button onClick={() => setShowdelModal(false)} className="popup-close">
                X
              </button>
              <img src={DeletePopUp} />
              <p>
                <br />
                <strong>Are You Sure ?</strong>
                <br />
                <br />
                Do you really want to delete this product ?
              </p>
              <div className="model-popup-btn-group">
                <button className="AddUserBtn cancel-btn" onClick={() => setShowdelModal(false)}>
                  Cancel
                </button>
                &nbsp;&nbsp;
                {/* <button className="AddUserBtn save-btn" type='submit' onClick={()=>{testfuc(users.id)}}>Delete</button> */}
                <button
                  className="AddUserBtn save-btn"
                  onClick={() => {
                    deleteOrder()
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default PlaceOrders
