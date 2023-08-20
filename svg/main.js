"use strict";
var trad={};
//========================================================================================================
function dogid(n){return document.getElementById(n);}
//========================================================================================================
var _listeners = [];
//========================================================================================================
EventTarget.prototype.addEventListenerBase = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, listener, typeElement){
  if(typeElement===false || typeElement=== undefined){
  }else{
   _listeners.push({target: this , parentElt1:this.parent, type: type, listener: listener , typeElement:typeElement});
  }
  if(typeElement==='button'){
   this.addEventListenerBase(type, listener , {capture:false,passive:true});
  }else{
   this.addEventListenerBase(type, listener , false);
  }
};
//========================================================================================================
function removeListeners(){
 for(var index = _listeners.length-1; index>=0;index--){
  var item = _listeners[index];
  item.target.removeEventListener(item.type, item.listener);
  _listeners.splice(index,1);
 }  
}
//========================================================================================================
var colorPickerData={
 value:null,
 id:null,
 context:null,
 opac:1,
 numArbre:null,
}
//========================================================================================================
function myObj1(initObj1){
 "use strict";
 var global_variable_name=initObj1.varname;
 var global_version_number=initObj1.version;
 
 var body = document.getElementsByTagName('body')[0];
 var xscreen=0;
 var yscreen=0;
 var globalScrollWidth1=0;// à priori 0 mais sur firefox, on a un min à 5
 var _dssvg={ // draw status svg
  arbre0               : [],
  historique1          : [],
  mode_en_cours        : 'setModeSaisieDeplace1',
  zoom1                : 1,
  viewBoxInit          : null,
  aimanterPixel1       : 1,
  idArbreCourant       : null,
  idArbrPreceden       : null,
  parametres           : {
   scroll_size          : 0,
   rayonReference       : 16,
   hauteurMinBtnMenuGau : 24,
   largeurMinBtnMenuHau : 24,
   optimisationChemin   : 2,
   largeurMenuGauche    : 30,
   hauteurMenuHaut      : 30,
   taillePolice         : 16,
   intervalleEntreBtns  : 5,
   deplacerLesPoignees  : 0,
   diviseurDeplacement  : 1,
   diviseurDeChemin     : 5,
   facteurAimnt         : 1,
   lang                 : 'fr',
  },
  strokeColor1          : 'rgb(0, 0, 0)',  
  strokeWidth1          : 1 ,  
  strokCols             : ['black','red','blue','green'],//['rgba(0,0,0,1)','rgba(255,0,0,1)','rgba(0,0,255,1)','rgba(0,255,0,1)'], // black red blue green yellow magenta
    filCols             : ['rgba(0,0,0,1)','rgba(255,0,0,1)','rgba(0,0,255,1)','rgba(0,255,0,1)'],
  
 };
 var lang='fr';
 
 var refZnDessin=null;
 var globalDernierePositionSouris={sx:null,sy:null};

 var divtpe=null;
 var divlft=null;
 var wi_of_the_brds1=1;
 var he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
 var wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
 var margns={t:0,l:0,b:30,r:10};
 var divc1=null;
 var decal={t:20,l:10};
 var wi_of_the_brds2=1;
 var xmlns='http://www.w3.org/2000/svg';
 var wi_of_the_brds3=1;
 var decalageX=0;
 var decalageY=0;
 var ecran_appuye=false;
 var divlag1=null;
 var divlag2=null;
 var pointsTraces=[];
 var tempchild=null;
 var initPosxy=null;
 
 var popupBackground1=null;
 var popupContent1=null;
 var popUpIsDisplayed1='';
 var etatPoigneesVoisines1=false; // poigneesVoisines1

 var oMyTree1=null;
 
 var rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
 
 var globalIndiceArbre=null;
 var globalIndicePoint=null;
 var globalGeneralReferencePointControleClique=null;
 var initMouseDownObj=null;
 var initClick=null;
 var globalGeneralSvgReferenceElement=null;
 
 var strkWiTexteSousPoignees=rayonPoint/20; // _dssvg.parametres.rayonReference/_dssvg.zoom1;
 var fontSiTexteSousPoignees=rayonPoint;


 
 var bckVert1='linear-gradient(rgb(121, 247, 131) 0%, rgb(190, 255, 219) 100%)';
 var bckVert2='linear-gradient(rgb(190, 255, 219) 0%, rgb(121, 247, 131) 100%)';
 var bckBleu ='linear-gradient(to bottom,#beedff 0%, #7eddff 100%);';
 var bckRouge='linear-gradient(red 0%, #db0000 100%)';
 var bckJaune='linear-gradient(gold 0%, #e3bf00 100%)';
 var bckRose='linear-gradient(rgb(233 192 215) 0%, rgb(255 213 236) 100%)';
 var marginPopup=25;
 var kellyColor1=null;
// var svgEtoile='<svg class="svgBoutonGauche1" viewBox="2 0  57 56"><polygon points="  30 9   35 23 50 23 40 33 45 48 30 38 15 48 20 33 10 23 25 23" fill="transparent" stroke-width="5" style="stroke:blue;fill:transparent;stroke-width:5;stroke-opacity:1;fill-opacity:1;"></polygon></svg>';
 var svgEtoile='<svg class="svgBoutonGauche1" viewBox="-95.1057 -100.5  190.2114 180.9017"><polygon points=" 0 -100.5  17.6336 -24.7705  95.1057 -31.4017  28.5317 8.7705  58.7785 80.4017  0 29.5  -58.7785 80.4017  -28.5317 8.7705  -95.1057 -31.4017  -17.6336 -24.7705  0 -100.5 " stroke-linecap="round" stroke-linejoin="round" style="stroke-width:15;stroke:blue;fill:transparent;"></polygon></svg>';
 var styylCopie=null;
 var selectSeulement=''; // vide, 'rouge', 'vert' , 'bleu'
 
 
 
 //========================================================================================================
 var strokeData={
  value:null,
  context:null,
  numArbre:null,
 }
 
 var groupeActif={
  refGroupe:null,
  idDansArbre:null,
  matrice:null,
  transform:null,
 };
 
 //========================================================================================================
 //========================================================================================================
 function recharger(e){
  document.location=String(document.location);
 }
 //========================================================================================================
 function changementVersion1(e){
  var contentOfPopup='<h3 style="text-align:center;margin:10px 5px;">'+trad['version']+'</h3>';
  contentOfPopup+='<br /><button id="okrecharger" class="butEnabled butMenuHaut" style="display:block;margin:10px auto;">&nbsp;&nbsp;OK&nbsp;&nbsp;</button>'
  contentOfPopup+='<br /><div style="width:80%;text-align:center;margin:10px auto;">'+trad['message_version']+'</div>';
  popupValue.innerHTML=contentOfPopup;
  document.getElementById('okrecharger').addEventListener('click',recharger,'button');
  showPopUp('changementVersion1');  
 }
 //========================================================================================================
 function popupSpecial1(e){
  var contentOfPopup='<h3>'+trad['Opérations_spéciales']+'</h3>';
  contentOfPopup+='<div id="choisirUnGroupeActif">';
  contentOfPopup+='<br /><button id="simplifierTousLesChemins1" class="butEnabled butMenuHaut" value="0">'+trad['arrondir_tous_les_chemins']+'</button>'
  contentOfPopup+='<br /><button id="tousCheminsEnAbsolu1" class="butEnabled butMenuHaut" value="0">'+trad['tous_les_chemins_en_absolu']+'</button>'
  contentOfPopup+='<br /><button id="decomposerLesMdesChemins1" class="butEnabled butMenuHaut" value="0">'+trad['decomposer_les_M_des_chemins']+'</button>'
  popupValue.innerHTML=contentOfPopup;
  document.getElementById('simplifierTousLesChemins1').addEventListener('click',simplifierTousLesChemins1,'button');
  document.getElementById('tousCheminsEnAbsolu1').addEventListener('click',tousCheminsEnAbsolu1,'button');
  document.getElementById('decomposerLesMdesChemins1').addEventListener('click',decomposerLesMdesChemins1,'button');
  showPopUp('popupSpecial1');  
 }
 //========================================================================================================
 function selectionneGroupeActif(e){
  groupeActif.matrice     = null;
  groupeActif.transform   = null;
  if(e.target.value==='0'){
   groupeActif.idDansArbre = 0;
   groupeActif.refGroupe   = refZnDessin;
  }else{
   groupeActif.idDansArbre=parseInt(e.target.value,10);
   groupeActif.refGroupe=document.querySelectorAll('[data-idarbre1="'+groupeActif.idDansArbre+'"]')[0];
  }
  closePopup();
  majBout();
 }
 //========================================================================================================
 function popGroupeActif1(e){
  var contentOfPopup='<h3>'+trad['selectionner_le_groupe_en_cours']+'</h3>';

  contentOfPopup+='<style>'
  contentOfPopup+='#choisirUnGroupeActif button{margin:3px;min-width:50px;}'
  contentOfPopup+='</style>'


  contentOfPopup+='<div id="choisirUnGroupeActif">';
  contentOfPopup+='<br /><button class="butEnabled butMenuHaut" value="0">racine</button>'
  
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].data.nodeName=='g'){
    contentOfPopup+='<br /><button class="butEnabled butMenuHaut" value="'+_dssvg.arbre0[i].id+'">'+_dssvg.arbre0[i].id+'</button>'
   }
  }
  contentOfPopup+='</div>';
  

  popupValue.innerHTML=contentOfPopup;
  var lst=document.getElementById('choisirUnGroupeActif').getElementsByTagName('button');
  for(var i=0;i<lst.length;i++){
   lst[i].addEventListener('click',selectionneGroupeActif,'button');
  }

  showPopUp('popGroupeActif1');  
 }
 
 //========================================================================================================
 function touchDownParPourcentageArrondi(e){
  e.stopPropagation();
  actionDownParPourcentageArrondi(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParPourcentageArrondi(e){
  e.stopPropagation();
  actionDownParPourcentageArrondi();
 }
 //========================================================================================================
 function actionDownParPourcentageArrondi(e){
  dogid('parPourcentageArrondi').addEventListener('touchmove' , changePourcentageArrondi , 'range');
  dogid('parPourcentageArrondi').addEventListener('mousemove' , changePourcentageArrondi , 'range');
  dogid('parPourcentageArrondi').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parPourcentageArrondi').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changePourcentageArrondi(e){
  e.stopPropagation();
  dogid('parPourcentageArrondiValeur').innerHTML=dogid('parPourcentageArrondi').value;
 }
 
 
 
 //========================================================================================================
 function touchDownParNombreDeBranches(e){
  e.stopPropagation();
  actionDownParNombreDeBranches(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParNombreDeBranches(e){
  e.stopPropagation();
  actionDownParNombreDeBranches();
 }
 //========================================================================================================
 function actionDownParNombreDeBranches(e){
  dogid('parNombreDeBranches').addEventListener('touchmove' , changeNombreDeBranches , 'range');
  dogid('parNombreDeBranches').addEventListener('mousemove' , changeNombreDeBranches , 'range');
  dogid('parNombreDeBranches').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parNombreDeBranches').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeNombreDeBranches(e){
  e.stopPropagation();
  dogid('parNombreDeBranchesValeur').innerHTML=dogid('parNombreDeBranches').value;
 }
 

 //========================================================================================================
 function calculerEtAjouterEtoile(){
  var nbbr=parseInt(document.getElementById('parNombreDeBranchesValeur').innerHTML,10);
  var perc=parseInt(document.getElementById('parPourcentageArrondiValeur').innerHTML,10);
  var angInit=-parseFloat(document.getElementById('parAngleInitial').value);
  if(angInit<-90 || angInit>0){
   angInit=0;
  }
  var tailleOriginale=100;
  var taille=tailleOriginale;
  
  var delta=360/nbbr/2;
  var tt='';
  for(var i=angInit,j=0;i<360+angInit;i+=delta,j++){
   if(j%2!==0){
    taille=tailleOriginale*perc/100;
   }else{
    taille=tailleOriginale;
   }
   var x=taille*Math.cos(i*Math.PI/180);
   var y=taille*Math.sin(i*Math.PI/180);
   tt+=' '+arrdi10000(x)+' '+arrdi10000(y)+' ';
  }
  var x=tailleOriginale*Math.cos(angInit*Math.PI/180);
  var y=tailleOriginale*Math.sin(angInit*Math.PI/180);
  tt+=' '+arrdi10000(x)+' '+arrdi10000(y)+' ';
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polygon');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'points'             , tt );
  globalClickDessin.tempchild.setAttribute( 'style' , 'stroke-width:1;stroke:'+(_dssvg.strokeColor1)+';fill:transparent;');
  refZnDessin.appendChild(globalClickDessin.tempchild);
  ajouteEntreeArbre('polygon',null);
  afficheArbre0({prendreTout:false});
  closePopup();
  
  
 }
 
 
 
 //========================================================================================================
 function insererUneSpirale2(){
  closePopup();
  
  var contentOfPopup='<h3>'+trad['insérer_une_étoile']+'</h3>';
  
  contentOfPopup+='<div >';
  contentOfPopup+='<div id="parNombreDePointsSp2Valeur" style="display:inline-block;min-width:2rem;">50</div>';
  contentOfPopup+='<label for="parNombreDePointsSp2"> : '+trad['nombre_de_pointsSp2']+'</label>';
  contentOfPopup+='<div>';
   contentOfPopup+='<input id="parNombreDePointsSp2" type="range" min="50" max="1000" step="50" value="50" style="width:95%;min-width:200px;max-width:500px;user-select:auto;" />';
  contentOfPopup+='</div>';
  contentOfPopup+='</div>';
  

  contentOfPopup+='<div >';
  contentOfPopup+='<div id="parNbToursSp2Valeur" style="display:inline-block;min-width:2rem;">1</div>';
  contentOfPopup+='<label for="parNbToursSp2"> : '+trad['nombre_de_tours_sp2']+'</label>';
  contentOfPopup+='<div>';
  contentOfPopup+='<input id="parNbToursSp2" type="range" min="1" max="50" step="1" value="1" style="width:95%;min-width:200px;max-width:500px;user-select:auto;" />';
  contentOfPopup+='</div>';
  contentOfPopup+='</div>';
  


  contentOfPopup+='<div >';
  contentOfPopup+='<button id="calculerEtAjouterSpirale2" class="butEnabled butMenuHaut">'+trad['insérer']+'</button>';
  contentOfPopup+='</div>';
  

  contentOfPopup+='<div style="margin-top:20px;">';
  contentOfPopup+='<button id="sp2_200_39" class="butEnabled butMenuHaut">200 x 39</button>';
  contentOfPopup+='<button id="sp2_50_15" class="butEnabled butMenuHaut">50 x 15</button>';
  contentOfPopup+='<button id="sp2_150_33" class="butEnabled butMenuHaut">150 x 33</button>';
  contentOfPopup+='</div>';
  
  popupValue.innerHTML=contentOfPopup;
  
  ajouteListenersSpirale2();
  showPopUp('insererUneSpirale2');  
  
  
 }
 
 //========================================================================================================
 function sp2_200_39(){
  dogid('parNombreDePointsSp2').value=200;
  dogid('parNombreDePointsSp2Valeur').innerHTML=200;
  
  dogid('parNbToursSp2').value=200;
  dogid('parNbToursSp2Valeur').innerHTML=39;
 }
 //========================================================================================================
 function sp2_50_15(){
  dogid('parNombreDePointsSp2').value=50;
  dogid('parNombreDePointsSp2Valeur').innerHTML=50;
  
  dogid('parNbToursSp2').value=15;
  dogid('parNbToursSp2Valeur').innerHTML=15;  
 }
 //========================================================================================================
 function sp2_150_33(){
  dogid('parNombreDePointsSp2').value=150;
  dogid('parNombreDePointsSp2Valeur').innerHTML=150;
  
  dogid('parNbToursSp2').value=33;
  dogid('parNbToursSp2Valeur').innerHTML=33;  
 }
 //========================================================================================================
 function touchDownParNombreDePointsSp2(e){
  e.stopPropagation();
  actionDownParNombreDePointsSp2(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParNombreDePointsSp2(e){
  e.stopPropagation();
  actionDownParNombreDePointsSp2();
 }

 //========================================================================================================
 function actionDownParNombreDePointsSp2(e){
  dogid('parNombreDePointsSp2').addEventListener('touchmove' , changeNombreDePointsSp2 , 'range');
  dogid('parNombreDePointsSp2').addEventListener('mousemove' , changeNombreDePointsSp2 , 'range');
  dogid('parNombreDePointsSp2').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parNombreDePointsSp2').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeNombreDePointsSp2(e){
  e.stopPropagation();
  dogid('parNombreDePointsSp2Valeur').innerHTML=dogid('parNombreDePointsSp2').value;
 }
 
 
 //========================================================================================================
 function touchDownParNbToursSp2(e){
  e.stopPropagation();
  actionDownParNbToursSp2(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParNbToursSp2(e){
  e.stopPropagation();
  actionDownParNbToursSp2();
 }

 //========================================================================================================
 function actionDownParNbToursSp2(e){
  dogid('parNbToursSp2').addEventListener('touchmove' , changeNbToursSp2 , 'range');
  dogid('parNbToursSp2').addEventListener('mousemove' , changeNbToursSp2 , 'range');
  dogid('parNbToursSp2').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parNbToursSp2').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeNbToursSp2(e){
  e.stopPropagation();
  dogid('parNbToursSp2Valeur').innerHTML=dogid('parNbToursSp2').value;
 }
 
 
 //========================================================================================================
 function calculerEtAjouterSpirale2(){
  var nbpt=parseInt(document.getElementById('parNombreDePointsSp2Valeur').innerHTML,10);
  var nbto=parseInt(document.getElementById('parNbToursSp2Valeur').innerHTML,10);
  
  var delta=360/nbpt;
  var tt='';
  var x=0;
  var y=0;
  for(var i=0;i<360;i+=delta){
   x=Math.cos(Math.PI/180*nbto*i)*i;
   y=Math.sin(Math.PI/180*nbto*i)*i;
   tt+=' '+arrdi10000(x)+' '+arrdi10000(y)+' ';
  }
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polyline');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'points'             , tt );
  globalClickDessin.tempchild.setAttribute( 'style' , 'stroke-width:1;stroke:'+(_dssvg.strokeColor1)+';fill:transparent;');
  refZnDessin.appendChild(globalClickDessin.tempchild);
  ajouteEntreeArbre('polyline',null);
  afficheArbre0({prendreTout:false});
  closePopup();
  
  
 }
 
 
 
 //========================================================================================================
 function ajouteListenersSpirale2(){
  dogid('parNombreDePointsSp2').addEventListener('mousedown'      , mouseDownParNombreDePointsSp2    , 'range' );
  dogid('parNombreDePointsSp2').addEventListener('touchstart'     , touchDownParNombreDePointsSp2    , 'range' );

  dogid('parNbToursSp2').addEventListener('mousedown'      , mouseDownParNbToursSp2    , 'range' );
  dogid('parNbToursSp2').addEventListener('touchstart'     , touchDownParNbToursSp2    , 'range' );

  dogid('calculerEtAjouterSpirale2').addEventListener('click'      , calculerEtAjouterSpirale2    , 'range' );
  
  dogid('sp2_200_39').addEventListener( 'click'     , sp2_200_39    , 'button' );
  dogid('sp2_50_15').addEventListener(  'click'     , sp2_50_15     , 'button' );
  dogid('sp2_150_33').addEventListener( 'click'     , sp2_150_33    , 'button' );
  
 }
 
 //========================================================================================================
 function insererUneEtoile(){
  closePopup();
  
  var contentOfPopup='<h3>'+trad['insérer_une_étoile']+'</h3>';
  
  contentOfPopup+='<div >';
  contentOfPopup+='<div id="parNombreDeBranchesValeur" style="display:inline-block;min-width:2rem;">8</div>';
  contentOfPopup+='<label for="parNombreDeBranches"> : '+trad['nombre_de_branches']+'</label>';
  contentOfPopup+='<div>';
   contentOfPopup+='<input id="parNombreDeBranches" type="range" min="3" max="72" step="1" value="8" style="width:95%;min-width:200px;max-width:500px;user-select:auto;" />';
  contentOfPopup+='</div>';
  contentOfPopup+='</div>';
  

  contentOfPopup+='<div >';
  contentOfPopup+='<div id="parPourcentageArrondiValeur" style="display:inline-block;min-width:2rem;">30</div>';
  contentOfPopup+='<label for="parPourcentageArrondi"> : '+trad['pourcentage_arrondi']+'</label>';
  contentOfPopup+='<div>';
  contentOfPopup+='<input id="parPourcentageArrondi" type="range" min="0" max="100" step="1" value="30" style="width:95%;min-width:200px;max-width:500px;user-select:auto;" />';
  contentOfPopup+='</div>';
  contentOfPopup+='</div>';
  

  contentOfPopup+='<div >';
  contentOfPopup+='<label for="parAngleInitial">'+trad['angle_initial']+' : </label>';
  contentOfPopup+='<input id="parAngleInitial" type="text" step="1" value="0" style="width:50%;max-width:500px;border: 3px #eee inset;font-size: 1.1em;" />';
  contentOfPopup+='</div>';
  

  contentOfPopup+='<div >';
  contentOfPopup+='<button id="calculerEtAjouterEtoile" class="butEnabled butMenuHaut">'+trad['insérer']+'</button>';
  contentOfPopup+='</div>';
  

  popupValue.innerHTML=contentOfPopup;

  
  ajouteListenersEtoile();
  showPopUp('insererUneEtoile');  
  
  
 }
 //========================================================================================================
 function ajouteListenersEtoile(){
  dogid('parNombreDeBranches').addEventListener('mousedown'      , mouseDownParNombreDeBranches    , 'range' );
  dogid('parNombreDeBranches').addEventListener('touchstart'     , touchDownParNombreDeBranches    , 'range' );

  dogid('parPourcentageArrondi').addEventListener('mousedown'      , mouseDownParPourcentageArrondi    , 'range' );
  dogid('parPourcentageArrondi').addEventListener('touchstart'     , touchDownParPourcentageArrondi    , 'range' );

  dogid('calculerEtAjouterEtoile').addEventListener('click'      , calculerEtAjouterEtoile    , 'range' );
 }
 //========================================================================================================
 function insererUnFiltre(){
  //
  var NouveauContenu='';
  NouveauContenu+='<defs>';
  NouveauContenu+=' <filter id="__filtered-3" height="220%">';
  NouveauContenu+='  <feFlood flood-color="#551C0B" result="COLOR-outline" />';
  NouveauContenu+='  <feMorphology operator="dilate" radius="0.3" in="SourceAlpha" result="OUTLINE_10" />';
  NouveauContenu+='  <feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20" />';
  NouveauContenu+='  <feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10" />';
  NouveauContenu+='  <feSpecularLighting surfaceScale="5" specularConstant="0.5" specularExponent="7.5" lighting-color="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20">';
  NouveauContenu+='   <fePointLight x="750" y="-50" z="300" />';
  NouveauContenu+='  </feSpecularLighting>';
  NouveauContenu+='  <feComposite in2="SourceAlpha" operator="in" in="LIGHTING-EFFECTS_20" result="LIGHTING-EFFECTS_30" />';
  NouveauContenu+='  <feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="LIGHTING-EFFECTS_30" result="LIGHTING-EFFECTS_40" />';
  NouveauContenu+='  <feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10">';
  NouveauContenu+='   <feFuncR type="gamma" offset="-1.3" amplitude="10" exponent="4.84" />';
  NouveauContenu+='   <feFuncB type="gamma" offset="-1.3" amplitude="10.1" exponent="40.84" />';
  NouveauContenu+='  </feComponentTransfer>';
  NouveauContenu+='  <feMerge>';
  NouveauContenu+='   <feMergeNode in="OUTLINE_20" />';
  NouveauContenu+='   <feMergeNode in="COLOR-EFFECTS_10" />';
  NouveauContenu+='  </feMergeNode>';
  NouveauContenu+='  </feMerge>';
  NouveauContenu+=' </filter>';
  NouveauContenu+='</defs>';
  var ancienContenu=refZnDessin.innerHTML;
  NouveauContenu=ancienContenu+NouveauContenu;
  refZnDessin.innerHTML=NouveauContenu;
  finirImport();
 } 
 //========================================================================================================
 function insererUnPatern(){
  // <text data-idarbre1="4" x="2.6556" y="2.1126" stroke="black" stroke-width="0.02" fill="transparent" font-family="Verdana" font-size="0.5">?</text> 
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'defs');
  refZnDessin.appendChild(globalClickDessin.tempchild);
  var parentId=ajouteEntreeArbre('defs',null);
  
  var defs=globalClickDessin.tempchild;
  
  
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'pattern');
  globalClickDessin.tempchild.setAttribute('id',(parentId+1));
  globalClickDessin.tempchild.setAttribute('viewBox','0 0 10 10');
  globalClickDessin.tempchild.setAttribute('width','10%');
  globalClickDessin.tempchild.setAttribute('height','10%');
  defs.appendChild(globalClickDessin.tempchild);
  var parentId=ajouteEntreeArbre('pattern',parentId);

  var pattern=globalClickDessin.tempchild;

  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polygon');
  globalClickDessin.tempchild.setAttribute('points','0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2');
  pattern.appendChild(globalClickDessin.tempchild);
  var parentId=ajouteEntreeArbre('polygon',parentId);
  
  afficheArbre0({prendreTout:false});
  closePopup();
 }
 //========================================================================================================
 function insererUneSpirale1(){
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'path');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'd'             , 'M 0.264 1.064 c 0.028 -0.34 -0.488 2.372 1.356 0.764 c 1.232 -1.072 0.352 -2.924 -0.904 -3.496 c -2.644 -1.2 -4.976 1.68 -4.668 4.152 c 0.796 6.356 9.42 4.848 11.236 -0.024 c 3.364 -9.032 -9.068 -13.736 -15.096 -8.172 c -9.228 8.52 0.624 22.24 11.648 20.7 c 19.24 -2.692 15.94 -30.228 -2.212 -33.252 c -25.028 -4.172 -32.484 30.908 -11.4 42.304 c 14.916 8.064 33.46 -0.752 38.352 -16.564 c 3.388 -10.956 -0.016 -23.112 -8.308 -30.972 c -15.404 -14.6 -40.684 -10.088 -51.788 7.428 c -7.98 12.588 -7.36 29.068 0.964 41.328 c 14.624 21.536 46.188 22.872 64.088 4.744 c 12.932 -13.096 16.492 -33.36 9.252 -50.224 c -12.708 -29.612 -50.956 -38.348 -76.436 -19.536 c -18.636 13.76 -26.3 38.456 -19.596 60.504 c 10.88 35.78 53.512 51.488 85.948 34.22 c 24.14 -12.852 37.456 -40.388 33.412 -67.316 c -6.648 -44.276 -54.872 -69.864 -95.908 -53.88 c -31.412 12.236 -50.728 44.824 -47.748 78.2 c 4.624 51.8 57.272 84.42 106.2 69.74 c 36.356 -10.908 61.524 -45.416 62.188 -83.16 c 1.08 -61.356 -57.6 -105.632 -116.488 -92.232 c -44.028 10.02 -75.724 49.576 -77.964 94.34' );
  globalClickDessin.tempchild.setAttribute( 'style' , 'stroke-width:3;stroke:blue;fill:transparent;stroke-linecap:round;stroke-linejoin:round');
  refZnDessin.appendChild(globalClickDessin.tempchild);
  ajouteEntreeArbre('path',null);
  afficheArbre0({prendreTout:false});
  closePopup();
 }
 //========================================================================================================
 function insererUneFleche(){
  // <text data-idarbre1="4" x="2.6556" y="2.1126" stroke="black" stroke-width="0.02" fill="transparent" font-family="Verdana" font-size="0.5">?</text> 
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polygon');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'points'             , '14 1 20 8  14 15   14 11 0 11 0 5 14 5' );
  globalClickDessin.tempchild.setAttribute( 'style' , 'stroke-width:1;stroke:blue;fill:transparent;');
  refZnDessin.appendChild(globalClickDessin.tempchild);
  ajouteEntreeArbre('polygon',null);
  afficheArbre0({prendreTout:false});
  closePopup();
  
 }
 //========================================================================================================
 var BtnsForme=[
  {id:'setModeSaisieRectangle1'   , position:'menuGauche' , contenu:'+Re'  , libelle:'rectangle'                                  , action:setModeSaisieRectangle1     , svg:'<svg class="svgBoutonGauche1" viewBox="-4.5 -4.5  63 63"><rect x="-0.5" y="-0.5" width="50" height="50" stroke="blue" stroke-width="5" fill="transparent"></rect></svg>'},
  {id:'setModeSaisieCercle1'      , position:'menuGauche' , contenu:'+Ce'  , libelle:'cercle'                                     , action:setModeSaisieCercle1        , svg:'<svg class="svgBoutonGauche1" viewBox="-4 -4  62 62"><circle cx="25" cy="25" r="25" stroke="blue" stroke-width="5" fill="transparent"></circle></svg>'},
  {id:'setModeSaisieEllipse1'     , position:'menuGauche' , contenu:'+El'  , libelle:'ellipse'                                    , action:setModeSaisieEllipse1       , svg:'<svg class="svgBoutonGauche1" viewBox="-29 -19  61 43"><ellipse cx="0" cy="0" rx="25" ry="16" stroke="blue" stroke-width="5" fill="transparent"></ellipse></svg>'},  
  
  {id:'setModeSaisieLigne1'       , position:'menuGauche' , contenu:'+Li'  , libelle:'ligne en chemin'                            , action:setModeSaisieLigne1         , svg:'<svg class="svgBoutonGauche1" viewBox="-31 -20.125  51 45.25"><path stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent" d="M -29,-18 L 18,20"></path><text x="-29" y="15" stroke="rgba(255, 0,0,0.8)" fill="yellow" font-family="Verdana" fill-opacity="0.5" style="font-size:34px;stroke-width:2;stroke:rgba(255, 0,0,0.8);fill:yellow;stroke-opacity:1;fill-opacity:0.5;">Ch</text></svg>'},
  {id:'setModeSaisieLigne2'       , position:'menuGauche' , contenu:'+Ll'  , libelle:'ligne en ligne'                             , action:setModeSaisieLigne2         , svg:'<svg class="svgBoutonGauche1" viewBox="-31 -29.25  52 62.125"><path stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent" d="M -29,-18 L 18,20"></path><text x="-26" y="18" stroke="rgba(255, 0,0,0.8)" fill="yellow" font-family="Verdana" style="font-size:47px;stroke-width:3;stroke:rgba(255, 0,0,0.8);fill:yellow;stroke-opacity:1;fill-opacity:0.5;" fill-opacity="0.5">Li</text></svg>'},
  
  {id:'setModeSaisiePolyline1'    , position:'menuGauche' , contenu:'+Pl'  , libelle:'polyligne'                                  , action:setModeSaisiePolyline1      , svg:'<svg class="svgBoutonGauche1" viewBox="-27 -18  53 46"><polyline points=" -13 -15 -23 5 1 22 21 9  15 -10  " stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent"></polyline></svg>'},
  {id:'setModeSaisiePolygon1'     , position:'menuGauche' , contenu:'+Pg'  , libelle:'polygone'                                   , action:setModeSaisiePolygon1       , svg:'<svg class="svgBoutonGauche1" viewBox="-27 -19  51 43"><polygon points="  -13,-15  -23 4 0 20 20 8 15 -10 15 -10 " stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent"></polygon></svg>'},
  
  {id:'ajouteText1'               , position:'menuGauche' , contenu:'+Te'  , libelle:'texte'                                      , action:ajouteText1                 , svg:'<svg class="svgBoutonGauche1" viewBox="0 1  24.7734375 21"><text x="1" y="17" stroke-width="0.64" fill="transparent" font-family="Verdana" font-size="16" style="stroke:blue;fill:transparent;stroke-width:0.64;stroke-opacity:1;fill-opacity:1;font-size:16;">txt</text></svg>'},
//  {id:'ajouteImage1'              , position:'menuGauche' , contenu:'+im'  , libelle:'image'                                      , action:ajouteImage1                , svg:'<svg class="svgBoutonGauche1" viewBox="67 71  213 213"><image x="73.9" y="73.9" xlink:href="./kermit.jpg"></image></svg>'},
  {id:'ajouteImage1'              , position:'menuGauche' , contenu:'+im'  , libelle:'image'                                      , action:ajouteImage1                , svg:'<svg class="svgBoutonGauche1" viewBox="4 15.4719  68 74.5281"><g transform=""><path d=" M 38 19 C 42 19 62 25 62 43 C 62 54 51 67 38 67 C 27 67 14 56 14 44 C 14 25 34 19 38 19 " stroke="rgb(0, 0, 0)" stroke-width="1" style="stroke:rgb(0, 0, 0);fill:greenyellow;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;" transform="   "></path><g><path stroke="rgb(0, 0, 0)" stroke-width="1" d=" M 23 30 C 24 30 29 28 31 26 C 33 24 34 22 34 21 C 34 20 33 19 31 18 C 29 17 27 17 25 18 C 23 19 21 22 21 24 C 21 26 22 29 23 30  z" style="stroke:rgb(0, 0, 0);fill:white;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linecap="round" d=" M 31 21 C 29 21 27 23 26 24  C 26 24 25 26 25 26"></path><circle cx="27" cy="23" r="1.75" stroke="rgb(0, 0, 0)" style="stroke:rgb(0, 0, 0);fill:black;stroke-width:0.5;stroke-opacity:1;fill-opacity:1;font-size:18;"></circle></g><g transform="translate(62 -10 ) rotate(71 0 0 ) "><path stroke="rgb(0, 0, 0)" stroke-width="1" d=" M 23 30 C 24 30 29 28 31 26 C 33 24 34 22 34 21 C 34 20 33 19 31 18 C 29 17 27 17 25 18 C 23 19 21 22 21 24 C 21 26 22 29 23 30  z" style="stroke:rgb(0, 0, 0);fill:white;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linecap="round" d=" M 31 21 C 29 21 27 23 26 24  C 26 24 25 26 25 26"></path><circle cx="27" cy="23" r="1.75" stroke="rgb(0, 0, 0)" style="stroke:rgb(0, 0, 0);fill:black;stroke-width:0.5;stroke-opacity:1;fill-opacity:1;font-size:18;"></circle></g><path stroke="rgb(0, 0, 0)" stroke-width="1" stroke-linejoin="round" d=" M 19 41 C 25 48 32 50 38 50 C 44 50 51 46 58 42 C 58 41 58 40 57 39 C 58 40 58 42 59 45 C 58 43 58 42 58 42 C 56 43 54 44 53 45 c -1 3 0 2 -2 8 C 49 59 43 63 39 63 C 35 63 32 62 29 58  C 26 54 26 51 24 46 C 26 50 22 44 19 41 c 0 -1 0 -1 1 -3 c -1 1 -2 5 -1 6" style="stroke:rgb(0, 0, 0);fill:red;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path><path d=" M 30 49 C 31 54 35 56 39 56 C 43 56 46 53 47 48 c -6 3 -10 3 -17 1 " stroke="rgb(0, 0, 0)" stroke-width="1" style="stroke:rgb(0, 0, 0);fill:pink;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path><path stroke="rgb(0, 0, 0)" stroke-width="1" stroke-linejoin="round" d=" M 20 58 C 15.120000000000001 62.88 11 61 6 62 C 8 62 13 67 20 60 C 20 66 6 72 4 82 C 6 78 15 72 23 64 C 22 70 15 76 13 83 C 19 78 24 74 30 69 C 30 74 31 81 32 86 C 34 82 39 76 42 71 C 44 76 47 81 51 88 C 52 83 52 78 51 70 C 55 73 60 76 65 82 C 63 77 60 70 56 64 C 59 66 65 68 69 65 C 63 65 58 62 55 59 C 46 69 32 71 20 58 " style="stroke:rgb(0, 0, 0);fill:greenyellow;stroke-width:1;stroke-opacity:1;fill-opacity:1;font-size:18;"></path></g></svg>'},
 ];
 
 //========================================================================================================
 function changePosition(e){
  var numArbre=parseInt(e.target.getAttribute('data-groupe'),10);
  var deplaceX=parseFloat(document.getElementById('deplaceX').value);
  var deplaceY=parseFloat(document.getElementById('deplaceY').value);
  var jso=JSON.parse(e.target.getAttribute('data-jso'));
  if(isNaN(deplaceX)){
   deplaceX=0;
  }
  if(isNaN(deplaceY)){
   deplaceY=0;
  }
  
  console.log('deplaceX=',deplaceX,'deplaceY=',deplaceY);
  
  function recupElements(id,tab){
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].parentId===id){
     var nouvelId=_dssvg.arbre0[i].id;
     tab.push([nouvelId,i]);
     recupElements(nouvelId,tab);
    }
   }
  }
  var tabElts=[];
  if('redimElt1'===jso.action){
   tabElts=[[jso.numArbre,recupereIndiceArbre(jso.numArbre)]];
  }else{
   recupElements(numArbre,tabElts);
  }
  
  for(var i=0;i<tabElts.length;i++){
   if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='rect'){
    
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x+deplaceX);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y+deplaceY);
    
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='circle'){
    
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cx=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cx+deplaceX);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cy=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cy+deplaceY);
    
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='ellipse'){
    
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cx=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cx+deplaceX);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cy=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cy+deplaceY);
    
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='polyline' || _dssvg.arbre0[tabElts[i][1]].data.nodeName==='polygon' ){
    
    var tab=_dssvg.arbre0[tabElts[i][1]].data.attributes.points.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    var tt='';
    for(var j=0;j<tab.length;j+=2){
     tt+=' '+arrdi10000(tab[j]  +deplaceX);
     tt+=' '+arrdi10000(tab[j+1]+deplaceY);
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.points=tt;
    
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='line'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x1+deplaceX);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y1+deplaceY);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x2+deplaceX);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y2+deplaceY);
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='path'){
    var tt=_dssvg.arbre0[tabElts[i][1]].data.attributes.d;
    var obj=getPointsFromSvgPath(tt);
    var tutu='';
    for(var j=0;j<obj.tabOri.length;j++){
     if(obj.tabOri[j][0].toLowerCase()===obj.tabOri[j][0]){
      tutu+=' '+obj.tabOri[j][0];
      for(var k=1;k<obj.tabOri[j].length;k++){
       tutu+=' ' + arrdi10000(obj.tabOri[j][k]);
      }
      
     }else if(obj.tabOri[j][0].toUpperCase()==='H'){
      tutu+=' '+obj.tabOri[j][0];
      for(var k=1;k<obj.tabOri[j].length;k+=2){
       tutu+=' ' + arrdi10000(obj.tabOri[j][k]+deplaceX);
      }
      
     }else if(obj.tabOri[j][0].toUpperCase()==='V'){
      tutu+=' '+obj.tabOri[j][0];
      for(var k=1;k<obj.tabOri[j].length;k+=2){
       tutu+=' ' + arrdi10000(obj.tabOri[j][k]+deplaceY);
      }
     }else if(obj.tabOri[j][0].toUpperCase()==='A'){
      obj.tabOri[j]=[ 
       obj.tabOri[j][0] , 
       arrdi10000(obj.tabOri[j][1]) , 
       arrdi10000(obj.tabOri[j][2]) , 
       arrdi10000(obj.tabOri[j][3]) , 
       obj.tabOri[j][4] , 
       obj.tabOri[j][5] , 
       arrdi10000(obj.tabOri[j][6]+deplaceX) , arrdi10000(obj.tabOri[j][7]+deplaceY) ];
      tutu+=' '+obj.tabOri[j].join(' ');
     }else{
      tutu+=' '+obj.tabOri[j][0];
      for(var k=1;k<obj.tabOri[j].length;k+=2){
       tutu+=' ' + arrdi10000(obj.tabOri[j][k]+deplaceX);
       tutu+=' ' + arrdi10000(obj.tabOri[j][k+1]+deplaceY);
      }
     }
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.d=tutu;
   }
  }
  
  
  
  closePopup();
  afficheArbre0({init:false});
  
  
 }
 //========================================================================================================
 function popupDeplaceEltsGrp1(jso){
  
  var contentOfPopup='<h3>'+trad['deplacer_les_éléments_du_groupe']+'</h3>';
  contentOfPopup+='<div id="echelle1"  style="margin-top:3px;">';

  contentOfPopup+='pixels X : <input id="deplaceX"  value="0" style="border: 3px #ddd inset;max-width: 50%;"/>';
  contentOfPopup+='<br />';
  contentOfPopup+='pixels Y : <input id="deplaceY"  value="0" style="border: 3px #ddd inset;max-width: 50%;" />';
  contentOfPopup+='<br />';
  contentOfPopup+='<button id="bdeplace" class="butEnabled butMenuHaut" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'">déplacer</button>';

  contentOfPopup+='</div>';
  popupValue.innerHTML=contentOfPopup;
  
  document.getElementById('bdeplace').addEventListener('click' , changePosition , 'button' )
  
  showPopUp('popupDeplaceEltsGrp1');  
  
  
 }
 //========================================================================================================
 function changeEchelleY(e){
  var numArbre=parseInt(e.target.getAttribute('data-groupe'),10);
  var ech=parseFloat(e.target.getAttribute('data-echelle'));
  var jso=JSON.parse(e.target.getAttribute('data-jso'));
  
  
  function recupElements(id,tab){
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].parentId===id){
     var nouvelId=_dssvg.arbre0[i].id;
     tab.push([nouvelId,i]);
     recupElements(nouvelId,tab);
    }
   }
  }
  var tabElts=[];
  if('redimElt1'===jso.action){
   tabElts=[[jso.numArbre,recupereIndiceArbre(jso.numArbre)]];
  }else{
   recupElements(numArbre,tabElts);
  }
  for(var i=0;i<tabElts.length;i++){
   var ndNam=_dssvg.arbre0[tabElts[i][1]].data.nodeName.toLowerCase();
   if(ndNam==='rect' || ndNam==='circle' || ndNam==='ellipse'){
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='polyline' || _dssvg.arbre0[tabElts[i][1]].data.nodeName==='polygon' ){
    var tab=_dssvg.arbre0[tabElts[i][1]].data.attributes.points.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    var tt='';
    for(var j=0;j<tab.length;j+=2){
     tt+=' '+arrdi10000(tab[j]);
     tt+=' '+arrdi10000(tab[j+1]*ech);
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.points=tt;
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='line'){
//    _dssvg.arbre0[tabElts[i][1]].data.attributes.x1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x1*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y1*ech);
//    _dssvg.arbre0[tabElts[i][1]].data.attributes.x2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x2*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y2*ech);
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='path'){
    var tt=_dssvg.arbre0[tabElts[i][1]].data.attributes.d;
    var obj=getPointsFromSvgPath(tt);
    var tutu='';
    for(var j=0;j<obj.tabOri.length;j++){
     if(obj.tabOri[j][0].toUpperCase()==='A'){
      obj.tabOri[j]=[ 
       obj.tabOri[j][0] , 
       arrdi10000(obj.tabOri[j][1]*Math.abs(ech)) , 
       arrdi10000(obj.tabOri[j][2]*Math.abs(ech)) , 
       arrdi10000(obj.tabOri[j][3]) , 
       obj.tabOri[j][4] , 
       obj.tabOri[j][5] , 
       arrdi10000(obj.tabOri[j][6]) , 
       arrdi10000(obj.tabOri[j][7]*ech) 
      ];
      tutu+=' '+obj.tabOri[j].join(' ');
     }else if(obj.tabOri[j][0].toUpperCase()==='V'  ){
      tutu+=' '+obj.tabOri[j][0];
      tutu+=' ' + arrdi10000(obj.tabOri[j][1]*ech);
     }else if(obj.tabOri[j][0].toUpperCase()==='H'  ){
      tutu+=' '+obj.tabOri[j][0];
      tutu+=' ' + arrdi10000(obj.tabOri[j][1]);
     }else{
      tutu+=' '+obj.tabOri[j][0];
      for(var k=1;k<obj.tabOri[j].length;k+=2){
       tutu+=' ' + arrdi10000(obj.tabOri[j][k]);
       tutu+=' ' + arrdi10000(obj.tabOri[j][k+1]*ech);
      }
     }
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.d=tutu;
   }
  }
  closePopup();
  afficheArbre0({init:false});
  
  
 } 
 //========================================================================================================
 function changeEchelleX(e){
  var numArbre=parseInt(e.target.getAttribute('data-groupe'),10);
  var ech=parseFloat(e.target.getAttribute('data-echelle'));
  var jso=JSON.parse(e.target.getAttribute('data-jso'));
  
  
  function recupElements(id,tab){
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].parentId===id){
     var nouvelId=_dssvg.arbre0[i].id;
     tab.push([nouvelId,i]);
     recupElements(nouvelId,tab);
    }
   }
  }
  var tabElts=[];
  if('redimElt1'===jso.action){
   tabElts=[[jso.numArbre,recupereIndiceArbre(jso.numArbre)]];
  }else{
   recupElements(numArbre,tabElts);
  }
  for(var i=0;i<tabElts.length;i++){
   var ndNam=_dssvg.arbre0[tabElts[i][1]].data.nodeName.toLowerCase();
   if(ndNam==='rect' || ndNam==='circle' || ndNam==='ellipse'){
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='polyline' || _dssvg.arbre0[tabElts[i][1]].data.nodeName==='polygon' ){
    var tab=_dssvg.arbre0[tabElts[i][1]].data.attributes.points.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    var tt='';
    for(var j=0;j<tab.length;j+=2){
     tt+=' '+arrdi10000(tab[j]*ech);
     tt+=' '+arrdi10000(tab[j+1]);
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.points=tt;
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='line'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x1*ech);
//    _dssvg.arbre0[tabElts[i][1]].data.attributes.y1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y1*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x2*ech);
//    _dssvg.arbre0[tabElts[i][1]].data.attributes.y2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y2*ech);
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='path'){
    var tt=_dssvg.arbre0[tabElts[i][1]].data.attributes.d;
    var obj=getPointsFromSvgPath(tt);
    var tutu='';
    for(var j=0;j<obj.tabOri.length;j++){
     if(obj.tabOri[j][0].toUpperCase()==='A'){
      obj.tabOri[j]=[ 
       obj.tabOri[j][0] , 
       arrdi10000(obj.tabOri[j][1]*Math.abs(ech)) , 
       arrdi10000(obj.tabOri[j][2]*Math.abs(ech)) , 
       arrdi10000(obj.tabOri[j][3]) , 
       obj.tabOri[j][4] , 
       obj.tabOri[j][5] , 
       arrdi10000(obj.tabOri[j][6]*ech) , 
       arrdi10000(obj.tabOri[j][7]) 
      ];
      tutu+=' '+obj.tabOri[j].join(' ');
     }else if(obj.tabOri[j][0].toUpperCase()==='H'  ){
      tutu+=' '+obj.tabOri[j][0];
      tutu+=' ' + arrdi10000(obj.tabOri[j][1]*ech);
     }else if( obj.tabOri[j][0].toUpperCase()==='V' ){
      tutu+=' '+obj.tabOri[j][0];
      tutu+=' ' + arrdi10000(obj.tabOri[j][1]);
     }else{
      tutu+=' '+obj.tabOri[j][0];
      for(var k=1;k<obj.tabOri[j].length;k+=2){
       tutu+=' ' + arrdi10000(obj.tabOri[j][k]*ech);
       tutu+=' ' + arrdi10000(obj.tabOri[j][k+1]);
      }
     }
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.d=tutu;
   }
  }
  closePopup();
  afficheArbre0({init:false});
  
  
 } 
 //========================================================================================================
 function changeEchelle(e){
  var numArbre=parseInt(e.target.getAttribute('data-groupe'),10);
  var ech=parseFloat(e.target.getAttribute('data-echelle'));
  var jso=JSON.parse(e.target.getAttribute('data-jso'));
  
  
  function recupElements(id,tab){
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].parentId===id){
     var nouvelId=_dssvg.arbre0[i].id;
     tab.push([nouvelId,i]);
     recupElements(nouvelId,tab);
    }
   }
  }
  var tabElts=[];
  if('redimElt1'===jso.action){
   tabElts=[[jso.numArbre,recupereIndiceArbre(jso.numArbre)]];
  }else{
   recupElements(numArbre,tabElts);
  }
  for(var i=0;i<tabElts.length;i++){
   if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='rect'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.width =arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.width*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.height=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.height*ech);
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='circle'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cx=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cx*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cy=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cy*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.r=arrdi10000(Math.abs(_dssvg.arbre0[tabElts[i][1]].data.attributes.r*ech));
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='ellipse'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cx=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cx*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.cy=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.cy*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.rx=arrdi10000(Math.abs(_dssvg.arbre0[tabElts[i][1]].data.attributes.rx*ech));
    _dssvg.arbre0[tabElts[i][1]].data.attributes.ry=arrdi10000(Math.abs(_dssvg.arbre0[tabElts[i][1]].data.attributes.ry*ech));
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='polyline' || _dssvg.arbre0[tabElts[i][1]].data.nodeName==='polygon' ){
    var tab=_dssvg.arbre0[tabElts[i][1]].data.attributes.points.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    var tt='';
    for(var j=0;j<tab.length;j++){
     tt+=' '+arrdi10000(tab[j]*ech);
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.points=tt;
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='line'){
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x1*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y1=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y1*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.x2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.x2*ech);
    _dssvg.arbre0[tabElts[i][1]].data.attributes.y2=arrdi10000(_dssvg.arbre0[tabElts[i][1]].data.attributes.y2*ech);
   }else if(_dssvg.arbre0[tabElts[i][1]].data.nodeName==='path'){
    var tt=_dssvg.arbre0[tabElts[i][1]].data.attributes.d;
    var obj=getPointsFromSvgPath(tt);
    var tutu='';
    for(var j=0;j<obj.tabOri.length;j++){
     if(obj.tabOri[j][0].toUpperCase()==='A'){
      obj.tabOri[j]=[ 
       obj.tabOri[j][0] , 
       arrdi10000(obj.tabOri[j][1]*Math.abs(ech)) , 
       arrdi10000(obj.tabOri[j][2]*Math.abs(ech)) , 
       arrdi10000(obj.tabOri[j][3]) , 
       obj.tabOri[j][4] , 
       obj.tabOri[j][5] , 
       arrdi10000(obj.tabOri[j][6]*ech) , arrdi10000(obj.tabOri[j][7]*ech) ];
      tutu+=' '+obj.tabOri[j].join(' ');
     }else{
      tutu+=' '+obj.tabOri[j][0];
      for(var k=1;k<obj.tabOri[j].length;k++){
       tutu+=' ' + arrdi10000(obj.tabOri[j][k]*ech);
      }
     }
    }
    _dssvg.arbre0[tabElts[i][1]].data.attributes.d=tutu;
   }
  }
  closePopup();
  afficheArbre0({init:false});
  
  
 }
 //========================================================================================================
 function enregistrerChemin(){
  var tt='';
  var lst=document.getElementById('editPath0').getElementsByTagName('input');
  for(var i=0;i<lst.length;i++){
//   console.log(lst[i].id , lst[i].value);
   var indices=lst[i].id.replace(/lig_/,'').split('_');
   if(indices[1]==0){
    tt+=' '+lst[i].value+' ';
   }else{
    var val=parseFloat(lst[i].value);
    if(isNaN(val)){
     document.getElementById('lig_'+indices[0]+'_'+indices[1]).style.background='red';
     return;
    }else{
     document.getElementById('lig_'+indices[0]+'_'+indices[1]).style.background='';
     tt+=String(val)+' ';
    }
   }
  }
  var indC=recupereIndiceArbre(document.getElementById('editPath0').getAttribute('data-chemin'));  
  _dssvg.arbre0[indC].data.attributes['d']=tt;
  closePopup();
  afficheArbre0({init:false});  

//  console.log('tt=',tt);
 }
 //========================================================================================================
 function testerChemin(){
  var tt='';
  var lst=document.getElementById('editPath0').getElementsByTagName('input');
  for(var i=0;i<lst.length;i++){
//   console.log(lst[i].id , lst[i].value);
   var indices=lst[i].id.replace(/lig_/,'').split('_');
   if(indices[1]==0){
    tt+=' '+lst[i].value+' ';
   }else{
    var val=parseFloat(lst[i].value);
    if(isNaN(val)){
     document.getElementById('lig_'+indices[0]+'_'+indices[1]).style.background='red';
     return;
    }else{
     document.getElementById('lig_'+indices[0]+'_'+indices[1]).style.background='';
     tt+=String(val)+' ';
    }
   }
  }
//  console.log('tt=',tt);
  document.getElementById('resultatTestChemin').value=tt;
  document.getElementById('enregistrerChemin').style.display='';
 }
 //========================================================================================================
 function popupeditPath1(jso){
//  console.log('jso=',jso);
  var contentOfPopup='<h3>Editer un chemin</h3>';
  
  var tt=globalGeneralSvgReferenceElement.getAttribute('d');
  var obj=getPointsFromSvgPath(tt);
//  console.log('obj.tabOri=',obj.tabOri);
//  console.log('obj.tabAbs=',obj.tabAbs);
  contentOfPopup+='<div> ';
  contentOfPopup+='<table id="editPath0" data-chemin="'+jso.numArbre+'"> ';
  for(var i=0;i<obj.tabOri.length;i++){
   contentOfPopup+='<tr>';
   var lig=obj.tabOri[i];
//   console.log('lig=',lig);
   for(var j=0;j<lig.length;j++){
    contentOfPopup+='<td>'+i+'</td>';
    contentOfPopup+='<td>';
//    console.log('lig[j].length=',String(lig[j]).length);
    contentOfPopup+='<input id="lig_'+i+'_'+j+'" value="'+lig[j]+'" '+(j===0?'readonly style="border: 3px #eee solid;width:'+(String(lig[j]).length)+'em;"':' style="border: 3px #eee inset;width:'+(String(lig[j]).length)+'em;" ')+' size="'+(String(lig[j]).length)+'" >';
    contentOfPopup+='</td>';
   }
   contentOfPopup+='</tr>';
  }
  contentOfPopup+='</table>';
  contentOfPopup+='</div>';
  contentOfPopup+='<button id="testerChemin" class="butEnabled butMenuHaut">tester les modifications</button>';
  contentOfPopup+='<br /><br />';
  contentOfPopup+='<textarea rows="10" cols="50" id="resultatTestChemin"></textarea>';
  contentOfPopup+='<br /><br />';
  contentOfPopup+='<button id="enregistrerChemin" class="butEnabled butMenuHaut" style="display:none;">enregistrer les modifications</button>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  
  document.getElementById('testerChemin').addEventListener(      'click' , testerChemin      , 'button' )
  document.getElementById('enregistrerChemin').addEventListener( 'click' , enregistrerChemin , 'button' )
  
  
  showPopUp('popupeditPath1');  
 }
 //========================================================================================================
 function popupRedimEltsGrp1(jso){
  var contentOfPopup='<h3>'+trad['Redimentionner_tous_les_éléments_du_groupe']+'</h3>';
  contentOfPopup+='<div id="echelle1"  style="display:flex;flex-direction: column;margin-top:3px;">';

  for(var j=0.1;(Math.round(j*10)/10)<=2;j+=0.1){
   if((Math.round(j*10)/10)!==1){
    if((Math.round(j*10)/10)===0.1 || (Math.round(j*10)/10)===1.1 || (Math.round(j*10)/10)===2 ){
     contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
    }
    contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'" data-echelle="'+(Math.round(j*10)/10)+'" style="min-width:4em;">'+(Math.round(j*10)/10)+'</button>';
    if((Math.round(j*10)/10)===2){
     contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'" data-echelle="3" style="min-width:4em;">3</button>';
     contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'" data-echelle="5" style="min-width:4em;">5</button>';
    }
    if((Math.round(j*10)/10)===0.9 || (Math.round(j*10)/10)===1.9 || (Math.round(j*10)/10)===2 ){
     contentOfPopup+='</div>';
    }
    if((Math.round(j*10)/10)===0.3){
     contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'" data-echelle="0.3333" style="min-width:4em;">0.33</button>';
    }
   }
  }
   
  for(var j=-2;(Math.round(j*10)/10)<0;j+=0.1){
   if( (Math.round(j*10)/10)===-2 || (Math.round(j*10)/10)===-1.9 || (Math.round(j*10)/10)===-0.9 || (Math.round(j*10)/10)===-1 ){
    contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
   }
   contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'"  data-echelle="'+(Math.round(j*10)/10)+'" style="min-width:4em;">'+(Math.round(j*10)/10)+'</button>';
   if((Math.round(j*10)/10)===-2){
    contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'" data-echelle="-3" style="min-width:4em;">-3</button>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'" data-echelle="-5" style="min-width:4em;">-5</button>';
   }
   if( (Math.round(j*10)/10)===-2 || (Math.round(j*10)/10)===-1.1 || (Math.round(j*10)/10)===-0.1 || (Math.round(j*10)/10)===-1 ){
    contentOfPopup+='</div>';
   }
  }
  contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
  contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'"  data-echelle="-1" data-dir="x" style="min-width:4em;">x*(-1)</button>';
  contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
   
  contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
  contentOfPopup+='<button class="butEnabled butMenuGauche" data-groupe="'+jso.numArbre+'" data-jso="'+htm1(JSON.stringify(jso))+'"  data-echelle="-1" data-dir="y" style="min-width:4em;">y*(-1)</button>';
  contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
   
  contentOfPopup+='</div>';
  popupValue.innerHTML=contentOfPopup;
  
  var lst=dogid('echelle1').getElementsByTagName('button');
  for( var i=0;i<lst.length;i++){
   if(lst[i].getAttribute('data-dir')){
    if(lst[i].getAttribute('data-dir')==='x'){
     lst[i].addEventListener('click' , changeEchelleX , 'button' )
    }else if(lst[i].getAttribute('data-dir')==='y'){
     lst[i].addEventListener('click' , changeEchelleY , 'button' )
    }
   }else{
    lst[i].addEventListener('click' , changeEchelle , 'button' )
   }
  }
  
  showPopUp('popupRedimEltsGrp1');  
  
 }
 
 //========================================================================================================
 function majPropsGroupeEtElements(e){
  var lstAttribs=['id','style','fill','fill-opacity','fill-rule','stroke','stroke-width','stroke-opacity','opacity','transform','line-cap','enable-background','filter','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-dasharray'];
  var propsGroupe={};
  var propsElements={};
  var elts=document.getElementsByTagName('input');
  for(var i=0;i<elts.length;i++){
   if(elts[i].value!==''){
    if(elts[i].getAttribute('data-type')==='proprietesDuG'){
     propsGroupe[elts[i].name]=String(elts[i].value);
    }else if(elts[i].getAttribute('data-type')==='proprietesDesElements'){
     propsElements[elts[i].name]=String(elts[i].value);
    }
   }
  }
  var idArbre1=parseInt(document.getElementById('idArbre1').value,10);
  var indC=recupereIndiceArbre(idArbre1);
  var nouvellesProprietesGroupe={};
  
  // A) pour le groupe
  // 1°) Mettre dans les nouvelles proprités celles qui ne sont pas dans la liste
  for(var i in _dssvg.arbre0[indC].data.attributes){
   if(!lstAttribs.includes(i)){
    nouvellesProprietesGroupe[i]=_dssvg.arbre0[indC].data.attributes[i];
   }
  }
  // 2°) Mettre dans les nouvelles proprités celles qui sont dans la liste
  for(var i in propsGroupe){
   nouvellesProprietesGroupe[i]=propsGroupe[i];
  }
  _dssvg.arbre0[indC].data.attributes=JSON.parse(JSON.stringify(nouvellesProprietesGroupe));

  // B) pour les éléments inclus dans le groupe
  
  function boucleElementsEnfants(idParent,tableauIndicesElementsEnfants){
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].parentId===idParent){
     tableauIndicesElementsEnfants.push(i);
     boucleElementsEnfants(_dssvg.arbre0[i].id,tableauIndicesElementsEnfants);
    }
   }
   return;
  }
  
  var gooon=true;
  var idParent=idArbre1;
  var tableauIndicesElementsEnfants=[];
  boucleElementsEnfants(idParent,tableauIndicesElementsEnfants);
  for(var j=0;j<tableauIndicesElementsEnfants.length;j++){
   var nouvellesProprietesElementsDuGroupe={};

   indC=tableauIndicesElementsEnfants[j];
   // 1°) Mettre dans les nouvelles proprités celles qui ne sont pas dans la liste
   for(var i in _dssvg.arbre0[indC].data.attributes){
    // l'id est un cas spécial, il faut le conserver
    if(_dssvg.arbre0[indC].data.attributes.hasOwnProperty('id') && _dssvg.arbre0[indC].data.attributes['id']!==''){
     nouvellesProprietesElementsDuGroupe[i]=_dssvg.arbre0[indC].data.attributes['id'];
    }
    // le transform est un cas spécial, il faut le conserver
    if(_dssvg.arbre0[indC].data.attributes.hasOwnProperty('transform') && _dssvg.arbre0[indC].data.attributes['transform']!==''){
     nouvellesProprietesElementsDuGroupe[i]=_dssvg.arbre0[indC].data.attributes['transform'];
    }
    if(!lstAttribs.includes(i)){
     nouvellesProprietesElementsDuGroupe[i]=_dssvg.arbre0[indC].data.attributes[i];
    }
   }
   for(var i in propsElements){
    nouvellesProprietesElementsDuGroupe[i]=propsElements[i];
   }
   _dssvg.arbre0[indC].data.attributes=JSON.parse(JSON.stringify(nouvellesProprietesElementsDuGroupe));
  }
  closePopup();
  afficheArbre0({init:false});  
  
 }
 //========================================================================================================
 function popupPropEltsGrp1(jso){
  var lstAttribs=['id','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform','line-cap','enable-background','filter','stroke-opacity','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-dasharray'];
  var contentOfPopup='<h3>'+trad['modif_prop_grp_et_elts']+'</h3>';
  contentOfPopup+='<style>'
  contentOfPopup+='.table1{border:1px blue outset;margin:10px 3px 0px 3px;width:80%;}';
  contentOfPopup+='.table1 td{border:1px red outset;margin:0px;}';
  contentOfPopup+='.table1 input{border: 2px #ddd inset;width: 100%;}';
  contentOfPopup+='</style>'
  
  contentOfPopup+='<div id="proprietesGroupeElements1">';
  contentOfPopup+='<input type="hidden" id="idArbre1" value="'+jso.numArbre+'" />';
  contentOfPopup+='<table class="table1">'
  
  contentOfPopup+='<tr>';
  contentOfPopup+='<td colspan="2"  style="background:lightgrey;">'+trad['Propriétés_du_groupe']+'</td>';
  contentOfPopup+='</tr>';

  var indC=recupereIndiceArbre(jso.numArbre);
  
  for(var i=0;i<lstAttribs.length;i++){
   contentOfPopup+='<tr>';
   contentOfPopup+='<td style="width:20%;">';
   contentOfPopup+=''+lstAttribs[i];
   contentOfPopup+='</td>';
   contentOfPopup+='<td>';
   var value=_dssvg.arbre0[indC].data.attributes[lstAttribs[i]]?_dssvg.arbre0[indC].data.attributes[lstAttribs[i]]:'';
   contentOfPopup+='<input name="'+lstAttribs[i]+'" data-type="proprietesDuG" value="'+htm1(value)+'" />';
   contentOfPopup+='</td>';
   contentOfPopup+='</tr>';
  }

  contentOfPopup+='<tr>';
  contentOfPopup+='<td colspan="2" style="background:lightgrey;">'+trad['Propriétés_des_éléments_du_groupe']+'</td>';
  contentOfPopup+='</tr>';
  
  for(var i=0;i<lstAttribs.length;i++){
   if(lstAttribs[i]==='id' || lstAttribs[i]==='transform'){
    continue;
   }
   contentOfPopup+='<tr>';
   contentOfPopup+='<td style="width:20%;">';
   contentOfPopup+=''+lstAttribs[i];
   contentOfPopup+='</td>';
   contentOfPopup+='<td>';
   contentOfPopup+='<input name="'+lstAttribs[i]+'" data-type="proprietesDesElements" value="" />';
   contentOfPopup+='</td>';
   contentOfPopup+='</tr>';
  }

  contentOfPopup+='</table>'
  
  contentOfPopup+='<button class="butEnabled butMenuHaut" style="margin:3px;" id="majPropsGroupeEtElements">'+trad['Appliquer']+'</button>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  document.getElementById('majPropsGroupeEtElements').addEventListener('click',majPropsGroupeEtElements,'button');
  
  showPopUp('popupPropEltsGrp1');  
    
 }
 
 //========================================================================================================
 function popupForme1(){

 // setModeSaisieRectangle1 setModeSaisieCercle1 setModeSaisieEllipse1 setModeSaisieLigne1 setModeSaisieLigne2 setModeSaisiePolyline1 setModeSaisiePolygon1
  var contentOfPopup='<h3>'+trad['Sélectionnez_un_mode_de_tracé_ou_une_forme_prédéfinie']+'</h3>';
  
  contentOfPopup+='<style>'
  contentOfPopup+='fieldset{border:1px blue outset;margin:10px 3px 0px 3px;}'
  contentOfPopup+='fieldset>div{border:1px red outset;margin:0px;}'
  contentOfPopup+='fieldset>legend{border:1px red outset;font-size:1.1em;margin:10px auto 10px auto;padding:3px;text-align: center;}'
  contentOfPopup+='</style>'
  
  contentOfPopup+='<fieldset>';
  contentOfPopup+='<legend>'+trad['Modes_de_tracé']+'</legend>';
    contentOfPopup+='<div>';
    for( var i=0;i<BtnsForme.length;i++){
     contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="'+BtnsForme[i].id+'">'+BtnsForme[i].svg+'</button>';
    }
    contentOfPopup+='</div>';
  contentOfPopup+='</fieldset>';
  

  contentOfPopup+='<fieldset>';
  contentOfPopup+='<legend>'+trad['Formes_prédéfinies']+'</legend>';
    contentOfPopup+='<div>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUneEtoile">'+svgEtoile+'</button>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUneFleche"><svg class="svgBoutonGauche1" viewBox="-2 -1  23 18"><polygon points=" 14 1 20 8  14 15   14 11 0 11 0 5 14 5" style="stroke-width:1.5;stroke:rgb(0, 0, 255);fill:transparent;"></polygon></svg></button>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUneSpirale1"><svg class="svgBoutonGauche1" viewBox="-105.608 -99.0828  202.4667 189.325"><path d=" M 0.264 1.064 c 0.028 -0.34 -0.488 2.372 1.356 0.764 c 1.232 -1.072 0.352 -2.924 -0.904 -3.496 c -2.644 -1.2 -4.976 1.68 -4.668 4.152 c 0.796 6.356 9.42 4.848 11.236 -0.024 c 3.364 -9.032 -9.068 -13.736 -15.096 -8.172 c -9.228 8.52 0.624 22.24 11.648 20.7 c 19.24 -2.692 15.94 -30.228 -2.212 -33.252 c -25.028 -4.172 -32.484 30.908 -11.4 42.304 c 14.916 8.064 33.46 -0.752 38.352 -16.564 c 3.388 -10.956 -0.016 -23.112 -8.308 -30.972 c -15.404 -14.6 -40.684 -10.088 -51.788 7.428 c -7.98 12.588 -7.36 29.068 0.964 41.328 c 14.624 21.536 46.188 22.872 64.088 4.744 c 12.932 -13.096 16.492 -33.36 9.252 -50.224 c -12.708 -29.612 -50.956 -38.348 -76.436 -19.536 c -18.636 13.76 -26.3 38.456 -19.596 60.504 c 10.88 35.78 53.512 51.488 85.948 34.22 c 24.14 -12.852 37.456 -40.388 33.412 -67.316 c -6.648 -44.276 -54.872 -69.864 -95.908 -53.88 c -31.412 12.236 -50.728 44.824 -47.748 78.2 c 4.624 51.8 57.272 84.42 106.2 69.74 c 36.356 -10.908 61.524 -45.416 62.188 -83.16 c 1.08 -61.356 -57.6 -105.632 -116.488 -92.232 c -44.028 10.02 -75.724 49.576 -77.964 94.34" style="fill:transparent;stroke:#0080cc;stroke-width:8;" transform=""></path></svg>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUneSpirale2"><svg class="svgBoutonGauche1" viewBox="-85.9351 -89.7296  180.6778 171.4323"><path d=" M 1.526 -1.1 c 1.912 0.482 0.76 2.668 -0.604 3.112 c -4.08 1.324 -6.244 -3.962 -4.99 -7.1 c 2.506 -6.264 11.14 -5.658 14.886 -1.024 c 7.064 8.74 -2.278 19.882 -12.056 19.234 c -10.172 -0.672 -16.734 -11.14 -13.954 -20.716 c 1.786 -6.154 6.878 -10.894 13.004 -12.616 c 12.764 -3.586 25.73 6.066 26.766 19.11 c 0.82 10.316 -5.72 19.89 -15.216 23.666 c -15.446 6.14 -33.052 -3.976 -36.194 -20.15 c -1.89 -9.73 1.68 -19.864 8.962 -26.522 c 14.598 -13.348 38.452 -9.39 48.89 7.098 c 7.904 12.484 6.336 28.96 -3.278 40.066 c -3.994 4.614 -9.1 8.136 -14.818 10.266 c -5.894 2.196 -12.25 2.886 -18.48 2.018 c -23.942 -3.336 -39.098 -28.502 -31.068 -51.266 c 2.298 -6.512 6.24 -12.324 11.408 -16.9 c 5.33 -4.718 11.774 -8.01 18.708 -9.606 c 31.474 -7.244 60.082 21.146 53.138 52.694 c -1.68 7.636 -5.3 14.688 -10.486 20.536 c -5.33 6.01 -12.1 10.562 -19.658 13.28 c -34.092 12.258 -70.014 -15.452 -66.646 -51.586 c 0.81 -8.684 3.846 -16.994 8.794 -24.174 c 2.498 -3.628 5.478 -6.966 8.804 -9.856 c 3.37 -2.928 7.134 -5.454 11.122 -7.458 c 30.674 -15.408 68.592 1.014 78.34 33.944 c 2.708 9.15 3.018 18.824 0.892 28.128 c -2.166 9.486 -6.738 18.236 -13.246 25.466 c -6.666 7.404 -15.104 12.99 -24.5 16.294 c -35.826 12.598 -75.226 -10.526 -81.184 -48.17 c -0.812 -5.136 -0.974 -10.42 -0.458 -15.594 c 1.054 -10.582 4.82 -20.686 10.904 -29.404 c 6.22 -8.912 14.608 -16.08 24.344 -20.9 c 37.108 -18.37 82.844 1.514 94.412 41.366 c 1.576 5.432 2.47 11.11 2.62 16.764 c 0.306 11.53 -2.372 22.926 -7.746 33.13 c -5.482 10.41 -13.542 19.232 -23.366 25.698 c -37.466 24.656 -89.26 9.17 -107.06 -32.012 c -2.426 -5.614 -4.154 -11.584 -5.084 -17.628 c -1.89 -12.3 -0.58 -24.852 3.798 -36.5 c 2.196 -5.846 5.162 -11.458 8.758 -16.564 c 3.634 -5.16 7.952 -9.898 12.758 -13.988 c 36.796 -31.326 94.166 -21.354 118.68 20.162 c 6.758 11.444 10.486 24.414 10.788 37.706 c 0.304 13.44 -2.864 26.708 -9.172 38.578 c -6.424 12.088 -15.834 22.316 -27.29 29.8 c -36.356 23.746 -86.67 15.142 -113.224 -19.18 c -4.312 -5.574 -7.952 -11.74 -10.728 -18.218 c -2.78 -6.492 -4.754 -13.392 -5.804 -20.374 c -1.054 -7.01 -1.214 -14.214 -0.456 -21.264 c 0.762 -7.094 2.442 -14.148 4.974 -20.818 c 16.442 -43.34 64.86 -65.492 108.802 -52.428 c 29.234 8.692 52.758 32.098 61.084 61.514 c 2.056 7.262 3.4155 15.1155 3.344 22.392 " stroke-linejoin="round" stroke-linecap="round" style="stroke:rgb(0, 0, 0);fill:transparent;stroke-width:3;"></path></svg>';
//     
    contentOfPopup+='</div>';
  contentOfPopup+='</fieldset>';
  

  contentOfPopup+='<fieldset>';
  contentOfPopup+='<legend>Pattern</legend>';
    contentOfPopup+='<div>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUnPatern"><svg viewBox="-2 -2  104 104"><defs><pattern id="star" viewBox="0,0,10,10" width="30%" height="30%"><polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2"></polygon></pattern></defs><circle cx="50" cy="50" r="50" fill="url(#star)"></circle></svg></button>';
    contentOfPopup+='</div>';
  contentOfPopup+='</fieldset>';
  
  contentOfPopup+='<fieldset>';
  contentOfPopup+='<legend>Filter</legend>';
    contentOfPopup+='<div>';
    contentOfPopup+='<button class="butEnabled butMenuGauche" style="min-width:35px;min-height:35px;margin:3px;" id="insererUnFiltre"><svg viewBox="0 -34  32 32"><defs><filter id="__filtered-3" height="220%"><feFlood flood-color="#551C0B" result="COLOR-outline"></feFlood><feMorphology operator="dilate" radius="0.3" in="SourceAlpha" result="OUTLINE_10"></feMorphology><feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20"></feComposite><feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10"></feGaussianBlur><feSpecularLighting surfaceScale="5" specularConstant="0.5" specularExponent="7.5" lighting-color="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20"><fePointLight x="750" y="-50" z="300"></fePointLight></feSpecularLighting><feComposite in2="SourceAlpha" operator="in" in="LIGHTING-EFFECTS_20" result="LIGHTING-EFFECTS_30"></feComposite><feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="LIGHTING-EFFECTS_30" result="LIGHTING-EFFECTS_40"></feComposite><feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10"><feFuncR type="gamma" offset="-1.3" amplitude="10" exponent="4.84"></feFuncR><feFuncB type="gamma" offset="-1.3" amplitude="10.1" exponent="40.84"></feFuncB></feComponentTransfer><feMerge><feMergeNode in="OUTLINE_20"></feMergeNode><feMergeNode in="COLOR-EFFECTS_10"></feMergeNode></feMerge></filter></defs><path filter="url(#__filtered-3)" stroke-width="5" stroke="#EF7349" fill="transparent" stroke-linecap="round" stroke-linejoin="round" d=" M 29 -31 C 21 -25 20 -24 19 -22 C 19 -20 19 -8 19 -5 C 17 -5 13 -5 11 -5  C 11 -8 11 -20 11 -22 C 10 -24 9 -25 3 -31"></path></svg></button>';
    contentOfPopup+='</div>';
  contentOfPopup+='</fieldset>';
  
// 


  popupValue.innerHTML=contentOfPopup;

  for( var i=0;i<BtnsForme.length;i++){
   document.getElementById(BtnsForme[i].id).addEventListener('click',BtnsForme[i].action,'button');
  }
  
  document.getElementById('insererUneEtoile').addEventListener('click',insererUneEtoile,'button');
  document.getElementById('insererUneFleche').addEventListener('click',insererUneFleche,'button');
  document.getElementById('insererUneSpirale1').addEventListener('click',insererUneSpirale1,'button');
  document.getElementById('insererUneSpirale2').addEventListener('click',insererUneSpirale2,'button');
  document.getElementById('insererUnPatern').addEventListener('click',insererUnPatern,'button');
  document.getElementById('insererUnFiltre').addEventListener('click',insererUnFiltre,'button'); //<defs><filter id="__filtered-3" height="220%"><feFlood flood-color="#551C0B" result="COLOR-outline"></feFlood><feMorphology operator="dilate" radius="0.3" in="SourceAlpha" result="OUTLINE_10"></feMorphology><feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20"></feComposite><feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10"></feGaussianBlur><feSpecularLighting surfaceScale="5" specularConstant="0.5" specularExponent="7.5" lighting-color="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20"><fePointLight x="750" y="-50" z="300"></fePointLight></feSpecularLighting><feComposite in2="SourceAlpha" operator="in" in="LIGHTING-EFFECTS_20" result="LIGHTING-EFFECTS_30"></feComposite><feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="LIGHTING-EFFECTS_30" result="LIGHTING-EFFECTS_40"></feComposite><feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10"><feFuncR type="gamma" offset="-1.3" amplitude="10" exponent="4.84"></feFuncR><feFuncB type="gamma" offset="-1.3" amplitude="10.1" exponent="40.84"></feFuncB></feComponentTransfer><feMerge><feMergeNode in="OUTLINE_20"></feMergeNode><feMergeNode in="COLOR-EFFECTS_10"></feMergeNode></feMerge></filter></defs>
  

  showPopUp('popupForme1');  
  
 }
 
 //========================================================================================================
 function majBout(){
  
  document.getElementById('popupForme1').className='butEnabled butMenuGauche';
  document.getElementById('popupForme1').innerHTML=svgEtoile;
  for( var i=0;i<BtnsForme.length;i++){
   if(_dssvg.mode_en_cours===BtnsForme[i].id){
    document.getElementById('popupForme1').className='butEnabled butDisabled butMenuGauche';
    document.getElementById('popupForme1').innerHTML=BtnsForme[i].svg;
   }
  }

  document.getElementById('setModeSaisieChemin1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieDeplace1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieSelElt1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieEditionPoin1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieTranE1').className='butEnabled butMenuGauche';
  document.getElementById('setModeSaisieGroupe1').className='butEnabled butMenuGauche';
  
  document.getElementById('setModeSaisieDefsElt1').className='butEnabled butMenuGauche bckJaune';
  document.getElementById('setModeSaisieDefsPtE1').className='butEnabled butMenuGauche bckJaune';
  document.getElementById('setModeSaisieDefsTrE1').className='butEnabled butMenuGauche bckJaune';
  document.getElementById('setModeSaisieDefsGrp1').className='butEnabled butMenuGauche bckJaune';
  document.getElementById('popupSpecial1').style.display='none';

  
  
  document.getElementById('poigneesVoisines1').style.display='none';
  
  if(groupeActif.refGroupe===refZnDessin){
   document.getElementById('popGroupeActif1').innerHTML=trad['groupe_courant']+' : '+trad['racine'];
   document.getElementById('popGroupeActif1').className='butEnabled butMenuHaut';
  }else{
   document.getElementById('popGroupeActif1').className='butEnabled butMenuHaut bckJaune';
   document.getElementById('popGroupeActif1').innerHTML=trad['groupe_courant']+' : '+groupeActif.idDansArbre;
  }
  
  
   
  if(_dssvg.mode_en_cours=='setModeSaisieDefsGrp1'){
   document.getElementById('setModeSaisieDefsGrp1').className='butEnabled butDisabled butMenuGauche bckRose';
  }else if(_dssvg.mode_en_cours=='setModeSaisieDefsTrE1'){
   document.getElementById('setModeSaisieDefsTrE1').className='butEnabled butDisabled butMenuGauche bckRose';
  }else if(_dssvg.mode_en_cours=='setModeSaisieDefsPtE1'){
   document.getElementById('setModeSaisieDefsPtE1').className='butEnabled butDisabled butMenuGauche bckRose';
  }else if(_dssvg.mode_en_cours=='setModeSaisieDefsElt1'){
   document.getElementById('setModeSaisieDefsElt1').className='butEnabled butDisabled butMenuGauche bckRose';
  }else if(_dssvg.mode_en_cours=='setModeSaisieChemin1'){
   document.getElementById('setModeSaisieChemin1').className='butEnabled butDisabled butMenuGauche';
  }else if(_dssvg.mode_en_cours=='setModeSaisieDeplace1'){
   document.getElementById('setModeSaisieDeplace1').className='butEnabled butDisabled butMenuGauche';
   document.getElementById('popupSpecial1').style.display='';
  }else if(_dssvg.mode_en_cours=='setModeSaisieSelElt1'){
   document.getElementById('setModeSaisieSelElt1').className='butEnabled butDisabled butMenuGauche';
  }else if(_dssvg.mode_en_cours=='setModeSaisieGroupe1'){
   document.getElementById('setModeSaisieGroupe1').className='butEnabled butDisabled butMenuGauche';  
  }else if(_dssvg.mode_en_cours=='setModeSaisieTranE1'){
   document.getElementById('setModeSaisieTranE1').className='butEnabled butDisabled butMenuGauche';  
  }else if(_dssvg.mode_en_cours=='setModeSaisieEditionPoin1'){
   document.getElementById('setModeSaisieEditionPoin1').className='butEnabled butDisabled butMenuGauche';
   document.getElementById('poigneesVoisines1').style.display='';
   if(etatPoigneesVoisines1===true){
    document.getElementById('poigneesVoisines1').className='butEnabled butDisabled butMenuHaut';
   }else{
    document.getElementById('poigneesVoisines1').className='butEnabled butMenuHaut';
   }
  }
  if(_dssvg.aimanterPixel1!==0){
   document.getElementById('aimanterPixel1').className='butEnabled butDisabled butMenuGauche';
  }else{
   document.getElementById('aimanterPixel1').className='butEnabled butMenuGauche';
  }
  
  document.getElementById('supprimeElement1').style.display='none';
  if( _dssvg.mode_en_cours==='setModeSaisieSelElt1' || _dssvg.mode_en_cours==='setModeSaisieDefsElt1' ){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null && _dssvg.idArbreCourant!==null){
//    document.getElementById('supprimeElement1').innerHTML='&times;&nbsp'+_dssvg.idArbreCourant;
    document.getElementById('supprimeElement1').innerHTML='<svg style="width:20px;" viewBox="-3 -3  16 16"><g fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:yellow;fill:transparent;stroke-width:2;"><path d=" M 0 0  L 10 10" /><path d="M 10 0 L 0 10 " /></g></svg>&nbsp'+_dssvg.idArbreCourant;
    document.getElementById('supprimeElement1').style.display='';
    document.getElementById('supprimeElement1').style.width='30px';
   }
  }
  
  document.getElementById('supprimeGroupe1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('supprimeGroupe1').style.display='';
   }
  }
  
  

  document.getElementById('annuler1').style.display='none';
  if(_dssvg.historique1.length>1){
   document.getElementById('annuler1').style.display='';
  }
  
  document.getElementById('pousserVersHaut1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieSelElt1'){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('pousserVersHaut1').style.display='';
   }
  }

  document.getElementById('pousserVersBas1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieSelElt1'){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('pousserVersBas1').style.display='';
   }
  }

  document.getElementById('dupliquerElement1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' || 'setModeSaisieDefsElt1' === _dssvg.mode_en_cours ){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('dupliquerElement1').style.display='';
   }
  }
  
  document.getElementById('dupliquerGroupe1').style.display='none';
  if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
   if(globalGeneralSvgReferenceElement!==null && globalIndiceArbre!==null){
    document.getElementById('dupliquerGroupe1').style.display='';
   }
  }
  
  highliteStrokeStyle();
  
 }
 //========================================================================================================
 function selectionnePoigneePoisine(e){
  e.stopPropagation();
  var brancheSelectionne=e.target.getAttribute('data-elem');
  if(brancheSelectionne){
   etatPoigneesVoisines1=false;
   _dssvg.idArbreCourant=parseInt(brancheSelectionne,10);
   globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
   globalIndicePoint=0;
   afficheArbre0({init:false});  
  }
 }
 //========================================================================================================
 function poigneesVoisines1(e){
  if(etatPoigneesVoisines1===true){
   // les poignées voisines sont déjà affichées, on les efface
   var lst=refZnDessin.querySelectorAll('[data-poigneevoisine]');
   for(var i=lst.length-1;i>=0;i--){
    lst[i].remove();
   }
   etatPoigneesVoisines1=false;
   document.getElementById('poigneesVoisines1').className='butEnabled  butMenuHaut';
   
   return;
  }
  
  document.getElementById('poigneesVoisines1').className='butEnabled butDisabled butMenuHaut';
  etatPoigneesVoisines1=true;
  var lst=refZnDessin.querySelectorAll('[data-idarbre1]');
  var lstPoignees=[];
  var pt0=refZnDessin.createSVGPoint();
  var matrixRelatifVersAbsolu=null;
  
  for(var i=0;i<lst.length ;i++){
   if(lst[i].nodeName.toLowerCase()==='g'){
    continue;
   }
   var numArbre=parseInt(lst[i].getAttribute('data-idarbre1'),10);
   if(globalIndiceArbre!==null && _dssvg.idArbreCourant!==numArbre){
    try{
     
     matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
     var indC=recupereIndiceArbre(numArbre);
     if(lst[i].tagName.toLowerCase()==='path'){
      var points=getPointsFromSvgPath(_dssvg.arbre0[indC].data.attributes.d);

      for(var j=0;j<points.tabPts.length;j++){
       pt0.x=points.tabPts[j][1];
       pt0.y=points.tabPts[j][2];
       pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
       if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
          pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
       ){
        var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
        dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
        dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
       }
      }
     }else if(lst[i].tagName.toLowerCase()==='polyline' || lst[i].tagName.toLowerCase()==='polygon'){
      var points=_dssvg.arbre0[indC].data.attributes.points.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
      for(var j=0;j<points.length;j+=2){
       pt0.x=points[j];
       pt0.y=points[j+1];
       pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
       if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
          pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
       ){
        var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
        dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
        dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
       }
      }
      
     }else if(lst[i].tagName.toLowerCase()==='rect'){
      var tab=[
       [ _dssvg.arbre0[indC].data.attributes.x                                             , _dssvg.arbre0[indC].data.attributes.y ] ,
       [ _dssvg.arbre0[indC].data.attributes.x + _dssvg.arbre0[indC].data.attributes.width , _dssvg.arbre0[indC].data.attributes.y ] ,
       [ _dssvg.arbre0[indC].data.attributes.x + _dssvg.arbre0[indC].data.attributes.width , _dssvg.arbre0[indC].data.attributes.y + _dssvg.arbre0[indC].data.attributes.height ] ,
       [ _dssvg.arbre0[indC].data.attributes.x                                             , _dssvg.arbre0[indC].data.attributes.y + _dssvg.arbre0[indC].data.attributes.height ] ,
      ];
      for(var j=0;j<tab.length;j++){
       pt0.x=tab[j][0]; 
       pt0.y=tab[j][1]; 
       pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
       if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
          pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
       ){
        var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
        dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
        dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
       }
      }
      
     }else if(lst[i].tagName.toLowerCase()==='circle' || lst[i].tagName.toLowerCase()==='ellipse'){
      pt0.x=_dssvg.arbre0[indC].data.attributes.cx; 
      pt0.y=_dssvg.arbre0[indC].data.attributes.cy;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
      if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
         pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
      ){
       var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
       dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
       dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
      }
      
     }else if(lst[i].tagName.toLowerCase()==='line'){
      pt0.x=_dssvg.arbre0[indC].data.attributes.x1; 
      pt0.y=_dssvg.arbre0[indC].data.attributes.y1;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
      if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
         pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
      ){
       var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
       dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
       dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
      }
     
      pt0.x=_dssvg.arbre0[indC].data.attributes.x2; 
      pt0.y=_dssvg.arbre0[indC].data.attributes.y2;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
      if(pt0.x>=_dssvg.viewBoxInit[0] && pt0.x<=_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2] &&
         pt0.y>=_dssvg.viewBoxInit[1] && pt0.y<=_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]
      ){
       var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'selectionnePoigneePoisine','data-type':'toRemove','data-poigneevoisine':true,'data-elem':''+numArbre,cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:brown;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
       dot.addEventListener('mousedown',selectionnePoigneePoisine,'dot');
       dot.addEventListener('touchstart',selectionnePoigneePoisine,'dot');
      }
     }     
     
     
    }catch(e2){
     // par pour les linéar gradients ...
    }
    
   }
  }
 }
 //========================================================================================================
 function decomposerLesMDeCheminParIndice(i){
  var maxId=-1;
  for(var j=0;j<_dssvg.arbre0.length;j++){
   if(_dssvg.arbre0[j].id>maxId){
    maxId=_dssvg.arbre0[j].id;
   }
  }
  maxId+=1;
  
  cheminEnAbsoluParIndice(i);
  var d=_dssvg.arbre0[i].data.attributes.d;
  if(d){
   var obj=getPointsFromSvgPath(d);
   if(obj.tabAbs.length>=3){
    var tt='';
    var premierChemin=true;
    for(var j=0;j<obj.tabAbs.length;j++){
     if(obj.tabAbs[j][0]==='M'){
      if(j===0 ){
       tt+=''+obj.tabAbs[j].join(' ')+'';
      }else{
       // on crée un noubeau chemin
       if(premierChemin){
        premierChemin=false;
        _dssvg.arbre0[i].data.attributes.d=tt;
       }else{
        var obj1=JSON.parse(JSON.stringify(_dssvg.arbre0[i]));
        obj1.id=maxId++;
        obj1.data.attributes.d=tt;
        _dssvg.arbre0.push(obj1);
       }
       tt=''+obj.tabAbs[j].join(' ')+'';
      }
     }else{
      tt+=''+obj.tabAbs[j].join(' ')+'';
     }
    }
    if(premierChemin){
     _dssvg.arbre0[i].data.attributes.d=tt;
    }else{
     var obj1=JSON.parse(JSON.stringify(_dssvg.arbre0[i]));
     obj1.id=maxId++;
     obj1.data.attributes.d=tt;
     _dssvg.arbre0.push(obj1);
    }
   }
  }
 }
 //========================================================================================================
 function decomposerLesMdesChemins1(){
  if(!window.confirm(trad['Certain']+' ?')){
   return
  }
  
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].data.nodeName==='path'){
    decomposerLesMDeCheminParIndice(i);
   }
  }
  closePopup();
  afficheArbre0({init:false});
 }
 //========================================================================================================
 function cheminEnAbsoluParIndice(i){
  var d=_dssvg.arbre0[i].data.attributes.d;
  if(d){
   var obj=getPointsFromSvgPath(d);
   if(obj.tabAbs.length>=3){
    var tt='';
    for(var j=0;j<obj.tabAbs.length;j++){
     tt+=''+obj.tabAbs[j].join(' ')+'';
    }
   _dssvg.arbre0[i].data.attributes.d=tt;
   }
  }  
 }
 //========================================================================================================
 function tousCheminsEnAbsolu1(){
  if(!window.confirm(trad['Certain']+' ?')){
   return
  }
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].data.nodeName==='path'){
    cheminEnAbsoluParIndice(i);
   }
  }
  closePopup();
  afficheArbre0({init:false});
 }
 //========================================================================================================
 function simplifierTousLesChemins1(){
  var lst=refZnDessin.querySelectorAll('[data-idarbre1]');
  if(!window.confirm(trad['Il_y_a']+' '+(lst.length)+' '+trad['chemins_à_transformer_voulez_vous_continuer']+'')){
   return
  }
  for(var i=0;i<lst.length ;i++){
   if(lst[i].tagName.toLowerCase()==='path'){
    var numArbre=lst[i].getAttribute('data-idarbre1');
    var couleur=recuperePropsCouleurs(numArbre);
    var indC=recupereIndiceArbre(numArbre);
    var d=_dssvg.arbre0[indC].data.attributes.d;
    var tt=simplifierUnChemin(d,parseFloat(couleur['stroke-width'].valeur));
    _dssvg.arbre0[indC].data.attributes.d=tt;
   }
  }
  closePopup();
  afficheArbre0({init:false});
 } 
 //========================================================================================================
 function simplifierUnChemin(tt,strw){
  var nouveauChemin=tt;
  var obj=getPointsFromSvgPath(tt);
  var lesSegments=[];
  var eltSeg=[];
  for(var i=0;i<obj.tabPts.length;i++){
   if(obj.tabPts[i][0]=='M'){
    if(eltSeg.length>0){
     lesSegments.push(JSON.parse(JSON.stringify(eltSeg)));
     eltSeg=[];
    }
   }
   eltSeg.push([obj.tabPts[i][1] , obj.tabPts[i][2]]);
  }
  if(eltSeg.length>0){
   lesSegments.push(JSON.parse(JSON.stringify(eltSeg)));
  }
  var tt='';
  for(var indSeg=0;indSeg<lesSegments.length;indSeg++){
   var leSegment=lesSegments[indSeg];
   var goon=10000;
   var imin=leSegment.length-1
   while(goon-- > 0){
    var points=JSON.parse(JSON.stringify(leSegment)); // points=draw_state.elementsToDraw2[ind].ptList;
    var boucle=true;
    for( var i=imin;i>=2 && goon && boucle;i--){
     // distance entre 2 points
     var a1=Math.sqrt((points[i][0]-points[i-1][0])*(points[i][0]-points[i-1][0]) + (points[i][1]-points[i-1][1])*(points[i][1]-points[i-1][1]) );
     if(a1<strw/2){
      // on supprime le point
      leSegment.splice(i-1, 1); // draw_state.elementsToDraw2[ind].ptList.splice(i-1, 1);
      imin=leSegment.length-1; // imin=draw_state.elementsToDraw2[ind].ptList.length-1;
      boucle=false;
     }else{
      imin=i-1;
     }
    }
    if(i<2){
     goon=0;
    }
   }
   var listePoints=simplifySvgPath(leSegment , {tolerance:2.5,precision:2} ); // la tolérance = 0.5 pixels {tolerance:2.5,precision:5}
   tt+=listePoints.path+'    ';
  }
  nouveauChemin=tt;
  
  return nouveauChemin;
 }
 //========================================================================================================
 function setAttributeViewBox(){
  refZnDessin.setAttribute('viewBox',_dssvg.viewBoxInit.join(' '));
  if(_dssvg.zoom1<1){
   divc1.style.background='url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Cpath d="M 0 0 l 100 100 l 0 -100 l -100 100 Z" fill="yellow" fill-opacity=".04"/%3E%3C/svg%3E\')';
   divc1.style.backgroundSize=(100*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionX=-(_dssvg.viewBoxInit[0]*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionY=-(_dssvg.viewBoxInit[1]*_dssvg.zoom1)+'px';
  }else if(_dssvg.zoom1<64){
   divc1.style.background='url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"%3E%3Cpath d="M 0 0 l 10 10 l 0 -10 l -10 10 Z" fill="black" fill-opacity=".04"/%3E%3C/svg%3E\')';
   divc1.style.backgroundSize=(10*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionX=-(_dssvg.viewBoxInit[0]*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionY=-(_dssvg.viewBoxInit[1]*_dssvg.zoom1)+'px';
  }else{
   divc1.style.background='url(\'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3Cpath d="M 0 0 l 1 1 l 0 -1 l -1 1 Z" fill="red" fill-opacity=".04"/%3E%3C/svg%3E\')';
   divc1.style.backgroundSize=(1*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionX=-(_dssvg.viewBoxInit[0]*_dssvg.zoom1)+'px';
   divc1.style.backgroundPositionY=-(_dssvg.viewBoxInit[1]*_dssvg.zoom1)+'px';
  }
 }
 //========================================================================================================
 function allera5050(){
  if(_dssvg.viewBoxInit!==null && _dssvg.viewBoxInit.length===4){
   _dssvg.viewBoxInit[0]=-50;
   _dssvg.viewBoxInit[1]=-50;
   setAttributeViewBox();
   afficheArbre0({init:false});
  }
 }
 //========================================================================================================
 function allera000(){
  if(_dssvg.viewBoxInit!==null && _dssvg.viewBoxInit.length===4){
   _dssvg.viewBoxInit[0]=0;
   _dssvg.viewBoxInit[1]=0;
//   refZnDessin.setAttribute('viewBox',_dssvg.viewBoxInit.join(' '));
   setAttributeViewBox();
   afficheArbre0({init:false});
  }
 }
 //========================================================================================================
 function dupliquerGroupe1(){
  if(_dssvg.idArbreCourant!== null ){
   var maxId=-1;
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].id>maxId){
     maxId=_dssvg.arbre0[i].id;
    }
   }
   function boucleCreation(id,tab){
    var ind=recupereIndiceArbre(id);
    tab.push(_dssvg.arbre0[ind]);
    for(var i=0;i<_dssvg.arbre0.length;i++){
     if(_dssvg.arbre0[i].parentId===id){
      var nouvelId=_dssvg.arbre0[i].id;
      boucleCreation(nouvelId,tab);
     }
    }
   }
   var id=_dssvg.idArbreCourant;
   var tab=[];
   boucleCreation(id,tab)

   var idBase=recupereIndiceArbre(_dssvg.idArbreCourant);
   var minIdTab=9999999;
   for(var i=0;i<tab.length;i++){
    if(tab[i].id<minIdTab){
     minIdTab=tab[i].id;
    }
    if(tab[i].parentId !== _dssvg.arbre0[idBase].parentId && tab[i].parentId<minIdTab){
     minIdTab=tab[i].parentId;
    }
   }
   var deltaId=maxId-minIdTab+1;
   

   for(var i=0;i<tab.length;i++){
    var nouvelElem=JSON.parse(JSON.stringify(tab[i]));
    if(nouvelElem.id!==_dssvg.idArbreCourant){
     nouvelElem.parentId=nouvelElem.parentId+deltaId;
    }
    nouvelElem.id=nouvelElem.id+deltaId;
    _dssvg.arbre0.push(nouvelElem);
   }
   afficheArbre0({init:false});
   
  }
 }
 //========================================================================================================
 function dupliquerElement1(){
  if(_dssvg.idArbreCourant!== null ){
   var indC=recupereIndiceArbre(_dssvg.idArbreCourant);
   var idDuParent=_dssvg.arbre0[indC].parentId;
   var indP=recupereIndiceArbre(_dssvg.arbre0[indC].parentId);
   var elem=JSON.parse(JSON.stringify(_dssvg.arbre0[indC]));
   var maxId=-1;
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].id>maxId){
     maxId=_dssvg.arbre0[i].id;
    }
   }
   maxId+=1;
   elem.id=maxId;
   _dssvg.arbre0.push(elem);
   _dssvg.idArbreCourant=maxId;
   globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
   afficheArbre0({init:false});
  }
  
 }
 //========================================================================================================
 function pousserVersBas1(e){
  if(_dssvg.idArbreCourant!== null ){
   var indC=recupereIndiceArbre(_dssvg.idArbreCourant);
   var idDuParent=_dssvg.arbre0[indC].parentId;
   var indP=recupereIndiceArbre(_dssvg.arbre0[indC].parentId);
   if(indP<indC){
    // on insère apres le parent, en supprimant aucun élément (0)
    _dssvg.arbre0.splice(indP+1, 0, JSON.parse(JSON.stringify(_dssvg.arbre0[indC])));
    _dssvg.arbre0.splice(indC+1, 1 );
   }
   afficheArbre0({init:false});
  }
 }
 //========================================================================================================
 function pousserVersHaut1(e){
  if(_dssvg.idArbreCourant!== null ){
   var indC=recupereIndiceArbre(_dssvg.idArbreCourant);
   var idDuParent=_dssvg.arbre0[indC].parentId;
   var dernierIndiceDuMemeParent=-1;
   for(var i=indC+1;i<_dssvg.arbre0.length;i++){
    if(idDuParent===_dssvg.arbre0[i].parentId){
     dernierIndiceDuMemeParent=i;
    }
   }
   if(dernierIndiceDuMemeParent>=0){
    // on insère apres le dernierIndiceDuMemeParent, en supprimant aucun élément (0)
    _dssvg.arbre0.splice(dernierIndiceDuMemeParent+1, 0, JSON.parse(JSON.stringify(_dssvg.arbre0[indC])));
    _dssvg.arbre0.splice(indC, 1 );
   }
   afficheArbre0({init:false});
  }
 }
 //========================================================================================================
 function construireSvgPourExport(ajouterRetrancher){
  var cont='';
  
  var obj=looptree(0,{afficherTout:true,sansDataIdArbre:true});
  if(ajouterRetrancher==null){
   var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+Math.round(_dssvg.arbre0[0].data.sizes.minx*10000)/10000+' '+Math.round(_dssvg.arbre0[0].data.sizes.miny*10000)/10000+'  '+Math.round((_dssvg.arbre0[0].data.sizes.maxx - _dssvg.arbre0[0].data.sizes.minx )*10000)/10000+' '+Math.round((_dssvg.arbre0[0].data.sizes.maxy - _dssvg.arbre0[0].data.sizes.miny )*10000)/10000+'">';
  }else{
   var tt=document.getElementById('sourceSvg').value;
   var pos0=tt.indexOf('viewBox="');
   tt=tt.substr(pos0+9);
   var pos0=tt.indexOf('"');
   var tab=tt.substr(0,pos0).trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
   
   if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnGauche'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0]-1)+' '+(tab[1])+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnGauche'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0]+1)+' '+(tab[1])+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnHautGauche'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0]-1)+' '+(tab[1]-1)+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnHautGauche'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0]+1)+' '+(tab[1]+1)+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnHaut'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0])+' '+(tab[1]-1)+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnHaut'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0])+' '+(tab[1]+1)+'  '+(tab[2])+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnBasDroite'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2]-1)+' '+(tab[3]-1)+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnBasDroite'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2]+1)+' '+(tab[3]+1)+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnMilieuDroite'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2])+' '+(tab[3]-1)+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnMilieuDroite'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2])+' '+(tab[3]+1)+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='moinsUnMilieuBas'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2]-1)+' '+(tab[3])+'">';
   }else if(tab.length===4 && ajouterRetrancher.fonction=='plusUnMilieuBas'){
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+(tab[0])+' '+(tab[1])+'  '+(tab[2]+1)+' '+(tab[3])+'">';
    
   }else{
    var deb='<svg xmlns="http://www.w3.org/2000/svg" viewBox="'+_dssvg.arbre0[0].data.sizes.minx+' '+_dssvg.arbre0[0].data.sizes.miny+'  '+(_dssvg.arbre0[0].data.sizes.maxx - _dssvg.arbre0[0].data.sizes.minx )+' '+(_dssvg.arbre0[0].data.sizes.maxy - _dssvg.arbre0[0].data.sizes.miny )+'">';
   }
  }
  cont+=deb+obj.txt+'</svg>';
  return cont;  
 }
 //========================================================================================================
 function traiteBtnExportSvg(e){
  e.stopPropagation();
  var contenu=construireSvgPourExport({'fonction':e.target.id});
  remplacerContenuBtns(contenu);
 }
 //========================================================================================================
 function remplacerContenuBtns(contenu){
  document.getElementById('sourceSvg').value=contenu;
  document.getElementById('exempleBouton1').innerHTML=contenu.replace('<svg','<svg style="width:20px;height:40px;" ');
  document.getElementById('exempleBouton2').innerHTML=contenu.replace('<svg','<svg style="width:40px;height:20px;" ');
  document.getElementById('exempleBouton3').innerHTML=contenu.replace('<svg','<svg style="width:40px;height:40px;" ');
  document.getElementById('exempleBouton4').innerHTML=contenu.replace('<svg','<svg style="width:20px;height:20px;" ');
  document.getElementById('svgComplet').innerHTML=contenu;
 }
 //========================================================================================================
 function exporterSvg1(){
  if(_dssvg.arbre0.length==0){
   alert(trad['svg_vide']);
   return;
  }
  
  var contentOfPopup='<h3>'+trad['exporter_le_svg']+'</h3>';
  
  contentOfPopup+='<textarea id="sourceSvg" rows="3" style="min-height:30vh;user-select:text;"></textarea>';

  contentOfPopup+='<style>';
  contentOfPopup+='#tableExportSvg td{border:1px blue solid;}';
  contentOfPopup+='</style>';
  
  
  contentOfPopup+='<table id="tableExportSvg" style="width:80%;">';
  contentOfPopup+='<tr>';
  
     contentOfPopup+='<td style="width:33%;">';
      contentOfPopup+='<button id="moinsUnHautGauche" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnHautGauche"class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td style="width:33%;">';
      contentOfPopup+='<button id="moinsUnHaut" class="butEnabled butMenuGauche bckJaune" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnHaut" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td style="width:33%;">';
     contentOfPopup+='</td>';
  
  contentOfPopup+='</tr>';
  contentOfPopup+='<tr>';
  
     contentOfPopup+='<td>';
      contentOfPopup+='<button id="moinsUnGauche" class="butEnabled butMenuGauche bckJaune" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnGauche"class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td>';
     contentOfPopup+='exemples';
     contentOfPopup+='<button id="exempleBouton1" class="butEnabled" style="width:22px;height:42px;"></button>';
     contentOfPopup+='<button id="exempleBouton2" class="butEnabled" style="width:42px;height:22px;"></button>';
     contentOfPopup+='<button id="exempleBouton3" class="butEnabled" style="width:42px;height:42px;"></button>';
     contentOfPopup+='<button id="exempleBouton4" class="butEnabled" style="width:22px;height:22px;"></button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td>';
      contentOfPopup+='<button id="moinsUnMilieuBas" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnMilieuBas"class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';

  contentOfPopup+='</tr>';
  contentOfPopup+='<tr>';

     contentOfPopup+='<td>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td>';
      contentOfPopup+='<button id="moinsUnMilieuDroite" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnMilieuDroite"class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
     
     contentOfPopup+='<td>';
      contentOfPopup+='<button id="moinsUnBasDroite" class="butEnabled butMenuGauche" data-traite="traiteBtnsExportSvg">-1</button>';
      contentOfPopup+='<button id="plusUnBasDroite"class="butEnabled butMenuGauche bckJaune" data-traite="traiteBtnsExportSvg">+1</button>';
     contentOfPopup+='</td>';
  
  contentOfPopup+='</tr>';
  contentOfPopup+='</table>';

  
  contentOfPopup+='';
  contentOfPopup+='<br /><div id="svgComplet" style="border:2px red solid;width:80%;"></div>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  var contenu=construireSvgPourExport(null);
  remplacerContenuBtns(contenu);
  
  activerLesBtExporter();
  

  showPopUp('exporterSvg1');  
 }
 
 
 //========================================================================================================
 function activerLesBtExporter(){
  var lst=document.getElementById('tableExportSvg').getElementsByTagName('*');
  for(var i=0;i<lst.length;i++){
   if(lst[i].getAttribute('data-traite')==='traiteBtnsExportSvg'){
    lst[i].addEventListener('click', traiteBtnExportSvg , 'button');
   }
  }
 }
 
 //========================================================================================================
 function _chargerTest(nf){
  var dl=String(document.location);
  var pos1=dl.lastIndexOf('/');
  
  var url=dl.substr(0,pos1);
  var maindenant=new Date();
  if(navigator.onLine){
   url+='/'+nf+'?t='+maindenant.getTime();
  }else{
   url+='/'+nf;
  }
  
  var r = new XMLHttpRequest();
  r.open("GET",url,true);
  r.timeout=6000;
  r.onreadystatechange = function () {
   if (r.readyState != 4 || r.status != 200) return;
   try{
    var ret=r.responseText;
    document.getElementById('contenuSvg').value=ret;
    importerSvgEtFermer();
   }catch(e){
    console.error(e,r);
    return;
   }
  };
  r.onerror=function(e){
   console.error('e=',e);
   /* whatever(); */    
   return;
  }
  r.ontimeout=function(e){console.error('e=',e); /* whatever(); */    return;}
  r.send();
  
 }
 //========================================================================================================
 function nettoyageDonnees(){
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].data.nodeName==='path'){
    var obj=getPointsFromSvgPath(_dssvg.arbre0[i].data.attributes.d);
    var valeursExtremesTrouvees=false;
    for(var j=0;j<obj.tabPts.length;j++){
     if(obj.tabPts[j][1]>1000000 || obj.tabPts[j][1]<-1000000 || obj.tabPts[j][2]>1000000 || obj.tabPts[j][2]<-1000000 ){
      valeursExtremesTrouvees=true;
      if(obj.tabPts[j][1] > 1000000){
       obj.tabPts[j][1]=0;
      }
      if(obj.tabPts[j][1] <-1000000){
       obj.tabPts[j][1]=0;
      }
      if(obj.tabPts[j][2] > 1000000){
       obj.tabPts[j][2]=0;
      }
      if(obj.tabPts[j][2] <-1000000){
       obj.tabPts[j][2]=0;
      }
     }
    }
    if(valeursExtremesTrouvees===true){
     var leChemin=obj.tabPts.join(' ');
     var obj2=recuperePropsCouleurs(_dssvg.arbre0[i].id); // obj
     var tt=simplifierUnChemin(leChemin,parseFloat(obj2['stroke-width'].valeur));
     _dssvg.arbre0[i].data.attributes.d=tt;
    }
   }
  }
 }
 
 //========================================================================================================
 function finirImport(){
  _dssvg.mode_en_cours='setModeSaisieDeplace1';
  _dssvg.zoom1=1;
  _dssvg.aimanterPixel1=0;
  rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
  strkWiTexteSousPoignees=rayonPoint/20;
  fontSiTexteSousPoignees=rayonPoint;
  _dssvg.viewBoxInit=[0 , 0 , (parseFloat(divc1.style.width)-2*wi_of_the_brds2) , (parseFloat(divc1.style.height)-2*wi_of_the_brds2) ];
//  refZnDessin.setAttribute('viewBox','0 0 '+(parseFloat(divc1.style.width)-2*wi_of_the_brds2)+' '+(parseFloat(divc1.style.height)-2*wi_of_the_brds2)+'');
  setAttributeViewBox();
  getSvgTree({init:true});
  var tabTransform=['transform','gradientTransform'];
  for(var indTr=0;indTr<tabTransform.length;indTr++){
   var nomTransform=tabTransform[indTr];
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if( _dssvg.arbre0[i].data.attributes && _dssvg.arbre0[i].data.attributes[nomTransform] && _dssvg.arbre0[i].data.attributes[nomTransform].indexOf('matrix')>=0 ){
     var matText=_dssvg.arbre0[i].data.attributes[nomTransform]; //.transform;
     var obj=convertirTransformEnTableau(matText,[]);
     var mat=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
     for(var j=0;j<obj.tab.length;j++){
      if(obj.tab[j][0]=='matrix'){
       var mat0=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
       mat0.a=obj.tab[j][1][0];
       mat0.b=obj.tab[j][1][1];
       mat0.c=obj.tab[j][1][2];
       mat0.d=obj.tab[j][1][3];
       mat0.e=obj.tab[j][1][4];
       mat0.f=obj.tab[j][1][5];
       mat=mat.multiply(mat0);
      }else if(obj.tab[j][0]=='translate'){
       mat=mat.translate( obj.tab[j][1][0] , obj.tab[j][1][1] );
      }else if(obj.tab[j][0]=='rotate'){
       mat=mat.rotate( obj.tab[j][1][0] , obj.tab[j][1][1] , obj.tab[j][1][2] );
      }else if(obj.tab[j][0]=='scale'){
       mat=mat.scaleNonUniform( obj.tab[j][1][0] , obj.tab[j][1][1] );
      }else if(obj.tab[j][0]=='skewX'){
       mat=mat.skewX( obj.tab[j][1][0] );
      }
     }
     var fnt=matrixToFnt(mat);
     _dssvg.arbre0[i].data.attributes[nomTransform]=fnt.transform;
     _dssvg.arbre0[i].data.nodeRef.setAttribute(nomTransform,fnt.transform);
    }
   }
  }
  nettoyageDonnees();
  closePopup();
  majBout();
 }  
 
 //========================================================================================================
 function importerEnAjoutant(){
  var NouveauContenu=document.getElementById('contenuSvg').value;
  var pos1=NouveauContenu.toLowerCase().indexOf('<svg');
  if(pos1>=0){
   NouveauContenu=NouveauContenu.substr(pos1);
   var pos2=NouveauContenu.indexOf('>');
   NouveauContenu=NouveauContenu.substr(pos2+1);
  }
  var ancienContenu=refZnDessin.innerHTML;
  NouveauContenu=ancienContenu+NouveauContenu;
  refZnDessin.innerHTML=NouveauContenu;
  finirImport();
 }
 //========================================================================================================
 function importerSvgEtFermer(){
  var contenu=document.getElementById('contenuSvg').value;
  var pos1=contenu.toLowerCase().indexOf('<svg');
  if(pos1>=0){
   contenu=contenu.substr(pos1);
   var pos2=contenu.indexOf('>');
   refZnDessin.innerHTML=contenu.substr(pos2+1);
  }else{
   refZnDessin.innerHTML=contenu;
  }
  finirImport();
 }
 //========================================================================================================
 function importerUrlSvg(){
  var url=document.getElementById('urlAImporter').value;
  if(url===''){
   return;
  }
  var r = new XMLHttpRequest();
  r.open("GET",url,true);
  r.timeout=6000;
  r.onreadystatechange = function () {
   if (r.readyState != 4 || r.status != 200) return;
   try{
    var ret=r.responseText;
    document.getElementById('contenuSvg').value=ret;
    importerSvgEtFermer();
   }catch(e){
    console.error(e,r);
    return;
   }
  };
  r.onerror=function(e){
   console.error('e=',e);
   /* whatever(); */    
   return;
  }
  r.ontimeout=function(e){console.error('e=',e); /* whatever(); */    return;}
  r.send();
 }
 //========================================================================================================
 function _chargerUrlSvg(url){
//  alert(url);
  var r = new XMLHttpRequest();
  r.open("GET",url,true);
  r.timeout=6000;
  r.onreadystatechange = function () {
   if (r.readyState != 4 || r.status != 200) return;
   try{
    var ret=r.responseText;
    document.getElementById('contenuSvg').value=ret;
    importerSvgEtFermer();
   }catch(e){
    console.error(e,r);
    return;
   }
  };
  r.onerror=function(e){
   console.error('e=',e);
   /* whatever(); */    
   return;
  }
  r.ontimeout=function(e){console.error('e=',e); /* whatever(); */    return;}
  r.send();
  
 }
 //========================================================================================================
 function popupImportSvg1(){
  var contentOfPopup='<h3>'+trad['importer_un_svg']+'</h3>';
//  contentOfPopup+='Url : <input id="urlAImporter" style="max-width:80%;border: 3px #eee inset;" />';
//  contentOfPopup+='<br /><button id="importerUrlSvg"  class="butEnabled butMenuHaut">'+trad['Importer_de_l_url']+'</button>';
  contentOfPopup+='<br />';
  contentOfPopup+='<textarea id="contenuSvg" rows="5" style="min-height: 50vh; border: 3px #eee inset; width: 80%;user-select:text;"></textarea>';
  contentOfPopup+='<div id="comandTree1">';
  contentOfPopup+=' <button id="importerSvgEtFermer"  class="butEnabled butMenuHaut">'+trad['importer_en_écrasant']+'</button>';
  contentOfPopup+=' <button id="importerEnAjoutant"   class="butEnabled butMenuHaut">'+trad['importer_en_ajoutant']+'</button>';
  contentOfPopup+=' <br />';
  contentOfPopup+=' <br />Tests';
  // zzvin.svg , zzSimplificationChemin.svg zzSVG_Logo-svgomg.svg zzsagami_single-svgomg.svg zztest-car-lite.svg
//  contentOfPopup+=' <br /><br /><button id="test20"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4.8229 -4.8229  224.8229 106.4479"><defs><pattern id="pat01" viewBox="0,0,14,14" width="20%" height="20%"><g fill="blue" stroke="red" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round"><path d="M 5.5 5.5 a 2 2 0 0 1 0 3 a 2 2 0 1 0 3 0 a 2 2 0 0 1 0 -3 a 2 2 0 1 0 -3 0 "></path><path d=" M -1.5 5.5   a 2 2 0 1 0 0 3   a 2 2 0 0 1 3 0   a 2 2 0 1 0 0 -3   a 2 2 0 0 1 -3 0  "></path><path d="M 12.5 5.5 a 2 2 0 1 0 0 3 a 2 2 0 0 1 3 0 a 2 2 0 1 0 0 -3 a 2 2 0 0 1 -3 0 "></path><path d="M 5.5 -1.5 a 2 2 0 1 0 0 3 a 2 2 0 0 1 3 0 a 2 2 0 1 0 0 -3 a 2 2 0 0 1 -3 0 "></path><path d="M 5.5 12.5 a 2 2 0 1 0 0 3 a 2 2 0 0 1 3 0 a 2 2 0 1 0 0 -3 a 2 2 0 0 1 -3 0 "></path><path d="M -1.5 -1.5 a 2 2 0 0 1 0 3 a 2 2 0 1 0 3 0 a 2 2 0 0 1 0 -3 a 2 2 0 1 0 -3 0 "></path><path d="M 12.5 -1.5 a 2 2 0 0 1 0 3 a 2 2 0 1 0 3 0 a 2 2 0 0 1 0 -3 a 2 2 0 1 0 -3 0 "></path><path d="M 12.5 12.5 a 2 2 0 0 1 0 3 a 2 2 0 1 0 3 0 a 2 2 0 0 1 0 -3 a 2 2 0 1 0 -3 0 "></path><path d="M -1.5 12.5 a 2 2 0 0 1 0 3 a 2 2 0 1 0 3 0 a 2 2 0 0 1 0 -3 a 2 2 0 1 0 -3 0 "></path></g></pattern></defs><circle cx="71.6876" cy="51.625" r="50" fill="url(#pat01)"></circle><circle cx="180" cy="50" r="40" fill="none" stroke-width="30" stroke="url(#pat01)"></circle></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test20 pattern</button>';
  contentOfPopup+=' <br /><br /><button id="test21"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg width="80" height="80" xmlns="http://www.w3.org/2000/svg"    xmlns:xlink="http://www.w3.org/1999/xlink">  <style>    .classA {      fill: red;    }  </style>  <defs>    <g id="Port">      <circle style="fill: inherit;" r="10"/>    </g>  </defs>  <text y="15">black</text>  <use x="50" y="10" href="#Port" />  <text y="35">red</text>  <use x="50" y="30" href="#Port" class="classA"/>  <text y="55">blue</text>  <use x="50" y="50" href="#Port" style="fill: blue;"/></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test21 use &amp; style </button>';
  contentOfPopup+=' <br /><br /><button id="test20"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="-15.6056 -15.6056  216.6056 95.6056"><defs><pattern id="pat01" viewBox="0,0,46,46" width="20%" height="20%"><path fill="red" stroke="blue" stroke-linecap="round" stroke-linejoin="round" d=" M -6 -5 A 7 7 0 1 1 6 -5 A 4 7 0 0 0 6 5 A 7 7 0 1 1 -6 5 A 4 7 0 0 0 -6 -5 M 18 -6 A 7 7 -1 1 0 18 6 A 7 4 0 0 1 28 6 A 7 7 0 1 0 28 -6 A 7 4 0 0 1 18 -6  M -5 17 A 7 7 -1 1 0 -5 29 A 7 4 0 0 1 5 29 A 7 7 0 1 0 5 17 A 7 4 0 0 1 -5 17 M 17 18 A 7 7 0 1 1 29 18 A 4 7 0 0 0 29 28 A 7 7 0 1 1 17 28 A 4 7 0 0 0 17 18 M 40 -5 A 7 7 0 1 1 52 -5 A 4 7 0 0 0 52 5 A 7 7 0 1 1 40 5 A 4 7 0 0 0 40 -5 M 41 17 A 7 7 -1 1 0 41 29 A 7 4 0 0 1 51 29 A 7 7 0 1 0 51 17 A 7 4 0 0 1 41 17 M -6 41 A 7 7 0 1 1 6 41 A 4 7 0 0 0 6 51 A 7 7 0 1 1 -6 51 A 4 7 0 0 0 -6 41 M 18 40 A 7 7 -1 1 0 18 52 A 7 4 0 0 1 28 52 A 7 7 0 1 0 28 40 A 7 4 0 0 1 18 40 M 40 41 A 7 7 0 1 1 52 41 A 4 7 0 0 0 52 51 A 7 7 0 1 1 40 51 A 4 7 0 0 0 40 41"></path></pattern></defs><circle cx="161.7501" cy="40.9994" r="19.312375" fill="url(#pat01)"></circle><circle cx="162" cy="41" r="39" fill="none" stroke-width="30" stroke="url(#pat01)"></circle></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test20 pattern</button>';
  contentOfPopup+=' <br /><br /><button id="test19"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="-28.9289 -24.9948  170.6555 150.0684"><defs><clipPath id="cp" transform="rotate(10)"><path transform="translate(3 3)" d="M 22.9695 18.0532 C 14.1526 18.0532 -3.4807 35.199 -10.093 39.4856 C -14.5013 42.3431 -5.6849 52.3449 -5.6849 53.7739 C -5.6849 55.2027 -5.6849 56.6317 -5.6849 56.6317 C 3.132 62.347 14.1526 65.2046 22.9695 102.3543 C 31.7859 69.4911 56.0316 75.2063 75.8691 102.3543 C 75.8691 62.347 91.2982 63.7758 133.1773 68.0622 C 95.7067 46.6297 58.2361 25.1973 139.7899 19.482 C 97.9108 20.9107 53.8278 19.482 108.9316 -11.9526 C 86.89 -19.0967 22.9695 10.909 20.765 -23.3831 " style="stroke:rgb(0, 0, 0);fill:blanchedalmond;stroke-width:0;stroke-opacity:1;fill-opacity:1;opacity:1;"></path></clipPath></defs><rect x="3" y="4" width="70" height="66" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" clip-path="url(#cp)" style="stroke:rgb(0, 0, 0);fill:rosybrown;stroke-width:1;stroke-opacity:1;fill-opacity:0.5;opacity:1;"></rect></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test19 clipPath</button>';
  contentOfPopup+=' <br /><br /><button id="test17"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="0 -1  442.2656 377.5"><defs><filter id="filtered-3" height="220%"><feFlood flood-color="#551C0B" result="COLOR-outline"></feFlood><feMorphology operator="dilate" radius="0.3" in="SourceAlpha" result="OUTLINE_10"></feMorphology><feComposite operator="in" in="COLOR-outline" in2="OUTLINE_10" result="OUTLINE_20"></feComposite><feGaussianBlur stdDeviation="4" in="SourceAlpha" result="LIGHTING-EFFECTS_10"></feGaussianBlur><feSpecularLighting surfaceScale="5" specularConstant="0.5" specularExponent="7.5" lighting-color="#white" in="LIGHTING-EFFECTS_10" result="LIGHTING-EFFECTS_20"><fePointLight x="750" y="-50" z="300"></fePointLight></feSpecularLighting><feComposite in2="SourceAlpha" operator="in" in="LIGHTING-EFFECTS_20" result="LIGHTING-EFFECTS_30"></feComposite><feComposite operator="arithmetic" k1="0" k2="1" k3="1" k4="0" in="SourceGraphic" in2="LIGHTING-EFFECTS_30" result="LIGHTING-EFFECTS_40"></feComposite><feComponentTransfer in="LIGHTING-EFFECTS_40" result="COLOR-EFFECTS_10"><feFuncR type="gamma" offset="-1.3" amplitude="10" exponent="4.84"></feFuncR><feFuncB type="gamma" offset="-1.3" amplitude="10.1" exponent="40.84"></feFuncB></feComponentTransfer><feMerge><feMergeNode in="OUTLINE_20"></feMergeNode><feMergeNode in="COLOR-EFFECTS_10"></feMergeNode></feMerge></filter></defs><text filter="url(#filtered-3)" x="20" y="140" font-size="140" stroke="#EF7349" fill="#EF7349">BLOP!</text><g fill="transparent" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" stroke="#EF7349"><path filter="url(#filtered-3)" d="M 387 226 C 382.55 226 344.7 277.28 329 292 C 286.38 331.96 230.33 371 170 371 "></path><path filter="url(#filtered-3)" stroke-width="20" stroke="#EF7349" fill="transparent" d=" M 342.5 289.5 C 317.46 321.54 239.49 367.5 212.5 376.5 "></path></g></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test17 filtres 2</button>';
  contentOfPopup+=' <br /><br /><button id="test16"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<defs><filter id="MyFilter" filterUnits="userSpaceOnUse" x="0" y="0" width="200" height="120"><feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"></feGaussianBlur><feOffset in="blur" dx="4" dy="4" result="offsetBlur"></feOffset><feSpecularLighting in="blur" surfaceScale="5" specularConstant="0.75" specularExponent="20" lighting-color="#bbbbbb" result="specOut"><fePointLight x="-5000" y="-10000" z="20000"></fePointLight></feSpecularLighting><feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"></feComposite><feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" result="litPaint"></feComposite><feMerge><feMergeNode in="offsetBlur"></feMergeNode><feMergeNode in="litPaint"></feMergeNode></feMerge></filter></defs><g filter="url(#MyFilter)"><path fill="none" stroke="#D90000" stroke-width="10" d=" M 50 66 c -50 0 -50 -60 0 -60 h 100 c 50 0 50 60 1 60  z"></path><path fill="#D90000" d="M60,56 c-30,0 -30,-40 0,-40 h80 c30,0 30,40 0,40z"></path><g fill="#FFFFFF" stroke="black" font-size="45" font-family="Verdana"><text x="52" y="52">SVG</text></g></g></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test16 filtres</button>';
  contentOfPopup+=' <br /><br /><button id="test15"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<defs> <linearGradient id="a" x1="0" y1="0" x2="100"  y2="100" gradientUnits="userSpaceOnUse"> <stop offset="0" stop-color="blue"/> <stop offset="0.3333" stop-color="white"/> <stop offset="0.6666" stop-color="white"/> <stop offset="1" stop-color="red"/></linearGradient></defs><rect fill="url(#a)" x="0" y="0" width="100" height="100"/>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test15 linear gradient</button>';
  contentOfPopup+=' <br /><br /><button id="test14"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="0 0  7.14109992980957 15.984700202941895"><defs><radialGradient id="a" cx="3.9321" cy="2.3306" r="3.0394" gradientUnits="userSpaceOnUse" ><stop offset="0" stop-color="#e7e7e7"></stop><stop offset="1" stop-color="#565656"></stop></radialGradient></defs><ellipse cx="3.8754" cy="8.3128" rx="3.2657" ry="7.6719" stroke="rgb(0, 0, 0)" fill="transparent" style="stroke:rgb(0, 0, 0);fill:url(#a);stroke-width:0.1;stroke-opacity:1;fill-opacity:1;"></ellipse></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test14 radial gradient</button>';
  contentOfPopup+=' <br /><br /><button id="test04"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<svg viewBox="0 4  554.4265 390.0948"><g transform="   "><g transform="translate(200,0) scale(2) "><rect x="50" y="50" width="30" height="30" stroke="black" fill="transparent" stroke-width="5" transform=" rotate(45 50 50) "></rect><g transform="translate(100,0)"><rect x="50" y="50" width="30" height="30" stroke="black" fill="blue" stroke-width="5" transform=" rotate(45 50 50) "></rect></g></g><g transform=""><rect x="6" y="27" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"></rect><rect x="60" y="10" rx="5" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"></rect><circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"></circle><ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"></ellipse><line x1="10" x2="50" y1="110" y2="150" stroke="orange" stroke-width="5"></line><polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145" stroke="orange" fill="transparent" stroke-width="5"></polyline><polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180" stroke="green" fill="transparent" stroke-width="5"></polygon><path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"></path><path d="M 40,260   A 40,60  0 1 0 60,260" fill="none" stroke="blue" stroke-width="5"></path></g></g></svg>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test04 petits éléments</button>';
  contentOfPopup+=' <br /><br /><button id="test03"  class="butEnabled butMenuHaut" onclick="document.getElementById(\'contenuSvg\').value=\''+htm1('<path d=" M 21 10 L 20 64 L 21 121 M 97 16 Q 66 46 100 63 Q 133 88 105 114 T 105 166 T 103 221 T 106 275 M 180 16 M 230 13 C 176 63 183 106 228 48 C 273 74 278 122 228 86 C 179 149 180 188 228 125 C 285 159 278 183 229 161 M 327 33 L 370 78  L 341 137 L 342 208 H 395 V 251 H 338 V 302 M 526 36 A 50 40 0 1 0 529 79 V 134 A 50 25 -120 0 1 533 185 A 50 25 120 1 0 534 236 V 288 A 20 30 21.6783 1 1 537 350 A 20 47.4513 30 0 0 533 409" style="stroke:black;stroke-width:1;fill:transparent;"></path>')+'\';'+global_variable_name+'.importerSvgEtFermer();">test03 chemin complet</button>';
  contentOfPopup+=' <br />';
  contentOfPopup+=' <br />Demos<br /><br />';
  var tbDemo=['peano.svg','tiger.svg']; // =================== NE PAS OUBLIER LE SERVICE WORKER ========================
  for(var i=0;i<tbDemo.length;i++){
   contentOfPopup+=' <button class="butEnabled butMenuHaut" onclick="'+global_variable_name+'.chargerUrlSvg(\'_demo/'+tbDemo[i]+'\');">'+tbDemo[i]+'</button>';
  }
  contentOfPopup+='</div>';

  popupValue.innerHTML=contentOfPopup;
  
  document.getElementById('importerSvgEtFermer').addEventListener('click',importerSvgEtFermer,'button');
  document.getElementById('importerEnAjoutant').addEventListener('click',importerEnAjoutant,'button');
//  document.getElementById('importerUrlSvg').addEventListener('click',importerUrlSvg,'button');
  
  
//  '<path data-idarbre1="1" d="M 12 12L 22 22" stroke="black" stroke-width="1" fill="transparent"></path>'
  

  showPopUp('popupImportSvg1');  
 }
 
 //========================================================================================================
 function finTouchParam(e){
  e.stopPropagation();
  finActionParam();
 }
 //========================================================================================================
 function finMouseParam(e){
  e.stopPropagation();
  finActionParam();
 }
 //========================================================================================================
 function finActionParam(e){
  removeListeners();
  if('insererUneEtoile'===popUpIsDisplayed1){
   ajouteListenersEtoile();
  }else if('insererUneSpirale2'===popUpIsDisplayed1){
   ajouteListenersSpirale2();
  }else if('popupParametres1'){
   ajouteListenersParam();
  }
 }
 //========================================================================================================
 function recupereIndiceArbre(id){
  var indice=null;
  for(var i=_dssvg.arbre0.length-1;i>=0;i--){
   if(_dssvg.arbre0[i].id==id){
    indice=i;
    break;
   }
  }
  return indice;
 }
 //========================================================================================================
 function aimanterPixel1(e){
  if(_dssvg.aimanterPixel1!==0){
   _dssvg.aimanterPixel1=0;
  }else{
   _dssvg.aimanterPixel1=_dssvg.parametres.facteurAimnt;
  }
  majBout();
  
 }
 //========================================================================================================
 function suppTout(e){
  if(window.confirm(trad['Certain']+' ?')){
   
   _dssvg.arbre0         = [];
   _dssvg.historique1    = [];
   _dssvg.mode_en_cours  = 'setModeSaisieDeplace1';
   _dssvg.idArbreCourant = null;
   _dssvg.idArbrPreceden = null;
   _dssvg.strokeColor1   = 'rgb(0, 0, 0)' ;
   _dssvg.strokCols      =['rgba(0,0,0,1)','rgba(255,0,0,1)','rgba(0,0,255,1)','rgba(0,255,0,1)'];
   _dssvg.filCols        =['rgba(0,0,0,1)','rgba(255,0,0,1)','rgba(0,0,255,1)','rgba(0,255,0,1)'];
   saveStte();
   
   
/*   
   try{
    localStorage.removeItem('_dssvg'); 
   }catch(e){
    consloe.log('erreur suppTout e=',e);
   }
*/   
   var st1=String(document.location);
   document.location=st1;
  }
 }
 //========================================================================================================
 function suppVraimentToutToutTout(e){
  if(window.confirm(trad['Certain']+' ?')){
   try{
    localStorage.removeItem('_dssvg'); 
   }catch(e){
    consloe.log('erreur suppVraimentToutToutTout e=',e);
   }
   var st1=String(document.location);
   document.location=st1;
  }
 } 
 //========================================================================================================
 function supprimeGroupe1(e){
  if(globalGeneralSvgReferenceElement!==null && 
     ecran_appuye==false                     && 
     globalIndiceArbre!==null                &&
     ( _dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1' === _dssvg.mode_en_cours )
  ){
   if(_dssvg.idArbrPreceden===_dssvg.idArbreCourant){
    _dssvg.idArbrPreceden=null;
   }
   for(var i=_dssvg.arbre0.length-1;i>=0;i--){
    if(_dssvg.arbre0[i].parentId===_dssvg.idArbreCourant){
     _dssvg.arbre0.splice(i,1);
    }
   }
   if(_dssvg.idArbreCourant===groupeActif.idDansArbre){
    groupeActif.idDansArbre = 0;
    groupeActif.refGroupe   = refZnDessin;
   }
   _dssvg.arbre0.splice(globalIndiceArbre,1);
   globalGeneralSvgReferenceElement.remove();
   _dssvg.idArbreCourant=null;
   globalIndiceArbre=null;
   globalIndicePoint=null;
   globalGeneralSvgReferenceElement=null;
   afficheArbre0({prendreTout:false});
   majBout();
  }
 }
 //========================================================================================================
 function supprimeElement1(e){
  if(globalGeneralSvgReferenceElement!==null && 
     ecran_appuye==false                     && 
     globalIndiceArbre!==null                &&
     ( (_dssvg.mode_en_cours==='setModeSaisieSelElt1' || 'setModeSaisieDefsElt1'===_dssvg.mode_en_cours ) )
  ){
   if(_dssvg.idArbrPreceden===_dssvg.idArbreCourant){
    _dssvg.idArbrPreceden=null;
   }
   _dssvg.arbre0.splice(globalIndiceArbre,1);
   globalGeneralSvgReferenceElement.remove();
   _dssvg.idArbreCourant=null;
   globalIndiceArbre=null;
   globalIndicePoint=null;
   globalGeneralSvgReferenceElement=null;
   afficheArbre0({prendreTout:false});
  }
 }
 //========================================================================================================
 function  deplaceViewBox(pos){
  var newX=arrdi10000(_dssvg.viewBoxInit[0]+initPosxy.x-pos.x);
  var newY=arrdi10000(_dssvg.viewBoxInit[1]+initPosxy.y-pos.y);
//  refZnDessin.setAttribute('viewBox',(newX)+' '+(newY)+' '+(_dssvg.viewBoxInit[2])+' '+(_dssvg.viewBoxInit[3])+' ')
  _dssvg.viewBoxInit[0]=newX;
  _dssvg.viewBoxInit[1]=newY;
  setAttributeViewBox();  
  divlag1.innerHTML='<span>Vb0Z='+_dssvg.zoom1+'</span><span style="color:red;">vB:'+newX+ ''+newY+ ' '+arrdi10000(_dssvg.viewBoxInit[2])+' '+arrdi10000(_dssvg.viewBoxInit[3])+'';  
 }
 //========================================================================================================
 var globalClickDessin={
  mouseStart:null,
  matriceRacineInverse:null,
  pointsTraces:null,
  tempchild:null,
  mousePosPrecPolyline:{x:null,y:null},
  currentPolyline:null,
  mousePosPrecPolygon:{x:null,y:null},
  currentPolygon:null,
 };
 //========================================================================================================
 function positionSouris(e){
  
  var p=refZnDessin.createSVGPoint();
  try{
		 p.x = e.clientX; 
   p.y = e.clientY;
  }catch(e1){
   console.warn('e1=',e1,'e=',e);
  }
  p=p.matrixTransform(refZnDessin.getScreenCTM().inverse());
  p.x=Math.round(p.x*10)/10;
  p.y=Math.round(p.y*10)/10;
  return {
   x:(e.clientX-decalageX)/_dssvg.zoom1+_dssvg.viewBoxInit[0],
   y:(e.clientY-decalageY)/_dssvg.zoom1+_dssvg.viewBoxInit[1],
   sx:p.x,
   sy:p.y,
  }
 }
 var defTimeoutPolyline=null;
 var defTimeoutPolygon=null;
 
 
 //========================================================================================================
 function timeOutPolyline(){
  divlag1.innerHTML='timeout';
  try{
   clearTimeout(defTimeoutPolyline);
  }catch(e){
   console.warn('Erreur ','color:red;background:yellow','e=',e);
  }
  if(globalClickDessin.mousePosPrecPolyline.x == globalClickDessin.currentPolyline.x  && globalClickDessin.mousePosPrecPolyline.y == globalClickDessin.currentPolyline.y ){
   divlag1.innerHTML='<span style="color:yellow;color:red;">Nouveau segment</span>';
   globalClickDessin.pointsTraces.push([globalClickDessin.currentPolyline.x , globalClickDessin.currentPolyline.y]);
   var tt='  '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + '  ';
   for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
    tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
   }
   globalClickDessin.tempchild.setAttribute('points' , tt );

  }else{
   globalClickDessin.pointsTraces[globalClickDessin.pointsTraces.length-1]=[globalClickDessin.currentPolyline.x , globalClickDessin.currentPolyline.y];
   var tt='  '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + '  ';
   for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
    tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
   }
   globalClickDessin.tempchild.setAttribute('points' , tt );
  }
 }
 //========================================================================================================
 function timeOutPolygon(){
  divlag1.innerHTML='timeout';
  try{
   clearTimeout(defTimeoutPolygon);
  }catch(e){
   console.warn('Erreur ','color:red;background:yellow','e=',e);
  }
  if(globalClickDessin.mousePosPrecPolygon.x == globalClickDessin.currentPolygon.x  && globalClickDessin.mousePosPrecPolygon.y == globalClickDessin.currentPolygon.y ){
   divlag1.innerHTML='<span style="color:yellow;color:red;">Nouveau segment</span>';
   globalClickDessin.pointsTraces.push([globalClickDessin.currentPolygon.x , globalClickDessin.currentPolygon.y]);
   var tt='  '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + '  ';
   for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
    tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
   }
   globalClickDessin.tempchild.setAttribute('points' , tt );

  }else{
   globalClickDessin.pointsTraces[globalClickDessin.pointsTraces.length-1]=[globalClickDessin.currentPolygon.x , globalClickDessin.currentPolygon.y];
   var tt='  '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + '  ';
   for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
    tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
   }
   globalClickDessin.tempchild.setAttribute('points' , tt );
  }


 }
 //========================================================================================================
 function touchDownZoneDessin(e){
  actionDownZoneDessin(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownZoneDessin(e){
  actionDownZoneDessin(e);
 }
 //========================================================================================================
 function actionDownZoneDessin(e){
  divlag1.innerHTML='';
  var modificationViewB=false;
  if(ecran_appuye===false){
   modificationViewB=true;
  }
  enCoursDeSelectionSansClickSurElement=false;
  initPosxy=null;
  if(_dssvg.mode_en_cours!=''){
   initPosxy=positionSouris(e);
   divlag1.innerHTML='<span>md0Z='+_dssvg.zoom1+'</span>,<span>sx='+initPosxy.sx+ '</span>,<span>sy=' + initPosxy.sy+'</span>';

   globalClickDessin.mouseStart=refZnDessin.createSVGPoint();
   globalClickDessin.mouseStart.x = initPosxy.sx;
   globalClickDessin.mouseStart.y = initPosxy.sy;

   if(refZnDessin!==groupeActif.refGroupe){ //groupeActif.idDansArbre!==0){
    // on se demande pourquoi il faut refaire ceci mais sans, ça ne marche plus au deuxième trait
    groupeActif.refGroupe=document.querySelectorAll('[data-idarbre1="'+groupeActif.idDansArbre+'"]')[0];
   }

    
   var tm=refZnDessin.getScreenCTM().inverse().multiply(groupeActif.refGroupe.getScreenCTM());
    
    
   groupeActif.transform='matrix('+tm.a+','+tm.b+','+tm.c+','+tm.d+','+tm.e+','+tm.f+')' ;//  0,0)'; // '+tm.e+','+tm.f+')' ; //,0,0)';
   globalClickDessin.matriceRacineInverse=tm.inverse(); //groupeActif.refGroupe.getScreenCTM().inverse(); 
   globalClickDessin.mouseStart=globalClickDessin.mouseStart.matrixTransform(globalClickDessin.matriceRacineInverse);
   globalClickDessin.mouseStart.x=arrdi10000(globalClickDessin.mouseStart.x);
   globalClickDessin.mouseStart.y=arrdi10000(globalClickDessin.mouseStart.y);
   
   if(_dssvg.mode_en_cours==='setModeSaisieRectangle1'){

    ecran_appuye=true;
    modificationViewB=false;
    
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'rect');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('x',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('y',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('width' ,0);
    globalClickDessin.tempchild.setAttribute('height',0);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0RectZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';

   }else if(_dssvg.mode_en_cours==='setModeSaisieLigne2'){
    
    ecran_appuye=true;
    modificationViewB=false;

    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    globalClickDessin.pointsTraces.push([globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]);
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'line');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('x1',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('y1',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('x2',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('y2',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0LZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
    
   }else if(_dssvg.mode_en_cours==='setModeSaisiePolygon1'){
    ecran_appuye=true;
    modificationViewB=false;

    globalClickDessin.mousePosPrecPolygon.x=globalClickDessin.mouseStart.x;
    globalClickDessin.mousePosPrecPolygon.y=globalClickDessin.mouseStart.y;
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polygon');
    globalClickDessin.tempchild.setAttribute('data-type'      , 'toRemove');
    globalClickDessin.tempchild.setAttribute('points'         , globalClickDessin.mouseStart.x+' '+globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke'         , _dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width'   , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill'           , 'transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    

    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0polyZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
    
   }else if(_dssvg.mode_en_cours==='setModeSaisiePolyline1'){
    
    ecran_appuye=true;
    modificationViewB=false;

    globalClickDessin.mousePosPrecPolygon.x=globalClickDessin.mouseStart.x;
    globalClickDessin.mousePosPrecPolygon.y=globalClickDessin.mouseStart.y;
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'polyline');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('points',globalClickDessin.mouseStart.x+' '+globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0polyZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
     

   }else if(_dssvg.mode_en_cours==='setModeSaisieLigne1'){
    
    ecran_appuye=true;
    modificationViewB=false;

    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    globalClickDessin.pointsTraces.push([globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]);
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'path');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('d','M'+globalClickDessin.mouseStart.x+','+globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0LZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
    
    
    return;





    
   }else if(_dssvg.mode_en_cours==='setModeSaisieEllipse1'){
    ecran_appuye=true;
    modificationViewB=false;
    
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'ellipse');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('cx',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('cy',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('rx' ,0);
    globalClickDessin.tempchild.setAttribute('ry' ,0);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0RectZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';

   }else if(_dssvg.mode_en_cours==='setModeSaisieCercle1'){
    
    ecran_appuye=true;
    modificationViewB=false;
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'circle');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('cx',globalClickDessin.mouseStart.x);
    globalClickDessin.tempchild.setAttribute('cy',globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('r' ,0);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0RectZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';

    
    
   }else if(_dssvg.mode_en_cours==='setModeSaisieChemin1'){

    ecran_appuye=true;
    modificationViewB=false;
    
    globalClickDessin.pointsTraces=[[globalClickDessin.mouseStart.x , globalClickDessin.mouseStart.y]];
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'path');
    globalClickDessin.tempchild.setAttribute('data-type','toRemove');
    globalClickDessin.tempchild.setAttribute('d','M'+globalClickDessin.mouseStart.x+','+globalClickDessin.mouseStart.y);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    globalClickDessin.tempchild.setAttribute('transform' , groupeActif.transform );
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    divlag1.innerHTML='<span>0PZ='+_dssvg.zoom1+'</span>,<span>x='+globalClickDessin.mouseStart.x + '</span>,<span>y=' + globalClickDessin.mouseStart.y+'</span>';
    
   }else if(_dssvg.mode_en_cours=='setModeSaisieDeplace1'){
     ecran_appuye=true;
     modificationViewB=false;
     divLag1Pour({t:'viewBox',l:'vb0z'});
     
   }else if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' || _dssvg.mode_en_cours==='setModeSaisieDefsElt1' ){
    if(modificationViewB===true){
     enCoursDeSelectionSansClickSurElement=true;
    }
   }else if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || _dssvg.mode_en_cours==='setModeSaisieDefsPtE1'){
    if(modificationViewB===true){
     enCoursDeSelectionSansClickSurElement=true;
    }
   }else if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || 'setModeSaisieDefsTrE1'===_dssvg.mode_en_cours){
    if(modificationViewB===true){
     enCoursDeSelectionSansClickSurElement=true;
    }
   }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
    if(modificationViewB===true){
     enCoursDeSelectionSansClickSurElement=true;
    }
   }
  }
 }
 //========================================================================================================
 function divLag1Pour(opt){
  if(opt.t==='viewBox'){
   divlag1.innerHTML='<small>'+opt.l+'=</small><kbd>'+_dssvg.zoom1+'</kbd> <span style="color:red;">'+(_dssvg.viewBoxInit[0])+'</span><span style="color:red;">'+(_dssvg.viewBoxInit[1])+ '</span><span style="color:blue;">'+arrdi10000(_dssvg.viewBoxInit[2])+'</span><span style="color:blue;">'+arrdi10000(_dssvg.viewBoxInit[3])+'</span>';
  }else{
   var t='<small>'+opt.l+'=</small><kbd>'+_dssvg.zoom1+'</kbd> ';
   for(var n in opt){
    if(!( n==='t' || n==='l')){
     t+='<span style="color:red;">'+n+'='+opt[n]+'</span>';
    }
   }
   divlag1.innerHTML=t;
  }
 }
 //========================================================================================================
 function touchMoveZoneDessin(e){
  e.stopPropagation();
//  e.preventDefault(); // utile pour l'arbre ??
  moveZoneDessin(e.touches[0]);
 }
 //========================================================================================================
 function mouseMoveZoneDessin(e){
  e.stopPropagation();
//  e.preventDefault();
  moveZoneDessin(e);
 }
 var enCoursDeSelectionSansClickSurElement=false;
 //========================================================================================================
 function moveZoneDessin(e){
  globalDernierePositionSouris=positionSouris(e);
  
  
  if(enCoursDeSelectionSansClickSurElement===true){
   if(_dssvg.aimanterPixel1!==0){
    var newX=Math.round((_dssvg.viewBoxInit[0]+initPosxy.x-globalDernierePositionSouris.x)*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
    var newY=Math.round((_dssvg.viewBoxInit[1]+initPosxy.y-globalDernierePositionSouris.y)*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
   }else{
    var newX=Math.round((_dssvg.viewBoxInit[0]+initPosxy.x-globalDernierePositionSouris.x)*10)/(10);
    var newY=Math.round((_dssvg.viewBoxInit[1]+initPosxy.y-globalDernierePositionSouris.y)*10)/(10);
   }
   _dssvg.viewBoxInit[0]=newX;
   _dssvg.viewBoxInit[1]=newY;
   setAttributeViewBox();  
   divLag1Pour({t:'viewBox',l:'vb1z'});
   return;
   
  }
  
  if(ecran_appuye===false){
   if(_dssvg.aimanterPixel1!==0){
    var posmx=Math.round(globalDernierePositionSouris.sx*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
    var posmy=Math.round(globalDernierePositionSouris.sy*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
   }else{
    var posmx=Math.round(globalDernierePositionSouris.sx*10)/(10);
    var posmy=Math.round(globalDernierePositionSouris.sy*10)/(10);
   }
   divLag1Pour({t:'mmFz',l:'mmFz','sx':posmx,'sy':posmy});
  }else if(ecran_appuye!==false){
   if(_dssvg.mode_en_cours!=''){
    
    if(_dssvg.mode_en_cours==='setModeSaisieRectangle1'){

     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     
     var width=current.x - globalClickDessin.pointsTraces[0][0];
     var x=globalClickDessin.pointsTraces[0][0];
     if(width<0){
      width=-width;
      x=current.x;
     }
     var height=current.y-globalClickDessin.pointsTraces[0][1];
     var y=globalClickDessin.pointsTraces[0][1];
     if(height<0){
      height=-height;
      y=current.y;
     }
     x=arrdi10000(x);
     y=arrdi10000(y);
     width=arrdi10000(width);
     height=arrdi10000(height);
     globalClickDessin.tempchild.setAttribute('x'      , x );
     globalClickDessin.tempchild.setAttribute('width'  , width  );
     globalClickDessin.tempchild.setAttribute('y'      , y );
     globalClickDessin.tempchild.setAttribute('height' , height );

     divLag1Pour({t:'mmrec',l:'mmrec','x':x,'y':y,'w':width,'h':height});
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieLigne2'){
     
     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     current.x=arrdi10000(current.x);
     current.y=arrdi10000(current.y);

     globalClickDessin.pointsTraces[1]=[current.x , current.y];
     globalClickDessin.tempchild.setAttribute('x1' , globalClickDessin.pointsTraces[0][0]);
     globalClickDessin.tempchild.setAttribute('y1' , globalClickDessin.pointsTraces[0][1]);
     globalClickDessin.tempchild.setAttribute('x2' , globalClickDessin.pointsTraces[1][0]);
     globalClickDessin.tempchild.setAttribute('y2' , globalClickDessin.pointsTraces[1][1]);

     divLag1Pour({t:'mmpl',l:'mmpl','x':globalClickDessin.pointsTraces[1][0],'y':globalClickDessin.pointsTraces[1][1]});

    }else if(_dssvg.mode_en_cours==='setModeSaisiePolygon1'){
     
     try {clearTimeout(defTimeoutPolygon);}catch(e){}
     globalClickDessin.currentPolygon=refZnDessin.createSVGPoint();
     globalClickDessin.currentPolygon.x = globalDernierePositionSouris.sx; 
     globalClickDessin.currentPolygon.y = globalDernierePositionSouris.sy;
     
     
     globalClickDessin.currentPolygon=globalClickDessin.currentPolygon.matrixTransform(globalClickDessin.matriceRacineInverse);
     globalClickDessin.currentPolygon.x=arrdi10000(globalClickDessin.currentPolygon.x);
     globalClickDessin.currentPolygon.y=arrdi10000(globalClickDessin.currentPolygon.y);
     globalClickDessin.mousePosPrecPolygon.x=globalClickDessin.currentPolygon.x;
     globalClickDessin.mousePosPrecPolygon.y=globalClickDessin.currentPolygon.y;
 
     // si on a mis que le premier point ou le deuxième point
     if(globalClickDessin.pointsTraces.length <= 2 ){
      globalClickDessin.pointsTraces[1]=[globalClickDessin.currentPolygon.x , globalClickDessin.currentPolygon.y];
      var tt='  '+globalClickDessin.pointsTraces[0][0] + ' '+globalClickDessin.pointsTraces[0][1] + '  ';
      for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
       tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
      }
      globalClickDessin.tempchild.setAttribute('points' , tt );
      defTimeoutPolygon=setTimeout( timeOutPolygon , 500 );
     }else{
      globalClickDessin.pointsTraces[globalClickDessin.pointsTraces.length-1]=[globalClickDessin.currentPolygon.x , globalClickDessin.currentPolygon.y];
      var tt='  '+globalClickDessin.pointsTraces[0][0] + ' '+globalClickDessin.pointsTraces[0][1] + '  ';
      for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
       tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
      }
      globalClickDessin.tempchild.setAttribute('points' , tt );
      defTimeoutPolygon=setTimeout( timeOutPolygon , 500 );
     }
     divLag1Pour({t:'mmpg',l:'mmpg','x':globalClickDessin.currentPolygon.x,'y':globalClickDessin.currentPolygon.y});
     

    }else if(_dssvg.mode_en_cours==='setModeSaisiePolyline1'){
     
     try {clearTimeout(defTimeoutPolyline);}catch(e){}
     globalClickDessin.currentPolyline=refZnDessin.createSVGPoint();
     globalClickDessin.currentPolyline.x = globalDernierePositionSouris.sx; 
     globalClickDessin.currentPolyline.y = globalDernierePositionSouris.sy;
     
     globalClickDessin.currentPolyline=globalClickDessin.currentPolyline.matrixTransform(globalClickDessin.matriceRacineInverse);
     globalClickDessin.currentPolyline.x=arrdi10000(globalClickDessin.currentPolyline.x);
     globalClickDessin.currentPolyline.y=arrdi10000(globalClickDessin.currentPolyline.y);
     globalClickDessin.mousePosPrecPolyline.x=globalClickDessin.currentPolyline.x;
     globalClickDessin.mousePosPrecPolyline.y=globalClickDessin.currentPolyline.y;
 
     // si on a mis que le premier point ou le deuxième point
     if(globalClickDessin.pointsTraces.length <= 2 ){
      globalClickDessin.pointsTraces[1]=[globalClickDessin.currentPolyline.x , globalClickDessin.currentPolyline.y];
      var tt='  '+globalClickDessin.pointsTraces[0][0] + ' '+globalClickDessin.pointsTraces[0][1] + '  ';
      for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
       tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
      }
      globalClickDessin.tempchild.setAttribute('points' , tt );
      defTimeoutPolyline=setTimeout( timeOutPolyline , 500 );
     }else{
      globalClickDessin.pointsTraces[globalClickDessin.pointsTraces.length-1]=[globalClickDessin.currentPolyline.x , globalClickDessin.currentPolyline.y];
      var tt='  '+globalClickDessin.pointsTraces[0][0] + ' '+globalClickDessin.pointsTraces[0][1] + '  ';
      for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
       tt+=globalClickDessin.pointsTraces[i].join(' ')+' ';
      }
      globalClickDessin.tempchild.setAttribute('points' , tt );
      defTimeoutPolyline=setTimeout( timeOutPolyline , 500 );
     }
     divLag1Pour({t:'mmpl',l:'mmpl','x':globalClickDessin.currentPolyline.x,'y':globalClickDessin.currentPolyline.y});
     
 
      

    }else if(_dssvg.mode_en_cours==='setModeSaisieLigne1'){
     
     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     current.x=arrdi10000(current.x);
     current.y=arrdi10000(current.y);

     globalClickDessin.pointsTraces[1]=[current.x , current.y];
     globalClickDessin.tempchild.setAttribute('d' , 'M '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + ' L '+globalClickDessin.pointsTraces[1][0] + ','+globalClickDessin.pointsTraces[1][1] )

     divLag1Pour({t:'mmplc',l:'mmplc','x':current.x,'y':current.x});

     return;     
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieEllipse1'){
     
     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     var rx=(current.x - globalClickDessin.pointsTraces[0][0]);
     var ry=(current.y - globalClickDessin.pointsTraces[0][1]);
     if(rx<0){
      rx=-rx;
      var cx=current.x+rx;
     }else{
      var cx=current.x-rx;
     }
     if(ry<0){
      ry=-ry;
      var cy=current.y+ry;
     }else{
      var cy=current.y-ry;
     }
     cx=arrdi10000(cx);
     cy=arrdi10000(cy);
     rx=arrdi10000(rx);
     ry=arrdi10000(ry);
     globalClickDessin.tempchild.setAttribute('cx' , cx );
     globalClickDessin.tempchild.setAttribute('cy' , cy );
     globalClickDessin.tempchild.setAttribute('rx' , rx );
     globalClickDessin.tempchild.setAttribute('ry' , ry );

     divLag1Pour({t:'mmeli',l:'mmeli','cx':cx,'cy':cy,'rx':rx,'ry':ry});

    }else if(_dssvg.mode_en_cours==='setModeSaisieCercle1'){

     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     var r=((current.x - globalClickDessin.pointsTraces[0][0])+(current.y - globalClickDessin.pointsTraces[0][1]))/2;
     if(r<0){
      r=-r;
      var cx=current.x+r;
      var cy=current.y+r;
     }else{
      var cx=current.x-r;
      var cy=current.y-r;
     }
     cx=arrdi10000(cx);
     cy=arrdi10000(cy);
     r=arrdi10000(r);
     globalClickDessin.tempchild.setAttribute('cx'      , cx );
     globalClickDessin.tempchild.setAttribute('cy'      , cy );
     globalClickDessin.tempchild.setAttribute('r'       , r );

     divLag1Pour({t:'mmcer',l:'mmcer','cx':cx,'cy':cy,'r':r});


    }else if(_dssvg.mode_en_cours==='setModeSaisieChemin1'){

     var current=refZnDessin.createSVGPoint();
     current.x = globalDernierePositionSouris.sx; 
     current.y = globalDernierePositionSouris.sy;
     
     current=current.matrixTransform(globalClickDessin.matriceRacineInverse);
     
     current.x=arrdi10000(current.x);
     current.y=arrdi10000(current.y);
     
     globalClickDessin.pointsTraces.push([current.x , current.y]);
     var t='M '+globalClickDessin.pointsTraces[0][0] + ','+globalClickDessin.pointsTraces[0][1] + ' L '; // arrdi10000(
     for(var i=1;i<globalClickDessin.pointsTraces.length;i++){
      t+=globalClickDessin.pointsTraces[i].join(' ')+' ';
     }
     globalClickDessin.tempchild.setAttribute('d' , t );
     
     divLag1Pour({t:'mmche',l:'mmche','x':current.x,'y':current.y});
     
     
     
    }else if(_dssvg.mode_en_cours=='setModeSaisieDeplace1'){

     if(_dssvg.aimanterPixel1!==0){
      var newX=Math.round((_dssvg.viewBoxInit[0]+initPosxy.x-globalDernierePositionSouris.x)*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
      var newY=Math.round((_dssvg.viewBoxInit[1]+initPosxy.y-globalDernierePositionSouris.y)*_dssvg.aimanterPixel1*10)/(_dssvg.aimanterPixel1*10);
     }else{
      var newX=Math.round((_dssvg.viewBoxInit[0]+initPosxy.x-globalDernierePositionSouris.x)*10)/(10);
      var newY=Math.round((_dssvg.viewBoxInit[1]+initPosxy.y-globalDernierePositionSouris.y)*10)/(10);
     }
     _dssvg.viewBoxInit[0]=newX;
     _dssvg.viewBoxInit[1]=newY;
     setAttributeViewBox();  
     divLag1Pour({t:'viewBox',l:'vb2z'});
     
     
    }else if(_dssvg.mode_en_cours=='setModeSaisieSelElt1' || _dssvg.mode_en_cours==='setModeSaisieDefsElt1' ){
     
     
     if('deplaceElement'===ecran_appuye){
      actMovElementPosition(e);
     }else if('tailleElement' ===ecran_appuye){
      actMovElementTaille(e); 
     }
      
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1' === _dssvg.mode_en_cours ){
     
     if('deplacementPoint'===ecran_appuye){
      actionMoveSelectionPtElement(e);
     }
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || _dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
     
     if('fElementTransformAngle2'===ecran_appuye){
      fElementTransformAngle2(e);
     }else if('fElementTransformCentreRotation'===ecran_appuye){
      fElementTransformCentreRotation(e);
     }else if('felementTransformEchelle3'===ecran_appuye){
      felementTransformEchelle3(e);
     }else if('fElementTransformSkewx'===ecran_appuye){
      fElementTransformSkewx(e);
     }else if('fElementTransformTranslate1'===ecran_appuye){
      fElementTransformTranslate1(e);
     }
     
    }
   }
  }
 }
 //========================================================================================================
 function recupCheminVersRelatif( indPoint , tbOriginal, tbAbsolu , nuArbr ){
  var ttemp=JSON.parse(JSON.stringify(tbOriginal[indPoint]));
  var dx=0;
  var dy=0;
  var xDetermine=false;
  var yDetermine=false;
  if(indPoint-1>0 && tbAbsolu[indPoint-1][0]==='Z'){
   // si le point précédent est un Z, il faut remonter au dernier M connu
   for(var j=indPoint-1;j>=0 && !( xDetermine===true && yDetermine===true );j--){
    if(tbAbsolu[j][0]==='M'){
     xDetermine=true;
     dx=tbAbsolu[j][1];
     yDetermine=true;
     dy=tbAbsolu[j][2];
    }
   }
   
  }else{
   for(var j=indPoint-1;j>=0 && !( xDetermine===true && yDetermine===true );j--){
    if(tbAbsolu[j].length>=3){
     if(xDetermine===false){
      xDetermine=true;
      dx=tbAbsolu[j][tbAbsolu[j].length-2];
     }
     if(yDetermine===false){
      yDetermine=true;
      dy=tbAbsolu[j][tbAbsolu[j].length-1];
     }          
    }else if(tbAbsolu[j].length==2){
     if(tbAbsolu[j][0]==='H'){
      if(xDetermine===false){
       xDetermine=true;
       dx=tbAbsolu[j][tbAbsolu[j].length-1];
      }
     }else if(tbAbsolu[j][0]==='V'){
      if(yDetermine===false){
       yDetermine=true;
       dy=tbAbsolu[j][tbAbsolu[j].length-1];
      }
     }
    }
   }
  }

  if(ttemp[0]==ttemp[0].toLowerCase()){
   // rien à faire
  }else if(ttemp[0]=='C'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
   ttemp[5]=arrdi10000(ttemp[5]-dx);
   ttemp[6]=arrdi10000(ttemp[6]-dy);
  }else if(ttemp[0]=='S'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
  }else if(ttemp[0]=='L'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='V'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dy);
  }else if(ttemp[0]=='H'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
  }else if(ttemp[0]=='Q'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
  }else if(ttemp[0]=='T'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='M'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='A'){
   ttemp[0]=ttemp[0].toLowerCase();
   ttemp[6]=arrdi10000(ttemp[6]-dx);
   ttemp[7]=arrdi10000(ttemp[7]-dy);
  }else if(ttemp[0]=='Z'){
  }else{
   console.warn('%ctraiter ttemp[0]=','color:purple;',ttemp[0])
  }
  return ttemp.join(' ');  
 }
 
 //========================================================================================================
 function traiterAction(txt){
//  console.log('traiterAction txt=',txt,'actionBoutonDivlag2Fait=',actionBoutonDivlag2Fait);
  if(actionBoutonDivlag2Fait===true){
   actionBoutonDivlag2Fait=false;
   return true;
  }
  actionBoutonDivlag2Fait=false;
  try{
   var jso=JSON.parse(txt);
   if('supptransform1'===jso.action){
    var supTr=supptransform1(jso.numArbre,jso.numTransform);
    if(supTr.statut===true){
     globalGeneralSvgReferenceElement=supTr.elem;
    }
    afficheArbre0({prendreTout:false});
    return supTr.statut;
   }else if('pointEnAbsolu'===jso.action || 'pointEnRelatif'===jso.action || 'largeArc'===jso.action || 'sweepFlag'===jso.action ){
    if(globalSelectionPoints.tabOriginal!==null && globalSelectionPoints.tabAbsolu!==null){
     globalSelectionPoints.tabOriginal[jso.indicePoint]=jso.nouvPoint.split(' ');
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i++){
      tt+=' '+globalSelectionPoints.tabOriginal[i].join(' ')+ '  ';
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
     }
     afficheArbre0({init:false});
    }
   }else if('cheminCompletEnAbsolu'===jso.action){
    if(globalSelectionPoints.tabOriginal!==null && globalSelectionPoints.tabAbsolu!==null){
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabAbsolu.length;i++){
      tt+=''+globalSelectionPoints.tabAbsolu[i].join(' ')+'   ';
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
     }     
     afficheArbre0({init:false});
    }
   }else if('cheminCompletEnRelatif'===jso.action){
    if(globalSelectionPoints.tabOriginal!==null && globalSelectionPoints.tabAbsolu!==null){
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i++){
      var nouvelleChaine=recupCheminVersRelatif(i , globalSelectionPoints.tabOriginal , globalSelectionPoints.tabAbsolu , jso.numArbre );
      tt+=nouvelleChaine+'   ';
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
     }     
     afficheArbre0({init:false});
    }
    
   }else if('ajouterPointPolyAvant'===jso.action){
    if(globalSelectionPoints.tabOriginal!==null){
     var nt=[];
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
      var xprec=globalSelectionPoints.tabOriginal[i];
      var yprec=globalSelectionPoints.tabOriginal[i+1];
      if(i==jso.indicePoint){
       tt+=' '+(xprec-3*32/_dssvg.zoom1) + ' ' + (yprec-3*32/_dssvg.zoom1) + ' ';
       nt.push(xprec-3*32/_dssvg.zoom1);
       nt.push(yprec-3*32/_dssvg.zoom1);
      }
      nt.push(xprec);
      nt.push(yprec);
      tt+=' '+xprec + ' ' + yprec + ' ';
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['points']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('points',tt);
      globalSelectionPoints.tabOriginal=nt;
     }
     afficheArbre0({init:false});
    }
   }else if('ajouterPointPolyApres'===jso.action){
//       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointPolylineApres","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">ajouter point apres</button>';
    if(globalSelectionPoints.tabOriginal!==null){
     var nt=[];
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
      var xprec=globalSelectionPoints.tabOriginal[i];
      var yprec=globalSelectionPoints.tabOriginal[i+1];
      nt.push(xprec);
      nt.push(yprec);
      tt+=' '+xprec + ' ' + yprec + ' ';
      if(i==jso.indicePoint){
       tt+=' '+(xprec+3*32/_dssvg.zoom1) + ' ' + (yprec+3*32/_dssvg.zoom1) + ' ';
       nt.push(xprec+3*32/_dssvg.zoom1);
       nt.push(yprec+3*32/_dssvg.zoom1);
      }
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['points']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('points',tt);
      globalSelectionPoints.tabOriginal=nt;
     }
     afficheArbre0({init:false});
     
    }
    
   }else if('supprimerPointPolyline'===jso.action){
//       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"supprimerPointPolyline","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')
    if(globalSelectionPoints.tabOriginal!==null){
     var nt=[];
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
      var xprec=globalSelectionPoints.tabOriginal[i];
      var yprec=globalSelectionPoints.tabOriginal[i+1];
      if(i==jso.indicePoint){
      }else{
       nt.push(xprec);
       nt.push(yprec);
       tt+=' '+xprec + ' ' + yprec + ' ';
      }
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['points']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('points',tt);
      globalSelectionPoints.tabOriginal=nt;
      globalIndicePoint=null;
     }
     afficheArbre0({init:false});
     
    }
   }else if('SupprimerPointChemin'===jso.action){
    if(globalSelectionPoints.tabOriginal!==null){
     var nto=[];
     var tt='';
     var pDebPrec={x:null,y:null};
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=1){
      if(i===jso.indicePoint){
       if(globalSelectionPoints.tabOriginal[i][0]==='C'){
        pDebPrec.x=globalSelectionPoints.tabOriginal[i][1];
        pDebPrec.y=globalSelectionPoints.tabOriginal[i][2];
       }
      }else if(i!==jso.indicePoint){
       if(i===jso.indicePoint+1 && pDebPrec.x!==null && globalSelectionPoints.tabOriginal[i][0]==='C'){
        globalSelectionPoints.tabOriginal[i][1]=pDebPrec.x;
        globalSelectionPoints.tabOriginal[i][2]=pDebPrec.y;
       }
       nto.push(globalSelectionPoints.tabOriginal[i]);
       tt+='  '+ globalSelectionPoints.tabOriginal[i].join(' ')+ ' ';
      }
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
      
      globalIndicePoint=null;
     }
     afficheArbre0({init:false});
    }
   }else if('ajouterPointChemin'===jso.action){
    
    if(globalSelectionPoints.tabOriginal!==null){
     var nto=[];
     var tt='';
     for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=1){
      tt+='  '+ globalSelectionPoints.tabOriginal[i].join(' ')+ ' ';
      if(i===jso.indicePoint){
       if(jso.typePointChemin==='M'){
        tt+='  m '+(64/_dssvg.zoom1)+' '+(64/_dssvg.zoom1)+'  ';
       }else if(jso.typePointChemin==='L'){
        tt+='  l '+(64/_dssvg.zoom1)+' '+(64/_dssvg.zoom1)+'  ';
       }else if(jso.typePointChemin==='C'){
        tt+='  c 0 '+(-64/_dssvg.zoom1)+'    '+(64/_dssvg.zoom1)+' '+(-64/_dssvg.zoom1)+'   '+(64/_dssvg.zoom1)+' 0 ';
       }else if(jso.typePointChemin==='S'){
        tt+='  s     '+(64/_dssvg.zoom1)+' '+(-64/_dssvg.zoom1)+'   '+(64/_dssvg.zoom1)+' 0   ';
       }else if(jso.typePointChemin==='Q'){
        tt+='  q     '+(64/_dssvg.zoom1)+' '+(-64/_dssvg.zoom1)+'   '+(64/_dssvg.zoom1)+' 0   ';
       }else if(jso.typePointChemin==='T'){
        tt+='  t  '+(64/_dssvg.zoom1)+' 0   ';
       }else if(jso.typePointChemin==='H'){
        tt+='  h  '+(64/_dssvg.zoom1)+'  ';
       }else if(jso.typePointChemin==='V'){
        tt+='  v  '+(64/_dssvg.zoom1)+'  ';
       }else if(jso.typePointChemin==='A'){
        tt+='  a  '+(64/_dssvg.zoom1)+' '+(64/_dssvg.zoom1)+'  0 1 1   '+(64/_dssvg.zoom1)+'   '+(64/_dssvg.zoom1)+' ';
       }else if(jso.typePointChemin==='Z'){
        tt+='  z  ';
       }
      }
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     if(globalGeneralSvgReferenceElement){
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
     }
     afficheArbre0({init:false});
    }
   }else if('strokeElement'===jso.action || 'fillElement'===jso.action){
    colorPickerData.numArbre=jso.numArbre;
    colorPickerData.value=jso.valeur;
    colorPickerData.id=null;
    colorPickerData.context=''+jso.action+'';
    popupCouleurs(null);
    
   }else if('stroke-width' === jso.action){
    
    strokeData.numArbre=jso.numArbre;
    strokeData.value=jso.valeur;
    strokeData.context=''+jso.action+'';
    popupStroke(null)
    
   }else if('stroke-opacity' === jso.action || 'fill-opacity' === jso.action || 'opacity' === jso.action){
    
    strokeData.numArbre=jso.numArbre;
    strokeData.value=jso.valeur;
    strokeData.context=''+jso.action+'';
    popupOpacity(null)
    
   }else if('simplifierChemin1'===jso.action){
    
    if(globalGeneralSvgReferenceElement){
     var tt=globalGeneralSvgReferenceElement.getAttribute('d');
     if(tt){
      tt=simplifierUnChemin(tt,jso.strkWidth);
      
      var obj=getPointsFromSvgPath(tt);
      globalSelectionPoints.tabOriginal=obj.tabOri;
      globalSelectionPoints.tabAbsolu=obj.tabAbs;
      globalIndicePoint=0;
     
      var indA=recupereIndiceArbre(jso.numArbre);
      globalGeneralSvgReferenceElement.setAttribute('d' , tt );
      _dssvg.arbre0[indA].data.attributes['d']=tt;
     
      
      afficheArbre0({init:false});

      
      
     }
    }
    
   }else if('wiEtHeImageVide'===jso.action){
    
    var indA=recupereIndiceArbre(jso.numArbre);
    globalGeneralSvgReferenceElement.removeAttribute('width');
    globalGeneralSvgReferenceElement.removeAttribute('height');
    var obj=_dssvg.arbre0[indA].data.attributes;
    var nobj={};
    for(var n in obj){
     if(n==='width' || n==='height'){
     }else{
      nobj[n]=obj[n];
     }
    }
    _dssvg.arbre0[indA].data.attributes=nobj;
    afficheArbre0({init:false});
    
   }else if('opacity'===jso.action){
    strokeData.numArbre=jso.numArbre;
    strokeData.value=jso.valeur;
    strokeData.context=''+jso.action+'';
    popupOpacity(null);
    
    



   }else if('pastestyyl'===jso.action){
    
    if(styylCopie!==null){
     for(var v in styylCopie){
      majPropArbre(jso.numArbre , v , styylCopie[v].valeur , false );
     }
     afficheArbre0({init:false});
    }

   }else if('copystyyl'===jso.action){
    
    var couleurs=recuperePropsCouleurs(jso.numArbre);
    styylCopie=null;
    try{
     styylCopie=JSON.parse(JSON.stringify(couleurs));
    }catch(ek){}
    
    
   }else if('editElement'===jso.action){
    popupArbo1();
    setTimeout( function(){_editFunction1(jso.numArbre);},50 );
    
    
   }else if('suppAttribGra1'===jso.action){
    
    
    
    var indA=recupereIndiceArbre(jso.numArbre);
    for( n in _dssvg.arbre0[indA].data.attributes){
     if(n==='style' || n==='fill' || n==='fill-opacity' || n==='stroke' || n==='stroke-width' || n==='stroke-opacity'  || n==='opacity'  || n==='stroke-linecap'  || n==='stroke-linejoin' ){
      _dssvg.arbre0[indA].data.attributes[n]='';
     }
    }
    afficheArbre0({init:false});
   }else if('suppAttribGraDuGroupe1'===jso.action){
    for( i=0;i<_dssvg.arbre0.length;i++){
     if(_dssvg.arbre0[i].parentId===jso.numArbre){
      for( n in _dssvg.arbre0[i].data.attributes){
       if(n==='style' || n==='fill' || n==='fill-opacity' || n==='stroke' || n==='stroke-width' || n==='stroke-opacity'  || n==='opacity'  || n==='stroke-linecap'  || n==='stroke-linejoin' ){
        _dssvg.arbre0[i].data.attributes[n]='';
       }
      }
     }
    }
    afficheArbre0({init:false});
    
   }else if('popupPropEltsGrp1'===jso.action){
    popupPropEltsGrp1(jso);



    
   }else if('selectSeulemen'===jso.action){
    
    selectSeulement=jso.valeur;
    afficheArbre0({init:false});
    
    
   }else if('selectionnerGroupeDessous1'===jso.action){
    _dssvg.idArbreCourant=parseInt(jso.idAutre,10);
    afficheArbre0({init:false});
    var lst=document.querySelectorAll('[data-elem="'+jso.idCourant+' hg"]'); // 
    try{
     for(var i=lst.length-1;i>=0;i--){
      lst[i].remove();
     }
     
    }catch(e){
    }
   
    
   }else if('hOuVenL1'===jso.action){
    
    if(globalGeneralSvgReferenceElement){
     var tt=globalGeneralSvgReferenceElement.getAttribute('d');
     if(tt){
      var obj=getPointsFromSvgPath(tt);
      tt='';
      for(var i=0;i<obj.tabAbs.length;i++){
       if(obj.tabAbs[i][0]==='H' || obj.tabAbs[i][0]==='V' ){
        tt+=' '+obj.tabPts[i].join(' ');
       }else{
        tt+=' '+obj.tabAbs[i].join(' ');
       }
      }
      globalGeneralSvgReferenceElement.setAttribute('d',tt);
      var indA=recupereIndiceArbre(jso.numArbre);
      _dssvg.arbre0[indA].data.attributes['d']=tt;
      
      afficheArbre0({init:false});
     }
    }


   }else if('deplaceEltsGrp'===jso.action){
    popupDeplaceEltsGrp1(jso);
    return true;
   }else if('redimEltsGrp'===jso.action){
    popupRedimEltsGrp1(jso);
    return true;
   }else if('redimElt1'===jso.action){
    popupRedimEltsGrp1(jso);
    return true;
   }else if('editPath1'===jso.action){
    popupeditPath1(jso);
    return true;
   
   }else if('XenLA10'===jso.action){
    
    var tt=globalGeneralSvgReferenceElement.getAttribute('d');
    if(tt){
     var obj=getPointsFromSvgPath(tt);
     globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'path');
     globalClickDessin.tempchild.setAttribute('data-type','toRemove');
     globalClickDessin.tempchild.setAttribute('d',tt);
     globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
     globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
     globalClickDessin.tempchild.setAttribute('fill','transparent');
     var  mypath = globalClickDessin.tempchild;
     var  pathLength = mypath.getTotalLength();
     var  polygonPoints= [];
     for (var j=0; j<_dssvg.parametres.diviseurDeChemin; j++) {
      var p = mypath.getPointAtLength(j * pathLength / _dssvg.parametres.diviseurDeChemin);
      polygonPoints.push([p.x,p.y]);
     }
     tt=' M '+polygonPoints[0][0]+' '+polygonPoints[0][1];
     for( var j=1;j<polygonPoints.length;j++){
      tt+=' L '+polygonPoints[j][0]+' '+polygonPoints[j][1];
     }
     
     var xFina=null;
     var yFina=null;
     if(obj.tabAbs[obj.tabAbs.length-1][0].toUpperCase()==='Z'){
      xFina=obj.tabAbs[0][1];
      yFina=obj.tabAbs[0][2];
     }else{
      for(var j=obj.tabAbs.length-1;j>=0 && (xFina===null || yFina===null);j--){
       if(obj.tabAbs[j][0]==='H'){
        xFina=obj.tabAbs[j][1]
       }else if(obj.tabAbs[j][0]==='V'){
        yFina=obj.tabAbs[j][1]
       }else{
        xFina=xFina===null?obj.tabAbs[j][obj.tabAbs[j].length-2]:xFina;
        yFina=yFina===null?obj.tabAbs[j][obj.tabAbs[j].length-1]:yFina;
       }
      }
     }
     tt+=' L '+xFina+' '+yFina;
     
     
     globalGeneralSvgReferenceElement.setAttribute('d',tt);
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     
    }
    afficheArbre0({init:false});
    
   }else if('XenL10'===jso.action){
    
    var tt=globalGeneralSvgReferenceElement.getAttribute('d');
    if(tt && jso.indicePoint>0){
     var obj=getPointsFromSvgPath(tt);
     tt='';
     for(var i=0;i<obj.tabOri.length;i++){
      if(jso.indicePoint===i){
       var xPrec=null;
       var yPrec=null;
       for(var j=jso.indicePoint-1;j>=0 && (xPrec===null || yPrec===null);j--){
        if(obj.tabAbs[j][0]==='H'){
         xPrec=obj.tabAbs[j][1]
        }else if(obj.tabAbs[j][0]==='V'){
         yPrec=obj.tabAbs[j][1]
        }else{
         xPrec=xPrec===null?obj.tabAbs[j][obj.tabAbs[j].length-2]:xPrec;
         yPrec=yPrec===null?obj.tabAbs[j][obj.tabAbs[j].length-1]:yPrec;
        }
       }
       var xFina=null;
       var yFina=null;
       for(var j=jso.indicePoint;j>=0 && (xFina===null || yFina===null);j--){
        if(obj.tabAbs[j][0]==='H'){
         xFina=obj.tabAbs[j][1]
        }else if(obj.tabAbs[j][0]==='V'){
         yFina=obj.tabAbs[j][1]
        }else{
         xFina=xFina===null?obj.tabAbs[j][obj.tabAbs[j].length-2]:xFina;
         yFina=yFina===null?obj.tabAbs[j][obj.tabAbs[j].length-1]:yFina;
        }
       }
       
       
       
//       console.log('xPrec=',xPrec , 'yPrec=' , yPrec , 'xFina=',xFina , 'yFina=' , yFina , obj.tabOri[i] , ', ptemp=' , 'M '+xPrec+' '+yPrec + ' ' + obj.tabOri[i].join(' '));
       
       globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'path');
       globalClickDessin.tempchild.setAttribute('data-type','toRemove');
       globalClickDessin.tempchild.setAttribute('d','M '+xPrec+' '+yPrec + ' ' + obj.tabOri[i].join(' '));
       globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
       globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
       globalClickDessin.tempchild.setAttribute('fill','transparent');
       globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
       globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
       
//       refZnDessin.appendChild(globalClickDessin.tempchild);
       

       var  mypath = globalClickDessin.tempchild;
       var  pathLength = mypath.getTotalLength();
       var  polygonPoints= [];

       for (var j=0; j<_dssvg.parametres.diviseurDeChemin; j++) {
         var p = mypath.getPointAtLength(j * pathLength / _dssvg.parametres.diviseurDeChemin);
         polygonPoints.push([p.x,p.y]);
       }
//       console.log('polygonPoints=',polygonPoints);
//       globalClickDessin.tempchild.remove();
       for( var j=1;j<polygonPoints.length;j++){
        tt+=' L '+polygonPoints[j][0]+' '+polygonPoints[j][1];
       }
       tt+=' L '+xFina+' '+yFina;

//       var  mypolygon = document.getElementById("mypolygon");
//       mypolygon.setAttribute("points", polygonPoints.join(","));       
       
       
       
       
       
       
      }else{
       tt+=' '+obj.tabOri[i].join(' ');
      }
     }
     
     
     globalGeneralSvgReferenceElement.setAttribute('d',tt);
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     
    }
    afficheArbre0({init:false});
   }else if('enC1'===jso.action){
    var tt=globalGeneralSvgReferenceElement.getAttribute('d');
    if(tt && jso.indicePoint>0){
     var obj=getPointsFromSvgPath(tt);
     obj.tabOri[jso.indicePoint]=['C',obj.tabPts[jso.indicePoint-1][1],obj.tabPts[jso.indicePoint-1][2],obj.tabPts[jso.indicePoint][1],obj.tabPts[jso.indicePoint][2],obj.tabPts[jso.indicePoint][1],obj.tabPts[jso.indicePoint][2] ]
     tt='';
     for(var i=0;i<obj.tabOri.length;i++){
      tt+=' '+obj.tabOri[i].join(' ');
     }
     globalGeneralSvgReferenceElement.setAttribute('d',tt);
     var indA=recupereIndiceArbre(jso.numArbre);
     _dssvg.arbre0[indA].data.attributes['d']=tt;
     
    }
    afficheArbre0({init:false});
   
   }else if('polylineToPath'===jso.action){
    var tt=globalGeneralSvgReferenceElement.getAttribute('points');
    var tabTT=tt.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    if(tabTT.length>=4){
     var ntt='M '+tabTT[0] + ' ' + tabTT[1] + ' ' ;
     for(var i=2;i<tabTT.length;i+=2){
      ntt += ' C ' + tabTT[i-2] + ' ' + tabTT[i-1] + ' ' + tabTT[i] + ' ' + tabTT[i+1] + ' ' + tabTT[i] + ' ' + tabTT[i+1] + '   ' ;
     }
     var indA=recupereIndiceArbre(jso.numArbre);
     var elem=JSON.parse(JSON.stringify(_dssvg.arbre0[indA].data.attributes));
     var newElem={};
     for(var elt in elem){
      if(elt==='points'){
       newElem['d']=ntt;
      }else{
       newElem[elt]=elem[elt];
      }
     }
     _dssvg.arbre0[indA].data.attributes=JSON.parse(JSON.stringify(newElem));
     _dssvg.arbre0[indA].data.label='path';
     _dssvg.arbre0[indA].data.nodeName='path';
    }
    afficheArbre0({init:false});
    
   }else if('PTR2ABS'===jso.action){
    globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+jso.numArbre+'"]');
    globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
    
    var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.getScreenCTM());//.scale(_dssvg.zoom1,_dssvg.zoom1);
    globalSelectionPoints.pathChaineD=globalGeneralSvgReferenceElement.getAttribute('d');
    var obj=getPointsFromSvgPath(globalSelectionPoints.pathChaineD);
    globalSelectionPoints.tabOriginal=obj.tabOri;
    globalSelectionPoints.tabAbsolu  =obj.tabAbs;
    

    var tt='';
    var pointFixePrecedent={x:0,y:0};
    var pt0    = refZnDessin.createSVGPoint();
    var ptC2   = refZnDessin.createSVGPoint();
    var ptC1   = refZnDessin.createSVGPoint();
    var ptPrec = refZnDessin.createSVGPoint();
    
    
    for(var i=0;i<globalSelectionPoints.tabAbsolu.length;i++){
     if(globalSelectionPoints.tabAbsolu[i][0]=='L' || globalSelectionPoints.tabAbsolu[i][0]=='M' || (globalSelectionPoints.tabAbsolu[i][0]=='m' && i==0)){
      
      pt0.x=globalSelectionPoints.tabAbsolu[i][1];
      pt0.y=globalSelectionPoints.tabAbsolu[i][2];
      pointFixePrecedent.x=pt0.x;
      pointFixePrecedent.y=pt0.y;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

      tt+=globalSelectionPoints.tabAbsolu[i][0]+' '+pt0.x+ ' ' + pt0.y+ ' ';
      
     }else if(globalSelectionPoints.tabAbsolu[i][0]=='A' ){

      var tmpA=[0,0   , 0 ,  0 , 0 ,    0,0];
      pt0.x=globalSelectionPoints.tabAbsolu[i][6];
      pt0.y=globalSelectionPoints.tabAbsolu[i][7];
      pointFixePrecedent.x=pt0.x;
      pointFixePrecedent.y=pt0.y;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
      tmpA[5]=pt0.x;
      tmpA[6]=pt0.y;
      tt+=globalSelectionPoints.tabAbsolu[i][0]+' '+globalSelectionPoints.tabAbsolu[i][1]+' '+globalSelectionPoints.tabAbsolu[i][2]+' '+globalSelectionPoints.tabAbsolu[i][3]+' '+globalSelectionPoints.tabAbsolu[i][4]+' '+globalSelectionPoints.tabAbsolu[i][5]+' '+pt0.x+ ' ' + pt0.y+ ' ' ;

      
     }else if(globalSelectionPoints.tabAbsolu[i][0]=='H' ){



      // point de fin
      pt0.x=globalSelectionPoints.tabAbsolu[i][1];
      pt0.y=pointFixePrecedent.y;
      pointFixePrecedent.x=pt0.x;
      pointFixePrecedent.y=pt0.y;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

      tt+='L '+pt0.x+ ' ' + pt0.y+ ' ' ;


     }else if(globalSelectionPoints.tabAbsolu[i][0]=='V' ){

      // point de fin
      pt0.x=pointFixePrecedent.x;
      pt0.y=globalSelectionPoints.tabAbsolu[i][1];
      pointFixePrecedent.x=pt0.x;
      pointFixePrecedent.y=pt0.y;

      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

      tt+='L '+pt0.x+ ' ' + pt0.y+ ' ' ;

     }else if(globalSelectionPoints.tabAbsolu[i][0]=='T' ){

      // point de fin
      pt0.x=globalSelectionPoints.tabAbsolu[i][1];
      pt0.y=globalSelectionPoints.tabAbsolu[i][2];
      pointFixePrecedent.x=pt0.x;
      pointFixePrecedent.y=pt0.y;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

      tt+=globalSelectionPoints.tabAbsolu[i][0]+' '+pt0.x+ ' ' + pt0.y+ ' ' ;

     }else if(globalSelectionPoints.tabAbsolu[i][0]=='Q' || globalSelectionPoints.tabAbsolu[i][0]=='S' ){
      
      ptPrec.x=pointFixePrecedent.x;
      ptPrec.y=pointFixePrecedent.y;
      ptPrec=ptPrec.matrixTransform(matrixRelatifVersAbsolu);
      
      // premier point de controle
      ptC1.x=globalSelectionPoints.tabAbsolu[i][1];
      ptC1.y=globalSelectionPoints.tabAbsolu[i][2];
      ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);
      
      tt+=globalSelectionPoints.tabAbsolu[i][0]+' '+ptC1.x + ' ' + ptC1.y + ' ' ;

      // point de fin
      pt0.x=globalSelectionPoints.tabAbsolu[i][3];
      pt0.y=globalSelectionPoints.tabAbsolu[i][4];
      pointFixePrecedent.x=pt0.x;
      pointFixePrecedent.y=pt0.y;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

      tt+=' '+pt0.x + ' ' + pt0.y + ' ' ;

      
     }else if(globalSelectionPoints.tabAbsolu[i][0]=='C' ){
      
      ptPrec.x=pointFixePrecedent.x;
      ptPrec.y=pointFixePrecedent.y;
      ptPrec=ptPrec.matrixTransform(matrixRelatifVersAbsolu);

      // premier point de controle
      ptC1.x=globalSelectionPoints.tabAbsolu[i][1];
      ptC1.y=globalSelectionPoints.tabAbsolu[i][2];
      ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);
      
      tt+=globalSelectionPoints.tabAbsolu[i][0]+' '+ptC1.x + ' ' + ptC1.y + ' ' ;

      // deuxième point de controle
      ptC2.x=globalSelectionPoints.tabAbsolu[i][3];
      ptC2.y=globalSelectionPoints.tabAbsolu[i][4];
      ptC2=ptC2.matrixTransform(matrixRelatifVersAbsolu);
      
      tt+=' '+ptC2.x + ' ' + ptC2.y + ' ' ;


      
      // point de fin
      pt0.x=globalSelectionPoints.tabAbsolu[i][5];
      pt0.y=globalSelectionPoints.tabAbsolu[i][6];
      pointFixePrecedent.x=pt0.x;
      pointFixePrecedent.y=pt0.y;
      pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

      tt+=' '+pt0.x + ' ' + pt0.y + ' ' ;

     }else if(globalSelectionPoints.tabAbsolu[i][0]=='Z' ){
     }else{
      console.warn('Non traité : ' , globalSelectionPoints.tabAbsolu[i] );
     }
    }
//    console.log('tt='+tt);
    
    globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'path');
    var indA=recupereIndiceArbre(jso.numArbre);
    globalClickDessin.tempchild.setAttribute('d',tt);
    globalClickDessin.tempchild.setAttribute('stroke',_dssvg.strokeColor1);
    globalClickDessin.tempchild.setAttribute('stroke-width' , _dssvg.strokeWidth1);
    globalClickDessin.tempchild.setAttribute('fill','transparent');
    globalClickDessin.tempchild.setAttribute('stroke-linejoin', 'round');
    globalClickDessin.tempchild.setAttribute('stroke-linecap' , 'round');
    
    refZnDessin.appendChild(globalClickDessin.tempchild);
    ajouteEntreeArbre('path',null);
    
    afficheArbre0({init:false});
   }
   
  }catch(e){
   console.warn('%cErreur à traiter','background:yellow;color:red;','txt=',txt,'e=',e);
  }
  actionBoutonDivlag2Fait=true;
  return false;
 }
 //========================================================================================================
 function setOpacity(e){
  majPropArbre(strokeData.numArbre , strokeData.context , strokeData.value , true );
  closePopup();
 }
 //========================================================================================================
 function changeOpacity(e){

  if(e.target.getAttribute('data-ajouterRetrancher')){
   var nouvelleValeur=Math.round( (parseFloat( dogid('parOpacityValeur').getAttribute('data-valeur') ) + parseFloat(e.target.getAttribute('data-ajouterRetrancher')) )*1000)/1000 ;
   if(nouvelleValeur>=0 && nouvelleValeur<=1){
    strokeData.value=nouvelleValeur;
    dogid('parOpacityValeur').setAttribute('data-valeur', nouvelleValeur );
    dogid('parOpacityValeur').setAttribute('data-fixer' , nouvelleValeur );
    dogid('parOpacityValeur').innerHTML=nouvelleValeur;
   }
  }else{
   strokeData.value=parseFloat(e.target.getAttribute('data-fixer'));
   majPropArbre(strokeData.numArbre , strokeData.context , strokeData.value , true );
   closePopup();
  }
 }
 //========================================================================================================
 function popupOpacity(e){
  var contentOfPopup='<h3>'+trad['Gérer_l_opacité']+' ('+strokeData.context+')</h3>';
  
  contentOfPopup+='<div  id="opacityButs" style="display:flex;flex-direction: column;margin-top:3px;">';
  var valeur=0;
  try{
   valeur=parseFloat(strokeData.value);
   if(isNaN(valeur)){
    valeur=1;
   }
  }catch(e){}
  strokeData.value=valeur;

  contentOfPopup+='<button id="parOpacityValeur" class="butEnabled butMenuGauche" data-valeur="'+valeur+'" data-fixer="'+valeur+'" style="display:inline-block;min-width:7rem;margin:5px auto 5px auto;text-align:center;font-size:2em;min-height: 1.5em;" data-valeur="'+valeur+'">'+valeur+'</button>';
  var tabs=[0.1,0.01,0.001];
  for(var j=0;j<tabs.length;j++){
   contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
    contentOfPopup+='<button class="butEnabled butMenuGauche" data-ajouterRetrancher="-'+tabs[j]+'" style="min-width:4em;">-'+tabs[j]+'</button>&nbsp;';
    contentOfPopup+='<button class="butEnabled butMenuGauche" data-ajouterRetrancher="+'+tabs[j]+'" style="min-width:4em;">+'+tabs[j]+'</button>&nbsp;';
   contentOfPopup+='</div>';
  }
  contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="1"    style="min-width:4em;">1</button>';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="0.75" style="min-width:4em;">0.8</button>';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="0.5"  style="min-width:4em;">0.5</button>';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="0.25" style="min-width:4em;">0.25</button>';
   contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="0"    style="min-width:4em;">0</button>';
  contentOfPopup+='</div>';
   
  contentOfPopup+='</div>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  var lst=dogid('opacityButs').getElementsByTagName('button');
  for( var i=0;i<lst.length;i++){
   lst[i].addEventListener('click' , changeOpacity , 'button' )
  }
  dogid('parOpacityValeur').addEventListener('click' , setOpacity , 'button' )
  
  showPopUp('popupOpacity');  
  
 }
 
 
 //========================================================================================================
 function setStrokeWidth(e){
  majPropArbre(strokeData.numArbre , strokeData.context , strokeData.value , true );
  _dssvg.strokeWidth1=strokeData.value;
  closePopup();
 }
 //========================================================================================================
 function changeStrokeWidth(e){

  if(e.target.getAttribute('data-ajouterRetrancher')){
   var nouvelleValeur=Math.round( (parseFloat( dogid('parStrokeValeur').getAttribute('data-valeur') ) + parseFloat(e.target.getAttribute('data-ajouterRetrancher')) )*1000)/1000 ;
   if(nouvelleValeur>=0 && nouvelleValeur<=100){
    strokeData.value=nouvelleValeur;
    dogid('parStrokeValeur').setAttribute('data-valeur', nouvelleValeur );
    dogid('parStrokeValeur').innerHTML=nouvelleValeur;
   }
  }else if(e.target.getAttribute('data-fixer')){
   strokeData.value=parseFloat(e.target.getAttribute('data-fixer'));
   majPropArbre(strokeData.numArbre , strokeData.context , strokeData.value , true );
   _dssvg.strokeWidth1=strokeData.value;
   closePopup();
  }
 }
 //========================================================================================================
 function popupStroke(e){
  var contentOfPopup='<h3>'+trad['Gérer_l_épaisseur_du_trait']+' ('+strokeData.context+')</h3>';
  
  contentOfPopup+='<div  id="strokeButs" style="display:flex;flex-direction: column;margin-top:3px;">';
  var valeur=0;
  try{
   valeur=parseFloat(strokeData.value);
   if(isNaN(valeur)){
    valeur=1;
   }
  }catch(e){}
  strokeData.value=valeur;

   contentOfPopup+='<button id="parStrokeValeur" class="butEnabled butMenuGauche"  style="display:inline-block;min-width:7rem;margin:5px auto 5px auto;text-align:center;font-size:2em;min-height: 1.5em;" data-valeur="'+valeur+'">'+valeur+'</button>';
   var tabs=[10,1,0.1,0.01,0.001,0.0001];
   for(var j=0;j<tabs.length;j++){
    contentOfPopup+='<div style="text-align:center;margin-top:10px;">';
     contentOfPopup+='<button class="butEnabled butMenuGauche" data-ajouterRetrancher="-'+tabs[j]+'" style="min-width:4em;">-'+tabs[j]+'</button>&nbsp;';
     contentOfPopup+='<button class="butEnabled butMenuGauche" data-ajouterRetrancher="+'+tabs[j]+'" style="min-width:4em;">+'+tabs[j]+'</button>&nbsp;';
     contentOfPopup+='<button class="butEnabled butMenuGauche bckJaune" data-fixer="+'+tabs[j]+'" style="min-width:4em;">'+tabs[j]+'</button>';
    contentOfPopup+='</div>';
   }
   
  contentOfPopup+='</div>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  var lst=dogid('strokeButs').getElementsByTagName('button');
  for( var i=0;i<lst.length;i++){
   lst[i].addEventListener('click' , changeStrokeWidth , 'button' )
  }
  dogid('parStrokeValeur').addEventListener('click' , setStrokeWidth , 'button' )
  
  showPopUp('popupStroke');  
  
 }
 //========================================================================================================
 function ajouteText1(){
  // <text data-idarbre1="4" x="2.6556" y="2.1126" stroke="black" stroke-width="0.02" fill="transparent" font-family="Verdana" font-size="0.5">?</text> 
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'text');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'x'                  , _dssvg.viewBoxInit[0]+64/_dssvg.zoom1 );
  globalClickDessin.tempchild.setAttribute( 'y'                  , _dssvg.viewBoxInit[0]+64/_dssvg.zoom1 );
  globalClickDessin.tempchild.setAttribute( 'style' , 'font-size:'+(0.5*32/_dssvg.zoom1)+';stroke-width:'+(0.02*32/_dssvg.zoom1)+';stroke:black;fill:blue;font-family:Verdana;');
  refZnDessin.appendChild(globalClickDessin.tempchild);

  ajouteEntreeArbre('text',null);
  closePopup();
  afficheArbre0({prendreTout:false});
  
 }
 //========================================================================================================
 function ajouteImage1(){
  // <text data-idarbre1="4" x="2.6556" y="2.1126" stroke="black" stroke-width="0.02" fill="transparent" font-family="Verdana" font-size="0.5">?</text> 
  globalClickDessin.tempchild=document.createElementNS("http://www.w3.org/2000/svg",'text');
  globalClickDessin.tempchild.setAttribute('data-type','toRemove');
  globalClickDessin.tempchild.setAttribute( 'x'                  , _dssvg.viewBoxInit[0]+64/_dssvg.zoom1 );
  globalClickDessin.tempchild.setAttribute( 'y'                  , _dssvg.viewBoxInit[0]+64/_dssvg.zoom1 );
  globalClickDessin.tempchild.setAttribute( 'xlink:href'         , './kermit.jpg' );
  refZnDessin.appendChild(globalClickDessin.tempchild);

  ajouteEntreeArbre('image',null);
  closePopup();
  afficheArbre0({prendreTout:false});
  
 }
 //========================================================================================================
 function simplifieChemin4(tabOri){
  var tabReduit=tabOri;
  var boucle=true;
  var goon=999;
  var a1=0;
  var a2=0;
  var a3=0;
  var i=0;
  var delta=0;
//  var points=draw_state.elementsToDraw2[ind].ptList;

  var points=[];
  var pointsOriginaux=[]
//  var points=draw_state.elementsToDraw2[ind].ptList;
  for(var i=0;i<tabOri.length;i++){
   if(i==0){
    pointsOriginaux.push(['p',null , null , tabOri[i][1] , tabOri[i][2] , tabOri[i+1][1] , tabOri[i+1][2] ]);
   }else if(i==tabOri.length-1){
    pointsOriginaux.push(['p',tabOri[i][3] , tabOri[i][4] , tabOri[i][5] , tabOri[i][6] , null , null ]);
   }else{
    pointsOriginaux.push(['p',tabOri[i][3] , tabOri[i][4] , tabOri[i][5] , tabOri[i][6] , tabOri[i+1][1] , tabOri[i+1][2] ]);
   }
  }


  var imin=pointsOriginaux.length-1
  while(goon-- > 0){
   points=JSON.parse(JSON.stringify(pointsOriginaux)); // points=draw_state.elementsToDraw2[ind].ptList;
   boucle=true;
   for( var i=imin;i>=2 && goon && boucle;i--){
    // distance entre 2 points
    a1=Math.sqrt((points[i][3]-points[i-1][3])*(points[i][3]-points[i-1][3]) + (points[i][4]-points[i-1][4])*(points[i][4]-points[i-1][4]) );
    if(a1<32/_dssvg.zoom1){ // if(a1<rayon*2+draw_state.elementsToDraw2[ind].lineWidth1/2){
     // on supprime le point
     pointsOriginaux.splice(i-1, 1); // draw_state.elementsToDraw2[ind].ptList.splice(i-1, 1);
     imin=pointsOriginaux.length-1; // imin=draw_state.elementsToDraw2[ind].ptList.length-1;
     boucle=false;
    }else{
     imin=i-1;
    }
   }
   if(i<2){
    goon=0;
   }
  }

  tabReduit=[];
  for(var i=0;i<pointsOriginaux.length;i++){
   if(i===0){
    tabReduit.push(['M',pointsOriginaux[i][3],pointsOriginaux[i][4]]);
   }else{
    tabReduit.push(['C',pointsOriginaux[i-1][5],pointsOriginaux[i-1][6]   ,  pointsOriginaux[i][1],pointsOriginaux[i][2]   ,  pointsOriginaux[i][3],pointsOriginaux[i][4]    ]);
   }
  }

  return tabReduit;
  
 } 
 
 //========================================================================================================
 function simplifieChemin3(tabOri){ // supprime les point intermédiaires avec des angles < 20°
  var tabReduit=tabOri;
  var boucle=true;
  var goon=999; // nombre de passes
  var a1=0;
  var a2=0;
  var a3=0;
  var i=0;
  var delta=0;
  var points=[];
  var pointsOriginaux=[]

  for(var i=0;i<tabOri.length;i++){
   if(i==0){
    pointsOriginaux.push(['p',null , null , tabOri[i][1] , tabOri[i][2] , tabOri[i+1][1] , tabOri[i+1][2] ]);
   }else if(i==tabOri.length-1){
    pointsOriginaux.push(['p',tabOri[i][3] , tabOri[i][4] , tabOri[i][5] , tabOri[i][6] , null , null ]);
   }else{
    pointsOriginaux.push(['p',tabOri[i][3] , tabOri[i][4] , tabOri[i][5] , tabOri[i][6] , tabOri[i+1][1] , tabOri[i+1][2] ]);
   }
  }
  points=JSON.parse(JSON.stringify(pointsOriginaux));
  var imin=pointsOriginaux.length-1
  while(goon-- > 0){
   points=JSON.parse(JSON.stringify(pointsOriginaux)); //draw_state.elementsToDraw2[ind].ptList;
   boucle=true;
   for( var i=imin;i>=2 && goon && boucle;i--){
    // angle entre le dernier et l'avant dernier
    a1=angle2Points(points[i][3],points[i][4],points[i-1][3],points[i-1][4]);
    // angle entre le dernier et l'avant avant dernier
    a2=angle2Points(points[i][3],points[i][4],points[i-2][3],points[i-2][4]);
    delta=Math.abs(a1-a2);
    if(a2>270 && a1<90){
     delta=Math.abs(a1-(360-a2));
    }else if(a2<90 && a1>270){
     delta=Math.abs((360-a1)-a2);
    }else{
    }
    if(delta<5){
     a3=angle2Points(points[i-1][5],points[i-1][6],points[i-1][1],points[i-1][2]);
     if( a1>270 && a3<90){
      a1=360-a1;
     }else if( a1<90 && a3>270){
      a3=360-a3;
     }
     if(Math.abs(a1-a3)<20){
      // on supprime le point
      pointsOriginaux.splice(i-1, 1);
      imin=pointsOriginaux.length-1;
      boucle=false;
     }else{
      imin=i-1;
     }
    }else{
     imin=i-1;
    }
   }
   if(i<2){
    goon=0;
   }
  }

  tabReduit=[];
  for(var i=0;i<pointsOriginaux.length;i++){
   if(i===0){
    tabReduit.push(['M',pointsOriginaux[i][3],pointsOriginaux[i][4]]);
   }else{
    tabReduit.push(['C',pointsOriginaux[i-1][5],pointsOriginaux[i-1][6]   ,  pointsOriginaux[i][1],pointsOriginaux[i][2]   ,  pointsOriginaux[i][3],pointsOriginaux[i][4]    ]);
   }
  }

  return tabReduit;
 }
 
 
 //========================================================================================================
 function ajouteEntreeArbre(label,parentId){
  if(_dssvg.arbre0.length==0){
   getSvgTree({init:false});
  }
  var maxId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>maxId){
    maxId=_dssvg.arbre0[i].id;
   }
  }
  maxId+=1;

  globalClickDessin.tempchild.setAttribute('data-idarbre1',maxId);

  var attrs={
   'data-idarbre1':maxId      
  };
  if(globalClickDessin.tempchild.attributes){
   for (let attribute of globalClickDessin.tempchild.attributes){
    if(attribute.nodeName=='data-type' && attribute.nodeValue=='toRemove'){
    }else{
     attrs[attribute.nodeName]=attribute.nodeValue;
    }
   }
  }

  var obj1={
   id:maxId,parentId:(parentId===null?0:parentId),isOpen:1,
   data:{
    label:label,
    level:0,
    type:'node',
    nodeName:label,
    text:((label==='text'||label==='tspan')?'?':''),
    attributes:JSON.parse(JSON.stringify(attrs)),
   }
  };
  _dssvg.arbre0.push(JSON.parse(JSON.stringify(obj1)));
  var ind=_dssvg.arbre0.length-1;
  _dssvg.arbre0[ind].data.attributes['transform']='';
  globalClickDessin.tempchild.setAttribute('transform','');
  
  if(parentId===null && groupeActif.refGroupe!==refZnDessin){
   // il faut déplacer l'élément dans le groupe actif et supprimer le transform
   _dssvg.arbre0[ind].parentId=groupeActif.idDansArbre;
   groupeActif.refGroupe.appendChild(globalClickDessin.tempchild);

  }
  return maxId;
  
 }
 
 //========================================================================================================
 function touchUpFenetre(e){
  e.stopPropagation();
  actionFinMouseUpOuTouchEndFenetre(e.touches[0]);
 }
 //========================================================================================================
 function mouseUpFenetre(e){
  e.stopPropagation();
  actionFinMouseUpOuTouchEndFenetre(e)
 }
 var actionBoutonDivlag2Fait=false;
 //========================================================================================================
 function actionFinMouseUpOuTouchEndFenetre(e){
//  console.log('actionFinMouseUpOuTouchEndFenetre actionBoutonDivlag2Fait=',actionBoutonDivlag2Fait);
  actionBoutonDivlag2Fait=false;
  try{clearTimeout(defTimeoutPolyline);}catch(e){}
  try{clearTimeout(defTimeoutPolygon);}catch(e){}
  if(e && e.target && e.target.nodeName.toLowerCase()==='button'){
   var action=e.target.getAttribute('data-action');
   if(action){
    var ret=traiterAction(action);
    actionBoutonDivlag2Fait=true;
    if(ret===true){
      return;
    }
   }
  }
  if(enCoursDeSelectionSansClickSurElement===true){
   _dssvg.viewBoxInit=refZnDessin.getAttribute('viewBox').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
   afficheArbre0({prendreTout:false});
   enCoursDeSelectionSansClickSurElement=false;
   return;
  }
  
  
  if(ecran_appuye!==false){
   if(_dssvg.mode_en_cours!=''){
    
    if(_dssvg.mode_en_cours==='setModeSaisieRectangle1'){
     
     ajouteEntreeArbre('rect',null);
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieLigne2'){

     ajouteEntreeArbre('line',null);

    }else if(_dssvg.mode_en_cours==='setModeSaisieLigne1'){
     
     ajouteEntreeArbre('path',null);
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieEllipse1'){

     ajouteEntreeArbre('ellipse',null);
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieCercle1'){
     
     ajouteEntreeArbre('circle',null);
     
     
     
    }else if(_dssvg.mode_en_cours==='setModeSaisiePolyline1'){

     ajouteEntreeArbre('polyline',null);

    }else if(_dssvg.mode_en_cours==='setModeSaisiePolygon1'){

     ajouteEntreeArbre('polygon',null);

    }else if(_dssvg.mode_en_cours==='setModeSaisieChemin1'){
     
     var listePoints=simplifySvgPath(globalClickDessin.pointsTraces , {tolerance:2.5,precision:2} ); // la tolérance = 0.5 pixels {tolerance:2.5,precision:5}

     var obj=getPointsFromSvgPath(listePoints.path);
     if(_dssvg.parametres.optimisationChemin===0){
     }else if(_dssvg.parametres.optimisationChemin===1){
      if(obj.tabAbs.length>2){
       obj.tabAbs=simplifieChemin3(obj.tabAbs);
      }

     }else{
      if(obj.tabAbs.length>2){
       obj.tabAbs=simplifieChemin3(obj.tabAbs);
       obj.tabAbs=simplifieChemin4(obj.tabAbs);
      }
     }
     

     var tt='';
     for(var i=0;i<obj.tabAbs.length;i++){
      tt+=obj.tabAbs[i][0] + ' ';
      for(var j=1;j<obj.tabAbs[i].length;j++){
       tt+=' '+arrdi10000(obj.tabAbs[i][j]);
      }
      tt+='   ';
     }

     globalClickDessin.tempchild.setAttribute('d' , tt );
     ajouteEntreeArbre('path',null);
     
    }else if(_dssvg.mode_en_cours==='setModeSaisieDeplace1'){
     
     _dssvg.viewBoxInit=refZnDessin.getAttribute('viewBox').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
     
    }else if('setModeSaisieSelElt1'===_dssvg.mode_en_cours || 'setModeSaisieDefsElt1'===_dssvg.mode_en_cours ){
     
     removeListeners();
     
    }else if('setModeSaisieEditionPoin1'===_dssvg.mode_en_cours || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ){
     
     removeListeners();
     if(globalGeneralSvgReferenceElement){
      if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='path'){
       var tt=globalGeneralSvgReferenceElement.getAttribute('d');
       var obj=getPointsFromSvgPath(tt);
       globalSelectionPoints.tabOriginal=obj.tabOri;
       globalSelectionPoints.tabAbsolu=obj.tabAbs;
      }
     }
     
     
     
    }else if('setModeSaisieTranE1'===_dssvg.mode_en_cours || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours ){

     removeListeners();
     // todo, à virer ???
     if(globalGeneralSvgReferenceElement && ( ecran_appuye==='fElementTransformTranslate1' )){
      try{
       var matrice=globalGeneralSvgReferenceElement.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.parentNode.getScreenCTM()).inverse();
       var obj=matrixToFnt(matrice);
       globalGeneralSvgReferenceElement.setAttribute('transform',obj.transform2);
       _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=obj.transform2;
      }catch(e){}
     }
     
     
    }else if('setModeSaisieGroupe1'===_dssvg.mode_en_cours || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
     
     removeListeners();
     // todo, à virer ??
     if(globalGeneralSvgReferenceElement && ( ecran_appuye==='fElementTransformTranslate1' ) ){
      var matrice=globalGeneralSvgReferenceElement.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.parentNode.getScreenCTM()).inverse();
      var obj=matrixToFnt(matrice);
      globalGeneralSvgReferenceElement.setAttribute('transform',obj.transform2);
      _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=obj.transform2;
     }
     
    }
    afficheArbre0({prendreTout:false});
    
   }
   ecran_appuye=false;
  }
  enCoursDeSelectionSansClickSurElement=false;
 }
 //========================================================================================================
 function touchDownParScrollSize(e){
  e.stopPropagation();
  actionDownParScrollSize(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParScrollSize(e){
  e.stopPropagation();
  actionDownParScrollSize();
 }
 //========================================================================================================
 function actionDownParScrollSize(e){
  dogid('parLargeurScrollSize').addEventListener('touchmove' , changeScrollSize , 'range');
  dogid('parLargeurScrollSize').addEventListener('mousemove' , changeScrollSize , 'range');
  dogid('parLargeurScrollSize').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parLargeurScrollSize').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeScrollSize(e){
  e.stopPropagation();
  dogid('parLargeurScrollValeur').innerHTML=dogid('parLargeurScrollSize').value;
 }
 //========================================================================================================
 function setParScrollSize(){
  _dssvg.parametres.scroll_size=parseInt(dogid('parLargeurScrollSize').value,10);
  he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
  wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
  globalScrollWidth1=_dssvg.parametres.scroll_size;
  redrawCss();
  resize1();
  getScrollWidth();
  if(globalScrollWidth1!==_dssvg.parametres.scroll_size){
//   alert(globalScrollWidth1); 8 en dur dans firefox
   _dssvg.parametres.scroll_size=parseInt(dogid('parLargeurScrollSize').value,10);
   he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
   wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
   redrawCss();
   resize1();
  }
  saveStte();
 }


 //========================================================================================================
 function touchDownParRayonReference(e){
  e.stopPropagation();
  actionDownParRayonReference(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParRayonReference(e){
  e.stopPropagation();
  actionDownParRayonReference();
 }
 //========================================================================================================
 function actionDownParRayonReference(e){
  dogid('parRayonReference').addEventListener('touchmove' , changeRayonReference , 'range');
  dogid('parRayonReference').addEventListener('mousemove' , changeRayonReference , 'range');
  dogid('parRayonReference').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parRayonReference').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeRayonReference(e){
  e.stopPropagation();
  dogid('parRayonReferenceValeur').innerHTML=dogid('parRayonReference').value;
 }
 //========================================================================================================
 function setParRayonReference(){
  _dssvg.parametres.rayonReference=parseInt(dogid('parRayonReference').value,10);
  rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
  strkWiTexteSousPoignees=rayonPoint/20;
  fontSiTexteSousPoignees=rayonPoint;
  saveStte();
  afficheArbre0({init:false});
 }
 
 
 

 //========================================================================================================
 function touchDownParHauteurMinBtnMenuGau(e){
  e.stopPropagation();
  actionDownParHauteurMinBtnMenuGau(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParHauteurMinBtnMenuGau(e){
  e.stopPropagation();
  actionDownParHauteurMinBtnMenuGau();
 }
 //========================================================================================================
 function actionDownParHauteurMinBtnMenuGau(e){
  dogid('parHauteurMinBtnMenuGau').addEventListener('touchmove' , changeHauteurMinBtnMenuGau , 'range');
  dogid('parHauteurMinBtnMenuGau').addEventListener('mousemove' , changeHauteurMinBtnMenuGau , 'range');
  dogid('parHauteurMinBtnMenuGau').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parHauteurMinBtnMenuGau').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeHauteurMinBtnMenuGau(e){
  e.stopPropagation();
  dogid('parHauteurMinBtnMenuGauValeur').innerHTML=dogid('parHauteurMinBtnMenuGau').value;
 }
 //========================================================================================================
 function setParHauteurMinBtnMenuGau(){
  _dssvg.parametres.hauteurMinBtnMenuGau=parseInt(dogid('parHauteurMinBtnMenuGau').value,10);
  redrawCss();
  saveStte();
 }
 
 //========================================================================================================
 function touchDownParLargeurMinBtnMenuHau(e){
  e.stopPropagation();
  actionDownParLargeurMinBtnMenuHau(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParLargeurMinBtnMenuHau(e){
  e.stopPropagation();
  actionDownParLargeurMinBtnMenuHau();
 }
 //========================================================================================================
 function actionDownParLargeurMinBtnMenuHau(e){
  dogid('parLargeurMinBtnMenuHau').addEventListener('touchmove' , changeLargeurMinBtnMenuHau , 'range');
  dogid('parLargeurMinBtnMenuHau').addEventListener('mousemove' , changeLargeurMinBtnMenuHau , 'range');
  dogid('parLargeurMinBtnMenuHau').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parLargeurMinBtnMenuHau').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeLargeurMinBtnMenuHau(e){
  e.stopPropagation();
  dogid('parLargeurMinBtnMenuHauValeur').innerHTML=dogid('parLargeurMinBtnMenuHau').value;
 }
 //========================================================================================================
 function setParLargeurMinBtnMenuHau(){
  _dssvg.parametres.largeurMinBtnMenuHau=parseInt(dogid('parLargeurMinBtnMenuHau').value,10);
  redrawCss();
  saveStte();
 }
 
 
 
 
 
 
 

 //========================================================================================================
 function touchDownParOptimisationChemin(e){
  e.stopPropagation();
  actionDownParOptimisationChemin(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParOptimisationChemin(e){
  e.stopPropagation();
  actionDownParOptimisationChemin();
 }
 //========================================================================================================
 function actionDownParOptimisationChemin(e){
  dogid('parOptimisationChemin').addEventListener('touchmove' , changeOptimisationChemin , 'range');
  dogid('parOptimisationChemin').addEventListener('mousemove' , changeOptimisationChemin , 'range');
  dogid('parOptimisationChemin').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parOptimisationChemin').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeOptimisationChemin(e){
  e.stopPropagation();
  dogid('parOptimisationCheminValeur').innerHTML=dogid('parOptimisationChemin').value;
 }
 //========================================================================================================
 function setParOptimisationChemin(){
  _dssvg.parametres.optimisationChemin=parseInt(dogid('parOptimisationChemin').value,10);
  saveStte();
 }
 
 
 

 //========================================================================================================
 function touchDownParLargeurMenuGauche(e){
  e.stopPropagation();
  actionDownParLargeurMenuGauche(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParLargeurMenuGauche(e){
  e.stopPropagation();
  actionDownParLargeurMenuGauche();
 }
 //========================================================================================================
 function actionDownParLargeurMenuGauche(e){
  dogid('parLargeurMenuGauche').addEventListener('touchmove' , changeLargeurMenuGauche , 'range');
  dogid('parLargeurMenuGauche').addEventListener('mousemove' , changeLargeurMenuGauche , 'range');
  dogid('parLargeurMenuGauche').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parLargeurMenuGauche').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeLargeurMenuGauche(e){
  e.stopPropagation();
  dogid('parLargeurMenuGaucheValeur').innerHTML=dogid('parLargeurMenuGauche').value;
 }
 //========================================================================================================
 function setParLargeurMenuGauche(){
  _dssvg.parametres.largeurMenuGauche=parseInt(dogid('parLargeurMenuGauche').value,10);
  redrawCss();
  resize1();
  
  saveStte();
 }
 

 
 

 //========================================================================================================
 function touchDownParHauteurMenuHaut(e){
  e.stopPropagation();
  actionDownParHauteurMenuHaut(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParHauteurMenuHaut(e){
  e.stopPropagation();
  actionDownParHauteurMenuHaut();
 }
 //========================================================================================================
 function actionDownParHauteurMenuHaut(e){
  dogid('parHauteurMenuHaut').addEventListener('touchmove' , changeHauteurMenuHaut , 'range');
  dogid('parHauteurMenuHaut').addEventListener('mousemove' , changeHauteurMenuHaut , 'range');
  dogid('parHauteurMenuHaut').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parHauteurMenuHaut').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeHauteurMenuHaut(e){
  e.stopPropagation();
  dogid('parHauteurMenuHautValeur').innerHTML=dogid('parHauteurMenuHaut').value;
 }
 //========================================================================================================
 function setParHauteurMenuHaut(){
  _dssvg.parametres.hauteurMenuHaut=parseInt(dogid('parHauteurMenuHaut').value,10);
  redrawCss();
  resize1();
  
  saveStte();
 }
 
 

 //========================================================================================================
 function touchDownParTaillePolice(e){
  e.stopPropagation();
  actionDownParTaillePolice(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParTaillePolice(e){
  e.stopPropagation();
  actionDownParTaillePolice();
 }
 //========================================================================================================
 function actionDownParTaillePolice(e){
  dogid('parTaillePolice').addEventListener('touchmove' , changeTaillePolice , 'range');
  dogid('parTaillePolice').addEventListener('mousemove' , changeTaillePolice , 'range');
  dogid('parTaillePolice').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parTaillePolice').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeTaillePolice(e){
  e.stopPropagation();
  dogid('parTaillePoliceValeur').innerHTML=dogid('parTaillePolice').value;
 }
 //========================================================================================================
 function setParTaillePolice(){
  _dssvg.parametres.taillePolice=parseInt(dogid('parTaillePolice').value,10);
  redrawCss();
  resize1();
  
  saveStte();
 }
 
 

 //========================================================================================================
 function touchDownParIntervalleEntreBtns(e){
  e.stopPropagation();
  actionDownParIntervalleEntreBtns(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParIntervalleEntreBtns(e){
  e.stopPropagation();
  actionDownParIntervalleEntreBtns();
 }
 //========================================================================================================
 function actionDownParIntervalleEntreBtns(e){
  dogid('parIntervalleEntreBtns').addEventListener('touchmove' , changeIntervalleEntreBtns , 'range');
  dogid('parIntervalleEntreBtns').addEventListener('mousemove' , changeIntervalleEntreBtns , 'range');
  dogid('parIntervalleEntreBtns').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parIntervalleEntreBtns').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeIntervalleEntreBtns(e){
  e.stopPropagation();
  dogid('parIntervalleEntreBtnsValeur').innerHTML=dogid('parIntervalleEntreBtns').value;
 }
 //========================================================================================================
 function setParIntervalleEntreBtns(){
  _dssvg.parametres.intervalleEntreBtns=parseInt(dogid('parIntervalleEntreBtns').value,10);
  redrawCss();
  resize1();
  
  saveStte();
 }
 

 //========================================================================================================
 function touchDownParDiviseurDeplacement(e){
  e.stopPropagation();
  actionDownParDiviseurDeplacement(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParDiviseurDeplacement(e){
  e.stopPropagation();
  actionDownParDiviseurDeplacement();
 }
 //========================================================================================================
 function actionDownParDiviseurDeplacement(e){
  dogid('parDiviseurDeplacement').addEventListener('touchmove' , changeDiviseurDeplacement , 'range');
  dogid('parDiviseurDeplacement').addEventListener('mousemove' , changeDiviseurDeplacement , 'range');
  dogid('parDiviseurDeplacement').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parDiviseurDeplacement').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeDiviseurDeplacement(e){
  e.stopPropagation();
  dogid('parDiviseurDeplacementValeur').innerHTML=dogid('parDiviseurDeplacement').value;
 }
 //========================================================================================================
 function setParDiviseurDeplacement(){
  _dssvg.parametres.diviseurDeplacement=parseInt(dogid('parDiviseurDeplacement').value,10);
  saveStte();
 }


 
 //========================================================================================================
 function touchDownParDiviseurDeChemin(e){
  e.stopPropagation();
  actionDownParDiviseurDeChemin(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParDiviseurDeChemin(e){
  e.stopPropagation();
  actionDownParDiviseurDeChemin();
 }
 //========================================================================================================
 function actionDownParDiviseurDeChemin(e){
  dogid('parDiviseurDeChemin').addEventListener('touchmove' , changeDiviseurDeChemin , 'range');
  dogid('parDiviseurDeChemin').addEventListener('mousemove' , changeDiviseurDeChemin , 'range');
  dogid('parDiviseurDeChemin').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parDiviseurDeChemin').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeDiviseurDeChemin(e){
  e.stopPropagation();
  dogid('parDiviseurDeCheminValeur').innerHTML=dogid('parDiviseurDeChemin').value;
 }
 //========================================================================================================
 function setParDiviseurDeChemin(){
  _dssvg.parametres.diviseurDeChemin=parseInt(dogid('parDiviseurDeChemin').value,10);
  saveStte();
 }


 
 //========================================================================================================
 function touchDownParFacteurAimnt(e){
  e.stopPropagation();
  actionDownParFacteurAimnt(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownParFacteurAimnt(e){
  e.stopPropagation();
  actionDownParFacteurAimnt();
 }
 //========================================================================================================
 function actionDownParFacteurAimnt(e){
  dogid('parFacteurAimnt').addEventListener('touchmove' , changeFacteurAimnt , 'range');
  dogid('parFacteurAimnt').addEventListener('mousemove' , changeFacteurAimnt , 'range');
  dogid('parFacteurAimnt').addEventListener('touchend'  , finTouchParam , 'range');
  dogid('parFacteurAimnt').addEventListener('mouseup'   , finMouseParam , 'range');
 }
 //========================================================================================================
 function changeFacteurAimnt(e){
  e.stopPropagation();
  dogid('parFacteurAimntValeur').innerHTML=dogid('parFacteurAimnt').value;
 }
 //========================================================================================================
 function setParFacteurAimnt(){
  _dssvg.parametres.facteurAimnt=parseInt(dogid('parFacteurAimnt').value,10);
  _dssvg.aimanterPixel1=_dssvg.parametres.facteurAimnt;

  saveStte();
 }
 //========================================================================================================
 function autresKoolsols(){
  var t='';
  t+='<hr />'
  t+='<fieldset>';
  t+='<legend>koolsol ;-)</legend>';
  
  t+='<div style="text-align:center;justify-content: center;display:flex;flex-wrap: wrap;" >';

  t+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://www.koolsol.com/">';
  t+='<svg class="" style="width: 100px; height: 25px;  margin: 0 5px;" viewBox="-7.2653 -1  59.286 15.75"><path d="M 14.5 2.75 C 12.25 -0.75 8 -0.5 8 4 C 8 8.75 12.25 11 14.5 13.5 C 16.5 11 20.75 8.75 20.75 4 C 20.75 -0.5 16.5 -0.75 14.5 2.75 " stroke="rgb(255, 0, 0)" stroke-width="1" fill="red" stroke-linejoin="round" stroke-linecap="round" transform=""></path><path d="M 28.5 0 C 26.25 2.25 24.25 4.25 22 6.5 C 24.25 8.75 26.25 10.75 28.5 13 C 30.75 10.75 32.75 8.75 35 6.5 C 32.75 4.25 30.75 2.25 28.5 0 " stroke="rgb(255, 0, 0)" stroke-width="1" fill="red" stroke-linejoin="round" stroke-linecap="round" transform=""></path><path d=" M 0 0 C -2.25 3 -7.5 6.25 -6 9  C -5 10.75 -2.25 9.75 -0.25 8.5 C -1 10 -1 10 -2.5 13.5 C -1.25 13.5 1.25 13.5 2.5 13.5 C 1 10 1 10 0.25 8.5 C 2.5 9.75 5 10.75 6 9 C 7.5 6.25 2.25 3 0 0" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:black;stroke-width:1;"></path><path d="M 44.5 0 C 41 0 40.25 3.5 44.5 6.5 C 40.25 5.5 37 5 38.25 8.75 C 39.5 12 42.25 10 44.5 6.5 C 43.5 10.25 43.5 10.25 42 13.75 C 43.25 13.75 45.75 13.75 47 13.75 C 45.5 10.25 45.5 10.25 44.5 6.5 C 47 10 49.5 12 50.75 8.75 C 52 5 48.75 5.5 44.5 6.5 C 48.75 3.5 48 0 44.5 0 " stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:black;stroke-width:1;"></path></svg>';
  t+='solitaire';
  t+='</a>'; // 
  

  t+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://memory.koolsol.app/">';
  t+='<svg class="" style="width: 25px; height: 25px;  margin: 0 5px;" viewBox="10.25 2.4375  10.5101 9.021"><path d=" M 19.5 7.25  C 18.5 6 17.75 6.25 16.75 6.25" stroke="rgb(0, 0, 0)" stroke-width="0.5" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:mediumvioletred;fill:transparent;stroke-width:0.5;"></path><path d="M 18.25 6.25 C 17.75 6 17.75 5.5 17.5 5.25 " stroke="rgb(0, 0, 0)" stroke-width="0.5" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:mediumvioletred;fill:transparent;stroke-width:0.5;"></path><path d=" M 18 7.75 C 16.75 7.75 16.25 9.25 15 9.75 " stroke="rgb(0, 0, 0)" stroke-width="0.5" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:mediumvioletred;fill:transparent;stroke-width:0.5;"></path><path d=" M 14.25 6.75 C 14.5 6.5 15 6.25 15.5 6.5 " stroke="rgb(0, 0, 0)" stroke-width="0.5" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:hotpink;fill:transparent;stroke-width:0.5;"></path><path d=" M 13.5 9  C 14.5 8.25 14.5 6.5 13.5 6" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:mediumvioletred;fill:transparent;stroke-width:0.5;"></path><path d="M 16 3.75 C 15.5 4 15.25 4.5 15 5 " stroke="rgb(0, 0, 0)" stroke-width="0.5" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:mediumvioletred;fill:transparent;stroke-width:0.5;"></path><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" d="M 12 5.25 C 12 4.25 13 4 13.75 4 c 0.75 -0.75 1.75 -0.75 2.5 0 c 1 -0.5 2.25 0 2.75 1 c 0.75 0.75 1 1.5 0.5 2.25 c 0 0.5 0.25 1.25 -0.5 1.75 c -0.75 1.5 -2.5 2 -4 0.75 c -0.5 0 -1 -0.25 -1.25 -0.5 c -0.5 0 -0.75 0 -1.25 0 c -0.5 0 -1.25 -0.75 -1.25 -1.25 c 0 -0.5 0 -1 0 -1.25 c 0 -0.5 0.5 -0.75 0.75 -1 z " style="stroke:red;fill:pink;stroke-width:0.5;stroke-opacity:1;fill-opacity:0.8;"></path></svg>';
  t+='memory';
  t+='</a>'; // 
  
  
  t+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://memory.koolsol.app/">';
  t+='<svg class="" style="width: 25px; height: 25px;  margin: 0 5px;" viewBox="-1 -1  11 11"><g fill="lightblue " stroke="blue" stroke-width="0.2"><rect x="0" y="0" width="3" height="3"></rect><rect x="3" y="0" width="3" height="3"></rect><rect x="6" y="0" width="3" height="3"></rect><rect x="0" y="3" width="3" height="3"></rect><rect x="3" y="3" width="3" height="3"></rect><rect x="6" y="3" width="3" height="3"></rect><rect x="0" y="6" width="3" height="3"></rect><rect x="3" y="6" width="3" height="3"></rect><rect x="6" y="6" width="3" height="3"></rect></g><g stroke="blue" stroke-width="0.1"><line x1="1" y1="0" x2="1" y2="9"></line><line x1="2" y1="0" x2="2" y2="9"></line><line x1="4" y1="0" x2="4" y2="9"></line><line x1="5" y1="0" x2="5" y2="9"></line><line x1="7" y1="0" x2="7" y2="9"></line><line x1="8" y1="0" x2="8" y2="9"></line><line x1="0" y1="1" x2="9" y2="1"></line><line x1="0" y1="2" x2="9" y2="2"></line><line x1="0" y1="4" x2="9" y2="4"></line><line x1="0" y1="5" x2="9" y2="5"></line><line x1="0" y1="7" x2="9" y2="7"></line><line x1="0" y1="8" x2="9" y2="8"></line></g><circle cx="0.5" cy="0.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:blue;fill:blue;stroke-width:0.1;"></circle><circle cx="4.5" cy="2.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:blue;fill:blue;stroke-width:0.1;"></circle><circle cx="8.5" cy="1.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:blue;fill:blue;stroke-width:0.1;"></circle><circle cx="7.5" cy="3.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:blue;fill:blue;stroke-width:0.1;"></circle><circle cx="6.5" cy="8.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:blue;fill:blue;stroke-width:0.1;"></circle><circle cx="5.5" cy="4.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:blue;fill:blue;stroke-width:0.1;"></circle><circle cx="1.5" cy="5.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:blue;fill:blue;stroke-width:0.1;"></circle><circle cx="2.5" cy="6.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:blue;fill:blue;stroke-width:0.1;"></circle><circle cx="3.5" cy="7.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:blue;fill:blue;stroke-width:0.1;"></circle><circle cx="0.5" cy="2.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:crimson;fill:crimson;stroke-width:0.1;"></circle><circle cx="3.5" cy="1.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:crimson;fill:crimson;stroke-width:0.1;"></circle><circle cx="6.5" cy="0.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:crimson;fill:crimson;stroke-width:0.1;"></circle><circle cx="7.5" cy="4.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:crimson;fill:crimson;stroke-width:0.1;"></circle><circle cx="8.5" cy="7.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:crimson;fill:crimson;stroke-width:0.1;"></circle><circle cx="5.5" cy="6.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:crimson;fill:crimson;stroke-width:0.1;"></circle><circle cx="4.5" cy="5.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:crimson;fill:crimson;stroke-width:0.1;"></circle><circle cx="1.5" cy="3.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:crimson;fill:crimson;stroke-width:0.1;"></circle><circle cx="2.5" cy="8.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:crimson;fill:crimson;stroke-width:0.1;"></circle><circle cx="2.5" cy="1.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:forestgreen;fill:forestgreen;stroke-width:0.1;"></circle><circle cx="5.5" cy="0.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:forestgreen;fill:forestgreen;stroke-width:0.1;"></circle><circle cx="6.5" cy="2.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:forestgreen;fill:forestgreen;stroke-width:0.1;"></circle><circle cx="8.5" cy="5.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:forestgreen;fill:forestgreen;stroke-width:0.1;"></circle><circle cx="7.5" cy="6.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:forestgreen;fill:forestgreen;stroke-width:0.1;"></circle><circle cx="3.5" cy="3.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:forestgreen;fill:forestgreen;stroke-width:0.1;"></circle><circle cx="4.5" cy="8.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:forestgreen;fill:forestgreen;stroke-width:0.1;"></circle><circle cx="0.5" cy="4.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:forestgreen;fill:forestgreen;stroke-width:0.1;"></circle><circle cx="1.5" cy="7.5" r="0.1875" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" style="stroke:forestgreen;fill:forestgreen;stroke-width:0.1;"></circle></svg>  ';
  t+='sudoku';
  t+='</a>'; // 
  
  
  t+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://minesweeper.koolsol.app/">';
  t+='<svg class="" style="width: 25px; height: 25px;  margin: 0 5px;" viewBox="-1 -1.2604  20 20.507"><g fill="white" stroke="green" stroke-width="0.3" transform=""><rect x="0" y="0" width="3" height="3"></rect><rect x="3" y="0" width="3" height="3"></rect><rect x="6" y="0" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="9" y="0" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="12" y="0" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="15" y="0" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="12" y="3" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="15" y="3" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="12" y="6" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="15" y="6" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="12" y="9" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="15" y="9" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="9" y="12" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="12" y="12" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="15" y="12" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="9" y="15" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="12" y="15" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="15" y="15" width="3" height="3" style="fill:dodgerblue;"></rect></g><g fill="white" stroke="green" stroke-width="0.3" transform="   "><rect x="0" y="3" width="3" height="3"></rect><rect x="3" y="3" width="3" height="3"></rect><rect x="6" y="3" width="3" height="3"></rect><rect x="9" y="3" width="3" height="3"></rect></g><g fill="white" stroke="green" stroke-width="0.3" transform="   "><rect x="0" y="6" width="3" height="3"></rect><rect x="3" y="6" width="3" height="3"></rect><rect x="6" y="6" width="3" height="3"></rect><rect x="9" y="6" width="3" height="3"></rect></g><g fill="white" stroke="green" stroke-width="0.3" transform="   "><rect x="0" y="9" width="3" height="3" style="fill:dodgerblue;"></rect><rect x="3" y="9" width="3" height="3"></rect><rect x="6" y="9" width="3" height="3"></rect><rect x="9" y="9" width="3" height="3"></rect></g><g fill="white" stroke="green" stroke-width="0.3" transform="   "><rect x="0" y="12" width="3" height="3"></rect><rect x="3" y="12" width="3" height="3"></rect><rect x="6" y="12" width="3" height="3"></rect></g><g fill="white" stroke="green" stroke-width="0.3" transform="   "><rect x="0" y="15" width="3" height="3"></rect><rect x="3" y="15" width="3" height="3"></rect><rect x="6" y="15" width="3" height="3"></rect></g><text x="0.75" y="8.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="3.75" y="8.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="3.75" y="5.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="3.75" y="2.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="3.75" y="11.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="3.75" y="14.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="0.75" y="14.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="6.75" y="5.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="9.75" y="5.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">2</text><text x="9.75" y="8.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="9.75" y="11.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">2</text><text x="6.75" y="11.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="6.75" y="14.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text><text x="6.75" y="17.5" style="font-size:3;stroke-width:0.12;stroke:black;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;opacity:1;">1</text></svg>';
  t+='minesweeper';
  t+='</a>'; // 

  t+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://todo.koolsol.app/">';
  t+='<svg class="" style="width: 25px; height: 25px;  margin: 0 5px;" viewBox="1 1  19 19"><rect x="2" y="2" width="17" height="17" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:lime;stroke-width:1;"></rect><path d=" M 6 10 C 6 10 8 14 10 14 C 10 10 16 6 16 6 " stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:white;fill:transparent;stroke-width:2;"></path></svg>';
  t+='todo';
  t+='</a>'; // 
  
  
  t+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://syllabes.koolsol.app/">';
  t+='<svg class="" style="width: 80px; height: 25px;  margin: 0 5px;" viewBox="-2 -12  63 19"><text x="0" y="1" style="font-size:12;stroke-width:0.35;stroke:blue;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;">syl</text><text x="40" y="1" style="font-size:12;stroke-width:0.35;stroke:blue;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;">bes</text><text x="23" y="1" style="font-size:12;stroke-width:0.35;stroke:blue;fill:blue;font-family:monospace;stroke-opacity:1;fill-opacity:1;">la</text><rect x="-1" y="-11" width="21" height="17" stroke="rgb(0, 0, 0)" stroke-width="0.5" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:transparent;stroke-width:1;"></rect><rect x="22" y="-11" width="15" height="17" stroke="rgb(0, 0, 0)" stroke-width="0.5" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:transparent;stroke-width:1;"></rect><rect x="39" y="-11" width="21" height="17" stroke="rgb(0, 0, 0)" stroke-width="0.5" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:transparent;stroke-width:1;"></rect></svg>';
  t+='</a>'; // 
  

  t+='</div>';
  t+='</fieldset>';
  return t;
 }  
 //========================================================================================================
 function popupParametres1(){
  var contentOfPopup='<h3>'+trad['gerpar']+'</h3>';
  
  
  contentOfPopup+='<style>'
  contentOfPopup+='fieldset{border:1px blue outset;margin:20px 3px 0px 3px;padding-bottom: 14px;}'
  contentOfPopup+='fieldset>div{border:1px red outset;margin:10px 3px 3px 3px;}'
  contentOfPopup+='fieldset>legend{border:1px blue outset;font-size:1.1em;margin:10px auto 10px auto;padding:3px;border-radius:4px;text-align: center;}'
  contentOfPopup+='</style>'

  contentOfPopup+='<fieldset>';
  
    contentOfPopup+='<legend>interface</legend>';
  
    contentOfPopup+='<div>';
     contentOfPopup+='<div id="parLargeurMenuGaucheValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.largeurMenuGauche+'</div>';
     contentOfPopup+='<label for="parLargeurMenuGauche"> : '+trad['Largeur_du_menu_gauche']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parLargeurMenuGauche" type="range" min="30" max="44" step="2" value="'+_dssvg.parametres.largeurMenuGauche+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';
    
    contentOfPopup+='<div>';
     contentOfPopup+='<div id="parHauteurMinBtnMenuGauValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.hauteurMinBtnMenuGau+'</div>';
     contentOfPopup+='<label for="parHauteurMinBtnMenuGau"> : '+trad['Hauteur_minimal_des_boutons_à_gauche']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parHauteurMinBtnMenuGau" type="range" min="20" max="36" step="4" value="'+_dssvg.parametres.hauteurMinBtnMenuGau+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';
    
    contentOfPopup+='<div>';
     contentOfPopup+='<div id="parHauteurMenuHautValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.hauteurMenuHaut+'</div>';
     contentOfPopup+='<label for="parHauteurMenuHaut"> : '+trad['Hauteur_du_menu_haut']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parHauteurMenuHaut" type="range" min="30" max="44" step="2" value="'+_dssvg.parametres.hauteurMenuHaut+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';

    contentOfPopup+='<div>';
     contentOfPopup+='<div id="parLargeurMinBtnMenuHauValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.largeurMinBtnMenuHau+'</div>';
     contentOfPopup+='<label for="parLargeurMinBtnMenuHau"> : '+trad['Largeur_minimal_des_boutons_en_haut']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parLargeurMinBtnMenuHau" type="range" min="20" max="36" step="4" value="'+_dssvg.parametres.largeurMinBtnMenuHau+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';

    contentOfPopup+='<div >';
     contentOfPopup+='<div id="parIntervalleEntreBtnsValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.intervalleEntreBtns+'</div>';
     contentOfPopup+='<label for="parIntervalleEntreBtns"> : '+trad['Intervalles_entre_les_boutons']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parIntervalleEntreBtns" type="range" min="0" max="20" step="2" value="'+_dssvg.parametres.intervalleEntreBtns+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';
    
    contentOfPopup+='<div >';
     contentOfPopup+='<div id="parLargeurScrollValeur" style="display:inline-block;min-width:2rem;">'+(Math.round(_dssvg.parametres.scroll_size/5)*5)+'</div>';
     contentOfPopup+='<label for="parLargeurScrollSize"> : '+trad['Largeur_du_scroll']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parLargeurScrollSize" type="range" min="0" max="20" step="5" value="'+(Math.round(_dssvg.parametres.scroll_size/5)*5)+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';
    
    contentOfPopup+='<div >';
     contentOfPopup+='<div id="parRayonReferenceValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.rayonReference+'</div>';
     contentOfPopup+='<label for="parRayonReference"> : '+trad['Rayon_des_poignées']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parRayonReference" type="range" min="10" max="30" step="2" value="'+_dssvg.parametres.rayonReference+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';

    contentOfPopup+='<div >';
     contentOfPopup+='<div id="parTaillePoliceValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.taillePolice+'</div>';
     contentOfPopup+='<label for="parTaillePolice"> : '+trad['Taille_des_textes']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parTaillePolice" type="range" min="14" max="24" step="2" value="'+_dssvg.parametres.taillePolice+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';
    
    
  contentOfPopup+='</fieldset>';
  
  contentOfPopup+='<fieldset>';
  
    contentOfPopup+='<legend>'+trad['Utilisation']+'</legend>';
  
    contentOfPopup+='<div >';
     contentOfPopup+='<div id="parOptimisationCheminValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.optimisationChemin+'</div>';
     contentOfPopup+='<label for="parOptimisationChemin"> : '+trad['Optimisation_des_tracés_chemin']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parOptimisationChemin" type="range" min="0" max="2" step="1" value="'+_dssvg.parametres.optimisationChemin+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';
    
    contentOfPopup+='<div >';
     contentOfPopup+='<div id="parDiviseurDeplacementValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.diviseurDeplacement+'</div>';
     contentOfPopup+='<label for="parDiviseurDeplacement"> : '+trad['Diviseur_de_déplacement']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parDiviseurDeplacement" type="range" min="1" max="5" step="1" value="'+_dssvg.parametres.diviseurDeplacement+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';
    
    
    contentOfPopup+='<div >';
     contentOfPopup+='<div id="parFacteurAimntValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.facteurAimnt+'</div>';
     contentOfPopup+='<label for="parFacteurAimnt"> : '+trad['Diviseur_de_pixel']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parFacteurAimnt" type="range" min="1" max="32" step="1" value="'+_dssvg.parametres.facteurAimnt+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';

    contentOfPopup+='<div >';
     contentOfPopup+='<div id="parDiviseurDeCheminValeur" style="display:inline-block;min-width:2rem;">'+_dssvg.parametres.diviseurDeChemin+'</div>';
     contentOfPopup+='<label for="parDiviseurDeChemin"> : '+trad['diviseur_de_chemin']+'</label>';
     contentOfPopup+='<div>';
      contentOfPopup+='<input id="parDiviseurDeChemin" type="range" min="2" max="100" step="1" value="'+_dssvg.parametres.diviseurDeChemin+'" style="width:80%;min-width:200px;max-width:500px;user-select:auto;" />';
     contentOfPopup+='</div>';
    contentOfPopup+='</div>';
    
    

    contentOfPopup+='<div  style="text-align:center;">';
     contentOfPopup+='<button type="button" class="butEnabled butMenuHaut" id="francais">Français</button>';
     contentOfPopup+='&nbsp;';
     contentOfPopup+='<button class="butEnabled butMenuHaut" type="button"  id="english">English</button>';
    contentOfPopup+='</div>';

  contentOfPopup+='</fieldset>';
    

  contentOfPopup+='<fieldset>';
  
    contentOfPopup+='<legend>'+trad['liens_divers']+'</legend>';
  
    contentOfPopup+='<div style="text-align:center;justify-content: center;display:flex;flex-wrap: wrap;" >';
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" style="padding:5px;" href="https://jakearchibald.github.io/svgomg/">svgomg</a>';
    contentOfPopup+='</div>';

    contentOfPopup+='<div style="text-align:center;justify-content: center;display:flex;flex-wrap: wrap;" >';
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://svgco.de/">svgcode</a>';
    contentOfPopup+='</div>';

    contentOfPopup+='<div style="text-align:center;justify-content: center;display:flex;flex-wrap: wrap;" >';
    
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://pattern.monster/">patern monster</a>';
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://yqnn.github.io/svg-path-editor/">path editor</a>';
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://svgsilh.com/">svgsilh.com</a>';
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://www.svgrepo.com/">svgrepo.com</a>';
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://freesvg.org/">freesvg.org</a>';
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://github.com/microsoft/fluentui-emoji/tree/main/assets">microsoft emoji</a>';
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://danmarshall.github.io/google-font-to-svg-path/">font to svg</a>';
    
    
    contentOfPopup+='</div>';

    contentOfPopup+='<div style="text-align:center;justify-content: center;display:flex;flex-wrap: wrap;" >';
    contentOfPopup+='<a class="butEnabled butMenuHaut lienExt1" target="_blank" href="https://github.com/hugues-koolsol/my-public/tree/master/svg">';
    contentOfPopup+='<svg class="svgBoutonGauche1" style="width: 25px; height: 25px;  margin: 0 5px;" viewBox="0 0  16 15.6053"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>';
    contentOfPopup+='github src';
    contentOfPopup+='</a>'; // 
    contentOfPopup+='</div>';

  contentOfPopup+='</fieldset>';

    
    
  
  contentOfPopup+='<fieldset>';
    contentOfPopup+='<legend>'+trad['Réinitialiser_le_programme_et_recharger_la_page']+'</legend>';
    
    contentOfPopup+='<div style="text-align:center;padding:15px;margin-top:20px">';
    contentOfPopup+='<button  type="button" class="butEnabled butMenuHaut bckRouge" id="suppVraimentToutToutTout" >'+trad['Réinitialiser']+'</button>';
    contentOfPopup+='</div>';
  
  contentOfPopup+='</fieldset>';
  
  
  contentOfPopup+=autresKoolsols();
  
  contentOfPopup+='<br /><hr /><br /><span style="font-size: 0.8em;display: block;margin: 0 auto;text-align: center;">Version : '+global_version_number+'</span>';
  
  
  popupValue.innerHTML=contentOfPopup;
  
  
  
  showPopUp('popupParametres1');  
  ajouteListenersParam();
 }
 //========================================================================================================
 function setFrancais(){
  _dssvg.parametres['lang']='fr';
  saveStte();
  document.location=String(document.location);
 }
 //========================================================================================================
 function setEnglish(){
  _dssvg.parametres['lang']='en';
  saveStte();
  document.location=String(document.location);
 }
 //========================================================================================================
 function ajouteListenersParam(){

  dogid('parLargeurScrollSize').addEventListener('change'         , setParScrollSize                 , 'range' );
  dogid('parLargeurScrollSize').addEventListener('mousedown'      , mouseDownParScrollSize           , 'range' );
  dogid('parLargeurScrollSize').addEventListener('touchstart'     , touchDownParScrollSize           , 'range' );
  
  dogid('parRayonReference').addEventListener('change'            , setParRayonReference             , 'range' );
  dogid('parRayonReference').addEventListener('mousedown'         , mouseDownParRayonReference       , 'range' );
  dogid('parRayonReference').addEventListener('touchstart'        , touchDownParRayonReference       , 'range' );
  
  dogid('parHauteurMinBtnMenuGau').addEventListener('change'      , setParHauteurMinBtnMenuGau       , 'range' );
  dogid('parHauteurMinBtnMenuGau').addEventListener('mousedown'   , mouseDownParHauteurMinBtnMenuGau , 'range' );
  dogid('parHauteurMinBtnMenuGau').addEventListener('touchstart'  , touchDownParHauteurMinBtnMenuGau , 'range' );
  
  dogid('parLargeurMinBtnMenuHau').addEventListener('change'      , setParLargeurMinBtnMenuHau       , 'range' );
  dogid('parLargeurMinBtnMenuHau').addEventListener('mousedown'   , mouseDownParLargeurMinBtnMenuHau , 'range' );
  dogid('parLargeurMinBtnMenuHau').addEventListener('touchstart'  , touchDownParLargeurMinBtnMenuHau , 'range' );
  
  dogid('parOptimisationChemin').addEventListener('change'        , setParOptimisationChemin         , 'range' );
  dogid('parOptimisationChemin').addEventListener('mousedown'     , mouseDownParOptimisationChemin   , 'range' );
  dogid('parOptimisationChemin').addEventListener('touchstart'    , touchDownParOptimisationChemin   , 'range' );
  
  dogid('parLargeurMenuGauche').addEventListener('change'         , setParLargeurMenuGauche          , 'range' );
  dogid('parLargeurMenuGauche').addEventListener('mousedown'      , mouseDownParLargeurMenuGauche    , 'range' );
  dogid('parLargeurMenuGauche').addEventListener('touchstart'     , touchDownParLargeurMenuGauche    , 'range' );
  
  dogid('parHauteurMenuHaut').addEventListener('change'           , setParHauteurMenuHaut            , 'range' );
  dogid('parHauteurMenuHaut').addEventListener('mousedown'        , mouseDownParHauteurMenuHaut      , 'range' );
  dogid('parHauteurMenuHaut').addEventListener('touchstart'       , touchDownParHauteurMenuHaut      , 'range' );
  
  dogid('parTaillePolice').addEventListener('change'              , setParTaillePolice               , 'range' );
  dogid('parTaillePolice').addEventListener('mousedown'           , mouseDownParTaillePolice         , 'range' );
  dogid('parTaillePolice').addEventListener('touchstart'          , touchDownParTaillePolice         , 'range' );
  
  dogid('parIntervalleEntreBtns').addEventListener('change'       , setParIntervalleEntreBtns        , 'range' );
  dogid('parIntervalleEntreBtns').addEventListener('mousedown'    , mouseDownParIntervalleEntreBtns  , 'range' );
  dogid('parIntervalleEntreBtns').addEventListener('touchstart'   , touchDownParIntervalleEntreBtns  , 'range' );
  
  dogid('parDiviseurDeplacement').addEventListener('change'       , setParDiviseurDeplacement        , 'range' );
  dogid('parDiviseurDeplacement').addEventListener('mousedown'    , mouseDownParDiviseurDeplacement  , 'range' );
  dogid('parDiviseurDeplacement').addEventListener('touchstart'   , touchDownParDiviseurDeplacement  , 'range' );
  
  dogid('parDiviseurDeChemin').addEventListener('change'          , setParDiviseurDeChemin           , 'range' );
  dogid('parDiviseurDeChemin').addEventListener('mousedown'       , mouseDownParDiviseurDeChemin     , 'range' );
  dogid('parDiviseurDeChemin').addEventListener('touchstart'      , touchDownParDiviseurDeChemin     , 'range' );
  
  dogid('parFacteurAimnt').addEventListener('change'       , setParFacteurAimnt        , 'range' );
  dogid('parFacteurAimnt').addEventListener('mousedown'    , mouseDownParFacteurAimnt  , 'range' );
  dogid('parFacteurAimnt').addEventListener('touchstart'   , touchDownParFacteurAimnt  , 'range' );

  
  dogid('suppVraimentToutToutTout').addEventListener('click'      , suppVraimentToutToutTout         , 'button' );
  
  dogid('francais').addEventListener('click'       , setFrancais        , 'button' );
  dogid('english').addEventListener('click'       , setEnglish        , 'button' );
  
  
  
 }
 //========================================================================================================
 function integrerModifManuelle1(){

  var lst=refZnDessin.querySelectorAll('*');
  for(var i=0;i<lst.length ;i++){
   
   if(lst[i].getAttribute('data-type') && ( lst[i].getAttribute('data-type')==='systeme' || lst[i].getAttribute('data-type')==='toRemove' ) ){
    continue;
   }
   if(lst[i].getAttribute('data-idarbre1')){
    var idarbre1=parseInt(lst[i].getAttribute('data-idarbre1'),10);
    var indiceArbre=recupereIndiceArbre(idarbre1);
  
    var attrs={};
    if(lst[i].attributes){
     for(let attribute of lst[i].attributes){
      attrs[attribute.nodeName]=attribute.nodeValue;
     }
    }
    _dssvg.arbre0[indiceArbre].data.attributes=attrs;
    if(lst[i].nodeName.toLowerCase()==='text' || lst[i].nodeName.toLowerCase()==='tspan'){
     _dssvg.arbre0[indiceArbre].data[lst[i].nodeName]=lst[i].innerHTML;
    }
    
    
   }
  }
  
 }
 //========================================================================================================
 function setZoomMoins1(){
  zoomPlusMoins(0.5);
 }
//========================================================================================================
 function setZoomPlus1(){
  zoomPlusMoins(2);
 }
 //========================================================================================================
 function zoomPlusMoins(n){
  var vb=refZnDessin.getAttribute('viewBox');
  if(vb!=null){
  
   var viewboxTab=refZnDessin.getAttribute('viewBox').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);

   if(_dssvg.zoom1==1024 && n==2){
    // rien
   }else if(_dssvg.zoom1==0.03125 && n==0.5){ // 0.03125 // 0.0625
    // rien
   }else{
    _dssvg.zoom1=_dssvg.zoom1*n;
    if(globalDernierePositionSouris.sx===null){
     _dssvg.viewBoxInit=[viewboxTab[0]/n,viewboxTab[1]/n,viewboxTab[2]/n,viewboxTab[3]/n];
    }else{
     // le centre est en globalDernierePositionSouris.sx mais il faudra modifier pour que le dernier click reste au même endroit
     var w=viewboxTab[2]/n;
     var h=viewboxTab[3]/n;
     var x=globalDernierePositionSouris.sx-w/2;
     var y=globalDernierePositionSouris.sy-w/2;
    }

    setAttributeViewBox();  
    rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
    strkWiTexteSousPoignees=rayonPoint/20;
    fontSiTexteSousPoignees=rayonPoint;
    resize1();
    afficheArbre0({prendreTout:false});
   }
   divlag1.innerHTML='Z='+_dssvg.zoom1;
  }
 }
 //========================================================================================================
 function ajouteElemDansElem(elementConteneur,nomDuTag,proprietes,enPremier){
  var el=document.createElementNS('http://www.w3.org/2000/svg',nomDuTag);
  for(var a in proprietes){
   if(proprietes.hasOwnProperty(a)){
    if(a==='text'||a==='tspan'){
     el.innerHTML=proprietes[a];
    }else{
     try{
      el.setAttribute(a,proprietes[a]);
     }catch(e){
      console.warn('%cattention','background:yellow;');
      console.warn('e=',e,'a=',a,'proprietes[a]=',proprietes[a]);
     }
 
    }
   }else{
    console.warn('ATTENTION : propriete "'+a+'" inexistante pour l\'élément "'+nomDuTag+'"' )
   }
  }
  if(enPremier!==undefined && enPremier===true){
   return elementConteneur.insertBefore(el, elementConteneur.firstChild);
  }else{
   return elementConteneur.appendChild(el);
  }
 }
 //========================================================================================================
 function htm1(s){
  try{
   return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/>/g,'&gt;').replace(/</g,'&lt;');
  }catch(e){
   return String(''+s+'')
  }
 } 
 //========================================================================================================
 function supprimePointsControle(){
  var tt=document.querySelectorAll('[data-type="toRemove"]');
  for(var i=0;i<tt.length;i++){
   tt[i].remove();
  }
 }
 //========================================================================================================
 function affPoi(){
  supprimePointsControle();
  if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' || _dssvg.mode_en_cours==='setModeSaisieDefsElt1' ){
   ajouterPointsDeControleElements();
  }else if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1' === _dssvg.mode_en_cours){
   ajouterPointsDeControlePointsElements();
  }else if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours ){
   ajouterPointsDeControlePointsTransformElements();
  }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
   ajouterPointsDeControlePointsTransformElements();
  }
 }
 //========================================================================================================
 function matrixToFnt(x){
  // https://stackoverflow.com/questions/5107134/find-the-rotation-and-skew-of-a-matrix-transformation
  var a = [x.a, x.b, x.c, x.d, x.e, x.f];
  var angle = Math.atan2(a[1], a[0]),
      denom = Math.pow(a[0], 2) + Math.pow(a[1], 2),
      scaleX = Math.sqrt(denom),
      scaleY = (a[0] * a[3] - a[2] * a[1]) / scaleX,
      skewX = Math.atan2(a[0] * a[2] + a[1] * a[3], denom);

  var max=40
  var min=1/max;
  
  if(scaleY>0 && scaleY<min){
   scaleY=min;
  }
  if(scaleY>0 && scaleY>max){
   scaleY=max;
  }
  
  if(scaleX>0 && scaleX<min){
   scaleX=min;
  }
  if(scaleX>0 && scaleX>max){
   scaleX=max;
  }
  
  if(scaleY<0 && scaleY>-min){
   scaleY=-min;
  }
  if(scaleY<0 && scaleY<-max){
   scaleY=-max;
  }
  if(scaleX<0 && scaleX>-min){
   scaleX=-min;
  }
  if(scaleX<0 && scaleX<-max){
   scaleX=-max;
  }
  scaleX=Math.round(scaleX*100)/100;
  scaleY=Math.round(scaleY*100)/100;
  if(_dssvg.aimanterPixel1!==0){
   scaleX=Math.round(scaleX*max)/max;
   scaleY=Math.round(scaleY*max)/max;
  }
  
  var obj={
    'angle'     : arrdi10000(angle / (Math.PI / 180)),  // this is rotate angle in degrees
    'scaleX'    : arrdi10000(scaleX),                   // scaleX factor  
    'scaleY'    : arrdi10000(scaleY),                   // scaleY factor
    'skewX'     : arrdi10000(skewX / (Math.PI / 180)),  // skewX angle degrees
    'skewY'     : 0,                                    // skewY angle degrees
    'translateX': arrdi10000(a[4]),                     // translation point  x
    'translateY': arrdi10000(a[5]),                     // translation point  y
    'transform' : ('translate('+arrdi10000(a[4])+' '+arrdi10000(a[5])+')')+' '+('rotate('+arrdi10000((angle / (Math.PI / 180)))+')')+'  '+(  'scale('+arrdi10000(scaleX)+' '+arrdi10000(scaleY)+')')  +(' skewX('+arrdi10000((skewX / (Math.PI / 180)))+')'),
    'transform2': (arrdi10000(a[4])==0 && arrdi10000(a[5])==0?'':'translate('+arrdi10000(a[4])+' '+arrdi10000(a[5])+')')+' '+(arrdi10000((angle / (Math.PI / 180)))==0?'':('rotate('+arrdi10000((angle / (Math.PI / 180)))+' 0 0)'))+'  '+( ((scaleX==1&&scaleY==1)||(scaleX==0||scaleY==0))?'': 'scale('+scaleX+','+scaleY+')')  +(arrdi10000((skewX/(Math.PI/180)))!=0?'  skewX('+arrdi10000((skewX / (Math.PI / 180)))+')':''),
  };      
  return obj;
 }
 //========================================================================================================
 function fElementTransformTranslate1(e){
  
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalTransformTranslateElement.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalTransformTranslateElement.mouseStart.x;
  pt0.y = current.y - globalTransformTranslateElement.mouseStart.y;
  
  var newPointX=globalTransformTranslateElement.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalTransformTranslateElement.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
 
  var deltaReel=refZnDessin.createSVGPoint();  
  deltaReel=pt0.matrixTransform(globalTransformTranslateElement.matriceElementElementInverse).matrixTransform(globalTransformTranslateElement.matriceRacine);

  var tx=0;
  var ty=0;
  var laTransformation='';
  for(var i=0;i<globalTransformTranslateElement.tabTransform.tab.length;i++){
   laTransformation+=globalTransformTranslateElement.tabTransform.tab[i][0]+'(';
   for(var j=0;j<globalTransformTranslateElement.tabTransform.tab[i][1].length;j++){
    laTransformation+=globalTransformTranslateElement.tabTransform.tab[i][1][j]+' ';
   }
   laTransformation+=') ';
  }
  
  var pt1=refZnDessin.createSVGPoint();  
  pt1.x = deltaReel.x;
  pt1.y = deltaReel.y;
  laTransformation+=' translate( '+pt1.x+' , '+pt1.y+' )';
  
  divLag1Pour({t:'traTrZ',l:'traTrZ','dx':arrdi10000(pt1.x),'dy':arrdi10000(pt1.y)});
  
  globalGeneralSvgReferenceElement.setAttribute( 'transform' ,  laTransformation );
  _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=laTransformation;

  return;
  
 }
 //========================================================================================================
 function mouseDownTransformTranslate(e){
  e.stopPropagation();
  actionDownTransformTranslate(e);
 }
 //========================================================================================================
 function touchDownTransformTranslate(e){
  e.stopPropagation();
  actionDownTransformTranslate(e.touches[0]);
 }
 //========================================================================================================
 var globalTransformTranslateElement={
  mouseStart                   : null,
  elementStart                 : null,
  matriceRacineInverse         : null,
  translatePositionInitiale    : null,
  chaineTransformAvant         : null,
  chaineTransformApres         : null,
  rectangle                    : null,
  matriceTransformGroup        : null,
  tabTransform                 : null,
  matriceElementElementInverse : null,
  angle                        : null,
  angleG                       : null,
  autreReference               : null,
  cascade01                    :null,
 };
// var mouseStart=null;
 //var elementStart=null;
 //========================================================================================================
 function actionDownTransformTranslate(e){ // TransformTranslate
  enCoursDeSelectionSansClickSurElement=false;
  ecran_appuye='fElementTransformTranslate1';
  globalGeneralReferencePointControleClique=e.target;
  initPosxy=positionSouris(e);
  initClick={x:e.clientX , y:e.clientY};
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  
  globalTransformTranslateElement.mouseStart=refZnDessin.createSVGPoint();
		globalTransformTranslateElement.mouseStart.x = e.clientX; 
  globalTransformTranslateElement.mouseStart.y = e.clientY;
  globalTransformTranslateElement.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  globalTransformTranslateElement.mouseStart=globalTransformTranslateElement.mouseStart.matrixTransform(globalTransformTranslateElement.matriceRacineInverse);
  globalTransformTranslateElement.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };

  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);

  globalTransformTranslateElement.autreReference=null;
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){

   globalTransformTranslateElement.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  
  
  globalTransformTranslateElement.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalTransformTranslateElement.matriceElementElementInverse.e=0;
  globalTransformTranslateElement.matriceElementElementInverse.f=0;
  
  globalTransformTranslateElement.matriceRacine=refZnDessin.getScreenCTM();
  globalTransformTranslateElement.matriceRacine.e=0;
  globalTransformTranslateElement.matriceRacine.f=0;
  
  globalTransformTranslateElement.angle=parseFloat(globalGeneralReferencePointControleClique.getAttribute('data-angle'));
  globalTransformTranslateElement.angleG=parseFloat(globalGeneralReferencePointControleClique.getAttribute('data-angleg'));


  if(globalGeneralSvgReferenceElement!==undefined){
   globalTransformTranslateElement.rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
   var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
   globalTransformTranslateElement.tabTransform=convertirTransformEnTableau(tr,['translate']);
  }
  return;

 }
 
 //========================================================================================================
 function calculCascadeTransform(elt,tableauDesTransformations){ // ['scale','rotate','translate', 'skew']
  
  var matrixCascade=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
  var cascade={
   rotate:[],
   scale:[],
   translate:[],
   matrixa:[],
   matrixb:[],
   matrixc:null,
   matrixd:'',
   lesMatrices:[],
   lesTransformations:[],
   matricesCumulees:null,
   // skewX
  };
  var goon=true;
  while(goon){
   
   
   if(elt.nodeName.toLowerCase()==='radialgradient'){
    var transform1=elt.getAttribute('gradientTransform')?elt.getAttribute('gradientTransform'):'';
   }else{
    var transform1=elt.getAttribute('transform')?elt.getAttribute('transform'):'';
   }
   var t1=convertirTransformEnTableau(transform1,tableauDesTransformations);

   var laMatrice=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
   for(var j=0;j<t1.tab.length;j++){
    if(t1.tab[j][0]=='scale'){
     cascade.scale.push([t1.tab[j][1][0] , t1.tab[j][1][1] ]);
     matrixCascade=matrixCascade.scaleNonUniform(t1.tab[j][1][0] , t1.tab[j][1][1]);
     laMatrice=laMatrice.scaleNonUniform(t1.tab[j][1][0] , t1.tab[j][1][1]);
    }else if(t1.tab[j][0]=='rotate'){
     cascade.rotate.push([t1.tab[j][1][0]]);
     matrixCascade=matrixCascade.rotate(t1.tab[j][1][0] , 0 , 0 );
     laMatrice=laMatrice.rotate(t1.tab[j][1][0] , 0 , 0 );
    }else if(t1.tab[j][0]=='translate'){
     cascade.translate.push([t1.tab[j][1][0] , t1.tab[j][1][1] ]);
     matrixCascade=matrixCascade.translate(t1.tab[j][1][0] , 0 , 0 );
     laMatrice=laMatrice.translate(t1.tab[j][1][0] , 0 , 0 );
    }else if(t1.tab[j][0]=='skewX'){
     cascade.translate.push([t1.tab[j][1][0] ]);
     matrixCascade=matrixCascade.skewX( t1.tab[j][1][0]  );
     laMatrice=laMatrice.skewX( t1.tab[j][1][0] );
    }
   }
   var laTransformation=convertirTransformEnTableau(transform1,[]);
   cascade.lesTransformations.push(laTransformation);
   cascade.lesMatrices.push(laMatrice);
   cascade.matrixa.push([matrixCascade.a,matrixCascade.b,matrixCascade.c,matrixCascade.d,matrixCascade.e,matrixCascade.f]);
   cascade.matrixb.push(matrixCascade);
   if(elt==refZnDessin){
    goon=false;
   }else{
    elt=elt.parentNode;
/*
    if(elt.nodeName==='defs'){
     goon=false;
    }
*/    
   }
  }
  
  cascade.matricesCumulees=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
  for(var j=cascade.lesMatrices.length-1;j>=0;j--){
   cascade.matricesCumulees=cascade.matricesCumulees.multiply(cascade.lesMatrices[j]);
  }

  
  
  if(cascade.matrixb.length>0){
   cascade.matrixc=cascade.matrixb[cascade.matrixb.length-1].inverse();
   for(var j=cascade.matrixb.length-2;j>=0;j--){
    cascade.matrixc=cascade.matrixc.multiply(cascade.matrixb[j].inverse());
   }
   cascade.matrixd='matrix('+cascade.matrixc.a+','+cascade.matrixc.b+','+cascade.matrixc.c+','+cascade.matrixc.d+','+cascade.matrixc.e+','+cascade.matrixc.f+')';
  }
  
  
  
  
  return cascade;
  
 }
 
 
 //========================================================================================================
 function angle2Points(pax,pay,pbx,pby){
  var a1=0;
  if(pax==pbx){
   if(pay>pby){
    a1=90;
   }else{
    a1=270;
   }
   return a1
  }
  a1=Math.abs(Math.atan((pby-pay)/(pbx-pax))/2/Math.PI*360);
  if(pax<pbx){
   if(pay>=pby){
    a1=a1; // a1
   }else{
    a1=360-a1;
   }
  }else{
   if(pay>=pby){
    a1=180-a1;
   }else{   
    a1=180+a1;
   }  
  }
  return a1;
 } 

 //========================================================================================================
 function fElementTransformCentreRotation(e){ // ecran_appuye='fElementTransformCentreRotation';
  
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalSelectRotationPosCentreElement.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalSelectRotationPosCentreElement.mouseStart.x;
  pt0.y = current.y - globalSelectRotationPosCentreElement.mouseStart.y;
  

  var newPointX=globalSelectRotationPosCentreElement.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalSelectRotationPosCentreElement.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
  
  var deltaReel=refZnDessin.createSVGPoint();  
  deltaReel=pt0.matrixTransform(globalSelectRotationPosCentreElement.matriceElementElementInverse).matrixTransform(globalSelectRotationPosCentreElement.matriceRacine);
  deltaReel.x=deltaReel.x/_dssvg.parametres.diviseurDeplacement;;
  deltaReel.y=deltaReel.y/_dssvg.parametres.diviseurDeplacement;;
  
  divlag1.innerHTML='<span>depPLZ='+_dssvg.zoom1+'</span>,<span style="color:red;">x='+arrdi10000(newPointX)+'</span>,<span style="color:red;">y='+arrdi10000(newPointY)+'</span>';

  
  var laTransformation='';
  for(var i=0;i<globalSelectRotationPosCentreElement.tabTransform.tab.length;i++){
   if(i==globalSelectRotationPosCentreElement.tabTransform.indices.rotate){
    var cx=arrdi10000(globalSelectRotationPosCentreElement.tabTransform.tab[i][1][1]+deltaReel.x);
    var cy=arrdi10000(globalSelectRotationPosCentreElement.tabTransform.tab[i][1][2]+deltaReel.y);
    laTransformation+=globalSelectRotationPosCentreElement.tabTransform.tab[i][0]+'(';
    laTransformation+=globalSelectRotationPosCentreElement.tabTransform.tab[i][1][0]+' ';
    laTransformation+=cx+' ';
    laTransformation+=cy+' ';
    laTransformation+=') ';
    
    divLag1Pour({t:'traCaZ',l:'traCaZ','cx':cx,'cy':cy});

    
   }else{
    laTransformation+=globalSelectRotationPosCentreElement.tabTransform.tab[i][0]+'(';
    for(var j=0;j<globalSelectRotationPosCentreElement.tabTransform.tab[i][1].length;j++){
     laTransformation+=globalSelectRotationPosCentreElement.tabTransform.tab[i][1][j]+' ';
    }
    laTransformation+=') ';
   }
  }
  if(globalSelectRotationPosCentreElement.autreReference && ( globalSelectRotationPosCentreElement.autreReference.nodeName.toLowerCase()==='radialgradient' || globalSelectRotationPosCentreElement.autreReference.nodeName.toLowerCase()==='lineargradient' ) ){

   _dssvg.arbre0[globalIndiceArbre].data.attributes['gradientTransform']=laTransformation;
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransformation);
   // il faut aussi appliquer l'écart de la rotation à data-idarbre1="2"
   globalSelectRotationPosCentreElement.autreReference.setAttribute('gradientTransform' ,  laTransformation );
   
  }else{
  
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransformation);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=laTransformation;
  }

  
  return ;
  
  
 }
 //========================================================================================================
 function mouseDownRotatePosCentreTransformElement(e){
  e.stopPropagation();
  actionDownRotatePositionCentreTransformElement(e)
 }
 //========================================================================================================
 function touchDownRotatePosCentreTransformElement(e){
  e.stopPropagation();
  actionDownRotatePositionCentreTransformElement(e.touches[0])
 }
 //========================================================================================================
 var globalSelectRotationPosCentreElement={
  matriceParentElementInverse:null,
  rectangle:null,
  mouseStart:null,
  matriceRacineInverse:null,
  matriceDeplacementPoint:null,
  elementStart:null,
  tabTransform:null, 
  positionPointCR:null,
  matriceElementElementInverse:null,
  matriceRacine:null,
  autreReference:null,
  
 };
 //========================================================================================================
 function actionDownRotatePositionCentreTransformElement(e){

  initPosxy=positionSouris(e);
  ecran_appuye='fElementTransformCentreRotation';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  divlag1.innerHTML='<span>3mdREZ='+_dssvg.zoom1+'</span>,<span>sx='+initPosxy.sx + '</span>,<span>sy=' + initPosxy.sy+'</span>';
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ cr/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalSelectRotationPosCentreElement.autreReference=null;
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){
   globalSelectRotationPosCentreElement.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 

  
  
  globalSelectRotationPosCentreElement.matriceParentElementInverse=globalGeneralSvgReferenceElement.parentNode.getScreenCTM().inverse();
  globalSelectRotationPosCentreElement.matriceParentElementInverse.e=0;
  globalSelectRotationPosCentreElement.matriceParentElementInverse.f=0;
  
  globalSelectRotationPosCentreElement.rectangle=null;

  globalSelectRotationPosCentreElement.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalSelectRotationPosCentreElement.matriceElementElementInverse.e=0;
  globalSelectRotationPosCentreElement.matriceElementElementInverse.f=0;

  globalSelectRotationPosCentreElement.matriceRacine=refZnDessin.getScreenCTM();
  globalSelectRotationPosCentreElement.matriceRacine.e=0;
  globalSelectRotationPosCentreElement.matriceRacine.f=0;
  
  
  
  globalSelectRotationPosCentreElement.mouseStart=refZnDessin.createSVGPoint();
		globalSelectRotationPosCentreElement.mouseStart.x = e.clientX; 
  globalSelectRotationPosCentreElement.mouseStart.y = e.clientY;
  globalSelectRotationPosCentreElement.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  globalSelectRotationPosCentreElement.mouseStart=globalSelectRotationPosCentreElement.mouseStart.matrixTransform(globalSelectRotationPosCentreElement.matriceRacineInverse);
  globalSelectRotationPosCentreElement.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };
  globalSelectRotationPosCentreElement.matriceDeplacementPoint=globalSelectRotationPosCentreElement.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  globalSelectRotationPosCentreElement.matriceDeplacementPoint.e=0;
  globalSelectRotationPosCentreElement.matriceDeplacementPoint.f=0;
  
  var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
  globalSelectRotationPosCentreElement.tabTransform=convertirTransformEnTableau(tr,['rotate']);


  var refPointcr=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' cr"]')[0];
  if(refPointcr){
   globalSelectRotationPosCentreElement.positionPointCR={
    x:arrdi10000(refPointcr.cx.animVal.value),
    y:arrdi10000(refPointcr.cy.animVal.value),
   }
  }
 }
 
 //========================================================================================================
 function convertirTransformEnTableau(tr,trAajouter){
  var tab=[];
  var indices={
   matrix    : -1,
   translate : -1,
   rotate    : -1,
   scale     : -1,
   skewx     : -1,
  }
  
  var trTab=tr.toLowerCase().split(')');

  for(var i=0;i<trTab.length;i++){
   
   if(trTab[i]==''){
    continue;
   }
   trTab[i]=trTab[i].trim().toLowerCase();
   
   if(trTab[i].substr(0,6)==='matrix'){
    
    var tabTemp=trTab[i].replace('matrix','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    tab.push(['matrix',tabTemp]);
    indices.matrix=tab.length-1;
    
   }else if(trTab[i].substr(0,6)==='rotate'){
    
    var tabTemp=trTab[i].replace('rotate','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    if(tabTemp.length==1){
     tabTemp=[tabTemp[0],0,0];
    }
    tab.push(['rotate',tabTemp]);
    indices.rotate=tab.length-1;
    
   }else if(trTab[i].substr(0,5)==='scale'){
    
    var tabTemp=trTab[i].replace('scale','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    if(tabTemp.length==1){
     tabTemp=[tabTemp[0],tabTemp[0]];
    }
    tab.push(['scale',tabTemp]);
    indices.scale=tab.length-1;
    
   }else if(trTab[i].substr(0,9)==='translate'){
    
    var tabTemp=trTab[i].replace('translate','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    tab.push(['translate',tabTemp]);
    indices.translate=tab.length-1;

   }else if(trTab[i].toLowerCase().substr(0,5)==='skewx'){
    
    var tabTemp=trTab[i].replace('skewX','').replace('skewx','').replace('(','').trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    tab.push(['skewX',tabTemp]);
    indices.skewx=tab.length-1;
    
   }
   
  }

  for(var i=0;i<trAajouter.length;i++){
   var elem=trAajouter[i];
   if(elem==='rotate'){
    if(indices.rotate==-1){
     tab.push(['rotate',[0,0,0]]);
     indices.rotate=tab.length-1;
    }
   }else if(elem==='translate'){
    if(indices.translate==-1){
     tab.push(['translate',[0,0]]);
     indices.translate=tab.length-1;
    }
   }else if(elem.toLowerCase()==='skewx'){
    if(indices.skewx==-1){
     tab.push(['skewX',[0]]);
     indices.skewx=tab.length-1;
    }
   }else if(elem.toLowerCase()==='scale'){
    if(indices.scale==-1){
     tab.push(['scale',[1,1]]);
     indices.scale=tab.length-1;
    }
   }
  }
  return {tab:tab,indices:indices};
 }
 //========================================================================================================
 function arrdi100(x){
  x=Math.round(x*100)/100;
  if(_dssvg.aimanterPixel1!==0){
   x=Math.round((x*10))/10;
  }
  return x;
 }
 
 //========================================================================================================
 function fElementTransformSkewx(e){
  
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalElementTransformSkewx.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalElementTransformSkewx.mouseStart.x;
  pt0.y = current.y - globalElementTransformSkewx.mouseStart.y;

  var pt1=refZnDessin.createSVGPoint();  
  pt1=pt0.matrixTransform(globalElementTransformSkewx.matriceDeplacementPoint);
  var newPointX=globalElementTransformSkewx.elementStart.x+pt1.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalElementTransformSkewx.elementStart.y+pt1.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
  
  var nouvelAngle=angle2Points(
   globalElementTransformSkewx.positionPointCR.x ,
   globalElementTransformSkewx.positionPointCR.y ,
   newPointX,
   newPointY
  )-270;

  
  nouvelAngle=arrdi10000(nouvelAngle);
  if(nouvelAngle<-180){
   nouvelAngle=360+nouvelAngle;
  }
  if(nouvelAngle>85){
   nouvelAngle=85;
  }
  if(nouvelAngle<-85){
   nouvelAngle=-85;
  }
  
  var laTransformation='';
  for(var i=0;i<globalElementTransformSkewx.tabTransform.tab.length;i++){
   if(i==globalElementTransformSkewx.tabTransform.indices.skewx){
    if(nouvelAngle===0){
    }else{
     laTransformation+=globalElementTransformSkewx.tabTransform.tab[i][0]+'(';
     laTransformation+=nouvelAngle+' ';
     laTransformation+=') ';
    }
    divLag1Pour({t:'traSkZ',l:'traSkZ','a':nouvelAngle});    
    
   }else{
    laTransformation+=globalElementTransformSkewx.tabTransform.tab[i][0]+'(';
    for(var j=0;j<globalElementTransformSkewx.tabTransform.tab[i][1].length;j++){
     laTransformation+=globalElementTransformSkewx.tabTransform.tab[i][1][j]+' ';
    }
    laTransformation+=') ';
   }
  }

  if(globalElementTransformSkewx.autreReference && ( globalElementTransformSkewx.autreReference.nodeName.toLowerCase()==='radialgradient' || globalElementTransformSkewx.autreReference.nodeName.toLowerCase()==='lineargradient' ) ){


   _dssvg.arbre0[globalIndiceArbre].data.attributes['gradientTransform']=laTransformation;
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransformation);
   // il faut aussi appliquer l'écart de la rotation à data-idarbre1="2"
   globalElementTransformSkewx.autreReference.setAttribute('gradientTransform' ,  laTransformation );
   
  }else{

   globalGeneralSvgReferenceElement.setAttribute('transform',laTransformation);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=laTransformation;
   
  }
  
 }  
 //========================================================================================================
 function mouseDownSkewxTransformElement(e){
  e.stopPropagation();
  actionDownElementTransformSkewx(e)
 }
 //========================================================================================================
 function touchDownSkewxTransformElement(e){
  e.stopPropagation();
  actionDownElementTransformSkewx(e.touches[0])
 }
//========================================================================================================
 var globalElementTransformSkewx={ // voir globalElementTransformScale
  mouseStart                   : null,
  elementStart                 : null,
  matriceRacineInverse         : null,
  rectangle                    : null,
  matriceElementElementInverse : null,
  matriceRacine                : null,
  tabTransform                 : null,
  positionPointSK              : null,
  positionPointCR              : null,
  skewxInit                    : null,
  matriceDeplacementPoint      : null,
  autreReference               : null,
 }
 //========================================================================================================
 function actionDownElementTransformSkewx(e){

  initPosxy=positionSouris(e);
  ecran_appuye='fElementTransformSkewx';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  
  globalElementTransformSkewx.autreReference=null;
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){

   globalElementTransformSkewx.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  
  
  globalElementTransformSkewx.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalElementTransformSkewx.matriceElementElementInverse.e=0;
  globalElementTransformSkewx.matriceElementElementInverse.f=0;
  
  globalElementTransformSkewx.matriceRacine=refZnDessin.getScreenCTM();
  globalElementTransformSkewx.matriceRacine.e=0;
  globalElementTransformSkewx.matriceRacine.f=0;
  
  globalElementTransformSkewx.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();

  globalElementTransformSkewx.matriceDeplacementPoint=globalElementTransformSkewx.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  globalElementTransformSkewx.matriceDeplacementPoint.e=0;
  globalElementTransformSkewx.matriceDeplacementPoint.f=0;
  
  
  globalElementTransformSkewx.mouseStart=refZnDessin.createSVGPoint();
		globalElementTransformSkewx.mouseStart.x = e.clientX; 
  globalElementTransformSkewx.mouseStart.y = e.clientY;
  globalElementTransformSkewx.mouseStart=globalElementTransformSkewx.mouseStart.matrixTransform(globalElementTransformSkewx.matriceRacineInverse);
  globalElementTransformSkewx.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };

  var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
  globalElementTransformSkewx.tabTransform=convertirTransformEnTableau(tr,['skewx']);
  
  
  globalElementTransformSkewx.rectangle=null;
  var rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  if(rectangle){
   globalElementTransformSkewx.rectangle={
    ref:rectangle,
    x:arrdi10000(parseFloat(rectangle.getAttribute('x'))),
    y:arrdi10000(parseFloat(rectangle.getAttribute('y'))),
    width:arrdi10000(parseFloat(rectangle.getAttribute('width'))),
    height:arrdi10000(parseFloat(rectangle.getAttribute('height'))),
   }
  }
  
  var refPointcr=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' cr"]')[0];
  if(refPointcr){
   globalElementTransformSkewx.positionPointCR={
    x:arrdi10000(refPointcr.cx.animVal.value),
    y:arrdi10000(refPointcr.cy.animVal.value),
   }
  }
  
  var refPointsk=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' sk"]')[0];
  if(refPointsk){
   globalElementTransformSkewx.positionPointSK={
    x:arrdi10000(refPointsk.cx.animVal.value),
    y:arrdi10000(refPointsk.cy.animVal.value),
   }
  }
  globalElementTransformSkewx.skewxInit=angle2Points(
   globalElementTransformSkewx.positionPointCR.x ,
   globalElementTransformSkewx.positionPointCR.y ,
   globalElementTransformSkewx.positionPointSK.x ,
   globalElementTransformSkewx.positionPointSK.y ,
  )-270;
  

  var sxInit=globalElementTransformSkewx.tabTransform.tab[globalElementTransformSkewx.tabTransform.indices.skewx][1][0];
  divlag1.innerHTML='<span>skEZ='+_dssvg.zoom1+'</span>,<span>sx='+arrdi10000(initPosxy.sx)+'</span>,<span>sy='+arrdi10000(initPosxy.sy)+'</span>,<span>skx=' + globalElementTransformSkewx.skewxInit+'</span>';
  
  return;
  
 }
 //========================================================================================================
 function distanceEntreDroiteEtPoint(x1,y1,x2,y2,px,py){ // la droite est définie par x1,y1,x2,y2
  var delta=0;
  if(Math.round((x2-x1)*1000)/1000!==0){ // la droite n'est pas verticale
   if(Math.round(y2*1000)/1000===Math.round(y1*1000)/1000){
    delta=Math.round((py-y2)*1000)/1000;
   }else{
    var a0=Math.round((y2-y1)/(x2-x1)*1000)/1000; // a0 = pente de la droite
//    console.log( 'pente de la droite = ' , a0 );
    var b0=y1-a0*x1; // on a a0 et b0 de l'équation de la droite y=a0*x+b0
    var m3=-1/a0; // la pente de la droite orthogonale est -1/a0
    var b3=py-m3*px;
    var yn=(b3-b0*m3/a0)/(1-m3/a0);
    var xn=(yn-b0)/a0;
    delta=Math.sqrt((px-xn)*(px-xn)+(py-yn)*(py-yn))*(py<yn?-1:1);
   }
  }else{
   delta=Math.round((px-x1)*1000)/1000;
  }
  return delta;
 }
 //========================================================================================================
 function chercherPointsGroupeVoinsin(e){
  if(e.hasOwnProperty('touches')){
   e=e.touches[0];
  }
 }
 //========================================================================================================
 function selectionnerElementAtransformer(e){
  e.stopPropagation();
  var nouvelIdArbre=parseInt(e.target.getAttribute('data-elem'),10);
  if(_dssvg.idArbreCourant===nouvelIdArbre){
  }else{
   _dssvg.idArbrPreceden=_dssvg.idArbreCourant;
   _dssvg.idArbreCourant=nouvelIdArbre;
  }
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]')[0];
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  affPoi();
  divLag2Complete();

 }
 //========================================================================================================
 function mouseDownDeplacerTousLesElementsDeGroupe(e){
  e.stopPropagation();
 }
 //========================================================================================================
 function touchDownDeplacerTousLesElementsDeGroupe(e){
  e.stopPropagation();
 }
 
 
 //========================================================================================================
 function fElementTransformAngle2(e){ //ecran_appuye='fElementTransformAngle2';
  
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalSelectRotationAngleElement.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalSelectRotationAngleElement.mouseStart.x;
  pt0.y = current.y - globalSelectRotationAngleElement.mouseStart.y;

  var pt1=refZnDessin.createSVGPoint();  
  pt1=pt0.matrixTransform(globalSelectRotationAngleElement.matriceDeplacementPoint);
  
  var newPointX=globalSelectRotationAngleElement.elementStart.x+pt1.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalSelectRotationAngleElement.elementStart.y+pt1.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
  
  
  
  
  var nouvelAngle=-angle2Points(
   globalSelectRotationAngleElement.positionPointCR.x ,
   globalSelectRotationAngleElement.positionPointCR.y ,
   newPointX,
   newPointY
  );
  
  var ancienAngle=0;
  if(globalSelectRotationAngleElement.tabTransform.indices.rotate>=0){
   ancienAngle=globalSelectRotationAngleElement.tabTransform.tab[globalSelectRotationAngleElement.tabTransform.indices.rotate][1][0]
  }
  var deltaAngle=nouvelAngle-ancienAngle;
  
  var t=matrixToFnt(globalSelectRotationAngleElement.matriceParentElement);
  nouvelAngle=arrdi10000(nouvelAngle);
  var nouvelAngleBis=nouvelAngle;
  
  
  if(nouvelAngle<-180){
   nouvelAngle=360+nouvelAngle;
  }
  
  if(nouvelAngle>360){
   nouvelAngle=nouvelAngle-360;
  }
  
  
  var laTransforlation='';
  for(var i=0;i<globalSelectRotationAngleElement.tabTransform.tab.length;i++){
   if(i==globalSelectRotationAngleElement.tabTransform.indices.rotate){
    
    if(nouvelAngle===0 && globalSelectRotationAngleElement.tabTransform.tab[i][1][1]===0 && globalSelectRotationAngleElement.tabTransform.tab[i][1][2]===0){
    }else{
    
     laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][0]+'(';
     laTransforlation+=arrdi10000(nouvelAngle)+' ';
     laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][1][1]+' ';
     laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][1][2]+' ';
     laTransforlation+=')';
    }
    
    divLag1Pour({t:'traAnZ',l:'traAnZ','a':nouvelAngle,'ab':nouvelAngleBis});
    
    
   }else{
    laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][0]+'(';
    for(var j=0;j<globalSelectRotationAngleElement.tabTransform.tab[i][1].length;j++){
     laTransforlation+=globalSelectRotationAngleElement.tabTransform.tab[i][1][j]+' ';
    }
    laTransforlation+=') ';
   }
  }
  if(globalSelectRotationAngleElement.autreReference && ( globalSelectRotationAngleElement.autreReference.nodeName.toLowerCase()==='radialgradient' || globalSelectRotationAngleElement.autreReference.nodeName.toLowerCase()==='lineargradient' )){
   _dssvg.arbre0[globalIndiceArbre].data.attributes['gradientTransform']=laTransforlation;
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransforlation);
   // il faut aussi appliquer l'écart de la rotation à data-idarbre1="2"
   globalSelectRotationAngleElement.autreReference.setAttribute('gradientTransform' ,  laTransforlation );
   
  }else{
   globalGeneralSvgReferenceElement.setAttribute('transform',laTransforlation);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=laTransforlation;
  }
  
 } 
 
 
 //========================================================================================================
 function mouseDownRotateAngleTransformElement2(e){
  e.stopPropagation();
  actionDownRotateTransformAngleElement2(e);
 }
 //========================================================================================================
 function touchDownRotateAngleTransformElement2(e){
  e.stopPropagation();
  actionDownRotateTransformAngleElement2(e.touches[0]);
 }
 //========================================================================================================
 var globalSelectRotationAngleElement={
//  matriceParentElementInverse:null,
  rectangle:null,
  mouseStart:null,
  matriceRacineInverse:null,
  matriceDeplacementPoint:null,
  elementStart:null,
  tabTransform:null, 
  positionPointCR:null,
  positionPointAN:null,
  angleInit:null,
  autreReference:null,
  init:null,
 }; 
 //========================================================================================================
 function actionDownRotateTransformAngleElement2(e){
  
  initPosxy=positionSouris(e);
  ecran_appuye='fElementTransformAngle2';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ cr/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalSelectRotationAngleElement.autreReference=null; // pour le radialGradient
  
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){
   globalSelectRotationAngleElement.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  globalSelectRotationAngleElement.matriceParentElement=globalGeneralSvgReferenceElement.parentNode.getScreenCTM()
  globalSelectRotationAngleElement.rectangle=null;
  
  
  globalSelectRotationAngleElement.mouseStart=refZnDessin.createSVGPoint();
		globalSelectRotationAngleElement.mouseStart.x = e.clientX; 
  globalSelectRotationAngleElement.mouseStart.y = e.clientY;
  globalSelectRotationAngleElement.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  globalSelectRotationAngleElement.mouseStart=globalSelectRotationAngleElement.mouseStart.matrixTransform(globalSelectRotationAngleElement.matriceRacineInverse);
  globalSelectRotationAngleElement.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };
  globalSelectRotationAngleElement.matriceDeplacementPoint=globalSelectRotationAngleElement.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  
  
  globalSelectRotationAngleElement.matriceDeplacementPoint.e=0;
  globalSelectRotationAngleElement.matriceDeplacementPoint.f=0;
  
  var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
  globalSelectRotationAngleElement.tabTransform=convertirTransformEnTableau(tr,['rotate']);

  var refPointcr=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' cr"]')[0];
  if(refPointcr){
   globalSelectRotationAngleElement.positionPointCR={
    x:arrdi10000(refPointcr.cx.animVal.value),
    y:arrdi10000(refPointcr.cy.animVal.value),
   }
  }
  
  var refPointan=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' an"]')[0];
  if(refPointan){
   globalSelectRotationAngleElement.positionPointAN={
    x:arrdi10000(refPointan.cx.animVal.value),
    y:arrdi10000(refPointan.cy.animVal.value),
   }
  }
  globalSelectRotationAngleElement.angleInit=angle2Points(
   globalSelectRotationAngleElement.positionPointCR.x ,
   globalSelectRotationAngleElement.positionPointCR.y ,
   globalSelectRotationAngleElement.positionPointAN.x ,
   globalSelectRotationAngleElement.positionPointAN.y ,
  );
  
  divlag1.innerHTML='<span>2mdREZ='+_dssvg.zoom1+'</span>,<span>sx='+initPosxy.sx + '</span>,<span>sy=' + initPosxy.sy+'</span><span>a='+(globalSelectRotationAngleElement.angleInit)+'</span>';
  
 } 
  
 //========================================================================================================
 function felementTransformEchelle3(e){ // actionDownElementTransformScale3
  
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalElementTransformScale.matriceRacineInverse);
//  console.log('globalElementTransformScale=',globalElementTransformScale);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalElementTransformScale.mouseStart.x;
  pt0.y = current.y - globalElementTransformScale.mouseStart.y;

  var pt1=refZnDessin.createSVGPoint();  
  pt1=pt0.matrixTransform(globalElementTransformScale.matriceDeplacementPoint);
  
  
  var newPointX=globalElementTransformScale.elementStart.x+pt1.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalElementTransformScale.elementStart.y+pt1.y/_dssvg.parametres.diviseurDeplacement;
//		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
//		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
		globalGeneralReferencePointControleClique.setAttribute('x', newPointX-globalElementTransformScale.wh/2 );
		globalGeneralReferencePointControleClique.setAttribute('y', newPointY-globalElementTransformScale.wh/2 );

  if(globEchelle.dataInit.t0.indices.scale<globEchelle.dataInit.t0.indices.rotate){

   var matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
   matrix=matrix.rotate(globEchelle.dataInit.angle);
   var pt2=refZnDessin.createSVGPoint();  
   pt2=pt1.matrixTransform(matrix);
   var dx2=distanceEntreDroiteEtPoint(globalElementTransformScale.init.cx,globalElementTransformScale.init.cy,globalElementTransformScale.init.pt9[0],globalElementTransformScale.init.pt9[1],globEchelle.dataInit.pt10[0]+pt2.x,globEchelle.dataInit.pt10[1]+pt2.y);
   var dy2=distanceEntreDroiteEtPoint(globalElementTransformScale.init.cx,globalElementTransformScale.init.cy,globalElementTransformScale.init.pt8[0],globalElementTransformScale.init.pt8[1],globEchelle.dataInit.pt10[0]+pt2.x,globEchelle.dataInit.pt10[1]+pt2.y);
  }else{
   var dy2=distanceEntreDroiteEtPoint(globalElementTransformScale.init.cx,globalElementTransformScale.init.cy,globalElementTransformScale.init.pt8[0],globalElementTransformScale.init.pt8[1],newPointX,newPointY);
   var dx2=distanceEntreDroiteEtPoint(globalElementTransformScale.init.cx,globalElementTransformScale.init.cy,globalElementTransformScale.init.pt9[0],globalElementTransformScale.init.pt9[1],newPointX,newPointY);
  }

  var nouvelleEchelleX=dx2/globEchelle.dataInit.dx2*globEchelle.dataInit.t0.tab[globEchelle.dataInit.t0.indices.scale][1][0];
  var nouvelleEchelleY=dy2/globEchelle.dataInit.dy2*globEchelle.dataInit.t0.tab[globEchelle.dataInit.t0.indices.scale][1][1];
  
  var echelleTrouvee=false;
  var tt='';
  
  
  var max=40
  var min=1/max;
  
  if(nouvelleEchelleY>0 && nouvelleEchelleY<min){
   nouvelleEchelleY=min;
  }
  if(nouvelleEchelleY>0 && nouvelleEchelleY>max){
   nouvelleEchelleY=max;
  }
  
  if(nouvelleEchelleX>0 && nouvelleEchelleX<min){
   nouvelleEchelleX=min;
  }
  if(nouvelleEchelleX>0 && nouvelleEchelleX>max){
   nouvelleEchelleX=max;
  }
  
  if(nouvelleEchelleY<0 && nouvelleEchelleY>-min){
   nouvelleEchelleY=-min;
  }
  if(nouvelleEchelleY<0 && nouvelleEchelleY<-max){
   nouvelleEchelleY=-max;
  }
  if(nouvelleEchelleX<0 && nouvelleEchelleX>-min){
   nouvelleEchelleX=-min;
  }
  if(nouvelleEchelleX<0 && nouvelleEchelleX<-max){
   nouvelleEchelleX=-max;
  }
  nouvelleEchelleX=Math.round(nouvelleEchelleX*100)/100;
  nouvelleEchelleY=Math.round(nouvelleEchelleY*100)/100;
  if(_dssvg.aimanterPixel1!==0){
   nouvelleEchelleX=Math.round(nouvelleEchelleX*max)/max;
   nouvelleEchelleY=Math.round(nouvelleEchelleY*max)/max;
  }
  
  for(var i=0;i<globalElementTransformScale.init.t0.tab.length;i++){
   if(globalElementTransformScale.init.t0.tab[i][0]==='scale'){
    echelleTrouvee=true;
    if(nouvelleEchelleX===1 && nouvelleEchelleY===1){
    }else{
     tt+='scale('+nouvelleEchelleX+','+nouvelleEchelleY+')';
    }
   }else if(globalElementTransformScale.init.t0.tab[i][0]==='rotate'){
    if(globalElementTransformScale.init.t0.tab[i][1][0] === 0 && globalElementTransformScale.init.t0.tab[i][1][1] === 0 && globalElementTransformScale.init.t0.tab[i][1][2] === 0 ){
    }else{
     tt+=globalElementTransformScale.init.t0.tab[i][0]+'('+globalElementTransformScale.init.t0.tab[i][1].join(' ')+')';
    }
   }else{
    tt+=globalElementTransformScale.init.t0.tab[i][0]+'('+globalElementTransformScale.init.t0.tab[i][1].join(' ')+')';
   }
  }
  if(echelleTrouvee===false){
   if(nouvelleEchelleX===1 && nouvelleEchelleY===1){
   }else{
    tt+='scale('+nouvelleEchelleX+' '+nouvelleEchelleY+')';
   }
  }
  
  if(globalElementTransformScale.autreReference && ( globalElementTransformScale.autreReference.nodeName.toLowerCase()==='radialgradient' || globalElementTransformScale.autreReference.nodeName.toLowerCase()==='lineargradient')){

   _dssvg.arbre0[globalIndiceArbre].data.attributes['gradientTransform']=tt;
   globalGeneralSvgReferenceElement.setAttribute('transform',tt);
   // il faut aussi appliquer l'écart de la rotation à data-idarbre1="2"
   globalElementTransformScale.autreReference.setAttribute('gradientTransform' ,  tt );
   
  }else{

   globalGeneralSvgReferenceElement.setAttribute('transform',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['transform']=tt;

  }
  
  divlag1.innerHTML='<span>sE3Z='+_dssvg.zoom1+'</span>,<span>ex=' + nouvelleEchelleX+'</span>,<span>ey=' + nouvelleEchelleY+'</span>';

 }
 //========================================================================================================
 function mouseDownElementTransformScale3(e){
  e.stopPropagation();
  actionDownElementTransformScale3(e)
 }
 //========================================================================================================
 function touchDownElementTransformScale3(e){
  e.stopPropagation();
  actionDownElementTransformScale3(e.touches[0])
 }
 
//========================================================================================================
 var globalElementTransformScale={
  mouseStart:null,
  elementStart:null,
  matriceRacineInverse:null,
  rectangle:null,
  matriceElementElementInverse:null,
  matriceRacine:null,
  matriceElement:null,
  init:null,
  tabTransform:null,
  autreReference:null,
  wh:0,
 }
 
 var globEchelle={
  angle:null,
  ref:null,
  centreX:null,
  centreY:null,
  deltaxInit:null,
  deltayInit:null,
  dataInit:null,
 };
 //========================================================================================================
 function actionDownElementTransformScale3(e){
  
  initPosxy=positionSouris(e);
  ecran_appuye='felementTransformEchelle3';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  
  
  
//  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initMouseDownObj={x:globalGeneralReferencePointControleClique.x.animVal.value + globalGeneralReferencePointControleClique.width.animVal.value / 2, y:globalGeneralReferencePointControleClique.y.animVal.value + globalGeneralReferencePointControleClique.height.animVal.value / 2};
  initClick={x:e.clientX , y:e.clientY};
  globalElementTransformScale.initClick=initClick;
  globalElementTransformScale.initMouseDownObj=initMouseDownObj;
  globalElementTransformScale.wh=globalGeneralReferencePointControleClique.width.animVal.value;
  
  
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem').replace(/ se/,''),10);
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  globalElementTransformScale.autreReference=null;
  if(globalGeneralSvgReferenceElement.length>1){

   globalElementTransformScale.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  
  
  globalElementTransformScale.init=JSON.parse(e.target.getAttribute('data-init'));
  
  
  globalElementTransformScale.matriceElement=globalGeneralSvgReferenceElement.getScreenCTM();
  
  
  globalElementTransformScale.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalElementTransformScale.matriceElementElementInverse.e=0;
  globalElementTransformScale.matriceElementElementInverse.f=0;
  
  globalElementTransformScale.matriceRacine=refZnDessin.getScreenCTM();
  globalElementTransformScale.matriceRacine.e=0;
  globalElementTransformScale.matriceRacine.f=0;
  
  globalElementTransformScale.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  
  globalElementTransformScale.matriceDeplacementPoint=globalElementTransformScale.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  
  globEchelle.dataInit=JSON.parse(globalGeneralReferencePointControleClique.getAttribute('data-init'));
  
  globEchelle.angle=parseFloat(globalGeneralReferencePointControleClique.getAttribute('data-angle'));
  
  globEchelle.ref=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' ce"]')[0];
  globEchelle.centreX=arrdi10000(globEchelle.ref.cx.animVal.value);
  globEchelle.centreY=arrdi10000(globEchelle.ref.cy.animVal.value);
  
  

  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalElementTransformScale.matriceRacineInverse);
 
  globEchelle.deltaxInit=initMouseDownObj.x - globEchelle.centreX;
  globEchelle.deltayInit=initMouseDownObj.y - globEchelle.centreY;

  
  
  globalElementTransformScale.mouseStart=refZnDessin.createSVGPoint();
		globalElementTransformScale.mouseStart.x = e.clientX; 
  globalElementTransformScale.mouseStart.y = e.clientY;
  globalElementTransformScale.mouseStart=globalElementTransformScale.mouseStart.matrixTransform(globalElementTransformScale.matriceRacineInverse);
//  globalElementTransformScale.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };
  globalElementTransformScale.elementStart = { x:globalGeneralReferencePointControleClique.x.animVal.value + globalGeneralReferencePointControleClique.width.animVal.value/2, y:globalGeneralReferencePointControleClique.y.animVal.value + globalGeneralReferencePointControleClique.height.animVal.value / 2 };

  var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
  globalElementTransformScale.tabTransform=convertirTransformEnTableau(tr,['scale']);
  
  
  
  globalElementTransformScale.rectangle=null;
  var rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  if(rectangle){
   globalElementTransformScale.rectangle={
    ref:rectangle,
    x:arrdi10000(parseFloat(rectangle.getAttribute('x'))),
    y:arrdi10000(parseFloat(rectangle.getAttribute('y'))),
    width:arrdi10000(parseFloat(rectangle.getAttribute('width'))),
    height:arrdi10000(parseFloat(rectangle.getAttribute('height'))),
   }
  }

  var sxInit=globalElementTransformScale.tabTransform.tab[globalElementTransformScale.tabTransform.indices.scale][1][0];
  var syInit=globalElementTransformScale.tabTransform.tab[globalElementTransformScale.tabTransform.indices.scale][1][1];
  divlag1.innerHTML='<span>sEZ='+_dssvg.zoom1+'</span>,<span>sx='+arrdi10000(initPosxy.sx)+'</span>,<span>sy='+arrdi10000(initPosxy.sy)+'</span>,<span>ex=' + sxInit+'</span>,<span>ey=' + syInit+'</span>';
  
  return;
  
 }  
 
 

 
 
 //========================================================================================================
 function ajouterPointsDeControlePointsTransformElements(){
  var pt0    = refZnDessin.createSVGPoint();
  var pt1    = refZnDessin.createSVGPoint();
  var pt2    = refZnDessin.createSVGPoint();
  var pt3    = refZnDessin.createSVGPoint();
  var pt4    = refZnDessin.createSVGPoint();
  var pt5    = refZnDessin.createSVGPoint();
  var pt6    = refZnDessin.createSVGPoint();
  var pt7    = refZnDessin.createSVGPoint();
  var pt8    = refZnDessin.createSVGPoint();
  var pt9    = refZnDessin.createSVGPoint();
  var pt10   = refZnDessin.createSVGPoint();
  var ptBoite= refZnDessin.createSVGPoint();
  
  var lst=refZnDessin.querySelectorAll('*');
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='stop' || nn=='filter' || nn=='fegaussianblur'  || nn=='defs' ){
    continue;
   }
   if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours ){
    if(nn==='g'){
     continue;
    }     
   }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
    if(nn!=='g'){
     continue;
    }     
   }
   
   if(lst[i].getAttribute('data-type') && lst[i].getAttribute('data-type')=='systeme'){
    continue;
   }
   
   var col='red';
   if(_dssvg.mode_en_cours==='setModeSaisieDefsTrE1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours ){
    col='yellow';
   }
   
   
   if(lst[i].nodeName==='pattern'){
    continue;
   }
   
    var extensionSymbole=lst[i].getAttribute('data-extensions');
    if(extensionSymbole){
     extensionSymbole=JSON.parse(extensionSymbole);
     if(extensionSymbole.hasOwnProperty('dansSymbol') && extensionSymbole.dansSymbol===true){
      var monClone=lst[i].cloneNode(true);
      refZnDessin.prepend(monClone);
     }
     if(extensionSymbole.hasOwnProperty('dansDefs') && extensionSymbole.dansDefs===true){
      if('setModeSaisieTranE1'===_dssvg.mode_en_cours){
       continue;
      }
      // cas du clipPath et du pattern
      var monClone=lst[i].cloneNode(true);
      var attrTra=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
      var t='';
      try{
       var m=lst[i].getScreenCTM();
//       t='matrix('+m.a+','+m.b+','+m.c+','+m.d+',0,0) scale('+(1/_dssvg.zoom1)+','+(1/_dssvg.zoom1)+')';//'+m.e+','+m.f+')';
      }catch(e){
      }
      
      var idarbre1=lst[i].getAttribute('data-idarbre1');
      monClone.setAttribute('transform',t + ' ' + attrTra );
      monClone.setAttribute('data-idarbre1',idarbre1);
      monClone.setAttribute('data-type','toRemove');
      refZnDessin.prepend(monClone);
     }
    }
   
   
   
   
   try{
    var idarbre1=lst[i].getAttribute('data-idarbre1');
    var bounding=lst[i].getBBox(); // matrix
    var matrix=lst[i].getScreenCTM();
    if(lst[i].parentNode.nodeName==='pattern'){
     continue;
    }
    var matrix=refZnDessin.getScreenCTM().inverse().multiply(lst[i].parentNode.getScreenCTM());
    var transform=(lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'');
    var boite=ajouteElemDansElem(lst[i].parentNode,'rect',{'data-rectangle':idarbre1,transform:transform,'data-type':'toRemove',x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
   }catch(e){
    if(String(e).indexOf('.getBBox is not a function')>=0){
    }else{
    }
   }
  }
  
  
  
  
  var lst=refZnDessin.querySelectorAll('*'); // on a cloné des éléments plus haut
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='stop' || nn=='filter' || nn=='fegaussianblur' ||  nn=='defs' ||  nn=='pattern' ){
    continue;
   }
   
   if(_dssvg.mode_en_cours==='setModeSaisieTranE1' || 'setModeSaisieDefsTrE1' === _dssvg.mode_en_cours ){
    if(nn==='g'){
     continue;
    }     
   }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours ){
    if(nn!=='g'){
     continue;
    }     
   }
   
   
   if(lst[i].getAttribute('data-type') && lst[i].getAttribute('data-type')=='systeme'){
    continue;
   }
   
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieTranE1'  && extensions.dansDefs===true){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsTrE1' && extensions.dansDefs===false){
     continue;
    }
   }catch(e){
   }
   
   
   
   try{
    
    if(!lst[i].getAttribute('data-idarbre1')){
     continue;
    }
    var idarbre1=parseInt(lst[i].getAttribute('data-idarbre1'),10);
    
    if(nn==='radialgradient'){

     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');

     var id=lst[i].getAttribute('id');
     // créer un cercle de visualisation
     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:'+(id!==null?'url(#'+monClone.id+')':'rgba(255,0,0,1)')+';stroke:blue;stroke-width:0;', // fill:url(#f)
       transform:transform
      },
      true // enPremier
     );
     var bounding=cercle.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(cercle.getScreenCTM());
     
    }else if(nn==='lineargradient'){
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');

     var id=lst[i].getAttribute('id');

     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'stroke:url(#'+monClone.id+');stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      },
      true // enPremier
     );
     var bounding=ligne.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(ligne.getScreenCTM());

     
    }else{
    
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
     var bounding=lst[i].getBBox(); // matrix
    }
    
    
    pt1.x=bounding.x;
    pt1.y=bounding.y;
    pt1=pt1.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt2.x=bounding.x+bounding.width;
    pt2.y=bounding.y;
    pt2=pt2.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt3.x=bounding.x+bounding.width;
    pt3.y=bounding.y+bounding.height;  
    pt3=pt3.matrixTransform(matrixRelatifVersAbsolu);
    
    pt4.x=bounding.x;
    pt4.y=bounding.y+bounding.height;  
    pt4=pt4.matrixTransform(matrixRelatifVersAbsolu);
    
    
    
    

    if(_dssvg.idArbreCourant!==null){
     
     if(idarbre1==_dssvg.idArbreCourant){
      
      
      var matrixCascade=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
      var cascade={
       rotate:[],
       scale:[],
       translate:[],
       matrixa:[],
       matrixb:[],
       // skewX
      };
      var elt=lst[i];
      var goon=true;
      while(goon){
       
       if(elt.nodeName.toLowerCase()==='radialgradient'){
        var transform1=elt.getAttribute('gradientTransform')?elt.getAttribute('gradientTransform'):'';
       }else if(elt.nodeName.toLowerCase()==='lineargradient'){
        var transform1=elt.getAttribute('gradientTransform')?elt.getAttribute('gradientTransform'):'';
       }else{
        var transform1=elt.getAttribute('transform')?elt.getAttribute('transform'):'';
       }
       var t1=convertirTransformEnTableau(transform1,['scale','rotate','translate']);

       for(var j=0;j<t1.tab.length;j++){
         if(t1.tab[j][0]=='scale'){
          cascade.scale.push([t1.tab[j][1][0] , t1.tab[j][1][1] ]);
          matrixCascade=matrixCascade.scaleNonUniform(t1.tab[j][1][0] , t1.tab[j][1][1]);
         }else if(t1.tab[j][0]=='rotate'){
          cascade.rotate.push([t1.tab[j][1][0]]);
          matrixCascade=matrixCascade.rotate(t1.tab[j][1][0] , 0 , 0 );
         }else if(t1.tab[j][0]=='translate'){
          cascade.translate.push([t1.tab[j][1][0] , t1.tab[j][1][1] ]);
          matrixCascade=matrixCascade.translate(t1.tab[j][1][0] , 0 , 0 );
         }
         
       }
       cascade.matrixa.push([matrixCascade.a,matrixCascade.b,matrixCascade.c,matrixCascade.d,matrixCascade.e,matrixCascade.f]);
       cascade.matrixb.push(matrixCascade);
       if(elt==refZnDessin){
        goon=false;
       }else{
        elt=elt.parentNode;
        if(elt.nodeName==='defs'){
         goon=false;
        }
       }
      }
      
      var txtCascade1=JSON.stringify(cascade);
      
      
      var matrixParent=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
      for(var j=0;j<cascade.matrixb.length-1;j++){
       matrixParent=matrixParent.multiply(cascade.matrixb[j]);
      }
      var transformationParent=matrixToFnt(matrixParent); // transformationAngle

      var matrixElement=document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
      for(var j=0;j<cascade.matrixb.length;j++){
       matrixElement=matrixElement.multiply(cascade.matrixb[j]);
      }
      var transformationElement=matrixToFnt(matrixElement);           // transformationAngleG

      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'fElementTransformTranslate1','data-angle':transformationParent.angle,'data-angleg':transformationElement.angle-transformationParent.angle,'data-type':'toRemove','data-elem':''+idarbre1+' hg',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(255,255,0,0.5);stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
      dot.addEventListener('mousedown'  , mouseDownTransformTranslate , 'dot');
      dot.addEventListener('touchstart' , touchDownTransformTranslate , 'dot');
      

      var tabRotate=[0,0,0];
      var tabSkew=[0];
      
       if(nn==='radialgradient' || nn==='lineargradient'){
        var transform0=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
       }else{
        var transform0=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
       }
      var t0=convertirTransformEnTableau(transform0,['rotate','skewx']);
      
      tabRotate=t0.tab[t0.indices.rotate][1];
      pt5.x=tabRotate[1];
      pt5.y=tabRotate[2];
      for(var j=t0.indices.rotate+1;j<t0.tab.length;j++){
       if(t0.tab[j][0]=='translate'){
        pt5.x-=t0.tab[j][1][0];
        pt5.y-=t0.tab[j][1][1];
       }
      }
      
      tabSkew=t0.tab[t0.indices.skewx][1];
      
      // pour echelle xy nouveau 3
      // point central de l'échelle basé sur un rectangle 2 2 10 10  + rotate( 90 7 7 ) + translate( 7 7 )   
      pt6.x=0; //bounding.x+bounding.width/2;
      pt6.y=0; // bounding.y+bounding.height/2;
      
      if(nn==='radialgradient' || nn==='lineargradient'){
       var transform0=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
      }else{
       var transform0=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
      }
      var t0=convertirTransformEnTableau(transform0,['scale','rotate']);

      var matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix();
      for(var j=0;j<t0.tab.length;j++){
        if(t0.tab[j][0]=='scale'){
         break;
        }else if(t0.tab[j][0]=='translate'){
         matrix=matrix.translate(t0.tab[j][1][0] , t0.tab[j][1][1] );
        }else if(t0.tab[j][0]=='rotate'){
         matrix=matrix.rotate(t0.tab[j][1][0] , t0.tab[j][1][1] , t0.tab[j][1][2] );
        }
      }
      // petit cercle du centre
      // pt6 est le point dans le parent de l'élément
      pt6=pt6.matrixTransform(matrix);
      
      
//      console.log('t0=',t0);

      // centre de l'échelle
      var toto=refZnDessin.getScreenCTM().inverse().multiply(lst[i].parentNode.getScreenCTM()).inverse();
      var pt7=pt6.matrixTransform(toto);
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{ 'data-type':'toRemove','data-elem':''+idarbre1+' ce',cx:pt7.x,cy:pt7.y,r:rayonPoint/5,style:'fill:lightgreen;opacity:1;stroke:green;stroke-width:'+(1/4/_dssvg.zoom1)+';'});

      var cx=pt7.x
      var cy=pt7.y;


      var tr=matrixToFnt(lst[i].getScreenCTM());
//      var angle0=tr.angle;
      var angle0=t0.tab[t0.indices.rotate][1][0];
      
      
      
      var facteurx=t0.indices.scale>=0?(t0.tab[t0.indices.scale][1][0]):1;
      var facteury=t0.indices.scale>=0?(t0.tab[t0.indices.scale][1][1]):1;
      
//      console.log('facteurx=',facteurx , 'facteury=',facteury , 'angle0=',angle0 );
      
      
      
      pt8.x=cx+125/_dssvg.zoom1*Math.cos((angle0)/180*Math.PI);
      pt8.y=cy+125/_dssvg.zoom1*Math.sin((angle0)/180*Math.PI);
      
      pt9.x=cx+125/_dssvg.zoom1*Math.cos((angle0+90)/180*Math.PI);
      pt9.y=cy+125/_dssvg.zoom1*Math.sin((angle0+90)/180*Math.PI);
      
      var angle1=angle0;
      pt10.x=cx+125/_dssvg.zoom1*Math.cos((angle1+45)/180*Math.PI);
      pt10.y=cy+125/_dssvg.zoom1*Math.sin((angle1+45)/180*Math.PI);
      
      
      var dy2=distanceEntreDroiteEtPoint(cx,cy,pt8.x,pt8.y,pt10.x,pt10.y);
      var dx2=distanceEntreDroiteEtPoint(cx,cy,pt9.x,pt9.y,pt10.x,pt10.y);
      
      
      var line  = ajouteElemDansElem(refZnDessin,'path',{ 'data-type':'toRemove','data-elem':''+idarbre1+'',d:'M '+cx+' '+cy+' L '+pt8.x+' '+pt8.y+'',style:'fill:lightgreen;opacity:0.9;stroke:purple;stroke-width:'+(1/_dssvg.zoom1/1)+';'});

      var line  = ajouteElemDansElem(refZnDessin,'path',{ 'data-type':'toRemove','data-elem':''+idarbre1+'',d:'M '+cx+' '+cy+' L '+pt9.x+' '+pt9.y+'',style:'fill:lightgreen;opacity:0.9;stroke:green;stroke-width:'+(1/_dssvg.zoom1/1)+';'});
      
//      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-action':'felementTransformEchelle3','data-init':'{"angle":'+angle1+',"dx2":'+dx2+',"dy2":'+dy2+',"facteurx":'+facteurx+',"facteury":'+facteury+',"cx":'+cx+',"cy":'+cy+',"t0":'+JSON.stringify(t0)+',"pt8":['+pt8.x+','+pt8.y+'],"pt9":['+pt9.x+','+pt9.y+'],"pt10":['+pt10.x+','+pt10.y+']}','data-type':'toRemove','data-elem':''+idarbre1+' se',cx:pt10.x,cy:pt10.y,r:rayonPoint,style:'fill:lightgreen;opacity:0.9;stroke:green;stroke-width:'+(1/_dssvg.zoom1)+';'});
      var dot    = ajouteElemDansElem(refZnDessin,'rect',{'data-action':'felementTransformEchelle3','data-init':'{"angle":'+angle1+',"dx2":'+dx2+',"dy2":'+dy2+',"facteurx":'+facteurx+',"facteury":'+facteury+',"cx":'+cx+',"cy":'+cy+',"t0":'+JSON.stringify(t0)+',"pt8":['+pt8.x+','+pt8.y+'],"pt9":['+pt9.x+','+pt9.y+'],"pt10":['+pt10.x+','+pt10.y+']}','data-type':'toRemove','data-elem':''+idarbre1+' se',x:(pt10.x-rayonPoint/2),y:(pt10.y-rayonPoint/2),width:rayonPoint*2,height:rayonPoint*2,style:'fill:lightgreen;opacity:0.9;stroke:green;stroke-width:'+(1/_dssvg.zoom1)+';'});
      dot.addEventListener('mousedown'  ,mouseDownElementTransformScale3,'dot');
      dot.addEventListener('touchstart' ,touchDownElementTransformScale3,'dot');
      

      //===============================================================================================
      //===============================================================================================
      // pour angle de la rotation
      
      var t0=convertirTransformEnTableau(transform0,['rotate','skewx']);
      var angleRot=t0.tab[t0.indices.rotate][1][0];
      var angleSkewx=t0.tab[t0.indices.skewx][1][0];
      
      
      
      pt5=pt5.matrixTransform(matrixRelatifVersAbsolu);
      
      // pour centre de la rotation
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' cr',cx:pt5.x,cy:pt5.y,r:rayonPoint,style:'fill:plum;opacity:0.5;stroke:red;stroke-width:'+(2/_dssvg.zoom1)+';','data-action':'fElementTransformCentreRotation'});
      dot.addEventListener( 'mousedown'  , mouseDownRotatePosCentreTransformElement , 'dot' );
      dot.addEventListener( 'touchstart' , touchDownRotatePosCentreTransformElement , 'dot' );
      
      
      pt8.x=pt5.x+100/_dssvg.zoom1*Math.cos((angleRot)/180*Math.PI);
      pt8.y=pt5.y+100/_dssvg.zoom1*Math.sin((angleRot)/180*Math.PI);
      
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-init':'{"angleRot":'+angleRot+',"crx":'+pt5.x+',"cry":'+pt5.y+',"px":'+pt8.x+',"py":'+pt8.y+',"action":"actionDownRotateTransformAngleElement2,fElementTransformAngle2"}','data-type':'toRemove','data-elem':''+idarbre1+' an',cx:pt8.x,cy:pt8.y,r:rayonPoint,style:'fill:plum;opacity:0.5;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';'});
      dot.addEventListener( 'mousedown'  , mouseDownRotateAngleTransformElement2 , 'dot' );
      dot.addEventListener( 'touchstart' , touchDownRotateAngleTransformElement2 , 'dot' );
      

      // pour angle skewx
      var posx=pt5.x+(150/_dssvg.zoom1)*Math.cos((angleRot+90-angleSkewx)/180*Math.PI);
      var posy=pt5.y+(150/_dssvg.zoom1)*Math.sin((angleRot+90-angleSkewx)/180*Math.PI);
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' sk',cx:posx,cy:posy,r:rayonPoint,style:'fill:#2196f3;opacity:0.5;stroke:red;stroke-width:'+(1/_dssvg.zoom1)+';','data-action':'fElementTransformSkewx'});
      dot.addEventListener( 'mousedown'  , mouseDownSkewxTransformElement , 'dot' );
      dot.addEventListener( 'touchstart' , touchDownSkewxTransformElement , 'dot' );

      



     }else{
      
      var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt1.x-6/_dssvg.zoom1,y:pt1.y-3/_dssvg.zoom1,style:'fill:white;stroke:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' hg',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(255,0,0,0.2);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';','data-action':'selectionnerElementAtransformer'});
      dot.addEventListener('mousedown',selectionnerElementAtransformer,'dot');
      dot.addEventListener('touchstart',selectionnerElementAtransformer,'dot');

      
     }
    }else{
     var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt1.x-6/_dssvg.zoom1,y:pt1.y-3/_dssvg.zoom1,style:'fill:transparent;white:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
     var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' hg',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(255,0,0,0.2);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';','data-action':'selectionnerElementAtransformer'});
     dot.addEventListener('mousedown',selectionnerElementAtransformer,'dot');
     dot.addEventListener('touchstart',selectionnerElementAtransformer,'dot');
    }
    
   }catch(e){
    if(0===1 ){
    }else if(String(e).indexOf('getScreenCTM is not a function')>=0 ){
     var nn=lst[i].nodeName;
     if(
      nn==='cc:requires' || nn==='cc:permits' || nn==='cc:prohibits' || nn==='cc:agent' || nn==='cc:license'  || nn==='cc:work' || 
      nn==='dc:description' || nn==='dc:format' || nn==='dc:type'  || nn==='dc:title' || nn==='dc:creator'  || nn==='dc:date' ||
      nn==='metadata' || nn==='title' || nn==='desc' ||  nn==='rdf:rdf'  
     ){
     }else{
     }
    }else{
    }
   }
  }
 }
 //========================================================================================================
 //========================================================================================================
 function actionMoveSelectionPtElement(e){ // ecran_appuye='deplacementPoint';
  

  
  initPosxy=positionSouris(e); // globalElementTransformSkewx
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalEditionPoints.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalEditionPoints.mouseStart.x;
  pt0.y = current.y - globalEditionPoints.mouseStart.y;

  var newPointX=globalEditionPoints.elementStart.x+pt0.x;
  var newPointY=globalEditionPoints.elementStart.y+pt0.y;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );
  
  var newPointX=globalEditionPoints.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalEditionPoints.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );

  var deltaRel=refZnDessin.createSVGPoint();  
  deltaRel=pt0.matrixTransform(globalEditionPoints.matriceElementElementInverse).matrixTransform(globalEditionPoints.matriceRacine);
  deltaRel.x=deltaRel.x/_dssvg.parametres.diviseurDeplacement;
  deltaRel.y=deltaRel.y/_dssvg.parametres.diviseurDeplacement;


  if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='lineargradient'){

   if(globalEditionPoints.tableauIndcesPoints[0]==0){
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[0]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[1]+deltaRel.y);
    globalGeneralSvgReferenceElement.setAttribute('x1',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['x1']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('y1',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['y1']=newPosy1;
    
    if(globalEditionPoints.autreReference!==null){

     globalEditionPoints.autreReference.setAttribute('x1'  ,newPosx1);
     globalEditionPoints.autreReference.setAttribute('y1'  ,newPosy1);
     globalEditionPoints.autreReferenceInverse.setAttribute('x1',newPosx1);
     globalEditionPoints.autreReferenceInverse.setAttribute('y1',newPosy1);
     
    }
    
    divLag1Pour({t:'dppLiZ',l:'dppLiZ','x1':newPosx1,'y1':newPosy1});
    
    
   }else if(globalEditionPoints.tableauIndcesPoints[0]==2){
    
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[2]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[3]+deltaRel.y);
    globalGeneralSvgReferenceElement.setAttribute('x2',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['x2']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('y2',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['y2']=newPosy1;

    if(globalEditionPoints.autreReference!==null){
     globalEditionPoints.autreReference.setAttribute('x2'  ,newPosx1);
     globalEditionPoints.autreReference.setAttribute('y2'  ,newPosy1);
     globalEditionPoints.autreReferenceInverse.setAttribute('x2',newPosx1);
     globalEditionPoints.autreReferenceInverse.setAttribute('y2',newPosy1);
     
    }
    divLag1Pour({t:'dppLiZ',l:'dppLiZ','x2':newPosx1,'y2':newPosy1});
    

    
   }
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image' ){
   
   if(globalEditionPoints.tableauIndcesPoints[0]==0){
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[0]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[1]+deltaRel.y);
    globalGeneralSvgReferenceElement.setAttribute('x',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['x']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('y',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['y']=newPosy1;

    divLag1Pour({t:'dppReZ',l:'dppReZ','x':newPosx1,'y':newPosy1});
    
    
   }else if(globalEditionPoints.tableauIndcesPoints[0]==2){
    
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[2]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[3]+deltaRel.y);
    if(newPosx1>=0){
     globalGeneralSvgReferenceElement.setAttribute('width',newPosx1);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['width']=newPosx1;
    }
    if(newPosy1>=0){
     globalGeneralSvgReferenceElement.setAttribute('height',newPosy1);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['height']=newPosy1;
    }
    divLag1Pour({t:'dppReZ',l:'dppReZ','w':newPosx1,'h':newPosy1});
   }
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='ellipse'){

   if(globalEditionPoints.tableauIndcesPoints[0]==0){
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[0]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[1]+deltaRel.y);

    globalGeneralSvgReferenceElement.setAttribute('cx',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['cx']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('cy',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['cy']=newPosy1;
    
    divLag1Pour({t:'dppElZ',l:'dppElZ','cx':arrdi10000(newPosx1),'cy':arrdi10000(newPosy1)});
    
   }else if(globalEditionPoints.tableauIndcesPoints[0]==2){
   
    var newRx=arrdi10000(globalSelectionPoints.tabAbsolu[2]+deltaRel.x);
    if(newRx>=0){
     globalGeneralSvgReferenceElement.setAttribute('rx',newRx);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['rx']=newRx;
    }
    var newRy=arrdi10000(globalSelectionPoints.tabAbsolu[3]+deltaRel.y);
    if(newRy>=0){
     globalGeneralSvgReferenceElement.setAttribute('ry',newRy);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['ry']=newRy;
    }

    divLag1Pour({t:'dppElZ',l:'dppElZ','rx':arrdi10000(newRx),'ry':arrdi10000(newRy)});
   }
 
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='circle' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='radialgradient' ){
   
   
   if(globalEditionPoints.tableauIndcesPoints[0]==0){
    var newPosx1=arrdi10000(globalSelectionPoints.tabAbsolu[0]+deltaRel.x);
    var newPosy1=arrdi10000(globalSelectionPoints.tabAbsolu[1]+deltaRel.y);

    globalGeneralSvgReferenceElement.setAttribute('cx',newPosx1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['cx']=newPosx1;
    globalGeneralSvgReferenceElement.setAttribute('cy',newPosy1);
    _dssvg.arbre0[globalIndiceArbre].data.attributes['cy']=newPosy1;

    if(globalEditionPoints.autreReference!==null){

     globalEditionPoints.autreReference.setAttribute('cx'  ,newPosx1);
     globalEditionPoints.autreReference.setAttribute('cy'  ,newPosy1);
     if(globalEditionPoints.autreReferenceInverse!==undefined){
      globalEditionPoints.autreReferenceInverse.setAttribute('cx',newPosx1);
      globalEditionPoints.autreReferenceInverse.setAttribute('cy',newPosy1);
     }
     
    }
    
    divLag1Pour({t:'dppCeZ',l:'dppCeZ','cx':newPosx1,'cy':newPosy1});
    
   }else if(globalEditionPoints.tableauIndcesPoints[0]==2){
    
    var newR=arrdi10000(globalSelectionPoints.tabAbsolu[2]+(deltaRel.x+deltaRel.y)/2);
    if(newR>=0){
     globalGeneralSvgReferenceElement.setAttribute('r',newR);
     _dssvg.arbre0[globalIndiceArbre].data.attributes['r']=newR;
     if(globalEditionPoints.autreReference!==null){

      globalEditionPoints.autreReference.setAttribute('r'  ,newR);
      if(globalEditionPoints.autreReferenceInverse!==undefined){
       globalEditionPoints.autreReferenceInverse.setAttribute('r',newR);
      }
     }
     divLag1Pour({t:'dppCeZ',l:'dppCeZ','r':newR});
    }
   }
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){
   var tt='';
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
    if(i==globalEditionPoints.tableauIndcesPoints[0]){
     var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i]+deltaRel.x);
     var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i+1]+deltaRel.y);
     tt+='  '+newPosx1+' '+(newPosy1)+'  ';
     divLag1Pour({t:'dppPlZ',l:'dppPlZ','x':newPosx1,'y':newPosy1});
    }else{
     tt+=' '+globalSelectionPoints.tabOriginal[i]+' '+globalSelectionPoints.tabOriginal[i+1];
    }
   }
 		globalGeneralSvgReferenceElement.setAttribute('points',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){
   var tt='';
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
    if(i==globalEditionPoints.tableauIndcesPoints[0]){
     
     var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i]+deltaRel.x);
     var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i+1]+deltaRel.y);
     divlag1.innerHTML='<span>plygZ='+_dssvg.zoom1+'</span>,<span style="color:red;">x='+arrdi10000(newPosx1)+ '</span>,<span style="color:red;">y=' +arrdi10000(newPosy1)+'</span>';
     tt+='  '+newPosx1+' '+(newPosy1)+'  ';
     
     divLag1Pour({t:'dppPgZ',l:'dppPgZ','x':newPosx1,'y':newPosy1});
     
    }else{
     tt+=' '+globalSelectionPoints.tabOriginal[i]+' '+globalSelectionPoints.tabOriginal[i+1];
    }
   }
 		globalGeneralSvgReferenceElement.setAttribute('points',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   
   
   divlag1.innerHTML='<span>a1Z='+_dssvg.zoom1+'</span>,<span>x='+arrdi10000(newPointX)+ '</span>,<span>y=' +arrdi10000(newPointY)+'</span>,<span>x=' + arrdi10000(globalGeneralReferencePointControleClique.cx.animVal.value)+'</span>,<span>y=' + arrdi10000(globalGeneralReferencePointControleClique.cy.animVal.value)+'</span>';
   
   var tt='';
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i++){
    if(i==globalEditionPoints.tableauIndcesPoints[0]){
     if(globalSelectionPoints.tabOriginal[i][0]=='M' || globalSelectionPoints.tabOriginal[i][0]=='L' || globalSelectionPoints.tabOriginal[i][0]=='m'  || globalSelectionPoints.tabOriginal[i][0]=='l' ){

      var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
      var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][2]+deltaRel.y);
      
      tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' '+(newPosy1)+' ';
      if(globalEditionPoints.refLignesPointsDeControle1){
       // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
       
       globalEditionPoints.tabInit1[1]=newPointX;
       globalEditionPoints.tabInit1[2]=newPointY;
       globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       
       
      }

      divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='h' || globalSelectionPoints.tabOriginal[i][0]=='H' ){

      var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
      
      tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' ';
      if(globalEditionPoints.refLignesPointsDeControle1){
       
       globalEditionPoints.tabInit1[1]=newPointX;
       globalEditionPoints.tabInit1[2]=newPointY;
       globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
      }
      divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1});
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='v' || globalSelectionPoints.tabOriginal[i][0]=='V' ){

      var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.y);
      
      tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosy1)+' ';
      if(globalEditionPoints.refLignesPointsDeControle1){
       
       globalEditionPoints.tabInit1[1]=newPointX;
       globalEditionPoints.tabInit1[2]=newPointY;
       globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
      }
      divLag1Pour({t:'dppChZ',l:'dppChZ','y':newPosy1});
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='a' || globalSelectionPoints.tabOriginal[i][0]=='A' ){

      if(globalEditionPoints.tableauIndcesPoints[1]==6){
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][6]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][7]+deltaRel.y);
       
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(globalSelectionPoints.tabOriginal[i][3])+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(globalSelectionPoints.tabOriginal[i][5])+' '+(newPosx1)+' '+(newPosy1)+' ';
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
       
      }else if(globalEditionPoints.tableauIndcesPoints[1]==3){
       
       var angleOriginal=globalEditionPoints.tableauIndcesPoints[2];
       var px1=globalEditionPoints.tableauIndcesPoints[3];
       var py1=globalEditionPoints.tableauIndcesPoints[4];
       var ancienAnglePoints=globalEditionPoints.tableauIndcesPoints[5];

       var nouvelAnglePoints=angle2Points(px1,py1,newPointX,newPointY);
       var deltaAngle=ancienAnglePoints-nouvelAnglePoints;
       var nouvelAngle=angleOriginal+deltaAngle;
       nouvelAngle=arrdi10000(nouvelAngle);
       if(nouvelAngle>=360){
        nouvelAngle-=360*parseInt(nouvelAngle/360,10);
       }
       if(nouvelAngle<=-360){
        nouvelAngle+=360*Math.abs(parseInt(nouvelAngle/360,10));
       }

       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(nouvelAngle)+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(globalSelectionPoints.tabOriginal[i][5])+' '+(globalSelectionPoints.tabOriginal[i][6])+' '+(globalSelectionPoints.tabOriginal[i][7])+' ';

       divLag1Pour({t:'dppChZ',l:'dppChZ','a':nouvelAngle});
      

      }else if(globalEditionPoints.tableauIndcesPoints[1]==1){
       // points pour gérer rx et ry
       
       var rayonOriginal=globalEditionPoints.tableauIndcesPoints[2];
       var px1=globalEditionPoints.tableauIndcesPoints[3];
       var py1=globalEditionPoints.tableauIndcesPoints[4];
       var nouvelleDistanceAbsolue=Math.sqrt((newPointX-px1)*(newPointX-px1)+(newPointY-py1)*(newPointY-py1));
       nouvelleDistanceAbsolue=arrdi10000(nouvelleDistanceAbsolue);
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(nouvelleDistanceAbsolue)           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(globalSelectionPoints.tabOriginal[i][3])+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(globalSelectionPoints.tabOriginal[i][5])+' '+(globalSelectionPoints.tabOriginal[i][6])+' '+(globalSelectionPoints.tabOriginal[i][7])+' ';
       
       divLag1Pour({t:'dppChZ',l:'dppChZ','rx':nouvelleDistanceAbsolue});

      }else if(globalEditionPoints.tableauIndcesPoints[1]==2){
       
       var rayonOriginal=globalEditionPoints.tableauIndcesPoints[2];
       var px1=globalEditionPoints.tableauIndcesPoints[3];
       var py1=globalEditionPoints.tableauIndcesPoints[4];
       var nouvelleDistanceAbsolue=Math.sqrt((newPointX-px1)*(newPointX-px1)+(newPointY-py1)*(newPointY-py1));
       nouvelleDistanceAbsolue=arrdi10000(nouvelleDistanceAbsolue);

       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(nouvelleDistanceAbsolue)           +' '+(globalSelectionPoints.tabOriginal[i][3])+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(globalSelectionPoints.tabOriginal[i][5])+' '+(globalSelectionPoints.tabOriginal[i][6])+' '+(globalSelectionPoints.tabOriginal[i][7])+' ';
       
       divLag1Pour({t:'dppChZ',l:'dppChZ','ry':nouvelleDistanceAbsolue});
      }
      
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='t' || globalSelectionPoints.tabOriginal[i][0]=='T' ){
      
      
      var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
      var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][2]+deltaRel.y);
      tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' '+(newPosy1)+' ';
      
      divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='q' || globalSelectionPoints.tabOriginal[i][0]=='Q'  || globalSelectionPoints.tabOriginal[i][0]=='s'  || globalSelectionPoints.tabOriginal[i][0]=='S' ){
      
      
      if(globalEditionPoints.tableauIndcesPoints[1]==1){
       
       // point de controle 
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][2]+deltaRel.y);
       tt+=globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' '+(newPosy1)+' '+(globalSelectionPoints.tabOriginal[i][3])           +' '+(globalSelectionPoints.tabOriginal[i][4])           +' ';
       
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
       
       if(globalEditionPoints.refLignesPointsDeControle1){
        globalEditionPoints.tabInit1[4]=newPointX;
        globalEditionPoints.tabInit1[5]=newPointY;
        globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       }
       
       if(globalEditionPoints.refLignesPointsDeControle2){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit2[4]=newPointX;
        globalEditionPoints.tabInit2[5]=newPointY;
        globalEditionPoints.refLignesPointsDeControle2.setAttribute('d',globalEditionPoints.tabInit2.join(' ') );
       }
       
       
      }else if(globalEditionPoints.tableauIndcesPoints[1]==3){
       
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][3]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][4]+deltaRel.y);
       // point de fin
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(newPosx1)+' '+(newPosy1)+' '+' ';
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
      }
      
      
     }else if(globalSelectionPoints.tabOriginal[i][0]=='c' || globalSelectionPoints.tabOriginal[i][0]=='C' ){
      
      
      if(globalEditionPoints.tableauIndcesPoints[1]==1){
       
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][1]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][2]+deltaRel.y);
       // premier point de contrôle
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(newPosx1)+' '+(newPosy1)+' '+(globalSelectionPoints.tabOriginal[i][3])           +' '+(globalSelectionPoints.tabOriginal[i][4])           +' '+(globalSelectionPoints.tabOriginal[i][5])           +' '+(globalSelectionPoints.tabOriginal[i][6])          +' ';
       
       if(globalEditionPoints.refLignesPointsDeControle1){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit1[4]=newPointX;
        globalEditionPoints.tabInit1[5]=newPointY;
        globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       }
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
       
       
       
      }else if(globalEditionPoints.tableauIndcesPoints[1]==3){
       
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][3]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][4]+deltaRel.y);
       // deuxième point de contrôle
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(newPosx1)+' '+(newPosy1)+' '+(globalSelectionPoints.tabOriginal[i][5])           +' '+(globalSelectionPoints.tabOriginal[i][6])+' ';
       
       if(globalEditionPoints.refLignesPointsDeControle1){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit1[4]=newPointX;
        globalEditionPoints.tabInit1[5]=newPointY;
        globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       }
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});

      }else if(globalEditionPoints.tableauIndcesPoints[1]==5){

       // point final
       var newPosx1=arrdi10000(globalSelectionPoints.tabOriginal[i][5]+deltaRel.x);
       var newPosy1=arrdi10000(globalSelectionPoints.tabOriginal[i][6]+deltaRel.y);
       tt+=' '+globalSelectionPoints.tabOriginal[i][0]+' '+(globalSelectionPoints.tabOriginal[i][1])           +' '+(globalSelectionPoints.tabOriginal[i][2])           +' '+(globalSelectionPoints.tabOriginal[i][3])+' '+(globalSelectionPoints.tabOriginal[i][4])+' '+(newPosx1)+' '+(newPosy1)+' ';
       
       if(globalEditionPoints.refLignesPointsDeControle1){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit1[1]=newPointX;
        globalEditionPoints.tabInit1[2]=newPointY;
        globalEditionPoints.refLignesPointsDeControle1.setAttribute('d',globalEditionPoints.tabInit1.join(' ') );
       }
       
       if(globalEditionPoints.refLignesPointsDeControle2){
        // ['M', '41.25', '-137.75', 'L', '11', '-144.4199981689453']
        globalEditionPoints.tabInit2[1]=newPointX;
        globalEditionPoints.tabInit2[2]=newPointY;
        globalEditionPoints.refLignesPointsDeControle2.setAttribute('d',globalEditionPoints.tabInit2.join(' ') );
       }
       divLag1Pour({t:'dppChZ',l:'dppChZ','x':newPosx1,'y':newPosy1});
       
      }
      
     }else{
      console.warn('non traité 1 : ', globalSelectionPoints.tabOriginal[i] );
      tt+=' '+globalSelectionPoints.tabOriginal[i].join(' ');
     }
    }else{

     tt+=' '+globalSelectionPoints.tabOriginal[i].join(' ');
    }
   }

 		globalGeneralSvgReferenceElement.setAttribute('d',tt); // _dssvg.idArbreCourant
   _dssvg.arbre0[globalIndiceArbre].data.attributes['d']=tt;

  }
  if(globalEditionPoints.referenceRectangle){
   var bounding=globalGeneralSvgReferenceElement.getBBox(); // matrix
   globalEditionPoints.referenceRectangle.setAttribute('x',bounding.x);
   globalEditionPoints.referenceRectangle.setAttribute('y',bounding.y);
   globalEditionPoints.referenceRectangle.setAttribute('width',bounding.width);
   globalEditionPoints.referenceRectangle.setAttribute('height',bounding.height);
  }
  
  
 }
 //========================================================================================================
 var globalEditionPoints={
  tableauIndcesPoints          : null,
  referenceRectangle           : null,
  matriceElementElementInverse : null,
  matriceRacine                : null,
  matriceRacineInverse         : null,
  matriceDeplacementPoint      : null,
  mouseStart                   : null,
  elementStart                 : null,
  matriceAbsolueInverse        : null,
  matriceSvgInverse            : null,
  refLignesPointsDeControle1   : null,
  refLignesPointsDeControle2   : null,
  tabInit1                     : null,
  tabInit2                     : null,
  autreReference               : null,
  autreReferenceInverse        : null,
 };
 //========================================================================================================
 function touchDownSelectionPtElement(e){
  e.stopPropagation();
  actionDownSelectionPtElement(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownSelectionPtElement(e){
  e.stopPropagation();
  actionDownSelectionPtElement(e);
 }
  ///========================================================================================================
  ///========================================================================================================
 function actionDownSelectionPtElement(e){
  
  
  initPosxy=positionSouris(e);
  ecran_appuye='deplacementPoint';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  _dssvg.idArbreCourant=parseInt(e.target.getAttribute('data-elem'),10);
  
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]')[0];
  
  globalEditionPoints.autreReference=null; // pour le radialGradient
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  if(globalGeneralSvgReferenceElement.length>1){
   globalEditionPoints.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
   globalEditionPoints.autreReferenceInverse=document.querySelectorAll('[id="inverse_de_'+_dssvg.idArbreCourant+'"]')[0];

  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
  
  globalIndicePoint=parseInt(globalGeneralReferencePointControleClique.getAttribute('data-indicepoint'),10);
  
  globalEditionPoints.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalEditionPoints.matriceElementElementInverse.e=0;
  globalEditionPoints.matriceElementElementInverse.f=0;
  
  globalEditionPoints.matriceRacine=refZnDessin.getScreenCTM();
  globalEditionPoints.matriceRacine.e=0;
  globalEditionPoints.matriceRacine.f=0;
  
  globalEditionPoints.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();

  globalEditionPoints.matriceDeplacementPoint=globalEditionPoints.matriceRacineInverse.multiply(globalGeneralReferencePointControleClique.getScreenCTM()).inverse();
  globalEditionPoints.matriceDeplacementPoint.e=0;
  globalEditionPoints.matriceDeplacementPoint.f=0;
  
  
  globalEditionPoints.mouseStart=refZnDessin.createSVGPoint();
		globalEditionPoints.mouseStart.x = e.clientX; 
  globalEditionPoints.mouseStart.y = e.clientY;
  globalEditionPoints.mouseStart=globalEditionPoints.mouseStart.matrixTransform(globalEditionPoints.matriceRacineInverse);
  globalEditionPoints.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };

  
  
  divlag1.innerHTML='<span>b1Z='+_dssvg.zoom1+'</span>,<span>sx='+arrdi10000(initPosxy.sx) + '</span>,<span>sy=' + arrdi10000(initPosxy.sy)+'</span>,<span>x=' + arrdi10000(globalGeneralReferencePointControleClique.cx.animVal.value)+'</span>,<span>y=' + arrdi10000(globalGeneralReferencePointControleClique.cy.animVal.value)+'</span>';

  globalEditionPoints.tableauIndcesPoints=e.target.getAttribute('data-indice').split(',').map(Number);
  globalEditionPoints.referenceRectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  
  globalEditionPoints.matriceSvgInverse=refZnDessin.getScreenCTM().inverse();
  
  
  globalEditionPoints.matriceAbsolueInverse=refZnDessin.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.getScreenCTM()).inverse();
  globalEditionPoints.matriceAbsolueInverse.e=0;
  globalEditionPoints.matriceAbsolueInverse.f=0;
  
  globalEditionPoints.refLignesPointsDeControle1=null;
  
  var recherche1=globalGeneralReferencePointControleClique.getAttribute('data-recherche1');
  if(recherche1 && recherche1!==''){
   globalEditionPoints.refLignesPointsDeControle1=document.querySelectorAll('[data-indice="'+recherche1+'"]')[0];
   if(globalEditionPoints.refLignesPointsDeControle1){
      globalEditionPoints.tabInit1=String(globalEditionPoints.refLignesPointsDeControle1.getAttribute('d')).replace(/ /g,',').replace(/,,/g,',').split(',');
   }
  }

  globalEditionPoints.refLignesPointsDeControle2=null;
  var recherche2=globalGeneralReferencePointControleClique.getAttribute('data-recherche2');
  if(recherche2 && recherche2!==''){
   globalEditionPoints.refLignesPointsDeControle2=document.querySelectorAll('[data-indice="'+recherche2+'"]')[0];
   if(globalEditionPoints.refLignesPointsDeControle2){
    globalEditionPoints.tabInit2=String(globalEditionPoints.refLignesPointsDeControle2.getAttribute('d')).replace(/ /g,',').replace(/,,/g,',').split(',');
   }
  }
 }
 
 //========================================================================================================
 function poigneeAffichable(x,y){
  var afficherObjet=true;
  if(x<_dssvg.viewBoxInit[0]){
   afficherObjet=false;
  }else if(x>(_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2])){
   afficherObjet=false;
  }else if(y<_dssvg.viewBoxInit[1]){
   afficherObjet=false;
  }else if(y>(_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3])){
   afficherObjet=false;
  }
  return afficherObjet;
 }
 
 //========================================================================================================
 function affichePtsControlDetailDeElement(type){

  var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.getScreenCTM());
  matrixRelatifVersAbsolu=matrixRelatifVersAbsolu;
  var pt0    = refZnDessin.createSVGPoint();
  var ptC2   = refZnDessin.createSVGPoint();
  var ptC1   = refZnDessin.createSVGPoint();
  var ptPrec = refZnDessin.createSVGPoint();
  var pointFixePrecedent={x:0,y:0};
  
  var filcol='rgba(0,0,255,0.5)';
  var strokWit=1;
  var strk='stroke:red';
  
  var extensionSymbole=globalGeneralSvgReferenceElement.getAttribute('data-extensions');
  if(extensionSymbole){
   extensionSymbole=JSON.parse(extensionSymbole);
   if(extensionSymbole.hasOwnProperty('dansSymbol') && extensionSymbole.dansSymbol===true){
    var monClone=globalGeneralSvgReferenceElement.cloneNode(true);
    refZnDessin.prepend(monClone);
   }
  }
  
  if(type=='ellipse'){
   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   
   filcol='rgba(0,128,0,0.5)';
   ptC1.x=globalSelectionPoints.tabAbsolu[0]+globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[1]+globalSelectionPoints.tabAbsolu[3];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-fnt':'actionMoveSelectionPtElement',cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,3',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }

  }else if(type=='circle' || 'radialgradient'===type ){
    
   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:yellow;'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   
   filcol='rgba(0,128,0,0.5)';
   ptC1.x=globalSelectionPoints.tabAbsolu[0]+globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[1]+globalSelectionPoints.tabAbsolu[2];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,2','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }

  }else if(type=='line' || 'lineargradient'===type){

   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
   }

   ptC1.x=globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[3];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,3','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
   }

  }else if( type=='image' ){

   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
   }
   
   filcol='rgba(0,128,0,0.5)';
   ptC1.x=globalSelectionPoints.tabAbsolu[0]+globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[1]+globalSelectionPoints.tabAbsolu[3];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,3','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   
  }else if(type=='rect'){
   filcol='rgba(221,160,221,0.5)';
   pt0.x=globalSelectionPoints.tabAbsolu[0];
   pt0.y=globalSelectionPoints.tabAbsolu[1];
   pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(pt0.x,pt0.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'0,1','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   
   filcol='rgba(0,128,0,0.5)';
   ptC1.x=globalSelectionPoints.tabAbsolu[0]+globalSelectionPoints.tabAbsolu[2];
   ptC1.y=globalSelectionPoints.tabAbsolu[1]+globalSelectionPoints.tabAbsolu[3];
   ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

   if(poigneeAffichable(ptC1.x,ptC1.y)){
    var dot = ajouteElemDansElem(refZnDessin,'circle',{cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'2,3','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
    dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
   }
   

  }else if(type=='polyline'){
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
    filcol='rgba(0,0,255,0.5)';
    strokWit=1;
    if(i==0){
     filcol='yellow';
     strokWit=2;
    }
    strk='stroke:red';
    pt0.x=globalSelectionPoints.tabOriginal[i];
    pt0.y=globalSelectionPoints.tabOriginal[i+1];
    pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

    if(poigneeAffichable(pt0.x,pt0.y)){
     var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-fnt':'actionMoveSelectionPtElement','data-indicepoint':i,'data-indice':i,cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
     dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
     dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
    }


   }

  }else if(type=='polygon'){
   for(var i=0;i<globalSelectionPoints.tabOriginal.length;i+=2){
    filcol='rgba(0,0,255,0.5)';
    strokWit=1;
    if(i==0){
     filcol='rgba(221,160,221,0.5)';
     strokWit=3;
    }
    strk='stroke:red';
    pt0.x=globalSelectionPoints.tabOriginal[i];
    pt0.y=globalSelectionPoints.tabOriginal[i+1];
    pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

    if(poigneeAffichable(pt0.x,pt0.y)){
     var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-fnt':'actionMoveSelectionPtElement','data-indicepoint':i,'data-indice':i,cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,r:rayonPoint,style:'fill:'+filcol+';'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
     dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
     dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
    }


   }

  }else if(type=='path'){
   
   for(var i=0;i<globalSelectionPoints.tabAbsolu.length;i++){
    filcol='rgba(0,0,255,0.5)';
    strokWit=1;
    if(i==0){
     filcol='yellow';
     strokWit=2;
    }
    
    strk='stroke:red';
    if(globalSelectionPoints.tabOriginal[i][0]===globalSelectionPoints.tabOriginal[i][0].toLowerCase()){
     strk='stroke:yellow';
    }
    
    if(globalSelectionPoints.tabAbsolu[i][0]=='L' || globalSelectionPoints.tabAbsolu[i][0]=='M' || (globalSelectionPoints.tabAbsolu[i][0]=='m' && i==0)){
     
     pt0.x=globalSelectionPoints.tabAbsolu[i][1];
     pt0.y=globalSelectionPoints.tabAbsolu[i][2];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     var recherche1='';
     if(i<globalSelectionPoints.tabAbsolu.length-2 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche1='C1,'+(i+1);
     }
     
      
     if(poigneeAffichable(pt0.x,pt0.y)){
      if(globalSelectionPoints.tabAbsolu[i][0]=='M'){
       strokWit=4;
      }
      var dot = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,cx:pt0.x,cy:pt0.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':recherche1,'data-indice':i+',1,2','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';opacity:0.7;'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
     }
     
     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][1];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][2];
     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='A' ){

     pt0.x=globalSelectionPoints.tabAbsolu[i][6];
     pt0.y=globalSelectionPoints.tabAbsolu[i][7];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);
     
     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':i+',6,7','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
     }




     // points pour gérer la rotation
     ptPrec.x=pointFixePrecedent.x;
     ptPrec.y=pointFixePrecedent.y;
     ptPrec=ptPrec.matrixTransform(matrixRelatifVersAbsolu);

     var angleEntreLesDeuxPointsDeArc=angle2Points(ptPrec.x,ptPrec.y,pt0.x,pt0.y);
     
     // point au milieu du segment     
     var px1=(pt0.x+ptPrec.x)/2;
     var py1=(pt0.y+ptPrec.y)/2;
     
     if(poigneeAffichable(px1,py1)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-fnt':'actionMoveSelectionPtElement',cx:px1,cy:py1,r:rayonPoint/3,style:'fill:rgba(128,128,128,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1/3)+';'}); // pink
     }

     // point de définition de l'angle     
     var px2=px1+100/_dssvg.zoom1*Math.cos((globalSelectionPoints.tabAbsolu[i][3]-angleEntreLesDeuxPointsDeArc+90)*Math.PI/180);
     var py2=py1+100/_dssvg.zoom1*Math.sin((globalSelectionPoints.tabAbsolu[i][3]-angleEntreLesDeuxPointsDeArc+90)*Math.PI/180);
     
     if(poigneeAffichable(px1,py1) || poigneeAffichable(px2,py2) ){
      var line1 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+px1+ ' '+py1+ ' L ' + px2 + ' ' + py2 +'',style:'fill:transparent;stroke:#444; stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

     // ligne pour angle 0     
     var px3=px1+100/_dssvg.zoom1*Math.cos((90-angleEntreLesDeuxPointsDeArc)*Math.PI/180);
     var py3=py1+100/_dssvg.zoom1*Math.sin((90-angleEntreLesDeuxPointsDeArc)*Math.PI/180);

     if(poigneeAffichable(px1,py1) || poigneeAffichable(px3,py3) ){
      var line1 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+px1+ ' '+py1+ ' L ' + px3 + ' ' + py3 +'',style:'fill:transparent;stroke:#444; stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

     var ancienAngle=angle2Points(px1,py1,px2,py2);

     if(poigneeAffichable(px2,py2)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':i+',3,'+globalSelectionPoints.tabAbsolu[i][3]+','+px1+','+py1+','+ancienAngle+','+angleEntreLesDeuxPointsDeArc+'','data-fnt':'actionMoveSelectionPtElement',cx:px2,cy:py2,r:rayonPoint,style:'fill:rgba(128,128,128,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1/3)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

    // points pour gérer rx et ry
     var px4=px1+globalSelectionPoints.tabAbsolu[i][1]*Math.cos((angleEntreLesDeuxPointsDeArc+ancienAngle-90)*Math.PI/180);
     var py4=py1+globalSelectionPoints.tabAbsolu[i][1]*Math.sin((angleEntreLesDeuxPointsDeArc+ancienAngle-90)*Math.PI/180); //+globalSelectionPoints.tabAbsolu[i][1]*Math.sin((angleEntreLesDeuxPointsDeArc)*Math.PI/180);
     if(poigneeAffichable(px4,py4)){
      var dotrx    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':i+',1,'+globalSelectionPoints.tabAbsolu[i][1]+','+px1+','+py1+'','data-fnt':'actionMoveSelectionPtElement',cx:px4,cy:py4,r:rayonPoint,style:'fill:purple;opacity:0.5;stroke:purple;stroke-width:'+(strokWit/_dssvg.zoom1/3)+';'}); // pink
      dotrx.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dotrx.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }
     
     if(poigneeAffichable(px1,py1) || poigneeAffichable(px4,py4) ){
      var line2 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+px1+ ' '+py1+ ' L ' + px4 + ' ' + py4 +'',style:'fill:transparent;stroke:#444; stroke:purple;stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

    
     var px5=px1+globalSelectionPoints.tabAbsolu[i][2]*Math.cos((angleEntreLesDeuxPointsDeArc+ancienAngle)*Math.PI/180);
     var py5=py1+globalSelectionPoints.tabAbsolu[i][2]*Math.sin((angleEntreLesDeuxPointsDeArc+ancienAngle)*Math.PI/180);
     if(poigneeAffichable(px5,py5)){
      var dotry    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':i+',2,'+globalSelectionPoints.tabAbsolu[i][1]+','+px1+','+py1+'','data-fnt':'actionMoveSelectionPtElement',cx:px5,cy:py5,r:rayonPoint,style:'fill:green;opacity:0.5;stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1/3)+';'}); // pink
      dotry.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
      dotry.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
     }
     
    
     if(poigneeAffichable(px1,py1) || poigneeAffichable(px5,py5) ){
      var line3 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+px1+ ' '+py1+ ' L ' + px5 + ' ' + py5 +'',style:'fill:transparent;stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }
    
 


     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][6];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][7];
     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='H' ){

     // point de fin
     pt0.x=globalSelectionPoints.tabAbsolu[i][1];
     pt0.y=pointFixePrecedent.y;
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche2='C1,'+(i+1);
     }

     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':recherche2,'data-indice':i+',1','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][1];

    }else if(globalSelectionPoints.tabAbsolu[i][0]=='V' ){

     // point de fin
     pt0.x=pointFixePrecedent.x;
     pt0.y=globalSelectionPoints.tabAbsolu[i][1];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche2='C1,'+(i+1);
     }

     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':recherche2,'data-indice':i+',1','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][1];

    }else if(globalSelectionPoints.tabAbsolu[i][0]=='T' ){

     // point de fin
     pt0.x=globalSelectionPoints.tabAbsolu[i][1];
     pt0.y=globalSelectionPoints.tabAbsolu[i][2];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche2='C1,'+(i+1);
     }

     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':recherche2,'data-indice':i+',1,2','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][1];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][2];
     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='Q' || globalSelectionPoints.tabAbsolu[i][0]=='S' ){
     
     ptPrec.x=pointFixePrecedent.x;
     ptPrec.y=pointFixePrecedent.y;
     ptPrec=ptPrec.matrixTransform(matrixRelatifVersAbsolu);
     
     // premier point de controle
     ptC1.x=globalSelectionPoints.tabAbsolu[i][1];
     ptC1.y=globalSelectionPoints.tabAbsolu[i][2];
     ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);

     // point de fin
     pt0.x=globalSelectionPoints.tabAbsolu[i][3];
     pt0.y=globalSelectionPoints.tabAbsolu[i][4];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     // les lignes des points de controle partent du point central pour arriver au point de controle
     if(poigneeAffichable(ptPrec.x,ptPrec.y) || poigneeAffichable(ptC1.x,ptC1.y) ){
      var line1 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+ptPrec.x+ ' '+ptPrec.y+ ' L ' + ptC1.x + ' ' + ptC1.y+'',style:'fill:transparent;stroke:blue; stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }
     if(poigneeAffichable(pt0.x,pt0.y) || poigneeAffichable(ptC1.x,ptC1.y) ){
      var line2 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C2,'+i ,d:'M '+pt0.x   + ' '+pt0.y   + ' L ' + ptC1.x + ' ' + ptC1.y+'',style:'fill:transparent;stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

          
     if(poigneeAffichable(ptC1.x,ptC1.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C1,'+i,'data-recherche2':'C2,'+i,'data-indice':i+',1,2','data-fnt':'actionMoveSelectionPtElement',r:rayonPoint,style:'fill:'+filcol+';stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
     }


     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='Q'){
      recherche2='C1,'+(i+1);
     }
     

     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':'C1,'+i,'data-indice':i+',3,4','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonPoint,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
      dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
     }

     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][3];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][4];

     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='C' ){
     
     ptPrec.x=pointFixePrecedent.x;
     ptPrec.y=pointFixePrecedent.y;
     ptPrec=ptPrec.matrixTransform(matrixRelatifVersAbsolu);
     
     // point de fin
     pt0.x=globalSelectionPoints.tabAbsolu[i][5];
     pt0.y=globalSelectionPoints.tabAbsolu[i][6];
     pt0=pt0.matrixTransform(matrixRelatifVersAbsolu);

     // deuxième point de controle
     ptC2.x=globalSelectionPoints.tabAbsolu[i][3];
     ptC2.y=globalSelectionPoints.tabAbsolu[i][4];
     ptC2=ptC2.matrixTransform(matrixRelatifVersAbsolu);
     
     // premier point de controle
     ptC1.x=globalSelectionPoints.tabAbsolu[i][1];
     ptC1.y=globalSelectionPoints.tabAbsolu[i][2];
     ptC1=ptC1.matrixTransform(matrixRelatifVersAbsolu);
     

     // les lignes des points de controle partent du point central pour arriver au point de controle
     if(poigneeAffichable(ptPrec.x,ptPrec.y) || poigneeAffichable(ptC1.x,ptC1.y) ){
      var line1 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C1,'+i ,d:'M '+ptPrec.x+ ' '+ptPrec.y+ ' L ' + ptC1.x + ' ' + ptC1.y+'',style:'fill:transparent;stroke:blue; stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }
     if(poigneeAffichable(pt0.x,pt0.y) || poigneeAffichable(ptC2.x,ptC2.y) ){
      var line2 = ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-indice':'C2,'+i ,d:'M '+pt0.x   + ' '+pt0.y   + ' L ' + ptC2.x + ' ' + ptC2.y+'',style:'fill:transparent;stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1/4)+';'});
     }

//     selectSeulement='';
     var rayonvert=rayonPoint;
     var rayonbleu=rayonPoint;
     var rayonroug=rayonPoint;
     // var selectSeulement=''; // aucune, 'rouge', 'vert' , 'bleu'
     if(selectSeulement==='bleu'){
      rayonvert=rayonPoint*0.4;
      rayonroug=rayonPoint*0.4;
     }else if(selectSeulement==='vert'){
      rayonbleu=rayonPoint*0.4;
      rayonroug=rayonPoint*0.4;
     }else if(selectSeulement==='roug'){
      rayonbleu=rayonPoint*0.4;
      rayonvert=rayonPoint*0.4;
     }
     // premier point de contrôle fond bleu
     if(poigneeAffichable(ptC1.x,ptC1.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,cx:ptC1.x,cy:ptC1.y,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C1,'+i,'data-indice':i+',1,2','data-fnt':'actionMoveSelectionPtElement',r:rayonbleu,style:'fill:'+filcol+';stroke:green;stroke-width:'+(strokWit/_dssvg.zoom1)+';'});
      if(selectSeulement==='' || selectSeulement==='bleu'){
       dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
       dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
      }
     }

     // deuxième point de contrôle fond vert
     if(poigneeAffichable(ptC2.x,ptC2.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-indice':i+',3,4','data-fnt':'actionMoveSelectionPtElement',cx:ptC2.x,cy:ptC2.y,r:rayonvert,style:'fill:rgba(0,255,0,0.5);stroke:blue;stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // green
      if(selectSeulement==='' || selectSeulement==='vert'){
       dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot');
       dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot');
      }
     }

     var recherche2='';
     if(i<globalSelectionPoints.tabAbsolu.length-1 && globalSelectionPoints.tabAbsolu[i+1][0]=='C'){
      recherche2='C1,'+(i+1);
     }
     
     // point de fin
     if(poigneeAffichable(pt0.x,pt0.y)){
      var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-indicepoint':i,'data-type':'toRemove','data-elem':_dssvg.idArbreCourant,'data-recherche1':'C2,'+i,'data-recherche2':recherche2,'data-indice':i+',5,6','data-fnt':'actionMoveSelectionPtElement',cx:pt0.x,cy:pt0.y,r:rayonroug,style:'fill:rgba(255,192,203,0.5);'+strk+';stroke-width:'+(strokWit/_dssvg.zoom1)+';'}); // pink
      if(selectSeulement==='' || selectSeulement==='roug'){
       dot.addEventListener('mousedown',mouseDownSelectionPtElement,'dot')
       dot.addEventListener('touchstart',touchDownSelectionPtElement,'dot')
      }
     }

     pointFixePrecedent.x=globalSelectionPoints.tabAbsolu[i][5];
     pointFixePrecedent.y=globalSelectionPoints.tabAbsolu[i][6];
     
    }else if(globalSelectionPoints.tabAbsolu[i][0]=='Z' ){
    }else{
     console.warn('Non traité : ' , globalSelectionPoints.tabAbsolu[i] );
    }
   }
  }
 }

 //========================================================================================================
 function touchDownSelectionIndiceArbre(e){
  e.stopPropagation();
  actionDownSelectionIndiceArbre(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownSelectionIndiceArbre(e){
  e.stopPropagation();
  actionDownSelectionIndiceArbre(e);
 }
 //========================================================================================================
 var globalSelectionPoints={
  pathChaineD    : null ,
  tabOriginal    : null ,
  tabAbsolu      : null ,
  autreReference : null ,
 }
 //========================================================================================================
 function actionDownSelectionIndiceArbre(e,idArbre){

  if(e===null){
   if(idArbre!=_dssvg.idArbreCourant){
    globalIndicePoint=null;
    affPoi();
   }
   
   _dssvg.idArbreCourant=idArbre;
   globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
   
   globalSelectionPoints.autreReference=null; // pour le radialGradient
   globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
   if(globalGeneralSvgReferenceElement.length>1){
    globalSelectionPoints.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
   }
   globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
   
  }else{
   
   initPosxy=positionSouris(e);
   divlag1.innerHTML='Z='+_dssvg.zoom1+',sx='+initPosxy.sx + ',sy=' + initPosxy.sy;
   
   var temp=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
   if(_dssvg.idArbreCourant!==null){
    if(temp!=_dssvg.idArbreCourant){
     globalIndicePoint=null;
     _dssvg.idArbrPreceden=_dssvg.idArbreCourant;
     _dssvg.idArbreCourant=temp;
     affPoi();
    }
   }else{
    _dssvg.idArbreCourant=temp;
   }
   
   globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);

   globalSelectionPoints.autreReference=null; // pour le radialGradient
   globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
   
   if(globalGeneralSvgReferenceElement.length>1){
    globalSelectionPoints.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
   }
   globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0]; 
   globalIndicePoint=0;
   afficheArbre0({init:false});
   var aSupp=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' hg"]')[0];
   try{
    if(aSupp!==null && aSupp!==undefined){
     aSupp.remove();
    }
   }catch(e1){
    console.warn('%cErreur à analyser e=','background:yellow;color:red;',e1)
   }
   return;
  }
  globalSelectionPoints.tabOriginal=null;
  globalSelectionPoints.tabAbsolu=null;
  

  if(globalGeneralSvgReferenceElement!==undefined){
   globTranslateMatriceSvgInverse=refZnDessin.getScreenCTM().inverse();
   globTranslateMatriceAbsolueInverse=refZnDessin.getScreenCTM().inverse().multiply(globalGeneralSvgReferenceElement.getScreenCTM()).inverse();
   globTranslateMatriceAbsolueInverse.e=0;
   globTranslateMatriceAbsolueInverse.f=0;
   if( globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
    globalSelectionPoints.pathChaineD=globalGeneralSvgReferenceElement.getAttribute('d');
    var obj=getPointsFromSvgPath(globalSelectionPoints.pathChaineD);
    globalSelectionPoints.tabOriginal=obj.tabOri;
    globalSelectionPoints.tabAbsolu  =obj.tabAbs; // globalGeneralSvgReferenceElement
    affichePtsControlDetailDeElement('path');
   }else if( globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){
    globalSelectionPoints.pathChaineD=globalGeneralSvgReferenceElement.getAttribute('points');
    globalSelectionPoints.tabOriginal=globalSelectionPoints.pathChaineD.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    affichePtsControlDetailDeElement('polyline');
   }else if( globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){
    globalSelectionPoints.pathChaineD=globalGeneralSvgReferenceElement.getAttribute('points');
    globalSelectionPoints.tabOriginal=globalSelectionPoints.pathChaineD.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
    affichePtsControlDetailDeElement('polygon');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('width')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('height'))];
    affichePtsControlDetailDeElement('rect');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image'){
    if(globalGeneralSvgReferenceElement.getAttribute('width') && globalGeneralSvgReferenceElement.getAttribute('height')){
     globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('width')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('height'))];
    }else{
     var rectBase=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
     if(rectBase){
      globalSelectionPoints.tabAbsolu=[
       parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')),
       parseFloat(rectBase.getAttribute('width')),parseFloat(rectBase.getAttribute('height'))
      ];
     }else{
      console.warn('a analyser','background:yellow;color:red;');
     }
    }
    affichePtsControlDetailDeElement('image');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='circle'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('r'))];
    affichePtsControlDetailDeElement('circle');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='radialgradient'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('r'))];
    affichePtsControlDetailDeElement('radialgradient');
    
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='ellipse'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('rx')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('ry'))];
    affichePtsControlDetailDeElement('ellipse');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('x1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('x2')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y2'))];
    affichePtsControlDetailDeElement('line');
   }else if(globalGeneralSvgReferenceElement!==undefined && globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='lineargradient'){
    globalSelectionPoints.tabAbsolu=[parseFloat(globalGeneralSvgReferenceElement.getAttribute('x1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('y1')),parseFloat(globalGeneralSvgReferenceElement.getAttribute('x2')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y2'))];
    affichePtsControlDetailDeElement('lineargradient');
   }
   var aSupp=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' hg"]')[0];
   try{
    if(e!==null){
     aSupp.remove();
    }
   }catch(e){
    console.warn('%cErreur à analyser e=','background:yellow;color:red;',e)
   }
  }
  
 }
 //========================================================================================================
 function actMovElementTaille(e){
 
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalSelectElementTaille.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalSelectElementTaille.mouseStart.x;
  pt0.y = current.y - globalSelectElementTaille.mouseStart.y;
  

  var newPointX=globalSelectElementTaille.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalSelectElementTaille.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );

//  divlag1.innerHTML='<span>depPLZ='+_dssvg.zoom1+'</span>,<span style="color:red;">x='+arrdi10000(newPointX)+'</span>,<span style="color:red;">y='+arrdi10000(newPointY)+'</span>';
  
  var deltaReel=refZnDessin.createSVGPoint();  
  deltaReel=pt0.matrixTransform(globalSelectElementTaille.matriceElementElementInverse).matrixTransform(globalSelectElementTaille.matriceRacine);
  deltaReel.x=deltaReel.x/_dssvg.parametres.diviseurDeplacement;;
  deltaReel.y=deltaReel.y/_dssvg.parametres.diviseurDeplacement;;
  
  
  var nouvelleWidth =arrdi10000(globalSelectElementTaille.rectangle.width+deltaReel.x);
  var nouvelleHeight=arrdi10000(globalSelectElementTaille.rectangle.height+deltaReel.y);
  
  
  var ancienneWidth =arrdi10000(globalSelectElementTaille.rectangle.width);
  var ancienneHeight=arrdi10000(globalSelectElementTaille.rectangle.height);
  

  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  function calculDy1(refy,i){
   var dy=0;
   if(globalSelectElementTaille.rectangle.height!=0){
    var rapporty=nouvelleHeight/globalSelectElementTaille.rectangle.height;
    var distanceInity=globalSelectElementTaille.tableauOriginal[i][refy]-globalSelectElementTaille.rectangle.y;
    var distanceMaintenant=distanceInity*rapporty;
    dy=distanceMaintenant-distanceInity;
   }else{
    if(globalSelectElementTaille.tableauOriginal.length-1>0){
     dy=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleHeight;
    }else{
     dy=0;
    }
   }
   return {dy:dy,nouy:arrdi10000(globalSelectElementTaille.tableauOriginal[i][refy]+dy)}
  }
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  function calculDx1(refx,i){
   var dx=0;
   if(globalSelectElementTaille.rectangle.width!=0){
    var rapportx=nouvelleWidth/globalSelectElementTaille.rectangle.width;
    var distanceInitx=globalSelectElementTaille.tableauOriginal[i][refx]-globalSelectElementTaille.rectangle.x;
    var distanceMaintenant=distanceInitx*rapportx;
    dx=distanceMaintenant-distanceInitx;
   }else{
    if(globalSelectElementTaille.tableauOriginal.length-1>0){
     dx=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleWidth;
    }else{
     dx=0;
    }
   }
   return {dx:dx,noux:arrdi10000(globalSelectElementTaille.tableauOriginal[i][refx]+dx)}
  }
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  function calculDxDy1(refx,refy,i){
   var dx=0;
   if(globalSelectElementTaille.rectangle.width!=0){
    var rapportx=nouvelleWidth/globalSelectElementTaille.rectangle.width;
    var distanceInitx=globalSelectElementTaille.tableauOriginal[i][refx]-globalSelectElementTaille.rectangle.x;
    var distanceMaintenant=distanceInitx*rapportx;
    dx=distanceMaintenant-distanceInitx;
   }else{
    if(globalSelectElementTaille.tableauOriginal.length-1>0){
     dx=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleWidth;
    }else{
     dx=0;
    }
   }
   var dy=0;
   if(globalSelectElementTaille.rectangle.height!=0){
    var rapporty=nouvelleHeight/globalSelectElementTaille.rectangle.height;
    var distanceInity=globalSelectElementTaille.tableauOriginal[i][refy]-globalSelectElementTaille.rectangle.y;
    var distanceMaintenant=distanceInity*rapporty;
    dy=distanceMaintenant-distanceInity;
   }else{
    if(globalSelectElementTaille.tableauOriginal.length-1>0){
     dy=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleHeight;
    }else{
     dy=0;
    }
   }
   var noux=arrdi10000(globalSelectElementTaille.tableauOriginal[i][refx]+dx);
   var nouy=arrdi10000(globalSelectElementTaille.tableauOriginal[i][refy]+dy);
   return {dx:dx,dy:dy,noux:noux,nouy:nouy};
  }
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  
  if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='text' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='tspan' ){
   if(nouvelleHeight>=0.1){
    if(globalSelectElementTaille.tableauOriginal[1]===0){
     var rapport=nouvelleHeight;
    }else if(globalSelectElementTaille.tableauOriginal[1]>0){
     var rapport=nouvelleHeight/globalSelectElementTaille.tableauOriginal[1];
    }
    var ancienneFontSize=parseFloat(globalSelectElementTaille.tableauOriginal[0]['font-size'].valeur);
    if(ancienneFontSize<=0){
     ancienneFontSize=0.001;
    }
    var nouvelleFontSize=arrdi10000(ancienneFontSize*rapport);
    if(nouvelleFontSize<=0){
     nouvelleFontSize=0.001;
    }
    
    var ancienneStrokeWidth=parseFloat(globalSelectElementTaille.tableauOriginal[0]['stroke-width'].valeur);
    if(ancienneStrokeWidth<=0.01){
     ancienneStrokeWidth=0.01;
    }
    var nouvelleStrokeWidth=Math.round(ancienneStrokeWidth*rapport*100)/100;
    if(nouvelleStrokeWidth<=0.01){
     nouvelleStrokeWidth=0.01;
    }
    
    var sty='';
    for(var elem in globalSelectElementTaille.tableauOriginal[0]){
     if(elem==='font-size'){
      sty+='font-size:'+nouvelleFontSize+';';
     }else if(elem==='stroke-width'){
      sty+='stroke-width:'+nouvelleStrokeWidth+';';
     }else{
      sty+=elem+':'+globalSelectElementTaille.tableauOriginal[0][elem].valeur+';';
     }
    }
    globalGeneralSvgReferenceElement.setAttribute('style'  , sty)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['style']=sty;

    divLag1Pour({t:'rszTxZ',l:'rszTxZ','ft':(Math.round(arrdi10000(nouvelleFontSize)*100))/100,'sw':arrdi10000(nouvelleStrokeWidth)});

   }

  
  }else if(
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image' || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use'   ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='filter' 
  ){
   if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use' && ( nouvelleWidth===0 || nouvelleHeight===0 ) ){
    return;
   }
   if(nouvelleWidth>=0){
    globalGeneralSvgReferenceElement.setAttribute('width'  ,nouvelleWidth)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['width']=nouvelleWidth;
   }
   if(nouvelleHeight>=0){
    globalGeneralSvgReferenceElement.setAttribute('height'  ,nouvelleHeight)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['height']=nouvelleHeight;
   }
   
   if(globalSelectElementTaille.autreReference!==null){
    globalSelectElementTaille.autreReference.setAttribute('width',nouvelleWidth);
    globalSelectElementTaille.autreReference.setAttribute('height',nouvelleHeight);
   }
   
   
   divLag1Pour({t:'rszReZ',l:'rszReZ','w':nouvelleWidth,'h':nouvelleHeight});
   


  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line'){
   
   var x2=arrdi10000(globalSelectElementTaille.tableauOriginal[2]+deltaReel.x);
   globalGeneralSvgReferenceElement.setAttribute('x2'  ,x2)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x2']=x2;

   var y2=arrdi10000(globalSelectElementTaille.tableauOriginal[3]+deltaReel.y);
   globalGeneralSvgReferenceElement.setAttribute('y2'  ,y2)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y2']=y2;

   if(globalSelectElementTaille.autreReference!==null){
    globalSelectElementTaille.autreReference.setAttribute('x2'  ,x2)
    globalSelectElementTaille.autreReference.setAttribute('y2'  ,y2)
   }

   divLag1Pour({t:'rszLiZ',l:'rszLiZ','x2':x2,'y2':y2});



  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='lineargradient'){
   
   var x2=arrdi10000(globalSelectElementTaille.tableauOriginal[2]+deltaReel.x);
   globalGeneralSvgReferenceElement.setAttribute('x2'  ,x2)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x2']=x2;

   var y2=arrdi10000(globalSelectElementTaille.tableauOriginal[3]+deltaReel.y);
   globalGeneralSvgReferenceElement.setAttribute('y2'  ,y2)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y2']=y2;

   divLag1Pour({t:'rszLgZ',l:'rszLiZ','x2':x2,'y2':y2});






  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='circle'){
   
   if(nouvelleWidth>=0 && nouvelleHeight>=0){
    var r=(nouvelleWidth+nouvelleHeight)/4;
    globalGeneralSvgReferenceElement.setAttribute('r'  ,r)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['r']=r;
    if(globalSelectElementTaille.autreReference!==null){
     globalSelectElementTaille.autreReference.setAttribute('r'  ,r)
    }
    
   }
   
   divLag1Pour({t:'rszCeZ',l:'rszCeZ','r':r});

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='radialgradient'){
   
   if(nouvelleWidth>=0 && nouvelleHeight>=0){
    var r=(nouvelleWidth+nouvelleHeight)/4;
    globalGeneralSvgReferenceElement.setAttribute('r'  ,r)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['r']=r;
   }
   
   divLag1Pour({t:'rszRgZ',l:'rszCeZ','r':r});


  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='ellipse'){
   
   if(nouvelleWidth>=0){
    var rx=(nouvelleWidth)/2;
    globalGeneralSvgReferenceElement.setAttribute('rx'  ,rx)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['rx']=rx;
   }
   
   if(nouvelleHeight>=0){
    var ry=(nouvelleHeight)/2;
    globalGeneralSvgReferenceElement.setAttribute('ry'  ,ry)
    _dssvg.arbre0[globalIndiceArbre].data.attributes['ry']=ry;
   }
   divLag1Pour({t:'rszElZ',l:'rszElZ','rx':rx,'ry':ry});
   
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){

   var tt='';
   for(var i=0;i<globalSelectElementTaille.tableauOriginal.length;i+=2){

    var dx=0;
    if(globalSelectElementTaille.rectangle.width!=0){
     var rapportx=nouvelleWidth/globalSelectElementTaille.rectangle.width;
     var distanceInitx=globalSelectElementTaille.tableauOriginal[i]-globalSelectElementTaille.rectangle.x;
     var distanceMaintenant=distanceInitx*rapportx;
     dx=distanceMaintenant-distanceInitx;
    }else{
     if(globalSelectElementTaille.tableauOriginal.length-1>0){
      dx=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleWidth;
     }else{
      dx=0;
     }
    }
    var noux=arrdi10000(globalSelectElementTaille.tableauOriginal[i]+dx);

    var dy=0;
    if(globalSelectElementTaille.rectangle.height!=0){
     var rapporty=nouvelleHeight/globalSelectElementTaille.rectangle.height;
     var distanceInity=globalSelectElementTaille.tableauOriginal[i+1]-globalSelectElementTaille.rectangle.y;
     var distanceMaintenant=distanceInity*rapporty;
     dy=distanceMaintenant-distanceInity;
    }else{
     if(globalSelectElementTaille.tableauOriginal.length-1>0){
      dy=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleHeight;
     }else{
      dy=0;
     }
    }
    var nouy=arrdi10000(globalSelectElementTaille.tableauOriginal[i+1]+dy);

    tt+=' '+noux+' '+nouy+ ' ';

   }
   
   globalGeneralSvgReferenceElement.setAttribute('points'  ,tt)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

   divLag1Pour({t:'rszPlZ',l:'rszPlZ','nw':nouvelleWidth,'nh':nouvelleHeight});
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){

   var tt='';
   for(var i=0;i<globalSelectElementTaille.tableauOriginal.length;i+=2){

    var dx=0;
    if(globalSelectElementTaille.rectangle.width!=0){
     var rapportx=nouvelleWidth/globalSelectElementTaille.rectangle.width;
     var distanceInitx=globalSelectElementTaille.tableauOriginal[i]-globalSelectElementTaille.rectangle.x;
     var distanceMaintenant=distanceInitx*rapportx;
     dx=distanceMaintenant-distanceInitx;
    }else{
     if(globalSelectElementTaille.tableauOriginal.length-1>0){
      dx=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleWidth;
     }else{
      dx=0;
     }
    }
    var noux=arrdi10000(globalSelectElementTaille.tableauOriginal[i]+dx);

    var dy=0;
    if(globalSelectElementTaille.rectangle.height!=0){
     var rapporty=nouvelleHeight/globalSelectElementTaille.rectangle.height;
     var distanceInity=globalSelectElementTaille.tableauOriginal[i+1]-globalSelectElementTaille.rectangle.y;
     var distanceMaintenant=distanceInity*rapporty;
     dy=distanceMaintenant-distanceInity;
    }else{
     if(globalSelectElementTaille.tableauOriginal.length-1>0){
      dy=i/(globalSelectElementTaille.tableauOriginal.length-1)*nouvelleHeight;
     }else{
      dy=0;
     }
    }
    var nouy=arrdi10000(globalSelectElementTaille.tableauOriginal[i+1]+dy);

    tt+=' '+noux+' '+nouy+ ' ';

   }
   globalGeneralSvgReferenceElement.setAttribute('points'  ,tt)
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

   divLag1Pour({t:'rszPgZ',l:'rszPgZ','nw':nouvelleWidth,'nh':nouvelleHeight});

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   
   var tt='';
   for(var i=0;i<globalSelectElementTaille.tableauOriginal.length;i++){
    
     
    if(globalSelectElementTaille.tableauOriginal[i][0]=='A' || globalSelectElementTaille.tableauOriginal[i][0]=='a' ){
     
     // M 44 82 A 44 30 0 1 0 44 52 
     var delta1=calculDxDy1( 6 , 7 , i );
     var delta2=calculDxDy1( 1 , 2 , i );
     
     
     var tab=JSON.parse(JSON.stringify(globalSelectElementTaille.tableauOriginal[i]));
     tab[6]=delta1.noux;
     tab[7]=delta1.nouy;
     
     if(ancienneWidth>0 && ancienneHeight>0 && nouvelleWidth>0 && nouvelleHeight>0){
      var rapport=(nouvelleWidth/ancienneWidth+nouvelleHeight/ancienneHeight)/2;
      tab[1]=tab[1]*rapport;
      tab[2]=tab[2]*rapport;
     }
     
  
     
     
     tt+=tab.join(' ')+' ';
     
    }else if(globalSelectElementTaille.tableauOriginal[i][0]=='C' || globalSelectElementTaille.tableauOriginal[i][0]=='c' ){

     var delta1=calculDxDy1( 1 , 2 , i );
     var delta2=calculDxDy1( 3 , 4 , i );
     var delta3=calculDxDy1( 5 , 6 , i );
     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' '+(delta1.noux)+' '+(delta1.nouy)+' '+(delta2.noux)+' '+(delta2.nouy)+' '+(delta3.noux)+' '+(delta3.nouy)+'  ';
     
    }else if(
     globalSelectElementTaille.tableauOriginal[i][0]=='q' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='Q' ||
     globalSelectElementTaille.tableauOriginal[i][0]=='s' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='S' 
    ){

     var delta1=calculDxDy1( 1 , 2 , i );
     var delta2=calculDxDy1( 3 , 4 , i );
     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' '+delta1.noux+' '+delta1.nouy+' '+delta2.noux+' '+delta2.nouy+'    ';
      
    }else if(
    
     globalSelectElementTaille.tableauOriginal[i][0]=='M' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='m' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='L' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='l' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='T' || 
     globalSelectElementTaille.tableauOriginal[i][0]=='t' || 
     (globalSelectElementTaille.tableauOriginal[i][0]=='m' && i==0 ) ){
     
     var delta1=calculDxDy1( 1 , 2 , i );
     tt+=globalSelectElementTaille.tableauOriginal[i][0]+' '+(delta1.noux)+' '+(delta1.nouy)+'';
     
    }else if(globalSelectElementTaille.tableauOriginal[i][0]=='H' || globalSelectElementTaille.tableauOriginal[i][0]=='h' ){

     var delta1=calculDx1( 1 , i );
     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' '+delta1.noux+'    ';
      
      
    }else if(globalSelectElementTaille.tableauOriginal[i][0]=='V' || globalSelectElementTaille.tableauOriginal[i][0]=='v' ){

     var delta1=calculDy1( 1 , i );
     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' '+delta1.nouy+'    ';
      
      
    }else if(globalSelectElementTaille.tableauOriginal[i][0]=='Z' || globalSelectElementTaille.tableauOriginal[i][0]=='z' ){

     tt+='   '+globalSelectElementTaille.tableauOriginal[i][0]+' ';
     
    }else{
     console.warn('non prévu "',globalSelectElementTaille.tableauOriginal[i]);
     tt+=globalSelectElementTaille.tableauOriginal[i].join(' ')+' ';
     
    }
   }
   globalGeneralSvgReferenceElement.setAttribute('d',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['d']=tt;
   
   if(globalSelectElementTaille.rectangle && globalSelectElementTaille.rectangle.width!==0 && globalSelectElementTaille.rectangle.height!==0){
    var obj={t:'rszChZ',l:'rszChZ','nw':nouvelleWidth,'nh':nouvelleHeight,'px':Math.round(nouvelleWidth/globalSelectElementTaille.rectangle.width*100)/100,'py':Math.round(nouvelleHeight/globalSelectElementTaille.rectangle.height*100)/100};
   }else{
    var obj={t:'rszChZ',l:'rszChZ','nw':nouvelleWidth,'nh':nouvelleHeight};
   }
   
   
   divLag1Pour(obj);

  }
 }
 //========================================================================================================
 function touchDownSizeElement(e){
  e.stopPropagation();
  actionDownSizeElement(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownSizeElement(e){
  e.stopPropagation();
  actionDownSizeElement(e);
 }
 //========================================================================================================
 var globalSelectElementTaille={
  mouseStart:null,
  elementStart:null,
  matriceRacineInverse:null,
  rectangle:null,
  tableauOriginal:null,  
  matriceElementElementInverse:null,
  matriceRacine:null,
  autreReference:null,
 }
 //========================================================================================================
 function actionDownSizeElement(e){
  
  initPosxy=positionSouris(e);
  ecran_appuye='tailleElement';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  divlag1.innerHTML='<span>sEZ='+_dssvg.zoom1+'</span>,<span>sx='+arrdi10000(initPosxy.sx)+'</span>,<span>sy='+arrdi10000(initPosxy.sy)+'</span>';
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  var nouvelIdArbre=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
  if(_dssvg.idArbreCourant===nouvelIdArbre){
  }else{
   _dssvg.idArbrPreceden=_dssvg.idArbreCourant;
   _dssvg.idArbreCourant=nouvelIdArbre;
  }
  
  
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  
  globalSelectElementTaille.autreReference=null; // pour le radialGradient et filter
  if(globalGeneralSvgReferenceElement.length>1){
   globalSelectElementTaille.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0];  
  
  
  globalSelectElementTaille.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalSelectElementTaille.matriceElementElementInverse.e=0;
  globalSelectElementTaille.matriceElementElementInverse.f=0;
  
  globalSelectElementTaille.matriceRacine=refZnDessin.getScreenCTM();
  globalSelectElementTaille.matriceRacine.e=0;
  globalSelectElementTaille.matriceRacine.f=0;
  
  
  globalSelectElementTaille.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  
  
  globalSelectElementTaille.mouseStart=refZnDessin.createSVGPoint();
		globalSelectElementTaille.mouseStart.x = e.clientX; 
  globalSelectElementTaille.mouseStart.y = e.clientY;
  globalSelectElementTaille.mouseStart=globalSelectElementTaille.mouseStart.matrixTransform(globalSelectElementTaille.matriceRacineInverse);
  globalSelectElementTaille.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };
  
  globalSelectElementTaille.rectangle=null;
  var rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  if(rectangle){
   globalSelectElementTaille.rectangle={
    ref:rectangle,
    x:arrdi10000(parseFloat(rectangle.getAttribute('x'))),
    y:arrdi10000(parseFloat(rectangle.getAttribute('y'))),
    width:arrdi10000(parseFloat(rectangle.getAttribute('width'))),
    height:arrdi10000(parseFloat(rectangle.getAttribute('height'))),
   }
  }
  
  if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('d');
   var obj=getPointsFromSvgPath(pathDChaine);
   globalSelectElementTaille.tableauOriginal=obj.tabOri;
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('points');
   globalSelectElementTaille.tableauOriginal=pathDChaine.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('points');
   globalSelectElementTaille.tableauOriginal=pathDChaine.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);

  }else if(
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'   || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use'    ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='filter'
  ){
   
   globalSelectElementTaille.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')) ];
   
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='lineargradient'){
   
   globalSelectElementTaille.tableauOriginal=[ 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('x1')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('y1')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('x2')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('y2')) , 
   ];

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='circle'){
   
   globalSelectElementTaille.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('r')) ];

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='radialgradient'){
   
   globalSelectElementTaille.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('r')) ];


  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='ellipse'){
   
   globalSelectElementTaille.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('rx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('ry')) ];
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='text' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='tspan'){
   
   var obj1=recuperePropsCouleurs(_dssvg.idArbreCourant);
   
   globalSelectElementTaille.tableauOriginal=[ obj1 , parseFloat(rectangle.getAttribute('height'))];
   
  }
  
 }
 
 //========================================================================================================
 function actMovElementPosition(e){
  initPosxy=positionSouris(e);
  var current=refZnDessin.createSVGPoint();
		current.x = e.clientX; 
  current.y = e.clientY;
  current=current.matrixTransform(globalSelectElementMove.matriceRacineInverse);
  
  var pt0=refZnDessin.createSVGPoint();  
  pt0.x = current.x - globalSelectElementMove.mouseStart.x;
  pt0.y = current.y - globalSelectElementMove.mouseStart.y;
  
  var newPointX=globalSelectElementMove.elementStart.x+pt0.x/_dssvg.parametres.diviseurDeplacement;
  var newPointY=globalSelectElementMove.elementStart.y+pt0.y/_dssvg.parametres.diviseurDeplacement;
		globalGeneralReferencePointControleClique.setAttribute('cx', newPointX );
		globalGeneralReferencePointControleClique.setAttribute('cy', newPointY );

  divlag1.innerHTML='<span>depPLZ='+_dssvg.zoom1+'</span>,<span style="color:red;">x='+arrdi10000(newPointX)+'</span>,<span style="color:red;">y='+arrdi10000(newPointY)+'</span>';


  
  var deltaReel=refZnDessin.createSVGPoint();  
  deltaReel=pt0.matrixTransform(globalSelectElementMove.matriceElementElementInverse).matrixTransform(globalSelectElementMove.matriceRacine);
  deltaReel.x=deltaReel.x/_dssvg.parametres.diviseurDeplacement;;
  deltaReel.y=deltaReel.y/_dssvg.parametres.diviseurDeplacement;;
  
  
  
  if(
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='text'   || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='tspan'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image'  ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'   ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use'    ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='filter' 
  ){
   if(isNaN(globalSelectElementMove.tableauOriginal[0])){
    globalSelectElementMove.tableauOriginal[0]=0;
   }
   if(isNaN(globalSelectElementMove.tableauOriginal[1])){
    globalSelectElementMove.tableauOriginal[1]=0;
   }

   var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[0]+deltaReel.x);
   var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[1]+deltaReel.y);

 		globalGeneralSvgReferenceElement.setAttribute('x',newPosx);
 		globalGeneralSvgReferenceElement.setAttribute('y',newPosy);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x']=newPosx;
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y']=newPosy;

   if(globalSelectElementMove.autreReference!==null){
    globalSelectElementMove.autreReference.setAttribute('x',newPosx);
    globalSelectElementMove.autreReference.setAttribute('y',newPosy);
   }

   divLag1Pour({t:'depReZ',l:'depReZ','sx':arrdi10000(newPosx),'sy':arrdi10000(newPosy)});

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='circle' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='ellipse' || 'radialgradient' === globalGeneralSvgReferenceElement.nodeName.toLowerCase() ){
   
   if(isNaN(globalSelectElementMove.tableauOriginal[0])){
    globalSelectElementMove.tableauOriginal[0]=0;
   }
   if(isNaN(globalSelectElementMove.tableauOriginal[1])){
    globalSelectElementMove.tableauOriginal[1]=0;
   }
   var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[0]+deltaReel.x);
   var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[1]+deltaReel.y);
 		globalGeneralSvgReferenceElement.setAttribute('cx',newPosx);
 		globalGeneralSvgReferenceElement.setAttribute('cy',newPosy);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['cx']=newPosx;
   _dssvg.arbre0[globalIndiceArbre].data.attributes['cy']=newPosy;
   if(globalSelectElementMove.autreReference!==null){
    globalSelectElementMove.autreReference.setAttribute('cx',newPosx);
    globalSelectElementMove.autreReference.setAttribute('cy',newPosy);
    if(globalSelectElementMove.autreReferenceInverse!==undefined){
     globalSelectElementMove.autreReferenceInverse.setAttribute('cx',newPosx);
     globalSelectElementMove.autreReferenceInverse.setAttribute('cy',newPosy);
    }
   }

   divLag1Pour({t:'depCeZ',l:'depCeZ','x':newPosx,'y':newPosy});
   
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='line' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='lineargradient' ){
   
   var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[0]+deltaReel.x);
   var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[1]+deltaReel.y);
 		globalGeneralSvgReferenceElement.setAttribute('x1',newPosx);
 		globalGeneralSvgReferenceElement.setAttribute('y1',newPosy);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x1']=newPosx;
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y1']=newPosy;

   if(globalSelectElementMove.autreReference!==null){

    globalSelectElementMove.autreReference.setAttribute('x1',newPosx);
    globalSelectElementMove.autreReference.setAttribute('y1',newPosy);
   }

   var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[2]+deltaReel.x);
   var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[3]+deltaReel.y);
 		globalGeneralSvgReferenceElement.setAttribute('x2',newPosx);
 		globalGeneralSvgReferenceElement.setAttribute('y2',newPosy);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['x2']=newPosx;
   _dssvg.arbre0[globalIndiceArbre].data.attributes['y2']=newPosy;
   
   if(globalSelectElementMove.autreReference!==null){

    globalSelectElementMove.autreReference.setAttribute('x2',newPosx);
    globalSelectElementMove.autreReference.setAttribute('y2',newPosy);
   }

   divLag1Pour({t:'depLiZ',l:'depLiZ','x':newPosx,'y':newPosy});
   
   
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){

   var tt='';
   for(var i=0;i<globalSelectElementMove.tableauOriginal.length;i+=2){
    var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[i]+deltaReel.x);
    var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[i+1]+deltaReel.y);
    tt+=' '+(newPosx)+' '+(newPosy)+' ';
   }
 		globalGeneralSvgReferenceElement.setAttribute('points',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

   divLag1Pour({t:'depPlZ',l:'depPlZ','x':newPosx,'y':newPosy});


  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){

   var tt='';
   for(var i=0;i<globalSelectElementMove.tableauOriginal.length;i+=2){
    var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[i]+deltaReel.x);
    var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[i+1]+deltaReel.y);
    tt+=' '+(newPosx)+' '+(newPosy)+' ';
   }
 		globalGeneralSvgReferenceElement.setAttribute('points',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['points']=tt;

   divLag1Pour({t:'depPgZ',l:'depPgZ','x':newPosx,'y':newPosy});

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   
   divLag1Pour({t:'depChZ',l:'depChZ','x':arrdi10000(newPointX),'y':arrdi10000(newPointY)});
   
   var tt='';
   for(var i=0;i<globalSelectElementMove.tableauOriginal.length;i++){
   
    if(globalSelectElementMove.tableauOriginal[i][0]=='M' || globalSelectElementMove.tableauOriginal[i][0]=='L' || ( globalSelectElementMove.tableauOriginal[i][0]=='m' && i==0 )){
     var newPosx=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     var newPosy=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]+deltaReel.y);
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+(newPosx)+' '+(newPosy)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='A' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]);
     var newPosx3=arrdi10000(globalSelectElementMove.tableauOriginal[i][5]);
     var newPosx4=arrdi10000(globalSelectElementMove.tableauOriginal[i][6]+deltaReel.x);
     var newPosy4=arrdi10000(globalSelectElementMove.tableauOriginal[i][7]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' '+arrdi10000(newPosx3)+' '+arrdi10000(newPosx4)+' '+arrdi10000(newPosy4)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='a' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]);
     var newPosx3=arrdi10000(globalSelectElementMove.tableauOriginal[i][5]);
     var newPosx4=arrdi10000(globalSelectElementMove.tableauOriginal[i][6]);
     var newPosy4=arrdi10000(globalSelectElementMove.tableauOriginal[i][7]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' '+arrdi10000(newPosx3)+' '+arrdi10000(newPosx4)+' '+arrdi10000(newPosy4)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='C' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]+deltaReel.y);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]+deltaReel.x);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]+deltaReel.y);
     var newPosx3=arrdi10000(globalSelectElementMove.tableauOriginal[i][5]+deltaReel.x);
     var newPosy3=arrdi10000(globalSelectElementMove.tableauOriginal[i][6]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' '+arrdi10000(newPosx3)+' '+arrdi10000(newPosy3)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='c' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]);
     var newPosx3=arrdi10000(globalSelectElementMove.tableauOriginal[i][5]);
     var newPosy3=arrdi10000(globalSelectElementMove.tableauOriginal[i][6]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' '+arrdi10000(newPosx3)+' '+arrdi10000(newPosy3)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='S' || globalSelectElementMove.tableauOriginal[i][0]=='Q' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]+deltaReel.y);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]+deltaReel.x);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='s' || globalSelectElementMove.tableauOriginal[i][0]=='q' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     var newPosx2=arrdi10000(globalSelectElementMove.tableauOriginal[i][3]);
     var newPosy2=arrdi10000(globalSelectElementMove.tableauOriginal[i][4]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' '+arrdi10000(newPosx2)+' '+arrdi10000(newPosy2)+' ';

    }else if(globalSelectElementMove.tableauOriginal[i][0]=='l' || globalSelectElementMove.tableauOriginal[i][0]=='t' || globalSelectElementMove.tableauOriginal[i][0]=='m' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='L' || globalSelectElementMove.tableauOriginal[i][0]=='T' || globalSelectElementMove.tableauOriginal[i][0]=='M' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     var newPosy1=arrdi10000(globalSelectElementMove.tableauOriginal[i][2]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' '+arrdi10000(newPosy1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='v' || globalSelectElementMove.tableauOriginal[i][0]=='h' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='V'  ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.y);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='H' ){
     
     var newPosx1=arrdi10000(globalSelectElementMove.tableauOriginal[i][1]+deltaReel.x);
     
     tt+=globalSelectElementMove.tableauOriginal[i][0]+' '+arrdi10000(newPosx1)+' ';
     
    }else if(globalSelectElementMove.tableauOriginal[i][0]=='z' || globalSelectElementMove.tableauOriginal[i][0]=='Z' ){

     tt+=globalSelectElementMove.tableauOriginal[i].join(' ')+' ';

    }else{
     console.warn('Non prévu ' , globalSelectElementMove.tableauOriginal[i][0] , globalSelectElementMove.tableauOriginal[i] );
     tt+=globalSelectElementMove.tableauOriginal[i].join(' ')+' ';
    }
   }
 		globalGeneralSvgReferenceElement.setAttribute('d',tt);
   _dssvg.arbre0[globalIndiceArbre].data.attributes['d']=tt;
   
  }
  if(globalSelectElementMove.rectangle!==null){
   globalSelectElementMove.rectangle.ref.setAttribute('x',globalSelectElementMove.rectangle.x+deltaReel.x);
   globalSelectElementMove.rectangle.ref.setAttribute('y',globalSelectElementMove.rectangle.y+deltaReel.y);
  }   
  
  
  return;


 }
 //========================================================================================================
 
 var globalPathDChaine=null;
 var globTranslateMatriceSvgInverse=null;
 var globTranslateMatriceAbsolueInverse=null;
 var globalReferenceRectangle=null;
 
 var globalSelectElementMove={
  mouseStart:null,
  elementStart:null,
  matriceRacineInverse:null,
  matriceElementElementInverse:null,
  matriceRacine:null,
  rectangle:null,
  tableauOriginal:null,
  autreReference:null,
  autreReferenceInverse:null,
 }
 
 //========================================================================================================
 function touchDownMoveElement(e){
  e.stopPropagation();
  actionDownMoveElement(e.touches[0]);
 }
 //========================================================================================================
 function mouseDownMoveElement(e){
  e.stopPropagation();
  actionDownMoveElement(e);
 }
 //========================================================================================================
 function actionDownMoveElement(e){
  initPosxy=positionSouris(e);
  ecran_appuye='deplaceElement';
  
  var elem=e.target.getAttribute('data-elem');
  globalGeneralReferencePointControleClique=e.target;
  divlag1.innerHTML='<span>mmEZ='+_dssvg.zoom1+'</span>,<span>sx='+initPosxy.sx + '</span>,<span>sy=' + initPosxy.sy+'</span>';
  
  initMouseDownObj={x:globalGeneralReferencePointControleClique.cx.animVal.value , y:globalGeneralReferencePointControleClique.cy.animVal.value};
  initClick={x:e.clientX , y:e.clientY};
  var nouvelIdArbre=parseInt(e.target.getAttribute('data-elem').replace(/ hg/,''),10);
  if(_dssvg.idArbreCourant===nouvelIdArbre){
  }else{
   _dssvg.idArbrPreceden=_dssvg.idArbreCourant;
   _dssvg.idArbreCourant=nouvelIdArbre;
  }
  
  globalIndiceArbre=recupereIndiceArbre(_dssvg.idArbreCourant);
  globalGeneralSvgReferenceElement=document.querySelectorAll('[data-idarbre1="'+_dssvg.idArbreCourant+'"]');
  
  globalSelectElementMove.autreReference=null; // pour le radialGradient ou filter
  if(globalGeneralSvgReferenceElement.length>1){
   globalSelectElementMove.autreReference=globalGeneralSvgReferenceElement[globalGeneralSvgReferenceElement.length-1];
   globalSelectElementMove.autreReferenceInverse=document.querySelectorAll('[id="inverse_de_'+_dssvg.idArbreCourant+'"]')[0];
  }
  globalGeneralSvgReferenceElement=globalGeneralSvgReferenceElement[0];  
  
  globalSelectElementMove.matriceElementElementInverse=globalGeneralSvgReferenceElement.getScreenCTM().inverse();
  globalSelectElementMove.matriceElementElementInverse.e=0;
  globalSelectElementMove.matriceElementElementInverse.f=0;
  
  globalSelectElementMove.matriceRacine=refZnDessin.getScreenCTM();
  globalSelectElementMove.matriceRacine.e=0;
  globalSelectElementMove.matriceRacine.f=0;
  
  
  globalSelectElementMove.matriceRacineInverse=refZnDessin.getScreenCTM().inverse();
  
  
  globalSelectElementMove.mouseStart=refZnDessin.createSVGPoint();
		globalSelectElementMove.mouseStart.x = e.clientX; 
  globalSelectElementMove.mouseStart.y = e.clientY;
  globalSelectElementMove.mouseStart=globalSelectElementMove.mouseStart.matrixTransform(globalSelectElementMove.matriceRacineInverse);
  globalSelectElementMove.elementStart = { x:globalGeneralReferencePointControleClique.cx.animVal.value, y:globalGeneralReferencePointControleClique.cy.animVal.value };
  
  globalSelectElementMove.rectangle=null;
  var rectangle=document.querySelectorAll('[data-rectangle="'+_dssvg.idArbreCourant+'"]')[0];
  if(rectangle){
   globalSelectElementMove.rectangle={
    ref:rectangle,
    x:parseFloat(rectangle.getAttribute('x')),
    y:parseFloat(rectangle.getAttribute('y')),
   }
  }
  
  if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='path'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('d');
   var obj=getPointsFromSvgPath(pathDChaine);
   globalSelectElementMove.tableauOriginal=obj.tabOri;
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polyline'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('points');
   globalSelectElementMove.tableauOriginal=pathDChaine.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
   
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='polygon'){
   
   var pathDChaine=globalGeneralSvgReferenceElement.getAttribute('points');
   globalSelectElementMove.tableauOriginal=pathDChaine.trim().replace(/ /g,',').replace(/,,/g,',').replace(/,,/g,',').replace(/,,/g,',').split(',').map(Number);
   
  }else if( globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use' ){
   
   if(globalGeneralSvgReferenceElement.getAttribute('x')){
    globalSelectElementMove.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')) ];
   }else{
    globalSelectElementMove.tableauOriginal=[ 0 , 0 ];
   }
   
   
  }else if(
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='rect'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='text'  || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='tspan' || 
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='image' ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='use'   ||
   globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='filter' 
  ){
  
   globalSelectElementMove.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('x')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('y')) ];
  
  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='circle' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='ellipse' || 'radialgradient' === globalGeneralSvgReferenceElement.nodeName.toLowerCase()){
   
   globalSelectElementMove.tableauOriginal=[ parseFloat(globalGeneralSvgReferenceElement.getAttribute('cx')) , parseFloat(globalGeneralSvgReferenceElement.getAttribute('cy')) ];

  }else if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()=='line'  || 'lineargradient' === globalGeneralSvgReferenceElement.nodeName.toLowerCase()){
   
   globalSelectElementMove.tableauOriginal=[ 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('x1')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('y1')) ,
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('x2')) , 
    parseFloat(globalGeneralSvgReferenceElement.getAttribute('y2')) ,
   ];
   
  }
  
  
 }
 //========================================================================================================
 function ajouterPointsDeControlePointsElements(){
  var pt0    = refZnDessin.createSVGPoint();
  var pt1    = refZnDessin.createSVGPoint();
  var pt2    = refZnDessin.createSVGPoint();
  var pt3    = refZnDessin.createSVGPoint();
  var pt4    = refZnDessin.createSVGPoint();
  var pt5    = refZnDessin.createSVGPoint();
//  var lst=refZnDessin.querySelectorAll('*');
  var lst=refZnDessin.querySelectorAll('[data-idarbre1]');
  
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='g' || nn==='stop' || nn==='filter' || nn==='fegaussianblur'  || nn==='use' || nn==='defs' ){
    continue;
   }
   if(lst[i].getAttribute('data-type') && ( lst[i].getAttribute('data-type')=='systeme' || lst[i].getAttribute('data-type')=='toRemove' )){
    continue;
   }
   
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' && extensions.dansDefs===true){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsPtE1' && extensions.dansDefs===false){
     continue;
    }
   }catch(e){
   }
   
   try{
    
    var col='red';
    if(_dssvg.mode_en_cours==='setModeSaisieDefsPtE1' ){
     col='yellow';
    }
    
    var idarbre1=lst[i].getAttribute('data-idarbre1');
    
    if(nn==='radialgradient'){
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
     var id=lst[i].getAttribute('id');
     // créer un cercle temporaire invisible
     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:'+(id!==null?'url(#'+id+')':'rgba(255,0,0,1)')+';stroke:blue;stroke-width:0;', // fill:url(#f)
       transform:transform
      }
     );
     var bounding=cercle.getBBox();
     cercle.remove();
    }else if(nn==='lineargradient'){   

     var xlink=lst[i].getAttribute('xlink:href');
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
     // créer un cercle temporaire invisible
     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'fill:rgba(255,0,0,1);stroke:blue;stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      }
     );
     var bounding=ligne.getBBox();
     ligne.remove();

    }else{
     var bounding=lst[i].getBBox(); // matrix
     var transform=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
    }
    if(lst[i].parentNode.nodeName.toLowerCase()!=='pattern'){
     var boite=ajouteElemDansElem(lst[i].parentNode,'rect',{'data-rectangle':idarbre1,'data-nn':nn,'data-type':'toRemove',transform:transform,x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(4/_dssvg.zoom1)+';fill:transparent;'});
    }
   }catch(e){
    if(String(e).indexOf('getBBox is not a function')>=0){
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }
  }
  
  
  for(var i=0;i<lst.length ;i++){
   var idarbre1=lst[i].getAttribute('data-idarbre1');
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='g' || nn==='stop' || nn==='filter' || nn==='fegaussianblur' || nn==='use' || nn==='defs'){
    continue;
   }
   if(lst[i].getAttribute('data-type') && ( lst[i].getAttribute('data-type')=='systeme' || lst[i].getAttribute('data-type')=='toRemove' )){
    continue;
   }
   
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' && extensions.dansDefs===true){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsPtE1' && extensions.dansDefs===false){
     continue;
    }
    if(extensions.hasOwnProperty('dansDefs') && extensions.dansDefs===true && nn!=='clippath' &&  nn!=='pattern' ){
     var transformOriginal=lst[i].getAttribute('transform');
     var monClone=lst[i].cloneNode(true);
     var t='';
     try{
      var m=lst[i].getScreenCTM();
      t='matrix('+m.a+','+m.b+','+m.c+','+m.d+',0,0) scale('+(1/_dssvg.zoom1)+','+(1/_dssvg.zoom1)+')';//'+m.e+','+m.f+')';
     }catch(e){
     }
     
     monClone.setAttribute('transform',t);
     monClone.setAttribute('data-idarbre1',idarbre1);
     monClone.setAttribute('data-type','toRemove');
     monClone.setAttribute('data-transformOriginal',transformOriginal===null?'':transformOriginal);
     refZnDessin.prepend(monClone);
    }
    
    
    
   }catch(e){
   }
   
   
   try{
    
    if(nn==='radialgradient'){

     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
     // il faut fabriquer un radialGradient inverse et assigner au cercle plus bas son url(id)

     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform);
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');
     

     var id=lst[i].getAttribute('id');

     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:'+(id!==null?'url(#'+monClone.id+')':'rgba(255,0,0,1)')+';stroke:blue;stroke-width:0;',
       transform:transform
      },
      true // enPremier
     );
     var bounding=cercle.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(cercle.getScreenCTM());
     
     
    }else if(nn==='lineargradient'){
     
     

     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);
     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');

     var id=lst[i].getAttribute('id');

     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'stroke:url(#'+monClone.id+');stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      },
      true // enPremier
     );
     var bounding=ligne.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(ligne.getScreenCTM());
    }else{
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
     var bounding=lst[i].getBBox(); // matrix
    }
    
    pt1.x=bounding.x;
    pt1.y=bounding.y;
    pt1=pt1.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt2.x=bounding.x+bounding.width;
    pt2.y=bounding.y;
    pt2=pt2.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt3.x=bounding.x+bounding.width;
    pt3.y=bounding.y+bounding.height;  
    pt3=pt3.matrixTransform(matrixRelatifVersAbsolu);
    
    pt4.x=bounding.x;
    pt4.y=bounding.y+bounding.height;  
    pt4=pt4.matrixTransform(matrixRelatifVersAbsolu);

    var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt1.x-6/_dssvg.zoom1,y:pt1.y+3/_dssvg.zoom1,style:'fill:white;stroke:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
    var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' hg',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(0,255,0,0.2);stroke:blue;stroke-width:'+(3/_dssvg.zoom1)+';','data-fnt':'actionDownSelectionIndiceArbre'});
    dot.addEventListener('mousedown',mouseDownSelectionIndiceArbre,'dot')
    dot.addEventListener('touchstart',touchDownSelectionIndiceArbre,'dot')    
   
   }catch(e){
    if(String(e).indexOf('.getBBox is not a function')>=0 || String(e).indexOf('.getScreenCTM is not a function')>=0){ 
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }

  }
  
  if(_dssvg.idArbreCourant!==null){
   var aSupp=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' hg"]')[0];
   try{
    if(aSupp!==null && aSupp!==undefined){
     aSupp.remove();
//     debugger;
     actionDownSelectionIndiceArbre(null,_dssvg.idArbreCourant) ;   
    }
   }catch(e1){
    console.warn('%cErreur à analyser e=','background:yellow;color:red;',e1)
   }
  }
  
 }
 //========================================================================================================
 function ajouterPointsDeControleElements(){
  var pt0    = refZnDessin.createSVGPoint();
  var pt1    = refZnDessin.createSVGPoint();
  var pt2    = refZnDessin.createSVGPoint();
  var pt3    = refZnDessin.createSVGPoint();
  var pt4    = refZnDessin.createSVGPoint();
  var pt5    = refZnDessin.createSVGPoint();
  var ptBoite= refZnDessin.createSVGPoint();
  
  var lst=refZnDessin.querySelectorAll('[data-idarbre1]');
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='g' || nn==='stop'  || nn=='fegaussianblur' || nn==='title' || nn==='defs' ){
    continue;
   }
   if(lst[i].getAttribute('data-type') && lst[i].getAttribute('data-type')=='systeme'){
    continue;
   }
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' && extensions.dansDefs===true){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsElt1' && extensions.dansDefs===false){
     continue;
    }
   }catch(e){
   }
   var col='red';
   if(_dssvg.mode_en_cours==='setModeSaisieDefsElt1' ){
    col='yellow';
   }
   
   try{
    var idarbre1=lst[i].getAttribute('data-idarbre1');
    if(nn==='filter'){
     var rectangleFiltre=ajouteElemDansElem(
      refZnDessin,
      'rect',
      {'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actMovElementPosition',
       x:lst[i].getAttribute('x'),
       y:lst[i].getAttribute('y'),
       width:lst[i].getAttribute('width'),
       height:lst[i].getAttribute('height'),
       style:'fill:rgba(255,0,0,1);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';',
      }
     );
     var bounding=rectangleFiltre.getBBox();
     var boite=ajouteElemDansElem(refZnDessin,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
     rectangleFiltre.remove();
    }else if(nn==='radialgradient'){
     var xlink=lst[i].getAttribute('xlink:href');
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
     // créer un cercle temporaire invisible
     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actMovElementPosition',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:rgba(255,0,0,1);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';',
       transform:transform
      }
     );
     var bounding=cercle.getBBox();
     var boite=ajouteElemDansElem(refZnDessin,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',transform:transform,x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
     cercle.remove();
      
    }else if(nn==='lineargradient'){

     var xlink=lst[i].getAttribute('xlink:href');
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';
     // créer un cercle temporaire invisible
     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actMovElementPosition',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'fill:rgba(255,0,0,1);stroke:blue;stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      }
     );
     var bounding=ligne.getBBox();
     var boite=ajouteElemDansElem(refZnDessin,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
     ligne.remove();
      
    }else if(lst[i].parentNode.nodeName.toLowerCase()==='clippath' || lst[i].parentNode.nodeName.toLowerCase()==='pattern' ){
     var transform='';
     try{
      var m=lst[i].getScreenCTM();
      transform='matrix('+m.a+','+m.b+','+m.c+','+m.d+','+m.e+','+m.f+')';
     }catch(e){
     }
     var bounding=lst[i].getBBox(); // matrix
     var boite=ajouteElemDansElem(refZnDessin,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',transform:transform,x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
    }else{
     var bounding=lst[i].getBBox(); // matrix
     var transform=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
     var boite=ajouteElemDansElem(lst[i].parentNode,'rect',{'data-rectangle':idarbre1,'data-type':'toRemove',transform:transform,x:bounding.x,y:bounding.y,width:bounding.width,height:bounding.height,style:'stroke:'+col+';stroke-opacity:0.2;stroke-width:'+(1/_dssvg.zoom1)+';fill:transparent;'});
    }
   }catch(e){
    if(String(e).indexOf('.getBBox is not a function')>=0){
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }
  }
  for(var i=0;i<lst.length ;i++){
   var nn=lst[i].nodeName.toLowerCase();
   if(nn==='g' || nn==='stop'  || nn=='fegaussianblur'  || nn==='title' || nn==='defs'){
    continue;
   }
   if(lst[i].getAttribute('data-type') && lst[i].getAttribute('data-type')=='systeme'){
    continue;
   }
   if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' && ( nn=='defs' )){
    continue;
   }
   var extensions='';
   try{
    extensions=JSON.parse(lst[i].getAttribute('data-extensions'));
    if(_dssvg.mode_en_cours==='setModeSaisieSelElt1' && extensions.dansDefs===true ){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsElt1' && extensions.dansDefs===false){
     continue;
    }
    if(_dssvg.mode_en_cours==='setModeSaisieDefsElt1' && extensions.dansDefs===true && ( nn==='clippath' || nn==='pattern' ) ){
     continue;
    }
   }catch(e){
   }
   
   try{
    var idarbre1=lst[i].getAttribute('data-idarbre1');
    
    
    var extensionSymbole=lst[i].getAttribute('data-extensions');
    if(extensionSymbole){
     extensionSymbole=JSON.parse(extensionSymbole);
     if(extensionSymbole.hasOwnProperty('dansSymbol') && extensionSymbole.dansSymbol===true){
      var monClone=lst[i].cloneNode(true);
      refZnDessin.prepend(monClone);
     }
     if(extensionSymbole.hasOwnProperty('dansDefs') && extensionSymbole.dansDefs===true){
      // cas du clipPath et du pattern
      var monClone=lst[i].cloneNode(true);
      var attrTra=lst[i].getAttribute('transform')?lst[i].getAttribute('transform'):'';
      var t='';
      try{
       var m=lst[i].getScreenCTM();
//       t='matrix('+m.a+','+m.b+','+m.c+','+m.d+',0,0) scale('+(1/_dssvg.zoom1)+','+(1/_dssvg.zoom1)+')';//'+m.e+','+m.f+')';
      }catch(e){
      }
      
      monClone.setAttribute('transform',t + ' ' + attrTra );
      monClone.setAttribute('data-idarbre1',idarbre1);
      monClone.setAttribute('data-type','toRemove');
      refZnDessin.prepend(monClone);
     }
    }

    if(nn==='radialgradient'){
     
     
     
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);

     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');


     var id=lst[i].getAttribute('id');

     var cercle=ajouteElemDansElem(
      refZnDessin,
      'circle',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       cx:lst[i].getAttribute('cx'),
       cy:lst[i].getAttribute('cy'),
       r:lst[i].getAttribute('r'),
       style:'fill:'+(id!==null?'url(#'+monClone.id+')':'rgba(255,0,0,1)')+';stroke:blue;stroke-width:0;', // fill:url(#f)
       transform:transform
      },
      true // enPremier
     );
     var bounding=cercle.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(cercle.getScreenCTM());
     
    }else if(nn==='lineargradient'){

     
     var transform=lst[i].getAttribute('gradientTransform')?lst[i].getAttribute('gradientTransform'):'';

     var cascade=calculCascadeTransform(lst[i],[]);

     var monClone=lst[i].cloneNode(true);
     monClone.id='inverse_de_'+idarbre1;
     lst[i].parentNode.appendChild(monClone);
     monClone.setAttribute('gradientTransform',cascade.matrixd + ' ' + transform );
     monClone.setAttribute('data-idarbre1','');
     monClone.setAttribute('data-type','toRemove');

     var id=lst[i].getAttribute('id');

     var ligne=ajouteElemDansElem(
      refZnDessin,
      'line',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x1:lst[i].getAttribute('x1'),
       y1:lst[i].getAttribute('y1'),
       x2:lst[i].getAttribute('x2'),
       y2:lst[i].getAttribute('y2'),
       style:'stroke:url(#'+monClone.id+');stroke-width:'+(10/_dssvg.zoom1)+';',
       transform:transform
      },
      true // enPremier
     );
     var bounding=ligne.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(ligne.getScreenCTM());
     
     
    }else if(nn==='filter'){

     var rectangle=ajouteElemDansElem(
      refZnDessin,
      'rect',
      {'data-idarbre1':idarbre1,
       'data-type':'toRemove' ,
       'data-elem':''+idarbre1+'', 
       'data-fnt':'actionDownSelectionIndiceArbre',
       x:lst[i].getAttribute('x'),
       y:lst[i].getAttribute('y'),
       width:lst[i].getAttribute('width'),
       height:lst[i].getAttribute('height'),
       style:'fill:transparent;stroke-width:'+(10/_dssvg.zoom1)+';stroke:red;stroke-opacity:0.1;',
      },
      true // enPremier
     );
     var bounding=rectangle.getBBox();
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(rectangle.getScreenCTM());
     
     
     
    }else{
     
     var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
//     console.log('matrixRelatifVersAbsolu=',matrixRelatifVersAbsolu);
     var bounding=lst[i].getBBox(); // matrix
    }
    pt1.x=bounding.x;
    pt1.y=bounding.y;
    pt1=pt1.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt2.x=bounding.x+bounding.width;
    pt2.y=bounding.y;
    pt2=pt2.matrixTransform(matrixRelatifVersAbsolu);
    
    
    pt3.x=bounding.x+bounding.width;
    pt3.y=bounding.y+bounding.height;  
    pt3=pt3.matrixTransform(matrixRelatifVersAbsolu);
    
    pt4.x=bounding.x;
    pt4.y=bounding.y+bounding.height;  
    pt4=pt4.matrixTransform(matrixRelatifVersAbsolu);

//    pt1.x-=18;
//    pt1.y-=17;
//    console.log('pt1=',pt1);
    var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt1.x-6/_dssvg.zoom1,y:pt1.y+3/_dssvg.zoom1,style:'fill:white;stroke:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
    var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove' ,'data-elem':''+idarbre1+' hg', 'data-fnt':'actMovElementPosition,mouseDownMoveElement',cx:pt1.x,cy:pt1.y,r:rayonPoint,style:'fill:rgba(255,0,0,0.2);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';'});
    dot.addEventListener('mousedown',mouseDownMoveElement,'dot');
    dot.addEventListener('touchstart',touchDownMoveElement,'dot');
    
    if(nn!=='use'){
     var txt1   = ajouteElemDansElem(refZnDessin,'text'  ,{'data-type':'toRemove' ,'text':idarbre1,x:pt3.x-6/_dssvg.zoom1,y:pt3.y+3/_dssvg.zoom1,style:'fill:white;stroke:blue;stroke-width:'+strkWiTexteSousPoignees+';font-size:'+fontSiTexteSousPoignees+'px;'});
     var dot    = ajouteElemDansElem(refZnDessin,'circle',{'data-type':'toRemove','data-elem':''+idarbre1+' bd', 'data-fnt':'actMovElementTaille,mouseDownSizeElement',cx:pt3.x,cy:pt3.y,r:rayonPoint,style:'fill:rgba(255,0,0,0.2);stroke:green;stroke-width:'+(1/_dssvg.zoom1)+';'});
     dot.addEventListener('mousedown',mouseDownSizeElement,'dot');
     dot.addEventListener('touchstart',touchDownSizeElement,'dot');
    }
    
   }catch(e){
    if(String(e).indexOf('.getScreenCTM is not a function')>=0){
    }else{
     console.warn('erreur sur lst[i]=' , lst[i].nodeName , e );
    }
   }
  }
 }
 //========================================================================================================
 function annuler1(e){
  if(_dssvg.historique1.length>1){
   var toto=_dssvg.historique1.pop(); 
   _dssvg.arbre0=_dssvg.historique1.pop();
   afficheArbre0({init:false});
  }  
 }

 
 //========================================================================================================
 function setModeSaisieEllipse1(){
  _dssvg.mode_en_cours='setModeSaisieEllipse1';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieCercle1(){
  _dssvg.mode_en_cours='setModeSaisieCercle1';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieRectangle1(){
  _dssvg.mode_en_cours='setModeSaisieRectangle1';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 
 //========================================================================================================
 function setModeSaisiePolyline1(){
  _dssvg.mode_en_cours='setModeSaisiePolyline1'; // chemin
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisiePolygon1(){
  _dssvg.mode_en_cours='setModeSaisiePolygon1'; // chemin
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieChemin1(){
  _dssvg.mode_en_cours='setModeSaisieChemin1'; // chemin
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
 }
 //========================================================================================================
 function setModeSaisieLigne2(){
  _dssvg.mode_en_cours='setModeSaisieLigne2';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieLigne1(){
  _dssvg.mode_en_cours='setModeSaisieLigne1';
  globalIndicePoint=null;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  closePopup();
 }
 //========================================================================================================
 function setModeSaisieDeplace1(){
  _dssvg.mode_en_cours='setModeSaisieDeplace1'; //deplace
  globalIndicePoint=null;
  globalGeneralSvgReferenceElement=null;
  ecran_appuye=false;
  supprimePointsControle();
  majBout();
  divLag2Complete();
  divlag1.innerHTML='<small>Vb3Z=</small><kbd>'+_dssvg.zoom1+' vB: </kbd><span style="color:red;">'+arrdi10000(_dssvg.viewBoxInit[0])+ '</span><span style="color:red;">'+arrdi10000(_dssvg.viewBoxInit[1])+ '</span><span>'+arrdi10000(_dssvg.viewBoxInit[2])+'</span><span style="color:red;">'+arrdi10000(_dssvg.viewBoxInit[3])+'</span>';
 }
 //========================================================================================================
 function setModeSaisieSelElt1(){
  _dssvg.mode_en_cours='setModeSaisieSelElt1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  affPoi();
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieEditionPoin1(){
  _dssvg.mode_en_cours='setModeSaisieEditionPoin1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  affPoi();
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieTranE1(){
  _dssvg.mode_en_cours='setModeSaisieTranE1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  globalGeneralSvgReferenceElement=null;
  affPoi();
  divLag2Complete();
 }
 //========================================================================================================
 function setModeSaisieGroupe1(){
  _dssvg.mode_en_cours='setModeSaisieGroupe1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  affPoi();
  globalGeneralSvgReferenceElement=null;
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieDefsElt1(){
  _dssvg.mode_en_cours='setModeSaisieDefsElt1';
  globalIndicePoint=null;
  majBout();
  globalGeneralSvgReferenceElement=null;
//  afficheArbre0({init:false});
  affPoi();
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieDefsPtE1(){
  _dssvg.mode_en_cours='setModeSaisieDefsPtE1';
  globalIndicePoint=null;
  majBout();
  globalGeneralSvgReferenceElement=null;
//  afficheArbre0({init:false});
  affPoi();
  divLag2Complete();  
 }
 //========================================================================================================
 function setModeSaisieDefsTrE1(){
  _dssvg.mode_en_cours='setModeSaisieDefsTrE1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  globalGeneralSvgReferenceElement=null;
  affPoi();
  divLag2Complete();
 }
 
 //========================================================================================================
 function setModeSaisieDefsGrp1(){
  _dssvg.mode_en_cours='setModeSaisieDefsGrp1';
  globalIndicePoint=null;
  majBout();
//  afficheArbre0({init:false});
  affPoi();
  globalGeneralSvgReferenceElement=null;
  divLag2Complete();  
 }
 
 //========================================================================================================
 function redrawCss(){
  getSizes()
 
  wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
  he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
  var ss = document.styleSheets[0];
  for( var i=ss.cssRules.length-1;i>=2;i--){ // on garde les règles 0 et 1 qui sont  html et *
   ss.deleteRule(i);
  }
  
  
  ss.insertRule('body{background-color:aliceblue;color:#333;font-family:verdana,arial,sans-serif;font-size:'+(_dssvg.parametres.taillePolice)+'px;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%;width:100%;position:fixed;touch-action:manipulation;height:100%;overscroll-behavior:none;overflow:hidden;-webkit-overflow-scrolling: touch;}' , ss.cssRules.length);
  ss.insertRule('*{scrollbar-color: #34d3f7 #bfe8ff;}' , ss.cssRules.length);
  ss.insertRule('*{scrollbar-width: thin;}' , ss.cssRules.length); // firefox !!!!
  ss.insertRule('*::-webkit-scrollbar {width:'+_dssvg.parametres.scroll_size+'px;height:'+_dssvg.parametres.scroll_size+'px;background:#bfe8ff;}' , ss.cssRules.length);
  ss.insertRule('*::-webkit-scrollbar-thumb {background-color: #34d3f7;}' , ss.cssRules.length);
  ss.insertRule('*::-webkit-scrollbar-corner{background-color: #34d3f7;}' , ss.cssRules.length);
  ss.insertRule('*::-webkit-resizer{background-color: #34d3f7;}' , ss.cssRules.length);  
  
  ss.insertRule('button{user-select: none;}' , ss.cssRules.length);  
  ss.insertRule('.butEnabled{display: inline-block; font-size: 0.9em; line-height: 1.0em; text-decoration: none; border: 1px #eee outset; padding    : 1px 0px 0px 1px; border-radius: 5px; box-shadow: 0px 0px 4px #aaa; color: #006c84; background: linear-gradient(to bottom,#beedff 0%, #7eddff 100%); outline: none;}' , ss.cssRules.length);  
  ss.insertRule('.butEnabled:active{  box-shadow : rgb(170 170 170) 0px 0px 0px; background : linear-gradient(rgb(121, 247, 131) 0%, rgb(190, 255, 219) 100%); border     : 1px inset rgb(238, 238, 238);}' , ss.cssRules.length);  
  ss.insertRule('.butDisabled{ display: inline-block; font-size: 0.9em; line-height: 1.0em; text-decoration: none; border: 1px #eee inset; padding    : 1px 0px 0px 1px;  border-radius: 5px; color: #a8b9bd; outline: none; box-shadow: none; background : linear-gradient(rgb(121, 247, 131) 0%, rgb(190, 255, 219) 100%);}  ' , ss.cssRules.length);  
  ss.insertRule('.butMenuGauche{width:'+(wi_of_the_menulft-2*wi_of_the_brds1-globalScrollWidth1)+'px;margin-bottom:'+(_dssvg.parametres.intervalleEntreBtns)+'px;min-height:'+_dssvg.parametres.hauteurMinBtnMenuGau+'px;max-height:'+_dssvg.parametres.hauteurMinBtnMenuGau+'px;overflow:hidden; }' , ss.cssRules.length);  
  ss.insertRule('.butMenuHaut{height:'+(he_of_the_menutpe-2*wi_of_the_brds1-globalScrollWidth1)+'px;margin-right:'+(_dssvg.parametres.intervalleEntreBtns)+'px;min-width: fit-content;width: min-content;display:inline-block;white-space:pre;}' , ss.cssRules.length);  
  ss.insertRule('#divlag1 {overflow:hidden;font-size:0.8em;}' , ss.cssRules.length);  
  ss.insertRule('#divlag1 span{display:inline-block;min-width:6em;}' , ss.cssRules.length);  
  ss.insertRule('#divlag2 {overflow:hidden;font-size:0.8em;background:white;border:1px #444 outset;display:flex;flex-flow:row wrap;}' , ss.cssRules.length);  
  ss.insertRule('#divlag2 button,#divlag2 div{display:inline-block;margin-right:3px;padding-right:3px;height:'+(he_of_the_menutpe-2*wi_of_the_brds1-globalScrollWidth1-2)+'px;}' , ss.cssRules.length);  
  ss.insertRule('.butpopUp{margin-right:'+(_dssvg.parametres.intervalleEntreBtns)+'px;min-width:'+(wi_of_the_menulft-2*wi_of_the_brds1-globalScrollWidth1)+'px;display:inline-block;}' , ss.cssRules.length);  
  

  ss.insertRule('#divlft{overflow-y:scroll;position:absolute;}' , ss.cssRules.length);  
  ss.insertRule('#divtpe{overflow: scroll hidden;position:absolute;display:flex;flex-flow: row nowrap;}' , ss.cssRules.length);  
  
  
  ss.insertRule('#popupContent1{z-index: 101;opacity: 0.9;position: absolute;background: white;overflow: scroll;    border-radius: 4px;box-shadow: 0px 0px 25px #000;user-select: text;}' , ss.cssRules.length);  
  
  
  ss.insertRule('#popupValue div{}' , ss.cssRules.length); 
  ss.insertRule('#popupValue label{margin-right:5px;}' , ss.cssRules.length);  
  ss.insertRule('#popupValue input{min-width:50px;padding:5px;user-select:all;}' , ss.cssRules.length);  
  ss.insertRule('#popupValue textarea{border:2px #eee inset;border-radius:4px;padding:4px;min-width:80%;user-select:all;}' , ss.cssRules.length);  
  
  ss.insertRule('.svgBoutonGauche1{max-height:'+(_dssvg.parametres.hauteurMinBtnMenuGau-2*wi_of_the_brds1-3)+'px;}' , ss.cssRules.length);  // pourquoi -3 ??
  ss.insertRule('.svgBoutonHaut1{min-width:'+_dssvg.parametres.largeurMinBtnMenuHau+'px;height:'+(_dssvg.parametres.hauteurMenuHaut-4*wi_of_the_brds1)+'px;}' , ss.cssRules.length);  
  ss.insertRule('.bckRouge{background:'+bckRouge+';color:yellow;}' , ss.cssRules.length);  
  ss.insertRule('.bckVert1{background:'+bckVert1+';}' , ss.cssRules.length);  
  ss.insertRule('.bckVert2{background:'+bckVert2+';}' , ss.cssRules.length);  
  ss.insertRule('.bckJaune{background:'+bckJaune+';color:red;}' , ss.cssRules.length);  
  ss.insertRule('.bckRose{background:'+bckRose+';color:red;}' , ss.cssRules.length);  
  
  ss.insertRule('.lienExt1{padding:0px 5px ;display: flex;align-items: center;margin:5px;}' , ss.cssRules.length);  
  
  
  
  
  
  ss.insertRule('.class_treediv1{ border:1px #F7F3CA outset; height:40px; overflow:hidden; display : flex;  flex-direction: row; justify-content: space-between; }' , ss.cssRules.length);  
  ss.insertRule('.class_treeIntervalldiv2{border:1px #F7F3CA solid;}' , ss.cssRules.length);  
  ss.insertRule('.class_treeTextContentdiv3{text-align:left;flex-grow:1;;font-size:0.9em;}' , ss.cssRules.length);  
  ss.insertRule('.class_treedivFolder1{border:0px lime solid;}' , ss.cssRules.length);  
  ss.insertRule('.class_treeFold1,.class_treeDelet1{ display:inline-block; float:left; height:30px; min-width:30px; border:1px #F7F3CA outset; text-align: center; text-decoration: none; font-size: 2em; line-height: 1.1em; border-radius:5px; color:black; font-weight:bold; cursor:pointer; font-family:monospace;}' , ss.cssRules.length);
  ss.insertRule('.class_treeHandle1{ border:1px #F7F3CA outset; display:inline-block; float:right; height:30px; width:30px; min-width:45px; text-align: center; text-decoration: none; font-size: 1.5em; line-height: 1.6em; border-radius:5px; font-family:monospace; cursor:pointer;}' , ss.cssRules.length);
  ss.insertRule('.class_tree_yydanger {    color: #FFFFFF!important;    background: linear-gradient(to bottom, #FF0000, #D30000)!important;    font-size: 1.5em;    display: inline-block;    text-decoration: none;    text-align: center;    border-radius: 5px;    font-family: verdana, arial, sans-serif;    cursor: pointer;    min-width: 40px;    min-height: 30px;    line-height: 30px;    border: 1px #F7F3CA outset;}' , ss.cssRules.length);
  ss.insertRule('#editTree1 td{ border:1px blue solid; margin:1px; padding:1px;}' , ss.cssRules.length);
  ss.insertRule('#editTree1 input,#editTree1 textarea{ border:2px #eee inset; margin:1px; padding:5px;width:100%;font-size:1.1em;overflow:scroll;user-select:all;}' , ss.cssRules.length);
  ss.insertRule('#editTree1 textarea::-webkit-scrollbar{width:25px;}' , ss.cssRules.length);
  
  
 }  
//========================================================================================================
 function getScrollWidth(){
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
 //========================================================================================================
 function resize1(){
  getSizes();

  
  divtpe.style.top=(margns.t)+'px';
  divtpe.style.left=(wi_of_the_menulft+margns.l)+'px';
  divtpe.style.border=wi_of_the_brds1+'px red solid';
  divtpe.style.width=(xscreen-wi_of_the_menulft-margns.l-margns.r)+'px';
  divtpe.style.height=he_of_the_menutpe+'px';

  divlft.style.top=(margns.t)+'px';
  divlft.style.left=(margns.l)+'px';
  divlft.style.border=wi_of_the_brds1+'px red solid';
  divlft.style.width=(wi_of_the_menulft)+'px';
  divlft.style.height=(yscreen-margns.t-margns.b)+'px';
  
  divc1.style.top=(margns.t+he_of_the_menutpe+decal.t)+'px';
  divc1.style.left=(margns.l+wi_of_the_menulft+decal.l)+'px';
  divc1.style.border=wi_of_the_brds2+'px red solid';
  divc1.style.width=(xscreen-margns.l-wi_of_the_menulft-decal.l-margns.r)+'px';
  divc1.style.height=(yscreen-margns.t-he_of_the_menutpe-decal.t-margns.b)+'px';
  
  decalageX=margns.l+wi_of_the_menulft+decal.l+wi_of_the_brds2;
  decalageY=margns.t+he_of_the_menutpe+decal.t+wi_of_the_brds2;
  refZnDessin.style.top=0; //(margns.t+he_of_the_menutpe+decal.t+wi_of_the_brds2)+'px';
  refZnDessin.style.left=0; //(margns.l+wi_of_the_menulft+decal.l+wi_of_the_brds2)+'px';
  
  var largeurDessin=(xscreen-margns.l-wi_of_the_menulft-decal.l-margns.r-2*wi_of_the_brds2);
  refZnDessin.style.width=largeurDessin+'px';
  var hauteurDessin=(yscreen-margns.t-he_of_the_menutpe-decal.t-margns.b-2*wi_of_the_brds2);
  refZnDessin.style.height=hauteurDessin+'px';
  
  if(_dssvg.viewBoxInit===null){
   _dssvg.viewBoxInit=[-2,-2,largeurDessin/_dssvg.zoom1,hauteurDessin/_dssvg.zoom1];
  }else{
   _dssvg.viewBoxInit=[_dssvg.viewBoxInit[0],_dssvg.viewBoxInit[1],largeurDessin/_dssvg.zoom1,hauteurDessin/_dssvg.zoom1];
  }
//  refZnDessin.setAttribute('viewBox',_dssvg.viewBoxInit.join(' '));
  setAttributeViewBox();  


  divlag1.style.top=(margns.t+he_of_the_menutpe)+'px';
  divlag1.style.left=(margns.l+wi_of_the_menulft+decal.l)+'px';
  divlag1.style.border=wi_of_the_brds2+'px pink solid';
  divlag1.style.width=(xscreen-margns.l-wi_of_the_menulft-decal.l-margns.r)+'px';
  divlag1.style.height=(decal.t)+'px';
  
//  divlag2.style.top=(margns.t+he_of_the_menutpe+decal.t+yscreen-margns.t-he_of_the_menutpe-decal.t-margns.b)+'px';
  divlag2.style.bottom=0;
  divlag2.style.minHeight=(margns.b)+'px';
  divlag2.style.left='0px';
  divlag2.style.width=(xscreen-margns.l-margns.r)+'px';
  divlag2.style.height='fit-content';
  
  if(popUpIsDisplayed1!==''){
   resizePopup({from:popUpIsDisplayed1});
  }
  

  
 } 
 //========================================================================================================
 function debounce(func, wait, immediate) { // https://davidwalsh.name/javascript-debounce-function
  var timeout;
  return function() {
   var context = this, args = arguments;
   var later = function() {
    timeout = null;
    if (!immediate) func.apply(context, args);
   };
   var callNow = immediate && !timeout;
   clearTimeout(timeout);
   timeout = setTimeout(later, wait);
   if (callNow) func.apply(context, args);
  };
 }
 //========================================================================================================
 var myEffitFn=debounce(function(){
  resize1(); // All the taxing stuff you do
 }, 250);
 //========================================================================================================
 function _foldFunction1(idArbre){

  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id===idArbre){
    _dssvg.arbre0[i].isOpen=_dssvg.arbre0[i].isOpen===1?0:1;
    oMyTree1.fold(idArbre);
    break;
   }
  }
  
 }
 //========================================================================================================
 function _editFunction1(idArbre){
  var values=null;
  var branche=null;
  var indiceArbre=null;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id==idArbre){
    indiceArbre=i;
    branche=_dssvg.arbre0[i];
    values=_dssvg.arbre0[i].data;
    break;
   }
  }
  
  var td1MaxWidth='width:15%';
  var styleTextFait=false;
  var elementsAffiches=[];
  var tt='';
  for(var i in values.attributes){
   tt+='<tr>';
   if(i=='data-extensions' ){
    tt+='<td style="background:lightgrey;'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td style="background:lightgrey;"><span>'+values.attributes[i]+'</span></td>';
   }else if(i=='data-idarbre1' ){
    tt+='<td style="background:lightgrey;'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td style="background:lightgrey;"><span>'+values.attributes[i]+'</span></td>';
//    tt+='<td></td>';
   }else if(i=='d'){
    tt+='<td style="'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td><textarea  id="bef_input_'+i+'" data-attrib="'+i+'" cols="50" rows="3" >'+values.attributes[i]+'</textarea>';
    tt+='<br />';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="if(document.getElementById(\'bef_input_'+i+'\').style.overflow==\'hidden\'){document.getElementById(\'bef_input_'+i+'\').style.overflow=\'scroll\';}else{document.getElementById(\'bef_input_'+i+'\').style.overflow=\'hidden\';}">RS</button>';
    tt+='</td>';

   }else if(i==='stroke-linejoin'){
    tt+='<td style="'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td><input  id="bef_input_'+i+'"    data-attrib="'+i+'" value="'+values.attributes[i]+'" />';
    tt+='<br />';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'\'">null</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'round\'">round</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'miter\'">miter</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'bevel\'">bevel</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'miter-clip\'">miter-clip</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'arcs\'">arcs</button>';
    tt+='</td>';
   }else if(i==='stroke-linecap'){
    tt+='<td style="'+td1MaxWidth+';">'+i+'</td>';
    tt+='<td><input  id="bef_input_'+i+'"    data-attrib="'+i+'" value="'+values.attributes[i]+'" />';
    tt+='<br />';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'\'">null</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'round\'">round</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'butt\'">butt</button>';
    tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'bef_input_'+i+'\').value=\'square\'">square</button>';
    tt+='</td>';
   }else{
    if(i==='style'){
     tt+='<td style="'+td1MaxWidth+';">'+i+'</td>';
     tt+='<td>';
     tt+='<textarea cols="50" rows="3" id="idtempstyle" data-attrib="'+i+'">'+values.attributes[i]+'</textarea>';
     tt+='<br /><button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="document.getElementById(\'idtempstyle\').value=\'fill:red;stroke:blue;stroke-width:1;\'">default</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="if(document.getElementById(\'bef_input_'+i+'\').style.overflow==\'hidden\'){document.getElementById(\'bef_input_'+i+'\').style.overflow=\'scroll\';}else{document.getElementById(\'bef_input_'+i+'\').style.overflow=\'hidden\';}">RS</button>';
     tt+='</td>';
    }else{
     tt+='<td style="'+td1MaxWidth+';">'+i+'</td><td><input     data-attrib="'+i+'" value="'+values.attributes[i]+'"></td>';
     if(branche.data.nodeName.toLowerCase()==='style' ){
      styleTextFait=true;
     }
    }
   }
   tt+='</tr>';
   elementsAffiches.push(i);
  }
  if(branche.data.nodeName.toLowerCase()==='style' && styleTextFait===false ){
   tt+='<tr>';
   tt+='<td style="'+td1MaxWidth+';">text</td>';
   var valeur=(branche.data[branche.data.nodeName]!==undefined?branche.data[branche.data.nodeName]:branche.data['text']);
   tt+='<td><textarea id="idtemptext" data-attrib="'+branche.data.nodeName.toLowerCase()+'" cols="50" rows="3">'+valeur+'';
   tt+='</textarea></td>';
   tt+='</tr>';
  }else if(branche.data.nodeName.toLowerCase()==='text' || branche.data.nodeName.toLowerCase()==='tspan' || branche.data.nodeName.toLowerCase()==='title' ){
   tt+='<tr>';
   tt+='<td style="'+td1MaxWidth+';">'+branche.data.nodeName.toLowerCase()+'</td>';
   var valeur=(branche.data[branche.data.nodeName]!==undefined?branche.data[branche.data.nodeName]:branche.data['text']);
   tt+='<td><textarea id="idtemptext" data-attrib="'+branche.data.nodeName.toLowerCase()+'" cols="50" rows="3">'+valeur+'';
   tt+='</textarea></td>';
   tt+='</tr>';
  }
  var lstAttribs=[];
  if(
   values.nodeName=='path'   || 
   values.nodeName=='g'      || 
   values.nodeName=='rect'   ||
   values.nodeName=='circle' ||
   values.nodeName=='polyline' ||
   values.nodeName=='polygon' ||
   false
  ){
   lstAttribs=['id','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform','line-cap','enable-background','filter','stroke-linecap','stroke-linejoin','stroke-miterlimit','stroke-dasharray'];
  }
  
  if(values.nodeName=='text'           ){ lstAttribs=['id','x','y','font-family','font-size','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform'];  }
  if(values.nodeName=='tspan'          ){ lstAttribs=['id','x','y','font-family','font-size','style','fill','fill-opacity','fill-rule','stroke','stroke-width','opacity','transform'];  }
  if(values.nodeName=='circle'         ){ lstAttribs=['id','cx','cy','r'];  }

  if(values.nodeName=='radialGradient' ){ lstAttribs=['id','cx','cy','r'      ,'gradientUnits','gradientTransform','xlink:href'];  }
  if(values.nodeName=='linearGradient' ){ lstAttribs=['id','x1','x2','y1','y2','gradientUnits','gradientTransform','xlink:href'];  }
  
  if(values.nodeName=='path'           ){ lstAttribs.push('d'); }
  if(values.nodeName=='rect'           ){ lstAttribs.push('x'); lstAttribs.push('y'); lstAttribs.push('width'); lstAttribs.push('height'); lstAttribs.push('rx'); lstAttribs.push('ry'); }
  if(values.nodeName=='circle'         ){ lstAttribs.push('cx'); lstAttribs.push('cy'); lstAttribs.push('r'); }
  
  if(values.nodeName=='filter'         ){ lstAttribs=['id','color-interpolation-filters'];  }
  if(values.nodeName=='feGaussianBlur' ){ lstAttribs=['stdDeviation'];  }
  
  if(values.nodeName=='stop'   ){ lstAttribs=['offset','stop-color'];  }
  
  
  for(var i=0;i<lstAttribs.length;i++){
   var trouve=false;
   for(var j=0;j<elementsAffiches.length;j++){
    if(elementsAffiches[j]==lstAttribs[i]){
     trouve=true;
     break;
    }
   }
   if(trouve===false){
    tt+='<tr>';
    if(lstAttribs[i]==='style'){
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td>';
     tt+='<textarea  id="idtempstyle"   data-attrib="'+lstAttribs[i]+'"></textarea>';
     tt+='<br /><button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'idtempstyle\').value=\'fill:red;stroke:blue;stroke-width:1;\'">Def</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+i+'" class="butEnabled" onclick="if(document.getElementById(\'idtempstyle\').style.overflow==\'hidden\'){document.getElementById(\'idtempstyle\').style.overflow=\'scroll\';}else{document.getElementById(\'idtempstyle\').style.overflow=\'hidden\';}">RS</button>';
     tt+='</td>';
    }else if(lstAttribs[i]==='d'){
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td><input      data-attrib="'+lstAttribs[i]+'" value="M 10 10 20 20"></td>';
    }else if(lstAttribs[i]==='stroke-linejoin'){
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td><input  id="input_'+i+'"    data-attrib="'+lstAttribs[i]+'" value="">';
     tt+='<br />';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'\'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'round\'">round</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'miter\'">miter</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'bevel\'">bevel</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'miter-clip\'">miter-clip</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\arcs\'">arcs</button>';
     tt+='</td>';
    }else if(lstAttribs[i]==='stroke-linecap'){
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td><input  id="input_'+i+'"    data-attrib="'+lstAttribs[i]+'" value="">';
     tt+='<br />';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'\'">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'round\'">round</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'butt\'">butt</button>';
     tt+='<button id="defaultStyle" data-forAttrib="'+lstAttribs[i]+'" class="butEnabled" onclick="document.getElementById(\'input_'+i+'\').value=\'square\'">square</button>';
     tt+='</td>';
    }else{
     tt+='<td style="'+td1MaxWidth+';">'+lstAttribs[i]+'</td>';
     tt+='<td><input      data-attrib="'+lstAttribs[i]+'" value=""></td>';
    }
    tt+='</tr>';
   }
  }
  tt+='<tr>';
  tt+='<td colspan="2" style="background:lightgrey;">'+trad['nouvelle_propriete_définie_manuellement']+'</td>';
  tt+='</tr>';
  tt+='<tr>';
  tt+='<td><input id="nouvellePropNom" type="text" value=""  placeholder="'+trad['entrez_un_nom']+'" /></td>';
  tt+='<td><input id="nouvellePropValeur" type="text" value=""  placeholder="'+trad['entrez_une_valeur']+'" /></td>';
  tt+='</tr>';
  
  dogid('editTree1').innerHTML='<table id="editTree1Table" border="1" style="border:1px blue solid;margin:1px;max-width:500px;width:100%;"><tr><td colspan="2" style="color:red;text-align:center;">'+idArbre+'</td></tr>'+tt+'</table>';
  
  dogid('updateTree1').setAttribute('data-idArbre' , idArbre);
  dogid('updateTree1').style.display='';
  dogid('annulerTree1').style.display='';
  dogid('reconstruireSvgEtFermer').style.display='none';
  
 }
 //========================================================================================================
 function myCallBackAction1(context,tree){

  if(context.action.substr(0,7)==='delete|'){
  }else{
   switch(context.action){
    case 'afterReorganize' :

     var newTree=[_dssvg.arbre0[0]];
     for(var i=0;i<tree.length;i++){
      newTree.push(tree[i]);
     }
     _dssvg.arbre0=newTree;
     
    break;
    
    case 'addBranch' :
 //    console.log(context,tree,_dssvg.arbre0);
    break;
    
    case 'afterFold' :
 //    console.log(tree);
    break;
    
    case 'init' :
 //    console.log(tree);
    break;
    
    case 'delete' :
 //    console.log(tree);
    break;
    
    default:
     console.warn('NON prévu : context=',context,'tree=',tree);
    break;
   }
   
  }
 }
 //========================================================================================================
 
 function _deleteFunction1(idToDelete){// if you want to delete a node
  if(!confirm(trad['Certain']+' ?')){
   return
  }
  
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id==idToDelete){
    
    
    _dssvg.arbre0.splice(i,1);
    if(globalGeneralSvgReferenceElement && globalGeneralSvgReferenceElement.getAttribute('data-idarbre1') && globalGeneralSvgReferenceElement.getAttribute('data-idarbre1')==i){
     globalGeneralSvgReferenceElement=null;
    }
    
    
    break;
   }
  }
  
  // Here, do (ajax) database stuffs with idToDelete 
  // ......
  // and if success ...
  oMyTree1.delete(idToDelete); // ... update the tree view
 }
 //========================================================================================================
 function annulerTree1(e){
  dogid('editTree1').innerHTML='';
  dogid('reconstruireSvgEtFermer').style.display='';
  dogid('updateTree1').style.display='none';  
  dogid('annulerTree1').style.display='none';  
 }
 //========================================================================================================
 function nomProprieteValide(n){
  for(var i=0;i<n.length;i++){
   var c=n.substr(i,1);
   if(!((c>='0' && c<='9')||(c>='A' && c<='Z')||(c>='a' && c<='z')||(c==='-' || c==='_' || c===':'))){
    return false;
   }
  }
  return true;
 }
 //========================================================================================================
 function updatetree1(e){
  
  var elt=dogid(e.target.id);
  var idArbre=parseInt(elt.getAttribute('data-idarbre'),10);
  var indiceArbre=recupereIndiceArbre(idArbre);
  var newValues=[];
  var el=['input','textarea','td'];
  var txt='';

  var nouveauxAttributs={};  
  for(var l=0;l<el.length;l++){
   
   var lst=dogid('editTree1Table').getElementsByTagName(el[l]);
   for(var j=0;j<lst.length;j++){
    if(lst[j].getAttribute('data-attrib') && lst[j].value && lst[j].value !=''){
     if(lst[j].getAttribute('data-attrib')=='text' || lst[j].getAttribute('data-attrib')=='tspan' || lst[j].getAttribute('data-attrib')=='title'  ){
      txt=htm1(lst[j].value);
     }else{
      if(_dssvg.arbre0[indiceArbre].data.nodeName.toLowerCase()==='style'){
       txt=htm1(lst[j].value);
      }else{
       nouveauxAttributs[lst[j].getAttribute('data-attrib')]=htm1(lst[j].value);
      }
     }
    }else if(lst[j].getAttribute('data-attrib') && lst[j].getAttribute('data-value') && lst[j].getAttribute('data-value')!=='' ){
     nouveauxAttributs[lst[j].getAttribute('data-attrib')]=htm1(lst[j].getAttribute('data-value'));
    }
   }
  }
  
  if(dogid('nouvellePropNom').value!==''){
   var nom=dogid('nouvellePropNom').value;
   if(nomProprieteValide(nom)){
    nouveauxAttributs[nom]=htm1(dogid('nouvellePropValeur').value);
   }else{
    alert('Le nom de la propriété ne coit contenir que des caractères "A...Z"  "a...z"  "0...9" "-" "_" ":" ')
    return;
   }
  }
  
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id==idArbre){
    _dssvg.arbre0[i].data.attributes=JSON.parse(JSON.stringify(nouveauxAttributs));
    _dssvg.arbre0[i].data.text=txt;
    break;
   }
  }
  dogid('editTree1').innerHTML='';
  dogid('reconstruireSvgEtFermer').style.display='';
  dogid('updateTree1').style.display='none';
  dogid('annulerTree1').style.display='none';  
  
 }
 //========================================================================================================
 function ajouterGroupe(e){
  // do ajax database stuffs to get a new id and label and if success ...
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'g',
   level:0,
   type:'node',
   nodeName:'g',
   text:'',
   attributes:{'data-idarbre1':nouvelId},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
 }
 //========================================================================================================
 function ajouterDef(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'defs',
   level:0,
   type:'node',
   nodeName:'defs',
   text:'',
   attributes:{'data-idarbre1':nouvelId},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
 }
 //========================================================================================================
 function ajouterRadialGradient(e){
  var nouvelId=-1;
  var indiceDefs=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
   if(_dssvg.arbre0[i].data.nodeName==='defs'){
    indiceDefs=i;
   }
  }
  nouvelId+=1;
  if(indiceDefs<0){
   indiceDefs=nouvelId;
   var data={
    label:'defs',
    level:0,
    type:'node',
    nodeName:'defs',
    text:'',
    attributes:{'data-idarbre1':nouvelId},
    sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
   };
   
   var obj1={
    id:nouvelId,parentId:0,isOpen:1,
    data:data
   };
   _dssvg.arbre0.push(obj1);
   oMyTree1.addElement(obj1);
   nouvelId+=1;
  }
  
  var data={
   label:'radialGradient',
   level:0,
   type:'node',
   nodeName:'radialGradient',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'cx':0,'cy':0,'r':5,'id':nouvelId,'gradientTransform':'','gradientUnits':'userSpaceOnUse','xlink:href':''},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:indiceDefs,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  ajouterStop(null,{'parentId':nouvelId,'offset':0.00,'stop-color':'red'})
  ajouterStop(null,{'parentId':nouvelId,'offset':0.33,'stop-color':'green'})
  ajouterStop(null,{'parentId':nouvelId,'offset':0.66,'stop-color':'green'})
  ajouterStop(null,{'parentId':nouvelId,'offset':1.00,'stop-color':'blue'})
  
 }
 
 //========================================================================================================
 function ajouterLinearGradient(e){
  var nouvelId=-1;
  var indiceDefs=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
   if(_dssvg.arbre0[i].data.nodeName==='defs'){
    indiceDefs=i;
   }
  }
  nouvelId+=1;
  if(indiceDefs<0){
   indiceDefs=nouvelId;
   var data={
    label:'defs',
    level:0,
    type:'node',
    nodeName:'defs',
    text:'',
    attributes:{'data-idarbre1':nouvelId},
    sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
   };
   
   var obj1={
    id:nouvelId,parentId:0,isOpen:1,
    data:data
   };
   _dssvg.arbre0.push(obj1);
   oMyTree1.addElement(obj1);
   nouvelId+=1;
  }
  
  
  
  var data={
   label:'linearGradient',
   level:0,
   type:'node',
   nodeName:'linearGradient',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'x1':0,'y1':0,'x2':5,'y2':5,'id':nouvelId,'gradientTransform':'','gradientUnits':'userSpaceOnUse','xlink:href':''},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:indiceDefs,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  ajouterStop(null,{'parentId':nouvelId,'offset':0.00,'stop-color':'red'})
  ajouterStop(null,{'parentId':nouvelId,'offset':0.33,'stop-color':'green'})
  ajouterStop(null,{'parentId':nouvelId,'offset':0.66,'stop-color':'green'})
  ajouterStop(null,{'parentId':nouvelId,'offset':1.00,'stop-color':'blue'})
  
  
 }
 
 //========================================================================================================
 function ajouterPattern(e){
  var nouvelId=-1;
  var indiceDefs=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
   if(_dssvg.arbre0[i].data.nodeName==='defs'){
    indiceDefs=i;
   }
  }
  nouvelId+=1;
  if(indiceDefs<0){
   indiceDefs=nouvelId;
   var data={
    label:'defs',
    level:0,
    type:'node',
    nodeName:'defs',
    text:'',
    attributes:{'data-idarbre1':nouvelId},
    sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
   };
   
   var obj1={
    id:nouvelId,parentId:0,isOpen:1,
    data:data
   };
   _dssvg.arbre0.push(obj1);
   oMyTree1.addElement(obj1);
   nouvelId+=1;
  }
  
  
  
  var data={
   label:'pattern',
   level:0,
   type:'node',
   nodeName:'pattern',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'viewBox':'0,0,10,10','width':'10%','height':'10%'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:indiceDefs,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
  
  nouvelId+=1;
  var data={
   label:'path',
   level:0,
   type:'node',
   nodeName:'path',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId,'d':'M 0 0 L 0 5 0 10 5 0 10 10 10 5 10 0  5 10 0 0','stroke':'black','fill':'red'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:nouvelId-1,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
  
  
 }
 //========================================================================================================
 function ajouterSymbol(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  var data={
   label:'symbol',
   level:0,
   type:'node',
   nodeName:'symbol',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
  
  nouvelId+=1;
  
  var data={
   label:'path',
   level:1,
   type:'node',
   nodeName:'path',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'d':'M 0 0 h 1 v 1 h -1 v -1'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:nouvelId-1,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterStop(e,par){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'stop',
   level:0,
   type:'node',
   nodeName:'stop',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'offset':(par===undefined?0:par['offset']),'stop-color':(par===undefined?0:par['stop-color'])},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:(par===undefined?0:par['parentId']),isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterFilter(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'filter',
   level:0,
   type:'node',
   nodeName:'filter',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId,'color-interpolation-filters':'sRGB'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterFeGaussianBlur(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'feGaussianBlur',
   level:0,
   type:'node',
   nodeName:'feGaussianBlur',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId,'stdDeviation':'0.5'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterImage(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'image',
   level:0,
   type:'node',
   nodeName:'image',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'id':nouvelId,'xlink:href':'./kermit.jpg'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }
 //========================================================================================================
 function ajouterTitle(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'title',
   level:0,
   type:'node',
   nodeName:'title',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'text':''},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }

 //========================================================================================================
 function ajouterUse(e){
  var nouvelId=-1;
  for(var i=0;i<_dssvg.arbre0.length;i++){
   if(_dssvg.arbre0[i].id>nouvelId){
    nouvelId=_dssvg.arbre0[i].id;
   }
  }
  nouvelId+=1;
  
  var data={
   label:'use',
   level:0,
   type:'node',
   nodeName:'use',
   text:'',
   attributes:{'data-idarbre1':nouvelId,'x':'0','y':'0','href':'#0'},
   sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
  };
  
  var obj1={
   id:nouvelId,parentId:0,isOpen:1,
   data:data
  };
  _dssvg.arbre0.push(obj1);
  oMyTree1.addElement(obj1);
 }

 //========================================================================================================
 function insererTag(){
  var nomTag=document.getElementById('nomTag').value;
  if(nomTag!==''){
   var nouvelId=-1;
   for(var i=0;i<_dssvg.arbre0.length;i++){
    if(_dssvg.arbre0[i].id>nouvelId){
     nouvelId=_dssvg.arbre0[i].id;
    }
   }
   nouvelId+=1;
   
   var data={
    label:nomTag,
    level:0,
    type:'node',
    nodeName:nomTag,
    text:'',
    attributes:{'data-idarbre1':nouvelId,'text':''},
    sizes:{minx:999999,miny:999999,maxx:-999999,maxy:-999999}
   };
   
   var obj1={
    id:nouvelId,parentId:0,isOpen:1,
    data:data
   };
   _dssvg.arbre0.push(obj1);
   oMyTree1.addElement(obj1);
   
  }
  annulerTag();
 }
 //========================================================================================================
 function annulerTag(){
  document.getElementById('tag1').style.display='none';
 }
 //========================================================================================================
 function ajouterTag(){
  document.getElementById('tag1').style.display='';
 }
 //========================================================================================================
 function rechercherDansArbre(){
  dogid('resRechercherDansArbre').innerHTML='';
  var valeur=dogid('champRechercherDansArbre').value;
  var tabTrouves=[];
  if(valeur!==''){
   for(var i=0;i<_dssvg.arbre0.length;i++){
    var t=JSON.stringify(_dssvg.arbre0[i]);
    if(t.indexOf(valeur)>=0){
     tabTrouves.push(i);
    }
   }
   dogid('resRechercherDansArbre').innerHTML=tabTrouves.join(',');
  }
 }
 //========================================================================================================
 function popupArbo1(e){

  var contentOfPopup='<h3>'+trad['arbre']+'</h3>';
  contentOfPopup+='<div id="comandTop">';
  contentOfPopup+='<button id="ajouterGroupe"          class="butMenuHaut butEnabled butpopUp">+g</button>';
  contentOfPopup+='<button id="ajouterDef"             class="butMenuHaut butEnabled butpopUp">+defs</button>';
  contentOfPopup+='<button id="ajouterRadialGradient"  class="butMenuHaut butEnabled butpopUp">+radGrad</button>';
  contentOfPopup+='<button id="ajouterLinearGradient"  class="butMenuHaut butEnabled butpopUp">+linGrad</button>';
  contentOfPopup+='<button id="ajouterStop"            class="butMenuHaut butEnabled butpopUp">+stop</button>';
  contentOfPopup+='<button id="ajouterFilter"          class="butMenuHaut butEnabled butpopUp">+filter</button>';
  contentOfPopup+='<button id="ajouterFeGaussianBlur"  class="butMenuHaut butEnabled butpopUp">+feGaus</button>';
  contentOfPopup+='<button id="ajouterImage"           class="butMenuHaut butEnabled butpopUp">+image</button>';
  contentOfPopup+='<button id="ajouterTitle"           class="butMenuHaut butEnabled butpopUp">+title</button>';
  contentOfPopup+='<button id="ajouterPattern"         class="butMenuHaut butEnabled butpopUp">+pattern</button>';
  
  contentOfPopup+='<button id="ajouterSymbol"          class="butMenuHaut butEnabled butpopUp">+symbol</button>';
  contentOfPopup+='<button id="ajouterUse"             class="butMenuHaut butEnabled butpopUp">+use</button>';
  contentOfPopup+='<button id="ajouterTag"             class="butMenuHaut butEnabled butpopUp bckJaune">+tag</button>';
  contentOfPopup+='<div>';
   contentOfPopup+='<input id="champRechercherDansArbre" placeholder="'+trad['rechercher']+'" style="max-width:100px;">';
   contentOfPopup+='<button id="rechercherDansArbre"    class="butMenuHaut butEnabled butpopUp bckJaune">'+trad['rechercher']+'</button>';
   contentOfPopup+='<div id="resRechercherDansArbre"    style="display:inline-block;min-width:100px;"></div>';
  contentOfPopup+='</div>';
  
  
  contentOfPopup+='</div>';
  contentOfPopup+='<div id="container1" style="max-width:85%;border:1px #000 solid;overflow-y:scroll;max-height:400px;">';
  contentOfPopup+='<div id="myTreeId1"></div>';
  contentOfPopup+='</div>';
  contentOfPopup+='<div id="editTree1"></div>';
  contentOfPopup+='<div id="tag1" style="display:none;">';
  contentOfPopup+='<table border="1" style="border:1px blue solid;margin:1px;max-width:500px;width:100%;">';
  contentOfPopup+=' <tbody>';
  contentOfPopup+='  <tr>';
  contentOfPopup+='   <td style="background:lightgrey;width:20%;">Nom du tag</td>';
  contentOfPopup+='   <td><input id="nomTag" value="" placeholder="'+trad['entrez_un_nom_de_tag_ici']+'" style="border: 2px inset rgb(238, 238, 238);  margin: 1px;  padding: 5px;width: 100%;"/></td>';
  contentOfPopup+='  </tr>';
  contentOfPopup+='  <tr>';
  contentOfPopup+='   <td colspan="2">';
  contentOfPopup+='    <button id="insererTag"             class="butMenuHaut butEnabled butpopUp bckJaune">'+trad['insérer']+'&nbsp;</button>';
  contentOfPopup+='    <button id="annulerTag"             class="butMenuHaut butEnabled butpopUp bckRouge">'+trad['annuler']+'&nbsp;</button>';
  contentOfPopup+='   </td>';
  contentOfPopup+='  </tr>';
  contentOfPopup+=' </tbody>';
  contentOfPopup+='</table>';
  contentOfPopup+='</div>';
  contentOfPopup+='<div id="comandTree1">';
  contentOfPopup+=' <button id="reconstruireSvgEtFermer"  class="butMenuHaut butEnabled">'+trad['reconstruire_le_svg_et_fermer']+'</button>';
  contentOfPopup+=' <button id="updateTree1" data-idArbre="" class="butMenuHaut butEnabled" style="display:none;">'+trad['enregistrer_la_modification']+'</button>';
  contentOfPopup+=' <button id="annulerTree1" data-idArbre="" class="butMenuHaut butEnabled" style="display:none;">'+trad['annuler']+'&nbsp;</button>';
  contentOfPopup+='</div>';

  popupValue.innerHTML=contentOfPopup;
  
  dogid('reconstruireSvgEtFermer').addEventListener('click',closePopup,'button');
  dogid('ajouterGroupe').addEventListener('click',ajouterGroupe,'button');
  dogid('ajouterDef').addEventListener('click',ajouterDef,'button');
  dogid('ajouterRadialGradient').addEventListener('click',ajouterRadialGradient,'button');
  dogid('ajouterLinearGradient').addEventListener('click',ajouterLinearGradient,'button');
  dogid('ajouterStop').addEventListener('click',ajouterStop,'button');
  dogid('ajouterFilter').addEventListener('click',ajouterFilter,'button');
  dogid('ajouterFeGaussianBlur').addEventListener('click',ajouterFeGaussianBlur,'button');
  dogid('ajouterImage').addEventListener('click',ajouterImage,'button');
  dogid('ajouterTitle').addEventListener('click',ajouterTitle,'button');
  dogid('ajouterUse').addEventListener('click',ajouterUse,'button');
  dogid('ajouterTag').addEventListener('click',ajouterTag,'button');
  dogid('insererTag').addEventListener('click',insererTag,'button');
  dogid('ajouterSymbol').addEventListener('click',ajouterSymbol,'button');
  dogid('ajouterPattern').addEventListener('click',ajouterPattern,'button');  
  dogid('annulerTag').addEventListener('click',annulerTag,'button');
  dogid('rechercherDansArbre').addEventListener('click',rechercherDansArbre,'button');
  
  
  
  
  
  
  dogid('updateTree1').addEventListener('click',updatetree1,'button');
  dogid('annulerTree1').addEventListener('click',annulerTree1,'button');
  

  // these are the parameters you can tweek. add some if you wish ...
  var param1={
   sortOnly            : false                       , // here it is a tree, if it was a list, it would be true
   deleteFunctionName  : String(global_variable_name+'.deleteFunction1')   , // delete function name , see under , '' if no delete
   editFunctionName    : String(global_variable_name+'.editFunction1')     , // edit function name , see under , '' if no edit
   foldFunctionName    : String(global_variable_name+'.foldFunction1')     , // edit function name , see under , '' if no edit
   editButton          : true                        , // edit button ? true / false
   hideIdAfterLabel    : false                       , // true = one can't see the (id) of each element
   design              : {
   
    buttonsBorderWidthInPx      : parseInt('1px',10),   // default : 1px
    elementHeightInPx           : parseInt('35px',10),  // default and minimum advise : 35px
    elementBorderHeightInPx     : parseInt('1px',10),   // default : 1px
   
    branchesLeftOffsetInPixels  : parseInt('12px',10),  // default : 12px
    
    voidHeightInPixels          : parseInt('20px',10),  // default : 15px
    intervalHeightInPixels      : parseInt('1px',10),  // default : 15px
    intervalBorderNameStyle     : String('solid'),      // default : solid
    intervalBorderHeight        : parseInt('1px',10),   // default : 1px // should be 0 or 1 px but you can put nnnpx if you want !
    intervalBorderColor         : String('#eee'),       // default : #eee
    thinBorderColor             : String('blue'),       // default : blue   or  globalCssSettings1.main.thinBorderColor.hexValue            if it exists
    editBackground              : String('red'),        // default : red    or  globalCssSettings1.backgrounds.editBackground.hexValue      if it exists
    successBackgroundColor      : String('green'),      // default : green  or  globalCssSettings1.backgrounds.successBackground.hexValue   if it exists
    headerBackgroundColor       : String('yellow'),     // default : yellow or  globalCssSettings1.table.headerBackgroundColor.hexValue     if it exists
    
   }
  }
  if(_dssvg.arbre0.length==0){
   _dssvg.arbre0[0]={id:0,parentId:-1,isOpen:1,data:{label:'svg',level:-1,type:'root',nodeName:'@root',text:'',attributes:{},sizes:{minx:null,miny:null,maxx:null,maxy:null}}}
  }
  // then call the building of the tree with 
  oMyTree1=new cMyTree1(
   'oMyTree1',  // this self object name
   'myTreeId1', // the id of the html < div > you want to fill
   _dssvg.arbre0,   // the data
   param1,      // the parameters
   myCallBackAction1 // ==== MUST ==== exist callback function name
  );
  showPopUp('popupArbo1');
 }
 //========================================================================================================
 function zoomWheelSvg(e){
//  console.log('e=',e);
  if(e.deltaY<0){
  zoomPlusMoins(2);
  }else{
   zoomPlusMoins(0.5);
  }
 }
 //========================================================================================================
 function menuTopWheel(e){
  if(e.deltaY<0){
   divtpe.scrollTo(divtpe.scrollLeft+30,0);
  }else{
   divtpe.scrollTo(divtpe.scrollLeft-30,0);
  }
 }

 // ===========
 // colorPicker
 // ===========


 //========================================================================================================
 var timerLongClick=null;
 var tempsSuperieurA300=false;
 var movingButton={initX:0,initY:0,isMoving:false};
 var ecranCouleursAffiche=false;
 //========================================================================================================
 
 //========================================================================================================
 function startStrokeStyleColor(e){
  e.stopPropagation();
  movingButton.isMoving=false;
  if(e.touches){
   e=e.touches[0];
  }
  movingButton.initX=e.clientX;
  movingButton.initY=e.clientY;
  tempsSuperieurA300=false;
  timerLongClick=setTimeout( function(){
   tempsSuperieurA300=true;
   if(movingButton.isMoving===false){
    e.target.style.borderColor='red';
   }
  } , 300);
  console.log('ici');
 }
 
 //========================================================================================================
 function _callBackColorPicker(e){
  
  var absColor=dogid('colorInput').value;
  if(absColor==='transp' || absColor=='rgba(0, 0, 0, 0.00)'){
   colorPickerData.value='transparent';
  }else{
   if(absColor.toLowerCase().substr(0,5)=='rgba('){
    colorPickerData.value=absColor.toLowerCase();
   }else{
    var thecolor=dogid('colorValueChosen').value;
    var shortColor=thecolor.substr(0,1)=='#'?thecolor.substr(1):thecolor;
    for(var numColWeb=0;numColWeb<tabWebCol0.length ;numColWeb++){
     if(tabWebCol0[numColWeb][0].length>6){
      if(tabWebCol0[numColWeb][0].substr(0,6).toLowerCase()==shortColor.toLowerCase()){
       thecolor=tabWebCol0[numColWeb][0].substr(6).toLowerCase();
       break;
      }
     }
    }
    colorPickerData.value=thecolor;
   }
  }
  
  
  
  if(colorPickerData.context=='strokeElement'){
   majPropArbre(colorPickerData.numArbre , 'stroke' , colorPickerData.value , true );
  }
  if(colorPickerData.context=='fillElement'){
   majPropArbre(colorPickerData.numArbre , 'fill' , colorPickerData.value , true );
  }
  

  if(colorPickerData.context=='setStrokeStylColor'){
   dogid(colorPickerData.id).style.color=colorPickerData.value;
   document.getElementById(colorPickerData.id+'_svg').setAttribute('fill',colorPickerData.value);
   _dssvg.strokeColor1=colorPickerData.value;
   
   // mettre à jour _dssvg.strokCols
   var indiceTab=parseInt(colorPickerData.id.replace('setStrokeStylColor1_',''),10);
   _dssvg.strokCols[indiceTab]=colorPickerData.value;
   saveStte();
   highliteStrokeStyle();
  }
  if(colorPickerData.context=='setFillStylColor'){
   dogid(colorPickerData.id).style.color=colorPickerData.value;
   draw_state.fillStyle1=colorPickerData.value;
   saveStte();
  }
  
  closePopup();
 }
 
 
 //========================================================================================================
 function touchMoveButton(e){
  if(Math.abs(e.touches[0].clientX-movingButton.initX)>=2 || Math.abs(e.touches[0].clientY-movingButton.initY)>=2){

   movingButton.isMoving=true;
  }
 }
 
 //========================================================================================================
 function rgb2hex(rgb){
  var ret=rgb;
  if (/^#[0-9A-F]{6}$/i.test(rgb)){
   return rgb;
  }
  try{
   rgb=rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
   ret="#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }catch(e){}
  return ret;
 } 
 //========================================================================================================
 function RGBAToHexA(rgba) {
  let sep = rgba.indexOf(",") > -1 ? "," : " "; 
  rgba = rgba.substr(5).split(")")[0].split(sep);
                
  // Strip the slash if using space-separated syntax
  if (rgba.indexOf("/") > -1)
    rgba.splice(3,1);

  for (let R in rgba) {
    let r = rgba[R];
    if (r.indexOf("%") > -1) {
      let p = r.substr(0,r.length - 1) / 100;

      if (R < 3) {
        rgba[R] = Math.round(p * 255);
      } else {
        rgba[R] = p;
      }
    }
  }
  let r = (+rgba[0]).toString(16),
      g = (+rgba[1]).toString(16),
      b = (+rgba[2]).toString(16),
      a = Math.round(+rgba[3] * 255).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;
  if (a.length == 1)
    a = "0" + a;
  var ret='#' + r + g + b + a;
  return ret;
   
 }
 
 //========================================================================================================
 function _selColor1(c){

  dogid('colorInput').value=c.substr(0,6);
  if(c==='transparent'){
   kellyColor1.setColor('rgba(0,0,0,0)');
  }else{
   kellyColor1.setColor(dogid('colorInput').value);
  }

  if(c.length>6){
   if(c==='transparent'){
    dogid('colorName').innerHTML=c;
   }else{
    dogid('colorName').innerHTML=c.substr(6);
   }
  }else{
   dogid('colorName').innerHTML='';
  }
 }
 
 
 //========================================================================================================
 function popupCouleurs(){ // e){
  var t='';
  
  var bodySize=body.getBoundingClientRect();
  var w1=(bodySize.width-2*marginPopup)+'px'; 
  var h1=(yscreen-2*marginPopup)+'px'; 

  
  var largeurCanvas=parseInt(w1,10)-20;
  if(largeurCanvas>360){
   largeurCanvas=360;
  }
  var largeur=parseInt(w1,10)-20;
  if(largeur>600){
   largeur=600;
  }
  var hauteurCanvas=largeurCanvas-24;
  
  
  
  
  
  t+='<div id="zoneInput" style="height:38px;border:1px red solid;margin:0 auto;position:fixed;top:'+(marginPopup+2)+';left:'+(marginPopup+2)+'px;width:'+(parseInt(w1,10)-2)+'px;background:#e8eef2;z-index:102;">';
  t+= '<input type="text" size="7" id="colorInput" style="height:36px;max-width:73px;font-family:monospace;" value=""/>';
  t+= '<button id="copyColor" class="cmdbtn" style="lin-width:18px;min-height:24px;">⇦</button>';
  t+= '<input type="text" size="7" maxlength="7" id="colorValueChosen" disabled style="max-width:80px;font-size:0.8em;max-width:61px;font-family:monospace;" />';
  t+= '<button class="cmdbtn cmdbtnup" id="chooseColor" style="height:34px;font-size: 1em;background:yellow;margin-left:0;width:2.6em;border:2px outset white;" >✅</button>'; // LightGoldenRodYellow
  t+= '<span id="colorName" style="font-size:0.8em;" ></span>'; // LightGoldenRodYellow
  t+='</div>';
  t+='<div style="border:1px red solid;width:'+(largeurCanvas+2)+'px;height:'+(hauteurCanvas+2)+'px;margin:40px auto 0 auto;">';
  t+=' <canvas id="colPick1" width="'+largeurCanvas+'" height="'+hauteurCanvas+'" style="width:'+largeurCanvas+'px;height:'+hauteurCanvas+'px;"></canvas>';
  t+='</div>';


  var countCouleursUtilisees=0;
  var largeurBtns=wi_of_the_menulft-2*wi_of_the_brds1-globalScrollWidth1;
  var nbCoulParLigne=Math.round((largeur-2)/(largeurBtns));
  var count1=0;
  var breakDone=false;
  var border1='border:1px white outset;padding:0;height:'+(largeurBtns)+'px;width:'+(largeurBtns)+'px;';
  
  
  
  t+='<table cellpadding="0" cellspacing="0" summary="" style=" border:1px blue solid;margin:0 auto;">';
  t+='<tr><td colspan="'+nbCoulParLigne+'"><span>WEB named</span><button class="butEnabled butMenuHaut" style="margin-left: 10px;" onclick="'+global_variable_name+'.selColor1(\'transparent\')">transparent</button></td></tr>';
  for(var j=0;j<tabWebCol0.length;j++){
   if((count1%nbCoulParLigne)==0){
    t+='<tr>';
   }
   t+='<td id="tab_'+tabWebCol0[j][0]+'"';
   t+=' style="color:'+tabWebCol0[j][1][2]+';background-color:#'+tabWebCol0[j][0].substr(0,6)+';'+border1+'"';
   t+=' onclick="'+global_variable_name+'.selColor1(\''+tabWebCol0[j][0]+'\')" ></td>'; //  //   onmouseout="show(\''.$k1.'\')"
   count1++;
   if(count1==140 && breakDone===false){
    breakDone=true;
    t+='</tr><tr><td colspan="'+nbCoulParLigne+'"><span>WEB not named</span></td></tr>';
//    nbCoulParLigne=6;
    count1=0;
   }else{
    if(((count1)%nbCoulParLigne)==0){
     t+='</tr>';
    }
   }
  } 
  t+='</table>';
  
  count1=0;
  t+='<table cellpadding="0" cellspacing="0" summary="" style=" border:1px blue solid;margin:0 auto;">';
  var famillePrec='';
  var famille='';
  for(j=0;j<tabMaterial.length;j++){
   famille=tabMaterial[j][0];
   if(famille!=famillePrec){
    if(j>0){ 
     t+='</tr>';
    }
    t+='<tr>';
    t+='<td style="font-size:0.8em;width:90px;">';
    t+=famille;
    t+='</td>';
    famillePrec=famille;
   }
   border1='border:1px white outset;padding:0;height:18px;width:18px;';
   t+='<td style="background-color:'+tabMaterial[j][2]+';'+border1+'"';
   t+=' onclick="'+global_variable_name+'.selColor1(\''+tabMaterial[j][2].substr(1)+'\')" ';
   t+=' title="'+tabMaterial[j][0]+' '+tabMaterial[j][1]+'" ';
   t+=' ></td>'; //  // onmouseout="show(\''.$k1.'\')"
   count1++;
  } 
  t+='</tr>';
  t+='</table>';
  
  popupValue.innerHTML=t;

  showPopUp('popupCouleurs')  ;;

  var initColor=colorPickerData.value;

  if(initColor.substr(0,1) == '#' && initColor.substr(1).toUpperCase()>='000000'&&initColor.substr(1).toUpperCase()<='FFFFFF'){
   initColor=initColor.substr(1);
   dogid('chooseColor').style.background=initColor;
   dogid('colorValueChosen').value      =initColor;
   dogid('colorInput').value            =initColor;
  }else{
   var trouve=false;
   for(var numColWeb=0;numColWeb<tabWebCol0.length && trouve==false ;numColWeb++){
    if(tabWebCol0[numColWeb][0].length>6){
     if(tabWebCol0[numColWeb][0].substr(6).toLowerCase()==initColor.toLowerCase()){
      initColor=tabWebCol0[numColWeb][0].substr(0,6);
      dogid('colorName').innerHTML=tabWebCol0[numColWeb][0].substr(6);
      dogid('chooseColor').style.background=tabWebCol0[numColWeb][0].substr(6);
      dogid('colorValueChosen').value='#'+initColor;
      dogid('colorInput').value='#'+initColor;
      trouve=true;
     }
    }
   }
   if(trouve==false){ 
    initColor=colorPickerData.value;
    dogid('chooseColor').style.background=colorPickerData.value;
    dogid('colorInput').value=initColor;
    dogid('colorValueChosen').value=initColor;
   }
  }
  kellyColor1=new KellyColorPicker({
   place       : 'colPick1', 
   size        : hauteurCanvas, 
   input       : 'colorInput',  
   inputColor  : false,
   alphaSlider : true,
   userEvents : { 
    change : function(handler) {
     var c=handler.getCurColorHex().substr(1).toUpperCase();
     if(c>='000000' && c <= 'FFFFFF'){
      dogid('colorName').innerHTML='';
      dogid('chooseColor').style.background='#'+c;
      dogid('colorValueChosen').value='#'+c.toUpperCase();
     }
     
    },
   }   
  });


  dogid('chooseColor').addEventListener('click',_callBackColorPicker , 'button');
  dogid('copyColor').addEventListener('click',copyColor , 'button');
  
  for(var i=0;i<countCouleursUtilisees;i++){
   dogid('countObj_'+i).addEventListener('click',selectObjFromColor , 'button');
  }
  setTimeout(  
   function(){
    if(colorPickerData.value.indexOf('rgb')<0){
     dogid('colorName').innerHTML=colorPickerData.value;
    }
   },500
  );
   
  
  

 }

 //========================================================================================================
 function setPickerForColor(cont,target){// e
  
  colorPickerData.context=cont;
  colorPickerData.id=target.id; //e.target.id;
  var colorButton=dogid(target.id).style.color;//dogid(e.target.id).style.color;
  if(colorButton.substr(0,4)=='rgb('){
   var cols=colorButton.substr(4).replace(/\)/,'').split(',');
   var txt='rgba('+cols[0]+','+cols[1]+','+cols[2]+',1)';
   var val=RGBAToHexA(txt);
   colorPickerData.value=colorButton; //val.substr(0,7);
   colorPickerData.opac=1;
  }else if(colorButton.substr(0,5)=='rgba('){
   var cols=colorButton.substr(4).replace(/\)/,'').split(',');
   var txt='rgba('+cols[0]+','+cols[1]+','+cols[2]+','+cols[3]+')';
   var val=RGBAToHexA(txt);
   colorPickerData.value=colorButton; //val.substr(0,7);
  }else{
   colorPickerData.opac=1;
   var value = rgb2hex(dogid(target.id).style.color);// rgb2hex(dogid(e.target.id).style.color);
   if(value===null){
    colorPickerData.value='#ff00ff';
   }else{
    colorPickerData.value=value;
   }
  }
  popupCouleurs(); // e);
 }
 
 //========================================================================================================
 function highliteStrokeStyle(e){
  var elt=null;
  for(var i=0;i<_dssvg.strokCols.length;i++){
   elt=dogid('setStrokeStylColor1_'+i);
   elt.style.borderColor='';
   if(_dssvg.strokeColor1==elt.style.color){
    elt.style.background=bckVert1;
    elt.style.borderStyle='inset';
   }else{
    elt.style.background='';
    elt.style.borderStyle='';
   }
  }
 }
 //========================================================================================================
 function setStrokeStyle(e){
  if(e!==null){
   if(e.target.id=='strostyl_transp' || e.target.parentElement.id=='strostyl_transp'){
    _dssvg.strokeColor1='transparent';
   }else{
    _dssvg.strokeColor1='black';
    for(var i=0;i<_dssvg.strokCols.length;i++){
     if(buttons[i].id==e.target.id){
      _dssvg.strokeColor1=dogid(e.target.id).style.color;
      break;
     }
    }
   }
  }
  highliteStrokeStyle();
  saveStte();
 } 
 //========================================================================================================
 function useColor(target){ // e){
  if(target.id.indexOf('setStrokeStylColor')>=0){
   _dssvg.strokeColor1=dogid(target.id).style.color;
   highliteStrokeStyle();
  }else if(target.id.indexOf('setFillStylColor2')>=0){
   draw_state.fillStyle1=dogid(target.id).style.color;
   highliteFillStyle();
  }
  saveStte();
 }

 //========================================================================================================
 function setStrokeStylColor(e){
  if(e.cancelable){e.preventDefault();}
  e.stopPropagation();
  var target=e.target;
  while(target.nodeName.toLowerCase()!=='button'){
   target=target.parentNode;
  }
  
  
  
  if(movingButton.isMoving===false){
   if(e.button==2){ // rightClick
    setPickerForColor('setStrokeStylColor',target);
   }else{
    if(tempsSuperieurA300===true){
     setPickerForColor('setStrokeStylColor',target);
    }else{
     useColor(target);
    }
   }
  }
  tempsSuperieurA300=false;
 }
 
 //========================================================================================================
 function clickDownDivLag2(e){
  e.stopPropagation();
//  console.log('e.target.nodeName=',e.target.nodeName);
  if(e.target.nodeName.toLowerCase()==='button'){
   var action=e.target.getAttribute('data-action');
   if(action){
    traiterAction(action);
   }
  }else{
   var p=e.target.parentNode;
   while(p.nodeName.toLowerCase()!=='button'){
    p=p.parentNode;
   }
   if(p.nodeName.toLowerCase()==='button'){
    var action=p.getAttribute('data-action');
    if(action){
     traiterAction(action);
    }
   }
  }
  return;
 }
 //========================================================================================================
 function init(version){
  var scr=document.createElement('script');
  scr.type='text/javascript';
  scr.onload=function(){
   
   if(navigator.language.toLowerCase().indexOf('fr')>=0){
    lang='fr';
    setTrad_fr();
    document.querySelector('meta[name="description"]').setAttribute("content", 'éditeur svg anonyme et gratuit, fonctionne sur mobile, tablette et PC, pwa fonctionne hors connexion');
   }else{
    lang='en';
    setTrad_en();
    document.querySelector('meta[name="description"]').setAttribute("content", 'anonymous and free svg editor, works on mobile, tablet and PC, pwa works offline');
    var t='';
    t+='<h1>koolsol svg editor</h1>';
    t+='<p>This editor allows you to create, import and export drawings in svg format.</p>';
    t+='<p>Elements ( path , rect, circle, g, ...) as well as definitions ( pattern , filter, symbol, ...) can be edited point by point, including when they have transformations ( scale, rotate , .. . ).</p>';
    t+='<p>You can work offline because it is a pwa (progressive web app)</p>';
    t+='<p>You must enable javascript to use this tool.</p>';
    document.getElementById('description').innerHTML=t;
    
   }
   document.getElementById('description').style.display='none';;
   init0(lang);
   
  }
  scr.src='trad.js?v='+version;
  body.appendChild(scr);
 }
 //========================================================================================================
 function init0(lang){
  
  var draw_stateTxt=localStorage.getItem('_dssvg');
  if(draw_stateTxt!==null){
   try{
    var jsonDs=JSON.parse(draw_stateTxt);
    if(jsonDs.hasOwnProperty('parametres')){
     for(var n in _dssvg.parametres){
      if(jsonDs.parametres.hasOwnProperty(n)){
       _dssvg.parametres[n]=jsonDs.parametres[n];
       if('lang'===n){
        if(lang!==jsonDs.parametres.lang){
         if(jsonDs.parametres.lang==='fr'){
          setTrad_fr();
          document.querySelector('meta[name="description"]').setAttribute("content", 'éditeur svg anonyme et gratuit, fonctionne sur mobile, tablette et PC, pwa fonctionne hors connexion');
         }else{
          setTrad_en();
          document.querySelector('meta[name="description"]').setAttribute("content", 'anonymous and free svg editor, works on mobile, tablet and PC, pwa works offline');
         }
        }
       }
      }
     }
    }
   }catch(e1){
   }
  }
  getScrollWidth();
  redrawCss();
  _dssvg.parametres.scroll_size=parseInt(globalScrollWidth1,10);
  he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
  wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
  
  
  
  
  divc1=document.createElement('div');
  divc1.id='divc1';
  divc1.style.position='absolute';
  divc1.style.touchAction='none';
  body.appendChild(divc1);
  
  
  refZnDessin=document.createElementNS(xmlns,'svg');
  refZnDessin.setAttribute('id','refZnDessin');
  refZnDessin.setAttribute('transform','rotate(0 0 0)'); // rotate(3
  refZnDessin.style.border='0px blue solid';
  refZnDessin.style.position='relative';
  refZnDessin.style.background='transparent'; //'#def2ff';
  
  divc1.appendChild(refZnDessin);
  refZnDessin.addEventListenerBase('wheel', zoomWheelSvg ,{capture:false,passive:true} );  

  refZnDessin.addEventListenerBase( 'mousedown', mouseDownZoneDessin , {capture:false,passive:true} );
  refZnDessin.addEventListenerBase('mousemove', mouseMoveZoneDessin , {capture:false,passive:true} );
  window.addEventListenerBase('mouseup'  , mouseUpFenetre   , {capture:false,passive:true} );
  
  
  refZnDessin.addEventListenerBase( 'touchstart', touchDownZoneDessin , {capture:false,passive:true} );
  refZnDessin.addEventListenerBase('touchmove', touchMoveZoneDessin , {capture:false,passive:true} );
  window.addEventListenerBase('touchend'  , touchUpFenetre   , {capture:false,passive:true} );
  groupeActif.refGroupe=refZnDessin;
  
  divtpe=document.createElement('div');
  divtpe.id='divtpe';
  body.appendChild(divtpe);
  divtpe.addEventListenerBase('wheel', menuTopWheel ,{capture:false,passive:true} );  
  
  divlft=document.createElement('div');
  divlft.id='divlft';
  body.appendChild(divlft);  
  
  
  divlag1=document.createElement('div');
  divlag1.id='divlag1';
  divlag1.style.position='absolute';
  body.appendChild(divlag1);  

  divlag2=document.createElement('div');
  divlag2.id='divlag2';
  divlag2.style.position='absolute';
  body.appendChild(divlag2);  
  divlag2.addEventListenerBase( 'click' , clickDownDivLag2 , {capture:false,passive:true} );



  
  var boutons=[
   // =================== MENU GAUCHE =====================  
  {id:'popupArbo1'                , position:'menuGauche' , libelle:trad['arbre']                               , action:popupArbo1                  , svg:'<svg class="svgBoutonGauche1" viewBox="-1.2601 -1  50.5203 67"><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" fill-rule="nonzero" d=" M 24 0 C 21 0 13 13 11 16 C 9 19 12 20 12 20 l 9 -6 C 9 22 8 25 6 28 C 5 30 7 32 9 31 l 11 -7  C 6 34 5 36 3 39 C 0 43 3 45 6 43 C 3 47 2 49 0 52 C -1 54 1 56 4 54 C 8 51 11 48 12 47 C 12 51 12 55 15 55 C 17 55 19 52 24 46 M 24 0 C 27 0 35 13 37 16 C 39 19 36 20 36 20 l -9 -6 C 39 22 40 25 42 28 C 43 30 41 32 39 31 l -11 -7 C 43 34 43 36 45 39 C 48 43 45 45 42 43 C 45 47 46 49 48 52 C 49 54 47 56 44 54 C 40 51 37 48 36 47 C 36 51 36 55 33 55 C 31 55 29 52 24 46" style="stroke:black;fill:forestgreen;stroke-width:1;"></path><path d=" M 19 52 C 19 52 19 65 19 65 C 19 65 29 65 29 65 C 29 65 29 52 29 52  l -5 -6 l -5 6" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:saddlebrown;stroke-width:1;"></path><path stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" d=" M 24 43 C 21 43 20 39 18 34  L 6 43 C 3 47 2 49 0 52 C -1 54 1 56 4 54 C 8 51 11 48 12 47 L 16 43 L 12 47 C 12 51 12 55 15 55 C 17 55 19 52 24 46 M 24 43 C 27 43 28 39 30 34 L 42 43 C 45 47 46 49 48 52 C 49 54 47 56 44 54 C 40 51 37 48 36 47 L 32 43 L 36 47 C 36 51 36 55 33 55 C 31 55 29 52 24 46" style="stroke:black;fill:darkgreen;stroke-width:1;"></path></svg>'},
  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;'},
  {id:'popupForme1'               , position:'menuGauche' , libelle:trad['selection']                           , action:popupForme1                 , svg:svgEtoile},
  {id:'setModeSaisieChemin1'      , position:'menuGauche' , libelle:trad['chemin']                              , action:setModeSaisieChemin1        , svg:'<svg class="svgBoutonGauche1" viewBox="-27 -18  52 41"><path stroke="rgb(0, 0, 255)" stroke-width="5" fill="transparent" d=" M -26 -17 C -18 -14 -11 -5 -15 2 C -20 13 -7 17 -1 17  C 5 17 10 15 13 10 C 15 5 16 2 12 -4 C 5 -13 19 -13 19 -13"></path></svg>'},
  
  {id:'setModeSaisieDeplace1'     , position:'menuGauche' , libelle:trad['deplacer']                            , action:setModeSaisieDeplace1       , svg:'<svg class="svgBoutonGauche1" viewBox="-1 -1  34 34"><polyline points=" 1 1  32 1 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><polyline points=" 1 1  1 32 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><circle cx="16" cy="16" r="5" fill="transparent" style="stroke:blue;fill:transparent;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></circle><path d=" M 11 5  L 5 5 H 5 L 5 11 L 5 5 L 27 27 L 27 20 L 27 27 L 20 27" stroke="rgb(0, 0, 0)" stroke-width="2" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform=""></path></svg>'},
//  {id:'setModeSaisieDeplace1'     , position:'menuGauche' , libelle:trad['deplacer']                            , action:setModeSaisieDeplace1       , svg:'<svg class="svgBoutonGauche1" viewBox="-2 -1.25  54.80 38.75"><text x="19" y="31" font-family="Verdana" style="font-size:36px;stroke:red;fill:yellow;stroke-width:1;stroke-opacity:1;fill-opacity:1;">⇲</text><text x="-2" y="25" stroke="red" font-family="Verdana" style="font-size:36px;stroke-width:1;stroke:red;fill:yellow;stroke-opacity:1;fill-opacity:1;">⇱</text></svg>'},
//<svg xmlns="http://www.w3.org/2000/svg" 
  {id:'setModeSaisieSelElt1'      , position:'menuGauche' , libelle:trad['selelts']                             , action:setModeSaisieSelElt1        , svg:'<svg class="svgBoutonGauche1" viewBox="-5.5 -5.5  25 26"><rect x="0" y="0" width="13" height="14" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="0" cy="0" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle><circle cx="13" cy="14" r="3.5" stroke="green" stroke-width="3" fill="transparent"></circle></svg>'},
  {id:'setModeSaisieEditionPoin1' , position:'menuGauche' , libelle:trad['selptselts']                          , action:setModeSaisieEditionPoin1   , svg:'<svg class="svgBoutonGauche1" viewBox="-12 14  33 28"><path stroke="black" stroke-width="3" fill="transparent" d=" M -7 19 C -4 37 11 40 16 23 "></path><circle cx="10" cy="36" r="4" stroke="blue" stroke-width="2" fill="green" style="stroke:blue;fill:green;stroke-width:1;"></circle><circle cx="-7" cy="19" r="4" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:1;"></circle><circle cx="-4" cy="37" r="4" stroke="green" stroke-width="2" fill="blue" style="stroke:green;fill:blue;stroke-width:1;"></circle><circle cx="16" cy="23" r="4" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:1;"></circle><path d=" M -7 19 L -4 37 " stroke="rgb(0, 0, 255)" stroke-width="1" fill="transparent"></path><path d="M 16,23 L 10,36" stroke="rgb(0, 255, 0)" stroke-width="1" fill="transparent"></path></svg>'},
  {id:'setModeSaisieTranE1'       , position:'menuGauche' , libelle:trad['seltranselts']                        , action:setModeSaisieTranE1         , svg:'<svg class="svgBoutonGauche1" viewBox="-9 -9  35 36"><rect x="0" y="0" width="13" height="14" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="0" cy="0" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle><path stroke="green" stroke-width="3" fill="transparent" d=" M 18 0 L 23 -7 L 13 -7 L 18 0 C 18 14 10 19 0 19  L -7 24 L -7 14 L 0 19"></path></svg>'},
  {id:'setModeSaisieGroupe1'      , position:'menuGauche' , libelle:trad['selgrps']                             , action:setModeSaisieGroupe1        , svg:'<svg class="svgBoutonGauche1" viewBox="-18.5 -9.5  46.5 46.5"><rect x="0" y="0" width="13" height="13" stroke="red" stroke-width="3" fill="transparent" transform="rotate(45 0 0 ) "></rect><rect x="7" y="15" width="13" height="14" stroke="red" stroke-width="3" fill="transparent" transform="rotate(0 0 0 ) "></rect><rect x="-13" y="-4" width="36" height="36" stroke="gold" stroke-width="3" fill="transparent"></rect><circle cx="-13" cy="-4" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle></svg>'},

  {id:'setZoomPlus1'              , position:'menuGauche' , libelle:'zoom+'                                     , action:setZoomPlus1                , svg:'<svg class="svgBoutonGauche1" viewBox="6.0529 13.2798  349.0983 344.2846"><title>Loupe plus</title><g transform=""><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" d=" M 210 237 A 125 125 -4 1 1 233 213  L 261 240 C 251 245 242 253 237 265 L 210 237" style="stroke:rgb(0, 0, 0);fill:#5B7FAE;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></path><circle cx="131" cy="139" r="99" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:rgb(0, 0, 0);fill:white;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></circle><path d="  M 277 236   C 295 253 327 284 354 313   C 328 314 315 331 309 355   L 235 281   C 233 256 259 235 277 236 " stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:orange;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></path><path d=" M 354 313 C 356 339 338 363 309 355  c 2 -9 10 -41 45 -42" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:darkgoldenrod;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></path><path d="M 54.4973 120.996 H 114.4973 V 62.996 H 148.4973 V 120.996 H 206.4973 V 154.996 H 148.4973 V 212.996 H 114.4973 V 154.996 H 54.4973 V 120.996 " stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:red;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></path></g></svg>'},
  {id:'setZoomMoins1'             , position:'menuGauche' , libelle:'zoom-'                                     , action:setZoomMoins1               , svg:'<svg class="svgBoutonGauche1" viewBox="6.0529 13.2798  349.0983 344.2846"><title>Loupe plus</title><g transform=""><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" d=" M 210 237 A 125 125 -4 1 1 233 213  L 261 240 C 251 245 242 253 237 265 L 210 237" style="stroke:rgb(0, 0, 0);fill:#5B7FAE;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></path><circle cx="131" cy="139" r="99" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:rgb(0, 0, 0);fill:white;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></circle><path d="  M 277 236   C 295 253 327 284 354 313   C 328 314 315 331 309 355   L 235 281   C 233 256 259 235 277 236 " stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:orange;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></path><path d=" M 354 313 C 356 339 338 363 309 355  c 2 -9 10 -41 45 -42" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:darkgoldenrod;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></path><path d=" M 54.4973 120.996 H 114.4973 V 121 H 148.4973 V 120.996 H 206.4973 V 154.996 H 148.4973 V 155  H 114.4973 V 155 H 54.4973 V 120.996" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:red;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></path></g></svg>'},

  {id:'setModeSaisieDefsElt1'     , position:'menuGauche' , libelle:trad['seleltsdefs']                         , action:setModeSaisieDefsElt1       , svg:'<svg class="svgBoutonGauche1" viewBox="-5.5 -5.5  25 26"><rect x="0" y="0" width="13" height="14" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="0" cy="0" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle><circle cx="13" cy="14" r="3.5" stroke="green" stroke-width="3" fill="transparent"></circle></svg>' },
  {id:'setModeSaisieDefsPtE1'     , position:'menuGauche' , libelle:trad['selptseltsdefs']                      , action:setModeSaisieDefsPtE1       , svg:'<svg class="svgBoutonGauche1" viewBox="-12.5 13.5  34 29"><path stroke="black" stroke-width="3" fill="transparent" d=" M -7 18 C -4 37 11 40 16 22 "></path><circle cx="10" cy="36" r="3.5" stroke="blue" stroke-width="2" fill="green"></circle><circle cx="-7" cy="19" r="3.5" stroke="red" stroke-width="2" fill="pink"></circle><circle cx="-4" cy="37" r="3.5" stroke="green" stroke-width="2" fill="blue"></circle><circle cx="16" cy="23" r="3.5" stroke="red" stroke-width="2" fill="pink"></circle><path d="M -7,19 L -4,36" stroke="rgb(0, 0, 255)" stroke-width="1" fill="transparent"></path><path d="M 16,23 L 10,36" stroke="rgb(0, 255, 0)" stroke-width="1" fill="transparent"></path></svg>'},
  {id:'setModeSaisieDefsTrE1'     , position:'menuGauche' , libelle:trad['seltranseltsdefs']                    , action:setModeSaisieDefsTrE1       , svg:'<svg class="svgBoutonGauche1" viewBox="-9 -9  35 36"><rect x="0" y="0" width="13" height="14" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="0" cy="0" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle><path stroke="green" stroke-width="3" fill="transparent" d=" M 18 0 L 23 -7 L 13 -7 L 18 0 C 18 14 10 19 0 19  L -7 24 L -7 14 L 0 19"></path></svg>' },
  {id:'setModeSaisieDefsGrp1'     , position:'menuGauche' , libelle:trad['selgrpsdefs']                         , action:setModeSaisieDefsGrp1       , svg:'<svg class="svgBoutonGauche1" viewBox="-18.5 -9.5  46.5 46.5"><rect x="0" y="0" width="13" height="13" stroke="blue" stroke-width="3" fill="transparent" transform="rotate(45 0 0 ) "></rect><rect x="7" y="15" width="13" height="14" stroke="blue" stroke-width="3" fill="transparent" transform="rotate(0 0 0 ) "></rect><rect x="-13" y="-4" width="36" height="36" stroke="red" stroke-width="3" fill="transparent"></rect><circle cx="-13" cy="-4" r="3.5" stroke="rgb(0, 0, 255)" stroke-width="3" fill="transparent"></circle></svg>' },
  
//  {id:'strostyl_transp'           , position:'menuGauche' , contenu:'✎Tr'  , libelle:'trait transparent'                          , func : setStrokeStyle             }, //, svg:'svgstroketransparent' ,color:'transparent' , cssText:'color:black;font-size:1em;max-height:23px;min-height:23px;padding-left:4px;' },  
  
  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;'},

  {id:'aimanterPixel1'            , position:'menuGauche' , libelle:trad['aimpix']                              , action:aimanterPixel1              , svg : '<svg class="svgBoutonGauche1" viewBox="-4 -28  58 55"><path d=" M 0 -24 C 8 -24 30 -24 36 -24 C 43 -24 50 -16 50 -7 C 50 -5 50 5 50 7 C 50 13 43 23 36 23 C 24 23 0 23 0 23 C 0 19 0 11 0 8  C 5 8 29 8 32 8 C 37 8 37 -8 32 -8 C 29 -8 8 -8 0 -8 C 0 -12 0 -20 0 -24" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;opacity:1;"></path><rect x="0" y="-23" width="10" height="14" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:white;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></rect><rect x="0" y="9" width="10" height="13" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(0, 0, 0);fill:white;stroke-width:1;stroke-opacity:1;fill-opacity:1;opacity:1;"></rect></svg>' , contenu:'px' },
  {id:'popupParametres1'          , position:'menuGauche' , libelle:trad['gerpar']                              , action:popupParametres1            , svg : '<svg class="svgBoutonGauche1" viewBox="-106.3003 -107.041  213.5988 201.0022"><path d=" M 100 0 C 100 0 79.7763 5.9784 79.7763 5.9784 C 79.7763 5.9784 77.9942 17.8017 77.9942 17.8017 C 77.9942 17.8017 95.5573 29.4755 95.5573 29.4755 C 95.5573 29.4755 90.0969 43.3884 90.0969 43.3884 C 90.0969 43.3884 69.282 40 69.282 40 C 69.282 40 62.5465 49.8792 62.5465 49.8792 C 62.5465 49.8792 73.3052 68.0173 73.3052 68.0173 C 73.3052 68.0173 62.349 78.1831 62.349 78.1831 C 62.349 78.1831 45.0656 66.0991 45.0656 66.0991 C 45.0656 66.0991 34.7107 72.0775 34.7107 72.0775 L 32.8729 50.3378  A 60.1854 60.4115 0 1 0 -25.1945 54.3907 L -23.5792 76.4455 C -26.0652 75.4525 -34.7107 72.0775 -34.7107 72.0775 C -34.7107 72.0775 -50 86.6025 -50 86.6025 C -50 86.6025 -62.349 78.1831 -62.349 78.1831 C -62.349 78.1831 -54.4138 58.6441 -54.4138 58.6441 C -54.4138 58.6441 -62.5465 49.8792 -62.5465 49.8792 C -62.5465 49.8792 -82.6239 56.332 -82.6239 56.332 C -82.6239 56.332 -90.0969 43.3884 -90.0969 43.3884 C -90.0969 43.3884 -74.4699 29.2273 -74.4699 29.2273 C -74.4699 29.2273 -77.9942 17.8017 -77.9942 17.8017 C -77.9942 17.8017 -98.8831 14.9042 -98.8831 14.9042 C -98.8831 14.9042 -100 0 -100 0 C -100 0 -79.7763 -5.9784 -79.7763 -5.9784 C -79.7763 -5.9784 -77.9942 -17.8017 -77.9942 -17.8017 C -77.9942 -17.8017 -95.5573 -29.4755 -95.5573 -29.4755 C -95.5573 -29.4755 -90.0969 -43.3884 -90.0969 -43.3884 C -90.0969 -43.3884 -69.282 -40 -69.282 -40 C -69.282 -40 -62.5465 -49.8792 -62.5465 -49.8792 C -62.5465 -49.8792 -73.3052 -68.0173 -73.3052 -68.0173 C -73.3052 -68.0173 -62.349 -78.1831 -62.349 -78.1831 C -62.349 -78.1831 -45.0656 -66.0991 -45.0656 -66.0991 C -45.0656 -66.0991 -34.7107 -72.0775 -34.7107 -72.0775 C -34.7107 -72.0775 -36.5341 -93.0874 -36.5341 -93.0874 C -36.5341 -93.0874 -22.2521 -97.4928 -22.2521 -97.4928 C -22.2521 -97.4928 -11.9234 -79.1065 -11.9234 -79.1065 C -11.9234 -79.1065 0 -80 0 -80 C 0 -80 7.473 -99.7204 7.473 -99.7204 C 7.473 -99.7204 22.2521 -97.4928 22.2521 -97.4928 C 22.2521 -97.4928 23.5804 -76.4458 23.5804 -76.4458 C 23.5804 -76.4458 34.7107 -72.0775 34.7107 -72.0775 C 34.7107 -72.0775 50 -86.6025 50 -86.6025 C 50 -86.6025 62.349 -78.1831 62.349 -78.1831 C 62.349 -78.1831 54.4138 -58.6441 54.4138 -58.6441 C 54.4138 -58.6441 62.5465 -49.8792 62.5465 -49.8792 C 62.5465 -49.8792 82.6239 -56.332 82.6239 -56.332 C 82.6239 -56.332 90.0969 -43.3884 90.0969 -43.3884 C 90.0969 -43.3884 74.4699 -29.2273 74.4699 -29.2273 C 74.4699 -29.2273 77.9942 -17.8017 77.9942 -17.8017 C 77.9942 -17.8017 98.8831 -14.9042 98.8831 -14.9042 C 98.8831 -14.9042 100 0 100 0 C 100 0 100 0 100 0" style="stroke-width:1;stroke:blue;fill:blue;" transform="rotate(4.3643 0 0 )"></path><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" d=" M -19.9035 0.0665 H -47.5914 C -47.5803 -34.716 -29.2323 -48.6369 0.1918 -48.597 C 36.6062 -48.6442 45.8185 -25.4943 45.5704 -0.0489 C 45.13423 14.3612 35.214 28.2112 19.5487 43.9057 C 10.4376 51.5727 10.8315 58.2471 10.8315 61.997  H -12.0032 C -12.1844 60.6516 -11.786 47.7718 -8.6172 42.8653 C -1.4916 31.7469 17.8786 11.5852 17.915 -0.0303 C 18.6014 -16.3637 12.0753 -24.5501 -0.7396 -23.9992 C -13.9158 -23.9741 -20.6076 -15.9549 -20.0506 -0.1851 M -12.881 74.4678 H 11.4458 L 7.5960 93.5628 H -7.4803 Z" style="stroke:forestgreen;fill:forestgreen;stroke-width:1;"></path></svg>'},

  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;' },

  {id:'suppTout'                  , position:'menuGauche' , libelle:trad['supp_et_recharge']                    , action:suppTout                    , contenu:'×'    , class:'butEnabled butMenuGauche bckRouge' , oldcssText:'background:red;' , svg:'<svg class="svgBoutonGauche1"  viewBox="-3 -3  16 16"><g fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:yellow;fill:transparent;stroke-width:2;"><path d=" M 0 0  L 10 10" /><path d="M 10 0 L 0 10 " /></g></svg>' },
  
  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;'},

  {id:'setStrokeStylColor1'       , position:'menuGauche' , libelle:trad['coultrait']                           , action:setStrokeStylColor          , contenu:'✎'    , contextFunct:startStrokeStyleColor , svg : '<svg class="svgBoutonGauche1" viewBox="-0.2555 0.3622  32.296 31.897"><path fill="#402A32" stroke-width="2" d="M 4.0123 26.7292 C 4.296 26.4252 4.7561 26.4252 5.0398 26.7292 C 5.3235 27.0331 5.3235 27.5259 5.0398 27.8299 L 2.9848 30.0313 C 2.7011 30.3352 2.2411 30.3352 1.9574 30.0313 C 1.6736 29.7273 1.6736 29.2345 1.9574 28.9306 L 4.0123 26.7292 Z " style="fill:black;stroke-width:4;"></path><path id="id_to_replace" fill="color_to_replace" stroke="black" stroke-width="0.1" d="M 27.9001 8.0699 C 28.1994 7.9269 28.48 7.7315 28.7279 7.4835 C 29.8995 6.3119 29.8995 4.4124 28.7279 3.2409 C 27.5563 2.0693 25.6569 2.0693 24.4853 3.2409 C 24.2373 3.4888 24.0418 3.7694 23.8989 4.0687 L 23.7782 3.948 L 13.5691 12.1093 C 13.5691 13.2863 12.5867 14.2301 11.4102 14.1947 L 11.3453 14.2597 C 11.1201 14.4848 10.917 14.7309 10.7387 14.9946 L 3.6256 25.5148 L 4.5701 27.4705 L 6.454 28.3433 L 16.9743 21.2301 C 17.238 21.0517 17.4841 20.8487 17.7092 20.6236 L 17.7785 20.5543 L 17.7879 20.2567 C 17.8223 19.1674 18.7607 18.3283 19.8471 18.4153 L 28.0208 8.1907 L 27.9001 8.0699 Z " style="stroke:black;stroke-width:0.6;"></path><path d="M 29.6923 8.6788 L 23.8072 3.0221 L 22.9664 3.8302 L 28.8515 9.487 L 22.5461 15.5478 C 22.3139 15.7709 22.3139 16.1328 22.5461 16.3558 C 22.7782 16.5791 23.1547 16.5791 23.3868 16.3558 L 29.6923 10.2951 C 30.1566 9.8487 30.1566 9.1251 29.6923 8.6788 Z " fill="#F9C23C" style="fill:black;"></path><path d="M6.45225 28.3762L3.62382 25.5477L3.27027 25.9013C2.48922 26.6823 2.48922 27.9487 3.27027 28.7297C4.05131 29.5108 5.31764 29.5108 6.09869 28.7297L6.45225 28.3762Z" fill="#F9C23C"></path><path d="M 11.3102 14.2636 L 13.1089 12.4649 L 13.4674 12.1783 L 19.7595 18.4704 L 19.4729 18.8289 L 17.6741 20.6277 L 11.3102 14.2636 Z " fill="#F9C23C"></path></svg>'}, // type:'strokCols' , noContextMenu:true   , func, , color:'#FF00FF' , cssText:'font-size:1.3em;max-height:23px;min-height:23px;text-shadow: 1px 1px 3px black;'  },  

  {id:'break0'                    , position:'menuGauche' , cssText:'height:15px;'},

  {id:'recharger'                 , position:'menuGauche' , libelle:trad['recharger_la_page']                   , action:recharger                   , contenu:'Re'  , class:'butEnabled butMenuGauche bckRouge'  , svg : '<svg class="svgBoutonGauche1" viewBox="-1.995 -22  204 224"><path stroke-linejoin="round" stroke-linecap="round" d=" m 100 0   a 100 100 0 1 0 100 99   h -40   A 60 60 0 1 1 100 40  v 20 l 34 -40 l -34 -40 v 20" style="stroke:yellow;fill:transparent;stroke-width:10;"></path></svg>'},
  {id:'integrerModifManuelle1'    , position:'menuGauche' , libelle:trad['integrmodifman']                      , action:integrerModifManuelle1      , contenu:'MM'  , class:'butEnabled butMenuGauche bckRouge'  , svg : '<svg class="svgBoutonGauche1" viewBox="0 0  85 77"><path stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" d="M 83 44   H 70       V 36       C 70 36 70 35 70 35     C 79 34 85 29 85 21     V 19       C 85 17 84 16 82 16     S 79 17 79 19       V 21       C 79 27 76 30 70 31     C 69 26 66 23 61 22     C 60 17 58 13 52 11     C 54 9 56 7 56 4     V 2       C 56 1 54 0 53 0     S 51 1 51 2       V 4       C 51 7 48 9 45 9     H 41       C 37 9 34 7 34 4     V 2       C 34 1 33 0 32 0     S 29 1 29 2       V 4       C 29 7 31 9 33 11     C 28 13 25 17 24 22     C 19 23 17 26 16 31     C 9 30 6 27 6 21     V 19       C 6 17 5 16 3 16     S 0 17 0 19       V 21       C 0 29 6 35 15 35     C 15 35 15 36 15 36     V 44       H 2       C 1 44 0 45 0 46     S 0 49 1 49       H 15       V 52       C 15 54 15 56 16 58     C 6 58 0 63 0 72     V 74       C 0 75 1 76 3 76     S 6 75 6 74       V 72       C 6 65 9 62 17 62     C 22 71 31 77 43 77     C 54 77 65 71 68 62     C 76 62 79 65 79 72     V 74       C 79 75 80 76 82 76     S 85 75 85 74       V 72       C 85 63 79 58 70 58     C 70 56 70 54 70 52     V 49       H 82       C 85 49 85 47 85 46     S 85 44 83 44       Z M 40 72   C 28 71 19 63 19 52     V 36       C 19 32 22 27 24 26     C 26 29 28 31 33 31     H 40       V 72       Z M 33 27   C 31 27 28 25 28 23     C 28 18 34 14 40 14     H 41       H 45       H 45       C 51 14 57 18 57 23     C 57 25 54 27 52 27     H 33       Z M 66 52   C 66 63 57 71 45 72     V 31       H 52       C 57 31 60 29 61 26     C 65 27 66 32 66 36     V 52       Z " style="stroke:yellow;fill:yellow;stroke-width:1;"></path><text x="16" y="59" style="font-size:32;stroke-width:1.22;stroke:navy;fill:navy;font-family:Verdana;stroke-opacity:1;fill-opacity:1;opacity:1;">M</text><text x="42" y="59" style="font-size:32;stroke-width:1.22;stroke:navy;fill:navy;font-family:Verdana;stroke-opacity:1;fill-opacity:1;opacity:1;">M</text></svg>'},

   // =================== MENU HAUT =====================  
  {id:'annuler1'                  , position:'menuHaut'   , libelle:trad['annuler']                             , action:annuler1                    , svg:'<svg class="svgBoutonHaut1" viewBox="0 -20  220 240"><path stroke="blue" stroke-width="5" fill="red" d=" M 100 0 A 100 100 0 1 1 0 100 H 40 A 60 60 1 1 0 100 40 V 60  L 66 20 L 100 -20 Z"></path></svg>'                   }, // ⟳ = bouton fleche arrondie sens horaire
  {id:'pousserVersHaut1'          , position:'menuHaut'   , libelle:trad['pousser_vers_le_haut']                , action:pousserVersHaut1            , svg:'<svg class="svgBoutonHaut1" viewBox="-35 -7  75 102"><polygon points=" 0 -1 -28 33  -10 33   -10 81 10 81 10 33 27 33 27 33" stroke="blue" stroke-width="5" fill="red"></polygon></svg>'          }, // // ⇧ = fleche vers le haut remonter l'element dans la hierarchie
  {id:'pousserVersBas1'           , position:'menuHaut'   , libelle:trad['pousser_vers_le_bas']                 , action:pousserVersBas1             , svg:'<svg class="svgBoutonHaut1" viewBox="-35 -88  73 100"><polygon points=" 0 -1 -28 33  -10 33   -10 81 10 81 10 33 27 33 27 33" stroke="blue" stroke-width="5" fill="red" transform="rotate(-180 0 0 ) "></polygon></svg>' }, // // ⇩ = fleche vers le bas redescendre l'element dans la hierarchie
  {id:'dupliquerElement1'         , position:'menuHaut'   , libelle:trad['dupliquer_element']                   , action:dupliquerElement1           , svg:'<svg class="svgBoutonHaut1" viewBox="-28 -28  77.87628555297852 94"><rect x="-24" y="-25" width="50" height="75" stroke="rgb(0, 0, 255)" stroke-width="5" fill="white"></rect><rect x="-4" y="-12" width="50" height="75" stroke="rgb(0, 0, 255)" stroke-width="5" fill="bisque" stroke-dasharray="10"></rect><polygon points=" -12 2  22 2  22 -10  44 15  22 38  22 27  -12 27 " stroke="rgb(0, 0, 255)" stroke-width="4" fill="yellow" transform="rotate(22 0 0 ) translate(4 1 ) "></polygon></svg>'          }, // // ⎘ = dupliquer
  {id:'dupliquerGroupe1'          , position:'menuHaut'   , libelle:trad['dupliquer_groupe']                    , action:dupliquerGroupe1            , svg:'<svg class="svgBoutonHaut1" viewBox="-28 -28  77.87628555297852 94"><rect x="-24" y="-25" width="50" height="75" stroke="rgb(0, 0, 255)" stroke-width="5" fill="white"></rect><rect x="-4" y="-12" width="50" height="75" stroke="rgb(0, 0, 255)" stroke-width="5" fill="bisque" stroke-dasharray="10"></rect><polygon points=" -12 2  22 2  22 -10  44 15  22 38  22 27  -12 27 " stroke="rgb(0, 0, 255)" stroke-width="4" fill="yellow" transform="rotate(22 0 0 ) translate(4 1 ) "></polygon></svg>'          }, // // ⎘ = dupliquer},
  {id:'poigneesVoisines1'         , position:'menuHaut'   , libelle:trad['afficher_les_poignées_voisines']      , action:poigneesVoisines1           , contenu:trad['afficher_les_poignées_voisines'] },
  
  
  {id:'break0'                    , position:'menuHaut'   , cssText:'width:15px;display: inline-block;'},
  {id:'supprimeElement1'          , position:'menuHaut'   , libelle:trad['supprimer_élément']                   , action:supprimeElement1            , contenu:'&nbsp;&nbsp;&times;&nbsp;&nbsp;'        , class:'butEnabled butMenuHaut bckRouge' , cssText:'width: fit-content;padding: 0px 3px;'},
  {id:'supprimeGroupe1'           , position:'menuHaut'   , libelle:trad['supprimer_groupe']                    , action:supprimeGroupe1             , contenu:'&nbsp;&nbsp;&times;&nbsp;&nbsp;'        , cssText:'background:red;color:yellow;'  },

  {id:'break0'                    , position:'menuHaut'   , cssText:'width:15px;display: inline-block;'},
  {id:'allera000'                 , position:'menuHaut'   , libelle:trad['aller_en_0_0']                        , action:allera000                   , svg:'<svg class="svgBoutonHaut1" viewBox="-2 -2  35 35"><polyline points=" 1 1  32 1 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><polyline points=" 1 1  1 32 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><circle cx="14" cy="14" r="5" fill="transparent" style="stroke:blue;fill:transparent;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></circle></svg>'},
  {id:'allera5050'                , position:'menuHaut'   , libelle:trad['aller_en_50_50']                      , action:allera5050                  , class:'butEnabled butMenuHaut bckJaune' , svg:'<svg class="svgBoutonHaut1" viewBox="-2 -2  35 35"><polyline points=" 1 1  32 1 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><polyline points=" 1 1  1 32 " stroke-dasharray="5" style="fill:transparent;stroke:red;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></polyline><circle cx="14" cy="14" r="5" fill="transparent" style="stroke:blue;fill:transparent;stroke-width:3;stroke-opacity:1;fill-opacity:1;"></circle></svg>'},
  {id:'popGroupeActif1'           , position:'menuHaut'   , libelle:trad['selectionner_le_groupe_en_cours']     , action:popGroupeActif1             , contenu:trad['groupe_courant'] }, //globalGroupeActif  

  {id:'exporterSvg1'              , position:'menuHaut'   , libelle:trad['exporter_le_svg']                     , action:exporterSvg1                , contenu:trad['exporter_le_svg']                        },
  {id:'popupImportSvg1'           , position:'menuHaut'   , libelle:trad['importer_un_svg']                     , action:popupImportSvg1             , contenu:trad['importer_un_svg']                        },
  {id:'popupSpecial1'             , position:'menuHaut'   , libelle:trad['opérations_spéciales']                , action:popupSpecial1               , contenu:trad['opérations_spéciales']                   },
  
  
  ];
  
  for(var i=0;i<boutons.length;i++){ // class
   if(boutons[i].id=='setStrokeStylColor1'){
    
    
      for(var nbElts=0;nbElts<_dssvg.strokCols.length;nbElts++){
       
       var butt=document.createElement('button');
       butt.id=boutons[i].id+'_'+nbElts;
       butt.type='button'
       butt.className='butEnabled butMenuGauche';
//       butt.innerHTML=boutons[i].contenu;
       butt.innerHTML=boutons[i].svg.replace(/id_to_replace/,boutons[i].id+'_'+nbElts+'_svg').replace(/color_to_replace/,_dssvg.strokCols[nbElts]);
       butt.title=boutons[i].libelle;
       butt.style.color=_dssvg.strokCols[nbElts]; // attention un rgba avec opacite = 1 => trasnformé en rgb
       
       butt.addEventListenerBase( 'contextmenu' , function(e){e.preventDefault();e.stopPropagation();return false;} , {capture:false,passive:true} ); 
       butt.addEventListenerBase( 'mouseup'     , boutons[i].action , {capture:false,passive:true} );         
       butt.addEventListenerBase( 'mousedown'   , boutons[i].contextFunct , {capture:false,passive:true} );
       butt.addEventListenerBase( 'touchmove'   , touchMoveButton , {capture:false,passive:true} );
       butt.addEventListenerBase( 'touchend'    , boutons[i].action , {capture:false,passive:true} );
       butt.addEventListenerBase( 'touchstart'  , boutons[i].contextFunct , {capture:false,passive:true} );
       
       
       divlft.appendChild(butt);
       
       
       
      }
    
    
    
   }else if(boutons[i].id==='break0'){
    
    var div=document.createElement('div');
    if(boutons[i].hasOwnProperty('cssText')){
     div.style.cssText=boutons[i].cssText;
    }
    if(boutons[i].position=='menuGauche'){
     divlft.appendChild(div);
    }else if(boutons[i].position=='menuHaut'){
     divtpe.appendChild(div);
    }
   }else{
    var btn=document.createElement('button');
    btn.id=boutons[i].id;
    btn.type='button'
    btn.style.display='';
    if(boutons[i].hasOwnProperty('svg') && boutons[i].svg!==''){
     btn.innerHTML=boutons[i].svg;
    }else{
     btn.innerHTML=boutons[i].contenu;
    }
    btn.title=boutons[i].libelle;
    if(boutons[i].position=='menuGauche'){
     if(boutons[i].hasOwnProperty('class')){
      btn.className=boutons[i].class;
     }else{
      btn.className='butEnabled butMenuGauche';
     }
     
     divlft.appendChild(btn);
    }else if(boutons[i].position=='menuHaut'){
     if(boutons[i].hasOwnProperty('class')){
      btn.className=boutons[i].class;
     }else{
      btn.className='butEnabled butMenuHaut';
     }
     divtpe.appendChild(btn);
    }
    if(boutons[i].hasOwnProperty('cssText')){
     btn.style.cssText=boutons[i].cssText;
    }
    btn.addEventListenerBase('click',boutons[i].action,false);
   }
  }
  
  
  resize1();
  getScrollWidth();
  if(globalScrollWidth1!==_dssvg.parametres.scroll_size){
//   alert(globalScrollWidth1); 8 en dur dans firefox
   _dssvg.parametres.scroll_size=globalScrollWidth1; //parseInt(dogid('parLargeurScrollSize').value,10);
   he_of_the_menutpe=_dssvg.parametres.hauteurMenuHaut+_dssvg.parametres.scroll_size;
   wi_of_the_menulft=_dssvg.parametres.largeurMenuGauche+_dssvg.parametres.scroll_size;
   redrawCss();
   resize1();
  }
  
  
  window.addEventListenerBase('resize', myEffitFn);
  
  if(draw_stateTxt!==null){
   try{
    var jsonDs=JSON.parse(draw_stateTxt);
    
    if(jsonDs.hasOwnProperty('parametres') && jsonDs.parametres.hasOwnProperty('rayonReference')){
     _dssvg.parametres.rayonReference=jsonDs.parametres.rayonReference;
    }
    if(jsonDs.hasOwnProperty('mode_en_cours')){
     _dssvg.mode_en_cours=jsonDs.mode_en_cours;
    }
    if(jsonDs.hasOwnProperty('idArbreCourant')){
     _dssvg.idArbreCourant=jsonDs.idArbreCourant;
    }
    
    if(jsonDs.hasOwnProperty('zoom1')){
     _dssvg.zoom1=jsonDs.zoom1;
    }
    rayonPoint=_dssvg.parametres.rayonReference/_dssvg.zoom1;
    strkWiTexteSousPoignees=rayonPoint/20;
    fontSiTexteSousPoignees=rayonPoint;
    if(jsonDs.hasOwnProperty('aimanterPixel1')){
     _dssvg.aimanterPixel1=jsonDs.aimanterPixel1;
    }
    
    if(jsonDs.hasOwnProperty('historique1')){
     _dssvg.historique1=jsonDs.historique1;
    }
    if(jsonDs.hasOwnProperty('strokeColor1')){
     _dssvg.strokeColor1=jsonDs.strokeColor1;
    }
    if(jsonDs.hasOwnProperty('strokCols')){
     _dssvg.strokCols=jsonDs.strokCols;
     for(var i=0;i<_dssvg.strokCols.length;i++){
      dogid('setStrokeStylColor1_'+i).style.color=_dssvg.strokCols[i];
     }
    }
    
    
    
    
    
    if(jsonDs.hasOwnProperty('viewBoxInit')){
     _dssvg.viewBoxInit=jsonDs.viewBoxInit;
     var width =(xscreen-margns.l-wi_of_the_menulft-decal.l-margns.r-2*wi_of_the_brds2)/_dssvg.zoom1;
     var height=(yscreen-margns.t-he_of_the_menutpe-decal.t-margns.b-2*wi_of_the_brds2)/_dssvg.zoom1;

     if(_dssvg.viewBoxInit[2]>width){
      _dssvg.viewBoxInit[2]=width;
     }
     if(_dssvg.viewBoxInit[3]>height){
      _dssvg.viewBoxInit[3]=height;
     }
     setAttributeViewBox();  
    }
    
    if(jsonDs.hasOwnProperty('arbre0') && jsonDs.arbre0.length>0){
     for(var i=jsonDs.arbre0.length-1;i>0;i--){
      if(jsonDs.arbre0[i].data.attributes.hasOwnProperty('data-type') && jsonDs.arbre0[i].data.attributes['data-type']=='toRemove'){
       jsonDs.arbre0.splice(i,1);
      }
     }
     _dssvg.arbre0=jsonDs.arbre0;
    }
   }catch(e){}
  }
  
  
  var hidden, state, visibilityChange; 
  if (typeof document.hidden !== "undefined") {
   hidden = "hidden";
   visibilityChange = "visibilitychange";
   state = "visibilityState";
  } else if (typeof document.mozHidden !== "undefined") {
   hidden = "mozHidden";
   visibilityChange = "mozvisibilitychange";
   state = "mozVisibilityState";
  } else if (typeof document.msHidden !== "undefined") {
   hidden = "msHidden";
   visibilityChange = "msvisibilitychange";
   state = "msVisibilityState";
  } else if (typeof document.webkitHidden !== "undefined") {
   hidden = "webkitHidden";
   visibilityChange = "webkitvisibilitychange";
   state = "webkitVisibilityState";
  }
  document.addEventListenerBase(visibilityChange, function() {
   
//   if(document[state]=='visible'){
//    console.log('I am visible');
//   }
   
  }, false);
  popupBackground1=document.createElement('div');
  popupBackground1.id='popupBackground1';
  popupBackground1.style.display='none';
  popupBackground1.style.zIndex=100;
  popupBackground1.style.opacity=0.4;
  popupBackground1.style.position='absolute';
  popupBackground1.style.top=0; 
  popupBackground1.style.left=0; 
  popupBackground1.style.background='black'; 
  body.appendChild(popupBackground1);
  
  

  popupContent1=document.createElement('div');
  popupContent1.id='popupContent1';
  popupContent1.style.display='none';
  popupContent1.style.top=0; 
  popupContent1.style.left=0; 
  body.appendChild(popupContent1);
  var t='';
  t+='<button id="BtnclosPop" type="button" class="butEnabled bckRouge" style="position:fixed;color:yellow;width:35px;height:35px;z-index:200;"><svg style="width:20px;" viewBox="-3 -3  16 16"><g fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:yellow;fill:transparent;stroke-width:2;"><path d=" M 0 0  L 10 10" /><path d="M 10 0 L 0 10 " /></g></svg></button>';
  t+='<div style="margin-top:0px;border:1px red solid;padding-bottom:200px;border-radius: 4px;" id="popupValue"></div>';
  popupContent1.innerHTML=t;
  
  
  
  popupBackground1.addEventListenerBase('click', closePopup);
  dogid('BtnclosPop').addEventListenerBase('click', closePopup);
  
  afficheArbre0({init:true});
  
  var tab=['hdtree','html5kellycolorpicker.min','path-simplification03'];
  for(var i=0;i<tab.length;i++){
   var scr=document.createElement('script');
   scr.type='text/javascript';
   scr.src=tab[i]+'.js?v='+global_version_number;
   body.appendChild(scr);
  }
  try{
   if(navigator.language!=='fr'){
    document.documentElement.setAttribute('lang', 'en');
   }
  }catch(e){
  }
  
  setTimeout(apresInit,250);
  
  
  
  if(navigator.onLine&&global_version_number!=='0'){
   if('serviceWorker' in navigator){
    navigator.serviceWorker.register('svg_sw.js.php').then(
     function(reg){}
    ).catch(
     function(error){
      console.warn('error=',error);
     }
    );
   }
   setTimeout(majSw,300);

  }
  
 }
 //========================================================================================================
 function majSw(){
  var url='ver.php';
  var maindenant=new Date();
  url+='?t='+maindenant.getTime();
  
  var r = new XMLHttpRequest();
  r.open("GET",url,true);
  r.timeout=6000;
  r.onreadystatechange = function () {
   if (r.readyState != 4 || r.status != 200) return;
   try{
    var ret=r.responseText;
    if(ret!==global_version_number){
     changementVersion1();
    }
     
   }catch(e){
    console.error(e,r);
    return;
   }
  };
  r.onerror=function(e){
   console.error('e=',e);
   /* whatever(); */    
   return;
  }
  r.ontimeout=function(e){console.error('e=',e); /* whatever(); */    return;}
  r.send();
  
 }
 //========================================================================================================
 function apresInit(){
  if(_dssvg.mode_en_cours=='setModeSaisieSelElt1' ){
   setModeSaisieSelElt1();
  }else if( 'setModeSaisieDefsElt1' == _dssvg.mode_en_cours ){
   affPoi();
  }else if(_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ){
   affPoi();
  }else if(_dssvg.mode_en_cours==='setModeSaisieTranE1'){
   setModeSaisieTranE1();
  }else if(_dssvg.mode_en_cours==='setModeSaisieDefsTrE1'){
   setModeSaisieDefsTrE1();
  }else if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' || 'setModeSaisieDefsGrp1'===_dssvg.mode_en_cours){
   setModeSaisieGroupe1();
  }
  
  majBout();
    
 }
 //========================================================================================================
 function recalculBBoxes(){
  var pt1    = refZnDessin.createSVGPoint();  
  var lst=refZnDessin.querySelectorAll('*');
  for(var i=0;i<lst.length ;i++){
   if(lst[i].getAttribute('data-type') && ( lst[i].getAttribute('data-type')=='systeme' || lst[i].getAttribute('data-type')=='toRemove')){
    continue;
   }
   
   var nn=lst[i].nodeName.toLowerCase();
   if( nn==='stop' || nn=='lineargradient' || nn=='filter' || nn=='fegaussianblur' || nn==='radialgradient'){
    continue;
   }
   
   
   if(lst[i].id && lst[i].id=='refZnDessin'){
    
    continue; // plus tard
    
   }else{
    var idArbre=parseInt(lst[i].getAttribute('data-idarbre1'),10);
    var indiceArbre=recupereIndiceArbre(idArbre);
   }

   try{   
    var matrixRelatifVersAbsolu=refZnDessin.getScreenCTM().inverse().multiply(lst[i].getScreenCTM());
    
    var bounding=lst[i].getBBox(); // matrix
    var minx=999999;
    var miny=999999;   
    var maxx=-999999;
    var maxy=-999999;   
    
    
    var tab=[[bounding.x,bounding.y],[bounding.x+bounding.width,bounding.y],[bounding.x+bounding.width,bounding.y+bounding.height],[bounding.x,bounding.y+bounding.height]];
    for(var j=0;j<tab.length;j++){
     
     pt1.x=tab[j][0];
     pt1.y=tab[j][1];
     pt1=pt1.matrixTransform(matrixRelatifVersAbsolu);
     if(pt1.x<minx){ minx=pt1.x;}
     if(pt1.y<miny){ miny=pt1.y;}
     if(pt1.x>maxx){ maxx=pt1.x;}
     if(pt1.y>maxy){ maxy=pt1.y;}
    }
    var sizes={
     minx:minx,
     maxx:maxx,
     miny:miny,
     maxy:maxy,
    }
    _dssvg.arbre0[indiceArbre].data.sizes=sizes;
   }catch(e){
    if(String(e).indexOf('getScreenCTM is not a function')>=0){
    }else{
     console.warn('lst['+i+'].getScreenCTM() a échoué sur ' , lst[i] , e )
    }
   }
   
  }
  if(_dssvg.arbre0.length>0){
   _dssvg.arbre0[0].data.sizes={minx:null,miny:null,maxx:null,maxy:null};
   for(var i=1,l=_dssvg.arbre0.length;i<l;i++){
    try{
     if(_dssvg.arbre0[0].data.sizes.minx===null || _dssvg.arbre0[i].data.sizes.minx<_dssvg.arbre0[0].data.sizes.minx){
      _dssvg.arbre0[0].data.sizes.minx=_dssvg.arbre0[i].data.sizes.minx;
     }
     if(_dssvg.arbre0[0].data.sizes.miny===null || _dssvg.arbre0[i].data.sizes.miny<_dssvg.arbre0[0].data.sizes.miny){
      _dssvg.arbre0[0].data.sizes.miny=_dssvg.arbre0[i].data.sizes.miny;
     }
     if(_dssvg.arbre0[0].data.sizes.maxx===null || _dssvg.arbre0[i].data.sizes.maxx>_dssvg.arbre0[0].data.sizes.maxx){
      _dssvg.arbre0[0].data.sizes.maxx=_dssvg.arbre0[i].data.sizes.maxx;
     }
     if(_dssvg.arbre0[0].data.sizes.maxy===null || _dssvg.arbre0[i].data.sizes.maxy>_dssvg.arbre0[0].data.sizes.maxy){
      _dssvg.arbre0[0].data.sizes.maxy=_dssvg.arbre0[i].data.sizes.maxy;
     }
    }catch(e){
    }
   }
  }
 }
 //========================================================================================================
 function supptransform1(idArbre,indTransform){
  try{
   var indA=recupereIndiceArbre(idArbre);
   var elem=document.querySelectorAll('[data-idarbre1="'+idArbre+'"]');
   var nomDuTransform='transform';
   
   if(elem.length>1){ // probablement un radialGradient
    if(elem[elem.length-1].nodeName.toLowerCase()==='radialgradient'){
     elem=elem[elem.length-1];
     globalGeneralSvgReferenceElement=elem;
     nomDuTransform='gradientTransform';
     var tr=elem.getAttribute(nomDuTransform)?elem.getAttribute(nomDuTransform):'';
    }else if(elem[elem.length-1].nodeName.toLowerCase()==='lineargradient'){
     elem=elem[elem.length-1];
     globalGeneralSvgReferenceElement=elem;
     nomDuTransform='gradientTransform';
     var tr=elem.getAttribute(nomDuTransform)?elem.getAttribute(nomDuTransform):'';
    }else{
     elem=elem[0];
     var tr=elem.getAttribute(nomDuTransform)?elem.getAttribute(nomDuTransform):'';
     console.warn('%ctodo','background:yellow;color:red;',elem.nodeName.toLowerCase())
    }
   }else{
    elem=elem[0];
    var tr=elem.getAttribute(nomDuTransform)?elem.getAttribute(nomDuTransform):'';
   }
   var objTransform=convertirTransformEnTableau(tr,[]);
   var tt='';
   for(var i=0;i<objTransform.tab.length;i++){
    if(i==indTransform){
    }else{
     tt+=objTransform.tab[i][0]+'(';
     for(var j=0;j<objTransform.tab[i][1].length;j++){
      tt+=objTransform.tab[i][1][j]+' ';
     }
     tt+=') ';
    }
   }
   elem.setAttribute(nomDuTransform,tt);
   _dssvg.arbre0[indA].data.attributes[nomDuTransform]=tt;
   
   return {statut:true,elem:elem};

  }catch(e){
  }
  return {statut:false};
 }
 
 //========================================================================================================
 function recupRelatifVersAbsolu( indPoint , tbOriginal, tbAbsolu , nuArbr ){
  var ttemp=JSON.parse(JSON.stringify(tbOriginal[indPoint]));
  var dx=0;
  var dy=0;
  var xDetermine=false;
  var yDetermine=false;
  for(var j=indPoint-1;j>=0 && !( xDetermine===true && yDetermine===true );j--){
   if(tbAbsolu[j].length>=3){
    if(xDetermine===false){
     xDetermine=true;
     dx=tbAbsolu[j][tbAbsolu[j].length-2];
    }
    if(yDetermine===false){
     yDetermine=true;
     dy=tbAbsolu[j][tbAbsolu[j].length-1];
    }          
   }else if(tbAbsolu[j].length==2){
    if(tbAbsolu[j][0]==='H'){
     if(xDetermine===false){
      xDetermine=true;
      dx=tbAbsolu[j][tbAbsolu[j].length-1];
     }
    }else if(tbAbsolu[j][0]==='V'){
     if(yDetermine===false){
      yDetermine=true;
      dy=tbAbsolu[j][tbAbsolu[j].length-1];
     }
    }
   }
  }
  ttemp[0]=ttemp[0].toLowerCase();
  if(ttemp[0]=='c'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
   ttemp[5]=arrdi10000(ttemp[5]-dx);
   ttemp[6]=arrdi10000(ttemp[6]-dy);
  }else if(ttemp[0]=='s'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
  }else if(ttemp[0]=='l'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='v'){
   ttemp[1]=arrdi10000(ttemp[1]-dy);
  }else if(ttemp[0]=='h'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
  }else if(ttemp[0]=='q'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
   ttemp[3]=arrdi10000(ttemp[3]-dx);
   ttemp[4]=arrdi10000(ttemp[4]-dy);
  }else if(ttemp[0]=='t'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='m'){
   ttemp[1]=arrdi10000(ttemp[1]-dx);
   ttemp[2]=arrdi10000(ttemp[2]-dy);
  }else if(ttemp[0]=='a'){
   ttemp[6]=arrdi10000(ttemp[6]-dx);
   ttemp[7]=arrdi10000(ttemp[7]-dy);
  }else if(ttemp[0]=='z'){
  }else{
   console.warn('%ctraiter ttemp[0]=','color:purple;',ttemp[0])

  }
  var tt=''+ttemp[0]+ ' ';
  for(var i=1;i<ttemp.length;i++){
   tt+=''+arrdi10000(ttemp[i])+'&nbsp;';
  }
  
  var bout='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"pointEnRelatif","numArbre":'+nuArbr+',"indicePoint":'+indPoint+',"nouvPoint":"'+ttemp.join(' ')+'"}')+'">'+tt+'</button>'; // ttemp.join(' ')+
  if(ttemp[0].toLowerCase()=='a'){
   
   var ttori=JSON.parse(JSON.stringify(tbOriginal[indPoint]));
   ttori[4]=ttori[4]==0?1:0;
   bout+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"largeArc","numArbre":'+nuArbr+',"indicePoint":'+indPoint+',"nouvPoint":"'+ttori.join(' ')+'"}')+'">lrgAr '+(ttori[4])+'</button>';
   
   var ttori=JSON.parse(JSON.stringify(tbOriginal[indPoint]));
   ttori[5]=ttori[5]==0?1:0;
   bout+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"sweepFlag","numArbre":'+nuArbr+',"indicePoint":'+indPoint+',"nouvPoint":"'+ttori.join(' ')+'"}')+'">swpF '+(ttori[5])+'</button>';
  }
  
  return {bout:bout, nouvelleDefinition:ttemp.join(' ')};         
 } 
 
 //========================================================================================================
 function recuperePropsCouleurs(numArbre){
  var couleurs={};
  try{
   var ind=recupereIndiceArbre(numArbre);
   var eltd=_dssvg.arbre0[ind].data.attributes;

   // on récupére TOUS LES ATTRIBUTS de la propriété "style"
   var attributStyle=eltd.hasOwnProperty('style')?eltd.style:null;
   if(attributStyle!==null && attributStyle!==''){
    var tab1=attributStyle.split(';');
    for(var i=0;i<tab1.length;i++){
     var prop=tab1[i].split(':');
     if(prop.length===2){
      if(prop[1]!==''){
       couleurs[prop[0].trim()]={valeur:prop[1],definie:true,type:'style'};
      }
     }
    }
   }
   // puis on ajoute ceux du tableau ci dessous , y compris si ils sont définis par des propriétés individuelles
   var tab=[
    ['stroke'         , null , 'black'],
    ['fill'           , null , 'transparent'],
    ['stroke-width'   , null , 1],
    ['stroke-opacity' , null , 1],
    ['fill-opacity'   , null , 1],
    ['font-size'      , null , _dssvg.parametres.taillePolice],
    ['opacity'        , null , 1],
   ];
   for(var i=0;i<tab.length;i++){
    // l'élément a-t-il déjà été défini dans la propriété style
    if(couleurs.hasOwnProperty(tab[i][0])){
     // oui, rien à faire, le style est prioritaire sur la propriété individuelle
    }else{
     tab[i][1]=eltd.hasOwnProperty(tab[i][0])?(eltd[tab[i][0]]!==''?eltd[tab[i][0]]:null):null;
     // l'élément a-t-il une propriété individuelle non vide
     if(tab[i][1]!==null){
      couleurs[tab[i][0]]={valeur:tab[i][1],definie:true,type:'tag'}; // oui, on la renseigne
     }else{
      couleurs[tab[i][0]]={valeur:tab[i][2],definie:false,type:'tag'}; // non, on met la valeur par défaut
     }
    }
    
    
   }
  }catch(e){
  }
  return couleurs;
 }
 //========================================================================================================
 function supprimeAttrib(ind,nom){
  var nouveauAttributs={};
  for(var n in _dssvg.arbre0[ind].data.attributes){
   if(n!==nom){
    nouveauAttributs[n]=_dssvg.arbre0[ind].data.attributes[n];
   }
  }
  _dssvg.arbre0[ind].data.attributes=JSON.parse(JSON.stringify(nouveauAttributs));
 }
 //========================================================================================================
 function majPropArbre(numArbre , type , valeur , affiche ){
  var ind=recupereIndiceArbre(numArbre);
  var eltd=_dssvg.arbre0[ind].data;
  var couleurs=recuperePropsCouleurs(numArbre);
  var nouveaStyle1={};
  for(var n in couleurs){
   if(type==n){
    nouveaStyle1[n]=valeur;
   }else{
    if(couleurs[n].definie===true){
     nouveaStyle1[n]=couleurs[n].valeur
    }
   }
  }
  var nouveaStyle2={};
  for(var n in couleurs){
   if(couleurs[n].definie===true){
    if( eltd.nodeName==='text' || eltd.nodeName==='tspan' ){
     if(n==='font-size' || n==='font-family' || n==='stroke'  || n==='stroke-width' || n==='stroke-opacity' || n==='fill'  || n==='fill-opacity' ){
      nouveaStyle2[n]=nouveaStyle1[n];
     }
    }else if( eltd.nodeName==='image' ){
     if(n==='opacity'){
      nouveaStyle2[n]=nouveaStyle1[n];
     }
    }else{
     if(!( n==='font-size' ) ){
      nouveaStyle2[n]=nouveaStyle1[n];
     }
    }
   }else{
    if(type===n){
     nouveaStyle2[n]=valeur;
    }
   }
  }
  
  var tt='';
  for(var n in nouveaStyle2){
   tt+=''+n+':'+nouveaStyle2[n]+';'
  }
  
  _dssvg.arbre0[ind].data.attributes.style=tt;
  if(affiche){
   afficheArbre0({init:false});
  }
  
 }
 
 //========================================================================================================
 function divLag2Complete(){
  var t='';
  if(globalGeneralSvgReferenceElement){
   var numArbre=globalGeneralSvgReferenceElement.getAttribute('data-idarbre1');
   t+='<div>'+globalGeneralSvgReferenceElement.nodeName+ '('+numArbre+')<span style="font-size:0.6rem;">prec='+_dssvg.idArbrPreceden+'</span></div>';
   
   var extensions=null;
   var extensionsTxt=globalGeneralSvgReferenceElement.getAttribute('data-extensions');
   if(extensionsTxt){
    extensions=JSON.parse(extensionsTxt);
   }
   
   if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='radialgradient' || globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='lineargradient' ){
    
    var tr=globalGeneralSvgReferenceElement.getAttribute('gradientTransform')?globalGeneralSvgReferenceElement.getAttribute('gradientTransform'):'';
    
   }else{
    
    var tr=globalGeneralSvgReferenceElement.getAttribute('transform')?globalGeneralSvgReferenceElement.getAttribute('transform'):'';
    
   }
    var objTransform=convertirTransformEnTableau(tr,[]);
   if(extensions && extensions.tableauArbre.includes('clipPath') || extensions && extensions.tableauArbre.includes('pattern') ){
    if(globalGeneralSvgReferenceElement.getAttribute('data-transformOriginal') && globalGeneralSvgReferenceElement.getAttribute('data-transformOriginal')!==''){
     t+=''+trad['clip_ou_pattern_contient_des_transformations'];
    }else{
    }
   }else{
    var trouve=false;
    for(var i=0;i<objTransform.tab.length;i++){
     trouve=true;
     t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"supptransform1","numArbre":'+numArbre+',"numTransform":'+i+'}')+'">'+objTransform.tab[i][0]+'(';
     for(var j=0;j<objTransform.tab[i][1].length;j++){
      t+=objTransform.tab[i][1][j]+' ';
     }
     t+=')</button>';
    }
    try{
     if(trouve && 'setModeSaisieTranE1'===_dssvg.mode_en_cours && globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='path'){
      t+='<button class="butEnabled butMenuHaut bckJaune" data-action="'+htm1('{"action":"PTR2ABS","numArbre":'+numArbre+'}')+'">PTR2ABS</button>';
     }
    }catch(e){
    }
    
   }
    
   if((_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ) && globalIndicePoint!==null){
    
    if(
     ( globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='polyline' || 
       globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='polygon' 
     ) && globalSelectionPoints.tabOriginal!==null
    ){
     
     t+='<div>P'+(globalIndicePoint/2)+'</div>'; // c'est une liste de positions x y
     t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointPolyAvant","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">'+trad['ajouter_point_avant']+'</button>';
     t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointPolyApres","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">'+trad['ajouter_point_apres']+'</button>';
     if(globalIndicePoint>0){
      t+='<button class="butEnabled butMenuHaut bckRouge" data-action="'+htm1('{"action":"supprimerPointPolyline","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">'+trad['supprimer_point']+'</button>';
     }
     t+='<button class="butEnabled butMenuHaut bckRouge" data-action="'+htm1('{"action":"polylineToPath","numArbre":'+numArbre+'}')+'">'+trad['polyx_vers_path']+'</button>';
     
     
    }else if(
     globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='path' &&
     globalSelectionPoints.tabOriginal !==null &&
     globalSelectionPoints.tabAbsolu   !==null
    ){
      
     try{      
      
      t+='<div style="color:red;">P'+globalIndicePoint+'</div>';
      
      t+='<div>';
      t+=globalSelectionPoints.tabOriginal[globalIndicePoint][0]+'&nbsp;';
      for(var i=1;i<globalSelectionPoints.tabOriginal[globalIndicePoint].length;i++){
       t+=''+arrdi10000(globalSelectionPoints.tabOriginal[globalIndicePoint][i])+'&nbsp;&nbsp;';
      }
      t+='</div>'

      if(globalIndicePoint>=0){
       
       
       if(globalSelectionPoints.tabOriginal[globalIndicePoint][0]===globalSelectionPoints.tabOriginal[globalIndicePoint][0].toLowerCase()){

        // si c'est un segment relatif ( en minuscule )
        var tt=''+globalSelectionPoints.tabAbsolu[globalIndicePoint][0]+ ' ';
        // globalSelectionPoints.tabAbsolu[globalIndicePoint]
        for(var i=1;i<globalSelectionPoints.tabAbsolu[globalIndicePoint].length;i++){
         tt+=''+arrdi10000(globalSelectionPoints.tabAbsolu[globalIndicePoint][i])+' &nbsp;&nbsp;';
        }
        t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"pointEnAbsolu","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"nouvPoint":"'+globalSelectionPoints.tabAbsolu[globalIndicePoint].join(' ')+'"}')+'">'+tt+'</button>';
        
        if(globalSelectionPoints.tabOriginal[globalIndicePoint][0]=='a'){
         
         var ttori=JSON.parse(JSON.stringify(globalSelectionPoints.tabOriginal[globalIndicePoint])); //globalSelectionPoints.tabOriginal[globalIndicePoint];
         ttori[4]=ttori[4]==1?0:1;
         t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"largeArc","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"nouvPoint":"'+ttori.join(' ')+'"}')+'">lrgA'+(ttori[4])+'</button>';
         var ttori=JSON.parse(JSON.stringify(globalSelectionPoints.tabOriginal[globalIndicePoint])); //globalSelectionPoints.tabOriginal[globalIndicePoint];
         ttori[5]=ttori[5]==1?0:1;
         t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"sweepFlag","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"nouvPoint":"'+ttori.join(' ')+'"}')+'">swpFlg'+(ttori[4])+'</button>';
         
        }
        
       }else if(globalSelectionPoints.tabOriginal[globalIndicePoint][0]===globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()){

        // si c'est un segment absolu ( en majuscule )
        var obj=recupRelatifVersAbsolu(globalIndicePoint , globalSelectionPoints.tabOriginal , globalSelectionPoints.tabAbsolu , numArbre );
        t+=obj.bout;
        
       }
      }
      t+='<button class="butEnabled butMenuHaut bckVert2" data-action="'+htm1('{"action":"cheminCompletEnRelatif","numArbre":'+numArbre+'}')+'">'+trad['relatif']+'</button>';
      t+='<button class="butEnabled butMenuHaut bckVert2" data-action="'+htm1('{"action":"cheminCompletEnAbsolu","numArbre":'+numArbre+'}')+'">'+trad['absolu']+'</button>';

      // supprimer un point d'un chemin
      
      if(globalIndicePoint!==0){
        
       if(globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()=='C'){
        // on ne peut pas supprimer un C suivi par un S
        
        if(globalIndicePoint<globalSelectionPoints.tabOriginal.length-1 && globalSelectionPoints.tabOriginal[globalIndicePoint+1][0].toUpperCase()=='S'){
        }else{
         t+='<button class="butEnabled butMenuHaut bckRouge" data-action="'+htm1('{"action":"SupprimerPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'"> &times; P '+(globalIndicePoint)+'</button>';
        }
        
       }else if(globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()=='Q'){
        // on ne peut pas supprimer un Q suivi par un T
        
        if(globalIndicePoint<globalSelectionPoints.tabOriginal.length-1 && globalSelectionPoints.tabOriginal[globalIndicePoint+1][0].toUpperCase()=='T'){
        }else{
         t+='<button class="butEnabled butMenuHaut bckRouge" data-action="'+htm1('{"action":"SupprimerPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'"> &times; P '+(globalIndicePoint)+'</button>';
        }
        
        
       }else{
        t+='<button class="butEnabled butMenuHaut bckRouge" data-action="'+htm1('{"action":"SupprimerPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'"> &times; P '+(globalIndicePoint)+'</button>';
       }
      }

      // ajouter un point à un chemin
      var typePointChemin=['M','L','C','Q','H','V','A','T','S','Z'];
      for(var i=0;i<typePointChemin.length;i++){
       if(typePointChemin[i]=='T'){
        if(globalSelectionPoints.tabAbsolu[globalIndicePoint][0]=='T' || globalSelectionPoints.tabAbsolu[globalIndicePoint][0]=='Q' ){
         t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"typePointChemin":"'+typePointChemin[i]+'"}')+'"> + '+typePointChemin[i]+' &nbsp;</button>';
        }
       }else if(typePointChemin[i]=='S'){
        if(globalSelectionPoints.tabAbsolu[globalIndicePoint][0]=='S' || globalSelectionPoints.tabAbsolu[globalIndicePoint][0]=='C' ){
         t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"typePointChemin":"'+typePointChemin[i]+'"}')+'"> + '+typePointChemin[i]+' &nbsp;</button>';
        }
       }else{
        t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"ajouterPointChemin","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+',"typePointChemin":"'+typePointChemin[i]+'"}')+'"> + '+typePointChemin[i]+' &nbsp;</button>';
       }
      }
      
      var strkWidth=parseFloat(window.getComputedStyle(globalGeneralSvgReferenceElement)['stroke-width']);
      if(strkWidth>0){
       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"simplifierChemin1","numArbre":'+numArbre+',"strkWidth":'+strkWidth+'}')+'">'+trad['simplifier_ce_chemin']+'</button>';
      }

      if(globalIndicePoint!==0){
       if(globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()==='H' || globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()==='V'){
        t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"hOuVenL1","numArbre":'+numArbre+'}')+'">'+trad['H_ou_V_en_L']+'</button>';
       }
       if(globalSelectionPoints.tabOriginal[globalIndicePoint][0].toUpperCase()!=='C' && globalIndicePoint>0){
        t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"enC1","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">'+trad['X_en_C']+'</button>';
       }
       t+='<button class="butEnabled butMenuHaut" data-action="'+htm1('{"action":"XenL10","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">X2LP'+_dssvg.parametres.diviseurDeChemin+'</button>';
      }
      t+='<button class="butEnabled butMenuHaut bckJaune" data-action="'+htm1('{"action":"XenLA10","numArbre":'+numArbre+',"indicePoint":'+globalIndicePoint+'}')+'">X2LA'+_dssvg.parametres.diviseurDeChemin+'</button>';
      
     }catch(egg){
     }

    }
   }



   try{
    if(
      (_dssvg.mode_en_cours==='setModeSaisieSelElt1' || 'setModeSaisieDefsElt1'===_dssvg.mode_en_cours) ||
      ( (_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ) && globalIndicePoint!==null )
    ){

     var couleurs=recuperePropsCouleurs(numArbre);

     if(globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='image'){
       t+='<button class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"wiEtHeImageVide" ,"numArbre":'+numArbre+'}')+'">raz hauteur et largeur</button>';
       t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"opacity" ,"numArbre":'+numArbre+',"valeur":"'+couleurs['opacity'].valeur         +'"}')+'">opac:'+couleurs['opacity'].valeur+'</button>';
     }else{
      if(couleurs['stroke'] && couleurs['stroke'].valeur.indexOf('url(')<0){
       t+='<button title="'+trad['couleur_de_trait']+'" class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;display:flex;align-items:center;" data-action="'+htm1('{"action":"strokeElement" ,"numArbre":'+numArbre+',"valeur":"'+couleurs['stroke'].valeur         +'"}')+'">';
       t+='<svg class="svgBoutonHaut1" viewBox="-2 -2  16 21"><line x1="0" y1="0" x2="0" y2="15" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:blue;fill:transparent;stroke-width:3;"></line><line x1="6" y1="0" x2="6" y2="15" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:red;fill:transparent;stroke-width:3;"></line><line x1="12" y1="0" x2="12" y2="15" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:green;fill:transparent;stroke-width:3;"></line></svg>';
       t+=''+couleurs['stroke'].valeur;
       t+='</button>';
      }
      t+='<button title="'+trad['epaisseur_de_trait']+'" class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;display:flex;align-items:center;" data-action="'+htm1('{"action":"stroke-width"  ,"numArbre":'+numArbre+',"valeur":"'+couleurs['stroke-width'].valeur   +'"}')+'">';
      t+='<svg class="svgBoutonHaut1" viewBox="-2 -2  11 19"><line x1="0" y1="0" x2="0" y2="15" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:1;"></line><line x1="3" y1="0" x2="3" y2="15" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:2;"></line><line x1="7" y1="0" x2="7" y2="15" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:3;"></line></svg>';
      t+=''+couleurs['stroke-width'].valeur+'</button>';
      // 
      if(couleurs['fill'].valeur.indexOf('url(')<0){
       t+='<button title="'+trad['couleur_de_remplissage']+'" class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;display:flex;align-items:center;" data-action="'+htm1('{"action":"fillElement"   ,"numArbre":'+numArbre+',"valeur":"'+couleurs['fill'].valeur           +'"}')+'">';
       t+='<svg class="svgBoutonHaut1" viewBox="-4 -4  12 12"><circle cx="-1" cy="-1" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:blue;stroke-width:0.3;"></circle><circle cx="-1" cy="5" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:red;stroke-width:0.3;"></circle><circle cx="5" cy="-1" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:green;stroke-width:0.3;"></circle><circle cx="5" cy="5" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:white;stroke-width:0.3;"></circle></svg>';
       t+=''+couleurs['fill'].valeur+'</button>';
       // 
      }

      t+='<button  title="'+trad['opacite_de_trait']+'" class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;display:flex;align-items:center;" data-action="'+htm1('{"action":"stroke-opacity","numArbre":'+numArbre+',"valeur":"'+couleurs['stroke-opacity'].valeur +'"}')+'">';
      t+='<svg class="svgBoutonHaut1" viewBox="1 -2  10 19"><line x1="3" y1="0" x2="3" y2="15" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:2;stroke-opacity:1;"></line><line x1="6" y1="0" x2="6" y2="15" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:2;stroke-opacity:0.5;"></line><line x1="9" y1="0" x2="9" y2="15" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:2;stroke-opacity:0.25;"></line></svg>';
      t+=''+couleurs['stroke-opacity'].valeur+'</button>';

      t+='<button title="'+trad['opacite_de_remplissage']+'" class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;display:flex;align-items:center;" data-action="'+htm1('{"action":"fill-opacity"  ,"numArbre":'+numArbre+',"valeur":"'+couleurs['fill-opacity'].valeur   +'"}')+'">';
      t+='<svg class="svgBoutonHaut1" viewBox="-4 -4  12 12"><circle cx="-1" cy="-1" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:black;stroke-width:0.3;"></circle><circle cx="-1" cy="5" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:black;stroke-width:0.3;fill-opacity:0.65;"></circle><circle cx="5" cy="-1" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:black;stroke-width:0.3;fill-opacity:0.4;"></circle><circle cx="5" cy="5" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:black;stroke-width:0.3;fill-opacity:0.15;"></circle></svg>';
      t+=''+couleurs['fill-opacity'].valeur+'</button>';
      // 
      t+='<button title="'+trad['opacite_de_trait_et_remplissage']+'" class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;display:flex;align-items:center;" data-action="'+htm1('{"action":"opacity"  ,"numArbre":'+numArbre+',"valeur":"'+couleurs['opacity'].valeur   +'"}')+'">';
      t+='<svg class="svgBoutonHaut1"  viewBox="-6 -4  16 12"><circle cx="-1" cy="-1" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:black;stroke-width:0.3;"></circle><circle cx="-1" cy="5" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:black;stroke-width:0.3;fill-opacity:0.65;"></circle><circle cx="5" cy="-1" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:black;stroke-width:0.3;fill-opacity:0.4;"></circle><circle cx="5" cy="5" r="2" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:black;fill:black;stroke-width:0.3;fill-opacity:0.15;"></circle><line x1="-4" y1="-3" x2="-4" y2="7" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:2;stroke-opacity:1;"></line><line x1="2" y1="-3" x2="2" y2="7" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:2;stroke-opacity:0.5;"></line><line x1="8" y1="-3" x2="8" y2="7" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:2;stroke-opacity:0.25;"></line></svg>';
      t+=''+couleurs['opacity'].valeur+'</button>';
      // <svg xmlns="http://www.w3.org/2000/svg" 
     }
     t+='<button title="'+trad['supprimer_attributs_graphiques']+'" class="butEnabled butMenuHaut bckRouge" style="min-width: fit-content;" data-action="'+htm1('{"action":"suppAttribGra1"  ,"numArbre":'+numArbre+'}')+'">';
     t+='<svg class="svgBoutonHaut1" viewBox="9 -7  45 46.3869"><path d=" M 12 16 C 11 12 12 5 21 -1  C 31 -7 42 -2 46 4 C 51 11 52 24 41 31 C 37 33 28 38 25 30 C 23 26 28 25 27 22 C 25 21 22 22 19 22 C 15 22 12 19 12 16" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:rgb(255, 0, 0);fill:gold;stroke-width:1;"></path><circle cx="31" cy="4" r="3" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:red;fill:red;stroke-width:1;"></circle><circle cx="21" cy="10" r="3" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:chartreuse;fill:chartreuse;stroke-width:1;"></circle><circle cx="40" cy="11" r="3" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:yellow;fill:yellow;stroke-width:1;"></circle><circle cx="39" cy="21" r="3" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:blue;fill:blue;stroke-width:1;"></circle><circle cx="32" cy="28" r="3" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" transform="" style="stroke:white;fill:white;stroke-width:1;"></circle><line x1="11" y1="-5" x2="51" y2="34" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:3;"></line><line x1="11" y1="34" x2="51" y2="-5" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:transparent;stroke-width:3;"></line></svg>';
     t+='</button>';
     t+='<button title="'+trad['editer_element']+'" class="butEnabled butMenuHaut" style="min-width: 2em;padding:0 3px" data-action="'+htm1('{"action":"editElement"  ,"numArbre":'+numArbre+'}')+'">';
     t+='<svg class="svgBoutonHaut1" viewBox="1 -10  62.0902 64"><g><path d=" M 41 -6 C 41 -3 41 0 41 2 C 42 2 47 2 49 2  C 48 1 44 -3 41 -6" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:slategray;fill:slategray;stroke-width:1;"></path><path d=" M 3 -8 C 7 -8 35 -8 42 -8 C 45 -5 49 -1 51 1 C 51 5 51 46 51 52  C 47 52 8 52 3 52 C 3 47 3 -4 3 -8" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:black;fill:white;stroke-width:1;"></path><path d=" M 50 6 C 52 4 53 3 54 2 C 56 4 58 6 59 7  C 58 8 57 9 55 11 C 53 10 52 8 50 6" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:gainsboro;fill:gainsboro;stroke-width:1;"></path><path d=" M 54 2 C 56 0 58 -1 60 1  C 62 3 61 5 59 7 z" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:orchid;fill:orchid;stroke-width:1;"></path><path d=" M 18 40 L 21 43 L 16 45  L 18 40" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:slategray;fill:slategray;stroke-width:1;"></path><path d=" M 10 1 C 10 1 26 1 26 1 m -16 6 h 34 m -34 6 h 30 m -30 6 h 30 m -30 6 h 34 m -34 6 h 31 m -31 6 h 33 m -33 6 h 8 " stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:slategray;fill:transparent;stroke-width:3;"></path><path d=" M 21 36 L 23 36 L 23 38 L 25 38 L 25 41 L 55 11  L 50 6 L 20 36" stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:gold;fill:gold;stroke-width:1;"></path><path d=" M 20 36 L 23 36 L 23 38 L 25 38 L 25 41 L 21 43 L 18 40  L 20 36" stroke="rgb(255, 0, 0)" stroke-width="5" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:lightpink;fill:lightpink;stroke-width:1;"></path></g></svg>';
     t+='</button>';
     t+='<button title="'+trad['copier_styyle']+'" class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"copystyyl"  ,"numArbre":'+numArbre+'}')+'">';
     t+='<svg class="svgBoutonHaut1" viewBox="-20.1445 4.1917  30.7333 32.8356"><g transform="rotate(38 0 0 )"><path d=" M 3 15 C 3 16 3 27 3 30 C 6 30 6 31 7 34 C 8 34 8 34 9 34 C 10 31 10 30 13 30 C 13 27 13 16 13 15 C 11 15 5 15 3 15" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:slategray;fill:white;stroke-width:1;"></path><path d=" M 1 15 C 4 15 12 15 15 15 C 15 13 15 12 13 12 C 13 11 13 9 13 7 C 13 6 12 2 8 2 C 4 2 3 6 3 7 C 3 8 3 10 3 12 C 1 12 1 13 1 15" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:dodgerblue;fill:dodgerblue;stroke-width:1;"></path></g></svg>';
     t+='</button>';
     if(styylCopie!==null){
      t+='<button title="'+trad['coller_styyle']+'" class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"pastestyyl"  ,"numArbre":'+numArbre+'}')+'">';
      t+='<svg class="svgBoutonHaut1" viewBox="-2 65.7256  171.2193 144.2744"><path stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" d=" M 166 69 C 163 65 96 106 93 109 C 90 112 86 116 82 121 C 80 123 78 127 75 130  C 72 135 66 143 61 149 L 67 155 C 74 152 81 150 87 147 C 91 145 95 143 98 142 C 103 140 110 136 114 133 C 118 130 170 73 166 69" style="stroke:black;fill:sienna;stroke-width:5;"></path><path d="M 82 121 C 92 126 96 132 97 140 C 94 142 91 143 87 145 C 86 138 81 133 75 130 C 77 126 80 124 82 121 " stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:red;fill:red;stroke-width:5;"></path><path stroke="rgb(255, 0, 0)" stroke-width="1" fill="transparent" d=" M 61 148 C 46 145 33 153 29 162  C 22 179 17 189 5 203 C 19 203 37 201 46 194 C 56 185 69 161 69 156 z" style="stroke:red;fill:red;stroke-width:5;"></path></svg>';
      t+='</button>';
     }
     
    }
   }catch(egg){}
   if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' ){
    t+='<button class="butEnabled butMenuHaut bckRouge" style="min-width: fit-content;" data-action="'+htm1('{"action":"suppAttribGraDuGroupe1"  ,"numArbre":'+numArbre+'}')+'">'+trad['supp_attr_gra_grp']+'</button>';
    t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"popupPropEltsGrp1"  ,"numArbre":'+numArbre+'}')+'">'+trad['Modifier_propriétés_du_groupe']+'</button>';
    t+='<button title="'+trad['redimentionner_les_éléments_du_groupe']+'" class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"redimEltsGrp"  ,"numArbre":'+numArbre+'}')+'">';
    t+='<svg class="svgBoutonHaut1" viewBox="0 0  24 27"><path d=" M 1 1 C 6 1 15 1 19 1 L 19 3 L 3 3 L 3 17 L 1 17 L 1 1 M 9 5 L 5 5 L 5 9 L 6 10  L 6 7 L 17 19 L 14 19 L 15 20 L 19 20 L 19 16 L 18 15 L 18 18 L 7 6 L 10 6 L 9 5 m 12 17 l -12 0 l 0 2 l 14 0 l 0 -19 l -2 0 l 0 17" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:red;fill:yellow;stroke-width:0.5;"></path></svg>';
    t+='</button>';
    
    
    t+='<button class="butEnabled butMenuHaut bckJaune" style="min-width: fit-content;" data-action="'+htm1('{"action":"deplaceEltsGrp"  ,"numArbre":'+numArbre+'}')+'">'+trad['deplacer_les_éléments_du_groupe']+'</button>';
   }
   
  }
  if(
     (_dssvg.mode_en_cours==='setModeSaisieSelElt1' || 'setModeSaisieDefsElt1'===_dssvg.mode_en_cours) ||
     ( (_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ) && globalIndicePoint!==null )
  ){
   t+='<button title="'+trad['redimentionner_élément']+'" class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"redimElt1"  ,"numArbre":'+numArbre+'}')+'">';
   t+='<svg class="svgBoutonHaut1" viewBox="0 0  24 27"><path d=" M 1 1 C 6 1 15 1 19 1 L 19 3 L 3 3 L 3 17 L 1 17 L 1 1 M 9 5 L 5 5 L 5 9 L 6 10  L 6 7 L 17 19 L 14 19 L 15 20 L 19 20 L 19 16 L 18 15 L 18 18 L 7 6 L 10 6 L 9 5 m 12 17 l -12 0 l 0 2 l 14 0 l 0 -19 l -2 0 l 0 17" stroke="rgb(0, 0, 0)" stroke-width="1" fill="transparent" stroke-linejoin="round" stroke-linecap="round" transform="" style="stroke:red;fill:yellow;stroke-width:0.5;"></path></svg>';
   t+='</button>';
  }
  if(_dssvg.mode_en_cours==='setModeSaisieGroupe1' && _dssvg.idArbreCourant!==null){
   /*
   Dans le cas ci dessous, on a deux groupes qui sont supperposés l'un sur l'autre, celui actif est le groupe 3 mais on voulait peut être sélectionner le groupe 2

   _dssvg.mode_en_cours==='setModeSaisieGroupe1'
   _dssvg.idArbreCourant = 3, !== null

   // <circle data-type="toRemove" data-elem="2 hg" cx="296" cy="671" r="0.75" style="fill:rgba(255,0,0,0.2);stroke:blue;stroke-width:0.0625;" data-action="selectionnerElementAtransformer"></circle>
   // <circle data-action="fElementTransformTranslate1" data-angle="0" data-angleg="0" data-type="toRemove" data-elem="3 hg" cx="296" cy="671" r="0.75" style="fill:rgba(255,255,0,0.5);stroke:red;stroke-width:0.0625;"></circle>
   */
   var cx=null;
   var cy=null;
   var lst1=document.querySelectorAll('[data-elem="'+_dssvg.idArbreCourant+' hg"]');
   for(var i=0;i<lst1.length;i++){
    if(lst1[i].nodeName==='circle'){
     if(lst1[i].getAttribute('cx')){
      cx=parseFloat(lst1[i].getAttribute('cx'));
      cy=parseFloat(lst1[i].getAttribute('cy'));
     }
    }
   }

   if(cx!==null && cy!==null){
    var lst=document.querySelectorAll('[data-action="selectionnerElementAtransformer"]'); // data-elem=""2 hg"
    for(var i=0;i<lst.length;i++){
     if(lst[i].nodeName==='circle'){
      var attrDe=lst[i].getAttribute('data-elem');
      if(attrDe.indexOf(' hg')>=0 && lst[i].getAttribute('cx')){
       var cx1=parseFloat(lst[i].getAttribute('cx'));
       var cy1=parseFloat(lst[i].getAttribute('cy'));
       if(cx1>=cx-0.5 && cx1<=cx+0.5 && cy1>=cy-0.5 && cy1<=cy+0.5 ){

        var idAutre=parseInt(attrDe.substr(0,attrDe.indexOf(' hg')),10);

        t+='<button class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"selectionnerGroupeDessous1"  ,"idAutre":'+idAutre+',"idCourant":'+_dssvg.idArbreCourant+'}')+'">'+trad['selectionner_le_groupe']+' '+idAutre+' '+trad['sous_le']+' '+_dssvg.idArbreCourant+' ('+trad['sous_le']+')</button>';
       }
      }
     }
    }
   }
  }
  if(
    ( globalGeneralSvgReferenceElement && globalIndicePoint!==null &&  (_dssvg.mode_en_cours==='setModeSaisieEditionPoin1' || 'setModeSaisieDefsPtE1'===_dssvg.mode_en_cours ) && globalGeneralSvgReferenceElement.nodeName.toLowerCase()==='path' )
  ){
   if(selectSeulement!==''){
    t+='<button title="'+trad['bouger_poignees']+'" class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"selectSeulemen" , "valeur":"" ,"numArbre":'+numArbre+'}')+'">';
    t+='<svg class="svgBoutonHaut1" viewBox="-12 14  33 28"><path stroke="black" stroke-width="3" fill="transparent" d=" M -7 19 C -4 37 11 40 16 23 "></path><circle cx="10" cy="36" r="4" stroke="blue" stroke-width="2" fill="green" style="stroke:blue;fill:green;stroke-width:1;"></circle><circle cx="-7" cy="19" r="4" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:1;"></circle><circle cx="-4" cy="37" r="4" stroke="green" stroke-width="2" fill="blue" style="stroke:green;fill:blue;stroke-width:1;"></circle><circle cx="16" cy="23" r="4" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:1;"></circle><path d=" M -7 19 L -4 37 " stroke="rgb(0, 0, 255)" stroke-width="1" fill="transparent"></path><path d="M 16,23 L 10,36" stroke="rgb(0, 255, 0)" stroke-width="1" fill="transparent"></path></svg>';
    t+='</button>';
   }
   if(selectSeulement!=='bleu'){
    t+='<button title="'+trad['bouger_poignees_bleus_seulement']+'" class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"selectSeulemen" , "valeur":"bleu" ,"numArbre":'+numArbre+'}')+'">';
    t+='<svg class="svgBoutonHaut1" viewBox="-10 16  29 29"><path stroke="black" stroke-width="3" fill="transparent" d=" M -7 19 C -4 37 11 40 16 23 "></path><circle cx="10" cy="36" r="2" stroke="blue" stroke-width="2" fill="green" style="stroke:blue;fill:green;stroke-width:0.1;"></circle><circle cx="-7" cy="19" r="2" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:1;"></circle><circle cx="-4" cy="37" r="5" stroke="green" stroke-width="2" fill="blue" style="stroke:green;fill:blue;stroke-width:0.1;"></circle><circle cx="16" cy="23" r="2" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:1;"></circle><path d=" M -7 19 L -4 37 " stroke="rgb(0, 0, 255)" stroke-width="1" fill="transparent"></path><path d="M 16,23 L 10,36" stroke="rgb(0, 255, 0)" stroke-width="1" fill="transparent"></path></svg>';
    t+='</button>';
   }
   if(selectSeulement!=='vert'){
    t+='<button title="'+trad['bouger_poignees_vertes_seulement']+'" class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"selectSeulemen" , "valeur":"vert" ,"numArbre":'+numArbre+'}')+'">';
    t+='<svg class="svgBoutonHaut1" viewBox="-11 15  31 28"><path stroke="black" stroke-width="3" fill="transparent" d=" M -7 19 C -4 37 11 40 16 23 "></path><circle cx="10" cy="36" r="5" stroke="blue" stroke-width="2" fill="green" style="stroke:blue;fill:green;stroke-width:0.1;"></circle><circle cx="-7" cy="19" r="3" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:1;"></circle><circle cx="-4" cy="37" r="3" stroke="green" stroke-width="2" fill="blue" style="stroke:green;fill:blue;stroke-width:0.1;"></circle><circle cx="16" cy="23" r="3" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:1;"></circle><path d=" M -7 19 L -4 37 " stroke="rgb(0, 0, 255)" stroke-width="1" fill="transparent"></path><path d="M 16,23 L 10,36" stroke="rgb(0, 255, 0)" stroke-width="1" fill="transparent"></path></svg>';
    t+='</button>';
   }
   if(selectSeulement!=='roug'){
    t+='<button title="'+trad['bouger_poignees_rouges_seulement']+'" class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"selectSeulemen" , "valeur":"roug" ,"numArbre":'+numArbre+'}')+'">';
    t+='<svg class="svgBoutonHaut1" viewBox="-11 15  33 27"><path stroke="black" stroke-width="3" fill="transparent" d=" M -7 19 C -4 37 11 40 16 23 "></path><circle cx="10" cy="36" r="3" stroke="blue" stroke-width="2" fill="green" style="stroke:blue;fill:green;stroke-width:0.1;"></circle><circle cx="-7" cy="19" r="3" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:0.1;"></circle><circle cx="-4" cy="37" r="3" stroke="green" stroke-width="2" fill="blue" style="stroke:green;fill:blue;stroke-width:0.1;"></circle><circle cx="16" cy="23" r="5" stroke="red" stroke-width="2" fill="pink" style="stroke:red;fill:pink;stroke-width:1;"></circle><path d=" M -7 19 L -4 37 " stroke="rgb(0, 0, 255)" stroke-width="1" fill="transparent"></path><path d="M 16,23 L 10,36" stroke="rgb(0, 255, 0)" stroke-width="1" fill="transparent"></path></svg>';
    t+='</button>';
   }
   t+='<button title="'+trad['bouger_poignees_rouges_seulement']+'" class="butEnabled butMenuHaut" style="min-width: fit-content;" data-action="'+htm1('{"action":"editPath1" , "numArbre":'+numArbre+'}')+'">';
   t+='editPath';
   t+='</button>';

  }

  
  if(_dssvg.mode_en_cours==='setModeSaisieDeplace1'){
   t+='<span style="color:black;font-weight:bold;">elts='+(_dssvg.arbre0.length-1)+'</span>';
  }
  
  
  
  
  divlag2.innerHTML=t;
  var taille=divlag2.getBoundingClientRect();

  divlft.style.paddingBottom=taille.height+'px';
  
 }
 
 //========================================================================================================
 function saveStte(){
  
 
  
  var nouvelArbre=[];
  for(var i=_dssvg.arbre0.length-1;i>=0;i--){
   if(_dssvg.arbre0[i].data.attributes.hasOwnProperty('data-type') && (  _dssvg.arbre0[i].data.attributes['data-type']=='toRemove' ||  _dssvg.arbre0[i].data.attributes['data-type']=='systeme' )){    
   }else{
    nouvelArbre.push(_dssvg.arbre0[i]);
   }
  }
  var nouvelArbre2=[];
  for(var i=nouvelArbre.length-1;i>=0;i--){
   nouvelArbre2.push(nouvelArbre[i]);
  }
  _dssvg.arbre0=nouvelArbre2;


  var ancienArbreText=null;
  var draw_stateTxt=localStorage.getItem('_dssvg');
  if(draw_stateTxt){
   try{
    var jsonDs=JSON.parse(draw_stateTxt);
    if(jsonDs.historique1.length>0){
     ancienArbreText=JSON.stringify(jsonDs.historique1[jsonDs.historique1.length-1]);
    }
   }catch(e){
   }
  }

  var nouvelArbreTexte=JSON.stringify(_dssvg.arbre0);
  if(_dssvg.arbre0.length>0 && nouvelArbreTexte!=ancienArbreText){
   _dssvg.historique1.push(JSON.parse(JSON.stringify(nouvelArbre2)));
   if(_dssvg.historique1.length>10){
    _dssvg.historique1.splice(0,1);
   }
  }
  

  
  try{
   localStorage.setItem('_dssvg', JSON.stringify(_dssvg)); 
  }catch(e){
  }
 } 
 //========================================================================================================
 function afficheIndicateurFleche(){
  var x0=arrdi10000(_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2]/2);
  var y0=arrdi10000(_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3]/2);
  var x1=arrdi10000(_dssvg.arbre0[0].data.sizes.minx+(_dssvg.arbre0[0].data.sizes.maxx-_dssvg.arbre0[0].data.sizes.minx)/2);
  var y1=arrdi10000(_dssvg.arbre0[0].data.sizes.miny+(_dssvg.arbre0[0].data.sizes.maxy-_dssvg.arbre0[0].data.sizes.miny)/2);
  var line= ajouteElemDansElem(refZnDessin,'path',{'data-type':'toRemove','data-elem':0,d:'M '+x0+' '+y0+' L '+x1+' '+y1+'',style:'fill:transparent;stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';'});
 }
 //========================================================================================================
 function afficheIndicateurBoite(){
  var x1=arrdi10000(_dssvg.arbre0[0].data.sizes.minx);
  var y1=arrdi10000(_dssvg.arbre0[0].data.sizes.miny);
  var w1=arrdi10000((_dssvg.arbre0[0].data.sizes.maxx-_dssvg.arbre0[0].data.sizes.minx));
  var h1=arrdi10000((_dssvg.arbre0[0].data.sizes.maxy-_dssvg.arbre0[0].data.sizes.miny));
  var rect= ajouteElemDansElem(refZnDessin,'rect',{'data-type':'toRemove','data-elem':0,x:x1,y:y1,width:w1,height:h1,style:'fill:rgba(0,255,0,0.5);stroke:blue;stroke-width:'+(1/_dssvg.zoom1)+';'});
 }
 //========================================================================================================
 function afficheArbre0(option){

  var obj=looptree(0,{afficherTout:true});

  refZnDessin.innerHTML=obj.txt;
  recalculBBoxes();
  saveStte();
  var obj=looptree(0,{afficherTout:false,mode:_dssvg.mode_en_cours});

//  console.log('_dssvg.arbre0=',_dssvg.arbre0);
  etatPoigneesVoisines1=false;
  majBout();

  refZnDessin.innerHTML=obj.txt;
  
  var absy= ajouteElemDansElem(refZnDessin,'polyline',{'data-type':'systeme',points:'0 0 101 0','stroke-dasharray':'5',style:'fill:transparent;stroke:red;stroke-width:'+(1/_dssvg.zoom1/4)+';'}); // 
  var ordo= ajouteElemDansElem(refZnDessin,'polyline',{'data-type':'systeme',points:'0 0 0 101','stroke-dasharray':'5',style:'fill:transparent;stroke:red;stroke-width:'+(1/_dssvg.zoom1/4)+';'}); // 
  
  if('setModeSaisieDeplace1'===_dssvg.mode_en_cours){
   
   if(obj.nbObjAff==0 && _dssvg.arbre0.length>1){
    afficheIndicateurFleche();
    afficheIndicateurBoite();
   }else if(obj.nbObjAff<_dssvg.arbre0.length-1){
    afficheIndicateurBoite();
   }
  }else{
   if(obj.nbObjAff==0 && _dssvg.arbre0.length>1){
    if('setModeSaisieDefsElt1'=== _dssvg.mode_en_cours || 'setModeSaisieDefsPtE1' === _dssvg.mode_en_cours ){
     afficheIndicateurFleche();
     affPoi();
    }else{
     afficheIndicateurFleche();
    }
   }else{
    affPoi();
   }
  }
  divLag2Complete();
  
 }
 //========================================================================================================
 function looptree(parentId,option){
  var txt='';
  var nbObjAff=0;
  var afficherObjet=true;
  
  for(var i=0;i<_dssvg.arbre0.length;i++){

   if(_dssvg.arbre0[i].parentId==parentId){

    if(!option.tableauArbre){
     option.tableauArbre=[_dssvg.arbre0[i].data.nodeName];
    }else{
     option.tableauArbre.push(_dssvg.arbre0[i].data.nodeName);
    }

    
    if('#comment'==_dssvg.arbre0[i].data.nodeName){
    }else{
     afficherObjet=true;
     if(option.afficherTout===true || ( _dssvg.arbre0[i].data.hasOwnProperty('sizes') && _dssvg.arbre0[i].data.sizes.maxx==-999999 ) ){ // on a inséré un g, il faudra le recalculer plus tard
     }else{
      if(_dssvg.arbre0[i].data.hasOwnProperty('sizes')){
       if(_dssvg.arbre0[i].data.sizes.maxx<_dssvg.viewBoxInit[0]){ // *_dssvg.zoom1
        afficherObjet=false;
       }else if(_dssvg.arbre0[i].data.sizes.minx>(_dssvg.viewBoxInit[0]+_dssvg.viewBoxInit[2])){ // *_dssvg.zoom1
        afficherObjet=false;
       }else if(_dssvg.arbre0[i].data.sizes.maxy<_dssvg.viewBoxInit[1]){
        afficherObjet=false;
       }else if(_dssvg.arbre0[i].data.sizes.miny>(_dssvg.viewBoxInit[1]+_dssvg.viewBoxInit[3])){
        afficherObjet=false;
       }
      }
     }
     var nn=_dssvg.arbre0[i].data.nodeName.toLowerCase();
     if(afficherObjet===false && ( option.tableauArbre[0]==='defs' || option.tableauArbre[option.tableauArbre.length-1]==='g' || option.tableauArbre[0]==='symbol'  ) ){ 
      // on doit afficher les groupes car quand on dessine dans un groupe, il faut que je puisse comparer 
      // la matrice générée et la matrice réelle
      afficherObjet=true;
     }
     
     
     
     if(afficherObjet===false){
//      console.log('masquer obj i='+i,_dssvg.viewBoxInit , _dssvg.arbre0[i].data.sizes);
     }else{
      if(nn==='g' || option.tableauArbre[0]==='defs' || option.tableauArbre[0]==='metadata' ){
      }else{
       nbObjAff++;
      }
     }
     if(afficherObjet===true){
      for(var j in _dssvg.arbre0[i].data.attributes){
       if(j==='data-type' && (_dssvg.arbre0[i].data.attributes[j]==='systeme' || _dssvg.arbre0[i].data.attributes[j]==='toRemove' ) ){
        afficherObjet=false;
        break;
       }
      }
     }
    
     var extensions={
      dansDefs:false,
      dansSymbol:false,
      tableauArbre:option.tableauArbre,
     }
     if(afficherObjet===true){
      if( option.tableauArbre[0]==='defs'){// || _dssvg.arbre0[i].data.nodeName==='defs'){
       extensions.dansDefs=true;
      }
      if( option.tableauArbre[0]==='symbol'){// || _dssvg.arbre0[i].data.nodeName==='defs'){
       extensions.dansSymbol=true;
      }
      
      
      txt+='<'+_dssvg.arbre0[i].data.nodeName ;
      if(option.hasOwnProperty('sansDataIdArbre') && option.sansDataIdArbre===true){
      }else{
       txt+=' data-idarbre1="'+(_dssvg.arbre0[i].id)+'" data-extensions="'+htm1(JSON.stringify(extensions))+'" ';
      }
      for(var j in _dssvg.arbre0[i].data.attributes){
       if( (option.hasOwnProperty('sansDataIdArbre') && option.sansDataIdArbre===true) && (j==='data-idarbre1' || j=='data-extensions' ) ){
       }else{
        txt+=' '+j+'="'+htm1(_dssvg.arbre0[i].data.attributes[j])+'"'
       }
      }
      txt+='>';

      if(_dssvg.arbre0[i].data.nodeName.toLowerCase()!=='style'){
       var obj=looptree(_dssvg.arbre0[i].id,option);
       nbObjAff+=obj.nbObjAff;
       txt+=obj.txt;
      }
      
      if(_dssvg.arbre0[i].data.nodeName==='text' || _dssvg.arbre0[i].data.nodeName==='tspan' || _dssvg.arbre0[i].data.nodeName==='title' || _dssvg.arbre0[i].data.nodeName==='style'){
       txt+=_dssvg.arbre0[i].data.text;
      }
      txt+='</'+_dssvg.arbre0[i].data.nodeName+'>';
      
     }
    }
    if(option.tableauArbre){
     option.tableauArbre.pop();
    }
   }
  }
  return {txt:txt,nbObjAff:nbObjAff};
 } 
 //========================================================================================================
 function myParseSvg(xml,elt,init){
  let dom = null;
//  let elementId='';
  if(elt===null){
   if (window.DOMParser){
     dom = (new DOMParser()).parseFromString(xml, "image/svg+xml");
   }else if (window.ActiveXObject) {
     dom = new ActiveXObject('Microsoft.XMLDOM');
     dom.async = false;
     if (!dom.loadXML(xml)) throw dom.parseError.reason + " " + dom.parseError.srcText;
   }else{
    throw new Error("cannot parse xml string!");
   }
  }

  //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  function parseNode(xmlNode,  result2 , level , nodeRef , init) {
   if(xmlNode.nodeName == "#text" || xmlNode.nodeName == "#tspan") {
    let v = xmlNode.nodeValue;
    if (v.trim() && result2.length-2>=0){
     result2[result2.length-2].data.text=v.trim();
    }
    result2.pop();
    return;
   }
   if(xmlNode.attributes){
    for (let attribute of xmlNode.attributes){
     if(attribute.nodeName=='data-type' && ( attribute.nodeValue=='toRemove' || attribute.nodeValue=='systeme' ) ){
      result2.pop();
      return;
     }
     if(attribute.nodeValue==parseFloat(attribute.nodeValue)){
      result2[result2.length-1].data.attributes[attribute.nodeName]=parseFloat(attribute.nodeValue);
     }else{
      result2[result2.length-1].data.attributes[attribute.nodeName]=attribute.nodeValue;
     }
    }
   }
   try{
    xmlNode.setAttribute('data-idarbre1',result2.length-1);
    level++;
    var par=result2[result2.length-1].id;
    for (let node of xmlNode.childNodes){
     if('#comment'===node.nodeName){
     }else{
      result2.push({id:result2.length,parentId:par,isOpen:1,data:{label:node.nodeName,level:level,type:(node.nodeName=='#text'?'text':(node.nodeName=='#comment'?'comment':'node')),nodeName:node.nodeName,text:'',attributes:{},nodeRef:nodeRef,sizes:{minx:null,miny:null,maxx:null,maxy:null}}});
      parseNode(node, result2 , level , nodeRef,init);
     }
    }
    level--;
   }catch(e){
    if(xmlNode.nodeName==='#comment'){
    }else{
     console.warn('Erreur de setAttribute sur xmlNode=',xmlNode)
    }
   }
  }
  //= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
  var level=-1;
  
  let result2 = [{id:0,parentId:-1,isOpen:1,data:{label:'svg',level:level,type:'root',nodeName:'@root',text:'',attributes:{},sizes:{minx:null,miny:null,maxx:null,maxy:null}}}];
  level++;
  if(elt===null){
   for(let node of dom.childNodes){
    result2.push({id:result2.length,parentId:0,isOpen:1,data:{label:node.nodeName,level:level,type:(node.nodeName=='#text'?'text':(node.nodeName=='#comment'?'comment':'node')),nodeName:node.nodeName,text:'',attributes:{},nodeRef:null,sizes:{minx:null,miny:null,maxx:null,maxy:null}}});
    parseNode(node,  result2 , level , null , init);
   }
  }else{
   if(elt.attributes){
    for(let attribute of elt.attributes){
     result2[result2.length-1].data.attributes[attribute.nodeName]=attribute.nodeValue;
    }
   }
   
   for(let node of elt.childNodes){
    result2.push({id:result2.length,parentId:0,isOpen:1,data:{label:node.nodeName,level:level,type:(node.nodeName=='#text'?'text':(node.nodeName=='#comment'?'comment':'node')),nodeName:node.nodeName,text:'',attributes:{},nodeRef:node,sizes:{minx:null,miny:null,maxx:null,maxy:null}}});
    parseNode(node,  result2 , level , node , init );
   }
  }
  level--;

  return result2;
 }
 //========================================================================================================
 function getSvgTree(option){
  var ttt=refZnDessin.innerHTML;
  var xmlStr=ttt.replace(/<!--[\s\S]*?-->/g,'');
//  console.log('xmlStr='+xmlStr);
  var cleanXmlStr=cleanXml(xmlStr);
//  console.log('cleanXmlStr='+cleanXmlStr);
  _dssvg.arbre0=[];
  _dssvg.arbre0=myParseSvg(cleanXmlStr,refZnDessin,option.init);
//  console.log('dans getSvgTree, _dssvg.arbre0=', _dssvg.arbre0 );
 }
 //========================================================================================================
 function cleanXml(str){// remove tags like inkscape:labels 
  var t='';
  var inStr=false;
  var goon=false;
  var goon2=true;
  var c='';
  var d='';
  for(var i=0;i<str.length;i++){
   c=str.substr(i,1);
   if(c==':'){
    if(inStr){
     t+=c;
    }else{
     goon2=true;
     for(var j=t.length-1;j>=0 && goon2==true;j--){
      d=t.substr(j,1);
      if(d==' ' || d=='\r' ||  d=='\n' ||  d=='\t'){
       t=t.substr(0,j);
       goon=true;
       for(var k=i;k<str.length && goon ;k++){
        if(str.substr(k,1)=='"'){ // on trouve le début de "
         for(var l=k+1;l<str.length && goon;l++){
          if(str.substr(l,1)=='"'){
           i=l;
           goon=false;
           break;
          }
         }
        }
       }       
       break;
      }else if(d=='<'){
       t=t.substr(0,j);
       goon2=true;
       var inStr2=false;
       for(var k=i;k<str.length && goon2 ;k++){
        var c1=str.substr(k,1);
        if(c1=='"'){
         if(inStr2==false){
          inStr2=true;
         }else{
          inStr2=false;
         }
        }else if(c1=='>'){
         if(inStr2){
         }else{
          i=k;
          goon=false;
          goon2=false;
          break;
         }
        }
       }
        
      }
     }

    }
   }else if(c=='"'){
    if(inStr){
     inStr=false;
    }else{
     inStr=true;
    }
    t+=c;
   }else{
    t+=c;
   }
  }
//  console.log('clean xml t='+t);
  return t;
 } 
 //========================================================================================================
 function getPointsFromSvgPath(str){
     var tabOri=[];
     var tabAbs=[];
     var tabPts=[];
     var lastx=null;
     var lasty=null;
     var minx=+999999.0;
     var maxx=-999999.0;
     var miny=+999999.0;
     var maxy=-999999.0;
     var px=0,py=0;
     var str0 = str.replace(/[0-9]+-/g, function(v){ return v.slice(0, -1) + " -"; }).replace(/\.[0-9]+/g, function(v){return v.match(/\s/g) ? v : v + " ";});
     str0=str0.replace(/ \./g,' 0.');
     str0=str0.replace(/ \-\./g,' -0.');
     str0=str0.replace(/ e/g,'e');
     str0=str0.replace(/a/g,' a').replace(/ a/g,' a');
     str0=str0.replace(/c/g,' c').replace(/ c/g,' c');
     var keys  = str0.match(/[ZzMmLlHhVvZzCcAaQqTtSs]/g);
     var paths = str0.split(/[ZzMmLlHhVvZzCcAaQqTtSs]/g).filter(
      function(v){ 
       if(v.trim().length > 0){
        return true;
       }else{
        return false;
       }
      }
     ).map(
      function(v){return v.trim()}
     );
//     console.log('str0='+str0+'\nkeys='+keys+'\npaths.length='+paths.length+'\nkeys.length='+keys.length+' paths=',paths);
     var x = 0, y = 0;
     for(var i = 0,indicePath=-1; i<keys.length ; i++){
         indicePath++;
         switch(keys[i]){
             case "z": case "Z": 
             indicePath--;
             if(tabOri.length>0){
              tabOri.push([keys[i]])
              tabAbs.push(['Z']);
              // il faut remonter au dernier M
              for(var j=tabPts.length-1;j>=0;j--){
               if(tabPts[j][0]=='M'){
                tabPts.push(['L',tabPts[j][1],tabPts[j][2]]);
                lastx=tabPts[j][1];
                lasty=tabPts[j][2];
                break;
               }
              }
             }
             break;
             case "M": case "m": case "L": case "l": case "C": case "c": case "Q": case "q": case "T": case "t": case "S": case "s":
                 try{
                  var arr = paths[indicePath].split(/[\s,]+/).filter(function(v) { return v.length > 0 }).map(function(v){return parseFloat(v.trim())});
                 }catch(e){
                  console.warn( str , str0 );
                  debugger;
                 }
                 
                 if(keys[i].toLowerCase()=='t'){ // quadratique short
                  var tousLesTableaux=[];
                  if(arr.length==2){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%2===0){
                    for(ll=0;ll<arr.length/2;ll++){
                     tousLesTableaux.push([arr[ll*2+0],arr[ll*2+1]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,str0)//str
                   }
                  }
                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];
                   if(keys[i]=='t'){
                    lastx=lastx+parseFloat(arr[0]);
                    lasty=lasty+parseFloat(arr[1]);
                   }else{
                    lastx=parseFloat(arr[0]);
                    lasty=parseFloat(arr[1]);
                   }
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) ]);
                   
                   tabAbs.push(['T' , lastx , lasty  ]);
                   tabPts.push(['L',lastx,lasty]);

                   
                  }
                  
                 }else if(keys[i].toLowerCase()=='s'){ // comme t mais non quadratique
                 
                  var tousLesTableaux=[];
                  if(arr.length==4){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%4===0){
                    for(ll=0;ll<arr.length/4;ll++){
                     tousLesTableaux.push([arr[ll*4+0],arr[ll*4+1],arr[ll*4+2],arr[ll*4+3]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,str0)//str
                   }
                  }

                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];
                   
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) ]);
                   if(keys[i]=='s'){
                    tabAbs.push(['S' , parseFloat(arr[0])+lastx , parseFloat(arr[1])+lasty , parseFloat(arr[2])+lastx , parseFloat(arr[3])+lasty   ]);
                   }else{
                    tabAbs.push(['S' ,  parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) ]);
                   }
                   if(keys[i]=='s'){
                    lastx=lastx+parseFloat(arr[2]);
                    lasty=lasty+parseFloat(arr[3]);
                   }else{
                    lastx=parseFloat(arr[2]);
                    lasty=parseFloat(arr[3]);
                   }
                   tabPts.push(['L',lastx,lasty]);
                  }
                  
                 }else if(keys[i].toLowerCase()=='q'){
                 
                  var tousLesTableaux=[];
                  if(arr.length==4){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%4===0){
                    for(ll=0;ll<arr.length/4;ll++){
                     tousLesTableaux.push([arr[ll*4+0],arr[ll*4+1],arr[ll*4+2],arr[ll*4+3]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,str0) // str
                   }
                  }
                  
                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];
                   
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) ]);
                   if(keys[i]=='Q'){
                    tabAbs.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) ]);
                   }else{
                    tabAbs.push(['Q' , parseFloat(arr[0])+lastx , parseFloat(arr[1])+lasty , parseFloat(arr[2])+lastx , parseFloat(arr[3])+lasty ]);
                   }
                   if(keys[i]=='q'){
                    lastx=lastx+parseFloat(arr[2]);
                    lasty=lasty+parseFloat(arr[3]);
                   }else{
                    lastx=parseFloat(arr[2]);
                    lasty=parseFloat(arr[3]);
                   }
                   tabPts.push(['L',lastx,lasty]);
                   
                  }
                  
                 }else if(keys[i].toLowerCase()=='c'){
                  
                  var tousLesTableaux=[];
                  if(arr.length==6){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%6===0){
                    for(ll=0;ll<arr.length/6;ll++){
                     tousLesTableaux.push([arr[ll*6+0],arr[ll*6+1],arr[ll*6+2],arr[ll*6+3],arr[ll*6+4],arr[ll*6+5]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,'\n\nstr0='+str0,'\n\nstr='+str,arr.length) // str
                   }
                  }
                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];
                   
                   
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5]) ]);
                   if(keys[i]=='C'){
                    tabAbs.push(['C' , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5]) ]);
                   }else{
                    tabAbs.push(['C' , parseFloat(arr[0])+lastx , parseFloat(arr[1])+lasty , parseFloat(arr[2])+lastx , parseFloat(arr[3])+lasty , parseFloat(arr[4])+lastx , parseFloat(arr[5])+lasty ]);
                   }

                   if(keys[i]=='c'){
                    lastx=lastx+parseFloat(arr[4]);
                    lasty=lasty+parseFloat(arr[5]);
                   }else{
                    lastx=parseFloat(arr[4]);
                    lasty=parseFloat(arr[5]);
                   }
                   tabPts.push(['L',lastx,lasty]);
                   
                  }
                  
                 }else if(keys[i].toLowerCase()=='m'){
                  
                  var tousLesTableaux=[];
                  if(arr.length==2){
                   tousLesTableaux.push(arr);
                  }else{
                   if(arr.length%2===0){
                    for(ll=0;ll<arr.length/2;ll++){
                     tousLesTableaux.push([arr[ll*2+0],arr[ll*2+1]]);
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,'\n\nstr0='+str0,'\n\nstr='+str,arr.length) // str
                   }
                  }
                  if(lastx===null){
                   lastx=0;
                  }
                  if(lasty===null){
                   lasty=0;
                  }
                  //OK M 10,10 20 20 30 30 M 50,60
                  //OK m 10,10 20 20 30 30 M 50,60
                  //m 10,10 20 20 30 30 m 10,0
                  for(var ll=0;ll<tousLesTableaux.length;ll++){
                   arr=tousLesTableaux[ll];

                   if(i===0 && ll==0 && keys[i]=='m'){
                    // si c'est le premier élément du chemin et que c'est un 'm', on considère que la position de départ est absolue
                    tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) ]);
                    tabAbs.push(['M' , parseFloat(arr[0]) , parseFloat(arr[1])]);
                    lastx=parseFloat(arr[0]);
                    lasty=parseFloat(arr[1]);
                   }else{
                    if(ll>=1){ // si il y a plusieurs points, les suivants sont comme un L/l
                     tabOri.push([keys[i]==='m'?'l':'L' , parseFloat(arr[0]) , parseFloat(arr[1]) ]);
                     if(keys[i]==='M'){
                      tabAbs.push(['L' , parseFloat(arr[0])       , parseFloat(arr[1])]);
                      lastx=parseFloat(arr[0]);
                      lasty=parseFloat(arr[1]);
                     }else{
                      tabAbs.push(['L' , lastx+parseFloat(arr[0]) , lasty+parseFloat(arr[1])]);
                      lastx=parseFloat(arr[0])+lastx;
                      lasty=parseFloat(arr[1])+lasty;
                     }
                    }else{
                     tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) ]);
                     if(keys[i]==='M'){
                      tabAbs.push(['M' , parseFloat(arr[0])       , parseFloat(arr[1])]);
                      lastx=parseFloat(arr[0]);
                      lasty=parseFloat(arr[1]);
                     }else{
                      tabAbs.push(['M' , lastx+parseFloat(arr[0]) , lasty+parseFloat(arr[1])]);
                      lastx=parseFloat(arr[0])+lastx;
                      lasty=parseFloat(arr[1])+lasty;
                     }
                    }
                   }
                   tabPts.push(['M',lastx,lasty]);
                   
                  }

                 }else if(keys[i].toLowerCase()=='l'){
                  
                  for(var t = 0, lenPaths = arr.length ; t < lenPaths ; t+=2){
                   x = (keys[i] == "l" ? lastx : 0) + parseFloat(arr[t]);
                   y = (keys[i] == "l" ? lasty : 0) + parseFloat(arr[t+1]);

                   tabOri.push([keys[i] , parseFloat(arr[t]) , parseFloat(arr[t+1]) ]);
                   if(keys[i] == "l"){
                    tabAbs.push(['L' , lastx+parseFloat(arr[t]) , lasty+parseFloat(arr[t+1])]);
                   }else{
                    tabAbs.push(['L' , parseFloat(arr[t]) , parseFloat(arr[t+1])]);
                   }
                   
                   lastx=x;
                   lasty=y;
                   tabPts.push(['L',lastx,lasty]);
                   
                  }
                  
                 }else{
                  console.warn('%cPourquoi ?','color:yellow;background:red;')
                  for(var t = 0, lenPaths = arr.length ; t < lenPaths ; t++){
                   if(t%2 === 0){
                    x = (keys[i] == "l" ? x : 0) + parseFloat(arr[t]);
                    lastx=x;
                   }else{
                    y = (keys[i] == "l" ? y : 0) + parseFloat(arr[t]);
                    lasty=y;
                   }
                   tabPts.push(['L',lastx,lasty]);
                  }
                 }
                 break;
                 
             case "a" : case 'A' :
                  var arr = paths[indicePath].split(/[\s,]+/).filter(function(v) { return v.length > 0 });
                  var tousLesTableaux=[];
                  
//                  console.log('arr=',arr);
                  
                  
                  if( !( arr.length==7 || arr.length%7===0 ) ){
                   // si la taille du tableau n'est pas un multiple de 7
                   var newA=[];
                   var offset=0;
                   for(var n=0;n<arr.length;n++){
                    if(n>0 && (n-3+offset)%6==0){
                     if( (typeof arr[n] === 'string' || arr[n] instanceof String) && arr[n].length===2){
                      newA.push(arr[n].substr(0,1));
                      newA.push(arr[n].substr(1,1));
//                      offset+=1;
                     }else{
                      newA.push(arr[n].substr(0,1));
                      newA.push(arr[n].substr(1,1));
                      newA.push(arr[n].substr(2));
                      offset+=1;
                     }
                    }else{
                     newA.push(arr[n]);
                    }
                   }
//                   console.log('newA=',newA);
                   arr=newA;
                  }
                  if(arr.length==7){
                   tabOri.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5]) , parseFloat(arr[6]) ]);
                   if(keys[i]=='a'){
                    tabAbs.push(['A'     , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5])+lastx , parseFloat(arr[6])+lasty ]);
                    lastx+=parseFloat(arr[5]);
                    lasty+=parseFloat(arr[6]);
                   }else{
                    tabAbs.push([keys[i] , parseFloat(arr[0]) , parseFloat(arr[1]) , parseFloat(arr[2]) , parseFloat(arr[3]) , parseFloat(arr[4]) , parseFloat(arr[5]) , parseFloat(arr[6]) ]);
                    lastx=parseFloat(arr[5]);
                    lasty=parseFloat(arr[6]);
                   }
                   tabPts.push(['L',lastx,lasty]);
                   
                   
                  }else{
                   if(arr.length%7===0){
                    for(ll=0;ll<arr.length/7;ll++){
                     if(keys[i]=='a'){
                      tabOri.push([keys[i] , parseFloat(arr[ll*7+0]) , parseFloat(arr[ll*7+1]) , parseFloat(arr[ll*7+2]) , parseFloat(arr[ll*7+3]) , parseFloat(arr[ll*7+4]) , parseFloat(arr[ll*7+5])       , parseFloat(arr[ll*7+6])       ]);
                      tabAbs.push(['A'     , parseFloat(arr[ll*7+0]) , parseFloat(arr[ll*7+1]) , parseFloat(arr[ll*7+2]) , parseFloat(arr[ll*7+3]) , parseFloat(arr[ll*7+4]) , parseFloat(arr[ll*7+5])+lastx , parseFloat(arr[ll*7+6])+lasty ]);

                      lastx+=parseFloat(arr[ll*7+5]);
                      lasty+=parseFloat(arr[ll*7+6]);
                     }else{
                      tabOri.push([keys[i] , parseFloat(arr[ll*7+0]) , parseFloat(arr[ll*7+1]) , parseFloat(arr[ll*7+2]) , parseFloat(arr[ll*7+3]) , parseFloat(arr[ll*7+4]) , parseFloat(arr[ll*7+5])       , parseFloat(arr[ll*7+6])       ]);
                      tabAbs.push(['A'     , parseFloat(arr[ll*7+0]) , parseFloat(arr[ll*7+1]) , parseFloat(arr[ll*7+2]) , parseFloat(arr[ll*7+3]) , parseFloat(arr[ll*7+4]) , parseFloat(arr[ll*7+5])       , parseFloat(arr[ll*7+6])       ]);

                      lastx=parseFloat(arr[ll*7+5]);
                      lasty=parseFloat(arr[ll*7+6]);
                     }
                     tabPts.push(['L',lastx,lasty]);
                     
                    }
                   }else{
                    console.error('je ne comprends pas ',arr,str0) // str
                   }
                  }
             
                 break;
             case "V":
                 y = parseFloat(paths[indicePath]);
                 tabOri.push(['V' , y ]);
                 tabAbs.push(['V' , y ]);
                 lasty=y;
                 tabPts.push(['L',lastx,lasty]);
                 break;
             case "v":
                 y=lasty+ parseFloat(paths[indicePath]);

                 tabOri.push([keys[i] , parseFloat(paths[indicePath]) ]);
                 tabAbs.push(['V' , y ]);
                 lasty=y;
                 tabPts.push(['L',lastx,lasty]);
                 break;
             case "H":
                 x = parseFloat(paths[indicePath]);
                 tabOri.push(['H' , x ]);
                 tabAbs.push(['H' , x ]);
                 lastx=x;
                 tabPts.push(['L',lastx,lasty]);
                 break;
             case "h":
                 x=lastx+ parseFloat(paths[indicePath]);
                 tabOri.push([keys[i] , parseFloat(paths[indicePath]) ]);
                 tabAbs.push(['H' , x ]);
                 lastx=x;
                 tabPts.push(['L',lastx,lasty]);
                 break;
             default:
                console.error('non prévu "'+keys[i]+'" str0='+str0)
                break;
                
         }
         if(lastx<minx){minx=lastx;}
         if(lastx>maxx){maxx=lastx;}
         if(lasty<miny){miny=lasty;}
         if(lasty>maxy){maxy=lasty;}
     }
//     console.log('tabOri=',tabOri);     console.log('tabAbs=',tabAbs);
     
     return { tabOri:tabOri , tabAbs:tabAbs , tabPts:tabPts, sizes:{minx:minx , maxx:maxx , miny:miny , maxy:maxy} };
 }
 //========================================================================================================
 function closePopup(){
  if('popupCouleurs'===popUpIsDisplayed1){
   majBout();
  }
  if('popupArbo1'==popUpIsDisplayed1){
   dogid('popupValue').innerHTML='Veuillez patienter svp!'
   afficheArbre0({prendreTout:false});
  }
  popupBackground1.style.display='none'; 
  popupContent1.style.display='none'; 
  popUpIsDisplayed1='';
  dogid('popupValue').innerHTML='';
  
 }
 //========================================================================================================
 function resizePopup(param){
  getSizes();

  popupBackground1.style.width=xscreen+'px'; 
  popupBackground1.style.height=yscreen+'px'; 
  popupBackground1.style.top=(document.documentElement.scrollTop) + 'px';
  var bodySize=body.getBoundingClientRect();
  
  popupContent1.style.width=(bodySize.width-2*marginPopup)+'px'; 
  popupContent1.style.height=(yscreen-2*marginPopup)+'px'; 
  popupContent1.style.top=(document.documentElement.scrollTop+marginPopup) + 'px';
  popupContent1.style.left=marginPopup+'px';

  dogid('BtnclosPop').style.right=(marginPopup-5)+'px';
  dogid('BtnclosPop').style.top=(marginPopup-5)+'px';
 }
 //========================================================================================================
 function showPopUp(action){
  resizePopup({from:action});
  popupBackground1.style.display='block'; 
  popupContent1.style.display='block'; 
  popUpIsDisplayed1=action;
 }
 //========================================================================================================
 function arrdi10000(x){
  x=Math.round(x*10000)/10000;
  if(_dssvg.aimanterPixel1!==0){
   x=Math.round((x*_dssvg.aimanterPixel1))/_dssvg.aimanterPixel1;
  }
  return x;
 }
 //========================================================================================================
 function getSizes(){
  xscreen = window.innerWidth || document.documentElement.clientWidth || body.clientWidth,
  yscreen = window.innerHeight|| document.documentElement.clientHeight|| body.clientHeight;
//  console.log( xscreen , yscreen )
 } 
 //========================================================================================================
 init(global_version_number);
 //========================================================================================================
 return {
  chargerUrlSvg       : function(a){ return _chargerUrlSvg(a);},
  selColor1           : function(a){ return _selColor1(a);},
  importerSvgEtFermer : function(){importerSvgEtFermer();},
  chargerTest         : function(i){_chargerTest(i);},
  deleteFunction1     : function(i){_deleteFunction1(i);},
  foldFunction1       : function(i){_foldFunction1(i);},
  editFunction1       : function(i){_editFunction1(i);},
  getVariableName     : function(){ return global_variable_name;},
  nop                 : function(){ return null;},
 }
}

var maVariable01=new myObj1({varname:'maVariable01',version:'0'});
