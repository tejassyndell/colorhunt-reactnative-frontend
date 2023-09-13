/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane, CButton, CFormCheck } from '@coreui/react'
import placeHolder from '../../../assets/images/placeholderimg.png'
import { saveOrderData, getColourData, saveChangesLog } from '../../api/api'
import placeholderforProduct from '../../../assets/images/phhg.png'
import { QuantityPicker } from 'react-qty-picker'
import { Navigation } from '@coreui/coreui'
import { useNavigate } from 'react-router-dom'
import { check } from 'prettier'

const AddProduct = (props) => {
  // const productData = props.data
  console.log(props.data)
  const [checked, setChecked] = useState({ headeboard: false, footboard: false, isfootboard: false})
  const [filteredValues, setFiltredValues] = useState({size : true, spring : true, FabricColor : true, Storage: true, FeetOptions: true, Sizes:true, Range: true, Style:true})
  const [productData, SetproductData] = useState([])
  const [updatedObjectValues, SetupdatedObjectValues] = useState({spring : [], FabricColor : [], Storage: [], FeetOptions: [], Sizes:[], Range: [], Style:[], Final:[]})
  const [eventValue, setEventValue] = useState({size : "", spring :'', FabricColor:'',Storage:'',FeetOptions:'', Sizes:'', Range: '', Style:''});
  const [loading, setLoading] = useState(false)
  const [Headboard, setHeadboard] = useState({ range: 'range', size: 'size', style: 'style' })
  // const [Headboard, setHeadboard] = useState({ range: '', size: '', style: '' })
  const [productVariationData, SetproductVariationData] = useState()
  const [placeOrderValues, SetplaceOrderValues] = useState({customerDetails: [], orderData: []});
  // const [placeOrderValues, SetplaceOrderValues] = useState({ size : '', spring : '', FabricColor : '', Storage: '', FeetOptions: '', Sizes:'', Range: '', Style:''})
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSpring, setSelectedSpring] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedFabcolor, setSelectedFabcolor] = useState(null);
  const [selectedFeet, setSelectedFeet] = useState(null);
  const [selectedHeadsize, setSelectedHeadsize] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedColourGroup, setSelectedColourGroup] = useState(null);
  const [selectedGroupColour, setSelectedGroupColour] = useState(null);
  const [ColourGroupName, setColourGroupName] = useState(null);
  const [GroupColourName, setGroupColourName] = useState(null);
  const [ColourID, setColourID] = useState();
  const [showAll, setshowAll] = useState(false);
  const [drwCheck, setDrwCheck] = useState(false);
  const [isdrawer, setisdrawer] = useState(false);
  const [disablefield, setdisablefield] = useState(false);
  const [checkboxselected, setcheckboxselected] = useState(false);
  const [withFootboard, setWithFootboard] = useState(false);
  const [withoutFootboard, setWithoutFootboard] = useState(false);
  const [withoutDrawer, setWithoutDrawer] = useState(false);
  const [NextPart, setNextPart] = useState(false);
  const [SecondPart, setSecondPart] = useState(false);
  const [rangeValue, setRangeValue] = useState();
  const [colourGroup, setColourGroup] = useState();
  const [allColour, setAllColour] = useState();
  const Navigate = useNavigate();

  useEffect(()=> {},[showAll])

  const [activeKey, setActiveKey] = useState({
    size: 1,
    Storage: 1,
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
      StorageOptions: {
        'Feet Options': filteredValues.FeetOptions ? uniqueFields.feet_options : productVariationData.StorageOptions['Feet Options'],
      },
      Sizes: {
        'Mattress Size': filteredValues.size ? uniqueFields.mat_size : productVariationData.Sizes['Mattress Size'],
        Springs: filteredValues.spring ? uniqueFields.springs : productVariationData.Sizes['Springs'],
      },
      Headboard: {
          Sizes: filteredValues.Sizes ? uniqueFields.headboardSizes : productVariationData.Headboard[`Sizes`],
          Range: filteredValues.Range ? uniqueFields.foot_board : productVariationData.Headboard[`Range`],
      },
      DrawerOptions: {
        Storage: filteredValues.Storage ? uniqueFields.drawers : productVariationData.DrawerOptions['Storage'],
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
      setLoading(true);
    }
  }, [productData]);
  useEffect(() => {}, [rangeValue]);
  

  
const setOrderValues = (e) => {
  const fieldName = e.target.name;
  const fieldValue = e.target.value;
  
  if (fieldName === 'Mattress Size') {
    setSelectedSize(e.target.value);
    setSelectedSpring(null)
    setSelectedStorage(null)
    setSelectedFabcolor(null)
    setSelectedFeet(null)
    setSelectedHeadsize(null)
    setSelectedRange(null)
    setSelectedStorage(null);
    setChecked({ ...checked, headeboard: false })
    setFiltredValues({size : false, spring : true, FabricColor : true, Storage: true, FeetOptions: true, Sizes:true, Range: true, Style:true});
    setEventValue({...eventValue, size : fieldValue});
  } else if (fieldName === 'Springs') {
    setSelectedSpring(e.target.value);
    setSelectedStorage(null)
    setSelectedFeet(null)
    setSelectedHeadsize(null)
    setSelectedRange(null)
    setSelectedStorage(null);
    setChecked({ ...checked, headeboard: false })
    setFiltredValues({size : null, spring : false, FabricColor : false, Storage: true, FeetOptions: true, Sizes:true, Range: true, Style:true });
    setEventValue({...eventValue, spring : fieldValue});
    setActiveKey({ ...activeKey, Storage: 1 })
  }else if (fieldName === 'Feet Options') {
    setSelectedFeet(e.target.value);
    setSelectedHeadsize(null)
    setSelectedRange(null)
    setChecked({ ...checked, headeboard: false })
    setFiltredValues({size : null, spring : null, FabricColor : null, Storage: true, FeetOptions: false, Sizes:true, Range: true, Style:true});
    setEventValue({...eventValue, FeetOptions : fieldValue});
  }else if (fieldName === 'Sizes') {
    setSelectedHeadsize(e.target.value)
    setSelectedRange(null)
    setSelectedStorage(null);
    setFiltredValues({size : null, spring : null, FabricColor : null, Storage: true, FeetOptions: null, Sizes:false, Range: true, Style:true });
    setEventValue({...eventValue, Sizes : fieldValue});
    console.log(eventValue);
  }else if (fieldName === 'Range') {
    setSelectedRange(e.target.value)
    setSelectedStorage(null);
    setFiltredValues({size : null, spring : null, FabricColor : null, Storage: true, FeetOptions: null, Sizes:null, Range: false, Style:true});
    setEventValue({...eventValue, Range : fieldValue});
  } else if (fieldName === 'Storage') {
      setSelectedStorage(e.target.value);
      setFiltredValues({size : null, spring : null, FabricColor : null, Storage: false, FeetOptions: null, Sizes:null, Range: true, Style:null });
      setEventValue({...eventValue, Storage : fieldValue});
  }else if (fieldName === 'Style') {
    // setFiltredValues({size : null, spring : null, FabricColor : null, Storage: null, FeetOptions: null, Sizes:null, Range: null, Style:false });
    // setEventValue({...eventValue, Style : fieldValue});
  }
  };


useEffect(() => {
  if (filteredValues.size === false) {
    filterDataByValue(eventValue.size, 'mat_size');
    setFiltredValues({...filteredValues, size : null});
  } else if(filteredValues.spring === false) {
    filterDataByValue(eventValue.spring, 'springs');
  } else if(filteredValues.Storage === false) {
    filterDataByValue(eventValue.Storage, 'drawers');
  }else if(filteredValues.FeetOptions === false) {
    filterDataByValue(eventValue.FeetOptions, 'feet_options');
  }else if(filteredValues.Sizes === false) {
    filterDataByValue(eventValue.Sizes, 'Sizes');
  }else if(filteredValues.Range === false) {
    filterDataByValue(eventValue.Range, 'foot_board'); //here will be name of field which is in database, in place of 'feet_options'
  }else if(filteredValues.Style === false) {
    filterDataByValue(eventValue.Style, 'feet_options');//here will be name of field which is in database, in place of 'feet_options'
  }
}, [filteredValues]);


  useEffect(()=>{
    if(productVariationData){
    setLoading(true)
  }
  }, [productVariationData])

  useEffect(()=>{
    console.log(placeOrderValues);
    console.log(placeOrderValues.orderData);
    console.log(placeOrderValues.orderData[0]);
    console.log("..............");
    if (placeOrderValues.orderData[0] !== undefined) {
        placeOrderValues.orderData[0].base_fab_color = selectedColourGroup+selectedGroupColour;
    }
  }, [placeOrderValues])
  useEffect(()=>{
  }, [updatedObjectValues])
  useEffect(()=>{
    if (isdrawer == false) {
      setSelectedStorage(null)
    }
  }, [isdrawer])
  useEffect(()=>{
    if (checked.headeboard == false) {
      setSelectedHeadsize(null)
    }
  }, [checked])

  useEffect(()=>{
    if (isdrawer == false && checked.footboard == true) {
      const filteredData = updatedObjectValues.Storage.filter(item => item.drawers == null);
      const filteredDatas = filteredData.filter(item => item.Include_footboard !== null);
      SetplaceOrderValues(filteredDatas)
      SetplaceOrderValues({...placeOrderValues, orderData: filteredDatas })
      // setshowAll(true);
    } else if (isdrawer == true && checked.footboard == true) {
      const filteredData = updatedObjectValues.Final.filter((size) => size.Include_footboard !== null);
      SetplaceOrderValues(filteredData)
      SetplaceOrderValues({...placeOrderValues, orderData: filteredData })
      // setshowAll(true);
    } else if (isdrawer == false && checked.footboard == false) {
      const filteredData = updatedObjectValues.Storage.filter(item => item.drawers == null);
      const filteredDatas = filteredData.filter(item => item.Include_footboard == null);
      SetplaceOrderValues(filteredDatas)
      SetplaceOrderValues({...placeOrderValues, orderData: filteredDatas })
      // setshowAll(true);
    } else if (isdrawer == true && checked.footboard == false) {
      const filteredDatas = updatedObjectValues.Final.filter(item => item.Include_footboard == null);
      SetplaceOrderValues(filteredDatas)
      SetplaceOrderValues({...placeOrderValues, orderData: filteredDatas })
      // setshowAll(true);
    }
  }, [checked.footboard])

  
  function filterDataByValue(filterValue, fieldname) {
    console.log(fieldname);
    console.log(filterValue)


    if (fieldname === 'mat_size') {
      const filteredData = productData.filter(item => item[fieldname].includes(filterValue));
      setValues(filteredData);
      SetupdatedObjectValues({...updatedObjectValues, spring : filteredData})
      setDrwCheck(false);
      setshowAll(false);
      setChecked({ ...checked, isfootboard: false })
      setisdrawer(false);
    } else if (fieldname === 'springs') {
    const filteredData = updatedObjectValues.spring.filter(item => item[fieldname].includes(filterValue));
    setValues(filteredData);
    SetupdatedObjectValues({...updatedObjectValues, FeetOptions : filteredData})
    setDrwCheck(false);
    setshowAll(false);
    setChecked({ ...checked, isfootboard: false })
    setisdrawer(false);
    }else if (fieldname === 'feet_options') {
    const filteredData = updatedObjectValues.FeetOptions.filter(item => item[fieldname].includes(filterValue));
    SetupdatedObjectValues({...updatedObjectValues, Sizes : filteredData})
    setValues(filteredData);
    setDrwCheck(false);
    setshowAll(false);
    setChecked({ ...checked, isfootboard: false })
    setisdrawer(false);
    }else if (fieldname === 'Sizes') {
    const filteredData = updatedObjectValues.Sizes.filter(item => item.headboardSizes.includes(filterValue));
    SetupdatedObjectValues({...updatedObjectValues, Range : filteredData})
    setValues(filteredData);
    setDrwCheck(false);
    setshowAll(false);
    setChecked({ ...checked, isfootboard: false })
    setisdrawer(false);
    // SetplaceOrderValues(filteredData)
    // SetplaceOrderValues({...placeOrderValues, orderData: filteredData })
    }else if (fieldname === 'foot_board') {
    const filteredData = updatedObjectValues.Range.filter(item => item[fieldname].includes(filterValue));
    setRangeValue(filterValue);
    SetupdatedObjectValues({...updatedObjectValues, Storage : filteredData})
    setValues(filteredData);
    setNextPart(true);
    }else if (fieldname === 'drawers') {
    const filteredData = updatedObjectValues.Storage.filter(item => item.drawers.includes(filterValue));
    console.log(filteredData);
    setValues(filteredData);
    setSecondPart(true);
    SetupdatedObjectValues({...updatedObjectValues, Final : filteredData})
    // setChecked({ ...checked, isfootboard: true }) 
    const filteredDataWithNonNullFootboard = filteredData.filter((size) => size.Include_footboard !== null);
    const filteredDataWithNullFootboard = filteredData.filter((size) => size.Include_footboard == null);
    if (filteredDataWithNonNullFootboard.length > 0 && filteredDataWithNullFootboard.length > 0) {
      setChecked({ ...checked, isfootboard: true })
      // setshowAll(true); 
      // setPlaceOrder(true);
    } else if (filteredDataWithNonNullFootboard.length == 0 && filteredDataWithNullFootboard.length > 0){
      setChecked({ ...checked, isfootboard: false })
      // setshowAll(true); 
      // setPlaceOrder(true);
    } else if (filteredDataWithNonNullFootboard.length > 0 && filteredDataWithNullFootboard.length == 0) {
      setChecked({ ...checked, isfootboard: true }) 
    }
    // SetupdatedObjectValues({...updatedObjectValues, Style : filteredData})
    }else if (fieldname === 'headbvvvvvoardSizes') {
    const filteredData = updatedObjectValues.Style.filter(item => item[fieldname].includes(filterValue));
    // SetupdatedObjectValues({...updatedObjectValues, Range : filteredData})
    setValues(filteredData);
    }
  }
  // const saveCartData = async()=>{
  //   console.log(placeOrderValues);
  //   // Extracting the necessary values
  //   const { orderData } = placeOrderValues;
  //   const { code, base_fab_color } = orderData[0];

  //   // Combining code and base_fab_color
  //   // const combinedCode = `${code}${base_fab_color}`;
  //   const combinedCode = code.slice(0, -3) + base_fab_color + code.slice(-3);

  //   // Setting the new combined code back to placeOrderValues
  //   placeOrderValues.orderData[0].Code = combinedCode;
  //   placeOrderValues.orderData[0].swatch = ColourGroupName+" "+GroupColourName;
  //   // orderplace.orderData[0].code += selectedColourGroup + selectedGroupColour;
  //   // console.log(orderplace);
  //   // console.log(selectedGroupColour);
  //   // console.log(selectedColourGroup);
  //   // console.log(placeOrderValues.orderData[0].code + selectedColourGroup + selectedGroupColour);
  //   const result = await saveOrderData(placeOrderValues);
  //   if(result.status === 200){
  //     Navigate('/cart')
  //   }else{
  //     alert("failed")
  //   }
  // }

  const saveCartData = async()=>{
    console.log(placeOrderValues);

    // Extracting the necessary values
    const { orderData } = placeOrderValues;
    const { code, base_fab_color } = orderData[0];

    // Combining code and base_fab_color
    // const combinedCode = `${code}${base_fab_color}`;
    const combinedCode = code.slice(0, -3) + base_fab_color + code.slice(-3);

    // Setting the new combined code back to placeOrderValues
    placeOrderValues.orderData[0].Code = combinedCode;
    placeOrderValues.orderData[0].swatch = ColourGroupName+" "+GroupColourName;

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
      console.log(result)
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
      }
    } else {
      const result = await saveOrderData(placeOrderValues)
      console.log(result);
      if (result.status === 200) {
        Navigate('/cart')
      } else {
        // alert('failed')
        console.log('failed')
      }
    }
    // orderplace.orderData[0].code += selectedColourGroup + selectedGroupColour;
    // console.log(orderplace);
    // console.log(selectedGroupColour);
    // console.log(selectedColourGroup);
    // console.log(placeOrderValues.orderData[0].code + selectedColourGroup + selectedGroupColour);
    const result = await saveOrderData(placeOrderValues);
    if(result.status === 200){
      
      Navigate('/cart')
    }else{
      // alert("failed")
      console.log('failed')
    }
  }

  const saveColourData = async()=>{
    const result = await getColourData();
    if(result.status === 200){
      setColourGroup(result.data.colourGroup)
      setAllColour(result.data.allColours)
    }else{
      // alert("failed")
      console.log('failed')
    }
  }

  useEffect(()=> {saveColourData()},[])
  useEffect(()=> {},[selectedColourGroup])
  useEffect(()=> {
  },[selectedGroupColour])
  useEffect(()=> {
  },[allColour, colourGroup]);
  useEffect(()=> {
  },[ColourID]);

  const drwCick = () => {
    setisdrawer(!isdrawer)
    console.log(isdrawer);
    setSelectedColourGroup(null)
    // setSelectedGroupColour(null)
    const filteredData = updatedObjectValues.Storage.filter((size) => size.drawers !== null);
    SetupdatedObjectValues({...updatedObjectValues, Storage : filteredData})
    setValues(filteredData);
    if (isdrawer == false) {
      setshowAll(false);
      setChecked({ ...checked, isfootboard: false })
      setSecondPart(false);
    }
    if (isdrawer == true) {
      const filteredData = updatedObjectValues.Range.filter(item => item.foot_board.includes(rangeValue));
      const filteredDataWithNonNullDrawers = filteredData.filter(item => item.drawers !== null);
      const filteredDataWithNullDrawers = filteredData.filter(item => item.drawers == null);
      setSecondPart(true);
    if (filteredDataWithNullDrawers.length > 0 && filteredDataWithNonNullDrawers.length > 0) {
      setDrwCheck(true)
      const filteredDataWithNonNullFootboard = filteredData.filter((size) => size.Include_footboard !== null);
      const filteredDataWithNullFootboard = filteredData.filter((size) => size.Include_footboard == null);
      if (filteredDataWithNonNullFootboard.length > 0 && filteredDataWithNullFootboard.length > 0) {
        // setshowAll(true);
      }
      setChecked({ ...checked, isfootboard: true }) 
    }
    }
  } 

  const footboardClick = () => {
    setSecondPart(true);
    console.log(checked.footboard);
    if (checked.footboard == true) {
      // setChecked({ ...checked, footboard: !checked.footboard })
    } else if (checked.footboard == false) {
      console.log("false")
    }
    setChecked({ ...checked, footboard: !checked.footboard })
  }

  const selectColorGroup = (e) => {
    setColourGroupName(e.target.name);
    setGroupColourName(null);
    const selectedGroupId = e.target.id;
  // Filter the allColours array based on the selected group_id
  const filteredColors = allColour.filter(color => color.group_id === parseInt(selectedGroupId));
    setColourID(filteredColors);
    setSelectedColourGroup(e.target.value)
    setSelectedGroupColour(null)
  }
  const selectGroupColor = (e) => {
    setSelectedGroupColour(e.target.value)
    setGroupColourName(e.target.name);
    
    if (checked.footboard == false && isdrawer == true) {
      const filteredData = updatedObjectValues.Final.filter((size) => size.Include_footboard == null);
      SetplaceOrderValues(filteredData)
      SetplaceOrderValues({...placeOrderValues, orderData: filteredData })
      setshowAll(true);
      console.log("ffdt");
      console.log(filteredData);
      placeOrderValues.orderData[0].base_fab_color = selectedColourGroup+e.target.value;
    } else if (checked.footboard == true && isdrawer == true) {
      const filteredData = updatedObjectValues.Final.filter((size) => size.Include_footboard !== null);
      SetplaceOrderValues(filteredData)
      SetplaceOrderValues({...placeOrderValues, orderData: filteredData })
      placeOrderValues.orderData[0].base_fab_color = selectedColourGroup+e.target.value;
      console.log("ftdt");
      console.log(filteredData);
    } else if (checked.footboard == false && isdrawer == false) {
      const filterData = updatedObjectValues.Range.filter(item => item.foot_board.includes(rangeValue));
      const filteredData = filterData.filter(item => item.drawers == null);
      const filteredDatas = filteredData.filter(item => item.Include_footboard  == null);
      SetplaceOrderValues(filteredDatas)
        SetplaceOrderValues({...placeOrderValues, orderData: filteredDatas })
        console.log("ffdf");
        console.log(filterData);
        console.log(updatedObjectValues);
        console.log(filteredData);
        console.log(filteredDatas);
        // console.log(placeOrderValues);
        // console.log(placeOrderValues.orderData);
        // console.log(placeOrderValues.orderData[0]);
        // console.log(placeOrderValues.orderData[0].base_fab_color);
        // console.log(selectedColourGroup);
        // placeOrderValues.orderData[0].base_fab_color = selectedColourGroup+e.target.value;
        // console.log(e.target.value);
    } else if (checked.footboard == true && isdrawer == false) {
      const filterData = updatedObjectValues.Range.filter(item => item.foot_board.includes(rangeValue));
      const filteredData = filterData.filter(item => item.drawers == null);
      const filteredDatas = filteredData.filter(item => item.Include_footboard  !== null);
      SetplaceOrderValues(filteredDatas)
        SetplaceOrderValues({...placeOrderValues, orderData: filteredDatas })
        console.log("ftdf");
        console.log(filterData);
        console.log(updatedObjectValues);
        console.log(filteredData);
        console.log(filteredDatas);
        // console.log(placeOrderValues);
        // console.log(placeOrderValues.orderData);
        // console.log(placeOrderValues.orderData[0]);
        // console.log(placeOrderValues.orderData[0].base_fab_color);
        // console.log(selectedColourGroup);
        // placeOrderValues.orderData[0].base_fab_color = selectedColourGroup+e.target.value;
        // console.log(e.target.value);
    }
    // console.log(placeOrderValues.orderData);
    // placeOrderValues.orderData[0].swatch = ColourGroupName+" "+e.target.name;
    SetplaceOrderValues({...placeOrderValues, customerDetails: props.data.cusomerDetails })
    console.log(placeOrderValues);
  }

  const nextPart = () => {
    setdisablefield(true)
    setDrwCheck(false);
    setChecked({ ...checked, isfootboard: false })
    setisdrawer(false);
    setcheckboxselected(false)
    setNextPart(false)
    setSecondPart(true);
    const filteredDataWithNonNullDrawers = updatedObjectValues.Storage.filter(item => item.drawers !== null);
    const filteredDataWithNullDrawers = updatedObjectValues.Storage.filter(item => item.drawers == null);
    console.log(filteredDataWithNonNullDrawers);
    console.log(filteredDataWithNullDrawers);

    if (filteredDataWithNonNullDrawers.length > 0 && filteredDataWithNonNullDrawers.length > 0) {
      setDrwCheck(true)
      const filteredDataWithNonNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard !== null);
      const filteredDataWithNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard == null);
      if (filteredDataWithNonNullFootboard.length > 0 && filteredDataWithNullFootboard.length > 0) {
        setChecked({ ...checked, isfootboard: true }) 
      } else if (filteredDataWithNonNullFootboard.length > 0 && filteredDataWithNullFootboard.length == 0) {
        setWithFootboard(true);
        setSecondPart(false)
        // setshowAll(true);
      } else if (filteredDataWithNonNullFootboard.length = 0 && filteredDataWithNullFootboard.length > 0) {
        setWithoutFootboard(true);
        // setshowAll(true);
      }
    } else if (filteredDataWithNonNullDrawers.length > 0 && filteredDataWithNonNullDrawers.length == 0) {
      // show select drawer option directly
    } else if (filteredDataWithNonNullDrawers.length == 0 && filteredDataWithNonNullDrawers.length > 0) {
      setWithoutDrawer(true);
      const filteredDataWithNonNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard !== null);
      const filteredDataWithNullFootboard = updatedObjectValues.Storage.filter((size) => size.Include_footboard == null);
      if (filteredDataWithNonNullFootboard.length > 0 && filteredDataWithNullFootboard.length > 0) {
        setChecked({ ...checked, isfootboard: true }) 
        // setshowAll(true);
      } else if (filteredDataWithNonNullFootboard.length > 0 && filteredDataWithNullFootboard.length == 0) {
        secondPart();
      } else if (filteredDataWithNonNullFootboard.length = 0 && filteredDataWithNullFootboard.length > 0) {
        setWithoutFootboard(true)
        // setshowAll(true);
      }
    }
  }

  const secondPart = () => {
    setcheckboxselected(true);
    setshowAll(true);
    setSecondPart(false);
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
                                  className={`checkbox-box${selectedSize === size ? ' selected' : ''}${selectedSpring === size ? ' selected' : ''}`}
                                  disabled={disablefield}
                                />
                              ))}
                            </div>
                          </div>
                        </CTabPane>
                      ))}
          </CTabContent>
              </div>
              {selectedSpring !== null && (
              <div className="row products-choices product-options">
              <CNav variant="tabs" role="tablist">
                  {Object.keys(productVariationData.StorageOptions).map((value, key) => (
                  <CNavItem key="{key}">
                    <CNavLink
                      style={{ cursor: 'pointer' }}
                      active={activeKey.Storage === key + 1}
                    >
                      {value}
                    </CNavLink>
                  </CNavItem>
                ))}
              </CNav>
              <CTabContent>
                   {Object.keys(productVariationData.StorageOptions).map((key, index) => (
                  <CTabPane
                    key={index}
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    visible={activeKey.Storage === index + 1}
                  >
                    <div className="text-left innerContainer">
                      <div className="product-choice-row product_size_choice">
                          {productVariationData.StorageOptions[key].map((value, sizeIndex) => (
                            <CFormCheck
                                key={sizeIndex}
                                type="radio"
                                name={key}
                                id={`flexCheckChecked${sizeIndex}`}
                                value={value && value}
                                label={value && value}
                                onChange={(e)=>{setOrderValues(e)}}
                                className={`checkbox-box${selectedFeet === value ? ' selected' : ''}`}
                                disabled={disablefield}
                              />
                          ))}
                      </div>
                    </div>
                  </CTabPane>
                ))}
              </CTabContent>
            </div>
              )}
              { selectedFeet !== null && (
              <div className="row products-choices product-options">
                <div class="form-check">
                  <input
                    class="form-check-input add-option-selectBOx"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => {
                      setChecked({ ...checked, headeboard: !checked.headeboard })
                      const filteredData = updatedObjectValues.Sizes.filter((size) => size.foot_board !== null);
                      SetupdatedObjectValues({...updatedObjectValues, Sizes : filteredData})
                      setValues(filteredData);
                    }}
                    disabled={disablefield}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Click to add Headboard
                  </label>
                </div>
              </div>
              )}
              {checked.headeboard ? (
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
                                  className={`checkbox-box${selectedHeadsize === value ? ' selected' : ''}${selectedRange === value ? ' selected' : ''}`}
                                  disabled={disablefield}
                                />
                            ))}
                        </div>
                      </div>
                    </CTabPane>
                  ))}
                </CTabContent>
              </div>
              ) : null}
              { drwCheck ? (
              <div className="row products-choices product-options">
                <div class="form-check">
                  <input
                    class="form-check-input add-option-selectBOx"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => { drwCick()}}
                    disabled={checkboxselected}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Click to add Drawer
                  </label>
                </div>
              </div>
              ) : null}
              {isdrawer ? (
                <div className="row products-choices product-options">
                <CNav variant="tabs" role="tablist">
                    {Object.keys(productVariationData.DrawerOptions).map((value, key) => (
                    <CNavItem key="{key}">
                      <CNavLink
                        style={{ cursor: 'pointer' }}
                        active={activeKey.Storage === key + 1}
                      >
                        {value}
                      </CNavLink>
                    </CNavItem>
                  ))}
                </CNav>
                <CTabContent>
                     {Object.keys(productVariationData.DrawerOptions).map((key, index) => (
                    <CTabPane
                      key={index}
                      role="tabpanel"
                      aria-labelledby="home-tab"
                      visible={activeKey.Storage === index + 1}
                    >
                      <div className="text-left innerContainer">
                        <div className="product-choice-row product_size_choice">
                            {productVariationData.DrawerOptions[key].map((value, sizeIndex) => (
                              <CFormCheck
                                  key={sizeIndex}
                                  type="radio"
                                  name={key}
                                  id={`flexCheckChecked${sizeIndex}`}
                                  value={value && value}
                                  label={value && value}
                                  onChange={(e)=>{setOrderValues(e)}}
                                  className={`checkbox-box${selectedStorage === value ? ' selected' : ''}`}
                                  disabled={checkboxselected}
                                />
                            ))}
                        </div>
                      </div>
                    </CTabPane>
                  ))}
                </CTabContent>
              </div>
              ) : null}
              {withoutDrawer ? (<p>This Varriation Is Without Drawer</p>):null}
              {checked.isfootboard && (
              <div className="row products-choices product-options">
                <div class="form-check">
                  <input
                    class="form-check-input add-option-selectBOx"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={() => { footboardClick() }}
                    disabled={checkboxselected}
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Click to add FootBoard (Optional)
                  </label>
                </div>
              </div>
              )}
              {withoutFootboard ? (<p>This Varriation Is Without Footboard</p>):null}
              {withFootboard ? (<p>This Varriation Is With Footboard</p>):null}
              { showAll ? (
              <div className="row products-choices product_size ">
              <CNav variant="tabs" role="tablist">
                  <CNavItem key="Colour Groups">
                    <CNavLink
                      style={{ cursor: 'pointer' }}
                    >
                      Colour Groups
                    </CNavLink>
                  </CNavItem>
              </CNav>
              <CTabContent>
                <div className="text-left innerContainer">
                  <div className="product_size_choice">
                    {colourGroup && colourGroup.map((item) => (
                      <CFormCheck
                        key={item.id} // Assuming 'id' is a unique identifier for each item in the array
                        type="radio"
                        id={item.id} // You can use 'item.id' or 'item.code' for a unique identifier in 'id'
                        value={item.code} // Access the 'code' property for the 'value' attribute
                        label={item.value} // Access the 'value' property for the label
                        name={item.value}
                        onChange={(e) => {selectColorGroup(e)}}
                        className={`checkbox-box${selectedColourGroup === item.code ? ' selected' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </CTabContent>
              </div>
              ): null }
              { selectedColourGroup !== null && (
              <div className="row products-choices product_size ">
              <CNav variant="tabs" role="tablist">
                  <CNavItem key="all Colours">
                    <CNavLink
                      style={{ cursor: 'pointer' }}
                    >
                      all Colours
                    </CNavLink>
                  </CNavItem>
              </CNav>
              <CTabContent>
                <div className="text-left innerContainer">
                  <div className="product_size_choice">
                    {ColourID && ColourID.map((item) => (
                      <CFormCheck
                        key={`GroupColor${item.id}`} // Assuming 'id' is a unique identifier for each item in the array
                        type="radio"
                        id={item.id} // You can use 'item.id' or 'item.code' for a unique identifier in 'id'
                        value={item.code} // Access the 'code' property for the 'value' attribute
                        label={item.name} // Access the 'value' property for the label
                        name={item.name}
                        onChange={(e) => {selectGroupColor(e)}}
                        className={`checkbox-box${selectedGroupColour === item.code ? ' selected' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </CTabContent>
              </div>
              )}
              <div className="submit-section">
              { NextPart ? (<button className='submit-btn submitBtn' onClick={() => {nextPart()}}>Next</button>):null}
              { SecondPart ? (<button className='submit-btn submitBtn abc' onClick={() => secondPart()}>Next</button>):null}
                {/* <button className='submit-btn submitBtn' onClick={() => {setcheckboxselected(true);setshowAll(true);}}>Next</button> */}
                <button className='submit-btn submitBtn' onClick={() => {setdisablefield(false);setSelectedSize(null);
                setSelectedSpring(null)
                setSelectedStorage(null)
                setSelectedFabcolor(null)
                setSelectedFeet(null)
                setSelectedHeadsize(null)
                setSelectedRange(null)
                setSelectedStorage(null);
                setNextPart(false);
                setSecondPart(false);
                setChecked({ ...checked, headeboard: false })
                setFiltredValues({size : false, spring : true, FabricColor : true, Storage: true, FeetOptions: true, Sizes:true, Range: true, Style:true});
                setActiveKey({ ...activeKey, size: 1, headboard: 1 })
                setSelectedColourGroup(null)
                }}>Reset</button>
              </div>
              <div className="submit-section">
                <button className='submit-btn submitBtn' onClick={saveCartData} disabled={selectedGroupColour === null}>Add to Cart</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        'Data is being fetched pls wait'
      )}
    </>
  )
}

export default AddProduct
