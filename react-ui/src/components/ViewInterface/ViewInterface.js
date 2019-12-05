import React from 'react';

class ViewInterface extends React.Component {
    componentDidMount = () =>
    {
    };

    render = () =>
    {
        return (
            <h1>View {this.props.match.params.videoID}</h1>
        );
    }
}

export default ViewInterface;