import React from 'react'
import "./App.css"
import { ExportCSV } from './ExportCSV'; //library
import { excelData } from "./Table";

function GenerateExcel({ pageValue }) {
    var len = excelData.length;
    for (let i = pageValue; i < len; i++) {
        excelData.pop();
    }
    return (
        <div className="generateExcel">
            <ExportCSV csvData={excelData} fileName={"Generated Excel Sheet - Hareesh"} />
        </div>
    )
}

export default GenerateExcel
