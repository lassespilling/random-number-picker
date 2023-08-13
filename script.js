var inputs = document.querySelectorAll('input'); // get the input element
inputs.forEach(input => {
    input.addEventListener('input', resizeInput);
    input.style.opacity = 1;
    resizeInput.call(input);
}) // bind the "resizeInput" callback on "input" event

function resizeInput() {
  this.style.width = this.value.length + "ch";
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let btn = document.querySelector("#spin");
const q = (query) => document.querySelector(query);
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const generateNumbers = () => {
    let val = parseInt(q(".input").value);
    let spinner = q("#spinner");
    spinner.innerHTML = "";
    setTimeout(() => {
        var done = false;
        btn.innerText = "Go back";
        for(let i = 1; i<val+1;i++) {
            let el = document.createElement("span");
            el.innerText = i;
            el.setAttribute("data-val",i);
            spinner.appendChild(el);
            done = true;
        }
        if(done) {
            let i = 1;
            let v = parseInt(q(".input").value);
            let delay = 40;
            let minTime = 0; // Min 0 loops
            let maxTime = (delay * v) * 2; // Max two loops
            let chosenTime = randomIntFromInterval(minTime,maxTime);
            console.log({minTime,maxTime, chosenTime});
            let currentTime = 0;
            let t = 0;
            let loopInterval = setInterval(() => {
                let el = q(`[data-val="${i}"]`);
                document.querySelectorAll("#spinner span").forEach(el => el.classList.remove("highlight"));
                if(el) {el.classList.add("highlight")}
                if(i < v+1) {i+=1} else {i = 1}
                t++;
                currentTime = delay * t;
                // console.log({currentTime, chosenTime});
                if(currentTime >= chosenTime) {
                     clearInterval(loopInterval);
                     // let chosen = getRandomInt(val);
                     // q(`[data-val="${chosen}"]`).classList.add("chosen");
                     q(".highlight").classList.add("chosen");
                     document.body.classList.add("success");  
                }
            },[delay]);
        }
    },100);
}
const row = q(".row");
const spinner = q("#spinner");
const reset = () => {
        document.body.classList.remove("success");
        btn.innerText = "Spin";
        spinner.innerHTML = "";
        row.classList.remove("hide");
        q(".input").value = null;
        q(".input").focus();
}
const confirm = () => {
    let v = q(".input").value;
    let hasVal = v.length > 0 && parseInt(v) > 1;
    if(row.classList.contains("hide")) {
      reset();
    }
    else if(hasVal){
        row.classList.add("hide");
        generateNumbers();
    }
}
btn.addEventListener("click", confirm);
q(".input").addEventListener("keydown", e => {
    if(e.key === "Enter") {
        confirm();
    } 
});
document.addEventListener("keydown", e => {
   if(e.key === "Escape") {
       reset();
   }
})