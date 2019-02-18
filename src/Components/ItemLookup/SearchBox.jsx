import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from "redux";
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, CircularProgress,
  FormControl, Input, Button, MenuItem, Select,
} from '@material-ui/core';

import { history } from "../../store";
import { requestSearch } from "../../Actions/itemLookup";

const styles = theme => ({
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
  selectbox: {
    minWidth: 100,
    marginRight: theme.spacing.unit * 2,
  },
  searchButton: {
    marginLeft: theme.spacing.unit * 2,
    width: 85,
    height: 36,
  },
  progress: {
    display: 'block',
    margin: 0,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
});

class SearchBox extends PureComponent {
  constructor(props) {
    super(props);

    this.searchInput = React.createRef();

    this.state = {
      inputValue: '',
      searchtype: 'email',
    }
  }

  componentDidMount() {
    let currentSearchType = window.location.search.substr(1);

    if (this.state.searchtype !== currentSearchType) {
      this.updateSearchType(currentSearchType);
    }

    let unlistenRouterChange = history.listen(changedType => {
      this.updateSearchType(changedType.search.substr(1));
    });

    this.setState({
      unlistenRouterChange,
    });
  }

  componentWillUnmount() {
    if (this.state.unlistenRouterChange) {
      this.state.unlistenRouterChange();
    }

    this.setState({
      unlistenRouterChange: null,
    });
  }

  handleChangeSearchType = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    history.push({
      search: `?${event.target.name}=${event.target.value}`
    });
  };

  handleChangeSearchInput = () => {
    let value = this.searchInput.current.value.trim();

    this.setState({
      inputValue: value,
    });
  }

  handleChangeSearchSubmit = (e) => {
    // let value = e.target.value.trim();
    let value = this.searchInput.current.value.trim();

    if (value) {
      this.props.requestSearch({
        query: `${this.state.searchtype}=${value}`,
      });
    }

    if (e) {
      e.preventDefault();
    }
  }

  updateSearchType = (type) => {
    switch (type) {
      case 'searchtype=hardware_address':
        this.setState({
          searchtype: 'hardware_address',
        }, () => {
          this.handleChangeSearchSubmit();
        });
        break;

      default:
        this.setState({
          searchtype: 'email',
        }, () => {
          this.handleChangeSearchSubmit();
        });
        break;
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.searchbox}>
        <form autoComplete="off" onSubmit={this.handleChangeSearchSubmit}>
          <FormControl className={classes.formControl}>
            <div className={classes.container}>
              <Select
                className={classes.selectbox}
                value={this.state.searchtype}
                onChange={this.handleChangeSearchType}
                inputProps={{
                  name: 'searchtype',
                  id: 'search-type-select',
                }}
              >
                <MenuItem value='email'>Email Address</MenuItem>
                <MenuItem value='hardware_address'>Hardware Address</MenuItem>
              </Select>

              <Input
                name="searchInput"
                className={classes.input}
                inputRef={this.searchInput}
                onChange={this.handleChangeSearchInput}
                inputProps={{
                  'aria-label': 'Search',
                  'placeholder': 'Search…',
                }}
              />

              <Button
                variant="contained"
                component="span"
                className={classes.searchButton}
                disabled={this.props.isLoading || !this.state.inputValue}
                onClick={this.handleChangeSearchSubmit}
              >
                {
                  this.props.isLoading
                  ? <CircularProgress size={18} className={classes.progress} />
                  : 'Search'
                }
              </Button>
            </div>
          </FormControl>
        </form>
      </Paper>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  itemLookup: state.itemLookup,
  isLoading: state.itemLookup.isLoading,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      requestSearch,
    },
    dispatch,
  );

const SearchBoxWithStyle = withStyles(styles)(SearchBox);

export default connect(mapStateToProps, mapDispatchToProps)(SearchBoxWithStyle);
