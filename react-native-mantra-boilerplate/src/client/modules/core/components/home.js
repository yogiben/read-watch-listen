import React, { Component } from 'react';
import { StyleSheet, Text, Linking} from 'react-native';
import { View, Container, Content, Button, Card, CardItem } from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import TabBar from './tab_bar';

import List from './list';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      page: 0
    };
  }

  toggleEditing() {
    this.setState({
      isEditing: !this.state.isEditing
    });
  }

  render() {
    const {items, actions} = this.props;
    const {isEditing} = this.state;


    const actionProps = {
      offsetY: 20,
      offsetX: 20,
      degrees: 360
    };

    const brand = '#27ae60';

    const {page} = this.state;

    return (
      <View style={{flex: 1}}>
        <ScrollableTabView
          prerenderingSiblingsNumber={2}
          renderTabBar={(props) => <TabBar {...props} />}
          tabBarActiveTextColor='black'
          tabBarUnderlineStyle={{backgroundColor: '#eee'}}
          tabBarBackgroundColor={brand}
          page={page}
          onChangeTab={({i, ref}) => this.setState({page: i})}
        >
          {['read', 'watch', 'listen'].map(list => (
            <List
              key={list}
              actions={actions}
              items={items.sort({createdAt: -1}).filter(i => i.list === list.toUpperCase())}
              list={list.toUpperCase()}
              tabLabel={list}
              isEditing={isEditing}
            />
          ))}
        </ScrollableTabView>
        {
          this.state.isEditing
          ? (
            <ActionButton {...actionProps} buttonColor='#1abc9c' onPress={this.toggleEditing.bind(this)} icon={
                <Icon name='ios-close' style={styles.actionButtonLgIcon} />}
              />
          ) : (
            <ActionButton {...actionProps} buttonColor={brand} icon={<Icon name='md-menu' style={styles.actionButtonIcon} />}>
              <ActionButton.Item buttonColor='#9b59b6' title="About" onPress={() => Linking.openURL('http://meteorfactory.io/')}>
                <Icon name="md-heart" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#3498db' title="Share" onPress={() => {}}>
                <Icon name="md-share" style={styles.actionButtonIcon} />
              </ActionButton.Item>
              <ActionButton.Item buttonColor="rgba(231,76,60,1)" title="Edit" onPress={this.toggleEditing.bind(this)}>
                <Icon name="ios-trash" style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
          )
        }
      </View>
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  actionButtonLgIcon: {
    fontSize: 35,
    height: 35,
    color: 'white',
  }
});
