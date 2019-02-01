const Utils = {
    createCanvas (evs) {
        var canvas = document.createElement('canvas');
        if (evs) {
            canvas.onmousemove = evs[0];
            canvas.onclick = evs[1];
            canvas.ondblclick = evs[2];
        }
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
    cmpImageData (op,cv,inp) {
        let comp;

        switch (op) {
            case 'rgb':
                comp = {
                    r: cv.getContext('2d').createImageData(inp.width, inp.height),
                    g: cv.getContext('2d').createImageData(inp.width, inp.height),
                    b: cv.getContext('2d').createImageData(inp.width, inp.height)
                };
            break;
            case 'cmyk': {
                comp = {
                    c: cv.getContext('2d').createImageData(inp.width, inp.height),
                    m: cv.getContext('2d').createImageData(inp.width, inp.height),
                    y: cv.getContext('2d').createImageData(inp.width, inp.height),
                    k: cv.getContext('2d').createImageData(inp.width, inp.height)
                };
            }
            break;
            case 'hsb':
                comp = {
                    h: cv.getContext('2d').createImageData(inp.width, inp.height),
                    s: cv.getContext('2d').createImageData(inp.width, inp.height),
                    b: cv.getContext('2d').createImageData(inp.width, inp.height)
                }
            break;
            case 'yuvsd':
            case 'yuvhd':
                comp = {
                    y: cv.getContext('2d').createImageData(inp.width, inp.height),
                    u: cv.getContext('2d').createImageData(inp.width, inp.height),
                    v: cv.getContext('2d').createImageData(inp.width, inp.height)
                }
            break;
        }
        for (var row = 0; row < inp.height; row++) {
            for (var col = 0; col < inp.width; col++) {
                var pos = (row * inp.width + col) * 4;

                switch(op) {
                    case 'rgb':
                        comp.r.data[pos] = inp.data[pos];
                        comp.r.data[pos + 1] = 0;
                        comp.r.data[pos + 2] = 0;     
        
                        comp.g.data[pos] = 0;
                        comp.g.data[pos + 1] = inp.data[pos + 1]; 
                        comp.g.data[pos + 2] = 0;
        
                        comp.b.data[pos] = 0;
                        comp.b.data[pos + 1] = 0; 
                        comp.b.data[pos + 2] = inp.data[pos + 2];
                    break;
                    case 'cmyk':
                    {
                        let rL = (inp.data[pos] / 255);
                        let gL = (inp.data[pos + 1] / 255);
                        let bL = (inp.data[pos + 2] / 255);

                        let varK = Math.min(rL,gL,bL);

                        let nComp = {
                            c: ((varK == 1) ? 0 : ((1-rL-varK) / (1-varK))),
                            m: ((varK == 1) ? 0 : ((1-gL-varK) / (1-varK))),
                            y: ((varK == 1) ? 0 : ((1-bL-varK) / (1-varK))),
                            k: 1 - Math.max(rL,gL,bL)
                        };

                        comp.c.data[pos] = 255 * (1 - nComp.c);
                        comp.c.data[pos + 1] = 255;
                        comp.c.data[pos + 2] = 255;

                        comp.m.data[pos] = 255;
                        comp.m.data[pos + 1] = 255 * (1 - nComp.m);
                        comp.m.data[pos + 2] = 255;

                        comp.y.data[pos] = 255;
                        comp.y.data[pos + 1] = 255;
                        comp.y.data[pos + 2] = 255 * (1 - nComp.y);

                        comp.k.data[pos] = 255 * (1 - nComp.k);
                        comp.k.data[pos + 1] = 255 * (1 - nComp.k);
                        comp.k.data[pos + 2] = 255 * (1 - nComp.k);
                    }
                    break;
                    case 'hsb':
                    {
                        let rL = (inp.data[pos] / 255);
                        let gL = (inp.data[pos + 1] / 255);
                        let bL = (inp.data[pos + 2] / 255);

                        let cMax = Math.max(rL,gL,bL);
                        let cMin = Math.min(rL,gL,bL);

                        let delta = cMax - cMin;

                        let nComp = {
                            h: 0,
                            s: (cMax !== 0) ? (delta / cMax) : 0,
                            b: cMax
                        };

                        /* if (delta === 0) {
                            nComp.h = 0;
                        } else if (cMax === rL) {
                            nComp.h = 60 * (((gL - bL) / delta) + 0);
                        } else if (cMax === gL) {
                            nComp.h = 60 * (((bL - rL) / delta) + 2);
                        } else if (cMax === bL) {
                            nComp.h = 60 * (((rL - gL) / delta) + 4);
                        } */
                        
                        nComp.h = (nComp.h > 0 ? nComp.h : (2 * Math.PI + nComp.h)) * 360 / (2 * Math.PI);

                        // let C = nComp.b * nComp.s;
                        let C = nComp.b * 0;
                        let X = C * (1 - Math.abs((0 / 60) % 2 - 1));
                        let m = nComp.b - C;

                        if (nComp >= 0 && nComp < 60) {
                            rL = C, gL = X, bL = 0;
                        } else if (nComp >= 60 && nComp < 120) {
                            rL = C, gL = X, bL = 0;
                        } else if (nComp >= 120 && nComp < 180) {
                            rL = X, gL = C, bL = 0;
                        } else if (nComp >= 180 && nComp < 240) {
                            rL = 0, gL = C, bL = X;
                        } else if (nComp >= 240 && nComp < 300) {
                            rL = X, gL = 0, bL = C;
                        } else if (nComp >= 300 && nComp < 360) {
                            rL = C, gL = 0, bL = X;
                        }
                        
                        let nRGB = {
                            r: (rL+m)*255,
                            g: ((gL+m)*255),
                            b: ((bL+m)*255)
                        }

                        comp.h.data[pos] = 0;
                        comp.h.data[pos + 1] = 0;
                        comp.h.data[pos + 2] = 0;

                        comp.s.data[pos] = 0;
                        comp.s.data[pos + 1] = 0;
                        comp.s.data[pos + 2] = 0;

                        comp.b.data[pos] = nRGB.r;
                        comp.b.data[pos + 1] = nRGB.g;
                        comp.b.data[pos + 2] = nRGB.b;

                    }
                    break;
                    case 'yuvsd':
                    {
                        let nComp = {
                            y: (0.299 * inp.data[pos]) + (0.587 * inp.data[pos + 1]) + (0.114 * inp.data[pos + 2]),
                            u: (-0.14713 * inp.data[pos]) + (-0.28886 * inp.data[pos + 1]) + (0.436 * inp.data[pos + 2]), 
                            v: (0.615 * inp.data[pos]) + (-0.51499 * inp.data[pos + 1]) + (-0.10001 * inp.data[pos + 2])
                        };

                        comp.y.data[pos] = nComp.y;
                        comp.y.data[pos + 1] = nComp.y;
                        comp.y.data[pos + 2] = nComp.y;
                    
                        comp.u.data[pos] = 0;
                        comp.u.data[pos + 1] = nComp.u * (-0.39465);
                        comp.u.data[pos + 2] = nComp.u * 2.03211;

                        comp.v.data[pos] = nComp.v * 1.13983;
                        comp.v.data[pos + 1] = nComp.v * (-0.58060);
                        comp.v.data[pos + 2] = 0;
                    }
                    break;
                    case 'yuvhd':
                    {
                        let nComp = {
                            y: (0.2126 * inp.data[pos]) + (0.7152 * inp.data[pos + 1]) + (0.0722 * inp.data[pos + 2]),
                            u: (-0.09991 * inp.data[pos]) + (-0.33609 * inp.data[pos + 1]) + (0.436 * inp.data[pos + 2]), 
                            v: (0.615 * inp.data[pos]) + (-0.55861 * inp.data[pos + 1]) + (-0.05639 * inp.data[pos + 2])
                        }

                        comp.y.data[pos] = nComp.y;
                        comp.y.data[pos + 1] = nComp.y;
                        comp.y.data[pos + 2] = nComp.y;
                    
                        comp.u.data[pos] = 0;
                        comp.u.data[pos + 1] = nComp.u * (-0.21482);
                        comp.u.data[pos + 2] = nComp.u * 2.12798;

                        comp.v.data[pos] = nComp.u * 1.28033;
                        comp.v.data[pos + 1] = nComp.u * (-0.38059);
                        comp.v.data[pos + 2] = 0;
                    }
                    break;
                }

                for (const key in comp) {
                    if (comp.hasOwnProperty(key)) {
                        comp[key].data[pos + 3] = 255;
                    }
                }
            }	
        }
        return comp;
    },
    colorImageData (op,cv,inp) {
        let out = cv.getContext('2d').createImageData(inp.width, inp.height);
        let min = Math.ceil(0);
        let max = Math.floor(2);
        let rnd = Math.floor(Math.random() * (max - min + 1)) + min;

        for (let row = 0; row < inp.height; row++) {
            for (let col = 0; col < inp.width; col++) {
                let pos = (row * inp.width + col) * 4;

                switch(op) {
                    case 'redis':
                    {
                        out.data[pos] = inp.data[pos + rnd];
                        out.data[pos + 1] = inp.data[pos + Math.abs(1 - rnd)];
                        out.data[pos + 2] = inp.data[pos + 2 - (rnd == 1 ? 0 : rnd)];
                    }
                    break;
                    case 'fatia51':
                    {
                        let cMax = Math.max(inp.data[pos + 1],inp.data[pos + 2],inp.data[pos]);
                        let cMin = Math.min(inp.data[pos + 1],inp.data[pos + 2],inp.data[pos]);
                        let delta = (cMax - cMin) == 0 ? cMax : (cMax - cMin);
                        // let delta = cMax;
                        let r = 255, g = 255, b = 255;
                        if (delta >= 0 && delta < 51) {
                            r = 102, g = 51, b = 0;
                        } else if (delta >= 51 && delta < 102) {
                            r = 153, g = 102, b = 51;
                        } else if (delta >= 102 && delta < 153) {
                            r = 204, g = 153, b = 102;
                        } else if (delta >= 153 && delta < 204) {
                            r = 255, g = 204, b = 153;
                        } else if (delta >= 204 && delta <= 255) {
                            r = 255, g = 255, b = 204;
                        }
                        out.data[pos] = r;
                        out.data[pos + 1] = g;
                        out.data[pos + 2] = b;
                    }
                    break;
                }
                out.data[pos + 3] = 255;


            }
        }

        return out;

    }
}

export default Utils;