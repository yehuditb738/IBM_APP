import * as data from '../utils/data.json';
import React from 'react'
import GridFiltering from '../components/GridFiltering'

const columnWidth = 150;
const columns = [
    { field: 'date', headerName: 'date', width: columnWidth, type: 'date' },
    { field: '1. open', headerName: 'open', width: columnWidth, type: 'number' },
    { field: '2. high', headerName: 'high', width: columnWidth, type: 'number' },
    { field: '3. low', headerName: 'low', width: columnWidth, type: 'number' },
    { field: '4. close', headerName: 'close', width: columnWidth, type: 'number' },
    { field: '7. dividend amount', headerName: 'dividend amount', width: columnWidth, type: 'number' },
];
/* Arrange the json data in the array to display in the grid */
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
/* Function for calculating maximum value from buying and selling */
/**The calculation I made: First check when was the biggest difference between opening and closing and who was the highest price among them.
If the opening price was the highest among them it was worth buying that day.
But if the closing price was the highest of them it would have been worth selling that day */
const findMaxPrice = (param1, param2, param3) => {
    const max = arr.reduce(function (prev, current) {
        let prevopenPrice = parseFloat(prev[param1], 10);
        let prevclosePrice = parseFloat(prev[param2], 10);
        let currentopenPrice = parseFloat(current[param1], 10);
        let currentclosePrice = parseFloat(current[param2], 10);
        let prevdividend = parseFloat(prev[param3], 10);
        let currentdividend = parseFloat(current[param3], 10);
        return (prevdividend > currentdividend) && (prevopenPrice - prevclosePrice > currentopenPrice - currentclosePrice) ? prev : current

    }) //returns object
    return max;
}

const maximumProfitFromPurchase = findMaxPrice("1. open", "4. close", "7. dividend amount");
const maximumProfitFromBuying = findMaxPrice("4. close", "1. open", "7. dividend amount");

const HomePage = () => {
    return (
        <div>
            <GridFiltering data={arr} columns={columns} pageSize={20} />

            <div className="moreDetails">
                <span>More Details:</span>
                <div><span>Maximum Profit From Purchase is {parseFloat(maximumProfitFromPurchase["7. dividend amount"], 10)} On Date: {maximumProfitFromPurchase.date}</span></div>
                <div><span>Maximum Profit From Buying is {maximumProfitFromBuying["7. dividend amount"]} On Date: {maximumProfitFromBuying.date}</span></div>
                <div><span>Maximum Profit From Purchase is {parseFloat(maximumProfitFromPurchase["7. dividend amount"], 10)}</span></div>
                <div><span>Maximum Profit From Buying is {maximumProfitFromBuying["7. dividend amount"]}</span></div>
            </div>
        </div>

    )
}

export default HomePage
