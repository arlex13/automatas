import { useState, useEffect } from "react"
import "./App.css"
import AUTOMATA from "./automata"
import q0 from "/assets/img/q0.png"
import q1 from "/assets/img/q1.png"
import q2 from "/assets/img/q2.png"
import q3 from "/assets/img/q3.png"
import q4 from "/assets/img/q4.png"
import q5 from "/assets/img/q5.png"
import q6 from "/assets/img/q6.png"
import q7 from "/assets/img/q7.png"
import q8 from "/assets/img/q8.png"
import q9 from "/assets/img/q9.png"
import q10 from "/assets/img/q10.png"

function App() {
  const [palabra, setpalabra] = useState("")
  const [aceptada, setaceptada] = useState("¡Bienv")
  const [noAceptada, setnoAceptada] = useState("enido!")
  const [funcionExtendida, setfuncionExtendida] = useState([{ dato: "Δ(q0, Ɛ) = q0" }])
  const [estadoActual, setestadoActual] = useState("q0")

  const tablaDeTransicion = ({ estadoActual, entrada }) => {
    if (AUTOMATA.hasOwnProperty(estadoActual)) {
      estadoActual = AUTOMATA[estadoActual]
      const index = estadoActual.entrada_posible.indexOf(entrada)
      if (index > -1) {
        const estadoSiguiente = estadoActual.estado_siguiente[index]
        const { final = false } = AUTOMATA[estadoSiguiente]
        return { estadoSiguiente, final }
      } else {
        return {}
      }
    }
  }

  useEffect(() => {
    const transicion = [{ estado: "q0", entrada: "Ɛ", final: false }]
    let aceptada = ""
    let noAceptada = ""
    if (palabra.length > 0) {
      let estadoActual = "q0"
      for (let i = 0; i < palabra.length; i++) {
        const entrada = palabra[i]
        const { estadoSiguiente, final = false } = tablaDeTransicion({ estadoActual, entrada })
        if (estadoSiguiente) {
          estadoActual = estadoSiguiente
          if (final) {
            aceptada = palabra.substr(0, i + 1)
          }
          noAceptada = palabra.substr(aceptada.length, palabra.length)
          transicion.push({ estado: estadoActual, entrada, final })
        } else {
          noAceptada = palabra.substr(aceptada.length, palabra.length)
          break
        }
      }
      setaceptada(aceptada)
      setnoAceptada(noAceptada)

      if (transicion.length > 1) {
        let _funcionExtendida = [{ dato: "Δ(q0, Ɛ) = q0" }]
        for (let i = 1; i < transicion.length; i++) {
          const element = transicion[i]
          _funcionExtendida.push({
            dato: funcionT({ transicion, estado: element.estado, entrada: element.entrada, index: i }),
            valido: element.final,
          })
        }
        setfuncionExtendida(_funcionExtendida)
      }
    }
    setestadoActual(transicion[transicion.length - 1].estado)
  }, [palabra])

  const funcionT = ({ transicion, estado, entrada, index }) => {
    let dato = `Δ(q0, ${palabra.substr(0, index)}) = `
    if (index == 1) {
      dato += `δ(Δ(q0,Ɛ)`
    } else {
      dato += `δ(Δ(q0,${palabra.substr(0, index - 1)})`
    }
    dato += `, ${entrada}) = δ(${transicion[index - 1].estado}, ${entrada}) = ${estado}`
    return dato
  }

  const IngresarCaracter = (e) => {
    setpalabra((value) => (value + e.target.innerHTML).replace(/ /g, ""))
  }
  const VaciarTexto = () => {
    setfuncionExtendida([{ dato: "Δ(q0, Ɛ) = q0" }])
    setpalabra("")
    setaceptada("¡Bienv")
    setnoAceptada("enido!")
  }
  const EliminarCaracter = () => {
    if (palabra.length == 1) {
      VaciarTexto()
    } else {
      setpalabra((value) => value.slice(0, -1))
    }
  }

  return (
    <>
      <div class="row my-3">
        <div className="col-12 d-flex justify-content-center ">
          <span class="display-4 text-info">
            {aceptada}
            <span class="display-4 text-danger ">{noAceptada}</span>
          </span>
        </div>
        <div className="col-12 d-flex justify-content-center ">{/* <p class="bold text-info">Ingrese una palabra</p> */}</div>
      </div>
      <div class="row justify-content-center">
        <div className="col-4  ">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">Σ</span>
            </div>
            <div class="form-control py-0" aria-label="With textarea">
              <button type="button" class="mx-1 btn btn-secondary btn-sm" onClick={IngresarCaracter}>
                u
              </button>
              <button type="button" class="mx-1 btn btn-secondary btn-sm" onClick={IngresarCaracter}>
                m
              </button>
              <button type="button" class="mx-1 btn btn-secondary btn-sm" onClick={IngresarCaracter}>
                g
              </button>
            </div>
          </div>
        </div>
        <div className="col-4 align-items-center d-flex">
          <button type="button" class="mx-1 btn btn-success btn-sm" onClick={EliminarCaracter}>
            Eliminar
          </button>
          <button type="button" class="mx-1 btn btn-danger btn-sm" onClick={VaciarTexto}>
            Vaciar
          </button>
        </div>
      </div>
      <div class="row justify-content-center">
        <div className="col-8  ">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">
                W
              </span>
            </div>
            <div type="text" class="form-control" placeholder="Ingrese una palabra." aria-label="Username" aria-describedby="basic-addon1">
              {palabra}
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center mb-4">
        {palabra && (
          <div className="col-8">
            {funcionExtendida.length - 1 == palabra.length && funcionExtendida[funcionExtendida.length - 1]?.valido ? (
              <div class="alert alert-info my-0 py-0" role="alert">
                Cadena aceptada.
              </div>
            ) : (
              <div class="alert alert-danger my-0 py-0" role="alert">
                Cadena no aceptada.
              </div>
            )}
          </div>
        )}
      </div>

      <div class="row justify-content-center" style={{ background: funcionExtendida.length - 1 != palabra.length ? "#ff0000" : "#04407c" }}>
        <div className="col-12 text-center">
          <h2 class="section-heading text-uppercase text-white fw-normal py-0 my-0">AUTOMATA</h2>

          {estadoActual == "q0" && <img src={q0} id="umg" width="75%" />}
          {estadoActual == "q1" && <img src={q1} id="umg" width="75%" />}
          {estadoActual == "q2" && <img src={q2} id="umg" width="75%" />}
          {estadoActual == "q3" && <img src={q3} id="umg" width="75%" />}
          {estadoActual == "q4" && <img src={q4} id="umg" width="75%" />}
          {estadoActual == "q5" && <img src={q5} id="umg" width="75%" />}
          {estadoActual == "q6" && <img src={q6} id="umg" width="75%" />}
          {estadoActual == "q7" && <img src={q7} id="umg" width="75%" />}
          {estadoActual == "q8" && <img src={q8} id="umg" width="75%" />}
          {estadoActual == "q9" && <img src={q9} id="umg" width="75%" />}
          {estadoActual == "q10" && <img src={q10} id="umg" width="75%" />}
        </div>
      </div>

      <div class="text-center my-3">
        <h2 class="section-heading text-uppercase">FUNCIONES EXTENDIDAS</h2>
        {funcionExtendida.map((item, index) => {
          return (
            <div
              class={`alert py-1 px-4 text-left mb-1 ${
                funcionExtendida.length - 1 == palabra.length
                  ? item?.valido && funcionExtendida.length == index + 1
                    ? "alert-info"
                    : "alert-secondary"
                  : funcionExtendida.length == index + 1
                  ? "alert-danger"
                  : "alert-secondary"
              }`}
              role="alert"
            >
              {item.dato}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default App
