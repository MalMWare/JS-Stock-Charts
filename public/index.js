async function main() {
    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=f3b6bc5a7774469f9e59c72d86883df4')
    let result = await response.json()
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //const { GME, MSFT, DIS, BNTX } = mockData;
    let {BNTX, DIS, GME, MSFT} = result
    const stocks = [GME, MSFT, DIS, BNTX];

    console.log(stocks)

    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'),{
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
                label: stock.meta.symbol,
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });
    
    new Chart(highestPriceChartCanvas.getContext('2d'),{
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets:[{
                label: "Highest Price",
                data: stocks.map(stock => Math.max(...stock.values.map(value => parseFloat(value.high)))),
                backgroundColor: ['rgba(61, 161, 61, 0.7)', 'rgba(209, 4, 25, 0.7)', 'rgba(18, 4, 209, 0.7)', 'rgba(166, 43, 158, 0.7)'],
                borderColor: ['rgba(61, 161, 61, 0.7)', 'rgba(209, 4, 25, 0.7)', 'rgba(18, 4, 209, 0.7)', 'rgba(166, 43, 158, 0.7)']
            }]
            }
        }
    );
}

main()