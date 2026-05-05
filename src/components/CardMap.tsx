import styles from "./CardMap.module.css"

interface Props {
    laboratoryNumber: string;
    classInProgress: string;

    onClick: () => void;
}

export default ({ laboratoryNumber, classInProgress, onClick }: Props) => {
    return (
        <div className={`column is-4 ${styles.columLaboratory}`}>
            <div className={`card ${styles.cardLaboratory}`} onClick={onClick}>
                <div className="card-content">
                    <div className="media">
                        <div className="media-left">
                            <span className="icon is-large">
                                <i className="fa-solid fa-computer fa-bounce fa-2x"></i>
                            </span>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">Laboratorio {laboratoryNumber}</p>
                            <p className="subtitle is-6">Clase en curso: {classInProgress}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}