import Tree from "./tree.js";

const arr = (() => {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
})();

const tree = new Tree(arr);
// console.log(arr);
// console.log(tree.root);
tree.prettyPrint(tree.root);
// tree.isBalanced(tree.root) ? console.log("Tree is balanced") : console.log("Tree is not balanced");

tree.levelOrder((node) => console.log(node.val));

for (let i = 100; i < 200; i++) {
  tree.insert(tree.root, i);
}

// tree.isBalanced(tree.root) ? console.log("Tree is balanced") : console.log("Tree is not balanced");
// tree.prettyPrint(tree.root);
tree.rebalance();
// tree.prettyPrint(tree.root);
// tree.isBalanced(tree.root) ? console.log("Tree is balanced") : console.log("Tree is not balanced");

// tree.inorder(console.log);
// tree.preorder(console.log);
// tree.postorder(console.log);