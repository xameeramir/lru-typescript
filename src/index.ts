console.log(`LRU.ts is working! \u00A9 nordible https://nordible.com`);

class CacheNode {
    key: any;
    value: any;
    next: CacheNode | null;
    previous: CacheNode | null;

    constructor(key: any, value: any, next: CacheNode | null = null, previous: CacheNode | null = null) {
        this.key = key;
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}

class LRUCache {
    limit: number;
    size: number;
    head: CacheNode | null;
    tail: CacheNode | null;
    cache: any;

    constructor(limit = 10) {
        this.size = 0;
        this.limit = limit;
        this.head = null;
        this.tail = null;
        this.cache = {};
    }

    write(key: any, value: any) {
        this.ensureLimit();

        if (!this.head) {
            this.head = this.tail = new CacheNode(key, value);
        } else {

            //add the new node in front i.e ahead of the current head
            const newNode = new CacheNode(key, value, this.head);
            // set the newly created node as the previous node of the current head
            this.head.previous = newNode;
            // set the new node as the head of the cache
            this.head = newNode;
        }

        // add the newly created node to the cache
        this.cache[key] = this.head;

        // as the newly created node is added to the cache, the size of the cache should be incremented too!
        this.size++;
    }

    // Read from cache map and make that node as new Head of LinkedList
    read(key: any) {
        if (this.cache[key]) {
            const value = this.cache[key].value;

            // node removed from it's position and cache
            this.remove(key)
            // write node again to the head of LinkedList to make it most recently used
            this.write(key, value);

            return value;
        }

        console.log(`Item not available in cache for key ${key}`);
    }

    ensureLimit() {
        if (this.size === this.limit && this.tail) {
            this.remove(this.tail.key);
        }
    }

    remove(key: any) {
        const node = this.cache[key];

        if (node.prev) {
            node.prev.next = node.next;
        } else {
            this.head = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        } else {
            this.tail = node.prev
        }
        delete this.cache[key];
        this.size--;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.cache = {};
    }

    // Invokes the callback function with every node of the chain and the index of the node.
    forEach(fn: Function) {
        let node = this.head;
        let counter = 0;
        while (node) {
            fn(node, counter);
            node = node.next;
            counter++;
        }
    }

    // To iterate over LRU with a 'for...of' loop
    *[Symbol.iterator]() {
        let node = this.head;
        while (node) {
            yield node;
            node = node.next;
        }
    }
}

let lruCache = new LRUCache(3);
console.log('lruCache', lruCache.cache)
lruCache.write('a', 123);
console.log('a lruCache', lruCache.cache)
lruCache.write('b', 456);
console.log('b lruCache', lruCache.cache)
lruCache.write('c', 789);
console.log('c lruCache', lruCache.cache)
lruCache.read('a'); // output 123
console.log('read a lruCache', lruCache.cache)

// Now max limit 3 is reached. Let's add a new element
lruCache.write('d', 0);
console.log('d lruCache', lruCache.cache)
