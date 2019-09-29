import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class List extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    // dispact getitems to reducer and brings it into component - run in lifecycle method: componentDidMount
    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    };

    render() {
        
        const { items } = this.props.item;
        return(
            <Container>
                    <ListGroup>
                        <TransitionGroup className="list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>

                                    {this.props.isAuthenticated ? (
                                        <Button 
                                            className="remove-btn" 
                                            color="danger" 
                                            size="sm" 
                                            onClick={this.onDeleteClick.bind(this, _id)}>
                                        &times;</Button>
                                    ) : null}

                                    {name}
                                </ListGroupItem>

                            </CSSTransition>
                        ))}
                        </TransitionGroup>
                    </ListGroup>

            </Container>
        );
    }
}

// List.propTypes = {
//     getItems: PropTypes.func.isRequired,
//     item: PropTypes.object.isRequired 
//     //mapping redux state to component property
// }

const mapStateToProps = (state) => ({
    // has to match in index.js what we called reducer (in export)
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(List);