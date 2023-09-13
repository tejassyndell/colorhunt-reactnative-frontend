/* eslint-disable */
import React, { useState, useEffect, useRef, useContext } from 'react'
// import Select from 'react-select';
import ReactDom from "react-dom";
import { useNavigate, Link, useLocation } from 'react-router-dom'
import ReactSearchBox from "react-search-box";
import arrow from "../../../src/assets/images/icons/updownarrow1.png"
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
  CContainer,
  CFormSelect
} from '@coreui/react'
import "./css/allOrder.css"
import "./css/addOrder.css"
import { fetchCustomerIds, showProducts, selectCategory } from '../api/api';
import Mattress_image from '../../assets/images/orders_module/Mattress.png'
import base_image from '../../assets/images/orders_module/Base.png'
import full_set_image from '../../assets/images/orders_module/FullSet.png'
import heatboard_image from '../../assets/images/orders_module/HeadBoard.png'
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';
import Products from './orderComponents/products';
import ProductMatttres from './orderComponents/OrderMattres';
import ProductHeadboard from './orderComponents/OrderHeadboard'
import { DataContext } from 'src/ContextData/DataContext';





const AddOrder = () => {
  const [fetchData, setFetchdata] = useState([]);
  const [selectdata, setSelectdata] = useState();
  const [products, setProducts] = useState(false)
  const [choice, setChoice] = useState("")
  const [screenState, setScreenState] = useState("")
  const [show, SetShow] = useState(true)
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addMoreData, SetaddMoreData] = useState();
  const [proData, setProdata] = useState({ cusProdata: {}, catData: {}, cusomerDetails: {} });
  const AgentID = localStorage.getItem('userId');
  const [arrowdirection, setArrowdirection] = useState(false)
  const [loader, setLoader] = useState(false);
  let CustomerId = null;
  const fetchCustomerID = async () => {
    const result = await fetchCustomerIds();
    setFetchdata(result.data);
    console.log(result.data)
    console.log(fetchData)
    setSearchResults(result.data.cusID)
    setLoading(true)
    // setProdata({...proData, CustomerData : result.data});

  }
  const { cartData } = useContext(DataContext);
  // console.log(cartData)

  // fetchData.length !== 0 ? console.log(fetchData) : ""
  // API to fecth customer Ids 


  useEffect(() => {
    fetchCustomerID()
    if (location1.state) {
      if (cartData && location1.state.status === false) {
        setScreenState("Select_product")
        SetaddMoreData(cartData)
      }
    }
  }, [])
  useEffect(() => {
    if (location1.state) {
      if (fetchData.length !== 0 && cartData) {
        const data = fetchData.cusID.filter(person => person.id === cartData.placeOrderData.customer_id)
        console.log(data);
        if (data.length !== 0) { setSearchTerm(data[0].reference) }
      }
    }
  }, [fetchData])
  useEffect(() => {
    console.log(addMoreData)
    if (addMoreData) {
      setCustomerID()
    }
  }, [addMoreData])

  const onClickValue = async (e) => {
    console.log("Products");
    // setScreenState("Select_product")
    console.log(e.target.value, "catid");
    const CatID = e.target.value;

    setScreenState(CatID);
    const response = await selectCategory({ "id": CatID });
    if (response.status === 200) {
      console.log("Done");
      console.log(response.data);
      setProdata({ ...proData, catData: response.data });
      setScreenState(CatID)
    }
    setProducts(true)
    setChoice(e.target.value)
  }

  const chnageState = (e) => {
    console.log(e)
    SetShow(e)
  }
  const setCustomerID = async (e) => {
    console.log(typeof e);
    setLoader(true)
    if (typeof e === 'undefined') {
      const response = await showProducts({ "id": addMoreData && addMoreData.placeOrderData.customer_id });
      if (response.status === 200) {
        console.log("if");
        setLoader(false);
        setScreenState("Select_product")
        console.log(response.data);
        setProdata(response.data);
        setProdata({ ...proData, cusProdata: response.data, cusomerDetails: { "cusID": addMoreData.placeOrderData.id, "name": addMoreData.placeOrderData.customer_name, "ReferenceID": addMoreData.placeOrderData.cus_id, "agentName": AgentID, OrderID: addMoreData.orderId } });
        // setProdata({...proData, cusomerDetails: { "cusID": CustID, "name": name }});
        // setShowModal(!showModal);
        // LoadProducts();
      }
    } else {
      console.log("else");
      const ReferenceID = e.target.options[e.target.selectedIndex].getAttribute('id');
      const name = e.target.options[e.target.selectedIndex].getAttribute('name');
      const CustID = e.target.value;
      // const ReferenceID = e.reference;
      // const name = e.short_name;
      // const CustID = e.id;
      console.log(CustID, ReferenceID, name, e);
      console.log(CustID);
      const response = await showProducts({ "id": CustID });
      if (response.status === 200) {
        console.log("Done");
        console.log("Done", response.data);
        setLoader(false);
        setScreenState("Select_product")
        setProdata(response.data);
        setProdata({ ...proData, cusProdata: response.data, cusomerDetails: { "cusID": CustID, "name": name, "ReferenceID": ReferenceID, "agentName": AgentID } });
        // setProdata({...proData, cusomerDetails: { "cusID": CustID, "name": name }});
        // setShowModal(!showModal);
        // LoadProducts();
      }
    }
  }
  useEffect(() => {
    console.log(proData);
  },
    [proData])
  const location1 = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [hideStatus, setHidestatus] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [oldSearchText, setOldSearchText] = useState("");
  const [status, setStatus] = useState(false)

  const handleChange = e => {
    e.stopPropagation();
    setSearchTerm(e.target.value)
    // if (status === true && searchTerm) {
    //   console.log("1 nd rm");
    //   setScreenState("")
    // }
    if (e.target.value !== "") {
      const results = fetchData.cusID.filter((person) =>
        person.reference.toLowerCase().includes(e.target.value.toLowerCase())
      )
      if (results.length === 0) {
        setHidestatus(false);
      }
      else {
        setHidestatus(true);
        setSearchResults(results);
      }
    } else if (e.target.value === "") {
      // console.log("2 nd rm");
      setScreenState("")
      setOldSearchText("")
      setHidestatus(true);
      setArrowdirection(!arrowdirection)
    } else {
      setSearchResults(fetchData.cusID)
    }
  };

  const inputRef = useRef(null);

  const handleClickOutside = () => {
    setHidestatus(false);
    setArrowdirection(false)
    // setSearchTerm(oldSearchText)
    console.log('Clicked outside the input', hideStatus);
  };

  useEffect(() => {
    // setHidestatus(true);
    // setArrowdirection(false);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  // const handleSelectedValue = (item) => {
  //   console.log("done 1");
  //   const results = fetchData.cusID.filter((person) =>
  //     person.reference.toLowerCase().includes(item.reference.toLowerCase())
  //   )
  //   setSearchResults(results);
  // }
  return (
    <div className="add_new_order" ref={inputRef} onClick={(e) => { e.stopPropagation() }}>
      {loading ? (
        <CCol xs={12} >
          {
            show ? (
              <div className="mb-4 users-table-div">
                <CCardHeader className='users-table-title users-table-inner-div add_new_order'>
                  {/* <p>Add New Order</p> */}
                  <CCol>
                    <div className="dropdwon_sec">

                      <div className='serach_Drop_up'>
                        <input
                          type="text"
                          className='search_box'
                          placeholder="Search customer ID"
                          value={searchTerm}
                          onChange={handleChange}
                        // onFocus={() => setHidestatus(true)}
                        />
                        <button className='arrow_button'
                          onClick={() => { setArrowdirection(!arrowdirection); setHidestatus(!hideStatus) }}
                        ><img src={arrow} className={arrowdirection ? "downarrow_style uparrow_style" : 'downarrow_style'}
                          /></button>
                      </div>
                      {/* <CIcon icon={icon.cilMagnifyingGlass} size="xl"/> */}
                      {/* <span className='SelectBoxtitle'>Customer ID</span> */}
                      <CFormSelect size="sm" className={hideStatus ? "mb-3 customer_selection search_list show_search_list" : "hide_search_list"} aria-label="select customer id" id='select_customer_id' onChange={(e) => {
                        setSelectdata(e.target.value),
                          setCustomerID(e)
                      }} data-live-search="true" multiple={1}>
                        {/* <option disabled>Customer ID</option> */}
                        {searchResults.map((value, index) => (
                          <option
                            name={value.short_name}
                            id={value.reference}
                            value={value.id}
                            // selected={'33299473'}
                            // selected={() => { handleSelectedValue(value) }}
                            selected={addMoreData ? value.id === addMoreData.placeOrderData.customer_id ? value.reference : undefined : undefined}
                            onClick={(e) => {
                              setStatus(true);
                              setSearchTerm(value.reference);
                              // setScreenState("Select_product");
                              setArrowdirection(!arrowdirection);
                              setHidestatus(false);
                              setLoader(true);
                              // setCustomerID(value);
                            }}
                            className='onHover_select'
                          >
                            {value.reference}
                          </option>
                        ))}
                      </CFormSelect>
                    </div>
                  </CCol>
                </CCardHeader>
              </div>
            ) : null
          }
          {loader ?
            <div className="d-flex justify-content-center spinner-class">
              <div className="spinner-border spinner-border" role="status">
                {/* <span class="spinner-border spinner-border" aria-hidden="true"></span>
                            <span>Loading...</span> */}
              </div >
            </div> :
            <>
              {
                screenState === 'Select_product' ? (
                  <div>
                    <CContainer xm className='product-select'>
                      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 2 }}>
                        {fetchData.product_id.map((value, index) => (
                          <CCol xs>
                            <CCard className='productCategory_card'>
                              <CCardBody>
                                <button type="button" value={value.id} onClick={(e) => { onClickValue(e) }} style={{ backgroundImage: `url(${Mattress_image})` }} className='product-container'>
                                  {value.category_name}
                                </button>
                              </CCardBody>
                            </CCard>
                          </CCol>
                        ))}
                      </CRow>
                    </CContainer>
                  </div>
                ) : screenState === '4' ? (
                  products && <Products data={proData} onClick={chnageState} />
                ) : screenState === '3' ? (
                  products && <ProductHeadboard data={proData} onClick={chnageState} />
                ) : screenState == '1' ? (
                  products && <ProductMatttres data={proData} onClick={chnageState} />
                ) : null
              }
            </>
          }

        </CCol>
      ) : "Data is being fetched please wait"}
      {/* {<Products data={choice} />} */}


    </div>





  )
}

export default AddOrder