CREATE TABLE users (
    id varchar(36) NOT NULL,
    account bigint not null,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(20) NOT NULL,
    email VARCHAR(50) NOT NULL,
    phone bigint NULL,
    role VARCHAR(8) NOT NULL,
    password varchar(255),
    address varchar(255),
    city VARCHAR(30) DEFAULT NULL,
    zipcode int(10),
    createdBy VARCHAR(36) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy VARCHAR(36) DEFAULT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE account_data (
    id varchar(36) NOT NULL,
    userId varchar(36) NOT NULL,
    account VARCHAR(30) NOT NULL,
    type VARCHAR(20) NOT NULL,
    credited bigint ,
    debited bigint ,
    balance bigint NOT NULL,
    createdBy VARCHAR(36) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy VARCHAR(36) DEFAULT NULL,
    PRIMARY KEY (id)
);



CREATE TABLE user_role (
    id varchar(36) NOT NULL,
    userId VARCHAR(30) NOT NULL,
    role VARCHAR(20) NOT NULL,
    type VARCHAR(50) NOT NULL,
    createdBy VARCHAR(36) DEFAULT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy VARCHAR(36) DEFAULT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE account_update (
    id varchar(36) NOT NULL,
    accountId varchar(36) NOT NULL,
    accountNumber varchar(36) NOT null,
    credited bigint,
    debited bigint,
    balance bigint,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedBy VARCHAR(36) DEFAULT NULL,
    PRIMARY KEY (id)
);
