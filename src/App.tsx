import {useState} from 'react'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <section className="section">
                <div className="columns">
                    <div className="column is-3">
                        <h1 className="title">Tu plantilla con {count} clicks</h1>
                        {/*Boton con icono*/}
                        <button className="button is-danger" onClick={() => setCount(count + 1)}>
                            <span className="icon is-small">
                                <i className="fa-solid fa-hat-wizard"></i>
                            </span>
                            <span>+1</span>
                        </button>
                    </div>
                    <div className="column">
                        <h1 className="title">aaaaaaaaaaaaaaaaaaaa</h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default App
