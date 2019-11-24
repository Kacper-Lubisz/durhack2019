import React, {RefObject} from "react";
import App, {AppProps} from "./App";
import {Line} from 'react-chartjs-2';


export class InputFullEarnings extends React.Component<AppProps> {
    app: App;
    canvas: RefObject<HTMLCanvasElement>;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app;
        this.canvas = React.createRef()
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
        if (this.app.state.salary === undefined)
            return undefined;
        let data = [this.app.state.salary.now / 1000,
            this.app.state.salary.halfWay / 1000,
            this.app.state.salary.retire / 1000];
        console.log(data);
        return <div>
            <h2>{this.app.state.name}, how much do you expect to earn over your career?</h2>
            {this.app.state.dob}
            {this.app.state.retireTargetAge}
            <Line
                data={{
                    labels: ['Now', 'Half-way', 'Retirement'],
                    datasets: [
                        {
                            label: 'Your salery over time',
                            backgroundColor: 'rgba(255,99,132,0.2)',
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 1,
                            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                            hoverBorderColor: 'rgba(255,99,132,1)',
                            data: data
                        }
                    ]
                }}
                width={100}
                height={50}
                options={{
                    maintainAspectRatio: false

                }}
            />

            <table style={{
                marginRight: "auto",
                marginLeft: "auto"
            }}>
                <tbody>{
                    this.inputs.map((input, index) => {
                        const {title, prop} = input;
                        if (this.app.state.salary === undefined)
                            return undefined;

                        return <tr key={index}>

                            <td style={{textAlign: "left"}}>{title} </td>
                            <td><input
                                autoFocus={index === 0}
                                type={"number"}
                                value={this.app.state.salary[prop].toFixed(0)}
                                onChange={(event) => {
                                    const newSalary = Object.assign({}, this.app.state.salary);
                                    newSalary[prop] = Number(event.target.value);
                                    this.app.setState(Object.assign({}, this.app.state, {
                                        salary: newSalary
                                    }));
                                    this.forceUpdate()
                                }}
                                onKeyDown={this.app.goToNextScreen.bind(this.app)}
                            /></td>
                        </tr>

                    })

                }</tbody>
            </table>
        </div>
    }
}