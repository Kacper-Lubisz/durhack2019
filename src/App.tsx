import React from 'react';
import logo from './logo.svg';
import './App.css';

interface AppState {
    name?: string,
    dob?:  number,
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
    currentInput: "name" | "dob" | "retireTargetAge" | "salary" | "savingsTarget" | "retireTarget" | "spending"
}

class App extends React.Component<any, AppState> {

    constructor(props: any) {
        super(props);

        this.state = {
            name: undefined,
            dob: undefined,
            retireTargetAge: undefined,
            salary: undefined,
            savingsTarget: undefined, // as a proportion of the total
            retireTarget: undefined,
            spending: undefined,
            currentInput: "name"
        }

    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<AppState>, snapshot?: any): void {

        console.log(this.state);

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1>[The name]</h1>

                    {this.state.currentInput === "name" && (
                        <div>
                            <h2>What is your name?</h2>
                            <input
                                autoFocus={true}
                                datatype={"string"}
                                placeholder={"Your Name"}
                                onChange={(event) => {
                                    this.setState(Object.assign({}, this.state, {
                                        name: event.target.value
                                    }))
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        this.setState(Object.assign({}, this.state, {
                                            currentInput: "dob"
                                        }));
                                    }
                                }}
                            />
                            <p>Press Enter to continue</p>
                            <NavButtons next={"dob"} app={this}/>
                        </div>
                    )}

                    {this.state.currentInput === "dob" && (
                        <div>
                            <h2>Hey {this.state.name}, what year you born?</h2>
                            <input
                                autoFocus={true}
                                datatype={"date"}
                                onChange={(event) => {
                                    console.log(event.target.value);
                                    this.setState(Object.assign({}, this.state, {
                                        dob: event.target.value
                                    }))
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        this.setState(Object.assign({}, this.state, {
                                            currentInput: "dob"
                                        }));
                                    }
                                }}
                            />
                            <p>Press Enter to continue</p>
                            <NavButtons next={"dob"} app={this}/>
                        </div>
                    )}


                </header>
            </div>
        );
    }
}

interface NavButtonsProps {
    previous?: string,
    next?: string
    app: App
}

class NavButtons extends React.Component<NavButtonsProps> {
    render() {
        return (<div>
            {this.props.previous !== undefined && (
                <button
                    onClick={() => {
                        this.props.app.setState(Object.assign({}, this.props.app.state, {
                            currentInput: this.props.previous
                        }))
                    }}
                >Previous</button>
            )}
            {this.props.next !== undefined && (
                <button
                    onClick={() => {
                        this.props.app.setState(Object.assign({}, this.props.app.state, {
                            currentInput: this.props.next
                        }))
                    }}
                >Next</button>
            )}
        </div>)
    }
}

export default App;
