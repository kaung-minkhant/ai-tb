export default class Camera {
  width = 0;
  height = 0;
  video = null
  context = null
  canvas = null

  createObjects = function (width, height, id) {
    const container = document.getElementById(id)
    const video = document.createElement('video');
    video.id = 'video';
    video.width = width;
    video.height = height;
    video.autoplay = true;
    video.style.transform = 'scaleY(1)';
    container.appendChild(video);

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.height = height;
    canvas.style.transform = 'rotateY(180deg)';
    canvas.style.display = 'none';
    container.appendChild(canvas);
  }

  startCamera = (w=680, h=480, id='video-container') => {
    this.width = w
    this.height = h
    if ( navigator.mediaDevices.getUserMedia) {
      this.createObjects(w, h, id);
      this.video = document.getElementById('video');
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
      (function (video) {
        navigator.mediaDevices.getUserMedia({video: {
          facingMode: 'environment',
        }}).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });
      })(this.video)
    }
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

