import Styles from './Button.module.css'

interface ButtonProps{
    texto: string
    icono?: string
    variante?: 'primario' | 'secundario' | 'inverso'
    iconIzquierdo?: string
    tamaño?: 'pequeño' | 'normal' | 'grande'
    anchoCompleto?: boolean

    onclick?: () => void
}

export default function Button({texto,icono, variante= 'primario', iconIzquierdo, tamaño ='normal', anchoCompleto = false ,onclick}: ButtonProps){
    const classesTamaño = {
        pequeño: 'is-small',
        normal: '', 
        grande: 'is-large'
    };
    const claseAncho = anchoCompleto ? 'is-fullwidth' : '';
    return(
        <button className={`button ${claseAncho} ${classesTamaño[tamaño]}  ${variante ==='primario'? Styles.btnPrimario : variante==='secundario'? Styles.btnSecundario: Styles.btnInverso}`} onClick = {onclick}>
            {iconIzquierdo &&(
                <span className='icon is-small' style={{marginLeft: '8px'}}>
                    <i className={`fas ${iconIzquierdo}`}></i>
                </span>
            )}
            <span>{texto}</span>
            {icono && (
                <span className='icon is-small' style={{marginLeft: '8px'}}>
                    <i className={`fas ${icono}`}></i>
                </span>
            )}
            
            
        </button>

    )
}