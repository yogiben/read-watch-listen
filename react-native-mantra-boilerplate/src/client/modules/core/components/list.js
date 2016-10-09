import React, { Component } from 'react';
import { StyleSheet, TextInput, Platform} from 'react-native';
import { List, ListItem, Text, Button, CheckBox, View } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items,
      text: '',
    }
  }
  update(_id, $set) {
    const {actions} = this.props;
    if (_id && $set) {
      actions.update(_id, $set);
    }
  }

  toggleCheck(_id) {
    const {actions} = this.props;
    let {items} = this.state;

    const newItem = items.find(i => i._id === _id);
    newItem.done = !newItem.done;

    items = items.map(i => {
      return i._id === _id
        ? newItem
        : i;
    });

    actions.update(_id, {done: newItem.done});

    this.setState({items});
  }

  insert() {
    const {actions} = this.props;
    const label = this.state.text;

    if (!label) {
      return;
    }

    const {list} = this.props;

    const doc = {label, list};

    let {items} = this.state;
    items.unshift(doc);

    this.setState({
      items,
      text: ''
    });

    actions.insert(doc);
  }

  remove(_id) {
    const {actions} = this.props;
    let {items} = this.state;

    items = items.filter(i => i._id !== _id);
    actions.remove(_id);

    this.setState({items});

  }

  render() {
    const { items } = this.state;
    const {isEditing} = this.props;


    return (
      <List>
        <ListItem>
          <TextInput
            style={styles.textInput}
            placeholder='Add something'
            onSubmitEditing={this.insert.bind(this)}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            ref={c => this.textInput = c}
          />
        </ListItem>
        {items.map(item => (
          <ListItem key={item._id} style={{}}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{width: 40}}>
                {isEditing
                ? (
                  <Button transparent onPress={this.remove.bind(this, item._id)}>
                     <Icon name='ios-close-outline' color='red' style={{marginTop: 3, fontSize: 30}}/>
                  </Button>
                )
                : (
                  <View style={{paddingTop: 8}}>
                    <CheckBox checked={item.done} onPress={this.toggleCheck.bind(this, item._id)}/>
                  </View>
                )}
              </View>
              <TextInput
                editable={isEditing}
                underlineColorAndroid='transparent'
                style={styles.textInput}
                defaultValue={item.label} key={item.label}
                onChangeText={(label) => this.update(item._id, {label})}
              />
          </View>
          </ListItem>
          )
        )}
      </List>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    padding: 10
  },
  card: {
    marginTop: 20
  },
  textInput: {
    height: 40,
    flex: 1,
    borderColor: 'transparent',
    borderWidth: 1,
    flex: 1,
    color: 'black',
    ...Platform.select({
      ios: {

      },
      android: {
        fontSize: 17
      }
    })
  }
});
