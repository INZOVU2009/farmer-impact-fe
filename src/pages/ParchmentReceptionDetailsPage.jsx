import React, { useEffect, useState } from "react";
import { fetchReportById } from "../redux/actions/parchnment/reportById.action";
import { fetchReportLotById } from "../redux/actions/parchnment/reportLotById.action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllStation } from "../redux/actions/station/allStations.action";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

function ParchmentReceptionDetailsPage() {
  const id = useParams();
  const reportId = useParams().reportId;

  const dispatch = useDispatch();
  const [reportById, setReportById] = useState();
  const [reportLotById, setReportLotById] = useState(null);
  const { report } = useSelector((state) => state.fetchReportById);
  const { lot } = useSelector((state) => state.fetchReportLotById);
  const { allParchments } = useSelector((state) => state.allAssignedParchments);
  const [assignedParchments, setAssignedParchments] = useState();
  const { stations } = useSelector((state) => state.fetchAllStations);
  const [allStation, setAllStation] = useState([]);
  const { decodedToken } = useSelector((state) => state.fetchToken);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchReportById(id.reportId));
  }, [dispatch, id.reportId]);

  useEffect(() => {
    if (report) {
      setReportById(report.data);
    }
  }, [report]);

  useEffect(() => {
    dispatch(fetchReportLotById(reportId));
  }, [dispatch, reportId]);

  useEffect(() => {
    if (lot) {
      setReportLotById(lot.data);
    }
  }, [report]);

  useEffect(() => {
    dispatch(fetchAllStation());
  }, [dispatch]);

  useEffect(() => {
    if (stations) {
      setAllStation(stations.data);
    }
  }, [stations]);

  const getStationName = (_kf_Station) => {
    const station = allStation?.find(
      (station) => station.__kp_Station === _kf_Station
    );
    return station ? station.Name : null;
  };

  const getStationID = (_kf_Station) => {
    const station = allStation?.find(
      (station) => station.__kp_Station === _kf_Station
    );
    return station ? station.StationID : null;
  };
  const getCherrylotid = (parchment_id) => {
    const parchment = assignedParchments?.find(
      (parchment) => parchment.parchment_id === parchment_id
    );
    return parchment ? parchment.cherry_lot_id : null;
  };

  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "white",
    },
    table: {
      border: "1px solid black",
      width: "150%",
      marginBottom: 5,
    },
    headerCell: {
      backgroundColor: "#f2f2f2",
      padding: 2,
      fontWeight: "bold",
      fontSize: 10,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      width: 150,
    },
    bodyHeaderCell: {
      backgroundColor: "orange",
      padding: 2,
      fontWeight: "bold",
      fontSize: 10,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      width: 150,
      borderTop: "1px solid black",
    },
    bodyHeaderCellTotal: {
      backgroundColor: "orange",
      padding: 2,
      fontWeight: "bold",
      fontSize: 10,

      borderBottom: "1px solid black",
      width: 150,
    },
    cell: {
      padding: 2,
      borderRight: "1px solid black",
      borderBottom: "1px solid black",
      borderLeft: "1px solid black",

      fontSize: 10,
      width: 150,
    },
    Bodycell: {
      padding: 2,
      borderRight: "1px solid black",

      borderBottom: "1px solid black",
      fontSize: 10,
      width: 150,
    },
    viewer: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
  });

  return (
    <PDFViewer style={styles.viewer}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View></View>
          <View>
            <Text
              style={{
                fontSize: 20,
                marginLeft: 45,
                marginTop: 60,
                marginBottom: 40,
                fontWeight: "bold",
              }}
            >
              {" "}
              DIGITAL LOADING FORM{" "}
            </Text>

            <Text style={{ fontSize: 12, marginLeft: 25, fontWeight: "bold" }}>
              LOADING SUMMARY
            </Text>

            <View
              style={{
                border: "1px solid black",
                marginTop: 5,
                marginLeft: 25,
                marginRight: 25,
                marginBottom: 25,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerCell}>TALLY SHEET No.</Text>
                <Text style={styles.cell}>{reportById?.tally_sheet_no}</Text>
                <Text style={styles.headerCell}>TALLY SHEET No.</Text>
                <Text style={styles.cell}>{reportById?.tally_sheet_no}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerCell}> Delivery ID </Text>
                <Text style={styles.cell}>{reportById?.deliveryid}</Text>
                <Text style={styles.headerCell}> Receiving formid</Text>
                <Text style={styles.cell}>{reportById?.receiving_form_id}</Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerCell}> CWS Name </Text>
                <Text style={styles.cell}>
                  {getStationName(decodedToken?.staff._kf_Station)}
                </Text>
                <Text style={styles.headerCell}> CWS ID </Text>
                <Text style={styles.cell}>
                  {getStationID(decodedToken?.staff._kf_Station)}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerCell}> Bag type</Text>
                <Text style={styles.cell}>{reportById?.bag_type}</Text>
                <Text style={styles.headerCell}> Bags weight</Text>
                <Text style={styles.cell}>
                  {" "}
                  {reportById?.weight_received_bags}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerCell}> NUMBER.OF.BAGS</Text>
                <Text style={styles.cell}>{reportById?.bags}</Text>
                <Text style={styles.headerCell}> Total Received Bags. </Text>
                <Text style={styles.cell}>
                  {reportById?.total_bags_received}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerCell}>TOTAL.WEIGHT</Text>
                <Text style={styles.cell}>{reportById?.weight}</Text>
                <Text style={styles.headerCell}> Received Weight (Kgs):</Text>
                <Text style={styles.cell}>
                  {" "}
                  {reportById?.gross_weight_parch_received}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerCell}>Loading date </Text>
                <Text style={styles.cell}>{reportById?.loading_date}</Text>
                <Text style={styles.headerCell}> Expected Delivery date</Text>
                <Text style={styles.cell}>
                  {reportById?.expected_delivery_date}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.headerCell}> Moisture </Text>
                <Text style={styles.cell}>{reportById?.moisture}</Text>
                <Text style={styles.headerCell}> Received By: </Text>
                <Text style={styles.cell}>{reportById?.received_by}</Text>
              </View>
              {/* Add other rows similarly */}
            </View>

            {/* Second Table */}
            <View style={{ marginLeft: 25, marginRight: 25 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 12, marginBottom: 5 }}
              >
                LOADING DETAILS
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.bodyHeaderCell}>LOT NUMBER</Text>
                <Text style={styles.bodyHeaderCell}>CHERRY.LOT.ID</Text>
                <Text style={styles.bodyHeaderCell}>No.OF.BAGS</Text>
                <Text style={styles.bodyHeaderCell}>KGs LOADED</Text>
                <Text style={styles.bodyHeaderCell}>PARCH LEFT</Text>
                <Text style={styles.bodyHeaderCell}>BAGS LEFT</Text>

                {/* Add other header cells */}
              </View>
              {reportLotById?.map((parchment, index) => (
                <View key={index} style={{ flexDirection: "row" }}>
                  <Text style={styles.Bodycell}>{parchment.parch_lot_ID}</Text>
                  <Text style={styles.Bodycell}>
                    {" "}
                    {getCherrylotid(parchment.parch_lot_ID)}
                  </Text>
                  <Text style={styles.Bodycell}> {parchment.bags_loaded}</Text>
                  <Text style={styles.Bodycell}>{parchment.weight}</Text>
                  <Text style={styles.Bodycell}>
                    {" "}
                    {parchment.bags_of_parchment_left === 0 ? "No" : "Yes"}
                  </Text>
                  <Text style={styles.Bodycell}>
                    {parchment.bags_of_parchment_left} bags
                  </Text>
                  {/* Add other cells */}
                </View>
              ))}
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <Text style={styles.bodyHeaderCellTotal}>TOTAL</Text>
                <Text style={styles.bodyHeaderCellTotal}></Text>
                <Text style={styles.bodyHeaderCellTotal}>
                  {reportById?.bags}
                </Text>
                <Text style={styles.bodyHeaderCellTotal}>
                  {reportById?.weight}
                </Text>
                <Text style={styles.bodyHeaderCellTotal}></Text>
                <Text style={styles.bodyHeaderCellTotal}></Text>

                {/* Add other header cells */}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default ParchmentReceptionDetailsPage;
