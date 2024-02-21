let Container = [];



const Section = document.querySelector("section");


const Connection = () =>{
    const XMLS = new XMLHttpRequest();

    XMLS.open("GET","../xml/Shoes.xml",true);
    
    XMLS.onreadystatechange = function(){
    
    if(this.readyState === 4 && this.status === 200){
        const Display = this.responseXML;
    
        const Items = Display.getElementsByTagName("items");
    
        for(var i = 0; i<Items.length;i++){
            const createImg = document.createElement("img");
      const createDiv = document.createElement("div")
    
            const name = Items[i].getElementsByTagName("name")[0].textContent;
            const price = Items[i].getElementsByTagName("price")[0].textContent;
            const image = Items[i].getElementsByTagName("image")[0].textContent;
            const category = Items[i].getElementsByTagName("category")[0].textContent;
    
            createImg.setAttribute("src",`${image}`);
            createImg.setAttribute("class","imgs");
            createDiv.append(createImg)
            createDiv.setAttribute("class","Display")
    Section.appendChild(createDiv)
           
    Container.push({name:name,price:price,image:image,category:category})
          Sorting(image,name,price,category,Items)
        }
    
    
    }
    
    }
    
    XMLS.send()

}



///////Searchhhhh Components///////////////////////////

const Search = document.querySelector("form");

Search.addEventListener("keyup", (e) => {
    e.preventDefault();
    const settings = e.target.value.toLowerCase();

    document.querySelectorAll(".Display").forEach(element => {
        element.style.display = 'none';
    });

   
    Container.forEach((item) => {
        if (item.name.toLowerCase().startsWith(settings)) {
            document.querySelectorAll(`.Display img[src="${item.image}"]`).forEach(img => {
                img.parentElement.style.display = 'block'; 
            });
        }
    });


    if (settings === "") {
        document.querySelectorAll(".Display").forEach(element => {
            element.style.display = 'block';
        });
    }
});



///Filters Components/////////////////////////
//For Categorys
document.querySelector("#Category").addEventListener("change",(e)=>{

    document.querySelectorAll(".Display").forEach(element => {
        element.style.display = 'none';
    });
    //Fetch The Data HAHA
   Container.forEach(elements =>{
      
if(e.target.value === "mensBasketball"){

  if(elements.category === "mensBasketball"){
    document.querySelectorAll(`.Display img[src="${elements.image}"]`).forEach(img => {
        img.parentElement.style.display = 'block'; 
    });
  }

}else if(e.target.value === "mensRunner"){

if(elements.category === "mensRunner"){
    document.querySelectorAll(`.Display img[src="${elements.image}"]`).forEach(img => {
        img.parentElement.style.display = 'block'; 
    });
     
}

}else if(e.target.value === "all"){
    document.querySelectorAll(".Display").forEach(element => {
        element.style.display = 'block';
    });

}
   })
})



/////////////////////////////////////////////For Sorting/////////////////////////
const Sorting = (image,name,price,category,Items) =>{
    document.querySelector(".option #Sorting").addEventListener("change",(e)=>{


        if(e.target.value === "All"){
            
            while(Section.firstChild) {
                Section.removeChild(Section.firstChild);
            }
           
            for(var i = 0; i<Items.length;i++){
                const createImg = document.createElement("img");
          const createDiv = document.createElement("div")
        
                const name = Items[i].getElementsByTagName("name")[0].textContent;
                const price = Items[i].getElementsByTagName("price")[0].textContent;
                const image = Items[i].getElementsByTagName("image")[0].textContent;
                const category = Items[i].getElementsByTagName("category")[0].textContent;
        
                createImg.setAttribute("src",`${image}`);
                createImg.setAttribute("class","imgs");
                createDiv.append(createImg)
                createDiv.setAttribute("class","Display")
        Section.appendChild(createDiv)
            }
      
        }else if(e.target.value === "Assending"){ 
        
              Container.sort((a,b)=> {
                return  parseInt(a.price) - parseInt(b.price)
              })
        
            while(Section.firstChild) {
                Section.removeChild(Section.firstChild);
            }
           
            Container.forEach(item => {
                const createDiv = document.createElement("div");
                const createImg = document.createElement("img");
                createImg.setAttribute("src", `${item.image}`);
                createImg.setAttribute("class", "imgs");
                createDiv.appendChild(createImg);
                createDiv.setAttribute("class", "Display");
                Section.appendChild(createDiv);
            });
        
            
        }else if(e.target.value === "Dessending"){
        
               
              Container.sort((a,b)=> {
                return  parseInt(b.price) - parseInt(a.price)
              })
        
            while(Section.firstChild) {
                Section.removeChild(Section.firstChild);
            }
        
            Container.forEach(item => {
                const createDiv = document.createElement("div");
                const createImg = document.createElement("img");
                createImg.setAttribute("src", `${item.image}`);
                createImg.setAttribute("class", "imgs");
                createDiv.appendChild(createImg);
                createDiv.setAttribute("class", "Display");
                Section.appendChild(createDiv);
            });
        
        }
        
        })
        
}


console.log(Container)

//Call the Function for Fetching
Connection()




