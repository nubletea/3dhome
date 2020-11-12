///**** elementlist ****///
const GNV = document.querySelector('.gnv');
const GNV_LI = document.querySelectorAll('.gnv li');
const GNV_LI_A = document.querySelectorAll('.gnv li a');
const GNVBAR = document.querySelector('.gnvbar');
const CAROUSEL = document.querySelector('.carousel');
const PANEL = document.querySelectorAll('.panel');
///**** click ****////
const addEventListener = (element_list, fn) => {
    for(let i=0;i<element_list.length;i++){
        element_list[i].onclick = fn;
    }
}
///**** nav ****////
const nav = {
    getwidth:0,
    arr:[],
    for_list:(elmen)=>{
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
        nav.for_list(GNV_LI);
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
    gnv();
});
///**** arrow ****///
const arrows={
    total:0
}
const arrow = (arrowfn) => {
    CAROUSEL.style.transition='1s';
    if(Math.abs(arrows.total)>90*(PANEL.length-2)){
        arrows.total+=arrowfn;
        CAROUSEL.style.transform="rotateY("+arrows.total+"deg)";
        setTimeout(()=>{
            CAROUSEL.style.transition='none';
            arrows.total=0;
            CAROUSEL.style.transform="rotateY("+arrows.total+"deg)";
        },1000);
    }else{
        arrows.total+=arrowfn;
        CAROUSEL.style.transform="rotateY("+arrows.total+"deg)";
    }
    console.log(arrows.total);
}
