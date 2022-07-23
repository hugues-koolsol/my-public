"use strict";
// the function drawTree1 does the main rendering job, you can tweek it easily
function cMyTree1(objectName,divId,lintre1,optionParms,callBack1){
 "use strict";


 var options1={};
 options1.design={};
 options1.sortOnly1=false;
 if(optionParms.hasOwnProperty('sortOnly') && true === optionParms.sortOnly) options1.sortOnly1=true;
 options1.deleteFunctionName='';
 if(optionParms.hasOwnProperty('deleteFunctionName') && ''!==optionParms.deleteFunctionName) options1.deleteFunctionName=optionParms.deleteFunctionName;
 options1.editFunctionName=null;
 if(optionParms.hasOwnProperty('editFunctionName') && ( ''!==optionParms.editFunctionName || null!==optionParms.editFunctionName )) options1.editFunctionName=optionParms.editFunctionName;
 options1.foldFunctionName=null;
 if(optionParms.hasOwnProperty('foldFunctionName') && ( ''!==optionParms.foldFunctionName || null!==optionParms.foldFunctionName )) options1.foldFunctionName=optionParms.foldFunctionName;
 
 var designOptionsList1=[ 
  {paramName : 'buttonsBorderWidthInPx'      , defaultValue : 1       , addafter : 'px' },
  {paramName : 'elementHeightInPx'           , defaultValue : 35      , addafter : 'px' },
  {paramName : 'elementBorderHeightInPx'     , defaultValue : 1       , addafter : 'px' },
  {paramName : 'branchesLeftOffsetInPixels'  , defaultValue : 12      , addafter : 'px' },
  {paramName : 'voidHeightInPixels'          , defaultValue : 15      , addafter : 'px' },
  {paramName : 'intervalHeightInPixels'      , defaultValue : 15      , addafter : 'px' },
  {paramName : 'intervalBorderNameStyle'     , defaultValue : 'solid' , addafter : ''   },
  {paramName : 'intervalBorderHeight'        , defaultValue : 1       , addafter : 'px' },
  
  {paramName : 'thinBorderColor'             , defaultValue : 'blue'  , addafter : ''   },  // globalCssSettings1.main.thinBorderColor.hexValue
  {paramName : 'editBackground'              , defaultValue : 'red'  , addafter : ''   },   // globalCssSettings1.backgrounds.editBackground.hexValue
  {paramName : 'successBackgroundColor'      , defaultValue : 'green'  , addafter : ''   }, // globalCssSettings1.backgrounds.successBackground.hexValue
  {paramName : 'headerBackgroundColor'       , defaultValue : 'yellow'  , addafter : ''   },// globalCssSettings1.table.headerBackgroundColor.hexValue
 ];
 

 // globalCssSettings1.xxxx can be defined in the global scope of other javascript
 
 for(var i=0;i<designOptionsList1.length;i++){
  if(optionParms.hasOwnProperty('design') && optionParms.design.hasOwnProperty([designOptionsList1[i].paramName])){
   options1.design[designOptionsList1[i].paramName]=optionParms.design[designOptionsList1[i].paramName]+designOptionsList1[i].addafter;
  }else{
   if(designOptionsList1[i].paramName=='thinBorderColor'){
    if(typeof globalCssSettings1 !== 'undefined' && globalCssSettings1.main.thinBorderColor.hexValue){
     options1.design[designOptionsList1[i].paramName]='#'+globalCssSettings1.main.thinBorderColor.hexValue; // options1.design['thinBorderColor']
     
    }else{
     options1.design[designOptionsList1[i].paramName]=designOptionsList1[i].defaultValue+designOptionsList1[i].addafter;
    }
   }else if(designOptionsList1[i].paramName=='editBackground'){
    if(typeof globalCssSettings1 !== 'undefined' && globalCssSettings1.backgrounds.editBackground.hexValue){
     options1.design[designOptionsList1[i].paramName]='#'+globalCssSettings1.backgrounds.editBackground.hexValue; // options1.design['editBackground']     
    }else{
     options1.design[designOptionsList1[i].paramName]=designOptionsList1[i].defaultValue+designOptionsList1[i].addafter;
    }
   }else if(designOptionsList1[i].paramName=='successBackgroundColor'){
    if(typeof globalCssSettings1 !== 'undefined' && globalCssSettings1.backgrounds.successBackground.hexValue){
     options1.design[designOptionsList1[i].paramName]='#'+globalCssSettings1.backgrounds.successBackground.hexValue; // options1.design['successBackgroundColor']     
    }else{
     options1.design[designOptionsList1[i].paramName]=designOptionsList1[i].defaultValue+designOptionsList1[i].addafter;
    }
   }else if(designOptionsList1[i].paramName=='headerBackgroundColor'){
    if(typeof globalCssSettings1 !== 'undefined' && globalCssSettings1.table.headerBackgroundColor.hexValue){
     options1.design[designOptionsList1[i].paramName]='#'+globalCssSettings1.table.headerBackgroundColor.hexValue; // options1.design['headerBackgroundColor']
    }else{
     options1.design[designOptionsList1[i].paramName]=designOptionsList1[i].defaultValue+designOptionsList1[i].addafter;
    }
   }else{
    options1.design[designOptionsList1[i].paramName]=designOptionsList1[i].defaultValue+designOptionsList1[i].addafter;
   }
  }
 }
 var topScrollDiv=null;
 var bottomScrollDiv=null;
 var sortContainerSize=null;
 var sortZoneSize=null;
 var maxScrollSize=0;
 var parentParent=null;
 var positionListenerTimeout=500;
 var doScreenAdjust=false;
 
 //=====================================================================================================================
 if(typeof globalScrollWidth1 !== 'undefined'){
  var globalScrollWidth1=0;
  getScrollWidth();
 }
 function getScrollWidth() { //setup globalScrollWidth1
     var body = document.getElementsByTagName('body')[0];
     var div = document.createElement("div");
     div.style.width = '100px';
     div.style.height = '100px';
     div.style.overflow = 'auto';
     div.style.opacity = 0.01;
     body.appendChild(div);
     var bag = document.createElement("div");
     var att1 = 'width:101px;height:101px;overflow:auto;';
     bag.style.width = '101px';
     bag.style.height = '101px';
     bag.style.overflow = 'auto';
     div.appendChild(bag);
     div.scrollTop = 100;
     globalScrollWidth1 = div.scrollTop - 1;
     div.removeChild(bag);
     body.removeChild(div);
 }
 
 
 
 options1.class_treeIntervalldiv2={};
 options1.class_treeIntervalldiv2.style='height:'+options1.design.voidHeightInPixels+';'
 options1.class_treeIntervalldiv2.style+='border:'+options1.design.intervalBorderHeight+' '+options1.design['thinBorderColor']+' '+options1.design.intervalBorderNameStyle+';'
 options1.class_treedivFolder1={};
 options1.class_treedivFolder1.style='margin-left:'+options1.design.branchesLeftOffsetInPixels+';'
 options1.class_treediv1={};
 options1.class_treediv1.style='border-width:'+options1.design.elementBorderHeightInPx+';';
 options1.class_treediv1.style+='height:'+options1.design.elementHeightInPx+';'
 var class_treediv1BorderTopHeight=parseInt(options1.design.elementBorderHeightInPx,10);
 options1.class_treeFold1={};
 options1.class_treeFold1.style='border-width:'+options1.design.buttonsBorderWidthInPx+';';
 var element_heigh1=parseInt(options1.design.elementHeightInPx,10);
 var element_heigh2=parseInt(element_heigh1/2,10);
 var button__hei1=parseInt(options1.design.elementHeightInPx,10)-2*parseInt(options1.design.buttonsBorderWidthInPx,10);

 options1.class_treeFold1.style+='min-height:'+button__hei1+'px;';
 options1.class_treeFold1.style+='min-width:'+button__hei1+'px;';
 options1.class_treeFold1.style+='line-height:'+(button__hei1-10)+'px;';
 options1.class_treeFold1.style+='margin-right:3px;';
 options1.class_treeDelet1={};
 options1.class_treeDelet1.style='border-width:'+options1.design.buttonsBorderWidthInPx+';';
 options1.class_treeDelet1.style+='min-height:'+button__hei1+'px;';
 options1.class_treeDelet1.style+='min-width:'+button__hei1+'px;';
 options1.class_treeDelet1.style+='line-height:'+(button__hei1-10)+'px;';
 options1.class_treeHandle1={};
 options1.class_treeHandle1.style='border-width:'+options1.design.buttonsBorderWidthInPx+';';
 options1.class_treeHandle1.style+='min-height:'+button__hei1+'px;';
 options1.class_treeHandle1.style+='min-width:'+button__hei1+'px;';
 options1.class_treeHandle1.style+='line-height:'+(button__hei1-2)+'px;';
 options1.class_treeHandle1.style+='margin-top:0px;';
 options1.class_treeEdit={};
 options1.class_treeEdit.style='line-height:'+button__hei1+'px;font-size:'+(button__hei1-12)+'px;'; // margin-right:3px;
 
 options1.class_treeDelete={};
 options1.class_treeDelete.style='min-height:'+button__hei1+'px;min-width:'+button__hei1+'px;line-height:'+button__hei1+'px;font-size:'+(button__hei1-12)+'px;margin-right:3px;'; // ;
 //class_tree_yydanger

 options1.class_spaceEdit={};
 options1.class_spaceEdit.style='border-style: solid;border-color: transparent;'; 
// console.log('class_treediv1BorderTopHeight='+class_treediv1BorderTopHeight)
 
 var txt1='';
 var targetTouch1=null;
 var shadowDivTreeElement1=null;
 var startTouchY=0;
 var globPositions=[]; 
 var initialPositionInArray=-1;
 var finalPositionInArray=-1;
 var startPosY=0;
 var initialBodyOverflow=document.body.style.overflow;
 var initialBodyScrollY=0;
 var globGoodY=-1;
 var linearTree0=[];
 var newTree2=[];
 var newLinearTree1=[];
 var childrenOfSource=[];
 var newLinearTree2=[];
 var scrollTopCurrent1=0;
 //====================================================================================================
 function drawTree1(lintre2,level,parentId,context){ // recursive function to build the html representation
//  debugger;
  var count=0;
  if(level==0){
   linearTree0=[]; // this is the array which contain the 
   txt1='';
   newTree2=[];
   newLinearTree1=[];
  }
  var branch=null; 
  for(var elem in lintre2){ // elem // tree2
   branch=lintre2[elem];
   if(branch.parentId==parentId){
    count++;
    linearTree0.push({
     'id'       : branch.id       , 
     'parentId' : branch.parentId ,
     'data'     : branch.data     , 
     'isOpen'   : branch.isOpen   , 
     'position' : count               ,
    });
    if(count==1){
     txt1+='<div class="class_treeIntervalldiv2" data-level="'+level+'"  data-id="'+branch.id+'" data-conttype="before" data-parentid="'+parentId+'" style="'+options1.class_treeIntervalldiv2.style+'"></div>';
    }
    txt1+='<div class="class_treediv1" data-level="'+level+'" data-id="'+branch.id+'" data-conttype="element" data-parentid="'+parentId+'" style="'+options1.class_treediv1.style+'">';
    
    // Put here what you want. Here it is the label and the (id)
    txt1+=' <div class="class_treeTextContentdiv3">';
    if(optionParms.hideIdAfterLabel && optionParms.hideIdAfterLabel==true){
     txt1+=''+branch.data.label+'';
     if(branch.data.content && branch.data.content.attributes && branch.data.content.attributes.id){
      txt1+=' '+branch.data.content.attributes.id+'';
     }
    }else{
     txt1+=''+branch.data.label;    
     if(branch.data.content && branch.data.content.attributes && branch.data.content.attributes.id){
      txt1+=' '+branch.data.content.attributes.id+'';
     }
     txt1+=' (' + branch.id+' ';
     if(branch.data.hasOwnProperty('attributes') && branch.data.attributes.hasOwnProperty('id') && branch.data.attributes.id!==''){
      txt1+='<span style="font-size:0.9em;">#'+branch.data.attributes.id+'</span>';
     }
//     console.log('branch.data.label=',branch.data.label)
     if(branch.data.label==='use' && branch.data.hasOwnProperty('attributes') && branch.data.attributes.hasOwnProperty('xlink:href') && branch.data.attributes['xlink:href']!==''){
      txt1+='<span style="font-size:0.9em;color:red;">u('+branch.data.attributes['xlink:href']+')</span>';
     }
     txt1+=')'
    }
    txt1+=' </div>';
    
    
    txt1+=' <div class="class_treeHandle1" data-level="'+level+'" data-id="'+branch.id+'" data-conttype="element" data-parentid="'+parentId+'" style="'+options1.class_treeHandle1.style+'">&#8597;</div>'; // ⇳ ⇕ ⇵
    txt1+='</div>';
    txt1+='<div class="class_treedivFolder1" style="display:'+(branch.isOpen==1?'block':'none')+';'+options1.class_treedivFolder1.style+'" ';
    txt1+=' data-level="'+level+'"  data-id="'+branch.id+'" data-conttype="folder"  data-isopen="'+branch.isOpen+'"  data-parentid="'+parentId+'">';
    level++;
    // recursive call
    drawTree1(lintre2,level,branch.id,context);
    txt1+='</div>';
    level--;
    txt1+='<div class="class_treeIntervalldiv2" data-level="'+level+'"  data-id="'+branch.id+'" data-conttype="after"  data-parentid="'+parentId+'" style="'+options1.class_treeIntervalldiv2.style+'"></div>';
   }
  }
  if(level==0){
   // the html tree is build, we display it
   document.getElementById(divId).innerHTML=txt1;
   
   // and then we add the buttons +/- and delete/edit
   var lst=document.getElementById(divId).getElementsByTagName('div');
   for(var i=0;i<lst.length;i++){
    if(lst[i].className=='class_treedivFolder1'){ // put the plus/minus buttons to open/close a folder
     if(lst[i].innerHTML!='' ){
      var lst2=document.getElementById(divId).getElementsByTagName('div');
      for(var j=0;j<lst2.length;j++){
       if(lst2[j].getAttribute('data-id') == lst[i].getAttribute('data-id') && lst2[j].className=='class_treediv1'){
        var t='';
        if(options1.foldFunctionName!==null && options1.foldFunctionName!==''){
         if(lst[i].getAttribute('data-isopen')=='1'){
          // fold buttons "-" are added here
          t='<a class="class_treeFold1" data-id="'+lst[i].getAttribute('data-id')+'" href="javascript:'+options1.foldFunctionName+'('+lst[i].getAttribute('data-id')+')" style="'+options1.class_treeFold1.style+'">-</a>';
         }else{
          // unfold buttons "+" are added here
          t='<a class="class_treeFold1" data-id="'+lst[i].getAttribute('data-id')+'" href="javascript:'+options1.foldFunctionName+'('+lst[i].getAttribute('data-id')+')" style="'+options1.class_treeFold1.style+'">+</a>';
         }
        }
        if(options1.deleteFunctionName!==''){
         t+='<span class="class_treeFold1" style="'+options1.class_treeFold1.style+options1.class_treeEdit.style+options1.class_spaceEdit.style+'" data-id="'+lst[i].getAttribute('data-id')+'" >&nbsp;</span>';
        }
        if(options1.editFunctionName!==null){
         t+='<a class="class_treeFold1" style="'+options1.class_treeFold1.style+options1.class_treeEdit.style+'" data-id="'+lst[i].getAttribute('data-id')+'" href="javascript:'+options1.editFunctionName+'('+lst[i].getAttribute('data-id')+')" >📝</a>';
        }
//        console.log('avant:'+lst2[j].innerHTML)
        if(lst2[j].innerHTML.indexOf('<div class="class_treeHandle1"')>=0){
         lst2[j].innerHTML=lst2[j].innerHTML.replace('<div class="class_treeHandle1"',t+'<div class="class_treeHandle1"')
        }else{
         lst2[j].innerHTML=t+lst2[j].innerHTML;
        }
        break;
       }
      }    
     }else{
      
      if(options1.sortOnly1!==true){
       var lst2=document.getElementById(divId).getElementsByTagName('div');
       for(var j=0;j<lst2.length;j++){
        if(lst2[j].getAttribute('data-id') == lst[i].getAttribute('data-id') && lst2[j].className=='class_treediv1'){
         break;
        }
       }    
      }
      
      
      
      if(options1.deleteFunctionName!=''){ // put the delete button to delete an element
       var lst2=document.getElementById(divId).getElementsByTagName('div');
       for(var j=0;j<lst2.length;j++){
        if(lst2[j].getAttribute('data-id') == lst[i].getAttribute('data-id') && lst2[j].className=='class_treediv1'){
         var t='';
         t+='<span class="class_treeFold1" style="'+options1.class_treeFold1.style+options1.class_treeEdit.style+options1.class_spaceEdit.style+'" data-id="'+lst[i].getAttribute('data-id')+'" >&nbsp;</span>';
         t+='<a class="class_tree_yydanger" style="'+options1.class_treeDelete.style+'" data-id="'+lst[i].getAttribute('data-id')+'" href="javascript:'+options1.deleteFunctionName+'('+lst[i].getAttribute('data-id')+')">&times;</a>';
         if(options1.editFunctionName!==''){
          t+='<a class="class_treeFold1" style="'+options1.class_treeFold1.style+options1.class_treeEdit.style+'" data-id="'+lst[i].getAttribute('data-id')+'" href="javascript:'+options1.editFunctionName+'('+lst[i].getAttribute('data-id')+')" >📝</a>';
         }
         if(lst2[j].innerHTML.indexOf('<div class="class_treeHandle1"')>=0){
          lst2[j].innerHTML=lst2[j].innerHTML.replace('<div class="class_treeHandle1"',t+'<div class="class_treeHandle1"')
         }else{
          lst2[j].innerHTML=t+lst2[j].innerHTML;
         }
         break;
        }
       }    
      }else{
       if(options1.editFunctionName!==''){
        for(var j=0;j<lst2.length;j++){
         if(lst2[j].getAttribute('data-id') == lst[i].getAttribute('data-id') && lst2[j].className=='class_treediv1'){
          var t='<a class="class_treeFold1" style="'+options1.class_treeFold1.style+options1.class_treeEdit.style+'" data-id="'+lst[i].getAttribute('data-id')+'" href="javascript:'+options1.editFunctionName+'('+lst[i].getAttribute('data-id')+')" >📝</a>';
          if(lst2[j].innerHTML.indexOf('<div class="class_treeHandle1"')>=0){
           lst2[j].innerHTML=lst2[j].innerHTML.replace('<div class="class_treeHandle1"',t+'<div class="class_treeHandle1"')
          }else{
           lst2[j].innerHTML=t+lst2[j].innerHTML;
          }
//          lst2[j].innerHTML=t+lst2[j].innerHTML;
          break;
         }
        }    
       }
      }
     }
    }
   }
   computePositions(context);
  }   
 }
 //====================================================================================================
 function computePositions(context){  // compute positions of the html elements and put these positions in an array: globPositions 
  globPositions=[];
  initialBodyScrollY=getPageYoffset(); 
  
  var bodyRect = document.body.getBoundingClientRect();
  var elemRect = null;
  var lst=document.getElementById(divId).getElementsByTagName('div');
  for(var i=0;i<lst.length;i++){
   if(lst[i].className=='class_treediv1' || lst[i].className=='class_treeIntervalldiv2'){
    elemRect = lst[i].getBoundingClientRect();
    globPositions.push({
     element:lst[i],
     type:lst[i].className ,
     top:elemRect.top+initialBodyScrollY,
     height:elemRect.height,
//     width:elemRect.width, // unused but if you want to add id, feel free...
    })
   }
   if(lst[i].className=='class_treeHandle1'){
    lst[i].addEventListener('touchstart',myTouchStart,'touch');
    lst[i].addEventListener('mousedown',myMouseStart,'touch');
    
/*    
    if(is_touch_device()){
     lst[i].addEventListener('touchstart',myTouchStart,'touch');
     console.log('ajout de touch start à lst[i]=' , lst[i] );
    }else{
     lst[i].addEventListener('mousedown',myMouseStart,'touch');
    }
*/    
   }
  }
  try{
   if('startMove'!==context){ // the computePositions il called at every start of click
    callBack1(  {action:context,divId:divId} , linearTree0 );
   }
  }catch(e){
   console.error('Call back function for ' + objectName + ' is not defined or incorrect',e);
  }
 }
 //====================================================================================================
 function __delete(f){
  for(var i=0;i<linearTree0.length;i++){
   if(linearTree0[i].id==f){
    linearTree0.splice(i,1);
    var newTree=linearTree0;
    drawTree1(newTree,0,0,'delete|'+f)
    return;
   }
  }
 }
 //====================================================================================================
 function __fold(f){ // fold or unfold a branch
//  console.log('__fold='+f);
  var lst=document.getElementById(divId).getElementsByTagName('div');
  for(var i=0;i<lst.length;i++){
   if(lst[i].className=='class_treedivFolder1'){
//    console.log(lst[i].getAttribute('data-id'));
    if(f==parseInt(lst[i].getAttribute('data-id'),10)){
     var isOpen=0;
     if(lst[i].style.display=='none'){
      lst[i].style.display='block';
      lst[i].setAttribute('data-isopen','1');
      isOpen=1;
     }else{
      lst[i].style.display='none';
      lst[i].setAttribute('data-isopen','0');
      isOpen=0;
     }
     for(var j=0;j<linearTree0.length;j++){
      if(linearTree0[j].id==f){
       linearTree0[j].isOpen=isOpen;
       break;
      }
     }
     var lst2=document.getElementById(divId).getElementsByTagName('a');
     for(var j=0;j<lst2.length;j++){
      if(lst2[j].className=='class_treeFold1'){
       if(f==parseInt(lst2[j].getAttribute('data-id'),10)){
        if(isOpen==0){
         lst2[j].innerHTML='+';
        }else{
         lst2[j].innerHTML='-';
        }
        break;
       }
      }
     }
     computePositions('afterFold');
     return;
    }
   }
  }
  return;
 } 
 //====================================================================================================
 function myMouseStart(e){
//  console.log('myMouseStart' , e);
  e.preventDefault();
  e.stopPropagation();
  myFuncStart(e,e);
 }
 //====================================================================================================
 function myTouchStart(e){
  console.log('myTouchStart' , e);
  e.preventDefault();
  e.stopPropagation();
  myFuncStart(e,e.touches[0]);
 }
 //========================================================================================================
 function getSizes(){
  var xscreen = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
  var yscreen = window.innerHeight|| document.documentElement.clientHeight|| document.getElementsByTagName('body')[0].clientHeight;
  return {xscreen:xscreen,yscreen:yscreen};
 }
 //====================================================================================================
 function myFuncStart(e,e2){
  e.preventDefault();
  e.stopPropagation();
  initialBodyScrollY=getPageYoffset();
  targetTouch1=e.target;

  try{
   var parentRect = document.getElementById(divId).getBoundingClientRect();
   document.getElementById(divId).style.maxWidth=parentRect.width+'px';
  }catch(e){}
  
  scrollTopCurrent1=document.documentElement.scrollTop;
  var body = document.getElementsByTagName('body')[0];
  var computedStyle = window.getComputedStyle ? getComputedStyle(document.body, null) : document.body.currentStyle;
  var sizes=getSizes();
//  console.log(parseInt(computedStyle['height']),sizes.yscreen);
  if(parseInt(computedStyle['height'])<sizes.yscreen){
   doScreenAdjust=false;
  }else{
   doScreenAdjust=true;   
  }
  scrollTopCurrent1+=parseInt(computedStyle['marginTop'],10);

  if(doScreenAdjust){
   body.style.top=(-scrollTopCurrent1) + 'px';
   body.style.overflowY='scroll'; 
   body.style.position='fixed'; 
  }

//  document.body.style.overflow='hidden';
//  document.body.style.marginRight=globalScrollWidth1+'px';  
  try{document.getElementById('navbar').style.paddingRight=globalScrollWidth1+'px';}catch(e1){}
  try{document.getElementById('footer').style.paddingRight=globalScrollWidth1+'px';}catch(e1){}
  
  if(is_touch_device()){
   targetTouch1.addEventListener('touchmove',myTouchMove,'touchmove');
   targetTouch1.addEventListener('touchend',myTouchEnd,'touchend');
  }else{
   document.addEventListener('mousemove',myMouseMove,'mousemove');
   document.addEventListener('mouseup'  ,myMouseEnd ,'mouseup');
  }
  startTouchY=e2.clientY;
  shadowDivTreeElement1.style.top=startTouchY+'px';
  shadowDivTreeElement1.style.display='block'; // comment this if you do not want to see the shadow
  var thePosition = targetTouch1.getBoundingClientRect();
  initialPositionInArray=-1;
  computePositions('startMove');
  for(var i=0;i<globPositions.length;i++){
   if(thePosition.top+initialBodyScrollY>=globPositions[i].top && thePosition.top+initialBodyScrollY <= globPositions[i].top + globPositions[i].height ){
    initialPositionInArray=i;
    targetTouch1.style.backgroundColor=options1.design['editBackground']; // 'yellow'
    globPositions[i].element.style.backgroundColor=options1.design['successBackgroundColor']; // 'pink'
    break;
   }
  }
//  console.log('initialPositionInArray='+initialPositionInArray);
  startPosY=thePosition.top;
  shadowDivTreeElement1.style.left=thePosition.left+'px';
  shadowDivTreeElement1.style.top=(thePosition.top+initialBodyScrollY)+'px';
  shadowDivTreeElement1.style.width=thePosition.width+'px';
  shadowDivTreeElement1.style.height=thePosition.height+'px';
  shadowDivTreeElement1.style.borderStyle='outset';
//  console.log(style);
  stopIt=0;
  scrolling=false;
  touchDowning=true;
 }
 //====================================================================================================
 function myMouseMove(e){
  e.preventDefault();
  e.stopPropagation();
  myFuncMove(e,e);
 }
 //====================================================================================================
 function myTouchMove(e){
//  console.log('myTouchMove');
  e.preventDefault();
  e.stopPropagation();
  myFuncMove(e,e.touches[0]);
 }
 var stopIt=0;
 var scrolling=false;
 var touchDowning=false;
 var e2ClientY=0;
 var positionListenerOn=false;
 //====================================================================================================
 function positionListener(){
//  console.log('positionListener');
  if(e2ClientY>sortContainerSize.bottom){ // si on est plus bas que la zone de tri

   var sctop=parseInt(parentParent.scrollTop,10);
   if(sctop<maxScrollSize){
    if(stopIt<1000000&&scrolling==false){
     stopIt++;
     scrolling=true;
     var sctop=parseInt(parentParent.scrollTop,10);
     var newScrollTop=sctop+15;
     if(newScrollTop>maxScrollSize){
      newScrollTop=maxScrollSize;
     }
     parentParent.scrollTop=newScrollTop;
     var sctop=parseInt(parentParent.scrollTop,10);
     for(var i=0;i<globPositions.length;i++){
      globPositions[i].top-=15;
     }
     scrolling=false;
     setTimeout(positionListener,positionListenerTimeout);
    }       
   }
  }else if(e2ClientY<sortContainerSize.top){ // si on est plus haut que la zone de tri
   var sctop=parseInt(parentParent.scrollTop,10);
   if(sctop>0){
    if(stopIt<1000000&&scrolling==false){
     stopIt++;
     scrolling=true;
     var sctop=parseInt(parentParent.scrollTop,10);
     var newScrollTop=sctop-15;
     if(newScrollTop<0){
      newScrollTop=0;
     }
     parentParent.scrollTop=newScrollTop;
     var sctop=parseInt(parentParent.scrollTop,10);
     for(var i=0;i<globPositions.length;i++){
      globPositions[i].top+=15;
     }
     scrolling=false;
     setTimeout(positionListener,positionListenerTimeout);
    }       
   }
  }else{
   positionListenerOn=false;
  }
 }
 //====================================================================================================
 function myFuncMove(e,e2){
//  console.log(e2.clientY,sortContainerSize.top,sortContainerSize.bottom);
  var deltaY=myFuncMove.clientY-startTouchY;
  var newY=startPosY+e2.clientY-startTouchY+initialBodyScrollY;
  e2ClientY=e2.clientY;
  shadowDivTreeElement1.style.top=newY+'px';
  globGoodY=-1;
//  console.log('myFuncMove');
  for(var i=0;i<globPositions.length;i++){
   if(newY+element_heigh2>globPositions[i].top && newY+element_heigh2 <= globPositions[i].top+ globPositions[i].height){
    if(true==options1.sortOnly1 && 'class_treediv1'===globPositions[i].type){
     if(e2.clientY>sortContainerSize.bottom){ // si on est plus bas que la zone de tri
      if(positionListenerOn==false){
       setTimeout(positionListener,positionListenerTimeout);
      }
     }else if(e2.clientY<sortContainerSize.top){ // si on est plus haut que la zone de tri
      if(positionListenerOn==false){
       setTimeout(positionListener,positionListenerTimeout);
      }
     }
     
    }else{
     if(globPositions[i].element.style.backgroundColor!=options1.design['successBackgroundColor']){
      globPositions[i].element.style.backgroundColor=options1.design['successBackgroundColor']; // 'pink'
     }
     globGoodY=globPositions[i].top;
     if(e2.clientY>sortContainerSize.bottom){ // si on est plus bas que la zone de tri
      if(positionListenerOn==false){
       setTimeout(positionListener,positionListenerTimeout);
      }
     }else if(e2.clientY<sortContainerSize.top){ // si on est plus haut que la zone de tri
      if(positionListenerOn==false){
       setTimeout(positionListener,positionListenerTimeout);
      }
     }
    }
   }else{
    if(globPositions[i].element.style.backgroundColor==options1.design['editBackground']){ ; // 'yellow'
     globPositions[i].element.style.backgroundColor=options1.design['editBackground']; // 'yellow'
    }else{
     globPositions[i].element.style.backgroundColor=options1.design['headerBackgroundColor']; // 'white'
    }
   }
   
  }
//  console.log('myTouchMove',newY,e);
 }
 //====================================================================================================
 function fillChildrenOfSource(id){ // this builds an array of all children of the branch
                                    // you want to move to detect if a parent branch is moved under
                                    // a child branch which is not possible
  childrenOfSource.push(id);
  for(var i=0;i<linearTree0.length;i++){
   if(linearTree0[i].parentId==id){
    fillChildrenOfSource(linearTree0[i].id);
   }
  }
 }
 
 //====================================================================================================
 function myMouseEnd(e){
  e.preventDefault();
  e.stopPropagation();
  myFuncEnd(e);
 }
 //====================================================================================================
 function myTouchEnd(e){
  e.preventDefault();
  e.stopPropagation();
  myFuncEnd(e);
 }
 //====================================================================================================
 function myFuncEnd(e){
//  console.log('myTouchEnd',e);
  touchDowning=false;
  if(doScreenAdjust){
   document.body.style.overflow=initialBodyOverflow;
   document.body.style.position=''; 
   document.body.style.marginRight='';
   document.body.style.top='';
  }
  window.scrollTo(0,parseInt(scrollTopCurrent1,10)); // 
  try{document.getElementById('navbar').style.paddingRight='';}catch(e1){}
  try{document.getElementById('footer').style.paddingRight='';}catch(e1){}

  shadowDivTreeElement1.style.display='none';
  targetTouch1.style.backgroundColor=options1.design['headerBackgroundColor']; // 'white'
  if(is_touch_device()){
   targetTouch1.removeEventListener('touchmove',myTouchMove,false);
   targetTouch1.removeEventListener('touchend',myTouchEnd,false);
  }else{
   document.removeEventListener('mousemove',myMouseMove,false);
   document.removeEventListener('mouseup'  ,myMouseEnd ,false);
  }
  try{
   document.getElementById(divId).style.maxWidth='';
  }catch(e){}
  
  for(var i=0;i<globPositions.length;i++){
   globPositions[i].element.style.backgroundColor=options1.design['headerBackgroundColor']; // 'white'
  }
  if(globGoodY>=0){
   finalPositionInArray=-1;
   for(var i=0;i<globPositions.length;i++){
    if(globPositions[i].top==globGoodY){
     finalPositionInArray=i;
     if(initialPositionInArray>=0&& finalPositionInArray>=0 && initialPositionInArray!==finalPositionInArray && initialPositionInArray-1!=finalPositionInArray ){
      newLinearTree1=[];
      var toMove=null;
      var sourceId=parseInt(globPositions[initialPositionInArray].element.getAttribute('data-id'),10);
      childrenOfSource=[];
      fillChildrenOfSource(sourceId);
      
      var targetId=parseInt(globPositions[finalPositionInArray].element.getAttribute('data-id'),10);
      var founded=false;
      for(var j=0;j<childrenOfSource.length;j++){
       if(targetId==childrenOfSource[j]){
        founded=true;
       }
      }
      if(founded==false){ // if the target branch is not a child
       for(var i=0;i<linearTree0.length;i++){
        if(globPositions[initialPositionInArray].element.getAttribute('data-id')==linearTree0[i].id){
         toMove=linearTree0.splice(i,1);
         toMove=toMove[0];
        }
       }
       newLinearTree1=[];
       var typeOfMove='';
       var targetId=globPositions[finalPositionInArray].element.getAttribute('data-id');
       if(globPositions[finalPositionInArray].element.getAttribute('data-conttype')==='before'){
        typeOfMove='before';
        while(linearTree0.length>0){
         var toTake=linearTree0.splice(0,1);
         toTake=toTake[0];
         if(toTake.id==targetId){
          toMove.parentId=toTake.parentId;
          newLinearTree1.push(toMove);
          newLinearTree1.push(toTake);
         }else{
          newLinearTree1.push(toTake);
         }
        }
       }else if(globPositions[finalPositionInArray].element.getAttribute('data-conttype')==='after'){
        typeOfMove='after';
        while(linearTree0.length>0){
         toTake=linearTree0.splice(0,1);
         toTake=toTake[0];
         if(toTake.id==targetId){
          toMove.parentId=toTake.parentId;
          newLinearTree1.push(toTake);
          newLinearTree1.push(toMove);
         }else{
          newLinearTree1.push(toTake);
         }
        }
       }else{
        typeOfMove='inside';
        while(linearTree0.length>0){
         toTake=linearTree0.splice(0,1);
         toTake=toTake[0];
         if(toTake.id==targetId){
          toMove.parentId=toTake.id;
          toMove.position=0;
          newLinearTree1.push(toTake);
          newLinearTree1.push(toMove);
         }else{
          newLinearTree1.push(toTake);
         }
        }
       }
       // we have the linear new tree, now let's rebuild the tree
       drawTree1(newLinearTree1,0,0,'afterReorganize');
      }
      // reinit positions
      finalPositionInArray=-1;
      initialPositionInArray=-1;
      globGoodY=-1;
      sortContainerSize=parentParent.getBoundingClientRect();
      var parentElement=document.getElementById(divId); // myTreeId1
      sortZoneSize=parentElement.getBoundingClientRect();
      maxScrollSize=sortZoneSize.height-sortContainerSize.height;
      if(maxScrollSize<0){
       maxScrollSize=0;
      }
      return;
     }
    }
   }
  }
 }
 //====================================================================================================
 function is_touch_device(){
   return 'ontouchstart' in window||navigator.maxTouchPoints;// works on IE10/11 and Surface
 }; 
 //====================================================================================================
 function init2(lintre1,level,parentId,divId){
  var cssTextForScope1='';
  drawTree1(lintre1,0,0,'init');
  var height=0;
  var lst=document.getElementById(divId).getElementsByTagName('div');
  var count=0;
  for(var i=0;i<lst.length;i++){
   if(lst[i].className=='class_treediv1'){
    count++;
    if(1===count){
     var elemRect = lst[i].getBoundingClientRect();
     height=elemRect.height;
    }
   }
  }
  shadowDivTreeElement1=document.createElement('div');
  shadowDivTreeElement1.id='shadowDivTreeElement1_'+divId;
  shadowDivTreeElement1.className='class_treediv1';
  shadowDivTreeElement1.innerHTML='&nbsp;';
  shadowDivTreeElement1.style.zIndex=2;
  shadowDivTreeElement1.style.position='absolute';
  shadowDivTreeElement1.style.top='0';
  shadowDivTreeElement1.style.left='0';
  shadowDivTreeElement1.style.display='none';
  shadowDivTreeElement1.style.opacity=0.1;
  shadowDivTreeElement1.style.backgroundColor='black';
  shadowDivTreeElement1.style.height=height+'px';
  shadowDivTreeElement1.style.borderWidth='0px';
  
  document.body.appendChild(shadowDivTreeElement1);
  
  // create a div before the divId
  var parentElement=document.getElementById(divId); // myTreeId1
  parentParent = parentElement.parentNode;      // container1
  sortContainerSize=parentParent.getBoundingClientRect();
  
  var elemDivId=document.getElementById(divId);
  var divIdSize=elemDivId.getBoundingClientRect();
  var viewportHeight=Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  
  if(sortContainerSize.height<viewportHeight){
   parentParent.style.height=parseInt((viewportHeight-150),10)+'px';
  }
  
  sortZoneSize=parentElement.getBoundingClientRect();
  maxScrollSize=sortZoneSize.height-sortContainerSize.height;
  if(maxScrollSize<0){
   maxScrollSize=0;
  }
  setTimeout(afterInit,300);
 }
 
 //==================================================================================================== 
 function afterInit(){
  var parentElement=document.getElementById(divId); // myTreeId1
  parentParent = parentElement.parentNode;      // container1
  sortContainerSize=parentParent.getBoundingClientRect();
  sortZoneSize=parentElement.getBoundingClientRect();
  maxScrollSize=sortZoneSize.height-sortContainerSize.height;
//  console.log('maxScrollSize=',maxScrollSize , 'sortContainerSize=',sortContainerSize)
  if(maxScrollSize<0){
   maxScrollSize=0;
  }
 }
 //==================================================================================================== 
 function getPageYoffset(){
  var supportPageOffset = window.pageYOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
  var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop; 
  return y;
 }
 //==================================================================================================== 
 function __getTree(){
  return linearTree0;
 }
 //==================================================================================================== 
 function __addElement(t){
//  console.log(t);
//  var dt=new Date();
  var newTree3=[];
  var toAdd={
   id       : t.id,
   data     : t.data,
   isOpen   : t.isOpen,
   parentId : t.parentId,
   position : 0   
  };
  newTree3.push(toAdd);
  for(var i=0;i<linearTree0.length;i++){
   newTree3.push(linearTree0[i]);
  }
  linearTree0=newTree3;
  drawTree1(linearTree0,0,0,'addBranch');
 }
 //==================================================================================================== 
 init2(lintre1,0,0,divId);
 // export some functions
 return {
  fold       : function(i){__fold(i);},
  delete     : function(i){__delete(i);},
  getTree    : function(){return __getTree();},
  addElement : function(t){__addElement(t);},
  getThis    : function(){return {divId:divId};},
 }
}
