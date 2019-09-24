import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems } from '../actions/itemActions';
import PropTypes from 'prop-types';

class List extends Component {

    // dispact getitems to reducer and brings it into component - run in lifecycle method: componentDidMount
    componentDidMount() {
        this.props.getItems();
    }

    render() {
        
        const { items } = this.props.item;
        return(
            <Container>
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={() => {
                        const name = prompt('Enter Item');
                        if(name) {
                            this.setState(state => ({
                                items: [...state.items, { id: uuid(), name }]
                            }));
                        }
                    }}>
                    Add Item
                    </Button>

                    <ListGroup>
                        <TransitionGroup className="shopping-list">
                        {items.map(({ id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                {/* whatever item is clicked will be filtered out of the array */}
                                <Button 
                                    className="remove-btn" 
                                    color="danger" 
                                    size="sm" 
                                    onClick={() => {
                                        this.setState(state => ({
                                            items: state.items.filter(item => item.id !==id) 
                                        }));
                                    }}>
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

export default connect(mapStateToProps, { getItems })(List);