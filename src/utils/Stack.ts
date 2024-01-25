export default class Stack<E> {
    private stack: E[] = [];

    public push(e: E) {
        this.stack.push(e);
    }

    public pop() {
        return this.stack.pop();
    }

    public peek(): E | undefined {
        return this.stack[this.stack.length - 1];
    }

    public isEmpty(): boolean {
        return this.stack.length === 0;
    }

    public size(): number {
        return this.stack.length;
    }

    public clear() {
        this.stack = [];
    }

    public display() {
        console.log(this.stack);
    }

    public toArray() {return this.stack};
}