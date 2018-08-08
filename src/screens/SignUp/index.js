import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { ImageBackground, StatusBar } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Toast,
  Left,
  View,
  Footer,
  Header,
  Icon,
} from 'native-base';
import { signUp } from './behaviors';
import * as signUpSelectors from './selectors';

import styles from './styles';
import commonColor from '@theme/variables/commonColor';
import LoginInput from '@components/LoginInput';

import {
  required,
  alphaNumeric,
  email,
  minLength,
  maxLength,
} from '@utils/validation';

const minLength8 = minLength(8);
const maxLength15 = maxLength(15);

const FORM_NAME = 'signup';
class SignUpForm extends Component {
  static propTypes = {
    valid: PropTypes.bool,
    submitting: PropTypes.bool,
    signupSuccess: PropTypes.bool.isRequired,
    signUp: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }),
    formValues: PropTypes.object,
  };

  static defaultProps = {
    valid: false,
    submitting: false,
    signupSuccess: false,
  };

  handleSubmit = async values => {
    if (this.props.valid) {
      this.props.signUp(
        values,
        () => {
          Toast.show({
            text: 'Please check your mail to complete signUp process',
            duration: 2500,
            position: 'top',
            textStyle: { textAlign: 'center', color: '#FFF' },
          });
          this.props.navigation.goBack();
        },
        () => {
          Toast.show({
            text: 'Error creating account',
            duration: 2500,
            position: 'top',
            type: 'danger',
            textStyle: { textAlign: 'center', color: '#FFF' },
          });
        }
      );
    } else {
      Toast.show({
        text: 'Please provide valid sign up informations!',
        duration: 2500,
        position: 'top',
        type: 'danger',
        textStyle: { textAlign: 'center', color: '#FFF' },
      });
    }
  };

  render() {
    return (
      <Container>
        <StatusBar
          backgroundColor={commonColor.statusBarColor}
          barStyle="light-content"
        />
        <ImageBackground
          source={require('@assets/Background/bg2.png')}
          style={styles.background}>
          <Content>
            <Header style={styles.header.container}>
              <Left style={{ flex: 1 }}>
                <Button
                  transparent
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon style={styles.header.navigation} name="md-arrow-back" />
                </Button>
              </Left>
            </Header>
            <Text style={styles.header.title}>Sign Up</Text>
            <Form style={styles.form}>
              <Field
                name="username"
                component={LoginInput}
                type="text"
                validate={[required, alphaNumeric, maxLength15]}
              />
              <Field
                name="email"
                component={LoginInput}
                type="email"
                validate={[email, required]}
              />
              <Field
                name="password"
                component={LoginInput}
                type="password"
                validate={[alphaNumeric, minLength8, maxLength15, required]}
              />
              <Button
                primary
                large
                block
                onPress={() => this.handleSubmit(this.props.formValues)}
                style={styles.signupBtn}>
                <Text style={styles.signupBtn.text}>Sign Up</Text>
              </Button>
            </Form>
          </Content>
          <Footer>
            <View style={{ flexDirection: 'row' }}>
              <Button
                small
                transparent
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.signInText}>Already have an account?</Text>
                <Text style={styles.linkBtn}>Sign In</Text>
              </Button>
            </View>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

const SignUpFormForm = reduxForm({
  form: FORM_NAME,
})(SignUpForm);

const mapStateToProps = state => ({
  resetPasswordSuccess: signUpSelectors.getSignupSuccessState(state),
  formValues: getFormValues(FORM_NAME)(state),
});

export default connect(
  mapStateToProps,
  { signUp }
)(SignUpFormForm);
