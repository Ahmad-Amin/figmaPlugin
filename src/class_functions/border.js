import { borderRadiusMap, borderWidthMap } from '../maps/map';

function getBorderRadiusClass(node){
    let topLeft = node.topLeftRadius;
    let topRight = node.toRightRadius;
    let bottomRight = node.bottomRightRadius;
    let bottomLeft = node.bottomLeftRadius;

    if(! (topLeft || topRight || bottomRight || bottomLeft)){
        return '';
    }

    let isLarge = topLeft > '24' ? true : false;

    //Case 1: All radii are equal Means have rounded border
    if(topLeft == topRight && topLeft == bottomRight && topLeft == bottomLeft){
        
        // If the borderRadius > 24px than, According to tailwind classes - It is a circle
        if(isLarge){
            return `rounded-full`;
        }

        // if the borderRadius < 24px
        return `rounded${borderRadiusMap[topLeft]}`;
    }

    // If the borderRadius of all sides are different, then return each one of them
    return `border-tl${borderRadiusMap[topLeft]} border-tr${borderRadiusMap[topRight]} border-br${borderRadiusMap[bottomRight]} border-bl${borderRadiusMap[bottomLeft]}`;
}

function getBorderWidthClass(node){
    // node's width property lies in the stroke property of Figma API

    // Checking if there is the stroke property in the node
    // plus checking if the stroke property is set to Zero
    if(!node.strokes || node.strokes.length == 0){
        return '';
    }

    // Returing the stroke mapping with the tailwind border class
    return `border${borderWidthMap[node.strokeWeight]}`;
}

export default {
    getBorderRadiusClass,
    getBorderWidthClass
}