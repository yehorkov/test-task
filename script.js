let move = false;

function addNewRow () {
    let rows = document.getElementById("rows"),
        newRow = document.createElement("div"),
        userInput = document.getElementsByTagName("input")[0].value;
    rows.append(document.createElement("br"));
    newRow.innerHTML = getDynamicRow(userInput);
    rows.append(newRow);
};

function getDynamicRow (userInput) {
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

function moveLetter (event) {
    if (event.type === 'click') {

        if (move) {
            let closestChars = document.elementsFromPoint(event.pageX, event.pageY).filter((element) => {
                return element.classList.contains('single-char') && !element.classList.contains('moving');
            });
            if (closestChars.length > 0) {
                swapLetterPosition(document.getElementsByClassName('moving')[0], closestChars[0]);
            }
            stopMoving(event.target);
        } else {
            prepareToMove(event.target);
        }
    } else if (event.type === 'mousemove') {
        event.target.style.position = 'fixed';
        event.target.style.left = (event.pageX - 15) + 'px';
        event.target.style.top = (event.pageY - 15) + 'px';
    }
};

function stopMoving (charElem) {
    move = false;
    for (let elem of document.getElementsByClassName('moving')) {
        elem.classList.remove('moving');
        elem.removeEventListener('mousemove', moveLetter);
    }
}

function prepareToMove (charElem) {
    let coordinates = charElem.getBoundingClientRect();
    charElem.setAttribute('data-left', coordinates.x);
    charElem.setAttribute('data-top', coordinates.y);
    charElem.addEventListener('mousemove', moveLetter);
    charElem.classList.add('moving');
    move = true;

}

function swapLetterPosition (movingChar, toSwapChar) {
    movingChar.setAttribute('data-ready', false);
    toSwapChar.setAttribute('data-ready', false);
    if (toSwapChar.style.position) {
        let temp = toSwapChar.innerHTML;
        toSwapChar.innerHTML = movingChar.innerHTML;
        movingChar.innerHTML = temp;
        movingChar.style.position = '';
        movingChar.style.top = '';
        movingChar.style.left = '';
    } else {
        let temp = toSwapChar.outerHTML;
        movingChar.style.position = '';
        movingChar.style.top = '';
        movingChar.style.left = '';
        toSwapChar.outerHTML = movingChar.outerHTML;
        movingChar.outerHTML = temp;
        document.querySelectorAll('[data-ready="false"]').forEach((elem) => {
            elem.addEventListener('click', moveLetter);
            elem.setAttribute('data-ready', true);
        });
    }
}

function addEvents () {
    let chars = document.getElementsByClassName('single-char');
    for (let i = 0; i < chars.length; i++) {
        chars[i].addEventListener('click', moveLetter);
        chars[i].setAttribute('data-ready', true);
    }
}

document.querySelector('button').addEventListener('click', () => {
    addNewRow();
    addEvents();
});
