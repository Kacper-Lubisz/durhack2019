import React from "react";
import App, {AppProps, Item} from "./App";

export class InputReceipts extends React.Component<AppProps> {
    app: App;

    constructor(props: AppProps) {
        super(props);
        this.app = props.app;

    }

    async handleFiles(files: FileList) {

        let newItems: Item[] = [];
        let newFiles: File[] = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            try {
                const response = await fetch("http://localhost:3001/processImage", {
                    method: "POST",
                    // mode: 'no-cors', // no-cors, *cors, same-origin
                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'omit', // include, *same-origin, omit
                    headers: {
                        // 'Content-Type': file.type
                        'Content-Type': 'application/json'
                    },
                    redirect: 'follow', // manual, *follow, error
                    referrer: 'no-referrer', // no-referrer, *client
                    body: file
                });
                // console.log(response);
                // console.log(await response.blob());
                // console.log("this is the blob >",await response.blob())
                const items = await response.json() as Item[];

                const emptyItems: Item[] = [];
                const missing = items.reduce((pr, cu) => {
                    const match = newItems.find((item) => item.name === cu.name);
                    if (match === undefined) {
                        return pr.concat(cu)
                    } else {
                        match.amount += cu.amount;
                        return pr
                    }
                }, emptyItems);
                newItems = newItems.concat(missing);
                newFiles.push(file)
            } catch (e) {
                console.error(e)
            }
        }

        this.app.setState(Object.assign({}, this.app.state, {
            items: newItems,
            files: newFiles
        }), () => {
            this.app.goToNextScreen(undefined)
        });

    }

    render() {

        return <div>
            <h2>{this.app.state.name}, upload a week's worth of receipts!</h2>
            <p>We will process these and suggest how you can save money! We will assume that these receipts are
                representative of a weeks worth of your spending</p>

            <input
                style={{
                    marginRight: "auto",
                    marginLeft: "auto"
                }}
                type="file"
                id="avatar"
                name="image"
                accept="image/jpeg"
                multiple={true}
                onChange={async (event) => {
                    if (event.target.files !== null) {
                        await this.handleFiles(event.target.files)
                    }
                }}
                // onLoad={(event) => {
                //     if (event.target.files !== null) {
                //         this.handleFiles(event.target.files)
                //     }
                // }}
            />

        </div>;
    }

}