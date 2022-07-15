import * as Apollo from '@apollo/client';

import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
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

export type BoxElementSchema = {
  readonly __typename?: 'BoxElementSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  readonly htmlType: HtmlType;
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** When is root, parent is not an element */
  readonly isRoot?: Maybe<Scalars['Boolean']>;
  /** Parent of element */
  readonly parent: Scalars['String'];
  /** Element style */
  readonly style?: Maybe<StyleSchema>;
  /** Element type */
  readonly type: ElementType;
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  readonly updatedBy: Scalars['String'];
};

/** Use to group multiple elements together */
export type ComponentSchema = {
  readonly __typename?: 'ComponentSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Account ID */
  readonly createdBy: Scalars['String'];
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Component's name */
  readonly name: Scalars['String'];
  /** Edit status */
  readonly status: EditStatus;
  /** Thumbnail URI */
  readonly thumbnailUrl?: Maybe<Scalars['String']>;
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  /** Account ID */
  readonly updatedBy: Scalars['String'];
};

export type CreateBoxInput = {
  /** Element context */
  readonly ctx: PageContextInput;
  readonly htmlType?: InputMaybe<HtmlType>;
  readonly parent: Scalars['String'];
  readonly style?: InputMaybe<StyleInput>;
};

export type CreateComponentInput = {
  /** Component's name */
  readonly name: Scalars['String'];
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

export type CreateSiteInput = {
  /** Site name */
  readonly name: Scalars['String'];
};

export type CreateTextInput = {
  /** Element context */
  readonly ctx: PageContextInput;
  readonly parent: Scalars['String'];
  readonly style?: InputMaybe<StyleInput>;
  /** Text */
  readonly text: Scalars['String'];
};

export type DeleteElementInput = {
  /** Element context */
  readonly ctx: PageContextInput;
  /** Element ID */
  readonly elementId: Scalars['String'];
  readonly parent: Scalars['String'];
  readonly style?: InputMaybe<StyleInput>;
};

export type DirectionalInput = {
  /** Bottom side */
  readonly bottom?: InputMaybe<Scalars['String']>;
  /** Left side */
  readonly left?: InputMaybe<Scalars['String']>;
  /** Right side */
  readonly right?: InputMaybe<Scalars['String']>;
  /** Top side */
  readonly top?: InputMaybe<Scalars['String']>;
};

export type DirectionalSchema = {
  readonly __typename?: 'DirectionalSchema';
  /** Bottom side */
  readonly bottom?: Maybe<Scalars['String']>;
  /** Left side */
  readonly left?: Maybe<Scalars['String']>;
  /** Right side */
  readonly right?: Maybe<Scalars['String']>;
  /** Top side */
  readonly top?: Maybe<Scalars['String']>;
};

export enum EditStatus {
  ACTIVE = 'ACTIVE',
  ARCHIVED = 'ARCHIVED',
  DRAFT = 'DRAFT',
}

export enum ElementType {
  BOX = 'BOX',
  IMAGE = 'IMAGE',
  INPUT = 'INPUT',
  LINK = 'LINK',
  TEXT = 'TEXT',
  VIDEO = 'VIDEO',
}

export type ElementUnion = BoxElementSchema | TextElementSchema;

export enum HtmlType {
  BUTTON = 'button',
  DIV = 'div',
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
  readonly archiveComponent: Scalars['Boolean'];
  /** Archive an organization */
  readonly archiveOrganization: Scalars['String'];
  readonly createBox: Scalars['String'];
  readonly createComponent: ComponentSchema;
  /** Create an organization */
  readonly createOrganization: OrganizationSchema;
  readonly createPage: PageUpdatedResponse;
  readonly createSite: SiteUpdatedResponse;
  readonly createText: Scalars['String'];
  readonly deleteComponent: Scalars['Boolean'];
  readonly deleteElement: Scalars['Boolean'];
  readonly deletePage: PageUpdatedResponse;
  readonly getOrCreateFirstPage: PageSchema;
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
  readonly updateBox: Scalars['Boolean'];
  readonly updateComponent: Scalars['Boolean'];
  readonly updatePage: PageUpdatedResponse;
  readonly updateSite: SiteUpdatedResponse;
  readonly updateText: Scalars['Boolean'];
};

export type MutationAddEmailToAccountArgs = {
  email: Scalars['String'];
};

export type MutationAddPhoneToAccountArgs = {
  phone: Scalars['String'];
};

export type MutationArchiveComponentArgs = {
  id: Scalars['String'];
};

export type MutationArchiveOrganizationArgs = {
  orgId: Scalars['String'];
};

export type MutationCreateBoxArgs = {
  input: CreateBoxInput;
};

export type MutationCreateComponentArgs = {
  input: CreateComponentInput;
};

export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};

export type MutationCreatePageArgs = {
  input: CreatePageInput;
  siteId: Scalars['String'];
};

export type MutationCreateSiteArgs = {
  input: CreateSiteInput;
};

export type MutationCreateTextArgs = {
  input: CreateTextInput;
};

export type MutationDeleteComponentArgs = {
  id: Scalars['String'];
};

export type MutationDeleteElementArgs = {
  input: DeleteElementInput;
};

export type MutationDeletePageArgs = {
  id: Scalars['String'];
  siteId: Scalars['String'];
};

export type MutationGetOrCreateFirstPageArgs = {
  siteId: Scalars['String'];
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

export type MutationUpdateBoxArgs = {
  input: UpdateBoxInput;
};

export type MutationUpdateComponentArgs = {
  id: Scalars['String'];
  input: UpdateComponentInput;
};

export type MutationUpdatePageArgs = {
  id: Scalars['String'];
  input: UpdatePageInput;
  siteId: Scalars['String'];
};

export type MutationUpdateSiteArgs = {
  id: Scalars['String'];
  input: UpdateSiteInput;
};

export type MutationUpdateTextArgs = {
  input: UpdateTextInput;
};

export enum OrgMemberRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  GUESS = 'GUESS',
  MEMBER = 'MEMBER',
  OWNER = 'OWNER',
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
  REJECTED = 'REJECTED',
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
  FREE = 'FREE',
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
  SUSPENDED = 'SUSPENDED',
}

export type PageContextInput = {
  /** Page ID */
  readonly pageId: Scalars['String'];
  /** Site ID */
  readonly siteId: Scalars['String'];
};

export type PageSchema = {
  readonly __typename?: 'PageSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Account ID of creator */
  readonly createdBy: Scalars['String'];
  /** Page description */
  readonly description?: Maybe<Scalars['String']>;
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Whether the title should be independent or part of the title template */
  readonly isLoneTitle?: Maybe<Scalars['Boolean']>;
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
  readonly component: ComponentSchema;
  readonly componentList: ReadonlyArray<ComponentSchema>;
  readonly flatElementList: ReadonlyArray<ElementUnion>;
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

export type QueryComponentArgs = {
  id: Scalars['String'];
};

export type QueryFlatElementListArgs = {
  filter: PageContextInput;
};

export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String'];
};

export type QueryPageArgs = {
  id: Scalars['String'];
  siteId: Scalars['String'];
};

export type QueryPageListArgs = {
  siteId: Scalars['String'];
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
  SUSPENDED = 'SUSPENDED',
}

export type SiteUpdatedResponse = {
  readonly __typename?: 'SiteUpdatedResponse';
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** Site status */
  readonly status: SiteStatus;
};

export type StyleInput = {
  readonly bottom?: InputMaybe<DirectionalInput>;
  readonly left?: InputMaybe<DirectionalInput>;
  readonly right?: InputMaybe<DirectionalInput>;
  readonly top?: InputMaybe<DirectionalInput>;
};

export type StyleSchema = {
  readonly __typename?: 'StyleSchema';
  /** Border radius */
  readonly borderRadius: DirectionalSchema;
  /** Margin */
  readonly margin: DirectionalSchema;
  /** Padding */
  readonly padding: DirectionalSchema;
};

export type TextElementSchema = {
  readonly __typename?: 'TextElementSchema';
  /** Date entity was created */
  readonly createdAt: Scalars['DateTime'];
  /** Identifier of the entity */
  readonly id: Scalars['ID'];
  /** When is root, parent is not an element */
  readonly isRoot?: Maybe<Scalars['Boolean']>;
  /** Parent of element */
  readonly parent: Scalars['String'];
  /** Element style */
  readonly style?: Maybe<StyleSchema>;
  /** Text */
  readonly text: Scalars['String'];
  /** Element type */
  readonly type: ElementType;
  /** Date entity was updated */
  readonly updatedAt: Scalars['DateTime'];
  readonly updatedBy: Scalars['String'];
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

export type UpdateBoxInput = {
  /** Element context */
  readonly ctx: PageContextInput;
  /** Element ID */
  readonly elementId: Scalars['String'];
  readonly htmlType?: InputMaybe<HtmlType>;
  readonly parent: Scalars['String'];
  readonly style?: InputMaybe<StyleInput>;
};

export type UpdateComponentInput = {
  /** Component's name */
  readonly name?: InputMaybe<Scalars['String']>;
};

export type UpdatePageInput = {
  /** Page description */
  readonly description?: InputMaybe<Scalars['String']>;
  /** Whether the title should be independent or part of the title template */
  readonly isLoneTitle?: InputMaybe<Scalars['Boolean']>;
  /** Page title */
  readonly title?: InputMaybe<Scalars['String']>;
};

export type UpdateSiteInput = {
  /** Site name */
  readonly name?: InputMaybe<Scalars['String']>;
};

export type UpdateTextInput = {
  /** Element context */
  readonly ctx: PageContextInput;
  /** Element ID */
  readonly elementId: Scalars['String'];
  readonly parent: Scalars['String'];
  readonly style?: InputMaybe<StyleInput>;
  /** Text */
  readonly text?: InputMaybe<Scalars['String']>;
};

export type ValidateVerificationCodeInput = {
  /** Verification Code */
  readonly verificationCode: Scalars['String'];
  /** Verification ID */
  readonly verificationId: Scalars['String'];
};

export enum VerificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
}

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
}>;

export type RegisterMutation = {
  readonly __typename?: 'Mutation';
  readonly registerAccount: {
    readonly __typename?: 'AuthResponse';
    readonly accessToken: {
      readonly __typename?: 'TokenResponse';
      readonly value: string;
      readonly expiresAt: Date;
    };
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  readonly __typename?: 'Mutation';
  readonly logout: boolean;
};

export type LoginWithVerificationMutationVariables = Exact<{
  username: Scalars['String'];
  verificationId: Scalars['String'];
  verificationCode: Scalars['String'];
}>;

export type LoginWithVerificationMutation = {
  readonly __typename?: 'Mutation';
  readonly loginWithVerification: {
    readonly __typename?: 'AuthResponse';
    readonly accessToken: {
      readonly __typename?: 'TokenResponse';
      readonly value: string;
      readonly expiresAt: Date;
    };
  };
};

export type AddEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type AddEmailMutation = {
  readonly __typename?: 'Mutation';
  readonly addEmailToAccount: boolean;
};

export type RemoveEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;

export type RemoveEmailMutation = {
  readonly __typename?: 'Mutation';
  readonly removeEmailFromAccount: boolean;
};

export type AddPhoneMutationVariables = Exact<{
  phone: Scalars['String'];
}>;

export type AddPhoneMutation = {
  readonly __typename?: 'Mutation';
  readonly addPhoneToAccount: boolean;
};

export type RemovePhoneMutationVariables = Exact<{
  phone: Scalars['String'];
}>;

export type RemovePhoneMutation = {
  readonly __typename?: 'Mutation';
  readonly removePhoneFromAccount: boolean;
};

export type GetAccountQueryVariables = Exact<{ [key: string]: never }>;

export type GetAccountQuery = {
  readonly __typename?: 'Query';
  readonly account: {
    readonly __typename?: 'AccountSchema';
    readonly firstName: string;
    readonly lastName: string;
    readonly displayName: string;
  };
};

export type GetComponentQueryVariables = Exact<{
  componentId: Scalars['String'];
}>;

export type GetComponentQuery = {
  readonly __typename?: 'Query';
  readonly component: {
    readonly __typename?: 'ComponentSchema';
    readonly id: string;
    readonly name: string;
    readonly status: EditStatus;
    readonly updatedBy: string;
    readonly thumbnailUrl?: string | null;
    readonly updatedAt: Date;
  };
};

export type GetComponentListQueryVariables = Exact<{ [key: string]: never }>;

export type GetComponentListQuery = {
  readonly __typename?: 'Query';
  readonly componentList: ReadonlyArray<{
    readonly __typename?: 'ComponentSchema';
    readonly id: string;
    readonly name: string;
    readonly thumbnailUrl?: string | null;
  }>;
};

export type CreateComponentMutationVariables = Exact<{
  input: CreateComponentInput;
}>;

export type CreateComponentMutation = {
  readonly __typename?: 'Mutation';
  readonly createComponent: {
    readonly __typename?: 'ComponentSchema';
    readonly id: string;
  };
};

export type UpdateComponentMutationVariables = Exact<{
  componentId: Scalars['String'];
  input: UpdateComponentInput;
}>;

export type UpdateComponentMutation = {
  readonly __typename?: 'Mutation';
  readonly updateComponent: boolean;
};

export type ArchiveComponentMutationVariables = Exact<{
  componentId: Scalars['String'];
}>;

export type ArchiveComponentMutation = {
  readonly __typename?: 'Mutation';
  readonly archiveComponent: boolean;
};

export type DeleteComponentMutationVariables = Exact<{
  componentId: Scalars['String'];
}>;

export type DeleteComponentMutation = {
  readonly __typename?: 'Mutation';
  readonly deleteComponent: boolean;
};

export type DirectionalFragment = {
  readonly __typename?: 'DirectionalSchema';
  readonly top?: string | null;
  readonly bottom?: string | null;
  readonly left?: string | null;
  readonly right?: string | null;
};

export type StyleFragment = {
  readonly __typename?: 'StyleSchema';
  readonly margin: {
    readonly __typename?: 'DirectionalSchema';
    readonly top?: string | null;
    readonly bottom?: string | null;
    readonly left?: string | null;
    readonly right?: string | null;
  };
  readonly padding: {
    readonly __typename?: 'DirectionalSchema';
    readonly top?: string | null;
    readonly bottom?: string | null;
    readonly left?: string | null;
    readonly right?: string | null;
  };
  readonly borderRadius: {
    readonly __typename?: 'DirectionalSchema';
    readonly top?: string | null;
    readonly bottom?: string | null;
    readonly left?: string | null;
    readonly right?: string | null;
  };
};

export type GetFlatElementListQueryVariables = Exact<{
  siteId: Scalars['String'];
  pageId: Scalars['String'];
}>;

export type GetFlatElementListQuery = {
  readonly __typename?: 'Query';
  readonly flatElementList: ReadonlyArray<
    | {
        readonly __typename: 'BoxElementSchema';
        readonly id: string;
        readonly isRoot?: boolean | null;
        readonly htmlType: HtmlType;
        readonly style?: {
          readonly __typename?: 'StyleSchema';
          readonly margin: {
            readonly __typename?: 'DirectionalSchema';
            readonly top?: string | null;
            readonly bottom?: string | null;
            readonly left?: string | null;
            readonly right?: string | null;
          };
          readonly padding: {
            readonly __typename?: 'DirectionalSchema';
            readonly top?: string | null;
            readonly bottom?: string | null;
            readonly left?: string | null;
            readonly right?: string | null;
          };
          readonly borderRadius: {
            readonly __typename?: 'DirectionalSchema';
            readonly top?: string | null;
            readonly bottom?: string | null;
            readonly left?: string | null;
            readonly right?: string | null;
          };
        } | null;
      }
    | {
        readonly __typename: 'TextElementSchema';
        readonly text: string;
        readonly id: string;
        readonly style?: {
          readonly __typename?: 'StyleSchema';
          readonly margin: {
            readonly __typename?: 'DirectionalSchema';
            readonly top?: string | null;
            readonly bottom?: string | null;
            readonly left?: string | null;
            readonly right?: string | null;
          };
          readonly padding: {
            readonly __typename?: 'DirectionalSchema';
            readonly top?: string | null;
            readonly bottom?: string | null;
            readonly left?: string | null;
            readonly right?: string | null;
          };
          readonly borderRadius: {
            readonly __typename?: 'DirectionalSchema';
            readonly top?: string | null;
            readonly bottom?: string | null;
            readonly left?: string | null;
            readonly right?: string | null;
          };
        } | null;
      }
  >;
};

export type CreateBoxMutationVariables = Exact<{
  ctx: PageContextInput;
  style?: InputMaybe<StyleInput>;
  parent: Scalars['String'];
  htmlType?: InputMaybe<HtmlType>;
}>;

export type CreateBoxMutation = {
  readonly __typename?: 'Mutation';
  readonly createBox: string;
};

export type UpdateBoxMutationVariables = Exact<{
  elementId: Scalars['String'];
  ctx: PageContextInput;
  style?: InputMaybe<StyleInput>;
  parent: Scalars['String'];
}>;

export type UpdateBoxMutation = {
  readonly __typename?: 'Mutation';
  readonly updateBox: boolean;
};

export type CreateTextMutationVariables = Exact<{
  ctx: PageContextInput;
  style?: InputMaybe<StyleInput>;
  parent: Scalars['String'];
  text: Scalars['String'];
}>;

export type CreateTextMutation = {
  readonly __typename?: 'Mutation';
  readonly createText: string;
};

export type UpdateTextMutationVariables = Exact<{
  ctx: PageContextInput;
  style?: InputMaybe<StyleInput>;
  text?: InputMaybe<Scalars['String']>;
  parent: Scalars['String'];
  elementId: Scalars['String'];
}>;

export type UpdateTextMutation = {
  readonly __typename?: 'Mutation';
  readonly updateText: boolean;
};

export type GetOrgMembershipQueryVariables = Exact<{ [key: string]: never }>;

export type GetOrgMembershipQuery = {
  readonly __typename?: 'Query';
  readonly organizationMembership: {
    readonly __typename?: 'OrgMemberSchema';
    readonly profileImageUrl?: string | null;
    readonly status: OrgMemberStatus;
    readonly role: OrgMemberRole;
  };
};

export type GetOrgsMembershipListQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetOrgsMembershipListQuery = {
  readonly __typename?: 'Query';
  readonly organizations: ReadonlyArray<{
    readonly __typename?: 'OrganizationSchema';
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly logoUrl?: string | null;
  }>;
};

export type GetCurrentOrganizationQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetCurrentOrganizationQuery = {
  readonly __typename?: 'Query';
  readonly organization: ReadonlyArray<{
    readonly __typename?: 'OrganizationSchema';
    readonly name: string;
    readonly logoUrl?: string | null;
    readonly plan: OrganizationPlan;
    readonly slug: string;
  }>;
};

export type FindOrganizationBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;

export type FindOrganizationBySlugQuery = {
  readonly __typename?: 'Query';
  readonly organizationBySlug: {
    readonly __typename?: 'OrganizationBySlugResponse';
    readonly id: string;
    readonly name: string;
  };
};

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  plan: OrganizationPlan;
}>;

export type CreateOrganizationMutation = {
  readonly __typename?: 'Mutation';
  readonly createOrganization: {
    readonly __typename?: 'OrganizationSchema';
    readonly id: string;
    readonly slug: string;
    readonly name: string;
    readonly plan: OrganizationPlan;
  };
};

export type ArchiveOrganizationMutationVariables = Exact<{
  orgId: Scalars['String'];
}>;

export type ArchiveOrganizationMutation = {
  readonly __typename?: 'Mutation';
  readonly archiveOrganization: string;
};

export type RestoreOrganizationMutationVariables = Exact<{
  orgId: Scalars['String'];
}>;

export type RestoreOrganizationMutation = {
  readonly __typename?: 'Mutation';
  readonly restoreOrganization: string;
};

export type GetPageListQueryVariables = Exact<{
  siteId: Scalars['String'];
}>;

export type GetPageListQuery = {
  readonly __typename?: 'Query';
  readonly pageList: ReadonlyArray<{
    readonly __typename?: 'PageSchema';
    readonly id: string;
    readonly title: string;
    readonly status: EditStatus;
  }>;
};

export type GetPageQueryVariables = Exact<{
  siteId: Scalars['String'];
  pageId: Scalars['String'];
}>;

export type GetPageQuery = {
  readonly __typename?: 'Query';
  readonly page: {
    readonly __typename?: 'PageSchema';
    readonly id: string;
    readonly title: string;
    readonly status: EditStatus;
    readonly isLoneTitle?: boolean | null;
    readonly description?: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly createdBy: string;
    readonly updatedBy: string;
  };
};

export type CreatePageMutationVariables = Exact<{
  siteId: Scalars['String'];
  prop: CreatePageInput;
}>;

export type CreatePageMutation = {
  readonly __typename?: 'Mutation';
  readonly createPage: {
    readonly __typename?: 'PageUpdatedResponse';
    readonly id: string;
    readonly status: EditStatus;
  };
};

export type UpdatePageMutationVariables = Exact<{
  siteId: Scalars['String'];
  pageId: Scalars['String'];
  input: UpdatePageInput;
}>;

export type UpdatePageMutation = {
  readonly __typename?: 'Mutation';
  readonly updatePage: {
    readonly __typename?: 'PageUpdatedResponse';
    readonly status: EditStatus;
  };
};

export type DeletePageMutationVariables = Exact<{
  siteId: Scalars['String'];
  pageId: Scalars['String'];
}>;

export type DeletePageMutation = {
  readonly __typename?: 'Mutation';
  readonly deletePage: {
    readonly __typename?: 'PageUpdatedResponse';
    readonly status: EditStatus;
  };
};

export type GetFirstPageMutationVariables = Exact<{
  siteId: Scalars['String'];
}>;

export type GetFirstPageMutation = {
  readonly __typename?: 'Mutation';
  readonly getOrCreateFirstPage: {
    readonly __typename?: 'PageSchema';
    readonly id: string;
  };
};

export type SessionQueryVariables = Exact<{ [key: string]: never }>;

export type SessionQuery = {
  readonly __typename?: 'Query';
  readonly session: {
    readonly __typename?: 'SessionResponse';
    readonly id: string;
  };
};

export type GetAccessTokenQueryVariables = Exact<{
  organization?: InputMaybe<Scalars['String']>;
}>;

export type GetAccessTokenQuery = {
  readonly __typename?: 'Query';
  readonly accessToken: {
    readonly __typename?: 'TokenResponse';
    readonly value: string;
    readonly expiresAt: Date;
  };
};

export type GetSitesQueryVariables = Exact<{ [key: string]: never }>;

export type GetSitesQuery = {
  readonly __typename?: 'Query';
  readonly siteList: ReadonlyArray<{
    readonly __typename?: 'SiteSchema';
    readonly id: string;
    readonly name: string;
    readonly status: SiteStatus;
  }>;
};

export type GetSiteQueryVariables = Exact<{
  siteId: Scalars['String'];
}>;

export type GetSiteQuery = {
  readonly __typename?: 'Query';
  readonly site: {
    readonly __typename?: 'SiteSchema';
    readonly id: string;
    readonly name: string;
    readonly updatedAt: Date;
  };
};

export type CreateSiteMutationVariables = Exact<{
  name: Scalars['String'];
}>;

export type CreateSiteMutation = {
  readonly __typename?: 'Mutation';
  readonly createSite: {
    readonly __typename?: 'SiteUpdatedResponse';
    readonly id: string;
  };
};

export type UpdateSiteMutationVariables = Exact<{
  siteId: Scalars['String'];
  name: Scalars['String'];
}>;

export type UpdateSiteMutation = {
  readonly __typename?: 'Mutation';
  readonly updateSite: {
    readonly __typename?: 'SiteUpdatedResponse';
    readonly id: string;
    readonly status: SiteStatus;
  };
};

export type SendVerificationMutationVariables = Exact<{
  channel: VerificationChannel;
  destination: Scalars['String'];
}>;

export type SendVerificationMutation = {
  readonly __typename?: 'Mutation';
  readonly sendVerificationCode: string;
};

export type ValidateVerificationCodeQueryVariables = Exact<{
  verificationId: Scalars['String'];
  verificationCode: Scalars['String'];
}>;

export type ValidateVerificationCodeQuery = {
  readonly __typename?: 'Query';
  readonly validateVerificationCode: boolean;
};

export const DirectionalFragmentDoc = gql`
  fragment Directional on DirectionalSchema {
    top
    bottom
    left
    right
  }
`;
export const StyleFragmentDoc = gql`
  fragment Style on StyleSchema {
    margin {
      ...Directional
    }
    padding {
      ...Directional
    }
    borderRadius {
      ...Directional
    }
  }
  ${DirectionalFragmentDoc}
`;
export const RegisterDocument = gql`
  mutation register(
    $email: String!
    $phone: String
    $firstName: String
    $lastName: String
    $displayName: String
  ) {
    registerAccount(
      input: {
        email: $email
        phone: $phone
        firstName: $firstName
        lastName: $lastName
        displayName: $displayName
      }
    ) {
      accessToken {
        value
        expiresAt
      }
    }
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

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
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

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
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const LoginWithVerificationDocument = gql`
  mutation loginWithVerification(
    $username: String!
    $verificationId: String!
    $verificationCode: String!
  ) {
    loginWithVerification(
      input: {
        username: $username
        verificationId: $verificationId
        verificationCode: $verificationCode
      }
    ) {
      accessToken {
        value
        expiresAt
      }
    }
  }
`;
export type LoginWithVerificationMutationFn = Apollo.MutationFunction<
  LoginWithVerificationMutation,
  LoginWithVerificationMutationVariables
>;

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
export function useLoginWithVerificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginWithVerificationMutation,
    LoginWithVerificationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LoginWithVerificationMutation,
    LoginWithVerificationMutationVariables
  >(LoginWithVerificationDocument, options);
}
export type LoginWithVerificationMutationHookResult = ReturnType<
  typeof useLoginWithVerificationMutation
>;
export type LoginWithVerificationMutationResult =
  Apollo.MutationResult<LoginWithVerificationMutation>;
export type LoginWithVerificationMutationOptions = Apollo.BaseMutationOptions<
  LoginWithVerificationMutation,
  LoginWithVerificationMutationVariables
>;
export const AddEmailDocument = gql`
  mutation addEmail($email: String!) {
    addEmailToAccount(email: $email)
  }
`;
export type AddEmailMutationFn = Apollo.MutationFunction<
  AddEmailMutation,
  AddEmailMutationVariables
>;

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
export function useAddEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddEmailMutation,
    AddEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddEmailMutation, AddEmailMutationVariables>(
    AddEmailDocument,
    options,
  );
}
export type AddEmailMutationHookResult = ReturnType<typeof useAddEmailMutation>;
export type AddEmailMutationResult = Apollo.MutationResult<AddEmailMutation>;
export type AddEmailMutationOptions = Apollo.BaseMutationOptions<
  AddEmailMutation,
  AddEmailMutationVariables
>;
export const RemoveEmailDocument = gql`
  mutation removeEmail($email: String!) {
    removeEmailFromAccount(email: $email)
  }
`;
export type RemoveEmailMutationFn = Apollo.MutationFunction<
  RemoveEmailMutation,
  RemoveEmailMutationVariables
>;

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
export function useRemoveEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveEmailMutation,
    RemoveEmailMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveEmailMutation, RemoveEmailMutationVariables>(
    RemoveEmailDocument,
    options,
  );
}
export type RemoveEmailMutationHookResult = ReturnType<
  typeof useRemoveEmailMutation
>;
export type RemoveEmailMutationResult =
  Apollo.MutationResult<RemoveEmailMutation>;
export type RemoveEmailMutationOptions = Apollo.BaseMutationOptions<
  RemoveEmailMutation,
  RemoveEmailMutationVariables
>;
export const AddPhoneDocument = gql`
  mutation addPhone($phone: String!) {
    addPhoneToAccount(phone: $phone)
  }
`;
export type AddPhoneMutationFn = Apollo.MutationFunction<
  AddPhoneMutation,
  AddPhoneMutationVariables
>;

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
export function useAddPhoneMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddPhoneMutation,
    AddPhoneMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddPhoneMutation, AddPhoneMutationVariables>(
    AddPhoneDocument,
    options,
  );
}
export type AddPhoneMutationHookResult = ReturnType<typeof useAddPhoneMutation>;
export type AddPhoneMutationResult = Apollo.MutationResult<AddPhoneMutation>;
export type AddPhoneMutationOptions = Apollo.BaseMutationOptions<
  AddPhoneMutation,
  AddPhoneMutationVariables
>;
export const RemovePhoneDocument = gql`
  mutation removePhone($phone: String!) {
    removePhoneFromAccount(phone: $phone)
  }
`;
export type RemovePhoneMutationFn = Apollo.MutationFunction<
  RemovePhoneMutation,
  RemovePhoneMutationVariables
>;

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
export function useRemovePhoneMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemovePhoneMutation,
    RemovePhoneMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemovePhoneMutation, RemovePhoneMutationVariables>(
    RemovePhoneDocument,
    options,
  );
}
export type RemovePhoneMutationHookResult = ReturnType<
  typeof useRemovePhoneMutation
>;
export type RemovePhoneMutationResult =
  Apollo.MutationResult<RemovePhoneMutation>;
export type RemovePhoneMutationOptions = Apollo.BaseMutationOptions<
  RemovePhoneMutation,
  RemovePhoneMutationVariables
>;
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
export function useGetAccountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAccountQuery,
    GetAccountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAccountQuery, GetAccountQueryVariables>(
    GetAccountDocument,
    options,
  );
}
export function useGetAccountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAccountQuery,
    GetAccountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAccountQuery, GetAccountQueryVariables>(
    GetAccountDocument,
    options,
  );
}
export type GetAccountQueryHookResult = ReturnType<typeof useGetAccountQuery>;
export type GetAccountLazyQueryHookResult = ReturnType<
  typeof useGetAccountLazyQuery
>;
export type GetAccountQueryResult = Apollo.QueryResult<
  GetAccountQuery,
  GetAccountQueryVariables
>;
export function refetchGetAccountQuery(variables?: GetAccountQueryVariables) {
  return { query: GetAccountDocument, variables: variables };
}
export const GetComponentDocument = gql`
  query getComponent($componentId: String!) {
    component(id: $componentId) {
      id
      name
      status
      updatedBy
      thumbnailUrl
      updatedAt
    }
  }
`;

/**
 * __useGetComponentQuery__
 *
 * To run a query within a React component, call `useGetComponentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentQuery({
 *   variables: {
 *      componentId: // value for 'componentId'
 *   },
 * });
 */
export function useGetComponentQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetComponentQuery,
    GetComponentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetComponentQuery, GetComponentQueryVariables>(
    GetComponentDocument,
    options,
  );
}
export function useGetComponentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetComponentQuery,
    GetComponentQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetComponentQuery, GetComponentQueryVariables>(
    GetComponentDocument,
    options,
  );
}
export type GetComponentQueryHookResult = ReturnType<
  typeof useGetComponentQuery
>;
export type GetComponentLazyQueryHookResult = ReturnType<
  typeof useGetComponentLazyQuery
>;
export type GetComponentQueryResult = Apollo.QueryResult<
  GetComponentQuery,
  GetComponentQueryVariables
>;
export function refetchGetComponentQuery(
  variables: GetComponentQueryVariables,
) {
  return { query: GetComponentDocument, variables: variables };
}
export const GetComponentListDocument = gql`
  query getComponentList {
    componentList {
      id
      name
      thumbnailUrl
    }
  }
`;

/**
 * __useGetComponentListQuery__
 *
 * To run a query within a React component, call `useGetComponentListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetComponentListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetComponentListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetComponentListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetComponentListQuery,
    GetComponentListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetComponentListQuery, GetComponentListQueryVariables>(
    GetComponentListDocument,
    options,
  );
}
export function useGetComponentListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetComponentListQuery,
    GetComponentListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetComponentListQuery,
    GetComponentListQueryVariables
  >(GetComponentListDocument, options);
}
export type GetComponentListQueryHookResult = ReturnType<
  typeof useGetComponentListQuery
>;
export type GetComponentListLazyQueryHookResult = ReturnType<
  typeof useGetComponentListLazyQuery
>;
export type GetComponentListQueryResult = Apollo.QueryResult<
  GetComponentListQuery,
  GetComponentListQueryVariables
>;
export function refetchGetComponentListQuery(
  variables?: GetComponentListQueryVariables,
) {
  return { query: GetComponentListDocument, variables: variables };
}
export const CreateComponentDocument = gql`
  mutation createComponent($input: CreateComponentInput!) {
    createComponent(input: $input) {
      id
    }
  }
`;
export type CreateComponentMutationFn = Apollo.MutationFunction<
  CreateComponentMutation,
  CreateComponentMutationVariables
>;

/**
 * __useCreateComponentMutation__
 *
 * To run a mutation, you first call `useCreateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createComponentMutation, { data, loading, error }] = useCreateComponentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateComponentMutation,
    CreateComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateComponentMutation,
    CreateComponentMutationVariables
  >(CreateComponentDocument, options);
}
export type CreateComponentMutationHookResult = ReturnType<
  typeof useCreateComponentMutation
>;
export type CreateComponentMutationResult =
  Apollo.MutationResult<CreateComponentMutation>;
export type CreateComponentMutationOptions = Apollo.BaseMutationOptions<
  CreateComponentMutation,
  CreateComponentMutationVariables
>;
export const UpdateComponentDocument = gql`
  mutation updateComponent(
    $componentId: String!
    $input: UpdateComponentInput!
  ) {
    updateComponent(id: $componentId, input: $input)
  }
`;
export type UpdateComponentMutationFn = Apollo.MutationFunction<
  UpdateComponentMutation,
  UpdateComponentMutationVariables
>;

/**
 * __useUpdateComponentMutation__
 *
 * To run a mutation, you first call `useUpdateComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateComponentMutation, { data, loading, error }] = useUpdateComponentMutation({
 *   variables: {
 *      componentId: // value for 'componentId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateComponentMutation,
    UpdateComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateComponentMutation,
    UpdateComponentMutationVariables
  >(UpdateComponentDocument, options);
}
export type UpdateComponentMutationHookResult = ReturnType<
  typeof useUpdateComponentMutation
>;
export type UpdateComponentMutationResult =
  Apollo.MutationResult<UpdateComponentMutation>;
export type UpdateComponentMutationOptions = Apollo.BaseMutationOptions<
  UpdateComponentMutation,
  UpdateComponentMutationVariables
>;
export const ArchiveComponentDocument = gql`
  mutation archiveComponent($componentId: String!) {
    archiveComponent(id: $componentId)
  }
`;
export type ArchiveComponentMutationFn = Apollo.MutationFunction<
  ArchiveComponentMutation,
  ArchiveComponentMutationVariables
>;

/**
 * __useArchiveComponentMutation__
 *
 * To run a mutation, you first call `useArchiveComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useArchiveComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [archiveComponentMutation, { data, loading, error }] = useArchiveComponentMutation({
 *   variables: {
 *      componentId: // value for 'componentId'
 *   },
 * });
 */
export function useArchiveComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ArchiveComponentMutation,
    ArchiveComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ArchiveComponentMutation,
    ArchiveComponentMutationVariables
  >(ArchiveComponentDocument, options);
}
export type ArchiveComponentMutationHookResult = ReturnType<
  typeof useArchiveComponentMutation
>;
export type ArchiveComponentMutationResult =
  Apollo.MutationResult<ArchiveComponentMutation>;
export type ArchiveComponentMutationOptions = Apollo.BaseMutationOptions<
  ArchiveComponentMutation,
  ArchiveComponentMutationVariables
>;
export const DeleteComponentDocument = gql`
  mutation deleteComponent($componentId: String!) {
    deleteComponent(id: $componentId)
  }
`;
export type DeleteComponentMutationFn = Apollo.MutationFunction<
  DeleteComponentMutation,
  DeleteComponentMutationVariables
>;

/**
 * __useDeleteComponentMutation__
 *
 * To run a mutation, you first call `useDeleteComponentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteComponentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteComponentMutation, { data, loading, error }] = useDeleteComponentMutation({
 *   variables: {
 *      componentId: // value for 'componentId'
 *   },
 * });
 */
export function useDeleteComponentMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteComponentMutation,
    DeleteComponentMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteComponentMutation,
    DeleteComponentMutationVariables
  >(DeleteComponentDocument, options);
}
export type DeleteComponentMutationHookResult = ReturnType<
  typeof useDeleteComponentMutation
>;
export type DeleteComponentMutationResult =
  Apollo.MutationResult<DeleteComponentMutation>;
export type DeleteComponentMutationOptions = Apollo.BaseMutationOptions<
  DeleteComponentMutation,
  DeleteComponentMutationVariables
>;
export const GetFlatElementListDocument = gql`
  query getFlatElementList($siteId: String!, $pageId: String!) {
    flatElementList(filter: { pageId: $pageId, siteId: $siteId }) {
      __typename
      ... on BoxElementSchema {
        id
        isRoot
        htmlType
        style {
          ...Style
        }
      }
      ... on TextElementSchema {
        text
        id
        style {
          ...Style
        }
      }
    }
  }
  ${StyleFragmentDoc}
`;

/**
 * __useGetFlatElementListQuery__
 *
 * To run a query within a React component, call `useGetFlatElementListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFlatElementListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFlatElementListQuery({
 *   variables: {
 *      siteId: // value for 'siteId'
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useGetFlatElementListQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetFlatElementListQuery,
    GetFlatElementListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetFlatElementListQuery,
    GetFlatElementListQueryVariables
  >(GetFlatElementListDocument, options);
}
export function useGetFlatElementListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFlatElementListQuery,
    GetFlatElementListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetFlatElementListQuery,
    GetFlatElementListQueryVariables
  >(GetFlatElementListDocument, options);
}
export type GetFlatElementListQueryHookResult = ReturnType<
  typeof useGetFlatElementListQuery
>;
export type GetFlatElementListLazyQueryHookResult = ReturnType<
  typeof useGetFlatElementListLazyQuery
>;
export type GetFlatElementListQueryResult = Apollo.QueryResult<
  GetFlatElementListQuery,
  GetFlatElementListQueryVariables
>;
export function refetchGetFlatElementListQuery(
  variables: GetFlatElementListQueryVariables,
) {
  return { query: GetFlatElementListDocument, variables: variables };
}
export const CreateBoxDocument = gql`
  mutation createBox(
    $ctx: PageContextInput!
    $style: StyleInput
    $parent: String!
    $htmlType: HTMLType
  ) {
    createBox(
      input: { parent: $parent, ctx: $ctx, style: $style, htmlType: $htmlType }
    )
  }
`;
export type CreateBoxMutationFn = Apollo.MutationFunction<
  CreateBoxMutation,
  CreateBoxMutationVariables
>;

/**
 * __useCreateBoxMutation__
 *
 * To run a mutation, you first call `useCreateBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoxMutation, { data, loading, error }] = useCreateBoxMutation({
 *   variables: {
 *      ctx: // value for 'ctx'
 *      style: // value for 'style'
 *      parent: // value for 'parent'
 *      htmlType: // value for 'htmlType'
 *   },
 * });
 */
export function useCreateBoxMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBoxMutation,
    CreateBoxMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateBoxMutation, CreateBoxMutationVariables>(
    CreateBoxDocument,
    options,
  );
}
export type CreateBoxMutationHookResult = ReturnType<
  typeof useCreateBoxMutation
>;
export type CreateBoxMutationResult = Apollo.MutationResult<CreateBoxMutation>;
export type CreateBoxMutationOptions = Apollo.BaseMutationOptions<
  CreateBoxMutation,
  CreateBoxMutationVariables
>;
export const UpdateBoxDocument = gql`
  mutation updateBox(
    $elementId: String!
    $ctx: PageContextInput!
    $style: StyleInput
    $parent: String!
  ) {
    updateBox(
      input: {
        elementId: $elementId
        parent: $parent
        ctx: $ctx
        style: $style
      }
    )
  }
`;
export type UpdateBoxMutationFn = Apollo.MutationFunction<
  UpdateBoxMutation,
  UpdateBoxMutationVariables
>;

/**
 * __useUpdateBoxMutation__
 *
 * To run a mutation, you first call `useUpdateBoxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBoxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBoxMutation, { data, loading, error }] = useUpdateBoxMutation({
 *   variables: {
 *      elementId: // value for 'elementId'
 *      ctx: // value for 'ctx'
 *      style: // value for 'style'
 *      parent: // value for 'parent'
 *   },
 * });
 */
export function useUpdateBoxMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateBoxMutation,
    UpdateBoxMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateBoxMutation, UpdateBoxMutationVariables>(
    UpdateBoxDocument,
    options,
  );
}
export type UpdateBoxMutationHookResult = ReturnType<
  typeof useUpdateBoxMutation
>;
export type UpdateBoxMutationResult = Apollo.MutationResult<UpdateBoxMutation>;
export type UpdateBoxMutationOptions = Apollo.BaseMutationOptions<
  UpdateBoxMutation,
  UpdateBoxMutationVariables
>;
export const CreateTextDocument = gql`
  mutation createText(
    $ctx: PageContextInput!
    $style: StyleInput
    $parent: String!
    $text: String!
  ) {
    createText(
      input: { text: $text, parent: $parent, ctx: $ctx, style: $style }
    )
  }
`;
export type CreateTextMutationFn = Apollo.MutationFunction<
  CreateTextMutation,
  CreateTextMutationVariables
>;

/**
 * __useCreateTextMutation__
 *
 * To run a mutation, you first call `useCreateTextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTextMutation, { data, loading, error }] = useCreateTextMutation({
 *   variables: {
 *      ctx: // value for 'ctx'
 *      style: // value for 'style'
 *      parent: // value for 'parent'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useCreateTextMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateTextMutation,
    CreateTextMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateTextMutation, CreateTextMutationVariables>(
    CreateTextDocument,
    options,
  );
}
export type CreateTextMutationHookResult = ReturnType<
  typeof useCreateTextMutation
>;
export type CreateTextMutationResult =
  Apollo.MutationResult<CreateTextMutation>;
export type CreateTextMutationOptions = Apollo.BaseMutationOptions<
  CreateTextMutation,
  CreateTextMutationVariables
>;
export const UpdateTextDocument = gql`
  mutation updateText(
    $ctx: PageContextInput!
    $style: StyleInput
    $text: String
    $parent: String!
    $elementId: String!
  ) {
    updateText(
      input: {
        text: $text
        style: $style
        ctx: $ctx
        elementId: $elementId
        parent: $parent
      }
    )
  }
`;
export type UpdateTextMutationFn = Apollo.MutationFunction<
  UpdateTextMutation,
  UpdateTextMutationVariables
>;

/**
 * __useUpdateTextMutation__
 *
 * To run a mutation, you first call `useUpdateTextMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTextMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTextMutation, { data, loading, error }] = useUpdateTextMutation({
 *   variables: {
 *      ctx: // value for 'ctx'
 *      style: // value for 'style'
 *      text: // value for 'text'
 *      parent: // value for 'parent'
 *      elementId: // value for 'elementId'
 *   },
 * });
 */
export function useUpdateTextMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateTextMutation,
    UpdateTextMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateTextMutation, UpdateTextMutationVariables>(
    UpdateTextDocument,
    options,
  );
}
export type UpdateTextMutationHookResult = ReturnType<
  typeof useUpdateTextMutation
>;
export type UpdateTextMutationResult =
  Apollo.MutationResult<UpdateTextMutation>;
export type UpdateTextMutationOptions = Apollo.BaseMutationOptions<
  UpdateTextMutation,
  UpdateTextMutationVariables
>;
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
export function useGetOrgMembershipQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetOrgMembershipQuery,
    GetOrgMembershipQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOrgMembershipQuery, GetOrgMembershipQueryVariables>(
    GetOrgMembershipDocument,
    options,
  );
}
export function useGetOrgMembershipLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOrgMembershipQuery,
    GetOrgMembershipQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetOrgMembershipQuery,
    GetOrgMembershipQueryVariables
  >(GetOrgMembershipDocument, options);
}
export type GetOrgMembershipQueryHookResult = ReturnType<
  typeof useGetOrgMembershipQuery
>;
export type GetOrgMembershipLazyQueryHookResult = ReturnType<
  typeof useGetOrgMembershipLazyQuery
>;
export type GetOrgMembershipQueryResult = Apollo.QueryResult<
  GetOrgMembershipQuery,
  GetOrgMembershipQueryVariables
>;
export function refetchGetOrgMembershipQuery(
  variables?: GetOrgMembershipQueryVariables,
) {
  return { query: GetOrgMembershipDocument, variables: variables };
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
export function useGetOrgsMembershipListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetOrgsMembershipListQuery,
    GetOrgsMembershipListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetOrgsMembershipListQuery,
    GetOrgsMembershipListQueryVariables
  >(GetOrgsMembershipListDocument, options);
}
export function useGetOrgsMembershipListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetOrgsMembershipListQuery,
    GetOrgsMembershipListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetOrgsMembershipListQuery,
    GetOrgsMembershipListQueryVariables
  >(GetOrgsMembershipListDocument, options);
}
export type GetOrgsMembershipListQueryHookResult = ReturnType<
  typeof useGetOrgsMembershipListQuery
>;
export type GetOrgsMembershipListLazyQueryHookResult = ReturnType<
  typeof useGetOrgsMembershipListLazyQuery
>;
export type GetOrgsMembershipListQueryResult = Apollo.QueryResult<
  GetOrgsMembershipListQuery,
  GetOrgsMembershipListQueryVariables
>;
export function refetchGetOrgsMembershipListQuery(
  variables?: GetOrgsMembershipListQueryVariables,
) {
  return { query: GetOrgsMembershipListDocument, variables: variables };
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
export function useGetCurrentOrganizationQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentOrganizationQuery,
    GetCurrentOrganizationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCurrentOrganizationQuery,
    GetCurrentOrganizationQueryVariables
  >(GetCurrentOrganizationDocument, options);
}
export function useGetCurrentOrganizationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentOrganizationQuery,
    GetCurrentOrganizationQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCurrentOrganizationQuery,
    GetCurrentOrganizationQueryVariables
  >(GetCurrentOrganizationDocument, options);
}
export type GetCurrentOrganizationQueryHookResult = ReturnType<
  typeof useGetCurrentOrganizationQuery
>;
export type GetCurrentOrganizationLazyQueryHookResult = ReturnType<
  typeof useGetCurrentOrganizationLazyQuery
>;
export type GetCurrentOrganizationQueryResult = Apollo.QueryResult<
  GetCurrentOrganizationQuery,
  GetCurrentOrganizationQueryVariables
>;
export function refetchGetCurrentOrganizationQuery(
  variables?: GetCurrentOrganizationQueryVariables,
) {
  return { query: GetCurrentOrganizationDocument, variables: variables };
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
export function useFindOrganizationBySlugQuery(
  baseOptions: Apollo.QueryHookOptions<
    FindOrganizationBySlugQuery,
    FindOrganizationBySlugQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    FindOrganizationBySlugQuery,
    FindOrganizationBySlugQueryVariables
  >(FindOrganizationBySlugDocument, options);
}
export function useFindOrganizationBySlugLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FindOrganizationBySlugQuery,
    FindOrganizationBySlugQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    FindOrganizationBySlugQuery,
    FindOrganizationBySlugQueryVariables
  >(FindOrganizationBySlugDocument, options);
}
export type FindOrganizationBySlugQueryHookResult = ReturnType<
  typeof useFindOrganizationBySlugQuery
>;
export type FindOrganizationBySlugLazyQueryHookResult = ReturnType<
  typeof useFindOrganizationBySlugLazyQuery
>;
export type FindOrganizationBySlugQueryResult = Apollo.QueryResult<
  FindOrganizationBySlugQuery,
  FindOrganizationBySlugQueryVariables
>;
export function refetchFindOrganizationBySlugQuery(
  variables: FindOrganizationBySlugQueryVariables,
) {
  return { query: FindOrganizationBySlugDocument, variables: variables };
}
export const CreateOrganizationDocument = gql`
  mutation createOrganization($name: String!, $plan: OrganizationPlan!) {
    createOrganization(input: { name: $name, plan: $plan }) {
      id
      slug
      name
      plan
    }
  }
`;
export type CreateOrganizationMutationFn = Apollo.MutationFunction<
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables
>;

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
export function useCreateOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrganizationMutation,
    CreateOrganizationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateOrganizationMutation,
    CreateOrganizationMutationVariables
  >(CreateOrganizationDocument, options);
}
export type CreateOrganizationMutationHookResult = ReturnType<
  typeof useCreateOrganizationMutation
>;
export type CreateOrganizationMutationResult =
  Apollo.MutationResult<CreateOrganizationMutation>;
export type CreateOrganizationMutationOptions = Apollo.BaseMutationOptions<
  CreateOrganizationMutation,
  CreateOrganizationMutationVariables
>;
export const ArchiveOrganizationDocument = gql`
  mutation archiveOrganization($orgId: String!) {
    archiveOrganization(orgId: $orgId)
  }
`;
export type ArchiveOrganizationMutationFn = Apollo.MutationFunction<
  ArchiveOrganizationMutation,
  ArchiveOrganizationMutationVariables
>;

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
export function useArchiveOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ArchiveOrganizationMutation,
    ArchiveOrganizationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ArchiveOrganizationMutation,
    ArchiveOrganizationMutationVariables
  >(ArchiveOrganizationDocument, options);
}
export type ArchiveOrganizationMutationHookResult = ReturnType<
  typeof useArchiveOrganizationMutation
>;
export type ArchiveOrganizationMutationResult =
  Apollo.MutationResult<ArchiveOrganizationMutation>;
export type ArchiveOrganizationMutationOptions = Apollo.BaseMutationOptions<
  ArchiveOrganizationMutation,
  ArchiveOrganizationMutationVariables
>;
export const RestoreOrganizationDocument = gql`
  mutation restoreOrganization($orgId: String!) {
    restoreOrganization(orgId: $orgId)
  }
`;
export type RestoreOrganizationMutationFn = Apollo.MutationFunction<
  RestoreOrganizationMutation,
  RestoreOrganizationMutationVariables
>;

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
export function useRestoreOrganizationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RestoreOrganizationMutation,
    RestoreOrganizationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RestoreOrganizationMutation,
    RestoreOrganizationMutationVariables
  >(RestoreOrganizationDocument, options);
}
export type RestoreOrganizationMutationHookResult = ReturnType<
  typeof useRestoreOrganizationMutation
>;
export type RestoreOrganizationMutationResult =
  Apollo.MutationResult<RestoreOrganizationMutation>;
export type RestoreOrganizationMutationOptions = Apollo.BaseMutationOptions<
  RestoreOrganizationMutation,
  RestoreOrganizationMutationVariables
>;
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
export function useGetPageListQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetPageListQuery,
    GetPageListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPageListQuery, GetPageListQueryVariables>(
    GetPageListDocument,
    options,
  );
}
export function useGetPageListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageListQuery,
    GetPageListQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPageListQuery, GetPageListQueryVariables>(
    GetPageListDocument,
    options,
  );
}
export type GetPageListQueryHookResult = ReturnType<typeof useGetPageListQuery>;
export type GetPageListLazyQueryHookResult = ReturnType<
  typeof useGetPageListLazyQuery
>;
export type GetPageListQueryResult = Apollo.QueryResult<
  GetPageListQuery,
  GetPageListQueryVariables
>;
export function refetchGetPageListQuery(variables: GetPageListQueryVariables) {
  return { query: GetPageListDocument, variables: variables };
}
export const GetPageDocument = gql`
  query getPage($siteId: String!, $pageId: String!) {
    page(siteId: $siteId, id: $pageId) {
      id
      title
      status
      isLoneTitle
      description
      createdAt
      updatedAt
      createdBy
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
 *      siteId: // value for 'siteId'
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useGetPageQuery(
  baseOptions: Apollo.QueryHookOptions<GetPageQuery, GetPageQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageDocument,
    options,
  );
}
export function useGetPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPageQuery,
    GetPageQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetPageQuery, GetPageQueryVariables>(
    GetPageDocument,
    options,
  );
}
export type GetPageQueryHookResult = ReturnType<typeof useGetPageQuery>;
export type GetPageLazyQueryHookResult = ReturnType<typeof useGetPageLazyQuery>;
export type GetPageQueryResult = Apollo.QueryResult<
  GetPageQuery,
  GetPageQueryVariables
>;
export function refetchGetPageQuery(variables: GetPageQueryVariables) {
  return { query: GetPageDocument, variables: variables };
}
export const CreatePageDocument = gql`
  mutation createPage($siteId: String!, $prop: CreatePageInput!) {
    createPage(siteId: $siteId, input: $prop) {
      id
      status
    }
  }
`;
export type CreatePageMutationFn = Apollo.MutationFunction<
  CreatePageMutation,
  CreatePageMutationVariables
>;

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
export function useCreatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePageMutation,
    CreatePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePageMutation, CreatePageMutationVariables>(
    CreatePageDocument,
    options,
  );
}
export type CreatePageMutationHookResult = ReturnType<
  typeof useCreatePageMutation
>;
export type CreatePageMutationResult =
  Apollo.MutationResult<CreatePageMutation>;
export type CreatePageMutationOptions = Apollo.BaseMutationOptions<
  CreatePageMutation,
  CreatePageMutationVariables
>;
export const UpdatePageDocument = gql`
  mutation updatePage(
    $siteId: String!
    $pageId: String!
    $input: UpdatePageInput!
  ) {
    updatePage(siteId: $siteId, id: $pageId, input: $input) {
      status
    }
  }
`;
export type UpdatePageMutationFn = Apollo.MutationFunction<
  UpdatePageMutation,
  UpdatePageMutationVariables
>;

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
 *      siteId: // value for 'siteId'
 *      pageId: // value for 'pageId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePageMutation,
    UpdatePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePageMutation, UpdatePageMutationVariables>(
    UpdatePageDocument,
    options,
  );
}
export type UpdatePageMutationHookResult = ReturnType<
  typeof useUpdatePageMutation
>;
export type UpdatePageMutationResult =
  Apollo.MutationResult<UpdatePageMutation>;
export type UpdatePageMutationOptions = Apollo.BaseMutationOptions<
  UpdatePageMutation,
  UpdatePageMutationVariables
>;
export const DeletePageDocument = gql`
  mutation deletePage($siteId: String!, $pageId: String!) {
    deletePage(siteId: $siteId, id: $pageId) {
      status
    }
  }
`;
export type DeletePageMutationFn = Apollo.MutationFunction<
  DeletePageMutation,
  DeletePageMutationVariables
>;

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
 *      siteId: // value for 'siteId'
 *      pageId: // value for 'pageId'
 *   },
 * });
 */
export function useDeletePageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePageMutation,
    DeletePageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeletePageMutation, DeletePageMutationVariables>(
    DeletePageDocument,
    options,
  );
}
export type DeletePageMutationHookResult = ReturnType<
  typeof useDeletePageMutation
>;
export type DeletePageMutationResult =
  Apollo.MutationResult<DeletePageMutation>;
export type DeletePageMutationOptions = Apollo.BaseMutationOptions<
  DeletePageMutation,
  DeletePageMutationVariables
>;
export const GetFirstPageDocument = gql`
  mutation getFirstPage($siteId: String!) {
    getOrCreateFirstPage(siteId: $siteId) {
      id
    }
  }
`;
export type GetFirstPageMutationFn = Apollo.MutationFunction<
  GetFirstPageMutation,
  GetFirstPageMutationVariables
>;

/**
 * __useGetFirstPageMutation__
 *
 * To run a mutation, you first call `useGetFirstPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetFirstPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getFirstPageMutation, { data, loading, error }] = useGetFirstPageMutation({
 *   variables: {
 *      siteId: // value for 'siteId'
 *   },
 * });
 */
export function useGetFirstPageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GetFirstPageMutation,
    GetFirstPageMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GetFirstPageMutation,
    GetFirstPageMutationVariables
  >(GetFirstPageDocument, options);
}
export type GetFirstPageMutationHookResult = ReturnType<
  typeof useGetFirstPageMutation
>;
export type GetFirstPageMutationResult =
  Apollo.MutationResult<GetFirstPageMutation>;
export type GetFirstPageMutationOptions = Apollo.BaseMutationOptions<
  GetFirstPageMutation,
  GetFirstPageMutationVariables
>;
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
export function useSessionQuery(
  baseOptions?: Apollo.QueryHookOptions<SessionQuery, SessionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SessionQuery, SessionQueryVariables>(
    SessionDocument,
    options,
  );
}
export function useSessionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SessionQuery,
    SessionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SessionQuery, SessionQueryVariables>(
    SessionDocument,
    options,
  );
}
export type SessionQueryHookResult = ReturnType<typeof useSessionQuery>;
export type SessionLazyQueryHookResult = ReturnType<typeof useSessionLazyQuery>;
export type SessionQueryResult = Apollo.QueryResult<
  SessionQuery,
  SessionQueryVariables
>;
export function refetchSessionQuery(variables?: SessionQueryVariables) {
  return { query: SessionDocument, variables: variables };
}
export const GetAccessTokenDocument = gql`
  query getAccessToken($organization: String) {
    accessToken(query: { organization: $organization }) {
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
export function useGetAccessTokenQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAccessTokenQuery,
    GetAccessTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAccessTokenQuery, GetAccessTokenQueryVariables>(
    GetAccessTokenDocument,
    options,
  );
}
export function useGetAccessTokenLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAccessTokenQuery,
    GetAccessTokenQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAccessTokenQuery, GetAccessTokenQueryVariables>(
    GetAccessTokenDocument,
    options,
  );
}
export type GetAccessTokenQueryHookResult = ReturnType<
  typeof useGetAccessTokenQuery
>;
export type GetAccessTokenLazyQueryHookResult = ReturnType<
  typeof useGetAccessTokenLazyQuery
>;
export type GetAccessTokenQueryResult = Apollo.QueryResult<
  GetAccessTokenQuery,
  GetAccessTokenQueryVariables
>;
export function refetchGetAccessTokenQuery(
  variables?: GetAccessTokenQueryVariables,
) {
  return { query: GetAccessTokenDocument, variables: variables };
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
export function useGetSitesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetSitesQuery, GetSitesQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSitesQuery, GetSitesQueryVariables>(
    GetSitesDocument,
    options,
  );
}
export function useGetSitesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSitesQuery,
    GetSitesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSitesQuery, GetSitesQueryVariables>(
    GetSitesDocument,
    options,
  );
}
export type GetSitesQueryHookResult = ReturnType<typeof useGetSitesQuery>;
export type GetSitesLazyQueryHookResult = ReturnType<
  typeof useGetSitesLazyQuery
>;
export type GetSitesQueryResult = Apollo.QueryResult<
  GetSitesQuery,
  GetSitesQueryVariables
>;
export function refetchGetSitesQuery(variables?: GetSitesQueryVariables) {
  return { query: GetSitesDocument, variables: variables };
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
export function useGetSiteQuery(
  baseOptions: Apollo.QueryHookOptions<GetSiteQuery, GetSiteQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSiteQuery, GetSiteQueryVariables>(
    GetSiteDocument,
    options,
  );
}
export function useGetSiteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSiteQuery,
    GetSiteQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetSiteQuery, GetSiteQueryVariables>(
    GetSiteDocument,
    options,
  );
}
export type GetSiteQueryHookResult = ReturnType<typeof useGetSiteQuery>;
export type GetSiteLazyQueryHookResult = ReturnType<typeof useGetSiteLazyQuery>;
export type GetSiteQueryResult = Apollo.QueryResult<
  GetSiteQuery,
  GetSiteQueryVariables
>;
export function refetchGetSiteQuery(variables: GetSiteQueryVariables) {
  return { query: GetSiteDocument, variables: variables };
}
export const CreateSiteDocument = gql`
  mutation createSite($name: String!) {
    createSite(input: { name: $name }) {
      id
    }
  }
`;
export type CreateSiteMutationFn = Apollo.MutationFunction<
  CreateSiteMutation,
  CreateSiteMutationVariables
>;

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
export function useCreateSiteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSiteMutation,
    CreateSiteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateSiteMutation, CreateSiteMutationVariables>(
    CreateSiteDocument,
    options,
  );
}
export type CreateSiteMutationHookResult = ReturnType<
  typeof useCreateSiteMutation
>;
export type CreateSiteMutationResult =
  Apollo.MutationResult<CreateSiteMutation>;
export type CreateSiteMutationOptions = Apollo.BaseMutationOptions<
  CreateSiteMutation,
  CreateSiteMutationVariables
>;
export const UpdateSiteDocument = gql`
  mutation updateSite($siteId: String!, $name: String!) {
    updateSite(input: { name: $name }, id: $siteId) {
      id
      status
    }
  }
`;
export type UpdateSiteMutationFn = Apollo.MutationFunction<
  UpdateSiteMutation,
  UpdateSiteMutationVariables
>;

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
export function useUpdateSiteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSiteMutation,
    UpdateSiteMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(
    UpdateSiteDocument,
    options,
  );
}
export type UpdateSiteMutationHookResult = ReturnType<
  typeof useUpdateSiteMutation
>;
export type UpdateSiteMutationResult =
  Apollo.MutationResult<UpdateSiteMutation>;
export type UpdateSiteMutationOptions = Apollo.BaseMutationOptions<
  UpdateSiteMutation,
  UpdateSiteMutationVariables
>;
export const SendVerificationDocument = gql`
  mutation sendVerification(
    $channel: VerificationChannel!
    $destination: String!
  ) {
    sendVerificationCode(
      input: { channel: $channel, destination: $destination }
    )
  }
`;
export type SendVerificationMutationFn = Apollo.MutationFunction<
  SendVerificationMutation,
  SendVerificationMutationVariables
>;

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
export function useSendVerificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendVerificationMutation,
    SendVerificationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendVerificationMutation,
    SendVerificationMutationVariables
  >(SendVerificationDocument, options);
}
export type SendVerificationMutationHookResult = ReturnType<
  typeof useSendVerificationMutation
>;
export type SendVerificationMutationResult =
  Apollo.MutationResult<SendVerificationMutation>;
export type SendVerificationMutationOptions = Apollo.BaseMutationOptions<
  SendVerificationMutation,
  SendVerificationMutationVariables
>;
export const ValidateVerificationCodeDocument = gql`
  query validateVerificationCode(
    $verificationId: String!
    $verificationCode: String!
  ) {
    validateVerificationCode(
      input: {
        verificationId: $verificationId
        verificationCode: $verificationCode
      }
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
export function useValidateVerificationCodeQuery(
  baseOptions: Apollo.QueryHookOptions<
    ValidateVerificationCodeQuery,
    ValidateVerificationCodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ValidateVerificationCodeQuery,
    ValidateVerificationCodeQueryVariables
  >(ValidateVerificationCodeDocument, options);
}
export function useValidateVerificationCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ValidateVerificationCodeQuery,
    ValidateVerificationCodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ValidateVerificationCodeQuery,
    ValidateVerificationCodeQueryVariables
  >(ValidateVerificationCodeDocument, options);
}
export type ValidateVerificationCodeQueryHookResult = ReturnType<
  typeof useValidateVerificationCodeQuery
>;
export type ValidateVerificationCodeLazyQueryHookResult = ReturnType<
  typeof useValidateVerificationCodeLazyQuery
>;
export type ValidateVerificationCodeQueryResult = Apollo.QueryResult<
  ValidateVerificationCodeQuery,
  ValidateVerificationCodeQueryVariables
>;
export function refetchValidateVerificationCodeQuery(
  variables: ValidateVerificationCodeQueryVariables,
) {
  return { query: ValidateVerificationCodeDocument, variables: variables };
}
