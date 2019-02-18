import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

import { deleteUser, deleteItems } from "../../Actions/deleteItem";
import { toast } from 'react-toastify';



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
  typography: {
    padding: theme.spacing.unit * 3,
  },
  progress: {
    display: 'block',
    margin: theme.spacing.unit * 4,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  searchbox: {
    // width: '75%',
    position: 'relative',
    marginTop: theme.spacing.unit * 3,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 3,
  },
  input: {
    flex: 1,
    paddingRight: theme.spacing.unit,
    paddingLeft: theme.spacing.unit,
  },
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    display: 'block',
    width: '100%',
    minWidth: 120,
  },
  searchButton: {
    marginLeft: theme.spacing.unit * 2,
  },
});

class DeleteItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      isLoading: false,
    };
  }

  handleChangeSearchInput = (e) => {
    this.setState({
      inputValue: e.target.value.trim(),
    });
  }

  sendRelatedRequest = (type, emailAddress) => {
    return this.props[type]({
      "email": emailAddress,
    }).then(r => {
      toast.success(r.data || 'Your request was successful.');

      this.setState({
        isLoading: false,
        inputValue: '',
      });
    }).catch(e => {
      this.setState({
        isLoading: false,
      });
    });
  }

  handleDeletUser = () => {
    this.setState({
      isLoading: true,
    }, () => {
      this.sendRelatedRequest('deleteItems', this.state.inputValue);
    });
  }

  handleDeleteItems = () => {
    this.setState({
      isLoading: true,
    }, () => {
      this.sendRelatedRequest('deleteItems', this.state.inputValue);
    });
  }

  render() {
    const { classes, } = this.props;

    return (
      <React.Fragment>

        <Toolbar className={classes.toolbarRoot}>
          <div className={classes.title}>
            <Typography variant="title" id="tableTitle">
              Account Reset
            </Typography>
          </div>

          <div className={classes.spacer} />

          <div className={classes.actions}>
          </div>
        </Toolbar>

        <Paper className={classes.searchbox}>
          <FormControl className={classes.formControl}>
            <div className={classes.container}>
              <Input
                name="searchInput"
                className={classes.input}
                onChange={this.handleChangeSearchInput}
                disabled={this.state.isLoading}
                value={this.state.inputValue}
                inputProps={{
                  'aria-label': 'Email',
                  'placeholder': 'Enter email address',
                }}
              />

              {/*<Button
                variant="contained"
                className={classes.searchButton}
                onClick={this.handleDeletUser}
                disabled={!this.state.inputValue || this.state.isLoading}
              >
                Delete User
              </Button>*/}

              <Button
                variant="contained"
                className={classes.searchButton}
                onClick={this.handleDeleteItems}
                disabled={!this.state.inputValue || this.state.isLoading}
              >
                Reset
              </Button>
            </div>
          </FormControl>
        </Paper>
      </React.Fragment>
    );
  }
}

DeleteItem.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      changePage: (path = null) => push(`/${path}`),
      deleteUser,
      deleteItems,
    },
    dispatch,
  );

const DeleteItemWithStyle = withStyles(styles)(DeleteItem);

export default connect(mapStateToProps, mapDispatchToProps)(DeleteItemWithStyle);
