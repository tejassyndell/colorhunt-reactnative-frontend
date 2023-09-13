/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CButton, CFormCheck } from '@coreui/react'
import placeHolder from '../../../assets/images/placeholderimg.png'
import { saveOrderData } from '../../api/api'
import placeholderforProduct from '../../../assets/images/phhg.png'
import { QuantityPicker } from 'react-qty-picker'
import { Navigation } from '@coreui/coreui'
import { useNavigate } from 'react-router-dom'
import Message_alert from "../orderComponents/Message_alert"

const AddProduct = (props) => {
  console.log(props.data)
  const [checked, setChecked] = useState({ headeboard: false, footboard: false })
  const [filteredValues, setFiltredValues] = useState({size : true, spring : true, FabricColor : true, Storage: true, FeetOptions: true, Sizes:true, Range: true, Style:true})
  const [productData, SetproductData] = useState([])
  const [updatedObjectValues, SetupdatedObjectValues] = useState({spring : [], FabricColor : [], Storage: [], FeetOptions: [], Sizes:[], Range: [], Style:[]})
  const [eventValue, setEventValue] = useState({size : "", spring :'', FabricColor:'',Storage:'',FeetOptions:'', Sizes:'', Range: '', Style:''});
  const [loading, setLoading] = useState(false)
  const [Headboard, setHeadboard] = useState({ range: 'range', size: 'size', style: 'style' })
  const [productVariationData, SetproductVariationData] = useState()
  const [placeOrderValues, SetplaceOrderValues] = useState();
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSpring, setSelectedSpring] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedFabcolor, setSelectedFabcolor] = useState(null);
  const [selectedFeet, setSelectedFeet] = useState(null);
  const [selectedHeadsize, setSelectedHeadsize] = useState(null);
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertText, setAlertText] = useState("Failed to fetch data");
  const Navigate = useNavigate();

  const [activeKey, setActiveKey] = useState({
    size: 1,
    Storage: 1,
    headboard: 1,
    headboardStyle: 1,
    footboard: 1,
  })

  const setValues = (productDatas)=>{
    console.log(productDatas)
    const uniqueFields = Object.keys(productDatas[0]).reduce((uniqueObj, field) => {
      const uniqueValues = [...new Set(productDatas.map((data) => data[field]))];
      return { ...uniqueObj, [field]: uniqueValues };
    }, {});
    const updatedData = {
      ...uniqueFields,
      StorageOptions: {
        // Storage: uniqueFields.drawers,
        Storage: filteredValues.Storage ? uniqueFields.drawers : productVariationData.StorageOptions['Storage'],
        'Fabric Color': filteredValues.FabricColor ? uniqueFields.base_fab_color : productVariationData.StorageOptions['Fabric Color'],
        'Feet Options': filteredValues.FeetOptions ? uniqueFields.feet_options : productVariationData.StorageOptions['Feet Options'],
        // 'Fabric Color': uniqueFields.base_fab_color,
        // 'Feet Options': uniqueFields.feet_options,
      },
      Sizes: {
        // 'Mattress Size': uniqueFields.mat_size,
        'Mattress Size': filteredValues.size ? uniqueFields.mat_size : productVariationData.Sizes['Mattress Size'],
        Springs: filteredValues.spring ? uniqueFields.springs : productVariationData.Sizes['Springs'],
        // 'Mattress Size': uniqueFields.mat_size.map((size) => `${size} Sizes`),
        // Springs: uniqueFields.springs,
      },
      Headboard: {
        [`Headboard Range`]: {
          // Sizes : uniqueFields.headboardSizes,
          Sizes: filteredValues.Sizes ? uniqueFields.headboardSizes : productVariationData.Headboard[`Headboard Range`][`Sizes`],
          // Range: ['Hg Headboard Range'],
          // range: [],
          // Style: ['BELLA'],
          // style: [],
        }
      },
    };
    
      delete updatedData.drawers;
      delete updatedData.mat_size;
      delete updatedData.springs
      delete updatedData.headboardSizes;
      delete updatedData.headboardColor;
      delete updatedData.base_fab_color;
      delete updatedData.feet_options;
    SetproductVariationData(updatedData)
    console.log(updatedData)
  }

  useEffect(()=>{
  // setValues(productData);
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
  

  
const setOrderValues = (e) => {
  const fieldName = e.target.name;
  const fieldValue = e.target.value;
  console.log(fieldName)
  console.log(fieldValue)
  
  if (fieldName === 'Mattress Size') {
    setSelectedSize(e.target.value);
    setSelectedSpring(null)
    setSelectedStorage(null)
    setSelectedFabcolor(null)
    setSelectedFeet(null)
    setSelectedHeadsize(null)
    setChecked({ ...checked, headeboard: false })
    setFiltredValues({size : false, spring : true, FabricColor : true, Storage: true, FeetOptions: true, Sizes:true, Range: true, Style:true});
    setEventValue({...eventValue, size : fieldValue});
  } else if (fieldName === 'Springs') {
    setSelectedSpring(e.target.value);
    setSelectedStorage(null)
    setSelectedFabcolor(null)
    setSelectedFeet(null)
    setSelectedHeadsize(null)
    setChecked({ ...checked, headeboard: false })
    setFiltredValues({size : null, spring : false, FabricColor : true, Storage: true, FeetOptions: true, Sizes:true, Range: true, Style:true});
    setEventValue({...eventValue, spring : fieldValue});
    setActiveKey({ ...activeKey, Storage: 1 })
  } else if (fieldName === 'Storage') {
    setSelectedStorage(e.target.value);
    setSelectedFabcolor(null)
    setSelectedFeet(null)
    setSelectedHeadsize(null)
    setChecked({ ...checked, headeboard: false })
    setFiltredValues({size : null, spring : null, FabricColor : true, Storage: false, FeetOptions: true, Sizes:true, Range: true, Style:true });
    setEventValue({...eventValue, Storage : fieldValue});
  }else if (fieldName === 'Fabric Color') {
    setSelectedFabcolor(e.target.value);
    setSelectedFeet(null)
    setSelectedHeadsize(null)
    setChecked({ ...checked, headeboard: false })
    setFiltredValues({size : null, spring : null, FabricColor : false, Storage: null, FeetOptions: true, Sizes:true, Range: true, Style:true });
    setEventValue({...eventValue, FabricColor : fieldValue});
  }else if (fieldName === 'Feet Options') {
    setSelectedFeet(e.target.value);
    setSelectedHeadsize(null)
    setChecked({ ...checked, headeboard: false })
    setFiltredValues({size : null, spring : null, FabricColor : null, Storage: null, FeetOptions: false, Sizes:true, Range: true, Style:true});
    setEventValue({...eventValue, FeetOptions : fieldValue});
  }else if (fieldName === 'Headboard Range') {
    setSelectedHeadsize(e.target.value)
    setFiltredValues({size : null, spring : null, FabricColor : null, Storage: null, FeetOptions: null, Sizes:false, Range: true, Style:true });
    setEventValue({...eventValue, Sizes : fieldValue});
  }else if (fieldName === 'Range') {
    // setFiltredValues({size : null, spring : null, FabricColor : null, Storage: null, FeetOptions: null, Sizes:null, Range: false, Style:true});
    // setEventValue({...eventValue, Range : fieldValue});
  }else if (fieldName === 'Style') {
    // setFiltredValues({size : null, spring : null, FabricColor : null, Storage: null, FeetOptions: null, Sizes:null, Range: null, Style:false });
    // setEventValue({...eventValue, Style : fieldValue});
  }
  };


useEffect(() => {
  console.log(filteredValues)
  if (filteredValues.size === false) {
    filterDataByValue(eventValue.size, 'mat_size');
    setFiltredValues({...filteredValues, size : null});
  } else if(filteredValues.spring === false) {
    filterDataByValue(eventValue.spring, 'springs');
  } else if(filteredValues.Storage === false) {
    filterDataByValue(eventValue.Storage, 'drawers');
  }else if(filteredValues.FabricColor === false) {
    filterDataByValue(eventValue.FabricColor, 'base_fab_color');
  }else if(filteredValues.FeetOptions === false) {
    filterDataByValue(eventValue.FeetOptions, 'feet_options');
  }else if(filteredValues.Sizes === false) {
    filterDataByValue(eventValue.Sizes, 'headboardSizes');
  }else if(filteredValues.Range === false) {
    filterDataByValue(eventValue.Range, 'feet_options'); //here will be name of field which is in database, in place of 'feet_options'
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
    if (checked.headeboard == false) {
      setSelectedHeadsize(null)
    }
  }, [checked])

  
  function filterDataByValue(filterValue, fieldname) {
    console.log(fieldname);
    console.log(filterValue)


    if (fieldname === 'mat_size') {
      console.log(productData)
      const filteredData = productData.filter(item => item[fieldname].includes(filterValue));
      console.log(filteredData)
      setValues(filteredData);
      SetupdatedObjectValues({...updatedObjectValues, spring : filteredData})
    } else if (fieldname === 'springs') {
    const filteredData = updatedObjectValues.spring.filter(item => item[fieldname].includes(filterValue));
    console.log(filteredData)
    setValues(filteredData);
    // SetplaceOrderValues(filteredData)
    SetplaceOrderValues({...placeOrderValues, orderData: filteredData })


    ///////////till here
    SetupdatedObjectValues({...updatedObjectValues, Storage : filteredData})
    }else if (fieldname === 'drawers') {
    const filteredData = updatedObjectValues.Storage.filter(item => item[fieldname].includes(filterValue));
    console.log(filteredData)
    setValues(filteredData);
    SetupdatedObjectValues({...updatedObjectValues, FabricColor : filteredData})
    }else if (fieldname === 'base_fab_color') {
      const filteredData = updatedObjectValues.FabricColor.filter(item => item[fieldname].includes(filterValue));
    console.log(filteredData)
    setValues(filteredData);
    SetupdatedObjectValues({...updatedObjectValues, FeetOptions : filteredData})
    }else if (fieldname === 'feet_options') {
    const filteredData = updatedObjectValues.FeetOptions.filter(item => item[fieldname].includes(filterValue));
    console.log(filteredData)
    SetupdatedObjectValues({...updatedObjectValues, Sizes : filteredData})
    setValues(filteredData);
    }else if (fieldname === 'headboardSizes') {
    const filteredData = updatedObjectValues.Sizes.filter(item => item[fieldname].includes(filterValue));
    console.log(filteredData)
    SetupdatedObjectValues({...updatedObjectValues, Range : filteredData})
    setValues(filteredData);
    SetplaceOrderValues(filteredData)
    SetplaceOrderValues({...placeOrderValues, orderData: filteredData })
    }else if (fieldname === 'headbovvvvardSizes') {
    const filteredData = updatedObjectValues.Range.filter(item => item[fieldname].includes(filterValue));
    console.log(filteredData)
    SetupdatedObjectValues({...updatedObjectValues, Style : filteredData})
    setValues(filteredData);
    }else if (fieldname === 'headbvvvvvoardSizes') {
    const filteredData = updatedObjectValues.Style.filter(item => item[fieldname].includes(filterValue));
    console.log(filteredData)
    setValues(filteredData);
    }
    
   
  }
  console.warn("placeOrderValues",placeOrderValues);
  const saveCartData = async()=>{
    console.log(placeOrderValues);
    const result = await saveOrderData(placeOrderValues);
    if(result.status === 200){
      Navigate('/cart')
    }else{
      // alert("failed")
      console.log('failed')
      setAlertStatus(true)
        setAlertText('failed to save order data')
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
              <h5 className='pb-2'>{productVariationData.name && productVariationData.name[0]}</h5>
              <img src={placeHolder} alt="" />
            </div>
            <div class="product_options_box" style={{paddingTop:32}}>
              <div className="row products-choices product_size ">
              <CNav variant="tabs" role="tablist">
                {Object.keys(productVariationData.Sizes).map((value, key) => (
                  <CNavItem key={key}>
                    <CNavLink
                      style={{ cursor: 'pointer' }}
                      active={activeKey.size === key + 1}
                      onClick={() => setActiveKey({ ...activeKey, size: key + 1 })}
                      disabled={selectedSize == null && activeKey.size !== key + 1}
                    >
                      {value}
                    </CNavLink>
                  </CNavItem>
                ))}
              </CNav>
              <CTabContent>
                        {Object.keys(productVariationData.Sizes).map((key, index) => (
                        <CTabPane
                          key={index}
                          role="tabpanel"
                          aria-labelledby="home-tab"
                          visible={activeKey.size === index + 1}
                        >
                          <div className="text-left innerContainer">
                            <div className="product_size_choice">
                              {productVariationData.Sizes[key].map((size, sizeIndex) => (
                                <CFormCheck
                                  key={sizeIndex}
                                  type="radio"
                                  name={key}
                                  id={`flexCheckChecked${sizeIndex}`}
                                  value={size && size}
                                  label={size && size}
                                  onChange={(e)=>{setOrderValues(e)}}
                                  // label={`${size ? size + ' Sizes' : ''}`}
                                  className={`checkbox-box${selectedSize === size ? ' selected' : ''}${selectedSpring === size ? ' selected' : ''}`}
                                />
                              ))}
                            </div>
                          </div>
                        </CTabPane>
                      ))}
          </CTabContent>
              </div>
              {selectedSpring !== null && (
              <>
              </>
              )}
          
             
              {selectedSpring !== null && (
                <>
              {/* <div className="row products-choices product-options">
                <div class="form-check">
                  <input
                    class="form-check-input add-option-selectBOx"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => {
                      setChecked({ ...checked, footboard: !checked.footboard })
                    }}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Click to add FootBoard (Optional)
                  </label>
                </div>
              </div> */}
              <div className="submit-section">
                <button className='submit-btn submitBtn' onClick={saveCartData} disabled={selectedSpring === null}>Add to Cart</button>
              </div>
              </>
              )}
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
