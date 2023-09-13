/* eslint-disable */
import React, { useEffect, useState, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CForm,
  CFormInput,
  CPagination,
  CPaginationItem,
  CFooter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem
} from '@coreui/react'
import "../orders/css/allOrder.css"
import "../orders/css/addOrder.css"
import { CartDetails, deleteCartOrder, fetchLogs } from '../api/api';

//import icons & images
import EditIcon from 'src/assets/images/edit.png'
import PushIcon from 'src/assets/images/Push_Icon.png'
import CrossIcon from 'src/assets/images/Cross_Icon.png'
import DeletePopUp from 'src/assets/images/PopUp-Delete.svg'
import moment from 'moment';

function Cart() {
  //Variable Declartion
  const navigate = useNavigate();
  const [cartdetails, setcartdetails] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [fetchedLogs, setFetchedLogs] = useState([])
  const [delteorderID, setdeleteorderID] = useState({ orderID: '' });
  const LoadCartDetails = async () => {
    const result = await CartDetails()
    setcartdetails(result.data)
    console.log(result.data);
  }
  useEffect(() => {
    LoadCartDetails()
  }, [])
  //Route change
  const placeorder_route = (order_id) => {
    console.log('order-id', order_id)
    navigate(`/place-order/${order_id}`)
  }
  const setDeleteProduct = (e) => {
    console.log(e.target.id);
    setdeleteorderID({ ...delteorderID, orderID: e.target.id })
    setDeleteModal(true)
  }
  const deleteOrder = async () => {
    console.log(delteorderID.orderID);
    if (delteorderID.orderID != "") {
      //API CALL to Delete an order
      const res = await deleteCartOrder(delteorderID)
      if (res.status === 200) {
        console.log(res.data);
        LoadCartDetails();
        setDeleteModal(false)
      } else {
        // alert("error")
        console.log("error");
      }
    } else {
      // alert("error");
      console.log("error");
    }
  }

   //***EXPORT PDF***//
   const ref = React.createRef();
   const options = {
     orientation: 'landscape',
     unit: 'in',
     format: [11.5, 5.9]
   };

  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

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

  return (
    <div className='userdetail-sec'>
      <CCol xs={12}>
        <div className="mb-4 p-2 users-table-div">
          {/* <CCardHeader className='users-table-title users-table-inner-div'>
            <p>Cart</p>
          </CCardHeader> */}
          <CCardBody className='users-table' >
            <CTable id="table-to-xls"  >
              <CTableHead>
                <CTableRow className='carttablehadding'>
                  <CTableHeaderCell scope="col" className='table-head-th'>Index</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>Customer Id</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>Customer Name</CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" className='table-head-th'>Address</CTableHeaderCell> */}
                  {/* <CTableHeaderCell scope="col" className='table-head-th'>Price</CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" className='table-head-th'>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {cartdetails.map((item, index) => {
                  return (
                    <CTableRow key={item.id}>
                      <CTableDataCell>{index+1}</CTableDataCell>
                      <CTableDataCell>{item.cus_id}</CTableDataCell>
                      <CTableDataCell>{item.customer_name}</CTableDataCell>
                      {/* <CTableDataCell>{item.address}</CTableDataCell> */}
                      {/* <CTableDataCell>{item.amount}</CTableDataCell> */}
                      <CTableDataCell className='tbl-col-action'>
                        <p><img src={EditIcon} onClick={() => { placeorder_route(item.id) }} title='Edite order' /></p>&nbsp;&nbsp;
                        {/* <p><img src={PushIcon} onClick={() => { openModal(item.id) }} /></p>&nbsp;&nbsp; */}
                        <p><img id={item.id} src={CrossIcon} title='Delete order' onClick={(e) => setDeleteProduct(e)} /></p>&nbsp;&nbsp;
                      </CTableDataCell>
                      {deleteModal ? 
                            <div className="model-div delete-popup" >
                              <div className="modal">
                                  <button onClick={() => setShowModal(false)} className='popup-close'>X</button> 
                                  <img src={DeletePopUp}/>
                                  <p><br/><strong>Are You Sure ?</strong><br/><br/>Do you really want to delete this product ?</p>
                                  <div className='model-popup-btn-group'>
                                    <button className="AddUserBtn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>&nbsp;&nbsp;
                                    
                                    <button className="AddUserBtn save-btn" onClick={()=>{deleteOrder()}}>Delete</button>
                                  </div>
                              </div>
                            </div>
                          : null
                          }

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
                                          <CTableDataCell>{item.filed_name}</CTableDataCell>
                                          <CTableDataCell>{item.old_value === "Invalid date" ? null : item.old_value}</CTableDataCell>
                                          <CTableDataCell>{item.new_value}</CTableDataCell>
                                          <CTableDataCell>{moment(item.date).format('yyyy-MM-DD')}</CTableDataCell>
                                          <CTableDataCell>{item.reference}</CTableDataCell>
                                          <CTableDataCell>{item.first_name}</CTableDataCell>
                                          <CTableDataCell>{item.confirmed_date}</CTableDataCell>
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

                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </div>
      </CCol>
    </div>
  )
}

export default Cart