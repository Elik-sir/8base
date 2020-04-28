import React from 'react';
import { Dialog, Grid, Button, ModalContext, Table, Dropdown, Icon, Menu } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { OrderCreateDialog } from './OrderCreateDialog';
const ORDER_INFO_DIALOG_ID = 'ORDER_INFO_DIALOG_ID';

class OrderInfoDialog extends React.Component {
  static contextType = ModalContext;
  onClose = () => {
    this.context.closeModal(ORDER_INFO_DIALOG_ID);
  };
  componentWillMount() {}

  render() {
    return (
      <Dialog id={ORDER_INFO_DIALOG_ID} size="lg">
        <Dialog.Header title="Order Info" onClose={this.onClose} />
        <Dialog.Body scrollable>
          <Grid.Layout gap="lg" stretch>
            <Table>
              <Table.Header columns="repeat(4, 1fr) 90px">
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>quantity</Table.HeaderCell>
                <Table.HeaderCell />

                <Table.HeaderCell />
              </Table.Header>

              <Table.Body
                loading={this.props.orderedProducts.loading}
                data={this.props.orderedProducts}
                action="Add product"
                onActionClick={() => this.props.openModal(OrderCreateDialog.id)}
              >
                {order => (
                  <Table.BodyRow columns="repeat(4, 1fr) 90px" key={order.id}>
                    <Table.BodyCell>{order.products.name_product}</Table.BodyCell>
                    <Table.BodyCell>{order.products.price}</Table.BodyCell>
                    <Table.BodyCell>{order.quantity}</Table.BodyCell>

                    <Table.BodyCell>
                      <Dropdown defaultOpen={false}>
                        <Dropdown.Head>
                          <Icon name="More" color="LIGHT_GRAY2" />
                        </Dropdown.Head>
                        <Dropdown.Body pin="right">
                          {({ closeDropdown }) => (
                            <Menu>
                              <Menu.Item
                                onClick={() => {
                                  closeDropdown();
                                }}
                              >
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                onClick={() => {
                                  closeDropdown();
                                }}
                              >
                                Delete
                              </Menu.Item>
                            </Menu>
                          )}
                        </Dropdown.Body>
                      </Dropdown>
                    </Table.BodyCell>
                  </Table.BodyRow>
                )}
              </Table.Body>
            </Table>
          </Grid.Layout>
        </Dialog.Body>
        <Dialog.Footer>
          <Button color="neutral" variant="outlined" onClick={this.onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Update Property
          </Button>
        </Dialog.Footer>
      </Dialog>
    );
  }
}

OrderInfoDialog = graphql(sharedGraphQL.ORDEREDPRODUCTS_LIST_QUERY, {
  props: ({ data: { orderedProductsList: { items } = {} } }) => {
    return {
      orderedProducts: items || [],
    };
  },
})(OrderInfoDialog);

OrderInfoDialog.id = ORDER_INFO_DIALOG_ID;

export { OrderInfoDialog };
