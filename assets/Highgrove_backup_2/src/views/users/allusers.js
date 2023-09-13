/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import ReactDom from "react-dom";
import { useNavigate, Link } from 'react-router-dom'
import * as XLSX from 'xlsx';
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
// import { Link } from 'react-router-dom';
import { DocsExample } from 'src/components'
import { UserDetails, userDelete, GetUserDetails } from '../api/api';
import EditIcon from '../../assets/images/edit.png'
import DeletIcon from '../../assets/images/delete.png'
import Excel from '../../assets/images/excel.svg'
import PdfIcon from '../../assets/images/pdf.svg'
import SortingIcon from 'src/assets/images/sorting.svg'
import AscendingIcon from 'src/assets/images/AscendingIcon.svg'
import DescendingIcon from 'src/assets/images/DescendingIcon.svg'
import DeletePopUp from 'src/assets/images/PopUp-Delete.svg'
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPdf from "react-to-pdf";
import exportFromJSON from 'export-from-json'


import jsPDF from "jspdf";
import "jspdf-autotable";



function UserDetail() {
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({})
  const [FilterValues, setFilterValues] = useState(null);
  const [userSearch, setUserSearch] = useState([])
  const [sorttableData, setsorttableData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const itemsPerPage = 10; // number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [jsonData, setjsonData] = useState([]);
  const [popup, setpopup] = useState(false)
  const [deleteuser, Setdeleteuser] = useState(false)
  const [userID, SetUserID] = useState(null)
  //***Admin Authentication***//
  const roleauth = localStorage.getItem('roleId')
  useEffect(() => {
    if (roleauth == 2) {
      navigate('/login')
    }
    else if (roleauth == 1) {
      // console.log("Admin Loggin In")
    }
  }, [roleauth])

  //***all user details***//


  // export file in excell
  const exportExcelData = () => {
    // const data = jsonData;
    // const fileName = 'All-Users'
    // const exportType =  exportFromJSON.types.xls

    // exportFromJSON({ data, fileName, exportType })
    const downloadExcel = () => {
      const worksheet = XLSX.utils.json_to_sheet(jsonData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
      //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workbook, "All-Users.xlsx");
    }
    downloadExcel();
  }



  // console.log("userDetails",userDetails);
  const LoadUserDetails = async () => {
    const result = await UserDetails()
    setuserDetails(result.data)
    // setjsonData(result.data)
    setUserSearch(result.data)
    setsorttableData(result.data)

    const modifiedData = result.data.map((item, index) => ({
      ...item, No: index + 1, 'User Name': item.username, 'First Name': item.first_name, 'Last Name': item.last_name, Email: item.email, 'Role': item.role_id
    }));
    modifiedData.forEach(item => {
      delete item.role_id;
      delete item.id;
      delete item.first_name;
      delete item.last_name;
      delete item.email;
      delete item.username;
    });

    setjsonData(modifiedData);
    console.log(jsonData)
  }

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text("All Users Details", 15, 10)
    const columns = [
      "No.",
      "First Name",
      "Last Name",
      "User Name",
      "Email",
      "Role",
    ];
    const rows = [];
    jsonData.map((item) => rows.push(Object.values(item)));

    doc.autoTable(columns, rows);
    doc.save('AllUsers.pdf')
  }

  useEffect(() => {
    LoadUserDetails()

  }, [])

  const UpdateUser = (id) => {
    console.log(id)
    navigate(`/edit-user/${id}`)
  }

  //***for delete user***//
  const deleteUser = async (id) => {
    console.log(id, 'user id')
    // setpopup(true)
  }
  //***popup start***//
  const deleteUSer = async () => {
    console.log("confirmation called")
    Setdeleteuser(true)
    await userDelete(userID).then((res) => {
      console.log('res', res.data)
      if (res.data == 'deleted') {
        window.location.reload(false);
        setpopup(false)
      } else {
        setpopup(false)
      }
    })

    setpopup(false)
  }

  // console.log('popup',popup)
  const openModal = async (id) => {
    setShowModal(true);
    setpopup(true)
    SetUserID(id)
  }
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  //***popup end***//
  const AddUserRoute = () => {
    navigate('/add-new-user')
  }
  //***search filter start***//

  const handleFilter = (e) => {
    if (e.target.value == '') {
      // setuserDetails(userSearch)
      setsorttableData(userSearch)
    } else {
      const filterResult = userSearch.filter(item => item.username.toLowerCase().includes(e.target.value.toLowerCase()) || item.first_name.toLowerCase().includes(e.target.value.toLowerCase())  || item.last_name.toString().includes(e.target.value.toString().toLowerCase()) || item.id.toString().includes(e.target.value.toString()) || item.email.toString().includes(e.target.value.toString()) || item.role_id.toString().includes(e.target.value.toString()))
      // setuserDetails(filterResult) 
      setsorttableData(filterResult)
    }
    setFilterValues(e.target.value)
  }
  // console.log('FilterValues',FilterValues)

  //***search filter End***//
  //***EXPORT PDF***//
  const ref = React.createRef();
  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [11.5, 5.9]
  };




  //***Sorting Functionality***/
  // console.log('sorttableData',sorttableData)

  const sortDataAsc = (property) => {
    const sortedData = [...sorttableData].sort((a, b) => {
      const valueA = a[property].toString().toLowerCase();
      const valueB = b[property].toString().toLowerCase();
  
      if (valueA < valueB) return -1;
      if (valueA > valueB) return 1;
      return 0;
    });
    setsorttableData(sortedData);
  };

  const sortDataDesc = (property) => {
    const sortedData = [...sorttableData].sort((a, b) => {
      const valueA = a[property].toString().toLowerCase();
      const valueB = b[property].toString().toLowerCase();

      if (valueA < valueB) return 1;
      if (valueA > valueB) return -1;
      return 0;
    });
    setsorttableData(sortedData);
  };

  //***Pagination Functionality***/
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
  // const roleauth = localStorage.getItem('roleId')



  return (
    <div className='userdetail-sec'>
      <CCol xs={12}>
        <div className='userdetail-head px-2'>
          <CFormInput className='search-input' type="text" placeholder="Start typing to search for users " value={FilterValues} onChange={handleFilter} />
          {roleauth === 'Agent' ?  null : <button className='top-button' onClick={AddUserRoute} disabled={roleauth === 'Agent'}>Add New</button>}
          
          {/* <button
            className="top-button"
            style={roleauth === 'Agent' ? { cursor: 'not-allowed', backgroundColor: '#000000b8' } : {}}
            onClick={AddUserRoute}
            disabled={roleauth === 'Agent'}
          >
            Add New
          </button> */}
          <div className='export-grp'>
            <p>Export</p>&nbsp;&nbsp;
            <img id="test-table-xls-button" className="download-table-xls-button"  title='Excel' src={Excel} width={30} onClick={() => exportExcelData()} />
            <button onClick={downloadPdf} id='test-table-pdf-button' title='PDF' className='pdf-btn' ><img src={PdfIcon} width={30}  /></button>
          </div>
        </div>

        <div className="mb-4 px-2 users-table-div">
          <CCardHeader className='users-table-title users-table-inner-div'>
            {/* <p>All Users</p> */}
            {/* <div className='userdetail-head'>
              <CFormInput className='search-input' type="text" placeholder="Start typing to search for users " value={FilterValues} onChange={handleFilter} />
              <button className='top-button' onClick={AddUserRoute}>Add New</button>&nbsp;&nbsp;
              <div className='export-grp'>
                <p>Export</p>&nbsp;&nbsp;
                <img id="test-table-xls-button" className="download-table-xls-button"  src={Excel} width={30} onClick={() => exportExcelData()}/>
                <button onClick={downloadPdf} id='test-table-pdf-button' className='pdf-btn' ><img src={PdfIcon} width={30}/></button>
              </div>
            </div>
             */}
          </CCardHeader>
          <CCardBody className='' >
            <CTable id="table-to-xls" ref={ref} className='users-table'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>No&nbsp;&nbsp;
                      <div style={{ display: 'grid' }}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('id')} className='sortin-icon' />
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('id')} className='sortin-icon' />
                      </div>
                    </span>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Username&nbsp;&nbsp;
                      <div style={{ display: 'grid' }}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('username')} className='sortin-icon' />
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('username')} className='sortin-icon' />
                      </div>
                    </span>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>First Name&nbsp;&nbsp;
                      <div style={{ display: 'grid' }}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('first_name')} className='sortin-icon' />
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('first_name')} className='sortin-icon' />
                      </div>
                    </span>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Last Name&nbsp;&nbsp;
                      <div style={{ display: 'grid' }}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('last_name')} className='sortin-icon' />
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('last_name')} className='sortin-icon' />
                      </div>
                    </span>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Email&nbsp;&nbsp;
                      <div style={{ display: 'grid' }}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('email')} className='sortin-icon' />
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('email')} className='sortin-icon' />
                      </div>
                    </span>
                  </CTableHeaderCell>
                  {/* <CTableHeaderCell scope="col" className='table-head-th'>
                      <span className='th_text'>Contact No&nbsp;&nbsp;
                        <div style={{display:'grid'}}>
                          <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('contact_no')} className='sortin-icon'/>
                          <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('contact_no')} className='sortin-icon'/>
                        </div>
                      </span>
                      </CTableHeaderCell> */}
                  <CTableHeaderCell scope="col" className='table-head-th'>
                    <span className='th_text'>Role&nbsp;&nbsp;
                      <div style={{ display: 'grid' }}>
                        <img src={AscendingIcon} height={25} onClick={() => sortDataAsc('role_id')} className='sortin-icon' />
                        <img src={DescendingIcon} height={25} onClick={() => sortDataDesc('role_id')} className='sortin-icon' />
                      </div>
                    </span>
                  </CTableHeaderCell>
                  {roleauth === 'Agent' ? null : <CTableHeaderCell scope="col" className='table-head-th'><span className='th_text'>Action</span></CTableHeaderCell>}

                </CTableRow>
              </CTableHead>
              <CTableBody>
                {sorttableData && currentData.map((users, index) => {
                  return (
                    <CTableRow key={users.id}>
                      <CTableHeaderCell className='index-class' scope="row">{startIndex + index + 1}</CTableHeaderCell>
                      <CTableDataCell>{users.username}</CTableDataCell>
                      <CTableDataCell>{users.first_name}</CTableDataCell>
                      <CTableDataCell>{users.last_name}</CTableDataCell>
                      <CTableDataCell>{users.email}</CTableDataCell>
                      {/* <CTableDataCell>{users.contact_no}</CTableDataCell> */}
                      <CTableDataCell>{users.role_id}</CTableDataCell>
                      {roleauth === 'Agent' ? null : <CTableDataCell className='tbl-col-action'>
                        <p><img src={EditIcon} title='Edite order' onClick={() => { UpdateUser(users.id) }} /></p>&nbsp;&nbsp;
                        <p onClick={() => { openModal(users.id) }}>{users.role_id == 'Administrator' ? "" : <img src={DeletIcon} title='Delete user' />}</p>
                        {showModal ?
                          <div className="model-div delete-popup" ref={modalRef} onClick={closeModal} id={users.id}>
                            <div className="modal">
                              <button onClick={() => setShowModal(false)} className='popup-close'>X</button>
                              <img src={DeletePopUp} />
                              <p><br /><strong>Are You Sure ?</strong><br /><br />Do you really want to delete this user ?<br />This user will be permanently removed from database. </p>
                              <div className='model-popup-btn-group'>
                                <button className="AddUserBtn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>&nbsp;&nbsp;
                                {/* <button className="AddUserBtn save-btn" type='submit' onClick={()=>{testfuc(users.id)}}>Delete</button> */}
                                <button className="AddUserBtn save-btn" onClick={() => { deleteUSer() }}>Delete</button>
                              </div>
                            </div>
                          </div>
                          : null
                        }
                      </CTableDataCell>}


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
          </CCardBody>
        </div>
      </CCol>
    </div>
  )
}

export default UserDetail
