import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AddNewGroup from "./addNewGroup";
import TableRowC from "./tableRowC";

import { getGroupsList } from "../../Actions/groups";
import { getUsrsListRequest } from "../../Actions/users";
import { getHardwaresListRequest } from "../../Actions/hardwares";
import { getFirmwareListRequest } from "../../Actions/firmware";
import { getFirmwareAssignments } from "../../Actions/firmwareAssignments";

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  toolbarRoot: {
    // paddingRight: theme.spacing.unit,
  },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap'
  },
  title: {
    flex: '0 0 auto',
  },
  button: {
    margin: theme.spacing.unit,
    marginLeft: 0,
  },
  typography: {
    padding: theme.spacing.unit * 3,
  },
  progress: {
    display: 'block',
    margin: theme.spacing.unit * 4,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});

class Groups extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 25,
      rowPerPageOptions: [50, 100],
    };
  }

  componentDidMount() {
    this.props.getGroupsList().then(() => {
      this.getRowPerPageOptions();
      this.props.getUsrsListRequest();
      this.props.getHardwaresListRequest();
      this.props.getFirmwareListRequest();
      this.props.getFirmwareAssignments();
    }).catch(() => {});
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getRowPerPageOptions = () => {
    let dataLength = this.props.groupsList.length;
    let arrayNum = [this.state.rowsPerPage];

    if (dataLength > this.state.rowsPerPage) {
      if (dataLength >= this.state.rowPerPageOptions[0]) {
        arrayNum.push(this.state.rowPerPageOptions[0])
      } else {
        arrayNum.push(dataLength)
      }
    }

    if (dataLength > this.state.rowPerPageOptions[0]) {
      if (dataLength >= this.state.rowPerPageOptions[1]) {
        arrayNum.push(this.state.rowPerPageOptions[1])
      } else {
        arrayNum.push(dataLength)
      }
    }

    this.setState({ rowPerPageOptions: arrayNum });
  }

  render() {
    const { classes, groupsList, isLoadingGroupList } = this.props;
    const { rowsPerPage, page, rowPerPageOptions } = this.state;

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Toolbar className={classes.toolbarRoot}>
            <div className={classes.title}>
              <Typography variant="title" id="tableTitle">
                Groups
              </Typography>
            </div>

            <div className={classes.spacer} />

            <div className={classes.actions}>
              <AddNewGroup />
            </div>
          </Toolbar>

          <div className={classes.tableWrapper}>
            {isLoadingGroupList && <CircularProgress className={classes.progress} />}

            {!isLoadingGroupList &&
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Group Name</TableCell>
                    <TableCell numeric>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {groupsList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                    return (
                      <TableRowC
                        key={n.id}
                        id={n.id}
                        name={n.name}
                      />
                    );
                  })}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={groupsList.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      rowsPerPageOptions={rowPerPageOptions}
                      // ActionsComponent={TablePaginationActionsWrapped}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            }
          </div>
        </Paper>
      </React.Fragment>
    );
  }
}

Groups.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
  groupsList: PropTypes.array,
  isLoadingGroupList: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.auth,
  groupsList: state.groups.list,
  isLoadingGroupList: state.groups.isLoading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: (path = null) => push(`/${path}`),
      getGroupsList: () => getGroupsList(),
      getUsrsListRequest: () => getUsrsListRequest(),
      getHardwaresListRequest: () => getHardwaresListRequest(),
      getFirmwareListRequest: () => getFirmwareListRequest(),
      getFirmwareAssignments: () => getFirmwareAssignments(),
    },
    dispatch,
  );

const GroupsWithStyle = withStyles(styles)(Groups);

export default connect(mapStateToProps, mapDispatchToProps)(GroupsWithStyle);
