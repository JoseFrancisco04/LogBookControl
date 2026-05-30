import styles from './YesNoToggle.module.css'

interface YesNoToggleProps {
    label: string;
    onChanged?: (Value: boolean) => void;
    value?: boolean;
    name?: string;
}

export default function YesNoToggle({ label, onChanged,value, name = "yesNoGroup" }: YesNoToggleProps) {

    const handleSelect = (newValue: boolean) => {
        if (onChanged) onChanged(newValue);
    }
    return (
        <div className={styles.field}>
            <label className={styles.label}>{label}</label>
            <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                    <input type="radio" name={name} className={styles.radioInput} checked={value === true} onChange={()=> handleSelect(true)} />
                    Sí
                </label>
            
                <label className={styles.radioLabel}>
                    <input type="radio" name={name} className={styles.radioInput} checked={value === false} onChange={()=> handleSelect(false)} />
                    No
                </label>
            </div>
        </div>
    )
}