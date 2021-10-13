import {getValues, getTailWindClasses, getSpacingFromParent} from './class_functions/layout';

const { getBorderRadiusClass,
    getBorderWidthClass,
    getBorderColor } = require('./class_functions/border');        

import { getBGColor, getWidth, getHeight, getBoxShadow, textClasses, getLayout } from './class_functions/classes';
import {createCustomStylingString, addedCustomStyling, createInteractionsString, addedCustomInteractions, createBreakPointString, changingBPStringToObj, changedBreakpoints, createCustomTailwindString, iskeyInObject, addedCustomClasses, setTagName, addedTagName} from './utils/ui_functions';   //importing the functions from the ui_functions file;


//Global Variables
let traverseIds = [];
let codeString = "";
let bpValue, customTailwindValue, customTag, customInteractionValue, customStyleValue;


// function to Remove the Garbage Values from the Interactions Tab
const removeGarbageInteractions = (val) => {
    let valArray = val.split(' '), finalArray = [];
    valArray.map((v, i) => { v.length <= 2 ? valArray.splice(i, 1) : null;})
    
    for(let i=0; i<valArray.length; i++){
        const ele = valArray[i];
        if(ele.indexOf(':') != (ele.length - 1)){
            finalArray.push(valArray[i]);
        }
    }
    return finalArray.join(' ');
}

// This will iterate through all the layers and generate the html code from it
const createCode = (node) => {

    let indent = '';
    let classString = '';
    
    let styleString = `${addedCustomStyling[node.id]}`;
    styleString = styleString.replace('undefined', '');

    if('children' in node){

        let children = node.children;
        let userTag = `${addedTagName[node.id] ? addedTagName[node.id] : 'div'}`;    // If user set any kind of tag, then use it otherwise use the standard div tag

        const values = getValues(node);
        const flexString = getTailWindClasses(values);


        classString = `${changedBreakpoints[node.id]} ${addedCustomClasses[node.id]} ${addedCustomInteractions[node.id]} ${getWidth(node)} ${getHeight(node)} ${getBGColor(node)} ${flexString} ${getBorderWidthClass(node)} ${getSpacingFromParent(node)} ${getBorderColor(node)} ${getBorderRadiusClass(node)} ${getBoxShadow(node)}`;
        classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
        classString = classString.replace(/ +(?= )/g, ' ').trim(); // This is used to trim any kind of excess white spaces
        
        
        codeString +=`${indent}<${userTag} style='${styleString}' class='${classString}'>\n`;

        children.forEach(child => {
            createCode(child);
        });

        codeString += `${indent}</${userTag}>\n`;
    }else{

        if(node.type == 'RECTANGLE'){
            classString = `${changedBreakpoints[node.id]} ${addedCustomClasses[node.id]} ${addedCustomInteractions[node.id]} ${getBGColor(node)} ${getWidth(node)} ${getHeight(node)} ${getLayout(node)} ${getBorderWidthClass(node)} ${getBorderColor(node)} ${getBorderRadiusClass(node)} ${getSpacingFromParent(node)} ${getBoxShadow(node)}`;
            classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
            classString = classString.replace(/ +(?= )/g, ' ').trim();
            codeString += `${indent}<${userTag} style='${styleString}' class='${classString}'></${userTag}>`;
        }
        
        if(node.type == 'TEXT'){

            let userParaTag = `${addedTagName[node.id] ? addedTagName[node.id] : 'p'}`; // If use set any kind of Test Tag, then use it otherwise use the standard div tag

            classString = `${changedBreakpoints[node.id]} ${addedCustomClasses[node.id]} ${addedCustomInteractions[node.id]} ${textClasses(node)} ${getSpacingFromParent(node)} ${getBoxShadow(node)}`;
            classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
            classString = classString.replace(/ +(?= )/g, ' ').trim(); // This is used to trim any kind of excess white spaces
            if(node.characters){
                codeString += `${indent}<${userParaTag} style='${styleString}' class='${classString}'>${node.characters.split('\n').join('&lt/br&gt')}</${userParaTag}>\n`;
            }else{
                codeString += `${indent}<${userParaTag} style='${styleString}' class='${classString}'></${userParaTag}>\n`;
            }
        }
    }
    return codeString.toString();
}


figma.showUI(__html__, { width: 648, height: 700, title: 'Figma to Tailwind' });
figma.ui.onmessage = msg => {
    if (msg.category === 'breakpoints') {
        let value = msg.classes;
        const node = figma.currentPage.selection[0];   //The current selected Layer in the figma Page
        createBreakPointString(node.id, value);   // [this will transform the breakpoints object to breakpoints string and returns it]
        bpValue = changingBPStringToObj(node.id);  // This will check if there is any already present key to breakpoint mapping in it or not and convert the string to object and return it
        codeString = ''; // making the code string empty to generate the new code with the the breakpoint in it
        createCode(node); // Creating a New code String with the breakpoints added by the user
        
        figma.ui.postMessage({codeString, bpValue});  // Sending the new Code and breakpoints value back to disply in the UI        

    }
    else if (msg.category === 'customClasses') {
        let value = msg.customClasses;
        const node = figma.currentPage.selection[0];   // The current selected Layer in the figma Page
        createCustomTailwindString(node.id, value) // [this is update the customClass object about the new entry format {nodeID --> customClasses}]
        customTailwindValue = iskeyInObject(addedCustomClasses, node.id);  // This function checks if there is any already exist mapping in the object
        codeString = ''; // making the code string empty to generate the new code with the the Custom Classes in it
        createCode(node);  // Creating a New code String with the custom Classes added by the user

        figma.ui.postMessage({codeString, customTailwindValue});  // Sending the new Code and customClasses value back to display in the UI
        // node.setPluginData("Custom-Classes", customTailwindValue);
        
    }
    else if(msg.category === 'customStyle') {
        let value = msg.customStyle;
        const node = figma.currentPage.selection[0]; // The current selected Layer in the figma Page
        createCustomStylingString(node.id, value); // [this is update the customStyling object about the new entry format {nodeID --> customStyling}]
        customStyleValue = iskeyInObject(addedCustomStyling, node.id); // This function checks if there is any already exist mapping in the object
        codeString = ''; // making the code string empty to generate the new code with the the Custom Styling in it
        createCode(node);  // Creating a New code String with the custom Stylinh added by the user

        figma.ui.postMessage({codeString, customStyleValue}); // Sending the new Code and customStyle values back to display in the UI
        // console.log(value);
    }
    else if (msg.category === 'tagName') {
        let value = msg.tagName;
        const node = figma.currentPage.selection[0];   // The current selected Layer in the figma Page
        setTagName(node.id, value)  // [this is to update the customTag object about the new entery format {nodeID --> customTag}]
        customTag = iskeyInObject(addedTagName, node.id)  // This function checks if there is any already exist mapping in the object.
        codeString = ''; // making the code string empty to generate the new code with the custom Classes in it.
        createCode(node) // Creating a New code String with the custom tagName added by the user

        figma.ui.postMessage({codeString, customTag});  // Sending the new Code and tagName values back to display in the UI
    }
    else if (msg.category === 'customInteractions') {
        let value = msg.customInteractions;
        const node = figma.currentPage.selection[0];   // The current selected Layer in the figma Page
        let cleanValue = removeGarbageInteractions(value); // Removing the Garbage Values (Means if the state is selected but there is not class added to it)

        createInteractionsString(node.id, cleanValue); // [This is to update the customInteractions Object about the new entry format {nodeID --> customInteractions}]
        customInteractionValue = iskeyInObject(addedCustomInteractions, node.id) // This function checks if there is any already exist mapping in the object
        codeString = ''; // making the code String empty to generate the new Code with the custom Classes in it.
        createCode(node) // Creating a new code String with the custom Interactions added by the User

        figma.ui.postMessage({codeString, customInteractionValue});  // Sending the new Code and Custom Interactions values back to display in the UI
    }    
};

// if the selection on the current page changes then run this callback function
function traverseLayers(node, nodeids) {
    nodeids.push(node);
    if ('children' in node) {
        // nodeids.push(node);
        for (const child of node.children) {
            traverseLayers(child, nodeids);
        }
    }
    return nodeids;
}

figma.on('selectionchange', () => {
    // console.log(figma.ui.getPluginData[node.id]);

    let nodeids = [];
    const node = figma.currentPage.selection[0];
    
    console.log(node.getPluginData("Custom-Classes"));

    traverseIds = traverseLayers(node, nodeids);
    console.log(traverseIds);
    codeString = '';
    createCode(traverseIds[0]);
    
    bpValue = changingBPStringToObj(node.id);   // This function will check if any breakPoints value already given to certain key (node)
    customTailwindValue = iskeyInObject(addedCustomClasses,node.id) // This function will check if there is any custom Classes value already given to the certain key, if YES, then return classes else return false
    customTag = iskeyInObject(addedTagName, node.id) // This function will check if there is any custom tag Name already given to the certain key, if YES, then return the tagName, else returns false
    customStyleValue = iskeyInObject(addedCustomStyling, node.id) // This function will check if there is any custom Styling already given to the certain key, if YES, then return the customStyles, else returns false

    figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customStyleValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection
    
    
});
