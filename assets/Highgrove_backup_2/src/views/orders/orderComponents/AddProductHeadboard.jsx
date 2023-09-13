/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CButton, CFormCheck } from '@coreui/react'
import placeHolder from '../../../assets/images/placeholderimg.png'
import Message_alert from "../orderComponents/Message_alert"
import { saveOrderData, saveChangesLog } from '../../api/api'
import { useNavigate } from 'react-router-dom'

const AddProduct = (props) => {
  // const productData = props.data
  const [checked, setChecked] = useState({ headeboard: false, footboard: false, isfootboard: false})
  const [filteredValues, setFiltredValues] = useState({ Sizes:true, Range: true, Style:true})
  const [productData, SetproductData] = useState([])
  const [updatedObjectValues, SetupdatedObjectValues] = useState({Sizes:[], Range: [], Style:[], Final:[]})
  const [eventValue, setEventValue] = useState({Sizes:'', Range: ''});
  const [loading, setLoading] = useState(false)
  const [productVariationData, SetproductVariationData] = useState()
  const [placeOrderValues, SetplaceOrderValues] = useState();
  const [selectedHeadsize, setSelectedHeadsize] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [withoutFootboard, setWithoutFootboard] = useState(false);
  const [withFootboard, setWithFootboard] = useState(false);
  const [SecondPart, setSecondPart] = useState(false);
  const [footValues, setFootValues] = useState(false);
  const [disablefield, setdisablefield] = useState(false);
  const [showAll, setshowAll] = useState(false);
  const [rangeValue, setRangeValue] = useState();
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertText, setAlertText] = useState("Failed to fetch data");
  const Navigate = useNavigate();

  useEffect(()=> {},[showAll])

  const [activeKey, setActiveKey] = useState({
    headboard: 1,
    headboardStyle: 1,
    footboard: 1,
  })

  const setValues = (productDatas)=>{
    const uniqueFields = Object.keys(productDatas[0]).reduce((uniqueObj, field) => {
      const uniqueValues = [...new Set(productDatas.map((data) => data[field]))];
      return { ...uniqueObj, [field]: uniqueValues };
    }, {});
    const updatedData = {
      ...uniqueFields,
      Headboard: {
          Sizes: filteredValues.Sizes ? uniqueFields.headboardSizes : productVariationData.Headboard[`Sizes`],
          Range: filteredValues.Range ? uniqueFields.foot_board : productVariationData.Headboard[`Range`],
      }
    };
    
      delete updatedData.headboardSizes;
      delete updatedData.headboardColor;
      delete updatedData.base_fab_color;
      delete updatedData.feet_options;
    SetproductVariationData(updatedData)
  }

  useEffect(()=>{
  SetproductData(props.data.groupedData);
  SetplaceOrderValues({...placeOrderValues, customerDetails: props.data.cusomerDetails })
  }, [])



  useEffect(() => {
    if (!productData || productData.length === 0) {
      console.log("Data is being loaded");
    } else {
      setValues(productData);
      console.log(productVariationData);
      setLoading(true);
    }
  }, [productData]);
  useEffect(() => {}, [rangeValue]);
  

  
const setOrderValues = (e) => {
  const fieldName = e.target.name;
  const fieldValue = e.target.value;
  console.log(fieldName)
  console.log(fieldValue)
  
  if (fieldName === 'Sizes') {
    console.log("run");
    setSelectedHeadsize(fieldValue)
    setSelectedRange(null);
    setFiltredValues({Sizes:false, Range: true, Style:true });
    setEventValue({...eventValue, Sizes : fieldValue});
  }else if (fieldName === 'Range') {
    setSelectedRange(fieldValue);
    setFiltredValues({Range: false, Style:true});
    setEventValue({...eventValue, Range : fieldValue});
    setSecondPart(true);
  }
  };


useEffect(() => {
  console.log(filteredValues)
  if(filteredValues.Sizes === false) {
    setFiltredValues({...filteredValues, Sizes : null});
    filterDataByValue(eventValue.Sizes, 'Sizes');
  }else if(filteredValues.Range === false) {
    filterDataByValue(eventValue.Range, 'foot_board'); //here will be name of field which is in database, in place of 'feet_options'
  }else if(filteredValues.Style === false) {
    filterDataByValue(eventValue.Style, 'feet_options');//here will be name of field which is in database, in place of 'feet_options'
  }
}, [filteredValues]);


  useEffect(()=>{
    if(productVariationData){
    console.log(productVariationData)
    setLoading(true)
  }
  }, [productVariationData])

  useEffect(()=>{
    console.log(placeOrderValues)
  }, [placeOrderValues])
  useEffect(()=>{
    console.log(updatedObjectValues)
  }, [updatedObjectValues])

  
  function filterDataByValue(filterValue, fieldname) {
    console.log(fieldname);
    console.log(filterValue)
    if (fieldname === 'Sizes') {
    const filteredData = productData.filter(item => item.headboardSizes.includes(filterValue));
    SetupdatedObjectValues({...updatedObjectValues, Range : filteredData})
    setValues(filteredData);
    setshowAll(false);
    setChecked({ ...checked, isfootboard: false })
    setWithoutFootboard(false)
    setWithFootboard(false)
    }else if (fieldname === 'foot_board') {
    setWithoutFootboard(false)
    setWithFootboard(false)
    const filteredData = updatedObjectValues.Range.filter(item => item[fieldname].includes(filterValue));
    setRangeValue(filterValue);
    SetupdatedObjectValues({...updatedObjectValues, Storage : filteredData})
    setValues(filteredData);
    setChecked({ ...checked, isfootboard: false })
    }
  }
  const saveCartData = async()=>{
    console.log(placeOrderValues);

    if (placeOrderValues.customerDetails.OrderID) {
     
      let initiallogsValues = {
        date: new Date().toLocaleDateString(),
        userID: localStorage.getItem('userId'),
        orderID: placeOrderValues.customerDetails.OrderID,
        reason: 'New Added',
        change_type: 'New Added',
      }
      const AddedLogs = {
        code: placeOrderValues.orderData[0].code,
      }
      const logsValues = ({ addedProductInfo: initiallogsValues, AddedPRoduct: AddedLogs })
      const result = await saveOrderData(placeOrderValues)
      if (result.status === 200) {
        const result = await saveChangesLog(logsValues)
        console.log(result.data)
        if (result.status === 200) {
          //logs saved
        } else {
          // alert('error in saving logs')
          console.log('error in saving logs');
        }

        Navigate('/cart')

      } else {
        // alert('failed')
        console.log('failed')
        setAlertStatus(true)
        setAlertText('failed to save order data')
      }
    } else {
     
      const result = await saveOrderData(placeOrderValues)
      if (result.status === 200) {
        Navigate('/cart')
      } else {
        // alert('failed')
        console.log('failed')
        setAlertStatus(true)
        setAlertText('failed to save order data')
      }
    }
  }

  const footboardClick = () => {
    setChecked({ ...checked, footboard: !checked.footboard })
    console.log(updatedObjectValues);
    if (checked.footboard == true && updatedObjectValues.Storage) {
        console.log("run1");
        console.log(updatedObjectValues.Storage);
        const filteredDataWithNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard == null);
        SetplaceOrderValues({...placeOrderValues, orderData: filteredDataWithNullFootboard })
    } else if (checked.footboard == false && updatedObjectValues.Storage && footValues) {
        console.log("run2");
        const filteredDataWithNonNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard !== null);
        SetplaceOrderValues({...placeOrderValues, orderData: filteredDataWithNonNullFootboard })
    }
  }
  // useEffect(()=>{
  //   if (checked.footboard == false && updatedObjectValues.Storage) {
  //       console.log("run1");
  //       console.log(updatedObjectValues.Storage);
  //       const filteredDataWithNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard == null);
  //       SetplaceOrderValues({...placeOrderValues, orderData: filteredDataWithNullFootboard })
  //   } else if (checked.footboard == true && updatedObjectValues.Storage && footValues) {
  //       console.log("run2");
  //       const filteredDataWithNonNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard !== null);
  //       SetplaceOrderValues({...placeOrderValues, orderData: filteredDataWithNonNullFootboard })
  //   }
  // }, [checked])
  
  const secondPart = () => {
    setdisablefield(true);
    setChecked({ ...checked, isfootboard: false })
    setSecondPart(false);
    const filteredDataWithNonNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard !== null);
    const filteredDataWithNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard == null);
    console.log(filteredDataWithNonNullFootboard);
    console.log(filteredDataWithNullFootboard);
    if (filteredDataWithNonNullFootboard.length > 0 && filteredDataWithNullFootboard.length > 0) {
        console.log("hello");
        setChecked({ ...checked, isfootboard: true })
        setFootValues(true);
        SetplaceOrderValues({...placeOrderValues, orderData: filteredDataWithNullFootboard })
      } else if (filteredDataWithNonNullFootboard.length == 0 && filteredDataWithNullFootboard.length > 0) { 
        SetplaceOrderValues({...placeOrderValues, orderData: filteredDataWithNullFootboard })
        setWithoutFootboard(true);
        setFootValues(true);
        console.log("hello2");
      } else if (filteredDataWithNonNullFootboard.length > 0 && filteredDataWithNullFootboard.length == 0){
        console.log("hello3");
        setFootValues(false)
        setWithFootboard(true);
        SetplaceOrderValues({...placeOrderValues, orderData: filteredDataWithNonNullFootboard })
        // setChecked({ ...checked, isfootboard: true })
      }
  }
  const disableAelrt = () => {
    setAlertStatus(false)
  }
  return (
    <>
      {loading ? (
        <div class="Add_product_main_container addproductcontainer" >
          <div class="Add_product_row">
            <div class="product-box">
              <h5 className='pb-2'>{productVariationData.group_code && productVariationData.group_code[0]}</h5>
              <img src={placeHolder} alt="" />
            </div>
            <div class="product_options_box" style={{paddingTop:32}}>
            <div className="row products-choices product-options">
                <CNav variant="tabs" role="tablist">
                    {Object.keys(productVariationData.Headboard).map((value, key) => (
                    <CNavItem key={key}>
                      <CNavLink
                        style={{ cursor: 'pointer' }}
                        active={activeKey.headboard === key + 1}
                        onClick={() => setActiveKey({ ...activeKey, headboard: key + 1 })}
                      disabled={selectedHeadsize == null && activeKey.headboard !== key + 1}
                      >
                        {value}
                      </CNavLink>
                    </CNavItem>
                  ))}
                </CNav>
                <CTabContent>
                     {Object.keys(productVariationData.Headboard).map((key, index) => (
                    <CTabPane
                      key={index}
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      visible={activeKey.headboard === index + 1}
                    >
                      <div className="text-left innerContainer">
                        <div className="product-choice-row product_size_choice">
                            {productVariationData.Headboard[key].map((value, sizeIndex) => (
                              <CFormCheck
                                  key={sizeIndex}
                                  type="radio"
                                  name={key}
                                  id={`flexCheckChecked${sizeIndex}`}
                                  value={value && value}
                                  label={value && value}
                                  onChange={(e)=>{setOrderValues(e)}}
                                  disabled={disablefield}
                                  className={`checkbox-box${selectedHeadsize === value ? ' selected' : ''}${selectedRange === value ? ' selected' : ''}`}
                                />
                            ))}
                        </div>
                      </div>
                    </CTabPane>
                  ))}
                </CTabContent>
            </div>
              {checked.isfootboard && (
              <div className="row products-choices product-options">
                <div class="form-check">
                  <input
                    class="form-check-input add-option-selectBOx"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => { footboardClick() }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Click to add FootBoard (Optional)
                  </label>
                </div>
              </div>
              )}
              {withoutFootboard ? (<p>This Varriation Is Without Footboard</p>):null}
              {withFootboard ? (<p>This Varriation Is With Footboard</p>):null}
              <div className="submit-section">
              { SecondPart ? (<button className='submit-btn submitBtn abc' onClick={() => secondPart()}>Next</button>):null}
                {/* <button className='submit-btn submitBtn' onClick={() => {setcheckboxselected(true);setshowAll(true);}}>Next</button> */}
                <button className='submit-btn submitBtn' onClick={() => {
                setSelectedHeadsize(null)
                setSelectedRange(null)
                setSecondPart(false);
                setChecked({ ...checked, isfootboard: false })
                setFiltredValues({Sizes:true, Range: true, Style:true});
                setActiveKey({ ...activeKey, size: 1, headboard: 1 })
                setdisablefield(false)
                }}>Reset</button>
              </div>
              <div className="submit-section">
                <button className='submit-btn submitBtn' onClick={saveCartData} 
                // disabled={selectedGroupColour === null}
                >Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        'Data is being fetched pls wait'
      )}
        {
        alertStatus ?
          <Message_alert text={alertText} disableSuccsess={disableAelrt}></Message_alert> : ""
      }
    </>
  )
}

export default AddProduct
