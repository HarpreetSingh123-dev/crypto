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
    <label for="rsa_cipher"><b>CIPHER TEXT:</b>{props.cipher}</label>
            </div>

            <div>
 
    <label for="rsa_cipher"><b>PRIVATE KEY:</b>{props.pri}</label>

            </div>
            
           <div>

           <button  class="btn btn-primary" onClick={props.decrypt}>DECRYPT</button>
           </div>
           
           <div>
    <label for="rsa_plain"><b>PLAIN TEXT:</b>{props.plain}</label>
           </div>

            </div>



            </form>
            </div>    
            </div>       
        </div>
    );
}

export default RSAreceiver;