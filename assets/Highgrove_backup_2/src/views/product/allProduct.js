/* eslint-disable */
import React,{useState,useEffect,useRef } from 'react'
import ReactDom from "react-dom";
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
    CFooter
} from '@coreui/react'
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ProductsDetails } from '../api/api';
import { deletePRoductwithVariation } from '../api/api';
//import images
import Excel from '../../assets/images/excel.svg'
import PdfIcon from '../../assets/images/pdf.svg'
import SortingIcon from 'src/assets/images/sorting.svg'
import AscendingIcon from 'src/assets/images/AscendingIcon.svg'
import DescendingIcon from 'src/assets/images/DescendingIcon.svg'
import EditIcon from '../../assets/images/edit.png'
import DeletIcon from '../../assets/images/delete.png'

import CIcon  from '@coreui/icons-react';
import DeletePopUp from 'src/assets/images/PopUp-Delete.svg'
import { cilChevronCircleRightAlt } from '@coreui/icons';
import { Link } from 'react-router-dom';

function AllProducts(){
  const itemsPerPage = 10; // number of items to display per page
  const [productData, setproductData] = useState([])
  const [products,setproducts] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [userSearch, setUserSearch] = useState([])
  const [sorttableData, setsorttableData] = useState([]);
  const [FilterValues, setFilterValues] = useState(null);
  const [variationId, setVariationId] = useState({ itemid: '' });
  const [jsonData, setjsonData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // console.log('***sorttableData***',sorttableData)
  console.log('FilterValues',FilterValues)
  const roleauth = localStorage.getItem('roleId')
  //Get products details
  const LoadProducts = async () => {
    const result = await ProductsDetails()
    setproducts(result.data)
    setUserSearch(result.data)
    setproductData(result.data)
    setsorttableData(result.data)
    console.log(result.data);

    const modifiedData = result.data.map((item, index) => ({
      "No" : index + 1, "Item Code" : item.product_code, "Product Name" : item.name, "Product Group Code": item.group_id
      // "No" : index + 1, "Item Code" : item.product_code, "Product Name" : item.name, "Product Group Code": item.group_id
    }));
    modifiedData.forEach(item => {
      // delete item.product_group_name;
      delete item.product_size;
      delete item.product_storage;
      delete item.product_feet;
      delete item.product_fabric;
    });
    setjsonData(modifiedData);

  }
   // console.log("Asd")
   const setValueID = (e) => {
    setShowModal(true);
    setVariationId({ ...variationId, itemid: e.target.id });
  };
  useEffect(() => {
    LoadProducts()
  }, [])
  console.log(products)


  //Sorting Functionality
  const sortDataAsc = (property) => {
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
      const filterResult = userSearch.filter(item => item.product_code && item.product_code.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) || item.name && item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.group_code && item.group_code.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()) || item.group_name && item.group_name.toLowerCase().includes(e.target.value.toLowerCase()))
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
        XLSX.writeFile(workbook, "All-Products.xlsx");
    }
    downloadExcel();
  }
  //to delete product
  const deleteProduct = async()=>{
    console.log(variationId)
    const response = await deletePRoductwithVariation(variationId);
    if(response.status === 200){
      setShowModal(!showModal);
      LoadProducts();
    }
  }

  //Download pdf
  const downloadPdf = () =>{
    const doc = new jsPDF();
    doc.text("All Products Details", 15, 10)
    const columns = [
      "index",
      "Item Code",
      // "Product Name",
      // "Product Group Code",
    ];
    const rows = [];
    jsonData.map((item) => rows.push(Object.values(item)));

    doc.autoTable(columns, rows);
    doc.save('AllProducts.pdf')
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
  // for (let i = 1; i <= totalPages; i++) {
  //     pageNumbers.push(i);
  // }
  const threshold = 1; 

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= threshold) {
          pageNumbers.push(i);
        } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
          pageNumbers.push("..."); // add "..." element if not already added
        }
    }
  // calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = sorttableData.slice(startIndex, endIndex);
  const indexs = sorttableData.length;


  return(
    <div className='userdetail-sec'>
      <CCol xs={12}>
      <div className='userdetail-head px-2'>
              <CFormInput className='search-input' type="text" placeholder="Start typing to search for Products" value={FilterValues} onChange={handleFilter}  />&nbsp;&nbsp;
            <div className='export-grp'>
              <p>Export</p>&nbsp;&nbsp;
              <img id="test-table-xls-button" className="download-table-xls-button"  title='Excel'  src={Excel} width={30} onClick={() => exportExcelData()} />
              <button onClick={downloadPdf} id='test-table-pdf-button' title='PDF' className='pdf-btn' ><img src={PdfIcon} width={30}/></button>
            </div>
            </div>
        <div className="mb-4 px-2 users-table-div">
          <CCardHeader className='users-table-title users-table-inner-div'>
            {/* <p>All Products</p> */}
            {/* <div className='userdetail-head'>
              <CFormInput className='search-input' type="text" placeholder="Start typing to search for Products" value={FilterValues} onChange={handleFilter}  />&nbsp;&nbsp;
            <div className='export-grp'>
              <p>Export</p>&nbsp;&nbsp;
              <img id="test-table-xls-button" className="download-table-xls-button"  src={Excel} width={30} onClick={() => exportExcelData()} />
              <button onClick={downloadPdf} id='test-table-pdf-button' className='pdf-btn' ><img src={PdfIcon} width={30}/></button>
            </div>
            </div> */}
          </CCardHeader>
            <CTable id="table-to-xls" className='users-table'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Product Item Group Code&nbsp;&nbsp;
                      <div style={{display:'grid'}}>
                        <img src={AscendingIcon} onClick={() => sortDataAsc('product_code')} className='sortin-icon'/>
                        <img src={DescendingIcon} onClick={() => sortDataDesc('product_code')} className='sortin-icon'/>
                      </div>
                    </span>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Product Name&nbsp;&nbsp;
                      <div style={{display:'grid'}}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('name')} className='sortin-icon'/>
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('name')} className='sortin-icon'/>
                      </div>
                    </span>
                    </CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Product Item Code&nbsp;&nbsp;
                      <div style={{display:'grid'}}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('group_code')} className='sortin-icon'/>
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('group_code')} className='sortin-icon'/>
                      </div>
                    </span>
                    </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Product Group Name&nbsp;&nbsp;
                      <div style={{display:'grid'}}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('group_name')} className='sortin-icon'/>
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('group_name')} className='sortin-icon'/>
                      </div>
                    </span>
                  </CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Actions</span>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {sorttableData && currentData.map((item)=>{
                // {sorttableData && currentData.map((item)=>{
                  return(
                    <CTableRow className='allproductsRow' key={item.id}>
                      <CTableDataCell className='index-class' scope="row">{item.product_code}</CTableDataCell>
                      <CTableDataCell className='index-class' scope="row">{item.name}</CTableDataCell>
                      {/* <CTableDataCell className='index-class' scope="row">{item.group_code}</CTableDataCell>
                      <CTableDataCell className='index-class' scope="row">{item.group_name}</CTableDataCell> */}
                      <CTableDataCell className='index-class actionIcons'  scope="row">
                        <Link className='ViewVariations' to={`/product-variations/${item.id}`} ><CIcon style={{cursor : "pointer"}} title='Product variation' icon={cilChevronCircleRightAlt} size="xl"/></Link>
                        {roleauth === 'Agent' ?  null : <Link className='ViewVariations editicon' to={`edit-product/${item.id}`} ><img src={EditIcon} title='Edite product' /></Link>}
                        {roleauth === 'Agent' ?  null : <button value={item.id}  title='Delete product' className='action-btn deleteIcon' onClick={(e)=>{setValueID(e)}}>
                            <img id={item.id} src={DeletIcon}/>
                          </button>}
                        
                            {showModal ? 
                            // {showModal ? 
                            <div className="model-div delete-popup" >
                              <div className="modal">
                                  <button onClick={() => setShowModal(false)} className='popup-close'>X</button> 
                                  <img src={DeletePopUp} />
                                  <p><br/><strong>Are You Sure ?</strong><br/><br/>Do you really want to delete this product ?<br/>All the variations of this product will be deleted</p>
                                  <div className='model-popup-btn-group'>
                                    <button className="AddUserBtn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>&nbsp;&nbsp;
                                    {/* <button className="AddUserBtn save-btn" type='submit' onClick={()=>{testfuc(users.id)}}>Delete</button> */}
                                    <button className="AddUserBtn save-btn" onClick={()=>{deleteProduct()}}>Delete</button>
                                  </div>
                              </div>
                            </div>
                          : null
                          }
                        </CTableDataCell>
                      {/* <CTableHeaderCell className='index-class' scope="row"><img src={EditIcon} /></CTableHeaderCell> */}
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
                          <button className={currentPage === pageNumber ? 'pagination-btn active' : 'pagination-btn'} onClick={() => handlePageClick(pageNumber)} disabled={pageNumber === "..."}>
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
export default AllProducts
