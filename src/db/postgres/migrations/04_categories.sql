CREATE TABLE categories (
    id            uuid primary key default uuid_generate_v4(),
    name          varchar(255) unique not null,
    description   varchar(500),
    user_id       uuid not null,
    created_at    timestamp default current_timestamp,
    updated_at    timestamp default current_timestamp,

    foreign key (user_id) references users(id) on delete cascade on update cascade
);