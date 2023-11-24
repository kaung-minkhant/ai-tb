export class vDotService {
    #userId = null
    #userRole = null
    #websocket = null
    #connectionId = null
    #isOpen = false

    // getter and setters
    setUser = ({id, role}) => {
      this.#userId = id
      this.#userRole = role
    }

    // open connection
    openSocket = (setMeetingId, setCaller) => {
        if (!this.#isOpen) {
            console.log("opening");
            this.#websocket = new WebSocket(import.meta.env.VITE_NOTIFICATION_SOCKET_URL)
            this.#websocket.onopen = () => {
                console.log('sending');
                this.#websocket.send(JSON.stringify({
                    action: 'register',
                    userId: this.#userId,
                    userRole: this.#userRole
                }))
                this.#websocket.onmessage = (event) => {
                    const data = JSON.parse(event.data)
                    console.log('incomming data:', data);
                    setMeetingId(data.meetingID)
                    setCaller({targetId: data.targetId, targetRole: data.targetRole}) 
                }
                this.#isOpen = true
            }
        }
    }
}