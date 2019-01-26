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
    opImageData(op,cv,in1,in2,norm) {

        let out = cv.getContext('2d').createImageData(in1.width, in1.height);
        let res = {
            maxR: 0,
            maxG: 0,
            maxB: 0,
            minR: 600,
            minG: 600,
            minB: 600,
            data: []
        };
        for (let row = 0; row < in1.height; row++) {
            for (let col = 0; col < in1.width; col++) {
                let pos = (row * in1.width + col) * 4;
                
                switch(op) {
                    case 'sum':
                        res.data.push(in1.data[pos] + in2.data[pos]);
                        res.data.push(in1.data[pos + 1] + in2.data[pos + 1]);
                        res.data.push(in1.data[pos + 2] + in2.data[pos + 2]);
                    break;
                    case 'minus':
                        res.data.push(in1.data[pos] - in2.data[pos]);
                        res.data.push(in1.data[pos + 1] - in2.data[pos + 1]);
                        res.data.push(in1.data[pos + 2] - in2.data[pos + 2]);
                    break;
                    case 'multi':
                        res.data.push(in1.data[pos] * in2.data[pos]);
                        res.data.push(in1.data[pos + 1] * in2.data[pos + 1]);
                        res.data.push(in1.data[pos + 2] * in2.data[pos + 2]);
                    break;
                    case 'divid':
                        res.data.push(in1.data[pos] / in2.data[pos]);
                        res.data.push(in1.data[pos + 1] / in2.data[pos + 1]);
                        res.data.push(in1.data[pos + 2] / in2.data[pos + 2]);
                    break;
                    case 'and':
                        res.data.push(in1.data[pos] & in2.data[pos]);
                        res.data.push(in1.data[pos + 1] & in2.data[pos + 1]);
                        res.data.push(in1.data[pos + 2] & in2.data[pos + 2]);
                    break;
                    case 'or':
                        res.data.push(in1.data[pos] | in2.data[pos]);
                        res.data.push(in1.data[pos + 1] | in2.data[pos + 1]);
                        res.data.push(in1.data[pos + 2] | in2.data[pos + 2]);
                    break;
                    case 'xor':
                        res.data.push(in1.data[pos] ^ in2.data[pos]);
                        res.data.push(in1.data[pos + 1] ^ in2.data[pos + 1]);
                        res.data.push(in1.data[pos + 2] ^ in2.data[pos + 2]);
                    break;
                }
                res.data.push(0); // posição do A (RGBA)
    
                res.maxR = (res.data[pos] > res.maxR) ? res.data[pos] : res.maxR;
                res.maxG = (res.data[pos + 1] > res.maxG) ? res.data[pos + 1] : res.maxG;
                res.maxB = (res.data[pos + 2] > res.maxB) ? res.data[pos + 2] : res.maxB;
    
                res.minR = (res.data[pos] < res.minR) ? res.data[pos] : res.minR;
                res.minG = (res.data[pos + 1] < res.minG) ? res.data[pos + 1] : res.minG;
                res.minB = (res.data[pos + 2] < res.minB) ? res.data[pos + 2] : res.minB;
            }	
        }
        for (let row = 0; row < in1.height; row++) {
            for (let col = 0; col < in1.width; col++) {
                let pos = (row * in1.width + col) * 4;
                if (!norm) {
                    out.data[pos] = res.data[pos];
                    out.data[pos + 1] = res.data[pos + 1];
                    out.data[pos + 2] = res.data[pos + 2];
                   
                } else {
                    out.data[pos] = ((res.data[pos] > 255) || (res.data[pos] < 0)) ? (255 * (res.data[pos] - res.minR))/(res.maxR - res.minR) : res.data[pos];
                    out.data[pos + 1] = ((res.data[pos + 1] > 255) || (res.data[pos + 1] < 0)) ? (255 * (res.data[pos + 1] - res.minG))/(res.maxG - res.minG) : res.data[pos + 1];
                    out.data[pos + 2] = ((res.data[pos + 2] > 255) || (res.data[pos + 2] < 0)) ? (255 * (res.data[pos + 2] - res.minB))/(res.maxB - res.minB) : res.data[pos + 2];
                }
                out.data[pos + 3] = 255;
            }
        }
        return out;
    },
    rgbImageData (cv,inp) {
        let comp = {
            r: cv.getContext('2d').createImageData(inp.width, inp.height),
            g: cv.getContext('2d').createImageData(inp.width, inp.height),
            b: cv.getContext('2d').createImageData(inp.width, inp.height)
        };
        for (var row = 0; row < inp.height; row++) {
            for (var col = 0; col < inp.width; col++) {
                var pos = (row * inp.width + col) * 4;

                comp.r.data[pos] = inp.data[pos];
                comp.r.data[pos + 1] = 0;
                comp.r.data[pos + 2] = 0;
                comp.r.data[pos + 3] = 255;       

                comp.g.data[pos] = 0;
                comp.g.data[pos + 1] = inp.data[pos + 1]; 
                comp.g.data[pos + 2] = 0;
                comp.g.data[pos + 3] = 255;

                comp.b.data[pos] = 0;
                comp.b.data[pos + 1] = 0; 
                comp.b.data[pos + 2] = inp.data[pos + 2];
                comp.b.data[pos + 3] = 255;
            }	
        }
        return comp;
    }
}

export default Utils;