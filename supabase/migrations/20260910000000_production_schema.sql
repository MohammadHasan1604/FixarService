-- ====================================================================
-- FIXAR SERVICE — PRODUCTION POSTGRESQL / SUPABASE DATABASE SCHEMA
-- Version: 20260910000000
-- ====================================================================

-- Enable pgcrypto for UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES & USERS
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    auth_user_id UUID UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role VARCHAR(32) NOT NULL DEFAULT 'staff' CHECK (role IN ('admin', 'staff', 'technician')),
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. BUSINESS SETTINGS (Central Source of Truth)
CREATE TABLE IF NOT EXISTS public.business_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name_en TEXT NOT NULL DEFAULT 'Fixar Service',
    company_name_ar TEXT NOT NULL DEFAULT 'فيكسار سيرفيس',
    tagline_en TEXT NOT NULL DEFAULT 'Certified Home Appliance Repair & Maintenance Experts',
    tagline_ar TEXT NOT NULL DEFAULT 'خبراء صيانة وتصليح الأجهزة المنزلية المعتمدون',
    primary_email TEXT NOT NULL DEFAULT 'fixarservices@gmail.com',
    operating_hours_en TEXT NOT NULL DEFAULT 'Open 24/7 (Emergency Response Across UAE)',
    operating_hours_ar TEXT NOT NULL DEFAULT 'مفتوح 24/7 (خدمة طوارئ في جميع أنحاء الإمارات)',
    primary_location_en TEXT NOT NULL DEFAULT 'Sharjah Industrial Area 10 & Dubai Hubs',
    primary_location_ar TEXT NOT NULL DEFAULT 'المنطقة الصناعية 10، الشارقة ومراكز دبي',
    supported_regions JSONB NOT NULL DEFAULT '{}'::jsonb,
    disclaimers JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    title_en TEXT NOT NULL,
    title_ar TEXT NOT NULL,
    category VARCHAR(32) NOT NULL,
    short_desc_en TEXT,
    short_desc_ar TEXT,
    long_desc_en TEXT,
    long_desc_ar TEXT,
    icon_name VARCHAR(64),
    image_url TEXT,
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SERVICE SPECIFIC PROBLEMS
CREATE TABLE IF NOT EXISTS public.service_problems (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    service_slug VARCHAR(64) NOT NULL REFERENCES public.services(slug) ON DELETE CASCADE,
    problem_key VARCHAR(64) NOT NULL,
    label_en TEXT NOT NULL,
    label_ar TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (service_slug, problem_key)
);

-- 5. TECHNICIANS & FIELD FORCE
CREATE TABLE IF NOT EXISTS public.technicians (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    specialties TEXT[] NOT NULL DEFAULT '{}',
    service_areas TEXT[] NOT NULL DEFAULT '{}',
    active BOOLEAN NOT NULL DEFAULT true,
    assigned_jobs_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. CUSTOMERS
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    whatsapp TEXT,
    email TEXT,
    city TEXT NOT NULL,
    area TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. BOOKINGS (Canonical Booking State Machine)
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference VARCHAR(32) UNIQUE NOT NULL,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_whatsapp TEXT NOT NULL,
    customer_email TEXT,
    country TEXT NOT NULL DEFAULT 'United Arab Emirates',
    city TEXT NOT NULL,
    area TEXT NOT NULL,
    building TEXT NOT NULL,
    street TEXT,
    apartment TEXT,
    service_slug VARCHAR(64) NOT NULL,
    service_title TEXT NOT NULL,
    brand TEXT NOT NULL,
    model TEXT,
    problem_category TEXT NOT NULL,
    description TEXT,
    appointment_date DATE NOT NULL,
    appointment_slot VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'new' CHECK (status IN (
        'new', 'accepted', 'assigned', 'technician_en_route',
        'inspection', 'consultation_completed', 'quote_provided',
        'approved', 'in_progress', 'completed', 'cancelled'
    )),
    assigned_technician_id UUID REFERENCES public.technicians(id) ON DELETE SET NULL,
    internal_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. BOOKING STATUS HISTORY (Audit Trail)
CREATE TABLE IF NOT EXISTS public.booking_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    booking_reference VARCHAR(32) NOT NULL,
    status VARCHAR(32) NOT NULL,
    note TEXT,
    actor TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. CUSTOMER INQUIRIES / CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.customer_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(32) NOT NULL DEFAULT 'new' CHECK (status IN (
        'new', 'contacted', 'follow_up', 'converted', 'resolved', 'spam', 'archived'
    )),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. AUDIT LOGS
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id TEXT NOT NULL,
    actor_role VARCHAR(32) NOT NULL,
    action VARCHAR(64) NOT NULL,
    entity_type VARCHAR(64) NOT NULL,
    entity_id VARCHAR(64),
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ====================================================================
-- INDEXES FOR HIGH-PERFORMANCE QUERYING
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_bookings_reference ON public.bookings(reference);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_bookings_customer_phone ON public.bookings(customer_phone);
CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.bookings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_booking_status_history_ref ON public.booking_status_history(booking_reference);
CREATE INDEX IF NOT EXISTS idx_customer_inquiries_read ON public.customer_inquiries(read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Public Read Policies for Catalog & Content
CREATE POLICY "Allow public read on services" ON public.services FOR SELECT USING (active = true);
CREATE POLICY "Allow public read on service problems" ON public.service_problems FOR SELECT USING (true);
CREATE POLICY "Allow public read on business settings" ON public.business_settings FOR SELECT USING (true);

-- 2. Public Insert Policies for Bookings and Inquiries
CREATE POLICY "Allow anonymous booking creation" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous inquiry creation" ON public.customer_inquiries FOR INSERT WITH CHECK (true);

-- 3. Staff Operational Access Policies
CREATE POLICY "Staff view bookings" ON public.bookings FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role IN ('staff', 'admin'))
);
CREATE POLICY "Staff update booking status" ON public.bookings FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role IN ('staff', 'admin'))
);
CREATE POLICY "Staff view technicians" ON public.technicians FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role IN ('staff', 'admin'))
);

-- 4. Admin Full Access Policy
CREATE POLICY "Admin full profiles" ON public.profiles FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full settings" ON public.business_settings FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full bookings" ON public.bookings FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full technicians" ON public.technicians FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full inquiries" ON public.customer_inquiries FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin full audit logs" ON public.audit_logs FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE auth_user_id = auth.uid() AND role = 'admin')
);
