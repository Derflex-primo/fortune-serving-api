CREATE TYPE address_type as enum(
  'home', 
  'work', 
  'billing', 
  'shipping', 
  'store'
);

CREATE TABLE addresses (
    id               uuid primary key default uuid_generate_v4(),
    address_type     address_type default 'home',
    street_address   varchar(255) not null,
    city             varchar(100) not null,
    postal_code      varchar(10) not null,
    country          varchar(100) not null,
    user_id          uuid,
    store_id         uuid,
    created_at       timestamp default current_timestamp,
    updated_at       timestamp default current_timestamp,

    foreign key (user_id) references users(id) on delete cascade on update cascade,
    foreign key (store_id) references stores(id) on delete cascade on update cascade
);
