let move = false;
let addRow = function () {
    let rows = document.getElementById("rows"),
        newRow = document.createElement("div"),
        userInput = document.getElementsByTagName("input")[0].value;
    rows.append(document.createElement("br"));
    newRow.innerHTML = getDynamicRow(userInput);
    rows.append(newRow);
};
let getDynamicRow = function (userInput) {
    let resultElements = [],
        words = userInput.split(' ');
    for (let wordNum = 0; wordNum < words.length; wordNum++) {
        let chars = words[wordNum].split('');
        for (let charNum = 0; charNum < chars.length; charNum++) {
            resultElements.push(
                `<span class="single-char" data-word-num="${wordNum}" data-char-num="${charNum}">${chars[charNum]}</span>`
            );

        }
        resultElements.push('<span>&nbsp;</span>');
    }
    return resultElements.join('');
};

let moveChar = function (event) {
    if (event.type === 'click') {
        if (move) {
            let closestChars = document.elementsFromPoint(event.pageX, event.pageY).filter((element) => {
                return element.classList.contains('single-char') && !element.classList.contains('moving')
            });
            if (closestChars.length > 0) {
                swapCharPosition(document.getElementsByClassName('moving')[0], closestChars[0]);
                move = false;
                for (let elem of document.getElementsByClassName('moving')) {
                    elem.classList.remove('moving');
                }
            }
        } else {
            let coordinates = event.target.getBoundingClientRect();
            event.target.setAttribute('data-left', coordinates.x);
            event.target.setAttribute('data-top', coordinates.y);
            event.target.addEventListener('mousemove', moveChar);
            event.target.classList.add('moving');
            move = true;
        }
    } else if (event.type === 'mousemove') {
        event.target.style.position = 'fixed';
        event.target.style.left = (event.pageX - 15) + 'px';
        event.target.style.top = (event.pageY - 15) + 'px';
    }
};


let swapCharPosition = (movingChar, toSwapChar) => {
    movingChar.setAttribute('ready', false);
    toSwapChar.setAttribute('ready', false);

    let temp = toSwapChar.outerHTML;
    movingChar.style.position = '';
    toSwapChar.outerHTML = movingChar.outerHTML;
    movingChar.outerHTML = temp;
    document.querySelectorAll('[ready="false"]').forEach((elem) => {
        elem.addEventListener('click', moveChar);
    });
}

let addEvents = () => {
    let chars = document.getElementsByClassName('single-char');
    for (let idx = 0; idx < chars.length; idx++) {
        chars[idx].addEventListener('click', moveChar);
        chars[idx].setAttribute('ready', true);
    }
}

// Events
document.querySelector('button').addEventListener('click', (event) => {
    addRow();
    addEvents();
});
