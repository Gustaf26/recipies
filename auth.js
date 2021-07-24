const signinEl = document.querySelector(".signin-link");

// const signoutEl=document.querySelector(".signout");

const formaEl = document.querySelector(".loginform");

const loggainEl = document.querySelector(".loggainbutton");

const mailEl = document.querySelector("#InputEmail");

const passEl = document.querySelector("#InputPassword");

const receptcontainerEl = document.querySelector(".autoresrecetas");

const textosEl = document.querySelector(".textos");

// EVent listeners

auth.onAuthStateChanged((user) => {
  if (user) {
    receptcontainerEl.toggleAttribute("hidden");
    textosEl.toggleAttribute("hidden");

    recipies.getRecipies();
    recipiesTwo.getRecipiesTwo();
    recipiesThree.getRecipiesThree();
  }
});

signinEl.addEventListener("click", (e) => {
  e.preventDefault();
  if (signinEl.innerText === "Sign out") {
    auth
      .signOut()
      .then(() => {
        signinEl.innerText = "Sign in";
        textosEl.toggleAttribute("hidden");
        receptcontainerEl.toggleAttribute("hidden");
        console.log("user successfully logged out");
      })
      .catch((err) => {
        alert(err);
      });
  } else {
    formaEl.toggleAttribute("hidden");
  }
});

loggainEl.addEventListener("click", (e) => {
  e.preventDefault();

  formaEl.toggleAttribute("hidden");

  const email = mailEl.value;
  const password = passEl.value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      if (cred) {
        signinEl.innerText = "Sign out";
      }
    })
    .catch((err) => {
      alert(err);
    });
});
