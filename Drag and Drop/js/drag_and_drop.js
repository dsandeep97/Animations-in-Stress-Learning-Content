function displayFeedback(answer,colorScheme){
    var im = document.getElementById("image")
    var div = document.createElement('div');
    div.id = "feedback"
    div.textContent = answer;
    div.style = `text-align:center; font-size: 20px; ${colorScheme} font-weight:600`
    document.body.insertBefore(div,im)
    // document.body.appendChild(div);
    setTimeout(function(){
        document.getElementById(div.id).outerHTML = "";
    }, 2000)
}
function allowDrop(ev) {
ev.preventDefault();  
}
function drag(ev) {
ev.dataTransfer.setData("text", ev.target.id);
}
function drop(ev) {
    ev.preventDefault();
    var wordbank_size = document.getElementById("wordBank").children.length
    var data = ev.dataTransfer.getData("text");
    var childCount = ev.target.children.length
    var location = ev.target.id
    var text = document.getElementById(data)
    if(location == "spot1" && text.id == "drag2")  // Cell Body
    {
        text.style = "text-align:center;"
        ev.target.appendChild(text);
        if(wordbank_size == 0)
        {
            displayFeedback("Congrats!", "color:green;")
        }
    }
    else if(location == "spot2" && text.id == "drag5") // Nucleus
    {
        text.style = "text-align:center;"
        ev.target.appendChild(text);
        if(wordbank_size == 0)
        {
            displayFeedback("Congrats!", "color:green;")
        }
    }
    else if(location == "spot3" && text.id == "drag4") // Dendrite
    {
        text.style = "text-align:center;"
        ev.target.appendChild(text);
        if(wordbank_size == 0)
        {
            displayFeedback("Congrats!", "color:green;")
        }
    }
    else if(location == "spot4" && text.id == "drag7") // to
    {
        text.style = "text-align:center;"
        ev.target.appendChild(text);
        if(wordbank_size == 0)
        {
            displayFeedback("Congrats!", "color:green;")
        }
    }
    else if(location == "spot5" && text.id == "drag1") // Axon
    {
        text.style = "text-align:center;"
        ev.target.appendChild(text);
        if(wordbank_size == 0)
        {
            displayFeedback("Congrats!", "color:green;")
        }
    }
    else if(location == "spot6" && text.id == "drag6") // away
    {
        text.style = "text-align:center;"
        ev.target.appendChild(text);
        if(wordbank_size == 0)
        {
            displayFeedback("Congrats!", "color:green;")
        }
    }
    else if(location == "spot7" && text.id == "drag3") // Synapse
    {
        text.style = "text-align:center;"
        ev.target.appendChild(text);
        if(wordbank_size == 0)
        {
            displayFeedback("Congrats!", "color:green;")
        }
    }
    else if(location == "spot8" && text.id == "drag8") // across
    {
        text.style = "text-align:center;"
        ev.target.appendChild(text);
        if(wordbank_size == 0)
        {
            displayFeedback("Congrats!", "color:green;")
        }
    }
    else
    {
        displayFeedback("Incorrect! Try Again!", "color:red;")
    }
}