import React from 'react';
import { connect } from 'react-redux';

class AllowPlayback extends React.Component {
    componentDidMount = () => {
      //(new Audio()).play().catch( () => alert( "Need permission." ) );
      // -> "Autoplay is only allowed when approved by the user, the site is activated by the user, or media is muted."
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
  