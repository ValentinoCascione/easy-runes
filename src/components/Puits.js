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
            infos: [],
            used: []
        }
    }

    myPuits = () => {
        const inputPuits = document.querySelector('.input-puits')
        if (parseInt(inputPuits.value) > 0) {
            this.setState({ puits: parseInt(inputPuits.value) })
        }
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

    TimesKeyUp = (e) => {
        console.log(e.target.value)
        this.setState({ times: e.target.value })
    }

    changePuits = () => {
        RunesData.map(el => {
            if (el.name === this.state.rune && this.state.times > 0 && this.state.success === 'neutre') {
                this.setState({ puits: this.state.puits - (el.weight * this.state.times) })
                this.state.infos.push(<Informations runes={this.state.rune} times={this.state.times} success={this.state.success} />)
                if (this.state.used.includes(el.name) === false) {
                    this.state.used.push(el.name)
                }
            }
            else if (el.name === this.state.rune && this.state.times > 0 && this.state.success === 'critique') {
                this.setState({ puits: this.state.puits })
                this.state.infos.push(<Informations runes={this.state.rune} times={this.state.times} success={this.state.success} />)
                this.state.used.push(el.name)
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

    addUsed = (event) => {
        this.setState({ 
            rune: event.target.innerHTML.toLowerCase(),
        }, this.newInputValue )
        const runesUsed = document.querySelector('.runes-used')
        const searchRunes = document.querySelector('.search-runes')
        runesUsed.style.display = 'none'
        searchRunes.style.display = 'none'
    }

    hideRunesUsed = () => {
        const runesUsed = document.querySelector('.runes-used')
        runesUsed.style.display = 'none'
    }

    hideWithEsc = (e) => {
        const runesUsed = document.querySelector('.runes-used')
        if (e.keyCode === 27) {
            runesUsed.style.display = 'none'
        }
    }

    showRunesUsed = () => {
        const runesUsed = document.querySelector('.runes-used')
        if (this.state.used.length > 0) {
            runesUsed.style.display = 'flex'
        }
    }

    minZero = () => {
        if (this.state.puits < 0) {
            this.setState({ puits: 0 })
        }
    }

    puitsEqZero = () => {
        const restartPuitsOutline = document.querySelector('.restart-puits-outline')
        const restartPuits = document.querySelector('.restart-puits')
        if (this.state.puits === 0) {
            restartPuits.style.position = 'absolute'
            restartPuits.style.top = '-200px'
            setTimeout(() => { restartPuitsOutline.style.width = '230px' }, 300);
        }
    }

    newPuits = () => {
        const restartPuitsOutline = document.querySelector('.restart-puits-outline')
        const restartPuits = document.querySelector('.restart-puits')
        const newInputPuits = document.querySelector('.new-input-puits')
        if (newInputPuits.value > 0) {
            this.setState({ 
                puits: parseInt(newInputPuits.value),
                infos: []
            })
            newInputPuits.value = ''
            restartPuits.style.position = 'absolute'
            restartPuits.style.top = '-450px'
            setTimeout(() => { restartPuitsOutline.style.width = '80px' }, 300);
        }

    }

    componentDidUpdate() {
        window.addEventListener('keydown', this.hideWithEsc)
        this.minZero()
        this.puitsEqZero()
    }

    render() {
        let i = 0;
        if (typeof this.state.puits === 'number') {
        return (
        <div className='puits-div' onKeyDown={this.test}>
            <h1 className='general-puits'>{this.state.puits}</h1>
            <button onClick={this.showRunesUsed} className="show-runes-used">Runes utilisées</button>
            <div className="runes-used">
                <button className="btn-used" onClick={this.hideRunesUsed}>X</button>
                <div className="p-used">
                {this.state.used.map(e => {
                    i = i + 1   
                    return <p onClick={this.addUsed} key={i}>{e}</p>
                })}
                </div>
            </div>
            <div className="restart-puits">
                <p className="restart-puits-title">Vous n'avez plus de reliquat</p>
                <div className="restart-puits-outline"></div>
                <div className="firstpage-flex">
                    <p className="write-puits">Réajuster mon puits →&nbsp;</p>
                    <input type='number' className="new-input-puits" />
                </div>
                <button onClick={this.newPuits} className="maj-puits">Mettre à jour</button>
            </div>
            <div className='all-secondpage'>
                <div className='all-search-runes'>
                    <div className="firstpage-flex width-runes">
                        <p className="before-input">Rune&nbsp;</p>
                        <input onKeyUp={this.RuneKeyUp} className='input-rune' type='text' />
                    </div>
                    <div className="search-runes">
                        {RunesData.map(e => {
                            if (e.name.includes(this.state.rune)) {
                                return <h4 onClick={this.addRuneWord} className="search-element" key={e.id}><p className="remove-pointer">{e.name}</p> <img className="remove-pointer" src={e.image}></img></h4>
                            }
                        })}
                    </div>
                </div>
                <div className="firstpage-flex">
                    <input onChange={this.TimesKeyUp} className='input-times' type='number' value={this.state.times} min='1' />
                    <p className="after-input">&nbsp;fois</p>
                </div>
                <div className="firstpage-flex">
                    <p className="before-input">Succès&nbsp;</p>
                    <select value={this.state.success} onChange={this.changeSuccess} className="select-success">
                        <option value="neutre">neutre</option>
                        <option value="critique">critique</option>
                    </select>
                </div>
                <button onClick={this.changePuits} className="btn btn-final">Calculer</button>
            </div>
            <div className='informations'>
                <p className="historique">Historique</p>
                <div className="inside-infos">
                    {(this.state.infos == 0) ? <p className="empty-historique">Votre historique est vide</p> : 
                    this.state.infos.slice().reverse().map(el => {
                        i = i + 1
                        return <h2 key={i}>- {el}</h2>
                    })}
                    
                </div>
            </div>
        </div>
        )
        } else {
            return <div className='puits-div-1'>
                <div className='all-firstpage'>
                    <div className="firstpage-flex">
                        <p className="write-puits">Ecrivez votre puits →&nbsp;</p>
                        <input className='input-puits' type='number' min='1' />
                    </div>
                    <button onClick={this.myPuits} className="btn-firstpage">Generer</button>
                </div>
            </div>
        }
    }
}

export default Puits;