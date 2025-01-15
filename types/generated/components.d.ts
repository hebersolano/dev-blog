import type { Schema, Struct } from '@strapi/strapi';

export interface BlogLikes extends Struct.ComponentSchema {
  collectionName: 'components_blog_likes';
  info: {
    displayName: 'Likes';
    icon: 'thumbUp';
  };
  attributes: {
    user: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface BlogPostsSelection extends Struct.ComponentSchema {
  collectionName: 'components_blog_posts_selections';
  info: {
    displayName: 'Posts Selection';
  };
  attributes: {
    featuredPosts: Schema.Attribute.Relation<'oneToMany', 'api::post.post'>;
    heading: Schema.Attribute.String;
  };
}

export interface ConfigSocialLinks extends Struct.ComponentSchema {
  collectionName: 'components_config_social_links';
  info: {
    displayName: 'Social links';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    socialMedia: Schema.Attribute.Enumeration<
      ['github', 'youtube', 'twitter', 'facebook', 'whatsapp']
    >;
  };
}

export interface ConfigUserId extends Struct.ComponentSchema {
  collectionName: 'components_config_user_ids';
  info: {
    displayName: 'UserId';
    icon: 'alien';
  };
  attributes: {
    admin_id: Schema.Attribute.Integer;
    doc_id: Schema.Attribute.String;
  };
}

export interface LayoutFeaturedCourse extends Struct.ComponentSchema {
  collectionName: 'components_layout_featured_courses';
  info: {
    description: '';
    displayName: 'featuredCourse';
    icon: 'layout';
  };
  attributes: {
    announcement: Schema.Attribute.Text;
    course: Schema.Attribute.Relation<'oneToOne', 'api::course.course'>;
    heading: Schema.Attribute.String;
  };
}

export interface LayoutHero extends Struct.ComponentSchema {
  collectionName: 'components_layout_heroes';
  info: {
    displayName: 'Hero';
    icon: 'chartBubble';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'layout.link', true>;
    callToAction: Schema.Attribute.String & Schema.Attribute.Required;
    images: Schema.Attribute.Media<'images', true>;
  };
}

export interface LayoutLink extends Struct.ComponentSchema {
  collectionName: 'components_layout_links';
  info: {
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface LayoutMission extends Struct.ComponentSchema {
  collectionName: 'components_layout_missions';
  info: {
    description: '';
    displayName: 'Mission';
    icon: 'arrowRight';
  };
  attributes: {
    content: Schema.Attribute.Text;
    heading: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Our Mission'>;
    showLogo: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface LayoutNewsletterForm extends Struct.ComponentSchema {
  collectionName: 'components_layout_newsletter_forms';
  info: {
    description: '';
    displayName: 'Newsletter Form';
    icon: 'envelop';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    subheading: Schema.Attribute.Text;
  };
}

export interface LayoutPageInfo extends Struct.ComponentSchema {
  collectionName: 'components_layout_page_infos';
  info: {
    displayName: 'Page Info';
    icon: 'file';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    cover: Schema.Attribute.Media<'images'>;
    seoInformation: Schema.Attribute.Component<'seo.seo-information', false>;
  };
}

export interface LayoutServicesPreview extends Struct.ComponentSchema {
  collectionName: 'components_layout_services_previews';
  info: {
    displayName: 'servicesPreview';
    icon: 'layout';
  };
  attributes: {
    services: Schema.Attribute.Relation<'oneToMany', 'api::service.service'>;
  };
}

export interface LayoutSubmenu extends Struct.ComponentSchema {
  collectionName: 'components_layout_submenus';
  info: {
    displayName: 'Submenu';
    icon: 'dashboard';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    submenu: Schema.Attribute.Relation<'oneToOne', 'api::menu.menu'>;
  };
}

export interface SeoSeoInformation extends Struct.ComponentSchema {
  collectionName: 'components_seo_seo_informations';
  info: {
    displayName: 'seoInformation';
    icon: 'typhoon';
  };
  attributes: {
    seoDescription: Schema.Attribute.Text;
    seoTitle: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.likes': BlogLikes;
      'blog.posts-selection': BlogPostsSelection;
      'config.social-links': ConfigSocialLinks;
      'config.user-id': ConfigUserId;
      'layout.featured-course': LayoutFeaturedCourse;
      'layout.hero': LayoutHero;
      'layout.link': LayoutLink;
      'layout.mission': LayoutMission;
      'layout.newsletter-form': LayoutNewsletterForm;
      'layout.page-info': LayoutPageInfo;
      'layout.services-preview': LayoutServicesPreview;
      'layout.submenu': LayoutSubmenu;
      'seo.seo-information': SeoSeoInformation;
    }
  }
}
