import Styles from './Button.module.css'

interface ButtonProps{
    texto: string
    icono?: string
    variante?: 'primario' | 'secundario'

    onclick?: () => void
}

export default function Button({texto,icono, variante= 'primario', onclick}: ButtonProps){
    return(
        <button className={`button is-fullwidth ${variante ==='primario'? Styles.btnPrimario : Styles.btnSecundario}`} onClick = {onclick}>
            {texto}
            {icono &&(
                <span className='icon is-small' style={{marginLeft: '8px'}}>
                    <i className={`fas ${icono}`}></i>
                </span>
            )}
        </button>

    )
}