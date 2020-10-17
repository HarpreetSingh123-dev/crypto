import React, { Component } from 'react';
import './Receiver.css'
function Receiver(props) {
    return (
        
            <div className="main_receiver">
            <div className="container">
                  <h1 className="text-center"><b>RECEIVER</b></h1>
                  <br></br>

                  <form>
                        <div class="form-group">
                           <label for="ciphertext"><b>CIPHERTEXT :</b>{props.receiver_cipher}</label>
                            
                        </div>
  
                        <div class="form-group">
                           <label for="key"><b>KEY :</b>{props.receiver_key}</label>
                            
                        </div>

                        <div class="form-group">
                        <label>
                             <b>TECHNIQUE USED :</b>{props.receiver_tech}
                             
                        {/*    <select class="form-control" value={props.initial_tech} onChange={props.tech_change}>
                            <option value="caesercipher">Caeser Cipher</option>
                            <option value="monoalphabatic">Monoalphabetic</option>
                            <option value="polyalphabetic">Polyalphabatic</option>
                            <option value="hillcipher">Hill Cipher</option>
                            <option value="playfair">PlayFair</option>
                            <option value="otp">OTP</option>
                            <option value="railfence">Rail Fence</option>
                            <option value="columnar">Columnar</option>
                            <option value="des">DES</option>
                            <option value="aes">AES</option>
                            <option value="rc4">RC4</option>
                            <option value="rsa">RSA</option>
                            <option value="ecc">ECC</option>
                            <option value="dhkey">DH for Key Exchange</option>
                           
    </select> */ }
                       </label>
                       </div>
                       
                       <div>
                           <div class="form-group" >
                        <button  class="btn btn-primary" onClick={props.decrypt}>DECRYPT MESSAGE</button>
                        </div>
                        </div>
                        <div className="plain_text_receiver">
                        <div class="form-group">
{/*<button  class="btn btn-primary" onClick={props.show_plain}>SHOW PLAIN TEXT:{props.show_plain}</button>*/}
                       <label for="plain_text_receiver"><b>PLAIN TEXT:</b>{props.show_plain}</label>
                          
                            
                        </div>
                            <div>
                               <div class="form-group">
                                  <label for="sha_receiver"><b>SHA VALUE:</b></label>
                               </div>
                            </div>
                        
                        </div>
                       

                        
                 </form>
        </div>
        </div>
    );
}

export default Receiver;