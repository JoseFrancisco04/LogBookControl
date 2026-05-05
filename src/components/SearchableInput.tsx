import { useState, useRef, useEffect } from "react";   
import styles from './SearchableInput.module.css';

interface SearchableInputProps{
    label: string;
    placeholder: string;
    icon:string;
    options: string[];
}

export default function SearchableInput({label, placeholder, icon, options}: SearchableInputProps){
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen]= useState(false);

    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())

    );

    const handleSelect = (option: string) =>{
        setSearchTerm(option);
        setIsOpen(false);
    };

    return(
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <div>
                <input
                type="text"
                className={styles.input}
                placeholder={placeholder} 
                value={searchTerm}
                onChange={(e)=>{
                    setSearchTerm(e.target.value);
                    setIsOpen(true);
                }}
                onFocus={()=> setIsOpen(true)}
                onBlur={()=> setTimeout(() => setIsOpen(false), 200)}
                />
                <span className={styles.iconLeft}>
                    <i className={`fas ${icon}`}></i>
                </span>
            </div>

            {isOpen &&(
                <ul className={styles.dropdown}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option, index) =>(
                            <li key={index} className={styles.dropdownItem} onClick={()=> handleSelect(option)}>
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

