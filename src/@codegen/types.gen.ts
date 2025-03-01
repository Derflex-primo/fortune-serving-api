// This file is auto-generated by @hey-api/openapi-ts

export type User = {
    /**
     * A unique identifier for the user.
     */
    id: string;
    /**
     * User's full name.
     */
    full_name: string;
    /**
     * User's phone number.
     */
    phone_number: string;
    /**
     * User's email address.
     */
    email: string;
    /**
     * User's password in plain text form.
     */
    password: string;
    /**
     * User's password in hashed form.
     */
    password_hash?: string;
    /**
     * User's birthdate in the format (e.g., 'YYYY-MM-DD')
     */
    date_of_birth: string;
    /**
     * User's profile image link.
     */
    profile_image?: string;
    /**
     * User's role.
     */
    role: 'user' | 'admin';
    /**
     * A boolean flag to determine if the user is verified or not.
     */
    is_verified?: boolean;
    /**
     * User's account status.
     */
    status?: 'active' | 'inactive' | 'banned';
    /**
     * The date and time of the user's last login in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    last_login?: string;
    /**
     * The date and time of the user's last logout in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    last_logout?: string;
    /**
     * User's session token.
     */
    session_token?: string;
    /**
     * User's account subscription type
     */
    subscription_type?: 'free' | 'standard' | 'premium';
    /**
     * The date and time when the user accepted the terms and conditions in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    terms_accepted_at?: string;
    /**
     * The date and time when the user accepted the privacy policy in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    privacy_policy_accepted_at?: string;
    /**
     * The date and time when the user record was created, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    created_at?: string;
    /**
     * The date and time when the user record was last updated, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    updated_at?: string;
};

export type Template = {
    /**
     * A unique identifier for the template.
     */
    id: string;
    /**
     * The name of the template.
     */
    name: string;
    /**
     * A brief description of the template.
     */
    description: string;
    /**
     * The version of the template.
     */
    version?: string;
    /**
     * The URL of the template's thumbnail image.
     */
    thumbnail_image?: string;
    /**
     * A boolean flag indicating whether the template is active.
     */
    is_active?: boolean;
    /**
     * The type of the template, based on its use case.
     */
    template_type?: 'ecommerce' | 'blog' | 'portfolio' | 'entertainment' | 'marketing' | 'educational' | 'health and wellness' | 'corporate' | 'real estate' | 'nonprofit' | 'food and beverage' | 'travel' | 'sports and fitness' | 'technology' | 'other';
    /**
     * The date and time when the template record was created, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    created_at?: string;
    /**
     * The date and time when the template record was last updated, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    updated_at?: string;
};

export type Store = {
    /**
     * A unique identifier for the store.
     */
    id: string;
    /**
     * The name of the store.
     */
    name: string;
    /**
     * A brief description of the store.
     */
    description: string;
    /**
     * The store's contact phone number, including the country code.
     */
    phone_number: string;
    /**
     * The store's contact email address.
     */
    email: string;
    /**
     * The URL of the store's logo image.
     */
    logo_image?: string;
    /**
     * The URL of the store's favicon image.
     */
    favicon_image?: string;
    /**
     * The meta title for the store, used for SEO.
     */
    meta_title?: string;
    /**
     * The meta description for the store, used for SEO.
     */
    meta_description?: string;
    /**
     * The unique identifier of the user who created the store.
     */
    user_id: string;
    /**
     * The unique identifier of the template used by the store.
     */
    template_id: string;
    /**
     * The industry category the store belongs to.
     */
    industry?: 'ecommerce' | 'technology' | 'fashion' | 'health and wellness' | 'education' | 'food and beverage' | 'travel and tourism' | 'real estate' | 'entertainment' | 'automotive' | 'finance' | 'legal services' | 'manufacturing' | 'agriculture' | 'nonprofit and charity' | 'sports and recreation' | 'media and publishing' | 'home services' | 'beauty and personal care' | 'marketing and advertising' | 'retail' | 'logistics and supply chain' | 'energy and utilities' | 'other';
    /**
     * The date and time when the store record was created, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    created_at?: string;
    /**
     * The date and time when the store record was last updated, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    updated_at?: string;
};

export type Category = {
    /**
     * A unique identifier for the category.
     */
    id: string;
    /**
     * The name of the category.
     */
    name: string;
    /**
     * A brief description of the category.
     */
    description?: string;
    /**
     * The unique identifier of the user who created the category.
     */
    user_id: string;
    /**
     * The date and time when the category record was created, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    created_at?: string;
    /**
     * The date and time when the category record was last updated, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    updated_at?: string;
};

export type Address = {
    /**
     * A unique identifier for the address.
     */
    id: string;
    /**
     * The unique identifier of the user associated with the address. Null if associated with a store.
     */
    user_id?: string;
    /**
     * The unique identifier of the store associated with the address. Null if associated with a user.
     */
    store_id?: string;
    /**
     * The type of address.
     */
    address_type: 'home' | 'work' | 'billing' | 'shipping' | 'store';
    /**
     * The street address.
     */
    street_address: string;
    /**
     * The city for the address.
     */
    city: string;
    /**
     * The postal code for the address.
     */
    postal_code: string;
    /**
     * The country for the address.
     */
    country: string;
    /**
     * The date and time when the address record was created, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    created_at?: string;
    /**
     * The date and time when the address record was last updated, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    updated_at?: string;
};

export type Item = {
    /**
     * A unique identifier for the item.
     */
    id: string;
    /**
     * The name of the item.
     */
    name: string;
    /**
     * A brief description of the item.
     */
    description?: string;
    /**
     * The price of the item.
     */
    price: number;
    /**
     * The available stock quantity for the item. Defaults to 0.
     */
    stock?: number;
    /**
     * The unique Stock Keeping Unit (SKU) for the item.
     */
    sku: string;
    /**
     * A boolean flag indicating whether the item is active. Defaults to true.
     */
    is_active?: boolean;
    /**
     * The unique identifier of the category that the item belongs to.
     */
    category_id: string;
    /**
     * The unique identifier of the store that the item belongs to.
     */
    store_id: string;
    /**
     * The date and time when the item record was created, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    created_at?: string;
    /**
     * The date and time when the item record was last updated, automatically set to the current time in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss').
     */
    updated_at?: string;
};

export type GetUsersData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users';
};

export type PostUsersData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users';
};

export type DeleteUsersByIdData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users/{id}';
};

export type GetUsersByIdData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users/{id}';
};

export type PatchUsersByIdData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users/{id}';
};

export type GetUsersByIdAddressesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users/{id}/addresses';
};

export type PostUsersByIdAddressesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users/{id}/addresses';
};

export type DeleteUsersByIdAddressesByAddressIdData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users/{id}/addresses/{address_id}';
};

export type GetUsersByIdAddressesByAddressIdData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users/{id}/addresses/{address_id}';
};

export type PutUsersByIdAddressesByAddressIdData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/users/{id}/addresses/{address_id}';
};

export type GetTemplatesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/templates';
};

export type PostTemplatesData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/templates';
};

export type DeleteTemplatesByIdData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/templates/{id}';
};

export type GetTemplatesByIdData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/templates/{id}';
};

export type PatchTemplatesByIdData = {
    body?: never;
    path?: never;
    query?: never;
    url: '/templates/{id}';
};