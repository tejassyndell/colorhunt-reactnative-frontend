/* eslint-disable */
import axios from "axios";
// const url = "http://10.0.2.2:4000";
// const url = "http://localhost:4000";
const url = "https://colorhunt-server.sincprojects.com";
// const url = 'https://garment-backend.sincprojects.com'

export const loginAuth = async (user) => {
  try {
    return await axios.post(`${url}/loginAuth`, user);
  } catch (err) {
    // console.log(err, 'err in react api')
  }
};
``;

//---------------------new change 28-----------------------
export const getProductName = async () => {
  try {
    return await axios.get(`${url}/getAllArticles`);
  } catch (error) {
    console.log(error, "err in react api");
  }
};

//////////////////////getCategories
export const getCategories = async () => {
  try {
    return await axios.get(`${url}/getCategories`);
  } catch (error) {
    console.log(error, "err in react api");
  }
};
export const getcateGorywithphotos = async () => {
  try {
    return await axios.get(`${url}/getcategorywithphotos`);
  } catch (error) {
    console.log(error, "err in react api");
  }
};

// getAddWishlist/////

export const getAddWishlist = async (data) => {
  console.log(data);
  try {
    return await axios.post(`${url}/addwishlist`, data);
  } catch (error) {
    console.log(error, "err in react api");
  }
};
/////////getWishlistData
export const getWishlistData = async (data) => {
  try {
    return await axios.post(`${url}/getWishlist`, data);
  } catch (error) {
    console.log(error, "err in react api");
  }
};
//////DeleteWishlist
export const DeleteWishlist = async (data) => {
  console.log(data);
  try {
    return await axios.post(`${url}/deletewishlist`, data);
  } catch (error) {
    console.log(error, "err in react api");
  }
};

export const ArticleDetails = async (data) => {
  const { ArticleId, PartyId } = data;
  console.log(ArticleId, PartyId, "=++++=");
  try {
    return await axios.post(
      `${url}/articledetails?ArticleId=${ArticleId}&PartyId=${PartyId}`
    );
  } catch (error) {
    console.log(error, "err in react api");
  }
};

export const editarticledetails = async (data) => {
  console.log(data.ArticleId);
  console.log(data.PartyId);

  try {
    return await axios.post(
      `${url}/getCartArticleDetails?ArticleId=${data.ArticleId}&PartyId=${data.PartyId}`
    );
  } catch (error) {
    console.log("err in react api", error);
  }
};

export const getcategorywithphotos = async (data) => {
  try {
    return await axios.get(`${url}/getcategorywithphotos`);
  } catch (error) {
    console.log("err in reACT api", error);
  }
};

export const SendMail = async (data) => {
  try {
    return await axios.post(`${url}/SendMail`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const Profiledata = async (data) => {
  try {
    return await axios.post(`${url}/getparty`, data);
  } catch (err) {
    console.log(err, "err in react api");
    // throw err;
  }
};
export const addto_cart = async (data) => {
  try {
    return await axios.post(`${url}/addtocart`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const findfromthecart = async (data) => {
  try {
    return await axios.post(`${url}/findfromthecart`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const updateCartArticale = async (data) => {
  try {
    return await axios.post(`${url}/updateCartArticale`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const cartdetails = async (data) => {
  try {
    return await axios.post(`${url}/cartdetails`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const deletecartitem = async (data) => {
  try {
    return await axios.post(`${url}/deletecartitem`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const gettransportation = async (data) => {
  try {
    return await axios.get(`${url}/gettransportation`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const phoneNumberValidation = async (data) => {
  try {
    console.log(data);
    return await axios.post(`${url}/phoneNumberValidation`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

//  Submit a Create new party
export const UserData = async (data) => {
  try {
    return await axios.post(`${url}/UserData`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const addso = async (data) => {
  try {
    return await axios.post(`${url}/addso`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const CollectInwardForCartArticals = async (data) => {
  try {
    return await axios.post(`${url}/collectinwardforcartarticals`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const getsonumber = async (data) => {
  console.log(data);
  try {
    return await axios.post(`${url}/getsonumber`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const getSoArticleDetails = async (data) => {
  console.log(data);
  try {
    return await axios.post(`${url}/getsoarticledetails`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const udatepartytoken = async (data) => {
  console.log(data);
  try {
    return await axios.post(`${url}/udatepartytoken`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const getNotification = async (data) => {
  console.log(data);
  try {
    return await axios.post(`${url}/getNotification`, data);
  } catch (err) {
    console.log(err, "err in react api");
  }
};

export const getcompleteoutwordDetails = async (data) => {
  console.log(data);
  try {
    return await axios.post(`${url}/getcompleteoutwordDetails`, data);
  } catch (err) {
    console.log(err);
  }
};

export const getCompletedSoDetails = async (data) => {
  try {
    return await axios.post(`${url}/getcompletedsodetails`, data);
  } catch (err) {
    console.log(err);
  }
};

export const FilterSoNumber = async(data)=>{
  try {
    return await axios.post(`${url}/filtersonumber`, data);
  } catch (err) {
    console.log(err);
  }
}

export const FilteroutwardNumber = async(data)=>{
  try {
    return await axios.post(`${url}/filteroutwardnumber`, data);
  } catch (err) {
    console.log(err);
  }
}
