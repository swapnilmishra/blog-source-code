---
title: Building and walking a binary search tree
date: "2016-10-18"
layout: post
path: "/binary-search-tree/"
category: "Algorithms"
description: "In this post we will see how to create a binary search tree from scratch and walk through it. Binary search tree are an important data structure as they allow fast lookup, addition and removal of items and reduces the time complexity to O(logn)."
---

### What is a binary search tree?

In a nutshell a binary search tree is a type of tree with property `left < parent < right` for every node.

### Creating the tree

First let us create a node object which will form the basis of our tree.

```js
function TreeEl() {
    this.left = null  // holds reference of tree's left node
    this.right = null // holds reference of tree's right node
    this.value = null // holds the value of the node
}
```

Just to visualize things in a better perspective, let us assume that we are given a list of numbers to create the binary search tree with. Given below is the list:

`[10, 9, 2, 1, 7, 3, 4, 6, 5, 8]`

Lets create a `makeBinarySearchTree` function which would loop over all these items thereby adding them to tree.

```js
function makeBinarySearchTree(arr) {

    // initialize parent node(which will be 10 in our case) with our tree object
    var parent = new TreeEl();

    for (var i = 0; i < arr.length; i++) {
        // First element of the array forms the parent.
        // Initialize the parent, and continue the loop.
        // Else add the element to its appropriate place
        // in the tree.
        if (i === 0) {
            parent.value = arr[i]
            continue;
        }
        // In all other cases call addNode passing value
        // and parent
        addNode(arr[i], parent)
    }
    // return parent which holds the reference to it.
    return parent;

}
```

`addNode` function shown in the above code snippet is the basis of the tree formation. Given below is the code for `addNode` function:

```js
/*
  {@param : value} value which need to be inserted into the tree
  {@param : value} parent node of the tree
*/
function addNode(value, parent) {
/*
1. Call findNodeToInsert to figure out at what node the value will be inserted.
2. If the value need to be inserted at the left of the returned node create a new tree object at the  left of the returned node and initialize its value.
3. Repeat the same procedure in case the value need to be inserted at the right of the returned node.
*/
    var elm = findNodeToInsert(value, parent)
    if (elm.where === 'left') {
        elm.node.left = new TreeEl()
        elm.node.left.value = value
    }
    else if (elm.where === 'right') {
        elm.node.right = new TreeEl()
        elm.node.right.value = value
    }
    console.log('Inserting ' + value + ' at ' + elm.where + ' of ' + elm.node.value)
}
```

Not much of logic is placed in the above show `addNode` function and should be easy to understand from the code comments. Its the `findNodeToInsert` function where things starts to get a bit tricky. Given below is the code for `findNodeToInsert` function.

```js
/*
{@param : value} value which need to be inserted into the tree
{@param : value} node of the tree
*/
function findNodeToInsert(value, node) {
    if (value < node.value) {
        if (node.left) {
            return findNodeToInsert(value, node.left)
        }
        else {
            return {
                node: node,
                where: 'left'
            }
        }
    }
    else if (value > node.value) {
        if (node.right) {
            return findNodeToInsert(value, node.right)
        }
        else {
            return {
                node: node,
                where: 'right'
            }
        }
    }
    else {
        return {
            node: parent,
            where: 'left'
        }
    }
}
```

Above code snippet will need a bit of explaining in details. We are using recursion here as a binary tree repeats itself at each node with the property `left < parent < right`. Using this property whatever logic we perform on a single node can be done on all of them recursively. Explaining this logic below:

1. Fist check `if value < node.value` i.e if the value which need to be inserted into the tree if greater than the value of node.
2. Second, if the result of __step 1__ is true, it means the value is going to be inserted to the left of the node/subtree. Please note that we still haven't figured out the exact place of insertion but we know for sure that it would be at the left.
3. Continuing on __step 2__
  * We first check if the node has a left element by checking `if (node.left)`, if this turns out be true, it means we have to walk further down the tree. We do that by invoking and returning `findNodeToInsert` recursively.
  * If `if (node.left)` condition turns out to be false, it means we are at the node where the new tree node need to be created so we return from here passing the node reference and the place(`where`) where a new node need to be created. Note that this forms the basis of ending the recursion.
4. If check of __step 1__ fails we check `if (value > node.value)`. This means we would have to walk the right subtree in the exact similar way we did for left subtree.
5. At the end if checks of __step 1__ and __step 4__ fails we assume the to be inserted value equal to the value of the node being compared i.e `if (value === node.value)`. We consider these type of values to be inserted in left subtree.

Result/return of `findNodeToInsert` will tell us the place and the node where a new node can be created. Post which we will create a new `Tree` object in our `addNode` function. Every time a new element is given to us we will have to use the same method of walking through the tree to figure out at which exact node a new node will be created.

# Traversing the tree

A binary search tree can traversed in 3 ways. Each of the traversal derive its name by which the parent element is being visited.

* preorder - parent | left   | right
* inorder -  left   | parent | right
* postorder  left   | right  | parent

Inorder traversal gives us a sorted array because of the property of tree that `left < parent < right`. e.g consider a tree just having 3 elements i.e the tree is 4(parent) 3(left) 5(right) now an inorder traversal will give is 3(left) 4 (parent) 5(right) which is the sorted order. So now we know why binary search tree are good for sorting.

To achieve the traversal of Binary search tree we will again take help of recursion by walking through the tree starting from parent. To walk left we define a `walkLeft` function, to walk right we define a `walkRight` function.

```js
function walkLeft(subtree,walk) {
    if (subtree.left) {
        return walk(subtree.left)
    }
}

function walkRight(subtree,walk) {
    if (subtree.right) {
        return walk(subtree.right)
    }
}

```

Both of the above functions are higher order functions requiring a `walk` function as argument. `walk` function is the function from where the above functions will be invoked since we will have to recursively call the function by repeating the steps. The order with which `walkLeft` or `walkRight` are called will determine the type of traversal. Things will get more clear in the below section where we will be defining the `walk` function for inorder,preorder and postorder traversals.

## In-order

```js

function walkLeft(subtree,walk) {
    // check if there is node at the left subtree
    // if yes, call the walk function again
    if (subtree.left) {
        return walk(subtree.left)
    }
}

function walkRight(subtree,walk) {
    // check if there is node at the right subtree
    // if yes, call the walk function again
    if (subtree.right) {
        return walk(subtree.right)
    }
}

function inOrderTraversal(tree) {

    walk(tree)

    function walk(subtree) {
        walkLeft(subtree,walk)
        console.log(subtree.value)
        walkRight(subtree,walk)
    }

}
```

In the above code we define a walk function which calls `walkLeft` function first and then logging the value whenever it returns and then moving on to call `walkRight`. I have pasted `walkLeft` and `walkRight` functions with comments just to understand things better. This order of calling forms the basis of our recursion which in turn is the `walk` function being passed in `walkLeft` and `walkRight` functions. Because of recursion this step gets repeated on each of the node in the order. You might need a bit of recursion knowledge to understand this better but things get very easy after that.

## Pre-order

```js
function preOrderTraversal(tree) {

    walk(tree)

    function walk(subtree) {
        console.log(subtree.value)
        walkLeft(subtree,walk)
        walkRight(subtree,walk)
    }

}
```

## Post-order

```
function postOrderTraversal(tree) {
    walk(tree)

        function walk(subtree) {
            walkLeft(subtree,walk)
            walkRight(subtree,walk)
            console.log(subtree.value)
        }
    }
}
```
