CREATE TABLE items (
    id            uuid primary key default uuid_generate_v4(),
    name          varchar(255) not null,
    description   varchar(500),
    price         money not null,
    stock         int default 0,
    sku           varchar(255) unique not null,
    is_active     boolean default true,
    store_id      uuid not null,
    category_id   uuid not null,
    created_at    timestamp default current_timestamp,
    updated_at    timestamp default current_timestamp,

    foreign key (store_id) references stores(id) on delete cascade,
    foreign key (category_id) references categories(id)
);