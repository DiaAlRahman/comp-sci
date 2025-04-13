class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }
  buildTree(arr) {
    arr = [...new Set(arr)];
    arr.sort((a, b) => a - b);
    this.root = this.rebalanceHelper(arr)
    return this.root;
  }
  insert(curr, value) {
    if (curr == null) {
      return new Node(value);
    }
    if (value < curr.val) {
      curr.left = this.insert(curr.left, value);
    } else if (value > curr.val) {
      curr.right = this.insert(curr.right, value);
    } else {
      throw console.error(`Value ${value} already exists in the tree.`);
    }
    return curr;
  }
  deleteItem(value) {
    let par = None, curr = this.root;
    while (curr) {
      if (curr.val === value) {
        break;
      }
      par = curr;
      if (value < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    if (!curr.left && !curr.right) {
      if (par.left === curr) {
        par.left = null;
      } else {
        par.right = null;
      }
      return;
    }
    if (curr.left && curr.right) {
      let min = curr.right;
      while (min.left) {
        min = min.left;
      }
      curr.val = min.val;
      this.deleteItem(min.val);
    } else {
      const child = curr.left ? curr.left : curr.right;
      if (par.left === curr) {
        par.left = child;
      } else {
        par.right = child;
      }
      return;
    }
  }
  find(value) {
    let curr = this.root;
    while (curr) {
      if (curr.val === value) {
        return curr;
      }
      if (value < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }
    return null;
  }
  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw console.error('Callback must be a function');
    }
    if (!this.root) { return null; }
    const q = [this.root];
    while (q.length > 0) {
      for (let i = 0; i < q.length; i++) {
        const curr = q.shift();
        callback(curr);
        if (curr.left) {
          q.push(curr.left);
        }
        if (curr.right) {
          q.push(curr.right);
        }
      }
    }
  }
  inorder(callback) {
    // console.log('typeof callback:', typeof callback);
    if (typeof callback !== "function") {
      throw console.error('Callback must be a function');
    }
    if (!this.root) { return null; }
    this.inorderTraversal(this.root, callback);
  }
  inorderTraversal(node, callback) {
    if (!node) { return; }
    this.inorderTraversal(node.left, callback);
    callback(node.val);
    this.inorderTraversal(node.right, callback);
  }
  preorder(callback) {
    if (typeof callback !== "function") {
      throw console.error('Callback must be a function');
    }
    if (!this.root) { return null; }
    this.preorderTraversal(this.root, callback);
  }
  preorderTraversal(node, callback) {
    if (!node) { return; }
    callback(node.val);
    this.preorderTraversal(node.left, callback);
    this.preorderTraversal(node.right, callback);
  }
  postorder(callback) {
    if (typeof callback !== "function") {
      throw console.error('Callback must be a function');
    }
    if (!this.root) { return null; }
    this.postorderTraversal(this.root, callback);
  }
  postorderTraversal(node, callback) {
    if (!node) { return; }
    this.postorderTraversal(node.left, callback);
    this.postorderTraversal(node.right, callback);
    callback(node.val);
  }
  height(value) {
    if (!this.root) { return null; }
    let node = this.find(value);
    return this.calcHeight(node);
  }
  calcHeight(node) {
    if (!node) { return 0; }
    const leftHeight = this.calcHeight(node.left)
    const rightHeight = this.calcHeight(node.right)
    return Math.max(leftHeight, rightHeight) + 1
  }
  depth(value) {
    if (!this.root) { return null; }
    let curr = this.root;
    let depth = 0;
    while (curr) {
      if (curr.val === value) {
        return depth;
      }
      if (value < curr.val) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
      depth++;
    }
  }
  isBalanced(node) {
    if (!node) { return true; }
    const leftHeight = this.calcHeight(node.left);
    const rightHeight = this.calcHeight(node.right);
    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }
    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }
  rebalance() {
    if (!this.root) { return null; }
    const arr = [];
    this.inorder((val) => arr.push(val));
    this.root = this.rebalanceHelper(arr);
  }
  rebalanceHelper(arr) {
    if (!arr.length) { return null; }
    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid]);
    node.left = this.rebalanceHelper(arr.slice(0, mid));
    node.right = this.rebalanceHelper(arr.slice(mid + 1));
    return node;
  }
  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.val}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}