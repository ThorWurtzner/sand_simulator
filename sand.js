
const canvas = document.getElementById("sandCanvas");
let ctx = canvas.getContext("2d");

const tileSize = 6;

// Matrix generator ------------------------------
function matrixGen(rows, cols) {
    let m = [];
    
    for (let i = 0; i < rows; i++) {
        m.push([]);
        
        for (let j = 0; j < cols; j++) {
            m[i].push(0);
        }

    }
    
    return m;
}

let map = matrixGen(80, 100)
let tempMap = matrixGen(map.length, map[0].length)

// -----------------------------------------------

canvas.height = map.length * tileSize;
canvas.width = map[0].length * tileSize;


let isMouseDown = false

function drawing(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const col = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);
    
    map[row][col] = 1;
    map[row - 3][col] = 1;
    map[row + 3][col] = 1;
    // map[row][col - 3] = 1;
    // map[row][col + 3] = 1;
}

canvas.addEventListener('mousedown', (e) => {
    isMouseDown = true;
    drawing(e);
});

canvas.addEventListener('mousemove', (e) => {
    if (isMouseDown) {
        drawing(e);
    }
});

canvas.addEventListener('mouseup', () => {
    if (isMouseDown) {
        isMouseDown = false;
    }
});


let backgroundColor = "black"
let sandColor = "Cornsilk";

// // kaldes fra html'en
// function changeColor(value) {
//     sandColor = value;
// }


(function setupCanvas() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            const tile = tempMap[row][col]
            
            if (tile == 0) {
                ctx.fillStyle = backgroundColor;
            }
            
            if (tile == 1) {
                ctx.fillStyle = sandColor;
            }
            
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
        }
    }
})()


function drawCanvas() {
    
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] == 1 && row != map.length - 1) {

                if (map[row + 1][col] == 1) {
                    let d = Math.floor(Math.random() * (2 - 1 + 1) + 1)

                    if (map[row + 1][col - 1] == 0 && map[row + 1][col + 1] == 0) {
                        if (d == 1) {
                            tempMap[row + 1][col - 1] = 1;
                            tempMap[row][col] = 0;
                        } else {
                            tempMap[row + 1][col + 1] = 1;
                            tempMap[row][col] = 0;
                        }
                    } else if (map[row + 1][col - 1] == 0) {
                        tempMap[row + 1][col - 1] = 1;
                        tempMap[row][col] = 0;
                    } else if (map[row + 1][col + 1] == 0) {
                        tempMap[row + 1][col + 1] = 1;
                        tempMap[row][col] = 0;
                    }

                } else {
                    tempMap[row + 1][col] = 1;
                    tempMap[row][col] = 0;
                }

            }
        }
    }

    for (let row = 0; row < tempMap.length; row++) {
        for (let col = 0; col < tempMap[row].length; col++) {
            const tile = tempMap[row][col]
        
            if (tile == 0) {
                ctx.fillStyle = backgroundColor;
            }
        
            if (tile == 1) {
                ctx.fillStyle = sandColor;
            }
        
            ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);

            map[row][col] = tile;
        }
    }
}

setInterval(drawCanvas, 30);
