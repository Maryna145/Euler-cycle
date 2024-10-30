function buildGraph() {
  //отримуємо матрицю суміжності з текстової області
  let input = document.getElementById("matrixInput1").value.trim();
  let rows = input.split("\n");
  let adjacencyMatrix = rows.map(function (row) {
    return row.trim().split(/\s+/).map(Number);
  });

  //коректність матриці
  let size = adjacencyMatrix.length;
  for (let i = 0; i < size; i++) {
    if (adjacencyMatrix[i].length !== size) {
      alert(
        "Матриця повинна бути квадратною (однакова кількість рядків і стовпців)."
      );
      return;
    }
  }

  //тип графа орієнтований чи ні
  let graphType = document.querySelector(
    'input[name="graphType"]:checked'
  ).value;
  let isDirected = graphType === "directed";

  //створення вершин
  let nodes = new vis.DataSet();
  for (let i = 0; i < size; i++) {
    nodes.add({ id: i + 1, label: "x" + (i + 1) });
  }

  //створення ребер за матрицею суміжності
  let edges = new vis.DataSet();
  let edgeIdCounter = 1;
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      let edgeCount = adjacencyMatrix[i][j];
      for (let k = 0; k < edgeCount; k++) {
        //для неорієнтованого графа додаємо одне ребро
        if (!isDirected && i > j) continue;

        edges.add({
          id: edgeIdCounter,
          from: i + 1,
          to: j + 1,
          label: "y" + edgeIdCounter,
          arrows: isDirected ? "to" : undefined,
        });
        edgeIdCounter++;
      }
    }
  }

  //граф
  let container = document.getElementById("mynetwork");
  let data = { nodes: nodes, edges: edges };
  let options = {
    nodes: {
      size: 16,
      font: {
        size: 14,
        color: "#000000",
      },
      borderWidth: 2,
    },
    edges: {
      width: 2,
      color: { inherit: "from" },
      font: {
        size: 12,
        color: "black",
        background: "none",
        strokeWidth: 0,
      },
    },
  };

  new vis.Network(container, data, options);
}

function findEulerianCycle(matrix) {
  //отримуємо матрицю суміжності з текстової області
  let input = document.getElementById("matrixInput1").value.trim();
  let rows = input.split("\n");
  let adjacencyMatrix = rows.map(function (row) {
    return row.trim().split(/\s+/).map(Number);
  }); 
  //перевірка графу на зв'язність
  function dfc() {
    let visited = new Array(adjacencyMatrix.length).fill(false); //масив для відмітки відвіданих вершин

    function dfs(vertex) {
      visited[vertex] = true; //відмічаємо поточну вершину як відвідану

      //проходимо по всіх сусідах
      for (let i = 0; i < adjacencyMatrix[vertex].length; i++) {
        if (adjacencyMatrix[vertex][i] === 1 && !visited[i]) {// перевіряємо, чи є ребро
          dfs(i); //рекурсивний виклик для сусідньої вершини
        }
      }
    }

    // починаємо з першої вершини 
    dfs(0);

    //чи всі вершини були відвідані
    const isConnected = visited.every((v) => v);
    document.querySelector(".inputRes").innerHTML = document.querySelector(
      ".inputRes"
    ).value = `Граф ${isConnected ? "зв'язний" : "не зв'язний"}`;
  }
  //перевірка степенів вершин на парність
  //пошук ейлерового циклу
  dfc();
}


//побудова графа при завантаженні сторінки
window.onload = buildGraph;
