const ipcRenderer = require('electron').ipcRenderer;

const btn = document.getElementById("btn")
const roomIdOutput = document.getElementById("room-id")

const states = { START:"start", STOP:"stop"}
var state = states.STOP
const URL = "http://localhost:3000"

ipcRenderer.on("uuid", (event, id ) => {
    roomIdOutput.value = id
})

ipcRenderer.on("url", (event, url ) => {
    URL = url
})

btn.addEventListener( "click",  function(){

    if( state == states.STOP  ){
        ipcRenderer.send("start-share")
        state = states.START
    }else{
        ipcRenderer.send("stop-share")
        state = states.STOP
    }
    console.log(state)

    btn.innerText = state == states.STOP ? "Start 🟢" : "Stop 🟥"

})

// document.getElementById("copy").addEventListener("click", function(){
//     const txt = roomIdOutput.value
//     navigator.clipboard.writeText(txt)
// })
document.getElementById("copy-link").addEventListener("click", function(){
    const txt = roomIdOutput.value
    navigator.clipboard.writeText(URL+"/view/?id="+txt)
})
