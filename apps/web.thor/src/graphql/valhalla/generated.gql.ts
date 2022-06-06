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
  _FieldSet: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: Date;
};

export type AccountEmailSchema = {
  readonly __typename?: 'AccountEmailSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Whether email address is primary */
  readonly isPrimary: Scalars['Boolean'];
  /** Whether email address is verified */
  readonly isVerified: Scalars['Boolean'];
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** Email address value */
  readonly value: Scalars['String'];
  /** Verification ID */
  readonly verification: Scalars['String'];
  /** Verification date */
  readonly verifiedDate: Scalars['DateTime'];
};

export type AccountPhoneSchema = {
  readonly __typename?: 'AccountPhoneSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Whether phone number is primary */
  readonly isPrimary: Scalars['Boolean'];
  /** Whether phone number is verified */
  readonly isVerified: Scalars['Boolean'];
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** Phone number value */
  readonly value: Scalars['String'];
  /** Verification ID */
  readonly verification: Scalars['String'];
  /** Verification date */
  readonly verifiedDate: Scalars['DateTime'];
};

export type AccountSchema = {
  readonly __typename?: 'AccountSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** User Display Name */
  readonly displayName: Scalars['String'];
  /** Associated email addresses */
  readonly emails: ReadonlyArray<AccountEmailSchema>;
  /** First Name */
  readonly firstName: Scalars['String'];
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Last Name */
  readonly lastName: Scalars['String'];
  /** Associated phone numbers */
  readonly phones: ReadonlyArray<AccountPhoneSchema>;
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
};

export type AuthResponse = {
  readonly __typename?: 'AuthResponse';
  /** Access token */
  readonly accessToken: Scalars['String'];
  /** Access token expiry date */
  readonly accessTokenExpiresAt: Scalars['String'];
  /** Logged in Account ID */
  readonly accountId: Scalars['String'];
};

export type CreateOrganizationInput = {
  /** Name of the organization */
  readonly name: Scalars['String'];
  /** Subscription plan */
  readonly plan: OrganizationPlan;
};

export type LoginWithEmailInput = {
  /** Email address */
  readonly email: Scalars['String'];
  /** Verification Code */
  readonly verificationCode: Scalars['String'];
  /** Verification Sent */
  readonly verificationId: Scalars['String'];
};

export type LoginWithPhoneInput = {
  /** Phone number */
  readonly phone: Scalars['String'];
  /** Verification Code */
  readonly verificationCode: Scalars['String'];
  /** Verification Sent */
  readonly verificationId: Scalars['String'];
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  /** Add email address to account */
  readonly addEmailToAccount: Scalars['Boolean'];
  /** Add phone number to account */
  readonly addPhoneToAccount: Scalars['Boolean'];
  /** Archive an organization */
  readonly archiveOrganization: Scalars['String'];
  /** Create an organization */
  readonly createOrganization: OrganizationSchema;
  /** Login to account with email address */
  readonly loginWithEmail: AuthResponse;
  /** Login to account with phone number */
  readonly loginWithPhone: AuthResponse;
  /** Register user account */
  readonly registerAccount: AuthResponse;
  /** Remove associated email from account */
  readonly removeEmailFromAccount: Scalars['Boolean'];
  /** Remove associated phone from account */
  readonly removePhoneFromAccount: Scalars['Boolean'];
  /** Restore an organization that was archived */
  readonly restoreOrganization: Scalars['String'];
  /** Send verification code to email */
  readonly sendEmailVerificationCode: Scalars['String'];
  /** Send verification code to phone number */
  readonly sendPhoneVerificationCode: Scalars['String'];
  /** Update account */
  readonly updateAccount: Scalars['Boolean'];
};


export type MutationAddEmailToAccountArgs = {
  email: Scalars['String'];
};


export type MutationAddPhoneToAccountArgs = {
  phone: Scalars['String'];
};


export type MutationArchiveOrganizationArgs = {
  orgId: Scalars['String'];
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationLoginWithEmailArgs = {
  input: LoginWithEmailInput;
};


export type MutationLoginWithPhoneArgs = {
  input: LoginWithPhoneInput;
};


export type MutationRegisterAccountArgs = {
  input: RegisterInput;
};


export type MutationRemoveEmailFromAccountArgs = {
  email: Scalars['String'];
};


export type MutationRemovePhoneFromAccountArgs = {
  phone: Scalars['String'];
};


export type MutationRestoreOrganizationArgs = {
  orgId: Scalars['String'];
};


export type MutationSendEmailVerificationCodeArgs = {
  email: Scalars['String'];
};


export type MutationSendPhoneVerificationCodeArgs = {
  phone: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};

/** Subscription plan */
export enum OrganizationPlan {
  FREE = 'FREE'
}

export type OrganizationSchema = {
  readonly __typename?: 'OrganizationSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** ID of the account that created the organization */
  readonly createdBy: Scalars['String'];
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** URL of the logo */
  readonly logoUrl: Scalars['String'];
  /** Name of the organization */
  readonly name: Scalars['String'];
  /** Subscription plan */
  readonly plan: OrganizationPlan;
  /** Unique slug identifier */
  readonly slug: Scalars['String'];
  /** Organization status */
  readonly status: Scalars['String'];
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** ID of the account that last updated the organization */
  readonly updatedBy: Scalars['String'];
};

export type Query = {
  readonly __typename?: 'Query';
  /** Generate an access token */
  readonly accessToken: Scalars['String'];
  /** Get current logged in user information */
  readonly account: AccountSchema;
  /** Get current user's organizations memberships */
  readonly organizations: ReadonlyArray<OrganizationSchema>;
  /** Get current session user */
  readonly session: AccountSchema;
  /** Validate verification code */
  readonly validateVerificationCode: Scalars['Boolean'];
};


export type QueryValidateVerificationCodeArgs = {
  verificationCode: Scalars['String'];
  verificationId: Scalars['String'];
};

export type RegisterInput = {
  /** User Display Name */
  readonly displayName?: InputMaybe<Scalars['String']>;
  /** Email Address */
  readonly email: Scalars['String'];
  /** First Name */
  readonly firstName?: InputMaybe<Scalars['String']>;
  /** Last Name */
  readonly lastName?: InputMaybe<Scalars['String']>;
  /** Phone Number */
  readonly phone?: InputMaybe<Scalars['String']>;
};

export type UpdateAccountInput = {
  /** User Display Name */
  readonly displayName?: InputMaybe<Scalars['String']>;
  /** First Name */
  readonly firstName?: InputMaybe<Scalars['String']>;
  /** Last Name */
  readonly lastName?: InputMaybe<Scalars['String']>;
};

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMutation = { readonly __typename?: 'Mutation', readonly registerAccount: { readonly __typename?: 'AuthResponse', readonly accessToken: string, readonly accessTokenExpiresAt: string } };

export type LoginWithEmailMutationVariables = Exact<{
  email: Scalars['String'];
  verificationId: Scalars['String'];
  verificationCode: Scalars['String'];
}>;


export type LoginWithEmailMutation = { readonly __typename?: 'Mutation', readonly loginWithEmail: { readonly __typename?: 'AuthResponse', readonly accessToken: string, readonly accessTokenExpiresAt: string } };

export type LoginWithPhoneMutationVariables = Exact<{
  phone: Scalars['String'];
  verificationId: Scalars['String'];
  verificationCode: Scalars['String'];
}>;


export type LoginWithPhoneMutation = { readonly __typename?: 'Mutation', readonly loginWithPhone: { readonly __typename?: 'AuthResponse', readonly accessToken: string, readonly accessTokenExpiresAt: string } };

export type UpdateAccountMutationVariables = Exact<{
  displayName?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
}>;


export type UpdateAccountMutation = { readonly __typename?: 'Mutation', readonly updateAccount: boolean };

export type AddEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type AddEmailMutation = { readonly __typename?: 'Mutation', readonly addEmailToAccount: boolean };

export type RemoveEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type RemoveEmailMutation = { readonly __typename?: 'Mutation', readonly removeEmailFromAccount: boolean };

export type AddPhoneMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type AddPhoneMutation = { readonly __typename?: 'Mutation', readonly addPhoneToAccount: boolean };

export type RemovePhoneMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type RemovePhoneMutation = { readonly __typename?: 'Mutation', readonly removePhoneFromAccount: boolean };

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  plan: OrganizationPlan;
}>;


export type CreateOrganizationMutation = { readonly __typename?: 'Mutation', readonly createOrganization: { readonly __typename?: 'OrganizationSchema', readonly id: string, readonly slug: string, readonly name: string, readonly plan: OrganizationPlan } };

export type ArchiveOrganizationMutationVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type ArchiveOrganizationMutation = { readonly __typename?: 'Mutation', readonly archiveOrganization: string };

export type RestoreOrganizationMutationVariables = Exact<{
  orgId: Scalars['String'];
}>;


export type RestoreOrganizationMutation = { readonly __typename?: 'Mutation', readonly restoreOrganization: string };

export type SendVerificationToEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendVerificationToEmailMutation = { readonly __typename?: 'Mutation', readonly sendEmailVerificationCode: string };

export type SendVerificationToPhoneMutationVariables = Exact<{
  phone: Scalars['String'];
}>;


export type SendVerificationToPhoneMutation = { readonly __typename?: 'Mutation', readonly sendPhoneVerificationCode: string };

export type ValidateVerificationCodeQueryVariables = Exact<{
  verificationId: Scalars['String'];
  verificationCode: Scalars['String'];
}>;


export type ValidateVerificationCodeQuery = { readonly __typename?: 'Query', readonly validateVerificationCode: boolean };

export type GetAccessTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccessTokenQuery = { readonly __typename?: 'Query', readonly accessToken: string };

export type GetAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountQuery = { readonly __typename?: 'Query', readonly account: { readonly __typename?: 'AccountSchema', readonly firstName: string, readonly lastName: string, readonly displayName: string } };

export type GetOrganizationsMembershipQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrganizationsMembershipQuery = { readonly __typename?: 'Query', readonly organizations: ReadonlyArray<{ readonly __typename?: 'OrganizationSchema', readonly id: string, readonly name: string, readonly slug: string, readonly logoUrl: string }> };


export const RegisterDocument = gql`
    mutation register($email: String!, $phone: String, $firstName: String, $lastName: String, $displayName: String) {
  registerAccount(
    input: {email: $email, phone: $phone, firstName: $firstName, lastName: $lastName, displayName: $displayName}
  ) {
    accessToken
    accessTokenExpiresAt
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginWithEmailDocument = gql`
    mutation loginWithEmail($email: String!, $verificationId: String!, $verificationCode: String!) {
  loginWithEmail(
    input: {email: $email, verificationId: $verificationId, verificationCode: $verificationCode}
  ) {
    accessToken
    accessTokenExpiresAt
  }
}
    `;
export type LoginWithEmailMutationFn = Apollo.MutationFunction<LoginWithEmailMutation, LoginWithEmailMutationVariables>;

/**
 * __useLoginWithEmailMutation__
 *
 * To run a mutation, you first call `useLoginWithEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithEmailMutation, { data, loading, error }] = useLoginWithEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      verificationId: // value for 'verificationId'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useLoginWithEmailMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithEmailMutation, LoginWithEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithEmailMutation, LoginWithEmailMutationVariables>(LoginWithEmailDocument, options);
      }
export type LoginWithEmailMutationHookResult = ReturnType<typeof useLoginWithEmailMutation>;
export type LoginWithEmailMutationResult = Apollo.MutationResult<LoginWithEmailMutation>;
export type LoginWithEmailMutationOptions = Apollo.BaseMutationOptions<LoginWithEmailMutation, LoginWithEmailMutationVariables>;
export const LoginWithPhoneDocument = gql`
    mutation loginWithPhone($phone: String!, $verificationId: String!, $verificationCode: String!) {
  loginWithPhone(
    input: {phone: $phone, verificationId: $verificationId, verificationCode: $verificationCode}
  ) {
    accessToken
    accessTokenExpiresAt
  }
}
    `;
export type LoginWithPhoneMutationFn = Apollo.MutationFunction<LoginWithPhoneMutation, LoginWithPhoneMutationVariables>;

/**
 * __useLoginWithPhoneMutation__
 *
 * To run a mutation, you first call `useLoginWithPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithPhoneMutation, { data, loading, error }] = useLoginWithPhoneMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      verificationId: // value for 'verificationId'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useLoginWithPhoneMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithPhoneMutation, LoginWithPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithPhoneMutation, LoginWithPhoneMutationVariables>(LoginWithPhoneDocument, options);
      }
export type LoginWithPhoneMutationHookResult = ReturnType<typeof useLoginWithPhoneMutation>;
export type LoginWithPhoneMutationResult = Apollo.MutationResult<LoginWithPhoneMutation>;
export type LoginWithPhoneMutationOptions = Apollo.BaseMutationOptions<LoginWithPhoneMutation, LoginWithPhoneMutationVariables>;
export const UpdateAccountDocument = gql`
    mutation updateAccount($displayName: String, $firstName: String, $lastName: String) {
  updateAccount(
    input: {displayName: $displayName, firstName: $firstName, lastName: $lastName}
  )
}
    `;
export type UpdateAccountMutationFn = Apollo.MutationFunction<UpdateAccountMutation, UpdateAccountMutationVariables>;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMutation, { data, loading, error }] = useUpdateAccountMutation({
 *   variables: {
 *      displayName: // value for 'displayName'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateAccountMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMutation, UpdateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountMutation, UpdateAccountMutationVariables>(UpdateAccountDocument, options);
      }
export type UpdateAccountMutationHookResult = ReturnType<typeof useUpdateAccountMutation>;
export type UpdateAccountMutationResult = Apollo.MutationResult<UpdateAccountMutation>;
export type UpdateAccountMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMutation, UpdateAccountMutationVariables>;
export const AddEmailDocument = gql`
    mutation addEmail($email: String!) {
  addEmailToAccount(email: $email)
}
    `;
export type AddEmailMutationFn = Apollo.MutationFunction<AddEmailMutation, AddEmailMutationVariables>;

/**
 * __useAddEmailMutation__
 *
 * To run a mutation, you first call `useAddEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmailMutation, { data, loading, error }] = useAddEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useAddEmailMutation(baseOptions?: Apollo.MutationHookOptions<AddEmailMutation, AddEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEmailMutation, AddEmailMutationVariables>(AddEmailDocument, options);
      }
export type AddEmailMutationHookResult = ReturnType<typeof useAddEmailMutation>;
export type AddEmailMutationResult = Apollo.MutationResult<AddEmailMutation>;
export type AddEmailMutationOptions = Apollo.BaseMutationOptions<AddEmailMutation, AddEmailMutationVariables>;
export const RemoveEmailDocument = gql`
    mutation removeEmail($email: String!) {
  removeEmailFromAccount(email: $email)
}
    `;
export type RemoveEmailMutationFn = Apollo.MutationFunction<RemoveEmailMutation, RemoveEmailMutationVariables>;

/**
 * __useRemoveEmailMutation__
 *
 * To run a mutation, you first call `useRemoveEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEmailMutation, { data, loading, error }] = useRemoveEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useRemoveEmailMutation(baseOptions?: Apollo.MutationHookOptions<RemoveEmailMutation, RemoveEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveEmailMutation, RemoveEmailMutationVariables>(RemoveEmailDocument, options);
      }
export type RemoveEmailMutationHookResult = ReturnType<typeof useRemoveEmailMutation>;
export type RemoveEmailMutationResult = Apollo.MutationResult<RemoveEmailMutation>;
export type RemoveEmailMutationOptions = Apollo.BaseMutationOptions<RemoveEmailMutation, RemoveEmailMutationVariables>;
export const AddPhoneDocument = gql`
    mutation addPhone($phone: String!) {
  addPhoneToAccount(phone: $phone)
}
    `;
export type AddPhoneMutationFn = Apollo.MutationFunction<AddPhoneMutation, AddPhoneMutationVariables>;

/**
 * __useAddPhoneMutation__
 *
 * To run a mutation, you first call `useAddPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPhoneMutation, { data, loading, error }] = useAddPhoneMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useAddPhoneMutation(baseOptions?: Apollo.MutationHookOptions<AddPhoneMutation, AddPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPhoneMutation, AddPhoneMutationVariables>(AddPhoneDocument, options);
      }
export type AddPhoneMutationHookResult = ReturnType<typeof useAddPhoneMutation>;
export type AddPhoneMutationResult = Apollo.MutationResult<AddPhoneMutation>;
export type AddPhoneMutationOptions = Apollo.BaseMutationOptions<AddPhoneMutation, AddPhoneMutationVariables>;
export const RemovePhoneDocument = gql`
    mutation removePhone($phone: String!) {
  removePhoneFromAccount(phone: $phone)
}
    `;
export type RemovePhoneMutationFn = Apollo.MutationFunction<RemovePhoneMutation, RemovePhoneMutationVariables>;

/**
 * __useRemovePhoneMutation__
 *
 * To run a mutation, you first call `useRemovePhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePhoneMutation, { data, loading, error }] = useRemovePhoneMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useRemovePhoneMutation(baseOptions?: Apollo.MutationHookOptions<RemovePhoneMutation, RemovePhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePhoneMutation, RemovePhoneMutationVariables>(RemovePhoneDocument, options);
      }
export type RemovePhoneMutationHookResult = ReturnType<typeof useRemovePhoneMutation>;
export type RemovePhoneMutationResult = Apollo.MutationResult<RemovePhoneMutation>;
export type RemovePhoneMutationOptions = Apollo.BaseMutationOptions<RemovePhoneMutation, RemovePhoneMutationVariables>;
export const CreateOrganizationDocument = gql`
    mutation createOrganization($name: String!, $plan: OrganizationPlan!) {
  createOrganization(input: {name: $name, plan: $plan}) {
    id
    slug
    name
    plan
  }
}
    `;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<CreateOrganizationMutation, CreateOrganizationMutationVariables>;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrganizationMutation, { data, loading, error }] = useCreateOrganizationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      plan: // value for 'plan'
 *   },
 * });
 */
export function useCreateOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
      }
export type CreateOrganizationMutationHookResult = ReturnType<typeof useCreateOrganizationMutation>;
export type CreateOrganizationMutationResult = Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const ArchiveOrganizationDocument = gql`
    mutation archiveOrganization($orgId: String!) {
  archiveOrganization(orgId: $orgId)
}
    `;
export type ArchiveOrganizationMutationFn = Apollo.MutationFunction<ArchiveOrganizationMutation, ArchiveOrganizationMutationVariables>;

/**
 * __useArchiveOrganizationMutation__
 *
 * To run a mutation, you first call `useArchiveOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveOrganizationMutation, { data, loading, error }] = useArchiveOrganizationMutation({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useArchiveOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<ArchiveOrganizationMutation, ArchiveOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ArchiveOrganizationMutation, ArchiveOrganizationMutationVariables>(ArchiveOrganizationDocument, options);
      }
export type ArchiveOrganizationMutationHookResult = ReturnType<typeof useArchiveOrganizationMutation>;
export type ArchiveOrganizationMutationResult = Apollo.MutationResult<ArchiveOrganizationMutation>;
export type ArchiveOrganizationMutationOptions = Apollo.BaseMutationOptions<ArchiveOrganizationMutation, ArchiveOrganizationMutationVariables>;
export const RestoreOrganizationDocument = gql`
    mutation restoreOrganization($orgId: String!) {
  restoreOrganization(orgId: $orgId)
}
    `;
export type RestoreOrganizationMutationFn = Apollo.MutationFunction<RestoreOrganizationMutation, RestoreOrganizationMutationVariables>;

/**
 * __useRestoreOrganizationMutation__
 *
 * To run a mutation, you first call `useRestoreOrganizationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRestoreOrganizationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [restoreOrganizationMutation, { data, loading, error }] = useRestoreOrganizationMutation({
 *   variables: {
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useRestoreOrganizationMutation(baseOptions?: Apollo.MutationHookOptions<RestoreOrganizationMutation, RestoreOrganizationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RestoreOrganizationMutation, RestoreOrganizationMutationVariables>(RestoreOrganizationDocument, options);
      }
export type RestoreOrganizationMutationHookResult = ReturnType<typeof useRestoreOrganizationMutation>;
export type RestoreOrganizationMutationResult = Apollo.MutationResult<RestoreOrganizationMutation>;
export type RestoreOrganizationMutationOptions = Apollo.BaseMutationOptions<RestoreOrganizationMutation, RestoreOrganizationMutationVariables>;
export const SendVerificationToEmailDocument = gql`
    mutation sendVerificationToEmail($email: String!) {
  sendEmailVerificationCode(email: $email)
}
    `;
export type SendVerificationToEmailMutationFn = Apollo.MutationFunction<SendVerificationToEmailMutation, SendVerificationToEmailMutationVariables>;

/**
 * __useSendVerificationToEmailMutation__
 *
 * To run a mutation, you first call `useSendVerificationToEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationToEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerificationToEmailMutation, { data, loading, error }] = useSendVerificationToEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendVerificationToEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendVerificationToEmailMutation, SendVerificationToEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerificationToEmailMutation, SendVerificationToEmailMutationVariables>(SendVerificationToEmailDocument, options);
      }
export type SendVerificationToEmailMutationHookResult = ReturnType<typeof useSendVerificationToEmailMutation>;
export type SendVerificationToEmailMutationResult = Apollo.MutationResult<SendVerificationToEmailMutation>;
export type SendVerificationToEmailMutationOptions = Apollo.BaseMutationOptions<SendVerificationToEmailMutation, SendVerificationToEmailMutationVariables>;
export const SendVerificationToPhoneDocument = gql`
    mutation sendVerificationToPhone($phone: String!) {
  sendPhoneVerificationCode(phone: $phone)
}
    `;
export type SendVerificationToPhoneMutationFn = Apollo.MutationFunction<SendVerificationToPhoneMutation, SendVerificationToPhoneMutationVariables>;

/**
 * __useSendVerificationToPhoneMutation__
 *
 * To run a mutation, you first call `useSendVerificationToPhoneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationToPhoneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerificationToPhoneMutation, { data, loading, error }] = useSendVerificationToPhoneMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useSendVerificationToPhoneMutation(baseOptions?: Apollo.MutationHookOptions<SendVerificationToPhoneMutation, SendVerificationToPhoneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerificationToPhoneMutation, SendVerificationToPhoneMutationVariables>(SendVerificationToPhoneDocument, options);
      }
export type SendVerificationToPhoneMutationHookResult = ReturnType<typeof useSendVerificationToPhoneMutation>;
export type SendVerificationToPhoneMutationResult = Apollo.MutationResult<SendVerificationToPhoneMutation>;
export type SendVerificationToPhoneMutationOptions = Apollo.BaseMutationOptions<SendVerificationToPhoneMutation, SendVerificationToPhoneMutationVariables>;
export const ValidateVerificationCodeDocument = gql`
    query validateVerificationCode($verificationId: String!, $verificationCode: String!) {
  validateVerificationCode(
    verificationId: $verificationId
    verificationCode: $verificationCode
  )
}
    `;

/**
 * __useValidateVerificationCodeQuery__
 *
 * To run a query within a React component, call `useValidateVerificationCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useValidateVerificationCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useValidateVerificationCodeQuery({
 *   variables: {
 *      verificationId: // value for 'verificationId'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useValidateVerificationCodeQuery(baseOptions: Apollo.QueryHookOptions<ValidateVerificationCodeQuery, ValidateVerificationCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ValidateVerificationCodeQuery, ValidateVerificationCodeQueryVariables>(ValidateVerificationCodeDocument, options);
      }
export function useValidateVerificationCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ValidateVerificationCodeQuery, ValidateVerificationCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ValidateVerificationCodeQuery, ValidateVerificationCodeQueryVariables>(ValidateVerificationCodeDocument, options);
        }
export type ValidateVerificationCodeQueryHookResult = ReturnType<typeof useValidateVerificationCodeQuery>;
export type ValidateVerificationCodeLazyQueryHookResult = ReturnType<typeof useValidateVerificationCodeLazyQuery>;
export type ValidateVerificationCodeQueryResult = Apollo.QueryResult<ValidateVerificationCodeQuery, ValidateVerificationCodeQueryVariables>;
export function refetchValidateVerificationCodeQuery(variables: ValidateVerificationCodeQueryVariables) {
      return { query: ValidateVerificationCodeDocument, variables: variables }
    }
export const GetAccessTokenDocument = gql`
    query getAccessToken {
  accessToken
}
    `;

/**
 * __useGetAccessTokenQuery__
 *
 * To run a query within a React component, call `useGetAccessTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccessTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccessTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccessTokenQuery(baseOptions?: Apollo.QueryHookOptions<GetAccessTokenQuery, GetAccessTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccessTokenQuery, GetAccessTokenQueryVariables>(GetAccessTokenDocument, options);
      }
export function useGetAccessTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccessTokenQuery, GetAccessTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccessTokenQuery, GetAccessTokenQueryVariables>(GetAccessTokenDocument, options);
        }
export type GetAccessTokenQueryHookResult = ReturnType<typeof useGetAccessTokenQuery>;
export type GetAccessTokenLazyQueryHookResult = ReturnType<typeof useGetAccessTokenLazyQuery>;
export type GetAccessTokenQueryResult = Apollo.QueryResult<GetAccessTokenQuery, GetAccessTokenQueryVariables>;
export function refetchGetAccessTokenQuery(variables?: GetAccessTokenQueryVariables) {
      return { query: GetAccessTokenDocument, variables: variables }
    }
export const GetAccountDocument = gql`
    query getAccount {
  account {
    firstName
    lastName
    displayName
  }
}
    `;

/**
 * __useGetAccountQuery__
 *
 * To run a query within a React component, call `useGetAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAccountQuery(baseOptions?: Apollo.QueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
      }
export function useGetAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountQuery, GetAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(GetAccountDocument, options);
        }
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<typeof useGetAccountLazyQuery>;
export type GetAccountQueryResult = Apollo.QueryResult<GetAccountQuery, GetAccountQueryVariables>;
export function refetchGetAccountQuery(variables?: GetAccountQueryVariables) {
      return { query: GetAccountDocument, variables: variables }
    }
export const GetOrganizationsMembershipDocument = gql`
    query getOrganizationsMembership {
  organizations {
    id
    name
    slug
    name
    logoUrl
  }
}
    `;

/**
 * __useGetOrganizationsMembershipQuery__
 *
 * To run a query within a React component, call `useGetOrganizationsMembershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationsMembershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationsMembershipQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrganizationsMembershipQuery(baseOptions?: Apollo.QueryHookOptions<GetOrganizationsMembershipQuery, GetOrganizationsMembershipQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationsMembershipQuery, GetOrganizationsMembershipQueryVariables>(GetOrganizationsMembershipDocument, options);
      }
export function useGetOrganizationsMembershipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationsMembershipQuery, GetOrganizationsMembershipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationsMembershipQuery, GetOrganizationsMembershipQueryVariables>(GetOrganizationsMembershipDocument, options);
        }
export type GetOrganizationsMembershipQueryHookResult = ReturnType<typeof useGetOrganizationsMembershipQuery>;
export type GetOrganizationsMembershipLazyQueryHookResult = ReturnType<typeof useGetOrganizationsMembershipLazyQuery>;
export type GetOrganizationsMembershipQueryResult = Apollo.QueryResult<GetOrganizationsMembershipQuery, GetOrganizationsMembershipQueryVariables>;
export function refetchGetOrganizationsMembershipQuery(variables?: GetOrganizationsMembershipQueryVariables) {
      return { query: GetOrganizationsMembershipDocument, variables: variables }
    }