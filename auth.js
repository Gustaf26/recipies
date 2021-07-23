
const signinEl=document.querySelector(".signin");

const signoutEl=document.querySelector(".signout");

const formaEl = document.querySelector(".loginform");

const loggainEl = document.querySelector(".loggainbutton");

const mailEl = document.querySelector("#InputEmail");

const passEl = document.querySelector("#InputPassword");

const receptcontainerEl = document.querySelector(".autoresrecetas");

const textosEl = document.querySelector(".textos");

// EVent listeners

auth.onAuthStateChanged(user => {

    if (user) {receptcontainerEl.toggleAttribute("hidden");
    textosEl.toggleAttribute("hidden");

    recipies.getRecipies();
    recipiesTwo.getRecipiesTwo();
    recipiesThree.getRecipiesThree();
    
    }
    

})


signinEl.addEventListener('click', e=>{

    e.preventDefault();
    formaEl.toggleAttribute('hidden');
})

loggainEl.addEventListener('click', e =>{

    e.preventDefault();

    formaEl.toggleAttribute("hidden");

    const email = mailEl.value;
    const password = passEl.value;

    auth.signInWithEmailAndPassword(email, password).then(cred=>{if (cred) {

    signinEl.toggleAttribute("hidden");
    signoutEl.toggleAttribute("hidden");
    }})
    .catch(err => {alert(err)});

})

signoutEl.addEventListener('click', e => {
    
    //formaEl.toggleAttribute("hidden");
    receptcontainerEl.toggleAttribute("hidden");


    auth.signOut().then( ()=>{signinEl.toggleAttribute("hidden");
    textosEl.toggleAttribute("hidden");
    signoutEl.toggleAttribute("hidden");
    alert("You have succesfully logged out")});
})