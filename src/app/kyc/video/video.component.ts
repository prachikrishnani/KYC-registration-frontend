import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from '@tensorflow/tfjs';
import * as faceapi from 'face-api.js'

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {

  private _stream!: MediaStream
  private _faceDetectTimer!: NodeJS.Timeout
  public validUser: boolean = false
  public multiuser: boolean = false
  public invalidUser: boolean = false
  public userImg!: SafeUrl
  public timer!: NodeJS.Timeout
  public capturingIn: number = 3
  public nextStepIn: number = 5

  @ViewChild('videoElement') videoElement!: ElementRef;
  @ViewChild('canvasElement') canvasElement!: ElementRef;

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute
  ) {
    void this._mediaRecorderSetUp()
  }

  async ngOnInit(): Promise<void> {
    await this._loadFaceDetectionModel();
    await this._detectFaces()
  }

  /**
 * This function is used to set the permission for video streaming
 */
  private async _mediaRecorderSetUp(): Promise<void> {
    try {
      // change ideal height width for lowend mobiles 
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: 'user', // Use the front camera
          width: { ideal: 1920 }, // 1080p width
          height: { ideal: 1080 }, // 1080p height
          // You can adjust these values for higher resolutions  
        },
        audio: true
      };
      this._stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.videoElement.nativeElement.srcObject = this._stream;
    } catch (error) {
      alert('Please allow permissions to access the camera and microphone.')
    }
  }

  /**
 * This function is used to load faceddetection model from model folder in asset
 */
  private async _loadFaceDetectionModel(): Promise<void> {
    await faceapi.nets.tinyFaceDetector.loadFromUri('assets/models'); // Adjust the path to your models folder
    await faceapi.loadFaceLandmarkModel('assets/models');
  }

  /**
   * This function is used to detect faces video element
   * canvas is used to making rectangle on each faces identify
   */
  private async _detectFaces(): Promise<void> {
    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d')
    const videoDiv = (document.getElementById('videoDiv') as HTMLVideoElement);

    if (video && videoDiv && canvas && context) {
      video.addEventListener('play', async () => {
        // document.body.append(canvas);
        // This function is used to set the canvas height and weight accodingly to video height width for drawing rectangle
        faceapi.matchDimensions(canvas, { width: videoDiv.clientWidth, height: videoDiv.clientHeight });

        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        this._faceDetectTimer = setInterval(async () => {
          faceapi.matchDimensions(canvas, { width: videoDiv.clientWidth, height: videoDiv.clientHeight });
          const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks();
          if (detections.length == 1) {
            this.validUser = true
            this.multiuser = false
            this.invalidUser = false
            this.timer = setTimeout(() => {

              // if user click on leave button timer is not increase
              if (this.capturingIn === 0) {
                clearInterval(this.timer)
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                var imageDataURL = canvas.toDataURL('image/png');
                if (imageDataURL) {
                  clearInterval(this._faceDetectTimer)
                  this.userImg = imageDataURL;
                  (document.getElementById('userVideo') as HTMLDivElement).style.display = `none`;
                  (document.getElementById('userImg') as HTMLDivElement).style.display = `block`;
                  this._stream.getTracks().forEach((track) => {
                    track.stop()
                  })
                  this.nextStep()
                } else {
                  this.capturingIn = 3
                }
              } else {
                this.capturingIn--
              }
            }, 1000)
          } else if (detections.length > 1) {
            this.multiuser = true
            this.validUser = false
            this.invalidUser = false
            this.capturingIn = 3
          } else {
            this.invalidUser = true
            this.validUser = false
            this.multiuser = false
            this.capturingIn = 3
          }
          if (videoDiv) {
            const resizedDetections = faceapi.resizeResults(detections, { width: videoDiv.clientWidth, height: videoDiv.clientHeight });
            if (context !== null) {
              context.clearRect(0, 0, canvas.width, canvas.height);
              // Draw a line on each detected face
              resizedDetections.forEach((face) => {
                const boundingBox = face.detection.box;
                context.beginPath();
                context.rect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
                context.lineWidth = 1.5;
                context.strokeStyle = '#399953';
                context.stroke();
              });
            }
          }
        }, 1000); // Adjust the interval as needed 
      });
    }
  }



  ngOnDestroy(): void {
    // Used to stop Media devices
    this._stream.getTracks().forEach((track) => {
      track.stop()
    })
  }

  public nextStep(): void {
    let next = setInterval(() => {
      if (this.nextStepIn === 0) {
        clearInterval(next)
        this._router.navigate(['../otp'], {
          relativeTo: this._route
        })
      } else {
        this.nextStepIn--
      }
    }, 1000)
  }
}
