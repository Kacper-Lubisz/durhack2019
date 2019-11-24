import React from "react";
import {Button} from "react-bootstrap";
import App from "./App";

export interface NavButtonsProps {
    previous: boolean,
    next: boolean,
    app: App
}

export class NavButtons extends React.Component<NavButtonsProps> {
    render() {
        return (<div>
            {this.props.previous && (
                <Button
                    size={"lg"}
                    style={{margin: 5}}
                    onClick={() => {
                        this.props.app.setState(Object.assign({}, this.props.app.state, {
                            currentScreen: this.props.app.state.currentScreen - 1
                        }))
                    }}
                >Back</Button>
            )}
            {this.props.next && (
                <Button
                    size={"lg"}
                    style={{margin: 5}}
                    onClick={() => {
                        this.props.app.setState(Object.assign({}, this.props.app.state, {
                            currentScreen: this.props.app.state.currentScreen + 1
                        }))
                    }}
                >Next</Button>
            )}
        </div>)
    }
}