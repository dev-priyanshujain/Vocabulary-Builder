(function() {
    'use strict';

   document.addEventListener('dblclick', showMeaning);

   function showMeaning(event){
       var info = getSelectionText(event);
       var response = sendRequest(info);
       var meaning = retrieveMeaning(response);
       createDiv(meaning.textContent, info.x, info.y);
   }


   function getSelectionText(event) {

          var word;
          if (window.getSelection) {
              word = window.getSelection().toString();
          }

          var x = event.pageX;
          var y = event.pageY;
          var toReturn = {
              x: x,
              y: y,
              word: word
          };

          return toReturn;
    }

    function sendRequest(info){

        var url = "https://www.google.co.in/search?q=define+" + info.word;
        var response = httpGet(url);
		console.log(response);        
		return response;

    }

    function retrieveMeaning(response){
        var meaning =  $(".PNlCoe span", response)[0];
        console.log(meaning);
        return meaning;
    }


    function createDiv(meaning, x, y) {
        var dynDiv = document.createElement("div"); // creating div element
        dynDiv.id = "divDynamic";
        dynDiv.innerHTML = meaning;
        dynDiv.style.height = "100px";
        dynDiv.style.width = "320px";
        dynDiv.style.backgroundColor = 'Bisque';

        dynDiv.style.position = "absolute";
        dynDiv.style.left = x + "px";
        dynDiv.style.top = y + "px";

        document.body.appendChild(dynDiv);
        var btn = document.getElementById('divDynamic');
        btn.addEventListener('click',function(){
        document.body.removeChild(dynDiv);
      });
   }


    function httpGet(theUrl) {
        var xmlHTTP = new XMLHttpRequest();
        xmlHTTP.open( "GET", theUrl, false ); // false for synchronous request15u
        xmlHTTP.send();
        return xmlHTTP.responseText;
    }

})();
