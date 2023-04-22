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
-- Name: refresh_updated_at_step1(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.refresh_updated_at_step1() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.updated_at = OLD.updated_at THEN
    NEW.updated_at := NULL;
  END IF;
  RETURN NEW;
END;
$$;


--
-- Name: refresh_updated_at_step2(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.refresh_updated_at_step2() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.updated_at IS NULL THEN
    NEW.updated_at := OLD.updated_at;
  END IF;
  RETURN NEW;
END;
$$;


--
-- Name: refresh_updated_at_step3(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.refresh_updated_at_step3() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF NEW.updated_at IS NULL THEN
    NEW.updated_at := CURRENT_TIMESTAMP;
  END IF;
  RETURN NEW;
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: blogs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blogs (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    published_at timestamp with time zone
);


--
-- Name: blogs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.blogs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: blogs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.blogs_id_seq OWNED BY public.blogs.id;


--
-- Name: blogs_tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.blogs_tags (
    blog_id integer NOT NULL,
    tag_id integer NOT NULL
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying(128) NOT NULL
);


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: timelines; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.timelines (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    category integer NOT NULL,
    from_date timestamp with time zone NOT NULL,
    to_date timestamp with time zone NOT NULL
);


--
-- Name: timelines_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.timelines_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: timelines_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.timelines_id_seq OWNED BY public.timelines.id;


--
-- Name: blogs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs ALTER COLUMN id SET DEFAULT nextval('public.blogs_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: timelines id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timelines ALTER COLUMN id SET DEFAULT nextval('public.timelines_id_seq'::regclass);


--
-- Name: blogs blogs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_pkey PRIMARY KEY (id);


--
-- Name: blogs blogs_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs
    ADD CONSTRAINT blogs_slug_key UNIQUE (slug);


--
-- Name: blogs_tags blogs_tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs_tags
    ADD CONSTRAINT blogs_tags_pkey PRIMARY KEY (blog_id, tag_id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: tags tags_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_slug_key UNIQUE (slug);


--
-- Name: timelines timelines_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.timelines
    ADD CONSTRAINT timelines_pkey PRIMARY KEY (id);


--
-- Name: blog_id_tag_id_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blog_id_tag_id_index ON public.blogs_tags USING btree (blog_id, tag_id);


--
-- Name: blogs_slug_published_at_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX blogs_slug_published_at_index ON public.blogs USING btree (slug, published_at);


--
-- Name: tags_slug_index; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX tags_slug_index ON public.tags USING btree (slug);


--
-- Name: timelines_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX timelines_category_idx ON public.timelines USING btree (category);


--
-- Name: blogs refresh_blogs_updated_at_step1; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER refresh_blogs_updated_at_step1 BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.refresh_updated_at_step1();


--
-- Name: blogs refresh_blogs_updated_at_step2; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER refresh_blogs_updated_at_step2 BEFORE UPDATE OF updated_at ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.refresh_updated_at_step2();


--
-- Name: blogs refresh_blogs_updated_at_step3; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER refresh_blogs_updated_at_step3 BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.refresh_updated_at_step3();


--
-- Name: tags refresh_tags_updated_at_step1; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER refresh_tags_updated_at_step1 BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.refresh_updated_at_step1();


--
-- Name: tags refresh_tags_updated_at_step2; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER refresh_tags_updated_at_step2 BEFORE UPDATE OF updated_at ON public.tags FOR EACH ROW EXECUTE FUNCTION public.refresh_updated_at_step2();


--
-- Name: tags refresh_tags_updated_at_step3; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER refresh_tags_updated_at_step3 BEFORE UPDATE ON public.tags FOR EACH ROW EXECUTE FUNCTION public.refresh_updated_at_step3();


--
-- Name: blogs_tags fk_blogs_tags_blog_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs_tags
    ADD CONSTRAINT fk_blogs_tags_blog_id FOREIGN KEY (blog_id) REFERENCES public.blogs(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: blogs_tags fk_blogs_tags_tag_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.blogs_tags
    ADD CONSTRAINT fk_blogs_tags_tag_id FOREIGN KEY (tag_id) REFERENCES public.tags(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--


--
-- Dbmate schema migrations
--

INSERT INTO public.schema_migrations (version) VALUES
    ('20230331001052'),
    ('20230331001102'),
    ('20230331001115'),
    ('20230331001134'),
    ('20230422041306');
