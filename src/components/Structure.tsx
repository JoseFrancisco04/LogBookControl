import fondo from '../assets/fondo2.png'
import styles from './Structure.module.css'
import logoCarrera from '../assets/isc.png'

interface StructureProps {
    children: React.ReactNode;
    title?: string;
    footerText?: string;
    navbarActions?: React.ReactNode;
    footerActions?: React.ReactNode;


}


function Structure({
    children,
    title = "",
    footerText = "",
    navbarActions,
    footerActions

}: StructureProps) {
    return (
        <>
            <div className={styles.wrapper}>
                <div className={`navbar ${styles.navbar}`}>
                    <div className={styles.navbarInner}>
                        <div className={styles.navbarLeft}>
                            <img src={logoCarrera} alt="Logo Tec" className={styles.navbarLogo} />
                        </div>
                        <div className={styles.navCenter}>
                            <strong className={styles.navbarTitle}>
                                CENTRO DE CÓMPUTO -{' '}
                                <span className={styles.navbarAccent}>{title}</span>
                            </strong>
                        </div>
                        <div className={styles.navRight}>
                             {navbarActions}
                        </div>
                    </div>
                </div>

                <img
                    src={fondo}
                    alt=""
                    className={styles.fondo}
                />
                {children}

                <footer className={`footer ${styles.footer}`}>
                    <div className={`footerContent ${styles.footerContent}`}>
                        <span className={styles.footerText}>
                            {footerText}
                        </span>
                        <div className={styles.footerActions}>
                            {footerActions}
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Structure;