let startX;
let threshold = 200;

function mouseDown(event) {
    startX = event.clientX;
}

function mouseUp(event) {
    let endX = event.clientX;
    let deltaX = endX - startX;

    if (Math.abs(deltaX) > threshold) {
        switch (window.location.pathname) {
            case '/index.html':
                window.location.href = deltaX > 0 ? 'Historical.html' : 'Calculator.html';
                break;
            case '/Historical.html':
                window.location.href = deltaX > 0 ? 'Calculator.html' : 'index.html';
                break;
            case '/Calculator.html':
                window.location.href = deltaX > 0 ? 'index.html' : 'Historical.html';
                break;
            default:
                break;
        }
    }
}

document.addEventListener('mousedown', mouseDown, false);
document.addEventListener('mouseup', mouseUp, false);