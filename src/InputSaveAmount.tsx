import React from "react";
import App, {AppProps} from "./App";

export class InputSaveAmount extends React.Component<AppProps> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app
    }

    render() {
        return <div>
            <h2>{this.app.state.name}, how much of your income would you like to save (%)?</h2>
            <input
                autoFocus={true}
                type={"number"}
                onChange={(event) => {
                    let current = Math.min(Math.max(Number(event.target.value), 0), 100);
                    this.app.setState(Object.assign({}, this.app.state, {
                        savingsTarget: current
                    }))
                }}
                onKeyDown={this.app.goToNextScreen.bind(this.app)}
            />
        </div>
    }

}