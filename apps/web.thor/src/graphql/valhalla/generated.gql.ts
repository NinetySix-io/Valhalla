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

export type AccessTokenQuery = {
  /** Auth for organization */
  readonly organization?: InputMaybe<Scalars['String']>;
};

export type AccessTokenResponse = {
  readonly __typename?: 'AccessTokenResponse';
  /** Token expiry */
  readonly expiresAt: Scalars['DateTime'];
  /** Access token */
  readonly token: Scalars['String'];
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
  /** Access token expiry */
  readonly accessTokenExpiresAt: Scalars['DateTime'];
  /** Logged in Account ID */
  readonly accountId: Scalars['String'];
};

export type CreateOrganizationInput = {
  /** Name of the organization */
  readonly name: Scalars['String'];
  /** Subscription plan */
  readonly plan: OrganizationPlan;
};

export type LoginWithVerificationInput = {
  /** Username */
  readonly username: Scalars['String'];
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
  /** Login to account with verification code */
  readonly loginWithVerification: AuthResponse;
  /** Invalid current session */
  readonly logout: Scalars['Boolean'];
  /** Register user account */
  readonly registerAccount: AuthResponse;
  /** Remove associated email from account */
  readonly removeEmailFromAccount: Scalars['Boolean'];
  /** Remove associated phone from account */
  readonly removePhoneFromAccount: Scalars['Boolean'];
  /** Restore an organization that was archived */
  readonly restoreOrganization: Scalars['String'];
  /** Send verification code to email */
  readonly sendVerificationCode: Scalars['String'];
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


export type MutationLoginWithVerificationArgs = {
  input: LoginWithVerificationInput;
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


export type MutationSendVerificationCodeArgs = {
  input: SendVerificationCodeInput;
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};

export enum OrgMemberRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  GUESS = 'GUESS',
  MEMBER = 'MEMBER',
  OWNER = 'OWNER'
}

export type OrgMemberSchema = {
  readonly __typename?: 'OrgMemberSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Timestamp in the profile should be deleted */
  readonly deletingAt?: Maybe<Scalars['DateTime']>;
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** ID of the account that sent out the invite */
  readonly invitedBy?: Maybe<Scalars['String']>;
  /** ID of the organization */
  readonly organization: Scalars['String'];
  /** URL of profile image */
  readonly profileImageUrl?: Maybe<Scalars['String']>;
  /** Role of the organization member */
  readonly role: OrgMemberRole;
  /** Status of the organization member */
  readonly status: OrgMemberStatus;
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** ID of the account that last updated the member profile */
  readonly updatedBy: Scalars['String'];
  /** ID of the account */
  readonly user: Scalars['String'];
};

export enum OrgMemberStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
}

export type OrganizationBySlugResponse = {
  readonly __typename?: 'OrganizationBySlugResponse';
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Name of the organization */
  readonly name: Scalars['String'];
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
  readonly logoUrl?: Maybe<Scalars['String']>;
  /** Name of the organization */
  readonly name: Scalars['String'];
  /** Subscription plan */
  readonly plan: OrganizationPlan;
  /** Unique slug identifier */
  readonly slug: Scalars['String'];
  /** Organization status */
  readonly status: OrganizationStatus;
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** ID of the account that last updated the organization */
  readonly updatedBy: Scalars['String'];
};

/** Organization status */
export enum OrganizationStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED'
}

export type Query = {
  readonly __typename?: 'Query';
  /** Generate an access token */
  readonly accessToken: AccessTokenResponse;
  /** Get current logged in user information */
  readonly account: AccountSchema;
  /** Get current organization */
  readonly organization: ReadonlyArray<OrganizationSchema>;
  /** Find organization by slug */
  readonly organizationBySlug: OrganizationBySlugResponse;
  /** Get current organization membership */
  readonly organizationMembership: ReadonlyArray<OrgMemberSchema>;
  /** Get current user's organizations memberships */
  readonly organizations: ReadonlyArray<OrganizationSchema>;
  /** Get current session user */
  readonly session: SessionResponse;
  /** Validate verification code */
  readonly validateVerificationCode: Scalars['Boolean'];
};


export type QueryAccessTokenArgs = {
  query: AccessTokenQuery;
};


export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryValidateVerificationCodeArgs = {
  input: ValidateVerificationCodeInput;
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

export type SendVerificationCodeInput = {
  /** Verification channel */
  readonly channel: VerificationChannel;
  /** Sending verification code target */
  readonly destination: Scalars['String'];
};

export type SessionResponse = {
  readonly __typename?: 'SessionResponse';
  /** User Display Name */
  readonly displayName: Scalars['String'];
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
};

export type UpdateAccountInput = {
  /** User Display Name */
  readonly displayName?: InputMaybe<Scalars['String']>;
  /** First Name */
  readonly firstName?: InputMaybe<Scalars['String']>;
  /** Last Name */
  readonly lastName?: InputMaybe<Scalars['String']>;
};

export type ValidateVerificationCodeInput = {
  /** Verification Code */
  readonly verificationCode: Scalars['String'];
  /** Verification ID */
  readonly verificationId: Scalars['String'];
};

export enum VerificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS'
}

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
}>;


export type RegisterMutation = { readonly __typename?: 'Mutation', readonly registerAccount: { readonly __typename?: 'AuthResponse', readonly accessToken: string, readonly accessTokenExpiresAt: Date } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { readonly __typename?: 'Mutation', readonly logout: boolean };

export type LoginWithVerificationMutationVariables = Exact<{
  username: Scalars['String'];
  verificationId: Scalars['String'];
  verificationCode: Scalars['String'];
}>;


export type LoginWithVerificationMutation = { readonly __typename?: 'Mutation', readonly loginWithVerification: { readonly __typename?: 'AuthResponse', readonly accessToken: string, readonly accessTokenExpiresAt: Date } };

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

export type SendVerificationMutationVariables = Exact<{
  channel: VerificationChannel;
  destination: Scalars['String'];
}>;


export type SendVerificationMutation = { readonly __typename?: 'Mutation', readonly sendVerificationCode: string };

export type ValidateVerificationCodeQueryVariables = Exact<{
  verificationId: Scalars['String'];
  verificationCode: Scalars['String'];
}>;


export type ValidateVerificationCodeQuery = { readonly __typename?: 'Query', readonly validateVerificationCode: boolean };

export type GetAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountQuery = { readonly __typename?: 'Query', readonly account: { readonly __typename?: 'AccountSchema', readonly firstName: string, readonly lastName: string, readonly displayName: string } };

export type GetOrgMembershipQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgMembershipQuery = { readonly __typename?: 'Query', readonly organizationMembership: ReadonlyArray<{ readonly __typename?: 'OrgMemberSchema', readonly profileImageUrl?: string | null, readonly status: OrgMemberStatus, readonly role: OrgMemberRole }> };

export type GetOrgsMembershipListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgsMembershipListQuery = { readonly __typename?: 'Query', readonly organizations: ReadonlyArray<{ readonly __typename?: 'OrganizationSchema', readonly id: string, readonly name: string, readonly slug: string, readonly logoUrl?: string | null }> };

export type GetCurrentOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentOrganizationQuery = { readonly __typename?: 'Query', readonly organization: ReadonlyArray<{ readonly __typename?: 'OrganizationSchema', readonly name: string, readonly logoUrl?: string | null, readonly plan: OrganizationPlan, readonly slug: string }> };

export type FindOrganizationBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type FindOrganizationBySlugQuery = { readonly __typename?: 'Query', readonly organizationBySlug: { readonly __typename?: 'OrganizationBySlugResponse', readonly id: string, readonly name: string } };

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = { readonly __typename?: 'Query', readonly session: { readonly __typename?: 'SessionResponse', readonly id: string } };

export type GetAccessTokenQueryVariables = Exact<{
  organization?: InputMaybe<Scalars['String']>;
}>;


export type GetAccessTokenQuery = { readonly __typename?: 'Query', readonly accessToken: { readonly __typename?: 'AccessTokenResponse', readonly token: string, readonly expiresAt: Date } };


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
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const LoginWithVerificationDocument = gql`
    mutation loginWithVerification($username: String!, $verificationId: String!, $verificationCode: String!) {
  loginWithVerification(
    input: {username: $username, verificationId: $verificationId, verificationCode: $verificationCode}
  ) {
    accessToken
    accessTokenExpiresAt
  }
}
    `;
export type LoginWithVerificationMutationFn = Apollo.MutationFunction<LoginWithVerificationMutation, LoginWithVerificationMutationVariables>;

/**
 * __useLoginWithVerificationMutation__
 *
 * To run a mutation, you first call `useLoginWithVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithVerificationMutation, { data, loading, error }] = useLoginWithVerificationMutation({
 *   variables: {
 *      username: // value for 'username'
 *      verificationId: // value for 'verificationId'
 *      verificationCode: // value for 'verificationCode'
 *   },
 * });
 */
export function useLoginWithVerificationMutation(baseOptions?: Apollo.MutationHookOptions<LoginWithVerificationMutation, LoginWithVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginWithVerificationMutation, LoginWithVerificationMutationVariables>(LoginWithVerificationDocument, options);
      }
export type LoginWithVerificationMutationHookResult = ReturnType<typeof useLoginWithVerificationMutation>;
export type LoginWithVerificationMutationResult = Apollo.MutationResult<LoginWithVerificationMutation>;
export type LoginWithVerificationMutationOptions = Apollo.BaseMutationOptions<LoginWithVerificationMutation, LoginWithVerificationMutationVariables>;
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
export const SendVerificationDocument = gql`
    mutation sendVerification($channel: VerificationChannel!, $destination: String!) {
  sendVerificationCode(input: {channel: $channel, destination: $destination})
}
    `;
export type SendVerificationMutationFn = Apollo.MutationFunction<SendVerificationMutation, SendVerificationMutationVariables>;

/**
 * __useSendVerificationMutation__
 *
 * To run a mutation, you first call `useSendVerificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerificationMutation, { data, loading, error }] = useSendVerificationMutation({
 *   variables: {
 *      channel: // value for 'channel'
 *      destination: // value for 'destination'
 *   },
 * });
 */
export function useSendVerificationMutation(baseOptions?: Apollo.MutationHookOptions<SendVerificationMutation, SendVerificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerificationMutation, SendVerificationMutationVariables>(SendVerificationDocument, options);
      }
export type SendVerificationMutationHookResult = ReturnType<typeof useSendVerificationMutation>;
export type SendVerificationMutationResult = Apollo.MutationResult<SendVerificationMutation>;
export type SendVerificationMutationOptions = Apollo.BaseMutationOptions<SendVerificationMutation, SendVerificationMutationVariables>;
export const ValidateVerificationCodeDocument = gql`
    query validateVerificationCode($verificationId: String!, $verificationCode: String!) {
  validateVerificationCode(
    input: {verificationId: $verificationId, verificationCode: $verificationCode}
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
export const GetOrgMembershipDocument = gql`
    query getOrgMembership {
  organizationMembership {
    profileImageUrl
    status
    role
  }
}
    `;

/**
 * __useGetOrgMembershipQuery__
 *
 * To run a query within a React component, call `useGetOrgMembershipQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgMembershipQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgMembershipQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrgMembershipQuery(baseOptions?: Apollo.QueryHookOptions<GetOrgMembershipQuery, GetOrgMembershipQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgMembershipQuery, GetOrgMembershipQueryVariables>(GetOrgMembershipDocument, options);
      }
export function useGetOrgMembershipLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgMembershipQuery, GetOrgMembershipQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgMembershipQuery, GetOrgMembershipQueryVariables>(GetOrgMembershipDocument, options);
        }
export type GetOrgMembershipQueryHookResult = ReturnType<typeof useGetOrgMembershipQuery>;
export type GetOrgMembershipLazyQueryHookResult = ReturnType<typeof useGetOrgMembershipLazyQuery>;
export type GetOrgMembershipQueryResult = Apollo.QueryResult<GetOrgMembershipQuery, GetOrgMembershipQueryVariables>;
export function refetchGetOrgMembershipQuery(variables?: GetOrgMembershipQueryVariables) {
      return { query: GetOrgMembershipDocument, variables: variables }
    }
export const GetOrgsMembershipListDocument = gql`
    query getOrgsMembershipList {
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
 * __useGetOrgsMembershipListQuery__
 *
 * To run a query within a React component, call `useGetOrgsMembershipListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrgsMembershipListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrgsMembershipListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOrgsMembershipListQuery(baseOptions?: Apollo.QueryHookOptions<GetOrgsMembershipListQuery, GetOrgsMembershipListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrgsMembershipListQuery, GetOrgsMembershipListQueryVariables>(GetOrgsMembershipListDocument, options);
      }
export function useGetOrgsMembershipListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrgsMembershipListQuery, GetOrgsMembershipListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrgsMembershipListQuery, GetOrgsMembershipListQueryVariables>(GetOrgsMembershipListDocument, options);
        }
export type GetOrgsMembershipListQueryHookResult = ReturnType<typeof useGetOrgsMembershipListQuery>;
export type GetOrgsMembershipListLazyQueryHookResult = ReturnType<typeof useGetOrgsMembershipListLazyQuery>;
export type GetOrgsMembershipListQueryResult = Apollo.QueryResult<GetOrgsMembershipListQuery, GetOrgsMembershipListQueryVariables>;
export function refetchGetOrgsMembershipListQuery(variables?: GetOrgsMembershipListQueryVariables) {
      return { query: GetOrgsMembershipListDocument, variables: variables }
    }
export const GetCurrentOrganizationDocument = gql`
    query getCurrentOrganization {
  organization {
    name
    logoUrl
    plan
    slug
  }
}
    `;

/**
 * __useGetCurrentOrganizationQuery__
 *
 * To run a query within a React component, call `useGetCurrentOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentOrganizationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentOrganizationQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentOrganizationQuery, GetCurrentOrganizationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentOrganizationQuery, GetCurrentOrganizationQueryVariables>(GetCurrentOrganizationDocument, options);
      }
export function useGetCurrentOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentOrganizationQuery, GetCurrentOrganizationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentOrganizationQuery, GetCurrentOrganizationQueryVariables>(GetCurrentOrganizationDocument, options);
        }
export type GetCurrentOrganizationQueryHookResult = ReturnType<typeof useGetCurrentOrganizationQuery>;
export type GetCurrentOrganizationLazyQueryHookResult = ReturnType<typeof useGetCurrentOrganizationLazyQuery>;
export type GetCurrentOrganizationQueryResult = Apollo.QueryResult<GetCurrentOrganizationQuery, GetCurrentOrganizationQueryVariables>;
export function refetchGetCurrentOrganizationQuery(variables?: GetCurrentOrganizationQueryVariables) {
      return { query: GetCurrentOrganizationDocument, variables: variables }
    }
export const FindOrganizationBySlugDocument = gql`
    query findOrganizationBySlug($slug: String!) {
  organizationBySlug(slug: $slug) {
    id
    name
  }
}
    `;

/**
 * __useFindOrganizationBySlugQuery__
 *
 * To run a query within a React component, call `useFindOrganizationBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOrganizationBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOrganizationBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useFindOrganizationBySlugQuery(baseOptions: Apollo.QueryHookOptions<FindOrganizationBySlugQuery, FindOrganizationBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOrganizationBySlugQuery, FindOrganizationBySlugQueryVariables>(FindOrganizationBySlugDocument, options);
      }
export function useFindOrganizationBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOrganizationBySlugQuery, FindOrganizationBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOrganizationBySlugQuery, FindOrganizationBySlugQueryVariables>(FindOrganizationBySlugDocument, options);
        }
export type FindOrganizationBySlugQueryHookResult = ReturnType<typeof useFindOrganizationBySlugQuery>;
export type FindOrganizationBySlugLazyQueryHookResult = ReturnType<typeof useFindOrganizationBySlugLazyQuery>;
export type FindOrganizationBySlugQueryResult = Apollo.QueryResult<FindOrganizationBySlugQuery, FindOrganizationBySlugQueryVariables>;
export function refetchFindOrganizationBySlugQuery(variables: FindOrganizationBySlugQueryVariables) {
      return { query: FindOrganizationBySlugDocument, variables: variables }
    }
export const SessionDocument = gql`
    query session {
  session {
    id
  }
}
    `;

/**
 * __useSessionQuery__
 *
 * To run a query within a React component, call `useSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useSessionQuery(baseOptions?: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
      }
export function useSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SessionQuery, SessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(SessionDocument, options);
        }
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionQueryResult = Apollo.QueryResult<SessionQuery, SessionQueryVariables>;
export function refetchSessionQuery(variables?: SessionQueryVariables) {
      return { query: SessionDocument, variables: variables }
    }
export const GetAccessTokenDocument = gql`
    query getAccessToken($organization: String) {
  accessToken(query: {organization: $organization}) {
    token
    expiresAt
  }
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
 *      organization: // value for 'organization'
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