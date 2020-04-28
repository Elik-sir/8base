import React from 'react';
import { compose } from 'recompose';
import { Table, Dropdown, Icon, Menu, withModal } from '@8base/boost';
import { graphql } from 'react-apollo';

import * as sharedGraphQL from 'shared/graphql';

import { ProductCreateDialog } from './ProductCreateDialog';
import { ProductEditDialog } from './ProductEditDialog';
import { ProductDeleteDialog } from './ProductDeleteDialog';

let ProductsTable = ({ properties, openModal, closeModal }) => (
  <Table>
    <Table.Header columns="repeat(4, 1fr) 60px">
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell />

      <Table.HeaderCell />
    </Table.Header>

    <Table.Body
      loading={properties.loading}
      data={properties}
      action="Create Property"
      onActionClick={() => openModal(ProductCreateDialog.id)}
    >
      {property => (
        <Table.BodyRow columns="repeat(10, 1fr) 60px" key={property.id}>
          <Table.BodyCell>{property.name_product}</Table.BodyCell>
          <Table.BodyCell>{property.price}</Table.BodyCell>

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
                        openModal(ProductEditDialog.id, { initialValues: property });
                        closeDropdown();
                      }}
                    >
                      Edit
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => {
                        openModal(ProductDeleteDialog.id, { id: property.id });
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

ProductsTable = compose(
  withModal,
  graphql(sharedGraphQL.PRODUCT_LIST_QUERY, {
    props: ({ data: { productsList: { items } = {} } }) => {
      return {
        properties: items || [],
      };
    },
  })
)(ProductsTable);

export { ProductsTable };
