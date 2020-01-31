#hModal

Demo: 
http://styleguide.hudsondemo.com/test-page/hmodal

##Getting Started
To create an hmodal, the bare minimum is content. The first argument an hmodal accepts is html in the form of a string.

Example:
```javascript
var bodyHtml = "<h2><strong>Hello World</strong></h2>";
var mybox = new hModal(bodyHtml);
```
Will initialize an hModal.

From here we need to pick a method of rendering, the options are:

Slideout
![Slideout][./docs/screenshots/slideout.png]

PopUp
![PopUp][./docs/screenshots/popup.png]

Modal
![Modal][./docs/screenshots/modal.png]