import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';

import { assignToGroup } from "../../Actions/users";

const styles = theme => ({
  listHardware: {
    paddingTop: 0,
    paddingRight: theme.spacing.unit,
    paddingBottom: 0,
    paddingLeft: theme.spacing.unit,
  },
  progress: {
    display: 'block',
    margin: 0,
    marginRight: theme.spacing.unit * 2,
  },
});

class UserListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectBoxChecked: [],
    };
  }

  componentDidMount() {
    let resultArray = [];

    this.props.userList
      .filter(user => user.group_id === this.props.groupId)
      .map(user => resultArray.push(user.id));

    this.setState({
      selectBoxChecked: resultArray,
    });
  }

  componentWillUnmount() {
    this.setState({
      isLoading: false,
    });
  }

  getDefaultGroupId = () => {
    let defaultGroup = this.props.groupsList.filter(g => g.name === 'default');
    return defaultGroup[0].id;
  }

  handleSelectBoxToggle = () => {
    let userId = this.props.user.id;
    let groupId = this.props.groupId;

    const { selectBoxChecked } = this.state;
    const currentIndex = selectBoxChecked.indexOf(userId);
    const newChecked = [...selectBoxChecked];

    if (currentIndex === -1) {
      newChecked.push(userId);
    } else {
      newChecked.splice(currentIndex, 1);
      groupId = this.getDefaultGroupId();
    }

    this.setState({
      selectBoxChecked: newChecked,
      isLoading: true,
    });

    this.props.assignToGroup({ userId, data: { group_id: groupId } }).then(e => {
      this.setState({
        isLoading: false,
      });
    }).catch(() => {
      this.setState({
        isLoading: false,
      });
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <ListItem
        role={undefined}
        dense
        button
        onClick={this.handleSelectBoxToggle}
        className={classes.listHardware}
        disabled={this.state.isLoading}
      >
        <Checkbox
          checked={this.state.selectBoxChecked.indexOf(this.props.user.id) !== -1}
          disabled={this.state.isLoading}
          tabIndex={-1}
          disableRipple
        />

        <ListItemText primary={this.props.user.cognito_user_id} />

        <Fade in={this.state.isLoading}>
          <CircularProgress color="secondary" size={24} className={classes.progress} />
        </Fade>
      </ListItem>
    );
  }
}

UserListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  groupId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  userList: state.users.list,
  groupsList: state.groups.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      assignToGroup: (data) => assignToGroup(data),
    },
    dispatch,
  );

const UserListItemWithStyle = withStyles(styles)(UserListItem);

export default connect(mapStateToProps, mapDispatchToProps)(UserListItemWithStyle);
