let text = document.querySelector("input");
let button = document.querySelector("button");

let treeContainer = document.getElementById("treeContainer");

button.addEventListener("click", () => {
  let treeInput = text.value;
  let tree = parseTree(treeInput);
  renderTree(treeContainer, tree);
});

function parseTree(treeString) {
  let result = "";
  for (let i = 0; i < treeString.length; i++) {
    if (treeString[i] === "(") {
      result += "[";
    } else if (treeString[i] === ")") {
      result += "]";
    } else if (treeString[i] === " ") {
      result += ",";
    } else {
      result += treeString[i];
    }
  }
  try {
    return JSON.parse(result);
  } catch (error) {
    return ["Ошибка, введите корректный запрос"];
  }
}

// (1 (2 (4 5 6 (7) 108 (9)) 3))
// (1)
// (1 (2))
// (1 2)
// (1 (2000000 (3)))

function buildTree(node, level = 0) {
  let str = "";
  if (typeof node === "object") {
    str += level === 0 ? "" : "---+";
    for (const element of node) {
      str += buildTree(element, level + 1);
    }
  } else {
    str += "\n";
    for (let i = 1; i < level; i++) {
      str += "      ";
    }
    str += node;
  }

  return str;
}

function renderTree(container, tree) {
  container.innerHTML = "";
  let test = buildTree(tree);
  let pre = document.createElement("pre");
  pre.textContent = test;
  container.appendChild(pre);
}
