import { useState } from "react";
import styles from './YesNoToggle.module.css'

interface YesNoToggleProps {
    label: string;
    onChanged?: (Value: boolean) => void;
    name?: string;
}

export default function YesNoToggle({ label, onChanged, name = "yesNoGroup" }: YesNoToggleProps) {
    const [isYes, setIsYes] = useState<boolean | null>(null);

    const handleSelect = (value: boolean) => {
        setIsYes(value);
        if (onChanged) onChanged(value);
    }
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                    <input type="radio" name={name} className={styles.radioInput} checked={isYes === true} onChange={()=> handleSelect(true)} />
                    Sí
                </label>

            
                <label className={styles.radioLabel}>
                    <input type="radio" name={name} className={styles.radioInput} checked={isYes === false} onChange={()=> handleSelect(false)} />
                    No
                </label>
            </div>
        </div>
    )
}