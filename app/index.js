const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const turn = document.querySelector(".turn");
canvas.width = 310;
canvas.height = 310;
// true = 0
// false = x
let turnState = true;


const turnChange = () =>{
    turnState = turnState ? false : true;
    if(turnState){
        turn.innerText = '1P'
        return;
    }
    turn.innerText = '2P'

}


// 그리기 
let gameBoard = [];
const boardDrawing = () => {
    ctx.beginPath();
    for(let i = 1; i < 3; i++){
        ctx.moveTo(5, 100 * i);
        ctx.lineTo(300 , 100 * i);
        ctx.moveTo(100 * i, 5 );
        ctx.lineTo(100 * i, 300);
    }
    ctx.lineCap = 'round'; 
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000'; 
    ctx.stroke();
    for(let i = 0; i < 3; i++){
        gameBoard.push([]);
        for(let j = 0; j < 3; j++){
            gameBoard[i].push(0); 
        }
    }
};
boardDrawing();


// Y좌표 찾아주기
const listenerY = (ey) => {
    let yNum = 0;
    if(ey < 100){
        yNum = 0;
        return yNum;
    }
    if(ey < 200){
        yNum = 1;
        return yNum;
    }
    if(ey < 300){
        yNum = 2;
        return yNum;
    }
}

// X좌표찾기 및 함수호출
const listener = (e) => {
    turnChange();
    const setX = e.offsetX;
    const setY = e.offsetY;
   
    let xNum = 0;
    if(setX < 300){
        xNum = 2;
    }
    if(setX < 200){
        xNum = 1;
    }
    if(setX < 100){
        xNum = 0;
    }
    let yNum = listenerY(setY);
    boardClick(xNum, yNum);
};
//초기화 파라미터 없음
//진짜 그려주는 함수 gameboard
//조건 검사 함수 배열
const boardClick = (xNum, yNum) => {  
    if(gameBoard[xNum][yNum] == 0){
        if(turnState){
            gameBoard[yNum][xNum] = 'o';
        }else{
            gameBoard[yNum][xNum] = 'x';
        }
    }
    
};


canvas.addEventListener('click', (e) => listener(e));
