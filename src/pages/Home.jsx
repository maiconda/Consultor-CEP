import './index.css'

import React, {useState} from 'react'
import axios from "axios"
import Lupa from "../assets/lupa.png"

function Home(){

    let [cep, setCep] = useState('')
    let [historico, setHistorico] = useState([])
    

    const submitConsult = (e) => {
        e.preventDefault()
        consult()
    }

    const consult = (e) => {
        document.getElementById('input').value = ''
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res)=>{

            if(res.data.erro === true){
                openErrorCard()
            } else {
                
                if(historico.length < 7){
                    setHistorico([{cep: res.data.cep}, ...historico])
                } else {
                    setHistorico([{cep: res.data.cep}, historico[0], historico[1], historico[2], historico[3], historico[4], historico[5], historico[6]])
                }

                document.getElementById('text-3').style.display = 'block'

                print(res.data.cep,res.data.localidade,res.data.bairro,res.data.uf,res.data.logradouro,res.data.ddd,res.data.ibge,res.data.siafi, res.data.complemento)
                
            }

        }).catch((err) => {
            openErrorCard()
        })
    }

    const buttonConsult = () => {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res)=>{
            print(res.data.cep,res.data.localidade,res.data.bairro,res.data.uf,res.data.logradouro,res.data.ddd,res.data.ibge,res.data.siafi, res.data.complemento)
        })
    }

    const print = (cep, city, neighborhood, state, street, ddd, ibge, siafi, complemento) => {


        document.getElementById('cep-title').innerText = cep

        document.getElementById('resposta').style.display = 'flex'

        document.getElementById('cidade').innerHTML = `
        <p><b>Cidade:</b> ${city}</p>`
        document.getElementById('cep').innerHTML = `
        <p><b>CEP:</b> ${cep}</p>`

        if (neighborhood === '') {
            document.getElementById('bairro').style.display = 'none'
        } else {
            document.getElementById('bairro').style.display = 'block'
            document.getElementById('bairro').innerHTML = `
            <p><b>Bairro:</b> ${neighborhood}</p>`
        }

        if (street === '') {
            document.getElementById('rua').style.display = 'none'
        } else {
            document.getElementById('rua').style.display = 'block'
            document.getElementById('rua').innerHTML = `
            <p><b>Rua:</b> ${street}</p>`
        }

        if (complemento === '') {
            document.getElementById('complemento').style.display = 'none'
        } else {
            document.getElementById('complemento').style.display = 'block'
            document.getElementById('complemento').innerHTML = `
            <p><b>Complemento:</b> ${complemento}</p>`
        }

        document.getElementById('estado').innerHTML = `
        <p><b>Estado:</b> ${state}</p>`
        document.getElementById('ddd').innerHTML = `
        <p><b>DDD:</b> ${ddd}</p>`
        document.getElementById('ibge').innerHTML = `
        <p><b>IBGE:</b> ${ibge}</p>`
        document.getElementById('siafi').innerHTML = `
        <p><b>SIAFI:</b> ${siafi}</p>`
    }

    const openErrorCard = () => {
        document.getElementById('aviso-section').style.display = 'flex'
    }

    const closeErrorCard = () => {
        document.getElementById('aviso-section').style.display = 'none'
    }

    const closeCard = () => {
        document.getElementById('resposta').style.display = 'none'
        setCep('')
    }

    return(
        <div>
            <section id='aviso-section'>
                <div id='aviso'>
                    <p>CEP indisponível ou inválido</p>
                    <button onClick={closeErrorCard}>Fechar</button>
                </div>
            </section>
            <section id='resposta'>
                <div id='resposta-div'>
                    <div className='titulo-cep'>
                        <h1 id='cep-title'>89595000</h1>
                    </div>
                    <div className='informacoes'>
                        <p id='cidade'></p>
                        <p id='cep'></p>
                        <p id='bairro'></p>
                        <p id='rua'></p>
                        <p id='complemento'></p>
                        <p id='estado'></p>
                        <p id='ddd'></p>
                        <p id='ibge'></p>
                        <p id='siafi'></p>
                        <button onClick={closeCard}>Fechar</button>
                    </div>
                </div>
            </section>
            <section className='busca'>
                <header>
                    <svg fill="#000000" version="1.1" id="logo-svg" width="36px" viewBox="0 0 395.71 395.71">
                    <g>
                        <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738   c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388   C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191   c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"/>
                    </g>
                    </svg>
                    <p id='logo-1'>Consultar</p>
                    <p id='logo-2'>CEP</p>
                </header>

                <div className='form-div'>
                    <div>
                        <h2 id='text-1'>Consultor de CEPS de todo o Brasil</h2>
                        <h3 id='text-2'>Faça a consulta do CEP desejado em um clique</h3>
                    <form onSubmit={submitConsult}>
                            <input placeholder='Informe o CEP' id='input' onChange={(e)=> setCep(e.target.value.replace(/[^0-9]/g,''))} type="text"/>
                            <button id='button-lupa'><img id='img-lupa' src={Lupa} alt="" /></button>
                    </form>
                        <h3 id='text-3'>Histórico de CEPS</h3>
                        <div id='buttons'>
                            {historico.map((cep, index) => (
                                <button onClickCapture={() => setCep(cep.cep.replace(/[^0-9]/g,''))} onClick={buttonConsult} key={index}>{cep.cep}</button>
                            ))}
                        </div>
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Home