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
    'RECEPCION',
    'LIMPIEZA',
    'SEGURIDAD'
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
    "State" public."APPOINTMENT_STATE" NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
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
    "Days_Spent" integer DEFAULT 0,
    "State" public."EMPLOYEE_STATE" DEFAULT 'ENABLED'::public."EMPLOYEE_STATE" NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
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
    "Product_Fk" integer NOT NULL,
    "Quantity" integer NOT NULL,
    "Description" text NOT NULL,
    "State" public."INVENTORY_MOVEMENT_TYPE" NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
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
    "Invoice_File" text,
    "PayMethod" public."PAY_METHOD" DEFAULT 'CAJA'::public."PAY_METHOD" NOT NULL,
    "Subtotal" double precision NOT NULL,
    "Discount" double precision,
    "ISV" double precision NOT NULL,
    "Total" double precision NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
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
    "State" public."REQUEST_STATE" NOT NULL,
    "Read" boolean NOT NULL,
    "ReadEmployee" boolean NOT NULL,
    "Description" text NOT NULL,
    "Answer" text,
    "Attached_File" text,
    "Start_Date" text NOT NULL,
    "End_Date" text NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
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
    "Image" text,
    "Supplier_Fk" integer NOT NULL,
    "Category_Fk" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
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
    "Invoice_File" text,
    "State" public."REQUEST_STATE" NOT NULL,
    "Total" double precision NOT NULL,
    "Supplier_Fk" integer NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."PURCHASE_ORDER" OWNER TO postgres;

--
-- Name: PURCHASE_ORDER_DETAILED; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."PURCHASE_ORDER_DETAILED" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Quantity" integer NOT NULL,
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
-- Name: SALE_ORDER; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SALE_ORDER" (
    "Id" integer NOT NULL,
    "Date" timestamp(3) without time zone NOT NULL,
    "Client_Fk" integer NOT NULL,
    "Employee_Fk" integer NOT NULL,
    "Order_File" text,
    "State" public."REQUEST_STATE" NOT NULL,
    "Read" boolean NOT NULL,
    "ReadClient" boolean NOT NULL,
    "Subtotal" double precision NOT NULL,
    "Discount" double precision,
    "ISV" double precision NOT NULL,
    "Total" double precision NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public."SALE_ORDER" OWNER TO postgres;

--
-- Name: SALE_ORDER_Id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."SALE_ORDER_Id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."SALE_ORDER_Id_seq" OWNER TO postgres;

--
-- Name: SALE_ORDER_Id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."SALE_ORDER_Id_seq" OWNED BY public."SALE_ORDER"."Id";


--
-- Name: SCHEDULE; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SCHEDULE" (
    "Id" integer NOT NULL,
    "ScheduleName" text NOT NULL,
    "Schedule" jsonb NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
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
    "State" public."REQUEST_STATE" NOT NULL,
    "Read" boolean NOT NULL,
    "ReadEmployee" boolean NOT NULL,
    "Answer" text,
    "Start_Date" text NOT NULL,
    "End_Date" text NOT NULL,
    "Created_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "Updated_At" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP
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
-- Name: SALE_ORDER Id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SALE_ORDER" ALTER COLUMN "Id" SET DEFAULT nextval('public."SALE_ORDER_Id_seq"'::regclass);


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
-- Data for Name: ACTIVITY_LOG; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ACTIVITY_LOG" ("Id", "Date", name, "Description", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: APPOINTMENT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."APPOINTMENT" ("Id", "Date", "Description", "Client_Fk", "Employee_Fk", "State", "Created_At", "Updated_At") FROM stdin;
3	2024-04-27 23:06:00	Examen de vista	2	1	PENDIENTE	2024-04-27 02:01:54.521	2024-04-27 02:01:54.521
\.


--
-- Data for Name: APPOINTMENT_SOLICITATION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."APPOINTMENT_SOLICITATION" ("Id", "Date", "Client_Fk", "Description", "State", "Created_At", "Updated_At") FROM stdin;
7	2024-05-11 00:00:00	2	examen de vista	PENDIENTE	2024-04-27 02:00:23.628	2024-04-27 02:00:23.628
6	2024-04-27 00:00:00	2	Examen de vista	APROBADO	2024-04-27 02:00:05.284	2024-04-27 02:01:54.584
8	2024-05-09 00:00:00	2	cita	RECHAZADO	2024-04-27 02:01:28.545	2024-04-27 02:01:59.329
\.


--
-- Data for Name: CATEGORY; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CATEGORY" ("Id", "Name", description, "Created_At", "Updated_At") FROM stdin;
1	Lentes de Sol	Lentes para el sol	2024-04-19 23:14:31.452	2024-04-19 23:14:31.452
2	Aros	Aros para lentes\n	2024-04-27 01:20:42.085	2024-04-27 01:20:42.085
3	Accesorios	Acessorios de lentes	2024-04-27 01:20:57.359	2024-04-27 01:20:57.359
\.


--
-- Data for Name: CLIENT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CLIENT" ("Id", "Person_Fk", "User_Fk", "Created_At", "Updated_At") FROM stdin;
1	4	4	2024-04-20 21:11:44.975	2024-04-20 21:11:44.975
2	2	4	2024-04-20 21:37:53.294	2024-04-20 21:37:53.294
\.


--
-- Data for Name: EMPLOYEE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."EMPLOYEE" ("Id", "Email", "Person_Fk", "User_Fk", "Position", "Start_Date", "Days_Spent", "State", "Created_At", "Updated_At") FROM stdin;
1	juan@gmail.com	1	1	MEDICO	2024-04-20 06:00:00	23	ENABLED	2024-04-20 21:17:24.543	2024-04-20 21:18:51.009
\.


--
-- Data for Name: INVENTORY; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVENTORY" ("Id", "Product_Fk", "Stock", "Min_Stock", "Valued_Inventory", "Created_At", "Updated_At") FROM stdin;
1	1	34	34	408	2024-04-20 01:03:30.384	2024-04-27 01:37:22.129
7	3	24	12	456	2024-04-27 01:23:50.395	2024-04-27 01:23:50.395
8	4	23	56	578	2024-04-27 01:24:26.082	2024-04-27 01:24:26.082
9	5	45	12	6789	2024-04-27 01:25:12.852	2024-04-27 01:25:12.852
10	6	45	12	4567	2024-04-27 01:26:01.359	2024-04-27 01:26:01.359
11	7	14	12	5678	2024-04-27 01:26:40.215	2024-04-27 01:26:40.215
\.


--
-- Data for Name: INVENTORY_MOVEMENT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVENTORY_MOVEMENT" ("Id", "Product_Fk", "Quantity", "Description", "State", "Created_At", "Updated_At") FROM stdin;
1	1	12	Salida de inventario	SALIDA	2024-04-26 19:29:46.481	2024-04-26 19:29:46.481
8	5	3	Salida de inventario	SALIDA	2024-04-26 19:29:46.481	2024-04-26 19:29:46.481
9	3	5	Salida de inventario	SALIDA	2024-04-26 19:35:00	2024-04-26 19:35:00
10	4	4	Salida de inventario	SALIDA	2024-04-26 19:40:00	2024-04-26 19:40:00
11	4	20	Entrada de inventario	ENTRADA	2024-04-26 19:45:00	2024-04-26 19:45:00
12	5	10	Entrada de inventario	ENTRADA	2024-04-26 19:50:00	2024-04-26 19:50:00
13	6	15	Entrada de inventario	ENTRADA	2024-04-26 19:55:00	2024-04-26 19:55:00
17	1	8	Pedido en proceso	PEDIDO	2024-04-26 20:00:00	2024-04-26 20:00:00
18	6	10	Pedido en proceso	PEDIDO	2024-04-26 20:05:00	2024-04-26 20:05:00
19	3	5	Pedido en proceso	PEDIDO	2024-04-26 20:10:00	2024-04-26 20:10:00
\.


--
-- Data for Name: INVOICE_ORDER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVOICE_ORDER" ("Id", "Client_Fk", "Employee_Fk", "Date", "Invoice_File", "PayMethod", "Subtotal", "Discount", "ISV", "Total", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: INVOICE_ORDER_PRODUCT_DETAILS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVOICE_ORDER_PRODUCT_DETAILS" ("Id", "Quantity", "Product_Fk", "Description", "Invoice_Order_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: INVOICE_ORDER_SERVICE_DETAILS; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."INVOICE_ORDER_SERVICE_DETAILS" ("Id", "Service_Fk", "Discount", "Description", "Invoice_Order_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: PERMISION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PERMISION" ("Id", "Employee_Fk", "Reason", "State", "Read", "ReadEmployee", "Description", "Answer", "Attached_File", "Start_Date", "End_Date", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: PERSON; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PERSON" ("Id", "DNI", "First_Name", "Last_Name", "Birth_Date", "Phone_Number", "Address", "Gender", "Created_At", "Updated_At") FROM stdin;
1	0801200010311	Juan	P├®rez Rodriguez	1990-05-15	123456789	Calle Principal 123	MASCULINO	2024-04-19 15:51:38.882	2024-04-19 15:51:38.882
2	0801200010321	Mar├¡a Isabel	Gonz├ílez Mart├¡nez	1985-08-20	987654321	Avenida Central 456	FEMENINO	2024-04-19 15:51:38.882	2024-04-19 15:51:38.882
3	0801200010331	Pedro	Mart├¡nez Almendarez	1978-12-03	654987321	Calle Secundaria 789	MASCULINO	2024-04-19 15:51:38.882	2024-04-19 15:51:38.882
4	0801200013104	Pedro	Morales	2024-04-20	88680222	tegucigalpa honduras	MASCULINO	2024-04-20 21:11:44.784	2024-04-20 21:11:44.784
\.


--
-- Data for Name: PRODUCT; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PRODUCT" ("Id", "Name", "Description", "Brand", "Price_Buy", "Price_Sell", "Image", "Supplier_Fk", "Category_Fk", "Created_At", "Updated_At") FROM stdin;
1	Lentes de millor	Lentes de sol	MK	455	663	73120f25-effc-4d3e-ab06-5901535e6110-1713574857226.jpg	1	1	2024-04-20 01:00:57.311	2024-04-20 01:00:57.311
3	Pa├▒uelo de micro fibra	pa├▒uelo para lentes gris 4x6	TioWilliam	45	78	ed620efc-bd39-4f93-9efb-d9fa8f549a6a-1714181030388.webp	2	3	2024-04-27 01:23:50.395	2024-04-27 01:23:50.395
4	Pa├▒uelolentes	BERKSHIRE Pa├▒uelo para Limpieza de Lentes 4" (An) x 6" (L) 1000 pa├▒uelos Seco	RonWW	56	89	c91c95d6-fbc0-43a5-b7bd-ffb428a2457f-1714181066078.jpg	2	3	2024-04-27 01:24:26.082	2024-04-27 01:24:26.082
5	Aros de lentes negros	Aros de lentes negros 2323	Aros TREN	345	689	b5e2fd99-4a3f-4548-870f-e437c277a1b3-1714181112849.png	1	2	2024-04-27 01:25:12.852	2024-04-27 01:25:12.852
6	Aros de lentes 	Aros de lentes finos	Borjn	455	689	886c29c9-947b-4fa5-a953-4ad25da2acf0-1714181161356.jpg	1	1	2024-04-27 01:26:01.359	2024-04-27 01:26:01.359
7	Aros de lentes MHNS	Aros de lentes MHNS	MHNS	455	566	7f13a209-3c58-4202-b145-44f554622dd3-1714181200212.jpg	1	2	2024-04-27 01:26:40.215	2024-04-27 01:26:40.215
\.


--
-- Data for Name: PURCHASE_ORDER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PURCHASE_ORDER" ("Id", "Date", "Invoice_File", "State", "Total", "Supplier_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: PURCHASE_ORDER_DETAILED; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PURCHASE_ORDER_DETAILED" ("Id", "Date", "Quantity", "Description", "Product_Fk", "Purchase_Order_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: PURCHASE_QUOTATION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."PURCHASE_QUOTATION" ("Id", "Date", "Description", "State", "Product_Fk", "Supplier_Fk", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: SALARY; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SALARY" ("Id", "Employee_Fk", "Amount", "State", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: SALE_ORDER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SALE_ORDER" ("Id", "Date", "Client_Fk", "Employee_Fk", "Order_File", "State", "Read", "ReadClient", "Subtotal", "Discount", "ISV", "Total", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: SCHEDULE; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SCHEDULE" ("Id", "ScheduleName", "Schedule", "Created_At", "Updated_At") FROM stdin;
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
1	WSD Distribuciones	aws@gmail.com	23242525	Distribuidor de lentes	2024-04-19 23:14:57.731	2024-04-19 23:14:57.731
2	AWS Distribuciones	alh9cef@gmail.com	23242525322	Tegucgalpa, Honduras	2024-04-27 01:21:33.291	2024-04-27 01:21:33.291
\.


--
-- Data for Name: USER; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."USER" ("Id", "User_Name", "Email", "Password", "Role", "Device_Token", "Created_At", "Updated_At") FROM stdin;
4	PEDRO MORALES	pedro2@example.com	$2a$10$oSToKW6XLM2G5R9945A83e8DySyviFooU2OM8potFaL8UVLVqzDUG	CLIENTE	\N	2024-04-20 21:11:44.942	2024-04-20 21:14:29.818
2	mariagonzalez	maria@example.com	$2b$10$Rx6lzfna1c.ciGtGUsoQcOKdBTR5hAH2aVF489d/6ok1GkOC273bK	CLIENTE	\N	2024-04-19 15:51:42.941	2024-04-27 02:05:12.702
3	pedromartinez	pedro@example.com	$2b$10$Rx6lzfna1c.ciGtGUsoQcOKdBTR5hAH2aVF489d/6ok1GkOC273bK	ADMINISTRADOR	\N	2024-04-19 15:51:42.941	2024-04-27 02:07:57.405
1	juanperez	juan@example.com	$2b$10$Rx6lzfna1c.ciGtGUsoQcOKdBTR5hAH2aVF489d/6ok1GkOC273bK	EMPLEADO	\N	2024-04-19 15:51:42.941	2024-04-27 02:10:35.092
\.


--
-- Data for Name: VACATION; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."VACATION" ("Id", "Employee_Fk", "State", "Read", "ReadEmployee", "Answer", "Start_Date", "End_Date", "Created_At", "Updated_At") FROM stdin;
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
176c2d00-2eb9-4967-9dd1-62daad1ad584	1f928906325074f3aa5a49b60698eb97a70f86c15d95fb3d638c9886c8e19518	2024-04-19 21:51:28.66233+00	20240419215125_init	\N	\N	2024-04-19 21:51:25.36385+00	1
\.


--
-- Name: ACTIVITY_LOG_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ACTIVITY_LOG_Id_seq"', 1, false);


--
-- Name: APPOINTMENT_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."APPOINTMENT_Id_seq"', 3, true);


--
-- Name: APPOINTMENT_SOLICITATION_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."APPOINTMENT_SOLICITATION_Id_seq"', 8, true);


--
-- Name: CATEGORY_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CATEGORY_Id_seq"', 3, true);


--
-- Name: CLIENT_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."CLIENT_Id_seq"', 2, true);


--
-- Name: EMPLOYEE_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."EMPLOYEE_Id_seq"', 1, true);


--
-- Name: INVENTORY_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."INVENTORY_Id_seq"', 11, true);


--
-- Name: INVENTORY_MOVEMENT_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."INVENTORY_MOVEMENT_Id_seq"', 19, true);


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

SELECT pg_catalog.setval('public."PERSON_Id_seq"', 4, true);


--
-- Name: PRODUCT_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."PRODUCT_Id_seq"', 7, true);


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

SELECT pg_catalog.setval('public."PURCHASE_QUOTATION_Id_seq"', 1, false);


--
-- Name: SALARY_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SALARY_Id_seq"', 1, false);


--
-- Name: SALE_ORDER_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."SALE_ORDER_Id_seq"', 1, false);


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

SELECT pg_catalog.setval('public."SUPPLIER_Id_seq"', 2, true);


--
-- Name: USER_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."USER_Id_seq"', 4, true);


--
-- Name: VACATION_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."VACATION_Id_seq"', 1, false);


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
-- Name: SALE_ORDER SALE_ORDER_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SALE_ORDER"
    ADD CONSTRAINT "SALE_ORDER_pkey" PRIMARY KEY ("Id");


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
-- Name: PURCHASE_ORDER PURCHASE_ORDER_Supplier_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."PURCHASE_ORDER"
    ADD CONSTRAINT "PURCHASE_ORDER_Supplier_Fk_fkey" FOREIGN KEY ("Supplier_Fk") REFERENCES public."SUPPLIER"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


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
-- Name: SALE_ORDER SALE_ORDER_Client_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SALE_ORDER"
    ADD CONSTRAINT "SALE_ORDER_Client_Fk_fkey" FOREIGN KEY ("Client_Fk") REFERENCES public."CLIENT"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: SALE_ORDER SALE_ORDER_Employee_Fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SALE_ORDER"
    ADD CONSTRAINT "SALE_ORDER_Employee_Fk_fkey" FOREIGN KEY ("Employee_Fk") REFERENCES public."EMPLOYEE"("Id") ON UPDATE CASCADE ON DELETE RESTRICT;


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

