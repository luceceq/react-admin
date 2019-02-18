import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import SelectFirmware from "./SelectFirmware";

const styles = theme => ({
  simpleListItem: {
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
});

class FirmwareListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogConfirmDelete: false,
    };
  }

  handleModalOpenConfirmDelete = () => {
    this.setState({
      dialogConfirmDelete: true,
    });
  }

  handleModalCloseConfirmDelete = () => {
    this.setState({
      dialogConfirmDelete: false,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        {this.props.hardwaresList.map(item => (
          <ListItem
            key={item.id}
            divider
            className={classes.simpleListItem}
          >
            <ListItemText primary={item.name} />
            <SelectFirmware hardwareId={item.id} groupId={this.props.groupId} />
          </ListItem>
        ))}
      </React.Fragment>
    );
  }
}

FirmwareListItem.propTypes = {
  classes: PropTypes.object.isRequired,
  groupId: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  hardwaresList: state.hardwares.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {},
    dispatch,
  );

const FirmwareListItemWithStyle = withStyles(styles)(FirmwareListItem);

export default connect(mapStateToProps, mapDispatchToProps)(FirmwareListItemWithStyle);
