/*
Overriding the remove method
http://stackoverflow.com/questions/3387427/remove-element-by-id
*/


Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
    for (var i = this.length - 1; i >= 0; i--) {
        if (this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}


var selectedQuote; //The quote object is initialized
var keysName = []; //the array with the object keys
var shownQuotes; //quotes that have been shown are stored here so that we dont repeat them



//Sets the background-color of the specified dom element to the range : rgba(49, 46, 127, 0.9) - rgba(49, 46, 252, 0.9)
//it is a blueish color
function randomBlueish(elementId) {
    var randomBlue = Math.floor((Math.random() * 125) + 127)

    var rgbaValue = "rgba(49, 46, ";
    rgbaValue += randomBlue;
    rgbaValue += ", 0.9)";

    document.getElementById(elementId).style.backgroundColor = rgbaValue;

}


//returns random object from an arrray
function getRandomQuote() {
    var i = Math.floor((Math.random() * quotes.length));

    if (!shownQuotes) {
        shownQuotes = quotes.slice(0); //if the shownQuotes arrive to 0, fill them up
    }

    selectedQuote = shownQuotes.splice(i, 1)[0];

    

    for (var key in selectedQuote) {
        keysName.push(key);
    }
 console.log(selectedQuote);

}


function displayQuote() {
    for (var index = 0; index < keysName.length; index++) {
        var key = keysName[index];

        var content;

        if (selectedQuote[key]) {

            if (selectedQuote[key].constructor === Array) {
                //join the array content
                content = selectedQuote[key].join(' - ');
            } else {
                content = selectedQuote[key];
            }


        }

        createDomElements(key, content);

    }
}

/*used inside displayQuote() it creates HTML elements and */
function createDomElements(key, content) {
    var newDomElement;


    createDomElement(key, content, "p", "quote", "quote-box");
    createDomElement(key, content, "p", "tags", "quote-box");
    createDomElement(key, content, "span", "author", "source");
    createDomElement(key, content, "span", "citation", "source");
    createDomElement(key, content, "span", "year", "source");


}

//creates a dom element using (key and content) and appends it as a child to the especified parent Element
function createDomElement(key, content, newElementType, conditionKey, parentElementID) {
    if (key == conditionKey) {
        if (document.getElementById(key)) {
            document.getElementById(key).remove();
        }
        newDomElement = document.createElement(newElementType);
        newDomElement.textContent = content;
        newDomElement.className = key;
        newDomElement.setAttribute('id', key);
        document.getElementById(parentElementID).appendChild(newDomElement);
    }
}

//print's the quote and makes the background blueish'
function printQuote() {
    getRandomQuote();
    displayQuote();
    randomBlueish("randomBlueish");
}

//It starts the first quote
printQuote();

//quote is printed every 30 seconds
var intervalID = window.setInterval(printQuote, 30000);

//prints a every time printQuote buttons is cliqued
document.getElementById('loadQuote').addEventListener("click", printQuote, false);