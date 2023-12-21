import React, {useEffect, useState} from "react";
import {Document, Page, Text, View, PDFViewer, StyleSheet, Font} from "@react-pdf/renderer";
import {useLocation} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import Sidebar from "../Sidebar";

Font.register({family: "Sarabun700", src: "http://fonts.gstatic.com/s/sarabun/v13/DtVmJx26TKEr37c9YK5sulwm6gDXvwE.ttf"});
Font.register({family: "Sarabun", src: "http://fonts.gstatic.com/s/sarabun/v13/DtVmJx26TKEr37c9YOZqulwm6gDXvwE.ttf"});
const styles = StyleSheet.create({
  text: {
    fontSize: "10px",
    fontFamily: "Sarabun",
    marginLeft: "4px",
  },
  textBold: {
    fontSize: "10px",
    fontFamily: "Sarabun700",
    marginRight: "4px",
    marginLeft: "4px",
  },
  textName: {
    marginLeft: "4px",
    fontSize: "13px",
    fontFamily: "Sarabun700",
  },
  outBorder: {
    border: "1px solid black",
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  border1: {
    borderRight: "1px solid black",
    paddingRight: "4px",
    width: "25%",
  },
  border2: {
    borderRight: "1px solid black",
    paddingRight: "4px",
    width: "55%",
  },
  pageGap: {
    padding: "8px",
  },
  tableHead: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    marginTop: "8px",
  },
  textHead: {
    fontSize: "10px",
    fontFamily: "Sarabun",
  },
  tableContent: {
    display: "flex",
    flexDirection: "row",
    marginTop: "4px",
  },
  textSr: {
    width: "5%",
    fontSize: "10px",
    fontFamily: "Sarabun",
    textAlign: "left",
    paddingRight: "4px",
    // backgroundColor: 'yellow'
  },
  textProd: {
    width: "30%",
    fontSize: "10px",
    fontFamily: "Sarabun",
    textAlign: "left",
    paddingRight: "4px",
    // backgroundColor: 'blue'
  },
  textHSN: {
    width: "15%",
    fontSize: "10px",
    fontFamily: "Sarabun",
    textAlign: "left",
    paddingRight: "4px",
    // backgroundColor: 'green'
  },
  textTax: {
    width: "8%",
    fontSize: "10px",
    fontFamily: "Sarabun",
    textAlign: "left",
    paddingRight: "4px",
    // backgroundColor: 'pink'
  },
  textQty: {
    width: "8%",
    fontSize: "10px",
    fontFamily: "Sarabun",
    textAlign: "left",
    paddingRight: "4px",
    // backgroundColor: 'green'
  },
  textUnit: {
    width: "8%",
    fontSize: "10px",
    fontFamily: "Sarabun",
    textAlign: "left",
    paddingRight: "4px",
    // backgroundColor: 'brown'
  },
  textRate: {
    width: "10%",
    fontSize: "10px",
    fontFamily: "Sarabun",
    textAlign: "left",
    paddingRight: "4px",
    // backgroundColor: 'green'
  },
  textAmount: {
    fontSize: "10px",
    fontFamily: "Sarabun",
    textAlign: "left",
    paddingRight: "4px",
  },
  billBottom: {
    display: "flex",
    flexDirection: "row",
    border: "1px solid black",
    marginLeft: "8px",
    width: "100%",
    height: "80px",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  bankText: {
    fontSize: "10px",
    fontFamily: "Sarabun",
    marginBottom: "4px",
    marginLeft: "4px",
  },
  gstTable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  billBottomSec1: {
    width: "75%",
    justifyContent: "flex-end",
  },
  billBottomSec2: {
    width: "25%",
    borderLeft: "1px solid black",
  },
  gst: {
    width: "100%",
    marginTop: "16px",
    marginLeft: "8px",
    border: "1px solid black",
  },
  lowerHalf: {
    position: "absolute",
    bottom: "8px",
    width: "100%",
  },
  tableBottom: {
    backgroundColor: "#EFEFEF",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "16px",
    paddingLeft: "4px",
    paddingRight: "8px",
  },
  textGross: {
    fontSize: "10px",
    textAlign: "right",
    fontFamily: "Sarabun700",
    marginLeft: "8px",
    marginRight: "4px",
  },
  tableFooter: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#EFEFEF",
    marginTop: "8px",
  },
  textTable: {
    fontSize: "10px",
    fontFamily: "Sarabun",
    textAlign: "center",
    width: "25%",
  },
});

const Printpdf = () => {
  const [companyData, setCompanyData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const token = Cookies.get("JWT_token");
  const decode = jwtDecode(token);
  const location = useLocation();
  const {purchaseData, itemData} = location.state;

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/get/${decode.companyId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const customerResp = await axios.get(`http://localhost:4000/c/get/${purchaseData.customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const compData = response.data.info;
        const custData = customerResp.data.info;
        setCompanyData(compData);
        setCustomerData(custData);
        console.log("customer", custData);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchCompanyData();
  }, []);
  if (companyData.length === 0) {
    return <div>Loading...</div>;
  }

  function amountExGst(total, tax) {
    const value = (total * tax) / (tax + 100);
    return total - value;
  }
  function gst(total, tax) {
    const value = (total * tax) / (tax + 100);
    return value;
  }
  function gstAmount(total, tax) {
    const t = tax / 2;
    const value = (total * t) / 100;
    return value;
  }

  return (
    <>
      <Sidebar />
      <div className="flex-grow ml-64 mt-0">
        <PDFViewer style={{width: "100%", height: "100vh"}}>
          <Document>
            <Page
              size="A5"
              orientation="landscape"
              style={styles.pageGap}>
              <View style={styles.outBorder}>
                <View style={styles.border1}>
                  <Text style={styles.textName}>{companyData[0].companyName}</Text>
                  <Text style={styles.text}>{companyData[0].companyAddress}</Text>
                  <Text style={styles.text}>Phone: {companyData[0].companyMobile}</Text>
                  <Text style={styles.text}>GST No:{companyData[0].companyGSTIN}</Text>
                  <Text style={styles.text}>PAN No:{companyData[0].companyGSTIN.substring(2, 11)}</Text>
                </View>
                <View style={styles.border2}>
                  <View style={{display: "flex", flexDirection: "row"}}>
                    <Text style={styles.textBold}>Bill To:</Text>
                    <Text style={styles.text}>{customerData[0].customerName}</Text>
                  </View>
                  <Text style={styles.text}>{customerData[0].customerAddress}</Text>
                  <Text style={styles.text}>{customerData[0].customerMobile}</Text>
                  <Text style={styles.text}>GST No: {customerData[0].customerGSTIN}</Text>
                  <Text style={styles.text}>PAN No: {customerData[0].customerGSTIN.substring(2, 11)}</Text>
                </View>
                <View>
                  <Text style={styles.text}>Pay Mode: {purchaseData.paymentMode} </Text>
                  <Text style={styles.text}>Bill No: </Text>
                  <Text style={styles.text}>Date: 20/02/2023</Text>
                </View>
              </View>
              <View>
                <View style={styles.tableHead}>
                  <Text style={styles.textSr}>Sr.</Text>
                  <Text style={styles.textProd}>Products</Text>
                  <Text style={styles.textHSN}>HSN/SAC</Text>
                  <Text style={styles.textTax}>Tax</Text>
                  <Text style={styles.textQty}>Qty</Text>
                  <Text style={styles.textUnit}>Unit</Text>
                  <Text style={styles.textRate}>Rate</Text>
                  <Text style={styles.textAmount}>Amount Ex-Gst</Text>
                </View>
                {itemData.map((item, index) => (
                  <View
                    key={index}
                    style={styles.tableContent}>
                    <Text style={styles.textSr}>{index + 1}.</Text>
                    <Text style={styles.textProd}>{item.itemName}</Text>
                    <Text style={styles.textHSN}>{item.itemHSNcode}</Text>
                    <Text style={styles.textTax}>{item.tax}</Text>
                    <Text style={styles.textQty}>{item.quantity}</Text>
                    <Text style={styles.textUnit}>{item.unit}</Text>
                    <Text style={styles.textRate}>{item.rate}</Text>
                    <Text style={styles.textAmount}>{amountExGst(item.totalAmount, item.tax).toFixed(2)}</Text>
                  </View>
                ))}
                <View style={styles.tableFooter}>
                  <Text style={styles.textGross}>Qty: {purchaseData.totalPurchasedItem}</Text>
                  <Text style={styles.textGross}>Gross Amount: {purchaseData.purchaseGrossAmount}</Text>
                </View>
              </View>
              <View style={styles.lowerHalf}>
                <View style={styles.gst}>
                  <View style={styles.gstTable}>
                    <Text style={styles.textTable}>HSN Code</Text>
                    <Text style={styles.textTable}>Tax Amount</Text>
                    <Text style={styles.textTable}>CGST</Text>
                    <Text style={styles.textTable}>SGST</Text>
                  </View>

                  {itemData.map((item, index) => (
                    <View
                      key={index}
                      style={styles.gstTable}>
                      <Text style={styles.textTable}>{item.itemHSNcode}</Text>
                      <Text style={styles.textTable}>{gst(item.totalAmount, item.tax).toFixed(2)}</Text>
                      <Text style={styles.textTable}>{gstAmount(amountExGst(item.totalAmount, item.tax), item.tax).toFixed(2)}</Text>
                      <Text style={styles.textTable}>{gstAmount(amountExGst(item.totalAmount, item.tax), item.tax).toFixed(2)}</Text>
                    </View>
                  ))}
                  <View style={styles.tableBottom}>
                    <Text style={styles.text}>Total Tax: {(purchaseData.purchaseNetAmount - purchaseData.purchaseGrossAmount).toFixed(2)}</Text>
                    <Text style={styles.text}>CGST Amount: {purchaseData.purchaseCGSTAmount}</Text>
                    <Text style={styles.text}>SGST Amount: {purchaseData.purchaseSGSTAmount}</Text>
                    <Text style={styles.text}>Net Amount: {purchaseData.purchaseNetAmount}</Text>
                  </View>
                </View>
                <View style={styles.billBottom}>
                  <View style={styles.billBottomSec1}>
                    <View>
                      <View style={styles.section}>
                        <Text style={styles.bankText}>Bank Name: {companyData[0].companyBankName}</Text>
                        <Text style={styles.bankText}>Bank Account No: {companyData[0].companyBankAccount}</Text>
                      </View>
                      <View style={styles.section}>
                        <Text style={styles.bankText}>Bank IFSC Code:{companyData[0].companyBankIFSC}</Text>
                        <Text style={styles.bankText}>Bank Address:{companyData[0].companyBankAddress}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.billBottomSec2}>
                    <Text style={styles.textBold}>Net Amount: {purchaseData.purchaseNetAmount.toFixed(2)}</Text>
                  </View>
                </View>
              </View>
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </>
  );
};

export default Printpdf;
