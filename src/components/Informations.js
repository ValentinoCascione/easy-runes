import React, { Component } from 'react'

class Informations extends Component {
    render() {
        return (
            <div>
                <div>Tu as passé <span className='span-rune'>{this.props.times} rune{this.props.times > 1 ? 's' : ''}</span> {this.props.runes} en <span className="span-success">succès {this.props.success}</span></div>
            </div>
        )
    }
}

export default Informations; 