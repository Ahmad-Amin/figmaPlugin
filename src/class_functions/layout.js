//layouts
const { flexMap, justifyMap, alignMap } = require('../maps/layoutMaps');
const { pixelToTailwind } = require('../maps/map');
//flex
export const getValues = (node) => {
    let mode = node.layoutMode; // flex-row or flex-col
    let justify = node.primaryAxisAlignItems; // justify-items 
    let align = node.counterAxisAlignItems; // align
    let paddingLeft = node.paddingLeft; //padding between child and border
    let paddingRight = node.paddingRight;
    let paddingTop = node.paddingTop;
    let paddingBottom = node.paddingBottom;
    let spacing = node.itemSpacing; // space between items

    //assuming that the paddings are equal - taking only one value    

    return {
        isFrame:node.type=='FRAME' || node.type=='COMPONENT'?true:false,
        mode,
        justify,
        align,
        paddingTop,
        paddingRight,
        paddingBottom,
        paddingLeft,
        spacing
    }
}

export const getTailWindClasses = (nodeObj) => {
    //takes in an object containing the values from the node
    //flex
    const flex = flexMap[nodeObj.mode];
    // console.log('*************************')
    // console.log(nodeObj.mode)
    // console.log(flex)
    const justify = justifyMap[nodeObj.justify];
    const align = alignMap[nodeObj.align];
    const paddingLeft = pixelToTailwind[nodeObj.paddingLeft];
    const paddingRight = pixelToTailwind[nodeObj.paddingRight];
    const paddingTop = pixelToTailwind[nodeObj.paddingTop];
    const paddingBottom = pixelToTailwind[nodeObj.paddingBottom];

    const spacing = pixelToTailwind[nodeObj.spacing];

    if(nodeObj.isFrame){
        return `${flex?flex:''} ${justify} ${align} pt-${paddingTop} pr-${paddingRight} pb-${paddingBottom} pl-${paddingLeft}`;
    }else{
        return '';
    }
}

export const getSpacingFromParent = (node) => {
    if(node.parent  && node.parent.children.length > 1){
        if(node.parent.children.indexOf(node) == node.parent.children.length - 1 && node.parent.children.length>1){//last node
            return '';
        }
        let itemSpacing;
        if(node.parent.primaryAxisAlignItems=='SPACE_BETWEEN'){
            return '';
        }
        if("parent" in node){
            if(node.parent.layoutMode == 'VERTICAL'){
                itemSpacing = node.parent.itemSpacing;
                return `mb-${pixelToTailwind[itemSpacing]}`;
            }else if(node.parent.layoutMode == 'HORIZONTAL'){
                itemSpacing = node.parent.itemSpacing;
                return `mr-${pixelToTailwind[itemSpacing]}`;
            }
        }
        return '';
    }else{
        return '';
    }
}
