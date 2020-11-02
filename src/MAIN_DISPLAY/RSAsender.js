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
                            <label for="public_key"><b>PRIVATE KEY OF SENDER BELOW:</b></label>
                          <div style={{'width':'600px','word-wrap':'break-word' }}>{props.pri}</div>
                        </div>

                        <div>
                            <label for="public_key"><b>PUBLIC KEY OF RECEIVER BELOW:</b></label>
                            <div style={{'width':'600px','word-wrap':'break-word' }}>{props.pub}</div>
                        </div>
  
                        
                        <div class="form-group">
                        <div>
                        <button  class="btn btn-primary" onClick={props.rsa_encrypt}>ENCRYPT</button>
                        </div>
                        </div>

                        <div class="form-group">
                        <div>
                        <button  class="btn btn-primary" onClick={props.rsa_send}>SEND</button>
                        </div>
                        </div>

                        <div class="form-group">
                        <div>
                        <label for="rsa_cipher"><b>CIPHER TEXT BELOW:</b></label>
                        <div style={{'width':'600px','word-wrap':'break-word' }}>{props.rsa_cipher}</div>
                        </div>
                        </div>

                        <div class="form-group">
                        <div>
                        <label for="rsa_cipher"><b>DIGITAL SIGNATURE GENERATED BELOW:</b></label>
                        <div style={{'width':'600px','word-wrap':'break-word' }}>{props.sig}</div>
                        </div>
                        </div>
            </form>            
            </div>
            </div>
           
        </div>
    );
}

export default RSAsender;