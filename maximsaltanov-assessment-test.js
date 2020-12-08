"use strict";

!(function () {    

    //#region # vars
    
    let elementsNodeList = [];

    let currentIndex = -1;    
    let moveNextDirection = true; // if false then move to previous (up)

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

        //// undocumented feature - reset focus from input
        if (e.code == "Escape") {
            resetFocus();
            return;
        }

        if (ifActiveElementIsInput()) return;

        switch (e.code) {            
            case "KeyT":
                //// undocumented feature - move on top of the page and reset index and direction
                resetSelectedElement();
                currentIndex = -1;
                moveNextDirection = true;                
                window.scrollTo(0, 0);
                break;
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
                moveNextDirection = false;
                e.preventDefault();
                e.stopPropagation();
                break;
            case "ArrowDown":              
                moveNextDirection = true;                
                e.preventDefault();
                e.stopPropagation();
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

    //#region # moving engine
  
    function next(tag) {
        resetSelectedElement();
        currentIndex = getNextIndex(currentIndex, tag);        

        if (currentIndex != -1 && elementsNodeList[currentIndex]) {
            setElement(elementsNodeList[currentIndex]);
        } 
    }

    function getNextIndex(startIndex, tag) {
        if (elementsNodeList.length == 0) return startIndex;
        
        //// next
        if (moveNextDirection) {

            if (startIndex >= elementsNodeList.length - 1) startIndex = -1;

            for (let i = startIndex + 1; i < elementsNodeList.length; i++) {
                if (getElementType(elementsNodeList[i]) == tag) return i;                    
            }

        }
        else { //// prev

            if (startIndex == -1) startIndex = elementsNodeList.length;

            for (let i = startIndex - 1; i >= 0; i--) {
                if (getElementType(elementsNodeList[i]) == tag) return i;                    
            }

        }

        return -1;
    }

    //#endregion
    
    //#region # helpers

    Element.prototype.documentOffsetTop = function () {
        return this.offsetTop + (this.offsetParent ? this.offsetParent.documentOffsetTop() : 0);
    };

    function ifActiveElementIsInput() {
        const inputs = ['input', 'select', 'textarea'];
        const activeElement = document.activeElement;        
        return activeElement && inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1;
    }

    function resetFocus() {
        if (ifActiveElementIsInput()) document.activeElement.blur();
    }

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

    function resetSelectedElement() {
        if (currentIndex != -1 && elementsNodeList[currentIndex]) {
            elementsNodeList[currentIndex].classList.remove('assess-highlighter');                    
        }
        
    }

    function scrollToElement(element) {
        const top = element.documentOffsetTop() - (window.innerHeight / 2);
        window.scrollTo(0, top);
    }

    //#endregion
   
})();