# hModal

Demo: 
http://styleguide.hudsondemo.com/test-page/hmodal

## Getting Started
To create an hmodal, the bare minimum is content. The first argument an hmodal accepts is html in the form of a string.

Example:
```javascript
var bodyHtml = "<h2><strong>Hello World</strong></h2>";
var mybox = new hModal(bodyHtml);
```
Will initialize an hModal.

From here we need to pick a method of rendering, the options are:

Slideout
![Slideout](docs/screenshots/modal.png)

PopUp
![PopUp](docs/screenshots/popup.png)

Modal
![Modal](docs/screenshots/slideout.png)

To render, simply call the type of render function you desire on the hmodal object you previously created.

```javascript
mybox.showPopUp(); //for a Pop Up
mybox.showSlideOut(); //for a Slide Out
mybox.showModal(); //for a Modal
```

## Usage Notes
You should **never** be putting the `new` keyword in any kind of repeatable event, such as click events.
    This will create a copy of the hmodal you want to have every time that you click the event target, resulting in potentially hundreds of hmodals very quickly.

### DO NOT DO THIS
```javascript
$("#myButton").click(function(e){
    var myWrongModal = new hModal(); //THIS BIT SHOULD NOT BE HERE
    
    var myWrongSettings = {
        header: "<h1>This is incredibly incorrect<h1>",
    };
 
    myWrongModal.showPopUp(myWrongSettings);
});
```

### Best Practice
Best practice is to use the window.iModals array. This prevents naming conflicts between hmodals on the website, ensuring that the hmodal your event opens is the hmodal you need it to. 

Syntax:
    To Set: 
        window.iModals[<name of modal>] = new hModal();
    To Use:
        window.iModals[<name of modal>].openModal(); //showModal can be replaced by any other function  

#### Do This 
```javascript
window.iModals['myRightModal'] = new hModal();
$("#myButton").click(function(e)){
    var myRightSettings = {
        header: "<h1>This is incredibly correct<h1>",
    };
 
    window.iModals['myRightModal'].openPopup(myRightSettings);
}
```

If there is no iModals array, you should create the hModal object outside of the event handler, and show it in the event.

```javascript
var myRightModal = new hModal();
$("#myButton").click(function(e)){
    
    
    var myRightSettings = {
        header: "<h1>This is incredibly correct<h1>",
    };
 
    myRightModal.openPopup(myRightSettings);
}
```

