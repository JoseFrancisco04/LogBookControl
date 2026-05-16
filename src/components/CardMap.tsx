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
                <div className={`card-content ${styles.cardContent}`}>
                    <div className="media">
                        <div className={`media-left" ${styles.iconBackground}`}>
                            <span className="icon is-large">
                                <i className="fa-solid fa-computer fa-fade fa-lg has-text-link"></i>
                            </span>
                        </div>
                        <div className="media-content">
                            <p className="title is-4 has-text-black">Laboratorio {laboratoryNumber}</p>
                            <p className="subtitle is-6 has-text-gray-darker">Clase en curso: {classInProgress}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}