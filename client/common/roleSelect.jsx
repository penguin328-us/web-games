"use strict";

const React = require("react");

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
        const options = [];
        this.props.allRoles.forEach((r) => {
            options.push(
                <option value={r.value} selected={r.value === this.state.currentRole} disabled={this.state.availableRoles.indexOf(r.value)<0}>{r.displayName}</option>
            );
        });

        return (
            <form  className="pure-form pure-form-stacked">
                <select onChange={this.handleChange} style={{width:"80%"}}>
                    {options}
                </select>
            </form>
        );
    }

    handleChange(event) {
        const newValue = event.target.value;
        if(newValue){
            this.props.roleClient.changeRole(newValue);
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
