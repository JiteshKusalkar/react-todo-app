import React, { Component } from 'react';

export default class TodoFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeState: 'All'
        };
        this.stateChange = this.stateChange.bind(this);
    }

    stateChange(action) {
        this.setState({
            activeState: action
        });
        this.props.updateState(action);
    }

    render() {
        return (
            <footer className="text-left footer">
                <span>{this.props.activeCount > 1 ? this.props.activeCount + ' items left' : this.props.activeCount + ' item left'}</span>
                <span className="action">
                    {this.props.actions.map((action, index) => {
                        return (<a key={index} onClick={() => this.stateChange(action)} className={`action-key ${this.state.activeState === action ? 'active' : ''}`}>{action}</a>)
                    })}
                </span>
            </footer>
        )
    }
}