import React, { Component } from 'react'

class Header extends Component {

    reload = () => {
        window.location.reload(false);
    }

    render() {
        return (
            <header>
                <p>Calculez facilement votre puits</p>
                <button onClick={this.reload} >Recommencer</button>
            </header>
        )
    }
}

export default Header; 