import React from 'react';
import './Alice.css'
//import PropTypes from 'prop-types';



function Alice_Receiver(props) {
    return (
        <div>
           
           <div className="alice-main">
               
               <div className="container">

                 <h1 class="text-center"><b>ALICE</b></h1>

                 
                 <form>

                       <div class="form-group">
                                  <label for="value_of_alpha"><b>ENTER VALUE OF ALPHA:</b></label>
                                  <input type="number" class="form-control" id="num" onChange={props.alice_alpha}></input>
                       </div>

                       <div class="form-group">
                                 <label for="enter_plain_text"><b>ENTER VALUE OF Q:</b></label>
                                 <input type="number" class="form-control" id="num" onChange={props.alice_q}></input>
                      </div>


                      <div class="form-group">
                                <label for="enter_plain_text"><b>ENTER VALUE OF Xa:</b></label>
                                <input type="text" class="form-control" id="num" onChange={props.alice_xa}></input>
                     </div>

                     <div>
                        <button  class="btn btn-primary" onClick={props.alice_cal_ya}>CALCULATE Y(A)</button>
                    </div>

                    <div>
                        <label for="y_alice"><b>Y(A) OF ALICE</b>{props.y_alice}</label>
                    </div>

                    <div>
                        <button  class="btn btn-primary" onClick={props.send_alice_ya}>SEND Y(A)</button>
                        </div>

                        <div>
                            <label for="y_bob"><b>RECEIVED BOB Y(A)</b>{props.ya_rec_bob}</label>
                        </div>

                        <div>
                        <button  class="btn btn-primary" onClick={props.alice_sec_cal}>CALCULATE SECRET KEY</button>
                        </div>

                        <div>
                            <label for="y_bob"><b>SECRET KEY:</b>{props.sec}</label>
                        </div>
                  
                  </form>
               </div>
              


           </div>
        </div>
    );
}

export default Alice_Receiver;