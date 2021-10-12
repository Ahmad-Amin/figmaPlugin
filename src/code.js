import {getValues, getTailWindClasses, getSpacingFromParent} from './class_functions/layout';

const { getBorderRadiusClass,
    getBorderWidthClass,
    getBorderColor } = require('./class_functions/border');        

import { getBGColor, getWidth, getHeight, getBoxShadow, textClasses, getLayout } from './class_functions/classes';
import {setBreakPoints, checkForAlreadyBreakPointIds} from './utils/ui_functions';   //importing the functions from the ui_functions file;


//Global Variables
let traverseIds = [];
let codeString = "";

const createCode = (node, level) => {

    let indent = '';
    for(var i = 0; i < level; i++){
        indent+=' ';
    }

    let classString = '';
    if('children' in node){

        let children = node.children;
        const values = getValues(node);
        const flexString = getTailWindClasses(values);

        classString = ` ${getWidth(node)} ${getHeight(node)} ${getBGColor(node)} ${flexString} ${getBorderWidthClass(node)} ${getSpacingFromParent(node)} ${getBorderColor(node)} ${getBorderRadiusClass(node)} ${getBoxShadow(node)}`;
        classString = classString.replace('undefined', ''); //Removing any undefiend value (whose figma-->tailwind mapping is not avialable:)
        classString = classString.replace(/ +(?= )/g, ' ').trim();
        codeString +=`${indent}<div class='${classString}'>\n`;

        children.forEach(child => {
            createCode(child, ++level);
        });

        codeString += `${indent}</div>\n`;
    }else{

        if(node.type == 'RECTANGLE'){
            classString = ` ${getBGColor(node)} ${getWidth(node)} ${getHeight(node)} ${getLayout(node)} ${getBorderWidthClass(node)} ${getBorderColor(node)} ${getBorderRadiusClass(node)} ${getSpacingFromParent(node)} ${getBoxShadow(node)}`;
            classString = classString.replace(/ +(?= )/g, ' ').trim();
            codeString += `${indent}<div class='${classString}'></div>`;
        }
        
        if(node.type == 'TEXT'){
            classString = `${textClasses(node)} ${getSpacingFromParent(node)} ${getBoxShadow(node)}`;
            classString = classString.replace(/ +(?= )/g, ' ').trim();
            if(node.characters){
                codeString += `${indent}<p class='${classString}'>${node.characters.split('\n').join('&lt/br&gt')}</p>\n`;
            }else{
                codeString += `${indent}<p class='${classString}'></p>\n`;
            }
        }
    }
    return codeString.toString();
}


// import getBorderRadiusClass from "."
figma.showUI(__html__, { width: 648, height: 700, title: 'Figma to Tailwind' });
figma.ui.onmessage = msg => {
    if (msg.category === 'breakpoints') {
        let value = msg.classes;
        const node = figma.currentPage.selection[0];   //The current selected Layer in the figma Page
        let breakPoints = setBreakPoints(node.id, value);   // [this will transform the breakpoints object to breakpoints string and returns it]
        



        // figma.ui.postMessage({breakPoints, key: node.id});

    }
    else if (msg.category === 'customClasses') {
        //let key = msg.nodeID;
        let value = msg.customClasses;
        const node = figma.currentPage.selection[0];   //The current selected Layer in the figma Page

        console.log(key, value);
    }
    else if (msg.category === 'customInteractions') {
        //let key = msg.nodeID;
        let value = msg.customInteractions;
        const node = figma.currentPage.selection[0];   //The current selected Layer in the figma Page

        console.log(key, value);
    }
    else if (msg.category === 'tagName') {
        //let key = msg.nodeID;
        let value = msg.tagName;
        const node = figma.currentPage.selection[0];   //The current selected Layer in the figma Page

        console.log(key, value);
    }
};
// if the selection on the current page changes then run this callback function
function traverseLayers(node, nodeids) {
    if ('children' in node) {
        nodeids.push(node);
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
    createCode(traverseIds[0], 0);
    
    let bpValue = checkForAlreadyBreakPointIds(node.id);   // This function will check if any breakPoints value is already given to certain key (node)

    figma.ui.postMessage({codeString, bpValue});
    // console.log(value);
    
});
