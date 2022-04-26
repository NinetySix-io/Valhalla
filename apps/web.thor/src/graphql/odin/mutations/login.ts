import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login($input: UserLoginInput!) {
    login(input: $input) {
      token
    }
  }
`;
