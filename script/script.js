///**** elementlist ****///
const BOX = document.querySelector('.box');
const GNV = document.querySelector('.gnv');
const GNV_LI = document.querySelectorAll('.gnv li');
const GNV_LI_A = document.querySelectorAll('.gnv li a');
const GNVBAR = document.querySelector('.gnvbar');
const CAROUSEL = document.querySelector('.carousel');
const PANEL = document.querySelectorAll('.panel');
///**** click ****////
const addEventListener = (element_list) => {
    for(let i=0;i<element_list.length;i++){
        element_list[i].addEventListener("click",(e) => {
            e.preventDefault();
            CAROUSEL.style.transition='1s';
            arrows.total=360-i*90;
            CAROUSEL.style.transform="rotateY("+arrows.total+"deg)";
        });
    }
}
///**** nav ****////
const nav = {
    getwidth:0,
    arr:[],
    for_gnv_arr:(elmen)=>{
        nav.arr=[];
        for(let i=0;i<elmen.length;i++){
            nav.arr.push(elmen[i]);
        }
    }
}
const gnv = () => {
    for(let i=0;i<GNV_LI.length;i++){
    GNV_LI_A[i].onmouseover = () => {
        let A_width = GNV_LI_A[i].offsetWidth;
        let GNV_index= nav.arr.indexOf(GNV_LI[i]);
        GNVBAR.style.display='block';
        nav.for_gnv_arr(GNV_LI);
        nav.getwidth=0;
        for(let j=0;j<GNV_index;j++){
            let LI_width = GNV_LI[j].getBoundingClientRect().width;
            nav.getwidth+=LI_width;
        }
        GNVBAR.style.width=A_width+'px';
        GNVBAR.style.left=nav.getwidth+'px';
    }
    }
    GNV.onmouseleave=function(){
        GNVBAR.style.display='none';
    }
}
///**** 3d panel ****///
const panel={
    translateZ:(element) => {
        for(let i=0;i<element.length;i++){
            PANEL[i].style.transform="rotateY("+i*90+"deg) translateZ("+BOX.getBoundingClientRect().width/2+"px)";
        }
    }
}
///**** load ****///
window.addEventListener("DOMContentLoaded",(e) => {
    document.querySelector('.arrow').addEventListener('click',(e)=>{
        switch (e.target.innerText){
            case 'keyboard_arrow_left':
                arrow(90);
                break;
            case 'keyboard_arrow_right':
                arrow(-90);
                break;
            default:
                new Error("error");
                break;
        }
    });
    panel.translateZ(PANEL);
    addEventListener(GNV_LI_A);
    gnv();
});
///**** arrow ****///
const arrows={
    total:360,
    is:true
}
const arrow = (arrowfn) => {
    if(arrows.is===true){
        arrows.is=false;
        CAROUSEL.style.transition='1s';
        if(arrows.total>(90*PANEL.length-1)){
            arrow_callback(360,arrowfn);
        }else if(arrows.total<=0){
            arrow_callback(-360,arrowfn);
        }else{
            arrows.total=arrows.total+arrowfn;
            CAROUSEL.style.transform="rotateY("+arrows.total+"deg)";
        }
    }else{
        return;
    }
    setTimeout(() => {
        arrows.is=true;
    },1000);
}
const arrow_callback= (value,arrowfn) => {
    arrows.total=arrows.total+arrowfn;
    CAROUSEL.style.transform="rotateY("+arrows.total+"deg)";
    setTimeout(()=>{
        CAROUSEL.style.transition='none';
        arrows.total=arrows.total+value;
        CAROUSEL.style.transform="rotateY("+arrows.total+"deg)";
    },1000);
}