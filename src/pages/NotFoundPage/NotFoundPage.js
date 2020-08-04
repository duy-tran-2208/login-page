import React from 'react';
import './NotFoundPage.css';

import { withRouter } from 'react-router';

const NotFoundPage = (props) => {
  const { history } = props;
  console.log(history);

  return (
    <div className='not-found-page-container'>
      <h1>404: Page not found</h1>
      <button
        type='button'
        class='btn btn-primary'
        onClick={() => history.goBack()}
      >
        Return
      </button>
    </div>
  );
};

export default withRouter(NotFoundPage);
