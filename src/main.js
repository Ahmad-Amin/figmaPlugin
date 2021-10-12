(()=>{var e={915:(e,t,r)=>{"use strict";r.r(t),r.d(t,{getBorderRadiusClass:()=>a,getBorderWidthClass:()=>s,getBorderColor:()=>d});var l=r(19),i=r(424);const{borderRadiusMap:n,borderWidthMap:o}=r(424),a=e=>{let t=e.topLeftRadius,r=e.topRightRadius,l=e.bottomRightRadius,i=e.bottomLeftRadius;return t||r||l||i?t==r&&t==l&&t==i?t>"24"?"rounded-full":`rounded${n[t]}`:`border-tl${n[t]} border-tr${n[r]} border-br${n[l]} border-bl${n[i]}`:""},s=e=>e.strokes&&0!=e.strokes.length?`border${o[e.strokeWeight]}`:"",d=e=>{if(e.strokes.length>0){let t=e.strokes[0].color;return`border-${i.colorMap[(0,l.RGBToHex)(t)]}`}}},536:(e,t,r)=>{"use strict";r.r(t),r.d(t,{flexMap:()=>l,justifyMap:()=>i,alignMap:()=>n});const l={HORIZONTAL:"flex flex-row",VERTICAL:"flex flex-col"},i={MIN:"justify-start",MAX:"justify-end",CENTER:"justify-center",SPACE_BETWEEN:"justify-between"},n={MIN:"items-start",MAX:"items-end",CENTER:"items-center"}},424:(e,t,r)=>{"use strict";r.r(t),r.d(t,{colorMap:()=>l,maxWidthPixelToTailwind:()=>i,pixelToTailwind:()=>n,fractionalPixelHaystack:()=>o,fontPixelToTailwind:()=>a,fontWeightMap:()=>s,borderRadiusMap:()=>d,borderWidthMap:()=>g});const l={"#FFFFFF":"white","#000000":"black","#F9FAFB":"gray-50","#F3F4F6":"gray-100","#E5E7EB":"gray-200","#D1D5DB":"gray-300","#9CA3AF":"gray-400","#6B7280":"gray-500","#4B5563":"gray-600","#374151":"gray-700","#1F2937":"gray-800","#111827":"gray-900","#FEF2F2":"red-50","#FEE2E2":"red-100","#FECACA":"red-200","#FCA5A5":"red-300","#F87171":"red-400","#EF4444":"red-500","#DC2626":"red-600","#B91C1C":"red-700","#991B1B":"red-800","#7F1D1D":"red-900","#FFFBEB":"yellow-50","#FEF3C7":"yellow-100","#FDE68A":"yellow-200","#FCD34D":"yellow-300","#FBBF24":"yellow-400","#F59E0B":"yellow-500","#D97706":"yellow-600","#B45309":"yellow-700","#92400E":"yellow-800","#78350F":"yellow-900","#ECFDF5":"green-50","#D1FAE5":"green-100","#A7F3D0":"green-200","#6EE7B7":"green-300","#34D399":"green-400","#10B981":"green-500","#059669":"green-600","#047857":"green-700","#065F46":"green-800","#064E3B":"green-900","#EFF6FF":"blue-50","#DBEAFE":"blue-100","#BFDBFE":"blue-200","#93C5FD":"blue-300","#60A5FA":"blue-400","#3B82F6":"blue-500","#2563EB":"blue-600","#1D4ED8":"blue-700","#1E40AF":"blue-800","#1E3A8A":"blue-900","#EEF2FF":"indigo-50","#E0E7FF":"indigo-100","#C7D2FE":"indigo-200","#A5B4FC":"indigo-300","#818CF8":"indigo-400","#6366F1":"indigo-500","#4F46E5":"indigo-600","#4338CA":"indigo-700","#3730A3":"indigo-800","#312E81":"indigo-900","#F5F3FF":"purple-50","#EDE9FE":"purple-100","#DDD6FE":"purple-200","#C4B5FD":"purple-300","#A78BFA":"purple-400","#8B5CF6":"purple-500","#7C3AED":"purple-600","#6D28D9":"purple-700","#5B21B6":"purple-800","#4C1D95":"purple-900","#FDF2F8":"pink-50","#FCE7F3":"pink-100","#FBCFE8":"pink-200","#F9A8D4":"pink-300","#F472B6":"pink-400","#EC4899":"pink-500","#DB2777":"pink-600","#BE185D":"pink-700","#9D174D":"pink-800","#831843":"pink-900"},i={448:"max-w-md",512:"max-w-lg",576:"max-w-xl",672:"max-w-2xl",768:"max-w-3xl",896:"max-w-4xl",1024:"max-w-5xl",1152:"max-w-6xl",1280:"max-w-7xl"},n={0:"0",1:"px",4:"1",6:"1.5",8:"2",10:"2.5",12:"3",14:"3.5",16:"4",20:"5",24:"6",28:"7",32:"8",36:"9",40:"10",44:"11",48:"12",56:"14",64:"16",80:"20",96:"24",112:"28",128:"32",144:"36",160:"40",176:"44",192:"48",208:"52",224:"56",240:"60",256:"64",272:"68",288:"72",304:"76",320:"80",336:"84",352:"88",368:"92",384:"96","50%":"1/2","33.33%":"1/3","66.66%":"2/3","25%":"1/4","50%":"2/4","75%":"3/4","20%":"1/5","40%":"2/5","60%":"3/5","80%":"4/5","16.66%":"1/6","33.33%":"2/6","50%":"3/6","66.66%":"4/6","83.33%":"5/6","8.33%":"1/12","16.66%":"2/12","25%":"3/12","33.33%":"4/12","41.66%":"5/12","50%":"6/12","58.33%":"7/12","66.66%":"8/12","75%":"9/12","83.33%":"10/12","91.66%":"11/12","95%:":"full",screen:"screen"},o=["8.33","16.66","25","33.33","41.66","50","58.33","66.66","75","83.33","91.66","95"],a={12:"text-xs",14:"text-sm",16:"text-base",18:"text-lg",20:"text-xl",24:"text-2xl",30:"text-3xl",36:"text-4xl",48:"text-5xl",60:"text-6xl",72:"text-7xl",96:"text-8xl",128:"text-9xl"},s={Thin:"font-thin","Extra Light":"font-extralight",Light:"font-light",Regular:"font-regular",Medium:"font-medium",SemiBold:"font-semibold",Bold:"font-bold","Extra Bold":"font-extrabold",Black:"font-black"},d={0:"-none",2:"-sm",4:"",6:"-md",8:"-lg",12:"-xl",16:"-2xl",24:"-3xl",9999:"-full"},g={0:"-0",2:"-2",4:"-4",8:"-8",1:""}},19:e=>{e.exports={RGBToHex:function(e){if(e){let t=e.r,r=e.g,l=e.b;return t=Math.round(255*e.r),r=Math.round(255*e.g),l=Math.round(255*e.b),t=t.toString(16),r=r.toString(16),l=l.toString(16),1==t.length&&(t="0"+t),1==r.length&&(r="0"+r),1==l.length&&(l="0"+l),`#${t.toUpperCase()+r.toUpperCase()+l.toUpperCase()}`}}}}},t={};function r(l){var i=t[l];if(void 0!==i)return i.exports;var n=t[l]={exports:{}};return e[l](n,n.exports,r),n.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var l in t)r.o(t,l)&&!r.o(e,l)&&Object.defineProperty(e,l,{enumerable:!0,get:t[l]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";const{flexMap:e,justifyMap:t,alignMap:l}=r(536),{pixelToTailwind:i}=r(424),n=e=>{if(e.parent&&e.parent.children.length>1){if(e.parent.children.indexOf(e)==e.parent.children.length-1&&e.parent.children.length>1)return"";let t;if("SPACE_BETWEEN"==e.parent.primaryAxisAlignItems)return"";if("parent"in e){if("VERTICAL"==e.parent.layoutMode)return t=e.parent.itemSpacing,`mb-${i[t]}`;if("HORIZONTAL"==e.parent.layoutMode)return t=e.parent.itemSpacing,`mr-${i[t]}`}return""}return""},o={"0_1_2_0_0.07":"shadow-sm","0_1_3_0_0.1":"shadow","0_4_6_-1_0.1":"shadow-md","0_10_15_-3_0.1":"shadow-lg","0_20_25_-5_0.1":"shadow-xl","0_25_50_-12_0.25":"shadow-2xl"},{colorMap:a,pixelToTailwind:s,fontPixelToTailwind:d,maxWidthPixelToTailwind:g,fontWeightMap:p,fractionalPixelHaystack:u}=r(424),{RGBToHex:c}=r(19),f=e=>{let t,r;if("GROUP"!=e.type){if(!e.fills)return"";if(e.fills.length>0)return t=e.fills[0].color,r=JSON.stringify(t),`bg-${a[c(t)]}`}return""},x=e=>{let t=Math.round(e.width,1);return t>384?(e=>{if(e.width<=384)return"";let t,r,l,i;if(e.parent&&(t=e.parent.width),r=e.width,l=100*(r/t).toFixed(2),l=u.reduce(((e,t)=>Math.abs(e-l)<Math.abs(t-l)?e:t)),l+="%",s[l])i=`w-${s[l]}`;else{let e=function(e){let t=e,r=[];if(e<=1280){let e=Object.keys(g);e.map((e=>{r.push(Math.abs(parseInt(e)-parseInt(t)))}));let l=r.indexOf(Math.min(...r));return g[e[l]]}return!1}(r);i=0!=e?`${e}`:"w-full"}return i})(e):t<=384&&s[t]?`w-${s[t]} `:""},h=e=>{let t=Math.round(e.height,1);return t>384?"":t<=384&&s[t]?`h-${s[t]} `:""},F=e=>{let t=[];e.effects&&e.effects.forEach(((e,r)=>{"DROP_SHADOW"==e.type&&t.push(e)}));let r="",l="";return t.forEach((e=>{let t=e.offset.x,i=e.offset.y,n=e.spread,a=e.radius,s=Math.round(100*e.color.a,1)/100;r=`${t}_${i}_${a}_${n}_${s}`;let d=[];const g=Object.keys(o);g.map(((e,t)=>{let l=m(r,e);d.push(l)}));const p=d.indexOf(Math.min(...d));l=o[g[p]]})),l},m=(e,t)=>{let r=e.split("_"),l=t.split("_"),i=0;for(let e=0;e<l.length;e++)i+=parseFloat(r[e])-parseFloat(l[e]);return Math.abs(i)};let E={};const y=(e,t)=>{if(null===t)return"";let r="";return Object.keys(t).map((e=>{t[e].length>0&&(r=r+e.toString()+":"+t[e].toString()+" ")})),E[e]=r,E},{getBorderRadiusClass:$,getBorderWidthClass:b,getBorderColor:B}=r(915);let w=[],C="";const A=(r,o)=>{let g="";for(var u=0;u<o;u++)g+=" ";let m="";if("children"in r){let a=r.children;const s=(e=>{let t=e.layoutMode,r=e.primaryAxisAlignItems,l=e.counterAxisAlignItems,i=e.paddingLeft,n=e.paddingRight,o=e.paddingTop,a=e.paddingBottom,s=e.itemSpacing;return{isFrame:"FRAME"==e.type||"COMPONENT"==e.type,mode:t,justify:r,align:l,paddingTop:o,paddingRight:n,paddingBottom:a,paddingLeft:i,spacing:s}})(r),d=(r=>{const n=e[r.mode],o=t[r.justify],a=l[r.align],s=i[r.paddingLeft],d=i[r.paddingRight],g=i[r.paddingTop],p=i[r.paddingBottom];return i[r.spacing],r.isFrame?`${n||""} ${o} ${a} pt-${g} pr-${d} pb-${p} pl-${s}`:""})(s);console.log(y(r.id,null)),m=`${y(r.id,null)} ${x(r)} ${h(r)} ${f(r)} ${d} ${b(r)} ${n(r)} ${B(r)} ${$(r)} ${F(r)}`,m=m.replace("undefined",""),m=m.replace(/ +(?= )/g," ").trim(),C+=`${g}<div class='${m}'>\n`,a.forEach((e=>{A(e,++o)})),C+=`${g}</div>\n`}else"RECTANGLE"==r.type&&(console.log(y(r.id,null)),m=`${y(r.id,null)} ${f(r)} ${x(r)} ${h(r)} ${(e=>{let t="",r=e.layoutMode;return r?(t="VERTICAL"==r?"flex flex-col items-center justify-center":"flex items-center justify-center",t):""})(r)} ${b(r)} ${B(r)} ${$(r)} ${n(r)} ${F(r)}`,m=m.replace(/ +(?= )/g," ").trim(),C+=`${g}<div class='${m}'></div>`),"TEXT"==r.type&&(console.log(y(r.id,null)),m=`${y(r.id,null)} ${(e=>{let t,r;e.fills.length>0&&(t=e.fills[0].color,r=JSON.stringify(t));let l,i=e.fontSize;e.fontName&&(l=e.fontName.style?e.fontName.style:"");let n="";switch(e.textAlignHorizontal){case"LEFT":n="text-left";break;case"CENTER":n="text-center";break;case"RIGHT":n="text-right";break;default:n=""}let o=e.lineHeight.value,g=s[o];return`text-${a[c(t)]} ${d[i]} ${p[l]} ${n} leading-${g}`})(r)} ${n(r)} ${F(r)}`,m=m.replace(/ +(?= )/g," ").trim(),r.characters?C+=`${g}<p class='${m}'>${r.characters.split("\n").join("&lt/br&gt")}</p>\n`:C+=`${g}<p class='${m}'></p>\n`);return C.toString()};function M(e,t){if("children"in e){t.push(e);for(const r of e.children)M(r,t)}return t}figma.showUI(__html__,{width:648,height:700,title:"Figma to Tailwind"}),figma.ui.onmessage=e=>{if("breakpoints"===e.category){let t=e.classes;const r=figma.currentPage.selection[0];y(r.id,t),A(r,0)}else if("customClasses"===e.category){let t=e.customClasses;figma.currentPage.selection[0],console.log(key,t)}else if("customInteractions"===e.category){let t=e.customInteractions;figma.currentPage.selection[0],console.log(key,t)}else if("tagName"===e.category){let t=e.tagName;figma.currentPage.selection[0],console.log(key,t)}},figma.on("selectionchange",(()=>{const e=figma.currentPage.selection[0];w=M(e,[]),C="",A(w[0],0);let t=(e=>{let t=[],r={sm:"",md:"",lg:"",xl:"","2xl":""};return e in E&&(t=E[e].split(" ")),t.map((e=>{let t,l;0!=e.length&&(t=e.slice(0,e.indexOf(":")),l=e.slice(e.indexOf(":")+1,e.length-1),r[t]=l)})),r})(e.id);figma.ui.postMessage({codeString:C,bpValue:t})}))})()})();