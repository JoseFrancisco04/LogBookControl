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
            
            <label className="label" style={{
                color: "var(--color-fuente)", 
                fontSize: "var(--fuente-pequeña)", 
                marginBottom: "0.4rem",
                display: "block"
            }}>{title}</label>

            <div className={icon ? `control has-icons-left is-expanded` : "control is-expanded"}>
                
                <span className={`select is-fullwidth ${isLoading ? "is-loading" : ""}`} style={{ height: "3rem" }}>
                    <select
                        className="has-text-black"
                        style={{ backgroundColor: "var(--color-fondo)", height: "3rem", width: "100%" }}
                        onChange={(e) => onChange(e.target.value)}>
                        {options.map((option, index) => (
                            <option key={`option-${index}`} value={index + 1}>{option}</option>
                        ))}
                    </select>
                </span>
                
                {icon ?
                    <span className="icon is-small is-left" style={{height: "3rem"}}>
                        <i className={`${icon} has-text-black`}></i>
                    </span>
                    : <></>}

            </div>
        </div>
    );
}