interface Props {
    options: string[];
    onChange: (e: string) => void;

    title?: string;
    icon?: string;
    isLoading?: boolean;
}

export default ({ options, onChange, title, icon, isLoading }: Props) => {
    return (
        <div className="field">
            
            <label className="label" style={{color: "var(--color-fuente)"}}>{title}</label>

            <div className={icon ? `control has-icons-left is-expanded` : ""}>
                
                <span className={`select ${isLoading ? "is-loading" : ""}`}>
                    <select
                        className="has-text-black"
                        style={{ backgroundColor: "var(--color-fondo)" }}
                        onChange={(e) => onChange(e.target.value)}>
                        {options.map((option, index) => (
                            <option key={`option-${index}`} value={index + 1}>{option}</option>
                        ))}
                    </select>
                </span>
                
                {icon ?
                    <span className="icon is-small is-left">
                        <i className={`${icon} has-text-black`}></i>
                    </span>
                    : <></>}

            </div>
        </div>
    );
}