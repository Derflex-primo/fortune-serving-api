CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE role as enum('user', 'admin');
CREATE TYPE status as enum('active', 'inactive', 'banned');
CREATE TYPE subscription_type as enum('free', 'standard', 'premium');

CREATE TABLE users (
    id                           uuid primary key default uuid_generate_v4(),
    full_name                    varchar(255) not null,
    phone_number                 varchar(30) unique not null,
    email                        varchar(255) unique not null,
    password_hash                varchar(255) not null,
    date_of_birth                date not null,
    profile_image                varchar(255),
    role                         role default 'user',
    is_verified                  boolean default false,
    status                       status default 'active',
    last_login                   timestamp,
    last_logout                  timestamp,
    session_token                varchar(255),
    subscription_type            subscription_type default 'free',
    terms_accepted_at            timestamp, 
    privacy_policy_accepted_at   timestamp,
    created_at                   timestamp default current_timestamp,
    updated_at                   timestamp default current_timestamp
);

ALTER TABLE users ADD CONSTRAINT unique_phone_email UNIQUE (phone_number, email);