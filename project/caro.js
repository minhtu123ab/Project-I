
// Xử lý login phần lựa chọn
const instruct = document.getElementById("instruct");
const instructAll = document.getElementById("instruct-all");
const closeInstruct = document.getElementById("close");
instruct.addEventListener("click",function(){
    instructAll.style.display = "block";
});
closeInstruct.addEventListener("click",function(){
    instructAll.style.display = "none";
});

const bodyOne = document.getElementById("body-1");
const bodyTwo = document.getElementById("body-2");
const btnMain = document.getElementById("play");
const btnLogin = document.getElementById("back-login");

btnMain.addEventListener("click",function(){
    bodyOne.style.display = "none";
    bodyTwo.style.display = "block";
})
btnLogin.addEventListener("click",function(){
    bodyTwo.style.display = "none";
    bodyOne.style.display = "block";
})


// Xử lý login của trò chơi
const squareCaroTd = document.querySelectorAll("td");
const squareCaroTable = document.querySelector("table");
const buttonReset = document.getElementById("resetGame");
const countTisoX = document.getElementById("countX");
const countTisoY = document.getElementById("countY");
const overlayX = document.getElementById("overlay-X");
const overlayO = document.getElementById("overlay-O");
const btnWinX = document.getElementById("WinX");
const btnWinO = document.getElementById("WinO");
const noClick = document.getElementById("no-click-id");
let checkHoa = 0;
let count = 0;
let countX = 0;
let countY = 0;
let currentMove = { row: -1, col: -1 }; // Khởi tạo với một vị trí không hợp lệ
document.getElementById("agreeBtn").addEventListener("click", agreeAction);
document.getElementById("disagreeBtn").addEventListener("click", disagreeAction);
function openWinX(){
    overlayX.style.display = "flex";
};
function closeWinX(){
    overlayX.style.display = "none";
};
function closeNoClick(){
    noClick.style.display = "none";
};
function openNoClick(){
    noClick.style.display = "flex";
    setTimeout(closeNoClick,3000);
};
function openWinO(){
    overlayO.style.display = "flex";
};
function closeWinO(){
    overlayO.style.display = "none";
};
function btnWinAll(event){
    if(event.keyCode == 13){
        btnWinX.click();
        btnWinO.click();
    }
};
document.addEventListener("keypress",btnWinAll);
btnWinX.addEventListener("click",function(){
    closeWinX();
});
btnWinO.addEventListener("click",function(){
    closeWinO();
});


function openModal() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
};

function closeOverlay() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
};

function agreeAction() {
    resetGame();
    countTisoX.textContent = 0;
    countTisoY.textContent = 0;
    closeOverlay();
};

function disagreeAction() {
    closeOverlay();
};

buttonReset.addEventListener("click", function () {
    openModal();
});

let arrCaro = [];
for (let i = 0; i < 16; i++) {
    let rowArray = [];
    for (let j = 0; j < 16; j++) {
        rowArray.push("");
    }
    arrCaro.push(rowArray);
}

squareCaroTd.forEach(function (Cell, index) {
    Cell.addEventListener("click", function (event) {
        event.preventDefault();
        const rowIndex = Math.floor(index / 16);
        const colIndex = index % 16;

        if (arrCaro[rowIndex][colIndex] === "") {
            let XO = document.createElement("span");
            XO.classList.add("itemXO");

            if (count % 2 === 0) {
                XO.textContent = "X";
                XO.style.color = "red";
                XO.style.fontWeight = "bold";
                Cell.appendChild(XO);
                arrCaro[rowIndex][colIndex] = "X";
                count++;
                checkHoa++;
            } else {
                XO.textContent = "O";
                XO.style.color = "green";
                XO.style.fontWeight = "bold";
                Cell.appendChild(XO);
                arrCaro[rowIndex][colIndex] = "O";
                count++;
                checkHoa++;
            }

            currentMove = { row: rowIndex, col: colIndex }; // Cập nhật vị trí nước đi hiện tại

            if (checkWin("X")) {
                openWinX();
                countX++;
                countTisoX.textContent = countX;
                resetGame();
            } else if (checkWin("O")) {
                openWinO();
                countY++;
                countTisoY.textContent = countY;
                resetGame();
            } else if(checkHoa == 256){
                alert("Trò chơi hòa, nhấn Enter để chơi lại");
                checkHoa = 0;
                resetGame();
            }
        } else {
            openNoClick();
        }
    });
});

function checkWin(key) {
    const rowIndex = currentMove.row;
    const colIndex = currentMove.col;

    // Kiểm tra các hàng
    let count1 = 0;
    for (let j = Math.max(colIndex - 4, 0); j <= Math.min(colIndex + 4, 15); j++) {
        if (arrCaro[rowIndex][j] === key) {
            count1++;
            if (count1 === 5) return true;
        } else {
            count1 = 0;
        }
    }

    // Kiểm tra các cột
    count1 = 0;
    for (let i = Math.max(rowIndex - 4, 0); i <= Math.min(rowIndex + 4, 15); i++) {
        if (arrCaro[i][colIndex] === key) {
            count1++;
            if (count1 === 5) return true;
        } else {
            count1 = 0;
        }
    }

    // Kiểm tra đường chéo \
    count1 = 0;
    for (let i = -4; i <= 4; i++) {
        const row = rowIndex + i;
        const col = colIndex + i;
        if (row >= 0 && row < 16 && col >= 0 && col < 16 && arrCaro[row][col] === key) {
            count1++;
            if (count1 === 5) return true;
        } else {
            count1 = 0;
        }
    }

    // Kiểm tra đường chéo /
    count1 = 0;
    for (let i = -4; i <= 4; i++) {
        const row = rowIndex + i;
        const col = colIndex - i;
        if (row >= 0 && row < 16 && col >= 0 && col < 16 && arrCaro[row][col] === key) {
            count1++;
            if (count1 === 5) return true;
        } else {
            count1 = 0;
        }
    }

    return false;
}

function resetGame() {
    count = 0;
    currentMove = { row: -1, col: -1 };
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            arrCaro[i][j] = "";
        }
    }
    squareCaroTd.forEach(function (Cell) {
        Cell.textContent = "";
    });
}
