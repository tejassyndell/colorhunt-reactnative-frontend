/* eslint-disable */
import React,{useState,useEffect,useRef } from 'react'
import ReactDom from "react-dom";
import { useNavigate,Link } from 'react-router-dom'
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
import { UserDetails,userDelete,GetUserDetails, customerDetails, UpdateCustomersData } from '../api/api';
import EditIcon from '../../assets/images/edit.png'
import DeletIcon from '../../assets/images/delete.png'
import Excel from '../../assets/images/excel.svg'
import PdfIcon from '../../assets/images/pdf.svg'
import SortingIcon from 'src/assets/images/sorting.svg'
import DeletePopUp from 'src/assets/images/PopUp-Delete.svg'
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import ReactToPdf from "react-to-pdf";


const UserDetail = () => {
  const navigate = useNavigate();

  //***Admin Authentication***//
  const roleauth = localStorage.getItem('roleId')
  // console.log('roleauth',roleauth)

  useEffect(() => {
    if(roleauth==2)
    {
      navigate('/login')
    }
    else if(roleauth==1){
      // console.log("Admin Loggin In")
    }
  }, [roleauth])

  //***all user details***//
  const [userDetails, setuserDetails] = useState([])
  // console.log("userDetails",userDetails);
  const LoadUserDetails = async () => {
    const result = await customerDetails()
    setuserDetails(result.data)
    setUserSearch(result.data)
    setsorttableData(result.data)
  }
  useEffect(() => {
    LoadUserDetails()
  }, [])

 

  //***for delete user***//
  const deleteUser = async (id) => {
    console.log(id, 'user id')
    await userDelete(id).then((res) => {
      console.log('res',res.data)
      if(res.data == 'deleted'){
        // navigate('/user/userDetail')
        window.location.reload(false);
      }
      console.log('something wrong')
    })
  }
  //***popup start***//
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  //***popup end***//

  //***search filter start***//
  const [FilterValues, setFilterValues] = useState(null);
  const [userSearch, setUserSearch] = useState([])
  const handleFilter = (e) =>{
    if(e.target.value == ''){
      // setuserDetails(userSearch)
      setsorttableData(userSearch)
    }else{
      const filterResult = userSearch.filter(item => item.first_name.toLowerCase().includes(e.target.value.toLowerCase()) || item.last_name.toString().includes(e.target.value.toString()) || item.id.toString().includes(e.target.value.toString()) || item.email.toString().includes(e.target.value.toString()) || item.role_id.toString().includes(e.target.value.toString()) )
      // setuserDetails(filterResult) 
      setsorttableData(filterResult)  
    }
    setFilterValues(e.target.value)
  }
  console.log('FilterValues',FilterValues)
  
  //***search filter End***//
  //***EXPORT PDF***//
  const ref = React.createRef();
  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [11.5,6]
  };
  //***Sorting Functionality***/
  const [sorttableData, setsorttableData] = useState(userDetails);
  console.log('sorttableData',sorttableData)

  const sortData = (property) => {
    const sortedData = [...sorttableData].sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
    setsorttableData(sortedData);
  };
  //***Pagination Functionality***/
  const itemsPerPage = 10; // number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
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

  
  const updateCustomersData = async () => {
    console.log('dd');
    await UpdateCustomersData()
  }


  return (
    <div className='userdetail-sec'>
      <CCol xs={12}>
        <CCard className="mb-4 users-table-div">
          <CCardHeader className='users-table-title users-table-inner-div'>
            {/* <p>All Customer</p> */}
            <div className='userdetail-head'>
              <CFormInput className='search-input' type="text" placeholder="Start typing to search for users " value={FilterValues} onChange={handleFilter} />
 
              <button className='AddUserBtn save-btn adduser-btn' onClick={updateCustomersData}>Sync</button>&nbsp;&nbsp;
       
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button"
                table="table-to-xls"
                filename="AllUsers"
                sheet="tablexls"
                buttonText={<img src={Excel} width={30}/>}
              ></ReactHTMLTableToExcel>

              <ReactToPdf targetRef={ref} options={options} x={0} y={0} scale={0.8} filename="AllUsers.pdf"  >
                {({ toPdf }) => <button onClick={toPdf} className='pdf-btn' ><img src={PdfIcon} width={30}/></button>}
              </ReactToPdf>
            </div>
          </CCardHeader>  
          <CCardBody className='' >
              <CTable id="table-to-xls" ref={ref} className='users-table'>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Code<img src={SortingIcon} height={35} onClick={() => sortData('reference')}/></CTableHeaderCell>
                    <CTableHeaderCell scope="col">name<img src={SortingIcon} height={35} onClick={() => sortData('name')}/></CTableHeaderCell>
                    <CTableHeaderCell scope="col">Credit Limit<img src={SortingIcon} height={35} onClick={() => sortData('credit_limit')}/></CTableHeaderCell>
                    <CTableHeaderCell scope="col">Telephone subscriber Number<img src={SortingIcon} height={35} onClick={() => sortData('telephone_subscriber_number')}/></CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Action</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {sorttableData && currentData.map((users)=>{
                    return(
                      <CTableRow key={users.id}> 
                        <CTableHeaderCell scope="row">{users.reference}</CTableHeaderCell>
                        <CTableDataCell>{users.name}</CTableDataCell>
                        <CTableDataCell>{users.credit_limit}</CTableDataCell>
                        <CTableDataCell>{users.telephone_subscriber_number}</CTableDataCell>
                        {/* <CTableDataCell className='tbl-col-action'>
                          <p><img src={EditIcon} onClick={()=>{UpdateUser(users.id)}}/></p>&nbsp;&nbsp;
                          <p onClick={openModal}>{users.role_id == 'Administrator' ? "" : <img src={DeletIcon}/>}</p>
                          {showModal ? 
                            <div className="model-div delete-popup" ref={modalRef} onClick={closeModal}>
                              <div className="modal">
                                  <button onClick={() => setShowModal(false)} className='popup-close'>X</button> 
                                  <img src={DeletePopUp}/>
                                  <p><br/><strong>Are You Sure ?</strong><br/><br/>Do you really want to delete this customer ?<br/>This user will be permanently removed from data. </p>
                                  <div className='model-popup-btn-group'>
                                    <button className="AddUserBtn cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>&nbsp;&nbsp;
                                    <button className="AddUserBtn save-btn" type='submit' onClick={()=>{deleteUser(users.id)}}>Delete</button>
                                  </div>
                              </div>
                            </div>
                          : null
                          }
                        </CTableDataCell> */}
                        
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
                          <button className={currentPage === pageNumber ? 'pagination-btn active' : 'pagination-btn'} onClick={() => handlePageClick(pageNumber)} disabled={pageNumber === "..."} >
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
        </CCard>
      </CCol>
    </div> 
  )
}

export default UserDetail
