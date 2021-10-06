import { colorMap, pixelToTailwind, fontPixelToTailwind, fontWeightMap, fractionalPixelHaystack } from "../../maps/map/map";
import {RGBToHex} from '../../utils/util_functions/util_functions';
import {boxShadowMap} from '../../maps/boxShadow/boxShadow';

function getBGColor(node){
    let bgColor, bgColorString;

    if(node.type != 'GROUP'){

        // if the node have bgColor, then return it, mapping with the tailwind classes
        if(node.fills){
            if(node.fills.length > 0){
                bgColor = node.fills[0].color;
                bgColorString = JSON.stringify(bgColor);
                return `bg-${colorMap[RGBToHex(bgColor)]}`;
            }
        }else{
            return '';
        }
    }
    return '';
}

const getFractionalWidth = (node) => {
    if(node.width <= 384) return '';

    let parentWidth, width, nodeStartWidth, nodeEndWidth, widthPercentage;
    if(node.parent){
        parentWidth = node.parent.width;
    }
    width = node.width;
    widthPercentage = ((width/parentWidth).toFixed(2)*100);

    widthPercentage = fractionalPixelHaystack.reduce( (a, b) => {
        return Math.abs(a - widthPercentage) < Math.abs(b - widthPercentage) ? a : b;
    })

    widthPercentage += '%';

    let string;
    if(pixelToTailwind[widthPercentage]){
        string = `w-${pixelToTailwind[widthPercentage]}`
    }
    else {
        string = 'w-full';
    }

    return string;
}

function getWidth(node){
    let w = Math.round(node.width, 1);
    if(w > 384){
        return getFractionalWidth(node);
    }
    else if(w <= 384){
        return pixelToTailwind[w]? `w=${pixelToTailwind[w]}` : '';
    }
    return ``;
}

function getHeight(node){
    let h = Math.round(node.height, 1);
    if(h > 384){
        return ``;
    }
    else if(h <= 384){
        return pixelToTailwind[h]? `w=${pixelToTailwind[h]}` : '';
    }
    return ``;
}

function getLayout(node){
    let flex, flexClasses = '';
    let layout = node.layoutMode; //it gives vertical and Horizontal

    if(layout){
        flexClasses=layout=='VERTICAL'?'flex flex-col items-center justify-center':'flex items-center justify-center';
        return flexClasses;
    }else {
        return '';
    }
}

function getPadding(node){
    let paddingX, paddingY;
    if(node && node.parent.children[1]){
        paddingX = node.parent.children[1].x - node.x; 
        // i.e. it acts like a container
    } 
    if(node.parent.children[1] && node){
        paddingY = node.parent.children[1].y - node.y ;
    }
    return `px-${pixelToTailwind[paddingX]?pixelToTailwind[paddingX]:''} py-${pixelToTailwind[paddingY]?pixelToTailwind[paddingY]:''}`;
}


function textClasses(node){
    // console.log(node.fills)
    let textColor;
    let textColorString; 
    if(node.fills.length>0){
        textColor = node.fills[0].color;//gives an RGB value
        textColorString = JSON.stringify(textColor);
        // console.log(textColorString)
    } 

    let fontSize = node.fontSize;
    let fontWeight;
    if(node.fontName){
        fontWeight = node.fontName.style?node.fontName.style:'';
    }

    //text align horizontal
    let horizontalAlignString = '';
    let horizontalAlignValue = node.textAlignHorizontal;
    switch(horizontalAlignValue){
        case 'LEFT':
            horizontalAlignString = 'text-left';
            break;
        case 'CENTER':
            horizontalAlignString = 'text-center';
            break;
        case 'RIGHT':
            horizontalAlignString = 'text-right';
            break; 
        default:
            horizontalAlignString = '';
    }

    //line height
    let lineHeightValue = node.lineHeight.value;
    let lineHeightString = pixelToTailwind[lineHeightValue];

    return `text-${colorMap[RGBToHex(textColor)]} ${fontPixelToTailwind[fontSize]} ${fontWeightMap[fontWeight]} ${horizontalAlignString} leading-${lineHeightString}`;
}  

//box shadow function
function getBoxShadow(node){
    //getting all the properties from the node to create a string and then mapping those properties to a single tailwind class
    let shadowEffectArray = [];
    if(node.effects){
        node.effects.forEach((effect, index) => {
            if(effect.type == 'DROP_SHADOW'){
                shadowEffectArray.push(effect);
            }
        });
    }
    // const shadowObject = node.effects[shadowEffectIndex];
    let shadowClassString = '';
    let shadowClass = '';
    shadowEffectArray.forEach(eff => {
            //properties
            //color is always 0 0 0 -> black
            let xOffset = eff.offset.x;
            let yOffset = eff.offset.y;
            let spread = eff.spread;
            let blur = eff.radius;
            let opacity = Math.round(eff.color.a * 100, 1)/100;
        
            shadowClassString = `${xOffset}_${yOffset}_${blur}_${spread}_${opacity}`;
            // console.log(shadowClassString)
            if(Object.keys(boxShadowMap).includes(shadowClassString)){
                shadowClass = boxShadowMap[shadowClassString];
            }
    })
    return shadowClass;
}

export default {
    getBGColor,
    getFractionalWidth,
    getWidth,
    getHeight,
    getLayout,
    textClasses,
    getPadding,
    getBoxShadow
}
