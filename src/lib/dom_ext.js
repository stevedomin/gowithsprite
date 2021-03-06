Element.prototype.hasClassName = function(name) {
      return new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)").test(this.className);
    };

Element.prototype.addClassName = function(name) {
  if (!this.hasClassName(name)) {
    var c = this.className;
    this.className = c ? [c, name].join(' ') : name;
  }
};

Element.prototype.removeClassName = function(name) {
  if (this.hasClassName(name)) {
    var c = this.className;
    this.className = c.replace(
        new RegExp("(?:^|\\s+)" + name + "(?:\\s+|$)", "g"), "");
  }
};
    
// insertAdjacentHTML(), insertAdjacentText() and insertAdjacentElement 
// for Netscape 6/Mozilla by Thor Larholm me@jscript.dk 
if (typeof HTMLElement != "undefined" && !HTMLElement.prototype.insertAdjacentElement) {
    HTMLElement.prototype.insertAdjacentElement = function (where, parsedNode) {
        switch (where) {
        case 'beforeBegin':
            this.parentNode.insertBefore(parsedNode, this)
            break;
        case 'afterBegin':
            this.insertBefore(parsedNode, this.firstChild);
            break;
        case 'beforeEnd':
            this.appendChild(parsedNode);
            break;
        case 'afterEnd':
            if (this.nextSibling) this.parentNode.insertBefore(parsedNode, this.nextSibling);
            else this.parentNode.appendChild(parsedNode);
            break;
        }
    }

    HTMLElement.prototype.insertAdjacentHTML = function (where, htmlStr) {
        var r = this.ownerDocument.createRange();
        r.setStartBefore(this);
        var parsedHTML = r.createContextualFragment(htmlStr);
        this.insertAdjacentElement(where, parsedHTML)
    }


    HTMLElement.prototype.insertAdjacentText = function (where, txtStr) {
        var parsedText = document.createTextNode(txtStr)
        this.insertAdjacentElement(where, parsedText)
    }

}

HTMLElement.prototype.removeAllElements = function () {
    while (this.hasChildNodes()) {
        this.removeChild(this.lastChild);
    }
}