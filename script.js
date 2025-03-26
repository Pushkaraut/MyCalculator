let display = document.getElementById("display"); //find the div by id and sgtores in var display

let buttons = document.querySelectorAll("button"); //select all buttons in calc

buttons.forEach(function(button) { //loop for each button to print the button content in console
    button.addEventListener("click", function() { //here js listen to clicks and prints the button text when clicked
        let buttonText = button.textContent.trim(); //get button text and remove extra spaces
        
        if (buttonText === "AC") {
            display.textContent = ""; //clear the display
        } else if (buttonText === "=") {
            try {
                let expression = display.textContent
                    .replace(/×/g, "*") // Convert × to *
                    .replace(/÷/g, "/"); // Convert ÷ to /
                
                let result = eval(expression);

                if (!isFinite(result)) {
                    display.textContent = "Error"; // handle division by zero
                } else {
                    display.textContent = result;
                }
            } catch {
                display.textContent = "Invalid"; // handles the invalid inputs
            }
        } else if (buttonText === "⌫") {
            display.textContent = display.textContent.slice(0, -1); // remove the last character

        } else {
            let lastChar = display.textContent.slice(-1); //get last char in display
            let operators = ["+", "-", "*", "/"];

            //prevent adding multiple operators in a row
            if (operators.includes(buttonText)  && operators.includes(lastChar)) {
                return; // do nothin if last character is also an operator
            }
            display.textContent += buttonText; //add button value/text to the display
            console.log("Updated Display:", display.textContent);
        }
    });
});


// For Keyboard buttons
document.addEventListener("keydown", function(event) {
    let key = event.key; //get the pressed key
    let operators = ["+", "-", "*", "/"];

    if(!isNaN(key) || operators.includes(key)) {
        display.textContent += key; // add nums to display
    } else if (key === "Enter") {
        try {
            let expression = display.textContent

            expression = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/");
            let result = eval(expression);
            display.textContent = result;
        } catch {
            display.textContent = "Invalid";
        }
    } else if (key === "Backspace") {
        display.textContent = display.textContent.slice(0, -1); // remove the last char
    } else if (key === "Escape") {
        display.textContent = ""; // clear display
    }
});