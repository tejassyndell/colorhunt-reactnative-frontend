/* eslint-disable */
import React, { useState, useEffect, useRef } from 'react'
import {
  CForm,
  CButton,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CContainer,
  CRow,
  CCol,
} from '@coreui/react'
import Select from 'react-select'
import './css/product.css'
import { fetchProductDetails, fetchEditProductDetails, updateProdctsVariation } from '../../api/api'
// import VariationList from '../components/variationList';
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {
  const intialProductValues = {
    Category: ``,
    Name: '',
    id: '',
    Group_id: '',
    Code: '',
    GroupName: '',
    group: [],
    Description: '',
    MattressSizes: [],
    Springs: [],
    BaseSizes: [],
    BaseFabricColour: [],
    FeetOption: [],
    FootBoard: [],
    Drawers: [],
    HeadboardSizes: [],
    HeadboardColur: [],
  }
  const { id } = useParams()

  const [productValues, setproductValues] = useState(intialProductValues)
  const [productvariation, setProductVariation] = useState([])
  const [fetchedproductdata, setfetchedProductData] = useState([])
  const [VariationData, setVariationData] = useState([])
  const [productData, setproductData] = useState([])
  const [showVariation, setShowVariation] = useState(false)
  const [Oldvariations, setOldVariations] = useState([])
  const [isValid, setisValid] = useState({
    Name: false,
    Code: false,
    MattSize: false,
    Springs: false,
    BaseSize: false,
    BaseColour: true,
    Feet: false,
    FootBoard: false,
    Drawer: false,
    HeadboardSize: false,
    HeadColour: false,
  })
  const [selectValues, setSelectValues] = useState({
    MattressSizes: [],
    Springs: [],
    BaseSizes: [],
    BaseFabricColour: [],
    FeetOption: [],
    FootBoard: [],
    Drawers: [],
    HeadboardSizes: [],
    HeadboardColur: [],
  })
  const [productSelectedValues, setProductSelectedValues] = useState({
    MattressSizes: [],
    Springs: [],
    BaseSizes: [],
    BaseFabricColour: [],
    FeetOption: [],
    FootBoard: [],
    Drawers: [],
    HeadboardSizes: [],
    HeadboardColur: [],
  })
  const navigate = useNavigate()



  const handleChange = (e) => {
    setproductValues({ ...productValues, [e.target.name]: e.target.value })
    console.log(productValues);
  }



  useEffect(() => {
    // if (productValues.Name) {
    //   // const productCode = productValues.Name.replace(/[\s,\., \', \", \`]/g, '').slice(0, 3).toUpperCase();
    //   const productCode = productValues.Name.replace(/[^a-zA-Z0-9]/g, '')
    //     .slice(0, 3)
    //     .toUpperCase()
    //   // setproductValues({ ...productValues, Code: productCode })
    // } else {
    //   setproductValues({ ...productValues, Code: '' })
    // }
  }, [productValues.Name])

  //API call
  const submitdata = async (e) => {
    const response = await updateProdctsVariation(e)
    if (response.status === 200) {
      console.log(response.data)
      setVariationData(response.data)
      setTimeout(() => {
        navigate(`/product-variations/${id}`)
      }, 1000) //1 sec delay to redirect
    } else {
      // alert('error in saving product')
      console.log(response.data)
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (productValues.Name.trim().length == 0) {
      console.log('product name is empty.........')
      setisValid({ Name: true })
    } else if (productValues.Code.trim().length == 0) {
      console.log('product code is empty.........')
      setisValid({ Code: true })
    } else {
      if (productValues.Category == "1") {

        console.log("it's Mattress");
        if (productValues.MattressSizes.length == 0) {
          console.log("mattress size is empty.........");
          setisValid({ MattSize: true });
        } else if (productValues.Springs.length == 0) {
          console.log("spring value is empty.........");
          setisValid({ Springs: true });
        } else {
          let variations = [];
          for (let i = 0; i < productValues.MattressSizes.map((mattress) => mattress.value).length; i++) {
            for (let j = 0; j < productValues.Springs.map((Springs) => Springs.value).length; j++) {
              const variation = {
                MattressSizeGroup: productValues.MattressSizes[i].value,
                SpringGroup: productValues.Springs[j].value,
                variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}`,
                variationDescription: `${productValues.Name} ` + `${productValues.MattressSizes[i].value} Mattress Size with ${productValues.Springs[j].value} Spring Count`,
                variationcode: `${productValues.Code}` + `${productValues.MattressSizes[i].code}` + `${productValues.SpringCountCode[j]}`
                // Add other properties from productValues if needed
              };
              variations.push(variation);
            }
          }
          console.log(variations, "maters")

          //rs
          variations = Array.from(new Set(variations.map(JSON.stringify)), JSON.parse);
          let deletedValues = []
          let addedValues = []

          //to get new added varitions
          variations.forEach((variation) => {
            let matchFound = false;

            for (let i = 0; i < Oldvariations.length; i++) {
              const existingVariation = Oldvariations[i];
              // Check if the common fields between the old and new arrays match
              if (
                existingVariation.mat_size === variation.MattressSizeGroup &&
                existingVariation.springs === variation.SpringGroup
              ) {
                matchFound = true;
                break;
              }
            }

            // If the variation does not have a match in Oldvariations, mark it as a newly added value
            if (!matchFound) {
              addedValues.push(variation);
            }
          });

          Oldvariations.forEach((Oldvariations) => {
            let matchFound = false
            for (let i = 0; i < variations.length; i++) {
              const selectedOption = variations[i]
              // Check if the common fields between the old and new arrays match
              if (
                Oldvariations.mat_size === selectedOption.MattressSizeGroup &&
                Oldvariations.springs === selectedOption.SpringGroup
              ) {
                matchFound = true
                break
              }
            }

            // If an existing variation does not have a match in the selected options, mark it as a deleted value
            if (!matchFound) {
              deletedValues.push(Oldvariations)
            }
          })

          const formData = new FormData();
          formData.append('product', JSON.stringify(productValues));
          formData.append('product_group', JSON.stringify(variations));
          formData.append('deletedValuesdata', JSON.stringify(deletedValues));
          formData.append('AddedValuesdata', JSON.stringify(addedValues));

          submitdata(formData)


        }


      } else if (productValues.Category == '2') {
        console.log("it's Base")
        if (productValues.Springs.length == 0) {
          console.log('spring value is empty.........')
          setisValid({ Springs: true })
        } else if (productValues.BaseSizes.length == 0) {
          console.log('Base size is empty.........')
          setisValid({ BaseSize: true })
          // } else if (productValues.BaseFabricColour.length == 0) {
          //   console.log('Base Fabric Colour value is empty.........')
          //   setisValid({ BaseColour: true })
        } else if (productValues.FeetOption.length == 0) {
          console.log('Feet value is empty.........')
          setisValid({ Feet: true })
          // } else if (productValues.FootBoard.length == 0) {
          //   console.log('Footboard value is empty.........')
          //   setisValid({ FootBoard: true })
        } else if (productValues.Drawers.length == 0) {
          console.log('Drawer value is empty.........')
          setisValid({ Drawer: true })
        } else {
          console.log('Base Submitted')
          const createVariations = () => {
            const variations = [];
            for (let i = 0; i < productValues.BaseSizes.map((mattress) => mattress.value).length; i++) {
              for (let j = 0; j < productValues.Springs.map((Springs) => Springs.value).length; j++) {
                // for (const baseFabricColour of productValues.BaseFabricColour) {
                // for (const feetOption of productValues.FeetOption) {
                for (let n = 0; n < productValues.FeetOption.map((FeetOption) => FeetOption.value).length; n++) {
                  // for (let m = 0; m < productValues.FootBoard.map((FootBoard) => FootBoard.value).length; m++) {
                  // for (let l = 0; l < productValues.HeadboardSizes.map((HeadboardSizes) => HeadboardSizes.value).length; l++) {
                  for (let k = 0; k < productValues.Drawers.map((Drawers) => Drawers.value).length; k++) {
                    const mainFunc = () => {
                      const variation = {
                        BaseSizesGroup: productValues.BaseSizes[i].value,
                        SpringGroup: productValues.Springs[j].value,
                        FeetOptionGroup: productValues.FeetOption[n].value,
                        DrawersGroup: productValues.Drawers[k].value,
                        variationName: `${productValues.BaseSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.Drawers[k].value}`,
                        variationDescription: `${productValues.Name} ` + `${productValues.BaseSizes[i].value} Base Size With ${productValues.Springs[j].value} Spring Count ${productValues.FeetOption[n].value} Feet Type With ${productValues.Drawers[k].value} Drawer`,
                        variationcode: `${productValues.Code}` + `${productValues.BaseSizes[i].code}` + `${productValues.Springs[j].code}` + `${productValues.FeetOption[n].code}` + `${productValues.Drawers[k].code}`
                      };
                      variations.push(variation);
                    }
                    const withoutDrawer = () => {
                      const variation = {
                        BaseSizesGroup: productValues.BaseSizes[i].value,
                        SpringGroup: productValues.Springs[j].value,
                        FeetOptionGroup: productValues.FeetOption[n].value,
                        variationName: `${productValues.BaseSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.Drawers[k].value}`,
                        variationDescription: `${productValues.Name} ` + `${productValues.BaseSizes[i].value} Base Size With ${productValues.Springs[j].value} Spring Count ${productValues.FeetOption[n].value} Feet Type`,
                        variationcode: `${productValues.Code}` + `${productValues.BaseSizes[i].code}` + `${productValues.Springs[j].code}` + `${productValues.FeetOption[n].code}`
                      };
                      variations.push(variation);
                    }
                    mainFunc();
                    withoutDrawer()
                  }
                }
                // }
                // }
                // }
              }
            }
            return variations;
          };

          // Example usage
          let variations = createVariations()

          // Print variations with desired format
          variations.forEach((variation) => {
            const variationString = `Name: ${productValues.Name} - BaseSize: ${variation.BaseSizesGroup} - Base Fabric Colour: ${variation.BaseFabricColourGroup} - Feet Option: ${variation.FeetOptionGroup} - Foot Board: ${variation.FootBoardGroup} - Drawers: ${variation.DrawersGroup}`
            console.log(variationString)
          })

          variations = Array.from(new Set(variations.map(JSON.stringify)), JSON.parse);

          let deletedValues = []
          let addedValues = []
          const newdatas = variations.filter((value) => !Oldvariations.includes(value))
          //to get new added varitions
          variations.forEach((variation) => {
            let matchFound = false;

            for (let i = 0; i < Oldvariations.length; i++) {
              const existingVariation = Oldvariations[i];
              // Check if the common fields between the old and new arrays match
              if (
                existingVariation.baseSizes === variation.BaseSizesGroup &&
                existingVariation.springs === variation.SpringGroup &&
                // existingVariation.base_fab_color === variation.BaseFabricColourGroup &&
                existingVariation.feet_options === variation.FeetOptionGroup &&
                // existingVariation.foot_board === variation.FootBoardGroup &&
                existingVariation.drawers === variation.DrawersGroup
                // existingVariation.headboardSizes == variation.HeadboardSizesGroup
              ) {
                matchFound = true;
                break;
              }
            }

            // If the variation does not have a match in Oldvariations, mark it as a newly added value
            if (!matchFound) {
              addedValues.push(variation);
            }
          });



          Oldvariations.forEach((Oldvariations) => {
            let matchFound = false
            for (let i = 0; i < variations.length; i++) {
              const selectedOption = variations[i]
              // Check if the common fields between the old and new arrays match
              if (
                Oldvariations.baseSizes === selectedOption.BaseSizesGroup &&
                Oldvariations.springs === selectedOption.SpringGroup &&
                // Oldvariations.base_fab_color === selectedOption.BaseFabricColourGroup &&
                Oldvariations.feet_options === selectedOption.FeetOptionGroup &&
                // Oldvariations.foot_board === selectedOption.FootBoardGroup &&
                Oldvariations.drawers === selectedOption.DrawersGroup
                // Oldvariations.headboardSizes == selectedOption.HeadboardSizesGroup
              ) {
                matchFound = true
                break
              }
            }

            // If an existing variation does not have a match in the selected options, mark it as a deleted value
            if (!matchFound) {
              deletedValues.push(Oldvariations)
            }
          })

          //  API call function
          // const productAPIData = {
          //   product: productValues,
          //   deletedValuesdata: deletedValues,
          //   AddedValuesdata: addedValues,
          // }
          const formData = new FormData();
          formData.append('product', JSON.stringify(productValues));
          formData.append('product_group', JSON.stringify(variations));
          formData.append('deletedValuesdata', JSON.stringify(deletedValues));
          formData.append('AddedValuesdata', JSON.stringify(addedValues));

          submitdata(formData)
        }

      } else if (productValues.Category == '3') {
        console.log("it's Headboard")
        if (productValues.HeadboardSizes.length == 0) {
          console.log('Headboard size is empty.........')
          setisValid({ HeadboardSize: true })
        } else if (productValues.FootBoard.length == 0) {
          console.log("Head Board style value is empty.........");
          setisValid({ HeadColour: true });
        } else {
          console.log('Headboard Submitted')

          const createVariations = () => {
            const variations = [];
            for (let l = 0; l < productValues.HeadboardSizes.map((HeadboardSizes) => HeadboardSizes.value).length; l++) {
              for (let m = 0; m < productValues.FootBoard.map((FootBoard) => FootBoard.value).length; m++) {
                const basewithFootboard = () => {
                  console.log(productValues.HeadboardSizes[l].value);
                  console.log(productValues.FootBoard[m].value);
                  console.log(productValues.HeadboardSizes[l].value + productValues.Name + productValues.FootBoard[m].value);
                  // console.log(productValues.group + productValues.HeadboardSizes[l].code+productValues.FootBoard[m].code);
                  const variation = {
                    HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                    FootBoardGroup: productValues.FootBoard[m].value,
                    IsFootboard: "YES",
                    variationName: `${productValues.HeadboardSizes[l].value} ` + `${productValues.Name}` + ` ${productValues.FootBoard[m].value}`,
                    variationDescription: `${productValues.Name} ` + `${productValues.HeadboardSizes[l].value} Headboard Size of ${productValues.FootBoard[m].value} Design With Footboard`,
                    variationcode: `${productValues.Code}F` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}`
                  };
                  variations.push(variation);
                }
                const basewithoutFootboard = () => {
                  const variation = {
                    HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                    FootBoardGroup: productValues.FootBoard[m].value,
                    variationName: `${productValues.HeadboardSizes[l].value} ` + `${productValues.Name}` + ` ${productValues.FootBoard[m].value}`,
                    variationDescription: `${productValues.Name} ` + `${productValues.HeadboardSizes[l].value} Headboard Size of ${productValues.FootBoard[m].value} Design`,
                    variationcode: `${productValues.Code}` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}`
                  };
                  variations.push(variation);
                }
                basewithFootboard();
                basewithoutFootboard();
              }
            }
            return variations;
          };
          // Example usage
          const variations = createVariations();
          console.log(variations, "variations")

          let deletedValues = []
          let addedValues = []

          variations.forEach((variation) => {
            let matchFound = false;

            for (let i = 0; i < Oldvariations.length; i++) {
              const existingVariation = Oldvariations[i];
              // Check if the common fields between the old and new arrays match
              if (

                existingVariation.foot_board === variation.FootBoardGroup &&
                existingVariation.headboardSizes == variation.HeadboardSizesGroup &&
                existingVariation.Include_footboard == variation.IsFootboard
              ) {
                matchFound = true;
                break;
              }
            }

            // If the variation does not have a match in Oldvariations, mark it as a newly added value
            if (!matchFound) {
              addedValues.push(variation);
            }
          });

          Oldvariations.forEach((Oldvariations) => {
            let matchFound = false
            for (let i = 0; i < variations.length; i++) {
              const selectedOption = variations[i]
              // console.log(Oldvariations);
              // console.log(selectedOption);
              // Check if the common fields between the old and new arrays match
              if (

                Oldvariations.foot_board === selectedOption.FootBoardGroup &&
                Oldvariations.headboardSizes == selectedOption.HeadboardSizesGroup &&
                Oldvariations.Include_footboard == selectedOption.IsFootboard
              ) {
                matchFound = true
                break
              }
            }

            // If an existing variation does not have a match in the selected options, mark it as a deleted value
            if (!matchFound) {
              deletedValues.push(Oldvariations)
            }
          })
          const formData = new FormData();
          formData.append('product', JSON.stringify(productValues));
          formData.append('product_group', JSON.stringify(variations));
          formData.append('deletedValuesdata', JSON.stringify(deletedValues));
          formData.append('AddedValuesdata', JSON.stringify(addedValues));

          // console.log(productValues);
          // console.log(variations);
          // console.log(deletedValues);
          // console.log(addedValues);

          submitdata(formData)

        }
      } else if (productValues.Category == '4') {
        console.log("it's Fullset")
        if (productValues.MattressSizes.length == 0) {
          console.log('mattress size is empty.........')
          setisValid({ MattSize: true })
        } else if (productValues.Springs.length == 0) {
          console.log('spring value is empty.........')
          setisValid({ Springs: true })
          // } else if (productValues.BaseFabricColour.length == 0) {
          //   console.log('Base Fabric Colour value is empty.........')
          //   setisValid({ BaseColour: true })
        } else if (productValues.FeetOption.length == 0) {
          console.log('Feet value is empty.........')
          setisValid({ Feet: true })
        } else if (productValues.FootBoard.length == 0) {
          console.log('Footboard value is empty.........')
          setisValid({ FootBoard: true })
        } else if (productValues.Drawers.length == 0) {
          console.log('Drawer value is empty.........')
          setisValid({ Drawer: true })
        } else if (productValues.HeadboardSizes.length == 0) {
          console.log('Headboard size is empty.........')
          setisValid({ HeadboardSize: true })
        } else {
          console.log('fullset Submitted')
          const createVariations = () => {
            const variations = [];
            for (let i = 0; i < productValues.MattressSizes.map((mattress) => mattress.value).length; i++) {
              for (let j = 0; j < productValues.Springs.map((Springs) => Springs.value).length; j++) {
                // for (const baseFabricColour of productValues.BaseFabricColour) {
                // for (const feetOption of productValues.FeetOption) {
                for (let n = 0; n < productValues.FeetOption.map((FeetOption) => FeetOption.value).length; n++) {
                  for (let m = 0; m < productValues.FootBoard.map((FootBoard) => FootBoard.value).length; m++) {
                    for (let l = 0; l < productValues.HeadboardSizes.map((HeadboardSizes) => HeadboardSizes.value).length; l++) {
                      for (let k = 0; k < productValues.Drawers.map((Drawers) => Drawers.value).length; k++) {
                        const typeOne = () => {
                          const variation = {
                            MattressSizeGroup: productValues.MattressSizes[i].value,
                            SpringGroup: productValues.Springs[j].value,
                            FeetOptionGroup: productValues.FeetOption[n].value,
                            FootBoardGroup: productValues.FootBoard[m].value,
                            DrawersGroup: productValues.Drawers[k].value,
                            HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                            variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.Drawers[k].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.FootBoard[m].value}`,
                            variationDescription: `${productValues.Name} ` + `${productValues.MattressSizes[i].value} Mattress Size` + ` ${productValues.Springs[j].value} Spring Count` + ` ${productValues.Drawers[k].value} Drawer` + ` ${productValues.FeetOption[n].value} Feet Option` + ` ${productValues.FootBoard[m].value} Headboard Style`,
                            variationcode: `${productValues.Code}` + `${productValues.Springs[j].code}` + `${productValues.MattressSizes[i].code}(S)` + "-" + `${productValues.Code}` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}(S)` + "-" + `${productValues.Code}` + `${productValues.Springs[j].code}` + `${productValues.MattressSizes[i].code}` + `${productValues.FeetOption[n].code}` + `${productValues.Drawers[k].code}` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}(S)`
                          };
                          variations.push(variation);
                        }
                        const typeTwo = () => {
                          const variation = {
                            MattressSizeGroup: productValues.MattressSizes[i].value,
                            SpringGroup: productValues.Springs[j].value,
                            FeetOptionGroup: productValues.FeetOption[n].value,
                            FootBoardGroup: productValues.FootBoard[m].value,
                            HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                            variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.FootBoard[m].value}`,
                            variationDescription: `${productValues.Name} ` + `${productValues.MattressSizes[i].value} Mattress Size` + ` ${productValues.Springs[j].value} Spring Count` + ` ${productValues.FeetOption[n].value} Feet Option` + ` ${productValues.FootBoard[m].value} Headboard Style`,
                            variationcode: `${productValues.Code}` + `${productValues.Springs[j].code}` + `${productValues.MattressSizes[i].code}(S)` + "-" + `${productValues.Code}` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}(S)` + "-" + `${productValues.Code}` + `${productValues.Springs[j].code}` + `${productValues.MattressSizes[i].code}` + `${productValues.FeetOption[n].code}` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}(S)`
                          };
                          variations.push(variation);
                        }
                        const typeFive = () => {
                          const variation = {
                            MattressSizeGroup: productValues.MattressSizes[i].value,
                            SpringGroup: productValues.Springs[j].value,
                            FeetOptionGroup: productValues.FeetOption[n].value,
                            FootBoardGroup: productValues.FootBoard[m].value,
                            DrawersGroup: productValues.Drawers[k].value,
                            HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                            IsFootboard: "YES",
                            variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.Drawers[k].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.FootBoard[m].value} with Footboard`,
                            variationDescription: `${productValues.Name} ` + `${productValues.MattressSizes[i].value} Mattress Size` + ` ${productValues.Springs[j].value} Spring Count` + ` ${productValues.Drawers[k].value} Drawer` + ` ${productValues.FeetOption[n].value} Feet Option` + ` ${productValues.FootBoard[m].value} Headboard Style With Footboard`,
                            variationcode: `${productValues.Code}` + `${productValues.Springs[j].code}` + `${productValues.MattressSizes[i].code}(S)` + "-" + `${productValues.Code}F` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}(S)` + "-" + `${productValues.Code}F` + `${productValues.Springs[j].code}` + `${productValues.MattressSizes[i].code}` + `${productValues.FeetOption[n].code}` + `${productValues.Drawers[k].code}` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}(S)`
                          };
                          variations.push(variation);
                        }
                        const typeSix = () => {
                          const variation = {
                            MattressSizeGroup: productValues.MattressSizes[i].value,
                            SpringGroup: productValues.Springs[j].value,
                            FeetOptionGroup: productValues.FeetOption[n].value,
                            FootBoardGroup: productValues.FootBoard[m].value,
                            HeadboardSizesGroup: productValues.HeadboardSizes[l].value,
                            IsFootboard: "YES",
                            variationName: `${productValues.MattressSizes[i].value} ` + `${productValues.Name}` + ` ${productValues.Springs[j].value}` + ` ${productValues.FeetOption[n].value}` + ` ${productValues.FootBoard[m].value}  with Footboard`,
                            variationDescription: `${productValues.Name} ` + `${productValues.MattressSizes[i].value} Mattress Size` + ` ${productValues.Springs[j].value} Spring Count` + ` ${productValues.FeetOption[n].value} Feet Option` + ` ${productValues.FootBoard[m].value} Headboard Style With Footboard`,
                            variationcode: `${productValues.Code}` + `${productValues.Springs[j].code}` + `${productValues.MattressSizes[i].code}(S)` + "-" + `${productValues.Code}F` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}(S)` + "-" + `${productValues.Code}F` + `${productValues.Springs[j].code}` + `${productValues.MattressSizes[i].code}` + `${productValues.FeetOption[n].code}` + `${productValues.HeadboardSizes[l].code}` + `${productValues.FootBoard[m].code}(S)`
                          };
                          variations.push(variation);
                        }
                        typeOne();//to create variation with possible variable data
                        typeTwo(); //to create variation without drawer 
                        typeFive();
                        typeSix();
                      }
                    }
                  }
                  // }
                }
              }
            }
            return variations;
          };

          // Example usage
          let variations = createVariations()

          // Print variations with desired format
          variations.forEach((variation) => {
            const variationString = `Name: ${productValues.Name} - Size: ${variation.MattressSizeGroup} - Spring: ${variation.SpringGroup} - Base Fabric Colour: ${variation.BaseFabricColourGroup} - Feet Option: ${variation.FeetOptionGroup} - Drawers: ${variation.DrawersGroup}`
            console.log(variationString)
          })

          variations = Array.from(new Set(variations.map(JSON.stringify)), JSON.parse);

          let deletedValues = []
          let addedValues = []
          const newdatas = variations.filter((value) => !Oldvariations.includes(value))
          //to get new added varitions
          variations.forEach((variation) => {
            let matchFound = false;

            for (let i = 0; i < Oldvariations.length; i++) {
              const existingVariation = Oldvariations[i];
              // Check if the common fields between the old and new arrays match
              if (
                existingVariation.mat_size === variation.MattressSizeGroup &&
                existingVariation.springs === variation.SpringGroup &&
                existingVariation.base_fab_color === variation.BaseFabricColourGroup &&
                existingVariation.feet_options === variation.FeetOptionGroup &&
                existingVariation.foot_board === variation.FootBoardGroup &&
                existingVariation.drawers === variation.DrawersGroup &&
                existingVariation.headboardSizes == variation.HeadboardSizesGroup
              ) {
                matchFound = true;
                break;
              }
            }

            // If the variation does not have a match in Oldvariations, mark it as a newly added value
            if (!matchFound) {
              addedValues.push(variation);
            }
          });



          Oldvariations.forEach((Oldvariations) => {
            let matchFound = false
            for (let i = 0; i < variations.length; i++) {
              const selectedOption = variations[i]
              // Check if the common fields between the old and new arrays match
              if (
                Oldvariations.mat_size === selectedOption.MattressSizeGroup &&
                Oldvariations.springs === selectedOption.SpringGroup &&
                Oldvariations.base_fab_color === selectedOption.BaseFabricColourGroup &&
                Oldvariations.feet_options === selectedOption.FeetOptionGroup &&
                Oldvariations.foot_board === selectedOption.FootBoardGroup &&
                Oldvariations.drawers === selectedOption.DrawersGroup &&
                Oldvariations.headboardSizes == selectedOption.HeadboardSizesGroup
              ) {
                matchFound = true
                break
              }
            }

            // If an existing variation does not have a match in the selected options, mark it as a deleted value
            if (!matchFound) {
              deletedValues.push(Oldvariations)
            }
          })

          //  API call function
          // const productAPIData = {
          //   product: productValues,
          //   deletedValuesdata: deletedValues,
          //   AddedValuesdata: addedValues,
          // }
          const formData = new FormData();
          formData.append('product', JSON.stringify(productValues));
          formData.append('product_group', JSON.stringify(variations));
          formData.append('deletedValuesdata', JSON.stringify(deletedValues));
          formData.append('AddedValuesdata', JSON.stringify(addedValues));

          submitdata(formData)
        }
      }
    }
  }

  const fetchDataofproducts = async (data) => {
    try {
      const response = await fetchProductDetails(data)
      if (response.status === 200) {
        console.log(response.data)
        setfetchedProductData(response.data)
      } else {
        // alert("Error");
      }
    } catch (error) {
      // alert('Error')
      console.log("Error")
    }
  }
  // Function to fetch product data
  const fetchProductData = async () => {
    await fetchDataofproducts(productValues)
  }
  const FetchProductDetails = async () => {
    const result = await fetchEditProductDetails({ Id: id })
    setproductData(result.data)
    console.log(productData.matsizeData)
    setOldVariations(result.data.VariationsData)
    console.log(Oldvariations)
    // console.log(Oldvariations)
  }

  //to fetch options and product data from the database
  useEffect(() => {
    // Call the function to fetch product data
    fetchProductData()
    FetchProductDetails()
  }, [])

  useEffect(() => { }, [productData])
  //to set pre-selected values of fetched perticular product
  useEffect(() => {
    console.log(productData) // Check the value of productData
    if (productData.singleProductData && productData.singleProductData.length != 0) {
      const pre_mattSizes =
        productData.singleProductData &&
        productData.singleProductData.matsizeData.map((item, index) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value} Size`,
        }))
      const pre_springs =
        productData.singleProductData &&
        productData.singleProductData.springs.map((item, index) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value} Springs`,
        }))
      const pre_baseSizes =
        productData.singleProductData &&
        productData.singleProductData.baseSizes &&
        productData.singleProductData.baseSizes.map((item, index) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const pre_headboardSizes =
        productData.singleProductData &&
        productData.singleProductData.headboardSizes.map((item, index) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const pre_basefabColour =
        productData.singleProductData &&
        productData.singleProductData.base_fab_color.map((item, index) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const pre_feetOptions =
        productData.singleProductData &&
        productData.singleProductData.feet_options.map((item, index) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const pre_headboardfabColour =
        productData.singleProductData &&
        productData.singleProductData.headboardColor.map((item, index) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const pre_DrawersOptions =
        productData.singleProductData &&
        productData.singleProductData.drawers.map((item, index) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const pre_footBoardOptions =
        productData.singleProductData &&
        productData.singleProductData.foot_board.map((item, index) => ({
          // FootBoard : .codeitem.code,
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))

      console.log(pre_DrawersOptions)

      setProductSelectedValues((productSelectedValues) => ({
        ...productSelectedValues,
        MattressSizes: pre_mattSizes,
        Springs: pre_springs,
        BaseSizes: pre_baseSizes,
        HeadboardSizes: pre_headboardSizes,
        BaseFabricColour: pre_basefabColour,
        FeetOption: pre_feetOptions,
        HeadboardColur: pre_headboardfabColour,
        Drawers: pre_DrawersOptions,
        FootBoard: pre_footBoardOptions,
      }))
      console.log(productData);
      setproductValues({
        ...productValues,
        Category: productData.singleProductData.product[0].category,
        Name: productData.singleProductData.product[0].name,
        Description: productData.singleProductData.product[0].description,
        Code: productData.singleProductData.product[0].code,
        id: productData.singleProductData.product[0].id,
        Group_id: productData.singleProductData.product[0].group_id,
        GroupName: productData.singleProductData.product[0].group_name,
        group: productData.singleProductData.product[0].product_code,
        MattressSizes: pre_mattSizes,
        Springs: pre_springs,
        BaseFabricColour: pre_basefabColour,
        FeetOption: pre_feetOptions,
        FootBoard: pre_footBoardOptions,
        Drawers: pre_DrawersOptions,
        HeadboardSizes: pre_headboardSizes,
        HeadboardColur: pre_headboardfabColour,
        BaseSizes: pre_baseSizes,
      })
    }
  }, [productData])
  console.log(productValues)

  //to set product options attributes
  useEffect(() => {
    if (fetchedproductdata != null) {
      const mattressSizes =
        fetchedproductdata.mat_size &&
        fetchedproductdata.mat_size.map((item) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value} Size`,
        }))
      const springOptions =
        fetchedproductdata.springs &&
        fetchedproductdata.springs.map((item) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value} Springs`,
        }))
      const baseSizes =
        fetchedproductdata.base_size &&
        fetchedproductdata.base_size.map((item) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const headboardSizes =
        fetchedproductdata.headboard_size &&
        fetchedproductdata.headboard_size.map((item) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const basefabColour =
        fetchedproductdata.base_fab_color &&
        fetchedproductdata.base_fab_color.map((item) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const feetOptions =
        fetchedproductdata.product_feet &&
        fetchedproductdata.product_feet.map((item) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const headboardfabColour =
        fetchedproductdata.headboard_style &&
        fetchedproductdata.headboard_style.map((item) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const DrawersOptions =
        fetchedproductdata.drawers &&
        fetchedproductdata.drawers.map((item) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      const footBoardOptions =
        fetchedproductdata.footboards &&
        fetchedproductdata.footboards.map((item) => ({
          value: item.value,
          code: item.code,
          id: item.id,
          label: `${item.value}`,
        }))
      console.log(DrawersOptions)

      setSelectValues((selectValues) => ({
        ...selectValues,
        MattressSizes: mattressSizes,
        Springs: springOptions,
        BaseSizes: baseSizes,
        BaseFabricColour: basefabColour,
        FeetOption: feetOptions,
        Drawers: DrawersOptions,
        HeadboardSizes: headboardSizes,
        HeadboardColur: headboardfabColour,
        FootBoard: footBoardOptions,
      }))
    }
  }, [fetchedproductdata])

  const setSelectedValues = (selectedOptions, optionName) => {
    console.log(selectedOptions)
    const selectedVal = Array.from(selectedOptions).map((option) => ({
      value: option.value,
      id: option.id,
      code: option.code,
      label: option.label,
    }))
    setProductSelectedValues((prevProductValues) => ({
      ...prevProductValues,
      [optionName]: selectedVal,
    }))
    console.log(productSelectedValues)
    // ----
    // setProductSelectedValues((prevState) => ({
    //   ...prevState,
    //   [optionName]: selectedOptions
    // }));
    setproductValues((prevState) => ({
      ...prevState,
      [optionName]: selectedOptions
        ? selectedOptions.map((option) => ({
          value: option.value,
          id: option.id,
          code: option.code,
          label: option.label,
        }))
        : prevState[optionName],
    }))
    console.log(productValues)
    // Perform any other necessary actions
  }
  const setSelectedonChange = (e) => {
    setproductValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    console.log(productValues)
  }
  useEffect(() => {
    console.log(productValues)
  }, [productValues])

  return (
    <>
      {!showVariation ? (
        <div className="add-product">
          {fetchedproductdata != null ? (
            <CContainer>
              <CForm className="addproduct-form" onSubmit={handleFormSubmit}>
                <CRow>
                  <CCol xs={12}>
                    <CFormSelect
                      label="Category"
                      name="Category"
                      aria-label="Category"
                      value={productValues.Category}
                      onChange={handleChange}
                    >
                      {fetchedproductdata.category &&
                        fetchedproductdata.category.map((value, index) => (
                          <option value={value.id}>{value.category_name}</option>
                        ))}
                    </CFormSelect>
                  </CCol>
                </CRow>
                <CRow>
                  <CCol xs={6}>
                    <CFormInput
                      type="text"
                      id="product-name"
                      label="Name"
                      name="Name"
                      onChange={(e) => setSelectedonChange(e)}
                      value={productValues && productValues.Name}
                      disabled
                    />
                    {isValid.Name && (
                      <p style={{ textAlign: 'left', color: '#e55353' }}>
                        Please enter product name
                      </p>
                    )}
                  </CCol>
                  <CCol xs={6}>
                    <CFormInput
                      type="text"
                      id="product-code"
                      label="Code"
                      name="Code"
                      onChange={handleChange}
                      value={productValues && productValues.Code}
                      disabled
                    />
                    {isValid.Code && (
                      <p style={{ textAlign: 'left', color: '#e55353' }}>
                        Please Enter Product Code.
                      </p>
                    )}
                  </CCol>
                  {/* <CCol lg={6} xs={12}>
                    <CFormInput
                      type="text"
                      id="product-code"
                      label="Product Group"
                      name="Group_Name"
                      onChange={handleChange}
                      value={productValues && productValues.GroupName}
                      disabled
                    />
                  </CCol> */}
                  {/* <CCol lg={6} xs={12}> */}
                  {/* <CFormInput type="text" id="product-code" label="Product Group Code" name='Group_Code' value={selectedGroupCode} disabled/> */}
                  {/* <CFormInput type="text" id="products-code" label="Product Item Group Code" name='Product_Code' value={productValues && productValues.group} disabled /> */}
                  {/* {isValid.Code && (<p style={{textAlign: "left",color: "#e55353"}}>Please Enter Product Code.</p>)} */}
                  {/* </CCol> */}
                  <CCol xs={12}>
                    <CFormTextarea
                      id="product-description"
                      label="Description"
                      name="Description"
                      onChange={handleChange}
                      value={productValues && productValues.Description}
                      rows={1}
                    />
                  </CCol>
                  {!(productValues.Category == '2' || productValues.Category == '3') ? (
                    <CCol xs={6}>
                      <div>
                        <label htmlFor={selectValues.MattSize}>Mattress Sies</label>
                        <Select
                          isMulti
                          id="mattressSizes"
                          aria-labelledby="mattressSizes"
                          options={selectValues.MattressSizes && selectValues.MattressSizes}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={productSelectedValues.MattressSizes} // Initialize value to the same default value
                          // onChange={setSelectedValues}
                          onChange={(selectedOptions) =>
                            setSelectedValues(selectedOptions, 'MattressSizes')
                          }
                        />
                      </div>
                      {isValid.MattSize && (
                        <p style={{ textAlign: 'left', color: '#e55353' }}>
                          Please select at least one size
                        </p>
                      )}
                    </CCol>
                  ) : null}

                  {!(productValues.Category == '3') ? (
                    <CCol xs={6}>
                      <div>
                        <label htmlFor="Springs">Springs</label>
                        <Select
                          isMulti
                          id="Springs"
                          aria-labelledby="Springs"
                          name="Springs"
                          options={selectValues.Springs && selectValues.Springs}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={productSelectedValues.Springs}
                          onChange={(selectedOptions) =>
                            setSelectedValues(selectedOptions, 'Springs')
                          }
                        />
                      </div>
                      {isValid.Springs && (
                        <p style={{ textAlign: 'left', color: '#e55353' }}>
                          Please select at least one spring type
                        </p>
                      )}
                    </CCol>
                  ) : null}
                  {!(
                    productValues.Category == '1' ||
                    productValues.Category == '3' ||
                    productValues.Category == '4'
                  ) ? (
                    <CCol xs={6}>
                      <div>
                        <label htmlFor="baseSizes">Base Sizes</label>
                        <Select
                          isMulti
                          id="baseSizes"
                          aria-labelledby="baseSizes"
                          name="baseSizes"
                          options={selectValues.BaseSizes && selectValues.BaseSizes}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={productSelectedValues.BaseSizes}
                          onChange={(selectedOptions) =>
                            setSelectedValues(selectedOptions, 'BaseSizes')
                          }
                        />
                      </div>
                      {isValid.BaseSize && (
                        <p style={{ textAlign: 'left', color: '#e55353' }}>
                          Please select at least one base size.
                        </p>
                      )}
                    </CCol>
                  ) : null}
                  {/* {!(productValues.Category == '1' || productValues.Category == '3') ? (
                    <CCol xs={6}>
                      <div>
                        <label htmlFor="basefabricColour">Base Fabric Colour</label>
                        <Select
                          isMulti
                          id="basefabricColour"
                          aria-labelledby="basefabricColour"
                          name="basefabricColour"
                          options={selectValues.BaseFabricColour && selectValues.BaseFabricColour}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={productSelectedValues.BaseFabricColour}
                          onChange={(selectedOptions) =>
                            setSelectedValues(selectedOptions, 'BaseFabricColour')
                          }
                        />
                      </div>
                      {isValid.BaseColour && (
                        <p style={{ textAlign: 'left', color: '#e55353' }}>
                          Please Select at least One Base Fabric Colour.
                        </p>
                      )}
                    </CCol>
                  ) : null} */}
                  {!(productValues.Category == '1' || productValues.Category == '3') ? (
                    <CCol xs={6}>
                      <div>
                        <label htmlFor="feetOption">Feet Option</label>
                        <Select
                          isMulti
                          id="feetOption"
                          aria-labelledby="feetOption"
                          name="feetOption"
                          options={selectValues.FeetOption && selectValues.FeetOption}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={productSelectedValues.FeetOption}
                          onChange={(selectedOptions) =>
                            setSelectedValues(selectedOptions, 'FeetOption')
                          }
                        />
                      </div>
                      {isValid.Feet && (
                        <p style={{ textAlign: 'left', color: '#e55353' }}>
                          Please Select at least One Feet
                        </p>
                      )}
                    </CCol>
                  ) : null}
                  {!(productValues.Category == '1' || productValues.Category == '2') ? (
                    <CCol xs={6}>
                      <div>
                        <label htmlFor="footBoard">head Board style</label>
                        <Select
                          isMulti
                          id="footBoard"
                          aria-labelledby="footBoard"
                          name="footBoard"
                          options={selectValues.FootBoard && selectValues.FootBoard}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={productSelectedValues.FootBoard}
                          onChange={(selectedOptions) =>
                            setSelectedValues(selectedOptions, 'FootBoard')
                          }
                        />
                      </div>
                      {isValid.FootBoard && (
                        <p style={{ textAlign: 'left', color: '#e55353' }}>
                          Please select at least one headboard style.
                        </p>
                      )}
                    </CCol>
                  ) : null}
                  {!(productValues.Category == '1' || productValues.Category == '3') ? (
                    <CCol xs={6}>
                      <div>
                        <label htmlFor="Drawers">Drawers</label>
                        <Select
                          isMulti
                          id="Drawers"
                          aria-labelledby="Drawers"
                          name="Drawers"
                          options={selectValues.Drawers && selectValues.Drawers}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={productSelectedValues.Drawers}
                          onChange={(selectedOptions) =>
                            setSelectedValues(selectedOptions, 'Drawers')
                          }
                        />
                      </div>
                      {isValid.Drawer && (
                        <p style={{ textAlign: 'left', color: '#e55353' }}>
                          Please select at least one drawer.
                        </p>
                      )}
                    </CCol>
                  ) : null}
                  {!(productValues.Category == '1' || productValues.Category == '2') ? (
                    <CCol xs={6}>
                      <div>
                        <label htmlFor="headboardSizes">Headboard Sizes</label>
                        <Select
                          isMulti
                          id="headboardSizes"
                          aria-labelledby="headboardSizes"
                          name="headboardSizes"
                          options={selectValues.HeadboardSizes && selectValues.HeadboardSizes}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          value={productSelectedValues.HeadboardSizes}
                          onChange={(selectedOptions) =>
                            setSelectedValues(selectedOptions, 'HeadboardSizes')
                          }
                        />
                      </div>
                      {isValid.HeadboardSize && (
                        <p style={{ textAlign: 'left', color: '#e55353' }}>
                          Please select at least one headboard size.
                        </p>
                      )}
                    </CCol>
                  ) : null}
                </CRow>
                <CRow className="mt-5">
                  <CCol>
                    <CButton className="save-pro m-auto d-block save-btn" type="submit">
                      Save Product
                    </CButton>
                  </CCol>
                </CRow>
              </CForm>
            </CContainer>
          ) : (
            'pls wait data is being fetch'
          )}
        </div>
      ) : (
        <VariationList data={VariationData} />
      )}
    </>
  )
}

export default EditProduct
