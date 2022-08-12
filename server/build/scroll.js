const page = document.getElementById('page');
let isDown = false
let pos = {top:0, left:0 ,  x:0, y:0 };

page.addEventListener('mousedown',(e)=>{
    isDown = true;

    page.style.cursor = 'move';
    page.style.userSelect = 'none';

    pos = {
        top: page.scrollTop,
        left: page.scrollLeft,
        x: e.clientX,
        y: e.clientY,
    };
})

page.addEventListener('mousemove',(f)=>{
    if(!isDown) return;
    f.preventDefault();

    const dx = f.clientX - pos.x;
    const dy = f.clientY - pos.y;

    page.scrollLeft = (pos.left - dx);
    page.scrollTop = (pos.top - dy);
})

document.addEventListener('mouseup',()=>{
    isDown = false
    page.style.cursor = 'default';
})


//touchscreen

let touches = [];

page.addEventListener('touchstart',(e)=>{
    isDown = true;
    
    pos = {
        top: page.scrollTop,
        left: page.scrollLeft,
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
    };

})

page.addEventListener('touchmove',(g)=>{
    if(!isDown) return;
    g.preventDefault();

    const dx = g.touches[0].clientX - pos.x;
    const dy = g.touches[0].clientY - pos.y;

    page.scrollLeft = (pos.left - dx);
    page.scrollTop = (pos.top - dy);
})

page.addEventListener('touchend',()=>{
    isDown = false
})