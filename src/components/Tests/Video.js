export default class Camera {
  width = 0;
  height = 0;
  video = null
  context = null
  canvas = null
  ownStream = null
  injectedStream = null
  
  getStream = () => {
    return this.ownStream
  }
  
  setStream = (stream) => {
    this.injectedStream = stream
  }

  createObjects = function (width, height, id, vidId, aiScan, mobile) {
    const container = document.getElementById(id)
    const video = document.createElement('video');
    video.id = vidId;
    video.width = width;
    video.height = height;
    video.autoplay = true;
    if (mobile) {
      if (aiScan) {
        video.style.transform = 'rotateY(180deg) scaleX(-1)'
      } else {
        video.style.transform = 'rotateY(180deg) scale(1.5)'
      }
      // video.style.transform = `${aiScan ? 'rotateY(180deg)' : ""} scale(${aiScan ? 1 : 2})`;
    } else {
      video.style.transform = 'rotateY(180deg)';
    }
    container.appendChild(video);
    if (aiScan) {
      const canvas = document.createElement('canvas');
      canvas.id = 'canvas';
      canvas.width = width;
      canvas.height = height;
      canvas.style.transform = 'rotateY(180deg)';
      canvas.style.display = 'none';
      container.appendChild(canvas);
    }
    
  }

  startCamera = (w=680, h=480, containerId='video-container', videoId = 'video-id', call = null, aiScan = true, isMobile=false) => {
    this.width = w
    this.height = h
    if ( navigator.mediaDevices.getUserMedia) {
      this.createObjects(w, h, containerId, videoId, aiScan, isMobile);
      this.video = document.getElementById(videoId);
      console.log(this.video)
      this.video.autoplay = true
      if (aiScan) {
        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');
      }
      
      
      if (this.injectedStream) {
        this.video.srcObject = this.injectedStream
        return
      }
      
      const start = (video) => {
        navigator.mediaDevices.getUserMedia({video: {
          facingMode: {exact: aiScan ? (isMobile ? "environment" : 'user') : "user"},
        }}).then((stream) => {
            this.ownStream = stream
            video.srcObject = this.ownStream;
            if(call) {
              call.answer(stream)
            }
        });
      }
      start(this.video)
    }
  }

  stopCamera = () => {
    this.video.srcObject = null
  }

  takeSnapshot = () => {
    let formData;
    this.context.drawImage(this.video, 0, 0, this.width, this.height);
    const image = this.canvas.toDataURL("image/png")
    // this.canvas.toBlob(function (blob) {
    //   let formdata = new FormData()
    //   formdata.append('image', blob, 'kmk.png')
    //   console.log(formdata)
    //   formData = formData;
    // })
    return image
  }
}

