import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: Date;
};

/** Available Auth Providers */
export enum AuthProvider {
  APPLE = 'APPLE',
  FACEBOOK = 'FACEBOOK',
  GITHUB = 'GITHUB',
  GOOGLE = 'GOOGLE',
  TWITTER = 'TWITTER'
}

export type AuthProviderLinkInput = {
  /** Authentication provider */
  readonly provider: AuthProvider;
  /** Provider token */
  readonly token: Scalars['String'];
};

export type AuthProviderUnlinkLinkInput = {
  /** Authentication provider */
  readonly provider: AuthProvider;
};

export type ChangeOrganizationRoleInput = {
  /** User role within group */
  readonly role: UserMembershipRole;
  /** User ID */
  readonly user: Scalars['String'];
};

export type CreateSiteInput = {
  /** Site's name */
  readonly name: Scalars['String'];
  readonly tags: ReadonlyArray<Scalars['String']>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  /** Add a user to an organization */
  readonly addOrganizationMember: Scalars['Boolean'];
  /** Update a user role within an organization */
  readonly changeOrganizationRole: Scalars['Boolean'];
  /** Create an organization */
  readonly createOrganization: Scalars['Boolean'];
  /** Create site */
  readonly createSite: Scalars['Boolean'];
  /** Link an authentication provider */
  readonly linkAuthProvider: Scalars['Boolean'];
  /** Log in */
  readonly login: UserAuthResponse;
  /** Logout */
  readonly logout: Scalars['Boolean'];
  /** Registration */
  readonly register: UserAuthResponse;
  /** Remove a linked authentication provider */
  readonly unlinkAuthProvider: Scalars['Boolean'];
  readonly updateUserDisplayName: Scalars['Boolean'];
  readonly updateUserEmail: Scalars['Boolean'];
  readonly updateUserPhone: Scalars['Boolean'];
};


export type MutationAddOrganizationMemberArgs = {
  input: ChangeOrganizationRoleInput;
};


export type MutationChangeOrganizationRoleArgs = {
  input: ChangeOrganizationRoleInput;
};


export type MutationCreateOrganizationArgs = {
  name: Scalars['String'];
};


export type MutationCreateSiteArgs = {
  input: CreateSiteInput;
};


export type MutationLinkAuthProviderArgs = {
  input: AuthProviderLinkInput;
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationRegisterArgs = {
  input: UserRegisterInput;
};


export type MutationUnlinkAuthProviderArgs = {
  input: AuthProviderUnlinkLinkInput;
};


export type MutationUpdateUserDisplayNameArgs = {
  displayName: Scalars['String'];
};


export type MutationUpdateUserEmailArgs = {
  email: Scalars['String'];
};


export type MutationUpdateUserPhoneArgs = {
  phone: Scalars['String'];
};

export type Query = {
  readonly __typename?: 'Query';
  /** Get Current Access Token */
  readonly getAccessToken: UserAuthResponse;
  /** Get organizations that the user belongs to */
  readonly getUserOrganizationMemberships: ReadonlyArray<UserMembershipType>;
  /** Get logged in user information */
  readonly whoAmI: UserSchema;
};

export type UserAuthResponse = {
  readonly __typename?: 'UserAuthResponse';
  /** Refresh token */
  readonly token: Scalars['String'];
};

export type UserLoginInput = {
  /** Password */
  readonly password: Scalars['String'];
  /** User email address */
  readonly username: Scalars['String'];
};

export type UserMembershipGroup = {
  readonly __typename?: 'UserMembershipGroup';
  /** Avatar of the group */
  readonly avatar: Scalars['String'];
  /** Name of the group */
  readonly name: Scalars['String'];
};

/** User Memberships Group Type */
export enum UserMembershipGroupType {
  ORGANIZATION = 'ORGANIZATION'
}

/** User Membership Role */
export enum UserMembershipRole {
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
  OWNER = 'OWNER'
}

export type UserMembershipType = {
  readonly __typename?: 'UserMembershipType';
  /** Group information */
  readonly group: UserMembershipGroup;
  /** Group type for the membership */
  readonly groupType: UserMembershipGroupType;
  /** User role within group */
  readonly role: UserMembershipRole;
};

export type UserRegisterInput = {
  /** Email Address */
  readonly email: Scalars['String'];
  /** Password */
  readonly password: Scalars['String'];
};

export type UserSchema = {
  readonly __typename?: 'UserSchema';
  readonly avatar?: Maybe<Scalars['String']>;
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  readonly email: Scalars['String'];
  readonly emailVerified?: Maybe<Scalars['Boolean']>;
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  readonly phone?: Maybe<Scalars['String']>;
  readonly phoneVerified?: Maybe<Scalars['Boolean']>;
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
};

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginMutation = { readonly __typename?: 'Mutation', readonly login: { readonly __typename?: 'UserAuthResponse', readonly token: string } };


export const LoginDocument = gql`
    mutation login($input: UserLoginInput!) {
  login(input: $input) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;