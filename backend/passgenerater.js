
const strings = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$&*"

const passGenerate=()=>{
 let myPass = "";

 for(let i = 0; i < 6 ;i++)
 {
        myPass += strings.charAt(Math.random() * strings.length);
 }

 return myPass;
}


 module.exports = {
    passGenerate
 }