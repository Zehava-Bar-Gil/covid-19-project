const proxy = 'https://api.codetabs.com/v1/proxy/?quest';

let world = {};
let rightRegion = 'World';
const cases_btn = document.querySelector('.cases_btn')
const continents_btn = document.querySelector('.continents_btn')
let choose = document.querySelector('#toChoose');
const CountyBtn = document.querySelector('choose.-btn');


const simplifiedFetch = async url => {
    const response = await fetch(url)
    const jsonData = await response.json()
    return jsonData.data
}


const fetchCountryStats = async () => {
    const latest_data = await simplifiedFetch(`https://corona-api.com/countries`)
    console.log('latest_data', latest_data)
    let coronaArr = latest_data.map(country => countryInfo(country))
   
    return coronaArr;
}

function countryInfo(country){
return {
    confirmed : country.latest_data.confirmed,
    critical : country.latest_data.critical, 
    deaths : country.latest_data.deaths,
    recovered : country.latest_data.recovered,
    name :  country.name,
    todayConfirmed : country.today.confirmed,
    todayDeaths: country.today.deaths
}
}

const coronaArr = fetchCountryStats();

const fetchContinetStats = async () => {


}

const fetchContinents = async () => {
    const url = 'https://restcountries.herokuapp.com/api/v1'
    const response = await fetch(`${proxy}=${url}`);
    const countriesArray = await response.json()
    // const countriesArray = jsonData
    console.log(countriesArray);
    const continents = countriesArray.map(country => country.region)
    const uniqueContintinents = Array.from(new Set(continents))
    console.log('uniqueContintinents', uniqueContintinents)
    return countriesArray;
}
fetchContinents()

async function getRegion(region){
    let regionA =(await fetchContinents());
    let arr=[];
    regionA.forEach((x)=>{
        if(x.region==region){
            arr.push(x.name.common);
        }
    })
    xlabels = arr;
    getChart();
    return arr;
}


async function keyInfo (regionA, key){
    let corona = await fetchCountryStats();
    let coronaKey = corona.map ((x)=> {return x [key]});
    console.log('coronaKey', coronaKey)
    let infoA = [];
    for (let i=0 ; i<regionA.length; i++){
        for (let k=0; k<corona.length; k++){
            if(regionA[i]==corona[k].name){
                infoA[i]=coronaKey[k];  
            }

        }
    }
    console.log(infoA);
    return infoA;
}

function changeOp (data){
    let op1 = document.creatE ("option");
    op1.text = 'Choose country';
    select.add(op1);
    op1.setAttribute('disabled', 'true');
    for(let i=0; i<data.length; i++){
        let option = document.creatE("option");
        option.text = data[i];
        select.add(option);
    }
}


// async function upDate(continentStr, keyInfoStr, labelStr ){
//     xlabels = await getRegion (continentStr);
//     ylabels = await keyInfo (xlabels, keyInfoStr);
//     label = labelStr;
//     select.innerHTML = '';
//     myChart.innerHTML = '';
//     changeOp(xlabels);
//     getChart();
// }


const ctx = document.getElementById('myChart').getContext('2d');

ctx.canvas.parentNode.style.width = "90vw";
ctx.canvas.parentNode.style.height = "90vh";
let xlabels = [];
let ylabels = [];
function getChart() {
const chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: xlabels,
        datasets: [{
            label: 'Covid 19',
            backgroundColor: 'rgb(127, 255, 212)',
            borderColor: 'rgb(240, 248, 255)',
            data: ylabels
        }]
    },

    // Configuration options go here
    options: {}
});

}


let continents;
continents_btn.addEventListener ('click', async(e)=>{
continent=e.target.getAttribute("id");
document.querySelector('.cases_btn').style = 'display: inline-block;'
switch(continent){
    case("asia"): 
    xlabels = await getRegion ('Asia');
    ylabels = await keyInfo (xlabels, 'confirmed');
    break;
    case("europe"):
    xlabels = await getRegion ('Europe');
    ylabels = await keyInfo (xlabels, 'confirmed');
    break;
    case("africa"):
    xlabels = await getRegion ('Africa');
    ylabels = await keyInfo (xlabels, 'confirmed');
    break;
    case("americas"):
    xlabels = await getRegion ('Americas');
    ylabels = await keyInfo (xlabels, 'confirmed');
    break;
    case("world"):
    xlabels = await getRegion ('World');
    ylabels = await keyInfo (xlabels, 'confirmed');
    break;
    
}
getChart();
})

let cases;
cases_btn.addEventListener ('click', async(e)=>{
let casesb=e.target.getAttribute("id");
    switch(casesb){
        case("confirmed"): 
        ylabels = await keyInfo (xlabels, 'confirmed');
        break;
        case("deaths"):
        ylabels = await keyInfo (xlabels, 'deaths');
        break;
        case("recovered"):
        ylabels = await keyInfo (xlabels, 'recovered');
        break;
        case("critical"):
        ylabels = await keyInfo (xlabels, 'critical');
        break;
default:
break;
}
getChart();
});

