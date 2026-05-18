CREATE TABLE IF NOT EXISTS public.productos
(
    id bigint NOT NULL DEFAULT nextval('productos_id_seq'::regclass),
    nombre character varying(100) COLLATE pg_catalog."default" NOT NULL,
    marca character varying(50) COLLATE pg_catalog."default",
    precio numeric(10,2) NOT NULL,
    stock integer DEFAULT 0,
    fecha_creacion timestamp without time zone DEFAULT CURRENT_TIMESTAMP, -- fecha de creación automática
    CONSTRAINT productos_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

-- Asignar propietario de la tabla
ALTER TABLE IF EXISTS public.productos
    OWNER to postgres;

-- Comentario en columna stock
COMMENT ON COLUMN public.productos.stock
    IS 'comment';