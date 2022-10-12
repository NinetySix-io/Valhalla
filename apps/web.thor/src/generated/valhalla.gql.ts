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
  /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
  EmailAddress: any;
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: any;
  /** Integers that will have a value of 0 or more. */
  NonNegativeInt: any;
  /** A field whose value conforms with the standard mongodb object ID as described here: https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId. Example: 5e5677d71bdc2ae76344968c */
  ObjectID: any;
  /** A field whose value conforms to the standard E.164 format as specified in: https://en.wikipedia.org/wiki/E.164. Basically this is +17895551234. */
  PhoneNumber: any;
  /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
  URL: any;
  /** Represents NULL values */
  Void: any;
  _FieldSet: any;
};

export type Account = {
  readonly __typename?: 'Account';
  readonly createdAt: Scalars['DateTime'];
  readonly displayName: Scalars['String'];
  readonly emails: ReadonlyArray<AccountEmail>;
  readonly firstName: Scalars['String'];
  readonly id: Scalars['ObjectID'];
  readonly lastName: Scalars['String'];
  readonly phones: ReadonlyArray<AccountPhone>;
  readonly updatedAt: Scalars['DateTime'];
};

export type AccountEmail = {
  readonly __typename?: 'AccountEmail';
  readonly createdAt: Scalars['DateTime'];
  readonly isPrimary: Scalars['Boolean'];
  readonly isVerified: Scalars['Boolean'];
  readonly updatedAt: Scalars['DateTime'];
  readonly value: Scalars['EmailAddress'];
};

export type AccountPhone = {
  readonly __typename?: 'AccountPhone';
  readonly createdAt: Scalars['DateTime'];
  readonly isPrimary: Scalars['Boolean'];
  readonly isVerified: Scalars['Boolean'];
  readonly updatedAt: Scalars['DateTime'];
  readonly value: Scalars['PhoneNumber'];
};

export type AccountRegisterInput = {
  readonly displayName?: InputMaybe<Scalars['String']>;
  /** Email Address */
  readonly email: Scalars['EmailAddress'];
  readonly firstName?: InputMaybe<Scalars['String']>;
  readonly lastName?: InputMaybe<Scalars['String']>;
  /** Phone Number */
  readonly phone?: InputMaybe<Scalars['PhoneNumber']>;
};

export type AddTextElementInput = {
  readonly desktop: ElementAreaInput;
  readonly html: Scalars['String'];
  readonly json: Scalars['JSONObject'];
  readonly mobile?: InputMaybe<ElementAreaInput>;
  readonly tablet?: InputMaybe<ElementAreaInput>;
};

export type AuthResponse = {
  readonly __typename?: 'AuthResponse';
  /** Access token */
  readonly accessToken: TokenResponse;
  /** Logged in Account ID */
  readonly accountId: Scalars['String'];
};

export type CreateOrganizationInput = {
  readonly name: Scalars['String'];
  readonly plan?: InputMaybe<OrganizationPlan>;
};

export type CreatePageInput = {
  readonly title: Scalars['String'];
};

export type CreateSectionInput = {
  /** Position */
  readonly index?: InputMaybe<Scalars['NonNegativeInt']>;
};

export type CreateSiteInput = {
  readonly name: Scalars['String'];
};

export type ElementArea = {
  readonly __typename?: 'ElementArea';
  readonly height: Scalars['NonNegativeInt'];
  readonly isVisible: Scalars['NonNegativeInt'];
  readonly width: Scalars['NonNegativeInt'];
  readonly x: Scalars['NonNegativeInt'];
  readonly y: Scalars['NonNegativeInt'];
};

export type ElementAreaInput = {
  readonly height: Scalars['NonNegativeInt'];
  readonly isVisible: Scalars['NonNegativeInt'];
  readonly width: Scalars['NonNegativeInt'];
  readonly x: Scalars['NonNegativeInt'];
  readonly y: Scalars['NonNegativeInt'];
};

export type ElementText = {
  readonly __typename?: 'ElementText';
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly createdBy: Scalars['ObjectID'];
  readonly desktop: ElementArea;
  readonly group: Scalars['ObjectID'];
  readonly html: Scalars['String'];
  readonly id: Scalars['ObjectID'];
  readonly json: Scalars['JSONObject'];
  readonly mobile?: Maybe<ElementArea>;
  readonly tablet?: Maybe<ElementArea>;
  readonly type: ElementType;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
  readonly updatedBy: Scalars['ObjectID'];
};

export enum ElementType {
  TEXT = 'TEXT'
}

export type ElementUnion = ElementText;

export enum InvitationStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED'
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
  /** Add text element */
  readonly addTextElement: ElementText;
  /** Archive an organization */
  readonly archiveOrganization: Scalars['Void'];
  readonly cloneSection: PageSection;
  /** Create an organization */
  readonly createOrganization: OrgCreatedResponse;
  readonly createPage: PageUpdatedResponse;
  readonly createSection: PageSection;
  readonly createSite: SiteUpdatedResponse;
  readonly deleteManyElements: ReadonlyArray<ElementUnion>;
  readonly deletePage: PageUpdatedResponse;
  readonly deleteSection: PageSection;
  /** Login to account with verification code */
  readonly loginWithVerification: AuthResponse;
  /** Invalid current session */
  readonly logout: Scalars['Void'];
  /** Register user account */
  readonly registerAccount: AuthResponse;
  /** Remove associated email from account */
  readonly removeEmailFromAccount: Scalars['Boolean'];
  /** Remove associated phone from account */
  readonly removePhoneFromAccount: Scalars['Boolean'];
  /** Restore an organization that was archived */
  readonly restoreOrganization: Scalars['Void'];
  /** Send verification code to email */
  readonly sendVerificationCode: Scalars['String'];
  /** Update account */
  readonly updateAccount: Scalars['Boolean'];
  readonly updatePage: PageUpdatedResponse;
  readonly updateSectionFormat: PageSection;
  readonly updateSectionIndex: PageSection;
  readonly updateSite: SiteUpdatedResponse;
  /** Update text element */
  readonly updateTextElement: ElementText;
};


export type MutationAddEmailToAccountArgs = {
  email: Scalars['EmailAddress'];
};


export type MutationAddPhoneToAccountArgs = {
  phone: Scalars['PhoneNumber'];
};


export type MutationAddTextElementArgs = {
  groupId: Scalars['ObjectID'];
  input: AddTextElementInput;
};


export type MutationArchiveOrganizationArgs = {
  orgId: Scalars['ObjectID'];
};


export type MutationCloneSectionArgs = {
  pageId: Scalars['ObjectID'];
  sectionId: Scalars['ObjectID'];
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreatePageArgs = {
  input: CreatePageInput;
  siteId: Scalars['ObjectID'];
};


export type MutationCreateSectionArgs = {
  input?: InputMaybe<CreateSectionInput>;
  pageId: Scalars['ObjectID'];
};


export type MutationCreateSiteArgs = {
  input: CreateSiteInput;
};


export type MutationDeleteManyElementsArgs = {
  elementIds: ReadonlyArray<Scalars['ObjectID']>;
};


export type MutationDeletePageArgs = {
  pageId: Scalars['ObjectID'];
};


export type MutationDeleteSectionArgs = {
  pageId: Scalars['ObjectID'];
  sectionId: Scalars['ObjectID'];
};


export type MutationLoginWithVerificationArgs = {
  input: LoginWithVerificationInput;
};


export type MutationRegisterAccountArgs = {
  input: AccountRegisterInput;
};


export type MutationRemoveEmailFromAccountArgs = {
  emailId: Scalars['ObjectID'];
};


export type MutationRemovePhoneFromAccountArgs = {
  phoneId: Scalars['ObjectID'];
};


export type MutationRestoreOrganizationArgs = {
  orgId: Scalars['ObjectID'];
};


export type MutationSendVerificationCodeArgs = {
  channel: VerificationChannel;
  destination: Scalars['String'];
};


export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


export type MutationUpdatePageArgs = {
  input: UpdatePageInput;
  pageId: Scalars['ObjectID'];
};


export type MutationUpdateSectionFormatArgs = {
  input: UpdateSectionFormatInput;
  pageId: Scalars['ObjectID'];
  sectionId: Scalars['ObjectID'];
};


export type MutationUpdateSectionIndexArgs = {
  index: Scalars['NonNegativeInt'];
  pageId: Scalars['ObjectID'];
  sectionId: Scalars['ObjectID'];
};


export type MutationUpdateSiteArgs = {
  input: UpdateSiteInput;
  siteId: Scalars['ObjectID'];
};


export type MutationUpdateTextElementArgs = {
  elementId: Scalars['ObjectID'];
  input: UpdateTextElementInput;
};

export type OrgCreatedResponse = {
  readonly __typename?: 'OrgCreatedResponse';
  readonly id: Scalars['String'];
};

export type Organization = {
  readonly __typename?: 'Organization';
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly createdBy: Scalars['String'];
  readonly id: Scalars['String'];
  readonly logoUrl?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly plan: OrganizationPlan;
  readonly slug: Scalars['String'];
  readonly status: Scalars['String'];
  readonly updateBy: Scalars['String'];
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrganizationBySlugResponse = {
  readonly __typename?: 'OrganizationBySlugResponse';
  readonly id: Scalars['String'];
  readonly name: Scalars['String'];
};

export type OrganizationMember = {
  readonly __typename?: 'OrganizationMember';
  readonly createdAt?: Maybe<Scalars['DateTime']>;
  readonly id: Scalars['ObjectID'];
  readonly profileImageUrl?: Maybe<Scalars['URL']>;
  readonly role: OrganizationRole;
  readonly status: InvitationStatus;
  readonly updatedAt?: Maybe<Scalars['DateTime']>;
  readonly updatedBy: Scalars['ObjectID'];
  readonly user: Scalars['ObjectID'];
};

export enum OrganizationPlan {
  FREE = 'FREE'
}

export enum OrganizationRole {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  GUESS = 'GUESS',
  MEMBER = 'MEMBER',
  OWNER = 'OWNER'
}

export type Page = {
  readonly __typename?: 'Page';
  readonly createdAt: Scalars['DateTime'];
  readonly createdBy: Scalars['ObjectID'];
  readonly description?: Maybe<Scalars['String']>;
  readonly id: Scalars['ObjectID'];
  readonly isLoneTitle?: Maybe<Scalars['Boolean']>;
  readonly site: Scalars['ObjectID'];
  readonly slug: Scalars['String'];
  readonly status: Scalars['String'];
  readonly title: Scalars['String'];
  readonly updatedAt: Scalars['DateTime'];
  readonly updatedBy: Scalars['ObjectID'];
};

export type PageSection = {
  readonly __typename?: 'PageSection';
  readonly createdAt: Scalars['DateTime'];
  readonly createdBy: Scalars['ObjectID'];
  readonly format: PageSectionFormat;
  readonly id: Scalars['ObjectID'];
  readonly updatedAt: Scalars['DateTime'];
  readonly updatedBy: Scalars['ObjectID'];
};

export type PageSectionFormat = {
  readonly __typename?: 'PageSectionFormat';
  readonly columnGap: Scalars['NonNegativeInt'];
  readonly rowGap: Scalars['NonNegativeInt'];
  readonly rowsCount: Scalars['NonNegativeInt'];
};

export type PageUpdatedResponse = {
  readonly __typename?: 'PageUpdatedResponse';
  readonly id: Scalars['ObjectID'];
  readonly status: Scalars['String'];
};

export type Query = {
  readonly __typename?: 'Query';
  /** Generate an access token */
  readonly accessToken: TokenResponse;
  /** Get current logged in user information */
  readonly account: Account;
  readonly elementsByGroup: ReadonlyArray<ElementUnion>;
  /** Get current organization */
  readonly organizationByMembership: ReadonlyArray<Organization>;
  /** Find organization by slug */
  readonly organizationBySlug: OrganizationBySlugResponse;
  /** Get current organization membership */
  readonly organizationMembershipProfile: OrganizationMember;
  /** Get current user's organizations memberships */
  readonly organizationsByMemberships: ReadonlyArray<Organization>;
  readonly page: Page;
  readonly pagesBySite: ReadonlyArray<Page>;
  readonly section: PageSection;
  readonly sectionsByPage: ReadonlyArray<PageSection>;
  /** Get current session user */
  readonly session: SessionResponse;
  readonly site: Site;
  readonly siteByOwner: ReadonlyArray<Site>;
  /** Validate verification code */
  readonly validateVerificationCode: Scalars['Boolean'];
};


export type QueryAccessTokenArgs = {
  organizationId?: InputMaybe<Scalars['ObjectID']>;
};


export type QueryElementsByGroupArgs = {
  groupId: Scalars['ObjectID'];
};


export type QueryOrganizationBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryPageArgs = {
  pageId: Scalars['ObjectID'];
};


export type QueryPagesBySiteArgs = {
  siteId: Scalars['ObjectID'];
};


export type QuerySectionArgs = {
  sectionId: Scalars['ObjectID'];
};


export type QuerySectionsByPageArgs = {
  pageId: Scalars['ObjectID'];
};


export type QuerySiteArgs = {
  siteId: Scalars['ObjectID'];
};


export type QueryValidateVerificationCodeArgs = {
  verificationCode: Scalars['String'];
  verificationId: Scalars['String'];
};

export type SessionResponse = {
  readonly __typename?: 'SessionResponse';
  readonly displayName: Scalars['String'];
  readonly id: Scalars['ObjectID'];
};

export type Site = {
  readonly __typename?: 'Site';
  readonly createdAt: Scalars['DateTime'];
  readonly createdBy: Scalars['ObjectID'];
  readonly id: Scalars['ObjectID'];
  readonly name: Scalars['String'];
  readonly status: SiteStatus;
  readonly updatedAt: Scalars['DateTime'];
  readonly updatedBy: Scalars['ObjectID'];
  readonly url: Scalars['URL'];
};

export enum SiteStatus {
  DEPLOYED = 'DEPLOYED',
  PENDING = 'PENDING',
  SUSPENDED = 'SUSPENDED'
}

export type SiteUpdatedResponse = {
  readonly __typename?: 'SiteUpdatedResponse';
  readonly id: Scalars['ObjectID'];
  readonly name: Scalars['String'];
  readonly status: SiteStatus;
  readonly url: Scalars['URL'];
};

export type TokenResponse = {
  readonly __typename?: 'TokenResponse';
  /** Token expiry */
  readonly expiresAt: Scalars['DateTime'];
  /** Token */
  readonly value: Scalars['String'];
};

export type UpdateAccountInput = {
  readonly displayName?: InputMaybe<Scalars['String']>;
  readonly firstName?: InputMaybe<Scalars['String']>;
  readonly lastName?: InputMaybe<Scalars['String']>;
};

export type UpdatePageInput = {
  readonly description?: InputMaybe<Scalars['String']>;
  readonly isLoneTitle?: InputMaybe<Scalars['Boolean']>;
  readonly title?: InputMaybe<Scalars['String']>;
};

export type UpdateSectionFormatInput = {
  readonly columnGap?: InputMaybe<Scalars['NonNegativeInt']>;
  readonly rowGap?: InputMaybe<Scalars['NonNegativeInt']>;
  readonly rowsCount?: InputMaybe<Scalars['NonNegativeInt']>;
};

export type UpdateSiteInput = {
  readonly name?: InputMaybe<Scalars['String']>;
};

export type UpdateTextElementInput = {
  readonly desktop?: InputMaybe<ElementAreaInput>;
  readonly html: Scalars['String'];
  readonly json: Scalars['JSONObject'];
  readonly mobile?: InputMaybe<ElementAreaInput>;
  readonly tablet?: InputMaybe<ElementAreaInput>;
};

export enum VerificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS'
}

export type RegisterMutationVariables = Exact<{
  input: AccountRegisterInput;
}>;


export type RegisterMutation = { readonly __typename?: 'Mutation', readonly registerAccount: { readonly __typename?: 'AuthResponse', readonly accessToken: { readonly __typename?: 'TokenResponse', readonly value: string, readonly expiresAt: Date } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { readonly __typename?: 'Mutation', readonly logout: any };

export type LoginWithVerificationMutationVariables = Exact<{
  input: LoginWithVerificationInput;
}>;


export type LoginWithVerificationMutation = { readonly __typename?: 'Mutation', readonly loginWithVerification: { readonly __typename?: 'AuthResponse', readonly accessToken: { readonly __typename?: 'TokenResponse', readonly value: string, readonly expiresAt: Date } } };

export type AddEmailMutationVariables = Exact<{
  email: Scalars['EmailAddress'];
}>;


export type AddEmailMutation = { readonly __typename?: 'Mutation', readonly addEmailToAccount: boolean };

export type RemoveEmailMutationVariables = Exact<{
  emailId: Scalars['ObjectID'];
}>;


export type RemoveEmailMutation = { readonly __typename?: 'Mutation', readonly removeEmailFromAccount: boolean };

export type AddPhoneMutationVariables = Exact<{
  phone: Scalars['PhoneNumber'];
}>;


export type AddPhoneMutation = { readonly __typename?: 'Mutation', readonly addPhoneToAccount: boolean };

export type RemovePhoneMutationVariables = Exact<{
  phoneId: Scalars['ObjectID'];
}>;


export type RemovePhoneMutation = { readonly __typename?: 'Mutation', readonly removePhoneFromAccount: boolean };

export type GetAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAccountQuery = { readonly __typename?: 'Query', readonly account: { readonly __typename?: 'Account', readonly firstName: string, readonly lastName: string, readonly displayName: string } };

export type GetOrgMembershipQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgMembershipQuery = { readonly __typename?: 'Query', readonly organizationMembershipProfile: { readonly __typename?: 'OrganizationMember', readonly profileImageUrl?: any | null, readonly status: InvitationStatus, readonly role: OrganizationRole } };

export type GetOrgsMembershipListQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOrgsMembershipListQuery = { readonly __typename?: 'Query', readonly organizationsByMemberships: ReadonlyArray<{ readonly __typename?: 'Organization', readonly id: string, readonly name: string, readonly slug: string, readonly logoUrl?: string | null }> };

export type GetCurrentOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentOrganizationQuery = { readonly __typename?: 'Query', readonly organizationByMembership: ReadonlyArray<{ readonly __typename?: 'Organization', readonly name: string, readonly logoUrl?: string | null, readonly plan: OrganizationPlan, readonly slug: string }> };

export type FindOrganizationBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type FindOrganizationBySlugQuery = { readonly __typename?: 'Query', readonly organizationBySlug: { readonly __typename?: 'OrganizationBySlugResponse', readonly id: string, readonly name: string } };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { readonly __typename?: 'Mutation', readonly createOrganization: { readonly __typename?: 'OrgCreatedResponse', readonly id: string } };

export type ArchiveOrganizationMutationVariables = Exact<{
  orgId: Scalars['ObjectID'];
}>;


export type ArchiveOrganizationMutation = { readonly __typename?: 'Mutation', readonly archiveOrganization: any };

export type RestoreOrganizationMutationVariables = Exact<{
  orgId: Scalars['ObjectID'];
}>;


export type RestoreOrganizationMutation = { readonly __typename?: 'Mutation', readonly restoreOrganization: any };

export type PositionFragment = { readonly __typename?: 'ElementArea', readonly x: any, readonly y: any, readonly width: any, readonly height: any, readonly isVisible: any };

export type GetElementsByGroupQueryVariables = Exact<{
  groupId: Scalars['ObjectID'];
}>;


export type GetElementsByGroupQuery = { readonly __typename?: 'Query', readonly elementsByGroup: ReadonlyArray<{ readonly __typename: 'ElementText', readonly id: any, readonly json: any, readonly html: string, readonly type: ElementType, readonly group: any, readonly createdAt?: Date | null, readonly updatedAt?: Date | null, readonly createdBy: any, readonly updatedBy: any, readonly desktop: { readonly __typename?: 'ElementArea', readonly x: any, readonly y: any, readonly width: any, readonly height: any, readonly isVisible: any }, readonly mobile?: { readonly __typename?: 'ElementArea', readonly x: any, readonly y: any, readonly width: any, readonly height: any, readonly isVisible: any } | null, readonly tablet?: { readonly __typename?: 'ElementArea', readonly x: any, readonly y: any, readonly width: any, readonly height: any, readonly isVisible: any } | null }> };

export type AddTextElementMutationVariables = Exact<{
  groupId: Scalars['ObjectID'];
  input: AddTextElementInput;
}>;


export type AddTextElementMutation = { readonly __typename?: 'Mutation', readonly addTextElement: { readonly __typename?: 'ElementText', readonly id: any } };

export type UpdateTextElementMutationVariables = Exact<{
  elementId: Scalars['ObjectID'];
  input: UpdateTextElementInput;
}>;


export type UpdateTextElementMutation = { readonly __typename?: 'Mutation', readonly updateTextElement: { readonly __typename?: 'ElementText', readonly id: any } };

export type DeleteManyElementsMutationVariables = Exact<{
  elementIds: ReadonlyArray<Scalars['ObjectID']> | Scalars['ObjectID'];
}>;


export type DeleteManyElementsMutation = { readonly __typename?: 'Mutation', readonly deleteManyElements: ReadonlyArray<{ readonly __typename?: 'ElementText', readonly id: any }> };

export type GetPageSectionQueryVariables = Exact<{
  sectionId: Scalars['ObjectID'];
}>;


export type GetPageSectionQuery = { readonly __typename?: 'Query', readonly section: { readonly __typename?: 'PageSection', readonly id: any, readonly format: { readonly __typename?: 'PageSectionFormat', readonly rowsCount: any, readonly rowGap: any, readonly columnGap: any } } };

export type GetPageSectionListQueryVariables = Exact<{
  pageId: Scalars['ObjectID'];
}>;


export type GetPageSectionListQuery = { readonly __typename?: 'Query', readonly sectionsByPage: ReadonlyArray<{ readonly __typename?: 'PageSection', readonly id: any, readonly createdAt: Date, readonly updatedAt: Date, readonly updatedBy: any, readonly format: { readonly __typename?: 'PageSectionFormat', readonly rowsCount: any, readonly rowGap: any, readonly columnGap: any } }> };

export type CreatePageSectionMutationVariables = Exact<{
  pageId: Scalars['ObjectID'];
  input: CreateSectionInput;
}>;


export type CreatePageSectionMutation = { readonly __typename?: 'Mutation', readonly createSection: { readonly __typename?: 'PageSection', readonly id: any } };

export type DeletePageSectionMutationVariables = Exact<{
  pageId: Scalars['ObjectID'];
  sectionId: Scalars['ObjectID'];
}>;


export type DeletePageSectionMutation = { readonly __typename?: 'Mutation', readonly deleteSection: { readonly __typename?: 'PageSection', readonly id: any } };

export type UpdatePageSectionIndexMutationVariables = Exact<{
  pageId: Scalars['ObjectID'];
  sectionId: Scalars['ObjectID'];
  index: Scalars['NonNegativeInt'];
}>;


export type UpdatePageSectionIndexMutation = { readonly __typename?: 'Mutation', readonly updateSectionIndex: { readonly __typename?: 'PageSection', readonly id: any } };

export type UpdatePageSectionFormatMutationVariables = Exact<{
  pageId: Scalars['ObjectID'];
  sectionId: Scalars['ObjectID'];
  input: UpdateSectionFormatInput;
}>;


export type UpdatePageSectionFormatMutation = { readonly __typename?: 'Mutation', readonly updateSectionFormat: { readonly __typename?: 'PageSection', readonly id: any } };

export type ClonePageSectionMutationVariables = Exact<{
  pageId: Scalars['ObjectID'];
  sectionId: Scalars['ObjectID'];
}>;


export type ClonePageSectionMutation = { readonly __typename?: 'Mutation', readonly cloneSection: { readonly __typename?: 'PageSection', readonly id: any } };

export type GetPageListQueryVariables = Exact<{
  siteId: Scalars['ObjectID'];
}>;


export type GetPageListQuery = { readonly __typename?: 'Query', readonly pagesBySite: ReadonlyArray<{ readonly __typename?: 'Page', readonly id: any, readonly title: string, readonly status: string }> };

export type GetPageQueryVariables = Exact<{
  pageId: Scalars['ObjectID'];
}>;


export type GetPageQuery = { readonly __typename?: 'Query', readonly page: { readonly __typename?: 'Page', readonly id: any, readonly title: string, readonly status: string, readonly isLoneTitle?: boolean | null, readonly description?: string | null, readonly createdAt: Date, readonly updatedAt: Date, readonly updatedBy: any } };

export type CreatePageMutationVariables = Exact<{
  siteId: Scalars['ObjectID'];
  input: CreatePageInput;
}>;


export type CreatePageMutation = { readonly __typename?: 'Mutation', readonly createPage: { readonly __typename?: 'PageUpdatedResponse', readonly id: any, readonly status: string } };

export type UpdatePageMutationVariables = Exact<{
  pageId: Scalars['ObjectID'];
  input: UpdatePageInput;
}>;


export type UpdatePageMutation = { readonly __typename?: 'Mutation', readonly updatePage: { readonly __typename?: 'PageUpdatedResponse', readonly status: string } };

export type DeletePageMutationVariables = Exact<{
  pageId: Scalars['ObjectID'];
}>;


export type DeletePageMutation = { readonly __typename?: 'Mutation', readonly deletePage: { readonly __typename?: 'PageUpdatedResponse', readonly status: string } };

export type SessionQueryVariables = Exact<{ [key: string]: never; }>;


export type SessionQuery = { readonly __typename?: 'Query', readonly session: { readonly __typename?: 'SessionResponse', readonly id: any } };

export type GetAccessTokenQueryVariables = Exact<{
  organization?: InputMaybe<Scalars['ObjectID']>;
}>;


export type GetAccessTokenQuery = { readonly __typename?: 'Query', readonly accessToken: { readonly __typename?: 'TokenResponse', readonly value: string, readonly expiresAt: Date } };

export type GetSitesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSitesQuery = { readonly __typename?: 'Query', readonly siteByOwner: ReadonlyArray<{ readonly __typename?: 'Site', readonly id: any, readonly name: string, readonly status: SiteStatus }> };

export type GetSiteQueryVariables = Exact<{
  siteId: Scalars['ObjectID'];
}>;


export type GetSiteQuery = { readonly __typename?: 'Query', readonly site: { readonly __typename?: 'Site', readonly id: any, readonly name: string, readonly updatedAt: Date } };

export type CreateSiteMutationVariables = Exact<{
  input: CreateSiteInput;
}>;


export type CreateSiteMutation = { readonly __typename?: 'Mutation', readonly createSite: { readonly __typename?: 'SiteUpdatedResponse', readonly id: any } };

export type UpdateSiteMutationVariables = Exact<{
  siteId: Scalars['ObjectID'];
  input: UpdateSiteInput;
}>;


export type UpdateSiteMutation = { readonly __typename?: 'Mutation', readonly updateSite: { readonly __typename?: 'SiteUpdatedResponse', readonly id: any, readonly status: SiteStatus } };

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

export const PositionFragmentDoc = gql`
    fragment Position on ElementArea {
  x
  y
  width
  height
  isVisible
}
    `;
export const RegisterDocument = gql`
    mutation register($input: AccountRegisterInput!) {
  registerAccount(input: $input) {
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
 *      input: // value for 'input'
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
    mutation loginWithVerification($input: LoginWithVerificationInput!) {
  loginWithVerification(input: $input) {
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
 *      input: // value for 'input'
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
    mutation addEmail($email: EmailAddress!) {
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
    mutation removeEmail($emailId: ObjectID!) {
  removeEmailFromAccount(emailId: $emailId)
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
 *      emailId: // value for 'emailId'
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
    mutation addPhone($phone: PhoneNumber!) {
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
    mutation removePhone($phoneId: ObjectID!) {
  removePhoneFromAccount(phoneId: $phoneId)
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
 *      phoneId: // value for 'phoneId'
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
  organizationMembershipProfile {
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
  organizationsByMemberships {
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
  organizationByMembership {
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
    mutation createOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    id
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
 *      input: // value for 'input'
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
    mutation archiveOrganization($orgId: ObjectID!) {
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
    mutation restoreOrganization($orgId: ObjectID!) {
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
export const GetElementsByGroupDocument = gql`
    query getElementsByGroup($groupId: ObjectID!) {
  elementsByGroup(groupId: $groupId) {
    __typename
    ... on ElementText {
      id
      json
      html
      type
      group
      createdAt
      updatedAt
      createdBy
      updatedBy
      desktop {
        ...Position
      }
      mobile {
        ...Position
      }
      tablet {
        ...Position
      }
    }
  }
}
    ${PositionFragmentDoc}`;

/**
 * __useGetElementsByGroupQuery__
 *
 * To run a query within a React component, call `useGetElementsByGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetElementsByGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetElementsByGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetElementsByGroupQuery(baseOptions: Apollo.QueryHookOptions<GetElementsByGroupQuery, GetElementsByGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetElementsByGroupQuery, GetElementsByGroupQueryVariables>(GetElementsByGroupDocument, options);
      }
export function useGetElementsByGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetElementsByGroupQuery, GetElementsByGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetElementsByGroupQuery, GetElementsByGroupQueryVariables>(GetElementsByGroupDocument, options);
        }
export type GetElementsByGroupQueryHookResult = ReturnType<typeof useGetElementsByGroupQuery>;
export type GetElementsByGroupLazyQueryHookResult = ReturnType<typeof useGetElementsByGroupLazyQuery>;
export type GetElementsByGroupQueryResult = Apollo.QueryResult<GetElementsByGroupQuery, GetElementsByGroupQueryVariables>;
export function refetchGetElementsByGroupQuery(variables: GetElementsByGroupQueryVariables) {
      return { query: GetElementsByGroupDocument, variables: variables }
    }
export const AddTextElementDocument = gql`
    mutation addTextElement($groupId: ObjectID!, $input: AddTextElementInput!) {
  addTextElement(groupId: $groupId, input: $input) {
    id
  }
}
    `;
export type AddTextElementMutationFn = Apollo.MutationFunction<AddTextElementMutation, AddTextElementMutationVariables>;

/**
 * __useAddTextElementMutation__
 *
 * To run a mutation, you first call `useAddTextElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTextElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTextElementMutation, { data, loading, error }] = useAddTextElementMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTextElementMutation(baseOptions?: Apollo.MutationHookOptions<AddTextElementMutation, AddTextElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTextElementMutation, AddTextElementMutationVariables>(AddTextElementDocument, options);
      }
export type AddTextElementMutationHookResult = ReturnType<typeof useAddTextElementMutation>;
export type AddTextElementMutationResult = Apollo.MutationResult<AddTextElementMutation>;
export type AddTextElementMutationOptions = Apollo.BaseMutationOptions<AddTextElementMutation, AddTextElementMutationVariables>;
export const UpdateTextElementDocument = gql`
    mutation updateTextElement($elementId: ObjectID!, $input: UpdateTextElementInput!) {
  updateTextElement(elementId: $elementId, input: $input) {
    id
  }
}
    `;
export type UpdateTextElementMutationFn = Apollo.MutationFunction<UpdateTextElementMutation, UpdateTextElementMutationVariables>;

/**
 * __useUpdateTextElementMutation__
 *
 * To run a mutation, you first call `useUpdateTextElementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTextElementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTextElementMutation, { data, loading, error }] = useUpdateTextElementMutation({
 *   variables: {
 *      elementId: // value for 'elementId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateTextElementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTextElementMutation, UpdateTextElementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTextElementMutation, UpdateTextElementMutationVariables>(UpdateTextElementDocument, options);
      }
export type UpdateTextElementMutationHookResult = ReturnType<typeof useUpdateTextElementMutation>;
export type UpdateTextElementMutationResult = Apollo.MutationResult<UpdateTextElementMutation>;
export type UpdateTextElementMutationOptions = Apollo.BaseMutationOptions<UpdateTextElementMutation, UpdateTextElementMutationVariables>;
export const DeleteManyElementsDocument = gql`
    mutation deleteManyElements($elementIds: [ObjectID!]!) {
  deleteManyElements(elementIds: $elementIds) {
    ... on ElementText {
      id
    }
  }
}
    `;
export type DeleteManyElementsMutationFn = Apollo.MutationFunction<DeleteManyElementsMutation, DeleteManyElementsMutationVariables>;

/**
 * __useDeleteManyElementsMutation__
 *
 * To run a mutation, you first call `useDeleteManyElementsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteManyElementsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteManyElementsMutation, { data, loading, error }] = useDeleteManyElementsMutation({
 *   variables: {
 *      elementIds: // value for 'elementIds'
 *   },
 * });
 */
export function useDeleteManyElementsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteManyElementsMutation, DeleteManyElementsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteManyElementsMutation, DeleteManyElementsMutationVariables>(DeleteManyElementsDocument, options);
      }
export type DeleteManyElementsMutationHookResult = ReturnType<typeof useDeleteManyElementsMutation>;
export type DeleteManyElementsMutationResult = Apollo.MutationResult<DeleteManyElementsMutation>;
export type DeleteManyElementsMutationOptions = Apollo.BaseMutationOptions<DeleteManyElementsMutation, DeleteManyElementsMutationVariables>;
export const GetPageSectionDocument = gql`
    query getPageSection($sectionId: ObjectID!) {
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
    query getPageSectionList($pageId: ObjectID!) {
  sectionsByPage(pageId: $pageId) {
    id
    createdAt
    updatedAt
    updatedBy
    format {
      rowsCount
      rowGap
      columnGap
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
    mutation createPageSection($pageId: ObjectID!, $input: CreateSectionInput!) {
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
    mutation deletePageSection($pageId: ObjectID!, $sectionId: ObjectID!) {
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
    mutation updatePageSectionIndex($pageId: ObjectID!, $sectionId: ObjectID!, $index: NonNegativeInt!) {
  updateSectionIndex(pageId: $pageId, sectionId: $sectionId, index: $index) {
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
    mutation updatePageSectionFormat($pageId: ObjectID!, $sectionId: ObjectID!, $input: UpdateSectionFormatInput!) {
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
export const ClonePageSectionDocument = gql`
    mutation clonePageSection($pageId: ObjectID!, $sectionId: ObjectID!) {
  cloneSection(pageId: $pageId, sectionId: $sectionId) {
    id
  }
}
    `;
export type ClonePageSectionMutationFn = Apollo.MutationFunction<ClonePageSectionMutation, ClonePageSectionMutationVariables>;

/**
 * __useClonePageSectionMutation__
 *
 * To run a mutation, you first call `useClonePageSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClonePageSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clonePageSectionMutation, { data, loading, error }] = useClonePageSectionMutation({
 *   variables: {
 *      pageId: // value for 'pageId'
 *      sectionId: // value for 'sectionId'
 *   },
 * });
 */
export function useClonePageSectionMutation(baseOptions?: Apollo.MutationHookOptions<ClonePageSectionMutation, ClonePageSectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClonePageSectionMutation, ClonePageSectionMutationVariables>(ClonePageSectionDocument, options);
      }
export type ClonePageSectionMutationHookResult = ReturnType<typeof useClonePageSectionMutation>;
export type ClonePageSectionMutationResult = Apollo.MutationResult<ClonePageSectionMutation>;
export type ClonePageSectionMutationOptions = Apollo.BaseMutationOptions<ClonePageSectionMutation, ClonePageSectionMutationVariables>;
export const GetPageListDocument = gql`
    query getPageList($siteId: ObjectID!) {
  pagesBySite(siteId: $siteId) {
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
    query getPage($pageId: ObjectID!) {
  page(pageId: $pageId) {
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
    mutation createPage($siteId: ObjectID!, $input: CreatePageInput!) {
  createPage(siteId: $siteId, input: $input) {
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
 *      input: // value for 'input'
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
    mutation updatePage($pageId: ObjectID!, $input: UpdatePageInput!) {
  updatePage(pageId: $pageId, input: $input) {
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
    mutation deletePage($pageId: ObjectID!) {
  deletePage(pageId: $pageId) {
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
    query getAccessToken($organization: ObjectID) {
  accessToken(organizationId: $organization) {
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
  siteByOwner {
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
    query getSite($siteId: ObjectID!) {
  site(siteId: $siteId) {
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
    mutation createSite($input: CreateSiteInput!) {
  createSite(input: $input) {
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
 *      input: // value for 'input'
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
    mutation updateSite($siteId: ObjectID!, $input: UpdateSiteInput!) {
  updateSite(siteId: $siteId, input: $input) {
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
 *      input: // value for 'input'
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
  sendVerificationCode(channel: $channel, destination: $destination)
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