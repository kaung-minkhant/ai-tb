import "./Dashboard.style.css"
import { useMediaQuery } from "@uidotdev/usehooks"

const DashboardPage = () =>{
    const isMobile = useMediaQuery("only screen and (max-width : 650px)");
    return(
        <div className="dash-page">
            <div className="dash-page-column">

            </div>
            <div className="dash-page-column">
                
            </div>
        </div>
    )
}

export default DashboardPage;