/**
 * A Queue data structure that's implemented using an object (key-value pair);
 * @see https://www.geeksforgeeks.org/implementation-queue-javascript/
 */
export default class Queue<E> {
    private readonly items: {
        [key: number]: E
    };

    private front: number;
    private back: number;

    constructor() {
        this.items = {}
        this.front = 0
        this.back = 0
    }

    enqueue(item: E) {
        this.items[this.back] = item;
        this.back++;
    }

    dequeue(): E {
        const item = this.items[this.front];
        delete this.items[this.front];
        this.front++;
        return item;
    }

    peek(): E {
        return this.items[this.front]
    }

    display() {
        console.log(this.items);
    }
}