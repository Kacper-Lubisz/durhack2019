import React from "react";
import App, {AppProps} from "./App";

export class InputRetireTarget extends React.Component<AppProps> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app
    }

    render() {
        return <div>
            <h2>{this.app.state.name}, at what age do you want to retire?</h2>
            <input
                autoFocus={true}
                type={"number"}
                onChange={(event) => {
                    if (this.app.state.dob !== undefined) {
                        this.app.setState(Object.assign({}, this.app.state, {
                            retireTargetAge: Number(event.target.value)
                        }))
                    } else {
                        console.error("YOB IS NOT A NUMBER")
                    }
                }}
                onKeyDown={this.app.goToNextScreen.bind(this.app)}
            />
        </div>
    }
}