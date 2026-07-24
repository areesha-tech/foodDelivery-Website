let cart=document.querySelector(".cart");
let container=document.getElementById("container")
let cartSetup=document.querySelector(".cartsetup");
let box=document.querySelector(".box");
 let items=JSON.parse(localStorage.getItem('items'))||[];
 let review=document.querySelector(".slider");
 let badge=document.querySelector(".badge");
 let signIn=document.querySelector(".login");
 let modal=document.querySelector(".modal");
 let submit=document.querySelector(".submit");
 let form=document.querySelector("form");
 let feild=document.querySelector(".feild");
 let input=document.querySelector(".food-search");
 let btn=document.getElementById("btn");
 let filterbtn=document.querySelector(".filter");
 let conclude=0;
 let allMenu;

 //scroll reveal 
ScrollReveal().reveal("#services",{
    reset:true,
    origin:'left',
    distance:'100px',
    opacity:0,
});
ScrollReveal().reveal(".subscription",{
    reset:true,
    origin:'bottom',
    opacity:0,
});
ScrollReveal().reveal("#reviews",{
    reset:true,
     origin:'top',
    distance:'200px'
});
ScrollReveal().reveal(".mobile-app",{
    reset:true,
     origin:'top',
    distance:'200px',
    rotate:{x:0,y:40,z:0}
});
render();
 
function render(){
     if(items.length===0){
        box.innerHTML=`<h2>Your Cave</h2>
                      <h3 style="color:grey">No Orders Yet</h3>
                <h2 class="total">total</h2>
                <div class="btn">
                <button class="close">close</button>
                 <button class="checkout">checkout</button></div>` 
                 return;              
    }
    let listHTML="";
    items.forEach(value=> {
        listHTML+=` <div class="parent">
        <img src="${value.img}">
        <h3>${value.title}</h3>
        <h3>${value.rate * value.quantity}</h3>
        <div class="quantity">
          <div class="minus"><i class="fa-solid fa-circle-minus"></i></div>
          <div class="num">${value.quantity}</div>
          <div class="add"><i class="fa-solid fa-plus"></i></div>
        </div>
      </div>`
       badge.innerText=`${items.length}`
    })
     let sum= items.reduce((accumulator,currentValue)=>{
        return accumulator+currentValue.rate*currentValue.quantity 
        
     },0)
        conclude=sum;
    box.innerHTML=`<h2>Your Cave</h2>
                <div class="list">${listHTML}</div>
                <div class="totalSection">
                <div class="total"><h2>total:<span class="value">${conclude}</span></h2></div></div>
                <div class="btn">
                <button class="close">close</button>
                 <button class="checkout">checkout</button></div>`   
               
   
}
//quantity
 box.addEventListener("click",(e)=>{
        if(e.target.className==="close"){
               cartSetup.classList.toggle("toggle")
        }
        else if(e.target.closest(".add")){
            let target=e.target.closest(".parent");
        let index=[...target.parentElement.children].indexOf(target)
         let i=items[index].quantity++;
         save()
         render()
        }
        else if(e.target.closest(".minus")){
              let target=e.target.closest(".parent");
        let index=[...target.parentElement.children].indexOf(target)
          if(items[index].quantity>1){
            let d=items[index].quantity--;
            save()
            render()
          }
          else {
            
              target.style.transform="translateX(100px)";
            target.style.transition = "transform 0.3s ease, opacity 0.3s ease";
            target.style.opacity="0";
            setTimeout(()=>{
 items.splice(index,1)
            save()
            render();
            },300)
           
          
        }
    }
    })
    console.log(review)
    //cart opening
cart.addEventListener("click",(e)=>{
    cartSetup.classList.toggle("toggle");
    
})
//add to cart
function addCart(target){
    target.addEventListener("click",(e)=>{
       let parent= e.target.parentElement;
       let img=parent.children[0].src;
       let rate=parent.children[2].innerText;
       let title=parent.children[1].innerText;
      
       let obj={
        title:title,
        rate:rate,
        img:img,
        quantity:1
        
       };
    let exist=items.find(value=>value.title=== obj.title);
    if(!exist){
        items.push(obj)
        console.log(items)
    }
    save();
    render()
    })
    
}
//menu
const grid=document.querySelector(".grid");
fetchMenu();
function fetchMenu(){
fetch("menu.json").then(response=>response.json().then(result=>{
      allMenu=result.menu;
       renderMenu(allMenu)
       filterbtnRender(allMenu)
    result.menu.forEach(element => {
        let name=element.name;
        let price=element.price;
        let image=element.img;
        const menu=document.createElement("div");
        menu.className="items";
        menu.innerHTML=`
                    <img src=${image}>
                    <h2>${name}</h2>
                    <p>${price}</p>
                    <button class="order">Add to cart</button>`
                    grid.appendChild(menu); 
                    let order=menu.querySelector(".order")
                    addCart(order) ; 
                     //input search
                           
    });
     
    ScrollReveal().reveal("#menu",{
    reset:true,
    origin:'top',
    distaance:'200px',
});

}))
}

//filter rendering
 function renderMenu(menu){
          btn.addEventListener("click",()=>{
              grid.innerHTML="";
     let newInput=input.value.toLowerCase();
  newMenu= menu.filter(items=>
    items.name.toLowerCase().includes(newInput)||items.category.toLowerCase()===newInput);
newMenu.forEach(it => {
        let foodName=it.name;
        let foodPrice=it.price;
        let foodImage=it.img;
        const selectedMenu=document.createElement("div");
       selectedMenu.className="items";
       selectedMenu.innerHTML=`
                    <img src=${foodImage}>
                    <h2>${foodName}</h2>
                    <p>${foodPrice}</p>
                    <button class="order">Add to cart</button>`
                     selectedMenu.style.height="30%"; 
                     grid.appendChild(selectedMenu); 
                     
                 
 })   
})
     }
function filterbtnRender(menu){
filterbtn.addEventListener("click",(e)=>{
      grid.innerHTML="";
    if(e.target.classList.contains("item")){
     let target=e.target.innerText.toLowerCase();
       if(target==="all"){
        grid.innerHTML="";
        fetchMenu()
       }
 newMenu= menu.filter(items=>items.category.toLowerCase()===target);
 newMenu.forEach(it => {
        let foodName=it.name;
        let foodPrice=it.price;
        let foodImage=it.img;
        const selectedMenu=document.createElement("div");
       selectedMenu.className="items";
       selectedMenu.innerHTML=`
                    <img src=${foodImage}>
                    <h2>${foodName}</h2>
                    <p>${foodPrice}</p>
                    <button class="order">Add to cart</button>`
                     selectedMenu.style.height="30%"; 
                     grid.appendChild(selectedMenu);  
 })
}
})
}
console.log(document.querySelector("#reviews"));
console.log(document.querySelector(".subscription"));
console.log(document.querySelector(".mobile-app"));
//swiper initialization
const swiper=new Swiper(".reviewBox",{
    slidesPerView:1,
    loop:false,
    navigation:false,
    pagination:{
        el:".swiper-pagination",
        clickable:true,
        
    },
     autoplay: {
        delay: 3000,
        disableOnInteraction: false
    }
});
//reviews
fetch("reviews.json").then(response=> response.json()).then(result=>{
    result.forEach(item=>{
      
review.innerHTML+=`<div class="reviewcard swiper-slide">
    <h4>${item.name}</h4><p>${item.comment}</p><p>${item.rating}</p></div>
      `;
     
 
    })
    swiper.update();
});
//local storage
function save(){
localStorage.setItem("items",JSON.stringify(items))
//localStorage.clear()
}
//signIn
signIn.addEventListener("click",()=>{
        modal.classList.add("modal-active");
},{once:true})
        let close=modal.querySelector(".remove");
        close.addEventListener("click",()=>{
             modal.classList.remove("modal-active")
        })
    form.addEventListener('submit',action,{once:true})
      function action(e){
        let inputs=form.querySelectorAll("input");
        e.preventDefault();
      inputs.forEach(input => {
  input.value = "";
});
 signIn.innerHTML=`<img src="images/user.svg" alt="user">`;
   modal.classList.remove("modal-active");
   signIn.style.width="45px";
   signIn.style.height="45px";
      }

   //subscribe btn
   feild.addEventListener("submit",(e)=>{
    e.preventDefault();
   let input=document.querySelector(".email");
        input.value="";
    })
    //checkout btn'
    box.addEventListener("click",(e)=>{
        let total=box.querySelector(".totalSection");
        let value=box.querySelector(".value").innerText;
        //gst
        let GST=0;
        if(value>=2000&&value<=3000){
            GST=(5*value/100);
        }
        else if(value>=3000 && value<=6000){
            GST=(8*value/100);
        }
         else if(value>=6000 && value<=10000){
            GST=(10*value/100);
        }
         else{
            GST=(12*value/100);
        }
        //total
        let final=0;
        final=parseInt(conclude+GST);
        if(e.target.className==="checkout"){
            let btn=e.target;
              if(items.length===0){
            btn.disabled=true;
            return;
        }
            total.innerHTML=` <div class="totalSection">
                <div class="whole">Sub-total:<span class="value">${conclude}</span></div><div class="gst">GST:<span>${GST}</span></div><div class="final">Total:<span>${final}</span></div></div>`;
                 total.classList.add("totalStyle");
            
        }
       
    
    })
  
