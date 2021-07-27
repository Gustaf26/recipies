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

  // identifyAndDeletRecipieTwo = (Id) => {
  //   //	this.list.forEach(recipie=>{if(recipie.id == Id){recipies.list.pop(recipie)}})

  //   db.collection("papa")
  //     .doc(Id)
  //     .delete()
  //     .then(this.getRecipiesTwo())
  //     .catch((err) => {
  //       console.error("Error when retrieving recipies", err);
  //     });
  // };

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

  submitRecipieTwo = (e, id) => {
    e.preventDefault();
    console.log("Submitting recipie" + id);

    // Add a new document in collection "cities"
    db.collection("papa")
      .doc(id)
      .set({
        description: document.getElementById(`recipie_description-two-${id}`)
          .value,
        ingredients: document.getElementById(`recipie_ingredients-two-${id}`)
          .value,
        preparacion: document.getElementById(`recipie_preparacion-two-${id}`)
          .value,
        title: document.getElementById(`recipie_title-two-${id}`).value,
      })
      .then(() => {
        console.log("Document successfully written!");
        this.getRecipiesTwo();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  editRecipieTwo = (e, recipie) => {
    e.preventDefault();
    console.log(recipie.id);

    let recipieData = recipie.data();

    document
      .getElementById(`non-editing-two-${recipie.id}`)
      .toggleAttribute("hidden");
    document
      .getElementById(`recipie-edition-two-${recipie.id}`)
      .toggleAttribute("hidden");

    document.getElementById(`recipie_title-two-${recipie.id}`).value =
      recipieData.title;
    document.getElementById(`recipie_description-two-${recipie.id}`).value =
      recipieData.description;
    document.getElementById(`recipie_ingredients-two-${recipie.id}`).value =
      recipieData.ingredients;
    document.getElementById(`recipie_preparacion-two-${recipie.id}`).value =
      recipieData.preparacion;
  };

  deleteRecipieTwo = (e, id) => {
    e.preventDefault();
    console.log(id);
    return;
    db.collection("Lela")
      .doc(id)
      .delete()
      .then(this.getRecipies())
      .catch((err) => {
        console.error("Error when retrieving recipies", err);
      });
  };

  getRecipiesTwo = () => {
    document.querySelector("#recipiestwo").innerHTML = "";

    let recipies;
    db.collection("papa")
      .get()
      .then((snapshot) => {
        let i = snapshot.docs.length + 10;
        f = i;
        recipies = snapshot.docs;
        // loop over the documents in the snapshot
        snapshot.docs.forEach((doc) => {
          const recipie_data = doc.data();
          recipiesTwoEl.innerHTML += `
					 <li data-id="${doc.id}">
						 ${recipie_data.title} 
              <button id="delete-recipie-two-${doc.id}" class="btn btn-danger btn-sm">Delete</button>
              <button id="edit-recipie-two-${doc.id}" class="btn btn-primary btn-sm">Edit</button>
              <div id="non-editing-two-${doc.id}">
                <p id="${doc.id}">${recipie_data.description}</p>
                <p id="${doc.id}-ingredientes">Ingredientes: ${recipie_data.ingredients}</p>
                <a id="prep${i}" href="#">Ver preparación
                </a> 
                <div class="card" id="preparacion${i}" hidden>
                <h5 class="card-title">Preparación</h5>
                <a href="#" id="borrar${i}">Pincha para ocultar</a>
                <p class="card-text">${recipie_data.preparacion}</p>
                </div>
              </div>
						  <form id="recipie-edition-two-${doc.id}" hidden>
                <div class="form-group mt-3">
                  <div class="tituloautor">
                    <label class="tituloautoritem mr-4" for="recipie_title"
                      >Plato</label>
                    <input
                      class="tituloautoritem mr-4"
                      type="text"
                      class="form-control w-25"
                      id="recipie_title-two-${doc.id}"
                      placeholder="Escribe un título"
                      required="required"
                    />
                  </div>
                  <label for="recipie_description-two" class="my-3">Descripcion breve</label>
                  <textarea
                    class="form-control my-2 w-75"
                    id="recipie_description-two-${doc.id}"
                    placeholder="Una descripción corta"
                  ></textarea>
                  <label for="recipie_ingredients-two" class="my-3">Ingredientes</label>
                  <textarea
                    class="form-control my-2 w-75"
                    id="recipie_ingredients-two-${doc.id}"
                    placeholder="Escribe los ingredientes"
                  ></textarea>
                  <label for="recipie_preparacion-two" class="my-3"
                    >Modo de preparación</label
                  >
                  <textarea
                    class="form-control my-2 w-75"
                    id="recipie_preparacion-two-${doc.id}"
                    placeholder="Escribe el modo de preparación"
                  ></textarea>
                </div>
                <button id="submit-recipie-two-${doc.id}" type="submit" class="btn btn-success mb-3">Envía</button>
              </form>
					 </li>
				 `;
          i = i - 1;
        });
      })
      .then(() => {
        recipies.map((recipie) => {
          document
            .getElementById(`edit-recipie-two-${recipie.id}`)
            .addEventListener("click", (e) => {
              this.editRecipieTwo(e, recipie);
            });
          document
            .getElementById(`delete-recipie-two-${recipie.id}`)
            .addEventListener("click", (e) => {
              this.deleteRecipieTwo(e, recipie.id);
            });
          document
            .getElementById(`submit-recipie-two-${recipie.id}`)
            .addEventListener("click", (e) => {
              this.submitRecipieTwo(e, recipie.id);
            });
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
