import React from "react";
import App, {AppProps, Item} from "./App";

interface OutputCategoriesState {
    removed: boolean[]
    earnings?: number[]
}

export class OutputCategories extends React.Component<AppProps, OutputCategoriesState> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app;
        let removed = [];
        for (let i = 0; i < this.app.state.items.length; i++) {
            removed.push(false)
        }
        this.state = {
            removed: removed,
            earnings: undefined
        }
    }

    componentDidUpdate(prevProps: Readonly<AppProps>, prevState: Readonly<OutputCategoriesState>, snapshot?: any): void {
        this.refresh();
    }

    componentDidMount(): void {
        this.refresh();
    }

    private refresh() {

        const removedItems: Item[] = this.app.state.items.filter((a, index) => this.state.removed[index]);
        const weeklySave = removedItems.map((item) => item.amount).reduce((a, b) => a + b, 0);

        let data = JSON.stringify({
            salary: {
                now: weeklySave * 52 / 100,
                halfWay: weeklySave * 52 / 100,
                retire: weeklySave * 52 / 100
            },
            retireTarget: this.props.app.state.retireTarget,
            savingsTarget: this.props.app.state.savingsTarget,
            dob: this.props.app.state.dob,
            retireTargetAge: this.props.app.state.retireTargetAge,
        });

        fetch("http://localhost:3001/calc", {
            method: "POST",
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: data
        }).then((response) => response.json()).then((json) => {
            this.setState(Object.assign(this.state, {
                earnings: json["totals"]
            }))


        });
    }

    render() {
        function toTitleCase(txt: string) {
            return txt.substr(0, 1).toUpperCase() + txt.substr(1).toLowerCase()
        }

        const removedItems: Item[] = this.app.state.items.filter((a, index) => this.state.removed[index]);

        const totalSpend = (this.app.state.items.map((item) => item.amount).reduce((a, b) => a + b, 0) / 100).toFixed(2);
        const weeklySave = removedItems.map((item) => item.amount).reduce((a, b) => a + b, 0);


        return (
            <div>
                <h3>From {this.app.state.files.length} receipt{this.app.state.files.length !== 1 ? "s" : ""}, you spent
                    a total of £{totalSpend}</h3>

                <table style={{marginLeft: "auto", marginRight: "auto"}}>
                    <tbody>
                    <tr>
                        <th>Item</th>
                        <th>Spend/Week</th>
                        <th>Remove</th>
                    </tr>
                    {
                        this.app.state.items.map((item, index) => {
                            return <tr key={index}>
                                <td>{toTitleCase(item.name)}</td>
                                <td>£{(item.amount / 100).toFixed(2)}</td>
                                <td><input checked={this.state.removed[index]} type={"checkbox"} onChange={(event) => {

                                    const newRemoved = this.state.removed;
                                    newRemoved[index] = !newRemoved[index];

                                    this.setState(Object.assign({}, this.state, {
                                        removed: newRemoved
                                    }));

                                    this.forceUpdate();

                                }}/></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>

                {removedItems.length !== 0 && (
                    <div>If you stopped spending
                        on {removedItems.map((item) => item.name).reduce((p, c) => p + ", " + c)} , you would save
                        £{(weeklySave / 100).toFixed(2)} each week or £{
                            (weeklySave * 56 / 100).toFixed(2)} each year!</div>

                )}

                {this.state.earnings !== undefined && (
                    <div>
                        If you invest these savings in a savings account, you would make £{
                        this.state.earnings[this.state.earnings.length - 1].toPrecision(2)
                    }
                    </div>
                )}

            </div>
        )
    }

}