import { useState, useRef, useEffect } from "react";   
import styles from './SearchableInput.module.css';

interface SearchableInputProps{
    label: string;
    placeholder: string;
    icon:string;
    options: string[];
    value: string;
    onChange: (value:string) => void;
}

export default function SearchableInput({label, placeholder, icon, options =[],value="", onChange}: SearchableInputProps){
    const [isOpen, setIsOpen]= useState(false);

    const filteredOptions = options.filter(option =>{
        if (!option) return false;
        return String(option).toLowerCase().includes(String(value).toLowerCase());
    });

    const handleSelect = (option: string) =>{
        onChange(option);
        setIsOpen(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);

            if(value !== ""){
                const coincidenciaExacta = options.find(
                    opt => opt && String(opt).toLowerCase() === String(value).toLowerCase()
                );

                if(coincidenciaExacta){
                    onChange(coincidenciaExacta);

                }else{
                    onChange("");
                }
            }
        }, 200);
    }

    return(
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <div>
                <input
                type="text"
                className={styles.input}
                placeholder={placeholder} 
                value={value}
                onChange={(e)=>{
                    onChange(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={()=> setIsOpen(true)}
                onBlur={handleBlur}
                />
                <span className={styles.iconLeft}>
                    <i className={`fas ${icon}`}></i>
                </span>
            </div>

            {isOpen &&(
                <ul className={styles.dropdown}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) =>(
                            <li key={index} className={styles.dropdownItem} onMouseDown={()=> handleSelect(option)}>
                                {option}
                            </li>
                        ))
                    ):(
                        <li className={styles.emptyResult}>No se encontraron resultados...</li>
                    )}
                </ul>
            )}
        </div>

    )
}

