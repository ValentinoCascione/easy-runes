import React, { Component } from 'react'
import RunesData from '../datas/runes.json'
import Informations from './Informations.js'

class Puits extends Component {
    constructor() {
        super()
        this.state = {
            puits: null,
            rune: null,
            times: 1,
            infos: []
        }
    }

    myPuits = () => {
        const inputPuits = document.querySelector('.input-puits')
        this.setState({ puits: parseInt(inputPuits.value) })
    }

    keyPressedPuits = (event) => {
        if (event.key === "Enter") {
            this.myPuits()
          }
    }

    RuneKeyUp = () => {
        const inputRune = document.querySelector('.input-rune')
        this.setState({ rune: inputRune.value.toLowerCase() })
    }

    TimesKeyUp = () => {
        const inputTimes = document.querySelector('.input-times')
        this.setState({ times: parseInt(inputTimes.value) })
    }

    ChangePuits = () => {
        RunesData.map(el => {
            if (el.name === this.state.rune) {
                this.setState({ puits: this.state.puits - (el.weight * this.state.times) })
                this.state.infos.push(<Informations runes={this.state.rune} times={this.state.times}/>)
            }
        })
    }

    addRuneWord = () => {
        const inputRune = document.querySelector('.input-rune')
        const searchRunes = document.querySelectorAll('.search-runes p')
        searchRunes.forEach(e => {
            e.addEventListener('click', event => {
               this.setState({ rune: e.innerHTML })
            })
        })
    }

    render() {
        if (typeof this.state.puits === 'number') {
        return (
        <div>
            <h1>Voici votre puits: {this.state.puits}</h1>
            <input onKeyUp={this.RuneKeyUp} placeholder='Rune utilisée' className='input-rune' type='text' defaultValue={this.state.rune} />
            <div className="search-runes">
                {RunesData.map(e => {
                    if (e.name.startsWith(this.state.rune)) {
                        return <p onClick={this.addRuneWord}>{e.name}</p>
                    }
                })}
            </div>
            <input onKeyUp={this.TimesKeyUp} className='input-times' type='number' defaultValue="1" placeholder='exemple: 1' />
            <button onClick={this.ChangePuits} className="btn">Calculer mon puits!</button>
            <div className='informations'>
                {this.state.infos.map(el => {
                    return <h2>{el}</h2>
                })}
            </div>
        </div>
        )
        } else {
            return <div>
                <input onKeyPress={this.keyPressedPuits} placeholder='Votre puits' className='input-puits' type='number' />
            </div>
        }
    }
}

export default Puits;