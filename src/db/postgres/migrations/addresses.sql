CREATE TYPE address_type enum(
  'home', 
  'work', 
  'billing', 
  'shipping', 
  'store'
);

CREATE TABLE addresses (
    id               int primary key,
    user_id          int,
    store_id         int,
    address_type     address_type default 'home',
    street_address   varchar(255) not null,
    city             varchar(100) not null,
    postal_code      varchar(10) not null,
    country          varchar(100) not null,
    created_at       timestamp default current_timestamp,
    updated_at       timestamp default current_timestamp on update current_timestamp,

    foreign key (user_id) references users(id) on delete cascade on update cascade,
    foreign key (store_id) references stores(id) on delete cascade on update cascade
);
