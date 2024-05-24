let startX;
let threshold = 200;

function mouseDown(event) {
    startX = event.clientX;
}

function mouseUp(event) {
    let endX = event.clientX;
    let deltaX = endX - startX;

    if (Math.abs(deltaX) > threshold) {
        if (deltaX > 0) {
            window.location.href = 'Historical.html';
        } else {
            window.location.href = 'index.html';
        }
    }
}

document.addEventListener('mousedown', mouseDown, false);
document.addEventListener('mouseup', mouseUp, false);
