import "./MapPage.style.css"
import { useMediaQuery } from "@uidotdev/usehooks"
import Map from "../../components/Map/Map.component";
import { useGetClinicsQuery } from '../../redux/Api/aiTbApi.slice'
import { useEffect, useState } from 'react'

export const MapPageLoader = () => {
    return null
  }

const MapPage = () =>{
    const isMobile = useMediaQuery("only screen and (max-width : 650px)");
    const {data, isLoading, isSuccess} = useGetClinicsQuery()
    const [Data, setData] = useState(null)
   
    useEffect(() => {
      if(isSuccess){
        setData(data.data.clinics)
      }
    }, [isLoading])
    return(

        <div className="map-page">
            <div className="top">
                <h1 className="title">Nearby Clinics</h1>
                <p className="desc">The nearby clinics that support, diagnose and cure pulmonary TB are listed below. Please match the location and click on each clinic to view more details.</p>
            </div>
            <div className="location">
                <select  className="dropdown" name="country" id="country">
                    <option value="myanmar">Myanmar</option>
                    <option value="thailand">Thailand</option>
                    <option value="china">China</option>
                    <option value="laos">Laos</option>
                </select>
                <select  className="dropdown" name="city" id="city">
                    <option value="yangon">Yangon</option>
                </select>
            </div>
            <div className="map" id="map">
              <Map Data={Data} />
            </div>
        </div>
    )
}

export default MapPage;