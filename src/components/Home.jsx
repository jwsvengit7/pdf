// Home.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import location from "../assets/location-share.png";
import printer from "../assets/printer.png";
import jsPDF from "jspdf";
import LineChart from "./Graph";

function Home() {
  const [load, setLoad] = useState(false);
  const [crimeData, setCrimeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"
        );
        setCrimeData(response.data);
        console.log(crimeData);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [crimeData]);

  const save = () => {
    setLoad(true);
  };

  const openPdf = async () => {
    try {
      const graphElement = document.getElementById("chart-container");

      if (graphElement) {
        setTimeout(async () => {
          const canvas = await html2canvas(graphElement);

          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("portrait");
          pdf.addImage(imgData, "PNG", 10, 10, 200, 100);
          pdf.save("crime_data.pdf");
        }, 100);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      {!load ? (
        <button className="print" onClick={save}>
          <img src={printer} width={20} alt="" />
          Print
        </button>
      ) : (
        <button className="print" onClick={openPdf}>
          Download PDF Here
        </button>
      )}
      {load ? (
        <div id="chart-container">
          <div className="background">
            <button>Only Focus on crime Graph</button>
          </div>
          <div className="background">
            <button>Only Focus on crime Graph</button>
          </div>
          <div className="background">
            <button>Only Focus on crime Graph</button>
          </div>
          <div className="crime">
            <div className="crime-tim">
              <img src={location} alt="" width={20} />
              <span>Crime</span>
            </div>
            <div className="line"></div>
          </div>
          <LineChart crimeData={crimeData} /> {/* Pass crimeData as a prop */}
          <footer className="footer">
            <p>Report Genereted on September 26, 2023</p>
            <p>RealAssist Property Report | Page 1 of 25</p>
          </footer>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
