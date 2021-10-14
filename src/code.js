import {getValues, getTailWindClasses, getSpacingFromParent} from './class_functions/layout';

const { getBorderRadiusClass,
    getBorderWidthClass,
    getBorderColor } = require('./class_functions/border');        

import { getBGColor, getWidth, getHeight, getBoxShadow, textClasses, getLayout } from './class_functions/classes';
import {getbreakPointsData, getDataFromPlugin, removeDataFromTree, createCustomStylingString, addedCustomStyling, createInteractionsString, addedCustomInteractions, createBreakPointString, changingBPStringToObj, changedBreakpoints, createCustomTailwindString, iskeyInObject, addedCustomClasses, setTagName, addedTagName} from './utils/ui_functions';   //importing the functions from the ui_functions file;
import {RGBToHex} from './utils/util_functions';


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
    
    let styleString = `${getDataFromPlugin(node, 'CUSTOM_STYLES')}`;
    styleString = styleString.replace('undefined', '');

    let tag = getDataFromPlugin(node, 'CUSTOM_TAGS');
    let userTag = `${tag ? tag : 'div'}`;    // If user set any kind of tag, then use it otherwise use the standard div tag
    
    console.log(node);

    if('children' in node){
        

        let children = node.children;

        // cheking if the node is an imageNode
        if("fills" in node){
            if(node.fills.length >= 1){
                if(node.fills[0].type == "IMAGE"){
                    let imgH = node.height;
                    let imgW = node.width;
    
                    classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${getBoxShadow(node)}`;
                    codeString += `${indent}<img style='${styleString}' class='${classString}' src='https://via.placeholder.com/${imgW}x${imgH}' />\n`;
    
                    return;
                }
            }
        }

        // Check for the Vector Node:
        if(node.type == "VECTOR" || node.type == "ELLIPSE"){
            let path = node.fillGeometry.length > 0 ? node.fillGeometry[0].data : '';
            let width = node.width;
            let height = node.height;
            let strokeColor = node.strokes.length > 0 ? RGBToHex(node.strokes[0].color) : 'none';
            let strokeJoin = node.strokeJoin;
            let strokeCap = node.strokeCap;
            let strokeWidth = node.strokeWeight;
            let SVGFill = node.fills.length > 0 ? RGBToHex(node.fills[0].color) : 'none';
            

            codeString += `<svg class="${getSpacingFromParent(node)}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="${path}" fill="${SVGFill}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="${strokeCap.toLowerCase()}" stroke-linejoin="${strokeJoin.toLowerCase()}"/>
            </svg>\n`;

            return;
        }
        
        const values = getValues(node);
        const flexString = getTailWindClasses(values);
        
        classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${getWidth(node)} ${getHeight(node)} ${getBGColor(node)} ${flexString} ${getBorderWidthClass(node)} ${getSpacingFromParent(node)} ${getBorderColor(node)} ${getBorderRadiusClass(node)} ${getBoxShadow(node)}`;
        classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
        classString = classString.replace(/ +(?= )/g, ' ').trim(); // This is used to trim any kind of excess white spaces
        
        codeString +=`${indent}<${userTag} style='${styleString}' class='${classString}'>\n`;

        children.forEach(child => {
            createCode(child);
        });

        codeString += `${indent}</${userTag}>\n`;
    }else{

        // cheking if the node is an imageNode
        if("fills" in node){
            if(node.fills.length >= 1){
                if(node.fills[0].type == "IMAGE"){
                    let imgH = node.height;
                    let imgW = node.width;
    
                    classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${getBoxShadow(node)}`;
                    classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
                    classString = classString.replace(/ +(?= )/g, ' ').trim(); // This is used to trim any kind of excess white spaces
                    codeString += `${indent}<img style='${styleString}' class='${classString}' src='https://via.placeholder.com/${imgW}x${imgH}' />\n`;
    
                    return;
                }
            }
        }
        

        // Check for the Vector Node:
        if(node.type == "VECTOR" || node.type == "ELLIPSE"){
            let path = node.fillGeometry.length > 0 ? node.fillGeometry[0].data : '';
            let width = node.width;
            let height = node.height;
            let strokeColor = node.strokes.length > 0 ? RGBToHex(node.strokes[0].color) : 'none';
            let strokeJoin = node.strokeJoin;
            let strokeCap = node.strokeCap;
            let strokeWidth = node.strokeWeight;
            let SVGFill = node.fills.length > 0 ? RGBToHex(node.fills[0].color) : 'none';
            

            codeString += `<svg class="${getSpacingFromParent(node)}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="${path}" fill="${SVGFill}" stroke="${strokeColor}" stroke-width="${strokeWidth}" stroke-linecap="${strokeCap.toLowerCase()}" stroke-linejoin="${strokeJoin.toLowerCase()}"/>
            </svg>\n`;

        }

        if(node.type == 'RECTANGLE'){
            classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${getBGColor(node)} ${getWidth(node)} ${getHeight(node)} ${getLayout(node)} ${getBorderWidthClass(node)} ${getBorderColor(node)} ${getBorderRadiusClass(node)} ${getSpacingFromParent(node)} ${getBoxShadow(node)}`;
            classString = classString.replaceAll('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
            classString = classString.replace(/ +(?= )/g, ' ').trim();
            codeString += `${indent}<${userTag} style='${styleString}' class='${classString}'></${userTag}>`;
        }
        
        if(node.type == 'TEXT'){

            let tag = getDataFromPlugin(node, 'CUSTOM_TAGS');
            let userParaTag = `${tag ? tag : 'p'}`; // If use set any kind of Test Tag, then use it otherwise use the standard div tag

            classString = `${getbreakPointsData(node)} ${getDataFromPlugin(node, 'CUSTOM_CLASSES')} ${getDataFromPlugin(node, 'CUSTOM_INTERACTIONS')} ${textClasses(node)} ${getSpacingFromParent(node)} ${getBoxShadow(node)}`;
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

        // Creating and Initializing the fields for storing the Data in the Figma Plugin [Private to that Plugin ONLY]
        changedBreakpoints[node.id] ? node.setPluginData('BREAKPOINTS', JSON.stringify(bpValue)) : node.setPluginData('BREAKPOINTS', '');

        codeString = ''; // making the code string empty to generate the new code with the the breakpoint in it
        createCode(node); // Creating a New code String with the breakpoints added by the user
        
        // figma.ui.postMessage({codeString, bpValue});  // Sending the new Code and breakpoints value back to disply in the UI        
        figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customStyleValue, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    

    }
    else if (msg.category === 'customClasses') {
        let value = msg.customClasses;
        const node = figma.currentPage.selection[0];   // The current selected Layer in the figma Page
        createCustomTailwindString(node.id, value) // [this is update the customClass object about the new entry format {nodeID --> customClasses}]
        customTailwindValue = iskeyInObject(addedCustomClasses, node.id);  // This function checks if there is any already exist mapping in the object

        // Creating and Initializing the fields for storing the Data in the Figma Plugin [Private to that Plugin ONLY]
        addedCustomClasses[node.id] ? node.setPluginData('CUSTOM_CLASSES', JSON.stringify(addedCustomClasses[node.id])) : node.setPluginData('CUSTOM_CLASSES', '');

        codeString = ''; // making the code string empty to generate the new code with the the Custom Classes in it
        createCode(node);  // Creating a New code String with the custom Classes added by the user

        // figma.ui.postMessage({codeString, customTailwindValue});  // Sending the new Code and customClasses value back to display in the UI
        figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customStyleValue, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    
        
    }
    else if(msg.category === 'customStyle') {
        let value = msg.customStyle;
        const node = figma.currentPage.selection[0]; // The current selected Layer in the figma Page
        createCustomStylingString(node.id, value); // [this is update the customStyling object about the new entry format {nodeID --> customStyling}]
        customStyleValue = iskeyInObject(addedCustomStyling, node.id); // This function checks if there is any already exist mapping in the object
        
        // Creating and Initializing the fields for storing the Data in the Figma Plugin [Private to that Plugin ONLY]
        addedCustomStyling[node.id] ? node.setPluginData('CUSTOM_STYLES', JSON.stringify(addedCustomClasses[node.id])) : node.setPluginData('CUSTOM_STYLES', '');

        codeString = ''; // making the code string empty to generate the new code with the the Custom Styling in it
        createCode(node);  // Creating a New code String with the custom Stylinh added by the user

        // figma.ui.postMessage({codeString, customStyleValue}); // Sending the new Code and customStyle values back to display in the UI
        figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customStyleValue, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    
        
    }
    else if (msg.category === 'tagName') {
        let value = msg.tagName;
        const node = figma.currentPage.selection[0];   // The current selected Layer in the figma Page
        setTagName(node.id, value)  // [this is to update the customTag object about the new entery format {nodeID --> customTag}]
        customTag = iskeyInObject(addedTagName, node.id)  // This function checks if there is any already exist mapping in the object.
        
        // Creating and Initializing the fields for storing the Data in the Figma Plugin [Private to that Plugin ONLY]
        addedTagName[node.id] ? node.setPluginData('CUSTOM_TAGS', JSON.stringify(addedTagName[node.id])) : node.setPluginData('CUSTOM_TAGS', '');
        
        codeString = ''; // making the code string empty to generate the new code with the custom Classes in it.
        createCode(node) // Creating a New code String with the custom tagName added by the user

        // figma.ui.postMessage({codeString, customTag});  // Sending the new Code and tagName values back to display in the UI
        figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customStyleValue, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    
    }
    else if (msg.category === 'customInteractions') {
        let value = msg.customInteractions;
        const node = figma.currentPage.selection[0];   // The current selected Layer in the figma Page
        let cleanValue = removeGarbageInteractions(value); // Removing the Garbage Values (Means if the state is selected but there is not class added to it)

        createInteractionsString(node.id, cleanValue); // [This is to update the customInteractions Object about the new entry format {nodeID --> customInteractions}]
        customInteractionValue = iskeyInObject(addedCustomInteractions, node.id) // This function checks if there is any already exist mapping in the object
        
        // Creating and Initializing the fields for storing the Data in the Figma Plugin [Private to that Plugin ONLY]
        addedCustomInteractions[node.id] ? node.setPluginData('CUSTOM_INTERACTIONS', JSON.stringify(addedCustomInteractions[node.id])) : node.setPluginData('CUSTOM_INTERACTIONS', '');
        codeString = ''; // making the code String empty to generate the new Code with the custom Classes in it.
        createCode(node) // Creating a new code String with the custom Interactions added by the User

        // figma.ui.postMessage({codeString, customInteractionValue});  // Sending the new Code and Custom Interactions values back to display in the UI
        figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customStyleValue, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    
    }   
     
    if(msg.clearData == 'clearData'){
        const node = figma.currentPage.selection[0];
        removeDataFromTree(node);
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

    let nodeids = [];
    const node = figma.currentPage.selection[0];

    traverseIds = traverseLayers(node, nodeids);
    codeString = '';
    createCode(traverseIds[0]);
    
    if(node.getPluginData('BREAKPOINTS')){   // Condition to check, if there is already any data stored in plugin for that node
        bpValue = node.getPluginData('BREAKPOINTS');  // if yes, then assign it to bpValue
    }else{
        if(changedBreakpoints[node.id]){
            bpValue = changingBPStringToObj(node.id)
        }else{
            bpValue = changingBPStringToObj(node.id);   // This function will check if any breakPoints value already given to certain key (node)
        }
    }

    if(node.getPluginData('CUSTOM_CLASSES')){   // Condition to check, if there is already any data stored in plugin for that node
        customTailwindValue = node.getPluginData('CUSTOM_CLASSES'); // if yes, then assign it to customTailwindValue
        customTailwindValue = customTailwindValue.replaceAll('"', '');
    }else{
        customTailwindValue = iskeyInObject(addedCustomClasses,node.id) // This function will check if there is any custom Classes value already given to the certain key, if YES, then return classes else return false
    }

    if(node.getPluginData('CUSTOM_TAGS')){  // Condition to check, if there is already any data stored in plugin for that node
        customTag = node.getPluginData('CUSTOM_TAGS');  // if yes, then assign it to customTag
        customTag = customTag.replaceAll('"', '');
    }else{
        customTag = iskeyInObject(addedTagName, node.id) // This function will check if there is any custom tag Name already given to the certain key, if YES, then return the tagName, else returns false
    }

    if(node.getPluginData('CUSTOM_INTERACTIONS')){  // Condition to check, if there is already any data stored in plugin for that node
        customInteractionValue = node.getPluginData('CUSTOM_INTERACTIONS'); // if yes, then assign it to customInteractionValue
        customInteractionValue = customInteractionValue.replaceAll('"', '');
    }else{
        customInteractionValue = iskeyInObject(addedCustomInteractions, node.id) // This function will check if there is any custom Styling already given to the certain key, if YES, then return the customStyles, else returns false
    }

    if(node.getPluginData('CUSTOM_STYLES')){  // Condition to check, if there is already any data stored in plugin for that node
        customInteractionValue = node.getPluginData('CUSTOM_STYLES'); // if yes, then assign it to customInteractionValue
        customInteractionValue = customInteractionValue.replaceAll('"', '');
    }else{
        customInteractionValue = iskeyInObject(addedCustomStyling, node.id) // This function will check if there is any custom Styling already given to the certain key, if YES, then return the customStyles, else returns false
    }

    // Sending the values back to the ui.html to display
    figma.ui.postMessage({codeString, bpValue, customTailwindValue, customTag, customStyleValue, customInteractionValue}); // This is necessary to send for the UI, so that It will automatically update the UI and adjust the parameters according to new layer selection    
        
});