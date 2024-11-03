/**
    This is a Queue class that implements a basic FIFO (First In, First Out) data structure.
    This class provides methods to enqueue, dequeue, check if the queue is empty, and initialize a queue with an initial state.
    @template T The type of elements held in the queue.
*/

export class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    static initialize<T>(initialState: T): Queue<T> {
        const queue = new Queue<T>();
        queue.enqueue(initialState);
        return queue;
    }
}
