import { io } from "socket.io-client";

const page = document.getElementById('page')
const apikey = "08c4ceb2-57c6-4db8-83bc-6610830752d1"
const caturl = "https://api.thecatapi.com/v1/images/search"


const socket = io({
    auth: (id) => {
        const userId = localStorage.getItem("userId");
        if(typeof userId == 'string'){
            id({
                token:userId
            })}
        else{
            id({
                token:"noId"
            });
        }
        
    }
});

const popup = document.getElementById('login-popup');

socket.on("setId", () =>{
    popup.style.display = 'block';
})

let userrecognised = false
let uname = 'turtle'
let myexp729373 = 0

socket.on('user recognised', ()=>{
    userrecognised = true;
})

socket.on('alldata', (data)=>{
    data.forEach(row => {
        let slot = document.createElement('div');
        slot.classList.add('slot')
        page.appendChild(slot);
        let exp = document.createElement('div');
        exp.classList.add('exp')
        exp.textContent = row.num
        exp.id = row.name
        slot.style.backgroundColor = colour(row.num)
        if(userrecognised == true){
            if(row.Id == localStorage.getItem("userId")){
                exp.id = row.Id
                uname = row.name
                myexp729373 = row.num
            }
             
        }
        slot.appendChild(exp);
        let tag = document.createElement('div');
        tag.classList.add('name')
        tag.textContent = row.name
        slot.appendChild(tag);
    });
    if(userrecognised == true){
        const mySlot = document.getElementById(localStorage.getItem("userId"))
        if(mySlot !== null){
            page.scrollTop = mySlot.offsetTop - (height*0.5) +50
            page.scrollLeft = mySlot.offsetLeft - (width*0.5) +50
        }else{
            alert("Your id wasn't found in the database, please clear your local storage for this site to make a new one")
        }
    }
})

const login = document.getElementById('login')
const usernamein = login.elements['username']

login.onsubmit = function validate(){
    const errbox = document.getElementById('error')
    uname = usernamein.value
    if(uname == ''){
        errbox.textContent = 'Enter a username.'
        errbox.style.display = 'block';
        document.addEventListener('click', (e) =>{
            errbox.style.display = 'none'
            document.removeEventListener('click', (e))
        })
    }
    else{
        socket.emit('usernamein', uname)}
    return false;
}

socket.on('nametaken', (e)=>{
    const errbox = document.getElementById('error')
    errbox.textContent = 'That username is taken.'
    errbox.style.display = 'block';
    document.addEventListener('click', (g) =>{
        errbox.style.display = 'none'
        document.removeEventListener('click', (g))
    })

})

socket.on('badname', ()=>{
    const errbox = document.getElementById('error')
    errbox.textContent = 'That username is inappropriate.'
    errbox.style.display = 'block';
    document.addEventListener('click', (g) =>{
        errbox.style.display = 'none'
        document.removeEventListener('click', (g))
    })
})

socket.on('namevalid', (id)=>{
    popup.style.display = 'none'
    localStorage.setItem("userId", id);
    console.log('set')
    let userslot = document.createElement('div');
    userslot.classList.add('slot')
    page.appendChild(userslot)
    let userexp = document.createElement('div');
    userexp.classList.add('exp')
    userexp.id = localStorage.getItem('userId')
    userexp.textContent = '0'
    userslot.appendChild(userexp)
    let usertag = document.createElement('div');
    usertag.classList.add('name')
    usertag.textContent = uname
    userslot.appendChild(usertag);
    page.scrollTop = userslot.offsetTop - (height*0.5) +50
    page.scrollLeft = userslot.offsetLeft - (width*0.5) +50
    document.body.style.zoom = 200%
    
    socket.emit('newuser',uname)
    let hint = document.getElementById('hint')
    hint.style.display = 'inline'
})

socket.on('ping', (pingdata)=>{
    pingdata.forEach(row =>{
        let exp = document.getElementById(row.name)
        if( exp !== null){
            exp.textContent = row.num
            let slot = exp.parentElement
            slot.style.backgroundColor = colour(row.num)
            if(row.num >= 200000000){
                slot.style.backgroundColor = 'gold'
                
            }
        }
    });
    let myId = localStorage.getItem('userId')
    let myexp = document.getElementById(myId)
    if( myexp !== null){
        if(Number.isInteger(Number(myexp729373)) == false){
            myexp.textContent = 0
        }
        socket.emit('clientping',myexp729373,myId)
        if(myexp729373 >= 200000000){
            let myslot = myexp.parentElement
            myslot.style.backgroundcolor = 'gold'
    
        }
    }
    const top0 = document.getElementById('topexp0')
    const top1 = document.getElementById('topexp1')
    const top2 = document.getElementById('topexp2')
    const top3 = document.getElementById('topexp3')
    const top4 = document.getElementById('topexp4')
    if(top0.textContent >= 200000000){
        top0.style.color = 'gold'
        top0.style.fontWeight = 'bold'
    }
    if(top1.textContent >= 200000000){
        top1.style.color = 'gold'
        top1.style.fontWeight = 'bold'
    }
    if(top2.textContent >= 200000000){
        top2.style.color = 'gold'
        top2.style.fontWeight = 'bold'
    }
    if(top3.textContent >= 200000000){
        top3.style.color = 'gold'
        top3.style.fontWeight = 'bold'
    }
    if(top3.textContent >= 200000000){
        top3.style.color = 'gold'
        top3.style.fontWeight = 'bold'
    }
    if(top4.textContent >= 200000000){
        top4.style.color = 'gold'
        top4.style.fontWeight = 'bold'
    }
    
});

socket.on('newuserout',(newname)=>{
    let newslot = document.createElement('div');
    newslot.classList.add('slot')
    page.appendChild(newslot)
    let newexp = document.createElement('div');
    newexp.classList.add('exp')
    newexp.id = newname
    newexp.textContent = '0'
    newslot.appendChild(newexp)
    let newtag = document.createElement('div');
    newtag.classList.add('name')
    newtag.textContent = newname
    newslot.appendChild(newtag);
})

const daycount = document.getElementById('day')
let daynow = Date.now()
let day = Math.round((daynow - 1648587139770) / (1000 * 60 * 60 * 24));
daycount.textContent = 'Day:'+day
daycount.title = 'Highest feasable score is ≈'+day*201600 
// 201600 is average of 3 10s spams multiplied by 10h per day
// with this formula gold would take 992 days!

let leaderopen = false
let infoopen = false

const sharebtn = document.getElementById('share')
const sharepopup = document.getElementById('sharepopup')

sharebtn.onclick = ()=>{
    const myID = localStorage.getItem("userId")
    const myexp = document.getElementById(myID)
    leaderdrop.style.display = 'none'
    leaderopen = false
    infodrop.style.display = 'none'
    infoopen = false

    if(myID !== null){
        navigator.clipboard.writeText('SpacebarMMO Name:'+uname+' Score:'+myexp.textContent+' https://spacebarmmo.com')
        sharepopup.textContent = 'Copied link to clipboard.'
        sharepopup.style.display = 'inline-block';
    }
    else{
        sharepopup.textContent = 'Play the game first.'
        sharepopup.style.display = 'inline-block';
    }
}
sharebtn.onmouseleave = () =>{
    sharepopup.style.display = 'none'
}

const leaderbtn = document.getElementById('leaderboard')
const leaderdrop = document.getElementById('leaderdrop')
const leaderclose = document.getElementById('leaderclose')

leaderbtn.onclick = ()=>{
    infodrop.style.display = 'none'
    infoopen = false
    if(leaderopen == true){   
        leaderdrop.style.display = 'none'
        leaderopen = false
    }
    else{
        leaderdrop.style.display = 'flex'
        leaderopen = true
    }
}

leaderclose.onclick = ()=>{
    leaderdrop.style.display = 'none';
    leaderopen = false
}

socket.on('leaderout',(top5)=>{
    for (let i in [0,1,2,3,4]){
        let leadername = document.getElementById('topname'+i)
        if(top5[i] !== undefined){
            leadername.textContent = top5[i].name
        }
        let leaderexp = document.getElementById('topexp'+i)
        if(top5[i] !== undefined){
            leaderexp.textContent = top5[i].num
        }
    }
})

const info = document.getElementById('info')
const infodrop = document.getElementById('infodrop')
const infoclose = document.getElementById('infoclose')

info.onclick = ()=>{
    leaderdrop.style.display = 'none'
    leaderopen = false

    if(infoopen == true){
        infodrop.style.display = 'none'
        infoopen = false
    }
    else{
        infodrop.style.display = 'block'
        infoopen = true
    }
    
}

infoclose.onclick = () =>{
    infodrop.style.display = 'none'
    infoopen = false
}

//leaderboard buttons

const topbtn0 = document.getElementById('leaderbtn0')
const topbtn1 = document.getElementById('leaderbtn1')
const topbtn2 = document.getElementById('leaderbtn2')
const topbtn3 = document.getElementById('leaderbtn3')
const topbtn4 = document.getElementById('leaderbtn4')

const width  = window.innerWidth || document.documentElement.clientWidth || 
document.body.clientWidth;
const height = window.innerHeight|| document.documentElement.clientHeight|| 
document.body.clientHeight;

topbtn0.onclick = () =>{
    let top0name = document.getElementById('topname0').textContent
    if(top0name !==null){
    let top0slot = document.getElementById(top0name)
    if(top0slot == null){
        let top0id = localStorage.getItem("userId")
        top0slot =  document.getElementById(top0id)
    }
    if(top0slot !==null){
    page.scrollTop = top0slot.offsetTop - (height*0.5) +50
    page.scrollLeft = top0slot.offsetLeft - (width*0.5) +50
    }
}}

topbtn1.onclick = () =>{
    let top1name = document.getElementById('topname1').textContent
    if(top1name !==null){
    let top1slot = document.getElementById(top1name)
    if(top1slot == null){
        let top1id = localStorage.getItem("userId")
        top1slot =  document.getElementById(top1id)
    }
    if(top1slot !==null){
    page.scrollTop = top1slot.offsetTop - (height*0.5) +50
    page.scrollLeft = top1slot.offsetLeft - (width*0.5) +50
    }
}}

topbtn2.onclick = () =>{
    let top2name = document.getElementById('topname2').textContent
    if(top2name !==null){
    let top2slot = document.getElementById(top2name)
    if(top2slot == null){
        let top2id = localStorage.getItem("userId")
        top2slot =  document.getElementById(top2id)
    }
    if(top2slot !==null){
    page.scrollTop = top2slot.offsetTop - (height*0.5) +50
    page.scrollLeft = top2slot.offsetLeft - (width*0.5) +50
    }
}}

topbtn3.onclick = () =>{
    let top3name = document.getElementById('topname3').textContent
    if(top3name !==null){
    let top3slot = document.getElementById(top3name)
    if(top3slot == null){
        let top3id = localStorage.getItem("userId")
        top3slot =  document.getElementById(top3id)
    }
    if(top3slot !==null){
    page.scrollTop = top3slot.offsetTop - (height*0.5) +50
    page.scrollLeft = top3slot.offsetLeft - (width*0.5) +50
    }
}}

topbtn4.onclick = () =>{
    let top4name = document.getElementById('topname4').textContent
    if(top4name !==null){
    let top4slot = document.getElementById(top4name)
    if(top4slot == null){
        let top4id = localStorage.getItem("userId")
        top4slot =  document.getElementById(top4id)
    }
    if(top4slot !==null){
    page.scrollTop = top4slot.offsetTop - (height*0.5) +50
    page.scrollLeft = top4slot.offsetLeft - (width*0.5) +50
    }
}}


const locatebtn = document.getElementById('locate')

locatebtn.onclick = () => {
    const myID = localStorage.getItem("userId")
    if(myID !== null){
        let mySlot = document.getElementById(myID)
        page.scrollTop = mySlot.offsetTop - (height*0.5) +50
        page.scrollLeft = mySlot.offsetLeft - (width*0.5) +50
    }
}

const togglespace = document.getElementById('togglespace')
const mobilespace = document.getElementById('mobilespace')
let spaceopen = false

togglespace.onclick = () =>{
    
    if(spaceopen == false){
        mobilespace.style.display = 'block'
        spaceopen = true
    }
    else{
        mobilespace.style.display = 'none'
        spaceopen = false
    }
}


socket.io.on('reconnect',(attempt)=>{
    window.location.reload();
})

//game

let hint = document.getElementById('hint')
document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
      hint.style.display = 'none' 
      const myId = localStorage.getItem("userId")
       if(myId !== null){
        let exp = document.getElementById(myId)
        if(exp !== null){
            myexp729373++
            exp.textContent = myexp729373
            let slot = exp.parentElement
            slot.style.backgroundColor = colour(myexp729373)
            fetch(caturl,{headers: {
                'x-api-key': apikey
              }}).then((response) => {
                return response.json();
              }).then((data) => { 
                  slot.style.backgroundImage = `url(${data[0].url}`
                  slot.style.color = "var(--darkblue)"
               })
        }
       }
    }
  })

mobilespace.onclick = () =>{
    const myId = localStorage.getItem('userId')
    hint.style.display = 'none'
    if(myId !== null){
        let exp = document.getElementById(myId)
    if(exp !== null){
        myexp729373++
        exp.textContent = myexp729373
        let slot = exp.parentElement
        slot.style.backgroundColor = colour(myexp729373)
        fetch(caturl,{headers: {
            'x-api-key': apikey
          }}).then((response) => {
            return response.json();
          }).then((data) => { 
              slot.style.backgroundImage = `url(${data[0].url}`
              slot.style.color = "var(--darkblue)"
           })
         
    }
  }
}

function colour(input){ 
    let out = [0,0,0]
    out[0] = Math.round(109 - 10*((-1)**input))
    out[1] = Math.round(142 + 40*((-1)**input))
    out[2] = (230 + 50*(Math.round(Math.cos(0.0005*input)-1)))
    return `rgb(${out[0]},${out[1]},${out[2]})` 
}

