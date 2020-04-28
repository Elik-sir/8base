import React from 'react';
import { Form, Field } from '@8base/forms';
import { Dialog, Grid, Button, SelectField, ModalContext } from '@8base/boost';
import { Query, graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const ORDER_CREATE_DIALOG_ID = 'ORDER_CREATE_DIALOG_ID';

class OrderCreateDialog extends React.Component {
  static contextType = ModalContext;

  onSubmit = async data => {
    await this.props.customerCreate({ variables: { data } });

    this.context.closeModal(ORDER_CREATE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(ORDER_CREATE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting, pristine }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="New Customer" onClose={this.onClose} />
      <Dialog.Body scrollable>
        <Grid.Layout gap="sm" stretch>
          <Grid.Box>
            <Query query={sharedGraphQL.USERS_LIST_QUERY}>
              {({ data, loading }) => (
                <Field
                  name="user"
                  label="User"
                  placeholder="Select a user"
                  component={SelectField}
                  loading={loading}
                  options={
                    loading
                      ? []
                      : (data.usersList.items || []).map(user => ({
                          value: user.id,
                          label: `${user.firstName} ${user.lastName}`,
                        }))
                  }
                  stretch
                />
              )}
            </Query>
          </Grid.Box>
        </Grid.Layout>
      </Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="primary" type="submit" loading={submitting}>
          Create Customer
        </Button>
      </Dialog.Footer>
    </form>
  );

  render() {
    return (
      <Dialog id={ORDER_CREATE_DIALOG_ID} size="sm">
        <Form type="CREATE" tableSchemaName="Customers" onSubmit={this.onSubmit}>
          {this.renderFormContent}
        </Form>
      </Dialog>
    );
  }
}

OrderCreateDialog = graphql(sharedGraphQL.ORDER_CREATE_MUTATION, {
  name: 'customerCreate',
  options: {
    refetchQueries: ['OrderssList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Order successfuly created',
    },
  },
})(OrderCreateDialog);

OrderCreateDialog.id = ORDER_CREATE_DIALOG_ID;

export { OrderCreateDialog };
