/* eslint-disable */
import React,{useState,useEffect,useRef } from 'react'
import {
    CCard,
    CCardHeader,
    CCol,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CForm,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react'
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { VariationDetails, variationDelete, SelectVariationDelete, variationEdit, AddVariation} from '../../api/api';
import '../CreateProduct/css/product.css'
import { Link } from 'react-router-dom';
import CIcon  from '@coreui/icons-react';
import { cilChevronCircleRightAlt } from '@coreui/icons';
//import images
import Excel from '../../../assets/images/excel.svg'
import PdfIcon from '../../../assets/images/pdf.svg'
import AscendingIcon from '../../../assets/images/AscendingIcon.svg'
import DescendingIcon from '../../../assets/images/DescendingIcon.svg'
import EditIcon from '../../../assets/images/edit.png'
import DeletIcon from '../../../assets/images/delete.png'
import DeletePopUp from '../../../../src/assets/images/PopUp-Delete.svg'
import { renderSync } from 'sass';

function viewVariation(){
  const itemsPerPage = 50; // number of items to display per page
  const saveBtnRef = useRef();
  const [productData, setproductData] = useState([])
  const [variation,setvariation] = useState([])
  const [userSearch, setUserSearch] = useState([])
  const [sorttableData, setsorttableData] = useState([]);
  const [FilterValues, setFilterValues] = useState(null);
  const [jsonData, setjsonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVariation, setisVariation] = useState("product_mat_size")
  const [showModal, setShowModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [addModal, setaddModal] = useState(false);
  const [popup, setpopup] = useState(false);
  const [deletevariation, SetdeleteVariation] = useState(false);
  const [itemID, SetItemID] = useState(null)
  const [deletData, setDeletData] = useState({variation:"product_mat_size", ItemId: ""})
  const [ dataid, setdataid]= useState({id : '', columnName : 'mat_size', value : ''});
  // console.log('***sorttableData***',sorttableData)
  console.log('FilterValues',FilterValues)
  const roleauth = localStorage.getItem('roleId')

  const catdata = {
    category : isVariation
  }
  //Get variation details
  const LoadVariation = async (data) => {
      console.log("..................."+isVariation);
    const result = await VariationDetails(data)
    setvariation(result.data)
    setUserSearch(result.data)
    setproductData(result.data)
    setsorttableData(result.data)

    const modifiedData = result.data.map((item, index) => ({
      ...item,  No: index + 1 , 'Name' : item.value, 'Code' : item.code,
    }));
    modifiedData.forEach(item => {
      delete item.id;
      delete item.value;
      delete item.code;
    });
    setjsonData(modifiedData);

  }
  useEffect(() => {
    LoadVariation(catdata)
  }, [isVariation])
  console.log(variation)

  //Sorting Functionality
  const sortDataAsc = (property) => {
    console.log(property)
    const sortedData = [...sorttableData].sort((a, b) => {
    if (a[property] < b[property]) return -1;
    if (a[property] > b[property]) return 1;
    return 0;
    });
    setsorttableData(sortedData);
  };
  const sortDataDesc = (property) => {
    const sortedData = [...sorttableData].sort((a, b) => {
    if (a[property] < b[property]) return 1;
    if (a[property] > b[property]) return -1;
    return 0;
    });
    setsorttableData(sortedData);
  };

  //Search Filter
  const handleFilter = (e) =>{
    console.log(e.target.value)
    if(e.target.value == ''){
      setsorttableData(userSearch)
    }
    else{
      const filterResult = userSearch.filter(item => item.code && item.code.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) || item.value && item.value.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) )
      setsorttableData(filterResult)  
      console.log('filterResult',filterResult)
    }
    setFilterValues(e.target.value)
  }

  //Download Excel
  const exportExcelData = () =>{
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(jsonData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "Variations.xlsx");
    }
    downloadExcel();
  }

  //Download pdf
  const downloadPdf = () =>{
    const doc = new jsPDF();
    doc.text("variation Details", 15, 10)
    const columns = [
      "No",
      "Name",
      "Code",
    ];
    const rows = [];
    jsonData.map((item) => rows.push(Object.values(item)));

    doc.autoTable(columns, rows);
    doc.save('Variations.pdf')
  }

  //Pagination Functionality
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

  // storing variation category from drop down
  const handleVariation = (e)=>{
    console.log(e.target.value)
   const objValues = JSON.parse(e.target.value);
   console.log(objValues.value);
   console.log(objValues.Cname);
    setisVariation(objValues.value);
    setDeletData({...deletData, variation: objValues.value})
    console.log(deletData);
    setdataid({...dataid , columnName: objValues.Cname});
  }

  // delete variation functionality
  const openModal = async (id) => {
    setShowModal(true);
    setpopup(true)
    SetItemID(id)
  }
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };

  //***popup start***//
  const deleteVariation = async(e) =>{
    console.log("confirmation called")
    setDeletData({...deletData, ItemId: dataid})
    SetdeleteVariation(true)
    const data = {
      variation : deletData.variation,
      ItemId : dataid
    }
    console.log(data)
    await SelectVariationDelete(data).then((res) => {
    console.log('res',res)
    if(res.data == "deleted"){
      LoadVariation(catdata);
      setShowModal(false)
    }else{
      setpopup(false)
    }
  })
  }

// edit variation start
  const setdeleteid = (e)=>{
    console.log(e);
    openModal(true)
    setdataid({...dataid , id: e.id, value: e.value});
    console.log(dataid);
  }

  const [selectedItem, setSelectedItem] = useState({value:'', code:'', id:'', isVariation});
  const [Valid, setValid] = useState({value : false, code : false,})
  const [updatedName, setUpdatedName] = useState('');
  const [updatedCode, setUpdatedCode] = useState('');

  const [codeErrorsup, setCodeErrorsup] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [editchagevalue, setEditChageValue] = useState(false);
  const [codeExits,setCodeexits]=useState(false)
  const [nameExits,setNameexits]=useState(false)
  let isCodeExists = false;
  let isNameExists = false;


  /**** chnage data  ****/
const [changeName,setChangeName]=useState(false);
const [changeCode,setChangeCode]=useState(false);
const [validateStatus,setValidateStatus]=useState(false)
const changeDataname=(e)=>{
setName(e)
setChangeName(true)
}
const changeDatacode=(e)=>{
setCode(e)
setChangeCode(true)
}
useEffect(()=>{
  if(updateModal==false){
    setValidateStatus(false)
    LoadVariation(catdata)
   }
},[updateModal])

  const updateData = async () => {
    selectedItem.isVariation = isVariation;
    // Find the index of the selected item
    const selectedIndex = currentData.findIndex(item => item.id === selectedItem.id);

    const newName = updatedName.trim();
    const newCode = updatedCode.trim();
    const currentItem = currentData[selectedIndex];
    if(changeCode===true && newCode===currentItem.code) {
      setCodeexits(true)
    }
    else{
      setCodeexits(false)
    }
    if(changeName && newName!==currentItem.name){
     
      variation.some((item) => {
        if(changeName===true && newName!==item.value){
          let update =async()=>{
          let res= await variationEdit(selectedItem)
          LoadVariation(catdata)
          }
          update()
          setUpdateModal(false)
         
        }
      });
    }
    if(changeCode && newCode!==currentItem.code){
      setCodeexits(true)
      variation.some((item) => {
        if(changeCode===true && newCode!==item.code){
          let update =async()=>{
           let resname = await variationEdit(newName,newCode)
          }
          update()
          setUpdateModal(false)
        }
      });
    }




    if (newName.length === 0) {
      console.log("product name is empty.........");
      setValid({ Name: true });
      // setUpdateModal(true)
    } else if (newCode.length === 0) {
      console.log("product code is empty.........");
      setValid({ Code: true });
      // setUpdateModal(true)
    }
    
    else if ((newCode!==currentItem.code&&newName!==currentItem.name)) {
    
     
      // Check if the new code already exists in the variation array
      variation.some((item) => {
        if(changeName===true || changeCode ===true){
          let update =async()=>{
           let res=await variationEdit(selectedItem)
           if(res.data=="true"){
            setValidateStatus(true)
            setUpdateModal(true)
           }
           else{
            setValidateStatus(false)
            setUpdateModal(false)
           }
           
          }
          update()
        }
        else{
          isCodeExists = false;
        }
      });
      // setUpdateModal(false);
      // setEditChageValue(false)

      if (isCodeExists && isNameExists) {
        setEditChageValue(false)
        setCodeErrorsup(true);
      } else {
        currentData[selectedIndex].value = newName;
        currentData[selectedIndex].code = newCode;
        setSelectedItem(prevSelectedItem => ({ ...prevSelectedItem, value: newName }));
        setCodeErrorsup(false);
        if ( "edited") {
        } else {
          setPopup(false);
        }
      setCodeErrorsup(false);
      }
    } else {
      setEditChageValue(true)
    }
  };






 




useEffect(() => {
    console.log(selectedItem.value);
    console.log(selectedItem.code);
  }, [selectedItem]);

  const setName = (e) => {
    const newName = e.target.value;
    console.log(newName);
    setUpdatedName(newName);
    setSelectedItem(prevSelectedItem => ({ ...prevSelectedItem, value: newName }));
  }
  
  const setCode = (e) => {
    const newCode = e.target.value;
    console.log(newCode);
    setUpdatedCode(newCode);
    setSelectedItem(prevSelectedItem => ({ ...prevSelectedItem, code: newCode }));
  }  

  const handleEditItemClick=(item)=>{
    console.log(item);
    setUpdateModal(true);
    setUpdatedName(item.value);
    setUpdatedCode(item.code);
    setSelectedItem(prevSelectedItem => ({ ...prevSelectedItem, id: item.id, value: item.value, code: item.code }));
  }
  
  // Add Variation start
  const initialValues = ({
    table : "",
    variation : 'product_mat_size',
    Cname : "",
    name : "",
    code : "",
    status : ""
  })


  const [CodeErrors, setCodeerrors] = useState(false);
  const SubmitData = async (e) => {
    e.preventDefault();
    console.log("clicked");

    if (formdata.name.trim().length === 0) {
      console.log("product name is empty.........");
      setisValid({ Name: true });
    } else if (formdata.code.trim().length === 0) {
      console.log("product code is empty.........");
      setisValid({ Code: true });
    } else {
      let isCodeExists = false;
      variation.some((item) => {
        if (item.code === formdata.code) {
          isCodeExists = true;
          return true; // Exit the loop early if code exists
        }
      });

      if (isCodeExists) {
        setCodeerrors(true)
      } else {
        setCodeerrors(false)
        const response = await AddVariation(formdata);
        if (response.status === 200) {
          console.log(response);
          LoadVariation(catdata);
          setaddModal(false);
          LoadVariation();
          setCodeerrors(false)
        } else {
          // alert("Error in saving product");
          console.log("Error in saving product");
        }
      }
    }
  };

  const setUpdateModalclock = () => { 
    setUpdateModal(false);
    setaddModal(false);
    setCodeerrors(false);
    setCodeErrorsup(false);
    setEditChageValue(false);
    
  }
  const [formdata, setFormdata] = useState(initialValues);
  const [maxLength, setMaxLength] = useState(2);
  const [isValid, setisValid] = useState({ Name: false, Code: false, })
  const onvalueChange = (e) => {
    const { name, value, variation } = e.target;
    const uppercaseValue = value.toUpperCase();

    setFormdata((prevFormdata) => ({
      ...prevFormdata,
      [name]: uppercaseValue,
    }));

    setisValid((prevIsValid) => ({
      ...prevIsValid,
      [name]: false,
    }));

    if (name === 'variation') {
      setFormdata((prevFormdata) => ({
        ...prevFormdata,
        name: '',
        code: '',
      }));
    }

    if (name === 'variation') {
      if (value === 'products_drawers') {
        setMaxLength(1);
      } else {
        setMaxLength(2);
      }
    }
  };


useEffect(() => {
    console.log(formdata);
    isVariationExists()
  }, [formdata]);

  console.log("varriation data",variation)
  variation.map((item) => {
    console.log(item.code);
  });

  const isVariationExists = () => {
    console.log(formdata.code);
    if (formdata.code) {
      console.log('test');

    }

  }

  return(
    <div className='userdetail-sec'>
      <CCol xs={12}>
        <div className="mb-4 px-2 users-table-div">
          <CCardHeader className='users-table-title users-table-inner-div row mx-0'>
            {/* <p>View Variation</p> */}
            <div className='manage-varition col px-0'>
              <CFormSelect label="Choose Variation" name='variation' aria-label="Choose Variation" className='view-variation' onChange={(e)=>{handleVariation(e)}}>
                    {/* this values are according to database table names pls do not change */}
                    {/* <option selected value="product_category">Category</option> */}
                    {/* <option selected  value='{"value": "product_groups", "Cname": "productGroup"}'>Product Group</option> */}
                    <option selected value='{"value": "product_mat_size", "Cname": "mat_size"}'>Mattress Sizes</option>
                    <option  value='{"value": "product_springs", "Cname": "springs"}'>Springs</option>
                    <option value='{"value": "product_headboard_size", "Cname": "headboardSizes"}'>Headboard Sizes</option>
                    <option  value='{"value": "products_footboards", "Cname": "foot_board"}'>Head Board style</option>
                    <option value='{"value": "product_base_size", "Cname": "baseSizes"}'>Base Sizes</option>
                    <option  value='{"value": "product_feet", "Cname": "feet_options"}'>Feet Option</option>
                    <option  value='{"value": "products_drawers", "Cname": "drawers"}'>Drawers</option>
                    <option value='{"value": "product_base_fabcolor", "Cname": "base_fab_color"}'>Colour</option>
                    {/* <option value='{"value": "products_headboard_style", "Cname": "headboardColor"}'>Headboard Fabric Colour</option> */}


                    {/* <option value="product_springs">Springs</option>
                    <option value="product_base_size">Base Sizes</option>
                    <option value="product_base_fabcolor">Base Fabric Colour</option>
                    <option value="product_feet">Feet Option</option>
                    <option value="products_footboards">Foot Board</option>
                    <option value="products_drawers">Drawers</option>
                    <option value="product_headboard_size">Headboard Sizes</option>
                    <option value="products_headboard_style">Headboard Fabric Colour</option> */}
                </CFormSelect>
                <CButton className='save-btn mb-0 product-var' onClick={() => setaddModal(true)}>Add Variation</CButton>
              </div>
            <div className='userdetail-head col px-0'>
              <CFormInput className='search-input' type="text" placeholder="Start typing to search for variations" value={FilterValues} onChange={handleFilter}  />&nbsp;&nbsp;
              <div className='export-grp'>
                <p>Export</p>&nbsp;&nbsp;
                <img id="test-table-xls-button" className="download-table-xls-button" title='Excel' src={Excel} width={30} onClick={() => exportExcelData()} />
                <button onClick={downloadPdf} id='test-table-pdf-button' className='pdf-btn' ><img src={PdfIcon} width={30} title='PDF'/></button>
              </div>
            </div>
          </CCardHeader>
            {/* <div className='manage-varition'>
              <CFormSelect label="Choose Variation" name='variation' aria-label="Choose Variation" className='view-variation' onChange={(e)=>{handleVariation(e)}}> */}
                    {/* this values are according to database table names pls do not change */}
                    {/* <option selected value="product_category">Category</option> */}
                    {/* <option selected value="product_mat_size">Mattress Sizes</option>
                    <option value="product_springs">Springs</option>
                    <option value="product_base_size">Base Sizes</option>
                    <option value="product_base_fabcolor">Base Fabric Colour</option>
                    <option value="product_feet">Feet Option</option>
                    <option value="products_footboards">Foot Board</option>
                    <option value="products_drawers">Drawers</option>
                    <option value="product_headboard_size">Headboard Sizes</option>
                    <option value="products_headboard_style">Headboard Fabric Colour</option>
                </CFormSelect>
                <CButton className='save-btn' onClick={() => setaddModal(true)}>Add Variation</CButton>
              </div> */}
            <CTable id="table-to-xls" className='users-table w-100'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text' style={{paddingLeft:0}}>NO&nbsp;&nbsp;
                      <div style={{display:'grid'}}>
                        <img src={AscendingIcon} onClick={() => sortDataAsc('id')} className='sortin-icon'/>
                        <img src={DescendingIcon} onClick={() => sortDataDesc('id')} className='sortin-icon'/>
                      </div>
                    </span>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Name&nbsp;&nbsp;
                      <div style={{display:'grid'}}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('value')} className='sortin-icon'/>
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('value')} className='sortin-icon'/>
                      </div>
                    </span>
                    </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Code&nbsp;&nbsp;
                      <div style={{display:'grid'}}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('code')} className='sortin-icon'/>
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('code')} className='sortin-icon'/>
                      </div>
                    </span>
                    </CTableHeaderCell>
                  {roleauth === 'Agent' ?  null : <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Action&nbsp;&nbsp;</span>
                  </CTableHeaderCell>}
                  
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {sorttableData && currentData.map((item, index)=>{
                  return(
                    <CTableRow key={item.id}>
                      <CTableHeaderCell className='index-class ps-4' scope="row">{index+1}</CTableHeaderCell>
                      <CTableHeaderCell className='index-class' scope="row">{item.value}</CTableHeaderCell>
                      <CTableHeaderCell className='index-class' scope="row">{item.code.toUpperCase()}</CTableHeaderCell>
                      <CTableHeaderCell className='index-class tbl-col-action' scope="row">
                      { isVariation == 'product_base_fabcolor' ?
                        <Link className='ViewVariations' to={`/color-variants/${item.id}`}><CIcon style={{cursor : "pointer"}} icon={cilChevronCircleRightAlt} title='View variation' size="xl"/></Link>
                        : null
                      }
                       {roleauth === 'Agent' ?  null : <p ><img className='mx-1' nam src={EditIcon} title='Edite' onClick={()=>{handleEditItemClick(item)}}/></p>}
                       {roleauth === 'Agent' ?  null :<p className='mx-1' onClick={()=>{setdeleteid({id : item.id,value : item.value})}}><img src={DeletIcon} title='Delete'/></p>}
                          {showModal ? 
                            <div className="model-div delete-popup" ref={modalRef} onClick={closeModal} id={item.id}>
                              <div className="modal">
                                  <button onClick={() => setShowModal(false)} className='popup-close'>X</button> 
                                  <img src={DeletePopUp}/>
                                  <p><br/><strong>Are You Sure ?</strong><br/><br/>Do you really want to delete this Variation?<br/>This action will permanently remove the Variation attribute from the database, including all associated product variations</p>
                                  <div className='model-popup-btn-group'>
                                    <button className="AddUserBtn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>&nbsp;&nbsp;
                                    <button value={item.id} className="AddUserBtn save-btn" onClick={(e)=>{deleteVariation(e)}}>Delete</button>
                                  </div>
                              </div>
                            </div>
                          : null
                          }
                           {updateModal ?
                        <div className="model-div delete-popup" ref={modalRef} id={selectedItem.id}>
                          <div className="modal">
                            <button onClick={() => setUpdateModalclock()} className='popup-close'>X</button>
                            <CForm>
                              <CFormInput type="text" id="NameBox" value={updatedName} name='value' label='Name' onChange={(e) => changeDataname(e)} />
                              {Valid.Name && (<p style={{ textAlign: "left", color: "#e55353" , marginTop:6}}>Please enter product name</p>)}
                              <CFormInput type="text" id="codeBox" name='code' label='Code'style={{ textTransform: 'uppercase' }} maxLength={maxLength} value={updatedCode} onChange={(e) =>  changeDatacode(e)} />
                              {/* {Valid.Code && (<p style={{ textAlign: "left", color: "#e55353" , marginTop:6}}>Please enter product code</p>)} */}
                              {(validateStatus) && (<p style={{ textAlign: "left", color: "#e55353" , marginTop:6}}>This code already exists please change code</p>)}
                              {/* {(changeCode && nameExits) && (<p style={{ textAlign: "left", color: "#e55353" , marginTop:6}}>This variation name & code already exists</p>)} */}
                              <div className='model-popup-btn-group'>
                                <CButton className='AddUserBtn save-btn' onClick={() => setUpdateModalclock()}>Cancel</CButton>
                                <CButton
                                  onClick={()=>updateData()}
                                  className='AddUserBtn save-btn'
                                  disabled={updatedName.trim().length === 0 || updatedCode.trim().length === 0} // Disable the button if both name and code fields are empty
                                  ref={saveBtnRef}
                                >
                                  Apply
                                </CButton>
                                </div>
                                </CForm>
                              </div>
                            </div>
                          : null
                          }
                          {addModal ? 
                            <div className="model-div delete-popup" ref={modalRef} id={selectedItem.id}>
                              <div className="modal">
                              <button onClick={() => setUpdateModalclock()} className='popup-close'>X</button>
                                <CForm>
                                <CFormSelect label="Choose Variation" name='variation' aria-label="Choose Variation" onChange={(e)=>{onvalueChange(e)}}>
                                    {/* this values are according to database table names pls do not change */}
                                    {/* <option selected value="product_category">Category</option> */}
                                    {/* <option selected value="product_groups">Product Group</option> */}
                                    <option selected value="product_mat_size">Mattress Sizes</option>
                                    <option value="product_springs">Springs</option>
                                    <option value="product_headboard_size">Headboard Sizes</option>
                                    <option value="products_footboards">Head Board style</option>
                                    <option value="product_base_size">Base Sizes</option>
                                    <option value="product_feet">Feet Option</option>
                                    <option value="products_drawers">Drawers</option>
                                    <option value="product_base_fabcolor">Colour</option>
                                    {/* <option value="products_headboard_style">Headboard Fabric Colour</option> */}
                                </CFormSelect>
                                <CFormInput type="text" id="NameBox" name='name' label='Name' onChange={(e)=>{onvalueChange(e)}}/>
                                {isValid.Name && (<p style={{textAlign: "left",color: "#e55353"}}>Please enter product name</p>)}
                                <CFormInput type="text" id="codeBox" name='code' label='Code' maxLength={maxLength} style={{ textTransform: 'uppercase' }} onChange={(e) => { onvalueChange(e) }} />
                              {isValid.Code && (<p style={{ textAlign: "left", color: "#e55353" , marginTop:6}}>Please enter product code</p>)}
                              {CodeErrors && (<p style={{ textAlign: "left", color: "#e55353" , marginTop:6}}>This code already exists please change code</p>)}
                                  <div className='model-popup-btn-group'>
                                    <CButton className='save-btn' onClick={() => setUpdateModalclock()}>Cancel</CButton>
                                    <CButton type="submit" className='save-btn' onClick={(e)=>{SubmitData(e)}}>Add</CButton>
                                  </div>
                                </CForm>
                          </div>
                        </div>
                        : null
                      }
                      </CTableHeaderCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
              <CTableDataCell colSpan={8}>
                <nav className='pagination-nav'>
                  <ul className='pagination'>
                    <li>
                      <button disabled={currentPage === 1} onClick={handlePrevPage} className='pagination-btn Prev-btn'>Prev</button>
                    </li>
                      {pageNumbers.map((pageNumber) => (
                        <div key={pageNumber}>
                          <button className={currentPage === pageNumber ? 'pagination-btn active' : 'pagination-btn'} onClick={() => handlePageClick(pageNumber)}>
                            {pageNumber}
                          </button>
                        </div>
                      ))}
                    <li>
                      <button disabled={currentPage === totalPages} onClick={handleNextPage} className='pagination-btn Next-btn'>Next</button>
                    </li>
                  </ul>
                </nav>
              </CTableDataCell>
            </CTable>
        </div>
      </CCol>
    </div>
  )
}
export default viewVariation