import React, { Component } from 'react';
import './Sender.css'
function Sender(props) {

    if(props.mono){
      var a 
    a = (<p><b>KEY GENERATED FOR MONOALPHABATIC CIPHER:</b>{props.mono}</p>)
    }

    if(!props.mono){
      var z
      z = (<p><label for="key"><b>KEY</b></label> <input type="text" class="form-control" id="key" onChange={props.key_change}></input></p>)
    }
    return (
        <div className="main_sender">
            <div className="container">
                  <h1 className="text-center"><b>SENDER</b></h1>
                  <br></br>

                 
                  <form>
                        <div class="form-group">
                            <label for="enter_plain_text"><b>ENTER PLAIN TEXT</b></label>
                            <input type="text" class="form-control" id="text" onChange={props.text_change} style={{'text-transform':'uppercase'}}></input>
                        </div>
  
                        <div class="form-group">
    <p>{z}</p>
    <p>{a}</p>
                        </div>

                        <div class="form-group">
                            <div>
                        <label>
                             <b>SELECT FROM FOLLOWING TECHNIQUES</b>
                             
                            <select class="form-control" value={props.initial_tech} onChange={props.tech_change}>
                            <option value="caesercipher">Caeser Cipher</option>
                            <option value="monoalphabatic">Monoalphabetic</option>
                            <option value="polyalphabetic">Polyalphabetic</option>
                            <option value="hillcipher">Hill Cipher</option>
                            <option value="playfair">PlayFair</option>
                            <option value="otp">OTP</option>
                            <option value="railfence">Rail Fence</option>
                            <option value="columnar">Columnar</option>
                            <option value="des">DES</option>
                            <option value="aes">AES</option>
                            <option value="rc4">RC4</option>
                            
                            <option value="ecc">ECC</option>
                           
                           
                            </select>
                       </label>
                       </div>
                       </div>
                       
                      
                        <button  class="btn btn-primary" onClick={props.sender_submit}>ENCRYPT MESSAGE</button>
                        
                            <div className="cipher_set">
                            <div class="form-group">
                            <div>
                            <label for="cipher"><b>CIPHER TEXT:</b>{props.cipher_text}</label>
                            </div>
                            </div>
                            <div>

                            <div class="form-group" >
                            <label for="sha" className="sha-set"><b>SHA VALUE:</b>{props.sha}</label>
                            </div>
                            
                            </div>
                        
                        
                        </div>
                        <div class="form-group">
                        <div className="send_button">
                        <button  class="btn btn-primary" onClick={props.message}>SEND MESSAGE</button>
                        </div>
                        </div>
                 </form>

            </div>
        </div>
    );
}

export default Sender;