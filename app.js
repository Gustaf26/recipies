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

  identifyAndDeletRecipie = (Id) => {
    //	this.list.forEach(recipie=>{if(recipie.id == Id){recipies.list.pop(recipie)}})

    db.collection("recipies")
      .doc(Id)
      .delete()
      .then(this.getRecipies())
      .catch((err) => {
        console.error("Error when retrieving recipies", err);
      });
  };

  addToDb = (recipie) =>
    db
      .collection("recipies")
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

  getRecipies = () => {
    document.querySelector("#recipies").innerHTML = "";

    db.collection("recipies")
      .get()
      .then((snapshot) => {
        let i = snapshot.docs.length + 5;
        f = i;
        // loop over the documents in the snapshot
        snapshot.docs.forEach((doc) => {
          const recipie_data = doc.data();
          recipiesEl.innerHTML += `
					 <li data-id="${doc.id}">
						 ${recipie_data.title} 
						 <button class="btn btn-danger btn-sm">Delete</button>
						 <p id="${doc.id}">${recipie_data.description}</p>
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

// Event to delete a recipe

recipiesEl.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") {
    return;
  }

  // ok, we know the click happend on a button in our recipie list
  // now, find out which recipie
  const listItemEl = e.target.parentElement;
  const dataId = listItemEl.getAttribute("data-id");
  e.target.parentElement.remove();
  recipies.identifyAndDeletRecipie(dataId);
});

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
});
