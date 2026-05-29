import logoTec from '../assets/logoTec.png'
import Structure from '../components/Structure';
import styles from './Login.module.css'
import Button from '../components/Button.tsx';
import InputField from '../components/InputField.tsx';
import { useNavigate } from 'react-router-dom';
import {login} from '../services/AuthService.ts';
import { useState } from 'react';


function Login() {
    const navigate = useNavigate();
    const [num_control, setNum_control] = useState ('');
    const [contraseña, setContraseña] = useState('');

    const [error, setError]= useState <string | null>(null);
    const [charging, setCharging] = useState(false);

    // Simulacion de inicio de sesión
    const handleLogin = async(e?: React.FormEvent) => {

        if(e){
            e.preventDefault();
        }

        if(!num_control.trim() || !contraseña.trim()){
            setError("Por favor, completa todos los campos.");
            return;
        }

        try{
            setCharging(true);
            setError(null);

            const response = await login({num_control, contraseña});

            localStorage.setItem('token', response.token);
            localStorage.setItem('rol', response.usuario.rol);
            localStorage.setItem('num_control', response.usuario.num_control);
            const rolUsuario = response.usuario.rol.toLowerCase();


            if(rolUsuario === 'admin'){
                navigate('/admin', {replace: true});

            }else if (rolUsuario === 'bitacora'){
                navigate('/bitacora', {replace: true})
                console.log("exito de sesion",rolUsuario);

            }else{
                navigate('/admin', {replace: true})
            }

        }catch(err: any){
            setError(err.message || "No se puedo iniciar sesión")

        }finally{
            setCharging(false);
        }
        // Simulamos que el inicio fue exitoso guardando una bandera en el navegador
        //localStorage.setItem('isLoggedIn', 'true');

        //navigate('/FormLogBook');
    };

    return (
        <Structure title='INICIO DE SESIÓN' footerText='© 2026 Instituto Tecnológico Superior de Huauchinango | Centro de Cómputo | Inicio de Sesión'
            navbarActions={<>
                <Button texto="Ver Horarios" variante="inverso" icono="fas fa-map-signs" onclick={() => navigate(-1)}></Button>
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
                                    {error && (
                                        <div className={styles.error}>
                                            {error}
                                        </div>

                                    )}
                                    <InputField label="Usuario" placeholder="Ingrese su usuario" type='text' icon='fa-user' value={num_control} onChange={(val) => setNum_control(val)}/>
                                    <InputField label="Contraseña" placeholder="••••••••" type='password' icon='fa-lock' value={contraseña} iconRight='fa-eye'onChange={(val)=>setContraseña(val)} />
                                    <div style={{ marginTop: '1.5rem' }}>
                                        <Button texto={charging ? "Iniciando...":"Iniciar sesión"} icono={charging ? "fa-spinner fa-spin":"fa-sign-in-alt"} variante='primario' anchoCompleto={true} onclick={handleLogin} />
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