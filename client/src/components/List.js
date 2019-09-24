import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class List extends Component {

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
                        <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>

                                <Button 
                                    className="remove-btn" 
                                    color="danger" 
                                    size="sm" 
                                    onClick={this.onDeleteClick.bind(this, id)}>
                                &times;</Button>
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

List.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired //mapping redux state to component property
}

const mapStateToProps = (state) => ({
    // has to match in index.js what we called reducer (in export)
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(List);