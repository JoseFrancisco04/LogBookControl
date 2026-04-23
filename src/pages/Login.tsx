import logoTec from '../assets/logoTec.png'
import Structure from '../components/Structure';
import styles from './Login.module.css'
import Button from '../components/Button.tsx';
import InputField from '../components/InputField.tsx';

function Login(){
    return(
         <Structure>
           <nav className={`navbar ${styles.navbar}`}>
                <div className={styles.navbarInner}>
                    <img src={logoTec} alt = "Logo Tec" className={styles.navbarLogo} />
                    <strong className={styles.navbarTitle}>
                        CENTRO DE CÓMPUTO -{' '}
                        <span className={styles.navbarAccent}>ACCESO AL SISTEMA</span>
                    </strong>
                </div>
            </nav>
           <section className={`section ${styles.section}`}> 
                <div className='container'>
                    <div className='columns is-centered'>
                        <div className='column is-4'>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                <img src={logoTec} alt="Logo Tec" className={styles.cardLogo} />
                                <p className={styles.cardTitulo}>ITSH</p>
                                <p className={styles.cardSubtitulo}>Acceso</p>
                            </div>
                            <div className={styles.cardBody}>
                                <InputField label="Usuario" placeholder="Ingrese su usuario" type='text' icon='fa-user' />
                                <InputField label="Contraseña" placeholder="••••••••" type='password' icon='fa-lock' iconRight='fa-eye' />
                                <Button texto="Iniciar Sesión" icono='fa-sign-in-alt' variante='primario' onclick={() => alert('Iniciando sesión...')} />

                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className={`footer ${styles.footer}`}>
                <div className={`footerContent ${styles.footerContent}`}>
                    <span className={styles.footerText}>
                        © 2024 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo
                    </span>
                </div>
            </footer>
         </Structure>
    )
}

export default Login;