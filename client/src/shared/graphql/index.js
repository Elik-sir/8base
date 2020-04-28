import gql from 'graphql-tag';

export const USERS_LIST_QUERY = gql`
  query UsersList {
    clientsList {
      items {
        id
        firstName
        lastName
        email
      }
    }
  }
`;

export const CLIENT_DELETE_MUTATION = gql`
  mutation ClientDelete($id: ID!) {
    clientDelete(data: { id: $id }) {
      success
    }
  }
`;

export const CLIENT_CREATE_MUTATION = gql`
  mutation ClientCreate($data: ClientCreateInput!) {
    clientCreate(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;
export const CLIENT_UPDATE_MUTATION = gql`
  mutation ClientUpdate($data: ClientUpdateInput!) {
    clientUpdate(data: $data) {
      id
    }
  }
`;
export const PRODUCT_LIST_QUERY = gql`
  query ProductsList {
    productsList {
      items {
        id
        name_product
        price
      }
    }
  }
`;
export const PRODUCT_UPDATE_MUTATION = gql`
  mutation ProductUpdate($data: ProductUpdateInput!) {
    productUpdate(data: $data) {
      id
    }
  }
`;
export const PRODUCT_CREATE_MUTATION = gql`
  mutation ProductCreate($data: ProductCreateInput!) {
    productCreate(data: $data) {
      id
    }
  }
`;
export const PRODUCT_DELETE_MUTATION = gql`
  mutation ProductDelete($id: ID!) {
    productDelete(data: { id: $id }) {
      success
    }
  }
`;

export const ORDERS_LIST_QUERY = gql`
  query OrdersList {
    ordersList {
      items {
        clients {
          id
          firstName
        }
        createdAt
        id
      }
    }
  }
`;

export const ORDEREDPRODUCTS_LIST_QUERY = gql`
  query ListProducts {
    orderedProductsList(filter: { orders: { every: { id: { contains: "ck9jk4wr700dy07kybowk2o91" } } } }) {
      items {
        products {
          name_product
          price
        }
        quantity
      }
    }
  }
`;

export const ORDER_DELETE_MUTATION = gql`
  mutation OrderDelete($id: ID!) {
    orderDelete(data: { id: $id }) {
      success
    }
  }
`;
export const ORDER_CREATE_MUTATION = gql`
  mutation ProductCreate($data: ProductCreateInput!) {
    productCreate(data: $data) {
      id
    }
  }
`;
