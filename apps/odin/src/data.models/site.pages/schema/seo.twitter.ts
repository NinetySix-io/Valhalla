import { Field, ObjectType } from '@nestjs/graphql';

import { Expose } from 'class-transformer';
import { prop } from '@typegoose/typegoose';

export enum SitePageSeoTwitterCard {
  Summary = 'summary',
  SummaryLargeImage = 'summary_large_image',
  App = 'app',
  Player = 'player',
}

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup
 */
@ObjectType()
export class SitePageSeoTwitter {
  @Expose()
  @Field({ description: '@username for the website used in the card footer' })
  @prop()
  handle: string;

  @Expose()
  @Field({ description: 'Description of content (maximum 200 characters)' })
  @prop()
  description?: string;

  @Expose()
  @Field({
    description:
      'URL of image to use in the card. Images must be less than 5MB in size. JPG, PNG, WEBP and GIF formats are supported. Only the first frame of an animated GIF will be used. SVG is not supported.',
  })
  @prop()
  image?: string;

  @Expose()
  @Field({
    description:
      'A text description of the image conveying the essential nature of an image to users who are visually impaired.',
  })
  @prop()
  imageAlt?: string;

  @Expose()
  @Field({
    description:
      '@username for the content creator / author (outputs as twitter:creator)',
  })
  @prop()
  site: '@site';

  @Expose()
  @Field(() => SitePageSeoTwitterCard, { description: 'The card type' })
  @prop()
  cardType: SitePageSeoTwitterCard;
}
