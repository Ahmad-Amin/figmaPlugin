import getBorderWidthClass from "./src/class_functions/border/border.js";
// import getBorderRadiusClass from "."
figma.showUI(__html__, { width: 648, height: 650, title: 'Figma to Tailwind' });
figma.ui.onmessage = msg => {
    if (msg.category === 'breakpoints') {
        let key = msg.nodeID;
        let value = msg.classes;
        console.log(key, value);
    }
    else if (msg.category === 'customClasses') {
        let key = msg.nodeID;
        let value = msg.customClasses;
        // const bF = new borderFunctions();
        // console.log(bF.getBorderWidthClass());
        // const bF = new borderFunctions();
        console.log(getBorderWidthClass());
        console.log(key, value);
    }
    else if (msg.category === 'customInteractions') {
        let key = msg.nodeID;
        let value = msg.customInteractions;
        console.log(key, value);
    }
    else if (msg.category === 'tagName') {
        let key = msg.nodeID;
        let value = msg.tagName;
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
}
figma.on('selectionchange', () => {
    let nodeids;
    const node = figma.currentPage.selection[0];
    traverseLayers(node, nodeids);
    console.log(nodeids);
});
