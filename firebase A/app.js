// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
//  import { getAuth, 
//       createUserWithEmailAndPassword,
//       signInWithEmailAndPassword,
//      sendSignInLinkToEmail
//  } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
//  import { doc, setDoc,getDoc,getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";




// const app = initializeApp(firebaseConfig);
// const auth = getAuth();
// const db = getFirestore()
// let register_btn = document.getElementById("register_btn")
// register_btn.addEventListener("click",()=>{
//     let email = document.getElementById("email")
//     let password = document.getElementById("password")
//     console.log(email.value)
//     console.log(password.value)
//     createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then(async(userCredential) => {
//       // Signed in 
//       const user = userCredential.user;
//       console.log("user",user)
//       // Add a new document in collection "cities"
//     await setDoc(doc(db, "users", user.uid), {
//     email: email.value,
//     password: password.value,


//   });
  
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//      console.log("error",errorMessage)
//       // ..
//     });
// })
    
  
//     // console.log(email.value)
//     // console.log(password.value)


// let login_btn = document.getElementById("login_btn")
// login_btn.addEventListener("click",()=>{
//     let login_email = document.getElementById("login_email")
//     let login_password = document.getElementById("login_password")
//     signInWithEmailAndPassword(auth, login_email.value, login_password.value)
//   .then(async(userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log("user",user)
//     const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }


//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log("error",errorMessage)
//   });

// })


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendSignInLinkToEmail
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
 import { doc,
   setDoc,
   getDoc,
   getFirestore,
   getDocFromCache,
   collection, 
   getDocs,
   query,
    where
 } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"; 


const firebaseConfig = {
    apiKey: "AIzaSyAIp_4TsN3151Rc-prOvadOOpbN-Sa1bm8",
    authDomain: "first-project-10f99.firebaseapp.com",
    projectId: "first-project-10f99",
    storageBucket: "first-project-10f99.appspot.com",
    messagingSenderId: "561615664113",
    appId: "1:561615664113:web:1bbc28b1ae420c983d4a50",
    measurementId: "G-3K4G6L14VF"
  };


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// // codepen end
let register = document.getElementById("signupBtn")


var emailregix = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


let firstName = document.getElementById("first-name")
let lastName = document.getElementById("last-name")
let registerEmail = document.getElementById("signup-email");
let registerPassword = document.getElementById("signup-password");



// let register = document.getElementById("regiterBtn")

register.addEventListener("click", function(event){
  event.preventDefault()
if (firstName.value.trim() === "" ){
  // alert("iok")
  Swal.fire(
    'Error',
    'Please Fill Up Your Form',
    'error'
  )
 
 }else if (lastName.value.trim() === "" ){
  // alert("iok")
  Swal.fire(
    'Error',
    'Invalid Last Name',
    'error'
  )
  }
 else if (!registerEmail.value.match(emailregix) || registerEmail.value === ""){
  Swal.fire(
    'Error',
    'Invalid Email',
    'error'
  )
 }
 
 else if (registerPassword.value.trim() === "" ){
  Swal.fire(
    'Error',
    'Invalid Password (atleast 8 characters)',
    'error'
  )
 }
 else{
    let loader1= document.getElementById('loader1');
    loader1.style.display = "block";
    register.style.display = "none"
  createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
    
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("USER",user)
      await setDoc(doc(db, "users", user.uid), {
        firstname: firstName.value,
        lastname: lastName.value,
        email: registerEmail.value,
        password: registerPassword.value,
    
       


      });
      loader1.style.display = "block";
  register.style.display = "none"
      // ...
      Swal.fire(
        'Success',
        'Successfully Registered ',
        'success'
      )
      loader1.style.display = "none";
      register.style.display = "block"
       firstName.value = ""
      lastName.value = ""
      registerEmail.value = ""
    registerPassword.value = ""
      // console.log("user",user)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire(
        'Error',
        'Email already in use',
        'error'
      )
      // ..
      // console.log("error",errorMessage)
    });
  
 
 }

})






















let arrfriend = [];





// firebase login
let login = document.getElementById("loginBtn")

login.addEventListener("click", function(){
  let loginEmail = document.getElementById("loginEmail");
  let loginPassword = document.getElementById("loginPassword");
  let loader2 = document.getElementById("loader2")
if(loginEmail === "" && loginPassword ===""){

  loader2.style.display = "none"
  login.style.display = "block"


}

  signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
  .then(async (userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
    console.log("USER",user)

    loader2.style.display = "block"
    login.style.display = "none"

    Swal.fire(
      'success',
      `login successfully`,
      'success'
    )
    
    loginEmail.value = "" 
    loginPassword.value = ""
  
    // ...
    const docRef = doc(db, "users", user.uid);
const docSnap = await getDoc(docRef);


    

window.localStorage.setItem("userobj", JSON.stringify(docSnap.data()))
// window.location.href = "profile.html";
if (docSnap.exists()) {
  
  console.log("Document data:", docSnap.data());
  const querySnapshot = await getDocs(collection(db, "users")) ;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, )//" => ", doc.data());
    let  docsss =  doc.data()
    console.log(docsss)
     if( doc.id){
    // let oi = document.getElementById("oi")
    // console.log(oi)
    // oi.innerHTML += `
    // <table>
  
    // <tr ><td class="pup">${docsss.name}</td></tr>
    // </table
    // `
    
  }
  arrfriend.push(docsss.name)
    window.localStorage.setItem("namearr",JSON.stringify(arrfriend))
    console.log(arrfriend)
  });


  
  // window.localStorage.setItem("userobj", JSON.stringify(docSnap.data()))
  
  
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

window.location.href = "profile.html";

  })

  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message
   let splitmessage = errorMessage.split("/")
   
  console.log("Error",errorMessage)
  
 
      Swal.fire(
        'Error',
        `(${splitmessage[1]}`,
        'error'
      )
    // }
    
  });

  
  
})








