import fondo from '../assets/fondo2.png'
import styles from './Structure.module.css'

function Structure({children}:{children:React.ReactNode}) {
    return(
        <div className={styles.wrapper}>
            <img
            src = {fondo}
            alt = ""
            className={styles.fondo}
            />
            {children}
        </div>
    )
}

export default Structure;