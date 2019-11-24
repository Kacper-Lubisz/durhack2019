import React, {ReactNode} from 'react';
import logo from './logo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputFullEarnings} from "./InputFullEarnings";
import {InputSaveAmount} from "./InputSaveAmount";
import {InputEarnings} from "./InputEarnings";
import {InputRetireTarget} from "./InputRetireTarget";
import {InputDOB} from "./InputDOB";
import {InputName} from "./InputName";
import {InputReceipts} from "./InputReceipts";
import {OutputCategories} from "./OutputCategories";
import {NavButtons} from "./NavButtons";


export interface AppProps {
    app: App
}

export interface Item {
    name: string,
    amount: number,
    icon?: string
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
            items: [{name: "it", amount: 100}],
            files: [],
            currentScreen: 0
        }

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 style={{
                        marginBottom: 40
                    }}>FinZen</h1>
                    {/*<img src={logo} className="App-logo" alt="logo"/>*/}

                    {this.screens.map((screen, index: number) => {
                        if (this.state.currentScreen === index) {
                            return <div>
                                {screen}
                                {index < 6 && (<div>
                                    <p>Press Enter to continue</p>
                                    <NavButtons previous={index !== 0}
                                                next={index !== this.screens.length - 1}
                                                app={this}/>
                                </div>)}

                            </div>
                        } else {
                            return undefined;
                        }
                    }).filter((it) => it !== undefined)[0]}

                </header>
            </div>
        );
    }

    goToNextScreen(event: React.KeyboardEvent<HTMLInputElement> | undefined) {
        if (event === undefined || event.key === 'Enter') {
            this.setState(Object.assign({}, this.state, {
                currentScreen: this.state.currentScreen + 1
            }));
        }

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

    items: Item[],
    files: File[],

    currentScreen: number
}


export default App;
