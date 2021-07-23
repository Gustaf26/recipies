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
	this.list =[]
	}

	identifyAndDeletRecipieThree = (Id) =>{

	//	this.list.forEach(recipie=>{if(recipie.id == Id){recipies.list.pop(recipie)}})

		db.collection('suecas').doc(Id)
		.delete()
		.then(this.getRecipiesThree())
		.catch(err => {
		console.error("Error when retrieving recipies", err);
			});

	}

	addToDbThree = (recipie) =>db.collection('suecas').add({
				description: recipie.description,
				ingredients: recipie.ingredients,
				title: recipie.title,
				preparacion: recipie.preparacion
				})
	.then(res => {
		/**
		 * @todo
		 *
		 * 1. clear input field(s) ✅
		 * 2. reload recipies from database ✅
		 * 3. show message that recipie was added successfully
		 */
		this.getRecipiesThree();
	})
	.catch(err => {
		console.error("Error when adding new recipie", err);
	});

	 getRecipiesThree = () => {
		document.querySelector('#recipiesthree').innerHTML = "";
	
		db.collection('suecas').get()
			.then(snapshot => {
				// loop over the documents in the snapshot
				let i = snapshot.docs.length +20;
			   f = i;

				snapshot.docs.forEach(doc => {
					const recipie_data= doc.data();

					 recipiesThreeEl.innerHTML += `
					 <li data-id="${doc.id}">
						 ${recipie_data.title} 
						 <button class="btn btn-danger btn-sm">Delete</button>
						 <p id="${doc.id}">${recipie_data.description}</p>
						 <a id="prep${i}" href="#">Ver preparación</a>	
						 <div class="card" id="preparacion${i}" hidden>
								<h5 class="card-title">Preparación</h5>
								<a href="#" id="borrar${i}">Pincha para borrar</a>
								<p class="card-text">${recipie_data.preparacion}</p>
							</div>
					 </li>
				 `;
					
					 i = i-1;
				 
				});
			})
			.catch(err => {
				console.error("Error when retrieving recipies", err);
			});
	};

}



recipiesThree = new AllRecipiesThree();
 

class RecipieThree {
	constructor (description, ingredients, title, preparacion, id) {

		
		this.description=description,
		this.ingredients = ingredients,
		this.title=title,
		this.id = id,
		this.preparacion = preparacion
	}
}



// Event to felete recipe

recipiesThreeEl.addEventListener('click', e => {
	if (e.target.tagName !== "BUTTON") {
		return;
	}

	// ok, we know the click happend on a button in our recipie list
	// now, find out which recipie
	const listItemEl = e.target.parentElement;
	const dataId = listItemEl.getAttribute('data-id');
	e.target.parentElement.remove();
	recipiesThree.identifyAndDeletRecipieThree(dataId);
	})






