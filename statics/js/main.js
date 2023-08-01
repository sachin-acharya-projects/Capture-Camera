import "../css/style.css"
import "../css/style.scss"

// Dom Selection
const canvasContainer = document.querySelector(".container")
const video = document.querySelector("video")
const button = document.querySelector("#capture")
const view_image = document.querySelector('#view-image')
const canvas = document.querySelector('canvas')

const canvasContext = canvas.getContext('2d')

button.addEventListener('click', snap)
view_image.addEventListener('click', () => {
    location.href = "#container"
})

// navigator.mediaDevices.getUserMedia
navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.oGetUserMedia ||
    navigator.msGetUserMedia

if (navigator.getUserMedia) {
    navigator.getUserMedia(
        {
            video: true,
        },
        streamWebCam,
        throwError
    )
}

function streamWebCam(stream) {
    // video.src = window.URL.createObjectURL(stream)
    video.srcObject = stream
    video.play()
}

function throwError(e) {
    console.error(e)
}

function snap() {
    // const canvas = document.createElement('canvas')
    // const canvasContext = canvas.getContext('2d')
    canvas.width = video.clientWidth
    canvas.height = video.clientHeight

    canvasContext.drawImage(video, 0, 0)

    const image = document.createElement('img')
    image.src = canvas.toDataURL('image/jpeg')
    canvasContainer.appendChild(image)
}
