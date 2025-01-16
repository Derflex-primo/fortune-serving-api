CREATE TABLE templates (
     id INTEGER PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     description VARCHAR(255) NOT NULL,
     thumbnail_image VARCHAR(255),
     is_active BOOLEAN DEFAULT TRUE,
     version VARCHAR(10),
     category VARCHAR(60) NOT NULL CHECK (category IN (
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
     )),
     created_by INTEGER NOT NULL,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
     FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
