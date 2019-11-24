import React from "react";
import App, {AppProps} from "./App";

export class InputDOB extends React.Component<AppProps> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app
    }

    render() {
        return <div>
            <h2>Hey {this.app.state.name}, what year you born?</h2>
            <input
                autoFocus={true}
                type={"number"}
                onChange={(event) => {
                    this.app.setState(Object.assign({}, this.app.state, {
                        dob: Number(event.target.value)
                    }))
                }}
                onKeyDown={this.app.goToNextScreen.bind(this.app)}
            />
        </div>
    }
}