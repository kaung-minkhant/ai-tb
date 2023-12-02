import "./Dashboard.style.css"
import { useMediaQuery } from "@uidotdev/usehooks"

import BarChart from "../../components/BarChart/BarChart.component"

const DashboardPage = () =>{
    const isMobile = useMediaQuery("only screen and (max-width : 650px)");
    return(
        <div className="dash-page">
            <div className="dash-page-column">
                <BarChart/>
            </div>
            <div className="dash-page-column">
                <h1>LEE</h1>
            </div>
        </div>
    )
}

export default DashboardPage;