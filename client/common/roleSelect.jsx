"use strict";

const React = require("react");
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

// required properties
// allRoles = [{displayName:"Role1", value:"role1"}]
// roleClient = /common/services/role/RoleClient
// defaultRole = default selected role

module.exports = class RoleSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            availableRoles: this.props.roleClient.availableRoles,
            currentRole: this.props.roleClient.currentRole || this.props.defaultRole
        };
        this.handleRolechange = this.handleRolechange.bind(this);
        this.handleRoleMessage = this.handleRoleMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.props.roleClient.onAckRoleChange.add(this.handleRolechange);
        this.props.roleClient.onRoleChangeMessage.add(this.handleRoleMessage);
    }

    componentWillUnmount() {
        this.props.roleClient.onAckRoleChange.remove(this.handleRolechange);
        this.props.roleClient.onRoleChangeMessage.remove(this.handleRoleMessage);
    }

    render() {
        const items = [];
        this.props.allRoles.forEach((r) => {
            items.push(
                <MenuItem key={r.value} value={r.value} disabled={this.state.availableRoles.indexOf(r.value)<0} primaryText={r.displayName} />
            );
        });

        return (
            <SelectField floatingLabelText="Role" onChange={this.handleChange} value ={this.state.currentRole} fullWidth={true}>
                {items}
            </SelectField>
        );
    }

    handleChange(event, key, payload) {
        if (payload) {
            this.props.roleClient.changeRole(payload);
        }
    }

    handleRolechange(role) {
        this.setState({
            currentRole: role
        });
    }

    handleRoleMessage(data) {
        this.setState({
            availableRoles: data.availableRoles
        });
    }
};
