import React, { Component } from 'react'

class Informations extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div>Tu as passé {this.props.times} rune{this.props.times > 1 ? 's' : ''} {this.props.runes} en succès critique!</div>
            </div>
        )
    }
}

export default Informations; 