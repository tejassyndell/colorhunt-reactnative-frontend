/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import moment from 'moment';
import * as XLSX from 'xlsx';
import Message_alert from "../orders/orderComponents/Message_alert"
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CButton,
  CModal,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import { cartId, fetchLogs, latestOrderDetails, orderDelete, pushOrders, fetchOrderDataToPush, allOrderDelete } from '../api/api';
import EditIcon from '../../assets/images/edits.png'
import { ToastContainer, toast } from 'react-toastify'
import SagePushIcon from '../../assets/images/sagepush.png'
import PushtoSageIcon from '../../assets/images/PushToSage.png'
import ViewOrdersIcon from '../../assets/images/vieworders.png'
import ViewPopupIcon from '../../assets/images/popuporders.png'
import AscendingIcon from 'src/assets/images/AscendingIcon.svg'
import DescendingIcon from 'src/assets/images/DescendingIcon.svg'
import DeletePopUp from 'src/assets/images/PopUp-Delete.svg'
import DeletIcon from '../../assets/images/delete.png'
import OpenIcon from '../../assets/images/open.png'
import Confirmed from '../../assets/images/confirmed.png'
import disableLogImg from "../../assets/images/list-users 1.png"
// import disable from "../../assets/images/path19.png"
import disableDleteImg from "../../assets/images/Vector.png"
import Excel from '../../assets/images/excel.svg'
import PdfIcon from '../../assets/images/pdf.svg'
import ReactToPdf from "react-to-pdf";
import exportFromJSON from 'export-from-json'
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { filterDates } from 'src/views/api/api'
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../orders/css/allOrder.css"
import "../orders/css/addOrder.css"

const Dashboard = () => {
  const navigate = useNavigate();
  const [orderDetails, setorderDetails] = useState({})
  const [FilterValues, setFilterValues] = useState(null);
  const [orderSearch, setOrderSearch] = useState([])
  const [sorttableData, setsorttableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10; // number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [jsonData, setjsonData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showPushtosage, setPushtosage] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [proDate, setProDate] = useState(null);
  const [allEmpty, setallEmpty] = useState(false)
  const [allSelect, setallSelect] = useState(false)
  const [startEmpty, setstartEmpty] = useState(false)
  const [endEmpty, setendEmpty] = useState(false)
  const [fetchedLogs, setFetchedLogs] = useState([])
  const [showdelModal, setShowDelModal] = useState(false)
  const [sageData, setsageData] = useState()
  const [delid, setDelid] = useState(null)
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertText, setAlertText] = useState("Failed to fetch data");
  const moment = require('moment');

  //***Admin Authentication***//
  const roleauth = localStorage.getItem('roleId')
  console.log(roleauth);
  useEffect(() => {
    if (roleauth == 2) {
      navigate('/login')
    }
    else if (roleauth == 1) {
      // console.log("Admin Loggin In")
    }
  }, [roleauth])

  const ViewOrderRoute = (number, id) => {
    navigate('/view-order', {
      state: {
        portal_ref_num: number,
        order_id: id
      }
    })
  }
  const AddOrderRoute = () => {
    navigate('/add-new-order')
  }

  //***all user details***//

  // export file in excell
  const exportExcelData = () => {
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "All-Orders.xlsx");
  }

  // console.log("orderDetails",orderDetails);
  const LoadOrderDetails = async () => {
    const result = await latestOrderDetails()
    console.log(result, "result");
    setorderDetails(result.data)
    // setjsonData(result.data)
    setOrderSearch(result.data)
    setsorttableData(result.data)

    const modifiedData = result.data.map((item, index) => ({
      ...item, No: index + 1, 'Order Number': item.order_num === 0 ? null : item.order_num, 'Portal Reference Number': item.portal_ref_num, 'Order Created Date': moment(item.creation_date).format('yyyy-MM-DD'), 'Status': item.status === 0 ? 'Open' : 'Confirmed', 'Customer Code': item.customer_code, 'Customer Name': item.customer_name, 'Amount': '£ ' + item.order_Amount, 'Created By Agent': item.first_name, 'Promised Delivery Date': moment(item.promise_delivery_date).format('yyyy-MM-DD')
    }));
    modifiedData.forEach(item => {
      delete item.id;
      delete item.product_id;
      delete item.product_qty;
      delete item.product_discount;
      delete item.po_number;
      delete item.os_reference;
      delete item.portal_ref_num;
      delete item.order_num;
      delete item.creation_date;
      delete item.status;
      delete item.customer_code;
      delete item.customer_name;
      delete item.order_Amount;
      delete item.first_name;
      delete item.delivery_address;
      delete item.promise_delivery_date;
      delete item.customer_doc_num;
    });
    setjsonData(modifiedData);
    console.log(jsonData)
  }

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    doc.text("All Orders Details", 15, 10)
    const columns = [
      "No",
      "Order Number",
      "Order Created Date",
      "Status",
      "Customer Code",
      "Customer Name",
      "Amount",
      "Created By Agent",
      "Promised Delivery Date",
    ];
    const rows = [];
    jsonData.map((item) => rows.push(Object.values(item)));
    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 20, // Set the starting position of the table
    });
    doc.save('AllOrders.pdf')
  }

  useEffect(() => {
    LoadOrderDetails()
  }, [])

  //***popup start***//
  const openModal = async (id) => {

    const response = await fetchLogs({ "id": id })
    if (response.status === 200) {
      console.log(response.data)
      setFetchedLogs(response.data)
      setShowModal(true);

    }
    else {
      console.log("Error in fetching logs")
    }

    setShowModal(true);
  };
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  //***popup end***//

  //***search filter start***//

  const handleFilter = (e) => {
    if (e.target.value === '') {
      setsorttableData(orderSearch);
    } else {
      const filterResult = orderSearch.filter((item) => {
        const lowercaseValue = e.target.value.toLowerCase();
        const statusString = String(item.status).toLowerCase();
        let statusText = '';

        if (statusString === '0') {
          statusText = 'open';
        } else if (statusString === '1') {
          statusText = 'confirmed';
        } else if (statusString === '2') {
          statusText = 'confirmed';
        }

        const formattedPromiseDeliveryDate = formatDate(item && item.promise_delivery_date);
        const formattedCreationDate = formatDate(item && item.creation_date);

        return (
          item.order_num && item.order_num.toLowerCase().includes(lowercaseValue) ||
          item.portal_ref_num && item.portal_ref_num.toLowerCase().includes(lowercaseValue) ||
          formattedCreationDate && formattedCreationDate.toString().toLowerCase().includes(lowercaseValue) ||
          statusText && statusText.includes(lowercaseValue) ||
          item.customer_code && item.customer_code.toLowerCase().includes(lowercaseValue) ||
          item.customer_name && item.customer_name.toLowerCase().includes(lowercaseValue) ||
          item.total_amount && item.total_amount.toString().includes(e.target.value.toString()) ||
          item.first_name && item.first_name.toLowerCase().includes(lowercaseValue) ||
          item.delivery_address && item.delivery_address.toLowerCase().includes(lowercaseValue) ||
          formattedPromiseDeliveryDate && formattedPromiseDeliveryDate.includes(lowercaseValue) ||
          item.os_ref && item.os_ref.toString().includes(lowercaseValue)
        );
      });

      setsorttableData(filterResult);
    }

    setFilterValues(e.target.value);
    setSelectedRows([]);
    setCheckedRows([]);
  };
  // console.warn("formattedCreationDate",formattedCreationDate);
  function formatDate(date) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
    const [day, month, year] = formattedDate.split('-');
    const formattedDateString = `${day}-${month}-${year}`;
    return formattedDateString;
  }

  // console.log('FilterValues',FilterValues)

  //***search filter End***//
  //***EXPORT PDF***//
  const ref = React.createRef();
  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [11.5, 5.9]
  };




  //***Sorting Functionality***/
  console.log('sorttableData', sorttableData)

  const sortDataAsc = (property) => {
    const sortedData = [...sorttableData].sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
    setsorttableData(sortedData);
    console.log(sortedData);
  };
  const sortDataDesc = (property) => {
    const sortedData = [...sorttableData].sort((a, b) => {
      if (a[property] < b[property]) return 1;
      if (a[property] > b[property]) return -1;
      return 0;
    });
    console.log(sortedData);
    setsorttableData(sortedData);
  };




  //***Pagination Functionality***/
  const totalPages = Math.ceil(sorttableData.length / itemsPerPage);
  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sorttableData.slice(startIndex, endIndex);
  const indexs = sorttableData.length;

  const datesData = {
    startDate: moment(startDate).format('yyyy-MM-DD'),
    endData: moment(endDate).format('yyyy-MM-DD'),
    proData: moment(proDate).format('yyyy-MM-DD')
  }

  const makefalse = () => {
    setallEmpty(false)
    setallSelect(false)
    setstartEmpty(false)
    setendEmpty(false)
  }
  const placeorder_route = async (id) => {
    console.log('order_id', id)

    // const data = {
    //   portal_ref_num: orderNum
    // }
    // await cartId(data).then((res) => {
    //   console.log(res);
    //   if (res.status === 200) {
    //     if (res.data.length !== 0) {
    //       console.log(res.data[0].id);
    navigate(`/place-order/${id}`)
    // }
    // }
    // })

  }
  // API function to filter wise date
  const filterDate = async () => {
    if (startDate == null && endDate == null && proDate == null) {
      // console.log("everythig is empty");
      makefalse()
      setallEmpty(true)
    } else if (proDate != null && startDate == null && endDate != null || proDate != null && startDate != null && endDate == null || startDate != null && endDate != null && proDate != null) {
      // console.log("Select only one filter");
      makefalse()
      setallSelect(true)
    } else if (startDate == null && endDate != null) {
      // console.log("start date is empty");
      makefalse()
      setstartEmpty(true)
    } else if (startDate != null && endDate == null) {
      // console.log("end date is empty");
      makefalse()
      setendEmpty(true)
    } else if (startDate != null && endDate != null && startDate != 'Invalid date' && endDate != 'Invalid date') {
      // console.log("start date and end date both are not empty");
      makefalse()
      // console.log(proDate);
      const result = await filterDates(datesData);
      setsorttableData(result.data)
      setVisible(false)
    } else if (proDate != null && proDate != 'Invalid date') {
      // console.log("promised delivery date is not empty");
      makefalse()
      const result = await filterDates(datesData);
      setsorttableData(result.data)
      setVisible(false)
    }
    // console.log("starting date is " + datesData.startDate)
    // const result = await filterDates(datesData);
    // console.log(result.data)
    // setsorttableData(result.data)
    // setVisible(false)
  }

  // Add a new state variable to maintain the checked state of each row
  const [checkedRows, setCheckedRows] = useState(() => Array(currentData.length).fill(false));
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAllClick = (event) => {
    const enabledRows = currentData.filter((row) => row.status === 0);
    const selectedOrderIds = enabledRows.map((row) => row.order_id);
    if (event.target.checked) {
      setSelectedRows(enabledRows.map((row) => ({ orderID: row.order_id, productIDs: row.id })));
      setCheckedRows(currentData.map((row) => selectedOrderIds.includes(row.order_id) ? true : false));
    } else {
      setSelectedRows([]);
      setCheckedRows(currentData.map(() => false)); // Reset checked rows to all false
    }
  };

  const handleCheckboxClick = (IdData, event, orders, index) => {
    const { id } = IdData.IdData;

    if (!event.target.disabled) {
      const newCheckedRows = [...checkedRows];
      newCheckedRows[index] = !newCheckedRows[index]; // Toggle the checked state of the clicked row
      setCheckedRows(newCheckedRows);
      if (selectedRows.find(item => item.orderID === orders.order_id)) {
        setSelectedRows(selectedRows.filter(item => item.orderID !== orders.order_id)); // Remove item if orderID is already present
      } else {
        setSelectedRows([...selectedRows, { orderID: orders.order_id, productIDs: id }]); // Add a new object with both orderID and 'id' if orderID is not already present
      }
    }

    console.log(selectedRows);
  };
  const DeleteAll = async (selectedRows) => {
    if (selectedRows.length === 0) {
      toast.error('Please select checkbox !', {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setSelectedRows([]);
    } else {
      await allOrderDelete(selectedRows).then((res) => {
        console.log(res);
        if (res.status === 200) {

          setTimeout(() => {
            toast.success('Order deleted successfully.', {
              position: 'top-right',
              autoClose: 3000, // Close the toast after 3000 milliseconds (3 seconds)
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            LoadOrderDetails();
          }, 1000)
          setSelectedRows([]);
        }
      })
    }
  }
  const allRowsSelected = currentData.filter((row) => row.status === 0).length !== 0 && selectedRows.length === currentData.filter((row) => row.status === 0).length;

  useEffect(() => {
    console.log(selectedRows)
  }, [selectedRows])

  const deleteOrderPopup = async (e) => {
    let order_id = e.order_id
    let id = e.id
    console.log("id", id)
    console.log("order_id", order_id)
    setShowDelModal(true)
    setDelid(e)
    console.log("delmodel open")

  }

  const deleteOrder = async () => {
    console.log(delid)
    const response = await orderDelete(delid);
    response.status === 200 && setShowDelModal(false)
    console.warn("data", delid)
    console.warn("response", response);
    LoadOrderDetails()
  }

  const updatedFields = {
    load_date: "Loading Date",
    del_date: "Delivery Date",
    unit_price: "Unit Price",
    cus_po_num: "Customer PO Number",
    discount: "Discount",
    quantity: "Quantity",
    VAT: "VAT",
    os_ref: "OS Reference",
    product_po: "Product PO",
  };

  const FetchDataToPush = async (data) => {
    console.log(data);

    if (data != undefined) {
      const updatedSelectedRows = [{ orderID: data.oID, productIDs: data.id }];
      setSelectedRows(updatedSelectedRows);

      try {
        // Fetch data based on the updated selectedRows
        const response = await fetchOrderDataToPush(updatedSelectedRows);
        setSelectedRows([])

        if (response.status === 200) {
          // Stop the loader and show success message
          setPushtosage(true);
          console.log(response.data);
          setsageData(response.data);
        } else {
          // alert("Failed to fetch data");
          setAlertStatus(true)
          setAlertText("Failed to fetch data")
        }
      } catch (error) {
        // Handle any errors that occur during the fetch process
        console.error("Error fetching data:", error);
        // alert("Failed to fetch data");
        setAlertStatus(true)
        setAlertText("Failed to fetch data")
      }
    } else {
      console.log(selectedRows.length)
      if (selectedRows.length <= 0) {
        // alert("Please select the orders to push")
        setAlertStatus(true)
        setAlertText("Please select the orders to push")
      } else {
        const response = await fetchOrderDataToPush(selectedRows);
        setSelectedRows([])

        if (response.status === 200) {
          // Stop the loader and show success message
          setPushtosage(true);
          console.log(response.data);
          setsageData(response.data);
        } else {
          // alert("Failed to fetch data");
          setAlertStatus(true)
          setAlertText("Failed to fetch data")
        }
      }
    }
  };

  const sagePush = async () => {
    const result = await pushOrders(sageData);
    setPushtosage(false);
    console.log(result);
    if (result.status === 200) {
      LoadOrderDetails();
    } else {
      // alert("failed")
      setAlertStatus(true)
      setAlertText("Failed to fetch data")
    }
  }
  const disableAelrt =()=>{
    setAlertStatus(false)  
    }
  return (
    <div className='userdetail-sec'>
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
      <CCol xs={12}>
        <div className="mb-4 px-2 users-table-div">
          <CCardHeader className='users-table-title users-table-inner-div' style={{ marginBottom: 3 }}>
            <p>Latest Sales Orders</p>
            <div className='userdetail-head'>
              <CFormInput className='search-input' type="text" placeholder="Start typing to search for Order" value={FilterValues} onChange={handleFilter} />
              <div className='top-btngroup my-2'>
                {roleauth === 'Agent' ? null : <button className='top-button' onClick={() => { FetchDataToPush() }}>Push To Sage</button>}
                <button className='top-button' onClick={AddOrderRoute}>Add Order</button>
                <button className='top-button' onClick={() => DeleteAll(selectedRows)}>Delete</button>
                <CModal alignment="center" className='date-filter' visible={visible} onClose={() => setVisible(false)} backdrop="static">
                  <CModalBody>
                    <p>From Order Creation Date</p>
                    <DatePicker onChange={setStartDate} value={startDate} format='yyyy/MM/dd' dayPlaceholder='DD' monthPlaceholder='MM' yearPlaceholder='YYYY' />
                    <p>To Order Creation Date</p>
                    <DatePicker onChange={setEndDate} value={endDate} minDate={startDate} format='yyyy/MM/dd' dayPlaceholder='DD' monthPlaceholder='MM' yearPlaceholder='YYYY' />
                    <p className='date-input'><b>OR</b></p>
                    <p>Promised Delivery Date</p>
                    <DatePicker onChange={setProDate} value={proDate} format='yyyy/MM/dd' dayPlaceholder='DD' monthPlaceholder='MM' yearPlaceholder='YYYY' />
                    <p className="px-0">
                      {allEmpty && (<p style={{ textAlign: "left", color: "#e55353" }}>Please Select any One</p>)}
                      {allSelect && (<p style={{ textAlign: "left", color: "#e55353" }}>Select only One filter</p>)}
                      {startEmpty && (<p style={{ textAlign: "left", color: "#e55353" }}>Please Select From Date</p>)}
                      {endEmpty && (<p style={{ textAlign: "left", color: "#e55353" }}>Please Select To Date</p>)}
                    </p>
                  </CModalBody>
                  <CModalFooter>
                    <CButton onClick={() => setVisible(false)} className='white-btn'>
                      Close
                    </CButton>
                    <CButton onClick={() => filterDate()} className='white-btn'>
                      Apply
                    </CButton>
                  </CModalFooter>
                </CModal>
              </div>
              {/* <div className='export-grp'>
                <p>Export</p>&nbsp;&nbsp;
                <img id="test-table-xls-button" className="download-table-xls-button"  src={Excel} width={30} onClick={() => exportExcelData()}/>
                <button onClick={downloadPdf} id='test-table-pdf-button' className='pdf-btn' ><img src={PdfIcon} width={30}/></button>
              </div> */}
            </div>
          </CCardHeader>
          <CCardBody className='users-table' >
            <div className='table-overflow'>
              <CTable id="table-to-xls" ref={ref} className='users-table orders-table'>
                <CTableHead>
                  <CTableRow className='dashboardtablesrow'>
                    {roleauth === 'Agent' ? null : <CTableHeaderCell scope="col" className='table-head-th'><input type="checkbox" className='order-checkbox' checked={allRowsSelected} onChange={handleSelectAllClick} /></CTableHeaderCell>}
                    <CTableHeaderCell style={{ border: 'none' }} scope="col" className='table-head-th'>
                      <span className='th_text'>Portal Reference Number&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('portal_ref_num')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('portal_ref_num')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell style={{ border: 'none' }} scope="col" className='table-head-th'>
                      <span className='th_text'>Order Number&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('order_num')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('order_num')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>OS Reference&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('creation_date')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('creation_date')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Customer Code&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('status')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('status')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Customer Name&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('customer_code')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('customer_code')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Status&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('customer_name')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('customer_name')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Amount&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('price')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('price')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Created By Agent&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('first_name')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('first_name')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Delivery Address Postal Code&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('delivery_address')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('delivery_address')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Order Created Date&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('promise_delivery_date')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('promise_delivery_date')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Promised Delivery Date&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('os_ref')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('os_ref')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    {roleauth === 'Agent' ? null :
                      <CTableHeaderCell scope="col" className='table-head-th action-head'><div className='action'><span className='th_text'>Action</span></div></CTableHeaderCell>
                    }
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {sorttableData && currentData.map((orders, index) => {
                    return (
                      <CTableRow key={orders.id} className='dashboardtablesdatarow'>
                        {roleauth === 'Agent' ? null : <CTableHeaderCell className='index-class' scope="row">{orders.status == '0' ? (<><input type="checkbox" className='order-checkbox' name={orders.id} checked={checkedRows[index]} onChange={(event) => handleCheckboxClick({ IdData: { id: orders.id, oID: orders.order_id } }, event, orders, index)} /></>) : (<><input type="checkbox" className='order-checkbox' name={orders.id} disabled /></>)}</CTableHeaderCell>}
                        <CTableDataCell>{orders.portal_ref_num}</CTableDataCell>
                        <CTableDataCell>{orders.order_num === 0 ? null : orders.order_num}</CTableDataCell>
                        <CTableDataCell>{orders.os_ref}</CTableDataCell>
                        <CTableDataCell>{orders.customer_code}</CTableDataCell>
                        <CTableDataCell>{orders.customer_name}</CTableDataCell>
                        <CTableDataCell className='status-icon'>{orders.status == '0' ? (<><img src={OpenIcon} /> Open</>) : (<><img src={Confirmed} /> Confirmed</>)}</CTableDataCell>
                        <CTableDataCell><span className='currency-symbol'>£ {orders.total_amount}</span></CTableDataCell>
                        <CTableDataCell>{orders.first_name}</CTableDataCell>
                        <CTableDataCell>{orders.delivery_address}</CTableDataCell>
                        <CTableDataCell>{moment(orders.creation_date).format('DD-MMM-YYYY')}</CTableDataCell>
                        <CTableDataCell>{moment(orders.promise_delivery_date).format('DD-MMM-YYYY')}</CTableDataCell>
                        {roleauth === 'Agent' ? null :
                          <CTableDataCell className='tbl-col-action'>
                            {roleauth === 'Agent' ? null : <button className='action-btn' disabled={orders.status != '0'} onClick={() => { FetchDataToPush({ id: orders.id, oID: orders.order_id }) }}><img src={PushtoSageIcon} /></button>}
                            <button className='action-btn' title='Edite order' onClick={() => { placeorder_route(orders.id) }} disabled={orders.status != '0'}><img src={EditIcon} /></button>
                            {/* <button className='action-btn' onClick={() => { placeorder_route(orders.portal_ref_num) }} ><img src={EditIcon} /></button> */}
                            {/* <button className={"action-btn "} onClick={() => ViewOrderRoute(orders.portal_ref_num, orders.order_id)}><img src={ViewOrdersIcon} /></button> */}
                            <button className="action-btn" disabled={orders.status == '0'} title='View order' onClick={() => ViewOrderRoute(orders.portal_ref_num, orders.id)}><img src={ViewOrdersIcon} /></button>
                            <button className='action-btn' title='order Logs' onClick={() => openModal(orders.id)} ><img src={ViewPopupIcon} /></button>
                            <button className="action-btn" value={orders.id} disabled={orders.status != '0'} onClick={() => { deleteOrderPopup(orders) }}>
                              <img id={orders.id} src={disableDleteImg} alt='delete order' title='Delete order' />
                            </button>
                            {showModal ?
                              <div className="model-div delete-popup" ref={modalRef} onClick={closeModal}>
                                <div className="modal orders-model">

                                  <div className='table-overflow'>
                                    {fetchedLogs.length > 0 ?
                                      <>
                                        <CTable id="table-to-xls" ref={ref} className='users-table orders-table'>
                                          <CTableHead>
                                            <CTableRow>
                                              <CTableHeaderCell scope="col" className='table-head-th'>No</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>Product Code</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>Field</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>Old Value</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>New Value</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>Reference</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>Date Changed</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>Changed by</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>Date Confirmed</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>Change Type</CTableHeaderCell>
                                              <CTableHeaderCell scope="col" className='table-head-th'>Reason</CTableHeaderCell>
                                            </CTableRow>
                                          </CTableHead>
                                          <CTableBody>
                                            {fetchedLogs && fetchedLogs.map((item, index) => (
                                              <CTableRow>
                                                <CTableDataCell>{index + 1}</CTableDataCell>
                                                <CTableDataCell>{item.product_id}</CTableDataCell>
                                                <CTableDataCell>{updatedFields[item.filed_name]}</CTableDataCell>
                                                <CTableDataCell>{item.old_value === "Invalid date" ? null : item.old_value}</CTableDataCell>
                                                <CTableDataCell>{item.new_value}</CTableDataCell>
                                                <CTableDataCell>{moment(item.date).format('yyyy-MM-DD')}</CTableDataCell>
                                                <CTableDataCell>{item.reference}</CTableDataCell>
                                                <CTableDataCell>{item.first_name}</CTableDataCell>
                                                <CTableDataCell>{item.confirmed_date}</CTableDataCell>
                                                <CTableDataCell>{item.change_type}</CTableDataCell>
                                                <CTableDataCell>{item.reason}</CTableDataCell>
                                              </CTableRow>
                                            ))}
                                          </CTableBody>
                                        </CTable>
                                      </> : <h2>No logs are found!</h2>
                                    }
                                  </div>
                                  <div className='model-popup-btn-group justify-content-end'>
                                    <button className="top-button cancel-btn" onClick={() => setShowModal(false)}>Close</button>
                                  </div>

                                </div>
                              </div>
                              : null
                            }
                          </CTableDataCell>
                        }
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            </div>

          </CCardBody>
        </div>
      </CCol>
      {showdelModal ?
        <div className="model-div delete-popup" ref={modalRef} onClick={closeModal}>
          <div className="modal">
            <button onClick={() => setShowDelModal(false)} className='popup-close'>X</button>
            <img src={DeletePopUp} />
            <p><br /><strong>Are You Sure ?</strong><br /><br />Do you really want to delete this order ?<br />This user will be permanently removed from database. </p>
            <div className='model-popup-btn-group'>
              <button className="AddUserBtn cancel-btn" onClick={() => setShowDelModal(false)}>Cancel</button>&nbsp;&nbsp;
              {/* <button className="AddUserBtn save-btn" type='submit' onClick={()=>{testfuc(users.id)}}>Delete</button> */}
              <button className="AddUserBtn save-btn" onClick={() => deleteOrder()}>Delete</button>
            </div>
          </div>
        </div>
        : null
      }

      {
        alertStatus ?
          <Message_alert text={alertText} disableSuccsess={disableAelrt}></Message_alert> : ""
      }
      <CModal alignment="center" className='push-model' visible={showPushtosage} onClose={() => setPushtosage(false)} backdrop="static">
        <CModalBody>
          <img src={SagePushIcon}></img>
          <h3>Are You Sure ?</h3>
          <p>Do you really want to push this order to sage ?</p>
        </CModalBody>
        <CModalFooter>
          <CButton onClick={() => setPushtosage(false)} className='top-button white-btn sage-close'>
            Close
          </CButton>
          <CButton onClick={sagePush} className='top-button sage-close'>
            Push
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Dashboard