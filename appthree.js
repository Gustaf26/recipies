/**
 * Awesome Recipies.
 *
 */

// connect to firestore

// get reference to #recipies

//Creating a recipe

class AllRecipiesThree {
  constructor() {
    //this.id +=id
    this.list = [];
  }

  //   identifyAndDeletRecipieThree = (Id) => {
  //     //	this.list.forEach(recipie=>{if(recipie.id == Id){recipies.list.pop(recipie)}})

  //     db.collection("suecas")
  //       .doc(Id)
  //       .delete()
  //       .then(this.getRecipiesThree())
  //       .catch((err) => {
  //         console.error("Error when retrieving recipies", err);
  //       });
  //   };

  submitRecipieThree = (e, id) => {
    e.preventDefault();
    console.log("Submitting recipie" + id);

    // Add a new document in collection "cities"
    db.collection("suecas")
      .doc(id)
      .set({
        description: document.getElementById(`recipie_description-three-${id}`)
          .value,
        ingredients: document.getElementById(`recipie_ingredients-three-${id}`)
          .value,
        preparacion: document.getElementById(`recipie_preparacion-three-${id}`)
          .value,
        title: document.getElementById(`recipie_title-three-${id}`).value,
      })
      .then(() => {
        console.log("Document successfully written!");
        this.getRecipiesThree();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  };

  editRecipieThree = (e, recipie) => {
    e.preventDefault();
    console.log(recipie.id);

    let recipieData = recipie.data();

    document
      .getElementById(`non-editing-three-${recipie.id}`)
      .toggleAttribute("hidden");
    document
      .getElementById(`recipie-edition-three-${recipie.id}`)
      .toggleAttribute("hidden");

    document.getElementById(`recipie_title-three-${recipie.id}`).value =
      recipieData.title;
    document.getElementById(`recipie_description-three-${recipie.id}`).value =
      recipieData.description;
    document.getElementById(`recipie_ingredients-three-${recipie.id}`).value =
      recipieData.ingredients;
    document.getElementById(`recipie_preparacion-three-${recipie.id}`).value =
      recipieData.preparacion;
  };

  deleteRecipieThree = (e, id) => {
    e.preventDefault();
    console.log(id);
    return;
    db.collection("suecas")
      .doc(id)
      .delete()
      .then(this.getRecipies())
      .catch((err) => {
        console.error("Error when retrieving recipies", err);
      });
  };

  addToDbThree = (recipie) =>
    db
      .collection("suecas")
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
        this.getRecipiesThree();
      })
      .catch((err) => {
        console.error("Error when adding new recipie", err);
      });

  getRecipiesThree = () => {
    document.querySelector("#recipiesthree").innerHTML = "";

    let recipies;
    db.collection("suecas")
      .get()
      .then((snapshot) => {
        // loop over the documents in the snapshot
        let i = snapshot.docs.length + 20;
        f = i;
        recipies = snapshot.docs;
        snapshot.docs.forEach((doc) => {
          const recipie_data = doc.data();

          recipiesThreeEl.innerHTML += `
				<li data-id="${doc.id}">
						 ${recipie_data.title} 
						 <button id="delete-recipie-three-${doc.id}" class="btn btn-danger btn-sm">Delete</button>
						 <button id="edit-recipie-three-${doc.id}" class="btn btn-primary btn-sm">Edit</button>
					<div id="non-editing-three-${doc.id}">
							<p id="${doc.id}">${recipie_data.description}</p>
							<p id="${doc.id}-ingredientes">Ingredientes: ${recipie_data.ingredients}</p>
							<a id="prep${i}" href="#">Ver preparación</a>	
							<div class="card" id="preparacion${i}" hidden>
								<h5 class="card-title">Preparación</h5>
								<a href="#" id="borrar${i}">Pincha para ocultar</a>
								<p class="card-text">${recipie_data.preparacion}</p>
							</div>
					</div>
					<form id="recipie-edition-three-${doc.id}" hidden>
						<div class="form-group mt-3">
						<div class="tituloautor">
							<label class="tituloautoritem mr-4" for="recipie_title-three"
							>Plato</label>
							<input
							class="tituloautoritem mr-4"
							type="text"
							class="form-control w-25"
							id="recipie_title-three-${doc.id}"
							placeholder="Escribe un título"
							required="required"
							/>
						</div>
						<label for="recipie_description-three" class="my-3">Descripcion breve</label>
						<textarea
							class="form-control my-2 w-75"
							id="recipie_description-three-${doc.id}"
							placeholder="Una descripción corta"
						></textarea>
						<label for="recipie_ingredients-three" class="my-3">Ingredientes</label>
						<textarea
							class="form-control my-2 w-75"
							id="recipie_ingredients-three-${doc.id}"
							placeholder="Escribe los ingredientes"
						></textarea>
						<label for="recipie_preparacion-three" class="my-3"
							>Modo de preparación</label
						>
						<textarea
							class="form-control my-2 w-75"
							id="recipie_preparacion-three-${doc.id}"
							placeholder="Escribe el modo de preparación"
						></textarea>
						</div>
						<button id="submit-recipie-three-${doc.id}" type="submit" class="btn btn-success mb-3">Envía</button>
              		</form>
				</li>
				 `;

          i = i - 1;
        });
      })
      .then(() => {
        recipies.map((recipie) => {
          document
            .getElementById(`edit-recipie-three-${recipie.id}`)
            .addEventListener("click", (e) => {
              this.editRecipieThree(e, recipie);
            });
          document
            .getElementById(`delete-recipie-three-${recipie.id}`)
            .addEventListener("click", (e) => {
              this.deleteRecipieThree(e, recipie.id);
            });
          document
            .getElementById(`submit-recipie-three-${recipie.id}`)
            .addEventListener("click", (e) => {
              this.submitRecipieThree(e, recipie.id);
            });
        });
      })
      .catch((err) => {
        console.error("Error when retrieving recipies", err);
      });
  };
}

recipiesThree = new AllRecipiesThree();

class RecipieThree {
  constructor(description, ingredients, title, preparacion, id) {
    (this.description = description),
      (this.ingredients = ingredients),
      (this.title = title),
      (this.id = id),
      (this.preparacion = preparacion);
  }
}
