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
  _FieldSet: any;
};

export type AccessTokenQuery = {
  /** Auth for organization */
  readonly organization?: InputMaybe<Scalars['String']>;
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
  readonly accessToken: TokenResponse;
  /** Logged in Account ID */
  readonly accountId: Scalars['String'];
};

export type CreateOrganizationInput = {
  /** Name of the organization */
  readonly name: Scalars['String'];
  /** Subscription plan */
  readonly plan: OrganizationPlan;
};

export type CreatePageInput = {
  /** Page title */
  readonly title: Scalars['String'];
};

export type CreateSectionInput = {
  /** Position */
  readonly index?: InputMaybe<Scalars['Float']>;
};

export type CreateSiteInput = {
  /** Site name */
  readonly name: Scalars['String'];
};

export enum EditStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  DRAFT = 'DRAFT'
}

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
  readonly cloneSection: PageSectionSchema;
  /** Create an organization */
  readonly createOrganization: OrganizationSchema;
  readonly createPage: PageUpdatedResponse;
  readonly createSection: PageSectionSchema;
  readonly createSite: SiteUpdatedResponse;
  readonly deletePage: PageUpdatedResponse;
  readonly deleteSection: PageSectionSchema;
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
  readonly updatePage: PageUpdatedResponse;
  readonly updateSectionFormat: PageSectionSchema;
  readonly updateSectionHead: PageSectionSchema;
  readonly updateSite: SiteUpdatedResponse;
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


export type MutationCloneSectionArgs = {
  pageId: Scalars['String'];
  sectionId: Scalars['String'];
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreatePageArgs = {
  input: CreatePageInput;
  siteId: Scalars['String'];
};


export type MutationCreateSectionArgs = {
  input: CreateSectionInput;
  pageId: Scalars['String'];
};


export type MutationCreateSiteArgs = {
  input: CreateSiteInput;
};


export type MutationDeletePageArgs = {
  id: Scalars['String'];
};


export type MutationDeleteSectionArgs = {
  pageId: Scalars['String'];
  sectionId: Scalars['String'];
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


export type MutationUpdatePageArgs = {
  id: Scalars['String'];
  input: UpdatePageInput;
};


export type MutationUpdateSectionFormatArgs = {
  input: UpdateSectionFormatInput;
  pageId: Scalars['String'];
  sectionId: Scalars['String'];
};


export type MutationUpdateSectionHeadArgs = {
  index: Scalars['Float'];
  pageId: Scalars['String'];
  sectionId: Scalars['String'];
};


export type MutationUpdateSiteArgs = {
  id: Scalars['String'];
  input: UpdateSiteInput;
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

export type PageElementPlatformSchema = {
  readonly __typename?: 'PageElementPlatformSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Height */
  readonly height: Scalars['Float'];
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Whether this element is visible */
  readonly isVisible: Scalars['Boolean'];
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** Width */
  readonly width: Scalars['Float'];
  /** X position */
  readonly x: Scalars['Float'];
  /** Y position */
  readonly y: Scalars['Float'];
};

export type PageSchema = {
  readonly __typename?: 'PageSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Page description */
  readonly description?: Maybe<Scalars['String']>;
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Whether the title should be independent or part of the title template */
  readonly isLoneTitle?: Maybe<Scalars['Boolean']>;
  /** Sections */
  readonly sections: ReadonlyArray<PageSectionSchema>;
  /** Page url */
  readonly slug?: Maybe<Scalars['String']>;
  /** Edit status */
  readonly status: EditStatus;
  /** Page title */
  readonly title: Scalars['String'];
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** Account ID of updater */
  readonly updatedBy: Scalars['String'];
};

export type PageSectionFormatSchema = {
  readonly __typename?: 'PageSectionFormatSchema';
  /** Column gap */
  readonly columnGap: Scalars['Float'];
  /** Row Gap */
  readonly rowGap: Scalars['Float'];
  /** Row count */
  readonly rowsCount: Scalars['Float'];
  /** Account ID of updater */
  readonly updatedBy: Scalars['String'];
};

export type PageSectionSchema = {
  readonly __typename?: 'PageSectionSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Section format configuration */
  readonly format: PageSectionFormatSchema;
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  readonly updatedBy: Scalars['String'];
};

export type PageUpdatedResponse = {
  readonly __typename?: 'PageUpdatedResponse';
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Edit status */
  readonly status: EditStatus;
};

export type Query = {
  readonly __typename?: 'Query';
  /** Generate an access token */
  readonly accessToken: TokenResponse;
  /** Get current logged in user information */
  readonly account: AccountSchema;
  /** Get current organization */
  readonly organization: ReadonlyArray<OrganizationSchema>;
  /** Find organization by slug */
  readonly organizationBySlug: OrganizationBySlugResponse;
  /** Get current organization membership */
  readonly organizationMembership: OrgMemberSchema;
  /** Get current user's organizations memberships */
  readonly organizations: ReadonlyArray<OrganizationSchema>;
  readonly page: PageSchema;
  readonly pageList: ReadonlyArray<PageSchema>;
  readonly section: PageSectionSchema;
  readonly sectionList: ReadonlyArray<PageSectionSchema>;
  /** Get current session user */
  readonly session: SessionResponse;
  readonly site: SiteSchema;
  readonly siteList: ReadonlyArray<SiteSchema>;
  /** Validate verification code */
  readonly validateVerificationCode: Scalars['Boolean'];
};


export type QueryAccessTokenArgs = {
  query: AccessTokenQuery;
};


export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryPageArgs = {
  id: Scalars['String'];
};


export type QueryPageListArgs = {
  siteId: Scalars['String'];
};


export type QuerySectionArgs = {
  sectionId: Scalars['String'];
};


export type QuerySectionListArgs = {
  pageId: Scalars['String'];
};


export type QuerySiteArgs = {
  id: Scalars['String'];
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

export type SiteSchema = {
  readonly __typename?: 'SiteSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Account ID of creator */
  readonly createdBy: Scalars['String'];
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Site name */
  readonly name: Scalars['String'];
  /** Site owner */
  readonly ownBy: Scalars['String'];
  /** Site status */
  readonly status: SiteStatus;
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** Account ID of last updater */
  readonly updatedBy: Scalars['String'];
  /** Site url */
  readonly url?: Maybe<Scalars['String']>;
};

export enum SiteStatus {
  DEPLOYED = 'DEPLOYED',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED'
}

export type SiteUpdatedResponse = {
  readonly __typename?: 'SiteUpdatedResponse';
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Site name */
  readonly name: Scalars['String'];
  /** Site status */
  readonly status: SiteStatus;
  /** Site url */
  readonly url?: Maybe<Scalars['String']>;
};

export type TokenResponse = {
  readonly __typename?: 'TokenResponse';
  /** Token expiry */
  readonly expiresAt: Scalars['DateTime'];
  /** Token */
  readonly value: Scalars['String'];
};

export type UpdateAccountInput = {
  /** User Display Name */
  readonly displayName?: InputMaybe<Scalars['String']>;
  /** First Name */
  readonly firstName?: InputMaybe<Scalars['String']>;
  /** Last Name */
  readonly lastName?: InputMaybe<Scalars['String']>;
};

export type UpdatePageInput = {
  /** Page description */
  readonly description?: InputMaybe<Scalars['String']>;
  /** Whether the title should be independent or part of the title template */
  readonly isLoneTitle?: InputMaybe<Scalars['Boolean']>;
  /** Page title */
  readonly title?: InputMaybe<Scalars['String']>;
};

export type UpdateSectionFormatInput = {
  /** Column gap */
  readonly columnGap?: InputMaybe<Scalars['Float']>;
  /** Row Gap */
  readonly rowGap?: InputMaybe<Scalars['Float']>;
  /** Row count */
  readonly rowsCount?: InputMaybe<Scalars['Float']>;
};

export type UpdateSiteInput = {
  /** Site name */
  readonly name?: InputMaybe<Scalars['String']>;
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


export type RegisterMutation = { readonly __typename?: 'Mutation', readonly registerAccount: { readonly __typename?: 'AuthResponse', readonly accessToken: { readonly __typename?: 'TokenResponse', readonly value: string, readonly expiresAt: Date } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { readonly __typename?: 'Mutation', readonly logout: boolean };

export type LoginWithVerificationMutationVariables = Exact<{
  username: Scalars['String'];
  verificationId: Scalars['String'];
  verificationCode: Scalars['String'];
}>;


export type LoginWithVerificationMutation = { readonly __typename?: 'Mutation', readonly loginWithVerification: { readonly __typename?: 'AuthResponse', readonly accessToken: { readonly __typename?: 'TokenResponse', readonly value: string, readonly expiresAt: Date } } };

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

export type GetAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountQuery = { readonly __typename?: 'Query', readonly account: { readonly __typename?: 'AccountSchema', readonly firstName: string, readonly lastName: string, readonly displayName: string } };

export type GetOrgMembershipQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgMembershipQuery = { readonly __typename?: 'Query', readonly organizationMembership: { readonly __typename?: 'OrgMemberSchema', readonly profileImageUrl?: string | null, readonly status: OrgMemberStatus, readonly role: OrgMemberRole } };

export type GetOrgsMembershipListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgsMembershipListQuery = { readonly __typename?: 'Query', readonly organizations: ReadonlyArray<{ readonly __typename?: 'OrganizationSchema', readonly id: string, readonly name: string, readonly slug: string, readonly logoUrl?: string | null }> };

export type GetCurrentOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentOrganizationQuery = { readonly __typename?: 'Query', readonly organization: ReadonlyArray<{ readonly __typename?: 'OrganizationSchema', readonly name: string, readonly logoUrl?: string | null, readonly plan: OrganizationPlan, readonly slug: string }> };

export type FindOrganizationBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type FindOrganizationBySlugQuery = { readonly __typename?: 'Query', readonly organizationBySlug: { readonly __typename?: 'OrganizationBySlugResponse', readonly id: string, readonly name: string } };

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

export type GetPageSectionQueryVariables = Exact<{
  sectionId: Scalars['String'];
}>;


export type GetPageSectionQuery = { readonly __typename?: 'Query', readonly section: { readonly __typename?: 'PageSectionSchema', readonly id: string, readonly format: { readonly __typename?: 'PageSectionFormatSchema', readonly rowsCount: number, readonly rowGap: number, readonly columnGap: number } } };

export type GetPageSectionListQueryVariables = Exact<{
  pageId: Scalars['String'];
}>;


export type GetPageSectionListQuery = { readonly __typename?: 'Query', readonly sectionList: ReadonlyArray<{ readonly __typename?: 'PageSectionSchema', readonly id: string, readonly createdAt: Date, readonly updatedAt: Date, readonly updatedBy: string, readonly format: { readonly __typename?: 'PageSectionFormatSchema', readonly rowsCount: number, readonly rowGap: number, readonly columnGap: number, readonly updatedBy: string } }> };

export type CreatePageSectionMutationVariables = Exact<{
  pageId: Scalars['String'];
  input: CreateSectionInput;
}>;


export type CreatePageSectionMutation = { readonly __typename?: 'Mutation', readonly createSection: { readonly __typename?: 'PageSectionSchema', readonly id: string } };

export type DeletePageSectionMutationVariables = Exact<{
  pageId: Scalars['String'];
  sectionId: Scalars['String'];
}>;


export type DeletePageSectionMutation = { readonly __typename?: 'Mutation', readonly deleteSection: { readonly __typename?: 'PageSectionSchema', readonly id: string } };

export type UpdatePageSectionIndexMutationVariables = Exact<{
  pageId: Scalars['String'];
  sectionId: Scalars['String'];
  index: Scalars['Float'];
}>;


export type UpdatePageSectionIndexMutation = { readonly __typename?: 'Mutation', readonly updateSectionHead: { readonly __typename?: 'PageSectionSchema', readonly id: string } };

export type UpdatePageSectionFormatMutationVariables = Exact<{
  pageId: Scalars['String'];
  sectionId: Scalars['String'];
  input: UpdateSectionFormatInput;
}>;


export type UpdatePageSectionFormatMutation = { readonly __typename?: 'Mutation', readonly updateSectionFormat: { readonly __typename?: 'PageSectionSchema', readonly id: string } };

export type GetPageListQueryVariables = Exact<{
  siteId: Scalars['String'];
}>;


export type GetPageListQuery = { readonly __typename?: 'Query', readonly pageList: ReadonlyArray<{ readonly __typename?: 'PageSchema', readonly id: string, readonly title: string, readonly status: EditStatus }> };

export type GetPageQueryVariables = Exact<{
  pageId: Scalars['String'];
}>;


export type GetPageQuery = { readonly __typename?: 'Query', readonly page: { readonly __typename?: 'PageSchema', readonly id: string, readonly title: string, readonly status: EditStatus, readonly isLoneTitle?: boolean | null, readonly description?: string | null, readonly createdAt: Date, readonly updatedAt: Date, readonly updatedBy: string } };

export type CreatePageMutationVariables = Exact<{
  siteId: Scalars['String'];
  prop: CreatePageInput;
}>;


export type CreatePageMutation = { readonly __typename?: 'Mutation', readonly createPage: { readonly __typename?: 'PageUpdatedResponse', readonly id: string, readonly status: EditStatus } };

export type UpdatePageMutationVariables = Exact<{
  pageId: Scalars['String'];
  input: UpdatePageInput;
}>;


export type UpdatePageMutation = { readonly __typename?: 'Mutation', readonly updatePage: { readonly __typename?: 'PageUpdatedResponse', readonly status: EditStatus } };

export type DeletePageMutationVariables = Exact<{
  pageId: Scalars['String'];
}>;


export type DeletePageMutation = { readonly __typename?: 'Mutation', readonly deletePage: { readonly __typename?: 'PageUpdatedResponse', readonly status: EditStatus } };

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = { readonly __typename?: 'Query', readonly session: { readonly __typename?: 'SessionResponse', readonly id: string } };

export type GetAccessTokenQueryVariables = Exact<{
  organization?: InputMaybe<Scalars['String']>;
}>;


export type GetAccessTokenQuery = { readonly __typename?: 'Query', readonly accessToken: { readonly __typename?: 'TokenResponse', readonly value: string, readonly expiresAt: Date } };

export type GetSitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSitesQuery = { readonly __typename?: 'Query', readonly siteList: ReadonlyArray<{ readonly __typename?: 'SiteSchema', readonly id: string, readonly name: string, readonly status: SiteStatus }> };

export type GetSiteQueryVariables = Exact<{
  siteId: Scalars['String'];
}>;


export type GetSiteQuery = { readonly __typename?: 'Query', readonly site: { readonly __typename?: 'SiteSchema', readonly id: string, readonly name: string, readonly updatedAt: Date } };

export type CreateSiteMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateSiteMutation = { readonly __typename?: 'Mutation', readonly createSite: { readonly __typename?: 'SiteUpdatedResponse', readonly id: string } };

export type UpdateSiteMutationVariables = Exact<{
  siteId: Scalars['String'];
  name: Scalars['String'];
}>;


export type UpdateSiteMutation = { readonly __typename?: 'Mutation', readonly updateSite: { readonly __typename?: 'SiteUpdatedResponse', readonly id: string, readonly status: SiteStatus } };

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


export const RegisterDocument = gql`
    mutation register($email: String!, $phone: String, $firstName: String, $lastName: String, $displayName: String) {
  registerAccount(
    input: {email: $email, phone: $phone, firstName: $firstName, lastName: $lastName, displayName: $displayName}
  ) {
    accessToken {
      value
      expiresAt
    }
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
    accessToken {
      value
      expiresAt
    }
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
export const GetPageSectionDocument = gql`
    query getPageSection($sectionId: String!) {
  section(sectionId: $sectionId) {
    id
    format {
      rowsCount
      rowGap
      columnGap
    }
  }
}
    `;

/**
 * __useGetPageSectionQuery__
 *
 * To run a query within a React component, call `useGetPageSectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageSectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageSectionQuery({
 *   variables: {
 *      sectionId: // value for 'sectionId'
 *   },
 * });
 */
export function useGetPageSectionQuery(baseOptions: Apollo.QueryHookOptions<GetPageSectionQuery, GetPageSectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPageSectionQuery, GetPageSectionQueryVariables>(GetPageSectionDocument, options);
      }
export function useGetPageSectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPageSectionQuery, GetPageSectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPageSectionQuery, GetPageSectionQueryVariables>(GetPageSectionDocument, options);
        }
export type GetPageSectionQueryHookResult = ReturnType<typeof useGetPageSectionQuery>;
export type GetPageSectionLazyQueryHookResult = ReturnType<typeof useGetPageSectionLazyQuery>;
export type GetPageSectionQueryResult = Apollo.QueryResult<GetPageSectionQuery, GetPageSectionQueryVariables>;
export function refetchGetPageSectionQuery(variables: GetPageSectionQueryVariables) {
      return { query: GetPageSectionDocument, variables: variables }
    }
export const GetPageSectionListDocument = gql`
    query getPageSectionList($pageId: String!) {
  sectionList(pageId: $pageId) {
    id
    createdAt
    updatedAt
    updatedBy
    format {
      rowsCount
      rowGap
      columnGap
      updatedBy
    }
  }
}
    `;

/**
 * __useGetPageSectionListQuery__
 *
 * To run a query within a React component, call `useGetPageSectionListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageSectionListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageSectionListQuery({
 *   variables: {
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useGetPageSectionListQuery(baseOptions: Apollo.QueryHookOptions<GetPageSectionListQuery, GetPageSectionListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPageSectionListQuery, GetPageSectionListQueryVariables>(GetPageSectionListDocument, options);
      }
export function useGetPageSectionListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPageSectionListQuery, GetPageSectionListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPageSectionListQuery, GetPageSectionListQueryVariables>(GetPageSectionListDocument, options);
        }
export type GetPageSectionListQueryHookResult = ReturnType<typeof useGetPageSectionListQuery>;
export type GetPageSectionListLazyQueryHookResult = ReturnType<typeof useGetPageSectionListLazyQuery>;
export type GetPageSectionListQueryResult = Apollo.QueryResult<GetPageSectionListQuery, GetPageSectionListQueryVariables>;
export function refetchGetPageSectionListQuery(variables: GetPageSectionListQueryVariables) {
      return { query: GetPageSectionListDocument, variables: variables }
    }
export const CreatePageSectionDocument = gql`
    mutation createPageSection($pageId: String!, $input: CreateSectionInput!) {
  createSection(pageId: $pageId, input: $input) {
    id
  }
}
    `;
export type CreatePageSectionMutationFn = Apollo.MutationFunction<CreatePageSectionMutation, CreatePageSectionMutationVariables>;

/**
 * __useCreatePageSectionMutation__
 *
 * To run a mutation, you first call `useCreatePageSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageSectionMutation, { data, loading, error }] = useCreatePageSectionMutation({
 *   variables: {
 *      pageId: // value for 'pageId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePageSectionMutation(baseOptions?: Apollo.MutationHookOptions<CreatePageSectionMutation, CreatePageSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePageSectionMutation, CreatePageSectionMutationVariables>(CreatePageSectionDocument, options);
      }
export type CreatePageSectionMutationHookResult = ReturnType<typeof useCreatePageSectionMutation>;
export type CreatePageSectionMutationResult = Apollo.MutationResult<CreatePageSectionMutation>;
export type CreatePageSectionMutationOptions = Apollo.BaseMutationOptions<CreatePageSectionMutation, CreatePageSectionMutationVariables>;
export const DeletePageSectionDocument = gql`
    mutation deletePageSection($pageId: String!, $sectionId: String!) {
  deleteSection(pageId: $pageId, sectionId: $sectionId) {
    id
  }
}
    `;
export type DeletePageSectionMutationFn = Apollo.MutationFunction<DeletePageSectionMutation, DeletePageSectionMutationVariables>;

/**
 * __useDeletePageSectionMutation__
 *
 * To run a mutation, you first call `useDeletePageSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageSectionMutation, { data, loading, error }] = useDeletePageSectionMutation({
 *   variables: {
 *      pageId: // value for 'pageId'
 *      sectionId: // value for 'sectionId'
 *   },
 * });
 */
export function useDeletePageSectionMutation(baseOptions?: Apollo.MutationHookOptions<DeletePageSectionMutation, DeletePageSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePageSectionMutation, DeletePageSectionMutationVariables>(DeletePageSectionDocument, options);
      }
export type DeletePageSectionMutationHookResult = ReturnType<typeof useDeletePageSectionMutation>;
export type DeletePageSectionMutationResult = Apollo.MutationResult<DeletePageSectionMutation>;
export type DeletePageSectionMutationOptions = Apollo.BaseMutationOptions<DeletePageSectionMutation, DeletePageSectionMutationVariables>;
export const UpdatePageSectionIndexDocument = gql`
    mutation updatePageSectionIndex($pageId: String!, $sectionId: String!, $index: Float!) {
  updateSectionHead(pageId: $pageId, sectionId: $sectionId, index: $index) {
    id
  }
}
    `;
export type UpdatePageSectionIndexMutationFn = Apollo.MutationFunction<UpdatePageSectionIndexMutation, UpdatePageSectionIndexMutationVariables>;

/**
 * __useUpdatePageSectionIndexMutation__
 *
 * To run a mutation, you first call `useUpdatePageSectionIndexMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageSectionIndexMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageSectionIndexMutation, { data, loading, error }] = useUpdatePageSectionIndexMutation({
 *   variables: {
 *      pageId: // value for 'pageId'
 *      sectionId: // value for 'sectionId'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useUpdatePageSectionIndexMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePageSectionIndexMutation, UpdatePageSectionIndexMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePageSectionIndexMutation, UpdatePageSectionIndexMutationVariables>(UpdatePageSectionIndexDocument, options);
      }
export type UpdatePageSectionIndexMutationHookResult = ReturnType<typeof useUpdatePageSectionIndexMutation>;
export type UpdatePageSectionIndexMutationResult = Apollo.MutationResult<UpdatePageSectionIndexMutation>;
export type UpdatePageSectionIndexMutationOptions = Apollo.BaseMutationOptions<UpdatePageSectionIndexMutation, UpdatePageSectionIndexMutationVariables>;
export const UpdatePageSectionFormatDocument = gql`
    mutation updatePageSectionFormat($pageId: String!, $sectionId: String!, $input: UpdateSectionFormatInput!) {
  updateSectionFormat(pageId: $pageId, sectionId: $sectionId, input: $input) {
    id
  }
}
    `;
export type UpdatePageSectionFormatMutationFn = Apollo.MutationFunction<UpdatePageSectionFormatMutation, UpdatePageSectionFormatMutationVariables>;

/**
 * __useUpdatePageSectionFormatMutation__
 *
 * To run a mutation, you first call `useUpdatePageSectionFormatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageSectionFormatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageSectionFormatMutation, { data, loading, error }] = useUpdatePageSectionFormatMutation({
 *   variables: {
 *      pageId: // value for 'pageId'
 *      sectionId: // value for 'sectionId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageSectionFormatMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePageSectionFormatMutation, UpdatePageSectionFormatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePageSectionFormatMutation, UpdatePageSectionFormatMutationVariables>(UpdatePageSectionFormatDocument, options);
      }
export type UpdatePageSectionFormatMutationHookResult = ReturnType<typeof useUpdatePageSectionFormatMutation>;
export type UpdatePageSectionFormatMutationResult = Apollo.MutationResult<UpdatePageSectionFormatMutation>;
export type UpdatePageSectionFormatMutationOptions = Apollo.BaseMutationOptions<UpdatePageSectionFormatMutation, UpdatePageSectionFormatMutationVariables>;
export const GetPageListDocument = gql`
    query getPageList($siteId: String!) {
  pageList(siteId: $siteId) {
    id
    title
    status
  }
}
    `;

/**
 * __useGetPageListQuery__
 *
 * To run a query within a React component, call `useGetPageListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageListQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useGetPageListQuery(baseOptions: Apollo.QueryHookOptions<GetPageListQuery, GetPageListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPageListQuery, GetPageListQueryVariables>(GetPageListDocument, options);
      }
export function useGetPageListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPageListQuery, GetPageListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPageListQuery, GetPageListQueryVariables>(GetPageListDocument, options);
        }
export type GetPageListQueryHookResult = ReturnType<typeof useGetPageListQuery>;
export type GetPageListLazyQueryHookResult = ReturnType<typeof useGetPageListLazyQuery>;
export type GetPageListQueryResult = Apollo.QueryResult<GetPageListQuery, GetPageListQueryVariables>;
export function refetchGetPageListQuery(variables: GetPageListQueryVariables) {
      return { query: GetPageListDocument, variables: variables }
    }
export const GetPageDocument = gql`
    query getPage($pageId: String!) {
  page(id: $pageId) {
    id
    title
    status
    isLoneTitle
    description
    createdAt
    updatedAt
    updatedBy
  }
}
    `;

/**
 * __useGetPageQuery__
 *
 * To run a query within a React component, call `useGetPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPageQuery({
 *   variables: {
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useGetPageQuery(baseOptions: Apollo.QueryHookOptions<GetPageQuery, GetPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPageQuery, GetPageQueryVariables>(GetPageDocument, options);
      }
export function useGetPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPageQuery, GetPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPageQuery, GetPageQueryVariables>(GetPageDocument, options);
        }
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>;
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>;
export type GetPageQueryResult = Apollo.QueryResult<GetPageQuery, GetPageQueryVariables>;
export function refetchGetPageQuery(variables: GetPageQueryVariables) {
      return { query: GetPageDocument, variables: variables }
    }
export const CreatePageDocument = gql`
    mutation createPage($siteId: String!, $prop: CreatePageInput!) {
  createPage(siteId: $siteId, input: $prop) {
    id
    status
  }
}
    `;
export type CreatePageMutationFn = Apollo.MutationFunction<CreatePageMutation, CreatePageMutationVariables>;

/**
 * __useCreatePageMutation__
 *
 * To run a mutation, you first call `useCreatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPageMutation, { data, loading, error }] = useCreatePageMutation({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      prop: // value for 'prop'
 *   },
 * });
 */
export function useCreatePageMutation(baseOptions?: Apollo.MutationHookOptions<CreatePageMutation, CreatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePageMutation, CreatePageMutationVariables>(CreatePageDocument, options);
      }
export type CreatePageMutationHookResult = ReturnType<typeof useCreatePageMutation>;
export type CreatePageMutationResult = Apollo.MutationResult<CreatePageMutation>;
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<CreatePageMutation, CreatePageMutationVariables>;
export const UpdatePageDocument = gql`
    mutation updatePage($pageId: String!, $input: UpdatePageInput!) {
  updatePage(id: $pageId, input: $input) {
    status
  }
}
    `;
export type UpdatePageMutationFn = Apollo.MutationFunction<UpdatePageMutation, UpdatePageMutationVariables>;

/**
 * __useUpdatePageMutation__
 *
 * To run a mutation, you first call `useUpdatePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePageMutation, { data, loading, error }] = useUpdatePageMutation({
 *   variables: {
 *      pageId: // value for 'pageId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePageMutation, UpdatePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(UpdatePageDocument, options);
      }
export type UpdatePageMutationHookResult = ReturnType<typeof useUpdatePageMutation>;
export type UpdatePageMutationResult = Apollo.MutationResult<UpdatePageMutation>;
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<UpdatePageMutation, UpdatePageMutationVariables>;
export const DeletePageDocument = gql`
    mutation deletePage($pageId: String!) {
  deletePage(id: $pageId) {
    status
  }
}
    `;
export type DeletePageMutationFn = Apollo.MutationFunction<DeletePageMutation, DeletePageMutationVariables>;

/**
 * __useDeletePageMutation__
 *
 * To run a mutation, you first call `useDeletePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePageMutation, { data, loading, error }] = useDeletePageMutation({
 *   variables: {
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useDeletePageMutation(baseOptions?: Apollo.MutationHookOptions<DeletePageMutation, DeletePageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePageMutation, DeletePageMutationVariables>(DeletePageDocument, options);
      }
export type DeletePageMutationHookResult = ReturnType<typeof useDeletePageMutation>;
export type DeletePageMutationResult = Apollo.MutationResult<DeletePageMutation>;
export type DeletePageMutationOptions = Apollo.BaseMutationOptions<DeletePageMutation, DeletePageMutationVariables>;
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
    value
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
export const GetSitesDocument = gql`
    query getSites {
  siteList {
    id
    name
    status
  }
}
    `;

/**
 * __useGetSitesQuery__
 *
 * To run a query within a React component, call `useGetSitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSitesQuery(baseOptions?: Apollo.QueryHookOptions<GetSitesQuery, GetSitesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSitesQuery, GetSitesQueryVariables>(GetSitesDocument, options);
      }
export function useGetSitesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSitesQuery, GetSitesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSitesQuery, GetSitesQueryVariables>(GetSitesDocument, options);
        }
export type GetSitesQueryHookResult = ReturnType<typeof useGetSitesQuery>;
export type GetSitesLazyQueryHookResult = ReturnType<typeof useGetSitesLazyQuery>;
export type GetSitesQueryResult = Apollo.QueryResult<GetSitesQuery, GetSitesQueryVariables>;
export function refetchGetSitesQuery(variables?: GetSitesQueryVariables) {
      return { query: GetSitesDocument, variables: variables }
    }
export const GetSiteDocument = gql`
    query getSite($siteId: String!) {
  site(id: $siteId) {
    id
    name
    updatedAt
  }
}
    `;

/**
 * __useGetSiteQuery__
 *
 * To run a query within a React component, call `useGetSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSiteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSiteQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useGetSiteQuery(baseOptions: Apollo.QueryHookOptions<GetSiteQuery, GetSiteQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSiteQuery, GetSiteQueryVariables>(GetSiteDocument, options);
      }
export function useGetSiteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSiteQuery, GetSiteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSiteQuery, GetSiteQueryVariables>(GetSiteDocument, options);
        }
export type GetSiteQueryHookResult = ReturnType<typeof useGetSiteQuery>;
export type GetSiteLazyQueryHookResult = ReturnType<typeof useGetSiteLazyQuery>;
export type GetSiteQueryResult = Apollo.QueryResult<GetSiteQuery, GetSiteQueryVariables>;
export function refetchGetSiteQuery(variables: GetSiteQueryVariables) {
      return { query: GetSiteDocument, variables: variables }
    }
export const CreateSiteDocument = gql`
    mutation createSite($name: String!) {
  createSite(input: {name: $name}) {
    id
  }
}
    `;
export type CreateSiteMutationFn = Apollo.MutationFunction<CreateSiteMutation, CreateSiteMutationVariables>;

/**
 * __useCreateSiteMutation__
 *
 * To run a mutation, you first call `useCreateSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSiteMutation, { data, loading, error }] = useCreateSiteMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateSiteMutation(baseOptions?: Apollo.MutationHookOptions<CreateSiteMutation, CreateSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSiteMutation, CreateSiteMutationVariables>(CreateSiteDocument, options);
      }
export type CreateSiteMutationHookResult = ReturnType<typeof useCreateSiteMutation>;
export type CreateSiteMutationResult = Apollo.MutationResult<CreateSiteMutation>;
export type CreateSiteMutationOptions = Apollo.BaseMutationOptions<CreateSiteMutation, CreateSiteMutationVariables>;
export const UpdateSiteDocument = gql`
    mutation updateSite($siteId: String!, $name: String!) {
  updateSite(input: {name: $name}, id: $siteId) {
    id
    status
  }
}
    `;
export type UpdateSiteMutationFn = Apollo.MutationFunction<UpdateSiteMutation, UpdateSiteMutationVariables>;

/**
 * __useUpdateSiteMutation__
 *
 * To run a mutation, you first call `useUpdateSiteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSiteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSiteMutation, { data, loading, error }] = useUpdateSiteMutation({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateSiteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSiteMutation, UpdateSiteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument, options);
      }
export type UpdateSiteMutationHookResult = ReturnType<typeof useUpdateSiteMutation>;
export type UpdateSiteMutationResult = Apollo.MutationResult<UpdateSiteMutation>;
export type UpdateSiteMutationOptions = Apollo.BaseMutationOptions<UpdateSiteMutation, UpdateSiteMutationVariables>;
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