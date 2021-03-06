import styles from './Input.css'
import React from 'react'

const Input = (props) => {
    let inputElement = null
    const inputClasses=[styles.InputElement];

    if(props.invalid &&props.shouldValid && props.touched){
        inputClasses.push(styles.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (<select
                onChange={props.changed}
                className={inputClasses.join(' ')}
                value={props.value}>
                {props.elementConfig.options.map(opt => (
                    <option
                        key={opt.value}
                        value={opt.value}>
                        {opt.displayValue}
                    </option>
                ))}
            </select>);
            break;
        default:
            inputElement = <input
             className={inputClasses.join(' ')} {...props.elementConfig}
             onChange={props.changed} value={props.value}  />;
            break;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;