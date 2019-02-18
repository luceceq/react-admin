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

import TableRowC from "./tableRowC";

import { getUsrsListRequest } from "../../Actions/users";

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

class Hardwares extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      rowsPerPage: 25,
      rowPerPageOptions: [50, 100],
    };
  }

  componentDidMount() {
    this.props.getTheList().then(() => {
      this.getRowPerPageOptions();
    });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getRowPerPageOptions = () => {
    let dataLength = this.props.theList.length;
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
    const { classes, theList, isLoadingTheList } = this.props;
    const { rowsPerPage, page, rowPerPageOptions } = this.state;

    return (
      <React.Fragment>
        <Paper className={classes.root}>
          <Toolbar className={classes.toolbarRoot}>
            <div className={classes.title}>
              <Typography variant="title">Users</Typography>
            </div>
          </Toolbar>

          <div className={classes.tableWrapper}>
            {isLoadingTheList && <CircularProgress className={classes.progress} />}

            {!isLoadingTheList &&
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>User Id</TableCell>
                    <TableCell>Cognito User Id</TableCell>
                    <TableCell numeric>Group Id</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {theList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(n => {
                    return (
                      <TableRowC
                        key={n.id}
                        user={n}
                      />
                    );
                  })}
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      count={theList.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onChangePage={this.handleChangePage}
                      onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      rowsPerPageOptions={rowPerPageOptions}
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

Hardwares.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
  theList: PropTypes.array,
  isLoadingTheList: PropTypes.bool,
};

const mapStateToProps = state => ({
  auth: state.auth,
  theList: state.users.list,
  isLoadingTheList: state.users.isLoading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: (path = null) => push(`/${path}`),
      getTheList: () => getUsrsListRequest(),
    },
    dispatch,
  );

const UsersWithStyle = withStyles(styles)(Hardwares);

export default connect(mapStateToProps, mapDispatchToProps)(UsersWithStyle);
