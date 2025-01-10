// alert("mai aa gaya")
const nameTemplate = document.querySelector('.changenametemplate')
const editTemplate = document.querySelector('.changeemailtemplate')

const emailButton = document.querySelector('.editemail')
const nameButton = document.querySelector(".editname")
nameButton.addEventListener(('click'),(val)=>{
    console.log("name button")
    // nameTemplate.style.backgroundColor="red"
    nameTemplate.style.display="block"
    editTemplate.style.display = "none"
})
emailButton.addEventListener(('click'),(val)=>{
    console.log("email button")
    nameTemplate.style.display="none"
    editTemplate.style.display = "block"
})