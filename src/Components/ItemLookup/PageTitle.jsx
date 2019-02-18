import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function PageTitle() {
  return (
    <Toolbar>
      <div>
        <Typography variant="title" id="tableTitle">
          Item Lookup
          {/* <Typography variant="caption">
            (by Hardware Address)
          </Typography> */}
        </Typography>
      </div>
    </Toolbar>
  );
}
