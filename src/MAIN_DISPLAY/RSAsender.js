import React, { Component } from 'react';
import './RSAsender.css'

function RSAsender(props) {

    
    return (
        <div>
            
            <div className="rsa-sender-main">
            <div className="container">
            <h1 class="text-center" ><b>SENDER</b></h1>

            <form>
                        <div class="form-group">
                            <label for="enter_plain_text"><b>ENTER PLAIN TEXT:</b></label>
                            <input type="text" class="form-control" id="text" onChange={props.rsa_text_change} style={{'text-transform':'uppercase'}}></input>
                        </div>

                        <div>
                            <label for="public_key"><b>PUBLIC KEY:</b>{props.pub}</label>
                        </div>
  
                        <div>
                        <button  class="btn btn-primary" onClick={props.rsa_encrypt}>ENCRYPT</button>
                        </div>

                        <div>
                        <button  class="btn btn-primary" onClick={props.rsa_send}>SEND</button>
                        </div>

                        <div>
                        <label for="rsa_cipher"><b>CIPHER TEXT:</b>{props.rsa_cipher}</label>
                        </div>
            </form>            
            </div>
            </div>
           
        </div>
    );
}

export default RSAsender;