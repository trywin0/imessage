const clocks = document.querySelectorAll(".clock")
clocks.forEach(clock=>{
    clock.innerText = `${new Date().getHours()}:${(new Date().getMinutes()+"").padStart(2,"0")}`
    if(!clock.className.includes("update")) return;
    setInterval(() => {
        clock.innerText = `${new Date().getHours()}:${(new Date().getMinutes()+"").padStart(2,"0")}`
    }, 1000);
})

document.querySelectorAll(".message").forEach(msg=>{
    const drop = document.createElement("i")
    drop.className = "fa fa-tint msg-drop"
    msg.appendChild(drop)
})

const messageContainer = document.querySelector(".messages")

function createMessage(message, sentByUser){
    const msgElement = document.createElement("p")
    msgElement.className = `message ${sentByUser?"se":"re"}`
    msgElement.innerText=message

    const opposite = sentByUser?"re":"se"
    const previousMsg = messageContainer.children[messageContainer.children.length-1]
    const newSender = previousMsg.classList.contains(opposite); // no clue what to name this variable
    if(newSender || !previousMsg.className.includes("message")){
        msgElement.style.marginTop = "10px"
        const drop = document.createElement("i")
        drop.className = "fa fa-tint msg-drop"
        msgElement.appendChild(drop)
    } else if(previousMsg.className.includes("message")) {
        msgElement.style.marginTop = "1px"
        if(previousMsg.children[0])previousMsg.children[0].style.display="none"
        const drop = document.createElement("i")
        drop.className = "fa fa-tint msg-drop"
        msgElement.appendChild(drop)
    }
    messageContainer.appendChild(msgElement)
    messageContainer.scrollTo(0,messageContainer.scrollHeight);

}

const messages = [["This is a shitty IMessage clone.", 1000], ["What do you think about it? Pssst... I'm not gonna respond", 3000]]
messages.forEach(msg=>{
    setTimeout(() => {
        createMessage(msg[0], msg[2]?true:false)
    }, msg[1]);
})

const input = document.querySelector("input")
const sendButton = document.querySelector(".send")

input.onkeydown = (key)=>{
    if(key.key==="Enter"){
        if(!input.value) return;
        createMessage(input.value, true)
        input.value = ""

    }
}

sendButton.onclick= ()=>{
    if(!input.value) return;
    createMessage(input.value, true)
    input.value = ""
}
