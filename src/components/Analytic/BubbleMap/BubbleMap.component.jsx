import { useEffect, useState } from "react"

const BubbleMap = ({mapID}) => {
    const [mapBubbleData, setMapBubbleData] = useState([
        { 'id': 'Sydney', 'size': 106, "lat": -33.51, "long": 151.11 },
        { 'id': 'Cape York', 'size': 103, "lat": -10.41, "long": 142.22 },
        { 'id': 'Cape South-Point', 'size': 109, "lat": -39.08, "long": 142.22 },
        { 'id': 'Cape Byron', 'size': 108, "lat": -28.36, "long": 153.38 },
        { 'id': 'Steep-Point Cape', 'size': 95, "lat": -26.09, "long": 113.09 },
        { 'id': 'Alice Springs', 'size': 100, "lat": -23.69, "long": 133.87 },
        { 'id': 'Adelaide', 'size': 99, "lat": -34.98, "long": 138.42 }
    ])

    const [map, setMap] = useState(anychart.map())
    const [mapData, setMapData] = useState(null)
    const [country, setCountry] = useState('myanmar')
    const [scriptId, setScriptId] = useState(crypto.randomUUID())

    useEffect(() => {
        const existingTag = document.getElementById(`geodata-map-${scriptId}`)
        existingTag && existingTag.remove()
        const scriptTag = document.createElement('script')
        scriptTag.setAttribute('id', `geodata-map-${scriptId}`)
        scriptTag.setAttribute('src', `https://cdn.anychart.com/geodata/2.1.1/countries/${country}/${country}.js`)
        document.head.appendChild(scriptTag)
        scriptTag.addEventListener('load', () => {
            map.geoData(anychart.maps[country])
            const series1 = map.bubble(mapData)
            map.container(mapID)
            map.draw()
        }, false)
    }, [country])

    useEffect(() => {
        setMapData(mapBubbleData)
        setCountry('myanmar')
    }, [mapBubbleData])

    const handleOnCountryChange = (event) => {
        setCountry(event.target.value)
    }
    return (
        <div>
            <div>
                <select name="country" id="country" onChange={handleOnCountryChange}>
                    <option value="myanmar">Myanmar</option>
                    <option value="australia">Australia</option>
                </select>
            </div>
            <div id={mapID}>
            </div>
        </div>
    )
}

export default BubbleMap
