export default class Camera {
  width = 0;
  height = 0;
  video = null
  context = null
  canvas = null

  createObjects = function (width, height) {
    const container = document.getElementById('video-container')
    const video = document.createElement('video');
    video.id = 'video';
    video.width = width;
    video.height = height;
    video.autoplay = true;
    video.style.transform = 'rotateY(180deg)'
    container.appendChild(video);

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = width;
    canvas.height = height;
    canvas.style.transform = 'rotateY(180deg)'
    container.appendChild(canvas);
  }

  startCamera = (w=680, h=480) => {
    this.width = w
    this.height = h
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      this.createObjects(w, h);
      this.video = document.getElementById('video');
      this.canvas = document.getElementById('canvas');
      this.context = this.canvas.getContext('2d');
      (function (video) {
        navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
            video.srcObject = stream;
            video.play();
        });
      })(this.video)
    }
  }

  takeSnapshot = () => {
    this.context.drawImage(this.video, 0, 0, this.width, this.height);
  }
}

