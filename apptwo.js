/**
 * Awesome Recipies.
 *
 */

// connect to firestore
//const dbTwo = firebase.firestore();

// get reference to #recipies
const recipiesTwoEl = document.querySelector("#recipiestwo");
const recipiesThreeEl = document.querySelector("#recipiesthree");

//const newRecipieForm = document.querySelector('#new-recipie');
//const newRecipieDescriptionEl = document.querySelector('#recepie_description');
//const newRecipieIngredientsEl= document.querySelector('#recepie_ingredients');

//Creating a recipe

class AllRecipiesTwo {
  constructor() {
    //this.id +=id
    this.list = [];
  }

  identifyAndDeletRecipieTwo = (Id) => {
    //	this.list.forEach(recipie=>{if(recipie.id == Id){recipies.list.pop(recipie)}})

    db.collection("papa")
      .doc(Id)
      .delete()
      .then(this.getRecipiesTwo())
      .catch((err) => {
        console.error("Error when retrieving recipies", err);
      });
  };

  addToDbTwo = (recipie) =>
    db
      .collection("papa")
      .add({
        description: recipie.description,
        ingredients: recipie.ingredients,
        title: recipie.title,
        preparacion: recipie.preparacion,
      })
      .then((res) => {
        /**
         * @todo
         *
         * 1. clear input field(s) ✅
         * 2. reload recipies from database ✅
         * 3. show message that recipie was added successfully
         */
        this.getRecipiesTwo();
      })
      .catch((err) => {
        console.error("Error when adding new recipie", err);
      });

  getRecipiesTwo = () => {
    document.querySelector("#recipiestwo").innerHTML = "";

    db.collection("papa")
      .get()
      .then((snapshot) => {
        let i = snapshot.docs.length + 10;
        f = i;
        // loop over the documents in the snapshot
        snapshot.docs.forEach((doc) => {
          const recipie_data = doc.data();
          recipiesTwoEl.innerHTML += `
					 <li data-id="${doc.id}">
						 ${recipie_data.title} 
						 <button class="btn btn-danger btn-sm">Delete</button>
						 <p id="${doc.id}">${recipie_data.description}</p>
             <p id="${doc.id}-ingredientes">${recipie_data.ingredients}</p>
						 <a id="prep${i}" href="#">Ver preparación
						</a> 
  							<div class="card" id="preparacion${i}" hidden>
								<h5 class="card-title">Preparación</h5>
								<a href="#" id="borrar${i}">Pincha para borrar</a>
								<p class="card-text">${recipie_data.preparacion}</p>
							</div>
						
					 </li>
				 `;
          i = i - 1;
        });
      })
      .catch((err) => {
        console.log("Error when retrieving recipies", err);
      });
  };
}

recipiesTwo = new AllRecipiesTwo();

class RecipieTwo {
  constructor(description, ingredients, title, preparacion, id) {
    (this.description = description),
      (this.ingredients = ingredients),
      (this.title = title);
    this.id = id;
    this.preparacion = preparacion;
  }
}

// Event to felete recipe

recipiesTwoEl.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  // ok, we know the click happend on a button in our recipie list
  // now, find out which recipie
  const listItemEl = e.target.parentElement;
  const dataId = listItemEl.getAttribute("data-id");
  e.target.parentElement.remove();
  recipiesTwo.identifyAndDeletRecipieTwo(dataId);
});

const autoresEl = document.querySelector("#autores");

autoresEl.addEventListener("click", (e) => {
  if (e.target.id == "lela") {
    recipiesEl.toggleAttribute("hidden");
  } else if (e.target.id == "papa") {
    recipiesTwoEl.toggleAttribute("hidden");
  } else if (e.target.id == "suecas") {
    recipiesThreeEl.toggleAttribute("hidden");
  }
});
