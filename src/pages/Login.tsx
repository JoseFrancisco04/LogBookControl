import logoTec from '../assets/logoTec.png'
import Structure from '../components/Structure';
import styles from './Login.module.css'
import Button from '../components/Button.tsx';
import InputField from '../components/InputField.tsx';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();

    // Simulacion de inicio de sesión
    const handleLogin = () => {
        // Simulamos que el inicio fue exitoso guardando una bandera en el navegador
        localStorage.setItem('isLoggedIn', 'true');

        navigate('/admin');
    };

    return (
        <Structure title='INICIO DE SESIÓN' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Inicio de Sesión'
            navbarActions={<>
                <Button texto="Ver Horarios" variante="inverso" icono="fas fa-map-signs" onclick={() => navigate("/")}></Button>
            </>}>
            <section className={`section ${styles.section}`}>
                <div className='container'>
                    <div className='columns is-centered'>
                        <div className='column is-4'>
                            <div className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <img src={logoTec} alt="Logo Tec" className={styles.cardLogo} />
                                    <p className={styles.cardTitulo}>ITSH</p>
                                    <p className={styles.cardSubtitulo}>Acceso al Sistema</p>
                                </div>
                                <div className={styles.cardBody}>
                                    <InputField label="Usuario" placeholder="Ingrese su usuario" type='text' icon='fa-user' />
                                    <InputField label="Contraseña" placeholder="••••••••" type='password' icon='fa-lock' iconRight='fa-eye' />
                                    <div style={{ marginTop: '1.5rem' }}>
                                        <Button texto="Iniciar Sesión" icono='fa-sign-in-alt' variante='primario' anchoCompleto={true} onclick={handleLogin} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Structure>
    )
}

export default Login;