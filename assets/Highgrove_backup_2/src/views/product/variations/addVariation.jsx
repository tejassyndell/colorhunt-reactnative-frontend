/* eslint-disable */
import React,{useState,useEffect,useRef } from 'react'
import ReactDom from "react-dom";
import {
    CCard,
    CContainer,
    CCol,
    CRow,
    CForm,
    CFormInput,
    CFormLabel,
    CButton,
    CFormSelect
} from '@coreui/react'
import { AddVariation } from '../../api/api'
import '../CreateProduct/css/product.css'



const createVariation = () =>{
    const initialValues = ({
        table : "",
        variation : 'product_category',
        name : "",
        code : "",
        status : ""
    })
    const [formdata, setFormdata] = useState(initialValues);
    const [isValid, setisValid] = useState({Name : false, Code : false,})
    const onvalueChange = (e)=>{
        setFormdata({...formdata, [e.target.name]: e.target.value})
        console.log(formdata);
        setisValid({[e.target.name] : false})
    }
    const SubmitData = async(e)=>{
        e.preventDefault();
        console.log("clicked")

        if (formdata.name.trim().length == 0) {
            console.log("product name is empty.........");
            setisValid({Name : true});
        } else if (formdata.code.trim().length == 0) {
            console.log("product code is empty.........");
            setisValid({Code : true});
        } else {
            const response = AddVariation(formdata);
            console.log(response);
        }
    }
    return(
    <>
    <CContainer className='addVarientContainer add-product'>
    <CRow>
        <h2>Add Variation</h2>
    </CRow>
    <CForm className='addproduct-form'>
    <CFormSelect label="Choose Variation" name='variation' aria-label="Choose Variation" onChange={(e)=>{onvalueChange(e)}}>
        <option selected value="product_category">Category</option>
        <option value="product_category">Mattress Sizes</option>
        <option value="product_category">Springs</option>
        <option value="product_category">Base Sizes</option>
        <option value="product_category">Base Fabric Colour</option>
        <option value="product_category">Feet Option</option>
        <option value="product_category">Foot Board</option>
        <option value="product_category">Drawers</option>
        <option value="product_category">Headboard Sizes</option>
        <option value="product_category">Headboard Fabric Colour</option>
    </CFormSelect>
    <CFormInput type="text" id="NameBox" name='name' label='Name' onChange={(e)=>{onvalueChange(e)}}/>
    {isValid.Name && (<p style={{textAlign: "left",color: "#e55353"}}>Please Enter Product Name.</p>)}
    <CFormInput type="text" id="codeBox" name='code' label='Code' onChange={(e)=>{onvalueChange(e)}}/>
    {isValid.Code && (<p style={{textAlign: "left",color: "#e55353"}}>Please Enter Product Code.</p>)}
    <CButton type="submit" className='save-pro m-auto d-block mt-4' onClick={(e)=>{SubmitData(e)}}>Save Data</CButton>
    </CForm>
    </CContainer>
    </>
    )
}

export default createVariation;