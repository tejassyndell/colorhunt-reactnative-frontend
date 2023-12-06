import Svg, { G, Rect, Path, Circle } from "react-native-svg";
import { Dimensions, View } from "react-native";
import { Text, TouchableOpacity } from 'react-native';
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { cartcount,notificationcount } from "../api/api";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart,AddNotification } from "../redux/action";
const Footersvg = (props) => {

  const { width, height } = Dimensions.get("window");
  const { val, status } = props;
  const [showRedDot, setShowreddot] = useState(false);
  const [count, setCount] = useState(0);
  const cartData = useSelector((state) => state.reducer)
  const notificationData = useSelector((state) => state.notificationData)
  
  const dispach = useDispatch();

  const getcountofcart = async () => {
    // console.warn(cartData);
    let data = await AsyncStorage.getItem("UserData");
    data = await JSON.parse(data);
    const response = await cartcount({ PartyId: data[0].Id }).then((res) => {
      dispach(addToCart(res.data[0]))
    }
    )

  }
  const getNotification = async ()=>{
    let data = await AsyncStorage.getItem("UserData");
    data = await JSON.parse(data);
  console.log('kjnsakjdkjsandsa');
  const response = await notificationcount({ PartyId: data[0].Id }).then((res) => {
    console.log(res.data);
    dispach(AddNotification(res.data[0]))
  }
  )

  }
  useFocusEffect(
    React.useCallback(() => {
      if (val == "cart") {
        getcountofcart()
        getNotification()
      }
    }, [val])


  )
  useEffect(() => {
    if (val == "cart") {
      console.log(notificationData,'872647328263482',cartData);

      if (cartData && cartData.total > 0) {
        setShowreddot(true);
      } else {
        setShowreddot(false);
      }
    }
  }, [cartData])
  useEffect(() => {
    if (val == "notification") {
      console.log(notificationData,'987239821jsand');
      if (notificationData && notificationData.total > 0) {
        setShowreddot(true);
      } else {
        setShowreddot(false);
      }
    }
  }, [notificationData])
  const vector = status ? (
    <Svg
      width={width >= 720 ? 60 : 42}
      height={width >= 720 ? 60 : 42}
      viewBox="0 0 39 39"
      fill="none"
      {...props}
    >
      <G id="Group 1000005776">
        <Rect id="Rectangle 102" width="39" height="39" rx="7" fill="white" />
        <Path
          id="Vector"
          d="M17.9366 27.8957V25.1443C17.9366 24.4414 18.5065 23.8717 19.2098 23.8717H21.7822C22.1195 23.8717 22.4434 24.0058 22.6823 24.2443C22.9212 24.4828 23.0554 24.8068 23.0554 25.1443V27.8957C23.0536 28.1882 23.1681 28.469 23.3739 28.676C23.5806 28.883 23.8606 29 24.1532 29H25.9078C26.7274 29.0018 27.5138 28.6787 28.0936 28.1009C28.6743 27.5231 29 26.7383 29 25.9201V18.0801C29 17.4186 28.7065 16.7922 28.1992 16.3683L22.2304 11.6081C21.1925 10.7738 19.7046 10.8008 18.6971 11.672L12.8652 16.3683C12.3337 16.7796 12.0161 17.4087 12 18.0801V25.912C12 27.6176 13.3842 29 15.0922 29H16.8065C17.4141 29 17.9079 28.5104 17.9124 27.9038L17.9366 27.8957Z"
          fill="#212121"
        />
      </G>
    </Svg>
  ) : (
    <Svg
      width={width >= 720 ? 40 : 25}
      height={width >= 720 ? 40 : 25}
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <Path
        d="M7.68264 20.6503V17.2875C7.68264 16.4284 8.42023 15.7321 9.33033 15.7321H12.6593C13.0958 15.7321 13.5149 15.896 13.8241 16.1875C14.1333 16.479 14.3069 16.875 14.3069 17.2875V20.6503C14.3046 21.0078 14.4528 21.351 14.7192 21.604C14.9866 21.857 15.3491 22 15.7277 22H17.9983C19.059 22.0022 20.0767 21.6073 20.8271 20.9011C21.5785 20.1949 22 19.2356 22 18.2357V8.65346C22 7.84494 21.6202 7.07932 20.9637 6.56121L13.2394 0.743206C11.8962 -0.276512 9.97061 -0.243512 8.66683 0.821307L1.1197 6.56121C0.431907 7.06392 0.0208421 7.83284 0 8.65346V18.2258C0 20.3104 1.79126 22 4.00168 22H6.22022C7.00643 22 7.64558 21.4016 7.65137 20.6602L7.68264 20.6503Z"
        fill="white"
      />
    </Svg>
  );

  const cart = status ? (
    <Svg
      width={width >= 720 ? 60 : 42}
      height={width >= 720 ? 60 : 42}
      viewBox="0 0 39 39"
      fill="none"
    >
      <Text style={{ color: "red" }}>●</Text>
      <G id="Group_1000005780">
        <Rect id="Rectangle_102" width={39} height={39} rx={7} fill="white" />
        <G id="Group_1000005772">
          <Path
            id="Vector"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.5176 27.2951C13.5176 26.5384 14.1291 25.9258 14.8845 25.9258C15.6309 25.9258 16.2425 26.5384 16.2425 27.2951C16.2425 28.0428 15.6309 28.6554 14.8845 28.6554C14.1291 28.6554 13.5176 28.0428 13.5176 27.2951Z"
            fill="#212121"
          />
          <Path
            id="Vector_2"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.3589 14.4677C26.9075 14.4677 27.2672 14.6569 27.6269 15.0713C27.9867 15.4857 28.0496 16.0802 27.9687 16.6199L27.1143 22.5295C26.9525 23.6655 25.9812 24.5024 24.8391 24.5024H15.0278C13.8317 24.5024 12.8425 23.5835 12.7435 22.3953L11.9162 12.575L10.5582 12.3408C10.1985 12.2777 9.94671 11.9264 10.0097 11.566C10.0726 11.1967 10.4234 10.9535 10.7921 11.0075L12.9369 11.3318C13.2426 11.3868 13.4675 11.6381 13.4944 11.9444L13.6653 13.9623C13.6923 14.2515 13.9261 14.4677 14.2139 14.4677H26.3589ZM20.9092 19.1513H23.4002C23.7779 19.1513 24.0747 18.845 24.0747 18.4756C24.0747 18.0973 23.7779 17.8 23.4002 17.8H20.9092C20.5315 17.8 20.2347 18.0973 20.2347 18.4756C20.2347 18.845 20.5315 19.1513 20.9092 19.1513Z"
            fill="#212121"
          />
        </G>
      </G>
    </Svg>
  ) : (

    <Svg
      width={width >= 720 ? 49 : 34}
      height={width >= 720 ? 40 : 25}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.99121 18.4594C3.99121 17.6022 4.68515 16.9082 5.54238 16.9082C6.3894 16.9082 7.08336 17.6022 7.08336 18.4594C7.08336 19.3064 6.3894 20.0004 5.54238 20.0004C4.68515 20.0004 3.99121 19.3064 3.99121 18.4594ZM15.472 18.4594C15.472 17.6022 16.1659 16.9082 17.0231 16.9082C17.8701 16.9082 18.5641 17.6022 18.5641 18.4594C18.5641 19.3064 17.8701 20.0004 17.0231 20.0004C16.1659 20.0004 15.472 19.3064 15.472 18.4594Z"
          fill="white"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18.5639 3.92828C19.1864 3.92828 19.5946 4.14259 20.0028 4.61203C20.411 5.08146 20.4824 5.755 20.3906 6.36628L19.4211 13.0608C19.2374 14.3477 18.1353 15.2958 16.8392 15.2958H5.70543C4.34815 15.2958 3.22558 14.2548 3.11332 12.9088L2.17447 1.78419L0.63349 1.51886C0.225285 1.44742 -0.0604738 1.04942 0.010962 0.641217C0.0823978 0.222808 0.480423 -0.0527293 0.898833 0.00850138L3.33273 0.375886C3.6797 0.438137 3.93483 0.72286 3.96544 1.06983L4.15934 3.35578C4.18996 3.68336 4.45531 3.92828 4.78187 3.92828H18.5639ZM12.3796 9.23392H15.2064C15.635 9.23392 15.9718 8.88694 15.9718 8.46853C15.9718 8.03992 15.635 7.70315 15.2064 7.70315H12.3796C11.951 7.70315 11.6142 8.03992 11.6142 8.46853C11.6142 8.88694 11.951 9.23392 12.3796 9.23392Z"
          fill="white"
        />
      </G>
      {showRedDot && (
        <Circle cx={width >=720 ? 19:20} cy={width >=720 ? 5:4} r={4}  fill="red" /> // Adjust the coordinates and size as needed
      )}
    </Svg>

  );

  const history = status ? (
    <Svg
      width={width >= 720 ? 60 : 42}
      height={width >= 720 ? 60 : 42}
      viewBox="0 0 39 39"
      fill="none"
      {...props}
    >
      <G id="Group 1000005782">
        <Rect id="Rectangle 102" width={39} height={39} rx={7} fill="white" />
        <Path
          id="Order History"
          d="M16.3152 22.3669H22.093C22.4805 21.6081 23.05 20.9572 23.7506 20.4724H16.3152C16.1896 20.4724 16.0691 20.4225 15.9803 20.3337C15.8915 20.2449 15.8416 20.1244 15.8416 19.9988C15.8416 19.8732 15.8915 19.7527 15.9803 19.6639C16.0691 19.5751 16.1896 19.5252 16.3152 19.5252H23.8927C24.0183 19.5252 24.1388 19.5751 24.2276 19.6639C24.3164 19.7527 24.3663 19.8732 24.3663 19.9988C24.3683 20.0338 24.3651 20.0689 24.3568 20.103C24.9209 19.8201 25.5299 19.6374 26.1565 19.5631C26.3478 19.5354 26.541 19.5227 26.7343 19.5252C26.8926 19.5249 27.0508 19.5344 27.2079 19.5536V13.3681C27.2079 12.74 26.9584 12.1377 26.5143 11.6936C26.0702 11.2495 25.4679 11 24.8399 11H15.368C14.74 11 14.1376 11.2495 13.6936 11.6936C13.2495 12.1377 13 12.74 13 13.3681V23.7878C13 24.4158 13.2495 25.0182 13.6936 25.4623C14.1376 25.9064 14.74 26.1559 15.368 26.1559H21.7236C21.6474 25.8796 21.5935 25.5977 21.5626 25.3128C21.5349 25.1215 21.5222 24.9283 21.5247 24.735C21.5231 24.2543 21.59 23.7759 21.7236 23.3141H16.3152C16.1896 23.3141 16.0691 23.2642 15.9803 23.1754C15.8915 23.0866 15.8416 22.9661 15.8416 22.8405C15.8416 22.7149 15.8915 22.5944 15.9803 22.5056C16.0691 22.4168 16.1896 22.3669 16.3152 22.3669ZM16.3152 13.8417H23.8927C24.0183 13.8417 24.1388 13.8916 24.2276 13.9804C24.3164 14.0693 24.3663 14.1897 24.3663 14.3153C24.3663 14.441 24.3164 14.5614 24.2276 14.6502C24.1388 14.7391 24.0183 14.789 23.8927 14.789H16.3152C16.1896 14.789 16.0691 14.7391 15.9803 14.6502C15.8915 14.5614 15.8416 14.441 15.8416 14.3153C15.8416 14.1897 15.8915 14.0693 15.9803 13.9804C16.0691 13.8916 16.1896 13.8417 16.3152 13.8417ZM16.3152 16.6835H23.8927C24.0183 16.6835 24.1388 16.7334 24.2276 16.8222C24.3164 16.911 24.3663 17.0315 24.3663 17.1571C24.3663 17.2827 24.3164 17.4032 24.2276 17.492C24.1388 17.5808 24.0183 17.6307 23.8927 17.6307H16.3152C16.1896 17.6307 16.0691 17.5808 15.9803 17.492C15.8915 17.4032 15.8416 17.2827 15.8416 17.1571C15.8416 17.0315 15.8915 16.911 15.9803 16.8222C16.0691 16.7334 16.1896 16.6835 16.3152 16.6835ZM27.2079 20.5008C26.8933 20.463 26.5753 20.463 26.2607 20.5008C25.2191 20.6173 24.2569 21.1135 23.558 21.8946C22.8591 22.6756 22.4724 23.6869 22.4719 24.735C22.4717 24.8933 22.4812 25.0515 22.5003 25.2086C22.5336 25.5322 22.6068 25.8503 22.7182 26.1559C22.9716 26.8741 23.4128 27.5112 23.9959 28.0011C24.579 28.491 25.2826 28.8157 26.0337 28.9415C26.7848 29.0672 27.5559 28.9895 28.2667 28.7163C28.9776 28.4431 29.6022 27.9844 30.0758 27.3879C30.5493 26.7915 30.8544 26.0791 30.9593 25.3247C31.0643 24.5704 30.9652 23.8018 30.6724 23.0987C30.3797 22.3957 29.9039 21.7839 29.2946 21.327C28.6853 20.8701 27.9648 20.5849 27.2079 20.5008ZM27.2079 24.735C27.2079 24.8606 27.158 24.9811 27.0692 25.0699C26.9804 25.1587 26.8599 25.2086 26.7343 25.2086H25.3609C25.2353 25.2086 25.1148 25.1587 25.026 25.0699C24.9372 24.9811 24.8873 24.8606 24.8873 24.735C24.8873 24.6094 24.9372 24.4889 25.026 24.4001C25.1148 24.3113 25.2353 24.2614 25.3609 24.2614H26.2607V22.8405C26.2607 22.7149 26.3106 22.5944 26.3994 22.5056C26.4882 22.4168 26.6087 22.3669 26.7343 22.3669C26.8599 22.3669 26.9804 22.4168 27.0692 22.5056C27.158 22.5944 27.2079 22.7149 27.2079 22.8405V24.735Z"
          fill="#212121"
        />
      </G>
    </Svg>
  ) : (
    <Svg
      width={width >= 720 ? 40 : 25}
      height={width >= 720 ? 40 : 25}
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M4.05188 13.8929H11.1137C11.5873 12.9655 12.2834 12.1699 13.1397 11.5774H4.05188C3.89836 11.5774 3.75113 11.5164 3.64258 11.4079C3.53402 11.2993 3.47304 11.1521 3.47304 10.9985C3.47304 10.845 3.53402 10.6978 3.64258 10.5892C3.75113 10.4807 3.89836 10.4197 4.05188 10.4197H13.3133C13.4668 10.4197 13.6141 10.4807 13.7226 10.5892C13.8312 10.6978 13.8922 10.845 13.8922 10.9985C13.8946 11.0413 13.8907 11.0842 13.8806 11.1259C14.57 10.7801 15.3143 10.5568 16.0802 10.466C16.314 10.4321 16.5501 10.4166 16.7864 10.4197C16.9798 10.4193 17.1731 10.4309 17.3652 10.4544V2.89435C17.3652 2.12672 17.0603 1.39053 16.5175 0.847736C15.9747 0.30494 15.2386 0 14.471 0H2.8942C2.12661 0 1.39046 0.30494 0.847691 0.847736C0.304924 1.39053 0 2.12672 0 2.89435V15.6295C0 16.3971 0.304924 17.1333 0.847691 17.6761C1.39046 18.2189 2.12661 18.5238 2.8942 18.5238H10.6622C10.569 18.1862 10.5032 17.8417 10.4654 17.4935C10.4316 17.2596 10.4161 17.0235 10.4191 16.7872C10.4171 16.1997 10.4989 15.615 10.6622 15.0506H4.05188C3.89836 15.0506 3.75113 14.9896 3.64258 14.8811C3.53402 14.7725 3.47304 14.6253 3.47304 14.4718C3.47304 14.3182 3.53402 14.171 3.64258 14.0624C3.75113 13.9539 3.89836 13.8929 4.05188 13.8929ZM4.05188 3.47322H13.3133C13.4668 3.47322 13.6141 3.53421 13.7226 3.64277C13.8312 3.75133 13.8922 3.89857 13.8922 4.05209C13.8922 4.20562 13.8312 4.35286 13.7226 4.46141C13.6141 4.56997 13.4668 4.63096 13.3133 4.63096H4.05188C3.89836 4.63096 3.75113 4.56997 3.64258 4.46141C3.53402 4.35286 3.47304 4.20562 3.47304 4.05209C3.47304 3.89857 3.53402 3.75133 3.64258 3.64277C3.75113 3.53421 3.89836 3.47322 4.05188 3.47322ZM4.05188 6.94644H13.3133C13.4668 6.94644 13.6141 7.00743 13.7226 7.11599C13.8312 7.22455 13.8922 7.37179 13.8922 7.52531C13.8922 7.67884 13.8312 7.82608 13.7226 7.93464C13.6141 8.0432 13.4668 8.10418 13.3133 8.10418H4.05188C3.89836 8.10418 3.75113 8.0432 3.64258 7.93464C3.53402 7.82608 3.47304 7.67884 3.47304 7.52531C3.47304 7.37179 3.53402 7.22455 3.64258 7.11599C3.75113 7.00743 3.89836 6.94644 4.05188 6.94644ZM17.3652 11.6121C16.9807 11.5658 16.592 11.5658 16.2075 11.6121C14.9344 11.7545 13.7584 12.3609 12.9042 13.3156C12.05 14.2702 11.5774 15.5062 11.5768 16.7872C11.5765 16.9807 11.5881 17.174 11.6115 17.3661C11.6522 17.7615 11.7416 18.1504 11.8778 18.5238C12.1875 19.4016 12.7268 20.1804 13.4394 20.7791C14.1521 21.3779 15.0121 21.7747 15.9301 21.9285C16.8481 22.0822 17.7905 21.9871 18.6593 21.6532C19.5281 21.3193 20.2916 20.7587 20.8704 20.0297C21.4492 19.3007 21.8221 18.43 21.9503 17.508C22.0786 16.5861 21.9575 15.6466 21.5997 14.7873C21.2418 13.928 20.6603 13.1803 19.9157 12.6219C19.171 12.0635 18.2903 11.7148 17.3652 11.6121ZM17.3652 16.7872C17.3652 16.9408 17.3042 17.088 17.1957 17.1966C17.0871 17.3051 16.9399 17.3661 16.7864 17.3661H15.1077C14.9542 17.3661 14.807 17.3051 14.6984 17.1966C14.5899 17.088 14.5289 16.9408 14.5289 16.7872C14.5289 16.6337 14.5899 16.4865 14.6984 16.3779C14.807 16.2694 14.9542 16.2084 15.1077 16.2084H16.2075V14.4718C16.2075 14.3182 16.2685 14.171 16.377 14.0624C16.4856 13.9539 16.6328 13.8929 16.7864 13.8929C16.9399 13.8929 17.0871 13.9539 17.1957 14.0624C17.3042 14.171 17.3652 14.3182 17.3652 14.4718V16.7872Z"
        fill="white"
      />
    </Svg>
  );

  const notification = status ? (
    <Svg
      width={width >= 720 ? 60 : 42}
      height={width >= 720 ? 60 : 42}
      viewBox="0 0 39 39"
      fill="none"
    >
      <Rect width={39} height={39} rx={7} fill="white" />
      <G>
        <Path
          d="M26.3554 19.6806C25.7109 18.9129 25.418 18.2476 25.418 17.1173V16.733C25.418 15.2601 25.0856 14.3111 24.3631 13.3621C23.2494 11.8883 21.3745 11 19.539 11H19.461C17.6642 11 15.848 11.8475 14.715 13.2615C13.9529 14.2295 13.582 15.2193 13.582 16.733V17.1173C13.582 18.2476 13.3084 18.9129 12.6446 19.6806C12.1561 20.2462 12 20.9731 12 21.7599C12 22.5476 12.2534 23.2936 12.7621 23.9C13.4259 24.6269 14.3634 25.0909 15.321 25.1716C16.7074 25.3329 18.0938 25.3937 19.5004 25.3937C20.9062 25.3937 22.2926 25.2921 23.6799 25.1716C24.6366 25.0909 25.5741 24.6269 26.2379 23.9C26.7457 23.2936 27 22.5476 27 21.7599C27 20.9731 26.8439 20.2462 26.3554 19.6806Z"
          fill="#212121"
        />
        <Path
          d="M21.2729 26.5057C20.8317 26.4096 18.144 26.4096 17.7028 26.5057C17.3258 26.5945 16.918 26.8011 16.918 27.2543C16.9399 27.6866 17.1881 28.0683 17.5318 28.3103L17.531 28.3112C17.9756 28.6646 18.4974 28.8895 19.0437 28.9702C19.3348 29.011 19.6312 29.0092 19.9329 28.9702C20.4784 28.8895 21.0002 28.6646 21.4448 28.3112L21.4439 28.3103C21.7877 28.0683 22.0358 27.6866 22.0578 27.2543C22.0578 26.8011 21.6499 26.5945 21.2729 26.5057Z"
          fill="#212121"
        />
      </G>
      {showRedDot && (
        <Circle cx={24} cy={10} r={4}  fill="red" /> // Adjust the coordinates and size as needed
      )}
    </Svg>
  ) : (
    <Svg
      width={width >= 720 ? 40 : 25}
      height={width >= 720 ? 40 : 25}
      viewBox="0 0 19 22"
      fill="none"
    >
      <Path
        d="M17.8962 10.6097C17.0926 9.67138 16.7275 8.85827 16.7275 7.47676V7.00703C16.7275 5.20681 16.3132 4.04691 15.4124 2.887C14.024 1.08567 11.6867 0 9.39847 0H9.30124C7.06123 0 4.79713 1.03582 3.38465 2.76404C2.43459 3.9472 1.97216 5.15696 1.97216 7.00703V7.47676C1.97216 8.85827 1.63105 9.67138 0.803537 10.6097C0.194586 11.301 0 12.1895 0 13.1511C0 14.1138 0.315916 15.0255 0.950056 15.7667C1.77757 16.6552 2.94631 17.2223 4.14012 17.321C5.86841 17.5181 7.59682 17.5924 9.35041 17.5924C11.1029 17.5924 12.8313 17.4683 14.5607 17.321C15.7534 17.2223 16.9221 16.6552 17.7497 15.7667C18.3827 15.0255 18.6997 14.1138 18.6997 13.1511C18.6997 12.1895 18.5051 11.301 17.8962 10.6097Z"
        fill="white"
      />
      <Path
        d="M11.5599 18.9514C11.0099 18.8339 7.65929 18.8339 7.1093 18.9514C6.63928 19.06 6.13086 19.3125 6.13086 19.8664C6.15825 20.3948 6.46768 20.8613 6.89612 21.1571L6.89513 21.1582C7.4493 21.5901 8.09983 21.8649 8.78094 21.9636C9.14383 22.0134 9.51331 22.0112 9.88939 21.9636C10.5694 21.8649 11.2199 21.5901 11.7742 21.1582L11.7731 21.1571C12.2017 20.8613 12.511 20.3948 12.5384 19.8664C12.5384 19.3125 12.03 19.06 11.5599 18.9514Z"
        fill="white"
      />
       {showRedDot && (
        <Circle cx={16} cy={4} r={4}  fill="red" /> // Adjust the coordinates and size as needed
      )}
    </Svg>
  );

  const profile = status ? (
    <Svg
      width={width >= 720 ? 60 : 42}
      height={width >= 720 ? 60 : 42}
      viewBox="0 0 39 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G id="Group_1000010300">
        <Rect id="Rectangle_102" width={39} height={39} rx={7} fill="white" />
        <G id="Group_1000005774">
          <Path
            id="Vector"
            d="M19.5 22.9922C14.6461 22.9922 10.5 23.7402 10.5 26.7323C10.5 29.7255 14.6202 30.4999 19.5 30.4999C24.354 30.4999 28.5 29.753 28.5 26.7598C28.5 23.7666 24.381 22.9922 19.5 22.9922Z"
            fill="#212121"
          />
          <Path
            id="Vector_2"
            d="M19.4997 20.1428C22.8062 20.1428 25.4554 17.5522 25.4554 14.3214C25.4554 11.0906 22.8062 8.5 19.4997 8.5C16.1943 8.5 13.5439 11.0906 13.5439 14.3214C13.5439 17.5522 16.1943 20.1428 19.4997 20.1428Z"
            fill="#212121"
          />
        </G>
      </G>
    </Svg>
  ) : (
    <Svg
      width={width >= 720 ? 40 : 25}
      height={width >= 720 ? 40 : 25}
      viewBox="0 0 18 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M9.00002 14.4922C4.14607 14.4922 0 15.2402 0 18.2323C0 21.2255 4.12018 21.9999 9.00002 21.9999C13.854 21.9999 18 21.253 18 18.2598C18 15.2666 13.881 14.4922 9.00002 14.4922Z"
        fill="white"
      />
      <Path
        d="M8.99971 11.6428C12.3062 11.6428 14.9554 9.05218 14.9554 5.82138C14.9554 2.59058 12.3062 0 8.99971 0C5.69434 0 3.04395 2.59058 3.04395 5.82138C3.04395 9.05218 5.69434 11.6428 8.99971 11.6428Z"
        fill="white"
      />
    </Svg>
  );

  let svgicone;
  if (val == "home") {
    svgicone = vector;
  } else if (val == "orderhistory") {
    svgicone = history;
  } else if (val == "cart") {
    svgicone = cart;
  } else if (val === "profile") {
    svgicone = profile;
  } else {
    svgicone = notification;
  }

  return svgicone;
};

export default Footersvg;
