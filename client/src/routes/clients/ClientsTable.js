import React from 'react';
import { compose } from 'recompose';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';
import * as sharedGraphQL from 'shared/graphql';
import { ClientCreateDialog } from './ClientCreateDialog';
import { ClientDeleteDialog } from './ClientDeleteDialog';
import { ClientEditDialog } from './ClientEditDialog';

let ClientsTable = ({ users, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(5, 1fr) 60px">
      <Table.HeaderCell>First name</Table.HeaderCell>
      <Table.HeaderCell>Last name</Table.HeaderCell>
      <Table.HeaderCell>Email</Table.HeaderCell>
      <Table.HeaderCell />
    </Table.Header>

    <Table.Body
      loading={users.loading}
      data={users}
      action="Create Broker"
      onActionClick={() => openModal(ClientCreateDialog.id)}
    >
      {user => (
        <Table.BodyRow columns="repeat(5, 1fr) 60px" key={user.id}>
          <Table.BodyCell>{user.firstName}</Table.BodyCell>
          <Table.BodyCell>{user.lastName}</Table.BodyCell>
          <Table.BodyCell>{user.email}</Table.BodyCell>
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
                        openModal(ClientEditDialog.id, { initialValues: user });
                        closeDropdown();
                      }}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        openModal(ClientDeleteDialog.id, { id: user.id });
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

ClientsTable = compose(
  withModal,
  graphql(sharedGraphQL.USERS_LIST_QUERY, {
    props: ({ data: { clientsList: { items } = {} } }) => {
      return {
        users: items || [],
      };
    },
  })
)(ClientsTable);

export { ClientsTable };
