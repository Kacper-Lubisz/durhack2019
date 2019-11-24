import React from "react";
import App, {AppProps, Item} from "./App";

interface OutputCategoriesState {
    removed: boolean[]
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
            removed: removed
        }
    }

    render() {
        function toTitleCase(txt: string) {
            return txt.substr(0, 1).toUpperCase() + txt.substr(1).toLowerCase()
        }

        let removedItems: Item[] = this.state.removed.map((index) => this.app.state.items[index]);
        console.log(removedItems);
        return (
            <div>
                <h3>From {this.app.state.files.length} receipt{this.app.state.files.length !== 1 ? "s" : ""}, you spent
                    a
                    total of £{
                        (this.app.state.items.map((item) => item.amount).reduce((a, b) => a + b, 0) / 100).toFixed(2)
                    }</h3>

                {removedItems.length !== 0 && (
                    <div>If you stopped spending
                        on {removedItems.map((item) => item.name).reduce((p, c) => p + ", " + c)} , you
                        would save {removedItems.map((item) => item.amount).reduce((a, b) => a + b)} each week!</div>
                )}


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
                                <td><input checked={this.state.removed.find((item, index2) => index2 = index)
                                === undefined}
                                           type={"checkbox"} onChange={(event) => {
                                    if (event.target.checked) {
                                        this.state.removed.push(index)
                                        console.log(this.state.removed);
                                    } else {
                                        this.setState(Object.assign({}, this.state, {
                                            removed: this.state.removed.filter(((value, index1) => index1 !== index))
                                        }), () => {
                                            console.log(this.state.removed);
                                        })

                                    }
                                }}/></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }

}