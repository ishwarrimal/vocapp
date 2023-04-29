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
  retObj.sourceUrl = rawMenaingObj.sourceUrls;
  console.log(retObj);
  return retObj;
};
