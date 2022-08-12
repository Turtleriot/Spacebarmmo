let hint = document.getElementById('hint')
document.addEventListener('keyup', event => {
  hint.style.display = 'none'
    if (event.code === 'Space') { 
      myId = localStorage.getItem("userId")
       if(myId !== null){
        let exp = document.getElementById(myId)
        if(exp !== null){exp.textContent++}
       }
    }
  })

const mobilespace = document.getElementById('mobilespace')

mobilespace.onclick = () =>{
  hint.style.display = 'none'
  myId = localStorage.getItem("userId")
    if(myId !== null){
    let exp = document.getElementById(myId)
    if(exp !== null){exp.textContent++}
  }
}
