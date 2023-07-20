
/**
 * Mengembalikan nilai absolut dari suatu bilangan.
 * @param {number} x - Bilangan yang akan diambil nilai absolutnya.
 * @return {number} Nilai absolut dari bilangan x.
 */
function abs(x) {
    return x < 0 ? -x : x;                                                // jika x < 0, maka mengembalikan nilai -x, jika tidak maka mengembalikan nilai x
  }
  
  /**
   * Menghasilkan angka pseudo-random menggunakan algoritma XORShift
   * Angka yang dihasilkan memiliki periode 2^32 - 1.
   * @return {number} Angka pseudo-random yang dihasilkan.
   */
  function rand() {
    let seed = Date.now();                                                // seed = waktu saat ini
  seed ^= seed << 13;                                                     // melakukan operasi XOR pada seed dengan seed << 13
  seed ^= seed >> 17;                                                     // melakukan operasi XOR pada seed dengan seed >> 17
  seed ^= seed << 5;                                                      // melakukan operasi XOR pada seed dengan seed << 5
  return abs(seed);                                                       // mengembalikan nilai absolut dari seed
  }
  
  
  /**
  * Mengurutkan elemen-elemen dari sebuah array menggunakan algoritma Quick Sort.
  *
  * @param {Array} array - Array yang akan diurutkan.
  * @returns {Array} Array baru yang sudah diurutkan.
  */
  function quickSort(array) {
  if (array.length <= 1) {                                                  // jika panjang array <= 1, maka array sudah terurut
    return array;
  }
  
  const pivot = array[0];                                                   // pivot = elemen pertama dari array
  const smaller = [];                                                       // smaller = array kosong
  const equal = [];                                                         // equal = array kosong
  const greater = [];                                                       // greater = array kosong
  
  for (let element of array) {
    if (element < pivot) {                                                  // jika elemen < pivot, maka elemen dimasukkan ke array smaller
      smaller.push(element);
    } else if (element > pivot) {                                           // jika elemen > pivot, maka elemen dimasukkan ke array greater
      greater.push(element);
    } else {                                                                // jika elemen = pivot, maka elemen dimasukkan ke array equal
      equal.push(element);
    }
  }
  
  return [...quickSort(smaller), ...equal, ...quickSort(greater)];          // menggabungkan array smaller, equal, dan greater
  }
  
  
  /**
  * Membalikkan elemen-elemen dari sebuah array.
  *
  * @param {Array} array - Array yang akan dibalikkan.
  * @returns {Array} Array baru dengan elemen-elemen dalam urutan terbalik.
  */
  var reverseArray = function(array) {
    var reversedArray = [];
    for (var i = array.length - 1; i >= 0; i--) {
      reversedArray.push(array[i]);
    }
    return reversedArray;
  };
  
  /**
  * Mengembalikan nilai maksimum antara dua angka.
  *
  * @param {number} a - Angka pertama.
  * @param {number} b - Angka kedua.
  * @returns {number} Nilai maksimum antara a dan b.
  */
  function max(a, b) {
    return a > b ? a : b;                                                         // jika a > b, maka mengembalikan nilai a, jika tidak maka mengembalikan nilai b  
  }
  
  /**
  * Mengembalikan nilai minimum antara dua angka.
  *
  * @param {number} a - Angka pertama.
  * @param {number} b - Angka kedua.
  * @returns {number} Nilai minimum antara a dan b.
  */
  function min(a, b) {
    return a < b ? a : b;                                                        // jika a < b, maka mengembalikan nilai a, jika tidak maka mengembalikan nilai b
  }

  
  