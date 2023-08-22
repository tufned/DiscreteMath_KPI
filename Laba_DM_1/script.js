const n = graph[0];
const m = graph[1];
const n_column = [];
const m_column = [];

for (let i = 2; i < graph.length; i++) {
    if (i % 2 == 0) n_column.push(graph[i]);
    else m_column.push(graph[i]);
}

// ============ матриця інцидентності ============ 
const incMatrix = []; // incidence matrix
let incColumn = [];

for (let i = 1; i <= m; i++) { // ініціалізація матриці (only with 0) 
    incColumn = [];
    for (let j = 1; j <= n; j++) {
        incColumn.push(0); 
    }
    incMatrix.push(incColumn);
}

let k = 0;
for (let column of incMatrix) { // підстановка 1
    column[n_column[k]-1] = -1; 
    column[m_column[k]-1] = 1; 
    k++;
}


// ------- Matrix Render -------
const incMatrix_res = []; 
let incRow_res = [];

for (let i = 0; i < n; i++) { 
    incRow_res = [];
    for (let j = 0; j < m; j++) {
        incRow_res.push(incMatrix[j][i]);
    }
    incMatrix_res.push(incRow_res); 
}
console.log(`матриця інцидентності:`);
console.log(incMatrix_res);
// ========================




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

console.log(`-----------------------`);
console.log(`матриця суміжності:`);
console.log(adjMatrix);
// ========================