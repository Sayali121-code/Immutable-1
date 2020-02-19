import React from "react";
import "./App.scss";
import axios from "axios";
import { OrderedMap } from "immutable";

interface IAppState {
  camps: any;
  show: any;
}

class App extends React.Component<{}, IAppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      camps: OrderedMap({}),
      show: ""
    };
  }
  componentDidMount() {
    axios.get("http://13.71.86.210/api/v1/getCamps").then(res => {
      //console.log(">>res", res);
      const a = this.state.camps
        .set("camps", res.data.camps)
        .set("asdas", "yes");
      console.log(">> a", a); // shows how many keys are created(set) in size:2
      this.setState({
        camps: a
      });
    });
  }

  showRecords = (record: any) => {
    //  console.log("show", record.id);
    this.setState({
      show: record
    });
  };

  render() {
    const { show } = this.state; //Destructuring for display purpose
    const a = this.state.camps.get("camps");
    //console.log(">> -----a", a);
    console.log(">> show clicked id", this.state.show);
    return (
      <div className="container">
        <div className="row">
          {((a as any) || []).map((d: any, i: number) => {
            return (
              <div key={i} className="col-md-7">
                <span onClick={() => this.showRecords(d)} key={i}>
                  {d.id}
                </span>
              </div>
            );
          })}

          <div className="col-md-5">
            Display <br />
            {show.id} {show.systemUsed}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
