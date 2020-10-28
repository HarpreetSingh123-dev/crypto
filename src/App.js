import React, { Component } from 'react';
import './App.css';
import $ from 'jquery'
//import  as  shift from 'caesar-shift';
//import { encrypt, decrypt } from 'caesar-shift';
import Sender from './MAIN_DISPLAY/Sender'
import Receiver from './MAIN_DISPLAY/Receiver'
import sha256  from 'sha256'
import RSA_SENDER from './MAIN_DISPLAY/RSAsender'
import RSA_RECEIVER from './MAIN_DISPLAY/RSAreceiver'

import BOB from './MAIN_DISPLAY/Bob_Sender'
import ALICE from './MAIN_DISPLAY/Alice_Receiver'

class App extends Component {

       constructor(props){
                    
          super(props)
              this.state={
                          plaintext:'',
                          key:'',
                          technique:'',
                          cipher:'',
                          rec_key:'',
                          rec_tech:'',
                          rec_cipher:'',
                          decrtpted_text:'',
                          /*FOR MONO ONLY */
                          mono_key:'',
                          //////////////////
                          sha_sender:'',
                          sha_receiver:'',
                          /////// PLAY FAIR KEY GENERATED///////////////
                          playfair_gen_key:'',

                        //// BELOW STATES ARE ONLY USED FOR RSA //////////////////

                        rsa_plaintext:'',
                        rsapubkey:'',
                        rsa_pri_key:'',
                        rsa_cipher_text:'',
                        rsa_decrypted_cipher:'',
                        power:'',
                        rsa_receiver_cipher:'',
                        coded_message:'',
                        //// for checking//////////////////////////////
                        mod:'',

                        ///////////////////// BELOW STATES ARE FOR DEFI HELLMEN//////////////
                        bob_alpha:'',
                        bob_q:'',
                        bob_xa:'',
                        y_bob:'',
                        rec_alice_ya:'',
                        bob_sec_key:'',

                        alice_alpha:'',
                        alice_q:'',
                        alice_xa:'',
                        y_alice:'',
                        rec_bob_ya:'',
                        alice_sec_key:''


                         }
  
       this.submit_for_encryption=this.submit_for_encryption.bind(this)
       this.text=this.text.bind(this)
       this.key=this.key.bind(this)
       this.tech=this.tech.bind(this)
       this.send=this.send.bind(this)
       this.decrypt_to_plain=this.decrypt_to_plain.bind(this)
       ///////////////BELOW IS FOR RSA///////////////////////////
       this.rsa_generate_keys=this.rsa_generate_keys.bind(this)
       
       this.rsa_text=this.rsa_text.bind(this)

       this.rsa_encryption=this.rsa_encryption.bind(this)
       this.rsa_send=this.rsa_send.bind(this)
       this.rsa_decrypt=this.rsa_decrypt.bind(this)

       /////////////////////BELOW IS FOR DEFFI HELMEN////////////
       this.bob_alpha_set=this.bob_alpha_set.bind(this)
       this.bob_q_set=this.bob_q_set.bind(this)
       this.bob_xa_set=this.bob_xa_set.bind(this)

       this.alice_alpha_set=this.alice_alpha_set.bind(this)
       this.alice_q_set=this.alice_q_set.bind(this)
       this.alice_xa_set=this.alice_xa_set.bind(this)

       this.bob_ya=this.bob_ya.bind(this)
       this.alice_ya=this.alice_ya.bind(this)

       this.send_bob_ya=this.send_bob_ya.bind(this)
       this.send_alice_ya=this.send_alice_ya.bind(this)

       this.bob_sec=this.bob_sec.bind(this)
       this.alice_sec=this.alice_sec.bind(this)
}


text(event){
           
            this.setState({plaintext: event.target.value})
}

key(event){
          this.setState({key: event.target.value})
}

tech(event){
           this.setState({technique: event.target.value})
           
           
}

rsa_text(event){
  this.setState({rsa_plaintext: event.target.value})
}




submit_for_encryption(event) {

//// THESE ARE APPLIED SO THAT ANY INPUT SHOULD NOT REMAIN EMPTY AND THERE IS SPECIAL CASE FOR MONOALPHABATIC//////////////////////////  
  if(this.state.plaintext===""){
    event.preventDefault()
    alert("please enter plain text")
    return
    
  }

  if(this.state.technique===""){
    event.preventDefault()
    alert("please enter technique")
    return
   }
   
   if(this.state.technique!=="monoalphabatic"){
  
        if(this.state.key===""){
            event.preventDefault()
            alert("please enter key")
            return
        } 
  
       if(this.state.plaintext!=="" && this.state.technique!=="" && this.state.key!=="" ){
           var for_sha_plain = this.state.plaintext
           var sha_of_plain_text = sha256(for_sha_plain)
           this.setState({sha_sender:sha_of_plain_text})
      }
  }

  if(this.state.technique=="monoalphabatic"){  // if tehnique is monoalphabatic, we generate key through a coded function, we dont enter key as input
  
      if(this.state.plaintext!=="" && this.state.technique!==""){
          var for_sha_plain = this.state.plaintext
          var sha_of_plain_text = sha256(for_sha_plain)
          this.setState({sha_sender:sha_of_plain_text})
       }
}
///////////////////////////////////////////////////////////////////////////////////////////           
              event.preventDefault()
              
///////////////// CEASER CIPHER ENCRYPTION BELOW //////////////////////////////////////////          
                  if(this.state.technique=='caesercipher') { 
                     var l =""
                     var text = this.state.plaintext
                     var amount = this.state.key;
                     var shift = parseInt(amount)
                     //var sha = sha256(text)
                     //this.setState({sha_sender:sha})
                     //console.log(sha)
                     encrypt(text, shift)
                     function encrypt(text, shift) {
                      var result = "";
                        //loop through each caharacter in the text
                          for (var i = 0; i < text.length; i++) {
                                
                               //get the character code of each letter
                              var c = text.charCodeAt(i);
                   
                              // handle uppercase letters
                              if(c >= 65 && c <=  90) {
                                 result += String.fromCharCode((c - 65 + shift) % 26 + 65); 
                   
                              // handle lowercase letters
                              }else if(c >= 97 && c <= 122){
                                  result += String.fromCharCode((c - 97 + shift) % 26 + 97);
                   
                              // its not a letter, let it through
                              } else {
                                  result += text.charAt(i);
                              }
                          }
                      
                      l= result;
                  }
                  this.setState({cipher:l})
                }       
//////////////////// MONOALPHABATIC ENCRYPTION BELOW ///////////////////////
                if(this.state.technique=='monoalphabatic'){
                  
                  var v = this.state.plaintext
                  var p = ""
                  var m =""
                  var t = ""
                  var shuffledArr;
                  let alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                  
                  function shuffle(array) {
                    let shuffledArray = array.slice(0,array.length)
                    var currentIndex = shuffledArray.length;
                    var temporaryValue, randomIndex;
                  
                    while (0 !== currentIndex) {
                      randomIndex = Math.floor(Math.random() * currentIndex);
                      currentIndex -= 1;
                  
                      temporaryValue = shuffledArray[currentIndex];
                      shuffledArray[currentIndex] = shuffledArray[randomIndex];
                      shuffledArray[randomIndex] = temporaryValue;
                    }
                  
                    return shuffledArray;
                  }
                   cipher()
                  function cipher(){
                    shuffledArr = shuffle(alphabetArr);
                    console.log("Key : " + shuffledArr.join().replace(/,/g, '')); // Writes the created key on console
                    p = shuffledArr;
                    t = shuffledArr.join().replace(/,/g, '');
                    var textArr = v.split(""); // Insert the plaintext to cipher in between first quotes, don't change the split method.

                    
                    for(let k=0; k<textArr.length; k++){
                    if ((textArr[k] == ' ') || (textArr[k] == '\t') || (textArr[k] == '\n' || alphabetArr.indexOf(textArr[k].toUpperCase())==-1)){
                    continue;
                    
                    }else
                    textArr[k]=shuffledArr[alphabetArr.indexOf(textArr[k].toUpperCase())];
                      }
                      m = textArr.join().replace(/,/g, '')
                      console.log(textArr.join().replace(/,/g, '')) // Writes the ciphering output on console
                    }
                    
                    this.setState({mono_key:p})
                    this.setState({key:p})
                    this.setState({cipher:m})
                    alert("<b>KEY GENERATED FOR MONOALPHABATIC IS</b>" + t)
                }

///////////////// POLYALPHABATIC ENCRYPTION BELOW /////////////////////////////////////
               
               if(this.state.technique=='polyalphabetic'){

                var f = this.state.plaintext.toString()
                var b = this.state.key.toString().toUpperCase()
                var t = ""
                function stringToIntList(string)
                
                            {
                  
                               var s = new Array();
                               for (var i = 0; i < string.length; i++) {
                    
                                s[i] = string.charCodeAt(i);
                           
                               }
                   return s;
                
                  }

                function intsToCharList(integers)
    
                           {
	                           var ints = new Array();
	                           for (var i = 0; i < integers.length; i++) {
                            
                              ints[i] = String.fromCharCode(integers[i]);
          
                                  }
                    
                                   return ints;
                            }


                function makeTable()
                            
                            {
                            
                              var table = new Array();
                              var minASCII = 65  /*parseInt(document.getElementById('minASCII').value);*/
                              var maxASCII = 91  /*parseInt(document.getElementById('maxASCII').value);*/
                              var i = 0;
                              while (i+minASCII < maxASCII) {
                                var line = new Array();
                                for (var j = 0; j < maxASCII - minASCII; j++) {
                                  if (j+i+minASCII >= maxASCII) {
                                    line[line.length] = (j+i)-(maxASCII-minASCII)+minASCII;
                                  } else {
                                    line[line.length] = j+i+minASCII;
                                  }
                                }
                                table[table.length] = line;
                                i++;
                              }
                             console.log("POLY ALPHABATIC GENERATED TABLE "+table)
                              return table;
                            }

                            encrip()
                            function encrip()
                           
                            {
                              var text = stringToIntList(f);
                              var key = stringToIntList(b);
                              var table = makeTable();
                              var keyChar = 0;
                              var message = new Array();
                              while(message.length<text.length) {
                                for(var i = 0; i < text.length; i++) {
                                  var row = table[0].indexOf(key[keyChar]);
                                  var col = table[0].indexOf(text[i]);
                                  console.log("ROW IS (KEY) "+row)
                                  console.log("COL IS (PLAIN TEXT) "+col)
                                  message[message.length] = table[row][col];
                                  if (keyChar<key.length-1) {
                                    keyChar++;
                                  } else {
                                    keyChar = 0;
                                  }
                                }
                              }
                              console.log("GENERATED MESSAGE IN CODES "+ message)
                              message = intsToCharList(message).join("");
                             
                                t = message
                              console.log("GENERATED MESSGAE AFTER CONVERTING " + t)
                              
                            }       

                            
                            this.setState({cipher: t})
               }

/////////////////////////////////PLAYFAIR ENCRYPTION BELOW/////////////////////////////////////////////

if(this.state.technique=='playfair'){

    var play_fair_cipher =""

     var  subCh= {
            sub: 'J', // Letter to replace
            rpl: 'I' ,// Letter to take its place
            nullCh: 'X',
            maxRow: 5,
            maxCol: 5,
     }


     var key= ""     

     var alpha = ""

     var allowed ="ABCDEFGHIKLMNOPQRSTUVWXYZ"

     var table = false

     var keyArr =""

     var generated_key_string =""

     var keystring = this.state.key

  /// below function is used to generate table//////   
    function shuffleStr(str) {
       
             var array = str.split("");
             var m = array.length,
             t, i;

                  // While there remain elements to shuffle…
                while (m) {
                       // Pick a remaining element…
                       i = Math.floor(Math.random() * m--);
                       // And swap it with the current element.
                       t = array[m];
                       array[m] = array[i];
                       array[i] = t;
                      }
  
                      return array.join("");
            }

////////////// Below function is used to generate table/////////////////////////////            
    generateKeyTable(keystring)
  
    function generateKeyTable(keystring) {

      
    
       if (!keystring) keystring = "PLAYFAIRCIPHER";

     
     
       keystring = keystring.toUpperCase();
       keystring = keystring.replace(/\W+/g, "");
       keystring = keystring.replace(subCh.sub,subCh.rpl)

       alpha = allowed

        keyArr = keystring.split("")
        
       $.each( keyArr, function (x, c) {
         

          if (alpha.indexOf(c) > -1 && key.indexOf(c) == -1) {
            key += c;
            alpha = alpha.replace(c, "");
        }
  
  
         });

      

       if (table) {
         
        key += shuffleStr(alpha) 
        console.log(key)
      }
  
    else
      {
        key += alpha 
        
        generated_key_string = key
      };

      
    console.log("GENERATED TABLE FOR PLAY FAIR "+ generated_key_string)

    
  }

  this.setState({playfair_gen_key:generated_key_string})
  ////////////////////// below functions are for encryption ////////////////////////

  function getCharPosition(c) {
    var index =key.indexOf(c);
    var row = Math.floor(index / 5);
    var col = index % 5;
    return {
        row: row,
        col: col
    };
}

function getCharFromPosition(pos) {
  var index = pos.row * 5;
  index = index + pos.col;
  return key.charAt(index);
}

  function encipherPair(str) {
    if (str.length != 2) return false;
    var pos1 = getCharPosition(str.charAt(0));
    var pos2 = getCharPosition(str.charAt(1));
    var char1 = "";

    // Same Column - Increment 1 row, wrap around to top
    if (pos1.col == pos2.col) {
        pos1.row++;
        pos2.row++;
        if (pos1.row > subCh.maxRow - 1) pos1.row = 0;
        if (pos2.row > subCh.maxRow - 1) pos2.row = 0;
        char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
    } else if (pos1.row == pos2.row) { // Same Row - Increment 1 column, wrap around to left
        pos1.col++;
        pos2.col++;
        if (pos1.col > subCh.maxCol - 1) pos1.col = 0;
        if (pos2.col > subCh.maxCol - 1) pos2.col = 0;
        char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
    } else { // Box rule, use the opposing corners
        var col1 = pos1.col;
        var col2 = pos2.col;
        pos1.col = col2;
        pos2.col = col1;
        char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
    }
    console.log("encip char 1"+ char1)
    return char1;
}




var gen_diagraph =""
  makeDigraph(this.state.plaintext)

  function makeDigraph(str) {
    if (!str) return false;
    var digraph = [];
    str = str.toUpperCase();
    str = str.replace(/\W+/g, "");
    str = str.replace(subCh.sub,subCh.rpl);
    var strArr = str.split("");

    for (var i = 0; i < str.length; i++) {
        if (allowed.indexOf(strArr[i]) == -1) continue;
        if (i + 1 >= str.length) digraph.push(strArr[i] + subCh.nullCh);
        else if (strArr[i] == strArr[i + 1]) digraph.push(strArr[i] + subCh.nullCh);
        else digraph.push(strArr[i] + strArr[++i]);
    }
    gen_diagraph = digraph;
    console.log(gen_diagraph)
}

encipher(gen_diagraph)
function encipher(digraph) {
  if (!digraph) return false;
  var cipher = [];
  for (var i = 0; i < digraph.length; i++) {
      cipher.push(encipherPair(digraph[i]));
  }
  console.log(cipher.join(""));

  play_fair_cipher = cipher
}

this.setState({cipher:play_fair_cipher})


}

////////////////////////////////ONE TIME PAD ENCRYPTION BELOW//////////////////////////////////////////
 
              if(this.state.technique=='otp'){

                var ss=""
                var codebook = [];
                codebook[0] = "a";
                codebook[1] = "b";
                codebook[2] = "c";
                codebook[3] = "d";
                codebook[4] = "e";
                codebook[5] = "f";
                codebook[6] = "g";
                codebook[7] = "h";
                codebook[8] = "i";
                codebook[9] = "j";
                codebook[10] = "k";
                codebook[11] = "l";
                codebook[12] = "m";
                codebook[13] = "n";
                codebook[14] = "o";
                codebook[15] = "p";
                codebook[16] = "q";
                codebook[17] = "r";
                codebook[18] = "s";
                codebook[19] = "t";
                codebook[20] = "u";
                codebook[21] = "v";
                codebook[22] = "w";
                codebook[23] = "x";
                codebook[24] = "y";
                codebook[25] = "z";
                codebook[26] = "A";
                codebook[27] = "B";
                codebook[28] = "C";
                codebook[29] = "D";
                codebook[30] = "E";
                codebook[31] = "F";
                codebook[32] = "G";
                codebook[33] = "H";
                codebook[34] = "I";
                codebook[35] = "J";
                codebook[36] = "K";
                codebook[37] = "L";
                codebook[38] = "M";
                codebook[39] = "N";
                codebook[40] = "O";
                codebook[41] = "P";
                codebook[42] = "Q";
                codebook[43] = "R";
                codebook[44] = "S";
                codebook[45] = "T";
                codebook[46] = "U";
                codebook[47] = "V";
                codebook[48] = "W";
                codebook[49] = "X";
                codebook[50] = "Y";
                codebook[51] = "Z";
                codebook[52] = "0";
                codebook[53] = "1";
                codebook[54] = "2";
                codebook[55] = "3";
                codebook[56] = "4";
                codebook[57] = "5";
                codebook[58] = "6";
                codebook[59] = "7";
                codebook[60] = "8";
                codebook[61] = "9";
                codebook[62] = "`";
                codebook[63] = "~";
                codebook[64] = "!";
                codebook[65] = "@";
                codebook[66] = "#";
                codebook[67] = "$";
                codebook[68] = "%";
                codebook[69] = "^";
                codebook[70] = "&";
                codebook[71] = "*";
                codebook[72] = "(";
                codebook[73] = ")";
                codebook[74] = "-";
                codebook[75] = "=";
                codebook[76] = "_";
                codebook[77] = "+";
                codebook[78] = "[";
                codebook[79] = "]";
                codebook[80] = "{";
                codebook[81] = "}";
                codebook[82] = "|";
                codebook[83] = "\\";
                codebook[84] = ";";
                codebook[85] = ":";
                codebook[86] = "'";
                codebook[87] = "\"";
                codebook[88] = ",";
                codebook[89] = ".";
                codebook[90] = "<";
                codebook[91] = ">";
                codebook[92] = "/";
                codebook[93] = "?";
                codebook[94] = " ";
                codebook[95] = "\n";
                codebook[96] = "\r";
                codebook[97] = "\t";
                codebook[98] = "–";
                codebook[99] = "—";


                 function encode(text) {
	                   // Loop through each text character.
	                        var code = [];
	                        for (var i=0; i<text.length; i++) {
                           
                            // Check if the character is in the codebook, filter it out if it's not.
		                              if (codebook.indexOf(text[i]) !== -1) {
		                                    	// Get the character's code number from the code book.
		                                     	code[i] = codebook.indexOf(text[i]).toString();
			                                   // Prepend a leading zero if code number is in range 0-9.
		                                   	if (code[i].length === 1) {
				                                       code[i] = "0" + code[i];
		                                       	}
	                                  	}
	                         }
                   	return code.join("");
                  }

                    var message = this.state.plaintext
                    var key =this.state.key
                    var mode = "encrypt"
                   
                    otp(message,key,mode)
                  
                    function otp(message, key, mode) {
                    
                      console.log("in otp")
                    
                      var codeMessage
                    // The message and key must not be empty.
                    
                    // Convert the message and key to number-encoded strings using the codebook.
                      
                      var codeKey = encode(key);
                    
                      // Only number-encode the message if using encrypt mode. In decrypt mode, the message should already be number-encoded.
                    
                      if (mode == "encrypt") {
                     
                        codeMessage = encode(message);
                   
                      } 
                    // The key should be at least the same length as the message.
                    
                    // Split both the code strings into arrays where each array item is 1 digit long.
                    codeMessage = codeMessage.split("");
                    codeKey = codeKey.split("");
                    // Loop through each one-digit code number.
                    var codeOutput = [];
                    for (var i=0; i<codeMessage.length; i++) {
                      // Convert the codes from string to number format by multiplying by 1.
                      codeMessage[i] *= 1;
                      codeKey[i] *= 1;
                      // Perform the OTP encryption by adding the message code number and key code number together.
                      if (mode == "encrypt") {
                        codeOutput[i] = (codeMessage[i] + codeKey[i]);
                        // Number must be a single digit in range 0-9.
                        // Use modular addition, modulo 10 - allow no carrying during addition.
                        if (codeOutput[i] > 9) {
                          codeOutput[i] -= 10;
                        }
                      }
                      // Perform the OTP decryption by subtracting the key code number from the message code number.
                      
                    }
                    // If encrypting, return a number-encoded string. If decrypting, decode the number-encoded string to return the plaintext.
                    var outputString = codeOutput.join("");
                    
                    console.log(outputString)
                     ss = outputString
                      //return outputString;
                    
                  }

                  this.setState({cipher:ss})
              }
       
/////////////////////////////RAIL FENCE ENCRYPTION BELOW/////////////////////////////////////////              
  
            if(this.state.technique=="railfence"){

              plaintext= this.state.plaintext
              key = this.state.key
              var railfence_cipher=""

              Encrypt(plaintext,key)
              
              function Encrypt(plaintext,key) {
                
                 
               if(key > Math.floor(2*(plaintext.length-1)))
              
               { alert("key is too large for the plaintext length."); 
                 return; 
               }  
                var ciphertext = "";
               
                for(var line=0; line<key-1; line++){
                  
                  var skip=2*(key-line-1);  
                  var j=0;
                   
                  for(var i=line; i<plaintext.length;){
                        ciphertext += plaintext.charAt(i);
                        if((line==0) || (j%2 == 0)) i+=skip;
                       else i+=2*(key-1) - skip;  
                       j++;          
                    }
                }

                for(i=line; i<plaintext.length; i+=2*(key-1)) ciphertext += plaintext.charAt(i);
                railfence_cipher = ciphertext;
                console.log(railfence_cipher)
            }

            this.setState({cipher:railfence_cipher})


            }
////////////////////////////COLUMNAR ENCRYPTION BELOW///////////////////////////////////////////

            if(this.state.technique=="columnar"){

              var chars = "abcdefghijklmnopqrstuvwxyz";
              var plaintext = this.state.plaintext.toLowerCase().replace(/[^a-z]/g, "");
              var key = this.state.key
              
              if(key == key.toLocaleUpperCase()){
                 alert("please enter key in lowercase")
                 return
              }
              
              var pc ="x";
              var columnar_cipher
              
              //
              Encrypt(plaintext,key,pc)
            
              function Encrypt(plaintext, key, pc) {


                var klen = key.length;
                if (pc == "") pc = "x";
                while (plaintext.length % klen != 0) {
                    plaintext += pc.charAt(0);
                }
                var colLength = plaintext.length / klen;
                var ciphertext = "";
                var kj = 0;
                for (var i = 0; i < klen; i++) {
                    while (kj < 26) {
                        t = key.indexOf(chars.charAt(kj));
                       var arrkw = key.split("");
                        arrkw[t] = "_";
                        key = arrkw.join("");
                        if (t >= 0) break;
                        else kj++;
                    }
                    for (var j = 0; j < colLength; j++) {
                        ciphertext += plaintext.charAt(j * klen + t);
                    }
                }
                 columnar_cipher = ciphertext.toLocaleUpperCase();
                // console.log(k)
                 
              }
            
              this.setState({cipher:columnar_cipher})
            }

/////////////////////////////RC4 ENCRYPTION BELOW////////////////////////////////////////////

         if(this.state.technique=="rc4"){

            var plain_text_for_rc4 = this.state.plaintext
            var key_for_rc4 = this.state.key

            var key = key_for_rc4
            var str = plain_text_for_rc4

            var rc4_encrypted_text =""

            rc4(key,str)

            function rc4(key, str) {
              var s = [], j = 0, x, res = '';
              for (var i = 0; i < 256; i++) {
                s[i] = i;
              }
              for (i = 0; i < 256; i++) {
                j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
                x = s[i];
                s[i] = s[j];
                s[j] = x;
              }
              i = 0;
              j = 0;
              for (var y = 0; y < str.length; y++) {
                i = (i + 1) % 256;
                j = (j + s[i]) % 256;
                x = s[i];
                s[i] = s[j];
                s[j] = x;
                res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
              }
              rc4_encrypted_text = res;
              console.log(rc4_encrypted_text)
            }

          this.setState({cipher:rc4_encrypted_text})

         }
          
}


send(event){
  
           event.preventDefault()
           
           this.setState({rec_key:this.state.key})
           this.setState({rec_tech:this.state.technique})
           this.setState({rec_cipher:this.state.cipher})

           
           
}

decrypt_to_plain(event){
  
  event.preventDefault()

  
  
 //////*CEASER CIPHER DECRYPTION BELOW*///////////////////////////
             if(this.state.rec_tech=='caesercipher') { 
                 
                 var text = this.state.rec_cipher;
                 var amount = this.state.rec_key;
                 var shift = parseInt(amount)
                 var r =""
                 decrypt(text,shift)

                 function encrypt(text, shift) {
                  var result = "";
                  
                      //loop through each caharacter in the text
                      for (var i = 0; i < text.length; i++) {
                            
                           //get the character code of each letter
                          var c = text.charCodeAt(i);
               
                          // handle uppercase letters
                          if(c >= 65 && c <=  90) {
                             result += String.fromCharCode((c - 65 + shift) % 26 + 65); 
               
                          // handle lowercase letters
                          }else if(c >= 97 && c <= 122){
                              result += String.fromCharCode((c - 97 + shift) % 26 + 97);
               
                          // its not a letter, let it through
                          }else {
                              result += text.charAt(i);
                          }
                      
                  }
                  return result;
               }
               
                function decrypt(text,shift){
                    var result = "";
                    shift = (26 - shift) % 26;
                    result = encrypt(text,shift);
                    r = result
                    console.log(result)
                   } 
                 this.setState({decrtpted_text:r})
                 var sha = sha256(r)
                 console.log(sha)
               this.setState({sha_receiver:sha})
                }
////////////////*MONOALPHABATICS DECRYPTION BELOW*///////////////////////////

         if(this.state.rec_tech=='monoalphabatic'){
          let alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
          var x = "";
          var shuffledArr = this.state.mono_key;
          var f = this.state.rec_cipher
          decipher()
          function decipher(){
            var textArr = f.split(""); // Insert the plaintext to decipher in between first quotes, don't change the split method.
            for(let k=0; k<textArr.length;k++){
            if ((textArr[k] == ' ') || (textArr[k] == '\t') || (textArr[k] == '\n' || alphabetArr.indexOf(textArr[k].toUpperCase())==-1)){
            continue;
            
            }else
            textArr[k]=alphabetArr[shuffledArr.indexOf(textArr[k].toUpperCase())];
            } console.log(textArr.join().replace(/,/g, '')) // Writes the deciphering output on console
              x =   textArr.join().replace(/,/g, '')
          }
          this.setState({decrtpted_text:x})

                var sha = sha256(x)
                 console.log(sha)
               this.setState({sha_receiver:sha})
         }

/////////////////////POLYALPHABATIC DECRYPTION BELOW//////////////////////////////        

            if(this.state.rec_tech=='polyalphabetic'){

              var q = this.state.rec_cipher.toString()
              var n = this.state.rec_key.toString()
              var y = ""
              function stringToIntList(string)
              {
                var s = new Array();
                for (var i = 0; i < string.length; i++) {
                  s[i] = string.charCodeAt(i);
                }
                return s;
              }

              function intsToCharList(integers)
               {
              	var ints = new Array();
	              for (var i = 0; i < integers.length; i++) {
		            ints[i] = String.fromCharCode(integers[i]);
	             }
	             return ints;
             }

             function makeTable()
             {
	            var table = new Array();
	            var minASCII = 65
	            var maxASCII = 91
	            var i = 0;
	             while (i+minASCII < maxASCII) {
		              var line = new Array();
		                 for (var j = 0; j < maxASCII - minASCII; j++) {
		                        	if (j+i+minASCII >= maxASCII) {
			                         	line[line.length] = (j+i)-(maxASCII-minASCII)+minASCII;
			                        } else {
      
                                line[line.length] = j+i+minASCII;
			                        }
		                   }
      
                        table[table.length] = line;
		                i++;
	                    }
	            return table;

              }
             
              decrip()
              function decrip()
              {
               var cipher = stringToIntList(q);
               var  key = stringToIntList(n);
                var table = makeTable();
                var keyChar = 0;
                var message = new Array();
                while (message.length<cipher.length) {
                  for (var i = 0; i < cipher.length; i++) {
                    var row = table[0].indexOf(key[keyChar]);
                    var col = table[row].indexOf(cipher[i]);
                    message[message.length] = table[0][col];
                    if (keyChar<key.length-1) {
                      keyChar++;
                    } else {
                      keyChar = 0;
                    }
                  }
                }
                message = intsToCharList(message).join("");
                
                y = message
                console.log(y)              
              }
             this.setState({decrtpted_text:y})
             var sha = sha256(y)
             console.log(sha)
            this.setState({sha_receiver:sha})
            }
 
/////////////////////PLAY FAIR DECRYPTION BELOW/////////////////////////////////////////

if(this.state.rec_tech=='playfair'){

  var dec_playfair =""

  var key = this.state.playfair_gen_key
  var cipher_text = this.state.rec_cipher.join('')
  console.log("dec cip"+ cipher_text)
  

  var dec_diagraph =""
  
  var alpha = ""

  var allowed ="ABCDEFGHIKLMNOPQRSTUVWXYZ"
  
  var subCh = {
    sub: 'J', // Letter to replace
    rpl: 'I', // Letter to take its place
    nullCh: 'X',
    maxRow: 5,
    maxCol: 5,
}

//////{ first make diagraph will be initiated }///////////////////     
makeDigraph(cipher_text)

function makeDigraph(str) {
    if (!str) return false;
    var digraph = [];
    str = str.toUpperCase();
    str = str.replace(/\W+/g, "");
    str = str.replace(subCh.sub, subCh.rpl);
    var strArr = str.split("");

    for (var i = 0; i < str.length; i++) {
        if (allowed.indexOf(strArr[i]) == -1) continue;
        if (i + 1 >= str.length) digraph.push(strArr[i] + subCh.nullCh);
        else if (strArr[i] == strArr[i + 1]) digraph.push(strArr[i] + subCh.nullCh);
        else digraph.push(strArr[i] + strArr[++i]);
    }
    dec_diagraph = digraph;
    console.log("dec diagraph"+dec_diagraph)
}



function getCharPosition(c) {
  var index = key.indexOf(c);
  var row = Math.floor(index / 5);
  var col = index % 5;
  return {
      row: row,
      col: col
  };
}

function getCharFromPosition(pos) {
  var index = pos.row * 5;
  index = index + pos.col;
  return key.charAt(index);
}

function decipherPair(str) {
  if (str.length != 2) return false;
  var pos1 = getCharPosition(str.charAt(0));
  var pos2 = getCharPosition(str.charAt(1));
  var char1 = "";

  // Same Column - Decrement 1 row, wrap around to bottom
  if (pos1.col == pos2.col) {
      pos1.row--;
      pos2.row--;
      if (pos1.row < 0) pos1.row = subCh.maxRow - 1;
      if (pos2.row < 0) pos2.row = subCh.maxRow - 1;
      char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
  } else if (pos1.row == pos2.row) { // Same row - Decrement 1 column, wrap around to right
      pos1.col--;
      pos2.col--;
      if (pos1.col < 0) pos1.col = subCh.maxCol - 1;
      if (pos2.col < 0) pos2.col = subCh.maxCol - 1;
      char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
  } else { // Box rules, use opposing corners (same as forward)
      var col1 = pos1.col;
      var col2 = pos2.col;
      pos1.col = col2;
      pos2.col = col1;
      char1 = getCharFromPosition(pos1) + getCharFromPosition(pos2);
  }
  console.log("char 1 "+char1)
  return char1;
}



//////////{ second decipher will be initiated}//////////////////
decipher(dec_diagraph)
function decipher(digraph) {
  if (!digraph) return false;
  var plaintext = [];
  for (var i = 0; i < digraph.length; i++) {
      plaintext.push(decipherPair(digraph[i]));
  }
   dec_playfair = plaintext
}
this.setState({decrtpted_text:dec_playfair})
 var g = dec_playfair
 var v =g.join("")
var sha = sha256(v)
console.log(sha)
this.setState({sha_receiver:sha})
}


///////////////////ONE TIME PAD DECRYPTION BELOW///////////////////////////////////////

           if(this.state.rec_tech=='otp'){

            var c_text = this.state.rec_cipher;
            //var r_tech = this.state.rec_tech;
            var r_key = this.state.rec_key
            var qw =""
           
            var mode ="decrypt"
            var codebook = [];
            codebook[0] = "a";
            codebook[1] = "b";
            codebook[2] = "c";
            codebook[3] = "d";
            codebook[4] = "e";
            codebook[5] = "f";
            codebook[6] = "g";
            codebook[7] = "h";
            codebook[8] = "i";
            codebook[9] = "j";
            codebook[10] = "k";
            codebook[11] = "l";
            codebook[12] = "m";
            codebook[13] = "n";
            codebook[14] = "o";
            codebook[15] = "p";
            codebook[16] = "q";
            codebook[17] = "r";
            codebook[18] = "s";
            codebook[19] = "t";
            codebook[20] = "u";
            codebook[21] = "v";
            codebook[22] = "w";
            codebook[23] = "x";
            codebook[24] = "y";
            codebook[25] = "z";
            codebook[26] = "A";
            codebook[27] = "B";
            codebook[28] = "C";
            codebook[29] = "D";
            codebook[30] = "E";
            codebook[31] = "F";
            codebook[32] = "G";
            codebook[33] = "H";
            codebook[34] = "I";
            codebook[35] = "J";
            codebook[36] = "K";
            codebook[37] = "L";
            codebook[38] = "M";
            codebook[39] = "N";
            codebook[40] = "O";
            codebook[41] = "P";
            codebook[42] = "Q";
            codebook[43] = "R";
            codebook[44] = "S";
            codebook[45] = "T";
            codebook[46] = "U";
            codebook[47] = "V";
            codebook[48] = "W";
            codebook[49] = "X";
            codebook[50] = "Y";
            codebook[51] = "Z";
            codebook[52] = "0";
            codebook[53] = "1";
            codebook[54] = "2";
            codebook[55] = "3";
            codebook[56] = "4";
            codebook[57] = "5";
            codebook[58] = "6";
            codebook[59] = "7";
            codebook[60] = "8";
            codebook[61] = "9";
            codebook[62] = "`";
            codebook[63] = "~";
            codebook[64] = "!";
            codebook[65] = "@";
            codebook[66] = "#";
            codebook[67] = "$";
            codebook[68] = "%";
            codebook[69] = "^";
            codebook[70] = "&";
            codebook[71] = "*";
            codebook[72] = "(";
            codebook[73] = ")";
            codebook[74] = "-";
            codebook[75] = "=";
            codebook[76] = "_";
            codebook[77] = "+";
            codebook[78] = "[";
            codebook[79] = "]";
            codebook[80] = "{";
            codebook[81] = "}";
            codebook[82] = "|";
            codebook[83] = "\\";
            codebook[84] = ";";
            codebook[85] = ":";
            codebook[86] = "'";
            codebook[87] = "\"";
            codebook[88] = ",";
            codebook[89] = ".";
            codebook[90] = "<";
            codebook[91] = ">";
            codebook[92] = "/";
            codebook[93] = "?";
            codebook[94] = " ";
            codebook[95] = "\n";
            codebook[96] = "\r";
            codebook[97] = "\t";
            codebook[98] = "–";
            codebook[99] = "—";
            
           
            function encode(text) {
              // Loop through each text character.
              var code = [];
              for (var i=0; i<text.length; i++) {
                // Check if the character is in the codebook, filter it out if it's not.
                if (codebook.indexOf(text[i]) !== -1) {
                  // Get the character's code number from the code book.
                  code[i] = codebook.indexOf(text[i]).toString();
                  // Prepend a leading zero if code number is in range 0-9.
                  if (code[i].length === 1) {
                    code[i] = "0" + code[i];
                  }
                }
              }
              return code.join("");
            }

            function decode(code) {
              // Split the code number string into an array where each item is 2 digits long.
              var codeLength = code.length / 2;
              code = code.match(/.{1,2}/g);
              // Loop through each two-digit code number.
              var text = [];
              for (var i=0; i<codeLength; i++) {
                // Convert the code from string to number format by multiplying by 1.
                code[i] *= 1;
                // Get the code number's character from the codebook.
                text[i] = codebook[code[i]];
              }
              //var qw = text.join("");
              //console.log(qw)

              return text.join("")
              
            }
           
            var message= c_text
            var key = r_key
            otp(message,key)
            function otp(message, key) {
              var codeMessage
              
              // Convert the message and key to number-encoded strings using the codebook.
              var codeKey = encode(key);
              // Only number-encode the message if using encrypt mode. In decrypt mode, the message should already be number-encoded.
               
              
              // The key should be at least the same length as the message.
             
              // Split both the code strings into arrays where each array item is 1 digit long.
              codeMessage = message.split("");
              codeKey = codeKey.split("");
              // Loop through each one-digit code number.
              var codeOutput = [];
              for (var i=0; i<codeMessage.length; i++) {
                // Convert the codes from string to number format by multiplying by 1.
                codeMessage[i] *= 1;
                codeKey[i] *= 1;
                
                // Perform the OTP decryption by subtracting the key code number from the message code number.
                if (mode == "decrypt") {
                  codeOutput[i] = (codeMessage[i] - codeKey[i]);
                  // Number must be a single digit in range 0-9.
                  // Use modular subtraction, modulo 10 - allow no carrying during subtraction.
                  // Allow no negative numbers. If number is negative, make it positive.
                  if (codeOutput[i] < 0) {
                    codeOutput[i] += 10;
                  }
                }
              }
              // If encrypting, return a number-encoded string. If decrypting, decode the number-encoded string to return the plaintext.
              var outputString = codeOutput.join("");
              if (mode == "decrypt") {
                 qw = decode(outputString);


              } else {
                return outputString;
              }
            }
           this.setState({decrtpted_text:qw})
           var sha = sha256(qw)
           console.log(sha)
           this.setState({sha_receiver:sha})
          }
///////////////////////////RAIL FENCE DECRYPTION BELOW/////////////////////////////////////

            if(this.state.technique=="railfence"){

              var ciphertext = this.state.rec_cipher
              var key = this.state.rec_key
              var decrypted_railfence=""

              Decrypt(ciphertext,key)
              
              function Decrypt(ciphertext,key) {
                  
                var pt = new Array(ciphertext.length);   
                var k=0;
                
                for(var line=0; line<key-1; line++){
                  var skip=2*(key-line-1);  
                  var j=0;
                    
                    for(var i=line; i<ciphertext.length;){
                        pt[i] = ciphertext.charAt(k++);
                        if((line==0) || (j%2 == 0)) i+=skip;
                       else i+=2*(key-1) - skip;  
                       j++;        
                    }
                }
                for(i=line; i<ciphertext.length; i+=2*(key-1)) pt[i] = ciphertext.charAt(k++);
                decrypted_railfence = pt.join("");
                console.log(decrypted_railfence)
            }
            this.setState({decrtpted_text:decrypted_railfence})
            }

///////////////////////////COLUMANR DECRYPTION BELOW///////////////////////////////////////

       if(this.state.rec_tech=='columnar'){

         
        var chars = "abcdefghijklmnopqrstuvwxyz";
        var decrpyted_otp =""
        var ciphertext = this.state.rec_cipher
        var keyword = this.state.rec_key
        
        Decrypt(ciphertext, keyword)
        function Decrypt(ciphertext, keyword) {
          var klen = keyword.length;
         // if (klen <= 1) {
           //   alert("keyword should be at least 2 characters long");
           //   return;
        //  }
         // if (ciphertext.length % klen != 0) {
          //    alert("ciphertext has not been padded, the result may be incorrect (incorrect keyword?).");
          //}
          // first we put the text into columns based on keyword length
          var cols = new Array(klen);
          var colLength = ciphertext.length / klen;
          for (i = 0; i < klen; i++) cols[i] = ciphertext.substr(i * colLength, colLength);
          // now we rearrange the columns so that they are in their unscrambled state
          var newcols = new Array(klen);
          var j = 0;
          var i = 0;
          while (j < klen) {
             var t = keyword.indexOf(chars.charAt(i));
              if (t >= 0) {
                  newcols[t] = cols[j++];
               var  arrkw = keyword.split("");
                  arrkw[t] = "_";
                  keyword = arrkw.join("");
              } else i++;
          }
          // now read off the columns row-wise
          var plaintext = "";
          for (i = 0; i < colLength; i++) {
              for (j = 0; j < klen; j++) {
                  plaintext += newcols[j].charAt(i);
              }
          }
          decrpyted_otp = plaintext;
          console.log(decrpyted_otp)
      }

      this.setState({decrtpted_text:decrpyted_otp})
      
       }

///////////////////////////////// RC4 DECRYPTION BELOW//////////////////////////

     if(this.state.rec_tech=='rc4'){
      
       var cipher_text= this.state.rec_cipher
       var rc4_key = this.state.rec_key

       var decrypted_rc4 =""

       var key = rc4_key
       var str = cipher_text 

       rc4(key,str)

       function rc4(key, str) {
        var s = [], j = 0, x, res = '';
        for (var i = 0; i < 256; i++) {
          s[i] = i;
        }
        for (i = 0; i < 256; i++) {
          j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
          x = s[i];
          s[i] = s[j];
          s[j] = x;
        }
        i = 0;
        j = 0;
        for (var y = 0; y < str.length; y++) {
          i = (i + 1) % 256;
          j = (j + s[i]) % 256;
          x = s[i];
          s[i] = s[j];
          s[j] = x;
          res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
        }
        decrypted_rc4 = res;
        console.log(decrypted_rc4)
      }

 this.setState({decrtpted_text:decrypted_rc4})

     }
      
      
}

/////////////////////////////RSA IMPLIMENTATION BELOW////////////////////////////////////////////////////////

rsa_generate_keys(event){

  event.preventDefault()
    var pub=""
    var pri =""
    var exp  =""
    var l =""
    var t =""
    var m =""
    var n =""
  const bigInt = require('big-integer')

 function randomPrime(bits) {
    const min = bigInt.one.shiftLeft(bits - 1);
    const max = bigInt.one.shiftLeft(bits).prev();
    
    while (true) {
      let p = bigInt.randBetween(min, max);
      if (p.isProbablePrime(256)) {
        return p;
      } 
    }
  }

  generate(250)

  function generate(keysize) {
    var e = bigInt(65537);
    let p;
    let q;
    let totient;

    
  
    do {
      console.log("here")
      p = randomPrime(keysize / 2);
      q = randomPrime(keysize / 2);
      
      totient = bigInt.lcm(
        p.prev(),
        q.prev()
      );
    } while (bigInt.gcd(e, totient).notEquals(1) || p.minus(q).abs().shiftRight(keysize / 2 - 100).isZero());

   // return {
     // e, 
     // n: p.multiply(q),
     // d: e.modInv(totient),

      
    //};
   // console.log(e.value)
    //console.log(p.multiply(q).value)
    //console.log(e.modInv(totient).value)

    var n = p.multiply(q)
    var d = e.modInv(totient)
    exp = e.value
    pub = n.value
    pri = d.value
    console.log("private key is"+pri)
    //console.log( typeof(pub))
    l = pub.toString()
    m = pri.toString()
    n = exp.toString()
  console.log(pub)
     
   //console.log(typeof(n)) //console.log(typeof(l))  
   //console.log(l)
   
    //t = bigInt(l)
    //console.log(t) 

 //   if(pub===t.value)
  // console.log("they are same bro")
  }

  //console.log(exp)
 // console.log(pub)
  //console.log(pri)

  //this.setState({rsapubkey:pub})
  //this.setState({rsa_pri_key:pri})
  //this.setState({exponent:exp})
  this.setState({power:"65537"})
 this.setState({rsapubkey:l})
 this.setState({rsa_pri_key:m})
 



 //console.log(exp)
//console.log(this.state.rsapubkey)
//console.log(this.state.rsa_pri_key)
//console.log(this.state.exponent)
}


rsa_encryption(event){
  
  event.preventDefault()
  const bigInt = require('big-integer')
  var e = bigInt(65537)

  var encrypted_message=""
  
  var mod =""
  
  var plaintext = this.state.rsa_plaintext
  
  var convert_key = this.state.rsapubkey
  
  var key = bigInt(convert_key)
  
  var encoded_message =""
  
  console.log(key)

  encode(plaintext)
  
  function encode(str) {
    var h =""
    const codes = str
      .split('')
      .map(i => i.charCodeAt())
      .join('');

    h= bigInt(codes);

    encoded_message =h
    
  }
    this.setState({coded_message:encoded_message.value})
    console.log(encoded_message)

   encrypt(encoded_message,key,e)
  function encrypt(encodedMsg, n, e) {
  
    var b =""
    b = bigInt(encodedMsg).modPow(e, n);
    mod = b.value
    console.log("encrypted message in object is"+ b)
    encrypted_message=b.value.toString()
    console.log("encrypted message in string is"+ encrypted_message)

   
  }
  this.setState({rsa_cipher_text:encrypted_message})
  //console.log(typeof(encrypted_message)+"here is type")
  this.setState({mod:mod})
}

rsa_send(event){
  
  event.preventDefault()
  this.setState({rsa_receiver_cipher:this.state.rsa_cipher_text})

}

rsa_decrypt(event){
  event.preventDefault()
  const bigInt = require('big-integer')

  var privatekey = bigInt(this.state.rsa_pri_key)
  var encryptedmessage = this.state.mod
  var publickey =bigInt(this.state.rsapubkey)

  var decrypted_message =""
  var plain=""
  //console.log("private key is"+ privatekey)
  
  decrypt(encryptedmessage,privatekey,publickey)
  function decrypt(encryptedMsg, d, n) {
    
    decrypted_message = bigInt(encryptedMsg).modPow(d, n); 
  }

  console.log(decrypted_message)

decode(decrypted_message)
  function decode(code) {
    const stringified = code.toString();
    let string = '';

    for (let i = 0; i < stringified.length; i += 2) {
      let num = Number(stringified.substr(i, 2));
      
      if (num <= 30) {
        string += String.fromCharCode(Number(stringified.substr(i, 3)));
        i++;
      } else {
        string += String.fromCharCode(num);
      }
    }

    plain = string;
    console.log(plain)
  }

this.setState({rsa_decrypted_cipher:plain})



}

/////////////////////////////////// DEFFI HELMEN IMPLIMENTATION BELOW/////////////////////////////////////


bob_alpha_set(event){

     this.setState({bob_alpha:event.target.value})
  }

bob_q_set(event){

    this.setState({bob_q:event.target.value})
  }

bob_xa_set(event){
   
   this.setState({bob_xa:event.target.value})
  }

alice_alpha_set(event){

  this.setState({alice_alpha:event.target.value})
 
 }

alice_q_set(event){

  this.setState({alice_q:event.target.value})
 }

alice_xa_set(event){
  
  this.setState({alice_xa:event.target.value})
 }

 bob_ya(event){

          event.preventDefault()

          var alpha =this.state.bob_alpha
          var x= this.state.bob_xa
          var q =this.state.bob_q

          var k =""
          var y =""

          k= Math.pow(alpha , x)% q
         console.log(k)
         this.setState({y_bob:k})


 }

 alice_ya(event){

         event.preventDefault()

         var alpha =this.state.alice_alpha
         var x= this.state.alice_xa
         var q =this.state.alice_q

         var k =""
         var y =""

         k= Math.pow(alpha , x)% q
         console.log(k)

         this.setState({y_alice:k})

 }

 send_bob_ya(event){

  event.preventDefault()

  this.setState({rec_bob_ya:this.state.y_bob})
 }

 send_alice_ya(event){

  event.preventDefault()
this.setState({rec_alice_ya:this.state.y_alice})
 }

 bob_sec(event){

event.preventDefault()
  var sec =""
  var y = this.state.rec_alice_ya
  var q = this.state.bob_q
  var x = this.state.bob_xa

  sec = Math.pow(y,x) % q
this.setState({bob_sec_key:sec})
 }

 alice_sec(event){
event.preventDefault()

var sec =""
var y = this.state.rec_bob_ya
var q = this.state.alice_q
var x = this.state.alice_xa

sec = Math.pow(y,x) % q
this.setState({alice_sec_key:sec})



 }


  render() {

    return (
      <div>
        <div className="row">
          <div className="col-lg-12 text-center" >
        <h1 class="text-center"><b>SECURE CHAT APPLICATION</b></h1>
        </div>
        </div>
        <div className="row">
        
          <div className="col-lg-6">
       
            <Sender sender_submit={this.submit_for_encryption}
                text_change={this.text} 
                key_change={this.key} 
                tech_change={this.tech} 
                cipher_text={this.state.cipher}
                message={this.send}
                mono={this.state.mono_key}
                sha={this.state.sha_sender}
                >
                  
                </Sender>
               
                </div>
          <div className="col-lg-6">
        
        <Receiver receiver_cipher={this.state.rec_cipher}
                  receiver_key={this.state.rec_key}
                  receiver_tech={this.state.rec_tech}
                  decrypt={this.decrypt_to_plain}
                  show_plain={this.state.decrtpted_text}
                  shaa={this.state.sha_receiver}
                  
        
        ></Receiver>
        </div>
        </div>
     

      <div className="rsa">
      
      <div className="container">
      <div className="row">
      <div className="col-lg-12 text-center">  
      <h1 class="text-center"><b>RSA IMPLIMENTATION BELOW</b></h1>
      <p>Click on Generate keys to generate public and private key and then enter plain textv to encrypt</p>
      <button class="btn btn-primary" onClick={this.rsa_generate_keys}>GENERATE KEYS</button>
      </div>
      </div>
      </div>
      <div className="row">
        
          <div className="col-lg-6">
      
              <RSA_SENDER
              pub={this.state.rsapubkey}
              rsa_text_change={this.rsa_text}
              rsa_encrypt={this.rsa_encryption}
              rsa_cipher={this.state.rsa_cipher_text}
              rsa_send={this.rsa_send}
            
              ></RSA_SENDER>
         </div>
      
         <div className="col-lg-6">
        
             <RSA_RECEIVER

             pri={this.state.rsa_pri_key}
             cipher={this.state.rsa_receiver_cipher}
             decrypt={this.rsa_decrypt}
             plain={this.state.rsa_decrypted_cipher}
            
             ></RSA_RECEIVER>
         </div>
      
    </div>

      </div>

      <div className="deffi_hellmen">

      <div className="container">
      <div className="row">
      <div className="col-lg-12 text-center">  
      <h1 class="text-center"><b>DEFFI HELMEN IMPLIMENTATION BELOW</b></h1>
      
      </div>
      </div>
      </div>
       
         <div className="row">

                 <div className="col-lg-6">
              
                        <BOB
                        
                        bob_alpha={this.bob_alpha_set}
                        bob_q={this.bob_q_set}
                        bob_xa={this.bob_xa_set}
                        bob_cal_ya={this.bob_ya}
                        y_bob={this.state.y_bob}
                        send_bob_ya={this.send_bob_ya}
                        ya_rec_alice={this.state.rec_alice_ya}
                        bob_sec_cal={this.bob_sec}
                        sec={this.state.bob_sec_key}
                        ></BOB>
                 </div>

                 <div className="col-lg-6">
              
                      <ALICE alice_alpha={this.alice_alpha_set}
                             alice_q={this.alice_q_set}
                             alice_xa={this.alice_xa_set}
                             alice_cal_ya={this.alice_ya}
                             y_alice={this.state.y_alice}
                             send_alice_ya={this.send_alice_ya}
                             ya_rec_bob={this.state.rec_bob_ya}
                             alice_sec_cal={this.alice_sec}
                             sec={this.state.alice_sec_key}
                      ></ALICE>
                </div>
             
      

      </div>

     </div>
  {/*  <div>  {this.state.rsapubkey}</div>
<div>{this.state.rsa_pri_key}</div>*/}
<div>{console.log(this.state)}</div>
    
     
      </div>
    );
  }
}

export default App;

