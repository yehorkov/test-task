let move = false;

let addRow = function () {
    let rows = document.getElementById("rows"),
        newRow = document.createElement("div"),
        wordButton = document.createElement('button'),
        userInput = document.getElementsByTagName("input")[0].value;
    rows.append(document.createElement("br"));
    newRow.classList.add('row');
    wordButton.classList.add('word-btn');
    newRow.innerHTML = getDynamicRow(userInput);
    rows.append(newRow);
    newRow.append(wordButton);
};
let getDynamicRow = function (userInput) {
    let resultElements = [],
        words = userInput.split(' ');
    for (let wordNum = 0; wordNum < words.length; wordNum++) {
        let chars = words[wordNum].split('');
        for (let charNum = 0; charNum < chars.length; charNum++) {
            rows = resultElements.push(
                `<span class="single-char" data-word-num="${wordNum}" data-char-num="${charNum}">${chars[charNum]}</span>`
            );
        }
        console.log(words[wordNum]);
        resultElements.push('<span>&nbsp;</span>');
    }
    return resultElements.join('');
};
let moveChar = function (event) {
    if (event.type === 'click') {
        if (move) {
            event.target.removeEventListener('mousemove', moveChar);
            move = false;
        } else {
            event.target.addEventListener('mousemove', moveChar);
            move = true;
        }
    } else if (event.type === 'mousemove') {
        event.target.style.position = 'fixed';
        event.target.style.left = (event.pageX - 15)+ 'px';
        event.target.style.top = (event.pageY - 20)+ 'px';
    }
};
// Events
document.querySelector('button').addEventListener('click', (event) => {
    addRow();
    let chars = document.getElementsByClassName('single-char');

    for (let idx = 0; idx < chars.length; idx++) {
        chars[idx].addEventListener('click', moveChar);
    }
});