/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { fetchVariationData } from '../api/api';
import ReactDom from "react-dom";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CButton,
  CModal,
  CModalBody,
  CModalFooter
} from '@coreui/react'
import { useParams } from 'react-router-dom';
import DeletIcon from '../../assets/images/delete.png'
import * as XLSX from 'xlsx';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from 'react-router-dom';
import { DeleteVariationID, SelectVariationDelete } from '../api/api';
import DeletePopUp from 'src/assets/images/PopUp-Delete.svg'
import Excel from '../../assets/images/excel.svg'
import PdfIcon from '../../assets/images/pdf.svg'
import AscendingIcon from '../../assets/images/AscendingIcon.svg'
import DescendingIcon from '../../assets/images/DescendingIcon.svg'


import "../orders/css/allOrder.css"
import "../orders/css/addOrder.css"


const productVariation = () => {
  const { id } = useParams();

  const [variationData, setVariationdata] = useState();
  const [variationId, setVariationId] = useState({ items: '' });
  const [showModal, setShowModal] = useState(false);
  const [isNull, setIsNull] = useState(false)
  const [jsonData, setjsonData] = useState([]);
  const [sorttableData, setsorttableData] = useState([]);
  const [userSearch, setUserSearch] = useState([])
  const [FilterValues, setFilterValues] = useState(null);
  const [errorMsg, setErrorMsg] = useState("No data To display")
  const navigate = useNavigate();

  const [selectedRows, setSelectedRows] = useState([]);
  const roleauth = localStorage.getItem('roleId')


  const setValueID = (e) => {
    setShowModal(true);
    // alert(e.target.id);
    setVariationId({ ...variationId, itemid: e.target.id });
  };

  // useEffect(()=>{

  // },[variationId])


  //API call function
  const fetchdata = async () => {

    const response = await fetchVariationData({ ["id"]: id });
    console.log(response.data);
    if (response.data.length === 0) {
      setErrorMsg("This product doesn't have any variations")
    } else {
      setIsNull(true)
      setVariationdata(response.data)
      setsorttableData(response.data)
      setUserSearch(response.data)
      console.log(response.data);
      // const modifiedData = response.data.map((item, index) => ({
      //   No: index + 1, 'Name': item.name, 'Description': item.description, 'Group Id': item.group_id, 'Code': item.code, 'Mattress Size': item.mat_size, 'Springs': item.springs, 'Base Fabric colour': item.base_fab_color, 'Feet Options': item.feet_options, 'Foot Boards': item.foot_board, 'Footboard Included': item.IsFootboard, 'Drawers': item.drawers, 'Base Size': item.baseSizes, 'Headboard Size': item.headboardSizes, 'Headboard colour': item.headboardColor,
      // }));
        var products = [];
        const test = response.data.map((item, index) => {
          const codes = item.code.split('-');
          const testdata = codes.map((data, index)=>({
            id : data,
            Include_footboard : item.Include_footboard,
            baseSizes : item.Include_footboard,
            base_fab_color : null,
            code : data,
            description : item.description,
            drawers : item.drawers,
            feet_options : item.feet_options,
            foot_board : item.foot_board,
            group_code : item.group_code,
            group_id : item.group_id,
            headboardColor: item.headboardColor,
            headboardSizes : item.headboardSizes,
            id : item.id,
            mat_size : item.mat_size,
            name : item.name,
            p_group : item.p_group,
            springs: item.springs
          }))
          products.push(...testdata)
        });
        console.log(products);
      const modifiedData = products.map((item, index) => ({
        'Stock item code': item.code,
        'Stock item name': item.name,
        'Product group': item.group_code,
        'Tax code': 1,
        'Stock item description': item.description,
        "Manufacturer's name": '',
        "Manufacturer's part number": "",
        'Commodity code': '',
        'Net mass': '',
        'Stock take days': '',
        'Asset of stock - account number': '1001',
        'Asset of stock - cost centre': '',
        'Asset of stock - department': '',
        'Revenue - account number': '4000',
        'Revenue - cost centre': '',
        'Revenue - department': '',
        'Accrued receipts - account number': '2109',
        'Accrued receipts - cost centre': '',
        'Accrued receipts - department': '',
        'Issues - account number': '5000',
        'Issues - cost centre': '',
        'Issues - department': '',
        'Supplier': '',
        'Supplier lead time': '',
        'Supplier lead time unit': '',
        'Supplier minimum quantity': '',
        'Supplier usual order quantity': '',
        'Supplier part number': '',
        'Alternative item': '',
        'Alternative item name': '',
        'AnalysisName\\1': 'Product Range',
        'AnalysisValue\\1': '',
        'AnalysisName\\2': 'Product Number Of Pieces',
        'AnalysisValue\\2': '',
        'AnalysisName\\3': 'Product Size',
        'AnalysisValue\\3': item.mat_size,
        'AnalysisName\\4': 'Product Spring Count',
        'AnalysisValue\\4': item.springs,
        'AnalysisName\\5': 'Product Sprung Type',
        'AnalysisValue\\5': '',
        'AnalysisName\\6': 'Production List',
        'AnalysisValue\\6': '',
        'AnalysisName\\7': 'Product Cube',
        'AnalysisValue\\7': '',
        'AnalysisName\\8': 'Product Customer',
        'AnalysisValue\\8': '',
        'AnalysisName\\9': 'Production Drawer',
        'AnalysisValue\\9': item.drawers,
        'AnalysisName\\10': 'Packaging - Plastic',
        'AnalysisValue\\10': '',
        'AnalysisName\\11': 'Packaging - Polyester',
        'AnalysisValue\\11': '',
        'AnalysisName\\12': 'Packaging - Cardboard',
        'AnalysisValue\\12': '',
        'AnalysisName\\13': 'Tuft',
        'AnalysisValue\\13': '',
        'AnalysisName\\14': 'Product Brand',
        'AnalysisValue\\14': '',
        'AnalysisName\\15': '',
        'AnalysisValue\\15': '',
        'AnalysisName\\16': '',
        'AnalysisValue\\16': '',
        'AnalysisName\\17': '',
        'AnalysisValue\\17': '',
        'AnalysisName\\18': '',
        'AnalysisValue\\18': '',
        'AnalysisName\\19': '',
        'AnalysisValue\\19': '',
        'AnalysisName\\20': '',
        'AnalysisValue\\20': '',
        Barcode: '',
        Memo: '',
      }))
      // modifiedData.forEach(item => {
      //   delete item.id;
      //   delete item.group_id;
      // });
      setjsonData(modifiedData);
    }
  }
  //Download Excel
  const exportExcelData = () => {
    const downloadExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "Product-Variations.xlsx");
    }
    downloadExcel();
  }

  //Download pdf
  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
    });
    doc.text("Product Variations", 15, 10)
    const columns = [
      "No",
      "Name",
      "Description",
      "Group Id",
      "Code",
      "Mattress Size",
      "Springs",
      "Base Fabric colour",
      "Feet Options",
      "Foot Boards",
      "Drawers",
      "Base Size",
      "Headboard Size",
      "Headboard colour"
    ];
    const rows = [];
    jsonData.map((item) => rows.push(Object.values(item)));

    doc.autoTable(columns, rows);
    doc.save('Product-Variations.pdf')
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

  const handleFilter = (e) => {
    // console.log(e.target.value)
    if (e.target.value == '') {
      setsorttableData(userSearch)
      setVariationdata(userSearch)
    }
    else {

      const filterResult = userSearch.filter(item =>
        (item.id && item.id.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.name && item.name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.group_id && item.group_id.toString().toLowerCase().toString().includes(e.target.value.toString().toLowerCase())) ||
        (item.description && item.description.toLowerCase().toString().includes(e.target.value.toString().toLowerCase())) ||
        (item.code && item.code.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.mat_size && item.mat_size.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.baseSizes && item.baseSizes.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.springs && item.springs.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.base_fab_color && item.base_fab_color.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.feet_options && item.feet_options.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.foot_board && item.foot_board.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.drawers && item.drawers.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.baseSizes && item.baseSizes.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.headboardSizes && item.headboardSizes.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) ||
        (item.headboardColor && item.headboardColor.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()))
      );
      setsorttableData(filterResult)
      setVariationdata(filterResult)
      console.log('filterResult', filterResult)
    }
    setFilterValues(e.target.value)
  }



  const deletevariant = async () => {
    const itemid =   { items: [variationId.itemid] }
    console.log(itemid);
    const result = await DeleteVariationID(itemid);
    if (result.status === 200) {
      console.log('Deleted successfully');
      // Remove the deleted variation from the state
      const updatedData = variationData.filter(value => value.id != variationId.itemid);
      setVariationdata(updatedData);
      console.log(updatedData);
      // checkVariartions();
      if (updatedData.length === 0) {
        setIsNull(!isNull);
        setErrorMsg("This product doesn't have any variations")
      }
      setShowModal(false);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
  }, [variationData,variationId]);

  useEffect(() => {
    if (!id) {
      setErrorMsg("Please select product to see its variations")
    } else {
      //API call to fetch variations
      fetchdata()
    }
  }, [id])



  const handleHeaderCheckboxClick = () => {
    if (areAllRowsSelected()) {
      // Deselect all checkboxes
      setSelectedRows([]);
    } else {
      // Select all checkboxes
      const allRowItemIds = variationData.map((item) => item.id);
      console.log(allRowItemIds);
      setSelectedRows(allRowItemIds);
    }
  };
  const areAllRowsSelected = () => {

    return selectedRows.length === variationData.length;
  };


  const handleCheckboxClick = (product_id) => {

    if (selectedRows.includes(product_id)) {
      setSelectedRows(selectedRows.filter((items) => items !== product_id));
      console.log("d-selected", selectedRows);

    } else {
      setSelectedRows([...selectedRows, product_id])
      console.log("selected", selectedRows);

    }

  };

  const allRowsSelected = selectedRows.includes(id);

  const deleterowproductdata = async (product_ids) => {
    const itemid = { items: product_ids }
    console.log(itemid)
    const result = await DeleteVariationID(itemid);
    console.log(result)
    if (result.status === 200) {
      console.log('Deleted successfully');
      setSelectedRows([]);
      // Remove the deleted variation from the state
      const updatedData = variationData.filter(value => !itemid.items.includes(value.id));
      console.log(updatedData);
      setVariationdata(updatedData);
      // const updatedData = variationData.filter(value => !product_ids.includes(value.id));
      // setVariationdata(updatedData);
      // console.log(updatedData);
      // checkVariartions();
      if (updatedData.length === 0) {
        setIsNull(!isNull);
        setErrorMsg("This product doesn't have any variations")
      }
      setShowModal(false);
    } else {
      console.log('error');
    }
  }

  // const allCode = variationData && variationData.map((item) => item.code);
  // console.log(allCode);


  return (
    <div className="variationListmainDiv">
      <CCardHeader className='users-table-title users-table-inner-div'>
        <div className='userdetail-head'>
          <CFormInput className='search-input' type="text" placeholder="Start typing to search for variations" value={FilterValues} onChange={handleFilter} />&nbsp;&nbsp;
          <div className='export-grp'>
            <p>Export</p>&nbsp;&nbsp;
            {/* <img src={Excel} id="test-table-xls-button" className="download-table-xls-button" width={30} onClick={() => exportExcelData()} /> */}
            <img src={Excel} id="product_excel"  title='Excel' className="download-table-xls-button" width={30} onClick={() => exportExcelData()} />
            {/* <button onClick={downloadPdf} id='test-table-pdf-button' className='pdf-btn' ><img src={PdfIcon} width={30} /></button> */}
          </div>
        </div>
      </CCardHeader>
      <div className="innerdiv">
        <CCardBody className='users-table' >
          {isNull ? (
            <div className='table-overflow'>
              <CTable id="table-to-xls" className='users-table orders-table variation_table'>
                <CTableHead>
                  <CTableRow>
                  {roleauth === 'Agent' ?  null : <CTableHeaderCell scope="col" className='table-head-th'><input type="checkbox" className='order-checkbox' checked={areAllRowsSelected()} onChange={handleHeaderCheckboxClick} /></CTableHeaderCell>} 

                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Index&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('id')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('id')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Name&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('name')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('name')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Description&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('description')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('description')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Group Id&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('group_id')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('group_id')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Product Item Code&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('code')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('code')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Mattress Size&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('mat_size')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('mat_size')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Base Size&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('baseSizes')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('baseSizes')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Springs&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('springs')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('springs')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Base Fabric color&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('base_fab_color')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('base_fab_color')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell> */}
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Feet Options&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('feet_options')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('feet_options')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Head Board style&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('foot_board')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('foot_board')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Footboard Included&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('Include_footboard')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('Include_footboard')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Drawers&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('drawers')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('drawers')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Base Size&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('baseSizes')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('baseSizes')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell> */}
                    <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Headboard Size&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('headboardSizes')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('headboardSizes')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Headboard color&nbsp;&nbsp;
                        <div style={{ display: 'grid' }}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('headboardColor')} className='sortin-icon' />
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('headboardColor')} className='sortin-icon' />
                        </div>
                      </span>
                    </CTableHeaderCell> */}
                    {roleauth === 'Agent' ?  null : <CTableHeaderCell scope="col" className='table-head-th action-head'><div className='action'><span className='th_text'>Action</span></div></CTableHeaderCell> }
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {variationData && variationData.length > 0 && variationData.map((value, index) => (
                    <CTableRow>
                      {roleauth === 'Agent' ?  null :  <CTableHeaderCell className='index-class' scope="row">
                        <input type="checkbox" className='order-checkbox' name={value.id}
                          checked={selectedRows.includes(value.id)}
                          onChange={() => handleCheckboxClick(value.id)} /></CTableHeaderCell> }
                     
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{value.name}</CTableDataCell>
                      <CTableDataCell>{value.description}</CTableDataCell>
                      <CTableDataCell>{value.group_id}</CTableDataCell>
                      <CTableDataCell className='products_variation_code'>{value.code.toUpperCase()}</CTableDataCell>
                      <CTableDataCell>{value.mat_size}</CTableDataCell>
                      <CTableDataCell>{value.baseSizes}</CTableDataCell>
                      <CTableDataCell>{value.springs}</CTableDataCell>
                      {/* <CTableDataCell>{value.base_fab_color}</CTableDataCell> */}
                      <CTableDataCell>{value.feet_options}</CTableDataCell>
                      <CTableDataCell>{value.foot_board}</CTableDataCell>
                      <CTableDataCell>{value.Include_footboard}</CTableDataCell>
                      <CTableDataCell>{value.drawers}</CTableDataCell>
                      {/* <CTableDataCell>{value.baseSizes}</CTableDataCell> */}
                      <CTableDataCell>{value.headboardSizes}</CTableDataCell>
                      {/* <CTableDataCell>{value.headboardColor}</CTableDataCell> */}
                      <CTableDataCell>
                        {roleauth === 'Agent' ?  null :  <button id='actionBtn'  title='Delete product variation' value={value.id} className='action-btn' onClick={(e) => { setValueID(e) }}>
                          <img id={value.id} src={DeletIcon} />
                        </button> }
                     
                        {showModal ?
                          <div className="model-div delete-popup" >
                            <div className="modal">
                              <button onClick={() => setShowModal(false)} className='popup-close'>X</button>
                              <img src={DeletePopUp} />
                              <p><br /><strong>Are You Sure ?</strong><br /><br />Do you really want to delete this variation ?<br />This variation will be delated from database too</p>
                              <div className='model-popup-btn-group'>
                                <button className="AddUserBtn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>&nbsp;&nbsp;
                                {/* <button className="AddUserBtn save-btn" type='submit' onClick={()=>{testfuc(users.id)}}>Delete</button> */}
                                <button className="AddUserBtn save-btn" onClick={() => {
                                  if (selectedRows.length > 0) {
                                    deleterowproductdata(selectedRows);
                                  }else{
                                    deletevariant(value.id);
                                  }
                                }}>Delete</button>
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
          <div className="navigationbtns">
          {roleauth === 'Agent' ?  null : <CButton className='viewVariationBtn viewProduct' onClick={() => setShowModal(true)}>Delete product</CButton> }
            
            <CButton className='viewVariationBtn viewProduct' onClick={() => navigate('/add-product')}>Create Product</CButton>
            <CButton className='viewVariationBtn viewProduct' onClick={() => navigate('/products/all-products')}>All Products</CButton>
          </div>
        </CCardBody>
      </div>
    </div>
  )
}

export default productVariation