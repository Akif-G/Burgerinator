import React, { Fragment } from "react";
import sytles from './Backdrop.css'

const Backdrop=(props)=>(
     props.show ? <div className={sytles.Backdrop} onClick={props.takeBack}/>:null
);

export default Backdrop;