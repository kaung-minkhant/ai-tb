import "./CallPage.style.css"
import { getUser } from "../../utils"
import { useLoaderData, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useMediaQuery } from "@uidotdev/usehooks"
import Contact from "../../components/Contact/Contact.component";

export const CallPageLoader = () => {
    return null
}

const CallPage = () =>{
   const isMobile = useMediaQuery("only screen and (max-width : 650px)");
   return (
    <div className="call-page">
        {
            isMobile?(
                <div className="call-page-column">
                    <Contact title="Your Contacts"/>
                </div>
            ) : (
                <>
                <div className="call-page-column">
                    <Contact title="Your Contacts"/>
                </div>
                <div className="call-page-column">
                    <Contact title="Call Log"/>
                </div>
                </>
            )
        } 
    </div>
   )
}

export default CallPage;