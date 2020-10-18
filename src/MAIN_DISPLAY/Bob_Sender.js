import React from 'react';
import './Bob.css'
//import PropTypes from 'prop-types';



function Bob_Sender(props) {
    return (
        <div>
            
           <div className="bob-main">

             <div className="container">

                 <h1 class="text-center"><b>BOB</b></h1>

                 <form>

                        <div class="form-group">
                            <label for="value_of_alpha"><b>ENTER VALUE OF ALPHA:</b></label>
                            <input type="number" class="form-control" id="num" onChange={props.bob_alpha}></input>
                        </div>

                        <div class="form-group">
                            <label for="enter_plain_text"><b>ENTER VALUE OF Q:</b></label>
                            <input type="number" class="form-control" id="num" onChange={props.bob_q}></input>
                        </div>

                        <div class="form-group">
                            <label for="enter_plain_text"><b>ENTER VALUE OF Xa:</b></label>
                            <input type="number" class="form-control" id="num" onChange={props.bob_xa}></input>
                        </div>

                        <div>
                        <button  class="btn btn-primary" onClick={props.bob_cal_ya}>CALCULATE Y(A)</button>
                        </div>

                        <div>
                            <label for="y_bob"><b>Y(A) OF BOB</b>{props.y_bob}</label>
                        </div>

                        <div>
                        <button  class="btn btn-primary" onClick={props.send_bob_ya}>SEND Y(A)</button>
                        </div>

                        <div>
                            <label for="y_bob"><b>RECEIVED ALICE Y(A)</b>{props.ya_rec_alice}</label>
                        </div>

                        <div>
                        <button  class="btn btn-primary" onClick={props.bob_sec_cal}>CALCULATE SECRET KEY</button>
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

export default Bob_Sender;