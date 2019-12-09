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

    ensureLimit() {
        if (this.size === this.limit) {
            this.remove(this.tail!.key);
        }
    }

    remove(key: any) {

    }
}