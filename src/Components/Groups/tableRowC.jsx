import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import IconDelete from '@material-ui/icons/Delete';
import IconEdit from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import List from '@material-ui/core/List';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FirmwareListItem from './firmwareListItem.jsx';
import UserListItem from "./userListItem";
import ConfirmDialog from "../Commons/ConfirmDialog";

import { deleteGroupRequest } from "../../Actions/groups";

const styles = theme => ({
  modalPaper: {
    maxHeight: 300,
    overflow: 'auto',
  },
  tabsWrap: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 3,
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '$tabSelected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  tabsRoot: {
    borderBottom: '1px solid #e8e8e8',
  },
  modalTitle: {
    paddingBottom: 0,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  actionSection: {},
});

class TableRowC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogManageGroup: false,
      tabActive: 0,
      selectBoxCurrent: 0,
      isLoading: false,
    };
  }

  handleModalOpen = () => {
    this.setState({ dialogManageGroup: true });
  };

  handleModalClose = () => {
    this.setState({ dialogManageGroup: false });
  };

  handleTabChange = (event, tabActive) => {
    this.setState({ tabActive });
  };

  handleSelectBoxChange = el => {
    this.setState({
      selectBoxCurrent: el.target.value,
    });
  }

  deleteItem = id => {
    this.setState({
      isLoading: true,
    });

    this.props.deleteGroupRequest(id).catch(e => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { classes } = this.props;
    const { tabActive } = this.state;

    return (
      <React.Fragment>
        <TableRow key={this.props.id}>
          <TableCell component="th" scope="row">
            {this.props.name}
          </TableCell>
          <TableCell numeric>
            <Button
              size="small"
              disabled={this.state.isLoading}
              onClick={this.handleModalOpen}
            >
              <IconEdit className={classNames(classes.leftIcon, classes.iconSmall)} /> Edit
            </Button>

            <ConfirmDialog
              callback={() => this.deleteItem(this.props.id)}
              render={(openModal) => (
                <Button
                  size="small"
                  disabled={this.state.isLoading}
                  onClick={openModal}
                >
                  {this.state.isLoading
                    ? <CircularProgress className={classNames(classes.leftIcon, classes.iconSmall)} size={22} />
                    : <IconDelete className={classNames(classes.leftIcon, classes.iconSmall)} />
                  }{' '}Delete
                </Button>
              )}
            />
          </TableCell>
        </TableRow>

        <Dialog
          fullWidth={true}
          // maxWidth='md'
          open={this.state.dialogManageGroup}
          onClose={this.handleModalClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className={classes.modalTitle}>
            Manage Group
          </DialogTitle>

          <DialogContent>
            <Tabs
              value={tabActive}
              onChange={this.handleTabChange}
              classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            >
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Users"
              />
              <Tab
                disableRipple
                classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                label="Firmware"
              />
            </Tabs>

            <div className={classes.tabsWrap}>
              {tabActive === 0 && (
                <div className={classes.modalPaper}>
                  <List>
                    {this.props.userList.map(user => (
                      <UserListItem
                        key={user.id}
                        groupId={this.props.id}
                        user={user}
                      />
                    ))}
                  </List>
                </div>
              )}

              {tabActive === 1 && (
                <div className={classes.tabContainer}>
                  <div className={classes.modalPaper}>
                    <List>
                      <FirmwareListItem groupId={this.props.id} />
                    </List>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>

          <DialogActions className={classes.actionSection}>
            <Button onClick={this.handleModalClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

TableRowC.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  userList: state.users.list,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteGroupRequest: (id) => deleteGroupRequest(id),
    },
    dispatch,
  );

const TableRowCWithStyle = withStyles(styles)(TableRowC);

export default connect(mapStateToProps, mapDispatchToProps)(TableRowCWithStyle);
