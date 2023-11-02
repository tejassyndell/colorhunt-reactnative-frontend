import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import MenuBackArrow from "../../components/menubackarrow/menubackarrow";
import { useEffect, useLayoutEffect } from "react";
import React, { useState } from "react";
import { ThemeProvider, useRoute } from "@react-navigation/native";
import { Table, Row, Rows } from "react-native-table-component";
import Textarea from "react-native-textarea";
import { getSoArticleDetails, getcompleteoutwordDetails } from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import styles from "./styles";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import * as Location from "expo-location";
import Loader from "../../components/Loader/Loader";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

const OrderDetails = (props) => {
  const { navigation } = props;
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const route = useRoute();
  useEffect(() => {
    const loadCustomFont = async () => {
      try {
        await Font.loadAsync({
          Glory: require("../../../assets/Fonts/Glory.ttf"),
        });
        setIsFontLoaded(true);
      } catch (error) {
        console.error("Error loading custom font:", error);
      }
    };

    loadCustomFont();
  }, []);
  const {
    sonumber,
    CreatedDate,
    remarks,
    transport = null,
    gst = null,
    name = "",
    endyear = 0,
    startyear = 0,
    OutwardNumber = 0,
    outwardArticleId = [],
    OutwardNumberId = "",
  } = route.params;
  console.log(remarks, "{}{}{}{}{}{}{}{}");
  const [newPrint, setNewPrint] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const { width, height } = Dimensions.get("window");
  const [partydata, setpartydata] = useState();
  const [sodetails, setsodetials] = useState([]);
  const headerHeight =
    Platform.OS === "android"
      ? width >= 720
        ? 110
        : 80
      : height >= 844
      ? 110
      : 65;

  console.log(newPrint);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginTop: 2 }}>
          <MenuBackArrow
            onPress={() => {
              navigation.navigate("ordershistroy");
            }}
          />
        </View>
      ),
      headerTitle: () => (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            marginLeft: 14,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: width >= 720 ? 35 : 25,
              fontFamily: isFontLoaded ? "Glory" : undefined,
              fontWeight: "700",
              width: "100%",
            }}
          >
            Orders Details
          </Text>
        </View>
      ),
      headerRight: () => <View />,
      headerStyle: {
        height: headerHeight, // Increase the header height here
      },
    });
  }, []);
  const widthArr =
    width >= 720
      ? [40, 130, 150, 80, 250, 100, 100, 100]
      : [40, 130, 150, 80, 200, 90, 100, 100];

  // Calculate column-wise total
  const columnTotals = tableData
    ? tableData.tableData.reduce((totals, rowData) => {
        for (let i = 0; i < rowData.length; i++) {
          totals[i] = (totals[i] || 0) + parseFloat(rowData[i] || 0);
        }
        return totals;
      }, [])
    : "";

  const transformArticleSize = (articleSize) => {
    const sizes = JSON.parse(articleSize).map((size) => size.Name);
    return sizes.join(", ");
  };
  const transformSodetailsToTableData = (sodetails) => {
    return sodetails.map((item, index) => {
      // Parse ArticleSize JSON string to extract sizes

      const sizes =
        item.ArticleSize.length > 0
          ? JSON.parse(item.ArticleSize)
              .map((sizeObj) => sizeObj.Name)
              .join(", ")
          : "";

      // Parse ArticleColor JSON string to extract color names
      const colors =
        item.ArticleColor.length > 0
          ? JSON.parse(item.ArticleColor).map((colorObj) => colorObj.Name)
          : "";

      // Split OutwardNoPacks by commas and map to integers
      const outwardNoPacksArray = item.OutwardNoPacks.split(",").map((value) =>
        parseInt(value, 10)
      );

      // Calculate the total quantity from OutwardNoPacks
      const totalQuantity = outwardNoPacksArray.reduce(
        (accumulator, quantity) => accumulator + quantity,
        0
      );

      // Combine ArticleColor and OutwardNoPacks
      const colorPacksCombination = () => {
        const combinedTextArray = [];

        if (colors.length > 0) {
          colors.forEach((color, i) => {
            const textValue = `${color ? color : "--"}:${String(
              outwardNoPacksArray[i] || 0
            ).padStart(2, "0")}`;
            combinedTextArray.push(textValue);
          });
        } else {
          outwardNoPacksArray.forEach((nopack) => {
            const textValue = `--:${String(nopack || 0).padStart(2, "0")}`;
            combinedTextArray.push(textValue);
          });
        }

        const combinedText = combinedTextArray.join(",");
        return combinedText;
      };

      // Calculate the total amount for this item
      const totalAmount = item.ArticleRate * totalQuantity;
      const combinedText = "";
      return [
        (index + 1).toString(), // SN
        item.ArticleNumber,
        item.Title, // ARTICLE
        sizes, // SIZE's
        colorPacksCombination(), // COLOR:PACKS combination
        totalQuantity.toString(), // TOTAL QTY
        "₹" + item.ArticleRate + ".00", // RATE
        "₹" + totalAmount.toFixed(2), // AMOUNT
      ];
    });
  };

  const [tableData, setTableData] = useState({});
  const [totalval, setotalval] = useState(0);
  const [totalqty, settotalqty] = useState(0);
  const settotle = (sodetails) => {
    let totalRate = 0;

    sodetails.forEach((item) => {
      const outwardNoPacksArray = item.OutwardNoPacks.split(",").map((value) =>
        parseInt(value, 10)
      );
      const articleRate = parseInt(item.ArticleRate);

      // Calculate the total rate for this item based on quantities in OutwardNoPacks
      const itemTotalRate = outwardNoPacksArray.reduce(
        (accumulator, quantity) => {
          return accumulator + quantity * articleRate;
        },
        0
      );

      // Add the item's total rate to the overall total
      totalRate += itemTotalRate;
    });
    setotalval(totalRate);
  };
  const settotalqut = (sodetails) => {
    let totalOutwardNoPacks = 0;

    sodetails.forEach((item) => {
      const outwardNoPacksArray = item.OutwardNoPacks.split(",").map((value) =>
        parseInt(value, 10)
      );

      // Calculate the sum of quantities in OutwardNoPacks for this item
      const itemTotalOutwardNoPacks = outwardNoPacksArray.reduce(
        (accumulator, quantity) => {
          return accumulator + quantity;
        },
        0
      );

      // Add the item's total quantity to the overall total
      totalOutwardNoPacks += itemTotalOutwardNoPacks;
    });
    settotalqty(totalOutwardNoPacks);
  };
  const getgstamount = (val) => {
    console.log(typeof val);
    let gsttotal = val * 0.05;
    let totalamount = val + gsttotal;
    return parseInt(totalamount);
  };
  const orderdetils = async () => {
    let ptdata = await AsyncStorage.getItem("UserData");
    ptdata = JSON.parse(ptdata);
    if (ptdata !== null) {
      setpartydata(ptdata);
      console.log(ptdata, "[][][][[][][][][]=-gnfgdgf");
    } else {
      console.log("No data found");
    }

    const date = new Date(CreatedDate);

    // Format the Date object as desired
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 to month because it's zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Formatted date string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    const data = {
      sonumber: parseInt(sonumber),
      party_id: ptdata[0].Id,
      CreatedDate: formattedDateTime,
    };
    console.log(outwardArticleId.length, "OPOPOPOPOPOPO");

    if (outwardArticleId.length > 0) {
      let ptdata = await AsyncStorage.getItem("UserData");
      ptdata = await JSON.parse(ptdata);
      await getcompleteoutwordDetails({
        articlearray: outwardArticleId,
        OutwardNumberId: OutwardNumberId,
        PartyId: ptdata[0].Id,
      }).then((res) => {
        console.log(res.data, "(((((((((((((((");
        if (res.status === 200) {
          setTableData({
            tableHead: [
              "SN",
              "ARTICLE",
              "CATEGORY",
              "SIZES",
              "COLORWISE QTY IN PCS",
              "TOTAL QTY",
              "RATE",
              "AMOUNT",
            ],
            tableData: sodetails ? transformSodetailsToTableData(res.data) : [],
          });

          settotle(res.data);
          settotalqut(res.data);
          setsodetials(res.data);
          setIsLoading(false);
          // console.log(res.data);
        }
      });
    } else {
      console.log("jdjjdjdjjdjdjdjdjdjdjjdjdjdjddjdjdjj");
      await getSoArticleDetails(data).then((res) => {
        if (res.status === 200) {
          setTableData({
            tableHead: [
              "SN",
              "ARTICLE",
              "CATEGORY",
              "SIZES",
              "COLORWISE QTY IN PCS",
              "TOTAL QTY",
              "RATE",
              "AMOUNT",
            ],
            tableData: sodetails ? transformSodetailsToTableData(res.data) : [],
          });

          settotle(res.data);
          settotalqut(res.data);
          setsodetials(res.data);
          setIsLoading(false);

          // console.log(res.data);
        }
      });
    }
  };
  const calculateRowHeight = (rowData) => {
    // You can adjust this logic based on your data and requirements
    // For example, you can calculate the height based on the length of text in the row.
    const textLength = rowData.someField.length; // Adjust to the actual field in your data
    console.log(textLength * 40, "ksadksakndk");
    return textLength * 40; // Adjust the multiplier based on your desired row height calculation
  };

  useEffect(() => {
    orderdetils();
  }, []);
  useEffect(() => {
    console.log(sodetails);
  }, [sodetails]);
  const GSThtmltable = () => {
    if (partydata) {
      if (partydata[0].GSTType === "GST") {
        return ` 
        <tr>
          <td colspan="5" style="text-align: end; font-weight: bold"></td>
          <td colspan="1"></td>
          <td colspan="1">GST 5%</td>
          <td colspan="1">${`₹${parseInt(totalval * 0.05)}.00`}</td>
        </tr>
        <tr>
        <td colspan="5" style="text-align: end; font-weight: bold">TOTAL</td>
        <td colspan="1"></td>
        <td colspan="1"></td>
        <td colspan="1">${`₹${getgstamount(totalval)}.00`}</td>
    </tr>`;
      } else if (partydata[0].GSTType === "IGST") {
        return ` 
        <tr>
          <td colspan="5" style="text-align: end; font-weight: bold"></td>
          <td colspan="1"></td>
          <td colspan="1">SGST 2.5%</td>
          <td colspan="1">${`₹${parseInt(totalval * 0.025)}.00`}</td>
        </tr>
        <tr>
          <td colspan="5" style="text-align: end; font-weight: bold"></td>
          <td colspan="1"></td>
          <td colspan="1">CGST 2.5%</td>
          <td colspan="1">${`₹${parseInt(totalval * 0.025)}.00`}</td>
        </tr>
        <tr>
        <td colspan="5" style="text-align: end; font-weight: bold">TOTAL</td>
        <td colspan="1"></td>
        <td colspan="1"></td>
        <td colspan="1">${`₹${getgstamount(totalval)}.00`}</td>
    </tr>`;
      } else {
        return ""; // Return an empty string if no GSTType match
      }
    }
    return ""; // Return an empty string if partydata is empty
  };

  // Call GSThtmltable function to generate the HTML content
  const GSThtmlContent = GSThtmltable();
  const htmlTableData = tableData.tableData
    ? tableData.tableData.map((rowData) => {
        console.log(rowData[4]);
        return `
        <tr>
          <td colspan="1" style="text-transform: uppercase">${rowData[0]}</td>
          <td colspan="1" style="text-transform: uppercase">${rowData[1]}</td>
          <td colspan="1" style="text-transform: uppercase">${rowData[2]}</td>
          <td colspan="1" style="text-transform: uppercase">${rowData[3]}</td>
          <td colspan="1" style="text-transform: uppercase">${rowData[4]}</td>
          <td colspan="1" style="text-transform: uppercase">${rowData[5]}</td>
          <td colspan="1" style="text-transform: uppercase">${rowData[6]}</td>
          <td colspan="1" style="text-transform: uppercase">${rowData[7]}</td>
        </tr>
      `;
      })
    : [];

  const html = `
    <html>
    <body>
    <table border="1" cellspacing="0" cellpadding="10" width="100%">
        <tr>
            <td colspan="12" style="text-align: center; background-color: black; color: white;font-weight: bold">
                COLORHUNT
            </td>
        </tr>
        <tr>
            <td style="text-transform: uppercase" colspan="9">
                <strong>PARTY:</strong>${partydata ? partydata[0].Name : ""}
            </td>
            <td style="text-transform: uppercase" colspan="1">
                <strong>DATE:</strong>
            </td>
            <td style="text-transform: uppercase" colspan="2">${new Date(
              CreatedDate
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}</td>
        </tr>
        <tr>
            <td style="text-transform: uppercase" colspan="9">
                <strong>ADDRESS:</strong>${
                  partydata ? partydata[0].Address : "Address"
                }
            </td>
            <td style="text-transform: uppercase" colspan="1">
                <strong>SO NO:</strong>
            </td>
            <td style="text-transform: uppercase" colspan="2">
               ${`${name}${
                 OutwardNumber !== 0 ? OutwardNumber : sonumber
               }/${startyear}-${endyear}`}
            </td>
        </tr>
        <tr>
            <td style="text-transform: uppercase" colspan="12">
                <strong>TRANSPORT:</strong>${
                  transport !== null ? transport : "Transport"
                }
            </td>
        </tr>
        <tr>
            <td colspan="12"><strong>GST:</strong>${
              partydata
                ? partydata[0].GSTNumber !== null
                  ? partydata[0].GSTNumber
                  : "GST"
                : "GST"
            }</td>
        </tr>
    </table>
    <br />
    <br />
    <table border="1" cellspacing="0" cellpadding="10" width="100%">
        <tr>
            <td colspan="1" style="font-weight: bold">SN</td>
            <td colspan="1" style="font-weight: bold">ARTICLE</td>
            <td colspan="1" style="font-weight: bold">CATEGORY</td>
            <td colspan="1" style="font-weight: bold">SIZES</td>
            <td colspan="1" style="font-weight: bold">COLORWISE QTY IN PCS</td>
            <td colspan="1" style="font-weight: bold">TOTAL QTY</td>
            <td colspan="1" style="font-weight: bold">RATE</td>
            <td colspan="1" style="font-weight: bold">AMOUNT</td>
        </tr>
        ${htmlTableData.join("")}
        <tr>
            <td colspan="5" style="text-align: end; font-weight: bold">SUBTOTAL</td>
            <td colspan="1"></td>
            <td colspan="1"></td>
            <td colspan="1">${`₹${totalval}.00`}</td>
        </tr>
        ${GSThtmlContent}
    </table>
</body>
    </html>
  `;
  const generatePDF = async () => {
    try {
      if (Platform.OS === "android") {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
          console.error("Location permission not granted");
          return;
        }
      } else if (Platform.OS === "ios") {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== "granted") {
          console.error("Location permission not granted");
          return;
        }
      }

      // Generate PDF from HTML content
      const pdfFile = await printToFileAsync({ html: html, base64: false });

      // Share the generated PDF
      await shareAsync(pdfFile.uri);
    } catch (error) {
      console.error("Error generating and sharing PDF:", error);
    }
  };

  return (
    <>
      {isloading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFF",
          }}
        >
          <Loader />
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            paddingVertical: 10,
            backgroundColor: "#FFFFFF",
            height: "100%",
          }}
        >
          <>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 10,
                alignItems: "center",
                paddingEnd: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 8,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}
              ></TouchableOpacity>
              <Text
                style={{
                  color: "#808080",
                  fontSize: width >= 720 ? 25 : 20,
                  fontFamily: isFontLoaded ? "Glory" : undefined,
                  fontWeight: "700",
                }}
              >
                Date:{" "}
                <Text
                  style={{
                    color: "#000000",
                    fontSize: width >= 720 ? 25 : 20,
                    fontFamily: isFontLoaded ? "Glory" : undefined,
                    fontWeight: "700",
                  }}
                >
                  {new Date(CreatedDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </Text>
              </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            >
              <View style={{ paddingHorizontal: 20 }}>
                <View>
                  <Text
                    style={{
                      fontSize: width < 720 ? width * 0.04 : 24,
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      fontWeight: "500",
                      color: "#808080",
                    }}
                  >
                    Name:
                  </Text>
                </View>
                <View
                  style={{
                    height: width >= 720 ? 45 : 35,
                    width: "100%",
                    borderWidth: 2,
                    borderRadius: 6,
                    borderColor: "#000000",
                    paddingStart: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: width >= 720 ? 20 : 16,
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      color: "#000000",
                      fontWeight: "bold",
                    }}
                  >
                    {partydata ? partydata[0].Name : ""}
                  </Text>
                </View>

                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: width < 720 ? width * 0.04 : 24,
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      fontWeight: "500",
                      color: "#808080",
                    }}
                  >
                    Address:
                  </Text>
                </View>
                <View
                  style={{
                    textAlignVertical: "top",
                    height: width >= 720 ? 120 : 80,
                    padding: 5,
                    borderWidth: 2,
                    borderRadius: 6,
                    borderColor: "#000000",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Text
                    style={{
                      fontSize: width >= 720 ? 20 : 16,
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      fontWeight: "bold",
                      color: partydata ? "#000000" : "#00000080",
                    }}
                  >
                    {partydata
                      ? `${partydata[0].Address},${partydata[0].City} ${partydata[0].State} ${partydata[0].PinCode},`
                      : "Address"}
                    {/* {console.log(partydata, "skhvchgvsacjvsjdc hasvcjvsdc")} */}
                  </Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: "row" }}>
                  <View style={{ flex: 1.1 }}>
                    <Text
                      style={{
                        fontSize: width < 720 ? width * 0.04 : 24,
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                        fontWeight: "500",
                        color: "#808080",
                      }}
                    >
                      {OutwardNumber !== 0 ? "OutwardNumber" : "SoNumber:"}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontSize: width < 720 ? width * 0.04 : 24,
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                        fontWeight: "500",
                        color: "#808080",
                      }}
                    >
                      Transport:
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      height: width >= 720 ? 45 : 35,
                      width: "48%",
                      borderWidth: 2,
                      borderRadius: 6,
                      borderColor: "#000000",
                      paddingStart: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: width >= 720 ? 20 : 16,
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                        color: "#000000",
                        fontWeight: "bold",
                      }}
                      adjustsFontSizeToFit={true}
                      numberOfLines={1}
                    >{`${name}${
                      OutwardNumber !== 0 ? OutwardNumber : sonumber
                    }/${startyear}-${endyear}`}</Text>
                  </View>

                  <View
                    style={{
                      height: width >= 720 ? 45 : 35,
                      width: "48%",
                      borderWidth: 2,
                      borderRadius: 6,
                      borderColor: transport !== null ? "black" : "#808080",
                      paddingStart: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: width >= 720 ? 20 : 16,
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                        fontWeight: "bold",
                        color: transport !== null ? "black" : "#00000080",
                      }}
                    >
                      {transport !== null ? transport : "Transport"}
                    </Text>
                  </View>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: width < 720 ? width * 0.04 : 24,
                      fontFamily: isFontLoaded ? "Glory" : undefined,
                      fontWeight: "500",
                      color: "#808080",
                    }}
                  >
                    GST:
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "nowrap",
                  }}
                >
                  <View
                    style={{
                      height: width >= 720 ? 45 : 35,
                      width: "100%",
                      borderWidth: 2,
                      borderRadius: 6,
                      borderColor:
                        partydata.length > 0
                          ? partydata[0].GSTNumber !== null
                            ? "black"
                            : "#00000080"
                          : "#00000080",
                      paddingStart: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: width >= 720 ? 20 : 16,
                        fontFamily: isFontLoaded ? "Glory" : undefined,
                        fontWeight: "bold",
                        color:
                          partydata.length > 0
                            ? partydata[0].GSTNumber !== null
                              ? "black"
                              : "#00000080"
                            : "#00000080",
                      }}
                    >
                      {partydata.length > 0
                        ? partydata[0].GSTNumber !== null
                          ? partydata[0].GSTNumber
                          : "GST"
                        : "GST"}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <ScrollView
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="handled"
                  style={{
                    maxWidth: "100%",
                    backgroundColor: "#fff",
                    marginBottom: 280,
                    marginTop: 20,
                  }}
                >
                  <ScrollView horizontal={true} style={{ paddingVertical: 10 }}>
                    <View>
                      <View>
                        <Table
                          borderStyle={{
                            borderWidth: 2,
                            borderColor: "red",
                            backgroundColor: "red",
                          }}
                        >
                          {/* Fixed Header Row */}
                          <Row
                            data={tableData ? tableData.tableHead : ""}
                            textStyle={{
                              textAlign: "center",
                              fontWeight: "bold",
                              fontSize: width >= 720 ? 18 : 15,
                              fontFamily: isFontLoaded ? "Glory" : undefined,
                            }}
                            style={{
                              height: 60,
                              // Make sure the header row is displayed horizontally
                            }}
                            widthArr={widthArr}
                          />
                        </Table>
                      </View>
                      <View>
                        <Table
                          borderStyle={{
                            borderWidth: 1,
                            borderColor: "#000000",
                          }}
                        >
                          {/* Data Rows */}
                          <Rows
                            data={tableData ? tableData.tableData : ""}
                            textStyle={{
                              margin: 6,
                              textAlign: "center",
                              fontSize: width >= 720 ? 16 : 13,
                              fontFamily: isFontLoaded ? "Glory" : undefined,
                            }}
                            style={({ index }) => ({
                              height: calculateRowHeight(
                                tableData.tableData[index]
                              ), // Call a function to calculate row height based on content
                              width: "auto",
                            })}
                            widthArr={widthArr} // Apply column widths to the data rows
                          />
                        </Table>
                        {/* </ScrollView> */}

                        <ScrollView>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              height: 40,
                              borderColor: "#000000",
                              borderWidth: 1,
                              // borderTopWidth: 2,
                            }}
                          >
                            <Text style={styles.fastRowContent}>SUBTOTAL</Text>
                            <Text style={styles.secondCollam}>{totalqty}</Text>
                            <Text style={styles.thurdCollam}></Text>
                            <Text
                              style={{
                                width: 98,
                                textAlign: "center",
                                fontWeight: "bold",
                                paddingTop: width >= 720 ? 10 : 9,
                              }}
                            >
                              ₹{totalval}.00
                            </Text>
                          </View>
                        </ScrollView>
                        {partydata.length > 0 ? (
                          partydata[0].GSTType === "GST" ? (
                            <ScrollView>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  height: 40,
                                  borderColor: "#000000",
                                  borderWidth: 1,
                                  // borderTopWidth: 2,
                                }}
                              >
                                <Text style={styles.fastRowContent}></Text>
                                <Text style={styles.secondCollam}></Text>
                                <Text style={styles.collamGst}>GST 5%</Text>
                                <Text style={styles.collamGst5Per}>
                                  ₹{parseInt(totalval * 0.05)}.00
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  height: 40,
                                  borderColor: "#000000",
                                  borderWidth: 1,
                                  // borderTopWidth: 1,
                                }}
                              >
                                <Text style={styles.fastRowContent}>TOTAL</Text>
                                <Text style={styles.secondCollam}></Text>
                                <Text style={styles.thurdCollam}></Text>
                                <Text style={styles.collamGst5Per}>
                                  ₹{getgstamount(totalval)}.00
                                </Text>
                              </View>
                            </ScrollView>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                        {partydata.length > 0 ? (
                          partydata[0].GSTType === "IGST" ? (
                            <ScrollView>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  height: 40,
                                  borderColor: "#000000",
                                  borderWidth: 1,
                                }}
                              >
                                <Text
                                  style={{
                                    width: width >= 720 ? 650 : 600,
                                    borderRightWidth: 2,
                                    borderColor: "#000000",
                                    fontWeight: "bold",
                                    paddingLeft: 3,
                                    paddingTop: width >= 720 ? 10 : 9,
                                  }}
                                ></Text>
                                <Text
                                  style={{
                                    width: width >= 720 ? 100 : 90,
                                    borderRightWidth: 2,
                                    borderColor: "#000000",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    paddingTop: width >= 720 ? 10 : 9,
                                  }}
                                ></Text>
                                <Text
                                  style={{
                                    width: 100,
                                    borderRightWidth: 2,
                                    borderColor: "#000000",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    paddingTop: width >= 720 ? 10 : 9,
                                  }}
                                >
                                  SGST 2.5%
                                </Text>
                                <Text
                                  style={{
                                    width: 98,
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    paddingTop: width >= 720 ? 10 : 9,
                                  }}
                                >
                                  ₹{parseInt(totalval * 0.025)}.00
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  height: 40,
                                  borderColor: "#000000",
                                  borderWidth: 1,
                                }}
                              >
                                <Text
                                  style={{
                                    width: width >= 720 ? 650 : 600,
                                    borderRightWidth: 2,
                                    borderColor: "#000000",
                                    fontWeight: "bold",
                                    paddingLeft: 3,
                                    paddingTop: width >= 720 ? 10 : 9,
                                  }}
                                ></Text>
                                <Text
                                  style={{
                                    width: width >= 720 ? 100 : 90,
                                    borderRightWidth: 2,
                                    borderColor: "#000000",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    paddingTop: width >= 720 ? 10 : 9,
                                  }}
                                ></Text>
                                <Text
                                  style={{
                                    width: 100,
                                    borderRightWidth: 2,
                                    borderColor: "#000000",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    paddingTop: width >= 720 ? 10 : 9,
                                  }}
                                >
                                  CGST 2.5%
                                </Text>
                                <Text
                                  style={{
                                    width: 98,
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    paddingTop: width >= 720 ? 10 : 9,
                                  }}
                                >
                                  ₹{parseInt(totalval * 0.025)}.00
                                </Text>
                              </View>
                              <ScrollView>
                                <View
                                  style={{
                                    flex: 1,
                                    flexDirection: "row",
                                    height: 40,
                                    borderColor: "#000000",
                                    borderWidth: 1,
                                    // borderTopWidth: 1,
                                  }}
                                >
                                  <Text
                                    style={{
                                      width: width >= 720 ? 650 : 600,
                                      // borderRightWidth: 2,
                                      borderColor: "#000000",
                                      fontWeight: "bold",
                                      paddingLeft: 3,
                                      paddingTop: width >= 720 ? 10 : 9,
                                    }}
                                  >
                                    TOTAL
                                  </Text>
                                  <Text
                                    style={{
                                      width: width >= 720 ? 100 : 90,
                                      // borderRightWidth: 2,
                                      borderColor: "#000000",
                                      textAlign: "center",
                                      fontWeight: "bold",
                                      paddingTop: width >= 720 ? 10 : 9,
                                    }}
                                  ></Text>
                                  <Text
                                    style={{
                                      width: 100,
                                      borderRightWidth: 2,
                                      borderColor: "#000000",
                                    }}
                                  ></Text>
                                  <Text
                                    style={{
                                      width: 98,
                                      textAlign: "center",
                                      fontWeight: "bold",
                                      paddingTop: width >= 720 ? 10 : 9,
                                    }}
                                  >
                                    ₹{getgstamount(totalval)}.00
                                  </Text>
                                </View>
                              </ScrollView>
                            </ScrollView>
                          ) : (
                            ""
                          )
                        ) : (
                          ""
                        )}
                      </View>
                    </View>
                  </ScrollView>
                </ScrollView>
              </View>
            </View>

            <View>
              <TouchableOpacity
                onPress={generatePDF}
                style={{ alignItems: "flex-end", marginRight: 10 }}
              >
                <View
                  style={{
                    width: width >= 720 ? 70 : 50,
                    height: width >= 720 ? 70 : 50,
                    backgroundColor: "white",
                    borderRadius: 10,
                  }}
                >
                  <Image
                    source={require("../../../assets/PDFImage.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                      resizeMode: "contain",
                    }}
                  ></Image>
                </View>
              </TouchableOpacity>
            </View>
          </>
        </View>
      )}
    </>
  );
};

export default OrderDetails;
