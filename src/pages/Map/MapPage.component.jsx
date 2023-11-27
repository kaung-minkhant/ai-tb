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
   
    let Data;
    useEffect(() => {
        if(isSuccess){
            console.log("HEE");
            console.log(data);
            // Data = data.data.clinics
        }
      }, [isSuccess])

    return(

        <div className="map-page">
            <div className="top">
                <h1 className="title">Nearby Clinics</h1>
                <p1 className="desc">The nearby clinics that support, diagnose and cure pulmonary TB are listed below. Please match the location and click on each clinic to view more details.</p1>
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
                {
                    !isLoading?<Map Data={Data}/> : <h1>LOADING</h1>
                }
            </div>
        </div>
    )
}

export default MapPage;