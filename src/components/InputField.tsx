import { useState } from 'react'
import Styles from './InputField.module.css'

interface InputFieldProps {
    label: string
    placeholder: string
    type: string
    icon: string
    iconRight?: string

    value?: string
    onChange?: (value: string) => void
}

export default function InputField({ label, placeholder, type, icon, iconRight, value, onChange }: InputFieldProps) {
    const [mostrarContraseña, setMostrarContraseña] = useState(false)

    const tooglePassword = () => {
        setMostrarContraseña(!mostrarContraseña)
    }

    const inputType = type === 'password' && mostrarContraseña ? 'text' : type

    const iconoOjo = mostrarContraseña ? 'fa-eye-slash' : 'fa-eye'

    return (
        <div className={`field  ${Styles.field}`}>
            <label className={`label ${Styles.label}`}>{label}</label>
            <div className={`control has-icons-left ${iconRight ? 'has-icons-right' : ''}`}>
                <input 
                    className={`input ${Styles.input}`} 
                    type={inputType} 
                    placeholder={placeholder}
                    value={value} 
                    onChange={(e)=> onChange && onChange(e.target.value)}
                    onClick={(e) => {
                        if (type === 'time' || type === 'date') {
                            try {
                                (e.target as HTMLInputElement).showPicker();
                            } catch (err) {
                                // showPicker is not supported in some older browsers
                            }
                        }
                    }}
                />
                <span className={`icon is-left ${Styles.iconLeft}`}>
                    <i className={`fas ${icon}`}></i>
                </span>
                {iconRight && (
                    <span className={`icon is-right ${Styles.iconRight}`} >
                        <i className={`fas ${iconoOjo}`} onClick={tooglePassword} style={{ cursor: 'pointer' }}></i>
                    </span>
                )}
            </div>
        </div>
    )
}