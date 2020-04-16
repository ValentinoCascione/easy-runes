import React, { Component } from 'react'

class Informations extends Component {
    render() {
        return (
            <div>
                <div>Tu as passé {this.props.times} rune{this.props.times > 1 ? 's' : ''} {this.props.runes} en succès {this.props.success}!</div>
            </div>
        )
    }
}

export default Informations; 