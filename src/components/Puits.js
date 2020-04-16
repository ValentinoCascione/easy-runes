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
            success: 'neutre',
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

    changePuits = () => {
        RunesData.map(el => {
            if (el.name === this.state.rune && this.state.times > 0 && this.state.success === 'neutre') {
                this.setState({ puits: this.state.puits - (el.weight * this.state.times) })
                this.state.infos.push(<Informations runes={this.state.rune} times={this.state.times} success={this.state.success} />)
            }
            else if (el.name === this.state.rune && this.state.times > 0 && this.state.success === 'critique') {
                this.state.infos.push(<Informations runes={this.state.rune} times={this.state.times} success={this.state.success} />)
            }
        })
    }

    addRuneWord = (event) => {
        const searchRunes = document.querySelector('.search-runes')
        this.setState({ 
            rune: event.target.firstChild.innerHTML.toLowerCase(),
        }, this.newInputValue )
        searchRunes.style.display = 'none'
    }

    newInputValue = () => {
        const inputRune = document.querySelector('.input-rune')
        inputRune.value = this.state.rune
    }

    changeSuccess = (event) => {
        this.setState({ success: event.target.value })
    }

    render() {
        let i = 0;
        if (typeof this.state.puits === 'number') {
        return (
        <div>
            <h1>Voici votre puits: {this.state.puits}</h1>
            <input onKeyUp={this.RuneKeyUp} placeholder='Rune utilisée' className='input-rune' type='text' />
            <div className="search-runes">
                {RunesData.map(e => {
                    if (e.name.includes(this.state.rune)) {
                        return <h4 onClick={this.addRuneWord} className="search-elements" key={e.id}><p className="remove-pointer">{e.name}</p> <img className="remove-pointer" src={e.image}></img></h4>
                    }
                })}
            </div>
            <input onKeyUp={this.TimesKeyUp} className='input-times' type='number' defaultValue="1" placeholder='exemple: 1' min='1' />
            <select value={this.state.success} onChange={this.changeSuccess}>
                <option value="neutre">neutre</option>
                <option value="critique">critique</option>
            </select>
            <button onClick={this.changePuits} className="btn">Calculer mon puits!</button>
            <div className='informations'>
                {this.state.infos.slice().reverse().map(el => {
                    i = i + 1
                    return <h2 key={i}>{el}</h2>
                })}
            </div>
        </div>
        )
        } else {
            return <div>
                <input placeholder='Votre puits' className='input-puits' type='number' min='1' />
                <button onClick={this.myPuits} className="btn">Generer mon puits!</button>
            </div>
        }
    }
}

export default Puits;