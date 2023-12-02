import "./Dashboard.style.css"
import { useMediaQuery } from "@uidotdev/usehooks"
import { useGetAllDataQuery } from '../../redux/Api/aiTbApi.slice'
import { useEffect, useState } from 'react'
import BarChart from "../../components/BarChart/BarChart.component"

const DashboardPage = () =>{
    const isMobile = useMediaQuery("only screen and (max-width : 650px)");
    const [allData, setAllData] = useState([])
    const {data, isLoading, isSuccess} = useGetAllDataQuery()
    const [ageDataArr, setAgeDataArr] = useState([])
    const [cityDataArr, setCityDataArr] = useState([])
    const [genderDataArr, setGenderDataArr] = useState([])
    const [drugDataArr, setDrugDataArr] = useState([])


    const ageLabelsArr = ['<9', '10-19', '20-29', '30-39', '40-49', '50-59', '>60'];
    const cityLabelsArr = ['yangon', 'mandalay', 'nay pyi taw']
    const genderLabelsArr = ['male', 'female']
    const drugLabelsArr = ['Normal','Drug Resistant']
    // let ageData;

    useEffect(() => {
        if (isSuccess) {
          setAllData(data.data);
          const ageData = getAgeDataArr(allData, ageLabelsArr);
          setAgeDataArr(ageData);
          const cityData = getCityDataArr(allData, cityLabelsArr);
            setCityDataArr(cityData);
            const genderData = getGendaDataArr(allData, genderLabelsArr);
            setGenderDataArr(genderData)
            const resistData = getDrugDataArr(allData,drugLabelsArr)
            setDrugDataArr(resistData)
        }
      }, [isSuccess, allData]);

    // console.log('allData',allData)
    // console.log('ageData', ageDataArr)
    function getAgeDataArr (data, ageRanges) {
        let countArray = Array(ageRanges.length).fill(0);
        data.forEach((item) => {
            const age = item.age;
            if (!age ||  (item.isPositive != true)) {return}
            // console.log('age', item.age)
            for (let i = 0; i < ageRanges.length; i++) {
                const range = ageRanges[i];
                let min; 
                let max;
                if (range == "<9"){
                    min = 0;
                    max = 9
                } else if (range==">60"){
                    min=60;
                    max = 200;
                } else {
                    [min, max] = range.split('-').map(Number);
                }
                
                if ((min === undefined || age >= min) && (max === undefined || age <= max)) {
                countArray[i]++;
                break;
                }
            }
            console.log(countArray)
        });
        console.log("age", countArray)
        return countArray
    }

    function getCityDataArr (data, cityRanges) {
        let countArray = Array(cityRanges.length).fill(0);
        data.forEach((item) => {
            console.log(item)
            const city = item.city;
            if (!city || (item.isPositive != true)) {return}
            // console.log('city', item.city)
            for (let i = 0; i < cityRanges.length; i++) {                
                if (city == cityRanges[i]){
                countArray[i]++;
                break;
                }
            }
            // console.log(countArray)
        });
        console.log("city", countArray)
        return countArray
    }

    function getGendaDataArr (data, genderRange) {
        let countArray = Array(genderRange.length).fill(0);
        data.forEach((item) => {
            const gender = item.gender;
            if (!gender || (item.isPositive != true)) {return}
            // console.log('gender', item.gender)
            for (let i = 0; i < genderRange.length; i++) {                
                if (gender == genderRange[i]){
                countArray[i]++;
                break;
                }
            }
            // console.log(countArray)
        });
        console.log("genda", countArray)
        return countArray
    }

    function getDrugDataArr (data, drugRange) {
        let countArray = Array(drugRange.length).fill(0);
        data.forEach((item) => {
            const isDrugResistance = item.isDrugResistance;
            // console.log('isDrugResistance', item.isDrugResistance)
            if (item.isPositive != true) {return}
            if (isDrugResistance){
                countArray[1]++
            } else {
                countArray[0]++
            }
            
            // console.log(countArray)
        });
        console.log("drug", countArray)
        return countArray
    }

    // console.log(getAgeDataArr(ageData, ['<9', '10-19', '20-29', '30-39', '40-49', '50-59', '>60']))

    return(
        <div className="dash-page">
            
            <div className="main-bar-container">
                <div>
                    <h1>ANALYSIS DASHBOARD</h1>
                    <h1 className="analysis-text">Updated on: { new Date(Date.now()).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} </h1>
                </div>
               
                <div className="analysis">
                   
                    <h1 className="analysis-text">Total TB positive patients: {drugDataArr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)}</h1>
                    <h1 className="analysis-text">Total drug-resistant TB patients: {drugDataArr[1]}</h1>
                    
                </div>
            </div>
            <div className="Grids">
                <div className="dash-page-column">
                    <div className="chart-container">
                        {
                            (ageDataArr.length > 0) && (
                                <BarChart title="Number of TB Patients by Age"
                                    labelsArr = {ageLabelsArr}
                                    xLegend = "Number of TB Patients by Age"
                                    dataArr = {ageDataArr}
                                    bC = 'rgba(0, 92, 255, 1)'
                                    bW = {10}
                                    />
                            ) 
                        }
                        
                    </div>
                    <div className="chart-container">
                        {
                            (genderDataArr.length > 0) && (
                                <BarChart title="Number of TB Patients by Gender"
                                    labelsArr = {genderLabelsArr}
                                    xLegend = "Number of TB Patients by Gender"
                                    dataArr = {genderDataArr}
                                    bC = 'rgba(233, 228, 0 , 1)'
                                    bW = {50}
                                    />
                            ) 
                        }

                    </div>
                    
                </div>
                <div className="dash-page-column">
                    <div className="chart-container">
                        {
                            (ageDataArr.length > 0) && (
                                <BarChart title="Number of TB Patients by Drug Resistance"
                                    labelsArr = {drugLabelsArr}
                                    xLegend = "Number of TB Patients by Drug Resistance"
                                    dataArr = {drugDataArr}
                                    bC = 'rgba(255, 7, 97 , 1)'
                                    bW = {50}
                                    />
                            ) 
                        }
                        
                    </div>
                    <div className="chart-container">
                        {
                            (genderDataArr.length > 0) && (
                                <BarChart title="Number of TB Patients by City"
                                    labelsArr = {cityLabelsArr}
                                    xLegend = "Number of TB Patients by City"
                                    dataArr = {cityDataArr}
                                    bC = 'rgba(255, 131, 0  , 1)'
                                    bW = {60}
                                    />
                            ) 
                        }

                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default DashboardPage;