import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues, change, reset } from 'redux-form';
import { ImageBackground, TouchableOpacity } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Icon,
  Form,
  Footer,
  Spinner,
  View,
  Row,
  Col,
} from 'native-base';
import AppHeader from '@components/AppHeader';
import FormInput from '@components/FormInput';
import Notification from '@components/Notification';
import { required, alphaNumeric } from '@utils/validation';
import IconExplorer from './IconExplorer';
import * as actions from './behaviors';
import * as categorySelectors from '@screens/NewCategory/selectors';
import styles from './styles';

const FORM_NAME = 'AddCategory';

class CategoryForm extends React.Component {
  static propTypes = {
    addCategoryStarted: PropTypes.bool,
    addCategorySuccess: PropTypes.bool.isRequired,
    addCategoryError: PropTypes.bool,
    doAddCategory: PropTypes.func.isRequired,
    navigation: PropTypes.shape({
      goBack: PropTypes.func.isRequired,
      navigate: PropTypes.func.isRequired,
    }),
    dispatch: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formValues: PropTypes.object,
  };

  static defaultProps = {
    addCategoryStarted: false,
    addCategorySuccess: false,
    addCategoryError: false,
    formValues: {
      iconName: 'ios-add-circle-outline',
    },
  };

  state = {
    showIconExplorer: false,
    iconSelected: undefined,
  };

  changeFormField = (field, value) => {
    this.props.dispatch(change(FORM_NAME, field, value));
  };

  onIconSelect = id => {
    this.setState(() => ({
      showIconExplorer: false,
      iconSelected: id,
    }));
    this.changeFormField('iconName', id);
  };

  handleSubmit = values => {
    this.props.doAddCategory(values, () => {
      this.props.navigation.navigate('Categories');
      this.props.dispatch(reset(FORM_NAME));
    });
  };

  render() {
    const {
      navigation,
      handleSubmit,
      addCategoryStarted,
      addCategoryError,
      formValues,
    } = this.props;
    return (
      <Container>
        <ImageBackground
          source={require('@assets/images/header-bg-small.png')}
          style={styles.background}>
          <AppHeader navigation={navigation} title="Add Category" />
          <Content showsVerticalScrollIndicator={false} style={styles.content}>
            {addCategoryError && (
              <Notification
                message="Error creating a new category!"
                buttonText="Retry"
                duration={5000}
                position="bottom"
                type="danger"
              />
            )}
            <Form style={styles.form}>
              <Field
                name="name"
                label="Category Name"
                component={FormInput}
                itemStyle={styles.formInput}
                inputStyle={styles.formInput}
                type="text"
                validate={[required, alphaNumeric]}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => {
                  this.setState(() => ({
                    showIconExplorer: true,
                  }));
                }}>
                <Row style={styles.iconSelect.container}>
                  <Col size={7}>
                    <Icon
                      style={styles.iconSelect.categoryIcon}
                      name={formValues && formValues.iconName}
                    />
                  </Col>
                  <Col size={3}>
                    <Text style={styles.iconSelect.text}>Select Icon</Text>
                  </Col>
                  <Col size={2}>
                    <Icon
                      active
                      style={styles.iconSelect.icon}
                      name="ios-arrow-down"
                    />
                  </Col>
                </Row>
              </TouchableOpacity>
              {this.state.showIconExplorer && (
                <IconExplorer onIconSelect={this.onIconSelect} />
              )}
            </Form>
          </Content>
          <Footer style={styles.footer}>
            <View>
              <Button
                large
                primary
                block
                full
                onPress={handleSubmit(this.handleSubmit)}>
                {addCategoryStarted ? (
                  <Spinner color="#fff" />
                ) : (
                  <Text> Add </Text>
                )}
              </Button>
              <Button
                transparent
                large
                block
                full
                onPress={() => navigation.navigate('Categories')}>
                <Text>Cancel</Text>
              </Button>
            </View>
          </Footer>
        </ImageBackground>
      </Container>
    );
  }
}

export const NewCategoryForm = reduxForm({
  form: FORM_NAME,
})(CategoryForm);

const mapStateToProps = state => ({
  addCategoryStarted: categorySelectors.isAddCategoryStarted(state),
  addCategorySuccess: categorySelectors.isAddCategorySuccess(state),
  addCategoryError: categorySelectors.isAddCategoryError(state),
  formValues: getFormValues(FORM_NAME)(state),
});

export default connect(
  mapStateToProps,
  actions
)(NewCategoryForm);
