import * as React from 'react';
import axios from 'axios';
import FormLoader from "../../common/FormLoader";
import FormPage from "../../form/FormPage";
import Loading from "../../common/Loading/Loading";
// import * as difflet from "difflet";
import JSONEditor from "./JSONEditor";
import { get, set, assign, pick } from "lodash";
import Modal from 'react-responsive-modal';
import dataLoadingView from "../util/DataLoadingView";
import { API } from "aws-amplify";
import { IFormEditProps, IFormEditState } from "./FormEdit.d";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import "./FormEdit.scss";
import SplitterLayout from 'react-splitter-layout';
class FormEdit extends React.Component<IFormEditProps, IFormEditState> {
    constructor(props: any) {
        super(props);
        this.render = this.render.bind(this);
        let form = props.data.res;
        this.state = {
            schema: get(form, "schema", {}),
            uiSchema: get(form, "uiSchema", {}),
            formOptions: get(form, "formOptions", { "paymentInfo": {}, "confirmationEmailInfo": {}, "paymentMethods": {} }),
            formName: get(form, "name", "None"),
            loading: false
        }
    }
    onChange(path, data) {
        this.setState(set(assign({}, this.state), path, data));
    }
    saveForm() {
        this.setState({ loading: true });
        API.patch("CFF", `forms/${this.props.match.params.formId}`, {
            "body": {
                "uiSchema": this.state.uiSchema,
                "schema": this.state.schema,
                "formOptions": this.state.formOptions,
                "name": this.state.formName,
            }
        }).then((response) => {
            let res = response.res;
            if (!(res.success == true && res.updated_values)) {
                throw "Response not formatted correctly: " + JSON.stringify(res);
            }
            this.setState({ loading: false });
            // this.setState({
            //     loading: false,
            //     formName: formName,
            //     schema: schema,
            //     uiSchema: uiSchema,
            //     formOptions: formOptions
            // });
        }).catch(e => {
            alert("ERROR");
            this.setState({ loading: false });
            console.error(e);
            alert("Error, " + e);
        })

    }

    changeFormName(newName) {
        this.setState({ formName: newName });
    }
    renderTopPane() {
        return (
            <div>
                <div className="form-inline">
                    <input className="form-control form-control-sm" value={this.state.formName}
                        placeholder="Form Name"
                        onChange={(e) => this.changeFormName(e.target.value)} />
                    <button className="btn btn-sm btn-outline-primary"
                        onClick={(e) => this.saveForm()} >Save Form</button>
                    {get(this.state.formOptions, "dataOptions.export") && this.state.formOptions.dataOptions.export.map(e =>
                        e.type === "google_sheets" && e.spreadsheetId && (
                            <div><a target="_blank" href={`https://docs.google.com/spreadsheets/d/${e.spreadsheetId}`}>Export {e.type} link</a></div>
                        ))}
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="ccmt-cff-page-FormEdit">
                {this.state.loading && <Loading />}
                <div className="container-fluid">
                    <div className="row">
                        <SplitterLayout vertical={true} customClassName="ccmt-cff-editpage-splitter"
                        onSecondaryPaneSizeChange={() => window.dispatchEvent(new Event('resize'))}
                        >
                            <div className="col-12 ccmt-cff-editpage-jsoneditor-container">
                                <Tabs>
                                    <TabList>
                                        <Tab>formOptions</Tab>
                                        <Tab>schema</Tab>
                                        <Tab>uiSchema</Tab>
                                        <li className="react-tabs__tab">
                                        {this.renderTopPane()}
                                        </li>
                                    </TabList>

                                    <TabPanel>
                                        <JSONEditor
                                            data={this.state.formOptions}
                                            onChange={(e) => this.onChange("formOptions", e)}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <JSONEditor
                                            data={this.state.schema}
                                            onChange={(e) => this.onChange("schema", e)}
                                        />
                                    </TabPanel>
                                    <TabPanel>
                                        <JSONEditor
                                            data={this.state.uiSchema}
                                            onChange={(e) => this.onChange("uiSchema", e)}
                                        />
                                    </TabPanel>
                                </Tabs>
                            </div>
                            <div className="ccmt-cff-formedit-preview col-12 mt-4">
                                <FormPage formId={this.props.match.params.formId} key={JSON.stringify(this.state)} form_preloaded={pick(this.state, ["schema", "uiSchema", "formOptions"])} />
                            </div>
                        </SplitterLayout>
                    </div>
                </div>
            </div>);
    }
}

export default dataLoadingView(FormEdit, (props) => {
    return API.get("CFF", `forms/${props.formId}`, {});
});