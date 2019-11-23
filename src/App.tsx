import React, {ReactNode} from 'react';
import logo from './logo.svg';
import './App.css';


interface AppProps {
    app: App
}

class InputName extends React.Component<AppProps> {
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

class InputDOB extends React.Component<AppProps> {
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

class InputRetireTarget extends React.Component<AppProps> {
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

class InputEarnings extends React.Component<AppProps> {
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

class InputFullEarnings extends React.Component<AppProps> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app
    }

    private inputs: { title: string, prop: "now" | "halfWay" | "retire" }[] = [{
        title: "Now",
        prop: "now"
    }, {
        title: "Half Way",
        prop: "halfWay"
    }, {
        title: "When you retire",
        prop: "retire"
    }];

    render() {
        return <div>
            <h2>{this.app.state.name}, adjust how much you expect to earn over time!</h2>

            {
                this.inputs.map((input) => {
                    const {title, prop} = input;
                    if (this.app.state.salary === undefined)
                        return undefined;

                    return <div>
                        {title}:
                        <input
                            autoFocus={true}
                            type={"number"}
                            value={this.app.state.salary[prop].toFixed(0)}
                            onChange={(event) => {
                                const newSalary = Object.assign({}, this.app.state.salary);
                                newSalary[prop] = Number(event.target.value);
                                this.app.setState(Object.assign({}, this.app.state, {
                                    salary: newSalary
                                }));
                            }}
                            onKeyDown={this.app.goToNextScreen.bind(this.app)}
                        />
                        <br/>
                    </div>

                })

            }
        </div>
    }
}

class InputSaveAmount extends React.Component<AppProps> {
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

interface InputReceiptsState {
    files: string[]
}

class InputReceipts extends React.Component<AppProps, InputReceiptsState> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app;

        this.state = {
            files: []
        }
    }

    render() {
        return <div>
            <h2>{this.app.state.name}, upload your receipts!</h2>
            <p>We will process these and suggest how you can save money!</p>

            {this.state.files.length !== 0 && (
                <h3>{this.state.files.length} receipts uploaded</h3>
            )}

            <input type="file"
                   id="avatar"
                   name="image"
                   accept="image/png, image/jpeg"
                   multiple={true}

            />

        </div>;
    }

}

class OutputCategories extends React.Component<AppProps> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app
    }
}

interface AppState {
    name?: string,
    dob?: number,
    retireTargetAge?: number,
    salary?: {
        now: number,
        halfWay: number,
        retire: number
    }
    savingsTarget?: number // as a proportion of the total
    retireTarget?: number,
    spending?: {
        "item": string
        "amount": number
    }[],

    currentScreen: number
}

class App extends React.Component<any, AppState> {

    screens: ReactNode[];

    constructor(props: any) {
        super(props);

        this.screens = [
            <InputName app={this}/>,
            <InputDOB app={this}/>,
            <InputRetireTarget app={this}/>,
            <InputEarnings app={this}/>,
            <InputFullEarnings app={this}/>,
            <InputSaveAmount app={this}/>,
            <InputReceipts app={this}/>,
            <OutputCategories app={this}/>
        ];

        this.state = {
            name: undefined,
            dob: undefined,
            retireTargetAge: undefined,
            salary: undefined,
            savingsTarget: undefined, // as a proportion of the total
            retireTarget: undefined,
            spending: undefined,
            currentScreen: 0
        }

    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<AppState>, snapshot?: any): void {

        if (prevState.currentScreen !== this.state.currentScreen) {
            console.log(JSON.stringify(this.state));
        }

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>[The name]</h1>

                    {this.screens.map((screen, index: number) => {
                        if (this.state.currentScreen === index) {
                            return <div>
                                {screen}
                                <p>Press Enter to continue</p>
                                <NavButtons previous={index !== 0}
                                            next={index !== this.screens.length - 1}
                                            app={this}/>
                            </div>
                        } else {
                            return undefined;
                        }
                    }).filter((it) => it !== undefined)[0]}

                </header>
            </div>
        );
    }

    goToNextScreen(event: React.KeyboardEvent<HTMLInputElement>) {

        if (event.key === 'Enter') {

            console.log("Go to screen called", this.state.currentScreen);

            this.setState(Object.assign({}, this.state, {
                currentScreen: this.state.currentScreen + 1
            }));
        }

    }
}

interface NavButtonsProps {
    previous: boolean,
    next: boolean,
    app: App
}

class NavButtons extends React.Component<NavButtonsProps> {
    render() {
        return (<div>
            {this.props.previous && (
                <button
                    onClick={() => {
                        this.props.app.setState(Object.assign({}, this.props.app.state, {
                            currentScreen: this.props.app.state.currentScreen - 1
                        }))
                    }}
                >Previous</button>
            )}
            {this.props.next && (
                <button
                    onClick={() => {
                        this.props.app.setState(Object.assign({}, this.props.app.state, {
                            currentScreen: this.props.app.state.currentScreen + 1
                        }))
                    }}
                >Next</button>
            )}
        </div>)
    }
}

export default App;
