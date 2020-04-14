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

    RuneKeyUp = () => {
        const searchRunes = document.querySelector('.search-runes')
        const inputRune = document.querySelector('.input-rune')
        this.setState({ rune: inputRune.value.toLowerCase() })
        if (inputRune.value === '') {
            searchRunes.style.display = 'none'
        } else {
            searchRunes.style.display = ''
        }
    }

    TimesKeyUp = () => {
        const inputTimes = document.querySelector('.input-times')
        this.setState({ times: parseInt(inputTimes.value) })
    }

    ChangePuits = () => {
        RunesData.map(el => {
            if (el.name === this.state.rune && this.state.times > 0) {
                this.setState({ puits: this.state.puits - (el.weight * this.state.times) })
                this.state.infos.push(<Informations runes={this.state.rune} times={this.state.times}/>)
            }
        })
    }

    addRuneWord = (event) => {
        const searchRunes = document.querySelector('.search-runes')
        this.setState({ 
            rune: event.target.innerHTML.toLowerCase(),
        }, this.newInputValue )
        searchRunes.style.display = 'none'
    }

    newInputValue = () => {
        const inputRune = document.querySelector('.input-rune')
        inputRune.value = this.state.rune
    }

    render() {
        let i = 0;
        if (typeof this.state.puits === 'number') {
        return (
        <div>
            <h1>Voici votre puits: {this.state.puits}</h1>
            <input onKeyUp={this.RuneKeyUp} placeholder='Rune utilisée' className='input-rune' type='text' defaultValue={this.state.rune} />
            <div className="search-runes">
                {RunesData.map(e => {
                    if (e.name.includes(this.state.rune)) {
                        return <p onClick={this.addRuneWord} key={e.id}>{e.name}</p>
                    }
                })}
            </div>
            <input onKeyUp={this.TimesKeyUp} className='input-times' type='number' defaultValue="1" placeholder='exemple: 1' />
            <button onClick={this.ChangePuits} className="btn">Calculer mon puits!</button>
            <div className='informations'>
                {this.state.infos.reverse().map(el => {
                    i = i + 1
                    return <h2 key={i}>{el}</h2>
                })}
            </div>
        </div>
        )
        } else {
            return <div>
                <input placeholder='Votre puits' className='input-puits' type='number' />
                <button onClick={this.myPuits} className="btn">Generer mon puits!</button>
            </div>
        }
    }
}

export default Puits;