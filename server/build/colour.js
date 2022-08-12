

function colour(input){
    let blue = [99, 182, 230]
    let gold = [255, 215, 0]
    let out = blue
    
    out[0]=blue[0]+input/5
    if(out[0] > 255){
        out[0] = 255
        out[1] = blue[1]+input-156
    }
    if(out[1] > 215){
        out[1] = 215
        out[2] = blue[2]-input+189
    }
    if(out[2] < 0){
        out[2] = 0
    }

    
    return out;
}

console.log(lincolour(1000000))

function randcolour(input){ 
    let out = [0,0,0]
    out[0] = Math.floor(Math.random(input)*255)
    out[1] = Math.floor(Math.random()*255)
    out[2] = Math.floor(Math.random()*255)
    return  `rgb(${out[0]},${out[1]},${out[2]})`
}

function colour(input){ 
    let out = [0,0,0]
    out[0] = Math.round((0.45*Math.cos(0.01*input-1.82)+0.5)*255)
    out[1] = Math.round((0.45*Math.sin(0.1*input+0.40)+0.5)*255)
    out[2] = Math.round(((0.45*Math.cos(0.075*input-0.15)+0.3*Math.sin(0.025*input-0.15))+0.5)*255)
    return `rgb(${out[0]},${out[1]},${out[2]})` 
}

function lincolour(input){ 
    let out = [0,0,0]
    out[0] = Math.round(99+ input*(156/200000000))
    out[1] = Math.round(182+ input*(33/200000000))
    out[2] = Math.round((230- input*(230/200000000)))
    return  `rgb(${out[0]},${out[1]},${out[2]})`
}

function littlecolour(input){ 
    let out = [0,0,0]
    out[0] = Math.round(109 - 10*(-1)^input)
    out[1] = Math.round(142 + 40*(-1)^input)
    out[2] = 230
    return  `rgb(${out[0]},${out[1]},${out[2]})`
}