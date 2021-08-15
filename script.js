const videoElem = document.getElementById("video");

var displayMediaOptions = {
    video: {
        cursor: "always",
        displaySurface: "monitor",
        logicalSurface: true,
        resizeMode: "none",
        height: screen.height,
        width: screen.width
    },
    audio: false
};

async function startCapture() {
    try {
        videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch(err) {
        console.error("Error: " + err);
    }

    const videoTrack = videoElem.srcObject.getVideoTracks()[0];
    const ele = document.getElementById('video');
    ele.style.height = videoTrack.getSettings().height + 'px';
    ele.style.width = videoTrack.getSettings().width + 'px';
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

let zoom = 1;
const ZOOM_SPEED = 0.1;

document.addEventListener("wheel", function(e) {
    if (e.deltaY < 0) {
        videoElem.style.transform = `scale(${zoom += ZOOM_SPEED})`;
    } else {
        videoElem.style.transform = `scale(${zoom -= ZOOM_SPEED})`;
    }
});

dragElement(videoElem);
startCapture();
