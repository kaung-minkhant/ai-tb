import { ConsoleLogger, DefaultDeviceController, DefaultMeetingSession, LogLevel, MeetingSessionConfiguration } from 'amazon-chime-sdk-js'
// import crypto from ''
window.global ||= window
export class MeetingService {
    #username = null;
    #attendeeId = null;
    #setMeetingId = null;
    #navigate = null;

    #attendees = new Set();

    #configuration = null;
    #logger = new ConsoleLogger(
        "ChimeMeetingLogs",
        LogLevel.OFF
    )
    #deviceController = new DefaultDeviceController(this.#logger)
    #meetingSession = null

    setUserName(userNameElement) {
        this.#username = userNameElement.value
    }

    setAttendeeId(attendeeId) {
        this.#attendeeId = attendeeId
    }
    setMeetingIDUpdate = (setMeetingId) => {
        this.#setMeetingId = setMeetingId
    }
    setNavigate = (navigate) => {
      this.#navigate = navigate 
    }


    getUserName() {
        console.log(this.#username);
        return this.#username
    }
    getAttendeeId() {
        return this.#attendeeId
    }

    // create client id
    #createClientID() {
        return crypto.randomUUID()
    }

    // create meeting
    async createMeeting(meetingId = null, setMeetingId, userId = null, userRole = null, targetId = null, targetRole = null) {
        const response = await fetch(import.meta.env.VITE_MEETING_ENDPOINT, {
            method: "POST",
            headers: new Headers(),
            body: JSON.stringify({
                action: 'DO_MEETING',
                MEETING_ID: meetingId,
                USERNAME: this.#username,
                USERID: userId,
                USERROLE: userRole,
                TARGETID: targetId,
                TARGETROLE: targetRole
            })
        })
        const data = await response.json()
        console.log('API response:', data);
        this.#setMeetingId(data.Info.Meeting.Meeting.MeetingId)

        // meeting configuration
        this.#configuration = new MeetingSessionConfiguration(
            data.Info.Meeting.Meeting,
            data.Info.Attendee.Attendee
        )

        this.#meetingSession = new DefaultMeetingSession(
            this.#configuration,
            this.#logger,
            this.#deviceController
        )

        // initialize video and audio
        const audioInputs = await this.#meetingSession.audioVideo.listAudioInputDevices();
        const videoInputs = await this.#meetingSession.audioVideo.listVideoInputDevices();
        // console.log('audio inputs: ', audioInputs);
        // console.log('video inputs: ', videoInputs);

        await this.#meetingSession.audioVideo.startAudioInput(audioInputs[0].deviceId);
        await this.#meetingSession.audioVideo.startVideoInput(videoInputs[0].deviceId);

        // add observer
        this.#meetingSession.audioVideo.addObserver(this.#observer);
        this.#meetingSession.audioVideo.realtimeSubscribeToAttendeeIdPresence(this.#attendeeObserver);
        this.#meetingSession.eventController.addObserver(this.#eventObserver);

        // add audio
        const audioOutputElement = document.getElementById("meeting-audio");
        this.#meetingSession.audioVideo.bindAudioElement(audioOutputElement);
        this.#meetingSession.audioVideo.start();
        this.#meetingSession.audioVideo.startLocalVideoTile();
    }

    // attendee observer
    #attendeeObserver = (attendeeId, present, externalUserId, dropped, posInFrame) => {
        const attendeeUserName = externalUserId.substring(0, externalUserId.indexOf("#"));
        if (present) {
            this.#attendees.add(attendeeUserName);
        } else {
            // Attendee no longer 'present', remove the attendee display div with video tile
            const elements = document.getElementsByName("div-" + attendeeId);
            elements[0].remove();

            // For screen share attendeeId comes with #content suffix.
            // Do not remove user from attendees if this is screen share closure update
            if (attendeeId.indexOf("#content") < 0) {
                this.#attendees.delete(attendeeUserName);
            }
        }
    }

    // observer related
    #observer = {
        // Tile State changed, so let's examine it.
        videoTileDidUpdate: (tileState) => {
            // if no attendeeId bound to tile, ignore it return
            if (!tileState.boundAttendeeId) {
                return;
            }
            //There is an attendee Id against the tile, and it's a valid meeting session, then update tiles view
            if (this.#meetingSession !== null) {
                this.#updateTiles(this.#meetingSession);
            }
        },
    };

    #eventObserver = {
        // Check for events of interest for eg. Meeting End.
        eventDidReceive: (name, attributes) => {
            switch (name) {
                case 'meetingEnded':
                    this.#cleanup();
                    this.#navigate(-1)
                    console.log("NOTE: Meeting Ended", attributes);
                    break;
                case 'meetingReconnected':
                    console.log('NOTE: Meeting Reconnected...');
                    break;
            }
        }
    }

    #updateTiles(meetingSession) {
        const tiles = meetingSession.audioVideo.getAllVideoTiles();
        tiles.forEach(tile => {
            let tileId = tile.tileState.tileId
            let divElement = document.getElementById("div-" + tileId);
            if (!divElement) {
                // Create divElement. Give it a unique id and name
                divElement = document.createElement("div");
                divElement.id = "div-" + + tileId;
                divElement.setAttribute("name", "div-" + tile.tileState.boundAttendeeId);
                divElement.style.display = "inline-block";
                divElement.style.padding = "5px";

                // Create videoElement. Give it a unique id
                const videoElement = document.createElement("video");
                videoElement.id = "video-" + tileId;
                videoElement.setAttribute("name", "video-" + tile.tileState.boundAttendeeId);
                videoElement.style.width = '300px';
                videoElement.controls = true;

                // Create 'p' element for user name to display above video tile.
                // const tileUserName = document.createElement("p");
                // tileUserName.style.color = "blueviolet";
                // const boundExtUserId = tile.tileState.boundExternalUserId
                // tileUserName.textContent = boundExtUserId.substring(0, boundExtUserId.indexOf("#"));

                // Append appropriately
                // divElement.append(tileUserName);
                divElement.append(videoElement);
                document.getElementById("video-list").append(divElement);

                // bind meeting with video element
                meetingSession.audioVideo.bindVideoElement(
                    tileId,
                    videoElement
                );
            }
        })
    }

    async stopMeeting(meetingId, setMeetingId) {
        //Send request to service(API Gateway > Lambda function) to end the Meeting
        try {
            const response = await fetch(import.meta.env.VITE_MEETING_ENDPOINT, {
                method: "POST",
                headers: new Headers(),
                body: JSON.stringify({ action: "END_MEETING", MEETING_ID: `${meetingId}` })
            });

            const data = await response.json();
            console.log("NOTE: END MEETING RESPONSE " + JSON.stringify(data));
            //meetingSession.deviceController.destroy();
            setMeetingId(null)
            this.#cleanup();

            // this.#meetingSession = null;

        }
        catch (err) {
            console.error("NOTE Error: " + err);
        }
    }

    #cleanup() {
        this.#meetingSession.audioVideo.stop()
        this.#meetingSession.deviceController.destroy();
        document.getElementById("video-list").replaceChildren();
        this.#attendees.clear();
        this.#setMeetingId(null)
    }

}