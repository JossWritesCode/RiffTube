import React from 'react';
import { connect } from 'react-redux';

class AllowPlayback extends React.Component {
    componentDidMount = () => {
      (new Audio()).play().catch( () => alert( "Need permission." ) );
    };
  
    render = () => {
      return null;
    };
  }
  
  const mapStateToProps = state => ({
  });
  
  const mapDispatchToProps = {
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AllowPlayback);
  