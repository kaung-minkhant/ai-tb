import React, { useState } from "react";
import './VideoComponent.style.css'

const VideoComponent = ({meetingId, setMeetingId, meetingService, participantInfo = {}}) => {

    const {callerId, callerRole, recId, recRole} = participantInfo

    const startMeeting = async () => {
        await meetingService.createMeeting(meetingId, setMeetingId, callerId, callerRole, recId, recRole)
    }

    const stopMeeting = async (meetingId) => {
        await meetingService.stopMeeting(meetingId, setMeetingId)
    }

    return (
        <>
            <audio className='audio' id="meeting-audio"></audio>

            <div className='control-btn-group'>
                <button type="button" id="start-button" onClick={() => startMeeting()}>Start the call</button>
                <button type="button" id="stop-button" onClick={() => stopMeeting(meetingId)}>Stop Call</button>
                {/* <button type="button" id="exit-button">Exit Meeting</button>
                <button type="button" id="share-button">Screen Share</button> */}
            </div>

            
            <hr style={{marginTop: '2rem'}}/>
            <div id="video-list" />
        </>
    )
}

export default VideoComponent