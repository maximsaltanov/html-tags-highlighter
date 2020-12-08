"use strict";

!(function () {    

    //#region # vars
    
    let elementsNodeList = [];

    let currentIndex = -1;    
    let deltaArrowIndex = 0;

    const headerTag = "header";
    const linkTag = "link";
    const landmarkTag = "landmark";

    const selectors = {
        headerTag: "h1,h2,h3,h4,h5,h6",
        linkTag: "a",
        landmarkTag: "banner,complementary,contentinfo,form,main,navigation,search"
    };  

    //#endregion

    //#region # event handlers

    window.addEventListener("load", () => {
        createHighlighterClass();
        getAccessmentElements();
    });    

    document.addEventListener('keydown', (e) => {
        switch (e.code) {
            case "KeyH":
                next(headerTag);
                break;
            case "KeyL":
                next(linkTag);                
                break;
            case "KeyM":
                next(landmarkTag);
                break;
            case "ArrowUp":
                deltaArrowIndex++;
                break;
            case "ArrowDown":
                deltaArrowIndex--;
                break;
            ////case "KeyN":
            ////    let h = document.createElement("H1");
            ////    let t = document.createTextNode("This is a test !!!!!!!!!");
            ////    h.appendChild(t);
            ////    document.body.appendChild(h);
            ////    break;
        }
    });

    //#endregion
  
    function next(tag) {

        if (currentIndex != -1) {
            resetElement(elementsNodeList[currentIndex]);
        }

        currentIndex = getNextIndex(currentIndex, tag);

        if (currentIndex != -1 && elementsNodeList[currentIndex]) {
            setElement(elementsNodeList[currentIndex]);
        } 
    }

    function getNextIndex(startIndex, tag) {
        if (elementsNodeList.length == 0) return startIndex;

        if (startIndex >= elementsNodeList.length - 1) startIndex = -1;

        for (let i = startIndex + 1; i < elementsNodeList.length; i++) {
            if (getElementType(elementsNodeList[i]) == tag) return i;            
        }

        return -1;
    }

    function previous() {
    }    


    //#region # helpers

    Element.prototype.documentOffsetTop = function () {
        return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
    };

    function getAccessmentElements() {
        const selectorsAll = Object.values(selectors).join();
        elementsNodeList = document.querySelectorAll(selectorsAll);        
    }
 
    function createHighlighterClass(){
      let style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = '.assess-highlighter{border: 8px solid green; padding: 8px}';
      document.getElementsByTagName('head')[0].appendChild(style);
    }

    function setElement(element) {        
        element.classList.add('assess-highlighter');
        element.focus();
        scrollToElement(element);        
    }

    function getElementType(element) {
        const tag = element.tagName.toLowerCase();
        if (selectors.headerTag.includes(tag)) return headerTag;
        if (tag == selectors.linkTag) return linkTag;
        return landmarkTag;
    }

    function resetElement(element) {
        element.classList.remove('assess-highlighter');        
    }

    function scrollToElement(element) {
        const top = element.documentOffsetTop() - (window.innerHeight / 2);
        window.scrollTo(0, top);
    }

    //#endregion
   
})();