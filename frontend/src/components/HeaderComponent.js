import React, { Component } from 'react'
import'bootstrap/dist/css/bootstrap.min.css';
class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-dark bg-primary">
                    <div><a href="/receipts" className="navbar-brand"> ScanRes</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
