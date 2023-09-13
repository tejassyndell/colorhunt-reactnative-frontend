/* eslint-disable */
import React,{useState,useEffect,useRef } from 'react'
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
    CContainer ,
    CFormSelect
  } from '@coreui/react'
import placeholder from "../../../assets/images/placeholderhg.png"
import { fetchProductdata } from 'src/views/api/api'
import CIcon from '@coreui/icons-react';
import CartIcon from "../../../assets/images/icons/cartIcon.svg"
import {cilBritishPound} from '@coreui/icons';
import AddProductMattres from './AddProductMattres';



const Products = (props)=>{
    console.log(props.data,"data of the product")

    const [fetchedData, setFetchedData] = useState([]);
    const [productCode, setProductCode] = useState("");
    const [Screen, setScreen] = useState(false)
    const [ProductsData, setProductsData] = useState()
    const catData = props.data.catData;
    const cusProdata = props.data.cusProdata;
    const cusomerDetails = props.data.cusomerDetails;
        console.log(cusProdata)
    console.log(cusomerDetails)
    const groupIDs = [...new Set(Object.values(cusProdata).map(data => data.group_id))];// this is group_id that in this products data
    console.log(groupIDs);
    const groupData = groupIDs.map(groupID => catData.find(data => data.group_id === groupID));
    console.log(groupData)
    const filteredData = catData.filter(data => groupIDs.includes(data.group_id));
    console.log(filteredData);
    // const productType = {
    //     product : productName
    // }

    // const fetchProducts = async(productType)=>{
    //     const result = await fetchProductdata(productType);
    //     setFetchedData(result.data)
    //     // console.log(result.data)
    //     console.log(fetchedData)

    // }

    useEffect(()=>{
        console.log(ProductsData)
    },[ProductsData])


    const getProductCode =(e)=>{
        console.log(e.target.value);
        setProductCode(e.target.value);
        const groupedData = Object.values(cusProdata).filter(data => data.group_id === parseInt(e.target.value));
        setProductsData({groupedData, cusomerDetails})
        props.onClick(false)
        setScreen(true)
    }

    const productData = {
        productCode : productCode
    }

    return(
       <>
       {
        !(Screen) ? (
    <CContainer className='ProductsScreen'>
  <CRow xs={{ cols:4 }} className='product_scr_row'>
        {filteredData.map((value) => (
    <CCol className='product-col'>
        <div className="outerProductContainer">
            <div className="imageBox">
            <img src={placeholder} alt="placeholderimage" />
            </div>
            <div className="productDetailsBox">
            <CRow className='productData-row'>
                <h2 className='productTitle'>{value.name}</h2>
            </CRow>
            <CRow className='productData-row'>
                <CCol className='price-sec'>
                <h2 className='productPrice'><CIcon size="xxl"/>{value.code}</h2>
                </CCol>
                <CCol className='AddtoCartBtn'>
                    <button value={value.group_id} name='Product_code' onClick={(e)=>{getProductCode(e)}}><img style={{position : "relative", zIndex:"-1"}} src={CartIcon} alt="CartIcon" /></button>
                </CCol>
            </CRow>
            </div>
        </div>
    </CCol>
        ))}
  </CRow>

</CContainer>   
        )
    : (
        <AddProductMattres data={ProductsData}/>
    )
    }    
       </>
    )
}

export default Products