/**
 * Awesome Recipies.
 *
 */

// connect to firestore

// get reference to #recipies
const recipiesEl = document.querySelector("#recipies");
const newRecipieForm = document.querySelector("#new-recipie");
const newRecipieDescriptionEl = document.querySelector("#recepie_description");
const newRecipieIngredientsEl = document.querySelector("#recepie_ingredients");
const dropdownEl = document.querySelector(".dropdown-menu");
const dropButton = document.getElementById("dropdownMenuButton");
const newRecipiePreparacionEl = document.querySelector("#recepie_preparacion");

dropdownEl.value = "";

const autEl = document.querySelector("#autores");

let f = 0;

autEl.addEventListener("click", (e) => {
  e.preventDefault();

  for (g = 0; g < f + 1; g++) {
    if (e.target.id == `prep${g}`) {
      e.target.toggleAttribute("hidden");

      let hid = document.getElementById(`preparacion${g}`);
      hid.toggleAttribute("hidden");
    } else if (e.target.id == `borrar${g}`) {
      let hid = document.getElementById(`preparacion${g}`);
      hid.toggleAttribute("hidden");
      let show = document.getElementById(`prep${g}`);
      show.toggleAttribute("hidden");
    }
  }
});

//Creating a recipe

class AllRecipies {
  constructor() {
    //this.id +=id
    this.list = [];
  }

  deleteRecipie = (e, id) => {
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

  addToDb = (recipie) =>
    db
      .collection("Lela")
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
        this.getRecipies();
      })
      .catch((err) => {
        console.error("Error when adding new recipie", err);
      });

  submitRecipie = (e, id) => {
    e.preventDefault();
    console.log("Submitting recipie" + id);
  };

  editRecipie = (e, recipie) => {
    e.preventDefault();
    console.log(recipie.id);

    let recipieData = recipie.data();

    if (
      (document.getElementById(`non-editing-${recipie.id}`).style.display =
        "block")
    ) {
      document.getElementById(`non-editing-${recipie.id}`).style.display =
        "none";
      document.getElementById(`recipie-edition-${recipie.id}`).style.display =
        "block";
    } else {
      document.getElementById(`non-editing-${recipie.id}`).style.display =
        "block";
      document.getElementById(`recipie-edition-${recipie.id}`).style.display =
        "none";
    }

    document.getElementById(`recipie_title-${recipie.id}`).value =
      recipieData.title;
    document.getElementById(`recipie_description-${recipie.id}`).value =
      recipieData.description;
    document.getElementById(`recipie_ingredients-${recipie.id}`).value =
      recipieData.ingredients;
    document.getElementById(`recipie_preparacion-${recipie.id}`).value =
      recipieData.preparacion;
  };

  getRecipies = () => {
    document.querySelector("#recipies").innerHTML = "";

    let recipies;

    db.collection("lela")
      .get()
      .then((snapshot) => {
        let i = snapshot.docs.length + 5;
        f = i;
        // loop over the documents in the snapshot
        recipies = snapshot.docs;
        snapshot.docs.forEach((doc) => {
          const recipie_data = doc.data();
          recipiesEl.innerHTML += `
					 <li data-id="${doc.id}">
						 ${recipie_data.title} 
              <button id="delete-recipie-${doc.id}" class="btn btn-danger btn-sm">Delete</button>
              <button id="edit-recipie-${doc.id}" class="btn btn-primary btn-sm">Edit</button>
              <div id="non-editing-${doc.id}">
                <p id="${doc.id}-descripcion">${recipie_data.description}</p>
                <p id="${doc.id}-ingredientes">Ingredientes: ${recipie_data.ingredients}</p>
                <a id="prep${i}" href="#">Ver preparación
                </a> 
                <div class="card" id="preparacion${i}" hidden>
                    <h5 class="card-title">Preparación</h5>
                    <a href="#" id="borrar${i}">Pincha para ocultar</a>
                    <p class="card-text">${recipie_data.preparacion}</p>
                </div>
              </div>
              <form id="recipie-edition-${doc.id}" style="display: none;">
                <div class="form-group mt-3">
                  <div class="tituloautor">
                    <label class="tituloautoritem mr-4" for="recipie_title"
                      >Plato</label>
                    <input
                      class="tituloautoritem mr-4"
                      type="text"
                      class="form-control w-25"
                      id="recipie_title-${doc.id}"
                      placeholder="Escribe un título"
                      required="required"
                    />
                  </div>
                  <label for="recipie_title" class="my-3">Descripcion breve</label>
                  <textarea
                    class="form-control my-2 w-75"
                    id="recipie_description-${doc.id}"
                    placeholder="Una descripción corta"
                  ></textarea>
                  <label for="recipie_ingredients" class="my-3">Ingredientes</label>
                  <textarea
                    class="form-control my-2 w-75"
                    id="recipie_ingredients-${doc.id}"
                    placeholder="Escribe los ingredientes"
                  ></textarea>
                  <label for="recipie_preparacion" class="my-3"
                    >Modo de preparación</label
                  >
                  <textarea
                    class="form-control my-2 w-75"
                    id="recipie_preparacion-${doc.id}"
                    placeholder="Escribe el modo de preparación"
                  ></textarea>
                </div>
                <button id="submit-recipie-${doc.id}" type="submit" class="btn btn-success mb-3">Envía</button>
              </form>
					 </li>
				 `;

          i = i - 1;
        });
      })
      .then(() => {
        recipies.map((recipie) => {
          document
            .getElementById(`edit-recipie-${recipie.id}`)
            .addEventListener("click", (e) => {
              this.editRecipie(e, recipie);
            });
          document
            .getElementById(`delete-recipie-${recipie.id}`)
            .addEventListener("click", (e) => {
              this.deleteRecipie(e, recipie.id);
            });
          document
            .getElementById(`submit-recipie-${recipie.id}`)
            .addEventListener("click", (e) => {
              this.submitRecipie(e, recipie.id);
            });
        });
      })
      .catch((err) => {
        console.error("Error when retrieving recipies", err);
      });
  };
}

recipies = new AllRecipies();

class Recipie {
  constructor(description, ingredients, title, preparacion, id) {
    (this.description = description),
      (this.ingredients = ingredients),
      (this.title = title);
    this.id = id;
    this.preparacion = preparacion;
  }
}

dropdownEl.addEventListener("click", (e) => {
  e.preventDefault();

  dropButton.innerText = e.target.innerText;
});

//Adding recipe to the database - submitting

newRecipieForm.addEventListener("submit", (e) => {
  // stop form from being submitted
  e.preventDefault();

  const recipie_title = newRecipieForm.recipie_title.value.trim();
  const recipie_description = newRecipieDescriptionEl.value.trim();
  const recipie_ingredients = newRecipieIngredientsEl.value.trim();
  const recipie_preparacion = newRecipiePreparacionEl.value.trim();

  if (recipie_title.length < 3) {
    alert("Tienes que meter un titulo más largo");
    return;
  } else if (recipie_description.length < 10) {
    alert("Tienes que meter ua descripcion más larga");
    return;
  } else if (recipie_ingredients.length < 10) {
    alert("Tienes que meter ua descripcion más larga");
    return;
  }

  const recipie = new Recipie(
    recipie_description,
    recipie_ingredients,
    recipie_title,
    recipie_preparacion
  );

  if (dropButton.innerText == "Lela") {
    recipies.addToDb(recipie);
  } else if (dropButton.innerText == "Papá") {
    recipiesTwo.addToDbTwo(recipie);
  } else if (dropButton.innerText == "Sueca") {
    recipiesThree.addToDbThree(recipie);
  } else {
    alert("Elige entre Lela, papa o sueca");
  }

  // clear form fields
  newRecipieForm.reset();
  dropButton.innerText = "Categorias";
});
