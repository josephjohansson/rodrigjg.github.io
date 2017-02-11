//
// Written by Jose Rodriguez 10121643
//
function getStats(txt) {
    //Char count
    var charCount = txt.length;

    //Word Count
    var wordCount = 0;
    var wordsList;
    wordsList = txt.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ");
    wordsList = wordsList.replace(/[ ]{2,}/gi," ");
    wordsList = wordsList.replace(/(\r\n|\n|\r)/gm,"");
    wordsList = wordsList.trim().toLowerCase().split(' ');
    wordCount = wordsList.length;

    //New line count
    var newLineCount = 1;
    for (var i=0; i< txt.length; i++){
        if (txt[i] === "\n"){
            newLineCount += 1;
        }
    }
    
    //non empty
    var nonEmptyCount = 1;
    nonEmptyCount = txt ? (txt.match(/^[ \t]*$/gm) || []).length : 0;
    nonEmptyCount = newLineCount - nonEmptyCount;

    //Maximum line lenght
    var lineLengthmax = 0;
    lineLengthmax = txt.split("\n");
    lineLengthmax = lineLengthmax.sort(function(a, b){ return b.length - a.length;})[0].length;
        
    //average word length
    var avgWordLen = 0;
    for(var i = 0; i< wordsList.length; i++){
        avgWordLen += wordsList[i].length;
    }
    avgWordLen = avgWordLen/wordsList.length;


    //palindromes
    var palinArray = [];
    for(var i = 0; i< wordsList.length; i++){
        if (wordsList[i] == wordsList[i].split('').reverse().join('') && wordsList[i].length>2){
            palinArray.push(wordsList[i]);
        }
    }

    //longest words
    var modifiedWordList = wordsList.slice(0);
    var longestWordList = [];
    modifiedWordList = modifiedWordList.sort();
    modifiedWordList = modifiedWordList.sort(function(a, b){ return b.length - a.length;});
    for (var i = 0; i < 10; i++){
        if (longestWordList.indexOf(modifiedWordList[i]) == -1){
            longestWordList.push(modifiedWordList[i]);
        }
    }
    index = longestWordList.indexOf(null);
    if(index > -1){
        longestWordList.splice(index, 1);
    }

    //most common words

    var mostFreqArray = [];
    var mostFreqDict = {};
    var item;

    for(var i = 0; i < wordsList.length; i++){
        item = wordsList[i]
        if(item in mostFreqDict){
            mostFreqDict[item]++;
        }
        else{
            mostFreqDict[item] = 1;
        }
    }

    for(item in mostFreqDict){
        mostFreqArray.push(item);
    }

    mostFreqArray.sort();
    mostFreqArray.sort(function(c,d){return mostFreqDict[d] - mostFreqDict[c];});
    
    for (i=0; i< mostFreqArray.length; i++){
        mostFreqArray[i] = mostFreqArray[i]+"("+mostFreqDict[mostFreqArray[i]]+")";
    }


    return {
        nChars: charCount,
        nWords: wordCount,
        nLines: newLineCount,
        nNonEmptyLines: nonEmptyCount,
        averageWordLength: avgWordLen,
        maxLineLength: lineLengthmax,
        palindromes: palinArray,
        longestWords: longestWordList,
        mostFrequentWords: mostFreqArray
    };
}


