import * as data from '../utils/data.json';
import React, { useState } from 'react'
import GridFiltering from '../components/GridFiltering'

const arr = []
const jsonData = data['Time Series (Daily)'];
Object.keys(jsonData).forEach(function (key, i) {
    jsonData[key].id = i;
    jsonData[key].date = key;
    let openPrice = parseFloat(jsonData[key]["1. open"], 10);
    let closePrice = parseFloat(jsonData[key]["4. close"], 10);
    jsonData[key]["7. dividend amount"] = Math.abs(openPrice - closePrice).toFixed(2);
    arr.push(jsonData[key]);
})

const findMaxPrice = (param1, param2) => {
    const max = arr.reduce(function (prev, current) {
        let prevopenPrice = parseFloat(prev[param1], 10);
        let prevclosePrice = parseFloat(prev[param2], 10);
        let currentopenPrice = parseFloat(current[param1], 10);
        let currentclosePrice = parseFloat(current[param2], 10);
        let prevdividend = parseFloat(prev["7. dividend amount"], 10);
        let currentdividend = parseFloat(current["7. dividend amount"], 10);
        return (prevdividend > currentdividend) && (prevopenPrice - prevclosePrice > currentopenPrice - currentclosePrice) ? prev : current

    }) //returns object
    return max;
}

const maximumProfitFromPurchase = findMaxPrice("1. open", "4. close");
const maximumProfitFromBuying = findMaxPrice("4. close", "1. open");

const HomePage = () => {
    return (
        <div>
            <GridFiltering data={arr} />
            <div style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: '20px', paddingInlineStart: 0 }}>
                <div><span>Maximum Profit From Purchase is {parseFloat(maximumProfitFromPurchase["7. dividend amount"], 10)} On Date: {maximumProfitFromPurchase.date}</span></div>
                <div><span>Maximum Profit From Buying is {maximumProfitFromBuying["7. dividend amount"]} On Date: {maximumProfitFromBuying.date}</span></div>
                <div><span>Maximum Profit From Purchase is {parseFloat(maximumProfitFromPurchase["7. dividend amount"], 10)}</span></div>
                <div><span>Maximum Profit From Buying is {maximumProfitFromBuying["7. dividend amount"]}</span></div>
            </div>
        </div>

    )
}

export default HomePage
