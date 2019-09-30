chrome.storage.sync.get({
    style: 'Append'
  }, function(items) {
    console.log(items.style);

    //regex search strings
    var isaRegex = /ISA.*GS/g
    var gsRegex = /GS.*B3/g;

    //Finds ISA starting position
    var htmlString = document.body.innerHTML;
    var isaStart = htmlString.search(isaRegex);
    var isaString = htmlString.substring(isaStart);

    //Finds line terminator
    var replaceCharIndex = isaString.search(gsRegex)-1;
    var replaceChar = isaString.charAt(replaceCharIndex);

    //Finds IEA segment
    var ieaRegexStr = 'IEA.\\d{1,5}.\\d{9}'.concat(replaceChar);
    var ieaRegex = new RegExp(ieaRegexStr, "g");
    var ieaStart = htmlString.search(ieaRegex);
    var ieaString = htmlString.substring(ieaStart);
    var ieaEnd = ieaString.indexOf(replaceChar);
    var isaIeaEnd = ieaStart+ieaEnd+1;
    var isaIeaString = htmlString.substring(isaStart, isaIeaEnd);

    var unstreamedString = '';

    if (items.style === 'Append'){
        if (replaceChar === '*'){
            replaceChar = '\\*';
            unstreamedString = isaIeaString.replace(new RegExp(replaceChar, 'g'), '*'.concat('<br>'));
        }
        else{
            unstreamedString = isaIeaString.replace(new RegExp(replaceChar, 'g'), replaceChar.concat('<br>'));
        }

        unstreamedString = '<div>'.concat(unstreamedString).concat('<br><br><br><br><br><br></div>');

        document.body.insertAdjacentHTML('beforeend', unstreamedString);
    }else{
        if (replaceChar === '*'){
            replaceChar = '\\*';
            document.body.innerHTML = document.body.innerHTML.replace(new RegExp(replaceChar, 'g'), '*'.concat('\n'));
        }
        else{
            document.body.innerHTML = document.body.innerHTML.replace(new RegExp(replaceChar, 'g'), replaceChar.concat('\n'));
        }
    }
});