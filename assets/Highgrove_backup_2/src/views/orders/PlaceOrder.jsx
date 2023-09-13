/* eslint-disable */
import React, { useEffect,useState,useRef } from 'react'
import { useNavigate,useParams  } from 'react-router-dom'
import axios from 'axios'
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
  CDropdownItem,
  CCardTitle,
  CCardText
} from '@coreui/react'


import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import { CartOrder, CartOrderById, ProductVariations, ProductVariationsById, changeLogDetail, ShippingAddress, RemoveProduct, UpdataData, osrefValidation } from 'src/views/api/api';

//import icons & images
import EditIcon from 'src/assets/images/edit.png'
import PushIcon from 'src/assets/images/Push_Icon.png'
import CrossIcon from 'src/assets/images/Cross_Icon.png'
import 'src/views/orders/css/addOrder.css'
import 'src/views/orders/css/allOrder.css'
import crossgif from 'src/assets/images/cross.gif'
const url = 'http://localhost:8090'


function PlaceOrder(variation){
    //Variable Declartion
    const navigate = useNavigate();
    const [placeorder,setplaceorder] = useState([])
    const [orderbyid, setorderbyid] = useState([])
    const [shippingAddress, setshippingAddress] = useState([])
    const [productVariations, setproductVariations] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [Showplaceorder,setShowplaceorder] = useState(false);
    const [placeorderpopup, setplaceorderpopup] = useState()
    const [value, onChange] = useState(new Date());
    const [logdata, setlogdata] = useState([])
    const [osrefernce, setosrefernce] = useState()
    const [exists, setExists] = useState(false);
    console.log('exists',exists)

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        productVariations.forEach((product) => {
        //   totalPrice += product.product_amount * product.product_qty;
          totalPrice += 100 * product.product_qty;
        });
        return totalPrice;
    };

    const userId = localStorage.getItem('userId')

    // Example usage with dynamic values

    const handleChange = (e) => {
        SetState({ ...state, [e.target.name]: e.target.value }) 
    }

    const PlaceOrder = async () => {
        const result = await CartOrder()
        setplaceorder(result.data)
    }

    const { id } = useParams()
    const CartOrderId = async () => {
        const result = await CartOrderById(id)
        setorderbyid(result.data)
    }

    const handleInputChange = (event) => {
        setosrefernce(event.target.value);
        // validateUsername()
    };
    const validateUsername = async () => {
        console.log('lll')
        try{
            const response = await osrefValidation(osrefernce)
            console.log('response',response.data)
            if(response.data == "exist"){
                setExists('OS Reference already exist');
            }
            else if(response.data == "not exist"){
                setExists('valid');
            }
        }
        catch(error){
            console.error(error);
        }
    };

    const ProductShippingAddress = async () => {
        const result = await ShippingAddress(`${id}`)
        setshippingAddress(result.data)
    }

    const remove_product = async (product_id) =>{
        console.log(product_id,'asdf')
        const result = await RemoveProduct(product_id)
        // console.log(result)
    }
    

    const ProductByVariations = async () =>{
        const result = await ProductVariations(`${id}`);
        setproductVariations(result.data)
    }
    console.log('productVariations',productVariations)


    function setValueById(id, value) {
        if (id in intialValues) {
          intialValues[id] = value;
        }
    }
    const dynamicValues = [
        { id: 'os_reference', value: () => productVariations[0].os_reference },
        { id: 'po_number', value: () => productVariations[0].po_number },
        { id: 'product_qty', value: () => productVariations[id].product_qty },
        { id: 'product_discount', value: () => productVariations[id].product_discount },
        { id: 'amount', value: () => productVariations[id].amount }
    ];
    console.log('dynamicValues',dynamicValues)

    const initialOsReference = productVariations.map((variation) => variation.os_reference);
    const initialPoNumber = productVariations.map((variation) => variation.po_number);
    const initialProductQty = productVariations.map((variation) => variation.product_qty);
    const initialProductDisc = productVariations.map((variation) => variation.po_number);
    const initialAmount = productVariations.map((variation) => variation.po_number);

    const intialValues = {
        os_reference: initialOsReference,
        po_number: initialPoNumber,
        product_qty: initialProductQty,
        product_discount: initialProductDisc,
        amount: initialAmount,
        agent_name: userId,
    }
    const [state, SetState] = useState(intialValues);
    console.log('state',state)
      
    setTimeout(() => {
        dynamicValues.forEach(({ id, value }) => {
          setValueById(id, value);
        });
    }, 2000); 
      


    const ProductVariationsByIdFun = async (id) =>{
        // alert(id)
        const result = await ProductVariationsById(id)
        console.log('ProductVariationsById',result.data)
        // SetState({ ...result.data[0] })
        SetState(result.data[0])
    }

    const fetchlogsdata = async () =>{
        const result = await changeLogDetail()
        setlogdata(result.data)
    }
    // console.log('logdata',logdata)

    const editorder = async (product_id) =>{
        // navigate('/add-new-order')
    }

    useEffect(() => {
        PlaceOrder()
        CartOrderId()
        ProductByVariations()
        fetchlogsdata()
        ProductShippingAddress()
    }, [id])

    //popup start
    const ref = React.createRef();
    const modalRef = useRef();
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = (e) => {
        if (e.target === modalRef.current) {
        setShowModal(false);
        }
    };
    //popup end

    //Updata 
    const updateData = async (id) =>{
        // console.log(id)
        // ProductVariationsByIdFun()
        const result = await UpdataData(id,state)
        console.log('updateData',result.data)
        window.location.reload();
    }

    const placeorderFun = (id) => {
      
        if(id == undefined){
            console.log('Place Your order')
            setShowplaceorder(true);
        }
        else{
            console.log('alert')
            // setShowplaceorder(true);
        }
    }

    const placeorder_popup_open = () => {
        // setShowplaceorder(true);
    };
    const placeorder_popup_close = (e) => {
        if (e.target === modalRef.current) {
            setShowplaceorder(false);
        }
    };



    return(
        <div>
            {orderbyid.map((item)=>{
                return(
                    <div>
                        <div className="row customer-detail">
                            <div className='col-xl-6'>
                                <CTable className='view-table place-order-tbl'>
                                    <CTableBody>
                                        <CTableRow>
                                            <CTableHeaderCell>Customer Id:</CTableHeaderCell>
                                            <CTableDataCell className='place-order-tbl-data'>{item.customer_code}</CTableDataCell>
                                        </CTableRow><br/>
                                        <CTableRow>
                                            <CTableHeaderCell>Customer Name:</CTableHeaderCell>
                                            <CTableDataCell className='place-order-tbl-data'>{item.customer_name}</CTableDataCell>
                                        </CTableRow><br/>
                                        <CTableRow className='date-filter'>
                                            <CTableHeaderCell>Loading Date:</CTableHeaderCell>
                                            <DatePicker className='place-order-tbl-data' onChange={(e) => { handleChange(e)}} value={value} />
                                        </CTableRow><br/>
                                    </CTableBody>
                                </CTable>
                            </div>
                            <div className="col-xl-6">
                                <CTable className='view-table place-order-tbl'>
                                    <CTableBody>
                                        <CTableRow>
                                            <CTableHeaderCell>OS Reference:</CTableHeaderCell>
                                            <CFormInput 
                                                // value={item.os_reference} 
                                                value={osrefernce}
                                                onChange={handleInputChange}
                                                onKeyPress={validateUsername}
                                                className='place-order-tbl-data'
                                                name='os_reference'
                                                // onChange={(e)=>{setosrefernce(e.target.value)}}
                                            />
                                            {/* <button onClick={validateUsername}>Check</button> */}
                                            {exists}


                                        </CTableRow><br/>
                                        <CTableRow>
                                            <CTableHeaderCell>Customer PO Number:</CTableHeaderCell>
                                            <CFormInput className='place-order-tbl-data'/>
                                        </CTableRow><br/>
                                        <CTableRow className='date-filter'>
                                            <CTableHeaderCell>Promised Delivery Date:</CTableHeaderCell>
                                            <DatePicker value={item.promise_delivery_date} onChange={(e) => { handleChange(e)}} className='place-order-tbl-data'/>
                                        </CTableRow><br/>
                                    </CTableBody>
                                </CTable>
                            </div>
                        </div>
                        <div className='userdetail-sec'>
                            <CCol xs={12}>
                                <div className="mb-4 p-2 users-table-div">
                                    <CCardBody className='users-table' >
                                        <CTable id="table-to-xls" className='users-table customer-order'>
                                            <CTableHead>
                                                <CTableRow className='order-palce-hader'>
                                                    <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Item Code</span></CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Product Name</span></CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Product Code</span></CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>PO Number</span></CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Qty</span></CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Disc (%)</span></CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Unit Price</span></CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Disc Unit Price</span></CTableHeaderCell>
                                                    <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Action</span></CTableHeaderCell>
                                                </CTableRow>
                                            </CTableHead>
                                            {productVariations.map((variation, index)=>{
                                                return(
                                                    <CTableBody className='order-body'>
                                                    <CTableRow>
                                                        {/* <CTableDataCell>{variation.order_id}</CTableDataCell> */}
                                                        <CTableDataCell className='index-class'>{variation.order_state_id}</CTableDataCell>
                                                        <CTableDataCell>{variation.customer_name}<br/>Base Size-{variation.base_value}<br/><span>Base Colour-{variation.fabric_value}<br/>Base Fabric-{variation.feet_value}<br/>Base Options-{variation.storage_value}</span></CTableDataCell>
                                                        <CTableDataCell>ERG1026S <br/>ERG1026M <br/>BASE1226</CTableDataCell>
                                                        <CTableDataCell><CFormInput defaultValue={variation.po_number} type='number' name='po_number' onChange={(e) => { handleChange(e)}} /></CTableDataCell>
                                                        <CTableDataCell><CFormInput className='Qnty-picker' defaultValue={variation.product_qty} type='number' name='product_qty' onChange={(e) => { handleChange(e)}} /></CTableDataCell>
                                                        <CTableDataCell>
                                                            <CFormInput 
                                                                defaultValue={variation.product_discount}  
                                                                type="number" 
                                                                name='product_discount'
                                                                onChange={(e) => { handleChange(e)}}
                                                            />
                                                        </CTableDataCell>
                                                        <CTableDataCell><span style={{display:'flex',alignItems: 'center',padding:0}}>£&nbsp;
                                                            <CFormInput  
                                                                type="number" 
                                                                name='amount'
                                                                defaultValue={variation.product_amount * variation.product_qty } 
                                                                onChange={(e) => { handleChange(e)}}
                                                                /></span>
                                                        </CTableDataCell>
                                                        <CTableDataCell><span style={{display:'flex',alignItems: 'center',padding:0}}>£&nbsp;
                                                            <CFormInput  
                                                                type="number" 
                                                                defaultValue={variation.product_amount - ((variation.product_discount / 100) * variation.product_amount)} 
                                                            />
                                                        </span></CTableDataCell>
                                                        <CTableDataCell><span style={{display:'flex',alignItems: 'center',padding:0}}>
                                                            <p><img src={EditIcon} onClick={()=>{editorder(item.product_id)}}/></p>&nbsp;&nbsp;
                                                            <p><img src={CrossIcon} onClick={()=>{remove_product(item.product_id)}}/></p>&nbsp;&nbsp;
                                                            <p><button className='top-button' onClick={()=>{ProductVariationsByIdFun(variation.order_state_id); updateData(variation.order_state_id); SetState(productVariations[index])}}>Update</button></p>
                                                            {/* <button onClick={() => SetState(productVariations[index])}>Change Variation</button> */}
                                                            </span>
                                                        </CTableDataCell>
                                                    </CTableRow> 
                                                    <br/>
                                                    </CTableBody>
                                                )
                                            })}
                                            <CTableRow> 
                                                <CTableDataCell className='pe-3' colSpan={9}>
                                                    <CFormInput className='total-input' defaultValue={calculateTotalPrice()}/><p className='total-text'>Sub Total: </p><br/><br/>
                                                    <CFormInput className='total-input' defaultValue={item.vat}/><p className='total-text'>VAT: </p><br/><br/>
                                                    {/* <CFormInput className='total-input' defaultValue={calculateTotalPrice() + item.vat }/><p className='total-text'>Total Amount: </p><br/><br/> */}
                                                    <CFormInput className='total-input' defaultValue={parseFloat(calculateTotalPrice()) + parseFloat(item.vat) }/><p className='total-text'>Total Amount: </p><br/><br/>
                                                </CTableDataCell>
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
                                {shippingAddress.map((address)=>{
                                    return(
                                        <CCol lg={4} >
                                            <CCard className='shipping-address-div'>
                                                <CCardBody>
                                                    <input type='checkbox' defaultValue={address.id} onClick={()=>{placeorderFun(address.id)}}/>
                                                    <CCardText>{address.country_code_id}{address.address_1}{address.postcode}</CCardText>
                                                </CCardBody>
                                            </CCard>

                                            <div>
                                                {Showplaceorder?
                                                    <div className="model-div" ref={modalRef} onClick={placeorder_popup_close}>
                                                        <div className="modal place-order-alert">
                                                            <button onClick={() => setShowplaceorder(false)} className='popup-close'>X</button> 
                                                            <div className='popup-text-div'>
                                                                <img src={crossgif} width={100}/>
                                                                <p><strong>Alert</strong></p>
                                                                <p>Select Address</p><br/>
                                                                <button className="popup-close-btn">Close</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                : null
                                                }
                                            </div>


                                        </CCol>
                                    )
                                })}
                            </CRow>
                            <CRow>
                                <CCol lg={12} className='place-order-btn-group'>
                                    <button onClick={openModal} className='top-button'>View Changes</button>
                                    <button className='top-button'>Add More</button>
                                    <button className='top-button' onClick={()=>{placeorderFun(); placeorder_popup_open();}}>Place Order</button>
                                </CCol>
                            </CRow>
                            <div className="row order-calc">
                            {showModal ? 
                                <div className="model-div delete-popup" ref={modalRef} onClick={closeModal}>
                                <div className="modal orders-model">
                                <div className='table-overflow'>
                                    <CTable id="table-to-xls" ref={ref}  className='users-table orders-table'>
                                        <CTableHead>
                                        <CTableRow>
                                            <CTableHeaderCell scope="col" className='table-head-th'>No</CTableHeaderCell>
                                            {/* <CTableHeaderCell scope="col" className='table-head-th'>Field</CTableHeaderCell> */}
                                            <CTableHeaderCell scope="col" className='table-head-th'>Old PO Number</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>New PO Number</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>Old Product Qty</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>New Product Qty</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>Old Product Disc</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>New Product Disc</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>Old Product Price</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>New Product Price</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>Reference</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>Date Changed</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>Changed by</CTableHeaderCell>
                                            {/* <CTableHeaderCell scope="col" className='table-head-th'>Date Confirmed</CTableHeaderCell> */}
                                            <CTableHeaderCell scope="col" className='table-head-th'>Change Type</CTableHeaderCell>
                                            <CTableHeaderCell scope="col" className='table-head-th'>Reason</CTableHeaderCell>
                                        </CTableRow>
                                        </CTableHead>
                                        <CTableBody>
                                            {logdata.map((logs)=>{
                                                return(
                                                    <CTableRow> 
                                                        <CTableDataCell>{logs.order_state_id}</CTableDataCell>
                                                        {/* <CTableDataCell>AddressLine1</CTableDataCell> */}
                                                        <CTableDataCell>{logs.old_po_number}</CTableDataCell>
                                                        <CTableDataCell>{logs.new_po_number}</CTableDataCell>
                                                        <CTableDataCell>{logs.old_product_qty}</CTableDataCell>
                                                        <CTableDataCell>{logs.new_product_qty}</CTableDataCell>
                                                        <CTableDataCell>{logs.old_discount}</CTableDataCell>
                                                        <CTableDataCell>{logs.new_discount}</CTableDataCell>
                                                        <CTableDataCell>{logs.old_price}</CTableDataCell>
                                                        <CTableDataCell>{logs.new_price}</CTableDataCell>
                                                        <CTableDataCell>{logs.refernce_num}</CTableDataCell>
                                                        <CTableDataCell>{logs.creation_date}</CTableDataCell>
                                                        <CTableDataCell>{logs.first_name}</CTableDataCell>
                                                        {/* <CTableDataCell>16-10-2023</CTableDataCell> */}
                                                        <CTableDataCell>Edit</CTableDataCell>
                                                        <CTableDataCell>“Silent Tracking”</CTableDataCell>
                                                    </CTableRow>
                                                )
                                            })}
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
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default PlaceOrder