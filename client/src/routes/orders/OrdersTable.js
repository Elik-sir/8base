import React from 'react';
import { compose } from 'recompose';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';
import { DateTime } from 'luxon';
import * as sharedGraphQL from 'shared/graphql';

import { OrderCreateDialog } from './OrderCreateDialog';
import { OrderDeleteDialog } from './OrderDeleteDialog';
import { OrderInfoDialog } from './OrdersInfo';
let OrdersTable = ({ orders, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(5, 1fr) 60px">
      <Table.HeaderCell>First Name</Table.HeaderCell>
      <Table.HeaderCell>Date</Table.HeaderCell>

      <Table.HeaderCell />
    </Table.Header>

    <Table.Body
      loading={orders.loading}
      data={orders}
      action="Create Customer"
      onActionClick={() => openModal(OrderCreateDialog.id)}
    >
      {order => (
        <Table.BodyRow columns="repeat(5, 1fr) 60px" key={order.id}>
          <Table.BodyCell>{order.clients.firstName}</Table.BodyCell>
          <Table.BodyCell>{DateTime.fromISO(order.createdAt).toFormat('ff')}</Table.BodyCell>

          <Table.BodyCell>
            <Dropdown defaultOpen={false}>
              <Dropdown.Head>
                <Icon name="More" color="LIGHT_GRAY2" />
              </Dropdown.Head>
              <Dropdown.Body pin="right">
                {({ closeDropdown }) => (
                  <Menu>
                    {/*Modal with order`s info*/}
                    <Menu.Item
                      onClick={() => {
                        openModal(OrderInfoDialog.id, { initialValues: order.id });
                        closeDropdown();
                      }}
                    >
                      Info
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        openModal(OrderDeleteDialog.id, { id: order.id });
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
);

OrdersTable = compose(
  withModal,
  graphql(sharedGraphQL.ORDERS_LIST_QUERY, {
    props: ({ data: { ordersList: { items } = {} } }) => {
      return {
        orders: items || [],
      };
    },
  })
)(OrdersTable);

export { OrdersTable };
