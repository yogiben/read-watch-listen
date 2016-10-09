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
  update(label, $set) {
    const {actions} = this.props;
    if (label && $set) {
      actions.update(label, $set);
    }
  }

  toggleCheck(label) {
    const {actions} = this.props;
    let {items} = this.state;

    const newItem = items.find(i => i.label === label);
    newItem.done = !newItem.done;

    items = items.map(i => {
      return i.label === label
        ? newItem
        : i;
    });

    actions.update(label, {done: newItem.done});

    this.setState({items});
  }

  insert(label) {
    const {actions} = this.props;

    if (!label) {
      label = this.state.text;
    }

    if (!label) {
      return;
    }

    const {list} = this.props;

    const doc = {label, list, createdAt: new Date()};

    let {items} = this.state;
    items.unshift(doc);

    this.setState({
      items,
      text: ''
    });

    actions.insert(doc);
  }

  remove(label) {
    const {actions} = this.props;
    let {items} = this.state;

    items = items.filter(i => i.label !== label);
    actions.remove(label);

    this.setState({items});

  }

  componentDidMount() {
    if (this.props.items.length === 0) {
      this.addFixtures();
    }
  }

  addFixtures() {

    const {list, items} = this.props;

    const itemLib = {
      READ: [
        'War and peace', 'The Blockchain Revolution',
      ],
      WATCH: [
        'Bojack Horseman','The Lobster', 'Holy Mountain'
      ],
      LISTEN: [
        'Edward Sharpe and the Magnetic Zeros', 'Bonobo',
      ]
    };

    const fixtures = itemLib[list]
      .forEach(i => this.insert(i));
  }

  render() {
    const { items } = this.state;
    const {isEditing} = this.props;
    const brand = '#27ae60';

    return (
      <List style={{paddingTop: 5}}>
        <ListItem>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              style={styles.textInput}
              placeholder='Add something'
              onSubmitEditing={this.insert.bind(this)}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              ref={c => this.textInput = c}
            />
          {this.state.text
          ? (
            <View style={{width: 40}}>
              <Button transparent onPress={this.insert.bind(this)}>
                <Icon name='ios-add-circle' color={brand} style={{marginTop: 3, fontSize: 30}}/>
              </Button>
            </View>
          ) : null}
        </View>
        </ListItem>
        {items
          .sort((a, b) => b.createdAt - a.createdAt)
          .map(item => (
          <ListItem key={item.label} style={{}}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{width: 40}}>
                {isEditing
                ? (
                  <Button transparent onPress={this.remove.bind(this, item.label)}>
                     <Icon name='ios-close-outline' color='red' style={{marginTop: 3, fontSize: 30}}/>
                  </Button>
                )
                : (
                  <View style={{paddingTop: 8}}>
                    <CheckBox checked={item.done} onPress={this.toggleCheck.bind(this, item.label)}/>
                  </View>
                )}
              </View>
              <TextInput
                editable={isEditing}
                underlineColorAndroid='transparent'
                style={styles.textInput}
                defaultValue={item.label} key={item.label}
                onChangeText={(label) => this.update(item.label, {label})}
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
