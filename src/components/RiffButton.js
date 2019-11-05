import React from 'react';

class RiffButton extends React.Component
{
    render()
    {
        return (
            <button
                    id={ this.props.id }
                    onClick={ this.props.createTemp }
                >{this.props.type}</button>
        );
    }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    createTemp: () => { dispatch( createTemp( ownProps.type ) ); }
  })
  
  export default connect(
    null,
    mapDispatchToProps
  )(RiffButton);