import React from 'react';
import './RSAreceiver.css'

function RSAreceiver(props) {
    return (
        <div>
            
            <div className="rsa-receiver-main">
            <div className="container">
            <h1 class="text-center" ><b>RECEIVER</b></h1>

            <form>
    
            <div class="form-group">
            
            <div>
                <label for="rsa_cipher"><b>CIPHER TEXT BELOW:</b></label>
                <div>{props.cipher}</div>
            </div>
            </div>

            <div class="form-group">
            <div>
 
                 <label for="rsa_cipher"><b>PRIVATE KEY OF RECEIVER BELOW:</b></label>
                 <div style={{'width':'600px','word-wrap':'break-word' }} >{props.pri}</div>

            </div>
            </div>

            <div class="form-group">
            <div>
 
                   <label for="rsa_cipher"><b>PUBLIC KEY OF SENDER BELOW:</b></label>
                   <div style={{'width':'600px','word-wrap':'break-word' }}>{props.pub}</div>

            </div>
            </div>

            <div class="form-group">
           <div>
               <label for="rsa_plain"><b>RECEIVED DIGITAL SIGNATURE BELOW:</b></label>
               <div style={{'width':'600px','word-wrap':'break-word' }}>{props.dig}</div>
           </div>
           </div>

           <div class="form-group">
           <div>

                <button  class="btn btn-primary" onClick={props.decrypt}>DECRYPT</button>
           </div>
           </div>
           
           <div class="form-group">
           <div>
               <label for="rsa_plain"><b>PLAIN TEXT:</b>{props.plain}</label>
               
           </div>
           </div>

           <div class="form-group">
           <div>
               <label for="rsa_plain"><b>IS SIGNATURE VERIFIED:</b>{props.verify}</label>
               
           </div>
           </div>
           
           



            </form>
            </div>    
            </div>       
        </div>
    );
}

export default RSAreceiver;