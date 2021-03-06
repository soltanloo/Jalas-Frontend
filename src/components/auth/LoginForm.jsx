import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { login } from '../../actions/auth_actions';
import Button from "@material-ui/core/Button";

class LoginForm extends Component {
  onSubmit(values) {
    this.props.login(values, () => {
      this.props.history.push('/');
    });
  }
  renderField = ({
    label,
    input,
    meta: { touched, invalid, error },
    ...custom
  }) => (
    <TextField
      label={label}
      placeholder={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
    />
  );

  render() {
    if (this.props.auth.userId) {
      return <Redirect to="/" />;
    }
    const { handleSubmit } = this.props;
    return (
      <Paper
        style={{
          padding: 10,
          width: 'fit-content',
          minWidth: '300px',
          margin: '10px auto',
        }}
      >
        <Typography variant="h5" component="h3" align={'center'}>
          ورود
        </Typography>
        <div>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div>
              <Field
                fullWidth
                name="email"
                required
                type="email"
                id="email"
                label="رایانامه"
                component={this.renderField}
              />
            </div>
            <div>
              <Field
                fullWidth
                name="password"
                required
                type="password"
                id="password"
                label="گذرواژه"
                component={this.renderField}
              />
            </div>
            <div>
              {this.props.auth.errorMessage}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={this.props.auth.isAuthenticating}
              >
                {this.props.auth.isAuthenticating ? 'در حال ورود' : 'وارد شو'}
              </Button>
            </div>
          </form>
        </div>
      </Paper>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'ضروری';
  }
  if (!values.password) {
    errors.password = 'ضروری';
  }
  return errors;
};

function mapStateToProps({ auth }, ownProps) {
  return { auth };
}

export default reduxForm({
  form: 'loginForm',
  validate,
})(
  connect(mapStateToProps, { login })(LoginForm),
);
