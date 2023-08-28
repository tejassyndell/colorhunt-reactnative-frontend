/* eslint-disable */
import axios from 'axios'
const url = 'http://localhost:4000'
// const url = 'https://colorhunt-mobile-backend.sincprojects.com'
// const url = 'https://garment-backend.sincprojects.com'

export const loginAuth = async (user) => {
  try {
    return await axios.post(`${url}/loginAuth`, user)
  } catch (err) {
    // console.log(err, 'err in react api')
  }
}

//---------------------new change 28-----------------------
export const getProductName = async () => {
  try {
    return await axios.get(`${url}/getAllArticles`)
  } catch (error) {
    console.log(error, 'err in react api')
  }
}

//////////////////////getCategories
export const getCategories = async () => {
  try {
    return await axios.get(`${url}/getCategories`)
  } catch (error) {
    console.log(error, 'err in react api')
  }
}

// getAddWishlist/////

export const getAddWishlist = async (data) => {
  console.log(data)
  try {
    return await axios.post(`${url}/addwishlist`, data)
  } catch (error) {
    console.log(error, 'err in react api')
  }
}
/////////getWishlistData
export const getWishlistData = async (data) => {
  console.log(data)
  try {
    return await axios.post(`${url}/getWishlist`, data)
  } catch (error) {
    console.log(error, 'err in react api')
  }
}
//////DeleteWishlist
export const DeleteWishlist = async (data) => {
  console.log(data)
  try {
    return await axios.post(`${url}/deletewishlist`, data)
  } catch (error) {
    console.log(error, 'err in react api')
  }
}

export const ArticleDetails = async (data) => {
  console.log(data.ArticleId)
  console.log(data.PartyId)

  try {
    return await axios.post(
      `${url}/articledetails?ArticleId=${data.ArticleId}&PartyId=${data.PartyId}`,
    )
  } catch (error) {
    console.log(error, 'err in react api')
  }
}

export const editarticledetails = async(data) => {
  console.log(data.ArticleId)
  console.log(data.PartyId)

  try{
    return await axios.post(`${url}/getCartArticleDetails?ArticleId=${data.ArticleId}&PartyId=${data.PartyId}`)
  } catch (error) {
    console.log('err in react api',error)
  }
}

export const getcategorywithphotos = async(data) => {
  try {
    return await axios.get(`${url}/getcategorywithphotos`)
  } catch(error) {
    console.log('err in reACT api', error)
  }
}


export const SendMail = async (data) => {
  try {
    return await axios.post(`${url}/SendMail`, data)
  } catch (err) {
   
    console.log(err, 'err in react api')
  }
}