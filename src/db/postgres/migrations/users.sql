CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    profile_image VARCHAR(255),
    role VARCHAR(10) NOT NULL CHECK (role IN (
        'users', 
        'admin'
    )),
    is_verified BOOLEAN DEFAULT FALSE,
    status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    last_login DATETIME,
    last_logout DATETIME,
    session_token VARCHAR(255),
    subcription_type ENUM('free', 'standard', 'premium') DEFAULT 'free',
    terms_accepted_at DATETIME, 
    privacy_policy_accepted_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)