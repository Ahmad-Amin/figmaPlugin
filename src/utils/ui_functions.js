let changedBreakpoints = {};
let addedCustomClasses = {};
let addedTagName = {};

//function for iterating over a map and finding the respective node's data in that map

function iter(objMap, node){
    if(!node) return {};
    let returnObj = {};
    Object.keys(objMap).forEach(key => {
        if(key == node.id){
            returnObj['key'] = key;
            returnObj['Classes'] = objMap[key];
        }
    });
    return returnObj;
}


// function for checking the changed breakpoints Map
function addBreakpointsClasses(node){
    const obj = iter(changedBreakpoints, node);
    let key = obj.key;
    let classes = obj.classes;
    let smClasses, mdClasses, lgClasses, xlClasses, _2xlClasses;

    if(classes){
        smClasses = classes.sm.split(' ').map(att => {
            if(att=='' || att==' ') return '';
            return `sm:${att}`
        }).join(' ');
        mdClasses = classes.md.split(' ').map(att => {
            if(att=='' || att==' ') return '';
            return `md:${att}`
        }).join(' ');
        lgClasses = classes.lg.split(' ').map(att => {
            if(att=='' || att==' ') return '';
            return `lg:${att}`
        }).join(' ');
        xlClasses = classes.xl.split(' ').map(att => {
            if(att=='' || att==' ') return '';
            return `xl:${att}`
        }).join(' ');
        _2xlClasses = classes._2xl.split(' ').map(att => {
            if(att=='' || att==' ') return '';
            return `2xl:${att}`
        }).join(' ');
    }
    let combinedClasses = smClasses + ' ' + mdClasses + ' ' + lgClasses + ' ' + xlClasses + ' ' + _2xlClasses;

    if(key){
        if(!node.name.includes('(')){
            node.name += `(${combinedClasses})`;
        }else{
            let nameArr = node.name.split('');//gives the name as an array
            let cutCount = nameArr.slice(nameArr.indexOf('(')+1, nameArr.indexOf(')')).length;
            nameArr.splice(nameArr.indexOf('(')+1, cutCount)
            let convString = nameArr.join('').replace(')', `${combinedClasses})`);
            node.name = convString;
        }
        return combinedClasses;
        
    }else{
        if(!node.name.includes('(')){
            node.name += ``;
        }
        return '';
    } 
}


function addCustomClasses(node){
    const obj = iter(addedCustomClasses, node);
    const customClasses = obj.classes;
    const key = obj.key;
    if(key){
        if(!node.name.includes('[')){
            if(node.name.includes('(')){
                node.name += `[${customClasses}]`;
            }else{
                node.name += `()[${customClasses}]`;
            }
        }else{
            let nameArr = node.name.split('');//gives the name as an array
            let cutCount = nameArr.slice(nameArr.indexOf('[')+1, nameArr.indexOf(']')).length;
            nameArr.splice(nameArr.indexOf('[')+1, cutCount)
            // console.log('name', node.name)
            let convString = nameArr.join('').replace(']', `${customClasses}]`);
            // node.name += `(${combinedClasses})`;
            node.name = convString;
        }
        return customClasses;
        
    }else{
        if(!node.name.includes('[')){
            node.name += ``;
        }
        return '';
    } 
}

function addTagName(node){
    const obj = iter(addedTagName, node);
    const tagName = obj.classes;
    // console.log('object - tagname', obj)
    const key = obj.key;
    if(key){
        if(!node.name.includes('{')){
            if(node.name.includes('(')){
                if(node.name.includes('[')){
                    node.name += `{${tagName}}`;
                }else{
                    node.name += `[]{${tagName}}`;
                }
            }else{
                node.name += `()[]{${tagName}}`;
            }
        }else{
            let nameArr = node.name.split('');//gives the name as an array
            let cutCount = nameArr.slice(nameArr.indexOf('{')+1, nameArr.indexOf('}')).length;
            nameArr.splice(nameArr.indexOf('{')+1, cutCount)
            // console.log('name', node.name)
            let convString = nameArr.join('').replace('}', `${tagName}}`);
            // node.name += `(${combinedClasses})`;
            node.name = convString;
        }
        return tagName;
        
    }else{
        if(!node.name.includes('{')){
            node.name += ``;
        }
        return '';
    }
}

export default {
    addBreakpointsClasses,
    addCustomClasses,
    addTagName,
    iter,
    changedBreakpoints,
    addedCustomClasses,
    addedTagName
}