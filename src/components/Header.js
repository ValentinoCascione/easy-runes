import React, { Component } from 'react'

class Header extends Component {

    reload = () => {
        window.location.reload(false);
    }

    render() {
        return (
            <header>
                <p className='logo'>Easy <br></br> Runes.</p>
                <p>Bug repéré? <br></br><a href="https://twitter.com/jeune_pasquale" target="_blank">@jeune_pasquale</a> sur Twitter</p>
                <button onClick={this.reload} >Recommencer</button>
            </header>
        )
    }
}

export default Header; 