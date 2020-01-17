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

const addRecipieToList = (recipie, id) => {
	//const created = moment.unix(recipie.created_at.seconds);
	recipiesEl.innerHTML += `
		<li data-id="${id}">
			${recipie.title} 
			<button class="btn btn-danger btn-sm">Delete</button>
			<p>${recipie.description}</p>
		</li>
	`;
};

// Event to felete recipe

recipiesEl.addEventListener('click', e => {
	if (e.target.tagName !== "BUTTON") {
		return;
	}

	// ok, we know the click happend on a button in our recipie list
	// now, find out which recipie
	const listItemEl = e.target.parentElement;
	const dataId = listItemEl.getAttribute('data-id');

	db.collection('recipies').doc(dataId).delete()
		.then(res => {
			listItemEl.remove();
		})
		.catch(err => {
			console.error(`Error when deleting recipie ${dataId}`, err);
		});
});

//Adding recipe to the database - submitting

newRecipieForm.addEventListener('submit', e => {
	// stop form from being submitted
	e.preventDefault();

	const recipie_title = newRecipieForm.recipie_title.value.trim();
	const recipie_description = newRecipieDescriptionEl.value.trim();
	const recipie_ingredients = newRecipieIngredientsEl.value.trim();

	if (recipie_title.length < 3 || recipie_description < 10 || recipie_ingredients < 10) {
		return;
	}

	// clear form fields
	newRecipieForm.reset();


	const recipie = {
		title: recipie_title,
		description: recipie_description,
		ingredients: recipie_ingredients

	};

	// add a new document to the 'recipies' collection
	db.collection('recipies').add(recipie)
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
		});
});

//Gettin from the database

const getRecipies = () => {
	document.querySelector('#recipies').innerHTML = "";

	db.collection('recipies').get()
		.then(snapshot => {
			// loop over the documents in the snapshot
			snapshot.docs.forEach(doc => {
				addRecipieToList(doc.data(), doc.id);
			});
		})
		.catch(err => {
			console.error("Error when retrieving recipies", err);
		});
};

getRecipies();
