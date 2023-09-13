/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
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
import { CustomersDetails, UpdateCustomersData } from '../api/api';
//import images
import Excel from '../../assets/images/excel.svg'
import PdfIcon from '../../assets/images/pdf.svg'
import SortingIcon from 'src/assets/images/sorting.svg'
import AscendingIcon from 'src/assets/images/AscendingIcon.svg'
import DescendingIcon from 'src/assets/images/DescendingIcon.svg'
import EditIcon from '../../assets/images/edit.png'
import { Link } from 'react-router-dom';
import CIcon  from '@coreui/icons-react';
import { cilChevronCircleRightAlt } from '@coreui/icons';

function AllCustomers() {
    //Declare Variable
    const [customerData, setcustomerData] = useState([])
    const [userSearch, setUserSearch] = useState([])
    const [sorttableData, setsorttableData] = useState([]);
    const [FilterValues, setFilterValues] = useState(null);
    const [jsonData, setjsonData] = useState([]);
    console.log('sorttableData', sorttableData)
    const itemsPerPage = 10; // number of items to display per page
    const [currentPage, setCurrentPage] = useState(1);

    //Get Customers details
    const LoadCustomers = async () => {
        const result = await CustomersDetails()
        console.log(result.data)
        setUserSearch(result.data)
        setcustomerData(result.data)
        setsorttableData(result.data)

        const modifiedData = result.data.map((item, index) => ({
            Code : item.id,
            Name : item.name,
            'Credit Limit' : item.credit_limit,
            Agent  : item.agent,
            'Contact Telephone' : item.telephone_subscriber_number,
        }));
        modifiedData.forEach(item => {
            delete item.status_reason;
            delete item.name;
            delete item.id;
            delete item.agent;
            delete item.balance;
            delete item.short_name;
            delete item.reference;
            delete item.credit_limit;
            delete item.telephone_subscriber_number;
            delete item.on_hold;
            delete item.account_status;
            delete item.account_status_type;
        });
        setjsonData(modifiedData);
    }
    useEffect(() => {
        LoadCustomers()
    }, [])
    // console.log('customerData',customerData)
    // console.log('jsonData',jsonData)

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
    const handleFilter = (e) => {
        console.log(e.target.value)
        if (e.target.value == '') {
            setsorttableData(userSearch)
        }
        else{
            const filterResult = userSearch.filter(item => item.id.toString().includes(e.target.value.toString()) || item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.credit_limit.toString().includes(e.target.value.toString()) || item.agent.toString().includes(e.target.value.toString()) || item.telephone_subscriber_number.toString().includes(e.target.value.toString()) )
            setsorttableData(filterResult) 
        }
        setFilterValues(e.target.value)
    }
    //Download Excel
    const exportExcelData = () => {
        const downloadExcel = () => {
            const worksheet = XLSX.utils.json_to_sheet(jsonData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
            XLSX.writeFile(workbook, "All-Users.xlsx");
        }
        downloadExcel();
    }

    //Download pdf
    const downloadPdf = () => {
        const doc = new jsPDF();
        doc.text("All Customers Details", 15, 10)
        const columns = [
            "Code",
            "Name",
            "Credit Limit",
            "Agent",
            "Contact Telephone",
        ];
        const rows = [];
        jsonData.map((item) => rows.push(Object.values(item)));

        doc.autoTable(columns, rows);
        doc.save('AllCustomers.pdf')
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

    const updateCustomersData = async () => {
        console.log('dd');
        await UpdateCustomersData()
      }

    return (
        <div className='userdetail-sec'>
            <CCol xs={12}>
                <div className="mb-4 px-2 users-table-div">
                    <CCardHeader className='users-table-title users-table-inner-div'>
                        {/* <p>All Customers</p> */}
                        <div className='userdetail-head'>
              <button className='AddUserBtn save-btn adduser-btn' onClick={updateCustomersData}>Sync</button>&nbsp;&nbsp;

                            <CFormInput className='search-input' type="text" placeholder="Start typing to search for Customers" value={FilterValues} onChange={handleFilter} />&nbsp;&nbsp;
                            <div className='export-grp'>
                                <p>Export</p>&nbsp;&nbsp;
                                <img id="test-table-xls-button" className="download-table-xls-button"  title='Excel' src={Excel} width={30} onClick={() => exportExcelData()} />
                                <button onClick={downloadPdf} id='test-table-pdf-button' className='pdf-btn' ><img src={PdfIcon} width={30} title='PDF' /></button>
                            </div>
                        </div>
                    </CCardHeader>
                    <CCardBody className='' >
                        <CTable id="table-to-xls" className='users-table'>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col" className='table-head-th'>
                                        <span className='th_text'>Code&nbsp;&nbsp;
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
                                        <span className='th_text'>Credit Limit&nbsp;&nbsp;
                                            <div style={{ display: 'grid' }}>
                                                <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('credit_limit')} className='sortin-icon' />
                                                <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('credit_limit')} className='sortin-icon' />
                                            </div>
                                        </span>
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='table-head-th'>
                                        <span className='th_text'>Agent&nbsp;&nbsp;
                                            <div style={{ display: 'grid' }}>
                                                <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('agent')} className='sortin-icon' />
                                                <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('agent')} className='sortin-icon' />
                                            </div>
                                        </span>
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col" className='table-head-th'>
                                        <span className='th_text'>Contact Telephone&nbsp;&nbsp;
                                            <div style={{ display: 'grid' }}>
                                                <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('telephone_subscriber_number')} className='sortin-icon' />
                                                <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('telephone_subscriber_number')} className='sortin-icon' />
                                            </div>
                                        </span>
                                    </CTableHeaderCell>
                                    {/* <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Action</span></CTableHeaderCell> */}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {sorttableData && currentData.map((item) => {
                                    return (
                                        <CTableRow key={item.id}>
                                            <CTableHeaderCell className='index-class' scope="row">{item.id}</CTableHeaderCell>
                                            <CTableHeaderCell className='index-class' scope="row">{item.name}</CTableHeaderCell>
                                            <CTableHeaderCell className='index-class' scope="row">{item.credit_limit}</CTableHeaderCell>
                                            <CTableHeaderCell className='index-class' scope="row">{item.agent}</CTableHeaderCell>
                                            <CTableHeaderCell className='index-class' scope="row">{item.telephone_subscriber_number}</CTableHeaderCell>
                                            
                                            {/* <CTableHeaderCell className='index-class customersaction' scope="row"> 
                                            <span style={{ paddingTop:3 }}><Link className='ViewVariations' to={`customers-products/${item.id}`} ><CIcon style={{ cursor: "pointer" }} icon={cilChevronCircleRightAlt} size="xl" /></Link></span>
                                            </CTableHeaderCell> */}

                                            {/* <CTableHeaderCell className='index-class' scope="row"><img src={EditIcon} onClick={()=>{UpdateUser(users.id)}}/></CTableHeaderCell> */}
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
                    </CCardBody>
                </div>
            </CCol>
        </div>
    )
}
export default AllCustomers