import React, { Component, PropTypes } from "react";
import Tabs from "dnn-tabs";
import { connect } from "react-redux";
import {
    pagination as PaginationActions,
    security as SecurityActions
} from "../../actions";
import BasicSettings from "../basicSettings";
import SslSettings from "../sslSettings";
import OtherSettings from "../otherSettings";
import IpFilters from "../ipFilters";
import Tooltip from "dnn-tooltip";
import MemberManagement from "../memberManagement";
import RegistrationSettings from "../registrationSettings";
import SocialPanelBody from "dnn-social-panel-body";
import SecurityBulletins from "../securityBulletins";
import SuperuserActivity from "../superuserActivity";
import AuditCheck from "../auditCheck";
import ScannerCheck from "../scannerCheck";
import "./style.less";
import util from "../../utils";
import resx from "../../resources";

let isHost = false;

export class Body extends Component {
    constructor() {
        super();
        this.handleSelect = this.handleSelect.bind(this);
        isHost = util.settings.isHost;
    }

    handleSelect(index) {
        const {props} = this;
        props.dispatch(PaginationActions.loadTab(index));   //index acts as scopeTypeId
    }

    renderTabs() {
        const {props} = this;
        if (isHost) {
            return <Tabs onSelect={this.handleSelect.bind(this)}
                tabHeaders={[resx.get("TabLoginSettings"),
                resx.get("TabMemberAccounts"),
                resx.get("TabSecurityAnalyzer"),
                resx.get("TabSecurityBulletins"),
                resx.get("TabMore")]}
                type="primary">
                <Tabs onSelect={this.handleSelect.bind(this)}
                    tabHeaders={[resx.get("TabBasicLoginSettings"), <div style={{ fontSize: "9pt" }}>{resx.get("TabIpFilters")} <Tooltip
                        messages={[resx.get("GlobalSettingsTab")]}
                        type="global"
                        style={{ float: "right", height: "20", position: "static", margin: "-5px 0 0 5px" }}
                        /></div>]}
                    type="secondary">
                    <BasicSettings />
                    <IpFilters />
                </Tabs>
                <Tabs onSelect={this.handleSelect.bind(this)}
                    tabHeaders={[<div style={{ fontSize: "9pt" }}>{resx.get("TabMemberSettings")} <Tooltip
                        messages={[resx.get("GlobalSettingsTab")]}
                        type="global"
                        style={{ float: "right", height: "20", position: "static", margin: "-5px 0 0 5px" }}
                        /></div>, resx.get("TabRegistrationSettings")]}
                    type="secondary">
                    <MemberManagement />
                    <RegistrationSettings />
                </Tabs>
                <Tabs onSelect={this.handleSelect.bind(this)}
                    tabHeaders={[resx.get("TabAuditChecks"), resx.get("TabScannerCheck"), resx.get("TabSuperuserActivity")]}
                    type="secondary">
                    <AuditCheck />
                    <ScannerCheck />
                    <SuperuserActivity />
                </Tabs>
                <SecurityBulletins />
                <Tabs onSelect={this.handleSelect.bind(this)}
                    tabHeaders={[resx.get("TabSslSettings"), <div style={{ fontSize: "9pt" }}>{resx.get("TabMoreSecuritySettings")} <Tooltip
                        messages={[resx.get("GlobalSettingsTab")]}
                        type="global"
                        style={{ float: "right", height: "20", position: "static", margin: "-5px 0 0 5px" }}
                        /></div>]}
                    type="secondary">
                    <SslSettings />
                    <OtherSettings />
                </Tabs>
            </Tabs>;
        }
        else {
            return <Tabs onSelect={this.handleSelect.bind(this)}
                tabHeaders={[resx.get("TabLoginSettings"),
                resx.get("TabMemberAccounts"),
                resx.get("TabMore")]}
                type="primary">
                <Tabs onSelect={this.handleSelect.bind(this)}
                    tabHeaders={[resx.get("TabBasicLoginSettings")]}
                    type="secondary">
                    <BasicSettings />
                </Tabs>
                <Tabs onSelect={this.handleSelect.bind(this)}
                    tabHeaders={[resx.get("TabRegistrationSettings")]}
                    type="secondary">
                    <RegistrationSettings />
                </Tabs>
                <Tabs onSelect={this.handleSelect.bind(this)}
                    tabHeaders={[resx.get("TabSslSettings")]}
                    type="secondary">
                    <SslSettings />
                </Tabs>
            </Tabs>;
        }
    }

    /*eslint no-mixed-spaces-and-tabs: "error"*/
    render() {
        return (
            <SocialPanelBody>
                {this.renderTabs()}
            </SocialPanelBody>
        );
    }
}

Body.propTypes = {
    dispatch: PropTypes.func.isRequired,
    tabIndex: PropTypes.number
};

function mapStateToProps(state) {
    return {
        tabIndex: state.pagination.index
    };
}

export default connect(mapStateToProps)(Body);