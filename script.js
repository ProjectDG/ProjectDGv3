// if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
//   console.log('Running in Node.js environment');
// } else {
//   console.log('Not running in Node.js environment');
// }

$(document).ready(function(){

    


fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Use the parsed JSON data

    // access to divs
    //--------------------------------------------------------------------------------------------------------------------||
     const photoDiv = document.getElementById("photoDiv");
     const recipeLabels = document.getElementById("recipeLabels");
     const recipeText = document.getElementById("recipeText");
     let title = document.getElementById("title");

     // loops through json file recipes 
     //-------------------------------------------------------------------------------------------------------------------||
     data.map(x => {
        // console.log(x[0])

        // accesses button div
        let btnDiv = document.getElementById("btnDiv");

        // creates drink type buttons
        let drinkTypeButtons = document.createElement('button');
        drinkTypeButtons.setAttribute("name", x.type);
        drinkTypeButtons.setAttribute("class", "all-buttons");
        drinkTypeButtons.setAttribute("value", x.name);
        drinkTypeButtons.innerHTML = x.name;

        if(x.type === "menuDrinks"){
          drinkTypeButtons.classList.add("drink-section-buttons")
        }else{
          drinkTypeButtons.classList.add("drink-recipe-buttons")
        };
    
        // appends buttons to button div
        btnDiv.appendChild(drinkTypeButtons);
    })


    


    // Initialization
    //-------------------------------------------------------------------------------------------------------------------||
    $('[name="menuDrinks"]').show();
    




    // button click function
    //-------------------------------------------------------------------------------------------------------------------||
    $(".all-buttons").click(function(){
        $("#photoDiv").empty();
        
        
        data.map(x => {
          
          if(x.class === "Navigation Button"){
            $(".drinkSectionButtons").hide();
            $("#btnDiv").show();
            $("#backButton").show();
            
            if(this.value === "Margaritas"){
              title.innerHTML = this.value;
              $('[name="Margarita"]').show();
              $(".drink-section-buttons").hide();
            }
            
            if(this.value === "Specialty Drinks"){
              $('[name="Specialty Drinks"]').show();
              $(".drink-section-buttons").hide();
              
            }

          }

          if(x.class === "Recipe Button"){
            $("#btnDiv").hide();
            $(".drink-recipe-buttons").hide();
            $("#backButton").hide();



            if(x.name === this.value){
              $("#recipeText").empty();
              $("#recipeLabels").empty();
              $("#recipeDiv").css("display", "flex")
              $("#photoDiv").show();

              // Recipe Labels 
              //----------------------------------------------------------------||
              let image = document.createElement("img");

              let glassLabel = document.createElement("li");
              glassLabel.setAttribute("class", "labels");

              let rimLabel = document.createElement("li");
              rimLabel.setAttribute("class", "labels");

              let liquorLabel = document.createElement("li");
              liquorLabel.setAttribute("class", "labels");

              let liquorLabel2 = document.createElement("li");
              liquorLabel2.setAttribute("class", "labels");

              let liqueurLabel = document.createElement("li");
              liqueurLabel.setAttribute("class", "labels");

              let mixersLabel = document.createElement("li");
              mixersLabel.setAttribute("class", "labels");

              let mixersLabel2 = document.createElement("li");
              mixersLabel2.setAttribute("class", "labels");

              let garnishLabel = document.createElement("li");
              garnishLabel.setAttribute("class", "labels");

              let garnishLabel2 = document.createElement("li");
              garnishLabel2.setAttribute("class", "labels");

              // Recipes 
              //----------------------------------------------------------------||
              let glass = document.createElement("li");
              let rim = document.createElement("li");
              let liquor = document.createElement("li");
              let liquor2 = document.createElement("li");
              let liqueur = document.createElement("li");
              let mixers = document.createElement("li");
              let mixers2 = document.createElement("li");
              let garnish = document.createElement("li");
              let garnish2 = document.createElement("li");

              // assigns recipes to labels
              //----------------------------------------------------------------||
              title.innerHTML = x.name;
              glassLabel.innerHTML = "Glass: ";
              glass.innerHTML = x.glass;
              rimLabel.innerHTML = "Rim: ";
              rim.innerHTML = x.rim;
              liquorLabel.innerHTML = "Liquor: ";
              liquor.innerHTML = x.liquor[0];
              liquor2.innerHTML = x.liquor[1];
              liqueurLabel.innerHTML = "Liqueur: ";
              liqueur.innerHTML = x.liqueur;
              mixersLabel.innerHTML = "Mixers: ";
              mixers.innerHTML = x.mixers[0];
              mixers2.innerHTML = x.mixers[1];
              garnishLabel.innerHTML = "Garnish: ";
              garnish.innerHTML = x.garnish[0];
              garnish2.innerHTML = x.garnish[1];
              image.setAttribute("src", x.photo);


              // assembles recipes in html
              //----------------------------------------------------------------||

              // if(x.name === "House Margarita"){
              //   $(".labels").css("margin", "20vh")
              // }
              photoDiv.append(image);
              recipeLabels.append(glassLabel);
              recipeText.append(glass);
              recipeLabels.append(rimLabel);
              recipeText.append(rim);
              recipeLabels.append(liquorLabel);
              recipeText.append(liquor);
              if(x.liquor[1] !== undefined){
                  liquorLabel2.setAttribute("class", "additionalIngredientsBlank")
                  recipeLabels.append(liquorLabel2)
                  liquor2.setAttribute("class", "additionalIngredients")
                  recipeText.append(liquor2);
              };
              if(x.liqueur !== null){
                  recipeLabels.append(liqueurLabel);
                  recipeText.append(liqueur)
              };
              
              
              recipeLabels.append(mixersLabel);
              recipeText.append(mixers);
              if(x.mixers[1] !== undefined){
                mixersLabel2.setAttribute("class", "additionalIngredientsBlank")
                recipeLabels.append(mixersLabel2)
                mixers2.setAttribute("class", "additionalIngredients")
                recipeText.append(mixers2);
              };
              recipeLabels.append(garnishLabel);
              recipeText.append(garnish);
              if(x.garnish[1] !== undefined){
                garnishLabel2.setAttribute("class", "additionalIngredientsBlank")
                recipeLabels.append(garnishLabel2)
                garnish2.setAttribute("class", "additionalIngredients")
                recipeText.append(garnish2);
              };
            }


          }




            
            
        })
    });

    // back button click function
    //-------------------------------------------------------------------------------------------------------------------||
    $("#backButton").click(function(){
      $(".all-buttons").hide();
      $("#backButton").hide();
      $("#photoDiv").hide();
      $("#recipeText").empty();
      $("#recipeLabels").empty();
      $("#recipeDiv").css("display", "none");
      $("#btnDiv").show();
      $(".drink-section-buttons").show();
      title.innerText = "Rocco's Drink Recipes"
    });



  })

  


  .catch(error => {
    console.error('There was a problem fetching the data:', error);
  });




  }); // End of jQuery