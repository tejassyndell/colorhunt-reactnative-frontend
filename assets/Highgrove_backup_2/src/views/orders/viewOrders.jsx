/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { CTable, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CTableHead } from '@coreui/react'
import "./css/allOrder.css"
import { useLocation } from 'react-router-dom';
import { ViewDetails, fetchLogs } from '../api/api';
import moment from 'moment';
const ViewOrder = () => {
    const [showModal, setShowModal] = useState(false);
    const [viewdetails, setViewdetails] = useState([]);
    const [productarray, setProductArray] = useState([]);
    const [fetchedLogs, setFetchedLogs] = useState([])
    const ref = React.createRef();
    const location1 = useLocation();
    // const {order_num,order_id}=location.state
    const ViewDetail = async () => {
        const data = {
            order_num: location1.state.order_num,
            order_id: location1.state.order_id
        }
        console.log(data);
        await ViewDetails(data).then((res) => {
            console.log(res);
            if (res !== undefined) {
                console.log(res.data.cartProductDetails.undefined);
                setViewdetails(res.data);
                setProductArray(res.data.cartProductDetails.undefined);
            }

        })

    }
    console.log(location1.state)
    const subtotal = productarray && productarray.reduce((acc, order) => {
        const productTotal = order.unit_price * order.quantity;
        return acc + productTotal;
      }, 0);
    useEffect(() => {
        ViewDetail();
    }, [])
    useEffect(() => {
        console.log(viewdetails, productarray);
    }, [viewdetails])

    //***popup start***//
    const openModal = async () => {
        setShowModal(true);
        console.log(location1.state);
        const response = await fetchLogs({ "id": location1.state.order_id })
        if (response.status === 200) {
            console.log(response.data)
            setFetchedLogs(response.data)
            setShowModal(true);
        }
    };
    const modalRef = useRef();
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
            setShowModal(false);
        }
    };
    //***popup end***//

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

    return (
        <div className='view-orderpage'>
            {viewdetails.length === 0 ?
                <div>
                    <h2>No View orders Found!</h2>
                </div> : <>
                    <div className="row customer-detail">
                        <div className='col-xl-6'>
                            <CTable className='view-table'>
                                <CTableBody>
                                    <CTableRow>
                                        <CTableHeaderCell>Customer Name:</CTableHeaderCell>
                                        <CTableDataCell>{viewdetails.singleOrderDetails.customer_name}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell>Contact Email:</CTableHeaderCell>
                                        <CTableDataCell>{viewdetails.email}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell>OS Reference:</CTableHeaderCell>
                                        <CTableDataCell>{viewdetails.singleOrderDetails.os_reference}</CTableDataCell>
                                    </CTableRow>
                                    {/* <CTableRow>
                                        <CTableHeaderCell>Customer Document Number:</CTableHeaderCell>
                                        <CTableDataCell>{viewdetails.singleOrderDetails.customer_doc_num}</CTableDataCell>
                                    </CTableRow> */}
                                    <CTableRow>
                                        <CTableHeaderCell>Order Submitted By:</CTableHeaderCell>
                                        <CTableDataCell>Jaden Henderson</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell>Order Confirmed By:</CTableHeaderCell>
                                        <CTableDataCell>{viewdetails.singleOrderDetails.created_by_agent}</CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        </div>
                        <div className="col-xl-6">
                            <CTable className='view-table'>
                                <CTableBody>
                                    <CTableRow>
                                        <CTableHeaderCell>Order Created Date:</CTableHeaderCell>
                                        <CTableDataCell>{ moment(new Date(viewdetails.singleOrderDetails.creation_date).toDateString()).format("MM-DD-yyyy")}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell>Loading Date:</CTableHeaderCell>
                                        <CTableDataCell>{moment(new Date(viewdetails.singleOrderDetails.load_date).toDateString()).format("MM-DD-yyyy")}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell>Promised Delivery Date:</CTableHeaderCell>
                                        <CTableDataCell>{moment(new Date(viewdetails.singleOrderDetails.promise_delivery_date).toDateString()).format("MM-DD-yyyy")}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow>
                                        <CTableHeaderCell>Delivery Address:</CTableHeaderCell>
                                        <CTableDataCell>{viewdetails.singleOrderDetails.delivery_address}</CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        </div>
                    </div>
                    <div className='table-overflow'>
                        <CTable id="table-to-xls" className='users-table customer-order'>
                            <CTableHead>
                                <CTableRow >
                                    {/* <CTableHeaderCell scope="col" className='table-head-th'>Index</CTableHeaderCell> */}
                                    <CTableHeaderCell scope="col" className='table-head-th'>Product Name</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='table-head-th'>Product Item Code</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='table-head-th'>PO Number</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='table-head-th'>Quantity</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='table-head-th'>Discount (%)</CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='table-head-th'>Amount</CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {productarray.map((item, key) =>
                                <>
                                    <CTableRow className='viewordertablerow'>
                                        {/* <CTableDataCell>{key + 1}</CTableDataCell> */}
                                        <CTableDataCell>{item.product_name}</CTableDataCell>
                                        <CTableDataCell>{item.product_code}</CTableDataCell>
                                        <CTableDataCell>{item.product_po}</CTableDataCell>
                                        <CTableDataCell>{item.quantity}</CTableDataCell>
                                        <CTableDataCell>{item.discount}</CTableDataCell>
                                        <CTableDataCell><span className='currency-symbol'>£</span> {item.unit_price}</CTableDataCell>
                                    </CTableRow>
                                    
                                    </>
                                )}

                                {/* <CTableRow className='viewordertablerow'>
                                    <CTableDataCell>0000002096</CTableDataCell>
                                    <CTableDataCell>Electric</CTableDataCell>
                                    <CTableDataCell>ERG1026S - ERG1026M - BASE1226</CTableDataCell>
                                    <CTableDataCell>JKL44D</CTableDataCell>
                                    <CTableDataCell>1</CTableDataCell>
                                    <CTableDataCell>10</CTableDataCell>
                                    <CTableDataCell><span className='currency-symbol'>£</span> 500</CTableDataCell>
                                </CTableRow> */}
                            </CTableBody>
                        </CTable>
                    </div>
                    <div className="row order-calc">
                        <div className="col-6 order-details align-content-end"><button className='save-btn change-btn top-button' onClick={openModal}>View Changes</button></div>
                        {/* {showModal ?
                            <div className="model-div delete-popup" ref={modalRef} onClick={closeModal}>
                                <div className="modal orders-model">
                                    <div className='table-overflow '>
                                        <CTable id="table-to-xls" ref={ref} className='users-table orders-table'>
                                            <CTableHead>
                                                <CTableRow className='orderpopupvalue'>
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
                        } */}

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
                                                                <CTableDataCell>{updatedFields[item.filed_name]}</CTableDataCell>
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
                        <div className="col-6">
                        <CTable className='view-table order-details justify-content-end'>
                                <CTableBody>
                                    <CTableRow>
                                        <CTableDataCell>Sub total:</CTableDataCell>
                                        <CTableDataCell><span className='currency-symbol'>£</span> {subtotal}</CTableDataCell>
                                    </CTableRow>
                                    {/* <CTableRow>
                                        <CTableDataCell>Discount:</CTableDataCell>
                                        <CTableDataCell><span className='currency-symbol'>£</span> {viewdetails.singleOrderDetails.discount}</CTableDataCell>
                                    </CTableRow> */}
                                    <CTableRow>
                                        <CTableDataCell>VAT:</CTableDataCell>
                                        <CTableDataCell><span className='currency-symbol'>%</span> {viewdetails.singleOrderDetails.VAT}</CTableDataCell>
                                    </CTableRow>
                                    <CTableRow className='total-top'>
                                        <CTableDataCell>Total Amount:</CTableDataCell>
                                        <CTableHeaderCell className='total-amount'><span className='currency-symbol'>£</span> {viewdetails.singleOrderDetails.price}</CTableHeaderCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        </div>

                    </div>
                </>}
        </div>
    )
}

export default ViewOrder