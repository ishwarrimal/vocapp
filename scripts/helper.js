//API helpers start here
const getWordMeaning = async (word) => {
  return fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word)
    .then(async (response) => await response.json())
    .then((res) => {
      if (
        res.length > 0 &&
        res[0].meanings.length > 0 &&
        res[0].meanings[0].definitions.length > 0
      ) {
        return constructMeaningObject(res[0]);
      }
      return null;
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
};

/**
 * Retruns the list of synonym for a given word in a sentence
 *
 * @param {string} sentence - a stence from which we need to check the synonym of a given word.
 * @param {number} index - index of the selected word in the sentence
 *
 */
const getSynonym = async (sentence, index) => {
  return fetch(
    `https://sudipbhandari.pythonanywhere.com/pos_synonym?sentence=${sentence}&index=${index}`
  )
    .then(async (response) => await response.json())
    .then((res) => {
      return res || [];
    })
    .catch((e) => {
      return null;
    });
};

//API Helpers end here

//Funcitonality helpers start here

const constructMeaningObject = (rawMenaingObj) => {
  const retObj = {};
  retObj.phoneticText = rawMenaingObj?.phonetics?.find((ph) => ph.text)?.text;
  retObj.phoneticsAudio = rawMenaingObj?.phonetics?.find(
    (ph) => ph.audio
  )?.audio;
  retObj.meaning = [
    rawMenaingObj.meanings[0]?.definitions[0],
    rawMenaingObj.meanings[0]?.definitions[1],
  ];
  retObj.synonyms = [];
  retObj.sourceUrl = rawMenaingObj.sourceUrls;
  console.log(retObj);
  return retObj;
};

/**
 * Finds the index of the first occurrence of any element from the given elements array in the specified string.
 *
 * @param {string} string - The string to search within.
 * @param {number} fromIndex - The second argument of indexOf
 * @param {boolean} l2r - either to search from left to right or ulta
 * @param {Array} elements - An array of elements to search for -> default [.,!,?]
 * @returns {number} The index of the first occurrence found, or -1 if none of the elements are present.
 */
function indexOfAny(
  string,
  fromIndex = 0,
  l2r = true,
  elements = [".", "!", "?"]
) {
  for (let i = 0; i < elements.length; i++) {
    const index = l2r
      ? string.indexOf(elements[i], fromIndex)
      : string.lastIndexOf(elements[i], fromIndex);
    if (index !== -1) {
      return index;
    }
  }
  return -1;
}

//Functionality helpers end here
