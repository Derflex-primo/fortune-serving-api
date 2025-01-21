CREATE TYPE industry as enum (
    'ecommerce',
    'technology',
    'fashion',
    'health and wellness',
    'education',
    'food and beverage',
    'travel and tourism',
    'real estate',
    'entertainment',
    'automotive',
    'finance',
    'legal services',
    'manufacturing',
    'agriculture',
    'nonprofit and charity',
    'sports and recreation',
    'media and publishing',
    'home services',
    'beauty and personal care',
    'marketing and advertising',
    'retail',
    'logistics and supply chain',
    'energy and utilities',
    'other'
);

CREATE TABLE stores (
        id                 serial primary key,
        name               varchar(255) unique not null,
        description        varchar(255) not null,
        phone_number       varchar(30) unique not null,
        email              varchar(255) unique not null,
        logo_image         varchar(255),
        favicon_image      varchar(255),
        meta_title         varchar(255),
        meta_description   varchar(500),
        user_id            int not null,
        template_id        int not null,
        industry           industry default 'other',
        created_at         timestamp default current_timestamp,
        updated_at         timestamp default current_timestamp,

        foreign key (user_id) references users (id) on delete cascade on update cascade,
        foreign key (template_id) references templates (id) on delete cascade on update cascade
);