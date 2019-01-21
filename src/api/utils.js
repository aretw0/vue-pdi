const Utils = {
    createCanvas (evs) {
        var canvas = document.createElement('canvas');
        canvas.onmousemove = evs[0];
        canvas.onclick = evs[1];
        canvas.ondblclick = evs[2];

        return canvas;
    },
    getImageData(cv) {
        return cv.getContext('2d').getImageData(0,0, cv.width,cv.height);
    },
    putImageData(cv,imgData) {
        let ctx =  cv.getContext('2d');
        cv.width = ctx.width = imgData.width;
        cv.height = ctx.height = imgData.height;
        ctx.putImageData(imgData,0,0);
    },
    addImageData(cv,in1,in2) {
        let out = cv.getContext('2d').createImageData(in1.width, in1.height);
        for (var row = 0; row < in1.height; row++) {
            for (var col = 0; col < in1.width; col++) {
                var pos = (row * in1.width + col) * 4;

                out.data[pos] = in1.data[pos] + in2.data[pos];
                out.data[pos + 1] = in1.data[pos + 1] + in2.data[pos + 1];
                out.data[pos + 2] = in1.data[pos + 2] + in2.data[pos + 2];
                out.data[pos + 3] = 255;
            }	
        }
        return out;
    },
    subImageData(cv,in1,in2) {
        let out = cv.getContext('2d').createImageData(in1.width, in1.height);
        for (var row = 0; row < in1.height; row++) {
            for (var col = 0; col < in1.width; col++) {
                var pos = (row * in1.width + col) * 4;

                out.data[pos] = in1.data[pos] - in2.data[pos];
                out.data[pos + 1] = in1.data[pos + 1] - in2.data[pos + 1];
                out.data[pos + 2] = in1.data[pos + 2] - in2.data[pos + 2];
                out.data[pos + 3] = 255;
            }	
        }
        return out;
    },
    multImageData(cv,in1,in2) {
        let out = cv.getContext('2d').createImageData(in1.width, in1.height);
        for (var row = 0; row < in1.height; row++) {
            for (var col = 0; col < in1.width; col++) {
                var pos = (row * in1.width + col) * 4;

                out.data[pos] = in1.data[pos] * in2.data[pos];
                out.data[pos + 1] = in1.data[pos + 1] * in2.data[pos + 1];
                out.data[pos + 2] = in1.data[pos + 2] * in2.data[pos + 2];
                out.data[pos + 3] = 255;
            }	
        }
        return out;
    },
    divImageData(cv,in1,in2) {
        let out = cv.getContext('2d').createImageData(in1.width, in1.height);
        for (var row = 0; row < in1.height; row++) {
            for (var col = 0; col < in1.width; col++) {
                var pos = (row * in1.width + col) * 4;

                out.data[pos] = in1.data[pos] / in2.data[pos];
                out.data[pos + 1] = in1.data[pos + 1] / in2.data[pos + 1];
                out.data[pos + 2] = in1.data[pos + 2] / in2.data[pos + 2];
                out.data[pos + 3] = 255;
            }	
        }
        return out;
    },
    andImageData (cv,in1,in2) {
        let out = cv.getContext('2d').createImageData(in1.width, in1.height);
        for (var row = 0; row < in1.height; row++) {
            for (var col = 0; col < in1.width; col++) {
                var pos = (row * in1.width + col) * 4;

                out.data[pos] = in1.data[pos] & in2.data[pos];
                out.data[pos + 1] = in1.data[pos + 1] & in2.data[pos + 1];
                out.data[pos + 2] = in1.data[pos + 2] & in2.data[pos + 2];
                out.data[pos + 3] = 255;
            }	
        }
        return out;
    },
    orImageData (cv,in1,in2) {
        let out = cv.getContext('2d').createImageData(in1.width, in1.height);
        for (var row = 0; row < in1.height; row++) {
            for (var col = 0; col < in1.width; col++) {
                var pos = (row * in1.width + col) * 4;

                out.data[pos] = in1.data[pos] | in2.data[pos];
                out.data[pos + 1] = in1.data[pos + 1] | in2.data[pos + 1];
                out.data[pos + 2] = in1.data[pos + 2] | in2.data[pos + 2];
                out.data[pos + 3] = 255;
            }	
        }
        return out;
    },
    xorImageData (cv,in1,in2) {
        let out = cv.getContext('2d').createImageData(in1.width, in1.height);
        for (var row = 0; row < in1.height; row++) {
            for (var col = 0; col < in1.width; col++) {
                var pos = (row * in1.width + col) * 4;

                out.data[pos] = in1.data[pos] ^ in2.data[pos];
                out.data[pos + 1] = in1.data[pos + 1] ^ in2.data[pos + 1];
                out.data[pos + 2] = in1.data[pos + 2] ^ in2.data[pos + 2];
                out.data[pos + 3] = 255;
            }	
        }
        return out;
    }
}

export default Utils;