/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react'
import {
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
} from '@coreui/react'
import { fetchLogs } from '../api/api'
import moment from 'moment';


const ShowLogs = (props)=>{
  const [fetchedLogs, setFetchedLogs] = useState([])

  //API CALL TO fetch Logs
  console.log(fetchedLogs);
  const getlogs = async()=>{
    const response = await fetchLogs({"id" : props.data})
    if(response.status === 200){
      console.log(response.data)
      setFetchedLogs(response.data)
    }
    else{
      console.log("Error in fetching logs")
    }
    }
    console.log(fetchedLogs)
  
  useEffect(()=>{
    if(props.data != null){
      getlogs();
    }else{
      // alert("no")
      console.log("no");
    }
  },[])
  const updatedFields = {
    load_date: "Loading Date",
    del_date: "Delivery Date",
    unit_price: "Unit Price",
    cus_po_num: "Customer PO Number",
    discount: "Discount",
    quantity: "Quantity",
    VAT: "VAT",
    os_ref: "OS Reference",
    product_po: "Product PO",
  };
    return(
        <div className="row order-calc">
          <div className="model-div delete-popup">
            <div className="modal orders-model" style={{height : '80%'}}>
              <div className="table-overflow">
                <CTable id="table-to-xls" className="users-table orders-table" style={{ overflowX:'auto' }}>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        No
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        Product Id
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        Field Name
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        Old Value
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        New Value
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        Modified Date
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        Reference
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        Changed by
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        Confirmed Date
                      </CTableHeaderCell>
                      {/* <CTableHeaderCell scope="col" className='table-head-th'>Date Confirmed</CTableHeaderCell> */}
                      <CTableHeaderCell scope="col" className="table-head-th">
                        Change Type
                      </CTableHeaderCell>
                      <CTableHeaderCell scope="col" className="table-head-th">
                        Reason
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                  {fetchedLogs && fetchedLogs.map((item, index)=>(
                    <CTableRow>
                      <CTableDataCell>{index + 1}</CTableDataCell>
                      <CTableDataCell>{item.product_id}</CTableDataCell>
                      <CTableDataCell>{updatedFields[item.filed_name]}</CTableDataCell>
                      <CTableDataCell>{item.old_value === "Invalid date" ? null : item.old_value}</CTableDataCell>
                      <CTableDataCell>{item.new_value}</CTableDataCell>
                      <CTableDataCell>{moment(item.date).format('yyyy-MM-DD')}</CTableDataCell>
                      <CTableDataCell>{item.reference}</CTableDataCell>
                      <CTableDataCell>{item.first_name}</CTableDataCell>
                      <CTableDataCell>{item.confirmed_date}</CTableDataCell>
                      <CTableDataCell>{item.reason}</CTableDataCell>
                      <CTableDataCell>{item.change_type}</CTableDataCell>
                    </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
              <div className="model-popup-btn-group justify-content-end">
                <button className="top-button cancel-btn"  onClick={props.closeModal}>Close</button>
              </div>
            </div>
          </div>
      </div>
    )
}

export default ShowLogs