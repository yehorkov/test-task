let moveElement = false;
const submitBtn = document.querySelector('.btn');

submitBtn.addEventListener('click', () => {
    addNewRow('#rows', 'div', 'input', 'br');
    addEvents('.single-letter');
});

function addNewRow (rowsSelector, newElement, inputSelector, lineBreak) {
    const rows = document.querySelector(rowsSelector),
          newRow = document.createElement(newElement),
          userInput = document.querySelectorAll(inputSelector)[0].value,
          lineBreaker = document.createElement(lineBreak);

    rows.append(lineBreaker);
    newRow.innerHTML = getDynamicRow(userInput);
    rows.append(newRow);
};

function addEvents (letterSelector) {
    let letters = document.querySelectorAll(letterSelector);

    for (let i = 0; i < letters.length; i++) {
        letters[i].addEventListener('click', moveLetter);
        letters[i].setAttribute('data-ready', true);
    }
};

function getDynamicRow (userInput) {
    let result = [],
        words = userInput.split(' ');

    for (let i = 0; i < words.length; i++) {
        let letters = words[i].split('');

        for (let j = 0; j < letters.length; j++) {
            result.push(
                `<span class="single-letter" data-word-num="${i}" data-letter-num="${j}">${letters[j]}</span>`
            );

        }

        result.push('<span>&nbsp;</span>');
    }
    return result.join('');
};

function prepareToMove (letterElement) {
    let coordinates = letterElement.getBoundingClientRect();
    letterElement.setAttribute('data-left', coordinates.x);
    letterElement.setAttribute('data-top', coordinates.y);
    letterElement.addEventListener('mousemove', moveLetter);
    letterElement.classList.add('moving');
    moveElement = true;
};

function moveLetter (event) {
    const target = event.target,
          type = event.type,
          movingLetter = document.querySelectorAll('.moving');

    if (type === 'click') {

        if (moveElement) {
            let closestLetters = document.elementsFromPoint(event.pageX, event.pageY).filter((item) => {
                return item.classList.contains('single-letter') && !item.classList.contains('moving');
            });

            if (closestLetters.length > 0) {
                swapLetterPosition(movingLetter[0], closestLetters[0]);
            }

            stopMoving(target, '.moving');
        } else {
            prepareToMove(target);
        }

    } else if (type === 'mousemove') {
        target.style.position = 'fixed';
        target.style.left = (event.pageX - 5) + 'px';
        target.style.top = (event.pageY - 5) + 'px';
    }
};

function stopMoving (letterElement, movingSelector) {
    const movingElements = document.querySelectorAll(movingSelector);
    moveElement = false;

    for (let item of movingElements) {
        item.classList.remove('moving');
        item.removeEventListener('mousemove', moveLetter);
    }
};

function swapLetterPosition (movingLetter, toSwapLetter) {
    movingLetter.setAttribute('data-ready', false);
    toSwapLetter.setAttribute('data-ready', false);
    
    if (toSwapLetter.style.position) {
        let temp = toSwapLetter.innerHTML;
        toSwapLetter.innerHTML = movingLetter.innerHTML;
        movingLetter.innerHTML = temp;
        movingLetter.style.position = '';
        movingLetter.style.top = '';
        movingLetter.style.left = '';
    } else {
        let temp = toSwapLetter.outerHTML;
        movingLetter.style.position = '';
        movingLetter.style.top = '';
        movingLetter.style.left = '';
        toSwapLetter.outerHTML = movingLetter.outerHTML;
        movingLetter.outerHTML = temp;
        document.querySelectorAll('[data-ready').forEach((item) => {
            item.addEventListener('click', moveLetter);
            item.setAttribute('data-ready', true);
        });
    }
};
