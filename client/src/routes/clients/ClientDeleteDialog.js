import React from 'react';
import { Form } from '@8base/forms';
import { Dialog, Button, ModalContext } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';
import { TOAST_SUCCESS_MESSAGE } from 'shared/constants';

const CLIENT_DELETE_DIALOG_ID = 'CLIENT_DELETE_DIALOG_ID';

class ClientDeleteDialog extends React.Component {
  static contextType = ModalContext;

  createOnSubmit = id => async () => {
    await this.props.brokerDelete({ variables: { id } });

    this.context.closeModal(CLIENT_DELETE_DIALOG_ID);
  };

  onClose = () => {
    this.context.closeModal(CLIENT_DELETE_DIALOG_ID);
  };

  renderFormContent = ({ handleSubmit, invalid, submitting }) => (
    <form onSubmit={handleSubmit}>
      <Dialog.Header title="Delete Broker" onClose={this.onClose} />
      <Dialog.Body scrollable>Are you really want to delete broker?</Dialog.Body>
      <Dialog.Footer>
        <Button color="neutral" variant="outlined" disabled={submitting} onClick={this.onClose}>
          Cancel
        </Button>
        <Button color="danger" type="submit" disabled={invalid} loading={submitting}>
          Delete Broker
        </Button>
      </Dialog.Footer>
    </form>
  );

  renderContent = ({ args }) => {
    return <Form onSubmit={this.createOnSubmit(args.id)}>{this.renderFormContent}</Form>;
  };

  render() {
    return (
      <Dialog id={CLIENT_DELETE_DIALOG_ID} size="sm">
        {this.renderContent}
      </Dialog>
    );
  }
}

ClientDeleteDialog = graphql(sharedGraphQL.CLIENT_DELETE_MUTATION, {
  name: 'brokerDelete',
  options: {
    refetchQueries: ['UsersList'],
    context: {
      [TOAST_SUCCESS_MESSAGE]: 'Client successfuly deleted',
    },
  },
})(ClientDeleteDialog);

ClientDeleteDialog.id = CLIENT_DELETE_DIALOG_ID;

export { ClientDeleteDialog };
