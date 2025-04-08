export default class HashMap {
  constructor(capacity, loadFactor) {
    this.capacity = capacity;
    this.loadFactor = loadFactor;
    // initialize the underlying storage array
    this.buckets = new Array(capacity).fill(null).map(() => []);
    this.nEntries = 0;
    this.nKeys = 0;

  }
  hash(key) {
    let hashcode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashcode = primeNumber * hashcode + key.charCodeAt(i);
      hashcode = hashcode % this.capacity
    }
    return hashcode;
  }
  set(key, value, isResize = true) {
    const hashcode = this.hash(key);
    if (hashcode < 0 || hashcode >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[hashcode];
    for (let i = 0; i < bucket.length; i++) {
      const k = bucket[i][0];
      if (k == key) {
        bucket[i][1] = value;
        return;
      }
    }
    if (bucket.length == 0) {
      this.nKeys++;
    }
    bucket.push([key, value])
    this.nEntries++;
    if ((this.nEntries / this.capacity > this.loadFactor) && isResize) {
      this.resize();
    }
  }
  get entries() {
    const entries = [];
    for (const bucket of this.buckets) {
      for (const [k, v] of bucket) {
        entries.push([k, v]);
      }
    }
    return entries;
  }
  resize() {
    this.capacity = this.capacity * 2;
    const entries = this.entries;
    this.nEntries = 0;
    this.nKeys = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    for (const [k, v] of entries) {
      this.set(k, v, false);
    }
  }
  get(key) {
    const hashcode = this.hash(key);
    if (hashcode < 0 || hashcode >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[hashcode];
    for (const [k, v] of bucket) {
      if (k == key) {
        return v;
      }
    }
    return null;
  }
  has(key) {
    const hashcode = this.hash(key);
    if (hashcode < 0 || hashcode >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[hashcode];
    for (const [k, _] of bucket) {
      if (k == key) { return true };
    }
    return false;
  }
  remove(key) {
    const hashcode = this.hash(key);
    if (hashcode < 0 || hashcode >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[hashcode];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] == key) {
        bucket.splice(i, 1);
        this.nEntries--;
        return true;
      }
    }
    return false;
  }
  get length() {
    return this.nKeys;
  }
  clear() {
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.nEntries = 0;
    this.nKeys = 0;
  }
  get keys() {
    const keys = [];
    for (const bucket of this.buckets) {
      for (const [k, _] of bucket) {
        keys.push(k);
      }
    }
    return keys;
  }
  get values() {
    const values = [];
    for (const bucket of this.buckets) {
      for (const [_, v] of bucket) {
        values.push(v);
      }
    }
    return values;
  }
}

