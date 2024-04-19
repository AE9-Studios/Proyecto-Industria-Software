failed to get console mode for stdout: Controlador no válido.
--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "prisma_migrate_shadow_db_2f7112f2-1570-43ff-adcd-24a345c56de6";
DROP DATABASE "prisma_migrate_shadow_db_7dd0e855-6878-4314-8ea8-69ad1d14c41b";




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:cE+i6xSXWN9f5Ev+Uf/nbg==$5DfaJ/74Xuk/VO80o23DtyBWtGgcYzXCkXhclbUaqPs=:V5OrClfyYcB6L2Vyr777chn7Y5z7/TlT4bs8DB5hNzE=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- Name: APPOINTMENT_SOLICITATION_STATE; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."APPOINTMENT_SOLICITATION_STATE" AS ENUM (
    'PENDIENTE',
    'APROBADO',
    'RECHAZADO'
);


ALTER TYPE public."APPOINTMENT_SOLICITATION_STATE" OWNER TO postgres;

--
-- Name: APPOINTMENT_STATE; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."APPOINTMENT_STATE" AS ENUM (
    'PENDIENTE',
    'ATENDIDO'
);


ALTER TYPE public."APPOINTMENT_STATE" OWNER TO postgres;

--
-- Name: EMPLOYEE_STATE; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."EMPLOYEE_STATE" AS ENUM (
    'ENABLED',
    'DISABLED'
);


ALTER TYPE public."EMPLOYEE_STATE" OWNER TO postgres;

--
-- Name: GENDER; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."GENDER" AS ENUM (
    'MASCULINO',
    'FEMENINO'
);


ALTER TYPE public."GENDER" OWNER TO postgres;

--
-- Name: INVENTORY_MOVEMENT_TYPE; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."INVENTORY_MOVEMENT_TYPE" AS ENUM (
    'ENTRADA',
    'SALIDA',
    'PEDIDO'
);


ALTER TYPE public."INVENTORY_MOVEMENT_TYPE" OWNER TO postgres;

--
-- Name: PAY_METHOD; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."PAY_METHOD" AS ENUM (
    'LINEA',
    'CAJA'
);


ALTER TYPE public."PAY_METHOD" OWNER TO postgres;

--
-- Name: POSITIONS; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."POSITIONS" AS ENUM (
    'MEDICO',
    'ENFERMERO',
    'ADMINISTRATIVO',
    'LIMPIEZA',
    'SEGURIDAD',
    'RECEPCION'
);


ALTER TYPE public."POSITIONS" OWNER TO postgres;

--
-- Name: REQUEST_STATE; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."REQUEST_STATE" AS ENUM (
    'PENDIENTE',
    'APROBADO',
    'RECHAZADO'
);


ALTER TYPE public."REQUEST_STATE" OWNER TO postgres;

--
-- Name: ROL; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ROL" AS ENUM (
    'ADMINISTRADOR',
    'EMPLEADO',
    'CLIENTE'
);


ALTER TYPE public."ROL" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ACCOUNT_PLAYABLE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ACCOUNT_PLAYABLE" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Amount" double precision NOT NULL,
    "Creditor" text NOT NULL,
    "Description" text,
    "State" boolean NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."ACCOUNT_PLAYABLE" OWNER TO postgres;

--
-- Name: ACCOUNT_PLAYABLE_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ACCOUNT_PLAYABLE_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ACCOUNT_PLAYABLE_Id_seq" OWNER TO postgres;

--
-- Name: ACCOUNT_PLAYABLE_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ACCOUNT_PLAYABLE_Id_seq" OWNED BY public."ACCOUNT_PLAYABLE"."Id";


--
-- Name: ACCOUNT_RECEIVABLE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ACCOUNT_RECEIVABLE" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Amount" double precision NOT NULL,
    "Debtor" text NOT NULL,
    "Description" text,
    "State" boolean NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."ACCOUNT_RECEIVABLE" OWNER TO postgres;

--
-- Name: ACCOUNT_RECEIVABLE_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ACCOUNT_RECEIVABLE_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ACCOUNT_RECEIVABLE_Id_seq" OWNER TO postgres;

--
-- Name: ACCOUNT_RECEIVABLE_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ACCOUNT_RECEIVABLE_Id_seq" OWNED BY public."ACCOUNT_RECEIVABLE"."Id";


--
-- Name: ACTIVITY_LOG; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ACTIVITY_LOG" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    name text NOT NULL,
    "Description" text NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."ACTIVITY_LOG" OWNER TO postgres;

--
-- Name: ACTIVITY_LOG_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ACTIVITY_LOG_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ACTIVITY_LOG_Id_seq" OWNER TO postgres;

--
-- Name: ACTIVITY_LOG_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ACTIVITY_LOG_Id_seq" OWNED BY public."ACTIVITY_LOG"."Id";


--
-- Name: APPOINTMENT; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."APPOINTMENT" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Description" text,
    "Client_Fk" integer NOT NULL,
    "Employee_Fk" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "State" public."APPOINTMENT_STATE" NOT NULL
);


ALTER TABLE public."APPOINTMENT" OWNER TO postgres;

--
-- Name: APPOINTMENT_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."APPOINTMENT_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."APPOINTMENT_Id_seq" OWNER TO postgres;

--
-- Name: APPOINTMENT_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."APPOINTMENT_Id_seq" OWNED BY public."APPOINTMENT"."Id";


--
-- Name: APPOINTMENT_SOLICITATION; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."APPOINTMENT_SOLICITATION" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Client_Fk" integer NOT NULL,
    "Description" text NOT NULL,
    "State" public."APPOINTMENT_SOLICITATION_STATE" NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."APPOINTMENT_SOLICITATION" OWNER TO postgres;

--
-- Name: APPOINTMENT_SOLICITATION_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."APPOINTMENT_SOLICITATION_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."APPOINTMENT_SOLICITATION_Id_seq" OWNER TO postgres;

--
-- Name: APPOINTMENT_SOLICITATION_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."APPOINTMENT_SOLICITATION_Id_seq" OWNED BY public."APPOINTMENT_SOLICITATION"."Id";


--
-- Name: CATEGORY; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CATEGORY" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    description text,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."CATEGORY" OWNER TO postgres;

--
-- Name: CATEGORY_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CATEGORY_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CATEGORY_Id_seq" OWNER TO postgres;

--
-- Name: CATEGORY_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CATEGORY_Id_seq" OWNED BY public."CATEGORY"."Id";


--
-- Name: CLIENT; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CLIENT" (
    "Id" integer NOT NULL,
    "Person_Fk" integer NOT NULL,
    "User_Fk" integer,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."CLIENT" OWNER TO postgres;

--
-- Name: CLIENT_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."CLIENT_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."CLIENT_Id_seq" OWNER TO postgres;

--
-- Name: CLIENT_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."CLIENT_Id_seq" OWNED BY public."CLIENT"."Id";


--
-- Name: EMPLOYEE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EMPLOYEE" (
    "Id" integer NOT NULL,
    "Email" text NOT NULL,
    "Person_Fk" integer NOT NULL,
    "User_Fk" integer NOT NULL,
    "Position" public."POSITIONS" NOT NULL,
    "Start_Date" timestamp(3) without time zone NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "State" public."EMPLOYEE_STATE" DEFAULT 'ENABLED'::public."EMPLOYEE_STATE" NOT NULL,
    "Days_Spent" integer DEFAULT 0
);


ALTER TABLE public."EMPLOYEE" OWNER TO postgres;

--
-- Name: EMPLOYEE_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EMPLOYEE_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EMPLOYEE_Id_seq" OWNER TO postgres;

--
-- Name: EMPLOYEE_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EMPLOYEE_Id_seq" OWNED BY public."EMPLOYEE"."Id";


--
-- Name: INVENTORY; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."INVENTORY" (
    "Id" integer NOT NULL,
    "Product_Fk" integer NOT NULL,
    "Stock" integer NOT NULL,
    "Min_Stock" integer NOT NULL,
    "Valued_Inventory" double precision NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."INVENTORY" OWNER TO postgres;

--
-- Name: INVENTORY_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."INVENTORY_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."INVENTORY_Id_seq" OWNER TO postgres;

--
-- Name: INVENTORY_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."INVENTORY_Id_seq" OWNED BY public."INVENTORY"."Id";


--
-- Name: INVENTORY_MOVEMENT; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."INVENTORY_MOVEMENT" (
    "Id" integer NOT NULL,
    "Quantity" integer NOT NULL,
    "Description" text NOT NULL,
    "State" public."INVENTORY_MOVEMENT_TYPE" NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "Product_Fk" integer NOT NULL
);


ALTER TABLE public."INVENTORY_MOVEMENT" OWNER TO postgres;

--
-- Name: INVENTORY_MOVEMENT_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."INVENTORY_MOVEMENT_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."INVENTORY_MOVEMENT_Id_seq" OWNER TO postgres;

--
-- Name: INVENTORY_MOVEMENT_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."INVENTORY_MOVEMENT_Id_seq" OWNED BY public."INVENTORY_MOVEMENT"."Id";


--
-- Name: INVOICE_ORDER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."INVOICE_ORDER" (
    "Id" integer NOT NULL,
    "Client_Fk" integer,
    "Employee_Fk" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Subtotal" double precision NOT NULL,
    "Discount" double precision,
    "ISV" double precision NOT NULL,
    "Total" double precision NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "Invoice_File" text,
    "PayMethod" public."PAY_METHOD" DEFAULT 'CAJA'::public."PAY_METHOD" NOT NULL
);


ALTER TABLE public."INVOICE_ORDER" OWNER TO postgres;

--
-- Name: INVOICE_ORDER_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."INVOICE_ORDER_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."INVOICE_ORDER_Id_seq" OWNER TO postgres;

--
-- Name: INVOICE_ORDER_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."INVOICE_ORDER_Id_seq" OWNED BY public."INVOICE_ORDER"."Id";


--
-- Name: INVOICE_ORDER_PRODUCT_DETAILS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."INVOICE_ORDER_PRODUCT_DETAILS" (
    "Id" integer NOT NULL,
    "Quantity" integer NOT NULL,
    "Product_Fk" integer NOT NULL,
    "Discount" double precision,
    "Description" text,
    "Invoice_Order_Fk" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."INVOICE_ORDER_PRODUCT_DETAILS" OWNER TO postgres;

--
-- Name: INVOICE_ORDER_PRODUCT_DETAILS_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."INVOICE_ORDER_PRODUCT_DETAILS_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."INVOICE_ORDER_PRODUCT_DETAILS_Id_seq" OWNER TO postgres;

--
-- Name: INVOICE_ORDER_PRODUCT_DETAILS_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."INVOICE_ORDER_PRODUCT_DETAILS_Id_seq" OWNED BY public."INVOICE_ORDER_PRODUCT_DETAILS"."Id";


--
-- Name: INVOICE_ORDER_SERVICE_DETAILS; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."INVOICE_ORDER_SERVICE_DETAILS" (
    "Id" integer NOT NULL,
    "Service_Fk" integer NOT NULL,
    "Discount" double precision,
    "Description" text,
    "Invoice_Order_Fk" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."INVOICE_ORDER_SERVICE_DETAILS" OWNER TO postgres;

--
-- Name: INVOICE_ORDER_SERVICE_DETAILS_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."INVOICE_ORDER_SERVICE_DETAILS_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."INVOICE_ORDER_SERVICE_DETAILS_Id_seq" OWNER TO postgres;

--
-- Name: INVOICE_ORDER_SERVICE_DETAILS_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."INVOICE_ORDER_SERVICE_DETAILS_Id_seq" OWNED BY public."INVOICE_ORDER_SERVICE_DETAILS"."Id";


--
-- Name: PERMISION; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PERMISION" (
    "Id" integer NOT NULL,
    "Employee_Fk" integer NOT NULL,
    "Reason" text NOT NULL,
    "Description" text NOT NULL,
    "Attached_File" text,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "Answer" text,
    "End_Date" text NOT NULL,
    "Read" boolean NOT NULL,
    "ReadEmployee" boolean NOT NULL,
    "Start_Date" text NOT NULL,
    "State" public."REQUEST_STATE" NOT NULL
);


ALTER TABLE public."PERMISION" OWNER TO postgres;

--
-- Name: PERMISION_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PERMISION_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PERMISION_Id_seq" OWNER TO postgres;

--
-- Name: PERMISION_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PERMISION_Id_seq" OWNED BY public."PERMISION"."Id";


--
-- Name: PERSON; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PERSON" (
    "Id" integer NOT NULL,
    "DNI" text NOT NULL,
    "First_Name" text NOT NULL,
    "Last_Name" text NOT NULL,
    "Birth_Date" text NOT NULL,
    "Phone_Number" text,
    "Address" text,
    "Gender" public."GENDER" NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."PERSON" OWNER TO postgres;

--
-- Name: PERSON_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PERSON_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PERSON_Id_seq" OWNER TO postgres;

--
-- Name: PERSON_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PERSON_Id_seq" OWNED BY public."PERSON"."Id";


--
-- Name: PRODUCT; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PRODUCT" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    "Description" text,
    "Brand" text NOT NULL,
    "Price_Buy" double precision NOT NULL,
    "Price_Sell" double precision NOT NULL,
    "Supplier_Fk" integer NOT NULL,
    "Category_Fk" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "Image" text
);


ALTER TABLE public."PRODUCT" OWNER TO postgres;

--
-- Name: PRODUCT_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PRODUCT_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PRODUCT_Id_seq" OWNER TO postgres;

--
-- Name: PRODUCT_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PRODUCT_Id_seq" OWNED BY public."PRODUCT"."Id";


--
-- Name: PURCHASE_ORDER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PURCHASE_ORDER" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Client_Fk" integer NOT NULL,
    "Employee_Fk" integer NOT NULL,
    "Subtotal" double precision NOT NULL,
    "Discount" double precision,
    "ISV" double precision NOT NULL,
    "Total" double precision NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "Order_File" text,
    "Read" boolean NOT NULL,
    "ReadClient" boolean NOT NULL,
    "State" public."REQUEST_STATE" NOT NULL
);


ALTER TABLE public."PURCHASE_ORDER" OWNER TO postgres;

--
-- Name: PURCHASE_ORDER_DETAILED; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PURCHASE_ORDER_DETAILED" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Quantity" integer NOT NULL,
    "Discount" double precision,
    "Description" text,
    "Product_Fk" integer NOT NULL,
    "Purchase_Order_Fk" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."PURCHASE_ORDER_DETAILED" OWNER TO postgres;

--
-- Name: PURCHASE_ORDER_DETAILED_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PURCHASE_ORDER_DETAILED_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PURCHASE_ORDER_DETAILED_Id_seq" OWNER TO postgres;

--
-- Name: PURCHASE_ORDER_DETAILED_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PURCHASE_ORDER_DETAILED_Id_seq" OWNED BY public."PURCHASE_ORDER_DETAILED"."Id";


--
-- Name: PURCHASE_ORDER_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PURCHASE_ORDER_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PURCHASE_ORDER_Id_seq" OWNER TO postgres;

--
-- Name: PURCHASE_ORDER_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PURCHASE_ORDER_Id_seq" OWNED BY public."PURCHASE_ORDER"."Id";


--
-- Name: PURCHASE_QUOTATION; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PURCHASE_QUOTATION" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Description" text,
    "State" boolean NOT NULL,
    "Product_Fk" integer NOT NULL,
    "Supplier_Fk" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."PURCHASE_QUOTATION" OWNER TO postgres;

--
-- Name: PURCHASE_QUOTATION_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PURCHASE_QUOTATION_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PURCHASE_QUOTATION_Id_seq" OWNER TO postgres;

--
-- Name: PURCHASE_QUOTATION_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PURCHASE_QUOTATION_Id_seq" OWNED BY public."PURCHASE_QUOTATION"."Id";


--
-- Name: SALARY; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SALARY" (
    "Id" integer NOT NULL,
    "Employee_Fk" integer NOT NULL,
    "Amount" double precision NOT NULL,
    "State" boolean NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."SALARY" OWNER TO postgres;

--
-- Name: SALARY_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SALARY_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SALARY_Id_seq" OWNER TO postgres;

--
-- Name: SALARY_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SALARY_Id_seq" OWNED BY public."SALARY"."Id";


--
-- Name: SCHEDULE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SCHEDULE" (
    "Id" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "Schedule" jsonb NOT NULL,
    "ScheduleName" text NOT NULL
);


ALTER TABLE public."SCHEDULE" OWNER TO postgres;

--
-- Name: SCHEDULE_EMPLOYEE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SCHEDULE_EMPLOYEE" (
    "Id" integer NOT NULL,
    "Schedule_Fk" integer NOT NULL,
    "Employee_Fk" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."SCHEDULE_EMPLOYEE" OWNER TO postgres;

--
-- Name: SCHEDULE_EMPLOYEE_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SCHEDULE_EMPLOYEE_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SCHEDULE_EMPLOYEE_Id_seq" OWNER TO postgres;

--
-- Name: SCHEDULE_EMPLOYEE_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SCHEDULE_EMPLOYEE_Id_seq" OWNED BY public."SCHEDULE_EMPLOYEE"."Id";


--
-- Name: SCHEDULE_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SCHEDULE_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SCHEDULE_Id_seq" OWNER TO postgres;

--
-- Name: SCHEDULE_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SCHEDULE_Id_seq" OWNED BY public."SCHEDULE"."Id";


--
-- Name: SERVICE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SERVICE" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    "Description" text,
    "Price" double precision NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."SERVICE" OWNER TO postgres;

--
-- Name: SERVICE_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SERVICE_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SERVICE_Id_seq" OWNER TO postgres;

--
-- Name: SERVICE_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SERVICE_Id_seq" OWNED BY public."SERVICE"."Id";


--
-- Name: SUPPLIER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SUPPLIER" (
    "Id" integer NOT NULL,
    "Name" text NOT NULL,
    "Email" text NOT NULL,
    "Phone" text NOT NULL,
    "Address" text NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."SUPPLIER" OWNER TO postgres;

--
-- Name: SUPPLIER_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SUPPLIER_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SUPPLIER_Id_seq" OWNER TO postgres;

--
-- Name: SUPPLIER_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SUPPLIER_Id_seq" OWNED BY public."SUPPLIER"."Id";


--
-- Name: USER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."USER" (
    "Id" integer NOT NULL,
    "User_Name" text NOT NULL,
    "Email" text NOT NULL,
    "Password" text NOT NULL,
    "Role" public."ROL" NOT NULL,
    "Device_Token" text,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone
);


ALTER TABLE public."USER" OWNER TO postgres;

--
-- Name: USER_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."USER_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."USER_Id_seq" OWNER TO postgres;

--
-- Name: USER_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."USER_Id_seq" OWNED BY public."USER"."Id";


--
-- Name: VACATION; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."VACATION" (
    "Id" integer NOT NULL,
    "Employee_Fk" integer NOT NULL,
    "Start_Date" text NOT NULL,
    "End_Date" text NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP,
    "Answer" text,
    "Read" boolean NOT NULL,
    "ReadEmployee" boolean NOT NULL,
    "State" public."REQUEST_STATE" NOT NULL
);


ALTER TABLE public."VACATION" OWNER TO postgres;

--
-- Name: VACATION_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."VACATION_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."VACATION_Id_seq" OWNER TO postgres;

--
-- Name: VACATION_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."VACATION_Id_seq" OWNED BY public."VACATION"."Id";


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: ACCOUNT_PLAYABLE Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ACCOUNT_PLAYABLE" ALTER COLUMN "Id" SET DEFAULT nextval('public."ACCOUNT_PLAYABLE_Id_seq"'::regclass);


--
-- Name: ACCOUNT_RECEIVABLE Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ACCOUNT_RECEIVABLE" ALTER COLUMN "Id" SET DEFAULT nextval('public."ACCOUNT_RECEIVABLE_Id_seq"'::regclass);


--
-- Name: ACTIVITY_LOG Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ACTIVITY_LOG" ALTER COLUMN "Id" SET DEFAULT nextval('public."ACTIVITY_LOG_Id_seq"'::regclass);


--
-- Name: APPOINTMENT Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."APPOINTMENT" ALTER COLUMN "Id" SET DEFAULT nextval('public."APPOINTMENT_Id_seq"'::regclass);


--
-- Name: APPOINTMENT_SOLICITATION Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."APPOINTMENT_SOLICITATION" ALTER COLUMN "Id" SET DEFAULT nextval('public."APPOINTMENT_SOLICITATION_Id_seq"'::regclass);


--
-- Name: CATEGORY Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CATEGORY" ALTER COLUMN "Id" SET DEFAULT nextval('public."CATEGORY_Id_seq"'::regclass);


--
-- Name: CLIENT Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CLIENT" ALTER COLUMN "Id" SET DEFAULT nextval('public."CLIENT_Id_seq"'::regclass);


--
-- Name: EMPLOYEE Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EMPLOYEE" ALTER COLUMN "Id" SET DEFAULT nextval('public."EMPLOYEE_Id_seq"'::regclass);


--
-- Name: INVENTORY Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVENTORY" ALTER COLUMN "Id" SET DEFAULT nextval('public."INVENTORY_Id_seq"'::regclass);


--
-- Name: INVENTORY_MOVEMENT Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVENTORY_MOVEMENT" ALTER COLUMN "Id" SET DEFAULT nextval('public."INVENTORY_MOVEMENT_Id_seq"'::regclass);


--
-- Name: INVOICE_ORDER Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER" ALTER COLUMN "Id" SET DEFAULT nextval('public."INVOICE_ORDER_Id_seq"'::regclass);


--
-- Name: INVOICE_ORDER_PRODUCT_DETAILS Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER_PRODUCT_DETAILS" ALTER COLUMN "Id" SET DEFAULT nextval('public."INVOICE_ORDER_PRODUCT_DETAILS_Id_seq"'::regclass);


--
-- Name: INVOICE_ORDER_SERVICE_DETAILS Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER_SERVICE_DETAILS" ALTER COLUMN "Id" SET DEFAULT nextval('public."INVOICE_ORDER_SERVICE_DETAILS_Id_seq"'::regclass);


--
-- Name: PERMISION Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERMISION" ALTER COLUMN "Id" SET DEFAULT nextval('public."PERMISION_Id_seq"'::regclass);


--
-- Name: PERSON Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERSON" ALTER COLUMN "Id" SET DEFAULT nextval('public."PERSON_Id_seq"'::regclass);


--
-- Name: PRODUCT Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PRODUCT" ALTER COLUMN "Id" SET DEFAULT nextval('public."PRODUCT_Id_seq"'::regclass);


--
-- Name: PURCHASE_ORDER Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_ORDER" ALTER COLUMN "Id" SET DEFAULT nextval('public."PURCHASE_ORDER_Id_seq"'::regclass);


--
-- Name: PURCHASE_ORDER_DETAILED Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_ORDER_DETAILED" ALTER COLUMN "Id" SET DEFAULT nextval('public."PURCHASE_ORDER_DETAILED_Id_seq"'::regclass);


--
-- Name: PURCHASE_QUOTATION Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_QUOTATION" ALTER COLUMN "Id" SET DEFAULT nextval('public."PURCHASE_QUOTATION_Id_seq"'::regclass);


--
-- Name: SALARY Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SALARY" ALTER COLUMN "Id" SET DEFAULT nextval('public."SALARY_Id_seq"'::regclass);


--
-- Name: SCHEDULE Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SCHEDULE" ALTER COLUMN "Id" SET DEFAULT nextval('public."SCHEDULE_Id_seq"'::regclass);


--
-- Name: SCHEDULE_EMPLOYEE Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SCHEDULE_EMPLOYEE" ALTER COLUMN "Id" SET DEFAULT nextval('public."SCHEDULE_EMPLOYEE_Id_seq"'::regclass);


--
-- Name: SERVICE Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SERVICE" ALTER COLUMN "Id" SET DEFAULT nextval('public."SERVICE_Id_seq"'::regclass);


--
-- Name: SUPPLIER Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SUPPLIER" ALTER COLUMN "Id" SET DEFAULT nextval('public."SUPPLIER_Id_seq"'::regclass);


--
-- Name: USER Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USER" ALTER COLUMN "Id" SET DEFAULT nextval('public."USER_Id_seq"'::regclass);


--
-- Name: VACATION Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VACATION" ALTER COLUMN "Id" SET DEFAULT nextval('public."VACATION_Id_seq"'::regclass);


--
-- Data for Name: ACCOUNT_PLAYABLE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ACCOUNT_PLAYABLE" ("Id", "Date", "Amount", "Creditor", "Description", "State", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: ACCOUNT_RECEIVABLE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ACCOUNT_RECEIVABLE" ("Id", "Date", "Amount", "Debtor", "Description", "State", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: ACTIVITY_LOG; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ACTIVITY_LOG" ("Id", "Date", name, "Description", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: APPOINTMENT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."APPOINTMENT" ("Id", "Date", "Description", "Client_Fk", "Employee_Fk", "Created_At", "Updated_At", "State") FROM stdin;
5	2024-04-07 22:53:00	aprobada su cita	1	1	2024-04-09 01:49:23.224	2024-04-09 01:49:23.224	PENDIENTE
6	2024-04-25 22:53:00	ssdsdsa	1	1	2024-04-09 01:53:12.252	2024-04-09 01:53:12.252	PENDIENTE
7	2024-04-25 22:54:00		1	1	2024-04-09 01:54:11.388	2024-04-09 01:54:11.388	PENDIENTE
4	2024-04-25 04:30:00	preferible a la hora 1 pm aprobada a las 4	1	1	2024-04-09 01:48:52.375	2024-04-16 17:22:58.814	ATENDIDO
2	1970-01-01 00:00:00	examen	1	2	2024-04-07 22:15:40.766	2024-04-16 17:24:27.067	PENDIENTE
\.


--
-- Data for Name: APPOINTMENT_SOLICITATION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."APPOINTMENT_SOLICITATION" ("Id", "Date", "Client_Fk", "Description", "State", "Created_At", "Updated_At") FROM stdin;
1	2024-04-09 00:00:00	1	Examen de la vista	APROBADO	2024-04-07 21:26:47.381	2024-04-07 21:32:36.399
5	2024-04-25 00:00:00	1	preferible a la hora 1 pm	APROBADO	2024-04-07 22:15:12.88	2024-04-09 01:48:52.445
4	2024-04-07 00:00:00	1	necesito cita	APROBADO	2024-04-07 21:55:52.267	2024-04-09 01:49:23.3
6	2024-04-25 00:00:00	1	ssdsdsa	APROBADO	2024-04-09 01:52:11.217	2024-04-09 01:53:12.29
7	2024-04-25 00:00:00	1		APROBADO	2024-04-09 01:53:43.302	2024-04-09 01:54:11.438
8	2024-04-08 00:00:00	1	hola soy una solicitud de cita	PENDIENTE	2024-04-09 01:59:28.519	2024-04-16 17:13:11.458
\.


--
-- Data for Name: CATEGORY; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CATEGORY" ("Id", "Name", description, "Created_At", "Updated_At") FROM stdin;
7	Electronics	Category for electronic products	2024-03-02 08:00:00	2024-03-27 22:04:12.184
8	Clothing	Category for clothing items	2024-03-02 08:30:00	2024-03-27 22:04:12.184
9	Books	Category for books	2024-03-02 09:00:00	2024-03-27 22:04:12.184
12	Lentes de sol	Lentes de sol	2024-04-06 22:53:15.003	2024-04-06 22:53:15.003
\.


--
-- Data for Name: CLIENT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CLIENT" ("Id", "Person_Fk", "User_Fk", "Created_At", "Updated_At") FROM stdin;
1	1	1	2024-02-29 00:19:14	2024-04-19 02:11:56.616
\.


--
-- Data for Name: EMPLOYEE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EMPLOYEE" ("Id", "Email", "Person_Fk", "User_Fk", "Position", "Start_Date", "Created_At", "Updated_At", "State", "Days_Spent") FROM stdin;
1	juan@gmail.com	2	2	MEDICO	2021-08-02 00:00:00	2024-02-27 18:37:19.679	2024-02-27 18:37:19.679	ENABLED	0
2	pedro@gmail.com	3	3	ADMINISTRATIVO	2021-08-02 00:00:00	2024-02-27 18:37:19.679	2024-02-27 18:37:19.679	ENABLED	0
\.


--
-- Data for Name: INVENTORY; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVENTORY" ("Id", "Product_Fk", "Stock", "Min_Stock", "Valued_Inventory", "Created_At", "Updated_At") FROM stdin;
7	24	90	15	7200	2024-03-02 18:30:00	2024-03-27 18:30:14.764
8	25	70	12	3500	2024-03-02 19:00:00	2024-03-27 18:30:14.764
9	26	40	8	10000	2024-03-02 19:30:00	2024-03-27 18:30:14.764
10	27	60	18	3300	2024-03-02 20:00:00	2024-03-27 18:30:14.764
11	28	110	15	2750	2024-03-02 20:30:00	2024-03-28 22:21:10.433
3	20	150	13	150000	2024-03-02 16:30:00	2024-03-28 22:21:55.996
5	22	80	12	104000	2024-03-02 17:30:00	2024-03-28 22:22:39.218
2	19	100	24	150000	2024-03-02 16:00:00	2024-03-28 22:35:44.248
4	21	10	40	6000	2024-03-02 17:00:00	2024-03-28 22:52:30.371
6	23	120	12	7200	2024-03-02 18:00:00	2024-03-29 00:59:20.162
\.


--
-- Data for Name: INVENTORY_MOVEMENT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVENTORY_MOVEMENT" ("Id", "Quantity", "Description", "State", "Created_At", "Updated_At", "Product_Fk") FROM stdin;
1	10	Received new stock	ENTRADA	2024-03-02 21:00:00	2024-03-27 22:09:41.137	19
2	15	Received new stock	ENTRADA	2024-03-02 21:30:00	2024-03-27 22:09:41.137	20
3	20	Received new stock	ENTRADA	2024-03-02 22:00:00	2024-03-27 22:09:41.137	21
4	8	Received new stock	ENTRADA	2024-03-02 22:30:00	2024-03-27 22:09:41.137	22
5	12	Received new stock	ENTRADA	2024-03-02 23:00:00	2024-03-27 22:09:41.137	23
6	5	Received new stock	ENTRADA	2024-03-02 23:30:00	2024-03-27 22:09:41.137	24
7	7	Received new stock	ENTRADA	2024-03-03 00:00:00	2024-03-27 22:09:41.137	25
8	4	Received new stock	ENTRADA	2024-03-03 00:30:00	2024-03-27 22:09:41.137	26
9	6	Received new stock	ENTRADA	2024-03-03 01:00:00	2024-03-27 22:09:41.137	27
10	6	Received new stock	ENTRADA	2024-03-03 01:00:00	2024-03-27 22:09:41.137	28
11	5	Sold product	SALIDA	2024-03-03 02:00:00	2024-03-27 22:10:37.924	19
12	8	Sold product	SALIDA	2024-03-03 02:30:00	2024-03-27 22:10:37.924	20
13	12	Sold product	SALIDA	2024-03-03 03:00:00	2024-03-27 22:10:37.924	21
14	6	Sold product	SALIDA	2024-03-03 03:30:00	2024-03-27 22:10:37.924	22
15	10	Sold product	SALIDA	2024-03-03 04:00:00	2024-03-27 22:10:37.924	23
16	5	Received new stock	ENTRADA	2024-03-02 23:30:00	2024-03-27 22:10:37.924	24
17	7	Received new stock	ENTRADA	2024-03-03 00:00:00	2024-03-27 22:10:37.924	25
18	4	Received new stock	ENTRADA	2024-03-03 00:30:00	2024-03-27 22:10:37.924	26
19	6	Received new stock	ENTRADA	2024-03-03 01:00:00	2024-03-27 22:10:37.924	27
20	6	Received new stock	ENTRADA	2024-03-03 01:00:00	2024-03-27 22:10:37.924	28
\.


--
-- Data for Name: INVOICE_ORDER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVOICE_ORDER" ("Id", "Client_Fk", "Employee_Fk", "Date", "Subtotal", "Discount", "ISV", "Total", "Created_At", "Updated_At", "Invoice_File", "PayMethod") FROM stdin;
\.


--
-- Data for Name: INVOICE_ORDER_PRODUCT_DETAILS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVOICE_ORDER_PRODUCT_DETAILS" ("Id", "Quantity", "Product_Fk", "Discount", "Description", "Invoice_Order_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: INVOICE_ORDER_SERVICE_DETAILS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVOICE_ORDER_SERVICE_DETAILS" ("Id", "Service_Fk", "Discount", "Description", "Invoice_Order_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: PERMISION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PERMISION" ("Id", "Employee_Fk", "Reason", "Description", "Attached_File", "Created_At", "Updated_At", "Answer", "End_Date", "Read", "ReadEmployee", "Start_Date", "State") FROM stdin;
\.


--
-- Data for Name: PERSON; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PERSON" ("Id", "DNI", "First_Name", "Last_Name", "Birth_Date", "Phone_Number", "Address", "Gender", "Created_At", "Updated_At") FROM stdin;
2	0801200013101	Juan	Rodriguez	2024-02-27	98162158	Tegucigalpa, D.C	MASCULINO	2024-02-28 00:19:13.791	2024-02-28 00:19:13.791
3	0801200013102	Pedro 	Ardimales	2024-02-27	98162158	Tegucigalpa, D.C	MASCULINO	2024-02-28 00:19:13.791	2024-02-28 00:19:13.791
1	0801200013111	Jocsan Ely	Rueda Lopez	2024-02-27	98162158	Tegucigalpa, D.C	MASCULINO	2024-02-28 00:19:13.791	2024-04-19 02:09:22.248
\.


--
-- Data for Name: PRODUCT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PRODUCT" ("Id", "Name", "Description", "Brand", "Price_Buy", "Price_Sell", "Supplier_Fk", "Category_Fk", "Created_At", "Updated_At", "Image") FROM stdin;
19	Laptop	High-performance laptop	BrandA	1200	1500	5	7	2024-03-02 11:00:00	2024-03-27 22:07:38.889	\N
20	Smartphone	Latest smartphone model	BrandB	800	1000	5	7	2024-03-02 11:30:00	2024-03-27 22:07:38.889	\N
21	T-shirt	Comfortable cotton t-shirt	BrandC	20	30	6	8	2024-03-02 12:00:00	2024-03-27 22:07:38.889	\N
22	Desktop PC	Powerful desktop computer	BrandA	1000	1300	6	8	2024-03-02 12:30:00	2024-03-27 22:07:38.889	\N
23	Jeans	Classic denim jeans	BrandB	40	60	6	9	2024-03-02 13:00:00	2024-03-27 22:07:38.889	\N
24	Headphones	Noise-cancelling headphones	BrandC	50	80	6	7	2024-03-02 13:30:00	2024-03-27 22:07:38.889	\N
25	Backpack	Durable backpack for daily use	BrandA	30	50	6	8	2024-03-02 14:00:00	2024-03-27 22:07:38.889	\N
26	Tablet	Portable tablet device	BrandB	200	250	6	9	2024-03-02 14:30:00	2024-03-27 22:07:38.889	\N
27	Sweater	Warm knitted sweater	BrandC	35	55	5	9	2024-03-02 15:00:00	2024-03-27 22:07:38.889	\N
28	Mouse	Ergonomic computer mouse	BrandA	15	25	5	7	2024-03-02 15:30:00	2024-03-27 22:07:38.889	\N
29	Lentes de millor	lentes aro rojo	MK	234	344	6	12	2024-04-06 23:33:52.735	2024-04-06 23:33:52.735	\N
\.


--
-- Data for Name: PURCHASE_ORDER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PURCHASE_ORDER" ("Id", "Date", "Client_Fk", "Employee_Fk", "Subtotal", "Discount", "ISV", "Total", "Created_At", "Updated_At", "Order_File", "Read", "ReadClient", "State") FROM stdin;
\.


--
-- Data for Name: PURCHASE_ORDER_DETAILED; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PURCHASE_ORDER_DETAILED" ("Id", "Date", "Quantity", "Discount", "Description", "Product_Fk", "Purchase_Order_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: PURCHASE_QUOTATION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PURCHASE_QUOTATION" ("Id", "Date", "Description", "State", "Product_Fk", "Supplier_Fk", "Created_At", "Updated_At") FROM stdin;
2	2024-03-06 14:00:00	Quotation for product E	t	23	5	2024-03-06 14:00:00	2024-03-27 16:44:31.853
3	2024-03-02 10:00:00	Quotation for product A	t	19	5	2024-03-02 10:00:00	2024-03-27 16:45:30.229
4	2024-03-03 11:00:00	Quotation for product B	f	20	6	2024-03-03 11:00:00	2024-03-27 16:45:30.229
5	2024-03-04 12:00:00	Quotation for product C	t	21	5	2024-03-04 12:00:00	2024-03-27 16:45:30.229
6	2024-03-05 13:00:00	Quotation for product D	f	22	6	2024-03-05 13:00:00	2024-03-27 16:45:30.229
\.


--
-- Data for Name: SALARY; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SALARY" ("Id", "Employee_Fk", "Amount", "State", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: SCHEDULE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SCHEDULE" ("Id", "Created_At", "Updated_At", "Schedule", "ScheduleName") FROM stdin;
\.


--
-- Data for Name: SCHEDULE_EMPLOYEE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SCHEDULE_EMPLOYEE" ("Id", "Schedule_Fk", "Employee_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: SERVICE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SERVICE" ("Id", "Name", "Description", "Price", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: SUPPLIER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SUPPLIER" ("Id", "Name", "Email", "Phone", "Address", "Created_At", "Updated_At") FROM stdin;
6	XYZ Distributors	andenglego@gmail.com	987-654-3210	456 Elm St, Town, Country	2024-03-02 10:30:00	2024-03-27 22:04:16.887
8	WSD Distribuciones	aws@gmail.com	23242525	sdasdas	2024-04-07 00:00:14.002	2024-04-07 00:00:14.002
5	ABC Suppliers	alh9cef@gmail.com	123-456-7891	123 Main St, City, Country	2024-03-02 10:00:00	2024-04-19 02:12:04.506
\.


--
-- Data for Name: USER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."USER" ("Id", "User_Name", "Email", "Password", "Role", "Device_Token", "Created_At", "Updated_At") FROM stdin;
1	JOCSAN ELY RUEDA LOPEZ	je@example.com	$2a$10$0STJkdLft0GLQAogZN68F.9k0/NqrWRqOl/aPshxnANp6NY0ad.B2	CLIENTE	\N	2024-04-19 02:02:40.623	\N
2	JUAN RODRIGUEZ	juan@example.com	$2a$10$7rI9XQxfJLWjbceeNyzqWuOrJj8/RZWRDDutGWTVt5UIHvC2kh0Nm	EMPLEADO	\N	2024-04-19 02:02:40.623	\N
3	PEDRO ARDIMALES	pedro@example.com	$2a$10$5ttFaYsH7kNch3HCbkGIMucESf4H6DMulW1pqr94Lf4DqswVN.Oiy	ADMINISTRADOR	\N	2024-04-19 02:02:40.623	\N
9	TOMAS ZAPATA	tomas@gmail.com	$2a$10$BjMcOzQUkjvDTM32la7fYeh5PMKvwYiu8xJ8UHhp9EoowsgbUBSWy	EMPLEADO	\N	2024-04-19 02:02:40.623	\N
8	Alhanis Espinal 	alhanis@gmail.com	$2a$10$cFARtAZH2N6Uv.OtvsvGvuJPEDnRPcZt/K9ZddGKVE6z30O207/Jy	CLIENTE		2024-04-19 02:02:40.623	2024-04-19 02:05:25.806
\.


--
-- Data for Name: VACATION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VACATION" ("Id", "Employee_Fk", "Start_Date", "End_Date", "Created_At", "Updated_At", "Answer", "Read", "ReadEmployee", "State") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
fd6e9a40-064e-4c5b-8170-baeef12ee4c1	4bd57f43d3018d29c6a4632462bcd716f3a37f47ae3340606627dc5399509ffa	2024-02-27 18:48:03.932618+00	20240227184800_init	\N	\N	2024-02-27 18:48:00.404491+00	1
a5d84c4e-9cca-4fa5-baf1-0d138307395a	f12f4658050abfd0e151fe2010058dc2c8761f1bf6fad912a1c2633073523d64	2024-02-28 00:35:06.219735+00	20240228003506_init	\N	\N	2024-02-28 00:35:06.11652+00	1
a749cc1b-50eb-4a5e-bcce-1b3f0b524755	2eba3532f6cf22ee1168420f52233c73ed2eeb775ad0f640810816fd3b4f2397	2024-03-27 21:52:20.162543+00	20240228161527_init	\N	\N	2024-03-27 21:52:19.926433+00	1
906800f6-7b4c-4d60-94cf-0ecc4b45a5e6	4841fd4523ededf2640f581483ef968ecbb3bd8aae5661e70bd362aed395a5ee	2024-03-27 21:52:20.650676+00	20240302212451_init	\N	\N	2024-03-27 21:52:20.195381+00	1
756f1edf-dadd-446c-8999-fc6c61f3a96d	0018c88cd2f0fa9eb61b9f9c2df2ff90982b36df089b542e3b1abaab74c8f045	2024-03-27 21:52:20.783912+00	20240302214708_init	\N	\N	2024-03-27 21:52:20.685154+00	1
02d75881-3330-46b3-8c13-f7868030bf99	dd0bacbb1178f3621ebd55f8e13f05f88cc7a1f9d4276d16e1308b4a1858a6f0	2024-03-27 21:52:20.917489+00	20240302214805_init	\N	\N	2024-03-27 21:52:20.818156+00	1
c5dc4bf7-0f3f-456f-b927-0e09622a0e6e	10a8941f419871d75aacba31949c0a4095ddf30c8cd3ba5c1b1fec1cb5247266	2024-03-27 21:52:21.050579+00	20240303014415_init	\N	\N	2024-03-27 21:52:20.951552+00	1
83c0715d-35c7-4d4e-9dac-9472e325efef	cab1718dbbbfe355d0897a4985ea5bad8f6db98858a57c1d02dfa525c7b3ef82	2024-03-27 21:52:21.228425+00	20240305164855_	\N	\N	2024-03-27 21:52:21.084931+00	1
226ec1ba-ea18-49ee-8644-1548211a9003	86aaf980ac63cfac482f366170294ff03d8d660739561ea691a13fdc6d82ab56	2024-03-27 21:52:21.562323+00	20240316221809_init	\N	\N	2024-03-27 21:52:21.262756+00	1
95991119-a153-4161-b4be-526b1f04a390	7247b90508397ab897f84a9ae86dd65131ffd34979bf79ef05bcb7a25b1f1933	2024-04-06 23:56:56.121106+00	20240401163215_init	\N	\N	2024-04-06 23:56:55.669302+00	1
385d539c-9169-4dcc-a885-1760a2356bd3	90aefbe78d73e1c88185a39734799f3aa94fe773ff14f9f6d44fe0e5c0c8eb4a	2024-04-06 23:57:15.721564+00	20240406235715_init	\N	\N	2024-04-06 23:57:15.599193+00	1
9d2ff405-cc6c-46be-b637-32a3eceb3b70	f0c0b0efe02be37de057c6d8837936ceaa70cbb46828fc0d8e2c65722b7b0ac7	2024-04-19 02:01:54.951219+00	20240414041925_init	\N	\N	2024-04-19 02:01:54.631273+00	1
765b846c-7887-45e6-a052-f32434575f94	93938d0d0ddc46d1500a2700e0fccb0e9eb4efb0432bb9d69b6a88d5de532969	2024-04-19 02:02:40.820735+00	20240419020240_	\N	\N	2024-04-19 02:02:40.574906+00	1
\.


--
-- Name: ACCOUNT_PLAYABLE_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ACCOUNT_PLAYABLE_Id_seq"', 1, false);


--
-- Name: ACCOUNT_RECEIVABLE_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ACCOUNT_RECEIVABLE_Id_seq"', 1, false);


--
-- Name: ACTIVITY_LOG_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ACTIVITY_LOG_Id_seq"', 1, false);


--
-- Name: APPOINTMENT_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."APPOINTMENT_Id_seq"', 7, true);


--
-- Name: APPOINTMENT_SOLICITATION_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."APPOINTMENT_SOLICITATION_Id_seq"', 8, true);


--
-- Name: CATEGORY_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CATEGORY_Id_seq"', 12, true);


--
-- Name: CLIENT_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CLIENT_Id_seq"', 1, true);


--
-- Name: EMPLOYEE_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EMPLOYEE_Id_seq"', 3, true);


--
-- Name: INVENTORY_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."INVENTORY_Id_seq"', 11, true);


--
-- Name: INVENTORY_MOVEMENT_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."INVENTORY_MOVEMENT_Id_seq"', 20, true);


--
-- Name: INVOICE_ORDER_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."INVOICE_ORDER_Id_seq"', 1, false);


--
-- Name: INVOICE_ORDER_PRODUCT_DETAILS_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."INVOICE_ORDER_PRODUCT_DETAILS_Id_seq"', 1, false);


--
-- Name: INVOICE_ORDER_SERVICE_DETAILS_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."INVOICE_ORDER_SERVICE_DETAILS_Id_seq"', 1, false);


--
-- Name: PERMISION_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PERMISION_Id_seq"', 1, false);


--
-- Name: PERSON_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PERSON_Id_seq"', 3, true);


--
-- Name: PRODUCT_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PRODUCT_Id_seq"', 30, true);


--
-- Name: PURCHASE_ORDER_DETAILED_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PURCHASE_ORDER_DETAILED_Id_seq"', 1, false);


--
-- Name: PURCHASE_ORDER_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PURCHASE_ORDER_Id_seq"', 1, false);


--
-- Name: PURCHASE_QUOTATION_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PURCHASE_QUOTATION_Id_seq"', 7, true);


--
-- Name: SALARY_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SALARY_Id_seq"', 1, false);


--
-- Name: SCHEDULE_EMPLOYEE_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SCHEDULE_EMPLOYEE_Id_seq"', 1, false);


--
-- Name: SCHEDULE_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SCHEDULE_Id_seq"', 1, false);


--
-- Name: SERVICE_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SERVICE_Id_seq"', 1, false);


--
-- Name: SUPPLIER_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SUPPLIER_Id_seq"', 8, true);


--
-- Name: USER_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."USER_Id_seq"', 9, true);


--
-- Name: VACATION_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VACATION_Id_seq"', 1, false);


--
-- Name: ACCOUNT_PLAYABLE ACCOUNT_PLAYABLE_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ACCOUNT_PLAYABLE"
    ADD CONSTRAINT "ACCOUNT_PLAYABLE_pkey" PRIMARY KEY ("Id");


--
-- Name: ACCOUNT_RECEIVABLE ACCOUNT_RECEIVABLE_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ACCOUNT_RECEIVABLE"
    ADD CONSTRAINT "ACCOUNT_RECEIVABLE_pkey" PRIMARY KEY ("Id");


--
-- Name: ACTIVITY_LOG ACTIVITY_LOG_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ACTIVITY_LOG"
    ADD CONSTRAINT "ACTIVITY_LOG_pkey" PRIMARY KEY ("Id");


--
-- Name: APPOINTMENT_SOLICITATION APPOINTMENT_SOLICITATION_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."APPOINTMENT_SOLICITATION"
    ADD CONSTRAINT "APPOINTMENT_SOLICITATION_pkey" PRIMARY KEY ("Id");


--
-- Name: APPOINTMENT APPOINTMENT_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."APPOINTMENT"
    ADD CONSTRAINT "APPOINTMENT_pkey" PRIMARY KEY ("Id");


--
-- Name: CATEGORY CATEGORY_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CATEGORY"
    ADD CONSTRAINT "CATEGORY_pkey" PRIMARY KEY ("Id");


--
-- Name: CLIENT CLIENT_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CLIENT"
    ADD CONSTRAINT "CLIENT_pkey" PRIMARY KEY ("Id");


--
-- Name: EMPLOYEE EMPLOYEE_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EMPLOYEE"
    ADD CONSTRAINT "EMPLOYEE_pkey" PRIMARY KEY ("Id");


--
-- Name: INVENTORY_MOVEMENT INVENTORY_MOVEMENT_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVENTORY_MOVEMENT"
    ADD CONSTRAINT "INVENTORY_MOVEMENT_pkey" PRIMARY KEY ("Id");


--
-- Name: INVENTORY INVENTORY_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVENTORY"
    ADD CONSTRAINT "INVENTORY_pkey" PRIMARY KEY ("Id");


--
-- Name: INVOICE_ORDER_PRODUCT_DETAILS INVOICE_ORDER_PRODUCT_DETAILS_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER_PRODUCT_DETAILS"
    ADD CONSTRAINT "INVOICE_ORDER_PRODUCT_DETAILS_pkey" PRIMARY KEY ("Id");


--
-- Name: INVOICE_ORDER_SERVICE_DETAILS INVOICE_ORDER_SERVICE_DETAILS_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER_SERVICE_DETAILS"
    ADD CONSTRAINT "INVOICE_ORDER_SERVICE_DETAILS_pkey" PRIMARY KEY ("Id");


--
-- Name: INVOICE_ORDER INVOICE_ORDER_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER"
    ADD CONSTRAINT "INVOICE_ORDER_pkey" PRIMARY KEY ("Id");


--
-- Name: PERMISION PERMISION_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERMISION"
    ADD CONSTRAINT "PERMISION_pkey" PRIMARY KEY ("Id");


--
-- Name: PERSON PERSON_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERSON"
    ADD CONSTRAINT "PERSON_pkey" PRIMARY KEY ("Id");


--
-- Name: PRODUCT PRODUCT_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PRODUCT"
    ADD CONSTRAINT "PRODUCT_pkey" PRIMARY KEY ("Id");


--
-- Name: PURCHASE_ORDER_DETAILED PURCHASE_ORDER_DETAILED_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_ORDER_DETAILED"
    ADD CONSTRAINT "PURCHASE_ORDER_DETAILED_pkey" PRIMARY KEY ("Id");


--
-- Name: PURCHASE_ORDER PURCHASE_ORDER_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_ORDER"
    ADD CONSTRAINT "PURCHASE_ORDER_pkey" PRIMARY KEY ("Id");


--
-- Name: PURCHASE_QUOTATION PURCHASE_QUOTATION_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_QUOTATION"
    ADD CONSTRAINT "PURCHASE_QUOTATION_pkey" PRIMARY KEY ("Id");


--
-- Name: SALARY SALARY_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SALARY"
    ADD CONSTRAINT "SALARY_pkey" PRIMARY KEY ("Id");


--
-- Name: SCHEDULE_EMPLOYEE SCHEDULE_EMPLOYEE_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SCHEDULE_EMPLOYEE"
    ADD CONSTRAINT "SCHEDULE_EMPLOYEE_pkey" PRIMARY KEY ("Id");


--
-- Name: SCHEDULE SCHEDULE_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SCHEDULE"
    ADD CONSTRAINT "SCHEDULE_pkey" PRIMARY KEY ("Id");


--
-- Name: SERVICE SERVICE_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SERVICE"
    ADD CONSTRAINT "SERVICE_pkey" PRIMARY KEY ("Id");


--
-- Name: SUPPLIER SUPPLIER_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SUPPLIER"
    ADD CONSTRAINT "SUPPLIER_pkey" PRIMARY KEY ("Id");


--
-- Name: USER USER_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY ("Id");


--
-- Name: VACATION VACATION_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VACATION"
    ADD CONSTRAINT "VACATION_pkey" PRIMARY KEY ("Id");


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: EMPLOYEE_Email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "EMPLOYEE_Email_key" ON public."EMPLOYEE" USING btree ("Email");


--
-- Name: PERSON_DNI_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "PERSON_DNI_key" ON public."PERSON" USING btree ("DNI");


--
-- Name: SUPPLIER_Email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "SUPPLIER_Email_key" ON public."SUPPLIER" USING btree ("Email");


--
-- Name: USER_Email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "USER_Email_key" ON public."USER" USING btree ("Email");


--
-- Name: APPOINTMENT APPOINTMENT_Client_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."APPOINTMENT"
    ADD CONSTRAINT "APPOINTMENT_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES public."CLIENT"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: APPOINTMENT APPOINTMENT_Employee_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."APPOINTMENT"
    ADD CONSTRAINT "APPOINTMENT_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES public."EMPLOYEE"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: APPOINTMENT_SOLICITATION APPOINTMENT_SOLICITATION_Client_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."APPOINTMENT_SOLICITATION"
    ADD CONSTRAINT "APPOINTMENT_SOLICITATION_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES public."CLIENT"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CLIENT CLIENT_Person_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CLIENT"
    ADD CONSTRAINT "CLIENT_Person_Fk_fkey" FOREIGN KEY ("Person_Fk") REFERENCES public."PERSON"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: CLIENT CLIENT_User_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CLIENT"
    ADD CONSTRAINT "CLIENT_User_Fk_fkey" FOREIGN KEY ("User_Fk") REFERENCES public."USER"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EMPLOYEE EMPLOYEE_Person_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EMPLOYEE"
    ADD CONSTRAINT "EMPLOYEE_Person_Fk_fkey" FOREIGN KEY ("Person_Fk") REFERENCES public."PERSON"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: EMPLOYEE EMPLOYEE_User_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EMPLOYEE"
    ADD CONSTRAINT "EMPLOYEE_User_Fk_fkey" FOREIGN KEY ("User_Fk") REFERENCES public."USER"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: INVENTORY_MOVEMENT INVENTORY_MOVEMENT_Product_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVENTORY_MOVEMENT"
    ADD CONSTRAINT "INVENTORY_MOVEMENT_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES public."PRODUCT"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: INVENTORY INVENTORY_Product_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVENTORY"
    ADD CONSTRAINT "INVENTORY_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES public."PRODUCT"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: INVOICE_ORDER INVOICE_ORDER_Client_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER"
    ADD CONSTRAINT "INVOICE_ORDER_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES public."CLIENT"("Id") ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: INVOICE_ORDER INVOICE_ORDER_Employee_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER"
    ADD CONSTRAINT "INVOICE_ORDER_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES public."EMPLOYEE"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: INVOICE_ORDER_PRODUCT_DETAILS INVOICE_ORDER_PRODUCT_DETAILS_Invoice_Order_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER_PRODUCT_DETAILS"
    ADD CONSTRAINT "INVOICE_ORDER_PRODUCT_DETAILS_Invoice_Order_Fk_fkey" FOREIGN KEY ("Invoice_Order_Fk") REFERENCES public."INVOICE_ORDER"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: INVOICE_ORDER_PRODUCT_DETAILS INVOICE_ORDER_PRODUCT_DETAILS_Product_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER_PRODUCT_DETAILS"
    ADD CONSTRAINT "INVOICE_ORDER_PRODUCT_DETAILS_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES public."PRODUCT"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: INVOICE_ORDER_SERVICE_DETAILS INVOICE_ORDER_SERVICE_DETAILS_Invoice_Order_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER_SERVICE_DETAILS"
    ADD CONSTRAINT "INVOICE_ORDER_SERVICE_DETAILS_Invoice_Order_Fk_fkey" FOREIGN KEY ("Invoice_Order_Fk") REFERENCES public."INVOICE_ORDER"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: INVOICE_ORDER_SERVICE_DETAILS INVOICE_ORDER_SERVICE_DETAILS_Service_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."INVOICE_ORDER_SERVICE_DETAILS"
    ADD CONSTRAINT "INVOICE_ORDER_SERVICE_DETAILS_Service_Fk_fkey" FOREIGN KEY ("Service_Fk") REFERENCES public."SERVICE"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PERMISION PERMISION_Employee_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERMISION"
    ADD CONSTRAINT "PERMISION_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES public."EMPLOYEE"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PRODUCT PRODUCT_Category_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PRODUCT"
    ADD CONSTRAINT "PRODUCT_Category_Fk_fkey" FOREIGN KEY ("Category_Fk") REFERENCES public."CATEGORY"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PRODUCT PRODUCT_Supplier_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PRODUCT"
    ADD CONSTRAINT "PRODUCT_Supplier_Fk_fkey" FOREIGN KEY ("Supplier_Fk") REFERENCES public."SUPPLIER"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PURCHASE_ORDER PURCHASE_ORDER_Client_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_ORDER"
    ADD CONSTRAINT "PURCHASE_ORDER_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES public."CLIENT"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PURCHASE_ORDER_DETAILED PURCHASE_ORDER_DETAILED_Product_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_ORDER_DETAILED"
    ADD CONSTRAINT "PURCHASE_ORDER_DETAILED_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES public."PRODUCT"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PURCHASE_ORDER_DETAILED PURCHASE_ORDER_DETAILED_Purchase_Order_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_ORDER_DETAILED"
    ADD CONSTRAINT "PURCHASE_ORDER_DETAILED_Purchase_Order_Fk_fkey" FOREIGN KEY ("Purchase_Order_Fk") REFERENCES public."PURCHASE_ORDER"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PURCHASE_ORDER PURCHASE_ORDER_Employee_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_ORDER"
    ADD CONSTRAINT "PURCHASE_ORDER_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES public."EMPLOYEE"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PURCHASE_QUOTATION PURCHASE_QUOTATION_Product_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_QUOTATION"
    ADD CONSTRAINT "PURCHASE_QUOTATION_Product_Fk_fkey" FOREIGN KEY ("Product_Fk") REFERENCES public."PRODUCT"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: PURCHASE_QUOTATION PURCHASE_QUOTATION_Supplier_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_QUOTATION"
    ADD CONSTRAINT "PURCHASE_QUOTATION_Supplier_Fk_fkey" FOREIGN KEY ("Supplier_Fk") REFERENCES public."SUPPLIER"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SALARY SALARY_Employee_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SALARY"
    ADD CONSTRAINT "SALARY_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES public."EMPLOYEE"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEDULE_EMPLOYEE SCHEDULE_EMPLOYEE_Employee_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SCHEDULE_EMPLOYEE"
    ADD CONSTRAINT "SCHEDULE_EMPLOYEE_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES public."EMPLOYEE"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEDULE_EMPLOYEE SCHEDULE_EMPLOYEE_Schedule_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SCHEDULE_EMPLOYEE"
    ADD CONSTRAINT "SCHEDULE_EMPLOYEE_Schedule_Fk_fkey" FOREIGN KEY ("Schedule_Fk") REFERENCES public."SCHEDULE"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: VACATION VACATION_Employee_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."VACATION"
    ADD CONSTRAINT "VACATION_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES public."EMPLOYEE"("Id") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "prisma_migrate_shadow_db_2f7112f2-1570-43ff-adcd-24a345c56de6" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: prisma_migrate_shadow_db_2f7112f2-1570-43ff-adcd-24a345c56de6; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "prisma_migrate_shadow_db_2f7112f2-1570-43ff-adcd-24a345c56de6" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "prisma_migrate_shadow_db_2f7112f2-1570-43ff-adcd-24a345c56de6" OWNER TO postgres;

\connect -reuse-previous=on "dbname='prisma_migrate_shadow_db_2f7112f2-1570-43ff-adcd-24a345c56de6'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "prisma_migrate_shadow_db_7dd0e855-6878-4314-8ea8-69ad1d14c41b" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: prisma_migrate_shadow_db_7dd0e855-6878-4314-8ea8-69ad1d14c41b; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE "prisma_migrate_shadow_db_7dd0e855-6878-4314-8ea8-69ad1d14c41b" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "prisma_migrate_shadow_db_7dd0e855-6878-4314-8ea8-69ad1d14c41b" OWNER TO postgres;

\connect -reuse-previous=on "dbname='prisma_migrate_shadow_db_7dd0e855-6878-4314-8ea8-69ad1d14c41b'"

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: GENDER; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."GENDER" AS ENUM (
    'MASCULINO',
    'FEMENINO'
);


ALTER TYPE public."GENDER" OWNER TO postgres;

--
-- Name: ROL; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."ROL" AS ENUM (
    'ADMINISTRADOR',
    'EMPLEADO',
    'PACIENTE'
);


ALTER TYPE public."ROL" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: ADMIN; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ADMIN" (
    "Id_Admin" integer NOT NULL,
    "Email" text NOT NULL,
    "Password" text NOT NULL,
    "Person_Fk" text NOT NULL,
    "User_Fk" text NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."ADMIN" OWNER TO postgres;

--
-- Name: ADMIN_Id_Admin_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ADMIN_Id_Admin_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ADMIN_Id_Admin_seq" OWNER TO postgres;

--
-- Name: ADMIN_Id_Admin_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ADMIN_Id_Admin_seq" OWNED BY public."ADMIN"."Id_Admin";


--
-- Name: EMPLOYEE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."EMPLOYEE" (
    "Employee_Id" integer NOT NULL,
    "Phone" text,
    "Email" text NOT NULL,
    "Password" text,
    "Salary" double precision NOT NULL,
    "Person_Fk" text NOT NULL,
    "User_Fk" text NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."EMPLOYEE" OWNER TO postgres;

--
-- Name: EMPLOYEE_Employee_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."EMPLOYEE_Employee_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."EMPLOYEE_Employee_Id_seq" OWNER TO postgres;

--
-- Name: EMPLOYEE_Employee_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."EMPLOYEE_Employee_Id_seq" OWNED BY public."EMPLOYEE"."Employee_Id";


--
-- Name: PATIENT; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PATIENT" (
    "Id_Patient" integer NOT NULL,
    "Password" text,
    "Email" text,
    "Person_Fk" text NOT NULL,
    "User_Fk" text NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."PATIENT" OWNER TO postgres;

--
-- Name: PATIENT_Id_Patient_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."PATIENT_Id_Patient_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."PATIENT_Id_Patient_seq" OWNER TO postgres;

--
-- Name: PATIENT_Id_Patient_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."PATIENT_Id_Patient_seq" OWNED BY public."PATIENT"."Id_Patient";


--
-- Name: PERSON; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PERSON" (
    "DNI" text NOT NULL,
    "First_Name" text NOT NULL,
    "Middle_Name" text,
    "Last_Name" text NOT NULL,
    "Second_Last_Name" text,
    "Birth_Date" text NOT NULL,
    "Phone_Number" text NOT NULL,
    "Address" text,
    "Gender" public."GENDER" NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."PERSON" OWNER TO postgres;

--
-- Name: USER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."USER" (
    "Id" text NOT NULL,
    "User_Name" text NOT NULL,
    "Email" text NOT NULL,
    "Password" text NOT NULL,
    "Role" public."ROL" NOT NULL,
    "created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updated_At" timestamp(3) without time zone
);


ALTER TABLE public."USER" OWNER TO postgres;

--
-- Name: ADMIN Id_Admin; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ADMIN" ALTER COLUMN "Id_Admin" SET DEFAULT nextval('public."ADMIN_Id_Admin_seq"'::regclass);


--
-- Name: EMPLOYEE Employee_Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EMPLOYEE" ALTER COLUMN "Employee_Id" SET DEFAULT nextval('public."EMPLOYEE_Employee_Id_seq"'::regclass);


--
-- Name: PATIENT Id_Patient; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PATIENT" ALTER COLUMN "Id_Patient" SET DEFAULT nextval('public."PATIENT_Id_Patient_seq"'::regclass);


--
-- Data for Name: ADMIN; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ADMIN" ("Id_Admin", "Email", "Password", "Person_Fk", "User_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: EMPLOYEE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EMPLOYEE" ("Employee_Id", "Phone", "Email", "Password", "Salary", "Person_Fk", "User_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: PATIENT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PATIENT" ("Id_Patient", "Password", "Email", "Person_Fk", "User_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: PERSON; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PERSON" ("DNI", "First_Name", "Middle_Name", "Last_Name", "Second_Last_Name", "Birth_Date", "Phone_Number", "Address", "Gender", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: USER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."USER" ("Id", "User_Name", "Email", "Password", "Role", "created_At", "updated_At") FROM stdin;
\.


--
-- Name: ADMIN_Id_Admin_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ADMIN_Id_Admin_seq"', 1, false);


--
-- Name: EMPLOYEE_Employee_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EMPLOYEE_Employee_Id_seq"', 1, false);


--
-- Name: PATIENT_Id_Patient_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PATIENT_Id_Patient_seq"', 1, false);


--
-- Name: ADMIN ADMIN_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ADMIN"
    ADD CONSTRAINT "ADMIN_pkey" PRIMARY KEY ("Id_Admin");


--
-- Name: EMPLOYEE EMPLOYEE_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EMPLOYEE"
    ADD CONSTRAINT "EMPLOYEE_pkey" PRIMARY KEY ("Employee_Id");


--
-- Name: PATIENT PATIENT_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PATIENT"
    ADD CONSTRAINT "PATIENT_pkey" PRIMARY KEY ("Id_Patient");


--
-- Name: PERSON PERSON_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PERSON"
    ADD CONSTRAINT "PERSON_pkey" PRIMARY KEY ("DNI");


--
-- Name: USER USER_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."USER"
    ADD CONSTRAINT "USER_pkey" PRIMARY KEY ("Id");


--
-- Name: ADMIN_Email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "ADMIN_Email_key" ON public."ADMIN" USING btree ("Email");


--
-- Name: EMPLOYEE_Email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "EMPLOYEE_Email_key" ON public."EMPLOYEE" USING btree ("Email");


--
-- Name: USER_Email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "USER_Email_key" ON public."USER" USING btree ("Email");


--
-- Name: ADMIN ADMIN_Person_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ADMIN"
    ADD CONSTRAINT "ADMIN_Person_Fk_fkey" FOREIGN KEY ("Person_Fk") REFERENCES public."PERSON"("DNI") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: ADMIN ADMIN_User_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ADMIN"
    ADD CONSTRAINT "ADMIN_User_Fk_fkey" FOREIGN KEY ("User_Fk") REFERENCES public."USER"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: EMPLOYEE EMPLOYEE_Person_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EMPLOYEE"
    ADD CONSTRAINT "EMPLOYEE_Person_Fk_fkey" FOREIGN KEY ("Person_Fk") REFERENCES public."PERSON"("DNI") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: EMPLOYEE EMPLOYEE_User_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."EMPLOYEE"
    ADD CONSTRAINT "EMPLOYEE_User_Fk_fkey" FOREIGN KEY ("User_Fk") REFERENCES public."USER"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PATIENT PATIENT_Person_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PATIENT"
    ADD CONSTRAINT "PATIENT_Person_Fk_fkey" FOREIGN KEY ("Person_Fk") REFERENCES public."PERSON"("DNI") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: PATIENT PATIENT_User_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PATIENT"
    ADD CONSTRAINT "PATIENT_User_Fk_fkey" FOREIGN KEY ("User_Fk") REFERENCES public."USER"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

