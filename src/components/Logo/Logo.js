import React from 'react' 
import burgerLogo from '../../assets/images/logo.png'
import styles from './Logo.css'
import { checkPropTypes } from 'prop-types';

const logo=(props)=>(
    <div>
        <img className={styles.Logo} src={burgerLogo} style={{height:props.height,top:props.top,left:props.left}}
         alt="Burger Builder!"/>
    </div>
)

export default logo;