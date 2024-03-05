
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
    //-------------------------------------------------------------------------------------------------------------------||
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
              let rimLabel = document.createElement("li");
              let liquorLabel = document.createElement("li");
              let liquorLabel2 = document.createElement("li");
              let liqueurLabel = document.createElement("li");
              let mixersLabel = document.createElement("li");
              let garnishLabel = document.createElement("li");

              // Recipes 
              //----------------------------------------------------------------||
              let glass = document.createElement("li");
              let rim = document.createElement("li");
              let liquor = document.createElement("li");
              let liquor2 = document.createElement("li");
              let liqueur = document.createElement("li");
              let mixers = document.createElement("li");
              let garnish = document.createElement("li");

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
              mixers.innerHTML = x.mixers;
              garnishLabel.innerHTML = "Garnish: ";
              garnish.innerHTML = x.garnish;
              image.setAttribute("src", x.photo);


              // assembles recipes in html
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
              }
              
              recipeLabels.append(mixersLabel);
              recipeText.append(mixers);
              recipeLabels.append(garnishLabel);
              recipeText.append(garnish);
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