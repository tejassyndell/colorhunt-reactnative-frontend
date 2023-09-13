/* eslint-disable */
import React,{useState,useEffect,useRef } from 'react'
import { CTable, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell,CTableHead } from '@coreui/react'
import { useParams } from 'react-router-dom';
import { fetchOrderData } from '../api/api';
import "./css/allOrder.css"

const ViewOrders = () =>{
    const { id } = useParams();
    let {order_num,order_id}=local.state
    const [ordercustData, setOrdercustdata] = useState();
    const [orderData, setOrderdata] = useState();
    const [showModal, setShowModal] = useState(false);
    const moment = require('moment');
    const ref = React.createRef();
        //***popup start***//
            const openModal = () => {
                setShowModal(true);
            };
            const modalRef = useRef();
            const closeModal = (e) => {
                if (e.target === modalRef.current) {
                setShowModal(false);
                }
            };
        //***popup end***//

    //API call function
    const fetchdata = async()=>{
    
    const response = await fetchOrderData({["id"] : id});
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(response.data.singleOrderData.productOrder);
    if(response.data.length === 0){
        setErrorMsg("This product doesn't have any variations")
        console.log("This product doesn't have any variations")
    }else{
        console.log("..........................");
        console.log(response.data[0]);
        // setIsNull(true)
        setOrdercustdata(response.data.singleOrderData.product[0])
        setOrderdata(response.data.singleOrderData.productOrder)
        // console.log(ordercustData);
        // setsorttableData(response.data)
        // setUserSearch(response.data)
        // const modifiedData = response.data.map((item, index) => ({
        // No: index + 1 , 'Name' : item.name, 'Description' : item.description, 'Group Id' : item.group_id , 'Code' : item.code, 'Mattress Size' : item.mat_size, 'Springs' : item.springs, 'Base Fabric color' : item.base_fab_color, 'Feet Options' : item.feet_options,'Foot Boards' : item.foot_board, 'Drawers' : item.drawers, 'Base Size' : item.baseSizes, 'Headboard Size' : item.headboardSizes, 'Headboard color' : item.headboardColor,
        // }));
        // modifiedData.forEach(item => {
        // delete item.id;
        // delete item.group_id;
        // });
        // setjsonData(modifiedData);
        }
    }

    useEffect(()=>{
        if(!id){
            setErrorMsg("Please select product to see its variations")
        }else{
        //API call to fetch variations
        fetchdata()
        }
      },[id])
    
    const subtotal = orderData && orderData.reduce((acc, order) => {
      const productTotal = order.unit_price * order.quantity;
      return acc + productTotal;
    }, 0);

    const discount = orderData && orderData.reduce((acc, order) => {
    const productDiscount = ((order.unit_price * order.quantity) * order.discount)/100;
    return acc + productDiscount;
    }, 0);
    
    // const totalAmount = orderData && orderData.reduce((acc, order) => {
    // const productDiscount = ((order.unit_price * order.quantity) * order.discount)/100;
    // return acc + productDiscount;
    // }, 0);
    
    return(
        <div className='view-orderpage'>
            <div className="row customer-detail">
                <div className='col-xl-6'>
                    <CTable className='view-table'>
                        <CTableBody>
                            <CTableRow>
                                <CTableHeaderCell>Customer Name:</CTableHeaderCell>
                                <CTableDataCell>{ordercustData && ordercustData.customer_name}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>Contact Email:</CTableHeaderCell>
                                <CTableDataCell>liz@10-design.com</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>OS Reference:</CTableHeaderCell>
                                <CTableDataCell>{ordercustData && ordercustData.os_reference}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>Customer Document Number:</CTableHeaderCell>
                                <CTableDataCell>{ordercustData && ordercustData.customer_doc_num}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>Order Submitted By:</CTableHeaderCell>
                                <CTableDataCell>{ordercustData && ordercustData.created_by_agent}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>Order Confirmed By:</CTableHeaderCell>
                                <CTableDataCell>Lorenzo Lewis</CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </div>
                <div className="col-xl-6">
                    <CTable className='view-table'>
                        <CTableBody>
                            <CTableRow>
                                <CTableHeaderCell>Order Created Date:</CTableHeaderCell>
                                <CTableDataCell>{ordercustData && moment(ordercustData.creation_date).format('DD-MM-yyyy')}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>Loading Date:</CTableHeaderCell>
                                <CTableDataCell>24-03-2023</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>Promised Delivery Date:</CTableHeaderCell>
                                <CTableDataCell>{ordercustData && moment(ordercustData.promise_delivery_date).format('DD-MM-yyyy')}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableHeaderCell>Delivery Address:</CTableHeaderCell>
                                <CTableDataCell>{ordercustData && ordercustData.delivery_address}</CTableDataCell>
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </div>
            </div>
            <div className='table-overflow '>
                <CTable id="table-to-xls" className='users-table customer-order'>
                    <CTableHead>
                    <CTableRow className='viewordertablerow'>
                        <CTableHeaderCell scope="col" className='table-head-th'>Item Code</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className='table-head-th'>Product Name</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className='table-head-th'>Product Code</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className='table-head-th'>PO Number</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className='table-head-th'>Quantity</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className='table-head-th'>Discount (%)</CTableHeaderCell>
                        <CTableHeaderCell scope="col" className='table-head-th'>Amount</CTableHeaderCell>
                    </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {orderData && orderData.map((order) => (
                        <CTableRow key={order.id}>
                            <CTableDataCell>12345{order.id}</CTableDataCell>
                            <CTableDataCell>{order.product_name}</CTableDataCell>
                            <CTableDataCell>{order.product_code}</CTableDataCell>
                            <CTableDataCell>{order.product_po}</CTableDataCell>
                            <CTableDataCell>{order.quantity}</CTableDataCell>
                            <CTableDataCell>{order.discount}</CTableDataCell>
                            <CTableDataCell>{order.unit_price}</CTableDataCell>
                        </CTableRow>
                        ))}
                    </CTableBody> 
                </CTable>
            </div>
            <div className="row order-calc">
                <div className="col-6 order-details align-content-end"><button className='save-btn change-btn top-button'  onClick={openModal}>View Changes</button></div>
                {showModal ? 
                            <div className="model-div delete-popup" ref={modalRef} onClick={closeModal}>
                              <div className="modal orders-model">
                              <div className='table-overflow'>
                                <CTable id="table-to-xls" ref={ref}  className='users-table orders-table'>
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
                                        <CTableRow> 
                                            <CTableDataCell>0</CTableDataCell>
                                            <CTableDataCell>AddressLine1</CTableDataCell>
                                            <CTableDataCell>UNIT 5, ORPE..</CTableDataCell>
                                            <CTableDataCell>UNIT 5, OPEN..</CTableDataCell>
                                            <CTableDataCell>0000553747</CTableDataCell>
                                            <CTableDataCell>14-10-2023  16:..</CTableDataCell>
                                            <CTableDataCell>emma1</CTableDataCell>
                                            <CTableDataCell>16-10-2023</CTableDataCell>
                                            <CTableDataCell>Edit</CTableDataCell>
                                            <CTableDataCell>“Silent Tracking”</CTableDataCell>
                                        </CTableRow>
                                    </CTableBody> 
                                </CTable>
                                </div>
                                <div className='model-popup-btn-group justify-content-end'>
                                    <button className="top-button cancel-btn" onClick={() => setShowModal(false)}>Close</button>
                                </div>
                              </div>
                            </div>
                          : null
                          }
                <div className="col-6">
                    <CTable className='view-table order-details justify-content-end'>
                        <CTableBody>
                            <CTableRow>
                                <CTableDataCell>Sub total:</CTableDataCell>
                                <CTableDataCell><span className='currency-symbol'>£</span> {subtotal}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell>Discount:</CTableDataCell>
                                <CTableDataCell><span className='currency-symbol'>£</span> {discount}</CTableDataCell>
                            </CTableRow>
                            <CTableRow>
                                <CTableDataCell>VAT:</CTableDataCell>
                                <CTableDataCell><span className='currency-symbol'>£</span> 100</CTableDataCell>
                                {/* <CTableDataCell><span className='currency-symbol'>£</span> {ordercustData && ordercustData.vat}</CTableDataCell> */}
                            </CTableRow>
                            <CTableRow className='total-top'>
                                <CTableDataCell>Total Amount:</CTableDataCell>
                                <CTableHeaderCell className='total-amount'><span className='currency-symbol'>£&nbsp;</span> {ordercustData && (parseFloat(subtotal) - parseFloat(discount) + parseFloat('100'))}</CTableHeaderCell>
                                {/* <CTableHeaderCell className='total-amount'><span className='currency-symbol'>£&nbsp;</span> {ordercustData && (parseFloat(subtotal) - parseFloat(discount) + parseFloat(ordercustData.vat))}</CTableHeaderCell> */}
                            </CTableRow>
                        </CTableBody>
                    </CTable>
                </div>
            </div>
        </div>
    )
}

export default ViewOrders