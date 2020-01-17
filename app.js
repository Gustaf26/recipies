/**
 * Awesome Recipies.
 *
 */

// connect to firestore
const db = firebase.firestore();

// get reference to #recipies
const recipiesEl = document.querySelector('#recipies');
const newRecipieForm = document.querySelector('#new-recipie');
const newRecipieDescriptionEl = document.querySelector('#recepie_description');
const newRecipieIngredientsEl= document.querySelector('#recepie_ingredients');

//Creating a recipe

class AllRecipies {
	constructor(title, description, ingredients) {
	this.title += title,
	this.description += description,
	this.ingredients += ingredients,
	//this.id +=id
	this.list = []
	}

	identifyAndDeletRecipie = (dataId) =>{

		recipies.forEach(recipie => {
					 if (recipie.id == dataId) {this.list.pop(recipie);
					db.collection('recipies').doc(dataId)
					 .delete()
					.then(getRecipies())
					.catch(err => {
					console.error("Error when retrieving recipies", err);
			});
	
	}
})
	}

    addRecipieToList = (recipie_data, id) => {
		//const created = moment.unix(recipie.created_at.seconds);
		recipiesEl.innerHTML += `
			<li data-id="${id}">
				${recipie.title} 
				<button class="btn btn-danger btn-sm">Delete</button>
				<p>${recipie.description}</p>
			</li>
		`;

		this.addToDb(recipie_data)
	};

	addToDb = (recipie) => {db.collection('recipies').add(recipie)
	.then(res => {
		/**
		 * @todo
		 *
		 * 1. clear input field(s) ✅
		 * 2. reload recipies from database ✅
		 * 3. show message that recipie was added successfully
		 */
		getRecipies();
	})
	.catch(err => {
		console.error("Error when adding new recipie", err);
	});}

};


const recipies =  new AllRecipies();

class Recipie {
	constructor (title, description, ingredients) {

		this.title=title,
		this.description=description,
		this.ingredients = ingredients
	}
	

}

// Event to felete recipe

recipiesEl.addEventListener('click', e => {
	if (e.target.tagName !== "BUTTON") {
		return;
	}

	// ok, we know the click happend on a button in our recipie list
	// now, find out which recipie
	const listItemEl = e.target.parentElement;
	const dataId = listItemEl.getAttribute('data-id');
	
	recipies.identifyAndDeletRecipie(dataId);
	})



//Adding recipe to the database - submitting

newRecipieForm.addEventListener('submit', e => {
	// stop form from being submitted
	e.preventDefault();

	const recipie_title = newRecipieForm.recipie_title.value.trim();
	const recipie_description = newRecipieDescriptionEl.value.trim();
	const recipie_ingredients = newRecipieIngredientsEl.value.trim();
	//const id = Math.random()*1000;

	if (recipie_title.length < 3 || recipie_description < 10 || recipie_ingredients < 10) {
		return;
	}

	const recipie = new Recipie (recipie_title, recipie_description, recipie_ingredients)

	recipies.addToDb(recipie);

	// clear form fields
	newRecipieForm.reset();
});

//Gettin from the database

const getRecipies = () => {
	document.querySelector('#recipies').innerHTML = "";

	db.collection('recipies').get()
		.then(snapshot => {
			// loop over the documents in the snapshot
			snapshot.docs.forEach(doc => {
				const recipie_data= doc.data();
				const recipie = new Recipie(recipie_data);
				recipies.addRecipieToList(recipie);
			});
		})
		.catch(err => {
			console.error("Error when retrieving recipies", err);
		});
};

getRecipies();
