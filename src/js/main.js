import { ui } from "./ui.js";

function testFunction() {
    console.log("testing")
}


ui.start.addEventListener("click", ui.startGame.bind(ui));