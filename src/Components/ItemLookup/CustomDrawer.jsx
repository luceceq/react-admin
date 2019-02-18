import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Drawer, List, ListItem, ListItemText } from '@material-ui/core';

import DeleteIButton from './DeleteIButton';

const styles = theme => ({
  list: {
    width: 375,
  },
  actionsSection: {
    margin: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 1,
  },
  diffSpan: {
    color: theme.palette.secondary.dark,
  },
});

class CustomDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.open && this.props.data.id) {
      this.setState({
        open: true,
      });
    }
  }

  toggleDrawer = (status) => () => {
    this.setState({
      open: status,
    });
  }

  handleOnClose = () => {
    this.toggleDrawer(false)();
    this.props.onClose();
  }

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        anchor="right"
        open={this.state.open}
        onClose={this.handleOnClose}
      >
        <div>
          <div className={classes.list}>
            <List>
              <ListItem>
                <Typography variant="title">Details:</Typography>
              </ListItem>
            </List>

            <List>
              {this.props.data.hasOwnProperty('id') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Id:</Typography>
                  <ListItemText primary={this.props.data.id} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('name') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Name:</Typography>
                  <ListItemText primary={this.props.data.name} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('email') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Email:</Typography>
                  <ListItemText primary={this.props.data.email} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('type') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Type:</Typography>
                  <ListItemText primary={this.props.data.type} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('fw_version') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Firmware Version:</Typography>
                  <ListItemText primary={this.props.data.fw_version} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('lost_mode') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Lost Mode:</Typography>
                  <ListItemText primary={this.props.data.lost_mode} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('onboarded') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Onboarded:</Typography>
                  <ListItemText primary={this.props.data.onboarded} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('hw_version') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Hardware Version:</Typography>
                  <ListItemText primary={this.props.data.hw_version} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('hardware_address') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Hardware Address:</Typography>
                  <ListItemText primary={this.props.data.hardware_address} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('tag_device_id') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Tag Device Id:</Typography>
                  <ListItemText primary={this.props.data.tag_device_id} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('serial') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Serial:</Typography>
                  <ListItemText primary={this.props.data.serial} />
                </ListItem>
              )}

              {this.props.data.hasOwnProperty('security_key') && (
                <ListItem dense divider>
                  <Typography className={classes.diffSpan}>Security Key:</Typography>
                  <ListItemText primary={this.props.data.security_key} />
                </ListItem>
              )}
            </List>
          </div>

          {Boolean(this.props.data.id) && (
            <div className={classes.actionsSection}>
              <DeleteIButton
                id={this.props.data.id}
                onDelete={this.handleOnClose}
              />
            </div>
          )}
        </div>
      </Drawer>
    );
  }
}

CustomDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  onClose: PropTypes.func,
};

export default withStyles(styles)(CustomDrawer);
