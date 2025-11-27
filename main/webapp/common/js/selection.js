/*  selection.js
 *  (c) 2008 Kei Kusakari, Liu Shenwei
 *
 *  License : MIT-style license.
 *  Web site: http://blog.imishin.com/products/javascript/selectionjs/
 *
 *  selection.js - depends on prototype.js 1.6 or later
 *  http://www.prototypejs.org/
 *
 *---------------------------------------------------------------------------
 * 2009/11/27 Japan Total System Edit 71çsñ⁄ÇÉRÉÅÉìÉgâª
/*--------------------------------------------------------------------------*/
var Selection = Class.create();
Selection.Version = "1.1";
Selection.prototype = {
  initialize : function(element) {
    this.element = $(element);
    this.tmpSelection = {range: null, start:0, end:0, text: null};
//    this.save();
  },
  setPrefixSuffix: function(prefix, suffix) {
    var oldText = this.text();
    var newText = prefix + oldText + suffix;
    this.replace(newText);
    if (oldText == '') {
      this.moveBetween(newText, suffix);
    }
  },
  moveBetween: function(text, suffix) {
    this.save();
    if (Prototype.Browser.IE) {
      var range = document.body.createTextRange();
      range.moveToElementText(this.element);
      this.tmpSelection.range.moveStart('character', -suffix.length);
      range.setEndPoint('StartToStart', this.tmpSelection.range);
      range.setEndPoint('EndToStart', this.tmpSelection.range);
      range.select();
    } else {
      var selectedPos = this.tmpSelection.end - suffix.length;
      this.element.selectionStart = selectedPos;
      this.element.selectionEnd = selectedPos;
      this.element.focus();
    }
  },
  replace: function(text) {
    if (Prototype.Browser.IE) {
      this.tmpSelection.range.text = text;
      this.tmpSelection.range.select();
    } else {
      var val = this.element.value;
      var beforeNode = val.slice(0, this.tmpSelection.start);
      var afterNode = val.slice(this.tmpSelection.end);
      this.element.value = beforeNode + text + afterNode;
      var selectedPos = (beforeNode + text).length;
      this.element.selectionStart = selectedPos;
      this.element.selectionEnd = selectedPos;
      this.element.focus();
    }
  },
  text: function() {
    if (Prototype.Browser.IE) {
      return this.tmpSelection.range.text;
    } else {
      if (this.element.value) {
        return this.element.value.slice(this.tmpSelection.start, this.tmpSelection.end);
      } else {
        return this.tmpSelection.text;
      }
    }
  },
  save: function() {
    if (Prototype.Browser.IE) {
//      this.element.focus();
      this.tmpSelection.range = document.selection.createRange();
    } else {
      this.tmpSelection.start = this.element.selectionStart;
      this.tmpSelection.end = this.element.selectionEnd;
      this.tmpSelection.text = window.getSelection();
    }
  }
}
