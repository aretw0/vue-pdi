const Utils = {
    createCanvas (evs) {
        var canvas = document.createElement('canvas');
        canvas.onmousemove = evs[0];
        canvas.onclick = evs[1];
        canvas.ondblclick = evs[2];

        return canvas;
    }
}

export default Utils;