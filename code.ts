
figma.showUI(__html__, {width: 648, height: 650, title:'Figma to Tailwind'});

figma.ui.onmessage = msg => {
  
  if (msg.category === 'breakpoints') {
    let key = msg.nodeID;
    let value = msg.classes;

    console.log(key, value);
  }
  else if(msg.category === 'customClasses'){
    let key = msg.nodeID;
    let value = msg.customClasses;

    console.log(key, value);
  }
  else if(msg.category === 'customInteractions'){
    let key = msg.nodeID;
    let value = msg.customInteractions;

    console.log(key, value);
  }
  else if(msg.category === 'tagName'){
    let key = msg.nodeID;
    let value = msg.tagName;

    console.log(key, value);
  }
};