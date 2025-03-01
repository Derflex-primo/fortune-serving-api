CREATE TYPE template_type as enum (
    'ecommerce',
    'blog',
    'portfolio',
    'entertainment',
    'marketing',
    'educational',
    'health and wellness',
    'corporate',
    'real estate',
    'nonprofit',
    'food and beverage',
    'travel',
    'sports and fitness',
    'technology',
    'other'
);

CREATE TABLE templates (
        id                 uuid primary key default uuid_generate_v4(),
        name               varchar(255) not null,
        description        varchar(255) not null,
        version            varchar(10),
        thumbnail_image    text,
        is_active          boolean default true,
        template_type      template_type default 'other',
        created_at         timestamp default current_timestamp,
        updated_at         timestamp default current_timestamp
);