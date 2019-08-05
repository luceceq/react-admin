import React, {Component} from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

function Transition (props) {
  return <Slide direction="up" {...props} />;
}

class confirmDialog extends Component {
  constructor (props) {
    super (props);

    this.state = {
      dialogShowingStatus: false,
    };
  }

  handleModalOpen = () => this.setState ({dialogShowingStatus: true});
  handleModalClose = () => this.setState ({dialogShowingStatus: false});

  handleCallback = () => {
    this.setState (
      {
        dialogShowingStatus: false,
      },
      () => {
        this.props.callback ();
      }
    );
  };

  render () {
    return (
      <React.Fragment>
        {this.props.render (this.handleModalOpen)}

        <Dialog
          keepMounted
          TransitionComponent={Transition}
          open={this.state.dialogShowingStatus}
          onClose={this.handleModalClose}
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'Do you want to confirm this action?'}
          </DialogTitle>

          <DialogContent>
            <DialogContentText>
              This will delete the item permanently.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button onClick={this.handleModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCallback} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default confirmDialog;
