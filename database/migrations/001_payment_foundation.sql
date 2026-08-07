CREATE TABLE IF NOT EXISTS merchants (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  name VARCHAR(120) NOT NULL,
  status ENUM('active','suspended') NOT NULL DEFAULT 'active',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY merchants_public_id_unique (public_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS stores (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  merchant_id BIGINT UNSIGNED NOT NULL,
  slug VARCHAR(120) NOT NULL,
  name VARCHAR(160) NOT NULL,
  status ENUM('active','inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY stores_public_id_unique (public_id),
  UNIQUE KEY stores_slug_unique (slug),
  KEY stores_merchant_idx (merchant_id),
  CONSTRAINT stores_merchant_fk FOREIGN KEY (merchant_id) REFERENCES merchants(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS merchant_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  merchant_id BIGINT UNSIGNED NOT NULL,
  email VARCHAR(254) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(120) NOT NULL,
  role ENUM('owner','manager') NOT NULL DEFAULT 'owner',
  status ENUM('active','disabled') NOT NULL DEFAULT 'active',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY merchant_users_public_id_unique (public_id),
  UNIQUE KEY merchant_users_email_unique (email),
  KEY merchant_users_merchant_idx (merchant_id),
  CONSTRAINT merchant_users_merchant_fk FOREIGN KEY (merchant_id) REFERENCES merchants(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS merchant_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  merchant_id BIGINT UNSIGNED NOT NULL,
  token_hash CHAR(64) NOT NULL,
  expires_at DATETIME(3) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY merchant_sessions_token_unique (token_hash),
  KEY merchant_sessions_expiry_idx (expires_at),
  CONSTRAINT merchant_sessions_user_fk FOREIGN KEY (user_id) REFERENCES merchant_users(id),
  CONSTRAINT merchant_sessions_merchant_fk FOREIGN KEY (merchant_id) REFERENCES merchants(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  store_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(180) NOT NULL,
  price_paisa BIGINT UNSIGNED NOT NULL,
  stock_quantity INT UNSIGNED NOT NULL DEFAULT 0,
  status ENUM('active','draft','archived') NOT NULL DEFAULT 'active',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY products_public_id_unique (public_id),
  KEY products_store_idx (store_id),
  CONSTRAINT products_store_fk FOREIGN KEY (store_id) REFERENCES stores(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS orders (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  order_number VARCHAR(40) NOT NULL,
  merchant_id BIGINT UNSIGNED NOT NULL,
  store_id BIGINT UNSIGNED NOT NULL,
  customer_name VARCHAR(120) NOT NULL,
  customer_email VARCHAR(254) NOT NULL,
  customer_mobile VARCHAR(20) NOT NULL,
  delivery_address VARCHAR(500) NOT NULL,
  subtotal_paisa BIGINT UNSIGNED NOT NULL,
  delivery_paisa BIGINT UNSIGNED NOT NULL,
  total_paisa BIGINT UNSIGNED NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'BDT',
  order_status ENUM('pending_payment','confirmed','payment_failed','cancelled') NOT NULL DEFAULT 'pending_payment',
  payment_status ENUM('pending','processing','paid','failed','cancelled','refunded') NOT NULL DEFAULT 'pending',
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY orders_public_id_unique (public_id),
  UNIQUE KEY orders_number_unique (order_number),
  KEY orders_tenant_idx (merchant_id, store_id),
  CONSTRAINT orders_merchant_fk FOREIGN KEY (merchant_id) REFERENCES merchants(id),
  CONSTRAINT orders_store_fk FOREIGN KEY (store_id) REFERENCES stores(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS order_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  product_name VARCHAR(180) NOT NULL,
  unit_price_paisa BIGINT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  line_total_paisa BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (id),
  KEY order_items_order_idx (order_id),
  CONSTRAINT order_items_order_fk FOREIGN KEY (order_id) REFERENCES orders(id),
  CONSTRAINT order_items_product_fk FOREIGN KEY (product_id) REFERENCES products(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payment_gateway_settings (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  merchant_id BIGINT UNSIGNED NOT NULL,
  gateway VARCHAR(40) NOT NULL,
  mode ENUM('sandbox','production') NOT NULL DEFAULT 'sandbox',
  enabled TINYINT(1) NOT NULL DEFAULT 0,
  encrypted_api_key TEXT NOT NULL,
  key_last_four CHAR(4) NOT NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY gateway_settings_merchant_gateway_unique (merchant_id, gateway),
  CONSTRAINT gateway_settings_merchant_fk FOREIGN KEY (merchant_id) REFERENCES merchants(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payment_attempts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_id CHAR(36) NOT NULL,
  internal_transaction_id VARCHAR(64) NOT NULL,
  merchant_id BIGINT UNSIGNED NOT NULL,
  store_id BIGINT UNSIGNED NOT NULL,
  order_id BIGINT UNSIGNED NOT NULL,
  gateway VARCHAR(40) NOT NULL,
  mode ENUM('sandbox','production') NOT NULL,
  amount_paisa BIGINT UNSIGNED NOT NULL,
  currency CHAR(3) NOT NULL DEFAULT 'BDT',
  status ENUM('pending','processing','paid','failed','cancelled','expired') NOT NULL DEFAULT 'pending',
  gateway_transaction_id VARCHAR(120) NULL,
  gateway_status VARCHAR(80) NULL,
  initiated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  paid_at DATETIME(3) NULL,
  failed_at DATETIME(3) NULL,
  cancelled_at DATETIME(3) NULL,
  verified_at DATETIME(3) NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  updated_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY payment_attempts_public_id_unique (public_id),
  UNIQUE KEY payment_attempts_internal_tx_unique (internal_transaction_id),
  UNIQUE KEY payment_attempts_gateway_tx_unique (gateway, gateway_transaction_id),
  KEY payment_attempts_tenant_idx (merchant_id, store_id),
  KEY payment_attempts_order_idx (order_id),
  CONSTRAINT payment_attempts_merchant_fk FOREIGN KEY (merchant_id) REFERENCES merchants(id),
  CONSTRAINT payment_attempts_store_fk FOREIGN KEY (store_id) REFERENCES stores(id),
  CONSTRAINT payment_attempts_order_fk FOREIGN KEY (order_id) REFERENCES orders(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS payment_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  payment_attempt_id BIGINT UNSIGNED NOT NULL,
  event_key VARCHAR(180) NOT NULL,
  event_type VARCHAR(60) NOT NULL,
  safe_details JSON NULL,
  created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (id),
  UNIQUE KEY payment_events_key_unique (event_key),
  CONSTRAINT payment_events_attempt_fk FOREIGN KEY (payment_attempt_id) REFERENCES payment_attempts(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
