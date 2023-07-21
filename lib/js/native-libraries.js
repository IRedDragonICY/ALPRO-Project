
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
  function sort(array) {
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
  
  return [...sort(smaller), ...equal, ...sort(greater)];          // menggabungkan array smaller, equal, dan greater
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



function length(str) {
  var count = 0;
  for (var i = 0; i < str.length; i++) {
    count++;
  }
  return count;
}



function charAt(str, index) {
  if (index < 0 || index >= length(str)) {
    return "";
  }
  return str[index];
}


function charCodeAt(str, index) {
  if (index < 0 || index >= str.length) {
    return NaN;
  }

  const char = charAt(str, index);
  const charCodeMap = {
    " ": 32,  "!": 33,  "\"": 34, "#": 35,
    "$": 36,  "%": 37,  "&": 38,  "'": 39,
    "(": 40,  ")": 41,  "*": 42,  "+": 43,
    ",": 44,  "-": 45,  ".": 46,  "/": 47,
    "0": 48,  "1": 49,  "2": 50,  "3": 51,
    "4": 52,  "5": 53,  "6": 54,  "7": 55,
    "8": 56,  "9": 57,  ":": 58,  ";": 59,
    "<": 60,  "=": 61,  ">": 62,  "?": 63,
    "@": 64,  "A": 65,  "B": 66,  "C": 67,
    "D": 68,  "E": 69,  "F": 70,  "G": 71,
    "H": 72,  "I": 73,  "J": 74,  "K": 75,
    "L": 76,  "M": 77,  "N": 78,  "O": 79,
    "P": 80,  "Q": 81,  "R": 82,  "S": 83,
    "T": 84,  "U": 85,  "V": 86,  "W": 87,
    "X": 88,  "Y": 89,  "Z": 90,  "[": 91,
    "\\": 92, "]": 93,  "^": 94,  "_": 95,
    "`": 96,  "a": 97,  "b": 98,  "c": 99,
    "d": 100, "e": 101, "f": 102, "g": 103,
    "h": 104, "i": 105, "j": 106, "k": 107,
    "l": 108, "m": 109, "n": 110, "o": 111,
    "p": 112, "q": 113, "r": 114, "s": 115,
    "t": 116, "u": 117, "v": 118, "w": 119,
    "x": 120, "y": 121, "z": 122, "{": 123,
    "|": 124, "}": 125, "~": 126
  };

  return charCodeMap[char] || NaN;
}


function indexOf(arr, searchElement) {

  for (let i = 0; i < length(arr); i++) {
    if (arr[i] === searchElement) {
      return i;
    }
  }
  return -1;
}

function toLowerCase(str) {
  var result = "";
  for (var i = 0; i < length(str); i++) {
    var charCode = charCodeAt(str, i);
    if (charCode >= 65 && charCode <= 90) {
      result += String.fromCharCode(charCode + 32);
    } else {
      result += str[i];
    }
  }
  return result;
}

function toUpperCase(str) {
  var result = "";
  for (var i = 0; i < length(str); i++) {
    var charCode = charCodeAt(str, i);
    if (charCode >= 97 && charCode <= 122) {
      result += String.fromCharCode(charCode - 32);
    } else {
      result += str[i];
    }
  }
  return result;
}

function join(arr, separator) {
  var result = "";
  for (var i = 0; i < length(arr); i++) {
    result += arr[i];
    if (i !== length(arr) - 1) {
      result += separator;
    }
  }
  return result;
}

function split(string, separator) {
  var result = [];
  var word = "";
  for (var i = 0; i < length(string); i++) {
    if (string[i] === separator) {
      result.push(word);
      word = "";
    } else {
      word += string[i];
    }
  }
  if (word !== "") {
    result.push(word);
  }
  return result;
}

function replace(string, searchValue, replaceValue) {
  let result = "";
  let searchValuePattern = new RegExp(searchValue);
  
  for (let i = 0; i < string.length; i++) {
    if (string.slice(i).match(searchValuePattern) && i === string.length - 1) {
      break;
    }
    
    if (string.slice(i, i + searchValue.length) === searchValue) {
      result += replaceValue;
      i += searchValue.length - 1;
    } else {
      result += string[i];
    }
  }
  
  return result;
}

function substring(string, start, end) {
  var result = "";
  if (end === undefined) {
    end = length(string);
  }
  for (var i = start; i < end; i++) {
    result += string[i];
  }
  return result;
}

function trim(string) {
  var result = "";
  var start = 0;
  var end = length(string) - 1;
  while (string[start] === " ") {
    start++;
  }
  while (string[end] === " ") {
    end--;
  }
  for (var i = start; i <= end; i++) {
    result += string[i];
  }
  return result;
}


function slice(string, start, end) {
  var result = "";
  if (end === undefined) {
    end = length(string);
  }
  for (var i = start; i < end; i++) {
    result += string[i];
  }
  return result;
}


function search(string, searcher) {
  var result = "";
  var start = 0;
  var end = length(string) - 1;
  while (string[start] === " ") {
    start++;
  }
  while (string[end] === " ") {
    end--;
  }
  for (var i = start; i <= end; i++) {
    result += string[i];
  }
  return result;
}


function test(string, regex) {
  var regexSource = regex.source;
  var regexFlags = regex.flags;
  var regexp = new RegExp(regexSource, regexFlags);
  var match = regexp.exec(string);
  if (match !== null && match[0] === match.input) {
    return true;
  } else {
    return false;
  }
}

function match(string, regex) {
  var results = [];
  var regexSource = regex.source;
  var regexFlags = regex.flags;

  for(var i = 0; i < string.length; i++) {
    for(var j = i; j < string.length + 1; j++) {
      var substring = string.slice(i, j);
      var regexp = new RegExp(regexSource, regexFlags);
      var match = regexp.exec(substring);
      if (match !== null && match[0] === match.input) {
        results.push(substring);
      }
    }
  }
  return results;
}