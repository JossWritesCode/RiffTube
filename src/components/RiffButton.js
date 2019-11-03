import React from 'react';

class Login extends React.Component
{
    render()
    {
        return (
            <button
                    id={ this.props.id }
                    onClick={ this.props.addRiff }
                >{this.props.type}</button>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    addRiff: () => { dispatch( addRiff( ownProps.type ) ); }
  })
  
  export default connect(
    null,
    mapDispatchToProps
  )(RiffButton);