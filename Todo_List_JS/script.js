const inputText = document.querySelector('#input-box');
const buttonAdd = document.querySelector('button');
const listTodo = document.querySelector('#list-container');
let currentTotalTasks = parseInt(document.querySelector('#tasks-count-value').innerHTML);

function handleListClick(e) {
    if(e.target.classList.contains('check')) {
        toggleTaskState(e.target);
    } else if (e.target.classList.contains('remove')){
        removeTask(e.target);
    }
}

function toggleTaskState(target) {
    const currentLine = target.parentNode.parentNode.parentNode;
    if (currentLine.classList.contains('completed')) {
        target.classList.add('fa-check');
        target.classList.remove('fa-x');
        currentLine.classList.remove('completed');
    } else {
        target.classList.remove('fa-check');
        target.classList.add('fa-x');
        currentLine.classList.add('completed');
    }
}

function addNewTask() {
    const inputTextValue = inputText.value;
    if(inputTextValue.trim() === '') {
        alert('please fill in the field');
    } else {
        const li = document.createElement('li');
        li.innerHTML = inputTextValue;
        const blockButtons = document.createElement('div');
        blockButtons.classList.add('block-button');
        const updateButton = createUpdateButton();
        blockButtons.appendChild(updateButton);
        const removeButton = createRemoveButton();
        blockButtons.appendChild(removeButton);
        li.appendChild(blockButtons);
        listTodo.appendChild(li);
        inputText.value = '';
        updateTaskCount(1);
    }
}



function removeTask(target) {
    const currentLine = target.parentNode.parentNode.parentNode;
    currentLine.remove();
    updateTaskCount(-1);
    console.log(currentLine);
}

function createUpdateButton() {
    const updateButton = document.createElement('span');
    const checkButton = document.createElement('i');
    checkButton.classList.add('fa-solid', 'fa-check', 'check');
    updateButton.appendChild(checkButton);
    return updateButton;
}

function createRemoveButton() {
    const removeBlock = document.createElement('span');
    const removeButton = document.createElement('i');
    removeButton.classList.add('fa-solid', 'fa-trash', 'remove');
    removeBlock.appendChild(removeButton);
    return removeBlock;
}

function updateTaskCount(change) {
    currentTotalTasks += change;
    document.querySelector('#tasks-count-value').innerHTML = currentTotalTasks;
}

listTodo.addEventListener('click', handleListClick);
buttonAdd.addEventListener('click', addNewTask);
inputText.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        addNewTask();
    }
});