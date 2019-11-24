import React from "react";
import App, {AppProps} from "./App";

export class InputName extends React.Component<AppProps> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app
    }

    render() {
        return <div>
            <h2>What is your name?</h2>
            <input
                autoFocus={true}
                type={"string"}
                placeholder={"Your Name"}
                onChange={(event) => {
                    this.app.setState(Object.assign({}, this.app.state, {
                        name: event.target.value
                    }))
                }}
                onKeyDown={this.app.goToNextScreen.bind(this.app)}
            />
        </div>
    }
}