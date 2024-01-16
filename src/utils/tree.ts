// export default class Tree<E> {
//     readonly root: TreeNode<E>;
//
//     constructor() {
//         this.root = new TreeNode<E>(null);
//     }
// }
//
//
// export class TreeNode<E> {
//     readonly data: E | null;
//     readonly children: TreeNode<E>[];
//     parent: TreeNode<E> | null;
//
//     constructor(data: E | null, parent: TreeNode<E> | null = null) {
//         this.data = data;
//         this.parent = parent;
//         this.children = [];
//     }
//
//     addChild(child: TreeNode<E>) {
//         child.parent = this;
//         this.children.push(child);
//     }
// }
