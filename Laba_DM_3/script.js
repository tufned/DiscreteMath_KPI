const n = graph[0];
const m = graph[1];
const n_column = [];
const m_column = [];

for (let i = 2; i < graph.length; i++) {
    if (i % 2 == 0) n_column.push(graph[i]);
    else m_column.push(graph[i]);
}



// ============ матриця суміжності ============
const adjMatrix = []; // adjacency matrix
let adjRow = [];

for (let i = 1; i <= n; i++) { // ініціалізація матриці (only with 0)
    adjRow = [];
    for (let j = 1; j <= n; j++) {
        adjRow.push(0);
    }
    adjMatrix.push(adjRow);
}


for (let i = 0; i < n_column.length; i++) { // підстановка 1
    adjMatrix[n_column[i]-1][m_column[i]-1] = 1;
}

console.log(`матриця суміжності:`);
console.log(adjMatrix);
// ========================




// ============ матриця відстаней ============
const distMatrix = [];
let distMatrix_row = [];

for (let i = 0; i < n; i++) {
    distMatrix_row = [];
    for (let j = 0; j < n; j++) {
        if (i == j) distMatrix_row.push(0);
        else {
            if (adjMatrix[i][j] == 1) distMatrix_row.push(adjMatrix[i][j]);
            if (adjMatrix[i][j] == 0) distMatrix_row.push(null);
        }
    }
    distMatrix.push(distMatrix_row);
}


let expMatrix_forDist = [];
let iter = 1;

function distMatrixRender() {
    let ckeckOut_main = false;
    let ckeckOut_matrixExpon = false;
    iter++;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (distMatrix[i][j] === null) {
                if (ckeckOut_matrixExpon == false) {
                    matrixExpon(expMatrix_forDist);
                    ckeckOut_matrixExpon = true;
                }
                
                if (expMatrix_forDist[i][j] != 0) distMatrix[i][j] = iter;
                else if (expMatrix_forDist[i][j] == 0) {
                    if (iter == 40) distMatrix[i][j] = 0;
                    ckeckOut_main = true;
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (distMatrix[i][j] == 0 && i !== j) {
                distMatrix[i][j] = -1;
            }
        }
    }

    if (ckeckOut_main == true) distMatrixRender();
    else {
        console.log(`матриця відстані: \n (-1 - немає ніякого зв'язку між цими двома вершинами)`);
        console.log(distMatrix);
    }
}
distMatrixRender();



let expMatrix_forReach = [];

function matrixExpon(matrix) {
    let expMatrix_row = [];
    let expMatrix_num = 0;
    let ckeckOut = String(matrix);
    
    for (let i = 0; i < n; i++) {
        expMatrix_row = [];
        for (let k = 0; k < n; k++) {
            expMatrix_num = 0;
            for (let j = 0; j < n; j++) {
                if (ckeckOut != '') expMatrix_num += matrix[i][j] * adjMatrix[j][k];
                else expMatrix_num += adjMatrix[i][j] * adjMatrix[j][k];
            }
            expMatrix_row.push(expMatrix_num);
        }
        matrix[i] = expMatrix_row;
    }

    // for (let elem of matrix) {
    //     console.log(elem);
    // }
    // console.log(`---`);
}
// ========================



// ============ матриця досяжності ============
const reachMatrix = [];
let reachMatrix_row = [];

for (let i = 0; i < n; i++) {
    reachMatrix_row = [];
    for (let j = 0; j < n; j++) {
        reachMatrix_row.push(adjMatrix[i][j]);
    }
    reachMatrix.push(reachMatrix_row);
}



let ckeckOut_matrixExpon = false;

for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
        if (ckeckOut_matrixExpon == false) {
            matrixExpon(expMatrix_forReach);
            ckeckOut_matrixExpon = true;
        }
        if (expMatrix_forReach[i][j] == 1 && reachMatrix[i][j] == 0) {
            reachMatrix[i][j] = 1;
        }
    }
}
console.log(`матриця досяжності:`);
console.log(reachMatrix);
// ========================