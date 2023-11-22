import "./MapPage.style.css"
import { useMediaQuery } from "@uidotdev/usehooks"
import Map from "../../components/Map/Map.component";

const MapPage = () =>{
    const isMobile = useMediaQuery("only screen and (max-width : 650px)");

    return(
        <div className="map-page">
            <div className="top">
                <h1 className="title">Nearby Clinics</h1>
                <p1 className="desc">The nearby clinics that support, diagnose and cure pulmonary TB are listed below. Please match the location and click on each clinic to view more details.</p1>
            </div>
            <div className="location">
                <select  className="dropdown" name="city" id="city">
                    <option value="yangon">Yangon</option>
                    <option value="manadalay">Manadalay</option>
                    <option value="kalaw">Kalaw</option>
                    <option value="hpa-an">Hpa-An</option>
                </select>
                <select  className="dropdown" name="country" id="country">
                    <option value="myanmar">Myanmar</option>
                    <option value="thailand">Thailand</option>
                    <option value="china">China</option>
                    <option value="laos">Laos</option>
                </select>
            </div>
            <div className="map" id="map">
                <Map/>
            </div>
        </div>
    )
}

export default MapPage;