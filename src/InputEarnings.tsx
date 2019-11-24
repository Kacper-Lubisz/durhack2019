import React from "react";
import App, {AppProps} from "./App";

export class InputEarnings extends React.Component<AppProps> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app
    }

    render() {
        return <div>
            <h2>{this.app.state.name}, how much do you earn a year?</h2>
            <input
                autoFocus={true}
                type={"number"}
                onChange={(event) => {
                    let current = Number(event.target.value);
                    this.app.setState(Object.assign({}, this.app.state, {
                        salary: {
                            now: current,
                            halfWay: current * 1.3,
                            retire: current * 1.5
                        }
                    }))

                }}
                onKeyDown={this.app.goToNextScreen.bind(this.app)}
            />
        </div>
    }
}