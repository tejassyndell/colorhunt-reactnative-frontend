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
import { DeleteVariationID, CustomersDetailsData } from '../api/api';
import DeletePopUp from 'src/assets/images/PopUp-Delete.svg'
import Excel from '../../assets/images/excel.svg'
import PdfIcon from '../../assets/images/pdf.svg'
import AscendingIcon from '../../assets/images/AscendingIcon.svg'
import DescendingIcon from '../../assets/images/DescendingIcon.svg'


import "../orders/css/allOrder.css"
import "../orders/css/addOrder.css"


const CustomersProducts = () => {
    const { id } = useParams();

    const [variationData, setVariationdata] = useState();
    const [variationId, setVariationId] = useState({ itemid: '' });
    const [showModal, setShowModal] = useState(false);
    const [isNull, setIsNull] = useState(false)
    const [jsonData, setjsonData] = useState([]);
    const [sorttableData, setsorttableData] = useState();
    const [userSearch, setUserSearch] = useState([])
    const [FilterValues, setFilterValues] = useState(null);
    const [errorMsg, setErrorMsg] = useState("No data To display")
    const navigate = useNavigate();

    const [selectedRows, setSelectedRows] = useState([]);
    const roleauth = localStorage.getItem('roleId')


    const setValueID = (e) => {
        setShowModal(true);
        console.log(e.target.id)
        setVariationId({ ...variationId, itemid: e.target.id });
    };



    //API call function
    const fetchdata = async () => {
        const response = await CustomersDetailsData(id);
        console.log(response.data);
        if (response.data.length === 0) {
            setErrorMsg("This product doesn't have any variations");
        } else {
            setIsNull(true);
            setVariationdata(response.data.results);
            setsorttableData(response.data.results);
            setUserSearch(response.data.results);
            setSorttableData(response.data.results);
            const modifiedData = response.data.results.map((item, index) => {
                if (item !== null && typeof item === 'object' && item.hasOwnProperty('name')) {
                    return {
                        No: index + 1,
                        'Name': item.name,
                        'Description': item.description,
                        'Group Id': item.group_id,
                        'Code': item.code,
                        'Mattress Size': item.mat_size,
                        'Springs': item.springs,
                        'Base Fabric color': item.base_fab_color,
                        'Feet Options': item.feet_options,
                        'Foot Boards': item.foot_board,
                        'Drawers': item.drawers,
                        'Base Size': item.baseSizes,
                        'Headboard Size': item.headboardSizes,
                        'Headboard color': item.headboardColor,
                    };
                }
                return null;
            });
            const filteredData = modifiedData.filter(item => item !== null);
            setjsonData(filteredData);
        }
    };

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
            "Base Fabric color",
            "Feet Options",
            "Foot Boards",
            "Drawers",
            "Base Size",
            "Headboard Size",
            "Headboard color"
        ];
        const rows = [];
        jsonData.map((item) => rows.push(Object.values(item)));

        doc.autoTable(columns, rows);
        doc.save('Product-Variations.pdf')
    }

    const [sorttabledata, setSorttableData] = useState(variationData);
    // Sorting Functionality
    const sortDataAsc = (property) => {
        const filteredData = sorttabledata.filter((item) => item !== null);
        const sortedData = [...filteredData].sort((a, b) => {
            if (a[property] < b[property]) return -1;
            if (a[property] > b[property]) return 1;
            return 0;
        });
        setSorttableData(sortedData);
        setVariationdata(sortedData)
    };

    const sortDataDesc = (property) => {
        const filteredData = sorttabledata.filter((item) => item !== null);
        const sortedData = [...filteredData].sort((a, b) => {
            if (a[property] < b[property]) return 1;
            if (a[property] > b[property]) return -1;
            return 0;
        });
        setSorttableData(sortedData);
        setVariationdata(sortedData)
    };

    const handleFilter = (e) => {
        const inputValue = e.target.value.toLowerCase();
        if (inputValue === '') {
            //   setSorttableData(userSearch);
            setVariationdata(userSearch);
        } else {
            const filterResult = variationData.filter((item) =>
                item &&
                (
                    (item.name && item.name.toLowerCase().includes(inputValue)) ||
                    (item.description && item.description.toLowerCase().includes(inputValue)) ||
                    (item.code && item.code.toString().toLowerCase().includes(inputValue)) ||
                    (item.group_id && item.group_id.toString().toLowerCase().includes(inputValue)) ||
                    (item.group_code && item.group_code.toString().toLowerCase().includes(inputValue)) ||
                    (item.mat_size && item.mat_size.toString().toLowerCase().includes(inputValue)) ||
                    (item.springs && item.springs.toLowerCase().includes(inputValue)) ||
                    (item.base_fab_color && item.base_fab_color.toString().toLowerCase().includes(inputValue)) ||
                    (item.baseSizes && item.baseSizes.toLowerCase().includes(inputValue)) ||
                    (item.feet_options && item.feet_options.toLowerCase().includes(inputValue)) ||
                    (item.foot_board && item.foot_board.toLowerCase().includes(inputValue)) ||
                    (item.headboardSizes && item.headboardSizes.toLowerCase().includes(inputValue)) ||
                    (item.headboardColor && item.headboardColor.toLowerCase().includes(inputValue)) ||
                    (item.drawers && item.drawers.toString().toLowerCase().includes(inputValue))
                )
            );
            setVariationdata(filterResult);
        }
        setFilterValues(inputValue);
    };




    const deletevariant = async () => {
        const itemid = { items: [variationId.itemid] }
        console.log(itemid)
        const result = await DeleteVariationID(itemid);
        console.log(itemid);
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
    }, [variationData]);

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
        const itemid = { items: variationId.itemid }
        console.log(itemid)

        // const result = await DeleteVariationID(itemid);
        // console.log(result)
        // if (result.status === 200) {
        //     console.log('Deleted successfully');
        //     setShowModal(false);
        //     // location.reload();
        // } else {
        //     console.log('error');
        // }
    }




    return (
        <div className="variationListmainDiv">
            <CCardHeader className='users-table-title users-table-inner-div'>
                <div className='userdetail-head'>
                    <CFormInput className='search-input' type="text" placeholder="Start typing to search for variations" value={FilterValues} onChange={handleFilter} />&nbsp;&nbsp;
                    <div className='export-grp'>
                        <p>Export</p>&nbsp;&nbsp;
                        <img src={Excel} id="test-table-xls-button" className="download-table-xls-button" width={30} onClick={() => exportExcelData()} />
                        <button onClick={downloadPdf} id='test-table-pdf-button' className='pdf-btn' ><img src={PdfIcon} width={30} /></button>
                    </div>
                </div>
            </CCardHeader>
            <div className="innerdiv">
                <CCardBody className='users-table' >
                    {isNull ? (
                        <div className='table-overflow'>
                            <CTable id="table-to-xls" className='users-table orders-table'>
                                <CTableHead>
                                    <CTableRow>
                                        {/* <CTableHeaderCell scope="col" className='table-head-th'><input type="checkbox" className='order-checkbox' checked={areAllRowsSelected()} onChange={handleHeaderCheckboxClick} /></CTableHeaderCell> */}

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
                                            <span className='th_text'>Code&nbsp;&nbsp;
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
                                            <span className='th_text'>Springs&nbsp;&nbsp;
                                                <div style={{ display: 'grid' }}>
                                                    <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('springs')} className='sortin-icon' />
                                                    <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('springs')} className='sortin-icon' />
                                                </div>
                                            </span>
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='table-head-th'>
                                            <span className='th_text'>Base Fabric color&nbsp;&nbsp;
                                                <div style={{ display: 'grid' }}>
                                                    <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('base_fab_color')} className='sortin-icon' />
                                                    <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('base_fab_color')} className='sortin-icon' />
                                                </div>
                                            </span>
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='table-head-th'>
                                            <span className='th_text'>Feet Options&nbsp;&nbsp;
                                                <div style={{ display: 'grid' }}>
                                                    <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('feet_options')} className='sortin-icon' />
                                                    <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('feet_options')} className='sortin-icon' />
                                                </div>
                                            </span>
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='table-head-th'>
                                            <span className='th_text'>Foot Boards&nbsp;&nbsp;
                                                <div style={{ display: 'grid' }}>
                                                    <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('foot_board')} className='sortin-icon' />
                                                    <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('foot_board')} className='sortin-icon' />
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
                                        <CTableHeaderCell scope="col" className='table-head-th'>
                                            <span className='th_text'>Base Size&nbsp;&nbsp;
                                                <div style={{ display: 'grid' }}>
                                                    <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('baseSizes')} className='sortin-icon' />
                                                    <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('baseSizes')} className='sortin-icon' />
                                                </div>
                                            </span>
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='table-head-th'>
                                            <span className='th_text'>Headboard Size&nbsp;&nbsp;
                                                <div style={{ display: 'grid' }}>
                                                    <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('headboardSizes')} className='sortin-icon' />
                                                    <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('headboardSizes')} className='sortin-icon' />
                                                </div>
                                            </span>
                                        </CTableHeaderCell>
                                        <CTableHeaderCell scope="col" className='table-head-th'>
                                            <span className='th_text'>Headboard color&nbsp;&nbsp;
                                                <div style={{ display: 'grid' }}>
                                                    <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('headboardColor')} className='sortin-icon' />
                                                    <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('headboardColor')} className='sortin-icon' />
                                                </div>
                                            </span>
                                        </CTableHeaderCell>
                                        {roleauth === 'Agent' ?  null :
                                        <CTableHeaderCell scope="col" className='table-head-th action-head'><div className='action'><span className='th_text'>Action</span></div></CTableHeaderCell>}
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {variationData && variationData.length > 0 && variationData.map((value, index) => (
                                        <CTableRow key={index}>
                                            {value && (
                                                <>
                                                    <CTableDataCell>{index + 1}</CTableDataCell>
                                                    <CTableDataCell>{value.name}</CTableDataCell>
                                                    <CTableDataCell>{value.description}</CTableDataCell>
                                                    <CTableDataCell>{value.group_id}</CTableDataCell>
                                                    <CTableDataCell>{value.code}</CTableDataCell>
                                                    <CTableDataCell>{value.mat_size + " Sizes"}</CTableDataCell>
                                                    <CTableDataCell>{value.springs}</CTableDataCell>
                                                    <CTableDataCell>{value.base_fab_color}</CTableDataCell>
                                                    <CTableDataCell>{value.feet_options}</CTableDataCell>
                                                    <CTableDataCell>{value.foot_board}</CTableDataCell>
                                                    <CTableDataCell>{value.drawers}</CTableDataCell>
                                                    <CTableDataCell>{value.baseSizes}</CTableDataCell>
                                                    <CTableDataCell>{value.headboardSizes}</CTableDataCell>
                                                    <CTableDataCell>{value.headboardColor}</CTableDataCell>
                                                    <CTableDataCell>
                                                    {roleauth === 'Agent' ?  null : <button
                                                            id='actionBtn'
                                                            value={value.id}
                                                            className='action-btn'
                                                            onClick={(e) => { setValueID(e) }}
                                                        >
                                                            <img id={value.id} src={DeletIcon} />
                                                        </button>}
                                                        {showModal ? (
                                                            <div className="model-div delete-popup">
                                                                <div className="modal">
                                                                    <button onClick={() => setShowModal(false)} className='popup-close'>X</button>
                                                                    <img src={DeletePopUp} />
                                                                    <p><br /><strong>Are You Sure?</strong><br /><br />Do you really want to delete this variation?<br />This variation will be deleted from the database too</p>
                                                                    <div className='model-popup-btn-group'>
                                                                        <button className="AddUserBtn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>&nbsp;&nbsp;
                                                                        {/* <button className="AddUserBtn save-btn" type='submit' onClick={()=>{testfuc(users.id)}}>Delete</button> */}
                                                                        <button className="AddUserBtn save-btn" onClick={() => {
                                                                            if (selectedRows.length < 0) {
                                                                                console.log(selectedRows)
                                                                                deleterowproductdata(selectedRows);
                                                                            }else{
                                                                                deletevariant(value.id);
                                                                            }
                                                                        }}>Delete</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : null}
                                                    </CTableDataCell>
                                                </>
                                            )}
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
                    {/* <div className="navigationbtns"> */}
                        {/* <CButton className='viewVariationBtn viewProduct' onClick={() => setShowModal(true)}>Delete product</CButton> */}
                        {/* <CButton className='viewVariationBtn viewProduct' onClick={() => navigate('/add-product')}>Create Product</CButton>
                        <CButton className='viewVariationBtn viewProduct' onClick={() => navigate('/products/all-products')}>All Products</CButton>
                    </div> */}
                </CCardBody>
            </div>
        </div>
    )
}

export default CustomersProducts