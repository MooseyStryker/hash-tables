class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    this.capacity = numBuckets
    this.data = new Array (numBuckets).fill(null)
    this.count = 0
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    // console.log(hashValue)
    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const index = this.hashMod(key)

    let curr = this.data[index]

    while(curr) {
      if(curr.key === key) {
        curr.value = value
        return;
      } else {
        curr = curr.next
      }
    }
      // console.log(this.data)
      let newNode = new KeyValuePair(key, value)

      newNode.next = this.data[index]

      this.data[index] = newNode

      this.count++
  }


  read(key) {
    let index = this.hashMod(key)
    let curr = this.data[index]
    while (curr) {
      if(curr.key === key) {
        return curr.value
      } else {
        curr = curr.next
      }
    }
  }


  resize() {
    const oldArray = this.data
    this.capacity *= 2
    this.data = new Array(this.capacity).fill(null)
    this.count = 0
    for (let i = 0; i < oldArray.length; i++){
      console.log("This should be our old Array:", oldArray[i])
      let curr = oldArray[i]
      while (curr){
        this.insert(curr.key, curr.value)
        curr = curr.next
      }


    }

  }


  delete(key) {

  }
}


module.exports = HashTable;
