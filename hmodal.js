var hModal = function(content,settings){
  var obj = this; // global reference 

  // handle settings
  obj.content = content;
  obj.settings = settings;
  obj.type = undefined;
  obj.id = 'hmodal-'+ Math.random().toString(36).substr(2, 9);
  obj.element = $("#"+obj.id);

  // methods
this.showSlideOut = function(html, options){
  obj.type = 'slideout';
  if(typeof options==='undefined' || options ===null){
    options={};
  }
  
  //cleanup if other hmodals were rendered prior
  $('#'+obj.id).removeClass('hmodal-popup').removeClass("hmodal-modal").removeClass("hmodal-popup-scroll-inner").removeClass("hmodal-popup-full-screen");
  
  

  $("#" + obj.id).addClass('hmodal-slideout');

  //makes the html arg optional
  if(typeof(html)!='string' && typeof(html)=='object'){
    //check in on slideoutdirection and set
    if(html.slideoutDirection==="left"){
      $('#'+obj.id).removeClass('hmodal-slideout-right') // must remove in case it was changed in prior render
      .addClass('hmodal-slideout-left');
    }else{
      $('#'+obj.id).removeClass('hmodal-slideout-left')  // must remove in case it was changed in prior render
      .addClass('hmodal-slideout-right');
    }
    obj.setUp(html);
    obj.setHeader(html);
    obj.setBody(null,html);
    obj.setFooter(html);	
    obj.setButtons(html);
    obj.setCloseButton(html);
  }else{
    //check in on slideoutdirection and set
    if(options && options.slideoutDirection==="left"){
      $('#'+obj.id).removeClass('hmodal-slideout-right') // must remove in case it was changed in prior render
      .addClass('hmodal-slideout-left');
    }else{
      $('#'+obj.id).removeClass('hmodal-slideout-left')  // must remove in case it was changed in prior render
      .addClass('hmodal-slideout-right');
    }
    obj.setUp(options);
    obj.setHeader(options);
    obj.setBody(html,options);
    obj.setFooter(options);	
    obj.setButtons(options);
    obj.setCloseButton(options);	
  }
  
  setTimeout(function(){
    obj.open();
  },150);
  
  
  
  
};

this.forceRedraw = function(selector){
  return $(selector).hide(0, function(){
    $(selector).show();
  });
}


this.showPopUp = function(html, options){
  obj.type = 'popup';
  if(typeof options==='undefined' || options === null){
    options={};
  }
  //cleanup if other hmodals were rendered prior
  // hmodal-component overlay-light hmodal-popup hmodal-popup-scroll-inner
  //hmodal-component hmodal-overlay-close close-button-outside-right overlay-light 
  //hmodal-slideout-left hmodal-slideout hmodal-slideout-right hmodal-modal hmodal-popup

  $('#'+obj.id).removeClass('hmodal-slideout').removeClass("hmodal-modal").removeClass("hmodal-slideout-right")
  .removeClass("hmodal-slideout-left").removeClass("hmodal-overlay-close").removeClass("close-button-outside-right").removeClass("hmodal-popup-full-screen");
  

  $('#'+obj.id).addClass('hmodal-popup');

  

  //makes the html arg optional
  if(typeof(html)!='string' && typeof(html)=='object'){
    if(html.popupFixedHeight){
      $('#'+obj.id).addClass('hmodal-popup-scroll-inner');
    }
    if(html.size){
      $("#"+obj.id).children(".hmodal").css("max-width", html.size+"px");
      
    }
    if(html.fullscreen){
      $("#"+obj.id).addClass("hmodal-popup-full-screen")
    }
    obj.setUp(html);
    obj.setHeader(html);
    obj.setBody(null,html);
    obj.setFooter(html);	
    obj.setButtons(html);
    obj.setCloseButton(html);
  }else{
    if(options && options.popupFixedHeight){
      $('#'+obj.id).addClass('hmodal-popup-scroll-inner');
    }
    if(options.size){
      $("#"+obj.id).children(".hmodal").css("max-width", options.size+"px");
    }
    if(options.fullscreen){
      $("#"+obj.id).addClass("hmodal-popup-full-screen")
    }
    obj.setUp(options);
    obj.setHeader(options);
    obj.setBody(html,options);
    obj.setFooter(options);	
    obj.setButtons(options);
    obj.setCloseButton(options);	
  }
  
  
  setTimeout(function(){
    obj.open();
  },150);
}

this.resetModal = function(){
  $(obj.element).removeClass().addClass("hmodal-component");
}

this.showModal = function(html, options){
  obj.type= 'modal';
  if(typeof options==='undefined' || options === null){
    options={};
  }
  //cleanup if other hmodals were rendered prior
  $('#'+obj.id).removeClass('hmodal-slideout').removeClass("hmodal-popup").removeClass("hmodal-modal").removeClass("hmodal-slideout-right").removeClass("hmodal-slideout-left").removeClass("hmodal-popup-full-screen");
  obj.resetModal();

  $('#'+obj.id).addClass('hmodal-modal').addClass('hmodal-popup');
  
  //makes the html arg optional
  if(typeof(html)!='string' && typeof(html)=='object'){
    if(html.popupFixedHeight){
      $('#'+obj.id).addClass('hmodal-popup-scroll-inner');
    }
    if(html.size){
      $("#"+obj.id).children(".hmodal").css("max-width", html.size+"px");
    }
    if(html.fullscreen){
      $("#"+obj.id).addClass("hmodal-popup-full-screen")
    }
    obj.setUp(html);
    obj.setHeader(html);
    obj.setBody(null,html);
    obj.setFooter(html);
    //if buttons are undefined this sets the default for modals
    //must be run after calling setFooter as it appends to footer
    if(!(html.buttons)||!(html.buttons[0])){
      var newOptions = Object.assign({}, html)
      newOptions.buttons= [
      {
        name: "Cancel",
        callback: null,
      },
      {
        name: "Ok",
        callback: null,
      }
      ]
      obj.setButtons(newOptions);
    
    }else{
      obj.setButtons(html);
      
    }
    obj.setCloseButton(html);
  }else{
    if(options && options.popupFixedHeight){
      $('#'+obj.id).addClass('hmodal-popup-scroll-inner');
    }
    if(options && options.size){
      $("#"+obj.id).children(".hmodal").css("max-width", options.size+"px");
    }
    if(options && options.fullscreen){
      $("#"+obj.id).addClass("hmodal-popup-full-screen")
    }
    obj.setUp(options);
    obj.setHeader(options);
    obj.setBody(html,options);
    obj.setFooter(options);

    //if buttons are undefined this sets the default for modals
    //must be run after calling setFooter as it appends to footer
    if(!(options.buttons)||!(options.buttons[0])){
      var newOptions = Object.assign({}, options)
      newOptions.buttons= [
      {
        name: "Ok",
        callback: null,
      },
      {
        name: "Cancel",
        callback: null,
      }
      ]
      obj.setButtons(newOptions);
    }else{
      
      obj.setButtons(options);
    }
    obj.setCloseButton(options);	
  }
  

  

  obj.setCloseButton(options);
  
  
  setTimeout(function(){
    obj.open();
  },150);
  

}

//general function used for setup steps in all hmodal types
this.setUp = function(options){
  //checks and sets customclass
  if(options && textIsInitialized(options.customClass)) {
    $('#'+obj.id).addClass(options.customClass);
  }else{
    $('#'+obj.id).removeClass(options.customClass);
  }

  //checks and sets overlay color
  if(options && options.overlayColor==="light"){
    $('#'+obj.id).addClass('overlay-light');
  }else{
    $('#'+obj.id).removeClass('overlay-light');
  }
  
  
  
  //checks and sets if overlay can be clicked to close it
  if((options && !(options.overlayOnClickClose===false) && obj.type!="modal")){
    $('#'+obj.id).addClass('hmodal-overlay-close'); 
    $('#'+obj.id+' .hmodal-overlay').unbind(); //must unbind because otherwise you get the close function running multiple times on click
    $('#'+obj.id+'.hmodal-overlay-close .hmodal-overlay').bind('click', function(e){
      e.preventDefault();
      obj.close();
    });
  }else if(obj.type==="modal" && options && (options.overlayOnClickClose===true)){
    $('#'+obj.id).addClass('hmodal-overlay-close'); 
    $('#'+obj.id+' .hmodal-overlay').unbind(); //must unbind because otherwise you get the close function running multiple times on click
    $('#'+obj.id+'.hmodal-overlay-close .hmodal-overlay').bind('click', function(e){
      e.preventDefault();
      obj.close();
    });
  }
  else{
    $('#'+obj.id).removeClass('hmodal-overlay-close');
    $('#'+obj.id+' .hmodal-overlay').unbind(); // must remove in case it was changed in prior render
  }
}



  this.open = function(){
      // opens the modal box, reference chris css
  // Get current scroll position of window 
  var scrollPos = $(window).scrollTop();

  // Add class to open hmodal - this will jump your scroll position back to the top of window
  $("html").addClass("hmodal-open");		
  $("#"+obj.id).addClass("hmodal-open-container").trigger("open", [obj.id]);

  // Set scroll position of window to where it was before hmodal was opened
  $("html").css("margin-top", -scrollPos);

  // Fixes iOS issue where popup background doesn't display
  $(".hmodal-popup").scrollLeft(0);

  // If IE11 and we're doing a popup, it needs to be the type that has the inner scroll because of an IE11 bug
  if(navigator.userAgent.match(/Trident\/7\./) && $(".hmodal-popup").length > 0 && $(".hmodal-popup-scroll-inner").length == 0) {
        $(".hmodal-popup").addClass("hmodal-popup-scroll-inner");
    }		
  }

  this.close = function(){
  // closes the current modal box, reference chris css

  // Get the margin-top value that was applied to <html> element when hmodal was opened
  var marginTopValue = $("html").css("margin-top");
  var marginTopValueNoPx = parseInt(marginTopValue, 10);
  var scrollPos = Math.abs(marginTopValueNoPx);
  // Remove the margin-top value - this will jump your scroll position back to the top of the window
  $("html").removeAttr("style");

  // Remove class to close hmodal
  $("html").removeClass("hmodal-open");
  $("#"+obj.id).trigger("close", [obj.id]).removeClass("hmodal-open-container");

  // Set scroll position of window to where it was before hmodal was opened
  $(window).scrollTop(scrollPos);
  }

  this.setHeader = function(options){ // returns string html of the header
  if(options.header){
    $("#"+obj.id).removeClass("hmodal-hide-fixed-header")
    $('#'+obj.id+' .hmodal-content-fixed-header').html(options.header);
    return;
  }else{
    $('#'+obj.id+' .hmodal-content-fixed-header').html(""); //clears to prevent weird bugs
  }

  
  $("#"+obj.id).addClass("hmodal-hide-fixed-header");

}; 



  this.setBody = function(html, options){
  if(textIsInitialized(html)){ //runs if html isnt blank
    $('#'+obj.id+' .hmodal-content-main').html(html);
  }else if(!textIsInitialized(html)&& obj.content){ //shows obj content as last resort
    $('#'+obj.id+' .hmodal-content-main').html(this.content); 
  }else if(textIsInitialized(options.contentArea)){
    $('#'+obj.id+' .hmodal-content-main').html($(options.contentArea));
  }
  //TODO: display none class on body if there is nothing

}; 


  this.setFooter = function(options){
  if(options.footer){
    $('#'+obj.id+' .hmodal-content-fixed-footer').html(options.footer);
  }
  else{
    $('#'+obj.id+' .hmodal-content-fixed-footer').html(""); // clears to prevent bug where buttons multiplied
  }
  //TODO: display none class on footer if there is nothing
  //make sure that it checks to make sure there are no buttons that will go in footer
  if(!textIsInitialized(options.footer) && (!(options.buttons) || !(options.buttons[0])) && obj.type != "modal"){
    $("#"+obj.id).addClass("hmodal-hide-fixed-footer");
  } 
}; // returns string html of the footer

this.setButtons = function(options){
  if(options.buttons){
    options.buttons.forEach(function(button, index, array){
      if(obj.type==="modal"){
        if(index=== array.length-1){
          var newButton =$("<button class=\"button button-primary\" type=\"button\">" + button.name + "</button>");
        }
        else{
          var newButton =$("<button class=\"button\" type=\"button\">" + button.name + "</button>");
        }
      }
      else{
        var newButton =$("<button class=\"button button-primary\" type=\"button\">" + button.name + "</button>");
      }
      
      newButton.unbind();
      if(!button.callback){ //if a callback function doesn't exist, defaults to the close function
        newButton.bind('click', function(e){
          e.preventDefault();
          obj.close();
        });
      }else{
        newButton.bind('click', function(e){
          e.preventDefault();
          button.callback(obj); //pass in object always so that you can use functions like obj.close or access it if necessary
        });
      }

      $('#'+obj.id+' .hmodal-content-fixed-footer').append(newButton);
      
    }); 
  }
  
}

  this.setCloseButton = function(options){
  $('#'+obj.id+' .close-hmodal').unbind();
  $('#'+obj.id+' .close-hmodal').bind('click', function(e){
    e.preventDefault();
    obj.close();
  });
  $('#'+obj.id).removeClass("close-button-inside-right close-button-inside-left close-button-outside-right close-button-outside-left hmodal-hide-close-button"); //fresh start to close button
   //binds close to close hmodal button

  if(options.closeButton){ //prevents crash if there are no options set
    //popup settings
    if(options.closeButton.show===false){
      $("#"+obj.id).addClass("hmodal-hide-close-button");
      return;
    }
    
    if(obj.type=='popup'){
      if(!(options.closeButton.inside===false)){ //if it's definitely inside
        if(!(options.closeButton.right===false)){ //if it's definitely to the right
          $('#'+obj.id).addClass("close-button-inside-right");
        }
        else{
          $('#'+obj.id).addClass('close-button-inside-left');
        }
      }else{//if it's not inside
        if(!(options.closeButton.right===false)){ //if it's definitely to the right
          $('#'+obj.id).addClass("close-button-outside-right");
        }
        else{
          $('#'+obj.id).addClass('close-button-outside-left');
        }
      }
    }
    //slideout settings
    else{
      if(!(options.closeButton.inside===false)){ //if it's definitely inside
        if(!(options.closeButton.right===false)){ //if it's definitely to the right
          $('#'+obj.id).addClass("close-button-inside-right");
        }
        else{
          $('#'+obj.id).addClass('close-button-inside-left');
        }
      }else{//if it's not inside
        if(!(options.closeButton.right===false)){ //if it's definitely to the right
          $('#'+obj.id).addClass("close-button-outside-right");
        }
        else{
          $('#'+obj.id).addClass('close-button-outside-left');
        }
      }
    }
  
  }else if(obj.type==="modal"){
    $("#"+obj.id).addClass("hmodal-hide-close-button");
  }
}; // get the html of the close buttons based on the options
  

this.init = function(){
  var h = document.createElement('div');
  h.innerHTML = '<div id="'+obj.id+'" class="hmodal-component">' +
       '<div class="hmodal">' +
        '<span class="close-hmodal" title="Close">&times;</span>' +
        '<div class="hmodal-content hcontent">' +
        '		  <div class="hmodal-content-fixed-header">' +
        '		  </div>' +
        '		  <div class="hmodal-content-main">' +
        '		  </div><!-- end of hmodal-content-main -->' +
        '		  <div class="hmodal-content-fixed-footer">' +
        '		  </div>' +
        '</div><!-- end of hmodal-content -->' +
      '</div><!-- end of hmodal -->' +
       ' <div class="hmodal-overlay"></div>' +
    '</div><!-- end of hmodal-component -->';
    
  return h;
};

//reused function for checking if property/text is initialized 
function textIsInitialized(text){
  return (text||text===""||text===" ");
}

// new init
var b = document.getElementsByTagName('body');
b[0].appendChild(obj.init());

};
