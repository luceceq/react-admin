import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  withStyles, Paper, Toolbar, Typography, Fade,
  Table, TableHead, TableRow, TableCell, TableBody,
  ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
} from '@material-ui/core';
import IconChevronRight from '@material-ui/icons/ChevronRight';

import PageTitle from "./PageTitle";
import SearchBox from "./SearchBox";
import CustomDrawer from "./CustomDrawer";

const styles = theme => ({
  root: {
    width: '100%',
    position: 'relative',
    marginTop: theme.spacing.unit * 3,
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
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  diffSpan: {
    color: theme.palette.text.disabled,
  },
  notFound: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
  },
  table: {
    '& tr:first-child:last-child td': {
      borderBottom: 'none !important',
    }
  },
  expansionPanel: {
    boxShadow: 'none',
  },
  expansionPanelSummary: {
    minHeight: '32px !important',

    '& > div': {
      marginTop: '0 !important',
      marginBottom: '0 !important',
    },
  },
});

class ItemLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drawerData: {},
    };
  }

  handleItemClick = (item) => {
    this.setState({
      drawerData: item,
    });
  }

  handleDrawerClose = () => {
    this.setState({
      drawerData: {},
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <PageTitle />

        <SearchBox />

        <Fade
          in={Boolean(this.props.hardwareList.length)}
          style={{ transitionDelay: Boolean(this.props.hardwareList.length) ? 150 : 0 }}
        >
          <div>
          {
            this.props.hardwareList.map(item => (
              <React.Fragment key={item}>
                {
                  !Boolean(item.tags.length) && !Boolean(item.taglets.length)
                  ? <p className={classes.notFound}>No result found.</p>
                  : (
                    <Paper elevation={1} className={classes.root}>
                      <Table className={classes.table}>
                        {this._renderTableHead()}

                        <TableBody>
                          {item.tags.map(n => this._renderTableBody(n))}
                          {item.taglets.map(n => this._renderTableBody(n))}
                        </TableBody>
                      </Table>
                    </Paper>
                  )
                }
              </React.Fragment>
            ))
          }
          </div>
        </Fade>

        <CustomDrawer
          data={this.state.drawerData}
          onClose={this.handleDrawerClose}
        />
      </React.Fragment>
    );
  }

  _renderTableHead() {
    return (
      <TableHead>
        <TableRow>
          <TableCell width={'30%'}>Hardware Address</TableCell>
          <TableCell width={'20%'}>Type</TableCell>
          <TableCell width={'30%'}>Name</TableCell>
          <TableCell width={'20%'} numeric>Details</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  _renderTableRow(item) {
    return (
      <TableRow hover
        key={item.id}
        onClick={() => this.handleItemClick(item)}
        style={{cursor: 'pointer'}}
      >
        <TableCell width={'30%'}>{item.hardware_address}</TableCell>
        <TableCell width={'20%'}>{item.type}</TableCell>
        <TableCell width={'30%'}>{item.name}</TableCell>

        <TableCell numeric width={'20%'}>
          <IconChevronRight />
        </TableCell>
      </TableRow>
    )
  }

  _renderTableBody(item) {
    if (!item) return ('');

    return (
      <TableRow key={item.id}>
        <TableCell padding={'none'} colSpan={12}>
          <ExpansionPanel expanded className={this.props.classes.expansionPanel}>
            <ExpansionPanelSummary className={this.props.classes.expansionPanelSummary}>
              <Table style={{margin: '0 -24px 0', width: 'calc(100% + 48px)'}}>
                <TableBody>
                  {this._renderTableRow(item)}
                </TableBody>
              </Table>
            </ExpansionPanelSummary>

            {Boolean(item.children) && Boolean(item.children.length) && (
              <ExpansionPanelDetails style={{ display: 'block', }} >
                <div className={this.props.classes.root} style={{ border: '1px solid #eee', borderRadius: '4px', marginTop: 0, }}>
                  <Toolbar>
                    <div className={this.props.classes.title}>
                      <Typography variant="subheading">Children</Typography>
                    </div>

                    <div className={this.props.classes.spacer} />
                    <div className={this.props.classes.actions}></div>
                  </Toolbar>

                  {Boolean(item.children) && Boolean(item.children.length) && (
                    <div className={this.props.classes.tableWrapper}>
                      <Table className={this.props.classes.table}>
                        {this._renderTableHead()}

                        <TableBody>
                          {
                            item.children.map(m => (
                              this._renderTableRow(m)
                            ))
                          }
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </ExpansionPanelDetails>
            )}
          </ExpansionPanel>
        </TableCell>
      </TableRow>
    );
  }
}

ItemLookup.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  hardwareList: state.itemLookup.list,
});

const ItemLookupWithStyle = withStyles(styles)(ItemLookup);

export default connect(mapStateToProps, null)(ItemLookupWithStyle);
