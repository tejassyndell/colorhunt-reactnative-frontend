/* eslint-disable */
import React,{useState,useEffect,useRef } from 'react'
import { DeleteColorID, AddColorVariation, fetchColorData } from '../../api/api';
import ReactDom from "react-dom";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormSelect,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormInput,
    CButton,
    CForm,
    CModal,
    CModalBody,
    CModalFooter
  } from '@coreui/react'
import { useParams } from 'react-router-dom';
import DeletIcon from '../../../assets/images/delete.png'
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from 'react-router-dom';
import DeletePopUp from 'src/assets/images/PopUp-Delete.svg'
import Excel from '../../../assets/images/excel.svg'
import PdfIcon from '../../../assets/images/pdf.svg'
import AscendingIcon from '../../../assets/images/AscendingIcon.svg'
import DescendingIcon from '../../../assets/images/DescendingIcon.svg'


import "../../orders/css/allOrder.css"
import "../../orders/css/addOrder.css"


const viewColor =()=>{
    const { id } = useParams();
    const intialValues = {
      id:'',
      name: '',
      code: '',
    };
    
    const [variationData, setVariationdata] = useState();
    const [variationId, setVariationId] = useState({ itemid: '' });
    const [showModal, setShowModal] = useState(false);
    const [isNull , setIsNull]= useState(false)
    const [jsonData, setjsonData] = useState([]);
    const [addModal, setaddModal] = useState(false);
    const [sorttableData, setsorttableData] = useState([]);
    const [userSearch, setUserSearch] = useState([])
    const [FilterValues, setFilterValues] = useState(null);
    const [state, SetState] = useState(intialValues)
    const [errorMsg, setErrorMsg] = useState("No data To display")
    const navigate = useNavigate();

    const setValueID = (e) => {
        setShowModal(true);
        setVariationId({ ...variationId, itemid: e.target.id });
      };
      const onValueChange = (e) => {
        SetState({ ...state, [e.target.name]: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)})
        setisValid({[e.target.name] : false})
        console.log();
        
    }
  //API add add Color Variation function
  const [isValid, setisValid] = useState({Name : false, Code : false,})


  // const SubmitData = async(e)=>{
  //   e.preventDefault();
  //   console.log("clicked")
  //      SetState({ ...state, id : id })
  //   if (state.name.trim().length == 0) {
  //       setisValid({Name : true});
  //   } else if (state.code.trim().length == 0){
  //       setisValid({Code : true});
      
  //   }else {
  //     console.log("aaaaaaaaaaaaaaaaaaa");
  //     const response = await AddColorVariation(state)
  //     console.log(response.data);
  //     if(response.data === 'succsess'){
  //        setaddModal(false)
  //        window.location.reload();
  //     }
  // // const SubmitData = async(e)=>{
  // //   e.preventDefault();
  // //   console.log("clicked")
  // //      SetState({ ...state, id : id })
  // //   if (state.name.trim().length == 0) {
  // //       setisValid({Name : true});
  // //   } else if (state.code.trim().length == 0){
  // //       setisValid({Code : true});
  // //     }else {
  // //     console.log("aaaaaaaaaaaaaaaaaaa");
  // //     const response = await AddColorVariation(state)
  // //     console.log(response.data);
  // //     if(response.data === 'succsess'){
  // //        setaddModal(false)
  // //        window.location.reload();
  // //     }
     
  // //   }
  // }
  const[codeColor,setCodeColor] = useState(false)
  const[nameColor,setNameColor] = useState(false)
  const SubmitData = async (e) => {
    e.preventDefault();
    console.log("clicked");
    SetState({ ...state, id: id });
  
    if (state.name.trim().length === 0) {
      setisValid({ Name: true });
    } else if (state.code.trim().length === 0) {
      setisValid({ Code: true });
    } else {
      console.log("Validation passed");
  
      // Perform the match validation between input and table values
      const inputName = state.name.trim();
      const inputCode = state.code.trim();
      const matchingRow = sorttableData.find(row => row.name === inputName || row.code === inputCode);
      if (matchingRow) {
        if(sorttableData.find(row => row.name === inputName)){
          setCodeColor(false)
          setNameColor(true)
          return false;
        }
        if(sorttableData.find(row => row.code === inputCode)){
          setNameColor(false)
          setCodeColor(true)
          return false;
        }
        else{
          return false;
        }
      
      } else {
        setNameColor(false)
        setCodeColor(false)
        const response = await AddColorVariation(state);
        console.log(response.data);
        setaddModal(false);
        window.location.reload()
      }
    }
  };


//API call function
const fetchdata = async()=>{
    
    const response = await fetchColorData({["id"] : id});
    console.log(id);
    // console.log("iiiiiiiiiiiiiiiii");
    SetState({ ...state, id : id })
    console.log(response.data.id);
    if(response.data.length === 0){
        setErrorMsg("This colour group doesn't have any colour variations")
    }else{
        setIsNull(true)
        setVariationdata(response.data)
        setsorttableData(response.data)
        setUserSearch(response.data)
        const modifiedData = response.data.map((item, index) => ({
          No: index + 1 , 'Name' : item.name, 'Group Id' : item.group_id , 'Code' : item.code,
        }));
        modifiedData.forEach(item => {
          delete item.id;
          delete item.group_id;
        });
        setjsonData(modifiedData);
    }
}


 //Download Excel
 const exportExcelData = () =>{
  const downloadExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "Colour-Variations.xlsx");
  }
  downloadExcel();
}

//Download pdf
const downloadPdf = () =>{
  const doc = new jsPDF({
    orientation: 'landscape',
  });
  doc.text("Color Variations", 15, 10)
  const columns = [
    "No",
    "Name",
    "Code"
  ];
  const rows = [];
  jsonData.map((item) => rows.push(Object.values(item)));

  doc.autoTable(columns, rows);
  doc.save('Colour-Variations.pdf')
}

  //Sorting Functionality
  const sortDataAsc = (property) => {
    const sortedData = [...sorttableData].sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
    setVariationdata(sortedData);
  };
  const sortDataDesc = (property) => {
    const sortedData = [...variationData].sort((a, b) => {
    if (a[property] < b[property]) return 1;
    if (a[property] > b[property]) return -1;
    return 0;
    });
    setVariationdata(sortedData);
  
  };

const handleFilter = (e) =>{
  // console.log(e.target.value)
  if(e.target.value == ''){
    setsorttableData(userSearch)
    setVariationdata(userSearch)
  }
  else{
   
    const filterResult = userSearch.filter(item =>
      (item.name && item.name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
      (item.code && item.code.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()))
    );
    setsorttableData(filterResult)
    setVariationdata(filterResult)
    console.log('filterResult',filterResult)
  }
  setFilterValues(e.target.value)
}



const deletevariant = async () => {
    const result = await DeleteColorID(variationId);
    if (result.status === 200) {
      console.log('Deleted successfully');
      // Remove the deleted variation from the state
      const updatedData = variationData.filter(value => value.id != variationId.itemid);
      setVariationdata(updatedData);
      console.log(updatedData);
      // checkVariartions();
      if(updatedData.length === 0){
        setIsNull(!isNull);
        setErrorMsg("This product doesn't have any variations")
      }
      setShowModal(false);
    } else {
      console.log('error');
    }
  };


  const setUpdateModalclock = () => { 
    setNameColor(false)
    setCodeColor(false)
    setaddModal(false)
    
  }



  const VariationColor = () =>{
    setaddModal(true)
  }

  useEffect(() => {
  }, [variationData]);

  useEffect(()=>{
    if(!id){
        setErrorMsg("Please select product to see its variations")
    }else{
    //API call to fetch variations
    fetchdata()
    
    }
  },[id])

return(
    <div className="variationListmainDiv">
      <CCardHeader className='users-table-title users-table-inner-div'>
            <button className='save-btn mb-0 product-varss' onClick={() => VariationColor()}>Add colour Variation</button>
            <div className='userdetail-head'>
              <CFormInput className='search-input' type="text" placeholder="Start typing to search for colour" value={FilterValues} onChange={handleFilter}/>&nbsp;&nbsp;
              <div className='export-grp'>
                <p>Export</p>&nbsp;&nbsp;
                <img src={Excel} id="test-table-xls-button" className="download-table-xls-button"  title='Excel'  width={30} onClick={() => exportExcelData()} />
                <button onClick={downloadPdf} id='test-table-pdf-button' className='pdf-btn' ><img src={PdfIcon} width={30} title='PDF'/></button>
              </div>
            </div>
      </CCardHeader>

      {addModal ? 
                            <div className="model-div delete-popup"/*  ref={modalRef} id={selectedItem.id} */>
                              <div className="modal">
                              <button onClick={() => setUpdateModalclock()} className='popup-close'>X</button>
                                <CForm>
                                <CFormInput type="text" id="NameBox" name='name' label='Name' onChange={(e)=>{onValueChange(e)}}/>
                                {isValid.Name && (<p style={{textAlign: "left",color: "#e55353"}}>Please Enter Product Name.</p>)}
                                {nameColor && (<p style={{textAlign: "left",color: "#e55353"}}>This Name Already Exists Please Change Name</p>)}
                                <CFormInput type="text" id="codeBox" name='code' label='Code' /* maxLength={maxLength} */ style={{ textTransform: 'uppercase' }} onChange={(e) => { onValueChange(e) }} />
                              {isValid.Code && (<p style={{ textAlign: "left", color: "#e55353" , marginTop:6}}>Please Enter Product Code.</p>)}
                              {codeColor && (<p style={{ textAlign: "left", color: "#e55353" , marginTop:6}}>This Code Already Exists Please Change Code</p>)}
                              {/* {CodeErrors && (<p style={{ textAlign: "left", color: "#e55353" , marginTop:6}}>This Code Already Exists Please Change Code.</p>)} */}
                                  <div className='model-popup-btn-group'>
                                    <CButton className='save-btn' onClick={() => setUpdateModalclock()}>Cancel</CButton>
                                    <CButton type="submit" className='save-btn' onClick={(e)=>{SubmitData(e)}}>Save Data</CButton>
                                  </div>
                                </CForm>
                          </div>
                        </div>
                        : null
                      }
    <div className="innerdiv">
    <CCardBody className='users-table' >
      {isNull ? (
    <div>
      <CTable id="table-to-xls">
        <CTableHead>
          <CTableRow>
          <CTableHeaderCell scope="col" className='table-head-th'>
              <span className='th_text'>Index&nbsp;&nbsp;
              <div style={{display:'grid'}}>
                  <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('id')} className='sortin-icon'/>
                  <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('id')} className='sortin-icon'/>
              </div>
              </span>
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className='table-head-th'>
              <span className='th_text'>Name&nbsp;&nbsp;
              <div style={{display:'grid'}}>
                  <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('name')} className='sortin-icon'/>
                  <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('name')} className='sortin-icon'/>
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
            <CTableHeaderCell scope="col" className='table-head-th action-head'><div className='action'><span className='th_text'>Action</span></div></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
        {variationData && variationData.length > 0 && variationData.map((value, index) => (
              <CTableRow>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{value.name}</CTableDataCell>
                <CTableDataCell>{value.code}</CTableDataCell>
                <CTableDataCell>
                <button id='actionBtn' value={value.id} className='action-btn' onClick={(e)=>{setValueID(e)}}>
                    <img id={value.id} src={DeletIcon}/>
                    </button> 
                    {showModal ? 
                    <div className="model-div delete-popup" >
                      <div className="modal">
                          <button onClick={() => setShowModal(false)} className='popup-close'>X</button> 
                          <img src={DeletePopUp}/>
                          <p><br/><strong>Are You Sure ?</strong><br/><br/>Do you really want to delete this variation ?<br/>This variation will be delated from database too</p>
                          <div className='model-popup-btn-group'>
                            <button className="AddUserBtn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>&nbsp;&nbsp;
                            {/* <button className="AddUserBtn save-btn" type='submit' onClick={()=>{testfuc(users.id)}}>Delete</button> */}
                            <button className="AddUserBtn save-btn" onClick={()=>{deletevariant()}}>Delete</button>
                          </div>
                      </div>
                    </div>
                  : null
                  }
                </CTableDataCell>
              </CTableRow>
        ))}
         </CTableBody>
      </CTable>
    </div>
     ) : (
      <div className="error noDatatoDisplay">
        <div>
          <h4>{errorMsg}</h4>
        </div>
      </div>
    )}
    {/* <div className="navigationbtns">
    <CButton className='viewVariationBtn viewProduct' onClick={() => navigate('/addproduct')}>Create Product</CButton>
    <CButton className='viewVariationBtn viewProduct' onClick={() => navigate('/products/')}>All Products</CButton>
    </div> */}
    </CCardBody>
    </div>
</div>
)
}

export default viewColor