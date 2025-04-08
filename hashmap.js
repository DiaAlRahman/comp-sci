class HashMap {
  constructor(capacity, loadFactor) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    // initialize the underlying storage array
    this.buckets = new Array(capacity).fill(null).map(() => []);
  }

  hash(key) {
    let hashcode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashcode += primeNumber * hashcode + key.charCodeAt(i);
      hashcode %= this.capacity
    }
    return hashcode;
  }
}
